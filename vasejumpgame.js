// variabili omino
var man, man_running, man_collided

// variabili terreno
var ground, invisibleGround, groundImage

// variabili polvere
var dustGroup, dustImage 

// variabili vasi
var vasesGroup, vase1, vase2, vase3, vase4, vase5, vase6, spawnVase

// variabili sfondo
var back, backImage;


// variabili gioco
var gameOver, restart, score=0 ;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  man_running = loadAnimation("omino1.png", "omino2.png",    "omino3.png", "omino4.png", "omino5.png", "omino6.png")
  
  man_collided = loadAnimation("omino_collisione.png");
  
  groundImage = loadImage("pavimento.png");
  
  dustImage = loadImage("polvere.png");
  
  vase1 = loadImage("vaso 1.png");
  vase2 = loadImage("vaso 2.png");
  vase3 = loadImage("vaso 3.png");
  vase4 = loadImage("vaso 4.png");
  vase5 = loadImage("vaso 5.png");
  vase6 = loadImage("vaso 6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  backImage = loadImage("sfondo.png")
}

function setup() {
  createCanvas(600, 200);
  
  
  back = createSprite(100,75,600,20);
  back.addImage("back",backImage);
  back.scale = 1;
  back.x = back.width /2;
  back.velocityX = -(1 + 3*score/100);
  
  man = createSprite(50,170,25 ,25);
  
  man.addAnimation("running", man_running);
  man.addAnimation("collided", man_collided);
  man.scale = 0.65;
  man.setCollider("circle",0,0,35 )
  
  ground = createSprite(200,185,400,20);
  ground.addImage("ground",groundImage);
  ground.scale = 1;
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 1;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  dustGroup = new Group();
  vasesGroup = new Group();
  
  
  score = 0;
}

function draw() {
  
  background(56);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && man.y >= 159) {
      man.velocityY = -12;
    }
  
    man.velocityY = man.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (back.x < 0){
      back.x = back.width/2;
    }
  
    man.collide(invisibleGround);
    spawndust();
    spawnVases();
  
    if(vasesGroup.isTouching(man)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
   
    ground.velocityX = 0;
    back.velocityX = 0;

    man.velocityY = 0;
    vasesGroup.setVelocityXEach(0);
    dustGroup.setVelocityXEach(0);
    man.changeAnimation("collided",man_collided);
    vasesGroup.setLifetimeEach(-1);
    dustGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      gameReset();
    }
  }
  
  
  drawSprites();
}

function spawndust() {
  
  if (frameCount % 40 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(30  ,160));
    cloud.addImage(dustImage);
    cloud.scale = 0.5;
    cloud.velocityX = -5;
    cloud.lifetime = 200;
    cloud.depth = man.depth;
    man.depth = man.depth + 1;
    dustGroup.add(cloud);
  }
  
}

function spawnVases() {
  
  if(frameCount % 70 === 0) {
    var vase = createSprite(600,165,10,40);
    vase.velocityX = -(6 + 3*score/100);
    
    //generate random vases
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: vase.addImage(vase1);
              break;
      case 2: vase.addImage(vase2);
              break;
      case 3: vase.addImage(vase3);
              break;
      case 4: vase.addImage(vase4);
              break;
      case 5: vase.addImage(vase5);
              break;
      case 6: vase.addImage(vase6);
              break;
      default: break;
    }
              
    vase.scale = 0.5;
    vase.lifetime = 300;
    vasesGroup.add(vase);
  }
}

function gameReset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  vasesGroup.destroyEach();
  dustGroup.destroyEach();
  man.changeAnimation("running",man_running);
  score = 0;
 }






