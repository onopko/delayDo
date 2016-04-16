/*
 *  delayDo - v1.1.0
 *  delayDo is a tiny jQuery plugin. It enables you to  create a specific timer which contains some functions as a queue and can resume it later.
 *  http://onopko.github.io/delayDo/
 *
 *  Made by Takehiko Ono
 *  Under MIT License
 */
;(function ($) {
	"use strict";

	var pluginName = "delayDo";

	function Plugin (_timerId, _func) {
		this.queueObj = {};
		this.init(_timerId, _func);
	}

	$.extend(Plugin.prototype, {
		init: function (_timerId, _func) {
			this.push(_timerId, _func);
		},
		push: function (_timerId, _func) {
			var that = this;

			if (!that.queueObj[_timerId]) {
				that.queueObj[_timerId] = {
					queue: [],
					timer: null,
					cancel: function () {
						if (that.queueObj[_timerId].timer) {
							$.clearAnimationFrameTimeout(that.queueObj[_timerId].timer);
						}
						that.queueObj[_timerId].timer = null;
						that.queueObj[_timerId].queue.length = 0;
						that.queueObj[_timerId] = null;
					}
				};
			}

			that.queueObj[_timerId].queue.push(_func);
		},
		resume: function (_options) {
			var options = $.extend({
				timerId  : null,
				interval : 100,
				delay    : 0,
				complete : null
			}, _options);

			var that = this;

			var loop = function () {
				var queue_func = that.queueObj[options.timerId].queue.shift();
				if (queue_func) {
					queue_func();
					that.queueObj[options.timerId].timer = $.setAnimationFrameTimeout(loop, options.interval);
				}
				else {
					that.queueObj[options.timerId].cancel();

					if (typeof options.complete === "function") {
						options.complete();
					}
				}

				queue_func = void 0;
			};

			if (that.queueObj[options.timerId]) {
				if (options.delay > 0) {
					$.setAnimationFrameTimeout(loop, options.delay);
				}
				else {
					loop();
				}
			}
			else {
				return false;
			}
		},
		cancel: function (_timerId) {
			if (this.queueObj[_timerId]) {
				this.queueObj[_timerId].cancel();

				return this;
			}
			else {
				return false;
			}
		},
		bustercall: function () {
			$.each(this.queueObj, function () {
				this.cancel();
			});
		}
	});

	$[pluginName] = function(_timerId, _func) {
		if (typeof _timerId === "string" && typeof _func === "function") {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(_timerId, _func));
			}
			else {
				$.data(this, "plugin_" + pluginName).push(_timerId, _func);
			}

			return this;
		}
		else {
			return false;
		}
	};

	$[pluginName].resume = function (_options) {
		if ($.data($, "plugin_" + pluginName)) {
			$.data($, "plugin_" + pluginName).resume(_options);
		}
		else {
			return false;
		}
	};

	$[pluginName].cancel = function (_timerId) {
		if ($.data($, "plugin_" + pluginName)) {
			$.data($, "plugin_" + pluginName).cancel(_timerId);
		}
		else {
			return false;
		}
	};

	$[pluginName].bustercall = function () {
		if ($.data($, "plugin_" + pluginName)) {
			$.data($, "plugin_" + pluginName).bustercall();
		}
		else {
			return false;
		}
	};

})(jQuery);
