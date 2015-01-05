(function () {
	var SimpleBind = function ($element) {
		var me = this;

		me.$element = $element;
		me.$scope = me.getScopeForObserve();
		me.modelName = me.getModelName();

		me.scopeChangeCallback = function (changes) {
			var x = 0, length = changes.length, change;
			for (; x < length; x += 1) {
				change = changes[x];
				if (change.name === me.modelName) {
					me.$element.innerHTML = change.object[me.modelName];
				}
			}
		};

		Object.observe(me.$scope, me.scopeChangeCallback);
		me.initElement();

	}, binders = SimpleBinder.module('binders');

	SimpleBind.prototype.getScopeForObserve = function () {
		var me = this;
		return me.$element.$binding.$scope;
	};


	SimpleBind.prototype.getModelName = function () {
		var me = this;
		return me.$element.getAttribute('simple-bind');
	};

	SimpleBind.prototype.initElement = function () {
		var me = this;
		me.$element.innerHTML = me.$scope[me.modelName];
	};

	binders.SimpleBind = SimpleBind;

})();