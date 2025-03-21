
debugMode = false
siteNameArray = ["news.yandex.ru", "ru.wikipedia.org"]
siteArray = []

Utils.insertCSS('@import url(css/project.css)')

# Console

printArray = []
printLines = 6

printTop = (logText) ->
	if consoleLayer.opacity == 0 then return
	printArray.push(printArray.length + ": " + logText)
	
	if (printArray.length - printLines < 0) then printStart = 0 else printStart = printArray.length - printLines
	if printStart + printLines > printArray.length then printFinish = printArray.length else printFinish = printStart + printLines
	
	consoleLayer.text = ""
	for p in [printStart...printFinish]
		consoleLayer.text += printArray[p]
		if p != printFinish - 1 then consoleLayer.text += "\n"

# svgIcons

baseColor = "#45474C"
newTabColor = "#FFF"


getChatSVG = (svgColor) ->
	svgChat = new SVGLayer
		width: 66
		height: 54
		svg: """<svg width="66" height="54" viewBox="0 0 66 54" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M32.9996 31.9996C29.9621 31.9996 27.4996 29.5372 27.4996 26.4996C27.4996 23.4621 29.9621 20.9996 32.9996 20.9996C36.0372 20.9996 38.4996 23.4621 38.4996 26.4996C38.4996 29.5372 36.0372 31.9996 32.9996 31.9996ZM32.9996 30.2996C30.9009 30.2996 29.1996 28.5983 29.1996 26.4996C29.1996 24.4009 30.9009 22.6996 32.9996 22.6996C35.0983 22.6996 36.7996 24.4009 36.7996 26.4996C36.7996 28.5983 35.0983 30.2996 32.9996 30.2996Z" fill="#{svgColor}"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M39.608 16.6038C34.888 13.4514 28.5985 14.0715 24.585 18.085C20.5715 22.0985 19.9514 28.388 23.1038 33.108C26.2562 37.828 32.3035 39.6645 37.5483 37.4946L37.5609 37.4894L37.5733 37.4838C37.969 37.3059 38.4089 37.2508 38.8363 37.3255C38.902 37.3375 38.9609 37.3503 39.0014 37.3604L41.9389 38.224L41.9534 38.2278C43.1635 38.5403 44.3988 37.8179 44.7202 36.6105C44.8255 36.2209 44.8252 35.8104 44.7195 35.4209L44.7171 35.4121L43.8495 32.4552C43.744 31.9912 43.7915 31.5053 43.9852 31.0702L43.99 31.0593L43.9946 31.0483C46.1645 25.8035 44.328 19.7562 39.608 16.6038ZM25.8578 19.3578C29.2642 15.9515 34.6023 15.4251 38.6083 18.1007C42.6113 20.7742 44.1706 25.901 42.3355 30.35C41.9828 31.1493 41.9011 32.0421 42.1032 32.8922L42.1086 32.915L42.9841 35.8991C43.0045 35.9786 43.0039 36.0621 42.9824 36.1414L42.9809 36.1469C42.9151 36.3956 42.6635 36.5459 42.4143 36.4876L39.4799 35.6249L39.4661 35.6213C39.3715 35.5967 39.2607 35.5732 39.1555 35.554L39.1505 35.5531C38.3721 35.4161 37.5705 35.5147 36.8486 35.8361C32.3999 37.6703 27.2739 36.1109 24.6007 32.1083C21.9251 28.1023 22.4515 22.7642 25.8578 19.3578Z" fill="#{svgColor}"/>
	</svg>
	"""

getTabSVG = (svgColor) ->
	svgTab = new SVGLayer
		width: 66
		height: 54
		svg: """<svg width="66" height="54" viewBox="0 0 66 54" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M25 23C25 19.2288 25 17.3431 26.1716 16.1716C27.3431 15 29.2288 15 33 15C36.7712 15 38.6569 15 39.8284 16.1716C41 17.3431 41 19.2288 41 23V31C41 32.2606 41 33.3106 40.9562 34.1936C41.0267 34.1857 41.0955 34.1773 41.1626 34.1683C42.0633 34.0472 42.4091 33.8432 42.6263 33.626C42.8436 33.4087 43.0476 33.0629 43.1687 32.1622C43.2964 31.2125 43.3 29.9333 43.3 27.9996V25.9996C43.3 24.0659 43.2964 22.7867 43.1687 21.837C43.0476 20.9363 42.8436 20.5905 42.6263 20.3733C42.4091 20.156 42.0633 19.952 41.1626 19.8309C41.0955 19.8219 41.0267 19.8135 40.9562 19.8057C40.9233 19.1425 40.8658 18.5735 40.765 18.0801C42.1959 18.1961 43.1366 18.4794 43.8284 19.1712C45 20.3428 45 22.2284 45 25.9996V27.9996C45 31.7708 45 33.6565 43.8284 34.828C43.1367 35.5198 42.1959 35.8031 40.765 35.9191C40.5986 36.734 40.3142 37.3426 39.8284 37.8284C38.6569 39 36.7712 39 33 39C29.2288 39 27.3431 39 26.1716 37.8284C25.6858 37.3426 25.4014 36.734 25.235 35.9191C23.8041 35.8031 22.8634 35.5198 22.1716 34.828C21 33.6565 21 31.7708 21 27.9996V25.9996C21 22.2284 21 20.3428 22.1716 19.1712C22.8634 18.4794 23.8041 18.1961 25.235 18.0801C25.1342 18.5735 25.0767 19.1425 25.0438 19.8057C24.9733 19.8135 24.9045 19.8219 24.8374 19.8309C23.9367 19.952 23.5909 20.156 23.3737 20.3733C23.1564 20.5905 22.9524 20.9363 22.8313 21.837C22.7036 22.7867 22.7 24.0659 22.7 25.9996V27.9996C22.7 29.9333 22.7036 31.2125 22.8313 32.1622C22.9524 33.0629 23.1564 33.4087 23.3737 33.626C23.5909 33.8432 23.9367 34.0472 24.8374 34.1683C24.9045 34.1773 24.9733 34.1857 25.0438 34.1936C25 33.3106 25 32.2606 25 31V23ZM39.3 23V31C39.3 32.9337 39.2964 34.2129 39.1687 35.1626C39.0476 36.0633 38.8436 36.4091 38.6263 36.6263C38.4091 36.8436 38.0633 37.0476 37.1626 37.1687C36.2129 37.2964 34.9337 37.3 33 37.3C31.0663 37.3 29.7871 37.2964 28.8374 37.1687C27.9367 37.0476 27.5909 36.8436 27.3737 36.6263C27.1564 36.4091 26.9524 36.0633 26.8313 35.1626C26.7036 34.2129 26.7 32.9337 26.7 31V23C26.7 21.0663 26.7036 19.7871 26.8313 18.8374C26.9524 17.9367 27.1564 17.5909 27.3737 17.3737C27.5909 17.1564 27.9367 16.9524 28.8374 16.8313C29.7871 16.7036 31.0663 16.7 33 16.7C34.9337 16.7 36.2129 16.7036 37.1626 16.8313C38.0633 16.9524 38.4091 17.1564 38.6263 17.3737C38.8436 17.5909 39.0476 17.9367 39.1687 18.8374C39.2964 19.7871 39.3 21.0663 39.3 23Z" fill="#{svgColor}"/>
	</svg>
	"""

