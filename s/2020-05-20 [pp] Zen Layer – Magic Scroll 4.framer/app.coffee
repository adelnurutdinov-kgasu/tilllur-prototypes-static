# Framer.Extras.Hints.disable()
# Framer.Loop.delta = 1 / 360

# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "transparent"


content = new Layer
	name: "content"
	name: "content"
	parent: figmaView
	width: 360
	height: 5231
	backgroundColor: "null"
# 	image: "images/content.png"



statusBarWhite = new Layer
	name: "statusBarWhite"
	name: "statusBarWhite"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 20
	opacity: 1
	backgroundColor: "white"
	# image: "images/figma/statusBarWhite.png"



part2 = new Layer
	name: "part2"
	width: 360
	height: 1176
	image: "images/part2.jpg"

part3 = new Layer
	name: "part3"
	width: 360
	height: 290
	image: "images/part3.jpg"

part4 = new Layer
	name: "part4"
	width: 360
	height: 859
	image: "images/part4.jpg"

part5 = new Layer
	name: "part5"
	width: 360
	height: 1752
	image: "images/part5.jpg"

part1 = new Layer
	name: "part1"
	width: 360
	height: 1096
	image: "images/part1.jpg"

sumY = 0
for item in [part1, part2, part3, part4, part5]
	item.parent = content
	item.y = sumY
	sumY = sumY + item.height
	


# figmaView.scale = Screen.width / 360
# figmaView.center()
# figmaView.clip = true

# Framer.Device.deviceType = "fullscreen"

# if Screen.width > 760
# 	Canvas.backgroundColor = "222"
# 	Screen.backgroundColor = "222"
# 	figmaView.scale = 1.5
# 	figmaView.center()

temp = new TextLayer
	name: "temp"
	fontSize: 12
	x: 140
	text: ""
# 	opacity: 0

contentScroll = new ScrollComponent
	name: "contentScroll"
	parent: figmaView
	width: content.width
	height: figmaView.height - statusBarWhite.height + 4
	y: statusBarWhite.height
	scrollHorizontal: false
	contentInset:
		bottom: 60

contentScroll.content.draggable.overdragScale = 0.1

content.y = 0
content.parent = contentScroll.content


figmaView.backgroundColor = "EEE"


POINT = 1950
LAYER_DRAGGING = false
LAYER_START_Y = 0
SCROLL_TO_TOP = false

# Layer

layerTeaser = new Layer
	name: "layerTeaser"
	name: "layerTeaser"
	parent: figmaView
	x: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "null"
	

layerTeaser.states =
	"scrolled": { y: 116 }
	"hidden": { y: 640 }
	"shown": { y: 512 }
layerTeaser.stateSwitch("shown")

layerTeaser.draggable.enabled = true
layerTeaser.draggable.overdrag = false
layerTeaser.draggable.speedX = 0

layerTeaser.draggable.constraints =
	x: 0
	y: 116
	width: 360
	height: 640*2-128-116



layerTeaser.onTouchStart ->
	if layerTeaser.draggable.enabled == true
		LAYER_DRAGGING = true
		LAYER_START_Y = contentScroll.scrollY


layerOpenHandler = (event, layer) ->
	if !layerTeaser.draggable.isAnimating and contentScroll.scrollY > -2
		LAYER_DRAGGING = true
		LAYER_START_Y = contentScroll.scrollY
		
		scrollGuard.stateSwitch("hidden")
		layerTeaser.ignoreEvents = true
		layerTeaser.animate("scrolled", { curve: Spring(tension: 400, friction: 34, tolerance: 1)})

layerTeaser.on Events.TapEnd, (event, layer) ->
	layerOpenHandler(event, layer)


layerTeaser.on Events.AnimationEnd, (event, layer) ->
# 	temp.text = "#{layerTeaser.draggable.enabled} #{layerTeaser.ignoreEvents}"
	if LAYER_START_Y > 0 and layerTeaser.states.current.name == "scrolled"
		contentScroll.scrollToPoint({ x: 0, y: POINT + 480 }, false)
		LAYER_START_Y = 0
		LAYER_DRAGGING = false
	else if layer.states.current.name == "shown"
		layerTeaser.ignoreEvents = false
	
	if layerTeaser.y == layerTeaser.states.shown.y - 94
		SCROLL_TO_TOP = false
		layerTeaser.ignoreEvents = true
		layerTeaser.draggable.enabled = false


