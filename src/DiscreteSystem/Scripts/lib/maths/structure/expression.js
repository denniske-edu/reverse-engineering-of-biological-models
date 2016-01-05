var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Maths;
(function (Maths) {
    /**
     * Usually root node of parsed maths expression.
     */
    var Expression = (function (_super) {
        __extends(Expression, _super);
        function Expression(child) {
            _super.call(this);
            this.child = child;
        }
        return Expression;
    })(Maths.Block);
    Maths.Expression = Expression;
})(Maths || (Maths = {}));
//# sourceMappingURL=expression.js.map