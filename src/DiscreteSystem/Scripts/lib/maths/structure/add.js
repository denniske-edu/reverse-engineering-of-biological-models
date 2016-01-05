var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Maths;
(function (Maths) {
    /**
     * Addition (left + right)
     */
    var Add = (function (_super) {
        __extends(Add, _super);
        function Add(left, right) {
            _super.call(this);
            this.right = right;
            this.left = left;
        }
        Add.prototype.getChildren = function () {
            return [this.left, this.right];
        };
        return Add;
    })(Maths.Block);
    Maths.Add = Add;
})(Maths || (Maths = {}));
//# sourceMappingURL=add.js.map