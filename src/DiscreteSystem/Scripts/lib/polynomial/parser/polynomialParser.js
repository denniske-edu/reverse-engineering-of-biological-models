var Polynomials;
(function (Polynomials) {
    /**
     * Parses a polynomial expression from string into structure
     */
    var PolynomialParser = (function () {
        function PolynomialParser() {
        }
        PolynomialParser.parse = function (str) {
            str = str.toString(); // .replace(/\s/g, '')
            var terms = str.replace(/-/g, '+-').split('+'); // 
            var polynomial = new Polynomials.Polynomial();
            for (var i = 0; i < terms.length; i++) {
                if (terms[i].length > 0) {
                    polynomial.addTerm(Polynomials.TermParser.parse(terms[i]));
                }
            }
            return polynomial;
        };
        return PolynomialParser;
    })();
    Polynomials.PolynomialParser = PolynomialParser;
})(Polynomials || (Polynomials = {}));
//# sourceMappingURL=polynomialParser.js.map