'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*! The MIT License (MIT) https://github.com/vace/style.js */

var prefixes = ['-webkit-', '-moz-', '-ms-'];
var camelPrefixes = ['Webkit', 'Moz', 'ms'];
var _cache = Object.create(null);

var hyphenateRE = /([a-z\d])([A-Z])/g;
var camelizeRE = /-(\w)/g;

var testEl = null;

var hyphenate = function hyphenate(str) {
	return str.replace(hyphenateRE, '$1-$2').toLowerCase();
};
var camelize = function camelize(str) {
	return str.replace(camelizeRE, function (e, c) {
		return c ? c.toUpperCase() : '';
	});
};

var normalize = function normalize(prop) {
	if (_cache[prop]) {
		return _cache[prop];
	}
	var res = prefix(prop);
	return _cache[prop] = _cache[res] = res;
};

var prefix = function prefix(prop) {
	prop = hyphenate(prop);
	var camel = camelize(prop);
	var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	if (!testEl) {
		testEl = document.createElement('div');
	}
	var i = prefixes.length;

	var prefixed;

	while (i--) {
		prefixed = camelPrefixes[i] + upper;
		if (prefixed in testEl.style) {
			return prefixes[i] + prop;
		}
	}

	if (camel in testEl.style) {
		return prop;
	}
};
var doc = document;
var toArr = function toArr(obj) {
	return [].slice.call(obj);
};
var qsa = function qsa(sel) {
	return toArr(doc.querySelectorAll(sel));
};

var addStyle = function addStyle(el, styles) {
	if (!(el instanceof Element)) {
		return;
	}
	var name, prop, value;

	// str
	if (isStr(styles)) {
		el.style.cssText = styles;
		return;
	}
	// object
	for (name in styles) {
		if (styles.hasOwnProperty(name)) {
			value = styles[name];
			prop = normalize(name);
			if (value !== null) {
				value += '';
			}
			if (value) {
				el.style.setProperty(prop, value);
			} else {
				el.style.removeProperty(prop);
			}
		}
	}
};

var isStr = function isStr(str) {
	return typeof str === 'string';
};

module.exports = function style(els, styles, val /*value*/) {
	if (isStr(styles)) {
		if (arguments.length === 3) {
			styles = _defineProperty({}, styles, val);
		}
	}
	if (isStr(els)) {
		els = qsa(els);
	} else if (Array.isArray(els)) {
		var newels = [];
		els.forEach(function (el) {
			return newels = newels.concat(isStr(el) ? qsa(el) : el);
		});
		els = newels;
	} else if ((typeof els === 'undefined' ? 'undefined' : _typeof(els)) === 'object' && els.length) {
		els = toArr(els);
	} else {
		els = [els];
	}
	els.forEach(function (el) {
		return addStyle(el, styles);
	});
};