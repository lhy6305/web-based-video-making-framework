//timeline_main


//predefined-functions

vars.addSubtitle=function(text){var a=addText(text,1920/2,950,{"dropShadow":true,"fontFamily":"Arial","fontSize":50,"fill":0xffffff,"align":"left"});a.zIndex=9;return a;}

vars.video_length=130.8;


//###########################  progress_bar  ###########################

vars.pbicon=addImage("./image/intertwine_fate.png",0,1080,30,30);
pbicon.zIndex=11;
addTransition(pbicon.position,"x",0,1920,video_length);
addTransition(pbicon,"alpha",0,1,0.5);
addTransition(pbicon,"rotation",0,1920/(2*Math.PI*15)*2*Math.PI,video_length);

vars.pbbar=addShape("rect",0,1080,0,7);
pbbar.zIndex=10;
pbbar.anchor.x=0;
pbbar.anchor.y=1;
pbbar.tint=0xffd000;
addTransition(pbbar,"alpha",0,1,0.5);
addTransition(pbbar,"width",0,1920,video_length);

//################################  bgm  ###############################

//############################  scene_start  ###########################



//#############################  scene_end  ############################









pbicon.destroy();
pbbar.destroy();





//try{nw.App.quit();}catch(e){}