getBroSVG = (svgColor) ->
	svgBro = new SVGLayer
		width: 66
		height: 54
		svg: """<svg width="66" height="54" viewBox="0 0 66 54" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 19C22 17.3431 23.3431 16 25 16H29C30.6569 16 32 17.3431 32 19V23C32 24.6569 30.6569 26 29 26H25C23.3431 26 22 24.6569 22 23V19ZM23.7998 18.8C23.7998 18.2477 24.2475 17.8 24.7998 17.8H29.1998C29.7521 17.8 30.1998 18.2477 30.1998 18.8V23.2C30.1998 23.7523 29.7521 24.2 29.1998 24.2H24.7998C24.2475 24.2 23.7998 23.7523 23.7998 23.2V18.8ZM34 19C34 17.3431 35.3431 16 37 16H41C42.6569 16 44 17.3431 44 19V23C44 24.6569 42.6569 26 41 26H37C35.3431 26 34 24.6569 34 23V19ZM35.7998 18.8C35.7998 18.2477 36.2475 17.8 36.7998 17.8H41.1998C41.7521 17.8 42.1998 18.2477 42.1998 18.8V23.2C42.1998 23.7523 41.7521 24.2 41.1998 24.2H36.7998C36.2475 24.2 35.7998 23.7523 35.7998 23.2V18.8ZM25 28C23.3431 28 22 29.3431 22 31V35C22 36.6569 23.3431 38 25 38H29C30.6569 38 32 36.6569 32 35V31C32 29.3431 30.6569 28 29 28H25ZM24.7998 29.8C24.2475 29.8 23.7998 30.2477 23.7998 30.8V35.2C23.7998 35.7523 24.2475 36.2 24.7998 36.2H29.1998C29.7521 36.2 30.1998 35.7523 30.1998 35.2V30.8C30.1998 30.2477 29.7521 29.8 29.1998 29.8H24.7998ZM34 31C34 29.3431 35.3431 28 37 28H41C42.6569 28 44 29.3431 44 31V35C44 36.6569 42.6569 38 41 38H37C35.3431 38 34 36.6569 34 35V31ZM35.7998 30.8C35.7998 30.2477 36.2475 29.8 36.7998 29.8H41.1998C41.7521 29.8 42.1998 30.2477 42.1998 30.8V35.2C42.1998 35.7523 41.7521 36.2 41.1998 36.2H36.7998C36.2475 36.2 35.7998 35.7523 35.7998 35.2V30.8Z" fill="#{svgColor}"/>
</svg>
"""

# Screen.backgroundColor = "black"
Framer.Extras.Hints.disable()

simulationStop = false

dragEndTime = Utils.getTime()
dragEndDelay = 0.1

# Магия
BS = {
	w: 360, wg: 180
	h: 640, hg: 200
}

# Омнибокс
PS = { h: 64 }

boxSideGap = BS.hg # Сдвиг модуляции для бокового состояния
siteGap = 24 # Расстояние между табами

screen = new Layer
	width: BS.w
	height: BS.h
	image: "images/alice.jpg"

scaleFactor = Screen.width / screen.width
# screen.scale = scaleFactor
# screen.center()


# Preview

previewView = new Layer
	parent: screen
	width: BS.wg * 6
	height: BS.h + BS.hg * 2
	x: -BS.wg * 2
	y: 0
	opacity: 0
	backgroundColor: "transparent"


bTop = new Layer
	parent: previewView
	width: BS.wg * 4
	height: BS.h
	x: BS.wg
	y: 0
	borderColor: "red"
	borderWidth: 2
	borderRadius: 10
	backgroundColor: "transparent"
	opacity: 0.5

bMid = new Layer
	parent: previewView
	width: BS.wg * 4
	height: BS.h
	x: BS.wg
	y: BS.hg
	borderColor: "green"
	borderWidth: 2
	borderRadius: 10
	backgroundColor: "transparent"
	opacity: 0.5

bBot = new Layer
	parent: previewView
	width: BS.wg * 4
	height: BS.h
	x: BS.wg
	y: BS.hg * 2
	borderColor: "blue"
	borderWidth: 2
	borderRadius: 10
	backgroundColor: "transparent"
	opacity: 0.5

blBot = bBot.copy()
blBot.parent = previewView
blBot.x = bBot.x - BS.wg

brBot = bBot.copy()
brBot.parent = previewView
brBot.x = bBot.x + BS.wg

# Helpers

notDragEnd = () ->
	return (Math.abs(dragEndTime - Utils.getTime()) > dragEndDelay)



isCarouselEvent = () ->
	if box.midY + 44 > bBot.midY then return false else return true

isBottomEvent = () ->
# 	printTop("@@@@@ isBottomEvent: " + box.midY + " " + bBot.midY)
# 	printTop(box.midY <= bBot.midY + 16 and box.midY > bBot.midY - 16)
	return box.midY < bBot.midY + 16 and box.midY > bBot.midY - 16

isModalEvent = () ->
# 	printTop("@@@@@ isModalEvent: " + box.y + " " + mvY)
	return box.y < mvY + 4 and box.y > mvY - 4


# Left : Mid : Right
isLeftEvent = () ->
	return box.midX < brBot.midX + 16 and box.midX > brBot.midX - 16

isMidEvent = () ->
	return box.midX < bBot.midX + 16 and box.midX > bBot.midX - 16

isRightEvent = () ->
	return box.midX < blBot.midX + 16 and box.midX > blBot.midX - 16



isHighterThan = (layer, targetLayer) ->
	return layer.midY < targetLayer.midY

isLowerThan = (layer, targetLayer) ->
	return layer.midY > targetLayer.midY

isToTop = (event) ->
	return event.velocity.y < -0.3

isToBottom = (event) ->
	return event.velocity.y > 0.3




isLefterThan = (layer, targetLayer) ->
	return layer.midX < targetLayer.midX

isRighterThan = (layer, targetLayer) ->
	return layer.midX > targetLayer.midX

isToLeft = (event) ->
	return event.velocity.x < -0.2

