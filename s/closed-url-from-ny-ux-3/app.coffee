
{ Preview } = require "PreviewComponent"
{ FlowView, NavigationView, ModalView } = require "NavigationComponent"
{ Button } = require "Buttons"


screen = new Layer { width: 375, height: 812 }
preview = new Preview { view: screen }


# preview = new Preview { opacity: 0, showDevice: false }

# screen = new Layer { width: 375, height: 812 }

# screen.centerX()
# screen.y = 0
# screen.originY = 0

# aspectRatio = Screen.height / Screen.width
# screen.height = screen.width * aspectRatio


# scaleW = Screen.width / screen.width
# screen.scale = scaleW




flow = new FlowView { parent: screen }


isImageBroken = false
isFirstGeneration = true

brokenImage = 
	original: "images/image01.png"
	crop: "images/image03.png"

correctImage = 
	original: "images/06834d845cbcd4fece9f23dda96d4c264ae95c237e0499e42b4766fe.jpg"
	crop: "images/06834d845cbcd4fece9f23dda96d4c264ae95c237e0499e42b4766fe Background Removed.png"

getNYImage = () ->
	if isImageBroken then return brokenImage
	return correctImage


changeResultImage = () ->
	isImageBroken = !isImageBroken
	updateResultImage()

updateResultImage = () ->
	try resultView_BackImage.image = getNYImage().original
	try resultView_Image.image = getNYImage().crop
	try smallImage.image = getNYImage().original

	if post_ny != null
		try
			feedImageLayer = post_ny_singleTone().children[1]
			feedImageLayer.states =
				"original": { image: getNYImage().original }
				"crop": { image: getNYImage().crop }
			feedImageLayer.stateSwitch("original")



yaView = new NavigationView
	parent: flow, backgroundColor: "white", showBack: false, preventBackSwipe: true

cutTop = new Layer
	parent: yaView.content
	width: 375.0, height: 1208.0, image: "images/cut_top.jpg"

cutBottom = new Layer
	parent: yaView.content
	width: 375.0, height: 1304.0, image: "images/cut_bottom.jpg"
	y: cutTop.height

toyEmpty = new Button
	parent: cutTop
	x: Align.right(20), y: Align.top(740)
	width: 280.0, height: 280.0
	# image: "images/toy_empty.png"
	backgroundColor: "null"
	scaleTo: 1
	handler: () ->
		if post_ny == null then flow.open(storeView)
		else flow.open(homeView)


yaView.scrollToPoint( { x: 0, y: cutTop.height }, false)

yaMessageDone = new Layer
	parent: cutBottom
	y: 100
	width: 375.0, height: 100.0, image: "images/yaMessageBase.png"

fix_yaMessageDone = new Layer
	parent: yaMessageDone
	size: 32, backgroundColor: "white"
	y: Align.bottom, x: Align.center

update_yaMessage = () ->
	yaMessageDone.image = "images/yaMessageDone.png"

statusBarFix = new Layer
	parent: yaView
	width: 375.0, height: 44.0
	backgroundColor: "white"


omnibox = new Layer
	parent: yaView
	width: 375.0, height: 94.0, image: "images/omnibox.png"
	y: Align.bottom(1)

omniboxRefresh = new Button
	parent: omnibox
	size: 64, x: Align.right, y: Align.top
	backgroundColor: null
	handler: () ->
		yaView.scrollToPoint( { x: 0, y: cutTop.height }, true)


yaHeader = new Layer
	parent: yaView
	width: 375.0, height: 106.0, image: "images/ya_Header.png"


toys20small = new Layer
	parent: cutBottom
	width: 200.0, height: 200.0, image: "images/toys small.png"
	x: -40, y: 24
	scale: 0.5

toysButton = new Button
	parent: toys20small
	width: 200.0, height: 200.0, backgroundColor: "null"
	handler: () ->
		if post_ny == null then flow.open(storeView)
		else flow.open(homeView)



# yaRound = new Button
# 	parent: cutTop
# 	size: 200, backgroundColor: "red"
# 	x: Align.right(-8), y: Align.bottom(-280)
# 	handler: () ->
# 		if post_ny == null then flow.open(storeView)
# 		else flow.open(homeView)

# yaButtonBase = new Layer
# 	width: 375.0, height: 493.0, image: "images/yaButtonBase.png"

# yaButtonDone = new Layer
# 	width: 375.0, height: 560.0, image: "images/yaButtonDone.png"


