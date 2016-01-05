var App;
(function (App) {
    var Add = Maths.Add;
    var And = Bool.And;
    var Or = Bool.Or;
    var Not = Bool.Not;
    var Mult = Maths.Mult;
    /**
     * NOTE: Works only in the ring IntegerRingModulo2.
     *
     * Converts a bool expression into a math expression by using the
     * following conversion rules:
     *
     * - a & b	=>	a * b
     * - a | b	=>	a + b + a * b
     * - !a		=>	a + 1
     *
     * Examples:
     *
     * !a		=>	a+1
     * !a&b		=>	(a+1)*b
     * !a&!b	=>	(a+1)*(b+1)
     *
     * @abstract
     */
    var Converter = (function () {
        function Converter() {
        }
        Converter.run = function (block) {
            if (block instanceof And) {
                var and = block;
                and.left = Converter.run(and.left);
                and.right = Converter.run(and.right);
                return new Mult(and.left, and.right);
            }
            if (block instanceof Or) {
                var or = block;
                or.left = Converter.run(or.left);
                or.right = Converter.run(or.right);
                return new Add(or.left, new Add(or.right, new Mult(or.left, or.right)));
            }
            if (block instanceof Not) {
                var not = block;
                not.child = Converter.run(not.child);
                return new Add(not.child, 1);
            }
            if (block === true)
                return 1;
            if (block === false)
                return 0;
            return block;
        };
        return Converter;
    })();
    App.Converter = Converter;
})(App || (App = {}));
//# sourceMappingURL=converter.js.map