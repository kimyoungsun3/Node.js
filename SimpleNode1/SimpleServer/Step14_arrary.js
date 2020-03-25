var users = [
    {name:"name11", age:11},
    {name:"name12", age:12},
    {name:"name13", age:13},
];
console.dir(users);

users.splice(0, 0, {name:"name10", age:10});
console.dir(users);


// for(var i = 0, imax= users.length; i < imax; i++){
//     users.splice(0, 1);
// }
// console.dir(users);
users.splice(0, 1);
console.dir(users);

users.forEach((_data, i) => {
    console.log("%j", _data);
});
