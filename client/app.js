
$(document).ready(function(){

    var socket = io(); //socket is now a reference to the SocketIO library.
    

    $('form').on('submit', function(e) {

        e.preventDefault();
        let initials = $('#initials').val();
        let message = $('#message').val();

        var text = `${initials} says: ${message}`;

        //The code below says to emit the textual message to the server instead of 
        //performing our temporary alert behavior. The second line in the code simply 
        //clears the input so that another message can be typed by the same user.
        socket.emit('message', text);
        $('#message').val('');
        $('#initials').val('');

        return false;
    });

    //This part tells the browser that any time a message is received from the 
    //real time web socket connection with the server, create a new <li>  HTML 
    //element and append it to the messages <ol>
    socket.on('message', function (msg) {
        $('<li>').text(msg).prependTo('#history');
    });
});