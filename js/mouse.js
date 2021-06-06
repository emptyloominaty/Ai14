screenCanvas.addEventListener("click", function (e) {
    findxy(e,"left")
    e.preventDefault()
}, false);

screenCanvas.addEventListener('contextmenu', function(e) {
    findxy(e,"right")
    e.preventDefault()
}, false);

function findxy(e,click) {
    let mouseX = e.clientX - screenCanvas.getBoundingClientRect().left
    let mouseY = e.clientY - screenCanvas.getBoundingClientRect().top

    if (click==="left") {
        createNewFood(mouseX,mouseY,1,1+Math.random()*5)
    } else if (click==="right"){
        createNewAi14("ai",mouseX,mouseY,randomizeGenes())
    }

}