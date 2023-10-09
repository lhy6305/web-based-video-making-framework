//timeline.js

(function(){
var timeline={};

var enabled_events=["mousedown","mouseup","mousemove","keydown","keyup","keypress","click","dblclick","wheel","blur","focus"];

timeline.reset=function(){
timeline.started=false;
for(var a=0;a<enabled_events.length;a++){
window.removeEventListener(enabled_events[a],timeline.onevent);
}
util.ticker.remove(timeline.step);
for(a in timeline.vars){
if(typeof timeline.vars[a]=="object"&&"destroy" in timeline.vars[a]){
try{
timeline.vars[a].destroy();
}catch(e){}
}
timeline.vars[a]=null;
}
timeline.vars={};
timeline.code=null;
timeline.exec_line=0;
timeline.starttime=0;
timeline.sleep_time_runtime_total=0;
timeline.need_sleep_1tick=false;
timeline.on_user_event=false;
timeline.waiting_for_user_event=false;
};
timeline.reset();

timeline.play=function(name){
var code=util.getfile("./timeline/"+name+".js");
code=code.toString("utf-8");
if(code===false){
console.error("timeline file \"./timeline/"+name+".js\" cannot be loaded.");
return false;
}
timeline.reset();
timeline.code=code;
timeline.start();
return true;
};

timeline.sleep=function(t){
t=Number(t);
if(isNaN(t)){
console.error("timeline.sleep(): error parsing arguments[0]");
return;
}
timeline.need_sleep_1tick=true;
t*=1000;
timeline.sleep_time_runtime_total+=t;
util.ticker.add(timeline.step);
};

timeline.wait_for_user_event=function(){
timeline.need_sleep_1tick=true;
timeline.waiting_for_user_event=true;
util.ticker.add(timeline.step);
};

timeline.start=function(){
timeline.starttime=performance.now();
var len;
do{
len=timeline.code.length;
timeline.code=timeline.code.replace(new RegExp("\r\n","g"),"\n");
}while(len!=timeline.code.length);
do{
len=timeline.code.length;
timeline.code=timeline.code.replace(new RegExp("\r","g"),"\n");
}while(len!=timeline.code.length);
timeline.code=timeline.code.split("\n");
timeline.started=true;
for(var a=0;a<enabled_events.length;a++){
window.addEventListener(enabled_events[a],timeline.onevent);
}
timeline.step();
};

timeline.step=function(){
if(!timeline.started){
util.ticker.remove(timeline.step);
return;
}
timeline.need_sleep_1tick=false;
if(performance.now()<timeline.starttime+timeline.sleep_time_runtime_total){
return;
}
if(timeline.waiting_for_user_event==true&&timeline.on_user_event===false){
return;
}
timeline.waiting_for_user_event=false;
util.ticker.remove(timeline.step);
while(timeline.exec_line<timeline.code.length){
var ce=timeline.code[timeline.exec_line];
timeline.exec_line+=1;
with(timeline){
with(util){
with(scene){
with(timeline.vars){
eval(ce);
}
}
}
}
if(timeline.need_sleep_1tick){
//next handler
timeline.on_user_event=false;
return;
}
}
//end_of_timeline_here
console.log("end_of_timeline");
};

timeline.onevent=function(ev){
timeline.on_user_event=ev;
};

window.timeline=timeline;
})();