/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {


}).call(this);
/*! For license information please see bundle.js.LICENSE.txt */

!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=138)}([function(e,t,n){e.exports=n(305)()},function(e,t,n){"use strict";e.exports=n(22)},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o,i,a,u){if(!e){var s;if(void 0===t)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,r,o,i,a,u],l=0;(s=new Error(t.replace(/%s/g,(function(){return c[l++]})))).name="Invariant Violation"}throw s.framesToPop=1,s}}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o,i,a,u){if(!e){var s;if(void 0===t)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,r,o,i,a,u],l=0;(s=new Error(t.replace(/%s/g,(function(){return c[l++]})))).name="Invariant Violation"}throw s.framesToPop=1,s}}},function(e,t,n){"use strict";e.exports=function(e){for(var t=arguments.length-1,n="Minified React error #"+e+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+e,r=0;r<t;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);n+=" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var o=new Error(n);throw o.name="Invariant Violation",o.framesToPop=1,o}},function(e,t,n){"use strict";var r=n(12);e.exports=r},function(e,t,n){"use strict";var r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function a(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,u,s=a(e),c=1;c<arguments.length;c++){for(var l in n=Object(arguments[c]))o.call(n,l)&&(s[l]=n[l]);if(r){u=r(n);for(var p=0;p<u.length;p++)i.call(n,u[p])&&(s[u[p]]=n[u[p]])}}return s}},function(e,t,n){"use strict";var r=n(4),o=n(24),i=n(89),a=(n(2),o.ID_ATTRIBUTE_NAME),u=i,s="__reactInternalInstance$"+Math.random().toString(36).slice(2);function c(e,t){return 1===e.nodeType&&e.getAttribute(a)===String(t)||8===e.nodeType&&e.nodeValue===" react-text: "+t+" "||8===e.nodeType&&e.nodeValue===" react-empty: "+t+" "}function l(e){for(var t;t=e._renderedComponent;)e=t;return e}function p(e,t){var n=l(e);n._hostNode=t,t[s]=n}function f(e,t){if(!(e._flags&u.hasCachedChildNodes)){var n=e._renderedChildren,o=t.firstChild;e:for(var i in n)if(n.hasOwnProperty(i)){var a=n[i],s=l(a)._domID;if(0!==s){for(;null!==o;o=o.nextSibling)if(c(o,s)){p(a,o);continue e}r("32",s)}}e._flags|=u.hasCachedChildNodes}}function d(e){if(e[s])return e[s];for(var t,n,r=[];!e[s];){if(r.push(e),!e.parentNode)return null;e=e.parentNode}for(;e&&(n=e[s]);e=r.pop())t=n,r.length&&f(n,e);return t}var h={getClosestInstanceFromNode:d,getInstanceFromNode:function(e){var t=d(e);return null!=t&&t._hostNode===e?t:null},getNodeFromInstance:function(e){if(void 0===e._hostNode&&r("33"),e._hostNode)return e._hostNode;for(var t=[];!e._hostNode;)t.push(e),e._hostParent||r("34"),e=e._hostParent;for(;t.length;e=t.pop())f(e,e._hostNode);return e._hostNode},precacheChildNodes:f,precacheNode:p,uncacheNode:function(e){var t=e._hostNode;t&&(delete t[s],e._hostNode=null)}};e.exports=h},function(e,t,n){"use strict";var r=n(1),o=n(88);if(void 0===r)throw Error("create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.");var i=(new r.Component).updater;e.exports=o(r.Component,r.isValidElement,i)},function(e,t,n){"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),o={canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:r&&!!window.screen,isInWorker:!r};e.exports=o},function(e,t,n){"use strict";e.exports={debugTool:null}},function(e,t,n){"use strict";function r(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}n.r(t),n.d(t,"Provider",(function(){return p})),n.d(t,"createProvider",(function(){return l})),n.d(t,"connectAdvanced",(function(){return P})),n.d(t,"connect",(function(){return te}));var o=n(1),i=n.n(o),a=n(0),u=n.n(a),s=u.a.shape({trySubscribe:u.a.func.isRequired,tryUnsubscribe:u.a.func.isRequired,notifyNestedSubs:u.a.func.isRequired,isSubscribed:u.a.func.isRequired}),c=u.a.shape({subscribe:u.a.func.isRequired,dispatch:u.a.func.isRequired,getState:u.a.func.isRequired});i.a.forwardRef;function l(e){var t;void 0===e&&(e="store");var n=e+"Subscription",i=function(t){r(a,t);var i=a.prototype;function a(n,r){var o;return(o=t.call(this,n,r)||this)[e]=n.store,o}return i.getChildContext=function(){var t;return(t={})[e]=this[e],t[n]=null,t},i.render=function(){return o.Children.only(this.props.children)},a}(o.Component);return i.propTypes={store:c.isRequired,children:u.a.element.isRequired},i.childContextTypes=((t={})[e]=c.isRequired,t[n]=s,t),i}var p=l();function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function h(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}var m=n(51),v=n.n(m),y=n(3),g=n.n(y),b=n(29),_={notify:function(){}};var E=function(){function e(e,t,n){this.store=e,this.parentSub=t,this.onStateChange=n,this.unsubscribe=null,this.listeners=_}var t=e.prototype;return t.addNestedSub=function(e){return this.trySubscribe(),this.listeners.subscribe(e)},t.notifyNestedSubs=function(){this.listeners.notify()},t.isSubscribed=function(){return Boolean(this.unsubscribe)},t.trySubscribe=function(){var e,t;this.unsubscribe||(this.unsubscribe=this.parentSub?this.parentSub.addNestedSub(this.onStateChange):this.store.subscribe(this.onStateChange),this.listeners=(e=[],t=[],{clear:function(){t=null,e=null},notify:function(){for(var n=e=t,r=0;r<n.length;r++)n[r]()},get:function(){return t},subscribe:function(n){var r=!0;return t===e&&(t=e.slice()),t.push(n),function(){r&&null!==e&&(r=!1,t===e&&(t=e.slice()),t.splice(t.indexOf(n),1))}}}))},t.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null,this.listeners.clear(),this.listeners=_)},e}(),C=void 0!==i.a.forwardRef,w=0,O={};function x(){}function P(e,t){var n,i;void 0===t&&(t={});var a=t,u=a.getDisplayName,l=void 0===u?function(e){return"ConnectAdvanced("+e+")"}:u,p=a.methodName,m=void 0===p?"connectAdvanced":p,y=a.renderCountProp,_=void 0===y?void 0:y,P=a.shouldHandleStateChanges,k=void 0===P||P,M=a.storeKey,S=void 0===M?"store":M,T=a.withRef,R=void 0!==T&&T,N=h(a,["getDisplayName","methodName","renderCountProp","shouldHandleStateChanges","storeKey","withRef"]),L=S+"Subscription",I=w++,A=((n={})[S]=c,n[L]=s,n),j=((i={})[L]=s,i);return function(t){g()(Object(b.isValidElementType)(t),"You must pass a component to the function returned by "+m+". Instead received "+JSON.stringify(t));var n=t.displayName||t.name||"Component",i=l(n),a=d({},N,{getDisplayName:l,methodName:m,renderCountProp:_,shouldHandleStateChanges:k,storeKey:S,withRef:R,displayName:i,wrappedComponentName:n,WrappedComponent:t}),u=function(n){function u(e,t){var r;return(r=n.call(this,e,t)||this).version=I,r.state={},r.renderCount=0,r.store=e[S]||t[S],r.propsMode=Boolean(e[S]),r.setWrappedInstance=r.setWrappedInstance.bind(f(f(r))),g()(r.store,'Could not find "'+S+'" in either the context or props of "'+i+'". Either wrap the root component in a <Provider>, or explicitly pass "'+S+'" as a prop to "'+i+'".'),r.initSelector(),r.initSubscription(),r}r(u,n);var s=u.prototype;return s.getChildContext=function(){var e,t=this.propsMode?null:this.subscription;return(e={})[L]=t||this.context[L],e},s.componentDidMount=function(){k&&(this.subscription.trySubscribe(),this.selector.run(this.props),this.selector.shouldComponentUpdate&&this.forceUpdate())},s.componentWillReceiveProps=function(e){this.selector.run(e)},s.shouldComponentUpdate=function(){return this.selector.shouldComponentUpdate},s.componentWillUnmount=function(){this.subscription&&this.subscription.tryUnsubscribe(),this.subscription=null,this.notifyNestedSubs=x,this.store=null,this.selector.run=x,this.selector.shouldComponentUpdate=!1},s.getWrappedInstance=function(){return g()(R,"To access the wrapped instance, you need to specify { withRef: true } in the options argument of the "+m+"() call."),this.wrappedInstance},s.setWrappedInstance=function(e){this.wrappedInstance=e},s.initSelector=function(){var t=e(this.store.dispatch,a);this.selector=function(e,t){var n={run:function(r){try{var o=e(t.getState(),r);(o!==n.props||n.error)&&(n.shouldComponentUpdate=!0,n.props=o,n.error=null)}catch(e){n.shouldComponentUpdate=!0,n.error=e}}};return n}(t,this.store),this.selector.run(this.props)},s.initSubscription=function(){if(k){var e=(this.propsMode?this.props:this.context)[L];this.subscription=new E(this.store,e,this.onStateChange.bind(this)),this.notifyNestedSubs=this.subscription.notifyNestedSubs.bind(this.subscription)}},s.onStateChange=function(){this.selector.run(this.props),this.selector.shouldComponentUpdate?(this.componentDidUpdate=this.notifyNestedSubsOnComponentDidUpdate,this.setState(O)):this.notifyNestedSubs()},s.notifyNestedSubsOnComponentDidUpdate=function(){this.componentDidUpdate=void 0,this.notifyNestedSubs()},s.isSubscribed=function(){return Boolean(this.subscription)&&this.subscription.isSubscribed()},s.addExtraProps=function(e){if(!(R||_||this.propsMode&&this.subscription))return e;var t=d({},e);return R&&(t.ref=this.setWrappedInstance),_&&(t[_]=this.renderCount++),this.propsMode&&this.subscription&&(t[L]=this.subscription),t},s.render=function(){var e=this.selector;if(e.shouldComponentUpdate=!1,e.error)throw e.error;return Object(o.createElement)(t,this.addExtraProps(e.props))},u}(o.Component);return C&&(u.prototype.UNSAFE_componentWillReceiveProps=u.prototype.componentWillReceiveProps,delete u.prototype.componentWillReceiveProps),u.WrappedComponent=t,u.displayName=i,u.childContextTypes=j,u.contextTypes=A,u.propTypes=A,v()(u,t)}}var k=Object.prototype.hasOwnProperty;function M(e,t){return e===t?0!==e||0!==t||1/e==1/t:e!=e&&t!=t}function S(e,t){if(M(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(var o=0;o<n.length;o++)if(!k.call(t,n[o])||!M(e[n[o]],t[n[o]]))return!1;return!0}var T=n(50);function R(e){return function(t,n){var r=e(t,n);function o(){return r}return o.dependsOnOwnProps=!1,o}}function N(e){return null!==e.dependsOnOwnProps&&void 0!==e.dependsOnOwnProps?Boolean(e.dependsOnOwnProps):1!==e.length}function L(e,t){return function(t,n){n.displayName;var r=function(e,t){return r.dependsOnOwnProps?r.mapToProps(e,t):r.mapToProps(e)};return r.dependsOnOwnProps=!0,r.mapToProps=function(t,n){r.mapToProps=e,r.dependsOnOwnProps=N(e);var o=r(t,n);return"function"==typeof o&&(r.mapToProps=o,r.dependsOnOwnProps=N(o),o=r(t,n)),o},r}}var I=[function(e){return"function"==typeof e?L(e):void 0},function(e){return e?void 0:R((function(e){return{dispatch:e}}))},function(e){return e&&"object"==typeof e?R((function(t){return Object(T.bindActionCreators)(e,t)})):void 0}];var A=[function(e){return"function"==typeof e?L(e):void 0},function(e){return e?void 0:R((function(){return{}}))}];function j(e,t,n){return d({},n,e,t)}var D=[function(e){return"function"==typeof e?function(e){return function(t,n){n.displayName;var r,o=n.pure,i=n.areMergedPropsEqual,a=!1;return function(t,n,u){var s=e(t,n,u);return a?o&&i(s,r)||(r=s):(a=!0,r=s),r}}}(e):void 0},function(e){return e?void 0:function(){return j}}];function U(e,t,n,r){return function(o,i){return n(e(o,i),t(r,i),i)}}function F(e,t,n,r,o){var i,a,u,s,c,l=o.areStatesEqual,p=o.areOwnPropsEqual,f=o.areStatePropsEqual,d=!1;function h(o,d){var h,m,v=!p(d,a),y=!l(o,i);return i=o,a=d,v&&y?(u=e(i,a),t.dependsOnOwnProps&&(s=t(r,a)),c=n(u,s,a)):v?(e.dependsOnOwnProps&&(u=e(i,a)),t.dependsOnOwnProps&&(s=t(r,a)),c=n(u,s,a)):y?(h=e(i,a),m=!f(h,u),u=h,m&&(c=n(u,s,a)),c):c}return function(o,l){return d?h(o,l):(u=e(i=o,a=l),s=t(r,a),c=n(u,s,a),d=!0,c)}}function V(e,t){var n=t.initMapStateToProps,r=t.initMapDispatchToProps,o=t.initMergeProps,i=h(t,["initMapStateToProps","initMapDispatchToProps","initMergeProps"]),a=n(e,i),u=r(e,i),s=o(e,i);return(i.pure?F:U)(a,u,s,e,i)}function B(e,t,n){for(var r=t.length-1;r>=0;r--){var o=t[r](e);if(o)return o}return function(t,r){throw new Error("Invalid value of type "+typeof e+" for "+n+" argument when connecting component "+r.wrappedComponentName+".")}}function W(e,t){return e===t}var q,H,K,z,$,Y,G,Q,X,J,Z,ee,te=(K=(H=void 0===q?{}:q).connectHOC,z=void 0===K?P:K,$=H.mapStateToPropsFactories,Y=void 0===$?A:$,G=H.mapDispatchToPropsFactories,Q=void 0===G?I:G,X=H.mergePropsFactories,J=void 0===X?D:X,Z=H.selectorFactory,ee=void 0===Z?V:Z,function(e,t,n,r){void 0===r&&(r={});var o=r,i=o.pure,a=void 0===i||i,u=o.areStatesEqual,s=void 0===u?W:u,c=o.areOwnPropsEqual,l=void 0===c?S:c,p=o.areStatePropsEqual,f=void 0===p?S:p,m=o.areMergedPropsEqual,v=void 0===m?S:m,y=h(o,["pure","areStatesEqual","areOwnPropsEqual","areStatePropsEqual","areMergedPropsEqual"]),g=B(e,Y,"mapStateToProps"),b=B(t,Q,"mapDispatchToProps"),_=B(n,J,"mergeProps");return z(ee,d({methodName:"connect",getDisplayName:function(e){return"Connect("+e+")"},shouldHandleStateChanges:Boolean(e),initMapStateToProps:g,initMapDispatchToProps:b,initMergeProps:_,pure:a,areStatesEqual:s,areOwnPropsEqual:l,areStatePropsEqual:f,areMergedPropsEqual:v},y))})},function(e,t,n){"use strict";function r(e){return function(){return e}}var o=function(){};o.thatReturns=r,o.thatReturnsFalse=r(!1),o.thatReturnsTrue=r(!0),o.thatReturnsNull=r(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(e){return e},e.exports=o},function(e,t,n){"use strict";var r=n(4),o=n(6),i=n(93),a=n(19),u=n(94),s=n(25),c=n(38),l=n(2),p=[],f=0,d=i.getPooled(),h=!1,m=null;function v(){C.ReactReconcileTransaction&&m||r("123")}var y=[{initialize:function(){this.dirtyComponentsLength=p.length},close:function(){this.dirtyComponentsLength!==p.length?(p.splice(0,this.dirtyComponentsLength),E()):p.length=0}},{initialize:function(){this.callbackQueue.reset()},close:function(){this.callbackQueue.notifyAll()}}];function g(){this.reinitializeTransaction(),this.dirtyComponentsLength=null,this.callbackQueue=i.getPooled(),this.reconcileTransaction=C.ReactReconcileTransaction.getPooled(!0)}function b(e,t){return e._mountOrder-t._mountOrder}function _(e){var t=e.dirtyComponentsLength;t!==p.length&&r("124",t,p.length),p.sort(b),f++;for(var n=0;n<t;n++){var o,i=p[n],a=i._pendingCallbacks;if(i._pendingCallbacks=null,u.logTopLevelRenders){var c=i;i._currentElement.type.isReactTopLevelWrapper&&(c=i._renderedComponent),o="React update: "+c.getName(),console.time(o)}if(s.performUpdateIfNecessary(i,e.reconcileTransaction,f),o&&console.timeEnd(o),a)for(var l=0;l<a.length;l++)e.callbackQueue.enqueue(a[l],i.getPublicInstance())}}o(g.prototype,c,{getTransactionWrappers:function(){return y},destructor:function(){this.dirtyComponentsLength=null,i.release(this.callbackQueue),this.callbackQueue=null,C.ReactReconcileTransaction.release(this.reconcileTransaction),this.reconcileTransaction=null},perform:function(e,t,n){return c.perform.call(this,this.reconcileTransaction.perform,this.reconcileTransaction,e,t,n)}}),a.addPoolingTo(g);var E=function(){for(;p.length||h;){if(p.length){var e=g.getPooled();e.perform(_,null,e),g.release(e)}if(h){h=!1;var t=d;d=i.getPooled(),t.notifyAll(),i.release(t)}}};var C={ReactReconcileTransaction:null,batchedUpdates:function(e,t,n,r,o,i){return v(),m.batchedUpdates(e,t,n,r,o,i)},enqueueUpdate:function e(t){v(),m.isBatchingUpdates?(p.push(t),null==t._updateBatchNumber&&(t._updateBatchNumber=f+1)):m.batchedUpdates(e,t)},flushBatchedUpdates:E,injection:{injectReconcileTransaction:function(e){e||r("126"),C.ReactReconcileTransaction=e},injectBatchingStrategy:function(e){e||r("127"),"function"!=typeof e.batchedUpdates&&r("128"),"boolean"!=typeof e.isBatchingUpdates&&r("129"),m=e}},asap:function(e,t){l(m.isBatchingUpdates,"ReactUpdates.asap: Can't enqueue an asap callback in a context whereupdates are not being batched."),d.enqueue(e,t),h=!0}};e.exports=C},function(e,t,n){"use strict";e.exports={current:null}},function(e,t,n){"use strict";var r=n(6),o=n(19),i=n(12),a=(n(5),["dispatchConfig","_targetInst","nativeEvent","isDefaultPrevented","isPropagationStopped","_dispatchListeners","_dispatchInstances"]),u={type:null,target:null,currentTarget:i.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};function s(e,t,n,r){this.dispatchConfig=e,this._targetInst=t,this.nativeEvent=n;var o=this.constructor.Interface;for(var a in o)if(o.hasOwnProperty(a)){0;var u=o[a];u?this[a]=u(n):"target"===a?this.target=r:this[a]=n[a]}var s=null!=n.defaultPrevented?n.defaultPrevented:!1===n.returnValue;return this.isDefaultPrevented=s?i.thatReturnsTrue:i.thatReturnsFalse,this.isPropagationStopped=i.thatReturnsFalse,this}r(s.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=i.thatReturnsTrue)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=i.thatReturnsTrue)},persist:function(){this.isPersistent=i.thatReturnsTrue},isPersistent:i.thatReturnsFalse,destructor:function(){var e=this.constructor.Interface;for(var t in e)this[t]=null;for(var n=0;n<a.length;n++)this[a[n]]=null}}),s.Interface=u,s.augmentClass=function(e,t){var n=function(){};n.prototype=this.prototype;var i=new n;r(i,e.prototype),e.prototype=i,e.prototype.constructor=e,e.Interface=r({},this.Interface,t),e.augmentClass=this.augmentClass,o.addPoolingTo(e,o.fourArgumentPooler)},o.addPoolingTo(s,o.fourArgumentPooler),e.exports=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.closeImageModal=t.openImageModal=t.setImageModal=t.toggleLemonModal=t.toggleLemonForm=t.clearLemonForm=t.clearLemonErrors=t.receiveLemonErrors=t.editLemon=t.removeLemon=t.receiveAllLemons=t.receiveSingleLemon=t.updateLemonForm=t.clearFocus=t.setFocus=t.deleteLemon=t.updateLemon=t.createLemon=t.fetchLemons=void 0;var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(320));t.fetchLemons=function(e){return function(t){return r.getLemonsInBounds(e).then((function(e){return t(a(e))}))}},t.createLemon=function(e){return function(t){return r.postLemon(e).then((function(e){return t(i(e))}),(function(e){return t(s(e.responseJSON.errors))})).then((function(){return t(c())})).then((function(){return t(l())})).then((function(){return t(p(!0))})).then((function(){return t(o())}))}},t.updateLemon=function(e){return function(t){return r.patchLemon(e).then((function(e){return t(i(e))}),(function(e){return t(s(e.responseJSON.errors))})).then((function(){return t(c())})).then((function(){return t(l())}))}},t.deleteLemon=function(e){return function(t){return r.destroyLemon(e).then((function(){return t(u(e))}),(function(e){return t(s(e.responseJSON.errors))}))}},t.setFocus=function(e){return{type:"SET_FOCUS",lemon:e}};var o=t.clearFocus=function(){return{type:"CLEAR_FOCUS"}},i=(t.updateLemonForm=function(e){return{type:"UPDATE_LEMON_FORM",lemon:e}},t.receiveSingleLemon=function(e){return{type:"RECEIVE_SINGLE_LEMON",lemon:e}}),a=t.receiveAllLemons=function(e){return{type:"RECEIVE_ALL_LEMONS",lemons:e}},u=t.removeLemon=function(e){return{type:"REMOVE_LEMON",id:e}},s=(t.editLemon=function(e){return{type:"EDIT_LEMON",lemonId:e}},t.receiveLemonErrors=function(e){return{type:"RECEIVE_LEMON_ERRORS",errors:e}}),c=(t.clearLemonErrors=function(){return{type:"CLEAR_LEMON_ERRORS"}},t.clearLemonForm=function(){return{type:"CLEAR_LEMON_FORM"}}),l=t.toggleLemonForm=function(){return{type:"TOGGLE_LEMON_FORM"}},p=t.toggleLemonModal=function(e){return{type:"TOGGLE_LEMON_MODAL",val:e}};t.setImageModal=function(e){return{type:"SET_IMAGE_MODAL",url:e}},t.openImageModal=function(){return{type:"OPEN_IMAGE_MODAL"}},t.closeImageModal=function(){return{type:"CLOSE_IMAGE_MODAL"}}},function(e,t,n){"use strict";e.exports=function(){}},function(e,t,n){"use strict";t.__esModule=!0,t.createPath=t.parsePath=t.getQueryStringValueFromPath=t.stripQueryStringValueFromPath=t.addQueryStringValueToPath=void 0;var r,o=n(17);(r=o)&&r.__esModule;t.addQueryStringValueToPath=function(e,t,n){var r=i(e),o=r.pathname,u=r.search,s=r.hash;return a({pathname:o,search:u+(-1===u.indexOf("?")?"?":"&")+t+"="+n,hash:s})},t.stripQueryStringValueFromPath=function(e,t){var n=i(e),r=n.pathname,o=n.search,u=n.hash;return a({pathname:r,search:o.replace(new RegExp("([?&])"+t+"=[a-zA-Z0-9]+(&?)"),(function(e,t,n){return"?"===t?t:n})),hash:u})},t.getQueryStringValueFromPath=function(e,t){var n=i(e).search.match(new RegExp("[?&]"+t+"=([a-zA-Z0-9]+)"));return n&&n[1]};var i=t.parsePath=function(e){var t,n,r=null==(n=(t=e).match(/^(https?:)?\/\/[^\/]*/))?t:t.substring(n[0].length),o="",i="",a=r.indexOf("#");-1!==a&&(i=r.substring(a),r=r.substring(0,a));var u=r.indexOf("?");return-1!==u&&(o=r.substring(u),r=r.substring(0,u)),""===r&&(r="/"),{pathname:r,search:o,hash:i}},a=t.createPath=function(e){if(null==e||"string"==typeof e)return e;var t=e.basename,n=e.pathname,r=e.search,o=e.hash,i=(t||"")+n;return r&&"?"!==r&&(i+=r),o&&(i+=o),i}},function(e,t,n){"use strict";var r=n(4),o=(n(2),function(e){if(this.instancePool.length){var t=this.instancePool.pop();return this.call(t,e),t}return new this(e)}),i=function(e){e instanceof this||r("25"),e.destructor(),this.instancePool.length<this.poolSize&&this.instancePool.push(e)},a=o,u={addPoolingTo:function(e,t){var n=e;return n.instancePool=[],n.getPooled=t||a,n.poolSize||(n.poolSize=10),n.release=i,n},oneArgumentPooler:o,twoArgumentPooler:function(e,t){if(this.instancePool.length){var n=this.instancePool.pop();return this.call(n,e,t),n}return new this(e,t)},threeArgumentPooler:function(e,t,n){if(this.instancePool.length){var r=this.instancePool.pop();return this.call(r,e,t,n),r}return new this(e,t,n)},fourArgumentPooler:function(e,t,n,r){if(this.instancePool.length){var o=this.instancePool.pop();return this.call(o,e,t,n,r),o}return new this(e,t,n,r)}};e.exports=u},function(e,t,n){var r=n(234),o=n(291)((function(e,t,n){r(e,t,n)}));e.exports=o},function(e,t){e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},function(e,t,n){"use strict";var r=n(6),o=n(82),i=n(140),a=n(145),u=n(23),s=n(146),c=n(150),l=n(151),p=n(152),f=u.createElement,d=u.createFactory,h=u.cloneElement,m=r,v={Children:{map:i.map,forEach:i.forEach,count:i.count,toArray:i.toArray,only:p},Component:o.Component,PureComponent:o.PureComponent,createElement:f,cloneElement:h,isValidElement:u.isValidElement,PropTypes:s,createClass:l,createFactory:d,createMixin:function(e){return e},DOM:a,version:c,__spread:m};e.exports=v},function(e,t,n){"use strict";var r=n(6),o=n(14),i=(n(5),n(84),Object.prototype.hasOwnProperty),a=n(85),u={key:!0,ref:!0,__self:!0,__source:!0};function s(e){return void 0!==e.ref}function c(e){return void 0!==e.key}var l=function(e,t,n,r,o,i,u){return{$$typeof:a,type:e,key:t,ref:n,props:u,_owner:i}};l.createElement=function(e,t,n){var r,a={},p=null,f=null;if(null!=t)for(r in s(t)&&(f=t.ref),c(t)&&(p=""+t.key),void 0===t.__self?null:t.__self,void 0===t.__source?null:t.__source,t)i.call(t,r)&&!u.hasOwnProperty(r)&&(a[r]=t[r]);var d=arguments.length-2;if(1===d)a.children=n;else if(d>1){for(var h=Array(d),m=0;m<d;m++)h[m]=arguments[m+2];0,a.children=h}if(e&&e.defaultProps){var v=e.defaultProps;for(r in v)void 0===a[r]&&(a[r]=v[r])}return l(e,p,f,0,0,o.current,a)},l.createFactory=function(e){var t=l.createElement.bind(null,e);return t.type=e,t},l.cloneAndReplaceKey=function(e,t){return l(e.type,t,e.ref,e._self,e._source,e._owner,e.props)},l.cloneElement=function(e,t,n){var a,p,f=r({},e.props),d=e.key,h=e.ref,m=(e._self,e._source,e._owner);if(null!=t)for(a in s(t)&&(h=t.ref,m=o.current),c(t)&&(d=""+t.key),e.type&&e.type.defaultProps&&(p=e.type.defaultProps),t)i.call(t,a)&&!u.hasOwnProperty(a)&&(void 0===t[a]&&void 0!==p?f[a]=p[a]:f[a]=t[a]);var v=arguments.length-2;if(1===v)f.children=n;else if(v>1){for(var y=Array(v),g=0;g<v;g++)y[g]=arguments[g+2];f.children=y}return l(e.type,d,h,0,0,m,f)},l.isValidElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===a},e.exports=l},function(e,t,n){"use strict";var r=n(4);n(2);function o(e,t){return(e&t)===t}var i={MUST_USE_PROPERTY:1,HAS_BOOLEAN_VALUE:4,HAS_NUMERIC_VALUE:8,HAS_POSITIVE_NUMERIC_VALUE:24,HAS_OVERLOADED_BOOLEAN_VALUE:32,injectDOMPropertyConfig:function(e){var t=i,n=e.Properties||{},a=e.DOMAttributeNamespaces||{},s=e.DOMAttributeNames||{},c=e.DOMPropertyNames||{},l=e.DOMMutationMethods||{};for(var p in e.isCustomAttribute&&u._isCustomAttributeFunctions.push(e.isCustomAttribute),n){u.properties.hasOwnProperty(p)&&r("48",p);var f=p.toLowerCase(),d=n[p],h={attributeName:f,attributeNamespace:null,propertyName:p,mutationMethod:null,mustUseProperty:o(d,t.MUST_USE_PROPERTY),hasBooleanValue:o(d,t.HAS_BOOLEAN_VALUE),hasNumericValue:o(d,t.HAS_NUMERIC_VALUE),hasPositiveNumericValue:o(d,t.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:o(d,t.HAS_OVERLOADED_BOOLEAN_VALUE)};if(h.hasBooleanValue+h.hasNumericValue+h.hasOverloadedBooleanValue<=1||r("50",p),s.hasOwnProperty(p)){var m=s[p];h.attributeName=m}a.hasOwnProperty(p)&&(h.attributeNamespace=a[p]),c.hasOwnProperty(p)&&(h.propertyName=c[p]),l.hasOwnProperty(p)&&(h.mutationMethod=l[p]),u.properties[p]=h}}},a=":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",u={ID_ATTRIBUTE_NAME:"data-reactid",ROOT_ATTRIBUTE_NAME:"data-reactroot",ATTRIBUTE_NAME_START_CHAR:a,ATTRIBUTE_NAME_CHAR:a+"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",properties:{},getPossibleStandardName:null,_isCustomAttributeFunctions:[],isCustomAttribute:function(e){for(var t=0;t<u._isCustomAttributeFunctions.length;t++){if((0,u._isCustomAttributeFunctions[t])(e))return!0}return!1},injection:i};e.exports=u},function(e,t,n){"use strict";var r=n(162);n(10),n(5);function o(){r.attachRefs(this,this._currentElement)}var i={mountComponent:function(e,t,n,r,i,a){var u=e.mountComponent(t,n,r,i,a);return e._currentElement&&null!=e._currentElement.ref&&t.getReactMountReady().enqueue(o,e),u},getHostNode:function(e){return e.getHostNode()},unmountComponent:function(e,t){r.detachRefs(e,e._currentElement),e.unmountComponent(t)},receiveComponent:function(e,t,n,i){var a=e._currentElement;if(t!==a||i!==e._context){0;var u=r.shouldUpdateRefs(a,t);u&&r.detachRefs(e,a),e.receiveComponent(t,n,i),u&&e._currentElement&&null!=e._currentElement.ref&&n.getReactMountReady().enqueue(o,e)}},performUpdateIfNecessary:function(e,t,n){e._updateBatchNumber===n&&e.performUpdateIfNecessary(t)}};e.exports=i},function(e,t,n){"use strict";var r=n(61),o=n(40),i=n(62),a=n(98),u="undefined"!=typeof document&&"number"==typeof document.documentMode||"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent&&/\bEdge\/\d/.test(navigator.userAgent);function s(e){if(u){var t=e.node,n=e.children;if(n.length)for(var r=0;r<n.length;r++)c(t,n[r],null);else null!=e.html?o(t,e.html):null!=e.text&&a(t,e.text)}}var c=i((function(e,t,n){11===t.node.nodeType||1===t.node.nodeType&&"object"===t.node.nodeName.toLowerCase()&&(null==t.node.namespaceURI||t.node.namespaceURI===r.html)?(s(t),e.insertBefore(t.node,n)):(e.insertBefore(t.node,n),s(t))}));function l(){return this.node.nodeName}function p(e){return{node:e,children:[],html:null,text:null,toString:l}}p.insertTreeBefore=c,p.replaceChildWithTree=function(e,t){e.parentNode.replaceChild(t.node,e),s(t)},p.queueChild=function(e,t){u?e.children.push(t):e.node.appendChild(t.node)},p.queueHTML=function(e,t){u?e.html=t:o(e.node,t)},p.queueText=function(e,t){u?e.text=t:a(e.node,t)},e.exports=p},function(e,t,n){var r=n(117),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();e.exports=i},function(e,t,n){"use strict";t.__esModule=!0,t.locationsAreEqual=t.statesAreEqual=t.createLocation=t.createQuery=void 0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=s(n(3)),a=(s(n(17)),n(18)),u=n(36);function s(e){return e&&e.__esModule?e:{default:e}}t.createQuery=function(e){return o(Object.create(null),e)},t.createLocation=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u.POP,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r="string"==typeof e?(0,a.parsePath)(e):e,o=r.pathname||"/",i=r.search||"",s=r.hash||"",c=r.state;return{pathname:o,search:i,hash:s,state:c,action:t,key:n}};var c=function(e){return"[object Date]"===Object.prototype.toString.call(e)},l=t.statesAreEqual=function e(t,n){if(t===n)return!0;var o=void 0===t?"undefined":r(t);if(o!==(void 0===n?"undefined":r(n)))return!1;if("function"===o&&(0,i.default)(!1),"object"===o){if(c(t)&&c(n)&&(0,i.default)(!1),!Array.isArray(t)){var a=Object.keys(t),u=Object.keys(n);return a.length===u.length&&a.every((function(r){return e(t[r],n[r])}))}return Array.isArray(n)&&t.length===n.length&&t.every((function(t,r){return e(t,n[r])}))}return!1};t.locationsAreEqual=function(e,t){return e.key===t.key&&e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash&&l(e.state,t.state)}},function(e,t,n){"use strict";e.exports=n(148)},function(e,t,n){"use strict";e.exports=function(e){for(var t=arguments.length-1,n="Minified React error #"+e+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+e,r=0;r<t;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);n+=" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var o=new Error(n);throw o.name="Invariant Violation",o.framesToPop=1,o}},function(e,t,n){"use strict";var r=n(32),o=n(55),i=n(90),a=n(91),u=(n(5),r.getListener);function s(e,t,n){var r=function(e,t,n){var r=t.dispatchConfig.phasedRegistrationNames[n];return u(e,r)}(e,n,t);r&&(n._dispatchListeners=i(n._dispatchListeners,r),n._dispatchInstances=i(n._dispatchInstances,e))}function c(e){e&&e.dispatchConfig.phasedRegistrationNames&&o.traverseTwoPhase(e._targetInst,s,e)}function l(e){if(e&&e.dispatchConfig.phasedRegistrationNames){var t=e._targetInst,n=t?o.getParentInstance(t):null;o.traverseTwoPhase(n,s,e)}}function p(e,t,n){if(n&&n.dispatchConfig.registrationName){var r=n.dispatchConfig.registrationName,o=u(e,r);o&&(n._dispatchListeners=i(n._dispatchListeners,o),n._dispatchInstances=i(n._dispatchInstances,e))}}function f(e){e&&e.dispatchConfig.registrationName&&p(e._targetInst,0,e)}var d={accumulateTwoPhaseDispatches:function(e){a(e,c)},accumulateTwoPhaseDispatchesSkipTarget:function(e){a(e,l)},accumulateDirectDispatches:function(e){a(e,f)},accumulateEnterLeaveDispatches:function(e,t,n,r){o.traverseEnterLeave(n,r,p,e,t)}};e.exports=d},function(e,t,n){"use strict";var r=n(4),o=n(54),i=n(55),a=n(56),u=n(90),s=n(91),c=(n(2),{}),l=null,p=function(e,t){e&&(i.executeDispatchesInOrder(e,t),e.isPersistent()||e.constructor.release(e))},f=function(e){return p(e,!0)},d=function(e){return p(e,!1)},h=function(e){return"."+e._rootNodeID};var m={injection:{injectEventPluginOrder:o.injectEventPluginOrder,injectEventPluginsByName:o.injectEventPluginsByName},putListener:function(e,t,n){"function"!=typeof n&&r("94",t,typeof n);var i=h(e);(c[t]||(c[t]={}))[i]=n;var a=o.registrationNameModules[t];a&&a.didPutListener&&a.didPutListener(e,t,n)},getListener:function(e,t){var n=c[t];if(function(e,t,n){switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":return!(!n.disabled||(r=t,"button"!==r&&"input"!==r&&"select"!==r&&"textarea"!==r));default:return!1}var r}(t,e._currentElement.type,e._currentElement.props))return null;var r=h(e);return n&&n[r]},deleteListener:function(e,t){var n=o.registrationNameModules[t];n&&n.willDeleteListener&&n.willDeleteListener(e,t);var r=c[t];r&&delete r[h(e)]},deleteAllListeners:function(e){var t=h(e);for(var n in c)if(c.hasOwnProperty(n)&&c[n][t]){var r=o.registrationNameModules[n];r&&r.willDeleteListener&&r.willDeleteListener(e,n),delete c[n][t]}},extractEvents:function(e,t,n,r){for(var i,a=o.plugins,s=0;s<a.length;s++){var c=a[s];if(c){var l=c.extractEvents(e,t,n,r);l&&(i=u(i,l))}}return i},enqueueEvents:function(e){e&&(l=u(l,e))},processEventQueue:function(e){var t=l;l=null,s(t,e?f:d),l&&r("95"),a.rethrowCaughtError()},__purge:function(){c={}},__getListenerBank:function(){return c}};e.exports=m},function(e,t,n){"use strict";var r=n(15),o=n(57),i={view:function(e){if(e.view)return e.view;var t=o(e);if(t.window===t)return t;var n=t.ownerDocument;return n?n.defaultView||n.parentWindow:window},detail:function(e){return e.detail||0}};function a(e,t,n,o){return r.call(this,e,t,n,o)}r.augmentClass(a,i),e.exports=a},function(e,t,n){"use strict";var r={remove:function(e){e._reactInternalInstance=void 0},get:function(e){return e._reactInternalInstance},has:function(e){return void 0!==e._reactInternalInstance},set:function(e,t){e._reactInternalInstance=t}};e.exports=r},function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e}},function(e,t,n){"use strict";t.__esModule=!0;t.PUSH="PUSH",t.REPLACE="REPLACE",t.POP="POP"},function(e,t,n){"use strict";e.exports={}},function(e,t,n){"use strict";var r=n(4),o=(n(2),{}),i={reinitializeTransaction:function(){this.transactionWrappers=this.getTransactionWrappers(),this.wrapperInitData?this.wrapperInitData.length=0:this.wrapperInitData=[],this._isInTransaction=!1},_isInTransaction:!1,getTransactionWrappers:null,isInTransaction:function(){return!!this._isInTransaction},perform:function(e,t,n,o,i,a,u,s){var c,l;this.isInTransaction()&&r("27");try{this._isInTransaction=!0,c=!0,this.initializeAll(0),l=e.call(t,n,o,i,a,u,s),c=!1}finally{try{if(c)try{this.closeAll(0)}catch(e){}else this.closeAll(0)}finally{this._isInTransaction=!1}}return l},initializeAll:function(e){for(var t=this.transactionWrappers,n=e;n<t.length;n++){var r=t[n];try{this.wrapperInitData[n]=o,this.wrapperInitData[n]=r.initialize?r.initialize.call(this):null}finally{if(this.wrapperInitData[n]===o)try{this.initializeAll(n+1)}catch(e){}}}},closeAll:function(e){this.isInTransaction()||r("28");for(var t=this.transactionWrappers,n=e;n<t.length;n++){var i,a=t[n],u=this.wrapperInitData[n];try{i=!0,u!==o&&a.close&&a.close.call(this,u),i=!1}finally{if(i)try{this.closeAll(n+1)}catch(e){}}}this.wrapperInitData.length=0}};e.exports=i},function(e,t,n){"use strict";var r=n(33),o=n(97),i={screenX:null,screenY:null,clientX:null,clientY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:n(59),button:function(e){var t=e.button;return"which"in e?t:2===t?2:4===t?1:0},buttons:null,relatedTarget:function(e){return e.relatedTarget||(e.fromElement===e.srcElement?e.toElement:e.fromElement)},pageX:function(e){return"pageX"in e?e.pageX:e.clientX+o.currentScrollLeft},pageY:function(e){return"pageY"in e?e.pageY:e.clientY+o.currentScrollTop}};function a(e,t,n,o){return r.call(this,e,t,n,o)}r.augmentClass(a,i),e.exports=a},function(e,t,n){"use strict";var r,o=n(9),i=n(61),a=/^[ \r\n\t\f]/,u=/<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/,s=n(62)((function(e,t){if(e.namespaceURI!==i.svg||"innerHTML"in e)e.innerHTML=t;else{(r=r||document.createElement("div")).innerHTML="<svg>"+t+"</svg>";for(var n=r.firstChild;n.firstChild;)e.appendChild(n.firstChild)}}));if(o.canUseDOM){var c=document.createElement("div");c.innerHTML=" ",""===c.innerHTML&&(s=function(e,t){if(e.parentNode&&e.parentNode.replaceChild(e,e),a.test(t)||"<"===t[0]&&u.test(t)){e.innerHTML=String.fromCharCode(65279)+t;var n=e.firstChild;1===n.data.length?e.removeChild(n):n.deleteData(0,1)}else e.innerHTML=t}),c=null}e.exports=s},function(e,t,n){"use strict";var r=/["'&<>]/;e.exports=function(e){return"boolean"==typeof e||"number"==typeof e?""+e:function(e){var t,n=""+e,o=r.exec(n);if(!o)return n;var i="",a=0,u=0;for(a=o.index;a<n.length;a++){switch(n.charCodeAt(a)){case 34:t="&quot;";break;case 38:t="&amp;";break;case 39:t="&#x27;";break;case 60:t="&lt;";break;case 62:t="&gt;";break;default:continue}u!==a&&(i+=n.substring(u,a)),u=a+1,i+=t}return u!==a?i+n.substring(u,a):i}(e)}},function(e,t,n){"use strict";var r,o=n(6),i=n(54),a=n(183),u=n(97),s=n(184),c=n(58),l={},p=!1,f=0,d={topAbort:"abort",topAnimationEnd:s("animationend")||"animationend",topAnimationIteration:s("animationiteration")||"animationiteration",topAnimationStart:s("animationstart")||"animationstart",topBlur:"blur",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topChange:"change",topClick:"click",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topScroll:"scroll",topSeeked:"seeked",topSeeking:"seeking",topSelectionChange:"selectionchange",topStalled:"stalled",topSuspend:"suspend",topTextInput:"textInput",topTimeUpdate:"timeupdate",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",topTouchStart:"touchstart",topTransitionEnd:s("transitionend")||"transitionend",topVolumeChange:"volumechange",topWaiting:"waiting",topWheel:"wheel"},h="_reactListenersID"+String(Math.random()).slice(2);var m=o({},a,{ReactEventListener:null,injection:{injectReactEventListener:function(e){e.setHandleTopLevel(m.handleTopLevel),m.ReactEventListener=e}},setEnabled:function(e){m.ReactEventListener&&m.ReactEventListener.setEnabled(e)},isEnabled:function(){return!(!m.ReactEventListener||!m.ReactEventListener.isEnabled())},listenTo:function(e,t){for(var n=t,r=function(e){return Object.prototype.hasOwnProperty.call(e,h)||(e[h]=f++,l[e[h]]={}),l[e[h]]}(n),o=i.registrationNameDependencies[e],a=0;a<o.length;a++){var u=o[a];r.hasOwnProperty(u)&&r[u]||("topWheel"===u?c("wheel")?m.ReactEventListener.trapBubbledEvent("topWheel","wheel",n):c("mousewheel")?m.ReactEventListener.trapBubbledEvent("topWheel","mousewheel",n):m.ReactEventListener.trapBubbledEvent("topWheel","DOMMouseScroll",n):"topScroll"===u?c("scroll",!0)?m.ReactEventListener.trapCapturedEvent("topScroll","scroll",n):m.ReactEventListener.trapBubbledEvent("topScroll","scroll",m.ReactEventListener.WINDOW_HANDLE):"topFocus"===u||"topBlur"===u?(c("focus",!0)?(m.ReactEventListener.trapCapturedEvent("topFocus","focus",n),m.ReactEventListener.trapCapturedEvent("topBlur","blur",n)):c("focusin")&&(m.ReactEventListener.trapBubbledEvent("topFocus","focusin",n),m.ReactEventListener.trapBubbledEvent("topBlur","focusout",n)),r.topBlur=!0,r.topFocus=!0):d.hasOwnProperty(u)&&m.ReactEventListener.trapBubbledEvent(u,d[u],n),r[u]=!0)}},trapBubbledEvent:function(e,t,n){return m.ReactEventListener.trapBubbledEvent(e,t,n)},trapCapturedEvent:function(e,t,n){return m.ReactEventListener.trapCapturedEvent(e,t,n)},supportsEventPageXY:function(){if(!document.createEvent)return!1;var e=document.createEvent("MouseEvent");return null!=e&&"pageX"in e},ensureScrollValueMonitoring:function(){if(void 0===r&&(r=m.supportsEventPageXY()),!r&&!p){var e=u.refreshScrollValues;m.ReactEventListener.monitorScrollValue(e),p=!0}}});e.exports=m},function(e,t,n){var r=n(236),o=n(237),i=n(238),a=n(239),u=n(240);function s(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}s.prototype.clear=r,s.prototype.delete=o,s.prototype.get=i,s.prototype.has=a,s.prototype.set=u,e.exports=s},function(e,t,n){var r=n(45);e.exports=function(e,t){for(var n=e.length;n--;)if(r(e[n][0],t))return n;return-1}},function(e,t){e.exports=function(e,t){return e===t||e!=e&&t!=t}},function(e,t,n){var r=n(116),o=n(247),i=n(248),a=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":a&&a in Object(e)?o(e):i(e)}},function(e,t,n){var r=n(72)(Object,"create");e.exports=r},function(e,t,n){var r=n(262);e.exports=function(e,t){var n=e.__data__;return r(t)?n["string"==typeof t?"string":"hash"]:n.map}},function(e,t,n){"use strict";t.__esModule=!0;t.addEventListener=function(e,t,n){return e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,n)},t.removeEventListener=function(e,t,n){return e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent("on"+t,n)},t.supportsHistory=function(){var e=window.navigator.userAgent;return(-1===e.indexOf("Android 2.")&&-1===e.indexOf("Android 4.0")||-1===e.indexOf("Mobile Safari")||-1!==e.indexOf("Chrome")||-1!==e.indexOf("Windows Phone"))&&(window.history&&"pushState"in window.history)},t.supportsGoWithoutReloadUsingHash=function(){return-1===window.navigator.userAgent.indexOf("Firefox")},t.supportsPopstateOnHashchange=function(){return-1===window.navigator.userAgent.indexOf("Trident")},t.isExtraneousPopstateEvent=function(e){return void 0===e.state&&-1===navigator.userAgent.indexOf("CriOS")}},function(e,t,n){"use strict";n.r(t),n.d(t,"createStore",(function(){return x})),n.d(t,"combineReducers",(function(){return k})),n.d(t,"bindActionCreators",(function(){return S})),n.d(t,"applyMiddleware",(function(){return N})),n.d(t,"compose",(function(){return T}));var r=n(134),o="object"==typeof self&&self&&self.Object===Object&&self,i=(r.a||o||Function("return this")()).Symbol,a=Object.prototype,u=a.hasOwnProperty,s=a.toString,c=i?i.toStringTag:void 0;var l=function(e){var t=u.call(e,c),n=e[c];try{e[c]=void 0;var r=!0}catch(e){}var o=s.call(e);return r&&(t?e[c]=n:delete e[c]),o},p=Object.prototype.toString;var f=function(e){return p.call(e)},d=i?i.toStringTag:void 0;var h=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":d&&d in Object(e)?l(e):f(e)};var m=function(e,t){return function(n){return e(t(n))}}(Object.getPrototypeOf,Object);var v=function(e){return null!=e&&"object"==typeof e},y=Function.prototype,g=Object.prototype,b=y.toString,_=g.hasOwnProperty,E=b.call(Object);var C=function(e){if(!v(e)||"[object Object]"!=h(e))return!1;var t=m(e);if(null===t)return!0;var n=_.call(t,"constructor")&&t.constructor;return"function"==typeof n&&n instanceof n&&b.call(n)==E},w=n(81),O="@@redux/INIT";function x(e,t,n){var r;if("function"==typeof t&&void 0===n&&(n=t,t=void 0),void 0!==n){if("function"!=typeof n)throw new Error("Expected the enhancer to be a function.");return n(x)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var o=e,i=t,a=[],u=a,s=!1;function c(){u===a&&(u=a.slice())}function l(){return i}function p(e){if("function"!=typeof e)throw new Error("Expected listener to be a function.");var t=!0;return c(),u.push(e),function(){if(t){t=!1,c();var n=u.indexOf(e);u.splice(n,1)}}}function f(e){if(!C(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(s)throw new Error("Reducers may not dispatch actions.");try{s=!0,i=o(i,e)}finally{s=!1}for(var t=a=u,n=0;n<t.length;n++){(0,t[n])()}return e}return f({type:O}),(r={dispatch:f,subscribe:p,getState:l,replaceReducer:function(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");o=e,f({type:O})}})[w.a]=function(){var e,t=p;return(e={subscribe:function(e){if("object"!=typeof e)throw new TypeError("Expected the observer to be an object.");function n(){e.next&&e.next(l())}return n(),{unsubscribe:t(n)}}})[w.a]=function(){return this},e},r}function P(e,t){var n=t&&t.type;return"Given action "+(n&&'"'+n.toString()+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function k(e){for(var t=Object.keys(e),n={},r=0;r<t.length;r++){var o=t[r];0,"function"==typeof e[o]&&(n[o]=e[o])}var i=Object.keys(n);var a=void 0;try{!function(e){Object.keys(e).forEach((function(t){var n=e[t];if(void 0===n(void 0,{type:O}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===n(void 0,{type:"@@redux/PROBE_UNKNOWN_ACTION_"+Math.random().toString(36).substring(7).split("").join(".")}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+O+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')}))}(n)}catch(e){a=e}return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];if(a)throw a;for(var r=!1,o={},u=0;u<i.length;u++){var s=i[u],c=n[s],l=e[s],p=c(l,t);if(void 0===p){var f=P(s,t);throw new Error(f)}o[s]=p,r=r||p!==l}return r?o:e}}function M(e,t){return function(){return t(e.apply(void 0,arguments))}}function S(e,t){if("function"==typeof e)return M(e,t);if("object"!=typeof e||null===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":typeof e)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');for(var n=Object.keys(e),r={},o=0;o<n.length;o++){var i=n[o],a=e[i];"function"==typeof a&&(r[i]=M(a,t))}return r}function T(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce((function(e,t){return function(){return e(t.apply(void 0,arguments))}}))}var R=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function N(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return function(n,r,o){var i,a=e(n,r,o),u=a.dispatch,s={getState:a.getState,dispatch:function(e){return u(e)}};return i=t.map((function(e){return e(s)})),u=T.apply(void 0,i)(a.dispatch),R({},a,{dispatch:u})}}}},function(e,t,n){"use strict";var r=n(29),o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},i={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},a={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},u={};function s(e){return r.isMemo(e)?a:u[e.$$typeof]||o}u[r.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},u[r.Memo]=a;var c=Object.defineProperty,l=Object.getOwnPropertyNames,p=Object.getOwnPropertySymbols,f=Object.getOwnPropertyDescriptor,d=Object.getPrototypeOf,h=Object.prototype;e.exports=function e(t,n,r){if("string"!=typeof n){if(h){var o=d(n);o&&o!==h&&e(t,o,r)}var a=l(n);p&&(a=a.concat(p(n)));for(var u=s(t),m=s(n),v=0;v<a.length;++v){var y=a[v];if(!(i[y]||r&&r[y]||m&&m[y]||u&&u[y])){var g=f(n,y);try{c(t,y,g)}catch(e){}}}}return t}},function(e,t,n){"use strict";t.__esModule=!0;var r,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(312),a=n(77),u=(r=a)&&r.__esModule?r:{default:r},s=n(28),c=n(18);var l=function(e){return(0,i.stringify)(e).replace(/%20/g,"+")},p=i.parse;t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e(t),r=t.stringifyQuery,i=t.parseQueryString;"function"!=typeof r&&(r=l),"function"!=typeof i&&(i=p);var a=function(e){return e?(null==e.query&&(e.query=i(e.search.substring(1))),e):e},f=function(e,t){if(null==t)return e;var n="string"==typeof e?(0,c.parsePath)(e):e,i=r(t);return o({},n,{search:i?"?"+i:""})},d=function(){return a(n.getCurrentLocation())},h=function(e){return n.listenBefore((function(t,n){return(0,u.default)(e,a(t),n)}))},m=function(e){return n.listen((function(t){return e(a(t))}))},v=function(e){return n.push(f(e,e.query))},y=function(e){return n.replace(f(e,e.query))},g=function(e){return n.createPath(f(e,e.query))},b=function(e){return n.createHref(f(e,e.query))},_=function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];var i=n.createLocation.apply(n,[f(e,e.query)].concat(r));return e.query&&(i.query=(0,s.createQuery)(e.query)),a(i)};return o({},n,{getCurrentLocation:d,listenBefore:h,listen:m,push:v,replace:y,createPath:g,createHref:b,createLocation:_})}}},function(e,t,n){"use strict";t.__esModule=!0;var r,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=n(77),a=(r=i)&&r.__esModule?r:{default:r},u=n(18);t.default=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e(t),r=t.basename,i=function(e){return e?(r&&null==e.basename&&(0===e.pathname.toLowerCase().indexOf(r.toLowerCase())?(e.pathname=e.pathname.substring(r.length),e.basename=r,""===e.pathname&&(e.pathname="/")):e.basename=""),e):e},s=function(e){if(!r)return e;var t="string"==typeof e?(0,u.parsePath)(e):e,n=t.pathname,i="/"===r.slice(-1)?r:r+"/",a="/"===n.charAt(0)?n.slice(1):n;return o({},t,{pathname:i+a})},c=function(){return i(n.getCurrentLocation())},l=function(e){return n.listenBefore((function(t,n){return(0,a.default)(e,i(t),n)}))},p=function(e){return n.listen((function(t){return e(i(t))}))},f=function(e){return n.push(s(e))},d=function(e){return n.replace(s(e))},h=function(e){return n.createPath(s(e))},m=function(e){return n.createHref(s(e))},v=function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];return i(n.createLocation.apply(n,[s(e)].concat(r)))};return o({},n,{getCurrentLocation:c,listenBefore:l,listen:p,push:f,replace:d,createPath:h,createHref:m,createLocation:v})}}},function(e,t,n){"use strict";var r=n(4),o=(n(2),null),i={};function a(){if(o)for(var e in i){var t=i[e],n=o.indexOf(e);if(n>-1||r("96",e),!c.plugins[n]){t.extractEvents||r("97",e),c.plugins[n]=t;var a=t.eventTypes;for(var s in a)u(a[s],t,s)||r("98",s,e)}}}function u(e,t,n){c.eventNameDispatchConfigs.hasOwnProperty(n)&&r("99",n),c.eventNameDispatchConfigs[n]=e;var o=e.phasedRegistrationNames;if(o){for(var i in o){if(o.hasOwnProperty(i))s(o[i],t,n)}return!0}return!!e.registrationName&&(s(e.registrationName,t,n),!0)}function s(e,t,n){c.registrationNameModules[e]&&r("100",e),c.registrationNameModules[e]=t,c.registrationNameDependencies[e]=t.eventTypes[n].dependencies}var c={plugins:[],eventNameDispatchConfigs:{},registrationNameModules:{},registrationNameDependencies:{},possibleRegistrationNames:null,injectEventPluginOrder:function(e){o&&r("101"),o=Array.prototype.slice.call(e),a()},injectEventPluginsByName:function(e){var t=!1;for(var n in e)if(e.hasOwnProperty(n)){var o=e[n];i.hasOwnProperty(n)&&i[n]===o||(i[n]&&r("102",n),i[n]=o,t=!0)}t&&a()},getPluginModuleForEvent:function(e){var t=e.dispatchConfig;if(t.registrationName)return c.registrationNameModules[t.registrationName]||null;if(void 0!==t.phasedRegistrationNames){var n=t.phasedRegistrationNames;for(var r in n)if(n.hasOwnProperty(r)){var o=c.registrationNameModules[n[r]];if(o)return o}}return null},_resetEventPlugins:function(){for(var e in o=null,i)i.hasOwnProperty(e)&&delete i[e];c.plugins.length=0;var t=c.eventNameDispatchConfigs;for(var n in t)t.hasOwnProperty(n)&&delete t[n];var r=c.registrationNameModules;for(var a in r)r.hasOwnProperty(a)&&delete r[a]}};e.exports=c},function(e,t,n){"use strict";var r,o,i=n(4),a=n(56);n(2),n(5);function u(e,t,n,r){var o=e.type||"unknown-event";e.currentTarget=s.getNodeFromInstance(r),t?a.invokeGuardedCallbackWithCatch(o,n,e):a.invokeGuardedCallback(o,n,e),e.currentTarget=null}var s={isEndish:function(e){return"topMouseUp"===e||"topTouchEnd"===e||"topTouchCancel"===e},isMoveish:function(e){return"topMouseMove"===e||"topTouchMove"===e},isStartish:function(e){return"topMouseDown"===e||"topTouchStart"===e},executeDirectDispatch:function(e){var t=e._dispatchListeners,n=e._dispatchInstances;Array.isArray(t)&&i("103"),e.currentTarget=t?s.getNodeFromInstance(n):null;var r=t?t(e):null;return e.currentTarget=null,e._dispatchListeners=null,e._dispatchInstances=null,r},executeDispatchesInOrder:function(e,t){var n=e._dispatchListeners,r=e._dispatchInstances;if(Array.isArray(n))for(var o=0;o<n.length&&!e.isPropagationStopped();o++)u(e,t,n[o],r[o]);else n&&u(e,t,n,r);e._dispatchListeners=null,e._dispatchInstances=null},executeDispatchesInOrderStopAtTrue:function(e){var t=function(e){var t=e._dispatchListeners,n=e._dispatchInstances;if(Array.isArray(t)){for(var r=0;r<t.length&&!e.isPropagationStopped();r++)if(t[r](e,n[r]))return n[r]}else if(t&&t(e,n))return n;return null}(e);return e._dispatchInstances=null,e._dispatchListeners=null,t},hasDispatches:function(e){return!!e._dispatchListeners},getInstanceFromNode:function(e){return r.getInstanceFromNode(e)},getNodeFromInstance:function(e){return r.getNodeFromInstance(e)},isAncestor:function(e,t){return o.isAncestor(e,t)},getLowestCommonAncestor:function(e,t){return o.getLowestCommonAncestor(e,t)},getParentInstance:function(e){return o.getParentInstance(e)},traverseTwoPhase:function(e,t,n){return o.traverseTwoPhase(e,t,n)},traverseEnterLeave:function(e,t,n,r,i){return o.traverseEnterLeave(e,t,n,r,i)},injection:{injectComponentTree:function(e){r=e},injectTreeTraversal:function(e){o=e}}};e.exports=s},function(e,t,n){"use strict";var r=null;function o(e,t,n){try{t(n)}catch(e){null===r&&(r=e)}}var i={invokeGuardedCallback:o,invokeGuardedCallbackWithCatch:o,rethrowCaughtError:function(){if(r){var e=r;throw r=null,e}}};e.exports=i},function(e,t,n){"use strict";e.exports=function(e){var t=e.target||e.srcElement||window;return t.correspondingUseElement&&(t=t.correspondingUseElement),3===t.nodeType?t.parentNode:t}},function(e,t,n){"use strict";var r,o=n(9);o.canUseDOM&&(r=document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("","")),e.exports=function(e,t){if(!o.canUseDOM||t&&!("addEventListener"in document))return!1;var n="on"+e,i=n in document;if(!i){var a=document.createElement("div");a.setAttribute(n,"return;"),i="function"==typeof a[n]}return!i&&r&&"wheel"===e&&(i=document.implementation.hasFeature("Events.wheel","3.0")),i}},function(e,t,n){"use strict";var r={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function o(e){var t=this.nativeEvent;if(t.getModifierState)return t.getModifierState(e);var n=r[e];return!!n&&!!t[n]}e.exports=function(e){return o}},function(e,t,n){"use strict";var r=n(26),o=n(168),i=(n(7),n(10),n(62)),a=n(40),u=n(98);function s(e,t){return Array.isArray(t)&&(t=t[1]),t?t.nextSibling:e.firstChild}var c=i((function(e,t,n){e.insertBefore(t,n)}));function l(e,t,n){r.insertTreeBefore(e,t,n)}function p(e,t,n){Array.isArray(t)?function(e,t,n,r){var o=t;for(;;){var i=o.nextSibling;if(c(e,o,r),o===n)break;o=i}}(e,t[0],t[1],n):c(e,t,n)}function f(e,t){if(Array.isArray(t)){var n=t[1];d(e,t=t[0],n),e.removeChild(n)}e.removeChild(t)}function d(e,t,n){for(;;){var r=t.nextSibling;if(r===n)break;e.removeChild(r)}}var h={dangerouslyReplaceNodeWithMarkup:o.dangerouslyReplaceNodeWithMarkup,replaceDelimitedText:function(e,t,n){var r=e.parentNode,o=e.nextSibling;o===t?n&&c(r,document.createTextNode(n),o):n?(u(o,n),d(r,o,t)):d(r,e,t)},processUpdates:function(e,t){for(var n=0;n<t.length;n++){var r=t[n];switch(r.type){case"INSERT_MARKUP":l(e,r.content,s(e,r.afterNode));break;case"MOVE_EXISTING":p(e,r.fromNode,s(e,r.afterNode));break;case"SET_MARKUP":a(e,r.content);break;case"TEXT_CONTENT":u(e,r.content);break;case"REMOVE_NODE":f(e,r.fromNode)}}}};e.exports=h},function(e,t,n){"use strict";e.exports={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"}},function(e,t,n){"use strict";e.exports=function(e){return"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction((function(){return e(t,n,r,o)}))}:e}},function(e,t,n){"use strict";var r=n(4),o=n(186),i=n(86)(n(22).isValidElement),a=(n(2),n(5),{button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0});function u(e){null!=e.checkedLink&&null!=e.valueLink&&r("87")}function s(e){u(e),(null!=e.value||null!=e.onChange)&&r("88")}function c(e){u(e),(null!=e.checked||null!=e.onChange)&&r("89")}var l={value:function(e,t,n){return!e[t]||a[e.type]||e.onChange||e.readOnly||e.disabled?null:new Error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.")},checked:function(e,t,n){return!e[t]||e.onChange||e.readOnly||e.disabled?null:new Error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")},onChange:i.func},p={};function f(e){if(e){var t=e.getName();if(t)return" Check the render method of `"+t+"`."}return""}var d={checkPropTypes:function(e,t,n){for(var r in l){if(l.hasOwnProperty(r))var i=l[r](t,r,e,"prop",null,o);if(i instanceof Error&&!(i.message in p)){p[i.message]=!0;f(n)}}},getValue:function(e){return e.valueLink?(s(e),e.valueLink.value):e.value},getChecked:function(e){return e.checkedLink?(c(e),e.checkedLink.value):e.checked},executeOnChange:function(e,t){return e.valueLink?(s(e),e.valueLink.requestChange(t.target.value)):e.checkedLink?(c(e),e.checkedLink.requestChange(t.target.checked)):e.onChange?e.onChange.call(void 0,t):void 0}};e.exports=d},function(e,t,n){"use strict";var r=n(4),o=(n(2),!1),i={replaceNodeWithMarkup:null,processChildrenUpdates:null,injection:{injectEnvironment:function(e){o&&r("104"),i.replaceNodeWithMarkup=e.replaceNodeWithMarkup,i.processChildrenUpdates=e.processChildrenUpdates,o=!0}}};e.exports=i},function(e,t,n){"use strict";var r=Object.prototype.hasOwnProperty;function o(e,t){return e===t?0!==e||0!==t||1/e==1/t:e!=e&&t!=t}e.exports=function(e,t){if(o(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(var a=0;a<n.length;a++)if(!r.call(t,n[a])||!o(e[n[a]],t[n[a]]))return!1;return!0}},function(e,t,n){"use strict";e.exports=function(e,t){var n=null===e||!1===e,r=null===t||!1===t;if(n||r)return n===r;var o=typeof e,i=typeof t;return"string"===o||"number"===o?"string"===i||"number"===i:"object"===i&&e.type===t.type&&e.key===t.key}},function(e,t,n){"use strict";var r={escape:function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,(function(e){return t[e]}))},unescape:function(e){var t={"=0":"=","=2":":"};return(""+("."===e[0]&&"$"===e[1]?e.substring(2):e.substring(1))).replace(/(=0|=2)/g,(function(e){return t[e]}))}};e.exports=r},function(e,t,n){"use strict";var r=n(4),o=(n(14),n(34)),i=(n(10),n(13));n(2),n(5);function a(e){i.enqueueUpdate(e)}function u(e,t){var n=o.get(e);return n||null}var s={isMounted:function(e){var t=o.get(e);return!!t&&!!t._renderedComponent},enqueueCallback:function(e,t,n){s.validateCallback(t,n);var r=u(e);if(!r)return null;r._pendingCallbacks?r._pendingCallbacks.push(t):r._pendingCallbacks=[t],a(r)},enqueueCallbackInternal:function(e,t){e._pendingCallbacks?e._pendingCallbacks.push(t):e._pendingCallbacks=[t],a(e)},enqueueForceUpdate:function(e){var t=u(e);t&&(t._pendingForceUpdate=!0,a(t))},enqueueReplaceState:function(e,t,n){var r=u(e);r&&(r._pendingStateQueue=[t],r._pendingReplaceState=!0,null!=n&&(s.validateCallback(n,"replaceState"),r._pendingCallbacks?r._pendingCallbacks.push(n):r._pendingCallbacks=[n]),a(r))},enqueueSetState:function(e,t){var n=u(e);n&&((n._pendingStateQueue||(n._pendingStateQueue=[])).push(t),a(n))},enqueueElementInternal:function(e,t,n){e._pendingElement=t,e._context=n,a(e)},validateCallback:function(e,t){e&&"function"!=typeof e&&r("122",t,function(e){var t=typeof e;if("object"!==t)return t;var n=e.constructor&&e.constructor.name||t,r=Object.keys(e);return r.length>0&&r.length<20?n+" (keys: "+r.join(", ")+")":n}(e))}};e.exports=s},function(e,t,n){"use strict";n(6);var r=n(12),o=(n(5),r);e.exports=o},function(e,t,n){"use strict";e.exports=function(e){var t,n=e.keyCode;return"charCode"in e?0===(t=e.charCode)&&13===n&&(t=13):t=n,t>=32||13===t?t:0}},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){var r=n(246),o=n(252);e.exports=function(e,t){var n=o(e,t);return r(n)?n:void 0}},function(e,t,n){var r=n(46),o=n(21);e.exports=function(e){if(!o(e))return!1;var t=r(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}},function(e,t,n){var r=n(119);e.exports=function(e,t,n){"__proto__"==t&&r?r(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t,n){var r=n(73),o=n(124);e.exports=function(e){return null!=e&&o(e.length)&&!r(e)}},function(e,t,n){"use strict";t.__esModule=!0;var r,o=n(17);(r=o)&&r.__esModule;t.default=function(e,t,n){var r=e(t,n);e.length<2&&n(r)}},function(e,t,n){"use strict";t.__esModule=!0;var r,o=n(314),i=n(18),a=n(77),u=(r=a)&&r.__esModule?r:{default:r},s=n(36),c=n(28);t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.getCurrentLocation,n=e.getUserConfirmation,r=e.pushLocation,a=e.replaceLocation,l=e.go,p=e.keyLength,f=void 0,d=void 0,h=[],m=[],v=[],y=function(){return d&&d.action===s.POP?v.indexOf(d.key):f?v.indexOf(f.key):-1},g=function(e){var t=y();(f=e).action===s.PUSH?v=[].concat(v.slice(0,t+1),[f.key]):f.action===s.REPLACE&&(v[t]=f.key),m.forEach((function(e){return e(f)}))},b=function(e){return h.push(e),function(){return h=h.filter((function(t){return t!==e}))}},_=function(e){return m.push(e),function(){return m=m.filter((function(t){return t!==e}))}},E=function(e,t){(0,o.loopAsync)(h.length,(function(t,n,r){(0,u.default)(h[t],e,(function(e){return null!=e?r(e):n()}))}),(function(e){n&&"string"==typeof e?n(e,(function(e){return t(!1!==e)})):t(!1!==e)}))},C=function(e){f&&(0,c.locationsAreEqual)(f,e)||d&&(0,c.locationsAreEqual)(d,e)||(d=e,E(e,(function(t){if(d===e)if(d=null,t){if(e.action===s.PUSH){var n=(0,i.createPath)(f);(0,i.createPath)(e)===n&&(0,c.statesAreEqual)(f.state,e.state)&&(e.action=s.REPLACE)}e.action===s.POP?g(e):e.action===s.PUSH?!1!==r(e)&&g(e):e.action===s.REPLACE&&!1!==a(e)&&g(e)}else if(f&&e.action===s.POP){var o=v.indexOf(f.key),u=v.indexOf(e.key);-1!==o&&-1!==u&&l(o-u)}})))},w=function(e){return C(S(e,s.PUSH))},O=function(e){return C(S(e,s.REPLACE))},x=function(){return l(-1)},P=function(){return l(1)},k=function(){return Math.random().toString(36).substr(2,p||6)},M=function(e){return(0,i.createPath)(e)},S=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:k();return(0,c.createLocation)(e,t,n)};return{getCurrentLocation:t,listenBefore:b,listen:_,transitionTo:C,push:w,replace:O,go:l,goBack:x,goForward:P,createKey:k,createPath:i.createPath,createHref:M,createLocation:S}}},function(e,t,n){"use strict";t.__esModule=!0;t.canUseDOM=!("undefined"==typeof window||!window.document||!window.document.createElement)},function(e,t,n){"use strict";t.__esModule=!0,t.go=t.replaceLocation=t.pushLocation=t.startListener=t.getUserConfirmation=t.getCurrentLocation=void 0;var r=n(28),o=n(49),i=n(131),a=n(18),u=n(79),s=u.canUseDOM&&!(0,o.supportsPopstateOnHashchange)(),c=function(e){var t=e&&e.key;return(0,r.createLocation)({pathname:window.location.pathname,search:window.location.search,hash:window.location.hash,state:t?(0,i.readState)(t):void 0},void 0,t)},l=t.getCurrentLocation=function(){var e=void 0;try{e=window.history.state||{}}catch(t){e={}}return c(e)},p=(t.getUserConfirmation=function(e,t){return t(window.confirm(e))},t.startListener=function(e){var t=function(t){(0,o.isExtraneousPopstateEvent)(t)||e(c(t.state))};(0,o.addEventListener)(window,"popstate",t);var n=function(){return e(l())};return s&&(0,o.addEventListener)(window,"hashchange",n),function(){(0,o.removeEventListener)(window,"popstate",t),s&&(0,o.removeEventListener)(window,"hashchange",n)}},function(e,t){var n=e.state,r=e.key;void 0!==n&&(0,i.saveState)(r,n),t({key:r},(0,a.createPath)(e))});t.pushLocation=function(e){return p(e,(function(e,t){return window.history.pushState(e,null,t)}))},t.replaceLocation=function(e){return p(e,(function(e,t){return window.history.replaceState(e,null,t)}))},t.go=function(e){e&&window.history.go(e)}},function(e,t,n){"use strict";(function(e,r){var o,i=n(133);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:r;var a=Object(i.a)(o);t.a=a}).call(this,n(71),n(231)(e))},function(e,t,n){"use strict";var r=n(30),o=n(6),i=n(83),a=(n(84),n(37));n(2),n(139);function u(e,t,n){this.props=e,this.context=t,this.refs=a,this.updater=n||i}function s(e,t,n){this.props=e,this.context=t,this.refs=a,this.updater=n||i}function c(){}u.prototype.isReactComponent={},u.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&r("85"),this.updater.enqueueSetState(this,e),t&&this.updater.enqueueCallback(this,t,"setState")},u.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this),e&&this.updater.enqueueCallback(this,e,"forceUpdate")},c.prototype=u.prototype,s.prototype=new c,s.prototype.constructor=s,o(s.prototype,u.prototype),s.prototype.isPureReactComponent=!0,e.exports={Component:u,PureComponent:s}},function(e,t,n){"use strict";n(5);var r={isMounted:function(e){return!1},enqueueCallback:function(e,t){},enqueueForceUpdate:function(e){},enqueueReplaceState:function(e,t){},enqueueSetState:function(e,t){}};e.exports=r},function(e,t,n){"use strict";e.exports=!1},function(e,t,n){"use strict";var r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;e.exports=r},function(e,t,n){"use strict";var r=n(147);e.exports=function(e){return r(e,!1)}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";var r=n(6),o=n(37),i=n(2);e.exports=function(e,t,n){var a=[],u={mixins:"DEFINE_MANY",statics:"DEFINE_MANY",propTypes:"DEFINE_MANY",contextTypes:"DEFINE_MANY",childContextTypes:"DEFINE_MANY",getDefaultProps:"DEFINE_MANY_MERGED",getInitialState:"DEFINE_MANY_MERGED",getChildContext:"DEFINE_MANY_MERGED",render:"DEFINE_ONCE",componentWillMount:"DEFINE_MANY",componentDidMount:"DEFINE_MANY",componentWillReceiveProps:"DEFINE_MANY",shouldComponentUpdate:"DEFINE_ONCE",componentWillUpdate:"DEFINE_MANY",componentDidUpdate:"DEFINE_MANY",componentWillUnmount:"DEFINE_MANY",UNSAFE_componentWillMount:"DEFINE_MANY",UNSAFE_componentWillReceiveProps:"DEFINE_MANY",UNSAFE_componentWillUpdate:"DEFINE_MANY",updateComponent:"OVERRIDE_BASE"},s={getDerivedStateFromProps:"DEFINE_MANY_MERGED"},c={displayName:function(e,t){e.displayName=t},mixins:function(e,t){if(t)for(var n=0;n<t.length;n++)p(e,t[n])},childContextTypes:function(e,t){e.childContextTypes=r({},e.childContextTypes,t)},contextTypes:function(e,t){e.contextTypes=r({},e.contextTypes,t)},getDefaultProps:function(e,t){e.getDefaultProps?e.getDefaultProps=d(e.getDefaultProps,t):e.getDefaultProps=t},propTypes:function(e,t){e.propTypes=r({},e.propTypes,t)},statics:function(e,t){!function(e,t){if(!t)return;for(var n in t){var r=t[n];if(t.hasOwnProperty(n)){if(i(!(n in c),'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',n),n in e){var o=s.hasOwnProperty(n)?s[n]:null;return i("DEFINE_MANY_MERGED"===o,"ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",n),void(e[n]=d(e[n],r))}e[n]=r}}}(e,t)},autobind:function(){}};function l(e,t){var n=u.hasOwnProperty(t)?u[t]:null;g.hasOwnProperty(t)&&i("OVERRIDE_BASE"===n,"ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.",t),e&&i("DEFINE_MANY"===n||"DEFINE_MANY_MERGED"===n,"ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",t)}function p(e,n){if(n){i("function"!=typeof n,"ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."),i(!t(n),"ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");var r=e.prototype,o=r.__reactAutoBindPairs;for(var a in n.hasOwnProperty("mixins")&&c.mixins(e,n.mixins),n)if(n.hasOwnProperty(a)&&"mixins"!==a){var s=n[a],p=r.hasOwnProperty(a);if(l(p,a),c.hasOwnProperty(a))c[a](e,s);else{var f=u.hasOwnProperty(a);if("function"==typeof s&&!f&&!p&&!1!==n.autobind)o.push(a,s),r[a]=s;else if(p){var m=u[a];i(f&&("DEFINE_MANY_MERGED"===m||"DEFINE_MANY"===m),"ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.",m,a),"DEFINE_MANY_MERGED"===m?r[a]=d(r[a],s):"DEFINE_MANY"===m&&(r[a]=h(r[a],s))}else r[a]=s}}}else;}function f(e,t){for(var n in i(e&&t&&"object"==typeof e&&"object"==typeof t,"mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects."),t)t.hasOwnProperty(n)&&(i(void 0===e[n],"mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.",n),e[n]=t[n]);return e}function d(e,t){return function(){var n=e.apply(this,arguments),r=t.apply(this,arguments);if(null==n)return r;if(null==r)return n;var o={};return f(o,n),f(o,r),o}}function h(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}function m(e,t){return t.bind(e)}var v={componentDidMount:function(){this.__isMounted=!0}},y={componentWillUnmount:function(){this.__isMounted=!1}},g={replaceState:function(e,t){this.updater.enqueueReplaceState(this,e,t)},isMounted:function(){return!!this.__isMounted}},b=function(){};return r(b.prototype,e.prototype,g),function(e){var t=function(e,r,a){this.__reactAutoBindPairs.length&&function(e){for(var t=e.__reactAutoBindPairs,n=0;n<t.length;n+=2){var r=t[n],o=t[n+1];e[r]=m(e,o)}}(this),this.props=e,this.context=r,this.refs=o,this.updater=a||n,this.state=null;var u=this.getInitialState?this.getInitialState():null;i("object"==typeof u&&!Array.isArray(u),"%s.getInitialState(): must return an object or null",t.displayName||"ReactCompositeComponent"),this.state=u};for(var r in t.prototype=new b,t.prototype.constructor=t,t.prototype.__reactAutoBindPairs=[],a.forEach(p.bind(null,t)),p(t,v),p(t,e),p(t,y),t.getDefaultProps&&(t.defaultProps=t.getDefaultProps()),i(t.prototype.render,"createClass(...): Class specification must implement a `render` method."),u)t.prototype[r]||(t.prototype[r]=null);return t}}},function(e,t,n){"use strict";e.exports={hasCachedChildNodes:1}},function(e,t,n){"use strict";var r=n(4);n(2);e.exports=function(e,t){return null==t&&r("30"),null==e?t:Array.isArray(e)?Array.isArray(t)?(e.push.apply(e,t),e):(e.push(t),e):Array.isArray(t)?[e].concat(t):[e,t]}},function(e,t,n){"use strict";e.exports=function(e,t,n){Array.isArray(e)?e.forEach(t,n):e&&t.call(n,e)}},function(e,t,n){"use strict";var r=n(9),o=null;e.exports=function(){return!o&&r.canUseDOM&&(o="textContent"in document.documentElement?"textContent":"innerText"),o}},function(e,t,n){"use strict";var r=n(4);var o=n(19),i=(n(2),function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._callbacks=null,this._contexts=null,this._arg=t}return e.prototype.enqueue=function(e,t){this._callbacks=this._callbacks||[],this._callbacks.push(e),this._contexts=this._contexts||[],this._contexts.push(t)},e.prototype.notifyAll=function(){var e=this._callbacks,t=this._contexts,n=this._arg;if(e&&t){e.length!==t.length&&r("24"),this._callbacks=null,this._contexts=null;for(var o=0;o<e.length;o++)e[o].call(t[o],n);e.length=0,t.length=0}},e.prototype.checkpoint=function(){return this._callbacks?this._callbacks.length:0},e.prototype.rollback=function(e){this._callbacks&&this._contexts&&(this._callbacks.length=e,this._contexts.length=e)},e.prototype.reset=function(){this._callbacks=null,this._contexts=null},e.prototype.destructor=function(){this.reset()},e}());e.exports=o.addPoolingTo(i)},function(e,t,n){"use strict";e.exports={logTopLevelRenders:!1}},function(e,t,n){"use strict";var r=n(7);function o(e){var t=e.type,n=e.nodeName;return n&&"input"===n.toLowerCase()&&("checkbox"===t||"radio"===t)}function i(e){return e._wrapperState.valueTracker}var a={_getTrackerFromNode:function(e){return i(r.getInstanceFromNode(e))},track:function(e){if(!i(e)){var t=r.getNodeFromInstance(e),n=o(t)?"checked":"value",a=Object.getOwnPropertyDescriptor(t.constructor.prototype,n),u=""+t[n];t.hasOwnProperty(n)||"function"!=typeof a.get||"function"!=typeof a.set||(Object.defineProperty(t,n,{enumerable:a.enumerable,configurable:!0,get:function(){return a.get.call(this)},set:function(e){u=""+e,a.set.call(this,e)}}),function(e,t){e._wrapperState.valueTracker=t}(e,{getValue:function(){return u},setValue:function(e){u=""+e},stopTracking:function(){!function(e){e._wrapperState.valueTracker=null}(e),delete t[n]}}))}},updateValueIfChanged:function(e){if(!e)return!1;var t=i(e);if(!t)return a.track(e),!0;var n,u,s=t.getValue(),c=((n=r.getNodeFromInstance(e))&&(u=o(n)?""+n.checked:n.value),u);return c!==s&&(t.setValue(c),!0)},stopTracking:function(e){var t=i(e);t&&t.stopTracking()}};e.exports=a},function(e,t,n){"use strict";var r={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};e.exports=function(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!r[e.type]:"textarea"===t}},function(e,t,n){"use strict";var r={currentScrollLeft:0,currentScrollTop:0,refreshScrollValues:function(e){r.currentScrollLeft=e.x,r.currentScrollTop=e.y}};e.exports=r},function(e,t,n){"use strict";var r=n(9),o=n(41),i=n(40),a=function(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t};r.canUseDOM&&("textContent"in document.documentElement||(a=function(e,t){3!==e.nodeType?i(e,o(t)):e.nodeValue=t})),e.exports=a},function(e,t,n){"use strict";e.exports=function(e){try{e.focus()}catch(e){}}},function(e,t,n){"use strict";var r={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0};var o=["Webkit","ms","Moz","O"];Object.keys(r).forEach((function(e){o.forEach((function(t){r[function(e,t){return e+t.charAt(0).toUpperCase()+t.substring(1)}(t,e)]=r[e]}))}));var i={isUnitlessNumber:r,shorthandPropertyExpansions:{background:{backgroundAttachment:!0,backgroundColor:!0,backgroundImage:!0,backgroundPositionX:!0,backgroundPositionY:!0,backgroundRepeat:!0},backgroundPosition:{backgroundPositionX:!0,backgroundPositionY:!0},border:{borderWidth:!0,borderStyle:!0,borderColor:!0},borderBottom:{borderBottomWidth:!0,borderBottomStyle:!0,borderBottomColor:!0},borderLeft:{borderLeftWidth:!0,borderLeftStyle:!0,borderLeftColor:!0},borderRight:{borderRightWidth:!0,borderRightStyle:!0,borderRightColor:!0},borderTop:{borderTopWidth:!0,borderTopStyle:!0,borderTopColor:!0},font:{fontStyle:!0,fontVariant:!0,fontWeight:!0,fontSize:!0,lineHeight:!0,fontFamily:!0},outline:{outlineWidth:!0,outlineStyle:!0,outlineColor:!0}}};e.exports=i},function(e,t,n){"use strict";var r=n(24),o=(n(7),n(10),n(182)),i=(n(5),new RegExp("^["+r.ATTRIBUTE_NAME_START_CHAR+"]["+r.ATTRIBUTE_NAME_CHAR+"]*$")),a={},u={};function s(e){return!!u.hasOwnProperty(e)||!a.hasOwnProperty(e)&&(i.test(e)?(u[e]=!0,!0):(a[e]=!0,!1))}function c(e,t){return null==t||e.hasBooleanValue&&!t||e.hasNumericValue&&isNaN(t)||e.hasPositiveNumericValue&&t<1||e.hasOverloadedBooleanValue&&!1===t}var l={createMarkupForID:function(e){return r.ID_ATTRIBUTE_NAME+"="+o(e)},setAttributeForID:function(e,t){e.setAttribute(r.ID_ATTRIBUTE_NAME,t)},createMarkupForRoot:function(){return r.ROOT_ATTRIBUTE_NAME+'=""'},setAttributeForRoot:function(e){e.setAttribute(r.ROOT_ATTRIBUTE_NAME,"")},createMarkupForProperty:function(e,t){var n=r.properties.hasOwnProperty(e)?r.properties[e]:null;if(n){if(c(n,t))return"";var i=n.attributeName;return n.hasBooleanValue||n.hasOverloadedBooleanValue&&!0===t?i+'=""':i+"="+o(t)}return r.isCustomAttribute(e)?null==t?"":e+"="+o(t):null},createMarkupForCustomAttribute:function(e,t){return s(e)&&null!=t?e+"="+o(t):""},setValueForProperty:function(e,t,n){var o=r.properties.hasOwnProperty(t)?r.properties[t]:null;if(o){var i=o.mutationMethod;if(i)i(e,n);else{if(c(o,n))return void this.deleteValueForProperty(e,t);if(o.mustUseProperty)e[o.propertyName]=n;else{var a=o.attributeName,u=o.attributeNamespace;u?e.setAttributeNS(u,a,""+n):o.hasBooleanValue||o.hasOverloadedBooleanValue&&!0===n?e.setAttribute(a,""):e.setAttribute(a,""+n)}}}else if(r.isCustomAttribute(t))return void l.setValueForAttribute(e,t,n)},setValueForAttribute:function(e,t,n){s(t)&&(null==n?e.removeAttribute(t):e.setAttribute(t,""+n))},deleteValueForAttribute:function(e,t){e.removeAttribute(t)},deleteValueForProperty:function(e,t){var n=r.properties.hasOwnProperty(t)?r.properties[t]:null;if(n){var o=n.mutationMethod;if(o)o(e,void 0);else if(n.mustUseProperty){var i=n.propertyName;n.hasBooleanValue?e[i]=!1:e[i]=""}else e.removeAttribute(n.attributeName)}else r.isCustomAttribute(t)&&e.removeAttribute(t)}};e.exports=l},function(e,t,n){"use strict";var r=n(6),o=n(63),i=n(7),a=n(13),u=(n(5),!1);function s(){if(this._rootNodeID&&this._wrapperState.pendingUpdate){this._wrapperState.pendingUpdate=!1;var e=this._currentElement.props,t=o.getValue(e);null!=t&&c(this,Boolean(e.multiple),t)}}function c(e,t,n){var r,o,a=i.getNodeFromInstance(e).options;if(t){for(r={},o=0;o<n.length;o++)r[""+n[o]]=!0;for(o=0;o<a.length;o++){var u=r.hasOwnProperty(a[o].value);a[o].selected!==u&&(a[o].selected=u)}}else{for(r=""+n,o=0;o<a.length;o++)if(a[o].value===r)return void(a[o].selected=!0);a.length&&(a[0].selected=!0)}}var l={getHostProps:function(e,t){return r({},t,{onChange:e._wrapperState.onChange,value:void 0})},mountWrapper:function(e,t){var n=o.getValue(t);e._wrapperState={pendingUpdate:!1,initialValue:null!=n?n:t.defaultValue,listeners:null,onChange:p.bind(e),wasMultiple:Boolean(t.multiple)},void 0===t.value||void 0===t.defaultValue||u||(u=!0)},getSelectValueContext:function(e){return e._wrapperState.initialValue},postUpdateWrapper:function(e){var t=e._currentElement.props;e._wrapperState.initialValue=void 0;var n=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=Boolean(t.multiple);var r=o.getValue(t);null!=r?(e._wrapperState.pendingUpdate=!1,c(e,Boolean(t.multiple),r)):n!==Boolean(t.multiple)&&(null!=t.defaultValue?c(e,Boolean(t.multiple),t.defaultValue):c(e,Boolean(t.multiple),t.multiple?[]:""))}};function p(e){var t=this._currentElement.props,n=o.executeOnChange(t,e);return this._rootNodeID&&(this._wrapperState.pendingUpdate=!0),a.asap(s,this),n}e.exports=l},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function u(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var s,c=[],l=!1,p=-1;function f(){l&&s&&(l=!1,s.length?c=s.concat(c):p=-1,c.length&&d())}function d(){if(!l){var e=u(f);l=!0;for(var t=c.length;t;){for(s=c,c=[];++p<t;)s&&s[p].run();p=-1,t=c.length}s=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new h(e,t)),1!==c.length||l||u(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";var r=n(4),o=n(6),i=n(191),a=n(106),u=n(107),s=(n(192),n(2),n(5),function(e){this.construct(e)});function c(e,t){var n;if(null===e||!1===e)n=a.create(c);else if("object"==typeof e){var o=e,i=o.type;if("function"!=typeof i&&"string"!=typeof i){var l="";0,l+=function(e){if(e){var t=e.getName();if(t)return" Check the render method of `"+t+"`."}return""}(o._owner),r("130",null==i?i:typeof i,l)}"string"==typeof o.type?n=u.createInternalComponent(o):!function(e){return"function"==typeof e&&void 0!==e.prototype&&"function"==typeof e.prototype.mountComponent&&"function"==typeof e.prototype.receiveComponent}(o.type)?n=new s(o):(n=new o.type(o)).getHostNode||(n.getHostNode=n.getNativeNode)}else"string"==typeof e||"number"==typeof e?n=u.createInstanceForText(e):r("131",typeof e);return n._mountIndex=0,n._mountImage=null,n}o(s.prototype,i,{_instantiateReactComponent:c}),e.exports=c},function(e,t,n){"use strict";var r=n(4),o=n(22),i=(n(2),{HOST:0,COMPOSITE:1,EMPTY:2,getType:function(e){return null===e||!1===e?i.EMPTY:o.isValidElement(e)?"function"==typeof e.type?i.COMPOSITE:i.HOST:void r("26",e)}});e.exports=i},function(e,t,n){"use strict";var r,o={injectEmptyComponentFactory:function(e){r=e}},i={create:function(e){return r(e)}};i.injection=o,e.exports=i},function(e,t,n){"use strict";var r=n(4),o=(n(2),null),i=null;var a={createInternalComponent:function(e){return o||r("111",e.type),new o(e)},createInstanceForText:function(e){return new i(e)},isTextComponent:function(e){return e instanceof i},injection:{injectGenericComponentClass:function(e){o=e},injectTextComponentClass:function(e){i=e}}};e.exports=a},function(e,t,n){"use strict";var r=n(4),o=(n(14),n(193)),i=n(194),a=(n(2),n(67));n(5);function u(e,t){return e&&"object"==typeof e&&null!=e.key?a.escape(e.key):t.toString(36)}e.exports=function(e,t,n){return null==e?0:function e(t,n,s,c){var l,p=typeof t;if("undefined"!==p&&"boolean"!==p||(t=null),null===t||"string"===p||"number"===p||"object"===p&&t.$$typeof===o)return s(c,t,""===n?"."+u(t,0):n),1;var f=0,d=""===n?".":n+":";if(Array.isArray(t))for(var h=0;h<t.length;h++)f+=e(l=t[h],d+u(l,h),s,c);else{var m=i(t);if(m){var v,y=m.call(t);if(m!==t.entries)for(var g=0;!(v=y.next()).done;)f+=e(l=v.value,d+u(l,g++),s,c);else for(;!(v=y.next()).done;){var b=v.value;b&&(f+=e(l=b[1],d+a.escape(b[0])+":"+u(l,0),s,c))}}else if("object"===p){var _=String(t);r("31","[object Object]"===_?"object with keys {"+Object.keys(t).join(", ")+"}":_,"")}}return f}(e,"",t,n)}},function(e,t,n){"use strict";var r,o,i,a,u,s,c,l=n(30),p=n(14);n(2),n(5);function f(e){var t=Function.prototype.toString,n=Object.prototype.hasOwnProperty,r=RegExp("^"+t.call(n).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");try{var o=t.call(e);return r.test(o)}catch(e){return!1}}if("function"==typeof Array.from&&"function"==typeof Map&&f(Map)&&null!=Map.prototype&&"function"==typeof Map.prototype.keys&&f(Map.prototype.keys)&&"function"==typeof Set&&f(Set)&&null!=Set.prototype&&"function"==typeof Set.prototype.keys&&f(Set.prototype.keys)){var d=new Map,h=new Set;r=function(e,t){d.set(e,t)},o=function(e){return d.get(e)},i=function(e){d.delete(e)},a=function(){return Array.from(d.keys())},u=function(e){h.add(e)},s=function(e){h.delete(e)},c=function(){return Array.from(h.keys())}}else{var m={},v={},y=function(e){return"."+e},g=function(e){return parseInt(e.substr(1),10)};r=function(e,t){var n=y(e);m[n]=t},o=function(e){var t=y(e);return m[t]},i=function(e){var t=y(e);delete m[t]},a=function(){return Object.keys(m).map(g)},u=function(e){var t=y(e);v[t]=!0},s=function(e){var t=y(e);delete v[t]},c=function(){return Object.keys(v).map(g)}}var b=[];function _(e){var t=o(e);if(t){var n=t.childIDs;i(e),n.forEach(_)}}function E(e,t,n){return"\n    in "+(e||"Unknown")+(t?" (at "+t.fileName.replace(/^.*[\\\/]/,"")+":"+t.lineNumber+")":n?" (created by "+n+")":"")}function C(e){return null==e?"#empty":"string"==typeof e||"number"==typeof e?"#text":"string"==typeof e.type?e.type:e.type.displayName||e.type.name||"Unknown"}function w(e){var t,n=O.getDisplayName(e),r=O.getElement(e),o=O.getOwnerID(e);return o&&(t=O.getDisplayName(o)),E(n,r&&r._source,t)}var O={onSetChildren:function(e,t){var n=o(e);n||l("144"),n.childIDs=t;for(var r=0;r<t.length;r++){var i=t[r],a=o(i);a||l("140"),null==a.childIDs&&"object"==typeof a.element&&null!=a.element&&l("141"),a.isMounted||l("71"),null==a.parentID&&(a.parentID=e),a.parentID!==e&&l("142",i,a.parentID,e)}},onBeforeMountComponent:function(e,t,n){r(e,{element:t,parentID:n,text:null,childIDs:[],isMounted:!1,updateCount:0})},onBeforeUpdateComponent:function(e,t){var n=o(e);n&&n.isMounted&&(n.element=t)},onMountComponent:function(e){var t=o(e);t||l("144"),t.isMounted=!0,0===t.parentID&&u(e)},onUpdateComponent:function(e){var t=o(e);t&&t.isMounted&&t.updateCount++},onUnmountComponent:function(e){var t=o(e);t&&(t.isMounted=!1,0===t.parentID&&s(e));b.push(e)},purgeUnmountedComponents:function(){if(!O._preventPurging){for(var e=0;e<b.length;e++){_(b[e])}b.length=0}},isMounted:function(e){var t=o(e);return!!t&&t.isMounted},getCurrentStackAddendum:function(e){var t="";if(e){var n=C(e),r=e._owner;t+=E(n,e._source,r&&r.getName())}var o=p.current,i=o&&o._debugID;return t+=O.getStackAddendumByID(i)},getStackAddendumByID:function(e){for(var t="";e;)t+=w(e),e=O.getParentID(e);return t},getChildIDs:function(e){var t=o(e);return t?t.childIDs:[]},getDisplayName:function(e){var t=O.getElement(e);return t?C(t):null},getElement:function(e){var t=o(e);return t?t.element:null},getOwnerID:function(e){var t=O.getElement(e);return t&&t._owner?t._owner._debugID:null},getParentID:function(e){var t=o(e);return t?t.parentID:null},getSource:function(e){var t=o(e),n=t?t.element:null;return null!=n?n._source:null},getText:function(e){var t=O.getElement(e);return"string"==typeof t?t:"number"==typeof t?""+t:null},getUpdateCount:function(e){var t=o(e);return t?t.updateCount:0},getRootIDs:c,getRegisteredIDs:a,pushNonStandardWarningStack:function(e,t){if("function"==typeof console.reactStack){var n=[],r=p.current,o=r&&r._debugID;try{for(e&&n.push({name:o?O.getDisplayName(o):null,fileName:t?t.fileName:null,lineNumber:t?t.lineNumber:null});o;){var i=O.getElement(o),a=O.getParentID(o),u=O.getOwnerID(o),s=u?O.getDisplayName(u):null,c=i&&i._source;n.push({name:s,fileName:c?c.fileName:null,lineNumber:c?c.lineNumber:null}),o=a}}catch(e){}console.reactStack(n)}},popNonStandardWarningStack:function(){"function"==typeof console.reactStackEnd&&console.reactStackEnd()}};e.exports=O},function(e,t,n){"use strict";var r=n(12),o={listen:function(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!1),{remove:function(){e.removeEventListener(t,n,!1)}}):e.attachEvent?(e.attachEvent("on"+t,n),{remove:function(){e.detachEvent("on"+t,n)}}):void 0},capture:function(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!0),{remove:function(){e.removeEventListener(t,n,!0)}}):{remove:r}},registerDefault:function(){}};e.exports=o},function(e,t,n){"use strict";var r=n(206),o=n(208),i=n(99),a=n(112);var u={hasSelectionCapabilities:function(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&"text"===e.type||"textarea"===t||"true"===e.contentEditable)},getSelectionInformation:function(){var e=a();return{focusedElem:e,selectionRange:u.hasSelectionCapabilities(e)?u.getSelection(e):null}},restoreSelection:function(e){var t,n=a(),r=e.focusedElem,s=e.selectionRange;n!==r&&(t=r,o(document.documentElement,t))&&(u.hasSelectionCapabilities(r)&&u.setSelection(r,s),i(r))},getSelection:function(e){var t;if("selectionStart"in e)t={start:e.selectionStart,end:e.selectionEnd};else if(document.selection&&e.nodeName&&"input"===e.nodeName.toLowerCase()){var n=document.selection.createRange();n.parentElement()===e&&(t={start:-n.moveStart("character",-e.value.length),end:-n.moveEnd("character",-e.value.length)})}else t=r.getOffsets(e);return t||{start:0,end:0}},setSelection:function(e,t){var n=t.start,o=t.end;if(void 0===o&&(o=n),"selectionStart"in e)e.selectionStart=n,e.selectionEnd=Math.min(o,e.value.length);else if(document.selection&&e.nodeName&&"input"===e.nodeName.toLowerCase()){var i=e.createTextRange();i.collapse(!0),i.moveStart("character",n),i.moveEnd("character",o-n),i.select()}else r.setOffsets(e,t)}};e.exports=u},function(e,t,n){"use strict";e.exports=function(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}},function(e,t,n){"use strict";var r=n(4),o=n(26),i=n(24),a=n(22),u=n(42),s=(n(14),n(7)),c=n(223),l=n(224),p=n(94),f=n(34),d=(n(10),n(225)),h=n(25),m=n(68),v=n(13),y=n(37),g=n(104),b=(n(2),n(40)),_=n(66),E=(n(5),i.ID_ATTRIBUTE_NAME),C=i.ROOT_ATTRIBUTE_NAME,w={};function O(e){return e?9===e.nodeType?e.documentElement:e.firstChild:null}function x(e,t,n,r,o){var i;if(p.logTopLevelRenders){var a=e._currentElement.props.child.type;i="React mount: "+("string"==typeof a?a:a.displayName||a.name),console.time(i)}var u=h.mountComponent(e,n,null,c(e,t),o,0);i&&console.timeEnd(i),e._renderedComponent._topLevelWrapper=e,L._mountImageIntoNode(u,t,e,r,n)}function P(e,t,n,r){var o=v.ReactReconcileTransaction.getPooled(!n&&l.useCreateElement);o.perform(x,null,e,t,o,n,r),v.ReactReconcileTransaction.release(o)}function k(e,t,n){for(0,h.unmountComponent(e,n),9===t.nodeType&&(t=t.documentElement);t.lastChild;)t.removeChild(t.lastChild)}function M(e){var t=O(e);if(t){var n=s.getInstanceFromNode(t);return!(!n||!n._hostParent)}}function S(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function T(e){var t=function(e){var t=O(e),n=t&&s.getInstanceFromNode(t);return n&&!n._hostParent?n:null}(e);return t?t._hostContainerInfo._topLevelWrapper:null}var R=1,N=function(){this.rootID=R++};N.prototype.isReactComponent={},N.prototype.render=function(){return this.props.child},N.isReactTopLevelWrapper=!0;var L={TopLevelWrapper:N,_instancesByReactRootID:w,scrollMonitor:function(e,t){t()},_updateRootComponent:function(e,t,n,r,o){return L.scrollMonitor(r,(function(){m.enqueueElementInternal(e,t,n),o&&m.enqueueCallbackInternal(e,o)})),e},_renderNewRootComponent:function(e,t,n,o){S(t)||r("37"),u.ensureScrollValueMonitoring();var i=g(e,!1);v.batchedUpdates(P,i,t,n,o);var a=i._instance.rootID;return w[a]=i,i},renderSubtreeIntoContainer:function(e,t,n,o){return null!=e&&f.has(e)||r("38"),L._renderSubtreeIntoContainer(e,t,n,o)},_renderSubtreeIntoContainer:function(e,t,n,o){m.validateCallback(o,"ReactDOM.render"),a.isValidElement(t)||r("39","string"==typeof t?" Instead of passing a string like 'div', pass React.createElement('div') or <div />.":"function"==typeof t?" Instead of passing a class like Foo, pass React.createElement(Foo) or <Foo />.":null!=t&&void 0!==t.props?" This may be caused by unintentionally loading two independent copies of React.":"");var i,u=a.createElement(N,{child:t});if(e){var s=f.get(e);i=s._processChildContext(s._context)}else i=y;var c=T(n);if(c){var l=c._currentElement.props.child;if(_(l,t)){var p=c._renderedComponent.getPublicInstance(),d=o&&function(){o.call(p)};return L._updateRootComponent(c,u,i,n,d),p}L.unmountComponentAtNode(n)}var h,v=O(n),g=v&&!(!(h=v).getAttribute||!h.getAttribute(E)),b=M(n),C=g&&!c&&!b,w=L._renderNewRootComponent(u,n,C,i)._renderedComponent.getPublicInstance();return o&&o.call(w),w},render:function(e,t,n){return L._renderSubtreeIntoContainer(null,e,t,n)},unmountComponentAtNode:function(e){S(e)||r("40");var t=T(e);if(!t){M(e),1===e.nodeType&&e.hasAttribute(C);return!1}return delete w[t._instance.rootID],v.batchedUpdates(k,t,e,!1),!0},_mountImageIntoNode:function(e,t,n,i,a){if(S(t)||r("41"),i){var u=O(t);if(d.canReuseMarkup(e,u))return void s.precacheNode(n,u);var c=u.getAttribute(d.CHECKSUM_ATTR_NAME);u.removeAttribute(d.CHECKSUM_ATTR_NAME);var l=u.outerHTML;u.setAttribute(d.CHECKSUM_ATTR_NAME,c);var p=e,f=function(e,t){for(var n=Math.min(e.length,t.length),r=0;r<n;r++)if(e.charAt(r)!==t.charAt(r))return r;return e.length===t.length?-1:n}(p,l),h=" (client) "+p.substring(f-20,f+20)+"\n (server) "+l.substring(f-20,f+20);9===t.nodeType&&r("42",h)}if(9===t.nodeType&&r("43"),a.useCreateElement){for(;t.lastChild;)t.removeChild(t.lastChild);o.insertTreeBefore(t,e,null)}else b(t,e),s.precacheNode(n,t.firstChild)}};e.exports=L},function(e,t,n){"use strict";var r=n(105);e.exports=function(e){for(var t;(t=e._renderedNodeType)===r.COMPOSITE;)e=e._renderedComponent;return t===r.HOST?e._renderedComponent:t===r.EMPTY?null:void 0}},function(e,t,n){var r=n(72)(n(27),"Map");e.exports=r},function(e,t,n){var r=n(27).Symbol;e.exports=r},function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(this,n(71))},function(e,t,n){var r=n(74),o=n(45);e.exports=function(e,t,n){(void 0!==n&&!o(e[t],n)||void 0===n&&!(t in e))&&r(e,t,n)}},function(e,t,n){var r=n(72),o=function(){try{var e=r(Object,"defineProperty");return e({},"",{}),e}catch(e){}}();e.exports=o},function(e,t,n){var r=n(276)(Object.getPrototypeOf,Object);e.exports=r},function(e,t){var n=Object.prototype;e.exports=function(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||n)}},function(e,t,n){var r=n(277),o=n(35),i=Object.prototype,a=i.hasOwnProperty,u=i.propertyIsEnumerable,s=r(function(){return arguments}())?r:function(e){return o(e)&&a.call(e,"callee")&&!u.call(e,"callee")};e.exports=s},function(e,t){var n=Array.isArray;e.exports=n},function(e,t){e.exports=function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}},function(e,t,n){(function(e){var r=n(27),o=n(279),i=t&&!t.nodeType&&t,a=i&&"object"==typeof e&&e&&!e.nodeType&&e,u=a&&a.exports===i?r.Buffer:void 0,s=(u?u.isBuffer:void 0)||o;e.exports=s}).call(this,n(75)(e))},function(e,t,n){var r=n(281),o=n(282),i=n(283),a=i&&i.isTypedArray,u=a?o(a):r;e.exports=u},function(e,t){e.exports=function(e,t){if(("constructor"!==t||"function"!=typeof e[t])&&"__proto__"!=t)return e[t]}},function(e,t,n){var r=n(287),o=n(289),i=n(76);e.exports=function(e){return i(e)?r(e,!0):o(e)}},function(e,t){var n=/^(?:0|[1-9]\d*)$/;e.exports=function(e,t){var r=typeof e;return!!(t=null==t?9007199254740991:t)&&("number"==r||"symbol"!=r&&n.test(e))&&e>-1&&e%1==0&&e<t}},function(e,t){e.exports=function(e){return e}},function(e,t,n){"use strict";t.__esModule=!0,t.readState=t.saveState=void 0;var r,o=n(17);(r=o)&&r.__esModule;var i={QuotaExceededError:!0,QUOTA_EXCEEDED_ERR:!0},a={SecurityError:!0},u=function(e){return"@@History/"+e};t.saveState=function(e,t){if(window.sessionStorage)try{null==t?window.sessionStorage.removeItem(u(e)):window.sessionStorage.setItem(u(e),JSON.stringify(t))}catch(e){if(a[e.name])return;if(i[e.name]&&0===window.sessionStorage.length)return;throw e}},t.readState=function(e){var t=void 0;try{t=window.sessionStorage.getItem(u(e))}catch(e){if(a[e.name])return}if(t)try{return JSON.parse(t)}catch(e){}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.clearTruckErrors=t.receiveTruckErrors=t.receiveAllTrucks=t.receiveSingleTruck=t.clearFocus=t.setFocus=t.fetchTrucks=t.createTruck=t.sendAPITrucks=t.getSeedData=void 0;var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(319));t.getSeedData=function(){return function(e){return r.getTruckData().then((function(t){return e(o(t))}))}};var o=t.sendAPITrucks=function(e){return function(t){return r.seedTrucks(e).then((function(e){return t(u(e))}))}},i=(t.createTruck=function(e){return function(t){return r.postTruck(e).then((function(e){return t(i(e))}),(function(e){return t(u(e.responseJSON.errors))}))}},t.fetchTrucks=function(e){return function(t){return r.getTrucksInBounds(e).then((function(e){return t(a(e))}))}},t.setFocus=function(e){return{type:"SET_FOCUS",truck:e}},t.clearFocus=function(){return{type:"CLEAR_FOCUS"}},t.receiveSingleTruck=function(e){return{type:"RECEIVE_SINGLE_TRUCK",truck:e}}),a=t.receiveAllTrucks=function(e){return{type:"RECEIVE_ALL_TRUCKS",trucks:e}},u=t.receiveTruckErrors=function(e){return{type:"RECEIVE_TRUCK_ERRORS",errors:e}};t.clearTruckErrors=function(){return{type:"CLEAR_TRUCK_ERRORS"}}},function(e,t,n){"use strict";function r(e){var t,n=e.Symbol;return"function"==typeof n?n.observable?t=n.observable:(t=n("observable"),n.observable=t):t="@@observable",t}n.d(t,"a",(function(){return r}))},function(e,t,n){"use strict";(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.a=n}).call(this,n(71))},function(e,t,n){"use strict";t.__esModule=!0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=(c(n(17)),c(n(3))),i=n(28),a=n(18),u=c(n(78)),s=n(36);function c(e){return e&&e.__esModule?e:{default:e}}var l=function(e){return e.filter((function(e){return e.state})).reduce((function(e,t){return e[t.key]=t.state,e}),{})};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Array.isArray(e)?e={entries:e}:"string"==typeof e&&(e={entries:[e]});var t=function(){var e=m[v],t=(0,a.createPath)(e),n=void 0,o=void 0;e.key&&(n=e.key,o=b(n));var u=(0,a.parsePath)(t);return(0,i.createLocation)(r({},u,{state:o}),void 0,n)},n=function(e){var t=v+e;return t>=0&&t<m.length},c=function(e){if(e&&n(e)){v+=e;var o=t();d.transitionTo(r({},o,{action:s.POP}))}},p=function(e){(v+=1)<m.length&&m.splice(v),m.push(e),g(e.key,e.state)},f=function(e){m[v]=e,g(e.key,e.state)},d=(0,u.default)(r({},e,{getCurrentLocation:t,pushLocation:p,replaceLocation:f,go:c})),h=e,m=h.entries,v=h.current;"string"==typeof m?m=[m]:Array.isArray(m)||(m=["/"]),m=m.map((function(e){return(0,i.createLocation)(e)})),null==v?v=m.length-1:v>=0&&v<m.length||(0,o.default)(!1);var y=l(m),g=function(e,t){return y[e]=t},b=function(e){return y[e]};return r({},d,{canGo:n})}},function(e,t,n){"use strict";t.__esModule=!0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=p(n(3)),i=n(79),a=l(n(80)),u=l(n(315)),s=n(49),c=p(n(78));function l(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function p(e){return e&&e.__esModule?e:{default:e}}t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i.canUseDOM||(0,o.default)(!1);var t=e.forceRefresh||!(0,s.supportsHistory)(),n=t?u:a,l=n.getUserConfirmation,p=n.getCurrentLocation,f=n.pushLocation,d=n.replaceLocation,h=n.go,m=(0,c.default)(r({getUserConfirmation:l},e,{getCurrentLocation:p,pushLocation:f,replaceLocation:d,go:h})),v=0,y=void 0,g=function(e,t){1==++v&&(y=a.startListener(m.transitionTo));var n=t?m.listenBefore(e):m.listen(e);return function(){n(),0==--v&&y()}},b=function(e){return g(e,!0)},_=function(e){return g(e,!1)};return r({},m,{listenBefore:b,listen:_})}},function(e,t,n){"use strict";t.__esModule=!0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=(c(n(17)),c(n(3))),i=n(79),a=n(49),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(316)),s=c(n(78));function c(e){return e&&e.__esModule?e:{default:e}}var l=function(e){return"/"===e.charAt(0)?e:"/"+e},p={hashbang:{encodePath:function(e){return"!"===e.charAt(0)?e:"!"+e},decodePath:function(e){return"!"===e.charAt(0)?e.substring(1):e}},noslash:{encodePath:function(e){return"/"===e.charAt(0)?e.substring(1):e},decodePath:l},slash:{encodePath:l,decodePath:l}};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i.canUseDOM||(0,o.default)(!1);var t=e.queryKey,n=e.hashType;"string"!=typeof t&&(t="_k"),null==n&&(n="slash"),n in p||(n="slash");var c=p[n],l=u.getUserConfirmation,f=function(){return u.getCurrentLocation(c,t)},d=function(e){return u.pushLocation(e,c,t)},h=function(e){return u.replaceLocation(e,c,t)},m=(0,s.default)(r({getUserConfirmation:l},e,{getCurrentLocation:f,pushLocation:d,replaceLocation:h,go:u.go})),v=0,y=void 0,g=function(e,n){1==++v&&(y=u.startListener(m.transitionTo,c,t));var r=n?m.listenBefore(e):m.listen(e);return function(){r(),0==--v&&y()}},b=function(e){return g(e,!0)},_=function(e){return g(e,!1)},E=((0,a.supportsGoWithoutReloadUsingHash)(),function(e){m.go(e)}),C=function(e){return"#"+c.encodePath(m.createHref(e))};return r({},m,{listenBefore:b,listen:_,go:E,createHref:C})}},function(e,t,n){"use strict";var r=u(n(1)),o=u(n(153)),i=u(n(230)),a=u(n(304));!function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);t.default=e}(n(132));function u(e){return e&&e.__esModule?e:{default:e}}document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("root"),t=void 0;if(window.currentUser){var n={session:{currentUser:window.currentUser}};t=(0,i.default)(n)}else t=(0,i.default)();sessionStorage.getItem("robertslemonpartykey")||sessionStorage.setItem("robertslemonpartykey",Math.random().toString(36).substring(2)),o.default.render(r.default.createElement(a.default,{store:t}),e)}))},function(e,t,n){"use strict";e.exports=function(){}},function(e,t,n){"use strict";var r=n(141),o=n(23),i=n(12),a=n(142),u=r.twoArgumentPooler,s=r.fourArgumentPooler,c=/\/+/g;function l(e){return(""+e).replace(c,"$&/")}function p(e,t){this.func=e,this.context=t,this.count=0}function f(e,t,n){var r=e.func,o=e.context;r.call(o,t,e.count++)}function d(e,t,n,r){this.result=e,this.keyPrefix=t,this.func=n,this.context=r,this.count=0}function h(e,t,n){var r=e.result,a=e.keyPrefix,u=e.func,s=e.context,c=u.call(s,t,e.count++);Array.isArray(c)?m(c,r,n,i.thatReturnsArgument):null!=c&&(o.isValidElement(c)&&(c=o.cloneAndReplaceKey(c,a+(!c.key||t&&t.key===c.key?"":l(c.key)+"/")+n)),r.push(c))}function m(e,t,n,r,o){var i="";null!=n&&(i=l(n)+"/");var u=d.getPooled(t,i,r,o);a(e,h,u),d.release(u)}function v(e,t,n){return null}p.prototype.destructor=function(){this.func=null,this.context=null,this.count=0},r.addPoolingTo(p,u),d.prototype.destructor=function(){this.result=null,this.keyPrefix=null,this.func=null,this.context=null,this.count=0},r.addPoolingTo(d,s);var y={forEach:function(e,t,n){if(null==e)return e;var r=p.getPooled(t,n);a(e,f,r),p.release(r)},map:function(e,t,n){if(null==e)return e;var r=[];return m(e,r,null,t,n),r},mapIntoWithKeyPrefixInternal:m,count:function(e,t){return a(e,v,null)},toArray:function(e){var t=[];return m(e,t,null,i.thatReturnsArgument),t}};e.exports=y},function(e,t,n){"use strict";var r=n(30),o=(n(2),function(e){if(this.instancePool.length){var t=this.instancePool.pop();return this.call(t,e),t}return new this(e)}),i=function(e){e instanceof this||r("25"),e.destructor(),this.instancePool.length<this.poolSize&&this.instancePool.push(e)},a=o,u={addPoolingTo:function(e,t){var n=e;return n.instancePool=[],n.getPooled=t||a,n.poolSize||(n.poolSize=10),n.release=i,n},oneArgumentPooler:o,twoArgumentPooler:function(e,t){if(this.instancePool.length){var n=this.instancePool.pop();return this.call(n,e,t),n}return new this(e,t)},threeArgumentPooler:function(e,t,n){if(this.instancePool.length){var r=this.instancePool.pop();return this.call(r,e,t,n),r}return new this(e,t,n)},fourArgumentPooler:function(e,t,n,r){if(this.instancePool.length){var o=this.instancePool.pop();return this.call(o,e,t,n,r),o}return new this(e,t,n,r)}};e.exports=u},function(e,t,n){"use strict";var r=n(30),o=(n(14),n(85)),i=n(143),a=(n(2),n(144));n(5);function u(e,t){return e&&"object"==typeof e&&null!=e.key?a.escape(e.key):t.toString(36)}e.exports=function(e,t,n){return null==e?0:function e(t,n,s,c){var l,p=typeof t;if("undefined"!==p&&"boolean"!==p||(t=null),null===t||"string"===p||"number"===p||"object"===p&&t.$$typeof===o)return s(c,t,""===n?"."+u(t,0):n),1;var f=0,d=""===n?".":n+":";if(Array.isArray(t))for(var h=0;h<t.length;h++)f+=e(l=t[h],d+u(l,h),s,c);else{var m=i(t);if(m){var v,y=m.call(t);if(m!==t.entries)for(var g=0;!(v=y.next()).done;)f+=e(l=v.value,d+u(l,g++),s,c);else for(;!(v=y.next()).done;){var b=v.value;b&&(f+=e(l=b[1],d+a.escape(b[0])+":"+u(l,0),s,c))}}else if("object"===p){var _=String(t);r("31","[object Object]"===_?"object with keys {"+Object.keys(t).join(", ")+"}":_,"")}}return f}(e,"",t,n)}},function(e,t,n){"use strict";var r="function"==typeof Symbol&&Symbol.iterator;e.exports=function(e){var t=e&&(r&&e[r]||e["@@iterator"]);if("function"==typeof t)return t}},function(e,t,n){"use strict";var r={escape:function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,(function(e){return t[e]}))},unescape:function(e){var t={"=0":"=","=2":":"};return(""+("."===e[0]&&"$"===e[1]?e.substring(2):e.substring(1))).replace(/(=0|=2)/g,(function(e){return t[e]}))}};e.exports=r},function(e,t,n){"use strict";var r=n(23).createFactory,o={a:r("a"),abbr:r("abbr"),address:r("address"),area:r("area"),article:r("article"),aside:r("aside"),audio:r("audio"),b:r("b"),base:r("base"),bdi:r("bdi"),bdo:r("bdo"),big:r("big"),blockquote:r("blockquote"),body:r("body"),br:r("br"),button:r("button"),canvas:r("canvas"),caption:r("caption"),cite:r("cite"),code:r("code"),col:r("col"),colgroup:r("colgroup"),data:r("data"),datalist:r("datalist"),dd:r("dd"),del:r("del"),details:r("details"),dfn:r("dfn"),dialog:r("dialog"),div:r("div"),dl:r("dl"),dt:r("dt"),em:r("em"),embed:r("embed"),fieldset:r("fieldset"),figcaption:r("figcaption"),figure:r("figure"),footer:r("footer"),form:r("form"),h1:r("h1"),h2:r("h2"),h3:r("h3"),h4:r("h4"),h5:r("h5"),h6:r("h6"),head:r("head"),header:r("header"),hgroup:r("hgroup"),hr:r("hr"),html:r("html"),i:r("i"),iframe:r("iframe"),img:r("img"),input:r("input"),ins:r("ins"),kbd:r("kbd"),keygen:r("keygen"),label:r("label"),legend:r("legend"),li:r("li"),link:r("link"),main:r("main"),map:r("map"),mark:r("mark"),menu:r("menu"),menuitem:r("menuitem"),meta:r("meta"),meter:r("meter"),nav:r("nav"),noscript:r("noscript"),object:r("object"),ol:r("ol"),optgroup:r("optgroup"),option:r("option"),output:r("output"),p:r("p"),param:r("param"),picture:r("picture"),pre:r("pre"),progress:r("progress"),q:r("q"),rp:r("rp"),rt:r("rt"),ruby:r("ruby"),s:r("s"),samp:r("samp"),script:r("script"),section:r("section"),select:r("select"),small:r("small"),source:r("source"),span:r("span"),strong:r("strong"),style:r("style"),sub:r("sub"),summary:r("summary"),sup:r("sup"),table:r("table"),tbody:r("tbody"),td:r("td"),textarea:r("textarea"),tfoot:r("tfoot"),th:r("th"),thead:r("thead"),time:r("time"),title:r("title"),tr:r("tr"),track:r("track"),u:r("u"),ul:r("ul"),var:r("var"),video:r("video"),wbr:r("wbr"),circle:r("circle"),clipPath:r("clipPath"),defs:r("defs"),ellipse:r("ellipse"),g:r("g"),image:r("image"),line:r("line"),linearGradient:r("linearGradient"),mask:r("mask"),path:r("path"),pattern:r("pattern"),polygon:r("polygon"),polyline:r("polyline"),radialGradient:r("radialGradient"),rect:r("rect"),stop:r("stop"),svg:r("svg"),text:r("text"),tspan:r("tspan")};e.exports=o},function(e,t,n){"use strict";var r=n(23).isValidElement,o=n(86);e.exports=o(r)},function(e,t,n){"use strict";var r=n(29),o=n(6),i=n(87),a=n(149),u=Function.call.bind(Object.prototype.hasOwnProperty);function s(){return null}e.exports=function(e,t){var n="function"==typeof Symbol&&Symbol.iterator;var c={array:d("array"),bool:d("boolean"),func:d("function"),number:d("number"),object:d("object"),string:d("string"),symbol:d("symbol"),any:f(s),arrayOf:function(e){return f((function(t,n,r,o,a){if("function"!=typeof e)return new p("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var u=t[n];if(!Array.isArray(u))return new p("Invalid "+o+" `"+a+"` of type `"+m(u)+"` supplied to `"+r+"`, expected an array.");for(var s=0;s<u.length;s++){var c=e(u,s,r,o,a+"["+s+"]",i);if(c instanceof Error)return c}return null}))},element:f((function(t,n,r,o,i){var a=t[n];return e(a)?null:new p("Invalid "+o+" `"+i+"` of type `"+m(a)+"` supplied to `"+r+"`, expected a single ReactElement.")})),elementType:f((function(e,t,n,o,i){var a=e[t];return r.isValidElementType(a)?null:new p("Invalid "+o+" `"+i+"` of type `"+m(a)+"` supplied to `"+n+"`, expected a single ReactElement type.")})),instanceOf:function(e){return f((function(t,n,r,o,i){if(!(t[n]instanceof e)){var a=e.name||"<<anonymous>>";return new p("Invalid "+o+" `"+i+"` of type `"+function(e){if(!e.constructor||!e.constructor.name)return"<<anonymous>>";return e.constructor.name}(t[n])+"` supplied to `"+r+"`, expected instance of `"+a+"`.")}return null}))},node:f((function(e,t,n,r,o){return h(e[t])?null:new p("Invalid "+r+" `"+o+"` supplied to `"+n+"`, expected a ReactNode.")})),objectOf:function(e){return f((function(t,n,r,o,a){if("function"!=typeof e)return new p("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var s=t[n],c=m(s);if("object"!==c)return new p("Invalid "+o+" `"+a+"` of type `"+c+"` supplied to `"+r+"`, expected an object.");for(var l in s)if(u(s,l)){var f=e(s,l,r,o,a+"."+l,i);if(f instanceof Error)return f}return null}))},oneOf:function(e){if(!Array.isArray(e))return s;return f((function(t,n,r,o,i){for(var a=t[n],u=0;u<e.length;u++)if(l(a,e[u]))return null;var s=JSON.stringify(e,(function(e,t){return"symbol"===v(t)?String(t):t}));return new p("Invalid "+o+" `"+i+"` of value `"+String(a)+"` supplied to `"+r+"`, expected one of "+s+".")}))},oneOfType:function(e){if(!Array.isArray(e))return s;for(var t=0;t<e.length;t++){var n=e[t];if("function"!=typeof n)return y(n),s}return f((function(t,n,r,o,a){for(var u=0;u<e.length;u++){if(null==(0,e[u])(t,n,r,o,a,i))return null}return new p("Invalid "+o+" `"+a+"` supplied to `"+r+"`.")}))},shape:function(e){return f((function(t,n,r,o,a){var u=t[n],s=m(u);if("object"!==s)return new p("Invalid "+o+" `"+a+"` of type `"+s+"` supplied to `"+r+"`, expected `object`.");for(var c in e){var l=e[c];if(l){var f=l(u,c,r,o,a+"."+c,i);if(f)return f}}return null}))},exact:function(e){return f((function(t,n,r,a,u){var s=t[n],c=m(s);if("object"!==c)return new p("Invalid "+a+" `"+u+"` of type `"+c+"` supplied to `"+r+"`, expected `object`.");var l=o({},t[n],e);for(var f in l){var d=e[f];if(!d)return new p("Invalid "+a+" `"+u+"` key `"+f+"` supplied to `"+r+"`.\nBad object: "+JSON.stringify(t[n],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(e),null,"  "));var h=d(s,f,r,a,u+"."+f,i);if(h)return h}return null}))}};function l(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}function p(e){this.message=e,this.stack=""}function f(e){function n(n,r,o,a,u,s,c){if((a=a||"<<anonymous>>",s=s||o,c!==i)&&t){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}return null==r[o]?n?null===r[o]?new p("The "+u+" `"+s+"` is marked as required in `"+a+"`, but its value is `null`."):new p("The "+u+" `"+s+"` is marked as required in `"+a+"`, but its value is `undefined`."):null:e(r,o,a,u,s)}var r=n.bind(null,!1);return r.isRequired=n.bind(null,!0),r}function d(e){return f((function(t,n,r,o,i,a){var u=t[n];return m(u)!==e?new p("Invalid "+o+" `"+i+"` of type `"+v(u)+"` supplied to `"+r+"`, expected `"+e+"`."):null}))}function h(t){switch(typeof t){case"number":case"string":case"undefined":return!0;case"boolean":return!t;case"object":if(Array.isArray(t))return t.every(h);if(null===t||e(t))return!0;var r=function(e){var t=e&&(n&&e[n]||e["@@iterator"]);if("function"==typeof t)return t}(t);if(!r)return!1;var o,i=r.call(t);if(r!==t.entries){for(;!(o=i.next()).done;)if(!h(o.value))return!1}else for(;!(o=i.next()).done;){var a=o.value;if(a&&!h(a[1]))return!1}return!0;default:return!1}}function m(e){var t=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":function(e,t){return"symbol"===e||!!t&&("Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol)}(t,e)?"symbol":t}function v(e){if(null==e)return""+e;var t=m(e);if("object"===t){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return t}function y(e){var t=v(e);switch(t){case"array":case"object":return"an "+t;case"boolean":case"date":case"regexp":return"a "+t;default:return t}}return p.prototype=Error.prototype,c.checkPropTypes=a,c.resetWarningCache=a.resetWarningCache,c.PropTypes=c,c}},function(e,t,n){"use strict";var r="function"==typeof Symbol&&Symbol.for,o=r?Symbol.for("react.element"):60103,i=r?Symbol.for("react.portal"):60106,a=r?Symbol.for("react.fragment"):60107,u=r?Symbol.for("react.strict_mode"):60108,s=r?Symbol.for("react.profiler"):60114,c=r?Symbol.for("react.provider"):60109,l=r?Symbol.for("react.context"):60110,p=r?Symbol.for("react.async_mode"):60111,f=r?Symbol.for("react.concurrent_mode"):60111,d=r?Symbol.for("react.forward_ref"):60112,h=r?Symbol.for("react.suspense"):60113,m=r?Symbol.for("react.suspense_list"):60120,v=r?Symbol.for("react.memo"):60115,y=r?Symbol.for("react.lazy"):60116,g=r?Symbol.for("react.block"):60121,b=r?Symbol.for("react.fundamental"):60117,_=r?Symbol.for("react.responder"):60118,E=r?Symbol.for("react.scope"):60119;function C(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case o:switch(e=e.type){case p:case f:case a:case s:case u:case h:return e;default:switch(e=e&&e.$$typeof){case l:case d:case y:case v:case c:return e;default:return t}}case i:return t}}}function w(e){return C(e)===f}t.AsyncMode=p,t.ConcurrentMode=f,t.ContextConsumer=l,t.ContextProvider=c,t.Element=o,t.ForwardRef=d,t.Fragment=a,t.Lazy=y,t.Memo=v,t.Portal=i,t.Profiler=s,t.StrictMode=u,t.Suspense=h,t.isAsyncMode=function(e){return w(e)||C(e)===p},t.isConcurrentMode=w,t.isContextConsumer=function(e){return C(e)===l},t.isContextProvider=function(e){return C(e)===c},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===o},t.isForwardRef=function(e){return C(e)===d},t.isFragment=function(e){return C(e)===a},t.isLazy=function(e){return C(e)===y},t.isMemo=function(e){return C(e)===v},t.isPortal=function(e){return C(e)===i},t.isProfiler=function(e){return C(e)===s},t.isStrictMode=function(e){return C(e)===u},t.isSuspense=function(e){return C(e)===h},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===a||e===f||e===s||e===u||e===h||e===m||"object"==typeof e&&null!==e&&(e.$$typeof===y||e.$$typeof===v||e.$$typeof===c||e.$$typeof===l||e.$$typeof===d||e.$$typeof===b||e.$$typeof===_||e.$$typeof===E||e.$$typeof===g)},t.typeOf=C},function(e,t,n){"use strict";function r(e,t,n,r,o){}r.resetWarningCache=function(){0},e.exports=r},function(e,t,n){"use strict";e.exports="15.6.2"},function(e,t,n){"use strict";var r=n(82).Component,o=n(23).isValidElement,i=n(83),a=n(88);e.exports=a(r,o,i)},function(e,t,n){"use strict";var r=n(30),o=n(23);n(2);e.exports=function(e){return o.isValidElement(e)||r("143"),e}},function(e,t,n){"use strict";e.exports=n(154)},function(e,t,n){"use strict";var r=n(7),o=n(155),i=n(113),a=n(25),u=n(13),s=n(227),c=n(228),l=n(114),p=n(229);n(5);o.inject();var f={findDOMNode:c,render:i.render,unmountComponentAtNode:i.unmountComponentAtNode,version:s,unstable_batchedUpdates:u.batchedUpdates,unstable_renderSubtreeIntoContainer:p};"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject&&__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({ComponentTree:{getClosestInstanceFromNode:r.getClosestInstanceFromNode,getNodeFromInstance:function(e){return e._renderedComponent&&(e=l(e)),e?r.getNodeFromInstance(e):null}},Mount:i,Reconciler:a}),e.exports=f},function(e,t,n){"use strict";var r=n(156),o=n(157),i=n(161),a=n(164),u=n(165),s=n(166),c=n(167),l=n(173),p=n(7),f=n(198),d=n(199),h=n(200),m=n(201),v=n(202),y=n(204),g=n(205),b=n(211),_=n(212),E=n(213),C=!1;e.exports={inject:function(){C||(C=!0,y.EventEmitter.injectReactEventListener(v),y.EventPluginHub.injectEventPluginOrder(a),y.EventPluginUtils.injectComponentTree(p),y.EventPluginUtils.injectTreeTraversal(d),y.EventPluginHub.injectEventPluginsByName({SimpleEventPlugin:E,EnterLeaveEventPlugin:u,ChangeEventPlugin:i,SelectEventPlugin:_,BeforeInputEventPlugin:o}),y.HostComponent.injectGenericComponentClass(l),y.HostComponent.injectTextComponentClass(h),y.DOMProperty.injectDOMPropertyConfig(r),y.DOMProperty.injectDOMPropertyConfig(s),y.DOMProperty.injectDOMPropertyConfig(b),y.EmptyComponent.injectEmptyComponentFactory((function(e){return new f(e)})),y.Updates.injectReconcileTransaction(g),y.Updates.injectBatchingStrategy(m),y.Component.injectEnvironment(c))}}},function(e,t,n){"use strict";e.exports={Properties:{"aria-current":0,"aria-details":0,"aria-disabled":0,"aria-hidden":0,"aria-invalid":0,"aria-keyshortcuts":0,"aria-label":0,"aria-roledescription":0,"aria-autocomplete":0,"aria-checked":0,"aria-expanded":0,"aria-haspopup":0,"aria-level":0,"aria-modal":0,"aria-multiline":0,"aria-multiselectable":0,"aria-orientation":0,"aria-placeholder":0,"aria-pressed":0,"aria-readonly":0,"aria-required":0,"aria-selected":0,"aria-sort":0,"aria-valuemax":0,"aria-valuemin":0,"aria-valuenow":0,"aria-valuetext":0,"aria-atomic":0,"aria-busy":0,"aria-live":0,"aria-relevant":0,"aria-dropeffect":0,"aria-grabbed":0,"aria-activedescendant":0,"aria-colcount":0,"aria-colindex":0,"aria-colspan":0,"aria-controls":0,"aria-describedby":0,"aria-errormessage":0,"aria-flowto":0,"aria-labelledby":0,"aria-owns":0,"aria-posinset":0,"aria-rowcount":0,"aria-rowindex":0,"aria-rowspan":0,"aria-setsize":0},DOMAttributeNames:{},DOMPropertyNames:{}}},function(e,t,n){"use strict";var r=n(31),o=n(9),i=n(158),a=n(159),u=n(160),s=[9,13,27,32],c=o.canUseDOM&&"CompositionEvent"in window,l=null;o.canUseDOM&&"documentMode"in document&&(l=document.documentMode);var p,f=o.canUseDOM&&"TextEvent"in window&&!l&&!("object"==typeof(p=window.opera)&&"function"==typeof p.version&&parseInt(p.version(),10)<=12),d=o.canUseDOM&&(!c||l&&l>8&&l<=11);var h=String.fromCharCode(32),m={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["topCompositionEnd","topKeyPress","topTextInput","topPaste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:["topBlur","topCompositionEnd","topKeyDown","topKeyPress","topKeyUp","topMouseDown"]},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",captured:"onCompositionStartCapture"},dependencies:["topBlur","topCompositionStart","topKeyDown","topKeyPress","topKeyUp","topMouseDown"]},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:["topBlur","topCompositionUpdate","topKeyDown","topKeyPress","topKeyUp","topMouseDown"]}},v=!1;function y(e,t){switch(e){case"topKeyUp":return-1!==s.indexOf(t.keyCode);case"topKeyDown":return 229!==t.keyCode;case"topKeyPress":case"topMouseDown":case"topBlur":return!0;default:return!1}}function g(e){var t=e.detail;return"object"==typeof t&&"data"in t?t.data:null}var b=null;function _(e,t,n,o){var u,s;if(c?u=function(e){switch(e){case"topCompositionStart":return m.compositionStart;case"topCompositionEnd":return m.compositionEnd;case"topCompositionUpdate":return m.compositionUpdate}}(e):b?y(e,n)&&(u=m.compositionEnd):function(e,t){return"topKeyDown"===e&&229===t.keyCode}(e,n)&&(u=m.compositionStart),!u)return null;d&&(b||u!==m.compositionStart?u===m.compositionEnd&&b&&(s=b.getData()):b=i.getPooled(o));var l=a.getPooled(u,t,n,o);if(s)l.data=s;else{var p=g(n);null!==p&&(l.data=p)}return r.accumulateTwoPhaseDispatches(l),l}function E(e,t,n,o){var a;if(!(a=f?function(e,t){switch(e){case"topCompositionEnd":return g(t);case"topKeyPress":return 32!==t.which?null:(v=!0,h);case"topTextInput":var n=t.data;return n===h&&v?null:n;default:return null}}(e,n):function(e,t){if(b){if("topCompositionEnd"===e||!c&&y(e,t)){var n=b.getData();return i.release(b),b=null,n}return null}switch(e){case"topPaste":return null;case"topKeyPress":return t.which&&!function(e){return(e.ctrlKey||e.altKey||e.metaKey)&&!(e.ctrlKey&&e.altKey)}(t)?String.fromCharCode(t.which):null;case"topCompositionEnd":return d?null:t.data;default:return null}}(e,n)))return null;var s=u.getPooled(m.beforeInput,t,n,o);return s.data=a,r.accumulateTwoPhaseDispatches(s),s}var C={eventTypes:m,extractEvents:function(e,t,n,r){return[_(e,t,n,r),E(e,t,n,r)]}};e.exports=C},function(e,t,n){"use strict";var r=n(6),o=n(19),i=n(92);function a(e){this._root=e,this._startText=this.getText(),this._fallbackText=null}r(a.prototype,{destructor:function(){this._root=null,this._startText=null,this._fallbackText=null},getText:function(){return"value"in this._root?this._root.value:this._root[i()]},getData:function(){if(this._fallbackText)return this._fallbackText;var e,t,n=this._startText,r=n.length,o=this.getText(),i=o.length;for(e=0;e<r&&n[e]===o[e];e++);var a=r-e;for(t=1;t<=a&&n[r-t]===o[i-t];t++);var u=t>1?1-t:void 0;return this._fallbackText=o.slice(e,u),this._fallbackText}}),o.addPoolingTo(a),e.exports=a},function(e,t,n){"use strict";var r=n(15);function o(e,t,n,o){return r.call(this,e,t,n,o)}r.augmentClass(o,{data:null}),e.exports=o},function(e,t,n){"use strict";var r=n(15);function o(e,t,n,o){return r.call(this,e,t,n,o)}r.augmentClass(o,{data:null}),e.exports=o},function(e,t,n){"use strict";var r=n(32),o=n(31),i=n(9),a=n(7),u=n(13),s=n(15),c=n(95),l=n(57),p=n(58),f=n(96),d={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:["topBlur","topChange","topClick","topFocus","topInput","topKeyDown","topKeyUp","topSelectionChange"]}};function h(e,t,n){var r=s.getPooled(d.change,e,t,n);return r.type="change",o.accumulateTwoPhaseDispatches(r),r}var m=null,v=null;var y=!1;function g(e){var t=h(v,e,l(e));u.batchedUpdates(b,t)}function b(e){r.enqueueEvents(e),r.processEventQueue(!1)}function _(){m&&(m.detachEvent("onchange",g),m=null,v=null)}function E(e,t){var n=c.updateValueIfChanged(e),r=!0===t.simulated&&R._allowSimulatedPassThrough;if(n||r)return e}function C(e,t){if("topChange"===e)return t}function w(e,t,n){"topFocus"===e?(_(),function(e,t){v=t,(m=e).attachEvent("onchange",g)}(t,n)):"topBlur"===e&&_()}i.canUseDOM&&(y=p("change")&&(!document.documentMode||document.documentMode>8));var O=!1;function x(){m&&(m.detachEvent("onpropertychange",P),m=null,v=null)}function P(e){"value"===e.propertyName&&E(v,e)&&g(e)}function k(e,t,n){"topFocus"===e?(x(),function(e,t){v=t,(m=e).attachEvent("onpropertychange",P)}(t,n)):"topBlur"===e&&x()}function M(e,t,n){if("topSelectionChange"===e||"topKeyUp"===e||"topKeyDown"===e)return E(v,n)}function S(e,t,n){if("topClick"===e)return E(t,n)}function T(e,t,n){if("topInput"===e||"topChange"===e)return E(t,n)}i.canUseDOM&&(O=p("input")&&(!document.documentMode||document.documentMode>9));var R={eventTypes:d,_allowSimulatedPassThrough:!0,_isInputEventSupported:O,extractEvents:function(e,t,n,r){var o,i,u,s,c=t?a.getNodeFromInstance(t):window;if("select"===(s=(u=c).nodeName&&u.nodeName.toLowerCase())||"input"===s&&"file"===u.type?y?o=C:i=w:f(c)?O?o=T:(o=M,i=k):function(e){var t=e.nodeName;return t&&"input"===t.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)}(c)&&(o=S),o){var l=o(e,t,n);if(l)return h(l,n,r)}i&&i(e,c,t),"topBlur"===e&&function(e,t){if(null!=e){var n=e._wrapperState||t._wrapperState;if(n&&n.controlled&&"number"===t.type){var r=""+t.value;t.getAttribute("value")!==r&&t.setAttribute("value",r)}}}(t,c)}};e.exports=R},function(e,t,n){"use strict";var r=n(163),o={};o.attachRefs=function(e,t){if(null!==t&&"object"==typeof t){var n=t.ref;null!=n&&function(e,t,n){"function"==typeof e?e(t.getPublicInstance()):r.addComponentAsRefTo(t,e,n)}(n,e,t._owner)}},o.shouldUpdateRefs=function(e,t){var n=null,r=null;null!==e&&"object"==typeof e&&(n=e.ref,r=e._owner);var o=null,i=null;return null!==t&&"object"==typeof t&&(o=t.ref,i=t._owner),n!==o||"string"==typeof o&&i!==r},o.detachRefs=function(e,t){if(null!==t&&"object"==typeof t){var n=t.ref;null!=n&&function(e,t,n){"function"==typeof e?e(null):r.removeComponentAsRefFrom(t,e,n)}(n,e,t._owner)}},e.exports=o},function(e,t,n){"use strict";var r=n(4);n(2);function o(e){return!(!e||"function"!=typeof e.attachRef||"function"!=typeof e.detachRef)}var i={addComponentAsRefTo:function(e,t,n){o(n)||r("119"),n.attachRef(t,e)},removeComponentAsRefFrom:function(e,t,n){o(n)||r("120");var i=n.getPublicInstance();i&&i.refs[t]===e.getPublicInstance()&&n.detachRef(t)}};e.exports=i},function(e,t,n){"use strict";e.exports=["ResponderEventPlugin","SimpleEventPlugin","TapEventPlugin","EnterLeaveEventPlugin","ChangeEventPlugin","SelectEventPlugin","BeforeInputEventPlugin"]},function(e,t,n){"use strict";var r=n(31),o=n(7),i=n(39),a={mouseEnter:{registrationName:"onMouseEnter",dependencies:["topMouseOut","topMouseOver"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["topMouseOut","topMouseOver"]}},u={eventTypes:a,extractEvents:function(e,t,n,u){if("topMouseOver"===e&&(n.relatedTarget||n.fromElement))return null;if("topMouseOut"!==e&&"topMouseOver"!==e)return null;var s,c,l;if(u.window===u)s=u;else{var p=u.ownerDocument;s=p?p.defaultView||p.parentWindow:window}if("topMouseOut"===e){c=t;var f=n.relatedTarget||n.toElement;l=f?o.getClosestInstanceFromNode(f):null}else c=null,l=t;if(c===l)return null;var d=null==c?s:o.getNodeFromInstance(c),h=null==l?s:o.getNodeFromInstance(l),m=i.getPooled(a.mouseLeave,c,n,u);m.type="mouseleave",m.target=d,m.relatedTarget=h;var v=i.getPooled(a.mouseEnter,l,n,u);return v.type="mouseenter",v.target=h,v.relatedTarget=d,r.accumulateEnterLeaveDispatches(m,v,c,l),[m,v]}};e.exports=u},function(e,t,n){"use strict";var r=n(24),o=r.injection.MUST_USE_PROPERTY,i=r.injection.HAS_BOOLEAN_VALUE,a=r.injection.HAS_NUMERIC_VALUE,u=r.injection.HAS_POSITIVE_NUMERIC_VALUE,s=r.injection.HAS_OVERLOADED_BOOLEAN_VALUE,c={isCustomAttribute:RegExp.prototype.test.bind(new RegExp("^(data|aria)-["+r.ATTRIBUTE_NAME_CHAR+"]*$")),Properties:{accept:0,acceptCharset:0,accessKey:0,action:0,allowFullScreen:i,allowTransparency:0,alt:0,as:0,async:i,autoComplete:0,autoPlay:i,capture:i,cellPadding:0,cellSpacing:0,charSet:0,challenge:0,checked:o|i,cite:0,classID:0,className:0,cols:u,colSpan:0,content:0,contentEditable:0,contextMenu:0,controls:i,controlsList:0,coords:0,crossOrigin:0,data:0,dateTime:0,default:i,defer:i,dir:0,disabled:i,download:s,draggable:0,encType:0,form:0,formAction:0,formEncType:0,formMethod:0,formNoValidate:i,formTarget:0,frameBorder:0,headers:0,height:0,hidden:i,high:0,href:0,hrefLang:0,htmlFor:0,httpEquiv:0,icon:0,id:0,inputMode:0,integrity:0,is:0,keyParams:0,keyType:0,kind:0,label:0,lang:0,list:0,loop:i,low:0,manifest:0,marginHeight:0,marginWidth:0,max:0,maxLength:0,media:0,mediaGroup:0,method:0,min:0,minLength:0,multiple:o|i,muted:o|i,name:0,nonce:0,noValidate:i,open:i,optimum:0,pattern:0,placeholder:0,playsInline:i,poster:0,preload:0,profile:0,radioGroup:0,readOnly:i,referrerPolicy:0,rel:0,required:i,reversed:i,role:0,rows:u,rowSpan:a,sandbox:0,scope:0,scoped:i,scrolling:0,seamless:i,selected:o|i,shape:0,size:u,sizes:0,span:u,spellCheck:0,src:0,srcDoc:0,srcLang:0,srcSet:0,start:a,step:0,style:0,summary:0,tabIndex:0,target:0,title:0,type:0,useMap:0,value:0,width:0,wmode:0,wrap:0,about:0,datatype:0,inlist:0,prefix:0,property:0,resource:0,typeof:0,vocab:0,autoCapitalize:0,autoCorrect:0,autoSave:0,color:0,itemProp:0,itemScope:i,itemType:0,itemID:0,itemRef:0,results:0,security:0,unselectable:0},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMPropertyNames:{},DOMMutationMethods:{value:function(e,t){if(null==t)return e.removeAttribute("value");("number"!==e.type||!1===e.hasAttribute("value")||e.validity&&!e.validity.badInput&&e.ownerDocument.activeElement!==e)&&e.setAttribute("value",""+t)}}};e.exports=c},function(e,t,n){"use strict";var r=n(60),o={processChildrenUpdates:n(172).dangerouslyProcessChildrenUpdates,replaceNodeWithMarkup:r.dangerouslyReplaceNodeWithMarkup};e.exports=o},function(e,t,n){"use strict";var r=n(4),o=n(26),i=n(9),a=n(169),u=n(12),s=(n(2),{dangerouslyReplaceNodeWithMarkup:function(e,t){if(i.canUseDOM||r("56"),t||r("57"),"HTML"===e.nodeName&&r("58"),"string"==typeof t){var n=a(t,u)[0];e.parentNode.replaceChild(n,e)}else o.replaceChildWithTree(e,t)}});e.exports=s},function(e,t,n){"use strict";var r=n(9),o=n(170),i=n(171),a=n(2),u=r.canUseDOM?document.createElement("div"):null,s=/^\s*<(\w+)/;e.exports=function(e,t){var n=u;u||a(!1);var r=function(e){var t=e.match(s);return t&&t[1].toLowerCase()}(e),c=r&&i(r);if(c){n.innerHTML=c[1]+e+c[2];for(var l=c[0];l--;)n=n.lastChild}else n.innerHTML=e;var p=n.getElementsByTagName("script");p.length&&(t||a(!1),o(p).forEach(t));for(var f=Array.from(n.childNodes);n.lastChild;)n.removeChild(n.lastChild);return f}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e){return function(e){return!!e&&("object"==typeof e||"function"==typeof e)&&"length"in e&&!("setInterval"in e)&&"number"!=typeof e.nodeType&&(Array.isArray(e)||"callee"in e||"item"in e)}(e)?Array.isArray(e)?e.slice():function(e){var t=e.length;if((Array.isArray(e)||"object"!=typeof e&&"function"!=typeof e)&&r(!1),"number"!=typeof t&&r(!1),0===t||t-1 in e||r(!1),"function"==typeof e.callee&&r(!1),e.hasOwnProperty)try{return Array.prototype.slice.call(e)}catch(e){}for(var n=Array(t),o=0;o<t;o++)n[o]=e[o];return n}(e):[e]}},function(e,t,n){"use strict";var r=n(9),o=n(2),i=r.canUseDOM?document.createElement("div"):null,a={},u=[1,'<select multiple="true">',"</select>"],s=[1,"<table>","</table>"],c=[3,"<table><tbody><tr>","</tr></tbody></table>"],l=[1,'<svg xmlns="http://www.w3.org/2000/svg">',"</svg>"],p={"*":[1,"?<div>","</div>"],area:[1,"<map>","</map>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],legend:[1,"<fieldset>","</fieldset>"],param:[1,"<object>","</object>"],tr:[2,"<table><tbody>","</tbody></table>"],optgroup:u,option:u,caption:s,colgroup:s,tbody:s,tfoot:s,thead:s,td:c,th:c};["circle","clipPath","defs","ellipse","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","text","tspan"].forEach((function(e){p[e]=l,a[e]=!0})),e.exports=function(e){return i||o(!1),p.hasOwnProperty(e)||(e="*"),a.hasOwnProperty(e)||(i.innerHTML="*"===e?"<link />":"<"+e+"></"+e+">",a[e]=!i.firstChild),a[e]?p[e]:null}},function(e,t,n){"use strict";var r=n(60),o=n(7),i={dangerouslyProcessChildrenUpdates:function(e,t){var n=o.getNodeFromInstance(e);r.processUpdates(n,t)}};e.exports=i},function(e,t,n){"use strict";var r=n(4),o=n(6),i=n(174),a=n(175),u=n(26),s=n(61),c=n(24),l=n(101),p=n(32),f=n(54),d=n(42),h=n(89),m=n(7),v=n(185),y=n(187),g=n(102),b=n(188),_=(n(10),n(189)),E=n(196),C=(n(12),n(41)),w=(n(2),n(58),n(65),n(95)),O=(n(69),n(5),h),x=p.deleteListener,P=m.getNodeFromInstance,k=d.listenTo,M=f.registrationNameModules,S={string:!0,number:!0},T={children:null,dangerouslySetInnerHTML:null,suppressContentEditableWarning:null};function R(e,t){t&&(q[e._tag]&&(null!=t.children||null!=t.dangerouslySetInnerHTML)&&r("137",e._tag,e._currentElement._owner?" Check the render method of "+e._currentElement._owner.getName()+".":""),null!=t.dangerouslySetInnerHTML&&(null!=t.children&&r("60"),"object"==typeof t.dangerouslySetInnerHTML&&"__html"in t.dangerouslySetInnerHTML||r("61")),null!=t.style&&"object"!=typeof t.style&&r("62",function(e){if(e){var t=e._currentElement._owner||null;if(t){var n=t.getName();if(n)return" This DOM node was rendered by `"+n+"`."}}return""}(e)))}function N(e,t,n,r){if(!(r instanceof E)){0;var o=e._hostContainerInfo,i=o._node&&11===o._node.nodeType?o._node:o._ownerDocument;k(t,i),r.getReactMountReady().enqueue(L,{inst:e,registrationName:t,listener:n})}}function L(){p.putListener(this.inst,this.registrationName,this.listener)}function I(){v.postMountWrapper(this)}function A(){b.postMountWrapper(this)}function j(){y.postMountWrapper(this)}var D={topAbort:"abort",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topSeeked:"seeked",topSeeking:"seeking",topStalled:"stalled",topSuspend:"suspend",topTimeUpdate:"timeupdate",topVolumeChange:"volumechange",topWaiting:"waiting"};function U(){w.track(this)}function F(){this._rootNodeID||r("63");var e=P(this);switch(e||r("64"),this._tag){case"iframe":case"object":this._wrapperState.listeners=[d.trapBubbledEvent("topLoad","load",e)];break;case"video":case"audio":for(var t in this._wrapperState.listeners=[],D)D.hasOwnProperty(t)&&this._wrapperState.listeners.push(d.trapBubbledEvent(t,D[t],e));break;case"source":this._wrapperState.listeners=[d.trapBubbledEvent("topError","error",e)];break;case"img":this._wrapperState.listeners=[d.trapBubbledEvent("topError","error",e),d.trapBubbledEvent("topLoad","load",e)];break;case"form":this._wrapperState.listeners=[d.trapBubbledEvent("topReset","reset",e),d.trapBubbledEvent("topSubmit","submit",e)];break;case"input":case"select":case"textarea":this._wrapperState.listeners=[d.trapBubbledEvent("topInvalid","invalid",e)]}}function V(){g.postUpdateWrapper(this)}var B={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},W={listing:!0,pre:!0,textarea:!0},q=o({menuitem:!0},B),H=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,K={},z={}.hasOwnProperty;function $(e,t){return e.indexOf("-")>=0||null!=t.is}var Y=1;function G(e){var t=e.type;!function(e){z.call(K,e)||(H.test(e)||r("65",e),K[e]=!0)}(t),this._currentElement=e,this._tag=t.toLowerCase(),this._namespaceURI=null,this._renderedChildren=null,this._previousStyle=null,this._previousStyleCopy=null,this._hostNode=null,this._hostParent=null,this._rootNodeID=0,this._domID=0,this._hostContainerInfo=null,this._wrapperState=null,this._topLevelWrapper=null,this._flags=0}G.displayName="ReactDOMComponent",G.Mixin={mountComponent:function(e,t,n,r){this._rootNodeID=Y++,this._domID=n._idCounter++,this._hostParent=t,this._hostContainerInfo=n;var o,a,c,p=this._currentElement.props;switch(this._tag){case"audio":case"form":case"iframe":case"img":case"link":case"object":case"source":case"video":this._wrapperState={listeners:null},e.getReactMountReady().enqueue(F,this);break;case"input":v.mountWrapper(this,p,t),p=v.getHostProps(this,p),e.getReactMountReady().enqueue(U,this),e.getReactMountReady().enqueue(F,this);break;case"option":y.mountWrapper(this,p,t),p=y.getHostProps(this,p);break;case"select":g.mountWrapper(this,p,t),p=g.getHostProps(this,p),e.getReactMountReady().enqueue(F,this);break;case"textarea":b.mountWrapper(this,p,t),p=b.getHostProps(this,p),e.getReactMountReady().enqueue(U,this),e.getReactMountReady().enqueue(F,this)}if(R(this,p),null!=t?(o=t._namespaceURI,a=t._tag):n._tag&&(o=n._namespaceURI,a=n._tag),(null==o||o===s.svg&&"foreignobject"===a)&&(o=s.html),o===s.html&&("svg"===this._tag?o=s.svg:"math"===this._tag&&(o=s.mathml)),this._namespaceURI=o,e.useCreateElement){var f,d=n._ownerDocument;if(o===s.html)if("script"===this._tag){var h=d.createElement("div"),_=this._currentElement.type;h.innerHTML="<"+_+"></"+_+">",f=h.removeChild(h.firstChild)}else f=p.is?d.createElement(this._currentElement.type,p.is):d.createElement(this._currentElement.type);else f=d.createElementNS(o,this._currentElement.type);m.precacheNode(this,f),this._flags|=O.hasCachedChildNodes,this._hostParent||l.setAttributeForRoot(f),this._updateDOMProperties(null,p,e);var E=u(f);this._createInitialChildren(e,p,r,E),c=E}else{var C=this._createOpenTagMarkupAndPutListeners(e,p),w=this._createContentMarkup(e,p,r);c=!w&&B[this._tag]?C+"/>":C+">"+w+"</"+this._currentElement.type+">"}switch(this._tag){case"input":e.getReactMountReady().enqueue(I,this),p.autoFocus&&e.getReactMountReady().enqueue(i.focusDOMComponent,this);break;case"textarea":e.getReactMountReady().enqueue(A,this),p.autoFocus&&e.getReactMountReady().enqueue(i.focusDOMComponent,this);break;case"select":case"button":p.autoFocus&&e.getReactMountReady().enqueue(i.focusDOMComponent,this);break;case"option":e.getReactMountReady().enqueue(j,this)}return c},_createOpenTagMarkupAndPutListeners:function(e,t){var n="<"+this._currentElement.type;for(var r in t)if(t.hasOwnProperty(r)){var i=t[r];if(null!=i)if(M.hasOwnProperty(r))i&&N(this,r,i,e);else{"style"===r&&(i&&(i=this._previousStyleCopy=o({},t.style)),i=a.createMarkupForStyles(i,this));var u=null;null!=this._tag&&$(this._tag,t)?T.hasOwnProperty(r)||(u=l.createMarkupForCustomAttribute(r,i)):u=l.createMarkupForProperty(r,i),u&&(n+=" "+u)}}return e.renderToStaticMarkup?n:(this._hostParent||(n+=" "+l.createMarkupForRoot()),n+=" "+l.createMarkupForID(this._domID))},_createContentMarkup:function(e,t,n){var r="",o=t.dangerouslySetInnerHTML;if(null!=o)null!=o.__html&&(r=o.__html);else{var i=S[typeof t.children]?t.children:null,a=null!=i?null:t.children;if(null!=i)r=C(i);else if(null!=a){r=this.mountChildren(a,e,n).join("")}}return W[this._tag]&&"\n"===r.charAt(0)?"\n"+r:r},_createInitialChildren:function(e,t,n,r){var o=t.dangerouslySetInnerHTML;if(null!=o)null!=o.__html&&u.queueHTML(r,o.__html);else{var i=S[typeof t.children]?t.children:null,a=null!=i?null:t.children;if(null!=i)""!==i&&u.queueText(r,i);else if(null!=a)for(var s=this.mountChildren(a,e,n),c=0;c<s.length;c++)u.queueChild(r,s[c])}},receiveComponent:function(e,t,n){var r=this._currentElement;this._currentElement=e,this.updateComponent(t,r,e,n)},updateComponent:function(e,t,n,r){var o=t.props,i=this._currentElement.props;switch(this._tag){case"input":o=v.getHostProps(this,o),i=v.getHostProps(this,i);break;case"option":o=y.getHostProps(this,o),i=y.getHostProps(this,i);break;case"select":o=g.getHostProps(this,o),i=g.getHostProps(this,i);break;case"textarea":o=b.getHostProps(this,o),i=b.getHostProps(this,i)}switch(R(this,i),this._updateDOMProperties(o,i,e),this._updateDOMChildren(o,i,e,r),this._tag){case"input":v.updateWrapper(this),w.updateValueIfChanged(this);break;case"textarea":b.updateWrapper(this);break;case"select":e.getReactMountReady().enqueue(V,this)}},_updateDOMProperties:function(e,t,n){var r,i,u;for(r in e)if(!t.hasOwnProperty(r)&&e.hasOwnProperty(r)&&null!=e[r])if("style"===r){var s=this._previousStyleCopy;for(i in s)s.hasOwnProperty(i)&&((u=u||{})[i]="");this._previousStyleCopy=null}else M.hasOwnProperty(r)?e[r]&&x(this,r):$(this._tag,e)?T.hasOwnProperty(r)||l.deleteValueForAttribute(P(this),r):(c.properties[r]||c.isCustomAttribute(r))&&l.deleteValueForProperty(P(this),r);for(r in t){var p=t[r],f="style"===r?this._previousStyleCopy:null!=e?e[r]:void 0;if(t.hasOwnProperty(r)&&p!==f&&(null!=p||null!=f))if("style"===r)if(p?p=this._previousStyleCopy=o({},p):this._previousStyleCopy=null,f){for(i in f)!f.hasOwnProperty(i)||p&&p.hasOwnProperty(i)||((u=u||{})[i]="");for(i in p)p.hasOwnProperty(i)&&f[i]!==p[i]&&((u=u||{})[i]=p[i])}else u=p;else if(M.hasOwnProperty(r))p?N(this,r,p,n):f&&x(this,r);else if($(this._tag,t))T.hasOwnProperty(r)||l.setValueForAttribute(P(this),r,p);else if(c.properties[r]||c.isCustomAttribute(r)){var d=P(this);null!=p?l.setValueForProperty(d,r,p):l.deleteValueForProperty(d,r)}}u&&a.setValueForStyles(P(this),u,this)},_updateDOMChildren:function(e,t,n,r){var o=S[typeof e.children]?e.children:null,i=S[typeof t.children]?t.children:null,a=e.dangerouslySetInnerHTML&&e.dangerouslySetInnerHTML.__html,u=t.dangerouslySetInnerHTML&&t.dangerouslySetInnerHTML.__html,s=null!=o?null:e.children,c=null!=i?null:t.children,l=null!=o||null!=a,p=null!=i||null!=u;null!=s&&null==c?this.updateChildren(null,n,r):l&&!p&&this.updateTextContent(""),null!=i?o!==i&&this.updateTextContent(""+i):null!=u?a!==u&&this.updateMarkup(""+u):null!=c&&this.updateChildren(c,n,r)},getHostNode:function(){return P(this)},unmountComponent:function(e){switch(this._tag){case"audio":case"form":case"iframe":case"img":case"link":case"object":case"source":case"video":var t=this._wrapperState.listeners;if(t)for(var n=0;n<t.length;n++)t[n].remove();break;case"input":case"textarea":w.stopTracking(this);break;case"html":case"head":case"body":r("66",this._tag)}this.unmountChildren(e),m.uncacheNode(this),p.deleteAllListeners(this),this._rootNodeID=0,this._domID=0,this._wrapperState=null},getPublicInstance:function(){return P(this)}},o(G.prototype,G.Mixin,_.Mixin),e.exports=G},function(e,t,n){"use strict";var r=n(7),o=n(99),i={focusDOMComponent:function(){o(r.getNodeFromInstance(this))}};e.exports=i},function(e,t,n){"use strict";var r=n(100),o=n(9),i=(n(10),n(176),n(178)),a=n(179),u=n(181),s=(n(5),u((function(e){return a(e)}))),c=!1,l="cssFloat";if(o.canUseDOM){var p=document.createElement("div").style;try{p.font=""}catch(e){c=!0}void 0===document.documentElement.style.cssFloat&&(l="styleFloat")}var f={createMarkupForStyles:function(e,t){var n="";for(var r in e)if(e.hasOwnProperty(r)){var o=0===r.indexOf("--"),a=e[r];0,null!=a&&(n+=s(r)+":",n+=i(r,a,t,o)+";")}return n||null},setValueForStyles:function(e,t,n){var o=e.style;for(var a in t)if(t.hasOwnProperty(a)){var u=0===a.indexOf("--");0;var s=i(a,t[a],n,u);if("float"!==a&&"cssFloat"!==a||(a=l),u)o.setProperty(a,s);else if(s)o[a]=s;else{var p=c&&r.shorthandPropertyExpansions[a];if(p)for(var f in p)o[f]="";else o[a]=""}}}};e.exports=f},function(e,t,n){"use strict";var r=n(177),o=/^-ms-/;e.exports=function(e){return r(e.replace(o,"ms-"))}},function(e,t,n){"use strict";var r=/-(.)/g;e.exports=function(e){return e.replace(r,(function(e,t){return t.toUpperCase()}))}},function(e,t,n){"use strict";var r=n(100),o=(n(5),r.isUnitlessNumber);e.exports=function(e,t,n,r){if(null==t||"boolean"==typeof t||""===t)return"";var i=isNaN(t);return r||i||0===t||o.hasOwnProperty(e)&&o[e]?""+t:("string"==typeof t&&(t=t.trim()),t+"px")}},function(e,t,n){"use strict";var r=n(180),o=/^ms-/;e.exports=function(e){return r(e).replace(o,"-ms-")}},function(e,t,n){"use strict";var r=/([A-Z])/g;e.exports=function(e){return e.replace(r,"-$1").toLowerCase()}},function(e,t,n){"use strict";e.exports=function(e){var t={};return function(n){return t.hasOwnProperty(n)||(t[n]=e.call(this,n)),t[n]}}},function(e,t,n){"use strict";var r=n(41);e.exports=function(e){return'"'+r(e)+'"'}},function(e,t,n){"use strict";var r=n(32);var o={handleTopLevel:function(e,t,n,o){!function(e){r.enqueueEvents(e),r.processEventQueue(!1)}(r.extractEvents(e,t,n,o))}};e.exports=o},function(e,t,n){"use strict";var r=n(9);function o(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n["ms"+e]="MS"+t,n["O"+e]="o"+t.toLowerCase(),n}var i={animationend:o("Animation","AnimationEnd"),animationiteration:o("Animation","AnimationIteration"),animationstart:o("Animation","AnimationStart"),transitionend:o("Transition","TransitionEnd")},a={},u={};r.canUseDOM&&(u=document.createElement("div").style,"AnimationEvent"in window||(delete i.animationend.animation,delete i.animationiteration.animation,delete i.animationstart.animation),"TransitionEvent"in window||delete i.transitionend.transition),e.exports=function(e){if(a[e])return a[e];if(!i[e])return e;var t=i[e];for(var n in t)if(t.hasOwnProperty(n)&&n in u)return a[e]=t[n];return""}},function(e,t,n){"use strict";var r=n(4),o=n(6),i=n(101),a=n(63),u=n(7),s=n(13);n(2),n(5);function c(){this._rootNodeID&&p.updateWrapper(this)}function l(e){return"checkbox"===e.type||"radio"===e.type?null!=e.checked:null!=e.value}var p={getHostProps:function(e,t){var n=a.getValue(t),r=a.getChecked(t);return o({type:void 0,step:void 0,min:void 0,max:void 0},t,{defaultChecked:void 0,defaultValue:void 0,value:null!=n?n:e._wrapperState.initialValue,checked:null!=r?r:e._wrapperState.initialChecked,onChange:e._wrapperState.onChange})},mountWrapper:function(e,t){var n=t.defaultValue;e._wrapperState={initialChecked:null!=t.checked?t.checked:t.defaultChecked,initialValue:null!=t.value?t.value:n,listeners:null,onChange:f.bind(e),controlled:l(t)}},updateWrapper:function(e){var t=e._currentElement.props,n=t.checked;null!=n&&i.setValueForProperty(u.getNodeFromInstance(e),"checked",n||!1);var r=u.getNodeFromInstance(e),o=a.getValue(t);if(null!=o)if(0===o&&""===r.value)r.value="0";else if("number"===t.type){var s=parseFloat(r.value,10)||0;(o!=s||o==s&&r.value!=o)&&(r.value=""+o)}else r.value!==""+o&&(r.value=""+o);else null==t.value&&null!=t.defaultValue&&r.defaultValue!==""+t.defaultValue&&(r.defaultValue=""+t.defaultValue),null==t.checked&&null!=t.defaultChecked&&(r.defaultChecked=!!t.defaultChecked)},postMountWrapper:function(e){var t=e._currentElement.props,n=u.getNodeFromInstance(e);switch(t.type){case"submit":case"reset":break;case"color":case"date":case"datetime":case"datetime-local":case"month":case"time":case"week":n.value="",n.value=n.defaultValue;break;default:n.value=n.value}var r=n.name;""!==r&&(n.name=""),n.defaultChecked=!n.defaultChecked,n.defaultChecked=!n.defaultChecked,""!==r&&(n.name=r)}};function f(e){var t=this._currentElement.props,n=a.executeOnChange(t,e);s.asap(c,this);var o=t.name;if("radio"===t.type&&null!=o){for(var i=u.getNodeFromInstance(this),l=i;l.parentNode;)l=l.parentNode;for(var p=l.querySelectorAll("input[name="+JSON.stringify(""+o)+'][type="radio"]'),f=0;f<p.length;f++){var d=p[f];if(d!==i&&d.form===i.form){var h=u.getInstanceFromNode(d);h||r("90"),s.asap(c,h)}}}return n}e.exports=p},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";var r=n(6),o=n(22),i=n(7),a=n(102),u=(n(5),!1);function s(e){var t="";return o.Children.forEach(e,(function(e){null!=e&&("string"==typeof e||"number"==typeof e?t+=e:u||(u=!0))})),t}var c={mountWrapper:function(e,t,n){var r=null;if(null!=n){var o=n;"optgroup"===o._tag&&(o=o._hostParent),null!=o&&"select"===o._tag&&(r=a.getSelectValueContext(o))}var i,u=null;if(null!=r)if(i=null!=t.value?t.value+"":s(t.children),u=!1,Array.isArray(r)){for(var c=0;c<r.length;c++)if(""+r[c]===i){u=!0;break}}else u=""+r===i;e._wrapperState={selected:u}},postMountWrapper:function(e){var t=e._currentElement.props;null!=t.value&&i.getNodeFromInstance(e).setAttribute("value",t.value)},getHostProps:function(e,t){var n=r({selected:void 0,children:void 0},t);null!=e._wrapperState.selected&&(n.selected=e._wrapperState.selected);var o=s(t.children);return o&&(n.children=o),n}};e.exports=c},function(e,t,n){"use strict";var r=n(4),o=n(6),i=n(63),a=n(7),u=n(13);n(2),n(5);function s(){this._rootNodeID&&c.updateWrapper(this)}var c={getHostProps:function(e,t){return null!=t.dangerouslySetInnerHTML&&r("91"),o({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue,onChange:e._wrapperState.onChange})},mountWrapper:function(e,t){var n=i.getValue(t),o=n;if(null==n){var a=t.defaultValue,u=t.children;null!=u&&(null!=a&&r("92"),Array.isArray(u)&&(u.length<=1||r("93"),u=u[0]),a=""+u),null==a&&(a=""),o=a}e._wrapperState={initialValue:""+o,listeners:null,onChange:l.bind(e)}},updateWrapper:function(e){var t=e._currentElement.props,n=a.getNodeFromInstance(e),r=i.getValue(t);if(null!=r){var o=""+r;o!==n.value&&(n.value=o),null==t.defaultValue&&(n.defaultValue=o)}null!=t.defaultValue&&(n.defaultValue=t.defaultValue)},postMountWrapper:function(e){var t=a.getNodeFromInstance(e),n=t.textContent;n===e._wrapperState.initialValue&&(t.value=n)}};function l(e){var t=this._currentElement.props,n=i.executeOnChange(t,e);return u.asap(s,this),n}e.exports=c},function(e,t,n){"use strict";var r=n(4),o=n(64),i=(n(34),n(10),n(14),n(25)),a=n(190),u=(n(12),n(195));n(2);function s(e,t){return t&&(e=e||[]).push(t),e}function c(e,t){o.processChildrenUpdates(e,t)}var l={Mixin:{_reconcilerInstantiateChildren:function(e,t,n){return a.instantiateChildren(e,t,n)},_reconcilerUpdateChildren:function(e,t,n,r,o,i){var s;return s=u(t,0),a.updateChildren(e,s,n,r,o,this,this._hostContainerInfo,i,0),s},mountChildren:function(e,t,n){var r=this._reconcilerInstantiateChildren(e,t,n);this._renderedChildren=r;var o=[],a=0;for(var u in r)if(r.hasOwnProperty(u)){var s=r[u];0;var c=i.mountComponent(s,t,this,this._hostContainerInfo,n,0);s._mountIndex=a++,o.push(c)}return o},updateTextContent:function(e){var t,n=this._renderedChildren;for(var o in a.unmountChildren(n,!1),n)n.hasOwnProperty(o)&&r("118");c(this,[(t=e,{type:"TEXT_CONTENT",content:t,fromIndex:null,fromNode:null,toIndex:null,afterNode:null})])},updateMarkup:function(e){var t,n=this._renderedChildren;for(var o in a.unmountChildren(n,!1),n)n.hasOwnProperty(o)&&r("118");c(this,[(t=e,{type:"SET_MARKUP",content:t,fromIndex:null,fromNode:null,toIndex:null,afterNode:null})])},updateChildren:function(e,t,n){this._updateChildren(e,t,n)},_updateChildren:function(e,t,n){var r=this._renderedChildren,o={},a=[],u=this._reconcilerUpdateChildren(r,e,a,o,t,n);if(u||r){var l,p=null,f=0,d=0,h=0,m=null;for(l in u)if(u.hasOwnProperty(l)){var v=r&&r[l],y=u[l];v===y?(p=s(p,this.moveChild(v,m,f,d)),d=Math.max(v._mountIndex,d),v._mountIndex=f):(v&&(d=Math.max(v._mountIndex,d)),p=s(p,this._mountChildAtIndex(y,a[h],m,f,t,n)),h++),f++,m=i.getHostNode(y)}for(l in o)o.hasOwnProperty(l)&&(p=s(p,this._unmountChild(r[l],o[l])));p&&c(this,p),this._renderedChildren=u}},unmountChildren:function(e){var t=this._renderedChildren;a.unmountChildren(t,e),this._renderedChildren=null},moveChild:function(e,t,n,r){if(e._mountIndex<r)return function(e,t,n){return{type:"MOVE_EXISTING",content:null,fromIndex:e._mountIndex,fromNode:i.getHostNode(e),toIndex:n,afterNode:t}}(e,t,n)},createChild:function(e,t,n){return function(e,t,n){return{type:"INSERT_MARKUP",content:e,fromIndex:null,fromNode:null,toIndex:n,afterNode:t}}(n,t,e._mountIndex)},removeChild:function(e,t){return function(e,t){return{type:"REMOVE_NODE",content:null,fromIndex:e._mountIndex,fromNode:t,toIndex:null,afterNode:null}}(e,t)},_mountChildAtIndex:function(e,t,n,r,o,i){return e._mountIndex=r,this.createChild(e,n,t)},_unmountChild:function(e,t){var n=this.removeChild(e,t);return e._mountIndex=null,n}}};e.exports=l},function(e,t,n){"use strict";(function(t){var r=n(25),o=n(104),i=(n(67),n(66)),a=n(108);n(5);function u(e,t,n,r){var i=void 0===e[n];null!=t&&i&&(e[n]=o(t,!0))}void 0!==t&&t.env;var s={instantiateChildren:function(e,t,n,r){if(null==e)return null;var o={};return a(e,u,o),o},updateChildren:function(e,t,n,a,u,s,c,l,p){if(t||e){var f,d;for(f in t)if(t.hasOwnProperty(f)){var h=(d=e&&e[f])&&d._currentElement,m=t[f];if(null!=d&&i(h,m))r.receiveComponent(d,m,u,l),t[f]=d;else{d&&(a[f]=r.getHostNode(d),r.unmountComponent(d,!1));var v=o(m,!0);t[f]=v;var y=r.mountComponent(v,u,s,c,l,p);n.push(y)}}for(f in e)!e.hasOwnProperty(f)||t&&t.hasOwnProperty(f)||(d=e[f],a[f]=r.getHostNode(d),r.unmountComponent(d,!1))}},unmountChildren:function(e,t){for(var n in e)if(e.hasOwnProperty(n)){var o=e[n];r.unmountComponent(o,t)}}};e.exports=s}).call(this,n(103))},function(e,t,n){"use strict";var r=n(4),o=n(6),i=n(22),a=n(64),u=n(14),s=n(56),c=n(34),l=(n(10),n(105)),p=n(25),f=n(37),d=(n(2),n(65)),h=n(66),m=(n(5),0),v=1,y=2;function g(e){}function b(e,t){0}g.prototype.render=function(){var e=c.get(this)._currentElement.type,t=e(this.props,this.context,this.updater);return b(e,t),t};var _=1,E={construct:function(e){this._currentElement=e,this._rootNodeID=0,this._compositeType=null,this._instance=null,this._hostParent=null,this._hostContainerInfo=null,this._updateBatchNumber=null,this._pendingElement=null,this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1,this._renderedNodeType=null,this._renderedComponent=null,this._context=null,this._mountOrder=0,this._topLevelWrapper=null,this._pendingCallbacks=null,this._calledComponentWillUnmount=!1},mountComponent:function(e,t,n,o){this._context=o,this._mountOrder=_++,this._hostParent=t,this._hostContainerInfo=n;var a,u=this._currentElement.props,s=this._processContext(o),l=this._currentElement.type,p=e.getUpdateQueue(),d=function(e){return!(!e.prototype||!e.prototype.isReactComponent)}(l),h=this._constructComponent(d,u,s,p);d||null!=h&&null!=h.render?!function(e){return!(!e.prototype||!e.prototype.isPureReactComponent)}(l)?this._compositeType=m:this._compositeType=v:(a=h,b(),null===h||!1===h||i.isValidElement(h)||r("105",l.displayName||l.name||"Component"),h=new g(l),this._compositeType=y),h.props=u,h.context=s,h.refs=f,h.updater=p,this._instance=h,c.set(h,this);var E,C=h.state;return void 0===C&&(h.state=C=null),("object"!=typeof C||Array.isArray(C))&&r("106",this.getName()||"ReactCompositeComponent"),this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1,E=h.unstable_handleError?this.performInitialMountWithErrorHandling(a,t,n,e,o):this.performInitialMount(a,t,n,e,o),h.componentDidMount&&e.getReactMountReady().enqueue(h.componentDidMount,h),E},_constructComponent:function(e,t,n,r){return this._constructComponentWithoutOwner(e,t,n,r)},_constructComponentWithoutOwner:function(e,t,n,r){var o=this._currentElement.type;return e?new o(t,n,r):o(t,n,r)},performInitialMountWithErrorHandling:function(e,t,n,r,o){var i,a=r.checkpoint();try{i=this.performInitialMount(e,t,n,r,o)}catch(u){r.rollback(a),this._instance.unstable_handleError(u),this._pendingStateQueue&&(this._instance.state=this._processPendingState(this._instance.props,this._instance.context)),a=r.checkpoint(),this._renderedComponent.unmountComponent(!0),r.rollback(a),i=this.performInitialMount(e,t,n,r,o)}return i},performInitialMount:function(e,t,n,r,o){var i=this._instance;i.componentWillMount&&(i.componentWillMount(),this._pendingStateQueue&&(i.state=this._processPendingState(i.props,i.context))),void 0===e&&(e=this._renderValidatedComponent());var a=l.getType(e);this._renderedNodeType=a;var u=this._instantiateReactComponent(e,a!==l.EMPTY);return this._renderedComponent=u,p.mountComponent(u,r,t,n,this._processChildContext(o),0)},getHostNode:function(){return p.getHostNode(this._renderedComponent)},unmountComponent:function(e){if(this._renderedComponent){var t=this._instance;if(t.componentWillUnmount&&!t._calledComponentWillUnmount)if(t._calledComponentWillUnmount=!0,e){var n=this.getName()+".componentWillUnmount()";s.invokeGuardedCallback(n,t.componentWillUnmount.bind(t))}else t.componentWillUnmount();this._renderedComponent&&(p.unmountComponent(this._renderedComponent,e),this._renderedNodeType=null,this._renderedComponent=null,this._instance=null),this._pendingStateQueue=null,this._pendingReplaceState=!1,this._pendingForceUpdate=!1,this._pendingCallbacks=null,this._pendingElement=null,this._context=null,this._rootNodeID=0,this._topLevelWrapper=null,c.remove(t)}},_maskContext:function(e){var t=this._currentElement.type.contextTypes;if(!t)return f;var n={};for(var r in t)n[r]=e[r];return n},_processContext:function(e){return this._maskContext(e)},_processChildContext:function(e){var t,n=this._currentElement.type,i=this._instance;if(i.getChildContext&&(t=i.getChildContext()),t){for(var a in"object"!=typeof n.childContextTypes&&r("107",this.getName()||"ReactCompositeComponent"),t)a in n.childContextTypes||r("108",this.getName()||"ReactCompositeComponent",a);return o({},e,t)}return e},_checkContextTypes:function(e,t,n){0},receiveComponent:function(e,t,n){var r=this._currentElement,o=this._context;this._pendingElement=null,this.updateComponent(t,r,e,o,n)},performUpdateIfNecessary:function(e){null!=this._pendingElement?p.receiveComponent(this,this._pendingElement,e,this._context):null!==this._pendingStateQueue||this._pendingForceUpdate?this.updateComponent(e,this._currentElement,this._currentElement,this._context,this._context):this._updateBatchNumber=null},updateComponent:function(e,t,n,o,i){var a=this._instance;null==a&&r("136",this.getName()||"ReactCompositeComponent");var u,s=!1;this._context===i?u=a.context:(u=this._processContext(i),s=!0);var c=t.props,l=n.props;t!==n&&(s=!0),s&&a.componentWillReceiveProps&&a.componentWillReceiveProps(l,u);var p=this._processPendingState(l,u),f=!0;this._pendingForceUpdate||(a.shouldComponentUpdate?f=a.shouldComponentUpdate(l,p,u):this._compositeType===v&&(f=!d(c,l)||!d(a.state,p))),this._updateBatchNumber=null,f?(this._pendingForceUpdate=!1,this._performComponentUpdate(n,l,p,u,e,i)):(this._currentElement=n,this._context=i,a.props=l,a.state=p,a.context=u)},_processPendingState:function(e,t){var n=this._instance,r=this._pendingStateQueue,i=this._pendingReplaceState;if(this._pendingReplaceState=!1,this._pendingStateQueue=null,!r)return n.state;if(i&&1===r.length)return r[0];for(var a=o({},i?r[0]:n.state),u=i?1:0;u<r.length;u++){var s=r[u];o(a,"function"==typeof s?s.call(n,a,e,t):s)}return a},_performComponentUpdate:function(e,t,n,r,o,i){var a,u,s,c=this._instance,l=Boolean(c.componentDidUpdate);l&&(a=c.props,u=c.state,s=c.context),c.componentWillUpdate&&c.componentWillUpdate(t,n,r),this._currentElement=e,this._context=i,c.props=t,c.state=n,c.context=r,this._updateRenderedComponent(o,i),l&&o.getReactMountReady().enqueue(c.componentDidUpdate.bind(c,a,u,s),c)},_updateRenderedComponent:function(e,t){var n=this._renderedComponent,r=n._currentElement,o=this._renderValidatedComponent();if(h(r,o))p.receiveComponent(n,o,e,this._processChildContext(t));else{var i=p.getHostNode(n);p.unmountComponent(n,!1);var a=l.getType(o);this._renderedNodeType=a;var u=this._instantiateReactComponent(o,a!==l.EMPTY);this._renderedComponent=u;var s=p.mountComponent(u,e,this._hostParent,this._hostContainerInfo,this._processChildContext(t),0);this._replaceNodeWithMarkup(i,s,n)}},_replaceNodeWithMarkup:function(e,t,n){a.replaceNodeWithMarkup(e,t,n)},_renderValidatedComponentWithoutOwnerOrContext:function(){return this._instance.render()},_renderValidatedComponent:function(){var e;if(this._compositeType!==y){u.current=this;try{e=this._renderValidatedComponentWithoutOwnerOrContext()}finally{u.current=null}}else e=this._renderValidatedComponentWithoutOwnerOrContext();return null===e||!1===e||i.isValidElement(e)||r("109",this.getName()||"ReactCompositeComponent"),e},attachRef:function(e,t){var n=this.getPublicInstance();null==n&&r("110");var o=t.getPublicInstance();(n.refs===f?n.refs={}:n.refs)[e]=o},detachRef:function(e){delete this.getPublicInstance().refs[e]},getName:function(){var e=this._currentElement.type,t=this._instance&&this._instance.constructor;return e.displayName||t&&t.displayName||e.name||t&&t.name||null},getPublicInstance:function(){var e=this._instance;return this._compositeType===y?null:e},_instantiateReactComponent:null};e.exports=E},function(e,t,n){"use strict";var r=1;e.exports=function(){return r++}},function(e,t,n){"use strict";var r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;e.exports=r},function(e,t,n){"use strict";var r="function"==typeof Symbol&&Symbol.iterator;e.exports=function(e){var t=e&&(r&&e[r]||e["@@iterator"]);if("function"==typeof t)return t}},function(e,t,n){"use strict";(function(t){n(67);var r=n(108);n(5);function o(e,t,n,r){if(e&&"object"==typeof e){var o=e;0,void 0===o[n]&&null!=t&&(o[n]=t)}}void 0!==t&&t.env,e.exports=function(e,t){if(null==e)return e;var n={};return r(e,o,n),n}}).call(this,n(103))},function(e,t,n){"use strict";var r=n(6),o=n(19),i=n(38),a=(n(10),n(197)),u=[];var s={enqueue:function(){}};function c(e){this.reinitializeTransaction(),this.renderToStaticMarkup=e,this.useCreateElement=!1,this.updateQueue=new a(this)}var l={getTransactionWrappers:function(){return u},getReactMountReady:function(){return s},getUpdateQueue:function(){return this.updateQueue},destructor:function(){},checkpoint:function(){},rollback:function(){}};r(c.prototype,i,l),o.addPoolingTo(c),e.exports=c},function(e,t,n){"use strict";var r=n(68);n(5);var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.transaction=t}return e.prototype.isMounted=function(e){return!1},e.prototype.enqueueCallback=function(e,t,n){this.transaction.isInTransaction()&&r.enqueueCallback(e,t,n)},e.prototype.enqueueForceUpdate=function(e){this.transaction.isInTransaction()&&r.enqueueForceUpdate(e)},e.prototype.enqueueReplaceState=function(e,t){this.transaction.isInTransaction()&&r.enqueueReplaceState(e,t)},e.prototype.enqueueSetState=function(e,t){this.transaction.isInTransaction()&&r.enqueueSetState(e,t)},e}();e.exports=o},function(e,t,n){"use strict";var r=n(6),o=n(26),i=n(7),a=function(e){this._currentElement=null,this._hostNode=null,this._hostParent=null,this._hostContainerInfo=null,this._domID=0};r(a.prototype,{mountComponent:function(e,t,n,r){var a=n._idCounter++;this._domID=a,this._hostParent=t,this._hostContainerInfo=n;var u=" react-empty: "+this._domID+" ";if(e.useCreateElement){var s=n._ownerDocument.createComment(u);return i.precacheNode(this,s),o(s)}return e.renderToStaticMarkup?"":"\x3c!--"+u+"--\x3e"},receiveComponent:function(){},getHostNode:function(){return i.getNodeFromInstance(this)},unmountComponent:function(){i.uncacheNode(this)}}),e.exports=a},function(e,t,n){"use strict";var r=n(4);n(2);function o(e,t){"_hostNode"in e||r("33"),"_hostNode"in t||r("33");for(var n=0,o=e;o;o=o._hostParent)n++;for(var i=0,a=t;a;a=a._hostParent)i++;for(;n-i>0;)e=e._hostParent,n--;for(;i-n>0;)t=t._hostParent,i--;for(var u=n;u--;){if(e===t)return e;e=e._hostParent,t=t._hostParent}return null}e.exports={isAncestor:function(e,t){"_hostNode"in e||r("35"),"_hostNode"in t||r("35");for(;t;){if(t===e)return!0;t=t._hostParent}return!1},getLowestCommonAncestor:o,getParentInstance:function(e){return"_hostNode"in e||r("36"),e._hostParent},traverseTwoPhase:function(e,t,n){for(var r,o=[];e;)o.push(e),e=e._hostParent;for(r=o.length;r-- >0;)t(o[r],"captured",n);for(r=0;r<o.length;r++)t(o[r],"bubbled",n)},traverseEnterLeave:function(e,t,n,r,i){for(var a=e&&t?o(e,t):null,u=[];e&&e!==a;)u.push(e),e=e._hostParent;for(var s,c=[];t&&t!==a;)c.push(t),t=t._hostParent;for(s=0;s<u.length;s++)n(u[s],"bubbled",r);for(s=c.length;s-- >0;)n(c[s],"captured",i)}}},function(e,t,n){"use strict";var r=n(4),o=n(6),i=n(60),a=n(26),u=n(7),s=n(41),c=(n(2),n(69),function(e){this._currentElement=e,this._stringText=""+e,this._hostNode=null,this._hostParent=null,this._domID=0,this._mountIndex=0,this._closingComment=null,this._commentNodes=null});o(c.prototype,{mountComponent:function(e,t,n,r){var o=n._idCounter++,i=" react-text: "+o+" ";if(this._domID=o,this._hostParent=t,e.useCreateElement){var c=n._ownerDocument,l=c.createComment(i),p=c.createComment(" /react-text "),f=a(c.createDocumentFragment());return a.queueChild(f,a(l)),this._stringText&&a.queueChild(f,a(c.createTextNode(this._stringText))),a.queueChild(f,a(p)),u.precacheNode(this,l),this._closingComment=p,f}var d=s(this._stringText);return e.renderToStaticMarkup?d:"\x3c!--"+i+"--\x3e"+d+"\x3c!-- /react-text --\x3e"},receiveComponent:function(e,t){if(e!==this._currentElement){this._currentElement=e;var n=""+e;if(n!==this._stringText){this._stringText=n;var r=this.getHostNode();i.replaceDelimitedText(r[0],r[1],n)}}},getHostNode:function(){var e=this._commentNodes;if(e)return e;if(!this._closingComment)for(var t=u.getNodeFromInstance(this).nextSibling;;){if(null==t&&r("67",this._domID),8===t.nodeType&&" /react-text "===t.nodeValue){this._closingComment=t;break}t=t.nextSibling}return e=[this._hostNode,this._closingComment],this._commentNodes=e,e},unmountComponent:function(){this._closingComment=null,this._commentNodes=null,u.uncacheNode(this)}}),e.exports=c},function(e,t,n){"use strict";var r=n(6),o=n(13),i=n(38),a=n(12),u={initialize:a,close:function(){p.isBatchingUpdates=!1}},s=[{initialize:a,close:o.flushBatchedUpdates.bind(o)},u];function c(){this.reinitializeTransaction()}r(c.prototype,i,{getTransactionWrappers:function(){return s}});var l=new c,p={isBatchingUpdates:!1,batchedUpdates:function(e,t,n,r,o,i){var a=p.isBatchingUpdates;return p.isBatchingUpdates=!0,a?e(t,n,r,o,i):l.perform(e,null,t,n,r,o,i)}};e.exports=p},function(e,t,n){"use strict";var r=n(6),o=n(110),i=n(9),a=n(19),u=n(7),s=n(13),c=n(57),l=n(203);function p(e){for(;e._hostParent;)e=e._hostParent;var t=u.getNodeFromInstance(e).parentNode;return u.getClosestInstanceFromNode(t)}function f(e,t){this.topLevelType=e,this.nativeEvent=t,this.ancestors=[]}function d(e){var t=c(e.nativeEvent),n=u.getClosestInstanceFromNode(t),r=n;do{e.ancestors.push(r),r=r&&p(r)}while(r);for(var o=0;o<e.ancestors.length;o++)n=e.ancestors[o],m._handleTopLevel(e.topLevelType,n,e.nativeEvent,c(e.nativeEvent))}function h(e){e(l(window))}r(f.prototype,{destructor:function(){this.topLevelType=null,this.nativeEvent=null,this.ancestors.length=0}}),a.addPoolingTo(f,a.twoArgumentPooler);var m={_enabled:!0,_handleTopLevel:null,WINDOW_HANDLE:i.canUseDOM?window:null,setHandleTopLevel:function(e){m._handleTopLevel=e},setEnabled:function(e){m._enabled=!!e},isEnabled:function(){return m._enabled},trapBubbledEvent:function(e,t,n){return n?o.listen(n,t,m.dispatchEvent.bind(null,e)):null},trapCapturedEvent:function(e,t,n){return n?o.capture(n,t,m.dispatchEvent.bind(null,e)):null},monitorScrollValue:function(e){var t=h.bind(null,e);o.listen(window,"scroll",t)},dispatchEvent:function(e,t){if(m._enabled){var n=f.getPooled(e,t);try{s.batchedUpdates(d,n)}finally{f.release(n)}}}};e.exports=m},function(e,t,n){"use strict";e.exports=function(e){return e.Window&&e instanceof e.Window?{x:e.pageXOffset||e.document.documentElement.scrollLeft,y:e.pageYOffset||e.document.documentElement.scrollTop}:{x:e.scrollLeft,y:e.scrollTop}}},function(e,t,n){"use strict";var r=n(24),o=n(32),i=n(55),a=n(64),u=n(106),s=n(42),c=n(107),l=n(13),p={Component:a.injection,DOMProperty:r.injection,EmptyComponent:u.injection,EventPluginHub:o.injection,EventPluginUtils:i.injection,EventEmitter:s.injection,HostComponent:c.injection,Updates:l.injection};e.exports=p},function(e,t,n){"use strict";var r=n(6),o=n(93),i=n(19),a=n(42),u=n(111),s=(n(10),n(38)),c=n(68),l=[{initialize:u.getSelectionInformation,close:u.restoreSelection},{initialize:function(){var e=a.isEnabled();return a.setEnabled(!1),e},close:function(e){a.setEnabled(e)}},{initialize:function(){this.reactMountReady.reset()},close:function(){this.reactMountReady.notifyAll()}}];function p(e){this.reinitializeTransaction(),this.renderToStaticMarkup=!1,this.reactMountReady=o.getPooled(null),this.useCreateElement=e}var f={getTransactionWrappers:function(){return l},getReactMountReady:function(){return this.reactMountReady},getUpdateQueue:function(){return c},checkpoint:function(){return this.reactMountReady.checkpoint()},rollback:function(e){this.reactMountReady.rollback(e)},destructor:function(){o.release(this.reactMountReady),this.reactMountReady=null}};r(p.prototype,s,f),i.addPoolingTo(p),e.exports=p},function(e,t,n){"use strict";var r=n(9),o=n(207),i=n(92);function a(e,t,n,r){return e===n&&t===r}var u=r.canUseDOM&&"selection"in document&&!("getSelection"in window),s={getOffsets:u?function(e){var t=document.selection.createRange(),n=t.text.length,r=t.duplicate();r.moveToElementText(e),r.setEndPoint("EndToStart",t);var o=r.text.length;return{start:o,end:o+n}}:function(e){var t=window.getSelection&&window.getSelection();if(!t||0===t.rangeCount)return null;var n=t.anchorNode,r=t.anchorOffset,o=t.focusNode,i=t.focusOffset,u=t.getRangeAt(0);try{u.startContainer.nodeType,u.endContainer.nodeType}catch(e){return null}var s=a(t.anchorNode,t.anchorOffset,t.focusNode,t.focusOffset)?0:u.toString().length,c=u.cloneRange();c.selectNodeContents(e),c.setEnd(u.startContainer,u.startOffset);var l=a(c.startContainer,c.startOffset,c.endContainer,c.endOffset)?0:c.toString().length,p=l+s,f=document.createRange();f.setStart(n,r),f.setEnd(o,i);var d=f.collapsed;return{start:d?p:l,end:d?l:p}},setOffsets:u?function(e,t){var n,r,o=document.selection.createRange().duplicate();void 0===t.end?r=n=t.start:t.start>t.end?(n=t.end,r=t.start):(n=t.start,r=t.end),o.moveToElementText(e),o.moveStart("character",n),o.setEndPoint("EndToStart",o),o.moveEnd("character",r-n),o.select()}:function(e,t){if(window.getSelection){var n=window.getSelection(),r=e[i()].length,a=Math.min(t.start,r),u=void 0===t.end?a:Math.min(t.end,r);if(!n.extend&&a>u){var s=u;u=a,a=s}var c=o(e,a),l=o(e,u);if(c&&l){var p=document.createRange();p.setStart(c.node,c.offset),n.removeAllRanges(),a>u?(n.addRange(p),n.extend(l.node,l.offset)):(p.setEnd(l.node,l.offset),n.addRange(p))}}}};e.exports=s},function(e,t,n){"use strict";function r(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function o(e){for(;e;){if(e.nextSibling)return e.nextSibling;e=e.parentNode}}e.exports=function(e,t){for(var n=r(e),i=0,a=0;n;){if(3===n.nodeType){if(a=i+n.textContent.length,i<=t&&a>=t)return{node:n,offset:t-i};i=a}n=r(o(n))}}},function(e,t,n){"use strict";var r=n(209);e.exports=function e(t,n){return!(!t||!n)&&(t===n||!r(t)&&(r(n)?e(t,n.parentNode):"contains"in t?t.contains(n):!!t.compareDocumentPosition&&!!(16&t.compareDocumentPosition(n))))}},function(e,t,n){"use strict";var r=n(210);e.exports=function(e){return r(e)&&3==e.nodeType}},function(e,t,n){"use strict";e.exports=function(e){var t=(e?e.ownerDocument||e:document).defaultView||window;return!(!e||!("function"==typeof t.Node?e instanceof t.Node:"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName))}},function(e,t,n){"use strict";var r="http://www.w3.org/1999/xlink",o="http://www.w3.org/XML/1998/namespace",i={accentHeight:"accent-height",accumulate:0,additive:0,alignmentBaseline:"alignment-baseline",allowReorder:"allowReorder",alphabetic:0,amplitude:0,arabicForm:"arabic-form",ascent:0,attributeName:"attributeName",attributeType:"attributeType",autoReverse:"autoReverse",azimuth:0,baseFrequency:"baseFrequency",baseProfile:"baseProfile",baselineShift:"baseline-shift",bbox:0,begin:0,bias:0,by:0,calcMode:"calcMode",capHeight:"cap-height",clip:0,clipPath:"clip-path",clipRule:"clip-rule",clipPathUnits:"clipPathUnits",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",contentScriptType:"contentScriptType",contentStyleType:"contentStyleType",cursor:0,cx:0,cy:0,d:0,decelerate:0,descent:0,diffuseConstant:"diffuseConstant",direction:0,display:0,divisor:0,dominantBaseline:"dominant-baseline",dur:0,dx:0,dy:0,edgeMode:"edgeMode",elevation:0,enableBackground:"enable-background",end:0,exponent:0,externalResourcesRequired:"externalResourcesRequired",fill:0,fillOpacity:"fill-opacity",fillRule:"fill-rule",filter:0,filterRes:"filterRes",filterUnits:"filterUnits",floodColor:"flood-color",floodOpacity:"flood-opacity",focusable:0,fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",format:0,from:0,fx:0,fy:0,g1:0,g2:0,glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",glyphRef:"glyphRef",gradientTransform:"gradientTransform",gradientUnits:"gradientUnits",hanging:0,horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",ideographic:0,imageRendering:"image-rendering",in:0,in2:0,intercept:0,k:0,k1:0,k2:0,k3:0,k4:0,kernelMatrix:"kernelMatrix",kernelUnitLength:"kernelUnitLength",kerning:0,keyPoints:"keyPoints",keySplines:"keySplines",keyTimes:"keyTimes",lengthAdjust:"lengthAdjust",letterSpacing:"letter-spacing",lightingColor:"lighting-color",limitingConeAngle:"limitingConeAngle",local:0,markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",markerHeight:"markerHeight",markerUnits:"markerUnits",markerWidth:"markerWidth",mask:0,maskContentUnits:"maskContentUnits",maskUnits:"maskUnits",mathematical:0,mode:0,numOctaves:"numOctaves",offset:0,opacity:0,operator:0,order:0,orient:0,orientation:0,origin:0,overflow:0,overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pathLength:"pathLength",patternContentUnits:"patternContentUnits",patternTransform:"patternTransform",patternUnits:"patternUnits",pointerEvents:"pointer-events",points:0,pointsAtX:"pointsAtX",pointsAtY:"pointsAtY",pointsAtZ:"pointsAtZ",preserveAlpha:"preserveAlpha",preserveAspectRatio:"preserveAspectRatio",primitiveUnits:"primitiveUnits",r:0,radius:0,refX:"refX",refY:"refY",renderingIntent:"rendering-intent",repeatCount:"repeatCount",repeatDur:"repeatDur",requiredExtensions:"requiredExtensions",requiredFeatures:"requiredFeatures",restart:0,result:0,rotate:0,rx:0,ry:0,scale:0,seed:0,shapeRendering:"shape-rendering",slope:0,spacing:0,specularConstant:"specularConstant",specularExponent:"specularExponent",speed:0,spreadMethod:"spreadMethod",startOffset:"startOffset",stdDeviation:"stdDeviation",stemh:0,stemv:0,stitchTiles:"stitchTiles",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",string:0,stroke:0,strokeDasharray:"stroke-dasharray",strokeDashoffset:"stroke-dashoffset",strokeLinecap:"stroke-linecap",strokeLinejoin:"stroke-linejoin",strokeMiterlimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",surfaceScale:"surfaceScale",systemLanguage:"systemLanguage",tableValues:"tableValues",targetX:"targetX",targetY:"targetY",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",textLength:"textLength",to:0,transform:0,u1:0,u2:0,underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicode:0,unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",values:0,vectorEffect:"vector-effect",version:0,vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",viewBox:"viewBox",viewTarget:"viewTarget",visibility:0,widths:0,wordSpacing:"word-spacing",writingMode:"writing-mode",x:0,xHeight:"x-height",x1:0,x2:0,xChannelSelector:"xChannelSelector",xlinkActuate:"xlink:actuate",xlinkArcrole:"xlink:arcrole",xlinkHref:"xlink:href",xlinkRole:"xlink:role",xlinkShow:"xlink:show",xlinkTitle:"xlink:title",xlinkType:"xlink:type",xmlBase:"xml:base",xmlns:0,xmlnsXlink:"xmlns:xlink",xmlLang:"xml:lang",xmlSpace:"xml:space",y:0,y1:0,y2:0,yChannelSelector:"yChannelSelector",z:0,zoomAndPan:"zoomAndPan"},a={Properties:{},DOMAttributeNamespaces:{xlinkActuate:r,xlinkArcrole:r,xlinkHref:r,xlinkRole:r,xlinkShow:r,xlinkTitle:r,xlinkType:r,xmlBase:o,xmlLang:o,xmlSpace:o},DOMAttributeNames:{}};Object.keys(i).forEach((function(e){a.Properties[e]=0,i[e]&&(a.DOMAttributeNames[e]=i[e])})),e.exports=a},function(e,t,n){"use strict";var r=n(31),o=n(9),i=n(7),a=n(111),u=n(15),s=n(112),c=n(96),l=n(65),p=o.canUseDOM&&"documentMode"in document&&document.documentMode<=11,f={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:["topBlur","topContextMenu","topFocus","topKeyDown","topKeyUp","topMouseDown","topMouseUp","topSelectionChange"]}},d=null,h=null,m=null,v=!1,y=!1;function g(e,t){if(v||null==d||d!==s())return null;var n=function(e){if("selectionStart"in e&&a.hasSelectionCapabilities(e))return{start:e.selectionStart,end:e.selectionEnd};if(window.getSelection){var t=window.getSelection();return{anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,focusOffset:t.focusOffset}}if(document.selection){var n=document.selection.createRange();return{parentElement:n.parentElement(),text:n.text,top:n.boundingTop,left:n.boundingLeft}}}(d);if(!m||!l(m,n)){m=n;var o=u.getPooled(f.select,h,e,t);return o.type="select",o.target=d,r.accumulateTwoPhaseDispatches(o),o}return null}var b={eventTypes:f,extractEvents:function(e,t,n,r){if(!y)return null;var o=t?i.getNodeFromInstance(t):window;switch(e){case"topFocus":(c(o)||"true"===o.contentEditable)&&(d=o,h=t,m=null);break;case"topBlur":d=null,h=null,m=null;break;case"topMouseDown":v=!0;break;case"topContextMenu":case"topMouseUp":return v=!1,g(n,r);case"topSelectionChange":if(p)break;case"topKeyDown":case"topKeyUp":return g(n,r)}return null},didPutListener:function(e,t,n){"onSelect"===t&&(y=!0)}};e.exports=b},function(e,t,n){"use strict";var r=n(4),o=n(110),i=n(31),a=n(7),u=n(214),s=n(215),c=n(15),l=n(216),p=n(217),f=n(39),d=n(219),h=n(220),m=n(221),v=n(33),y=n(222),g=n(12),b=n(70),_=(n(2),{}),E={};["abort","animationEnd","animationIteration","animationStart","blur","canPlay","canPlayThrough","click","contextMenu","copy","cut","doubleClick","drag","dragEnd","dragEnter","dragExit","dragLeave","dragOver","dragStart","drop","durationChange","emptied","encrypted","ended","error","focus","input","invalid","keyDown","keyPress","keyUp","load","loadedData","loadedMetadata","loadStart","mouseDown","mouseMove","mouseOut","mouseOver","mouseUp","paste","pause","play","playing","progress","rateChange","reset","scroll","seeked","seeking","stalled","submit","suspend","timeUpdate","touchCancel","touchEnd","touchMove","touchStart","transitionEnd","volumeChange","waiting","wheel"].forEach((function(e){var t=e[0].toUpperCase()+e.slice(1),n="on"+t,r="top"+t,o={phasedRegistrationNames:{bubbled:n,captured:n+"Capture"},dependencies:[r]};_[e]=o,E[r]=o}));var C={};function w(e){return"."+e._rootNodeID}function O(e){return"button"===e||"input"===e||"select"===e||"textarea"===e}var x={eventTypes:_,extractEvents:function(e,t,n,o){var a,g=E[e];if(!g)return null;switch(e){case"topAbort":case"topCanPlay":case"topCanPlayThrough":case"topDurationChange":case"topEmptied":case"topEncrypted":case"topEnded":case"topError":case"topInput":case"topInvalid":case"topLoad":case"topLoadedData":case"topLoadedMetadata":case"topLoadStart":case"topPause":case"topPlay":case"topPlaying":case"topProgress":case"topRateChange":case"topReset":case"topSeeked":case"topSeeking":case"topStalled":case"topSubmit":case"topSuspend":case"topTimeUpdate":case"topVolumeChange":case"topWaiting":a=c;break;case"topKeyPress":if(0===b(n))return null;case"topKeyDown":case"topKeyUp":a=p;break;case"topBlur":case"topFocus":a=l;break;case"topClick":if(2===n.button)return null;case"topDoubleClick":case"topMouseDown":case"topMouseMove":case"topMouseUp":case"topMouseOut":case"topMouseOver":case"topContextMenu":a=f;break;case"topDrag":case"topDragEnd":case"topDragEnter":case"topDragExit":case"topDragLeave":case"topDragOver":case"topDragStart":case"topDrop":a=d;break;case"topTouchCancel":case"topTouchEnd":case"topTouchMove":case"topTouchStart":a=h;break;case"topAnimationEnd":case"topAnimationIteration":case"topAnimationStart":a=u;break;case"topTransitionEnd":a=m;break;case"topScroll":a=v;break;case"topWheel":a=y;break;case"topCopy":case"topCut":case"topPaste":a=s}a||r("86",e);var _=a.getPooled(g,t,n,o);return i.accumulateTwoPhaseDispatches(_),_},didPutListener:function(e,t,n){if("onClick"===t&&!O(e._tag)){var r=w(e),i=a.getNodeFromInstance(e);C[r]||(C[r]=o.listen(i,"click",g))}},willDeleteListener:function(e,t){if("onClick"===t&&!O(e._tag)){var n=w(e);C[n].remove(),delete C[n]}}};e.exports=x},function(e,t,n){"use strict";var r=n(15);function o(e,t,n,o){return r.call(this,e,t,n,o)}r.augmentClass(o,{animationName:null,elapsedTime:null,pseudoElement:null}),e.exports=o},function(e,t,n){"use strict";var r=n(15),o={clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}};function i(e,t,n,o){return r.call(this,e,t,n,o)}r.augmentClass(i,o),e.exports=i},function(e,t,n){"use strict";var r=n(33);function o(e,t,n,o){return r.call(this,e,t,n,o)}r.augmentClass(o,{relatedTarget:null}),e.exports=o},function(e,t,n){"use strict";var r=n(33),o=n(70),i={key:n(218),location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:n(59),charCode:function(e){return"keypress"===e.type?o(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?o(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}};function a(e,t,n,o){return r.call(this,e,t,n,o)}r.augmentClass(a,i),e.exports=a},function(e,t,n){"use strict";var r=n(70),o={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},i={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};e.exports=function(e){if(e.key){var t=o[e.key]||e.key;if("Unidentified"!==t)return t}if("keypress"===e.type){var n=r(e);return 13===n?"Enter":String.fromCharCode(n)}return"keydown"===e.type||"keyup"===e.type?i[e.keyCode]||"Unidentified":""}},function(e,t,n){"use strict";var r=n(39);function o(e,t,n,o){return r.call(this,e,t,n,o)}r.augmentClass(o,{dataTransfer:null}),e.exports=o},function(e,t,n){"use strict";var r=n(33),o={touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:n(59)};function i(e,t,n,o){return r.call(this,e,t,n,o)}r.augmentClass(i,o),e.exports=i},function(e,t,n){"use strict";var r=n(15);function o(e,t,n,o){return r.call(this,e,t,n,o)}r.augmentClass(o,{propertyName:null,elapsedTime:null,pseudoElement:null}),e.exports=o},function(e,t,n){"use strict";var r=n(39);function o(e,t,n,o){return r.call(this,e,t,n,o)}r.augmentClass(o,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:null,deltaMode:null}),e.exports=o},function(e,t,n){"use strict";n(69);e.exports=function(e,t){return{_topLevelWrapper:e,_idCounter:1,_ownerDocument:t?9===t.nodeType?t:t.ownerDocument:null,_node:t,_tag:t?t.nodeName.toLowerCase():null,_namespaceURI:t?t.namespaceURI:null}}},function(e,t,n){"use strict";e.exports={useCreateElement:!0,useFiber:!1}},function(e,t,n){"use strict";var r=n(226),o=/\/?>/,i=/^<\!\-\-/,a={CHECKSUM_ATTR_NAME:"data-react-checksum",addChecksumToMarkup:function(e){var t=r(e);return i.test(e)?e:e.replace(o," "+a.CHECKSUM_ATTR_NAME+'="'+t+'"$&')},canReuseMarkup:function(e,t){var n=t.getAttribute(a.CHECKSUM_ATTR_NAME);return n=n&&parseInt(n,10),r(e)===n}};e.exports=a},function(e,t,n){"use strict";e.exports=function(e){for(var t=1,n=0,r=0,o=e.length,i=-4&o;r<i;){for(var a=Math.min(r+4096,i);r<a;r+=4)n+=(t+=e.charCodeAt(r))+(t+=e.charCodeAt(r+1))+(t+=e.charCodeAt(r+2))+(t+=e.charCodeAt(r+3));t%=65521,n%=65521}for(;r<o;r++)n+=t+=e.charCodeAt(r);return(t%=65521)|(n%=65521)<<16}},function(e,t,n){"use strict";e.exports="15.6.2"},function(e,t,n){"use strict";var r=n(4),o=(n(14),n(7)),i=n(34),a=n(114);n(2),n(5);e.exports=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=i.get(e);if(t)return(t=a(t))?o.getNodeFromInstance(t):null;"function"==typeof e.render?r("44"):r("45",Object.keys(e))}},function(e,t,n){"use strict";var r=n(113);e.exports=r.renderSubtreeIntoContainer},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(50),o=a(n(232)),i=a(n(303));function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.createStore)(o.default,e,(0,r.applyMiddleware)(i.default))}},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(50),o=s(n(233)),i=s(n(300)),a=s(n(301)),u=s(n(302));function s(e){return e&&e.__esModule?e:{default:e}}var c=(0,r.combineReducers)({lemons:o.default,trucks:i.default,filters:a.default,session:u.default});t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(20),i=(r=o)&&r.__esModule?r:{default:r};var a={lat:.015336800594099032*Math.random()+37.9091569840984,lng:-.011887550354003906*Math.random()-122.298015933578,tree:"Lemon",location:"",note:"",finder:""},u={lemons:{},errors:[],focus:null,form:a,formOpen:!1,modalOpen:!1,forceUpdateLemon:null,modalUrl:null,imageModalOpen:!1};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments[1],n=(0,i.default)({},e),r=void 0,o=void 0,s=void 0,c=void 0,l=void 0;switch(t.type){case"RECEIVE_ALL_LEMONS":return n=(0,i.default)({},u,{modalOpen:e.modalOpen},{focus:e.focus},{formOpen:e.formOpen},{form:e.form},{lemons:t.lemons});case"RECEIVE_SINGLE_LEMON":return n=(0,i.default)(n,{lemons:(0,i.default)({},t.lemon),errors:null,forceUpdateLemon:null},{errors:[]},{forceUpdateLemon:t.lemon});case"EDIT_LEMON":return o=(0,i.default)({},e.lemons[t.lemonId]),n=(0,i.default)(n,{form:o,formOpen:!0});case"SET_FOCUS":return n=(0,i.default)(n,{focus:t.lemon});case"CLEAR_FOCUS":return n=(0,i.default)(n,{focus:null});case"UPDATE_LEMON_FORM":return r=(0,i.default)({},n.form,t.lemon),n=(0,i.default)(n,{form:r});case"CLEAR_LEMON_FORM":return n=(0,i.default)(n,{form:null},{form:(0,i.default)({},a)});case"TOGGLE_LEMON_FORM":return n=e.form.id?(0,i.default)(n,{formOpen:!e.formOpen},{form:null},{form:(0,i.default)({},a)}):(0,i.default)(n,{formOpen:!e.formOpen});case"TOGGLE_LEMON_MODAL":return n=(0,i.default)(n,{modalOpen:t.val});case"RECEIVE_LEMON_ERRORS":return n=(0,i.default)(n,{errors:null},{errors:t.errors});case"REMOVE_LEMON":return s=(0,i.default)({},Object.keys(e.lemons).reduce((function(n,r){return parseInt(t.id)!==parseInt(r)&&(n[r]=e.lemons[r]),n}),{})),c=e.focus&&parseInt(e.focus.id)===parseInt(t.id)?null:e.focus,l=parseInt(e.form.id)===parseInt(t.id)?a:e.form,n=(0,i.default)(n,{lemons:null,form:l,focus:c},{lemons:s});case"CLEAR_LEMON_ERRORS":return n=(0,i.default)(n,{errors:null},{errors:[]});case"SET_IMAGE_MODAL":return n=(0,i.default)(n,{modalUrl:t.url});case"OPEN_IMAGE_MODAL":return n=(0,i.default)(n,{imageModalOpen:!0});case"CLOSE_IMAGE_MODAL":return n=(0,i.default)(n,{imageModalOpen:!1});default:return n}}},function(e,t,n){var r=n(235),o=n(118),i=n(266),a=n(268),u=n(21),s=n(128),c=n(127);e.exports=function e(t,n,l,p,f){t!==n&&i(n,(function(i,s){if(f||(f=new r),u(i))a(t,n,s,l,e,p,f);else{var d=p?p(c(t,s),i,s+"",t,n,f):void 0;void 0===d&&(d=i),o(t,s,d)}}),s)}},function(e,t,n){var r=n(43),o=n(241),i=n(242),a=n(243),u=n(244),s=n(245);function c(e){var t=this.__data__=new r(e);this.size=t.size}c.prototype.clear=o,c.prototype.delete=i,c.prototype.get=a,c.prototype.has=u,c.prototype.set=s,e.exports=c},function(e,t){e.exports=function(){this.__data__=[],this.size=0}},function(e,t,n){var r=n(44),o=Array.prototype.splice;e.exports=function(e){var t=this.__data__,n=r(t,e);return!(n<0)&&(n==t.length-1?t.pop():o.call(t,n,1),--this.size,!0)}},function(e,t,n){var r=n(44);e.exports=function(e){var t=this.__data__,n=r(t,e);return n<0?void 0:t[n][1]}},function(e,t,n){var r=n(44);e.exports=function(e){return r(this.__data__,e)>-1}},function(e,t,n){var r=n(44);e.exports=function(e,t){var n=this.__data__,o=r(n,e);return o<0?(++this.size,n.push([e,t])):n[o][1]=t,this}},function(e,t,n){var r=n(43);e.exports=function(){this.__data__=new r,this.size=0}},function(e,t){e.exports=function(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}},function(e,t){e.exports=function(e){return this.__data__.get(e)}},function(e,t){e.exports=function(e){return this.__data__.has(e)}},function(e,t,n){var r=n(43),o=n(115),i=n(253);e.exports=function(e,t){var n=this.__data__;if(n instanceof r){var a=n.__data__;if(!o||a.length<199)return a.push([e,t]),this.size=++n.size,this;n=this.__data__=new i(a)}return n.set(e,t),this.size=n.size,this}},function(e,t,n){var r=n(73),o=n(249),i=n(21),a=n(251),u=/^\[object .+?Constructor\]$/,s=Function.prototype,c=Object.prototype,l=s.toString,p=c.hasOwnProperty,f=RegExp("^"+l.call(p).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=function(e){return!(!i(e)||o(e))&&(r(e)?f:u).test(a(e))}},function(e,t,n){var r=n(116),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,u=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,u),n=e[u];try{e[u]=void 0;var r=!0}catch(e){}var o=a.call(e);return r&&(t?e[u]=n:delete e[u]),o}},function(e,t){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},function(e,t,n){var r,o=n(250),i=(r=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||""))?"Symbol(src)_1."+r:"";e.exports=function(e){return!!i&&i in e}},function(e,t,n){var r=n(27)["__core-js_shared__"];e.exports=r},function(e,t){var n=Function.prototype.toString;e.exports=function(e){if(null!=e){try{return n.call(e)}catch(e){}try{return e+""}catch(e){}}return""}},function(e,t){e.exports=function(e,t){return null==e?void 0:e[t]}},function(e,t,n){var r=n(254),o=n(261),i=n(263),a=n(264),u=n(265);function s(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}s.prototype.clear=r,s.prototype.delete=o,s.prototype.get=i,s.prototype.has=a,s.prototype.set=u,e.exports=s},function(e,t,n){var r=n(255),o=n(43),i=n(115);e.exports=function(){this.size=0,this.__data__={hash:new r,map:new(i||o),string:new r}}},function(e,t,n){var r=n(256),o=n(257),i=n(258),a=n(259),u=n(260);function s(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}s.prototype.clear=r,s.prototype.delete=o,s.prototype.get=i,s.prototype.has=a,s.prototype.set=u,e.exports=s},function(e,t,n){var r=n(47);e.exports=function(){this.__data__=r?r(null):{},this.size=0}},function(e,t){e.exports=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}},function(e,t,n){var r=n(47),o=Object.prototype.hasOwnProperty;e.exports=function(e){var t=this.__data__;if(r){var n=t[e];return"__lodash_hash_undefined__"===n?void 0:n}return o.call(t,e)?t[e]:void 0}},function(e,t,n){var r=n(47),o=Object.prototype.hasOwnProperty;e.exports=function(e){var t=this.__data__;return r?void 0!==t[e]:o.call(t,e)}},function(e,t,n){var r=n(47);e.exports=function(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=r&&void 0===t?"__lodash_hash_undefined__":t,this}},function(e,t,n){var r=n(48);e.exports=function(e){var t=r(this,e).delete(e);return this.size-=t?1:0,t}},function(e,t){e.exports=function(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}},function(e,t,n){var r=n(48);e.exports=function(e){return r(this,e).get(e)}},function(e,t,n){var r=n(48);e.exports=function(e){return r(this,e).has(e)}},function(e,t,n){var r=n(48);e.exports=function(e,t){var n=r(this,e),o=n.size;return n.set(e,t),this.size+=n.size==o?0:1,this}},function(e,t,n){var r=n(267)();e.exports=r},function(e,t){e.exports=function(e){return function(t,n,r){for(var o=-1,i=Object(t),a=r(t),u=a.length;u--;){var s=a[e?u:++o];if(!1===n(i[s],s,i))break}return t}}},function(e,t,n){var r=n(118),o=n(269),i=n(270),a=n(273),u=n(274),s=n(122),c=n(123),l=n(278),p=n(125),f=n(73),d=n(21),h=n(280),m=n(126),v=n(127),y=n(284);e.exports=function(e,t,n,g,b,_,E){var C=v(e,n),w=v(t,n),O=E.get(w);if(O)r(e,n,O);else{var x=_?_(C,w,n+"",e,t,E):void 0,P=void 0===x;if(P){var k=c(w),M=!k&&p(w),S=!k&&!M&&m(w);x=w,k||M||S?c(C)?x=C:l(C)?x=a(C):M?(P=!1,x=o(w,!0)):S?(P=!1,x=i(w,!0)):x=[]:h(w)||s(w)?(x=C,s(C)?x=y(C):d(C)&&!f(C)||(x=u(w))):P=!1}P&&(E.set(w,x),b(x,w,g,_,E),E.delete(w)),r(e,n,x)}}},function(e,t,n){(function(e){var r=n(27),o=t&&!t.nodeType&&t,i=o&&"object"==typeof e&&e&&!e.nodeType&&e,a=i&&i.exports===o?r.Buffer:void 0,u=a?a.allocUnsafe:void 0;e.exports=function(e,t){if(t)return e.slice();var n=e.length,r=u?u(n):new e.constructor(n);return e.copy(r),r}}).call(this,n(75)(e))},function(e,t,n){var r=n(271);e.exports=function(e,t){var n=t?r(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.length)}},function(e,t,n){var r=n(272);e.exports=function(e){var t=new e.constructor(e.byteLength);return new r(t).set(new r(e)),t}},function(e,t,n){var r=n(27).Uint8Array;e.exports=r},function(e,t){e.exports=function(e,t){var n=-1,r=e.length;for(t||(t=Array(r));++n<r;)t[n]=e[n];return t}},function(e,t,n){var r=n(275),o=n(120),i=n(121);e.exports=function(e){return"function"!=typeof e.constructor||i(e)?{}:r(o(e))}},function(e,t,n){var r=n(21),o=Object.create,i=function(){function e(){}return function(t){if(!r(t))return{};if(o)return o(t);e.prototype=t;var n=new e;return e.prototype=void 0,n}}();e.exports=i},function(e,t){e.exports=function(e,t){return function(n){return e(t(n))}}},function(e,t,n){var r=n(46),o=n(35);e.exports=function(e){return o(e)&&"[object Arguments]"==r(e)}},function(e,t,n){var r=n(76),o=n(35);e.exports=function(e){return o(e)&&r(e)}},function(e,t){e.exports=function(){return!1}},function(e,t,n){var r=n(46),o=n(120),i=n(35),a=Function.prototype,u=Object.prototype,s=a.toString,c=u.hasOwnProperty,l=s.call(Object);e.exports=function(e){if(!i(e)||"[object Object]"!=r(e))return!1;var t=o(e);if(null===t)return!0;var n=c.call(t,"constructor")&&t.constructor;return"function"==typeof n&&n instanceof n&&s.call(n)==l}},function(e,t,n){var r=n(46),o=n(124),i=n(35),a={};a["[object Float32Array]"]=a["[object Float64Array]"]=a["[object Int8Array]"]=a["[object Int16Array]"]=a["[object Int32Array]"]=a["[object Uint8Array]"]=a["[object Uint8ClampedArray]"]=a["[object Uint16Array]"]=a["[object Uint32Array]"]=!0,a["[object Arguments]"]=a["[object Array]"]=a["[object ArrayBuffer]"]=a["[object Boolean]"]=a["[object DataView]"]=a["[object Date]"]=a["[object Error]"]=a["[object Function]"]=a["[object Map]"]=a["[object Number]"]=a["[object Object]"]=a["[object RegExp]"]=a["[object Set]"]=a["[object String]"]=a["[object WeakMap]"]=!1,e.exports=function(e){return i(e)&&o(e.length)&&!!a[r(e)]}},function(e,t){e.exports=function(e){return function(t){return e(t)}}},function(e,t,n){(function(e){var r=n(117),o=t&&!t.nodeType&&t,i=o&&"object"==typeof e&&e&&!e.nodeType&&e,a=i&&i.exports===o&&r.process,u=function(){try{var e=i&&i.require&&i.require("util").types;return e||a&&a.binding&&a.binding("util")}catch(e){}}();e.exports=u}).call(this,n(75)(e))},function(e,t,n){var r=n(285),o=n(128);e.exports=function(e){return r(e,o(e))}},function(e,t,n){var r=n(286),o=n(74);e.exports=function(e,t,n,i){var a=!n;n||(n={});for(var u=-1,s=t.length;++u<s;){var c=t[u],l=i?i(n[c],e[c],c,n,e):void 0;void 0===l&&(l=e[c]),a?o(n,c,l):r(n,c,l)}return n}},function(e,t,n){var r=n(74),o=n(45),i=Object.prototype.hasOwnProperty;e.exports=function(e,t,n){var a=e[t];i.call(e,t)&&o(a,n)&&(void 0!==n||t in e)||r(e,t,n)}},function(e,t,n){var r=n(288),o=n(122),i=n(123),a=n(125),u=n(129),s=n(126),c=Object.prototype.hasOwnProperty;e.exports=function(e,t){var n=i(e),l=!n&&o(e),p=!n&&!l&&a(e),f=!n&&!l&&!p&&s(e),d=n||l||p||f,h=d?r(e.length,String):[],m=h.length;for(var v in e)!t&&!c.call(e,v)||d&&("length"==v||p&&("offset"==v||"parent"==v)||f&&("buffer"==v||"byteLength"==v||"byteOffset"==v)||u(v,m))||h.push(v);return h}},function(e,t){e.exports=function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}},function(e,t,n){var r=n(21),o=n(121),i=n(290),a=Object.prototype.hasOwnProperty;e.exports=function(e){if(!r(e))return i(e);var t=o(e),n=[];for(var u in e)("constructor"!=u||!t&&a.call(e,u))&&n.push(u);return n}},function(e,t){e.exports=function(e){var t=[];if(null!=e)for(var n in Object(e))t.push(n);return t}},function(e,t,n){var r=n(292),o=n(299);e.exports=function(e){return r((function(t,n){var r=-1,i=n.length,a=i>1?n[i-1]:void 0,u=i>2?n[2]:void 0;for(a=e.length>3&&"function"==typeof a?(i--,a):void 0,u&&o(n[0],n[1],u)&&(a=i<3?void 0:a,i=1),t=Object(t);++r<i;){var s=n[r];s&&e(t,s,r,a)}return t}))}},function(e,t,n){var r=n(130),o=n(293),i=n(295);e.exports=function(e,t){return i(o(e,t,r),e+"")}},function(e,t,n){var r=n(294),o=Math.max;e.exports=function(e,t,n){return t=o(void 0===t?e.length-1:t,0),function(){for(var i=arguments,a=-1,u=o(i.length-t,0),s=Array(u);++a<u;)s[a]=i[t+a];a=-1;for(var c=Array(t+1);++a<t;)c[a]=i[a];return c[t]=n(s),r(e,this,c)}}},function(e,t){e.exports=function(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}},function(e,t,n){var r=n(296),o=n(298)(r);e.exports=o},function(e,t,n){var r=n(297),o=n(119),i=n(130),a=o?function(e,t){return o(e,"toString",{configurable:!0,enumerable:!1,value:r(t),writable:!0})}:i;e.exports=a},function(e,t){e.exports=function(e){return function(){return e}}},function(e,t){var n=Date.now;e.exports=function(e){var t=0,r=0;return function(){var o=n(),i=16-(o-r);if(r=o,i>0){if(++t>=800)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}},function(e,t,n){var r=n(45),o=n(76),i=n(129),a=n(21);e.exports=function(e,t,n){if(!a(n))return!1;var u=typeof t;return!!("number"==u?o(n)&&i(t,n.length):"string"==u&&t in n)&&r(n[t],e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(20),i=(r=o)&&r.__esModule?r:{default:r};var a={trucks:{},errors:[],focus:null};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments[1],n=(0,i.default)({},e);switch(t.type){case"RECEIVE_ALL_TRUCKS":return n=(0,i.default)({},a,{focus:e.focus},{trucks:t.trucks});case"RECEIVE_SINGLE_TRUCK":return n=(0,i.default)(n,{trucks:t.trucks,errors:null},{errors:[]});case"SET_FOCUS":return n=(0,i.default)(n,{focus:t.truck});case"CLEAR_FOCUS":return n=(0,i.default)(n,{focus:null});case"RECEIVE_TRUCK_ERRORS":return n=(0,i.default)(n,{errors:t.errors});case"CLEAR_TRUCK_ERRORS":return n=(0,i.default)(n,{errors:null},{errors:[]});default:return n}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(20),i=(r=o)&&r.__esModule?r:{default:r};function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u={bounds:{},food:"",hours:"",type:"",days:[]};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments[1],n=(0,i.default)({},e);switch(t.type){case"UPDATE_FILTER_STORE":return n=(0,i.default)(n,a({},t.filter,t.value));default:return n}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(20),i=(r=o)&&r.__esModule?r:{default:r};var a={currentUser:null,errors:[]};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments[1],n=(0,i.default)({},e);switch(t.type){case"RECEIVE_CURRENT_USER":return n=(0,i.default)(a,{currentUser:t.user});default:return n}}},function(e,t,n){"use strict";function r(e){return function(t){var n=t.dispatch,r=t.getState;return function(t){return function(o){return"function"==typeof o?o(n,r,e):t(o)}}}}n.r(t);var o=r();o.withExtraArgument=r,t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(1)),o=n(11),i=a(n(306));function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.store;return r.default.createElement(o.Provider,{store:t},r.default.createElement(i.default,null))}},function(e,t,n){"use strict";var r=n(87);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,i,a){if(a!==r){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return n.PropTypes=n,n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n(1)),o=l(n(307)),i=l(n(308)),a=l(n(331)),u=l(n(332)),s=l(n(334)),c=l(n(336));function l(e){return e&&e.__esModule?e:{default:e}}t.default=function(){return r.default.createElement("div",{id:"page"},r.default.createElement(s.default,null),r.default.createElement(c.default,null),r.default.createElement(u.default,null),r.default.createElement(a.default,null),r.default.createElement("div",{id:"app"},r.default.createElement(o.default,null),r.default.createElement(i.default,null)))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(1),i=(r=o)&&r.__esModule?r:{default:r};t.default=function(){return i.default.createElement("div",{id:"topbar-container"},i.default.createElement("div",{id:"topbar-title",className:"title"},"Lemon Party"))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(11),i=n(309),a=(r=i)&&r.__esModule?r:{default:r};t.default=(0,o.connect)((function(e){return{formOpen:e.lemons.formOpen,focus:e.lemons.focus}}),(function(e){return{}}))(a.default)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=l(n(310)),i=l(n(321)),a=l(n(325)),u=l(n(327)),s=l(n(329)),c=l(n(1));function l(e){return e&&e.__esModule?e:{default:e}}var p=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){return c.default.createElement("div",{id:"app-body"},c.default.createElement(o.default,null),c.default.createElement("div",{id:"lemon-data-area"},c.default.createElement(s.default,null),c.default.createElement("div",{id:"lemon-show-area"},!this.props.focus&&!this.props.formOpen&&c.default.createElement(i.default,null)),this.props.focus&&!this.props.formOpen&&c.default.createElement(u.default,null),this.props.formOpen&&c.default.createElement(a.default,null)))}}]),t}(c.default.Component);t.default=p},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(11),i=n(311),a=(r=i)&&r.__esModule?r:{default:r},u=c(n(318)),s=c(n(16));function c(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}t.default=(0,o.connect)((function(e){return{lemons:e.lemons.lemons,focus:e.lemons.focus,formOpen:e.lemons.formOpen,form:e.lemons.form,forceUpdateLemon:e.lemons.forceUpdateLemon}}),(function(e){return{updateLemonFilter:function(t,n){return e(u.updateLemonFilter(t,n))},fetchLemons:function(t){return e(s.fetchLemons(t))},setFocus:function(t){return e(s.setFocus(t))},updateLemonForm:function(t){return e(s.updateLemonForm(t))}}}))(a.default)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=s(n(1)),i=n(340),a=s(n(317)),u=s(n(20));function s(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.addBoundsListener=n.addBoundsListener.bind(n),n.addEmptyClickListener=n.addEmptyClickListener.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this.map=new google.maps.Map(this.mapNode,{center:{lat:37.916775,lng:-122.302917},zoom:15}),this.LemonMarkerManager=new a.default(this.map,this.props.setFocus),this.LemonMarkerManager.updateMarkers(this.props.lemons,this.props.focus),this.mapNode.classList.add("fade-in"),this.addBoundsListener(),this.addEmptyClickListener()}},{key:"addBoundsListener",value:function(){var e=this;google.maps.event.addListener(this.map,"idle",(function(){var t=e.map.getBounds().toJSON(),n=t.north,r=t.south,o={northEast:{lat:n,lng:t.east},southWest:{lat:r,lng:t.west}};e.props.updateLemonFilter("bounds",o)}))}},{key:"addEmptyClickListener",value:function(){var e=this;google.maps.event.addListener(this.map,"click",(function(t){var n=void 0;if(e.props.formOpen){e.props.updateLemonForm({lat:t.latLng.lat(),lng:t.latLng.lng()});var r=c({},-1,(0,u.default)({},e.props.form,{tree:"FAKE",id:-1,lat:t.latLng.lat(),lng:t.latLng.lng(),edit:!!e.props.form.id}));n=(0,u.default)({},e.props.lemons,r)}else n=e.props.lemons;e.LemonMarkerManager.updateMarkers(n,e.props.focus)}))}},{key:"componentDidUpdate",value:function(){var e=void 0;if(this.props.formOpen){var t=c({},-1,(0,u.default)({},this.props.form,{tree:"FAKE",id:-1}));e=(0,u.default)({},this.props.lemons,t)}else e=this.props.lemons;this.LemonMarkerManager.updateMarkers(e,this.props.focus,this.props.forceUpdateLemon)}},{key:"render",value:function(){var e=this;return o.default.createElement("div",{id:"map-container-container"},o.default.createElement("div",{id:"map-container",className:"to-fade-in-slower",ref:function(t){return e.mapNode=t}}))}}]),t}(o.default.Component);t.default=(0,i.withRouter)(l)},function(e,t,n){"use strict";var r=n(313),o=n(6);function i(e,t){return t.encode?t.strict?r(e):encodeURIComponent(e):e}t.extract=function(e){return e.split("?")[1]||""},t.parse=function(e,t){var n=function(e){var t;switch(e.arrayFormat){case"index":return function(e,n,r){t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===r[e]&&(r[e]={}),r[e][t[1]]=n):r[e]=n};case"bracket":return function(e,n,r){t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==r[e]?r[e]=[].concat(r[e],n):r[e]=[n]:r[e]=n};default:return function(e,t,n){void 0!==n[e]?n[e]=[].concat(n[e],t):n[e]=t}}}(t=o({arrayFormat:"none"},t)),r=Object.create(null);return"string"!=typeof e?r:(e=e.trim().replace(/^(\?|#|&)/,""))?(e.split("&").forEach((function(e){var t=e.replace(/\+/g," ").split("="),o=t.shift(),i=t.length>0?t.join("="):void 0;i=void 0===i?null:decodeURIComponent(i),n(decodeURIComponent(o),i,r)})),Object.keys(r).sort().reduce((function(e,t){var n=r[t];return Boolean(n)&&"object"==typeof n&&!Array.isArray(n)?e[t]=function e(t){return Array.isArray(t)?t.sort():"object"==typeof t?e(Object.keys(t)).sort((function(e,t){return Number(e)-Number(t)})).map((function(e){return t[e]})):t}(n):e[t]=n,e}),Object.create(null))):r},t.stringify=function(e,t){var n=function(e){switch(e.arrayFormat){case"index":return function(t,n,r){return null===n?[i(t,e),"[",r,"]"].join(""):[i(t,e),"[",i(r,e),"]=",i(n,e)].join("")};case"bracket":return function(t,n){return null===n?i(t,e):[i(t,e),"[]=",i(n,e)].join("")};default:return function(t,n){return null===n?i(t,e):[i(t,e),"=",i(n,e)].join("")}}}(t=o({encode:!0,strict:!0,arrayFormat:"none"},t));return e?Object.keys(e).sort().map((function(r){var o=e[r];if(void 0===o)return"";if(null===o)return i(r,t);if(Array.isArray(o)){var a=[];return o.slice().forEach((function(e){void 0!==e&&a.push(n(r,e,a.length))})),a.join("&")}return i(r,t)+"="+i(o,t)})).filter((function(e){return e.length>0})).join("&"):""}},function(e,t,n){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()}))}},function(e,t,n){"use strict";t.__esModule=!0;t.loopAsync=function(e,t,n){var r=0,o=!1,i=!1,a=!1,u=void 0,s=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];o=!0,i?u=t:n.apply(void 0,t)};!function c(){if(!o&&(a=!0,!i)){for(i=!0;!o&&r<e&&a;)a=!1,t(r++,c,s);i=!1,o?n.apply(void 0,u):r>=e&&a&&(o=!0,n())}}()}},function(e,t,n){"use strict";t.__esModule=!0,t.replaceLocation=t.pushLocation=t.getCurrentLocation=t.go=t.getUserConfirmation=void 0;var r=n(80);Object.defineProperty(t,"getUserConfirmation",{enumerable:!0,get:function(){return r.getUserConfirmation}}),Object.defineProperty(t,"go",{enumerable:!0,get:function(){return r.go}});var o=n(28),i=n(18);t.getCurrentLocation=function(){return(0,o.createLocation)(window.location)},t.pushLocation=function(e){return window.location.href=(0,i.createPath)(e),!1},t.replaceLocation=function(e){return window.location.replace((0,i.createPath)(e)),!1}},function(e,t,n){"use strict";t.__esModule=!0,t.replaceLocation=t.pushLocation=t.startListener=t.getCurrentLocation=t.go=t.getUserConfirmation=void 0;var r=n(80);Object.defineProperty(t,"getUserConfirmation",{enumerable:!0,get:function(){return r.getUserConfirmation}}),Object.defineProperty(t,"go",{enumerable:!0,get:function(){return r.go}});var o,i=n(17),a=((o=i)&&o.__esModule,n(28)),u=n(49),s=n(131),c=n(18);var l=function(){var e=window.location.href,t=e.indexOf("#");return-1===t?"":e.substring(t+1)},p=function(e){var t=window.location.href.indexOf("#");window.location.replace(window.location.href.slice(0,t>=0?t:0)+"#"+e)},f=t.getCurrentLocation=function(e,t){var n=e.decodePath(l()),r=(0,c.getQueryStringValueFromPath)(n,t),o=void 0;r&&(n=(0,c.stripQueryStringValueFromPath)(n,t),o=(0,s.readState)(r));var i=(0,c.parsePath)(n);return i.state=o,(0,a.createLocation)(i,void 0,r)},d=void 0,h=(t.startListener=function(e,t,n){var r=function(){var r=l(),o=t.encodePath(r);if(r!==o)p(o);else{var i=f(t,n);if(d&&i.key&&d.key===i.key)return;d=i,e(i)}},o=l(),i=t.encodePath(o);return o!==i&&p(i),(0,u.addEventListener)(window,"hashchange",r),function(){return(0,u.removeEventListener)(window,"hashchange",r)}},function(e,t,n,r){var o=e.state,i=e.key,a=t.encodePath((0,c.createPath)(e));void 0!==o&&(a=(0,c.addQueryStringValueToPath)(a,n,i),(0,s.saveState)(i,o)),d=e,r(a)});t.pushLocation=function(e,t,n){return h(e,t,n,(function(e){l()!==e&&function(e){window.location.hash=e}(e)}))},t.replaceLocation=function(e,t,n){return h(e,t,n,(function(e){l()!==e&&p(e)}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var o=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.map=t,this.markers=[],this.markerClick=n,this.removeOldMarkers=this.removeOldMarkers.bind(this),this.removeMarker=this.removeMarker.bind(this),this.stopAllBounces=this.stopAllBounces.bind(this),this.addNewMarkers=this.addNewMarkers.bind(this),this.createMarkerFromLemon=this.createMarkerFromLemon.bind(this),this.bounce=this.bounce.bind(this)}return r(e,[{key:"updateMarkers",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=Object.keys(e).map((function(e){return parseInt(e)}));if(r.includes(-1)&&this.removeNewMarker(e),n){var o=n[Object.keys(n)[0]];this.markers.filter((function(e){return e.lemonId===parseInt(o.id)})).forEach((function(e){var t=new google.maps.LatLng(o.lat,o.lng);e.setPosition(t)}))}this.addNewMarkers(r,e,t),this.removeOldMarkers(r),!r.includes(-1)&&t?(this.stopAllBounces(t.id),this.bounce(t)):this.stopAllBounces()}},{key:"removeNewMarker",value:function(e){var t=this;this.markers.filter((function(e){return-1===e.lemonId})).forEach((function(n){e[-1].lat!==n.position.lat()&&e[-1].lng!==n.position.lng()&&t.removeMarker(n)}))}},{key:"removeOldMarkers",value:function(e){var t=this;this.markers.filter((function(t){return!e.includes(t.lemonId)})).forEach((function(e){return t.removeMarker(e)}))}},{key:"removeMarker",value:function(e){var t=this.markers.indexOf(e);this.markers[t].setMap(null),this.markers.splice(t,1)}},{key:"addNewMarkers",value:function(e,t,n){var r=this,o=this.markers.map((function(e){return e.lemonId}));e.forEach((function(e){o.includes(e)||r.createMarkerFromLemon(t[e])}))}},{key:"createMarkerFromLemon",value:function(e){var t=this,n=void 0;"Lemon"===e.tree?n="https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,w_25/v1592092413/Lemons/hiclipart.com_2.png":"Lime"===e.tree?n="https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_32/v1592092399/Lemons/hiclipart.com_6.png":"Orange"===e.tree?n="https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_32/v1592092400/Lemons/hiclipart.com_4.png":"FAKE"===e.tree?n="https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,w_30/v1595193266/Lemons/newwhiteback.png":"REAL"===e.tree&&(n="https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_41/v1595824487/Lemons/Screen_Shot_2020-07-26_at_9.29.31_PM.png");var r=new google.maps.LatLng(e.lat,e.lng),o=new google.maps.Marker({position:r,map:this.map,lemonId:e.id,icon:n});o.setAnimation(null),-1!==o.lemonId&&o.addListener("click",(function(){t.markerClick(e)})),this.markers.push(o)}},{key:"bounce",value:function(e){var t=this.markers.find((function(t){return e.id===t.lemonId}));t&&t.setAnimation(google.maps.Animation.BOUNCE)}},{key:"stopAllBounces",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.markers;e&&(t=t.filter((function(t){return t.lemonId!==e}))),t.forEach((function(e){null!==e.getAnimation()&&e.setAnimation(null)}))}}]),e}();t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updateFilterStore=t.updateLemonFilter=t.updateFilter=void 0;var r=i(n(132)),o=i(n(16));function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}t.updateFilter=function(e,t){return function(n,o){return n(a(e,t)),r.fetchTrucks(o().filters)(n)}},t.updateLemonFilter=function(e,t){return function(n,r){return n(a(e,t)),o.fetchLemons(r().filters)(n)}};var a=t.updateFilterStore=function(e,t){return{type:"UPDATE_FILTER_STORE",filter:e,value:t}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.getTrucksInBounds=function(e){return $.ajax({url:"api/trucks",method:"GET",data:{filters:e}})},t.postTruck=function(e){return $.ajax({url:"api/trucks",method:"POST",data:{truck:e}})},t.seedTrucks=function(e){return $.ajax({url:"api/trucks/seed",method:"POST",data:{trucks:e}})},t.getTruckData=function(){return $.ajax({url:"https://data.sfgov.org/resource/6a9r-agq8.json",method:"GET"})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.getLemonsInBounds=function(e){return $.ajax({url:"api/lemons",method:"GET",data:{filters:e}})},t.postLemon=function(e){return $.ajax({url:"api/lemons",method:"POST",data:{lemon:e}})},t.patchLemon=function(e){return $.ajax({url:"api/lemons/"+e.id.toString(),method:"PATCH",data:{lemon:e}})},t.destroyLemon=function(e){return $.ajax({url:"api/lemons/"+e.toString(),method:"DELETE"})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(11),i=n(322),a=(r=i)&&r.__esModule?r:{default:r},u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(16));t.default=(0,o.connect)((function(e){return{lemons:e.lemons.lemons,focus:e.lemons.focus}}),(function(e){return{clearFocus:function(){return e(u.clearFocus())}}}))(a.default)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=a(n(1)),i=a(n(323));function a(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.renderLemons=n.renderLemons.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this.lemonIndexContainer.classList.add("fade-in")}},{key:"renderLemons",value:function(){var e=this,t=Object.keys(this.props.lemons).reverse();return 0===t.length?o.default.createElement("div",{className:"lemon"},"No lemon trees in this area. "):t.map((function(t){return o.default.createElement(i.default,{key:t,lemon:e.props.lemons[t]})}))}},{key:"render",value:function(){var e=this,t=this.renderLemons();return o.default.createElement("div",{id:"lemon-index-container",className:"to-fade-in",ref:function(t){return e.lemonIndexContainer=t}},o.default.createElement("div",{id:"lemon-index"},o.default.createElement("div",{id:"lemon-index-header-container"},o.default.createElement("header",{id:"lemon-index-header"},"Nearby Lemon Trees")),o.default.createElement("ul",{id:"lemon-index-list"},t)))}}]),t}(o.default.Component);t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(11),i=n(324),a=(r=i)&&r.__esModule?r:{default:r},u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(16));t.default=(0,o.connect)((function(e){return{currentUser:e.session.currentUser}}),(function(e){return{setFocus:function(t){return e(u.setFocus(t))},deleteLemon:function(t){return e(u.deleteLemon(t))},editLemon:function(t){return e(u.editLemon(t))}}}))(a.default)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(1),i=(r=o)&&r.__esModule?r:{default:r};t.default=function(e){var t=e.lemon,n=e.setFocus,r=e.editLemon,o=e.deleteLemon,a=!!e.currentUser,u=void 0;return"Lemon"===t.tree?u="https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,w_25/v1592092413/Lemons/hiclipart.com_2.png":"Lime"===t.tree?u="https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_32/v1592092399/Lemons/hiclipart.com_6.png":"Orange"===t.tree?u="https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_32/v1592092400/Lemons/hiclipart.com_4.png":"FAKE"===t.tree?u="https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,w_30/v1595193266/Lemons/newwhiteback.png":"REAL"===t.tree&&(u="https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_41/v1595824487/Lemons/Screen_Shot_2020-07-26_at_9.29.31_PM.png"),i.default.createElement("div",{className:"lemon pale-"+t.tree,onClick:function(){return n(t)}},i.default.createElement("div",{className:"lemon-top"},i.default.createElement("div",{className:"lemon-icon"}," ",i.default.createElement("img",{src:u})," "),i.default.createElement("div",{className:"lemon-location"}," ",t.location," "),i.default.createElement("div",{className:"lemon-finder"}," From: ",t.finder," ")),(sessionStorage.getItem("robertslemonpartykey")===t.token||a)&&i.default.createElement("div",{className:"lemon-actions less-pale-"+t.tree},i.default.createElement("div",{onClick:function(){return r(t.id)},className:"mr-10"},"Edit"),i.default.createElement("div",{onClick:function(){confirm("Really delete this tree?")&&o(t.id)}},"Delete")))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(11),i=n(326),a=(r=i)&&r.__esModule?r:{default:r},u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(16));t.default=(0,o.connect)((function(e){return{formLemon:e.lemons.form,formOpen:e.lemons.formOpen,errors:e.lemons.errors,currentUser:e.session.currentUser}}),(function(e){return{updateLemonForm:function(t){return e(u.updateLemonForm(t))},clearLemonForm:function(){return e(u.clearLemonForm())},toggleLemonForm:function(){return e(u.toggleLemonForm())},updateLemon:function(t){return e(u.updateLemon(t))},createLemon:function(t){return e(u.createLemon(t))}}}))(a.default)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=a(n(1)),i=a(n(20));function a(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.submitForm=n.submitForm.bind(n),n.updateFormLemon=n.updateFormLemon.bind(n),n.openWidget=n.openWidget.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"openWidget",value:function(){var e=this;cloudinary.openUploadWidget(window.CLOUDINARY_OPTIONS,(function(t,n){null===t&&e.props.updateLemonForm({url:n[0].url})}))}},{key:"submitForm",value:function(){this.props.formLemon.id?this.props.updateLemon(this.props.formLemon):this.props.createLemon((0,i.default)(this.props.formLemon,{token:sessionStorage.getItem("robertslemonpartykey")}))}},{key:"updateFormLemon",value:function(e){var t,n,r;this.props.updateLemonForm((t={},n=e.currentTarget.name,r=e.currentTarget.value,n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t))}},{key:"render",value:function(){var e=this.props.formLemon,t=!!this.props.currentUser;return this.props.formOpen?o.default.createElement("div",{id:"lemon-form-container"},o.default.createElement("div",{id:"lemon-form-with-heading"},o.default.createElement("div",{id:"lemon-form"},o.default.createElement("div",{id:"lemon-form-topbar"},o.default.createElement("div",{id:"close-lemon-form",onClick:this.props.toggleLemonForm},"Close"),o.default.createElement("div",{id:"lemon-form-heading"},o.default.createElement("div",{id:"lemon-form-heading-text",className:"slowbounce"},"Click the map to set your tree!"))),o.default.createElement("div",{id:"lemon-form-area-container"},o.default.createElement("div",{id:"lemon-form-area"},o.default.createElement("div",{id:"latlng",className:"hide"},o.default.createElement("div",{className:"lemon-form-label"},"Position:"),o.default.createElement("div",{id:"latlng-inputs-container"},o.default.createElement("div",{id:"latlng-inputs"},o.default.createElement("input",{type:"text",id:"latlng-input1",className:"latlng-input",name:"lat",value:e.lat,disabled:!0}),o.default.createElement("input",{type:"text",id:"latlng-input2",className:"latlng-input",name:"lng",value:e.lng,disabled:!0})),o.default.createElement("div",{id:"latlng-label2"},"(click the map to change position!)"))),e&&e.id&&o.default.createElement("div",{id:"edit-bar"},o.default.createElement("div",null,"Editing tree at "+e.location),o.default.createElement("div",{id:"reset-form",onClick:this.props.clearLemonForm},"Reset")),o.default.createElement("div",{id:"tree-desc"},o.default.createElement("div",{id:"tree-container"},o.default.createElement("div",{id:"tree-label",className:"lemon-form-label"},"Tree:"),o.default.createElement("select",{id:"tree-select",name:"tree",value:e.tree,onChange:this.updateFormLemon},o.default.createElement("option",{value:"Lemon"},"Lemon"),o.default.createElement("option",{value:"Lime"},"Lime"),o.default.createElement("option",{value:"Orange"},"Orange"),t&&o.default.createElement("option",{value:"REAL"},"REAL"))),o.default.createElement("div",{id:"desc-label"},o.default.createElement("div",{className:"lemon-form-label"},"Description:"),o.default.createElement("div",{id:"desc-input"},o.default.createElement("input",{type:"text",id:"location",name:"location",placeholder:"Description",value:e.location,onChange:this.updateFormLemon})))),o.default.createElement("div",{className:"input-area flex column"},o.default.createElement("textarea",{name:"note",placeholder:"Say something nice about Robert",value:e.note,onChange:this.updateFormLemon}),this.props.errors.length>0&&o.default.createElement("div",{id:"lemon-errors"},"Error: "+this.props.errors.join(", "))),o.default.createElement("div",{className:"input-area flex align-center"},o.default.createElement("div",{className:"flex column start m-15 flex-1"},o.default.createElement("div",{className:"lemon-form-label"},"Your Name:"),o.default.createElement("div",{className:"flex"},o.default.createElement("input",{type:"text",name:"finder",placeholder:"Your name",value:e.finder,onChange:this.updateFormLemon}))),o.default.createElement("div",{id:"lemon-form-submit",onClick:this.submitForm},"Submit")))),t&&o.default.createElement("div",{id:"image-upload-area"},o.default.createElement("div",{id:"image-upload",onClick:this.openWidget},"Upload Image"),o.default.createElement("div",{id:"edit-image",style:{backgroundImage:"url("+e.url+")"}}))))):null}}]),t}(o.default.Component);t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(11),i=n(328),a=(r=i)&&r.__esModule?r:{default:r},u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(16));t.default=(0,o.connect)((function(e){return{lemon:e.lemons.focus}}),(function(e){return{clearFocus:function(t){return e(u.clearFocus())},setImageModal:function(t){return e(u.setImageModal(t))},openImageModal:function(){return e(u.openImageModal())}}}))(a.default)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(1),i=(r=o)&&r.__esModule?r:{default:r};var a={0:"Magnificent",1:"Stupendous",2:"Glorious",3:"Raggedy-ass",4:"Lovely",5:"Ravishing",6:"Plumpcious",7:"Wrathful",8:"Yummo",9:"Dangerous"};t.default=function(e){var t=e.lemon,n=e.clearFocus,r=e.setImageModal,o=e.openImageModal;if(t){var u=a[t.id.toString()[t.id.toString().length-1]];return"Lemon"===t.tree?"https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,w_25/v1592092413/Lemons/hiclipart.com_2.png":"Lime"===t.tree?"https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_32/v1592092399/Lemons/hiclipart.com_6.png":"Orange"===t.tree?"https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_32/v1592092400/Lemons/hiclipart.com_4.png":"FAKE"===t.tree?"https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,w_30/v1595193266/Lemons/newwhiteback.png":"REAL"===t.tree&&"https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_41/v1595824487/Lemons/Screen_Shot_2020-07-26_at_9.29.31_PM.png",i.default.createElement("div",{id:"lemon-focus"},i.default.createElement("div",{id:"lemon-focus-item"},i.default.createElement("div",{id:"lemon-focus-topbar"},i.default.createElement("div",{id:"lemon-focus-back",onClick:n},"Back"),i.default.createElement("div",{id:"lemon-focus-header",className:"fancy "+t.tree},"A "+u+" "+t.tree+" Tree")),i.default.createElement("div",{className:"fancy",id:"lemon-focus-lemon"},i.default.createElement("div",{id:"lemon-focus-inner"},i.default.createElement("div",{id:"lemon-focus-text"},i.default.createElement("div",{id:"lemon-focus-dearest"}," Dearest Robert, "),i.default.createElement("br",null),i.default.createElement("div",null,"I found you a ",u," ",t.tree," tree. I would describe it as follows:"),i.default.createElement("br",null),t.location,i.default.createElement("br",null),i.default.createElement("br",null),i.default.createElement("div",null,"Also,"),i.default.createElement("br",null),t.note,i.default.createElement("br",null),i.default.createElement("br",null),i.default.createElement("div",{id:"lemon-focus-bye"},i.default.createElement("div",{id:"lemon-focus-bye-inner"},i.default.createElement("div",null,"Love from,"),i.default.createElement("div",{id:"lemon-finder-focus"}," ",t.finder," "))),t.url&&i.default.createElement("div",{onClick:function(){r(t.url),o()},className:"focus-image",style:{backgroundImage:"url("+t.url+")"}}))))))}return null}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(11),i=n(330),a=(r=i)&&r.__esModule?r:{default:r},u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(16));t.default=(0,o.connect)((function(e){return{formOpen:e.lemons.formOpen}}),(function(e){return{toggleLemonForm:function(){return e(u.toggleLemonForm())}}}))(a.default)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(1),a=(r=i)&&r.__esModule?r:{default:r};var u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={sheen:!0},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidMount",value:function(){this.timeoutId=setTimeout(function(){this.setState({sheen:!1})}.bind(this),7500)}},{key:"componentWillUnmount",value:function(){this.timeoutId&&clearTimeout(this.timeoutId)}},{key:"render",value:function(){var e=this.props.formOpen?"hide":"",t=this.state.sheen?"sheen":"";return a.default.createElement("div",{className:"open-lemon-form-container "+e},a.default.createElement("div",{className:"open-lemon-form "+t,onClick:this.props.toggleLemonForm},"Add a Lemon Tree"))}}]),t}(a.default.Component);t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(1),i=(r=o)&&r.__esModule?r:{default:r};var a={0:"lemon-bg-3",1:"lemon-bg-3",2:"lemon-bg-3",3:"lemon-bg-3",4:"lemon-bg-3",5:"lemon-bg-6",6:"lemon-bg-8",7:"lemon-bg-8",8:"lemon-bg-8",9:"lemon-bg-8"};t.default=function(){return i.default.createElement("div",{id:"lemon-bg-changer",onClick:function(){var e;document.getElementById("root").className="",document.getElementById("root").classList.add((e=Date.now(),a[e.toString()[e.toString().length-1]]))}})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(11),i=n(333),a=(r=i)&&r.__esModule?r:{default:r},u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(16));t.default=(0,o.connect)((function(e){return{modalOpen:e.lemons.modalOpen}}),(function(e){return{toggleLemonModal:function(){return e(u.toggleLemonModal(!1))}}}))(a.default)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(1),a=(r=i)&&r.__esModule?r:{default:r};var u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={animate1:!1,animate2:!1},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidUpdate",value:function(){!this.state.animate1&&this.props.modalOpen?(this.timeoutId=setTimeout(function(){this.setState({animate1:!0})}.bind(this),250),this.timeoutId2=setTimeout(function(){this.setState({animate2:!0})}.bind(this),600)):!this.props.modalOpen&&this.state.animate1&&this.setState({animate1:!1,animate2:!1})}},{key:"componentWillUnmount",value:function(){this.timeoutId&&clearTimeout(this.timeoutId),this.timeoutId2&&clearTimeout(this.timeoutId2)}},{key:"render",value:function(){var e=this.props.modalOpen?"":"hide",t=this.state.animate1?"is-active":"",n=this.state.animate2?"is-active":"",r={backgroundImage:"url(https://res.cloudinary.com/dujcpxlhk/image/upload/v1595160381/Lemons/IMG_3145.jpg)"};return a.default.createElement("div",{className:e,id:"lemon-modal-container",onClick:this.props.toggleLemonModal},a.default.createElement("div",{id:"lemon-modal"},a.default.createElement("div",{id:"lemon-modal-images"},a.default.createElement("div",{className:"heart "+t}),a.default.createElement("div",{id:"modalimage",style:r}),a.default.createElement("div",{className:"heart "+n})),a.default.createElement("div",{id:"robertluvsya"},"Robert Luvs Ya!"),a.default.createElement("div",{id:"closebutton"},"Close")))}}]),t}(a.default.Component);t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(11),i=n(335),a=(r=i)&&r.__esModule?r:{default:r},u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(16));t.default=(0,o.connect)((function(e){return{url:e.lemons.modalUrl,imageModalOpen:e.lemons.imageModalOpen}}),(function(e){return{closeImageModal:function(){return e(u.closeImageModal())}}}))(a.default)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(1),a=(r=i)&&r.__esModule?r:{default:r};function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var c=function(e){function t(){return u(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"render",value:function(){var e=this.props.imageModalOpen?"":"hide";return a.default.createElement("div",{className:e,id:"image-modal-container",onClick:this.props.closeImageModal},a.default.createElement("img",{id:"image-modal-image",src:this.props.url}))}}]),t}(a.default.Component);t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(11),i=n(337),a=(r=i)&&r.__esModule?r:{default:r},u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(338));t.default=(0,o.connect)((function(e){return{currentUser:e.session.currentUser}}),(function(e){return{logIn:function(t){return e(u.logIn(t))},logOut:function(){return e(u.logOut())}}}))(a.default)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=i(n(1));i(n(20));function i(e){return e&&e.__esModule?e:{default:e}}var a=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={name:null,password:null},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){var e=this;if(this.props.currentUser)return o.default.createElement("div",{id:"logout",onClick:this.props.logOut});var t=void 0;return t=!!sessionStorage.getItem("robertslemonpartykey")&&(sessionStorage.getItem("robertslemonpartykey")===window.keyMatch||sessionStorage.getItem("robertslemonpartykey")===window.keyMatch2||sessionStorage.getItem("robertslemonpartykey")===window.keyMatch3||sessionStorage.getItem("robertslemonpartykey")===window.keyMatch4)&&!this.props.currentUser?"":"hide",o.default.createElement("div",{id:"user-form",className:t},o.default.createElement("input",{id:"user-name",name:"name",onChange:function(t){return e.setState({name:t.currentTarget.value})}}),o.default.createElement("input",{id:"user-password",name:"password",onChange:function(t){return e.setState({password:t.currentTarget.value})}}),o.default.createElement("div",{id:"user-submit",onClick:function(){return e.props.logIn(e.state)}},"Submit"))}}]),t}(o.default.Component);t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.receiveCurrentUser=t.logOut=t.logIn=void 0;var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(339));t.logIn=function(e){return function(t){return r.logIn(e).then((function(e){t(o(e))}))}},t.logOut=function(){return function(e){return r.logOut().then((function(){e(o(null))}))}};var o=t.receiveCurrentUser=function(e){return{type:"RECEIVE_CURRENT_USER",user:e}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.logIn=function(e){return $.ajax({method:"POST",url:"api/session",data:{user:e}})},t.logOut=function(){return $.ajax({method:"DELETE",url:"api/session"})}},function(e,t,n){"use strict";n.r(t),n.d(t,"Router",(function(){return ve})),n.d(t,"Link",(function(){return Ee})),n.d(t,"IndexLink",(function(){return we})),n.d(t,"withRouter",(function(){return ke})),n.d(t,"IndexRedirect",(function(){return Te})),n.d(t,"IndexRoute",(function(){return Re})),n.d(t,"Redirect",(function(){return Se})),n.d(t,"Route",(function(){return Ne})),n.d(t,"createRoutes",(function(){return N})),n.d(t,"RouterContext",(function(){return se})),n.d(t,"locationShape",(function(){return ge})),n.d(t,"routerShape",(function(){return ye})),n.d(t,"match",(function(){return We})),n.d(t,"useRouterHistory",(function(){return qe})),n.d(t,"formatPattern",(function(){return v})),n.d(t,"applyRouterMiddleware",(function(){return Ke})),n.d(t,"browserHistory",(function(){return Qe})),n.d(t,"hashHistory",(function(){return Je})),n.d(t,"createMemoryHistory",(function(){return Ve}));var r=n(3),o=n.n(r),i=n(1),a=n.n(i),u=n(8),s=n.n(u),c=n(0),l=n.n(c);n(17);function p(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var f=Object.create(null);function d(e){return f[e]||(f[e]=function(e){for(var t="",n=[],r=[],o=void 0,i=0,a=/:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)|\\\(|\\\)/g;o=a.exec(e);)o.index!==i&&(r.push(e.slice(i,o.index)),t+=p(e.slice(i,o.index))),o[1]?(t+="([^/]+)",n.push(o[1])):"**"===o[0]?(t+="(.*)",n.push("splat")):"*"===o[0]?(t+="(.*?)",n.push("splat")):"("===o[0]?t+="(?:":")"===o[0]?t+=")?":"\\("===o[0]?t+="\\(":"\\)"===o[0]&&(t+="\\)"),r.push(o[0]),i=a.lastIndex;return i!==e.length&&(r.push(e.slice(i,e.length)),t+=p(e.slice(i,e.length))),{pattern:e,regexpSource:t,paramNames:n,tokens:r}}(e)),f[e]}function h(e,t){"/"!==e.charAt(0)&&(e="/"+e);var n=d(e),r=n.regexpSource,o=n.paramNames,i=n.tokens;"/"!==e.charAt(e.length-1)&&(r+="/?"),"*"===i[i.length-1]&&(r+="$");var a=t.match(new RegExp("^"+r,"i"));if(null==a)return null;var u=a[0],s=t.substr(u.length);if(s){if("/"!==u.charAt(u.length-1))return null;s="/"+s}return{remainingPathname:s,paramNames:o,paramValues:a.slice(1).map((function(e){return e&&decodeURIComponent(e)}))}}function m(e){return d(e).paramNames}function v(e,t){t=t||{};for(var n=d(e).tokens,r=0,i="",a=0,u=[],s=void 0,c=void 0,l=0,p=n.length;l<p;++l)if("*"===(s=n[l])||"**"===s)null!=(c=Array.isArray(t.splat)?t.splat[a++]:t.splat)||r>0||o()(!1),null!=c&&(i+=encodeURI(c));else if("("===s)u[r]="",r+=1;else if(")"===s){var f=u.pop();(r-=1)?u[r-1]+=f:i+=f}else if("\\("===s)i+="(";else if("\\)"===s)i+=")";else if(":"===s.charAt(0))if(null!=(c=t[s.substring(1)])||r>0||o()(!1),null==c){if(r){u[r-1]="";for(var h=n.indexOf(s),m=n.slice(h,n.length),v=-1,y=0;y<m.length;y++)if(")"==m[y]){v=y;break}v>0||o()(!1),l=h+v-1}}else r?u[r-1]+=encodeURIComponent(c):i+=encodeURIComponent(c);else r?u[r-1]+=s:i+=s;return r<=0||o()(!1),i.replace(/\/+/g,"/")}var y=function(e,t){var n=e&&e.routes,r=t.routes,o=void 0,i=void 0,a=void 0;if(n){var u=!1;(o=n.filter((function(n){if(u)return!0;var o=-1===r.indexOf(n)||function(e,t,n){return!!e.path&&m(e.path).some((function(e){return t.params[e]!==n.params[e]}))}(n,e,t);return o&&(u=!0),o}))).reverse(),a=[],i=[],r.forEach((function(e){var t=-1===n.indexOf(e),r=-1!==o.indexOf(e);t||r?a.push(e):i.push(e)}))}else o=[],i=[],a=r;return{leaveRoutes:o,changeRoutes:i,enterRoutes:a}};function g(e,t,n){var r=0,o=!1,i=!1,a=!1,u=void 0;function s(){o=!0,i?u=[].concat(Array.prototype.slice.call(arguments)):n.apply(this,arguments)}!function c(){if(!o&&(a=!0,!i)){for(i=!0;!o&&r<e&&a;)a=!1,t.call(this,r++,c,s);i=!1,o?n.apply(this,u):r>=e&&a&&(o=!0,n())}}()}function b(e,t,n){var r=e.length,o=[];if(0===r)return n(null,o);var i=!1,a=0;e.forEach((function(e,u){t(e,u,(function(e,t){!function(e,t,u){i||(t?(i=!0,n(t)):(o[e]=u,(i=++a===r)&&n(null,o)))}(u,e,t)}))}))}var _=function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.hooks=[],this.add=function(e){return t.hooks.push(e)},this.remove=function(e){return t.hooks=t.hooks.filter((function(t){return t!==e}))},this.has=function(e){return-1!==t.hooks.indexOf(e)},this.clear=function(){return t.hooks=[]}};function E(){var e=new _,t=new _;function n(e,t,n,r){var o=e.length<n,i=function(){for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];if(e.apply(t,r),o){var a=r[r.length-1];a()}};return r.add(i),i}function r(e,t,n){if(e){var r=void 0;g(e,(function(e,n,i){t(e,o,(function(e){e||r?i(e,r):n()}))}),n)}else n();function o(e){r=e}}return{runEnterHooks:function(t,o,i){e.clear();var a=function(t){return t.reduce((function(t,r){return r.onEnter&&t.push(n(r.onEnter,r,3,e)),t}),[])}(t);return r(a.length,(function(t,n,r){a[t](o,n,(function(){e.has(a[t])&&(r.apply(void 0,arguments),e.remove(a[t]))}))}),i)},runChangeHooks:function(e,o,i,a){t.clear();var u=function(e){return e.reduce((function(e,r){return r.onChange&&e.push(n(r.onChange,r,4,t)),e}),[])}(e);return r(u.length,(function(e,n,r){u[e](o,i,n,(function(){t.has(u[e])&&(r.apply(void 0,arguments),t.remove(u[e]))}))}),a)},runLeaveHooks:function(e,t){for(var n=0,r=e.length;n<r;++n)e[n].onLeave&&e[n].onLeave.call(e[n],t)}}}var C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function w(e,t){return null==t?null==e:null==e||function e(t,n){if(t==n)return!0;if(null==t||null==n)return!1;if(Array.isArray(t))return Array.isArray(n)&&t.length===n.length&&t.every((function(t,r){return e(t,n[r])}));if("object"===(void 0===t?"undefined":C(t))){for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r))if(void 0===t[r]){if(void 0!==n[r])return!1}else{if(!Object.prototype.hasOwnProperty.call(n,r))return!1;if(!e(t[r],n[r]))return!1}return!0}return String(t)===String(n)}(e,t)}function O(e,t,n,r,o){var i=e.pathname,a=e.query;return null!=n&&("/"!==i.charAt(0)&&(i="/"+i),!!(function(e,t){return"/"!==t.charAt(0)&&(t="/"+t),"/"!==e.charAt(e.length-1)&&(e+="/"),"/"!==t.charAt(t.length-1)&&(t+="/"),t===e}(i,n.pathname)||!t&&function(e,t,n){for(var r=e,o=[],i=[],a=0,u=t.length;a<u;++a){var s=t[a].path||"";if("/"===s.charAt(0)&&(r=e,o=[],i=[]),null!==r&&s){var c=h(s,r);if(c?(r=c.remainingPathname,o=[].concat(o,c.paramNames),i=[].concat(i,c.paramValues)):r=null,""===r)return o.every((function(e,t){return String(i[t])===String(n[e])}))}}return!1}(i,r,o))&&w(a,n.query))}function x(e){return e&&"function"==typeof e.then}var P=function(e,t){b(e.routes,(function(t,n,r){!function(e,t,n){if(t.component||t.components)n(null,t.component||t.components);else{var r=t.getComponent||t.getComponents;if(r){var o=r.call(t,e,n);x(o)&&o.then((function(e){return n(null,e)}),n)}else n()}}(e,t,r)}),t)},k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function M(e){return null==e||a.a.isValidElement(e)}function S(e){return M(e)||Array.isArray(e)&&e.every(M)}function T(e){var t,n,r=e.type,o=(t=r.defaultProps,n=e.props,k({},t,n));if(o.children){var i=R(o.children,o);i.length&&(o.childRoutes=i),delete o.children}return o}function R(e,t){var n=[];return a.a.Children.forEach(e,(function(e){if(a.a.isValidElement(e))if(e.type.createRouteFromReactElement){var r=e.type.createRouteFromReactElement(e,t);r&&n.push(r)}else n.push(T(e))})),n}function N(e){return S(e)?e=R(e):e&&!Array.isArray(e)&&(e=[e]),e}var L=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function I(e,t,n,r,o){if(e.childRoutes)return[null,e.childRoutes];if(!e.getChildRoutes)return[];var i=!0,a=void 0,u={location:t,params:A(n,r)},s=e.getChildRoutes(u,(function(e,t){t=!e&&N(t),i?a=[e,t]:o(e,t)}));return x(s)&&s.then((function(e){return o(null,N(e))}),o),i=!1,a}function A(e,t){return function(e,t,n){return t.reduce((function(e,t,r){var o=n&&n[r];return Array.isArray(e[t])?e[t].push(o):e[t]=t in e?[e[t],o]:o,e}),e)}({},e,t)}function j(e,t,n,r,o,i){var a=e.path||"";if("/"===a.charAt(0)&&(n=t.pathname,r=[],o=[]),null!==n&&a){try{var u=h(a,n);u?(n=u.remainingPathname,r=[].concat(r,u.paramNames),o=[].concat(o,u.paramValues)):n=null}catch(e){i(e)}if(""===n){var s={routes:[e],params:A(r,o)};return void function e(t,n,r,o,i){if(t.indexRoute)i(null,t.indexRoute);else if(t.getIndexRoute){var a={location:n,params:A(r,o)},u=t.getIndexRoute(a,(function(e,t){i(e,!e&&N(t)[0])}));x(u)&&u.then((function(e){return i(null,N(e)[0])}),i)}else if(t.childRoutes||t.getChildRoutes){var s=function(t,a){if(t)i(t);else{var u=a.filter((function(e){return!e.path}));g(u.length,(function(t,i,a){e(u[t],n,r,o,(function(e,n){if(e||n){var r=[u[t]].concat(Array.isArray(n)?n:[n]);a(e,r)}else i()}))}),(function(e,t){i(null,t)}))}},c=I(t,n,r,o,s);c&&s.apply(void 0,c)}else i()}(e,t,r,o,(function(e,t){if(e)i(e);else{var n;if(Array.isArray(t))(n=s.routes).push.apply(n,t);else t&&s.routes.push(t);i(null,s)}}))}}if(null!=n||e.childRoutes){var c=function(a,u){a?i(a):u?D(u,t,(function(t,n){t?i(t):n?(n.routes.unshift(e),i(null,n)):i()}),n,r,o):i()},l=I(e,t,r,o,c);l&&c.apply(void 0,l)}else i()}function D(e,t,n,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[];void 0===r&&("/"!==t.pathname.charAt(0)&&(t=L({},t,{pathname:"/"+t.pathname})),r=t.pathname),g(e.length,(function(n,a,u){j(e[n],t,r,o,i,(function(e,t){e||t?u(e,t):a()}))}),n)}var U=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function F(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!0;return!1}function V(e,t){var n={},r=E(),o=r.runEnterHooks,i=r.runChangeHooks,a=r.runLeaveHooks;var u=void 0;function s(e,n){u&&u.location===e?c(u,n):D(t,e,(function(t,r){t?n(t):r?c(U({},r,{location:e}),n):n()}))}function c(e,t){var r=y(n,e),u=r.leaveRoutes,s=r.changeRoutes,c=r.enterRoutes;function l(r,o){if(r||o)return p(r,o);P(e,(function(r,o){r?t(r):t(null,null,n=U({},e,{components:o}))}))}function p(e,n){e?t(e):t(null,n)}a(u,n),u.filter((function(e){return-1===c.indexOf(e)})).forEach(b),i(s,n,e,(function(t,n){if(t||n)return p(t,n);o(c,e,l)}))}var l=1;function p(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e.__id__||t&&(e.__id__=l++)}var f=Object.create(null);function d(e){return e.map((function(e){return f[p(e)]})).filter((function(e){return e}))}function h(e,r){D(t,e,(function(t,o){if(null!=o){u=U({},o,{location:e});for(var i=d(y(n,u).leaveRoutes),a=void 0,s=0,c=i.length;null==a&&s<c;++s)a=i[s](e);r(a)}else r()}))}function m(){if(n.routes){for(var e=d(n.routes),t=void 0,r=0,o=e.length;"string"!=typeof t&&r<o;++r)t=e[r]();return t}}var v=void 0,g=void 0;function b(e){var t=p(e);t&&(delete f[t],F(f)||(v&&(v(),v=null),g&&(g(),g=null)))}return{isActive:function(t,r){return O(t=e.createLocation(t),r,n.location,n.routes,n.params)},match:s,listenBeforeLeavingRoute:function(t,n){var r=!F(f),o=p(t,!0);return f[o]=n,r&&(v=e.listenBefore(h),e.listenBeforeUnload&&(g=e.listenBeforeUnload(m))),function(){b(t)}},listen:function(t){function r(r){n.location===r?t(null,n):s(r,(function(n,r,o){n?t(n):r?e.replace(r):o&&t(null,o)}))}var o=e.listen(r);return n.location?t(null,n):r(e.getCurrentLocation()),o}}}function B(e,t,n){if(e[t])return new Error("<"+n+'> should not have a "'+t+'" prop')}Object(c.shape)({listen:c.func.isRequired,push:c.func.isRequired,replace:c.func.isRequired,go:c.func.isRequired,goBack:c.func.isRequired,goForward:c.func.isRequired});var W=c.elementType,q=Object(c.oneOfType)([W,c.object]),H=Object(c.oneOfType)([c.object,c.element]),K=Object(c.oneOfType)([H,Object(c.arrayOf)(H)]),z=n(29);var $=function(e,t){var n={};return e.path?(m(e.path).forEach((function(e){Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})),n):n},Y=l.a.shape({subscribe:l.a.func.isRequired,eventIndex:l.a.number.isRequired});function G(e){return"@@contextSubscriber/"+e}var Q=void 0!==a.a.forwardRef;function X(e){var t,n,r=G(e),o=r+"/lastRenderedEventIndex",i=r+"/handleContextUpdate",a=r+"/unsubscribe",u=((n={contextTypes:(t={},t[r]=Y,t),getInitialState:function(){var e;return this.context[r]?((e={})[o]=this.context[r].eventIndex,e):{}},componentDidMount:function(){this.context[r]&&(this[a]=this.context[r].subscribe(this[i]))},componentWillReceiveProps:function(){var e;this.context[r]&&this.setState(((e={})[o]=this.context[r].eventIndex,e))},componentWillUnmount:function(){this[a]&&(this[a](),this[a]=null)}})[i]=function(e){var t;e!==this.state[o]&&this.setState(((t={})[o]=e,t))},n);return Q&&(u.UNSAFE_componentWillReceiveProps=u.componentWillReceiveProps,delete u.componentWillReceiveProps),u}var J,Z,ee,te,ne,re,oe,ie,ae=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ue="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},se=s()({displayName:"RouterContext",mixins:[(J="router",te=G(J),ne=te+"/listeners",re=te+"/eventIndex",oe=te+"/subscribe",(ee={childContextTypes:(Z={},Z[te]=Y.isRequired,Z),getChildContext:function(){var e;return(e={})[te]={eventIndex:this[re],subscribe:this[oe]},e},componentWillMount:function(){this[ne]=[],this[re]=0},componentWillReceiveProps:function(){this[re]++},componentDidUpdate:function(){var e=this;this[ne].forEach((function(t){return t(e[re])}))}})[oe]=function(e){var t=this;return this[ne].push(e),function(){t[ne]=t[ne].filter((function(t){return t!==e}))}},ie=ee,Q&&(ie.UNSAFE_componentWillMount=ie.componentWillMount,ie.UNSAFE_componentWillReceiveProps=ie.componentWillReceiveProps,delete ie.componentWillMount,delete ie.componentWillReceiveProps),ie)],propTypes:{router:c.object.isRequired,location:c.object.isRequired,routes:c.array.isRequired,params:c.object.isRequired,components:c.array.isRequired,createElement:c.func.isRequired},getDefaultProps:function(){return{createElement:a.a.createElement}},childContextTypes:{router:c.object.isRequired},getChildContext:function(){return{router:this.props.router}},createElement:function(e,t){return null==e?null:this.props.createElement(e,t)},render:function(){var e=this,t=this.props,n=t.location,r=t.routes,i=t.params,u=t.components,s=t.router,c=null;return u&&(c=u.reduceRight((function(t,o,a){if(null==o)return t;var u=r[a],c=$(u,i),l={location:n,params:i,route:u,router:s,routeParams:c,routes:r};if(S(t))l.children=t;else if(t)for(var p in t)Object.prototype.hasOwnProperty.call(t,p)&&(l[p]=t[p]);if("object"===(void 0===o?"undefined":ue(o))&&!Object(z.isValidElementType)(o)){var f={};for(var d in o)Object.prototype.hasOwnProperty.call(o,d)&&(f[d]=e.createElement(o[d],ae({key:d},l)));return f}return e.createElement(o,l)}),c)),null===c||!1===c||a.a.isValidElement(c)||o()(!1),c}}),ce=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function le(e,t,n){return pe(ce({},e,{setRouteLeaveHook:t.listenBeforeLeavingRoute,isActive:t.isActive}),n)}function pe(e,t){var n=t.location,r=t.params,o=t.routes;return e.location=n,e.params=r,e.routes=o,e}var fe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};var de={history:c.object,children:K,routes:K,render:c.func,createElement:c.func,onError:c.func,onUpdate:c.func,matchContext:c.object},he=void 0!==a.a.forwardRef,me=s()({displayName:"Router",propTypes:de,getDefaultProps:function(){return{render:function(e){return a.a.createElement(se,e)}}},getInitialState:function(){return{location:null,routes:null,params:null,components:null}},handleError:function(e){if(!this.props.onError)throw e;this.props.onError.call(this,e)},createRouterObject:function(e){var t=this.props.matchContext;return t?t.router:le(this.props.history,this.transitionManager,e)},createTransitionManager:function(){var e=this.props.matchContext;if(e)return e.transitionManager;var t=this.props.history,n=this.props,r=n.routes,i=n.children;return t.getCurrentLocation||o()(!1),V(t,N(r||i))},componentWillMount:function(){var e=this;this.transitionManager=this.createTransitionManager(),this.router=this.createRouterObject(this.state),this._unlisten=this.transitionManager.listen((function(t,n){t?e.handleError(t):(pe(e.router,n),e.setState(n,e.props.onUpdate))}))},componentWillReceiveProps:function(e){},componentWillUnmount:function(){this._unlisten&&this._unlisten()},render:function(){var e=this.state,t=e.location,n=e.routes,r=e.params,o=e.components,i=this.props,a=i.createElement,u=i.render,s=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(i,["createElement","render"]);return null==t?null:(Object.keys(de).forEach((function(e){return delete s[e]})),u(fe({},s,{router:this.router,location:t,routes:n,params:r,components:o,createElement:a})))}});he&&(me.prototype.UNSAFE_componentWillReceiveProps=me.prototype.componentWillReceiveProps,me.prototype.UNSAFE_componentWillMount=me.prototype.componentWillMount,delete me.prototype.componentWillReceiveProps,delete me.prototype.componentWillMount);var ve=me,ye=Object(c.shape)({push:c.func.isRequired,replace:c.func.isRequired,go:c.func.isRequired,goBack:c.func.isRequired,goForward:c.func.isRequired,setRouteLeaveHook:c.func.isRequired,isActive:c.func.isRequired}),ge=Object(c.shape)({pathname:c.string.isRequired,search:c.string.isRequired,state:c.object,action:c.string.isRequired,key:c.string}),be=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function _e(e,t){return"function"==typeof e?e(t.location):e}var Ee=s()({displayName:"Link",mixins:[X("router")],contextTypes:{router:ye},propTypes:{to:Object(c.oneOfType)([c.string,c.object,c.func]),activeStyle:c.object,activeClassName:c.string,onlyActiveOnIndex:c.bool.isRequired,onClick:c.func,target:c.string,innerRef:Object(c.oneOfType)([c.string,c.func,Object(c.shape)({current:c.elementType})])},getDefaultProps:function(){return{onlyActiveOnIndex:!1,style:{}}},handleClick:function(e){if(this.props.onClick&&this.props.onClick(e),!e.defaultPrevented){var t=this.context.router;t||o()(!1),!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)&&function(e){return 0===e.button}(e)&&(this.props.target||(e.preventDefault(),t.push(_e(this.props.to,t))))}},render:function(){var e=this.props,t=e.to,n=e.activeClassName,r=e.activeStyle,o=e.onlyActiveOnIndex,i=e.innerRef,u=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(e,["to","activeClassName","activeStyle","onlyActiveOnIndex","innerRef"]),s=this.context.router;if(s){if(!t)return a.a.createElement("a",be({},u,{ref:i}));var c=_e(t,s);u.href=s.createHref(c),(n||null!=r&&!function(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(r))&&s.isActive(c,o)&&(n&&(u.className?u.className+=" "+n:u.className=n),r&&(u.style=be({},u.style,r)))}return a.a.createElement("a",be({},u,{onClick:this.handleClick,ref:i}))}}),Ce=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},we=s()({displayName:"IndexLink",render:function(){return a.a.createElement(Ee,Ce({},this.props,{onlyActiveOnIndex:!0}))}}),Oe=n(51),xe=n.n(Oe),Pe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function ke(e,t){var n=t&&t.withRef,r=s()({displayName:"WithRouter",mixins:[X("router")],contextTypes:{router:ye},propTypes:{router:ye},getWrappedInstance:function(){return n||o()(!1),this.wrappedInstance},render:function(){var t=this,r=this.props.router||this.context.router;if(!r)return a.a.createElement(e,this.props);var o=r.params,i=r.location,u=r.routes,s=Pe({},this.props,{router:r,params:o,location:i,routes:u});return n&&(s.ref=function(e){t.wrappedInstance=e}),a.a.createElement(e,s)}});return r.displayName="withRouter("+function(e){return e.displayName||e.name||"Component"}(e)+")",r.WrappedComponent=e,xe()(r,e)}var Me=s()({displayName:"Redirect",statics:{createRouteFromReactElement:function(e){var t=T(e);return t.from&&(t.path=t.from),t.onEnter=function(e,n){var r=e.location,o=e.params,i=void 0;if("/"===t.to.charAt(0))i=v(t.to,o);else if(t.to){var a=e.routes.indexOf(t);i=v(Me.getRoutePattern(e.routes,a-1).replace(/\/*$/,"/")+t.to,o)}else i=r.pathname;n({pathname:i,query:t.query||r.query,state:t.state||r.state})},t},getRoutePattern:function(e,t){for(var n="",r=t;r>=0;r--){var o=e[r].path||"";if(n=o.replace(/\/*$/,"/")+n,0===o.indexOf("/"))break}return"/"+n}},propTypes:{path:c.string,from:c.string,to:c.string.isRequired,query:c.object,state:c.object,onEnter:B,children:B},render:function(){o()(!1)}}),Se=Me,Te=s()({displayName:"IndexRedirect",statics:{createRouteFromReactElement:function(e,t){t&&(t.indexRoute=Se.createRouteFromReactElement(e))}},propTypes:{to:c.string.isRequired,query:c.object,state:c.object,onEnter:B,children:B},render:function(){o()(!1)}}),Re=s()({displayName:"IndexRoute",statics:{createRouteFromReactElement:function(e,t){t&&(t.indexRoute=T(e))}},propTypes:{path:B,component:W,components:q,getComponent:c.func,getComponents:c.func},render:function(){o()(!1)}}),Ne=s()({displayName:"Route",statics:{createRouteFromReactElement:T},propTypes:{path:c.string,component:W,components:q,getComponent:c.func,getComponents:c.func},render:function(){o()(!1)}}),Le=n(36),Ie=n(52),Ae=n.n(Ie),je=n(53),De=n.n(je),Ue=n(135),Fe=n.n(Ue);function Ve(e){var t=Fe()(e);return Ae()(De()((function(){return t})))(e)}var Be=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};var We=function(e,t){var n=e.history,r=e.routes,i=e.location,a=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(e,["history","routes","location"]);n||i||o()(!1);var u=V(n=n||Ve(a),N(r));i=i?n.createLocation(i):n.getCurrentLocation(),u.match(i,(function(e,r,o){var i=void 0;if(o){var a=le(n,u,o);i=Be({},o,{router:a,matchContext:{transitionManager:u,router:a}})}t(e,r&&n.createLocation(r,Le.REPLACE),i)}))};function qe(e){return function(t){return Ae()(De()(e))(t)}}var He=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ke=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=t.map((function(e){return e.renderRouterContext})).filter(Boolean),o=t.map((function(e){return e.renderRouteComponent})).filter(Boolean),u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i.createElement;return function(t,n){return o.reduceRight((function(e,t){return t(e,n)}),e(t,n))}};return function(e){return r.reduceRight((function(t,n){return n(t,e)}),a.a.createElement(se,He({},e,{createElement:u(e.createElement)})))}},ze=n(136),$e=n.n(ze),Ye=!("undefined"==typeof window||!window.document||!window.document.createElement);function Ge(e){var t=void 0;return Ye&&(t=qe(e)()),t}var Qe=Ge($e.a),Xe=n(137),Je=Ge(n.n(Xe).a)}]);
//# sourceMappingURL=bundle.js.map
;
(function() {
  var context = this;

  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        WebSocket: window.WebSocket,
        logger: window.console,
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages, ref;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(context);

  var ActionCable = context.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            return false;
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//



;
