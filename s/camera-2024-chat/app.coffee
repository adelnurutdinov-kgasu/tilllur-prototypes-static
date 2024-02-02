
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

cameraView = new NavigationView { parent: flow, backgroundColor: "white", showBack: false, preventBackSwipe: true }
gptView = new NavigationView { parent: flow, backgroundColor: "white", showBack: false }



# # Start Page

start = new Layer
	parent: startView.content
	# width: 375.0, height: 812.0, image: "images/start.png"
	width: 375.0, height: 1282.0, image: "images/start2.png"


start.onSwipeLeftStart ->
	flow.open(gptView)

start.onSwipeRightStart ->
	flow.transition(cameraView, cameraTransition)

camera20button = new Button
	parent: startView
	# x: 28, y: 407
	# width: 153.66666666666666, height: 52.0, image: "images/camera button.png"
	x: Align.left(20), y: Align.top(328), size: 84, backgroundColor: null
	handler: () -> flow.transition(cameraView, cameraTransition)

gpt20button = new Button
	parent: startView
	# x: Align.right(-28), y: 407
	# width: 153.66666666666666, height: 52.0, image: "images/gpt button.png"
	x: Align.right(-20), y: Align.top(244), size: 168, backgroundColor: null
	handler: () -> flow.open(gptView)

startAttachButton = new Button
	parent: startView
	x: Align.left(22), y: Align.top(466), width: 64, height: 64
	backgroundColor: null
	handler: () -> flow.open(startChooseImageView)


startSearchButton = new Button
	parent: startView
	x: Align.center, y: Align.top(466), width: 200, height: 64
	backgroundColor: null
	handler: () -> flow.transition(searchEmptyView, searchTransition)




# Choose Image View

startChooseImageView = new ModalView
	parent: flow
	width: 375, y: screen.height - 419, height: 419, borderRadius: 24
	backgroundColor: "white"

startChooseImage_Image = new Layer
	parent: startChooseImageView.content
	width: 375.0, height: 496.0, image: "images/choose image with camera.png"






# GPT View

gpt = new Layer
	parent: gptView.content
	width: 375.0, height: 812.0, image: "images/gpt.png"

gptBottom = new Layer
	parent: gptView
	width: 375.0, height: 106.0, image: "images/genericBottomStart.png"
	y: Align.bottom

gptInputButton = new Button
	parent: gpt
	width: 200, height: 64, x: Align.center, y: Align.bottom(-38)
	backgroundColor: null
	handler: () -> flow.open(keyboardInputView)

gptImageButton = new Button
	parent: gpt
	width: 88, height: 64, x: Align.left, y: Align.bottom(-38)
	backgroundColor: null
	handler: () -> flow.open(chooseImageWithCameraView)

gptBackButton = new Button
	parent: gptView
	width: 64, height: 64, x: Align.left(4), y: Align.top(48)
	backgroundColor: null
	handler: () -> flow.showPrevious()





keyboardInputView = new ModalView
	parent: flow
	width: 375, y: screen.height - 419, height: 419

keyboardInputImage = new Layer
	parent: keyboardInputView
	width: 375.0, height: 419.0, image: "images/keyboard input done.png"

keyboardInputButton = new Button
	parent: keyboardInputImage
	width: 200, height: 80, x: Align.center, y: Align.top(10)
	backgroundColor: null
	handler: () ->
		flow.showPrevious()
		flow.open(modalItemView)

keyboardImageButton = new Button
	parent: keyboardInputImage
	width: 88, height: 80, x: Align.left, y: Align.top(10)
	backgroundColor: null
	handler: () ->
		flow.showPrevious()
		flow.open(chooseImageWithCameraView)

keyboardSubmitButton = new Button
	parent: keyboardInputImage
	width: 88, height: 80, x: Align.right, y: Align.top(10)
	backgroundColor: null
	handler: () ->
		flow.showPrevious()
		flow.open(modalItemView)





keyboardInputWithImageView = new ModalView
	parent: flow
	width: 375, y: screen.height - 419, height: 419

keyboardInputWithImage_Image = new Layer
	parent: keyboardInputWithImageView
	width: 375.0, height: 419.0, image: "images/keyboard input done image.png"

keyboardInputWithImage_Button = new Button
	parent: keyboardInputWithImageView
	width: 300, height: 80, x: Align.right, y: Align.top(10)
	backgroundColor: null
	handler: () ->
		flow.showPrevious()
		flow.open(modalItemWithImage_View)







chooseImageWithCameraView = new ModalView
	parent: flow
	width: 375, y: screen.height - 419, height: 419, borderRadius: 24
	backgroundColor: "white"

chooseImageWithCameraImage = new Layer
	parent: chooseImageWithCameraView.content
	width: 375.0, height: 496.0, image: "images/choose image with camera.png"

chooseImageWithCamera_selectImageButton = new Button
	parent: chooseImageWithCameraView.content
	width: 160, height: 160, x: Align.center, y: Align.top(100)
	backgroundColor: null
	handler: () ->
		flow.showPrevious()
		flow.open(keyboardInputWithImageView)









modalItemWithImage_View = new NavigationView
	parent: flow
	width: 375, height: screen.height, borderRadius: 42
	backgroundColor: "white"
	showBack: false

modalItemWithImage_Image = new Layer
	parent: modalItemWithImage_View.content
	width: 375.0, height: 936.0, image: "images/modal deck image.png"

modalItemWithImage_Bottom = new Layer
	parent: modalItemWithImage_View
	width: 375.0, height: 106.0, image: "images/genericBottom.png"
	y: Align.bottom

modalItemWithImage_BackButton = new Button
	parent: modalItemWithImage_View
	width: 64, height: 64, x: Align.left(4), y: Align.top(48)
	backgroundColor: null
	handler: () -> flow.showPrevious()




