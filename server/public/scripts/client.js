console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

  $('#mainDiv').on('click', '#submitButton', applyTasks);

  function applyTasks() {
      console.log('in applyTasks', applyTasks);
      var $inputValue = $('#inputTask').val()
      $('.taskList').append('<li>' + $inputValue + '</li>');
  }


});