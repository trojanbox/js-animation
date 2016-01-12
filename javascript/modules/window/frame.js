define(['jquery', 'util'], function ($, util) {

    var Frame = function () {
        this.width = 0;                                          // 自适应
        this.height = 0;                                         // 自适应
        this.automaticAdaptation = false;                        // 自动适配屏幕大小
        this.animationAdaptation = Frame.ANIMATION_TYPE_AUTO;    // 动画自动适配
        this.content = 'null';                                   // 内容
        this.event = undefined;                                  // 鼠标事件对象
        this.triggerObject = undefined;                          // 触发对象
        this.frame = undefined;                                  // 框架
    };

    /** 自动 */
    Frame.ANIMATION_TYPE_AUTO = 1;

    /** 高级动画 */
    Frame.ANIMATION_TYPE_SENIOR = 2;

    /** 标准动画 */
    Frame.ANIMATION_TYPE_BASIC = 3;

    Frame.prototype.setConfig = function (config) {
        config = config || {};
        this.width = config.width || this.width;
        this.height = config.height || this.height;
        this.content = config.content || this.content;
        this.animationAdaptation = config.animationAdaptation || this.animationAdaptation;
        this.automaticAdaptation = config.automaticAdaptation || this.automaticAdaptation;
    };

    Frame.prototype.setContent = function () {

    };

    /** 承载主体生成器 */
    Frame.prototype.frameGenerator = function () {
        var blackBackground = document.createElement('div');
        var bearingBody = document.createElement('div');

        blackBackground.style.display = 'none';
        blackBackground.style.position = 'fixed';
        blackBackground.style.top = '0';
        blackBackground.style.left = '0';
        blackBackground.style.width = '100%';
        blackBackground.style.height = '100%';
        blackBackground.style.zIndex = '20';
        blackBackground.style.background = 'rgba(0, 0, 0, 0.6)';

        bearingBody.style.width = '0px';
        bearingBody.style.height = '0px';
        bearingBody.style.marginLeft = 'auto';
        bearingBody.style.marginRight = 'auto';
        bearingBody.style.marginTop = '0px';
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

        var coordinateParameter = {};

        coordinateParameter.bearingWidth = (this.width == 0) ? (function () {
            if (document.documentElement.clientWidth <= 320) return 220;
            if (document.documentElement.clientWidth >= 800) return 700;
            return document.documentElement.clientWidth - 100;
        })() : this.width;
        coordinateParameter.bearingHeight = (this.height == 0) ? (function () {
            if (document.documentElement.clientHeight <= 240) return 150;
            if (document.documentElement.clientHeight >= 600) return 490;
            return document.documentElement.clientHeight - 110;
        })() : this.height;

        coordinateParameter.offsetX = (document.documentElement.clientWidth - coordinateParameter.bearingWidth) / 2;
        coordinateParameter.offsetY = (document.documentElement.clientHeight - coordinateParameter.bearingHeight) / 2;

        switch (this.animationAdaptation) {
            case Frame.ANIMATION_TYPE_BASIC:
                this.basicAnimation(coordinateParameter);
                break;
            case Frame.ANIMATION_TYPE_SENIOR:
                this.seniorAnimation(coordinateParameter);
                break;
            case Frame.ANIMATION_TYPE_AUTO:
            default:
                var ieVersion = util.getIeVersion();
                if (ieVersion === false || ieVersion > 8) {
                    this.seniorAnimation(coordinateParameter);
                } else {
                    this.basicAnimation(coordinateParameter);
                }
                break;
        }
    };

    /** 基础动画 */
    Frame.prototype.basicAnimation = function (coordinateParameter) {
        this.frame.bearingBody.style.width = coordinateParameter.bearingWidth + 'px';
        this.frame.bearingBody.style.height = coordinateParameter.bearingHeight + 'px';
        this.frame.bearingBody.style.marginTop = coordinateParameter.offsetY + 'px';
        $(this.frame.blackBackground).css({'display': 'block', 'opacity': 0}).animate({'opacity': 1});
    };

    /** 高级动画 */
    Frame.prototype.seniorAnimation = function (coordinateParameter) {
        var rectangleRightCritical = coordinateParameter.bearingWidth + coordinateParameter.offsetX;
        var rectangleBottomCritical = coordinateParameter.bearingHeight + coordinateParameter.offsetY;

        console.log(coordinateParameter.offsetX + '<' + this.event.clientX + "<" + rectangleRightCritical);
        console.log(coordinateParameter.offsetY + '<' + this.event.clientY + '<' + rectangleBottomCritical);

        if (((this.event.clientX > coordinateParameter.offsetX) ^ (this.event.clientX < rectangleRightCritical))
            ^ ((this.event.clientY > coordinateParameter.offsetY) ^ (this.event.clientY < rectangleBottomCritical))) {
            this.basicAnimation(coordinateParameter);
            return true;
        }

        var abstractRectangleLeftBottomOffsetX = coordinateParameter.offsetX;
        var abstractRectangleLeftBottomOffsetY = rectangleBottomCritical;
        var abstractRectangleRightTopOffsetX = this.event.clientX - coordinateParameter.offsetX;
        var abstractRectangleRightTopOffsetY = this.event.clientY - coordinateParameter.offsetY;

        console.log('矩形右上 X 轴：' + abstractRectangleRightTopOffsetX);
        console.log('矩形右上 Y 轴：' + abstractRectangleRightTopOffsetY);
        console.log('矩形坐下 X 轴：' + abstractRectangleLeftBottomOffsetX);
        console.log('矩形坐下 Y 轴：' + abstractRectangleLeftBottomOffsetY);

        // 最长角判断
        var topLength = abstractRectangleRightTopOffsetY;
        var bottomLength = coordinateParameter.bearingHeight - abstractRectangleRightTopOffsetY;
        var leftLength = abstractRectangleRightTopOffsetX;
        var rightLength = coordinateParameter.bearingWidth - abstractRectangleRightTopOffsetX;

        console.log('抽象矩形就离矩形内的上长度：' + topLength);
        console.log('抽象矩形就离矩形内的下长度：' + bottomLength);
        console.log('抽象矩形就离矩形内的左长度：' + leftLength);
        console.log('抽象矩形就离矩形内的右长度：' + rightLength);

        // 最长宽高计算
        var lengthY = (topLength > bottomLength) ? topLength : bottomLength;
        var lengthX = (leftLength > rightLength) ? leftLength : rightLength;

        var abstractRectangle = document.createElement('div');
        abstractRectangle.style.position = 'absolute';
        abstractRectangle.style.top = this.event.clientY + 'px';
        abstractRectangle.style.left = this.event.clientX + 'px';
        abstractRectangle.style.width = (lengthX * 2) + 'px';
        abstractRectangle.style.height = (lengthY * 2) + 'px';
        abstractRectangle.style.marginLeft = -((lengthX / 2) + (lengthX * 2)) + 'px';
        abstractRectangle.style.marginTop = -(lengthY / 2) + 'px';

        abstractRectangle.style.background = 'red';
        this.frame.bearingBody.appendChild(abstractRectangle);

        this.frame.bearingBody.style.width = coordinateParameter.bearingWidth + 'px';
        this.frame.bearingBody.style.height = coordinateParameter.bearingHeight + 'px';
        this.frame.bearingBody.style.marginTop = coordinateParameter.offsetY + 'px';

        $(this.frame.blackBackground).css({'display': 'block', 'opacity': 1});
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