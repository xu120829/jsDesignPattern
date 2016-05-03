var light = function(){
    this.currState = FSM.off;
    this.button = null;
}; 
light.prototype.init = function(){
    var button = document.createElement("button"),
        self = this;
    button.innerHTML = "closed.";
    this.button = document.body.appendChild(button);
    this.button.onclick = function(){
        self.surrState.buttonWasPressed.call(self);
    }
};
var FSM = {
   off:{
      buttonWasPressed:function(){
         console.log("close light.");
	 this.button.innerHTML = "next .";
	 this.currState = FSM.on;
      }
   },
   on:{
       buttonWasPressed:function(){
          console.log("open light.");
	  this.button.innerHTML = "next .";
	  this.currState = FSM.off;
       }
   }
};
var lightObj = new light();
lightObj.init();
