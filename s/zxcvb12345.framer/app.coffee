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
ShoppingData = require "ShoppingData"

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

start_DomainView = new Layer
	parent: start_Image
	width: 393, height: 252
	y: 134
	backgroundColor: "white"

shoppingLink = new Button
	parent: start_DomainView
	width: 168.0, height: 168.0
	x: 28
	image: "images/shoppingLink.png"

placesLink = new Button
	parent: start_DomainView
	width: 168.0
	height: 84.0
	x: 196
	image: "images/placeLink.png"

aliceLink = new Button
	parent: start_DomainView
	width: 84.0
	height: 84.0
	image: "images/aliceLink.png"
	x: 28, y: 168

cameraLink = new Button
	parent: start_DomainView
	width: 84.0
	height: 84.0
	image: "images/cameraLink.png"
	x: 112, y: 168

videoLink = new Button
	parent: start_DomainView
	width: 168.0
	height: 168.0
	image: "images/videoLink.png"
	x: 196, y: 84


# Handlers

shoppingLink.handler = (event, layer) ->
	handler_OpenView(shopping_NavView)
	shopping_ShopScrollView.scrollX = 0

videoLink.handler = (event, layer) -> handler_OpenView(video_NavView)

cameraLink.handler = (event, layer) -> handler_OpenView(camera_NavView)
placesLink.handler = (event, layer) -> handler_OpenView(places_NavView)
aliceLink.handler = (event, layer) -> handler_OpenView(alice_NavView)



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
start_Image = Stack.vertical([start_Title, start_DomainView, start_Omnibox, start_Feed], 0)
start_Image.parent = start_NavView.content

start_NavView












# Shopping

shopping_NavView = init_NavigationView()
# shopping_NavView.backgroundColor = "EFF1F5"

shopping_Space = new Layer
	width: 393, height: 58
	backgroundColor: "white"

shopping_Title = new Layer
	width: 393.0
	height: 82.0
	image: "images/shopping_Title.png"

shopping_Omnibox = new ButtonOmnibox
	width: 393.0
	height: 60.0
	image: "images/video_Omnibox.png"

shopping_Navigation = new Layer
	width: 393.0
	height: 98.0
	image: "images/shopping_navigation.png"

shopping_Breaker = new Layer
	width: 393, height: 44
	backgroundColor: "white"
	image: "images/breaker.png"

shopping_ShopScrollView = new ScrollComponent
	width: 393.0, height: 112-12
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




shopping_leftStack = Stack.vertical(ShoppingData.data.left)
shopping_rightStack = Stack.vertical(ShoppingData.data.right)
shopping_Stack = Stack.horizontal([shopping_leftStack, shopping_rightStack], 8, { x: 16, y: 0 })

shopping_Image = Stack.vertical([shopping_Space, shopping_Title, shopping_Omnibox, shopping_Navigation, shopping_ShopScrollView, shopping_Breaker, shopping_Stack], 0)
shopping_Image.parent = shopping_NavView.content
shopping_NavView.updateContent()




# Shop

shop_NavView = init_NavigationView()

shop_Image = new Layer
	parent: shop_NavView.content
	width: 393.0
	height: 1348.0
	image: "images/shop_image.png"
	


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

channel_NavView = init_NavigationView()
channel_NavView.backgroundColor = "EFF1F5"

channel_Space = new Layer
	width: 393, height: 58
	backgroundColor: "white"

channelTitle = new Layer
	width: 393.0
	height: 78.0
	image: "images/channel_title.png"

channelInfo = new Layer
	width: 393.0
	height: 254.0
	image: "images/channel_info.png"

channel_HeaderView = Stack.vertical([channel_Space, channelTitle, channelInfo], 0)
channel_HeaderView.borderRadius = 20
channel_HeaderView.clip = true



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
channel_FeedView.borderRadius = 20
channel_FeedView.clip = true

channel_Image = Stack.vertical([channel_HeaderView, channel_FeedView], 8)
channel_Image.backgroundColor = null
channel_Image.parent = channel_NavView.content





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
alice_NavView.backgroundColor = "EFF1F5"

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
alice_HeaderView.borderRadius = 20
alice_HeaderView.clip = true



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
search_NavView.backgroundColor = "EFF1F5"

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