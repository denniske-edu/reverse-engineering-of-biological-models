var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bool;
(function (Bool) {
    /**
     * Or (left | right)
     */
    var Or = (function (_super) {
        __extends(Or, _super);
        function Or(left, right) {
            _super.call(this);
            this.right = right;
            this.left = left;
        }
        Or.prototype.getChildren = function () {
            return [this.left, this.right];
        };
        Or.prototype.toString = function () {
            return this.left.toString() + '|' + this.right.toString();
        };
        return Or;
    })(Bool.Block);
    Bool.Or = Or;
})(Bool || (Bool = {}));
//# sourceMappingURL=or.js.map