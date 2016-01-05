
module Helper {
	import Ring = Polynomials.Ring;
	import IntegerRing = Polynomials.IntegerRing;

	export class System {

		static ring: Ring = new IntegerRing();
		static variables: string[];
	}
}
