var Polynomials;
(function (Polynomials) {
    var System = Helper.System;
    /**
     * Class representing a term
     */
    var Term = (function () {
        function Term(coefficient, monomial) {
            this.coefficient = System.ring.val(coefficient);
            this.monomial = _.map(monomial, function (m) { return System.ring.power(m); });
        }
        Term.prototype.divisibleBy = function (other) {
            for (var i = 0; i < this.monomial.length; i++) {
                if (this.monomial[i] - other.monomial[i] < 0) {
                    return false;
                }
            }
            return true;
        };
        Term.prototype.multiply = function (other) {
            var coefficient = this.coefficient * other.coefficient;
            var monomial = [];
            for (var i = 0; i < this.monomial.length; i++) {
                monomial.push(this.monomial[i] + other.monomial[i]);
            }
            return new Term(coefficient, monomial);
        };
        Term.prototype.add = function (other) {
            var coefficient = this.coefficient + other.coefficient;
            var monomial = this.monomial.slice(0);
            return new Term(coefficient, monomial);
        };
        Term.prototype.subtract = function (other) {
            var coefficient = this.coefficient - other.coefficient;
            var monomial = this.monomial.slice(0);
            return new Term(coefficient, monomial);
        };
        Term.prototype.divide = function (other) {
            if (!this.divisibleBy(other)) {
                throw new Error('Not divisible');
            }
            var coefficient = this.coefficient / other.coefficient;
            var monomial = [];
            for (var i = 0; i < this.monomial.length; i++) {
                monomial.push(this.monomial[i] - other.monomial[i]);
            }
            return new Term(coefficient, monomial);
        };
        Term.prototype.equals = function (other) {
            if (this.coefficient !== other.coefficient)
                return false;
            if (this.monomial.length !== other.monomial.length)
                return false;
            for (var i = 0; i < this.monomial.length; i++) {
                if (this.monomial[i] !== other.monomial[i]) {
                    return false;
                }
            }
            return true;
        };
        Term.prototype.clone = function () {
            return new Term(this.coefficient, this.monomial.slice(0));
        };
        return Term;
    })();
    Polynomials.Term = Term;
})(Polynomials || (Polynomials = {}));
//# sourceMappingURL=term.js.map