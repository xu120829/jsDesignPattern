var Singleton = function(name){
	this.name = name;
	this.instance = null;
};
Singleton.prototype.getName = function(){
	console.log(this.name);
};
Singleton.getInstance = function(name){
	if(!this.instance){
		this.instance = new Singleton(name);
	}
	return this.instance;
};
var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');
console.log(a === b); // true
// or
var Singleton = function(name){
	this.name = name;
};
Singleton.prototype.getName = function(){
	console.log(this.name);
};
Singleton.getInstance = (function(){
	var instance = null;
	return function(name){
		if(!instance){
			instance = new Singleton(name);
		}
		return instance;
	}
})();
var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');
console.log(a === b); // true
//
var CreateDiv = (function(){
	var instance;
	var CreateDiv = function(html){
		if(instance){
			return instance;
		}
		this.html = html;
		this.init();
		return instacne = this;
	};
	CreateDiv.prototype.init = function(){
		var div = document.createElement('div');
		div.innerHTML = this.html;
		document.body.appendChild(div);
	};
	return CreateDiv;
})();
var a = new CreateDiv('sven1');
var b = new CreateDiv('sven2');
console.log(a === b);//true
//
var CreateDiv = function(html){
	if(instance){
		return instance;
	}
	this.html = html;
	this.init();
	return instance = this;
};
//
var CreateDiv = function(html){
	this.html = html;
	this.init();
};
CreateDiv.prototype.init = function(){
	var div = document.createElement('div');
	div.innerHTML = this.html;
	document.body.appendChild(div);
};
var ProxySingletonCreateDiv = (function(){
	var instance;
	return function(html){
		if(!instance){
			instance = new CreateDiv(html);
		}
		return instance;
	}
})();
var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
console.log(a === b);
//namespace
var namespace1 = {
	a:function(){
		console.log(1);
	},
	b:function(){
		console.log(2);
	}
};
var myApp = {};
myApp.namespace = function(name){
	var parts = name.split('.');
	var current = myApp;
	for(var i in parts){
		if(!current[parts[i]]){
			current[parts[i]] = {};
		}
		current = current[parts[i]];
	}
};
myApp.namespace('event');
myApp.namespace('dom.style');
console.dir(myApp);
//equals this below code.
var myApp = {
	event:{},
	dom:{
		style:{}
	}
};
var user = (function(){
	var _name = 'sven', _age = 29;
	return {
		getUserInfo:function(){
			return _name + '-' + _age;
		}
	}
})();
Singleton.getInstance = (function(){
	var instance = null;
	return function(name){
		if(!instance){
			instance = new Singleton(name);
		}
		return instance;
	}
})();
//
<html>
<body>
<button id="loginBtn">login</button>
</body>
<script>
var loginLayer = (function(){
	var div = document.createElement('div');
	div.innerHTML = 'I am login frame.';
	div.style.display = 'none';
	document.body.appendChild(div);
	return div;
})();
document.getElementById('loginBtn').onclick = function(){
	loginLayer.style.display = 'block';
};
</script>
</html>
//
<html>
<body>
<button id="loginBtn">login</button>
</body>
<script>
var createLoginLayer = (function(){
	var div = document.createElement('div');
	div.innerHTML = 'I am login frame.';
	div.style.display = 'none';
	document.body.appendChild(div);
	return div;
})();
document.getElementById('loginBtn').onclick = function(){
        var loginLayer = createLoginLayer();
	loginLayer.style.display = 'block';
};
</script>
</html>
//
var createLoginLayer = (function(){
	var div;
	return function(){
		if(!div){
			var div = document.createElement('div');
			div.innerHTML = 'I am login frame.';
			div.style.display = 'none';
			document.body.appendChild(div);
		}
		return div;
	}
})();
/*
*
*常规单例模式代码
*
*/
var getSingleton = function(fn){
	var singleRes;
	return function(){
		return singleRes || (singleRes = fn.apply(this, arguments));
	}
};

/*
*
*jQuery中one事件对应的源码
*暂时没有加入依赖
*
*/
function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	}
});
