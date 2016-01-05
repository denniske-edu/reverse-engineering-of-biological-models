
module Maths {
    
    /**
     * Sum-Product Decomposition
	 *
	 * Examples:
	 * 
	 * x*(y+y)			=>	x*y + x*y
	 * x*(y*y)			=>	x*y*y
	 * x*(y*z+x)		=>	x*y*z + x*x
	 * x*(y*z+x*z+x)	=>	x*y*z + x*x*z + x*x
     */
	export class Decomposer {

		static run(block: any): any {
			
			if (block instanceof Add) {

				var add = <Add>block;
				
				if (add.left instanceof Block) {
					add.left = Decomposer.run(add.left);
				}

				if (add.right instanceof Block) {
					add.right = Decomposer.run(add.right);
				}
				
				return add;
			}

			if (block instanceof Mult) {

				var mult = <Mult>block;
				
				if (mult.left instanceof Block) {
					mult.left = Decomposer.run(mult.left);
				}

				if (mult.right instanceof Block) {
					mult.right = Decomposer.run(mult.right);
				}
				
				var left: any[], right: any[];

				if (mult.left instanceof Add) {
					left = Flatter.run(mult.left);
				} else {
					left = [mult.left];
				}

				if (mult.right instanceof Add) {
					right = Flatter.run(mult.right);
				} else {
					right = [mult.right];
				}

				var last: Block = null;
				for (var i = 0; i < left.length; i++) {
					for (var j = 0; j < right.length; j++) {

						if (last == null) {
							last = new Mult(left[i], right[j]);
						} else {
							last = new Add(last, new Mult(left[i], right[j]));
						}
					}
				}

				return last;
			}

			return block;
		}
    }
}