isToRight = (event) ->
	return event.velocity.x > 0.2



closestBoxY = (layer, boxArray) ->
	minGap = 10000
	localClosestLayer = null
	
	for item in boxArray
		currentGap = Math.abs(layer.midY - item.midY)
		if currentGap < minGap
			minGap = currentGap
			localClosestLayer = item
	
	return localClosestLayer

closestBoxX = (layer, boxArray) ->
	minGap = 10000
	localClosestLayer = null
	
	for item in boxArray
		currentGap = Math.abs(layer.midX - item.midX)
		if currentGap < minGap
			minGap = currentGap
			localClosestLayer = item
	
	return localClosestLayer




animateBox = (event, type) ->
	simulationStop = true
	
	if event != null then localVelocity = Math.abs(event.velocity.y)
	else localVelocity = 0
	
	inputVelocity = Utils.modulate(localVelocity, [0, 5], [0, 7], true)
# 	localFriction = Utils.modulate(input.value, [0, 1], [50, 100], true)
	
	if type == "top" then inputY = bTop.y
	else if type == "mid" then inputY = bMid.y
	else if type == "bot" then inputY = bBot.y
	
	if type is "top" or type is "mid"
		setTabsScroll(false)
		boxTabSwipeDetected = true
	else
		setTabsScroll(true)
	
	inputAnimation = new Animation box,
		y: inputY, options: { curve: Spring(tension: 600, friction: 70, velocity: inputVelocity)}
	inputAnimation.start()
	simulationStop = false


animateBoxX = (event, type) ->
	simulationStop = true
	
	if event != null then localVelocity = Math.abs(event.velocity.x)
	else localVelocity = 0
	
	inputVelocity = Utils.modulate(localVelocity, [0, 5], [0, 7], true)
# 	localFriction = Utils.modulate(input.value, [0, 1], [50, 100], true)
	
	if type == "left" then inputX = blBot.x
	else if type == "mid" then inputX = bBot.x
	else if type == "right" then inputX = brBot.x
	
# 	if type is "mid"
# 		setTabsScroll(true)
# 		boxTabSwipeDetected = false
# 		simulationStop = true
	
# 	box.animateStop()
	inputAnimation = new Animation box,
		x: inputX, options: { curve: Spring(tension: 600, friction: 70, velocity: inputVelocity)}
	inputAnimation.start()
	simulationStop = false



# Modal View


modalViewInitLayer = null

modalDarkerView = new Layer
	parent: screen
	width: 360
	height: 640
	backgroundColor: "black"

modalDarkerView.states =
	"shown": { opacity: 0.5 }
	"hidden": { opacity: 0 }

modalDarkerView.stateSwitch("hidden")



modalView = new Layer
	parent: screen
	width: 360
	height: 640
	backgroundColor: "transparent"

modalView.states =
	"shown": { y: 0 }
	"hidden": { y: 640 }

modalView.stateSwitch("hidden")

modalView.on Events.StateSwitchStart, (from, to) ->
	if from is "shown" and to is "hidden"
		modalDarkerView.animate("hidden", time: 0.3)
	else if from is "hidden" and to is "shown"
		modalDarkerView.animate("shown", time: 0.3)



modalViewContent = new Layer
	parent: modalView
	width: 360
	height: 640
	y: 38
	borderRadius: 12
	backgroundColor: "white"
	shadowBlur: 16
	shadowColor: "rgba(0,0,0,0.16)"
	clip: true

closeModalView = new Layer
	parent: modalView
	width: 360
	height: 38 + 40 + 40
	backgroundColor: "transparent"

dragPipka = new Layer
	width: 28
	height: 3
	y: 6 + 38
	parent: modalView
	x: Align.center()
	borderRadius: 2


mvTime = 0.5
mvY = bBot.y - (bBot.y - bMid.y) * 0.22

openModal = () ->
	modalView.animate("shown", time: mvTime, curve: Spring(damping: 1))
	
	if isBottomEvent()
		box.animate(y: mvY, options: { time: mvTime, curve: Spring(damping: 1) })


closeModal = () ->
	modalView.animate("hidden", time: mvTime, curve: Spring(damping: 1))
	if isModalEvent()
		box.animate(y: bBot.y, options: { time: mvTime, curve: Spring(damping: 1) })




modalViewTrashContent = new Layer
	parent: modalView
	y: 640








openModalHandler = (event, layer) ->
# 	printTop("OPEN: openModal start")
	modalViewInitLayer = layer
	removeModals()
	
	if isMenuButton(layer) != -1 then createInsideModal()
	else if isInsideButton(layer) != -1
		if layer.parent.parent == site then createInsideModal(2)
		else if layer.parent.parent == siteLeft then createInsideModal(1)
	else if layer == chatButton then createChatModal()
	else if layer == broButton then createBroModal()
	else if layer == aliceButton then createAliceModal()
	
	if layer.states.current.name == "shown"
		closeModal()
		layer.stateSwitch("hidden")
		modalViewInitLayer = null
	else
		openModal()
		layer.stateSwitch("shown")


closeModalHandler = (event, layer) ->
	closeModal()
	
	try modalViewInitLayer.stateSwitch("hidden")
	modalViewInitLayer = null

closeModalView.on(Events.TouchEnd, closeModalHandler)
closeModalView.on(Events.SwipeDown, closeModalHandler)




removeModals = () ->
	for item in modalViewContent.children
		item.parent = modalViewTrashContent


topMenuModalImage = new Layer
	width: 360
	height: 1204/2
	parent: modalViewTrashContent
	image: "images/site%20menu.jpg"

chatModalImage = new Layer
	width: 360
	height: 1204/2
	parent: modalViewTrashContent
	image: "images/chats.jpg"

aliceModalImage = new Layer
	width: 360
	height: 1204/2
	parent: modalViewTrashContent
	image: "images/alice screen.jpg"

# broModalImage = new Layer
# 	width: 360
# 	height: 1204/2
# 	parent: modalViewTrashContent
# 	image: "images/bro screen.jpg"

# insideModalImage = new Layer
# 	width: 360
# 	height: 1204/2
# 	parent: modalViewTrashContent
# 	image: "images/site comments.jpg"


createAliceModal = () ->
	aliceModalImage.parent = modalViewContent

# createSiteMenuModal = () ->
# 	topMenuModalImage.parent = modalViewContent

# createInsideModal = () ->
# 	insideModalImage.parent = modalViewContent

createChatModal = () ->
	chatModalImage.parent = modalViewContent

createBroModal = () ->
	complexMenuScroll.content.y = 0
	menuPages.snapToPage(menuPages.content.children[0], false)
	complexMenuView.parent = modalViewContent
# 	broModalImage.parent = modalViewContent

