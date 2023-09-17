//jsloadentry.js

(function(){
if(!("scriptManager" in window&&"loadjs" in scriptManager)){
if("loadfail" in window){
window.loadfail("脚本 jsloadentry.js 错误：scriptManager.loadjs 未定义");
}else{
window.alert("脚本 jsloadentry.js 错误：scriptManager.loadjs 未定义");
}
return;
}

scriptManager.loadjs("./js/nw_init.js");
scriptManager.loadjs("./js/webgl_check.js");
scriptManager.loadjs("./js/utils.js");
scriptManager.loadjs("./js/libcubicbezier.js");

})();