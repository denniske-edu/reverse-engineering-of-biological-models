var Maths;
(function (Maths) {
    /**
     * Replaces variables by another variable or value.
     *
     * Examples:
     *
     * var replacements = [['x', '1'], ['y', '2']];
     *
     * 1	=> '1'
     * x	=> '1'
     * y	=> '2'
     * x*y	=> '1*2'
     */
    var Replacer = (function () {
        function Replacer() {
        }
        Replacer.run = function (block, replacements) {
            if (replacements === void 0) { replacements = []; }
            if (block instanceof Maths.Add) {
                var add = block;
                add.left = Replacer.run(add.left, replacements);
                add.right = Replacer.run(add.right, replacements);
                return add;
            }
            if (block instanceof Maths.Mult) {
                var mult = block;
                mult.left = Replacer.run(mult.left, replacements);
                mult.right = Replacer.run(mult.right, replacements);
                return mult;
            }
            var replacement = _.find(replacements, function (r) { return r[0] === block; });
            if (replacement != null) {
                return replacement[1];
            }
            return block;
        };
        return Replacer;
    })();
    Maths.Replacer = Replacer;
})(Maths || (Maths = {}));
//# sourceMappingURL=replacer.js.map