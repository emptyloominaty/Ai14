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
        armor: 0,
        foodTypes: [1], //0="meat"
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

    }
    constructor(name,x,y,genes,id) {
        this.genes = JSON.parse(JSON.stringify(genes))
        this.mutation()
        this.maxAge = 20000+Math.random()*15000
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
        eObjects[this.objectId].name = this.genes.family+"|"+this.genes.genus+"|"+this.genes.specie
        eObjects[this.objectId].text = Math.round(this.genes.size*100)/100+"|"+Math.round(this.genes.speed*100)/100
    }

    getSize() {
        return 5+(this.size*(this.energy/20000))*35
    }

    updateSize() {
        let sizePx = this.getSize()
        eObjects[this.objectId].width = sizePx
        eObjects[this.objectId].height = sizePx
    }

    update() { //every frame
        this.multiply()
        this.energy--
        this.age++
        this.see()
        if (this.target===1) {
            this.moveTowards()
        } else {
           this.moveRandom()
        }
        this.updateSize()
        if (this.energy>this.maxEnergy) {this.energy=this.maxEnergy}
        eObjects[this.objectId].text2 = Math.round(this.energy)
        if (this.energy<=0 || this.age>this.maxAge) {
            this.die()
        }
    }

    destroy() {
        console.log("objectID: "+this.objectId+" id:"+this.id+" ....DIED")
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

    attack() {

    }

    moveRandom() {
        let rng = Math.random()

        if (rng>0.7) {
            this.rotation+=5
        }

        if (rng<0.3) {
            this.rotation-=5
        }

        this.moveForward()
    }

    moveTowards() {
        this.rotation = Math.acos((this.y - this.moveCoordinates.y) / Math.sqrt(Math.pow(this.x - this.moveCoordinates.x, 2)
            +Math.pow(this.y - this.moveCoordinates.y, 2))) * (180 / Math.PI)
        this.moveForward()

    }

    moveForward() {
        eObjects[this.objectId].rotation = this.rotation
        eObjects[this.objectId].move(this.speed)
        this.energy -= ((Math.pow(this.genes.speed,2)) / this.genes.speedEf) * Math.pow(this.genes.size,1.6)


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
        if (this.genes.vision>0) {
            this.energy -= (this.genes.vision / this.genes.visionEf) / 50

            this.target = 0
            //FOOD
            let distanceArray = []
            for (let i = 0; i < foodArray.length; i++) {
                if (foodArray[i]!==undefined) {
                    let getDistance = getObjectDistance(this.objectId, foodArray[i].objectId)
                    if (getDistance!==undefined) {
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
                    }

                }
            }
        }
    }

    smell() {

    }

    multiply() {
        if (this.energy>this.maxEnergy/1.35) {
            this.energy=this.energy/2
            createNewAi14(this.name,this.x+32,this.y+32,this.genes)
        }
    }
    mutation() {
        let mut = 0
        //------------------------------Size TODO:FUNCTION PLS mutateVal(name,random,max,min)
        if (Math.random()<0.10) {
            mut++
            this.genes.size+=Math.random()/5
        } else if (Math.random()>0.90) {
            mut++
            this.genes.size-=Math.random()/5
        }
        if (this.genes.size>3) {this.genes.size=3}
        if (this.genes.size<0.2) {this.genes.size=0.2}
        //------------------------------Speed
        if (Math.random()<0.10) {
            mut++
            this.genes.speed+=Math.random()/5
        } else if (Math.random()>0.90) {
            mut++
            this.genes.speed-=Math.random()/5
        }
        if (this.genes.speed>2.5) {this.genes.speed=2.5}
        if (this.genes.speed<0.15) {this.genes.speed=0.15}
        //------------------------------Vision
        if (Math.random()<0.10) {
            mut++
            this.genes.vision+=Math.random()*5
        } else if (Math.random()>0.90) {
            mut++
            this.genes.vision-=Math.random()*5
        }
        if (this.genes.vision>200) {this.genes.vision=200}
        if (this.genes.vision<10) {this.genes.vision=10}
        //------------------------------Vision Ef
        if (Math.random()<0.10) {
            mut++
            this.genes.visionEf+=Math.random()/5
        } else if (Math.random()>0.90) {
            mut++
            this.genes.visionEf-=Math.random()/5
        }
        if (this.genes.visionEf>5) {this.genes.visionEf=5}
        if (this.genes.visionEf<0.1) {this.genes.visionEf=0.1}
        //------------------------------Energy Ef
        if (Math.random()<0.10) {
            mut++
            this.genes.energyEfficiency+=Math.random()/5
        } else if (Math.random()>0.90) {
            mut++
            this.genes.energyEfficiency-=Math.random()/5
        }
        if (this.genes.energyEfficiency>2.3) {this.genes.energyEfficiency=2.3}
        if (this.genes.energyEfficiency<0.5) {this.genes.energyEfficiency=0.5}

        //------------------------------Speed Ef
        if (Math.random()<0.10) {
            mut++
            this.genes.speedEf+=Math.random()/5
        } else if (Math.random()>0.90) {
            mut++
            this.genes.speedEf-=Math.random()/5
        }
        if (this.genes.speedEf>2.3) {this.genes.speedEf=2.3}
        if (this.genes.speedEf<0.5) {this.genes.speedEf=0.5}
        //-------attack,armor,hearing,smell,hearingEf,smellEf,attackEf,armorEf,stealthVision,stealthHearing



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
    console.log("NEW AI... "+name+" x:"+x+" y:"+y+" id:"+id)


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
}