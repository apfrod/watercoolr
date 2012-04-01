var data = 
{
  responses: [
    {
    id: '1',
    avatar: '',
    body: 'this is awesome',
    time_offset: '0',
    },
    {
    id: '2',
    avatar: '',
    body: 'this is awesomer',
    time_offset: '10',
    },
  ]
};

$(document).ready(function(){
  $.each(data.responses, function(i, response){
    var msg = '<div class="response '+response.time_offset+'" id="'+response.id+'">';
    msg += '<p>'+response.body+'</p>';
    msg += '</div>';
    $('#responses').append(msg);
  });
});

function update_time(time){
  var $latest = $('.'+time);
  var scrollto = $latest.offset().top;
  $('#responses').animate({
    scrollTop: scrollto
  });
}
