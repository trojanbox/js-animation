/**
 * Created by xtrojanbox on 15-9-30.
 */

define(['jquery'], function ($) {

    var Message = {
        Core: function () {
            this.src = null;
            // 创建元素
            this.messageFramework = document.createDocumentFragment();
            this.messageBackground = document.createElement('div');
            this.messageFrame = document.createElement('div');
            this.messageHeader = document.createElement('div');
            this.messageTitle = document.createElement('span');
            this.messageClose = document.createElement('span');
            this.messageBody = document.createElement('div');
            this.messageBodyImg = document.createElement('img');
            this.messageBodyContent = document.createElement('span');
            this.messageFooter = document.createElement('div');
            this.messageOkButton = document.createElement('div');
            this.messageClearBoth = document.createElement('div');
            this.body = document.getElementsByTagName('body')[0];
        },
        Success: function (content, title, fun) {
            this.init();
            this.messageBodyImg.src = '';
            if (content) this.messageBodyContent.innerHTML = content;
            if (title) this.messageTitle.innerHTML = title;
            if (fun) {
                if (!fun()) return ;
                var tmpBackground = this.messageBackground;
                this.messageOkButton.onclick = function () {
                    $(tmpBackground).fadeOut(300, function () {
                        tmpBackground.parentNode.removeChild(tmpBackground);
                    });
                };
            } else {
                var tmpBackground = this.messageBackground;
                this.messageOkButton.onclick = function () {
                    $(tmpBackground).fadeOut(300, function () {
                        tmpBackground.parentNode.removeChild(tmpBackground);
                    });
                }
            }
        },
        Error: function (content, title, fun) {
            this.init();
            this.messageBodyImg.src = '';
            if (content) this.messageBodyContent.innerHTML = content;
            if (title) this.messageTitle.innerHTML = title;
            if (fun) {
                if (!fun()) return ;
                var tmpBackground = this.messageBackground;
                this.messageOkButton.onclick = function () {
                    $(tmpBackground).fadeOut(300, function () {
                        tmpBackground.parentNode.removeChild(tmpBackground);
                    });
                };
            } else {
                var tmpBackground = this.messageBackground;
                this.messageOkButton.onclick = function () {
                    $(tmpBackground).fadeOut(300, function () {
                        tmpBackground.parentNode.removeChild(tmpBackground);
                    });
                }
            }
        }
    };

    Message.Core.prototype.init = function () {
        // 设置元素样式
        this.messageBackground.className = 'message-background';
        this.messageFrame.className = 'message-frame';
        this.messageHeader.className = 'message-header';
        this.messageTitle.className = 'message-title';
        this.messageClose.className = 'message-close';
        this.messageBody.className = 'message-body';
        this.messageBodyImg.className = 'message-img';
        this.messageBodyContent.className = 'message-body-content';
        this.messageFooter.className = 'message-footer';
        this.messageOkButton.className = 'message-ok-button';
        this.messageClearBoth.className = 'message-clear-both';

        // 设置呈现图像
        this.messageClose.innerHTML = 'x';
        this.messageBodyImg.src = this.src;
        this.messageOkButton.textContent = '确认';
        this.messageTitle.textContent = '提示信息';
        this.messageBodyContent.textContent = '(null)';

        // 共用事件
        this.messageFrame.onclick = function (event) {
            event.stopPropagation();
        };
        this.messageBackground.onclick = function () {
            $(this).fadeOut(300, function () {
                this.parentNode.removeChild(this);
            });
        };
        var tmp = this.messageBackground;
        this.messageClose.onclick = function () {
            $(tmp).fadeOut(300, function () {
                tmp.parentNode.removeChild(tmp);
            });
        };

        // 装载元素
        this.messageFramework.appendChild(this.messageBackground);
        this.messageBackground.appendChild(this.messageFrame);
        this.messageFrame.appendChild(this.messageHeader);
        this.messageFrame.appendChild(this.messageBody);
        this.messageFrame.appendChild(this.messageFooter);
        this.messageHeader.appendChild(this.messageTitle);
        this.messageHeader.appendChild(this.messageClose);
        this.messageBody.appendChild(this.messageBodyContent);
        this.messageFooter.appendChild(this.messageOkButton);
        this.messageFooter.appendChild(this.messageClearBoth);

        this.messageBackground.style.display = 'none';
        this.body.appendChild(this.messageFramework);
        $(this.messageBackground).fadeIn(300);
    }

    return {
        success: function (content, title, fun) {
            Message.Success.prototype = new Message.Core();
            Message.Success.constructor = Message.Success;
            var success = new Message.Success(content, title, fun);
        },
        error: function (content, title, fun) {
            Message.Error.prototype = new Message.Core();
            Message.Error.constructor = Message.Error;
            var success = new Message.Error(content, title, fun);
        }
    };
});