/*
 *迭代器模式
 * /
var eachObj = function(){
   for(var i=0, fn; fn = arguments[i++];){
    var obj = fn(); 
    if(obj !== false){
       return obj;
    }
   }
} 

/*
 *调用代码示例
 * */
var getAObj = function(){
	try{
	   return new ActiveXObject("TXFTNActiveX.FTNUpload");
	}catch(e){
	   return false;
	}
}

var getFObj = function(){
    var str = '<input name="file" type="file" class="ui-file" />';
    return $(str).appendTo($('body'));
}

var Obj = eachObj(getAObj, getFObj); 

