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
 </script>
</html>



//document
document.getElementById = (function(func){
    return function(){
        return func.apply(document, arguments);
    }
})(document.getElementById);

var getId = document.getElementById;
var div = getId('div1');
console.log(div);//div1
