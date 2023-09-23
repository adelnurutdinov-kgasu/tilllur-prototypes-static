Framer.Extras.Hints.disable()

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5


screenGuard = new Layer
	name: "screenGuard"
	opacity: 0
	x: -2000


{ Preview } = require "PreviewComponent"
{ CameraLayer } = require "CameraLayer"
{ Button, ButtonOmnibox, ButtonVideo } = require "Buttons"
Stack = require "Stack"
# ShoppingData = require "ShoppingData"

screen = new Layer { width: 393, height: 852 }
# new Preview { view: screen }

screen.center()
if Utils.isMobile() then screen.scale = Screen.width / 393
else
	screen.borderRadius = 42
	screen.clip = true

flow = new FlowComponent
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "white"









# System

feedColor = () ->
	return "EFF1F5"

makeIsland = (layer) ->
	layer.borderRadius = 20
	layer.clip = true

spaceWhite = (spaceHeight) ->
	return space(spaceHeight).backgroundColor = "white"

space = (spaceHeight) ->
	return new Layer
		width: 393, height: spaceHeight
		backgroundColor: null

create_BackButton = (parentLayer) ->
	backButton = new Layer
		parent: parentLayer
		width: 100, height: 82, y: 54
		backgroundColor: null
		opacity: 0.4
	
	backButton.onTap ->
		flow.showPrevious()
	
	return backButton


stackTransition = (nav, layerA, layerB, overlay) ->
	transition =
		layerA:
			show: {x: 0, y: 0}
			hide: {x: 0 - layerA?.width / 2, y: 0}
		layerB:
			show: {x: 0, y: 0}
			hide: {x: layerB.width, y: 0}
		overlay:
			show: {opacity: .5, x: 0, y: 0, size: nav.size}
			hide: {opacity: 0, x: 0, y: 0, size: nav.size}

modalTransition = (nav, layerA, layerB, overlay) ->
	transition =
		layerA:
			show: {x: 0, y: 0}
			hide: {x: 0, y: 0}
		layerB:
			show: {x: 0, y: 0}
			hide: {x: 0, y: layerA?.height + 10}
		overlay:
			show: {opacity: .5, x: 0, y: 0, size: nav.size}
			hide: {opacity: 0, x: 0, y: 0, size: nav.size}

searchTransition = (nav, layerA, layerB, overlay) ->
	transition =
		layerA:
			show: {x: 0, y: 0, opacity: 1}
			hide: {x: 0, y:  - layerA?.height / 2, opacity: 0}
		layerB:
			show: {x: 0, y: 0, opacity: 1}
			hide: {x: 0, y: layerB.height / 2 - 50, opacity: 0}
		# overlay:
		# 	show: {opacity: .5, x: 0, y: 0, size: nav.size}
		# 	hide: {opacity: 0, x: 0, y: 0, size: nav.size}


init_NavigationView = () ->
	navigationView = new ScrollComponent
		width: screen.width
		height: screen.height
		backgroundColor: "white"
		scrollVertical: true
		scrollHorizontal: false
		directionLock: true
	
	navigationView.on Events.SwipeRightStart, (event, layer) ->
		flow.showPrevious()
	
	flow.showNext(navigationView)
	flow.showPrevious(animate: false)

	view_BackButton = create_BackButton(navigationView.content)
	
	return navigationView


init_ModalView = () ->
	navigationView_Wrapper = new Layer
		name: "ada"
		width: screen.width
		height: screen.height
		backgroundColor: null
		# backgroundColor: "red"
		custom:
			view: null
			handler: null

	navigationView = new ScrollComponent
		parent: navigationView_Wrapper
		y: 66
		width: screen.width
		height: screen.height - 66
		backgroundColor: null
		backgroundColor: "white"
		scrollVertical: true
		scrollHorizontal: false
		directionLock: true
		borderRadius: 56

	navigationView_Wrapper.custom.view = navigationView

	navigationView_Handler = new Layer
		parent: navigationView_Wrapper
		width: 40, height: 3, x: Align.center, y: 55
		backgroundColor: "white", opacity: 0.5
	
	navigationView_Wrapper.custom.handler = navigationView_Handler

	# navigationView.content.on "change:y", ->
	# 	value = @parent.scrollY
	# 	if value <= 0
	# 		@parent.parent.custom.handler.y = Utils.modulate(value, [0, -100], [55, 55 + 100])


	navigationView.on Events.SwipeRightStart, (event, layer) ->
		flow.showPrevious()

	navigationView.on Events.SwipeDownStart, (event, layer) ->
		if @scrollY < 0 then flow.showPrevious()
	
	flow.showNext(navigationView_Wrapper)
	flow.showPrevious(animate: false)

	# view_BackButton = create_BackButton(navigationView.content)
	
	return navigationView_Wrapper

