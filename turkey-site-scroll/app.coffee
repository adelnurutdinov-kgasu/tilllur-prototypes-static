{ Preview } = require "PreviewComponent"
{ FlowView, NavigationView, ModalView } = require "NavigationComponent"
{ Button } = require "Buttons"

screen = new Layer { width: 375, height: 812 }
preview = new Preview { view: screen }

flow = new FlowView { parent: screen }
homeView = new NavigationView { parent: flow, backgroundColor: "white", showBack: false }

# Создаем основной контент страницы (главное изображение сайта)
siteImage = new Layer
    parent: homeView
    width: 375
    height: 812
    backgroundColor: "white"

# Создаем скролл контейнер для возможности прокрутки
scrollView = new ScrollComponent
    parent: homeView
    width: 375
    height: 812
    backgroundColor: null
    scrollVertical: true
    scrollHorizontal: false
    directionLock: true
    contentInset: { top: 44, left: 0, bottom: 0, right: 0 }
    
# Размер контента для скролла (должен быть больше высоты экрана для возможности скролла)
scrollContent = new Layer
    parent: scrollView.content
    width: 375
    height: 2997
    backgroundColor: null
    image: "images/site.png"
    # opacity: 0.1 # Делаем почти прозрачным, чтобы видеть основное изображение

# Создаем кнопку summarize
summarizeButton = new Layer
    parent: homeView
    width: 126
    height: 40
    image: "images/summarizeButton.png"
    y: Align.bottom(-84)
    x: Align.center

# Обработчик нажатия на кнопку summarize
summarizeButton.on Events.Tap, ->
    # Открываем модальную шторку при нажатии на кнопку с выбранным 3-им табом
    flow.open(summarySheetView)
    # Переключаемся на третий таб
    switchToTab(2)

# Создаем состояния для кнопки
summarizeButton.states =
    "shown": { y: Align.bottom(-84), opacity: 1, scale: 1 }
    "hidden": { y: Align.bottom(-24), opacity: 0, scale: 0.8 }
    "dismissed": { opacity: 0, scale: 0.5 }
    
summarizeButton.stateSwitch("shown")

# Делаем кнопку draggable для свайпа во все стороны
summarizeButton.draggable = true
summarizeButton.draggable.enabled = true
summarizeButton.draggable.horizontal = true
summarizeButton.draggable.vertical = true
summarizeButton.draggable.momentum = true
summarizeButton.draggable.momentumOptions = { friction: 9 }
summarizeButton.originPosition = { x: summarizeButton.x, y: summarizeButton.y }

# Обработчик события во время перетаскивания
summarizeButton.on Events.DragMove, ->
    # Рассчитываем текущую дистанцию от исходной точки
    dx = @x - summarizeButton.originPosition.x
    dy = @y - summarizeButton.originPosition.y
    distance = Math.sqrt(dx*dx + dy*dy)
    
    # Определяем типы свайпов
    absX = Math.abs(dx)
    absY = Math.abs(dy)
    isHorizontalSwipe = absX > absY && absX > 30
    isDownSwipe = dy > 0 && absY > absX && absY > 30
    
    # Изменяем прозрачность в зависимости от дистанции и типа свайпа
    if isHorizontalSwipe
        # Для горизонтальных свайпов уменьшаем порог до 40px
        threshold = 40
        maxThreshold = 80
        newOpacity = Utils.modulate(absX, [threshold, maxThreshold], [1, 0.5], true)
        @opacity = newOpacity
    else if isDownSwipe
        # Для свайпа вниз также уменьшаем порог
        threshold = 40
        maxThreshold = 80
        newOpacity = Utils.modulate(absY, [threshold, maxThreshold], [1, 0.5], true)
        @opacity = newOpacity
    else if distance > 50
        # Для других типов свайпов оставляем прежний порог
        newOpacity = Utils.modulate(distance, [50, 100], [1, 0.5], true)
        @opacity = newOpacity
    else
        # Возвращаем нормальную прозрачность
        @opacity = 1
    
    # Сохраняем текущие значения для использования в DragEnd
    @_lastDistance = distance
    @_lastDx = dx
    @_lastDy = dy
    @_isHorizontalSwipe = isHorizontalSwipe
    @_isDownSwipe = isDownSwipe

