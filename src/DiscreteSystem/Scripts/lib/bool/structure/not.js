var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bool;
(function (Bool) {
    /**
     * Not (!child)
     */
    var Not = (function (_super) {
        __extends(Not, _super);
        function Not(child) {
            _super.call(this);
            this.child = child;
        }
        Not.prototype.getChildren = function () {
            return [this.child];
        };
        Not.prototype.toString = function () {
            return '!' + this.child.toString();
        };
        return Not;
    })(Bool.Block);
    Bool.Not = Not;
})(Bool || (Bool = {}));
//# sourceMappingURL=not.js.map