layerTeaser.on Events.DragEnd, (event, layer) ->
	currentVelocityY = event.velocity.y
	try
		layerTeaser.animateStop()
# 	print "#{currentVelocityY} #{layerTeaser.y} #{layerTeaser.states.shown.y - 256}"
	
	# сильный свайп
	if currentVelocityY < -0.2 or layerTeaser.y < layerTeaser.states.shown.y - 256
		scrollGuard.stateSwitch("hidden")
		layerTeaser.ignoreEvents = true
		layerTeaser.animate("scrolled", time: Utils.modulate(layerTeaser.y, [layerTeaser.states.scrolled.y, layerTeaser.states.shown.y], [0, 0.5], true), curve: Spring(damping: 1))
		
		# если довели до конца, то надо руками переместить ленту
		if layerTeaser.y == layer.states.scrolled.y
			if LAYER_START_Y < 1 then ;
			else
				contentScroll.scrollY = POINT + 640 - 44 - 48 - 70
	else
		layerTeaser.animate("shown", curve: Spring(tension: 400, friction: 40, velocity: currentVelocityY))



layerTeaser.on "change:y", ->
	
	if LAYER_DRAGGING
		valueDrag = layerTeaser.y
		
		card.scale = Utils.modulate(valueDrag, [512, 384], [card.states.layer.scale, card.states.feed.scale], true)
		card.borderRadius = Utils.modulate(valueDrag, [512, 384], [card.states.layer.borderRadius, card.states.feed.borderRadius], true)
		
		
		# Normalized Value
		if LAYER_START_Y < 1
			value = Utils.modulate(valueDrag, [388, 388 - 156], [0, 156])
			
			
			if value > 0 and value <= 268
				tempVC = part3.height + navigationView.states.min.height + (omnibox.height - 4 * 2) + 24
				contentScroll.scrollY = Utils.modulate(value, [0, 156], [POINT-156 + tempVC, POINT + tempVC], false)
			
			else if value <= 0
				contentScroll.scrollY = 0
		
		
		
		if value > 0 and value <= 156
			for item in [headerView, navigationView]
				item.y = Utils.modulate(value, [0, 156], [item.states.max.y, item.states.average.y], false)
				item.height = Utils.modulate(value, [0, 156], [item.states.max.height, item.states.average.height], false)
		
		else if value > 156 and value <= 268
			for item in [headerView, navigationView]
				item.y = Utils.modulate(value, [156, 268], [item.states.average.y, item.states.min.y], true)
				item.height = Utils.modulate(value, [156, 268], [item.states.average.height, item.states.min.height], true)
		
		else if value > 268 and value <= 360
			for item in [headerView, navigationView]
					
				item.y = Utils.modulate(value, [268, 360], [item.states.min.y, item.states.hidden.y], true)
				item.height = Utils.modulate(value, [268, 360], [item.states.min.height, item.states.hidden.height], true)

		



card = new Layer
	name: "card"
	width: 360
	height: 414
	image: "images/card.png"

card.parent = layerTeaser
card.originX = 0.5
card.originY = 0
card.states =
	"feed":
		scale: 0.9777
		borderRadius: 8
	"layer":
		scale: 0.92
		borderRadius: 12

card.stateSwitch("layer")




omniboxFix = new Layer
	name: "omniboxFix"
	width: 360
	height: 128 + 56 + 200 - 24
	parent: content
	y: 0
	backgroundColor: "white"

# cardFix = new Layer
	name: "# cardFix"
# 	width: 360
# 	height: 412
# 	backgroundColor: "#DDD"
# 	parent: content
# 	y: 2105

# Guard


scrollGuard = new Layer
	name: "scrollGuard"
	x: -400
	opacity: 0

scrollGuard.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 0 }

scrollGuard.stateSwitch("shown")

scrollGuard.on Events.StateSwitchEnd, (from, to) ->
	if !LAYER_DRAGGING
		if from == "hidden" and to == "shown"
			layerTeaser.animate("shown", time: 0.2)
		else if from == "shown" and to == "hidden"
			layerTeaser.animate("hidden", time: 0.2)


	
	
