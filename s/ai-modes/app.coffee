
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
# if !Utils.isMobile() then preview.statusBar.backgroundColor = "white"

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

tempFix = new Layer
	parent: startImage
	width: 375, height: 44
	backgroundColor: "white"

startView.add(startImage)

createButton = new Button
	parent: startImage
	width: 95.0, height: 48.0
	x: Align.center, y: Align.bottom(-28)
	image: "images/createButtonRound.png"
	backgroundColor: "white"
	handler: () -> flow.open(createModal)



M_withImage = false
M_toysMode = false

createModal = flow.createModal("white", 812-380, 42)
CV_ModalView = require "CV_ModalView"

CV_MV_CreateHandler = () =>
	M_withImage = false
	M_toysMode = false
	flow.showPrevious()
	flow.open(inputView)

CV_MV_ChangeHandler = () =>
	M_withImage = true
	M_toysMode = false
	CV_IW_ClearHandler()
	flow.showPrevious()
	flow.open(CV_IW_PhotoModal)

CV_MV_Background = CV_ModalView.background()
createModal.add(CV_MV_Background)

CV_MV_ModesView = CV_ModalView.modesView(CV_MV_Background)
CV_MV_ChangeButton = CV_ModalView.changeButton(CV_MV_Background, CV_MV_ChangeHandler)
CV_MV_CreateButton = CV_ModalView.createButton(CV_MV_Background, CV_MV_CreateHandler)




toysModal = flow.createView()
CV_MV_ToysBackground = CV_ModalView.toysBackground()
toysModal.add(CV_MV_ToysBackground)

TOYS_OpenModalHandler = () ->
	flow.showPrevious()
	flow.open(toysModal)

TOYS_CreateHandler = () ->
	# flow.showPrevious()

	# CV_IW_PromptView.children[1].opacity = 1 # TODO FIX
	M_toysMode = true
	CV_IW_CreateHandler()

# CV_MV_ToysInput = CV_ModalView.toysInput(CV_MV_ToysBackground, null)
# CV_MV_ToysCloseButton = CV_ModalView.toysCloseButton(CV_MV_ToysBackground, () -> flow.showPrevious())
CV_MV_ToysCreateButton = CV_ModalView.toysCreateButton(CV_MV_ToysBackground, TOYS_CreateHandler)


CV_MV_ModesView.content.children[0].handler = TOYS_OpenModalHandler





# createView_ButtonAnime = new Button
# 	parent: createView_Image
# 	size: 140, backgroundColor: null
# 	x: Align.left(20), y: Align.bottom(-146)
# 	handler: () ->
# 		flow.showPrevious()
# 		flow.open(chooseAnimeView)


# createView_ButtonBarbie = new Button
# 	parent: createView_Image
# 	size: 140, backgroundColor: null
# 	x: Align.left(163), y: Align.bottom(-146)
# 	handler: () ->
# 		flow.showPrevious()
# 		flow.open(chooseBarbieView)




inputView = flow.createView()
CV_InputView = require "CV_InputView"

CV_IW_ImageAdded = false
CV_IW_GenerationDone = false

CV_IW_TypeHandler = () =>
	CV_IW_PromptView.stateSwitch("typed")
	CV_IW_ButtonDelete.opacity = 1

CV_IW_ClearHandler = () =>
	CV_PW_SetLoadStateHandler()
	CV_IW_PromptView.stateSwitch("null")
	CV_IW_ButtonDelete.opacity = 0

	if CV_IW_ImageAdded
		CV_IW_ImageAdded = false
		CV_IW_PromptView.stateSwitch("top")
		CV_IW_ImageView.stateSwitch("hidden")

CV_IW_CreateHandler = () =>
	if M_toysMode

		CV_PW_SetLoadStateHandler()

		CV_PW_ImageView.children[0].stateSwitch("toys1")
		CV_PW_ImageView.children[1].stateSwitch("toys1")

		flow.open(publishView)

		Utils.delay 3, ->
			try CV_PW_BottomView.stateSwitch("shown")
			try CV_PW_ImageView.stateSwitch("shown")
			try CV_PW_TimeView.stateSwitch("hidden")
			CV_IW_GenerationDone = true
			CV_IW_ButtonContinue.opacity = 1
		
		return

	if CV_IW_PromptView.children[1].opacity == 0 then CV_IW_TypeHandler()
	else
		CV_PW_SetLoadStateHandler()

		if CV_IW_ImageAdded
			CV_PW_ImageView.children[0].stateSwitch("image1")
			CV_PW_ImageView.children[1].stateSwitch("image1")
		else
			CV_PW_ImageView.children[0].stateSwitch("text1")
			CV_PW_ImageView.children[1].stateSwitch("text1")

		flow.open(publishView)

		Utils.delay 3, ->
			try CV_PW_BottomView.stateSwitch("shown")
			try CV_PW_ImageView.stateSwitch("shown")
			try CV_PW_TimeView.stateSwitch("hidden")
			CV_IW_GenerationDone = true
			CV_IW_ButtonContinue.opacity = 1

CV_IW_ContinueHandler = () =>
	if CV_IW_GenerationDone then flow.open(publishView)

CV_IW_OpenCameraModalHandler = () =>
	if CV_IW_ImageAdded
		CV_IW_ImageAdded = false
		CV_IW_PromptView.stateSwitch("top")
		CV_IW_ImageView.stateSwitch("hidden")
	else
		flow.open(CV_IW_PhotoModal)

