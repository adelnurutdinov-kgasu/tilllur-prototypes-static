
screen = new Layer { width: 1024 * 2 + 80, height: 1024 + 200, backgroundColor: null }

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, forceDesktop: true }

titles = [
	"японский дом с камелией, и рекой, на заднем фоне водопад",
"юная рыжеволосая курносая красавица, с медовыми глазами, похожая на лису",
"здание в виде листа алоэ вера",
"шпиц с пивом в руке и с щетиной под сорок",
"шар стеклянный роза море пляж камни ночь луна",
"чертенок сидит в болоте, блестящая вода, темный свет",
"чёрный ворон бьется в яростной схватке с огненным фениксом",
"человека сделанного из кварцевого песка  сдувает ветер",
"человек в белом костяном шлеме из черепа дракона, латный доспех с красным плащом",
"царское кошачье семейство, кот король, кошка королева, и принцесса котёнок все в коронах",
"хрустальное дерево в пещере с изумрудами в воде",
"хрустальная и зеркальная чаша на стеклянной стойке с огнем на стенках чаши наполняется водой из красивого водопада",
"химический элемент платина в стиле персонажа аниме",
"уютный маленький чердак  без мебели, находящийся на огромной очень большой высоте, с сеном вместо пола",
"три богатыря, верхом на своих могучих конях, в руках мечи, в кольчугах",
"тёмный и мрачный английский каменный городок, расположенный на суровом острове",
"стол на котором лежит много косметики и разбитое зеркало",
"стиральная машина стоит на льдине, льдина плывёт в реке, зима",
"стеклянный лимон-прозрачный дом, огромное окно в виде среза лимона под углом 45°",
"старинный дом с приведениями, свет в окнах, в дремучем лесу у болота",
"средневековая деревушка, дорога уходит вниз, слева лес",
"собака китайская хохлатая с изумрудными волосами заплетеными в косы",
"скелет лошади в драгоценных камнях и цветах высокое качество",
"зелёная сказочная птица с длинным тонким хвостом в высокой золотой клетке под деревом с золотыми яблоками",
"серый котёнок король канализации сидит на троне из крыс",
"светлячки в зелёном тумане на фоне развалин и силуэт призрака",
"розовый шарик мороженого в виде планеты, вокруг планеты кольца и спутник",
"ретро машина в тумане, заросли, яркая молния, тучи, дождь",
"раскрытая книга лежит на столе, из книги встают трехмерные детали Альпийские луга",
"помесь лягушки и ящерицы мурлок посреди болота с кинжалами",
"подиум для товарной карточки на прозрачном фоне",
"по парку медленно идёт одинокий человек в длинном плаще",
"пещерная тварь с огромными зубами и горящими глазами",
"парящий пончик в космосе среди звезд",
"пантера из жидкого голографического металла",
"орки играют в оркестре на скрипках",
"огромный мамонт стоит на берегу реки, астероид видно в небе",
"огромное незамкнутое лиминальное пространство",
"небесный город в китайском стиле в облаках из белого мрамора, нефрит",
"на затонувшем фрегате выросли кораллы и плавают косяки рыб",
"на груди красивой женщины сидит чёрный пушистый долгопят с огромными красными глазами",
"мрачный винтажный автомобиль с длинным капотом и высокой решеткой радиатора",
"мрачное убранство комнаты в  готическом замке, за окном снежная ночь, луна",
"модная кошка сфинкс в разноцветных очках с вставками из драгоценных камней и страз держит лапами попкорн",
"милая ведьмочка, коричневые волосы, зелёные глаза, остроконечная шляпа, которую украшает множество роз",
"матерый заключённый татуировки на лице в оранжевой робе",
"лиловый тигрёнок в лиловой кепке, с фотоаппаратом, на фоне облаков",
"деревья светятся синеватым цветом, вечер",
"кот в косюме жёлтой утки",
"кинематографическая железная дорога в стиле стимпанк состоящая из полированной меди",
]


pages = new PageComponent
	parent: screen
	width: screen.width
	height: screen.height
	scrollVertical: false
	scrollHorizontal: true
	backgroundColor: null

pages.on "change:currentPage", ->
	try
		currentText.text = "Сравнение #{pages.currentPage.custom.index + 1} / #{IMAGE_NUM}"
	catch
		currentText.text = "Результаты"

	


