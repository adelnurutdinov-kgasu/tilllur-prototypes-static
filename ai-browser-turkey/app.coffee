{ Preview } = require "PreviewComponent"
{ FlowView, NavigationView, ModalView } = require "NavigationComponent"
{ Button } = require "Buttons"

# Устанавливаем глобальную анимационную кривую
# Framer.Defaults.Animation =
    # curve: Spring(damping: 1, velocity: 3)

screen = new Layer { width: 393, height: 852 }
preview = new Preview { view: screen }

flow = new FlowView { parent: screen }

# Главный экран
homeView = new NavigationView
	parent: flow
	backgroundColor: "#E3F2FD" # Светло-голубой
	showBack: false
	preventBackSwipe: true
	height: 852
	buttons:
		suggest:
			x: Align.center, y: Align.bottom(-20), width: 393, height: 124, backgroundColor: "#f0f0f0"
			handler: () -> flow.open(suggestModalView)
		# ecom:
			# x: Align.center, y: Align.top(300), width: 200, height: 64, backgroundColor: "#f0f0f0"
			# handler: () -> flow.open(ecomView)

# Добавляем слои для Home View
blur = new Layer
	width: 393.0
	height: 852.0
	image: "images/Blur.jpg"
	parent: homeView

home20Content = new Layer
	width: 393.0
	height: 852.0
	image: "images/Home Content.png"
	parent: homeView

# Добавляем дополнительные слои для Home View
home20view20sites = new ScrollComponent
	width: 393.0
	height: 100.0
	y: 356
	scrollVertical: false
	scrollHorizontal: true
	parent: homeView

sitesContent = new Layer
	width: 786.0
	height: 100.0
	image: "images/home view sites.png"
	parent: home20view20sites.content

# Добавляем кнопку ecom внутрь home20view20sites
ecomButton = new Button
	parent: home20view20sites.content
	x: Align.left(98)
	y: Align.center
	width: 82
	height: 100
	backgroundColor: null
	handler: () -> flow.open(ecomView)

# Добавляем кнопку video внутрь home20view20sites
videoButton = new Button
	parent: home20view20sites.content
	x: 345
	y: Align.center
	width: 82
	height: 100
	backgroundColor: null
	handler: () -> flow.open(siteVideoView)

# Добавляем кнопку article внутрь home20view20sites
articleButton = new Button
	parent: home20view20sites.content
	x: 426
	y: Align.center
	width: 82
	height: 100
	backgroundColor: null
	handler: () -> flow.open(siteArticleView)

# Добавляем кнопку news внутрь home20view20sites
newsButton = new Button
	parent: home20view20sites.content
	x: 181
	y: Align.center
	width: 82
	height: 100
	backgroundColor: null
	handler: () -> flow.open(siteNewsView)

# Добавляем кнопку twitter внутрь home20view20sites
twitterButton = new Button
	parent: home20view20sites.content
	x: 267
	y: Align.center
	width: 82
	height: 100
	backgroundColor: null
	handler: () -> flow.open(twitterView)

home20view20widgets = new ScrollComponent
	width: 393.0
	height: 202.0
	y: 124
	scrollVertical: false
	scrollHorizontal: true
	parent: homeView

widgetsContent = new Layer
	width: 768.5
	height: 202.0
	image: "images/home view widgets.png"
	parent: home20view20widgets.content

# Добавляем видео слой внутрь виджетов
weatherVideoMask = new Layer
	parent: home20view20widgets.content
	x: 16, y: 12
	width: 133
	height: 178
	borderRadius: 24
	clip: true
	backgroundColor: "white"

weatherVideoLayer = new VideoLayer
	parent: weatherVideoMask
	width: 133
	height: 178
	scale: 1.01
	backgroundColor: null
	video: "images/weather.mp4"
	autoplay: true
	loop: true
	muted: true
	blendMode: "multiply"

weatherVideoLayer.player.loop = true
weatherVideoLayer.player.play()

# Добавляем кнопку haber7 внутрь виджетов
haber7Button = new Button
	parent: home20view20widgets.content
	x: 157
	y: 12
	width: 216
	height: 178
	backgroundColor: null
	handler: () -> flow.open(siteNewsView)

# Добавляем панель с действиями на Home View
homeActionsPanel = new ScrollComponent
	width: 393.0
	height: 54.0
	y: Align.bottom(-124-20-8)
	scrollVertical: false
	scrollHorizontal: true
	parent: homeView
	contentInset: left: 20, right: 20

# Определяем параметры кнопок-изображений
homeButtonsData = [
	{ image: "images/action-button/site action button homeview create image.png", width: 154.0, height: 44.0 }
	# { image: "images/action-button/site action button homeview create text.png", width: 141.0, height: 44.0 }
	{ image: "images/action-button/site action button homeview generate text.png", width: 160.0, height: 44.0, }
	{ image: "images/action-button/site action button homeview summarize.png", width: 139.0, height: 44.0 }
	{ image: "images/action-button/site action button homeview create presentation.png", width: 201.0, height: 44.0 }
	{ image: "images/action-button/site action button homeview translate.png", width: 125.0, height: 44.0 }
]

