const port = 9900;
const shortid = require('shortid');

var userList = [];
var userIdx = 0;
var serverSocket = require('socket.io')({
    transport:['websocket'],
});


serverSocket.attach(port);
console.log('==== server start ====');

serverSocket.on('connect', clientSocket =>{    
    const _id           = clientSocket.id;;
    userList[userIdx]   = _id;
    console.log(" @@@@ 신규 유저 추가 userList["+ userIdx+"] = [" + _id +"]");

    //console.dir(serverSocket);
    //console.dir(serverSocket.sockets);
    //console.dir(serverSocket.serveClient);
    //console.dir(serverSocket.sockets.adapter.rooms);

    clientSocket.on("PTC_LOGIN", _data => {
        console.log("[C -> S] PTC_LOGIN %j", _data);

        let _data2 = {id:_id}
        console.log("[C <- S] PTS_LOGIN %j", _data2);
        
        clientSocket.emit("PTS_LOGIN", _data2);
        clientSocket.broadcast.emit("PTS_OTHER", _data2);
        let _count = userList.length;
        let _data3;
        for(let i = 0; i < _count; i++){
            if(userList[i] == _id){
                continue;
            }
            _data3 = {id:userList[i]};
            clientSocket.emit("PTS_OTHER2", _data3);
        }
        //@@@@ 묶어서 보내도록 변경해야함...
        //다른 사람의 수량 ....
        //  >> 0이상이면 리스트를 묶어서 보낸다...
    });


    clientSocket.on('PTC_ROOM', _data =>{
        if(serverSocket.sockets.adapter.rooms[_data.roomID]){
            console.log("이미 방이 만들어져 있습니다.");
        }else{
            console.log("방을 생성합니다.");
            
            let _curRoom = serverSocket.sockets.adapter.rooms[_data.roomID];
            let _command = _data.command;
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

            let _rooms = getRoomList();
            let _output = {
                command:'list', rooms:_rooms
            };
            serverSocket.emit("PTS_ROOM", _output);
        }
    });

    clientSocket.on("PTC_CHAT", _data => {
        console.log("[C -> S] PTC_CHAT %s %j", _id, _data);

        console.log("[C <- S] PTS_CHAT");
        serverSocket.emit("PTS_CHAT", _data);
    });

    clientSocket.on("PTC_MOVE", _data=>{
        clientSocket.broadcast.emit("PTS_MOVE", _data);
    });

    clientSocket.on("PTC_ATTACK", _data=>{
        clientSocket.broadcast.emit("PTS_ATTACK", _data);
    });

    clientSocket.on("PTC_DISCONNECT", _data=>{
        clientSocket.broadcast.emit("PTS_DISCONNECT", _data);
    });

    clientSocket.on("disconnect", _data=>{
        for(let i = 0; i < userList.length; i++){
            userList.splice(i, 1);
            userIdx--;
            break;
        }

        var _data2 = {id:_id};
        clientSocket.broadcast.emit("PTS_LOGOUT", _data2);
    });



});

console.log('===== server start and runner end... ======');

function getRoomList(){
    console.log("getRoomList 호출");
	console.log('Room -> ' + JSON.stringify(serverSocket.sockets.adapter.rooms));

    let _rooms = [];
    Object.keys(serverSocket.sockets.adapter.rooms).forEach(function(_roomid){
        console.log("현재방 ID:" + _roomid);

        let _curRoom = serverSocket.sockets.adapter.rooms[_roomid];
        let _found = false;
        Object.keys(_curRoom.sockets).forEach(function(_key){
            if(_roomid == _key){
                _found = true;
            }
        });

        if(!_found){
            _rooms.push(_curRoom);
        }
    });

    return _rooms;
}