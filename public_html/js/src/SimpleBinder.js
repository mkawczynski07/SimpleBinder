var SimpleBinder;
(function () {

    SimpleBinder = {
        bind: function () {
            SimpleBinder.binder.bind();
        },
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