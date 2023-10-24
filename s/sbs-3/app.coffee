
document.body.style.cursor = "auto"

{ Button } = require "Buttons"
{ Preview } = require "PreviewComponent"
{ Text, TextButton, ImageButton } = require "SBS_Button"

screen = new Layer { width: 1024 * 2 + 10, height: 1024 + 200 + 200, backgroundColor: "null" }
preview = new Preview { view: screen, showHints: false, showUI: false, showDevice: false, showBars: false, scaleState: "fill", borderRadius: 0 }


testSBSJSON = "images/testing-sbs.json"
# testSBSJSON2 = "images/test2.json"
# testBlendingJSON = "images/image_blending_sbs.json"
testBlendingJSON = "images/testing-blending.json"

defaultJSON = testBlendingJSON

jsonURL = preview.getStateGeneric("json", [{ value: "sbs", result: testSBSJSON },
	{ value: "blending", result: testBlendingJSON }], defaultJSON)


showResults = false
imageData = JSON.parse Utils.domLoadDataSync jsonURL

imageModeEnum = {
	sbs: "sbs"
	blending: "blending"
}
imageMode = imageData.mode ? imageModeEnum.sbs



pages = new PageComponent
	parent: screen
	width: screen.width, height: 1024, y: Align.top(200)
	scrollVertical: false, scrollHorizontal: true
	backgroundColor: null

getCurrentPairText = () ->
	return "#{pages.currentPage.custom.index + 1} из #{IMAGE_NUM}"

pages.on "change:currentPage", ->

	currentIndexText.text = getCurrentPairText()
	resultsButton.autoHeight = true
	resultsButton.y = Align.center

	if imageMode == imageModeEnum.sbs
		promptTitleText.text = pages.currentPage.custom.title
		promptTitleText.autoHeight = true
		promptTitleText.y = Align.center
	
	else if imageMode == imageModeEnum.blending
		for i in [0..4]
			if pages.currentPage.custom.image_prompt[i] != undefined
				pairBoxes[i].image = pages.currentPage.custom.image_prompt[i]
			else
				pairBoxes[i].image = null
	
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

	# print currentImage.image_prompt[0]

	page = new Layer
		parent: pages.content
		width: pages.width, height: pages.height
		x: (pages.width + 120) * i
		backgroundColor: "null"
		custom:
			index: i
			title: currentImage.prompt
			image_prompt: currentImage.image_prompt
			score:
				one: -1
				two: -1
	
	image1 = new ImageButton
		parent: page
		text: ""
		width: 1024, height: 1024
		x: Align.left, borderRadius: 24
		image: currentImage["image-1"]
		custom:
			type: "one"
			twin: null
	
	image2 = new ImageButton
		parent: page
		text: ""
		width: 1024, height: 1024
		x: Align.right, borderRadius: 24
		backgroundColor: null
		image: currentImage["image-2"]
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

			selectNone.image = "images/button_cancel.png"

			@stateSwitch("select")
			@custom.twin.stateSwitch("deselect")
			
			if @custom.type == "one"
				@parent.custom.score.one = 1.0
				@parent.custom.score.two = 0.0
			else
				@parent.custom.score.one = 0.0
				@parent.custom.score.two = 1.0
			
			# nextHandler(true)
			composeResults()
		
	
	shouldSwap = Utils.randomChoice([true, false])
	if shouldSwap
		image1.x = Align.right
		image2.x = Align.left
	


topView = new Layer
	parent: screen
	width: screen.width, height: 200
	backgroundColor: null







promptTitleText = null
pairBoxes = []

if imageMode == imageModeEnum.sbs

	promptTitleText = new Text
		parent: topView
		width: 1024*2 - 400
		autoHeight: true
		x: Align.center, y: Align.center
		text: imageData.images[0].prompt
		textAlign: "center", fontSize: 36
		color: "white"
		backgroundColor: null
		

else if imageMode == imageModeEnum.blending
	for i in [0..4]
		box =  new Layer
			parent: topView
			size: 170, borderRadius: 12
			x: (170 + 10) * i
			backgroundColor: null

		if imageData.images[0].image_prompt[i] != undefined
			box.image = imageData.images[0].image_prompt[i]
		
		pairBoxes.push box













bottomView = new Layer
	parent: screen
	width: screen.width, height: 200
	y: Align.bottom
	backgroundColor: null



