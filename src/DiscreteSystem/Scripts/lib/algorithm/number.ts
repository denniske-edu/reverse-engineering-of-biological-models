
module Algorithms {
    
	export class NumberAlgorithm {

		// http://de.wikibooks.org/wiki/Algorithmensammlung:_Zahlentheorie:_Euklidischer_Algorithmus#Visual_Basic_for_Applications

		static greatestCommonDivisor(a: number, b: number): number {

			// ggT(a, b) = ggT(|a|, |b|)
			a = Math.abs(a);
			b = Math.abs(b);

			while (a > 0 && b > 0)
			{ 
				if (a > b) 
					a = a % b;
				else
					b = b % a;
			}

			return a + b;
		}

		static leastCommonMultiple(a: number, b: number): number {

			// Not defined for a*b == 0
			if (a === 0 || b === 0)
				return NaN;

			var kgV = a / NumberAlgorithm.greatestCommonDivisor(a, b);

			return Math.abs(kgV * b);
		}
    }
}
