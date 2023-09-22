# Preview Component

Framer.Extras.Hints.disable()

# {PreviewClass1} = require "PreviewClass1"
# {PreviewClass4} = require "PreviewClass4"
# {PreviewClass5} = require "PreviewClass5"
{TreeLayerView} = require "TreeLayerView"

# print Preview

class FixPreviewExport extends TreeLayerView
class exports.Preview extends FixPreviewExport




# Native

`window.savePreviewMessageFramerObject = function (layer) {
	window.previewMessageFramerObject = layer
}
`

`window.receiveMessageNormal = function (event) {
	window.previewMessageFramerObject.animateStateToNormal()
}
window.addEventListener("animateNormal", receiveMessageNormal, false);
`

`window.receiveMessage = function (event) {
	console.log(event)
	window.previewMessageFramerObject.animateStateToFill()
}
window.addEventListener("animateFill", receiveMessage, false);
`

# preview.addSection("Section Title", [
# 	{ title: "Title1", handler: handler1 },
# 	{ title: "Title2", handler: handler2 },
# ])





