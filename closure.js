var func = function(){
    var a = 1;
    return function(){
        a++;
        console.log(a);
    }
};
var f = func();
f();//2
f();//3
f();//4
