
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
		height: 64
		backgroundColor: null
		y: Align.top(44)

exports.buttonTag = (parent, handler) ->
	return new Button
		parent: parent
		width: 44.0, height: 44.0, image: "images/button_tag.png"
		x: Align.right(-16), y: Align.center
		handler: handler

exports.buttonMusic = (parent, handler) ->
	return new Button
		parent: parent
		width: 44.0, height: 44.0, image: "images/button_music.png"
		x: Align.right(-68), y: Align.center
		handler: handler

exports.buttonText = (parent, handler) ->
	return new Button
		parent: parent
		width: 44.0, height: 44.0, image: "images/button_text.png"
		x: Align.right(-120), y: Align.center
		handler: handler




exports.imageView = (parent) ->
	imageView = new Layer
		parent: parent
		size: 375
		y: Align.top(176)
	
	imageView.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 1 }
	imageView.stateSwitch("hidden")

	imageView.on Events.StateSwitchEnd, (from, to) ->
		if to != from
			if to == "shown" then @children[1].opacity = 1
			else if to == "hidden" then  @children[1].opacity = 0
	
	imageProgress = new Layer
		parent: imageView
		width: 375.0, height: 375.0, image: "images/progress_1.png"
	
	imageProgress.states =
		"text1": { image: "images/progress_1.png" }
		"text2": { image: "images/progress_2.png" }
		"image1": { image: "images/progress_3.png" }
		"image2": { image: "images/progress_3.png" }
		"toys1": { image: "images/progress_toys.png"}
	imageProgress.stateSwitch("text1")

	for stateName in imageProgress.stateNames
		if stateName != "default"
			Framer.Extras.Preloader.addImage(imageProgress[stateName])



	imageDone = new Layer
		parent: imageView
		width: 375.0, height: 375.0, image: "images/result_1.png"
		opacity: 0
	
	imageDone.states =
		"text1": { image: "images/result_1.png" }
		"text2": { image: "images/result_2.png" }
		"image1": { image: "images/result_3.png" }
		"image2": { image: "images/result_3.png" }
		"toys1": { image: "images/result_toys.png"}
	imageDone.stateSwitch("text1")

	for stateName in imageProgress.stateNames
		if stateName != "default"
			Framer.Extras.Preloader.addImage(imageDone[stateName])

	return imageView



exports.timeView = (parent) ->
	timeView = new Layer
		parent: parent
		width: 375.0, height: 228.0, image: "images/timeleft_image.png"
		y: Align.bottom(-32)
	
	timeView.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	
	timeView.stateSwitch("shown")

	return timeView


	# width: 375.0, height: 375.0, image: "images/progress_toys.png"
	# width: 375.0, height: 375.0, image: "images/result_toys.png"


exports.bottomView = (parent) ->
	bottomView = new Layer
		parent: parent
		width: 375
		height: 64
		backgroundColor: null
		y: Align.bottom(-32)
	
	bottomView.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	
	bottomView.stateSwitch("hidden")

	return bottomView

exports.buttonReroll = (parent, handler) ->
	return new Button
		parent: parent
		width: 44.0, height: 44.0, image: "images/button_reroll.png"
		x: Align.left(16), y: Align.center
		handler: handler

exports.buttonSave = (parent, handler) ->
	return new Button
		parent: parent
		width: 44.0, height: 44.0, image: "images/button_save.png"
		x: Align.left(68), y: Align.center
		handler: handler

# exports.buttonEdit = (parent, handler) ->
# 	return new Button
# 		parent: parent
# 		width: 44.0, height: 44.0, image: "images/button_edit.png"
# 		x: Align.left(68), y: Align.center
# 		handler: handler



# exports.buttonSave = (parent, handler) ->
# 	return new Button
# 		parent: parent
# 		width: 44.0, height: 44.0, image: "images/button_save.png"
# 		x: Align.right(-177), y: Align.center
# 		handler: handler

exports.buttonPublish = (parent, handler) ->
	return new Button
		parent: parent
		width: 153.0, height: 44.0, image: "images/button_publish.png"
		x: Align.right(-16), y: Align.center
		handler: handler



