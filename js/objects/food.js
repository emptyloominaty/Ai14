let foodArray = []

class Food {
    objectId = 0
    constructor(x,y,type = 1,size=1,id) {
        this.name="food"
        this.size =size
        if (type===1) {
            this.color = "#ffa85b"
        }
        this.id = id
        this.objectId = createNewObject(this.name,x,y,Math.random()*360,this.size*5,this.size*5, this.color)
    }
    destroy() {
        foodArray.splice(this.id,1)
        eObjects.splice(this.objectId,1)
    }
}

let createNewFood = function(x,y,type,size) {
    let id = foodArray.length
    foodArray.push(new Food(x,y,type,size,id))
}