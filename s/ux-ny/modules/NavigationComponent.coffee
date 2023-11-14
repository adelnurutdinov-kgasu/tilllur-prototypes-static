
{ Button } = require "Buttons"

{ Preview_Class } = require "Preview_Class"

class FlowView extends FlowComponent
	constructor: (@options={}) ->

		_.defaults @options,
		
		super @options

		if @parent
			@width = @parent.width
			@height = @parent.height


		# @on Events.TransitionStop, (layerA, layerB) ->
		# 	print layerB.name


		@on Events.TransitionStart, (layerA, layerB) ->
		# 	# print "start —> " + layerA.name ? 1 + " " + layerB.name ? 2
		# 	print "-"
		# 	print "start —> " + layerB.name ? 2
			if layerB != undefined and layerB.custom != undefined and layerB.custom.customAction_Array != undefined
				@iterateThroughChildren layerB, layerB.custom.customAction_Array, @customAction_switchOnLayers
			
			if layerA != undefined and layerA.custom != undefined and layerA.custom.customAction_Array != undefined
				@iterateThroughChildren layerA, layerA.custom.customAction_Array, @customAction_switchOffLayers
		
		# @on Events.TransitionHalt, (layerA, layerB) ->
		# 	print "halt —> " + layerB.name ? 2

		# @on Events.TransitionStop, (layerA, layerB) ->
		# 	print "stop —> " + layerB.name ? 2

		# @on Events.TransitionEnd, (layerA, layerB) ->
		# 	# print "end —> " + layerA.name ? 1 + " " + layerB.name ? 2
		# 	print "end —> " + layerB.name ? 2
			
		# 	if @stack and @stack.length == 1 and @stack[0] == layerB and layerB != undefined
		# 		@iterateThroughChildren layerB, layerB.custom.customAction_Array, @customAction_switchOnLayers
		
		



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
			
			@width = layer.width
			@height = layer.height


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


	customAction_switchOnLayers: (layer, box, flow) ->
		# if box == undefined then return

		layerToCheck = layer
		index = box.indexOf(layerToCheck)

		if index != -1
			layer.ignoreEvents = false
			box.splice(index, 1)



	customAction_switchOffLayers: (layer, box, flow) ->
		
		# if layer.name == "tempname" then print "ok"
		# if layer.shouldShowHint()
		# print "check: " + layer.name

		if flow.shouldShowHintOverride(layer)
			# print "will off layer " + layer.name
			box.push layer
			layer.ignoreEvents = true
		

		# if layer.parent instanceof ScrollComponent or layer.parent instanceof PageComponent
		# 	# print "here"
		# 	# print layer
		# 	# print layer.parent
		# 	# print layer.ignoreEvents

		# 	if layer.ignoreEvents == false
		# 		# print "inside"
		# 		box.push layer
		# 		layer.ignoreEvents = true



		# if layer instanceof Button
		# 	if !layer.ignoreEvents
		# 		box.push layer
		# 		layer.ignoreEvents = true
		
		# else if layer.parent instanceof NavigationView
		# 	box.push layer
		# 	layer.ignoreEvents = true

		# 	box.push layer.parent
		# 	layer.parent.ignoreEvents = true
		
		# else if layer.parent instanceof ModalView

		# 	box.push layer
		# 	layer.ignoreEvents = true

		# 	box.push layer.parent
		# 	layer.parent.ignoreEvents = true

		# 	box.push layer.parent.parent
		# 	layer.parent.parent.ignoreEvents = true

	
	
	
	shouldShowHintOverride: (layer) ->
		if layer.ignoreEvents is true then return false
		# if layer.isAnimating then return false

		# for parent in @ancestors()
			# return false if parent.isAnimating

		# for parent in layer.ancestors()
		# 	# if parent instanceof Preview_Class
		# 	# 	# if layer instanceof Button then print "HERE"
		# 	# 	continue
		# 	# if parent.isAnimating
		# 	# 	if layer instanceof Button then print "???"
		# 	# 	if layer instanceof Button then print parent
		# 	return false if parent.isAnimating

		if layer._draggable and layer._draggable.horizontal is false and layer._draggable.vertical is false
			return false

		return false if layer.opacity is 0

		for eventName in layer.listenerEvents()
			return true if Events.isInteractive(eventName)
		
		return false



	iterateThroughChildren: (layer, box, actionCallback) ->
		actionCallback layer, box, @
		for child in layer.children
			@iterateThroughChildren child, box, actionCallback


	open: (navigationView) ->
		navigationView.scrollToTop(false)
		# @iterateThroughChildren @current, @current.custom.customAction_Array, @customAction_switchOffLayers

		if navigationView.wrapper != undefined and navigationView.wrapper != null
			@transition(navigationView.parent, @modalTransition)
			# @iterateThroughChildren navigationView.parent, navigationView.parent.custom.customAction_Array, @customAction_switchOnLayers
		else
			@transition(navigationView, @stackTransition)
			# @iterateThroughChildren navigationView, navigationView.custom.customAction_Array, @customAction_switchOnLayers






class ModalView extends ScrollComponent
	constructor: (@options={}) ->

		navigationView_Wrapper = new Layer
			name: "wrapper"
			backgroundColor: null
			custom:
				customAction_Array: []

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
			if @scrollY < 0
				@flow.showPrevious()
				# @flow.iterateThroughChildren @, @custom.customAction_Array, @flow.customAction_switchOffLayers

		if @flow
			@flow.showNext(@wrapper)
			@flow.showPrevious(animate: false)



	@define 'flow',
		get: -> @options.flow
		# set: (value) ->
		# 	@options.flow = value
		# 	value.showNext(@)
		# 	value.showPrevious(animate: false)
	
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
			preventBackSwipe: false
			scrollVertical: true
			scrollHorizontal: false
			directionLock: true
			custom:
				backButton_name: "Back_Button"
				customAction_Array: []
		
		super @options

		try @backButton.bringToFront()

		if @preventBackSwipe == false
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
	

	@define 'preventBackSwipe',
		get: -> @options.preventBackSwipe
		set: (value) -> @options.preventBackSwipe = value



	@define 'backButton',
		get: -> @options.backButton
		set: (value) ->
			@options.backButton = value
			value.name = @custom.backButton_name

			value.parent = @
			value.bringToFront()
			
			try value.handler = () =>
				@flow.showPrevious()
				# @flow.iterateThroughChildren @, @custom.customAction_Array, @flow.customAction_switchOffLayers
	
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