
//1. 외부 모듈을 가져와서 사용...
//없어서 다운로드 받아서 설치.... 
// npm install nconf
// D:\devtool\study\study\Node.js\SimpleNode1\SimpleServer>npm install nconf
// npm WARN simple@1.0.0 No description
// npm WARN simple@1.0.0 No repository field.
// + nconf@0.10.0
// added 20 packages from 18 contributors and audited 115 packages in 1.918s
// found 0 vulnerabilities
//
//2. 전체를 한꺼번에 설정만들기...
//npm init 
//환경설정....
//
//3. json에 설치된 파일...
//npm install 

//외장모듈...
var nconf = require("nconf");
nconf.env();
var nos = nconf.get("OS");
console.log("nos:%s", nos);


//내장모듈...
var os = require("os");
console.log("%d, %d", os.hostname(), os.freemem());
//NaN, 3971915776


//내장모듈...
var path = require("path");
var directories = ["User", "Mars", "Docs"];
var dirstr = directories.join();
console.log("dir:%s", dirstr);
//dir:User,Mars,Docs


var dirstr2 = directories.join(path.sep);
console.log("dir2:%s", dirstr2);
//dir2:User\Mars\Docs


var filepath = path.join("/users/mars", "node.js");
console.log("dir3:%s", filepath);
//dir3:\users\mars\node.js


var dirname = path.dirname(filepath);
console.log("filepath:%s", dirname);
//filepath:\users\mars



