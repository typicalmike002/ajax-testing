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
