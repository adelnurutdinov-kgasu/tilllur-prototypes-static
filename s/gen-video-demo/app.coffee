

Canvas.backgroundColor = "222"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

{ Preview } = require "PreviewComponent"

screen = new Layer
	name: "screen"
	width: 375
	height: 812
	backgroundColor: "FFF"


preview = new Preview { view: screen }
preview.children[1].backgroundColor = "FFF"


screenView = new Layer
	name: "screenView"
	parent: screen
	width: 375.0
	height: 812.0
	image: "images/screen.png"



videoURLArray = [
	{ 
		video: "images/video/dog.mp4",
		prompt: "images/prompt01.png",
	},
	{ 
		video: "images/video/person.mp4",
		prompt: "images/prompt02.png",
	},
	{ 
		video: "images/video/lake.mp4",
		prompt: "images/prompt03.png",
	},
	
	{ 
		video: "images/video/fireworks.mp4",
		prompt: "images/prompt04.png",
	},
	
	{ 
		video: "images/video/rabbit.mp4",
		prompt: "images/prompt05.png",
	},
	{ 
		video: "images/video/rock.mp4",
		prompt: "images/prompt06.png",
	},
	
	

	
	
	
	
	
]

videoClip = new Layer
	parent: screenView
	width: 363
	height: 363
	x: Align.center
	y: Align.top(100)
	borderRadius: 12
	clip: true
	backgroundColor: null

videoView = new VideoLayer
	parent: videoClip
	width: 363
	height: 363
	video: videoURLArray[0].video
	backgroundColor: "white"
	# scale: 1.7

videoView.player.loop = true
videoView.player.play()



promptView = new Layer
	parent: screenView
	width: 375
	height: 240
	x: Align.center
	y: Align.top(463)
	image: videoURLArray[0].prompt









changeVideo = (dataItem) ->
	videoView.video = dataItem.video
	promptView.image = dataItem.prompt
	videoView.player.play()


showVideoR1 = () -> changeVideo(videoURLArray[0])
showVideoR2 = () -> changeVideo(videoURLArray[1])

showVideoN1 = () -> changeVideo(videoURLArray[2])
showVideoN2 = () -> changeVideo(videoURLArray[3])

showVideoM1 = () -> changeVideo(videoURLArray[4])
showVideoM2 = () -> changeVideo(videoURLArray[5])

preview.addSection("Runaway:", [
  { title: "Dog", handler: showVideoR1 },
  { title: "Person", handler: showVideoR2 },
]);

preview.addSection("NVidia:", [
  { title: "Lake", handler: showVideoN1 },
  { title: "Fireworks", handler: showVideoN2 },
]);

preview.addSection("More:", [
  { title: "Rabbit", handler: showVideoM1 },
  { title: "Rock", handler: showVideoM2 },
]);