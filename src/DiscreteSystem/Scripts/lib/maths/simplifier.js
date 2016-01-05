var Maths;
(function (Maths) {
    /**
     * Simplifies a maths structure by the following actions:
     * - Replace 0*x or x*0 by 0
     * - Replace 1*x or x*1 by x
     *
     * Examples:
     *
     * 1	=> 1
     * x	=> x
     * x*1	=> x
     * 1*x	=> x
     * 1*1	=> 1
     */
    var Simplifier = (function () {
        function Simplifier() {
        }
        Simplifier.run = function (block) {
            if (block instanceof Maths.Add) {
                var add = block;
                if (add.left instanceof Maths.Block) {
                    add.left = Simplifier.run(add.left);
                }
                if (add.right instanceof Maths.Block) {
                    add.right = Simplifier.run(add.right);
                }
                return add;
            }
            if (block instanceof Maths.Mult) {
                var mult = block;
                if (mult.left instanceof Maths.Block) {
                    mult.left = Simplifier.run(mult.left);
                }
                if (mult.right instanceof Maths.Block) {
                    mult.right = Simplifier.run(mult.right);
                }
                if (mult.left === 0 || mult.right === 0)
                    return 0;
                if (mult.left === 1)
                    return mult.right;
                if (mult.right === 1)
                    return mult.left;
                return mult;
            }
            return block;
        };
        return Simplifier;
    })();
    Maths.Simplifier = Simplifier;
})(Maths || (Maths = {}));
//# sourceMappingURL=simplifier.js.map