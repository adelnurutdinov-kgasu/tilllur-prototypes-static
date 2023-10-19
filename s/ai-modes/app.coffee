
screenGuard = new Layer
	name: "screenGuard"
	opacity: 0
	x: -2000


{ Preview } = require "PreviewComponent"
{ CameraLayer } = require "CameraLayer"
{ Button } = require "Buttons"
{ NavigationComponent } = require "NavigationComponent"
Stack = require "Stack"

screen = new Layer { width: 375, height: 812 }

preview = new Preview { view: screen, showHints: false }
if !Utils.isMobile() then preview.statusBar.backgroundColor = "white"

flow = new NavigationComponent
	parent: screen
	width: screen.width
	height: screen.height




startView = flow.createView("white")

startImage = new Layer
	parent: startView
	width: 375.0
	height: 812.0
	image: "images/start.png"

startView.add(startImage)

createButton = new Button
	parent: startImage
	width: 95.0, height: 48.0
	x: Align.center, y: Align.bottom(-28)
	image: "images/createButtonRound.png"
	backgroundColor: "white"
	handler: () -> flow.open(createModal)




createModal = flow.createModal("white", 812-302, 42)

createView_Image = new Layer
	width: 375.0
	height: 302.0
	image: "images/createModalView2.png"

createModal.add(createView_Image)


createViewButton_Create = new Button
	parent: createView_Image
	width: 253.0, height: 70.0
	x: Align.left(20), y: Align.bottom(-44)
	image: "images/createButton.png"
	handler: () ->
		flow.showPrevious()
		flow.open(inputView)

createViewButton_Camera = new Button
	parent: createView_Image
	width: 70.0, height: 70.0
	x: Align.right(-20), y: Align.bottom(-44)
	image: "images/cameraButton.png"
	handler: () ->
		flow.showPrevious()
		flow.open(choosePhotoView)


createView_ButtonAnime = new Button
	parent: createView_Image
	size: 140, backgroundColor: null
	x: Align.left(20), y: Align.bottom(-146)
	handler: () ->
		flow.showPrevious()
		flow.open(chooseAnimeView)


createView_ButtonBarbie = new Button
	parent: createView_Image
	size: 140, backgroundColor: null
	x: Align.left(163), y: Align.bottom(-146)
	handler: () ->
		flow.showPrevious()
		flow.open(chooseBarbieView)




inputView = flow.createView()

zeroView = new Layer
	width: 375.0
	height: 812.0
	image: "images/zeroView.png"

inputView.add(zeroView)


inputView_ButtonCrop = new Button
	parent: zeroView
	size: 44, backgroundColor: null
	x: Align.left(68), y: Align.bottom(-38)
	handler: () -> flow.open(inputCropView)

inputView_ButtonSettings = new Button
	parent: zeroView
	size: 44, backgroundColor: null
	x: Align.right(-16), y: Align.top(50)
	handler: () -> flow.open(inputSettingsView)

inputView_ButtonNext = new Button
	parent: zeroView
	width: 150, height: 44, backgroundColor: null
	x: Align.right(-16), y: Align.bottom(-38)
	handler: () -> flow.open(publishView)









choosePhotoView = flow.createView()

chooseView = new Layer
	width: 375.0
	height: 812.0
	image: "images/chooseView.png"

chooseViewButton = new Button
	parent: chooseView
	width: 375, height: 812 - 100
	y: 100, backgroundColor: null
	handler: () -> flow.open(inputWithImageView)

choosePhotoView.add(chooseView)




inputWithImageView = flow.createView()

inputWithImage = new Layer
	width: 375.0
	height: 812.0
	image: "images/inputWithImage.png"

inputWithImageView.add(inputWithImage)

createWithImageButton_changePhoto = new Button
	parent: inputWithImage
	size: 44, backgroundColor: null
	x: Align.left(16), y: Align.bottom(-38)
	handler: () -> flow.showPrevious()

createWithImageButton_Next = new Button
	parent: inputWithImage
	width: 200, height: 44, backgroundColor: null
	x: Align.right(-20), y: Align.bottom(-38)
	handler: () -> flow.open(publishWithImageView)



publishWithImageView = flow.createView()

