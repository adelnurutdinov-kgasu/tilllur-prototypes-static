
{ Preview } = require "PreviewComponent"
{ FlowView, NavigationView, ModalView } = require "NavigationComponent"
{ Button } = require "Buttons"

screen = new Layer { width: 375, height: 812 }
preview = new Preview { view: screen }

flow = new FlowView { parent: screen }

startView = new NavigationView
	parent: flow, backgroundColor: "white", showBack: false
	preventBackSwipe: true
	height: 812
	buttons:
		camera:
			x: Align.left(20), y: Align.top(328), size: 84, backgroundColor: null
			handler: () -> flow.transition(cameraView, cameraTransition)
		gpt:
			x: Align.right(-20), y: Align.top(244), size: 168, backgroundColor: null
			handler: () -> flow.open(gptView)
		attach:
			x: Align.left(22), y: Align.top(466), width: 64, height: 64, backgroundColor: null
			handler: () -> flow.open(startChooseImageView)
		search:
			x: Align.center, y: Align.top(466), width: 200, height: 64, backgroundColor: null
			handler: () -> flow.transition(searchEmptyView, searchTransition)


startView.onSwipeLeftStart ->
	flow.open(gptView)

startView.onSwipeRightStart ->
	flow.transition(cameraView, cameraTransition)


start = new Layer
	parent: startView.content
	width: 375.0, height: 1282.0, image: "images/start2.png"




