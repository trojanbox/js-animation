var util = require('../../util');

var WindowManager = function () {
    this.width = 0;                                                  // 自适应
    this.height = 0;                                                 // 自适应
    this.top = 0;                                                    // 自适应
    this.left = 0;                                                   // 自适应
    this.minHeight = 240;                                            // 最小高度
    this.minWidth = 320;                                             // 最小宽度
    this.maxHeight = 750;                                            // 最大高度
    this.maxWidth = 900;                                             // 最大宽度
    this.offsetHeight = 60;                                          // 高，自动适配偏移量
    this.offsetWidth = 50;                                           // 宽，自动适配偏移量
    this.automaticAdaptation = false;                                // 自动适配屏幕大小
    this.animationAdaptation = WindowManager.ANIMATION_TYPE_AUTO;    // 动画自动适配
    this.singularity = WindowManager.SINGULARITY_AUTO;               // 动画释放位置
    this.content = 'null';                                           // 内容
    this.event = undefined;                                          // 鼠标事件对象
    this.windowManager = undefined;                                  // 框架
    this.animationAdapterObject = undefined;                         // 动画对象
    this.classPrefix = null;                                         // 对象前缀
    this.time = 250;                                                 // 过渡时间
    this.coordinateParameter = undefined;                            // 坐标参数
    this.selectAnimationAdapter = undefined;                         // 选择的动画适配器
};

/** 自动匹配 */
WindowManager.ANIMATION_TYPE_AUTO = 1;

/** 高级动画 */
WindowManager.ANIMATION_TYPE_SENIOR = 2;

/** 标准动画 */
WindowManager.ANIMATION_TYPE_BASIC = 3;

/** 自动匹配释放位置 */
WindowManager.SINGULARITY_AUTO = 1;

/** 中心释放 */
WindowManager.SINGULARITY_CENTER = 2;

WindowManager.prototype.setConfig = function (config) {
    config = config || {};
    this.width = config.width || this.width;
    this.height = config.height || this.height;
    this.content = config.content || this.content;
    this.animationAdaptation = config.animationAdaptation || this.animationAdaptation;
    this.automaticAdaptation = config.automaticAdaptation || this.automaticAdaptation;
    this.time = config.time || this.time;
};

/**
 * 承载主体生成器
 * @returns {{background: Element, body: Element, view: Element}}
 * @constructor
 */
WindowManager.prototype.WindowManagerGenerator = function () {
    var background = document.createElement('div');
    var contentBody = document.createElement('div');
    var view = document.createElement('div');

    background.style.display = 'none';
    background.style.position = 'fixed';
    background.style.top = '0';
    background.style.left = '0';
    background.style.width = '100%';
    background.style.height = '100%';
    background.style.zIndex = '20';
    background.style.background = 'rgba(0, 0, 0, 0.6)';
    contentBody.style.width = '0px';
    contentBody.style.height = '0px';
    contentBody.style.marginLeft = 'auto';
    contentBody.style.marginRight = 'auto';
    contentBody.style.marginTop = '0px';
    view.style.width = '100%';
    view.style.height = '100%';

    $(contentBody).click(function (event) {
        event.stopPropagation();
    });

    background.appendChild(contentBody);
    return {
        background: background,
        body: contentBody,
        view: view
    };
};

/**
 * 创建视图接口
 */
WindowManager.prototype.createView = function () {
};

/**
 * 打开
 */
WindowManager.prototype.open = function () {
    this.windowManager = this.WindowManagerGenerator();
    this.openAnimationAutoAdapter();
    this.createView();
    document.getElementsByTagName('body')[0].appendChild(this.windowManager.background);
};

/**
 * 关闭
 */
WindowManager.prototype.close = function (closeObject) {
    this.closeAnimationAutoAdapter(closeObject);
};

/**
 * 启动动画适配器
 * @returns {boolean}
 */
