var Helper;
(function (Helper) {
    var IntegerRing = Polynomials.IntegerRing;
    var System = (function () {
        function System() {
        }
        System.ring = new IntegerRing();
        return System;
    })();
    Helper.System = System;
})(Helper || (Helper = {}));
//# sourceMappingURL=system.js.map