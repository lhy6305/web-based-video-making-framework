//webgl_check.js

(function(){

window.suppgl=false;
var cv=document.createElement("canvas");
var gl=cv.getContext("webgl")||cv.getContext("experimental-webgl");
if(gl!==null&&"WebGLRenderingContext" in window&&gl instanceof window.WebGLRenderingContext){
console.info("webgl_check.js: the browser supports webgl");
window.suppgl=true;
}else{
console.info("webgl_check.js: the browser does NOT support webgl");
//window.loadfail("webgl_check.js: the browser does NOT support webgl");
//return;
}

if(!("scriptManager" in window&&"loadjs" in scriptManager)){
if("loadfail" in window){
window.loadfail("脚本 webgl_check.js 错误：scriptManager.loadjs 未定义");
}else{
window.alert("脚本 webgl_check.js 错误：scriptManager.loadjs 未定义");
}
return;
}

scriptManager.loadjs(window.suppgl?"./js/libpixi_v7240gl.min.js":"./js/libpixi_v7240lg.min.js");
var itv=window.setInterval(function(){
if(scriptManager.isDone()){
scriptManager.loadjs("./js/timeline.js");
scriptManager.loadjs("./js/framework.js");
window.clearInterval(itv);
}
},300);

})();