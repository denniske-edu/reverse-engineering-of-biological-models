

module Maths {
    
    /**
     * Returns all variables used in a maths structure.
     *
     * Examples:
	 * 
	 * 1*x				=> ['x']
	 * x*y				=> ['x', 'y']
	 * x*(y*y)			=> ['x', 'y']
	 * x*(y*z+x*z+x)	=> ['x', 'y', 'z']
     */
	export class Variables {

		static run(block: any, vars: string[] = []): string[] {
			
			if (block instanceof Add) {

				var add = <Add>block;
				
				Variables.run(add.left, vars);
				Variables.run(add.right, vars);
				
				return vars;
			}

			if (block instanceof Mult) {

				var mult = <Mult>block;

				Variables.run(mult.left, vars);
				Variables.run(mult.right, vars);

				return vars;
			}

			if (!$.isNumeric(block) && vars.indexOf(block) === -1) {
				vars.push(block);
			}

			return vars;
		}
    }
}
