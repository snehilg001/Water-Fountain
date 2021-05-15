let gravity = 0.2;
let incAlpha=3;

let founts = [];
let mids=[];
let lows=[];

let len=3;

let leftLight;
let centerLight;
let rightLight;

let stars=[];

let start=false;
let isPlaying=false;

let video = document.getElementById("vid");

let alp=150;

let fontName;


function preload(){
  fontName=loadFont('Satisfy-Regular.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //creating disco lights
  leftLight= new Light(width/7, 
  0, width*2/3, 40, 5, 10);
  
  centerLight = new Light(
    width / 2,
    0, width, 40, 6, 10);
  
  rightLight = new Light(
    width *6/ 7,
    width/3, width, 40, 5, 10);
    
  //creating stars
  for(let i=0; i<100; i++){
      stars.push(new Star());
  }
  
  //filling fountains array
  let range=len-(parseInt(len/2)+1);
  for(let i=-range; i<=range; i++){
    founts.push(new Fount(i));
  }
  
  
  //setting black background from start
  background(0);
  
  //pre setting size and alignment of font
  textAlign(CENTER);
  textSize(20);
  textFont(fontName);

  //displaying tap me
  push();
  fill(255);
  text('Tap me', width/2, height/2);
  pop();
  
  //pause animation until I press the canvas
  noLoop();
}


function mouseClicked(){
  if (!start) {
    loop();
    video.style.visibility="visible";
    start=true;
  } else {
    isLooping() ? noLoop() : loop();
  }
  if (!isPlaying) {
    video.play();
    isPlaying = true;
  } else {
    video.pause();
    isPlaying = false;
  }
  return false;
}


function draw() {
 if(start){
 
 background(0);
 
 if(frameCount < 240){
   push();
   fill(255, 255, 255, alp);
   text("Just for you", width/2, height/2);
   pop();
   if(frameCount<120 && alp<255){
     alp+=5;
   }else if(frameCount>=120 && alp> 0){
    alp-=5;
   }
  
 }
 else
 {
    //stars
    for(let s of stars){
      s.show();
    }
  
    //moon
    push();
    fill(255);
    strokeWeight(10);
    stroke(100, 100);
    ellipse(width / 7, height / 5, width / 8, width / 8);
    pop();
  
    //disco lights
    leftLight.show();
    leftLight.update();
    centerLight.show();
    centerLight.update();
    rightLight.show();
    rightLight.update();
  
    if(random(1) < 0.7) {
      for(let i=0; i<3; i++){
       mids.push(new fountMid());
       lows.push(new fountLow());
      }
    }
  
    for(let f of founts)
    {
      f.show();
    }

    for(let i=0; i<mids.length; i++)
    {
      mids[i].show();
      mids[i].update();
      if(mids[i].disappear()){
        mids[i]=null;
        mids.splice(i,1);
      }
    }
    
    for (let i=0; i<lows.length; i++)
    {
      lows[i].show();
      lows[i].update();
      if(lows[i].disappear()) {
        lows[i] = null;
        lows.splice(i, 1);
      }
    }
 }

}
}