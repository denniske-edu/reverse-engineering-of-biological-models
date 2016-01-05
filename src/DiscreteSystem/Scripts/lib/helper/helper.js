var Helper;
(function (_Helper) {
    _Helper.ABSTRACT = "abstract method called";
    var Helper = (function () {
        function Helper() {
        }
        Helper.arraysEqual = function (value, array) {
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
                    if (!Helper.arraysEqual(value[i], array[i]))
                        return false;
                }
                else if (value[i] !== array[i]) {
                    // Warning - two different object instances will never be equal: {x:20} != {x:20}
                    return false;
                }
            }
            return true;
        };
        return Helper;
    })();
    _Helper.Helper = Helper;
})(Helper || (Helper = {}));
//# sourceMappingURL=helper.js.map