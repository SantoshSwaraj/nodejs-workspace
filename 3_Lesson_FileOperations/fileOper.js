const fs = require('fs');
//console.log(fs);

//Sync File Read
// console.log('Start Sync Read');
// var data = fs.readFileSync('test.txt');
// console.log(data.toString());
// console.log('End Sync Read');


//Async File Read
// console.log('Start Async Read');
// var data = fs.readFile('test.txt',(err,data)=>{
//     console.log(data.toString());
// });
// console.log('End Async Read');

//Sync File Write
// console.log('Start Sync Write');
// fs.writeFileSync('test.txt',"Santosh Kushwaha");
// console.log('Replaced');
// console.log('End Sync Write');

//Async File Write
console.log('Start Asyn Write');
let user = {"userId":101, "userName":"Santosh"}
fs.writeFile('test.txt', JSON.stringify(user) , (err)=>{
    if(err)
        throw err;
    console.log('Replaced');
});
console.log('End Asyn Write');

//Sync File Update
// console.log('Start Sync Append');
// fs.appendFileSync('test.txt',"Santosh Kushwaha");
// console.log('Updated');
// console.log('End Sync Append');

//Async File Update
// console.log('Start Async Append');
// fs.appendFile('test.txt',"Amit Kumar", (err)=>{
//     if(err)
//         throw err;
//     console.log('Updated');
// });
// console.log('End Async Append');



