

Canvas.backgroundColor = "222"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

{ Preview } = require "PreviewComponent"

screen = new Layer
	name: "screen"
	width: 375
	height: 812
	backgroundColor: "FFF"


preview = new Preview { view: screen }
preview.children[1].backgroundColor = "FFF"


screenView = new Layer
	name: "screenView"
	parent: screen
	width: 375.0
	height: 812.0
	image: "images/screen.png"


isLiked = false

heartBig = new Layer
	name: "heartBig"
	parent: screenView
	width: 120.0
	height: 120.0
	x: Align.center
	y: Align.top(328)
	image: "images/heartBig.png"

heartBig.states =
	"start": { opacity: 0, scale: 0.5 }
	"shown": { opacity: 1, scale: 1 }
	"hidden": { opacity: 0, scale: 1 }
heartBig.stateSwitch("start")



heartButton = new Layer
	name: "heartButton"
	parent: screenView
	width: 58.0
	height: 44.0
	x: Align.right(-8)
	y: Align.bottom(-191)
	image: "images/heartButton.png"

heartButton.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }	
heartButton.stateSwitch("hidden")



heartButton.onTap ->
	isLiked = !isLiked
	if isLiked then heartButton.stateSwitch("shown")
	else heartButton.stateSwitch("hidden")


screenView.onDoubleTap ->
	isLiked = true
	heartBig.stateSwitch("start")
	heartButton.stateSwitch("shown")
	heartBig.animate("shown", curve: Spring(damping: 0.8), time: 0.4)
	Utils.delay 1, ->
		heartBig.animate("hidden", curve: Bezier.linear, time: 0.2)



