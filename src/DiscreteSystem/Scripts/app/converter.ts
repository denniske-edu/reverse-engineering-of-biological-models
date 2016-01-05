
module App {

	import Add = Maths.Add;
	import And = Bool.And;
	import Or = Bool.Or;
	import Not = Bool.Not;
	import Mult = Maths.Mult; 
	
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
	export class Converter {

		static run(block: any): any {
			
			if (block instanceof And) {

				var and = <And>block;
				
				and.left = Converter.run(and.left);
				and.right = Converter.run(and.right);

				return new Mult(and.left, and.right);
			}

			if (block instanceof Or) {

				var or = <Or>block;

				or.left = Converter.run(or.left);
				or.right = Converter.run(or.right);
				
				return new Add(or.left, new Add(or.right, new Mult(or.left, or.right)));
			}

			if (block instanceof Not) {

				var not = <Not>block;

				not.child = Converter.run(not.child);

				return new Add(not.child, 1);
			}

			if (block === true)
				return 1;

			if (block === false)
				return 0;

			return block;
		}
    }
}