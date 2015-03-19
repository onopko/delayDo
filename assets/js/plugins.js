// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

// Place any jQuery/helper plugins in here.

//@codekit-append "../../_vendor/cssuseragent/cssua.js"
//@codekit-append "../../_vendor/underscore/underscore.js"
//@codekit-append "../../_vendor/rainbow/js/rainbow.js"
//@codekit-append "../../_vendor/rainbow/js/language/javascript.js"
//@codekit-append "../../_vendor/jquery.transit/jquery.transit.js"
//@codekit-append "../../_vendor/delay-do/dist/delayDo.js"

if (!$.support.transition){
	$.fn.transition = $.fn.animate;
}

/* ==================================================================
 *
 * !Window Open
 *
 * ------------------------------------------------------------------ */

function openLinkPopup(wUrl, wTitle, _wWidth, _wHeight) {
	var wObj;

	if (_wWidth) {
		wWidth = _wWidth;
	} else {
		wWidth = 650;
	}

	if (_wHeight) {
		wHeight = _wHeight;
	} else {
		wHeight = 600;
	}

	scWidthCenter = screen.availWidth / 2;
	scHeightCenter = screen.availHeight / 2;
	wOption = [
		"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=", wWidth,
		",height=", wHeight,
		",left=", (scWidthCenter - (wWidth / 2)),
		",top=", (scHeightCenter - (wHeight / 2))
	].join('');

	wObj = window.open(wUrl, wTitle ,wOption);
	wObj.focus();
}
