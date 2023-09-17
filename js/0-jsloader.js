//jsloader.js

(function(){

var scriptManager={};
scriptManager.loadingcount=0;

scriptManager.loadjs=function(pth){
var sc=document.createElement("script");
sc.src=pth;
//sc.type="text/javascript";
if(document.readyState=="complete"){
document.body.appendChild(sc);
}else{
window.addEventListener("load",function(){
document.body.appendChild(sc);
});
}

sc.addEventListener(("readyState" in sc?"readystatechange":"load"),function(){
console.info("script "+pth+" loaded successfully.");
scriptManager.loadingcount--;
});

sc.addEventListener("error",function(){
window.loadfail("脚本文件 "+pth+" 加载失败！！程序中止");
});

scriptManager.loadingcount++;

};

scriptManager.isDone=function(){
return scriptManager.loadingcount==0;
};

window.scriptManager=scriptManager;
})();

