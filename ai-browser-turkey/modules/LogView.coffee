

class LogView extends ScrollComponent
	constructor: (@options={}) ->
		
		_.defaults @options,
			node: null
		
		super @options

		if @node then @printNode(@node)
	
	@define 'node',
		get: -> @options.node
		set: (value) -> @options.node = value

	printNode: (node, level = 0) =>
		if node.name == "" then layerName = "Untitled" else layerName = node.name
		# print Array(level + 1).join(" ・ ") + " #{layerName}"

		treeNodeLayer = new TextLayer
			parent: @content
			text: Array(level + 1).join(" ・ ") +
			"#{node.name}: #{node.width}x#{node.height}"
			# " #{layerName}"
			
			fontSize: 15
			fontWeight: 500
			color: "white"

			opacity: if layerName == "Untitled" then 0.5 else 1
			height: 28
			y: @height
			# backgroundColor: Utils.randomColor()
			backgroundColor: null
			custom:
				layer: node
		
		# treeNodeLayer.onTap ->
			# print "#{@custom.layer.name} x: #{@custom.layer.x} y: #{@custom.layer.y} size: #{@custom.layer.width}x#{@custom.layer.height}"

		
		@height += 28

		if node.children.length > 0
			nextLevel = level + 1
			for childNode in node.children
				@printNode(childNode, nextLevel)


module.exports = {LogView}