console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

  $(document).on('click', '#submitButton', applyTasks);

  function applyTasks() {
      console.log('in applyTasks');
      var $inputValue = $('#inputTask').val()
      $('#taskList').append('<tr><td>' + $inputValue + '</td></tr>');
  
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

                var $newTaskItem = $('<tr><td>' + jobs.task + '</td><td>' + jobs.status + '</td></tr>');

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
                $('#taskList').append($newTaskItem);
            }           
        }
        
    });
  };
};
});
// });
// $.ajax({
//     url: '/koalas',
//     type: 'GET',
//     success: function( data ){
//       $('#viewKoalas').empty();
//       for (var i = 0; i < data.length; i++) {
//       var koala = data[i];
      
//       console.log( 'got some koalas: ', koala );

//       var $listKoala = $('<tr><td>' + koala.name + '</td><td>' + koala.gender + '</td><td>' + koala.age + '</td><td>' + koala.ready_to_transfer + '</td><td>' + koala.notes + '</td><td><button class="deleteButton">Delete</button></td></tr>');

//       $listKoala.data('id', koala.id);
//       $('#viewKoalas').append($listKoala);  
//         if (koala.ready_to_transfer == 'N') {
//           $listKoala.append('<button class="tranferButton">Ready to Transfer</button>')
//       } 
//       }; 
//     } // end success
//   }); //end aj