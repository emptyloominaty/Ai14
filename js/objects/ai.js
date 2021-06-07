let ais14 = []
let species = [[0]]
let genuses = [0]
let families = 0


class Ai14 {
    full = 0
    move = 0
    died = 0
    moveCoordinates = {x:0, y:0}
    target = 0
    age = 0
    objectId = 0
    rotation = 0
    genes = {
        specie: 0,
        genus: 0,
        family: 0,
        genusMut: 0,
        familyMut: 0,
        size: 1,
        speed: 1,
        energyEfficiency: 1,
        color: "#33DD33",
        attack: 1,
        armor: 1,
        foodTypes: [1],
        carnivore: 0,
        vision: 80,
        hearing: 30,
        smell: 20,
        visionEf: 1,
        hearingEf: 1,
        smellEf: 1,
        speedEf: 1,
        attackEf: 1,
        armorEf: 1,
        stealthVision: 30,
        stealthHearing: 10,
        waitTime: 10,
        waitChance: 0.01,
    }
    constructor(name,x,y,genes,id) {
        this.genes = JSON.parse(JSON.stringify(genes))
        this.mutation()
        this.maxAge = 20000+Math.random()*5000
        this.id = id
        this.name = name
        this.x = x
        this.y = y
        this.color = this.genes.color
        this.size = this.genes.size
        this.speed = this.genes.speed
        this.maxEnergy = (this.genes.size*20000) * this.genes.energyEfficiency
        this.energy = this.maxEnergy/2
        this.objectId = createNewObject(name,x,y,Math.random()*360, this.getSize(), this.getSize(), this.color)
        eObjects[this.objectId].text = Math.round(this.genes.size*100)/100+"|"+Math.round(this.genes.speed*100)/100
        eObjects[this.objectId].text2 = this.genes.family+"|"+this.genes.genus+"|"+this.genes.specie
        eObjects[this.objectId].id = "id: "+this.id
        eObjects[this.objectId].family = this.genes.family
    }

    getSize() {
        return (1+(this.size*this.size)+((this.energy/20000)))*10
    }

    updateSize() {
        let sizePx = this.getSize()
        eObjects[this.objectId].width = sizePx
        eObjects[this.objectId].height = sizePx
    }

    update() {
        this.multiply()
        if (this.full>0) {this.full--}
        if (this.move>0) {
            this.move--
            this.energy-=0.5
        } else {

            this.energy--
        }
        this.age++
        this.see()
        if (this.target===1) {
            this.moveTowards()
        } else {
           this.moveRandom()
        }
        this.updateSize()
        if (this.energy>this.maxEnergy) {this.energy=this.maxEnergy}
        eObjects[this.objectId].age = "age: "+Math.round(this.age)
        eObjects[this.objectId].name = Math.round(this.energy)
        if (this.energy<=0 || this.age>this.maxAge) {
            this.die()
        }
    }

    destroy() {
        let diedText = "(idk)"
        if (this.energy<=0) {
            diedText = "(no energy)"
        }
        if (this.age>=this.maxAge) {
            diedText = "(age)"
        }
        console.log("objectID: "+this.objectId+" id:"+this.id+" ....DIED "+diedText)
        eObjects[this.objectId] = undefined
        ais14[this.id] = undefined
    }

    die() {
        this.died = 1
        if (this.died===0) {
            for (let i = 0; i<3; i++) {
                createNewFood(this.x-25+Math.random()*50,this.y-25+Math.random()*50,0,this.size+Math.random())
            }
            createNewFood(this.x-25+Math.random()*50,this.y-25+Math.random()*50,1,this.size+Math.random())
            createNewFood(this.x-25+Math.random()*50,this.y-25+Math.random()*50,2,this.size+Math.random())
        }

        this.destroy()
    }

    moveRandom() {
        let rng = Math.random()

        if (rng>0.7) {
            this.rotation+=5
        }

        if (rng<0.3) {
            this.rotation-=5
        }



        if (this.genes.waitTime>1 && this.genes.waitChance>0.001 && rng<this.genes.waitChance) {
            this.move=this.genes.waitTime+Math.random()*(this.genes.waitTime*6)
        }

        if (this.move<1) {
            this.moveForward()
        }

    }

    moveTowards() {
        this.rotation = Math.acos((this.y - this.moveCoordinates.y) / Math.sqrt(Math.pow(this.x - this.moveCoordinates.x, 2)
            +Math.pow(this.y - this.moveCoordinates.y, 2))) * (180 / Math.PI)
        this.moveForward()

    }

    moveForward() {
        eObjects[this.objectId].rotation = this.rotation
        eObjects[this.objectId].move(this.speed/(0.5+(this.genes.size/2)))
        this.energy -= ((Math.pow(this.genes.speed,2)) / this.genes.speedEf)+(this.genes.armor/this.genes.armorEf)+((this.genes.attack/this.genes.attackEf)/2)


        this.updatePosition()
    }

    updatePosition() {
        this.x = eObjects[this.objectId].x
        this.y = eObjects[this.objectId].y
    }

    walkAwayFrom() {

    }

    hear() {

    }

