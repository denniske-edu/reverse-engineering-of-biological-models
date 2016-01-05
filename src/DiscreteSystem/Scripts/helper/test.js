var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Test;
(function (Test) {
    var Matcher = (function () {
        function Matcher(message, func) {
            this.message = message;
            this._func = func;
        }
        Matcher.prototype.match = function (value) {
            return this._func(value);
        };
        return Matcher;
    })();
    Test.Matcher = Matcher;
    Test.identical = function (a, b) {
        return a === b;
    };
    function compareArrays(value, array) {
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
            }
            else if (value[i] !== array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
    var _PairwiseCompare = (function (_super) {
        __extends(_PairwiseCompare, _super);
        function _PairwiseCompare(expected, comparator, message) {
            _super.call(this, message, null);
            this.expected = expected;
            this.comparator = comparator;
            this.message = message;
        }
        _PairwiseCompare.prototype.match = function (item) {
            return compareArrays(this.expected, item);
        };
        return _PairwiseCompare;
    })(Matcher);
    Test.pairwiseCompare = function (expected, comparator, message) {
        return new _PairwiseCompare(expected, comparator, message);
    };
    function hasLength(expectedLength) {
        return new Matcher('has length ' + expectedLength, function (value) { return value.length === expectedLength; });
    }
    Test.hasLength = hasLength;
    Test.isTrue = new Matcher('is true', function (value) { return value === true; });
    Test.isFalse = new Matcher('is false', function (value) { return value === false; });
    Test.isNull = new Matcher('is null', function (value) { return value == null; });
    Test.same = function (other) { return new Matcher('is same', function (value) { return value === other; }); };
    Test.isNot = function (objOrMatcher) {
        if (objOrMatcher instanceof Matcher) {
            var matcher = objOrMatcher;
            return new Matcher('is not', function (value) { return !matcher.match(value); });
        }
        var sameMatcher = Test.same(objOrMatcher);
        return new Matcher('is not', function (value) { return !sameMatcher.match(value); });
    };
    Test.throwsArgumentError = new Matcher('throws argument error', function (callback) {
        try {
            callback();
        }
        catch (e) {
            return e.message.indexOf('Invalid Argument') === 0;
        }
        return false;
    });
    Test.throwsStateError = new Matcher('throws state error', function (callback) {
        try {
            callback();
        }
        catch (e) {
            return true;
        }
        return false;
    });
    function assertIsTrue(state, message) {
        if (state !== true)
            throw 'assertIsTrue failed: ' + message;
    }
    Test.assertIsTrue = assertIsTrue;
    function assertIsFalse(state, message) {
        if (state === true)
            throw 'assertIsFalse failed: ' + message;
    }
    Test.assertIsFalse = assertIsFalse;
    function fail(message) {
        throw message != null ? message : 'failed.';
    }
    Test.fail = fail;
    function equal(actual, expected, message) {
        if (expected != actual)
            throw 'equal failed: ' + message;
    }
    function match(value, match) {
        if (match instanceof Matcher) {
            assertIsTrue(match.match(value), match.message);
        }
        else if (match instanceof Array) {
            assertIsTrue(compareArrays(value, match), 'arrays are equal');
        }
        else {
            equal(value, match);
        }
    }
    Test.match = match;
    function group(name, func) {
        func();
    }
    Test.group = group;
    function test(name, func) {
        func();
    }
    Test.test = test;
    function listFilled(length, content) {
        var list = [];
        for (var i = 0; i < length; i++) {
            list.push(content);
        }
        return list;
    }
    Test.listFilled = listFilled;
})(Test || (Test = {}));
//# sourceMappingURL=test.js.map