# Modal View: Inside

complexInsideView = new Layer
	parent: modalViewTrashContent
	width: 360
	height: 602
	backgroundColor: "white"

framerInsideHeader.parent = complexInsideView
framerInsideHeader.x = 0
framerInsideHeader.y = 0

for item, i in framerInsideHeader.children
	if i == 0 then item.fontFamily = "YS Web Regular"
	else item.fontFamily = "YS Web Medium"

# insideHeader = new Layer
# 	parent: complexInsideView
# 	width: 360
# 	height: 104
# 	image: "images/modals/inside header.png"

insideTabButtonView = new Layer
	parent: complexInsideView
	width: 360
	height: 40
	y: 104
	backgroundColor: "white"

for tabImage, i in ["inside tab 1", "inside tab 2", "inside tab 3"]
	
	tabLayer = new Layer
		parent: insideTabButtonView
		height: 40
		backgroundColor: "white"
	
	tabText = new TextLayer
		parent: tabLayer
		fontSize: 15
		letterSpacing: 0.2
		y: 10
		fontWeight: 500
		fontFamily: "YS Web Medium"
	
	if i == 0
		tabLayer.width = 106
		tabText.text = "Действия"
		tabText.x = 24
	else if i == 1
		tabLayer.width = 140
		tabLayer.x = 106
		tabText.text = "Чат  💬 2"
		tabText.x = 10
	else if i == 2
		tabLayer.width = 114
		tabLayer.x = 106 + 110 - 28
		tabText.text = "Отзывы  ⭐️ 4.3"
		tabText.x = 10
	
	for item in [tabText, tabLayer]
		item.states =
			"base": { color: "black" }
			"selected": { color: "#4E66FF" }
		item.stateSwitch("base")
	
	tabLayer.on Events.StateSwitchEnd, (from, to) ->
		@children[0].stateSwitch(to)
	
	tabLayer.on Events.Tap, (event, layer) ->
		for item, i in insideTabButtonView.children
			if item == layer
				item.stateSwitch("selected")
				insideContentPages.snapToPage(insideContentPages.content.children[i])
			else
				item.stateSwitch("base")


insideTabBreaker = new Layer
	width: 360
	height: 10
	backgroundColor: "#F4F5F8"
	parent: complexInsideView
	y: 104 + 40






insideContentPages = new PageComponent
	parent: complexInsideView
	width: 360
	height: 602 - (104 + 40 + 10)
	y: 104 + 40 + 10
	scrollVertical: false
	directionLock: true
# 	propagateEvents: false
	backgroundColor: "#F4F5F8"

insideContentPages.on "change:currentPage", ->
	for item, i in insideContentPages.content.children
		if item == insideContentPages.currentPage
			for tabButton, j in insideTabButtonView.children
				if i == j then tabButton.stateSwitch("selected")
				else tabButton.stateSwitch("base")

# insideContentPages.draggable.propagateEvents = false
# insideContentPages.propagateEvents = false

insidePageLeft = new ScrollComponent
	parent: insideContentPages.content
	size: insideContentPages.size
	scrollHorizontal: false
# 	propagateEvents: false
	directionLock: true
	backgroundColor: "white"

insidePageLeftContent = new Layer
	size: 360
	image: "images/modals/inside actions.png"
	parent: insidePageLeft.content


insidePageMid = new ScrollComponent
	parent: insideContentPages.content
	size: insideContentPages.size
	x: (360 + 16)
	scrollHorizontal: false
# 	propagateEvents: false
	directionLock: true
	backgroundColor: "white"

insidePageMidContent = new Layer
	width: 360
	height: 220
	image: "images/modals/inside chats.png"
	parent: insidePageMid.content

insidePageMidPanel = new Layer
	width: 360
	height: 56
	y: insidePageMid.height - 56
	image: "images/modals/inside chats panel.png"
	parent: insidePageMid


insidePageRight = new ScrollComponent
	parent: insideContentPages.content
	size: insideContentPages.size
	x: (360 + 16) * 2
	scrollHorizontal: false
# 	propagateEvents: false
	directionLock: true
	backgroundColor: "white"
	contentInset: 
		bottom: 40

insidePageRightRatings = new Layer
	width: 360
	height: 230
	image: "images/modals/inside ratings.png"
	parent: insidePageRight.content

insidePageRightBreaker = new Layer
	width: 360
	height: 10
	y: 230
	backgroundColor: "#F4F5F8"
	parent: insidePageRight.content

insidePageRightReviews = new Layer
	width: 360
	height: 444
	y: 240
	image: "images/modals/inside reviews.jpg"
	parent: insidePageRight.content



# insideModalImage — removed

createInsideModal = (activePageId = 0) ->
	for item in insideTabButtonView
		item.stateSwitch("base")
	
	try insideContentPages.snapToPage(insideContentPages.content.children[activePageId], false)
	
	try insideTabButtonView.children[activePageId].stateSwitch("selected")
	
	complexInsideView.parent = modalViewContent

# complexInsideView.parent = null

# Modal View: Menu

complexMenuView = new Layer
	parent: modalViewTrashContent
	width: 360
	height: 602
	backgroundColor: "white"

complexMenuScroll = new ScrollComponent
	parent: complexMenuView
	size: complexMenuView
	scrollHorizontal: false
	directionLock: true
	propagateEvents: false

framerMenuHeader.parent = complexMenuView
framerMenuHeader.x = 0
framerMenuHeader.y = 0

for item, i in framerMenuHeader.children
	if i == 0 then item.fontFamily = "YS Web Medium"
	else item.fontFamily = "YS Web Regular"

framerMenuMessage.parent = complexMenuScroll.content
framerMenuMessage.x = 20
framerMenuMessage.y = 129 - 38

for item in framerMenuMessage.children
	item.fontFamily = "YS Web Regular"


menuPages = new PageComponent
	parent: complexMenuScroll.content
	width: 360
	height: 240
	y: 160
	scrollVertical: false
	directionLock: true
# 	propagateEvents: false

menuPages.on "change:currentPage", ->
	for item, i in menuPages.content.children
		if item == menuPages.currentPage
			for currentDot, j in menuPagesDotsView.children
				if j == i then currentDot.stateSwitch("selected")
				else currentDot.stateSwitch("base")

menuPagesDotsView = new Layer
	parent: menuPages
	width: 8 * 3
	height: 8
	y: 214
	x: Align.center()
	backgroundColor: "transparent"

for item, i in [framerMenuLeft, framerMenuRight]
	dot = new Layer
		parent: menuPagesDotsView
		size: 8
		x: (8 + 8) * i
		borderRadius: 8
	
	dot.states = 
		"base": { backgroundColor: "#DADADA" }
		"selected": { backgroundColor: "#444" }
	
	if i == 0 then dot.stateSwitch("selected") else dot.stateSwitch("base")

