//this keyword using.
//one:as method of object
var obj = {
    num:1,
    getNum:function(){
       console.log( this === obj ); // true
       console.log(this.num);//1
    }
}; 
obj.getNum();
//two:as normal function
window.name = "globalName";
var getName = function(){
    return this.name;
};
console.log(getName());// globalName
or
window.name = "globalName";
var myObject = {
   name:'sven', 
   getName:function(){
       return this.name;
   }
};
var getName = myObject.getName;
console.log(getName());//globalName

//html code.
<html>
 <body>
   <div id='div1'>I am a div.</div>
 </body>
 <script>
   window.id='window';
   document.getElementById('div1').onclick = function(){
      console.log(this.id);// div1
      var callback = function(){
          console.log(this.id);// window
      }
      callback();
   };
   // using this
   document.getElementById('div1').onclick = function(){
       var self = this;
       var callback = function(){
           console.log(self.id); // div1
       }
       callback();
   };
   // under strict 
   function func(){
       "use strict"
       console.log(this); // undefined
   }
 </script>
</html>
//constructor
var myClass = function(){
    this.name = 'sven';
};
var obj = new myClass();
console.log(obj.name);// sven
// or constructor return object.
var myClass = function(){
    this.name = 'sven';
    return {
        name:'anne'
    }
};
var obj = new myClass();
console.log(obj.name);// anne
// or constructor return str
var myClass = function(){
    this.name = 'sven';
    return 'anne';
};
var obj = new myClass();
console.log(obj.name);//sven

//Function.prototype.call or Function.prototype.apply
var obj1 = {
    name:'sven',
    getName:function(){
        return this.name;
    }
};
var obj2 = {
    name:'anne'
};
console.log(obj1.getName()); // sven
console.log(obj1.getName.call(obj2); // anne

// lost this
var obj = {
    myName:'sven',
    getName:function(){
        return this.myName;
    }
};
console.log(obj.getName());// sven
var getName2 = obj.getName;
console.log(getName2());// undefined
// getId
var getId = function(id){
    return document.getElementById(id);
};
getId('div1');
// or
var getId = document.getElementById;
getId('div1');
// html
<html>
<body>
  <div id="div1">I am a div.</div>
</body>
<script>
var getId = document.getElementById;
getId('div1');
</script>
</html>
// this is error method.
// because most of engine of document.getElementById method 
// inner using this.
// this should be as document obj.
//document
document.getElementById = (function(func){
    return function(){
        return func.apply(document, arguments);
    }
})(document.getElementById);

var getId = document.getElementById;
var div = getId('div1');
console.log(div);//div1
// call apply
var func = function(a,b,c){
    console.log([a,b,c]); // [1,2,3]
};
func.apply(null, [1,2,3]);
var func = function(a,b,c){
    console.log([a,b,c]);
};
func.call(null,1,2,3);//[1,2,3]
//window
var func = function(a,b,c){
    console.log(this == window);
};
func.apply(null, [1,2,3]); // true
// use strict 
var func = function(a,b,c){
    "use strict":
    console.log(this ===null);
};
func.apply(null, [1,2,3]);// true
//
Math.max.apply(null,[1,3,5,4,7]);//output:7












