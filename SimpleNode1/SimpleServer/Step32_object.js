var person1 = {name:"name1"}
var exists = function(_data){
    if(_data)
        console.log("O");
    else 
        console.log("X");
}
var users = {};


users.id1 = "id1";
users["id2"] = "id2";


users.id1 = 'id1_2';


console.dir(users);
exists(users.id1);
exists(users.id2);
exists(users.id3);