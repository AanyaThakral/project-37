var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver;
var restart;
var gameOverImg;
var restartImg;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloudd.png");
  
  obstacle1 = loadImage("cactus1.png");
  obstacle2 = loadImage("cactus2.png");
  obstacle3 = loadImage("cactus3.png");
  obstacle4 = loadImage("cactus1.png");
  obstacle5 = loadImage("cactus2.png");
  obstacle6 = loadImage("cactus3.png");
  gameOverImg=loadImage("Game over .png");
  restartImg=loadImage("reset.png");
  backImage = loadImage("wallpaper.jpg");
}

function setup() {  
  createCanvas(displayWidth-20,displayHeight-30 );
  
  back = createSprite(0,0,800,400);
  back.addImage(backImage);
  back.scale=1.5;
  back.x = back.width/2;
  



  trex = createSprite(displayWidth/50,80,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.6;
  trex.addAnimation("collided",trex_collided);
  
  gameOver=createSprite(displayWidth/2,displayHeight-450,30,20);
  restart=createSprite(displayWidth/2,displayHeight-390,30,20);
  gameOver.addImage("gameOver",gameOverImg);
  restart.addImage("restart",restartImg);
  gameOver.scale=0.3;
  restart.scale=0.1;
  gameOver.visible=false;
  restart.visible=false;
  
  ground = createSprite(displayWidth/200,displayHeight-120,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(displayWidth/200,displayHeight-130,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  
  if(gameState === PLAY){
  if(obstaclesGroup.isTouching(trex)){
      
      gameState = END;
  }
  
  score = score + Math.round(getFrameRate()/60);
  
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  spawnClouds();
  spawnObstacles();
  }
 else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //trex.setAnimation("trex_collided");
    trex.changeAnimation("collided",trex_collided);
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
    reset();
  }
    
  }
  
  trex.collide(invisibleGround);
  drawSprites();
  stroke(0);
  fill(0);
  textSize(40);
  text("Score: "+ score, displayWidth/2,150);
  
}
function reset(){
 gameState=PLAY ;
gameOver.visible=false;
restart.visible=false;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
//trex.setAnimation("trex");
trex.changeAnimation("running",trex_running)
 score=0; 
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var cloud = createSprite(displayWidth/2,displayHeight/2,40,10);
    cloud.y = Math.round(random(displayHeight/3,displayHeight/2));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(displayWidth/2,displayHeight-165,10,50);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = 0.08;
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale = 0.2;
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.scale = 0.2;
              break;
              
      case 4: obstacle.addImage(obstacle4);
              obstacle.scale = 0.08; 
              break;
      case 5: obstacle.addImage(obstacle5);
              obstacle.scale = 0.2;
              break;
      case 6: obstacle.addImage(obstacle6);
              obstacle.scale = 0.2;
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}