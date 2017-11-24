console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

  $(document).on('click', '#submitButton', applyTasks);
  $('#taskList').on('click', '.completeButton', completeTask);
  $('#taskList').on('click', '.deleteButton', removeTask);
  
  

    getAllTasks();
});


  function applyTasks() {
      console.log('in applyTasks');
      var $inputValue = $('#inputTask').val()
      $('#taskList').append('<tr class="taskRow"><td>' + $inputValue + '</td></tr>');
  
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
    $('#inputTask').val('');
};



  function getAllTasks() {
    $.ajax({
        method: 'GET',
        url: '/todo',
        success: function(response) {
            console.log('response', response);
            $('#taskList').empty();
            for (var i = 0; i < response.length; i++) {
                var jobs = response[i];
                
                console.log('got the job', jobs);

                var $newTaskItem = $('<tr class="taskRow"><td>' + jobs.task + '</td><br><td>' + jobs.status + '</td></tr><br>');
                if (jobs.status == "complete") {
                    $('.taskRow').css('background-color', 'limegreen');
                } 

                //create  and append complete button
                var $completeTaskButton = $('<button class="completeButton">Completed</button>');
                $completeTaskButton.data('id', jobs.id);
                $newTaskItem.append($completeTaskButton);

                //create and append delete button
                var $deleteTaskButton = $('<button class="deleteButton">Delete</button>');
                $deleteTaskButton.data('id', jobs.id);
                $newTaskItem.append($deleteTaskButton);

                //append the new list item to the DOM
                $('#taskList').append($newTaskItem);
                }
            }           
        });
        
    };



function completeTask() {
    
    var jobIdToComplete = $(this).data().id;

    
    $.ajax({
      method: 'PUT',
      url: '/todo/' + jobIdToComplete,
      success: function(response) {
        getAllTasks();
        
      }
  })
  //$(this).css('background-color', 'limegreen');
}

  function removeTask() {
    console.log($(this).data());
    var jobIdToRemove = $(this).data().id;
    console.log('removeTask was clicked. The task id was', jobIdToRemove);

    $.ajax({
        method: 'DELETE',
        url: '/todo/' + jobIdToRemove,
        success: function() {
            getAllTasks();
        }
    });
}




