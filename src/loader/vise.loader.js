jQuery(document).on( 'vise.init', function( e, vise ) {
	vise.loader = jQuery('<div class="vise-loader" />').appendTo( vise.clamp );
});