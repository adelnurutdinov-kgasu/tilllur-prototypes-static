exports.myVar = "myVariable2"


class exports.IconLayer extends Layer
	constructor: (@options={}) ->

		@iconView = new Layer
			size: 48
			image: "images/icons/1.png"
			backgroundColor: Utils.randomColor()
			backgroundColor: null
		
		@iconView.states =
			"hover": { scale: 1.0 }
			"hover-off": { scale: 40/48 }
		@iconView.stateSwitch("hover-off")



		@dots = new Layer
			size: 24
			backgroundColor: null
		
		@dots.states =
			"hidden": { opacity: 0 }
			"shown": { opacity: 1 }
		@dots.stateSwitch("hidden")



		@dotsImage = new Layer
			parent: @dots
			size: @dots.width
			image: "images/dots.png"
		
		@dotsImage.states =
			"hover-off": { opacity: 0.3, scale: 1.0 }
			"hover": { opacity: 1.0, scale: 1.2 }
		@dotsImage.stateSwitch("hover-off")



		@guard = new Layer
			opacity: 0
		
		@guard.states =
			"left": { opacity: 0 }
			"right": { opacity: 0 }
			"hover-off": { opacity: 0 }
		@guard.stateSwitch("hover-off")

		@guard.on Events.StateSwitchEnd, (from, to) ->
			
			if to != from
				if to == "left"
					@parent.dots.animate("shown")
					@parent.dots.children[0].animate("hover")
					@parent.iconView.animate("hover-off")
				else if to == "right"
					@parent.dots.animate("shown")
					@parent.dots.children[0].animate("hover-off")
					@parent.iconView.animate("hover")
				else
					@parent.dots.animate("hidden")
					@parent.dots.children[0].animate("hover-off")
					@parent.iconView.animate("hover-off")
				


		_.defaults @options,
			backgroundColor: Utils.randomColor()
			backgroundColor: null
			deleteHandler: null
			
		super @options


		@width = 36 + 56 + 12
		@height = 56

		@iconView.parent = @
		@iconView.x = Align.left(40)
		@iconView.y = Align.center
		
		@dots.parent = @
		@dots.x = Align.left(12)
		@dots.y = Align.center()

		@guard.parent = @
		
		
		@onMouseOver @Hover
		@onMouseOut @HoverOff
		@onMouseMove @MouseMove
		@onTap @Tapped




	Tapped: (event, layer) =>
		p = event.point.x
		if p >= 12 and p <= 40
			@deleteIcon()
	
	MouseMove: (event, layer) =>
		p = event.point.x

		if p < 40 then @guard.stateSwitch("left")
		else @guard.stateSwitch("right")

	Hover: (event, layer) =>
		@style = cursor: "pointer"
		p = event.point.x

		if p < 40 then @guard.stateSwitch("left")
		else @guard.stateSwitch("right")

	HoverOff: =>
		@style = cursor: "auto"
		@guard.stateSwitch("hover-off")
		

	@define 'image',
		get: -> @iconView.image
		set: (value) ->
			@iconView.image = value
			if @isSystemIcon() then @dots.states.shown.opacity = 0
	
	@define 'deleteHandler',
		get: -> @options.deleteHandler
		set: (value) -> @options.deleteHandler = value
	
	deleteIcon: () =>
		try @deleteHandler(@)
	

	isSystemIcon: () =>
		if @iconView.image == "images/icons/plus.png" then return true
		else if @iconView.image == "images/icons/all.png" then return true 
		return false
	

	# stateSwitchToFill: () =>
	# 	print "ok"
	
