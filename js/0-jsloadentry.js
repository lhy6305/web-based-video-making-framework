//jsloadentry.js

(function(){
if(!(typeof scriptManager=="object"&&"loadjs" in scriptManager)){
if(typeof loadfail=="function"){
loadfail("脚本 jsloadentry.js 错误：scriptManager.loadjs 未定义");
}else{
window.alert("脚本 jsloadentry.js 错误：scriptManager.loadjs 未定义");
}
return;
}

scriptManager.loadjs("./js/nw_init.js");
scriptManager.loadjs("./js/webgl_check.js");
scriptManager.loadjs("./js/utils.js");
scriptManager.loadjs("./js/libcubicbezier.js");
if(!(typeof Buffer=="function"&&"from" in Buffer)){
//Buffer object polyfill
scriptManager.loadjs("./js/libbuffer_v603.min.js");
}
})();