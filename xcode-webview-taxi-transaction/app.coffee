
base = new Layer
	width: 360
	height: 640
	image: "images/base.png"
	originX: 0.5
	originY: 0
	# scale: Screen.width / 360

# base.x = Align.center()




CarView = new Layer
	parent: base
	width: 32
	height: 240
	y: 222
	x: 226
	rotation: -38
	backgroundColor: "transparent"

Car = new Layer
	parent: CarView
	width: 32
	height: 64
	image: "images/Car.png"

Car.states = 
	"zero": { y: CarView.height - 64 }
	"one": { y: 0 }

Car.stateSwitch("zero")


Utils.delay 1, ->
	Car.animate("one", time: 10, curve: Bezier.linear)




bottomView = new Layer
	parent: base
	width: 360
	height: 360
	y: base.height - 360
	originY: 1
	# scale: Screen.width / 360
	image: "images/bottomView.png"


bottomView.x = Align.center()


{ Preview } = require "PreviewComponent"
new Preview { view: base, borderRadius: 16 }