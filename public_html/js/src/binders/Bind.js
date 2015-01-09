(function () {
	var Bind = function () {
	};

	Bind.prototype.getScope = function () {
		var me = this;
		return me.$element.$binding.$scope;
	};

	SimpleBinder.modules.binders.Bind = Bind;

})();