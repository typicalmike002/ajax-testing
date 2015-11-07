(function(window, document, undefined) {

	'use strict';

	var ajaxCall = {
		xhrObject: function(){
			if (window.XMLHttpRequest) {
				return new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				// used for old ie browsers
				return new ActiveXObject('MSXML2.XMLHTTP.3.0');
			} else {
				console.log('error processing XMLHttpRequest');
			}
		},
		homePage: 'home',
		folderName: 'templates/',
		fileFormat: 'html',
		method: 'GET',
		contentType: 'text/html',
		isAsync: true,
		containers: {
			contentDiv: document.querySelector('.content'),
			navigation: document.querySelectorAll('.nav_link')
		}
	};

	ajaxCall.makeRequest = function (url) {
		var xhr = this.xhrObject();
		xhr.open(this.method, this.folderName + encodeURI(url) + '.' + this.fileFormat, this.isAsync);
		xhr.setRequestHeader('Content-Type', this.contentType);
		xhr.send();
		xhr.onload = function() {
			if (xhr.status === 200) {
				ajaxCall.loadContent(xhr.responseText);
			}
			else {
				console.log('error loading xhr object');
			}
		}
	};

	ajaxCall.loadContent = function (content) {
		var container = this.containers.contentDiv;
		container.innerHTML = content;
	}

	function pushState(url) {
		// ie9 does not support pushState.
		if (window.history.pushState) {
			var state = { page: url }
			history.pushState(state, '', url);
		}
	}

	ajaxCall.hookLinks = function () {
		var nav_links = this.containers.navigation;
		var nav_length = nav_links.length;
		var anchor = [];
		for (var i = 0; i < nav_length; i++){
			anchor = nav_links[i];
			if (window.addEventListener) {
				anchor.addEventListener('click', function(event) {
					event.preventDefault();
					var url = this.getAttribute('href');
					pushState(url);
					ajaxCall.makeRequest(url);
				}, false);
			} else {
				// ie10 and below
				anchor.attachEvent('click', function(event) {
					event.returnValue = false;
					var url = this.getAttribute('href');
					pushState(url);
					ajaxCall.makeRequest(url);
				});
			}
		}
	}

	//event that triggers ajaxCall when user navigates with the back/forward buttons.
	if (window.addEventListener) {
		window.addEventListener('popstate', function() {
			var url = window.location.pathname.split('/').pop();
			ajaxCall.makeRequest(url);
		}, false);
	} else {
		// ie10 and below
		window.attachEvent('popstate', function() {
			var url = window.location.pathname.split('/').pop();
			ajaxCall.makeRequest(url);
		}
	}

	ajaxCall.hookLinks();

}(window, document));