modalItemView = new NavigationView
	parent: flow
	width: 375, height: screen.height, borderRadius: 42
	backgroundColor: "white"
	showBack: false
	contentInset:
		bottom: 300

modalItemImage = new Layer
	parent: modalItemView.content
	width: 375.0, height: 936.0, image: "images/modal deck.png"

modalItem_Bottom = new Layer
	parent: modalItemView
	width: 375.0, height: 106.0, image: "images/genericBottom.png"
	y: Align.bottom

modalItemView_BackButton = new Button
	parent: modalItemView
	width: 64, height: 64, x: Align.left(4), y: Align.top(48)
	backgroundColor: null
	handler: () -> flow.showPrevious()



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





# Camera Code

camera = new Layer
	parent: cameraView
	width: 375.0, height: 812.0, image: "images/camera.png"

cameraBackButton = new Button
	parent: cameraView
	width: 64, height: 64, x: Align.right(-4), y: Align.top(48)
	backgroundColor: null
	handler: () -> flow.open(startView)

camera.onSwipeLeftStart ->
	flow.showPrevious()

cameraShootButton = new Button
	parent: cameraView
	width: 80, height: 80, x: Align.center, y: Align.bottom(-46)
	backgroundColor: null
	handler: () -> flow.open(cameraListView)

cameraChooseButton = new Button
	parent: cameraView
	width: 80, height: 80, x: Align.left, y: Align.bottom(-46)
	backgroundColor: null
	handler: () ->
		flow.open(chooseImagesView)



cameraListView = new ModalView
	parent: flow
	width: 375, y: 128, height: screen.height - 128, borderRadius: 24
	backgroundColor: "white"

cameraListImage = new Layer
	parent: cameraListView.content
	width: 375.0, height: 1500.0, image: "images/modal head list.png"

cameraListView_Bottom = new Button
	parent: cameraListView
	width: 375.0, height: 106.0, image: "images/genericBottom.png"
	y: Align.bottom
	scaleTo: 1
	handler: () ->
		flow.showPrevious()
		flow.open(cameraKeyboardView)


cameraKeyboardView = new ModalView
	parent: flow
	width: 375, y: screen.height - 403, height: 403, borderRadius: 42
	backgroundColor: "white"

cameraKeyboardImage = new Layer
	parent: cameraKeyboardView
	width: 375.0, height: 403.0, image: "images/keyboard camera input.png"

cameraKeyboardButton = new Button
	parent: cameraKeyboardView
	width: 300, height: 80, x: Align.right, y: Align.top(10)
	backgroundColor: null
	handler: () ->
		flow.showPrevious()
		flow.open(modalCameraView)



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

searchEmptyView.onSwipeDownStart ->
	flow.showPrevious()

search20empty = new Layer
	parent: searchEmptyView
	width: 375.0, height: 812.0, image: "images/search empty.png"

searchEmptyView_BackButton = new Button
	parent: searchEmptyView
	width: 64, height: 64, x: Align.left(4), y: Align.top(48)
	backgroundColor: null
	handler: () -> flow.showPrevious()


searchEmptyView_AttachButton = new Button
	parent: searchEmptyView
	x: Align.left(4), y: Align.top(427), width: 64, height: 64
	backgroundColor: null
	handler: () -> flow.open(startChooseImageView)

searchEmptyView_keyboard =new Button
	parent: searchEmptyView
	x: Align.left, y: Align.bottom, width: 375, height: 320
	backgroundColor: null
	handler: () -> flow.showNext(searchTypedView, animate: false)




searchTypedView = new NavigationView
	parent: flow
	showBack: false
	
search20typed = new Layer
	parent: searchTypedView
	width: 375.0, height: 812.0, image: "images/search typed.png"

searchTypedView_BackButton = new Button
	parent: searchTypedView
	width: 64, height: 64, x: Align.left(12), y: Align.top(60)
	backgroundColor: null
	handler: () ->
		flow.showPrevious(animate: false)
		flow.showPrevious()

searchTypedView_ClearButton =new Button
	parent: searchTypedView
	x: Align.right(-12), y: Align.top(60), width: 64, height: 64
	backgroundColor: null
	handler: () -> flow.showPrevious(animate: false)


button20new = new Button
	parent: searchTypedView
	x: 16, y: 425
	width: 165.66666666666666, height: 53.0, image: "images/button new.png"
	handler: () -> flow.open(searchResultsModern)

button20old = new Button
	parent: searchTypedView
	x: Align.right(-16), y: 425
	width: 165.66666666666666, height: 55.0, image: "images/button old.png"
	handler: () -> flow.open(searchResults)




# Search Classic

searchResults = new NavigationView
	parent: flow
	backgroundColor: "white"

search20classic = new Layer
	parent: searchResults.content
	width: 375.0, height: 1208.0, image: "images/search classic.png"

searchResults_OpenButton = new Button
	parent: searchResults
	width: 375, height: 160, y: Align.top(520)
	backgroundColor: null
	handler: () -> flow.open(siteView)



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
	# handler: () -> flow.open(dtf20more)


dtf20more = new Layer
	parent: siteView_SelectView
	width: 375.0, height: 812.0, image: "images/dtf more.png"

siteView_SelectView_BackButton = new Button
	parent: siteView_SelectView
	width: 375, height: 600, y: Align.top(48)
	backgroundColor: null
	handler: () -> flow.showPrevious(animate: false)

siteView_SelectView_Next =new Button
	parent: siteView_SelectView
	width: 200, height: 86, x: Align.center, y: Align.bottom(-28)
	backgroundColor: null
	handler: () -> flow.open(siteView_Modal)




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


flow.open(siteView)