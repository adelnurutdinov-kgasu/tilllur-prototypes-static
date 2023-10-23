
{ Button } = require "Buttons"

exports.background = () ->
	return new Layer
		width: 375.0
		height: 380.0
		backgroundColor: "white"


exports.changeButton = (parent, handler) ->
	return new Button
		parent: parent
		width: 375.0, height: 86.0, image: "images/big_button_change.png"
		y: Align.bottom(-32-86)
		handler: handler
		scaleTo: 0.96

exports.createButton = (parent, handler) ->
	return new Button
		parent: parent
		width: 375.0, height: 86.0, image: "images/big_button_create.png"
		y: Align.bottom(-32)
		handler: handler
		scaleTo: 0.96


exports.modesView = (parent) ->

	modesView = new ScrollComponent
		parent: parent
		width: 375
		height: 180
		scrollVertical: false
		scrollHorizontal: true
		directionLock: true
	

	# mode01 = new Button
	# 	width: 160.0, height: 160.0, image: "images/mode01.png"
	# 	scaleTo: 0.94

	mode02 = new Button
		width: 160.0, height: 160.0, image: "images/mode02.png"
		scaleTo: 0.94

	mode03 = new Button
		width: 160.0, height: 160.0, image: "images/mode03.png"
		scaleTo: 0.94

	mode04 = new Button
		width: 160.0, height: 160.0, image: "images/mode04.png"
		scaleTo: 0.94

	mode05 = new Button
		width: 160.0, height: 160.0, image: "images/mode05.png"
		scaleTo: 0.94

	mode06 = new Button
		width: 160.0, height: 160.0, image: "images/mode06.png"
		scaleTo: 0.94

	mode07 = new Button
		width: 160.0, height: 160.0, image: "images/mode07.png"
		scaleTo: 0.94

	mode08 = new Button
		width: 160.0, height: 160.0, image: "images/mode08.png"
		scaleTo: 0.94
	
	for item, i in [mode02, mode03, mode04, mode05, mode06, mode07, mode08]
		item.parent = modesView.content
		item.width = 140
		item.height = 140
		item.x = 16 + (140 + 4) * i
		item.y = 20
	
	return modesView



exports.toysBackground = () ->
	return new Layer
		width: 375.0, height: 812.0, image: "images/create_toy_view.png"

# exports.toysInput = (parent, handler) ->
# 	return new Button
# 		parent: parent
# 		width: 375.0, height: 180.0, image: "images/toys_input.png"
# 		scaleTo: 1
# 		y: 100
# 		handler: handler

# exports.toysCloseButton = (parent, handler) ->
# 	return new Button
# 		parent: parent
# 		width: 44.0, height: 44.0, image: "images/button_close.png"
# 		x: Align.right(-16), y: Align.top(16)
# 		handler: handler

exports.toysCreateButton = (parent, handler) ->
	return new Button
		parent: parent
		width: 176.0, height: 44.0, image: "images/button_create_toy.png"
		x: Align.right(-16), y: Align.bottom(-40)
		handler: handler
