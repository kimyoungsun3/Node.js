var users = [
    {name:"name0", age:0},
    {name:"name1", age:1},
    {name:"name2", age:2}
];
function display(_idx, _data1, _data2){
    console.log("================[%d]=============", _idx);
    if(_data1 != null)console.dir(_data1);
    if(_data2 != null)console.dir(_data2);
}
display(1, users, users2);


var users2 = users.slice(1, 2);
display(2, users, users2);

users[1].age += 10;
display(3, users, users2);

users2[0].age += 10;
display(4, users, users2);

users.splice(0, 1);
display(5, users, users2);

//-------------------------------

users[1].age += 10;
users2[0].age += 11;
display(6, users, users2);

