document.body.style.cursor = "auto"

delayReference = null
delay = (time, fn, args...) ->
	setTimeout fn, time, args...

# button = new Layer
# button.onClick ->
# 	clearTimeout(delayReference)
# 	delayReference = delay 1000, ->
# 		print "hello"
# 		print delayReference

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

{ Preview } = require "PreviewComponent"

screen = new Layer
	width: 375
	height: 812
	# scrollVertical: true
	# scrollHorizontal: false
	backgroundColor: "FFF"

preview = new Preview { view: screen }



header = new Layer
	parent: screen
	width: 375.0
	height: 100.0
	image: "images/header.png"


progressIconClip = new Layer
	parent: header
	width: 56.0
	height: 56.0
	x: Align.right
	y: Align.bottom
	backgroundColor: "white"

progressIconClip.states =
	"shown": { opacity: 1.0 }
	"hidden": { opacity: 0.0 }
progressIconClip.stateSwitch("hidden")



progressIcon = new Layer
	parent: progressIconClip
	width: 56.0
	height: 56.0
	image: "images/right.png"

progressIcon.states =
	"start": { rotation: 0 }
	"end": { rotation: -360 }
progressIcon.stateSwitch("end")

progressIcon.on Events.StateSwitchEnd, (from, to) ->
	if from != to
		if from == "start"
			progressIcon.animate(from, curve: Bezier.linear, time: 1)
		else
			progressIcon.stateSwitch("end")

progressIcon.stateSwitch("start")


fix = new Layer
	parent: header
	width: 375
	height: 32
	backgroundColor: "FFF"





prompt = new Layer
	parent: screen
	width: 375.0
	height: 388.0
	image: "images/prompt.png"

prompt.states =
	"shown": { opacity: 1.0, y: 100 }
	"hidden": { opacity: 0.0, y: 586 }
	"done": { opacity: 1.0, y: 470 }
prompt.stateSwitch("shown")




panel = new Layer
	parent: screen
	width: 375.0
	height: 64.0
	backgroundColor: "null"

panel.states =
	"top": { y: 425 }
	"bottom": { y: 716 }
panel.stateSwitch("top")



buttonGenerate = new Layer
	parent: panel
	width: 200
	height: panel.height
	x: Align.right
	backgroundColor: null
	opacity: 0.5

buttonClear = new Layer
	parent: panel
	width: 100
	height: panel.height
	backgroundColor: null
	opacity: 0.5



createPanel = new Layer
	parent: panel
	width: 375.0
	height: 64.0
	image: "images/panel.png"

finishPanel = new Layer
	parent: panel
	width: 375.0
	height: 64.0
	image: "images/finishpanel.png"

for item in [createPanel, finishPanel]
	item.states =
		"shown": { opacity: 1.0 }
		"hidden": { opacity: 0.0 }
	item.stateSwitch("hidden")

createPanel.stateSwitch("shown")



keyboard = new Layer
	parent: screen
	width: 375.0
	height: 323.0
	image: "images/keyboard.png"

keyboard.states =
	"shown": { y: Align.bottom(0) }
	"hidden": { y: Align.bottom(400) }
keyboard.stateSwitch("shown")







videoClip = new Layer
	parent: screen
	width: 375
	height: 378
	# x: Align.center
	y: Align.top(192)
	# borderRadius: 12
	clip: true
	# backgroundColor: null
	image: "images/ad card.png"

videoClip.states =
	"shown": { opacity: 1.0 }
	"hidden": { opacity: 0.0 }
videoClip.stateSwitch("hidden")



videoClipMore = new Layer
	parent: videoClip
	width: 347
	height: 378
	x: Align.left(14)
	borderRadius: 16
	clip: true
	backgroundColor: null


videoView = new VideoLayer
	parent: videoClipMore
	width: 347
	height: 195
	video: "images/video/1.mp4"
	backgroundColor: "white"

videoView.player.muted = true
videoView.player.loop = true
videoView.player.play()


adtitle01 = new Layer
	width: 375.0
	height: 378.0
	image: "images/adtitle01.png"

adtitle02 = new Layer
	width: 375.0
	height: 378.0
	image: "images/adtitle02.png"


adtitle03 = new Layer
	width: 375.0
	height: 378.0
	image: "images/adtitle03.png"

for item in [adtitle01, adtitle02, adtitle03]
	item.parent = videoClip
	item.states =
		"shown": { opacity: 1.0 }
		"hidden": { opacity: 0.0 }
	item.stateSwitch("hidden")

	if item == adtitle01
		item.stateSwitch("shown")

	
