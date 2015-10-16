(function(window, document, undefined) {

	'use strict';

	var app = {};

	app.navEvent = function(container) {
		var nav_links = document.querySelector('.' + container).querySelectorAll('a');
		for (var i = 0; i < nav_links.length; i++){
			var anchor = nav_links[i];
			anchor.addEventListener('click', function(event) {
				event.preventDefault();
				app.ajaxCall(this.getAttribute('href'));
			});
		}
	}

	app.ajaxCall = function(request) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'templates/' + encodeURI(request) + '.html', true);
		xhr.send();
		xhr.onload = function() {
			if (xhr.status === 200) {
				var stateObj = { page: request };
				history.pushState(stateObj, '', request);
				app.injectContent(xhr.responseText, request);
			}
		};
	}

	app.injectContent = function(content) {
		var container = document.querySelector('.content');
		container.innerHTML = content;
	}


	app.navEvent('nav');

})(window, document);