
module Test {

	import NumberAlgorithm = Algorithms.NumberAlgorithm;

	group('number', () => {
		
		test('greatestCommonDivisor / leastCommonMultiple', () => {

			match(NumberAlgorithm.greatestCommonDivisor(12, 18), 6);
			match(NumberAlgorithm.greatestCommonDivisor(3528, 3780), 252);

			match(NumberAlgorithm.leastCommonMultiple(12, 18), 36);
			match(NumberAlgorithm.leastCommonMultiple(3528, 3780), 52920);
		});
	});
}