
exports.vertical = (layerArray, spacing = 16, padding = { x: 0, y: 0 }) ->
	view = new Layer
		width: layerArray[0].width
		x: padding.x, y: padding.y
		backgroundColor: "white"

	currentValue = 0
	for item in layerArray
		item.parent = view
		item.y = currentValue
		currentValue = currentValue + item.height + spacing

	view.height = currentValue
	return view


exports.horizontal = (layerArray, spacing = 16, padding = { x: 0, y: 0 } ) ->
	view = new Layer
		height: layerArray[0].height
		x: padding.x, y: padding.y
		backgroundColor: "white"

	currentValue = 0
	for item in layerArray
		item.parent = view
		item.x = currentValue
		currentValue = currentValue + item.width + spacing

	view.width = currentValue
	return view