gap = 6
padding = 0
currentX = padding
totalButtonsWidth = 0

for btnData in homeButtonsData
	btn = new Layer
		parent: homeActionsPanel.content
		width: btnData.width
		height: btnData.height
		image: btnData.image
		x: currentX
		y: Align.top(8)

	currentX += btnData.width + gap
	totalButtonsWidth += btnData.width

# Устанавливаем общую ширину контента скролла
totalContentWidth = totalButtonsWidth + (homeButtonsData.length - 1) * gap + 2 * padding
homeActionsPanel.content.width = totalContentWidth
homeActionsPanel.content.height = 54

homeActionsPanel.bringToFront()

# Suggest модальный экран
suggestModalView = new ModalView
	parent: flow
	width: 393
	y: screen.height - 692 # Начальная высота
	height: 692
	borderRadius: 24
	backgroundColor: "#F3E5F5" # Светло-фиолетовый
	backgroundColor: null

# Добавляем слои для Suggest Modal
partSuggestBg = new Layer
	width: 393.0
	height: 692.0
	image: "images/Part Suggest Bg.png"
	parent: suggestModalView.content
	x: 0
	y: 0

partSuggestText = new Layer
	width: 393.0
	height: 692.0
	image: "images/Part Suggest Text.png"
	parent: suggestModalView.content
	x: 0
	y: 0

partSuggestOmnibox = new Layer
	width: 393.0
	height: 692.5
	image: "images/Part Suggest Omnibox.png"
	parent: suggestModalView.content
	x: 0
	y: 0

partSuggestOmniboxFilled = new Layer
	width: 393.0
	height: 692.5
	image: "images/Part Suggest Omnibox Filled.png"
	parent: suggestModalView.content
	x: 0
	y: 0
	opacity: 0

# Добавляем states для слоев
partSuggestBg.states =
	initial:
		y: 0
	filled:
		y: 210

partSuggestText.states =
	initial:
		y: 0
		opacity: 1
	filled:
		y: 210
		opacity: 0

partSuggestOmniboxFilled.states =
	initial:
		opacity: 0
	filled:
		opacity: 1

# Создаем контейнер для кнопки
suggestButtonContainer = new Layer
	parent: suggestModalView
	x: Align.center
	y: 292
	width: 361
	height: 116
	backgroundColor: null

# Добавляем states для контейнера
suggestButtonContainer.states =
	initial:
		opacity: 1
	filled:
		opacity: 0

# Создаем кнопку внутри контейнера
suggestButton = new Button
	parent: suggestButtonContainer
	width: 361
	height: 116
	backgroundColor: "transparent"
	text: "Suggest"
	textColor: "white"

# Добавляем состояние для отслеживания кликов
suggestButton.isActive = false

# Добавляем states для модального окна
suggestModalView.states =
	initial:
		y: screen.height - 692
	filled:
		y: screen.height - 692

# Устанавливаем начальное состояние
suggestButtonContainer.states.switch("initial")
suggestModalView.states.switch("initial")
partSuggestBg.states.switch("initial")
partSuggestText.states.switch("initial")
partSuggestOmniboxFilled.states.switch("initial")

# Обработчик нажатия на кнопку
suggestButton.onClick ->
	if not suggestButton.isActive
		# Первое нажатие - меняем состояние на заполненное
		suggestButtonContainer.states.switch("filled")
		suggestModalView.states.switch("filled")
		partSuggestBg.states.switch("filled")
		partSuggestText.states.switch("filled")
		partSuggestOmniboxFilled.states.switch("filled")
		suggestButton.isActive = true
	else
		# Второе нажатие - закрываем модальное окно с анимацией и переходим к результатам
		flow.showPrevious()
		Utils.delay 0.3, ->
			flow.open(searchResultsView)

# Сбрасываем состояние при открытии и закрытии модального окна
suggestModalView.wrapper.on "change:visible", (visible) ->
	suggestButtonContainer.states.switch("initial")
	suggestModalView.states.switch("initial")
	partSuggestBg.states.switch("initial")
	partSuggestText.states.switch("initial")
	partSuggestOmniboxFilled.states.switch("initial")
	suggestButton.isActive = false

searchResultsView = new NavigationView
	parent: flow
	backgroundColor: "#F9F9F9"
	showBack: false
	contentInset: bottom: 86
	buttons:
		back:
			width: 64, height: 64, x: Align.left(8), y: Align.top(50), backgroundColor: null
			handler: () -> flow.showPrevious()
		siteArticle:
			x: Align.center, y: 980, width: 393, height: 244, backgroundColor: null
			handler: () -> flow.open(siteArticleView)
		siteVideo:
			x: Align.center, y: 1244, width: 393, height: 224, backgroundColor: null
			handler: () -> flow.open(siteVideoView)

