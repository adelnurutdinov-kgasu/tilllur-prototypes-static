Input = require 'input'
SVGData = require 'SVGIcon'
EDIT_MODE = false

# Figma View
figmaView = new Layer
	width: 375
	height: 812
	backgroundColor: "white"
	clip: true


{ Preview } = require "PreviewComponent"




header = new Layer
	parent: figmaView
	width: 375
	height: 96
	image: "images/header.png"

header.states =
	"edit":
		opacity: 1
		y: 0
	"base":
		opacity: 0
		y: 100
	
header.stateSwitch("base")

headerLeftButton = new Layer
	width: 100
	height: header.height
	parent: header
	backgroundColor: "null"

headerLeftButton.on Events.Tap, ->
	hideSuggest()


headerRightButton = new Layer
	width: 100
	height: header.height
	parent: header
	x: header.width - 100
	backgroundColor: "null"

headerRightButton.on Events.Tap, (event, layer) ->
	EDIT_MODE = false
	hideEditMode()



topSection = new Layer
	parent: figmaView
	width: 375
	height: 168
	image: "images/top.png"
	y: 35

topSection.states =
	"edit":
		y: 36 - 100
# 		opacity: 0
	"base":
		y: 36
# 		opacity: 1
	
topSection.stateSwitch("base")


bottomSection = new Layer
	parent: figmaView
	width: 375
	height: 424
	image: "images/bottomView.png"

bottomSection.states =
	"edit":
		y: 416 - 100
	"base":
		y: 416
	
bottomSection.stateSwitch("base")



# new Preview { view: figmaView }
new Preview { view: figmaView }

# Names

siteNames = ["afisha", "autoru", "chats", "disk", "drive", "eda", "health", "mail", "market", "money", "music", "notifications", "taxi", "tickets", "traffic", "weather", "zen"]

defaultNames = ["weather", "traffic", "mail", "notifications", "chats", "taxi", "eda", "disk", "kinopoisk", "#0", "#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9", "#10"]

suggestNames = siteNames.filter (x) ->
	defaultNames.indexOf(x) == -1

SELECTED_NAME = "#0"
EMPTY_INDEX = 20


getName = (layerName) ->
	if layerName == "afisha" then return "Afisha"
	else if layerName == "autoru" then return "Cars"
	else if layerName == "chats" then return "Chats"
	else if layerName == "disk" then return "Disk"
	else if layerName == "drive" then return "Drive"
	else if layerName == "eda" then return "Food"
	else if layerName == "health" then return "Healph"
	else if layerName == "kinopoisk" then return "Kinopoisk"
	else if layerName == "mail" then return "Mail"
	else if layerName == "maps" then return "Maps"
	else if layerName == "market" then return "Market"
	else if layerName == "money" then return "Money"
	else if layerName == "music" then return "Music"
	else if layerName == "notifications" then return "New"
	else if layerName == "taxi" then return "Taxi"
	else if layerName == "tickets" then return "Tickets"
	else if layerName == "traffic" then return "8"
	else if layerName == "weather" then return "+2°"
	else if layerName == "zen" then return "Zen"
	return ""
	
# print getName("afisha")

getImage = (layerName) ->
	if layerName == "afisha" then return SVGData.afishaSVG
	else if layerName == "autoru" then return SVGData.autoruSVG
	else if layerName == "chats" then return SVGData.chatsSVG
	else if layerName == "disk" then return SVGData.diskSVG
	else if layerName == "drive" then return SVGData.driveSVG
	else if layerName == "eda" then return SVGData.edaSVG
	else if layerName == "health" then return SVGData.healthSVG
	else if layerName == "kinopoisk" then return SVGData.kinopoiskSVG
	else if layerName == "mail" then return SVGData.mailSVG
	else if layerName == "market" then return SVGData.marketSVG
	else if layerName == "money" then return SVGData.moneySVG
	else if layerName == "music" then return SVGData.musicSVG
	else if layerName == "notifications" then return SVGData.notificationsSVG
	else if layerName == "taxi" then return SVGData.taxiSVG
	else if layerName == "tickets" then return SVGData.ticketsSVG
	else if layerName == "traffic" then return SVGData.trafficSVG
	else if layerName == "weather" then return SVGData.weatherSVG
	else if layerName == "zen" then return SVGData.zenSVG
	return ""

selectedSites = []

