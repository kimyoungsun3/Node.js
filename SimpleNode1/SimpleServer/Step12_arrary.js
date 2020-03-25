
var users = [
    {name:'name11', age:11},
    {name:'name12', age:12},
    {name:'name13', age:13},
    function(){
        console.log(1);
    }
];

for(var i = 0, imax = users.length; i < imax; i++){
    console.log("[%d] %j", i, users[i]);
}

users.forEach((element, i) => {
    console.log("[%d], %j", i, element);
});


users[3]();