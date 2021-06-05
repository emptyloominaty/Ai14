let screenCanvas = document.getElementById("screen")
let screen = screenCanvas.getContext("2d")
screenCanvas.style.backgroundColor = backgroundColor


let redrawScreen = function(objects) {
    let n_objects = objects.length
    screen.clearRect(0,0,screenWidth,screenHeight)

    if (advancedDrawingMode===true) {
        for (let i=0; i<n_objects; i++ ) {
            let o = objects[i]
            if (o===undefined) {continue}
            screen.save()

            screen.translate( o.x+o.width/2, o.y+o.height/2 )
            //-----------------------------DRAW
            screen.rotate(-o.rotation * Math.PI / 180)
            screen.fillStyle = o.color
            screen.fillRect(-o.width/2, -o.height/2, o.width, o.height)
        /*    //-----------------------------ROTATION TEST LINE
            screen.fillStyle = "#000000"
            screen.fillRect(0, 0, 1, 20)

            screen.rotate(o.rotation * Math.PI / 180)*/
            //-----------------------------TEXT
            screen.fillStyle = "#FFFFFF"
            screen.font = "12px Calibri"
            screen.fillText(o.name,0,0)
            screen.fillText(o.text,o.x,o.y-15)
            screen.fillText(o.text2,o.x,o.y-30)
            screen.restore()
        }
    } else {
        for (let i=0; i<n_objects; i++ ) {
            let o = objects[i]
            if (o===undefined) {continue}
            screen.fillStyle = o.color
            screen.fillRect(o.x, o.y, o.width, o.height)

            screen.fillStyle = "#FFFFFF"
            screen.font = "12px Calibri"
            screen.fillText(o.name,o.x,o.y)
            screen.fillText(o.text,o.x,o.y-15)
            screen.fillText(o.text2,o.x,o.y-30)
        }
    }

}
