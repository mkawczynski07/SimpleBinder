(function () {

    var ModuleManager = function () {
        var me = this, resolveDefinition = function (name, object, definition) {
            object[name] = {
                name: name,
                fn: definition[definition.length - 1]
            };
        };

        me.get = function (name) {
            var path = name.split('.'), x = 0, length = path.length, module,
                    current = SimpleBinder.modules.app;
            for (; x < length; x += 1) {
                module = path[x];
                if (typeof current[module] === 'undefined') {
                    current[module] = me.new();
                }
                current = current[module];
            }
            return current;
        };

        me.new = function () {
            return {
                customs: {},
                controllers: {},
                custom: function (name, definition) {
                    resolveDefinition(name, this.customs, definition);
                },
                controller: function (name, definition) {
                    resolveDefinition(name, this.controllers, definition);
                }
            };
        };

    };

    SimpleBinder.moduleManager = new ModuleManager();


})();