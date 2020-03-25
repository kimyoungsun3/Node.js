var io = require('socket.io')({
	transports: ['websocket'],
});

io.attach(4567);

io.on('connection', function(socket){
	console.log("[connection]" + socket.id);
	//나만
	socket.on('beep', function(data){

		let msg = JSON.stringify(data);
		console.log("beep:" + msg);

		//socket.emit('boop', data);	//나만...
										//나만 뺴고 방사람들...
										//            방사람들만...
		io.emit("boop", data);			//전체...
	});
})
