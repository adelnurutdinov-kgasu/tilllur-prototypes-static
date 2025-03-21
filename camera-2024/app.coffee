
{ Preview } = require "PreviewComponent"
{ FlowView, NavigationView, ModalView } = require "NavigationComponent"
{ Button } = require "Buttons"

screen = new Layer { width: 375, height: 812 }
preview = new Preview { view: screen }

flow = new FlowView { parent: screen }

cameraView = new NavigationView { parent: flow, backgroundColor: "white", showBack: false }
startView = new NavigationView { parent: flow, backgroundColor: "white", showBack: false }
gptView = new NavigationView { parent: flow, backgroundColor: "white", showBack: false }



# Start Page

start = new Layer
	parent: startView
	width: 375.0, height: 812.0, image: "images/start.png"

start.onSwipeLeft ->
	flow.open(gptView)

camera20button = new Button
	parent: startView
	x: 28, y: 407
	width: 153.66666666666666, height: 52.0, image: "images/camera button.png"
	handler: () -> flow.showPrevious()

gpt20button = new Button
	parent: startView
	x: Align.right(-28), y: 407
	width: 153.66666666666666, height: 52.0, image: "images/gpt button.png"
	handler: () -> flow.open(gptView)

startAttachButton = new Button
	parent: startView
	x: Align.left(22), y: Align.top(327), width: 64, height: 64
	backgroundColor: null
	handler: () -> flow.open(startChooseImageView)



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
	parent: gptView
	width: 375.0, height: 812.0, image: "images/gpt.png"

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









modalItemWithImage_View = new ModalView
	parent: flow
	width: 375, y: 88, height: screen.height - 88, borderRadius: 42
	backgroundColor: "white"

modalItemWithImage_Image = new Layer
	parent: modalItemWithImage_View.content
	width: 375.0, height: 1096.0, image: "images/modal deck image.png"

modalItemWithImage_Bottom = new Layer
	parent: modalItemWithImage_View
	width: 375.0, height: 106.0, image: "images/genericBottom.png"
	y: Align.bottom




modalItemView = new ModalView
	parent: flow
	width: 375, y: 88, height: screen.height - 88, borderRadius: 42
	backgroundColor: "white"

modalItemImage = new Layer
	parent: modalItemView.content
	width: 375.0, height: 1088.0, image: "images/modal deck.png"

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
	width: 375.0, height: 776.0, image: "images/modal head image.png"

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

camera.onSwipeLeft ->
	flow.open(startView)

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
	width: 375, y: 389, height: screen.height - 389, borderRadius: 24
	backgroundColor: "white"

cameraListImage = new Layer
	parent: cameraListView.content
	width: 375.0, height: 1330.0, image: "images/modal head list.png"

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

flow.open(startView, false)
# flow.open(gptView, false)