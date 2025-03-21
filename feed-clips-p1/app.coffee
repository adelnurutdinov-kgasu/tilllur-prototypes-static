
Canvas.backgroundColor = "222"


#

createCard = (cardHeight = 375) ->
	


{ Preview } = require "PreviewComponent"

screen = new Layer { width: 375, height: 812, backgroundColor: "111" }
new Preview { view: screen, statusBar: "light", homeBar: "light" }

# Scroll

data =
	height: [253, 586, 632]

feedScroll = new PageComponent
	scrollVertical: true
	scrollHorizontal: false
	width: screen.width
	height: screen.height
	parent: screen
	contentInset: 
		bottom: 82 + 34

page0 = new Layer
	parent: feedScroll.content
	width: feedScroll.width
	height: data.height[0]

page1 = new Layer
	parent: feedScroll.content
	width: feedScroll.width
	height: data.height[1]
	y: data.height[0]

page2 = new Layer
	parent: feedScroll.content
	width: feedScroll.width
	height: data.height[2]
	y: data.height[0] + data.height[1]

for item in [page0, page1, page2]
	item.backgroundColor = null
# 	item.backgroundColor = Utils.randomColor()


feedScroll.on "change:currentPage", ->
	if feedScroll.currentPage == page0 or feedScroll.currentPage == page1
		video1.player.play()
		video2.player.pause()
	else
		video2.player.play()
		video1.player.pause()

# View




header = new Layer
	parent: screen
	width: 375
	height: 248
	image: "images/header.png"

header.states =
	"page0": { opacity: 1 }
	"page1": { opacity: 0 }
header.stateSwitch("page0")



card1 = new Layer
	parent: screen
	width: 375
	height: 586
# 	image: "images/card1.png"
	originY: 0
	borderRadius: 24
	clip: true

card1.states =
	"page0": { y: 253, scale: (375 - 14 * 2) / 375 }
	"page1": { y: 110, scale: 1 }
	"page2": { y: 110 - 586 - 8, scale: 1 }

card1.stateSwitch("page0")





card2 = new Layer
	parent: screen
	width: 375
	height: 632
# 	image: "images/card2.png"
	originY: 0
	borderRadius: 24
	clip: true

card2.states =
	"page0": { y: 800, scale: (375 - 14 * 2) / 375 }
	"page1": { y: 702, scale: 1 }
	"page2": { y: card1.states.page1.y }

card2.stateSwitch("page0")




fixHeader = new Layer
	parent: screen
	width: 375
	height: 100
	backgroundColor: "black"

fixHeader.states =
	"page0": { opacity: 0 }
	"page1": { opacity: 1 }
fixHeader.stateSwitch("page0")

zenHeader = new Layer
	parent: screen
	width: 375
	height: 56
	y: 44
	image: "images/zenHeader.png"

zenHeader.states =
	"page0": { opacity: 0 }
	"page1": { opacity: 1 }
zenHeader.stateSwitch("page0")






deltaData = [
	143,
	143 + 556
]

gaps = [
	[0, deltaData[0]],
	[deltaData[0], deltaData[1]]
]

fastHide = [0, deltaData[0] / 2 - 30]
lateHide = [deltaData[0] / 2 - 20, deltaData[0]]

feedScroll.content.on "change:y", ->
	v = feedScroll.scrollY
	
# 	print v
# 	print gaps[1]
	
	if v < gaps[0][1]
		[s1, s2] = ["page0", "page1"]
		l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
			true) for [l, d, g] in [[card1, "scale", gaps[0]],
									[card1, "y", gaps[0]],
									[card2, "scale", gaps[0]],
									[card2, "y", gaps[0]],
									[header, "opacity", fastHide],
									[zenHeader, "opacity", gaps[0]],
									[fixHeader, "opacity", gaps[0]],
			
		]
	
	else
		[s1, s2] = ["page1", "page2"]
		l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
			true) for [l, d, g] in [[card1, "y", gaps[1]],
									[card1, "scale", gaps[1]]
									[card2, "y", gaps[1]],
# 									[header, "opacity", fastHide],
# 									[zenHeader, "opacity", gaps[0]],
			
		]


# Preview

video1 = new VideoLayer
	parent: card1
	x: Align.center
	y: Align.center
	width: 288
	height: 512
	scale: 1.5



card1Content = new Layer
	parent: card1
	width: card1.width
	height: card1.height
	image: "images/card1.png"


video2 = new VideoLayer
	parent: card2
	x: Align.center
	y: Align.center
	width: 288
	height: 512
	scale: 1.5


card1Content = new Layer
	parent: card2
	width: card2.width
	height: card2.height
	image: "images/card2.png"

# # Init
# 
# button = new Layer
# 	parent: screen
# 	width: 100
# 	height: 120
# 	opacity: 0
# 
# button.onTap ->
# # 	print video1.player.volume
# 	
# 	video1.video = "images/v1.mov"
# 	video1.player.muted = true
# 	video1.player.loop = true
# 	
# 	video2.video = "images/v2.mp4"
# 	video2.player.muted = true
# 	video2.player.loop = true
# 	
# # 	print "ok"
# # 	print video1.player.volume
# 
# 
# video1.player.play()

video1.video = "images/t1.mov"
video1.player.muted = true
video1.player.loop = true

video2.video = "images/t2.mov"
video2.player.muted = true
video2.player.loop = true

video1.player.play()


