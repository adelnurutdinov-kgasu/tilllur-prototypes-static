

class exports.ScrollGuard extends Layer
	constructor: (@options={}) ->

		_.defaults @options,
			name: "scrollGuard"
			opacity: 0
			scrollView: null
			progressView: null
		
		super @options


	@define 'scrollView',
		get: -> @options.scrollView
		set: (value) ->
			@options.scrollView = value
			value.scrollGuard = @
	
	@define 'progressView',
		get: -> @options.progressView
		set: (value) ->
			@options.progressView = value
			value.scrollGuard = @

	snapPage: (index) =>
		try @scrollView.snapToPage(@scrollView.content.children[index])

	snapProgress: (index) =>
		try @progressView.snapToIndex(index)





class exports.AlertView extends PageComponent
	constructor: (@options={}) ->

		@alertGuard = new Layer
			opacity: 0
			y: -2000

		@alertGuard.states =
			"top": { opacity: 0 }
			"bottom": { opacity: 0 }
		@alertGuard.stateSwitch("top")

		@alertGuard.on Events.StateSwitchEnd, (from, to) ->
			if from != to then @parent.snapToNextPage(to)


		_.defaults @options,
			snapDotsToPageIndex: null
			scrollGuard: null
			backgroundColor: null
		
		super @options

		@alertGuard.parent = @
        
		@width = @parent.width
		@height = @parent.height
        # @x = 20



		@on Events.MouseWheel, (event, layer) ->
            # print event.deltaY
            # print @alertGuard
			if event.deltaY < 0
                # print "1"
                @alertGuard.stateSwitch("top")
			else if event.deltaY > 0
                # print "2"
                @alertGuard.stateSwitch("bottom")


		@on "change:currentPage", ->
			# print @scrollGuard

			for item, i in @content.children
				if item == @currentPage
					nextIndex = i
					@scrollGuard.snapProgress(nextIndex)
					return
			
	

	@define 'snapDotsToPageIndex',
		get: -> @options.snapDotsToPageIndex
		set: (value) -> @options.snapDotsToPageIndex = value
	
	@define 'scrollGuard',
		get: -> @options.scrollGuard
		set: (value) -> @options.scrollGuard = value








class exports.DotsView extends Layer
	constructor: (@options={}) ->

		@dotPages = new PageComponent
			width: 8
			scrollVertical: false
			scrollHorizontal: false
			backgroundColor: "red"
			backgroundColor: null


		_.defaults @options,
			width: 8
			height: 66
			x: Align.right(-351)
			y: Align.top(119)
			scrollGuard: null
			backgroundColor: null

		super @options

		@dotPages.parent = @

	
	@define 'scrollGuard',
		get: -> @options.scrollGuard
		set: (value) -> @options.scrollGuard = value


	tapHandler: (event, layer) =>
		for item, i in @dotPages.content.children
			if item == layer
				@scrollGuard.snapPage(i)
				return


	snapToIndex: (index) =>
		for item, i in @dotPages.content.children
			if i == index
				item.stateSwitch("shown")
			else
				item.stateSwitch("hidden")


	addPage: (layer) =>
		layer.parent = @dotPages.content
		layer.handler = @tapHandler

		for item, i in @dotPages.content.children
			item.y = i * (8 + 6)
			if i == 0 then item.stateSwitch("shown") else item.stateSwitch("hidden")
		
		@dotPages.height = @dotPages.content.children.length * (8 + 6) - 6
		@dotPages.y = Align.center

	




class exports.DotButton extends Layer
	constructor: (@options={}) ->
		
		_.defaults @options,
			size: 8
			handler: null
			prevState: "shown"
			backgroundColor: "#000"
			borderRadius: "100%"
		
		super @options
		@style = cursor: "pointer"
		
		@.onMouseOver @Hover
		@.onMouseOut @HoverOff

		@states =
			"shown": { opacity: 1 }
			"hidden": { opacity: 0.2 }
		
		@on Events.StateSwitchEnd, (from, to) ->
			@prevState = to
		
	
	Hover: =>
		@opacity = 0.5
	
	HoverOff: =>
		if @prevState == "shown" then @opacity = 1
		else @opacity = 0.2
	
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)
	
	@define 'prevState',
		get: -> @options.prevState
		set: (value) -> @options.prevState = value


