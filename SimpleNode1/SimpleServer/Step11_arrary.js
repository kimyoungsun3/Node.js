
//-------------------------------------
// 배열 >> 문자열 담기..
//-------------------------------------
var names = ['name1', 'name2', 'name3'];
console.dir(names);

//-------------------------------------
// 배열 >> 객체 담기...
//-------------------------------------
var users = [
    {name:'name1', age:20},
    {name:'name2', age:21},
    {name:'name3', age:22},
]   
console.dir(users);

users.push({name:'name3', age:33});
users.push({name:'name3', age:33});
users.push({name:'name3', age:33});
console.dir(users);

for(var i = 0, imax = users.length; i < imax; i++)
    console.dir(users[i]);

//-------------------------------------
// 
//-------------------------------------
var add = function(_a, _b){
    return _a + _b;
};

users.push(add);
console.log(users);

//console.log(users.add); x
console.log(users[6](1, 2));
for(var i = 0, imax = users.length; i < imax; i++){
    if(users[i].age)
        console.dir(users[i]);
    else
        console.log(users[i](1, 2));
}


//----------------------------
const months = ['jan', 'march', 'april', 'june'];
console.dir(months);

months.splice(1, 0, 'Feb');
console.dir(months);

months.splice(4, 1, 'May');
console.dir(months);

months.splice(4, 0, 'May2', 'May3', 'May4');
console.dir(months);

