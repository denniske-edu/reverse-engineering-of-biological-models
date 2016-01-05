
module Maths {
    
    /**
     * Replaces variables by another variable or value.
     *
     * Examples:
	 * 	
	 * var replacements = [['x', '1'], ['y', '2']];
	 * 
	 * 1	=> '1'
	 * x	=> '1'
	 * y	=> '2'
	 * x*y	=> '1*2'
     */
	export class Replacer {

		static run(block: any, replacements: any[][] = []): any {
			
			if (block instanceof Add) {

				var add = <Add>block;

				add.left = Replacer.run(add.left, replacements);
				add.right = Replacer.run(add.right, replacements);
				
				return add;
			}

			if (block instanceof Mult) {

				var mult = <Mult>block;

				mult.left = Replacer.run(mult.left, replacements);
				mult.right = Replacer.run(mult.right, replacements);

				return mult;
			}

			var replacement = _.find(replacements, r => r[0] === block);
			
			if (replacement != null)
			{
				return replacement[1];
			}

			return block;
		}
    }
}
