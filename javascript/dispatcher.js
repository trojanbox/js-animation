/**
 * Created by wwwju on 2016/1/11.
 */

require(['jquery', 'view.success'], function ($, SuccessView) {
    $('.article').bind('click', function (event) {
        var successView = new SuccessView();
        successView.setContent("注意，点击它将会出现一个提示弹层。").setEvent(event);
        successView.open();
    });
});