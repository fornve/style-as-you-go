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

	this.getCookie = function(c_name)
	{
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name)
			{
				return unescape(y);
			}
		}
	}
	this.initiate = function()
	{
		var handle_html = $( '<div class="style-as-you-go-button">Style As You Go</div>' );
		this.editor = $( '<div class="style-as-you-go-editor"><div class="move-handle">Move</div><div class="">Pre-selector <input type="text" name="style-as-you-go-pre-selector" value="" /></div> <textarea name="style-as-you-go-css" cols="40" rows="20"></textarea> </div>' );
		this.style_element = $( "<style type=\"text/css\" id=\"style-as-you-go\">\n</style>" );

		this.editor.find( 'textarea' ).html( this.getCookie( 'style-as-you-go-style' ) );
		this.editor.find( 'input[type=text]' ).html( this.getCookie( 'style-as-you-go-selector' ) );
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
			_base.updateSelector( $( this ).val() );
		});

		this.editor.find('textarea').keyup(function(){
			_base.updateStyles( $( this ).val() );
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

	this.setCookie = function(c_name,value,exdays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}

	this.updateSelector = function( selector )
	{
		this.pre_selector = selector;
		contents = _base.parseCss( this.contents );
		$('#style-as-you-go').html( contents );
		_base.setCookie( 'style-as-you-go-selector', _base.pre_selector ,365 );
	}

	this.updateStyles = function( contents )
	{
		this.contents = contents;
		contents = _base.parseCss( this.contents );
		$('#style-as-you-go').html( contents );
		_base.setCookie( 'style-as-you-go-style', this.contents ,365 );
	}


	this.initiate();
}

$(document).ready(function(){
	var style_as_you_go = new StyleAsYouGo();
});