framerMenuLeft.parent = menuPages.content
framerMenuLeft.x = 0
framerMenuLeft.y = 0

for item in framerMenuLeft.children
	item.fontFamily = "YS Web Regular"

framerMenuRight.parent = menuPages.content
framerMenuRight.x = 360
framerMenuRight.y = 0

for item in framerMenuRight.children
	item.fontFamily = "YS Web Regular"

framerMenuServices.parent = complexMenuScroll.content
framerMenuServices.x = 0
framerMenuServices.y = 400

for item in framerMenuServices.children
	item.fontFamily = "YS Web Regular"

complexMenuScroll.updateContent()



# B-O-X

box = new Layer
	parent: previewView
	width: bBot.width
	height: bBot.height
	backgroundColor: "green"
	force2d: true
	clip: true

initBoxDraggableSpeed = () ->
	box.draggable.speedX = getBoxDraggableSpeed().x
	box.draggable.speedY = getBoxDraggableSpeed().y

stopBoxDraggableSpeedY = () ->
	box.draggable.speedX = getBoxDraggableSpeed().omniboxX
	box.draggable.speedY = getBoxDraggableSpeed().omniboxY

setBoxTabsDraggableSpeed = () ->
	box.draggable.speedX = getBoxDraggableSpeed().tabsX
	box.draggable.speedY = getBoxDraggableSpeed().tabsY

getBoxDraggableSpeed = () ->
	return { x: 0.3, y: 0.4, tabsX: 1, tabsY: 0.5, omniboxX: 0.5, omniboxY: 0 }

box.draggable.enabled = true
initBoxDraggableSpeed()

box.draggable.constraints =
	x: 0
	y: 0
	width: previewView.width
	height: previewView.height


box.x = BS.wg
box.y = BS.hg * 2



divAliceTarget = null

divChatButton = null
divCarouselTarget = null
divBroButton = null

divBackToSiteLeftButton = null
divBackToSiteRightButton = null
divBackToSiteMidButton = null

# Return from Carousel
box.on Events.TouchEnd, (event, layer) ->
# 	printTop("Box: Touch End")
	
	if event.target == divCarouselTarget or event.target == divAliceTarget or event.target == divBackToSiteLeftButton or event.target == divBackToSiteRightButton or event.target == divBackToSiteMidButton or event.target == divChatButton or event.target == divBroButton
# 		printTop("Skipped for Box: Tabs or Alice")
		return
# 	else
# 		printTop("Box: Real Touch End")
# 		animateBox(null, "bot")






# REAL Buttons
carouselX = 20 + 64 * 2 + BS.wg
carouselY = BS.h - 64 - BS.wg * 2 - 32 - 8

boxButtonView = new Layer
	width: 360
	height: 64
	parent: box
	y: carouselY



aliceButton = new Layer
	parent: boxButtonView
	height: 64
	width: 74
	x: carouselX - (64 + 6) * 2 - 8
	y: 0
	backgroundColor: "violet"

aliceButton.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 1 }
aliceButton.stateSwitch("hidden")

aliceButton.on Events.TouchEnd, (event, layer) ->
# 	printTop("—> Alice: Touch end")
	divAliceTarget = event.target
	
	if notDragEnd()
		openModalHandler(event, layer)


newTabButton = new Layer
	parent: boxButtonView
	height: 64
	width: 74
	x: carouselX + (64 + 6) * 2
	y: 0
	backgroundColor: "yellow"

newTabButton.on Events.TouchEnd, (event, layer) ->
	if notDragEnd()
		animateBoxX(null, "left")
		animateBox(null, "bot")






chatButton = new Layer
	parent: boxButtonView
	size: 64
	x: carouselX - 64 - 6
	backgroundColor: "red"

chatButton.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 1 }
chatButton.stateSwitch("hidden")

chatButton.on Events.TouchEnd, (event, layer) ->
	divChatButton = event.target
	
	if notDragEnd()
		openModalHandler(event, layer)



carouselButton = new Layer
	parent: boxButtonView
	size: 64
	x: carouselX
	backgroundColor: "red"

carouselButton.on Events.TouchEnd, (event, layer) ->
	divCarouselTarget = event.target
	if notDragEnd()
		setTabsScroll(false)
		animateBox(null, "mid")


broButton = new Layer
	parent: boxButtonView
	size: 64
	x: carouselX + 64 + 6
	backgroundColor: "red"

broButton.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 1 }
broButton.stateSwitch("hidden")

broButton.on Events.TouchEnd, (event, layer) ->
	divBroButton = event.target
	
	if notDragEnd()
		openModalHandler(event, layer)












backToSiteButtonView = new Layer
	width: 360
	height: 240
	x: BS.wg
	parent: box
	backgroundColor: "white"

backToSiteButtonView.placeBehind(boxButtonView)

backToSiteButtonView.states =
	"origin": { midX: backToSiteButtonView.midX, midY: backToSiteButtonView.midY }
	
backToSiteMidButton = new Layer
	parent: backToSiteButtonView
	width: 180 + 40
	height: 240
	x: 180/2 - 20
	backgroundColor: "black"
	
backToSiteLeftButton = new Layer
	parent: backToSiteButtonView
	width: 180 / 2 - 20
	height: 240
	x: 0
	backgroundColor: "yellow"

backToSiteRightButton = new Layer
	parent: backToSiteButtonView
	width: 180 / 2 - 20
	height: 240
	x: backToSiteMidButton.x + backToSiteMidButton.width
	backgroundColor: "yellow"


backToSiteLeftButton.on Events.TouchEnd, (event, layer) ->
	divBackToSiteLeftButton = event.target
	
	if notDragEnd()
		
		if isMidEvent()
			animateBox(null, "bot")
			animateBoxX(null, "right")
		
		else if isRightEvent()
			animateBox(null, "bot")
			animateBoxX(null, "mid")


backToSiteRightButton.on Events.TouchEnd, (event, layer) ->
	divBackToSiteRightButton = event.target
	
	if notDragEnd()
		
		if isMidEvent()
			animateBox(null, "bot")
			animateBoxX(null, "left")
		
		else if isLeftEvent()
			animateBox(null, "bot")
			animateBoxX(null, "mid")


backToSiteMidButton.on Events.TouchEnd, (event, layer) ->
	divBackToSiteMidButton = event.target
	
	if notDragEnd()
		if isRightEvent()
			animateBox(null, "bot")
			animateBoxX(null, "left")
		
		if isMidEvent()
			animateBox(null, "bot")
			animateBoxX(null, "mid")
		
		else if isLeftEvent()
			animateBox(null, "bot")
			animateBoxX(null, "right")