IMAGE_NUM = 50
for i in [0...IMAGE_NUM]

	page = new Layer
		parent: pages.content
		width: screen.width
		height: screen.height
		x: (screen.width + 120) * i
		backgroundColor: null
		custom:
			type: "null"
			index: i
	
	image1 = new Layer
		parent: page
		size: 1024
		x: Align.left
		y: Align.top(100)
		image: "images/yandex/" + i + ".jpg"
		# backgroundColor: Utils.randomColor()
		custom:
			type: "yandex"
			twin: null
	
	image2 = new Layer
		parent: page
		size: 1024
		x: Align.right
		y: Align.top(100)
		# image: Utils.randomImage()
		image: "images/other/" + i + ".jpg"
		custom:
			type: "other"
			twin: null
	
	image1.custom.twin = image2
	image2.custom.twin = image1

	for item in [image1, image2]
		item.states =
			"start": { opacity: 1 }
			"select": { opacity: 1 }
			"deselect": { opacity: 0.2 }
		item.stateSwitch("start")

		item.onTap ->
			@stateSwitch("select")
			@custom.twin.stateSwitch("deselect")
			@parent.custom.type = @custom.type

			textView.text = composeResults()
		
	
	shouldSwap = Utils.randomChoice([true, false])
	if shouldSwap
		image1.x = Align.right
		image2.x = Align.left
	
	promptText = new TextLayer
		parent: page
		width: page.width
		height: 100
		y: Align.bottom(40)
		text: titles[i]
		textAlign: "center"
		fontSize: 36
		color: "white"
	
	currentText = new TextLayer
		parent: page
		width: page.width
		height: 100
		y: Align.top(0)
		text: "Сравнение #{i + 1} / #{IMAGE_NUM}"
		textAlign: "center"
		fontSize: 36
		color: "white"
		


resultPage = new Layer
	parent: pages.content
	width: screen.width
	height: screen.height
	backgroundColor: "444"

resultPage.states =
	"same": { backgroundColor: "999999" }
	"win": { backgroundColor: "3D6D49" }
	"lost": { backgroundColor: "6D403D" }

# for i in [0...IMAGE_NUM]

# 	previewImage1 = new Layer
# 		parent: resultPage
# 		size: 64
# 		y: i % 5 * 64
# 		image: Utils.randomImage()
	
# 	previewImage2 = new Layer
# 		parent: resultPage
# 		size: 64
# 		x: 64 + 10
# 		y: i % 5 * 64
# 		image: Utils.randomImage()


composeResults = () ->
	numYandex = 0
	numOther = 0

	for item in pages.content.children
		try 
			if item.custom.type == "yandex" then numYandex = numYandex + 1
		try
			if item.custom.type == "other" then numOther = numOther + 1
	
	if numOther == 0
		if numYandex == 0
			resultPage.stateSwitch("same")
			return "—"
		else
			resultPage.stateSwitch("win")
			return "Мы набрали 100 %"

	numb = numYandex / (numOther + numYandex)

	if numb == 0.5 then resultPage.stateSwitch("same")
	else if numb > 0.5 then resultPage.stateSwitch("win")
	else resultPage.stateSwitch("lost")

	
	return "Мы набрали #{(numb * 100).toFixed()} % против конкурента"



textView = new TextLayer
	parent: resultPage
	width: resultPage.width
	height: resultPage.height
	y: 560
	textAlign: "center"
	text: "Нужно выбрать хотя бы одно изображение из пары"
	color: "white"
	

# resultPage.parent = pages.content
resultPage.x = (screen.width + 120) * IMAGE_NUM
pages.updateContent()





Events.wrap(window).addEventListener "keydown", (event) ->

	if event.code is "ArrowLeft"
		pages.snapToNextPage("left", false)

	else if event.code is "ArrowRight"
		pages.snapToNextPage("right", false)
	


	else if event.code is "Digit1"
		child1 = pages.currentPage.children[0]
		child2 = pages.currentPage.children[1]
		
		if child1.x == 0 then child1.emit Events.Tap
		else child2.emit Events.Tap
	
	else if event.code is "Digit2"
		child1 = pages.currentPage.children[0]
		child2 = pages.currentPage.children[1]

		if child1.x == 0 then child2.emit Events.Tap
		else child1.emit Events.Tap