const port 		= 9900;
const shortid 	= require('shortid');
var serverSocket = require('socket.io')({
	transport:['websocket'],
});

serverSocket.attach(port);
console.log('===== chat server start['+port+'] =======');

serverSocket.on("connect", (clientSocket) => {
	const thisID = shortid.generate();
	console.log('New Client User:' + thisID);

	console.log("xxxx1");
	var result = 0;
	for(var i = 0; i < 10000000000; i++){
		result ++;
	}
	console.log("xxxx2");

	var _data = {id:thisID, socketId:clientSocket.socketId};
	console.log('[C <- S] PTS_LOGIN:%j', _data);
	clientSocket.emit("PTS_LOGIN", _data);

	clientSocket.on("PTC_CHAT", (_data) =>{
		console.log("[C -> S] PTC_CHAT %j", _data);
		//{ id: '', msg: '11111' }
		console.log("[C <- S] PTS_CHAT");
		serverSocket.emit("PTS_CHAT", _data);
	});

	clientSocket.on("PTC_MOVE", (_data)=>{
		console.log("[C -> S] PTC_MOVE[" + thisID + "]");
		console.log("[C <- S] PTS_MOVE");
		serverSocket.emit("PTS_MOVE", _data);
	});

	clientSocket.on("PTC_ATTACK", (_data)=>{
		console.log("[C -> S] PTC_ATTACK[%s]", thisID);
		console.log("[C <- S] PTS_ATTACK");
		serverSocket.emit("PTS_ATTACK", _data);
	});

	clientSocket.on("PTC_DISCONNECT", (_data)=>{
		console.log("[C -> S] PTC_DISCONNECT[" + thisID + "]");
		console.log("[C <- S] PTS_DISCONNECT");
		serverSocket.emit("PTS_DISCONNECT", _data);
	});


	clientSocket.on("disconnect", (_data)=>{
		console.log("[C -> S] xxdisconnect %j", _data);
		console.log("[C <- S] xxPTS_DISCONNECT");
		serverSocket.emit("PTS_DISCONNECT", _data);
	});
	

});



console.log("==============");
