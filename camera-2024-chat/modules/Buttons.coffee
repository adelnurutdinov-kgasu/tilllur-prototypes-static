

class exports.Button extends Layer
	constructor: (@options={}) ->

		guard = new Layer { size: 10, backgroundColor: "null" }
		
		guard.states =
			"pressed": { opacity: 0 }
			"normal": { opacity: 0 }
		
		guard.on Events.StateSwitchEnd, (from, to) ->
			if from != to then @parent.animate(to)

		_.defaults @options,
			handler: null
			guard: null
			scaleTo: 0.9

		savedOptions =
			x: @options.x
			y: @options.y

		@options.x = null
		@options.y = null
		
		super @options

		if savedOptions.x then @x = savedOptions.x
		if savedOptions.y then @y = savedOptions.y

		@states =
			"pressed": { scale: @scaleTo }
			"normal": { scale: 1.0 }
		
		guard.parent = @
		@guard = guard
		
		@.onTouchStart @Hover
		@.onTouchEnd @HoverOff
		@.onSwipeStart @HoverOff
		@.onDragStart @HoverOff
	
	Hover: => @guard.stateSwitch("pressed")
	HoverOff: => @guard.stateSwitch("normal")



	@define 'guard',
		get: -> @options.guard
		set: (value) -> @options.guard = value
	
	@define 'scaleTo',
		get: -> @options.scaleTo
		set: (value) -> @options.scaleTo = value
	
	@define 'handler',
		get: -> @options.handler
		set: (value) -> 
			@on Events.Tap, Utils.throttle(0.2, value)
	