# Framer.Loop.delta = 1 / 360

Framer.Extras.Hints.disable()
{ distributeLayers } = require "distributeLayers"
navigationView = require "navigationView"

# Messages

defaultInitMessage = "weather,traffic,mail,notifications,chats,taxi,eda,disk,kinopoisk,#,#,#,#,#,#,#,#,#,#,#"

currentMessage = defaultInitMessage
navigationView.init(currentMessage)
banner = navigationView.composeSites()

updateMessage = (newMessage) ->
	currentMessage = newMessage
	navigationView.init(currentMessage)
	navigationView.updateSites()
	
setPage = (newMessage) ->
# 	print newMessage
	try navigationView.setPage(newMessage)


`window.update = function (message) {
	updateMessage(message)
}`

`window.page = function (message) {
	setPage(message)
}`


FORCE_OPEN = false
# Screen.backgroundColor = "#FFF"

# Figma View

# Canvas.backgroundColor = "#FFF"

figmaView = new Layer
	width: 360
# 	y: 20
	height: 640
	backgroundColor: "#eee"
	clip: true


# App View

appViewLayers = []

appView = new ScrollComponent
	parent: figmaView
	width: 360
	height: figmaView.height
	scrollHorizontal: false
	directionLock: true

scrollProtector = new Layer
	parent: figmaView
	size: 10

scrollProtector.states =
	"teaser": { opacity: 0 }
	"hidden": { opacity: 0 }
	
scrollProtector.stateSwitch("teaser")


scrollProtector.on Events.StateSwitchEnd, (from, to) ->
	if to != from
		teaser.animate(to, curve: Spring(damping: 0.8), time: 0.4)
		bottomBar.animate(to, curve: Bezier.easeInOut, time: 0.2)


darker = new Layer
	width: 360
	height: figmaView.height
	parent: figmaView
	backgroundColor: "rgba(0,0,0,0.3)"

darker.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0

darker.stateSwitch("hidden")


appView.on Events.ScrollStart, ->
	FORCE_OPEN = false

appView.on Events.Scroll, (event, layer) ->
	localVelocityThreshold = .3
	if !FORCE_OPEN
		if layer.draggable.direction == "up" and Math.abs(event.velocity.y) > localVelocityThreshold
			scrollProtector.stateSwitch("hidden")
		else if layer.draggable.direction == "down" and Math.abs(event.velocity.y) > localVelocityThreshold
			scrollProtector.stateSwitch("teaser")







header = new Layer
	width: 360
	height: 148
	clip: true

headerContent = new Layer
	parent: header
	width: 360
	height: 192
	image: "images/header.png"


news = new Layer
	width: 360
	height: 480
	image: "images/news.png"

weather = new Layer
	width: 360
	height: 400
	image: "images/weather.png"

district = new Layer
	width: 360
	height: 344
	image: "images/district.png"

schedule = new Layer
	width: 360
	height: 408
	image: "images/schedule.png"

stocks = new Layer
	width: 360
	height: 144
	image: "images/stocks.png"

endLayer = new Layer
	width: 360
	height: 16
	backgroundColor: "null"

sumY = 0
for currentLayer, i in [header, banner, news, weather, district, schedule, stocks, endLayer]
	appViewLayers.push(currentLayer)
	currentLayer.parent = appView.content
	currentLayer.y = sumY
	sumY += currentLayer.height
	if i > 0 then sumY += 8


appView.updateContent()


# Teaser

teaserSize = 137 + 48

teaser = new Layer
	parent: figmaView
	width: 360
	height: figmaView.height * 3
	backgroundColor: "white"
	shadowY: -4
	shadowBlur: 10
	borderRadius: 20
	shadowColor: "rgba(0,0,0,0.2)"
	animationOptions: 
		curve: Spring(damping: 1)
		time: 0.4

teaser.states =
	"teaser":
		y: figmaView.height - teaserSize
	"hidden":
		y: figmaView.height + 20
	"shown":
		y: 0

