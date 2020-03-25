var fs = require('fs');

console.log("======[start]=======");
fs.readFile('Step40_file.js', 'utf8', (_err, _result)=>{
    console.log(_result);
});
console.log("======[end]=======");


function fun1(){
    console.log(1);
}

var fun2 = function(){
    console.log(2);
}

var display = function(_result){
    console.log("result:" + _result);
}

fun1();
fun2();

function fun3(_imax, _callback){
    var sum = 0;
    for(var i = 0; i < _imax; i++)
        sum += i;

    if(_callback)
        _callback(sum);
}

var timename;
for(var i = 0; i < 10; i++){
    timename = "startTime" + i;
    console.time(timename);
    fun3(10000*10000*20, display);
    console.timeEnd(timename);
}
