
{ Preview } = require "PreviewComponent"
{ FlowView, NavigationView, ModalView } = require "NavigationComponent"
{ Button } = require "Buttons"

screen = new Layer { width: 375, height: 812, backgroundColor: "white" }
# preview = new Preview { view: screen }


screen.centerX()
screen.y = 0
screen.originY = 0

aspectRatio = Screen.height / Screen.width
screen.height = screen.width * aspectRatio


scaleW = Screen.width / screen.width
screen.scale = scaleW

# print screen.width * scaleW + " " + screen.height * scaleW
# print footer.y + footer.height * screen.scale


flow = new FlowView { parent: screen }
homeView = new NavigationView { parent: flow, backgroundColor: "white", showBack: false }

box = new Button { parent: homeView.content, borderRadius: 44, handler: () -> @backgroundColor = Utils.randomColor() }
box.center()








footer = new Layer
	parent: screen
	width: 375.0, height: 80.0
	image: "images/footer.png"
	# backgroundColor: "red"
	y: Align.bottom

footerLine = new Layer
	parent: footer
	width: 375, height: 10
	y: Align.bottom
	backgroundColor: "blue"

header = new Layer
	parent: screen
	width: 375.0, height: 136.0
	# backgroundColor: "red"
	image: "images/header.png"
	y: Align.top(44)

headerLine = new Layer
	parent: header
	width: 375, height: 10
	y: Align.top
	backgroundColor: "blue"



