const port = 9900;
const shortid = require('shortid');

var userList = [];
var userIdx = 0;
var serverSocket = require('socket.io')({
	transport:['websocket'],
});

serverSocket.attach(port);
console.log('===== chat server start['+port+'] =======');

serverSocket.on("connect", (clientSocket) =>{
	const _id = shortid.generate();
	userList[userIdx] = _id;
	console.log(" @@@@ 신규유저추가 userList["+userIdx+"]:" + _id);

	console.log(clientSocket.id);
	
	//console.dir(serverSocket);
	//console.dir(serverSocket.sockets);
	//console.log(serverSocket.sockets.adapter.rooms);
	//console.dir(serverSocket.nsps); //안에 접근이 안된다. ㅠㅠ
	//console.dir(serverSocket._serveClient);
	//console.dir(serverSocket.parser);
	//console.dir(serverSocket.encoder);
	// console.dir(serverSocket.sockets);
	// serverSocket.sockets.rooms.push({id:"1111"});
	// serverSocket.sockets.rooms.push({id:"1112"});
	// serverSocket.sockets.rooms.push({id:"1113"});
	// var fun = serverSocket.sockets.rooms.find((_room, _idx)=>{
	// 	return _room.id === '1113';
	// 	//return this;
	// })
	// console.log(fun);
	// console.dir(serverSocket.sockets.rooms);
	//console.dir(clientSocket.id);
	//console.dir(clientSocket);
	//console.dir(clientSocket.broadcast);

	console.log("21");
	console.dir(serverSocket.sockets.adapter.rooms);
	console.log("22");
	console.dir(Object.keys(serverSocket.sockets.adapter.rooms));
	var _dd = serverSocket.sockets.adapter.rooms[clientSocket.id];
	console.log("23");
	console.dir(Object.keys(_dd.sockets));
	console.log("24");


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

	clientSocket.on("PTC_ROOM", (_data) =>{
		if(serverSocket.sockets.adapter.rooms[_data.roomID]){
			console.log("이미 방이 만들어져 있습니다.");
		}else{
			console.log("방을 생성합니다.");

			let _curRoom 	= serverSocket.sockets.adapter.rooms[_data.roomID];
			let _command 	= _data.command;
			switch(_command){
				case 'create':							
					//생성하고 방 정보를 넣어준다...
					clientSocket.join(_data.roomID);
					_curRoom.id 	= _data.roomID;
					_curRoom.name 	= _data.roomName;
					_curRoom.owner 	= _data.roomOwner;			
					break;
				case 'update':				
					//_curRoom.id 	= _data.roomID;
					_curRoom.name 	= _data.roomName;
					_curRoom.owner 	= _data.roomOwner;			
					break;
				case 'delete':						
					//뺴주고... 삭제하기...	
					clientSocket.leave(_data.roomID);
					
					if(_curRoom){
						delete serverSocket.sockets.adapter.rooms[_data.roomID];
					}else{
						console.log('방이 만들어져 있지 않습니다.');
					}					
					break;
				case 'join':
					clientSocket.leave(_data.roomID);
					break;
			}

			//Room list 정보 받기...
			let rooms = getRoomList();
			let output = {
				command:'list', rooms:rooms
			};
			serverSocket.emit("PTS_ROOM", output);
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
		
		//1. 종료하는 사람의 리스트를 삭제한다...
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


function getRoomList(){
	console.log("getRoomList 호출");
	console.log('Room -> ' + JSON.stringify(serverSocket.sockets.adapter.rooms));

	var rooms = [];
	Object.keys(serverSocket.sockets.adapter.rooms).forEach(function(_roomid){
		console.log("현재방 ID:" + _roomid);

		var _curRoom = serverSocket.sockets.adapter.rooms[_roomid];
		var _found = false;
		Object.keys(_curRoom.sockets).forEach(function(_key){
			if(_roomid == _key){
				_found = true;
			}
		});

		if(!_found){
			rooms.push(_curRoom);
		}
	});
	return rooms;
}

console.log("==============");


