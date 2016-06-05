var getUserInfo = function(userId, callback){
   $.ajax('http://xxx/getuserInfo?'+userId, function(data){
        if(typeof callback === 'function'){
           callback(data);
        }
   });
}
getUserInfo(12123, function(data){
   console.log(data.userName);
});
//create 100 div
var appendDiv = function(){
   for(var i = 0; i < 100; i++){
      var div = document.createElement('div');
      div.innerHTML = i;
      document.body.appendChild(div);
      div.style.display = 'none';
   }
};
appendDic();
//
var appendDiv = function(callback){
   for(var i = 0; i < 100; i++){
      var div = document.createElement('div');
      div.innerHTML = i;
      document.body.appendChild(div);
      if(typeof callback === 'function'){
         callback(div);
      }
   }
};
appendDiv(function(node){
   node.style.display = 'none';
});
//Array.prototype.sort
[1,6,3].sort(function(a,b){
   return a - b;
});//[1,3,6]
[1,6,3].sort(function(a,b){
   return b - a;
});
// return value
var isString = function(obj){
   return Object.prototype.toString.call(obj) === '[object String]';
};
var isArray = function(obj){
   return Object.prototype.toString.call(obj) === '[object Array]';
};
var isNumber = function(obj){
   return Object.prototype.toString.call(obj) === '[object Number]';
};
//
var isType = function(type){
   return function(obj){
      return Object.prototype.toString.call(obj) === '[object ' + type + ']';
   }
}
var isString = isType('String');
var isArray = isType('Array');
var isNumber = isType('Number');
console.log(isArray([1,3,4]));//true
//
var Type = {};
for(var i = 0, type; type = ['String', 'Array', 'Number'][i++];){
   (function(type){
      Type['is' + type] = function(obj){
         return Object.prototype.toString.call(obj) === '[object ' + type + ']';
      }
   })(type)
};
Type.isArray([]);//output true
Type.isString("str");//output true
//
var getSingle = function(fn){
   var ret;
   return function(){
      return ret || (ret = fn.apply(this, arguments));
   };
};
var getScript = getSingle(function(){
   return document.createElement('script');
});
var script1 = getScript();
var script2 = getScript();
console.log(script1 === script2);
//
Function.prototype.before = function(beforefn){
   var _self = this;
   return function(){
      beforefn.apply(this, arguments);
      return _self.apply(this, arguments);
   }
};
Function.prototype.after = function(afterfn){
   var _self = this;
   return function(){
      var ret = _self.apply(this, arguments);
      afterfn.apply(this, arguments);
      return ret;
   }
};
var func = function(){
   console.log(3);
};
func = func.before(function(){
   console.log(5);
}).after(function(){
   console.log(1);
});
func();// 5 , 3 , 1
//currying
var monthlyCost = 0;
var cost = function(money){
   monthlyCost += money;
};
cost(100);
cost(200);
cost(300);
console.log(monthlyCost);// 600
//
var cost = (function(){
   var args = [];
   return function(){
      if(arguments.length === 0){
         var money = 0;
         for(var i = 0, l = args.lenght; i < l; i++){
            money += args[i];
         }
         return money;
      }else{
         [].push.apply(args, arguments);
      }
   }
})();
cost(100);
cost(200);
cost(300);
console.log(cost());// 600
//
var currying = function(fn){
   var args = [];
   return function(){
      if(arguments.length === 0){
         return fn.apply(this, args);
      }else{
         [].push.apply(args, arguments);
         return arguments.callee;
      }
   }
};
var cost = (function(){
   var money = 0;
   return function(){
      for(var i = 0, l = arguments.length; i < l; i++){
         money += arguments[i];
      }
      return money;
   }
})();
var cost = currying(cost);
cost(100);
cost(200);
cost(300);
console.log(cost()); // 600
//uncurrying
var obj1 = {
   name:'sven'
};
var obj2 = {
   getName:function(){
      return this.name;
   }
};
console.log(obj2.getName.call(obj1));// sven
(function(){
   Array.prototype.push.call(arguments, 4);
})(1,2,3);// [1,2,3,4]
Function.prototype.uncurrying = function(){
   var self = this;
   return function(){
      var obj = Array.prototype.shift.call(arguments);
      return self.apply(obj, arguments);
   }
};
var push = Array.prototype.push.uncurrying();
(function(){
   push(arguments, 4);
   console.log(arguments);//[1,2,3,4]
})(1,2,3);
//
for(var i = 0, fn, ary = ['push','shift','forEach']; fn = ary[i++];){
   Array[fn] = Array.prototype[fn].uncurrying();
};
var obj = {
   "length":3,
   "0":1,
   "1":2,
   "2":3
};
Array.push(obj, 4);
console.log(obj.length);//4
var first = Array.shift(obj);
console.log(first);//1
console.log(obj);//{0:2,1:3,2:4,lenght:3}
Array.forEach(obj, function(i, n){
   console.log(n);// 0,1,2
});
var call = Function.prototype.call.uncurrying();
var fn = function(name){
   console.log(name);
};
call(fn, window, 'sven');// sven
var apply = Function.prototype.uncurrying();
var fn = function(name){
   console.log(this.name);
   console.log(arguments);
};
apply(fn, {name:'sven'}, [1, 2, 3]);
//
Function.prototype.uncurrying = function(){
   var self = this;
   return function(){
      var obj = Array.prototype.shift.call(arguments);
      return self.apply(obj, arguments);
   };
};
var push = Array.prototype.push.uncurrying();
var obj = {
   "length":1,
   "0":1
};
push(obj, 2);
console.log(obj);//{0:1, 1:2, lenght:2}
Function.prototype.uncurrying = function(){
   var self = this;
   return function(){
      return Function.prototype.call.apply(self, arguments);
   }
};
//
var throttle = function(fn, interval){
   var _self = fn,timer,firstTime = true;
   return function(){
      var args = arguments, _me = this;
      if(firstTime){
         _self.apply(_me, args);
         return firstTime = false;
      }
      if(timer){
         return false;
      }
      timer = setTimeout(function(){
         clearTimeout(timer);
         timer = null;
         _self.apply(_me, args);
      }, interval || 500);
   };
};
window.onresize = throttle(function(){
   console.log(1);
}, 500);
//
var ary = [];
for(var i = 1; i <= 1000; i++){
   ary.push(i);
};
var renderFriendList = function(data){
   for(var i = 0, l = data.length; i < l; i++){
      var div = document.createElement('div');
      div.innerHTML = i;
      document.body.appendChild(div);
   }
};
renderFriendList(ary);
//
var timeChunk = function(ary, fn, count){
   var obj, t;
   var len = ary.length;
   var start = function(){
      for(var i = 0; i < Math.min(count || 1, ary.length); i++){
         var obj = ary.shift();
          fn(obj);
      }
   };
   return function(){
      t = setInterval(function(){
         if(ary.length === 0){
            return clearInterval(t);
         }
         start();
      }, 200);
   };
};
//
var ary = [];
for(var i = 1; i <= 1000; i++){
   ary.push(i);
};
var renderFriendList = timeChunk(ary, function(n){
   var div = document.createElement('div');
   div.innerHTML = n;
   document.body.appendChild(div);
}, 8);
renderFriendList();
//
var addEvent = function(elem, type, handler){
   if(window.addEventListener){
      return elem.addEventListener(type, handler, false);
   }
   if(window.attachEvent){
      return elem.attachEvent('on' + type, handler);
   }
};
//
var addEvent = (function(){
   if(window.addEventListener){
      return function(elem, type, handler){
         elem.addEventListener(type, handler, false);
      }
   }
   if(window.attachEvent){
      return function(elem, type, handler){
         elem.attachEvent('on' + type, handler);
      }
   }
})();


