style-as-you-go
===============

Textarea to write css which is instantly applied to page. Handy for fron-end web developers.

License:
========

MIT

http://en.wikipedia.org/wiki/MIT_License

Author:
=======

Marek Dajnowski

Installation:
=============

Put these into your header:

	<link href="/resources/css/style-as-you-go.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="/resources/js/style-as-you-go.js"></script>

Requires jquery & jquery-ui so if you don't have them included in your project add these lines above style-as-you-go.js
	
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/jquery-ui.min.js"></script>

Usage:
======

When page is loaded you will notice 'Style As You Go' button in the bottom right corener of page. Click it and you can see edit window.

Type your css there, your browser will apply it instantly.

If 'Pre-selector' field is filled, this selector will be applied before any rule you write. Example:


In editor:

	p { color: red; }
	a { color: blue; }


In 'Pre-selector' you will put .post


Your browser will get:

	.post p { color: red }
	.post a { color: blue }

IMPORTANT:
==========

Your styles are saved only in your browser cache. When you are happy with your styling, copy them into your stylesheet file ;)

