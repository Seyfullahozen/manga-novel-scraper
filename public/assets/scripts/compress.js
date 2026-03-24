var _____WB$wombat$assign$function_____ = function (name) {
    return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
    self.__WB_pmw = function (obj) {
        this.__WB_source = obj;
        return this;
    }
}
{
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opens = _____WB$wombat$assign$function_____("opens");
    !function (a, b) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
            if (!a.document) throw new Error("jQuery requires a window with a document");
            return b(a)
        } : b(a)
    }("undefined" != typeof window ? window : this, function (a, b) {
        var c = [], d = a.document, e = c.slice, f = c.concat, g = c.push, h = c.indexOf, i = {}, j = i.toString,
            k = i.hasOwnProperty, l = {}, m = "1.12.4", n = function (a, b) {
                return new n.fn.init(a, b)
            }, o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, p = /^-ms-/, q = /-([\da-z])/gi, r = function (a, b) {
                return b.toUpperCase()
            };
        n.fn = n.prototype = {
            jquery: m, constructor: n, selector: "", length: 0, toArray: function () {
                return e.call(this)
            }, get: function (a) {
                return null != a ? 0 > a ? this[a + this.length] : this[a] : e.call(this)
            }, pushStack: function (a) {
                var b = n.merge(this.constructor(), a);
                return b.prevObject = this, b.context = this.context, b
            }, each: function (a) {
                return n.each(this, a)
            }, map: function (a) {
                return this.pushStack(n.map(this, function (b, c) {
                    return a.call(b, c, b)
                }))
            }, slice: function () {
                return this.pushStack(e.apply(this, arguments))
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, eq: function (a) {
                var b = this.length, c = +a + (0 > a ? b : 0);
                return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
            }, end: function () {
                return this.prevObject || this.constructor()
            }, push: g, sort: c.sort, splice: c.splice
        }, n.extend = n.fn.extend = function () {
            var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
            for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d], c = e[d], g !== c && (j && c && (n.isPlainObject(c) || (b = n.isArray(c))) ? (b ? (b = !1, f = a && n.isArray(a) ? a : []) : f = a && n.isPlainObject(a) ? a : {}, g[d] = n.extend(j, f, c)) : void 0 !== c && (g[d] = c));
            return g
        }, n.extend({
            expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
                throw new Error(a)
            }, noop: function () {
            }, isFunction: function (a) {
                return "function" === n.type(a)
            }, isArray: Array.isArray || function (a) {
                return "array" === n.type(a)
            }, isWindow: function (a) {
                return null != a && a == a.window
            }, isNumeric: function (a) {
                var b = a && a.toString();
                return !n.isArray(a) && b - parseFloat(b) + 1 >= 0
            }, isEmptyObject: function (a) {
                var b;
                for (b in a) return !1;
                return !0
            }, isPlainObject: function (a) {
                var b;
                if (!a || "object" !== n.type(a) || a.nodeType || n.isWindow(a)) return !1;
                try {
                    if (a.constructor && !k.call(a, "constructor") && !k.call(a.constructor.prototype, "isPrototypeOf")) return !1
                } catch (c) {
                    return !1
                }
                if (!l.ownFirst) for (b in a) return k.call(a, b);
                for (b in a) ;
                return void 0 === b || k.call(a, b)
            }, type: function (a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? i[j.call(a)] || "object" : typeof a
            }, globalEval: function (b) {
                b && n.trim(b) && (a.execScript || function (b) {
                    a.eval.call(a, b)
                })(b)
            }, camelCase: function (a) {
                return a.replace(p, "ms-").replace(q, r)
            }, nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
            }, each: function (a, b) {
                var c, d = 0;
                if (s(a)) {
                    for (c = a.length; c > d; d++) if (b.call(a[d], d, a[d]) === !1) break
                } else for (d in a) if (b.call(a[d], d, a[d]) === !1) break;
                return a
            }, trim: function (a) {
                return null == a ? "" : (a + "").replace(o, "")
            }, makeArray: function (a, b) {
                var c = b || [];
                return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : g.call(c, a)), c
            }, inArray: function (a, b, c) {
                var d;
                if (b) {
                    if (h) return h.call(b, a, c);
                    for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++) if (c in b && b[c] === a) return c
                }
                return -1
            }, merge: function (a, b) {
                var c = +b.length, d = 0, e = a.length;
                while (c > d) a[e++] = b[d++];
                if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];
                return a.length = e, a
            }, grep: function (a, b, c) {
                for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
                return e
            }, map: function (a, b, c) {
                var d, e, g = 0, h = [];
                if (s(a)) for (d = a.length; d > g; g++) e = b(a[g], g, c), null != e && h.push(e); else for (g in a) e = b(a[g], g, c), null != e && h.push(e);
                return f.apply([], h)
            }, guid: 1, proxy: function (a, b) {
                var c, d, f;
                return "string" == typeof b && (f = a[b], b = a, a = f), n.isFunction(a) ? (c = e.call(arguments, 2), d = function () {
                    return a.apply(b || this, c.concat(e.call(arguments)))
                }, d.guid = a.guid = a.guid || n.guid++, d) : void 0
            }, now: function () {
                return +new Date
            }, support: l
        }), "function" == typeof Symbol && (n.fn[Symbol.iterator] = c[Symbol.iterator]), n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
            i["[object " + b + "]"] = b.toLowerCase()
        });

        function s(a) {
            var b = !!a && "length" in a && a.length, c = n.type(a);
            return "function" === c || n.isWindow(a) ? !1 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
        }

        var t = function (a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date, v = a.document,
                w = 0, x = 0, y = ga(), z = ga(), A = ga(), B = function (a, b) {
                    return a === b && (l = !0), 0
                }, C = 1 << 31, D = {}.hasOwnProperty, E = [], F = E.pop, G = E.push, H = E.push, I = E.slice,
                J = function (a, b) {
                    for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
                    return -1
                },
                K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                L = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                N = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + L + "*\\]",
                O = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + N + ")*)|.*)\\)|)",
                P = new RegExp(L + "+", "g"), Q = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
                R = new RegExp("^" + L + "*," + L + "*"), S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
                T = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"), U = new RegExp(O),
                V = new RegExp("^" + M + "$"), W = {
                    ID: new RegExp("^#(" + M + ")"),
                    CLASS: new RegExp("^\\.(" + M + ")"),
                    TAG: new RegExp("^(" + M + "|[*])"),
                    ATTR: new RegExp("^" + N),
                    PSEUDO: new RegExp("^" + O),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + K + ")$", "i"),
                    needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
                }, X = /^(?:input|select|textarea|button)$/i, Y = /^h\d$/i, Z = /^[^{]+\{\s*\[native \w/,
                $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, _ = /[+~]/, aa = /'|\\/g,
                ba = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"), ca = function (a, b, c) {
                    var d = "0x" + b - 65536;
                    return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                }, da = function () {
                    m()
                };
            try {
                H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType
            } catch (ea) {
                H = {
                    apply: E.length ? function (a, b) {
                        G.apply(a, I.call(b))
                    } : function (a, b) {
                        var c = a.length, d = 0;
                        while (a[c++] = b[d++]) ;
                        a.length = c - 1
                    }
                }
            }

            function fa(a, b, d, e) {
                var f, h, j, k, l, o, r, s, w = b && b.ownerDocument, x = b ? b.nodeType : 9;
                if (d = d || [], "string" != typeof a || !a || 1 !== x && 9 !== x && 11 !== x) return d;
                if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
                    if (11 !== x && (o = $.exec(a))) if (f = o[1]) {
                        if (9 === x) {
                            if (!(j = b.getElementById(f))) return d;
                            if (j.id === f) return d.push(j), d
                        } else if (w && (j = w.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d
                    } else {
                        if (o[2]) return H.apply(d, b.getElementsByTagName(a)), d;
                        if ((f = o[3]) && c.getElementsByClassName && b.getElementsByClassName) return H.apply(d, b.getElementsByClassName(f)), d
                    }
                    if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
                        if (1 !== x) w = b, s = a; else if ("object" !== b.nodeName.toLowerCase()) {
                            (k = b.getAttribute("id")) ? k = k.replace(aa, "\\$&") : b.setAttribute("id", k = u), r = g(a), h = r.length, l = V.test(k) ? "#" + k : "[id='" + k + "']";
                            while (h--) r[h] = l + " " + qa(r[h]);
                            s = r.join(","), w = _.test(a) && oa(b.parentNode) || b
                        }
                        if (s) try {
                            return H.apply(d, w.querySelectorAll(s)), d
                        } catch (y) {
                        } finally {
                            k === u && b.removeAttribute("id")
                        }
                    }
                }
                return i(a.replace(Q, "$1"), b, d, e)
            }

            function ga() {
                var a = [];

                function b(c, e) {
                    return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
                }

                return b
            }

            function ha(a) {
                return a[u] = !0, a
            }

            function ia(a) {
                var b = n.createElement("div");
                try {
                    return !!a(b)
                } catch (c) {
                    return !1
                } finally {
                    b.parentNode && b.parentNode.removeChild(b), b = null
                }
            }

            function ja(a, b) {
                var c = a.split("|"), e = c.length;
                while (e--) d.attrHandle[c[e]] = b
            }

            function ka(a, b) {
                var c = b && a,
                    d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
                if (d) return d;
                if (c) while (c = c.nextSibling) if (c === b) return -1;
                return a ? 1 : -1
            }

            function la(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return "input" === c && b.type === a
                }
            }

            function ma(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a
                }
            }

            function na(a) {
                return ha(function (b) {
                    return b = +b, ha(function (c, d) {
                        var e, f = a([], c.length, b), g = f.length;
                        while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                    })
                })
            }

            function oa(a) {
                return a && "undefined" != typeof a.getElementsByTagName && a
            }

            c = fa.support = {}, f = fa.isXML = function (a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return b ? "HTML" !== b.nodeName : !1
            }, m = fa.setDocument = function (a) {
                var b, e, g = a ? a.ownerDocument || a : v;
                return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ia(function (a) {
                    return a.className = "i", !a.getAttribute("className")
                }), c.getElementsByTagName = ia(function (a) {
                    return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length
                }), c.getElementsByClassName = Z.test(n.getElementsByClassName), c.getById = ia(function (a) {
                    return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length
                }), c.getById ? (d.find.ID = function (a, b) {
                    if ("undefined" != typeof b.getElementById && p) {
                        var c = b.getElementById(a);
                        return c ? [c] : []
                    }
                }, d.filter.ID = function (a) {
                    var b = a.replace(ba, ca);
                    return function (a) {
                        return a.getAttribute("id") === b
                    }
                }) : (delete d.find.ID, d.filter.ID = function (a) {
                    var b = a.replace(ba, ca);
                    return function (a) {
                        var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                        return c && c.value === b
                    }
                }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
                    return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
                } : function (a, b) {
                    var c, d = [], e = 0, f = b.getElementsByTagName(a);
                    if ("*" === a) {
                        while (c = f[e++]) 1 === c.nodeType && d.push(c);
                        return d
                    }
                    return f
                }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
                    return "undefined" != typeof b.getElementsByClassName && p ? b.getElementsByClassName(a) : void 0
                }, r = [], q = [], (c.qsa = Z.test(n.querySelectorAll)) && (ia(function (a) {
                    o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
                }), ia(function (a) {
                    var b = n.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
                })), (c.matchesSelector = Z.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ia(function (a) {
                    c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", O)
                }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Z.test(o.compareDocumentPosition), t = b || Z.test(o.contains) ? function (a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                } : function (a, b) {
                    if (b) while (b = b.parentNode) if (b === a) return !0;
                    return !1
                }, B = b ? function (a, b) {
                    if (a === b) return l = !0, 0;
                    var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
                } : function (a, b) {
                    if (a === b) return l = !0, 0;
                    var c, d = 0, e = a.parentNode, f = b.parentNode, g = [a], h = [b];
                    if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
                    if (e === f) return ka(a, b);
                    c = a;
                    while (c = c.parentNode) g.unshift(c);
                    c = b;
                    while (c = c.parentNode) h.unshift(c);
                    while (g[d] === h[d]) d++;
                    return d ? ka(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0
                }, n) : n
            }, fa.matches = function (a, b) {
                return fa(a, null, null, b)
            }, fa.matchesSelector = function (a, b) {
                if ((a.ownerDocument || a) !== n && m(a), b = b.replace(T, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
                    var d = s.call(a, b);
                    if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                } catch (e) {
                }
                return fa(b, n, null, [a]).length > 0
            }, fa.contains = function (a, b) {
                return (a.ownerDocument || a) !== n && m(a), t(a, b)
            }, fa.attr = function (a, b) {
                (a.ownerDocument || a) !== n && m(a);
                var e = d.attrHandle[b.toLowerCase()],
                    f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
                return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
            }, fa.error = function (a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            }, fa.uniqueSort = function (a) {
                var b, d = [], e = 0, f = 0;
                if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                    while (b = a[f++]) b === a[f] && (e = d.push(f));
                    while (e--) a.splice(d[e], 1)
                }
                return k = null, a
            }, e = fa.getText = function (a) {
                var b, c = "", d = 0, f = a.nodeType;
                if (f) {
                    if (1 === f || 9 === f || 11 === f) {
                        if ("string" == typeof a.textContent) return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                    } else if (3 === f || 4 === f) return a.nodeValue
                } else while (b = a[d++]) c += e(b);
                return c
            }, d = fa.selectors = {
                cacheLength: 50,
                createPseudo: ha,
                match: W,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {dir: "parentNode", first: !0},
                    " ": {dir: "parentNode"},
                    "+": {dir: "previousSibling", first: !0},
                    "~": {dir: "previousSibling"}
                },
                preFilter: {
                    ATTR: function (a) {
                        return a[1] = a[1].replace(ba, ca), a[3] = (a[3] || a[4] || a[5] || "").replace(ba, ca), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                    }, CHILD: function (a) {
                        return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fa.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fa.error(a[0]), a
                    }, PSEUDO: function (a) {
                        var b, c = !a[6] && a[2];
                        return W.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && U.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (a) {
                        var b = a.replace(ba, ca).toLowerCase();
                        return "*" === a ? function () {
                            return !0
                        } : function (a) {
                            return a.nodeName && a.nodeName.toLowerCase() === b
                        }
                    }, CLASS: function (a) {
                        var b = y[a + " "];
                        return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function (a) {
                            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                        })
                    }, ATTR: function (a, b, c) {
                        return function (d) {
                            var e = fa.attr(d, a);
                            return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(P, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                        }
                    }, CHILD: function (a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                        return 1 === d && 0 === e ? function (a) {
                            return !!a.parentNode
                        } : function (b, c, i) {
                            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode,
                                r = h && b.nodeName.toLowerCase(), s = !i && !h, t = !1;
                            if (q) {
                                if (f) {
                                    while (p) {
                                        m = b;
                                        while (m = m[p]) if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                        o = p = "only" === a && !o && "nextSibling"
                                    }
                                    return !0
                                }
                                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                    m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];
                                    while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if (1 === m.nodeType && ++t && m === b) {
                                        k[a] = [w, n, t];
                                        break
                                    }
                                } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;
                                return t -= e, t === d || t % d === 0 && t / d >= 0
                            }
                        }
                    }, PSEUDO: function (a, b) {
                        var c,
                            e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fa.error("unsupported pseudo: " + a);
                        return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ha(function (a, c) {
                            var d, f = e(a, b), g = f.length;
                            while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g])
                        }) : function (a) {
                            return e(a, 0, c)
                        }) : e
                    }
                },
                pseudos: {
                    not: ha(function (a) {
                        var b = [], c = [], d = h(a.replace(Q, "$1"));
                        return d[u] ? ha(function (a, b, c, e) {
                            var f, g = d(a, null, e, []), h = a.length;
                            while (h--) (f = g[h]) && (a[h] = !(b[h] = f))
                        }) : function (a, e, f) {
                            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
                        }
                    }), has: ha(function (a) {
                        return function (b) {
                            return fa(a, b).length > 0
                        }
                    }), contains: ha(function (a) {
                        return a = a.replace(ba, ca), function (b) {
                            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                        }
                    }), lang: ha(function (a) {
                        return V.test(a || "") || fa.error("unsupported lang: " + a), a = a.replace(ba, ca).toLowerCase(), function (b) {
                            var c;
                            do if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                    }), target: function (b) {
                        var c = a.location && a.location.hash;
                        return c && c.slice(1) === b.id
                    }, root: function (a) {
                        return a === o
                    }, focus: function (a) {
                        return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                    }, enabled: function (a) {
                        return a.disabled === !1
                    }, disabled: function (a) {
                        return a.disabled === !0
                    }, checked: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && !!a.checked || "option" === b && !!a.selected
                    }, selected: function (a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    }, empty: function (a) {
                        for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                        return !0
                    }, parent: function (a) {
                        return !d.pseudos.empty(a)
                    }, header: function (a) {
                        return Y.test(a.nodeName)
                    }, input: function (a) {
                        return X.test(a.nodeName)
                    }, button: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && "button" === a.type || "button" === b
                    }, text: function (a) {
                        var b;
                        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                    }, first: na(function () {
                        return [0]
                    }), last: na(function (a, b) {
                        return [b - 1]
                    }), eq: na(function (a, b, c) {
                        return [0 > c ? c + b : c]
                    }), even: na(function (a, b) {
                        for (var c = 0; b > c; c += 2) a.push(c);
                        return a
                    }), odd: na(function (a, b) {
                        for (var c = 1; b > c; c += 2) a.push(c);
                        return a
                    }), lt: na(function (a, b, c) {
                        for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                        return a
                    }), gt: na(function (a, b, c) {
                        for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                        return a
                    })
                }
            }, d.pseudos.nth = d.pseudos.eq;
            for (b in {radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) d.pseudos[b] = la(b);
            for (b in {submit: !0, reset: !0}) d.pseudos[b] = ma(b);

            function pa() {
            }

            pa.prototype = d.filters = d.pseudos, d.setFilters = new pa, g = fa.tokenize = function (a, b) {
                var c, e, f, g, h, i, j, k = z[a + " "];
                if (k) return b ? 0 : k.slice(0);
                h = a, i = [], j = d.preFilter;
                while (h) {
                    c && !(e = R.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = S.exec(h)) && (c = e.shift(), f.push({
                        value: c,
                        type: e[0].replace(Q, " ")
                    }), h = h.slice(c.length));
                    for (g in d.filter) !(e = W[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                        value: c,
                        type: g,
                        matches: e
                    }), h = h.slice(c.length));
                    if (!c) break
                }
                return b ? h.length : h ? fa.error(a) : z(a, i).slice(0)
            };

            function qa(a) {
                for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
                return d
            }

            function ra(a, b, c) {
                var d = b.dir, e = c && "parentNode" === d, f = x++;
                return b.first ? function (b, c, f) {
                    while (b = b[d]) if (1 === b.nodeType || e) return a(b, c, f)
                } : function (b, c, g) {
                    var h, i, j, k = [w, f];
                    if (g) {
                        while (b = b[d]) if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                    } else while (b = b[d]) if (1 === b.nodeType || e) {
                        if (j = b[u] || (b[u] = {}), i = j[b.uniqueID] || (j[b.uniqueID] = {}), (h = i[d]) && h[0] === w && h[1] === f) return k[2] = h[2];
                        if (i[d] = k, k[2] = a(b, c, g)) return !0
                    }
                }
            }

            function sa(a) {
                return a.length > 1 ? function (b, c, d) {
                    var e = a.length;
                    while (e--) if (!a[e](b, c, d)) return !1;
                    return !0
                } : a[0]
            }

            function ta(a, b, c) {
                for (var d = 0, e = b.length; e > d; d++) fa(a, b[d], c);
                return c
            }

            function ua(a, b, c, d, e) {
                for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
                return g
            }

            function va(a, b, c, d, e, f) {
                return d && !d[u] && (d = va(d)), e && !e[u] && (e = va(e, f)), ha(function (f, g, h, i) {
                    var j, k, l, m = [], n = [], o = g.length, p = f || ta(b || "*", h.nodeType ? [h] : h, []),
                        q = !a || !f && b ? p : ua(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
                    if (c && c(q, r, h, i), d) {
                        j = ua(r, n), d(j, [], h, i), k = j.length;
                        while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                    }
                    if (f) {
                        if (e || a) {
                            if (e) {
                                j = [], k = r.length;
                                while (k--) (l = r[k]) && j.push(q[k] = l);
                                e(null, r = [], j, i)
                            }
                            k = r.length;
                            while (k--) (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                        }
                    } else r = ua(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r)
                })
            }

            function wa(a) {
                for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ra(function (a) {
                    return a === b
                }, h, !0), l = ra(function (a) {
                    return J(b, a) > -1
                }, h, !0), m = [function (a, c, d) {
                    var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                    return b = null, e
                }]; f > i; i++) if (c = d.relative[a[i].type]) m = [ra(sa(m), c)]; else {
                    if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                        for (e = ++i; f > e; e++) if (d.relative[a[e].type]) break;
                        return va(i > 1 && sa(m), i > 1 && qa(a.slice(0, i - 1).concat({value: " " === a[i - 2].type ? "*" : ""})).replace(Q, "$1"), c, e > i && wa(a.slice(i, e)), f > e && wa(a = a.slice(e)), f > e && qa(a))
                    }
                    m.push(c)
                }
                return sa(m)
            }

            function xa(a, b) {
                var c = b.length > 0, e = a.length > 0, f = function (f, g, h, i, k) {
                    var l, o, q, r = 0, s = "0", t = f && [], u = [], v = j, x = f || e && d.find.TAG("*", k),
                        y = w += null == v ? 1 : Math.random() || .1, z = x.length;
                    for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
                        if (e && l) {
                            o = 0, g || l.ownerDocument === n || (m(l), h = !p);
                            while (q = a[o++]) if (q(l, g || n, h)) {
                                i.push(l);
                                break
                            }
                            k && (w = y)
                        }
                        c && ((l = !q && l) && r--, f && t.push(l))
                    }
                    if (r += s, c && s !== r) {
                        o = 0;
                        while (q = b[o++]) q(t, u, g, h);
                        if (f) {
                            if (r > 0) while (s--) t[s] || u[s] || (u[s] = F.call(i));
                            u = ua(u)
                        }
                        H.apply(i, u), k && !f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i)
                    }
                    return k && (w = y, j = v), t
                };
                return c ? ha(f) : f
            }

            return h = fa.compile = function (a, b) {
                var c, d = [], e = [], f = A[a + " "];
                if (!f) {
                    b || (b = g(a)), c = b.length;
                    while (c--) f = wa(b[c]), f[u] ? d.push(f) : e.push(f);
                    f = A(a, xa(e, d)), f.selector = a
                }
                return f
            }, i = fa.select = function (a, b, e, f) {
                var i, j, k, l, m, n = "function" == typeof a && a, o = !f && g(a = n.selector || a);
                if (e = e || [], 1 === o.length) {
                    if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                        if (b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0], !b) return e;
                        n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                    }
                    i = W.needsContext.test(a) ? 0 : j.length;
                    while (i--) {
                        if (k = j[i], d.relative[l = k.type]) break;
                        if ((m = d.find[l]) && (f = m(k.matches[0].replace(ba, ca), _.test(j[0].type) && oa(b.parentNode) || b))) {
                            if (j.splice(i, 1), a = f.length && qa(j), !a) return H.apply(e, f), e;
                            break
                        }
                    }
                }
                return (n || h(a, o))(f, b, !p, e, !b || _.test(a) && oa(b.parentNode) || b), e
            }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ia(function (a) {
                return 1 & a.compareDocumentPosition(n.createElement("div"))
            }), ia(function (a) {
                return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
            }) || ja("type|href|height|width", function (a, b, c) {
                return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
            }), c.attributes && ia(function (a) {
                return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
            }) || ja("value", function (a, b, c) {
                return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
            }), ia(function (a) {
                return null == a.getAttribute("disabled")
            }) || ja(K, function (a, b, c) {
                var d;
                return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }), fa
        }(a);
        n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.uniqueSort = n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
        var u = function (a, b, c) {
            var d = [], e = void 0 !== c;
            while ((a = a[b]) && 9 !== a.nodeType) if (1 === a.nodeType) {
                if (e && n(a).is(c)) break;
                d.push(a)
            }
            return d
        }, v = function (a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }, w = n.expr.match.needsContext, x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, y = /^.[^:#\[\.,]*$/;

        function z(a, b, c) {
            if (n.isFunction(b)) return n.grep(a, function (a, d) {
                return !!b.call(a, d, a) !== c
            });
            if (b.nodeType) return n.grep(a, function (a) {
                return a === b !== c
            });
            if ("string" == typeof b) {
                if (y.test(b)) return n.filter(b, a, c);
                b = n.filter(b, a)
            }
            return n.grep(a, function (a) {
                return n.inArray(a, b) > -1 !== c
            })
        }

        n.filter = function (a, b, c) {
            var d = b[0];
            return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function (a) {
                return 1 === a.nodeType
            }))
        }, n.fn.extend({
            find: function (a) {
                var b, c = [], d = this, e = d.length;
                if ("string" != typeof a) return this.pushStack(n(a).filter(function () {
                    for (b = 0; e > b; b++) if (n.contains(d[b], this)) return !0
                }));
                for (b = 0; e > b; b++) n.find(a, d[b], c);
                return c = this.pushStack(e > 1 ? n.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
            }, filter: function (a) {
                return this.pushStack(z(this, a || [], !1))
            }, not: function (a) {
                return this.pushStack(z(this, a || [], !0))
            }, is: function (a) {
                return !!z(this, "string" == typeof a && w.test(a) ? n(a) : a || [], !1).length
            }
        });
        var A, B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, C = n.fn.init = function (a, b, c) {
            var e, f;
            if (!a) return this;
            if (c = c || A, "string" == typeof a) {
                if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : B.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
                if (e[1]) {
                    if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), x.test(e[1]) && n.isPlainObject(b)) for (e in b) n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
                    return this
                }
                if (f = d.getElementById(e[2]), f && f.parentNode) {
                    if (f.id !== e[2]) return A.find(a);
                    this.length = 1, this[0] = f
                }
                return this.context = d, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof c.ready ? c.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this))
        };
        C.prototype = n.fn, A = n(d);
        var D = /^(?:parents|prev(?:Until|All))/, E = {children: !0, contents: !0, next: !0, prev: !0};
        n.fn.extend({
            has: function (a) {
                var b, c = n(a, this), d = c.length;
                return this.filter(function () {
                    for (b = 0; d > b; b++) if (n.contains(this, c[b])) return !0
                })
            }, closest: function (a, b) {
                for (var c, d = 0, e = this.length, f = [], g = w.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
                    f.push(c);
                    break
                }
                return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f)
            }, index: function (a) {
                return a ? "string" == typeof a ? n.inArray(this[0], n(a)) : n.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            }, add: function (a, b) {
                return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))))
            }, addBack: function (a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
            }
        });

        function F(a, b) {
            do a = a[b]; while (a && 1 !== a.nodeType);
            return a
        }

        n.each({
            parent: function (a) {
                var b = a.parentNode;
                return b && 11 !== b.nodeType ? b : null
            }, parents: function (a) {
                return u(a, "parentNode")
            }, parentsUntil: function (a, b, c) {
                return u(a, "parentNode", c)
            }, next: function (a) {
                return F(a, "nextSibling")
            }, prev: function (a) {
                return F(a, "previousSibling")
            }, nextAll: function (a) {
                return u(a, "nextSibling")
            }, prevAll: function (a) {
                return u(a, "previousSibling")
            }, nextUntil: function (a, b, c) {
                return u(a, "nextSibling", c)
            }, prevUntil: function (a, b, c) {
                return u(a, "previousSibling", c)
            }, siblings: function (a) {
                return v((a.parentNode || {}).firstChild, a)
            }, children: function (a) {
                return v(a.firstChild)
            }, contents: function (a) {
                return n.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : n.merge([], a.childNodes)
            }
        }, function (a, b) {
            n.fn[a] = function (c, d) {
                var e = n.map(this, b, c);
                return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (E[a] || (e = n.uniqueSort(e)), D.test(a) && (e = e.reverse())), this.pushStack(e)
            }
        });
        var G = /\S+/g;

        function H(a) {
            var b = {};
            return n.each(a.match(G) || [], function (a, c) {
                b[c] = !0
            }), b
        }

        n.Callbacks = function (a) {
            a = "string" == typeof a ? H(a) : n.extend({}, a);
            var b, c, d, e, f = [], g = [], h = -1, i = function () {
                for (e = a.once, d = b = !0; g.length; h = -1) {
                    c = g.shift();
                    while (++h < f.length) f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1)
                }
                a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
            }, j = {
                add: function () {
                    return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
                        n.each(b, function (b, c) {
                            n.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== n.type(c) && d(c)
                        })
                    }(arguments), c && !b && i()), this
                }, remove: function () {
                    return n.each(arguments, function (a, b) {
                        var c;
                        while ((c = n.inArray(b, f, c)) > -1) f.splice(c, 1), h >= c && h--
                    }), this
                }, has: function (a) {
                    return a ? n.inArray(a, f) > -1 : f.length > 0
                }, empty: function () {
                    return f && (f = []), this
                }, disable: function () {
                    return e = g = [], f = c = "", this
                }, disabled: function () {
                    return !f
                }, lock: function () {
                    return e = !0, c || j.disable(), this
                }, locked: function () {
                    return !!e
                }, fireWith: function (a, c) {
                    return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this
                }, fire: function () {
                    return j.fireWith(this, arguments), this
                }, fired: function () {
                    return !!d
                }
            };
            return j
        }, n.extend({
            Deferred: function (a) {
                var b = [["resolve", "done", n.Callbacks("once memory"), "resolved"], ["reject", "fail", n.Callbacks("once memory"), "rejected"], ["notify", "progress", n.Callbacks("memory")]],
                    c = "pending", d = {
                        state: function () {
                            return c
                        }, always: function () {
                            return e.done(arguments).fail(arguments), this
                        }, then: function () {
                            var a = arguments;
                            return n.Deferred(function (c) {
                                n.each(b, function (b, f) {
                                    var g = n.isFunction(a[b]) && a[b];
                                    e[f[1]](function () {
                                        var a = g && g.apply(this, arguments);
                                        a && n.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                    })
                                }), a = null
                            }).promise()
                        }, promise: function (a) {
                            return null != a ? n.extend(a, d) : d
                        }
                    }, e = {};
                return d.pipe = d.then, n.each(b, function (a, f) {
                    var g = f[2], h = f[3];
                    d[f[1]] = g.add, h && g.add(function () {
                        c = h
                    }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                        return e[f[0] + "With"](this === e ? d : this, arguments), this
                    }, e[f[0] + "With"] = g.fireWith
                }), d.promise(e), a && a.call(e, e), e
            }, when: function (a) {
                var b = 0, c = e.call(arguments), d = c.length, f = 1 !== d || a && n.isFunction(a.promise) ? d : 0,
                    g = 1 === f ? a : n.Deferred(), h = function (a, b, c) {
                        return function (d) {
                            b[a] = this, c[a] = arguments.length > 1 ? e.call(arguments) : d, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                        }
                    }, i, j, k;
                if (d > 1) for (i = new Array(d), j = new Array(d), k = new Array(d); d > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().progress(h(b, j, i)).done(h(b, k, c)).fail(g.reject) : --f;
                return f || g.resolveWith(k, c), g.promise()
            }
        });
        var I;
        n.fn.ready = function (a) {
            return n.ready.promise().done(a), this
        }, n.extend({
            isReady: !1, readyWait: 1, holdReady: function (a) {
                a ? n.readyWait++ : n.ready(!0)
            }, ready: function (a) {
                (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (I.resolveWith(d, [n]), n.fn.triggerHandler && (n(d).triggerHandler("ready"), n(d).off("ready"))))
            }
        });

        function J() {
            d.addEventListener ? (d.removeEventListener("DOMContentLoaded", K), a.removeEventListener("load", K)) : (d.detachEvent("onreadystatechange", K), a.detachEvent("onload", K))
        }

        function K() {
            (d.addEventListener || "load" === a.event.type || "complete" === d.readyState) && (J(), n.ready())
        }

        n.ready.promise = function (b) {
            if (!I) if (I = n.Deferred(), "complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll) a.setTimeout(n.ready); else if (d.addEventListener) d.addEventListener("DOMContentLoaded", K), a.addEventListener("load", K); else {
                d.attachEvent("onreadystatechange", K), a.attachEvent("onload", K);
                var c = !1;
                try {
                    c = null == a.frameElement && d.documentElement
                } catch (e) {
                }
                c && c.doScroll && !function f() {
                    if (!n.isReady) {
                        try {
                            c.doScroll("left")
                        } catch (b) {
                            return a.setTimeout(f, 50)
                        }
                        J(), n.ready()
                    }
                }()
            }
            return I.promise(b)
        }, n.ready.promise();
        var L;
        for (L in n(l)) break;
        l.ownFirst = "0" === L, l.inlineBlockNeedsLayout = !1, n(function () {
            var a, b, c, e;
            c = d.getElementsByTagName("body")[0], c && c.style && (b = d.createElement("div"), e = d.createElement("div"), e.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(e).appendChild(b), "undefined" != typeof b.style.zoom && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", l.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(e))
        }), function () {
            var a = d.createElement("div");
            l.deleteExpando = !0;
            try {
                delete a.test
            } catch (b) {
                l.deleteExpando = !1
            }
            a = null
        }();
        var M = function (a) {
            var b = n.noData[(a.nodeName + " ").toLowerCase()], c = +a.nodeType || 1;
            return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
        }, N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, O = /([A-Z])/g;

        function P(a, b, c) {
            if (void 0 === c && 1 === a.nodeType) {
                var d = "data-" + b.replace(O, "-$1").toLowerCase();
                if (c = a.getAttribute(d), "string" == typeof c) {
                    try {
                        c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c
                    } catch (e) {
                    }
                    n.data(a, b, c)
                } else c = void 0
            }
            return c
        }

        function Q(a) {
            var b;
            for (b in a) if (("data" !== b || !n.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
            return !0
        }

        function R(a, b, d, e) {
            if (M(a)) {
                var f, g, h = n.expando, i = a.nodeType, j = i ? n.cache : a, k = i ? a[h] : a[h] && h;
                if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || n.guid++ : h), j[k] || (j[k] = i ? {} : {toJSON: n.noop}), "object" != typeof b && "function" != typeof b || (e ? j[k] = n.extend(j[k], b) : j[k].data = n.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[n.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[n.camelCase(b)])) : f = g, f
            }
        }

        function S(a, b, c) {
            if (M(a)) {
                var d, e, f = a.nodeType, g = f ? n.cache : a, h = f ? a[n.expando] : n.expando;
                if (g[h]) {
                    if (b && (d = c ? g[h] : g[h].data)) {
                        n.isArray(b) ? b = b.concat(n.map(b, n.camelCase)) : b in d ? b = [b] : (b = n.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                        while (e--) delete d[b[e]];
                        if (c ? !Q(d) : !n.isEmptyObject(d)) return
                    }
                    (c || (delete g[h].data, Q(g[h]))) && (f ? n.cleanData([a], !0) : l.deleteExpando || g != g.window ? delete g[h] : g[h] = void 0)
                }
            }
        }

        n.extend({
            cache: {},
            noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
            hasData: function (a) {
                return a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando], !!a && !Q(a)
            },
            data: function (a, b, c) {
                return R(a, b, c)
            },
            removeData: function (a, b) {
                return S(a, b)
            },
            _data: function (a, b, c) {
                return R(a, b, c, !0)
            },
            _removeData: function (a, b) {
                return S(a, b, !0)
            }
        }), n.fn.extend({
            data: function (a, b) {
                var c, d, e, f = this[0], g = f && f.attributes;
                if (void 0 === a) {
                    if (this.length && (e = n.data(f), 1 === f.nodeType && !n._data(f, "parsedAttrs"))) {
                        c = g.length;
                        while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), P(f, d, e[d])));
                        n._data(f, "parsedAttrs", !0)
                    }
                    return e
                }
                return "object" == typeof a ? this.each(function () {
                    n.data(this, a)
                }) : arguments.length > 1 ? this.each(function () {
                    n.data(this, a, b)
                }) : f ? P(f, a, n.data(f, a)) : void 0
            }, removeData: function (a) {
                return this.each(function () {
                    n.removeData(this, a)
                })
            }
        }), n.extend({
            queue: function (a, b, c) {
                var d;
                return a ? (b = (b || "fx") + "queue", d = n._data(a, b), c && (!d || n.isArray(c) ? d = n._data(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0
            }, dequeue: function (a, b) {
                b = b || "fx";
                var c = n.queue(a, b), d = c.length, e = c.shift(), f = n._queueHooks(a, b), g = function () {
                    n.dequeue(a, b)
                };
                "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
            }, _queueHooks: function (a, b) {
                var c = b + "queueHooks";
                return n._data(a, c) || n._data(a, c, {
                    empty: n.Callbacks("once memory").add(function () {
                        n._removeData(a, b + "queue"), n._removeData(a, c)
                    })
                })
            }
        }), n.fn.extend({
            queue: function (a, b) {
                var c = 2;
                return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                    var c = n.queue(this, a, b);
                    n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a)
                })
            }, dequeue: function (a) {
                return this.each(function () {
                    n.dequeue(this, a)
                })
            }, clearQueue: function (a) {
                return this.queue(a || "fx", [])
            }, promise: function (a, b) {
                var c, d = 1, e = n.Deferred(), f = this, g = this.length, h = function () {
                    --d || e.resolveWith(f, [f])
                };
                "string" != typeof a && (b = a, a = void 0), a = a || "fx";
                while (g--) c = n._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b)
            }
        }), function () {
            var a;
            l.shrinkWrapBlocks = function () {
                if (null != a) return a;
                a = !1;
                var b, c, e;
                return c = d.getElementsByTagName("body")[0], c && c.style ? (b = d.createElement("div"), e = d.createElement("div"), e.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(e).appendChild(b), "undefined" != typeof b.style.zoom && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(d.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(e), a) : void 0
            }
        }();
        var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, U = new RegExp("^(?:([+-])=|)(" + T + ")([a-z%]*)$", "i"),
            V = ["Top", "Right", "Bottom", "Left"], W = function (a, b) {
                return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
            };

        function X(a, b, c, d) {
            var e, f = 1, g = 20, h = d ? function () {
                    return d.cur()
                } : function () {
                    return n.css(a, b, "")
                }, i = h(), j = c && c[3] || (n.cssNumber[b] ? "" : "px"),
                k = (n.cssNumber[b] || "px" !== j && +i) && U.exec(n.css(a, b));
            if (k && k[3] !== j) {
                j = j || k[3], c = c || [], k = +i || 1;
                do f = f || ".5", k /= f, n.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g)
            }
            return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
        }

        var Y = function (a, b, c, d, e, f, g) {
                var h = 0, i = a.length, j = null == c;
                if ("object" === n.type(c)) {
                    e = !0;
                    for (h in c) Y(a, b, h, c[h], !0, f, g)
                } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
                    return j.call(n(a), c)
                })), b)) for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
            }, Z = /^(?:checkbox|radio)$/i, $ = /<([\w:-]+)/, _ = /^$|\/(?:java|ecma)script/i, aa = /^\s+/,
            ba = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";

        function ca(a) {
            var b = ba.split("|"), c = a.createDocumentFragment();
            if (c.createElement) while (b.length) c.createElement(b.pop());
            return c
        }

        !function () {
            var a = d.createElement("div"), b = d.createDocumentFragment(), c = d.createElement("input");
            a.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", l.leadingWhitespace = 3 === a.firstChild.nodeType, l.tbody = !a.getElementsByTagName("tbody").length, l.htmlSerialize = !!a.getElementsByTagName("link").length, l.html5Clone = "<:nav></:nav>" !== d.createElement("nav").cloneNode(!0).outerHTML, c.type = "checkbox", c.checked = !0, b.appendChild(c), l.appendChecked = c.checked, a.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue, b.appendChild(a), c = d.createElement("input"), c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), a.appendChild(c), l.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, l.noCloneEvent = !!a.addEventListener, a[n.expando] = 1, l.attributes = !a.getAttribute(n.expando)
        }();
        var da = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: l.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        };
        da.optgroup = da.option, da.tbody = da.tfoot = da.colgroup = da.caption = da.thead, da.th = da.td;

        function ea(a, b) {
            var c, d, e = 0,
                f = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : void 0;
            if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, ea(d, b));
            return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], f) : f
        }

        function fa(a, b) {
            for (var c, d = 0; null != (c = a[d]); d++) n._data(c, "globalEval", !b || n._data(b[d], "globalEval"))
        }

        var ga = /<|&#?\w+;/, ha = /<tbody/i;

        function ia(a) {
            Z.test(a.type) && (a.defaultChecked = a.checked)
        }

        function ja(a, b, c, d, e) {
            for (var f, g, h, i, j, k, m, o = a.length, p = ca(b), q = [], r = 0; o > r; r++) if (g = a[r], g || 0 === g) if ("object" === n.type(g)) n.merge(q, g.nodeType ? [g] : g); else if (ga.test(g)) {
                i = i || p.appendChild(b.createElement("div")), j = ($.exec(g) || ["", ""])[1].toLowerCase(), m = da[j] || da._default, i.innerHTML = m[1] + n.htmlPrefilter(g) + m[2], f = m[0];
                while (f--) i = i.lastChild;
                if (!l.leadingWhitespace && aa.test(g) && q.push(b.createTextNode(aa.exec(g)[0])), !l.tbody) {
                    g = "table" !== j || ha.test(g) ? "<table>" !== m[1] || ha.test(g) ? 0 : i : i.firstChild, f = g && g.childNodes.length;
                    while (f--) n.nodeName(k = g.childNodes[f], "tbody") && !k.childNodes.length && g.removeChild(k)
                }
                n.merge(q, i.childNodes), i.textContent = "";
                while (i.firstChild) i.removeChild(i.firstChild);
                i = p.lastChild
            } else q.push(b.createTextNode(g));
            i && p.removeChild(i), l.appendChecked || n.grep(ea(q, "input"), ia), r = 0;
            while (g = q[r++]) if (d && n.inArray(g, d) > -1) e && e.push(g); else if (h = n.contains(g.ownerDocument, g), i = ea(p.appendChild(g), "script"), h && fa(i), c) {
                f = 0;
                while (g = i[f++]) _.test(g.type || "") && c.push(g)
            }
            return i = null, p
        }

        !function () {
            var b, c, e = d.createElement("div");
            for (b in {
                submit: !0,
                change: !0,
                focusin: !0
            }) c = "on" + b, (l[b] = c in a) || (e.setAttribute(c, "t"), l[b] = e.attributes[c].expando === !1);
            e = null
        }();
        var ka = /^(?:input|select|textarea)$/i, la = /^key/, ma = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            na = /^(?:focusinfocus|focusoutblur)$/, oa = /^([^.]*)(?:\.(.+)|)/;

        function pa() {
            return !0
        }

        function qa() {
            return !1
        }

        function ra() {
            try {
                return d.activeElement
            } catch (a) {
            }
        }

        function sa(a, b, c, d, e, f) {
            var g, h;
            if ("object" == typeof b) {
                "string" != typeof c && (d = d || c, c = void 0);
                for (h in b) sa(a, h, c, d, b[h], f);
                return a
            }
            if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = qa; else if (!e) return a;
            return 1 === f && (g = e, e = function (a) {
                return n().off(a), g.apply(this, arguments)
            }, e.guid = g.guid || (g.guid = n.guid++)), a.each(function () {
                n.event.add(this, b, e, d, c)
            })
        }

        n.event = {
            global: {},
            add: function (a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, o, p, q, r = n._data(a);
                if (r) {
                    c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = n.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function (a) {
                        return "undefined" == typeof n || a && n.event.triggered === a.type ? void 0 : n.event.dispatch.apply(k.elem, arguments)
                    }, k.elem = a), b = (b || "").match(G) || [""], h = b.length;
                    while (h--) f = oa.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = n.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = n.event.special[o] || {}, l = n.extend({
                        type: o,
                        origType: q,
                        data: d,
                        handler: c,
                        guid: c.guid,
                        selector: e,
                        needsContext: e && n.expr.match.needsContext.test(e),
                        namespace: p.join(".")
                    }, i), (m = g[o]) || (m = g[o] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), n.event.global[o] = !0);
                    a = null
                }
            },
            remove: function (a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, o, p, q, r = n.hasData(a) && n._data(a);
                if (r && (k = r.events)) {
                    b = (b || "").match(G) || [""], j = b.length;
                    while (j--) if (h = oa.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                        l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length;
                        while (f--) g = m[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                        i && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete k[o])
                    } else for (o in k) n.event.remove(a, o + b[j], c, d, !0);
                    n.isEmptyObject(k) && (delete r.handle, n._removeData(a, "events"))
                }
            },
            trigger: function (b, c, e, f) {
                var g, h, i, j, l, m, o, p = [e || d], q = k.call(b, "type") ? b.type : b,
                    r = k.call(b, "namespace") ? b.namespace.split(".") : [];
                if (i = m = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !na.test(q + n.event.triggered) && (q.indexOf(".") > -1 && (r = q.split("."), q = r.shift(), r.sort()), h = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), b.isTrigger = f ? 2 : 3, b.namespace = r.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : n.makeArray(c, [b]), l = n.event.special[q] || {}, f || !l.trigger || l.trigger.apply(e, c) !== !1)) {
                    if (!f && !l.noBubble && !n.isWindow(e)) {
                        for (j = l.delegateType || q, na.test(j + q) || (i = i.parentNode); i; i = i.parentNode) p.push(i), m = i;
                        m === (e.ownerDocument || d) && p.push(m.defaultView || m.parentWindow || a)
                    }
                    o = 0;
                    while ((i = p[o++]) && !b.isPropagationStopped()) b.type = o > 1 ? j : l.bindType || q, g = (n._data(i, "events") || {})[b.type] && n._data(i, "handle"), g && g.apply(i, c), g = h && i[h], g && g.apply && M(i) && (b.result = g.apply(i, c), b.result === !1 && b.preventDefault());
                    if (b.type = q, !f && !b.isDefaultPrevented() && (!l._default || l._default.apply(p.pop(), c) === !1) && M(e) && h && e[q] && !n.isWindow(e)) {
                        m = e[h], m && (e[h] = null), n.event.triggered = q;
                        try {
                            e[q]()
                        } catch (s) {
                        }
                        n.event.triggered = void 0, m && (e[h] = m)
                    }
                    return b.result
                }
            },
            dispatch: function (a) {
                a = n.event.fix(a);
                var b, c, d, f, g, h = [], i = e.call(arguments), j = (n._data(this, "events") || {})[a.type] || [],
                    k = n.event.special[a.type] || {};
                if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                    h = n.event.handlers.call(this, a, j), b = 0;
                    while ((f = h[b++]) && !a.isPropagationStopped()) {
                        a.currentTarget = f.elem, c = 0;
                        while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped()) a.rnamespace && !a.rnamespace.test(g.namespace) || (a.handleObj = g, a.data = g.data, d = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()))
                    }
                    return k.postDispatch && k.postDispatch.call(this, a), a.result
                }
            },
            handlers: function (a, b) {
                var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
                if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1)) for (; i != this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                    for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) > -1 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
                    d.length && g.push({elem: i, handlers: d})
                }
                return h < b.length && g.push({elem: this, handlers: b.slice(h)}), g
            },
            fix: function (a) {
                if (a[n.expando]) return a;
                var b, c, e, f = a.type, g = a, h = this.fixHooks[f];
                h || (this.fixHooks[f] = h = ma.test(f) ? this.mouseHooks : la.test(f) ? this.keyHooks : {}), e = h.props ? this.props.concat(h.props) : this.props, a = new n.Event(g), b = e.length;
                while (b--) c = e[b], a[c] = g[c];
                return a.target || (a.target = g.srcElement || d), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, h.filter ? h.filter(a, g) : a
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                    return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (a, b) {
                    var c, e, f, g = b.button, h = b.fromElement;
                    return null == a.pageX && null != b.clientX && (e = a.target.ownerDocument || d, f = e.documentElement, c = e.body, a.pageX = b.clientX + (f && f.scrollLeft || c && c.scrollLeft || 0) - (f && f.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (f && f.scrollTop || c && c.scrollTop || 0) - (f && f.clientTop || c && c.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? b.toElement : h), a.which || void 0 === g || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
                }
            },
            special: {
                load: {noBubble: !0}, focus: {
                    trigger: function () {
                        if (this !== ra() && this.focus) try {
                            return this.focus(), !1
                        } catch (a) {
                        }
                    }, delegateType: "focusin"
                }, blur: {
                    trigger: function () {
                        return this === ra() && this.blur ? (this.blur(), !1) : void 0
                    }, delegateType: "focusout"
                }, click: {
                    trigger: function () {
                        return n.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                    }, _default: function (a) {
                        return n.nodeName(a.target, "a")
                    }
                }, beforeunload: {
                    postDispatch: function (a) {
                        void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                    }
                }
            },
            simulate: function (a, b, c) {
                var d = n.extend(new n.Event, c, {type: a, isSimulated: !0});
                n.event.trigger(d, null, b), d.isDefaultPrevented() && c.preventDefault()
            }
        }, n.removeEvent = d.removeEventListener ? function (a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c)
        } : function (a, b, c) {
            var d = "on" + b;
            a.detachEvent && ("undefined" == typeof a[d] && (a[d] = null), a.detachEvent(d, c))
        }, n.Event = function (a, b) {
            return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? pa : qa) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(a, b)
        }, n.Event.prototype = {
            constructor: n.Event,
            isDefaultPrevented: qa,
            isPropagationStopped: qa,
            isImmediatePropagationStopped: qa,
            preventDefault: function () {
                var a = this.originalEvent;
                this.isDefaultPrevented = pa, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
            },
            stopPropagation: function () {
                var a = this.originalEvent;
                this.isPropagationStopped = pa, a && !this.isSimulated && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
            },
            stopImmediatePropagation: function () {
                var a = this.originalEvent;
                this.isImmediatePropagationStopped = pa, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
            }
        }, n.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (a, b) {
            n.event.special[a] = {
                delegateType: b, bindType: b, handle: function (a) {
                    var c, d = this, e = a.relatedTarget, f = a.handleObj;
                    return e && (e === d || n.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                }
            }
        }), l.submit || (n.event.special.submit = {
            setup: function () {
                return n.nodeName(this, "form") ? !1 : void n.event.add(this, "click._submit keypress._submit", function (a) {
                    var b = a.target,
                        c = n.nodeName(b, "input") || n.nodeName(b, "button") ? n.prop(b, "form") : void 0;
                    c && !n._data(c, "submit") && (n.event.add(c, "submit._submit", function (a) {
                        a._submitBubble = !0
                    }), n._data(c, "submit", !0))
                })
            }, postDispatch: function (a) {
                a._submitBubble && (delete a._submitBubble, this.parentNode && !a.isTrigger && n.event.simulate("submit", this.parentNode, a))
            }, teardown: function () {
                return n.nodeName(this, "form") ? !1 : void n.event.remove(this, "._submit")
            }
        }), l.change || (n.event.special.change = {
            setup: function () {
                return ka.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (n.event.add(this, "propertychange._change", function (a) {
                    "checked" === a.originalEvent.propertyName && (this._justChanged = !0)
                }), n.event.add(this, "click._change", function (a) {
                    this._justChanged && !a.isTrigger && (this._justChanged = !1), n.event.simulate("change", this, a)
                })), !1) : void n.event.add(this, "beforeactivate._change", function (a) {
                    var b = a.target;
                    ka.test(b.nodeName) && !n._data(b, "change") && (n.event.add(b, "change._change", function (a) {
                        !this.parentNode || a.isSimulated || a.isTrigger || n.event.simulate("change", this.parentNode, a)
                    }), n._data(b, "change", !0))
                })
            }, handle: function (a) {
                var b = a.target;
                return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
            }, teardown: function () {
                return n.event.remove(this, "._change"), !ka.test(this.nodeName)
            }
        }), l.focusin || n.each({focus: "focusin", blur: "focusout"}, function (a, b) {
            var c = function (a) {
                n.event.simulate(b, a.target, n.event.fix(a))
            };
            n.event.special[b] = {
                setup: function () {
                    var d = this.ownerDocument || this, e = n._data(d, b);
                    e || d.addEventListener(a, c, !0), n._data(d, b, (e || 0) + 1)
                }, teardown: function () {
                    var d = this.ownerDocument || this, e = n._data(d, b) - 1;
                    e ? n._data(d, b, e) : (d.removeEventListener(a, c, !0), n._removeData(d, b))
                }
            }
        }), n.fn.extend({
            on: function (a, b, c, d) {
                return sa(this, a, b, c, d)
            }, one: function (a, b, c, d) {
                return sa(this, a, b, c, d, 1)
            }, off: function (a, b, c) {
                var d, e;
                if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                if ("object" == typeof a) {
                    for (e in a) this.off(e, b, a[e]);
                    return this
                }
                return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = qa), this.each(function () {
                    n.event.remove(this, a, c, b)
                })
            }, trigger: function (a, b) {
                return this.each(function () {
                    n.event.trigger(a, b, this)
                })
            }, triggerHandler: function (a, b) {
                var c = this[0];
                return c ? n.event.trigger(a, b, c, !0) : void 0
            }
        });
        var ta = / jQuery\d+="(?:null|\d+)"/g, ua = new RegExp("<(?:" + ba + ")[\\s/>]", "i"),
            va = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            wa = /<script|<style|<link/i, xa = /checked\s*(?:[^=]|=\s*.checked.)/i, ya = /^true\/(.*)/,
            za = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Aa = ca(d), Ba = Aa.appendChild(d.createElement("div"));

        function Ca(a, b) {
            return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
        }

        function Da(a) {
            return a.type = (null !== n.find.attr(a, "type")) + "/" + a.type, a
        }

        function Ea(a) {
            var b = ya.exec(a.type);
            return b ? a.type = b[1] : a.removeAttribute("type"), a
        }

        function Fa(a, b) {
            if (1 === b.nodeType && n.hasData(a)) {
                var c, d, e, f = n._data(a), g = n._data(b, f), h = f.events;
                if (h) {
                    delete g.handle, g.events = {};
                    for (c in h) for (d = 0, e = h[c].length; e > d; d++) n.event.add(b, c, h[c][d])
                }
                g.data && (g.data = n.extend({}, g.data))
            }
        }

        function Ga(a, b) {
            var c, d, e;
            if (1 === b.nodeType) {
                if (c = b.nodeName.toLowerCase(), !l.noCloneEvent && b[n.expando]) {
                    e = n._data(b);
                    for (d in e.events) n.removeEvent(b, d, e.handle);
                    b.removeAttribute(n.expando)
                }
                "script" === c && b.text !== a.text ? (Da(b).text = a.text, Ea(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), l.html5Clone && a.innerHTML && !n.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Z.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
            }
        }

        function Ha(a, b, c, d) {
            b = f.apply([], b);
            var e, g, h, i, j, k, m = 0, o = a.length, p = o - 1, q = b[0], r = n.isFunction(q);
            if (r || o > 1 && "string" == typeof q && !l.checkClone && xa.test(q)) return a.each(function (e) {
                var f = a.eq(e);
                r && (b[0] = q.call(this, e, f.html())), Ha(f, b, c, d)
            });
            if (o && (k = ja(b, a[0].ownerDocument, !1, a, d), e = k.firstChild, 1 === k.childNodes.length && (k = e), e || d)) {
                for (i = n.map(ea(k, "script"), Da), h = i.length; o > m; m++) g = k, m !== p && (g = n.clone(g, !0, !0), h && n.merge(i, ea(g, "script"))), c.call(a[m], g, m);
                if (h) for (j = i[i.length - 1].ownerDocument, n.map(i, Ea), m = 0; h > m; m++) g = i[m], _.test(g.type || "") && !n._data(g, "globalEval") && n.contains(j, g) && (g.src ? n._evalUrl && n._evalUrl(g.src) : n.globalEval((g.text || g.textContent || g.innerHTML || "").replace(za, "")));
                k = e = null
            }
            return a
        }

        function Ia(a, b, c) {
            for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || n.cleanData(ea(d)), d.parentNode && (c && n.contains(d.ownerDocument, d) && fa(ea(d, "script")), d.parentNode.removeChild(d));
            return a
        }

        n.extend({
            htmlPrefilter: function (a) {
                return a.replace(va, "<$1></$2>")
            }, clone: function (a, b, c) {
                var d, e, f, g, h, i = n.contains(a.ownerDocument, a);
                if (l.html5Clone || n.isXMLDoc(a) || !ua.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Ba.innerHTML = a.outerHTML, Ba.removeChild(f = Ba.firstChild)), !(l.noCloneEvent && l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a))) for (d = ea(f), h = ea(a), g = 0; null != (e = h[g]); ++g) d[g] && Ga(e, d[g]);
                if (b) if (c) for (h = h || ea(a), d = d || ea(f), g = 0; null != (e = h[g]); g++) Fa(e, d[g]); else Fa(a, f);
                return d = ea(f, "script"), d.length > 0 && fa(d, !i && ea(a, "script")), d = h = e = null, f
            }, cleanData: function (a, b) {
                for (var d, e, f, g, h = 0, i = n.expando, j = n.cache, k = l.attributes, m = n.event.special; null != (d = a[h]); h++) if ((b || M(d)) && (f = d[i], g = f && j[f])) {
                    if (g.events) for (e in g.events) m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);
                    j[f] && (delete j[f], k || "undefined" == typeof d.removeAttribute ? d[i] = void 0 : d.removeAttribute(i), c.push(f))
                }
            }
        }), n.fn.extend({
            domManip: Ha, detach: function (a) {
                return Ia(this, a, !0)
            }, remove: function (a) {
                return Ia(this, a)
            }, text: function (a) {
                return Y(this, function (a) {
                    return void 0 === a ? n.text(this) : this.empty().append((this[0] && this[0].ownerDocument || d).createTextNode(a))
                }, null, a, arguments.length)
            }, append: function () {
                return Ha(this, arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = Ca(this, a);
                        b.appendChild(a)
                    }
                })
            }, prepend: function () {
                return Ha(this, arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = Ca(this, a);
                        b.insertBefore(a, b.firstChild)
                    }
                })
            }, before: function () {
                return Ha(this, arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this)
                })
            }, after: function () {
                return Ha(this, arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                })
            }, empty: function () {
                for (var a, b = 0; null != (a = this[b]); b++) {
                    1 === a.nodeType && n.cleanData(ea(a, !1));
                    while (a.firstChild) a.removeChild(a.firstChild);
                    a.options && n.nodeName(a, "select") && (a.options.length = 0)
                }
                return this
            }, clone: function (a, b) {
                return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                    return n.clone(this, a, b)
                })
            }, html: function (a) {
                return Y(this, function (a) {
                    var b = this[0] || {}, c = 0, d = this.length;
                    if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(ta, "") : void 0;
                    if ("string" == typeof a && !wa.test(a) && (l.htmlSerialize || !ua.test(a)) && (l.leadingWhitespace || !aa.test(a)) && !da[($.exec(a) || ["", ""])[1].toLowerCase()]) {
                        a = n.htmlPrefilter(a);
                        try {
                            for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(ea(b, !1)), b.innerHTML = a);
                            b = 0
                        } catch (e) {
                        }
                    }
                    b && this.empty().append(a)
                }, null, a, arguments.length)
            }, replaceWith: function () {
                var a = [];
                return Ha(this, arguments, function (b) {
                    var c = this.parentNode;
                    n.inArray(this, a) < 0 && (n.cleanData(ea(this)), c && c.replaceChild(b, this))
                }, a)
            }
        }), n.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (a, b) {
            n.fn[a] = function (a) {
                for (var c, d = 0, e = [], f = n(a), h = f.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0), n(f[d])[b](c), g.apply(e, c.get());
                return this.pushStack(e)
            }
        });
        var Ja, Ka = {HTML: "block", BODY: "block"};

        function La(a, b) {
            var c = n(b.createElement(a)).appendTo(b.body), d = n.css(c[0], "display");
            return c.detach(), d
        }

        function Ma(a) {
            var b = d, c = Ka[a];
            return c || (c = La(a, b), "none" !== c && c || (Ja = (Ja || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Ja[0].contentWindow || Ja[0].contentDocument).document, b.write(), b.close(), c = La(a, b), Ja.detach()), Ka[a] = c), c
        }

        var Na = /^margin/, Oa = new RegExp("^(" + T + ")(?!px)[a-z%]+$", "i"), Pa = function (a, b, c, d) {
            var e, f, g = {};
            for (f in b) g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e
        }, Qa = d.documentElement;
        !function () {
            var b, c, e, f, g, h, i = d.createElement("div"), j = d.createElement("div");
            if (j.style) {
                j.style.cssText = "float:left;opacity:.5", l.opacity = "0.5" === j.style.opacity, l.cssFloat = !!j.style.cssFloat, j.style.backgroundClip = "content-box", j.cloneNode(!0).style.backgroundClip = "", l.clearCloneStyle = "content-box" === j.style.backgroundClip, i = d.createElement("div"), i.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", j.innerHTML = "", i.appendChild(j), l.boxSizing = "" === j.style.boxSizing || "" === j.style.MozBoxSizing || "" === j.style.WebkitBoxSizing, n.extend(l, {
                    reliableHiddenOffsets: function () {
                        return null == b && k(), f
                    }, boxSizingReliable: function () {
                        return null == b && k(), e
                    }, pixelMarginRight: function () {
                        return null == b && k(), c
                    }, pixelPosition: function () {
                        return null == b && k(), b
                    }, reliableMarginRight: function () {
                        return null == b && k(), g
                    }, reliableMarginLeft: function () {
                        return null == b && k(), h
                    }
                });

                function k() {
                    var k, l, m = d.documentElement;
                    m.appendChild(i), j.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", b = e = h = !1, c = g = !0, a.getComputedStyle && (l = a.getComputedStyle(j), b = "1%" !== (l || {}).top, h = "2px" === (l || {}).marginLeft, e = "4px" === (l || {width: "4px"}).width, j.style.marginRight = "50%", c = "4px" === (l || {marginRight: "4px"}).marginRight, k = j.appendChild(d.createElement("div")), k.style.cssText = j.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", k.style.marginRight = k.style.width = "0", j.style.width = "1px", g = !parseFloat((a.getComputedStyle(k) || {}).marginRight), j.removeChild(k)), j.style.display = "none", f = 0 === j.getClientRects().length, f && (j.style.display = "", j.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", j.childNodes[0].style.borderCollapse = "separate", k = j.getElementsByTagName("td"), k[0].style.cssText = "margin:0;border:0;padding:0;display:none", f = 0 === k[0].offsetHeight, f && (k[0].style.display = "", k[1].style.display = "none", f = 0 === k[0].offsetHeight)), m.removeChild(i)
                }
            }
        }();
        var Ra, Sa, Ta = /^(top|right|bottom|left)$/;
        a.getComputedStyle ? (Ra = function (b) {
            var c = b.ownerDocument.defaultView;
            return c && c.opener || (c = a), c.getComputedStyle(b)
        }, Sa = function (a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || Ra(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, "" !== g && void 0 !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), c && !l.pixelMarginRight() && Oa.test(g) && Na.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f), void 0 === g ? g : g + ""
        }) : Qa.currentStyle && (Ra = function (a) {
            return a.currentStyle
        }, Sa = function (a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || Ra(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Oa.test(g) && !Ta.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
        });

        function Ua(a, b) {
            return {
                get: function () {
                    return a() ? void delete this.get : (this.get = b).apply(this, arguments)
                }
            }
        }

        var Va = /alpha\([^)]*\)/i, Wa = /opacity\s*=\s*([^)]*)/i, Xa = /^(none|table(?!-c[ea]).+)/,
            Ya = new RegExp("^(" + T + ")(.*)$", "i"),
            Za = {position: "absolute", visibility: "hidden", display: "block"},
            $a = {letterSpacing: "0", fontWeight: "400"}, _a = ["Webkit", "O", "Moz", "ms"],
            ab = d.createElement("div").style;

        function bb(a) {
            if (a in ab) return a;
            var b = a.charAt(0).toUpperCase() + a.slice(1), c = _a.length;
            while (c--) if (a = _a[c] + b, a in ab) return a
        }

        function cb(a, b) {
            for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = n._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && W(d) && (f[g] = n._data(d, "olddisplay", Ma(d.nodeName)))) : (e = W(d), (c && "none" !== c || !e) && n._data(d, "olddisplay", e ? c : n.css(d, "display"))));
            for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
            return a
        }

        function db(a, b, c) {
            var d = Ya.exec(b);
            return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
        }

        function eb(a, b, c, d, e) {
            for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += n.css(a, c + V[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + V[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + V[f] + "Width", !0, e))) : (g += n.css(a, "padding" + V[f], !0, e), "padding" !== c && (g += n.css(a, "border" + V[f] + "Width", !0, e)));
            return g
        }

        function fb(a, b, c) {
            var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = Ra(a),
                g = l.boxSizing && "border-box" === n.css(a, "boxSizing", !1, f);
            if (0 >= e || null == e) {
                if (e = Sa(a, b, f), (0 > e || null == e) && (e = a.style[b]), Oa.test(e)) return e;
                d = g && (l.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
            }
            return e + eb(a, b, c || (g ? "border" : "content"), d, f) + "px"
        }

        n.extend({
            cssHooks: {
                opacity: {
                    get: function (a, b) {
                        if (b) {
                            var c = Sa(a, "opacity");
                            return "" === c ? "1" : c
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {"float": l.cssFloat ? "cssFloat" : "styleFloat"},
            style: function (a, b, c, d) {
                if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                    var e, f, g, h = n.camelCase(b), i = a.style;
                    if (b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                    if (f = typeof c, "string" === f && (e = U.exec(c)) && e[1] && (c = X(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (n.cssNumber[h] ? "" : "px")), l.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                        i[b] = c
                    } catch (j) {
                    }
                }
            },
            css: function (a, b, c, d) {
                var e, f, g, h = n.camelCase(b);
                return b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Sa(a, b, d)), "normal" === f && b in $a && (f = $a[b]), "" === c || c ? (e = parseFloat(f), c === !0 || isFinite(e) ? e || 0 : f) : f
            }
        }), n.each(["height", "width"], function (a, b) {
            n.cssHooks[b] = {
                get: function (a, c, d) {
                    return c ? Xa.test(n.css(a, "display")) && 0 === a.offsetWidth ? Pa(a, Za, function () {
                        return fb(a, b, d)
                    }) : fb(a, b, d) : void 0
                }, set: function (a, c, d) {
                    var e = d && Ra(a);
                    return db(a, c, d ? eb(a, b, d, l.boxSizing && "border-box" === n.css(a, "boxSizing", !1, e), e) : 0)
                }
            }
        }), l.opacity || (n.cssHooks.opacity = {
            get: function (a, b) {
                return Wa.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
            }, set: function (a, b) {
                var c = a.style, d = a.currentStyle, e = n.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                    f = d && d.filter || c.filter || "";
                c.zoom = 1, (b >= 1 || "" === b) && "" === n.trim(f.replace(Va, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Va.test(f) ? f.replace(Va, e) : f + " " + e)
            }
        }), n.cssHooks.marginRight = Ua(l.reliableMarginRight, function (a, b) {
            return b ? Pa(a, {display: "inline-block"}, Sa, [a, "marginRight"]) : void 0
        }), n.cssHooks.marginLeft = Ua(l.reliableMarginLeft, function (a, b) {
            return b ? (parseFloat(Sa(a, "marginLeft")) || (n.contains(a.ownerDocument, a) ? a.getBoundingClientRect().left - Pa(a, {marginLeft: 0}, function () {
                return a.getBoundingClientRect().left
            }) : 0)) + "px" : void 0
        }), n.each({margin: "", padding: "", border: "Width"}, function (a, b) {
            n.cssHooks[a + b] = {
                expand: function (c) {
                    for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + V[d] + b] = f[d] || f[d - 2] || f[0];
                    return e
                }
            }, Na.test(a) || (n.cssHooks[a + b].set = db)
        }), n.fn.extend({
            css: function (a, b) {
                return Y(this, function (a, b, c) {
                    var d, e, f = {}, g = 0;
                    if (n.isArray(b)) {
                        for (d = Ra(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);
                        return f
                    }
                    return void 0 !== c ? n.style(a, b, c) : n.css(a, b)
                }, a, b, arguments.length > 1)
            }, show: function () {
                return cb(this, !0)
            }, hide: function () {
                return cb(this)
            }, toggle: function (a) {
                return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                    W(this) ? n(this).show() : n(this).hide()
                })
            }
        });

        function gb(a, b, c, d, e) {
            return new gb.prototype.init(a, b, c, d, e)
        }

        n.Tween = gb, gb.prototype = {
            constructor: gb, init: function (a, b, c, d, e, f) {
                this.elem = a, this.prop = c, this.easing = e || n.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px")
            }, cur: function () {
                var a = gb.propHooks[this.prop];
                return a && a.get ? a.get(this) : gb.propHooks._default.get(this)
            }, run: function (a) {
                var b, c = gb.propHooks[this.prop];
                return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : gb.propHooks._default.set(this), this
            }
        }, gb.prototype.init.prototype = gb.prototype, gb.propHooks = {
            _default: {
                get: function (a) {
                    var b;
                    return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
                }, set: function (a) {
                    n.fx.step[a.prop] ? n.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[n.cssProps[a.prop]] && !n.cssHooks[a.prop] ? a.elem[a.prop] = a.now : n.style(a.elem, a.prop, a.now + a.unit)
                }
            }
        }, gb.propHooks.scrollTop = gb.propHooks.scrollLeft = {
            set: function (a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
            }
        }, n.easing = {
            linear: function (a) {
                return a
            }, swing: function (a) {
                return .5 - Math.cos(a * Math.PI) / 2
            }, _default: "swing"
        }, n.fx = gb.prototype.init, n.fx.step = {};
        var hb, ib, jb = /^(?:toggle|show|hide)$/, kb = /queueHooks$/;

        function lb() {
            return a.setTimeout(function () {
                hb = void 0
            }), hb = n.now()
        }

        function mb(a, b) {
            var c, d = {height: a}, e = 0;
            for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = V[e], d["margin" + c] = d["padding" + c] = a;
            return b && (d.opacity = d.width = a), d
        }

        function nb(a, b, c) {
            for (var d, e = (qb.tweeners[b] || []).concat(qb.tweeners["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d
        }

        function ob(a, b, c) {
            var d, e, f, g, h, i, j, k, m = this, o = {}, p = a.style, q = a.nodeType && W(a), r = n._data(a, "fxshow");
            c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
                h.unqueued || i()
            }), h.unqueued++, m.always(function () {
                m.always(function () {
                    h.unqueued--, n.queue(a, "fx").length || h.empty.fire()
                })
            })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = n.css(a, "display"), k = "none" === j ? n._data(a, "olddisplay") || Ma(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (l.inlineBlockNeedsLayout && "inline" !== Ma(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", l.shrinkWrapBlocks() || m.always(function () {
                p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]
            }));
            for (d in b) if (e = b[d], jb.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                    if ("show" !== e || !r || void 0 === r[d]) continue;
                    q = !0
                }
                o[d] = r && r[d] || n.style(a, d)
            } else j = void 0;
            if (n.isEmptyObject(o)) "inline" === ("none" === j ? Ma(a.nodeName) : j) && (p.display = j); else {
                r ? "hidden" in r && (q = r.hidden) : r = n._data(a, "fxshow", {}), f && (r.hidden = !q), q ? n(a).show() : m.done(function () {
                    n(a).hide()
                }), m.done(function () {
                    var b;
                    n._removeData(a, "fxshow");
                    for (b in o) n.style(a, b, o[b])
                });
                for (d in o) g = nb(q ? r[d] : 0, d, m), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
            }
        }

        function pb(a, b) {
            var c, d, e, f, g;
            for (c in a) if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
        }

        function qb(a, b, c) {
            var d, e, f = 0, g = qb.prefilters.length, h = n.Deferred().always(function () {
                delete i.elem
            }), i = function () {
                if (e) return !1;
                for (var b = hb || lb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            }, j = h.promise({
                elem: a,
                props: n.extend({}, b),
                opts: n.extend(!0, {specialEasing: {}, easing: n.easing._default}, c),
                originalProperties: b,
                originalOptions: c,
                startTime: hb || lb(),
                duration: c.duration,
                tweens: [],
                createTween: function (b, c) {
                    var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function (b) {
                    var c = 0, d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
                }
            }), k = j.props;
            for (pb(k, j.opts.specialEasing); g > f; f++) if (d = qb.prefilters[f].call(j, a, k, j.opts)) return n.isFunction(d.stop) && (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)), d;
            return n.map(k, nb, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
                elem: a,
                anim: j,
                queue: j.opts.queue
            })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        }

        n.Animation = n.extend(qb, {
            tweeners: {
                "*": [function (a, b) {
                    var c = this.createTween(a, b);
                    return X(c.elem, a, U.exec(b), c), c
                }]
            }, tweener: function (a, b) {
                n.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(G);
                for (var c, d = 0, e = a.length; e > d; d++) c = a[d], qb.tweeners[c] = qb.tweeners[c] || [], qb.tweeners[c].unshift(b)
            }, prefilters: [ob], prefilter: function (a, b) {
                b ? qb.prefilters.unshift(a) : qb.prefilters.push(a)
            }
        }), n.speed = function (a, b, c) {
            var d = a && "object" == typeof a ? n.extend({}, a) : {
                complete: c || !c && b || n.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !n.isFunction(b) && b
            };
            return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
                n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue)
            }, d
        }, n.fn.extend({
            fadeTo: function (a, b, c, d) {
                return this.filter(W).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
            }, animate: function (a, b, c, d) {
                var e = n.isEmptyObject(a), f = n.speed(b, c, d), g = function () {
                    var b = qb(this, n.extend({}, a), f);
                    (e || n._data(this, "finish")) && b.stop(!0)
                };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            }, stop: function (a, b, c) {
                var d = function (a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                    var b = !0, e = null != a && a + "queueHooks", f = n.timers, g = n._data(this);
                    if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && kb.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    !b && c || n.dequeue(this, a)
                })
            }, finish: function (a) {
                return a !== !1 && (a = a || "fx"), this.each(function () {
                    var b, c = n._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = n.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), n.each(["toggle", "show", "hide"], function (a, b) {
            var c = n.fn[b];
            n.fn[b] = function (a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(mb(b, !0), a, d, e)
            }
        }), n.each({
            slideDown: mb("show"),
            slideUp: mb("hide"),
            slideToggle: mb("toggle"),
            fadeIn: {opacity: "show"},
            fadeOut: {opacity: "hide"},
            fadeToggle: {opacity: "toggle"}
        }, function (a, b) {
            n.fn[a] = function (a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), n.timers = [], n.fx.tick = function () {
            var a, b = n.timers, c = 0;
            for (hb = n.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
            b.length || n.fx.stop(), hb = void 0
        }, n.fx.timer = function (a) {
            n.timers.push(a), a() ? n.fx.start() : n.timers.pop()
        }, n.fx.interval = 13, n.fx.start = function () {
            ib || (ib = a.setInterval(n.fx.tick, n.fx.interval))
        }, n.fx.stop = function () {
            a.clearInterval(ib), ib = null
        }, n.fx.speeds = {slow: 600, fast: 200, _default: 400}, n.fn.delay = function (b, c) {
            return b = n.fx ? n.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
                var e = a.setTimeout(c, b);
                d.stop = function () {
                    a.clearTimeout(e)
                }
            })
        }, function () {
            var a, b = d.createElement("input"), c = d.createElement("div"), e = d.createElement("select"),
                f = e.appendChild(d.createElement("option"));
            c = d.createElement("div"), c.setAttribute("className", "t"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = c.getElementsByTagName("a")[0], b.setAttribute("type", "checkbox"), c.appendChild(b), a = c.getElementsByTagName("a")[0], a.style.cssText = "top:1px", l.getSetAttribute = "t" !== c.className, l.style = /top/.test(a.getAttribute("style")), l.hrefNormalized = "/a" === a.getAttribute("href"), l.checkOn = !!b.value, l.optSelected = f.selected, l.enctype = !!d.createElement("form").enctype, e.disabled = !0, l.optDisabled = !f.disabled, b = d.createElement("input"), b.setAttribute("value", ""), l.input = "" === b.getAttribute("value"), b.value = "t", b.setAttribute("type", "radio"), l.radioValue = "t" === b.value
        }();
        var rb = /\r/g, sb = /[\x20\t\r\n\f]+/g;
        n.fn.extend({
            val: function (a) {
                var b, c, d, e = this[0];
                {
                    if (arguments.length) return d = n.isFunction(a), this.each(function (c) {
                        var e;
                        1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function (a) {
                            return null == a ? "" : a + ""
                        })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                    });
                    if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(rb, "") : null == c ? "" : c)
                }
            }
        }), n.extend({
            valHooks: {
                option: {
                    get: function (a) {
                        var b = n.find.attr(a, "value");
                        return null != b ? b : n.trim(n.text(a)).replace(sb, " ")
                    }
                }, select: {
                    get: function (a) {
                        for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], (c.selected || i === e) && (l.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !n.nodeName(c.parentNode, "optgroup"))) {
                            if (b = n(c).val(), f) return b;
                            g.push(b)
                        }
                        return g
                    }, set: function (a, b) {
                        var c, d, e = a.options, f = n.makeArray(b), g = e.length;
                        while (g--) if (d = e[g], n.inArray(n.valHooks.option.get(d), f) > -1) try {
                            d.selected = c = !0
                        } catch (h) {
                            d.scrollHeight
                        } else d.selected = !1;
                        return c || (a.selectedIndex = -1), e
                    }
                }
            }
        }), n.each(["radio", "checkbox"], function () {
            n.valHooks[this] = {
                set: function (a, b) {
                    return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) > -1 : void 0
                }
            }, l.checkOn || (n.valHooks[this].get = function (a) {
                return null === a.getAttribute("value") ? "on" : a.value
            })
        });
        var tb, ub, vb = n.expr.attrHandle, wb = /^(?:checked|selected)$/i, xb = l.getSetAttribute, yb = l.input;
        n.fn.extend({
            attr: function (a, b) {
                return Y(this, n.attr, a, b, arguments.length > 1)
            }, removeAttr: function (a) {
                return this.each(function () {
                    n.removeAttr(this, a)
                })
            }
        }), n.extend({
            attr: function (a, b, c) {
                var d, e, f = a.nodeType;
                if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), e = n.attrHooks[b] || (n.expr.match.bool.test(b) ? ub : tb)), void 0 !== c ? null === c ? void n.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = n.find.attr(a, b), null == d ? void 0 : d))
            }, attrHooks: {
                type: {
                    set: function (a, b) {
                        if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b
                        }
                    }
                }
            }, removeAttr: function (a, b) {
                var c, d, e = 0, f = b && b.match(G);
                if (f && 1 === a.nodeType) while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) ? yb && xb || !wb.test(c) ? a[d] = !1 : a[n.camelCase("default-" + c)] = a[d] = !1 : n.attr(a, c, ""), a.removeAttribute(xb ? c : d)
            }
        }), ub = {
            set: function (a, b, c) {
                return b === !1 ? n.removeAttr(a, c) : yb && xb || !wb.test(c) ? a.setAttribute(!xb && n.propFix[c] || c, c) : a[n.camelCase("default-" + c)] = a[c] = !0, c
            }
        }, n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
            var c = vb[b] || n.find.attr;
            yb && xb || !wb.test(b) ? vb[b] = function (a, b, d) {
                var e, f;
                return d || (f = vb[b], vb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, vb[b] = f), e
            } : vb[b] = function (a, b, c) {
                return c ? void 0 : a[n.camelCase("default-" + b)] ? b.toLowerCase() : null
            }
        }), yb && xb || (n.attrHooks.value = {
            set: function (a, b, c) {
                return n.nodeName(a, "input") ? void (a.defaultValue = b) : tb && tb.set(a, b, c)
            }
        }), xb || (tb = {
            set: function (a, b, c) {
                var d = a.getAttributeNode(c);
                return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
            }
        }, vb.id = vb.name = vb.coords = function (a, b, c) {
            var d;
            return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
        }, n.valHooks.button = {
            get: function (a, b) {
                var c = a.getAttributeNode(b);
                return c && c.specified ? c.value : void 0
            }, set: tb.set
        }, n.attrHooks.contenteditable = {
            set: function (a, b, c) {
                tb.set(a, "" === b ? !1 : b, c)
            }
        }, n.each(["width", "height"], function (a, b) {
            n.attrHooks[b] = {
                set: function (a, c) {
                    return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
                }
            }
        })), l.style || (n.attrHooks.style = {
            get: function (a) {
                return a.style.cssText || void 0
            }, set: function (a, b) {
                return a.style.cssText = b + ""
            }
        });
        var zb = /^(?:input|select|textarea|button|object)$/i, Ab = /^(?:a|area)$/i;
        n.fn.extend({
            prop: function (a, b) {
                return Y(this, n.prop, a, b, arguments.length > 1)
            }, removeProp: function (a) {
                return a = n.propFix[a] || a, this.each(function () {
                    try {
                        this[a] = void 0, delete this[a]
                    } catch (b) {
                    }
                })
            }
        }), n.extend({
            prop: function (a, b, c) {
                var d, e, f = a.nodeType;
                if (3 !== f && 8 !== f && 2 !== f) return 1 === f && n.isXMLDoc(a) || (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
            }, propHooks: {
                tabIndex: {
                    get: function (a) {
                        var b = n.find.attr(a, "tabindex");
                        return b ? parseInt(b, 10) : zb.test(a.nodeName) || Ab.test(a.nodeName) && a.href ? 0 : -1
                    }
                }
            }, propFix: {"for": "htmlFor", "class": "className"}
        }), l.hrefNormalized || n.each(["href", "src"], function (a, b) {
            n.propHooks[b] = {
                get: function (a) {
                    return a.getAttribute(b, 4)
                }
            }
        }), l.optSelected || (n.propHooks.selected = {
            get: function (a) {
                var b = a.parentNode;
                return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
            }, set: function (a) {
                var b = a.parentNode;
                b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
            }
        }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            n.propFix[this.toLowerCase()] = this
        }), l.enctype || (n.propFix.enctype = "encoding");
        var Bb = /[\t\r\n\f]/g;

        function Cb(a) {
            return n.attr(a, "class") || ""
        }

        n.fn.extend({
            addClass: function (a) {
                var b, c, d, e, f, g, h, i = 0;
                if (n.isFunction(a)) return this.each(function (b) {
                    n(this).addClass(a.call(this, b, Cb(this)))
                });
                if ("string" == typeof a && a) {
                    b = a.match(G) || [];
                    while (c = this[i++]) if (e = Cb(c), d = 1 === c.nodeType && (" " + e + " ").replace(Bb, " ")) {
                        g = 0;
                        while (f = b[g++]) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                        h = n.trim(d), e !== h && n.attr(c, "class", h)
                    }
                }
                return this
            }, removeClass: function (a) {
                var b, c, d, e, f, g, h, i = 0;
                if (n.isFunction(a)) return this.each(function (b) {
                    n(this).removeClass(a.call(this, b, Cb(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof a && a) {
                    b = a.match(G) || [];
                    while (c = this[i++]) if (e = Cb(c), d = 1 === c.nodeType && (" " + e + " ").replace(Bb, " ")) {
                        g = 0;
                        while (f = b[g++]) while (d.indexOf(" " + f + " ") > -1) d = d.replace(" " + f + " ", " ");
                        h = n.trim(d), e !== h && n.attr(c, "class", h)
                    }
                }
                return this
            }, toggleClass: function (a, b) {
                var c = typeof a;
                return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : n.isFunction(a) ? this.each(function (c) {
                    n(this).toggleClass(a.call(this, c, Cb(this), b), b)
                }) : this.each(function () {
                    var b, d, e, f;
                    if ("string" === c) {
                        d = 0, e = n(this), f = a.match(G) || [];
                        while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                    } else void 0 !== a && "boolean" !== c || (b = Cb(this), b && n._data(this, "__className__", b), n.attr(this, "class", b || a === !1 ? "" : n._data(this, "__className__") || ""))
                })
            }, hasClass: function (a) {
                var b, c, d = 0;
                b = " " + a + " ";
                while (c = this[d++]) if (1 === c.nodeType && (" " + Cb(c) + " ").replace(Bb, " ").indexOf(b) > -1) return !0;
                return !1
            }
        }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
            n.fn[b] = function (a, c) {
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }
        }), n.fn.extend({
            hover: function (a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            }
        });
        var Db = a.location, Eb = n.now(), Fb = /\?/,
            Gb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        n.parseJSON = function (b) {
            if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
            var c, d = null, e = n.trim(b + "");
            return e && !n.trim(e.replace(Gb, function (a, b, e, f) {
                return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
            })) ? Function("return " + e)() : n.error("Invalid JSON: " + b)
        }, n.parseXML = function (b) {
            var c, d;
            if (!b || "string" != typeof b) return null;
            try {
                a.DOMParser ? (d = new a.DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new a.ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
            } catch (e) {
                c = void 0
            }
            return c && c.documentElement && !c.getElementsByTagName("parsererror").length || n.error("Invalid XML: " + b), c
        };
        var Hb = /#.*$/, Ib = /([?&])_=[^&]*/, Jb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Kb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Lb = /^(?:GET|HEAD)$/, Mb = /^\/\//,
            Nb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Ob = {}, Pb = {}, Qb = "*/".concat("*"),
            Rb = Db.href, Sb = Nb.exec(Rb.toLowerCase()) || [];

        function Tb(a) {
            return function (b, c) {
                "string" != typeof b && (c = b, b = "*");
                var d, e = 0, f = b.toLowerCase().match(G) || [];
                if (n.isFunction(c)) while (d = f[e++]) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
            }
        }

        function Ub(a, b, c, d) {
            var e = {}, f = a === Pb;

            function g(h) {
                var i;
                return e[h] = !0, n.each(a[h] || [], function (a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
                }), i
            }

            return g(b.dataTypes[0]) || !e["*"] && g("*")
        }

        function Vb(a, b) {
            var c, d, e = n.ajaxSettings.flatOptions || {};
            for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
            return c && n.extend(!0, a, c), a
        }

        function Wb(a, b, c) {
            var d, e, f, g, h = a.contents, i = a.dataTypes;
            while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
            if (e) for (g in h) if (h[g] && h[g].test(e)) {
                i.unshift(g);
                break
            }
            if (i[0] in c) f = i[0]; else {
                for (g in c) {
                    if (!i[0] || a.converters[g + " " + i[0]]) {
                        f = g;
                        break
                    }
                    d || (d = g)
                }
                f = f || d
            }
            return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
        }

        function Xb(a, b, c, d) {
            var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
            if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
            f = k.shift();
            while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) {
                if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                    g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                    break
                }
                if (g !== !0) if (g && a["throws"]) b = g(b); else try {
                    b = g(b)
                } catch (l) {
                    return {state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f}
                }
            }
            return {state: "success", data: b}
        }

        n.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Rb,
                type: "GET",
                isLocal: Kb.test(Sb[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Qb,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                converters: {"* text": String, "text html": !0, "text json": n.parseJSON, "text xml": n.parseXML},
                flatOptions: {url: !0, context: !0}
            },
            ajaxSetup: function (a, b) {
                return b ? Vb(Vb(a, n.ajaxSettings), b) : Vb(n.ajaxSettings, a)
            },
            ajaxPrefilter: Tb(Ob),
            ajaxTransport: Tb(Pb),
            ajax: function (b, c) {
                "object" == typeof b && (c = b, b = void 0), c = c || {};
                var d, e, f, g, h, i, j, k, l = n.ajaxSetup({}, c), m = l.context || l,
                    o = l.context && (m.nodeType || m.jquery) ? n(m) : n.event, p = n.Deferred(),
                    q = n.Callbacks("once memory"), r = l.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {
                        readyState: 0, getResponseHeader: function (a) {
                            var b;
                            if (2 === u) {
                                if (!k) {
                                    k = {};
                                    while (b = Jb.exec(g)) k[b[1].toLowerCase()] = b[2]
                                }
                                b = k[a.toLowerCase()]
                            }
                            return null == b ? null : b
                        }, getAllResponseHeaders: function () {
                            return 2 === u ? g : null
                        }, setRequestHeader: function (a, b) {
                            var c = a.toLowerCase();
                            return u || (a = t[c] = t[c] || a, s[a] = b), this
                        }, overrideMimeType: function (a) {
                            return u || (l.mimeType = a), this
                        }, statusCode: function (a) {
                            var b;
                            if (a) if (2 > u) for (b in a) r[b] = [r[b], a[b]]; else w.always(a[w.status]);
                            return this
                        }, abort: function (a) {
                            var b = a || v;
                            return j && j.abort(b), y(0, b), this
                        }
                    };
                if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, l.url = ((b || l.url || Rb) + "").replace(Hb, "").replace(Mb, Sb[1] + "//"), l.type = c.method || c.type || l.method || l.type, l.dataTypes = n.trim(l.dataType || "*").toLowerCase().match(G) || [""], null == l.crossDomain && (d = Nb.exec(l.url.toLowerCase()), l.crossDomain = !(!d || d[1] === Sb[1] && d[2] === Sb[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Sb[3] || ("http:" === Sb[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = n.param(l.data, l.traditional)), Ub(Ob, l, c, w), 2 === u) return w;
                i = n.event && l.global, i && 0 === n.active++ && n.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Lb.test(l.type), f = l.url, l.hasContent || (l.data && (f = l.url += (Fb.test(f) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Ib.test(f) ? f.replace(Ib, "$1_=" + Eb++) : f + (Fb.test(f) ? "&" : "?") + "_=" + Eb++)), l.ifModified && (n.lastModified[f] && w.setRequestHeader("If-Modified-Since", n.lastModified[f]), n.etag[f] && w.setRequestHeader("If-None-Match", n.etag[f])), (l.data && l.hasContent && l.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", l.contentType), w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Qb + "; q=0.01" : "") : l.accepts["*"]);
                for (e in l.headers) w.setRequestHeader(e, l.headers[e]);
                if (l.beforeSend && (l.beforeSend.call(m, w, l) === !1 || 2 === u)) return w.abort();
                v = "abort";
                for (e in {success: 1, error: 1, complete: 1}) w[e](l[e]);
                if (j = Ub(Pb, l, c, w)) {
                    if (w.readyState = 1, i && o.trigger("ajaxSend", [w, l]), 2 === u) return w;
                    l.async && l.timeout > 0 && (h = a.setTimeout(function () {
                        w.abort("timeout")
                    }, l.timeout));
                    try {
                        u = 1, j.send(s, y)
                    } catch (x) {
                        if (!(2 > u)) throw x;
                        y(-1, x)
                    }
                } else y(-1, "No Transport");

                function y(b, c, d, e) {
                    var k, s, t, v, x, y = c;
                    2 !== u && (u = 2, h && a.clearTimeout(h), j = void 0, g = e || "", w.readyState = b > 0 ? 4 : 0, k = b >= 200 && 300 > b || 304 === b, d && (v = Wb(l, w, d)), v = Xb(l, v, w, k), k ? (l.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (n.lastModified[f] = x), x = w.getResponseHeader("etag"), x && (n.etag[f] = x)), 204 === b || "HEAD" === l.type ? y = "nocontent" : 304 === b ? y = "notmodified" : (y = v.state, s = v.data, t = v.error, k = !t)) : (t = y, !b && y || (y = "error", 0 > b && (b = 0))), w.status = b, w.statusText = (c || y) + "", k ? p.resolveWith(m, [s, y, w]) : p.rejectWith(m, [w, y, t]), w.statusCode(r), r = void 0, i && o.trigger(k ? "ajaxSuccess" : "ajaxError", [w, l, k ? s : t]), q.fireWith(m, [w, y]), i && (o.trigger("ajaxComplete", [w, l]), --n.active || n.event.trigger("ajaxStop")))
                }

                return w
            },
            getJSON: function (a, b, c) {
                return n.get(a, b, c, "json")
            },
            getScript: function (a, b) {
                return n.get(a, void 0, b, "script")
            }
        }), n.each(["get", "post"], function (a, b) {
            n[b] = function (a, c, d, e) {
                return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax(n.extend({
                    url: a,
                    type: b,
                    dataType: e,
                    data: c,
                    success: d
                }, n.isPlainObject(a) && a))
            }
        }), n._evalUrl = function (a) {
            return n.ajax({url: a, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0})
        }, n.fn.extend({
            wrapAll: function (a) {
                if (n.isFunction(a)) return this.each(function (b) {
                    n(this).wrapAll(a.call(this, b))
                });
                if (this[0]) {
                    var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                        var a = this;
                        while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
                        return a
                    }).append(this)
                }
                return this
            }, wrapInner: function (a) {
                return n.isFunction(a) ? this.each(function (b) {
                    n(this).wrapInner(a.call(this, b))
                }) : this.each(function () {
                    var b = n(this), c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            }, wrap: function (a) {
                var b = n.isFunction(a);
                return this.each(function (c) {
                    n(this).wrapAll(b ? a.call(this, c) : a)
                })
            }, unwrap: function () {
                return this.parent().each(function () {
                    n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
                }).end()
            }
        });

        function Yb(a) {
            return a.style && a.style.display || n.css(a, "display")
        }

        function Zb(a) {
            if (!n.contains(a.ownerDocument || d, a)) return !0;
            while (a && 1 === a.nodeType) {
                if ("none" === Yb(a) || "hidden" === a.type) return !0;
                a = a.parentNode
            }
            return !1
        }

        n.expr.filters.hidden = function (a) {
            return l.reliableHiddenOffsets() ? a.offsetWidth <= 0 && a.offsetHeight <= 0 && !a.getClientRects().length : Zb(a)
        }, n.expr.filters.visible = function (a) {
            return !n.expr.filters.hidden(a)
        };
        var $b = /%20/g, _b = /\[\]$/, ac = /\r?\n/g, bc = /^(?:submit|button|image|reset|file)$/i,
            cc = /^(?:input|select|textarea|keygen)/i;

        function dc(a, b, c, d) {
            var e;
            if (n.isArray(b)) n.each(b, function (b, e) {
                c || _b.test(a) ? d(a, e) : dc(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
            }); else if (c || "object" !== n.type(b)) d(a, b); else for (e in b) dc(a + "[" + e + "]", b[e], c, d)
        }

        n.param = function (a, b) {
            var c, d = [], e = function (a, b) {
                b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
            if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function () {
                e(this.name, this.value)
            }); else for (c in a) dc(c, a[c], b, e);
            return d.join("&").replace($b, "+")
        }, n.fn.extend({
            serialize: function () {
                return n.param(this.serializeArray())
            }, serializeArray: function () {
                return this.map(function () {
                    var a = n.prop(this, "elements");
                    return a ? n.makeArray(a) : this
                }).filter(function () {
                    var a = this.type;
                    return this.name && !n(this).is(":disabled") && cc.test(this.nodeName) && !bc.test(a) && (this.checked || !Z.test(a))
                }).map(function (a, b) {
                    var c = n(this).val();
                    return null == c ? null : n.isArray(c) ? n.map(c, function (a) {
                        return {name: b.name, value: a.replace(ac, "\r\n")}
                    }) : {name: b.name, value: c.replace(ac, "\r\n")}
                }).get()
            }
        }), n.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
            return this.isLocal ? ic() : d.documentMode > 8 ? hc() : /^(get|post|head|put|delete|options)$/i.test(this.type) && hc() || ic()
        } : hc;
        var ec = 0, fc = {}, gc = n.ajaxSettings.xhr();
        a.attachEvent && a.attachEvent("onunload", function () {
            for (var a in fc) fc[a](void 0, !0)
        }), l.cors = !!gc && "withCredentials" in gc, gc = l.ajax = !!gc, gc && n.ajaxTransport(function (b) {
            if (!b.crossDomain || l.cors) {
                var c;
                return {
                    send: function (d, e) {
                        var f, g = b.xhr(), h = ++ec;
                        if (g.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (f in b.xhrFields) g[f] = b.xhrFields[f];
                        b.mimeType && g.overrideMimeType && g.overrideMimeType(b.mimeType), b.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");
                        for (f in d) void 0 !== d[f] && g.setRequestHeader(f, d[f] + "");
                        g.send(b.hasContent && b.data || null), c = function (a, d) {
                            var f, i, j;
                            if (c && (d || 4 === g.readyState)) if (delete fc[h], c = void 0, g.onreadystatechange = n.noop, d) 4 !== g.readyState && g.abort(); else {
                                j = {}, f = g.status, "string" == typeof g.responseText && (j.text = g.responseText);
                                try {
                                    i = g.statusText
                                } catch (k) {
                                    i = ""
                                }
                                f || !b.isLocal || b.crossDomain ? 1223 === f && (f = 204) : f = j.text ? 200 : 404
                            }
                            j && e(f, i, j, g.getAllResponseHeaders())
                        }, b.async ? 4 === g.readyState ? a.setTimeout(c) : g.onreadystatechange = fc[h] = c : c()
                    }, abort: function () {
                        c && c(void 0, !0)
                    }
                }
            }
        });

        function hc() {
            try {
                return new a.XMLHttpRequest
            } catch (b) {
            }
        }

        function ic() {
            try {
                return new a.ActiveXObject("Microsoft.XMLHTTP")
            } catch (b) {
            }
        }

        n.ajaxSetup({
            accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
            contents: {script: /\b(?:java|ecma)script\b/},
            converters: {
                "text script": function (a) {
                    return n.globalEval(a), a
                }
            }
        }), n.ajaxPrefilter("script", function (a) {
            void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
        }), n.ajaxTransport("script", function (a) {
            if (a.crossDomain) {
                var b, c = d.head || n("head")[0] || d.documentElement;
                return {
                    send: function (e, f) {
                        b = d.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
                            (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || f(200, "success"))
                        }, c.insertBefore(b, c.firstChild)
                    }, abort: function () {
                        b && b.onload(void 0, !0)
                    }
                }
            }
        });
        var jc = [], kc = /(=)\?(?=&|$)|\?\?/;
        n.ajaxSetup({
            jsonp: "callback", jsonpCallback: function () {
                var a = jc.pop() || n.expando + "_" + Eb++;
                return this[a] = !0, a
            }
        }), n.ajaxPrefilter("json jsonp", function (b, c, d) {
            var e, f, g,
                h = b.jsonp !== !1 && (kc.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && kc.test(b.data) && "data");
            return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(kc, "$1" + e) : b.jsonp !== !1 && (b.url += (Fb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
                return g || n.error(e + " was not called"), g[0]
            }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
                g = arguments
            }, d.always(function () {
                void 0 === f ? n(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, jc.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0
            }), "script") : void 0
        }), n.parseHTML = function (a, b, c) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof b && (c = b, b = !1), b = b || d;
            var e = x.exec(a), f = !c && [];
            return e ? [b.createElement(e[1])] : (e = ja([a], b, f), f && f.length && n(f).remove(), n.merge([], e.childNodes))
        };
        var lc = n.fn.load;
        n.fn.load = function (a, b, c) {
            if ("string" != typeof a && lc) return lc.apply(this, arguments);
            var d, e, f, g = this, h = a.indexOf(" ");
            return h > -1 && (d = n.trim(a.slice(h, a.length)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({
                url: a,
                type: e || "GET",
                dataType: "html",
                data: b
            }).done(function (a) {
                f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a)
            }).always(c && function (a, b) {
                g.each(function () {
                    c.apply(this, f || [a.responseText, b, a])
                })
            }), this
        }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
            n.fn[b] = function (a) {
                return this.on(b, a)
            }
        }), n.expr.filters.animated = function (a) {
            return n.grep(n.timers, function (b) {
                return a === b.elem
            }).length
        };

        function mc(a) {
            return n.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
        }

        n.offset = {
            setOffset: function (a, b, c) {
                var d, e, f, g, h, i, j, k = n.css(a, "position"), l = n(a), m = {};
                "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && n.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
            }
        }, n.fn.extend({
            offset: function (a) {
                if (arguments.length) return void 0 === a ? this : this.each(function (b) {
                    n.offset.setOffset(this, a, b)
                });
                var b, c, d = {top: 0, left: 0}, e = this[0], f = e && e.ownerDocument;
                if (f) return b = f.documentElement, n.contains(b, e) ? ("undefined" != typeof e.getBoundingClientRect && (d = e.getBoundingClientRect()), c = mc(f), {
                    top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                    left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                }) : d
            }, position: function () {
                if (this[0]) {
                    var a, b, c = {top: 0, left: 0}, d = this[0];
                    return "fixed" === n.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (c = a.offset()), c.top += n.css(a[0], "borderTopWidth", !0), c.left += n.css(a[0], "borderLeftWidth", !0)), {
                        top: b.top - c.top - n.css(d, "marginTop", !0),
                        left: b.left - c.left - n.css(d, "marginLeft", !0)
                    }
                }
            }, offsetParent: function () {
                return this.map(function () {
                    var a = this.offsetParent;
                    while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position")) a = a.offsetParent;
                    return a || Qa
                })
            }
        }), n.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, b) {
            var c = /Y/.test(b);
            n.fn[a] = function (d) {
                return Y(this, function (a, d, e) {
                    var f = mc(a);
                    return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? n(f).scrollLeft() : e, c ? e : n(f).scrollTop()) : a[d] = e)
                }, a, d, arguments.length, null)
            }
        }), n.each(["top", "left"], function (a, b) {
            n.cssHooks[b] = Ua(l.pixelPosition, function (a, c) {
                return c ? (c = Sa(a, b), Oa.test(c) ? n(a).position()[b] + "px" : c) : void 0
            })
        }), n.each({Height: "height", Width: "width"}, function (a, b) {
            n.each({padding: "inner" + a, content: b, "": "outer" + a}, function (c, d) {
                n.fn[d] = function (d, e) {
                    var f = arguments.length && (c || "boolean" != typeof d),
                        g = c || (d === !0 || e === !0 ? "margin" : "border");
                    return Y(this, function (b, c, d) {
                        var e;
                        return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g)
                    }, b, f ? d : void 0, f, null)
                }
            })
        }), n.fn.extend({
            bind: function (a, b, c) {
                return this.on(a, null, b, c)
            }, unbind: function (a, b) {
                return this.off(a, null, b)
            }, delegate: function (a, b, c, d) {
                return this.on(b, a, c, d)
            }, undelegate: function (a, b, c) {
                return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
            }
        }), n.fn.size = function () {
            return this.length
        }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
            return n
        });
        var nc = a.jQuery, oc = a.$;
        return n.noConflict = function (b) {
            return a.$ === n && (a.$ = oc), b && a.jQuery === n && (a.jQuery = nc), n
        }, b || (a.jQuery = a.$ = n), n
    });
    /*! jQuery UI - v1.11.1 - 2014-10-03
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, autocomplete.js, menu.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
    })(function (e) {
        function t(t, s) {
            var n, a, o, r = t.nodeName.toLowerCase();
            return "area" === r ? (n = t.parentNode, a = n.name, t.href && a && "map" === n.nodeName.toLowerCase() ? (o = e("img[usemap='#" + a + "']")[0], !!o && i(o)) : !1) : (/input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || s : s) && i(t)
        }

        function i(t) {
            return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function () {
                return "hidden" === e.css(this, "visibility")
            }).length
        }

        e.ui = e.ui || {}, e.extend(e.ui, {
            version: "1.11.1",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), e.fn.extend({
            scrollParent: function (t) {
                var i = this.css("position"), s = "absolute" === i, n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                    a = this.parents().filter(function () {
                        var t = e(this);
                        return s && "static" === t.css("position") ? !1 : n.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
                    }).eq(0);
                return "fixed" !== i && a.length ? a : e(this[0].ownerDocument || document)
            }, uniqueId: function () {
                var e = 0;
                return function () {
                    return this.each(function () {
                        this.id || (this.id = "ui-id-" + ++e)
                    })
                }
            }(), removeUniqueId: function () {
                return this.each(function () {
                    /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
                })
            }
        }), e.extend(e.expr[":"], {
            data: e.expr.createPseudo ? e.expr.createPseudo(function (t) {
                return function (i) {
                    return !!e.data(i, t)
                }
            }) : function (t, i, s) {
                return !!e.data(t, s[3])
            }, focusable: function (i) {
                return t(i, !isNaN(e.attr(i, "tabindex")))
            }, tabbable: function (i) {
                var s = e.attr(i, "tabindex"), n = isNaN(s);
                return (n || s >= 0) && t(i, !n)
            }
        }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (t, i) {
            function s(t, i, s, a) {
                return e.each(n, function () {
                    i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
                }), i
            }

            var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"], a = i.toLowerCase(), o = {
                innerWidth: e.fn.innerWidth,
                innerHeight: e.fn.innerHeight,
                outerWidth: e.fn.outerWidth,
                outerHeight: e.fn.outerHeight
            };
            e.fn["inner" + i] = function (t) {
                return void 0 === t ? o["inner" + i].call(this) : this.each(function () {
                    e(this).css(a, s(this, t) + "px")
                })
            }, e.fn["outer" + i] = function (t, n) {
                return "number" != typeof t ? o["outer" + i].call(this, t) : this.each(function () {
                    e(this).css(a, s(this, t, !0, n) + "px")
                })
            }
        }), e.fn.addBack || (e.fn.addBack = function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) {
            return function (i) {
                return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
            }
        }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
            focus: function (t) {
                return function (i, s) {
                    return "number" == typeof i ? this.each(function () {
                        var t = this;
                        setTimeout(function () {
                            e(t).focus(), s && s.call(t)
                        }, i)
                    }) : t.apply(this, arguments)
                }
            }(e.fn.focus), disableSelection: function () {
                var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                return function () {
                    return this.bind(e + ".ui-disableSelection", function (e) {
                        e.preventDefault()
                    })
                }
            }(), enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }, zIndex: function (t) {
                if (void 0 !== t) return this.css("zIndex", t);
                if (this.length) for (var i, s, n = e(this[0]); n.length && n[0] !== document;) {
                    if (i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                    n = n.parent()
                }
                return 0
            }
        }), e.ui.plugin = {
            add: function (t, i, s) {
                var n, a = e.ui[t].prototype;
                for (n in s) a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([i, s[n]])
            }, call: function (e, t, i, s) {
                var n, a = e.plugins[t];
                if (a && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)) for (n = 0; a.length > n; n++) e.options[a[n][0]] && a[n][1].apply(e.element, i)
            }
        };
        var s = 0, n = Array.prototype.slice;
        e.cleanData = function (t) {
            return function (i) {
                var s, n, a;
                for (a = 0; null != (n = i[a]); a++) try {
                    s = e._data(n, "events"), s && s.remove && e(n).triggerHandler("remove")
                } catch (o) {
                }
                t(i)
            }
        }(e.cleanData), e.widget = function (t, i, s) {
            var n, a, o, r, h = {}, l = t.split(".")[0];
            return t = t.split(".")[1], n = l + "-" + t, s || (s = i, i = e.Widget), e.expr[":"][n.toLowerCase()] = function (t) {
                return !!e.data(t, n)
            }, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function (e, t) {
                return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t)
            }, e.extend(o, a, {
                version: s.version,
                _proto: e.extend({}, s),
                _childConstructors: []
            }), r = new i, r.options = e.widget.extend({}, r.options), e.each(s, function (t, s) {
                return e.isFunction(s) ? (h[t] = function () {
                    var e = function () {
                        return i.prototype[t].apply(this, arguments)
                    }, n = function (e) {
                        return i.prototype[t].apply(this, e)
                    };
                    return function () {
                        var t, i = this._super, a = this._superApply;
                        return this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = a, t
                    }
                }(), void 0) : (h[t] = s, void 0)
            }), o.prototype = e.widget.extend(r, {widgetEventPrefix: a ? r.widgetEventPrefix || t : t}, h, {
                constructor: o,
                namespace: l,
                widgetName: t,
                widgetFullName: n
            }), a ? (e.each(a._childConstructors, function (t, i) {
                var s = i.prototype;
                e.widget(s.namespace + "." + s.widgetName, o, i._proto)
            }), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o
        }, e.widget.extend = function (t) {
            for (var i, s, a = n.call(arguments, 1), o = 0, r = a.length; r > o; o++) for (i in a[o]) s = a[o][i], a[o].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : s);
            return t
        }, e.widget.bridge = function (t, i) {
            var s = i.prototype.widgetFullName || t;
            e.fn[t] = function (a) {
                var o = "string" == typeof a, r = n.call(arguments, 1), h = this;
                return a = !o && r.length ? e.widget.extend.apply(null, [a].concat(r)) : a, o ? this.each(function () {
                    var i, n = e.data(this, s);
                    return "instance" === a ? (h = n, !1) : n ? e.isFunction(n[a]) && "_" !== a.charAt(0) ? (i = n[a].apply(n, r), i !== n && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + a + "'")
                }) : this.each(function () {
                    var t = e.data(this, s);
                    t ? (t.option(a || {}), t._init && t._init()) : e.data(this, s, new i(a, this))
                }), h
            }
        }, e.Widget = function () {
        }, e.Widget._childConstructors = [], e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {disabled: !1, create: null},
            _createWidget: function (t, i) {
                i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = s++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function (e) {
                        e.target === i && this.destroy()
                    }
                }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: e.noop,
            _getCreateEventData: e.noop,
            _create: e.noop,
            _init: e.noop,
            destroy: function () {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: e.noop,
            widget: function () {
                return this.element
            },
            option: function (t, i) {
                var s, n, a, o = t;
                if (0 === arguments.length) return e.widget.extend({}, this.options);
                if ("string" == typeof t) if (o = {}, s = t.split("."), t = s.shift(), s.length) {
                    for (n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++) n[s[a]] = n[s[a]] || {}, n = n[s[a]];
                    if (t = s.pop(), 1 === arguments.length) return void 0 === n[t] ? null : n[t];
                    n[t] = i
                } else {
                    if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                    o[t] = i
                }
                return this._setOptions(o), this
            },
            _setOptions: function (e) {
                var t;
                for (t in e) this._setOption(t, e[t]);
                return this
            },
            _setOption: function (e, t) {
                return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
            },
            enable: function () {
                return this._setOptions({disabled: !1})
            },
            disable: function () {
                return this._setOptions({disabled: !0})
            },
            _on: function (t, i, s) {
                var n, a = this;
                "boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, function (s, o) {
                    function r() {
                        return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0
                    }

                    "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
                    var h = s.match(/^([\w:-]*)\s*(.*)$/), l = h[1] + a.eventNamespace, u = h[2];
                    u ? n.delegate(u, l, r) : i.bind(l, r)
                })
            },
            _off: function (e, t) {
                t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
            },
            _delay: function (e, t) {
                function i() {
                    return ("string" == typeof e ? s[e] : e).apply(s, arguments)
                }

                var s = this;
                return setTimeout(i, t || 0)
            },
            _hoverable: function (t) {
                this.hoverable = this.hoverable.add(t), this._on(t, {
                    mouseenter: function (t) {
                        e(t.currentTarget).addClass("ui-state-hover")
                    }, mouseleave: function (t) {
                        e(t.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function (t) {
                this.focusable = this.focusable.add(t), this._on(t, {
                    focusin: function (t) {
                        e(t.currentTarget).addClass("ui-state-focus")
                    }, focusout: function (t) {
                        e(t.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function (t, i, s) {
                var n, a, o = this.options[t];
                if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent) for (n in a) n in i || (i[n] = a[n]);
                return this.element.trigger(i, s), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
            }
        }, e.each({show: "fadeIn", hide: "fadeOut"}, function (t, i) {
            e.Widget.prototype["_" + t] = function (s, n, a) {
                "string" == typeof n && (n = {effect: n});
                var o, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
                n = n || {}, "number" == typeof n && (n = {duration: n}), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[r] ? s[t](n) : r !== t && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function (i) {
                    e(this)[t](), a && a.call(s[0]), i()
                })
            }
        }), e.widget;
        var a = !1;
        e(document).mouseup(function () {
            a = !1
        }), e.widget("ui.mouse", {
            version: "1.11.1",
            options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0},
            _mouseInit: function () {
                var t = this;
                this.element.bind("mousedown." + this.widgetName, function (e) {
                    return t._mouseDown(e)
                }).bind("click." + this.widgetName, function (i) {
                    return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
                }), this.started = !1
            },
            _mouseDestroy: function () {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function (t) {
                if (!a) {
                    this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                    var i = this, s = 1 === t.which,
                        n = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                    return s && !n && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                        i.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
                        return i._mouseMove(e)
                    }, this._mouseUpDelegate = function (e) {
                        return i._mouseUp(e)
                    }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), a = !0, !0)) : !0
                }
            },
            _mouseMove: function (t) {
                return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : t.which ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
            },
            _mouseUp: function (t) {
                return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), a = !1, !1
            },
            _mouseDistanceMet: function (e) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function () {
                return this.mouseDelayMet
            },
            _mouseStart: function () {
            },
            _mouseDrag: function () {
            },
            _mouseStop: function () {
            },
            _mouseCapture: function () {
                return !0
            }
        }), function () {
            function t(e, t, i) {
                return [parseFloat(e[0]) * (p.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (p.test(e[1]) ? i / 100 : 1)]
            }

            function i(t, i) {
                return parseInt(e.css(t, i), 10) || 0
            }

            function s(t) {
                var i = t[0];
                return 9 === i.nodeType ? {
                    width: t.width(),
                    height: t.height(),
                    offset: {top: 0, left: 0}
                } : e.isWindow(i) ? {
                    width: t.width(),
                    height: t.height(),
                    offset: {top: t.scrollTop(), left: t.scrollLeft()}
                } : i.preventDefault ? {
                    width: 0,
                    height: 0,
                    offset: {top: i.pageY, left: i.pageX}
                } : {width: t.outerWidth(), height: t.outerHeight(), offset: t.offset()}
            }

            e.ui = e.ui || {};
            var n, a, o = Math.max, r = Math.abs, h = Math.round, l = /left|center|right/, u = /top|center|bottom/,
                d = /[\+\-]\d+(\.[\d]+)?%?/, c = /^\w+/, p = /%$/, f = e.fn.position;
            e.position = {
                scrollbarWidth: function () {
                    if (void 0 !== n) return n;
                    var t, i,
                        s = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        a = s.children()[0];
                    return e("body").append(s), t = a.offsetWidth, s.css("overflow", "scroll"), i = a.offsetWidth, t === i && (i = s[0].clientWidth), s.remove(), n = t - i
                }, getScrollInfo: function (t) {
                    var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                        s = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                        n = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                        a = "scroll" === s || "auto" === s && t.height < t.element[0].scrollHeight;
                    return {width: a ? e.position.scrollbarWidth() : 0, height: n ? e.position.scrollbarWidth() : 0}
                }, getWithinInfo: function (t) {
                    var i = e(t || window), s = e.isWindow(i[0]), n = !!i[0] && 9 === i[0].nodeType;
                    return {
                        element: i,
                        isWindow: s,
                        isDocument: n,
                        offset: i.offset() || {left: 0, top: 0},
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: s || n ? i.width() : i.outerWidth(),
                        height: s || n ? i.height() : i.outerHeight()
                    }
                }
            }, e.fn.position = function (n) {
                if (!n || !n.of) return f.apply(this, arguments);
                n = e.extend({}, n);
                var p, m, g, v, y, b, _ = e(n.of), x = e.position.getWithinInfo(n.within),
                    w = e.position.getScrollInfo(x), k = (n.collision || "flip").split(" "), T = {};
                return b = s(_), _[0].preventDefault && (n.at = "left top"), m = b.width, g = b.height, v = b.offset, y = e.extend({}, v), e.each(["my", "at"], function () {
                    var e, t, i = (n[this] || "").split(" ");
                    1 === i.length && (i = l.test(i[0]) ? i.concat(["center"]) : u.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = l.test(i[0]) ? i[0] : "center", i[1] = u.test(i[1]) ? i[1] : "center", e = d.exec(i[0]), t = d.exec(i[1]), T[this] = [e ? e[0] : 0, t ? t[0] : 0], n[this] = [c.exec(i[0])[0], c.exec(i[1])[0]]
                }), 1 === k.length && (k[1] = k[0]), "right" === n.at[0] ? y.left += m : "center" === n.at[0] && (y.left += m / 2), "bottom" === n.at[1] ? y.top += g : "center" === n.at[1] && (y.top += g / 2), p = t(T.at, m, g), y.left += p[0], y.top += p[1], this.each(function () {
                    var s, l, u = e(this), d = u.outerWidth(), c = u.outerHeight(), f = i(this, "marginLeft"),
                        b = i(this, "marginTop"), D = d + f + i(this, "marginRight") + w.width,
                        S = c + b + i(this, "marginBottom") + w.height, N = e.extend({}, y),
                        M = t(T.my, u.outerWidth(), u.outerHeight());
                    "right" === n.my[0] ? N.left -= d : "center" === n.my[0] && (N.left -= d / 2), "bottom" === n.my[1] ? N.top -= c : "center" === n.my[1] && (N.top -= c / 2), N.left += M[0], N.top += M[1], a || (N.left = h(N.left), N.top = h(N.top)), s = {
                        marginLeft: f,
                        marginTop: b
                    }, e.each(["left", "top"], function (t, i) {
                        e.ui.position[k[t]] && e.ui.position[k[t]][i](N, {
                            targetWidth: m,
                            targetHeight: g,
                            elemWidth: d,
                            elemHeight: c,
                            collisionPosition: s,
                            collisionWidth: D,
                            collisionHeight: S,
                            offset: [p[0] + M[0], p[1] + M[1]],
                            my: n.my,
                            at: n.at,
                            within: x,
                            elem: u
                        })
                    }), n.using && (l = function (e) {
                        var t = v.left - N.left, i = t + m - d, s = v.top - N.top, a = s + g - c, h = {
                            target: {element: _, left: v.left, top: v.top, width: m, height: g},
                            element: {element: u, left: N.left, top: N.top, width: d, height: c},
                            horizontal: 0 > i ? "left" : t > 0 ? "right" : "center",
                            vertical: 0 > a ? "top" : s > 0 ? "bottom" : "middle"
                        };
                        d > m && m > r(t + i) && (h.horizontal = "center"), c > g && g > r(s + a) && (h.vertical = "middle"), h.important = o(r(t), r(i)) > o(r(s), r(a)) ? "horizontal" : "vertical", n.using.call(this, e, h)
                    }), u.offset(e.extend(N, {using: l}))
                })
            }, e.ui.position = {
                fit: {
                    left: function (e, t) {
                        var i, s = t.within, n = s.isWindow ? s.scrollLeft : s.offset.left, a = s.width,
                            r = e.left - t.collisionPosition.marginLeft, h = n - r, l = r + t.collisionWidth - a - n;
                        t.collisionWidth > a ? h > 0 && 0 >= l ? (i = e.left + h + t.collisionWidth - a - n, e.left += h - i) : e.left = l > 0 && 0 >= h ? n : h > l ? n + a - t.collisionWidth : n : h > 0 ? e.left += h : l > 0 ? e.left -= l : e.left = o(e.left - r, e.left)
                    }, top: function (e, t) {
                        var i, s = t.within, n = s.isWindow ? s.scrollTop : s.offset.top, a = t.within.height,
                            r = e.top - t.collisionPosition.marginTop, h = n - r, l = r + t.collisionHeight - a - n;
                        t.collisionHeight > a ? h > 0 && 0 >= l ? (i = e.top + h + t.collisionHeight - a - n, e.top += h - i) : e.top = l > 0 && 0 >= h ? n : h > l ? n + a - t.collisionHeight : n : h > 0 ? e.top += h : l > 0 ? e.top -= l : e.top = o(e.top - r, e.top)
                    }
                }, flip: {
                    left: function (e, t) {
                        var i, s, n = t.within, a = n.offset.left + n.scrollLeft, o = n.width,
                            h = n.isWindow ? n.scrollLeft : n.offset.left, l = e.left - t.collisionPosition.marginLeft,
                            u = l - h, d = l + t.collisionWidth - o - h,
                            c = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                            p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                            f = -2 * t.offset[0];
                        0 > u ? (i = e.left + c + p + f + t.collisionWidth - o - a, (0 > i || r(u) > i) && (e.left += c + p + f)) : d > 0 && (s = e.left - t.collisionPosition.marginLeft + c + p + f - h, (s > 0 || d > r(s)) && (e.left += c + p + f))
                    }, top: function (e, t) {
                        var i, s, n = t.within, a = n.offset.top + n.scrollTop, o = n.height,
                            h = n.isWindow ? n.scrollTop : n.offset.top, l = e.top - t.collisionPosition.marginTop,
                            u = l - h, d = l + t.collisionHeight - o - h, c = "top" === t.my[1],
                            p = c ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                            f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                            m = -2 * t.offset[1];
                        0 > u ? (s = e.top + p + f + m + t.collisionHeight - o - a, e.top + p + f + m > u && (0 > s || r(u) > s) && (e.top += p + f + m)) : d > 0 && (i = e.top - t.collisionPosition.marginTop + p + f + m - h, e.top + p + f + m > d && (i > 0 || d > r(i)) && (e.top += p + f + m))
                    }
                }, flipfit: {
                    left: function () {
                        e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
                    }, top: function () {
                        e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
                    }
                }
            }, function () {
                var t, i, s, n, o, r = document.getElementsByTagName("body")[0], h = document.createElement("div");
                t = document.createElement(r ? "div" : "body"), s = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, r && e.extend(s, {position: "absolute", left: "-1000px", top: "-1000px"});
                for (o in s) t.style[o] = s[o];
                t.appendChild(h), i = r || document.documentElement, i.insertBefore(t, i.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", n = e(h).offset().left, a = n > 10 && 11 > n, t.innerHTML = "", i.removeChild(t)
            }()
        }(), e.ui.position, e.widget("ui.menu", {
            version: "1.11.1",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {submenu: "ui-icon-carat-1-e"},
                items: "> *",
                menus: "ul",
                position: {my: "left-1 top", at: "right top"},
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function () {
                this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                    role: this.options.role,
                    tabIndex: 0
                }), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                    "mousedown .ui-menu-item": function (e) {
                        e.preventDefault()
                    }, "click .ui-menu-item": function (t) {
                        var i = e(t.target);
                        !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && e(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                    }, "mouseenter .ui-menu-item": function (t) {
                        var i = e(t.currentTarget);
                        i.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(t, i)
                    }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function (e, t) {
                        var i = this.active || this.element.find(this.options.items).eq(0);
                        t || this.focus(e, i)
                    }, blur: function (t) {
                        this._delay(function () {
                            e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                        })
                    }, keydown: "_keydown"
                }), this.refresh(), this._on(this.document, {
                    click: function (e) {
                        this._closeOnDocumentClick(e) && this.collapseAll(e), this.mouseHandled = !1
                    }
                })
            },
            _destroy: function () {
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                    var t = e(this);
                    t.data("ui-menu-submenu-carat") && t.remove()
                }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
            },
            _keydown: function (t) {
                function i(e) {
                    return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
                }

                var s, n, a, o, r, h = !0;
                switch (t.keyCode) {
                    case e.ui.keyCode.PAGE_UP:
                        this.previousPage(t);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        this.nextPage(t);
                        break;
                    case e.ui.keyCode.HOME:
                        this._move("first", "first", t);
                        break;
                    case e.ui.keyCode.END:
                        this._move("last", "last", t);
                        break;
                    case e.ui.keyCode.UP:
                        this.previous(t);
                        break;
                    case e.ui.keyCode.DOWN:
                        this.next(t);
                        break;
                    case e.ui.keyCode.LEFT:
                        this.collapse(t);
                        break;
                    case e.ui.keyCode.RIGHT:
                        this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                        break;
                    case e.ui.keyCode.ENTER:
                    case e.ui.keyCode.SPACE:
                        this._activate(t);
                        break;
                    case e.ui.keyCode.ESCAPE:
                        this.collapse(t);
                        break;
                    default:
                        h = !1, n = this.previousFilter || "", a = String.fromCharCode(t.keyCode), o = !1, clearTimeout(this.filterTimer), a === n ? o = !0 : a = n + a, r = RegExp("^" + i(a), "i"), s = this.activeMenu.find(this.options.items).filter(function () {
                            return r.test(e(this).text())
                        }), s = o && -1 !== s.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : s, s.length || (a = String.fromCharCode(t.keyCode), r = RegExp("^" + i(a), "i"), s = this.activeMenu.find(this.options.items).filter(function () {
                            return r.test(e(this).text())
                        })), s.length ? (this.focus(t, s), s.length > 1 ? (this.previousFilter = a, this.filterTimer = this._delay(function () {
                            delete this.previousFilter
                        }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
                }
                h && t.preventDefault()
            },
            _activate: function (e) {
                this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(e) : this.select(e))
            },
            refresh: function () {
                var t, i, s = this, n = this.options.icons.submenu, a = this.element.find(this.options.menus);
                this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                }).each(function () {
                    var t = e(this), i = t.parent(),
                        s = e("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0);
                    i.attr("aria-haspopup", "true").prepend(s), t.attr("aria-labelledby", i.attr("id"))
                }), t = a.add(this.element), i = t.find(this.options.items), i.not(".ui-menu-item").each(function () {
                    var t = e(this);
                    s._isDivider(t) && t.addClass("ui-widget-content ui-menu-divider")
                }), i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                    tabIndex: -1,
                    role: this._itemRole()
                }), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function () {
                return {menu: "menuitem", listbox: "option"}[this.options.role]
            },
            _setOption: function (e, t) {
                "icons" === e && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this._super(e, t)
            },
            focus: function (e, t) {
                var i, s;
                this.blur(e, e && "focus" === e.type), this._scrollIntoView(t), this.active = t.first(), s = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), e && "keydown" === e.type ? this._close() : this.timer = this._delay(function () {
                    this._close()
                }, this.delay), i = t.children(".ui-menu"), i.length && e && /^mouse/.test(e.type) && this._startOpening(i), this.activeMenu = t.parent(), this._trigger("focus", e, {item: t})
            },
            _scrollIntoView: function (t) {
                var i, s, n, a, o, r;
                this._hasScroll() && (i = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, n = t.offset().top - this.activeMenu.offset().top - i - s, a = this.activeMenu.scrollTop(), o = this.activeMenu.height(), r = t.outerHeight(), 0 > n ? this.activeMenu.scrollTop(a + n) : n + r > o && this.activeMenu.scrollTop(a + n - o + r))
            },
            blur: function (e, t) {
                t || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, {item: this.active}))
            },
            _startOpening: function (e) {
                clearTimeout(this.timer), "true" === e.attr("aria-hidden") && (this.timer = this._delay(function () {
                    this._close(), this._open(e)
                }, this.delay))
            },
            _open: function (t) {
                var i = e.extend({of: this.active}, this.options.position);
                clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
            },
            collapseAll: function (t, i) {
                clearTimeout(this.timer), this.timer = this._delay(function () {
                    var s = i ? this.element : e(t && t.target).closest(this.element.find(".ui-menu"));
                    s.length || (s = this.element), this._close(s), this.blur(t), this.activeMenu = s
                }, this.delay)
            },
            _close: function (e) {
                e || (e = this.active ? this.active.parent() : this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
            },
            _closeOnDocumentClick: function (t) {
                return !e(t.target).closest(".ui-menu").length
            },
            _isDivider: function (e) {
                return !/[^\-\u2014\u2013\s]/.test(e.text())
            },
            collapse: function (e) {
                var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                t && t.length && (this._close(), this.focus(e, t))
            },
            expand: function (e) {
                var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                t && t.length && (this._open(t.parent()), this._delay(function () {
                    this.focus(e, t)
                }))
            },
            next: function (e) {
                this._move("next", "first", e)
            },
            previous: function (e) {
                this._move("prev", "last", e)
            },
            isFirstItem: function () {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            isLastItem: function () {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            _move: function (e, t, i) {
                var s;
                this.active && (s = "first" === e || "last" === e ? this.active["first" === e ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[e + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.find(this.options.items)[t]()), this.focus(i, s)
            },
            nextPage: function (t) {
                var i, s, n;
                return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
                    return i = e(this), 0 > i.offset().top - s - n
                }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]())), void 0) : (this.next(t), void 0)
            },
            previousPage: function (t) {
                var i, s, n;
                return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
                    return i = e(this), i.offset().top - s + n > 0
                }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first())), void 0) : (this.next(t), void 0)
            },
            _hasScroll: function () {
                return this.element.outerHeight() < this.element.prop("scrollHeight")
            },
            select: function (t) {
                this.active = this.active || e(t.target).closest(".ui-menu-item");
                var i = {item: this.active};
                this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, i)
            }
        }), e.widget("ui.autocomplete", {
            version: "1.11.1",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {my: "left top", at: "left bottom", collision: "none"},
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            requestIndex: 0,
            pending: 0,
            _create: function () {
                var t, i, s, n = this.element[0].nodeName.toLowerCase(), a = "textarea" === n, o = "input" === n;
                this.isMultiLine = a ? !0 : o ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[a || o ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                    keydown: function (n) {
                        if (this.element.prop("readOnly")) return t = !0, s = !0, i = !0, void 0;
                        t = !1, s = !1, i = !1;
                        var a = e.ui.keyCode;
                        switch (n.keyCode) {
                            case a.PAGE_UP:
                                t = !0, this._move("previousPage", n);
                                break;
                            case a.PAGE_DOWN:
                                t = !0, this._move("nextPage", n);
                                break;
                            case a.UP:
                                t = !0, this._keyEvent("previous", n);
                                break;
                            case a.DOWN:
                                t = !0, this._keyEvent("next", n);
                                break;
                            case a.ENTER:
                                this.menu.active && (t = !0, n.preventDefault(), this.menu.select(n));
                                break;
                            case a.TAB:
                                this.menu.active && this.menu.select(n);
                                break;
                            case a.ESCAPE:
                                this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(n), n.preventDefault());
                                break;
                            default:
                                i = !0, this._searchTimeout(n)
                        }
                    }, keypress: function (s) {
                        if (t) return t = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), void 0;
                        if (!i) {
                            var n = e.ui.keyCode;
                            switch (s.keyCode) {
                                case n.PAGE_UP:
                                    this._move("previousPage", s);
                                    break;
                                case n.PAGE_DOWN:
                                    this._move("nextPage", s);
                                    break;
                                case n.UP:
                                    this._keyEvent("previous", s);
                                    break;
                                case n.DOWN:
                                    this._keyEvent("next", s)
                            }
                        }
                    }, input: function (e) {
                        return s ? (s = !1, e.preventDefault(), void 0) : (this._searchTimeout(e), void 0)
                    }, focus: function () {
                        this.selectedItem = null, this.previous = this._value()
                    }, blur: function (e) {
                        return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(e), this._change(e), void 0)
                    }
                }), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role: null}).hide().menu("instance"), this._on(this.menu.element, {
                    mousedown: function (t) {
                        t.preventDefault(), this.cancelBlur = !0, this._delay(function () {
                            delete this.cancelBlur
                        });
                        var i = this.menu.element[0];
                        e(t.target).closest(".ui-menu-item").length || this._delay(function () {
                            var t = this;
                            this.document.one("mousedown", function (s) {
                                s.target === t.element[0] || s.target === i || e.contains(i, s.target) || t.close()
                            })
                        })
                    }, menufocus: function (t, i) {
                        var s, n;
                        return this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type)) ? (this.menu.blur(), this.document.one("mousemove", function () {
                            e(t.target).trigger(t.originalEvent)
                        }), void 0) : (n = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", t, {item: n}) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(n.value), s = i.item.attr("aria-label") || n.value, s && e.trim(s).length && (this.liveRegion.children().hide(), e("<div>").text(s).appendTo(this.liveRegion)), void 0)
                    }, menuselect: function (e, t) {
                        var i = t.item.data("ui-autocomplete-item"), s = this.previous;
                        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function () {
                            this.previous = s, this.selectedItem = i
                        })), !1 !== this._trigger("select", e, {item: i}) && this._value(i.value), this.term = this._value(), this.close(e), this.selectedItem = i
                    }
                }), this.liveRegion = e("<span>", {
                    role: "status",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {
                    beforeunload: function () {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function () {
                clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
            },
            _setOption: function (e, t) {
                this._super(e, t), "source" === e && this._initSource(), "appendTo" === e && this.menu.element.appendTo(this._appendTo()), "disabled" === e && t && this.xhr && this.xhr.abort()
            },
            _appendTo: function () {
                var t = this.options.appendTo;
                return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
            },
            _initSource: function () {
                var t, i, s = this;
                e.isArray(this.options.source) ? (t = this.options.source, this.source = function (i, s) {
                    s(e.ui.autocomplete.filter(t, i.term))
                }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function (t, n) {
                    s.xhr && s.xhr.abort(), s.xhr = e.ajax({
                        url: i, data: t, dataType: "json", success: function (e) {
                            n(e)
                        }, error: function () {
                            n([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function (e) {
                clearTimeout(this.searching), this.searching = this._delay(function () {
                    var t = this.term === this._value(), i = this.menu.element.is(":visible"),
                        s = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
                    (!t || t && !i && !s) && (this.selectedItem = null, this.search(null, e))
                }, this.options.delay)
            },
            search: function (e, t) {
                return e = null != e ? e : this._value(), this.term = this._value(), e.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(e) : void 0
            },
            _search: function (e) {
                this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({term: e}, this._response())
            },
            _response: function () {
                var t = ++this.requestIndex;
                return e.proxy(function (e) {
                    t === this.requestIndex && this.__response(e), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
                }, this)
            },
            __response: function (e) {
                e && (e = this._normalize(e)), this._trigger("response", null, {content: e}), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close()
            },
            close: function (e) {
                this.cancelSearch = !0, this._close(e)
            },
            _close: function (e) {
                this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e))
            },
            _change: function (e) {
                this.previous !== this._value() && this._trigger("change", e, {item: this.selectedItem})
            },
            _normalize: function (t) {
                return t.length && t[0].label && t[0].value ? t : e.map(t, function (t) {
                    return "string" == typeof t ? {label: t, value: t} : e.extend({}, t, {
                        label: t.label || t.value,
                        value: t.value || t.label
                    })
                })
            },
            _suggest: function (t) {
                var i = this.menu.element.empty();
                this._renderMenu(i, t), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(e.extend({of: this.element}, this.options.position)), this.options.autoFocus && this.menu.next()
            },
            _resizeMenu: function () {
                var e = this.menu.element;
                e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function (t, i) {
                var s = this;
                e.each(i, function (e, i) {
                    s._renderItemData(t, i)
                })
            },
            _renderItemData: function (e, t) {
                return this._renderItem(e, t).data("ui-autocomplete-item", t)
            },
            _renderItem: function (t, i) {
                return e("<li>").text(i.label).appendTo(t)
            },
            _move: function (e, t) {
                return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e) ? (this.isMultiLine || this._value(this.term), this.menu.blur(), void 0) : (this.menu[e](t), void 0) : (this.search(null, t), void 0)
            },
            widget: function () {
                return this.menu.element
            },
            _value: function () {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function (e, t) {
                (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t), t.preventDefault())
            }
        }), e.extend(e.ui.autocomplete, {
            escapeRegex: function (e) {
                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }, filter: function (t, i) {
                var s = RegExp(e.ui.autocomplete.escapeRegex(i), "i");
                return e.grep(t, function (e) {
                    return s.test(e.label || e.value || e)
                })
            }
        }), e.widget("ui.autocomplete", e.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function (e) {
                        return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            }, __response: function (t) {
                var i;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), e("<div>").text(i).appendTo(this.liveRegion))
            }
        }), e.ui.autocomplete
    });/*!
 * jQuery Modal (minified)
 * Copyright (c) 2015 CreativeDream
 * Website http://creativedream.net/plugins
 * Version: 1.2.3 (10-04-2015)
 * Requires: jQuery v1.7.1 or later
 */
    function modal(t) {
        return $.cModal(t)
    }

    !function (t) {
        t.cModal = function (n) {
            var e, o = {
                    type: "default",
                    title: null,
                    text: null,
                    size: "normal",
                    buttons: [{
                        text: "OK", val: !0, onClick: function () {
                            return !0
                        }
                    }],
                    center: !0,
                    autoclose: !1,
                    callback: null,
                    onShow: null,
                    animate: !0,
                    closeClick: !0,
                    closable: !0,
                    theme: "default",
                    background: "rgba(0,0,0,0.35)",
                    zIndex: 1050,
                    buttonText: {ok: "OK", yes: "Yes", cancel: "Cancel"},
                    template: '<div class="modal-box"><div class="modal-inner"><div class="modal-title"><a class="modal-close-btn"></a></div><div class="modal-text"></div><div class="modal-buttons"></div></div></div>',
                    _classes: {
                        box: ".modal-box",
                        boxInner: ".modal-inner",
                        title: ".modal-title",
                        content: ".modal-text",
                        buttons: ".modal-buttons",
                        closebtn: ".modal-close-btn"
                    }
                }, n = t.extend({}, o, n), a = t("<div id='modal-window' />").hide(), l = n._classes.box,
                s = a.append(n.template), i = {
                    init: function () {
                        t("#modal-window").remove(), i._setStyle(), i._modalShow(), i._modalConent(), a.on("click", "a.modal-btn", function () {
                            i._modalBtn(t(this))
                        }).on("click", n._classes.closebtn, function () {
                            i._modalHide()
                        }).click(function (t) {
                            n.closeClick && "modal-window" == t.target.id && i._modalHide()
                        }), t(window).bind("keyup", i._keyUpF).resize(function () {
                            var t = n.animate;
                            n.animate = !1, i._position(), n.animate = t
                        })
                    }, _setStyle: function () {
                        a.css({
                            position: "fixed",
                            width: "100%",
                            height: "100%",
                            top: "0",
                            left: "0",
                            "z-index": n.zIndex,
                            overflow: "auto"
                        }), a.find(n._classes.box).css({position: "absolute"})
                    }, _keyUpF: function (t) {
                        switch (t.keyCode) {
                            case 13:
                                if (s.find("input:not(.modal-prompt-input),textarea").is(":focus")) return !1;
                                i._modalBtn(a.find(n._classes.buttons + " a.modal-btn" + ("undefined" != typeof i.btnForEKey && a.find(n._classes.buttons + " a.modal-btn:eq(" + i.btnForEKey + ")").size() > 0 ? ":eq(" + i.btnForEKey + ")" : ":last-child")));
                                break;
                            case 27:
                                i._modalHide()
                        }
                    }, _modalShow: function () {
                        t("body").css({
                            overflow: "hidden",
                            width: t("body").innerWidth()
                        }).append(s), null != n.onShow ? n.onShow(i.actions) : null
                    }, _modalHide: function (o) {
                        if (n.closable === !1) return !1;
                        e = "undefined" == typeof e ? !1 : e;
                        var s = function () {
                            if (null != n.callback && "function" == typeof n.callback && 0 == n.callback(e, a, i.actions) ? !1 : !0) {
                                a.fadeOut(200, function () {
                                    t(this).remove(), t("body").css({overflow: "", width: ""})
                                });
                                var o = 100 * parseFloat(t(l).css("top")) / parseFloat(t(l).parent().css("height"));
                                t(l).stop(!0, !0).animate({top: o + (n.animate ? 3 : 0) + "%"}, "fast")
                            }
                        };
                        o ? setTimeout(function () {
                            s()
                        }, o) : s(), t(window).unbind("keyup", i._keyUpF)
                    }, _modalConent: function () {
                        var e = n._classes.title, o = n._classes.content, s = n._classes.buttons, d = n.buttonText,
                            c = ["alert", "confirm", "prompt"], u = ["xenon", "atlant", "reseted"];
                        if (-1 == t.inArray(n.type, c) && "default" != n.type && t(l).addClass("modal-type-" + n.type), t(l).addClass(n.size && null != n.size ? "modal-size-" + n.size : "modal-size-normal"), n.theme && null != n.theme && "default" != n.theme && t(l).addClass((-1 == t.inArray(n.theme, u) ? "" : "modal-theme-") + n.theme), n.background && null != n.background && a.css("background-color", n.background), n.title || null != n.title ? t(e).prepend("<h3>" + n.title + "</h3>") : t(e).remove(), "prompt" == n.type ? n.text = (null != n.text ? n.text : "") + '<input type="text" name="modal-prompt-input" class="modal-prompt-input" autocomplete="off" autofocus="on" />' : "", t(o).html(n.text), n.buttons || null != n.buttons) {
                            var r = "";
                            switch (n.type) {
                                case"alert":
                                    r = '<a class="modal-btn' + (n.buttons[0].addClass ? " " + n.buttons[0].addClass : "") + '">' + d.ok + "</a>";
                                    break;
                                case"confirm":
                                    r = '<a class="modal-btn' + (n.buttons[0].addClass ? " " + n.buttons[0].addClass : "") + '">' + d.cancel + '</a><a class="modal-btn ' + (n.buttons[1] && n.buttons[1].addClass ? " " + n.buttons[1].addClass : "btn-light-blue") + '">' + d.yes + "</a>";
                                    break;
                                case"prompt":
                                    r = '<a class="modal-btn' + (n.buttons[0].addClass ? " " + n.buttons[0].addClass : "") + '">' + d.cancel + '</a><a class="modal-btn ' + (n.buttons[1] && n.buttons[1].addClass ? " " + n.buttons[1].addClass : "btn-light-blue") + '">' + d.ok + "</a>";
                                    break;
                                default:
                                    n.buttons.length > 0 && t.isArray(n.buttons) ? t.each(n.buttons, function (t, n) {
                                        var e = n.addClass && "undefined" != typeof n.addClass ? " " + n.addClass : "";
                                        r += '<a class="modal-btn' + e + '">' + n.text + "</a>", n.eKey && (i.btnForEKey = t)
                                    }) : r += '<a class="modal-btn">' + d.ok + "</a>"
                            }
                            t(s).html(r)
                        } else t(s).remove();
                        if ("prompt" == n.type && $(".modal-prompt-input").focus(), n.autoclose) {
                            var m = n.buttons || null != n.buttons ? 32 * t(o).text().length : 900;
                            i._modalHide(900 > m ? 900 : m)
                        }
                        a.fadeIn(200), i._position()
                    }, _position: function () {
                        var e, o, a;
                        n.center ? (e = {
                            top: t(window).height() < t(l).outerHeight() ? 1 : 50,
                            left: 50,
                            marginTop: t(window).height() < t(l).outerHeight() ? 0 : -t(l).outerHeight() / 2,
                            marginLeft: -t(l).outerWidth() / 2
                        }, o = {
                            top: e.top - (n.animate ? 3 : 0) + "%",
                            left: e.left + "%",
                            "margin-top": e.marginTop,
                            "margin-left": e.marginLeft
                        }, a = {top: e.top + "%"}) : (e = {
                            top: t(window).height() < t(l).outerHeight() ? 1 : 10,
                            left: 50,
                            marginTop: 0,
                            marginLeft: -t(l).outerWidth() / 2
                        }, o = {
                            top: e.top - (n.animate ? 3 : 0) + "%",
                            left: e.left + "%",
                            "margin-top": e.marginTop,
                            "margin-left": e.marginLeft
                        }, a = {top: e.top + "%"}), t(l).css(o).stop(!0, !0).animate(a, "fast")
                    }, _modalBtn: function (o) {
                        var l = !1, s = n.type, d = o.index(), c = n.buttons[d];
                        if (t.inArray(s, ["alert", "confirm", "prompt"]) > -1) e = l = 1 == d ? !0 : !1, "prompt" == s && (e = l = l && a.find("input.modal-prompt-input").size() > 0 != 0 ? a.find("input.modal-prompt-input").val() : !1), i._modalHide(); else {
                            if (o.hasClass("btn-disabled")) return !1;
                            e = l = c && c.val ? c.val : !0, (!c.onClick || c.onClick(t.extend({
                                val: l,
                                bObj: o,
                                bOpts: c
                            }, i.actions))) && i._modalHide()
                        }
                        e = l
                    }, actions: {
                        html: a, close: function () {
                            i._modalHide()
                        }, getModal: function () {
                            return a
                        }, getBox: function () {
                            return a.find(n._classes.box)
                        }, getInner: function () {
                            return a.find(n._classes.boxInner)
                        }, getTitle: function () {
                            return a.find(n._classes.title)
                        }, getContet: function () {
                            return a.find(n._classes.content)
                        }, getButtons: function () {
                            return a.find(n._classes.buttons).find("a")
                        }, setTitle: function (t) {
                            return a.find(n._classes.title + " h3").html(t), a.find(n._classes.title + " h3").size() > 0
                        }, setContent: function (t) {
                            return a.find(n._classes.content).html(t), a.find(n._classes.content).size() > 0
                        }
                    }
                };
            return i.init(), i.actions
        }
    }(jQuery);
    (function (factory) {
        "use strict";
        if (typeof define === 'function' && define.amd) {
            define(['jquery'], factory)
        } else if (typeof exports == "object" && typeof module == "object") {
            module.exports = factory
        } else {
            factory(jQuery)
        }
    })(function ($, undefined) {
        "use strict";
        var defaultOpts = {
                beforeShow: noop,
                move: noop,
                change: noop,
                show: noop,
                hide: noop,
                color: !1,
                flat: !1,
                showInput: !1,
                allowEmpty: !1,
                showButtons: !0,
                clickoutFiresChange: !0,
                showInitial: !1,
                showPalette: !1,
                showPaletteOnly: !1,
                hideAfterPaletteSelect: !1,
                togglePaletteOnly: !1,
                showSelectionPalette: !0,
                localStorageKey: !1,
                appendTo: "body",
                maxSelectionSize: 7,
                cancelText: "iptal et",
                chooseText: "seç",
                togglePaletteMoreText: "more",
                togglePaletteLessText: "less",
                clearText: "Clear Color Selection",
                noColorSelectedText: "No Color Selected",
                preferredFormat: !1,
                className: "",
                containerClassName: "",
                replacerClassName: "",
                showAlpha: !1,
                theme: "sp-light",
                palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],
                selectionPalette: [],
                disabled: !1,
                offset: null
            }, spectrums = [], IE = !!/msie/i.exec(window.navigator.userAgent), rgbaSupport = (function () {
                function contains(str, substr) {
                    return !!~('' + str).indexOf(substr)
                }

                var elem = document.createElement('div');
                var style = elem.style;
                style.cssText = 'background-color:rgba(0,0,0,.5)';
                return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla')
            })(),
            replaceInput = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join(''),
            markup = (function () {
                var gradientFix = "";
                if (IE) {
                    for (var i = 1; i <= 6; i++) {
                        gradientFix += "<div class='sp-" + i + "'></div>"
                    }
                }
                return ["<div class='sp-container sp-hidden'>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'></div>", "<div class='sp-palette-button-container sp-cf'>", "<button type='button' class='sp-palette-toggle'></button>", "</div>", "</div>", "<div class='sp-picker-container'>", "<div class='sp-top sp-cf'>", "<div class='sp-fill'></div>", "<div class='sp-top-inner'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'></div>", "</div>", "</div>", "</div>", "<div class='sp-clear sp-clear-display'>", "</div>", "<div class='sp-hue'>", "<div class='sp-slider'></div>", gradientFix, "</div>", "</div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>", "</div>", "<div class='sp-input-container sp-cf'>", "<input class='sp-input' type='text' spellcheck='false'  />", "</div>", "<div class='sp-initial sp-thumb sp-cf'></div>", "<div class='sp-button-container sp-cf'>", "<a class='sp-cancel' href='#'></a>", "<button type='button' class='sp-choose'></button>", "</div>", "</div>", "</div>"].join("")
            })();

        function paletteTemplate(p, color, className, opts) {
            var html = [];
            for (var i = 0; i < p.length; i++) {
                var current = p[i];
                if (current) {
                    var tiny = tinycolor(current);
                    var c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
                    c += (tinycolor.equals(color, current)) ? " sp-thumb-active" : "";
                    var formattedString = tiny.toString(opts.preferredFormat || "rgb");
                    var swatchStyle = rgbaSupport ? ("background-color:" + tiny.toRgbString()) : "filter:" + tiny.toFilter();
                    html.push('<span title="' + formattedString + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';" /></span>')
                } else {
                    var cls = 'sp-clear-display';
                    html.push($('<div />').append($('<span data-color="" style="background-color:transparent;" class="' + cls + '"></span>').attr('title', opts.noColorSelectedText)).html())
                }
            }
            return "<div class='sp-cf " + className + "'>" + html.join('') + "</div>"
        }

        function hideAll() {
            for (var i = 0; i < spectrums.length; i++) {
                if (spectrums[i]) {
                    spectrums[i].hide()
                }
            }
        }

        function instanceOptions(o, callbackContext) {
            var opts = $.extend({}, defaultOpts, o);
            opts.callbacks = {
                'move': bind(opts.move, callbackContext),
                'change': bind(opts.change, callbackContext),
                'show': bind(opts.show, callbackContext),
                'hide': bind(opts.hide, callbackContext),
                'beforeShow': bind(opts.beforeShow, callbackContext)
            };
            return opts
        }

        function spectrum(element, o) {
            var opts = instanceOptions(o, element), flat = opts.flat, showSelectionPalette = opts.showSelectionPalette,
                localStorageKey = opts.localStorageKey, theme = opts.theme, callbacks = opts.callbacks,
                resize = throttle(reflow, 10), visible = !1, isDragging = !1, dragWidth = 0, dragHeight = 0,
                dragHelperHeight = 0, slideHeight = 0, slideWidth = 0, alphaWidth = 0, alphaSlideHelperWidth = 0,
                slideHelperHeight = 0, currentHue = 0, currentSaturation = 0, currentValue = 0, currentAlpha = 1,
                palette = [], paletteArray = [], paletteLookup = {}, selectionPalette = opts.selectionPalette.slice(0),
                maxSelectionSize = opts.maxSelectionSize, draggingClass = "sp-dragging", shiftMovementDirection = null;
            var doc = element.ownerDocument, body = doc.body, boundElement = $(element), disabled = !1,
                container = $(markup, doc).addClass(theme), pickerContainer = container.find(".sp-picker-container"),
                dragger = container.find(".sp-color"), dragHelper = container.find(".sp-dragger"),
                slider = container.find(".sp-hue"), slideHelper = container.find(".sp-slider"),
                alphaSliderInner = container.find(".sp-alpha-inner"), alphaSlider = container.find(".sp-alpha"),
                alphaSlideHelper = container.find(".sp-alpha-handle"), textInput = container.find(".sp-input"),
                paletteContainer = container.find(".sp-palette"), initialColorContainer = container.find(".sp-initial"),
                cancelButton = container.find(".sp-cancel"), clearButton = container.find(".sp-clear"),
                chooseButton = container.find(".sp-choose"), toggleButton = container.find(".sp-palette-toggle"),
                isInput = boundElement.is("input"),
                isInputTypeColor = isInput && boundElement.attr("type") === "color" && inputTypeColorSupport(),
                shouldReplace = isInput && !flat,
                replacer = (shouldReplace) ? $(replaceInput).addClass(theme).addClass(opts.className).addClass(opts.replacerClassName) : $([]),
                offsetElement = (shouldReplace) ? replacer : boundElement,
                previewElement = replacer.find(".sp-preview-inner"),
                initialColor = opts.color || (isInput && boundElement.val()), colorOnShow = !1,
                preferredFormat = opts.preferredFormat, currentPreferredFormat = preferredFormat,
                clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange, isEmpty = !initialColor,
                allowEmpty = opts.allowEmpty && !isInputTypeColor;

            function applyOptions() {
                if (opts.showPaletteOnly) {
                    opts.showPalette = !0
                }
                toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
                if (opts.palette) {
                    palette = opts.palette.slice(0);
                    paletteArray = $.isArray(palette[0]) ? palette : [palette];
                    paletteLookup = {};
                    for (var i = 0; i < paletteArray.length; i++) {
                        for (var j = 0; j < paletteArray[i].length; j++) {
                            var rgb = tinycolor(paletteArray[i][j]).toRgbString();
                            paletteLookup[rgb] = !0
                        }
                    }
                }
                container.toggleClass("sp-flat", flat);
                container.toggleClass("sp-input-disabled", !opts.showInput);
                container.toggleClass("sp-alpha-enabled", opts.showAlpha);
                container.toggleClass("sp-clear-enabled", allowEmpty);
                container.toggleClass("sp-buttons-disabled", !opts.showButtons);
                container.toggleClass("sp-palette-buttons-disabled", !opts.togglePaletteOnly);
                container.toggleClass("sp-palette-disabled", !opts.showPalette);
                container.toggleClass("sp-palette-only", opts.showPaletteOnly);
                container.toggleClass("sp-initial-disabled", !opts.showInitial);
                container.addClass(opts.className).addClass(opts.containerClassName);
                reflow()
            }

            function initialize() {
                if (IE) {
                    container.find("*:not(input)").attr("unselectable", "on")
                }
                applyOptions();
                if (shouldReplace) {
                    boundElement.after(replacer).hide()
                }
                if (!allowEmpty) {
                    clearButton.hide()
                }
                if (flat) {
                    boundElement.after(container).hide()
                } else {
                    var appendTo = opts.appendTo === "parent" ? boundElement.parent() : $(opts.appendTo);
                    if (appendTo.length !== 1) {
                        appendTo = $("body")
                    }
                    appendTo.append(container)
                }
                updateSelectionPaletteFromStorage();
                offsetElement.bind("click.spectrum touchstart.spectrum", function (e) {
                    if (!disabled) {
                        toggle()
                    }
                    e.stopPropagation();
                    if (!$(e.target).is("input")) {
                        e.preventDefault()
                    }
                });
                if (boundElement.is(":disabled") || (opts.disabled === !0)) {
                    disable()
                }
                container.click(stopPropagation);
                textInput.change(setFromTextInput);
                textInput.bind("paste", function () {
                    setTimeout(setFromTextInput, 1)
                });
                textInput.keydown(function (e) {
                    if (e.keyCode == 13) {
                        setFromTextInput()
                    }
                });
                cancelButton.text(opts.cancelText);
                cancelButton.bind("click.spectrum", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    revert();
                    hide()
                });
                clearButton.attr("title", opts.clearText);
                clearButton.bind("click.spectrum", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    isEmpty = !0;
                    move();
                    if (flat) {
                        updateOriginalInput(!0)
                    }
                });
                chooseButton.text(opts.chooseText);
                chooseButton.bind("click.spectrum", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if (IE && textInput.is(":focus")) {
                        textInput.trigger('change')
                    }
                    if (isValid()) {
                        updateOriginalInput(!0);
                        hide()
                    }
                });
                toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
                toggleButton.bind("click.spectrum", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    opts.showPaletteOnly = !opts.showPaletteOnly;
                    if (!opts.showPaletteOnly && !flat) {
                        container.css('left', '-=' + (pickerContainer.outerWidth(!0) + 5))
                    }
                    applyOptions()
                });
                draggable(alphaSlider, function (dragX, dragY, e) {
                    currentAlpha = (dragX / alphaWidth);
                    isEmpty = !1;
                    if (e.shiftKey) {
                        currentAlpha = Math.round(currentAlpha * 10) / 10
                    }
                    move()
                }, dragStart, dragStop);
                draggable(slider, function (dragX, dragY) {
                    currentHue = parseFloat(dragY / slideHeight);
                    isEmpty = !1;
                    if (!opts.showAlpha) {
                        currentAlpha = 1
                    }
                    move()
                }, dragStart, dragStop);
                draggable(dragger, function (dragX, dragY, e) {
                    if (!e.shiftKey) {
                        shiftMovementDirection = null
                    } else if (!shiftMovementDirection) {
                        var oldDragX = currentSaturation * dragWidth;
                        var oldDragY = dragHeight - (currentValue * dragHeight);
                        var furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);
                        shiftMovementDirection = furtherFromX ? "x" : "y"
                    }
                    var setSaturation = !shiftMovementDirection || shiftMovementDirection === "x";
                    var setValue = !shiftMovementDirection || shiftMovementDirection === "y";
                    if (setSaturation) {
                        currentSaturation = parseFloat(dragX / dragWidth)
                    }
                    if (setValue) {
                        currentValue = parseFloat((dragHeight - dragY) / dragHeight)
                    }
                    isEmpty = !1;
                    if (!opts.showAlpha) {
                        currentAlpha = 1
                    }
                    move()
                }, dragStart, dragStop);
                if (!!initialColor) {
                    set(initialColor);
                    updateUI();
                    currentPreferredFormat = preferredFormat || tinycolor(initialColor).format;
                    addColorToSelectionPalette(initialColor)
                } else {
                    updateUI()
                }
                if (flat) {
                    show()
                }

                function paletteElementClick(e) {
                    if (e.data && e.data.ignore) {
                        set($(e.target).closest(".sp-thumb-el").data("color"));
                        move()
                    } else {
                        set($(e.target).closest(".sp-thumb-el").data("color"));
                        move();
                        updateOriginalInput(!0);
                        if (opts.hideAfterPaletteSelect) {
                            hide()
                        }
                    }
                    return !1
                }

                var paletteEvent = IE ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
                paletteContainer.delegate(".sp-thumb-el", paletteEvent, paletteElementClick);
                initialColorContainer.delegate(".sp-thumb-el:nth-child(1)", paletteEvent, {ignore: !0}, paletteElementClick)
            }

            function updateSelectionPaletteFromStorage() {
                if (localStorageKey && window.localStorage) {
                    try {
                        var oldPalette = window.localStorage[localStorageKey].split(",#");
                        if (oldPalette.length > 1) {
                            delete window.localStorage[localStorageKey];
                            $.each(oldPalette, function (i, c) {
                                addColorToSelectionPalette(c)
                            })
                        }
                    } catch (e) {
                    }
                    try {
                        selectionPalette = window.localStorage[localStorageKey].split(";")
                    } catch (e) {
                    }
                }
            }

            function addColorToSelectionPalette(color) {
                if (showSelectionPalette) {
                    var rgb = tinycolor(color).toRgbString();
                    if (!paletteLookup[rgb] && $.inArray(rgb, selectionPalette) === -1) {
                        selectionPalette.push(rgb);
                        while (selectionPalette.length > maxSelectionSize) {
                            selectionPalette.shift()
                        }
                    }
                    if (localStorageKey && window.localStorage) {
                        try {
                            window.localStorage[localStorageKey] = selectionPalette.join(";")
                        } catch (e) {
                        }
                    }
                }
            }

            function getUniqueSelectionPalette() {
                var unique = [];
                if (opts.showPalette) {
                    for (var i = 0; i < selectionPalette.length; i++) {
                        var rgb = tinycolor(selectionPalette[i]).toRgbString();
                        if (!paletteLookup[rgb]) {
                            unique.push(selectionPalette[i])
                        }
                    }
                }
                return unique.reverse().slice(0, opts.maxSelectionSize)
            }

            function drawPalette() {
                var currentColor = get();
                var html = $.map(paletteArray, function (palette, i) {
                    return paletteTemplate(palette, currentColor, "sp-palette-row sp-palette-row-" + i, opts)
                });
                updateSelectionPaletteFromStorage();
                if (selectionPalette) {
                    html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection", opts))
                }
                paletteContainer.html(html.join(""))
            }

            function drawInitial() {
                if (opts.showInitial) {
                    var initial = colorOnShow;
                    var current = get();
                    initialColorContainer.html(paletteTemplate([initial, current], current, "sp-palette-row-initial", opts))
                }
            }

            function dragStart() {
                if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
                    reflow()
                }
                isDragging = !0;
                container.addClass(draggingClass);
                shiftMovementDirection = null;
                boundElement.trigger('dragstart.spectrum', [get()])
            }

            function dragStop() {
                isDragging = !1;
                container.removeClass(draggingClass);
                boundElement.trigger('dragstop.spectrum', [get()])
            }

            function setFromTextInput() {
                var value = textInput.val();
                if ((value === null || value === "") && allowEmpty) {
                    set(null);
                    updateOriginalInput(!0)
                } else {
                    var tiny = tinycolor(value);
                    if (tiny.isValid()) {
                        set(tiny);
                        updateOriginalInput(!0)
                    } else {
                        textInput.addClass("sp-validation-error")
                    }
                }
            }

            function toggle() {
                if (visible) {
                    hide()
                } else {
                    show()
                }
            }

            function show() {
                var event = $.Event('beforeShow.spectrum');
                if (visible) {
                    reflow();
                    return
                }
                boundElement.trigger(event, [get()]);
                if (callbacks.beforeShow(get()) === !1 || event.isDefaultPrevented()) {
                    return
                }
                hideAll();
                visible = !0;
                $(doc).bind("keydown.spectrum", onkeydown);
                $(doc).bind("click.spectrum", clickout);
                $(window).bind("resize.spectrum", resize);
                replacer.addClass("sp-active");
                container.removeClass("sp-hidden");
                reflow();
                updateUI();
                colorOnShow = get();
                drawInitial();
                callbacks.show(colorOnShow);
                boundElement.trigger('show.spectrum', [colorOnShow])
            }

            function onkeydown(e) {
                if (e.keyCode === 27) {
                    hide()
                }
            }

            function clickout(e) {
                if (e.button == 2) {
                    return
                }
                if (isDragging) {
                    return
                }
                if (clickoutFiresChange) {
                    updateOriginalInput(!0)
                } else {
                    revert()
                }
                hide()
            }

            function hide() {
                if (!visible || flat) {
                    return
                }
                visible = !1;
                $(doc).unbind("keydown.spectrum", onkeydown);
                $(doc).unbind("click.spectrum", clickout);
                $(window).unbind("resize.spectrum", resize);
                replacer.removeClass("sp-active");
                container.addClass("sp-hidden");
                callbacks.hide(get());
                boundElement.trigger('hide.spectrum', [get()])
            }

            function revert() {
                set(colorOnShow, !0)
            }

            function set(color, ignoreFormatChange) {
                if (tinycolor.equals(color, get())) {
                    updateUI();
                    return
                }
                var newColor, newHsv;
                if (!color && allowEmpty) {
                    isEmpty = !0
                } else {
                    isEmpty = !1;
                    newColor = tinycolor(color);
                    newHsv = newColor.toHsv();
                    currentHue = (newHsv.h % 360) / 360;
                    currentSaturation = newHsv.s;
                    currentValue = newHsv.v;
                    currentAlpha = newHsv.a
                }
                updateUI();
                if (newColor && newColor.isValid() && !ignoreFormatChange) {
                    currentPreferredFormat = preferredFormat || newColor.getFormat()
                }
            }

            function get(opts) {
                opts = opts || {};
                if (allowEmpty && isEmpty) {
                    return null
                }
                return tinycolor.fromRatio({
                    h: currentHue,
                    s: currentSaturation,
                    v: currentValue,
                    a: Math.round(currentAlpha * 100) / 100
                }, {format: opts.format || currentPreferredFormat})
            }

            function isValid() {
                return !textInput.hasClass("sp-validation-error")
            }

            function move() {
                updateUI();
                callbacks.move(get());
                boundElement.trigger('move.spectrum', [get()])
            }

            function updateUI() {
                textInput.removeClass("sp-validation-error");
                updateHelperLocations();
                var flatColor = tinycolor.fromRatio({h: currentHue, s: 1, v: 1});
                dragger.css("background-color", flatColor.toHexString());
                var format = currentPreferredFormat;
                if (currentAlpha < 1 && !(currentAlpha === 0 && format === "name")) {
                    if (format === "hex" || format === "hex3" || format === "hex6" || format === "name") {
                        format = "rgb"
                    }
                }
                var realColor = get({format: format}), displayColor = '';
                previewElement.removeClass("sp-clear-display");
                previewElement.css('background-color', 'transparent');
                if (!realColor && allowEmpty) {
                    previewElement.addClass("sp-clear-display")
                } else {
                    var realHex = realColor.toHexString(), realRgb = realColor.toRgbString();
                    if (rgbaSupport || realColor.alpha === 1) {
                        previewElement.css("background-color", realRgb)
                    } else {
                        previewElement.css("background-color", "transparent");
                        previewElement.css("filter", realColor.toFilter())
                    }
                    if (opts.showAlpha) {
                        var rgb = realColor.toRgb();
                        rgb.a = 0;
                        var realAlpha = tinycolor(rgb).toRgbString();
                        var gradient = "linear-gradient(left, " + realAlpha + ", " + realHex + ")";
                        if (IE) {
                            alphaSliderInner.css("filter", tinycolor(realAlpha).toFilter({gradientType: 1}, realHex))
                        } else {
                            alphaSliderInner.css("background", "-webkit-" + gradient);
                            alphaSliderInner.css("background", "-moz-" + gradient);
                            alphaSliderInner.css("background", "-ms-" + gradient);
                            alphaSliderInner.css("background", "linear-gradient(to right, " + realAlpha + ", " + realHex + ")")
                        }
                    }
                    displayColor = realColor.toString(format)
                }
                if (opts.showInput) {
                    textInput.val(displayColor)
                }
                if (opts.showPalette) {
                    drawPalette()
                }
                drawInitial()
            }

            function updateHelperLocations() {
                var s = currentSaturation;
                var v = currentValue;
                if (allowEmpty && isEmpty) {
                    alphaSlideHelper.hide();
                    slideHelper.hide();
                    dragHelper.hide()
                } else {
                    alphaSlideHelper.show();
                    slideHelper.show();
                    dragHelper.show();
                    var dragX = s * dragWidth;
                    var dragY = dragHeight - (v * dragHeight);
                    dragX = Math.max(-dragHelperHeight, Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight));
                    dragY = Math.max(-dragHelperHeight, Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight));
                    dragHelper.css({"top": dragY + "px", "left": dragX + "px"});
                    var alphaX = currentAlpha * alphaWidth;
                    alphaSlideHelper.css({"left": (alphaX - (alphaSlideHelperWidth / 2)) + "px"});
                    var slideY = (currentHue) * slideHeight;
                    slideHelper.css({"top": (slideY - slideHelperHeight) + "px"})
                }
            }

            function updateOriginalInput(fireCallback) {
                var color = get(), displayColor = '', hasChanged = !tinycolor.equals(color, colorOnShow);
                if (color) {
                    displayColor = color.toString(currentPreferredFormat);
                    addColorToSelectionPalette(color)
                }
                if (isInput) {
                    boundElement.val(displayColor)
                }
                if (fireCallback && hasChanged) {
                    callbacks.change(color);
                    boundElement.trigger('change', [color])
                }
            }

            function reflow() {
                dragWidth = dragger.width();
                dragHeight = dragger.height();
                dragHelperHeight = dragHelper.height();
                slideWidth = slider.width();
                slideHeight = slider.height();
                slideHelperHeight = slideHelper.height();
                alphaWidth = alphaSlider.width();
                alphaSlideHelperWidth = alphaSlideHelper.width();
                if (!flat) {
                    container.css("position", "absolute");
                    if (opts.offset) {
                        container.offset(opts.offset)
                    } else {
                        container.offset(getOffset(container, offsetElement))
                    }
                }
                updateHelperLocations();
                if (opts.showPalette) {
                    drawPalette()
                }
                boundElement.trigger('reflow.spectrum')
            }

            function destroy() {
                boundElement.show();
                offsetElement.unbind("click.spectrum touchstart.spectrum");
                container.remove();
                replacer.remove();
                spectrums[spect.id] = null
            }

            function option(optionName, optionValue) {
                if (optionName === undefined) {
                    return $.extend({}, opts)
                }
                if (optionValue === undefined) {
                    return opts[optionName]
                }
                opts[optionName] = optionValue;
                applyOptions()
            }

            function enable() {
                disabled = !1;
                boundElement.attr("disabled", !1);
                offsetElement.removeClass("sp-disabled")
            }

            function disable() {
                hide();
                disabled = !0;
                boundElement.attr("disabled", !0);
                offsetElement.addClass("sp-disabled")
            }

            function setOffset(coord) {
                opts.offset = coord;
                reflow()
            }

            initialize();
            var spect = {
                show: show,
                hide: hide,
                toggle: toggle,
                reflow: reflow,
                option: option,
                enable: enable,
                disable: disable,
                offset: setOffset,
                set: function (c) {
                    set(c);
                    updateOriginalInput()
                },
                get: get,
                destroy: destroy,
                container: container
            };
            spect.id = spectrums.push(spect) - 1;
            return spect
        }

        function getOffset(picker, input) {
            var extraY = 0;
            var dpWidth = picker.outerWidth();
            var dpHeight = picker.outerHeight();
            var inputHeight = input.outerHeight();
            var doc = picker[0].ownerDocument;
            var docElem = doc.documentElement;
            var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
            var viewHeight = docElem.clientHeight + $(doc).scrollTop();
            var offset = input.offset();
            offset.top += inputHeight;
            offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
            offset.top -= Math.min(offset.top, ((offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight - extraY) : extraY));
            return offset
        }

        function noop() {
        }

        function stopPropagation(e) {
            e.stopPropagation()
        }

        function bind(func, obj) {
            var slice = Array.prototype.slice;
            var args = slice.call(arguments, 2);
            return function () {
                return func.apply(obj, args.concat(slice.call(arguments)))
            }
        }

        function draggable(element, onmove, onstart, onstop) {
            onmove = onmove || function () {
            };
            onstart = onstart || function () {
            };
            onstop = onstop || function () {
            };
            var doc = document;
            var dragging = !1;
            var offset = {};
            var maxHeight = 0;
            var maxWidth = 0;
            var hasTouch = ('ontouchstart' in window);
            var duringDragEvents = {};
            duringDragEvents.selectstart = prevent;
            duringDragEvents.dragstart = prevent;
            duringDragEvents["touchmove mousemove"] = move;
            duringDragEvents["touchend mouseup"] = stop;

            function prevent(e) {
                if (e.stopPropagation) {
                    e.stopPropagation()
                }
                if (e.preventDefault) {
                    e.preventDefault()
                }
                e.returnValue = !1
            }

            function move(e) {
                if (dragging) {
                    if (IE && doc.documentMode < 9 && !e.button) {
                        return stop()
                    }
                    var t0 = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
                    var pageX = t0 && t0.pageX || e.pageX;
                    var pageY = t0 && t0.pageY || e.pageY;
                    var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
                    var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));
                    if (hasTouch) {
                        prevent(e)
                    }
                    onmove.apply(element, [dragX, dragY, e])
                }
            }

            function start(e) {
                var rightclick = (e.which) ? (e.which == 3) : (e.button == 2);
                if (!rightclick && !dragging) {
                    if (onstart.apply(element, arguments) !== !1) {
                        dragging = !0;
                        maxHeight = $(element).height();
                        maxWidth = $(element).width();
                        offset = $(element).offset();
                        $(doc).bind(duringDragEvents);
                        $(doc.body).addClass("sp-dragging");
                        move(e);
                        prevent(e)
                    }
                }
            }

            function stop() {
                if (dragging) {
                    $(doc).unbind(duringDragEvents);
                    $(doc.body).removeClass("sp-dragging");
                    setTimeout(function () {
                        onstop.apply(element, arguments)
                    }, 0)
                }
                dragging = !1
            }

            $(element).bind("touchstart mousedown", start)
        }

        function throttle(func, wait, debounce) {
            var timeout;
            return function () {
                var context = this, args = arguments;
                var throttler = function () {
                    timeout = null;
                    func.apply(context, args)
                };
                if (debounce) clearTimeout(timeout);
                if (debounce || !timeout) timeout = setTimeout(throttler, wait);
            }
        }

        function inputTypeColorSupport() {
            return $.fn.spectrum.inputTypeColorSupport()
        }

        var dataID = "spectrum.id";
        $.fn.spectrum = function (opts, extra) {
            if (typeof opts == "string") {
                var returnValue = this;
                var args = Array.prototype.slice.call(arguments, 1);
                this.each(function () {
                    var spect = spectrums[$(this).data(dataID)];
                    if (spect) {
                        var method = spect[opts];
                        if (!method) {
                            throw new Error("Spectrum: no such method: '" + opts + "'")
                        }
                        if (opts == "get") {
                            returnValue = spect.get()
                        } else if (opts == "container") {
                            returnValue = spect.container
                        } else if (opts == "option") {
                            returnValue = spect.option.apply(spect, args)
                        } else if (opts == "destroy") {
                            spect.destroy();
                            $(this).removeData(dataID)
                        } else {
                            method.apply(spect, args)
                        }
                    }
                });
                return returnValue
            }
            return this.spectrum("destroy").each(function () {
                var options = $.extend({}, opts, $(this).data());
                var spect = spectrum(this, options);
                $(this).data(dataID, spect.id)
            })
        };
        $.fn.spectrum.load = !0;
        $.fn.spectrum.loadOpts = {};
        $.fn.spectrum.draggable = draggable;
        $.fn.spectrum.defaults = defaultOpts;
        $.fn.spectrum.inputTypeColorSupport = function inputTypeColorSupport() {
            if (typeof inputTypeColorSupport._cachedResult === "undefined") {
                var colorInput = $("<input type='color'/>")[0];
                inputTypeColorSupport._cachedResult = colorInput.type === "color" && colorInput.value !== ""
            }
            return inputTypeColorSupport._cachedResult
        };
        $.spectrum = {};
        $.spectrum.localization = {};
        $.spectrum.palettes = {};
        $.fn.spectrum.processNativeColorInputs = function () {
            var colorInputs = $("input[type=color]");
            if (colorInputs.length && !inputTypeColorSupport()) {
                colorInputs.spectrum({preferredFormat: "hex6"})
            }
        };
        (function () {
            var trimLeft = /^[\s,#]+/, trimRight = /\s+$/, tinyCounter = 0, math = Math, mathRound = math.round,
                mathMin = math.min, mathMax = math.max, mathRandom = math.random;
            var tinycolor = function (color, opts) {
                color = (color) ? color : '';
                opts = opts || {};
                if (color instanceof tinycolor) {
                    return color
                }
                if (!(this instanceof tinycolor)) {
                    return new tinycolor(color, opts)
                }
                var rgb = inputToRGB(color);
                this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
                this._gradientType = opts.gradientType;
                if (this._r < 1) {
                    this._r = mathRound(this._r)
                }
                if (this._g < 1) {
                    this._g = mathRound(this._g)
                }
                if (this._b < 1) {
                    this._b = mathRound(this._b)
                }
                this._ok = rgb.ok;
                this._tc_id = tinyCounter++
            };
            tinycolor.prototype = {
                isDark: function () {
                    return this.getBrightness() < 128
                }, isLight: function () {
                    return !this.isDark()
                }, isValid: function () {
                    return this._ok
                }, getOriginalInput: function () {
                    return this._originalInput
                }, getFormat: function () {
                    return this._format
                }, getAlpha: function () {
                    return this._a
                }, getBrightness: function () {
                    var rgb = this.toRgb();
                    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
                }, setAlpha: function (value) {
                    this._a = boundAlpha(value);
                    this._roundA = mathRound(100 * this._a) / 100;
                    return this
                }, toHsv: function () {
                    var hsv = rgbToHsv(this._r, this._g, this._b);
                    return {h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a}
                }, toHsvString: function () {
                    var hsv = rgbToHsv(this._r, this._g, this._b);
                    var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
                    return (this._a == 1) ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")"
                }, toHsl: function () {
                    var hsl = rgbToHsl(this._r, this._g, this._b);
                    return {h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a}
                }, toHslString: function () {
                    var hsl = rgbToHsl(this._r, this._g, this._b);
                    var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
                    return (this._a == 1) ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")"
                }, toHex: function (allow3Char) {
                    return rgbToHex(this._r, this._g, this._b, allow3Char)
                }, toHexString: function (allow3Char) {
                    return '#' + this.toHex(allow3Char)
                }, toHex8: function () {
                    return rgbaToHex(this._r, this._g, this._b, this._a)
                }, toHex8String: function () {
                    return '#' + this.toHex8()
                }, toRgb: function () {
                    return {r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a}
                }, toRgbString: function () {
                    return (this._a == 1) ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")"
                }, toPercentageRgb: function () {
                    return {
                        r: mathRound(bound01(this._r, 255) * 100) + "%",
                        g: mathRound(bound01(this._g, 255) * 100) + "%",
                        b: mathRound(bound01(this._b, 255) * 100) + "%",
                        a: this._a
                    }
                }, toPercentageRgbString: function () {
                    return (this._a == 1) ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")"
                }, toName: function () {
                    if (this._a === 0) {
                        return "transparent"
                    }
                    if (this._a < 1) {
                        return !1
                    }
                    return hexNames[rgbToHex(this._r, this._g, this._b, !0)] || !1
                }, toFilter: function (secondColor) {
                    var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
                    var secondHex8String = hex8String;
                    var gradientType = this._gradientType ? "GradientType = 1, " : "";
                    if (secondColor) {
                        var s = tinycolor(secondColor);
                        secondHex8String = s.toHex8String()
                    }
                    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")"
                }, toString: function (format) {
                    var formatSet = !!format;
                    format = format || this._format;
                    var formattedString = !1;
                    var hasAlpha = this._a < 1 && this._a >= 0;
                    var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");
                    if (needsAlphaFormat) {
                        if (format === "name" && this._a === 0) {
                            return this.toName()
                        }
                        return this.toRgbString()
                    }
                    if (format === "rgb") {
                        formattedString = this.toRgbString()
                    }
                    if (format === "prgb") {
                        formattedString = this.toPercentageRgbString()
                    }
                    if (format === "hex" || format === "hex6") {
                        formattedString = this.toHexString()
                    }
                    if (format === "hex3") {
                        formattedString = this.toHexString(!0)
                    }
                    if (format === "hex8") {
                        formattedString = this.toHex8String()
                    }
                    if (format === "name") {
                        formattedString = this.toName()
                    }
                    if (format === "hsl") {
                        formattedString = this.toHslString()
                    }
                    if (format === "hsv") {
                        formattedString = this.toHsvString()
                    }
                    return formattedString || this.toHexString()
                }, _applyModification: function (fn, args) {
                    var color = fn.apply(null, [this].concat([].slice.call(args)));
                    this._r = color._r;
                    this._g = color._g;
                    this._b = color._b;
                    this.setAlpha(color._a);
                    return this
                }, lighten: function () {
                    return this._applyModification(lighten, arguments)
                }, brighten: function () {
                    return this._applyModification(brighten, arguments)
                }, darken: function () {
                    return this._applyModification(darken, arguments)
                }, desaturate: function () {
                    return this._applyModification(desaturate, arguments)
                }, saturate: function () {
                    return this._applyModification(saturate, arguments)
                }, greyscale: function () {
                    return this._applyModification(greyscale, arguments)
                }, spin: function () {
                    return this._applyModification(spin, arguments)
                }, _applyCombination: function (fn, args) {
                    return fn.apply(null, [this].concat([].slice.call(args)))
                }, analogous: function () {
                    return this._applyCombination(analogous, arguments)
                }, complement: function () {
                    return this._applyCombination(complement, arguments)
                }, monochromatic: function () {
                    return this._applyCombination(monochromatic, arguments)
                }, splitcomplement: function () {
                    return this._applyCombination(splitcomplement, arguments)
                }, triad: function () {
                    return this._applyCombination(triad, arguments)
                }, tetrad: function () {
                    return this._applyCombination(tetrad, arguments)
                }
            };
            tinycolor.fromRatio = function (color, opts) {
                if (typeof color == "object") {
                    var newColor = {};
                    for (var i in color) {
                        if (color.hasOwnProperty(i)) {
                            if (i === "a") {
                                newColor[i] = color[i]
                            } else {
                                newColor[i] = convertToPercentage(color[i])
                            }
                        }
                    }
                    color = newColor
                }
                return tinycolor(color, opts)
            };

            function inputToRGB(color) {
                var rgb = {r: 0, g: 0, b: 0};
                var a = 1;
                var ok = !1;
                var format = !1;
                if (typeof color == "string") {
                    color = stringInputToObject(color)
                }
                if (typeof color == "object") {
                    if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
                        rgb = rgbToRgb(color.r, color.g, color.b);
                        ok = !0;
                        format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb"
                    } else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
                        color.s = convertToPercentage(color.s);
                        color.v = convertToPercentage(color.v);
                        rgb = hsvToRgb(color.h, color.s, color.v);
                        ok = !0;
                        format = "hsv"
                    } else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
                        color.s = convertToPercentage(color.s);
                        color.l = convertToPercentage(color.l);
                        rgb = hslToRgb(color.h, color.s, color.l);
                        ok = !0;
                        format = "hsl"
                    }
                    if (color.hasOwnProperty("a")) {
                        a = color.a
                    }
                }
                a = boundAlpha(a);
                return {
                    ok: ok,
                    format: color.format || format,
                    r: mathMin(255, mathMax(rgb.r, 0)),
                    g: mathMin(255, mathMax(rgb.g, 0)),
                    b: mathMin(255, mathMax(rgb.b, 0)),
                    a: a
                }
            }

            function rgbToRgb(r, g, b) {
                return {r: bound01(r, 255) * 255, g: bound01(g, 255) * 255, b: bound01(b, 255) * 255}
            }

            function rgbToHsl(r, g, b) {
                r = bound01(r, 255);
                g = bound01(g, 255);
                b = bound01(b, 255);
                var max = mathMax(r, g, b), min = mathMin(r, g, b);
                var h, s, l = (max + min) / 2;
                if (max == min) {
                    h = s = 0
                } else {
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break
                    }
                    h /= 6
                }
                return {h: h, s: s, l: l}
            }

            function hslToRgb(h, s, l) {
                var r, g, b;
                h = bound01(h, 360);
                s = bound01(s, 100);
                l = bound01(l, 100);

                function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p
                }

                if (s === 0) {
                    r = g = b = l
                } else {
                    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    var p = 2 * l - q;
                    r = hue2rgb(p, q, h + 1 / 3);
                    g = hue2rgb(p, q, h);
                    b = hue2rgb(p, q, h - 1 / 3)
                }
                return {r: r * 255, g: g * 255, b: b * 255}
            }

            function rgbToHsv(r, g, b) {
                r = bound01(r, 255);
                g = bound01(g, 255);
                b = bound01(b, 255);
                var max = mathMax(r, g, b), min = mathMin(r, g, b);
                var h, s, v = max;
                var d = max - min;
                s = max === 0 ? 0 : d / max;
                if (max == min) {
                    h = 0
                } else {
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break
                    }
                    h /= 6
                }
                return {h: h, s: s, v: v}
            }

            function hsvToRgb(h, s, v) {
                h = bound01(h, 360) * 6;
                s = bound01(s, 100);
                v = bound01(v, 100);
                var i = math.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s),
                    mod = i % 6, r = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
                return {r: r * 255, g: g * 255, b: b * 255}
            }

            function rgbToHex(r, g, b, allow3Char) {
                var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];
                if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
                    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0)
                }
                return hex.join("")
            }

            function rgbaToHex(r, g, b, a) {
                var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];
                return hex.join("")
            }

            tinycolor.equals = function (color1, color2) {
                if (!color1 || !color2) {
                    return !1
                }
                return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString()
            };
            tinycolor.random = function () {
                return tinycolor.fromRatio({r: mathRandom(), g: mathRandom(), b: mathRandom()})
            };

            function desaturate(color, amount) {
                amount = (amount === 0) ? 0 : (amount || 10);
                var hsl = tinycolor(color).toHsl();
                hsl.s -= amount / 100;
                hsl.s = clamp01(hsl.s);
                return tinycolor(hsl)
            }

            function saturate(color, amount) {
                amount = (amount === 0) ? 0 : (amount || 10);
                var hsl = tinycolor(color).toHsl();
                hsl.s += amount / 100;
                hsl.s = clamp01(hsl.s);
                return tinycolor(hsl)
            }

            function greyscale(color) {
                return tinycolor(color).desaturate(100)
            }

            function lighten(color, amount) {
                amount = (amount === 0) ? 0 : (amount || 10);
                var hsl = tinycolor(color).toHsl();
                hsl.l += amount / 100;
                hsl.l = clamp01(hsl.l);
                return tinycolor(hsl)
            }

            function brighten(color, amount) {
                amount = (amount === 0) ? 0 : (amount || 10);
                var rgb = tinycolor(color).toRgb();
                rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
                rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
                rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
                return tinycolor(rgb)
            }

            function darken(color, amount) {
                amount = (amount === 0) ? 0 : (amount || 10);
                var hsl = tinycolor(color).toHsl();
                hsl.l -= amount / 100;
                hsl.l = clamp01(hsl.l);
                return tinycolor(hsl)
            }

            function spin(color, amount) {
                var hsl = tinycolor(color).toHsl();
                var hue = (mathRound(hsl.h) + amount) % 360;
                hsl.h = hue < 0 ? 360 + hue : hue;
                return tinycolor(hsl)
            }

            function complement(color) {
                var hsl = tinycolor(color).toHsl();
                hsl.h = (hsl.h + 180) % 360;
                return tinycolor(hsl)
            }

            function triad(color) {
                var hsl = tinycolor(color).toHsl();
                var h = hsl.h;
                return [tinycolor(color), tinycolor({
                    h: (h + 120) % 360,
                    s: hsl.s,
                    l: hsl.l
                }), tinycolor({h: (h + 240) % 360, s: hsl.s, l: hsl.l})]
            }

            function tetrad(color) {
                var hsl = tinycolor(color).toHsl();
                var h = hsl.h;
                return [tinycolor(color), tinycolor({
                    h: (h + 90) % 360,
                    s: hsl.s,
                    l: hsl.l
                }), tinycolor({h: (h + 180) % 360, s: hsl.s, l: hsl.l}), tinycolor({
                    h: (h + 270) % 360,
                    s: hsl.s,
                    l: hsl.l
                })]
            }

            function splitcomplement(color) {
                var hsl = tinycolor(color).toHsl();
                var h = hsl.h;
                return [tinycolor(color), tinycolor({
                    h: (h + 72) % 360,
                    s: hsl.s,
                    l: hsl.l
                }), tinycolor({h: (h + 216) % 360, s: hsl.s, l: hsl.l})]
            }

            function analogous(color, results, slices) {
                results = results || 6;
                slices = slices || 30;
                var hsl = tinycolor(color).toHsl();
                var part = 360 / slices;
                var ret = [tinycolor(color)];
                for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results;) {
                    hsl.h = (hsl.h + part) % 360;
                    ret.push(tinycolor(hsl))
                }
                return ret
            }

            function monochromatic(color, results) {
                results = results || 6;
                var hsv = tinycolor(color).toHsv();
                var h = hsv.h, s = hsv.s, v = hsv.v;
                var ret = [];
                var modification = 1 / results;
                while (results--) {
                    ret.push(tinycolor({h: h, s: s, v: v}));
                    v = (v + modification) % 1
                }
                return ret
            }

            tinycolor.mix = function (color1, color2, amount) {
                amount = (amount === 0) ? 0 : (amount || 50);
                var rgb1 = tinycolor(color1).toRgb();
                var rgb2 = tinycolor(color2).toRgb();
                var p = amount / 100;
                var w = p * 2 - 1;
                var a = rgb2.a - rgb1.a;
                var w1;
                if (w * a == -1) {
                    w1 = w
                } else {
                    w1 = (w + a) / (1 + w * a)
                }
                w1 = (w1 + 1) / 2;
                var w2 = 1 - w1;
                var rgba = {
                    r: rgb2.r * w1 + rgb1.r * w2,
                    g: rgb2.g * w1 + rgb1.g * w2,
                    b: rgb2.b * w1 + rgb1.b * w2,
                    a: rgb2.a * p + rgb1.a * (1 - p)
                };
                return tinycolor(rgba)
            };
            tinycolor.readability = function (color1, color2) {
                var c1 = tinycolor(color1);
                var c2 = tinycolor(color2);
                var rgb1 = c1.toRgb();
                var rgb2 = c2.toRgb();
                var brightnessA = c1.getBrightness();
                var brightnessB = c2.getBrightness();
                var colorDiff = (Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) + Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) + Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b));
                return {brightness: Math.abs(brightnessA - brightnessB), color: colorDiff}
            };
            tinycolor.isReadable = function (color1, color2) {
                var readability = tinycolor.readability(color1, color2);
                return readability.brightness > 125 && readability.color > 500
            };
            tinycolor.mostReadable = function (baseColor, colorList) {
                var bestColor = null;
                var bestScore = 0;
                var bestIsReadable = !1;
                for (var i = 0; i < colorList.length; i++) {
                    var readability = tinycolor.readability(baseColor, colorList[i]);
                    var readable = readability.brightness > 125 && readability.color > 500;
                    var score = 3 * (readability.brightness / 125) + (readability.color / 500);
                    if ((readable && !bestIsReadable) || (readable && bestIsReadable && score > bestScore) || ((!readable) && (!bestIsReadable) && score > bestScore)) {
                        bestIsReadable = readable;
                        bestScore = score;
                        bestColor = tinycolor(colorList[i])
                    }
                }
                return bestColor
            };
            var names = tinycolor.names = {
                aliceblue: "f0f8ff",
                antiquewhite: "faebd7",
                aqua: "0ff",
                aquamarine: "7fffd4",
                azure: "f0ffff",
                beige: "f5f5dc",
                bisque: "ffe4c4",
                black: "000",
                blanchedalmond: "ffebcd",
                blue: "00f",
                blueviolet: "8a2be2",
                brown: "a52a2a",
                burlywood: "deb887",
                burntsienna: "ea7e5d",
                cadetblue: "5f9ea0",
                chartreuse: "7fff00",
                chocolate: "d2691e",
                coral: "ff7f50",
                cornflowerblue: "6495ed",
                cornsilk: "fff8dc",
                crimson: "dc143c",
                cyan: "0ff",
                darkblue: "00008b",
                darkcyan: "008b8b",
                darkgoldenrod: "b8860b",
                darkgray: "a9a9a9",
                darkgreen: "006400",
                darkgrey: "a9a9a9",
                darkkhaki: "bdb76b",
                darkmagenta: "8b008b",
                darkolivegreen: "556b2f",
                darkorange: "ff8c00",
                darkorchid: "9932cc",
                darkred: "8b0000",
                darksalmon: "e9967a",
                darkseagreen: "8fbc8f",
                darkslateblue: "483d8b",
                darkslategray: "2f4f4f",
                darkslategrey: "2f4f4f",
                darkturquoise: "00ced1",
                darkviolet: "9400d3",
                deeppink: "ff1493",
                deepskyblue: "00bfff",
                dimgray: "696969",
                dimgrey: "696969",
                dodgerblue: "1e90ff",
                firebrick: "b22222",
                floralwhite: "fffaf0",
                forestgreen: "228b22",
                fuchsia: "f0f",
                gainsboro: "dcdcdc",
                ghostwhite: "f8f8ff",
                gold: "ffd700",
                goldenrod: "daa520",
                gray: "808080",
                green: "008000",
                greenyellow: "adff2f",
                grey: "808080",
                honeydew: "f0fff0",
                hotpink: "ff69b4",
                indianred: "cd5c5c",
                indigo: "4b0082",
                ivory: "fffff0",
                khaki: "f0e68c",
                lavender: "e6e6fa",
                lavenderblush: "fff0f5",
                lawngreen: "7cfc00",
                lemonchiffon: "fffacd",
                lightblue: "add8e6",
                lightcoral: "f08080",
                lightcyan: "e0ffff",
                lightgoldenrodyellow: "fafad2",
                lightgray: "d3d3d3",
                lightgreen: "90ee90",
                lightgrey: "d3d3d3",
                lightpink: "ffb6c1",
                lightsalmon: "ffa07a",
                lightseagreen: "20b2aa",
                lightskyblue: "87cefa",
                lightslategray: "789",
                lightslategrey: "789",
                lightsteelblue: "b0c4de",
                lightyellow: "ffffe0",
                lime: "0f0",
                limegreen: "32cd32",
                linen: "faf0e6",
                magenta: "f0f",
                maroon: "800000",
                mediumaquamarine: "66cdaa",
                mediumblue: "0000cd",
                mediumorchid: "ba55d3",
                mediumpurple: "9370db",
                mediumseagreen: "3cb371",
                mediumslateblue: "7b68ee",
                mediumspringgreen: "00fa9a",
                mediumturquoise: "48d1cc",
                mediumvioletred: "c71585",
                midnightblue: "191970",
                mintcream: "f5fffa",
                mistyrose: "ffe4e1",
                moccasin: "ffe4b5",
                navajowhite: "ffdead",
                navy: "000080",
                oldlace: "fdf5e6",
                olive: "808000",
                olivedrab: "6b8e23",
                orange: "ffa500",
                orangered: "ff4500",
                orchid: "da70d6",
                palegoldenrod: "eee8aa",
                palegreen: "98fb98",
                paleturquoise: "afeeee",
                palevioletred: "db7093",
                papayawhip: "ffefd5",
                peachpuff: "ffdab9",
                peru: "cd853f",
                pink: "ffc0cb",
                plum: "dda0dd",
                powderblue: "b0e0e6",
                purple: "800080",
                rebeccapurple: "663399",
                red: "f00",
                rosybrown: "bc8f8f",
                royalblue: "4169e1",
                saddlebrown: "8b4513",
                salmon: "fa8072",
                sandybrown: "f4a460",
                seagreen: "2e8b57",
                seashell: "fff5ee",
                sienna: "a0522d",
                silver: "c0c0c0",
                skyblue: "87ceeb",
                slateblue: "6a5acd",
                slategray: "708090",
                slategrey: "708090",
                snow: "fffafa",
                springgreen: "00ff7f",
                steelblue: "4682b4",
                tan: "d2b48c",
                teal: "008080",
                thistle: "d8bfd8",
                tomato: "ff6347",
                turquoise: "40e0d0",
                violet: "ee82ee",
                wheat: "f5deb3",
                white: "fff",
                whitesmoke: "f5f5f5",
                yellow: "ff0",
                yellowgreen: "9acd32"
            };
            var hexNames = tinycolor.hexNames = flip(names);

            function flip(o) {
                var flipped = {};
                for (var i in o) {
                    if (o.hasOwnProperty(i)) {
                        flipped[o[i]] = i
                    }
                }
                return flipped
            }

            function boundAlpha(a) {
                a = parseFloat(a);
                if (isNaN(a) || a < 0 || a > 1) {
                    a = 1
                }
                return a
            }

            function bound01(n, max) {
                if (isOnePointZero(n)) {
                    n = "100%"
                }
                var processPercent = isPercentage(n);
                n = mathMin(max, mathMax(0, parseFloat(n)));
                if (processPercent) {
                    n = parseInt(n * max, 10) / 100
                }
                if ((math.abs(n - max) < 0.000001)) {
                    return 1
                }
                return (n % max) / parseFloat(max)
            }

            function clamp01(val) {
                return mathMin(1, mathMax(0, val))
            }

            function parseIntFromHex(val) {
                return parseInt(val, 16)
            }

            function isOnePointZero(n) {
                return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1
            }

            function isPercentage(n) {
                return typeof n === "string" && n.indexOf('%') != -1
            }

            function pad2(c) {
                return c.length == 1 ? '0' + c : '' + c
            }

            function convertToPercentage(n) {
                if (n <= 1) {
                    n = (n * 100) + "%"
                }
                return n
            }

            function convertDecimalToHex(d) {
                return Math.round(parseFloat(d) * 255).toString(16)
            }

            function convertHexToDecimal(h) {
                return (parseIntFromHex(h) / 255)
            }

            var matchers = (function () {
                var CSS_INTEGER = "[-\\+]?\\d+%?";
                var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
                var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
                var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
                var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
                return {
                    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
                    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
                    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
                    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
                    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
                    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
                    hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                    hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                    hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
                }
            })();

            function stringInputToObject(color) {
                color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
                var named = !1;
                if (names[color]) {
                    color = names[color];
                    named = !0
                } else if (color == 'transparent') {
                    return {r: 0, g: 0, b: 0, a: 0, format: "name"}
                }
                var match;
                if ((match = matchers.rgb.exec(color))) {
                    return {r: match[1], g: match[2], b: match[3]}
                }
                if ((match = matchers.rgba.exec(color))) {
                    return {r: match[1], g: match[2], b: match[3], a: match[4]}
                }
                if ((match = matchers.hsl.exec(color))) {
                    return {h: match[1], s: match[2], l: match[3]}
                }
                if ((match = matchers.hsla.exec(color))) {
                    return {h: match[1], s: match[2], l: match[3], a: match[4]}
                }
                if ((match = matchers.hsv.exec(color))) {
                    return {h: match[1], s: match[2], v: match[3]}
                }
                if ((match = matchers.hsva.exec(color))) {
                    return {h: match[1], s: match[2], v: match[3], a: match[4]}
                }
                if ((match = matchers.hex8.exec(color))) {
                    return {
                        a: convertHexToDecimal(match[1]),
                        r: parseIntFromHex(match[2]),
                        g: parseIntFromHex(match[3]),
                        b: parseIntFromHex(match[4]),
                        format: named ? "name" : "hex8"
                    }
                }
                if ((match = matchers.hex6.exec(color))) {
                    return {
                        r: parseIntFromHex(match[1]),
                        g: parseIntFromHex(match[2]),
                        b: parseIntFromHex(match[3]),
                        format: named ? "name" : "hex"
                    }
                }
                if ((match = matchers.hex3.exec(color))) {
                    return {
                        r: parseIntFromHex(match[1] + '' + match[1]),
                        g: parseIntFromHex(match[2] + '' + match[2]),
                        b: parseIntFromHex(match[3] + '' + match[3]),
                        format: named ? "name" : "hex"
                    }
                }
                return !1
            }

            window.tinycolor = tinycolor
        })();
        $(function () {
            if ($.fn.spectrum.load) {
                $.fn.spectrum.processNativeColorInputs()
            }
        })
    });
    (function ($) {
        var types = ['DOMMouseScroll', 'mousewheel'];
        if ($.event.fixHooks) {
            for (var i = types.length; i;) {
                $.event.fixHooks[types[--i]] = $.event.mouseHooks
            }
        }
        $.event.special.mousewheel = {
            setup: function () {
                if (this.addEventListener) {
                    for (var i = types.length; i;) {
                        this.addEventListener(types[--i], handler, !1)
                    }
                } else {
                    this.onmousewheel = handler
                }
            }, teardown: function () {
                if (this.removeEventListener) {
                    for (var i = types.length; i;) {
                        this.removeEventListener(types[--i], handler, !1)
                    }
                } else {
                    this.onmousewheel = null
                }
            }
        };
        $.fn.extend({
            mousewheel: function (fn) {
                return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel")
            }, unmousewheel: function (fn) {
                return this.unbind("mousewheel", fn)
            }
        });

        function handler(event) {
            var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, returnValue = !0,
                deltaX = 0, deltaY = 0;
            event = $.event.fix(orgEvent);
            event.type = "mousewheel";
            if (orgEvent.wheelDelta) {
                delta = orgEvent.wheelDelta / 120
            }
            if (orgEvent.detail) {
                delta = -orgEvent.detail / 3
            }
            deltaY = delta;
            if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
                deltaY = 0;
                deltaX = -1 * delta
            }
            if (orgEvent.wheelDeltaY !== undefined) {
                deltaY = orgEvent.wheelDeltaY / 120
            }
            if (orgEvent.wheelDeltaX !== undefined) {
                deltaX = -1 * orgEvent.wheelDeltaX / 120
            }
            args.unshift(event, delta, deltaX, deltaY);
            return ($.event.dispatch || $.event.handle).apply(this, args)
        }
    })(jQuery);
    !function t(e, n, r) {
        function o(i, s) {
            if (!n[i]) {
                if (!e[i]) {
                    var a = "function" == typeof require && require;
                    if (!s && a) return a(i, !0);
                    if (l) return l(i, !0);
                    var c = new Error("Cannot find module '" + i + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = n[i] = {exports: {}};
                e[i][0].call(u.exports, function (t) {
                    var n = e[i][1][t];
                    return o(n ? n : t)
                }, u, u.exports, t, e, n, r)
            }
            return n[i].exports
        }

        for (var l = "function" == typeof require && require, i = 0; i < r.length; i++) o(r[i]);
        return o
    }({
        1: [function (t, e, n) {
            "use strict";

            function r(t) {
                t.fn.perfectScrollbar = function (t) {
                    return this.each(function () {
                        if ("object" == typeof t || "undefined" == typeof t) {
                            var e = t;
                            l.get(this) || o.initialize(this, e)
                        } else {
                            var n = t;
                            "update" === n ? o.update(this) : "destroy" === n && o.destroy(this)
                        }
                    })
                }
            }

            var o = t("../main"), l = t("../plugin/instances");
            if ("function" == typeof define && define.amd) define(["jquery"], r); else {
                var i = window.jQuery ? window.jQuery : window.$;
                "undefined" != typeof i && r(i)
            }
            e.exports = r
        }, {"../main": 7, "../plugin/instances": 18}],
        2: [function (t, e, n) {
            "use strict";

            function r(t, e) {
                var n = t.className.split(" ");
                n.indexOf(e) < 0 && n.push(e), t.className = n.join(" ")
            }

            function o(t, e) {
                var n = t.className.split(" "), r = n.indexOf(e);
                r >= 0 && n.splice(r, 1), t.className = n.join(" ")
            }

            n.add = function (t, e) {
                t.classList ? t.classList.add(e) : r(t, e)
            }, n.remove = function (t, e) {
                t.classList ? t.classList.remove(e) : o(t, e)
            }, n.list = function (t) {
                return t.classList ? Array.prototype.slice.apply(t.classList) : t.className.split(" ")
            }
        }, {}],
        3: [function (t, e, n) {
            "use strict";

            function r(t, e) {
                return window.getComputedStyle(t)[e]
            }

            function o(t, e, n) {
                return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t
            }

            function l(t, e) {
                for (var n in e) {
                    var r = e[n];
                    "number" == typeof r && (r = r.toString() + "px"), t.style[n] = r
                }
                return t
            }

            var i = {};
            i.e = function (t, e) {
                var n = document.createElement(t);
                return n.className = e, n
            }, i.appendTo = function (t, e) {
                return e.appendChild(t), t
            }, i.css = function (t, e, n) {
                return "object" == typeof e ? l(t, e) : "undefined" == typeof n ? r(t, e) : o(t, e, n)
            }, i.matches = function (t, e) {
                return "undefined" != typeof t.matches ? t.matches(e) : "undefined" != typeof t.matchesSelector ? t.matchesSelector(e) : "undefined" != typeof t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : "undefined" != typeof t.mozMatchesSelector ? t.mozMatchesSelector(e) : "undefined" != typeof t.msMatchesSelector ? t.msMatchesSelector(e) : void 0
            }, i.remove = function (t) {
                "undefined" != typeof t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
            }, i.queryChildren = function (t, e) {
                return Array.prototype.filter.call(t.childNodes, function (t) {
                    return i.matches(t, e)
                })
            }, e.exports = i
        }, {}],
        4: [function (t, e, n) {
            "use strict";
            var r = function (t) {
                this.element = t, this.events = {}
            };
            r.prototype.bind = function (t, e) {
                "undefined" == typeof this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1)
            }, r.prototype.unbind = function (t, e) {
                var n = "undefined" != typeof e;
                this.events[t] = this.events[t].filter(function (r) {
                    return !(!n || r === e) || (this.element.removeEventListener(t, r, !1), !1)
                }, this)
            }, r.prototype.unbindAll = function () {
                for (var t in this.events) this.unbind(t)
            };
            var o = function () {
                this.eventElements = []
            };
            o.prototype.eventElement = function (t) {
                var e = this.eventElements.filter(function (e) {
                    return e.element === t
                })[0];
                return "undefined" == typeof e && (e = new r(t), this.eventElements.push(e)), e
            }, o.prototype.bind = function (t, e, n) {
                this.eventElement(t).bind(e, n)
            }, o.prototype.unbind = function (t, e, n) {
                this.eventElement(t).unbind(e, n)
            }, o.prototype.unbindAll = function () {
                for (var t = 0; t < this.eventElements.length; t++) this.eventElements[t].unbindAll()
            }, o.prototype.once = function (t, e, n) {
                var r = this.eventElement(t), o = function (t) {
                    r.unbind(e, o), n(t)
                };
                r.bind(e, o)
            }, e.exports = o
        }, {}],
        5: [function (t, e, n) {
            "use strict";
            e.exports = function () {
                function t() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }

                return function () {
                    return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
                }
            }()
        }, {}],
        6: [function (t, e, n) {
            "use strict";
            var r = t("./class"), o = t("./dom"), l = n.toInt = function (t) {
                return parseInt(t, 10) || 0
            }, i = n.clone = function (t) {
                if (t) {
                    if (t.constructor === Array) return t.map(i);
                    if ("object" == typeof t) {
                        var e = {};
                        for (var n in t) e[n] = i(t[n]);
                        return e
                    }
                    return t
                }
                return null
            };
            n.extend = function (t, e) {
                var n = i(t);
                for (var r in e) n[r] = i(e[r]);
                return n
            }, n.isEditable = function (t) {
                return o.matches(t, "input,[contenteditable]") || o.matches(t, "select,[contenteditable]") || o.matches(t, "textarea,[contenteditable]") || o.matches(t, "button,[contenteditable]")
            }, n.removePsClasses = function (t) {
                for (var e = r.list(t), n = 0; n < e.length; n++) {
                    var o = e[n];
                    0 === o.indexOf("ps-") && r.remove(t, o)
                }
            }, n.outerWidth = function (t) {
                return l(o.css(t, "width")) + l(o.css(t, "paddingLeft")) + l(o.css(t, "paddingRight")) + l(o.css(t, "borderLeftWidth")) + l(o.css(t, "borderRightWidth"))
            }, n.startScrolling = function (t, e) {
                r.add(t, "ps-in-scrolling"), "undefined" != typeof e ? r.add(t, "ps-" + e) : (r.add(t, "ps-x"), r.add(t, "ps-y"))
            }, n.stopScrolling = function (t, e) {
                r.remove(t, "ps-in-scrolling"), "undefined" != typeof e ? r.remove(t, "ps-" + e) : (r.remove(t, "ps-x"), r.remove(t, "ps-y"))
            }, n.env = {
                isWebKit: "WebkitAppearance" in document.documentElement.style,
                supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                supportsIePointer: null !== window.navigator.msMaxTouchPoints
            }
        }, {"./class": 2, "./dom": 3}],
        7: [function (t, e, n) {
            "use strict";
            var r = t("./plugin/destroy"), o = t("./plugin/initialize"), l = t("./plugin/update");
            e.exports = {initialize: o, update: l, destroy: r}
        }, {"./plugin/destroy": 9, "./plugin/initialize": 17, "./plugin/update": 21}],
        8: [function (t, e, n) {
            "use strict";
            e.exports = {
                handlers: ["click-rail", "drag-scrollbar", "keyboard", "wheel", "touch"],
                maxScrollbarLength: null,
                minScrollbarLength: null,
                scrollXMarginOffset: 0,
                scrollYMarginOffset: 0,
                suppressScrollX: !1,
                suppressScrollY: !1,
                swipePropagation: !0,
                useBothWheelAxes: !1,
                wheelPropagation: !1,
                wheelSpeed: 1,
                theme: "default"
            }
        }, {}],
        9: [function (t, e, n) {
            "use strict";
            var r = t("../lib/helper"), o = t("../lib/dom"), l = t("./instances");
            e.exports = function (t) {
                var e = l.get(t);
                e && (e.event.unbindAll(), o.remove(e.scrollbarX), o.remove(e.scrollbarY), o.remove(e.scrollbarXRail), o.remove(e.scrollbarYRail), r.removePsClasses(t), l.remove(t))
            }
        }, {"../lib/dom": 3, "../lib/helper": 6, "./instances": 18}],
        10: [function (t, e, n) {
            "use strict";

            function r(t, e) {
                function n(t) {
                    return t.getBoundingClientRect()
                }

                var r = function (t) {
                    t.stopPropagation()
                };
                e.event.bind(e.scrollbarY, "click", r), e.event.bind(e.scrollbarYRail, "click", function (r) {
                    var o = r.pageY - window.pageYOffset - n(e.scrollbarYRail).top, s = o > e.scrollbarYTop ? 1 : -1;
                    i(t, "top", t.scrollTop + s * e.containerHeight), l(t), r.stopPropagation()
                }), e.event.bind(e.scrollbarX, "click", r), e.event.bind(e.scrollbarXRail, "click", function (r) {
                    var o = r.pageX - window.pageXOffset - n(e.scrollbarXRail).left, s = o > e.scrollbarXLeft ? 1 : -1;
                    i(t, "left", t.scrollLeft + s * e.containerWidth), l(t), r.stopPropagation()
                })
            }

            var o = t("../instances"), l = t("../update-geometry"), i = t("../update-scroll");
            e.exports = function (t) {
                var e = o.get(t);
                r(t, e)
            }
        }, {"../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        11: [function (t, e, n) {
            "use strict";

            function r(t, e) {
                function n(n) {
                    var o = r + n * e.railXRatio,
                        i = Math.max(0, e.scrollbarXRail.getBoundingClientRect().left) + e.railXRatio * (e.railXWidth - e.scrollbarXWidth);
                    o < 0 ? e.scrollbarXLeft = 0 : o > i ? e.scrollbarXLeft = i : e.scrollbarXLeft = o;
                    var s = l.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.railXRatio * e.scrollbarXWidth)) - e.negativeScrollAdjustment;
                    c(t, "left", s)
                }

                var r = null, o = null, s = function (e) {
                    n(e.pageX - o), a(t), e.stopPropagation(), e.preventDefault()
                }, u = function () {
                    l.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", s)
                };
                e.event.bind(e.scrollbarX, "mousedown", function (n) {
                    o = n.pageX, r = l.toInt(i.css(e.scrollbarX, "left")) * e.railXRatio, l.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
                })
            }

            function o(t, e) {
                function n(n) {
                    var o = r + n * e.railYRatio,
                        i = Math.max(0, e.scrollbarYRail.getBoundingClientRect().top) + e.railYRatio * (e.railYHeight - e.scrollbarYHeight);
                    o < 0 ? e.scrollbarYTop = 0 : o > i ? e.scrollbarYTop = i : e.scrollbarYTop = o;
                    var s = l.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.railYRatio * e.scrollbarYHeight));
                    c(t, "top", s)
                }

                var r = null, o = null, s = function (e) {
                    n(e.pageY - o), a(t), e.stopPropagation(), e.preventDefault()
                }, u = function () {
                    l.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", s)
                };
                e.event.bind(e.scrollbarY, "mousedown", function (n) {
                    o = n.pageY, r = l.toInt(i.css(e.scrollbarY, "top")) * e.railYRatio, l.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
                })
            }

            var l = t("../../lib/helper"), i = t("../../lib/dom"), s = t("../instances"), a = t("../update-geometry"),
                c = t("../update-scroll");
            e.exports = function (t) {
                var e = s.get(t);
                r(t, e), o(t, e)
            }
        }, {
            "../../lib/dom": 3,
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }],
        12: [function (t, e, n) {
            "use strict";

            function r(t, e) {
                function n(n, r) {
                    var o = t.scrollTop;
                    if (0 === n) {
                        if (!e.scrollbarYActive) return !1;
                        if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation
                    }
                    var l = t.scrollLeft;
                    if (0 === r) {
                        if (!e.scrollbarXActive) return !1;
                        if (0 === l && n < 0 || l >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                    }
                    return !0
                }

                var r = !1;
                e.event.bind(t, "mouseenter", function () {
                    r = !0
                }), e.event.bind(t, "mouseleave", function () {
                    r = !1
                });
                var i = !1;
                e.event.bind(e.ownerDocument, "keydown", function (c) {
                    if (!(c.isDefaultPrevented && c.isDefaultPrevented() || c.defaultPrevented)) {
                        var u = l.matches(e.scrollbarX, ":focus") || l.matches(e.scrollbarY, ":focus");
                        if (r || u) {
                            var d = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                            if (d) {
                                if ("IFRAME" === d.tagName) d = d.contentDocument.activeElement; else for (; d.shadowRoot;) d = d.shadowRoot.activeElement;
                                if (o.isEditable(d)) return
                            }
                            var p = 0, f = 0;
                            switch (c.which) {
                                case 37:
                                    p = c.metaKey ? -e.contentWidth : c.altKey ? -e.containerWidth : -30;
                                    break;
                                case 38:
                                    f = c.metaKey ? e.contentHeight : c.altKey ? e.containerHeight : 30;
                                    break;
                                case 39:
                                    p = c.metaKey ? e.contentWidth : c.altKey ? e.containerWidth : 30;
                                    break;
                                case 40:
                                    f = c.metaKey ? -e.contentHeight : c.altKey ? -e.containerHeight : -30;
                                    break;
                                case 33:
                                    f = 90;
                                    break;
                                case 32:
                                    f = c.shiftKey ? 90 : -90;
                                    break;
                                case 34:
                                    f = -90;
                                    break;
                                case 35:
                                    f = c.ctrlKey ? -e.contentHeight : -e.containerHeight;
                                    break;
                                case 36:
                                    f = c.ctrlKey ? t.scrollTop : e.containerHeight;
                                    break;
                                default:
                                    return
                            }
                            a(t, "top", t.scrollTop - f), a(t, "left", t.scrollLeft + p), s(t), i = n(p, f), i && c.preventDefault()
                        }
                    }
                })
            }

            var o = t("../../lib/helper"), l = t("../../lib/dom"), i = t("../instances"), s = t("../update-geometry"),
                a = t("../update-scroll");
            e.exports = function (t) {
                var e = i.get(t);
                r(t, e)
            }
        }, {
            "../../lib/dom": 3,
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }],
        13: [function (t, e, n) {
            "use strict";

            function r(t, e) {
                function n(n, r) {
                    var o = t.scrollTop;
                    if (0 === n) {
                        if (!e.scrollbarYActive) return !1;
                        if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation
                    }
                    var l = t.scrollLeft;
                    if (0 === r) {
                        if (!e.scrollbarXActive) return !1;
                        if (0 === l && n < 0 || l >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                    }
                    return !0
                }

                function r(t) {
                    var e = t.deltaX, n = -1 * t.deltaY;
                    return "undefined" != typeof e && "undefined" != typeof n || (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e !== e && n !== n && (e = 0, n = t.wheelDelta), t.shiftKey ? [-n, -e] : [e, n]
                }

                function o(e, n) {
                    var r = t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");
                    if (r) {
                        if (!window.getComputedStyle(r).overflow.match(/(scroll|auto)/)) return !1;
                        var o = r.scrollHeight - r.clientHeight;
                        if (o > 0 && !(0 === r.scrollTop && n > 0 || r.scrollTop === o && n < 0)) return !0;
                        var l = r.scrollLeft - r.clientWidth;
                        if (l > 0 && !(0 === r.scrollLeft && e < 0 || r.scrollLeft === l && e > 0)) return !0
                    }
                    return !1
                }

                function s(s) {
                    var c = r(s), u = c[0], d = c[1];
                    o(u, d) || (a = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (d ? i(t, "top", t.scrollTop - d * e.settings.wheelSpeed) : i(t, "top", t.scrollTop + u * e.settings.wheelSpeed), a = !0) : e.scrollbarXActive && !e.scrollbarYActive && (u ? i(t, "left", t.scrollLeft + u * e.settings.wheelSpeed) : i(t, "left", t.scrollLeft - d * e.settings.wheelSpeed), a = !0) : (i(t, "top", t.scrollTop - d * e.settings.wheelSpeed), i(t, "left", t.scrollLeft + u * e.settings.wheelSpeed)), l(t), a = a || n(u, d), a && (s.stopPropagation(), s.preventDefault()))
                }

                var a = !1;
                "undefined" != typeof window.onwheel ? e.event.bind(t, "wheel", s) : "undefined" != typeof window.onmousewheel && e.event.bind(t, "mousewheel", s)
            }

            var o = t("../instances"), l = t("../update-geometry"), i = t("../update-scroll");
            e.exports = function (t) {
                var e = o.get(t);
                r(t, e)
            }
        }, {"../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        14: [function (t, e, n) {
            "use strict";

            function r(t, e) {
                e.event.bind(t, "scroll", function () {
                    l(t)
                })
            }

            var o = t("../instances"), l = t("../update-geometry");
            e.exports = function (t) {
                var e = o.get(t);
                r(t, e)
            }
        }, {"../instances": 18, "../update-geometry": 19}],
        15: [function (t, e, n) {
            "use strict";

            function r(t, e) {
                function n() {
                    var t = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                    return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer
                }

                function r() {
                    c || (c = setInterval(function () {
                        return l.get(t) ? (s(t, "top", t.scrollTop + u.top), s(t, "left", t.scrollLeft + u.left), void i(t)) : void clearInterval(c)
                    }, 50))
                }

                function a() {
                    c && (clearInterval(c), c = null), o.stopScrolling(t)
                }

                var c = null, u = {top: 0, left: 0}, d = !1;
                e.event.bind(e.ownerDocument, "selectionchange", function () {
                    t.contains(n()) ? d = !0 : (d = !1, a())
                }), e.event.bind(window, "mouseup", function () {
                    d && (d = !1, a())
                }), e.event.bind(window, "keyup", function () {
                    d && (d = !1, a())
                }), e.event.bind(window, "mousemove", function (e) {
                    if (d) {
                        var n = {x: e.pageX, y: e.pageY}, l = {
                            left: t.offsetLeft,
                            right: t.offsetLeft + t.offsetWidth,
                            top: t.offsetTop,
                            bottom: t.offsetTop + t.offsetHeight
                        };
                        n.x < l.left + 3 ? (u.left = -5, o.startScrolling(t, "x")) : n.x > l.right - 3 ? (u.left = 5, o.startScrolling(t, "x")) : u.left = 0, n.y < l.top + 3 ? (l.top + 3 - n.y < 5 ? u.top = -5 : u.top = -20, o.startScrolling(t, "y")) : n.y > l.bottom - 3 ? (n.y - l.bottom + 3 < 5 ? u.top = 5 : u.top = 20, o.startScrolling(t, "y")) : u.top = 0, 0 === u.top && 0 === u.left ? a() : r()
                    }
                })
            }

            var o = t("../../lib/helper"), l = t("../instances"), i = t("../update-geometry"),
                s = t("../update-scroll");
            e.exports = function (t) {
                var e = l.get(t);
                r(t, e)
            }
        }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        16: [function (t, e, n) {
            "use strict";

            function r(t, e, n, r) {
                function o(n, r) {
                    var o = t.scrollTop, l = t.scrollLeft, i = Math.abs(n), s = Math.abs(r);
                    if (s > i) {
                        if (r < 0 && o === e.contentHeight - e.containerHeight || r > 0 && 0 === o) return !e.settings.swipePropagation
                    } else if (i > s && (n < 0 && l === e.contentWidth - e.containerWidth || n > 0 && 0 === l)) return !e.settings.swipePropagation;
                    return !0
                }

                function a(e, n) {
                    s(t, "top", t.scrollTop - n), s(t, "left", t.scrollLeft - e), i(t)
                }

                function c() {
                    w = !0
                }

                function u() {
                    w = !1
                }

                function d(t) {
                    return t.targetTouches ? t.targetTouches[0] : t
                }

                function p(t) {
                    return !(!t.targetTouches || 1 !== t.targetTouches.length) || !(!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE)
                }

                function f(t) {
                    if (p(t)) {
                        Y = !0;
                        var e = d(t);
                        g.pageX = e.pageX, g.pageY = e.pageY, v = (new Date).getTime(), null !== y && clearInterval(y), t.stopPropagation()
                    }
                }

                function h(t) {
                    if (!Y && e.settings.swipePropagation && f(t), !w && Y && p(t)) {
                        var n = d(t), r = {pageX: n.pageX, pageY: n.pageY}, l = r.pageX - g.pageX,
                            i = r.pageY - g.pageY;
                        a(l, i), g = r;
                        var s = (new Date).getTime(), c = s - v;
                        c > 0 && (m.x = l / c, m.y = i / c, v = s), o(l, i) && (t.stopPropagation(), t.preventDefault())
                    }
                }

                function b() {
                    !w && Y && (Y = !1, clearInterval(y), y = setInterval(function () {
                        return l.get(t) && (m.x || m.y) ? Math.abs(m.x) < .01 && Math.abs(m.y) < .01 ? void clearInterval(y) : (a(30 * m.x, 30 * m.y), m.x *= .8, void (m.y *= .8)) : void clearInterval(y)
                    }, 10))
                }

                var g = {}, v = 0, m = {}, y = null, w = !1, Y = !1;
                n && (e.event.bind(window, "touchstart", c), e.event.bind(window, "touchend", u), e.event.bind(t, "touchstart", f), e.event.bind(t, "touchmove", h), e.event.bind(t, "touchend", b)), r && (window.PointerEvent ? (e.event.bind(window, "pointerdown", c), e.event.bind(window, "pointerup", u), e.event.bind(t, "pointerdown", f), e.event.bind(t, "pointermove", h), e.event.bind(t, "pointerup", b)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", c), e.event.bind(window, "MSPointerUp", u), e.event.bind(t, "MSPointerDown", f), e.event.bind(t, "MSPointerMove", h), e.event.bind(t, "MSPointerUp", b)))
            }

            var o = t("../../lib/helper"), l = t("../instances"), i = t("../update-geometry"),
                s = t("../update-scroll");
            e.exports = function (t) {
                if (o.env.supportsTouch || o.env.supportsIePointer) {
                    var e = l.get(t);
                    r(t, e, o.env.supportsTouch, o.env.supportsIePointer)
                }
            }
        }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        17: [function (t, e, n) {
            "use strict";
            var r = t("../lib/helper"), o = t("../lib/class"), l = t("./instances"), i = t("./update-geometry"), s = {
                "click-rail": t("./handler/click-rail"),
                "drag-scrollbar": t("./handler/drag-scrollbar"),
                keyboard: t("./handler/keyboard"),
                wheel: t("./handler/mouse-wheel"),
                touch: t("./handler/touch"),
                selection: t("./handler/selection")
            }, a = t("./handler/native-scroll");
            e.exports = function (t, e) {
                e = "object" == typeof e ? e : {}, o.add(t, "ps-container");
                var n = l.add(t);
                n.settings = r.extend(n.settings, e), o.add(t, "ps-theme-" + n.settings.theme), n.settings.handlers.forEach(function (e) {
                    s[e](t)
                }), a(t), i(t)
            }
        }, {
            "../lib/class": 2,
            "../lib/helper": 6,
            "./handler/click-rail": 10,
            "./handler/drag-scrollbar": 11,
            "./handler/keyboard": 12,
            "./handler/mouse-wheel": 13,
            "./handler/native-scroll": 14,
            "./handler/selection": 15,
            "./handler/touch": 16,
            "./instances": 18,
            "./update-geometry": 19
        }],
        18: [function (t, e, n) {
            "use strict";

            function r(t) {
                function e() {
                    a.add(t, "ps-focus")
                }

                function n() {
                    a.remove(t, "ps-focus")
                }

                var r = this;
                r.settings = s.clone(c), r.containerWidth = null, r.containerHeight = null, r.contentWidth = null, r.contentHeight = null, r.isRtl = "rtl" === u.css(t, "direction"), r.isNegativeScroll = function () {
                    var e = t.scrollLeft, n = null;
                    return t.scrollLeft = -1, n = t.scrollLeft < 0, t.scrollLeft = e, n
                }(), r.negativeScrollAdjustment = r.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, r.event = new d, r.ownerDocument = t.ownerDocument || document, r.scrollbarXRail = u.appendTo(u.e("div", "ps-scrollbar-x-rail"), t), r.scrollbarX = u.appendTo(u.e("div", "ps-scrollbar-x"), r.scrollbarXRail), r.scrollbarX.setAttribute("tabindex", 0), r.event.bind(r.scrollbarX, "focus", e), r.event.bind(r.scrollbarX, "blur", n), r.scrollbarXActive = null, r.scrollbarXWidth = null, r.scrollbarXLeft = null, r.scrollbarXBottom = s.toInt(u.css(r.scrollbarXRail, "bottom")), r.isScrollbarXUsingBottom = r.scrollbarXBottom === r.scrollbarXBottom, r.scrollbarXTop = r.isScrollbarXUsingBottom ? null : s.toInt(u.css(r.scrollbarXRail, "top")), r.railBorderXWidth = s.toInt(u.css(r.scrollbarXRail, "borderLeftWidth")) + s.toInt(u.css(r.scrollbarXRail, "borderRightWidth")), u.css(r.scrollbarXRail, "display", "block"), r.railXMarginWidth = s.toInt(u.css(r.scrollbarXRail, "marginLeft")) + s.toInt(u.css(r.scrollbarXRail, "marginRight")), u.css(r.scrollbarXRail, "display", ""), r.railXWidth = null, r.railXRatio = null, r.scrollbarYRail = u.appendTo(u.e("div", "ps-scrollbar-y-rail"), t), r.scrollbarY = u.appendTo(u.e("div", "ps-scrollbar-y"), r.scrollbarYRail), r.scrollbarY.setAttribute("tabindex", 0), r.event.bind(r.scrollbarY, "focus", e), r.event.bind(r.scrollbarY, "blur", n), r.scrollbarYActive = null, r.scrollbarYHeight = null, r.scrollbarYTop = null, r.scrollbarYRight = s.toInt(u.css(r.scrollbarYRail, "right")), r.isScrollbarYUsingRight = r.scrollbarYRight === r.scrollbarYRight, r.scrollbarYLeft = r.isScrollbarYUsingRight ? null : s.toInt(u.css(r.scrollbarYRail, "left")), r.scrollbarYOuterWidth = r.isRtl ? s.outerWidth(r.scrollbarY) : null, r.railBorderYWidth = s.toInt(u.css(r.scrollbarYRail, "borderTopWidth")) + s.toInt(u.css(r.scrollbarYRail, "borderBottomWidth")), u.css(r.scrollbarYRail, "display", "block"), r.railYMarginHeight = s.toInt(u.css(r.scrollbarYRail, "marginTop")) + s.toInt(u.css(r.scrollbarYRail, "marginBottom")), u.css(r.scrollbarYRail, "display", ""), r.railYHeight = null, r.railYRatio = null
            }

            function o(t) {
                return t.getAttribute("data-ps-id")
            }

            function l(t, e) {
                t.setAttribute("data-ps-id", e)
            }

            function i(t) {
                t.removeAttribute("data-ps-id")
            }

            var s = t("../lib/helper"), a = t("../lib/class"), c = t("./default-setting"), u = t("../lib/dom"),
                d = t("../lib/event-manager"), p = t("../lib/guid"), f = {};
            n.add = function (t) {
                var e = p();
                return l(t, e), f[e] = new r(t), f[e]
            }, n.remove = function (t) {
                delete f[o(t)], i(t)
            }, n.get = function (t) {
                return f[o(t)]
            }
        }, {
            "../lib/class": 2,
            "../lib/dom": 3,
            "../lib/event-manager": 4,
            "../lib/guid": 5,
            "../lib/helper": 6,
            "./default-setting": 8
        }],
        19: [function (t, e, n) {
            "use strict";

            function r(t, e) {
                return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
            }

            function o(t, e) {
                var n = {width: e.railXWidth};
                e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft, e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, s.css(e.scrollbarXRail, n);
                var r = {top: t.scrollTop, height: e.railYHeight};
                e.isScrollbarYUsingRight ? e.isRtl ? r.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : r.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? r.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : r.left = e.scrollbarYLeft + t.scrollLeft, s.css(e.scrollbarYRail, r), s.css(e.scrollbarX, {
                    left: e.scrollbarXLeft,
                    width: e.scrollbarXWidth - e.railBorderXWidth
                }), s.css(e.scrollbarY, {top: e.scrollbarYTop, height: e.scrollbarYHeight - e.railBorderYWidth})
            }

            var l = t("../lib/helper"), i = t("../lib/class"), s = t("../lib/dom"), a = t("./instances"),
                c = t("./update-scroll");
            e.exports = function (t) {
                var e = a.get(t);
                e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight;
                var n;
                t.contains(e.scrollbarXRail) || (n = s.queryChildren(t, ".ps-scrollbar-x-rail"), n.length > 0 && n.forEach(function (t) {
                    s.remove(t)
                }), s.appendTo(e.scrollbarXRail, t)), t.contains(e.scrollbarYRail) || (n = s.queryChildren(t, ".ps-scrollbar-y-rail"), n.length > 0 && n.forEach(function (t) {
                    s.remove(t)
                }), s.appendTo(e.scrollbarYRail, t)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = r(e, l.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = l.toInt((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = r(e, l.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = l.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), o(t, e), e.scrollbarXActive ? i.add(t, "ps-active-x") : (i.remove(t, "ps-active-x"), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, c(t, "left", 0)), e.scrollbarYActive ? i.add(t, "ps-active-y") : (i.remove(t, "ps-active-y"), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, c(t, "top", 0))
            }
        }, {"../lib/class": 2, "../lib/dom": 3, "../lib/helper": 6, "./instances": 18, "./update-scroll": 20}],
        20: [function (t, e, n) {
            "use strict";
            var r, o, l = t("./instances"), i = function (t) {
                var e = document.createEvent("Event");
                return e.initEvent(t, !0, !0), e
            };
            e.exports = function (t, e, n) {
                if ("undefined" == typeof t) throw "You must provide an element to the update-scroll function";
                if ("undefined" == typeof e) throw "You must provide an axis to the update-scroll function";
                if ("undefined" == typeof n) throw "You must provide a value to the update-scroll function";
                "top" === e && n <= 0 && (t.scrollTop = n = 0, t.dispatchEvent(i("ps-y-reach-start"))), "left" === e && n <= 0 && (t.scrollLeft = n = 0, t.dispatchEvent(i("ps-x-reach-start")));
                var s = l.get(t);
                "top" === e && n >= s.contentHeight - s.containerHeight && (n = s.contentHeight - s.containerHeight, n - t.scrollTop <= 1 ? n = t.scrollTop : t.scrollTop = n, t.dispatchEvent(i("ps-y-reach-end"))), "left" === e && n >= s.contentWidth - s.containerWidth && (n = s.contentWidth - s.containerWidth, n - t.scrollLeft <= 1 ? n = t.scrollLeft : t.scrollLeft = n, t.dispatchEvent(i("ps-x-reach-end"))), r || (r = t.scrollTop), o || (o = t.scrollLeft), "top" === e && n < r && t.dispatchEvent(i("ps-scroll-up")), "top" === e && n > r && t.dispatchEvent(i("ps-scroll-down")), "left" === e && n < o && t.dispatchEvent(i("ps-scroll-left")), "left" === e && n > o && t.dispatchEvent(i("ps-scroll-right")), "top" === e && (t.scrollTop = r = n, t.dispatchEvent(i("ps-scroll-y"))), "left" === e && (t.scrollLeft = o = n, t.dispatchEvent(i("ps-scroll-x")))
            }
        }, {"./instances": 18}],
        21: [function (t, e, n) {
            "use strict";
            var r = t("../lib/helper"), o = t("../lib/dom"), l = t("./instances"), i = t("./update-geometry"),
                s = t("./update-scroll");
            e.exports = function (t) {
                var e = l.get(t);
                e && (e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, o.css(e.scrollbarXRail, "display", "block"), o.css(e.scrollbarYRail, "display", "block"), e.railXMarginWidth = r.toInt(o.css(e.scrollbarXRail, "marginLeft")) + r.toInt(o.css(e.scrollbarXRail, "marginRight")), e.railYMarginHeight = r.toInt(o.css(e.scrollbarYRail, "marginTop")) + r.toInt(o.css(e.scrollbarYRail, "marginBottom")), o.css(e.scrollbarXRail, "display", "none"), o.css(e.scrollbarYRail, "display", "none"), i(t), s(t, "top", t.scrollTop), s(t, "left", t.scrollLeft), o.css(e.scrollbarXRail, "display", ""), o.css(e.scrollbarYRail, "display", ""))
            }
        }, {"../lib/dom": 3, "../lib/helper": 6, "./instances": 18, "./update-geometry": 19, "./update-scroll": 20}]
    }, {}, [1]);
    (function ($) {
        var SelectBox = this.SelectBox = function (select, options) {
            if (select instanceof jQuery) {
                if (select.length > 0) {
                    select = select[0]
                } else {
                    return
                }
            }
            this.typeTimer = null;
            this.typeSearch = '';
            this.isMac = navigator.platform.match(/mac/i);
            options = 'object' === typeof options ? options : {};
            this.selectElement = select;
            if (!options.mobile && navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i)) {
                return !1
            }
            if ('select' !== select.tagName.toLowerCase()) {
                return !1
            }
            this.init(options)
        };
        SelectBox.prototype.version = '1.2.0';
        SelectBox.prototype.init = function (options) {
            var select = $(this.selectElement);
            if (select.data('selectBox-control')) {
                return !1
            }
            var control = $('<a class="selectBox" />'),
                inline = select.attr('multiple') || parseInt(select.attr('size')) > 1, settings = options || {},
                tabIndex = parseInt(select.prop('tabindex')) || 0, self = this;
            control.width(select.outerWidth()).addClass(select.attr('class')).attr('title', select.attr('title') || '').attr('tabindex', tabIndex).css('display', 'inline-block').bind('focus.selectBox', function () {
                if (this !== document.activeElement && document.body !== document.activeElement) {
                    $(document.activeElement).blur()
                }
                if (control.hasClass('selectBox-active')) {
                    return
                }
                control.addClass('selectBox-active');
                select.trigger('focus')
            }).bind('blur.selectBox', function () {
                if (!control.hasClass('selectBox-active')) {
                    return
                }
                control.removeClass('selectBox-active');
                select.trigger('blur')
            });
            if (!$(window).data('selectBox-bindings')) {
                $(window).data('selectBox-bindings', !0).bind('scroll.selectBox', (settings.hideOnWindowScroll) ? this.hideMenus : $.noop).bind('resize.selectBox', this.hideMenus)
            }
            if (select.attr('disabled')) {
                control.addClass('selectBox-disabled')
            }
            select.bind('click.selectBox', function (event) {
                control.focus();
                event.preventDefault()
            });
            if (inline) {
                options = this.getOptions('inline');
                control.append(options).data('selectBox-options', options).addClass('selectBox-inline selectBox-menuShowing').bind('keydown.selectBox', function (event) {
                    self.handleKeyDown(event)
                }).bind('keypress.selectBox', function (event) {
                    self.handleKeyPress(event)
                }).bind('mousedown.selectBox', function (event) {
                    if (1 !== event.which) {
                        return
                    }
                    if ($(event.target).is('A.selectBox-inline')) {
                        event.preventDefault()
                    }
                    if (!control.hasClass('selectBox-focus')) {
                        control.focus()
                    }
                }).insertAfter(select);
                if (!select[0].style.height) {
                    var size = select.attr('size') ? parseInt(select.attr('size')) : 5;
                    var tmp = control.clone().removeAttr('id').css({
                        position: 'absolute',
                        top: '-9999em'
                    }).show().appendTo('body');
                    tmp.find('.selectBox-options').html('<li><a>\u00A0</a></li>');
                    var optionHeight = parseInt(tmp.find('.selectBox-options A:first').html('&nbsp;').outerHeight());
                    tmp.remove();
                    control.height(optionHeight * size)
                }
                this.disableSelection(control)
            } else {
                var label = $('<span class="selectBox-label" />'), arrow = $('<span class="selectBox-arrow" />');
                label.attr('class', this.getLabelClass()).text(this.getLabelText());
                options = this.getOptions('dropdown');
                options.appendTo('BODY');
                control.data('selectBox-options', options).addClass('selectBox-dropdown').append(label).append(arrow).bind('mousedown.selectBox', function (event) {
                    if (1 === event.which) {
                        if (control.hasClass('selectBox-menuShowing')) {
                            self.hideMenus()
                        } else {
                            event.stopPropagation();
                            options.data('selectBox-down-at-x', event.screenX).data('selectBox-down-at-y', event.screenY);
                            self.showMenu()
                        }
                    }
                }).bind('keydown.selectBox', function (event) {
                    self.handleKeyDown(event)
                }).bind('keypress.selectBox', function (event) {
                    self.handleKeyPress(event)
                }).bind('open.selectBox', function (event, triggerData) {
                    if (triggerData && triggerData._selectBox === !0) {
                        return
                    }
                    self.showMenu()
                }).bind('close.selectBox', function (event, triggerData) {
                    if (triggerData && triggerData._selectBox === !0) {
                        return
                    }
                    self.hideMenus()
                }).insertAfter(select);
                var labelWidth = control.width() - arrow.outerWidth() - (parseInt(label.css('paddingLeft')) || 0) - (parseInt(label.css('paddingRight')) || 0);
                label.width(labelWidth);
                this.disableSelection(control)
            }
            select.addClass('selectBox').data('selectBox-control', control).data('selectBox-settings', settings).hide()
        };
        SelectBox.prototype.getOptions = function (type) {
            var options;
            var select = $(this.selectElement);
            var self = this;
            var _getOptions = function (select, options) {
                select.children('OPTION, OPTGROUP').each(function () {
                    if ($(this).is('OPTION')) {
                        if ($(this).length > 0) {
                            self.generateOptions($(this), options)
                        } else {
                            options.append('<li>\u00A0</li>')
                        }
                    } else {
                        var optgroup = $('<li class="selectBox-optgroup" />');
                        optgroup.text($(this).attr('label'));
                        options.append(optgroup);
                        options = _getOptions($(this), options)
                    }
                });
                return options
            };
            switch (type) {
                case 'inline':
                    options = $('<ul class="selectBox-options" />');
                    options = _getOptions(select, options);
                    options.find('A').bind('mouseover.selectBox', function (event) {
                        self.addHover($(this).parent())
                    }).bind('mouseout.selectBox', function (event) {
                        self.removeHover($(this).parent())
                    }).bind('mousedown.selectBox', function (event) {
                        if (1 !== event.which) {
                            return
                        }
                        event.preventDefault();
                        if (!select.selectBox('control').hasClass('selectBox-active')) {
                            select.selectBox('control').focus()
                        }
                    }).bind('mouseup.selectBox', function (event) {
                        if (1 !== event.which) {
                            return
                        }
                        self.hideMenus();
                        self.selectOption($(this).parent(), event)
                    });
                    this.disableSelection(options);
                    return options;
                case 'dropdown':
                    options = $('<ul class="selectBox-dropdown-menu selectBox-options" />');
                    options = _getOptions(select, options);
                    options.data('selectBox-select', select).css('display', 'none').appendTo('BODY').find('A').bind('mousedown.selectBox', function (event) {
                        if (event.which === 1) {
                            event.preventDefault();
                            if (event.screenX === options.data('selectBox-down-at-x') && event.screenY === options.data('selectBox-down-at-y')) {
                                options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y');
                                if (/android/i.test(navigator.userAgent.toLowerCase()) && /chrome/i.test(navigator.userAgent.toLowerCase())) {
                                    self.selectOption($(this).parent())
                                }
                                self.hideMenus()
                            }
                        }
                    }).bind('mouseup.selectBox', function (event) {
                        if (1 !== event.which) {
                            return
                        }
                        if (event.screenX === options.data('selectBox-down-at-x') && event.screenY === options.data('selectBox-down-at-y')) {
                            return
                        } else {
                            options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y')
                        }
                        self.selectOption($(this).parent());
                        self.hideMenus()
                    }).bind('mouseover.selectBox', function (event) {
                        self.addHover($(this).parent())
                    }).bind('mouseout.selectBox', function (event) {
                        self.removeHover($(this).parent())
                    });
                    var classes = select.attr('class') || '';
                    if ('' !== classes) {
                        classes = classes.split(' ');
                        for (var i = 0; i < classes.length; i++) {
                            options.addClass(classes[i] + '-selectBox-dropdown-menu')
                        }
                    }
                    this.disableSelection(options);
                    return options
            }
        };
        SelectBox.prototype.getLabelClass = function () {
            var selected = $(this.selectElement).find('OPTION:selected');
            return ('selectBox-label ' + (selected.attr('class') || '')).replace(/\s+$/, '')
        };
        SelectBox.prototype.getLabelText = function () {
            var selected = $(this.selectElement).find('OPTION:selected');
            return selected.text() || '\u00A0'
        };
        SelectBox.prototype.setLabel = function () {
            var select = $(this.selectElement);
            var control = select.data('selectBox-control');
            if (!control) {
                return
            }
            control.find('.selectBox-label').attr('class', this.getLabelClass()).text(this.getLabelText())
        };
        SelectBox.prototype.destroy = function () {
            var select = $(this.selectElement);
            var control = select.data('selectBox-control');
            if (!control) {
                return
            }
            var options = control.data('selectBox-options');
            options.remove();
            control.remove();
            select.removeClass('selectBox').removeData('selectBox-control').data('selectBox-control', null).removeData('selectBox-settings').data('selectBox-settings', null).show()
        };
        SelectBox.prototype.refresh = function () {
            var select = $(this.selectElement), control = select.data('selectBox-control'),
                type = control.hasClass('selectBox-dropdown') ? 'dropdown' : 'inline', options;
            control.data('selectBox-options').remove();
            options = this.getOptions(type);
            control.data('selectBox-options', options);
            switch (type) {
                case 'inline':
                    control.append(options);
                    break;
                case 'dropdown':
                    this.setLabel();
                    $("BODY").append(options);
                    break
            }
            if ('dropdown' === type && control.hasClass('selectBox-menuShowing')) {
                this.showMenu()
            }
        };
        SelectBox.prototype.showMenu = function () {
            var self = this, select = $(this.selectElement), control = select.data('selectBox-control'),
                settings = select.data('selectBox-settings'), options = control.data('selectBox-options');
            if (control.hasClass('selectBox-disabled')) {
                return !1
            }
            this.hideMenus();
            var borderBottomWidth = parseInt(control.css('borderBottomWidth')) || 0;
            var borderTopWidth = parseInt(control.css('borderTopWidth')) || 0;
            var pos = control.offset(),
                topPositionCorrelation = (settings.topPositionCorrelation) ? settings.topPositionCorrelation : 0,
                bottomPositionCorrelation = (settings.bottomPositionCorrelation) ? settings.bottomPositionCorrelation : 0,
                optionsHeight = options.outerHeight(), controlHeight = control.outerHeight(),
                maxHeight = parseInt(options.css('max-height')), scrollPos = $(window).scrollTop(),
                heightToTop = pos.top - scrollPos, heightToBottom = $(window).height() - (heightToTop + controlHeight),
                posTop = (heightToTop > heightToBottom) && (settings.keepInViewport == null ? !0 : settings.keepInViewport),
                top = posTop ? pos.top - optionsHeight + borderTopWidth + topPositionCorrelation : pos.top + controlHeight - borderBottomWidth - bottomPositionCorrelation;
            if (heightToTop < maxHeight && heightToBottom < maxHeight) {
                if (posTop) {
                    var maxHeightDiff = maxHeight - (heightToTop - 5);
                    options.css({'max-height': maxHeight - maxHeightDiff + 'px'});
                    top = top + maxHeightDiff
                } else {
                    var maxHeightDiff = maxHeight - (heightToBottom - 5);
                    options.css({'max-height': maxHeight - maxHeightDiff + 'px'})
                }
            }
            options.data('posTop', posTop);
            options.width(control.innerWidth()).css({
                top: top,
                left: control.offset().left
            }).addClass('selectBox-options selectBox-options-' + (posTop ? 'top' : 'bottom'));
            if (select.triggerHandler('beforeopen')) {
                return !1
            }
            var dispatchOpenEvent = function () {
                select.triggerHandler('open', {_selectBox: !0})
            };
            switch (settings.menuTransition) {
                case 'fade':
                    options.fadeIn(settings.menuSpeed, dispatchOpenEvent);
                    break;
                case 'slide':
                    options.slideDown(settings.menuSpeed, dispatchOpenEvent);
                    break;
                default:
                    options.show(settings.menuSpeed, dispatchOpenEvent);
                    break
            }
            if (!settings.menuSpeed) {
                dispatchOpenEvent()
            }
            var li = options.find('.selectBox-selected:first');
            this.keepOptionInView(li, !0);
            this.addHover(li);
            control.addClass('selectBox-menuShowing selectBox-menuShowing-' + (posTop ? 'top' : 'bottom'));
            $(document).bind('mousedown.selectBox', function (event) {
                if (1 === event.which) {
                    if ($(event.target).parents().andSelf().hasClass('selectBox-options')) {
                        return
                    }
                    self.hideMenus()
                }
            })
        };
        SelectBox.prototype.hideMenus = function () {
            if ($(".selectBox-dropdown-menu:visible").length === 0) {
                return
            }
            $(document).unbind('mousedown.selectBox');
            $(".selectBox-dropdown-menu").each(function () {
                var options = $(this), select = options.data('selectBox-select'),
                    control = select.data('selectBox-control'), settings = select.data('selectBox-settings'),
                    posTop = options.data('posTop');
                if (select.triggerHandler('beforeclose')) {
                    return !1
                }
                var dispatchCloseEvent = function () {
                    select.triggerHandler('close', {_selectBox: !0})
                };
                if (settings) {
                    switch (settings.menuTransition) {
                        case 'fade':
                            options.fadeOut(settings.menuSpeed, dispatchCloseEvent);
                            break;
                        case 'slide':
                            options.slideUp(settings.menuSpeed, dispatchCloseEvent);
                            break;
                        default:
                            options.hide(settings.menuSpeed, dispatchCloseEvent);
                            break
                    }
                    if (!settings.menuSpeed) {
                        dispatchCloseEvent()
                    }
                    control.removeClass('selectBox-menuShowing selectBox-menuShowing-' + (posTop ? 'top' : 'bottom'))
                } else {
                    $(this).hide();
                    $(this).triggerHandler('close', {_selectBox: !0});
                    $(this).removeClass('selectBox-menuShowing selectBox-menuShowing-' + (posTop ? 'top' : 'bottom'))
                }
                options.css('max-height', '');
                options.removeClass('selectBox-options-' + (posTop ? 'top' : 'bottom'));
                options.data('posTop', !1)
            })
        };
        SelectBox.prototype.selectOption = function (li, event) {
            var select = $(this.selectElement);
            li = $(li);
            var control = select.data('selectBox-control'), settings = select.data('selectBox-settings');
            if (control.hasClass('selectBox-disabled')) {
                return !1
            }
            if (0 === li.length || li.hasClass('selectBox-disabled')) {
                return !1
            }
            if (select.attr('multiple')) {
                if (event.shiftKey && control.data('selectBox-last-selected')) {
                    li.toggleClass('selectBox-selected');
                    var affectedOptions;
                    if (li.index() > control.data('selectBox-last-selected').index()) {
                        affectedOptions = li.siblings().slice(control.data('selectBox-last-selected').index(), li.index())
                    } else {
                        affectedOptions = li.siblings().slice(li.index(), control.data('selectBox-last-selected').index())
                    }
                    affectedOptions = affectedOptions.not('.selectBox-optgroup, .selectBox-disabled');
                    if (li.hasClass('selectBox-selected')) {
                        affectedOptions.addClass('selectBox-selected')
                    } else {
                        affectedOptions.removeClass('selectBox-selected')
                    }
                } else if ((this.isMac && event.metaKey) || (!this.isMac && event.ctrlKey)) {
                    li.toggleClass('selectBox-selected')
                } else {
                    li.siblings().removeClass('selectBox-selected');
                    li.addClass('selectBox-selected')
                }
            } else {
                li.siblings().removeClass('selectBox-selected');
                li.addClass('selectBox-selected')
            }
            if (control.hasClass('selectBox-dropdown')) {
                control.find('.selectBox-label').text(li.text())
            }
            var i = 0, selection = [];
            if (select.attr('multiple')) {
                control.find('.selectBox-selected A').each(function () {
                    selection[i++] = $(this).attr('rel')
                })
            } else {
                selection = li.find('A').attr('rel')
            }
            control.data('selectBox-last-selected', li);
            if (select.val() !== selection) {
                select.val(selection);
                this.setLabel();
                select.trigger('change')
            }
            return !0
        };
        SelectBox.prototype.addHover = function (li) {
            li = $(li);
            var select = $(this.selectElement), control = select.data('selectBox-control'),
                options = control.data('selectBox-options');
            options.find('.selectBox-hover').removeClass('selectBox-hover');
            li.addClass('selectBox-hover')
        };
        SelectBox.prototype.getSelectElement = function () {
            return this.selectElement
        };
        SelectBox.prototype.removeHover = function (li) {
            li = $(li);
            var select = $(this.selectElement), control = select.data('selectBox-control'),
                options = control.data('selectBox-options');
            options.find('.selectBox-hover').removeClass('selectBox-hover')
        };
        SelectBox.prototype.keepOptionInView = function (li, center) {
            if (!li || li.length === 0) {
                return
            }
            var select = $(this.selectElement), control = select.data('selectBox-control'),
                options = control.data('selectBox-options'),
                scrollBox = control.hasClass('selectBox-dropdown') ? options : options.parent(),
                top = parseInt(li.offset().top - scrollBox.position().top), bottom = parseInt(top + li.outerHeight());
            if (center) {
                scrollBox.scrollTop(li.offset().top - scrollBox.offset().top + scrollBox.scrollTop() - (scrollBox.height() / 2))
            } else {
                if (top < 0) {
                    scrollBox.scrollTop(li.offset().top - scrollBox.offset().top + scrollBox.scrollTop())
                }
                if (bottom > scrollBox.height()) {
                    scrollBox.scrollTop((li.offset().top + li.outerHeight()) - scrollBox.offset().top + scrollBox.scrollTop() - scrollBox.height())
                }
            }
        };
        SelectBox.prototype.handleKeyDown = function (event) {
            var select = $(this.selectElement), control = select.data('selectBox-control'),
                options = control.data('selectBox-options'), settings = select.data('selectBox-settings'),
                totalOptions = 0, i = 0;
            if (control.hasClass('selectBox-disabled')) {
                return
            }
            switch (event.keyCode) {
                case 8:
                    event.preventDefault();
                    this.typeSearch = '';
                    break;
                case 9:
                case 27:
                    this.hideMenus();
                    this.removeHover();
                    break;
                case 13:
                    if (control.hasClass('selectBox-menuShowing')) {
                        this.selectOption(options.find('LI.selectBox-hover:first'), event);
                        if (control.hasClass('selectBox-dropdown')) {
                            this.hideMenus()
                        }
                    } else {
                        this.showMenu()
                    }
                    break;
                case 38:
                case 37:
                    event.preventDefault();
                    if (control.hasClass('selectBox-menuShowing')) {
                        var prev = options.find('.selectBox-hover').prev('LI');
                        totalOptions = options.find('LI:not(.selectBox-optgroup)').length;
                        i = 0;
                        while (prev.length === 0 || prev.hasClass('selectBox-disabled') || prev.hasClass('selectBox-optgroup')) {
                            prev = prev.prev('LI');
                            if (prev.length === 0) {
                                if (settings.loopOptions) {
                                    prev = options.find('LI:last')
                                } else {
                                    prev = options.find('LI:first')
                                }
                            }
                            if (++i >= totalOptions) {
                                break
                            }
                        }
                        this.addHover(prev);
                        this.selectOption(prev, event);
                        this.keepOptionInView(prev)
                    } else {
                        this.showMenu()
                    }
                    break;
                case 40:
                case 39:
                    event.preventDefault();
                    if (control.hasClass('selectBox-menuShowing')) {
                        var next = options.find('.selectBox-hover').next('LI');
                        totalOptions = options.find('LI:not(.selectBox-optgroup)').length;
                        i = 0;
                        while (0 === next.length || next.hasClass('selectBox-disabled') || next.hasClass('selectBox-optgroup')) {
                            next = next.next('LI');
                            if (next.length === 0) {
                                if (settings.loopOptions) {
                                    next = options.find('LI:first')
                                } else {
                                    next = options.find('LI:last')
                                }
                            }
                            if (++i >= totalOptions) {
                                break
                            }
                        }
                        this.addHover(next);
                        this.selectOption(next, event);
                        this.keepOptionInView(next)
                    } else {
                        this.showMenu()
                    }
                    break
            }
        };
        SelectBox.prototype.handleKeyPress = function (event) {
            var select = $(this.selectElement), control = select.data('selectBox-control'),
                options = control.data('selectBox-options'), self = this;
            if (control.hasClass('selectBox-disabled')) {
                return
            }
            switch (event.keyCode) {
                case 9:
                case 27:
                case 13:
                case 38:
                case 37:
                case 40:
                case 39:
                    break;
                default:
                    if (!control.hasClass('selectBox-menuShowing')) {
                        this.showMenu()
                    }
                    event.preventDefault();
                    clearTimeout(this.typeTimer);
                    this.typeSearch += String.fromCharCode(event.charCode || event.keyCode);
                    options.find('A').each(function () {
                        if ($(this).text().substr(0, self.typeSearch.length).toLowerCase() === self.typeSearch.toLowerCase()) {
                            self.addHover($(this).parent());
                            self.selectOption($(this).parent(), event);
                            self.keepOptionInView($(this).parent());
                            return !1
                        }
                    });
                    this.typeTimer = setTimeout(function () {
                        self.typeSearch = ''
                    }, 1000);
                    break
            }
        };
        SelectBox.prototype.enable = function () {
            var select = $(this.selectElement);
            select.prop('disabled', !1);
            var control = select.data('selectBox-control');
            if (!control) {
                return
            }
            control.removeClass('selectBox-disabled')
        };
        SelectBox.prototype.disable = function () {
            var select = $(this.selectElement);
            select.prop('disabled', !0);
            var control = select.data('selectBox-control');
            if (!control) {
                return
            }
            control.addClass('selectBox-disabled')
        };
        SelectBox.prototype.setValue = function (value) {
            var select = $(this.selectElement);
            select.val(value);
            value = select.val();
            if (null === value) {
                value = select.children().first().val();
                select.val(value)
            }
            var control = select.data('selectBox-control');
            if (!control) {
                return
            }
            var settings = select.data('selectBox-settings'), options = control.data('selectBox-options');
            this.setLabel();
            options.find('.selectBox-selected').removeClass('selectBox-selected');
            options.find('A').each(function () {
                if (typeof (value) === 'object') {
                    for (var i = 0; i < value.length; i++) {
                        if ($(this).attr('rel') == value[i]) {
                            $(this).parent().addClass('selectBox-selected')
                        }
                    }
                } else {
                    if ($(this).attr('rel') == value) {
                        $(this).parent().addClass('selectBox-selected')
                    }
                }
            });
            if (settings.change) {
                settings.change.call(select)
            }
        };
        SelectBox.prototype.setOptions = function (options) {
            var select = $(this.selectElement), control = select.data('selectBox-control');
            switch (typeof (options)) {
                case 'string':
                    select.html(options);
                    break;
                case 'object':
                    select.html('');
                    for (var i in options) {
                        if (options[i] === null) {
                            continue
                        }
                        if (typeof (options[i]) === 'object') {
                            var optgroup = $('<optgroup label="' + i + '" />');
                            for (var j in options[i]) {
                                optgroup.append('<option value="' + j + '">' + options[i][j] + '</option>')
                            }
                            select.append(optgroup)
                        } else {
                            var option = $('<option value="' + i + '">' + options[i] + '</option>');
                            select.append(option)
                        }
                    }
                    break
            }
            if (control) {
                this.refresh()
            }
        };
        SelectBox.prototype.disableSelection = function (selector) {
            $(selector).css('MozUserSelect', 'none').bind('selectstart', function (event) {
                event.preventDefault()
            })
        };
        SelectBox.prototype.generateOptions = function (self, options) {
            var li = $('<li />'), a = $('<a />');
            li.addClass(self.attr('class'));
            li.data(self.data());
            a.attr('rel', self.val()).text(self.text());
            li.append(a);
            if (self.attr('disabled')) {
                li.addClass('selectBox-disabled')
            }
            if (self.attr('selected')) {
                li.addClass('selectBox-selected')
            }
            options.append(li)
        };
        $.extend($.fn, {
            selectBox: function (method, options) {
                var selectBox;
                switch (method) {
                    case 'control':
                        return $(this).data('selectBox-control');
                    case 'settings':
                        if (!options) {
                            return $(this).data('selectBox-settings')
                        }
                        $(this).each(function () {
                            $(this).data('selectBox-settings', $.extend(!0, $(this).data('selectBox-settings'), options))
                        });
                        break;
                    case 'options':
                        if (undefined === options) {
                            return $(this).data('selectBox-control').data('selectBox-options')
                        }
                        $(this).each(function () {
                            if (selectBox = $(this).data('selectBox')) {
                                selectBox.setOptions(options)
                            }
                        });
                        break;
                    case 'value':
                        if (undefined === options) {
                            return $(this).val()
                        }
                        $(this).each(function () {
                            if (selectBox = $(this).data('selectBox')) {
                                selectBox.setValue(options)
                            }
                        });
                        break;
                    case 'refresh':
                        $(this).each(function () {
                            if (selectBox = $(this).data('selectBox')) {
                                selectBox.refresh()
                            }
                        });
                        break;
                    case 'enable':
                        $(this).each(function () {
                            if (selectBox = $(this).data('selectBox')) {
                                selectBox.enable(this)
                            }
                        });
                        break;
                    case 'disable':
                        $(this).each(function () {
                            if (selectBox = $(this).data('selectBox')) {
                                selectBox.disable()
                            }
                        });
                        break;
                    case 'destroy':
                        $(this).each(function () {
                            if (selectBox = $(this).data('selectBox')) {
                                selectBox.destroy();
                                $(this).data('selectBox', null)
                            }
                        });
                        break;
                    case 'instance':
                        return $(this).data('selectBox');
                    default:
                        $(this).each(function (idx, select) {
                            if (!$(select).data('selectBox')) {
                                $(select).data('selectBox', new SelectBox(select, method))
                            }
                        });
                        break
                }
                return $(this)
            }
        })
    })(jQuery);/*!
 * jquery.customSelect() - v0.5.1
 * http://adam.co/lab/jquery/customselect/
 * 2014-04-19
 *
 * Copyright 2013 Adam Coulombe
 * @license http://www.opensource.org/licenses/mit-license.html MIT License
 * @license http://www.gnu.org/licenses/gpl.html GPL2 License
 */
    (function (a) {
        a.fn.extend({
            customSelect: function (c) {
                if (typeof document.body.style.maxHeight === "undefined") {
                    return this
                }
                var e = {customClass: "customSelect", mapClass: !0, mapStyle: !0}, c = a.extend(e, c),
                    d = c.customClass, f = function (h, k) {
                        var g = h.find(":selected"), j = k.children(":first"), i = g.html() || "&nbsp;";
                        j.html(i);
                        if (g.attr("disabled")) {
                            k.addClass(b("DisabledOption"))
                        } else {
                            k.removeClass(b("DisabledOption"))
                        }
                        setTimeout(function () {
                            k.removeClass(b("Open"));
                            a(document).off("mouseup.customSelect")
                        }, 60)
                    }, b = function (g) {
                        return d + g
                    };
                return this.each(function () {
                    var g = a(this), i = a("<span />").addClass(b("Inner")), h = a("<span />");
                    g.after(h.append(i));
                    h.addClass(d);
                    if (c.mapClass) {
                        h.addClass(g.attr("class"))
                    }
                    if (c.mapStyle) {
                        h.attr("style", g.attr("style"))
                    }
                    g.addClass("hasCustomSelect").on("render.customSelect", function () {
                        f(g, h);
                        g.css("width", "");
                        var k = parseInt(g.outerWidth(), 10) - (parseInt(h.outerWidth(), 10) - parseInt(h.width(), 10));
                        h.css({display: "inline-block"});
                        var j = h.outerHeight();
                        if (g.attr("disabled")) {
                            h.addClass(b("Disabled"))
                        } else {
                            h.removeClass(b("Disabled"))
                        }
                        i.css({width: k, display: "inline-block"});
                        g.css({
                            "-webkit-appearance": "menulist-button",
                            width: h.outerWidth(),
                            position: "absolute",
                            opacity: 0,
                            height: j,
                            fontSize: h.css("font-size")
                        })
                    }).on("change.customSelect", function () {
                        h.addClass(b("Changed"));
                        f(g, h)
                    }).on("keyup.customSelect", function (j) {
                        if (!h.hasClass(b("Open"))) {
                            g.trigger("blur.customSelect");
                            g.trigger("focus.customSelect")
                        } else {
                            if (j.which == 13 || j.which == 27) {
                                f(g, h)
                            }
                        }
                    }).on("mousedown.customSelect", function () {
                        h.removeClass(b("Changed"))
                    }).on("mouseup.customSelect", function (j) {
                        if (!h.hasClass(b("Open"))) {
                            if (a("." + b("Open")).not(h).length > 0 && typeof InstallTrigger !== "undefined") {
                                g.trigger("focus.customSelect")
                            } else {
                                h.addClass(b("Open"));
                                j.stopPropagation();
                                a(document).one("mouseup.customSelect", function (k) {
                                    if (k.target != g.get(0) && a.inArray(k.target, g.find("*").get()) < 0) {
                                        g.trigger("blur.customSelect")
                                    } else {
                                        f(g, h)
                                    }
                                })
                            }
                        }
                    }).on("focus.customSelect", function () {
                        h.removeClass(b("Changed")).addClass(b("Focus"))
                    }).on("blur.customSelect", function () {
                        h.removeClass(b("Focus") + " " + b("Open"))
                    }).on("mouseenter.customSelect", function () {
                        h.addClass(b("Hover"))
                    }).on("mouseleave.customSelect", function () {
                        h.removeClass(b("Hover"))
                    }).trigger("render.customSelect")
                })
            }
        })
    })(jQuery);/*!
	Autosize 1.18.17
	license: MIT
	http://www.jacklmoore.com/autosize
*/
    !function (e) {
        var t, o = {
                className: "autosizejs",
                id: "autosizejs",
                append: "\n",
                callback: !1,
                resizeDelay: 10,
                placeholder: !0
            },
            i = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',
            a = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent", "whiteSpace"],
            n = e(i).data("autosize", !0)[0];
        n.style.lineHeight = "99px", "99px" === e(n).css("lineHeight") && a.push("lineHeight"), n.style.lineHeight = "", e.fn.autosize = function (i) {
            return this.length ? (i = e.extend({}, o, i || {}), n.parentNode !== document.body && e(document.body).append(n), this.each(function () {
                function o() {
                    var t, o = window.getComputedStyle ? window.getComputedStyle(u, null) : null;
                    o ? (t = parseFloat(o.width), ("border-box" === o.boxSizing || "border-box" === o.webkitBoxSizing || "border-box" === o.mozBoxSizing) && e.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function (e, i) {
                        t -= parseFloat(o[i])
                    })) : t = p.width(), n.style.width = Math.max(t, 0) + "px"
                }

                function s() {
                    var s = {};
                    if (t = u, n.className = i.className, n.id = i.id, d = parseFloat(p.css("maxHeight")), e.each(a, function (e, t) {
                        s[t] = p.css(t)
                    }), e(n).css(s).attr("wrap", p.attr("wrap")), o(), window.chrome) {
                        var r = u.style.width;
                        u.style.width = "0px";
                        {
                            u.offsetWidth
                        }
                        u.style.width = r
                    }
                }

                function r() {
                    var e, a;
                    t !== u ? s() : o(), n.value = !u.value && i.placeholder ? p.attr("placeholder") || "" : u.value, n.value += i.append || "", n.style.overflowY = u.style.overflowY, a = parseFloat(u.style.height) || 0, n.scrollTop = 0, n.scrollTop = 9e4, e = n.scrollTop, d && e > d ? (u.style.overflowY = "scroll", e = d) : (u.style.overflowY = "hidden", c > e && (e = c)), e += z, Math.abs(a - e) > .01 && (u.style.height = e + "px", n.className = n.className, w && i.callback.call(u, u), p.trigger("autosize.resized"))
                }

                function l() {
                    clearTimeout(h), h = setTimeout(function () {
                        var e = p.width();
                        e !== b && (b = e, r())
                    }, parseInt(i.resizeDelay, 10))
                }

                var d, c, h, u = this, p = e(u), z = 0, w = e.isFunction(i.callback), f = {
                    height: u.style.height,
                    overflow: u.style.overflow,
                    overflowY: u.style.overflowY,
                    wordWrap: u.style.wordWrap,
                    resize: u.style.resize
                }, b = p.width(), g = p.css("resize");
                p.data("autosize") || (p.data("autosize", !0), ("border-box" === p.css("box-sizing") || "border-box" === p.css("-moz-box-sizing") || "border-box" === p.css("-webkit-box-sizing")) && (z = p.outerHeight() - p.height()), c = Math.max(parseFloat(p.css("minHeight")) - z || 0, p.height()), p.css({
                    overflow: "hidden",
                    overflowY: "hidden",
                    wordWrap: "break-word"
                }), "vertical" === g ? p.css("resize", "none") : "both" === g && p.css("resize", "horizontal"), "onpropertychange" in u ? "oninput" in u ? p.on("input.autosize keyup.autosize", r) : p.on("propertychange.autosize", function () {
                    "value" === event.propertyName && r()
                }) : p.on("input.autosize", r), i.resizeDelay !== !1 && e(window).on("resize.autosize", l), p.on("autosize.resize", r), p.on("autosize.resizeIncludeStyle", function () {
                    t = null, r()
                }), p.on("autosize.destroy", function () {
                    t = null, clearTimeout(h), e(window).off("resize", l), p.off("autosize").off(".autosize").css(f).removeData("autosize")
                }), r())
            })) : this
        }
    }(jQuery || $);
    (function ($) {
        jQuery.fn.efektUygula = function (methodName, speed) {
            return this[methodName]((methodName == 'show' ? 0 : speed))
        }
        jQuery.fn.pTab = function (ayarlar) {
            var ayar = jQuery.extend({
                pEvent: 'click',
                pTab: 'ul',
                pTabElem: 'li',
                pClass: 'aktif',
                pContent: '.icerik',
                pDuration: 500,
                pEffect: 'show',
                pAutoHeight: !1,
                pUi: !1,
                pUiEffect: 'fade',
                pDebug: !1,
                pSlide: !1,
                pSlideWidth: 0,
                pEasing: 'linear',
                pSlidePrev: !1,
                pSlideNext: !1,
                pSlideLoop: !1,
                pSlideLoopDuration: 500,
                pMouseWheel: !1,
                pElemFunc: !1,
                pEventFunc: !1,
                pKeyboardEvent: !1,
                pActiveTab: 0
            }, ayarlar);
            return this.each(function () {
                if (ayar.pDebug) {
                    if (ayar.pUi) {
                        if (!jQuery.ui) {
                            alert("Tab uygulaması için UI Kütüphanesini sayfanıza dahil etmeniz gerekiyor!")
                        }
                    }
                    var events = ['click', 'mouseenter', 'dblclick'];
                    if (jQuery.inArray(ayar.pEvent, events) == -1) {
                        alert(ayar.pEvent + " adında bir event tanımı yapamazsınız!\n[" + events.join(', ') + "]")
                    }
                    var effects = ['show', 'fadeIn', 'slideDown'];
                    if (jQuery.inArray(ayar.pEffect, effects) == -1) {
                        alert(ayar.pEffect + " adında bir efekt tanımı yapamazsınız!\n[" + effects.join(', ') + "]")
                    }
                    var uiEffects = ['fade', 'bounce', 'highlight', 'pulsate', 'shake', 'slide'];
                    if (jQuery.inArray(ayar.pUiEffect, uiEffects) == -1) {
                        alert(ayar.pUiEffect + " adında bir ui efekt tanımı yapamazsınız!\n[" + uiEffects.join(', ') + "]")
                    }
                }
                if (ayar.pElemFunc) {
                    ayar.pElemFunc()
                }
                var elem = jQuery(this), indis = ayar.pActiveTab;
                jQuery(ayar.pTab + " " + ayar.pTabElem + ":eq(" + ayar.pActiveTab + ")", elem).addClass(ayar.pClass);
                if (ayar.pMouseWheel || ayar.pSlideLoop || ayar.pSlide || ayar.pSlideNext || ayar.pSlidePrev) {
                    var elemLength = jQuery(ayar.pContent, elem).length;
                    if (ayar.pSlide == !0) {
                        jQuery(ayar.pContent, elem).css("float", "left")
                    }
                    if (ayar.pSlideNext == !1 && ayar.pSlidePrev == !1) {
                        ayar.pSlideNext = !0;
                        ayar.pSlidePrev = !0
                    }
                }
                var pLoadFile = jQuery(ayar.pTab + " " + ayar.pTabElem + ":eq(" + ayar.pActiveTab + ")", elem).data("ploadfile");
                if (pLoadFile) {
                    jQuery(ayar.pContent + ":eq(" + ayar.pActiveTab + ")", elem).load(pLoadFile, function () {
                        var height = jQuery(ayar.pContent + ":first", elem).outerHeight();
                        jQuery('div[rel=pSlideContent]', elem).stop().animate({height: height + 'px'}, {duration: ayar.pDuration})
                    })
                }
                var pIframe = jQuery(ayar.pTab + " " + ayar.pTabElem + ":first", elem).data("piframe");
                if (pIframe) {
                    jQuery(ayar.pContent + ":eq(" + ayar.pActiveTab + ")", elem).html('<iframe src="' + pIframe.url + '" frameborder="0" width="' + pIframe.width + '" height="' + pIframe.height + '" style="display: none"></iframe>').append('<div class="loader">Tab İçeriği Yükleniyor..</div>').find("iframe").load(function () {
                        $(this).siblings(".loader").hide();
                        $(this).show();
                        var height = jQuery(ayar.pContent + ":first", elem).outerHeight();
                        jQuery('div[rel=pSlideContent]', elem).stop().animate({height: height + 'px'}, {duration: ayar.pDuration})
                    })
                }
                if (ayar.pSlide == !1) {
                    jQuery(ayar.pContent, elem).hide();
                    jQuery(ayar.pContent + ":eq(" + ayar.pActiveTab + ")", elem).show()
                } else {
                    jQuery(ayar.pContent, elem).wrapAll('<div rel="pSlide"></div>');
                    jQuery('div[rel=pSlide]', elem).wrapAll('<div rel="pSlideContent"></div>');
                    if (ayar.pAutoHeight) {
                        var height = jQuery(ayar.pContent + ":first", elem).outerHeight()
                    }
                    jQuery('div[rel=pSlideContent]', elem).css({
                        "width": ayar.pSlideWidth,
                        "overflow": "hidden",
                        "height": height
                    });
                    jQuery('div[rel=pSlide]', elem).width(elemLength * ayar.pSlideWidth);
                    jQuery('div[rel=pSlide]', elem).css('margin-left', '-' + ayar.pActiveTab * ayar.pSlideWidth + 'px')
                }
                jQuery(ayar.pTab + " " + ayar.pTabElem, elem).bind(ayar.pEvent, function () {
                    if (!jQuery(this).is('.' + ayar.pClass)) {
                        if (ayar.pEventFunc) {
                            ayar.pEventFunc(jQuery(this))
                        }
                        indis = jQuery(this).index();
                        if (ayar.pDebug) {
                            if (!jQuery(ayar.pContent + ":eq(" + indis + ")", elem).length) {
                                alert(jQuery(this).text() + " nesnesine ait " + ayar.pContent + " nesnesi bulunamadı!");
                                return !1
                            }
                        }
                        var pLoadFile = $(this).data("ploadfile");
                        if (pLoadFile) {
                            jQuery(ayar.pContent + ":eq(" + indis + ")", elem).load(pLoadFile, function () {
                                var height = jQuery(ayar.pContent + ":eq(" + indis + ")", elem).outerHeight();
                                jQuery('div[rel=pSlideContent]', elem).stop().animate({height: height + 'px'}, {duration: ayar.pDuration})
                            })
                        }
                        var pIframe = $(this).data("piframe");
                        if (pIframe) {
                            jQuery(ayar.pContent + ":eq(" + indis + ")", elem).html('<iframe src="' + pIframe.url + '" frameborder="0" width="' + pIframe.width + '" height="' + pIframe.height + '" style="display: none"></iframe>').append('<div class="loader">Tab İçeriği Yükleniyor..</div>').find("iframe").load(function () {
                                $(this).siblings(".loader").hide();
                                $(this).show();
                                var height = jQuery(ayar.pContent + ":eq(" + indis + ")", elem).outerHeight();
                                jQuery('div[rel=pSlideContent]', elem).stop().animate({height: height + 'px'}, {duration: ayar.pDuration})
                            })
                        }
                        jQuery(this).parent().find(ayar.pTabElem).removeClass(ayar.pClass);
                        jQuery(this).addClass(ayar.pClass);
                        if (ayar.pSlide == !1) {
                            ayar.pEffect == 'slideDown' ? jQuery(ayar.pContent, elem).finish().slideUp(ayar.pDuration) : jQuery(ayar.pContent, elem).hide();
                            if (ayar.pUi && jQuery.ui) {
                                jQuery(ayar.pContent + ":eq(" + indis + ")", elem).finish().effect(ayar.pUiEffect)
                            } else {
                                jQuery(ayar.pContent + ":eq(" + indis + ")", elem).finish().efektUygula(ayar.pEffect, ayar.pDuration)
                            }
                        } else {
                            jQuery('div[rel=pSlide]', elem).stop().animate({marginLeft: '-' + (indis * ayar.pSlideWidth) + 'px'}, {
                                duration: ayar.pDuration,
                                easing: ayar.pEasing
                            });
                            if (ayar.pAutoHeight) {
                                var height = jQuery(ayar.pContent + ":eq(" + indis + ")", elem).outerHeight();
                                jQuery('div[rel=pSlideContent]', elem).stop().animate({height: height + 'px'}, {duration: ayar.pDuration})
                            }
                        }
                    }
                    return !1
                });
                if (ayar.pSlidePrev) {
                    var pSlidePrevFunc = function () {
                        indis > 0 ? indis-- : indis = elemLength - 1;
                        if (ayar.pSlide == !1) {
                            ayar.pEffect == 'slideDown' ? jQuery(ayar.pContent, elem).finish().slideUp(ayar.pDuration) : jQuery(ayar.pContent, elem).hide();
                            if (ayar.pUi && jQuery.ui) {
                                jQuery(ayar.pContent + ":eq(" + indis + ")", elem).finish().effect(ayar.pUiEffect)
                            } else {
                                jQuery(ayar.pContent + ":eq(" + indis + ")", elem).finish().efektUygula(ayar.pEffect, ayar.pDuration)
                            }
                        } else {
                            jQuery('div[rel=pSlide]', elem).stop().animate({marginLeft: '-' + (indis * ayar.pSlideWidth) + 'px'}, {
                                duration: ayar.pDuration,
                                easing: ayar.pEasing
                            })
                        }
                        if (ayar.pAutoHeight) {
                            var height = jQuery(ayar.pContent + ":eq(" + indis + ")", elem).outerHeight();
                            jQuery('div[rel=pSlideContent]', elem).stop().animate({height: height + 'px'}, {duration: ayar.pDuration})
                        }
                        jQuery(ayar.pTab + " " + ayar.pTabElem, elem).parent().find(ayar.pTabElem).removeClass(ayar.pClass);
                        jQuery(ayar.pTab + " " + ayar.pTabElem + ":eq(" + indis + ")", elem).addClass(ayar.pClass);
                        if (ayar.pEventFunc) {
                            ayar.pEventFunc(jQuery(ayar.pTab + " " + ayar.pTabElem + ":eq(" + indis + ")", elem))
                        }
                    }
                    jQuery(ayar.pSlidePrev, elem).click(function () {
                        pSlidePrevFunc();
                        return !1
                    })
                }
                if (ayar.pSlideNext) {
                    var pSlideNextFunc = function () {
                        indis < elemLength - 1 ? indis++ : indis = 0;
                        if (ayar.pSlide == !1) {
                            ayar.pEffect == 'slideDown' ? jQuery(ayar.pContent, elem).finish().slideUp(ayar.pDuration) : $(ayar.pContent, elem).hide();
                            if (ayar.pUi && jQuery.ui) {
                                jQuery(ayar.pContent + ":eq(" + indis + ")", elem).finish().effect(ayar.pUiEffect)
                            } else {
                                jQuery(ayar.pContent + ":eq(" + indis + ")", elem).finish().efektUygula(ayar.pEffect, ayar.pDuration)
                            }
                        } else {
                            jQuery('div[rel=pSlide]', elem).stop().animate({marginLeft: '-' + (indis * ayar.pSlideWidth) + 'px'}, {
                                duration: ayar.pDuration,
                                easing: ayar.pEasing
                            })
                        }
                        if (ayar.pAutoHeight) {
                            var height = jQuery(ayar.pContent + ":eq(" + indis + ")", elem).outerHeight();
                            jQuery('div[rel=pSlideContent]', elem).stop().animate({height: height + 'px'}, {duration: ayar.pDuration})
                        }
                        jQuery(ayar.pTab + " " + ayar.pTabElem, elem).parent().find(ayar.pTabElem).removeClass(ayar.pClass);
                        jQuery(ayar.pTab + " " + ayar.pTabElem + ":eq(" + indis + ")", elem).addClass(ayar.pClass);
                        if (ayar.pEventFunc) {
                            ayar.pEventFunc(jQuery(ayar.pTab + " " + ayar.pTabElem + ":eq(" + indis + ")", elem))
                        }
                    }
                    jQuery(ayar.pSlideNext, elem).click(function () {
                        pSlideNextFunc();
                        return !1
                    })
                }
                if (ayar.pSlideLoop) {
                    var pTabSlider = function () {
                        if (indis < elemLength - 1) {
                            pSlideNextFunc()
                        } else {
                            indis = -1;
                            pSlideNextFunc()
                        }
                    }
                    var interval = setInterval(function () {
                        pTabSlider()
                    }, ayar.pSlideLoopDuration);
                    jQuery(elem).hover(function () {
                        clearInterval(interval);
                        interval = null
                    }, function () {
                        interval = setInterval(function () {
                            pTabSlider()
                        }, ayar.pSlideLoopDuration)
                    })
                }
                if (ayar.pMouseWheel) {
                    jQuery(elem).mousewheel(function (event, delta, deltaX, deltaY) {
                        delta > 0 ? pSlidePrevFunc() : pSlideNextFunc();
                        return !1
                    })
                }
                $(elem).hover(function () {
                    if (ayar.pKeyboardEvent) {
                        $("body").attr("onKeyDown", "$.doKey(event)");
                        $.doKey = function (e) {
                            evt = e || window.event;
                            if (evt.keyCode == 37) {
                                pSlidePrevFunc()
                            } else if (evt.keyCode == 39) {
                                pSlideNextFunc()
                            }
                        }
                    } else {
                        $("body").removeAttr("onKeyDown")
                    }
                }, function () {
                    $("body").removeAttr("onKeyDown")
                })
            })
        }
    })(jQuery);/*!
 * Javascript Cookie v1.5.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
    (function (factory) {
        var jQuery;
        if (typeof define === 'function' && define.amd) {
            define(['jquery'], factory)
        } else if (typeof exports === 'object') {
            try {
                jQuery = require('jquery')
            } catch (e) {
            }
            module.exports = factory(jQuery)
        } else {
            var _OldCookies = window.Cookies;
            var api = window.Cookies = factory(window.jQuery);
            api.noConflict = function () {
                window.Cookies = _OldCookies;
                return api
            }
        }
    }(function ($) {
        var pluses = /\+/g;

        function encode(s) {
            return api.raw ? s : encodeURIComponent(s)
        }

        function decode(s) {
            return api.raw ? s : decodeURIComponent(s)
        }

        function stringifyCookieValue(value) {
            return encode(api.json ? JSON.stringify(value) : String(value))
        }

        function parseCookieValue(s) {
            if (s.indexOf('"') === 0) {
                s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
            }
            try {
                s = decodeURIComponent(s.replace(pluses, ' '));
                return api.json ? JSON.parse(s) : s
            } catch (e) {
            }
        }

        function read(s, converter) {
            var value = api.raw ? s : parseCookieValue(s);
            return isFunction(converter) ? converter(value) : value
        }

        function extend() {
            var key, options;
            var i = 0;
            var result = {};
            for (; i < arguments.length; i++) {
                options = arguments[i];
                for (key in options) {
                    result[key] = options[key]
                }
            }
            return result
        }

        function isFunction(obj) {
            return Object.prototype.toString.call(obj) === '[object Function]'
        }

        var api = function (key, value, options) {
            if (arguments.length > 1 && !isFunction(value)) {
                options = extend(api.defaults, options);
                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setMilliseconds(t.getMilliseconds() + days * 864e+5)
                }
                return (document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''))
            }
            var result = key ? undefined : {}, cookies = document.cookie ? document.cookie.split('; ') : [], i = 0,
                l = cookies.length;
            for (; i < l; i++) {
                var parts = cookies[i].split('='), name = decode(parts.shift()), cookie = parts.join('=');
                if (key === name) {
                    result = read(cookie, value);
                    break
                }
                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie
                }
            }
            return result
        };
        api.get = api.set = api;
        api.defaults = {};
        api.remove = function (key, options) {
            api(key, '', extend(options, {expires: -1}));
            return !api(key)
        };
        if ($) {
            $.cookie = api;
            $.removeCookie = api.remove
        }
        return api
    }));
    !function (e) {
        e.fn.shorten = function (s) {
            "use strict";
            var t = {
                showChars: 100,
                minHideChars: 10,
                ellipsesText: "",
                moreText: "more",
                lessText: "less",
                onLess: function () {
                },
                onMore: function () {
                },
                errMsg: null,
                force: !1
            };
            return s && e.extend(t, s), e(this).data("jquery.shorten") && !t.force ? !1 : (e(this).data("jquery.shorten", !0), e(document).off("click", ".read-more"), e(document).on({
                click: function () {
                    var s = e(this);
                    return s.hasClass("less") ? (s.removeClass("less"), s.html(t.moreText), s.parent().prev().animate({height: "0%"}, function () {
                        s.parent().prev().prev().show()
                    }).hide("fast", function () {
                        t.onLess()
                    })) : (s.addClass("less"), s.html(t.lessText), s.parent().prev().animate({height: "100%"}, function () {
                        s.parent().prev().prev().hide()
                    }).show("fast", function () {
                        t.onMore()
                    })), !1
                }
            }, ".read-more"), this.each(function () {
                var s = e(this), n = s.html(), r = s.text().length;
                if (r > t.showChars + t.minHideChars) {
                    var o = n.substr(0, t.showChars);
                    if (o.indexOf("<") >= 0) {
                        for (var a = !1, i = "", h = 0, l = [], c = null, f = 0, u = 0; u <= t.showChars; f++) if ("<" != n[f] || a || (a = !0, c = n.substring(f + 1, n.indexOf(">", f)), "/" == c[0] ? c != "/" + l[0] ? t.errMsg = "ERROR en HTML: the top of the stack should be the tag that closes" : l.shift() : "br" != c.toLowerCase() && l.unshift(c)), a && ">" == n[f] && (a = !1), a) i += n.charAt(f); else if (u++, h <= t.showChars) i += n.charAt(f), h++; else if (l.length > 0) {
                            for (j = 0; j < l.length; j++) i += "</" + l[j] + ">";
                            break
                        }
                        o = e("<div/>").html(i + '<span class="ellip">' + t.ellipsesText + "</span>").html()
                    } else o += t.ellipsesText;
                    var m = '<div class="shortcontent">' + o + '</div><div class="allcontent">' + n + '</div><span><a href="javascript://nop/" class="read-more">' + t.moreText + "</a></span>";
                    s.html(m), s.find(".allcontent").hide(), e(".shortcontent p:last", s).css("margin-bottom", 0)
                }
            }))
        }
    }(jQuery);

    function error(msg) {
        modal({type: 'error', title: 'Hata!', text: msg})
    }

    function success(msg) {
        modal({type: 'success', title: 'Başarılı!', text: msg})
    }

    var popupFix = function (e) {
        var height = $('>div', e).height();
        $('>div', e).css('margin-top', '-' + (height / 2) + 'px');
        $('input:first', e).focus()
    };

    function video_play(form) {
        $.post(request_url, $(form).serialize() + '&type=video_play', function (response) {
            if (response.error) {
                error(response.error)
            } else {
                setTimeout(function () {
                    window.location.reload(!0)
                }, 1000)
            }
        }, 'json')
    }

    function lost_password(form) {
        $(form).addClass('loading');
        $.post(request_url, $(form).serialize() + '&type=lost_password', function (response) {
            $(form).removeClass('loading');
            if (response.error) {
                error(response.error)
            } else {
                success(response.success)
            }
        }, 'json')
    }

    function new_password(form) {
        var pass = $(form).find('#pass').val(), passt = $(form).find('#passt').val();
        if (pass != passt) {
            error('Her iki şifreyi de aynı girmezsen vallaha kabul etmem! Tekrar dene hadi.');
            return !1
        }
        $(form).addClass('loading');
        $.post(request_url, $(form).serialize() + '&type=new_password', function (response) {
            $(form).removeClass('loading');
            if (response.error) {
                error(response.error)
            } else {
                success(response.success)
            }
        }, 'json')
    }

    function change_password(form) {
        var passo = $(form).find('#passo').val(), pass = $(form).find('#pass').val(),
            passt = $(form).find('#passt').val();
        if (passo == "" || passo == undefined) {
            error('Eski şifrenizi yazmadın ?');
            return !1
        } else if (pass == "" || pass == undefined) {
            error('Yeni şifrenizi yazmadın ?');
            return !1
        } else if (passt == "" || passt == undefined) {
            error('Yeni şifrenizin tekrarını yazmadın ?');
            return !1
        } else if (pass != passt) {
            error('Yeni şifreni aynı girmezsen vallaha kabul etmem! Tekrar dene hadi.');
            return !1
        }
        $(form).addClass('loading');
        $.post(request_url, $(form).serialize() + '&type=change_password', function (response) {
            $(form).removeClass('loading');
            if (response.error) {
                error(response.error)
            } else {
                success(response.success)
            }
        }, 'json')
    }

    function watched(id) {
        $.post(request_url, {'id': id, 'type': 'watched'}, function (response) {
            if (response.success) {
                $('#watched').fadeIn(300).html(response.success);
                setTimeout(function () {
                    $('#watched').remove()
                }, 6000)
            }
        }, 'json')
    }

    function deleteComment(id) {
        modal({
            type: 'warning',
            title: 'Uyarı',
            text: 'Mesajını silmek istediğine emin misin ? <br /><br /> Not: <b>Adminler</b> silinen mesajları görebilirler.',
            size: 'small',
            buttons: [{
                text: 'Vazgeçtim',
                val: 'kapat',
                addClass: 'btn-white btn-square modal-close-btn'
            }, {
                text: 'Çabuk sil, kimse görmeden!',
                val: 'ok',
                eKey: !0,
                addClass: 'btn-red btn-square',
                onClick: function (argument) {
                    $.post(request_url, {'id': id, 'type': 'deletecomment'}, function (response) {
                        if (response.error) {
                            error(response.error)
                        } else {
                            $("div.comment#yorum" + id).slideUp('medium')
                        }
                    }, 'json');
                    return !0
                }
            }],
            center: !0,
            autoclose: !1,
            closeClick: !0,
            closable: !0,
            animate: !0,
            background: 'rgba(0,0,0,0.35)',
            zIndex: 1050,
            template: '<div class="modal-box"><div class="modal-inner"><div class="modal-title"><a class="modal-close-btn"></a></div><div class="modal-text"></div><div class="modal-buttons"></div></div></div>',
            _classes: {
                box: '.modal-box',
                boxInner: ".modal-inner",
                title: '.modal-title',
                content: '.modal-text',
                buttons: '.modal-buttons',
                closebtn: '.modal-close-btn'
            }
        })
    }

    function addcomment() {
        var yorum = $('textarea[name=yorum_text]').val(), spoiler = $('input[name=spoiler]:checked').val();
        $('#addcomment').addClass('form-active');
        $.post(request_url, {'yorum': yorum, 'spoiler': spoiler, 'type': 'addcomment'}, function (response) {
            $('#addcomment').removeClass('form-active');
            if (response.error) {
                error(response.error)
            } else {
                $('.no-comment').remove();
                $('.comments').prepend(response.data);
                $('[name=yorum_text]').val('');
                $('[data-load-image]').each(function () {
                    $(this).attr('src', $(this).data('load-image'))
                })
            }
        }, 'json')
    }

    function artist_addcomment(uniqid) {
        var yorum = $('textarea[name=yorum_text]').val(), spoiler = $('input[name=spoiler]:checked').val();
        $('#addcomment').addClass('form-active');
        $.post(request_url, {
            'yorum': yorum,
            'spoiler': spoiler,
            'type': 'artist_addcomment',
            'uniqid': uniqid
        }, function (response) {
            $('#addcomment').removeClass('form-active');
            if (response.error) {
                error(response.error)
            } else {
                $('.no-comment').remove();
                $('.comments').prepend(response.data);
                $('[name=yorum_text]').val('')
            }
        }, 'json')
    }

    function series_addcomment() {
        var yorum = $('textarea[name=yorum_text]').val(), spoiler = $('input[name=spoiler]:checked').val();
        $('#addcomment').addClass('form-active');
        $.post(request_url, {'yorum': yorum, 'spoiler': spoiler, 'type': 'series_addcomment'}, function (response) {
            $('#addcomment').removeClass('form-active');
            if (response.error) {
                error(response.error)
            } else {
                $('.no-comment').remove();
                $('.comments').prepend(response.data);
                $('[name=yorum_text]').val('');
                $('[data-load-image]').each(function () {
                    $(this).attr('src', $(this).data('load-image'))
                })
            }
        }, 'json')
    }

    function forum_addcomment() {
        var yorum = $('textarea[name=yorum_text]').val(), spoiler = $('input[name=spoiler]:checked').val();
        $('#addcomment').addClass('form-active');
        $.post(request_url, {'yorum': yorum, 'spoiler': spoiler, 'type': 'forum_addcomment'}, function (response) {
            $('#addcomment').removeClass('form-active');
            if (response.error) {
                error(response.error)
            } else {
                $('.no-comment').remove();
                $('#comments').append(response.data);
                $('[name=yorum_text]').val('');
                $('[data-load-image]').each(function () {
                    $(this).attr('src', $(this).data('load-image'))
                })
            }
        }, 'json')
    }

    function comment_complain(id) {
        $.post(request_url, {'id': id, 'type': 'comment_complain'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                alert(response.result)
            }
        }, 'json')
    }

    function login() {
        var data = $('#login').serialize() + '&type=login';
        $.post(request_url, data, function (response) {
            if (response.error) {
                error(response.error);
                grecaptcha.reset();
                grecaptcha.reset(0);
                grecaptcha.reset(1);
                grecaptcha.reset(2)
            } else {
                window.location.reload(!0)
            }
        }, 'json')
    }

    function register() {
        var form = $('#register');
        form.addClass('loading');
        var data = form.serialize() + '&type=register';
        $.post(request_url, data, function (response) {
            form.removeClass('loading');
            if (response.error) {
                error(response.error);
                grecaptcha.reset();
                grecaptcha.reset(0);
                grecaptcha.reset(1);
                grecaptcha.reset(2)
            } else {
                $('.register-content').html(response.success);
                popupFix('#register-form')
            }
        }, 'json')
    }

    function update_profile(id) {
        var data = $('#' + id).serialize() + '&type=update_profile';
        $.post(request_url, data, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                success(response.success)
            }
        }, 'json')
    }

    function update_caption_settings(id) {
        var data = $('#' + id).serialize() + '&type=update_caption_settings';
        $.post(request_url, data, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                alert(response.success)
            }
        }, 'json')
    }

    function comment_like(id) {
        $.post(request_url, {'id': id, 'type': 'comment_like'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $('#like_' + id).text(parseInt($('#like_' + id).text()) + 1)
            }
        }, 'json')
    }

    function comment_dislike(id) {
        $.post(request_url, {'id': id, 'type': 'comment_dislike'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $('#dislike_' + id).text(parseInt($('#dislike_' + id).text()) + 1)
            }
        }, 'json')
    }

    function like_graph(id) {
        var like = parseInt($('#series_like_' + id).text()), dislike = parseInt($('#series_dislike_' + id).text()),
            total = like + dislike, percent = (like / total) * 100;
        $('.like-bar div').css('width', percent + '%')
    }

    function series_like(id) {
        $.post(request_url, {'id': id, 'type': 'series_like'}, function (response) {
            if (response.error) {
                if (response.login_open) {
                    $('#login-form').hide().fadeIn(300);
                    popupFix('#login-form')
                } else {
                    error(response.error)
                }
            } else {
                $('#series_like_' + id).text(parseInt($('#series_like_' + id).text()) + 1);
                like_graph(id)
            }
        }, 'json');
        return !1
    }

    function series_dislike(id) {
        $.post(request_url, {'id': id, 'type': 'series_dislike'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $('#series_dislike_' + id).text(parseInt($('#series_dislike_' + id).text()) + 1);
                like_graph(id)
            }
        }, 'json')
    }

    function follow(id, elem) {
        $.post(request_url, {'id': id, 'type': 'follow'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $("a.mesaj_gonder").show();
                $(elem).attr('onclick', 'unfollow("' + id + '", this)').html('<span class="fa fa-check"></span> Takip Ediliyor')
            }
        }, 'json')
    }

    function series_follow(id, elem) {
        $.post(request_url, {'id': id, 'type': 'series_follow'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $(elem).attr('onclick', 'series_unfollow("' + id + '", this)').html('<span class="fa fa-check"></span> Aboneliği İptal Et')
            }
        }, 'json')
    }

    function artist_fan_add(id, elem) {
        $.post(request_url, {'id': id, 'type': 'artist_fan_add'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $(elem).attr('onclick', 'artist_fan_remove("' + id + '", this)').html('<span class="fa fa-check"></span> Hayran Olmaktan Vazgeç')
            }
        }, 'json')
    }

    function artist_fan_remove(id, elem) {
        $.post(request_url, {'id': id, 'type': 'artist_fan_remove'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $(elem).attr('onclick', 'artist_fan_add("' + id + '", this)').html('<span class="fa fa-plus"></span> Hayranı Ol')
            }
        }, 'json')
    }

    function series_unfollow(id, elem, type) {
        var li = $(elem).closest('li');
        li.addClass('loading');
        $.post(request_url, {'id': id, 'type': 'series_unfollow'}, function (response) {
            li.removeClass('loading');
            if (response.error) {
                error(response.error)
            } else {
                if (type) {
                    li.remove()
                } else {
                    $(elem).attr('onclick', 'series_follow("' + id + '", this)').html('<span class="fa fa-check"></span> Abone Ol')
                }
            }
        }, 'json')
    }

    function unfollow(id, elem) {
        $.post(request_url, {'id': id, 'type': 'unfollow'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $("a.mesaj_gonder").hide();
                $(elem).attr('onclick', 'follow("' + id + '", this)').html('<span class="fa fa-plus"></span> Takip Et')
            }
        }, 'json')
    }

    function add_to_my_watch(id, elem) {
        $.post(request_url, {'id': id, 'type': 'add_to_my_watch'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $(elem).toggleClass('active')
            }
        }, 'json')
    }

    function last_watched() {
        $('.tv-series-list').addClass('loading');
        $.post(request_url, {'type': 'last_watched'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $('.new-episode-list').hide();
                $('.tv-series-list').show().find('.tv-series-scroll').scrollTop(0).find('ul').html(response.data);
                $('.section-tab ul li').removeClass('active').eq(1).addClass('active');
                $('[data-load-image]').each(function () {
                    $(this).attr('src', $(this).data('load-image'))
                })
            }
            $('.tv-series-list').removeClass('loading')
        }, 'json')
    }

    function new_added() {
        $('.tv-series-list').addClass('loading');
        $.post(request_url, {'type': 'new_added'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $('.new-episode-list').hide();
                $('.tv-series-list').show().find('.tv-series-scroll').scrollTop(0).find('ul').html(response.data);
                $('.section-tab ul li').removeClass('active').eq(0).addClass('active');
                $('[data-load-image]').each(function () {
                    $(this).attr('src', $(this).data('load-image'))
                });
                var series_notification = $('#series_notification').text();
                localStorage.setItem('series_notification', series_notification)
            }
            $('.tv-series-list').removeClass('loading')
        }, 'json')
    }

    var series_notification = localStorage.getItem('series_notification'),
        series_notification2 = $('#series_notification').text();
    if (series_notification == series_notification2) {
        $('#series_notification').hide()
    }

    function last_series() {
        $('.tv-series-list').addClass('loading');
        $.post(request_url, {'type': 'last_series'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $('.new-episode-list').hide();
                $('.tv-series-list').show().find('.tv-series-scroll').scrollTop(0).find('ul').html(response.data);
                $('.section-tab ul li').removeClass('active').eq(3).addClass('active');
                $('[data-load-image]').each(function () {
                    $(this).attr('src', $(this).data('load-image'))
                })
            }
            $('.tv-series-list').removeClass('loading')
        }, 'json')
    }

    function followed_series() {
        $('.tv-series-list').addClass('loading');
        $.post(request_url, {'type': 'followed_series'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $('.new-episode-list').hide();
                $('.tv-series-list').show().find('.tv-series-scroll').scrollTop(0).find('ul').html(response.data);
                $('.section-tab ul li').removeClass('active').eq(2).addClass('active');
                $('[data-load-image]').each(function () {
                    $(this).attr('src', $(this).data('load-image'))
                });
                $('.tv-series-list').removeClass('loading')
            }
        }, 'json')
    }

    function add_watch_later(id) {
        $.post(request_url, {'id': id, 'type': 'add_watch_later'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                success(response.success)
            }
        }, 'json')
    }

    function remove_watch_later(id, elem) {
        var li = $(elem).closest('li');
        li.addClass('loading');
        $.post(request_url, {'id': id, 'type': 'remove_watch_later'}, function (response) {
            li.removeClass('loading');
            if (response.error) {
                error(response.error)
            } else {
                li.remove()
            }
        }, 'json')
    }

    function load_social() {
        var id = $('ul.timeline li:last-child').attr('id');
        $.post(request_url, {'id': id, 'type': 'load_social'}, function (response) {
            if (response.error) {
                $('.submit-btn').remove()
            } else {
                $('ul.timeline').append(response.data);
                $('[data-load-image]').each(function () {
                    $(this).attr('src', $(this).data('load-image'))
                })
            }
        }, 'json')
    }

    function read_notification() {
        $.post(request_url, {'type': 'read_notification'}, function (response) {
            $('.notification').remove()
        }, 'json')
    }

    function translation_evaluation(vid, etype) {
        var point = $('.popup .translate-popup' + etype + ' .translate-points ul li.active span:eq(0)').text();
        var cd_not = $('.popup .translate-popup' + etype + ' textarea[name=cd_not]').val();
        var bad_select = $('.popup .translate-popup#begenmedim select[name=begenmedim]').val();
        if (!point) {
            error('Çeviri için verdiğiniz puanı belirleyin.')
        } else if (!bad_select && etype == "#begenmedim") {
            error('Çeviriyi beğenmeme nedeninizi seçin.')
        } else if (point < 0 && !cd_not) {
            error('Olumsuz puan verdiyseniz çeviri ya da çevirmen hakkında birkaç şey yazmanız gerekiyor not bölümüne.')
        } else if (bad_select == 3 && point < 0 && cd_not.length < 75) {
            error('Beğenmeme nedeninizi daha açıklayıcı bir şekilde not bölümüne yazınız.')
        } else {
            $.post(request_url, {
                'vid': vid,
                'point': point,
                'bad_select': bad_select,
                'cd_not': cd_not,
                'type': 'translation_evaluation'
            }, function (response) {
                if (response.error) {
                    error(response.error)
                } else {
                    $('.popup .translate-popup').hide();
                    $('.popup .translate-success').fadeIn(300);
                    popupFix('#translation-evaluation')
                }
            }, 'json')
        }
    }

    function loadEvaluation(pagination, id) {
        $(".comments").addClass("loading").html('<div class="form-loader"></div><div class="comment"></div>');
        $(".pagination").html('');
        $.post(request_url, {'pagination': pagination, 'id': id, 'type': 'loadEvaluation'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $('.comments').removeClass('loading').html(response.comments);
                $('.pagination').html(response.pagination);
                $('html,body').animate({scrollTop: $('#commentz').offset().top}, 900)
            }
        }, 'json')
    }

    function bug_report(vid) {
        var bug = $('.popup .hatabildir-popup .hatabildir-select ul li.active span:eq(0)').data('bug');
        if (!bug) {
            error('Karşılaştığınız hatayı seçiniz.')
        } else {
            $.post(request_url, {'vid': vid, 'bug': bug, 'type': 'bug_report'}, function (response) {
                if (response.error) {
                    error(response.error)
                } else {
                    $('.popup .hatabildir-popup').hide();
                    $('.popup .hatabildir-success').fadeIn(300);
                    popupFix('#hata-bildir')
                }
            }, 'json')
        }
    }

    function contact(form) {
        var data = $(form).serialize();
        $.post(request_url, data + '&type=contact', function (response) {
            if (response.error) {
                error(response.error);
                grecaptcha.reset();
                grecaptcha.reset(0);
                grecaptcha.reset(1);
                grecaptcha.reset(2)
            } else {
                $('input, textarea', form).val('');
                success(response.success)
            }
        }, 'json')
    }

    function today_watchs(elem, e) {
        $(elem).addClass('loading');
        $(e).closest('ul').find('li').removeClass('active');
        $(e).parent().addClass('active');
        $.post(request_url, {'type': 'today_watchs'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $(elem + ' ul').html(response.html)
            }
            $(elem).removeClass('loading')
        }, 'json')
    }

    function today_follows(elem, e) {
        $(elem).addClass('loading');
        $(e).closest('ul').find('li').removeClass('active');
        $(e).parent().addClass('active');
        $.post(request_url, {'type': 'today_follows'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $(elem + ' ul').html(response.html)
            }
            $(elem).removeClass('loading')
        }, 'json')
    }

    function season_watch(season, series_url, elem) {
        var tab = $('.episode-tab .tv-series-episodes:eq(' + (season - 1) + ')'),
            episodes = $('ul li:not(.title)', tab), totalEpisode = episodes.length,
            watchEpisodesTotal = episodes.filter('.active').length, loader = $('.episode-loader', tab);
        if (totalEpisode == watchEpisodesTotal) {
            error(season + '. sezonun bütün bölümlerini izledin, harikasın! ')
        } else {
            loader.show();
            $.post(request_url, {
                'type': 'season_watch',
                'season': season,
                'series_url': series_url
            }, function (response) {
                if (response.error) {
                    error(response.error)
                } else {
                    success(response.success);
                    episodes.find('>span >span').addClass('active');
                    $(elem).addClass('active')
                }
                loader.hide()
            }, 'json')
        }
    }

    function addSubComment(self, id) {
        var form = $(self).closest('form');
        var data = form.serialize();
        $(form).addClass('loading');
        $.post(request_url, data + '&type=addSubComment', function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $('#comments' + id).append(response.comment);
                $('[data-load-image]').each(function () {
                    $(this).attr('src', $(this).data('load-image'))
                });
                form.find('textarea').val('');
                $('.open-subcomment').removeClass('active');
                $('#open_add_subcomment_' + id).hide()
            }
            $(form).removeClass('loading')
        }, 'json')
    }

    function loadComments(id, self) {
        var last_id = $('#comments' + id + ' .comment:first').data('id');
        $('#comment_content_' + id).addClass('loading');
        $.post(request_url, {'last_id': last_id, 'id': id, 'type': 'loadComments'}, function (response) {
            $('#comment_content_' + id).removeClass('loading');
            if (response.error) {
                error(response.error)
            } else {
                $('#comments' + id).prepend(response.comments);
                $(self).remove();
                $('[data-load-image]').each(function () {
                    $(this).attr('src', $(this).data('load-image'))
                })
            }
            $('label.cb').on('click', function (e) {
                if ($(':radio', this).length) {
                    var name = $(':radio', this).attr('name');
                    $('input[name=' + name + ']').parent().removeClass('checked');
                    $(this).addClass('checked')
                }
                if ($(':checkbox', this).length) {
                    if ($(':checkbox', this).is(':checked')) {
                        $(this).addClass('checked')
                    } else {
                        $(this).removeClass('checked')
                    }
                }
            })
        }, 'json')
    }

    function loadComment(pagination, id, scroll) {
        if (scroll === undefined || scroll === null) {
            var scroll = !0
        }
        $('.comments').addClass('loading');
        $.post(request_url, {'pagination': pagination, 'id': id, 'type': 'loadComment'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $('.comments').removeClass('loading');
                $('.comments').html(response.comments);
                $('.pagination').html(response.pagination);
                if (scroll) {
                    $('[data-load-image]').each(function () {
                        $(this).attr('src', $(this).data('load-image'))
                    });
                    $('html,body').animate({scrollTop: $('#commentz').offset().top}, 900)
                }
                var popComments = $(".popular-comments").data('count'), totalMessage = '',
                    countMessage = parseInt(response.totals) - parseInt(popComments);
                if (popComments > 0) {
                    totalMessage = "Diğer " + countMessage + " yorum"
                } else {
                    totalMessage = countMessage + " yorum"
                }
                if (totalMessage == "0 yorum") {
                    totalMessage = "Henüz yorum yapılmadı"
                }
                $('#spanTotal').html(totalMessage)
            }
        }, 'json')
    }

    var player_source = [];
    var errorinfo = '';

    function loadVideo(vid, elem) {
        player_source = [];
        if ($(elem).parent('li').attr("class") == "active") {
            return !1
        }
        if ($('#vidad').length > 0) {
            $('#vidad').html('')
        }
        $("#player").html('').hide();
        $("#episode_msg").show().html("<img src='" + url + "template/assets/images/loading.gif' style='padding-top:200px;'> <br />Alternatife geçiş yapılıyor, lütfen bekleyin.");
        var tip = (elem) ? 1 : 0;
        $.post(request_url, {'vid': vid, 'tip': tip, 'type': 'loadVideo'}, function (response) {
            errorinfo = response.errorinfo;
            if (response.error) {
                error(response.error)
            } else if (response.errormsg) {
                $("#episode_msg").show().html(response.errormsg);
                jwSetupError(response.errorinfo)
            } else {
                $("#player").show();
                $("#episode_msg").hide();
                if (response.jwPlayer) {
                    for (var i = 0; i < response.sources.length; i++) {
                        player_source.push(response.sources[i])
                    }
                    load_video()
                } else {
                    $("#player").html(response.html)
                }
            }
            if (elem && !response.error) {
                $("a#alterMenu").html($(elem).html() + ' <span class="fa fa-angle-down"></span>');
                $(".language li").removeClass("active");
                $("ul.language.alternative").hide();
                $(elem).parent('li').addClass("active");
                if ($('#vidad').length > 0) {
                    $('#vidad').html('')
                }
            }
        }, 'json')
    }

    function dizi_kapak_getir(fileid) {
        player_source = [];
        $.ajax({
            url: kapak_url + '?fileid=' + fileid + '&access_token=' + aCtkp,
            dataType: 'json',
            success: function (data) {
                for (x in data.variants) {
                    var host = data.variants[x].hosts[0], path = data.variants[x].path, url = "https://" + host + path;
                    var kalite = data.variants[x].height + 'p';
                    if (son_kalite != kalite) {
                        player_source.push({"file": url, "label": kalite, "type": "mp4"})
                    }
                    var son_kalite = kalite
                }
                load_video()
            }
        })
    }

    function loadTimeline() {
        $.post(request_url, {'type': 'timeline'}, function (response) {
            if (response.error) {
                error(response.error)
            } else {
                $('#timeline').html(response.html)
            }
        }, 'json')
    }

    function seriesVote(self) {
        var seriesId = $(self).data('series-id');
        var vote = $('select[name=vote]').val();
        if (!vote) {
            error('Diziye oy vermeyi denemelisin.')
        } else {
            $.post(request_url, {'type': 'seriesVote', 'id': seriesId, 'vote': vote}, function (response) {
                if (response.error) {
                    error(response.error)
                } else {
                    success(response.success);
                    var oldVote = $('.series-vote .total').text();
                    $('.vote-form').slideUp(300);
                    $('.success-vote').slideDown(300);
                    $('.series-vote .total').text(response.vote);
                    setTimeout(function () {
                        $('.vote-form').slideDown(300);
                        $('.success-vote').slideUp(300);
                        $('.add-vote').slideUp(300)
                    }, 3000)
                }
            }, 'json')
        }
    }

    function jwSetupError(error_this) {
        $.post(request_url, {'type': 'jwError', 'error': error_this}, function (response) {
            if (response.error) {
                error(response.error)
            }
        }, 'json')
    }

    function load_series() {
        $.post(request_url, {'type': 'getDizi'}, function (response) {
            var search_content = $('.search-result ul'), data = response.data;
            for (var i = 0; i < data.length; i++) {
                var dizi = data[i];
                search_content.append('<li>\
					<a href="' + dizi.url + '">\
						<img src="' + dizi.resim + '" alt="">\
						<span class="title">' + dizi.adi + '</span>\
						<span class="category">' + dizi.tur + '</span>\
					</a>\
				</li>')
            }
            $.expr[':'].icontains = function (obj, index, meta, stack) {
                return (obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase().indexOf(meta[3].toLowerCase()) >= 0
            };
            var result_content = $('.search-result'), result_items = $('.search-result ul li'),
                all_result = $('.search-result .all-result');
            $('#searchbar').on('keyup', function (e) {
                result_content.show();
                var val = $(this).val();
                result_items.hide().removeClass('item').filter(':icontains(' + val + ')').show().addClass('item');
                if (result_items.filter(':visible').length == 0) {
                    $('.result-error').show()
                } else {
                    $('.result-error').hide()
                }
                if (val == '') {
                    result_content.hide()
                }
                all_result.attr('href', url + 'arsiv?dizi_adi=' + val)
            })
        }, 'json')
    }

    $(document).ready(function () {
        $("#searchbar").one('click', function (e) {
            e.preventDefault();
            load_series()
        })
    });
    $(window).load(function () {
        $('[data-async-url]').each(function () {
            var $this = $(this), tur = $this.data('tur'), dataType = $this.data('type') || 'json',
                delay = $this.data('delay') || 0;
            window.setTimeout(function () {
                $.ajax({
                    url: request_url,
                    data: 'type=getAds&tur=' + tur,
                    dataType: dataType,
                    type: 'POST',
                    success: function (data) {
                        var html = dataType == 'json' ? data.html : data;
                        if (html) {
                            $this.show().html(html)
                        } else {
                            $this.remove()
                        }
                    }
                })
            }, delay);
            delay += 250
        })
    });

    function openSubcommentForm(id, self, sub) {
        $('.add-subcomment').hide();
        var form = $('#open_add_subcomment_' + id);
        if ($(self).hasClass('active')) {
            form.hide();
            $(self).removeClass('active')
        } else {
            if (sub == 1) {
                var username = $(self).closest('.comment').find('[data-user]').data('user');
                var user_id = $(self).closest('.comment').find('[data-id]').data('id')
            } else {
                var username = form.closest('.comment').find('[data-user]').data('user');
                var user_id = form.closest('.comment').find('[data-id]').data('id')
            }
            $('.open-subcomment').removeClass('active');
            form.show().find('textarea').focus().val('@' + username + ', ');
            form.find('input[name=user_id]').val(user_id);
            $(self).addClass('active')
        }
        $('label.cb').on('click', function (e) {
            if ($(':checkbox', this).length) {
                if ($(':checkbox', this).is(':checked')) {
                    $(this).addClass('checked')
                } else {
                    $(this).removeClass('checked')
                }
            }
        });
        return !1
    }

    $(document).ready(function () {
        $(document).on('click', '.translate-points ul li', function (e) {
            $('.translate-points ul li').removeClass('active').filter(this).addClass('active');
            e.preventDefault()
        });
        $(document).on('click', '.hatabildir-select ul li', function (e) {
            $('.hatabildir-select ul li').removeClass('active').filter(this).addClass('active');
            e.preventDefault()
        });
        $('#change-bg').on('click', function (e) {
            $(this).next().toggle();
            e.preventDefault()
        });
        $('[data-bg]').on('click', function (e) {
            if (typeof (Storage) !== "undefined") {
                if ($(this).hasClass('default')) {
                    delete localStorage.bg;
                    $('body').css('background', '#000 url(' + $(this).data('bg') + '?v=' + VERSION + ') no-repeat top center fixed')
                } else {
                    localStorage.setItem("bg", $(this).data('bg'));
                    bgChange()
                }
            } else {
                alert("Bu özelliği kullanabilmek için tarayıcınızın sürümünü yükseltmeniz gerekiyor!")
            }
            e.preventDefault()
        });
        $('.alphabetic >li').hover(function () {
            $(this).addClass('active').find('ul').show()
        }, function () {
            $(this).removeClass('active').find('ul').hide()
        });
        if (jQuery.fn.perfectScrollbar) {
            $('.tv-series-scroll, .oe-scroll, [scrollbar] >div').perfectScrollbar({suppressScrollX: !0, wheelSpeed: 1})
        }
        if (jQuery.fn.selectBox) {
            $('.selectbox').selectBox({topPositionCorrelation: 1})
        }
        $(':radio, :checkbox').each(function () {
            $(this).next('span').remove().end().after('<span></span>');
            if ($(this).is(':checked')) {
                $(this).parent().addClass('checked')
            }
        });
        $('label.cb').on('click', function (e) {
            if ($(':radio', this).length) {
                var name = $(':radio', this).attr('name');
                $('input[name=' + name + ']').parent().removeClass('checked');
                $(this).addClass('checked')
            }
            if ($(':checkbox', this).length) {
                if ($(':checkbox', this).is(':checked')) {
                    $(this).addClass('checked')
                } else {
                    $(this).removeClass('checked')
                }
            }
        });
        $(document.body).on('click', '.spoiler-text', function (e) {
            $(this).hide().next('p').show();
            e.preventDefault()
        });
        $('.tab-menu li.hovered').hover(function () {
            $(this).addClass('hover').find('>ul').show()
        }, function () {
            $(this).removeClass('hover').find('>ul').hide()
        });
        if (jQuery.fn.customSelect) {
            $('.select').customSelect()
        }
        var popupFix = function (e) {
            var height = $('>div', e).height();
            $('>div', e).css('margin-top', '-' + (height / 2) + 'px');
            $('input:first', e).focus()
        };
        $('[data-open]').on('click', function (e) {
            $('[data-open]').each(function () {
                $($(this).data('open')).hide()
            });
            var open = $(this).data('open');
            $(open).fadeIn(300);
            popupFix(open);
            e.preventDefault()
        });
        $('[data-close]').on('click', function (e) {
            var close = $(this).data('close');
            $(close).fadeOut(300);
            e.preventDefault()
        });
        $('[data-open]').each(function () {
            $($(this).data('open') + ' a').on('click', function () {
                window.location.href = $(this).attr('href')
            })
        });
        $('body').on('keyup', function (e) {
            if (e.keyCode == 27) {
                $('.popup').fadeOut(300)
            }
        });
        if (jQuery.fn.pTab) {
            $('[tab]').pTab({pTab: '[tab-list]', pTabElem: 'a', pContent: '[tab-content]', pClass: 'active'});
            $('[tab2]').pTab({pTab: '[tab2-list]', pTabElem: 'li', pContent: '[tab2-content]', pClass: 'active'})
        }
        var total = $('.oe-scroll').length, current_season = $('[data-season]').data('season'),
            season_content = $('.oe-scroll');
        $('#total_season').text(total);
        $('#current_season').text(current_season);
        season_content.filter(':not(:eq(' + (current_season - 1) + '))').hide();
        $('#next').on('click', function (e) {
            if (current_season < total) {
                current_season++;
                season_content.hide().filter(':eq(' + (current_season - 1) + ')').show();
                $('#current_season').text(current_season)
            }
            e.preventDefault()
        });
        $('#prev').on('click', function (e) {
            if (current_season > 1) {
                current_season--;
                season_content.hide().filter(':eq(' + (current_season - 1) + ')').show();
                $('#current_season').text(current_season)
            }
            e.preventDefault()
        });
        if (jQuery.fn.swiper) {
            if ($('.my-tv-series').length) {
                var sag = $('.right').height() - 64;
                $('.my-tv-series').height(sag - 682);
                $('.swiper-container').height((sag - 682) - 49);
                if (sag > 1500 && sag < 2500) {
                    var carousel = new Swiper('.my-tv-series >div .swiper-container', {
                        slidesPerView: 10,
                        loop: !0,
                        mode: 'vertical'
                    });
                    $('.my-tv-series .prev').on('click', carousel.swipePrev);
                    $('.my-tv-series .next').on('click', carousel.swipeNext)
                } else if (sag > 2500) {
                    var carousel = new Swiper('.my-tv-series >div .swiper-container', {
                        slidesPerView: 20,
                        loop: !0,
                        mode: 'vertical'
                    });
                    $('.my-tv-series .prev').on('click', carousel.swipePrev);
                    $('.my-tv-series .next').on('click', carousel.swipeNext)
                }
            }
        }
        $('[name=yorum_text]').autosize();
        setTimeout(function () {
            $('.ads').each(function () {
                if ($(this).height() == 0) {
                    $(this).parent().remove()
                }
            })
        }, 100);
        $('.popup .translate-popup .translate-points ul li').on('click', function (e) {
            $('.popup .translate-popup .translate-points ul li').removeClass('active').filter(this).addClass('active');
            e.preventDefault()
        });
        $('html').on('click', function (event) {
            var target = $(event.target);
            if (target.is('.user-bar') || target.parents('.user-bar').size() > 0)
                return;
            $('.notif, .change-bg').hide()
        });
        $('.vote').on('click', function (e) {
            $('.add-vote').slideToggle(300);
            $('.selectbox').selectBox('refresh', {topPositionCorrelation: 1});
            e.preventDefault()
        })
    });
    !function (o) {
        var t = [], i = function () {
            return t.length ? t[t.length - 1] : null
        }, e = function () {
            var o, i = !1;
            for (o = t.length - 1; o >= 0; o--) t[o].$blocker && (t[o].$blocker.toggleClass("current", !i).toggleClass("behind", i), i = !0)
        };
        o.modal = function (e, s) {
            var l, n;
            if (this.$body = o("body"), this.options = o.extend({}, o.modal.defaults, s), this.options.doFade = !isNaN(parseInt(this.options.fadeDuration, 10)), this.$blocker = null, this.options.closeExisting) for (; o.modal.isActive();) o.modal.close();
            if (t.push(this), e.is("a")) if (n = e.attr("href"), /^#/.test(n)) {
                if (this.$elm = o(n), 1 !== this.$elm.length) return null;
                this.$body.append(this.$elm), this.open()
            } else this.$elm = o("<div>"), this.$body.append(this.$elm), l = function (o, t) {
                t.elm.remove()
            }, this.showSpinner(), e.trigger(o.modal.AJAX_SEND), o.get(n).done(function (t) {
                if (o.modal.isActive()) {
                    e.trigger(o.modal.AJAX_SUCCESS);
                    var s = i();
                    s.$elm.empty().append(t).on(o.modal.CLOSE, l), s.hideSpinner(), s.open(), e.trigger(o.modal.AJAX_COMPLETE)
                }
            }).fail(function () {
                e.trigger(o.modal.AJAX_FAIL);
                i().hideSpinner(), t.pop(), e.trigger(o.modal.AJAX_COMPLETE)
            }); else this.$elm = e, this.$body.append(this.$elm), this.open()
        }, o.modal.prototype = {
            constructor: o.modal, open: function () {
                var t = this;
                this.block(), this.options.doFade ? setTimeout(function () {
                    t.show()
                }, this.options.fadeDuration * this.options.fadeDelay) : this.show(), o(document).off("keydown.modal").on("keydown.modal", function (o) {
                    var t = i();
                    27 == o.which && t.options.escapeClose && t.close()
                }), this.options.clickClose && this.$blocker.click(function (t) {
                    t.target == this && o.modal.close()
                })
            }, close: function () {
                t.pop(), this.unblock(), this.hide(), o.modal.isActive() || o(document).off("keydown.modal")
            }, block: function () {
                this.$elm.trigger(o.modal.BEFORE_BLOCK, [this._ctx()]), this.$body.css("overflow", "hidden"), this.$blocker = o('<div class="jquery-modal blocker current"></div>').appendTo(this.$body), e(), this.options.doFade && this.$blocker.css("opacity", 0).animate({opacity: 1}, this.options.fadeDuration), this.$elm.trigger(o.modal.BLOCK, [this._ctx()])
            }, unblock: function (t) {
                !t && this.options.doFade ? this.$blocker.fadeOut(this.options.fadeDuration, this.unblock.bind(this, !0)) : (this.$blocker.children().appendTo(this.$body), this.$blocker.remove(), this.$blocker = null, e(), o.modal.isActive() || this.$body.css("overflow", ""))
            }, show: function () {
                this.$elm.trigger(o.modal.BEFORE_OPEN, [this._ctx()]), this.options.showClose && (this.closeButton = o('<a href="#close-modal" rel="modal:close" class="close-modal ' + this.options.closeClass + '">' + this.options.closeText + "</a>"), this.$elm.append(this.closeButton)), this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker), this.options.doFade ? this.$elm.css("opacity", 0).show().animate({opacity: 1}, this.options.fadeDuration) : this.$elm.show(), this.$elm.trigger(o.modal.OPEN, [this._ctx()])
            }, hide: function () {
                this.$elm.trigger(o.modal.BEFORE_CLOSE, [this._ctx()]), this.closeButton && this.closeButton.remove();
                var t = this;
                this.options.doFade ? this.$elm.fadeOut(this.options.fadeDuration, function () {
                    t.$elm.trigger(o.modal.AFTER_CLOSE, [t._ctx()])
                }) : this.$elm.hide(0, function () {
                    t.$elm.trigger(o.modal.AFTER_CLOSE, [t._ctx()])
                }), this.$elm.trigger(o.modal.CLOSE, [this._ctx()])
            }, showSpinner: function () {
                this.options.showSpinner && (this.spinner = this.spinner || o('<div class="' + this.options.modalClass + '-spinner"></div>').append(this.options.spinnerHtml), this.$body.append(this.spinner), this.spinner.show())
            }, hideSpinner: function () {
                this.spinner && this.spinner.remove()
            }, _ctx: function () {
                return {elm: this.$elm, $blocker: this.$blocker, options: this.options}
            }
        }, o.modal.close = function (t) {
            if (o.modal.isActive()) {
                t && t.preventDefault();
                var e = i();
                return e.close(), e.$elm
            }
        }, o.modal.isActive = function () {
            return t.length > 0
        }, o.modal.defaults = {
            closeExisting: !0,
            escapeClose: !0,
            clickClose: !0,
            closeText: "Close",
            closeClass: "",
            modalClass: "modal",
            spinnerHtml: null,
            showSpinner: !0,
            showClose: !0,
            fadeDuration: null,
            fadeDelay: 1
        }, o.modal.BEFORE_BLOCK = "modal:before-block", o.modal.BLOCK = "modal:block", o.modal.BEFORE_OPEN = "modal:before-open", o.modal.OPEN = "modal:open", o.modal.BEFORE_CLOSE = "modal:before-close", o.modal.CLOSE = "modal:close", o.modal.AFTER_CLOSE = "modal:after-close", o.modal.AJAX_SEND = "modal:ajax:send", o.modal.AJAX_SUCCESS = "modal:ajax:success", o.modal.AJAX_FAIL = "modal:ajax:fail", o.modal.AJAX_COMPLETE = "modal:ajax:complete", o.fn.modal = function (t) {
            return 1 === this.length && new o.modal(this, t), this
        }, o(document).on("click.modal", 'a[rel="modal:close"]', o.modal.close), o(document).on("click.modal", 'a[rel="modal:open"]', function (t) {
            t.preventDefault(), o(this).modal()
        })
    }(jQuery);
    $(document).ready(function () {
        $("[data-yt]").click(function (t) {
            t.preventDefault();
            var a = $(this).data("yt"), e = $(this).data("title"), i = $(this).data("link");
            return $("#trailer-box").find("iframe").attr("src", "https://web.archive.org/web/20250424025924/https://www.youtube-nocookie.com/embed/" + a + "?rel=0&enablejsapi=1&autoplay=0"), "upright" != i ? $("#trailer-box").find("h3").html(e + " <a href='https://web.archive.org/web/20250424025924/https://www.dizilab.com/dizi/" + i + "' class='btn'>dizi sayfası</a>") : $("#trailer-box").find("h3").html(e), $("#trailer-box").modal({
                zIndex: 9999,
                closeText: '<i class="close-modal" style="color:#fff">&#10006;</i>',
                fadeDuration: 250,
                fadeDelay: .5
            }), !1
        }), $("#trailer-box").on("modal:before-close", function (t, a) {
            $("#trailer-box").find("iframe").attr("src", ""), $("#trailer-box").find("h3").text("")
        });
        $(".dlab-alfabe-link").click(function (t) {
            t.preventDefault();
            var a = $(this), e = a.attr("href");
            $("ul[data-index='" + e + "']").siblings(".dlab-alfabe-liste").slideUp(), $("ul[data-index='" + e + "']").slideDown(), a.hasClass("aktif-harf") && $("ul[data-index='" + e + "']").slideUp(), $(".dlab-alfabe-link").not(this).removeClass("aktif-harf"), $(this).toggleClass("aktif-harf")
        });
        $(window).scroll(function () {
            var findPos = $(this).scrollTop();
            if (findPos > 100) {
                $(".yukari-cik").css("display", "block");
            } else {
                $(".yukari-cik").css("display", "none");
            }
        });
        $(".yukari-cik").mouseover(function () {
            $(this).find('span.yukari-cik-yazi').stop(1).animate({width: '70px'});
        }).mouseout(function () {
            $(this).find('span.yukari-cik-yazi').stop(1).delay(200).animate({width: 0});
        }).click(function () {
            $('html, body').animate({scrollTop: 0}, 'slow');
        });
    });
}

/*
     FILE ARCHIVED ON 02:59:24 Apr 24, 2025 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:35:29 Feb 26, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.952
  exclusion.robots: 0.078
  exclusion.robots.policy: 0.06
  esindex: 0.012
  cdx.remote: 77.062
  LoadShardBlock: 255.118 (3)
  PetaboxLoader3.datanode: 214.711 (4)
  PetaboxLoader3.resolve: 189.938 (2)
  load_resource: 255.097
*/
