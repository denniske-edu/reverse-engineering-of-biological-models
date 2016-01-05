var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bool;
(function (Bool) {
    /**
     * Usually root node of parsed bool expression.
     */
    var Expression = (function (_super) {
        __extends(Expression, _super);
        function Expression(child) {
            _super.call(this);
            this.child = child;
        }
        return Expression;
    })(Bool.Block);
    Bool.Expression = Expression;
})(Bool || (Bool = {}));
//# sourceMappingURL=expression.js.map