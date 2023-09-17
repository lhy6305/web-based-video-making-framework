//nw_init.js

(function(){
window.nwin=null;
if(!("nw" in window)){
console.warn("nw_init.js: global variable \"nw\" does NOT exist. Assuming it's running in a normal browser.");
return;
}
try{
window.nwin=nw.Window.get(window);
//nwin.enterFullscreen();
//nwin.focus();
var keyeventhandler=function(e){
if(e.type=="keydown"&&e.keyCode==27){
nwin.leaveFullscreen();
}else if(e.type=="mousedown"||e.type=="touchstart"){
//nwin.enterFullscreen();
//nwin.focus();
}else{
}
e.stopPropagation();
//e.preventDefault();
};
window.addEventListener("keydown",keyeventhandler);
window.addEventListener("mousedown",keyeventhandler);
window.addEventListener("touchstart",keyeventhandler);
}catch(e){
console.warn("nw_init.js: An error occured while initializing nw environment. See the warning below.");
console.warn(e);
}
})();
