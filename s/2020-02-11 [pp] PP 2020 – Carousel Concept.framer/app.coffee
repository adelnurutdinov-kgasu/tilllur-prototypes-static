
debugMode = false
siteNameArray = ["news.yandex.ru", "ru.wikipedia.org"]
siteArray = []

Utils.insertCSS('@import url(css/project.css)')

# boxMatrix = [
# 	[1,1,1],
# 	[1,1,1],
# 	[1,1,1],
# ]


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
# Framer.Extras.Hints.disable()

# Unknown variable
simulationStop = false

dragStartTime = Utils.getTime()
dragEndTime = Utils.getTime()
dragEndDelay = 0.03

# Магия
BS = {
	w: 360, wg: 360/2
	h: 640, hg: 640/3
}

# Омнибокс
SITE_FREE_TOP = { h: 44 }

boxSideGap = BS.hg # Сдвиг модуляции для бокового состояния
siteGap = 24 # Расстояние между табами

screen = new Layer
	width: BS.w
	height: BS.h
	backgroundColor: "black"
# 	image: "images/alice.jpg"

# scaleFactor = Screen.width / screen.width
# screen.scale = scaleFactor
# screen.center()



# Preview: Gaps for Box

previewView = new Layer
	parent: screen
	width: BS.w * 3
	height: BS.h * 2 - BS.hg
	x: -BS.w
	y: -BS.hg
	opacity: 0
	backgroundColor: "transparent"



bTop = new Layer
	parent: previewView
	width: BS.w * 2
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
	width: BS.w * 2
	height: BS.h
	x: BS.wg
	y: 99 + 44
	borderColor: "green"
	borderWidth: 2
	borderRadius: 10
	backgroundColor: "transparent"
	opacity: 0.5

bBot = new Layer
	parent: previewView
	width: BS.w * 2
	height: BS.h
	x: BS.wg
# 	y: 286
	y: 486
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


delayReference = null

delay = (time, fn, args...) ->
	setTimeout fn, time, args...

# isDragEvent = () ->
# 	return dragEndTime - dragStartTime > dragEndDelay


# Modal Events
# isBottomEvent = () ->
# # 	printTop("Bottom Event")
# 	return box.midY < bBot.midY + 16 and box.midY > bBot.midY - 16
# 
# isModalEvent = () ->
# # 	printTop("Modal Event")
# 	return box.y < mvY + 4 and box.y > mvY - 4

isCarouselEvent = () ->
	return closestBoxY(box, [bBot, bMid, bTop]) == bMid

isTopEvent = () ->
	return closestBoxY(box, [bBot, bMid, bTop]) == bTop

isBottomEvent = () ->
	return closestBoxY(box, [bBot, bMid, bTop]) == bBot



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

isFastVelocity = (event) ->
	return event.velocity.y > 2.0

isToTop = (event) ->
	return event.velocity.y < -0.1

isToBottom = (event) ->
	return event.velocity.y > 0.1




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




animateBoxY = (event, type) ->
	simulationStop = true
	
	if event != null then localVelocity = Math.abs(event.velocity.y)
	else localVelocity = 0
	
	inputVelocity = Utils.modulate(localVelocity, [0, 5], [0, 7], true)
	
	if type == "top" then inputY = bTop.y
	else if type == "mid" then inputY = bMid.y
	else if type == "bot" then inputY = bBot.y
	
	# Выключаем свайп контента сайта
	if type is "bot" or type is "mid"
		setTabsScroll(false)
	else
		setTabsScroll(true)
		tabsGuard.stateSwitch("hidden")
	
	if type is "bot"
		closeApp(event)
		return
	
	inputAnimation = new Animation box,
		y: inputY, options: { curve: Spring(tension: 600, friction: 70, velocity: inputVelocity)}
	inputAnimation.start()
	simulationStop = false
	
	


