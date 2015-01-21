var SimpleBinder;
(function () {

    SimpleBinder = {
        modules: {
            utils: {},
            binders: {},
            scopes: {},
            app: {}
        },
        module: function (moduleName) {
            return SimpleBinder.moduleManager.get(moduleName);
        },
        emptyFn: function () {
        }
    };
})();