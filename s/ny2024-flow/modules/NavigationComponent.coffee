


{ Button } = require "Buttons"



class FlowView extends FlowComponent
	constructor: (@options={}) ->

		_.defaults @options,
		
		super @options

		if @parent
			@width = @parent.width
			@height = @parent.height



	@define "parent",
		enumerable: false
		exportable: false
		importable: true

		get: ->
			@_parent or null
		
		set: (layer) ->
			return if layer is @_parent

			throw Error("Layer.parent: a layer cannot be it's own parent.") if layer is @

			# Check the type
			if not layer instanceof Layer
				throw Error "Layer.parent needs to be a Layer object"

			# Cancel previous pending insertions
			Utils.domCompleteCancel(@__insertElement)

			# Remove from previous parent children
			if @_parent
				@_parent._children = _.pull @_parent._children, @
				@_parent._element.removeChild @_element
				@_parent.emit "change:children", {added: [], removed: [@]}
				@_parent.emit "change:subLayers", {added: [], removed: [@]}

			# Either insert the element to the new parent element or into dom
			if layer
				layer._element.appendChild @_element
				layer._children.push @
				layer.emit "change:children", {added: [@], removed: []}
				layer.emit "change:subLayers", {added: [@], removed: []}
			else
				@_insertElement()

			oldParent = @_parent
			# Set the parent
			@_parent = layer

			# Place this layer on top of its siblings
			@bringToFront()

			@emit "change:parent", @_parent, oldParent
			@emit "change:superLayer", @_parent, oldParent
			
			# print layer
			@width = layer.width
			@height = layer.height

			# print @width + " " + @height


	stackTransition: (nav, layerA, layerB, overlay) ->
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


	modalTransition: (nav, layerA, layerB, overlay) ->
		transition =
			layerA:
				show: {x: 0, y: 0}
				hide: {x: 0, y: 0}
			layerB:
				show: {x: 0, y: 0}
				hide: {x: 0, y: layerA?.height + 10}
			overlay:
				show: {opacity: .5, x: 0, y: 0, size: nav.size}
				hide: {opacity: 0, x: 0, y: 0, size: nav.size}



	open: (navigationView) ->
		navigationView.scrollToTop(false)
		if navigationView.wrapper != undefined and navigationView.wrapper != null
			@transition(navigationView.parent, @modalTransition)
		else
			@transition(navigationView, @stackTransition)





class ModalView extends ScrollComponent
	constructor: (@options={}) ->

		navigationView_Wrapper = new Layer
			name: "wrapper"
			backgroundColor: null

		navigationView_Wrapper.on Events.Tap, ->
			@children[0].flow.showPrevious()

		_.defaults @options,
			flow: null
			wrapper: navigationView_Wrapper
			scrollVertical: true
			scrollHorizontal: false
			directionLock: true
		
		super @options
		
		@parent = navigationView_Wrapper

		@on Events.Tap, (event, layer) ->
			event.stopPropagation()

		@on Events.SwipeDownStart, (event, layer) ->
			if @scrollY < 0 then @flow.showPrevious()

		# navigationView_Handler = new Layer
		# 	parent: @
		# 	borderRadius: 8
		# 	width: 40, height: 3, x: Align.center, opacity: 0.5
		# 	y: 100
		# 	backgroundColor: "white"
		
		# # @on "change:y", ->
		# # 	@parent.parent.children[1].navigationView_Handler.y = @parent.y - 11
		
		# @content.on "change:y", ->
		# 	localHandler = @parent.children[1]
		# 	# localHandler.y = @parent.y - 11
		# 	print localHandler.y
		
		# @content.emit "change:y"



	@define 'flow',
		get: -> @options.flow
		set: (value) ->
			@options.flow = value
			value.showNext(@)
			value.showPrevious(animate: false)
	
	@define 'wrapper',
		get: -> @options.wrapper
		set: (value) -> @options.wrapper = value

	@define "parent",
		enumerable: false
		exportable: false
		importable: true

		get: ->
			@_parent or null
		
		set: (layer) ->

			# Flow parent
			if layer != @wrapper
				@options.flow = layer

				@wrapper.parent = layer
				@wrapper.width = layer.width
				@wrapper.height = layer.height
				@width = layer.width
				@height = layer.height

				return


			return if layer is @_parent

			throw Error("Layer.parent: a layer cannot be it's own parent.") if layer is @

			# Check the type
			if not layer instanceof Layer
				throw Error "Layer.parent needs to be a Layer object"

			# Cancel previous pending insertions
			Utils.domCompleteCancel(@__insertElement)

			# Remove from previous parent children
			if @_parent
				@_parent._children = _.pull @_parent._children, @
				@_parent._element.removeChild @_element
				@_parent.emit "change:children", {added: [], removed: [@]}
				@_parent.emit "change:subLayers", {added: [], removed: [@]}

			# Either insert the element to the new parent element or into dom
			if layer
				layer._element.appendChild @_element
				layer._children.push @
				layer.emit "change:children", {added: [@], removed: []}
				layer.emit "change:subLayers", {added: [@], removed: []}
			else
				@_insertElement()

			oldParent = @_parent
			# Set the parent
			@_parent = layer

			# Place this layer on top of its siblings
			@bringToFront()

			@emit "change:parent", @_parent, oldParent
			@emit "change:superLayer", @_parent, oldParent


	
	add: (contentView) ->
		contentView.parent = @custom.view.content
		@backgroundColor = null












