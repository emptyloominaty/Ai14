initGame()
let lastRender = 0
let timeSec = 0
let gameFPS = 60
let el_fps = document.getElementById("fps")
let el_performance = document.getElementById("performance")
let el_performance2 = document.getElementById("performance2")

let el_debug1 = document.getElementById("debug1")
let el_debug2 = document.getElementById("debug2")
let el_debug3 = document.getElementById("debug3")
let el_debug4 = document.getElementById("debug4")
let el_debug5 = document.getElementById("debug5")
let el_debug6 = document.getElementById("debug6")
let el_debug7 = document.getElementById("debug7")

let el_stats1 = document.getElementById("stats1")
let el_stats2 = document.getElementById("stats2")
let el_stats3 = document.getElementById("stats3")
let el_stats4 = document.getElementById("stats4")
let el_stats5 = document.getElementById("stats5")
let el_stats6 = document.getElementById("stats6")

let start_perf = 0
let update_perf = 0
let draw_perf = 0

let spawnFoodTime = 350
let spawnFood = 2
let newSpawnFoodTime = 350

let simTime = 16
let drawTime = 16

let newSimTime = 16
let newDrawTime = 16

let foodSpawnInterval = setInterval(function() {
    for (let i = 0; i<=spawnFood; i++) {
        createNewFood(Math.random()*mapWidth,Math.random()*mapHeight,1,4+Math.random()*3)
    }
},spawnFoodTime)

function update(progress) {
    start_perf = performance.now()
    gameFPS = 1/progress*1000
    timeSec += progress/1000
    //------------------------------------------------------------------------inputs
    spawnFoodTime = document.getElementById("val1").value
    spawnFood = document.getElementById("val2").value
    document.getElementById("val1Text").innerText = "Food Spawn Time: "+spawnFoodTime+"ms"
    document.getElementById("val2Text").innerText = "Food Spawn: "+spawnFood

    if (newSpawnFoodTime!==spawnFoodTime) {
        clearInterval(foodSpawnInterval)

        foodSpawnInterval = setInterval(function() {
            for (let i = 0; i<=spawnFood; i++) {
                createNewFood(Math.random()*mapWidth,Math.random()*mapHeight,1,4+Math.random()*3)
            }
        },spawnFoodTime)
    }
    newSpawnFoodTime = spawnFoodTime


    simTime = document.getElementById("val3").value
    drawTime = document.getElementById("val4").value
    document.getElementById("val3Text").innerText = "Sim Time: "+simTime+"ms"
    document.getElementById("val4Text").innerText = "Redraw Speed: "+drawTime+"ms"





    //CREATE FOOD ON MOUSE CLICK (LEFT)

    //CREATE AIS ON MOUSE CLICK (RIGHT)


    //------------------------------------------------------------------------

    for (let i = 0; i<ais14.length; i++) {
        if (ais14[i]!==undefined) {
            ais14[i].update()
        }
    }

    for (let i = 0; i<foodArray.length; i++) {
        if (foodArray[i]!==undefined) {
            foodArray[i].update()
        }
    }

    update_perf = performance.now()
}

function draw(progress) {
    let countDefined = function(array) {
        let arrayReturn = []
        for (let i = 0; i < array.length; i++) {
            if (array[i]!==undefined) {
                arrayReturn.push(array[i])
            }
        }
        return arrayReturn.length
    }

    let getAvgStats = function(name) {
        let returnVal = 0
        let nOfVals = 0
        for (let i = 0; i < ais14.length; i++) {
            if (ais14[i]!==undefined) {
                returnVal += ais14[i].genes[name]
                nOfVals++
            }
        }
        return returnVal/nOfVals
    }

    el_fps.innerText = "FPS: "+Math.round(1/progress*1000)
    el_debug1.innerText = "Objects: "+countDefined(eObjects)+"/"+eObjects.length
    el_debug2.innerText = "Ai: "+countDefined(ais14)+"/"+ais14.length
    el_debug3.innerText = "Food: "+countDefined(foodArray)+"/"+foodArray.length
    el_debug4.innerText = "Sim Time: "+Math.round(timeSec)+" Sec"
    el_debug5.innerText = "Gen: "+Math.round((timeSec/375)*100)/100

    el_stats1.innerText = "Avg Size:"+Math.round(getAvgStats("size")*100)/100
    el_stats2.innerText = "Avg Speed:"+Math.round(getAvgStats("speed")*100)/100
    el_stats3.innerText = "Avg Vis:"+Math.round(getAvgStats("vision")*100)/100
    el_stats4.innerText = "Avg Ef:"+Math.round(getAvgStats("energyEfficiency")*100)/100



        redrawScreen(eObjects)
    draw_perf = performance.now()
    el_performance.innerText = "Cpu: "+Math.round((update_perf-start_perf)*100)/100 +" gpu:"+Math.round((draw_perf-update_perf)*100)/100+" total:"+Math.round((draw_perf-start_perf)*100)/100
}


function loop(timestamp) {
    let progress = timestamp - lastRender

    update(progress)
    draw(progress)

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
