define(["require", "exports"], function (require, exports) {
    exports.DependencyInjectionContainer = function () {
        function DependencyInjectionContainer() {
            this.id = null;
            this.container = {};
        }
        DependencyInjectionContainer.prototype.setContainerId = function (id) {
            this.id = id;
            return this;
        };
        DependencyInjectionContainer.prototype.getContainerId = function () {
            return this.id;
        };
        DependencyInjectionContainer.prototype.put = function (tag, fun) {
            this.container[tag] = fun;
            return this;
        };
        DependencyInjectionContainer.prototype.has = function (tag) {
            return !!this.container[tag];
        };
        DependencyInjectionContainer.prototype.get = function (tag) {
            return this.container[tag];
        };
        DependencyInjectionContainer.prototype.remove = function (tag) {
            return this.container[tag] = undefined;
        };
        DependencyInjectionContainer.prototype.getList = function () {
            return this.container;
        };
        return DependencyInjectionContainer;
    };

    exports.DependencyInjectionManager = (function () {
        function DependencyInjectionManager() {
            this.containerList = {};
        }
        DependencyInjectionManager.prototype.registerContainerManager = function (containerManager) {
            this.containerList[containerManager.getContainerId()] = containerManager;
            return this;
        };
        DependencyInjectionManager.prototype.getContainer = function (id) {
            return this.containerList[id];
        };
        return DependencyInjectionManager;
    })();
});
//# sourceMappingURL=DependencyInjection.js.map