CV_IW_AddImageHandler = () =>
	CV_IW_PromptView.stateSwitch("bottom")
	CV_IW_ImageView.stateSwitch("shown")
	CV_IW_ImageAdded = true
	flow.showPrevious()

	if M_withImage then flow.open(inputView)

CV_IW_Background = CV_InputView.background()
CV_IW_TopView = CV_InputView.topView(CV_IW_Background)
CV_IW_ImageView = CV_InputView.imageView(CV_IW_Background)
CV_IW_PromptView = CV_InputView.promptView(CV_IW_Background, CV_IW_TypeHandler)
CV_IW_BottomView = CV_InputView.bottomView(CV_IW_Background)

CV_IW_ButtonDelete = CV_InputView.buttonDelete(CV_IW_TopView, CV_IW_ClearHandler)
CV_IW_ButtonDelete.opacity = 0

CV_IW_ButtonMagic = CV_InputView.buttonMagic(CV_IW_BottomView, CV_IW_TypeHandler)
CV_IW_ButtonSettings = CV_InputView.buttonSettings(CV_IW_BottomView, () -> flow.open(CV_IW_SettingsModal))
CV_IW_ButtonCamera = CV_InputView.buttonCamera(CV_IW_BottomView, CV_IW_OpenCameraModalHandler)

CV_IW_ButtonContinue = CV_InputView.buttonContinue(CV_IW_BottomView, CV_IW_ContinueHandler)
CV_IW_ButtonNext = CV_InputView.buttonNext(CV_IW_BottomView, CV_IW_CreateHandler)

inputView.add(CV_IW_Background)



# Add Image Override

CV_IW_PhotoModal = flow.createModal("white", 812-740.0, 32)
CV_IW_ChooseView = CV_InputView.chooseView()

CV_IW_Images = CV_InputView.images(CV_IW_ChooseView, CV_IW_AddImageHandler)
CV_IW_ChooseButtonClose = CV_InputView.chooseButtonClose(CV_IW_ChooseView, () -> flow.showPrevious())

CV_IW_PhotoModal.add(CV_IW_ChooseView)


CV_IW_SettingsModal = flow.createModal("white", 812-740.0, 32)
CV_IW_SettingsView = CV_InputView.settingsView()
CV_IW_SettingsButtonClose = CV_InputView.settingsButtonClose(CV_IW_SettingsView, () -> flow.showPrevious())

CV_IW_SettingsModal.add(CV_IW_SettingsView)






publishView = flow.createView()

CV_PublishView = require "CV_PublishView"

CV_PW_Background = CV_PublishView.background()
CV_PW_TopView = CV_PublishView.topView(CV_PW_Background)
CV_PW_ImageView = CV_PublishView.imageView(CV_PW_Background)
CV_PW_BottomView = CV_PublishView.bottomView(CV_PW_Background)

CV_PW_TimeView = CV_PublishView.timeView(CV_PW_Background)

CV_PW_ButtonText = CV_PublishView.buttonText(CV_PW_TopView, null)
CV_PW_ButtonMusic = CV_PublishView.buttonMusic(CV_PW_TopView, () -> flow.open(musicModal))
CV_PW_ButtonTag = CV_PublishView.buttonTag(CV_PW_TopView, () -> flow.open(tagModal))

CV_PW_PublishHandler = () =>
	flow.showPrevious()
	flow.showPrevious()

	CV_IW_ImageAdded = false
	CV_IW_PromptView.stateSwitch("top")
	CV_IW_ImageView.stateSwitch("hidden")

	Utils.delay 1, ->
		CV_IW_ClearHandler()

CV_PW_SetLoadStateHandler = () =>
	CV_IW_GenerationDone = false
	CV_IW_ButtonContinue.opacity = 0
	CV_PW_BottomView.stateSwitch("hidden")
	CV_PW_ImageView.stateSwitch("hidden")
	CV_PW_TimeView.stateSwitch("shown")

CV_PW_RerollHandler = () =>
	CV_PW_SetLoadStateHandler()
	try
		if CV_IW_ImageAdded
			if CV_PW_ImageView.children[1].states.current.name == "image1"
				CV_PW_ImageView.children[0].stateSwitch("image2")
				CV_PW_ImageView.children[1].stateSwitch("image2")
			else
				CV_PW_ImageView.children[0].stateSwitch("image1")
				CV_PW_ImageView.children[1].stateSwitch("image1")
		else
			if CV_PW_ImageView.children[1].states.current.name == "text1"
				CV_PW_ImageView.children[0].stateSwitch("text2")
				CV_PW_ImageView.children[1].stateSwitch("text2")
			else
				CV_PW_ImageView.children[0].stateSwitch("text1")
				CV_PW_ImageView.children[1].stateSwitch("text1")

	Utils.delay 2, ->
		if !CV_IW_GenerationDone
			try CV_PW_BottomView.stateSwitch("shown")
			try CV_PW_ImageView.stateSwitch("shown")
			try CV_PW_TimeView.stateSwitch("hidden")
		CV_IW_GenerationDone = true
		CV_IW_ButtonContinue.opacity = 1


CV_PW_ButtonReroll = CV_PublishView.buttonReroll(CV_PW_BottomView, CV_PW_RerollHandler)
# CV_PW_ButtonEdit = CV_PublishView.buttonEdit(CV_PW_BottomView, () -> flow.showPrevious())
CV_PW_ButtonSave = CV_PublishView.buttonSave(CV_PW_BottomView, null)
CV_PW_ButtonPublish = CV_PublishView.buttonPublish(CV_PW_BottomView, CV_PW_PublishHandler)

publishView.add(CV_PW_Background)











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