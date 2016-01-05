var Test;
(function (Test) {
    var NumberAlgorithm = Algorithms.NumberAlgorithm;
    Test.group('number', function () {
        Test.test('greatestCommonDivisor / leastCommonMultiple', function () {
            Test.match(NumberAlgorithm.greatestCommonDivisor(12, 18), 6);
            Test.match(NumberAlgorithm.greatestCommonDivisor(3528, 3780), 252);
            Test.match(NumberAlgorithm.leastCommonMultiple(12, 18), 36);
            Test.match(NumberAlgorithm.leastCommonMultiple(3528, 3780), 52920);
        });
    });
})(Test || (Test = {}));
//# sourceMappingURL=number.js.map