var data = {};

$(document).ready(function(){
  $.ajax({
    url: location.pathname+'/responses.json'
    }).done(function(response_data){
      data = response_data;
      $.each(response_data, function(i, response){
        var msg = '<div class="response hidden '+response.offset+'" id="response_'+response.id+'">';
        msg += '<p>'+response.body+'</p>';
        msg += '<p class="username">'+response.username+'</p>';
        msg += '</div>';
        $('#responses').append(msg);
      });
    });
});

function update_time(time){
  var scrollto = 0;
	visible = $.grep(data, function(response) {
		return (Number(response.timestamp)*1000) < time;
	});
	// console.log(visible.length)
  $.each(data, function(i, response){
    var $res = $('#response_'+response.id);
		var timestamp = (Number(response.timestamp)*1000);
    if (timestamp < time && (timestamp + 5000) > time){
			$res.removeClass("hidden")
      $res.show('medium');
    }else{
      $res.hide('medium');
    }
  });
  // $('#responses').animate({
  //   scrollTop: scrollto
  // }, 'slow');
}
