var error = require('./module/dialog/general');

$('.article').bind('click', function (event) {
    var successView = new error();
    successView.setContent("注意，点击它将会出现一个提示弹层。").setEvent(event);
    successView.open();
});