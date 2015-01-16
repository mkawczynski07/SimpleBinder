(function () {
	var Bind = function () {
	};

	Bind.prototype.getScope = function () {
		var me = this;
		return me.$element.$binding.$scope;
	};

	Bind.prototype.createMetaData = function (expression) {
		var me = this,
				splited = expression.split('.');
		me.metaData = {
			splited: splited,
			finalProperty: splited[splited.length - 1],
			mainObject: splited[0],
			isNested: splited.length > 1
		};
	};

	Bind.prototype.getObjectProperty = function (object, start) {
		var me = this,
				props = me.metaData.splited,
				x = start || 0,
				length = props.length;
		for (; x < length; x += 1) {
			object = object[props[x]];
		}
		return object;
	};

	SimpleBinder.modules.binders.Bind = Bind;

})();