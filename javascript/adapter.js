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
        'window.notice': '/javascript/modules/window/notice',
        'component.window': '/build/abc',
        'system.di': '/javascript/modules/system/di',
        'animation.enlarge': '/javascript/modules/animation/enlarge',
        'component.window.window.manager': '/javascript/modules/component/window/window.manager',
        'component.window.animate.ripple': '/javascript/modules/component/window/animate.ripple',
        'view.general': '/javascript/modules/window/general.view',
        'view.prompt': '/javascript/modules/window/prompt.view',
        'view.success': '/javascript/modules/window/success.view',
        'view.error': '/javascript/modules/window/error.view',
        'matrix': '/javascript/modules/math/matrix',
        'matrix3d': '/javascript/modules/math/matrix3d',
        'util': '/javascript/modules/util',
        'jquery': '/bower_components/jquery/dist/jquery.min'
    },
    shim: {
    },
    deps: ['dispatcher'],
    urlArgs: 'version=' + Math.random()
    //urlArgs: 'version=' +
});