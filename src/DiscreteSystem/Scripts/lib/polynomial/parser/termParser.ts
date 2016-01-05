
module Polynomials {
	import System = Helper.System; /**
     * Parses a term expression from string into structure
     */
	export class TermParser {
		
		static parse(str: string): Term {

			str = str.replace(/\s/g, '');

			var coefficient = 1;

			if (str.length > 0 && str[0] === '-') {
				coefficient = -1;
				str = str.substr(1);
			}

			var factors = str.split('*');

			var monomial = new Array(System.variables.length);

			for (var k = 0; k < monomial.length; k++) {
				monomial[k] = 0;
			}

			for (var j = 0; j < factors.length; j++) {
				var factor = factors[j];
				if ($.isNumeric(factor)) {
					// "1", "5", ...
					coefficient *= parseInt(factor);
				} else {
					// "x", "x^2", ...
					var parts = factor.split('^');
					var base = parts[0];
					var exponent = parts.length === 1 ? 1 : parseInt(parts[1]);
					monomial[System.variables.indexOf(base)] += exponent;
				}
			}

			return new Term(coefficient, monomial);
		}

    }
}
