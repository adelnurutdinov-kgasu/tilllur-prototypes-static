# Add the following line to your project in Framer Studio. 
# myModule = require "myModule"
# Reference the contents by name, like myModule.myFunction() or myModule.myVar


SVGData = require 'SVGIcon'


exports.getName = (layerName) ->
	if layerName == "afisha" then return "Афиша"
	else if layerName == "autoru" then return "Автору"
	else if layerName == "chats" then return "Чаты"
	else if layerName == "disk" then return "Диск"
	else if layerName == "drive" then return "Драйв"
	else if layerName == "eda" then return "Еда"
	else if layerName == "health" then return "Здоровье"
	else if layerName == "kinopoisk" then return "Кинопоиск"
	else if layerName == "mail" then return "Почта"
	else if layerName == "maps" then return "Карты"
	else if layerName == "market" then return "Маркет"
	else if layerName == "money" then return "Деньги"
	else if layerName == "music" then return "Музыка"
	else if layerName == "notifications" then return "Уведом"
	else if layerName == "taxi" then return "Такси"
	else if layerName == "tickets" then return "Авиабилеты"
	else if layerName == "traffic" then return "8 баллов"
	else if layerName == "weather" then return "+2°"
	else if layerName == "zen" then return "Дзен"
	else if layerName == "zen-design" then return "Дизайн в Яндексе"
	else if layerName == "zen-tele" then return "КиноКупер"
	else if layerName == "taxi-home" then return "Домой"
	return ""


exports.getImage = (layerName) ->
	if layerName == "afisha" then return SVGData.afishaSVG
	else if layerName == "autoru" then return SVGData.autoruSVG
	else if layerName == "chats" then return SVGData.chatsSVG
	else if layerName == "disk" then return SVGData.diskSVG
	else if layerName == "drive" then return SVGData.driveSVG
	else if layerName == "eda" then return SVGData.edaSVG
	else if layerName == "health" then return SVGData.healthSVG
	else if layerName == "kinopoisk" then return SVGData.kinopoiskSVG
	else if layerName == "mail" then return SVGData.mailSVG
	else if layerName == "market" then return SVGData.marketSVG
	else if layerName == "money" then return SVGData.moneySVG
	else if layerName == "music" then return SVGData.musicSVG
	else if layerName == "notifications" then return SVGData.notificationsSVG
	else if layerName == "taxi" then return SVGData.taxiSVG
	else if layerName == "tickets" then return SVGData.ticketsSVG
	else if layerName == "traffic" then return SVGData.trafficSVG
	else if layerName == "weather" then return SVGData.weatherSVG
	else if layerName == "zen" then return SVGData.zenSVG
	else if layerName == "zen-design" then return SVGData.zenDesignSVG
	else if layerName == "zen-tele" then return SVGData.zenTeleSVG
	else if layerName == "taxi-home" then return SVGData.taxiHomeSVG
	return ""


exports.getSite = (layerName) ->
	if layerName == "afisha" then return "afisha.yandex.ru"
	else if layerName == "autoru" then return "m.auto.ru"
	else if layerName == "chats" then return "yandex.ru"
	else if layerName == "disk" then return "disk.yandex.ru"
	else if layerName == "drive" then return "drive.yandex.ru"
	else if layerName == "eda" then return "eda.yandex"
	else if layerName == "health" then return "health.yandex.ru/searchapp"
	else if layerName == "kinopoisk" then return "kinopoisk.ru"
	else if layerName == "mail" then return "mail.yandex.ru"
	else if layerName == "maps" then return "maps.yandex.ru"
	else if layerName == "market" then return "market.yandex.ru"
	else if layerName == "money" then return "yandex.ru"
	else if layerName == "music" then return "music.yandex.ru"
	else if layerName == "notifications" then return "yandex.ru"
	else if layerName == "taxi" then return "taxi.yandex.ru"
	else if layerName == "tickets" then return "avia.yandex.ru"
	else if layerName == "traffic" then return "yandex.ru"
	else if layerName == "weather" then return "yandex.ru/pogoda"
	else if layerName == "zen" then return "zen.yandex.ru"
	else if layerName == "zen-design" then return "zen.yandex.ru/yandexdesign"
	else if layerName == "zen-tele" then return "zen.yandex.ru/kinokuper"
	else if layerName == "taxi-home" then return "framer.cloud/sBzss/index.html"
	return ""