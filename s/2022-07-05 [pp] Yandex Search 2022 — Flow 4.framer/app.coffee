

screen = new Layer
	width: 375, height: 812
	backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: screen }

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.4

# Stack Transition




scrollView = new PageComponent
	parent: screen
	width: screen.width
	height: screen.height
	scrollVertical: false
	scrollHorizontal: true
	originY: 0.5


# Scroll

pageLeft = new Layer
	width: screen.width
	height: screen.height

pageMid = new Layer
	width: screen.width
	height: screen.height
	x: screen.width * 1

pageRight = new Layer
	width: screen.width
	height: screen.height
	x: screen.width * 2




# Pages Init

for item, i in [pageLeft, pageMid, pageRight]
	item.parent = scrollView.content
	# item.backgroundColor = Utils.randomColor()
	item.backgroundColor = "white"


# pageBot.originY = 0
# pageBot.states =
# 	"newTab":
# 		scale: 344/360
# 	"feed":
# 		scale: 1
# pageBot.stateSwitch("newTab")

scrollView.snapToPage(pageMid, false)




# Content

# themes = new Layer
# 	parent: pageLeft
# 	width: 375
# 	height: 353
# 	y: 114
# 	image: "images/themes.png"

film = new Layer
	parent: pageLeft
	width: 375.0
	height: 614.0
	y: 106
	image: "images/film.png"


navigationView = new Layer
	parent: pageRight
	width: 375
	height: 422
	y: 114
	image: "images/navigationView.png"



# System

headerView = new Layer
	parent: screen
	width: 375
	height: 106
	y: Align.top
	image: "images/header.png"

bottomBar = new Layer
	parent: screen
	width: 375
	height: 80
	y: Align.bottom
	image: "images/bottom bar.png"



arrow = new Layer
	parent: pageMid
	width: 375.0
	height: 292.0
	y: 240
	image: "images/arrow.png"


# breaker = new Layer
# 	parent: headerView
# 	width: 375 - 20 * 2
# 	height: 0.5
# 	x: Align.center
# 	y: Align.bottom

# breaker.states =
# 	"start": { opacity: 1 }
# 	"sites": { opacity: 0 }
# 	"feed": { opacity: 1 }
	






