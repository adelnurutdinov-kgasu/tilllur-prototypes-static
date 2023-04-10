document.body.style.cursor = "auto"
Utils.insertCSS('@import url(css/project.css)')

# States
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 1366
	height: 720
	opacity: 1
	backgroundColor: "rgba(250.75000405311584, 250.75000405311584, 250.75000405311584, 1)"


mordaLeftPanel = new Layer
	name: "mordaLeftPanel"
	parent: figmaView
	x: 0
	y: 233
	width: 223
	height: 487
	image: "images/figma/mordaLeftPanel.png"

mordaInfo = new Layer
	name: "mordaInfo"
	parent: figmaView
	x: 0
	y: 233
	width: 223
	height: 487
	opacity: 1
	image: "images/figma/mordaInfo.png"


mordaFeed = new Layer
	name: "mordaFeed"
	parent: figmaView
	x: 363
	y: 198
	width: 640
	height: 600
	image: "images/figma/mordaFeed.png"

header = new Layer
	name: "header"
	parent: figmaView
	x: 0
	y: 0
	width: 1366
	height: 64
	opacity: 1
	image: "images/figma/header.png"


arrowView = new Layer
	name: "arrowView"
	parent: figmaView
	x: 0
	y: 134
	width: 1366
	height: 64
	image: "images/figma/arrowView.png"

searchIcon = new Layer
	name: "searchIcon"
	parent: figmaView
	x: 279
	y: 142
	width: 48
	height: 48
	image: "images/figma/searchIcon.png"

logoStart = new Layer
	name: "logoStart"
	parent: figmaView
	x: 615
	y: 54
	width: 136
	height: 40
	image: "images/figma/logoStart.png"


settings = new Layer
	name: "settings"
	parent: figmaView
	x: 0
	y: 0
	width: 1366
	height: 64
	image: "images/figma/settings.png"


resultView = new Layer
	name: "resultView"
	parent: figmaView
	x: 0
	y: 0
	width: 1366
	height: 64
	image: "images/figma/resultView.png"


clear = new Layer
	name: "clear"
	parent: figmaView
	x: 1038
	y: 8
	width: 48
	height: 48
	image: "images/figma/clear.png"


searchFeed = new Layer
	name: "searchFeed"
	parent: figmaView
	x: 389
	y: 72
	width: 588
	height: 763
	image: "images/figma/searchFeed.png"

searchLeftPanel = new Layer
	name: "searchLeftPanel"
	parent: figmaView
	x: 24
	y: 99
	width: 93
	height: 145
	image: "images/figma/searchLeftPanel.png"

suggestView = new Layer
	name: "suggestView"
	parent: figmaView
	x: 0
	y: 0
	width: 1366
	height: 480
	image: "images/figma/suggestView.png"

suggestTitlesZero = new Layer
	name: "suggestTitlesZero"
	parent: figmaView
	x: 293
	y: 72
	width: 700
	height: 264
	image: "images/figma/suggestTitlesZero.png"


suggestTitlesOne = new Layer
	name: "suggestTitlesOne"
	parent: figmaView
	x: 293
	y: 72
	width: 700
	height: 264
	image: "images/figma/suggestTitlesOne.png"



sceneLayers = [figmaView, mordaLeftPanel, mordaInfo, mordaFeed, header, arrowView, searchIcon, logoStart, settings, resultView, clear, searchFeed, searchLeftPanel, suggestView, suggestTitlesZero, suggestTitlesOne]

clear.bringToFront()

for item in sceneLayers
	item.states =
		"hidden":  { opacity: 0 }
		"half": { opacity: 0.5 }
		"shown": { opacity: 1 }
	item.stateSwitch("hidden")
	
	item.animationOptions =
		curve: Spring(damping: 1)
		time: 0.5
	
	if item is figmaView or item is header or item is mordaInfo
		item.stateSwitch("shown")
	

for item in [suggestTitlesOne, suggestTitlesZero]
	item.parent = suggestView


fix = new Layer
	width: 400
	height: 40
	backgroundColor: "white"
	parent: resultView
	x: Align.center
	y: Align.center

# Input

inputLayer = new Layer
	parent: figmaView
	x: 60 + 269
	width: 800
	backgroundColor: "null"
	html: "<input id='myInput' placeholder='найдётся всё' multiple type='text' style='background-color: rgba(255, 24, 24, 0); width: 680px; height: 64px; font-size: 16px; resize: vertical; outline: none; text-align: left;'>"

inputLayer.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
inputLayer.stateSwitch("hidden")





