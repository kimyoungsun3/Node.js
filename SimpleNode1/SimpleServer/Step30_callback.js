function add(a, b, callback){
    var result = a + b;
    callback(result);
};

function add2(a, b, callback){
    var result = a + b;
    callback(result);

    var count = 0;
    var history = function(){
        count++;
        return count + " >> " + a + " + " + b + " = " + result;
    };

    return history;
};

//---------------------------
add(10, 20, function(result){
    console.log("add %d", result);
});


var add2_history = add2(10, 20, function(result){
    console.log("add %d", result);
});

console.log("add_history type %s", typeof(add2_history));
console.log("add_history history " + add2_history());
console.log("add_history history " + add2_history());
console.log("add_history history " + add2_history());