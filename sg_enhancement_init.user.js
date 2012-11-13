// ==UserScript==
// @name          Steamgifts Enhancement Addon
// @description   Browse game giveaways like a pro.
// @version       2.2
// @namespace 	  http://www.steamgifts.com/user/Zo
// @author        Zo
// @run-at        document-end
// @include       http://www.steamgifts.com/
// @include       http://www.steamgifts.com/#
// @include       http://www.steamgifts.com/open*
// @include       http://www.steamgifts.com/new*
// @include       http://www.steamgifts.com/forum*
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

// doesnt load script if webpage is in a frame/iframe
if(window.top == window) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://rossengeorgiev.github.com/sg-enhancement-addon/sg_enhancement_addon_base.js"
  document.body.appendChild(script);
} 