yaLoad = new Button
	parent: cutTop
	width: 375.0, height: 493.0, image: "images/yaButtonBase.png"
	# backgroundColor: "red"
	# image: "images/yaru-message-new.png"
	x: Align.center, y: Align.bottom(50)
	scaleTo: 1
	handler: () ->
		if yaLoad.image == "images/yaButtonDone.png"
			flow.open(shareModal)
			return
		if post_ny == null then flow.open(storeView)
		else flow.open(fullscreenView)

update_yaLoad = () -> yaLoad.image = "images/yaButtonDone.png"


yaView.content.on "change:y", ->
	v = yaView.scrollY
	# print Utils.modulate(v, [cutTop.height - 100, cutTop.height - 200], [0, 1], true)
	arrowView.opacity = Utils.modulate(v, [cutTop.height - 100, cutTop.height - 200], [1, 0], true)
	# print v cutTop.height

	# toys20small.x = Utils.modulate(v, [cutTop.height - 20, cutTop.height - 200], [-60, 87], true)
	# toys20small.y = Utils.modulate(v, [cutTop.height - 20, cutTop.height - 200], [70, -290], true)
	# toys20small.scale = Utils.modulate(v, [cutTop.height - 20, cutTop.height - 200], [0.6, 1.2], true)

	# small20logo.y = Utils.modulate(v, [cutTop.height - 20, cutTop.height - 100], [100, -40], true)
	# yaLoad.opacity = Utils.modulate(v, [cutTop.height - 100, cutTop.height - 200], [0, 1], true)


# small20logo = new Button
# 	parent: cutBottom
# 	width: 247.0, height: 68.0, image: "images/small logo.png"
# 	x: Align.center, y: 100
# 	handler: () ->
# 		yaView.scrollToPoint( { x: 0, y: cutTop.height - 400 }, true)




storeView = new NavigationView
	parent: flow, backgroundColor: "white", preventBackSwipe: true

store = new Layer
	parent: storeView
	width: 375.0, height: 812, image: "images/store.png"

store_Button = new Button
	parent: storeView
	width: 330.0, height: 40.0, image: "images/store_install.png"
	x: Align.center, y: Align.top(274)
	scaleTo: 0.96
	handler: () -> 
		if @image == "images/store_install.png"
			@image = "images/store_open.png"
		else
			flow.open(fullscreenView)







fullscreenView = new NavigationView
	parent: flow, backgroundColor: "white", showBack: false, preventBackSwipe: true

fullscreenView_Image = new Layer
	parent: fullscreenView.content
	width: 375.0, height: 812.0, image: "images/fs.png"

fullscreenView_Close = new Button
	parent: fullscreenView_Image
	size: 120, x: Align.right, y: Align.top
	backgroundColor: null
	handler: () -> flow.open(homeView)

fullscreenView_Create = new Button
	parent: fullscreenView
	width: 241.0, height: 70.0, image: "images/fs_create.png"
	x: Align.center, y: Align.bottom(-64)
	scaleTo: 0.96
	handler: () ->
		flow.transition(homeView, flow.stackTransition, animate: false)
		flow.open(createView)





homeView = new NavigationView
	parent: flow, backgroundColor: "eee", showBack: false, preventBackSwipe: true
	contentInset:
		bottom: 120

updatePosition = (layerArray, sum = 0, gap = 8) ->
	for item in layerArray
		item.y = sum
		sum += item.height + gap
	try layerArray[0].parent.parent.updateContent()

homeView_Header = new Layer
	parent: homeView.content
	width: 375.0, height: 178.0, image: "images/homeView_Header.png"

homeView_Header_OpenButton = new Button
	parent: homeView_Header
	size: 44, backgroundColor: null
	x: Align.right(-56), y: Align.top(62)
	handler: () -> flow.open(treeView)






getImageNY = (localParent, localImage, nyImage) -> 

	postNY_resultView_Image = new Layer
		parent: localParent
		size: 363
		x: Align.center, y: 56
		borderRadius: 12
		image: localImage
		backgroundColor: "eee"

	postNY_resultView_Image.states =
		"original": { image: localImage }
		"crop": { image: nyImage }

	postNY_resultView_Image.stateSwitch("original")


	postNY_ModeButton = new Layer
		parent: postNY_resultView_Image
		width: 117.0, height: 58.0, image: "images/mode temp button.png"
		x: Align.right, y: Align.bottom

	postNY_ModeButton.onTouchStart ->
		@parent.image = @parent.states.crop.image
		@opacity = 0.5

	postNY_ModeButton.onTouchEnd ->
		@parent.image = @parent.states.original.image
		@opacity = 1.0
	
	return postNY_resultView_Image

