
var fish,fishI,backI,ground;
var bg , playButton, playButtonImage;
var whaleI ,  sharkI, seaP, fishGR,octopusI
var obstacleG;
var score;
var gameState = "start";
var coinI, coin;
var heart1,heart2,heart3;
var heartI;
var coinG;
var restart , restartImg;
var count;

function preload()
{
fishI = loadImage("Imported piskel.gif");
backI = loadImage("sea.jpg");
whaleI = loadImage("whale.png");
sharkI = loadImage("shark1.png");
seaP = loadImage("pl.png")
fishGR = loadImage("fishG.png")
heartI = loadImage("heartI.png");
playButtonImage = loadImage("play button.png");
coinI = loadImage("coin sprite.png");
restartImg = loadImage("restart.png");
octopusI = loadImage("octa.png")

	
}

function setup() {
	createCanvas(1000,1000 );


	

	//Create the Bodies Here.


	bg = createSprite(500,500,1000,1000)
bg.addImage(backI,"bac")
bg.scale = 3

playButton = createSprite(500, 500, 20, 20);
  playButton.addImage(playButtonImage,"playB");
  playButton.scale = 0.3;

  restart = createSprite(500,500,20,20);
  restart.addImage(restartImg,"re");
  restart.visible = false;
  restart.scale = 0.3;

fish = createSprite(200,800,20,20);
fish.addImage(fishI,"fiI");
fish.scale = 0.2;
fish.visible = false


ground = createSprite(500,950,2000,20)
ground.visible = false;




obstacleG = new Group();
coinG = new Group();
	score = 0;
  count = 0;
  
}


function draw() {
 
  
  background("black");
  

  if(gameState === "start"){
    start();

   

    if (mousePressedOver(playButton)) {
      gameState = "play";
    }

  }


  if(gameState === "play"){
    play();
    
    bg.velocityX = -6;

    if (bg.x < 100){
      bg.x = bg.width/2;
      
      }

      if(keyWentDown ('UP')&& fish.y>400){
        fish.y = fish.y-20
      }
      
      if(keyWentDown ('DOWN')&& fish.y<900){
      fish.y = fish.y+10;
    }

    if(fish.isTouching(coinG)){
      score = score + 2;
    }
spawncoin();
      spawnObstacles();
     
     if(fish.isTouching(obstacleG)) {
       gameState = "end";
     }

    

    }

  if(gameState === "end"){

   background.velocityX = 0;
   bg.velocityX = -6;

   if (bg.x < 100){
     bg.x = 500
     
     }
restart.visible = true;
   coinG.setVelocityXEach(0)
   obstacleG.setVelocityXEach(0)
if(mousePressedOver(restart)){
  gameState ="start";
}
  }
 

  



  
  drawSprites();

  textSize(20)
  stroke("red")
  fill("black")
  text("SCORE: "+score,800,100)
 
}




function spawnObstacles(){
  if (frameCount % 60 === 0){

    var xpos,ypos;
    ypos=Math.round(random(300,800));
    var obstacle = createSprite(1000,ypos,10,20);
    obstacle.velocityX = -6;
    
    
     //generate random obstacles
     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: obstacle.addImage(octopusI);
               break;
       case 2: obstacle.addImage(whaleI);
               break;
       case 3: obstacle.addImage(sharkI);
               break;
       case 4: obstacle.addImage(seaP);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.1;
     obstacle.lifetime = 130;
     obstacleG.add(obstacle)
    
    
  }
}

function start(){
playButton.visible = true;
restart.visible = false;
}

function play(){
  playButton.visible = false;
  fish.visible = true;
  restart.visible = false;
  

}


function spawncoin(){
  if (frameCount % 100 === 0) {
    coin = createSprite(1000, Math.round(random(300, fish.y)), 20, 20);
    coin.addImage(coinI,"co");
    coin.velocityX = -6;
    coin.scale = 0.1;
    coin.lifetime = 120;
    
    
    coinG.add(coin);
  }  
}