init_NavigationViewContent = (navigationView, contentView) ->
	if navigationView.custom and navigationView.custom.view
		contentView.parent = navigationView.custom.view.content
		contentView.backgroundColor = null
	else
		contentView.parent = navigationView.content


init_SearchNavigationView = () ->
	navigationView = new ScrollComponent
		width: screen.width
		height: screen.height
		backgroundColor: "white"
		scrollVertical: true
		scrollHorizontal: false
		directionLock: true
	
	navigationView.on Events.SwipeDownStart, (event, layer) ->
		if @scrollY < 0 then flow.showPrevious()
	
	flow.showNext(navigationView)
	flow.showPrevious(animate: false)

	view_BackButton = create_BackButton(navigationView.content)
	
	return navigationView


init_VideoCard = (withVideo) ->

	videoCard = new ButtonVideo
		# parent: start_NavView.content
		width: 373, height: 620
		x: 10, y: 580
		backgroundColor: "black"
		borderRadius: 32
		clip: true

	videoCard.video = withVideo
	videoCard.player.autoplay = true
	videoCard.player.loop = true

	videoControl = new Layer
		width: 373.0
		height: 620.0
		image: "images/videoControl.png"
		parent: videoCard
	
	return videoCard

init_ImageCard = (withImage) ->

	videoCard = new ButtonOmnibox
		width: 373, height: 620
		x: 10, y: 580
		backgroundColor: "black"
		borderRadius: 32
		clip: true
		image: withImage

	videoControl = new Layer
		width: 373.0
		height: 620.0
		image: "images/videoControl.png"
		parent: videoCard
	
	return videoCard



handler_OpenView = (navigationView) ->
	if navigationView.custom and navigationView.custom.view
		navigationView.custom.view.scrollToTop(false)
		flow.transition(navigationView, modalTransition)
	else
		navigationView.scrollToTop(false)
		flow.transition(navigationView, stackTransition)


handler_OpenSearchView = (navigationView) ->
	navigationView.scrollToTop(false)
	search_States.stateSwitch("hidden")
	flow.transition(navigationView, searchTransition)
	keyboard.animate("shown")



# Start

start_NavView = new ScrollComponent
	width: screen.width
	height: screen.height
	backgroundColor: "white"
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true

flow.showNext(start_NavView)



start_Title = new Layer
	width: 392.0
	height: 134.0
	image: "images/mainHeader.png"



# Domain

bubbleAlice = new Button
	width: 84.0
	height: 84.0
	image: "images/bubble_alice.png"

bubbleCamera = new Button
	width: 84.0
	height: 84.0
	image: "images/bubble_camera.png"

bubbleImages = new Button
	width: 168.0
	height: 168.0
	image: "images/bubble_images.png"

bubblePlaces = new Button
	width: 168.0
	height: 84.0
	image: "images/bubble_places.png"

bubbleShopping = new Button
	width: 168.0
	height: 168.0
	image: "images/bubble_shopping.png"

bubbleVideo = new Button
	width: 168.0
	height: 168.0
	image: "images/bubble_video.png"



# Compose

# Handlers

left_SingleView = Stack.horizontal([bubbleAlice, bubbleCamera], 0)
left_BubbleView = Stack.vertical([bubblePlaces, bubbleShopping, left_SingleView], 0)
right_BubbleView = Stack.vertical([bubbleImages, bubbleVideo], 0)

bubleView = Stack.horizontal([left_BubbleView, right_BubbleView], 0, { x: 28, y: 0 })
bubleView.parent = start_NavView.content
bubleView.y = 134


bubbleShopping.handler = (event, layer) ->
	handler_OpenView(shopping_NavView)
	shopping_ShopScrollView.scrollX = 0
	shopping_TabScrollView.scrollX = 0

bubbleVideo.handler = (event, layer) -> handler_OpenView(video_NavView)

