
document.body.style.cursor = "auto"

screen = new Layer { width: 1366, height: 768, backgroundColor: "white", borderRadius: 12, clip: true }

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, forceDesktop: true, config: false }


alice = new Layer
	parent: screen
	width: 108.0
	height: 108.0
	image: "images/alice.png"
	x: Align.right
	y: Align.bottom

createFix = new Layer
	parent: screen
	width: 340.0
	height: 173.0
	x: Align.left
	y: Align.bottom
	backgroundColor: "white"

create = new Layer
	parent: screen
	width: 340.0
	height: 203.0
	image: "images/create.png"
	x: Align.left
	y: Align.bottom
	# backgroundColor: "white"

header = new Layer
	parent: screen
	width: 1366.0
	height: 108.0
	image: "images/header.png"
	x: Align.center
	y: Align.top



scroll = new ScrollComponent
	parent: screen
	width: 1366.0
	height: 768.0
	y: header.height
	scrollHorizontal: false
	scrollVertical: true
	backgroundColor: "white"
	contentInset:
		bottom: 120

page01 = new Layer
	parent: scroll.content
	width: 1366.0
	height: 780.0
	image: "images/page01.png"

page02 = new Layer
	parent: scroll.content
	width: 1366.0
	height: 780.0
	image: "images/page02.png"
	y: page01.height

page03 = new Layer
	parent: scroll.content
	width: 1366.0
	height: 1160.0
	image: "images/page03.png"
	y: page02.height + page01.height


alice.bringToFront()
createFix.bringToFront()
create.bringToFront()


prompt01 = new Layer
	parent: scroll
	width: 340.0
	height: 400.0
	image: "images/prompt01.png"

prompt02 = new Layer
	parent: scroll
	width: 340.0
	height: 400.0
	image: "images/prompt02.png"
	y: page01.height
	# opacity: 0

prompt03 = new Layer
	parent: scroll
	width: 340.0
	height: 400.0
	image: "images/prompt03.png"
	y: page01.height + page02.height



scroll.content.on "change:y", ->
	v = scroll.scrollY
	# print v
	
	if v < page01.height - 300
		prompt01.y = 0
	else
		prompt01.y = Utils.modulate(v, [400, 400 + 100], [100 - 20, 0 - 20])
	
	if v > page01.height and v < page01.height + page02.height - 500
		prompt02.y = 0
	else if v < page01.height
		prompt02.y = Utils.modulate(v, [400, 400 + 100], [400 - 20, 300 - 20])
	else
		delta = 280
		prompt02.y = Utils.modulate(v, [400 + delta, 400 + delta + 100], [400 - 20, 300 - 20])
	
	if v > page01.height + page02.height
		prompt03.y = 0
	else
		delta = 780
		prompt03.y = Utils.modulate(v, [400 + delta, 400 + delta + 100], [400 - 20, 300 - 20])