teaser.stateSwitch("teaser")

# teaser.draggable.enabled = true
teaser.draggable.horizontal = false
teaser.draggable.vertical = true
teaser.draggable.directionLock = true
# teaser.draggable.speedX = 0
teaser.draggable.speedY = 1.2
teaser.draggable.overdragScale = 0.2
teaser.draggable.constraints =
	x: 0
	y: -figmaView.height * 2
	width: 360
	height: figmaView.height * 5 + teaser.states.teaser.y


teaser.on Events.Move, (event, layer) ->
	if teaser.y >= teaser.states.shown.y + 40 and layer.draggable.velocity.y > 0 and !layer.draggable.isDragging
		teaser.animate("teaser", curve: Spring(damping: 1, velocity: teaser.velocity), time: 0.7)
	


teaser.on Events.DragEnd, (event, layer) ->
	if event.velocity.y < 0 and teaser.y > 0
		teaser.animate("shown", curve: Spring(damping: 1), time: 0.4)
	else if event.velocity.y > 0 and teaser.y > 0
		teaser.animate("teaser", curve: Spring(damping: 1), time: 0.4)


teaser.on Events.TouchEnd, (event, layer) ->
	if teaser.y > teaser.states.shown.y
		FORCE_OPEN = true
		teaser.animate("shown", curve: Spring(damping: 1), time: 0.4)





# Over Layer



# temp2 = new Layer
# 	parent: teaser
# 	width: 360
# 	height: teaser.height
# # 	borderRadius: 20
# # 	image: Utils.randomImage()





zen_344_card = new Layer
	parent: figmaView
# 	parent: teaser
# 	clip: true
	y: teaser.y + 48
	borderRadius: 8
# 	y: 48
	x: 8
	width: 344
	height: 432
	image: "images/zen%20344%20card.png"

zen_344_blur = new Layer
	width: 344
	height: 432
	image: "images/zen%20344%20blur.png"
	parent: zen_344_card

zen_344_blur.states =
	"shown": { opacity: 0 }
	"teaser": { opacity: 1 }
zen_344_blur.stateSwitch("teaser")


zen_teaser_text = new Layer
	parent: zen_344_card
	width: 312
	height: 48
	x: 16
	image: "images/zen%20teaser%20text.png"

zen_teaser_text.states =
	"shown": { y: 229 }
	"teaser": { y: 33 }
zen_teaser_text.stateSwitch("teaser")

zen_teaser_title = new Layer
	parent: zen_344_card
	width: 312
	height: 14
	x: 16
	image: "images/zen%20teaser%20title.png"

zen_teaser_title.states =
	"shown": { y: 208, opacity: 0 }
	"teaser": { y: 12, opacity: 1 }
zen_teaser_title.stateSwitch("teaser")




tabs_zen = new Layer
	parent: figmaView
# 	clip: true
	borderRadius: 20
	width: 360
	height: 48
	y: teaser.y
	backgroundColor: "white"
	image: "images/tabs zen.png"



layerHeader = new Layer
	parent: figmaView
	width: 360
	height: 48
	y: teaser.y
	opacity: 0
	image: "images/layer%20header.png"

layerHeaderClose = new Layer
	size: 48
	parent: figmaView
	backgroundColor: "null"

layerHeaderClose.on Events.Tap, (event, layer) ->
	if teaser.y <= teaser.states.shown.y
		teaser.animate("teaser", curve: Spring(damping: 1), time: 0.5)



Card0 = new Layer
	width: 360
	height: 408
	image: "images/Card0.png"
	parent: zen_344_card
	scale: 1.03
	x: -8
	y: 442

Card1 = new Layer
	width: 360
	height: 407
	image: "images/Card1.png"
	parent: zen_344_card
	scale: 1.03
	x: -8
	y: 442 * 2 - 32

