
// IE6
let Player = require("./Step10_varthislet_sub");
Player.staticName = 0;


let a1 = new Player("n1");
let a2 = new Player("n2");
let a3 = new Player("n3");




console.log("%j", a1);
console.log(a1.name + ":" + a1.name2 + ":" + a1.name3 + ":a1" + a1.staticName);
console.log(a2.name + ":" + a2.name2 + ":" + a2.name3 + ":a1" + a2.staticName);
console.log(a3.name + ":" + a3.name2 + ":" + a3.name3 + ":a1" + Player.staticName);
console.log("%j", a1);
console.dir(a2);
console.dir(a3);
