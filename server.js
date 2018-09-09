var express = require('express')
var socket = require('socket.io')

var app = express()
var start = false
var second = 300
var timer = 0

server = app.listen(3000, function(){
    console.log('Server is running on port 3000')
}); 

io = socket(server);

io.on('connection', (socket) => {
    //console.log(socket.id + ':' +start);
    if(start){
      //console.log('started')
      socket.emit('START_MESSAGE',{
        time: second
      })
    }
    socket.on('START_MESSAGE', function(data){
      start = !start;
      //console.log(''+ start);
      io.emit('START_MESSAGE',{
        time: second
      })
      startTime()
    })
});
var startTime = a =>{
  console.log('Start time');
  if(timer == 0){
    timer = setInterval(countDown, 1000);
  }
}
var countDown = a =>{
  
  second = second - 1;
  console.log('count down ' + second);
    // Check if we're at zero.
  if (second == 0) { 
    clearInterval(timer);
    onComplete();
  }
}
function onComplete(){

}

