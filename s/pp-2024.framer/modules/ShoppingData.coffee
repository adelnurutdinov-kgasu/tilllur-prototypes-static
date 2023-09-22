{ Button, ButtonOmnibox, ButtonVideo } = require "Buttons"

shopItemLeft01 = new ButtonOmnibox
	width: 177.0
	height: 342.66666666666663
	image: "images/shopItem_left01.png"

shopItemLeft02 = new ButtonOmnibox
	width: 176.33333333333331
	height: 226.0
	image: "images/shopItem_left02.png"

shopItemLeft03 = new ButtonOmnibox
	width: 176.33333333333331
	height: 160.0
	image: "images/shopItem_left03.png"

shopItemLeft04 = new ButtonOmnibox
	width: 178.0
	height: 258.0
	image: "images/shopItem_left04.png"

shopItemRight01 = new ButtonOmnibox
	width: 176.33333333333331
	height: 256.0
	image: "images/shopItem_right01.png"

shopItemRight02 = new ButtonOmnibox
	width: 178.33333333333331
	height: 261.0
	image: "images/shopItem_right02.png"

shopItemRight03 = new ButtonOmnibox
	width: 176.0
	height: 279.0
	image: "images/shopItem_right03.png"

exports.data =
    left: [shopItemLeft01, shopItemLeft02, shopItemLeft03, shopItemLeft04]
    right: [shopItemRight01, shopItemRight02, shopItemRight03]
