
module Algorithms {
	import Polynomial = Polynomials.Polynomial;
	import Term = Polynomials.Term;
	import TermOrder = Polynomials.TermOrder;
	
	/**
     * Abstract base class of all parsers.
     *
     * @abstract
     */
	export class GroebnerAlgorithm {

		static leastCommonMultiple(a: Term, b: Term): Term {

			var coefficient = NumberAlgorithm.leastCommonMultiple(a.coefficient, b.coefficient);
			
			var monomial = [];
			for (var i = 0; i < a.monomial.length; i++) {
				monomial.push(Math.max(a.monomial[i], b.monomial[i]));
			}

			return new Term(coefficient, monomial);
		}

		static sPolynomial(f: Polynomial, g: Polynomial, order: TermOrder) : Polynomial {
			
			var fLT = f.getLeadingTerm(order);
			var gLT = g.getLeadingTerm(order);

			var lcm = GroebnerAlgorithm.leastCommonMultiple(fLT, gLT);

			var left = new Polynomial([lcm.divide(fLT)]).multiply(f);
			var right = new Polynomial([lcm.divide(gLT)]).multiply(g);

			return left.subtract(right);
		}

		static run(F: Polynomial[], order: TermOrder = new Polynomials.Plex()): Polynomial[] {

			F = _.filter(F, a => a.terms.length > 0);

			F = GroebnerAlgorithm.groebner(F, order);
			F = GroebnerAlgorithm.minimalize(F, order);
			F = GroebnerAlgorithm.reduce(F, order);

			F.sort((a, b) => order.compare(a.getLeadingTerm(order).monomial, b.getLeadingTerm(order).monomial));
		
			return F;
		}

		static groebner(F: Polynomial[], order: TermOrder): Polynomial[] {
			
			var added: boolean;

			do {
				added = false;

				for (var i = 0; i < F.length; i++) {
					for (var j = 0; j < F.length; j++) {

						if (i !== j) {

							var sPolynomial = GroebnerAlgorithm.sPolynomial(F[i], F[j], order);
							var result = DivisionAlgorithm.run(sPolynomial, F, order);
							var s = result.r;
							if (!s.equals(new Polynomial())) {
								F.push(s);
								added = true;
							}

						}

					}
				}

			} while (added)

			return F;
		}

		static minimalize(F: Polynomial[], order: TermOrder): Polynomial[] {

			var list = [];

			for (var i = 0; i < F.length; i++) {
				list.push(F[i].makeMonic(order));
			}

			for (var j = 0; j < list.length; j++) {

				for (var k = 0; k < list.length; k++) {

					if (j !== k) {
						
						var jLT = list[j].getLeadingTerm(order);
						var kLT = list[k].getLeadingTerm(order);

						if (jLT.divisibleBy(kLT)) {
							list.splice(j, 1);
							j--;
							break;
						}
					}
				}
			}

			return list;
		}

		static reduce(F: Polynomial[], order: TermOrder): Polynomial[] {

			var list = F.slice(0);

			for (var j = 0; j < list.length; j++) {

				var result = DivisionAlgorithm.run(list[j], _.without(list, list[j]), order);

				list[j] = result.r;
			}

			return list;
		}
    }
}