bubbleImages.handler = (event, layer) ->
	handler_OpenView(images_NavView)
	images_ScrollView.scrollX = 0

bubbleCamera.handler = (event, layer) -> handler_OpenView(camera_NavView)
bubblePlaces.handler = (event, layer) -> handler_OpenView(places_NavView)
bubbleAlice.handler = (event, layer) -> handler_OpenView(alice_NavView)



# Start Feed

start_Omnibox = new ButtonOmnibox
	parent: start_NavView.content
	width: 393.0
	height: 196.0
	y: 386
	image: "images/start_omnibox.png"

start_Omnibox.handler = (event, layer) -> handler_OpenSearchView(search_NavView)


start_Card0 = init_ImageCard("images/demo.jpg")
start_Card1 = init_VideoCard("video/video2.mp4")
start_Card2 = init_VideoCard("video/video3.mp4")

# start_Card0.player.autoplay = false

start_Feed = Stack.vertical([start_Card0, start_Card1, start_Card2], 8)
start_Image = Stack.vertical([start_Title, bubleView, start_Omnibox, start_Feed], 0)
start_Image.parent = start_NavView.content












# Shopping

shopping_NavView = init_NavigationView()


shopping_Title = new Layer
	width: 393.0
	height: 82.0
	image: "images/shopping_Title.png"

shopping_Omnibox = new ButtonOmnibox
	width: 393.0
	height: 60.0
	image: "images/video_Omnibox.png"


shopping_ShopScrollView = new ScrollComponent
	width: 393.0, height: 110
	backgroundColor: "white"
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true

shopping_ShopScrollView.on Events.SwipeRightStart, (event, layer) ->
	if @scrollX > 0 then event.stopPropagation()


shops = new Layer
	parent: shopping_ShopScrollView.content
	width: 844.0, height: 110
	image: "images/Shops.png"

shops.onTap ->
	handler_OpenView(shop_NavView)



shopping_TabScrollView = new ScrollComponent
	width: 393.0, height: 66
	backgroundColor: "white"
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true

shopping_TabScrollView.on Events.SwipeRightStart, (event, layer) ->
	if @scrollX > 0 then event.stopPropagation()

shopping_Tabs = new Layer
	parent: shopping_TabScrollView.content
	width: 867.0
	height: 66.0
	image: "images/shopping_tabs.png"





# shopping_leftStack = Stack.vertical(ShoppingData.data.left)
# shopping_rightStack = Stack.vertical(ShoppingData.data.right)
# shopping_Stack = Stack.horizontal([shopping_leftStack, shopping_rightStack], 8, { x: 16, y: 0 })
# makeIsland(shopping_Stack)

shopping_Stack = new Layer
	width: 393.0
	height: 1361.6666666666665
	image: "images/shopping_content.png"

shopping_ContentView = Stack.vertical([shopping_TabScrollView, shopping_Stack], 0)


shopping_Header = Stack.vertical([space(58), shopping_Title, shopping_Omnibox, shopping_ShopScrollView], 0)
makeIsland(shopping_Header)

shopping_Image = Stack.vertical([shopping_Header, space(8), shopping_ContentView], 0)
shopping_Image.backgroundColor = feedColor()
init_NavigationViewContent(shopping_NavView, shopping_Image)




# Shop

shop_NavView = init_ModalView()

# shop_Image = new Layer
# 	width: 393.0
# 	height: 1348.0
# 	image: "images/shop_image.png"

shop_Image = new Layer
	width: 393.0
	height: 1172.6666666666665
	image: "images/shop_content.png"


init_NavigationViewContent(shop_NavView, shop_Image)


# Video

video_NavView = init_NavigationView()

video_Space = new Layer
	width: 393, height: 58
	backgroundColor: "white"


video_Title = new Layer
	width: 393.0
	height: 82.0
	image: "images/video_Title.png"

video_Omnibox = new ButtonOmnibox
	width: 393.0
	height: 60.0
	y: 136
	image: "images/video_Omnibox.png"



video_ScrollView = new ScrollComponent
	width: 393.0, height: 110
	backgroundColor: "white"
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true

video_ScrollView.on Events.SwipeRightStart, (event, layer) ->
	if @scrollX > 0 then event.stopPropagation()


