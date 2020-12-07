//Create variables here
var database,doggo,dogImg,happyDog,foodS,foodStock;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  doggo=createSprite(250,250);
  doggo.addImage(dogImg)
  doggo.scale=0.2;
  foodStock=database.ref("Food");
  foodStock.on("value",readStock)
}


function draw() {  
background(24, 206, 226);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  doggo.addImage(happyDog)
}
  drawSprites();
  //add styles here
textSize(15);
stroke("red");
fill("white")
text("Note:Press UP_ARROW Key To Feed The Dog Milk",100,10);
text("Food Remaining: "+foodS,180,100)
}
//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){

  if(x<=0){
   x=0
  }else{
    x=x-10;
  }
  database.ref('/').update({
    Food:x
})
}