publishWithImage_Image = new Layer
	width: 375.0
	height: 812.0
	image: "images/publishWithImage.png"

publishWithImageView.add(publishWithImage_Image)

publishWithImageView_ButtonNext = new Button
	parent: publishWithImage_Image
	width: 150, height: 44, backgroundColor: null
	x: Align.right(-16), y: Align.bottom(-38)
	handler: () ->
		flow.showPrevious()
		flow.showPrevious()
		flow.showPrevious()









inputCropView = flow.createModal("white", 812-361.0, 42)
inputSettingsView = flow.createModal("white", 812-557, 42)

aspectRatio_Image = new Layer
	width: 375.0
	height: 361.0
	image: "images/aspectRatio_Image.png"

settings_Image = new Layer
	width: 375.0
	height: 557.0
	image: "images/settings_Image.png"


inputSettingsView.add(settings_Image)
inputCropView.add(aspectRatio_Image)




publishView = flow.createView()

publishView_Image = new Layer
	width: 375.0
	height: 812.0
	image: "images/publishView.png"

publishView.add(publishView_Image)

publishButton_Tag = new Button
	parent: publishView_Image
	size: 44, backgroundColor: null
	x: Align.left(16), y: Align.bottom(-38)
	handler: () -> flow.open(tagModal)

publishButton_Filter = new Button
	parent: publishView_Image
	size: 44, backgroundColor: null
	x: Align.left(68), y: Align.bottom(-38)
	handler: () -> flow.open(filterModal)

publishButton_Music = new Button
	parent: publishView_Image
	size: 44, backgroundColor: null
	x: Align.left(120), y: Align.bottom(-38)
	handler: () -> flow.open(musicModal)

publishView_ButtonNext = new Button
	parent: publishView_Image
	width: 150, height: 44, backgroundColor: null
	x: Align.right(-16), y: Align.bottom(-38)
	handler: () ->
		flow.showPrevious()
		flow.showPrevious()





filterModal = flow.createModal("white", 812-743, 42)
musicModal = flow.createModal("white", 812-743, 42)
tagModal = flow.createModal("white", 812-743, 42)

filterView = new Layer
	width: 375.0
	height: 743.0
	image: "images/filterView.png"

musicView = new Layer
	width: 375.0
	height: 743.0
	image: "images/musicView.png"

tagView = new Layer
	width: 375.0
	height: 743.0
	image: "images/tagView.png"

filterModal.add(filterView)
musicModal.add(musicView)
tagModal.add(tagView)
















chooseAnimeView = flow.createView()

chooseAnimeView_Image = new Layer
	width: 375.0, height: 812.0
	image: "images/chooseView.png"

chooseAnimeView_ButtonNext = new Button
	parent: chooseAnimeView_Image
	width: 375, height: 812 - 100
	y: 100, backgroundColor: null
	handler: () -> flow.open(animeView)

chooseAnimeView.add(chooseAnimeView_Image)




chooseBarbieView = flow.createView()

chooseBarbieView_Image = new Layer
	width: 375.0
	height: 812.0
	image: "images/chooseView.png"

chooseBarbieView_ButtonNext = new Button
	parent: chooseBarbieView_Image
	width: 375, height: 812 - 100
	y: 100, backgroundColor: null
	handler: () -> flow.open(barbieView)

chooseBarbieView.add(chooseBarbieView_Image)





animeView = flow.createView()
barbieView = flow.createView()

animeView_Image = new Layer
	width: 375.0, height: 812.0
	image: "images/animeView.png"

barbieView_Image = new Layer
	width: 375.0, height: 812.0
	image: "images/barbieView.png"

animeView.add(animeView_Image)
barbieView.add(barbieView_Image)


animeView_ButtonNext = new Button
	parent: animeView_Image
	width: 150, height: 44, backgroundColor: null
	x: Align.right(-16), y: Align.bottom(-38)
	handler: () ->
		flow.showPrevious()
		flow.showPrevious()
		flow.showPrevious()

barbieView_ButtonNext = new Button
	parent: barbieView_Image
	width: 150, height: 44, backgroundColor: null
	x: Align.right(-16), y: Align.bottom(-38)
	handler: () ->
		flow.showPrevious()
		flow.showPrevious()
		flow.showPrevious()