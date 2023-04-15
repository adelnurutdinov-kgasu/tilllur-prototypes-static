Framer.Extras.Hints.disable()

# ScrollView

scrollView = new PageComponent
	width: Screen.width
	height: 88
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true

leftView = new Layer
	parent: scrollView.content
	width: Screen.width
	height: 88
	backgroundColor: "white"

rightView = new Layer
	parent: scrollView.content
	x: Screen.width * 2
	width: Screen.width
	height: 88
	backgroundColor: "white"

view = new Layer
	parent: scrollView.content
	x: Screen.width
	width: Screen.width
	height: 88
	backgroundColor: "white"

scrollView.snapToPage(view, false)

# Omnni

divider = new Layer
	parent: view
	width: view.width
	height: 1
	backgroundColor: "#E5E5E5"




left = new Layer
	parent: view
	width: 64
	height: 44
	image: "images/left.png"

mid = new Layer
	parent: view
	width: Screen.width - 64*2
	height: 44
	x: 64
	backgroundColor: "transparent"

midPart = new Layer
	height: 36
	parent: mid
	y: Align.center
	width: mid.width
	backgroundColor: "#F2F2F2"
# 	image: "images/mid.png"

right = new Layer
	parent: view
	width: 64
	height: 44
	x: Screen.width - 64
	image: "images/right.png"

# Icons

b1 = new Layer
	width: 48
	height: 48
	image: "images/b1.png"

b2 = new Layer
	width: 48
	height: 48
	image: "images/b2.png"

b3 = new Layer
	width: 48
	height: 48
	image: "images/b3.png"

b4 = new Layer
	width: 48
	height: 48
	image: "images/b4.png"

b5 = new Layer
	width: 48
	height: 48
	image: "images/b5.png"

gap = (Screen.width - 48 * 5 - 16*2) / 4
# print gap
for icon, i in [b1, b2, b3, b4, b5]
	icon.parent = view
	icon.y = 40
	icon.x = 16 + (48 + gap) * i
	
	icon.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0.5 }
	
	icon.on Events.TouchStart, (event, layer) ->
		layer.animate("hidden", time: 0.2)
	
	icon.on Events.TouchEnd, (event, layer) ->
		layer.animate("shown", time: 0.2)



urlView = new TextLayer
	y: 12
	parent: mid
	width: mid.width
	color: "black"
	fontWeight: 500
	opacity: 0.8
	fontSize: 16
	textAlign: "center"
	height: 20
	text: "about:blank"

# Set URL
getHostname = (url) ->
	urlParts = url.replace('http://','').replace('https://','').split(/[/?#]/)
	domain = urlParts[0]
	sourceString = domain.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0]
	return sourceString

setURL = (url) ->
# 	print "here"
	try
		urlView.text = getHostname(url)
	catch e
		urlView.text = url


# `window.test = function (url) {
# 	setURL("test")
# }`
 
# setURL("vc.ru")
# setURL("3dnews.ru")
# setURL("3dnews.ru/asdsad")
# setURL("https://3dnews.ru/asdsad")
# setURL("https://www.3dnews.ru/asdsad")


`window.setURL = function (url) {
	setURL(url)
}`


Events.wrap(document.body).addEventListener "touchend", (event) ->
	for item in [b1, b2, b3, b4, b5]
		item.animate("shown", time: 0.2)


# Left Side

# titleLeftView = new TextLayer
# 	y: 12
# 	parent: leftView
# 	width: mid.width
# 	color: "black"
# 	x: Align.center()
# 	opacity: 0.5
# 	fontSize: 16
# 	textAlign: "center"
# 	height: 20
# 	text: "Недавние"

roundGap = (Screen.width - 48 * 5 - 16*2) / 4

for item, i in [1, 2, 3, 4, 5]
	round = new Layer
		parent: leftView
		size: 48
		x: 20 + (48+roundGap) * i
		y: 20
		borderRadius: "100%"
	
	if i < 3
		round.image = "images/recent/" + i + ".png"
	else round.image = "images/recent/" + i + ".jpg"


b3.on Events.Tap, ->
	try window.webkit.messageHandlers.opennewtab.postMessage("open");