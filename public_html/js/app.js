(function () {
    var timeLogger = new SimpleBinder.modules.utils.TimeLogger('Start binding'),
            module = SimpleBinder.module('test');

    module.controller('pierwszy', [function ($scope, $element) {
            $scope.id = 1;
            $scope.value = 'dadsadsa';
            this.$scope = $scope;
        }
    ]);

    module.controller('drugi', [function ($scope, $element) {
            this.$scope = $scope;
            $scope.rows = [];
            for (var i = 0; i < 20; i += 1) {
                $scope.rows.push({
                    id: i,
                    name: 'test item : ' + i
                });
            }
        }
    ]);

    module.custom('stooltip', [function ($scope, $element) {
            $($element).tooltip({
                title: $scope.$id,
                placement: 'right'
            });
        }
    ]);

    SimpleBinder.bind();

    timeLogger.end();
})();