# Добавляем контент результатов поиска
searchResultsContent = new Layer
	width: 393.0
	height: 1799.0
	image: "images/Search Results Content.png"
	parent: searchResultsView.content
	x: 0
	y: -1

# Добавляем нижнюю панель
bottomViewSearchResults = new Layer
	width: 393
	height: 86
	image: "images/Bottom View for Search Results.png"
	parent: searchResultsView
	y: Align.bottom

# Добавляем кнопку возврата на главный экран
homeButtonSearchResults = new Button
	parent: bottomViewSearchResults
	width: 48
	height: 48
	x: Align.left(12)
	y: Align.bottom(-28)
	backgroundColor: null
	handler: () -> 
		flow.showPrevious()

# Добавляем текст с градиентом
searchResultsGradientText = new Layer
	parent: bottomViewSearchResults
	width: 300
	height: 24
	x: Align.center
	y: Align.bottom(-42)
	backgroundColor: "transparent"
	html: "Ask Yazeka anything"
	style: 
		fontSize: "16px"
		textAlign: "center"
		background: "linear-gradient(90deg, rgba(248, 96, 74, 0.9) 19.79%, rgba(0, 0, 0, 0.3) 82.77%)"
		WebkitBackgroundClip: "text"
		WebkitTextFillColor: "transparent"
		backgroundClip: "text"
		textFillColor: "transparent"

# Создаем изображения сайтов
siteArticle = new Layer
	width: 393.0
	height: 2137.0
	image: "images/Site Article.jpg"

twitterContent = new Layer
	width: 393.5
	height: 2813.5
	image: "images/Twitter Content.png"

siteNews = new Layer
	width: 393.0
	height: 2738.0
	image: "images/Site News.jpg"

siteEcomItem = new Layer
	width: 393.0
	height: 1601.0
	image: "images/Site Ecom Item.jpg"

siteEcom = new Layer
	width: 393.0
	height: 1117.0
	image: "images/Site Ecom.jpg"

siteVideo = new Layer
	width: 393.0
	height: 1217.0
	image: "images/Site Video.jpg"

# Создаем скрытый шаблон обычной нижней панели браузера
bottomView = new Layer
	width: 393
	height: 86
	image: "images/Bottom View.png"
	opacity: 0
	y: -1000
	backgroundColor: "transparent"
	visible: false

# Создаем скрытый шаблон новой панели действий
bottomViewActions = new Layer
	width: 393
	height: 139
	image: "images/Bottom View Actions.png"
	opacity: 0
	y: -1000
	backgroundColor: "transparent"
	visible: false

siteArticleView = new NavigationView
	parent: flow
	backgroundColor: "#FFF3E0" # Светло-оранжевый
	showBack: false
	height: 852
	contentInset: bottom: 139
	buttons:
		back:
			width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious()

# Добавляем изображение статьи в скролл
siteArticle.parent = siteArticleView.content
siteArticle.x = 0
siteArticle.y = 40 # Отступ от верхней панели

# Добавляем нижнюю панель
bottomViewArticle = new Layer
	width: 393
	height: 139
	image: "images/Bottom View Actions.png"
	parent: siteArticleView
	y: Align.bottom

# Добавляем кнопку возврата на главный экран
homeButtonArticle = new Button
	parent: bottomViewArticle
	width: 48
	height: 48
	x: Align.left(12)
	y: Align.bottom(-28)
	backgroundColor: null
	handler: () -> 
		flow.showPrevious()
		flow.showPrevious()

# Добавляем тайл с URL для статьи
siteArticleUrl = new Layer
	parent: bottomViewArticle
	width: 200
	height: 24
	x: Align.center
	y: Align.bottom(-42)
	backgroundColor: "transparent"
	html: "tamindir.com"
	style: 
		fontSize: "16px"
		textAlign: "center"
		color: "#666666"

# Настраиваем скролл для скрытия/показа нижней панели
siteArticleView.content.onDragStart ->
	if siteArticleView.content.draggable.direction is "up"
		bottomViewArticle.animate
			y: siteArticleView.height
			options:
				time: 0.1
				curve: Spring(damping: 1)
	else
		bottomViewArticle.animate
			y: Align.bottom
			options:
				time: 0.1
				curve: Spring(damping: 1)

siteArticleModalView = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white" # Светло-красный

# Добавляем контент в модальное окно статьи
article20Modal20Content = new Layer
	width: 393.0
	height: 724.0
	image: "images/Article Modal Content.png"
	parent: siteArticleModalView.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна
omniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: siteArticleModalView
	y: Align.bottom
	backgroundColor: "transparent"

siteVideoView = new NavigationView
	parent: flow
	backgroundColor: "white" # Светло-бирюзовый
	showBack: false
	height: 852
	contentInset: bottom: 139
	buttons:
		back:
			width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious()

# Добавляем изображение видео в скролл
siteVideo.parent = siteVideoView.content
siteVideo.x = 0
siteVideo.y = 40 # Отступ от верхней панели

