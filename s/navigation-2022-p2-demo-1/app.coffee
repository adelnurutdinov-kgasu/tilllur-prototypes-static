

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

pageTop = new Layer
	width: screen.width
	height: 564

pageMid = new Layer
	width: screen.width
	height: 292
	y: pageTop.height
	# image: "images/arrow3.png"

pageBot = new Layer
	width: screen.width
	height: 812 - 100
	# scrollVertical: false
	# scrollHorizontal: false
	y: pageTop.height + pageMid.height



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

for item, i in [pageTop, pageMid, pageBot]
	item.parent = scrollView.content
	item.backgroundColor = Utils.randomColor()
	item.backgroundColor = null


# pageBot.originY = 0
# pageBot.states =
# 	"newTab":
# 		scale: 344/360
# 	"feed":
# 		scale: 1
# pageBot.stateSwitch("newTab")

scrollView.snapToPage(pageMid, false)




# Dynamic Views

feedView = new Layer
	parent: pageBot
	width: 375
	height: 812
	image: "images/content.png"

feedView.states =
	"start": { y: 0 }
	"top": { y: 0 }
	"bottom": { y: -130 }

feedView.stateSwitch("start")


storiesScroll = new ScrollComponent
	parent: feedView
	width: 375
	height: 220
	y: 150
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true
	# backgroundColor: "blue"
	contentInset:
		top: 12
		left: 24
		right: 24

storiesScroll.content.on Events.DragStart, ->
	scrollView.content.draggable.enabled = false

storiesScroll.content.on Events.DragEnd, ->
	scrollView.content.draggable.enabled = true

storiesContent = new Layer
	parent: storiesScroll.content
	width: 796
	height: 194
	image: "images/stories4.png"






arrowSearch = new Layer
	parent: screen
	width: screen.width
	height: 292
	# y: pageTop.height
	image: "images/arrow3.png"

arrowSearch.states =
	"start": { y: 260 }
	"top": { y: 260 + 298 }
	"bottom": { y: 260 - (856-304) }

arrowSearch.stateSwitch("start")


arrowWeather = new Layer
	parent: pageMid
	width: screen.width
	height: 292
	# y: pageTop.height
	image: "images/arrowWeather.png"

arrowWeather.states =
	"start": { opacity: 1 }
	"top": { opacity: 0 }
	"bottom": { opacity: 0 }

arrowWeather.stateSwitch("start")




sitesView = new Layer
	parent: pageTop
	width: 375
	height: 540
	# image: "images/sites.png"
	backgroundColor: "red"
	backgroundColor: null
	# opacity: 0.5

sitesView.states =
	"start": { y: -43 }
	"top": { y: 106 }
	"bottom": { y: -267 - (300)}

sitesView.stateSwitch("start")




# Horizontal Scroll


favTagsScroll = new ScrollComponent
	parent: sitesView
	width: 375
	height: 88
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true
	# backgroundColor: "blue"
	contentInset:
		top: 18
		left: 24
		right: 24

favTagsScroll.content.on Events.DragStart, ->
	scrollView.content.draggable.enabled = false

favTagsScroll.content.on Events.DragEnd, ->
	scrollView.content.draggable.enabled = true

favTagsContent = new Layer
	parent: favTagsScroll.content
	width: 763
	height: 44
	image: "images/favTags.png"



themeTitle = new Layer
	parent: sitesView
	width: 375
	height: 400
	y: -112
	image: "images/themeTitle.png"

dots = new Layer
	parent: themeTitle
	width: 28
	height: 10
	x: Align.center
	y: 627
	image: "images/dots.png"

dots.states =
	"start": { opacity: 0 }
	"top": { opacity: 1 }
	"bottom": { opacity: 0 }

dots.stateSwitch("start")



themeScroll = new PageComponent
	parent: sitesView
	width: 375
	height: 220
	y: 400 - 112
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true

themeScroll.content.on Events.DragStart, ->
	scrollView.content.draggable.enabled = false

themeScroll.content.on Events.DragEnd, ->
	scrollView.content.draggable.enabled = true

# themeScroll.propagateEvents = true
# themeScroll.content.draggable.propagateEvents = true

themeContent1 = new Layer
	parent: themeScroll.content
	width: 375
	height: 220
	image: "images/themeContent1.png"

themeContent2 = new Layer
	parent: themeScroll.content
	width: 375
	height: 220
	x: 375
	image: "images/themeContent2.png"



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

breaker = new Layer
	parent: headerView
	width: 375 - 20 * 2
	height: 0.5
	x: Align.center
	y: Align.bottom

breaker.states =
	"start": { opacity: 1 }
	"top": { opacity: 0 }
	"bottom": { opacity: 0 }
	






# ScrollView Animate Transition
toFeedGap = [304, 856] #[0, 1]
# toFeedGapFast = [640, 640 + 60] #[0, 0.3]
# toFeedGapSlow = [640 + 160, 916] #[0, 0.3]
# toFeedGapMedium = [640, 640 + 100] #[0, 0.6]

toSiteGap = [0, 304] #[0, 1]
toSiteGapFast = [304 - 100, 304] #[0.88, 1]
toSiteGapLate = [0, 304-100] #[0.88, 1]

isSwipeToFeed = (localValue) -> return localValue >= toFeedGap[0] and localValue <= toFeedGap[1]
isSwipeToSite = (localValue) -> return localValue >= toSiteGap[0] and localValue <= toSiteGap[1]

scrollView.content.on "change:y", ->
	v = scrollView.scrollY
	# print v


	# return
	if isSwipeToFeed(v)
		[s1, s2] = ["start", "bottom"]
		l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
			true) for [l, d, g] in [[sitesView, "y", toFeedGap],
									# [weatherViewBackground, "y", toFeedGap],
									# [weatherView, "y", toFeedGap],
									[breaker, "opacity", toFeedGap],
									[arrowWeather, "opacity", toFeedGap],
									[arrowSearch, "y", toFeedGap],
									[feedView, "y", toFeedGap],
									[dots, "opacity", toFeedGap],
									

			
		]

	else
		[s1, s2] = ["top", "start"]
		l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
			true) for [l, d, g] in [[sitesView, "y", toSiteGap],
									# [weatherViewBackground, "y", toSiteGap],
									# [weatherViewBackground, "opacity", toSiteGapLate],
									# [weatherView, "y", toSiteGap],
									# [weatherView, "opacity", toSiteGapFast],
									[breaker, "opacity", toSiteGap],
									[arrowWeather, "opacity", toSiteGap],
									[arrowSearch, "y", toSiteGap],
									[feedView, "y", toSiteGap],
									[dots, "opacity", toSiteGap],
									# [omnibox, "y", toSiteGap],
									# [logo, "opacity", toSiteGapFast],
									# [tabs, "opacity", toSiteGapFast],
		]


# screen.scale = 1.7



# Utils.delay 2, ->
	# print themeScroll.shouldShowHint()