for defaultSite in defaultNames
	selectedSites.push(defaultSite)
	siteNames = siteNames.filter (x) -> x != defaultSite


#  Controller

selectPositionHandler = (event, layer) ->
	if !EDIT_MODE
		EDIT_MODE = true
		showEditMode()
	
	SELECTED_NAME = layer.parent.name
	checkAllCells()


deleteIconHandler = (event, layer) ->
	SELECTED_NAME = layer.parent.name
	
	addToAvailableCell("#" + EMPTY_INDEX++)
	composeSuggestSites(0)
	checkAllCells()


addToNavigationBar = (event, layer) ->
	addToAvailableCell(layer.parent.name)
	
	suggestNames = suggestNames.filter (x) -> x != layer.parent.name
	composeSuggestSites()
	checkAllCells()


checkAllCells = () ->
	allLayers = navigationPage1.children.concat(navigationPage2.children)
	for cell in allLayers
		checkCell(cell)


addToSuggest = (nameToAdd) ->
	if nameToAdd.indexOf("#") == -1
		suggestNames = [nameToAdd].concat(suggestNames)


addToAvailableCell = (newLayerName) ->
	
	allLayers = navigationPage1.children.concat(navigationPage2.children)
	currentPlace = allLayers.filter (x) -> x.name == SELECTED_NAME
	
	if currentPlace.length > 0
		currentSiteLayer = currentPlace[0]
		currentSiteLayer.name = newLayerName
		
		currentImageLayer = currentSiteLayer.children.filter (x) -> x.name == "imageView"
		currentImageLayer[0].image = "images/icons/" + newLayerName + ".png"
		
		currentTextLayer = currentSiteLayer.children.filter (x) -> x.name == "textView"
		currentTextLayer[0].text = newLayerName
		
		
		addToSuggest(SELECTED_NAME)
		SELECTED_NAME = newLayerName
	

showEditMode = () ->
	for item in [navigationView, header, topSection, bottomSection]
		item.animate("edit", curve: Spring(damping: 1), time: 0.5)
	
	for item in [topSection]
		item.animate(opacity: 0, options: { time: 0.3 })
	
	sheetView.animate("shown", curve: Spring(damping: 1), time: 0.5)
	
hideEditMode = () ->
	checkAllCells()
	
	for item in [navigationView, topSection, bottomSection]
		item.animate("base", curve: Spring(damping: 1), time: 0.5)
	
	header.animate("base", time: 0.1)
	
	for item in [topSection]
		item.animate(opacity: 1, options: { time: 0.3 })
	
	sheetView.animate("hidden", curve: Spring(damping: 1), time: 0.5)



# Navigation View

navigationView = new PageComponent
	parent: figmaView
	width: 375
	height: 16*3 + 69*2 + 12 + 20
	y: 104 - 16
	backgroundColor: "null"
	scrollVertical: false
	originX: 1
	contentInset: 
		left: 7

navigationView.states =
	"edit":
		y: 100
	"base":
		y: 200
	
navigationView.stateSwitch("base")


navigationEmptyPage1 = new Layer
	backgroundColor: "null"
	parent: navigationView.content
	width: 360
	height: navigationView.height

navigationEmptyPage2 = new Layer
	backgroundColor: "null"
	parent: navigationView.content
	width: 375
	x: 360
	height: navigationView.height



navigationPage1 = new Layer
	backgroundColor: "null"
	parent: navigationView.content
	width: 360
	height: navigationView.height

navigationPage2 = new Layer
	backgroundColor: "null"
	parent: navigationView.content
	width: 375
	x: 360
	height: navigationView.height







dotView = new Layer
	width: 8*3
	height: 12
	parent: navigationView
	y: 196
	x: Align.center(-4)
	backgroundColor: "null"

dot1 = new Layer
	parent: dotView
	size: 8
	borderRadius: "100%"
	backgroundColor: "#DDD"

dot2 = new Layer
	parent: dotView
	size: 8
	x: 16
	borderRadius: "100%"
	backgroundColor: "#DDD"

for item in [dot1, dot2]
	item.states =
		"hidden": { backgroundColor: "#DDD" }
		"shown": { backgroundColor: "#222" }

dot1.stateSwitch("shown")


navigationView.on "change:currentPage", ->
	if navigationView.currentPage == navigationView.content.children[0]
		dot1.animate("shown", time: 0.2)
		dot2.animate("hidden", time: 0.2)
	else
		dot2.animate("shown", time: 0.2)
		dot1.animate("hidden", time: 0.2)



