let screenCanvas = document.getElementById("screen")
let screen = screenCanvas.getContext("2d")
screenCanvas.style.backgroundColor = backgroundColor


let redrawScreen = function(objects) {
    let n_objects = objects.length
    screen.clearRect(0,0,screenWidth,screenHeight)

    if (settings.advancedDrawingMode===true) {
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
            screen.fillRect(0, 0, 1, 20)*/


            //-----------------------------TEXT
            screen.rotate(o.rotation * Math.PI / 180)
            screen.fillStyle = "#FFFFFF"
            screen.font = "12px Calibri"

            if (settings.showId===true) {
                screen.fillText(o.id, 0, 30)
            }
            if (settings.showAge===true) {
                screen.fillText(o.age, 0, 15)
            }
            if (settings.showName===true) {
                screen.fillText(o.name, 0, 0)
            }
            if (settings.showText===true) {
                screen.fillText(o.text,0,-15)
                screen.fillText(o.text2,0,-30)
            }
            screen.restore()
        }
    } else {
        for (let i=0; i<n_objects; i++ ) {
            let o = objects[i]
            if (o===undefined) {continue}

            //circle
            screen.beginPath()
            screen.fillStyle = o.color
            screen.arc(o.x, o.y, o.width/2, 0, 2 * Math.PI, false)
            screen.fill()
            screen.closePath()

            //rectangle
           /* screen.fillStyle = o.color
            screen.fillRect(o.x, o.y, o.width, o.height)*/

            if (settings.showFamily===true) {
                screen.fillStyle = "#000000"
                screen.font = "10px Courier New"
                screen.fillText(o.family, o.x-5, o.y+5)
            }

            screen.fillStyle = "#FFFFFF"
            screen.font = "12px Calibri"


            let yText = -5
            if (settings.showId===true) {
                screen.fillText(o.id, o.x+10, o.y+yText)
                yText+=15
            }
            if (settings.showAge===true) {
                screen.fillText(o.age, o.x+10, o.y+yText)
                yText+=15
            }
            if (settings.showName===true) {
                screen.fillText(o.name, o.x+10, o.y+yText)
                yText+=15
            }
            if (settings.showText===true) {
                screen.fillText(o.text,o.x+10,o.y+yText)
                yText+=15
            }
            if (settings.showFGS===true) {
                screen.fillText(o.text2,o.x+10,o.y+yText)
                yText+=15
            }

        }
    }

}
