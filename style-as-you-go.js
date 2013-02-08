/*
 * @package Style As You go
 * @author Marek Dajnowski
 * @license MIT http://en.wikipedia.org/wiki/MIT_License
 * @documentation https://github.com/fornve/style-as-you-go
 */

var StyleAsYouGo = function()
{
	this.contents = '';
	this.pre_selector = '';
	var _base = this;

	this.initiate = function()
	{
		var handle_html = $( '<div class="style-as-you-go-button">Style As You go</div>' );
		this.editor = $( '<div class="style-as-you-go-editor"><div class="move-handle">Move</div><div class="">Pre-selector <input type="text" name="style-as-you-go-pre-selector" value="" /></div> <textarea name="style-as-you-go-css" cols="40" rows="20"></textarea> </div>' );
		this.style_element = $( "<style type=\"text/css\" id=\"style-as-you-go\">\n</style>" );

		$( 'body' ).append( handle_html );
		$( 'body' ).append( this.editor );
		$( 'head' ).append( this.style_element );

		$( this.editor ).draggable({
			handle: '.move-handle'
		});

		$( handle_html ).click(function(){
			$( _base.editor ).toggle();
		});

		this.editor.find('input[type=text]').change(function(){
			_base.pre_selector = $( this ).val();
			contents = _base.parseCss( this.contents );
			$('#style-as-you-go').html( contents );
		});

		this.editor.find('textarea').keyup(function(){
			this.contents = $( this ).val();
			contents = _base.parseCss( this.contents );
			$('#style-as-you-go').html( contents );
		});
	}

	this.parseCss = function( contents )
	{
		if( !contents )
		{
			return;
		}

		var elements = [];
		var new_css = '';
		var declarations = contents.split( '}' );

		for( i in declarations )
		{
			if( declarations[ i ].length > 0 && typeof( declarations[ i ] ) == 'string' )
			{
				var line = declarations[ i ];
				var declaration = line.split( '{' );

				if( declaration[ 0 ].length > 0 && typeof( declaration[ 0 ] ) == 'string' )
				{
					var elements = declaration[ 0 ].split( ',' );

					var new_elements = [];

					for( e in elements )
					{
						if( elements[ e ].length > 0 && typeof( elements[ e ] ) == 'string' )
						{
							var pre_selector = _base.pre_selector.length > 0 ? _base.pre_selector +' ' : '';
							new_elements.push(  pre_selector + $.trim( elements[ e ] ) );
						}
					}

					if( new_elements.length > 0 )
					{
						new_css += "\n"+ new_elements.join( ', ' ) + " {\n"+ $.trim( declaration[ 1 ] ) + "\n }";
					}
				}
			}

		}

		return new_css;
	}

	this.initiate();
}

$(document).ready(function(){
	var style_as_you_go = new StyleAsYouGo();
});
