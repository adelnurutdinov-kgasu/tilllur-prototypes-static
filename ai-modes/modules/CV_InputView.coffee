
{ Button } = require "Buttons"

exports.background = () ->
	return new Layer
		width: 375.0
		height: 812.0
		image: "images/input_background.png"




exports.topView = (parent) ->
	return new Layer
		parent: parent
		width: 375
		height: 56
		backgroundColor: null
		y: Align.top(44)

exports.buttonDelete = (parent, handler) ->
	return new Button
		parent: parent
		width: 44.0, height: 44.0, image: "images/button_clear.png"
		x: Align.right(-16), y: Align.center
		handler: handler




exports.promptView = (parent, handler) ->
	promptView = new Layer
		parent: parent
		width: 375.0, height: 180.0
		y: 100
		backgroundColor: null
		custom:
			handler: handler
	
	promptView.onTap ->
		@custom.handler()
	
	promptView.states =
		"null": { opacity: 1 }
		"typed": { opacity: 1 }
		"top": { y: 100 }
		"bottom": { y: 475 }
	promptView.stateSwitch("null")

	promptView.on Events.StateSwitchEnd, (from, to) ->
		if to != from
			if to == "typed" then @children[1].opacity = 1
			else if to == "null" then @children[1].opacity = 0

	promptNull = new Layer
		parent: promptView
		width: 375.0, height: 180.0, image: "images/promptNull.png"

	promptTyped = new Layer
		parent: promptView
		width: 375.0, height: 180.0, image: "images/promptTyped.png"
		opacity: 0
	
	return promptView












exports.bottomView = (parent) ->
	return new Layer
		parent: parent
		width: 375
		height: 64
		backgroundColor: null
		y: Align.bottom(-32)

exports.buttonMagic = (parent, handler) ->
	return new Button
		parent: parent
		width: 44.0
		height: 44.0
		image: "images/button_magic.png"
		x: Align.left(16), y: Align.center
		handler: handler

exports.buttonSettings = (parent, handler) ->
	return new Button
		parent: parent
		width: 44.0
		height: 44.0
		image: "images/button_settings.png"
		x: Align.left(68), y: Align.center
		handler: handler

exports.buttonCamera = (parent, handler) ->
	return new Button
		parent: parent
		width: 44.0
		height: 44.0
		image: "images/button_camera.png"
		x: Align.left(120), y: Align.center
		handler: handler


exports.buttonContinue = (parent, handler) ->
	return new Button
		parent: parent
		size: 44
		image: "images/button_right.png"
		x: Align.right(-125), y: Align.center
		handler: handler
		opacity: 0


exports.buttonNext = (parent, handler) ->
	return new Button
		parent: parent
		width: 101.0
		height: 44.0
		image: "images/button_create.png"
		x: Align.right(-16), y: Align.center
		handler: handler




exports.imageView = (parent) ->
	imageView = new Layer
		parent: parent
		size: 375
		y: Align.top(100)
		image: "images/image_choose.png"

	
	imageView.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	imageView.stateSwitch("hidden")

	return imageView


exports.chooseView = () ->
	return new Layer
		width: 375.0, height: 740.0, image: "images/recent_photo_basic.png"

exports.images = (parent, handler) ->
	return new Button
		parent: parent
		width: 375.0, height: 668.0, image: "images/choose_images_temp.png"
		scaleTo: 1
		handler: handler
		y: 72


exports.chooseButtonClose = (parent, handler) ->
	return new Button
		parent: parent
		width: 44.0, height: 44.0, image: "images/button_close.png"
		x: Align.right(-16), y: Align.top(16)
		handler: handler





exports.settingsView = () ->
	return new Layer
		width: 375.0, height: 740.0, image: "images/settings_base_view.png"

exports.settingsButtonClose = (parent, handler) ->
	return new Button
		parent: parent
		width: 44.0, height: 44.0, image: "images/button_close.png"
		x: Align.right(-16), y: Align.top(16)
		handler: handler
