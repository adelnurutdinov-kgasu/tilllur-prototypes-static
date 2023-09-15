Framer.Extras.Hints.disable()

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5


screenGuard = new Layer
	name: "screenGuard"
	opacity: 0
	x: -2000


{ Preview } = require "PreviewComponent"

screen = new Layer { width: 393, height: 852 }
# new Preview { view: screen }
screen.center()

flow = new FlowComponent
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "red"



# System

create_BackButton = (parentLayer) ->
	backButton = new Layer
		parent: parentLayer
		width: 100
		height: 80
		y: 60
		backgroundColor: "red"
		opacity: 0.4
	
	backButton.onTap ->
		flow.showPrevious()
	
	return backButton



# stackTransition = (nav, layerA, layerB, overlay) ->
# 	transition =
# 		layerA:
# 			show: {options: options, x: 0, y: 0}
# 			hide: {options: options, x: 0 - layerA?.width / 2, y: 0}
# 		layerB:
# 			show: {options: options, x: 0, y: 0}
# 			hide: {options: options, x: layerB.width, y: 0}
# 		overlay:
# 			show: {options: {time: 0.1}, opacity: .5, x: 0, y: 0, size: nav.size}
# 			hide: {options: {time: 0.1}, opacity: 0, x: 0, y: 0, size: nav.size}


stackTransition = (nav, layerA, layerB, overlay) ->
	transition =
		layerA:
			show: {x: 0, y: 0}
			hide: {x: 0 - layerA?.width / 2, y: 0}
		layerB:
			show: {x: 0, y: 0}
			hide: {x: layerB.width, y: 0}
		overlay:
			show: {opacity: .5, x: 0, y: 0, size: nav.size}
			hide: {opacity: 0, x: 0, y: 0, size: nav.size}



# Start

start_NavView = new ScrollComponent
	width: screen.width
	height: screen.height
	backgroundColor: "white"
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true


start_Image = new Layer
	parent: start_NavView.content
	width: 393.0
	height: 1785.0
	image: "images/start_image.png"

start_ShoppingButton = new Layer
	parent: start_Image, size: 200, backgroundColor: "green"

start_ShoppingButton.onTap ->
	shopping_NavView.scrollToTop(false)
	flow.transition(shopping_NavView, stackTransition)



# Shopping

shopping_NavView = new ScrollComponent
	width: screen.width
	height: screen.height
	backgroundColor: "white"
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true

shopping_NavView.onSwipeRightStart ->
	print "shop:"
	print flow.current == shopping_NavView
	flow.showPrevious()

shopping_Image = new Layer
	parent: shopping_NavView.content
	width: 393.0
	height: 1559.0
	image: "images/shopping_image.png"

start_ShoppingButton = new Layer
	parent: shopping_Image, size: 200, backgroundColor: "pink"

start_ShoppingButton.onTap ->
	flow.transition(shop_NavView, stackTransition)

shopping_BackButton = create_BackButton(shopping_NavView.content)


# Shop

shop_NavView = new ScrollComponent
	width: screen.width
	height: screen.height
	backgroundColor: "white"
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true

shop_NavView.onSwipeRightStart ->
	print "shop:"
	print flow.current == shop_NavView
	flow.showPrevious()

shop_Image = new Layer
	parent: shop_NavView.content
	width: 393.0
	height: 1348.0
	image: "images/shop_image.png"

shop_BackButton = create_BackButton(shop_NavView.content)
	



flow.showNext(start_NavView)

flow.showNext(shopping_NavView)
flow.showPrevious(animate: false)

flow.showNext(shop_NavView)
flow.showPrevious(animate: false)
