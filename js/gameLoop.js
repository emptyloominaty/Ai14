initGame()
let lastRender = 0
let gameFPS = 60
let el_fps = document.getElementById("fps")
let el_debug1 = document.getElementById("debug1")

function update(progress) {
    gameFPS = 1/progress*1000


    //TEST ROTATING + MOVE
    /*for (let i = 0; i<eObjects.length; i++) {
        eObjects[i].changeRotation(1)
        eObjects[i].move(1)
    }*/

    //createNewFood(Math.random()*800,Math.random()*600,1,1+Math.random())


    el_debug1.innerText = "test: "+getObjectDistance(0,1)


}

function draw(progress) {
    el_fps.innerText = "FPS: "+Math.round(1/progress*1000)
    redrawScreen(eObjects)
}


function loop(timestamp) {
    let progress = timestamp - lastRender

    update(progress)
    draw(progress)

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)