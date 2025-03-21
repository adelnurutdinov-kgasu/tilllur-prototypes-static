SVGData = require 'SVGIcon'
Names = require 'Names'

Framer.Extras.Hints.disable()


# Figma View

appView = new Layer
	width: 360
	height: 640
	clip: true
	backgroundColor: "white"
	propagateEvents: true

figmaView = new Layer
	parent: appView
	width: 360
	height: 660
	y: -20
	backgroundColor: "white"
	clip: true






header = new Layer
	parent: figmaView
	width: 360
	height: 72
	image: "images/header.png"

header.states =
	"edit":
		opacity: 1
	"base":
		opacity: 0
	
header.stateSwitch("edit")

headerLeftButton = new Layer
	width: 100
	height: header.height
	parent: header
	backgroundColor: "null"

# headerLeftButton.on Events.Tap, ->
# 	hideSuggest()


headerRightButton = new Layer
	width: 100
	height: header.height
	parent: header
	x: header.width - 100
	backgroundColor: "null"

headerRightButton.on Events.Tap, (event, layer) ->
	try
		window.webkit.messageHandlers.exit.postMessage("exit");




# DATA

# 0...20
cellLayers = []
suggestCellLayers = []

# Входной вектор
inputNames = []

# Полный вектор
allNames = ["afisha", "autoru", "chats", "disk", "drive", "eda", "health", "mail", "market", "money", "music", "notifications", "taxi", "tickets", "traffic", "weather", "zen", "zen-design", "zen-tele", "taxi-home", "kinopoisk"]

# Предложения: вычетание векторов
suggestNames = []



selectedIndex = 0

setSelectedIndex = (value) ->
	if value >= 0 and value < 20 then selectedIndex = value else selectedIndex = 0

getCellIndex = (cellLayer) ->
	return cellLayers.indexOf(cellLayer)

isSelectedCell = (cellLayer) ->
	return selectedIndex == getCellIndex(cellLayer)


# CREATE


createAllEmptyCells = () ->	
	for i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		currentLayer = createEmptyCell()
		currentLayer.parent = navigationEmptyPage1
		currentLayer.x = i % 5 * (66) + 11
		currentLayer.y = ((i - i % 5) / 5) * (69 + 16) + 16
		
		currentLayer = createEmptyCell()
		currentLayer.parent = navigationEmptyPage2
		currentLayer.x = i % 5 * (66) + 11
		currentLayer.y = ((i - i % 5) / 5) * (69 + 16) + 16


createAllCells = () ->
	if inputNames.length != 20 then print "ERROR DENSITY"
	
	for currentName, i in inputNames
		currentLayer = createCell()
		cellLayers.push(currentLayer)
		
		if i >= 10
			i = i - 10
			currentLayer.parent = navigationPage2
		else
			currentLayer.parent = navigationPage1
		
		currentLayer.x = i % 5 * (66) + 11
		currentLayer.y = ((i - i % 5) / 5) * (69 + 16) + 16


# UPDATE

createSuggestCell = (index) ->
	currentLayer = createCell(suggestCellID = true)
	suggestCellLayers.push(currentLayer)
	currentLayer.parent = suggestView.content
	
	currentLayer.x = index * (66) + 11
	currentLayer.y = 16


deleteSuggestCell = (cellLayer) ->
	suggestCellLayers = suggestCellLayers.filter (layer) -> layer != cellLayer
	
	cellLayer.parent = null
	for item in cellLayer.children
		for child in item
			child.destroy()
		item.destroy()
	cellLayer.destroy()
	

updateSuggestCell = (index) ->
	# если есть ячейка, то обновляем контент для неё
	# нет ячейки, то создаем и обновляем
	# если ячейки лишнии, то удаляем
	
	if suggestCellLayers[index] == null or suggestCellLayers[index] == undefined
		createSuggestCell(index)
	
	updateSuggestCellByIndex(index)
	

updateAllSuggestCells = () ->
	for currentSuggestName, i in suggestNames
		updateSuggestCell(i)
 	
	removeAllEmptySuggestCells(suggestNames.length)
	suggestView.updateContent()


removeAllEmptySuggestCells = (maxIndex) ->
	prepareDeleteArray = []
	for layer, index in suggestCellLayers
		if index >= maxIndex
			prepareDeleteArray.push(layer)
	
	for layer in prepareDeleteArray
		deleteSuggestCell(layer)


