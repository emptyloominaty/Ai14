initGame()
let lastRender = 0
let timeSec = 0
let progress = 16.666666666666666666666666666667
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

let el_stats1 = document.getElementById("stats1")
let el_stats2 = document.getElementById("stats2")
let el_stats3 = document.getElementById("stats3")
let el_stats4 = document.getElementById("stats4")
let el_stats5 = document.getElementById("stats5")
let el_stats6 = document.getElementById("stats6")

let el_stats7 = document.getElementById("stats7")
let el_stats8 = document.getElementById("stats8")
let el_stats9 = document.getElementById("stats9")
let el_stats10 = document.getElementById("stats10")
let el_stats11 = document.getElementById("stats11")
let el_stats12 = document.getElementById("stats12")

let el_stats13 = document.getElementById("stats13")



let start_perf = 0
let update_perf = 0
let startDraw_perf = 0
let draw_perf = 0
let startSimFrame = 0
let endSimFrame = 0
let startDrawFrame = 0
let endDrawFrame = 0
let simFrame = 0
let drawFrame = 0

let spawnFoodTime = 350
let spawnFood = 2
let newSpawnFoodTime = 350

let simTime = 16
let drawTime = 16

let newSimTime = 16
let newDrawTime = 16

let foodSpawnInterval = setInterval(function() {
    if (settings.limitFood===true && countDefined(foodArray)>limitFoodVal) {return false}
    for (let i = 0; i<=spawnFood; i++) {
        createNewFood(Math.random()*mapWidth,Math.random()*mapHeight,1,4+Math.random()*3)
    }
},spawnFoodTime)

let updateInterval= setInterval(function() {
   update(progress)
},simTime)

let drawInterval =  setInterval(function() {
    draw(progress)
},drawTime)




function update(progress) {
    start_perf = performance.now()
    startSimFrame = start_perf
    simFrame = startSimFrame-endSimFrame
    endSimFrame = performance.now()

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
            if (settings.limitFood===true && countDefined(foodArray)>limitFoodVal) {return false}
            for (let i = 0; i<=spawnFood; i++) {
                createNewFood(Math.random()*mapWidth,Math.random()*mapHeight,1,4+Math.random()*3)
            }
        },spawnFoodTime)
    }
    newSpawnFoodTime = spawnFoodTime
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
    startDraw_perf = performance.now()
    startDrawFrame = startDraw_perf
    drawFrame = startDrawFrame-endDrawFrame
    endDrawFrame = performance.now()


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

    el_stats1.innerText = "Avg Size: "+Math.round(getAvgStats("size")*100)/100
    el_stats2.innerText = "Avg Speed: "+Math.round(getAvgStats("speed")*100)/100
    el_stats3.innerText = "Avg Vis: "+Math.round(getAvgStats("vision")*100)/100
    el_stats4.innerText = "Avg Ef: "+Math.round(getAvgStats("energyEfficiency")*100)/100
    el_stats5.innerText = "Avg waitTime: "+Math.round(getAvgStats("waitTime")*100)/100
    el_stats6.innerText = "Avg waitChance: "+Math.round(getAvgStats("waitChance")*1000)/1000

    el_stats7.innerText = "Avg Armor: "+Math.round(getAvgStats("armor")*100)/100
    el_stats8.innerText = "Avg Attack: "+Math.round(getAvgStats("attack")*100)/100

    el_stats13.innerHTML = getArrayStats()

    el_performance2.innerText = "Sim Speed: "+Math.round(simFrame)+"ms ("+Math.round(1/simFrame*1000)+"FPS) Draw Speed:"+Math.round(drawFrame)+"ms ("+Math.round(1/drawFrame*1000)+"FPS)"
        redrawScreen(eObjects)
    draw_perf = performance.now()
 }


function loop(timestamp) {
    progress = timestamp - lastRender

    simTime = document.getElementById("val3").value
    drawTime = document.getElementById("val4").value
    document.getElementById("val3Text").innerText = "Sim Time: "+simTime+"ms"
    document.getElementById("val4Text").innerText = "Redraw Speed: "+drawTime+"ms"

    if (newDrawTime!==drawTime ) {
        clearInterval(drawInterval)
        drawInterval =  setInterval(function() {
            draw(progress)
        },drawTime)
    }

    if (newSimTime!==simTime ) {
        clearInterval(updateInterval)
        updateInterval= setInterval(function() {
            update(progress)
        },simTime)
    }

    newSimTime = simTime
    newDrawTime = drawTime

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