bottomBarGuard = new Layer
	name: "bottomBarGuard"
	x: -400
	opacity: 0

bottomBarGuard.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 0 }

bottomBarGuard.stateSwitch("shown")

bottomBarGuard.on Events.StateSwitchEnd, (from, to) ->
	if !LAYER_DRAGGING
		if from == "hidden" and to == "shown"
			bottomBarView.animate("max", time: 0.2)
		else if from == "shown" and to == "hidden"
			bottomBarView.animate("min", time: 0.2)




cardNextFix = new Layer
	name: "cardNextFix"
	width: 352
	height: 446
# 	y: 2518
# 	parent: content
	image: "images/card next.png"
	x: 4
	y: 410
	parent: layerTeaser

cardShadow.parent = layerTeaser
cardShadow.x = 0
cardShadow.y = 240
cardShadow.sendToBack()


# card_shadow = new Layer
	# name: "# card_shadow"
# 	width: 360
# 	height: 160
# # 	image: "images/card%20shadow.png"
# 	image: null
# 	parent: layerTeaser
# 	y: -20
# 	backgroundColor: "transparent"
# 
# card_shadow.placeBehind(card)
# 
# framerShadow.parent = card_shadow


# Top Images

headerView = new Layer
	name: "headerView"
	width: 360
	parent: figmaView
	backgroundColor: "white"
	clip: true

headerView.states =
	"max": { height: 200, y: 0 }
	"average": { height: 200, y: 0 }
	"min": { height: 200, y: -112 + 4 }
	"hidden": { height: 200, y: -112 + 4 - 64 - 24 }

headerView.stateSwitch("max")



navigationView = new Layer
	name: "navigationView"
	parent: figmaView
	width: 360
	backgroundColor: "white"
	clip: true

navigationView.states =
	"max": { height: 200, y: 184 }
	"average": { height: 44, y: 184 }
	"min": { height: 44, y: 72 }
	"hidden": { height: 44, y: -20 }

navigationView.stateSwitch("max")


bottomBarView = new Layer
	name: "bottomBarView"
	parent: figmaView
	x: 0
	y: 584
	width: 360
	height: 56
	opacity: 1
	backgroundColor: "null"

bottomBarView.states =
	"max": { y: 584, height: 56 }
	"average": { y: 584, height: 56 }
	"min": { y: 620 - 8, height: 56 }
	"hidden": { y: 620 - 8, height: 56 }

bottomBarView.stateSwitch("max")




bottomBarShadow.x = 0
bottomBarShadow.y = 0
bottomBarShadow.parent = bottomBarView

bottomBarColor = new Layer
	name: "bottomBarColor"
	width: 360
	height: 48
	parent: bottomBarView
	y: 8
	backgroundColor: "white"

bottomBar = new Layer
	name: "bottomBar"
	name: "bottomBar"
	parent: bottomBarView
	width: 360
	height: 56
	opacity: 1
	image: "images/bottomBar.png"

bottomBar.states =
	"max": { opacity: 1 }
	"min": { opacity: 0 }
bottomBar.stateSwitch("max")

bottomBarSmall = new Layer
	name: "bottomBarSmall"
	parent: bottomBarView
	width: 360
	height: 28
	image: "images/bottomBarSmall.png"

bottomBarSmall.states =
	"max": { opacity: 0 }
	"min": { opacity: 1 }
bottomBarSmall.stateSwitch("max")



omniboxGuard = new Layer
	name: "omniboxGuard"
	x: -400
	opacity: 0

omniboxGuard.states =
	"max": { opacity: 0 }
	"average": { opacity: 0 }
	"min": { opacity: 0 }
	"hidden": { opacity: 0 }

omniboxGuard.stateSwitch("max")

omniboxGuard.on Events.StateSwitchEnd, (from, to) ->
	
	if from != to
		prevStableState = to
		headerView.animate(to, time: 0.2)
		navigationView.animate(to, time: 0.2)
		





navPanel = new Layer
	name: "navPanel"
	width: 360
	parent: navigationView
	image: "images/nav%20panel%20pp.png"

navPanel.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
navPanel.stateSwitch("shown")
 

