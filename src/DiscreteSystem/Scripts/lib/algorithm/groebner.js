var Algorithms;
(function (Algorithms) {
    var Polynomial = Polynomials.Polynomial;
    var Term = Polynomials.Term;
    /**
     * Abstract base class of all parsers.
     *
     * @abstract
     */
    var GroebnerAlgorithm = (function () {
        function GroebnerAlgorithm() {
        }
        GroebnerAlgorithm.leastCommonMultiple = function (a, b) {
            var coefficient = Algorithms.NumberAlgorithm.leastCommonMultiple(a.coefficient, b.coefficient);
            var monomial = [];
            for (var i = 0; i < a.monomial.length; i++) {
                monomial.push(Math.max(a.monomial[i], b.monomial[i]));
            }
            return new Term(coefficient, monomial);
        };
        GroebnerAlgorithm.sPolynomial = function (f, g, order) {
            var fLT = f.getLeadingTerm(order);
            var gLT = g.getLeadingTerm(order);
            var lcm = GroebnerAlgorithm.leastCommonMultiple(fLT, gLT);
            var left = new Polynomial([lcm.divide(fLT)]).multiply(f);
            var right = new Polynomial([lcm.divide(gLT)]).multiply(g);
            return left.subtract(right);
        };
        GroebnerAlgorithm.run = function (F, order) {
            if (order === void 0) { order = new Polynomials.Plex(); }
            F = _.filter(F, function (a) { return a.terms.length > 0; });
            F = GroebnerAlgorithm.groebner(F, order);
            F = GroebnerAlgorithm.minimalize(F, order);
            F = GroebnerAlgorithm.reduce(F, order);
            F.sort(function (a, b) { return order.compare(a.getLeadingTerm(order).monomial, b.getLeadingTerm(order).monomial); });
            return F;
        };
        GroebnerAlgorithm.groebner = function (F, order) {
            var added;
            do {
                added = false;
                for (var i = 0; i < F.length; i++) {
                    for (var j = 0; j < F.length; j++) {
                        if (i !== j) {
                            var sPolynomial = GroebnerAlgorithm.sPolynomial(F[i], F[j], order);
                            var result = Algorithms.DivisionAlgorithm.run(sPolynomial, F, order);
                            var s = result.r;
                            if (!s.equals(new Polynomial())) {
                                F.push(s);
                                added = true;
                            }
                        }
                    }
                }
            } while (added);
            return F;
        };
        GroebnerAlgorithm.minimalize = function (F, order) {
            var list = [];
            for (var i = 0; i < F.length; i++) {
                list.push(F[i].makeMonic(order));
            }
            for (var j = 0; j < list.length; j++) {
                for (var k = 0; k < list.length; k++) {
                    if (j !== k) {
                        var jLT = list[j].getLeadingTerm(order);
                        var kLT = list[k].getLeadingTerm(order);
                        if (jLT.divisibleBy(kLT)) {
                            list.splice(j, 1);
                            j--;
                            break;
                        }
                    }
                }
            }
            return list;
        };
        GroebnerAlgorithm.reduce = function (F, order) {
            var list = F.slice(0);
            for (var j = 0; j < list.length; j++) {
                var result = Algorithms.DivisionAlgorithm.run(list[j], _.without(list, list[j]), order);
                list[j] = result.r;
            }
            return list;
        };
        return GroebnerAlgorithm;
    })();
    Algorithms.GroebnerAlgorithm = GroebnerAlgorithm;
})(Algorithms || (Algorithms = {}));
//# sourceMappingURL=groebner.js.map