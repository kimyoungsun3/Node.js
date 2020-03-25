//---------------------------------
//function.....
function add(a, b){
    return a + b;
}
console.log("function add >> %d", add(10, 20));
//function add >> 30



//---------------------------------
//익명함수 받기...
var add2 = function(a, b){
    return a + b;
}
console.log("익명add2 >> %d", add2(10, 20));
//익명add2 >> 30



//---------------------------------
var data2 = {};
data2.add = function(a, b){
    return a + b;
};
data2.minus = function(a, b){
    return a - b;
};

console.log("data2.add : %d", data2.add(10, 20));
//data2.add : 30
console.log("%j", data2);
//{}

data2.name = "소녀시대";
data2.age = 20;
console.log("%j", data2);
//{"name":"소녀시대","age":20}


//---------------------------------
data3 = {};
data3.name = "소녀시대";
data3.age = 20;
data3.add = function(a, b){
    return a + b;
}
console.log("%j / %d", data3, data3.add(10, 20));
//{"name":"소녀시대","age":20} / 30
