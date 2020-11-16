//Create variables here
var dog, happyDog, database
var Dog, foodStock, anything, lastFed, feedTime
var feed, restock, foods
var num=25
var gameState=0
function preload()
{
  //load images here
  dog=loadAnimation("images/dogImg.png")
  happyDog=loadAnimation("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  Dog=createSprite(250,250,10,10)
  Dog.addAnimation("dog", dog)
  Dog.addAnimation("happy dog", happyDog)
  Dog.scale=0.17
  database=firebase.database()
  foodStock=database.ref("foodStock")
  //foodStock.on("value", function(data){
    //foodStock=data.val()
  //}) 
  foodStock.on("value", readStock)
  anything= new Food()
  feed=createButton("Feed the Dog")
  feed.position(700,100)
  feed.mousePressed(feedDog)
  restock=createButton("Restock Food")
  restock.position(700,150)
  restock.mousePressed(RestockSupply)
}


function draw() {  
  background(46,139,87)
  
  fill("black")
  textSize(20)
  text("Food Stock: "+foods,200, 150)
  anything.display()
  feedTime=database.ref("feedTime")
  feedTime.on("value",function(data){
    lastFed=data.val()
  })
  if(lastFed>=12){
    text("Last Fed: "+ lastFed%12+"PM",50,50)
  }
  else if(lastFed==0){
    text("Last Fed: 12 AM",50,50)
  }
  else{
    text("LastFed: "+lastFed+"AM",50,50)
  }
  
  drawSprites()

}

  
  
function readStock(data){
  foods=data.val()
  anything.updateFoodStock(foods)
}

function RestockSupply(){
  foods++
  database.ref("/").update({
    foodStock:foods
  })
}
function feedDog(){
  Dog.changeAnimation("happy dog", happyDog)
  //anything.deductFoodStock()
  anything.updateFoodStock(anything.getFoodStock()-1)
  database.ref("/").update({
    foodStock:anything.getFoodStock(),
    feedTime:hour()
  })
}


