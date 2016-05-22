function prepareGallery(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementsById) return false;
    if(!document.getElementsById("imagegallery")) return false;
    var gallery = document.getElementsById("imagegallery");
    var links = gallery.getElementByTagName("a");
    for(var i = 0; i < links.length; i++){
       links[i].onclick = function(){
          return showPic(this) ? false : true;
       }
    }
}
function showPic(whichPic){
    //...
    return true;
}
