//fconsole.js

(function(){
var do_loadfail=function(msg){
var a=document.createElement("div");
a.style.textAlign="center";
a.style.display="inline-block";
a.style.position="absolute";
a.style.zIndex="999999";
a.style.margin="auto";
a.style.color="rgba("+0xff+","+0xff+","+0x00+",1)";
a.style.width="100%";
a.style.verticalAlign="middle";
a.style.outline="none";
a.style.top="20vh";
a.style.fontSize="20px";
a.style.lineHeight="25px";
a.style.whiteSpace="pre";
a.innerHTML="Fatal error: "+msg;

document.body.innerHTML="";
document.body.style.backgroundColor="rgba("+0x75+","+0x60+","+0x60+",1)";
document.body.appendChild(a);
};

window.loadfail=function(msg){
if(document.readyState=="complete"){
do_loadfail(msg);
}else{
window.addEventListener("load",function(){
do_loadfail(msg);
});
}
};


})();
