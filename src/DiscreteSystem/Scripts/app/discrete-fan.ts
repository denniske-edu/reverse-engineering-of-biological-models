
declare var ko;

module DiscreteFan {
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
	import IntegerRingModulo = Polynomials.IntegerRingModulo;
	import IntegerRingModulo3Special = Polynomials.IntegerRingModulo3Special;
	import System = Helper.System;
	import GroebnerAlgorithm = Algorithms.GroebnerAlgorithm;
	import DivisionAlgorithm = Algorithms.DivisionAlgorithm;
	import Plex = Polynomials.Plex;
	import Converter = App.Converter;
	import FastMathConverter = App.FastMathConverter;
	

	export class Threshold {

		s;
		val;

		app: DiscreteFan;

		constructor(app: DiscreteFan, val = null, s = []) {
			this.app = app;
			this.s = ko.observableArray(s);
			this.val = ko.observable(val);
		}

		remove() {

			this.app.removeThreshold(this);
		}
	}


	export class InputVariable {

		v: () => string;
		app: DiscreteFan;

		constructor(app: DiscreteFan, v = '') {
			this.app = app;
			this.v = ko.observable(v);
		}

		remove() {

			this.app.removeVariable(this);
		}
	}


	export class InputItem {

		s;
		app: DiscreteFan;

		constructor(app: DiscreteFan, s = []) {
			this.app = app;
			this.s = ko.observableArray(s);
		}

		remove() {
			this.app.removeInput(this);
		}
	}


	export class ConeItem {

		basis;
		basisLatex: string;

		constructor() {
			this.basis = [];
		}

		systemLatex: string;
	}

    /**
     * Abstract base class of all parsers.
     *
     * @abstract
     */
	export class DiscreteFan {

		cones;
		inputs;
		inputsDiscrete;
		thresholds;
		variables;
		ringExpressions;
		simplifiedExpressions;

		discretize : boolean;

		computed;

		polynomialSystemLatex;
		reducedPolynomialSystemLatex;
		vanishingIdealLatex;

		constructor() {
			
			this.computed = ko.observable(false);

			this.errorText = ko.observable('');

			this.variables = ko.observableArray();

			this.thresholds = ko.observableArray();

			this.inputsDiscrete = ko.observableArray();

			this.inputs = ko.observableArray();
			this.inputs.push(new InputItem(this)); 

			this.cones = ko.observableArray();

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


			//System.variables = ['a', 'b', 'c'];

			//var p1 = FastMathConverter.run(MathsParser.parse('a*a+b*b'));
			//var p2 = FastMathConverter.run(MathsParser.parse('a~c'));

			//var F = [p1, p2];

			//var result = GroebnerAlgorithm.run(F, new Plex());
			//var test1 = PolynomialPrinter.run(result);


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

			this.sampleI();
			this.compute();
		}
		
		sampleII() {


			this.discretize = false;

			//1 1.6104 1.2042 1.0072
			//2 1.7073 1.3252 1.0185
			//3 1.7254 1.4118 1.0336
			//4 1.7011 1.4616 1.0508
			//5 1.6601 1.4814 1.0685

			// Z3-Ring
			System.ring = new IntegerRingModulo2();

			this.variables.removeAll();
			this.variables.push(new InputVariable(this, 'M'));
			this.variables.push(new InputVariable(this, 'B'));
			this.variables.push(new InputVariable(this, 'A'));
			this.variables.push(new InputVariable(this, 'L'));
			this.variables.push(new InputVariable(this, 'P'));

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
		}

		//sampleI() {

		//	this.discretize = true;
			
		//	// Z3-Ring
		//	System.ring = new IntegerRingModulo(3);

		//	this.variables.removeAll();
		//	this.variables.push(new InputVariable(this, 'x_1'));
		//	this.variables.push(new InputVariable(this, 'x_2'));

		//	this.inputs.removeAll();
		
		//	this.inputs.push(new InputItem(this, [1.6104, 1.7104]));
		//	this.inputs.push(new InputItem(this, [1.6973, 1.7973]));
		//	this.inputs.push(new InputItem(this, [1.7254, 1.6254]));
		//	this.inputs.push(new InputItem(this, [1.6011, 1.6011]));


		//	this.thresholds.removeAll();
		//	this.thresholds.push(new Threshold(this, 0, [null, null]));
		//	this.thresholds.push(new Threshold(this, 1, [1.65, 1.65]));
		//	this.thresholds.push(new Threshold(this, 2, [1.702, 1.702]));
		//}


		//sampleI() {

		//	this.discretize = true;
			
		//	// Z3-Ring
		//	System.ring = new IntegerRingModulo3Special();

		//	this.variables.removeAll();
		//	this.variables.push(new InputVariable(this, 'x_1'));
		//	this.variables.push(new InputVariable(this, 'x_2'));

