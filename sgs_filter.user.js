// ==UserScript==
// @name          SteamGameSales Filter
// @description   Filter out games you already own, requires login onto the site
// @version       1.1
// @namespace 	  http://www.steamgifts.com/user/Zo
// @author        Zo
// @run-at        document-end
// @include       http://www.steamgamesales.com/
// @include       http://www.steamgamesales.com
// ==/UserScript==



console.log('SGS Filter begin');

var addToPage = function(callback,data) {
  var script = document.createElement("script");
  script.textContent = "window.gameArray =\""+data.join("@Z@").replace(/([\"\'])/g,"\\$1")+"\".split('@Z@');(" + callback.toString() + ")(jQuery);";
  document.body.appendChild(script);
}

var main = function ($) {

 	for(var i = 0; i < gameArray.length; i++) {
		gameArray[i] = $(gameArray[i]).text();			
	}
    
	console.log('Found ' + gameArray.length + ' games in library');
	console.log('Current number of games on sale: ' + $('.row').length);
	
   	$('.row>.title>a').each(function(k,v) {
		var name = $(v).text();

		for(var i = 0; i < gameArray.length; i++) {	
			if(name == gameArray[i]) {
				$(v).parent().parent().remove();
				break;
			}
		}
	});

	console.log('Left after filtration: '+$('.row').length);
}

GM_xmlhttpRequest({
  method:"GET",
  url:"http://www.steamgamesales.com/sync",
  onload:function(details) {
	var gameArray =  details.responseText.match(/<div class=\"code\">[^<](.+?)<\/div>/g);
	addToPage(main,gameArray);
  }
});

console.log('Fetching games from steamgifts.com');