# Cell

checkCell = (cellLayer) ->
	siteName = cellLayer.name
	for child in cellLayer.children
		if child.name == "imageView"
			child.svg = getImage(siteName)
			
		else if child.name == "selectedBorder"
			if !EDIT_MODE
				child.stateSwitch("hidden")
			else if siteName == SELECTED_NAME
				child.stateSwitch("shown")
			else
				child.stateSwitch("hidden")
		
		else if child.name == "textView"
			child.text = getName(siteName)
		
		else if child.name = "tickView"
			if !EDIT_MODE
				child.stateSwitch("hidden")
			else if siteName.indexOf("#") == -1
				child.stateSwitch("shown")
			else
				child.stateSwitch("hidden")





createCell = (siteName) ->
	siteLayer = new Layer
		width: 66
		height: 69
		backgroundColor: "rgba(0,0,0,0.2)"
		backgroundColor: "null"
		name: siteName
	
	siteLayer.states =
		"shown":
			opacity: 1
		"hidden":
			opacity: 0.7
	
	imageView = new SVGLayer
		parent: siteLayer
		x: 9
		size: 48
		svg: getImage(siteName)
# 		borderRadius: 8
# 		image: "images/icons/" + siteName + ".png"
		name: "imageView"
	
	
	imageView.on Events.Tap, (event, layer) ->
		selectPositionHandler(event, layer)
	
	textView = new TextLayer
		parent: siteLayer
		fontSize: 14
		width: 69
		fontFamily: Utils.loadWebFont("Nunito")
		fontWeight: 500
		letterSpacing: 0.2
		textAlign: "center"
		color: "black"
		padding:
			top: 48 + 7
		text: getName(siteName)
		opacity: 0.8
		name: "textView"
		
	
	selectedBorder = new Layer
		size: 54
		parent: siteLayer
		image: "images/selected border.png"
		x: 6
		y: -3
		name: "selectedBorder"
	
	selectedBorder.states =
		"hidden": { opacity: 0 }
		"shown": { opacity: 1 }
	
	selectedBorder.stateSwitch("hidden")
	
	if siteName == SELECTED_NAME
		selectedBorder.stateSwitch("shown")
	
	
	tickView = new Layer
		parent: siteLayer
		size: 20
		y: -10
		image: "images/tick.png"
		name: "tickView"
		propagateEvents: true
	
	tickView.states =
		"shown":
			opacity: 1
		"hidden":
			opacity: 0
	
	tickView.stateSwitch("shown")
	
	tickView.on Events.Tap, (event, layer) ->
		deleteIconHandler(event, layer)
	
	
	if siteName.indexOf("#") == -1
# 		textView.text = siteName
	else
		tickView.stateSwitch("hidden")

	
	checkCell(siteLayer)
	
	return siteLayer





createEmptyCell = () ->
	siteLayer = new Layer
		width: 66
		height: 69
		backgroundColor: "rgba(0,0,0,0.2)"
		backgroundColor: "null"
		name: "empty"
	
	siteLayer.states =
		"shown":
			opacity: 1
		"hidden":
			opacity: 0.7
	
	imageView = new Layer
		parent: siteLayer
		x: 9
		size: 48
		borderRadius: 8
		image: "images/icons/empty.png"
	
	return siteLayer






createSuggestCell = (siteName) ->
	siteLayer = new Layer
		width: 66
		height: 69
		backgroundColor: "rgba(0,0,0,0.2)"
		backgroundColor: "null"
		name: siteName
	
	siteLayer.states =
		"shown":
			opacity: 1
		"hidden":
			opacity: 0.7
	
	imageView = new SVGLayer
		parent: siteLayer
		x: 9
		size: 48
		svg: getImage(siteName)
# 		borderRadius: 8
# 		image: "images/icons/" + siteName + ".png"
		name: "imageView"
	
	
	imageView.on Events.Tap, (event, layer) ->
		addToNavigationBar(event, layer)
	
	textLayer = new TextLayer
		parent: siteLayer
		text: "re"
		fontSize: 14
		width: 69
		fontFamily: Utils.loadWebFont("Nunito")
		fontWeight: 500
		letterSpacing: 0.2
		textAlign: "center"
		color: "black"
		padding:
			top: 48 + 7
		text: getName(siteName)
		opacity: 0.8
	
	for item in [0..10]
		if siteName == "#" + item then textLayer.opacity = 0
	
	return siteLayer


