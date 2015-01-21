(function () {

	var Binder = function () {
		var me = this, binders = [], scopeManager;

		me.const = {
			REPEAT: 'simple-repeat',
			TEXT: 'simple-text'
		};
		me.const.REPEAT_SELECTOR = '[' + me.const.REPEAT + ']';
		me.const.TEXT_SELECTOR = '[' + me.const.TEXT + ']';

		me.bind = function () {
		};

		me.buildScopes = function () {
			scopeManager = new SimpleBinder.modules.scopes.ScopeManager();
			SimpleBinder.scopeManager = scopeManager;
			scopeManager.build();
		};

	};

	SimpleBinder.binder = new Binder();
})();