var mediator = (function(){
    var colorSel,memorySel;
    return{
        changed:function(obj){
	    var color = colorSel.value,
	        memory = memorySel.value;
	    if(obj == colorSel){
	       //...
	    }else if(obj == memorySel){
	      //...
	    }
	    if(!color){
	      //...
	      return;
	    }
	    if(!memory){
	     //...
	     return;
	    }
	}
    }
})(); 
colorSel.onchange = function(){
   mediator.changed(this);
};
