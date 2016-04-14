//策略模式违反了 最少知识原则;
//即是 用使用该模式，必须了解所有的strategy，必须了解各个strategy之间的不同点，这样才能选择一个合适的strategy.
/*
*策略对象
*/
var strategies = {
	isNonEmpty:function(value, errorMsg){
		if(value === ''){
			return errorMsg;
		}
	},
	minLength:function(value, length, errorMsg){
		if(value.length < length){
			return errorMsg;
		}
	},
	isMobile:function(value, errorMsg){
		if(!/^1[3|5|7|8][0-9]{9}$/.test(value)){
			return errorMsg;
		}
	}
};
/*
*validator对象
*/
var validator = function(){
	this.cache = [];
};
validator.prototype.add = function(dom, rules){
	var self = this;
	for(var i = 0, rule; rule = rules[i++];){
		(function(rule){
			var strategyAry = rule.strategy.split(':');
			var errorMsg = rule.errorMsg;
			self.cache.push(function(){
				var strategy = strategyAry.shift();
				strategyAry.unshift(dom.value);
				strategyAry.push(errorMsg);
				return strategies[strategy].apply(dom, strategyAry);
			});
		})(rule);
	}
};
validator.prototype.start = function(){
	for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
		var errorMsg = validatorFunc();
		if(errorMsg){
			return errorMsg;
		}
	}
};

/*
*client代码
*/
var registerForm = document.getElementById('registerForm');
var validataFunc = function(){
	var validor = new validator();
	validor.add(registerForm.userName, [{
		strategy:'isNonEmpty',
		errorMsg:'用户名不能为空'
	},{
		strategy:'minLength:6',
		errorMsg:'用户名长度不能小于6'
	}]);

	var errorMsg = validor.start();
	return errorMsg;
};

registerForm.onsubmit = function(){
	var errorMsg = validataFunc();
	if (errorMsg) {
		console.log(errorMsg);
		return false;
	}
};