verticals = new Layer
	name: "verticals"
	width: 360
	height: 44
	parent: navigationView
	image: "images/verticals.png"

verticals.states =
	"hidden": { y: 0, opacity: 1 }
	"shown": { y: navigationView.height - 44, opacity: 0 }
verticals.stateSwitch("shown")


omnibox = new Layer
	name: "omnibox"
	width: 360
	height: 56
	parent: headerView
	image: "images/omnibox.png"
	backgroundColor: "white"

omnibox.states =
	"hidden": { y: 128 }
	"shown": { y: 128 }
omnibox.stateSwitch("shown")


logo = new Layer
	name: "logo"
	width: 360
	height: 104
	image: "images/logo.png"
	parent: headerView
	y: 24

logo.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
logo.stateSwitch("shown")



navigationView.on "change:height", ->
	value = navigationView.height
	navPanel.opacity = Utils.modulate(value, [navigationView.states.max.height, navigationView.states.average.height + 40], [navPanel.states.shown.opacity, navPanel.states.hidden.opacity])
	verticals.opacity = Utils.modulate(value, [navigationView.states.average.height + 40, navigationView.states.average.height], [verticals.states.shown.opacity, verticals.states.hidden.opacity], true)
	
	verticals.y = Utils.modulate(value, [navigationView.states.max.height, navigationView.states.average.height], [verticals.states.shown.y, verticals.states.hidden.y])
	omnibox.y = Utils.modulate(value, [navigationView.states.max.height, navigationView.states.average.height], [omnibox.states.shown.y, omnibox.states.hidden.y])

bottomBarView.on "change:y", ->
	value = bottomBarView.y
	bottomBar.opacity = Utils.modulate(value, [bottomBarView.states.max.y,bottomBarView.states.min.y], [bottomBar.states.max.opacity, bottomBar.states.min.opacity], true)
	bottomBarSmall.opacity = Utils.modulate(value, [bottomBarView.states.max.y,bottomBarView.states.min.y], [bottomBarSmall.states.max.opacity, bottomBarSmall.states.min.opacity], true)


bottomBarBack = new Layer
	name: "bottomBarBack"
	parent: bottomBar
	width: 70
	y: 6
	height: 54
	backgroundColor: "null"

verticalsBack = new Layer
	name: "verticalsBack"
	parent: verticals
	width: 54
	height: 44
	backgroundColor: "null"


scrollToTop = (event, layer) ->
	if contentScroll.scrollY < 1 then return
	SCROLL_TO_TOP = true

	contentScroll.scrollY = headerView.states.max.height
	contentScroll.scrollToPoint({ x: 0, y: 0 }, true, time: 0.3)
	
	if layerTeaser.y >= layerTeaser.states.scrolled.y
		layerTeaser.animate("shown", time: 0.3)
	else
		layerTeaser.stateSwitch("hidden")
		layerTeaser.animate("shown", time: 0.3)
	
	card.animate(scale: card.states.layer.scale, {time: 0.3})
	card.animate(borderRadius: card.states.layer.borderRadius, {time: 0.3})
	
	if !LAYER_DRAGGING
		navigationView.animate("max", time: 0.3)
		headerView.animate("max", time: 0.3)
		


bottomBarBack.on Events.TapEnd, (event, layer) ->
	scrollToTop(event, layer)

verticalsBack.on Events.TapEnd, (event, layer) ->
	scrollToTop(event, layer)


layerTeaser.placeBehind(headerView)
bottomBar.bringToFront()
statusBarWhite.bringToFront()


# Scroll

SCROLL_FINISHING = false
LAST_SUCCESS_DIRECTION = ""

contentScroll.onTouchStart ->
# 	print "3?"
	LAYER_DRAGGING = false
	SCROLL_FINISHING = false

