
document.body.style.cursor = "auto"


shuffle = (source) ->
	return source unless source.length >= 2
	for index in [source.length-1..1]
		randomIndex = Math.floor Math.random() * (index + 1)
		[source[index], source[randomIndex]] = [source[randomIndex], source[index]]
	source

# fontAveria = "Raleway"

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
			backgroundColor: "pink"
		
		localLayer.player.autoplay = false
		localLayer.player.muted = true
		localLayer.player.loop = true
		
		# @videoLayer = localLayer
	
	# @define 'videoLayer',
	# 	get: -> @options.videoLayer
	# 	set: (value) ->
	# 		print value
	# 		print "????"
	# 		@options.videoLayer.video = value

	# print: =>
		# print @videoLayer.video
	
	setVideo: (videoURL) =>
		@children[0].video = videoURL
	
	play: =>
		@children[0].player.play()
	
	pause: =>
		@children[0].player.pause()
	




shouldShuffle = true

getState = (stateKey = "json", defaultResult = "images/video-test.json") ->
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

# print imageData.images[0]

screen = new Layer { width: 1024 * 3 + 20, height: 1024 + 400, backgroundColor: "null" }

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, forceDesktop: true, config: false }





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
	
	for localPage, i in pages.content.children
		if i == currentIndex
			for videoButton, j in localPage.children
				videoButton.play()
		else
			for videoButton, j in localPage.children
				videoButton.pause()

	

positionTuple = [0, 1024+10, (1024+10)*2]

# shouldShuffle = false

IMAGE_NUM = imageData.images.length
for currentImage, i in imageData.images

	
	if shouldShuffle then currentPositionTuple = shuffle(positionTuple)
	else currentPositionTuple = positionTuple

	page = new Layer
		parent: pages.content
		width: pages.width
		height: pages.height
		x: (pages.width + 120) * i
		backgroundColor: "null"
		custom:
			index: i
			title: currentImage.prompt
			score:
				one: -1
				two: -1
				three: -1
	


	image1 = new VideoButton
		parent: page
		text: ""
		width: 1024
		height: 1024
		borderRadius: 0
		x: currentPositionTuple[0]
		custom:
			type: "one"
			twinImages: null
	
	image2 = new VideoButton
		parent: page
		text: ""
		width: 1024
		height: 1024
		borderRadius: 0
		x: currentPositionTuple[1]
		backgroundColor: "green"
		# videoLayer: currentImage["image-2"]
		custom:
			type: "two"
			twinImages: null
	
	image3 = new VideoButton
		parent: page
		text: ""
		width: 1024
		height: 1024
		borderRadius: 0
		x: currentPositionTuple[2]
		backgroundColor: "green"
		# videoLayer: currentImage["image-3"]
		custom:
			type: "three"
			twinImages: null

	
	image1.setVideo(currentImage["image-1"])
	image2.setVideo(currentImage["image-2"])
	image3.setVideo(currentImage["image-3"])
	
	image1.custom.twinImages = [image2, image3]
	image2.custom.twinImages = [image1, image3]
	image3.custom.twinImages = [image1, image2]

	for item in [image1, image2, image3]
		item.states =
			"start": { opacity: 1 }
			"select": { opacity: 1 }
			"deselect": { opacity: 0.4 }
		item.stateSwitch("start")

		item.onTap ->
			@stateSwitch("select")
			for twinLayer in @custom.twinImages
				twinLayer.stateSwitch("deselect")
			
			if @custom.type == "one"
				@parent.custom.score.one = 1.0
				@parent.custom.score.two = 0.0
				@parent.custom.score.three = 0.0
			else if @custom.type == "two"
				@parent.custom.score.one = 0.0
				@parent.custom.score.two = 1.0
				@parent.custom.score.three = 0.0
			else
				@parent.custom.score.one = 0.0
				@parent.custom.score.two = 0.0
				@parent.custom.score.three = 1.0
			
			composeResults()

	


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
	# if withAnimation
	# 	Utils.delay 0.2, ->
	# 		pages.snapToNextPage("right", false)
	
	# else
	pages.snapToNextPage("right", false)

nextButton.handler = nextHandler
prevButton.handler = prevHandler



# selectLeftButton = new TextButton
# 	parent: screen
# 	text: "Выбрать 1"
# 	x: Align.center(-500)
# 	y: Align.bottom(-120)

# selectRightButton = new TextButton
# 	parent: screen
# 	text: "Выбрать 2"
# 	x: Align.center(500)
# 	y: Align.bottom(-120)

selectNone = new TextButton
	parent: screen
	text: "Ничья (Space)"
	x: Align.center()
	y: Align.bottom(-120)





selectOneHandler = Utils.throttle 0.2, ->
	for item in pages.currentPage.children
		if item.x == 0
			item.emit Events.Tap
			print item.custom.type

selectTwoHandler = Utils.throttle 0.2, ->
	for item in pages.currentPage.children
		if item.x == (1024 + 10) * 1 then item.emit Events.Tap

selectThreeHandler = Utils.throttle 0.2, ->
	for item in pages.currentPage.children
		if item.x == (1024 + 10) * 2 then item.emit Events.Tap


