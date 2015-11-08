(function(window, document, undefined) {

	'use strict';

	var options = {

	// The options object is used for swamping enviorments easily.

		homePage: 'home',
		folder: 'templates/',
		fileType: 'html',
		method: 'GET',
		contentType: 'text/html',
		isAsync: true,
		containers: {
			content: 'content',
			navigation: 'nav'
		}
	};


	var xhrObject = {

	// Returns the proper XMLHttpRequest Object based on browser.
	
		requestType: function () {
			
			if (window.XMLHttpRequest) { //Mozilla, Safari, IE7+, Chrome

				return new XMLHttpRequest();

			} else if (window.ActiveXObject) { //IE 6 and older

				return new ActiveXObject('Microsoft.XMLHTTP');
			}
		}
	};


	var Request = function () { 

	//Constructor for new Requests.
	//this was done so the script wont have to keep
	//reloading these on each request.

		this.o = options;
		this.httpRequest = xhrObject.requestType();
		this.wrapper = document.getElementById(this.o.containers.content);
	}


	var ajax = new Request();


	ajax.makeRequest = function (url) { 

	// 1. Makes a request based on the values loaded into the Request object.
	// 2. The Method, content type, async boolean, file format, and folder are all set inside the options object.
	// 3. When the status return 200, the content of the request will be placed inside the 'content' container
	// 		that is set inside the options object.
	
		
		var xhr = this.httpRequest,
			injectDiv = this.wrapper;

		if (url === '') { 

			//When pressing back and the last page visited was the index,
			//set the url to the homePage value found in the options object. 
					
			url = this.o.homePage;

		} 

		xhr.onreadystatechange = function () {

			if (xhr.readyState === XMLHttpRequest.DONE) {

				if (xhr.status === 200) { //injects the response into the content div when successful

					injectDiv.innerHTML = xhr.responseText; 

				} else { //Still waiting for response.

				}
			}
		}

		xhr.open(this.o.method, this.o.folder + encodeURI(url) + '.' + this.o.fileType, this.o.isAsync);
		xhr.setRequestHeader('Content-Type', this.o.contentType);
		xhr.send(null);
	}


	function pushState(url) {

	// Pushes the url into the address bar.
			
		if (window.history.pushState) {
			var state = { page: url }
			history.pushState(state, '', url);
		}
	}


	function navigationControls() {
	
	// 1. Removes default link behavior from links inside the navigation container set in the options object.
	// 2. Each link gets its own event that will trigger a New Request.
	// 3. The request is based off of the link's 'href' value which must be set inside the markup.

		var wrapper = document.getElementById(options.containers.navigation),
			links = wrapper.getElementsByTagName('a'),
			linksLength = links.length,
			anchor = [];

		for (var i = 0; i < linksLength; i++) { 

			anchor = links[i];

			if (window.addEventListener) {

				anchor.addEventListener('click', function(event) {
					event.preventDefault();
					var url = this.getAttribute('href');
					ajax.makeRequest(url);
					pushState(url);

				}, false);
			
			} 
		}
	}


	if (window.addEventListener) {

	// Listens for navigation events like back/foward.
	// When triggered, it will make a new ajax request.
		window.addEventListener('popstate', function() {
			var url = window.location.pathname.split('/').pop();
			ajax.makeRequest(url);
		}, false);

	}

	navigationControls();


}(window, document));