
module Bool {
    
    /**
     * Or (left | right)
     */
    export class Or extends Block {

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

	    toString(): string {

			return this.left.toString() + '|' + this.right.toString();
        }
    }
}