contentScroll.content.on Events.Move, (event, layer) ->
	if LAYER_DRAGGING then return
	
	
	if contentScroll.scrollY < 10
		scrollGuard.stateSwitch("shown")
	else
		if contentScroll.direction == "down" and contentScroll.scrollY < POINT
			scrollGuard.stateSwitch("hidden")
		else if contentScroll.direction == "up" and contentScroll.scrollY < POINT
			scrollGuard.stateSwitch("shown")
	
	
	if contentScroll.scrollY < 10
		bottomBarGuard.stateSwitch("shown")
	else
		if contentScroll.direction == "down"
			bottomBarGuard.stateSwitch("hidden")
		else if contentScroll.direction == "up"
			bottomBarGuard.stateSwitch("shown")
	
	

	if contentScroll.scrollY < 360
		
	else
		if contentScroll.direction == "down"
			omniboxGuard.stateSwitch("hidden")
		else if contentScroll.direction == "up"
			omniboxGuard.stateSwitch("min")




contentScroll.content.on Events.DragEnd, ->
	currentVelocityY = event.velocity.y
	value = contentScroll.scrollY
	
	if contentScroll.content.draggable.direction == "up" or contentScroll.content.draggable.direction == "down"
		LAST_SUCCESS_DIRECTION = contentScroll.content.draggable.direction
	
	if value < 268
		try
			contentScroll.content.animateStop()
		
		if currentVelocityY < 0
			contentScroll.scrollToPoint({ x: 0, y: 268 }, true, { curve: Spring(tension: 400, friction: 34, tolerance: 1, velocity: currentVelocityY)})
		else
			contentScroll.scrollToPoint({ x: 0, y: 0 }, true, { curve: Spring(tension: 400, friction: 34, tolerance: 1, velocity: currentVelocityY)})



contentScroll.content.on Events.AnimationEnd, (event, layer) ->
	if SCROLL_TO_TOP
		SCROLL_TO_TOP = false
# 		temp.text = "DONE #{Utils.randomNumber()}"




contentScroll.content.on "change:y", (event, layer) ->
	if LAYER_DRAGGING or SCROLL_TO_TOP then return
	value = contentScroll.scrollY
# 	framerShadow.opacity = Utils.modulate(value, [POINT, POINT + 60], [1, 0], true)
	
# 	temp.text = value
	if value <= 156
		for item in [headerView, navigationView]
			item.y = Utils.modulate(value, [0, 156], [item.states.max.y, item.states.average.y], false)
			item.height = Utils.modulate(value, [0, 156], [item.states.max.height, item.states.average.height], false)
	
	else if value > 156 and value <= 268
		for item in [headerView, navigationView]
			item.y = Utils.modulate(value, [156, 268], [item.states.average.y, item.states.min.y], true)
			item.height = Utils.modulate(value, [156, 268], [item.states.average.height, item.states.min.height], true)
	
	else if value > 268 and value <= 360
		for item in [headerView, navigationView]
			if item.y == item.states.min.y then continue
				
			item.y = Utils.modulate(value, [268, 360], [item.states.min.y, item.states.hidden.y], true)
			item.height = Utils.modulate(value, [268, 360], [item.states.min.height, item.states.hidden.height], true)
	
	
	if value >= POINT
		layerTeaser.draggable.enabled = false
		layerTeaser.ignoreEvents = true
		
		layerTeaser.y = Utils.modulate(value, [POINT, POINT + 1000], [layerTeaser.states.hidden.y, layerTeaser.states.hidden.y - 1000], false)
	else
		layerTeaser.draggable.enabled = true
		layerTeaser.ignoreEvents = false
	
	
	card.scale = Utils.modulate(value, [POINT, POINT + 60], [card.states.layer.scale, card.states.feed.scale], true)
	card.borderRadius = Utils.modulate(value, [POINT, POINT + 60], [card.states.layer.borderRadius, card.states.feed.borderRadius], true)
	
	
	
	
	
	
	if value < 268 and !contentScroll.content.draggable.isDragging and !SCROLL_FINISHING
		SCROLL_FINISHING = true
		currentVelocityY = contentScroll.content.draggable.velocity.y
		
		try
			contentScroll.content.animateStop()
		
		if currentVelocityY < 0 or (currentVelocityY == 0 and LAST_SUCCESS_DIRECTION == "up")
			contentScroll.scrollToPoint({ x: 0, y: 268 }, true, { curve: Spring(tension: 370, friction: 34, tolerance: 1, velocity: currentVelocityY)})
		else if currentVelocityY > 0 or (currentVelocityY == 0 and LAST_SUCCESS_DIRECTION == "down")
			contentScroll.scrollToPoint({ x: 0, y: 0 }, true, { curve: Spring(tension: 370, friction: 34, tolerance: 1, velocity: currentVelocityY)})
			

