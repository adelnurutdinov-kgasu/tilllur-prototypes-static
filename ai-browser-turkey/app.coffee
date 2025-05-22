{ Preview } = require "PreviewComponent"
{ FlowView, NavigationView, ModalView } = require "NavigationComponent"
{ Button } = require "Buttons"

# Класс для централизованного управления кнопками действий
class ActionButtonManager
	@getButtonConfig: (type, index) ->
		configs = {
			article: [
				{ action: "tldr", modal: "ModalView_Article_Content" }
				{ action: "exploreTopic", modal: "ModalView_Article_ExploreTopic" }
				{ action: "productDeepDive", modal: null }
				{ action: "prosCons", modal: null }
				{ action: "factSmartPicks", modal: null }
			]
			video: [
				{ action: "translateVocalize", modal: null }
				{ action: "exploreTopic", modal: "ModalView_Video_Content" }
				{ action: "quickRecap", modal: null }
				{ action: "recap3Min", modal: null }
				{ action: "keyMoments", modal: null }
			]
			news: [
				{ action: "newsBrief", modal: "ModalView_News_Brief" }
				{ action: "exploreTopic", modal: "ModalView_News_ExploreTopic" }
				{ action: "buzzMeter", modal: null }
				{ action: "mediaTone", modal: null }
				{ action: "trends", modal: null }
			]
			twitter: [
				{ action: "smartReply", modal: "ModalView_Twitter_SmartReply" }
				{ action: "exploreTopic", modal: "ModalView_Twitter_ExploreTopic" }
				{ action: "thread", modal: null }
				{ action: "advocate", modal: null }
				{ action: "facts", modal: null }
			]
			item: [ # Для NavigationView_EcomItem -> ActionPanel
				{ action: "bestPrice", modal: "ModalView_EcomItem_Content" } # Открывается через кастомный обработчик itemActions
				{ action: "exploreTopic", modal: "ModalView_EcomItem_ExploreTopic" } # Открывается через кастомный обработчик itemActions
				{ action: "factSmartPicks", modal: null }
				{ action: "productDeepDive", modal: null }
				{ action: "prosCons", modal: null }
			]
			trip: [
				{ action: "plan", modal: "ModalView_Trip_Plan" }
				{ action: "exploreTopic", modal: "ModalView_Trip_ExploreTopic" }
				{ action: "thingsToDo", modal: null }
				{ action: "weather", modal: null }
				{ action: "weekendPlan", modal: null }
			]
		}
		# Для кнопок в itemActions, у которых есть кастомные обработчики, установим modal: null,
		# чтобы ActionButtonManager.createButton не назначал свой onClick.
		# Кастомные обработчики для itemActions уже есть ниже.
		if type == "item"
			if index == 0 or index == 1 # Best Price и Explore Topic для item
				return { action: configs[type][index].action, modal: null } # Переопределяем на null
		
		return configs[type]?[index] or null

	@getModalButtonConfig: (type, index) ->
		configs = {
			articleTLDR: [
				{ action: "productDeepDive", modal: null }
				{ action: "prosCons", modal: null }
				{ action: "factSmartPicks", modal: null }
			]
			exploreTopic: [
				# Первая кнопка (tldr) обрабатывается кастомно в конце файла
				{ action: "tldr", modal: null } # ИЗМЕНЕНО: было "ModalView_Article_Content"
				{ action: "productDeepDive", modal: null }
				{ action: "prosCons", modal: null }
				{ action: "factSmartPicks", modal: null }
			]
			videoModal: [
				{ action: "translateVocalize", modal: null }
				{ action: "quickRecap", modal: null }
				{ action: "recap3Min", modal: null }
				{ action: "keyMoments", modal: null }
			]
			newsBriefModal: [
				{ action: "mediaTone", modal: null }
				{ action: "buzzMeter", modal: null }
				{ action: "trends", modal: null }
			]
			newsExploreTopicModal: [
				# Первая кнопка (newsBrief) обрабатывается кастомно
				{ action: "newsBrief", modal: null } # ИЗМЕНЕНО: было "ModalView_News_Brief"
				{ action: "mediaTone", modal: null }
				{ action: "buzzMeter", modal: null }
				{ action: "trends", modal: null }
			]
			twitterExploreTopicModal: [
				# Первая кнопка (smartReply) обрабатывается кастомно
				{ action: "smartReply", modal: null } # ИЗМЕНЕНО: было "ModalView_Twitter_SmartReply"
				{ action: "thread", modal: null }
				{ action: "advocate", modal: null }
				{ action: "facts", modal: null }
			]
			twitterSuggestTweetModal: [
				{ action: "thread", modal: null }
				{ action: "advocate", modal: null }
				{ action: "facts", modal: null }
			]
			ecomItemExploreTopicModal: [
				# Первая кнопка (bestPrice) обрабатывается кастомно
				{ action: "bestPrice", modal: null } # ИЗМЕНЕНО: было "ModalView_EcomItem_Content"
				{ action: "factSmartPicks", modal: null }
				{ action: "productDeepDive", modal: null }
				{ action: "prosCons", modal: null }
			]
			ecomItemContentModal: [
				{ action: "factSmartPicks", modal: null }
				{ action: "productDeepDive", modal: null }
				{ action: "prosCons", modal: null }
			]
			tripExploreTopicModal: [
				# Первая кнопка (plan) обрабатывается кастомно
				{ action: "plan", modal: null } # ИЗМЕНЕНО: было "ModalView_Trip_Plan"
				{ action: "thingsToDo", modal: null }
				{ action: "weather", modal: null }
				{ action: "weekendPlan", modal: null }
			]
			tripPlanModal: [
				{ action: "thingsToDo", modal: null }
				{ action: "weather", modal: null }
				{ action: "weekendPlan", modal: null }
			]
		}
		console.log("getModalButtonConfig: type = #{type}, index = #{index}, config = #{JSON.stringify(configs[type]?[index])}")
		return configs[type]?[index] or null

	@createButton: (options = {}) -> # Для ActionPanel (не модальных)
		{ parent, x, y, width, height, image, type, index } = options
		
		btn = new Layer
			parent: parent
			width: width
			height: height
			image: image
			x: x
			y: y
			backgroundColor: "transparent"

		config = @getButtonConfig(type, index)
		# Если config.modal здесь null (из-за переопределения выше для itemActions),
		# то onClick не будет назначен здесь, и кастомный обработчик будет единственным.
		if config?.modal 
			btn.onClick -> flow.open(eval(config.modal))

		return btn

	@createModalButton: (options = {}) -> # Для ModalActionsPanel
		{ parent, x, y, width, height, image, type, index } = options
		# console.log("createModalButton: type = #{type}, index = #{index}")
		
		btn = new Layer
			parent: parent
			width: width
			height: height
			image: image
			x: x
			y: y
			backgroundColor: "transparent"

		config = @getModalButtonConfig(type, index)
		# Если config.modal здесь null (из-за изменений выше),
		# то onClick не будет назначен здесь, и кастомный обработчик в конце файла будет единственным.
		if config?.modal
			btn.onClick -> flow.open(eval(config.modal))
		
		return btn