userImages = ["images/user01.png", "images/user02.png", "images/user03.png", "images/user04.png", "images/user05.png"]
Framer.Extras.Preloader.addImage(userImage) for userImage in userImages
nextUserImage = Utils.cycle(userImages)

promptImages = ["images/prompImage01.png", "images/prompImage02.png", "images/prompImage03.png", "images/prompImage04.png", "images/prompImage05.png"]
Framer.Extras.Preloader.addImage(promptImage) for promptImage in promptImages
nextPromptImage = Utils.cycle(promptImages)

postImages = ["images/postImage01.jpg", "images/postImage02.jpg", "images/postImage03.jpg", "images/postImage04.jpg", "images/postImage05.jpg"]
Framer.Extras.Preloader.addImage(postImage) for postImage in postImages
nextPostImage = Utils.cycle(postImages)

nyImages = ["images/ny_post_image01.jpg", "images/ny_post_image02.jpg", "images/ny_post_image03.jpg", "images/ny_post_image04.jpg", "images/ny_post_image05.jpg"]
Framer.Extras.Preloader.addImage(nyImage) for nyImage in nyImages
nextNYImage = Utils.cycle(nyImages)

nyBackImages = ["images/ny_post_image01 Background Removed.png", "images/ny_post_image02 Background Removed.png", "images/ny_post_image03 Background Removed.png", "images/ny_post_image04 Background Removed.png", "images/ny_post_image05 Background Removed.png"]
Framer.Extras.Preloader.addImage(nyBackImage) for nyBackImage in nyBackImages
nextNYBackImage = Utils.cycle(nyBackImages)




createPost = (imageURL, localParent, nyImage = null) ->
	post = new Layer
		parent: localParent
		width: 375, height: 520
		backgroundColor: "white"

	post_header = new Layer
		parent: post
		width: 375.0, height: 56.0, image: nextUserImage()
	
	if nyImage != null
		post_image = getImageNY(post, imageURL, nyImage)
	else
		post_image = new Layer
			parent: post
			size: 363, x: Align.left(6), y: 56
			image: imageURL
			borderRadius: 12
	
	post_prompt = new Layer
		parent: post
		width: 375.0, height: 60.0, image: nextPromptImage()
		y: 56 + 363
	
	post_comments = new Layer
		parent: post
		width: 375.0, height: 40.0, image: "images/emptyComments.png"
		y: 56 + 363 + 60
	
	return post


post_ny = null
post_ny_singleTone = () ->
	if post_ny == null
		post_ny = createPost(getNYImage().original, homeView.content, getNYImage().crop)
		post_ny.children[0].image = "images/user_you.png"
		post_ny.children[2].image = "images/prompt_you.png"

	return post_ny


message_ny = null
message_ny_singleTone = () ->
	if message_ny == null
		message_ny = new Button
			parent: homeView.content
			width: 375.0, height: 60.0, image: "images/messageOff.png"
			scaleTo: 1
			handler: () ->
				toys20small.image = getNYImage().crop
				toyEmpty.image = getNYImage().crop
				flow.open(yaView)
				yaView.scrollToPoint( { x: 0, y: cutTop.height }, false)
				update_yaLoad()
				update_yaMessage()

		# messagePromo_Image = new Layer
		# 	parent: message_ny
		# 	size: 36, x: Align.right(-16), y: Align.center
		# 	backgroundColor: "eee"
		# 	borderRadius: 9
		
		Utils.delay 10, -> message_ny.image = "images/messageOn.png"

	return message_ny

post1 = createPost(nextPostImage(), homeView.content)
post2 = createPost(nextPostImage(), homeView.content)
post3 = createPost(nextPostImage(), homeView.content)
post4 = createPost(nextPostImage(), homeView.content)
post5 = createPost(nextPostImage(), homeView.content)

messagePromo = new Layer
	parent: homeView.content
	width: 375.0, height: 216.0, image: "images/messagePromo.png"

messagePromo_Button = new Button
	parent: messagePromo
	width: 166, height: 40, backgroundColor: null
	x: Align.left(30), y: Align.top(152)
	handler: () -> flow.open(createView)


updatePosition([homeView_Header, messagePromo, post1, post2, post3, post4, post5])



