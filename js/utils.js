//utils.js

(function(){
var util={};

util.calcresize=function(cw,ch,ew,eh){ //return=[width,height,left,top]
if(cw/ew<ch/eh){
return [cw,cw/ew*eh,0,(ch-cw/ew*eh)/2];
}else{
return [ch/eh*ew,ch,(cw-ch/eh*ew)/2,0];
}
};

util.encodeHtmlSpecChars=function(html){
var elem=document.createElement("div");
var txt=document.createTextNode(html);
elem.appendChild(txt);
return elem.innerHTML;
};

util.decodeHtmlSpecChars=function(str){
var elem=document.createElement("div");
elem.innerHTML=str;
return elem.innerText||elem.textContent;
};

util.initFont=function(name){
var elem=document.createElement("div");
elem.style.fontFamily=name;
elem.innerHTML=String(Math.random());
document.body.appendChild(elem);
setTimeout(function(){
document.body.removeChild(elem);
},0);
};

(function(){ //ticker-logic
util.ticker={};
util.ticker.started=false;
util.ticker.fttps=60;
util.ticker.starttime=0;
util.ticker.execcount=0;
util.ticker.nextAnimationFrameID=false;
util.ticker.nrlist=[];
util.ticker.ftlist=[];

util.ticker.start=function(){
util.ticker.started=true;
util.ticker.starttime=performance.now();
util.ticker.nextAnimationFrameID=window.requestAnimationFrame(util.ticker.step);
};

util.ticker.stop=function(){
util.ticker.started=false;
if(util.ticker.nextAnimationFrameID!==false){
window.cancelAnimationFrame(util.ticker.nextAnimationFrameID);
}
util.ticker.nextAnimationFrameID=false;
util.ticker.starttime=0;
util.ticker.execcount=0;
};

util.ticker.add=function(func,istimefixed){ //return=(boolean)is_success
if(arguments.length<=1){
istimefixed=false;
}
var obj={};
obj.func=func;
obj.addtime=performance.now();
if(istimefixed){
util.ticker.ftlist.push(obj);
}else{
util.ticker.nrlist.push(obj);
}
return true;
};

util.ticker.remove=function(func){ //return=(boolean)is_success
for(var a=0;a<util.ticker.nrlist.length;a++){
if(util.ticker.nrlist[a].func==func){
util.ticker.nrlist.splice(a,1);
return true;
}
}
for(var a=0;a<util.ticker.ftlist.length;a++){
if(util.ticker.ftlist[a].func==func){
util.ticker.ftlist.splice(a,1);
return true;
}
}
return false;
};

util.ticker.step=function(t){
if(util.ticker.started){
util.ticker.nextAnimationFrameID=window.requestAnimationFrame(util.ticker.step);
}else{
return;
}
var time=performance.now();
for(var a=0;a<util.ticker.nrlist.length;a++){
try{
util.ticker.nrlist[a].func(time-util.ticker.nrlist[a].addtime);
}catch(e){
console.error(e);
}
}

for(var c=util.ticker.execcount;c<Math.floor((performance.now()-util.ticker.starttime)/1000*util.ticker.fttps);c++){
for(var a=0;a<util.ticker.ftlist.length;a++){
try{
util.ticker.ftlist[a].func(c*1000/util.ticker.fttps+util.ticker.starttime-util.ticker.ftlist[a].addtime);
}catch(e){
console.error(e);
}
}
util.ticker.execcount++;
}
};

util.ticker.start();
})();

util.getfile=function(pth){ //return=(string)||false
if(typeof pth!="string"){
return false;
}
try{
var xhr=new XMLHttpRequest();
xhr.open("GET",pth,false);
xhr.send();
}catch(e){
console.error(e);
return false;
}
if(xhr===null){
return false;
}
return Buffer.from(xhr.response);
};

util.getjson=function(pth){ //return=(object)||false
var txt=util.getfile(pth);
txt=txt.toString("utf-8");
try{
txt=JSON.parse(txt);
}catch(e){
console.error(e);
return false;
}
if(txt===null){
return false;
}
return txt;
};

util.addTransition=function(obj,key,from,to,time,x0,y0,x1,y1){
if(arguments.length<5||!(key in obj)){
console.error("util.transition: invalid parameters found");
return false;
}
if(arguments.length<=5){
x0=0.5;
y0=0.5;
x1=0.5;
y1=0.5;
}
from=Number(from);
to=Number(to);
time=Number(time);
x0=Number(x0);
y0=Number(y0);
x1=Number(x1);
y1=Number(y1);
if(isNaN(from)||isNaN(to)||isNaN(time)||isNaN(x0)||isNaN(y0)||isNaN(x1)||isNaN(y1)){
console.error("util.transition: error parsing arguments of cubic-bezier control points");
return false;
}
obj[key]=from;
var bz=bezier(x0,y0,x1,y1);
var func=function(t){
t/=1000;
if(t<0){
return;
}
if(t>time){
util.ticker.remove(func);
try{
obj[key]=to;
}catch(e){
console.warn("util.transition: cannot set attribute of object");
util.ticker.remove(func);
return;
}
return;
}
try{
if(to>from){
obj[key]=(to-from)/time*bz(t);
}else{
obj[key]=from-(from-to)/time*bz(t);
}
}catch(e){
console.warn("util.transition: cannot set attribute of object");
util.ticker.remove(func);
return;
}
};
//util.ticker.add(func);
util.ticker.add(func,true);
};

window.util=util;
})();