# ... (остальной код до itemActions без изменений) ...

screen = new Layer { width: 393, height: 852 }
preview = new Preview { view: screen }

flow = new FlowView { parent: screen }

# Главный экран
NavigationView_Home = new NavigationView
	parent: flow
	backgroundColor: "#E3F2FD" # Светло-голубой
	showBack: false
	preventBackSwipe: true
	height: 852
	buttons:
		openSuggest:
			x: Align.center, y: Align.bottom(-20), width: 393, height: 124, backgroundColor: "#f0f0f0"
			handler: () -> flow.open(ModalView_Suggest)

# Добавляем слои для Home View
homeBackgroundBlurLayer = new Layer
	width: 393.0
	height: 852.0
	image: "images/Blur.jpg"
	parent: NavigationView_Home

homeContentLayer = new Layer
	width: 393.0
	height: 852.0
	image: "images/Home Content.png"
	parent: NavigationView_Home

# Добавляем дополнительные слои для Home View
homeSitesScroll = new ScrollComponent
	width: 393.0
	height: 100.0
	y: 356
	scrollVertical: false
	scrollHorizontal: true
	parent: NavigationView_Home

homeSitesContentLayer = new Layer
	width: 786.0
	height: 100.0
	image: "images/home view sites.png"
	parent: homeSitesScroll.content

# Добавляем кнопки внутрь homeSitesScroll
homeSitesEcomButton = new Button
	parent: homeSitesScroll.content
	x: Align.left(98)
	y: Align.center
	width: 82
	height: 100
	backgroundColor: null
	handler: () -> flow.open(NavigationView_Ecom)

homeSitesVideoButton = new Button
	parent: homeSitesScroll.content
	x: 345
	y: Align.center
	width: 82
	height: 100
	backgroundColor: null
	handler: () -> flow.open(NavigationView_Video)

homeSitesArticleButton = new Button
	parent: homeSitesScroll.content
	x: 426
	y: Align.center
	width: 82
	height: 100
	backgroundColor: null
	handler: () -> flow.open(NavigationView_Article)

homeSitesNewsButton = new Button
	parent: homeSitesScroll.content
	x: 181
	y: Align.center
	width: 82
	height: 100
	backgroundColor: null
	handler: () -> flow.open(NavigationView_News)

homeSitesTwitterButton = new Button
	parent: homeSitesScroll.content
	x: 267
	y: Align.center
	width: 82
	height: 100
	backgroundColor: null
	handler: () -> flow.open(NavigationView_Twitter)

homeSitesTripButton = new Button
	parent: homeSitesScroll.content
	x: 507
	y: Align.center
	width: 82
	height: 100
	backgroundColor: null
	handler: () -> flow.open(NavigationView_Trip)

homeWidgetsScroll = new ScrollComponent
	width: 393.0
	height: 202.0
	y: 124
	scrollVertical: false
	scrollHorizontal: true
	parent: NavigationView_Home

homeWidgetsContentLayer = new Layer
	width: 768.5
	height: 202.0
	image: "images/home view widgets.png"
	parent: homeWidgetsScroll.content

# Добавляем видео слой внутрь виджетов
weatherVideoMaskLayer = new Layer
	parent: homeWidgetsScroll.content
	x: 16, y: 12
	width: 133
	height: 178
	borderRadius: 24
	clip: true
	backgroundColor: "white"

weatherVideoPlayerLayer = new VideoLayer
	parent: weatherVideoMaskLayer
	width: 133
	height: 178
	scale: 1.01
	backgroundColor: null
	video: "images/weather.mp4"
	autoplay: true
	loop: true
	muted: true
	blendMode: "multiply"

weatherVideoPlayerLayer.player.loop = true
weatherVideoPlayerLayer.player.play()

# Добавляем кнопку sports
homeSportsButton = new Button
	parent: NavigationView_Home
	x: Align.left(140)
	y: Align.top(60)
	width: 100
	height: 56
	backgroundColor: null
	handler: () -> flow.open(NavigationView_Sports)

# Добавляем кнопку haber7 внутрь виджетов
homeWidgetsHaber7Button = new Button
	parent: homeWidgetsScroll.content
	x: 157
	y: 12
	width: 216
	height: 178
	backgroundColor: null
	handler: () -> flow.open(NavigationView_News)

# Добавляем панель с действиями на Home View
homeActionsPanel = new ScrollComponent
	width: 393.0
	height: 54.0
	y: Align.bottom(-124-20-8)
	scrollVertical: false
	scrollHorizontal: true
	parent: NavigationView_Home
	contentInset: left: 20, right: 20

