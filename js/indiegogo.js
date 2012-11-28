/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */
// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'indieGoGo',
        defaults = {
            trace: false
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        
		data : {},

        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and 
            // call them like so: this.yourOtherFunction(this.element, this.options).
			if ( this.options.name ){
				this.data.name = this.options.name;
				this.loadData( this.options.name );
			}
        }, 
		
        loadData: function( projectname) {
			$.ajax({
			  url: 'http://www.indiegogo.com/' + projectname,
			  context: this,
			  success: function(data) {
				this.parseData( $(data).find( 'aside.fr' ) );
			  }
			});
        },
		
		parseData: function( $aside ){
			var self = this;
			// goal
			var $pfunding = $aside.find( 'section.funding p' );
			$pfunding.each( function(i,el){
				if ( $(el).hasClass( 'progress' ) ){
					// 0.1588 Complete
					//console.log( $(el).html() );
					//stripNumber( $(el).html() )
					self.data.percentage = self.stripNumber( $(el).html() );
				}
				else if ( $(el).hasClass( 'money-raised' ) ){
					if ( $(el).hasClass( 'goal' ) ){
						//  Raised of $45,000 Goal
						//console.log( $(el).html() )
						self.data.goal = self.stripNumber( $(el).html() );
					}
					else{
						// $7,146
						//console.log( $(el).find( 'span.amount' ).html() )
						//stripNumber( $(el).find( 'span.amount' ).html() )
						self.data.raised = self.stripNumber( $(el).find( 'span.amount' ).html() );
					}
				}
				else if ( $(el).hasClass( 'days-left' ) ){
					// 30
					//console.log( $(el).find( 'span.amount' ).html() )
					self.data.days_left = self.stripNumber( $(el).find( 'span.amount' ).html() );
				}
			} );
			// Perks (Backers)
			var $perks = $aside.find( 'section.perks ul li.perk' );
			var nperks = 0;
			$perks.each( function(i,el){
				// 9 claimed or 36 out of 200 claimed
				//console.log( $(el).find( 'p.claimed' ).html() )	// It has to be the sum of all claimed
				//stripNumber( $(el).find( 'p.claimed' ).html() )
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