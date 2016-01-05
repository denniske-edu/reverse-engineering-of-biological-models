var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Maths;
(function (Maths) {
    /**
     * Subtraction (left ~ right)
     */
    var Sub = (function (_super) {
        __extends(Sub, _super);
        function Sub(left, right) {
            _super.call(this);
            this.right = right;
            this.left = left;
        }
        Sub.prototype.getChildren = function () {
            return [this.left, this.right];
        };
        return Sub;
    })(Maths.Block);
    Maths.Sub = Sub;
})(Maths || (Maths = {}));
//# sourceMappingURL=sub.js.map