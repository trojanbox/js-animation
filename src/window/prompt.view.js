define([
    'exports',
    'jquery',
    '../util',
    '../component/window/window.manager',
    '../component/window/animate.ripple'
], function (exports, $, util, WindowManger, AnimateRipple) {

    var PromptView = function () {
        WindowManger.apply(this, arguments);
        this.animationAdapterObject = new AnimateRipple(this);
        this.contentDocument = undefined;
        this.contentObject = {};
        this.classPrefix = 'prompt-view';
        this.content = "(null)";
        this.title = '提示信息';
        this.height = 120;
        this.maxWidth = 440;
        this.top = 150;
    };
    util.inheritPrototype(PromptView, WindowManger);

    /**
     * 设置内容
     * @param content
     * @returns {PromptView}
     */
    PromptView.prototype.setContent = function (content) {
        this.content = content;
        return this;
    };

    /**
     * 设置弹层标题
     * @param title
     * @returns {PromptView}
     */
    PromptView.prototype.setTitle = function (title) {
        this.title = title;
        return this;
    };

    /**
     * 创建内容视图
     */
    PromptView.prototype.createView = function () {

        var view = $(this.windowManager.view);
        var _this = this;
        this.contentObject.toolbar = document.createElement('div');
        this.contentObject.title = document.createElement('span');
        this.contentObject.closeButton = document.createElement('span');
        this.contentObject.body = document.createElement('div');
        var toolbarHeight = 50;

        this.contentObject.toolbar.className = this.getClassPrefix() + 'toolbar';
        this.contentObject.title.className = this.getClassPrefix() + 'title';
        this.contentObject.closeButton.className = this.getClassPrefix() + 'close';
        this.contentObject.body.className = this.getClassPrefix() + 'body';

        this.contentObject.toolbar.style.width = '100%';
        this.contentObject.toolbar.style.height = toolbarHeight + 'px';
        this.contentObject.title.innerHTML = this.title;
        this.contentObject.title.style.float = 'left';

        this.contentObject.closeButton.innerHTML = 'x';
        this.contentObject.closeButton.style.float = 'right';

        this.contentObject.body.style.margin = '5px';
        this.contentObject.body.innerHTML = this.content;
        this.contentObject.body.style.height = (this.coordinateParameter.bearingHeight - (toolbarHeight + 10)) + 'px';

        this.contentObject.toolbar.appendChild(this.contentObject.title);
        this.contentObject.toolbar.appendChild(this.contentObject.closeButton);
        this.windowManager.view.appendChild(this.contentObject.toolbar);
        this.windowManager.view.appendChild(this.contentObject.body);

        _this.windowManager.background.onclick = function () {
            _this.close();
        };
        _this.contentObject.closeButton.onclick = function () {
            _this.close();
        };

        if (!util.isMobileBrowser()) {
            view.css({opacity: 0, marginTop: 3});
            setTimeout(function () {
                view.animate({opacity: 1, marginTop: 0}, _this.time * (4 / 3));
            }, this.time * (1 / 3));
        }
    };

    /**
     * 绑定关闭事件
     */
    PromptView.prototype.bindCloseEvent = function () {
        this.close([
            this.windowManager.background,
            this.contentObject.closeButton
        ]);
    };

    exports.PromptView = PromptView;
});
