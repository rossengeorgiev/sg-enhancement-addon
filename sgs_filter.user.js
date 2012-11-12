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


/*  SGE addon - This a user-script that provides extra functionallity on top of steamgifts.com
    Copyright (C) 2012 Rossen Georgiev

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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

