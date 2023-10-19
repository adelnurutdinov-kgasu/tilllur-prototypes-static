
document.body.style.cursor = "auto"
shouldShuffle = true



shuffle = (source) ->
	return source unless source.length >= 2
	for index in [source.length-1..1]
		randomIndex = Math.floor Math.random() * (index + 1)
		[source[index], source[randomIndex]] = [source[randomIndex], source[index]]
	source



class Text extends TextLayer
	constructor: (@options={}) ->
		
		_.defaults @options,
			# fontFamily: fontAveria
			fontSize: 28
			weight: 700
			color: "white"
			height: 20
			letterSpacing: 0.7
			letterSpacing: 0.4
			fontWeight: "bold"
# 			textOverflow: "ellipsis"
		
		super @options

		@style =
			"font-family": "Raleway, 'PT Sans', 'Helvetica', 'Tahoma', sans-serif;"
			"font-weight": 700
			"-webkit-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
			"-moz-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
			"-ms-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
			"font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
		


class TextButton extends Text
	constructor: (@options={}) ->
		
		_.defaults @options,
			tuple: { normal: 0.5, hover: 0.8 }
			handler: null
			backgroundColor: "black"
			borderRadius: 24
			padding:
				top: 20
				left: 24
				bottom: 60
				right: 24

		
		super @options
		@style = cursor: "pointer"
		
		@.onMouseOver @Hover
		@.onMouseOut @HoverOff

		@updateTuple(@tuple)
	
	
		
	Hover: =>
		@opacity = @tuple.hover
	HoverOff: =>
		@opacity = @tuple.normal
	
	updateTuple: (newTuple) =>
		@tuple = newTuple
		@emit Events.MouseOver
		@emit Events.MouseOut
	
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)
	
	@define 'tuple',
		get: -> @options.tuple
		set: (value) ->
			@options.tuple = value


class ImageButton extends Text
	constructor: (@options={}) ->
		
		_.defaults @options,
			handler: null
		
		super @options
		@style = cursor: "pointer"
		
		@.onMouseOver @Hover
		@.onMouseOut @HoverOff
	
	Hover: =>
		;
	HoverOff: =>
		;
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)



class VideoButton extends Text
	constructor: (@options={}) ->

		_.defaults @options,
			handler: null
			videoLayer: null
			backgroundColor: "red"
		
		super @options

		localLayer = new VideoLayer
			parent: @
			width: @width
			height: @height
			backgroundColor: "333"
		
		localLayer.player.autoplay = false
		localLayer.player.muted = true
		localLayer.player.loop = true
	
	setVideo: (videoURL) =>
		@children[0].video = videoURL
	
	play: =>
		@children[0].player.play()
	
	pause: =>
		@children[0].player.pause()
	
	restart: =>
		@children[0].player.currentTime = 0
		@children[0].player.play()







getState = (stateKey = "json", defaultResult = "images/video-github.json") ->
	result = defaultResult

	for item in location.search[1..].split('&')
		keyValuePair = item.split("=")
		keyPart = keyValuePair[0]
		valuePart = keyValuePair[1]

		if keyPart == "shuffle"
			shouldShuffle = false

		if keyPart == stateKey
			return valuePart
	
	return defaultResult

# ?json=https://jing.yandex-team.ru/files/tilllur/test1.json
# https://dl.dropboxusercontent.com/s/k5gjg26iptld6nd/k21tgbot_vs_v5.json?dl=0
# https://adelnurutdinov-kgasu.github.io/tilllur-prototypes-static/s/sbs-2/index.html?json=https://dl.dropboxusercontent.com/s/k5gjg26iptld6nd/k21tgbot_vs_v5.json?dl=0

jsonURL = getState()
imageData = JSON.parse Utils.domLoadDataSync jsonURL

screen = new Layer { width: 1024 * 2 + 10, height: 1024 + 400, backgroundColor: "null" }

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, showBars: false, showDevice: false, borderRadius: 8 }





showResults = false

pages = new PageComponent
	parent: screen
	width: screen.width
	height: 1024
	y: Align.top(200)
	scrollVertical: false
	scrollHorizontal: true
	backgroundColor: null

