
module Test {
	
	export class Matcher {
		message: string;
		private _func: (value) => boolean;

		constructor(message: string, func: (value) => boolean) {
			this.message = message;
			this._func = func;
		}

		match(value: any): boolean {
			return this._func(value);
		}
	}

	export var identical = (a, b) => { return a === b; }

	function compareArrays(value: any[], array: any[]): boolean {
		// http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript#answer-14853974

		// if the other array is a falsy value, return
		if (!array)
			return false;

		// compare lengths - can save a lot of time
		if (value.length !== array.length)
			return false;

		for (var i = 0; i < array.length; i++) {
			// Check if we have nested arrays
			if (value[i] instanceof Array && array[i] instanceof Array) {
				// recurse into the nested arrays
				if (!compareArrays(value[i], array[i]))
					return false;
			} else if (value[i] !== array[i]) {
				// Warning - two different object instances will never be equal: {x:20} != {x:20}
				return false;
			}
		}
		return true;
	}

	class _PairwiseCompare extends Matcher {

		constructor(private expected, private comparator, public message) {
			super(message, null);
		}

		match(item: any): boolean {
			return compareArrays(this.expected, item);
		}
	}

	export var pairwiseCompare = (expected: any[], comparator: (a: any, b: any) => boolean, message: string): Matcher => {
		return new _PairwiseCompare(expected, comparator, message);
	}

	export function hasLength(expectedLength: number): Matcher {
		return new Matcher('has length ' + expectedLength, (value) => value.length === expectedLength);
	}

	export var isTrue = new Matcher('is true', (value) => value === true);
	export var isFalse = new Matcher('is false', (value) => value === false);
	export var isNull = new Matcher('is null', (value) => value == null);

	export var same = (other) => new Matcher('is same', (value) => value === other);

	export var isNot = (objOrMatcher: any) => {

		if (objOrMatcher instanceof Matcher) {
			var matcher = <Matcher>objOrMatcher;
			return new Matcher('is not', (value) => !matcher.match(value));
		}

		var sameMatcher = same(objOrMatcher);
		return new Matcher('is not', (value) => !sameMatcher.match(value));
	}

	export var throwsArgumentError = new Matcher('throws argument error', (callback) => {
		try {
			callback();
		} catch (e) {
			return (<Error>e).message.indexOf('Invalid Argument') === 0;
		}
		return false;
	});

	export var throwsStateError = new Matcher('throws state error', (callback) => {
		try {
			callback();
		} catch (e) {
			return true;
		}
		return false;
	});

	export function assertIsTrue(state: any, message?: string): any {
		if (state !== true)
			throw 'assertIsTrue failed: ' + message;
	}

	export function assertIsFalse(state: any, message?: string): any {
		if (state === true)
			throw 'assertIsFalse failed: ' + message;
	}

	export function fail(message?: string): any {
		throw message != null ? message : 'failed.';
	}

	function equal(actual: any, expected: any, message?: string): any {
		if (expected != actual)
			throw 'equal failed: ' + message;

	}

	export function match(value: any, match: any) {
		if (match instanceof Matcher) {
			assertIsTrue(match.match(value), match.message);
		} else if (match instanceof Array) {
			assertIsTrue(compareArrays(value, match), 'arrays are equal');
		} else {
			equal(value, match);
		}
	}

	export function group(name: string, func: () => void) {
		func();
	}

	export function test(name: string, func: () => void) {
		func();
	}

	export function listFilled(length: number, content: any) {
		var list: any[] = [];
		for (var i = 0; i < length; i++) {
			list.push(content);
		}
		return list;
	}
}







