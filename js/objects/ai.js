let ais14 = []
let species = [[0]]
let genuses = [0]
let families = 0

class Ai14 {
    full = 0
    move = 0
    age = 0
    objectId = 0
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
        vision: 50,
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
        this.genes = genes.slice(0)
        this.mutation()
        this.maxAge = Math.random()*22000
        if (this.maxAge<7000) {
            this.maxAge = 7000
        }
        this.id = id
        this.name = name
        this.x = x
        this.y = y
        this.color = this.genes.color
        this.size = this.genes.size
        this.speed = this.genes.speed
        this.maxEnergy = (this.genes.size*5000) * this.genes.energyEfficiency
        this.energy = this.maxEnergy/3
        this.objectId = createNewObject(name,x,y,Math.random()*360, this.getSize(), this.getSize(), this.color)
    }

    getSize() {
        return (this.size*(this.energy/5000))*40
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
        if (this.energy<=0 && this.age>this.maxAge) {
            this.die()
        }

        //* this.genes.energyEfficiency (FOOD)




        this.updateSize()
    }


    destroy() {
        ais14.splice(this.id,1)
        eObjects.splice(this.objectId,1)
    }

    die() {
        for (let i = 0; i<5; i++) {
            createNewFood(this.x-25+Math.random()*50,this.y-25+Math.random()*50,0,this.size+Math.random())
        }
        createNewFood(this.x-25+Math.random()*50,this.y-25+Math.random()*50,1,this.size+Math.random())
        createNewFood(this.x-25+Math.random()*50,this.y-25+Math.random()*50,2,this.size+Math.random())
        this.destroy()
    }

    eat() {

    }

    attack() {

    }

    walkRandom() {

    }

    walkTowards() {

    }

    walkAwayFrom() {

    }

    hear() {

    }

    see() {

    }

    smell() {

    }

    multiply() {
        if (this.energy>this.maxEnergy/1.35) {
            createNewAi14(this.name,this.x+32,this.y+32,this.genes)
        }
    }
    mutation() {
        let mut = 0
        //------------------------------Size
        if (Math.random()<0.10) {
            mut++
            this.genes.size+=Math.random()/20
        } else if (Math.random()>0.90) {
            mut++
            this.genes.size-=Math.random()/20
        }
        if (this.genes.size>3) {this.genes.size=3}
        if (this.genes.size<0.2) {this.genes.size=0.2}
        //------------------------------Speed
        if (Math.random()<0.10) {
            mut++
            this.genes.speed+=Math.random()/20
        } else if (Math.random()>0.90) {
            mut++
            this.genes.speed-=Math.random()/20
        }
        if (this.genes.speed>2.5) {this.genes.speed=2.5}
        if (this.genes.speed<0.15) {this.genes.speed=0.15}
        //TODO:------------------------------


        this.genes.genusMut+=mut
        this.genes.familyMut+=mut
        if (mut>0) {
            this.genes.specie = (species[this.genes.family][this.genes.genus]) + 1

            if (this.genes.genusMut>113) {
                genuses[this.genes.family]++
                this.genes.genus++
                this.genes.genusMut=0

                this.genes.species=0
                species[this.genes.family].push(0)
            }

            if (this.genes.familyMut>1000) {
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
    ais14.push(new Ai14(name,x,y,genes,id))
}