bottomBar = new Button
	parent: homeView
	width: 375.0, height: 80.0, image: "images/bottomBar.png"
	y: Align.bottom
	scaleTo: 1
	handler: () -> flow.open(createModal)



createModal = new ModalView { parent: flow, backgroundColor: "eee", y: screen.height - 272, borderRadius: 40 }

createModal_Image = new Layer
	parent: createModal.content
	width: 375.0, height: 272.0, image: "images/createModal.png"

createModal_newToy = new Button
	parent: createModal_Image
	width: 375.0 - 32, height: 72.0, x: Align.left(16), y: Align.top(24)
	backgroundColor: null, borderRadius: 20
	scaleTo: 1
	handler: () ->
		flow.showPrevious()
		try createView_inputFill.opacity = 0
		try createView_nextButton_fix.opacity = 1

		if resultView_TreeImage.states.current.name == "done"
			try resultView_ToggleText.emit Events.Tap
		
		flow.open(createView)

		if post_ny != null and resultView_ToggleSwitcher.isOn
			resultView_ToggleButton.emit Events.Tap



createView = new NavigationView
	parent: flow
	backButton: new Button
		parent: resultView, backgroundColor: null
		size: 56, x: Align.left, y: Align.top(44)

createView_InputEmpty = new Layer
	parent: createView
	width: 375.0, height: 812.0
	image: "images/input.png"

createView_input = new Button
	parent: createView_InputEmpty
	width: 375.0, height: 240.0, image: "images/input01.png"
	y: 194
	scaleTo: 1
	handler: () ->
		try createView_inputFill.opacity = 1
		try createView_nextButton_fix.opacity = 0

createView_inputFill = new Layer
	parent: createView_input
	width: 375.0, height: 240.0, image: "images/input02.png"
	opacity: 0



createViewBottomView = new Layer
	parent: createView
	width: 375.0, height: 64.0, image: "images/createView_bottomView.png"
	y: Align.bottom(-32)


createView_deleteButton = new Button
	parent: createView
	width: 56, height: 64
	x: Align.left(10), y: Align.bottom(-32)
	scaleTo: 1
	opacity: 1
	backgroundColor: null
	handler: () ->
		try createView_inputFill.opacity = 0
		try createView_nextButton_fix.opacity = 1

createView_nextButton_fix = new Layer
	parent: createView
	width: 132, height: 64
	x: Align.right, y: Align.bottom(-32)
	backgroundColor: "white", opacity: 1

createView_TagButton = new Button
	parent: createView
	width: 56, height: 64
	x: Align.left(10 + 54), y: Align.bottom(-32)
	scaleTo: 1
	backgroundColor: null
	handler: () -> flow.open(tagModal)

createView_nextButton = new Button
	parent: createView
	width: 132, height: 64
	x: Align.right, y: Align.bottom(-32)
	scaleTo: 1
	backgroundColor: null, opacity: 1
	handler: () ->
		if createView_nextButton_fix.opacity == 1 then return
		
		changeResultImage()
		flow.open(resultView)

		if isFirstGeneration
			isFirstGeneration = false
			Utils.delay 0.5, ->
				if !resultView_ToggleSwitcher.isOn
					resultView_ToggleButton.emit Events.Tap





resultView = new NavigationView
	parent: flow, backgroundColor: "white"
	contentInset:
		bottom: 120
	backButton: new Button
		size: 56, x: Align.left, y: Align.top(44)
		backgroundColor: null

resultView.content.onSwipeStart ->
	if resultView_ToggleSwitcher.isOn then resultView_TreeImage.stateSwitch("done")
resultView.content.onSwipe ->
	if resultView_ToggleSwitcher.isOn then resultView_TreeImage.stateSwitch("done")




resultView_Container = new Layer
	parent: resultView.content
	width: 375.0, height: resultView.height
	backgroundColor: "white"

resultView_BackImage = new Layer
	parent: resultView_Container
	size: 363, x: Align.center, y: 100
	borderRadius: 13, backgroundColor: "null"
	image: getNYImage().original




resultView_TreeImage = new Layer
	parent: resultView_Container
	width: 375.0, height: 375.0, image: "images/tree image.jpg"
	y: 100

resultView_TreeImage.states =
	"init": { opacity: 0 }
	"done": { opacity: 1 }
resultView_TreeImage.stateSwitch("init")




resultView_Image = new Layer
	parent: resultView_TreeImage
	size: 363, x: 6
	# , x: Align.center, y: 100
	borderRadius: 12, backgroundColor: "null"
	image: getNYImage().crop






