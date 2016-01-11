/**
 * Created by xtrojanbox on 15-9-30.
 */

define([], function () {
    var util = {};

    /**
     * 取得IE版本
     * @returns {*}
     */
    util.getIeVersion = function() {
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
    util.inheritPrototype = function(subType, superType) {
        var prototype = (function (o) {
            function F() {}

            F.prototype = o;
            return new F();
        })(superType.prototype);
        prototype.constructor = subType;
        subType.prototype = prototype;
    };

    return util;
});