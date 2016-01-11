/**
 * Created by xtrojanbox on 15-9-30.
 */

/**
 * 矩阵操作
 */
define([], function () {

    function Matrix(number) {
        if (typeof number == 'number') {
            this.matrix = [];
            this.length = number;
            for (var x = 0; x < number; x++) {
                for (var y = 0; y < number; y++) {
                    this.matrix.push(x == y ? 1 : 0);
                }
            }
        } else {
            if (number instanceof Array) {
                this.length = Math.sqrt(number.length) | 0;
                this.matrix = number;
            }
        }
        return this;
    }

    Matrix.prototype = {
        // 矩阵相乘
        multiply: function (matrix) {
            if (this.length == matrix.length) {
                var i, j, k, s, container = new Array(this.length * this.length);
                for (i = 0; i < this.length; i++) {
                    for (j = 0; s = 0, j < this.length; j++) {
                        for (k = 0; k < this.length; k++) {
                            s += matrix.matrix[k * this.length + j] * this.matrix[i * this.length + k];
                        }
                        container[i * this.length + j] = s;
                    }
                }
                this.matrix = container;
            }
            return this;
        },
        toArray: function () {
            return this.matrix;
        }
    };

    return Matrix;
});