composeEmptySites = () ->	
	for i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		currentLayer = createEmptyCell()
		currentLayer.parent = navigationEmptyPage1
		currentLayer.x = i % 5 * (66) + 11
		currentLayer.y = ((i - i % 5) / 5) * (69 + 16) + 16
		
		currentLayer = createEmptyCell()
		currentLayer.parent = navigationEmptyPage2
		currentLayer.x = i % 5 * (66) + 11
		currentLayer.y = ((i - i % 5) / 5) * (69 + 16) + 16


composeSites = () ->
	allLayers = navigationPage1.children.concat(navigationPage2.children)
	for item in allLayers
		for child in item
			child.destroy()
		item.destroy()
	
	for currentName, i in selectedSites
		currentLayer = createCell(currentName)
		if i >= 10
			i = i - 10
			currentLayer.parent = navigationPage2
		else
			currentLayer.parent = navigationPage1
			
		currentLayer.x = i % 5 * (66) + 11
		currentLayer.y = ((i - i % 5) / 5) * (69 + 16) + 16


composeEmptySites()
composeSites()



# Suggest

sheetView = new Layer
	parent: figmaView
	width: 375
	height: 812
	backgroundColor: "white"
	borderRadius: 24
	clip: true
	shadowY: -4
	shadowBlur: 10
	shadowColor: "rgba(0,0,0,0.1)"

sheetView.states =
	"shown":
		y: 320
	"hidden":
		y: 812 + 20
	"search":
		y: 80

sheetView.stateSwitch("hidden")
# sheetView.stateSwitch("shown")




searchBar = new Layer
	parent: sheetView
	width: 375- 40
	height: 47
	x: 20
	y: 19
	backgroundColor: "#C4C4C4"
	opacity: 0.2
	borderRadius: 12



headerRecent = new Layer
	parent: sheetView
	width: 375
	height: 118
	y: 2
	image: "images/headerInside.png"
	x: 8
# 	image: "images/header recent.png"

headerRecent.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }

headerRecent.stateSwitch("shown")



suggestView = new ScrollComponent
	scrollVertical: false
	parent: sheetView
	width: 375
	height: 16 + 69 + 16
	y: 107
	contentInset: 
		right: 11
		left: 10

suggestView.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }

suggestView.stateSwitch("shown")



storeEntrance = new Layer
	parent: sheetView
	width: 334
	height: 150
	image: "images/store.png"
	y: 219
	x: Align.center

storeEntrance.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }

storeEntrance.stateSwitch("shown")




# Input

addInput = new Input.Input
	placeholder: "Search apps"
	virtualKeyboard: false
	placeholderColor: "rgba(0,0,0,0.2)"
	textColor: "rgba(0,0,0,1)"
	backgroundColor: "rgba(0,0,0,0)"
	lineHeight: 1
	width: 360 - 32 * 2
	height: 52 / 3 * 2
	parent: sheetView
	y: 15
	x: 24

addInput.style =
	fontSize: "" + (16 * 3) + "px"

if !Utils.isMobile()
	addInput.style =
		fontSize: "16px"

addInput.onFocus ->
	showSuggest()
# 	print "0: #{@value}"

addInput.onBlur ->
# 	sheetView.animate("shown", curve: Spring(damping: 1), time: 0.5)
# 	print "1: #{@value}"

addInput.on "keyup", ->
	typedSize = @value.length
	
	if typedSize > 0 and typedSize <= 4
		for item in [s0, s1, s2]
			item.stateSwitch("shown")
	else if typedSize > 4 and typedSize <= 6
		for item in [s0, s1]
			item.stateSwitch("shown")
		s2.stateSwitch("hidden")
	else if typedSize > 6 and typedSize <=9
		s0.stateSwitch("shown")
		for item in [s1, s2]
			item.stateSwitch("hidden")
	else
		for item in [s0, s1, s2]
			item.stateSwitch("hidden")


addKinopoisk = () ->
	hideSuggest()
	
	if SELECTED_NAME == "kinopoisk" then return
	
	allLayers = navigationPage1.children.concat(navigationPage2.children)
	kinopoiskLayer = allLayers.filter (x) -> x.name == "kinopoisk"
	if kinopoiskLayer.length > 0
		currentImageLayer = kinopoiskLayer[0].children.filter (x) -> x.name == "imageView"
		currentImageLayer[0].image = "images/icons/empty.png"
		
		currentTextLayer = kinopoiskLayer[0].children.filter (x) -> x.name == "textView"
		currentTextLayer[0].text = "#" + EMPTY_INDEX++
		kinopoiskLayer[0].name = "#" + EMPTY_INDEX
	
	checkAllCells()
	
