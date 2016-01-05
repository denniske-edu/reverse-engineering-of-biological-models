
module Algorithms {
	import TermOrder = Polynomials.TermOrder;
	import Polynomial = Polynomials.Polynomial;
	import Plex = Polynomials.Plex;
	
	/**
     * Abstract base class of all parsers.
     *
     * @abstract
     */
	export class DivisionAlgorithm {

		static run(f: Polynomial, fs: Polynomial[], order: TermOrder = new Plex()) {

			var m = fs.length;

			var hs = new Array(m);

			for (var i = 0; i < m; i++) {
				hs[i] = new Polynomial();
			}

			var r = new Polynomial();

			var s = f.clone();

			while (s.terms.length > 0) {

				i = 0;
				var divisionOccurred = false;

				while (i < m && !divisionOccurred) {

					var sLT = s.getLeadingTerm(order);
					var fsLT = fs[i].getLeadingTerm(order);

					if (sLT.divisibleBy(fsLT)) {

						var remainder = new Polynomial([sLT.divide(fsLT)]);

						s = s.subtract(remainder.multiply(fs[i]));
						hs[i] = hs[i].add(remainder);


						divisionOccurred = true;
					} else {
						i++;
					}

				}

				if (!divisionOccurred) {
					r = r.add(new Polynomial([s.getLeadingTerm(order)]));
					s = s.subtract(new Polynomial([s.getLeadingTerm(order)]));
				}

			}

			return { hs: hs, r: r };
		}
    }
}
