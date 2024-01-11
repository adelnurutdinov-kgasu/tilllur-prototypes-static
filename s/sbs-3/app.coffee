
document.body.style.cursor = "auto"

{ Button } = require "Buttons"
{ Preview } = require "PreviewComponent"
{ Text, TextButton, ImageButton } = require "SBS_Button"

screen = new Layer { width: 1024 * 2 + 10, height: 1024 + 200 + 200, backgroundColor: "null" }


testSBSJSON = "images/testing-sbs.json"
testBlendingJSON = "images/testing-blending.json"
testRemixJSON = "images/testing-remix.json"
testRatioJSON = "images/testing-ratio.json"

defaultJSON = testRatioJSON

# jsonURL = preview.getStateGeneric("json", [{ value: "sbs", result: testSBSJSON },
# 	{ value: "blending", result: testBlendingJSON }], defaultJSON)

getState = (stateKey = "json", defaultResult = defaultJSON) ->
	result = defaultResult

	for item in location.search[1..].split('&')
		keyValuePair = item.split("=")
		keyPart = keyValuePair[0]
		valuePart = keyValuePair[1]

		if keyPart == stateKey
			return valuePart
	
	return defaultResult



jsonURL = getState()

showResults = false
imageData = JSON.parse Utils.domLoadDataSync jsonURL

