$(function() {
	$("#soundcloud_media").setupSoundcloudPlayer();
})

$.fn.setupSoundcloudPlayer = function() {

  var host2widgetBaseUrl = {
    "wt.soundcloud.dev" : "wt.soundcloud.dev/",
    "wt.soundcloud.com" : "wt.soundcloud.com/player/",
    "w.soundcloud.com"  : "w.soundcloud.com/player/"
  };

  var consoleBox = document.querySelector('.console');

  var forEach = Array.prototype.forEach;

  function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
      element.addEventListener(eventName, callback, false);
    } else {
      element.attachEvent(eventName, callback, false);
    }
  }

  function updateConsole(value) {
    consoleBox.value = value +"\n" + consoleBox.value;
  }

  var widgetUrl = "http://api.soundcloud.com/tracks/" + $(this).data("track_id");

  consoleBox.value = "Loading...";
  
  $('.actionButtons').hide();
  $('.getterButtons').hide();
  $('.urlInput').hide();
  $('.widgetLinks').hide();
  $('.widgetOptions').hide();
  $('.urlOptions').hide();
  $('.reload').hide();
  $('.console').hide();

  var iframe = document.getElementById('soundcloud_iframe');
  iframe.src = location.protocol + "//" + 'w.soundcloud.com/player/' /*host2widgetBaseUrl[location.host]*/ + "?url=" + widgetUrl;
  iframe.onload = function() {

    var widget = SC.Widget(iframe);
widget.bind(SC.Widget.Events.READY, function() {
      var startTime = new Date();
      var elem = $('#soundcloud_media');
      if (elem.length)
      {
        var time = parseInt(elem.attr('data-originally_broadcast_at'), 10);
        if (time)
        {
            startTime = new Date(time*1000);
        }
      }
       
      
      var actionButtons = document.querySelectorAll('.actionButtons button');
      forEach.call(actionButtons, function(button) {
        addEvent(button, 'click', function(e) {
          if (e.target !== this) {
            e.stopPropagation();
            return false;
          }
          var input = this.querySelector('input');
          var value = input && input.value;
          widget[this.className](value);
        });
      });

      var getterButtons = document.querySelectorAll('.getterButtons button');
      forEach.call(getterButtons, function(button){
        addEvent(button, 'click', function(e) {
          widget[this.className](function(value){
            updateConsole(button.getAttribute('caption') + " " + JSON.stringify(value));
          });
        });
      });
      
      function progressFn(progress) {
        var abs_time = (new Date(Math.floor(startTime.getTime() + progress.currentPosition)).getTime());
        var update_time = window.update_time;
		console.log(abs_time)
        if (update_time)
        {
            update_time(abs_time);
        }
        else
        {
            updateConsole("Abs time: " + abs_time);
        }
      }
      
      widget.bind(SC.Widget.Events.PLAY, progressFn);
      widget.bind(SC.Widget.Events.PLAY_PROGRESS, progressFn);
      
      var eventKey, eventName;
      for (eventKey in SC.Widget.Events) {
        (function(eventName, eventKey) {
          eventName = SC.Widget.Events[eventKey];
          widget.bind(eventName, function(eventData) {
            updateConsole("SC.Widget.Events." + eventKey +  " " + JSON.stringify(eventData || {}));
          });
        }(eventName, eventKey))
      }

      var widgetLinks = document.querySelectorAll('.widgetLinks a');
      var widgetUrlInput = document.querySelector('.urlInput');
      forEach.call(widgetLinks, function(link) {
        addEvent(link, 'click', function(e) {
          widgetUrlInput.value = this.getAttribute("href");
          e.preventDefault();
        });
      });

      var reloadFn = function() {
        var widgetOptions = getWidgetOptions();
        widgetOptions.callback = function(){
          updateConsole('Widget is reloaded.')
        };
        widget.load(widgetUrl, widgetOptions);
      };
      var reloadButton = document.querySelector('.reload');
      addEvent(reloadButton, 'click', reloadFn);

      function getWidgetOptions() {
        var optionInputs = document.querySelectorAll('.widgetOptions input');
        var widgetOptions = {};
        forEach.call(optionInputs, function(option){
          widgetOptions[option.id] = option.type === 'text' ? option.value : option.checked;
        });
        return widgetOptions;
      }
      
      iframe.height = 200;
      reloadFn();
    });
  };

};
