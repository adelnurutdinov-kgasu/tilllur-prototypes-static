document.body.style.cursor = "auto"

AppView = require "appView"
NavView = require "navView"
SG = require "scrollGuard"


# class Button extends Layer
# 	constructor: (@options={}) ->
		
# 		_.defaults @options,
# 			handler: null
		
# 		super @options
# 		@style = cursor: "pointer"
		
# 		@.onMouseOver @Hover
# 		@.onMouseOut @HoverOff
		
# 	Hover: =>
# 		@scale = 1.05
# 	HoverOff: =>
# 		@scale = 1
	
	
# 	@define 'handler',
# 		set: (value) -> @on(Events.Tap, value)


screen = new Layer
	width: 1920, height: 1080
	backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 12, visible: false }

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.4



title = new Layer
	parent: screen
	width: 310.0
	height: 124.0
	x: Align.center
	y: 240
	image: "images/title.png"

search = new Layer
	parent: screen
	width: 1158.0
	height: 163.0
	x: Align.center
	y: 500
	image: "images/search.png"



headerView = new Layer
	parent: screen
	width: screen.width
	height: 88
	y: Align.top(20)
	backgroundColor: null


logo = new Layer
	parent: headerView
	width: 56.0
	height: 56.0
	x: Align.left(34)
	y: Align.center
	image: "images/logo.png"

profile = new Layer
	parent: headerView
	width: 136.0
	height: 73.33333333333333
	x: Align.right(-28)
	image: "images/profile.png"








plusIcon = new AppView.IconLayer { image: "images/icons/plus.png" }
allIcon = new AppView.IconLayer { image: "images/icons/all.png" }

plusIcon.onTap ->
	navigationView.addIcon()
	navigationView.updateIcons()




navigationView = new NavView.NavigationComponent
	parent: screen
	width: 100

navigationView.addPage(plusIcon, "bottom")
navigationView.addPage(allIcon, "bottom")

# navigationView.updateViewHeight()




aliceView = new Layer
	parent: screen
	x: Align.right
	y: Align.bottom
	width: 128.0
	height: 140.0
	image: "images/aliceView.png"




class AlertView2 extends SG.AlertView
	constructor: (@options={}) ->

		@scaleGuard = new Layer
			opacity: 0
		
		@scaleGuard.states =
			"hover": { opacity: 0 }
			"hover-off": { opacity: 0 }
		@scaleGuard.stateSwitch("hover-off")

		@scaleGuard.on Events.StateSwitchEnd, (from, to) ->
			if from != to
				# print "go to #{to}"
				@parent.parent.animate(to)

		_.defaults @options,
		
		super @options
		@style = cursor: "pointer"
		@originX = 1
		@originY = 1
		
		@.onMouseOver @Hover
		@.onMouseOut @HoverOff

		@scaleGuard.parent = @

		# @states =
		# 	"hover": { scale: 1.05 }
		# 	"hover-off": { scale: 1.0 }

		
	Hover: =>
		@scaleGuard.stateSwitch("hover")
	HoverOff: =>
		@scaleGuard.stateSwitch("hover-off")
	
	
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)




alertViewButton = new Layer
	parent: screen
	width: 307 + 20
	height: 66
	x: Align.right(-32)
	y: Align.top(119)
	backgroundColor: null

alertViewButton.states =
	"hover": { scale: 1.05 }
	"hover-off": { scale: 1.0 }


alertView = new AlertView2
	parent: alertViewButton
	

alert1 = new Layer
	parent: alertView.content
	width: 307.0
	height: 66.0
	x: 20
	image: "images/alert1.png"

alert2 = new Layer
	parent: alertView.content
	y: 80
	width: 307.0
	height: 66.0
	x: 20
	image: "images/alert2.png"


dotView = new SG.DotsView
	parent: alertView
	width: 8
	x: 4
	y: Align.center
	# x: Align.right(-(alertView.width + 32 + 8))
	backgroundColor: null









scrollGuard = new SG.ScrollGuard
	scrollView: alertView
	progressView: dotView





for item, i in alertView.content.children
	dotView.addPage(new SG.DotButton)
		
