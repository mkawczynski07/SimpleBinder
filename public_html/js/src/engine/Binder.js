(function () {

    var Binder = function () {
        var me = this, scopeManager,
                utils = SimpleBinder.modules.utils;

        me.const = {
            REPEAT: 'simple-repeat',
            TEXT: 'simple-text',
            CONTROLLER: 'simple-controller'
        };
        me.const.REPEAT_SELECTOR = '[' + me.const.REPEAT + ']';
        me.const.TEXT_SELECTOR = '[' + me.const.TEXT + ']';
        me.const.CONTROLLER_SELECTOR = '[' + me.const.CONTROLLER + ']';
        me.binders = [];
        me.controllers = {};


        me.bind = function () {
            me.buildScopes();
            me.createControllers();
            me.createRepeats();
            me.createTexts();
            me.createCustoms();
        };

        me.buildScopes = function () {
            scopeManager = new SimpleBinder.modules.scopes.ScopeManager();
            SimpleBinder.scopeManager = scopeManager;
            scopeManager.build();
        };

        me.createControllers = function () {
            scopeManager.createScopesForSelector(me.const.CONTROLLER_SELECTOR, function ($scope, $element) {
                var ctrlPath = utils.elements.attr($element, me.const.CONTROLLER),
                        splited = ctrlPath.split('.'),
                        module = splited[0],
                        ctrlName = splited[1],
                        ctrl = SimpleBinder.modules.app[module].controllers[ctrlName];
                me.controllers[ctrlPath] = new ctrl.fn($scope, $element);
            });
        };

        me.createRepeats = function () {
            me.createBind(me.const.REPEAT_SELECTOR, SimpleBinder.modules.binders.Repeat);
        };

        me.createTexts = function () {
            me.createBind(me.const.TEXT_SELECTOR, SimpleBinder.modules.binders.Text);
        };

        me.createCustoms = function () {
            var moduleName, module, customName, custom;
            for (moduleName in SimpleBinder.modules.app) {
                module = SimpleBinder.modules.app[moduleName];
                for (var customName in module.customs) {
                    var custom = module.customs[customName];
                    me.createBind('[' + custom.name + ']', custom.fn);
                }
            }
        };

        me.createBind = function (selector, $class) {
            scopeManager.setElementScopes(selector, function ($scope, $element) {
                me.binders.push(new $class($scope, $element));
            });
        };

    };

    SimpleBinder.binder = new Binder();
})();