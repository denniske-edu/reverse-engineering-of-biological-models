var Algorithms;
(function (Algorithms) {
    var NumberAlgorithm = (function () {
        function NumberAlgorithm() {
        }
        // http://de.wikibooks.org/wiki/Algorithmensammlung:_Zahlentheorie:_Euklidischer_Algorithmus#Visual_Basic_for_Applications
        NumberAlgorithm.greatestCommonDivisor = function (a, b) {
            // ggT(a, b) = ggT(|a|, |b|)
            a = Math.abs(a);
            b = Math.abs(b);
            while (a > 0 && b > 0) {
                if (a > b)
                    a = a % b;
                else
                    b = b % a;
            }
            return a + b;
        };
        NumberAlgorithm.leastCommonMultiple = function (a, b) {
            // Not defined for a*b == 0
            if (a === 0 || b === 0)
                return NaN;
            var kgV = a / NumberAlgorithm.greatestCommonDivisor(a, b);
            return Math.abs(kgV * b);
        };
        return NumberAlgorithm;
    })();
    Algorithms.NumberAlgorithm = NumberAlgorithm;
})(Algorithms || (Algorithms = {}));
//# sourceMappingURL=number.js.map