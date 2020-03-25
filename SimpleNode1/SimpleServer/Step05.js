//node 자료형이 var
//int       -> var
//string    -> var
//[]        -> []
//객체      -> ={};     

var name;
var age = 20;

console.log("%s %d", name, age);
//undefined 20

name = "node";
console.log("%s %d", name, age);
//node 20


//객체생성에 대해서...
var person = {};
person["name"] = "node";
person.age = 10;
console.log("%s %d", person.name, person["age"]);
//node 10
console.log("person : %j", person);
//person : {"name":"node","age":10}

var data = {};
data.name = "소녀시대";
data.age = 20;
console.log("data :  %j", data);
//data :  {"name":"소녀시대","age":20}

console.log(data.name.length);



