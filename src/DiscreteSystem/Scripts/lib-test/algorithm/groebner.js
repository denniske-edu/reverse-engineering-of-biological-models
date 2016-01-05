var Test;
(function (Test) {
    var Plex = Polynomials.Plex;
    var GroebnerAlgorithm = Algorithms.GroebnerAlgorithm;
    var System = Helper.System;
    var IntegerRing = Polynomials.IntegerRing;
    var IntegerRingModulo2 = Polynomials.IntegerRingModulo2;
    var PParser = Polynomials.PolynomialParser;
    var TParser = Polynomials.TermParser;
    var PPrinter = Polynomials.PolynomialPrinter;
    Test.group('groebner', function () {
        // Integer-Ring
        System.ring = new IntegerRing();
        var field = ['x', 'y', 'z', 'x_1', 'x_2', 'x_3', 'x_4', 'x_5', 'x_6', 'x_7', 'x_8', 'x_9'];
        function matchTerm(a, b) {
            Test.match(a.equals(b), true);
        }
        function matchPolynomial(a, b) {
            a.order(new Plex());
            b.order(new Plex());
            var aStr = PPrinter.run(a);
            var bStr = PPrinter.run(b);
            Test.match(a.equals(b), true);
        }
        Test.test('leastCommonMultiple', function () {
            var matchLeastCommonMultiple = function (aStr, bStr, lcmStr) {
                var a = TParser.parse(aStr);
                var b = TParser.parse(bStr);
                var lcm = TParser.parse(lcmStr);
                var result = GroebnerAlgorithm.leastCommonMultiple(a, b);
                matchTerm(result, lcm);
            };
            matchLeastCommonMultiple('x', 'y', 'x*y');
            matchLeastCommonMultiple('y^2', 'x^2*y', 'x^2*y^2');
        });
        Test.test('sPolynomial', function () {
            var matchSPolynomial = function (aStr, bStr, sPolynomialStr) {
                var a = PParser.parse(aStr);
                var b = PParser.parse(bStr);
                var sPolynomial = PParser.parse(sPolynomialStr);
                var result = GroebnerAlgorithm.sPolynomial(a, b, new Plex());
                matchPolynomial(result, sPolynomial);
            };
            matchSPolynomial('y^2+z^2', 'x^2*y+y*z', 'x^2*z^2-y^2*z');
        });
        Test.test('groebner', function () {
            var matchGroebner = function (FStr, reducedGroebnerStr) {
                var F = _.map(FStr, function (e) { return PParser.parse(e); });
                var result = GroebnerAlgorithm.run(F, new Plex());
                for (var i = 0; i < reducedGroebnerStr.length; i++) {
                    matchPolynomial(result[i], PParser.parse(reducedGroebnerStr[i]));
                }
            };
            matchGroebner(['x^2-y', 'x^3-x'], ['x^2-y', 'x*y-x', 'y^2-y']);
            matchGroebner(['x^2-y^2', 'x^2+y'], ['x^2+y', 'y^2+y']);
            matchGroebner(['y^2+z^2', 'x^2*y+y'], ['x^2*y+y', 'x^2*z^2+z^2', 'y^2+z^2']);
            matchGroebner(['y^2+z^2', 'x^2*y+y*z'], ['x^2*y+y*z', 'x^2*z^2+z^3', 'y^2+z^2']);
        });
        // Z2-Ring
        System.ring = new IntegerRingModulo2();
        Test.test('groebner in Z2', function () {
            var matchGroebner = function (FStr, reducedGroebnerStr) {
                var F = _.map(FStr, function (e) { return PParser.parse(e); });
                var result = GroebnerAlgorithm.run(F, new Plex());
                for (var i = 0; i < reducedGroebnerStr.length; i++) {
                    matchPolynomial(result[i], PParser.parse(reducedGroebnerStr[i]));
                }
            };
            var input = [
                '-x_1 + x_4 * x_5 + x_4',
                '-x_2 + x_1',
                '-x_3 + x_1',
                '-x_4 + 1',
                '-x_5 + x_6 * x_7 + x_6 + x_7 + 1',
                '-x_6 + x_3 * x_8',
                '-x_7 + x_6 + x_8 + x_9 + x_8 * x_9 + x_6 * x_8 + x_6 * x_9 + x_6 * x_8 * x_9',
                '-x_8 + x_2',
                '-x_9 + 1'
            ];
            matchGroebner(input, [
                'x_1+1',
                'x_2+1',
                'x_3+1',
                'x_4+1',
                'x_5',
                'x_6+1',
                'x_7+1',
                'x_8+1',
                'x_9+1'
            ]);
        });
    });
})(Test || (Test = {}));
//# sourceMappingURL=groebner.js.map