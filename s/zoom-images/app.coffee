

Canvas.backgroundColor = "222"


Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

{ Preview } = require "PreviewComponent"


screen = new Layer
	width: 375
	height: 812
	backgroundColor: "FFF"


preview = new Preview { view: screen }



homeView = new ScrollComponent
	parent: screen
	width: 375
	height: 812
	scrollVertical: true
	scrollHorizontal: false

statusBarFix = new Layer
	parent: homeView
	width: 375
	height: 40
	backgroundColor: "white"

content = new Layer
	parent: homeView.content
	width: 375.0
	height: 2000.0
	image: "images/screen.jpg"

header = new Layer
	parent: homeView.content
	y: 44
	width: 375.0
	height: 80.0
	image: "images/header.png"

darker = new Layer
	parent: homeView.content
	width: 375.0
	height: content.height
	backgroundColor: "rgba(0,0,0,0.5)"

darker.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
darker.stateSwitch("hidden")




createImage = (positionY) ->

	placeholderImage = new Layer
		parent: homeView.content
		width: 363
		height: 363
		x: 6
		y: positionY
		borderRadius: 12
		backgroundColor: "EEE"

	image = new Layer
		parent: homeView.content
		width: 363
		height: 363
		x: 6
		y: positionY
		borderRadius: 12
		image: Utils.randomImage()
		custom:
			savedY: positionY

	image.draggable.enabled = false

	image.pinchable.enabled = true
	image.pinchable.rotate = false
	image.pinchable.minScale = 1
	image.pinchable.maxScale = 5

	image.on Events.PinchStart, ->
		darker.bringToFront()
		image.bringToFront()
		
		darker.animate("shown")
		image.animate(borderRadius: 0, time: 0.3)

		image.draggable.enabled = true
		homeView.content.draggable.enabled = false
	
	image.on Events.TouchEnd, ->

		darker.animate("hidden")
		image.animate(scale: 1, borderRadius: 12, x: 6, y: image.custom.savedY)

		image.draggable.enabled = false
		homeView.content.draggable.enabled = true
	
	return image

images = []
for item in [222, 689, 1156, 1623]
	images.push createImage(item)

Events.wrap(window).addEventListener "touchend", (event) ->
	for image in images
		image.emit Events.TouchEnd