(function () {

	/* tworzenie scopow */
	var scopeManager = new SimpleBinder.modules.scopes.ScopeManager();
	scopeManager.build();
	/* koniec tworzenie scopow */


	var nodes = document.querySelectorAll("[simple-bind]"),
			length = nodes.length, x = 0, node;

	binders = [];

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