box.on Events.DragEnd, (event, layer) ->
# 	printTop("Box: Drag End")
	dragEndTime = Utils.getTime()
	
	if isToTop(event)
		if isLowerThan(layer, bBot)
			animateBox(event, "bot")
		else if isHighterThan(layer, bBot) and isLowerThan(layer, bMid)
			animateBox(event, "mid")
		else if isHighterThan(layer, bMid) and isLowerThan(layer, bTop)
			animateBox(event, "top")
# 		else
# 			print "WFT6"
	
	else if isToBottom(event)
		if isHighterThan(layer, bTop)
			animateBox(event, "top")
		else if isLowerThan(layer, bTop) and isHighterThan(layer, bMid)
			animateBox(event, "mid")
		else if isLowerThan(layer, bMid) and isHighterThan(layer, bBot)
			animateBox(event, "bot")
		else
			# Draggin to Bot
			animateBox(event, "bot")
	
	else
		closestLayer = closestBoxY(layer, [bBot, bMid, bTop])
		
		if closestLayer is bBot
			animateBox(null, "bot")
		else if closestLayer is bMid
			animateBox(null, "mid")
		else if closestLayer is bTop
			animateBox(null, "top")
# 		else
# 			print "WFT4"
	
	
	if isToLeft(event)
		if isLefterThan(layer, blBot)
			animateBoxX(event, "left")
		else if isRighterThan(layer, blBot) and isLefterThan(layer, bBot)
			animateBoxX(event, "left")
		else if isRighterThan(layer, bBot) and isLefterThan(layer, brBot)
			animateBoxX(event, "mid")
		else if isRighterThan(layer, brBot)
			animateBoxX(event, "right")
# 		else
# 			print "WFT3"
	
	else if isToRight(event)
		if isRighterThan(layer, brBot)
			animateBoxX(event, "right")
		else if isLefterThan(layer, brBot) and isRighterThan(layer, bBot)
			animateBoxX(event, "right")
		else if isLefterThan(layer, bBot) and isRighterThan(layer, blBot)
			animateBoxX(event, "mid")
		else if isLefterThan(layer, blBot)
			animateBoxX(event, "left")
		else
			# Last time midX was 540
			animateBoxX(event, "mid")
	
	else
		closestLayer = closestBoxX(layer, [brBot, bBot, blBot])
		
		if closestLayer is blBot
			animateBoxX(null, "left")
		else if closestLayer is bBot
			animateBoxX(null, "mid")
		else if closestLayer is brBot
			animateBoxX(null, "right")
# 		else
# 			print "WFT1"

# Experimental Animations

boxTabSwipeDetected = true


box.on Events.AnimationStop, (event, layer) ->
# 	if notDragEnd()
	if (Math.abs(dragEndTime - Utils.getTime()) > dragEndDelay)
		if isMidEvent() or isCarouselEvent()
			boxTabSwipeDetected = true
			initBoxDraggableSpeed()
			setTabsScroll(true)


setTabsScroll = (activeState) ->
# 	if boxTabSwipeDetected
# 		printTop("" + boxTabSwipeDetected + " " + activeState)
	
	if boxTabSwipeDetected == false
		activeState = false
	
	# Bottom Buttons
	carouselButton.ignoreEvents = !activeState
	chatButton.ignoreEvents = !activeState
	broButton.ignoreEvents = !activeState
	
	# Top Buttons
	for item in siteMenuButtonArray
		item.ignoreEvents = !activeState
	for item in siteInsideButtonArray
		item.ignoreEvents = !activeState
	
	if isBottomEvent()
		if boxTabSwipeDetected == false then stopBoxDraggableSpeedY()
		else initBoxDraggableSpeed()
	else
		if boxTabSwipeDetected == false then stopBoxDraggableSpeedY()
		else setBoxTabsDraggableSpeed()
	
	for item in [siteContentScroll, siteLeftContentScroll, siteRightContentScroll]
		item.content.ignoreEvents = !activeState
# 		item.ignoreEvents = !activeState



box.on Events.DragStart, (event, layer) ->
# 	printTop(event.offsetDirection)
# 	setTabsScroll(true)
	simulationStop = true
	
	if isBottomEvent() and isMidEvent() and (event.offsetDirection == "left" or event.offsetDirection == "right")
# 		printTop("detected R or L")
		stopBoxDraggableSpeedY()
		boxTabSwipeDetected = false
# 		setTabsScroll(false)
		
		siteView.animate(scale: siteView.states.bottom.scale, y: siteView.states.bottom.y, midX: BS.wg, options: { time: 0.1 })
	
	else if boxTabSwipeDetected == false
# 		setTabsScroll(true)
	else
		boxTabSwipeDetected = true
# 		setTabsScroll(true)
	
	setTabsScroll(true)
	

# box.on Events.Move, (event, layer) ->
# 	printTop("D D D D D D D D ")

# box.on Events.SwipeLeft, (event, layer) ->
# 
# box.on Events.SwipeRight, (event, layer) ->
# 
# box.on Events.SwipeUp, (event, layer) ->
# 
# box.on Events.SwipeDown, (event, layer) ->







box.on "change:point", ->
	vScale = 1
	
	# BLOCK: Prevent Dragging too far away from Left and Right positions
	# Reducing the speed
	if isLefterThan(box, blBot)
		box.draggable.speedX = Utils.modulate(box.midX, [blBot.midX - 20, blBot.midX], [0.2, getBoxDraggableSpeed().x], true)
	else if isRighterThan(box, brBot)
		box.draggable.speedX = Utils.modulate(box.midX, [brBot.midX, brBot.midX + 20], [getBoxDraggableSpeed().x, 0.2], true)
	
	
	
	# TOP SECTION
	if isHighterThan(box, bMid)
		# X-AXIS: PREPARING SCALE VALUE
		vScale = Utils.modulate(box.midY, [bMid.midY, bTop.midY], [0.5, 0.1], true)
	
		# TABS: Scale and Y
		siteView.scale = Utils.modulate(box.midY, [bMid.midY, bTop.midY], [siteView.states.middle.scale, siteView.states.top.scale], false)
		siteView.y = Utils.modulate(box.midY, [bMid.midY, bTop.midY], [siteView.states.middle.y, siteView.states.top.y], false)
		siteView.opacity = Utils.modulate(box.midY, [bMid.midY, bTop.midY], [1, 0], false)
		
		# REAL: Alice & New Tab & Site Buttons
		# Keeping in place the Touch Area