WindowManager.prototype.openAnimationAutoAdapter = function () {
    var _this = this;
    this.coordinateParameter = {};
    this.coordinateParameter.bearingWidth = (this.width == 0) ? (function () {
        if (document.documentElement.clientWidth <= _this.minWidth) return _this.minWidth - _this.offsetWidth;
        if (document.documentElement.clientWidth >= _this.maxWidth) return _this.maxWidth - _this.offsetWidth;
        return document.documentElement.clientWidth - _this.offsetWidth;
    })() : this.width;
    this.coordinateParameter.bearingHeight = (this.height == 0) ? (function () {
        if (document.documentElement.clientHeight <= _this.minHeight) return _this.minHeight - _this.offsetHeight;
        if (document.documentElement.clientHeight >= _this.maxHeight) return _this.maxHeight - _this.offsetHeight;
        return document.documentElement.clientHeight - _this.offsetHeight;
    })() : this.height;

    if (this.top != 0) {
        this.coordinateParameter.offsetY = this.top;
    } else {
        this.coordinateParameter.offsetY = (document.documentElement.clientHeight - this.coordinateParameter.bearingHeight) / 2;
    }

    if (this.left != 0) {
        this.coordinateParameter.offsetX = this.left;
    } else {
        this.coordinateParameter.offsetX = (document.documentElement.clientWidth - this.coordinateParameter.bearingWidth) / 2;
    }

    if (this.event == undefined) {
        this.selectAnimationAdapter = WindowManager.ANIMATION_TYPE_BASIC;
        this.animationAdapterObject.basicOpenAnimation(this.coordinateParameter);
        return false;
    }

    switch (this.animationAdaptation) {
        case WindowManager.ANIMATION_TYPE_BASIC:
            this.selectAnimationAdapter = WindowManager.ANIMATION_TYPE_BASIC;
            this.animationAdapterObject.basicOpenAnimation(this.coordinateParameter);
            break;
        case WindowManager.ANIMATION_TYPE_SENIOR:
            this.selectAnimationAdapter = WindowManager.ANIMATION_TYPE_SENIOR;
            this.animationAdapterObject.seniorOpenAnimation(this.coordinateParameter);
            break;
        case WindowManager.ANIMATION_TYPE_AUTO:
        default:
            var ieVersion = util.getIeVersion();
            if (ieVersion === false || ieVersion > 8) {
                this.selectAnimationAdapter = WindowManager.ANIMATION_TYPE_SENIOR;
                this.animationAdapterObject.seniorOpenAnimation(this.coordinateParameter);
            } else {
                this.selectAnimationAdapter = WindowManager.ANIMATION_TYPE_BASIC;
                this.animationAdapterObject.basicOpenAnimation(this.coordinateParameter);
            }
            break;
    }
    return true;
};

/**
 * 关闭动画适配器
 */
WindowManager.prototype.closeAnimationAutoAdapter = function () {
    switch (this.selectAnimationAdapter) {
        case WindowManager.ANIMATION_TYPE_BASIC:
            this.animationAdapterObject.basicCloseAnimation(this.coordinateParameter);
            break;
        case WindowManager.ANIMATION_TYPE_SENIOR:
            this.animationAdapterObject.seniorCloseAnimation(this.coordinateParameter);
            break;
        default:
            this.animationAdapterObject.basicCloseAnimation(this.coordinateParameter);
            break;
    }
};

/**
 * 设置鼠标事件，需要点击位置
 * @param event
 * @returns {WindowManager}
 */
WindowManager.prototype.setEvent = function (event) {
    this.event = event;
    return this;
};

/**
 * 设置类前缀
 * @param prefix
 * @returns {WindowManager}
 */
WindowManager.prototype.setClassPrefix = function (prefix) {
    this.classPrefix = prefix;
    return this;
};

/**
 * 取得类前缀
 * @returns String
 */
WindowManager.prototype.getClassPrefix = function () {
    if (this.classPrefix == null) return '';
    return this.classPrefix + '-';
};

module.exports = WindowManager;