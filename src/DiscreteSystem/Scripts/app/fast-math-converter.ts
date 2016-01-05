
module App {

	import Add = Maths.Add;
	import Sub = Maths.Sub;
	import And = Bool.And;
	import Or = Bool.Or;
	import Not = Bool.Not;
	import Mult = Maths.Mult;
	import Div = Maths.Div;

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
	export class FastMathConverter {

		static run(block: any): any {
			
			if (block instanceof Add) {

				var and = <Add>block;
				
				and.left = FastMathConverter.run(and.left);
				and.right = FastMathConverter.run(and.right);

				return and.left.add(and.right);
			}

			if (block instanceof Sub) {

				var sub = <Sub>block;
				
				sub.left = FastMathConverter.run(sub.left);
				sub.right = FastMathConverter.run(sub.right);

				return sub.left.subtract(sub.right);
			}

			if (block instanceof Mult) {

				var or = <Mult>block;

				or.left = FastMathConverter.run(or.left);
				or.right = FastMathConverter.run(or.right);
				
				return or.left.multiply(or.right);
			}

			if (block instanceof Div) {

				throw new Error('Not implemented.');
			}
			
			return PolynomialParser.parse(block);
		}
    }
}