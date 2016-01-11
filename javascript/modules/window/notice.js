/**
 * Created by xtrojanbox on 15-9-30.
 */

define(['jquery'], function ($) {

    var Manager = function () {
        this.container = [];    // 容器内容
        this.number = 7;  // 容器存储数量
        this.messageBox = document.createElement('div');
        this.messageBox.className = 'messagebox';
    };

    Manager.prototype.addNoticeNode = function (nodeObject) {
        if (typeof nodeObject != 'object') throw new Error('Undefined Type.');
        this.container.push(nodeObject);
        if (this.messageBox.childNodes.length == 0) {
            this.messageBox.appendChild(nodeObject.insert());
        } else {
            this.messageBox.insertBefore(nodeObject.insert(), this.messageBox.childNodes[0]);
        }
        setTimeout(function () {
            nodeObject.autocide(1000);
        }, 10000);
        nodeObject.run();
        if (this.container.length > this.number) this.container.shift().autocide();
        document.getElementsByTagName('body')[0].appendChild(this.messageBox);
    };

    var Node = function (data) {
        this.noticeDocumentFragment = document.createDocumentFragment();
        this.messageNode = document.createElement('div');
        this.nodeName = document.createElement('div');
        this.nodeContent = document.createElement('div');
        this.messageNode.className = 'messagenode';
        this.nodeName.className = 'nodename';
        this.nodeContent.className = 'nodecontent';
        this.messageNode.style.display = 'none';
        this.nodeName.innerHTML = !data.title ? '系统推送给您的消息' : data.title;
        this.nodeContent.innerHTML = !data.content ? '(null)' : data.content;
        this.noticeDocumentFragment.appendChild(this.messageNode);
        this.messageNode.appendChild(this.nodeName);
        this.messageNode.appendChild(this.nodeContent);
        if (data.event) {
            var i;
            for (i in data.event) {
                if (data.event.hasOwnProperty(i)) {
                    this.messageNode.addEventListener(i, data.event[i]);
                }
            }
        }
    };

    /** 执行节点，默认情况下由通知管理器调用 */
    Node.prototype.insert = function () {
        return this.noticeDocumentFragment;
    };

    Node.prototype.run = function () {
        $(this.messageNode).fadeIn();
    };

    /** 自毁，默认情况下由通知管理器调用 */
    Node.prototype.autocide = function (time) {
        $(this.messageNode).fadeOut(time, function () {
            if (this.parentNode) this.parentNode.removeChild(this);
        });
    };

    return {
        Manager: Manager,
        Node: Node
    };
});