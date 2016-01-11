/**
 * Created by xtrojanbox on 15-9-30.
 */

define(['matrix', 'util'], function (matrix, util) {
    //// 3D 变换矩阵 extends 矩阵
    function TransformMatrix3D(number) {
        if (number && (number == 4 || Math.sqrt(number.length) == 4)) {
            matrix.call(this, number);
        } else if (!number) {
            matrix.call(this, 4);
        }
    }
    util.inheritPrototype(TransformMatrix3D, matrix);

    // 位移
    TransformMatrix3D.prototype.translate = function (x, y, z, w) {
        this.multiply(new TransformMatrix3D([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, w]));
        return this;
    };

    // 缩放
    TransformMatrix3D.prototype.scale = function (x, y, z, w) {
        this.multiply(new TransformMatrix3D([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, w]));
        return this;
    };

    // X 轴旋转
    TransformMatrix3D.prototype.rotateX = function (deg, w) {
        deg = Math.PI * deg / 180;
        cos = Math.cos(deg);
        sin = Math.sin(deg);
        this.multiply(new TransformMatrix3D([1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, w]));
        return this;
    };

    // Y 轴旋转
    TransformMatrix3D.prototype.rotateY = function (deg, w) {
        deg = Math.PI * deg / 180;
        cos = Math.cos(deg);
        sin = Math.sin(deg);
        this.multiply(new TransformMatrix3D([cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, w]));
        return this;
    };

    // Z 轴旋转
    TransformMatrix3D.prototype.rotateZ = function (deg, w) {
        deg = Math.PI * deg / 180;
        cos = Math.cos(deg);
        sin = Math.sin(deg);
        this.multiply(new TransformMatrix3D([cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
        return this;
    };

    return TransformMatrix3D;
});