video_Bloggers = new Layer
	parent: video_ScrollView.content
	width: 805.0, height: 124
	image: "images/bloggers.png"

video_Bloggers.onTap ->
	handler_OpenView(channel_NavView)


video_Breaker = new Layer
	width: 393, height: 44
	backgroundColor: "white"
	image: "images/breaker.png"

video_TabsScrollView = new ScrollComponent
	width: 393.0, height: 74 - 16
	backgroundColor: "white"
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true

video_TabsScrollView.on Events.SwipeRightStart, (event, layer) ->
	if @scrollX > 0 then event.stopPropagation()


video_Tabs = new Layer
	parent: video_TabsScrollView.content
	y: -16
	width: 451.0
	height: 74.0
	image: "images/video_tabs.png"


video_Card0 = init_VideoCard("video/video2.mp4")
video_Card1 = init_VideoCard("video/video1.mp4")
video_Card2 = init_VideoCard("video/video3.mp4")
video_Feed = Stack.vertical([video_Card0, video_Card1, video_Card2], 8)


video_Image = Stack.vertical([video_Space, video_Title, video_Omnibox, video_ScrollView, video_Breaker, video_TabsScrollView, video_Feed], 0)
video_Image.parent = video_NavView.content



# Channel

channel_NavView = init_ModalView()

channelInfo = new Layer
	width: 393.0
	height: 254.0
	image: "images/channel_info.png"

channel_HeaderView = Stack.vertical([channelInfo], 0)
makeIsland(channel_HeaderView)



channel_TabsScrollView = new ScrollComponent
	width: 393.0, height: 74 - 16
	backgroundColor: "white"
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true

channel_TabsScrollView.on Events.SwipeRightStart, (event, layer) ->
	if @scrollX > 0 then event.stopPropagation()


channelTabs = new Layer
	parent: channel_TabsScrollView.content
	width: 451.0
	height: 74.0
	image: "images/channel_tabs.png"


channel_Card0 = init_VideoCard("video/video3.mp4")
channel_Card1 = init_VideoCard("video/video2.mp4")
channel_Card2 = init_VideoCard("video/video1.mp4")
channel_Feed = Stack.vertical([channel_Card0, channel_Card1, channel_Card2], 8)

channel_FeedView = Stack.vertical([channel_TabsScrollView, channel_Feed], 16)
makeIsland(channel_FeedView)

channel_Image = Stack.vertical([channel_HeaderView, channel_FeedView], 8)
channel_ImageBackground = Stack.vertical([channel_Image])
channel_ImageBackground.backgroundColor = feedColor()

init_NavigationViewContent(channel_NavView, channel_ImageBackground)

# channel_Image.backgroundColor = null
# channel_Image.parent = channel_NavView.content






# Images

images_NavView = init_NavigationView()


images_Title = new Layer
	width: 393.0
	height: 82.0
	image: "images/images_Title.png"

images_Omnibox = new ButtonOmnibox
	width: 393.0
	height: 60.0
	image: "images/images_Omnibox.png"



images_ScrollView = new ScrollComponent
	width: 393.0, height: 99
	backgroundColor: "white"
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true

images_ScrollView.on Events.SwipeRightStart, (event, layer) ->
	if @scrollX > 0 then event.stopPropagation()


images_ScrollContent = new Layer
	parent: images_ScrollView.content
	width: 812.0
	height: 99.0
	image: "images/images_scrollContent.png"

images_ScrollContent.onTap ->
	handler_OpenView(collection_NavView)




imageCard1 = new Layer
	width: 185.66666666666666
	height: 230.0
	image: "images/image_card_1.png"

imageCard2 = new Layer
	width: 185.66666666666666
	height: 240.0
	image: "images/image_card_2.png"

imageCard3 = new Layer
	width: 185.66666666666666
	height: 155.0
	image: "images/image_card_3.png"

images_LeftImages = Stack.vertical([imageCard1, imageCard2, imageCard3], 8)



imageCard4 = new Layer
	width: 185.66666666666666
	height: 198.0
	image: "images/image_card_4.png"

imageCard5 = new Layer
	width: 185.66666666666666
	height: 222.0
	image: "images/image_card_5.png"

imageCard6 = new Layer
	width: 185.66666666666666
	height: 205.0
	image: "images/image_card_6.png"

images_RightImages = Stack.vertical([imageCard4, imageCard5, imageCard6], 8)

