var Bool;
(function (Bool) {
    /**
     * Prints a bool expression as string.
     *
     * Example output:
     *
     * 'a&b'
     * 'a|b'
     */
    var Printer = (function () {
        function Printer() {
        }
        Printer.run = function (block, parent) {
            if (parent === void 0) { parent = null; }
            if (block instanceof Bool.And) {
                var add = block;
                if (parent instanceof Bool.And) {
                    return '(' + Printer.run(add.left, block) + '&' + Printer.run(add.right, block) + ')';
                }
                return Printer.run(add.left, block) + '&' + Printer.run(add.right, block);
            }
            if (block instanceof Bool.Or) {
                var mult = block;
                return Printer.run(mult.left, block) + '|' + Printer.run(mult.right, block);
            }
            if (block instanceof Bool.Not) {
                var not = block;
                return '!' + Printer.run(not.child, block);
            }
            if (block === true)
                return '1';
            if (block === false)
                return '0';
            return block;
        };
        return Printer;
    })();
    Bool.Printer = Printer;
})(Bool || (Bool = {}));
//# sourceMappingURL=printer.js.map