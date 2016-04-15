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
					cancel: function (_mode) {
						if (_mode !== undefined && _mode === "triggeredByCancelMethod") {
							if (that.queueObj[_timerId].timer) {
								that.queueObj[_timerId].timer.pause();
							}
							that.queueObj[_timerId].timer = null;
							that.queueObj[_timerId].queue = [];
							that.queueObj[_timerId] = null;
						}
						else if (that.queueObj[_timerId].timer) {
							that.queueObj[_timerId].timer.pause();
							that.queueObj[_timerId].timer = null;
							that.queueObj[_timerId] = null;
						}
					}
				};
			}

			that.queueObj[_timerId].queue.push(_func);
		},
		resume: function (_options) {
			var options = $.extend({
				timerId  : null,
				interval : 100,
				delay    : null,
				complete : null
			}, _options);

			var that = this;

			var exec = function () {
				that.queueObj[options.timerId].cancel();
				that.queueObj[options.timerId].timer = $.setAnimationFrameTimeout(function () {
					var queue_func = that.queueObj[options.timerId].queue.shift();
					if (queue_func) {
						queue_func();
					}
					else {
						that.queueObj[options.timerId].cancel();
						if (typeof options.complete === "function") {
							options.complete();
						}
					}
					queue_func = void 0;
				}, options.interval);
			};

			if (that.queueObj[options.timerId]) {
				if (options.delay !== null && typeof options.delay === "number") {
					var resumeDelayTimer = $.setAnimationFrameTimeout(function () {
						exec();
						$.clearAnimationFrameTimeout(resumeDelayTimer);
						resumeDelayTimer = void 0;

						return this;
					}, options.delay);
				}
				else {
					exec();

					return this;
				}
			}
			else {
				return false;
			}
		},
		cancel: function (_timerId) {
			if (this.queueObj[_timerId]) {
				this.queueObj[_timerId].cancel("triggeredByCancelMethod");

				return this;
			}
			else {
				return false;
			}
		},
		bustercall: function () {
			$.each(this.queueObj, function () {
				this.cancel("triggeredByCancelMethod");
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