currentIndexText = new Text
	parent: bottomView
	width: 400, height: 200
	x: Align.left(280), y: Align.center(15)
	text: getCurrentPairText()
	textAlign: "left", fontSize: 36
	color: "white", opacity: 0.4
	backgroundColor: null
	padding:
		top: 58



prevHandler = () ->
	pages.snapToNextPage("left", false)

nextHandler = (withAnimation = false) ->
	pages.snapToNextPage("right", false)

prevButton = new Button
	parent: bottomView
	width: 88.0, height: 88.0, image: "images/button_arrow_left.png"
	x: Align.center(-150), y: Align.center
	handler: prevHandler

nextButton = new Button
	parent: bottomView
	width: 88.0, height: 88.0, image: "images/button_arrow_right.png"
	x: Align.center(150), y: Align.center
	handler: nextHandler





selectLeftHandler = Utils.throttle 0.2, ->
	child1 = pages.currentPage.children[0]
	child2 = pages.currentPage.children[1]
	# print selectNone
	selectNone.image = "images/button_cancel.png"
	
	if child1.x == 0 then child1.emit Events.Tap
	else child2.emit Events.Tap


selectRightHandler = Utils.throttle 0.2, ->
	child1 = pages.currentPage.children[0]
	child2 = pages.currentPage.children[1]
	selectNone.image = "images/button_cancel.png"

	if child1.x == 0 then child2.emit Events.Tap
	else child1.emit Events.Tap


selectDrawHandler = Utils.throttle 0.2, (event, layer) ->
	if pages.currentPage.custom.score.one != -1 and pages.currentPage.custom.score.two != -1
		pages.currentPage.custom.score.one = -1
		pages.currentPage.custom.score.two = -1
		pages.currentPage.children[0].stateSwitch("start")
		pages.currentPage.children[1].stateSwitch("start")
		selectNone.image = "images/button_draw.png"
	else
		pages.currentPage.custom.score.one = 0.5
		pages.currentPage.custom.score.two = 0.5
		pages.currentPage.children[0].stateSwitch("deselect")
		pages.currentPage.children[1].stateSwitch("deselect")
		selectNone.image = "images/button_cancel.png"

	composeResults()


selectNone = new Button
	parent: bottomView
	width: 168, height: 88.0, image: "images/button_draw.png"
	x: Align.center, y: Align.center
	handler: selectDrawHandler

Framer.Extras.Preloader.addImage("images/button_cancel.png")





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







resultsButton = new Text
	parent: bottomView
	width: 800, autoHeight: true
	text: "Hello", textAlign: "right", fontSize: 24
	x: Align.right(), y: Align.center
	backgroundColor: "red"
	backgroundColor: null
	opacity: 0.5

resultsButton.onTap ->
	# print "?"
	showResults = !showResults
	composeResults()


cleanValue = (top, bottom) => 
	if bottom == 0 then return 0.0
	if (top / bottom * 100) == 100 then return 100
	if (top / bottom * 100) == 0 then return 0
	return (top / bottom * 100).toFixed(1)

composeResults = () ->
	allOne = 0.0
	allTwo = 0.0
	allResults = 0.0

	for page in pages.content.children
		if page.custom.score.one != -1 and page.custom.score.two != -1
			allOne = allOne + page.custom.score.one
			allTwo = allTwo + page.custom.score.two
			allResults = allResults + 1.0
	
	if allOne + allTwo == 0
		if showResults
			resultsButton.text = "#{imageData["name-1"]}: 0 %\n#{imageData["name-2"]}: 0 %"
		else
			resultsButton.text = "#{imageData["name-1"]}: X %\n#{imageData["name-2"]}: Y %"
		return
	
	numb = allOne / (allOne + allTwo)
	value = (numb * 100).toFixed()

	# print showResults
	if showResults
		firstValue = cleanValue(allOne, allResults)
		secondValue = cleanValue(allTwo, allResults)
	else
		firstValue = "X"
		secondValue = "Y"

	resultsButton.text = "#{imageData["name-1"]}: #{firstValue} %\n#{imageData["name-2"]}: #{secondValue} %"
	resultsButton.autoHeight = true
	resultsButton.y = Align.center


composeResults()







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


saveButton = new Button
	parent: bottomView
	width: 238.0, height: 88.0, image: "images/button_save_json.png"
	x: Align.left, y: Align.center
	handler: saveResults


`function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
`


resultsButton.y = Align.center

