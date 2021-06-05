let initGame = function() {
    //test
    /*createNewObject("test1",150,150,0,20,20,"#FF0000")
    createNewObject("test2",500,100,45,20,20,"#0000FF")
    createNewObject("test3",35,508,60,20,20,"#00FF00")
    createNewObject("test4",700,500,0,20,20,"#FFFF0F")*/
    let genesDefault = {
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

    createNewAi14("ai",10+Math.random()*700,10+Math.random()*500,genesDefault)
    createNewAi14("ai",10+Math.random()*700,10+Math.random()*500,genesDefault)
    createNewAi14("ai",10+Math.random()*700,10+Math.random()*500,genesDefault)
    createNewAi14("ai",10+Math.random()*700,10+Math.random()*500,genesDefault)
    createNewAi14("ai",10+Math.random()*700,10+Math.random()*500,genesDefault)
    createNewAi14("ai",10+Math.random()*700,10+Math.random()*500,genesDefault)
    createNewAi14("ai",10+Math.random()*700,10+Math.random()*500,genesDefault)


    createNewFood(Math.random()*800,Math.random()*600,1,1+Math.random()*5)
    createNewFood(Math.random()*800,Math.random()*600,1,1+Math.random()*5)
    createNewFood(Math.random()*800,Math.random()*600,1,1+Math.random()*5)
    createNewFood(Math.random()*800,Math.random()*600,1,1+Math.random()*5)
    createNewFood(Math.random()*800,Math.random()*600,1,1+Math.random()*5)


    console.log(eObjects)

}