# Создаем контейнер для видео с маской
youtubeVideoMask = new Layer
	parent: siteVideoView.content
	x: 0
	y: 85
	width: 393
	height: 221
	backgroundColor: "white"
	clip: true

# Добавляем видео
youtubeVideoLayer = new VideoLayer
	parent: youtubeVideoMask
	width: 393
	height: 221
	video: "images/youtube.mp4"
	autoplay: true
	loop: true
	muted: true
	scale: 1.2 # Увеличиваем масштаб для fill

youtubeVideoLayer.player.loop = true
youtubeVideoLayer.player.play()

# Добавляем нижнюю панель
bottomViewVideo = new Layer
	width: 393
	height: 139
	image: "images/Bottom View Actions.png"
	parent: siteVideoView
	y: Align.bottom

# Добавляем кнопку возврата на главный экран
homeButtonVideo = new Button
	parent: bottomViewVideo
	width: 48
	height: 48
	x: Align.left(12)
	y: Align.bottom(-28)
	backgroundColor: null
	handler: () -> 
		flow.showPrevious()
		flow.showPrevious()

# Добавляем тайл с URL для видео
siteVideoUrl = new Layer
	parent: bottomViewVideo
	width: 200
	height: 24
	x: Align.center
	y: Align.bottom(-42)
	backgroundColor: "transparent"
	html: "youtube.com"
	style: 
		fontSize: "16px"
		textAlign: "center"
		color: "#666666"

# --- Video Modal с тремя состояниями ---
siteVideoModalView = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white" # Светло-лаймовый

# Добавляем контент в модальное окно видео
videoModalContent = new Layer
	width: 393.0
	height: 724.0
	image: "images/video Modal Content.png"
	parent: siteVideoModalView.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна видео
videoOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: siteVideoModalView
	y: Align.bottom
	backgroundColor: "transparent"

# Ecom ветка
ecomView = new NavigationView
	parent: flow
	backgroundColor: "white" # Светло-индиго
	showBack: false
	height: 852
	contentInset: bottom: 86
	buttons:
		back:
			width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious()
		item:
			x: Align.center, y: 100, width: 393, height: 80, backgroundColor: null
			handler: () -> flow.open(ecomItemView)

# Добавляем изображение ecom в скролл
siteEcom.parent = ecomView.content
siteEcom.x = 0
siteEcom.y = 40 # Отступ от верхней панели

# Добавляем нижнюю панель
bottomViewEcom = new Layer
	width: 393
	height: 86
	image: "images/Bottom View.png"
	parent: ecomView
	y: Align.bottom

# Добавляем кнопку возврата на главный экран
homeButtonEcom = new Button
	parent: bottomViewEcom
	width: 48
	height: 48
	x: Align.left(12)
	y: Align.bottom(-28)
	backgroundColor: null
	handler: () -> 
		flow.showPrevious()

# Добавляем тайл с URL для ecom
ecomUrl = new Layer
	parent: bottomViewEcom
	width: 200
	height: 24
	x: Align.center
	y: Align.bottom(-42)
	backgroundColor: "transparent"
	html: "hepsiburada.com"
	style: 
		fontSize: "16px"
		textAlign: "center"
		color: "#666666"

ecomItemView = new NavigationView
	parent: flow
	backgroundColor: "white" # Светло-фиолетовый
	showBack: false
	height: 852
	contentInset: bottom: 139
	buttons:
		back:
			width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious()

# Добавляем изображение товара в скролл
siteEcomItem.parent = ecomItemView.content
siteEcomItem.x = 0
siteEcomItem.y = 40 # Отступ от верхней панели

# Добавляем нижнюю панель
bottomViewEcomItem = new Layer
	width: 393
	height: 139
	image: "images/Bottom View Actions.png"
	parent: ecomItemView
	y: Align.bottom

# Добавляем кнопку возврата на главный экран
homeButtonEcomItem = new Button
	parent: bottomViewEcomItem
	width: 48
	height: 48
	x: Align.left(12)
	y: Align.bottom(-28)
	backgroundColor: null
	handler: () -> 
		flow.showPrevious()
		flow.showPrevious()

# Добавляем тайл с URL для товара
ecomItemUrl = new Layer
	parent: bottomViewEcomItem
	width: 200
	height: 24
	x: Align.center
	y: Align.bottom(-42)
	backgroundColor: "transparent"
	html: "hepsiburada.com"
	style: 
		fontSize: "16px"
		textAlign: "center"
		color: "#666666"

ecomItemModalView = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "modal" # Светло-бирюзовый

# Добавляем контент в модальное окно товара
ecomItemModalContent = new Layer
	width: 393.0
	height: 724.0
	image: "images/Ecom Item Modal Content.png"
	parent: ecomItemModalView.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна товара
itemOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ecomItemModalView
	y: Align.bottom
	backgroundColor: "transparent"