animateBoxX = (event, type) ->
	simulationStop = true
	
	if event != null then localVelocity = Math.abs(event.velocity.x)
	else localVelocity = 0
	
	inputVelocity = Utils.modulate(localVelocity, [0, 5], [0, 7], true)
	
	if type == "left" then inputX = blBot.x
	else if type == "mid" then inputX = bBot.x
	else if type == "right" then inputX = brBot.x
	
	inputAnimation = new Animation box,
		x: inputX, options: { curve: Spring(tension: 600, friction: 70, velocity: inputVelocity)}
	inputAnimation.start()
	simulationStop = false





# B-O-X

box = new Layer
	parent: previewView
	width: bBot.width
	height: bBot.height
	backgroundColor: "green"
	force2d: true
	clip: true


# Разная скорость для свайпа бокса
getBoxDraggableSpeed = () ->
	return {
		x: 0.5, y: 1,
		tabsX: 1, tabsY: 0.5,
		omniboxX: 0.5, omniboxY: 0
	}


initBoxDraggableSpeed = () ->
	box.draggable.speedX = getBoxDraggableSpeed().x
	box.draggable.speedY = getBoxDraggableSpeed().y
	box.draggable.enabled = true

disableDraggableSpeed = () ->
	box.draggable.speedX = 0
	box.draggable.speedY = 0
	box.draggable.enabled = false

# stopBoxDraggableSpeedY = () ->
# 	box.draggable.speedX = getBoxDraggableSpeed().omniboxX
# 	box.draggable.speedY = getBoxDraggableSpeed().omniboxY
# 
# setBoxTabsDraggableSpeed = () ->
# 	box.draggable.speedX = getBoxDraggableSpeed().tabsX
# 	box.draggable.speedY = getBoxDraggableSpeed().tabsY


# box.draggable.enabled = true
initBoxDraggableSpeed()



box.draggable.constraints =
	x: 0
	y: 0
	width: previewView.width
	height: previewView.height


boxConstraintsFrame = new Layer
	width: box.draggable.constraints.width
	height: box.draggable.constraints.height
	x: box.draggable.constraints.x
	y: box.draggable.constraints.y
	backgroundColor: "null"
	borderColor: "black"
	borderWidth: 4
	opacity: 0.8
	parent: box.parent

box.x = BS.wg
box.y = 0

box.states =
	"origin":
		midX: box.midX
		midY: box.midY




divAliceTarget = null

divChatButton = null
divCarouselTarget = null
divBroButton = null

divBackToSiteLeftButton = null
divBackToSiteRightButton = null
divBackToSiteMidButton = null

# Return from Carousel

box.on Events.TouchStart, (event, layer) ->
	dragStartTime = Utils.getTime()
	

box.on Events.TouchEnd, (event, layer) ->
	dragEndTime = Utils.getTime()
	
	if !box.draggable.enabled
		openApp()
	
# 	if !layer.draggable.isDragging then print "Touch" else print "DRAG"
# 	if isCarouselEvent() then print "MID"
	if !layer.draggable.isDragging and isCarouselEvent()
		animateBoxY(null, "top")
	
# 	if !isDragEvent() and isCarouselEvent()
# 		box.animateBoxY(null, "top")
	

box.on Events.DragStart, ->
# 	print "Started Drag"

box.on Events.Drag, (event, layer) ->
	clearTimeout(delayReference)
# 	print(isTopEvent())
# 	delayReference = delay 400, ->
# 		if isCarouselEvent()
# 			tabsGuard.stateSwitch("shown")
	
	if isBottomEvent() or isTopEvent()
		tabsGuard.stateSwitch("hidden")
	else
		tabsGuard.stateSwitch("shown")



box.on Events.DragEnd, (event, layer) ->
# 	printTop("Box: Drag End")
# 	dragEndTime = Utils.getTime()
	
	if isFastVelocity(event)
		animateBoxY(event, "bot")
	
	else if isToTop(event)
