 /**
 * headjs is the stylesheet and javascript loader
 * all javascript files are loaded and dependencies are set here
 */

// load main styles
head.load("css/style.min.css");

// load all libs
head.js( { libs:"./js/libs.min.js" });

// setup our app
if(App == null || App == undefined) {
		var App = window.App = {};
};

/**
* once the libs are loaded move forward with loading js files
* bootstrap is dependent upon jquery
*/
head.ready("libs", function() {
  // load the app
  head.load({ bootstrap: "http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"});
});

/**
* hold off on loading any application js until the bootstrap is loaded
*/
head.ready("bootstrap", function() {
  // load the app
 head.js({ app: "./js/app.min.js" });

});