

module Maths {
    
    /**
     * Multiplication (left * right)
     */
    export class Mult extends Block {

		right: any;
		left: any;

		constructor(left: any, right: any) {
			super();
			this.right = right;
			this.left = left;
		}

		getChildren(): any[] {
			return [this.left, this.right];
		}
    }
}
