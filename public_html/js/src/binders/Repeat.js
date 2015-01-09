(function () {
	var Repeat = function ($element) {
		var me = this;

		me.$element = $element;
		me.$scope = me.getScope();
		me.metadata = me.resolveDataAndItemObjectName();
		me.data = me.getData();
		
		
		//loop


	};

	Repeat.prototype.getData = function () {
		var me = this;
		return me.$scope[me.metadata.dataName];
	};

	Repeat.prototype.resolveDataAndItemObjectName = function () {
		var me = this, splitedName = me.$element.attributes.getNamedItem('simple-repeat').split[':'];
		return{
			itemName: splitedName[1].trim(),
			dataName: splitedName[0].trim()
		};
	};

	SimpleBinder.modules.utils.inherit(Repeat, SimpleBinder.modules.binders.Bind);
	SimpleBinder.modules.binders.Repeat = Repeat;

})();