define(['jquery', 'util'], function ($, util) {

    var Frame = function () {
        this.width = 0;                     // 自适应
        this.height = 0;                    // 自适应
        this.automaticAdaptation = false;   // 自动适配屏幕大小
        this.content = 'null';              // 内容
        this.event = undefined;             // 鼠标事件对象
        this.triggerObject = undefined;     // 触发对象
        this.frame = undefined;             // 框架
    };

    Frame.prototype.setConfig = function (config) {
        config = config || {};
        this.width = config.width || this.width;
        this.height = config.height || this.height;
        this.content = config.content || this.content;
    };

    Frame.prototype.setContent = function () {

    };

    /** 承载主体生成器 */
    Frame.prototype.frameGenerator = function () {
        var blackBackground = document.createElement('div');
        var bearingBody = document.createElement('div');

        var bearingFrameWidth = (this.width == 0) ? (function () {
            if (document.documentElement.clientWidth <= 320) return 220;
            if (document.documentElement.clientWidth >= 800) return 700;
            return document.documentElement.clientWidth - 100;
        })() : this.width;
        var bearingFrameHeight = (this.height == 0) ? (function () {
            if (document.documentElement.clientHeight <= 240) return 150;
            if (document.documentElement.clientHeight >= 600) return 490;
            return document.documentElement.clientHeight - 110;
        })() : this.height;

        blackBackground.style.position = 'fixed';
        blackBackground.style.top = '0';
        blackBackground.style.left = '0';
        blackBackground.style.width = '100%';
        blackBackground.style.height = '100%';
        blackBackground.style.zIndex = '20';
        blackBackground.style.background = 'rgba(0, 0, 0, 0.6)';

        var offsetX = (document.documentElement.clientWidth - bearingFrameWidth) / 2;
        var offsetY = (document.documentElement.clientHeight - bearingFrameHeight) / 2;

        bearingBody.style.width = bearingFrameWidth + 'px';
        bearingBody.style.height = bearingFrameHeight + 'px';
        bearingBody.style.marginLeft = offsetX + 'px';
        bearingBody.style.marginTop = offsetY + 'px';
        bearingBody.style.background = 'rgb(255, 255, 255)';
        bearingBody.style.borderRadius = '3px';
        bearingBody.style.boxShadow = '0 2px 15px 3px rgba(0, 0, 0, 0.46)';

        blackBackground.appendChild(bearingBody);
        return {
            blackBackground: blackBackground,
            bearingBody: bearingBody
        };
    };

    Frame.prototype.click = function () {
        this.frame = this.frameGenerator();
        this.animationAdapter();
        document.getElementsByTagName('body')[0].appendChild(this.frame.blackBackground);
    };

    /** 动画适配器 */
    Frame.prototype.animationAdapter = function () {
        var ieVersion = util.getIeVersion();
        console.log(ieVersion);
        if (ieVersion === false || ieVersion > 8) {
            this.seniorAnimation();
        } else {
            this.basicAnimation();
        }
    };

    /** 基础动画 */
    Frame.prototype.basicAnimation = function () {
        $(this.frame.blackBackground).css({'opacity': 0}).animate({'opacity': 1});
    };

    /** 高级动画 */
    Frame.prototype.seniorAnimation = function () {

    };

    Frame.prototype.setTriggerObject = function (object) {
        this.triggerObject = object;
        return this;
    };

    Frame.prototype.setEvent = function (event) {
        this.event = event;
        return this;
    };

    return Frame;
});