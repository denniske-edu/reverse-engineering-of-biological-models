

module Maths {
    
    /**
     * Division (left / right)
     */
    export class Div extends Block {

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
