# ajax-testing
======
Ajax pages that degrade nicely when javascript is disabled and work well with the back/foward buttons.

## about this repo
------
I wanted to teach myself some more ajax techniques without relying on the jQuery library so I created this.  Basically, it creates a single page application that requests pages from inside a template folder that will still work with javascript disabled and will still be indexed by google because it does not rely on the '#' in the url.  

## How it works
------
The javascript looks into your markup for two div IDs.  One is known as 'content' by default, and the other is 'nav' by default.  These both must be IDs and not classes.  You may change their values in the options located in the js/javascript.js file at the top (more below).

The 'navigation' container div will attach an event to all 'a' tag children it finds.  Each 'href' value has to match a file found inside the template folder (excluding the filetype after the dot).  The filetype is set inside the options object (see below).

The 'content' container div uses innerHTML to replace the data that is recived by the XMLHttpRequest object.

I used php to make a simple example of how to use this file.  To check it out, run the following command in the root directory of your choosing!

>git clone https://github.com/typicalmike002/ajax-testing.git

## options object
------
Found in the js/javascript.js file at the top.  Set these values to fit your needs. 

```javascript
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
```
homePage: Page to default to when '/' is in the Address bar.  This is particularly important when pressing the back button and the previous page was the index.

folder:  Location for ajax to pull tepmlates from.

fileType: Used to look up files inside the templates folder by the XMLHttpRequest object.  

method: Simply the method used by http.

contentType: Just the content type used by the XMLHttpRequest Object.

isAsync: Determins whether you want the ajax call to be async.

containers:  This one is importent and makes this whole thing work.  The content needs to be the name of the div you wish to place the content of the templates after they are requested.  Its where everything goes.  The navigation is the name of the div that contains your links to be used by the controller function.  It will add an event to them and create new ajax requests when they are clicked on.  