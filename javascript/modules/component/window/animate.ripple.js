define([], function () {

    var AnimateRipple = function (context) {
        this.context = context;
    };

    /** 基础动画 */
    AnimateRipple.prototype.basicOpenAnimation = function (coordinateParameter) {
        this.context.windowManager.body.style.background = 'rgb(255, 255, 255)';
        this.context.windowManager.body.style.borderRadius = '3px';
        this.context.windowManager.body.style.boxShadow = '0 2px 15px 3px rgba(0, 0, 0, 0.46)';
        this.context.windowManager.body.style.width = coordinateParameter.bearingWidth + 'px';
        this.context.windowManager.body.style.height = coordinateParameter.bearingHeight + 'px';
        this.context.windowManager.body.appendChild(this.context.windowManager.view);
        $(this.context.windowManager.background).css({
            'display': 'block'
        });
        $(this.context.windowManager.body).css({'opacity': 0, 'marginTop': coordinateParameter.offsetY + 3})
            .animate({opacity: 1, 'marginTop': coordinateParameter.offsetY}, this.time);
    };

    /** 高级动画 */
    AnimateRipple.prototype.seniorOpenAnimation = function (coordinateParameter) {

        var _this = this;
        var rectangleRightCritical = coordinateParameter.bearingWidth + coordinateParameter.offsetX;
        var rectangleBottomCritical = coordinateParameter.bearingHeight + coordinateParameter.offsetY;

        var coordinateDeterminationX = ((this.context.event.clientX - 20 > coordinateParameter.offsetX) ^ (this.context.event.clientX + 20 < rectangleRightCritical));
        var coordinateDeterminationY = ((this.context.event.clientY - 20 > coordinateParameter.offsetY) ^ (this.context.event.clientY + 20 < rectangleBottomCritical));

        if (0 != coordinateDeterminationX
            || 0 != coordinateDeterminationY) {
            this.context.selectAnimationAdapter = this.context.ANIMATION_TYPE_BASIC;
            this.basicOpenAnimation(coordinateParameter);
            return true;
        }

        var abstractRectangleRightTopOffsetX = this.context.event.clientX - coordinateParameter.offsetX;
        var abstractRectangleRightTopOffsetY = this.context.event.clientY - coordinateParameter.offsetY;

        // 最长角判断
        var topLength = abstractRectangleRightTopOffsetY;
        var bottomLength = coordinateParameter.bearingHeight - abstractRectangleRightTopOffsetY;
        var leftLength = abstractRectangleRightTopOffsetX;
        var rightLength = coordinateParameter.bearingWidth - abstractRectangleRightTopOffsetX;

        // 最长宽高计算
        var lengthY = (topLength > bottomLength) ? topLength : bottomLength;
        var lengthX = (leftLength > rightLength) ? leftLength : rightLength;

        // 圆形半径长度
        var bevelAngle = (Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)) + 10);
        var abstractContentRectangleRelativeCoordinatePositionY = (bevelAngle - topLength);
        var abstractContentRectangleRelativeCoordinatePositionX = (bevelAngle - leftLength);

        var abstractRectangle = document.createElement('div');
        abstractRectangle.style.width = '0px';
        abstractRectangle.style.height = '0px';
        abstractRectangle.style.position = 'absolute';
        abstractRectangle.style.top = this.context.event.clientY + 'px';
        abstractRectangle.style.left = this.context.event.clientX + 'px';
        abstractRectangle.style.borderRadius = '100%';
        abstractRectangle.style.overflow = 'hidden';

        var abstractContentRectangle = document.createElement('div');
        abstractContentRectangle.style.width = coordinateParameter.bearingWidth + 'px';
        abstractContentRectangle.style.height = coordinateParameter.bearingHeight + 'px';
        abstractContentRectangle.style.background = 'rgb(255, 255, 255)';
        abstractContentRectangle.style.borderRadius = '3px';
        abstractContentRectangle.style.boxShadow = '0 2px 15px 3px rgba(0, 0, 0, 0.46)';
        abstractContentRectangle.style.overflow = 'hidden';

        abstractRectangle.appendChild(abstractContentRectangle);
        this.context.windowManager.body.appendChild(abstractRectangle);

        this.context.windowManager.body.style.width = coordinateParameter.bearingWidth + 'px';
        this.context.windowManager.body.style.height = coordinateParameter.bearingHeight + 'px';
        this.context.windowManager.body.style.marginTop = coordinateParameter.offsetY + 'px';
        this.context.windowManager.body.style.marginLeft = coordinateParameter.offsetX + 'px';

        // 计算虚拟内容矩形的默认位置
        abstractContentRectangle.style.marginLeft = -(leftLength) + 'px';
        abstractContentRectangle.style.marginTop = -(topLength) + 'px';

        $(abstractRectangle).animate({
            width: (bevelAngle * 2),
            height: (bevelAngle * 2),
            marginLeft: -(bevelAngle) + 'px',
            marginTop: -(bevelAngle) + 'px'
        }, this.context.time);

        $(abstractContentRectangle).animate({
            marginTop: abstractContentRectangleRelativeCoordinatePositionY,
            marginLeft: abstractContentRectangleRelativeCoordinatePositionX
        }, this.context.time, function () {
            abstractRectangle.parentNode.removeChild(abstractRectangle);
            _this.context.windowManager.body.style.background = 'rgb(255, 255, 255)';
            _this.context.windowManager.body.style.borderRadius = '3px';
            _this.context.windowManager.body.style.boxShadow = '0 2px 15px 3px rgba(0, 0, 0, 0.46)';
            _this.context.windowManager.body.style.width = coordinateParameter.bearingWidth + 'px';
            _this.context.windowManager.body.style.height = coordinateParameter.bearingHeight + 'px';
            _this.context.windowManager.body.style.marginTop = coordinateParameter.offsetY + 'px';
            _this.context.windowManager.body.style.marginLeft = 'auto';
            _this.context.windowManager.body.style.marginRight = 'auto';
            _this.context.windowManager.body.appendChild(_this.context.windowManager.view);
            $(_this.context.windowManager.background).css({'display': 'block', 'opacity': 1});
        });

        abstractContentRectangle.appendChild(this.context.windowManager.view);
        $(this.context.windowManager.background).css({'display': 'block', 'opacity': 1});
    };

    /**
     * 标准关闭动画
     * @param coordinateParameter
     */
    AnimateRipple.prototype.basicCloseAnimation = function (coordinateParameter) {
        var _this = this;
        $(_this.context.windowManager.background).animate({'opacity': 0}, 100, function () {
            _this.context.windowManager.background.parentNode.removeChild(_this.context.windowManager.background);
        });
    };

    /**
     * 高级关闭动画
     * @param coordinateParameter
     */
    AnimateRipple.prototype.seniorCloseAnimation = function (coordinateParameter) {
        var _this = this;
        $(_this.context.windowManager.background).animate({'opacity': 0}, 200, function () {
            _this.context.windowManager.background.parentNode.removeChild(_this.context.windowManager.background);
        });
    };

    return AnimateRipple;
});