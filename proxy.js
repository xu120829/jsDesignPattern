/*
* 代理模式
*/
var createProxyFactory = function(fn){
	var cache = {};
	return function(){
		var args = Array.prototype.join.call(arguments, ',');
		if(args in cache){
			return cache[args];
		}
		return cache[args] = fn.apply(this, arguments);
	};
};

