
module Maths {
    
    /**
     * Prints a maths expression as string.
	 *
	 * Example output:
	 * 
	 * '1*(2+2)'
	 * '(2+2)*1'
	 * 'x*(y+y)'
	 * '(y+y)*x'
     */
	export class Printer {
		
		static run(block: any, parent: Block = null): string {
			
			if (block instanceof Add) {

				var add = <Add>block;

				if (parent instanceof Mult) {
					return '(' + Printer.run(add.left, block) + '+' + Printer.run(add.right, block) + ')';
				}

				return Printer.run(add.left, block) + '+' + Printer.run(add.right, block);
			}

			if (block instanceof Mult) {

				var mult = <Mult>block;

				return Printer.run(mult.left, block) + '*' + Printer.run(mult.right, block);
			}

			return block.toString();
		}
    }
}