pages.on "change:currentPage", ->

	scopePageText.text = "Сравнение #{pages.currentPage.custom.index + 1} / #{IMAGE_NUM}"
	scorePromptText.text = pages.currentPage.custom.title
	
	currentIndex = -1
	for item, i in pages.content.children
		if item == pages.currentPage
			currentIndex = i

	if currentIndex != -1
		if currentIndex == pages.content.children.length - 1
			showResults = true
			composeResults()
	
	if currentIndex > -1
		updateMasterPage(imageData.images[currentIndex])
	


	

masterPage = new Layer
	parent: pages
	width: pages.width
	height: pages.height
	backgroundColor: null

image1 = new VideoButton
	parent: masterPage
	text: ""
	width: 1024
	height: 1024
	backgroundColor: null
	custom:
		type: "one"
		twin: null

image2 = new VideoButton
	parent: masterPage
	text: ""
	width: 1024
	height: 1024
	backgroundColor: null
	custom:
		type: "two"
		twin: null

image1.custom.twin = image2
image2.custom.twin = image1

for item in [image1, image2]
	item.states =
		"start": { opacity: 1 }
		"select": { opacity: 1 }
		"deselect": { opacity: 0.4 }
	item.stateSwitch("start")

	item.onTap ->
		@stateSwitch("select")
		@custom.twin.stateSwitch("deselect")
		
		if @custom.type == "one"
			pages.currentPage.custom.score.one = 1.0
			pages.currentPage.custom.score.two = 0.0
		else if @custom.type == "two"
			pages.currentPage.custom.score.one = 0.0
			pages.currentPage.custom.score.two = 1.0
		
		composeResults()
	



positionTuple = [0, 1024+10]

IMAGE_NUM = imageData.images.length
for currentImage, i in imageData.images

	page = new Layer
		parent: pages.content
		width: pages.width
		height: pages.height
		x: (pages.width + 120) * i
		backgroundColor: "null"
		custom:
			index: i
			title: currentImage.prompt
			position: if shouldShuffle then Utils.randomChoice([positionTuple, [1024+10, 0]]) else positionTuple
			score:
				one: -1
				two: -1
	
	# print page.custom.position
	# if i == 0 then print page.custom.position
	




updateMasterPage = (currentImage) ->

	image1.setVideo(currentImage["image-1"])
	image2.setVideo(currentImage["image-2"])

	image1.play()
	image2.play()

	# image2.x = 1024 + 10
	# print pages.currentPage.custom.position
	image1.x = pages.currentPage.custom.position[0]
	image2.x = pages.currentPage.custom.position[1]
	
	score1 = pages.currentPage.custom.score.one
	score2 = pages.currentPage.custom.score.two

	if score1 == -1 then image1.stateSwitch("start")
	else if score1 == 1 then image1.stateSwitch("select")
	else image1.stateSwitch("deselect")

	if score2 == -1 then image2.stateSwitch("start")
	else if score2 == 1 then image2.stateSwitch("select")
	else image2.stateSwitch("deselect")

updateMasterPage(imageData.images[0])


scopePageText = new Text
	parent: screen
	width: 1000
	height: 200
	y: Align.top(32)
	text: "Сравнение 1 / #{IMAGE_NUM}"
	textAlign: "left"
	fontSize: 24
	color: "white"
	opacity: 0.4

scorePromptText = new Text
	parent: screen
	width: 1000
	height: 200
	y: Align.top(70)
	text: imageData.images[0].prompt
	textAlign: "left"
	fontSize: 36
	color: "white"











nextButton = new TextButton
	parent: screen
	text: "→"
	x: Align.right
	y: Align.bottom(-120)

prevButton = new TextButton
	parent: screen
	text: "←"
	x: Align.left
	y: Align.bottom(-120)


prevHandler = () ->
	pages.snapToNextPage("left", false)

nextHandler = (withAnimation = false) ->
	pages.snapToNextPage("right", false)

nextButton.handler = nextHandler
prevButton.handler = prevHandler



selectLeftButton = new TextButton
	parent: screen
	text: "Выбрать 1"
	x: Align.center(-500)
	y: Align.bottom(-120)

selectRightButton = new TextButton
	parent: screen
	text: "Выбрать 2"
	x: Align.center(500)
	y: Align.bottom(-120)

selectNone = new TextButton
	parent: screen
	text: "Ничья (Space)"
	x: Align.center()
	y: Align.bottom(-120)



