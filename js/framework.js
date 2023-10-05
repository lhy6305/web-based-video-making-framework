//framework.js

(function(){
if(!("PIXI" in window&&"util" in window)){
if("loadfail" in window){
window.loadfail("脚本 framework.js 错误：window.PIXI 未定义");
}else{
window.alert("脚本 framework.js 错误：window.PIXI 未定义");
}
return;
}

var scene={};

(function(){ //init canvas and frame
console.info("[framework] setting up basic pixi application...");
//set up main canvas element
scene.width=1920;
scene.height=1080;
var mainframe=document.getElementById("mainframe");
var canvas=document.getElementById("stagecanvas");
if(mainframe===null){
mainframe=document.createElement("div");
mainframe.id="mainframe";
document.body.appendChild(mainframe);
}
mainframe.style.display="inline-block";
mainframe.style.display="inline-block";
mainframe.style.zIndex=0;
mainframe.style.backgroundColor="#000000";
if(canvas===null){
canvas=document.createElement("canvas");
canvas.id="stagecanvas";
mainframe.appendChild(canvas);
}
canvas.style.width="100%";
canvas.style.height="100%";
canvas.style.display="inline-block";
canvas.style.position="absolute";
canvas.style.zIndex=1;
scene.mainframe=mainframe;
scene.canvas=canvas;

//document resize handler
scene.resize=function(){
var res=util.calcresize(document.body.clientWidth,document.body.clientHeight,scene.width,scene.height);
mainframe.style.width=res[0]+"px";
mainframe.style.height=res[1]+"px";
mainframe.style.left=res[2]+"px";
mainframe.style.top=res[3]+"px";
};

window.addEventListener("resize",scene.resize);
scene.resize();

//setup pixi application
if(window.suppgl){
scene.renderer=new PIXI.Renderer({"view":canvas,"antialias":true,"transparent":true,"backgroundAlpha":0,"width":scene.width,"height":scene.height});
}else{
scene.renderer=new PIXI.CanvasRenderer({"view":canvas,"antialias":true,"transparent":true,"backgroundAlpha":0,"width":scene.width,"height":scene.height});
}
scene.stage=new PIXI.Container();
scene.stage.sortableChildren=true;
scene.render=function(){
scene.renderer.render(scene.stage);
};
util.ticker.add(scene.render);

})();

(function(){ //load pre-defined shapes
console.info("[framework] loading pre-defined shapes...");
scene.shapes=[];

scene.loadShape=function(name){
var code=util.getfile("./shape/"+name+".js");
code=code.toString("utf-8");
if(code===false||code.length<=0){
console.error("shape file \"./shape/"+name+".js\" cannot be loaded.");
return false;
}
var canvas=document.createElement("canvas");
var context=canvas.getContext("2d");
try{
eval(code);
}catch(e){
console.error("shape \""+name+"\" cannot be loaded. See the detail below.");
console.error(e);
return false;
}
var shape={};
shape.name=name;
shape.canvas=canvas;
scene.shapes.push(shape);
return true;
};

var list=util.getjson("./shape/list.json");
for(var a=0;a<list.length;a++){
scene.loadShape(list[a]);
}
})();

(function(){ //api functions
console.info("[framework] initalizing api functions...");

scene.addVideoPIXI=function(pth,width,height,left,top){ //[DEPRECIATED] return=PIXI.Sprite
if(arguments.length<=1||isNaN(Number(width))){
width=scene.renderer.screen.width;
}
if(arguments.length<=2||isNaN(Number(height))){
height=scene.renderer.screen.height;
}
if(arguments.length<=3||isNaN(Number(left))){
left=0;
}
if(arguments.length<=4||isNaN(Number(top))){
top=0;
}
var tex=PIXI.Texture.from(pth);
var spr=PIXI.Sprite.from(tex);
spr.width=width;
spr.height=height;
spr.position.x=left;
spr.position.y=top;
spr.anchor.x=0;
spr.anchor.y=0;
scene.stage.addChild(spr);
tex.baseTexture.on("loaded",function(){
setTimeout(function(){
tex.baseTexture.resource.source.pause();
tex.baseTexture.resource.source.currentTime=0;
},0);
});
spr.play=function(){
tex.baseTexture.resource.source.play();
};
spr.pause=function(){
tex.baseTexture.resource.source.pause();
};
spr.stop=function(){
tex.baseTexture.resource.source.pause();
tex.baseTexture.resource.source.currentTime=0;
};
spr.seek=function(t){
tex.baseTexture.resource.source.currentTime=t;
};
spr.mute=function(t){
tex.baseTexture.resource.source.muted=t;
};
spr.loop=function(t){
tex.baseTexture.resource.source.loop=t;
};
return spr;
};

scene.addVideo=function(pth,width,height,left,top){ //return=HTMLVideoElement
if(arguments.length<=1||isNaN(Number(width))){
width=scene.renderer.screen.width;
}
if(arguments.length<=2||isNaN(Number(height))){
height=scene.renderer.screen.height;
}
if(arguments.length<=3||isNaN(Number(left))){
left=0;
}
if(arguments.length<=4||isNaN(Number(top))){
top=0;
}
width*=100;
width/=scene.renderer.screen.width;
height*=100;
height/=scene.renderer.screen.height;
left*=100;
left/=scene.renderer.screen.width;
top*=100;
top/=scene.renderer.screen.height;
var elem=document.createElement("video");
elem.src=pth;
elem.load();
elem.style.pointerEvents="none";
elem.style.left=left+"%";
elem.style.top=top+"%";
elem.style.width=width+"%";
elem.style.height=height+"%";
elem.style.position="absolute";
elem.style.display="inline-block";
elem.zIndex=-1;
elem.destroy=function(){
elem.parentNode.removeChild(elem);
elem=null;
};
elem.setposi=function(x,y){
x*=100;
x/=scene.renderer.screen.width;
y*=100;
y/=scene.renderer.screen.height;
elem.style.left=x+"%";
elem.style.top=y+"%";
};
scene.mainframe.appendChild(elem);
return elem;
};

scene.addAudio=function(pth){ //return=HTMLAudioElement
var elem=document.createElement("audio");
elem.style.display="none";
elem.src=pth;
elem.load();
elem.destroy=function(){
elem.parentNode.removeChild(elem);
elem=null;
};
scene.mainframe.appendChild(elem);
return elem;
};

scene.addText=function(text,left,top,cfg){ //return=PIXI.Sprite
if(arguments.length<=1||isNaN(Number(left))){
left=0;
}
if(arguments.length<=2||isNaN(Number(top))){
top=0;
}
if(arguments.length<=3||!(cfg instanceof Object)){
cfg={"fontFamily":"Arial","fontSize":35,"fill":0xffffff,"align":"left"};
}
var spr=new PIXI.Text(text,cfg);
spr.position.x=left;
spr.position.y=top;
spr.anchor.x=0.5;
spr.anchor.y=0.5;
scene.stage.addChild(spr);
return spr;
};

scene.addShape=function(name,left,top,width,height){ //return=PIXI.Sprite
var shape=null;
for(var a=0;a<scene.shapes.length;a++){
if(scene.shapes[a].name==name){
shape=scene.shapes[a];
break;
}
}
if(shape===null){
console.error("shape \""+name+"\" is not defined.");
return false;
}
if(arguments.length<=1||isNaN(Number(left))){
left=0;
}
if(arguments.length<=2||isNaN(Number(top))){
top=0;
}
if(arguments.length<=3||isNaN(Number(width))){
width=shape.canvas.width;
}
if(arguments.length<=4||isNaN(Number(height))){
height=shape.canvas.height;
}
var tex=PIXI.Texture.from(shape.canvas);
var spr=PIXI.Sprite.from(tex);
spr.width=width;
spr.height=height;
spr.position.x=left;
spr.position.y=top;
spr.anchor.x=0.5;
spr.anchor.y=0.5;
scene.stage.addChild(spr);
return spr;
};

scene.addImage=function(pth,left,top,width,height){ //return=PIXI.Sprite
var tex=PIXI.Texture.from(pth);
if(arguments.length<=1||isNaN(Number(left))){
left=0;
}
if(arguments.length<=2||isNaN(Number(top))){
top=0;
}
if(arguments.length<=3||isNaN(Number(width))){
width=tex.width;
}
if(arguments.length<=4||isNaN(Number(height))){
height=tex.height;
}
var spr=PIXI.Sprite.from(tex);
spr.width=width;
spr.height=height;
spr.position.x=left;
spr.position.y=top;
spr.anchor.x=0.5;
spr.anchor.y=0.5;
scene.stage.addChild(spr);
return spr;
};

})();

window.scene=scene;
console.info("[framework] all components initialized successfully.");
})();


//debug code
//should be removed after test process

scene.mainframe.onclick=function(){
try{
timeline.play("timeline_main");
}catch(e){
return;
}
scene.mainframe.onclick=null;
};

