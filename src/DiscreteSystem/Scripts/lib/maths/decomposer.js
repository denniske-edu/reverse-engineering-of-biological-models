var Maths;
(function (Maths) {
    /**
     * Sum-Product Decomposition
     *
     * Examples:
     *
     * x*(y+y)			=>	x*y + x*y
     * x*(y*y)			=>	x*y*y
     * x*(y*z+x)		=>	x*y*z + x*x
     * x*(y*z+x*z+x)	=>	x*y*z + x*x*z + x*x
     */
    var Decomposer = (function () {
        function Decomposer() {
        }
        Decomposer.run = function (block) {
            if (block instanceof Maths.Add) {
                var add = block;
                if (add.left instanceof Maths.Block) {
                    add.left = Decomposer.run(add.left);
                }
                if (add.right instanceof Maths.Block) {
                    add.right = Decomposer.run(add.right);
                }
                return add;
            }
            if (block instanceof Maths.Mult) {
                var mult = block;
                if (mult.left instanceof Maths.Block) {
                    mult.left = Decomposer.run(mult.left);
                }
                if (mult.right instanceof Maths.Block) {
                    mult.right = Decomposer.run(mult.right);
                }
                var left, right;
                if (mult.left instanceof Maths.Add) {
                    left = Maths.Flatter.run(mult.left);
                }
                else {
                    left = [mult.left];
                }
                if (mult.right instanceof Maths.Add) {
                    right = Maths.Flatter.run(mult.right);
                }
                else {
                    right = [mult.right];
                }
                var last = null;
                for (var i = 0; i < left.length; i++) {
                    for (var j = 0; j < right.length; j++) {
                        if (last == null) {
                            last = new Maths.Mult(left[i], right[j]);
                        }
                        else {
                            last = new Maths.Add(last, new Maths.Mult(left[i], right[j]));
                        }
                    }
                }
                return last;
            }
            return block;
        };
        return Decomposer;
    })();
    Maths.Decomposer = Decomposer;
})(Maths || (Maths = {}));
//# sourceMappingURL=decomposer.js.map