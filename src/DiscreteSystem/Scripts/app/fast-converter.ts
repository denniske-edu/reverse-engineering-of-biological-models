
module App {

	import Add = Maths.Add;
	import And = Bool.And;
	import Or = Bool.Or;
	import Not = Bool.Not;
	import Mult = Maths.Mult;

	import PolynomialParser = Polynomials.PolynomialParser;
	
	/**
	 * NOTE: Works only in the ring IntegerRingModulo2.
	 * 
     * Converts a bool expression into a math expression by using the
	 * following conversion rules:
	 * 
	 * - a & b	=>	a * b
	 * - a | b	=>	a + b + a * b
	 * - !a		=>	a + 1
     *
	 * Examples:
	 * 
	 * !a		=>	a+1
	 * !a&b		=>	(a+1)*b
	 * !a&!b	=>	(a+1)*(b+1)
	 * 
     * @abstract
     */
	export class FastConverter {

		static run(block: any): any {
			
			if (block instanceof And) {

				var and = <And>block;
				
				and.left = FastConverter.run(and.left);
				and.right = FastConverter.run(and.right);

				return and.left.multiply(and.right);
			}

			if (block instanceof Or) {

				var or = <Or>block;

				or.left = FastConverter.run(or.left);
				or.right = FastConverter.run(or.right);
				
				return or.left.add(or.right.add(or.left.multiply(or.right)));
			}

			if (block instanceof Not) {

				var not = <Not>block;

				not.child = FastConverter.run(not.child);

				return not.child.add(PolynomialParser.parse('1'));
			}

			if (block === true)
				return PolynomialParser.parse('1');

			if (block === false)
				return PolynomialParser.parse('0');

			return PolynomialParser.parse(block);
		}
    }
}