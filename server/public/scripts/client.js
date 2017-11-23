console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

  $('#mainDiv').on('click', '#submitButton', applyTasks);

  function applyTasks() {
      console.log('in applyTasks');
      var $inputValue = $('#inputTask').val()
      $('.taskList').append('<li>' + $inputValue + '</li>');
  
    $.ajax({
        method: 'POST',
        url: '/todo',
        data: {
            task: $inputValue,
            status: 'incomplete'
        },
        success: function(response) {
            console.log('response', response);
            getAllTasks();

        }
    })
};


  function getAllTasks() {
    $.ajax({
        method: 'GET',
        url: '/todo',
        success: function(response) {
            console.log('respnse', response);
            $('.taskList').empty();
            for (var i = 0; i < response.length; i++) {
                var jobs = response[i];
                var $newTaskItem = $('<li>' + jobs.task + jobs.status + '</li>')

                //var $changeShoeInput = $('<input class="newShoeInput" placeholder="enter shoe name">');
                //$newShoeItem.append($changeShoeInput);

                //create  and append save button
                var $completeTaskButton = $('<button class="completeButton">Completed</button>');
                $completeTaskButton.data('id', jobs.id);
                $newTaskItem.append($completeTaskButton);

                //create and append delete button
                var $deleteTaskButton = $('<button class="deleteButton">Delete</button>');
                $deleteTaskButton.data('id', jobs.id);
                $newTaskItem.append($deleteTaskButton);

                //append the new list item to the DOM
                $('.taskList').append($newTaskItem);
            }
            
                
        }
        
    })
};

});