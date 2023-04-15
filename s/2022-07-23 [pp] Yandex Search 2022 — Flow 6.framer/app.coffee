

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
	scrollVertical: true
	scrollHorizontal: false
	originY: 0.5

# scrollView.content.on Events.DragStart, ->
# 	try favTagsScroll.content.draggable.enabled = false
# 	try themeScroll.content.draggable.enabled = false
# 	try storiesScroll.content.draggable.enabled = false

# scrollView.content.on Events.DragEnd, ->
# 	try favTagsScroll.content.draggable.enabled = true
# 	try themeScroll.content.draggable.enabled = true
# 	try storiesScroll.content.draggable.enabled = true


# Scroll

pageMid = new Layer
	width: screen.width
	height: 512
	backgroundColor: "red"
	image: "images/midView.png"


pageBot = new Layer
	width: screen.width
	height: 812
	# scrollVertical: false
	# scrollHorizontal: false
	y: pageMid.height
	backgroundColor: "green"



# scrollView.on "change:currentPage", ->
# 	if scrollView.currentPage == pageBot
# 		pageBot.content.scrollVertical = true
# 		pageBot.scrollVertical = true
# 		scrollView.content.scrollVertical = false
# 		scrollView.scrollVertical = false


# guardFeedReturn = false


# pageBot.content.on Events.DragStart, (event, layer) ->
# 	guardFeedReturn = false
	
# 	if pageBot.scrollY <= 0 and pageBot.content.draggable.direction == "down"
# 		guardFeedReturn = true


# pageBot.content.on Events.DragEnd, (event, layer) ->
# 	if guardFeedReturn and pageBot.content.draggable.direction == "down"
# 		pageBot.content.scrollVertical = false
# 		pageBot.scrollVertical = false
# 		scrollView.content.scrollVertical = true
# 		scrollView.scrollVertical = true
		
# 		pageBot.scrollToPoint({ x: 0, y: 0 }, true, { curve: Spring(tension: 400, friction: 40, velocity: layer.draggable.velocity.y) })
# 		scrollView.snapToPage(pageMid, true, { curve: Spring(tension: 400, friction: 40, velocity: layer.draggable.velocity.y) })


# Pages Init

for item, i in [pageMid, pageBot]
	item.parent = scrollView.content
	item.backgroundColor = Utils.randomColor()
	item.backgroundColor = null

scrollView.snapToPage(pageMid, false)




# Dynamic Views

feedView = new Layer
	parent: pageBot
	width: 375
	height: 812
	image: "images/bottomView.png"

feedView.states =
	"start": { y: 0 }
	"top": { y: 0 }
	"bottom": { y: -130 }

feedView.stateSwitch("start")


storiesScroll = new ScrollComponent
	parent: feedView
	width: 375
	height: 144
	y: 236
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true
	backgroundColor: "white"
	contentInset:
		top: 0
		left: 24
		right: 24
		bottom: 16

storiesScroll.content.on Events.DragStart, ->
	scrollView.content.draggable.enabled = false

storiesScroll.content.on Events.DragEnd, ->
	scrollView.content.draggable.enabled = true

storiesContent = new Layer
	parent: storiesScroll.content
	width: 664
	height: 128
	image: "images/stories3.png"


# stories3 = new Layer
# 	width: 664.0
# 	height: 128.0
# 	image: "images/stories3.png"












# Horizontal Scroll






# System

headerView = new Layer
	parent: screen
	width: 375
	height: 106
	y: Align.top
	image: "images/header.png"

headerView.states =
	"login": { image: "images/header.png" }
	"none": { image: "images/header.png" }

bottomBar = new Layer
	parent: screen
	width: 375
	height: 80
	y: Align.bottom
	image: "images/bottom bar.png"








# ScrollView Animate Transition
toFeedGap = [0, 512] #[0, 1]
# toFeedGapFast = [640, 640 + 60] #[0, 0.3]
# toFeedGapSlow = [640 + 160, 916] #[0, 0.3]
# toFeedGapMedium = [640, 640 + 100] #[0, 0.6]



# scrollView.content.on "change:y", ->
# 	v = scrollView.scrollY
# 	# print v

# 	[s1, s2] = ["start", "bottom"]
# 	l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
# 		true) for [l, d, g] in [[breaker, "opacity", toFeedGap],
								
# 	]

