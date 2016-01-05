
module Maths {
    
    /**
     * Flattens maths data structure partly by concatenating structures
	 * of the same type (e.g. multiple consecuting Add/Mult blocks).
	 *
	 * Examples (for Add):
	 * 
	 * x+x				=> ['x', 'x']
	 *
	 * Examples (for Mult):
	 * 
	 * x*x				=> ['x', 'x']
	 * x*(y+y)			=> ['x', 'y+y']
	 * x*(y*y)			=> ['x', 'y', 'y']
	 * x*(y*z+x)		=> ['x', 'y*z+x']
	 * x*(y*z+x*z+x)	=> ['x', 'y*z+x*z+x']
     */
	export class Flatter {

		static run(block: any): any[] {

			var blocks = [];

			if (block instanceof Add) {

				var add = <Add>block;

				if (add.left instanceof Add) {
					blocks = blocks.concat(Flatter.run(add.left));
				} else {
					blocks.push(add.left);
				}

				if (add.right instanceof Add) {
					blocks = blocks.concat(Flatter.run(add.right));
				} else {
					blocks.push(add.right);
				}
				
				return blocks;
			}

			if (block instanceof Mult) {

				var mult = <Mult>block;

				if (mult.left instanceof Mult) {
					blocks = blocks.concat(Flatter.run(mult.left));
				} else {
					blocks.push(mult.left);
				}

				if (mult.right instanceof Mult) {
					blocks = blocks.concat(Flatter.run(mult.right));
				} else {
					blocks.push(mult.right);
				}

				return blocks;
			}

			blocks.push(block);

			return blocks;
		}
    }
}