# Создаем компонент панели действий для модальных окон
class ModalActionsPanel extends ScrollComponent
	constructor: (options = {}) ->
		{ parent, y, type } = options
		super
			parent: parent
			width: 393
			height: 54
			y: y or 0
			scrollHorizontal: true
			scrollVertical: false
			directionLock: true
			contentInset: left: 16, right: 16
			backgroundColor: "transparent"

		# Определяем параметры кнопок-изображений в зависимости от типа
		if type == "article"
			buttonsData = [
				{ image: "images/action-button/site action button explore topic.png", width: 128.0, height: 44.0 }
				{ image: "images/action-button/site action button tldr.png", width: 77.0, height: 44.0 }
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
			]
		else if type == "video"
			buttonsData = [
				{ image: "images/action-button/site action button video qa.png", width: 113.0, height: 44.0 }
				{ image: "images/action-button/site action button video translate vocalize.png", width: 179.0, height: 44.0 }
				{ image: "images/action-button/site action button video quick recap.png", width: 188.0, height: 44.0 }
				{ image: "images/action-button/site action button video recap 3 min.png", width: 136.0, height: 44.0 }
				{ image: "images/action-button/site action button video key moments.png", width: 131.0, height: 44.0 }
			]
		else if type == "news"
			buttonsData = [
				{ image: "images/action-button/site action button explore topic.png", width: 128.0, height: 44.0 }
				{ image: "images/action-button/site action button news brief.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news buzz meter.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news media tone.png", width: 115.0, height: 44.0 }
				{ image: "images/action-button/site action button news trends.png", width: 145.0, height: 44.0 }
			]
		else if type == "articleModal"
			buttonsData = [
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
			]
		else if type == "videoModal"
			buttonsData = [
				{ image: "images/action-button/site action button video translate vocalize.png", width: 179.0, height: 44.0 }
				{ image: "images/action-button/site action button video quick recap.png", width: 188.0, height: 44.0 }
				{ image: "images/action-button/site action button video recap 3 min.png", width: 136.0, height: 44.0 }
				{ image: "images/action-button/site action button video key moments.png", width: 131.0, height: 44.0 }
			]
		else if type == "newsBriefModal"
			buttonsData = [
				{ image: "images/action-button/site action button news media tone.png", width: 115.0, height: 44.0 }
				{ image: "images/action-button/site action button news buzz meter.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news trends.png", width: 145.0, height: 44.0 }
			]
		else if type == "newsExploreTopicModal"
			buttonsData = [
				{ image: "images/action-button/site action button news brief.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news media tone.png", width: 115.0, height: 44.0 }
				{ image: "images/action-button/site action button news buzz meter.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news trends.png", width: 145.0, height: 44.0 }
			]
		else if type == "twitter"
			buttonsData = [
				{ image: "images/action-button/site action button explore topic.png", width: 128.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter advocate.png", width: 150.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter facts.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter smart reply.png", width: 122.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter tread.png", width: 131.0, height: 44.0 }
			]
		else if type == "twitterExploreTopicModal"
			buttonsData = [
				{ image: "images/action-button/site action button twitter smart reply.png", width: 122.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter tread.png", width: 131.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter advocate.png", width: 150.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter facts.png", width: 112.0, height: 44.0 }
			]
		else if type == "twitterSuggestTweetModal"
			buttonsData = [
				{ image: "images/action-button/site action button twitter tread.png", width: 131.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter advocate.png", width: 150.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter facts.png", width: 112.0, height: 44.0 }
			]
		else if type == "exploreTopic"
			buttonsData = [
				{ image: "images/action-button/site action button tldr.png", width: 77.0, height: 44.0 }
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
			]
		else if type == "ecomItemExploreTopicModal"
			buttonsData = [
				{ image: "images/action-button/site action button best price.png", width: 187.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
			]
		else
			buttonsData = [
				{ image: "images/action-button/site action button explore topic.png", width: 128.0, height: 44.0 }
				{ image: "images/action-button/site action button best price.png", width: 187.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
			]

		gap = 6
		padding = 0
		currentX = padding
		totalButtonsWidth = 0

		for btnData, index in buttonsData
			btn = new Layer
				parent: @content
				width: btnData.width
				height: btnData.height
				image: btnData.image
				x: currentX
				y: Align.top(8)

			# Добавляем обработчик для кнопки TLDR в Explore Topic
			if type == "exploreTopic" and index == 0
				btn.onClick ->
					flow.showPrevious()
					flow.open(siteArticleModalView)
			# Добавляем обработчик для кнопки Explore Topic в Twitter Explore Topic Modal
			else if type == "twitterExploreTopicModal" and index == 0
				btn.onClick ->
					flow.showPrevious()
					flow.open(twitterSmartReplyModalView)
			# Добавляем обработчик для кнопки Explore Topic в News Explore Topic Modal
			else if type == "newsExploreTopicModal" and index == 0
				btn.onClick ->
					flow.showPrevious()
					flow.open(newsBriefModalView)

			currentX += btnData.width + gap
			totalButtonsWidth += btnData.width

		# Устанавливаем общую ширину контента скролла
		totalContentWidth = totalButtonsWidth + (buttonsData.length - 1) * gap + 2 * padding
		@content.width = totalContentWidth
		@content.height = 54

		# Логика: если scrollX > 0, свайп вправо не вызывает back
		@.on Events.SwipeRightStart, (event, layer) ->
			if @scrollX > 0 then event.stopPropagation()

# Добавляем панель действий в модальное окно статьи
articleModalActions = new ModalActionsPanel
	parent: omniboxModalContinueChat
	y: 0
	type: "articleModal"

# Создаём невидимый контейнер для шаблонной панели Explore Topic
exploreTopicModalActionsHiddenContainer = new Layer
	parent: screen
	width: 393
	height: 54
	y: -1000
	visible: false
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно Explore Topic (шаблон, скрыт)
exploreTopicModalActions = new ModalActionsPanel
	parent: exploreTopicModalActionsHiddenContainer
	y: 0
	type: "exploreTopic"

# Добавляем панель действий в модальное окно видео
videoModalActions = new ModalActionsPanel
	parent: videoOmniboxModalContinueChat
	y: 0
	type: "videoModal"

# Добавляем панель действий в модальное окно товара
itemModalActions = new ModalActionsPanel
	parent: itemOmniboxModalContinueChat
	y: 0

# --- ActionPanel компонент с горизонтальным скроллом и кнопками-изображениями ---
class ActionPanel extends ScrollComponent
	constructor: (options = {}) ->
		{ parent, y, type } = options
		super
			parent: parent
			width: 393
			height: 54
			y: y or 0
			scrollHorizontal: true
			scrollVertical: false
			directionLock: true
			contentInset: left: 16, right: 16
			backgroundColor: "transparent"

		# Определяем параметры кнопок-изображений в зависимости от типа
		if type == "article"
			buttonsData = [
				{ image: "images/action-button/site action button explore topic.png", width: 128.0, height: 44.0 }
				{ image: "images/action-button/site action button tldr.png", width: 77.0, height: 44.0 }
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
			]
		else if type == "video"
			buttonsData = [
				{ image: "images/action-button/site action button video qa.png", width: 113.0, height: 44.0 }
				{ image: "images/action-button/site action button video translate vocalize.png", width: 179.0, height: 44.0 }
				{ image: "images/action-button/site action button video quick recap.png", width: 188.0, height: 44.0 }
				{ image: "images/action-button/site action button video recap 3 min.png", width: 136.0, height: 44.0 }
				{ image: "images/action-button/site action button video key moments.png", width: 131.0, height: 44.0 }
			]
		else if type == "news"
			buttonsData = [
				{ image: "images/action-button/site action button explore topic.png", width: 128.0, height: 44.0 }
				{ image: "images/action-button/site action button news brief.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news buzz meter.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news media tone.png", width: 115.0, height: 44.0 }
				{ image: "images/action-button/site action button news trends.png", width: 145.0, height: 44.0 }
			]
		else if type == "twitter"
			buttonsData = [
				{ image: "images/action-button/site action button explore topic.png", width: 128.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter smart reply.png", width: 122.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter tread.png", width: 131.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter advocate.png", width: 150.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter facts.png", width: 112.0, height: 44.0 }
			]
		else
			buttonsData = [
				{ image: "images/action-button/site action button explore topic.png", width: 128.0, height: 44.0 }
				{ image: "images/action-button/site action button best price.png", width: 187.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
			]

		gap = 6
		padding = 0
		currentX = padding
		totalButtonsWidth = 0

		for btnData, index in buttonsData
			btn = new Layer
				parent: @content
				width: btnData.width
				height: btnData.height
				image: btnData.image
				x: currentX
				y: Align.top(8)

			# Добавляем обработчик для кнопки Explore Topic в Article View
			if type == "article" and index == 0
				btn.onClick -> flow.open(articleExploreTopicModalView)
			# Добавляем обработчик для кнопки TLDR в Article View
			else if type == "article" and index == 1
				btn.onClick -> flow.open(siteArticleModalView)
			# Добавляем обработчик для кнопки VideoQA в Video View
			else if type == "video" and index == 0
				btn.onClick -> flow.open(siteVideoModalView)
			# Добавляем обработчик для кнопки Best Price в EcomItem View
			else if type == "item" and index == 1
				btn.onClick -> flow.open(ecomItemModalView)
			# Добавляем обработчики для кнопок Twitter
			if type == "twitter"
				if index == 0 # Explore Topic
					btn.onClick -> flow.open(twitterExploreTopicModalView)
				else if index == 1 # Smart Reply
					btn.onClick -> flow.open(twitterSmartReplyModalView)

			currentX += btnData.width + gap
			totalButtonsWidth += btnData.width

		# Устанавливаем общую ширину контента скролла
		totalContentWidth = totalButtonsWidth + (buttonsData.length - 1) * gap + 2 * padding
		@content.width = totalContentWidth
		@content.height = 54

		# Логика: если scrollX > 0, свайп вправо не вызывает back
		@.on Events.SwipeRightStart, (event, layer) ->
			if @scrollX > 0 then event.stopPropagation()

# --- Добавляем ActionPanel внутрь больших панелей ---
# Для статьи
articleActions = new ActionPanel
	parent: bottomViewArticle
	type: "article"

# Для видео
videoActions = new ActionPanel
	parent: bottomViewVideo
	type: "video"

# Для товара
itemActions = new ActionPanel
	parent: bottomViewEcomItem
	type: "item"

# Добавляем обработчики для кнопок в Ecom Item View
for btn, index in itemActions.content.children
	if index == 0 # Explore Topic
		btn.onClick -> flow.open(ecomItemExploreTopicModalView)
	else if index == 1 # Best Price
		btn.onClick -> flow.open(ecomItemModalView)

# Добавляем обработчик скролла для видео
siteVideoView.content.onDragStart ->
	if siteVideoView.content.draggable.direction is "up"
		bottomViewVideo.animate
			y: siteVideoView.height
			options:
				time: 0.1
				curve: Spring(damping: 1)
	else
		bottomViewVideo.animate
			y: Align.bottom
			options:
				time: 0.1
				curve: Spring(damping: 1)

# Добавляем обработчик скролла для ecom
ecomView.content.onDragStart ->
	if ecomView.content.draggable.direction is "up"
		bottomViewEcom.animate
			y: ecomView.height
			options:
				time: 0.1
				curve: Spring(damping: 1)
	else
		bottomViewEcom.animate
			y: Align.bottom
			options:
				time: 0.1
				curve: Spring(damping: 1)

# Добавляем обработчик скролла для ecom item
ecomItemView.content.onDragStart ->
	if ecomItemView.content.draggable.direction is "up"
		bottomViewEcomItem.animate
			y: ecomItemView.height
			options:
				time: 0.1
				curve: Spring(damping: 1)
	else
		bottomViewEcomItem.animate
			y: Align.bottom
			options:
				time: 0.1
				curve: Spring(damping: 1)

# Создаем новое модальное окно для Explore Topic
articleExploreTopicModalView = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно Explore Topic
article20Modal20Content20Explore20Topic = new Layer
	width: 393.0
	height: 724.0
	image: "images/Article Modal Content Explore Topic.png"
	parent: articleExploreTopicModalView.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна Explore Topic
exploreTopicOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: articleExploreTopicModalView
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно Explore Topic
exploreTopicModalActions = new ModalActionsPanel
	parent: exploreTopicOmniboxModalContinueChat
	y: 0
	type: "exploreTopic"

# Добавляем панель действий в модальное окно видео
videoModalActions = new ModalActionsPanel
	parent: videoOmniboxModalContinueChat
	y: 0
	type: "videoModal"

# Добавляем панель действий в модальное окно товара
itemModalActions = new ModalActionsPanel
	parent: itemOmniboxModalContinueChat
	y: 0

# News ветка
siteNewsView = new NavigationView
	parent: flow
	backgroundColor: "white"
	showBack: false
	height: 852
	contentInset: bottom: 139
	buttons:
		back:
			width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious()

# Добавляем изображение новостей в скролл
siteNews.parent = siteNewsView.content
siteNews.x = 0
siteNews.y = 40 # Отступ от верхней панели

# Добавляем нижнюю панель
bottomViewNews = new Layer
	width: 393
	height: 139
	image: "images/Bottom View Actions.png"
	parent: siteNewsView
	y: Align.bottom

# Добавляем кнопку возврата на главный экран
homeButtonNews = new Button
	parent: bottomViewNews
	width: 48
	height: 48
	x: Align.left(12)
	y: Align.bottom(-28)
	backgroundColor: null
	handler: () -> 
		flow.showPrevious()

# Добавляем тайл с URL для новостей
newsUrl = new Layer
	parent: bottomViewNews
	width: 200
	height: 24
	x: Align.center
	y: Align.bottom(-42)
	backgroundColor: "transparent"
	html: "haber7.com"
	style: 
		fontSize: "16px"
		textAlign: "center"
		color: "#666666"

# Добавляем панель действий для новостей
newsActions = new ActionPanel
	parent: bottomViewNews
	type: "news" # Меняем тип на "news"

# Добавляем обработчики для кнопок в News View
for btn, index in newsActions.content.children
	if index == 0 # Explore Topic
		btn.onClick -> flow.open(newsExploreTopicModalView)
	else if index == 1 # News Brief
		btn.onClick -> flow.open(newsBriefModalView)

# Добавляем обработчик скролла для новостей
siteNewsView.content.onDragStart ->
	if siteNewsView.content.draggable.direction is "up"
		bottomViewNews.animate
			y: siteNewsView.height
			options:
				time: 0.1
				curve: Spring(damping: 1)
	else
		bottomViewNews.animate
			y: Align.bottom
			options:
				time: 0.1
				curve: Spring(damping: 1)

# Создаем новое модальное окно для News Brief
newsBriefModalView = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно News Brief
newsModalContentBrief = new Layer
	width: 393.0
	height: 724.0
	image: "images/News Modal Content Brief.png"
	parent: newsBriefModalView.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна News Brief
newsBriefOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: newsBriefModalView
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно News Brief
newsBriefModalActions = new ModalActionsPanel
	parent: newsBriefOmniboxModalContinueChat
	y: 0
	type: "newsBriefModal"

# Создаем новое модальное окно для News Explore Topic
newsExploreTopicModalView = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно News Explore Topic
newsModalExploreTopic = new Layer
	width: 393.0
	height: 724.0
	image: "images/News Modal Explore Topic.png"
	parent: newsExploreTopicModalView.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна News Explore Topic
newsExploreTopicOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: newsExploreTopicModalView
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно News Explore Topic
newsExploreTopicModalActions = new ModalActionsPanel
	parent: newsExploreTopicOmniboxModalContinueChat
	y: 0
	type: "newsExploreTopicModal"

# Twitter ветка
twitterView = new NavigationView
	parent: flow
	backgroundColor: "white"
	showBack: false
	height: 852
	contentInset: bottom: 139
	buttons:
		back:
			width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious()

# Добавляем изображение Twitter в скролл
twitterContent.parent = twitterView.content
twitterContent.x = 0
twitterContent.y = 40 # Отступ от верхней панели

# Добавляем нижнюю панель
bottomViewTwitter = new Layer
	width: 393
	height: 139
	image: "images/Bottom View Actions.png"
	parent: twitterView
	y: Align.bottom

# Добавляем кнопку возврата на главный экран
homeButtonTwitter = new Button
	parent: bottomViewTwitter
	width: 48
	height: 48
	x: Align.left(12)
	y: Align.bottom(-28)
	backgroundColor: null
	handler: () -> 
		flow.showPrevious()

# Добавляем тайл с URL для Twitter
twitterUrl = new Layer
	parent: bottomViewTwitter
	width: 200
	height: 24
	x: Align.center
	y: Align.bottom(-42)
	backgroundColor: "transparent"
	html: "x.com"
	style: 
		fontSize: "16px"
		textAlign: "center"
		color: "#666666"

# Добавляем панель действий для Twitter
twitterActions = new ActionPanel
	parent: bottomViewTwitter
	type: "twitter"

# Добавляем обработчик скролла для Twitter
twitterView.content.onDragStart ->
	if twitterView.content.draggable.direction is "up"
		bottomViewTwitter.animate
			y: twitterView.height
			options:
				time: 0.1
				curve: Spring(damping: 1)
	else
		bottomViewTwitter.animate
			y: Align.bottom
			options:
				time: 0.1
				curve: Spring(damping: 1)

# Создаем модальное окно для Twitter Explore Topic
twitterExploreTopicModalView = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно Twitter Explore Topic
twitterModalExploreTopic = new Layer
	width: 393.0
	height: 724.0
	image: "images/Twitter Modal Explore Topic.png"
	parent: twitterExploreTopicModalView.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна Twitter Explore Topic
twitterExploreTopicOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: twitterExploreTopicModalView
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно Twitter Explore Topic
twitterExploreTopicModalActions = new ModalActionsPanel
	parent: twitterExploreTopicOmniboxModalContinueChat
	y: 0
	type: "twitterExploreTopicModal"

# Создаем модальное окно для Twitter Smart Reply
twitterSmartReplyModalView = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно Twitter Smart Reply
twitterModalSmartReply = new Layer
	width: 393.0
	height: 724.0
	image: "images/Twitter Modal Smart Reply.png"
	parent: twitterSmartReplyModalView.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна Twitter Smart Reply
twitterSmartReplyOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: twitterSmartReplyModalView
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно Twitter Smart Reply
twitterSmartReplyModalActions = new ModalActionsPanel
	parent: twitterSmartReplyOmniboxModalContinueChat
	y: 0
	type: "twitterSuggestTweetModal"

# Создаем модальное окно для Ecom Item Explore Topic
ecomItemExploreTopicModalView = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно Ecom Item Explore Topic
ecomItemModalExploreTopic = new Layer
	width: 393.0
	height: 724.0
	image: "images/Article Modal Content Explore Topic.png"
	parent: ecomItemExploreTopicModalView.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна Ecom Item Explore Topic
ecomItemExploreTopicOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ecomItemExploreTopicModalView
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно Ecom Item Explore Topic
ecomItemExploreTopicModalActions = new ModalActionsPanel
	parent: ecomItemExploreTopicOmniboxModalContinueChat
	y: 0
	type: "ecomItemExploreTopicModal"

# Добавляем обработчик для первой кнопки (Best Price) в модальном окне Explore Topic для Ecom Item
for btn, index in ecomItemExploreTopicModalActions.content.children
	if index == 0 # Best Price
		btn.onClick ->
			flow.showPrevious()
			flow.open(ecomItemModalView)

# flow.open(siteVideoView)