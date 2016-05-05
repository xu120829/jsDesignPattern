var  getXCity = function(){
    var xCity = [
       {
         name:'cityname',
	 id:1
       },
       {
         name:'cityname',
	 id:2
       }
    ];
    return xCity;
};
var cityAdapter = function(){
    var address = {},
        oldaddress = {};
    for(var i=0,c;c=oldaddress[i++];){
       address[c.name]= c.id;
    }
    return function(){
        return address;
    }
}
