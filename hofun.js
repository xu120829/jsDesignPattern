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



