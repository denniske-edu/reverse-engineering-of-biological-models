
module Bool {
    
    /**
     * Not (!child)
     */
    export class Not extends Block {

		child: any;

	    constructor(child: any) {
		    super();
		    this.child = child;
	    }

	    getChildren(): any[] {
			return [this.child];
		}
		
	    toString(): string {

			return '!'+this.child.toString();
        }
    }
}
