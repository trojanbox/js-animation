/**
 * Created by wwwju on 2016/1/11.
 */

require(['jquery', 'window.frame', 'system.di'], function ($, frame, di) {
    $('.article').bind('click', function (event) {
        var f = new frame();
        f.setTriggerObject(this).setEvent(event);
        f.click();
    });
});