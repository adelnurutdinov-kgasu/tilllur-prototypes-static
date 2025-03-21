
document.body.style.cursor = "auto"
Canvas.backgroundColor = "222"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

{ Preview } = require "PreviewComponent"

screen = new Layer 
	width: 1366
	height: 768
	backgroundColor: "F4F2F0"
	image: "images/screen.png"
	# image: "images/screen.png"

new Preview { view: screen, showBars: false, showDevice: false, borderRadius: 8 }





class HoverLayer extends Layer
	constructor: (@options={}) ->
		
		_.defaults @options,
			handler: null
			originX: 0
			originY: 0.5

		super @options
		@style = cursor: "pointer"
		
		@.onMouseOver @Hover
		@.onMouseOut @HoverOff
	
	
		
	Hover: =>
		@animate(scale: 1.1)
		if @name == "video"
			try videoPlayerOverlay.stateSwitch("shown")

	HoverOff: =>
		@animate(scale: 1.0)
		if @name == "video"
			try videoPlayerOverlay.stateSwitch("hidden")
	
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)
	


class ButtonLayer extends Layer
	constructor: (@options={}) ->
		
		_.defaults @options,
			handler: null
			originX: 0
			originY: 0.5

		super @options
		@style = cursor: "pointer"
		
		@.onMouseOver @Hover
		@.onMouseOut @HoverOff
	
	
		
	Hover: =>
		@opacity = 1.0
		# try videoPlayerOverlay.stateSwitch("shown")

	HoverOff: =>
		@opacity = 0.7
		# try videoPlayerOverlay.stateSwitch("hidden")
	
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)








# box = new HoverLayer
# 	parent: screen
# 	size: 50
# 	x: Align.center, y: Align.center


logo = new HoverLayer
	parent: screen
	width: 44.0, height: 44.0
	x: 32, y: 32
	originX: 0.5
	image: "images/logo.png"



message = new HoverLayer
	parent: screen
	width: 191.0
	height: 56.0
	x: 32, y: 88
	# image: "images/message2.png"
	image: "images/message.png"



videoHoverLayer = new HoverLayer
	parent: screen
	name: "video"
	width: 175, height: 108
	x: 32, y: 152
	borderRadius: 16
	clip: true



videoPlayer = new VideoLayer
	parent: videoHoverLayer
	width: 175, height: 108
	# x: 32, y: 152
	video: "images/test.mov"

videoPlayer.player.loop = true
videoPlayer.player.play()
videoPlayer.player.playbackRate = 0.8




videoPlayerOverlay = new Layer
	parent: videoPlayer
	width: 175, height: 108
	# image: "images/overlay2.png"
	image: "images/overlay.png"

videoPlayerOverlay.states =
	"shown": { opacity: 1.0 }
	"hidden": { opacity: 0.0 }
videoPlayerOverlay.stateSwitch("hidden")




control = new ButtonLayer
	parent: videoPlayer
	width: 40.0
	height: 40.0
	x: Align.left, y: Align.bottom
	
control.states =	
	"playing": { image: "images/playing.png" }
	"paused": { image: "images/paused.png" }
control.stateSwitch("playing")


control.on Events.Tap, (event, layer) ->
	event.stopPropagation()

	if videoPlayer.player.paused
		videoPlayer.player.play()
		control.stateSwitch("playing")
	else
		videoPlayer.player.pause()
		control.stateSwitch("paused")





youtube = new Layer
	parent: screen
	width: 1366.0
	height: 768.0
	image: "images/youtube.png"

youtube.states =
	"shown": { opacity: 1, y: 0 }
	"hidden": { opacity: 0, y: 1000 }
youtube.stateSwitch("hidden")



youtube.onTap ->
	youtube.stateSwitch("hidden")

videoPlayer.onTap ->
	youtube.stateSwitch("shown")