Events.wrap(inputLayer.querySelector("#myInput")).addEventListener "focus", ->
	alignInputLeft()
	inputLayer.querySelector("#myInput").select()
	
	value = inputLayer.querySelector("#myInput").value
	if value == "" then suggestState.stateSwitch("zero")
	else suggestState.stateSwitch("typing")
	

Events.wrap(inputLayer.querySelector("#myInput")).addEventListener "input", ->
	value = inputLayer.querySelector("#myInput").value
	
	if value == "" then suggestState.stateSwitch("zero")
	else suggestState.stateSwitch("typing")
	
	updateSuggest(value)


Events.wrap(inputLayer.querySelector("#myInput")).addEventListener "submit", ->
		alignInputCenter()

Events.wrap(window).addEventListener "keydown", (event) ->
	if event.keyCode is 13 then submitInput()
	else if event.keyCode is 27 then blurInput()


isClearInput = () ->
	return inputLayer.querySelector("#myInput").value == ""

clearInput = () ->
	inputLayer.querySelector("#myInput").value = ""

alignInputCenter = () ->
	inputLayer.querySelector("#myInput").style["text-align"] = "center"

alignInputLeft = () ->
	inputLayer.querySelector("#myInput").style["text-align"] = "left"
# 	inputLayer.querySelector("#myInput").style["text-align"] = "center"

submitInput = () ->
	feedState.stateSwitch("search")
	suggestState.stateSwitch("shown")
	
	inputLayer.querySelector("#myInput").blur()
	alignInputCenter()
	
	value = inputLayer.querySelector("#myInput").value	
	if value == "" then showMorda() else showSearch()



trim = (string) ->
	if string == undefined then return ""
	return string.replace /\s+$/g, ""

updateSuggest = (text) ->
	text = trim(text)
	
	len = text.length
	dataSomeAddon = dataOneAddon.slice(0, 7)
	
	if len > 17 then dataSomeAddon = dataOneAddon.slice(5, 12)
	else if len > 13 then dataSomeAddon = dataOneAddon.slice(4, 11)
	else if len > 8 then dataSomeAddon = dataOneAddon.slice(3, 10)
	else if len > 5 then dataSomeAddon = dataOneAddon.slice(2, 9)
	else if len > 3 then dataSomeAddon = dataOneAddon.slice(1, 8)
	
	if text == ""
		for textZero, i in dataZero
			lineStackView.children[i].children[1].text = textZero
	else
		for textAddon, i in dataSomeAddon
			lineStackView.children[i].children[1].text = "#{text} #{textAddon}"
			if i == 0
				lineStackView.children[i].children[1].text = "#{text}"
	







yaButton = new Layer
	size: 54
	x: 270
	backgroundColor: "null"
	parent: figmaView



# Suggest


lineStackView = new Layer
	parent: suggestView
	x: Align.center
	y: 64
	width: 828
	height: 360 - 64
	backgroundColor: "null"



createSuggestLineSearch = (text) ->
	lineView = createSuggestLine(text)
	
	lineView.onTap ->
		if !isClearInput() then submitInput()
	
	searchText = new TextLayer
		text: " — найти в Яндексе"
		parent: lineView
		color: "black"
		fontSize: 16
		lineHeight: 1.25
		x: lineView.children[1].width + 60
		y: Align.center
		opacity: 0.5
		fontFamily: "YS Web Regular"
	
	lineView.children[1].on "change:text", ->
		addonLine = @parent.children[2]
		addonLine.x = @width + 60
		if @text == dataZero[0] then addonLine.opacity = 0
		else addonLine.opacity = 0.5
	
	lineView.children[1].text = dataZero[0]
	
	return lineView



createSuggestLine = (text) ->
	lineView = new Layer
		width: 828
		height: 40
		backgroundColor: "rgba(0,0,0,0)"
	
	search = new Layer
		parent: lineView
		width: 24
		height: 24
		image: "images/search.png"
		x: 24
		y: Align.center
	
	text = new TextLayer
		parent: lineView
		color: "black"
		fontSize: 16
		lineHeight: 1.25
		x: 61
		y: Align.center
		text: text
		fontFamily: "YS Web Regular"
# 		padding: 
# 			top: 10
	
	return lineView
	

dataZero = [
	"как смотреть сериалы",
	"какой курс доллара",
	"найти кроссовки для футбола",
	"купить билет в кино",
	"лучшие книги в 2021 году",
	"шаман кинг 2021 смотреть",
	"новый алгоритм в поиске"
]

