
//직접구현...
var calc1 = {};
calc1.add = function(a, b){
    return a + b;
}
console.log("add1: %d", calc1.add(10, 20));


//서브함수로 구현....
var calc2 = require("./Step03_sub");
console.log("add2: %d", calc2.add(10, 20));

//객체를 통체로 받아서...
var calc3 = require("./Step03_sub2");
console.log("add3: %d", calc3.add(10, 20));

var Player = require("./Step03_sub3");
console.dir(Player);
var player = new Player();
console.dir(player);
console.log(player);


var player1 = new Player();
var player2 = new Player();
var players = [];
players[player1.id] = player1;
players[player2.id] = player2;
console.dir(players);


// Socket.prototype.to =
// Socket.prototype.in = function(name){
//   if (!~this._rooms.indexOf(name)) this._rooms.push(name);
//   return this;
// };


var ss = ['aa', 'bb', 'cc'];
for(var i = -5; i <= 5; i++){
    if(i)
        console.log(i + " " + true);
    else 
        console.log(i + " " + false);
}

console.log(ss.indexOf('aa'));
console.log(ss.indexOf('dd'));
// if(ss.indexOf('a') >= 0)
//     console.log(true);
// else 
//     console.log(false);


var testObj = Object.defineProperties({}, {
    prop1: {
        value: 10,
        writable:false // by default
    },
    prop2: {
        get:function () {
        }
    }
});
testObj.prop1 = 20;
testObj.prop2 = 20;
console.log(testObj);


var testObj = Object.defineProperties({}, {
    
    prop1:{
        value : 10,
        writable: false
    },
    prop2:{
        get:function(){

        }
    }
});
testObj.prop0 = 1;
testObj.prop1 = 10;
testObj.prop2 = 20;
console.log(testObj);
for(var i = 0; i < 3; i++){
    console.log(testObj["prop"+ i]);
}

var test = {};
(function(){
    var age = 18;
    var isAdult = false;
    
    Object.defineProperty(test, 'age', {
        get:function(){
            return age;
        },
        set:function(v){
            if(v < 1) throw '';
            isAdult = v > 18;
            age = v;
        }
    });

    Object.defineProperty(test, 'isAdult', {
        get:function(){
            return isAdult;
        }
    });

})();
var test2 = {};

console.log(test.age);
console.log(test.isAdult);
//test.age = -1;
test.age = 19;
test.isAdult = true;

console.log(test.age);
console.log(test.isAdult);


console.log(test2.isAdult);


