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

# Обработчик события окончания перетаскивания
summarizeButton.on Events.DragEnd, ->
    # Рассчитываем дистанцию от исходной точки
    dx = @x - summarizeButton.originPosition.x
    dy = @y - summarizeButton.originPosition.y
    distance = Math.sqrt(dx*dx + dy*dy)
    
    # Если кнопка была перетащена на достаточное расстояние в любом направлении
    if distance > 100
        # Определяем финальные координаты в зависимости от направления движения
        finalX = @x + dx * 3 # Продолжаем движение в том же направлении
        finalY = @y + dy * 3
        
        # Анимируем скрытие кнопки в направлении свайпа
        @animate
            x: finalX
            y: finalY
            opacity: 0
            scale: 0.5
            options:
                curve: Bezier.easeOut
                time: 0.4
        
        # Флаг, что кнопка полностью скрыта пользователем
        @isDismissedByUser = true
    else
        # Возвращаем на место
        @animate
            x: summarizeButton.originPosition.x
            y: summarizeButton.originPosition.y
            options:
                curve: Spring(damping: 0.7)

# Создаем нижнюю панель с кнопками
bottomPanel = new Layer
    parent: homeView
    width: 375
    height: 76
    image: "images/bottomPanel.png"
    y: Align.bottom

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