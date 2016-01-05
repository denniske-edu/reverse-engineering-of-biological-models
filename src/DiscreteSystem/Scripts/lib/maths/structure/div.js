var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Maths;
(function (Maths) {
    /**
     * Division (left / right)
     */
    var Div = (function (_super) {
        __extends(Div, _super);
        function Div(left, right) {
            _super.call(this);
            this.right = right;
            this.left = left;
        }
        Div.prototype.getChildren = function () {
            return [this.left, this.right];
        };
        return Div;
    })(Maths.Block);
    Maths.Div = Div;
})(Maths || (Maths = {}));
//# sourceMappingURL=div.js.map