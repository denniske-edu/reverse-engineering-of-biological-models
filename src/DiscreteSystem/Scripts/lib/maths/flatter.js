var Maths;
(function (Maths) {
    /**
     * Flattens maths data structure partly by concatenating structures
     * of the same type (e.g. multiple consecuting Add/Mult blocks).
     *
     * Examples (for Add):
     *
     * x+x				=> ['x', 'x']
     *
     * Examples (for Mult):
     *
     * x*x				=> ['x', 'x']
     * x*(y+y)			=> ['x', 'y+y']
     * x*(y*y)			=> ['x', 'y', 'y']
     * x*(y*z+x)		=> ['x', 'y*z+x']
     * x*(y*z+x*z+x)	=> ['x', 'y*z+x*z+x']
     */
    var Flatter = (function () {
        function Flatter() {
        }
        Flatter.run = function (block) {
            var blocks = [];
            if (block instanceof Maths.Add) {
                var add = block;
                if (add.left instanceof Maths.Add) {
                    blocks = blocks.concat(Flatter.run(add.left));
                }
                else {
                    blocks.push(add.left);
                }
                if (add.right instanceof Maths.Add) {
                    blocks = blocks.concat(Flatter.run(add.right));
                }
                else {
                    blocks.push(add.right);
                }
                return blocks;
            }
            if (block instanceof Maths.Mult) {
                var mult = block;
                if (mult.left instanceof Maths.Mult) {
                    blocks = blocks.concat(Flatter.run(mult.left));
                }
                else {
                    blocks.push(mult.left);
                }
                if (mult.right instanceof Maths.Mult) {
                    blocks = blocks.concat(Flatter.run(mult.right));
                }
                else {
                    blocks.push(mult.right);
                }
                return blocks;
            }
            blocks.push(block);
            return blocks;
        };
        return Flatter;
    })();
    Maths.Flatter = Flatter;
})(Maths || (Maths = {}));
//# sourceMappingURL=flatter.js.map