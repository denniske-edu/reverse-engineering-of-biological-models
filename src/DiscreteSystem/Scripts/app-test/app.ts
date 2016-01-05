
module Test {

	import Parser = Bool.Parser;
	import Converter = App.Converter;
	import FastConverter = App.FastConverter;
	import Decomposer = Maths.Decomposer;
	import Simplifier = Maths.Simplifier;
	import Printer = Maths.Printer;

	import Plex = Polynomials.Plex;
	import GroebnerAlgorithm = Algorithms.GroebnerAlgorithm;

	import IntegerRing = Polynomials.IntegerRing;
	import IntegerRingModulo2 = Polynomials.IntegerRingModulo2;
	import System = Helper.System;

	import PolynomialPrinter = Polynomials.PolynomialPrinter;
	import PolynomialParser = Polynomials.PolynomialParser;

	group('converter',() => {

		function matchParse(input: string, output: string) {
			match(Printer.run(Converter.run(Parser.parse(input))), output);
		}

		test('converts bool expression to maths expression',() => {
			matchParse('a&b', 'a*b');

			matchParse('a|b', 'a+b+a*b');

			matchParse('!a', 'a+1');

			matchParse('!a&b', '(a+1)*b');

			matchParse('!a&!b', '(a+1)*(b+1)');

			matchParse('a|b|c', 'a+b+c+b*c+a*(b+c+b*c)');

			matchParse('!a&b&c', '(a+1)*b*c');

			matchParse('!a&(b|c)', '(a+1)*(b+c+b*c)');
		});



		function matchParse2(input: string, output: string) {
			match(Printer.run(Converter.run(Parser.parse(input))), output);
		}

		function genPolynomes() {

			var len = System.variables.length;

			var stateLen = Math.pow(2, len);

			var states = [];

			for (var i = 0; i < stateLen; i++) {

				var state = [];

				for (var j = 0; j < len; j++) {

					var x = Math.ceil((i + 1) / Math.pow(2, len - 1 - j));
					var on = x % 2 === 0;

					state.push( (on ? '' : '!') + System.variables[j] );
				}

				states.push(state.join('&'));
			}

			return states;
		}

		function genPolynomes2(seed: any[]) {

			var len = seed.length;

			var stateLen = Math.pow(2, len);

			var states = [];

			for (var i = 0; i < stateLen; i++) {

				var state = [];

				for (var j = 0; j < len; j++) {

					var x = Math.ceil((i + 1) / Math.pow(2, len - 1 - j));
					var on = x % 2 === 0;

					if(on)
						state.push( '(' + seed[j] + ')' );
				}

				states.push(state.join('|'));
			}

			return states;
		}

		test('lagrange',() => {

			System.ring = new IntegerRing();
			//System.ring = new IntegerRingModulo2();
			
			System.variables = ['a', 'b'];


			var points = [
				[0, 0, 1],
				[0, 1, 2],
				[1, 1, 3]
			];

			




			var states = genPolynomes();
			var polys = genPolynomes2(states);

			var F = [];

			var order = new Plex();

			for (var j = 1; j < polys.length - 1; j++) {

				var p = FastConverter.run(Parser.parse(polys[j]));

				//var p = PolynomialParser.parse(polys[j].length > 0 ? polys[j] : '0');

				F.push(p);

				//var x = PolynomialPrinter.run(p);

				//console.log(x);

				F = GroebnerAlgorithm.minimalize(F, order);
				F = GroebnerAlgorithm.reduce(F, order);

				if (j % 100000 === 0)
					console.log(j);
			}

			var G = GroebnerAlgorithm.run(F, order);

			//var poly: any;

			//poly = FastConverter.run(Parser.parse('a&b'));
			//console.log(PolynomialPrinter.run(poly));

			//poly = FastConverter.run(Parser.parse('a&!b'));
			//console.log(PolynomialPrinter.run(poly));

			//poly = FastConverter.run(Parser.parse('(a&b)|(a&!b)'));
			//console.log(PolynomialPrinter.run(poly));

			//for (var i = 0; i < 33554432; i++) {
			//	if (i % 1000000 === 0)
			//		console.log(i);
			//}



			//var poly = FastConverter.run(Parser.parse('!(!a&b&!c&!d&!e)&!(!a&!b&!c&!d&!e)&!(a&b&!c&!d&!e)&!(!a&b&!c&!d&e)&!(!a&!b&!c&d&!e)&!(a&!b&c&d&!e)&!(!a&b&!c&d&!e)'));
			//var expr1dsd = PolynomialPrinter.run(poly);

			//var expr1 = Printer.run(Converter.run(Parser.parse('(!a&b&!c&!d&!e)|!b')));

			//var expr2 = Printer.run(Decomposer.run(Converter.run(Parser.parse('(!a&b&!c&!d&!e)|!b'))));

			//var expr1 = Printer.run(Simplifier.run(Decomposer.run(Converter.run(Parser.parse('(!a&b&!c&!d&!e)|(!a&!b&!c&!d&!e)|(a&b&!c&!d&!e)')))));

			// |(!a&!b&!c&!d&!e)|(a&b&!c&!d&!e)     |(!a&b&!c&!d&e)|(!a&!b&!c&d&!e)|(a&!b&c&d&!e)|(!a&b&!c&d&!e)

			//var expr3 = PolynomialPrinter.run(PolynomialParser.parse(expr1));

			//var result = GroebnerAlgorithm.run([poly], new Plex());

			//var expr2dsd = PolynomialPrinter.run(result[0]);


			var f = 1;

			//matchParse('a&a', '(a+1)*(b+c+b*c)');
		});





		test('vanishing ideals',() => {

			//System.ring = new IntegerRingModulo2();
			////System.variables = ['a', 'b', 'c', 'd', 'e'];

			//System.variables = ['a', 'b', 'c', 'd'];

			//var states = genPolynomes();
			//var polys = genPolynomes2(states);

			//var F = [];

			//var order = new Plex();

			//for (var j = 1; j < polys.length-1; j++) {

			//	var p = FastConverter.run(Parser.parse(polys[j]));

			//	//var p = PolynomialParser.parse(polys[j].length > 0 ? polys[j] : '0');

			//	F.push(p);

			//	//var x = PolynomialPrinter.run(p);

			//	//console.log(x);

			//	F = GroebnerAlgorithm.minimalize(F, order);
			//	F = GroebnerAlgorithm.reduce(F, order);

			//	if (j % 100000 === 0)
			//		console.log(j);
			//}

			//var G = GroebnerAlgorithm.run(F, order);

			//var poly: any;

			//poly = FastConverter.run(Parser.parse('a&b'));
			//console.log(PolynomialPrinter.run(poly));

			//poly = FastConverter.run(Parser.parse('a&!b'));
			//console.log(PolynomialPrinter.run(poly));

			//poly = FastConverter.run(Parser.parse('(a&b)|(a&!b)'));
			//console.log(PolynomialPrinter.run(poly));

			//for (var i = 0; i < 33554432; i++) {
			//	if (i % 1000000 === 0)
			//		console.log(i);
			//}



			//var poly = FastConverter.run(Parser.parse('!(!a&b&!c&!d&!e)&!(!a&!b&!c&!d&!e)&!(a&b&!c&!d&!e)&!(!a&b&!c&!d&e)&!(!a&!b&!c&d&!e)&!(a&!b&c&d&!e)&!(!a&b&!c&d&!e)'));
			//var expr1dsd = PolynomialPrinter.run(poly);

			//var expr1 = Printer.run(Converter.run(Parser.parse('(!a&b&!c&!d&!e)|!b')));

			//var expr2 = Printer.run(Decomposer.run(Converter.run(Parser.parse('(!a&b&!c&!d&!e)|!b'))));

			//var expr1 = Printer.run(Simplifier.run(Decomposer.run(Converter.run(Parser.parse('(!a&b&!c&!d&!e)|(!a&!b&!c&!d&!e)|(a&b&!c&!d&!e)')))));

			// |(!a&!b&!c&!d&!e)|(a&b&!c&!d&!e)     |(!a&b&!c&!d&e)|(!a&!b&!c&d&!e)|(a&!b&c&d&!e)|(!a&b&!c&d&!e)

			//var expr3 = PolynomialPrinter.run(PolynomialParser.parse(expr1));

			//var result = GroebnerAlgorithm.run([poly], new Plex());

			//var expr2dsd = PolynomialPrinter.run(result[0]);


			var f = 1;

			//matchParse('a&a', '(a+1)*(b+c+b*c)');
		});


	});
}







