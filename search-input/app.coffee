Utils.insertCSS('@import url(css/reset.css)')
Utils.insertCSS('@import url(css/input.css)')
Utils.insertCSS('@import url(css/project.css)')

# API

{DynamicLoader} = require "DynamicLoader"
DynamicLoader.series(["./vendor/rest.js",]).then(->
	;
)


`window.searchQuery = function(q) {
	var API = 'https://suggest.yandex.ru/';
	
	var endingsURL = API + 'suggest-endings?v=4&part=' + encodeURI(q) + '&digram_only=0&digram_coeff=1&srv=test&lr=213&uil=ru&sn=100&esn=10';
	
	requestJSON(endingsURL).then(function(data2) {
		var endings = data2[2];
		console.log('Endings answer:', endings);
		
		var qlen = q.length;
		var rawEndings = []
		
		var cleanEndings = endings.map(function(e) { 
			var dp = e[0].substr(qlen);
			console.log ('NNNNNNNN:',dp);
			rawEndings.push(dp);
			
			var p = e[0];
			if (dp[0]==" " ){return e[0].substr(qlen);} 
			var i = qlen;

			while (i > 0) {
				i --
				if (p[i]==" "){
					e[0]=e[0].substr(i);
					i=0;
				}
			}
			return e[0]; });
		
		updateSuggestContext(cleanEndings, rawEndings)
		
	}.bind(this));
	
	
	var url = API + 'suggest-ya.cgi?part=' + encodeURI(q) + '&v=4&?n=10&?fact=1&?mob=1';
	requestJSON(url).then(function(data) {
		var suggest = data[1] || [];
		console.log(data)
		updateSuggestLines(data)
	}.bind(this));
}`

Framer.Defaults.Animation =
	curve: Spring(damping: 1), time: 0.4

screen = new Layer
    width: 375, height: 812,
    backgroundColor: "ECECEC"

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen }
# preview.backgroundColor = "222"


startPage = new Layer
	parent: screen
	width: 375, height: 812
	image: "images/start.png"

startPage.states =
	"start": { opacity: 1 }
	"focus": { opacity: 0 }
startPage.stateSwitch("start")



# Input

clearSearch = () ->
	inputLayer.querySelector("#myInput").value = ""


inputLayer = new Layer
	parent: screen
	width: 315, height: 132, x: 30
	backgroundColor: null
# 	html: "<form id='myForm' onSubmit='search();return false;' action='#'><input id='myInput' multiple type='search' autocapitalize='off' autocomplete='off' autocorrect='off' style='color: rgba(0,0,0,1); background-color: rgba(255, 255, 255, 1); width: 295px; height: 132px; font-size: 32px; resize: vertical; box-sizing: border-box; text-overflow:ellipsis; -webkit-tap-highlight-color: transparent; -webkit-appearance: none;'></form>"
	html: "<textarea onmouseover='return false;' id='myInput' name='Text1' rows='5' cols='100' style=' height: 132px; font-size: 32px; border: 0; margin: 0; padding: 0; box-sizing: border-box; width: 100%; -webkit-tap-highlight-color: transparent; -webkit-appearance: none; outline-width: 0; outline: none;'></textarea>"

inputLayer.states =
	"start": { y: 128 }
	"focus": { y: 208 }
inputLayer.stateSwitch("start")

inputLayer.querySelector("#myInput").placeholder = "search everything"
inputLayer.querySelector("#myInput").style["fontFamily"] = "Verdana, SF Pro UI, System"
inputLayer.querySelector("#myInput").style["background"] = "rgba(0,0,0,0)"
inputLayer.querySelector("#myInput").style["fontWeight"] = 700

# inputLayer.querySelector("body").style["outline-width"] = 0


htmlInput = inputLayer.querySelector("#myInput")


isEmptyInputText = () ->
	return htmlInput.value == ""

updateInput = () ->
	htmlInput.value

# Events.wrap(inputLayer.querySelector("#myInput")).addEventListener "input", ->
# 	updateInput()

# Events.wrap(inputLayer.querySelector("#myForm")).addEventListener "submit", (event) ->
# 	event.preventDefault()


# `window.search = function () {
# 	document.activeElement.blur();
# 	submitSearch()
# }`



# submitSearch = () ->
# 	screenState.stateSwitch("search")
# 	successQuery = inputLayer.querySelector("#myInput").value

focusHandler = () ->
	# print "?"
	htmlInput.focus()
	
	# if inputLayer.states.current.name == "start"
	inputLayer.animate("focus")
	startPage.animate("focus")
	backButton.animate("focus")


blurHandler = (event, layer) ->
	htmlInput.blur()
	# print inputLayer.querySelector("#myInput")
	inputLayer.querySelector("#myInput").blur()
	
	# if inputLayer.states.current.name == "focus"
	inputLayer.animate("start")
	startPage.animate("start")
	backButton.animate("start")


# StartPage

backButton = new Layer
	parent: screen
	x: 6, y: 32
	width: 60, height: 60
	image: "images/backBig.png"

backButton.states =
	"start": { opacity: 0 }
	"focus": { opacity: 1 }
backButton.stateSwitch("start")

backButton.on(Events.Tap, blurHandler)


startPage_search = new Layer
	parent: startPage
	width: 375, height: 99
	y: Align.bottom
	image: "images/searchNewTab.png"

startPage_search.on(Events.Tap, focusHandler)


startPage_avatar = new Layer
	parent: screen
	width: 28
	height: 28
	x: Align.right(-30), y: Align.top(32 + 16)
	image: "images/photos.png"


# startPage_search.on(Events.Tap, focusHandler)
inputLayer.on(Events.Tap, focusHandler)