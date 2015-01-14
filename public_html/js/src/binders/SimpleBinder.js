(function () {
	var SimpleBind = function ($element) {
		var me = this;

		me.$element = $element;
		me.$scope = me.getScope();
		me.modelName = me.getModelName();

		me.scopeChangeCallback = function (changes) {
			var x = 0, length = changes.length, change;
			for (; x < length; x += 1) {
				change = changes[x];
				if (me.createModelname(change.name) === me.modelName) {
					me.$element.innerHTML = me.getModelValue(change.object);
				}
			}
		};

		Object.observe(me.getObjectForObserve(), me.scopeChangeCallback);
		me.initElement();

	};

	SimpleBind.prototype.createModelname = function (name) {
		var me = this;
		if (me.modelName.indexOf('.') !== -1) {
			return me.modelName.split('.')[0] + '.' + name;
		}
		return name;
	};

	SimpleBind.prototype.getObjectForObserve = function () {
		var me = this;
		if (me.modelName.indexOf('.') !== -1) {
			return me.$scope[me.modelName.split('.')[0]];
		}
		return me.$scope;
	};

	SimpleBind.prototype.getModelValue = function (model) {
		var me = this, splitedName;
		if (me.modelName.indexOf('.') !== -1) {
			splitedName = me.modelName.split('.');
			if (typeof model['$id'] !== 'undefined') {
				return model[splitedName[0]][splitedName[1]];
			}
			return model[splitedName[1]];
		}
		return model[me.modelName];
	};

	SimpleBind.prototype.getScope = function () {
		var me = this;
		return me.$element.$binding.$scope;
	};


	SimpleBind.prototype.getModelName = function () {
		var me = this;
		return me.$element.getAttribute('simple-bind');
	};

	SimpleBind.prototype.initElement = function () {
		var me = this;
		me.$element.innerHTML = me.getModelValue(me.$scope);
	};

	SimpleBinder.modules.utils.inherit(SimpleBind, SimpleBinder.modules.binders.Bind);
	SimpleBinder.modules.binders.SimpleBind = SimpleBind;

})();