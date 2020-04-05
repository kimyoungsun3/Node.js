const port 			= 9900;
const shortid 		= require('shortid');

var userList 	= [];
var userIdx 	= 0;
//var users		= {};
var serverSocket 	= require('socket.io')({
	transport:['websocket'],
});

serverSocket.attach(port);
console.log('===== server start['+port+'] =======');

serverSocket.on("connect", (clientSocket) => {

	const _id 			= shortid.generate();
	userList[userIdx] 	= _id;
	console.log(" @@@@ 신규유저추가 userList["+userIdx+"]:" + _id);	
	userIdx++;

	clientSocket.on("PTC_LOGIN", (_data)=> {
		console.log("[C -> S] PTC_LOGIN %j", _data);
		//####db -> connect -> data callback

		var _data2 = {id:_id};
		console.log('[C <- S] PTS_LOGIN %j', _data2);

		//1. 나의 로그인 + 방의 유저들...
		clientSocket.emit("PTS_LOGIN", _data2);

		//2. 다른 이들에게 나의 정보를 알려줌...
		clientSocket.broadcast.emit("PTS_OTHER", _data2);
		
		//1-2. 방의 유저들 정보를 전송받기...
		var _count = userList.length;
		var _data3;
		for(var i = 0; i < _count; i++ ){
			if(userList[i] == _id)
				continue;
			_data3 = {id:userList[i]};
			clientSocket.emit("PTS_OTHER2", _data3);
		}
	});

	clientSocket.on("PTC_CHAT", (_data) =>{
		console.log("[C -> S] PTC_CHAT %s %j", _id, _data);
		//{ id: '', msg: '11111' }
		console.log("[C <- S] PTS_CHAT");
		serverSocket.emit("PTS_CHAT", _data);
	});

	clientSocket.on("PTC_MOVE", (_data)=>{
		//console.log("[C -> S] PTC_MOVE[" + _id + "] #### position save");
		//console.log("[C <- S] PTS_MOVE " + _data);
		//console.dir(_data);
		clientSocket.broadcast.emit("PTS_MOVE", _data);
	});

	clientSocket.on("PTC_JUMP", (_data)=>{
		clientSocket.broadcast.emit("PTC_JUMP", _data);
	});

	clientSocket.on("PTC_TELEPORT", (_data)=>{
		clientSocket.broadcast.emit("PTS_TELEPORT", _data);
	});

	clientSocket.on("PTC_BLINK", (_data)=>{
		clientSocket.broadcast.emit("PTS_BLINK", _data);
	});


	clientSocket.on("PTC_ATTACK", (_data)=>{
		//console.log("[C -> S] PTC_ATTACK[%s]", _id);
		//console.log("[C <- S] PTS_ATTACK #### event ");
		console.dir(_data);
		clientSocket.broadcast.emit("PTS_ATTACK", _data);
	});

	clientSocket.on("PTC_DISCONNECT", (_data)=>{
		console.log("[C -> S] PTC_DISCONNECT[" + _id + "]");
		console.log("[C <- S] PTS_DISCONNECT");
		serverSocket.emit("PTS_DISCONNECT", _data);
	});

	clientSocket.on("disconnect", (_data)=>{
		console.log("[C -> S] disconnect %j", _data);
		
		//1. 리스트에서 종료자의 정보를 삭제한다.
		for(var i = 0; i < userList.length; i++){
			if(userList[i] == _id){
				userList.splice(i, 1);
				userIdx--;
				break;
			}
		}
		//2. 다른 이들에게 나의 정보를 알려줌...
		var _data2 = {id:_id};
		clientSocket.broadcast.emit("PTS_LOGOUT", _data2);

		console.log(" @@@@ 삭제를 알려주라 [" + userList.length + "/" + userIdx + "]");
	});	

});



console.log("==============");
