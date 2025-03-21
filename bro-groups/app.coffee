{ Preview } = require "PreviewComponent"

screen = new Layer
	width: 375, height: 812
	backgroundColor: "333"

preview = new Preview { view: screen, statusBar: "light", homeBar: "light" }

Framer.Defaults.Animation =
	curve: Spring(damping: 1), time: 0.5


# Scroll

groups = new PageComponent
	parent: screen
	width: screen.width
	height: screen.height
	scrollVertical: false
	scrollHorizontal: true
	directionLock: true
	clip: false

groups.states =
	"inside": { scale: 1 }
	"outside": { scale: 0.66 }
groups.stateSwitch("inside")

groups.on Events.StateSwitchStart, (from, to) ->
	if from != to
		if to == "outside"
			group1.ignoreEvents = true
			group1.content.ignoreEvents = true
			group2.ignoreEvents = true
			group2.content.ignoreEvents = true
		else if to == "inside"
			group1.ignoreEvents = false
			group1.content.ignoreEvents = false
			group2.ignoreEvents = false
			group2.content.ignoreEvents = false




group1 = new PageComponent
	parent: groups.content
	width: groups.width
	height: groups.height
	borderRadius: screen.parent.borderRadius
	backgroundColor: "red"
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true
	backgroundColor: null
	image: "images/img1.jpg"

group2 = new PageComponent
	parent: groups.content
	width: groups.width
	height: groups.height
	x: groups.width + 40
	borderRadius: screen.parent.borderRadius
	backgroundColor: "blue"
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true
	backgroundColor: null
	image: "images/img2.jpg"


group1tabs = new Layer
	parent: group1.content
	width: group1.width
	height: group1.height
# 	backgroundColor: "sienna"
	image: "images/tabs1.png"

group1sites = new Layer
	parent: group1.content
	width: group1.width
	height: group1.height
	y: group1.height
# 	backgroundColor: "sandybrown"
	image: "images/ntp1.png"


group2tabs = new Layer
	parent: group2.content
	width: group2.width
	height: group2.height
# 	backgroundColor: "pink"
	image: "images/tabs2.png"

group2sites = new Layer
	parent: group2.content
	width: group2.width
	height: group2.height
	y: group2.height
# 	backgroundColor: "violet"
	image: "images/ntp2.png"



group1.on "change:currentPage", ->
	if @currentPage == @content.children[0] then nextState = "bottom"
	else nextState = "center"
	
	if nextState == "bottom" then otherNextPage = group2.content.children[0]
	else otherNextPage = group2.content.children[1]
	
	if nextState == "bottom" then nextHeaderState = "shown"
	else nextHeaderState = "hidden"
	
	group2.snapToPage(otherNextPage, false)
	try group1search.animate(nextState)
	try group2search.animate(nextState)
	try groupHeader.animate(nextHeaderState) for groupHeader in [group1header, group2header]
	try blurLayer.animate(nextHeaderState) for blurLayer in [blur1, blur2]
	
	if nextState == "bottom" then handleTapFor(button3) else handleTapFor(button2)


group2.on "change:currentPage", ->
	if @currentPage == @content.children[0] then nextState = "bottom"
	else nextState = "center"
	
	if nextState == "bottom" then otherNextPage = group1.content.children[0]
	else otherNextPage = group1.content.children[1]
	
	if nextState == "bottom" then nextHeaderState = "shown"
	else nextHeaderState = "hidden"
	
	group1.snapToPage(otherNextPage, false)
	try group1search.animate(nextState)
	try group2search.animate(nextState)
	try groupHeader.animate(nextHeaderState) for groupHeader in [group1header, group2header]
	try blurLayer.animate(nextHeaderState) for blurLayer in [blur1, blur2]
	
	if nextState == "bottom" then handleTapFor(button3) else handleTapFor(button2)



groups.on "change:currentPage", ->
	if @currentPage == @content.children[0] then nextState = "left"
	else nextState = "right"
	
	if nextState == "left"
		progressView.children[0].stateSwitch("shown")
		progressView.children[1].stateSwitch("hidden")
	else
		progressView.children[0].stateSwitch("hidden")
		progressView.children[1].stateSwitch("shown")
	
	changeTabNumber(N_forTabs[nextState])
	siteButtonParent.stateSwitch(nextState)
	site.stateSwitch(nextState)


groups.onTap ->
	if @states.current.name == "outside"
		@animate("inside")
		
		currentGroup = groups.currentPage
		if currentGroup.currentPage == currentGroup.content.children[0]
			handleTapFor(button3)
		else handleTapFor(button2)

# Buttons