images_ImageView = Stack.horizontal([images_LeftImages, images_RightImages], 6, { x: 8, y: 0 })
images_ImageView2 = Stack.vertical([space(8), images_ImageView, space(8)], 0)


images_Header = Stack.vertical([space(58), images_Title, images_Omnibox, space(10), images_ScrollView, space(20)], 0)

images_Image = Stack.vertical([images_Header, space(8), images_ImageView2], 0)
images_Image.parent = images_NavView.content
images_Image.backgroundColor = feedColor()

makeIsland(images_Header)
makeIsland(images_ImageView2)



# Collection

collection_NavView = init_ModalView()

# collection_Image = new Layer
# 	width: 393.0
# 	backgroundColor: null



# collection_ModalView = new Layer
# 	width: 393.0
# 	height: 852.0
# 	image: "images/modalView_bg.png"

# collection_ModalView.parent = collection_Image


collection_Header = new Layer
	parent: collection_Image
	y: 66
	width: 392.0
	height: 340.0
	borderRadius: 36
	image: "images/collection_Header.png"



collection_Data = new Layer
	y: 240 + 66
	width: 392.0
	height: 791.0
	backgroundColor: "white"

collection_A = new Layer
	width: 392.0
	height: 767.0
	image: "images/collectionA.jpg"

collection_B = new Layer
	width: 392.0
	height: 767.0
	image: "images/collectionB.jpg"

for item in [collection_A, collection_B]
	item.parent = collection_Data

makeIsland(collection_Data)

# collection_Image.height = 66 + 240 + collection_Data.height
# collection_Image.parent = collection_NavView.content

collection_B.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }

collection_TabsA = new Layer
	width: 393.0
	height: 66.0
	image: "images/collection_TabsA.png"

collection_TabsB = new Layer
	width: 393.0
	height: 66.0
	image: "images/collection_TabsB.png"

for item in [collection_TabsA, collection_TabsB]
	item.parent = collection_Data
	if item is collection_TabsB then item.opacity = 0


collection_Image = Stack.vertical([collection_Header, collection_Data], -100)

init_NavigationViewContent(collection_NavView, collection_Image)
collection_NavView.custom.view.image = "images/collection_bg.jpg"


# Camera

camera_NavView = init_NavigationView()
camera_NavView.image = "images/camera_example.jpg"


camera_Image = new Layer
	parent: camera_NavView
	width: 393.0
	height: 852.0
	image: "images/camera.png"

# Places

places_NavView = init_NavigationView()
places_NavView.image = "images/map.jpg"


places_Space = new Layer
	width: 393, height: 58
	backgroundColor: null

places_Title = new Layer
	width: 393.0
	height: 78.0
	image: "images/places_Title.png"

places_Omnibox = new Layer
	width: 393.0
	height: 70.0
	image: "images/places_Omnibox.png"

places_SpaceMap = new Layer
	width: 393, height: 210
	backgroundColor: null



places_TabsScrollView = new ScrollComponent
	width: 393.0, height: 100
	backgroundColor: "white"
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true

places_TabsScrollView.on Events.SwipeRightStart, (event, layer) ->
	if @scrollX > 0 then event.stopPropagation()

places_Scroll = new Layer
	parent: places_TabsScrollView.content
	width: 584.0
	height: 100.0
	image: "images/places_scroll.png"


places_Card0 = init_VideoCard("video/video4.mp4")
places_Card1 = init_VideoCard("video/video1.mp4")
places_Card2 = init_VideoCard("video/video3.mp4")
places_Feed = Stack.vertical([places_Card0, places_Card1, places_Card2], 8)

places_FeedWithTabs = Stack.vertical([places_TabsScrollView, places_Feed])
places_FeedWithTabs.borderRadius = 32
places_FeedWithTabs.clip = true


places_Image = Stack.vertical([places_Space, places_Title, places_Omnibox, places_SpaceMap, places_FeedWithTabs], 0)
places_Image.backgroundColor = null
places_Image.parent = places_NavView.content




# Alice

alice_NavView = init_NavigationView()
alice_NavView.backgroundColor = feedColor()

alice_Space = new Layer
	width: 393, height: 58
	backgroundColor: "white"

alice_Title = new Layer
	width: 393.0
	height: 78.0
	image: "images/alice_title.png"

