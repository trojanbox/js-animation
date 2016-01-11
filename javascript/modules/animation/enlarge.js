/**
 * Created by xtrojanbox on 15-9-30.
 */

define(['jquery'], function ($) {
    return function (config) {
        config = config ? config : {multiple: 1, time: 1000};
        return function (event) {
            _this = $(this);
            var height = _this.css('height');
            var width = _this.css('width');
            height = height.substr(0, height.length - 2);
            width = width.substr(0, width.length - 2);
            if (width > height) {
                height = width;
            }
            var roundWidth = !config.multiple ? height * 2 : height * config.multiple,
                roundHeight = !config.multiple ? height * 2 : height * config.multiple,
                roundRadius = !config.multiple ? height * 2 : height * config.multiple,
                time = !config.time ? 1000 : config.time;
            var offset = $(this).offset();
            var offsetX = event.pageX - offset.left;
            var offsetY = event.pageY- offset.top;

            var round = document.createElement('div');
            round.style.position = 'absolute';
            round.style.opacity = !config.opacity ? 0.1 : config.opacity;
            round.style.transition = 'all ' + time + 'ms ease 0s';
            round.style.width = '1px';
            round.style.height = '1px';
            round.style.borderRadius = roundRadius + 'px';
            round.style.background = !config.background ? '#000000' : config.background;
            round.style.top = (offsetY) + 'px';
            round.style.left = (offsetX) + 'px';
            round.style.pointerEvents = 'none';
            round.style.zIndex = 9999;
            this.appendChild(round);
            setTimeout(function () {
                round.style.width = roundWidth + 'px';
                round.style.height = roundHeight + 'px';
                round.style.top = (offsetY - (roundHeight / 2)) + 'px';
                round.style.left = (offsetX - (roundWidth / 2)) + 'px';
            }, 20);
            setTimeout(function () {
                round.style.opacity = 0;
            }, time / 4);

            setTimeout(function () {
                round.parentNode.removeChild(round);
            }, time + (time / 4));
        };
    };
});