N_forTabs =
	left: 8
	right: 6
	left_groupTitle: "Just my space"
	right_groupTitle: "Learning React"
	left_title: "techcrunch.com"
	right_title: "github.com"

changeTabNumber = (intNumber) ->
	try tabNumber_Tabs.text = "#{intNumber}"
	try tabNumber_Site.text = "#{intNumber}"
	
	if intNumber == N_forTabs.left
		site_groupTitle.text = N_forTabs.left_groupTitle
		site_title.text = N_forTabs.left_title
	else
		site_groupTitle.text = N_forTabs.right_groupTitle
		site_title.text = N_forTabs.right_title

tabNumber_Tabs = new TextLayer
	color: "white"
	width: 32, textAlign: "center"
	fontSize: 14, fontWeight: 800
	padding: { top: 7 }
	text: "#{N_forTabs.left}"

tabNumber_Site = new TextLayer
	color: "black"
	width: 32, textAlign: "center"
	fontSize: 14, fontWeight: 800
	padding: { top: 7 }
	text: "#{N_forTabs.left}"





buttonView = new Layer
	parent: screen
	width: screen.width - 40
	y: Align.bottom(-34)
	x: Align.center
	height: 48
	backgroundColor: null

for item, i in [0, 1, 2]
	button = new Layer
		parent: buttonView
		width: buttonView.width / 3
		x: i * buttonView.width / 3
		height: buttonView.height
		backgroundColor: null
	
	buttonIcon = new Layer
		parent: button, size: 32, x: Align.center, y: Align.center
		image: "images/buttonIcon#{i+1}.png"
	
	if i == 2 then tabNumber_Tabs.parent = buttonIcon


button1 = buttonView.children[0]
button2 = buttonView.children[1]
button3 = buttonView.children[2]




button1.onTap ->
	if groups.states.current.name == "inside" then nextState = "outside"
	else nextState = "inside"
	
	if nextState == "outside" then handleTapFor(@)
	else
		currentGroup = groups.currentPage
		if currentGroup.currentPage == currentGroup.content.children[0]
			handleTapFor(button3)
		else handleTapFor(button2)
	
	if site.states.current.name == "site"
		changeSite("tabs")
		changeDelay = 0.2
	else changeDelay = 0
	
	
	
	Utils.delay changeDelay, =>
		groups.animate(nextState)


button2.onTap ->
	handleTapFor(@)
	selectedGroup = groups.currentPage
	
	if site.states.current.name == "site"
		changeSite("tabs")
		changeDelay = 0.2
	else changeDelay = 0
	
	Utils.delay changeDelay, =>
		if selectedGroup.currentPage == selectedGroup.content.children[0]
			selectedGroup.snapToPage(selectedGroup.content.children[1])
		
		if groups.states.current.name == "outside"
			groups.animate("inside")
	
	


button3.onTap ->
	handleTapFor(@)
	selectedGroup = groups.currentPage
	
	if site.states.current.name == "site"
		changeSite("tabs")
	else if groups.states.current.name == "outside"
		groups.animate("inside")
		selectedGroup.snapToPage(selectedGroup.content.children[0])
	else if selectedGroup.currentPage == selectedGroup.content.children[1]
		selectedGroup.snapToPage(selectedGroup.content.children[0])
	else changeSite("site")
	


handleTapFor = (buttonLayer) ->
	for item, i in buttonView.children
		if item == buttonLayer then item.opacity = 1
		else item.opacity = 0.8




# Search

group1search = new Layer
	parent: group1
	width: screen.width
	height: 68
	y: Align.bottom(-78)

group2search = new Layer
	parent: group2
	width: screen.width
	height: 68
	y: Align.bottom(-78)

for item, i in [group1search, group2search]
	item.image = "images/arrow.png"
	item.states =
		"bottom": { y: Align.bottom(-78) }
		"center": { y: Align.top(278) }
	item.stateSwitch("bottom")



# Headers

header = new Layer
	parent: screen
	width: 375
	height: 102
	image: "images/headerGlobal.png"

group1header = new Layer
	parent: group1
	width: 375
	height: 102
	image: "images/group1header.png"

group2header = new Layer
	parent: group2
	width: 375
	height: 102
	image: "images/group2header.png"

for item in [group1header, group2header]
	item.originY = 0.72
	item.states =
		"shown": { scale: 0.8 }
		"hidden": { scale: 0.8 }
	item.stateSwitch("shown")

# Progress


progressView = new Layer
	parent: screen
	width: 10 * groups.content.children.length + 10 * (groups.content.children.length - 1)
	height: 10, backgroundColor: null
	x: Align.center, y: Align.bottom(-156)