selectLeftHandler = Utils.throttle 0.2, ->
	# print "L"
	for item in masterPage.children
		if item.x == 0 then item.emit Events.Tap


selectRightHandler = Utils.throttle 0.2, ->
	# print "R"
	for item in masterPage.children
		if item.x == 1024 + 10 then item.emit Events.Tap


selectDrawHandler = Utils.throttle 0.2, ->
	pages.currentPage.custom.score.one = 0.5
	pages.currentPage.custom.score.two = 0.5

	masterPage.children[0].stateSwitch("deselect")
	masterPage.children[1].stateSwitch("deselect")

	# nextHandler(true)
	composeResults()


restartVideoHandler = Utils.throttle 0.2, ->
	image1.restart()
	image2.restart()


selectLeftButton.handler = selectLeftHandler
selectRightButton.handler = selectRightHandler
selectNone.handler = selectDrawHandler



Events.wrap(window).addEventListener "keydown", (event) ->

	if event.code is "ArrowLeft"
		prevHandler()

	else if event.code is "ArrowRight"
		nextHandler()

	else if event.code is "Digit1"
		selectLeftHandler()
	
	else if event.code is "Digit2"
		selectRightHandler()
	
	else if event.code is "Space"
		selectDrawHandler()
	
	else if event.code is "KeyR"
		restartVideoHandler()






saveButton = new TextButton
	parent: screen
	text: "Save"
	x: Align.right
	y: Align.top(80)

resultsButton = new Text
	parent: screen
	text: "#{imageData["name-1"]} — X %\n#{imageData["name-2"]} – Y %"
	textAlign: "right"
	fontSize: 32
	height: 200
	width: 800
	x: Align.right(-saveButton.width - 48)
	y: Align.top(80)

resultsButton.onTap ->
	showResults = !showResults
	composeResults()





cleanValue = (top, bottom) => 
	if bottom == 0 then return 0.0
	return (top / bottom * 100).toFixed(2)

composeResults = () ->
	allOne = 0.0
	allTwo = 0.0
	allResults = 0.0

	for page in pages.content.children
		if page.custom.score.one != -1 and page.custom.score.two != -1
			allOne = allOne + page.custom.score.one
			allTwo = allTwo + page.custom.score.two
			allResults = allResults + 1.0
	

	numb = allOne / (allOne + allTwo)
	value = (numb * 100).toFixed()
	
	if showResults
		# resultsButton.text = "#{imageData["name-1"]} — #{value} %\n#{imageData["name-2"]} – #{100 - value} %"
		resultsButton.text = "#{imageData["name-1"]} — #{cleanValue(allOne, allResults)} %\n#{imageData["name-2"]} – #{cleanValue(allTwo, allResults)} %\n"
	else
		resultsButton.text = "#{imageData["name-1"]} — X %\n#{imageData["name-2"]} – Y %"











saveResults = () ->
	output = ""

	output += "{\n"
	output += "\t\"name\": \"#{jsonURL}\",\n"

	allOne = 0.0
	allTwo = 0.0

	for page in pages.content.children
		if page.custom.score.one != -1 and page.custom.score.two != -1
			allOne = allOne + page.custom.score.one
			allTwo = allTwo + page.custom.score.two
	
	output += "\t\"sum-1\": #{allOne},\n"
	output += "\t\"sum-2\": #{allTwo},\n"
	output += "\t\"images\": [\n"
	
	for page, i in pages.content.children
		output += "\t\t{\n"

		output += "\t\t\t\"prompt\": \"#{page.custom.title}\",\n"
		output += "\t\t\t\"score-1\": \"#{page.custom.score.one}\",\n"
		output += "\t\t\t\"score-2\": \"#{page.custom.score.two}\",\n"


		if i == pages.content.children.length - 1 then output += "\t\t}\n"
		else output += "\t\t},\n"

	output += "\t]\n"
	output += "}\n"

	download(output, "result_#{(new Date().toJSON())}.json", "text/plain");


`function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
`


saveButton.handler = saveResults

Utils.delay 1, ->
	if pages.currentPage == pages.content.children[0]
		item.play() for item in pages.content.children[0].children

Utils.delay 3, ->
	if pages.currentPage == pages.content.children[0]
		item.play() for item in pages.content.children[0].children

Utils.delay 5, ->
	if pages.currentPage == pages.content.children[0]
		item.play() for item in pages.content.children[0].children