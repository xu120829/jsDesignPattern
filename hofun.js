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