# Others

POINT_EXTEND = 0
EXPANDED = false

showCardsButton = new Layer
	name: "showCardsButton"
	parent: part3
	width: 362
	height: 33

showCard1 = new Layer
	name: "showCard1"
	parent: part3
	width: 362
	height: 66
	y: showCardsButton.height

showCard2 = new Layer
	name: "showCard2"
	parent: part3
	width: 362
	height: 66
	y: showCardsButton.height + showCard1.height

showCard3 = new Layer
	name: "showCard3"
	parent: part3
	width: 362
	height: 66
	y: showCardsButton.height + showCard1.height + showCard2.height

showCardMore = new Layer
	name: "showCardMore"
	parent: part3
	width: 362
	height: 66
	y: showCardsButton.height + showCard1.height + showCard2.height + showCard3.height





toggleFeed = (event, layer, scrollPosition = part3.y-100) ->
	if !EXPANDED
		POINT += POINT_EXTEND
		scrollGuard.stateSwitch("shown")
		layerTeaser.animate("shown", time: 0.3)
		
		card.animate(scale: card.states.layer.scale, options: { time: 0.3 })
		card.animate(borderRadius: card.states.layer.borderRadius, options: { time: 0.3 })
		
		contentScroll.scrollToPoint({ x: 0, y: scrollPosition }, true, { time: 0.3 })
	
		for item in [part4, part5]
			item.animate(y: item.y + POINT_EXTEND, options: { time: 0.3 })
		
		for item in secondLayers
			item.stateSwitch("shown")
		
		content.height += POINT_EXTEND
		contentScroll.updateContent()
		
		for item in [showCard1, showCard2, showCard3, showCardMore]
			item.x = -2000
	
	else
		POINT -= POINT_EXTEND
		
		if contentScroll.scrollY > POINT + 640
			contentScroll.scrollToPoint({ x: 0, y: POINT }, false)
		contentScroll.scrollToPoint({ x: 0, y: POINT + 200 + 22 }, true, { time: 0.3 })
		
		for item in [part4, part5]
			item.animate(y: item.y - POINT_EXTEND, options: { time: 0.3 })
		
		for item in secondLayers
			item.stateSwitch("hidden")
		
		content.height -= POINT_EXTEND
		contentScroll.updateContent()
		
		for item in [showCard1, showCard2, showCard3, showCardMore]
			item.x = 0
		
		scrollGuard.stateSwitch("hidden")
		layerTeaser.animate(y: layerTeaser.states.shown.y - 94, { time: 0.2 })
		
		card.animate(scale: card.states.feed.scale, {time: 0.2})
		card.animate(borderRadius: card.states.feed.borderRadius, {time: 0.2 })
		
	
	EXPANDED = !EXPANDED



for item in [showCardsButton, showCard1, showCard2, showCard3, showCardMore]
	item.backgroundColor = "null"
	
	item.on Events.TapEnd, (event, layer) ->
		scrollPosition = part3.y - 100
		
		SHOWN_HEADER = true
		if headerView.y < headerView.states.min.y - 20
			SHOWN_HEADER = false
		
		if layer == showCard2
			scrollPosition = part3.y + tv.height
			if SHOWN_HEADER then scrollPosition -= 80
		else if layer == showCard3
			scrollPosition = part3.y + tv.height + personal.height
			if SHOWN_HEADER then scrollPosition -= (80 + 4)
		else if layer == showCardMore
			scrollPosition = part3.y + tv.height + personal.height + local.height
			if SHOWN_HEADER then scrollPosition -= (80 + 8)
		
		toggleFeed(event, layer, scrollPosition)

# showCardsButton.on Events.TapEnd, ->
	



vFix = new Layer
	name: "vFix"
	width: 50
	height: 44
	x: 130
	image: "images/vFix.png"
	parent: verticals
	opacity: 0


collections = new Layer
	name: "collections"
	width: 360
	height: 340
	image: "images/collections.jpg"

edadeal = new Layer
	name: "edadeal"
	width: 360
	height: 323
	image: "images/edadeal.jpg"

