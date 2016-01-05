
module Test {

	import Polynomial = Polynomials.Polynomial;
	import Plex = Polynomials.Plex;
	import DivisionAlgorithm = Algorithms.DivisionAlgorithm;
	import System = Helper.System;
	import IntegerRing = Polynomials.IntegerRing;
	import PParser = Polynomials.PolynomialParser;
	import PPrinter = Polynomials.PolynomialPrinter;

	group('division', () => {

		// Integer-Ring
		System.ring = new IntegerRing();
		
		System.variables = ['x', 'y', 'z', 'x_1', 'x_2', 'x_3', 'x_4', 'x_5', 'x_6', 'x_7', 'x_8', 'x_9'];
		
		function matchPolynomial(a: Polynomial, b: Polynomial) {
			a.order(new Plex());
			b.order(new Plex());
			var aStr = PPrinter.run(a);
			var bStr = PPrinter.run(b);
			match(a.equals(b), true);
		}
		
		test('DivisionAlgorithm', () => {

			var matchDivision = (fStr: string, fsStr: string[], r: string = '') => {

				var f = PParser.parse(fStr);
				var fs = _.map(fsStr, e => PParser.parse(e));

				var result = DivisionAlgorithm.run(f, fs, new Plex());

				matchPolynomial(result.r, PParser.parse(r));
			};

			matchDivision('', ['']);
			matchDivision('1', ['1']);
			matchDivision('x^2+2*x+1', ['x+1']);

			matchDivision('x*y^2-x', ['y^2-1', 'x*y+1']);
			matchDivision('x*y^2-x', ['x*y+1', 'y^2-1'], '-x-y');

			matchDivision('x^2*y-x*z', ['x*y-z', 'x+1']);
			matchDivision('x^2*y-x*z', ['x+1', 'x*y-z'], 'y+z');

			matchDivision('x^2*z^2-y^2*z', ['y^2+z^2', 'x^2*y+y*z'], 'x^2*z^2+z^3');

			var f = PParser.parse('x^2+2*x+1');
			var fs = [PParser.parse('x+1')];

			var result = DivisionAlgorithm.run(f, fs, new Plex());

			matchPolynomial(result.r, PParser.parse(''));
			matchPolynomial(result.hs[0], PParser.parse('x+1'));
		});
	});
}