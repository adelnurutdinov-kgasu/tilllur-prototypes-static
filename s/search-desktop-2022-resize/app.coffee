document.body.style.cursor = "auto"

AppView = require "appView"
NavView = require "navView"
SG = require "scrollGuard"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.4

isDebug = false
colorComponents = [0..255]
rndColor = () ->
	r = Utils.randomChoice(colorComponents)
	g = Utils.randomChoice(colorComponents)
	b = Utils.randomChoice(colorComponents)
	if isDebug then return "rgba(#{r}, #{g}, #{b}, 0.5)"
	else return "null"


vw = () -> return screen.width * 1.0 / 100
vh = () -> return screen.height * 1.0 / 100

baseSize =
	width: 1366
	height: 736

baseW = () -> screen.width / baseSize.width
baseH = () -> screen.height / baseSize.height



screen = new Layer
	width: 1920, height: 1080
	backgroundColor: "white"


{ Preview } = require "PreviewComponent"
# new Preview { view: screen, forceDesktop: true }



updateScreen = () ->
	update_columns()

	update_header()
	update_ya_afterHeader()
	
	
	update_arrow()
	updateLogo_afterArrow()
	updateIcons_afterArrow()

	update_avatar()
	update_alertView_afterAvatar()
	update_alertView_content()

	update_printLayer()
	


Canvas.on "change:width", =>
	screen.width = Canvas.width
	updateScreen()
		
Canvas.on "change:height", =>
	screen.height = Canvas.height
	updateScreen()






leftColumn = new Layer
	parent: screen
	backgroundColor: rndColor()
	opacity: 0.5

rightColumn = new Layer
	parent: screen
	backgroundColor: rndColor()
	opacity: 0.5

update_columns = () ->
	leftColumn.width = Math.max(8 * vw(), 100)
	leftColumn.width = Math.min(leftColumn.width, 200)
	leftColumn.height = 100 * vh()

	rightColumn.width = leftColumn.width
	rightColumn.height = leftColumn.height
	rightColumn.x = Align.right()


headerView = new Layer
	parent: screen
	backgroundColor: rndColor()

update_header = () ->
	headerView.width = 100 * vw()
	headerView.height = Math.max(76 / 768 * 100 * vh(), 76)
	headerView.height = Math.min(headerView.height, 96)

	headerView.y = Align.top(12 / 768 * 100 * vh())






arrow = new Layer
	parent: screen
	borderRadius: 16
	borderColor: "FFCC00"
	borderWidth: 3
	backgroundColor: "white"
	backgroundColor: rndColor()
	# style:
	# 	"box-sizing": "border-box",
	# 	"border-radius": "16px",
	# 	"border": "3px solid #FFCC00",
	# 	"overflow": "hidden",

update_arrow = () ->
	arrow.width = 54 * vw() # 3 gap

	arrow.height = Math.max(52/768 * 100 * vw(), 52)
	arrow.height = Math.min(arrow.height, 68)

	arrow.x = Align.center
	arrow.y = Align.center


logoView = new Layer
	parent: screen
	backgroundColor: rndColor()


logo = new Layer
	parent: logoView
	width: 200.0
	height: 80.0
	image: "images/logo.png"

updateLogo_afterArrow = () ->

	logoView.width = 60 * vw()
	logoView.height = 50 * vh()
	logoView.x = 20 * vw()
	# logo.height = 80
	# logo.width = 200

	scaleX = screen.width / 1366
	scaleY = screen.height / 768
	scaleMin = Math.min(scaleX, scaleY)

	scaleOptical = scaleMin * 1.25

	logo.scale = Math.max(scaleOptical, 1)
	# logo.height = Math.max(80 / 768 * vh(), 80)
	# logo.height = Math.max(logo.height, 120)

	# logo.width = logo.height * 2.5
	logo.x = Align.center()
	logo.y = Align.center()

	# print screen.width
	# print logo.width * logo.scale





