let eObjects = []

class Eobject {
    text = ""
    text2 = ""
    age = ""
    id = ""
    family = ""
    constructor(name,x,y,rotation,id,width,height,color) {
        this.realId = id
        this.name = name
        this.x = x
        this.y = y
        this.rotation = rotation
        this.width = width
        this.height = height
        this.color = color
        return this.realId
    }

    move(speed){
        let angleInRadian = (this.rotation-180) / 180 * Math.PI
        let vx = Math.sin(angleInRadian) * speed
        let vy = Math.cos(angleInRadian) * speed

        //----------------------------------------------X
        if (this.x+vx > mapWidth) {
            this.x = (this.x+vx - mapWidth)
        } else if (this.x+vx < 0) {
            this.x = (mapWidth + this.x+vx)
        } else {
            this.x +=  vx
        }
        //----------------------------------------------Y
        if (this.y+vy > mapHeight) {
            this.y = (this.y+vy - mapHeight)
        } else if (this.y+vy < 0) {
            this.y = (mapHeight + this.y+vy)
        } else {
            this.y +=  vy
        }
    }

    changeRotation(change) {
        this.rotation += change
    }
}

let createNewObject = function(name, x=0, y=0, rotation=0,width=20,height=20,color ="#FFFFFF") {
    let id = eObjects.length

    for (let i = 0; i < eObjects.length; i++) {
        if (eObjects[i]===undefined) {
            id = i
            break
        }
    }

    if (id===eObjects.length) {
        eObjects.push(new Eobject(name,x,y,rotation,id,width,height,color))
    } else {
        eObjects[id]=new Eobject(name,x,y,rotation,id,width,height,color)
    }

    return id
}

let getObjectPosition = function (id) {
    if (eObjects[id]!==undefined) {
        return {x:eObjects[id].x, y:eObjects[id].y}
    }
}

let getObjectDistance = function(id1,id2) {

        let a = getObjectPosition(id1)
        let b = getObjectPosition(id2)
    if (a!==undefined && b!==undefined) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    }
}

let checkObjectDistance = function(id1,id2,distance) {
    let xy = getObjectDistance(id1,id2)
    return xy < distance
}