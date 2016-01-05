var Maths;
(function (Maths) {
    /**
     * Returns all variables used in a maths structure.
     *
     * Examples:
     *
     * 1*x				=> ['x']
     * x*y				=> ['x', 'y']
     * x*(y*y)			=> ['x', 'y']
     * x*(y*z+x*z+x)	=> ['x', 'y', 'z']
     */
    var Variables = (function () {
        function Variables() {
        }
        Variables.run = function (block, vars) {
            if (vars === void 0) { vars = []; }
            if (block instanceof Maths.Add) {
                var add = block;
                Variables.run(add.left, vars);
                Variables.run(add.right, vars);
                return vars;
            }
            if (block instanceof Maths.Mult) {
                var mult = block;
                Variables.run(mult.left, vars);
                Variables.run(mult.right, vars);
                return vars;
            }
            if (!$.isNumeric(block) && vars.indexOf(block) === -1) {
                vars.push(block);
            }
            return vars;
        };
        return Variables;
    })();
    Maths.Variables = Variables;
})(Maths || (Maths = {}));
//# sourceMappingURL=variables.js.map