class Text extends TextLayer
	constructor: (@options={}) ->
		
		_.defaults @options,
			# fontFamily: fontAveria
			fontSize: 28
			weight: 700
			color: "white"
			height: 20
			letterSpacing: 0.7
			letterSpacing: 0.4
			fontWeight: "bold"
# 			textOverflow: "ellipsis"
		
		super @options

		@style =
			"font-family": "Raleway, 'PT Sans', 'Helvetica', 'Tahoma', sans-serif;"
			"font-weight": 700
			"-webkit-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
			"-moz-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
			"-ms-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
			"font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
		


class TextButton extends Text
	constructor: (@options={}) ->
		
		_.defaults @options,
			tuple: { normal: 0.5, hover: 0.8 }
			handler: null
			backgroundColor: "black"
			borderRadius: 24
			padding:
				top: 20
				left: 24
				bottom: 60
				right: 24

		
		super @options
		@style = cursor: "pointer"
		
		@.onMouseOver @Hover
		@.onMouseOut @HoverOff

		@updateTuple(@tuple)
	
	
		
	Hover: =>
		@opacity = @tuple.hover
	HoverOff: =>
		@opacity = @tuple.normal
	
	updateTuple: (newTuple) =>
		@tuple = newTuple
		@emit Events.MouseOver
		@emit Events.MouseOut
	
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)
	
	@define 'tuple',
		get: -> @options.tuple
		set: (value) ->
			@options.tuple = value


class ImageButton extends Text
	constructor: (@options={}) ->
		
		_.defaults @options,
			handler: null
		
		super @options
		@style = cursor: "pointer"
		
		@.onMouseOver @Hover
		@.onMouseOut @HoverOff
	
	Hover: =>
		;
	HoverOff: =>
		;
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)


module.exports = { Text, TextButton, ImageButton }