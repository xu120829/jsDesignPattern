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



//document
document.getElementById = (function(func){
    return function(){
        return func.apply(document, arguments);
    }
})(document.getElementById);

var getId = document.getElementById;
var div = getId('div1');
console.log(div);//div1
