(function () {

    /* scope building */
    var scopeManager = new SimpleBinder.modules.scopes.ScopeManager();
    SimpleBinder.scopeManager = scopeManager;
    scopeManager.build();
    /* scope building end */

    scopeManager.setElementScopes('[simple-repeat]');
    (function () {
        var nodes = document.querySelectorAll("[simple-repeat]"),
                length = nodes.length, x = 0, node;

        binders = [];

        var id = 0, Repeat = SimpleBinder.modules.binders.Repeat;
        for (; x < length; x += 1) {
            node = nodes[x];

            node.$binding.$scope.rows = [];
            for (var i = 0; i < 20; i += 1) {
                node.$binding.$scope.rows.push({
                    id: i,
                    name: 'test item : ' + i
                });
            }

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
            node.$binding.$scope['test' + id] = "Wartość [" + id + "] = jakas";
            id += 1;
            if (id > 1) {
                id = 0;
            }


            binders.push(new SimpleBind(node));

        }
    })();

    SimpleBinder.customBind('stooltip', function ($element, $scope) {
        $($element).tooltip({
            title: $scope.$id,
            placement: 'right'
        });
    });

    scopeManager.setElementScopes('[stooltip]');
    (function () {
        var nodes = document.querySelectorAll("[stooltip]"),
                length = nodes.length, x = 0, node,
                constructor = SimpleBinder.customBinders['stooltip'].fn;
        for (; x < length; x += 1) {
            node = nodes[x];
            binders.push(new constructor(node, node.$binding.$scope));
        }
    })();



})();
