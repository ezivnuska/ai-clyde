var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var querystring = require('querystring');
var http1 = require("http");
var request = require("request");
var RiveScript = require('rivescript');
var bot = new RiveScript();

bot.loadDirectory("brain");

app.get('https://ai-clyde.herokuapp.com:443/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
    bot.sortReplies();

    // And now we're free to get a reply from the brain!
    var reply = bot.reply("local-user", msg);
    io.emit('chat message', reply);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on ' + process.env.PORT);
});
