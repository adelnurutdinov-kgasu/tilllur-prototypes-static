
{ Preview } = require "PreviewComponent"
{ NavigationComponent } = require "NavigationComponent"
{ Button } = require "Buttons"

screen = new Layer { width: 375, height: 812 }
preview = new Preview { view: screen, showUI: false, showHints: false }

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
		scrollHorizontal: true
		directionLock: true
	
	image1 = new Layer
		parent: slider.content
		size: 375
		image: imageData.new

	image1 = new Layer
		parent: slider.content
		size: 375, x: 375
		image: imageData.orig
	
	text = new TextLayer
		parent: slider
		width: 54
		fontSize: 13, fontWeight: 700
		color: "white", textAlign: "center"
		backgroundColor: "rgba(0,0,0,0.3)"
		text: "1 из 2"
		borderRadius: 100
		x: Align.right(-14), y: Align.top(14)
		padding: 7


	slider.on "change:currentPage", ->
		if @currentPage == @content.children[0]
			@children[1].text = "1 из 2"
		else
			@children[1].text = "2 из 2"

	
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
		width: 375.0, height: 60.0, image: "images/prompt_with_image_view.png"
		
	
	secondBox = new Button
		parent: localView
		width: 375 - 56, height: 60, x: 56, backgroundColor: null
		scaleTo: 1
		handler: handler
	
	childView = new Button
		parent: localView
		size: 32, borderRadius: 8
		x: Align.left(14), y:Align.center
		image: imageData.orig
		scaleTo: 1
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
	card = Stack.vertical([titleView(), slider, prompt, commentsView()], 0)

card_Movable = (currentData) ->
	return Stack.vertical([titleView(), getMovableImage(currentData), promptWithImageView(currentData, modeHandler), commentsView()], 0)

card_General = (currentData) ->
	return Stack.vertical([titleView(), getSimpleImage(currentData), promptView(), commentsView()], 0)


cards = [
	headerImage,
	card_Slider(imagesForCards[0]),
	card_Movable(imagesForCards[1]),
	card_General(imagesForCards[2]),
	card_Slider(imagesForCards[3]),
	card_Movable(imagesForCards[4]),
	card_General(imagesForCards[5]),
	card_General(imagesForCards[6]),
	card_Movable(imagesForCards[7]),
	card_General(imagesForCards[8]),
	card_Slider(imagesForCards[9]),
	card_Slider(imagesForCards[10]),
	card_Movable(imagesForCards[11]),
	card_Movable(imagesForCards[12]),
	card_General(imagesForCards[13]),
	card_Slider(imagesForCards[14]),

]

feedContent = Stack.vertical(cards, 8)
feedContent.backgroundColor = "eee"
feedContent.parent = feedScroll.content



animeView = flow.createView()

inputAnime = new Layer
	width: 375.0, height: 812.0, image: "images/input_anime.png"

animeView.add(inputAnime)