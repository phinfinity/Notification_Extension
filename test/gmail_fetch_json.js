function getdata(){
	var scripts = document.getElementsByTagName( 'script' ),
	    thisScript, varViewDataPos, viewDataScript, viewData
		    ;
	for( var i = 0; i < scripts.length; i++ ) {
		thisScript = scripts[ i ].textContent;
		varViewDataPos = thisScript.indexOf( 'var VIEW_DATA=' );

		if( varViewDataPos >= 0 ) {
			// might as well toss everything before VIEW_DATA is defined
			viewDataScript = thisScript.slice( varViewDataPos );
			return viewDataScript;
		}
	}
}
