
const port = 9900;

//let var const
//require : import socket.io
var io = require('socket.io')({
	transports: ['websocket'],
});

io.attach(port);

const shortid = require("shortid");

io.on('connection', (socket)=>
	{
		const thisId = shortid.generate();//uniquke id create ...
		console.log( "[connection]" + thisId);


		socket.on("msg", (data)=>{
			console.log("msg >> " + data);
			console.log(data);
			io.emit('chat', data); //
		});

		// client.Emit("attack", data) ;
		socket.on("attack", (data) =>{
			console.log("attack >> " +data);
		});

		socket.on('disconnect', ()=>{
			console.log("disconnect >> " );
		});

		try{
			var openData = { id:thisId, socketId: socket.socketId };
			socket.emit("init", openData);
			console.log("init >> " );
		}catch(e){
			console.log(e);
		}
	}
);

console.log(" start ChatServer " + port);