selectDrawHandler = Utils.throttle 0.2, ->
	pages.currentPage.custom.score.one = 0.33
	pages.currentPage.custom.score.two = 0.33
	pages.currentPage.custom.score.three = 0.33

	pages.currentPage.children[0].stateSwitch("deselect")
	pages.currentPage.children[1].stateSwitch("deselect")
	pages.currentPage.children[2].stateSwitch("deselect")

	composeResults()



# selectLeftButton.handler = selectOneHandler
# selectRightButton.handler = selectThrHandler
selectNone.handler = selectDrawHandler



Events.wrap(window).addEventListener "keydown", (event) ->

	if event.code is "ArrowLeft"
		prevHandler()

	else if event.code is "ArrowRight"
		nextHandler()

	else if event.code is "Digit1"
		selectOneHandler()
	
	else if event.code is "Digit2"
		selectTwoHandler()
	
	else if event.code is "Digit3"
		selectThreeHandler()
	
	else if event.code is "Space"
		selectDrawHandler()






saveButton = new TextButton
	parent: screen
	text: "Save"
	x: Align.right
	y: Align.top(80)

initSamplePrint = "#{imageData["name-1"]} — X %\n#{imageData["name-2"]} – Y %\n#{imageData["name-1"]} — Z %"

resultsButton = new Text
	parent: screen
	text: initSamplePrint
	textAlign: "right"
	fontSize: 32
	height: 200
	width: 800
	x: Align.right(-saveButton.width - 48)
	y: Align.top(40)

resultsButton.onTap ->
	showResults = !showResults
	composeResults()


cleanValue = (top, bottom) => 
	if bottom == 0 then return 0.0
	return (top / bottom * 100).toFixed(2)

composeResults = () ->
	allOne = 0.0
	allTwo = 0.0
	allThree = 0.0
	allResults = 0.0

	for page in pages.content.children
		if page.custom.score.one != -1 and page.custom.score.two != -1 and page.custom.score.three != -1
			allOne = allOne + page.custom.score.one
			allTwo = allTwo + page.custom.score.two
			allThree = allThree + page.custom.score.three
			allResults = allResults + 1.0
	

	# print allOne + " " + allTwo + " " + allThree
	
	if showResults
		resultsButton.text = "#{imageData["name-1"]} — #{cleanValue(allOne, allResults)} %\n#{imageData["name-2"]} – #{cleanValue(allTwo, allResults)} %\n#{imageData["name-3"]} — #{cleanValue(allThree, allResults)} %"
	else
		resultsButton.text = initSamplePrint









# json = ""

# readImage = (url) ->
# 	# https://shedevrum.ai/post/5fcd9c58de09ae8
# 	# https://masterpiecer-images.s3.yandex.net/5fcd9c58de09ae8:upscaled
# 	return "https://masterpiecer-images.s3.yandex.net/" + url.split("post/")[1] + ":upscaled"

# readLines = (url) ->
# 	string = Utils.domLoadDataSync url
# 	return string.split("\n")


# prompts = readLines "images/prompts.txt"
# input1 = readLines "images/input1.txt"
# input2 = readLines "images/input2.txt"

# json += "{\n"
# json += "	  \"name-1\": \"n1\",\n"
# json += "	  \"name-2\": \"n2\",\n"
# json += "	\"images\": [\n"

# for item, i in prompts
# 	data = ""
# 	data += "	{\n"

# 	data += "		\"prompt\": \"#{prompts[i]}\",\n"
# 	data += "		\"image-1\": \"#{readImage(input1[i])}\",\n"
# 	data += "		\"image-2\": \"#{readImage(input2[i])}\",\n"
	
# 	if i == prompts.length - 1 then data += "	}\n"
# 	else data += "	},\n"

# 	json += data

# json += "	]\n"
# json += "}\n"

# print json










saveResults = () ->
	output = ""

	output += "{\n"
	output += "\t\"name\": \"#{jsonURL}\",\n"

	allOne = 0.0
	allTwo = 0.0
	allThree = 0.0

	for page in pages.content.children
		if page.custom.score.one != -1 and page.custom.score.two != -1 and page.custom.score.three != -1
			allOne = allOne + page.custom.score.one
			allTwo = allTwo + page.custom.score.two
			allThree = allThree + page.custom.score.three
	
	output += "\t\"sum-1\": #{allOne},\n"
	output += "\t\"sum-2\": #{allTwo},\n"
	output += "\t\"sum-3\": #{allThree},\n"
	output += "\t\"images\": [\n"
	
	for page, i in pages.content.children
		output += "\t\t{\n"

		output += "\t\t\t\"prompt\": \"#{page.custom.title}\",\n"
		output += "\t\t\t\"score-1\": \"#{page.custom.score.one}\",\n"
		output += "\t\t\t\"score-2\": \"#{page.custom.score.two}\",\n"
		output += "\t\t\t\"score-3\": \"#{page.custom.score.three}\",\n"


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


# `function test(str) {
#     alert(str)
# }
# `
# test("hello")


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
