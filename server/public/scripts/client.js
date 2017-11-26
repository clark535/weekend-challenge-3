console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

  $(document).on('click', '#submitButton', applyTasks);
  $('.taskList').on('click', '.completeButton', completeTask);
  $('.taskList').on('click', '.deleteButton', removeTask);
  //$('#taskList').on('click', '.completeButton', stupidGreenThing);
  
  

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

                //var $newTaskItem = $('<tr><td>' + jobs.task + '</td><br><td>' + jobs.status + '</td></tr><br>');                    
                

                if (jobs.status == 'complete') {
                    
                    var $newTaskItem = $('<tr><td class="taskTD">' + jobs.task + '</td><br><td class="compeleteStatus">' + jobs.status + '</td><td><input type="checkbox" checked="checked"></td></tr><br>');                                        
                    //$('.taskTD').css('background-color', 'limegreen');
                    //$('.completeStatus').parent().append('<td><input type="checkbox" checked="checked"></td>');
                    
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
                // if (jobs.status === 'complete') {
                //     $('.completeButton').parent().parent().css('background-color', 'limegreen');
                    
                // } 

                //create  and append complete button
                var $completeTaskButton = $('<button class="completeButton">Completed</button>');
                $completeTaskButton.data('id', jobs.id);
                $oldTaskItem.append($completeTaskButton);

                //create and append delete button
                var $deleteTaskButton = $('<button class="deleteButton">Delete</button>');
                $deleteTaskButton.data('id', jobs.id);
                $oldTaskItem.append($deleteTaskButton);

                //append the new list item to the DOM
                $('.taskList').append($oldTaskItem);
                }
                }
            }           
        });
        
    };



function completeTask() {
    //$('td').addClass('completedRow');
    var jobIdToComplete = $(this).data().id;
    // $(this).parent().addClass('turnItGreen');
    // $(this).parent().append('<input type="checkbox" checked="checked">');
    
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

// function stupidGreenThing() {
//     $('.completedButton').parent().parent().css('background-color', 'limegreen');
// }

