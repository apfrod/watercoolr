var data = {};

$(document).ready(function(){
  $.ajax({
    url: location.pathname+'/responses.json'
    }).done(function(response_data){
      data = response_data;
      $.each(response_data, function(i, response){
        var msg = '<div class="response hidden '+response.offset+'" id="'+response.id+'">';
        msg += '<p>'+response.body+'</p>';
        msg += '<p class="username">'+response.username+'</p>';
        msg += '</div>';
        $('#responses').append(msg);
      });
    });
});

function update_time(time){
  var scrollto = 0;
  $.each(data, function(i, response){
    var $res = $('#'+response.id);
    if (time >= Number(response.timestamp)*1000){
      $res.animate({
        opacity:1
        }, 
        'medium', 
        function(){
          $res.removeClass('hidden');
      });
      scrollto = $res.offset().top-10;
    }else{
      $res.animate({
        opacity: 0
      },
      'medium');
    }
  });
  $('#responses').animate({
    scrollTop: scrollto
  }, 'slow');
}