dataOneAddon = [
	"еды и товаров",
	"в Москве",
	"онлайн",
	"бесплатно",
	"спланировать заранее",
	"как лучше",
	"бесплатно",
	
	"Лавка",
	"на каждый день",
	"как выбрать",
	"заказать на дом",
	"только свежие блюда"
]

for titleZero, i in dataZero
	if i == 0 then line = createSuggestLineSearch(titleZero)
	else line = createSuggestLine(titleZero)
	line.parent = lineStackView
	line.y = 40 * i
	


{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 8, visible: false }



# Feeds

showMorda = () ->
	for layer in [mordaLeftPanel, mordaFeed, logoStart, arrowView, searchIcon]
		layer.animate("shown")
	
	for item in [searchFeed, searchLeftPanel, resultView]
		item.stateSwitch("hidden")
	

showSearch = () ->
# 	for layer in [suggestView, suggestTitlesOne, suggestTitlesZero]
# 		layer.stateSwitch("hidden")
	
	
	for item in [mordaFeed, mordaLeftPanel, logoStart, arrowView, searchIcon]
		item.stateSwitch("hidden")
	
	for item in [searchFeed, searchLeftPanel, resultView]
		item.stateSwitch("shown")
	

feedState = new Layer
	opacity: 0

feedState.states =
	"morda": { opacity: 0 }
	"search": { opacity: 0 }

feedState.on Events.StateSwitchStart, (from, to) ->
	if from != to
		if to is "morda" then showMorda()
		else if to is "search" then showSearch()

feedState.stateSwitch("morda")





suggestState = new Layer
	opacity: 0

suggestState.states =
	"hidden": { opacity: 0 }
	"zero": { opacity: 0 }
	"typing": { opacity: 0 }
	"shown": { opacity: 0 }


suggestState.on Events.StateSwitchStart, (from, to) ->
	if from != to
		
		if to == "hidden"
			inputLayer.stateSwitch("hidden")
			suggestView.stateSwitch("hidden")
			clear.stateSwitch("hidden")
		
		else if to == "zero"
			inputLayer.stateSwitch("shown")
			suggestView.stateSwitch("shown")
			clear.stateSwitch("hidden")
		
		else if to == "typing"
			inputLayer.stateSwitch("shown")
			suggestView.stateSwitch("shown")
			clear.stateSwitch("shown")
		
		else if to == "shown"
			alignInputCenter()
			inputLayer.stateSwitch("shown")
			suggestView.stateSwitch("hidden")
			clear.stateSwitch("shown")

		
		
		
	if (from == "hidden" or from == "shown") and (to == "zero" or to == "typing")
		if feedState.states.current.name == "morda"
			item.animate("half") for item in [mordaFeed, mordaLeftPanel]
		else item.animate("half") for item in [searchFeed, searchLeftPanel] 
	
	else if (from == "zero" or from == "typing") and (to == "hidden" or to == "shown")
		if feedState.states.current.name == "morda"
			item.animate("shown") for item in [mordaFeed, mordaLeftPanel]
		else item.animate("shown") for item in [searchFeed, searchLeftPanel] 
	
	else if from == "zero" and to == "typing"
		if feedState.states.current.name == "morda"
			item.animate("hidden") for item in [mordaFeed, mordaLeftPanel]
		else item.animate("hidden") for item in [searchFeed, searchLeftPanel]
	
	else if from == "typing" and to == "typing" 
		if feedState.states.current.name == "morda"
			item.animate("hidden") for item in [mordaFeed, mordaLeftPanel]
# 		else item.animate("hidden") for item in [searchFeed, searchLeftPanel]


suggestState.stateSwitch("hidden")




arrowView.onTap ->
	if suggestState.states.current.name == "hidden"
		inputLayer.querySelector("#myInput").focus()


blurInput = () ->
	inputLayer.querySelector("#myInput").blur()
	
	if suggestState.states.current.name == "zero" or suggestState.states.current.name == "typing" or suggestState.states.current.name == "shown"
		
		if feedState.states.current.name == "morda"
			suggestState.stateSwitch("hidden")
		else if feedState.states.current.name == "search"
			suggestState.stateSwitch("shown")

mordaFeed.onTap ->
	blurInput()


yaButton.bringToFront()
yaButton.onTap ->
	feedState.stateSwitch("morda")
	clearInput()
	suggestState.stateSwitch("hidden")


clear.onTap ->
	if suggestState.states.current.name == "typing" or suggestState.states.current.name == "shown"
		clearInput()
		suggestState.stateSwitch("zero")
		updateSuggest()
		inputLayer.querySelector("#myInput").focus()


feedState.stateSwitch("morda")
suggestState.stateSwitch("zero")