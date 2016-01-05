var Maths;
(function (Maths) {
    /**
     * Prints a maths expression as string.
     *
     * Example output:
     *
     * '1*(2+2)'
     * '(2+2)*1'
     * 'x*(y+y)'
     * '(y+y)*x'
     */
    var Printer = (function () {
        function Printer() {
        }
        Printer.run = function (block, parent) {
            if (parent === void 0) { parent = null; }
            if (block instanceof Maths.Add) {
                var add = block;
                if (parent instanceof Maths.Mult) {
                    return '(' + Printer.run(add.left, block) + '+' + Printer.run(add.right, block) + ')';
                }
                return Printer.run(add.left, block) + '+' + Printer.run(add.right, block);
            }
            if (block instanceof Maths.Mult) {
                var mult = block;
                return Printer.run(mult.left, block) + '*' + Printer.run(mult.right, block);
            }
            return block.toString();
        };
        return Printer;
    })();
    Maths.Printer = Printer;
})(Maths || (Maths = {}));
//# sourceMappingURL=printer.js.map