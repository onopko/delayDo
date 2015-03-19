$(function () {
	$('.c-title--site span').each(function () {
		var $target = $(this);
		$.delayDo('animation', function () {
			$target.addClass('animated bounceIn');
		});
	});

	$.delayDo('animation', function () {
		$('.p-header--site p')
			.addClass('animated fadeInUp');
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
