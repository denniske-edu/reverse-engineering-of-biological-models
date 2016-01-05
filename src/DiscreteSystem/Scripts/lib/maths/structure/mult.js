var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Maths;
(function (Maths) {
    /**
     * Multiplication (left * right)
     */
    var Mult = (function (_super) {
        __extends(Mult, _super);
        function Mult(left, right) {
            _super.call(this);
            this.right = right;
            this.left = left;
        }
        Mult.prototype.getChildren = function () {
            return [this.left, this.right];
        };
        return Mult;
    })(Maths.Block);
    Maths.Mult = Mult;
})(Maths || (Maths = {}));
//# sourceMappingURL=mult.js.map