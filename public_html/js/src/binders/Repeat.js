(function () {
	var Repeat = function ($element) {
		var me = this;

		me.$element = $element;
		me.$parent = me.$element.parentElement;
		me.$scope = me.getScope();
		me.metadata = me.resolveDataAndItemObjectName();
		me.data = me.getData();
		me.nodes = [];

		me.$parent.style.visibility = 'hidden';

		me.loopOverData();

		//loop

		me.$parent.style.visibility = 'visible';
	};

	Repeat.prototype.getScope = function () {
		var me = this;
		return me.$element.$binding.$scope;
	};

	Repeat.prototype.getData = function () {
		var me = this;
		return me.$scope[me.metadata.dataName];
	};

	Repeat.prototype.resolveDataAndItemObjectName = function () {
		var me = this, splitedName = me.$element.attributes.getNamedItem('simple-repeat').value.split(':');
		return{
			itemName: splitedName[0].trim(),
			dataName: splitedName[1].trim()
		};
	};

	Repeat.prototype.loopOverData = function () {
		var me = this, x = 0, length = me.data.length, $row;
		for (; x < length; x += 1) {
			if (x === 0) {
				me.$element.$binding.$scope[me.metadata.itemName] = me.data[x];
				me.nodes.push(me.$element);
			} else {
				$row = me.$element.cloneNode(true);
				$row.removeAttribute('simple-repeat');
				me.$parent.appendChild($row);
				SimpleBinder.scopeManager.createAndRegisterScopeForElement($row);
				$row.$binding.$scope[me.metadata.itemName] = me.data[x];
				me.nodes.push($row);
			}
		}
	};

	SimpleBinder.modules.utils.inherit(Repeat, SimpleBinder.modules.binders.Bind);
	SimpleBinder.modules.binders.Repeat = Repeat;

})();