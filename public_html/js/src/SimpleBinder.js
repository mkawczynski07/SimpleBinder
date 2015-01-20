var SimpleBinder;
(function () {
    SimpleBinder = {
        customBinders: {},
        modules: {
            utils: {},
            binders: {},
            scopes: {}
        },
        module: function (moduleName) {
            var path = moduleName.split('.'), x = 0, length = path.length, module,
                    current = SimpleBinder.modules;
            for (; x < length; x += 1) {
                module = path[x];
                if (typeof current[module] === 'undefined') {
                    current[module] = {};
                }
                current = current[module];
            }
            return current;
        },
        customBind: function () {
            var name = arguments[0],
                    constructor = arguments[arguments.length - 1];
            SimpleBinder.customBinders[name] = {
                name: name,
                fn: constructor
            };
        }
    };
})();