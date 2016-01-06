var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Polynomials;
(function (Polynomials) {
    /**
     * Abstract base class of all rings.
     *
     * @abstract
     */
    var Ring = (function () {
        function Ring() {
        }
        Ring.prototype.add = function (a, b) {
            return this.val(a + b);
        };
        Ring.prototype.subtract = function (a, b) {
            return this.val(a - b);
        };
        Ring.prototype.multiply = function (a, b) {
            return this.val(a * b);
        };
        Ring.prototype.divide = function (a, b) {
            return this.val(a / b);
        };
        Ring.prototype.val = function (a) {
            throw new Error(Polynomials.ABSTRACT);
        };
        Ring.prototype.power = function (a) {
            throw new Error(Polynomials.ABSTRACT);
        };
        return Ring;
    })();
    Polynomials.Ring = Ring;
    var IntegerRing = (function (_super) {
        __extends(IntegerRing, _super);
        function IntegerRing() {
            _super.apply(this, arguments);
        }
        IntegerRing.prototype.val = function (a) {
            return a;
        };
        IntegerRing.prototype.power = function (a) {
            return a;
        };
        return IntegerRing;
    })(Ring);
    Polynomials.IntegerRing = IntegerRing;
    var IntegerRingModulo2 = (function (_super) {
        __extends(IntegerRingModulo2, _super);
        function IntegerRingModulo2() {
            _super.call(this);
        }
        IntegerRingModulo2.prototype.val = function (a) {
            return Math.abs(a % 2);
        };
        IntegerRingModulo2.prototype.power = function (a) {
            return a;
            //return a === 0 ? 0 : 1;
        };
        return IntegerRingModulo2;
    })(Ring);
    Polynomials.IntegerRingModulo2 = IntegerRingModulo2;
    var IntegerRingModulo = (function (_super) {
        __extends(IntegerRingModulo, _super);
        function IntegerRingModulo(mod) {
            this.mod = mod;
            _super.call(this);
        }
        IntegerRingModulo.prototype.val = function (a) {
            return Math.abs(a % this.mod);
        };
        IntegerRingModulo.prototype.power = function (a) {
            return a;
        };
        return IntegerRingModulo;
    })(Ring);
    Polynomials.IntegerRingModulo = IntegerRingModulo;
    var IntegerRingModulo3Special = (function (_super) {
        __extends(IntegerRingModulo3Special, _super);
        function IntegerRingModulo3Special() {
            _super.call(this);
        }
        IntegerRingModulo3Special.prototype.val = function (a) {
            var temp = a % 3;
            if (temp === -2)
                return 1;
            if (temp === -1)
                return -1;
            if (temp === 0)
                return 0;
            if (temp === 1)
                return 1;
            if (temp === 2)
                return -1;
            throw new Error('Not implemented.');
        };
        IntegerRingModulo3Special.prototype.power = function (a) {
            return a;
        };
        return IntegerRingModulo3Special;
    })(Ring);
    Polynomials.IntegerRingModulo3Special = IntegerRingModulo3Special;
})(Polynomials || (Polynomials = {}));
//# sourceMappingURL=rings.js.map