# Определяем параметры кнопок-изображений
homeActionButtonsData = [
	{ image: "images/action-button/site action button homeview create image.png", width: 154.0, height: 44.0 }
	{ image: "images/action-button/site action button homeview generate text.png", width: 160.0, height: 44.0 }
	{ image: "images/action-button/site action button homeview summarize.png", width: 139.0, height: 44.0 }
	{ image: "images/action-button/site action button homeview create presentation.png", width: 199.0, height: 44.0 }
	{ image: "images/action-button/site action button homeview translate.png", width: 121.0, height: 44.0 }
]

gap = 6
padding = 0
currentX = padding
totalButtonsWidth = 0

for btnData, index in homeActionButtonsData
	btn = ActionButtonManager.createButton
		parent: homeActionsPanel.content
		width: btnData.width
		height: btnData.height
		image: btnData.image
		x: currentX
		y: Align.top(8)
		type: "home"
		index: index

	currentX += btnData.width + gap
	totalButtonsWidth += btnData.width

# Устанавливаем общую ширину контента скролла
totalContentWidth = totalButtonsWidth + (homeActionButtonsData.length - 1) * gap + 2 * padding
homeActionsPanel.content.width = totalContentWidth
homeActionsPanel.content.height = 54

homeActionsPanel.bringToFront()

# Suggest модальный экран
ModalView_Suggest = new ModalView
	parent: flow
	width: 393
	y: screen.height - 692 # Начальная высота
	height: 692
	borderRadius: 24
	backgroundColor: "#F3E5F5" # Светло-фиолетовый
	backgroundColor: null

# Добавляем слои для Suggest Modal
suggestModalBackgroundLayer = new Layer
	width: 393.0
	height: 692.0
	image: "images/Part Suggest Bg.png"
	parent: ModalView_Suggest.content
	x: 0
	y: 0

suggestModalTextLayer = new Layer
	width: 393.0
	height: 692.0
	image: "images/Part Suggest Text.png"
	parent: ModalView_Suggest.content
	x: 0
	y: 0

suggestModalOmniboxLayer = new Layer
	width: 393.0
	height: 692.5
	image: "images/Part Suggest Omnibox.png"
	parent: ModalView_Suggest.content
	x: 0
	y: 0

suggestModalOmniboxFilledLayer = new Layer
	width: 393.0
	height: 692.5
	image: "images/Part Suggest Omnibox Filled.png"
	parent: ModalView_Suggest.content
	x: 0
	y: 0
	opacity: 0

# Добавляем states для слоев
suggestModalBackgroundLayer.states =
	initial:
		y: 0
	filled:
		y: 210

suggestModalTextLayer.states =
	initial:
		y: 0
		opacity: 1
	filled:
		y: 210
		opacity: 0

suggestModalOmniboxFilledLayer.states =
	initial:
		opacity: 0
	filled:
		opacity: 1

# Создаем контейнер для кнопки
suggestButtonContainer = new Layer
	parent: ModalView_Suggest
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
suggestModalSubmitButton = new Layer
	parent: suggestButtonContainer
	width: 361
	height: 116
	x: 0
	y: 0
	backgroundColor: "transparent"

# Добавляем состояние для отслеживания кликов
suggestModalSubmitButton.isActive = false

# Добавляем states для модального окна
ModalView_Suggest.states =
	initial:
		y: screen.height - 692
	filled:
		y: screen.height - 692

# Устанавливаем начальное состояние
suggestButtonContainer.states.switch("initial")
ModalView_Suggest.states.switch("initial")
suggestModalBackgroundLayer.states.switch("initial")
suggestModalTextLayer.states.switch("initial")
suggestModalOmniboxFilledLayer.states.switch("initial")

# Обработчик нажатия на кнопку
suggestModalSubmitButton.onClick ->
	if not suggestModalSubmitButton.isActive
		# Первое нажатие - меняем состояние на заполненное
		suggestButtonContainer.states.switch("filled")
		ModalView_Suggest.states.switch("filled")
		suggestModalBackgroundLayer.states.switch("filled")
		suggestModalTextLayer.states.switch("filled")
		suggestModalOmniboxFilledLayer.states.switch("filled")
		suggestModalSubmitButton.isActive = true
	else
		# Второе нажатие - закрываем модальное окно с анимацией и переходим к результатам
		flow.showPrevious()
		Utils.delay 0.3, ->
			flow.open(NavigationView_SearchResults)

# Сбрасываем состояние при открытии и закрытии модального окна
ModalView_Suggest.wrapper.on "change:visible", (visible) ->
	suggestButtonContainer.states.switch("initial")
	ModalView_Suggest.states.switch("initial")
	suggestModalBackgroundLayer.states.switch("initial")
	suggestModalTextLayer.states.switch("initial")
	suggestModalOmniboxFilledLayer.states.switch("initial")
	suggestModalSubmitButton.isActive = false

NavigationView_SearchResults = new NavigationView
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
			handler: () -> flow.open(NavigationView_Article)
		siteVideo:
			x: Align.center, y: 1244, width: 393, height: 224, backgroundColor: null
			handler: () -> flow.open(NavigationView_Video)

# Добавляем контент результатов поиска
searchResultsContent = new Layer
	width: 393.0
	height: 1799.0
	image: "images/Search Results Content.png"
	parent: NavigationView_SearchResults.content
	x: 0
	y: -1

# Добавляем нижнюю панель
bottomViewSearchResults = new Layer
	width: 393
	height: 86
	image: "images/Bottom View for Search Results.png"
	parent: NavigationView_SearchResults
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

NavigationView_Article = new NavigationView
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
siteArticle.parent = NavigationView_Article.content
siteArticle.x = 0
siteArticle.y = 40 # Отступ от верхней панели

