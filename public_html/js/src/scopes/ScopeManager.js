(function () {
	SimpleBinder.modules.scopes.ScopeManager = function () {
		var me = this, scopes = {}, $rootScope, Utils = SimpleBinder.modules.utils,
				GUID = Utils.GUID, TimeLogger = Utils.TimeLogger;

		me.build = function () {
			var timeLogger = new TimeLogger('Create scopes');
			me.createRootScope();
			me.createScopesForSelector('[controller]');
			me.setElementScopes('[simple-bind]');
			timeLogger.end();
		};

		me.createRootScope = function () {
			var $body = document.getElementsByTagName('body');
			$rootScope = me.createElementScope($body);
		};

		me.createScopesForSelector = function (selector) {
			var $scope;
			Utils.elements.foreEach(selector, function ($element) {
				$scope = me.createElementScope($element);
				me.registerScope($scope);
			});
		};

		me.setElementScopes = function (selector) {
			var $elementWithScope;
			Utils.elements.foreEach(selector, function ($element) {
				$elementWithScope = Utils.elements.closest($element, function ($parent) {
					var ctrl = $parent.attributes.getNamedItem('controller');
					return typeof ctrl !== 'undefined' || ctrl !== null;
				});
				$element.$binding = $elementWithScope.$binding;
			});
		};

		me.createElementScope = function ($element) {
			$element.$binding = {
				$scope: {
					$id: GUID.get()
				}
			};
			return $element.$binding.$scope;
		};

		me.registerScope = function ($scope) {
			scopes[$scope.id] = $scope;
		};

		return {
			scopes: scopes,
			build: me.build,
			$rootScope: $rootScope
		};

	};

})();