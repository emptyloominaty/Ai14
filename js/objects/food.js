let foodArray = []
console.log(foodArray)
class Food {
    objectId = 0
    constructor(x,y,type = 1,size=1,id) {
        this.life = 1000+Math.random()*1000
        this.name="food"
        this.size =size
        if (type===1) {
            this.color = "#ffa85b"
        }
        this.id = id
        this.objectId = createNewObject(this.name,x,y,Math.random()*360,this.size*3,this.size*3, this.color)
    }
    update() {
        this.life--
        if (this.life<0) {
            this.destroy()
        }
    }
    destroy() {
        //console.log("food.."+this.id+"..destroyed")
        eObjects[this.objectId] = undefined
        foodArray[this.id] = undefined

    }
}

let createNewFood = function(x,y,type,size) {
    let id = foodArray.length
    foodArray.push(new Food(x,y,type,size,id))
}