# Добавляем нижнюю панель
bottomViewArticle = new Layer
	width: 393
	height: 139
	image: "images/Bottom View Actions.png"
	parent: NavigationView_Article
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
	width: 393.0
	height: 85.0
	image: "images/site url title article.png"
	x: Align.center
	y: Align.bottom

# Настраиваем скролл для скрытия/показа нижней панели
NavigationView_Article.content.onDragStart ->
	if NavigationView_Article.content.draggable.direction is "up"
		bottomViewArticle.animate
			y: NavigationView_Article.height
			options:
				time: 0.1
				curve: Spring(damping: 1)
	else
		bottomViewArticle.animate
			y: Align.bottom
			options:
				time: 0.1
				curve: Spring(damping: 1)

ModalView_Article_Content = new ModalView
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
	parent: ModalView_Article_Content.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна
omniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ModalView_Article_Content
	y: Align.bottom
	backgroundColor: "transparent"

NavigationView_Video = new NavigationView
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
siteVideo.parent = NavigationView_Video.content
siteVideo.x = 0
siteVideo.y = 40 # Отступ от верхней панели

# Создаем контейнер для видео с маской
youtubeVideoMask = new Layer
	parent: NavigationView_Video.content
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
	parent: NavigationView_Video
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
	width: 393.0
	height: 85.0
	image: "images/site url title video.png"
	x: Align.center
	y: Align.bottom

# --- Video Modal с тремя состояниями ---
ModalView_Video_Content = new ModalView
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
	parent: ModalView_Video_Content.content
	x: 0
	y: 0

# Добавляем новый контентный слой для ответа
video20Modal20Content20Answer = new Layer
	width: 393.0
	height: 724.0
	image: "images/video Modal Content Answer.png"
	parent: ModalView_Video_Content.content
	x: 0
	y: 0
	opacity: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна видео
videoOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ModalView_Video_Content
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем обработчик нажатия на нижнюю панель
videoOmniboxModalContinueChat.onTap ->
	video20Modal20Content20Answer.animate
		opacity: 1
		options:
			time: 0.3
			curve: "ease-in-out"

# Сбрасываем состояние при открытии модального окна
ModalView_Video_Content.wrapper.on "change:visible", (visible) ->
	if visible
		video20Modal20Content20Answer.opacity = 0

# Ecom ветка
NavigationView_Ecom = new NavigationView
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
			handler: () -> flow.open(NavigationView_EcomItem)

# Добавляем фиксированную панель для Ecom
ecom20site20bottom20bar = new Layer
	parent: NavigationView_Ecom
	width: 393.0
	height: 54.0
	image: "images/ecom site bottom bar.png"
	y: Align.bottom(-85) # Размещаем над нижней панелью

# Добавляем изображение ecom в скролл
siteEcom.parent = NavigationView_Ecom.content
siteEcom.x = 0
siteEcom.y = 40 # Отступ от верхней панели

# Добавляем нижнюю панель
bottomViewEcom = new Layer
	width: 393
	height: 86
	image: "images/Bottom View.png"
	parent: NavigationView_Ecom
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
siteEcomUrl = new Layer
	parent: bottomViewEcom
	width: 393.0
	height: 85.0
	image: "images/site url title ecom.png"
	x: Align.center
	y: Align.bottom

NavigationView_EcomItem = new NavigationView
	parent: flow
	backgroundColor: "white" # Светло-фиолетовый
	showBack: false
	height: 852
	contentInset: bottom: 139
	buttons:
		back:
			width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious()

# Добавляем фиксированную панель для Ecom Item
ecom20item20site20bottom20bar = new Layer
	parent: NavigationView_EcomItem
	width: 393.0
	height: 69.0
	image: "images/ecom item site bottom bar.png"
	y: Align.bottom(-139) # Размещаем над нижней панелью

# Добавляем изображение товара в скролл
siteEcomItem.parent = NavigationView_EcomItem.content
siteEcomItem.x = 0
siteEcomItem.y = 40 # Отступ от верхней панели

# Добавляем нижнюю панель
bottomViewEcomItem = new Layer
	width: 393
	height: 139
	image: "images/Bottom View Actions.png"
	parent: NavigationView_EcomItem
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

ModalView_EcomItem_Content = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно товара
ecomItemModalContent = new Layer
	width: 393.0
	height: 724.0
	image: "images/Ecom Item Modal Content.png"
	parent: ModalView_EcomItem_Content.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна товара
itemOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ModalView_EcomItem_Content
	y: Align.bottom
	backgroundColor: "transparent"

