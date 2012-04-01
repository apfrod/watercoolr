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
    {body: 'text'},
    {body: 'text'},
    {body: 'text'},
    {body: 'text'},
    {body: 'text'},
    {body: 'text'},
    {body: 'text'},
    {body: 'text'},
    {body: 'text'},
    {body: 'text'},
    {body: 'text'},
  ]
};

$(document).ready(function(){
  $.each(data.responses, function(i, response){
    var msg = '<div class="response hidden '+response.time_offset+'" id="'+response.id+'">';
    msg += '<p>'+response.body+'</p>';
    msg += '</div>';
    $('#responses').append(msg);
  });
});

function update_time(time){
  var scrollto = 0;
  $.each(data.responses, function(i, response){
    var $res = $('#'+response.id);
    if (time > parseInt(response.time_offset)){
      $res.animate({
        opacity:1
        }, 
        'fast', 
        function(){
          $res.removeClass('hidden');
      });
      scrollto = $res.offset().top-10;
    }else{
      $res.animate({
      opacity: 0
      });
    }
  });
  $('#responses').animate({
    scrollTop: scrollto
  });
}
