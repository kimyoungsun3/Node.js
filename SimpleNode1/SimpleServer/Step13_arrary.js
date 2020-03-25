var users = [
    {name:"name11", age:11},
    {name:"name12", age:12},
    {name:"name13", age:13},
    function(){
        console.log("11");
    }
];


console.log(users);
console.dir(users);

users.push({name:"name14", age:14});
console.dir(users);

users.pop();
console.dir(users);

users.pop();
console.dir(users);


users.splice(0, 1);
console.dir(users);

for(var i = 0, imax = users.length; i < imax; i++){
    users.splice(i, 1);
}
console.log(" >> %j" , users);


users.push({name:"name11", age:11});
users.push({name:"name12", age:12});
users.push({name:"name13", age:13});
users.push({name:"name14", age:14});
users.unshift({name:"name10", age:14});
console.dir(users);
