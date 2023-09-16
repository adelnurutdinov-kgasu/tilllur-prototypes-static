

class Button extends Layer
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

		super @options

		@states =
			"pressed": { scale: 0.9 }
			"normal": { scale: 1.0 }
		
		guard.parent = @
		@guard = guard

		# buttons.push @
		
		@.onTouchStart @Hover
		@.onTouchEnd @HoverOff
		@.onSwipeStart @HoverOff
		@.onDragStart @HoverOff
		
	Hover: => @guard.stateSwitch("pressed")
	HoverOff: => @guard.stateSwitch("normal")

	@define 'guard',
		get: -> @options.guard
		set: (value) -> @options.guard = value
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)


class ButtonOmnibox extends Button
	constructor: (@options={}) ->
		_.defaults @options,
			
		super @options

		@states.pressed.scale = 0.96


class ButtonVideo extends VideoLayer
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

		super @options

		@states =
			"pressed": { scale: 0.98 }
			"normal": { scale: 1.0 }
		
		guard.parent = @
		@guard = guard

		# buttons.push @
		
		@.onTouchStart @Hover
		@.onTouchEnd @HoverOff
		@.onSwipeStart @HoverOff
		@.onDragStart @HoverOff
		
	Hover: => @guard.stateSwitch("pressed")
	HoverOff: => @guard.stateSwitch("normal")

	@define 'guard',
		get: -> @options.guard
		set: (value) -> @options.guard = value
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)



module.exports = { Button, ButtonOmnibox, ButtonVideo }