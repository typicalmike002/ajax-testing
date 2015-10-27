(function(window, document, undefined) {

	'use strict';

	var app = {};

	app.ajaxCall = function(request) {
		var xhr = new XMLHttpRequest();
		if (request === '') { request = 'home'; } //For when back is used and previous page is the index.
		xhr.open('GET', 'templates/' + encodeURI(request) + '.html', true);
		xhr.setRequestHeader('Content-Type', 'text/html');
		xhr.send();
		xhr.onload = function() {
			if (xhr.status === 200) {
				app.injectContent(xhr.responseText);
			}
			else {
				app.injectContent('Error Processing Request');
			}
		};
	}

	app.injectContent = function(content) {
		var container = document.querySelector('.content');
		container.innerHTML = content;
	}

	app.pushHistory = function(request) {
		var stateObj = { page: request };
		history.pushState(stateObj, '', request);
	}

	(function() {
		//IIFE: Hooks ajax calls into links inside div class nav.
		var nav_links = document.getElementsByClassName('.nav').getElementByTagName('a');
		var nav_length = nav_links.length;
		var anchor = [];
		for (var i = 0; i < nav_length; i++){
			anchor = nav_links[i];
			anchor.addEventListener('click', function(event) {
				event.preventDefault();	
				var request = this.getAttribute('href');
				app.ajaxCall(request);
				app.pushHistory(request);
			}, false);		
		}
	}());

	(function() {
		//IIFE: Will enable the back and forward buttons on browsers.
		window.addEventListener('popstate', function() {
			var endUrl = window.location.pathname.split('/').pop();
			app.ajaxCall(endUrl);
		}, false);
	}());

}(window, document));
