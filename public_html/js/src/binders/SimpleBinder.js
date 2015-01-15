(function () {
	var SimpleBind = function ($element) {
		var me = this;
		me.callParents(this, $element);

		me.$element = $element;
		me.$scope = me.getScope();
		me.modelName = me.getModelName();

		me.scopeChangeCallback = function (changes) {
			if (utils.isDefined(changes[0])
					&& me.createModelname(changes[0].name) === me.modelName) {
				me.updateElementText();
			}
		};

		Object.observe(me.getObjectForObserve(), me.scopeChangeCallback);
		me.initElement();

	}, utils = SimpleBinder.modules.utils;

	utils.inherit(SimpleBind, SimpleBinder.modules.binders.Bind);

	SimpleBind.prototype.updateElementText = function () {
		var me = this;
		utils.elements.setElementText(me.$element, me.getModelValue(me.$scope));
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

	SimpleBind.prototype.getModelName = function () {
		var me = this;
		return me.$element.getAttribute('simple-bind');
	};

	SimpleBind.prototype.initElement = function () {
		var me = this;
		me.updateElementText();
	};

	SimpleBinder.modules.binders.SimpleBind = SimpleBind;

})();