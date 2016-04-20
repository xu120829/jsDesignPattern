var folder = function(name){
    this.name = name;
    this.files = [];
};
folder.prototype.add = function(file){
    this.files.push(file);
};
folder.prototype.scan = function(){
    console.log("scan folder.");
    for(var i=0,file,files=this.files;file=files[i++];){
       file.scan();
    }
};
var file = function(name){
   this.name = name;
};
file.prototype.add = function(){
   throw new Error("no add.");
};
file.prototype.scan = function(){
   console.log("begin scan.");
};
