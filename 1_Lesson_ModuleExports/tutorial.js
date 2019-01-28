const sum = (a,b)=>a+b;
const PI = 3.14159;
class SomeMathObject{
    constructor(){
        console.log('Object Creted');
    }
}
/**
 * module.exports.sum = sum;
 *module.exports.PI = PI;
 *module.exports.SomeMathObject = SomeMathObject; 
 */

 module.exports={
     sum:sum,
     PI:PI,
     SomeMathObject:SomeMathObject
 }