alice_Navigation = new Layer
	width: 393.0
	height: 144.0
	image: "images/alice_navigation.png"

alice_HeaderView = Stack.vertical([alice_Space, alice_Title, alice_Navigation], 0)
makeIsland(alice_HeaderView)



alice_Chat = new Layer
	width: 393.0
	height: 718.0
	image: "images/alice_chat.png"


alice_TabsScrollView = new ScrollComponent
	width: 393.0, height: 62
	backgroundColor: "white"
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true

alice_TabsScrollView.on Events.SwipeRightStart, (event, layer) ->
	if @scrollX > 0 then event.stopPropagation()

alice_Tabs = new Layer
	parent: alice_TabsScrollView.content
	width: 760.0
	height: 62.0
	image: "images/alice_tabs.png"

alice_SpaceBottom = new Layer
	width: 393, height: 12
	backgroundColor: "white"

alice_Feed = Stack.vertical([alice_Chat, alice_TabsScrollView, alice_SpaceBottom], 0)
alice_Feed.borderRadius = 20
alice_Feed.clip = true


alice_Image = Stack.vertical([alice_HeaderView, alice_Feed, space(120)], 8)
alice_Image.backgroundColor = null
alice_Image.parent = alice_NavView.content


aliceBottomBar = new Layer
	width: 393.0
	height: 128.0
	image: "images/alice_BottomBar.png"
	parent: alice_NavView
	y: Align.bottom




# Search

search_NavView = init_SearchNavigationView()
search_NavView.backgroundColor = feedColor()

search_Space = new Layer
	width: 393, height: 58
	backgroundColor: "white"

searchTitle = new Layer
	width: 393.0
	height: 84.0
	image: "images/search_title.png"

searchTabs = new Layer
	width: 448.0
	height: 54.0
	image: "images/search_tabs.png"

search_Space2 = new Layer
	width: 393, height: 8
	backgroundColor: "white"

search_HeaderView = Stack.vertical([search_Space, searchTitle, searchTabs, search_Space2], 0)
search_HeaderView.parent = search_NavView
search_HeaderView.clip = true
search_HeaderView.borderRadius = 20

search_HeaderView.on Events.SwipeDownStart, (event, layer) ->
	flow.showPrevious()



search_BackButton = new Button
	size: 76, y: 60
	parent: search_HeaderView
	backgroundColor: null

search_BackButton.handler = (event, layer) -> flow.showPrevious()


search_SuggestButton = new Button
	width: 393 - 76 * 2, y: 60
	height: 76, x: Align.center
	parent: search_HeaderView
	backgroundColor: null

search_SuggestButton.handler = (event, layer) ->
	search_States.stateSwitch("hidden")
	keyboard.animate("shown")




searchResult01 = new Layer
	width: 393.0
	height: 792.6666666666666
	image: "images/search_result01.png"

searchResult02 = new Layer
	width: 393.0
	height: 198.33333333333331
	image: "images/search_result02.png"

searchResult03 = new Layer
	width: 393.0
	height: 191.33333333333331
	image: "images/search_result03.png"

search_ResultView = Stack.vertical([searchResult01, searchResult02, searchResult03], 8)
search_ResultView.clip = true
search_ResultView.borderRadius = 20

searchOld = new Layer
	width: 393.0
	height: 625.0
	image: "images/search_old.png"
	borderRadius: 20

search_States = Stack.horizontal([search_ResultView, searchOld], 0)
search_States.backgroundColor = null
search_States.states =
	"hidden": { x: -393 }
	"shown": { x: 0 }
search_States.stateSwitch("hidden")

search_States.onTap ->
	search_States.stateSwitch("shown")
	keyboard.animate("hidden")



search_Empty = new Layer
	width: 393, height: search_HeaderView.height
	backgroundColor: null

search_Image = Stack.vertical([search_Empty, search_States], 8)
search_Image.backgroundColor = null
search_Image.parent = search_NavView.content



keyboard = new Layer
	parent: search_NavView
	width: 393.0
	height: 323.0
	image: "images/keyboard.png"

keyboard.states = 
	"shown": { y: Align.bottom }
	"hidden": { y: Align.bottom(340) }
keyboard.stateSwitch("hidden")


search_NavView.content.on Events.SwipeStart, ->
	keyboard.animate("hidden")