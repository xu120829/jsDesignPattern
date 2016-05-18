var func = function(){
    var a = 1;
    var btemp = arguments != null && arguments.count > 0 ? arguments[0] : 0;
    return function(){
        a++;
        console.log(a);
    }
};
var f = func();
f();//2
f();//3
f();//4

//html
<html>
<body>
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<script>
var nodes = document.getElementsByTagName('div');
for(var i = 0, len = nodes.length; i < len; i++){
    // error.
    nodes[i].onclick = function(){
         console.log(i);
    }
    //right.
    (function(i){
        nodes[i].onclick = function(){
           console.log(i);
        }
    })(i)
}
</script>
</body>
</html>
// type
var Type = {};
for(var i = 0, type; type = ['String','Array','Number'][i++];){
    (function(type){
        Type['is'+type] = function(obj){
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    })(type)
};
Type.isArray([]);
Type.isString("str");
//closure
var mult = function(){
    var a = 1;
    for(var i = 0, l = arguments.length; i < 1; i++){
        a = a * arguments[i];
    }
    return a;
};
var cache = {};
var mult = function(){
    var args = Array.prototype.join.call(arguments, ',');
    if(cache[args]){
        return cache[args];
    }
    var a = 1;
    for(var i = 0, l = arguments.length; i < l; i++){
        a = a * arguments[i];
    }
    return cache[args] = a;
};
console.log(mult(1,2,3)); // 6
console.log(mult(1,2,3));// from cache ,6
//put cache in mult
var mult = (function(){
    var cache = {};
    return function(){
        var args = Array.prototype.join.call(arguments, ',');
        if(args in cache){
            return cache[args];
        }
        var a = 1;
        for(var i = 0, l = arguments.length; i < l; i++){
            a = a * arguments[i];
        }
        return cache[args] = a;
    }
})();
//
var mult = (function(){
    var cache = {};
    var calculate = function(){
        var a = 1;
        for(var i = 0, l = arguments.length; i < l; i++){
            a = a* arguments[i];
        }
        return a;
    };
    return function(){
        var args = Array.prototype.join.call(arguments, ',');
        if(args in cache){
            return cache[args];
        }
        return cache[args] = calculate.apply(null, arguments);
    }
})();
//
var report = function(src){
    var img = new Images();
    img.src = src;
};
report('http://xxx.com/filepath');
//
var report = (function(){
    var imgs = [];
    return function(src){
        var img = new Images();
        imgs.push(img);
        img.src = src;
    }
})();
//
var extent = function(){
    var value = 0;
    return {
        call:function(){
            value ++;
            console.log(value);
        }
    }
};
var ext = extent();
ext.call();//1
ext.call();//2
//
var extent = {
    value:0,
    call:function(){
        this.value++;
        console.log(this.value);
    }
};
extent.call();//1
extent.call();//2
//
var Extent = function(){
    this.value = 0;
};
Extent.prototype.call = function(){
    this.value++;
    console.log(this.value);
};
var extent = Extent();
extent.call();//1
extent.call();//2