    see() {
        if (this.genes.vision>0 && this.move<1) {
            this.energy -= ((Math.pow(this.genes.vision,1.3)) / this.genes.visionEf) / 80

            this.target = 0
            //-----------------------------------------------------------------------------------------------------ATTACK
            if (this.genes.carnivore===1) {

                let distanceArray = []
                for (let i = 0; i < ais14.length; i++) {
                    if (ais14[i]!==undefined) {
                        if ((ais14[i].genes.carnivore === 0 || this.energy < this.maxEnergy / 3) && ais14[i].size < this.size && ais14[i].genes.armor < this.genes.attack) {
                            let getDistance = getObjectDistance(this.objectId, ais14[i].objectId)
                            if (getDistance !== undefined && getDistance < this.genes.vision ) {
                                distanceArray.push({id: ais14[i].id, distance: getDistance})
                            }
                        }
                    }
                }

                if (distanceArray.length > 0) {
                    distanceArray.sort(function (a, b) {
                        return a.distance - b.distance
                    })

                    if (distanceArray[0].distance < this.genes.vision) {
                        let objFollow = ais14[distanceArray[0].id].objectId
                        objFollow = eObjects[objFollow]
                        if (objFollow) {
                            this.moveCoordinates = {x: objFollow.x+1, y: objFollow.y+1}
                            this.target = 1
                        }

                        if (distanceArray[0].distance<10) { //EAT
                            let damage =(this.genes.attack-ais14[distanceArray[0].id].genes.armor)*30
                            if (damage<0) {damage=0}
                            this.energy -= (this.genes.attack/this.genes.attackEf)*5
                            this.energy += damage
                            ais14[distanceArray[0].id].energy -= damage
                            this.target = 0
                        }

                    }
                }

            }
            //-----------------------------------------------------------------------------------------------------FOOD
            if (this.full<1) {
                let distanceArray = []
                for (let i = 0; i < foodArray.length; i++) {
                    if (foodArray[i]!==undefined) {
                        let getDistance = getObjectDistance(this.objectId, foodArray[i].objectId)
                        if (getDistance!==undefined && getDistance<this.genes.vision) {
                            distanceArray.push({id: foodArray[i].id, distance: getDistance})
                        }
                    }
                }

                if (distanceArray.length > 0) {
                    distanceArray.sort(function (a, b) {
                        return a.distance - b.distance
                    })

                    if (distanceArray[0].distance < this.genes.vision) {
                        let objFollow = foodArray[distanceArray[0].id].objectId
                        objFollow = eObjects[objFollow]
                        if (objFollow) {
                            this.moveCoordinates = {x: objFollow.x+1, y: objFollow.y+1}
                            this.target = 1
                        }

                        if (distanceArray[0].distance<5) { //EAT
                            this.energy+=(foodArray[distanceArray[0].id].size*500)*this.genes.energyEfficiency
                            foodArray[distanceArray[0].id].destroy()
                            this.target = 0
                            this.full = 20
                        }

                    }
                }
            }
            //--------------------------------------------------------------------------------------------------------


        }
    }

    smell() {

    }

    multiply() {
        if (settings.limitAi===true && countDefined(ais14)>limitAiVal) {return false}
        if (this.energy>this.maxEnergy/1.35) {
            this.energy=this.energy/2
            createNewAi14(this.name,this.x+32,this.y+32,this.genes)
        }
    }
    mutation() {
        let mut = 0
        let mutate = (name,randomDiv,max,min,randomInc,randomDec) => {
            if (Math.random()<randomInc) {
                mut++
                this.genes[name]+=Math.random()/randomDiv
            } else if (Math.random()>randomDec) {
                mut++
                this.genes[name]-=Math.random()/randomDiv
            }
            if (this.genes[name]>max) {this.genes[name]=max}
            if (this.genes[name]<min) {this.genes[name]=min}
        }
        mutate("size",5,3,0.2,0.1,0.9)
        mutate("speed",5,5,0.15,0.2,0.8)
        mutate("vision",0.1,200,10,0.1,0.9)
        mutate("visionEf",5,5,0.1,0.1,0.9)
        mutate("energyEfficiency",5,2.3,0.5,0.05,0.95)
        mutate("speedEf",5,2.3,0.5,0.07,0.93)
        if (this.genes.carnivore===0 && Math.random()>0.99) {
            this.genes.carnivore=1
            this.genes.color = "#e55354"
        }
        if (this.genes.carnivore===1 && Math.random()>0.99) {
            this.genes.carnivore=0
            this.genes.color = "#33DD33"
        }
        mutate("attack",5,2,0.1,0.15,0.85)
        mutate("armor",2,3,0,0.15,0.85)
        mutate("attackEf",5,2.3,0.5,0.07,0.93)
        mutate("armorEf",5,2.3,0.5,0.07,0.93)
        mutate("waitTime",5,60,0.5,0.3,0.7)
        mutate("waitChance",200,0.25,0.0009,0.3,0.7)
        //-------hearing,smell,hearingEf,smellEf,stealthVision,stealthHearing

        if (mut>0) {
            this.genes.genusMut+=mut
            this.genes.familyMut+=mut
            this.genes.specie = (species[this.genes.family][this.genes.genus]) + 1

            if (this.genes.genusMut>10) {
                genuses[this.genes.family]++
                this.genes.genus++
                this.genes.genusMut=0

                this.genes.species=0
                species[this.genes.family].push(0)
            }

            if (this.genes.familyMut>50) {
                families++
                this.genes.family=families
                this.genes.familyMut=0

                this.genes.species=0
                this.genes.genus=0
                genuses.push(0)
                species.push([0])
            }
            species[this.genes.family][this.genes.genus] = this.genes.specie

        }
    }

}


let createNewAi14 = function(name,x,y,genes) {
    let id = ais14.length

    for (let i = 0; i < ais14.length; i++) {
        if (ais14[i]===undefined) {
            id = i
            break
        }
    }

    if (id===ais14.length) {
        ais14.push(new Ai14(name,x,y,genes,id))
    } else {
        ais14[id]=new Ai14(name,x,y,genes,id)
    }
    console.log("NEW AI... "+name+" x:"+x+" y:"+y+" id:"+id)
}
