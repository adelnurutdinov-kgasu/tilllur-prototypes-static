
{ Preview } = require "PreviewComponent"
{ FlowView, NavigationView, ModalView } = require "NavigationComponent"
{ Button } = require "Buttons"

screen = new Layer { width: 375, height: 812 }
preview = new Preview { view: screen }

flow = new FlowView { parent: screen }
homeView = new NavigationView { parent: flow, backgroundColor: "eee", showBack: false }

updatePosition = (layerArray, sum = 0, gap = 8) ->
	for item in layerArray
		item.y = sum
		sum += item.height + gap

headerStart = new Layer
	parent: homeView.content
	width: 375.0, height: 178.0, image: "images/headerStart.png"




postNY = new Layer
	parent: homeView.content
	width: 375.0, height: 519.0, image: "images/Post NY.png"
	opacity: 0

postNY_imageView = new Layer
	parent: postNY
	size: 363
	x: Align.center, y: 56
	borderRadius: 12
	image: "images/image01.png"
	backgroundColor: "eee"

postNY_imageView.states =
	"init": { image: "images/image01.png" }
	"load": { image: "images/image02.png" }
	"done": { image: "images/image03.png" }

postNY_imageView.stateSwitch("init")

postNY_imageView.onTouchStart ->
	postNY_imageView.image = "images/image03.png"
	modeButton.opacity = 0.5

postNY_imageView.onTouchEnd ->
	postNY_imageView.image = "images/image01.png"
	modeButton.opacity = 1.0

modeButton = new Layer
	parent: postNY_imageView
	width: 117.0, height: 58.0, image: "images/mode temp button.png"
	x: Align.right, y: Align.bottom






messagePromo = new Layer
	parent: homeView.content
	width: 375.0, height: 216.0, image: "images/messagePromo.png"

post201 = new Layer
	parent: homeView.content
	width: 375.0, height: 567.0, image: "images/Post 1.png"

post202 = new Layer
	parent: homeView.content
	width: 375.0, height: 567.0, image: "images/Post 2.png"

updatePosition([headerStart, messagePromo, post201, post202])
homeView.updateContent()

bottomBar = new Button
	parent: homeView
	width: 375.0, height: 80.0, image: "images/bottomBar.png"
	y: Align.bottom
	scaleTo: 1
	handler: () -> flow.open(createModal)




createModal = new ModalView { parent: flow, backgroundColor: "eee", y: 812-272, borderRadius: 40 }

createModalImage = new Button
	parent: createModal
	width: 375.0, height: 272.0, image: "images/createModal.png"
	scaleTo: 1
	handler: () ->
		flow.showPrevious()
		flow.open(createView)



createView = new NavigationView { parent: flow }

inputView = new Layer
	parent: createView
	width: 375.0, height: 812.0, image: "images/input.png"

input01 = new Button
	parent: inputView
	width: 375.0, height: 240.0, image: "images/input01.png"
	y: 194
	scaleTo: 1
	handler: () -> try input02.opacity = 1

input02 = new Layer
	parent: input01
	width: 375.0, height: 240.0, image: "images/input02.png"
	opacity: 0

nextButton = new Button
	parent: createView
	width: 200, height: 64
	x: Align.right, y: Align.bottom(-32)
	scaleTo: 1
	opacity: 0
	handler: () -> flow.open(resultView)





resultView = new NavigationView
	parent: flow, backgroundColor: "white"
	contentInset:
		bottom: 120

outputImage = new Layer
	parent: resultView.content
	width: 375.0, height: 812.0
	backgroundColor: "white"
	# image: "images/output.png"

backImageView = new Layer
	parent: outputImage
	size: 363
	x: Align.center, y: 163
	borderRadius: 12
	image: "images/image01.png"
	backgroundColor: "eee"

imageView = new Layer
	parent: outputImage
	size: 363
	x: Align.center, y: 163
	borderRadius: 12
	image: "images/image03.png"
	backgroundColor: "eee"

imageView.states =
	"init": { opacity: 0 }
	"done": { opacity: 1 }

