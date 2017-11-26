console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

  $(document).on('click', '#submitButton', applyTasks);
  $('.taskList').on('click', '.completeButton', completeTask);
  $('.taskList').on('click', '.deleteButton', removeTask);


    getAllTasks();
});


  function applyTasks() {
      console.log('in applyTasks');
      var $inputValue = $('#inputTask').val()
      $('.taskList').append('<tr><td>' + $inputValue + '</td></tr>');
  
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
            $('.taskList').html('');
            for (var i = 0; i < response.length; i++) {
                var jobs = response[i];                    

                if (jobs.status == 'complete') {
                    
                    var $newTaskItem = $('<tr><td class="taskTD">' + jobs.task + '</td><br><td>' + jobs.status + '</td><td><input type="checkbox" checked="checked"></td></tr><br>');
                    
                    console.log('if statement is working, in jobRow', jobs);

                    var $completeTaskButton = $('<button class="completeButton">Completed</button>');
                    $completeTaskButton.data('id', jobs.id);
                    $newTaskItem.append($completeTaskButton);

                    var $deleteTaskButton = $('<button class="deleteButton">Delete</button>');
                    $deleteTaskButton.data('id', jobs.id);
                    $newTaskItem.append($deleteTaskButton);

                    $('.taskList').append($newTaskItem);                    
                    
                } else {


                console.log('got the job', jobs);

                var $oldTaskItem = $('<tr><td>' + jobs.task + '</td><br><td>' + jobs.status + '</td></tr><br>');
                
                
                var $completeTaskButton = $('<button class="completeButton">Completed</button>');
                $completeTaskButton.data('id', jobs.id);
                $oldTaskItem.append($completeTaskButton);

                var $deleteTaskButton = $('<button class="deleteButton">Delete</button>');
                $deleteTaskButton.data('id', jobs.id);
                $oldTaskItem.append($deleteTaskButton);

                $('.taskList').append($oldTaskItem);
                }
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
