
AppView = require "appView"

shuffle = (source) ->
	return source unless source.length >= 2
	for index in [source.length-1..1]
		randomIndex = Math.floor Math.random() * (index + 1)
		[source[index], source[randomIndex]] = [source[randomIndex], source[index]]
	return source

iconCycler = Utils.cycle(shuffle([1...18]))


class exports.NavigationComponent extends PageComponent
	constructor: (@options={}) ->

		_.defaults @options,
			backgroundColor: null
			scrollHorizontal: false
			scrollVertical: false
			contentInset:
				top: 16
				bottom: 16

		
		super @options

		@content.clip = false

		@content.on "change:children", ->
			@parent.updateViewHeight()



	updateViewHeight: () =>
		@height = @content.children.length * 56 + 16
		@y = Align.bottom(-48)
		@updateContent()

	addIcon: () =>
		new AppView.IconLayer
			parent: @content
			image: "images/icons/#{iconCycler()}.png"
			deleteHandler: @deleteIcon

	deleteIcon: (iconLayer) =>
		iconLayer.destroy()
		@updateViewHeight()

	updateIcons: () =>
		item.y = 56 * i for item, i in @content.children
		@updateViewHeight()

	