selectHandler1 = () ->
	adtitle01.stateSwitch("shown")
	adtitle02.stateSwitch("hidden")
	adtitle03.stateSwitch("hidden")
	videoView.video = "images/video/1.mp4"
	videoView.player.play()

selectHandler2 = () ->
	adtitle01.stateSwitch("hidden")
	adtitle02.stateSwitch("shown")
	adtitle03.stateSwitch("hidden")
	videoView.video = "images/video/2.mp4"
	videoView.player.play()

selectHandler3 = () ->
	adtitle01.stateSwitch("hidden")
	adtitle02.stateSwitch("hidden")
	adtitle03.stateSwitch("shown")
	videoView.video = "images/video/3.mp4"
	videoView.player.play()











message = new Layer
	parent: screen
	width: 375.0
	height: 84.0
	y: Align.top(100)
	image: "images/message.png"

message.states =
	"shown": { opacity: 1.0 }
	"hidden": { opacity: 0.0 }
message.stateSwitch("hidden")




images = new Layer
	parent: screen
	width: 375.0
	height: 371.0
	y: Align.top(100)
	image: "images/images.png"

images.states =
	"shown": { opacity: 1.0 }
	"hidden": { opacity: 0.0 }
images.stateSwitch("hidden")




clearGeneration = () =>
	clearTimeout(delayReference)

	prompt.stateSwitch("shown")
	message.stateSwitch("hidden")

	videoClip.stateSwitch("hidden")
	progressIconClip.stateSwitch("hidden")

	panel.stateSwitch("top")
	createPanel.stateSwitch("shown")

	keyboard.stateSwitch("shown")
	images.stateSwitch("hidden")




startGeneration = () =>
	clearTimeout(delayReference)

	for item, i in [adtitle01, adtitle02, adtitle03, adtitle01]
		if item.states.current.name == "shown"
			item.stateSwitch("hidden")
			[adtitle01, adtitle02, adtitle03, adtitle01][i + 1].stateSwitch("shown")
			if  i == 3 then i = 0
			videoView.video = "images/video/#{i + 1}.mp4"
			videoView.player.play()
			break


	prompt.animate("hidden")
	message.animate("shown")

	videoClip.animate("shown")
	progressIconClip.animate("shown")

	panel.animate("bottom")
	createPanel.animate("hidden")

	keyboard.animate("hidden")

	delayReference = delay gTime, ->
		stateGuard.stateSwitch("end")


doneGeneration = () =>
	prompt.animate("done")
	images.animate("shown")

	videoClip.animate("hidden")
	progressIconClip.animate("hidden")

	createPanel.animate("shown")



gTime = 20 * 1000 

handler1 = () -> gTime = 20 * 1000
handler2 = () -> gTime = 40 * 1000
handler3 = () -> gTime = 200 * 1000
handlerFast = () -> gTime = 5 * 1000


preview.addSection("Generation Time", [
  { title: "20 sec", handler: handler1 },
  { title: "40", handler: handler2 },
  { title: "5", handler: handlerFast },
  { title: "Inf", handler: handler3 },
]);

preview.addSection("Ads type", [
  { title: "Bank", handler: selectHandler1 },
  { title: "Garden", handler: selectHandler3 },
  { title: "Table", handler: selectHandler2 },
]);




stateGuard = new Layer
	parent: screen
	backgroundColor: null

stateGuard.states =
	"start": { opacity: 1 }
	"load": { opacity: 1 }
	"end": { opacity: 1 }
stateGuard.stateSwitch("start")

stateGuard.on Events.StateSwitchEnd, (from, to) ->
	if from != to
		if to == "load" then startGeneration()
		else if to == "end" then doneGeneration()
		else if to == "start" then clearGeneration()





buttonGenerate.onTap ->
	if stateGuard.states.current.name == "start"
		stateGuard.stateSwitch("load")
	else if stateGuard.states.current.name == "end"
		stateGuard.stateSwitch("start")
		buttonGenerate.emit Events.Tap

buttonClear.onTap ->
	if stateGuard.states.current.name == "end"
		stateGuard.stateSwitch("start")

message.onTap ->
	# print stateGuard.states.current.name
	if stateGuard.states.current.name == "load"
		stateGuard.stateSwitch("start")

prompt.onTap ->
	if stateGuard.states.current.name == "end"
		stateGuard.stateSwitch("start")




