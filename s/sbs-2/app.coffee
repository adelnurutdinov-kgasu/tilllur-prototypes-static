
document.body.style.cursor = "auto"

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






getState = (stateKey = "json", defaultResult = "images/test2.json") ->
	result = defaultResult

	for item in location.search[1..].split('&')
		keyValuePair = item.split("=")
		keyPart = keyValuePair[0]
		valuePart = keyValuePair[1]

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
			score:
				yandex: -1
				other: -1
	
	image1 = new ImageButton
		parent: page
		text: ""
		width: 1024
		height: 1024
		borderRadius: 0
		x: Align.left
		# y: Align.top(200)
		# image: "images/yandex/" + i + ".jpg"
		image: currentImage["image-1"]
		custom:
			type: "yandex"
			twin: null
	
	image2 = new ImageButton
		parent: page
		text: ""
		width: 1024
		height: 1024
		borderRadius: 0
		x: Align.right
		# y: Align.top(200)
		# image: Utils.randomImage()
		# image: "images/other/" + i + ".jpg"
		backgroundColor: "green"
		image: currentImage["image-2"]
		custom:
			type: "other"
			twin: null
	
	# print image1.image
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
			
			if @custom.type == "yandex"
				@parent.custom.score.yandex = 1.0
				@parent.custom.score.other = 0.0
			else
				@parent.custom.score.yandex = 0.0
				@parent.custom.score.other = 1.0
			
			# nextHandler(true)
			composeResults()
		
	
	shouldSwap = Utils.randomChoice([true, false])
	if shouldSwap
		image1.x = Align.right
		image2.x = Align.left
	


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
	child1 = pages.currentPage.children[0]
	child2 = pages.currentPage.children[1]
	
	if child1.x == 0 then child1.emit Events.Tap
	else child2.emit Events.Tap


selectRightHandler = Utils.throttle 0.2, ->
	child1 = pages.currentPage.children[0]
	child2 = pages.currentPage.children[1]

	if child1.x == 0 then child2.emit Events.Tap
	else child1.emit Events.Tap


selectDrawHandler = Utils.throttle 0.2, ->
	pages.currentPage.custom.score.yandex = 0.5
	pages.currentPage.custom.score.other = 0.5

	pages.currentPage.children[0].stateSwitch("deselect")
	pages.currentPage.children[1].stateSwitch("deselect")

	# nextHandler(true)
	composeResults()



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


composeResults = () ->
	allYandex = 0.0
	allOther = 0.0

	for page in pages.content.children
		if page.custom.score.yandex != -1 and page.custom.score.other != -1
			allYandex = allYandex + page.custom.score.yandex
			allOther = allOther + page.custom.score.other
	

	numb = allYandex / (allYandex + allOther)
	value = (numb * 100).toFixed()
	
	if showResults
		resultsButton.text = "#{imageData["name-1"]} — #{value} %\n#{imageData["name-2"]} – #{100 - value} %"
	else
		resultsButton.text = "#{imageData["name-1"]} — X %\n#{imageData["name-2"]} – Y %"









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

	allYandex = 0.0
	allOther = 0.0

	for page in pages.content.children
		if page.custom.score.yandex != -1 and page.custom.score.other != -1
			allYandex = allYandex + page.custom.score.yandex
			allOther = allOther + page.custom.score.other
	
	output += "\t\"sum-1\": #{allYandex},\n"
	output += "\t\"sum-2\": #{allOther},\n"
	output += "\t\"images\": [\n"
	
	for page, i in pages.content.children
		output += "\t\t{\n"

		output += "\t\t\t\"prompt\": \"#{page.custom.title}\",\n"
		output += "\t\t\t\"score-1\": \"#{page.custom.score.yandex}\",\n"
		output += "\t\t\t\"score-2\": \"#{page.custom.score.other}\",\n"


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