# 		boxButtonView.midY = Utils.modulate(box.midY, [originBoxMidY - BS.hg, originBoxMidY - BS.hg * 2], [boxButtonViewMidY + BS.hg, boxButtonView + BS.hg * 2], false)
	
	
	
	# BOTTOM SECTION
	else
		# X-AXIS: PREPARING SCALE VALUE
		vScale = Utils.modulate(box.midY, [bMid.midY, bBot.midY], [0.5, 1], true)
		
		# TABS: Scale and Y
		siteView.scale = Utils.modulate(box.midY, [bMid.midY, bBot.midY], [siteView.states.middle.scale, siteView.states.bottom.scale], true)
		siteView.y = Utils.modulate(box.midY, [bMid.midY, bBot.midY], [siteView.states.middle.y, siteView.states.bottom.y], false)
		
		
		# REAL: Alice & New Tab & Site Buttons
		# Keeping in place the Touch Area
		boxButtonView.midY = Utils.modulate(box.midY, [originBoxMidY, originBoxMidY - BS.hg], [boxButtonViewMidY, boxButtonViewMidY + BS.hg], false)
		
		# FAKE: Site Buttons animation
		for item in siteButtonViewColorArray
			item.opacity = Utils.modulate(box.midY, [bBot.midY - 16, bBot.midY], [item.states.hidden.opacity, item.states.shown.opacity], false)
		
		
		# TABS: Border Radius
		for item in [site, siteLeft, siteRight]
			item.borderRadius = Utils.modulate(box.midY, [bBot.midY - 16, bBot.midY], [32, 0], true)
		
		# ALICE & NEW TAB: Scale and Y
		for item in [bButtonAlice, bButtonNewTab]
			item.y = Utils.modulate(box.midY, [bMid.midY, bMid.midY + 200], [-8, 0], true)
			item.scale = Utils.modulate(box.midY, [bMid.midY, bMid.midY + 200], [1.2, 1], true)
		
		
	
	# SWIPE TYPE: TABS
	if boxTabSwipeDetected
		siteView.midX = Utils.modulate(box.midX, [originBoxMidX - BS.wg, originBoxMidX + BS.wg], [BS.wg - (BS.wg * 2 + siteGap) * vScale, BS.wg + (BS.wg * 2 + siteGap) * vScale], false)
		
		# REAL: Bottom Buttons
		boxButtonView.midX = Utils.modulate(box.midX, [originBoxMidX - BS.wg, originBoxMidX + BS.wg], [boxButtonViewMidX + BS.wg, boxButtonViewMidX - BS.wg], true)
			
# 		for item in siteButtonViewColorArray
# 			item.midX = Utils.modulate(box.midX, [originBoxMidX, originBoxMidX], [item.states.original.midX, item.states.original.midX], false)
		
		# REAL: Tabs
		backToSiteButtonView.midX = Utils.modulate(box.midX, [originBoxMidX - BS.wg, originBoxMidX + BS.wg], [backToSiteButtonView.states.origin.midX + BS.wg, backToSiteButtonView.states.origin.midX - BS.wg], true)
		
	
	
	
	# SWIPE TYPE: OMNIBOX
	else
		# READ or what?
		boxButtonView.midX = Utils.modulate(box.midX, [originBoxMidX - BS.wg, originBoxMidX + BS.wg], [boxButtonViewMidX - BS.wg, boxButtonViewMidX + BS.wg], true)
		# FAKE omni on left & right
		omniboxView.scrollX = Utils.modulate(box.midX, [originBoxMidX - BS.wg, originBoxMidX + BS.wg], [720, 0], false)
		
		# FAKE omni on mid
		for item in siteButtonViewColorArray
			item.midX = Utils.modulate(box.midX, [originBoxMidX - BS.wg, originBoxMidX + BS.wg], [-360 + 180, 360 + 180], false)




# Site: View

siteView = new Layer
	parent: screen
	width: screen.width * 3 + siteGap * 2
	x: -(screen.width + siteGap)
	height: screen.height
	backgroundColor: "transparent"
	originY: 0.2
	opacity: 1
	force2d: true
	clip: true

siteView.states =
	"bottom":
		scale: 1
		y: 0
	"middle":
		scale: 0.5
		y: 40
	"top":
		scale: 0.1
		y: -80

siteView.stateSwitch("bottom")

site = new Layer
	parent: siteView
	x: screen.width + siteGap
	width: screen.width
	height: screen.height
	backgroundColor: "white"
	opacity: 1
	clip: true
# 	originY: 0.2




siteLeft = site.copy()
siteLeft.parent = siteView
siteLeft.x = 0

siteRight = site.copy()
siteRight.parent = siteView
siteRight.x = (360 + siteGap) * 2

siteRight.backgroundColor = "#252D3D"




# Site Data

siteContentScroll = new ScrollComponent
	parent: site
	width: site.width
	height: site.height - PS.h - 72
	y: 72
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "white"

siteLeftContentScroll = new ScrollComponent
	parent: siteLeft
	width: site.width
	height: site.height - PS.h - 72
	y: 72
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "white"

siteRightContentScroll = new ScrollComponent
	parent: siteRight
	width: site.width
	height: site.height - PS.h
# 	y: 24
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "white"


siteArray.push(siteLeft)
siteArray.push(site)
siteArray.push(siteRight)


# Site: Top Panel

siteTopPanelArray = []
siteMenuButtonArray = []
siteInsideButtonArray = []

isMenuButton = (localLayer) ->
	for item, i in siteMenuButtonArray
		if item == localLayer then return i
	return -1

isInsideButton = (localLayer) ->
	for item, i in siteInsideButtonArray
		if item == localLayer then return i
	return -1




for item, i in siteNameArray
	
	topPanelView = new Layer
		width: 360
		height: 72
		backgroundColor: "white"
		shadowColor: "rgba(0,0,0,0.07)"
		shadowBlur: 2
		shadowY: 2
	
	if i == 0 then topPanelView.parent = siteLeft
	else if i == 1 then topPanelView.parent = site
	
	siteTopPanelArray.push(topPanelView)
	
	
	
	urlView = new Layer
		height: 20
		y: 37
		backgroundColor: "transparent"
		parent: topPanelView

	urlLock = new Layer
		size: 20
		image: "images/lock.png"
		parent: urlView
	
	urlText = new TextLayer
		height: 20
		text: siteNameArray[i]
		fontFamily: "YS Web Regular"
		color: "black"
		fontSize: 15
		parent: urlView
		x: 20
	
	
	
	topPanelMenu = new Layer
		parent: topPanelView
		size: 24
		image: "images/site menu.png"
		name: "topPanelMenu"
		y: 35
		x: 14

	topPanelMenu.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 1 }
	topPanelMenu.stateSwitch("hidden")

	
	if i == 0 then topPanelInsideButton = framerInsideChats
	else if i == 1 then topPanelInsideButton = framerInsideRating
	
	for item in topPanelInsideButton.children
		item.fontFamily = "YS Web Medium"
	
	topPanelInsideButton.parent = topPanelView
	topPanelInsideButton.x = 292
	topPanelInsideButton.y = 30
	
