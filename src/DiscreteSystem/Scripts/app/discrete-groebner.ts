
declare var ko;

module DiscreteGroebner {
	import BoolParser = Bool.Parser;
	import MathsParser = Maths.Parser;
	import MathsPrinter = Maths.Printer;
	import Decomposer = Maths.Decomposer;
	import Simplifier = Maths.Simplifier;
	import PolynomialPrinter = Polynomials.PolynomialPrinter;
	import PolynomialParser = Polynomials.PolynomialParser;
	import Variables = Maths.Variables;
	import Replacer = Maths.Replacer;
	import IntegerRingModulo2 = Polynomials.IntegerRingModulo2;
	import System = Helper.System;
	import GroebnerAlgorithm = Algorithms.GroebnerAlgorithm;
	import Plex = Polynomials.Plex;
	import Converter = App.Converter;

	export class Item {

		key: string;
		value: number;

		constructor(key:string, value:number) {
			this.value = value;
			this.key = key;
		}
	}

	export class InputItem {

		variable;
		expression;

		variableHasFocus;
		expressionHasFocus;

		latex;
		app: DiscreteGroebner;

		constructor(app: DiscreteGroebner, variable = '', expression = '') {
			this.app = app;
			this.expression = ko.observable(expression);
			this.variable = ko.observable(variable);

			this.variableHasFocus = ko.observable(false);
			this.expressionHasFocus = ko.observable(false);

			this.variableLatex = ko.computed(() => {
				return this.getText(this.variable());
			});

			this.expressionLatex = ko.computed(() => {
				return this.getText(this.expression());
			});

			this.latex = ko.computed(() => {
				return this.getText(this.variable() + ' = ' + this.expression());
			});
		}
		
		remove() {

			this.app.removeInput(this);
		}

		getText(input: string): string {

			return input.replace(/!/g, ' \\lnot ')
				.replace(/&/g, ' \\wedge ')
				.replace(/\|/g, ' \\lor ');
		}

		variableLatex;
		expressionLatex;
	}

    /**
     * Abstract base class of all parsers.
     *
     * @abstract
     */
	export class DiscreteGroebner {

		inputs;
		ringExpressions;
		simplifiedExpressions;

		computed;

		constructor() {

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

			this.allVariables = ko.computed(() => {
				return this.boundVariables().concat(this.freeVariables());
			});
			
			this.inputsLatex = ko.computed(() => {
				return this.getEquationLatex(this.inputs());
			});

			this.ringExpressionsLatex = ko.computed(() => {
				return this.getEquationLatex(this.ringExpressions());
			});

			this.simplifiedExpressionsLatex = ko.computed(() => {
				return this.getEquationLatex(this.simplifiedExpressions());
			});

			this.polynomialExpressionsLatex = ko.computed(() => {
				return this.getEquationLatex(this.polynomialExpressions());
			});

			this.replacedExpressionsLatex = ko.computed(() => {
				return this.getEquationLatex(this.replacedExpressions());
			});
			
			this.groebnerExpressionsLatex = ko.computed(() => {
				return this.getEquationLatex(this.groebnerExpressions());
			});
		}

		getEquationLatex(equations): string {
			
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
		}
		
		compute() {

			this.computed(true);

			var i: number;
			var vari;
			var expr: string;

			var expression;

			// Ring

			this.ringExpressions.removeAll();
			
			for (i = 0; i < this.inputs().length; i++) {
				var input = this.inputs()[i];

				vari = input.variable();
				expr = MathsPrinter.run(
					Converter.run(BoolParser.parse(input.expression()))
				);

				this.ringExpressions.push(new InputItem(this, vari, expr));
			}
			
			// Simplified

			this.simplifiedExpressions.removeAll();
			
			for (i = 0; i < this.ringExpressions().length; i++) {
				expression = this.ringExpressions()[i];

				vari = expression.variable();
				expr = MathsPrinter.run(
					Simplifier.run(Decomposer.run(MathsParser.parse(expression.expression())))
				);

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

			var freeVariablesDict = _.map(freeVariables, v => new Item(v, 0));

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
		}

		computeGroebner() {
			
			var i: number;
			var vari;
			var expr: string;

			var expression;

			// Replace free variables

			System.variables = this.boundVariables();

			var F = [];

			var replacements = _.map(this.freeVariablesDict(), (item: Item) => [item.key, item.value]);

			this.replacedExpressions.removeAll();

			for (i = 0; i < this.simplifiedExpressions().length; i++) {
				expression = this.simplifiedExpressions()[i];

				vari = expression.variable();

				expr = MathsPrinter.run(
					Simplifier.run(Decomposer.run(
						Replacer.run(MathsParser.parse(expression.expression()), replacements)
						))
					);

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
		}

		clear() {

			this.ringExpressions.removeAll();
			this.simplifiedExpressions.removeAll();
			this.polynomialExpressions.removeAll();
			this.replacedExpressions.removeAll();
			this.groebnerExpressions.removeAll();

			this.computed(false);
		}

		sampleI() {

			this.inputs.removeAll();
			this.inputs.push(new InputItem(this, 'A', 'A & B'));
			this.inputs.push(new InputItem(this, 'B', '!A'));
		}

		sampleII() {

			this.inputs.removeAll();
			this.inputs.push(new InputItem(this, 'A', '!A'));
			this.inputs.push(new InputItem(this, 'B', 'B'));
		}

		sampleIII() {

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
		}
		
		addInput() {

			this.inputs.push(new InputItem(this));
		}

		removeInput(e) {

			this.inputs.remove(e);
		}

		ringExpressionsLatex;
		simplifiedExpressionsLatex;
		inputsLatex;
		polynomialExpressions;
		polynomialExpressionsLatex;
		replacedExpressions;
		replacedExpressionsLatex;
		groebnerExpressions;
		groebnerExpressionsLatex;
		boundVariables;
		freeVariables;
		freeVariablesDict;
		allVariables;
	}
}

