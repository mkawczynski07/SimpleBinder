(function () {
	var utils = SimpleBinder.module('utils');

	utils.GUID = {
		get: function () {
			this.current += 1;
			return this.current.toString(16);
		},
		current: Math.random()
	};
	utils.TimeLogger = function (msg) {
		var me = this, date = new Date();
		if (typeof msg !== 'undefined') {
			console.log('[' + date + '] Start : ' + msg + '.');
		}
		me.end = function () {
			var current = new Date(), diff = current - date;
			console.log('[' + current + '] End : ' + msg + '. In: ' + diff + 'ms, ' + Math.round(diff / 1000) + 's.');
		};
	};
	utils.elements = {
		closest: function ($element, fn) {
			var $parent = $element.parentElement;
			if (typeof $parent !== 'undefined') {
				return fn.call($parent, $parent) === true ? $parent : this.closest($parent, fn);
			}
		},
		foreEach: function (selector, fn, scope) {
			var elements = document.querySelectorAll(selector), x = 0,
					length = elements.length, $element;
			for (; x < length; x += 1) {
				$element = elements[x];
				fn.call(scope || $element, $element);
			}
		}
	};

})();