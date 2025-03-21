RADIUS_CARD = 16

# Screen.backgroundColor = "black"


# Shuffle

shuffle = (source) ->
	return source unless source.length >= 2
	for index in [source.length-1..1]
		randomIndex = Math.floor Math.random() * (index + 1)
		[source[index], source[randomIndex]] = [source[randomIndex], source[index]]
	return source

Framer.Extras.Hints.disable()

appsURL = "json/apps.json"
groupsURL = "json/groups.json"

appsData = JSON.parse Utils.domLoadDataSync decodeURIComponent(appsURL)
groupsData = JSON.parse Utils.domLoadDataSync decodeURIComponent(groupsURL)

appsKeys = []
for k,v of appsData
	appsKeys.push(k)

groupKeys = []
for k,v of groupsData
	groupKeys.push(k)



recentViewData = groupsData["recents v2"]
myViewData = groupsData["my apps v2"]
myViewData2 = groupsData["recents v2 right"]

# print groupKeys
# print myViewData2

firstAppKey = recentViewData[0]
emptyCellKey = myViewData[myViewData.length - 1]
recentKeySize = recentViewData.length


# Timeout

delayReference = null

delay = (time, fn, args...) ->
	setTimeout fn, time, args...

# Data

data = ["images/icons/afisha.png",
"images/icons/autoru.png",
"images/icons/chief.png",
"images/icons/disk.png",
"images/icons/drive.png",
"images/icons/eda.png",
"images/icons/edadil.png",
"images/icons/efir.png",
"images/icons/mail.png",
"images/icons/market.png",
"images/icons/mvideo.png",
"images/icons/news.png",
"images/icons/ozon.png",
"images/icons/perek.png",
"images/icons/q.png",
"images/icons/rayon.png",
"images/icons/sport.png",
"images/icons/talents.png",
"images/icons/trains.png",
"images/icons/wildb.png",
"images/icons/yandex.png",
"images/icons/zen-logo.png"]


dataTitles = [
	"Новости",
	"Драйв",
	"Яндекс",
	"Мвидео",
	"Маркет",
	"Авто.ру",
	"Еда",
	"Едадил",
	"Эфир",
	"Такси",
	"Таланты",
	"Дзен",
	"Ozon",
	"Мвидео",
	"Электрички"
]

# Page

screen = new Layer
	width: 360
	height: 640
	backgroundColor: "#eee"
	borderRadius: 12
	clip: true

# screen.center()
# screen.scale = Screen.width / 360

pages = new PageComponent
	parent: screen
	width: 360
	height: 640
	scrollHorizontal: false
	directionLock: true
	originY: 1

page1 = new Layer
	width: 360
	height: 538
	parent: pages.content
	backgroundColor: "white"
	borderRadius: RADIUS_CARD

page2 = new Layer
	width: 360
	height: 400
	y: page1.height
	parent: pages.content
	backgroundColor: "eee"

page3 = new Layer
	width: 360
	height: 640 - page2.height
	y: page1.height + page2.height
	parent: pages.content
	backgroundColor: "eee"

pages.snapToPage(page2, false)



header = new Layer
	parent: screen
	width: 360
# 	y: icon24
	height: 138
	image: "images/header.png"

statusBar = new Layer
	parent: header, width: screen.width, height: 20, backgroundColor: "white"

newsView = new Layer
	parent: page2
	y: 8
	backgroundColor: "white"
	borderRadius: RADIUS_CARD
	width: 360
	height: 468
	image: "images/news%20view.png"

page2.bringToFront()



bottomBar = new Layer
	parent: screen
	width: 360
	height: 48
	y: Screen.height - 48
	image: "images/bottomBar.png"







# Modal View

darker = new Layer
	width: 360
	height: 640
	parent: screen
	backgroundColor: "rgba(0,0,0,0.7)"

darker.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0

darker.stateSwitch("hidden")


modalPageComponent = new PageComponent
	width: 360
	height: 640
	scrollVertical: true
	scrollHorizontal: false
	parent: screen

modalPage1 = new Layer
	width: 360
	height: 640
	backgroundColor: "null"
	parent: modalPageComponent.content

modalPage2 = new Layer
	width: 360
	height: 640
	y: modalPage1.height
	backgroundColor: "null"
	parent: modalPageComponent.content

modalPageComponent.content.ignoreEvents = true



modalGuard = new Layer
	opacity: 0
	size: 1

modalGuard.states =
	"shown":
		y: 0
	"hidden":
		y: 0

modalGuard.stateSwitch("hidden")

modalGuard.on Events.StateSwitchEnd, (from, to) ->
	if to is "shown" and from is "hidden"
		try updateRecents(modalView.name)


modalView = new Layer
	parent: modalPage2
	width: 360
	height: 640
	backgroundColor: "white"
	borderRadius: 16

modalView.states =
	"shown":
		y: 44
	"hidden":
		y: 680

