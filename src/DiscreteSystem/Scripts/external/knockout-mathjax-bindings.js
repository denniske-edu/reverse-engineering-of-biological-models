//this binding is the same as the html: binding, but runs MathJax on the element afterwards to typeset any maths.
ko.bindingHandlers.latex = {
	update: function(element,valueAccessor) {
		ko.bindingHandlers.html.update.apply(this,arguments);
		MathJax.Hub.Queue(['Typeset',MathJax.Hub,element]);
	}
}

//this binding sets the content of the element to the given LaTeX, and typesets it.
//if the additional binding `displayMaths: true` is given, the maths is typeset in display mode (on its own line and bigger)
ko.bindingHandlers.maths = {
	update: function(element,valueAccessor,allBindingsAccessor) {
		var val = ko.unwrap(valueAccessor());
		var display = allBindingsAccessor()['displayMaths'];
		var scriptTag = document.createElement('script');
		scriptTag.setAttribute('type','math/tex' + (display ? '; mode=display': ''));
		scriptTag.text = val;
		element.innerHTML = '';
		element.appendChild(scriptTag);
		MathJax.Hub.Queue(['Typeset',MathJax.Hub,element]);
	}
}