for item, i in groups.content.children
	if i == 0 then g = 0 else g = i - 1
	
	dot = new Layer
		parent: progressView
		size: 10
		x: (10 + 10) * i
		borderRadius: 10
		backgroundColor: "white"
	
	dot.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0.5 }
	if i == 0 then dot.stateSwitch("shown")
	else dot.stateSwitch("hidden")





# Blur


blur1 = new BackgroundLayer
	parent: group1

blur2 = new BackgroundLayer
	parent: group2

for item in [blur1, blur2]
	item.backgroundColor = null
	item.style =
		"-webkit-backdrop-filter": "blur(20px)"
	
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0.5 }
	item.stateSwitch("shown")



# Site

site = new Layer
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "white"
	originX: 0.92
	originY: 0.64
	image: "images/site_dtf.jpg"
	

site.states =
	"site": { opacity: 1, scaleX: 1, scaleY: 1 }
	"tabs": { opacity: 0, scaleX: 0.43, scaleY: 0.25 }
	"left": { image: "images/site_dtf.jpg" }
	"right": { image: "images/site_react.jpg" }
site.stateSwitch("tabs")


site_groupTitle = new TextLayer
	parent: site, y: 39
	fontSize: 14, fontWeight: 600
	width: site.width, textAlign: "center"
	color: "black", text: "#{N_forTabs.left_groupTitle}"


# site.stateSwitch("site")

# SiteBar


arrowSite = new Layer
	parent: screen
	y: Align.bottom(-78)
	width: 375
	height: 68
	image: "images/arrowSite 1.png"

arrowSite.states =
	"site": { opacity: 1 }
	"tabs": { opacity: 0 }
arrowSite.stateSwitch("tabs")


arrowSite_fix = new Layer
	parent: arrowSite, backgroundColor: "white"
	width: 200, height: 40, x: Align.center, y: Align.center


site_title = new TextLayer
	parent: arrowSite, y: 23
	fontSize: 18, fontWeight: 500
	width: site.width, textAlign: "center"
	color: "black", text: "#{N_forTabs.left_title}"



buttonViewSite = new Layer
	parent: screen
	width: screen.width - 40
	y: Align.bottom(-34)
	x: Align.center
	height: 48
	backgroundColor: null

buttonViewSite.states =
	"tabs": { opacity: 0 }
	"site": { opacity: 1 }
buttonViewSite.stateSwitch("tabs")


for item, i in [0, 1, 2]
	button = new Layer
		parent: buttonViewSite
		width: buttonViewSite.width / 3
		x: i * buttonViewSite.width / 3
		height: buttonViewSite.height
		backgroundColor: null
	
	buttonIcon = new Layer
		parent: button, size: 32, x: Align.center, y: Align.center
		image: "images/buttonSite#{i+1}.png"
	
	if i == 2 then tabNumber_Site.parent = buttonIcon

siteButton1 = buttonViewSite.children[0]
siteButton2 = buttonViewSite.children[1]
siteButton3 = buttonViewSite.children[2]

# Open Site

changeSite = (nextState) ->
	siteButton.stateSwitch(nextState)
	backButton.stateSwitch(nextState)
	
	site.animate(nextState)
	arrowSite.stateSwitch(nextState)
	
	if nextState == "site" then buttonViewSite.animate(nextState, time: 0.1, delay: 0.1)
	else buttonViewSite.animate(nextState, time: 0.1)



siteButtonParent = new Layer
	parent: group1tabs
	width: 164
	height: 228
	x: Align.right(-16)
	y: Align.bottom(-198)
	backgroundColor: null

siteButtonParent.states =
	"left":
		parent: group1tabs
	"right":
		parent: group2tabs
siteButtonParent.stateSwitch("left")


siteButton = new Layer
	parent: siteButtonParent
	width: 164
	height: 228

siteButton.states =
	"tabs": { opacity: 0 }
	"site": { opacity: 0 }
siteButton.stateSwitch("tabs")

siteButton.onTap ->
	if groups.states.current.name == "outside" then return
	
	if @states.current.name == "tabs" then nextState = "site"
	else nextState = "tabs"
	
	if nextState == "site"
		changeSite(nextState)



backButton = new Layer
	parent: arrowSite
	width: arrowSite.width / 5
	height: arrowSite.height

backButton.states =
	"tabs": { opacity: 0 }
	"site": { opacity: 0 }
backButton.stateSwitch("tabs")

backButton.onTap ->
	if @states.current.name == "tabs" then nextState = "site"
	else nextState = "tabs"
	
	if nextState == "tabs"
		changeSite(nextState)


handleTapFor(button3)


