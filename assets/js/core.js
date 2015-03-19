$(function () {
	var is_cssanimations = false;
	if ($('html').hasClass('cssanimations')) {
		is_cssanimations = true;
	}

	$('.c-title--site span').each(function () {
		var $target = $(this);
		$.delayDo('animation', function () {
			if (is_cssanimations) {
				$target.addClass('animated bounceIn');
			}
			else {
				$target
					.transition({ opacity: 1 }, { duration: 500 });
			}
		});
	});

	$.delayDo('animation', function () {
		if (is_cssanimations) {
			$('.p-header--site p')
				.css({ opacity: 1 })
				.addClass('animated tada');
		}
		else {
			$('.p-header--site p')
				.transition({ opacity: 1 }, { duration: 1000 });
		}
	});

	$.delayDo.resume({
		timerId: 'animation',
		interval: 150,
		delay: 1000,
		complete: function () {
			complete();
		}
	});

	var complete = function () {
		$.getScript('//assets.codepen.io/assets/embed/ei.js');

		var output = [
			"<script>",
				"(function(d, s, id){",
					"var js, fjs = d.getElementsByTagName(s)[0];",
					"if (d.getElementById(id)) {return;}",
					"js = d.createElement(s); js.id = id;",
					"js.src = '//connect.facebook.net/ja_JP/sdk.js';",
					"js.async = true;",
					"fjs.parentNode.insertBefore(js, fjs);",
				"}(document, 'script', 'facebook-jssdk'));",
				"window.twttr = (function(d, s, id) {",
					"var t, js, fjs = d.getElementsByTagName(s)[0];",
					"if (d.getElementById(id)) return;",
					"js = d.createElement(s);",
					"js.id = id;",
					"js.src = 'https://platform.twitter.com/widgets.js';",
					"fjs.parentNode.insertBefore(js, fjs);",
					"return window.twttr || (t = {",
						"_e: [],",
						"ready: function(f) {",
							"t._e.push(f)",
						"}",
					"})",
				"}(document, 'script', 'twitter-wjs'));",
				"twttr.ready(function(twttr) {",
					"twttr.events.bind('click', function(e) {",
						"ga('send', 'social', 'twitter', 'click', window.location.href);",
					"});",
					"twttr.events.bind('tweet', function(e) {",
						"ga('send', 'social', 'twitter', 'tweet', window.location.href);",
					"});",
				"});",
			"</script>"
		].join('');

		$('body').append(output);
	};
});
