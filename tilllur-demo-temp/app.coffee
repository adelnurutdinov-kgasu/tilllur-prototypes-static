
{ Preview } = require "PreviewComponent"
{ FlowView, NavigationView, ModalView } = require "NavigationComponent"
{ Button } = require "Buttons"

screen = new Layer
	width: 1416, height: 704
	image: "images/temp.png"

preview = new Preview
	view: screen
	backgroundColor: null, borderRadius: 0
	showDevice: false, showBars: false, showHints: false
	scaleGap: 0
	
flow = new FlowView { parent: screen, backgroundColor: null }
homeView = new NavigationView
	parent: flow, backgroundColor: null, showBack: false
	scrollHorizontal: false
	scrollVertical: false

screenLeft = new Layer
	parent: homeView.content
	width: 375.0, height: 812.0, image: "images/Component 5.png"
	scale: 200 / 375
	x: Align.center(-184), y: Align.center(-43)



screenLeft_Guard = new Layer
	parent: screenLeft
	opacity: 0

screenLeft_Guard.states =
	"s1": { opacity: 0 }
	"up1": { opacity: 0 }
	"move1": { opacity: 0 }
	"s2": { opacity: 0 }
	"up2": { opacity: 0 }
	"move2": { opacity: 0 }
# screenLeft_Guard.stateSwitch("state1")

screenLeftNames = screenLeft_Guard.stateNames
screenLeftNames.shift()
screenLeft_Cycler = Utils.cycle(screenLeftNames)

getDelayForState = (stateName) ->
	if stateName == "s1" then return 4
	else if stateName == "up1" then return 0.5
	else if stateName == "move1" then return 0.5
	else if stateName == "s2" then return 4
	else if stateName == "up2" then return 0.5
	else if stateName == "move2" then return 0.5


screenLeft_Guard.on Events.StateSwitchEnd, (from, to) ->
	# print to
	try promptView.animate(to)
	try styleView.animate(to)
	try cursor_leftScreen.animate(to)

	Utils.delay getDelayForState(to), ->
		screenLeft_Guard.stateSwitch(screenLeft_Cycler())

screenLeft_Guard.stateSwitch(screenLeft_Cycler())



promptView = new Layer
	parent: screenLeft
	width: 375.0, height: 180.0
	image: "images/prompt empty.png"

promptView.states =
	"s1": { scale: 1.0 }
	"up1": { scale: 1.2 }
	"move1": { y: 250 }
	"s2": { scale: 1.0 }
	"up2": { scale: 1.2 }
	"move2": { y: 100 }
promptView.stateSwitch("move2")


prompt1 = new Layer
	parent: promptView
	width: 375.0, height: 180.0, image: "images/prompt 1.png"

prompt1.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
prompt1.stateSwitch("hidden")






styleView = new Layer
	parent: screenLeft
	width: 375.0, height: 146.0
	image: "images/style empty.png"
	backgroundColor: "white"

styleView.states =
	"s1": { scale: 1.0 }
	"up1": { scale: 1.2 }
	"move1": { y: 100 }
	"s2": { scale: 1.0 }
	"up2": { scale: 1.2 }
	"move2": { y: 280 }
styleView.stateSwitch("move2")

styleView.on Events.StateSwitchStart, (from, to) ->
	if to == "move1" then styleImages.animate("shown")
	else if to == "move2" then styleImages.animate("hidden")


styleImages = new Layer
	parent: styleView
	width: 375.0, height: 146.0, image: "images/style tips.png"
	backgroundColor: "white"

styleImages.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
styleImages.stateSwitch("hidden")




cursor_leftScreen = new Layer
	parent: homeView
	width: 48.0, height: 48.0, backgroundColor: null
	x: Align.center(-100)

cursor_leftScreen.states =
	"s1": { scale: 1.2, opacity: 1.0 }
	"up1": { scale: 0.9, opacity: 0.8 }
	"move1": { y: 220 }
	"s2": { scale: 1.2, opacity: 1.0 }
	"up2": { scale: 0.9, opacity: 0.8 }
	"move2": { y: 290 }
cursor_leftScreen.stateSwitch("move2")


cursorImage_leftScreen = new Layer
	parent: cursor_leftScreen
	width: 48.0, height: 48.0, image: "images/cursor.png"

cursorImage_leftScreen.states =
	"state1": { x: 0, y: 0 }
	"state2": { x: 0, y: 0 }

animateCursor = (layer) ->
	Utils.delay 0.5 + Utils.randomChoice([0.1, 0.2, 0.3, 0.4, 0.5]), =>
		nextPoint =
			x: Utils.randomChoice([-20, -10, -5, 5, 10, 20])
			y: Utils.randomChoice([-20, -10, -5, 5, 10, 20])
		
		layer.animate(x: nextPoint.x, y: nextPoint.y)
		animateCursor(layer)

animateCursor(cursorImage_leftScreen)