class NavigationView extends ScrollComponent
	constructor: (@options={}) ->

		_.defaults @options,
			flow: null
			backButton: null
			showBack: true
			scrollVertical: true
			scrollHorizontal: false
			directionLock: true
			custom:
				backButton_name: "Back_Button"
		
		super @options

		try @backButton.bringToFront()

		@on Events.SwipeRightStart, (event, layer) =>
			try @flow.showPrevious()
		
		@on "change:children", ->
			try @backButton.bringToFront()
	

	@define 'flow',
		get: -> @options.flow
		set: (value) ->
			@options.flow = value
			value.showNext(@)
			value.showPrevious(animate: false)



	@define 'backButton',
		get: -> @options.backButton
		set: (value) ->
			@options.backButton = value
			value.name = @custom.backButton_name

			value.parent = @
			value.bringToFront()
			
			try value.handler = () => @flow.showPrevious()
	
	@define 'showBack',
		get: -> @options.showBack
		set: (value) ->
			@options.showBack = value
			if value == true and @backButton == null
				@backButton = @create_BackButton()

	
	create_BackButton: () =>

		return new Button
			name: @custom.backButton_name
			parent: @, size: 80, y: 32
			backgroundColor: null
			# backgroundColor: "red"
			handler: () -> @parent.flow.showPrevious()


	@define "parent",
		enumerable: false
		exportable: false
		importable: true

		get: ->
			@_parent or null
		
		set: (layer) ->

			return if layer is @_parent

			throw Error("Layer.parent: a layer cannot be it's own parent.") if layer is @

			# Check the type
			if not layer instanceof Layer
				throw Error "Layer.parent needs to be a Layer object"

			# Cancel previous pending insertions
			Utils.domCompleteCancel(@__insertElement)

			# Remove from previous parent children
			if @_parent
				@_parent._children = _.pull @_parent._children, @
				@_parent._element.removeChild @_element
				@_parent.emit "change:children", {added: [], removed: [@]}
				@_parent.emit "change:subLayers", {added: [], removed: [@]}

			# Either insert the element to the new parent element or into dom
			if layer
				layer._element.appendChild @_element
				layer._children.push @
				layer.emit "change:children", {added: [@], removed: []}
				layer.emit "change:subLayers", {added: [@], removed: []}
			else
				@_insertElement()

			oldParent = @_parent
			# Set the parent
			@_parent = layer

			# Place this layer on top of its siblings
			@bringToFront()

			@emit "change:parent", @_parent, oldParent
			@emit "change:superLayer", @_parent, oldParent

			@width = @parent.width
			@height = @parent.height

			@flow = @parent

	


	add: (contentView) ->
		contentView.parent = @content



module.exports = { FlowView, NavigationView, ModalView }