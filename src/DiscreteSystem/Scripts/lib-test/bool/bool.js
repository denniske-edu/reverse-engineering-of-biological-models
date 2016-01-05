var Test;
(function (Test) {
    var Printer = Bool.Printer;
    var Parser = Bool.Parser;
    Test.group('parser', function () {
        function matchParse(input, output) {
            Test.match(Printer.run(Parser.parse(input)), output);
        }
        Test.test('parses 0/1', function () {
            matchParse('0', '0');
            matchParse('1', '1');
        });
        Test.test('parses and/or/not', function () {
            matchParse('a&b', 'a&b');
            matchParse('a|b', 'a|b');
            matchParse('!a', '!a');
            matchParse('a|b|c', 'a|b|c');
        });
    });
})(Test || (Test = {}));
//# sourceMappingURL=bool.js.map