updateSuggestCellByIndex = (index) ->
	siteName = suggestNames[index]
	cellLayer = suggestCellLayers[index]
	cellLayer.name = siteName
	
	for child in cellLayer.children
		if child.name == "imageView"
			newName = Names.getImage(siteName)
			if child.svg != newName then child.svg = newName

		else if child.name == "textView"
			newText = Names.getName(siteName)
			if child.text != newText then child.text = newText








updateCell = (cellLayer) ->
	siteName = inputNames[getCellIndex(cellLayer)]
	cellLayer.name = siteName
	
	for child in cellLayer.children
		if child.name == "imageView"
			newName = Names.getImage(siteName)
			if child.svg != newName then child.svg = newName
			
		else if child.name == "selectedBorder"
			if isSelectedCell(cellLayer) then child.stateSwitch("shown")
			else child.stateSwitch("hidden")
		
		else if child.name == "textView"
			newText = Names.getName(siteName)
			if child.text != newText then child.text = newText
		
		else if child.name = "tickView"
			if siteName.indexOf("#") == -1 then child.stateSwitch("shown")
			else child.stateSwitch("hidden")

updateAllCells = () ->
	if inputNames.length != 20 then print "UPDATE ALL FAILED: " + inputNames.length
	for currentCellLayer in cellLayers
		updateCell(currentCellLayer)





# updateCellBorder = (cellLayer) ->
# 	siteName = inputNames[getCellIndex(cellLayer)]
# 	cellLayer.name = siteName
# 	
# 	for child in cellLayer.children
# 		if child.name == "selectedBorder"
# 			if isSelectedCell(cellLayer) then child.stateSwitch("shown")
# 			else child.stateSwitch("hidden")

# updateAllBorders = () ->
# 	return
# 	updateAllCells()





#  CONTROLLER: select, add & delete cells

selectCell = (event, layer) ->
	currentCellLayer = layer.parent
	setSelectedIndex(getCellIndex(currentCellLayer))
	updateAllCells()


deleteCell = (event, layer) ->
	currentCellLayer = layer.parent
	
	# перекинуть в саджест текущую ячейку
	# удалить из нав панели
	
	setSelectedIndex(getCellIndex(currentCellLayer))
	updateAllCells()
	suggestNames = [currentCellLayer.name].concat(suggestNames)
	
	inputNames[selectedIndex] = "#"
	updateCell(cellLayers[selectedIndex])
	updateAllSuggestCells()


addCell = (event, layer) ->
	suggestCellLayer = layer.parent

	# сохранить текущее имя в ячейке
	# взять новое значение и заменить в массиве
	# удалить из саджеста старое значние 
	# отправить в саджест, если с этим ок
	
	prevCellName = inputNames[selectedIndex]
	inputNames[selectedIndex] = suggestCellLayer.name
	
	suggestNames = suggestNames.filter (x) -> x != suggestCellLayer.name
	if prevCellName != "#" then suggestNames = [prevCellName].concat(suggestNames)
	
	updateCell(cellLayers[selectedIndex])
	updateAllSuggestCells()
	
	postMessage()




# CELL: Generic

createCell = (isSuggestCell = false) ->
	
	siteLayer = new Layer
		width: 66
		height: 69
		backgroundColor: "null"
	
	siteLayer.states =
		"shown":
			opacity: 1
		"hidden":
			opacity: 0.7
	
	
	imageView = new SVGLayer
		parent: siteLayer
		x: 9
		size: 48
		backgroundColor: "null"
		name: "imageView"
	
	
	textView = new TextLayer
		parent: siteLayer
		fontSize: 12
		width: 69
		textAlign: "center"
		color: "black"
		padding:
			top: 48 + 7
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
	
	if isSuggestCell then tickView.stateSwitch("hidden")
	else tickView.stateSwitch("shown")
	
	
	
	
	# Handlers
	if !isSuggestCell
		imageView.on Events.Tap, (event, layer) ->
			selectCell(event, layer)
	
		tickView.on Events.Tap, (event, layer) ->
			deleteCell(event, layer)
	else
		imageView.on Events.Tap, (event, layer) ->
			addCell(event, layer)
	
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





# Navigation View