# 	topPanelInsideButton = new Layer
# 		parent: topPanelView
# 		width: 50
# 		height: 28
# 		y: 30
# 		x: 302
# 		image: "images/inside%20chats.png"
# 	
# 	if i == 0 then topPanelInsideButton.image = "images/inside%20chats.png"
# 	else if i == 1 then topPanelInsideButton.image = "images/inside%20rating.png"
	
	topPanelInsideButton.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 1 }
	topPanelInsideButton.stateSwitch("hidden")


	topPanelMenu.on(Events.TouchEnd, openModalHandler)
	topPanelInsideButton.on(Events.TouchEnd, openModalHandler)
	
	siteMenuButtonArray.push(topPanelMenu)
	siteInsideButtonArray.push(topPanelInsideButton)
	
	urlView.width = urlLock.width + urlText.width + 2
	urlView.centerX(-7)
	
	





# topPanelViewRight = new Layer
# 	parent: siteRight
# 	width: 360
# 	height: 24
# 	backgroundColor: "#C9C2CB"

# Site: Bottom Panel

siteButtonViewArray = []
siteButtonViewColorArray = []

for siteItem, i in siteArray
	
	siteButtonView = new Layer
		parent: siteItem
		width: 360
		height: 64
		y: 582-6
		backgroundColor: "white"
		name: "siteButtonView"
		shadowY: -2
		shadowBlur: 4
		shadowColor: "rgba(0,0,0,0.07)"
	
	siteButtonViewArray.push(siteButtonView)
	
	if i == 2 then siteButtonView.backgroundColor = "252D3D"
	
	
	
	siteButtonViewColor = new Layer
		parent: siteButtonView
		size: siteButtonView.size
		backgroundColor: "transparent"
		name: "siteButtonView — Color"
	
	siteButtonViewColorArray.push(siteButtonViewColor)
	
	siteButtonViewColor.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
		"original": { midX: item.midX, midY: item.midY }
	siteButtonViewColor.stateSwitch("shown")
	
	
	
	siteButtonViewScroll = new Layer
		parent: siteButtonViewColor
		opacity: 0
		width: siteButtonView.width * 3
		height: siteButtonView.height
		x: -siteButtonView.width
		name: "siteButtonView — Scroll"
	
	
	
	
	for imageURL, j in ["images/sb1.png", "images/sb2.png", "images/sb3.png"]
		selectedIconColor = baseColor
		if i == 2 then selectedIconColor = newTabColor
		
		if j == 0
			icon = getChatSVG(selectedIconColor)
		else if j == 1
			icon = getTabSVG(selectedIconColor)
		else if j == 2
			icon = getBroSVG(selectedIconColor)
		
		icon.parent = siteButtonViewColor
		icon.x = 78 + (64 + 6) * j
		icon.y = 6
		
# 		buttonLayer = new Layer
# 			parent: siteButtonViewColor, size: 64, x: 78 + (64 + 6) * j
# 			image: imageURL
	
	
	siteButtonDrag = new Layer
		parent: siteButtonViewColor
		height: 3
		width: 60
		x: 150
		y: 3
		borderRadius: 2
		backgroundColor: "#CCC"
		name: "siteButton Drag"



# Save Origins

# originCarouselMidX = carouselButton.midX
# originCarouselMidY = carouselButton.midY
# originNewTabMidX = newTabButton.midX
# originNewTabMidY = newTabButton.midY
# originAliceMidX = aliceButton.midX
# originAliceMidY = aliceButton.midY

boxButtonViewMidX = boxButtonView.midX
boxButtonViewMidY = boxButtonView.midY

originBoxMidX = box.midX
originBoxMidY = box.midY
siteOriginMidX = site.x


# Panel

bButtonAlice = null
bButtonNewTab = null

omniboxView = new PageComponent
	parent: screen
	width: screen.width
	height: PS.h
	y: screen.height - PS.h
	scrollVertical: false
	scrollHorizontal: false
# 	shadowY: -2
# 	shadowBlur: 4
# 	shadowColor: "rgba(0,0,0,0.07)"

omniboxView.content.ignoreEvents = true

for item, i in ["alice", "buttons", "sites"]
	
	panelView = new Layer
		size: omniboxView.size
		x: i * omniboxView.width
		parent: omniboxView.content
		backgroundColor: "transparent"
	
	
	
	if i == 0
		framerOmniLeft.parent = panelView
		framerOmniLeft.x = 0
		framerOmniLeft.y = 3
	
	else if i == 1
		for imageURL, j in ["images/bb1.png", "images/bb2.png"]
			buttonLayer = new Layer
				parent: panelView, size: 64, x: 12 + 64 * j
				image: imageURL
# 				shadowBlur: 4
# 				shadowColor: "rgba(0,0,0,0.2)"
			
			if j == 0
				buttonLayer.x = 10
				bButtonAlice = buttonLayer
				
			else if j == 1
				buttonLayer.x = 286
				bButtonNewTab = buttonLayer
	
	else if i == 2
		framerOmniRight.parent = panelView
		framerOmniRight.x = 0
		framerOmniRight.y = 3

# bButtonAlice.on(Events.Tap, openModalHandler)
omniboxView.snapToPage(omniboxView.content.children[1], false)



# Content

framerwiki.parent = siteContentScroll.content
framerwiki.point = { x: 0, y: 0 }
siteContentScroll.updateContent()

framernews.parent = siteLeftContentScroll.content
framernews.point = { x: 0, y: 0 }
siteLeftContentScroll.updateContent()

for item, i in framernews.children
	if i == 0 or i == 1 or i == 2
		item.fontFamily = "YS Web Medium"
	else item.fontFamily = "YS Web Regular"


newTabPreview = new Layer
	width: 360
	height: 640
	image: "images/new tab preview.jpg"
	parent: siteRightContentScroll.content

# siteRightContentScroll.content.y = -24
siteRightContentScroll.content.draggable.speedY = 0

modalDarkerView.bringToFront()
modalView.bringToFront()


consoleLayer = new TextLayer
	backgroundColor: "white"
	fontSize: 12
	y: 100
	opacity: 0
	width: 360

# debugMode = true

# consoleLayer.opacity = 1

# Debug Mode On
if debugMode
	siteView.opacity = 0.2
	box.opacity = 1
	previewView.opacity = 1
	omniboxView.opacity = 0.5
	consoleLayer.opacity = 1

# print box.midX



{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


# framerdark.opacity = 0
