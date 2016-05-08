//support Object.create() method 
Object.create = Object.create || function(obj){
    var F = function(){};
    F.prototype = obj;
    return new F();
};
