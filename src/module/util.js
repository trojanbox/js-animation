define(['exports'], function (exports) {

    /**
     * 取得IE版本
     * @returns {*}
     */
    exports.getIeVersion = function() {
        var agent = navigator.userAgent.toLowerCase();
        var regStr_ie = /msie [\d.]+;/gi;
        if (agent.indexOf("msie") > 0) {
            var version = agent.match(regStr_ie);
            var result = version.toString().replace(/[^0-9.]/ig,"");
            if (result === undefined) {
                return false;
            }
            return parseInt(result);
        }
        return false;
    };

    /**
     * 继承
     * @param subType
     * @param superType
     */
    exports.inheritPrototype = function(subType, superType) {
        var prototype = (function (o) {
            function F() {}
            F.prototype = o;
            return new F();
        })(superType.prototype);
        prototype.constructor = subType;
        subType.prototype = prototype;
    };

    /**
     * 检查浏览器是否支持某种属性
     * @param style
     * @returns {boolean}
     */
    exports.cssAttributeSupport = function (style) {
        var prefix = ['webkit', 'Moz', 'ms', 'o'],
            i,
            humpString = [],
            htmlStyle = document.documentElement.style,
            _toHum = function (string) {
                return string.replace(/-(\w)/g, function ($0, $1) {
                    return $1.toUpperCase();
                });
            };

        for (i in prefix) if (prefix.hasOwnProperty(i)) {
            humpString.push(_toHum(prefix[i] + '-' + style));
        }
        humpString.push(_toHum(style));

        for (i in humpString) if (humpString.hasOwnProperty(i)) {
            if (humpString[i] in htmlStyle) return true;
        }
        return false;
    };

    /**
     * 是否是手机浏览器
     * @returns {boolean}
     */
    exports.isMobileBrowser = function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
    }

    return exports;
});
