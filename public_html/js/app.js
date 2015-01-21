(function () {
    ctrls = [];
    SimpleBinder.module('test').controller('pierwszy', [function ($scope) {
            $scope.id = 1;
            $scope.value = 'dadsadsa';
            this.$scope = $scope;
            ctrls.push(this);
        }
    ]);

    SimpleBinder.module('test').controller('drugi', [function ($scope) {
            this.$scope = $scope;
            $scope.rows = [];
            for (var i = 0; i < 20; i += 1) {
                $scope.rows.push({
                    id: i,
                    name: 'test item : ' + i
                });
            }
            ctrls.push(this);
        }
    ]);

    SimpleBinder.module('test').custom('stooltip', [function ($scope, $element) {
            $($element).tooltip({
                title: $scope.$id,
                placement: 'right'
            });
        }
    ]);

    /* scope building */
    var scopeManager = new SimpleBinder.modules.scopes.ScopeManager();
    SimpleBinder.scopeManager = scopeManager;
    scopeManager.build();
    /* scope building end */

    scopeManager.createScopesForSelector('[controller]', function ($scope, $element) {
        var utils = SimpleBinder.modules.utils,
                splited = utils.elements.attr($element, 'controller').split('.'),
                module = splited[0],
                ctrlName = splited[1],
                ctrl = SimpleBinder.modules.app[module].controllers[ctrlName];
        new ctrl.fn($scope, $element);
    });

    scopeManager.setElementScopes('[simple-repeat]');
    (function () {
        var nodes = document.querySelectorAll("[simple-repeat]"),
                length = nodes.length, x = 0, node;
        binders = [];
        var id = 0, Repeat = SimpleBinder.modules.binders.Repeat;
        for (; x < length; x += 1) {
            node = nodes[x];
            binders.push(new Repeat(node));
        }
    })();


    scopeManager.setElementScopes('[simple-bind]');
    (function () {
        var nodes = document.querySelectorAll("[simple-bind]"),
                length = nodes.length, x = 0, node;
        var id = 0, SimpleBind = SimpleBinder.modules.binders.SimpleBind;
        for (; x < length; x += 1) {
            node = nodes[x];
            binders.push(new SimpleBind(node));
        }
    })();


    (function () {
        var moduleName, module;
        for (module in SimpleBinder.modules.app) {
            module = SimpleBinder.modules.app[moduleName];
            for (var custom in module.customs) {
                var cus = module.customs[custom];
                scopeManager.setElementScopes(cus.name, function ($scope, $element) {
                    new cus.fn($scope, $element);
                });
            }
        }
    })();


})();
