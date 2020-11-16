class Food{
    constructor(){
      this.lastFed; 
      this.foodStock=0
      this.image=loadImage("images/Milk.png")
    }
    /*getFoodStock(){
        var foodStockRef=database.ref("foodStock")
        foodStockRef.on("value",function(data){
            foodStock=data.val()
        })

    }
    updateFoodStock(){
        database.ref("/").update({
            foodStock:num
        })
    }
    deductFood(){
        database.ref("/").update({
            foodStock:num-1
        })
    }*/
    getFoodStock(){
     return this.foodStock
    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock
    }
    deductFoodStock(){
        if(foodStock>0){
            this.foodStock=this.foodStock-1
        }
    }
    display(){
        var x=50
        var y=70
        imageMode(CENTER)
       
        if(this.foodStock!=0){
            for(var i=0;i < this.foodStock;i++){
                if(i%10==0){
                    x=50
                    y=y+20
                }
                image(this.image,x,y,30,30)
                x=x+15
            }
        }
    }
    getTime(lastFed){
        this.lastFed=lastFed

    }
}
