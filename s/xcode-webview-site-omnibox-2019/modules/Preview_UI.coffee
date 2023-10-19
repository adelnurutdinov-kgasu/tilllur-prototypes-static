
{LogoLayer} = require "Logo"
{Preview_Init} = require "Preview_Init"
{UI_Section} = require "UI_Section"
{UI_Config} = require "UI_Config"


class exports.Preview_UI extends Preview_Init
	constructor: (@options={}) ->

		_.defaults @options,
		
		super @options

		@showDesktopUI()
	


	showDesktopUI: () =>
		if Utils.isMobile() then return

		if @showLogo then @createLogoButton()
		if @showUI then @addConfig()





	createLogoButton: () =>
		
		openHomeHandler = () ->
			window.location = "https://tilllur.com"
		
		logoButton = new LogoLayer
			width: 76, height: 32
			x: Align.left(32), y: Align.top(12)
			handler: openHomeHandler
	

	addSection: (title, actionArray = []) =>
		if @sectionView == null then @sectionView = new UI_Section
		@sectionView.addSection(title, actionArray)


	# Fill ◉
	# Fill ◎

	addConfig: () =>
		@configView = new UI_Config { view: @ } 

		toggleScale = (emptyData, localButton) =>
			if @stateGuard.states.current.name == "normal"
				@animateStateToFill()
				localButton.text = "Fit"
			else
				@animateStateToNormal()
				localButton.text = "100%"
		
		toggleTips = (emptyData, localButton) =>
			if @showHints
				@hideHintsHandler()
				localButton.text = "Hints ◎"
			else
				@showHintsHandler()
				localButton.text = "Hints ◉"

		@configView.addSection([
			{ title: "Hints ◉", handler: toggleTips },
			{ title: "Fit", handler: toggleScale },
		])
	
	
	hideHintsHandler: () =>
		Framer.Extras.Hints.disable()
		@showHints = !@showHints

	showHintsHandler: () =>
		Framer.Extras.Hints.enable()
		Framer.Extras.Hints.showHints()
		@showHints = !@showHints
