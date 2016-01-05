
module Polynomials {
	import System = Helper.System; 
	
	/**
     * Prints a Polynomial as string.
	 *
	 * Example output:
	 * 
	 * 'x*y+y'
	 * 'x^2*y-3*y^2'
     */
	export class PolynomialPrinter {

		static run(polynomial: any): string {

			if ($.isArray(polynomial))
				return '[' + _.map(polynomial, p => PolynomialPrinter.run(p)).join(', ') + ']';

			if (polynomial.terms.length === 0)
				return '0';

			var str = '';

			for (var i = 0; i < polynomial.terms.length; i++) {
				var term = polynomial.terms[i];
				if (i > 0 && term.coefficient > 0)
					str += '+';
				str += TermPrinter.run(term);
			}

			return str;
		}
	}
	
    /**
     * Prints a Term as string.
	 *
	 * Example output:
	 * 
	 * 'x*y'
	 * '2*x^2'
     */
	export class TermPrinter {

		static run(term: Term): string {

			if (_.all(term.monomial, e => e === 0)) {
				return term.coefficient;
			}

			var sign = '';

			if (Math.abs(term.coefficient) !== 1) {
				sign = term.coefficient + '*';
			} else if (Math.abs(term.coefficient) === 1 && _.all(term.monomial, e => e === 0)) {
				sign = term.coefficient;
			} else if (term.coefficient === -1) {
				sign = '-';
			}

			var factors = [];

			for (var i = 0; i < System.variables.length; i++) {

				var f = System.variables[i];
				var exponential = term.monomial[i];

				if (exponential === 1) {
					factors.push(f);
				} else if (exponential > 1) {
					factors.push(f + '^' + exponential);
				}
			}

			return sign + factors.join('*');
		}
	}
}
