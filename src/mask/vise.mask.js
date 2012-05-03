(function( $ ) {
	$.extend( $.fn.vise.fn, {
		mask: function() {
			if ( ! this._mask ) {
				this._mask = $('<div class="vise-mask" />').appendTo( this.clamp );
				this._mask.resizers = {
					original: this.resizer
				};

				this._mask.resizers.mask = function( e, vise ) {
					vise._mask.css( 'top', vise.height );
					vise.clamp.width( vise.width );
				};
			}

			this.off( 'resize', this.resizer );
			this.resizer = this._mask.resizers.mask;
			this.on( 'resize', this.resizer );

			this._mask.show();
			this.clamp.height('100%');
			this.trigger('resize');
		},

		unmask: function() {
			if ( ! this._mask )
				return;

			this.off( 'resize', this.resizer );
			this.resizer = this._mask.resizers.original;
			this.on( 'resize', this.resizer );

			this._mask.hide();
			this.trigger('resize');
		}
	});
}( jQuery ));