swipeStarted = false

navigationView = new PageComponent
	parent: figmaView
	width: 360
	height: 16*3 + 69*2 + 12
	y: 104 - 16
	backgroundColor: "null"
	scrollVertical: false

navigationView.states =
	"edit":
		y: 104 - 16
	"base":
		y: 220 - 16
	
navigationView.stateSwitch("edit")

navigationView.content.on Events.SwipeStart, ->
	swipeStarted = true

navigationView.on "change:currentPage", ->
	if swipeStarted
		try postNavigationPage()


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



# NATIVE INPUT


compose = (name) ->
	if name == "#" or name == "#selected" then return "#"
	else if allNames.indexOf(name) == -1 then return "#"
	return name

checkY = (layerName) ->
	if allNames.indexOf(layerName) == -1 then return "#"
	return layerName






init = (messageString) ->
	inputNames = messageString.split(",")
	
	# делаем вектор полным
	for i in [0...(20 - inputNames.length)]
		inputNames.push("#")
	
	# создаем вектор для саджеста
	suggestNames = allNames.filter (x) ->
		inputNames.indexOf(x) == -1
	
	# находим выбранный
	setSelectedIndex(inputNames.indexOf("#selected"))
	if selectedIndex > 9 then navigationView.snapToPage(navigationPage2, false)
	else navigationView.snapToPage(navigationPage1, false)
	
	# очищаем входной вектор
	inputNames = inputNames.map (name) -> compose(name)
	




# Suggest

sheetView = new Layer
	parent: figmaView
	width: 360
	height: 640 - 300
	backgroundColor: "white"
	borderRadius: 12
	clip: true
	y: 300
	shadowY: -4
	shadowBlur: 10
	shadowColor: "rgba(0,0,0,0.1)"

# sheetView.states =
# 	"shown":
# 		y: 300
# 
# sheetView.stateSwitch("shown")
# # sheetView.stateSwitch("shown")




searchBar = new Layer
	parent: sheetView
	width: 320
	height: 40
	x: 20
	y: 16
	backgroundColor: "#C4C4C4"
	opacity: 0.2
	borderRadius: 8


searhText = new TextLayer
	parent: sheetView
	text: "Поиск по приложениям"
	fontSize: 14
	color: "rgba(0,0,0,0.4)"
	padding:
		top: 10 + 17
		left: 12 + 20


headerRecent = new Layer
	parent: sheetView
	width: 360
	height: 28
	y: 40 + 16 + 14
	image: "images/header recent.png"

headerRecent.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }

headerRecent.stateSwitch("shown")



suggestView = new ScrollComponent
	scrollVertical: false
	parent: sheetView
	backgroundColor: "null"
	width: 360
	height: 16 + 69 + 16
	y: 104 - 16
	contentInset: 
		right: 11

suggestView.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }

suggestView.stateSwitch("shown")



storeEntrance = new Layer
	parent: sheetView
	width: 360
	height: 132
	y: 196
	image: "images/store entrance.png"

storeEntrance.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }

storeEntrance.stateSwitch("shown")




testMesssage = "weather,traffic,mail,notifications,chats,taxi,eda,disk,kinopoisk,#,#,#,#,#,#,#,#selected,#,#,#"

initPrototype = (nativeMessage = testMesssage) ->
	swipeStarted = false
	init(nativeMessage)
	
	if cellLayers.length == 0
		createAllEmptyCells()
		createAllCells()
		
	updateAllCells()
	updateAllSuggestCells()

initPrototype()







`window.update = function (message) {
	initPrototype(message)
}`

postMessage = () ->
	currentSelectedLayersNames = cellLayers.map (x) -> x.name
	updateMessage = currentSelectedLayersNames.reduce (x, y) -> x + "," + checkY(y)
	
	try
		window.webkit.messageHandlers.update.postMessage(updateMessage);

postNavigationPage = () ->
	pagePositionMessage = ""
	if navigationView.currentPage == navigationEmptyPage1 then pagePositionMessage = "left"
	else if navigationView.currentPage == navigationEmptyPage2 then pagePositionMessage = "right"
	
	try
		window.webkit.messageHandlers.page.postMessage(pagePositionMessage);



{ Preview } = require "PreviewComponent"
new Preview { view: appView, borderRadius: 16 }