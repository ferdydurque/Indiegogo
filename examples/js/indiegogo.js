/*!
 * based on jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */
 
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
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'indieGoGo',
        defaults = {
            trace: false
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        
		data : {},

        init: function() {
			if ( this.options.name ){
				this.data.name = this.options.name;
				this.loadData( this.options.name );
			}
        }, 
		// load indiegogo project home page via ajax
        loadData: function( projectname) {
			$.ajax({
			  url: 'http://www.indiegogo.com/' + projectname,
			  context: this,
			  success: function(data) {
				this.parseData( $(data).find( 'aside.fr' ) );
			  }
			});
        },
		// parse the data with jquery
		parseData: function( $aside ){
			var self = this;
			// goal
			var $pfunding = $aside.find( 'section.funding p' );
			$pfunding.each( function(i,el){
				if ( $(el).hasClass( 'progress' ) ){
					// 0.1588 Complete
					// Percentage of money raised/goal
					self.data.percentage = self.stripNumber( $(el).html() );
				}
				else if ( $(el).hasClass( 'money-raised' ) ){
					if ( $(el).hasClass( 'goal' ) ){
						//  Raised of $45,000 Goal
						// total goal
						self.data.goal = self.stripNumber( $(el).html() );
					}
					else{
						// $7,146
						// money raised
						self.data.raised = self.stripNumber( $(el).find( 'span.amount' ).html() );
					}
				}
				else if ( $(el).hasClass( 'days-left' ) ){
					// 30
					// days left for the money raising
					self.data.days_left = self.stripNumber( $(el).find( 'span.amount' ).html() );
				}
			} );
			// Perks (Backers)
			var $perks = $aside.find( 'section.perks ul li.perk' );
			var nperks = 0;
			$perks.each( function(i,el){
				// 9 claimed or 36 out of 200 claimed
				// sum of all claimed
				nperks += parseInt( self.stripNumber( $(el).find( 'p.claimed' ).html() ) );
			} );
			this.data.perks = nperks;			
			if ( this.options.trace ) self.traceData();		
			if ( this.options.onComplete ) this.options.onComplete( this.data );		
		},
		
		stripNumber: function( str ){
			var n = str.match(/\d+\,\d+/);
			if ( n ){
				//console.log( 'comma :: ' + n[0] )
			}
			else{
				n = str.match(/\d+\.\d+/);
				if ( n ){
					//console.log( 'point :: ' + n[0] )
				}
				else{
					n = str.match(/\d+/g);
					if ( n ){
						//console.log( 'integer :: ' + n[0] )
					}
				}
			}
			return n[0];
		}, 
		
		traceData: function(){
			var str = '';
			for ( var i in this.data ){
				str += '>>>> ' + i + ' = ' + this.data[i] + '\n';	
			}
			console.log( str );
		}
		
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            };
        });
    };

})( jQuery, window, document );