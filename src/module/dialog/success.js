var util = require('../util');
var WindowManger = require('../component/window/window.manager');
var AnimateRipple = require('../component/window/animate.ripple');

var SuccessView = function () {
    WindowManger.apply(this, arguments);
    this.animationAdapterObject = new AnimateRipple(this);
    this.contentDocument = undefined;
    this.contentObject = {};
    this.classPrefix = 'success-view';
    this.content = "(null)";
    this.title = '提示信息';
    this.height = 185;
    this.maxWidth = 440;
    this.top = 150;
    this.successEvent = undefined;
    this.errorEvent = undefined;
    this.promptText = '确认';
};
util.inheritPrototype(SuccessView, WindowManger);

/**
 * 设置内容
 * @param content
 * @returns {SuccessView}
 */
SuccessView.prototype.setContent = function (content) {
    this.content = content;
    return this;
};

/**
 * 设置弹层标题
 * @param title
 * @returns {SuccessView}
 */
SuccessView.prototype.setTitle = function (title) {
    this.title = title;
    return this;
};

/**
 * 创建内容视图
 */
SuccessView.prototype.createView = function () {

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

    this.contentObject.toolbar.appendChild(this.contentObject.title);
    this.contentObject.operation.appendChild(this.contentObject.successButton);
    this.windowManager.view.appendChild(this.contentObject.toolbar);
    this.windowManager.view.appendChild(this.contentObject.body);
    this.windowManager.view.appendChild(this.contentObject.operation);

    this.contentObject.successButton.onclick = function () {
        if (_this.successEvent) _this.successEvent();
        _this.close();
    };

    this.windowManager.background.onclick = function () {
        if (_this.errorEvent) _this.errorEvent();
        _this.close();
    };

    if (!util.isMobileBrowser()) {
        view.css({opacity: 0, marginTop: 3});
        setTimeout(function () {
            view.animate({opacity: 1, marginTop: 0}, _this.time * (4 / 3));
        }, this.time * (1 / 30));
    }
};

SuccessView.prototype.success = function (success) {
    this.successEvent = success;
    return this;
};

SuccessView.prototype.error = function (error) {
    this.errorEvent = error;
    return this;
};

SuccessView.prototype.setConfirmButtonText = function (text) {
    this.promptText = text;
};

SuccessView.prototype.setCancelButtonText = function (text) {
    this.cancelText = text;
};

module.exports = SuccessView;
