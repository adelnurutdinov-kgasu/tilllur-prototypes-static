
screen = new Layer { width: 1024 * 2 + 80, height: 1024, backgroundColor: null }

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, forceDesktop: true }




pages = new PageComponent
	parent: screen
	width: screen.width
	height: screen.height
	scrollVertical: false
	scrollHorizontal: true
	backgroundColor: null


IMAGE_NUM = 10
for i in [0...IMAGE_NUM]

	page = new Layer
		parent: pages.content
		width: screen.width
		height: screen.height
		x: (screen.width + 120) * i
		backgroundColor: null
		custom:
			type: "null"
	
	image1 = new Layer
		parent: page
		size: 1024
		x: Align.left
		image: "images/yandex/" + i + ".jpg"
		# backgroundColor: Utils.randomColor()
		custom:
			type: "yandex"
			twin: null
	
	image2 = new Layer
		parent: page
		size: 1024
		x: Align.right
		# image: Utils.randomImage()
		image: "images/other/" + i + ".jpg"
		custom:
			type: "other"
			twin: null
	
	image1.custom.twin = image2
	image2.custom.twin = image1

	for item in [image1, image2]
		item.states =
			"start": { opacity: 1 }
			"select": { opacity: 1 }
			"deselect": { opacity: 0.2 }
		item.stateSwitch("start")

		item.onTap ->
			@stateSwitch("select")
			@custom.twin.stateSwitch("deselect")
			@parent.custom.type = @custom.type

			textView.text = composeResults()
		
	
	shouldSwap = Utils.randomChoice([true, false])
	if shouldSwap
		image1.x = Align.right
		image2.x = Align.left


resultPage = new Layer
	parent: pages.content
	width: screen.width
	height: screen.height
	backgroundColor: "444"

resultPage.states =
	"same": { backgroundColor: "444444" }
	"win": { backgroundColor: "3D6D49" }
	"lost": { backgroundColor: "6D403D" }

# for i in [0...IMAGE_NUM]

# 	previewImage1 = new Layer
# 		parent: resultPage
# 		size: 64
# 		y: i % 5 * 64
# 		image: Utils.randomImage()
	
# 	previewImage2 = new Layer
# 		parent: resultPage
# 		size: 64
# 		x: 64 + 10
# 		y: i % 5 * 64
# 		image: Utils.randomImage()


composeResults = () ->
	numYandex = 0
	numOther = 0

	for item in pages.content.children
		try 
			if item.custom.type == "yandex" then numYandex = numYandex + 1
		try
			if item.custom.type == "other" then numOther = numOther + 1
	
	if numOther == 0
		if numYandex == 0
			resultPage.stateSwitch("same")
			return "—"
		else
			resultPage.stateSwitch("win")
			return "100 %"

	numb = numYandex / (numOther + numYandex)

	if numb == 0.5 then resultPage.stateSwitch("same")
	else if numb > 0.5 then resultPage.stateSwitch("win")
	else resultPage.stateSwitch("lost")

	return "#{numb * 100} %"



textView = new TextLayer
	parent: resultPage
	width: resultPage.width
	height: resultPage.height
	y: 460
	textAlign: "center"
	text: "Press 1 or 2 to select images"
	color: "white"
	

# resultPage.parent = pages.content
resultPage.x = (screen.width + 120) * IMAGE_NUM
pages.updateContent()





Events.wrap(window).addEventListener "keydown", (event) ->

	if event.code is "ArrowLeft"
		pages.snapToNextPage("left", false)

	else if event.code is "ArrowRight"
		pages.snapToNextPage("right", false)
	


	else if event.code is "Digit1"
		child1 = pages.currentPage.children[0]
		child2 = pages.currentPage.children[1]
		
		if child1.x == 0 then child1.emit Events.Tap
		else child2.emit Events.Tap
	
	else if event.code is "Digit2"
		child1 = pages.currentPage.children[0]
		child2 = pages.currentPage.children[1]

		if child1.x == 0 then child2.emit Events.Tap
		else child1.emit Events.Tap