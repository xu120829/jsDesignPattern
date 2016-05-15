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
            return Object.prototype.toString.call(obj) === '[object ' + type + '']';
        }
    })(type)
};
Type.isArray([]);
Type.isString("str");