# 		printTop("TOP EVENT")
		if isLowerThan(layer, bBot)
			animateBoxY(event, "bot")
		else if isHighterThan(layer, bBot) and isLowerThan(layer, bMid)
			animateBoxY(event, "top")
		else if isHighterThan(layer, bMid) and isLowerThan(layer, bTop)
			animateBoxY(event, "top")
# 		else
# 			print "WFT6"
	
	else if isToBottom(event)
# 		printTop("BOTTOM EVENT")
		if isHighterThan(layer, bTop)
			animateBoxY(event, "top")
		else if isLowerThan(layer, bTop) and isHighterThan(layer, bMid)
			animateBoxY(event, "mid")
		else if isLowerThan(layer, bMid) and isHighterThan(layer, bBot)
			animateBoxY(event, "bot")
		else
			# Draggin to Bot
# 			print "WTF7"
			animateBoxY(event, "bot")
	
	else
# 		printTop("no velocity drop")
		closestLayer = closestBoxY(layer, [bBot, bMid, bTop])
		
		if closestLayer is bBot
			animateBoxY(null, "bot")
		else if closestLayer is bMid
			animateBoxY(null, "mid")
		else if closestLayer is bTop
			animateBoxY(null, "top")
# 		else
# 			print "WFT4"
	
	
	animateBoxX(event, "mid")
	return
	
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
# 			print "WTF222"
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

# Transition Based Animations

box.on Events.AnimationStop, (event, layer) ->


setTabsScroll = (activeState) ->
# 	print activeState ? "false" : "true"
	
# 	# Bottom Buttons
# 	carouselButton.ignoreEvents = !activeState
# 	chatButton.ignoreEvents = !activeState
# 	broButton.ignoreEvents = !activeState
	
	for item in [siteContentScroll, siteLeftContentScroll, siteRightContentScroll]
		item.content.ignoreEvents = !activeState


closeApp = (event) ->
	
	velocityY = -0.5
	velocityX = 0
	
	if event != null
		printTop(event.velocity.x + " " + event.velocity.y)
		velocityY = event.velocity.y
		velocityX = event.velocity.x
	
	printTop("# CLOSE APP")
	disableDraggableSpeed()
	box.animateStop()
	box.midY = bTop.midY
	box.midX = bMid.midX
# 	siteView.animate("app", time: 1)
	
	siteView.animate(x: siteView.states.app.x, options: { time: .5, curve: Spring(damping: 1, velocity: velocityX) })
	siteView.animate(y: siteView.states.app.y, options: { time: .5, curve: Spring(damping: 0.8, velocity: velocityY) })
	siteView.animate(scale: siteView.states.app.scale, options: { time: .5, curve: Spring(damping: 1) })
	
	site.animate("icon", time: .5, curve: Spring(damping: 1))
	siteIcon.animate("shown", time: 0.3)
	
	blurView.animate("hidden", time: 0.3)




openApp = () ->
	printTop("# OPEN APP")
	initBoxDraggableSpeed()
	
	siteView.animate("top", time: .5, curve: Spring(damping: 1))
	site.animate("app", time: .5, curve: Spring(damping: 1))
	siteIcon.stateSwitch("hidden", time: 0.3)

	blurView.animate("shown", time: 0.3, delay: 0.1)
	blurColor.animate("top", time: 0.3, delay: 0.1)
	
	setTabsScroll(true)



box.on Events.DragStart, (event, layer) ->
	simulationStop = true
# 	setTabsScroll(true)






