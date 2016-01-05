
module Bool {
    
    /**
     * Prints a bool expression as string.
	 *
	 * Example output:
	 * 
	 * 'a&b'
	 * 'a|b'
     */
	export class Printer {

		static run(block: any, parent: Block = null): string {
			
			if (block instanceof And) {

				var add = <And>block;

				if (parent instanceof And) {
					return '(' + Printer.run(add.left, block) + '&' + Printer.run(add.right, block) + ')';
				}

				return Printer.run(add.left, block) + '&' + Printer.run(add.right, block);
			}

			if (block instanceof Or) {

				var mult = <Or>block;

				return Printer.run(mult.left, block) + '|' + Printer.run(mult.right, block);
			}

			if (block instanceof Not) {

				var not = <Not>block;

				return '!' + Printer.run(not.child, block);
			}

			if (block === true)
				return '1';

			if (block === false)
				return '0';

			return block;
		}
    }
}