camera = new Layer
	parent: arrow
	image: "images/camera.png"
	backgroundColor: rndColor()

micro = new Layer
	parent: arrow
	image: "images/micro.png"
	backgroundColor: rndColor()

updateIcons_afterArrow = () ->
	camera.width = arrow.height * 32/52
	camera.height = camera.width

	iconFractal = ((1 - 32/52) / 2)
	camera.x = Align.right(-(iconFractal * arrow.height))
	camera.y = Align.top(iconFractal * arrow.height)

	micro.width = camera.width
	micro.height = camera.width

	micro.x = Align.right(-(iconFractal * arrow.height) * 2 - camera.width)
	micro.y = Align.top(iconFractal * arrow.height)





leftColumn_header = new Layer
	parent: headerView
	backgroundColor: rndColor()
	# opacity: 0.5

ya = new Layer
	parent: leftColumn_header
	image: "images/ya.png"
	size: 44
	# opacity: 0.2

update_ya_afterHeader = () ->
	leftColumn_header.width = leftColumn.width
	leftColumn_header.height = headerView.height

	ya.width = Math.max(44 / 768 * 100 * vh(), 36)
	ya.width = Math.min(ya.width, 52)
	ya.height = ya.width

	ya.x = Align.center
	ya.y = Align.center


rightColumn_header = new Layer
	parent: headerView
	backgroundColor: rndColor()

avatar = new Layer
	parent: rightColumn_header
	image: "images/avatar.png"


update_avatar = () ->
	rightColumn_header.width = rightColumn.width
	rightColumn_header.height = headerView.height
	rightColumn_header.x = Align.right

	avatar.width = Math.max(40 / 768 * 100 * vh(), 32)
	avatar.width = Math.min(avatar.width, 48)
	avatar.height = avatar.width

	avatar.x = Align.center
	avatar.y = Align.center



alertView = new Layer
	parent: screen
	backgroundColor: rndColor()
	borderRadius: 16
	borderWidth: 1
	borderColor: "rgba(51,51,51,0.12)"

update_alertView_afterAvatar = () ->
	alertView.width = 18 * vw()
	
	alertView.x = Align.right(-rightColumn_header.width / 4)
	alertView.y = headerView.y + headerView.height + 12


suppText = new TextLayer
	text: "Сегодня слабый дождь с 16:40 до 17:00"
	parent: alertView

suppImage = new Layer
	parent: alertView
	width: 80.0
	height: 52.0
	image: "images/suppImage.png"
	borderRadius: 12

update_alertView_content = () ->

	suppText.x = Align.left(16)
	suppText.y = Align.top(10)

	if alertView.width > 240
		
		suppText.width = suppText.parent.width - 16 * 2 - 6 - 80
		suppText.fontSize = 16
		suppText.lineHeight = 1.25

		suppImage.width = 80
		suppImage.height = 52
		suppImage.borderRadius = 12
		suppImage.x = Align.right(-6)
		suppImage.y = Align.top(6)

		if suppText.height > suppImage.height
			alertView.height = 10 + suppText.height + 10
		else
			alertView.height = 6 + suppImage.height + 6
		
	
	else
		suppText.width = suppText.parent.width - 16 * 2
		suppText.fontSize = 14
		suppText.lineHeight = 1.2

		suppImage.width = 40
		suppImage.height = 26
		suppImage.borderRadius = 6
		suppImage.x = Align.left(16)
		suppImage.y = Align.top(suppText.y + suppText.height + 12)

		alertView.height = suppText.y + suppText.height + 12 + suppImage.height + 12

	



printView = new TextLayer
	parent: screen
	fontSize: 14
	opacity: 0.5

update_printLayer = () ->
	printView.x = Align.center
	printView.y = Align.bottom(-40)
	printView.text = Canvas.width

screen.width = Canvas.width
screen.height = Canvas.height

updateScreen()