imageView.stateSwitch("done")

# imageView.on Events.StateSwitchStart, (from, to) ->
# 	if to == "init"
# 		if !resultView.content.draggable.isMoving

imageView.onTouchStart ->
	if publishToggleView_Success.opacity == 1 and !resultView.content.draggable.isMoving
		imageView.stateSwitch("init")

imageView.onTouchEnd ->
	if publishToggleView_Success.opacity == 1
		imageView.stateSwitch("done")

resultView.content.onSwipeStart ->
	imageView.stateSwitch("done")

resultView.content.onSwipe ->
	imageView.stateSwitch("done")


Framer.Extras.Preloader.addImage("images/image02.png")
Framer.Extras.Preloader.addImage("images/image03.png")


publishToggleView = new Button
	parent: outputImage
	width: 375.0, height: 63.0, image: "images/Publish Toggle View.png"
	y: Align.top(100)
	scaleTo: 1
	handler: () ->

		if imageView.states.current.name == "done"
			publishToggleView_Success.opacity = 0
			imageView.animate("init")
			promptTag.animate("init")
			messageView.animate("init")
			resultView.updateContent()

		else
			publishToggleView_Success.opacity = 1
			imageView.stateSwitch("done")
			promptTag.stateSwitch("done")
			messageView.animate("done")
			resultView.updateContent()

publishToggleView_Success = new Layer
	parent: publishToggleView
	width: 375.0, height: 63.0, image: "images/Publish Toggle View Success.png"
	opacity: 1


publishButton = new Button
	parent: outputImage
	width: 200, height: 64
	x: Align.right, y: Align.bottom(-32)
	scaleTo: 1
	opacity: 0
	handler: () ->
		postNY.opacity = 1
		messagePromo.opacity = 0
		updatePosition([headerStart, postNY, post201, post202])
		homeView.updateContent()
		homeView.scrollToTop()

		flow.showPrevious()
		flow.showPrevious()
		Utils.delay 0.5, ->
			flow.open(pushModal)


messageView = new Layer
	parent: outputImage
	width: 375.0, height: 100.0, image: "images/asdasd.png"
	y: Align.top(526)
	opacity: 1

messageView.states =
	"init": { opacity: 0 }
	"done": { opacity: 1 }

messageView.onTouchStart ->
	if publishToggleView_Success.opacity == 1
		imageView.stateSwitch("init")

messageView.onTouchEnd ->
	if publishToggleView_Success.opacity == 1
		imageView.stateSwitch("done")


bottomPublishView = new Layer
	parent: resultView
	width: 375.0, height: 96.0, image: "images/bottomPublishView.png"
	y: Align.bottom


tempHeaderView = new Layer
	parent: resultView
	width: 375.0, height: 100.0, image: "images/tempHeaderView.png"



promptTag = new Layer
	parent: outputImage
	width: 375.0, height: 185.0, image: "images/promptTag.png"

promptTag.states =
	"init": { y: 531 }
	"done": { y: 626 }
promptTag.stateSwitch("done")






pushModal = new ModalView { parent: flow, backgroundColor: "eee", y: 812-316, borderRadius: 40 }

pushModalImage = new Layer
	parent: pushModal
	width: 375.0, height: 316.0, image: "images/pushModal.png"

pushModal_closeButton = new Button
	parent: pushModalImage
	size: 80, x: Align.right, y: Align.top
	opacity: 0
	handler: () -> flow.showPrevious()

pushModal_allowButton = new Button
	parent: pushModalImage
	width: 375, height: 100, y: Align.bottom(-32)
	opacity: 0
	handler: () ->
		flow.showPrevious()
		flow.showOverlayCenter(systemModalImage, animate: false)


systemModal = new ModalView { parent: flow, backgroundColor: "null", y: 0, borderRadius: 40 }

systemModalImage = new Button
	parent: systemModal
	width: 375.0, height: 812.0, image: "images/systemModal.png"
	handler: () -> flow.showPrevious(animate: false)



# flow.showNext(resultView, false)
# flow.open(systemModal)