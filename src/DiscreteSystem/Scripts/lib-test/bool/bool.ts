
module Test {

	import Printer = Bool.Printer;
	import Parser = Bool.Parser;
	
	group('parser', () => {

		function matchParse(input: string, output: string) {
			match(Printer.run(Parser.parse(input)), output);
		}

		test('parses 0/1', () => {
			matchParse('0', '0');
			matchParse('1', '1');
		});

		test('parses and/or/not', () => {
			matchParse('a&b', 'a&b');
			matchParse('a|b', 'a|b');
			matchParse('!a', '!a');
			matchParse('a|b|c', 'a|b|c');
		});
	});
}







