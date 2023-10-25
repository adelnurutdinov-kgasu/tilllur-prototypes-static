
{ Preview } = require "PreviewComponent"
{ NavigationComponent } = require "NavigationComponent"
{ Button } = require "Buttons"

screen = new Layer { width: 375, height: 812 }
preview = new Preview { view: screen, showUI: true, showHints: false }

flow = new NavigationComponent { parent: screen, width: screen.width, height: screen.height }
homeView = flow.createView("white")


shuffle = (source) ->
	return source unless source.length >= 2
	for index in [source.length-1..1]
		randomIndex = Math.floor Math.random() * (index + 1)
		[source[index], source[randomIndex]] = [source[randomIndex], source[index]]
	return source

allImages = []
for i in [1..15]
	if i < 10 then strIndex = "0#{i}" else strIndex = "#{i}"

	imageData =
		orig: "images/modes/orig_#{strIndex}.png"
		new: "images/modes/new_#{strIndex}.png"
	
	allImages.push imageData

imagesForCards = shuffle(allImages)

delay = (time, fn, args...) ->
	setTimeout fn, time, args...




getMovableImage = (imageData) ->
	imageView = new Layer
		width: 375, height: 375
		image: imageData.orig

	clipView = new Layer
		parent: imageView
		height: 375
		clip: true
		backgroundColor: "null"

	clipView.states =
		"start": { width: 240 }
		"hidden": { width: -2 }
		"shown": { width: 375 + 2 }
	clipView.stateSwitch("start")

	breaker = new Layer
		parent: imageView
		width: 2, height: 375
		x: 0, y: Align.top
		backgroundColor: "white"
		borderRadius: 2

	breaker.states =
		"start": { x: 240 - 2 }
		"hidden": { x: clipView.states.hidden.width }
		"shown": { x: clipView.states.shown.width }
	breaker.stateSwitch("start")


	imageMode = new Layer
		parent: clipView
		width: 375.0, height: 375.0, image: imageData.new



	# Proxy

	boxProxy = new Layer { opacity: 0 }
	boxProxy.states =
		"hidden": { opacity: 0 }
		"shown": { opacity: 0 }
	boxProxy.stateSwitch("shown")

	boxProxy.on Events.StateSwitchEnd, (from, to) ->
		if from != to
			animationOptions =
				# curve: Spring(damping: 1.0)
				curve: Bezier.easeInOut
				time: 1

			clipView.animate(to, animationOptions)
			breaker.animate(to, animationOptions)
			
			Utils.delay 2, =>
				boxProxy.animate(from, animationOptions)

	boxProxy.stateSwitch("hidden")

	return imageView


# slider

getSimpleImage = (imageData) ->
	return new Layer
		size: 375, image: imageData.new

getSlider = (imageData) ->


	slider = new PageComponent
		size: 375
		scrollVertical: false
		scrollHorizontal: false
		directionLock: true
	
	image1 = new Layer
		parent: slider.content
		size: 375
		# image: imageData.new
		image: imageData.orig

	image1 = new Layer
		parent: slider.content
		size: 375, x: 375
		# image: imageData.orig
		image: imageData.new
	
	text = new TextLayer
		parent: slider
		width: 86
		fontSize: 13, fontWeight: 700
		color: "white", textAlign: "center"
		backgroundColor: "rgba(0,0,0,0.3)"
		text: "оригинал"
		borderRadius: 100
		x: Align.right(-14), y: Align.bottom(-14)
		padding: 7
		opacity: 0


	slider.on Events.TouchStart, ->
		@snapToPage(@content.children[0], false)
	
	slider.on Events.TouchEnd, ->
		@snapToPage(@content.children[1], false)
	
	slider.on Events.Swipe, ->
		@snapToPage(@content.children[1], false)

	slider.on "change:currentPage", ->
		if @currentPage == @content.children[0]
			@children[1].opacity = 0
		else
			@children[1].opacity = 1


	magic = new Layer
		parent: slider
		width: 240.0, height: 240.0, image: "images/magic.gif"
		x: Align.center, y: Align.center
	
	return slider




feedScroll = new ScrollComponent
	parent: homeView
	width: 375
	height: 812
	backgroundColor: "eee"
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true
	contentInset:
		bottom: 120

bottomBar = new Layer
	parent: homeView
	width: 375.0, height: 76.0, image: "images/bottomBar.png"


bottomBar.states =
	"shown": { y: Align.bottom }
	"hidden": { y: Align.bottom(140) }
bottomBar.stateSwitch("shown")


# contentView = new Layer
# 	parent: feedScroll.content
# 	width: 375.0
# 	height: 1868.0
# 	image: "images/content.jpg"


feedScroll.content.on "change:y", ->
	
	v = feedScroll.scrollY
	if v > 44
		# header.stateSwitch("shown")
		if @draggable.direction == "up" then scrollGuard.stateSwitch("hidden")
		else if @draggable.direction == "down" then scrollGuard.stateSwitch("shown")

	else
		# header.stateSwitch("hidden")
		scrollGuard.stateSwitch("shown")


