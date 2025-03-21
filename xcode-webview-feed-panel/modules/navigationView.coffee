
Names = require 'Names'

# Empty

emptySVG = """<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="5" y="5" width="38" height="38">
<rect x="5" y="5" width="38" height="38" rx="13" fill="#F2F2F2"/>
</mask>
<g mask="url(#mask0)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.8637 17.5227C24.8637 17.0457 24.477 16.6591 24 16.6591V16.6591C23.5231 16.6591 23.1364 17.0457 23.1364 17.5227V23.1363H17.5228C17.0458 23.1363 16.6591 23.523 16.6591 24V24C16.6591 24.4769 17.0458 24.8636 17.5228 24.8636H23.1364V30.4772C23.1364 30.9542 23.5231 31.3409 24 31.3409V31.3409C24.477 31.3409 24.8637 30.9542 24.8637 30.4772V24.8636H30.4773C30.9543 24.8636 31.3409 24.4769 31.3409 24V24C31.3409 23.523 30.9543 23.1363 30.4773 23.1363H24.8637V17.5227Z" fill="black" fill-opacity="0.25"/>
<rect x="5" y="5" width="38" height="38" rx="10" fill="black" fill-opacity="0.05"/>
</g>
</svg>
"""






# Входной вектор
inputNames = []
# ["weather", "traffic", "mail", "notifications", "chats", "taxi", "eda", "disk", "kinopoisk", "#selected", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]

# Полный вектор
allNames = ["afisha", "autoru", "chats", "disk", "drive", "eda", "health", "mail", "market", "money", "music", "notifications", "taxi", "tickets", "traffic", "weather", "zen", "zen-design", "zen-tele", "taxi-home", "kinopoisk"]

# Предложения: вычетание векторов
suggestNames = []

SELECTED_NAME = "#0"
EMPTY_INDEX = 0
EDIT_MODE = false

compose = (name) ->
	if name == "#"
		return "#" + (EMPTY_INDEX++)
	else if name == "#selected"
		SELECTED_NAME = "#" + (EMPTY_INDEX++)
		return SELECTED_NAME
	else if allNames.indexOf(name) == -1
		return "#" + (EMPTY_INDEX++)
	return name

inputNames = inputNames.map (name) -> compose(name)


checkQ = (layerName, selectedName) ->
	if layerName == selectedName
		return "#selected"
	else if allNames.indexOf(layerName) == -1
		return "#"
	return layerName

getAction = (layerName) ->
	if allNames.indexOf(layerName) == -1
		allLayers = navigationPage1.children.concat(navigationPage2.children)
		currentSelectedLayersNames = allLayers.map (x) -> x.name
		initMessage = currentSelectedLayersNames.reduce (x, y) -> x + "," + checkQ(y, layerName)
		
		# print initMessage
		try
			window.webkit.messageHandlers.edit.postMessage(initMessage);
		
	else
		openURL = "https://" + Names.getSite(layerName)
		# print openURL
		try
			window.webkit.messageHandlers.open.postMessage(openURL);



exports.init = (messageString) ->
	inputNames = messageString.split(",")
	for i in [0...(20 - inputNames.length)]
		inputNames.push("#" + (EMPTY_INDEX++))

	suggestNames = allNames.filter (x) ->
		inputNames.indexOf(x) == -1
	
	inputNames = inputNames.map (name) -> compose(name)







# CELL

selectPositionHandler = (event, layer) ->
	# print layer.parent.name
	getAction(layer.parent.name)


checkCell = (cellLayer) ->
	siteName = cellLayer.name
	for child in cellLayer.children
		if child.name == "imageView"
			child.svg = Names.getImage(siteName)
			
		else if child.name == "selectedBorder"
			if !EDIT_MODE
				child.stateSwitch("hidden")
			else if siteName == SELECTED_NAME
				child.stateSwitch("shown")
			else
				child.stateSwitch("hidden")
		
		else if child.name == "textView"
			child.text = Names.getName(siteName)
		
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
		svg: Names.getImage(siteName)
		name: "imageView"
	
	imageView.on Events.Tap, (event, layer) ->
		selectPositionHandler(event, layer)
	
	
	textView = new TextLayer
		parent: siteLayer
		fontSize: 12
		width: 69
		textAlign: "center"
		color: "black"
		padding:
			top: 48 + 7
		text: Names.getName(siteName)
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
	
	# tickView.on Events.Tap, (event, layer) ->
	# 	deleteIconHandler(event, layer)
	
	
	if siteName.indexOf("#") == -1
# 		textView.text = siteName
	else
		tickView.stateSwitch("hidden")

	
	checkCell(siteLayer)
	
	return siteLayer


exports.setPage = (message) ->
	if navigationView == null or navigationView == undefined then return

	if message == "left" then navigationView.snapToPage(navigationEmptyPage1, false)
	else navigationView.snapToPage(navigationEmptyPage2, false)


exports.composeSites = () ->
	if navigationView == null or navigationView == undefined
		navigationView = createView()
		navigationView.name = "navigationView"
	
	composeEmptySites()

	this.updateSites()
	
	return navigationView


exports.updateSites = () ->
	allLayers = navigationPage1.children.concat(navigationPage2.children)
	for item in allLayers
		for child in item
			child.destroy()
		item.destroy()
	
	for currentName, i in inputNames
		currentLayer = createCell(currentName)
		if i >= 10
			i = i - 10
			currentLayer.parent = navigationPage2
		else
			currentLayer.parent = navigationPage1
			
		currentLayer.x = i % 5 * (66) + 11
		currentLayer.y = ((i - i % 5) / 5) * (69 + 16) + 16
















navigationView = null
navigationEmptyPage1 = null
navigationEmptyPage2 = null
navigationPage1 = null
navigationPage2 = null



createView = () ->
	# Navigation View

	navigationView = new PageComponent
	# 	parent: figmaView
		width: 360
		height: 16 * 3 + 69 * 2 + 20
		y: 104 - 16
		backgroundColor: "white"
		scrollVertical: false
		directionLock: true
		# propagateEvents: false

	navigationView.states =
		"edit":
			y: 104 - 16
		"base":
			y: 220 - 16
		
	navigationView.stateSwitch("base")


	navigationEmptyPage1 = new Layer
		backgroundColor: "null"
		parent: navigationView.content
		width: 360
		height: navigationView.height

	navigationEmptyPage2 = new Layer
		backgroundColor: "null"
		parent: navigationView.content
		width: 360
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
		width: 360
		x: 360
		height: navigationView.height







	dotView = new Layer
		width: 8*3
		height: 12
		parent: navigationView
		y: 188
		x: Align.center()
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
	
	return navigationView

# Create

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
	
	imageView = new SVGLayer
		parent: siteLayer
		x: 9
		size: 48
		svg: emptySVG
		
	
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
	
	return navigationView




# composeEmptySites()