(function () {
	var SimpleBind = function ($element) {
		var me = this;
		me.callParents(this, $element);

		me.$element = $element;
		me.$scope = me.getScope();
		me.createMetaData(me.getExpression());

		me.scopeChangeCallback = function (changes) {
			if (utils.isDefined(changes[0]) && me.isChangeForCurrentBinder(changes[0])) {
				me.updateElementText();
			}
		};

		Object.observe(me.getObjectForObserve(), me.scopeChangeCallback);
		me.initElement();

	}, utils = SimpleBinder.modules.utils;

	utils.inherit(SimpleBind, SimpleBinder.modules.binders.Bind);

	SimpleBind.prototype.isChangeForCurrentBinder = function (change) {
		var me = this;
		return change.name === me.metaData.finalProperty;
	};

	SimpleBind.prototype.updateElementText = function () {
		var me = this;
		utils.elements.setElementText(me.$element, me.getModelValue());
	};

	SimpleBind.prototype.getObjectForObserve = function () {
		var me = this;
		if (me.metaData.isNested) {
			return me.$scope[me.metaData.mainObject];
		}
		return me.$scope;
	};

	SimpleBind.prototype.getModelValue = function () {
		var me = this;
		return me.getObjectProperty(me.$scope);
	};

	SimpleBind.prototype.getExpression = function () {
		var me = this;
		return me.$element.getAttribute('simple-bind');
	};

	SimpleBind.prototype.initElement = function () {
		var me = this;
		me.updateElementText();
	};

	SimpleBinder.modules.binders.SimpleBind = SimpleBind;

})();