
module Bool {
    
    /**
     * And (left & right)
     */
	export class And extends Block {

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
