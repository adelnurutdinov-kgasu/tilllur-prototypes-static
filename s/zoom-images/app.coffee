

Canvas.backgroundColor = "222"


Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

{ Preview } = require "PreviewComponent"


screen = new FlowComponent
	width: 375
	height: 812
	backgroundColor: "FFF"


preview = new Preview { view: screen }



homeView = new ScrollComponent
	width: 375
	height: 812
	scrollVertical: true
	scrollHorizontal: false

screen.showNext(homeView, animate: false)

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

headerTemp = new Layer
	parent: content
	width: 375.0
	height: 180
	backgroundColor: "white"

darker = new Layer
	parent: content
	width: 375.0
	height: content.height
	backgroundColor: "rgba(0,0,0,0.5)"

darker.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
darker.stateSwitch("hidden")




createImage = (positionY, index) ->

	placeholderImage = new Layer
		parent: content
		width: 363
		height: 363
		x: 6
		y: positionY
		borderRadius: 12
		backgroundColor: "EEE"

	image = new Layer
		parent: content
		width: 363
		height: 363
		x: 6
		y: positionY
		borderRadius: 12
		image: "images/image " + index + ".jpg"
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
for item, i in [222, 689, 1156, 1623]
	images.push createImage(item, i)

Events.wrap(window).addEventListener "touchend", (event) ->
	for image in images
		image.emit Events.TouchEnd


handler1 = () ->
	image.pinchable.maxScale = 2.5 for image in images

handler2 = () ->
	image.pinchable.maxScale = 2 for image in images

handler3 = () ->
	image.pinchable.maxScale = 1.5 for image in images


preview.addSection("Max Scale (default x2.5)", [
  { title: "x2.5", handler: handler1 },
  { title: "x2", handler: handler2 },
  { title: "x1.5", handler: handler3 },
]);

handler1()







headerH = 178

navbar = new Layer
	parent: content
	width: 375.0
	height: 178.0
	image: "images/navbar.png"

header = new Layer
	parent: homeView
	width: 375.0
	height: 178.0
	image: "images/navbar.png"

header.states =
	"shown": { y: 0 }
	"hidden": { y: -headerH }
header.stateSwitch("hidden")



scrollGuard = new Layer
	parent: screen
	backgroundColor: null

scrollGuard.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 0 }
scrollGuard.stateSwitch("hidden")

scrollGuard.on Events.StateSwitchEnd, (from, to) ->
	if from != to
		header.animate(to)


homeView.content.on "change:y", ->
	v = homeView.scrollY
	if v < 0 then header.opacity = 0
	else header.opacity = 1

	
	if homeView.content.draggable.direction == "up"
		scrollGuard.stateSwitch("hidden")
	else if homeView.content.draggable.direction == "down"
		scrollGuard.stateSwitch("shown")





buttonProfile = new Layer
	parent: navbar
	size: 80
	x: Align.right
	y: Align.top(40)
	backgroundColor: null

buttonProfile2 = new Layer
	parent: header
	size: 80
	x: Align.right
	y: Align.top(40)
	backgroundColor: null

buttonProfile.onTap ->
	screen.showNext(profileView)

buttonProfile2.onTap ->
	screen.showNext(profileView)


profileView = new Layer
	width: 375
	height: 812
	backgroundColor: "white"
	image: "images/profile.png"

screen.showNext(profileView, animate: false)
screen.showPrevious(animate: false)




# profileView.onTap ->
# 	print profileImage.states.current.name 
# 	if profileImage.states.current.name == "shown"
# 		profileImage.animate("hidden")


darkerProfile = new Layer
	parent: profileView
	width: 375
	height: 812
	backgroundColor: "black"

darkerProfile.states =
	"shown": { opacity: 0.5 }
	"hidden": { opacity: 0 }
darkerProfile.stateSwitch("hidden")

darkerProfile.onTap ->
	if @states.current.name == "shown"
		profileImage.emit Events.Tap


buttonBack = new Layer
	parent: profileView
	size: 80
	x: Align.left
	y: Align.top(40)
	backgroundColor: null

buttonBack.onTap ->
	screen.showPrevious()



profileImage = new Layer
	parent: profileView
	size: 100
	x: Align.center
	y: Align.top(80)
	image: "images/profileImage.jpg"

profileImage.states =
	"hidden": 
		y: Align.top(80)
		scale: 1
		borderRadius: 100
	"shown":
		y: Align.center()
		scale: (375-40*2) / 100
		borderRadius: 0

profileImage.stateSwitch("hidden")


profileImage.onTap ->
	if @states.current.name == "shown"
		@animate("hidden")
		darkerProfile.animate("hidden")
	else
		@animate("shown")
		darkerProfile.animate("shown")