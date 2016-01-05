
module Polynomials {
	import System = Helper.System;
	
	/**
     * Class representing a term
     */
    export class Term {
		public coefficient: any;
		public monomial:number[];

		constructor(coefficient: any, monomial: number[]) {
			
			this.coefficient = System.ring.val(coefficient);
			this.monomial = _.map(monomial, m => System.ring.power(m));
	    }

		divisibleBy(other: Term): boolean {

			for (var i = 0; i < this.monomial.length; i++) {
				if (this.monomial[i] - other.monomial[i] < 0) {
					return false;
				}
			}

			return true;
		}

		multiply(other: Term) {
			
			var coefficient = this.coefficient * other.coefficient;

			var monomial = [];
			for (var i = 0; i < this.monomial.length; i++) {
				monomial.push(this.monomial[i] + other.monomial[i]);
			}

			return new Term(coefficient, monomial);
		}

		add(other: Term) {

			var coefficient = this.coefficient + other.coefficient;

			var monomial = this.monomial.slice(0);

			return new Term(coefficient, monomial);
		}

		subtract(other: Term) {

			var coefficient = this.coefficient - other.coefficient;

			var monomial = this.monomial.slice(0);

			return new Term(coefficient, monomial);
		}

		divide(other: Term) {

			if (!this.divisibleBy(other)) {
				throw new Error('Not divisible');
			}

			var coefficient = this.coefficient / other.coefficient;

			var monomial = [];
			for (var i = 0; i < this.monomial.length; i++) {
				monomial.push(this.monomial[i] - other.monomial[i]);
			}

			return new Term(coefficient, monomial);
		}
		
		equals(other: Term): boolean {

			if (this.coefficient !== other.coefficient)
				return false;

			if (this.monomial.length !== other.monomial.length)
				return false;

			for (var i = 0; i < this.monomial.length; i++) {
				if (this.monomial[i] !== other.monomial[i]) {
					return false;
				}
			}

			return true;
		}

		clone(): Term {
		    return new Term(this.coefficient, this.monomial.slice(0));
	    }
    }
}
