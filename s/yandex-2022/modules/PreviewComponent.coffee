# Preview Component



Assets = require "Preview_Assets"
{LogoLayer} = require "Preview_LogoLayer"

{SectionView} = require "SectionView"
{ConfigView} = require "ConfigView"
{Text, TextButton, Button, ButtonTab} = require "PCButtons"


# document.body.style.cursor = "auto"
overrideTimeValue = "20:21"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

class FixPreviewExport extends Layer
	constructor: (@options={}) ->

		localBorderView = new Layer
			backgroundColor: "000"
			borderRadius: 42 + 16
			opacity: 1
		

		_.defaults @options,
			name: "Preview"

			view: null
			borderView: localBorderView # parent is none
			showDevice: true

			backgroundColor: null
			borderRadius: 42
			clip: true
			assets: Assets.data

			currentState: "fill" # fill / normal

			showButton: true # deprecated
			config: true
			showLogo: true
			forceDesktop: false

			sectionView: null
			configView: null
			hints: true

			# phone detailes
			statusBar: "dark" # light/dark
			homeBar: "dark" # light/dark
			visible: true # true / false
			forceAndroidBar: false # true / false

			# override with care
			prototypeCreationYear: overrideTimeValue

			# getters
			statusBarView: null
			homeBarView: null



		super @options

		@addConfig()

		window.savePreviewMessageFramerObject(@)

		@borderView.sendToBack()
		@borderView.classList.add(Assets.data.borderCSSClass)
		Utils.insertCSS(Assets.data.borderCSS)

		@setScalePreview()
		
		
		
		

	######## INITS ######## ######## ######## ######## ######## ######## ######## ######## ########	

	@define 'view',
		get: -> @options.view
		set: (value) ->
			@options.view = value
			@width = @view.width
			@height = @view.height
			@view.parent = @

			@borderView.width = @width + 16 * 2
			@borderView.height = @height + 16 * 2

	@define 'assets',
		get: -> @options.assets

	@define 'currentState',
		get: -> @options.currentState
		set: (value) -> @options.currentState = value



	@define 'borderView',
		get: -> @options.borderView
		set: (value) -> @options.borderView = value
	
	@define 'showDevice',
		get: -> @options.showDevice
		set: (value) -> @options.showDevice = value
	


	@define 'sectionView',
		get: -> @options.sectionView
		set: (value) -> @options.sectionView = value
	
	@define 'configView',
		get: -> @options.configView
		set: (value) -> @options.configView = value

	@define 'hints',
		get: -> @options.hints
		set: (value) -> @options.hints = value
	

	@define 'statusBar',
		get: -> @options.statusBar
		set: (value) -> @options.statusBar = value
	
	@define 'homeBar',
		get: -> @options.homeBar
		set: (value) -> @options.homeBar = value

	@define 'forceAndroidBar',
		get: -> @options.forceAndroidBar
		set: (value) -> @options.forceAndroidBar = value
	
	@define 'showBars',
		get: -> if @options.visible then return 1 else return 0
		set: (value) -> @options.visible = value

	# deprecated
	@define 'visible',
		get: -> if @options.visible then return 1 else return 0
		set: (value) -> @options.visible = value
	
	@define 'prototypeCreationYear',
		get: -> @options.prototypeCreationYear
		set: (value) -> @options.prototypeCreationYear = value

	@define 'statusBarView',
		get: -> @options.statusBarView
		set: (value) -> @options.statusBarView = value
	
	@define 'homeBarView',
		get: -> @options.homeBarView
		set: (value) -> @options.homeBarView = value
	


	
	
	@define 'showButton',
		get: -> @options.showButton
		set: (value) -> @options.showButton = value

	@define 'config',
		get: -> @options.config
		set: (value) -> @options.config = value
	
	@define 'showLogo',
		get: -> @options.showLogo
		set: (value) -> @options.showLogo = value

	@define 'forceDesktop',
		get: -> @options.forceDesktop
		set: (value) ->
			@options.forceDesktop = value
			if value
				@showDevice = false
				@showBars = false
				@borderRadius = 8







	######## ######## ######## ######## ######## ######## ######## ######## ######## ########

	updateScale: (shouldAnimate = false) =>
		if @currentState == "fill"
			scaleX = (Screen.width - (Screen.width / Canvas.width) * 112) / @width
			scaleY = (Screen.height - (Screen.width / Canvas.width) * 112) / @height
		else
			scaleX = 1
			scaleY = 1
		
		nextScale = Math.min(scaleX, scaleY)
		
		if shouldAnimate then animationOptions = { curve: Spring(damping: 0.8), time: 0.4 }
		else animationOptions = { time: 0.1 }

		@animate(scale: nextScale, x: Align.center, y: Align.center, options: animationOptions)
		@updateBorderView(nextScale, animationOptions)

	updateBorderView: (nextScale, animationOptions) =>
		deltaG = 16
		nextWidth = @width + deltaG * 2
		nextHeight = @height + deltaG * 2
		
		@borderView.animate(width: nextWidth, height: nextHeight, x: Align.center, y: Align.center, scale: nextScale, options: animationOptions)
		try @configView.y = Align.bottom(-8)
	


	animateStateToNormal: () =>
		@currentState = "normal"
		@updateScale(withAnimation = true)
	
	animateStateToFill: () =>
		@currentState = "fill"
		@updateScale(withAnimation = true)
	
	stateSwitchToFill: () =>
		@currentState = "fill"
		@updateScale()

	stateSwitchToNormal: () =>
		@currentState = "normal"
		@updateScale()

	
	showBorderView: () => @borderView.opacity = 1
	hideBorderView: () => @borderView.opacity = 0

	showHints: () =>
		@hints = true
		Framer.Extras.Hints.enable()
		Framer.Extras.Hints.showHints()

	hideHints: () =>
		@hints = false
		Framer.Extras.Hints.disable()

	hideConfig: () =>
		try
			@configView.opacity = 0
			@configView.x = -1000
	
	showConfig: () =>
		try
			@configView.opacity = 1
			@configView.x = 0

	




	######## BARS ######## ######## ######## ######## ######## ######## ######## ######## ########

	createBars: () =>
		@statusBarView = new Layer 
			parent: @, width: @width, y: Align.top, name: ".status bar"
			opacity: @visible, backgroundColor: null
		
		if @forceAndroidBar
			@createClassicAndroidStatusBar(@statusBarView) 

		else if @viewSize(375, 812) or @viewSize(390, 844) or @viewSize(414, 896) or @viewSize(428, 926) or @viewSize(360, 782)
			@createNotchStatusBar(@statusBarView)
			@createHomeIndicator new Layer
				parent: @, width: @width, height: 34, y: Align.bottom, name: ".home bar", opacity: @visible, backgroundColor: null
		
		else if @viewSize(375, 667) or @viewSize(414, 736) or @viewSize(320, 568)
			@createClassicStatusBar(@statusBarView)
		
		
		else @createAndroidStatusBar(@statusBarView)
	
	
	createAndroidStatusBar: (barLayer) =>
		barLayer.height = 32
		
		classicCenterComponent = new TextLayer
			parent: barLayer, width: 52, height: 20, x: Align.left(4), y: Align.top(2 + 5)
			color: @assets.color[@statusBar], backgroundColor: null
			fontSize: 14, fontWeight: 600, textAlign: "center", fontFamily: ".system, SF Pro Text"
			text: @prototypeCreationYear
		
		classicRightomponent = new Layer
			parent: barLayer, width: 100, height: 20, x: Align.right(-4), y: Align.top(5)
			image: @assets.androidStatusBarRightImage[@statusBar]
	
	
	createClassicAndroidStatusBar: (barLayer) =>
		barLayer.height = 20
		
		classicCenterComponent = new TextLayer
			parent: barLayer, width: 52, height: 20, x: Align.left, y: Align.top(2)
			color: @assets.color[@statusBar], backgroundColor: null
			fontSize: 14, fontWeight: 600, textAlign: "center", fontFamily: ".system, SF Pro Text"
			text: @prototypeCreationYear
		
		classicRightomponent = new Layer
			parent: barLayer, width: 100, height: 20, x: Align.right, y: Align.top()
			image: @assets.androidStatusBarRightImage[@statusBar]
	

	createClassicStatusBar: (barLayer) =>
		barLayer.height = 20
		
		classicLeftComponent = new Layer
			parent: barLayer, width: 100, height: barLayer.height, x: Align.left
			image: @assets.oldStatusBarLeftImage[@statusBar]
		
		classicCenterComponent = new TextLayer
			parent: barLayer, width: 54, height: 16, x: Align.center, y: Align.center
			color: @assets.color[@statusBar], backgroundColor: null
			fontSize: 12, fontWeight: 600, textAlign: "center", fontFamily: ".system, SF Pro Text"
			text: @prototypeCreationYear
		
		classicRightomponent = new Layer
			parent: barLayer, width: 100, height: barLayer.height, x: Align.right
			image: @assets.oldStatusBarRightImage[@statusBar]
		
	
	createNotchStatusBar: (barLayer) =>
		barLayer.height = 44
		
		notchLeftComponent = new TextLayer
			parent: barLayer, width: 54, height: 21, x: Align.left(21), y: Align.top(12)
			color: @assets.color[@statusBar], backgroundColor: null, letterSpacing: -0.17
			fontSize: 15, fontWeight: 600, textAlign: "center", fontFamily: ".system, SF Pro Text"
			text: @prototypeCreationYear
		
		notchCenterComponent = new Layer
			parent: barLayer, width: 375, height: barLayer.height, x: Align.center
			image: @assets.notch
		
		notchRightComponent = new Layer
			parent: barLayer, width: 100, height: barLayer.height, x: Align.right
			image: @assets.statusBarRightImage[@statusBar]
	
	
	createHomeIndicator: (barLayer) =>
		@homeBarView = new Layer
			name: ".homeView"
			parent: barLayer, width: 135, height: 5, x: Align.center, y: Align.bottom(-8)
			backgroundColor: @assets.color[@homeBar], borderRadius: 20
	

	createLogoButton: () =>
		
		openHomeHandler = () ->
			window.location = "https://tilllur.com"
		
		logoButton = new LogoLayer
			width: 76, height: 32
			x: Align.left(32), y: Align.top(12)
			handler: openHomeHandler
			backgroundColor: null
			borderColor: null
		
		logoButton.showHint = -> ;
	
	
	# createScaleButton: (forState) =>
		
	# 	buttonScale = new Layer
	# 		size: 48, borderRadius: 48
	# 		x: Align.right(-32), y: Align.bottom(-32)
	# 		backgroundColor: "rgba(255,255,255, 0.1)"
	# 		borderWidth: 2
	# 		custom:
	# 			preview: @
		
	# 	buttonScale.style = cursor: "pointer"
		
	# 	buttonScale.states =
	# 		"normal": { borderColor: "rgba(255,255,255, 0.2)" }
	# 		"fill": { borderColor: "rgba(255,255,255, 0.6)" }
	# 	buttonScale.stateSwitch(forState)
		
	# 	buttonInsideLayer = new Layer
	# 		parent: buttonScale
	# 		borderWidth: 2
	# 		size: 28, borderRadius: 22
	# 		x: 10, y: 10
	# 		backgroundColor: null
			
	# 	buttonInsideLayer.states =
	# 		"normal": { borderColor: "rgba(255,255,255, 0.6)" }
	# 		"fill": { borderColor: "rgba(255,255,255, 0.2)" }
	# 	buttonInsideLayer.stateSwitch(forState)
		
	# 	buttonScale.onTap ->
	# 		if @states.current.name == "fill" then nextState = "normal" else nextState = "fill"

	# 		@stateSwitch(nextState)
	# 		@children[0].stateSwitch(nextState)
			
	# 		if nextState == "fill" then @custom.preview.animateStateToFill()
	# 		else @custom.preview.animateStateToNormal()

		
	# 	updateButtonOnResize = (buttonLayer) =>
	# 		localButton = buttonLayer
	# 		Canvas.on "change:height", => buttonLayer.x = Align.right(-32)
	# 		Canvas.on "change:width", => buttonLayer.y = Align.bottom(-32)
		
	# 	updateButtonOnResize(buttonScale)




	

	######## SCALE ######## ######## ######## ######## ######## ######## ######## ######## ########

	setPreviewData: () =>

		forState = @getStateGeneric("scale", [{ value: "fill", result: "fill" },
												{ value: "normal", result: "normal" },
												{ value: "true", result: "fill" },
												{ value: "false", result: "normal" }], @currentState)

		# deprecated
		shouldShowButton = @getStateGeneric("button", [{ value: "false", result: false },
														{ value: "true", result: true },
														{ value: "off", result: false },
														{ value: "on", result: true }], @showButton)
		
		shouldShowConfig = @getStateGeneric("config", [{ value: "false", result: false },
														{ value: "true", result: true },
														{ value: "off", result: false },
														{ value: "on", result: true }], @config)

		shouldShowLogo = @getStateGeneric("logo", [{ value: "false", result: false },
													{ value: "off", result: false }], @showLogo)
												
		shouldShowDevice = @getStateGeneric("device", [{ value: "false", result: false },
													{ value: "off", result: false }
													{ value: "true", result: true }], @showDevice)

		
		if shouldShowLogo then @createLogoButton()
		if shouldShowDevice then @showBorderView() else @hideBorderView()

		if shouldShowButton then @showConfig() else @hideConfig() # deprecated
		if shouldShowConfig then @showConfig() else @hideConfig()



	# getStateGeneric: (key = "scale", pairs = [{ value: , result: }, {value: , result: }], defaultResult = "")
	getStateGeneric: (stateKey = "scale", statePairs = [], defaultResult = "") =>
		result = defaultResult

		for item in location.search[1..].split('&')
			keyValuePair = item.split("=")
			keyPart = keyValuePair[0]
			valuePart = keyValuePair[1]

			if keyPart == stateKey
				for pair in statePairs
					if valuePart == pair.value
						# print "ok " + " #{pair.value}" 
						result = pair.result
					# else
						# print "not " + " #{pair.value}" 
		
		return result
	
	
	# screenSize: (w, h) => return Screen.width == w and Screen.height == h
	viewSize: (w, h) => return @width == w and @height == h
	viewWidth: (w) => return @width == w
			
	
	setScalePreview: () =>
		@setPreviewData()
		@updateScale()
		@updatePreviewOnResize()
		@createBars()
		

	updatePreviewOnResize: () =>
		localPreview = @
		Canvas.on "change:height", => localPreview.updateScale()
		Canvas.on "change:width", => localPreview.updateScale()
		Screen.on "change:height", => localPreview.updateScale()
		Screen.on "change:width", => localPreview.updateScale()
	

	addSection: (title, actionArray = []) =>
		if @sectionView == null then @sectionView = new SectionView
		@sectionView.addSection(title, actionArray)

	addConfig: (title, actionArray = []) =>
		if @configView == null then @configView = new ConfigView

		toggleScale = (emptyData, localButton) =>
			if @currentState == "fill"
				@animateStateToNormal()
				localButton.text = "Fill ◎"
			else
				@animateStateToFill()
				localButton.text = "Fill ◉"
		
		toggleTips = (emptyData, localButton) =>
			if @hints
				@hideHints()
				localButton.text = "Hints ◎"
			else
				@showHints()
				localButton.text = "Hints ◉"

		@configView.addSection([
			{ title: "Fill ◉", handler: toggleScale },
			{ title: "Hints ◉", handler: toggleTips },
		])
	
	# ⚫️◉◎

	# previewMobile: () =>

	# 	@scale = Screen.width / @width
	# 	@originX = 0
	# 	@originY = 0
	
	
	# setCustomPreview: () =>
	# 	@y = Align.top
		
	# 	@scale = (Screen.height - 120) / @height
	# 	@borderRadius = 20
	# 	@clip = true


		
	





class exports.Preview extends FixPreviewExport




# Native

`window.savePreviewMessageFramerObject = function (layer) {
	window.previewMessageFramerObject = layer
}
`

`window.receiveMessageNormal = function (event) {
	window.previewMessageFramerObject.animateStateToNormal()
}
window.addEventListener("animateNormal", receiveMessageNormal, false);
`

`window.receiveMessage = function (event) {
	console.log(event)
	window.previewMessageFramerObject.animateStateToFill()
}
window.addEventListener("animateFill", receiveMessage, false);
`



