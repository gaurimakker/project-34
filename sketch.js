var dog, database;
var foodS, foodStock
var dogImg, dogImg1

function preload()
{
dogImg=loadImage("images/dogImg.png");
dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  database=firebase.database();
  dog=createSprite(250,250,20,50);
  dog.addImage("dog", dogImg);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dog" ,dogImg1)
    dog.scale=0.2;
  }

  drawSprites();

  textSize(20);
  fill("black");
  text("FoodStock:"+foodS, 150,100);
  text("Note: Press up arrow to feed dog!",150,150);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}