var SimpleBinder;
(function () {
	SimpleBinder = {
		modules: {},
		module: function (moduleName) {
			var path = moduleName.split('.'), x = 0, length = path.length, module,
					current = SimpleBinder.modules;
			for (; x < length; x += 1) {
				module = path[x];
				if (typeof current[module] === 'undefined') {
					current[module] = {};
				}
				current = current[module];
			}
			return current;
		}
	};
})();