box.on "change:point", ->
	# смотрим за боксом только во время транзишена
	if !box.draggable.enabled then return
	
	# BLOCK: Prevent Dragging too far away from Left and Right positions
	# Reducing the speed
	if isLefterThan(box, blBot)
		box.draggable.speedX = Utils.modulate(box.midX, [blBot.midX - 20, blBot.midX], [0.2, getBoxDraggableSpeed().x], true)
	else if isRighterThan(box, brBot)
		box.draggable.speedX = Utils.modulate(box.midX, [brBot.midX, brBot.midX + 20], [getBoxDraggableSpeed().x, 0.2], true)
	
	
	
	# TOP SECTION
	# Переходим от верхней части до середины
	if isHighterThan(box, bMid)
		sBounds = [bMid.midY, bTop.midY]
		
		# X-AXIS: PREPARING SCALE VALUE
		vScale = Utils.modulate(box.midY, sBounds, [0.7, 1], true)
	
		# TABS: Scale and Y
		siteView.scale = Utils.modulate(box.midY, sBounds, [siteView.states.middle.scale, siteView.states.top.scale], true)
		siteView.y = Utils.modulate(box.midY, sBounds, [siteView.states.middle.y, siteView.states.top.y], false)
		
		blurColor.opacity = Utils.modulate(box.midY, sBounds, [blurColor.states.middle.opacity, blurColor.states.top.opacity], true)
		
		# TABS: Border Radius
# 		for item in [site, siteLeft, siteRight]
# 			item.borderRadius = Utils.modulate(box.midY, [bTop.midY, bTop.midY + 16], [item.states.site.borderRadius, item.states.tab.borderRadius], true)
	
	
	
	# BOTTOM SECTION
	else
		sBounds = [bMid.midY, bBot.midY]
		# X-AXIS: PREPARING SCALE VALUE
		vScale = Utils.modulate(box.midY, sBounds, [0.7, 0.4], true)
		
		# TABS: Scale and Y
		siteView.scale = Utils.modulate(box.midY, sBounds, [siteView.states.middle.scale, siteView.states.bottom.scale], true)
		siteView.y = Utils.modulate(box.midY, sBounds, [siteView.states.middle.y, siteView.states.bottom.y], false)
		
# 		for item in [site, siteLeft, siteRight]
# 			item.borderRadius = Utils.modulate(box.midY, [bMid.midY, bMid.midY + 44], [item.states.site.borderRadius, item.states.tab.borderRadius], true)
		
# 		blurView.opacity = Utils.modulate(box.midY, sBounds, [blurView.states.shown.opacity, blurView.states.hidden.opacity], true)
		blurColor.opacity = Utils.modulate(box.midY, sBounds, [blurColor.states.middle.opacity, blurColor.states.bottom.opacity], true)
		
	
	# SWIPE TYPE: TABS
	siteView.midX = Utils.modulate(box.midX, [box.states.origin.midX - BS.wg, box.states.origin.midX + BS.wg], [BS.wg - BS.w*vScale, BS.wg + BS.w*vScale], false)
	



# Site: View

tabsGuard = new Layer
tabsGuard.sendToBack()

tabsGuard.states =
	"shown":
		opacity: 0
	"hidden":
		opacity: 0

tabsGuard.stateSwitch("hidden")

tabsGuard.on Events.StateSwitchEnd, (from, to) ->
	if to != from
		siteLeft.animate(to, time: 0.2)




# Blur Box
blurView = new Layer
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "rgba(0,0,0,0.03)"
# 	backgroundColor: "rgba(255,255,255,0.03)"

blurView.style =
	"-webkit-backdrop-filter": "blur(40px)"
	"backdrop-filter": "blur(40px)"

blurView.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0

blurView.stateSwitch("shown")


blurColor = new Layer
	parent: blurView
	width: screen.width
	height: screen.height
# 	backgroundColor: "rgba(100, 100, 100, 1.0)"
	backgroundColor: "rgba(0, 0, 0, 1.0)"

blurColor.states =
	"top":
		opacity: 1
	"middle":
		opacity: 0.3
	"bottom":
		opacity: 0

blurColor.stateSwitch("top")



siteView = new Layer
	parent: screen
	width: screen.width * 3 + siteGap * 2
	x: -(screen.width + siteGap)
	height: screen.height
	backgroundColor: "transparent"
	originY: 0.5
	opacity: 1
	force2d: true
# 	clip: true

siteView.states =
	"top":
		scale: 1
		y: 0
		x: -(screen.width + siteGap)
	"middle":
		scale: 0.66
		y: 0
	"bottom":
		scale: 0.4
		y: 93
	"app":
		scale: 0.14
		y: 20 - 200 + 46
		x: -(screen.width + siteGap) + 80 + 48
	
