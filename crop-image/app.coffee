


screen = new Layer
	width: 360
	height: 640
	backgroundColor: "black"


imageView = new Layer
	parent: screen
	width: 280
	height: 456
	x: (360-280)/2
	y: 64
	image: Utils.randomImage()

imageDarkTop = new Layer
	width: 360
	height: 64

imageDarkBottom = new Layer
	width: 360
	height: 640 - (64 + 456)
	y: 64 + 456

imageDarkLeft = new Layer
	width: (360 - 280) / 2
	height: imageView.height
	y: 64

imageDarkRight = new Layer
	width: (360 - 280) / 2
	x: (360 - 280) / 2 + imageView.width
	height: imageView.height
	y: 64

for item in [imageDarkTop, imageDarkBottom, imageDarkLeft, imageDarkRight]
	item.parent = screen
	item.opacity = 0.7
	item.backgroundColor = "black"



M = 0.5


progressView = new ScrollComponent
	parent: screen
	width: 360
	height: 68
	y: 520
	scrollVertical: false
	scrollHorizontal: true
	speedX: 0.5
	backgroundColor: "black"


progressView.content.draggable.momentum = false


radianDarker = new Layer
	parent: progressView
	width: 32
	height: 32
	y: 26
	borderRadius: "100%"
	x: Align.center()
	backgroundColor: "black"

radianText = new TextLayer
	parent: progressView
	x: Align.center()
	width: 40
	height: progressView.height
	fontSize: 14
	fontStyle: "bold"
	color: "white"
	textAlign: "center"
	text: "0°"
	padding: 
		top: 32
		left: 2






leftSlice = new Layer
	parent: progressView.content
	width: 180
	y: 41
	backgroundColor: "transparent"

for i in [0..60]
	slice = new Layer
		parent: progressView.content
		width: 5
		height: 1
		x: 180 + i * 5
		y: 41
		image: "images/slice.png"
# 		backgroundColor: "black"
# 		shadowX: 1
# 		shadowColor: "white"
	
# 	print slice.x

sliceLast = new Layer
	parent: progressView.content
	size: 1
	backgroundColor: "white"
	x: 300
	y: 41

rightSlice = new Layer
	parent: progressView.content
	width: 180
	x: 301 + 180
	y: 41
	backgroundColor: "transparent"



# Text

BT = 20

textM15 = new TextLayer
	parent: progressView.content
	x: Align.center()
	width: 40
	height: progressView.height
	fontSize: 12
	fontStyle: "bold"
	color: "white"
	textAlign: "center"
	text: "-15°"
	opacity: M
	padding: 
		top: BT
		left: 6

text0 = textM15.copy()
text0.parent = progressView.content
text0.text = "0°"

text15 = textM15.copy()
text15.parent = progressView.content
text15.text = "15°"

textM30 = textM15.copy()
textM30.parent = progressView.content
textM30.text = "-30°"

text30 = textM15.copy()
text30.parent = progressView.content
text30.text = "30°"

text45 = textM15.copy()
text45.parent = progressView.content
text45.text = "45°"

textM45 = textM15.copy()
textM45.parent = progressView.content
textM45.text = "-45°"




TP = 51
textM15.x -= TP
text15.x += TP

textM30.x -= TP * 2
text30.x += TP * 2

textM45.x -= TP * 3
text45.x += TP * 3


# Scroll

OUT = 28
IN = 20

ZG = 158

FGL = ZG - TP
SGL = ZG - 2*TP
TGL = ZG - 3*TP

FGR = ZG + TP
SGR = ZG + 2*TP
TGR = ZG + 3*TP




progressView.content.on "change:x", ->
	value = progressView.scrollX
	imageView.rotation = Utils.modulate(value, [0, 301], [-45, 45], true)
	
	radianValue = Utils.modulate(value, [0, 301], [-45, 45], true)
	radianText.text = Utils.round(radianValue) + "°"
	
	
	
	if value <= ZG then text0.opacity = Utils.modulate(value, [ZG-OUT, ZG-IN], [M, 0], true)
	else text0.opacity = Utils.modulate(value, [ZG+IN, ZG+OUT], [0, M], true)
	
	
	
	if value <= FGL then textM15.opacity = Utils.modulate(value, [FGL-OUT, FGL-IN], [M, 0], true)
	else textM15.opacity = Utils.modulate(value, [FGL+IN, FGL+OUT], [0, M], true)

	if value <= SGL then textM30.opacity = Utils.modulate(value, [SGL-OUT, SGL-IN], [M, 0], true)
	else textM30.opacity = Utils.modulate(value, [SGL+IN, SGL+OUT], [0, M], true)
	
	if value <= TGL then textM45.opacity = Utils.modulate(value, [TGL-OUT, TGL-IN], [M, 0], true)
	else textM45.opacity = Utils.modulate(value, [TGL+IN, TGL+OUT], [0, M], true)
	

	
	if value <= FGR then text15.opacity = Utils.modulate(value, [FGR-OUT, FGR-IN], [M, 0], true)
	else text15.opacity = Utils.modulate(value, [FGR+IN, FGR+OUT], [0, M], true)

	if value <= SGR then text30.opacity = Utils.modulate(value, [SGR-OUT, SGR-IN], [M, 0], true)
	else text30.opacity = Utils.modulate(value, [SGR+IN, SGR+OUT], [0, M], true)
	
	if value <= TGR then text45.opacity = Utils.modulate(value, [TGR-OUT, TGR-IN], [M, 0], true)
	else text45.opacity = Utils.modulate(value, [TGR+IN, TGR+OUT], [0, M], true)
	
	
	

progressView.scrollToPoint( {x: ZG - 8, y: 0}, false)
# text0.opacity = 0


ratio = new Layer
	parent: screen
	width: 24
	height: 24
	image: "images/ratio.png"
	x: Align.left(20)
	y: Align.bottom(-24)

rotate = new Layer
	parent: screen
	width: 24
	height: 24
	image: "images/rotate.png"
	x: Align.right(-20)
	y: Align.bottom(-24)

clearButton = new Layer
	parent: screen
	width: 130
	height: 48
	x: Align.center()
	y: Align.bottom(-12)
	# image: "images/clearButton.png"
	backgroundColor: "black"

resetText = new TextLayer
	parent: clearButton
	x: Align.center
	y: Align.center
	width: 130
	height: 48
	fontSize: 16
	fontStyle: "bold"
	color: "white"
	textAlign: "center"
	text: "Reset"
	opacity: 0.5
	padding: 
		top: 16

clearButton.on Events.Tap, ->
	progressView.scrollToPoint( {x: ZG - 8, y: 0}, true)



{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, statusBar: "light" }