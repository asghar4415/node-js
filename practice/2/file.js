//file handling in nodejs

const fs=require("fs");

// fs.writeFileSync("read.txt","welcome to nodejs");
//this will create a file named read.txt and write the content in it. It is a synchronous function. it is also a blocking function.


// fs.writeFile("read.txt","welcome to nodejs",function(err){
//     console.log("file is created");
//     console.log(err);
// });
//this will create a file named read.txt and write the content in it. It is an asynchronous function. it is also a non-blocking function.

//The difference between this synchronous and asynchronous function is that in synchronous function the code will wait for the file to be created and then move to the next line of code. But in asynchronous function the code will not wait for the file to be created and will move to the next line of code.


//read file
// const result = fs.readFileSync('./contacts.txt', "utf-8");
// console.log(result);

// fs.readFile('./contacts.txt', "utf-8", (err, data) => {
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log(data);
//     }
    
// });   async function


