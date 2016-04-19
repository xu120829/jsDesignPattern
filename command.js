var setCommand = function(button, func){
   button.onclick = function(){
       func();
   };
};

var menuBar = {
   refresh:function(){
      console.log("refresh.");
   }
};

var refreshMenuBarCommand = function(receiver){
   return function(){
      receiver.refresh();
   }
};

var refreshCommand = refreshMenuBarCommand(menuBar);

setCommand(button1,refreshCommand);
