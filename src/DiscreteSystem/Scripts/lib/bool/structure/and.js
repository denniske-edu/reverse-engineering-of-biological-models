var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bool;
(function (Bool) {
    /**
     * And (left & right)
     */
    var And = (function (_super) {
        __extends(And, _super);
        function And(left, right) {
            _super.call(this);
            this.right = right;
            this.left = left;
        }
        And.prototype.getChildren = function () {
            return [this.left, this.right];
        };
        return And;
    })(Bool.Block);
    Bool.And = And;
})(Bool || (Bool = {}));
//# sourceMappingURL=and.js.map