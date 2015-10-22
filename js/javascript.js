(function(window, document, undefined) {

	'use strict';

	var app = {};

	app.navEvent = function(container) {
		var nav_links = document.querySelector('.' + container).querySelectorAll('a');
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
	}

	app.ajaxCall = function(request) {
		var xhr = new XMLHttpRequest();
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

	app.controlEvent = function() {
		window.addEventListener('popstate', function() {
			var endUrl = window.location.pathname.split('/').pop();
			app.ajaxCall(endUrl);
		}, false);
	}

	app.navEvent('nav'); //hooks ajax calls to 'a' tags inside 'nav'
	app.controlEvent(); //enables back/foward

	return app;

})(window, document);