# Обработчик события окончания перетаскивания
summarizeButton.on Events.DragEnd, ->
    # Используем сохраненные значения из DragMove
    dx = @_lastDx || (@x - summarizeButton.originPosition.x)
    dy = @_lastDy || (@y - summarizeButton.originPosition.y)
    distance = @_lastDistance || Math.sqrt(dx*dx + dy*dy)
    absX = Math.abs(dx)
    absY = Math.abs(dy)
    isHorizontalSwipe = @_isHorizontalSwipe
    isDownSwipe = @_isDownSwipe
    
    # Определяем пороговое значение в зависимости от типа свайпа
    threshold = 100
    if isHorizontalSwipe
        threshold = 80
    else if isDownSwipe
        threshold = 60
    
    # Если свайп был достаточно сильным
    shouldDismiss = (isHorizontalSwipe && absX > threshold) || 
                   (isDownSwipe && absY > threshold) || 
                   (!isHorizontalSwipe && !isDownSwipe && distance > threshold)
    
    if shouldDismiss
        # Определяем финальные координаты в зависимости от направления движения
        finalX = @x + dx * 3 # Продолжаем движение в том же направлении
        finalY = @y + dy * 3
        
        # Для свайпа вниз делаем более быстрое "падение"
        if isDownSwipe
            finalY = screen.height + 100
            finalX = @x
        
        # Анимируем скрытие кнопки в направлении свайпа
        @animate
            x: finalX
            y: finalY
            opacity: 0
            scale: 0.5
            options:
                curve: Bezier.easeOut
                time: if isDownSwipe then 0.5 else 0.4
        
        # Флаг, что кнопка полностью скрыта пользователем
        @isDismissedByUser = true
    else
        # Возвращаем на место с нормальной прозрачностью
        @animate
            x: summarizeButton.originPosition.x
            y: summarizeButton.originPosition.y
            opacity: 1
            options:
                curve: Spring(damping: 0.7)

# Создаем модальную шторку для отображения результатов
summarySheetView = new ModalView
    parent: flow
    width: 375
    y: 128  # Оставляем 128px сверху пустыми для закрытия по тапу
    height: screen.height - 128
    borderRadius: 24
    backgroundColor: "white"

# Создаем контейнер для табов с горизонтальным скроллом
tabsScrollContainer = new ScrollComponent
    parent: summarySheetView.content
    width: 375
    height: 84  # Увеличиваем высоту для учета отступа
    backgroundColor: "#FFFFFF"
    y: 0
    scrollVertical: false
    scrollHorizontal: true
    directionLock: true
    mouseWheelEnabled: true
    contentInset: { right: 16 }  # Добавляем отступ справа

# Создаем контейнер для содержимого табов
tabsContainer = new Layer
    parent: tabsScrollContainer.content
    width: 136 + 130 + 121 + 16 + 8 * 2  # Общая ширина всех табов + отступы
    height: 48
    backgroundColor: null
    y: 18  # Отступ сверху 18px

# Переменная для отслеживания текущего активного таба
activeTabIndex = 0

# Массив с контентом для каждого таба
tabContents = []

# Функция для переключения табов
switchToTab = (index) ->
    # Меняем состояние табов
    tab1.image = if index == 0 then "images/tab1_selected.png" else "images/tab1.png"
    tab2.image = if index == 1 then "images/tab2_selected.png" else "images/tab2.png"
    tab3.image = if index == 2 then "images/tab3_selected.png" else "images/tab3.png"
    
    # Скрываем все контенты табов
    for content in tabContents
        content.opacity = 0
    
    # Показываем только активный
    tabContents[index].opacity = 1
    
    # Запоминаем активный таб
    activeTabIndex = index

# Создаем табы
tab1 = new Layer
    parent: tabsContainer
    width: 136
    height: 48
    image: "images/tab1_selected.png"
    x: 16  # Отступ слева 16px
    y: 0

tab2 = new Layer
    parent: tabsContainer
    width: 130
    height: 48
    image: "images/tab2.png"
    x: tab1.maxX + 8  # Добавляем отступ 8px между табами
    y: 0

tab3 = new Layer
    parent: tabsContainer
    width: 121
    height: 48
    image: "images/tab3.png"
    x: tab2.maxX + 8  # Добавляем отступ 8px между табами
    y: 0

