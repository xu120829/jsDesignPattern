var beverage = function(param){
    var boilWater = function(){
        console.log("boil water.");
    };
    var brew = param.brew || function(){
        throw new Error("must argu brew method.");
    };
    var pourInCup = param.pourInCup || function(){
        throw new Error("must argu pourInCup method.");
    };
    var addCondiments = param.addCondiments || function(){
        throw new Error("must argu addCondiments method.");
    };
    var func = function(){};
    func.prototype.init = function(){
        boilWater();
	brew();
	pourInCup();
	addCondiments();
    };
    return func;
};

var coffee = beverage({
    brew:function(
       console.log("boiled water coffee.");
    ), 
    pourInCup:function(){
       console.log("put coffee in cup.");
    },
    addCondiments:function(){
       console.log("add sugar and milk."); 
    }
});

var tea = beverage({
    brew:function(
        console.log("boiled water tea.");
    ),
    pourInCup:function(){
        console.log("put tea in cup.");
    },
    addCondiments:function(){
        console.log("add nimeng.");
    }
});

var coffeeObj = new coffee();
coffeeObj.init();
var teaObj = new tea();
teaObj.init();
