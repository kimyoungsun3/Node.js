console.log("hello World");
console.log("%d %d %d", 1, 2, 3);
console.log("%s %s %s", "hi", "Hello", "world");

var data = {name:"name1", age:1};
console.log("json %j", data);

var pos = {x:1.1, y:2.2, z:3.3};
console.log("%j", pos);
console.log(pos.x + pos.y + pos.z);

console.time("time1");
for(var i = 0;  i < 100000; i++)
	i = i;
console.timeEnd("time1");


console.log("file name:%s", __filename);
console.log("path name:%s", __dirname);

console.log("args: %d", process.argv.length);
console.dir(process.argv);
process.argv.forEach((item, idx)=>{
	console.log("%d => %s", idx, item);
});



