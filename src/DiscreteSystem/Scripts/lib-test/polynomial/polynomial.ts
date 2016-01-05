
module Test {

	import Polynomial = Polynomials.Polynomial;
	import Term = Polynomials.Term;
	import Plex = Polynomials.Plex;
	import System = Helper.System;
	import IntegerRing = Polynomials.IntegerRing;
	import PParser = Polynomials.PolynomialParser;
	import TParser = Polynomials.TermParser;
	import TPrinter = Polynomials.TermPrinter;
	import PPrinter = Polynomials.PolynomialPrinter;
	import IntegerRingModulo2 = Polynomials.IntegerRingModulo2;

	group('parser', () => {

		// Integer-Ring
		System.ring = new IntegerRing();
		
		System.variables = ['x', 'y', 'z', 'x_1', 'x_2', 'x_3', 'x_4', 'x_5', 'x_6', 'x_7', 'x_8', 'x_9'];
		
		function matchTerm(a: Term, b: Term) {
			match(a.equals(b), true);
		}

		function matchPolynomial(a: Polynomial, b: Polynomial) {
			a.order(new Plex());
			b.order(new Plex());
			var aStr = PPrinter.run(a);
			var bStr = PPrinter.run(b);
			match(a.equals(b), true);
		}

		test('term parse', () => {

			System.variables = ['x_1', 'x_2'];

			matchTerm(TParser.parse('x_1'), new Term(1, [1, 0]));

			System.variables = ['x', 'y'];

			matchTerm(TParser.parse('1'), new Term(1, [0, 0]));
			matchTerm(TParser.parse('x*y'), new Term(1, [1, 1]));
			matchTerm(TParser.parse('x^2*y'), new Term(1, [2, 1]));
			matchTerm(TParser.parse('3*x^2*y'), new Term(3, [2, 1]));

			matchTerm(TParser.parse('-1'), new Term(-1, [0, 0]));
			matchTerm(TParser.parse('-x*y'), new Term(-1, [1, 1]));
			matchTerm(TParser.parse('-x^2*y'), new Term(-1, [2, 1]));
			matchTerm(TParser.parse('-3*x^2*y'), new Term(-3, [2, 1]));
		});

		test('term toStr', () => {

			var matchToStr = (a: string) => match(TPrinter.run(TParser.parse(a)), a);
				
			matchToStr('1');
			matchToStr('x*y');
			matchToStr('x^2*y');
			matchToStr('3*x^2*y');

			matchToStr('-1');
			matchToStr('-x*y');
			matchToStr('-x^2*y');
			matchToStr('-3*x^2*y');
		});

		test('term divisible', () => {

			System.variables = ['x', 'y'];

			assertIsTrue(TParser.parse('x^2*y').divisibleBy(TParser.parse('x*y')));
			
			assertIsTrue(TParser.parse('x^2*y^2').divisibleBy(TParser.parse('x^2*y^2')));

			assertIsFalse(TParser.parse('x*y').divisibleBy(TParser.parse('x^2*y')));
		});
		
		test('term equals', () => {

			matchTerm(new Term(1, [2, 1]), new Term(1, [2, 1]));
			matchTerm(new Term(1, [1, 1]), new Term(1, [1, 1]));
			matchTerm(new Term(4, [2, 2]), new Term(4, [2, 2]));
		});

		test('term divide', () => {

			System.variables = ['x', 'y'];

			matchTerm(TParser.parse('x^2*y').divide(TParser.parse('x*y')), TParser.parse('x'));
			matchTerm(TParser.parse('4*x^2*y^2').divide(TParser.parse('2*x^2*y^2')), TParser.parse('2'));
		});
		
		test('polynomial parse', () => {

			System.variables = ['x', 'y'];

			matchPolynomial(PParser.parse(''), new Polynomial());
			matchPolynomial(PParser.parse('x'), new Polynomial([TParser.parse('x')]));
			matchPolynomial(PParser.parse('x*y'), new Polynomial([TParser.parse('x*y')]));
			matchPolynomial(PParser.parse('2*x+3*y^3'), new Polynomial([TParser.parse('2*x'), TParser.parse('3*y^3')]));
			matchPolynomial(PParser.parse('4*x*y+y'), new Polynomial([TParser.parse('4*x*y'), TParser.parse('y')]));

			matchPolynomial(PParser.parse('-x'), new Polynomial([TParser.parse('-x')]));
			matchPolynomial(PParser.parse('-x-y'), new Polynomial([TParser.parse('-x'), TParser.parse('-y')]));
			matchPolynomial(PParser.parse('-x*y'), new Polynomial([TParser.parse('-x*y')]));
			matchPolynomial(PParser.parse('-2*x+3*y^3'), new Polynomial([TParser.parse('-2*x'), TParser.parse('3*y^3')]));
			matchPolynomial(PParser.parse('4*x*y-y'), new Polynomial([TParser.parse('4*x*y'), TParser.parse('-y')]));
		});

		test('polynomial toStr', () => {

			var matchToStr = (a: string) => match(PPrinter.run(PParser.parse(a)), a);

			matchToStr('1');
			matchToStr('2');
			matchToStr('x');
			matchToStr('x+1');
			matchToStr('x*y+y');
			matchToStr('x^2*y-3*y^2');
			matchToStr('3*x^2*y-1');

			matchToStr('-1');
			matchToStr('-x');
			matchToStr('-x-1');
			matchToStr('-x*y+x');
			matchToStr('-x^2*y-y^2');
			matchToStr('-3*x^2*y');
		});

		test('term add', () => {

			var matchAdd = (a: string, b: string, c: string) => matchPolynomial(PParser.parse(a).add(PParser.parse(b)), PParser.parse(c));
				
			matchAdd('1', '1', '2');
			matchAdd('x', 'y', 'x+y');
			matchAdd('x+1', 'x+1', '2*x+2');
			matchAdd('x^2*y', '3*x+y', 'x^2*y+3*x+y');
			matchAdd('2*x^2*y+3*y', 'x^2*y+2*y', '3*x^2*y+5*y');
		});

		test('term subtract', () => {

			System.variables = ['x', 'y'];

			matchPolynomial(PParser.parse('1').subtract(PParser.parse('1')), PParser.parse(''));
			matchPolynomial(PParser.parse('x').subtract(PParser.parse('x')), PParser.parse(''));
			matchPolynomial(PParser.parse('x+1').subtract(PParser.parse('x+1')), PParser.parse(''));
			matchPolynomial(PParser.parse('x^2*y').subtract(PParser.parse('x^2*y')), PParser.parse(''));
			matchPolynomial(PParser.parse('2*x^2*y+3*y').subtract(PParser.parse('2*x^2*y+3*y')), PParser.parse(''));
			
			matchPolynomial(PParser.parse('2').subtract(PParser.parse('1')), PParser.parse('1'));
			matchPolynomial(PParser.parse('3*x^2').subtract(PParser.parse('x^2')), PParser.parse('2*x^2'));
			matchPolynomial(PParser.parse('x+1').subtract(PParser.parse('x^2+1')), PParser.parse('-x^2+x'));
		});

		test('term multiply', () => {

			System.variables = ['x', 'y'];

			matchPolynomial(PParser.parse('1').multiply(PParser.parse('5')), PParser.parse('5'));
			matchPolynomial(PParser.parse('x').multiply(PParser.parse('y')), PParser.parse('x*y'));
			matchPolynomial(PParser.parse('x+1').multiply(PParser.parse('x+1')), PParser.parse('x^2+2*x+1'));
			matchPolynomial(PParser.parse('x^2*y').multiply(PParser.parse('3*x+y')), PParser.parse('3*x^3*y+x^2*y^2'));

			matchPolynomial(PParser.parse('x-y').multiply(PParser.parse('x^2*y+2')), PParser.parse('x^3*y-x^2*y^2+2*x-2*y'));
		});
		
		test('makeMonic', () => {

			var matchMakeMonic = (aStr: string, bStr: string) => {

				var a = PParser.parse(aStr);
				var b = PParser.parse(bStr);

				matchPolynomial(a.makeMonic(new Plex()), b);
			};

			matchMakeMonic('1', '1');
			matchMakeMonic('x', 'x');
			matchMakeMonic('x-y', 'x-y');

			matchMakeMonic('-1', '1');
			matchMakeMonic('-x', 'x');
			matchMakeMonic('-x-y', 'x+y');
			matchMakeMonic('-x^2*z+y', 'x^2*z-y');
		});

		// Z2-Ring
		System.ring = new IntegerRingModulo2();

		test('term toStr in Z2', () => {

			var matchToStr = (a: string, b: string) => match(TPrinter.run(TParser.parse(a)), b);

			matchToStr('1', '1');
			matchToStr('x', 'x');
			matchToStr('x*y', 'x*y');
			matchToStr('x^2', 'x');
			matchToStr('x^3', 'x');
			matchToStr('x^4', 'x');
			matchToStr('x^2*y', 'x*y');

			matchToStr('3*x^2*y^3', 'x*y');

			matchToStr('-1', '1');
			matchToStr('-x*y', 'x*y');
			matchToStr('-x^2*y', 'x*y');
			matchToStr('-3*x^2*y', 'x*y');
		});

		test('polynomial multiply in Z2', () => {
			
			var matchMultiply = (a: string, b: string, c: string) => matchPolynomial(PParser.parse(a).multiply(PParser.parse(b)), PParser.parse(c));

			matchMultiply('x_6', '1', 'x_6');

			matchMultiply('x_6', 'x_6', 'x_6');

			matchMultiply('x_6', 'x_5+x_6*x_7', 'x_5*x_6+x_6*x_7');

			matchMultiply('x_6', 'x_5+x_6*x_7+x_6', 'x_5*x_6+x_6*x_7+x_6');

			matchMultiply('x_6', 'x_5+x_6*x_7+x_6+x_7', 'x_5*x_6+x_6*x_7+x_6+x_7*x_6');


			matchTerm(PParser.parse('x_6+x_6+x_6').terms[0], TParser.parse('x_6'));

			matchPolynomial(PParser.parse('x_6+x_6'), PParser.parse(''));

			matchMultiply('x_6', 'x_5+x_6*x_7+x_6+x_7+1', 'x_5*x_6+x_6*x_7+x_6+x_7*x_6+x_6');
		});
	});
}