resultView_TreeImage.onTouchStart ->
	if resultView_ToggleSwitcher.isOn and !resultView.content.draggable.isMoving then resultView_TreeImage.stateSwitch("init")

resultView_TreeImage.onTouchEnd ->
	if resultView_ToggleSwitcher.isOn then resultView_TreeImage.stateSwitch("done")






resultView_ProgressImage = new Layer
	parent: resultView_Container
	size: 363, x: Align.center, y: 100
	borderRadius: 12, backgroundColor: "white"
	image: "images/progress_toys.png"

resultView_ProgressImage.states =
	"load": { opacity: 1 }
	"done": { opacity: 0 }
resultView_ProgressImage.stateSwitch("done")

resultView_ProgressImage.on Events.StateSwitchEnd, (from, to) ->
	if to == "load"
		Utils.delay 2, => @stateSwitch("done")







resultView_StatusView = new Layer
	parent: resultView.content
	width: 375 - 32, height: 68 + 84
	x: Align.left(16), y: 463 + 12
	borderRadius: 20, backgroundColor: "#f3f2f2"
	clip: true

resultView_StatusView.states =
	"on": { height: 68 + 84 }
	"off": { height: 68 }
resultView_StatusView.stateSwitch("off")

resultView_ToggleButton = new Button
	parent: resultView_StatusView
	width: 343.0, height: 68.0
	backgroundColor: null
	scaleTo: 1
	handler: () ->
		if resultView_TreeImage.states.current.name == "done"
			resultView_TreeImage.animate("init")

			resultView_ToggleSwitcher.setOn(false)
			resultView_StatusView.animate("off")
			messageInfo.animate("hidden")
			resultView_Breaker.animate("hidden")

			resultView.updateContent()

		else
			resultView_TreeImage.animate("done")

			resultView_ToggleSwitcher.setOn(true)
			resultView_StatusView.animate("on")
			messageInfo.animate("shown")
			resultView_Breaker.animate("shown")

			resultView.updateContent()



resultView_ToggleText = new Layer
	parent: resultView_StatusView
	width: 343.0, height: 68.0, backgroundColor: null

resultView_ToggleText.states =
	"line1": { image: "images/line1.png" }
	"line2": { image: "images/line2.png" }
resultView_ToggleText.stateSwitch("line1")

{ iOSSwitch } = require "SwitchTest"
resultView_ToggleSwitcher = new iOSSwitch
	parent: resultView_ToggleText
	x: Align.right(-16), y: Align.center
	isOn: false

resultView_Breaker = new Layer
	parent: resultView_StatusView
	width: 343, height: 1
	y: Align.top(68)

resultView_Breaker.states =
	"shown": { opacity: .3 }
	"hidden": { opacity: 0 }
resultView_Breaker.stateSwitch("hidden")


messageInfo = new Layer
	parent: resultView_StatusView, y: 69
	width: 343.0, height: 84.0, image: "images/messageInfo.png"

messageInfo.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
messageInfo.stateSwitch("shown")

messageInfo.onTouchStart ->
	if resultView_ToggleSwitcher.isOn and !resultView.content.draggable.isMoving then resultView_TreeImage.stateSwitch("init")

messageInfo.onTouchEnd ->
	if resultView_ToggleSwitcher.isOn then resultView_TreeImage.stateSwitch("done")


smallImage = new Layer
	parent: messageInfo
	size: 60
	x: Align.left(12), y: Align.top(12)
	borderRadius: 12
	image: resultView_BackImage.image


resultView_PublishView = new Layer
	parent: resultView
	# width: 375.0, height: 96.0, image: "images/bottomPublishView.png"
	width: 375.0, height: 120.0, image: "images/bottom view agreement.png"
	y: Align.bottom


resultView_PublishButton = new Button
	parent: resultView_PublishView
	width: 200, height: 64
	x: Align.right, y: Align.top(2)
	scaleTo: 1
	backgroundColor: null
	handler: () ->
		if post_ny == null
			Utils.delay 0.5, ->
				flow.open(pushModal)
		
		updatePosition([homeView_Header, message_ny_singleTone(), post_ny_singleTone(), post5, post4, post2, post1, post3, messagePromo])
		homeView.scrollToTop()

		# try message_ny_singleTone().children[0].image = getNYImage().crop

		flow.showPrevious()
		flow.showPrevious()




