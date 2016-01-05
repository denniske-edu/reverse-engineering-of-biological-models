var Test;
(function (Test) {
    var IntegerRingModulo2 = Polynomials.IntegerRingModulo2;
    Test.group('rings', function () {
        Test.test('IntegerRingModulo2', function () {
            var ring = new IntegerRingModulo2();
            Test.match(ring.val(0), 0);
            Test.match(ring.val(1), 1);
            Test.match(ring.val(2), 0);
            Test.match(ring.val(-0), 0);
            Test.match(ring.val(-1), 1);
            Test.match(ring.val(-2), 0);
            Test.match(ring.add(0, 0), 0);
            Test.match(ring.add(0, 1), 1);
            Test.match(ring.add(0, 2), 0);
            Test.match(ring.add(1, 0), 1);
            Test.match(ring.add(1, 1), 0);
            Test.match(ring.add(1, 2), 1);
            Test.match(ring.add(2, 0), 0);
            Test.match(ring.add(2, 1), 1);
            Test.match(ring.add(2, 2), 0);
        });
    });
})(Test || (Test = {}));
//# sourceMappingURL=rings.js.map