		//	this.inputs.removeAll();

		//	this.inputs.push(new InputItem(this, [1.6104, 1.2042]));
		//	this.inputs.push(new InputItem(this, [1.6601, 1.4814]));
		//	this.inputs.push(new InputItem(this, [1.7254, 1.4118]));


		//	this.thresholds.removeAll();
		//	this.thresholds.push(new Threshold(this, -1, [null, null]));
		//	this.thresholds.push(new Threshold(this, 0, [1.65, 1.25]));
		//	this.thresholds.push(new Threshold(this, 1, [1.702, 1.42]));
		//}

		sampleI() {

			this.discretize = true;
			
			// Z3-Ring
			System.ring = new IntegerRingModulo3Special();

			this.variables.removeAll();
			this.variables.push(new InputVariable(this, 'x_1'));
			this.variables.push(new InputVariable(this, 'x_2'));
			this.variables.push(new InputVariable(this, 'x_3'));

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
		}

		toLatex(str): string {
			return str.replace(/\*/g, ' '); // \\cdot 
		}

		getIdealLatex(equations): string {
			
			var result = '';

			result += '\\begin{aligned}';
			result += ' ';
			result += ' I = \\;<\\;';

			for (var i = 0; i < equations.length; i++) {
				var input = equations[i];
				result += ' ';
				result += ' & ' + this.toLatex(PolynomialPrinter.run(input)) + (i < equations.length-1 ? ',' : '>');
				result += ' ';
				result += ' ';
				result += '\\\\[8pt]';
				result += ' ';
			}
			
			result += ' ';
			result += '\\end{aligned}';

			return result;
		}

		getEquationLatex(equations): string {
			
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
		}
		
		discretize1(points: number[][], values: number[], thresholds: number[][]) {

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

		}


