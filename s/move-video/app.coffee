
{ Preview } = require "PreviewComponent"


screen = new Layer
	width: 375
	height: 812
	backgroundColor: "FFF"
	image: "images/screen.png"


preview = new Preview { view: screen }


videoURL = "images/preview1.mp4"
setVideo1 = () -> videoURL = updateVideo("images/preview1.mp4")
setVideo2 = () -> videoURL = updateVideo("images/preview2.mp4")
setVideo3 = () -> videoURL = updateVideo("images/preview3.mp4")

updateVideo = (withURL) ->
	
	video.video = withURL
	video.player.play()


# Video Layer

initialDuration = 0
startTime = 0
finishTime = 0

isPlaying = false

video = new VideoLayer
	parent: screen
	x: 6
	y: 244
	width: 375-12
	height: 375-12
	borderRadius: 12
	clip: true
	video: "images/preview1.mp4"

video.sendToBack()

video.player.play()
video.player.loop = true


# Events.wrap(video.player).on "timeupdate", ->
# 	if video.player.currentTime >= finishTime
# 		video.player.pause()
	
# 	pointLayer.x = Utils.modulate(video.player.currentTime, [startTime, finishTime], [0, (312-6)], true)

Events.wrap(video.player).on "playing", ->
	isPlaying = true
	# playButton.stateSwitch("hidden")
	# pauseButton.stateSwitch("shown")


Events.wrap(video.player).on "pause", ->
	isPlaying = false
	# playButton.stateSwitch("shown")
	# pauseButton.stateSwitch("hidden")



# Play Button: Handlers

bounds = [0, 375]

# getCurrentPlayStartTime = () ->
# 	startValue = 0
# 	finishValue = 375
	
# 	finishTime = Utils.modulate(finishValue, bounds, [0, initialDuration], true)
# 	startTime = Utils.modulate(startValue, bounds, [0, initialDuration], true)
	
# # 	print startTime + " " + finishTime

# getCurrentPlayStartTime()




# playbackButtons.on Events.Tap, ->
# 	getCurrentPlayStartTime()
	
# 	if slider.knob.states.current.name == "hidden"
# 		video.player.currentTime = startTime
# 		slider.knob.stateSwitch("shown")
# 	else
# 		video.player.currentTime = Utils.modulate(slider.value, [0, 1], [startTime, finishTime], true)
	
	
# 	if !isPlaying
# # 		video.player.currentTime = startTime
# 		video.player.play()
# 	else
# 		video.player.pause()







# Slider: Progress



slider = new SliderComponent
	parent: video
	x: -375
	# y: 400
	width: 375 * 3
	height: 375
	borderRadius: 0
	backgroundColor: "red"
	opacity: 0.0

slider.fill.backgroundColor = "blue"

# slider.children[0].height = pointView.height
# slider.children[0].y = 0

slider.knob.width = 375 * 2
slider.knob.height = 375
slider.knob.x = 375 / 2
slider.knob.y = 0
slider.knob.borderRadius = 0
slider.knob.draggable.x = 1
slider.knob.draggable.y = 0
slider.knob.draggable.momentum = false
slider.knob.backgroundColor = "white"
slider.knob.opacity = 0.2

# slider.knob.states =
# 	"shown": { opacity: 1 }
# 	"hidden": { opacity: 0 }

# slider.knob.stateSwitch("hidden")



slider.on Events.TouchStart, ->
	# print "start"
	video.player.pause()
	# video.player.currentTime = Utils.modulate(slider.value, [1, 0], [0, video.player.duration], true)
	# @knob.stateSwitch("shown")

slider.on Events.TouchEnd, ->
	# print "end?"
	video.player.play()
	# @knob.stateSwitch("shown")

slider.on Events.DragEnd, ->
	# print "ENd12asdasdasd"
	video.player.play()

slider.on Events.SwipeEnd, ->
	# print "ENd12"
	video.player.play()

slider.knob.on Events.DragMove, ->
	# print Utils.randomNumber()
	# print slider.value
	video.player.currentTime = Utils.modulate(slider.value, [0, 1], [0, video.player.duration], true)



# Utils.delay 2, ->
# 	Framer.Loop.on "render", (event) ->
# 		if video.player.currentTime >= finishTime
# 			video.player.pause()
		
# 		if isPlaying
# 			localValue = Utils.modulate(video.player.currentTime, [startTime, finishTime], [0, 1], true)
			
# 			slider.animateToValue(localValue, time: 0)






preview.addSection("Video", [
  { title: "Hare", handler: setVideo1 },
  { title: "Zoom", handler: setVideo2 },
  { title: "Road", handler: setVideo3 },
]);