siteView.stateSwitch("top")





site = new Layer
	parent: siteView
	x: screen.width + siteGap
	y: SITE_FREE_TOP.h
	width: screen.width
	height: screen.height - SITE_FREE_TOP.h
	backgroundColor: "white"
	borderRadius: 16
	opacity: 1
	clip: true



siteLeft = site.copy()
siteLeft.parent = siteView
siteLeft.x = 0

siteRight = site.copy()
siteRight.parent = siteView
siteRight.x = (360 + siteGap) * 2


site.states = 
	"app":
		height: screen.height - SITE_FREE_TOP.h
		borderRadius: 16
	"icon":
		height: screen.width
		borderRadius: 100


siteLeft.states = 
	"shown":
		opacity: 0
		x: siteLeft.x
	"hidden":
		opacity: 0
		x: siteLeft.x - 360





# Site Data

siteContentFix = new Layer
	parent: site
	width: 360
	height: 360
	y: 0
	backgroundColor: "#EAECF0"

siteContentFix.states =
	"app":
		borderRadius: 16
	"icon":
		borderRadius: 0

siteContentFix.stateSwitch("app")



siteContentScroll = new ScrollComponent
	parent: site
	width: site.width
	height: site.height
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "null"

siteContentScroll.states =
	"app":
		borderRadius: 16
	"icon":
		borderRadius: 0

siteContentScroll.stateSwitch("app")



siteLeftContentScroll = new ScrollComponent
	parent: siteLeft
	width: site.width
	height: site.height - SITE_FREE_TOP.h
	y: SITE_FREE_TOP.h
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "white"

siteRightContentScroll = new ScrollComponent
	parent: siteRight
	width: site.width
	height: site.height - SITE_FREE_TOP.h
	y: SITE_FREE_TOP.h
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "white"


siteArray.push(siteLeft)
siteArray.push(site)
siteArray.push(siteRight)


siteIcon = new Layer
	parent: site
	width: site.width
	height: site.width
	originY: 0
	image: "images/market.png"

siteIcon.states =
	"shown":
		scaleY: 1
		opacity: 1
	"hidden":
		scaleY: site.height / site.width
		opacity: 0

siteIcon.stateSwitch("hidden")

# Content

framerwiki.parent = siteContentScroll.content
framerwiki.point = { x: 0, y: 0 }
siteContentScroll.updateContent()

framernews.parent = siteLeftContentScroll.content
framernews.point = { x: 0, y: 0 }
siteLeftContentScroll.updateContent()

framerwiki2.parent = siteRightContentScroll.content
framerwiki2.point = { x: 0, y: 0 }
siteRightContentScroll.updateContent()

for item, i in framernews.children
	if i == 0 or i == 1 or i == 2
		item.fontFamily = "YS Web Medium"
	else item.fontFamily = "YS Web Regular"



# modalDarkerView.bringToFront()
# modalView.bringToFront()


consoleLayer = new TextLayer
	backgroundColor: "white"
	fontSize: 12
	y: 100
	opacity: 0
	width: 360

# debugMode = true
# screen.scale = 0.4

# Debug Mode On
if debugMode
	siteView.opacity = 1
	box.opacity = 0.1
	previewView.opacity = 1
	consoleLayer.opacity = 1



siteRight.opacity = 0
siteLeft.opacity = 0
# modalView.opacity = 0.1

framernews.name = "."
framerwiki.name = "."

# if !Utils.isMobile()
	# Screen.backgroundColor = "white"


# Morda Layer



bg = new Layer
	parent: screen
	width: 360
	height: 640
	image: "images/bg.png"


bgFix = new Layer
	parent: bg
	x: 277
	y: 142
	width: 70
	height: 59
	backgroundColor: "white"
	opacity: 0

bg.sendToBack()




{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 8, topTheme: "light", forceAndroidBar: true }