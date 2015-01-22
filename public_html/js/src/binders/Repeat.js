(function () {
    var Repeat = function ($scope, $element) {
        var me = this;
        me.init($element, $scope);
        me.hide();
        me.loop();
        me.show();

        Array.observe(me.$element.$binding.$scope[this.metaData.finalProperty], function (changes) {
            me.loop();
        });
    }, utils = SimpleBinder.modules.utils;

    utils.inherit(Repeat, SimpleBinder.modules.binders.Bind);

    Repeat.prototype.init = function ($element, $scope) {
        var me = this;
        me.$element = $element;
        me.$scope = $scope;
        me.$parent = me.$element.parentElement;
        me.createRepeatMetaData();
        me.data = me.getData();
        me.nodes = [me.$element];
    };

    Repeat.prototype.loop = function () {
        var me = this, x = 1, length = me.data.length, $row;
        me.setElementBindingRow(me.$element, 0);
        for (; x < length; x += 1) {
            $row = me.getNode(x);
            me.setElementBindingRow($row, x);
        }
        me.hideOthers(x);
    };

    Repeat.prototype.setElementBindingRow = function ($element, index) {
        $element.$binding.$scope[this.metaData.rowItemName] = this.data[index];
    };

    Repeat.prototype.hideOthers = function (index) {
        var me = this, x = index, length = me.nodes.length;
        for (; x < length; x += 1) {
            me.nodes[x].style.display = 'none';
        }
    };

    Repeat.prototype.getNode = function (index) {
        var me = this,
                $node = me.nodes[index];
        if (utils.isDefined($node)) {
            delete $node.style.display;
            return $node;
        }
        $node = me.$element.cloneNode(true);
        $node.removeAttribute('simple-repeat');
        me.$parent.appendChild($node);
        SimpleBinder.scopeManager.createAndRegisterScopeForElement($node);
        me.nodes.push($node);
        return $node;
    };

    Repeat.prototype.getData = function () {
        return this.$scope[this.metaData.finalProperty];
    };

    Repeat.prototype.createRepeatMetaData = function () {
        var me = this,
                expression = me.getExpression('simple-repeat'),
                splited = expression.split(':');
        me.createMetaData(splited[1]);
        me.metaData.rowItemName = splited[0].trim();
    };

    Repeat.prototype.hide = function () {
        this.$parent.style.visibility = 'hidden';
    };

    Repeat.prototype.show = function () {
        this.$parent.style.visibility = 'visible';
    };

    SimpleBinder.modules.binders.Repeat = Repeat;

})();