scrollGuard = new Layer
	opacity: 0

scrollGuard.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 0 }

scrollGuard.on Events.StateSwitchEnd, (from, to) ->
	if from != to
		# print "ok"
		if to == "shown" then bottomBar.animate("shown")
		else bottomBar.animate("hidden")



headerImage = new Layer
	width: 375.0, height: 162.0, image: "images/header_image.png"



commentsView = () ->
	return new Layer
		width: 375.0, height: 88.0, image: "images/comments_view.png"

promptView = () ->
	return new Layer
		width: 375.0, height: 60.0, image: "images/prompt_view.png"

promptWithImageView = (imageData, handler = null, handlerSlider = null, slider = null) ->

	localView = new Layer
		width: 375.0, height: 60.0
		# image: "images/prompt_with_image_view.png"
		image: "images/prompt_mode.png"

	
	secondBox = new Button
		parent: localView
		width: 375 - 0, height: 60, x: 0, backgroundColor: null
		scaleTo: 1
		handler: handler
	
	childView = new Button
		parent: localView
		size: 32, borderRadius: 8
		x: Align.left(14), y:Align.center
		image: imageData.orig
		scaleTo: 1
		opacity: 0
		handler: handlerSlider
		custom:
			slider: slider
	
	return localView


titleView = () ->
	return new Layer
		width: 375.0, height: 56.0, image: "images/title_view.png"



Stack = require "Stack"

modeHandler = (event, layer) =>
		flow.open(animeView)

card_Slider = (currentData) ->
	cardHandler = (event, layer) =>
		localSlider = layer.custom.slider
		secondPage = layer.custom.slider.content.children[1]
		localSlider.snapToPage(secondPage)
	
	slider = getSlider(currentData)
	prompt = promptWithImageView(currentData, modeHandler, cardHandler, slider)
	return Stack.vertical([titleView(), slider, prompt, commentsView()], 0)

card_Movable = (currentData) ->
	return Stack.vertical([titleView(), getMovableImage(currentData), promptWithImageView(currentData, modeHandler), commentsView()], 0)

card_General = (currentData) ->
	return Stack.vertical([titleView(), getSimpleImage(currentData), promptView(), commentsView()], 0)


# cards = [
# 	headerImage,
# 	card_Slider(imagesForCards[0]),
# 	card_Movable(imagesForCards[1]),
# 	card_General(imagesForCards[2]),
# 	card_Slider(imagesForCards[3]),
# 	card_Movable(imagesForCards[4]),
# 	card_General(imagesForCards[5]),
# 	card_General(imagesForCards[6]),
# 	card_Movable(imagesForCards[7]),
# 	card_General(imagesForCards[8]),
# 	card_Slider(imagesForCards[9]),
# 	card_Slider(imagesForCards[10]),
# 	card_Movable(imagesForCards[11]),
# 	card_Movable(imagesForCards[12]),
# 	card_General(imagesForCards[13]),
# 	card_Slider(imagesForCards[14]),
# ]

cards = [
	headerImage,
	card_General(imagesForCards[0]),
	card_Slider(imagesForCards[1]),
	card_General(imagesForCards[2]),
	card_Slider(imagesForCards[3]),
	card_General(imagesForCards[4]),
	card_Slider(imagesForCards[5]),
]

feedContent = Stack.vertical(cards, 8)
feedContent.backgroundColor = "eee"
feedContent.parent = feedScroll.content


showFlags = []
for item in cards
	showFlags.push true

compareFocusFor = (currentIndex) ->
	if showFlags[currentIndex]
		showFlags[currentIndex] = false
		Utils.delay 1, ->
			cards[currentIndex].children[1].snapToPage(cards[currentIndex].children[1].content.children[1], false, { time: 1.0, curve: Spring(damping: 1) })
			cards[currentIndex].children[1].children[2].opacity = 0

feedScroll.content.on "change:y", ->
	v = feedScroll.scrollY

	focusPointY = feedScroll.screenFrame.y + feedScroll.screenFrame.height / 8 * 5
	
	if cards[2].screenFrame.y < focusPointY then compareFocusFor(2)
	if cards[4].screenFrame.y < focusPointY then compareFocusFor(4)
	if cards[6].screenFrame.y < focusPointY then compareFocusFor(6)
	
	# if cards[4].screenFrame.y < focusPointY
	# 	if showTestFlag4
	# 		showTestFlag4 = false
	# 		Utils.delay 1, ->
	# 			cards[4].children[1].snapToPage(cards[4].children[1].content.children[1], true, { time: 1.0, curve: Spring(damping: 1) })



animeView = flow.createView()

inputAnime = new Layer
	width: 375.0, height: 812.0, image: "images/input_anime.png"

animeView.add(inputAnime)