modalView.stateSwitch("shown")

modalPageComponent.content.draggable.overdrag = 0

modalPageComponent.on "change:currentPage", ->
	if modalPageComponent.currentPage == modalPage1
		modalPageComponent.content.ignoreEvents = true
		promoteRecentApp()





modalPageComponent.content.on "change:y", ->
	value = modalPageComponent.scrollY
	darker.opacity = Utils.modulate(value, [0, 640], [0, 1], true)
	
	if value > 580 then modalGuard.stateSwitch("shown")
	else modalGuard.stateSwitch("hidden") 


# modalView.name = "afisha"
# modalPageComponent.snapToPage(modalPage2, false)
modalTitle = new TextLayer
	fontSize: 28
	parent: modalView
	fontWeight: "medium"
	text: ""
	x: 24
	y: 32
	color: "black"

# modalView.on Events.Tap, (event, layer) ->
# 	@animate("hidden", curve: Spring(damping: 1), time: 0.5)
# 
# modalView.on Events.StateSwitchStart, (from, to) ->
# 	darker.animate(to, time: 0.2, delay: 0.1)
# 
# modalView.on Events.StateSwitchEnd, (from, to) ->
# 	if to is "hidden"
# 		updateRecents(@name)



# pages.on "change:currentPage", ->
# # 	print pages.currentPage
# 	if pages.currentPage == page2
# 		delayReference = delay 1500, ->
# 			updateAnimation()
# 
# pages.content.on Events.DragStart, ->
# 	clearTimeout(delayReference)



withIcons = false


# Icon

updateIcon = (iconView, iconKey) ->
	iconData = appsData[iconKey]
	
	# print "?"
	iconView.name = iconKey
	for child in iconView.children
		# print iconData.image
		if child.name == "image"
			child.image = iconData.image
		if child.name == "name"
			child.text = iconData.name



getIcon = (iconKey) ->
	iconData = appsData[iconKey]
	if iconData is undefined
		iconKey = "panel empty"
		iconData = appsData[iconKey]
		
# 	print iconKey
	
	iconView = new Layer
		backgroundColor: "null"
		width: 64
		height: 48 + 4 + 32 + 8
		name: iconKey
	
	iconView.states =
		"shown":
			opacity: 1
			scale: 1
# 			y: 0
		"hidden":
			opacity: 1
			scale: 0.7
# 			y: 16
	
	iconView.stateSwitch("shown")
	
# 	iconView.on Events.StateSwitchEnd, (from, to) ->
# 		if to is "hidden"
# 			@animate("shown", time: 0.2)

	
	iconView.on Events.Tap, (event, layer) ->
# 		stopTouches()
		
		if @name == firstAppKey
			return
			if pages.currentPage == page1 then nextPage = page2
			else nextPage = page1
			pages.snapToPage(nextPage)
		else if @name == emptyCellKey
		else
			modalView.name = @name
			modalTitle.text = appsData[@name].name
			modalPageComponent.content.ignoreEvents = false
			modalPageComponent.snapToPage(modalPage2, time: 0.2)
# 			modalView.animate("shown", curve: Spring(damping: 1), time: 0.5)
# 			updateRecents(@name)
	
	
	
	iconLayer = new Layer
		name: "image"
		parent: iconView
		size: 48
		borderRadius: 16
		image: iconData.image
		x: 8
	
	iconLayer.states =
		"touch":
			scale: 0.7
		"shown":
			scale: 1
		"hidden":
			scale: 0.7
	
	iconLayer.on Events.TouchStart, ->
		@animate("touch", time: 0.2)
	
	iconLayer.on Events.TouchEnd, ->
		@animate("shown", time: 0.2)

	
	
	
	iconTitle = new TextLayer
		name: "name"
		fontSize: 13
		lineHeight: 1.2
		parent: iconView
		width: 64
		height: 72
		y: 48 + 4
		height: 32
		text: iconData.name
		textAlign: "center"
		color: "black"
	
	return iconView

# App Views

recentAppView = new PageComponent
	directionLock: true
# 	propagateEvents: false
	parent: page1
	width: 360
	height: 48 + 4 + 32 + 8
	y: page1.height - 42 - 48
	scrollVertical: false
	originX: 0
	contentInset:
		left: 22
		right: 22

# recentAppView.states =
# 	"right":
# 		x: 100
# 	"left":
# 		x: 0
# 
# recentAppView.stateSwitch("left")


createRecentApps = (appArray) ->
	appIconArray = []
	fiveAppViewArray = []
	fiveAppPageCount = appArray.length / 5
	
	for i in [0...fiveAppPageCount]
		fiveAppViewArray.push new Layer
			width: 64 * 5
			height: 72
			backgroundColor: "null"
	
	for currentAppKey, i in appArray
		xIndex = i % 5
		yIndex = (i - i % 5) / 5
		tempIcon = getIcon(currentAppKey)
		tempIcon.parent = fiveAppViewArray[yIndex]
		tempIcon.x = xIndex * 64
		appIconArray.push(tempIcon)
	
	return { "group": fiveAppViewArray, "array": appIconArray } 

