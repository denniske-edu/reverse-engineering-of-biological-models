var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Polynomials;
(function (Polynomials) {
    Polynomials.ABSTRACT = "abstract method called";
    /**
     * Abstract base class of all term orders.
     *
     * @abstract
     */
    var TermOrder = (function () {
        function TermOrder() {
        }
        TermOrder.prototype.compare = function (a, b) {
            throw new Error(Polynomials.ABSTRACT);
        };
        return TermOrder;
    })();
    Polynomials.TermOrder = TermOrder;
    /**
     * Pure lexicographic order
     */
    var Plex = (function (_super) {
        __extends(Plex, _super);
        function Plex() {
            _super.apply(this, arguments);
        }
        Plex.prototype.compare = function (a, b) {
            var diff = [];
            for (var i = 0; i < a.length; i++) {
                diff.push(a[i] - b[i]);
            }
            var leftMostNonZeroEntry = _.find(diff, function (e) { return e !== 0; });
            if (leftMostNonZeroEntry == null)
                return 0;
            return -leftMostNonZeroEntry;
        };
        return Plex;
    })(TermOrder);
    Polynomials.Plex = Plex;
})(Polynomials || (Polynomials = {}));
//# sourceMappingURL=orders.js.map