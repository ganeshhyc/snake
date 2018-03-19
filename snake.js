//settings

function rand(min,max){
  return Math.floor(Math.random() * (max - min) + min);
}
var snakeX = rand(2,30);
var snakeY = rand(2,30);
var height = 30;
var width = 30;
var interval = 100;
var increment = 1;
var Score1 ="Score : ";
//game variables
var tailX = [snakeX];
var tailY = [snakeY];
var fX;
var fY;
var running=false;
var gameOver=false;
var direction = -1;//up=0,down=-1,left=1,right=2;
var int;
var score=0;
//entry point of the game
function run(){
  init();
  int = setInterval(gameLoop, interval);
}
function init(){
  createMap();
  createSnake();
  createFruit();
}

function createMap(){
  document.write("<fieldset><table border='0' cellpading='0' cellspacing='0'>");
  for(var i=0;i<height;i++){
    document.write("<tr>");
    for(var j=0;j<width;j++){
        document.write("<td class='blank' id='"+j+"-"+i+"'></td>")
    }document.write("</tr>");
  }
  document.write("</table></fieldset>");
}
function createSnake(){
  set(snakeX,snakeY,"snake");
}
function get(x,y){
  return document.getElementById(x+"-"+y);
}
function set(x,y,value){
  if(x!=null&&y!=null)
  get(x,y).setAttribute("class",value);
}
function getType(x,y){
  return get(x,y).getAttribute("class");
}
function createFruit(){
  var found = false;
  while(!found && (length < (width-2)*(height-2)+1)){
    var fruitX = rand(1,width-1);
    var fruitY = rand(1,height-1);
    if(getType(fruitX,fruitY) == "blank")
      found=true;
  }set(fruitX,fruitY,"fruit");
  fX = fruitX;
  fY = fruitY;

}
window.addEventListener("keydown",function key(event){
  var key = event.keyCode;
  if(direction != -1 && key == 38)
    direction = 0;//w
  else if(direction != 0 && key == 40)
    direction = -1;//s
  else if(direction != 2 && key == 37)
    direction = 1;//a
  else if(direction != 1 && key == 39)
    direction = 2;//d
  if(!running)
    running = true;
  else if(key==32)
    running = false;//space
});
function gameLoop(){
  if(running && !gameOver){
    update();
  }else if(gameOver){
    clearInterval(int);
  }
}
function update(){
  set(fX,fY,"fruit");
  updateTail();
  set(tailX[length],tailY[length],"blank");
  if(direction == 0)
    snakeY--;
  else if(direction == -1)
    snakeY++;
  else if(direction == 1)
    snakeX--;
  else if(direction == 2)
    snakeX++;
    else{}
  if(snakeX !== 0 && snakeX !== width-1 && snakeY !== 0 && snakeY !== height-1)
  set(snakeX,snakeY,"snake");
  for(var i=tailX.length-1;i>=0;i--){
    if(snakeX == tailX[i] && snakeY == tailY[i]){
      gameOver = true;
      break;}
  }
  //if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1){

if(snakeX == 0){
  snakeX=width-1;
}
else if(snakeX == width-1){
  snakeX=0;}
else if(snakeY == 0){
  snakeY=height-1;}
else if(snakeY == height-1){
  snakeY=0;}
    //gameOver=true;
  //}
  else if(snakeX == fX && snakeY == fY){
    createFruit();
    length+=increment;
    score+=5;
  }else if(gameOver){
  score="Game-Over Your Score is "+score;
Score1="";
  }
  document.getElementById("score").innerHTML = Score1+score;
}
function updateTail(){
  for(var i=length;i>0;i--){
    tailX[i]=tailX[i-1];
    tailY[i]=tailY[i-1];
  }tailX[0]=snakeX;
  tailY[0]=snakeY;
}
run();
