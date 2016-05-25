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


