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
			$.getScript('//assets.codepen.io/assets/embed/ei.js');
		}
	});
});
