(function () {
	var SimpleBind = function ($element) {
		var me = this;
		me.callParents(this, $element);

		me.$element = $element;
		me.$scope = me.getScope();
		me.createMetaData(me.getExpression('simple-bind'));

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
		return change.name === this.metaData.finalProperty;
	};

	SimpleBind.prototype.updateElementText = function () {
		utils.elements.setElementText(this.$element, this.getModelValue());
	};

	SimpleBind.prototype.getObjectForObserve = function () {
		var me = this;
		if (me.metaData.isNested) {
			return me.$scope[me.metaData.mainObject];
		}
		return me.$scope;
	};

	SimpleBind.prototype.getModelValue = function () {
		return this.getObjectProperty(this.$scope);
	};

	SimpleBind.prototype.initElement = function () {
		this.updateElementText();
	};

	SimpleBinder.modules.binders.SimpleBind = SimpleBind;

})();