efir = new Layer
	name: "efir"
	width: 360
	height: 256
	image: "images/efir.jpg"

games = new Layer
	name: "games"
	width: 360
	height: 304
	image: "images/games.jpg"

local = new Layer
	name: "local"
	width: 360
	height: 393
	image: "images/local.jpg"

market = new Layer
	name: "market"
	width: 360
	height: 305
	image: "images/market.jpg"

music = new Layer
	name: "music"
	width: 360
	height: 339
	image: "images/music.jpg"

personal = new Layer
	name: "personal"
	width: 360
	height: 329
	image: "images/personal.jpg"

skills = new Layer
	name: "skills"
	width: 360
	height: 290
	image: "images/skills.jpg"

sport = new Layer
	name: "sport"
	width: 360
	height: 328
	image: "images/sport.jpg"

translate = new Layer
	name: "translate"
	width: 360
	height: 422
	image: "images/translate.jpg"

tv = new Layer
	name: "tv"
	width: 360
	height: 442
	image: "images/tv.jpg"


secondLayers = [tv, personal, local, collections, edadeal, efir, games, market, music, skills, sport, translate]

S_Y = part3.y + 27

savedPositionArray = [0, 0, 0]
for item in secondLayers
	item.parent = content
	item.y = S_Y
	item.scale = 0.97
	item.borderRadius = 8
	
	item.states =
		"hidden": { opacity: 0 }
		"shown": { opacity: 1 }
	item.stateSwitch("hidden")
	
	if item is tv
		savedPositionArray[0] = S_Y - 100
	else if item is personal
		savedPositionArray[1] = S_Y - 100
	else if item is local
		savedPositionArray[2] = S_Y - 100
	
	S_Y += item.height-4
	POINT_EXTEND += item.height-4

POINT_EXTEND -= 264
contentScroll.updateContent()




secondaryButtonHandler = (event, layer) ->
	SCROLL_TO_TOP = true
	
	navigationView.animate("min", time: 0.3)
	headerView.animate("min", time: 0.3)
	
	if !EXPANDED
		contentScroll.content.y = -(part3.y-100) + 400
		contentScroll.content.animate(y: -(part3.y-100), options: { time: 0.3 })
		
		scrollGuard.stateSwitch("hidden")
		layerTeaser.animate(y: layerTeaser.states.shown.y - 94, {time: 0.15, delay: 0.15})
		
		card.animate(scale: card.states.feed.scale, {time: 0.3})
		card.animate(borderRadius: card.states.feed.borderRadius, {time: 0.3})
	
	else
		contentScroll.content.y = -(part3.y-100) + 400
		contentScroll.content.animate(y: -(part3.y-100), options: { time: 0.3 })
	
		scrollGuard.stateSwitch("shown")
		layerTeaser.animate(y: layerTeaser.states.shown.y, {time: 0.15, delay: 0.15})




zenNav = new Layer
	name: "zenNav"
	parent: contentScroll.content
	size: 50
	x: 27
	y: 95 + navigationView.y - 24
	backgroundColor: "null"

yaNav = new Layer
	name: "yaNav"
	parent: contentScroll.content
	size: 50
	x: 90
	y: 95 + navigationView.y - 24
	backgroundColor: "null"

zenNav.on(Events.TapEnd, layerOpenHandler)
yaNav.on(Events.TapEnd, secondaryButtonHandler)




zenSec = new Layer
	name: "zenSec"
	width: 52
	height: 44
	x: 66
	image: "images/zenSec.png"

zenSec.parent = verticals
zenSec.states =
	"main": { opacity: 0 }
	"secondary": { opacity: 1 }
zenSec.stateSwitch("main")



verticals.on "change:opacity", ->
	E = 0.001
	value = verticals.opacity
	
	if value >= 1 - E
		zenSec.on(Events.TapEnd, layerOpenHandler)
	else if value <= 0 + E
		zenSec.off(Events.TapEnd, layerOpenHandler)





# figmaView.x = figmaView.y = 0


{ Preview } = require "PreviewComponent"
preview = new Preview { view: figmaView, borderRadius: 8, topTheme: "light", forceAndroidBar: true }
# preview.printTree(0)
