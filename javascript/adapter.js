/* 初始化配置文件 */

/* 全局配置文件 */
window.common = {
    siteTitle: 'TrojanBox',
    host: ''
};

/* api 地址 */
window.common.api = {
    home: window.common.host + "/json/home.json"
};

/* Require 配置文件 */
require.config({
    paths: {
        // 核心库
        'window.frame': '/javascript/modules/window/frame',
        'window.notice': '/javascript/modules/window/notice',
        'window.message': '/javascript/modules/window/message',
        'system.di': '/javascript/modules/system/di',
        'animation.enlarge': '/javascript/modules/animation/enlarge',
        'matrix': '/javascript/modules/math/matrix',
        'matrix3d': '/javascript/modules/math/matrix3d',
        'util': '/javascript/modules/util',
        'jquery': '/bower_components/jquery/dist/jquery.min'
    },
    shim: {
    },
    deps: ['dispatcher'],
    // urlArgs: 'version=' + Math.random()
    urlArgs: 'version=' + 1
});