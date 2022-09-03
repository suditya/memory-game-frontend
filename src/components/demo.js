// // // let x="2";
// // // let y=3;
// // // let z= x/y;
// // // // console.log(z, typeof(z));

// // // let a="hello";
// // // console.log(a);
// // // a=2;
// // // console.log(a);
// // // a=NaN
// // // console.log(a);

// // // isNaN("Hello")  // Returns true
// // // isNaN(345)   // Returns false
// // // isNaN('1')  // Returns false, since '1' is converted to Number type which results in 0 ( a number) 
// // // isNaN(true) // Returns false, since true converted to Number type results in 1 ( a number)
// // // isNaN(false) // Returns false
// // // isNaN(undefined) // Returns true

// // // var y = [2,3,4];
// // // var z = y;
// // // z[0]=5;
// // // console.log(y, z);

// // // (function(){ 
// // //     console.log("hello mf");
// // //   })();

// // // let a=function(x){
// // //     console.log(x,"first");
// // //     return function(b)
// // //     {
// // //         console.log("3", b);
// // //     }
// // // }
// // // // a("suditya");
// // // a("djd")(4)

// // // function doSomething(x) {
// // //     console.log(this);
// // // }

// // //   doSomething(22);

// // // function foo(){
// // // 	var a =2 ;
// // // 	bar();
// // // }

// // // function bar(){
// // // 	console.log(this.a);
// // // }


// // // foo(); //undefined


// // let obj=
// // {
// //     name:"suditya",
// //     fn:function()
// //     {
// //         console.log("mf" , this);
// //     }
// // }

// // // obj.fn();
// // function abc()
// // {
// //     obj.fn();
// //     console.log("this",this.name )
// // }
// // abc();
// // // let obj2=
// // // {
// // //     name:"sudis",
// // //     fn:function(obj)
// // //     {
// // //         console.log(this);
// // //     }
// // // }

// let counter = {
//     count: 0,
//     next: function () {
//       return ++this.count;
//     },
//   };
//   counter.next();
//   console.log(counter.count)

/**                            /   `
 * ______________(((((((((((***-------***)))))))))))
 *                             |||||||               
 */
// var person = {
//     age: 23,
//     getAge: function(){
//       return this.age;
//     }
//   }        
//   var person2 = {age:  54};
//  console.log(person.getAge.call(person2))      
//   // Returns 54  

// function saySomething(message, nhhh){
// //     console.log(this.name + " is " + message)
// //     return this.name + " is " + message;
// //   }        
// //   var person4 = {name:  "John"};
// //   saySomething.apply(person4, ["chutiyaa"]);

// // function s() //statement
// // { 
// //     console.log("hi");
// // }

// // const x= ()=>
// // {
// //     console.log("girly")
// // }
// // // A function as an expression can be created as shown in the following code example.

// // let add = function a(num1,num2){
// //     let sum = num1+ num2; 
// //     return sum;
// // }

// // let res = add(8,9);
// // console.log(res);// 17

// // var add = Function('num1','num2','return num1+num2');
// // let res = add (7,8);
// // console.log(res); // 15


// ()=>
// {
//     console.log("hi");
// }

// let arr = ['apple', 'grapes', 'banana'];
// let b = 3
// function x(arr)
// {
//     console.log(arr[0]);
//     ()=>
//     {
//         console.log(arr[0]);
//     }
// }
// x(arr);

// var myFunction = function() {
//     console.log(this.a);
//  }
 
//  var a = 5 ;
//  myFunction();   


// arr.forEach(function(a)
// {
//     console.log(this);
//     // console.log(a);
// })
// console.log(this.global);


// let group = {
//     title: "Our Group",
//     students: ["John", "Pete", "Alice"],

//     showList() {
//       this.students.forEach(
//         student => console.log(this.title + ': ' + student)
//       );
//     }
//   };

//   group.showList();

// let group = {
//     title: "Our Group",
//     students: ["John", "Pete", "Alice"],

//     showList() {
//       this.students.forEach(function(student) {
//         // Error: Cannot read property 'title' of undefined
//         console.log(group.title + ': ' + student);
//       });
//     }
//   };

//   group.showList();

//   function bar (){
// 	console.log(this.a);
// }


var myFunction =  ()=> {
    console.log(this.a);
}

var a = 5;
myFunction();   