Card2 = new Layer
	width: 360
	height: 408
	image: "images/Card2.png"
	parent: zen_344_card
	scale: 1.03
	x: -8
	y: 442 * 3 - 32 * 2

Link0 = new Layer
	width: 360
	height: 410
	image: "images/Link0.png"
	parent: zen_344_card
	scale: 1.03
	x: -8
	y: 442 * 4 - 32 * 3

Link1 = new Layer
	width: 360
	height: 404
	image: "images/Link1.png"
	parent: zen_344_card
	scale: 1.03
	x: -8
	y: 442 * 5 - 32 * 4


# Bottom Bar

bottomBar = new Layer
	parent: figmaView
	width: 360
	height: 48
	backgroundColor: "white"
	image: "images/bottom bar.png"

bottomBar.states =
	"teaser":
		y: figmaView.height - 48
	"hidden":
		y: figmaView.height

bottomBar.stateSwitch("teaser")

bottomBarShadow = new Layer
	width: 360
	height: 8
	image: "images/bottom bar shadow.png"
	parent: bottomBar
	y: -8



# zen_344_card.on Events.TouchEnd, ->
# 	if !FORCE_OPEN
# 		print "ok"
# 		try
# 			window.webkit.messageHandlers.open.postMessage("https://yandex.ru");


teaser.on "change:y", ->
	value = teaser.y
	
	if value <= teaser.states.teaser.y and value >= teaser.states.shown.y
		tabs_zen.y = Utils.modulate(value, [teaser.states.teaser.y, teaser.states.shown.y], [teaser.states.teaser.y, 47], true)
		tabs_zen.borderRadius = Utils.modulate(value, [teaser.states.teaser.y, teaser.states.shown.y], [20, 0], true)
		
		layerHeader.y = Utils.modulate(value, [teaser.states.teaser.y, teaser.states.shown.y], [teaser.states.teaser.y, teaser.states.shown.y], true)
		layerHeader.opacity = Utils.modulate(value, [teaser.states.shown.y + 100, teaser.states.shown.y], [0, 1], true)
		
		bottomBar.y = Utils.modulate(value, [teaser.states.teaser.y, teaser.states.shown.y], [bottomBar.states.teaser.y, bottomBar.states.hidden.y], true)
		
		
		zen_344_card.y = Utils.modulate(value, [teaser.states.teaser.y, teaser.states.shown.y], [teaser.states.teaser.y + 48, 48 + 48], true)
		zen_344_blur.opacity = Utils.modulate(value, [teaser.states.teaser.y, teaser.states.shown.y], [1, 0], true)
		zen_teaser_text.y = Utils.modulate(value, [teaser.states.teaser.y, teaser.states.shown.y], [zen_teaser_text.states.teaser.y, zen_teaser_text.states.shown.y], true)
		
		zen_teaser_title.y = Utils.modulate(value, [teaser.states.teaser.y, teaser.states.shown.y], [zen_teaser_title.states.teaser.y, zen_teaser_title.states.shown.y], true)
		zen_teaser_title.opacity = Utils.modulate(value, [teaser.states.teaser.y, teaser.states.teaser.y - 100], [zen_teaser_title.states.teaser.opacity, zen_teaser_title.states.shown.opacity], true)
		
		darker.opacity = Utils.modulate(value, [teaser.states.shown.y, teaser.states.shown.y + 200], [1, 0], true)
		
		
		teaser.borderRadius = Utils.modulate(value, [teaser.states.teaser.y, teaser.states.shown.y], [20, 0], true)
		
	else if value < teaser.states.shown.y
		zen_344_card.y = Utils.modulate(value, [teaser.states.shown.y - 100, teaser.states.shown.y], [48 + 48 - 100, 48 + 48], false)
	else
		tabs_zen.y = value
		zen_344_card.y = value + 48
	




{ Preview } = require "PreviewComponent"
preview = new Preview { view: figmaView, borderRadius: 16 }


# print preview