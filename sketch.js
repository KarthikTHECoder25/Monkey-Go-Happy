var monkey, monkeyA, monkeyC,bananaA, BananaGroup, rockA, RocksGroup, bcount, count, PLAY, END, gameState, restart, gameOver, restart1, gameOver1, highscore, highscoreB, backgroundA


function preload() {
  monkeyA = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkeyC =loadImage("Monkey_08.png");
  
  bananaA = loadImage("banana.png");
  rockA = loadImage("stone.png");
  restart1 = loadImage("Restart.png");
  gameOver1 = loadImage("Untitled.png"); 
  backgroundA = loadImage("FQizObE.png"); 
}

function setup() {
  createCanvas(500, 400);
  
  //create a ground sprite
  ground = createSprite(200,370,800,20);
  ground.x = ground.width /2;
  ground.visible = false;
  
  //create a monkey sprite
  monkey = createSprite(200,370,20,50);
  monkey.addAnimation("monkeyAnimation", monkeyA);
  monkey.addAnimation("monkeylose", monkeyC);
  monkey.scale = 0.12;
  monkey.x = 50;
  
  //create gameOver
  gameOver = createSprite(250,270);
  gameOver.addImage(gameOver1);
  
  //create restart
  restart = createSprite(250,335)
  restart.addImage(restart1);
  
 
  

  //create Obstacle and Cloud Groups
   BananaGroup = new Group();
   RocksGroup = new Group();

  gameOver.scale = 0.4;
  restart.scale = 0.3;

  gameOver.visible = false;
  restart.visible = false;

 //set text
textSize(18);
fill("white");
textStyle(BOLD);

//score
  count = 0;
  
//highscore
  highscore = 0
  
//banana highscore  
  highscoreB = 0;

//banana score
  bcount = 0;
  
  //initiate Game States
  PLAY = 1;
  END = 0;
  gameState = PLAY;

  

}

function draw() {
  background(backgroundA);
    
  //display score
  text("Survival Time: "+ count, 320, 27);
  
  //display # of bananas
  text("Bananas Collected: "+ bcount,25,25);
   
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    
    //scoring
    count = Math.round(count+World.frameRate/60);
    
    //scoring bananas
    if(BananaGroup.isTouching(monkey)){
      bcount = bcount+1;
      BananaGroup.destroyEach();
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 290){
      monkey.velocityY = -15 ;
    }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
     switch(count){
        case 150: monkey.scale = 0.14; break;
        case 250: monkey.scale = 0.16; break;
        case 350: monkey.scale = 0.18; break;
        case 450: monkey.scale = 0.20; break;
        default: break;
    }
    
    //spawn the bananas
    spawnBananas();
  
    //spawn the rocks
    spawnRocks();
    
    //End the game when monkey is touching the obstacle
    if(RocksGroup.isTouching(monkey)){
      gameState = END;
      monkey.y = 350
      monkey.scale = 0.12;
      monkey.changeAnimation("monkeylose", monkeyC);
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velocity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    BananaGroup.setVelocityXEach(0);
    RocksGroup.setVelocityXEach(0);
    
    //destroying bananas in game end
    BananaGroup.destroyEach();
    
    //set lifetime of the game objects so that they are never destroyed
    BananaGroup.setLifetimeEach(-1);
    RocksGroup.setLifetimeEach(-1);
    
    
  }
  
  //reset button
   if(mousePressedOver(restart)) {
   reset();
   }
  
  
  
  //stop monkey from falling down
  monkey.collide(ground);
  
  
  drawSprites();
}

function reset(){
    gameState = PLAY;
    monkey.changeAnimation("monkeyAnimation", monkeyA);
    monkey.scale = 0.12
    restart.visible = false;
    gameOver.visible = false;
    count = 0;
    bcount = 0;
    RocksGroup.destroyEach();
    BananaGroup.destroyEach();
}

function spawnRocks() {
  if(World.frameCount % 85 === 0) {
    var rocks = createSprite(400,340,10,40);
    rocks.velocityX = - (6 + 3*count/100);
  
    rocks.setCollider("circle",0,0,0);
  
    //assign scale and lifetime to the obstacle           
    rocks.scale = 0.15;
    rocks.lifetime = 70;
    rocks.addImage(rockA);
    
    //add each obstacle to the group
    RocksGroup.add(rocks);
  }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (World.frameCount % 105 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = random(150,200);
    banana.addImage(bananaA);
    banana.scale = 0.05;
    banana.velocityX = -3;
      
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    BananaGroup.add(banana);
  }
  
}