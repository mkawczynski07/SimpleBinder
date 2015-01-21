(function () {
    var Bind = function () {
    }, utils = SimpleBinder.modules.utils;

    Bind.prototype.getScope = function () {
        var me = this;
        return me.$element.$binding.$scope;
    };

    Bind.prototype.createMetaData = function (expression) {
        var me = this,
                trimed = utils.string.trimWhiteSpaces(expression),
                splited = trimed.split('.');
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

    Bind.prototype.getExpression = function (attributeName) {
        return utils.elements.attr(this.$element, attributeName);
    };

    SimpleBinder.modules.binders.Bind = Bind;

})();