		compute() {

			this.computed(true);

			var i: number;

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


			var firstDifference = (a: number[], b: number[]) => {
				var i = 0;
				while (i < a.length && a[i] === b[i]) i++;
				if (i === a.length) return -1;
				return i;
			}

			System.variables = ['t'].concat(_.map(<InputVariable[]>this.variables(), v => v.v()));

			var polynomialSystem: Polynomials.Polynomial[] = [];

			for (i = 0; i < this.variables().length; i++) {
				var variable = this.variables()[i];

				var poly = new Polynomials.Polynomial();

				for (var j = 0; j < points.length - 1; j++) {

					var f = PolynomialParser.parse(points[j + 1][i].toString());

					var alreadyAdded = [];

					for (var k = 0; k < points.length; k++) {

						var ind = firstDifference(points[j], points[k]);

						if (ind === -1) continue;

						if (_.any(alreadyAdded, p => p[0] === ind && p[1] === points[j][ind] - points[k][ind])) continue;

						alreadyAdded.push([ind, points[j][ind] - points[k][ind]]);

						var t = `(${points[j][ind]}~${points[k][ind]})*(${this.variables()[ind].v()}~${points[k][ind]})`; // ^(p-2)

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
				polynomialSystemArray.push([`f_${m + 1}^0`, PolynomialPrinter.run(polynomialSystem[m])]);
			}

			this.polynomialSystemLatex(this.getEquationLatex(polynomialSystemArray));


			// Vanishing ideal

			var maximalIdeals: Polynomials.Polynomial[][] = [];

			for (i = 0; i < points.length; i++) {

				var g = [];

				for (j = 0; j < this.variables().length; j++) {
					var variable = this.variables()[j].v();

					var t = `(${variable}~${points[i][j]})`;

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

			//return;

			var test1b = PolynomialPrinter.run(maximalIdeals[0][0]);

			while (maximalIdeals.length > 1) {
				var a = maximalIdeals.shift();
				var b = maximalIdeals.shift();

				a = _.map(a, p => p.multiply(PolynomialParser.parse('t')));
				b = _.map(b, p => p.multiply(PolynomialParser.parse('1-t')));

				//_.each(a, p => p.order());
				//_.map(b, p => p.order());

				var both = a.concat(b);

				var F = GroebnerAlgorithm.run(both);

				var G = _.filter(F, p => !p.hasVariable(System.variables.indexOf('t')));

				maximalIdeals.push(G);
			}

			var vanishingIdeal = maximalIdeals[0];

			_.each(vanishingIdeal, p => p.order());

			//vanishingIdeal = vanishingIdeal.slice(0, 3);

			this.vanishingIdealLatex(this.getIdealLatex(vanishingIdeal));

			var _this = this;

			// Using YQL and JSONP
			$.ajax({
				url: "http://ec2-52-28-60-46.eu-central-1.compute.amazonaws.com:8080/",

				// The name of the callback parameter, as specified by the YQL service
				jsonp: "callback",

				// Tell jQuery we're expecting JSONP
				dataType: "jsonp",

				// Tell YQL what we want and that we want JSON
				data: {
					vars: 'Q[' + System.variables.join(',') + ']',
					polys: '{' + _.map(vanishingIdeal, v => PolynomialPrinter.run(v)).join(',') + '}'
				},

				// Work with the response
				success(response) {
					console.log(response); // server response
					_this.errorText('');
					_this.computeWithResult(polynomialSystem, response);
				},

				// Work with the response
				error(response) {
					console.log(response); // server response
					_this.errorText('Could not contact server. Please call application author.');
				}
			});

		}

		computeWithResult(polynomialSystem, cones:string) {

			cones = cones.substr(cones.indexOf('\n') + 1);
			cones = cones.replace(/(?:\r\n|\r|\n)/g, '');
			cones = cones.substr(1, cones.length - 2);

			cones = cones.replace(/-/g, '~');

			cones = cones.replace(/([a-zA-Z_\d]+)\^(\d+)/g,(sub, variable, exponent) => {
				var times = parseInt(exponent);
				var content = [];
				for (var k = 0; k < times; k++) {
					content.push(variable);
				}
				return content.join('*');
			});
			
			cones += ',';

			var parts = cones.split('},');
			parts.pop();

			for (var i = 0; i < parts.length; i++) {

				var part = parts[i].substr(1) + ',';

				var polyParts = part.split(',');
				polyParts.pop();

				var cone = new ConeItem();

				var latexParts = [];

				for (var j = 0; j < polyParts.length; j++) {
					
					var p = FastMathConverter.run(MathsParser.parse(polyParts[j]));

					p.order();

					cone.basis.push(p);
					latexParts.push(this.toLatex(PolynomialPrinter.run(p)));
				}

				cone.basisLatex = '\\lbrace \\quad ' + latexParts.join(', \\quad ') + ' \\quad \\rbrace';

				cone.systemLatex = this.reducePolynomialSystem(polynomialSystem, cone.basis);

				this.cones.push(cone);
			}
		}

		reducePolynomialSystem(polynomialSystem, vanishingIdeal): string {

			// Reduce polynomial system

			var reducedPolynomialSystem: Polynomials.Polynomial[] = [];

			for (var l = 0; l < polynomialSystem.length; l++) {

				var polyn = polynomialSystem[l];

				var result = DivisionAlgorithm.run(polyn, vanishingIdeal);

				reducedPolynomialSystem.push(result.r);
			}

			var reducedPolynomialSystemArray = [];

			for (var m = 0; m < reducedPolynomialSystem.length; m++) {
				reducedPolynomialSystem[m].order();
				reducedPolynomialSystemArray.push([`f_${m + 1}`, PolynomialPrinter.run(reducedPolynomialSystem[m])]);
			}

			return this.getEquationLatex(reducedPolynomialSystemArray);
		}

		clear() {

			this.ringExpressions.removeAll();
			this.simplifiedExpressions.removeAll();
			this.polynomialExpressions.removeAll();
			this.replacedExpressions.removeAll();
			this.groebnerExpressions.removeAll();

			this.computed(false);
		}

		addVariable() {

			for (var i = 0; i < this.inputs().length; i++) {
				this.inputs()[i].s.push(0);
			}

			for (var i = 0; i < this.thresholds().length; i++) {
				this.thresholds()[i].s.push('');
			}

			this.variables.push(new InputVariable(this));
		}

		addInput() {

			var a = [];

			for (var i = 0; i < this.variables().length; i++) {
				a.push(0);
			}

			this.inputs.push(new InputItem(this, a));
		}

		removeVariable(e) {

			var ind = this.variables().indexOf(e);

			for (var i = 0; i < this.inputs().length; i++) {
				this.inputs()[i].s.splice(ind, 1);
			}

			for (var i = 0; i < this.thresholds().length; i++) {
				this.thresholds()[i].s.splice(ind, 1);
			}

			this.variables.remove(e);
		}

		removeInput(e) {

			this.inputs.remove(e);
		}

		ring2() {

			System.ring = new IntegerRingModulo2();

			this.thresholds.removeAll();
			this.thresholds.push(new Threshold(this, 0));
			this.thresholds.push(new Threshold(this, 1));
		}

		ring3() {

			System.ring = new IntegerRingModulo(3);

			this.thresholds.removeAll();
			this.thresholds.push(new Threshold(this, 0));
			this.thresholds.push(new Threshold(this, 1));
			this.thresholds.push(new Threshold(this, 2));
		}

		ring3Special() {

			System.ring = new IntegerRingModulo3Special();

			this.thresholds.removeAll();
			this.thresholds.push(new Threshold(this, -1));
			this.thresholds.push(new Threshold(this, 0));
			this.thresholds.push(new Threshold(this, 1));
		}

		removeThreshold(e) {

			this.thresholds.remove(e);
		}

		errorText;
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

