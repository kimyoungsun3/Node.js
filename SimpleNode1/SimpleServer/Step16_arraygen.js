var fruits = ['apple', 'banner'];

console.log(fruits.length);

console.log(fruits[0]);
fruits.forEach(function(item, idx, array){
    console.log(idx, item);
});

fruits.push('orange');
console.dir(fruits);

console.dir(fruits.pop());
console.dir(fruits);

console.log(fruits.shift());
fruits.unshift('strawbe');
console.log(fruits);


fruits.push('manggo');
console.dir(fruits);
console.log(fruits.indexOf('manggo'));
console.log(fruits.indexOf('banner'));
console.log(fruits);

console.log(fruits[0]);
console.log(fruits[11] == null);


var fruits2 = [];
fruits2.push('banna', 'apple', 'peach');
console.log(fruits2);
fruits2[5] = 'mango';
console.log(fruits2);
console.log(fruits2.length);
for(var i = 0, imax = fruits2.length; i < imax; i++){
    if(fruits2 != null)
        console.log("[%d] => %s", i, fruits2[i]);
    else
        console.log("[%d] => null", i);
}

console.log(Object.keys(fruits2));
console.log(fruits2.length);



fruits2.length = 10;
console.log(fruits2.length);
for(var i = 0, imax = fruits2.length; i < imax; i++){
    if(fruits2 != null)
        console.log("[%d] => %s", i, fruits2[i]);
    else
        console.log("[%d] => null", i);
}

fruits2.length = 2;
console.log(fruits2.length);
for(var i = 0, imax = fruits2.length; i < imax; i++){
    if(fruits2 != null)
        console.log("[%d] => %s", i, fruits2[i]);
    else
        console.log("[%d] => null", i);
}
console.log(fruits2[2]);


var msgArray = [];
msgArray[0] = 'h';
msgArray[99] = 'b';
if(msgArray.length === 100){
    console.log("the length si 100");
}


var board =[
    ['a', 'b', 'c'],
    [' ', ' ', ' '],
    ['a', 'b', 'c'],
    ['a', 'b', 'c'],
];
console.dir(board);
console.log(board);

board[1][1] = board[0][0];
console.dir(board);


var board2 =[];
for(var i = 0; i < 10; i++){
    board2.push([ 2**i, 2 * i**2]);
}
console.table(board2);

console.log(Math.pow(2, 31));


var dd = Array.from("foo");
console.dir(dd);

var aa2 = Array.from([1, 2, 3], x => x * x);
console.log(aa2);


const m = new Map([[1, 2], [2, 4], [4, 8]]);
var aa3 = Array.from(m);
console.log(aa3);

var aa3_key = Array.from(m.keys());
var aa3_values = Array.from(m.values());
console.log(aa3_key);
console.log(aa3_values);


var aa4 = Array.of(7);
console.log(aa4);

var aa5 = Array(7);
console.log(aa5);


const aa6 = ['a', 'b', 'c'];
const aa6_entries = aa6.entries();
// console.log(aa6_entries.next().done);
// console.log(aa6_entries.next().done);
// console.log(aa6_entries.next().done);
// console.log(aa6_entries.next().done);
// console.log(aa6_entries.next().done);
// for(let v of aa6.entries()){
//     console.log(v);
// }


var input = {
    command:'delete',
    roomId:'id',
    roomName:'name',
    roomOwner:'owner',
    roomDesc:'desc'
}
if(input.command === 'create'){
    console.log('create');
}else if(input.command == 'update'){
    console.log('update');
}else if(input.command == 'delete'){
    console.log('delete');
}

switch(input.command){
    case 'create':
        console.log('create');
        break;
    case 'update':
        console.log('update');
        break;
    case 'delete':
        console.log('delete');
        break;
}

console.log(input);
delete input.roomDesc;
console.log(input);

console.log('input -> %j', JSON.stringify(input));
console.log('input -> ' + JSON.stringify(input));
console.log("input -> %j", input);

