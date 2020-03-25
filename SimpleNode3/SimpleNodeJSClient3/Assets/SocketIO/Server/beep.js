var io = require('socket.io')({
	transports: ['websocket'],
});

io.attach(4567);

io.on('connection', function(socket){
	console.log("[connection]" + socket.id);

	socket.on('beep', function(data){

		console.log("beep" + data);

		socket.emit('boop111');
	});
})
