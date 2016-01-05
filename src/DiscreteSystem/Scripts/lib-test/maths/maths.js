var Test;
(function (Test) {
    var Decomposer = Maths.Decomposer;
    var Flatter = Maths.Flatter;
    var Printer = Maths.Printer;
    var Simplifier = Maths.Simplifier;
    var Parser = Maths.Parser;
    var Variables = Maths.Variables;
    var Replacer = Maths.Replacer;
    Test.group('parser', function () {
        function matchParse(input, output) {
            Test.match(Printer.run(Parser.parse(input)), output);
        }
        Test.test('parses numbers', function () {
            matchParse('1', '1');
        });
        Test.test('parses add/mult of numbers', function () {
            matchParse('1+2', '1+2');
            matchParse('1*2', '1*2');
        });
        Test.test('knows operator precedence (* > +)', function () {
            matchParse('1*(2+2)', '1*(2+2)');
            matchParse('(2+2)*1', '(2+2)*1');
        });
        Test.test('parses variables', function () {
            matchParse('x', 'x');
        });
        Test.test('parses add/mult of variables', function () {
            matchParse('x+y', 'x+y');
            matchParse('x*y', 'x*y');
        });
        Test.test('knows operator precedence (* > +)', function () {
            matchParse('x*(y+y)', 'x*(y+y)');
            matchParse('(y+y)*x', '(y+y)*x');
        });
    });
    Test.group('flatter', function () {
        function matchFlatter(input, output) {
            Test.match(_.map(Flatter.run(Parser.parse(input)), function (e) { return Printer.run(e); }), output);
        }
        Test.test('flattens arbitrary structures', function () {
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
    Test.group('decomposer', function () {
        function matchSumProduct(input, output) {
            Test.match(Printer.run(Decomposer.run(Parser.parse(input))), output);
        }
        Test.test('decomposes into sum product form', function () {
            matchSumProduct('x*(y+y)', 'x*y+x*y');
            matchSumProduct('x*(y*y)', 'x*y*y');
            matchSumProduct('x*(y*z+x)', 'x*y*z+x*x');
            matchSumProduct('x*(y*z+x*z+x)', 'x*y*z+x*x*z+x*x');
        });
    });
    Test.group('simplifier', function () {
        function matchSumProduct(input, output) {
            Test.match(Printer.run(Simplifier.run(Parser.parse(input))), output);
        }
        Test.test('does simple simplifications', function () {
            matchSumProduct('1', '1');
            matchSumProduct('x', 'x');
            matchSumProduct('x*1', 'x');
            matchSumProduct('1*x', 'x');
            matchSumProduct('1*1', '1');
        });
    });
    Test.group('variables', function () {
        function matchVariables(input, output) {
            Test.match(Variables.run(Parser.parse(input)), output);
        }
        Test.test('returns correct variables array', function () {
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
    Test.group('replacer', function () {
        function matchReplacer(input, replacements, output) {
            Test.match(Printer.run(Replacer.run(Parser.parse(input), replacements)), output);
        }
        Test.test('replaces variables correctly', function () {
            var replacements = [['x', '1'], ['y', '2']];
            matchReplacer('1', replacements, '1');
            matchReplacer('x', replacements, '1');
            matchReplacer('y', replacements, '2');
            matchReplacer('x*y', replacements, '1*2');
        });
    });
})(Test || (Test = {}));
//# sourceMappingURL=maths.js.map