cameraView = new NavigationView
	parent: flow, backgroundColor: "white"
	showBack: false, preventBackSwipe: true
	buttons:
		back:
			fixed: true
			width: 64, height: 64, x: Align.right(-4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.open(startView)
		capture:
			fixed: true
			width: 80, height: 80, x: Align.center, y: Align.bottom(-46), backgroundColor: null
			handler: () -> flow.open(cameraListView)
		choose:
			fixed: true
			width: 80, height: 80, x: Align.left, y: Align.bottom(-46), backgroundColor: null
			handler: () -> flow.open(chooseImagesView)

cameraView.onSwipeLeftStart ->
	flow.showPrevious()

camera = new Layer
	parent: cameraView
	width: 375.0, height: 812.0, image: "images/camera.png"







gptView = new NavigationView
	parent: flow, backgroundColor: "white"
	showBack: false
	buttons:
		input:
			fixed: true
			width: 200, height: 64, x: Align.center, y: Align.bottom(-38), backgroundColor: null
			handler: () -> flow.open(keyboardInputView)
		attach:
			fixed: true
			width: 88, height: 64, x: Align.left, y: Align.bottom(-38), backgroundColor: null
			handler: () -> flow.open(chooseImageWithCameraView)
		back:
			width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious()

gpt = new Layer
	parent: gptView.content
	width: 375.0, height: 812.0, image: "images/gpt.png"

gptBottom = new Layer
	parent: gptView
	width: 375.0, height: 106.0, image: "images/genericBottomStart.png"
	y: Align.bottom








# Choose Image View

startChooseImageView = new ModalView
	parent: flow
	width: 375, y: screen.height - 419, height: 419, borderRadius: 24
	backgroundColor: "white"

startChooseImage_Image = new Layer
	parent: startChooseImageView.content
	width: 375.0, height: 496.0, image: "images/choose image with camera.png"








# adsadasd



keyboardInputView = new ModalView
	parent: flow
	width: 375, y: screen.height - 419, height: 419
	buttons:
		input:
			width: 375-88, height: 80, x: Align.right, y: Align.top(11), backgroundColor: null
			handler: () ->
				flow.showPrevious()
				flow.open(modalItemView)
		image:
			width: 88, height: 80, x: Align.left, y: Align.top(11), backgroundColor: null
			handler: () ->
				flow.showPrevious()
				flow.open(chooseImageWithCameraView)


keyboardInputImage = new Layer
	parent: keyboardInputView
	width: 375.0, height: 419.0, image: "images/keyboard input done.png"







keyboardInputWithImageView = new ModalView
	parent: flow
	width: 375, y: screen.height - 419, height: 419
	buttons:
		attach:
			width: 300, height: 80, x: Align.right, y: Align.top(10), backgroundColor: null
			handler: () ->
				flow.showPrevious()
				flow.open(modalItemWithImage_View)

keyboardInputWithImage_Image = new Layer
	parent: keyboardInputWithImageView
	width: 375.0, height: 419.0, image: "images/keyboard input done image.png"









chooseImageWithCameraView = new ModalView
	parent: flow
	width: 375, y: screen.height - 419, height: 419, borderRadius: 24
	backgroundColor: "white"
	buttons:
		selectImage:
			width: 160, height: 160, x: Align.center, y: Align.top(100), backgroundColor: null
			handler: () ->
				flow.showPrevious()
				flow.open(keyboardInputWithImageView)

chooseImageWithCameraImage = new Layer
	parent: chooseImageWithCameraView.content
	width: 375.0, height: 496.0, image: "images/choose image with camera.png"











modalItemWithImage_View = new NavigationView
	parent: flow
	width: 375, height: screen.height, borderRadius: 42, backgroundColor: "white"
	showBack: false
	buttons:
		back:
			width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious()


modalItemWithImage_Image = new Layer
	parent: modalItemWithImage_View.content
	width: 375.0, height: 936.0, image: "images/modal deck image.png"

modalItemWithImage_Bottom = new Layer
	parent: modalItemWithImage_View
	width: 375.0, height: 106.0, image: "images/genericBottom.png"
	y: Align.bottom





modalItemView = new NavigationView
	parent: flow
	width: 375, height: screen.height, borderRadius: 42
	backgroundColor: "white"
	# showBack: false
	# contentInset:
		# bottom: 300
	# buttons:
	# 	back:
	# 		width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
	# 		handler: () -> flow.showPrevious()

modalItemImage = new Layer
	parent: modalItemView.content
	width: 375.0, height: 936.0, image: "images/modal deck.png"

modalItem_Bottom = new Layer
	parent: modalItemView
	width: 375.0, height: 106.0, image: "images/genericBottom.png"
	y: Align.bottom





modalCameraView = new ModalView
	parent: flow
	width: 375, y: 128, height: screen.height - 128, borderRadius: 42
	backgroundColor: "white"

modalCameraImage = new Layer
	parent: modalCameraView.content
	width: 375.0, height: 936.0, image: "images/modal head image.png"

modalCamera_Bottom = new Layer
	parent: modalCameraView
	width: 375.0, height: 106.0, image: "images/genericBottom.png"
	y: Align.bottom







cameraListView = new ModalView
	parent: flow
	width: 375, y: 128, height: screen.height - 128, borderRadius: 24
	backgroundColor: "white"
	buttons:
		input:
			fixed: true
			width: 375.0, height: 106.0, image: "images/genericBottom.png", y: Align.bottom
			scaleTo: 1
			handler: () ->
				flow.showPrevious()
				flow.open(cameraKeyboardView)

cameraListImage = new Layer
	parent: cameraListView.content
	width: 375.0, height: 1500.0, image: "images/modal head list.png"






cameraKeyboardView = new ModalView
	parent: flow
	width: 375, y: screen.height - 403, height: 403, borderRadius: 42
	backgroundColor: "white"
	buttons:
		button:
			fixed: true
			width: 300, height: 80, x: Align.right, y: Align.top(10), backgroundColor: null
			handler: () ->
				flow.showPrevious()
				flow.open(modalCameraView)

cameraKeyboardImage = new Layer
	parent: cameraKeyboardView
	width: 375.0, height: 403.0, image: "images/keyboard camera input.png"





chooseImagesView = new ModalView
	parent: flow
	width: 375, y: screen.height - 419, height: 419, borderRadius: 24
	backgroundColor: "black"

chooseImages_Image = new Layer
	parent: chooseImagesView.content
	width: 375.0, height: 496.0, image: "images/choose image only.png"



# Pre Init

# flow.open(startView, false)
# flow.open(gptView, false)



# Search

cameraTransition = (nav, layerA, layerB, overlay) ->
	transition =
		layerA:
			show: {x: 0, y: 0}
			hide: {x: layerA?.width / 2, y: 0}
		layerB:
			show: {x: 0, y: 0}
			hide: {x: -layerB.width, y: 0}
		overlay:
			show: {opacity: .9, x: 0, y: 0, size: nav.size}
			hide: {opacity: 0, x: 0, y: 0, size: nav.size}

searchTransition = (nav, layerA, layerB, overlay) ->
	transition =
		layerA:
			show: {x: 0, y: 0, opacity: 1}
			hide: {x: 0, y:  - layerA?.height / 4, opacity: 1}
		layerB:
			show: {x: 0, y: 0, opacity: 1}
			hide: {x: 0, y: layerB.height / 2 - 50, opacity: 0}




searchEmptyView = new NavigationView
	parent: flow
	showBack: false
	buttons:
		back:
			width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious()
		attach:
			x: Align.left(4), y: Align.top(427), width: 64, height: 64, backgroundColor: null
			handler: () -> flow.open(startChooseImageView)
		submit:
			x: Align.left, y: Align.bottom, width: 375, height: 320, backgroundColor: null
			handler: () -> flow.showNext(searchTypedView, animate: false)

searchEmptyView.onSwipeDownStart ->
	flow.showPrevious()

search20empty = new Layer
	parent: searchEmptyView
	width: 375.0, height: 812.0, image: "images/search empty.png"






searchTypedView = new NavigationView
	parent: flow
	showBack: false
	buttons:
		back:
			width: 64, height: 64, x: Align.left(12), y: Align.top(60), backgroundColor: null
			handler: () ->
				flow.showPrevious(animate: false)
				flow.showPrevious()
		clear:
			x: Align.right(-12), y: Align.top(60), width: 64, height: 64
			backgroundColor: null
			handler: () -> flow.showPrevious(animate: false)
		search_new:
			x: 16, y: 425, width: 165.66666666666666, height: 53.0, image: "images/button new.png"
			handler: () -> flow.open(searchResultsModern)
		search_old:
			x: Align.right(-16), y: 425, width: 165.66666666666666, height: 55.0, image: "images/button old.png"
			handler: () -> flow.open(searchResults)

search20typed = new Layer
	parent: searchTypedView
	width: 375.0, height: 812.0, image: "images/search typed.png"





# Search Classic

searchResults = new NavigationView
	parent: flow
	backgroundColor: "white"
	buttons:
		open:
			width: 375, height: 160, y: Align.top(520), backgroundColor: null
			handler: () -> flow.open(siteView)

search20classic = new Layer
	parent: searchResults.content
	width: 375.0, height: 1208.0, image: "images/search classic.png"





searchResultsModern = new NavigationView
	parent: flow
	backgroundColor: "white"

search20modern = new Layer
	parent: searchResultsModern
	width: 375.0, height: 936.0, image: "images/search modern.png"

searchResultsModern_BottomButton = new Button
	parent: searchResultsModern
	width: 375.0, height: 106.0, image: "images/genericBottom.png"
	y: Align.bottom
	scaleTo: 1



siteView = new NavigationView
	parent: flow
	backgroundColor: "white"
	showBack: false

siteView_BackButton = new Button
	parent: siteView
	width: 64, height: 64, x: Align.left(4), y: Align.bottom(-28)
	backgroundColor: null
	handler: () -> flow.showPrevious()



dtf = new Layer
	parent: siteView
	width: 375.0, height: 812.0, image: "images/dtf.png"

siteBar = new Layer
	parent: siteView
	width: 375.0, height: 86.0, image: "images/siteBar.png", y: Align.bottom

selectButton =new Button
	parent: siteView
	width: 200, height: 86, x: Align.center, y: Align.bottom(-28)
	backgroundColor: null
	handler: () -> flow.showNext(siteView_SelectView, animate: false)





siteView_SelectView = new NavigationView
	parent: flow
	width: 375, height: 812
	preventBackSwipe: true
	showBack: false
	buttons:
		back:
			width: 375, height: 600, y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious(animate: false)
		next:
			width: 200, height: 86, x: Align.center, y: Align.bottom(-28), backgroundColor: null
			handler: () -> flow.open(siteView_Modal)

dtf20more = new Layer
	parent: siteView_SelectView
	width: 375.0, height: 812.0, image: "images/dtf more.png"





siteView_Modal = new ModalView
	parent: flow
	width: 375, height: screen.height - 160, y: 160, borderRadius: 24
	backgroundColor: "white"

dtf20modal = new Layer
	parent: siteView_Modal.content
	width: 375.0, height: 1177.0, image: "images/dtf modal.png"

siteView_Modal_Bottom = new Layer
	parent: siteView_Modal
	width: 375.0, height: 106.0, image: "images/genericBottom.png"
	y: Align.bottom


# flow.open(siteView)

{ LogView } = require "LogView"
new LogView { node: flow }