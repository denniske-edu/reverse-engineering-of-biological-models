var DiscreteFan;
(function (_DiscreteFan) {
    var MathsParser = Maths.Parser;
    var PolynomialPrinter = Polynomials.PolynomialPrinter;
    var PolynomialParser = Polynomials.PolynomialParser;
    var IntegerRingModulo2 = Polynomials.IntegerRingModulo2;
    var IntegerRingModulo3 = Polynomials.IntegerRingModulo3;
    var System = Helper.System;
    var GroebnerAlgorithm = Algorithms.GroebnerAlgorithm;
    var DivisionAlgorithm = Algorithms.DivisionAlgorithm;
    var FastMathConverter = App.FastMathConverter;
    var Threshold = (function () {
        function Threshold(app, val, s) {
            if (val === void 0) { val = null; }
            if (s === void 0) { s = []; }
            this.app = app;
            this.s = ko.observable(s);
            this.val = ko.observable(val);
        }
        Threshold.prototype.remove = function () {
            this.app.removeThreshold(this);
        };
        return Threshold;
    })();
    _DiscreteFan.Threshold = Threshold;
    var InputItem = (function () {
        function InputItem(app, s) {
            if (s === void 0) { s = []; }
            this.app = app;
            this.s = ko.observable(s);
            this.variableHasFocus = ko.observable(false);
            this.expressionHasFocus = ko.observable(false);
            //this.variableLatex = ko.computed(() => {
            //	return this.getText(this.variable());
            //});
            //this.expressionLatex = ko.computed(() => {
            //	return this.getText(this.expression());
            //});
            //this.latex = ko.computed(() => {
            //	return this.getText(this.variable() + ' = ' + this.expression());
            //});
        }
        InputItem.prototype.remove = function () {
            this.app.removeInput(this);
        };
        InputItem.prototype.getText = function (input) {
            return input.replace(/!/g, ' \\lnot ').replace(/&/g, ' \\wedge ').replace(/\|/g, ' \\lor ');
        };
        return InputItem;
    })();
    _DiscreteFan.InputItem = InputItem;
    /**
     * Abstract base class of all parsers.
     *
     * @abstract
     */
    var DiscreteFan = (function () {
        function DiscreteFan() {
            this.computed = ko.observable(false);
            this.variables = ko.observableArray();
            this.thresholds = ko.observableArray();
            this.inputsDiscrete = ko.observableArray();
            this.inputs = ko.observableArray();
            this.inputs.push(new InputItem(this));
            this.ringExpressions = ko.observableArray();
            this.simplifiedExpressions = ko.observableArray();
            this.polynomialExpressions = ko.observableArray();
            this.replacedExpressions = ko.observableArray();
            this.groebnerExpressions = ko.observableArray();
            this.freeVariablesDict = ko.observableArray();
            this.boundVariables = ko.observableArray();
            this.freeVariables = ko.observableArray();
            this.polynomialSystemLatex = ko.observable('');
            this.reducedPolynomialSystemLatex = ko.observable('');
            this.vanishingIdealLatex = ko.observable('');
            //this.allVariables = ko.computed(() => {
            //	return this.boundVariables().concat(this.freeVariables());
            //});
            //this.inputsLatex = ko.computed(() => {
            //	return this.getEquationLatex(this.inputs());
            //});
            //this.ringExpressionsLatex = ko.computed(() => {
            //	return this.getEquationLatex(this.ringExpressions());
            //});
            //this.simplifiedExpressionsLatex = ko.computed(() => {
            //	return this.getEquationLatex(this.simplifiedExpressions());
            //});
            //this.polynomialExpressionsLatex = ko.computed(() => {
            //	return this.getEquationLatex(this.polynomialExpressions());
            //});
            //this.replacedExpressionsLatex = ko.computed(() => {
            //	return this.getEquationLatex(this.replacedExpressions());
            //});
            //this.groebnerExpressionsLatex = ko.computed(() => {
            //	return this.getEquationLatex(this.groebnerExpressions());
            //});
            //this.sampleII();
            //this.compute();
        }
        DiscreteFan.prototype.sampleI = function () {
            this.discretize = false;
            //1 1.6104 1.2042 1.0072
            //2 1.7073 1.3252 1.0185
            //3 1.7254 1.4118 1.0336
            //4 1.7011 1.4616 1.0508
            //5 1.6601 1.4814 1.0685
            // Z3-Ring
            System.ring = new IntegerRingModulo2();
            this.variables.removeAll();
            this.variables.push('M');
            this.variables.push('B');
            this.variables.push('A');
            this.variables.push('L');
            this.variables.push('P');
            this.inputs.removeAll();
            this.inputs.push(new InputItem(this, [0, 1, 0, 0, 0]));
            this.inputs.push(new InputItem(this, [0, 0, 0, 0, 0]));
            //this.inputs.push(new InputItem(this, [0, 0, 0, 0, 0]));
            this.inputs.push(new InputItem(this, [1, 1, 0, 0, 0]));
            this.inputs.push(new InputItem(this, [0, 1, 0, 0, 1]));
            this.inputs.push(new InputItem(this, [0, 0, 0, 1, 0]));
            //this.inputs.push(new InputItem(this, [0, 0, 0, 1, 0]));
            this.inputs.push(new InputItem(this, [1, 0, 1, 1, 0]));
            this.inputs.push(new InputItem(this, [1, 1, 1, 1, 1]));
            this.inputs.push(new InputItem(this, [0, 1, 0, 1, 0]));
            this.inputs.push(new InputItem(this, [0, 0, 1, 0, 0]));
            //this.inputs.push(new InputItem(this, [0, 1, 0, 0, 0]));
            //this.inputs.push(new InputItem(this, [0, 0, 0, 0, 0]));
            //this.inputs.push(new InputItem(this, [1, 1, 0, 0, 0]));
            //this.inputs.push(new InputItem(this, [0, 1, 0, 0, 1]));
            //this.inputs.push(new InputItem(this, [0, 0, 0, 1, 0]));
            //this.inputs.push(new InputItem(this, [1, 0, 1, 1, 0]));
            //this.inputs.push(new InputItem(this, [1, 1, 1, 1, 1]));
            //this.inputs.push(new InputItem(this, [0, 1, 0, 1, 0]));
            //this.inputs.push(new InputItem(this, [0, 0, 1, 0, 0]));
        };
        DiscreteFan.prototype.sampleII = function () {
            this.discretize = true;
            // Z3-Ring
            System.ring = new IntegerRingModulo3();
            this.variables.removeAll();
            this.variables.push('x_1');
            this.variables.push('x_2');
            this.variables.push('x_3');
            this.inputs.removeAll();
            this.inputs.push(new InputItem(this, [1.6104, 1.2042, 1.0072]));
            this.inputs.push(new InputItem(this, [1.7073, 1.3252, 1.0185]));
            this.inputs.push(new InputItem(this, [1.7254, 1.4118, 1.0336]));
            this.inputs.push(new InputItem(this, [1.7011, 1.4616, 1.0508]));
            this.inputs.push(new InputItem(this, [1.6601, 1.4814, 1.0685]));
            this.thresholds.removeAll();
            this.thresholds.push(new Threshold(this, -1, [null, null, null]));
            this.thresholds.push(new Threshold(this, 0, [1.65, 1.25, 1.02]));
            this.thresholds.push(new Threshold(this, 1, [1.702, 1.42, 1.05]));
        };
        DiscreteFan.prototype.toLatex = function (str) {
            return str.replace(/\*/g, ' '); // \\cdot 
        };
        DiscreteFan.prototype.getIdealLatex = function (equations) {
            var result = '';
            result += '\\begin{aligned}';
            result += ' ';
            result += ' I = \\;<\\;';
            for (var i = 0; i < equations.length; i++) {
                var input = equations[i];
                result += ' ';
                result += ' & ' + this.toLatex(PolynomialPrinter.run(input)) + (i < equations.length - 1 ? ',' : '>');
                result += ' ';
                result += ' ';
                result += '\\\\[8pt]';
                result += ' ';
            }
            result += ' ';
            result += '\\end{aligned}';
            return result;
        };
        DiscreteFan.prototype.getEquationLatex = function (equations) {
            var result = '';
            result += '\\begin{aligned}';
            result += ' ';
            for (var i = 0; i < equations.length; i++) {
                var input = equations[i];
                result += ' ';
                result += this.toLatex(input[0]);
                result += ' ';
                result += ' ';
                result += '& =';
                result += ' ';
                result += ' ';
                result += this.toLatex(input[1]);
                result += ' ';
                result += ' ';
                result += '\\\\[8pt]';
                result += ' ';
            }
            result += ' ';
            result += '\\end{aligned}';
            return result;
        };
        DiscreteFan.prototype.discretize1 = function (points, values, thresholds) {
            for (var i = 0; i < points.length; i++) {
                for (var j = 0; j < points[i].length; j++) {
                    var result = values[0];
                    for (var k = 1; k < thresholds.length; k++) {
                        if (points[i][j] >= thresholds[k][j])
                            result = values[k];
                    }
                    points[i][j] = result;
                }
            }
        };
        DiscreteFan.prototype.compute = function () {
            this.computed(true);
            var i;
            this.inputsDiscrete.removeAll();
            var points = [];
            var values = [];
            var thresholds = [];
            for (i = 0; i < this.inputs().length; i++) {
                var input = this.inputs()[i];
                points.push([].concat(input.s()));
            }
            for (i = 0; i < this.thresholds().length; i++) {
                var threshold = this.thresholds()[i];
                values.push(threshold.val());
                thresholds.push(threshold.s());
            }
            if (this.discretize)
                this.discretize1(points, values, thresholds);
            for (i = 0; i < points.length; i++) {
                var point = points[i];
                this.inputsDiscrete.push(new InputItem(this, point));
            }
            // Polynomial system
            //var firstDifference = (a: number[], b: number[]) => {
            //	var i = 0;
            //	while (i < a.length && a[i] === b[i]) i++;
            //	if (i === a.length) return -1;
            //	return i;
            //}
            //System.variables = ['t'].concat(this.variables());
            //var polynomialSystem: Polynomials.Polynomial[] = [];
            //for (var l = 0; l < points.length-1; l++) {
            //	results.push(points[l + 1]);
            //}
            //results.push(null);
            //for (var l = 0; l < 2; l++) {
            //	results.push(points[l + 1]);
            //}
            //results.push(null);
            //for (var l = 3; l < 6; l++) {
            //	results.push(points[l + 1]);
            //}
            //results.push(null);
            //for (var l = 7; l < 8; l++) {
            //	results.push(points[l + 1]);
            //}
            //results.push(null);
            //for (var l = 9; l < 10; l++) {
            //	results.push(points[l + 1]);
            //}
            //results.push(null);
            //for (i = 0; i < this.variables().length; i++) {
            //	var variable = this.variables()[i];
            //	var poly = new Polynomials.Polynomial();
            //	for (var j = 0; j < points.length-1; j++) {
            //		if(results[j] == null) continue;
            //		var f = PolynomialParser.parse(results[j][i].toString());
            //		var alreadyAdded = [];
            //		for (var k = 0; k < points.length; k++) {
            //			//if (j === k) continue;
            //			var ind = firstDifference(points[j], points[k]);
            //			if (ind === -1) continue;
            //			if (_.any(alreadyAdded, p => p[0] === ind && p[1] === points[j][ind] - points[k][ind])) continue;
            //			alreadyAdded.push([ind, points[j][ind] - points[k][ind]]);
            //			var t = `(${points[j][ind]}~${points[k][ind]})*(${this.variables()[ind]}~${points[k][ind]})`; // ^(p-2)
            //			var p = FastMathConverter.run(MathsParser.parse(t));
            //			var test1 = PolynomialPrinter.run(f);
            //			f = f.multiply(p);
            //			var test1b = PolynomialPrinter.run(f);
            //		}
            //		var test2a = PolynomialPrinter.run(poly);
            //		poly = poly.add(f);
            //		var test2b = PolynomialPrinter.run(poly);
            //	}
            //	polynomialSystem.push(poly);
            //}
            var firstDifference = function (a, b) {
                var i = 0;
                while (i < a.length && a[i] === b[i])
                    i++;
                if (i === a.length)
                    return -1;
                return i;
            };
            System.variables = ['t'].concat(this.variables());
            var polynomialSystem = [];
            for (i = 0; i < this.variables().length; i++) {
                var variable = this.variables()[i];
                var poly = new Polynomials.Polynomial();
                for (var j = 0; j < points.length - 1; j++) {
                    var f = PolynomialParser.parse(points[j + 1][i].toString());
                    var alreadyAdded = [];
                    for (var k = 0; k < points.length; k++) {
                        var ind = firstDifference(points[j], points[k]);
                        if (ind === -1)
                            continue;
                        if (_.any(alreadyAdded, function (p) { return p[0] === ind && p[1] === points[j][ind] - points[k][ind]; }))
                            continue;
                        alreadyAdded.push([ind, points[j][ind] - points[k][ind]]);
                        var t = "(" + points[j][ind] + "~" + points[k][ind] + ")*(" + this.variables()[ind] + "~" + points[k][ind] + ")"; // ^(p-2)
                        var p = FastMathConverter.run(MathsParser.parse(t));
                        var test1 = PolynomialPrinter.run(f);
                        f = f.multiply(p);
                        var test1b = PolynomialPrinter.run(f);
                    }
                    var test2a = PolynomialPrinter.run(poly);
                    poly = poly.add(f);
                    var test2b = PolynomialPrinter.run(poly);
                }
                polynomialSystem.push(poly);
            }
            var polynomialSystemArray = [];
            for (var m = 0; m < polynomialSystem.length; m++) {
                polynomialSystem[m].order();
                polynomialSystemArray.push([("f_" + (m + 1) + "^0"), PolynomialPrinter.run(polynomialSystem[m])]);
            }
            this.polynomialSystemLatex(this.getEquationLatex(polynomialSystemArray));
            // Vanishing ideal
            var maximalIdeals = [];
            for (i = 0; i < points.length; i++) {
                var g = [];
                for (j = 0; j < this.variables().length; j++) {
                    var variable = this.variables()[j];
                    var t = "(" + variable + "~" + points[i][j] + ")";
                    var p = FastMathConverter.run(MathsParser.parse(t));
                    g.push(p);
                }
                maximalIdeals.push(g);
            }
            //var temps: string[][] = [
            //	['x1+1', 'x2+1', 'x3+1'],
            //	['x1~1', 'x2', 'x3+1', 'x3'],
            //	['x1', 'x2~1', 'x3~1']
            //];
            //for (var l = 0; l < temps.length; l++) {
            //	maximalIdeals.push(_.map(temps[l], s => FastMathConverter.run(MathsParser.parse(s))));
            //}
            var test1b = PolynomialPrinter.run(maximalIdeals[0][0]);
            while (maximalIdeals.length > 1) {
                var a = maximalIdeals.shift();
                var b = maximalIdeals.shift();
                a = _.map(a, function (p) { return p.multiply(PolynomialParser.parse('t')); });
                b = _.map(b, function (p) { return p.multiply(PolynomialParser.parse('1-t')); });
                //_.each(a, p => p.order());
                //_.map(b, p => p.order());
                var both = a.concat(b);
                var F = GroebnerAlgorithm.run(both);
                var G = _.filter(F, function (p) { return !p.hasVariable(System.variables.indexOf('t')); });
                maximalIdeals.push(G);
            }
            var vanishingIdeal = maximalIdeals[0];
            _.each(vanishingIdeal, function (p) { return p.order(); });
            //vanishingIdeal = vanishingIdeal.slice(0, 3);
            this.vanishingIdealLatex(this.getIdealLatex(vanishingIdeal));
            // Reduce polynomial system
            var reducedPolynomialSystem = [];
            for (var l = 0; l < polynomialSystem.length; l++) {
                var polyn = polynomialSystem[l];
                var result = DivisionAlgorithm.run(polyn, vanishingIdeal);
                reducedPolynomialSystem.push(result.r);
            }
            var reducedPolynomialSystemArray = [];
            for (var m = 0; m < reducedPolynomialSystem.length; m++) {
                reducedPolynomialSystem[m].order();
                reducedPolynomialSystemArray.push([("f_" + (m + 1)), PolynomialPrinter.run(reducedPolynomialSystem[m])]);
            }
            this.reducedPolynomialSystemLatex(this.getEquationLatex(reducedPolynomialSystemArray));
        };
        DiscreteFan.prototype.clear = function () {
            this.ringExpressions.removeAll();
            this.simplifiedExpressions.removeAll();
            this.polynomialExpressions.removeAll();
            this.replacedExpressions.removeAll();
            this.groebnerExpressions.removeAll();
            this.computed(false);
        };
        DiscreteFan.prototype.addInput = function () {
            this.inputs.push(new InputItem(this));
        };
        DiscreteFan.prototype.removeInput = function (e) {
            this.inputs.remove(e);
        };
        DiscreteFan.prototype.addThreshold = function () {
            this.thresholds.push(new Threshold(this));
        };
        DiscreteFan.prototype.removeThreshold = function (e) {
            this.thresholds.remove(e);
        };
        return DiscreteFan;
    })();
    _DiscreteFan.DiscreteFan = DiscreteFan;
})(DiscreteFan || (DiscreteFan = {}));
//# sourceMappingURL=discrete-fan.js.map