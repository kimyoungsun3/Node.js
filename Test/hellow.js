var bBranch = true;
if(bBranch){
    console.log(true);
}else{
    console.log(false);
}

console.log('----------------');
console.log(true);
console.log(false);

console.log('----------------');
console.log(1+1);

console.log('----------------');
var x = 1;
var y = 2;
console.log(x == y);
console.log(x != y);

console.log('----------------');
process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });

console.log('----------------');
var arr = ['A', 'B', 'C', 'D'];
arr.push('E');
arr.pop('C');
for(i = 0; i < arr.length; i++){
    console.log(i + " >> " + arr[i]);
}


console.log('----------------');
var xx = 0;
while(xx < 3){
    console.log(xx);
    xx++;
};

console.log('----------------');
var testFolder = './';
var fs = require('fs');
 
fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
})