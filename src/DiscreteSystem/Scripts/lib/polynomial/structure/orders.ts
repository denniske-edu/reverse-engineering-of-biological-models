
module Polynomials {

	export var ABSTRACT: string = "abstract method called";

    /**
     * Abstract base class of all term orders.
     *
     * @abstract
     */
	export class TermOrder {
		
		compare(a: number[], b: number[]): number { throw new Error(ABSTRACT) }
	}
	
    /**
     * Pure lexicographic order
     */
	export class Plex extends TermOrder {
		
		compare(a: number[], b: number[]): number {

			var diff = [];
			for (var i = 0; i < a.length; i++) {
				diff.push(a[i] - b[i]);
			}

			var leftMostNonZeroEntry = _.find(diff, e => e !== 0);

			if (leftMostNonZeroEntry == null)
				return 0;

			return -leftMostNonZeroEntry;
		}
    }
}
