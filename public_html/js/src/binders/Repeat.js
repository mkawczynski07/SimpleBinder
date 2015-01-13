(function () {
	var Repeat = function ($element) {
		var me = this;

		me.$element = $element;
		me.$parent =
				me.$scope = me.getScope();
		me.metadata = me.resolveDataAndItemObjectName();
		me.data = me.getData();

		me.$element.parentElement.style.visibility = 'hidden';

		me.loopOverData();

		//loop

		me.$element.parentElement.style.visibility = 'visible';
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

	Repeat.prototype.loopOverData = function () {
		var me = this, x = 1, length = me.data.length, row;
		console.log(me.data);
		for (; x < length; x += 1) {
			row = me.$element.cloneNode(true);
			me.parentElement.appendChild(row);
		}
	};

	SimpleBinder.modules.utils.inherit(Repeat, SimpleBinder.modules.binders.Bind);
	SimpleBinder.modules.binders.Repeat = Repeat;

})();