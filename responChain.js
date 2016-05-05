var  getActiveUploadObj = function(){
    try{
        return new ActiveXObject("TXFTNActiveX.FTNUpload");
    }catch(e){
        return "nextSuccessor";
    }
};
var getFlashUploadObj = function(){
    if(supportFlash()){
       var str = '<object type="application/x-shockwave-flash"></object>';
       return $(str).appendTo($('body'));
    }
    return 'nextSuccessor';
};
var getFormUploadObj = function(){
    return '';
};
var getUploadObj = '';