imageModeEnum = {
	sbs: "sbs"
	blending: "blending"
	remix: "remix"
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

		pairBoxesView.width = 0
		lastSumBox = null

		for i in [0..4]
			if pages.currentPage.custom.image_prompt[i] != undefined
				pairBoxes[i].image = pages.currentPage.custom.image_prompt[i]
				pairBoxes[i].style = { cursor: "pointer" }
				pairBoxesView.width += pairBoxes[i].width + 88
				
				sumBoxes[i].opacity = 0.5
				lastSumBox = sumBoxes[i]
			else
				pairBoxes[i].image = null
				pairBoxes[i].style = { cursor: "auto" }
				sumBoxes[i].opacity = 0
				
		try
			lastSumBox.opacity = 0

		if pairBoxesView.width > 88 then pairBoxesView.width = pairBoxesView.width - 88
		pairBoxesView.x = Align.center
	
	else if imageMode == imageModeEnum.remix

		promptTitleText.text = pages.currentPage.custom.title ? ""
		promptTitleText.autoHeight = true
		promptTitleText.y = Align.center(-32)
		# promptTitleText.backgroundColor = "red"

		pairBoxesView.width = 0
		lastSumBox = null

		for i in [0..0]
			if pages.currentPage.custom.image_prompt[i] != undefined
				pairBoxes[i].image = pages.currentPage.custom.image_prompt[i]
				pairBoxes[i].style = { cursor: "pointer" }
				pairBoxesView.width += pairBoxes[i].width + 88
				
				sumBoxes[i].opacity = 0.5
				lastSumBox = sumBoxes[i]
			else
				pairBoxes[i].image = null
				pairBoxes[i].style = { cursor: "auto" }
				sumBoxes[i].opacity = 0
				
		try
			lastSumBox.opacity = 0

		if pairBoxesView.width > 88 then pairBoxesView.width = pairBoxesView.width - 88
		pairBoxesView.x = Align.left(100)
	






	currentIndex = -1
	for item, i in pages.content.children
		if item == pages.currentPage
			currentIndex = i

	if currentIndex != -1
		if currentIndex == pages.content.children.length - 1
			showResults = true
			composeResults()
	
	if pages.currentPage.custom.score.one == -1 and pages.currentPage.custom.score.two == -1
		pages.currentPage.children[0].stateSwitch("start")
		pages.currentPage.children[1].stateSwitch("start")
		selectNone.image = "images/button_draw.png"
	else
		pages.currentPage.children[0].stateSwitch("deselect")
		pages.currentPage.children[1].stateSwitch("deselect")
		selectNone.image = "images/button_cancel.png"

	


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
		# image: currentImage["image-1"]
		custom:
			type: "one"
			twin: null
	
	aspect1 = new Layer
		parent: image1
		width: image1.width, height: image1.height
		# backgroundColor: "red"
		image: currentImage["image-1"]
	
	applyImageRatio(currentImage["image-1"], aspect1, (error, ratio) -> if error then print error else ratio )
	
	image2 = new ImageButton
		parent: page
		text: ""
		width: 1024, height: 1024
		x: Align.right, borderRadius: 24
		backgroundColor: null
		# image: currentImage["image-2"]
		custom:
			type: "two"
			twin: null
	
	aspect2 = new Layer
		parent: image2
		width: image2.width, height: image2.height
		# backgroundColor: "green"
		image: currentImage["image-2"]
	
	applyImageRatio(currentImage["image-2"], aspect2, (error, ratio) -> if error then print error else ratio )
	
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

bottomView = new Layer
	parent: screen
	width: screen.width, height: 200
	y: Align.bottom
	backgroundColor: null







promptTitleText = null

pairBoxes = []
sumBoxes = []
pairBoxesView = null

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

	topView.height = topView.height + 200
	pages.y = pages.y + 200
	bottomView.y = bottomView.y + 200


	lastSumIcon = null

	pairBoxesView = new Layer
		parent: topView
		width: 0, height: 340, borderRadius: 24
		backgroundColor: "null"

	for i in [0..4]
		boxHandler = (event, layer) ->
			if layer.image == "" or layer.image == undefined or layer.image == null then return
			try
				scaledImageView.opacity = 1
				scaledImageView.ignoreEvents = false
				scaledImageView.children[0].image = layer.image

		box =  new Button
			parent: pairBoxesView
			size: 340, borderRadius: 24
			x: (340 + 88) * i
			style: cursor: "pointer"
			backgroundColor: null
			style: { cursor: "auto" }
			scaleTo: 1
			handler: boxHandler
		
		pairBoxes.push box

		sumIcon = new Layer
			parent: pairBoxesView
			width: 88.0, height: 88.0, image: "images/sum_icon.png"
			x: ((340 + 88) * i) + 340, y: Align.center
			opacity: 0

		sumBoxes.push sumIcon

		if imageData.images[0].image_prompt[i] != undefined
			box.image = imageData.images[0].image_prompt[i]
			box.style = { cursor: "pointer" }
			pairBoxesView.width += box.width + 88

			sumIcon.opacity = 0.5
			
			lastSumIcon = sumIcon

	if pairBoxesView.width > 88 then pairBoxesView.width = pairBoxesView.width - 88
	pairBoxesView.x = Align.center()

	try lastSumIcon.opacity = 0


else if imageMode == imageModeEnum.remix

	topView.height = topView.height + 200
	pages.y = pages.y + 200
	bottomView.y = bottomView.y + 200


	lastSumIcon = null

	pairBoxesView = new Layer
		parent: topView
		width: 0, height: 340, borderRadius: 24
		backgroundColor: "null"

	for i in [0..0]
		boxHandler = (event, layer) ->
			if layer.image == "" or layer.image == undefined or layer.image == null then return
			# print "ok?"
			try
				scaledImageView.opacity = 1
				scaledImageView.ignoreEvents = false
				scaledImageView.children[0].image = layer.image

		box =  new Button
			parent: pairBoxesView
			size: 340, borderRadius: 24
			x: (340 + 88) * i
			style: cursor: "pointer"
			backgroundColor: null
			style: { cursor: "auto" }
			scaleTo: 1
			handler: boxHandler
		
		pairBoxes.push box

		sumIcon = new Layer
			parent: pairBoxesView
			width: 88.0, height: 88.0, image: "images/sum_icon.png"
			x: ((340 + 88) * i) + 340, y: Align.center
			opacity: 0

		sumBoxes.push sumIcon

		if imageData.images[0].image_prompt[i] != undefined
			box.image = imageData.images[0].image_prompt[i]
			box.style = { cursor: "pointer" }
			pairBoxesView.width += box.width + 88

			sumIcon.opacity = 0.5
			
			lastSumIcon = sumIcon

	if pairBoxesView.width > 88 then pairBoxesView.width = pairBoxesView.width - 88
	pairBoxesView.x = Align.left(100)

	try lastSumIcon.opacity = 0

	promptTitleText = new Text
		parent: topView
		width: 1024*2 - 100*2 - 340 - 40*2
		autoHeight: true
		x: Align.left(100 + 340 + 40), y: Align.center(-32)
		text: imageData.images[0].prompt
		textAlign: "left", fontSize: 36
		color: "white"
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
	# backgroundColor: "red"
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

screen.height = topView.height + pages.height + bottomView.height
preview = new Preview { view: screen, showHints: false, showUI: false, showDevice: false, showBars: false, scaleState: "fill", borderRadius: 0 }

scaledImageView = null

if imageMode == imageModeEnum.blending or imageMode == imageModeEnum.remix
	
	scaledImageView = new Layer
		width: Screen.width
		height: Screen.height
		backgroundColor: "rgba(34,34,34,.8)"
		scaleTo: 1
		opacity: 0
	
	scaledImageView.onTap (event, layer) =>
		scaledImageView.opacity = 0
		scaledImageView.ignoreEvents = true

	scaledImageView.ignoreEvents = true

	scaledImage = new Layer
		parent: scaledImageView
		size: scaledImageView.height / 1.2
		x: Align.center, y: Align.center
		borderRadius: 16





updateImageToRatio = (imageLayer, ratio) ->
	if ratio < 1
		imageLayer.width = imageLayer.width * ratio
		imageLayer.x = Align.center
	else if ratio > 1
		imageLayer.height = imageLayer.height / ratio
		imageLayer.y = Align.center


`function applyImageRatio(url, imageLayer, callback) {
	var img = new Image();
	img.onload = function () {
		var ratio = img.width / img.height;
		updateImageToRatio(imageLayer, ratio)
		callback(null, ratio);
	};
	img.onerror = function () {
		callback("Error loading for: " + url);
	};
	img.src = url;
}`

