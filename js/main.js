

$(document).ready(function(e) {
	//loadDataIndiegogo( 'TaskOne' );   
	
	$('body').indieGoGo( { name: 'bestie', trace: true, onComplete: function( data ){
		
		console.log( 'onComplete' );
		
		result = '';
		for ( var i in data ){
			result += '>>> ' + i + ' = ' + data[i] + '<br/>';
		}
		$( '#content' ).append( result );
	} } );
	
	

});



/*** INDIEGOGO *****************************************************/
/*
function loadDataIndiegogo( projectname ){
	$.ajax({
	  url: 'http://www.indiegogo.com/' + projectname,
	  success: function(data) {
		parseDataIndiegogo( $(data).find( 'aside.fr' ) );
	  }
	});
}
function parseDataIndiegogo( $aside ){
	var data = {};
	// goal
	var $pfunding = $aside.find( 'section.funding p' );
	$pfunding.each( function(i,el){
		if ( $(el).hasClass( 'progress' ) ){
			// 0.1588 Complete
			//console.log( $(el).html() );
			//stripNumber( $(el).html() )
			data.percentage = stripNumber( $(el).html() );
		}
		else if ( $(el).hasClass( 'money-raised' ) ){
			if ( $(el).hasClass( 'goal' ) ){
				//  Raised of $45,000 Goal
				//console.log( $(el).html() )
				data.goal = stripNumber( $(el).html() );
			}
			else{
				// $7,146
				//console.log( $(el).find( 'span.amount' ).html() )
				//stripNumber( $(el).find( 'span.amount' ).html() )
				data.raised = stripNumber( $(el).find( 'span.amount' ).html() );
			}
		}
		else if ( $(el).hasClass( 'days-left' ) ){
			// 30
			//console.log( $(el).find( 'span.amount' ).html() )
			data.days_left = stripNumber( $(el).find( 'span.amount' ).html() )
		}
	} );
	// Perks (Backers)
	var $perks = $aside.find( 'section.perks ul li.perk' );
	var nperks = 0;
	$perks.each( function(i,el){
		// 9 claimed or 36 out of 200 claimed
		//console.log( $(el).find( 'p.claimed' ).html() )	// It has to be the sum of all claimed
		//stripNumber( $(el).find( 'p.claimed' ).html() )
		nperks += parseInt( stripNumber( $(el).find( 'p.claimed' ).html() ) );
	} );
	data.perks = nperks;	
	paintDataIndiegogo( data )
}
function stripNumber( str ){
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
}
function paintDataIndiegogo( data ){
	var str = '';
	for ( var i in data ){
		str += '>>>> ' + i + ' = ' + data[i] + '\n';	
	}
	console.log( str )
}
*/
/*** INDIEGOGO *****************************************************/
