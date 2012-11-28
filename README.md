Indiegogo 

Indiegogo is a jQuery plugin to parse the data from the home page of an Indiegogo project.

/* USAGE

// - name:String :: Name of the Indiegogo Project (url segment)
// - trace:Boolean :: Log the output in the console
// - onComplete:Function :: return function
// - return values of object data : data.name, data.percentage, data.goal, data.raised, data.days_left, data.perks
									
$(document).ready(function(e) {
	
	$('body').indieGoGo( { name: 'bestie', trace: false, onComplete: function( data ){
		result = '';
		for ( var i in data ){
			result += '>>> ' + i + ' = ' + data[i] + '<br/>';
		}
		console.log( result )
	} } );

});
*/


Examples: An example usage page build on popular html5 boilerplate.