tempAppData = createRecentApps(recentViewData)
recentAppIconArray = tempAppData.array
for item, i in tempAppData.group
	item.parent = recentAppView.content
	item.x = (64 * 5) * i

recentAppView.updateContent()



myAppView = new Layer
	width: 360
	height: page1.height
	parent: page1
	backgroundColor: "null"
# 	name: ".hidden"

myAppViewPages = new PageComponent
	width: 360
	height: 92 * 3
	y: 148
	parent: myAppView
	directionLock: true
	scrollVertical: false

myPage1 = new Layer
	width: 360
	height: myAppViewPages.height
	parent: myAppViewPages.content
	backgroundColor: "null"

myPage2 = new Layer
	width: 360
	height: myAppViewPages.height
	parent: myAppViewPages.content
	x: 360-32-8
	backgroundColor: "null"

nextAppData = createRecentApps(myViewData)
myAppIconArray = nextAppData.array
for item, i in nextAppData.group
	item.parent = myPage1
	item.y = (48 + 4 + 32 + 8) * i
	item.x = 22


nextAppData2 = createRecentApps(myViewData2)
myAppIconArray2 = nextAppData2.array
for item, i in nextAppData2.group
	item.parent = myPage2
	item.y = (48 + 4 + 32 + 8) * i
	item.x = 22

recentAppView.updateContent()




updateRecentsView = (newKeyArray) ->
# 	recentAppView.snapToPage(recentAppView.content.children[0])
	pages.snapToPage(page2, false)
	stopTouches()
	
	# print "???"
	for iconView, i in recentAppIconArray
		currentKey = newKeyArray[i]
		updateIcon(iconView, currentKey)
	
	preparePromote()




preparePromote = () ->
	if recentAppView.currentPage == recentAppView.content.children[0]
# 		recentAppView.stateSwitch("right")
	else
		recentAppView.snapToPage(recentAppView.content.children[1], false)


promoteRecentApp = () ->
	Utils.delay 0.2, ->
		if recentAppView.currentPage != recentAppView.content.children[0]
			recentAppView.snapToPage(recentAppView.content.children[0], true, { curve: Spring(damping: 1), time: 0.6 })
			Utils.delay 0.6, ->
				showLastApp()
		else
			showLastApp()



showLastApp = () ->
	for child in recentAppIconArray[1].children
		if child.name == "image"
			child.animate("hidden", curve: Spring(damping: 1), time: 0.2)
			
			Utils.delay 0.2, ->
				for child in recentAppIconArray[1].children
					if child.name == "image"
						child.animate("shown", curve: Spring(damping: 1), time: 0.5)

# Functions


updateRecents = (newKey) ->
	
	cleanedData = recentViewData.filter (currentKey) -> currentKey != newKey and currentKey != firstAppKey
	
# 	print "CDL: #{cleanedData.length}"
	
	recentViewDataNew = []
	recentViewDataNew.push(firstAppKey)
	recentViewDataNew.push(newKey)
# 	print "CDL: #{recentViewDataNew.length}"
	recentViewData = recentViewDataNew.concat(cleanedData)
# 	print "ALL: #{recentViewData.length}"
# 	print "_"
	
	updateRecentsView(recentViewData)


# forceRecentKeySize = (localArray) ->
# 	if localArray.length < recentKeySize
# 		localArray.push()


updateAnimation = () ->
	for item, i in recentApps
		if i == 0 then continue
		item.animate("hidden", time: 0.2, delay: i * 0.03)



breaker = new Layer
	parent: myAppView
	y: 428
	width: 360-32*2
	height: 1
	borderRadius: 1
	x: 32
	backgroundColor: "black"
	opacity: 0.1

pipka = new Layer
	parent: myAppView
	width: 60
	height: 4
	borderRadius: 4
	backgroundColor: "rgba(0,0,0,0.2)"
	x: Align.center
	y: myAppView.height - 4 * 2


restoreIcon = (item) ->
	for child in item.children
		if child.name == "image" and child.scale != 1
			child.animate("shown", time: 0.2)

stopTouches = () ->
	for item in recentAppIconArray
		restoreIcon(item)
	for item in myAppIconArray
		restoreIcon(item)
	for item in myAppIconArray2
		restoreIcon(item)

screen.on Events.TouchEnd, ->
	stopTouches()

recentAppView.content.on Events.DragStart, ->
	stopTouches()

pages.content.on Events.DragStart, ->
	stopTouches()

myAppViewPages.content.on Events.DragStart, ->
	stopTouches()

# screen.on Events.TouchStart, ->
# 	print "End"
# 	for item in recentAppIconArray
# 		item.animate("shown", time: 0.2)



{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 8, statusBar_theme: "light", forceAndroidBar: true }