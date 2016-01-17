define([
    'jquery',
    'util',
    'component.window.window.manager',
    'component.window.animate.ripple'
], function ($, util, WindowManger, AnimateRipple) {

    var ErrorView = function () {
        WindowManger.apply(this, arguments);
        this.animationAdapterObject = new AnimateRipple(this);
        this.contentDocument = undefined;
        this.contentObject = {};
        this.classPrefix = 'error-view';
        this.content = "(null)";
        this.title = '提示信息';
        this.height = 185;
        this.maxWidth = 440;
        this.top = 150;
        this.successEvent = undefined;
        this.errorEvent = undefined;
        this.promptText = '确认';
        this.cancelText = '取消';
    };
    util.inheritPrototype(ErrorView, WindowManger);

    /**
     * 设置内容
     * @param content
     * @returns {ErrorView}
     */
    ErrorView.prototype.setContent = function (content) {
        this.content = content;
        return this;
    };

    /**
     * 设置弹层标题
     * @param title
     * @returns {ErrorView}
     */
    ErrorView.prototype.setTitle = function (title) {
        this.title = title;
        return this;
    };

    /**
     * 创建内容视图
     */
    ErrorView.prototype.createView = function () {

        var view = $(this.windowManager.view);
        var _this = this;
        this.contentObject.toolbar = document.createElement('div');
        this.contentObject.operation = document.createElement('div');
        this.contentObject.title = document.createElement('span');
        this.contentObject.body = document.createElement('div');
        this.contentObject.successButton = document.createElement('div');
        this.contentObject.errorButton = document.createElement('div');
        var toolbarHeight = 50;
        var operationHeight = 50;

        this.contentObject.operation.className = this.getClassPrefix() + 'operation';
        this.contentObject.toolbar.className = this.getClassPrefix() + 'toolbar';
        this.contentObject.title.className = this.getClassPrefix() + 'title';
        this.contentObject.successButton.className = this.getClassPrefix() + 'success';
        this.contentObject.errorButton.className = this.getClassPrefix() + 'error';
        this.contentObject.body.className = this.getClassPrefix() + 'body';

        this.contentObject.toolbar.style.width = '100%';
        this.contentObject.toolbar.style.height = toolbarHeight + 'px';
        this.contentObject.title.innerHTML = this.title;
        this.contentObject.title.style.float = 'left';

        this.contentObject.body.style.margin = '5px';
        this.contentObject.body.innerHTML = this.content;
        this.contentObject.body.style.height = (this.coordinateParameter.bearingHeight - (toolbarHeight + operationHeight + 10)) + 'px';

        this.contentObject.operation.style.height = operationHeight + 'px';
        this.contentObject.operation.style.width = '100%';

        this.contentObject.successButton.innerHTML = this.promptText;
        this.contentObject.errorButton.innerHTML = this.cancelText;

        this.contentObject.toolbar.appendChild(this.contentObject.title);
        this.contentObject.operation.appendChild(this.contentObject.errorButton);
        this.contentObject.operation.appendChild(this.contentObject.successButton);
        this.windowManager.view.appendChild(this.contentObject.toolbar);
        this.windowManager.view.appendChild(this.contentObject.body);
        this.windowManager.view.appendChild(this.contentObject.operation);

        this.contentObject.successButton.onclick = function () {
            if (_this.successEvent) _this.successEvent();
            _this.close();
        };

        this.contentObject.errorButton.onclick = function () {
            if (_this.errorEvent) _this.errorEvent();
            _this.close();
        };

        view.css({opacity: 0, marginTop: 3});
        setTimeout(function () {
            view.animate({opacity: 1, marginTop: 0}, _this.time * (4/3));
        }, this.time * (1/30));
    };

    ErrorView.prototype.success = function (success) {
        this.successEvent = success;
        return this;
    };

    ErrorView.prototype.error = function (error) {
        this.errorEvent = error;
        return this;
    };

    ErrorView.prototype.setConfirmButtonText = function (text) {
        this.promptText = text;
    };

    ErrorView.prototype.setCancelButtonText = function (text) {
        this.cancelText = text;
    };

    return ErrorView;
});
