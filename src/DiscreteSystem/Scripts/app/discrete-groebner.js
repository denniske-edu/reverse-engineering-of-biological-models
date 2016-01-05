var DiscreteGroebner;
(function (_DiscreteGroebner) {
    var BoolParser = Bool.Parser;
    var MathsParser = Maths.Parser;
    var MathsPrinter = Maths.Printer;
    var Decomposer = Maths.Decomposer;
    var Simplifier = Maths.Simplifier;
    var PolynomialPrinter = Polynomials.PolynomialPrinter;
    var PolynomialParser = Polynomials.PolynomialParser;
    var Variables = Maths.Variables;
    var Replacer = Maths.Replacer;
    var IntegerRingModulo2 = Polynomials.IntegerRingModulo2;
    var System = Helper.System;
    var GroebnerAlgorithm = Algorithms.GroebnerAlgorithm;
    var Plex = Polynomials.Plex;
    var Converter = App.Converter;
    var Item = (function () {
        function Item(key, value) {
            this.value = value;
            this.key = key;
        }
        return Item;
    })();
    _DiscreteGroebner.Item = Item;
    var InputItem = (function () {
        function InputItem(app, variable, expression) {
            var _this = this;
            if (variable === void 0) { variable = ''; }
            if (expression === void 0) { expression = ''; }
            this.app = app;
            this.expression = ko.observable(expression);
            this.variable = ko.observable(variable);
            this.variableHasFocus = ko.observable(false);
            this.expressionHasFocus = ko.observable(false);
            this.variableLatex = ko.computed(function () {
                return _this.getText(_this.variable());
            });
            this.expressionLatex = ko.computed(function () {
                return _this.getText(_this.expression());
            });
            this.latex = ko.computed(function () {
                return _this.getText(_this.variable() + ' = ' + _this.expression());
            });
        }
        InputItem.prototype.remove = function () {
            this.app.removeInput(this);
        };
        InputItem.prototype.getText = function (input) {
            return input.replace(/!/g, ' \\lnot ').replace(/&/g, ' \\wedge ').replace(/\|/g, ' \\lor ');
        };
        return InputItem;
    })();
    _DiscreteGroebner.InputItem = InputItem;
    /**
     * Abstract base class of all parsers.
     *
     * @abstract
     */
    var DiscreteGroebner = (function () {
        function DiscreteGroebner() {
            var _this = this;
            // Z2-Ring
            System.ring = new IntegerRingModulo2();
            this.computed = ko.observable(false);
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
            this.allVariables = ko.computed(function () {
                return _this.boundVariables().concat(_this.freeVariables());
            });
            this.inputsLatex = ko.computed(function () {
                return _this.getEquationLatex(_this.inputs());
            });
            this.ringExpressionsLatex = ko.computed(function () {
                return _this.getEquationLatex(_this.ringExpressions());
            });
            this.simplifiedExpressionsLatex = ko.computed(function () {
                return _this.getEquationLatex(_this.simplifiedExpressions());
            });
            this.polynomialExpressionsLatex = ko.computed(function () {
                return _this.getEquationLatex(_this.polynomialExpressions());
            });
            this.replacedExpressionsLatex = ko.computed(function () {
                return _this.getEquationLatex(_this.replacedExpressions());
            });
            this.groebnerExpressionsLatex = ko.computed(function () {
                return _this.getEquationLatex(_this.groebnerExpressions());
            });
        }
        DiscreteGroebner.prototype.getEquationLatex = function (equations) {
            var result = '';
            result += '\\begin{aligned}';
            result += ' ';
            for (var i = 0; i < equations.length; i++) {
                var input = equations[i];
                if (input.variable().length > 0) {
                    result += ' ';
                    result += input.variableLatex();
                    result += ' ';
                    result += ' ';
                    result += '& =';
                    result += ' ';
                }
                result += ' ';
                result += input.expressionLatex();
                result += ' ';
                result += ' ';
                result += '\\\\[8pt]';
                result += ' ';
            }
            result += ' ';
            result += '\\end{aligned}';
            return result;
        };
        DiscreteGroebner.prototype.compute = function () {
            this.computed(true);
            var i;
            var vari;
            var expr;
            var expression;
            // Ring
            this.ringExpressions.removeAll();
            for (i = 0; i < this.inputs().length; i++) {
                var input = this.inputs()[i];
                vari = input.variable();
                expr = MathsPrinter.run(Converter.run(BoolParser.parse(input.expression())));
                this.ringExpressions.push(new InputItem(this, vari, expr));
            }
            // Simplified
            this.simplifiedExpressions.removeAll();
            for (i = 0; i < this.ringExpressions().length; i++) {
                expression = this.ringExpressions()[i];
                vari = expression.variable();
                expr = MathsPrinter.run(Simplifier.run(Decomposer.run(MathsParser.parse(expression.expression()))));
                this.simplifiedExpressions.push(new InputItem(this, vari, expr));
            }
            // Bound / Free variables
            var boundVariables = [];
            var freeVariables = [];
            for (i = 0; i < this.simplifiedExpressions().length; i++) {
                expression = this.simplifiedExpressions()[i];
                vari = expression.variable();
                boundVariables = boundVariables.concat(Variables.run(vari));
                expr = expression.expression();
                freeVariables = freeVariables.concat(Variables.run(MathsParser.parse(expr)));
            }
            for (i = 0; i < boundVariables.length; i++) {
                freeVariables = _.without(freeVariables, boundVariables[i]);
            }
            freeVariables = _.uniq(freeVariables);
            var freeVariablesDict = _.map(freeVariables, function (v) { return new Item(v, 0); });
            this.boundVariables(boundVariables);
            this.freeVariables(freeVariables);
            this.freeVariablesDict(freeVariablesDict);
            // Polynomial
            System.variables = this.allVariables();
            this.polynomialExpressions.removeAll();
            for (i = 0; i < this.simplifiedExpressions().length; i++) {
                expression = this.simplifiedExpressions()[i];
                expr = expression.expression() + ' - ' + expression.variable();
                expr = PolynomialPrinter.run(PolynomialParser.parse(expr));
                this.polynomialExpressions.push(new InputItem(this, '0', expr));
            }
            this.computeGroebner();
        };
        DiscreteGroebner.prototype.computeGroebner = function () {
            var i;
            var vari;
            var expr;
            var expression;
            // Replace free variables
            System.variables = this.boundVariables();
            var F = [];
            var replacements = _.map(this.freeVariablesDict(), function (item) { return [item.key, item.value]; });
            this.replacedExpressions.removeAll();
            for (i = 0; i < this.simplifiedExpressions().length; i++) {
                expression = this.simplifiedExpressions()[i];
                vari = expression.variable();
                expr = MathsPrinter.run(Simplifier.run(Decomposer.run(Replacer.run(MathsParser.parse(expression.expression()), replacements))));
                expr = expr + ' - ' + vari;
                expr = PolynomialPrinter.run(PolynomialParser.parse(expr));
                this.replacedExpressions.push(new InputItem(this, '0', expr));
                F.push(PolynomialParser.parse(expr));
            }
            // Groebner basis
            var groebner = GroebnerAlgorithm.run(F, new Plex());
            this.groebnerExpressions.removeAll();
            for (i = 0; i < groebner.length; i++) {
                expression = groebner[i];
                expr = PolynomialPrinter.run(expression);
                this.groebnerExpressions.push(new InputItem(this, '0', expr));
            }
        };
        DiscreteGroebner.prototype.clear = function () {
            this.ringExpressions.removeAll();
            this.simplifiedExpressions.removeAll();
            this.polynomialExpressions.removeAll();
            this.replacedExpressions.removeAll();
            this.groebnerExpressions.removeAll();
            this.computed(false);
        };
        DiscreteGroebner.prototype.sampleI = function () {
            this.inputs.removeAll();
            this.inputs.push(new InputItem(this, 'A', 'A & B'));
            this.inputs.push(new InputItem(this, 'B', '!A'));
        };
        DiscreteGroebner.prototype.sampleII = function () {
            this.inputs.removeAll();
            this.inputs.push(new InputItem(this, 'A', '!A'));
            this.inputs.push(new InputItem(this, 'B', 'B'));
        };
        DiscreteGroebner.prototype.sampleIII = function () {
            this.inputs.removeAll();
            this.inputs.push(new InputItem(this, 'M', '!R & C'));
            this.inputs.push(new InputItem(this, 'P', 'M'));
            this.inputs.push(new InputItem(this, 'B', 'M'));
            this.inputs.push(new InputItem(this, 'C', '!g'));
            this.inputs.push(new InputItem(this, 'R', '!A & !A_l'));
            this.inputs.push(new InputItem(this, 'A', 'L & B'));
            this.inputs.push(new InputItem(this, 'A_l', 'A | L | L_l'));
            this.inputs.push(new InputItem(this, 'L', '!g & P & a'));
            this.inputs.push(new InputItem(this, 'L_l', '!g & (L | a)'));
        };
        DiscreteGroebner.prototype.addInput = function () {
            this.inputs.push(new InputItem(this));
        };
        DiscreteGroebner.prototype.removeInput = function (e) {
            this.inputs.remove(e);
        };
        return DiscreteGroebner;
    })();
    _DiscreteGroebner.DiscreteGroebner = DiscreteGroebner;
})(DiscreteGroebner || (DiscreteGroebner = {}));
//# sourceMappingURL=discrete-groebner.js.map