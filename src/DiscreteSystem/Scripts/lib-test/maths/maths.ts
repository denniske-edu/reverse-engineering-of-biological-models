
module Test {

	import Decomposer = Maths.Decomposer;
	import Flatter = Maths.Flatter;
	import Printer = Maths.Printer;
	import Simplifier = Maths.Simplifier;
	import Parser = Maths.Parser;
	import Variables = Maths.Variables;
	import Replacer = Maths.Replacer;

	group('parser', () => {

		function matchParse(input: string, output: string) {
			match(Printer.run(Parser.parse(input)), output);
		}

		test('parses numbers', () => {
			matchParse('1', '1');
		});

		test('parses add/mult of numbers', () => {
			matchParse('1+2', '1+2');
			matchParse('1*2', '1*2');
		});
		
		test('knows operator precedence (* > +)', () => {
			matchParse('1*(2+2)', '1*(2+2)');
			matchParse('(2+2)*1', '(2+2)*1');
		});

		test('parses variables', () => {
			matchParse('x', 'x');
		});

		test('parses add/mult of variables', () => {
			matchParse('x+y', 'x+y');
			matchParse('x*y', 'x*y');
		});

		test('knows operator precedence (* > +)', () => {
			matchParse('x*(y+y)', 'x*(y+y)');
			matchParse('(y+y)*x', '(y+y)*x');
		});
	});

	group('flatter', () => {

		function matchFlatter(input: string, output: any[]) {
			match(_.map(Flatter.run(Parser.parse(input)), e => Printer.run(e)), output);
		}

		test('flattens arbitrary structures', () => {
			matchFlatter('1', ['1']);
			matchFlatter('x', ['x']);
			matchFlatter('x+x', ['x', 'x']);
			matchFlatter('x*x', ['x', 'x']);
			matchFlatter('x*(y+y)', ['x', 'y+y']);
			matchFlatter('x*(y*y)', ['x', 'y', 'y']);
			matchFlatter('x*(y*z+x)', ['x', 'y*z+x']);
			matchFlatter('x*(y*z+x*z+x)', ['x', 'y*z+x*z+x']);
		});
	});

	group('decomposer', () => {
		
		function matchSumProduct(input: string, output: string) {
			match(Printer.run(Decomposer.run(Parser.parse(input))), output);
		}

		test('decomposes into sum product form', () => {
			matchSumProduct('x*(y+y)', 'x*y+x*y');
			matchSumProduct('x*(y*y)', 'x*y*y');
			matchSumProduct('x*(y*z+x)', 'x*y*z+x*x');
			matchSumProduct('x*(y*z+x*z+x)', 'x*y*z+x*x*z+x*x');
		});
	});

	group('simplifier', () => {

		function matchSumProduct(input: string, output: string) {
			match(Printer.run(Simplifier.run(Parser.parse(input))), output);
		}

		test('does simple simplifications', () => {
			matchSumProduct('1', '1');
			matchSumProduct('x', 'x');
			matchSumProduct('x*1', 'x');
			matchSumProduct('1*x', 'x');
			matchSumProduct('1*1', '1');
		});
	});

	group('variables', () => {

		function matchVariables(input: string, output: string[]) {
			match(Variables.run(Parser.parse(input)), output);
		}

		test('returns correct variables array', () => {
			matchVariables('1', []);
			matchVariables('1*1', []);
			matchVariables('x', ['x']);
			matchVariables('x*1', ['x']);
			matchVariables('1*x', ['x']);
			matchVariables('x*y', ['x', 'y']);
			matchVariables('x*(y*y)', ['x', 'y']);
			matchVariables('x*(y*z+x*z+x)', ['x', 'y', 'z']);
		});
	});

	group('replacer', () => {

		function matchReplacer(input: string, replacements: any[][], output: string) {
			match(Printer.run(Replacer.run(Parser.parse(input), replacements)), output);
		}

		test('replaces variables correctly', () => {

			var replacements = [['x', '1'], ['y', '2']];

			matchReplacer('1', replacements, '1');
			matchReplacer('x', replacements, '1');
			matchReplacer('y', replacements, '2');
			matchReplacer('x*y', replacements, '1*2');
		});
	});
}







