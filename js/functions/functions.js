
let getArrayStats = function() {
    let name = document.getElementById("getStats").value
    let returnStr = ""
    let array = []
    let nOfVals = 0
    for (let i = 0; i < ais14.length; i++) {
        if (ais14[i]!==undefined) {
            array.push(ais14[i].genes[name])
            nOfVals++
        }
    }

    if (array.length > 0) {
        array.sort(function (a, b) {
            return a - b
        })
        let max = Math.max(...array)
        let min = Math.min(...array)
        let avg = (max+min)/2

        let p1 = min
        let p3 = (avg+min)/2
        let p4 = (p3+avg)/2
        let p5 = avg
        let p7 = (max+avg)/2
        let p8 = (max+p7)/2
        let p9 = max
        let p2 = (p3+min)/2
        let p6 = (p7+avg)/2

        let p1a = 0 // p1-p2
        let p2a = 0 // p2-p3
        let p3a = 0 // p3-p4
        let p4a = 0 // p4-p5
        let p5a = 0 // p5-p6
        let p6a = 0 // p6-p7
        let p7a = 0 // p7-p8
        let p8a = 0 // p8-p9

        for (let i = 0; i < array.length; i++) {
            let value = array[i]

            if (value>=p1 && value<p2) {
                p1a++
            }

            if (value>=p2 && value<p3) {
                p2a++
            }

            if (value>=p3 && value<p4) {
                p3a++
            }

            if (value>=p4 && value<p5) {
                p4a++
            }

            if (value>=p5 && value<p6) {
                p5a++
            }

            if (value>=p6 && value<p7) {
                p6a++
            }

            if (value>=p7 && value<p8) {
                p7a++
            }

            if (value>=p8 && value<=p9) {
                p8a++
            }
        }

        let valColor = "#99ff7e"
        let rangeColor =  "#9d9d9d"
        returnStr = "<div  style='color:"+rangeColor+"'>  ("+Math.round(p1*1000)/1000+" - "+Math.round(p2*1000)/1000+"): <span style='color:"+valColor+"'>"+ p1a+"</span>"+
            "<br> ("+Math.round(p2*1000)/1000+" - "+Math.round(p3*1000)/1000+"): <span style='color:"+valColor+"'>"+ p2a+"</span>"+
            "<br> ("+Math.round(p3*1000)/1000+" - "+Math.round(p4*1000)/1000+"): <span style='color:"+valColor+"'>"+ p3a+"</span>"+
            "<br> ("+Math.round(p4*1000)/1000+" - "+Math.round(p5*1000)/1000+"): <span style='color:"+valColor+"'>"+ p4a+"</span>"+
            "<br> ("+Math.round(p5*1000)/1000+" - "+Math.round(p6*1000)/1000+"): <span style='color:"+valColor+"'>"+ p5a+"</span>"+
            "<br> ("+Math.round(p6*1000)/1000+" - "+Math.round(p7*1000)/1000+"): <span style='color:"+valColor+"'>"+ p6a+"</span>"+
            "<br> ("+Math.round(p7*1000)/1000+" - "+Math.round(p8*1000)/1000+"): <span style='color:"+valColor+"'>"+ p7a+"</span>"+
            "<br> ("+Math.round(p8*1000)/1000+" - "+Math.round(p9*1000)/1000+"): <span style='color:"+valColor+"'>"+ p8a+"</span> </div>"

    }
    return returnStr
}


let randomizeGenes = function() {
    return {
        specie: 0,
        genus: 0,
        family: 0,
        genusMut: 0,
        familyMut: 0,
        size: 0.5+Math.random(),
        speed: 0.5+Math.random(),
        energyEfficiency: 0.8+Math.random()/3,
        color: "#33DD33",
        attack: 0.5+Math.random(),
        armor: 0.5+Math.random(),
        foodTypes: [1],
        carnivore: 0,
        vision: 20+Math.random()*80,
        hearing: 20+Math.random()*30,
        smell: 20+Math.random()*30,
        visionEf: 1,
        hearingEf: 1,
        smellEf: 1,
        speedEf: 1,
        attackEf: 1,
        armorEf: 1,
        stealthVision: 30,
        stealthHearing: 10,
        waitTime: 8+Math.random()*4,
        waitChance: 0.005+Math.random()/50,
    }

}