# Создаем компонент панели действий для модальных окон
class ModalActionsPanel extends ScrollComponent
	constructor: (options = {}) ->
		{ parent, y, type } = options
		# console.log("ModalActionsPanel: type = #{type}")
		@options = options
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

		buttonsData = @getButtonsData(type)
		@createButtons(buttonsData)

		@.on Events.SwipeRightStart, (event, layer) ->
			if @scrollX > 0 then event.stopPropagation()

	getButtonsData: (type) ->
		# console.log("ModalActionsPanel.getButtonsData: type = #{type}")
		if type == "article"
			return [
				{ image: "images/action-button/site action button tldr.png", width: 77.0, height: 44.0 }
				{ image: "images/action-button/site action button explore topic.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
			]
		else if type == "video"
			return [
				{ image: "images/action-button/site action button video translate vocalize.png", width: 179.0, height: 44.0 }
				{ image: "images/action-button/site action button explore topic.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button video quick recap.png", width: 188.0, height: 44.0 }
				{ image: "images/action-button/site action button video recap 3 min.png", width: 136.0, height: 44.0 }
				{ image: "images/action-button/site action button video key moments.png", width: 131.0, height: 44.0 }
			]
		else if type == "news"
			return [
				{ image: "images/action-button/site action button news brief.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button explore topic.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news buzz meter.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news media tone.png", width: 115.0, height: 44.0 }
				{ image: "images/action-button/site action button news trends.png", width: 145.0, height: 44.0 }
			]
		else if type == "twitter"
			return [
				{ image: "images/action-button/site action button twitter smart reply.png", width: 122.0, height: 44.0 }
				{ image: "images/action-button/site action button explore topic.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter tread.png", width: 131.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter advocate.png", width: 150.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter facts.png", width: 112.0, height: 44.0 }
			]
		else if type == "articleModal"
			return [
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
			]
		else if type == "videoModal"
			return [
				{ image: "images/action-button/site action button video translate vocalize.png", width: 179.0, height: 44.0 }
				{ image: "images/action-button/site action button video quick recap.png", width: 188.0, height: 44.0 }
				{ image: "images/action-button/site action button video recap 3 min.png", width: 136.0, height: 44.0 }
				{ image: "images/action-button/site action button video key moments.png", width: 131.0, height: 44.0 }
			]
		else if type == "newsBriefModal"
			return [
				{ image: "images/action-button/site action button news media tone.png", width: 115.0, height: 44.0 }
				{ image: "images/action-button/site action button news buzz meter.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news trends.png", width: 145.0, height: 44.0 }
			]
		else if type == "newsExploreTopicModal"
			return [
				{ image: "images/action-button/site action button news brief.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news media tone.png", width: 115.0, height: 44.0 }
				{ image: "images/action-button/site action button news buzz meter.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news trends.png", width: 145.0, height: 44.0 }
			]
		else if type == "twitterExploreTopicModal"
			return [
				{ image: "images/action-button/site action button twitter smart reply.png", width: 122.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter tread.png", width: 131.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter advocate.png", width: 150.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter facts.png", width: 112.0, height: 44.0 }
			]
		else if type == "twitterSuggestTweetModal"
			return [
				{ image: "images/action-button/site action button twitter tread.png", width: 131.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter advocate.png", width: 150.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter facts.png", width: 112.0, height: 44.0 }
			]
		else if type == "ecomItemExploreTopicModal"
			return [
				{ image: "images/action-button/site action button best price.png", width: 187.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
			]
		else if type == "ecomItemContentModal"
			return [
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
			]
		else if type == "tripExploreTopicModal"
			return [
				{ image: "images/action-button/site action button trip plan.png", width: 108.0, height: 44.0 }
				{ image: "images/action-button/site action button trip things to do.png", width: 123.0, height: 44.0 }
				{ image: "images/action-button/site action button trip weather.png", width: 170.0, height: 44.0 }
				{ image: "images/action-button/site action button trip weekedn plan.png", width: 133.0, height: 44.0 }
			]
		else if type == "tripPlanModal"
			return [
				{ image: "images/action-button/site action button trip things to do.png", width: 123.0, height: 44.0 }
				{ image: "images/action-button/site action button trip weather.png", width: 170.0, height: 44.0 }
				{ image: "images/action-button/site action button trip weekedn plan.png", width: 133.0, height: 44.0 }
			]
		else if type == "exploreTopic"
			return [
				{ image: "images/action-button/site action button tldr.png", width: 77.0, height: 44.0 }
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
			]
		else if type == "articleTLDR"
			return [
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
			]
		else
			console.warn("Unknown button type: #{type}")
			return []

	createButtons: (buttonsData) ->
		gap = 6
		padding = 0
		currentX = padding
		totalButtonsWidth = 0

		for btnData, index in buttonsData
			btn = ActionButtonManager.createModalButton
				parent: @content
				width: btnData.width
				height: btnData.height
				image: btnData.image
				x: currentX
				y: Align.top(8)
				type: @options.type
				index: index

			currentX += btnData.width + gap
			totalButtonsWidth += btnData.width

		totalContentWidth = totalButtonsWidth + (buttonsData.length - 1) * gap + 2 * padding
		@content.width = totalContentWidth
		@content.height = 54

# Добавляем панель действий в модальное окно статьи
ModalActions_Article_TLDR = new ModalActionsPanel
	parent: omniboxModalContinueChat
	type: "articleTLDR"

# Создаём невидимый контейнер для шаблонной панели Explore Topic
ModalActions_Article_ExploreTopic_HiddenContainer = new Layer
	parent: screen
	width: 393
	height: 54
	y: -1000
	visible: false
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно Explore Topic (шаблон, скрыт)
exploreTopicModalActions_template = new ModalActionsPanel
	parent: ModalActions_Article_ExploreTopic_HiddenContainer
	y: 0
	type: "exploreTopic"

# Добавляем панель действий в модальное окно видео
videoModalActions = new ModalActionsPanel
	parent: videoOmniboxModalContinueChat
	y: 0
	type: "videoModal"

itemModalActions = new ModalActionsPanel
	parent: itemOmniboxModalContinueChat
	y: 0
	type: "ecomItemContentModal"

# --- ActionPanel компонент с горизонтальным скроллом и кнопками-изображениями ---
class ActionPanel extends ScrollComponent
	constructor: (options = {}) ->
		{ parent, y, type } = options
		@options = options
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

		buttonsData = @getButtonsData(type)
		@createButtons(buttonsData)

		@.on Events.SwipeRightStart, (event, layer) ->
			if @scrollX > 0 then event.stopPropagation()

	getButtonsData: (type) -> # Для ActionPanel (не модальных)
		# console.log("ActionPanel.getButtonsData: type = #{type}")
		if type == "article"
			return [
				{ image: "images/action-button/site action button tldr.png", width: 77.0, height: 44.0 }
				{ image: "images/action-button/site action button explore topic.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
			]
		else if type == "video"
			return [
				{ image: "images/action-button/site action button video translate vocalize.png", width: 179.0, height: 44.0 }
				{ image: "images/action-button/site action button explore topic.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button video quick recap.png", width: 188.0, height: 44.0 }
				{ image: "images/action-button/site action button video recap 3 min.png", width: 136.0, height: 44.0 }
				{ image: "images/action-button/site action button video key moments.png", width: 131.0, height: 44.0 }
			]
		else if type == "news"
			return [
				{ image: "images/action-button/site action button news brief.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button explore topic.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news buzz meter.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button news media tone.png", width: 115.0, height: 44.0 }
				{ image: "images/action-button/site action button news trends.png", width: 145.0, height: 44.0 }
			]
		else if type == "twitter"
			return [
				{ image: "images/action-button/site action button twitter smart reply.png", width: 122.0, height: 44.0 }
				{ image: "images/action-button/site action button explore topic.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter tread.png", width: 131.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter advocate.png", width: 150.0, height: 44.0 }
				{ image: "images/action-button/site action button twitter facts.png", width: 112.0, height: 44.0 }
			]
		else if type == "trip"
			return [
				{ image: "images/action-button/site action button trip plan.png", width: 108.0, height: 44.0 }
				{ image: "images/action-button/site action button explore topic.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button trip things to do.png", width: 123.0, height: 44.0 }
				{ image: "images/action-button/site action button trip weather.png", width: 170.0, height: 44.0 }
				{ image: "images/action-button/site action button trip weekedn plan.png", width: 133.0, height: 44.0 }
			]
		else if type == "item" # For NavigationView_EcomItem ActionPanel
			return [
				{ image: "images/action-button/site action button best price.png", width: 187.0, height: 44.0 }
				{ image: "images/action-button/site action button explore topic.png", width: 112.0, height: 44.0 }
				{ image: "images/action-button/site action button fact smark picks.png", width: 116.0, height: 44.0 }
				{ image: "images/action-button/site action button product deep dive.png", width: 165.0, height: 44.0 }
				{ image: "images/action-button/site action button pros cons.png", width: 120.0, height: 44.0 }
			]
		else
			console.warn("ActionPanel.getButtonsData: Unknown type #{type}")
			return []


	createButtons: (buttonsData) ->
		gap = 6
		padding = 0
		currentX = padding
		totalButtonsWidth = 0

		for btnData, index in buttonsData
			btn = ActionButtonManager.createButton # Использует createButton
				parent: @content
				width: btnData.width
				height: btnData.height
				image: btnData.image
				x: currentX
				y: Align.top(8)
				type: @options.type
				index: index

			currentX += btnData.width + gap
			totalButtonsWidth += btnData.width

		totalContentWidth = totalButtonsWidth + (buttonsData.length - 1) * gap + 2 * padding
		@content.width = totalContentWidth
		@content.height = 54

# --- Добавляем ActionPanel внутрь больших панелей ---
articleActions = new ActionPanel
	parent: bottomViewArticle
	type: "article"

videoActions = new ActionPanel
	parent: bottomViewVideo
	type: "video"

itemActions = new ActionPanel
	parent: bottomViewEcomItem
	type: "item"

# Добавляем обработчики для кнопок в Ecom Item View (itemActions)
# Теперь ActionButtonManager.createButton для этих кнопок не будет назначать свой onClick,
# так как в ActionButtonManager.getButtonConfig мы установили modal: null для них.
# Эти обработчики будут единственными.
for btn, index in itemActions.content.children
	if index == 0 # Best Price (первая кнопка типа "item")
		btn.onClick -> flow.open(ModalView_EcomItem_Content)
	else if index == 1 # Explore Topic (вторая кнопка типа "item")
		btn.onClick -> flow.open(ModalView_EcomItem_ExploreTopic)


# ... (остальной код без изменений до конца) ...

# Добавляем обработчик скролла для видео
NavigationView_Video.content.onDragStart ->
	if NavigationView_Video.content.draggable.direction is "up"
		bottomViewVideo.animate
			y: NavigationView_Video.height
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
NavigationView_Ecom.content.onDragStart ->
	if NavigationView_Ecom.content.draggable.direction is "up"
		bottomViewEcom.animate
			y: NavigationView_Ecom.height
			options:
				time: 0.1
				curve: Spring(damping: 1)
		ecom20site20bottom20bar.animate
			y: NavigationView_Ecom.height - 54
			options:
				time: 0.1
				curve: Spring(damping: 1)
	else
		bottomViewEcom.animate
			y: Align.bottom
			options:
				time: 0.1
				curve: Spring(damping: 1)
		ecom20site20bottom20bar.animate
			y: Align.bottom(-85)
			options:
				time: 0.1
				curve: Spring(damping: 1)

# Добавляем обработчик скролла для ecom item
NavigationView_EcomItem.content.onDragStart ->
	if NavigationView_EcomItem.content.draggable.direction is "up"
		bottomViewEcomItem.animate
			y: NavigationView_EcomItem.height
			options:
				time: 0.1
				curve: Spring(damping: 1)
		ecom20item20site20bottom20bar.animate
			y: NavigationView_EcomItem.height - 69
			options:
				time: 0.1
				curve: Spring(damping: 1)
	else
		bottomViewEcomItem.animate
			y: Align.bottom
			options:
				time: 0.1
				curve: Spring(damping: 1)
		ecom20item20site20bottom20bar.animate
			y: Align.bottom(-139)
			options:
				time: 0.1
				curve: Spring(damping: 1)

# Создаем новое модальное окно для Explore Topic
ModalView_Article_ExploreTopic = new ModalView
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
	parent: ModalView_Article_ExploreTopic.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна Explore Topic
exploreTopicOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ModalView_Article_ExploreTopic
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно Explore Topic
exploreTopicModalActions = new ModalActionsPanel
	parent: exploreTopicOmniboxModalContinueChat
	y: 0
	type: "exploreTopic"

# News ветка
NavigationView_News = new NavigationView
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
siteNews.parent = NavigationView_News.content
siteNews.x = 0
siteNews.y = 40 # Отступ от верхней панели

# Добавляем нижнюю панель
bottomViewNews = new Layer
	width: 393
	height: 139
	image: "images/Bottom View Actions.png"
	parent: NavigationView_News
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
siteNewsUrl = new Layer
	parent: bottomViewNews
	width: 393.0
	height: 85.0
	image: "images/site url title news.png"
	x: Align.center
	y: Align.bottom

# Добавляем панель действий для новостей
newsActions = new ActionPanel
	parent: bottomViewNews
	type: "news"

# Добавляем обработчик скролла для новостей
NavigationView_News.content.onDragStart ->
	if NavigationView_News.content.draggable.direction is "up"
		bottomViewNews.animate
			y: NavigationView_News.height
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
ModalView_News_Brief = new ModalView
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
	parent: ModalView_News_Brief.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна News Brief
newsBriefOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ModalView_News_Brief
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно News Brief
newsBriefModalActions = new ModalActionsPanel
	parent: newsBriefOmniboxModalContinueChat
	y: 0
	type: "newsBriefModal"

# Создаем новое модальное окно для News Explore Topic
ModalView_News_ExploreTopic = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно News Explore Topic
newsModalExploreTopicContent = new Layer
	width: 393.0
	height: 724.0
	image: "images/News Modal Explore Topic.png"
	parent: ModalView_News_ExploreTopic.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна News Explore Topic
newsExploreTopicOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ModalView_News_ExploreTopic
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно News Explore Topic
newsExploreTopicModalActions = new ModalActionsPanel
	parent: newsExploreTopicOmniboxModalContinueChat
	y: 0
	type: "newsExploreTopicModal"

# Twitter ветка
NavigationView_Twitter = new NavigationView
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
twitterContent.parent = NavigationView_Twitter.content
twitterContent.x = 0
twitterContent.y = 40 # Отступ от верхней панели

# Добавляем нижнюю панель
bottomViewTwitter = new Layer
	width: 393
	height: 139
	image: "images/Bottom View Actions.png"
	parent: NavigationView_Twitter
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
siteTwitterUrl = new Layer
	parent: bottomViewTwitter
	width: 393.0
	height: 85.0
	image: "images/site url title twitter.png"
	x: Align.center
	y: Align.bottom

# Добавляем панель действий для Twitter
twitterActions = new ActionPanel
	parent: bottomViewTwitter
	type: "twitter"

# Добавляем обработчик скролла для Twitter
NavigationView_Twitter.content.onDragStart ->
	if NavigationView_Twitter.content.draggable.direction is "up"
		bottomViewTwitter.animate
			y: NavigationView_Twitter.height
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
ModalView_Twitter_ExploreTopic = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно Twitter Explore Topic
twitterModalExploreTopicContent = new Layer
	width: 393.0
	height: 724.0
	image: "images/Twitter Modal Explore Topic.png"
	parent: ModalView_Twitter_ExploreTopic.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна Twitter Explore Topic
twitterExploreTopicOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ModalView_Twitter_ExploreTopic
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно Twitter Explore Topic
twitterExploreTopicModalActions = new ModalActionsPanel
	parent: twitterExploreTopicOmniboxModalContinueChat
	y: 0
	type: "twitterExploreTopicModal"

# Создаем модальное окно для Twitter Smart Reply
ModalView_Twitter_SmartReply = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно Twitter Smart Reply
twitterModalSmartReplyContent = new Layer
	width: 393.0
	height: 724.0
	image: "images/Twitter Modal Smart Reply.png"
	parent: ModalView_Twitter_SmartReply.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна Twitter Smart Reply
twitterSmartReplyOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ModalView_Twitter_SmartReply
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно Twitter Smart Reply
twitterSmartReplyModalActions = new ModalActionsPanel
	parent: twitterSmartReplyOmniboxModalContinueChat
	y: 0
	type: "twitterSuggestTweetModal"

# Создаем модальное окно для Ecom Item Explore Topic
ModalView_EcomItem_ExploreTopic = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно Ecom Item Explore Topic
ecomItemModalExploreTopicContent = new Layer
	width: 393.0
	height: 724.0
	image: "images/Article Modal Content Explore Topic.png"
	parent: ModalView_EcomItem_ExploreTopic.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна Ecom Item Explore Topic
ecomItemExploreTopicOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ModalView_EcomItem_ExploreTopic
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно Ecom Item Explore Topic
ModalActions_EcomItem_ExploreTopic = new ModalActionsPanel
	parent: ecomItemExploreTopicOmniboxModalContinueChat
	type: "ecomItemExploreTopicModal"


# Sports ветка
NavigationView_Sports = new NavigationView
	parent: flow
	backgroundColor: "white"
	showBack: false
	height: 852
	contentInset: bottom: 80
	buttons:
		back:
			width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious()

# Добавляем изображение спортивной ленты в скролл
sports20Feed = new Layer
	width: 393.0
	height: 1499.0
	image: "images/Sports Feed.png"
	parent: NavigationView_Sports.content

# Добавляем нижнюю панель
sports20Bottom20View = new Layer
	width: 393.0
	height: 92.0
	image: "images/Sports Bottom View.png"
	parent: NavigationView_Sports
	y: Align.bottom

# Добавляем кнопку возврата на главный экран
homeButtonSports = new Button
	parent: sports20Bottom20View
	width: 48
	height: 48
	x: Align.left(12)
	y: Align.bottom(-28)
	backgroundColor: null
	handler: () -> 
		flow.showPrevious()

# Добавляем обработчик скролла для спортивной ленты
NavigationView_Sports.content.onDragStart ->
	if NavigationView_Sports.content.draggable.direction is "up"
		sports20Bottom20View.animate
			y: NavigationView_Sports.height
			options:
				time: 0.1
				curve: Spring(damping: 1)
	else
		sports20Bottom20View.animate
			y: Align.bottom
			options:
				time: 0.1
				curve: Spring(damping: 1)

# Создаем модальное окно для Ecom Explore Topic
ModalView_Ecom_ExploreTopic = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно Ecom Explore Topic
ecom20Modal20Explore20TopicContent = new Layer
	width: 393.0
	height: 724.0
	image: "images/Ecom Modal Explore Topic.png"
	parent: ModalView_Ecom_ExploreTopic.content
	x: 0
	y: 0

# Добавляем нижнюю панель в модальное окно
ecomExploreTopicBottomView = new Layer
	width: 393
	height: 146
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ModalView_Ecom_ExploreTopic
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем кнопку Explore Topic в нижнюю панель ecomView
ecomExploreTopicButton = new Button
	parent: bottomViewEcom
	width: 48
	height: 48
	x: Align.left(72)
	y: Align.bottom(-26)
	backgroundColor: "null"
	handler: () -> flow.open(ModalView_Ecom_ExploreTopic)

# Trip ветка
NavigationView_Trip = new NavigationView
	parent: flow
	backgroundColor: "white"
	showBack: false
	height: 852
	contentInset: bottom: 139
	buttons:
		back:
			width: 64, height: 64, x: Align.left(4), y: Align.top(48), backgroundColor: null
			handler: () -> flow.showPrevious()

# Добавляем изображение Trip в скролл
site20Trip = new Layer
	width: 393.0
	height: 1651.0
	image: "images/Site Trip.png"
	parent: NavigationView_Trip.content
	x: 0
	y: 40 # Отступ от верхней панели

# Добавляем нижнюю панель
bottomViewTrip = new Layer
	width: 393
	height: 139
	image: "images/Bottom View Actions.png"
	parent: NavigationView_Trip
	y: Align.bottom

# Добавляем кнопку возврата на главный экран
homeButtonTrip = new Button
	parent: bottomViewTrip
	width: 48
	height: 48
	x: Align.left(12)
	y: Align.bottom(-28)
	backgroundColor: null
	handler: () -> 
		flow.showPrevious()

# Добавляем тайл с URL для Trip
site20url20title20trip = new Layer
	width: 393.0
	height: 85.0
	image: "images/site url title trip.png"
	parent: bottomViewTrip
	x: Align.center
	y: Align.bottom

# Добавляем панель действий для Trip
tripActions = new ActionPanel
	parent: bottomViewTrip
	type: "trip"

# Добавляем обработчик скролла для Trip
NavigationView_Trip.content.onDragStart ->
	if NavigationView_Trip.content.draggable.direction is "up"
		bottomViewTrip.animate
			y: NavigationView_Trip.height
			options:
				time: 0.1
				curve: Spring(damping: 1)
	else
		bottomViewTrip.animate
			y: Align.bottom
			options:
				time: 0.1
				curve: Spring(damping: 1)

# Создаем модальное окно для Trip Explore Topic
ModalView_Trip_ExploreTopic = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно Trip Explore Topic
trip20Modal20Explore20TopicContent = new Layer
	width: 393.0
	height: 724.0
	image: "images/Trip Modal Explore Topic.png"
	parent: ModalView_Trip_ExploreTopic.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна Trip Explore Topic
tripExploreTopicOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ModalView_Trip_ExploreTopic
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно Trip Explore Topic
tripExploreTopicModalActions = new ModalActionsPanel
	parent: tripExploreTopicOmniboxModalContinueChat
	y: 0
	type: "tripExploreTopicModal"

# Создаем модальное окно для Trip Plan
ModalView_Trip_Plan = new ModalView
	parent: flow
	width: 393
	y: screen.height - 724
	height: 724
	borderRadius: 24
	backgroundColor: "white"

# Добавляем контент в модальное окно Trip Plan
trip20Modal20PlanContent = new Layer
	width: 393.0
	height: 1280.0
	image: "images/Trip Modal Plan.png"
	parent: ModalView_Trip_Plan.content
	x: 0
	y: 0

# Добавляем компонент продолжения чата в нижнюю часть модального окна Trip Plan
tripPlanOmniboxModalContinueChat = new Layer
	width: 393.0
	height: 146.0
	image: "images/Omnibox Modal Continue Chat.png"
	parent: ModalView_Trip_Plan
	y: Align.bottom
	backgroundColor: "transparent"

# Добавляем панель действий в модальное окно Trip Plan
tripPlanModalActions = new ModalActionsPanel
	parent: tripPlanOmniboxModalContinueChat
	y: 0
	type: "tripPlanModal"

# Кастомные обработчики onClick для кнопок в ModalActionsPanel.
# Теперь они будут единственными, кто назначает onClick для этих конкретных кнопок,
# так как в ActionButtonManager.getModalButtonConfig для них modal: null.
for btn, index in ModalActions_EcomItem_ExploreTopic.content.children
	if index == 0 # Best Price
		btn.onClick ->
			flow.showPrevious()
			flow.open(ModalView_EcomItem_Content)

for btn, index in tripExploreTopicModalActions.content.children
	if index == 0 # Plan button
		btn.onClick ->
			flow.showPrevious()
			flow.open(ModalView_Trip_Plan)

for btn, index in newsExploreTopicModalActions.content.children
	if index == 0 # News Brief button
		btn.onClick ->
			flow.showPrevious()
			flow.open(ModalView_News_Brief)

for btn, index in twitterExploreTopicModalActions.content.children
	if index == 0 # Smart Reply button
		btn.onClick ->
			flow.showPrevious()
			flow.open(ModalView_Twitter_SmartReply)

for btn, index in exploreTopicModalActions.content.children
	if index == 0 # TLDR button
		btn.onClick ->
			flow.showPrevious()
			flow.open(ModalView_Article_Content)