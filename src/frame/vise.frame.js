(function( $ ) {
	$.extend( $.fn.vise.fn, {
		frame: function() {
			if ( ! this._frame ) {
				this._frame = $('<div class="vise-frame" />').appendTo( this.clamp );
				this._frame.update = function() {

				};
			}

			this._frame.show();
			this.on( 'resize', this._frame.update );
			this.trigger('resize');
		},

		unframe: function() {
			if ( ! this._frame )
				return;

			this._frame.hide();
			this.off( 'resize', this._frame.update );
		}
	});
}( jQuery ));