# Добавляем обработчики нажатия на табы
tab1.on Events.Tap, -> switchToTab(0)
tab2.on Events.Tap, -> switchToTab(1)
tab3.on Events.Tap, -> switchToTab(2)

# Линия-разделитель после табов
tabsDivider = new Layer
    parent: summarySheetView.content
    width: 375
    height: 1
    backgroundColor: "#EEEEEE"
    y: 84  # Увеличиваем расстояние для учета отступа

# Создаем контейнер для контента, теперь без скролла
summarySheetContent = new Layer
    parent: summarySheetView.content
    width: 375
    height: (screen.height - 128) - 84 - 93  # Высота шторки минус высота контейнера табов и чат-панели
    y: 85  # Сразу после линии-разделителя
    backgroundColor: "white"
    clip: true  # Обрезаем контент, который не помещается

# Создаем панель для ввода запроса в чат
chatPanel = new Layer
    parent: summarySheetView
    width: 375
    height: 89
    image: "images/chatPanel.png"
    y: Align.bottom(-24)
    x: 0  # Прикрепляем к левому краю
    backgroundColor: "white"

# Добавляем обработчик нажатия на панель чата
chatPanel.on Events.Tap, ->
    # Здесь можно добавить логику для обработки нажатия на панель чата
    print "Chat panel tapped"

# Создаем контент для первого таба
tab1Content = new Layer
    parent: summarySheetContent
    width: 375
    height: 618  # Высота картинки
    image: "images/tabContent1.png"
    backgroundColor: "white"
    y: 16  # Отступ 16px от верха контейнера
    originY: 0  # Привязка к верхнему краю
    imagePosition: "top"  # Позиционирование изображения вверху

tabContents.push(tab1Content)

# Создаем контент для второго таба
tab2Content = new Layer
    parent: summarySheetContent
    width: 375
    height: 618  # Высота картинки
    image: "images/tabContent2.png"
    opacity: 0

tabContents.push(tab2Content)

# Создаем контент для третьего таба
tab3Content = new Layer
    parent: summarySheetContent
    width: 375
    height: 618  # Высота картинки
    image: "images/tabContent3.png"
    backgroundColor: "white"
    opacity: 0

tabContents.push(tab3Content)

# Создаем нижнюю панель с кнопками
bottomPanel = new Layer
    parent: homeView
    width: 375
    height: 76
    image: "images/bottomPanel.png"
    y: Align.bottom

# Создаем кнопку sheetButton на панели сайта
sheetButton = new Layer
    parent: bottomPanel
    width: 48
    height: 44
    image: "images/sheetButton.png"
    y: Align.center(-7)
    x: 76


# Обработчик нажатия на кнопку sheetButton
sheetButton.on Events.Tap, ->
    # Открываем модальную шторку при нажатии на кнопку с выбранным 1-ым табом
    flow.open(summarySheetView)
    # Переключаемся на первый таб
    switchToTab(0)

# Создаем состояния для нижней панели
bottomPanel.states =
    "shown": { y: Align.bottom }
    "hidden": { y: Align.bottom(76) }
    
bottomPanel.stateSwitch("shown")

# Скрытый слой для отслеживания направления скролла
scrollGuard = new Layer
    opacity: 0

scrollGuard.states =
    "hidden": { opacity: 0 }
    "shown": { opacity: 0 }

# При изменении состояния этого слоя, меняем видимость нижней панели и кнопки
scrollGuard.on Events.StateSwitchEnd, (from, to) ->
    if from != to
        if to == "shown"
            bottomPanel.animate("shown")
            # Показываем кнопку только если пользователь не скрыл её свайпом
            if !summarizeButton.isDismissedByUser
                summarizeButton.animate("shown")
        else
            bottomPanel.animate("hidden")
            # Скрываем кнопку только если пользователь не скрыл её свайпом
            if !summarizeButton.isDismissedByUser
                summarizeButton.animate("hidden")

# Отслеживаем изменение скролла
scrollView.content.on "change:y", ->
    v = scrollView.scrollY
    
    # Определяем направление скролла и меняем состояние
    if v > 44
        if @draggable.direction == "up" then scrollGuard.stateSwitch("hidden")
        else if @draggable.direction == "down" then scrollGuard.stateSwitch("shown")
    else
        scrollGuard.stateSwitch("shown")