# 	SELECTED_NAME = "kinopoisk"
	addToAvailableCell("kinopoisk")
	
	suggestNames = suggestNames.filter (x) -> x != "kinopoisk"
	composeSuggestSites()
	checkAllCells()




Events.wrap(addInput.form).addEventListener "submit", ->
	addInput.value = ""
	addKinopoisk()


keyboard = new Layer
	parent: figmaView
	width: 375
	height: 400
	backgroundColor: "ECEFF0"

keyboard.states =
	"shown":
		y: figmaView.height - 300
	"hidden":
		y: figmaView.height

keyboard.stateSwitch("hidden")

if !Utils.isDesktop()
	keyboard.opacity = 0



keyboardImage = new Layer
	parent: keyboard
	width: 375
	height: 260
	image: "images/keyboard.png"



suggestAnswerView = new Layer
	parent: sheetView
	y: 72
	width: 360
	height: 64 * 3
	backgroundColor: "null"

suggestAnswerView.states =
	"shown": { opacity: 1, y: 72 }
	"hidden": { opacity: 0, y: 400 }

suggestAnswerView.stateSwitch("hidden")


s0 = new Layer
	image: "images/suggest/s0.png"

s0.on Events.Tap, ->
	addInput.value = ""
	addKinopoisk()

s1 = new Layer
	y: 64
	image: "images/suggest/s1.png"

s2 = new Layer
	y: 64 * 2
	image: "images/suggest/s2.png"

for item in [s0, s1, s2]
	item.parent = suggestAnswerView
	item.height = 64
	item.width = 375
	
	item.states =
		"hidden": { opacity: 0 }
		"shown": { opacity: 1 }
	
	item.stateSwitch("hidden")


showSuggest = () ->
	sheetView.animate("search", curve: Spring(damping: 1), time: 0.5)
	keyboard.animate("shown", curve: Spring(damping: 1), time: 0.5)
	suggestAnswerView.stateSwitch("shown", curve: Spring(damping: 1), time: 0.5)
	
	suggestView.animate("hidden", curve: Spring(damping: 1), time: 0.2)
	headerRecent.animate("hidden", curve: Spring(damping: 1), time: 0.2)
	storeEntrance.animate("hidden", curve: Spring(damping: 1), time: 0.2)

hideSuggest = () ->
	keyboard.animate("hidden", curve: Spring(damping: 1), time: 0.5)
	sheetView.animate("shown", curve: Spring(damping: 1), time: 0.5)
	suggestAnswerView.stateSwitch("hidden", curve: Spring(damping: 1), time: 0.5)
	
	suggestView.animate("shown", curve: Spring(damping: 1), time: 0.5)
	headerRecent.animate("shown", curve: Spring(damping: 1), time: 0.5)
	storeEntrance.animate("shown", curve: Spring(damping: 1), time: 0.5)



bottombar = new Layer
	parent: figmaView
	width: 376
	height: 83
	y: Align.bottom
	image: "images/bottombar.png"

bottombar.placeBehind(sheetView)


composeSuggestSites = (scrollIndex = 1) ->
	savedScroll = suggestView.scrollX
	
	for item in suggestView.content.children
		for child in item
			child.destroy()
		item.destroy()
	
	for currentName, i in suggestNames
		currentLayer = createSuggestCell(currentName)
		currentLayer.parent = suggestView.content
		currentLayer.x = i * (66) + 11
		currentLayer.y = 16
	
	suggestView.updateContent()
	suggestView.scrollX = savedScroll
	
	if scrollIndex == 0
		suggestView.scrollToPoint(
			x: 0, y: 0
			true
			curve: Bezier.ease, time: 0.5
		)
	

composeSuggestSites()

#

Home_Indicator = new Layer
	parent: figmaView
	width: 375
	height: 34
	image: "images/Home%20Indicator.png"
	y: Align.bottom

Status_Bar = new Layer
	parent: figmaView
	width: 375
	height: 44
	image: "images/Status%20Bar.png"


statusBar = new Layer
	parent: figmaView, width: figmaView.width, height: 28, backgroundColor: "white"