resultView_RefreshButton = new Button
	parent: resultView_PublishView
	width: 56, height: 64
	x: Align.left(10 + 54), y: Align.top(2)
	scaleTo: 1
	backgroundColor: null
	handler: () ->
		resultView_ProgressImage.stateSwitch("load")
		changeResultImage()


resultView_DeleteButton = new Button
	parent: resultView_PublishView
	width: 56, height: 64
	x: Align.left(10), y: Align.top(2)
	scaleTo: 1
	backgroundColor: null
	handler: () ->
		createView_deleteButton.emit Events.Tap
		flow.showPrevious()


resultView_TagButton = new Button
	parent: resultView_PublishView
	width: 56, height: 64
	x: Align.left(10 + 54 + 54), y: Align.top(2)
	scaleTo: 1
	backgroundColor: null
	handler: () -> flow.open(tagModal)


tagModal = new ModalView { parent: flow, y: screen.height - 420 - 32, backgroundColor: "white", borderRadius: 20 }

tagView = new Layer
	parent: tagModal.content
	width: 375, height: 420.0, image: "images/tagView.png"

tagClose = new Button
	parent: tagView
	width: 200, height: 64
	x: Align.right, y: Align.bottom(-32)
	backgroundColor: null
	handler: () -> flow.showPrevious()


resultView_Header = new Layer
	parent: resultView
	width: 375.0, height: 100.0, image: "images/tempHeaderView.png"

changePrompt = new Button
	parent: resultView_Header
	x: Align.right, y: Align.top(44)
	width: 56.0, height: 56.0, image: "images/editButton.png"
	handler: () -> flow.showPrevious()



pushModal = new ModalView { parent: flow, backgroundColor: "eee", y: screen.height - 316, borderRadius: 40 }

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
	y: Align.bottom
	handler: () -> flow.showPrevious(animate: false)
	scaleTo: 1


shareModal = new ModalView { parent: flow, backgroundColor: "eee", y: screen.height - 400, height: 400, borderRadius: 40 }

systemShareImage = new Layer
	parent: shareModal.content
	width: 375.0, height: 732.0, image: "images/systemShare.jpg"



treeView = new NavigationView
	parent: flow, backgroundColor: "f3f2f2"
	backButton: new Button
		parent: resultView, backgroundColor: null
		size: 56, x: Align.left, y: Align.top(44)


tree_post1 = createPost(nextNYImage(), treeView.content, nextNYBackImage())
tree_post2 = createPost(nextNYImage(), treeView.content, nextNYBackImage())
tree_post3 = createPost(nextNYImage(), treeView.content, nextNYBackImage())
tree_post4 = createPost(nextNYImage(), treeView.content, nextNYBackImage())
tree_post5 = createPost(nextNYImage(), treeView.content, nextNYBackImage())

treeViewHeader = new Layer
	parent: treeView.content
	width: 375.0, height: 100.0, image: "images/treeView_Header.png"

treeView_message = new Layer
	parent: treeView.content
	width: 375.0, height: 216.0, image: "images/messagePromo.png"

treeView_message_Button = new Button
	parent: treeView_message
	width: 166, height: 40, backgroundColor: null
	x: Align.left(30), y: Align.top(152)
	handler: () -> flow.open(createView)

updatePosition([treeViewHeader, treeView_message, tree_post1, tree_post2, tree_post3, tree_post4, tree_post5])


# flow.open(homeView)
# flow.open(resultView, false)
# flow.open(systemModal)


arrowView = new Button
	parent: yaMessageDone
	width: 40.0, height: 40.0
	backgroundColor: "null"
	x: Align.center, y: Align.bottom()
	scale: 0.6
	handler: () ->
		yaView.scrollToPoint( { x: 0, y: cutTop.height - 660 }, true)


arrow = new Layer
	parent: arrowView
	width: 40.0, height: 40.0, image: "images/arrow.png"

arrow.states =
	"top": { y: -8 }
	"bottom": { y: 8 }

arrow.on Events.StateSwitchEnd, (from, to) ->
	if to == "top" then @animate("bottom", curve: Bezier.easeInOut, time: 0.8)
	else @animate("top", curve: Bezier.easeInOut, time: 0.8)

arrow.stateSwitch("top")



shedevrumSiteView = new NavigationView
	parent: flow
	backButton: new Button
		parent: resultView, backgroundColor: null
		size: 56, x: Align.left, y: Align.top(44)

shed = new Layer
	parent: shedevrumSiteView.content
	width: 375.0, height: 1507.0, image: "images/shed.png"
