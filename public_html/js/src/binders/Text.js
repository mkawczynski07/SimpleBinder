(function () {
    var Text = function ($scope, $element) {
        var me = this;
        me.callParents(this, $element);

        me.$element = $element;
        me.$scope = $scope;
        me.createMetaData(me.getExpression('simple-text'));

        me.scopeChangeCallback = function (changes) {
            if (utils.isDefined(changes[0]) && me.isChangeForCurrentBinder(changes[0])) {
                me.updateElementText();
            }
        };

        Object.observe(me.getObjectForObserve(), me.scopeChangeCallback);
        me.initElement();

    }, utils = SimpleBinder.modules.utils;

    utils.inherit(Text, SimpleBinder.modules.binders.Bind);

    Text.prototype.isChangeForCurrentBinder = function (change) {
        return change.name === this.metaData.finalProperty;
    };

    Text.prototype.updateElementText = function () {
        utils.elements.setElementText(this.$element, this.getModelValue());
    };

    Text.prototype.getObjectForObserve = function () {
        var me = this;
        if (me.metaData.isNested) {
            return me.$scope[me.metaData.mainObject];
        }
        return me.$scope;
    };

    Text.prototype.getModelValue = function () {
        return this.getObjectProperty(this.$scope);
    };

    Text.prototype.initElement = function () {
        this.updateElementText();
    };

    SimpleBinder.modules.binders.Text = Text;

})();