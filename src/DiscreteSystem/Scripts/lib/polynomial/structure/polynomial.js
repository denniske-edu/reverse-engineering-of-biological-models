var Polynomials;
(function (Polynomials) {
    var Helper2 = Helper.Helper;
    /**
     * Class representing a polynomial
     */
    var Polynomial = (function () {
        function Polynomial(terms) {
            if (terms === void 0) { terms = []; }
            this.terms = terms;
        }
        Polynomial.prototype.getLeadingTerm = function (order) {
            this.order(order);
            return this.terms[0];
        };
        Polynomial.prototype.order = function (order) {
            if (order === void 0) { order = new Polynomials.Plex(); }
            this.terms.sort(function (a, b) { return order.compare(a.monomial, b.monomial); });
        };
        Polynomial.prototype.addTerm = function (term) {
            var matchingTerm = _.find(this.terms, function (t) { return Helper2.arraysEqual(t.monomial, term.monomial); });
            var newTerm;
            if (matchingTerm != null) {
                this.terms = _.without(this.terms, matchingTerm);
                newTerm = matchingTerm.add(term);
            }
            else {
                newTerm = term.clone();
            }
            if (newTerm.coefficient !== 0) {
                this.terms.push(newTerm);
            }
        };
        Polynomial.prototype.subtractTerm = function (term) {
            this.addTerm(new Polynomials.Term(-term.coefficient, term.monomial.slice(0)));
        };
        Polynomial.prototype.add = function (other) {
            var polynomial = new Polynomial();
            for (var i = 0; i < this.terms.length; i++) {
                polynomial.addTerm(this.terms[i]);
            }
            for (var j = 0; j < other.terms.length; j++) {
                polynomial.addTerm(other.terms[j]);
            }
            return polynomial;
        };
        Polynomial.prototype.subtract = function (other) {
            var polynomial = new Polynomial();
            for (var i = 0; i < this.terms.length; i++) {
                polynomial.addTerm(this.terms[i]);
            }
            for (var j = 0; j < other.terms.length; j++) {
                polynomial.subtractTerm(other.terms[j]);
            }
            return polynomial;
        };
        Polynomial.prototype.multiply = function (other) {
            var polynomial = new Polynomial();
            for (var i = 0; i < this.terms.length; i++) {
                for (var j = 0; j < other.terms.length; j++) {
                    polynomial.addTerm(this.terms[i].multiply(other.terms[j]));
                }
            }
            return polynomial;
        };
        // Does this make sense?
        Polynomial.prototype.eliminate = function (varIndex) {
            var polynomial = new Polynomial();
            for (var i = 0; i < this.terms.length; i++) {
                if (this.terms[i].monomial[varIndex] === 0) {
                    polynomial.addTerm(this.terms[i].clone());
                }
            }
            return polynomial;
        };
        Polynomial.prototype.hasVariable = function (varIndex) {
            for (var i = 0; i < this.terms.length; i++) {
                if (this.terms[i].monomial[varIndex] > 0) {
                    return true;
                }
            }
            return false;
        };
        Polynomial.prototype.equals = function (other) {
            this.order(new Polynomials.Plex());
            other.order(new Polynomials.Plex());
            if (this.terms.length !== other.terms.length)
                return false;
            for (var i = 0; i < this.terms.length; i++) {
                if (!this.terms[i].equals(other.terms[i])) {
                    return false;
                }
            }
            return true;
        };
        Polynomial.prototype.makeMonic = function (order) {
            var polynomial = new Polynomial();
            var lt = this.getLeadingTerm(order);
            var monomial = new Array(lt.monomial.length);
            for (var j = 0; j < monomial.length; j++) {
                monomial[j] = 0;
            }
            for (var i = 0; i < this.terms.length; i++) {
                polynomial.addTerm(this.terms[i].divide(new Polynomials.Term(1 / lt.coefficient, monomial)));
            }
            return polynomial;
        };
        Polynomial.prototype.clone = function () {
            return this.add(new Polynomial());
        };
        return Polynomial;
    })();
    Polynomials.Polynomial = Polynomial;
})(Polynomials || (Polynomials = {}));
//# sourceMappingURL=polynomial.js.map