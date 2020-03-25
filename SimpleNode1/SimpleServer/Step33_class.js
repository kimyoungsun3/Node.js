class Car{
    constructor( _brand ){
        this.brand = _brand;
        this.year = 0;
    }
    present(){
        return 'I have a ' + this.brand;
    }
    // present2(){
    //     return 'I have a ' + brand;  //error
    // }
};

class Model extends Car{
    constructor(_brand, _model){
        super(_brand);
        this.model = _model;
    }
}

mycar = new Car("Ford");
console.dir(mycar);
console.log(mycar.present());
//console.log(mycar.present2());


mycar2 = new Model("ford", "xx 2");
console.dir(mycar2);
console.log(mycar2.present());



var mycar_ref = mycar;
console.log('=====ref======');
console.dir(mycar);
console.dir(mycar_ref);

console.log('===========');
mycar.year = 1;
console.dir(mycar);
console.dir(mycar_ref);

var mycar_val;


