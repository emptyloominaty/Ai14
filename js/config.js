let screenStartX = 0
let screenStartY = 0
let screenWidth = 1600
let screenHeight = 900
let mapWidth = 1600
let mapHeight = 900

let backgroundColor = "#000000"

//Settings
let settings = {
    showName: true,
    showText: false,
    showAge: false,
    showId: false,
    showFamily: false,
    showFGS: true,

    advancedDrawingMode: false, //FALSE!
}

let toggleBool = ["off","on"]
let settingsNames = ["Show Energy","Show Text","Show Age","Show Id","Show Family","Show FGS","","",]
let settingsVal = ["showName","showText","showAge","showId","showFamily","showFGS","","",]

let el_btnSetting = [document.getElementById("btnSetting0"),
    document.getElementById("btnSetting1"),
    document.getElementById("btnSetting2"),
    document.getElementById("btnSetting3"),
    document.getElementById("btnSetting4"),
    document.getElementById("btnSetting5"),
    document.getElementById("btnSetting6"),
    document.getElementById("btnSetting7"),
]

//init
for (let i = 0; i<el_btnSetting.length; i++) {
    el_btnSetting[i].innerText = settingsNames[i]+": "+ toggleBool[+settings[settingsVal[i]]]
    if (settings[settingsVal[i]]===false) {
        el_btnSetting[i].classList.add("buttonOff")
    }
}

let toggleSetting = function(num) {
    settings[settingsVal[num]] = !settings[settingsVal[num]]
    el_btnSetting[num].innerText = settingsNames[num]+": "+ toggleBool[+settings[settingsVal[num]]]

    if (settings[settingsVal[num]]===false) {
        el_btnSetting[num].classList.add("buttonOff")
    } else {
        el_btnSetting[num].classList.remove("buttonOff")
    }

}
