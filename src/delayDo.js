;(function ($, window, undefined) {

	"use strict";

	var pluginName = "delayDo";

	var performanceNow = window.performance && (
		window.performance.now       ||
		window.performance.webkitNow ||
		window.performance.mozNow    ||
		window.performance.msNow     ||
		window.performance.oNow
	);

	var getTime = function() {
		return (performanceNow && performanceNow.call(window.performance)) || (new Date().getTime());
	};

	var requestAnimationFrame = (function () {
		return window.requestAnimationFrame       ||
		       window.webkitRequestAnimationFrame ||
		       window.mozRequestAnimationFrame    ||
		       window.msRequestAnimationFrame     ||
		       window.oRequestAnimationFrame      ||
		       function (_callback) {
		           window.setTimeout(_callback, 1000 / 60);
		       };
	})();

	var setAnimationFrameTimeout = function(_callback, _interval) {
		var elapsed   = 0;
		var time      = getTime();
		var is_paused = false;

		var update = function() {
			var now = getTime();
			elapsed += (now - time);
			time = now;

			if (elapsed >= _interval) {
				var n = Math.floor(elapsed / _interval);
				elapsed -= n * _interval;
				_callback();

				n = void 0;
			}

			if (!is_paused) {
				requestAnimationFrame(update);
			}

			now = void 0;
		};

		update();

		return {
			play: function() {
				is_paused = false;
				update();
			},
			pause: function() {
				is_paused = true;
			},
			step: function() {
				is_paused = true;
				elapsed = _interval;
				update();
			},
			toggle: function() {
				if (is_paused) {
					this.play();
				}
				else {
					this.pause();
				}
			}
		};
	};

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
				that.queueObj[options.timerId].timer = setAnimationFrameTimeout(function () {
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
					var delayTimer = setAnimationFrameTimeout(function () {
						exec();
						delayTimer.pause();
						delayTimer = void 0;
					}, options.delay);
				}
				else {
					exec();
				}

				return this;
			}
			else {
				return undefined;
			}
		},
		cancel: function (_timerId) {
			if (this.queueObj[_timerId]) {
				this.queueObj[_timerId].cancel("triggeredByCancelMethod");

				return this;
			}
			else {
				return undefined;
			}
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
			return undefined;
		}
	};

	$[pluginName].resume = function (_options) {
		if ($.data($, "plugin_" + pluginName)) {
			$.data($, "plugin_" + pluginName).resume(_options);
		}
		else {
			return undefined;
		}
	};

	$[pluginName].cancel = function (_timerId) {
		if ($.data($, "plugin_" + pluginName)) {
			$.data($, "plugin_" + pluginName).cancel(_timerId);
		}
		else {
			return undefined;
		}
	};

})(jQuery, window);
