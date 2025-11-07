import { defineComponent as se, ref as N, computed as B, watch as G, nextTick as be, createElementBlock as q, openBlock as j, createElementVNode as T, toDisplayString as D, normalizeClass as ge, resolveComponent as _, createBlock as z, withCtx as y, createVNode as v, createTextVNode as J, createCommentVNode as I, withModifiers as ce, Fragment as W, renderList as re, renderSlot as X } from "vue";
const _e = /* @__PURE__ */ new Set([
  "$sum",
  "$avg",
  "$min",
  "$max",
  "$count",
  "$first",
  "$last",
  "$push",
  "$addToSet",
  "$stdDevPop",
  "$stdDevSamp"
]), we = /* @__PURE__ */ new Set([
  "$addFields",
  "$bucket",
  "$bucketAuto",
  "$changeStream",
  "$changeStreamSplitLargeEvent",
  "$collStats",
  "$count",
  "$currentOp",
  "$densify",
  "$documents",
  "$facet",
  "$fill",
  "$geoNear",
  "$graphLookup",
  "$group",
  "$indexStats",
  "$limit",
  "$listLocalSessions",
  "$listSessions",
  "$lookup",
  "$match",
  "$merge",
  "$out",
  "$planCacheStats",
  "$project",
  "$redact",
  "$replaceRoot",
  "$replaceWith",
  "$sample",
  "$search",
  "$searchMeta",
  "$set",
  "$setWindowFields",
  "$shardedDataDistribution",
  "$skip",
  "$sort",
  "$sortByCount",
  "$unionWith",
  "$unset",
  "$unwind"
]);
function Se(i) {
  const n = {
    isValid: !0,
    errors: [],
    warnings: []
  };
  let e;
  try {
    e = JSON.parse(i);
  } catch (g) {
    return n.isValid = !1, n.errors.push({
      type: "json",
      message: `Invalid JSON: ${g instanceof Error ? g.message : "Unknown parsing error"}`,
      position: {
        line: Me(i, g),
        column: Le(i, g)
      }
    }), n;
  }
  return Array.isArray(e) ? (e.forEach((g, u) => {
    ke(g, u, n);
  }), n.isValid = n.errors.length === 0, Te(e, n), n) : (n.isValid = !1, n.errors.push({
    type: "structure",
    message: "Aggregation pipeline must be an array of stage objects"
  }), n);
}
function ke(i, n, e) {
  if (typeof i != "object" || i === null || Array.isArray(i)) {
    e.isValid = !1, e.errors.push({
      type: "structure",
      message: `Stage ${n + 1} must be an object`,
      position: { stageIndex: n }
    });
    return;
  }
  const g = Object.keys(i);
  g.length !== 1 && (e.isValid = !1, e.errors.push({
    type: "structure",
    message: `Stage ${n + 1} must have exactly one key (stage name)`,
    position: { stageIndex: n }
  }));
  const u = g[0];
  if (!u || !u.startsWith("$")) {
    e.isValid = !1, e.errors.push({
      type: "stage",
      message: `Stage ${n + 1}: Stage name "${u || "undefined"}" must start with $`,
      position: { stageIndex: n }
    });
    return;
  }
  we.has(u) || e.warnings.push({
    type: "compatibility",
    message: `Stage ${n + 1}: Unrecognized stage "${u}" - may not be supported in all MongoDB versions`,
    position: { stageIndex: n }
  });
  const f = i[u];
  xe(u, f, n, e);
}
function xe(i, n, e, g) {
  switch (i) {
    case "$match":
      Ae(n, e, g);
      break;
    case "$group":
      Fe(n, e, g);
      break;
    case "$project":
    case "$addFields":
    case "$set":
      Ee(n, e, g);
      break;
    case "$sort":
      Ce(n, e, g);
      break;
    case "$limit":
    case "$skip":
      Oe(n, e, g);
      break;
    case "$unwind":
      Pe(n, e, g);
      break;
    case "$lookup":
      je(n, e, g);
      break;
    // Add more stage-specific validations as needed
    default:
      Ve(n, e, g);
  }
}
function Ae(i, n, e) {
  (typeof i != "object" || i === null) && e.errors.push({
    type: "structure",
    message: `Stage ${n + 1} ($match): Must be an object with query conditions`,
    position: { stageIndex: n }
  });
}
function Fe(i, n, e) {
  if (typeof i != "object" || i === null) {
    e.errors.push({
      type: "structure",
      message: `Stage ${n + 1} ($group): Must be an object with _id and accumulator fields`,
      position: { stageIndex: n }
    });
    return;
  }
  i.hasOwnProperty("_id") || e.errors.push({
    type: "structure",
    message: `Stage ${n + 1} ($group): Missing required _id field`,
    position: { stageIndex: n }
  }), Object.entries(i).forEach(([g, u]) => {
    if (g !== "_id" && typeof u == "object" && u !== null) {
      const f = Object.keys(u);
      if (f.length > 0) {
        const $ = f[0];
        $ && $.startsWith("$") && !_e.has($) && e.warnings.push({
          type: "compatibility",
          message: `Stage ${n + 1} ($group): Unrecognized accumulator operator "${$}"`,
          position: { stageIndex: n }
        });
      }
    }
  });
}
function Ee(i, n, e) {
  (typeof i != "object" || i === null) && e.errors.push({
    type: "structure",
    message: `Stage ${n + 1}: Projection stage must be an object mapping field names to expressions`,
    position: { stageIndex: n }
  });
}
function Ce(i, n, e) {
  if (typeof i != "object" || i === null) {
    e.errors.push({
      type: "structure",
      message: `Stage ${n + 1} ($sort): Must be an object mapping field names to sort directions (1 or -1)`,
      position: { stageIndex: n }
    });
    return;
  }
  Object.entries(i).forEach(([g, u]) => {
    u !== 1 && u !== -1 && e.errors.push({
      type: "structure",
      message: `Stage ${n + 1} ($sort): Field "${g}" must have sort direction 1 (ascending) or -1 (descending), got ${u}`,
      position: { stageIndex: n }
    });
  });
}
function Oe(i, n, e) {
  (typeof i != "number" || i < 0 || !Number.isInteger(i)) && e.errors.push({
    type: "structure",
    message: `Stage ${n + 1}: Must be a non-negative integer`,
    position: { stageIndex: n }
  });
}
function Pe(i, n, e) {
  typeof i == "string" ? i.startsWith("$") || e.warnings.push({
    type: "best-practice",
    message: `Stage ${n + 1} ($unwind): Field path should start with $`,
    position: { stageIndex: n }
  }) : typeof i == "object" && i !== null ? i.path || e.errors.push({
    type: "structure",
    message: `Stage ${n + 1} ($unwind): Missing required "path" field`,
    position: { stageIndex: n }
  }) : e.errors.push({
    type: "structure",
    message: `Stage ${n + 1} ($unwind): Must be a string field path or object with path property`,
    position: { stageIndex: n }
  });
}
function je(i, n, e) {
  if (typeof i != "object" || i === null) {
    e.errors.push({
      type: "structure",
      message: `Stage ${n + 1} ($lookup): Must be an object with lookup configuration`,
      position: { stageIndex: n }
    });
    return;
  }
  i.from || e.errors.push({
    type: "structure",
    message: `Stage ${n + 1} ($lookup): Missing required "from" field`,
    position: { stageIndex: n }
  }), i.as || e.errors.push({
    type: "structure",
    message: `Stage ${n + 1} ($lookup): Missing required "as" field`,
    position: { stageIndex: n }
  });
}
function Ve(i, n, e) {
  i == null && e.errors.push({
    type: "structure",
    message: `Stage ${n + 1}: Stage value cannot be null or undefined`,
    position: { stageIndex: n }
  });
}
function Te(i, n) {
  const e = i.findIndex((f) => "$match" in f);
  e > 0 && n.warnings.push({
    type: "performance",
    message: "Consider moving $match stage earlier in pipeline for better performance",
    position: { stageIndex: e }
  }), i.filter((f) => "$sort" in f).length > 1 && n.warnings.push({
    type: "performance",
    message: "Multiple $sort stages detected - consider combining them",
    position: {}
  }), i.map((f, $) => ({ stage: f, index: $ })).filter((f) => "$limit" in f.stage).forEach(({ stage: f, index: $ }) => {
    let s = !1;
    for (let h = 0; h < $; h++)
      if ("$sort" in i[h]) {
        s = !0;
        break;
      }
    s || n.warnings.push({
      type: "best-practice",
      message: "$limit without preceding $sort may return unpredictable results",
      position: { stageIndex: $ }
    });
  });
}
function Me(i, n) {
  if (n instanceof SyntaxError && "message" in n) {
    const e = n.message.match(/at position (\d+)/);
    if (e && e[1]) {
      const g = parseInt(e[1]);
      return i.substring(0, g).split(`
`).length;
    }
  }
}
function Le(i, n) {
  if (n instanceof SyntaxError && "message" in n) {
    const e = n.message.match(/at position (\d+)/);
    if (e && e[1]) {
      const g = parseInt(e[1]), u = i.substring(0, g).split(`
`), f = u[u.length - 1];
      return f ? f.length : void 0;
    }
  }
}
var fe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ne(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var pe = { exports: {} }, ve;
function De() {
  return ve || (ve = 1, (function(i) {
    var n = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
    var e = (function(g) {
      var u = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, f = 0, $ = {}, s = {
        /**
         * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
         * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
         * additional languages or plugins yourself.
         *
         * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
         *
         * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.manual = true;
         * // add a new <script> to load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        manual: g.Prism && g.Prism.manual,
        /**
         * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
         * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
         * own worker, you don't want it to do this.
         *
         * By setting this value to `true`, Prism will not add its own listeners to the worker.
         *
         * You obviously have to change this value before Prism executes. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.disableWorkerMessageHandler = true;
         * // Load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        disableWorkerMessageHandler: g.Prism && g.Prism.disableWorkerMessageHandler,
        /**
         * A namespace for utility methods.
         *
         * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
         * change or disappear at any time.
         *
         * @namespace
         * @memberof Prism
         */
        util: {
          encode: function a(t) {
            return t instanceof h ? new h(t.type, a(t.content), t.alias) : Array.isArray(t) ? t.map(a) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          },
          /**
           * Returns the name of the type of the given value.
           *
           * @param {any} o
           * @returns {string}
           * @example
           * type(null)      === 'Null'
           * type(undefined) === 'Undefined'
           * type(123)       === 'Number'
           * type('foo')     === 'String'
           * type(true)      === 'Boolean'
           * type([1, 2])    === 'Array'
           * type({})        === 'Object'
           * type(String)    === 'Function'
           * type(/abc+/)    === 'RegExp'
           */
          type: function(a) {
            return Object.prototype.toString.call(a).slice(8, -1);
          },
          /**
           * Returns a unique number for the given object. Later calls will still return the same number.
           *
           * @param {Object} obj
           * @returns {number}
           */
          objId: function(a) {
            return a.__id || Object.defineProperty(a, "__id", { value: ++f }), a.__id;
          },
          /**
           * Creates a deep clone of the given object.
           *
           * The main intended use of this function is to clone language definitions.
           *
           * @param {T} o
           * @param {Record<number, any>} [visited]
           * @returns {T}
           * @template T
           */
          clone: function a(t, o) {
            o = o || {};
            var c, p;
            switch (s.util.type(t)) {
              case "Object":
                if (p = s.util.objId(t), o[p])
                  return o[p];
                c = /** @type {Record<string, any>} */
                {}, o[p] = c;
                for (var d in t)
                  t.hasOwnProperty(d) && (c[d] = a(t[d], o));
                return (
                  /** @type {any} */
                  c
                );
              case "Array":
                return p = s.util.objId(t), o[p] ? o[p] : (c = [], o[p] = c, /** @type {Array} */
                /** @type {any} */
                t.forEach(function(l, r) {
                  c[r] = a(l, o);
                }), /** @type {any} */
                c);
              default:
                return t;
            }
          },
          /**
           * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
           *
           * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
           *
           * @param {Element} element
           * @returns {string}
           */
          getLanguage: function(a) {
            for (; a; ) {
              var t = u.exec(a.className);
              if (t)
                return t[1].toLowerCase();
              a = a.parentElement;
            }
            return "none";
          },
          /**
           * Sets the Prism `language-xxxx` class of the given element.
           *
           * @param {Element} element
           * @param {string} language
           * @returns {void}
           */
          setLanguage: function(a, t) {
            a.className = a.className.replace(RegExp(u, "gi"), ""), a.classList.add("language-" + t);
          },
          /**
           * Returns the script element that is currently executing.
           *
           * This does __not__ work for line script element.
           *
           * @returns {HTMLScriptElement | null}
           */
          currentScript: function() {
            if (typeof document > "u")
              return null;
            if (document.currentScript && document.currentScript.tagName === "SCRIPT")
              return (
                /** @type {any} */
                document.currentScript
              );
            try {
              throw new Error();
            } catch (c) {
              var a = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(c.stack) || [])[1];
              if (a) {
                var t = document.getElementsByTagName("script");
                for (var o in t)
                  if (t[o].src == a)
                    return t[o];
              }
              return null;
            }
          },
          /**
           * Returns whether a given class is active for `element`.
           *
           * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
           * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
           * given class is just the given class with a `no-` prefix.
           *
           * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
           * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
           * ancestors have the given class or the negated version of it, then the default activation will be returned.
           *
           * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
           * version of it, the class is considered active.
           *
           * @param {Element} element
           * @param {string} className
           * @param {boolean} [defaultActivation=false]
           * @returns {boolean}
           */
          isActive: function(a, t, o) {
            for (var c = "no-" + t; a; ) {
              var p = a.classList;
              if (p.contains(t))
                return !0;
              if (p.contains(c))
                return !1;
              a = a.parentElement;
            }
            return !!o;
          }
        },
        /**
         * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
         *
         * @namespace
         * @memberof Prism
         * @public
         */
        languages: {
          /**
           * The grammar for plain, unformatted text.
           */
          plain: $,
          plaintext: $,
          text: $,
          txt: $,
          /**
           * Creates a deep copy of the language with the given id and appends the given tokens.
           *
           * If a token in `redef` also appears in the copied language, then the existing token in the copied language
           * will be overwritten at its original position.
           *
           * ## Best practices
           *
           * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
           * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
           * understand the language definition because, normally, the order of tokens matters in Prism grammars.
           *
           * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
           * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
           *
           * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
           * @param {Grammar} redef The new tokens to append.
           * @returns {Grammar} The new language created.
           * @public
           * @example
           * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
           *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
           *     // at its original position
           *     'comment': { ... },
           *     // CSS doesn't have a 'color' token, so this token will be appended
           *     'color': /\b(?:red|green|blue)\b/
           * });
           */
          extend: function(a, t) {
            var o = s.util.clone(s.languages[a]);
            for (var c in t)
              o[c] = t[c];
            return o;
          },
          /**
           * Inserts tokens _before_ another token in a language definition or any other grammar.
           *
           * ## Usage
           *
           * This helper method makes it easy to modify existing languages. For example, the CSS language definition
           * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
           * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
           * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
           * this:
           *
           * ```js
           * Prism.languages.markup.style = {
           *     // token
           * };
           * ```
           *
           * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
           * before existing tokens. For the CSS example above, you would use it like this:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'cdata', {
           *     'style': {
           *         // token
           *     }
           * });
           * ```
           *
           * ## Special cases
           *
           * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
           * will be ignored.
           *
           * This behavior can be used to insert tokens after `before`:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'comment', {
           *     'comment': Prism.languages.markup.comment,
           *     // tokens after 'comment'
           * });
           * ```
           *
           * ## Limitations
           *
           * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
           * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
           * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
           * deleting properties which is necessary to insert at arbitrary positions.
           *
           * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
           * Instead, it will create a new object and replace all references to the target object with the new one. This
           * can be done without temporarily deleting properties, so the iteration order is well-defined.
           *
           * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
           * you hold the target object in a variable, then the value of the variable will not change.
           *
           * ```js
           * var oldMarkup = Prism.languages.markup;
           * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
           *
           * assert(oldMarkup !== Prism.languages.markup);
           * assert(newMarkup === Prism.languages.markup);
           * ```
           *
           * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
           * object to be modified.
           * @param {string} before The key to insert before.
           * @param {Grammar} insert An object containing the key-value pairs to be inserted.
           * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
           * object to be modified.
           *
           * Defaults to `Prism.languages`.
           * @returns {Grammar} The new grammar object.
           * @public
           */
          insertBefore: function(a, t, o, c) {
            c = c || /** @type {any} */
            s.languages;
            var p = c[a], d = {};
            for (var l in p)
              if (p.hasOwnProperty(l)) {
                if (l == t)
                  for (var r in o)
                    o.hasOwnProperty(r) && (d[r] = o[r]);
                o.hasOwnProperty(l) || (d[l] = p[l]);
              }
            var m = c[a];
            return c[a] = d, s.languages.DFS(s.languages, function(w, M) {
              M === m && w != a && (this[w] = d);
            }), d;
          },
          // Traverse a language definition with Depth First Search
          DFS: function a(t, o, c, p) {
            p = p || {};
            var d = s.util.objId;
            for (var l in t)
              if (t.hasOwnProperty(l)) {
                o.call(t, l, t[l], c || l);
                var r = t[l], m = s.util.type(r);
                m === "Object" && !p[d(r)] ? (p[d(r)] = !0, a(r, o, null, p)) : m === "Array" && !p[d(r)] && (p[d(r)] = !0, a(r, o, l, p));
              }
          }
        },
        plugins: {},
        /**
         * This is the most high-level function in Prism’s API.
         * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
         * each one of them.
         *
         * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
         *
         * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
         * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
         * @memberof Prism
         * @public
         */
        highlightAll: function(a, t) {
          s.highlightAllUnder(document, a, t);
        },
        /**
         * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
         * {@link Prism.highlightElement} on each one of them.
         *
         * The following hooks will be run:
         * 1. `before-highlightall`
         * 2. `before-all-elements-highlight`
         * 3. All hooks of {@link Prism.highlightElement} for each element.
         *
         * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
         * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
         * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
         * @memberof Prism
         * @public
         */
        highlightAllUnder: function(a, t, o) {
          var c = {
            callback: o,
            container: a,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          s.hooks.run("before-highlightall", c), c.elements = Array.prototype.slice.apply(c.container.querySelectorAll(c.selector)), s.hooks.run("before-all-elements-highlight", c);
          for (var p = 0, d; d = c.elements[p++]; )
            s.highlightElement(d, t === !0, c.callback);
        },
        /**
         * Highlights the code inside a single element.
         *
         * The following hooks will be run:
         * 1. `before-sanity-check`
         * 2. `before-highlight`
         * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
         * 4. `before-insert`
         * 5. `after-highlight`
         * 6. `complete`
         *
         * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
         * the element's language.
         *
         * @param {Element} element The element containing the code.
         * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
         * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
         * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
         * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
         *
         * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
         * asynchronous highlighting to work. You can build your own bundle on the
         * [Download page](https://prismjs.com/download.html).
         * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
         * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
         * @memberof Prism
         * @public
         */
        highlightElement: function(a, t, o) {
          var c = s.util.getLanguage(a), p = s.languages[c];
          s.util.setLanguage(a, c);
          var d = a.parentElement;
          d && d.nodeName.toLowerCase() === "pre" && s.util.setLanguage(d, c);
          var l = a.textContent, r = {
            element: a,
            language: c,
            grammar: p,
            code: l
          };
          function m(M) {
            r.highlightedCode = M, s.hooks.run("before-insert", r), r.element.innerHTML = r.highlightedCode, s.hooks.run("after-highlight", r), s.hooks.run("complete", r), o && o.call(r.element);
          }
          if (s.hooks.run("before-sanity-check", r), d = r.element.parentElement, d && d.nodeName.toLowerCase() === "pre" && !d.hasAttribute("tabindex") && d.setAttribute("tabindex", "0"), !r.code) {
            s.hooks.run("complete", r), o && o.call(r.element);
            return;
          }
          if (s.hooks.run("before-highlight", r), !r.grammar) {
            m(s.util.encode(r.code));
            return;
          }
          if (t && g.Worker) {
            var w = new Worker(s.filename);
            w.onmessage = function(M) {
              m(M.data);
            }, w.postMessage(JSON.stringify({
              language: r.language,
              code: r.code,
              immediateClose: !0
            }));
          } else
            m(s.highlight(r.code, r.grammar, r.language));
        },
        /**
         * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
         * and the language definitions to use, and returns a string with the HTML produced.
         *
         * The following hooks will be run:
         * 1. `before-tokenize`
         * 2. `after-tokenize`
         * 3. `wrap`: On each {@link Token}.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @param {string} language The name of the language definition passed to `grammar`.
         * @returns {string} The highlighted HTML.
         * @memberof Prism
         * @public
         * @example
         * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
         */
        highlight: function(a, t, o) {
          var c = {
            code: a,
            grammar: t,
            language: o
          };
          if (s.hooks.run("before-tokenize", c), !c.grammar)
            throw new Error('The language "' + c.language + '" has no grammar.');
          return c.tokens = s.tokenize(c.code, c.grammar), s.hooks.run("after-tokenize", c), h.stringify(s.util.encode(c.tokens), c.language);
        },
        /**
         * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
         * and the language definitions to use, and returns an array with the tokenized code.
         *
         * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
         *
         * This method could be useful in other contexts as well, as a very crude parser.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @returns {TokenStream} An array of strings and tokens, a token stream.
         * @memberof Prism
         * @public
         * @example
         * let code = `var foo = 0;`;
         * let tokens = Prism.tokenize(code, Prism.languages.javascript);
         * tokens.forEach(token => {
         *     if (token instanceof Prism.Token && token.type === 'number') {
         *         console.log(`Found numeric literal: ${token.content}`);
         *     }
         * });
         */
        tokenize: function(a, t) {
          var o = t.rest;
          if (o) {
            for (var c in o)
              t[c] = o[c];
            delete t.rest;
          }
          var p = new O();
          return E(p, p.head, a), V(a, p, t, p.head, 0), C(p);
        },
        /**
         * @namespace
         * @memberof Prism
         * @public
         */
        hooks: {
          all: {},
          /**
           * Adds the given callback to the list of callbacks for the given hook.
           *
           * The callback will be invoked when the hook it is registered for is run.
           * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
           *
           * One callback function can be registered to multiple hooks and the same hook multiple times.
           *
           * @param {string} name The name of the hook.
           * @param {HookCallback} callback The callback function which is given environment variables.
           * @public
           */
          add: function(a, t) {
            var o = s.hooks.all;
            o[a] = o[a] || [], o[a].push(t);
          },
          /**
           * Runs a hook invoking all registered callbacks with the given environment variables.
           *
           * Callbacks will be invoked synchronously and in the order in which they were registered.
           *
           * @param {string} name The name of the hook.
           * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
           * @public
           */
          run: function(a, t) {
            var o = s.hooks.all[a];
            if (!(!o || !o.length))
              for (var c = 0, p; p = o[c++]; )
                p(t);
          }
        },
        Token: h
      };
      g.Prism = s;
      function h(a, t, o, c) {
        this.type = a, this.content = t, this.alias = o, this.length = (c || "").length | 0;
      }
      h.stringify = function a(t, o) {
        if (typeof t == "string")
          return t;
        if (Array.isArray(t)) {
          var c = "";
          return t.forEach(function(m) {
            c += a(m, o);
          }), c;
        }
        var p = {
          type: t.type,
          content: a(t.content, o),
          tag: "span",
          classes: ["token", t.type],
          attributes: {},
          language: o
        }, d = t.alias;
        d && (Array.isArray(d) ? Array.prototype.push.apply(p.classes, d) : p.classes.push(d)), s.hooks.run("wrap", p);
        var l = "";
        for (var r in p.attributes)
          l += " " + r + '="' + (p.attributes[r] || "").replace(/"/g, "&quot;") + '"';
        return "<" + p.tag + ' class="' + p.classes.join(" ") + '"' + l + ">" + p.content + "</" + p.tag + ">";
      };
      function S(a, t, o, c) {
        a.lastIndex = t;
        var p = a.exec(o);
        if (p && c && p[1]) {
          var d = p[1].length;
          p.index += d, p[0] = p[0].slice(d);
        }
        return p;
      }
      function V(a, t, o, c, p, d) {
        for (var l in o)
          if (!(!o.hasOwnProperty(l) || !o[l])) {
            var r = o[l];
            r = Array.isArray(r) ? r : [r];
            for (var m = 0; m < r.length; ++m) {
              if (d && d.cause == l + "," + m)
                return;
              var w = r[m], M = w.inside, Y = !!w.lookbehind, H = !!w.greedy, ie = w.alias;
              if (H && !w.pattern.global) {
                var K = w.pattern.toString().match(/[imsuy]*$/)[0];
                w.pattern = RegExp(w.pattern.source, K + "g");
              }
              for (var Q = w.pattern || w, P = c.next, F = p; P !== t.tail && !(d && F >= d.reach); F += P.value.length, P = P.next) {
                var U = P.value;
                if (t.length > a.length)
                  return;
                if (!(U instanceof h)) {
                  var ee = 1, L;
                  if (H) {
                    if (L = S(Q, F, a, Y), !L || L.index >= a.length)
                      break;
                    var te = L.index, ye = L.index + L[0].length, R = F;
                    for (R += P.value.length; te >= R; )
                      P = P.next, R += P.value.length;
                    if (R -= P.value.length, F = R, P.value instanceof h)
                      continue;
                    for (var Z = P; Z !== t.tail && (R < ye || typeof Z.value == "string"); Z = Z.next)
                      ee++, R += Z.value.length;
                    ee--, U = a.slice(F, R), L.index -= F;
                  } else if (L = S(Q, 0, U, Y), !L)
                    continue;
                  var te = L.index, ae = L[0], oe = U.slice(0, te), de = U.slice(te + ae.length), le = F + U.length;
                  d && le > d.reach && (d.reach = le);
                  var ne = P.prev;
                  oe && (ne = E(t, ne, oe), F += oe.length), k(t, ne, ee);
                  var $e = new h(l, M ? s.tokenize(ae, M) : ae, ie, ae);
                  if (P = E(t, ne, $e), de && E(t, P, de), ee > 1) {
                    var ue = {
                      cause: l + "," + m,
                      reach: le
                    };
                    V(a, t, o, P.prev, F, ue), d && ue.reach > d.reach && (d.reach = ue.reach);
                  }
                }
              }
            }
          }
      }
      function O() {
        var a = { value: null, prev: null, next: null }, t = { value: null, prev: a, next: null };
        a.next = t, this.head = a, this.tail = t, this.length = 0;
      }
      function E(a, t, o) {
        var c = t.next, p = { value: o, prev: t, next: c };
        return t.next = p, c.prev = p, a.length++, p;
      }
      function k(a, t, o) {
        for (var c = t.next, p = 0; p < o && c !== a.tail; p++)
          c = c.next;
        t.next = c, c.prev = t, a.length -= p;
      }
      function C(a) {
        for (var t = [], o = a.head.next; o !== a.tail; )
          t.push(o.value), o = o.next;
        return t;
      }
      if (!g.document)
        return g.addEventListener && (s.disableWorkerMessageHandler || g.addEventListener("message", function(a) {
          var t = JSON.parse(a.data), o = t.language, c = t.code, p = t.immediateClose;
          g.postMessage(s.highlight(c, s.languages[o], o)), p && g.close();
        }, !1)), s;
      var A = s.util.currentScript();
      A && (s.filename = A.src, A.hasAttribute("data-manual") && (s.manual = !0));
      function b() {
        s.manual || s.highlightAll();
      }
      if (!s.manual) {
        var x = document.readyState;
        x === "loading" || x === "interactive" && A && A.defer ? document.addEventListener("DOMContentLoaded", b) : window.requestAnimationFrame ? window.requestAnimationFrame(b) : window.setTimeout(b, 16);
      }
      return s;
    })(n);
    i.exports && (i.exports = e), typeof fe < "u" && (fe.Prism = e), e.languages.markup = {
      comment: {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: !0
      },
      prolog: {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: !0
      },
      doctype: {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: !0,
            greedy: !0,
            inside: null
            // see below
          },
          string: {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: !0
          },
          punctuation: /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          name: /[^\s<>'"]+/
        }
      },
      cdata: {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: !0
      },
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              punctuation: [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                {
                  pattern: /^(\s*)["']|["']$/,
                  lookbehind: !0
                }
              ]
            }
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              namespace: /^[^\s>\/:]+:/
            }
          }
        }
      },
      entity: [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    }, e.languages.markup.tag.inside["attr-value"].inside.entity = e.languages.markup.entity, e.languages.markup.doctype.inside["internal-subset"].inside = e.languages.markup, e.hooks.add("wrap", function(g) {
      g.type === "entity" && (g.attributes.title = g.content.replace(/&amp;/, "&"));
    }), Object.defineProperty(e.languages.markup.tag, "addInlined", {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: function(u, f) {
        var $ = {};
        $["language-" + f] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: e.languages[f]
        }, $.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var s = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: $
          }
        };
        s["language-" + f] = {
          pattern: /[\s\S]+/,
          inside: e.languages[f]
        };
        var h = {};
        h[u] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return u;
          }), "i"),
          lookbehind: !0,
          greedy: !0,
          inside: s
        }, e.languages.insertBefore("markup", "cdata", h);
      }
    }), Object.defineProperty(e.languages.markup.tag, "addAttribute", {
      /**
       * Adds an pattern to highlight languages embedded in HTML attributes.
       *
       * An example of an inlined language is CSS with `style` attributes.
       *
       * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addAttribute('style', 'css');
       */
      value: function(g, u) {
        e.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + g + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
            "i"
          ),
          lookbehind: !0,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                value: {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: !0,
                  alias: [u, "language-" + u],
                  inside: e.languages[u]
                },
                punctuation: [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }
    }), e.languages.html = e.languages.markup, e.languages.mathml = e.languages.markup, e.languages.svg = e.languages.markup, e.languages.xml = e.languages.extend("markup", {}), e.languages.ssml = e.languages.xml, e.languages.atom = e.languages.xml, e.languages.rss = e.languages.xml, (function(g) {
      var u = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      g.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + u.source + ")*?" + /(?:;|(?=\s*\{))/.source),
          inside: {
            rule: /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: !0,
              alias: "selector"
            },
            keyword: {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: !0
            }
            // See rest below
          }
        },
        url: {
          // https://drafts.csswg.org/css-values-3/#urls
          pattern: RegExp("\\burl\\((?:" + u.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
          greedy: !0,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: {
              pattern: RegExp("^" + u.source + "$"),
              alias: "url"
            }
          }
        },
        selector: {
          pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + u.source + ")*(?=\\s*\\{)"),
          lookbehind: !0
        },
        string: {
          pattern: u,
          greedy: !0
        },
        property: {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: !0
        },
        important: /!important\b/i,
        function: {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: !0
        },
        punctuation: /[(){};:,]/
      }, g.languages.css.atrule.inside.rest = g.languages.css;
      var f = g.languages.markup;
      f && (f.tag.addInlined("style", "css"), f.tag.addAttribute("style", "css"));
    })(e), e.languages.clike = {
      comment: [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: !0,
          greedy: !0
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: !0,
          greedy: !0
        }
      ],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
          punctuation: /[.\\]/
        }
      },
      keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      boolean: /\b(?:false|true)\b/,
      function: /\b\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      punctuation: /[{}[\];(),.:]/
    }, e.languages.javascript = e.languages.extend("clike", {
      "class-name": [
        e.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: !0
        }
      ],
      keyword: [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: !0
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: !0
        }
      ],
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      number: {
        pattern: RegExp(
          /(^|[^\w$])/.source + "(?:" + // constant
          (/NaN|Infinity/.source + "|" + // binary integer
          /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
          /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
        ),
        lookbehind: !0
      },
      operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }), e.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, e.languages.insertBefore("javascript", "keyword", {
      regex: {
        pattern: RegExp(
          // lookbehind
          // eslint-disable-next-line regexp/no-dupe-characters-character-class
          /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
          // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
          // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
          // with the only syntax, so we have to define 2 different regex patterns.
          /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
          /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
          /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: !0,
            alias: "language-regex",
            inside: e.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      parameter: [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: !0,
          inside: e.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: !0,
          inside: e.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: !0,
          inside: e.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: !0,
          inside: e.languages.javascript
        }
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), e.languages.insertBefore("javascript", "string", {
      hashbang: {
        pattern: /^#!.*/,
        greedy: !0,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: !0,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: !0,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: e.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: !0,
        greedy: !0,
        alias: "property"
      }
    }), e.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: !0,
        alias: "property"
      }
    }), e.languages.markup && (e.languages.markup.tag.addInlined("script", "javascript"), e.languages.markup.tag.addAttribute(
      /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
      "javascript"
    )), e.languages.js = e.languages.javascript, (function() {
      if (typeof e > "u" || typeof document > "u")
        return;
      Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
      var g = "Loading…", u = function(A, b) {
        return "✖ Error " + A + " while fetching file: " + b;
      }, f = "✖ Error: File does not exist or is empty", $ = {
        js: "javascript",
        py: "python",
        rb: "ruby",
        ps1: "powershell",
        psm1: "powershell",
        sh: "bash",
        bat: "batch",
        h: "c",
        tex: "latex"
      }, s = "data-src-status", h = "loading", S = "loaded", V = "failed", O = "pre[data-src]:not([" + s + '="' + S + '"]):not([' + s + '="' + h + '"])';
      function E(A, b, x) {
        var a = new XMLHttpRequest();
        a.open("GET", A, !0), a.onreadystatechange = function() {
          a.readyState == 4 && (a.status < 400 && a.responseText ? b(a.responseText) : a.status >= 400 ? x(u(a.status, a.statusText)) : x(f));
        }, a.send(null);
      }
      function k(A) {
        var b = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(A || "");
        if (b) {
          var x = Number(b[1]), a = b[2], t = b[3];
          return a ? t ? [x, Number(t)] : [x, void 0] : [x, x];
        }
      }
      e.hooks.add("before-highlightall", function(A) {
        A.selector += ", " + O;
      }), e.hooks.add("before-sanity-check", function(A) {
        var b = (
          /** @type {HTMLPreElement} */
          A.element
        );
        if (b.matches(O)) {
          A.code = "", b.setAttribute(s, h);
          var x = b.appendChild(document.createElement("CODE"));
          x.textContent = g;
          var a = b.getAttribute("data-src"), t = A.language;
          if (t === "none") {
            var o = (/\.(\w+)$/.exec(a) || [, "none"])[1];
            t = $[o] || o;
          }
          e.util.setLanguage(x, t), e.util.setLanguage(b, t);
          var c = e.plugins.autoloader;
          c && c.loadLanguages(t), E(
            a,
            function(p) {
              b.setAttribute(s, S);
              var d = k(b.getAttribute("data-range"));
              if (d) {
                var l = p.split(/\r\n?|\n/g), r = d[0], m = d[1] == null ? l.length : d[1];
                r < 0 && (r += l.length), r = Math.max(0, Math.min(r - 1, l.length)), m < 0 && (m += l.length), m = Math.max(0, Math.min(m, l.length)), p = l.slice(r, m).join(`
`), b.hasAttribute("data-start") || b.setAttribute("data-start", String(r + 1));
              }
              x.textContent = p, e.highlightElement(x);
            },
            function(p) {
              b.setAttribute(s, V), x.textContent = p;
            }
          );
        }
      }), e.plugins.fileHighlight = {
        /**
         * Executes the File Highlight plugin for all matching `pre` elements under the given container.
         *
         * Note: Elements which are already loaded or currently loading will not be touched by this method.
         *
         * @param {ParentNode} [container=document]
         */
        highlight: function(b) {
          for (var x = (b || document).querySelectorAll(O), a = 0, t; t = x[a++]; )
            e.highlightElement(t);
        }
      };
      var C = !1;
      e.fileHighlight = function() {
        C || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), C = !0), e.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  })(pe)), pe.exports;
}
var ze = De();
const Je = /* @__PURE__ */ Ne(ze);
Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: !0,
    greedy: !0
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: !0,
    greedy: !0
  },
  comment: {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0
  },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:false|true)\b/,
  null: {
    pattern: /\bnull\b/,
    alias: "keyword"
  }
};
Prism.languages.webmanifest = Prism.languages.json;
const Ue = { class: "v-syntax-highlighted-textarea" }, Re = { class: "v-syntax-highlighted-code" }, qe = { class: "language-json" }, Be = ["textContent"], me = /* @__PURE__ */ se({
  __name: "JsonTextarea",
  props: {
    modelValue: {},
    placeholder: { default: "" },
    rows: { default: 10 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    textareaClass: { default: "" }
  },
  emits: ["update:modelValue"],
  setup(i, { emit: n }) {
    const e = i, g = n, u = N(e.modelValue), f = B(() => {
      try {
        const h = JSON.parse(u.value || "{}");
        return JSON.stringify(h, null, 2);
      } catch {
        return u.value || "";
      }
    });
    G(() => e.modelValue, (h) => {
      u.value = h;
    }), G(u, (h) => {
      g("update:modelValue", h);
    });
    const $ = (h) => {
      const S = h.target, V = S.parentElement?.querySelector(".v-syntax-highlighted-code");
      V && (V.scrollTop = S.scrollTop, V.scrollLeft = S.scrollLeft);
    }, s = (h) => {
      const S = h.target;
      u.value = S.textContent || "";
    };
    return G(f, () => {
      be(() => {
        Je.highlightAll();
      });
    }, { immediate: !0 }), (h, S) => (j(), q("div", Ue, [
      T("pre", Re, [
        T("code", qe, D(f.value), 1)
      ]),
      T("div", {
        contenteditable: "true",
        class: ge(["v-syntax-textarea", i.textareaClass]),
        onInput: s,
        onScroll: $,
        spellcheck: "false",
        textContent: D(u.value)
      }, null, 42, Be)
    ]));
  }
}), We = { class: "stage-number" }, Ge = { class: "preview-box" }, Ie = { class: "preview-box-content" }, He = /* @__PURE__ */ se({
  __name: "VStageCard",
  props: {
    stage: {},
    index: {},
    totalStages: {}
  },
  emits: ["update", "delete", "move-up", "move-down"],
  setup(i, { emit: n }) {
    const e = i, g = n, u = N(""), f = N(""), $ = N([]), s = [
      { title: "$match", value: "$match" },
      { title: "$group", value: "$group" },
      { title: "$project", value: "$project" },
      { title: "$sort", value: "$sort" },
      { title: "$limit", value: "$limit" },
      { title: "$skip", value: "$skip" },
      { title: "$count", value: "$count" },
      { title: "$unwind", value: "$unwind" },
      { title: "$lookup", value: "$lookup" },
      { title: "$addFields", value: "$addFields" },
      { title: "$set", value: "$set" },
      { title: "$unset", value: "$unset" },
      { title: "$replaceRoot", value: "$replaceRoot" },
      { title: "$facet", value: "$facet" },
      { title: "$bucket", value: "$bucket" },
      { title: "$bucketAuto", value: "$bucketAuto" },
      { title: "$sortByCount", value: "$sortByCount" },
      { title: "$graphLookup", value: "$graphLookup" },
      { title: "$unionWith", value: "$unionWith" },
      { title: "$search", value: "$search" },
      { title: "$searchMeta", value: "$searchMeta" },
      { title: "$out", value: "$out" },
      { title: "$merge", value: "$merge" }
    ], h = B(() => $.value.length > 0), S = B(() => {
      try {
        return JSON.parse(f.value);
      } catch {
        return null;
      }
    }), V = (E) => {
      try {
        const k = JSON.parse(f.value), C = { [E]: k[Object.keys(k)[0]] || {} };
        f.value = JSON.stringify(C, null, 2), O();
      } catch {
        const k = { [E]: {} };
        f.value = JSON.stringify(k, null, 2), O();
      }
    }, O = () => {
      try {
        const E = JSON.parse(f.value);
        g("update", e.index, E);
      } catch {
        $.value = ["Invalid JSON syntax"];
      }
    };
    return G(() => e.stage, (E) => {
      u.value = Object.keys(E)[0] || "", f.value = JSON.stringify(E, null, 2), $.value = [];
    }, { immediate: !0 }), G(f, () => {
      $.value = [], O();
    }), (E, k) => {
      const C = _("v-col"), A = _("v-chip"), b = _("v-select"), x = _("v-btn"), a = _("v-btn-group"), t = _("v-row"), o = _("v-expansion-panel-title"), c = _("v-alert"), p = _("v-expansion-panel-text"), d = _("v-expansion-panel");
      return j(), z(d, null, {
        default: y(() => [
          v(o, null, {
            default: y(() => [
              v(t, { align: "center" }, {
                default: y(() => [
                  v(C, { cols: "auto" }, {
                    default: y(() => [
                      T("span", We, "Stage " + D(i.index + 1), 1)
                    ]),
                    _: 1
                  }),
                  v(C, { cols: "auto" }, {
                    default: y(() => [
                      v(A, {
                        size: "small",
                        color: "primary",
                        variant: "outlined"
                      }, {
                        default: y(() => [
                          J(D(u.value || "Select Type"), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  v(C, null, {
                    default: y(() => [
                      v(b, {
                        modelValue: u.value,
                        "onUpdate:modelValue": [
                          k[0] || (k[0] = (l) => u.value = l),
                          V
                        ],
                        items: s,
                        label: "Stage Type",
                        density: "compact",
                        "hide-details": ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  v(C, { cols: "auto" }, {
                    default: y(() => [
                      v(a, null, {
                        default: y(() => [
                          i.index > 0 ? (j(), z(x, {
                            key: 0,
                            icon: "mdi-arrow-up",
                            size: "small",
                            variant: "text",
                            onClick: k[1] || (k[1] = ce((l) => E.$emit("move-up", i.index), ["stop"]))
                          })) : I("", !0),
                          i.index < i.totalStages - 1 ? (j(), z(x, {
                            key: 1,
                            icon: "mdi-arrow-down",
                            size: "small",
                            variant: "text",
                            onClick: k[2] || (k[2] = ce((l) => E.$emit("move-down", i.index), ["stop"]))
                          })) : I("", !0),
                          v(x, {
                            icon: "mdi-delete-outline",
                            size: "small",
                            color: "error",
                            variant: "text",
                            onClick: k[3] || (k[3] = ce((l) => E.$emit("delete", i.index), ["stop"]))
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          v(p, null, {
            default: y(() => [
              h.value ? (j(!0), q(W, { key: 0 }, re($.value, (l) => (j(), z(c, {
                key: l,
                type: "error",
                density: "compact",
                class: "mb-1"
              }, {
                default: y(() => [
                  J(D(l), 1)
                ]),
                _: 2
              }, 1024))), 128)) : I("", !0),
              v(t, null, {
                default: y(() => [
                  v(C, {
                    cols: "12",
                    md: "8"
                  }, {
                    default: y(() => [
                      v(me, {
                        modelValue: f.value,
                        "onUpdate:modelValue": k[4] || (k[4] = (l) => f.value = l),
                        class: ge({ "text-error": h.value }),
                        label: "Stage Configuration (JSON)",
                        placeholder: '{"$match": {"status": "active"}}',
                        rows: 8
                      }, null, 8, ["modelValue", "class"])
                    ]),
                    _: 1
                  }),
                  v(C, {
                    cols: "12",
                    md: "4"
                  }, {
                    default: y(() => [
                      T("div", Ge, [
                        k[5] || (k[5] = T("div", { class: "preview-box-label" }, " Preview ", -1)),
                        T("div", Ie, [
                          T("pre", null, D(JSON.stringify(S.value, null, 2)), 1)
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
}), he = (i, n) => {
  const e = i.__vccOpts || i;
  for (const [g, u] of n)
    e[g] = u;
  return e;
}, Ze = /* @__PURE__ */ he(He, [["__scopeId", "data-v-d84dc298"]]), Xe = /* @__PURE__ */ se({
  __name: "VOutputPanel",
  props: {
    pipeline: {}
  },
  emits: ["export"],
  setup(i, { emit: n }) {
    const e = i, g = N("json"), u = B(() => JSON.stringify(e.pipeline, null, 2)), f = B(() => `db.collection.aggregate(${JSON.stringify(e.pipeline, null, 2)})`);
    return ($, s) => {
      const h = _("v-spacer"), S = _("v-btn"), V = _("v-card-title"), O = _("v-tab"), E = _("v-tabs"), k = _("v-window-item"), C = _("v-window"), A = _("v-card-text"), b = _("v-card"), x = _("v-col"), a = _("v-row");
      return j(), z(a, null, {
        default: y(() => [
          v(x, null, {
            default: y(() => [
              v(b, null, {
                default: y(() => [
                  v(V, { class: "d-flex align-center" }, {
                    default: y(() => [
                      s[4] || (s[4] = T("span", null, "Output", -1)),
                      v(h),
                      v(S, {
                        onClick: s[0] || (s[0] = (t) => $.$emit("export")),
                        size: "small"
                      }, {
                        default: y(() => [...s[3] || (s[3] = [
                          J(" Export ", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  v(A, null, {
                    default: y(() => [
                      v(E, {
                        modelValue: g.value,
                        "onUpdate:modelValue": s[1] || (s[1] = (t) => g.value = t),
                        color: "primary"
                      }, {
                        default: y(() => [
                          v(O, { value: "json" }, {
                            default: y(() => [...s[5] || (s[5] = [
                              J("JSON", -1)
                            ])]),
                            _: 1
                          }),
                          v(O, { value: "query" }, {
                            default: y(() => [...s[6] || (s[6] = [
                              J("Query", -1)
                            ])]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"]),
                      v(C, {
                        modelValue: g.value,
                        "onUpdate:modelValue": s[2] || (s[2] = (t) => g.value = t),
                        class: "mt-4"
                      }, {
                        default: y(() => [
                          v(k, { value: "json" }, {
                            default: y(() => [
                              T("pre", null, D(u.value), 1)
                            ]),
                            _: 1
                          }),
                          v(k, { value: "query" }, {
                            default: y(() => [
                              T("pre", null, D(f.value), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
}), Ye = /* @__PURE__ */ he(Xe, [["__scopeId", "data-v-b28ddba9"]]), Ke = {
  key: 0,
  class: "validation-errors mt-2"
}, Qe = { class: "d-flex align-center mb-2" }, tt = /* @__PURE__ */ se({
  __name: "VMongoAggregationBuilder",
  props: {
    initialPipeline: { default: () => [] }
  },
  emits: ["pipelineChange", "exportPipeline"],
  setup(i, { emit: n }) {
    const e = i, g = n, u = N(e.initialPipeline || []), f = N("stages"), $ = N(""), s = N([]), h = B(() => s.value.length > 0), S = N(e.initialPipeline ? e.initialPipeline.map((l, r) => r) : []), V = N(JSON.stringify(e.initialPipeline || [], null, 2)), O = B(() => JSON.stringify(u.value, null, 2));
    G(u, () => {
      f.value === "text" && (V.value = O.value);
    }, { deep: !0 });
    const E = [
      { title: "Stages View", value: "stages" },
      { title: "Text View", value: "text" }
    ], k = () => {
      g("exportPipeline", u.value);
    }, C = () => {
      g("pipelineChange", u.value);
    }, A = () => {
      u.value.length, u.value.push({ $match: { status: "active" } }), C();
    }, b = () => {
      S.value = u.value.map((l, r) => r);
    }, x = () => {
      S.value = [];
    }, a = (l) => {
      u.value.splice(l, 1), S.value = S.value.filter((r) => r !== l).map((r) => r > l ? r - 1 : r), d(O.value), C();
    }, t = (l, r) => {
      u.value[l] = r, d(O.value), C();
    }, o = (l) => {
      if (l > 0) {
        [u.value[l - 1], u.value[l]] = [u.value[l], u.value[l - 1]];
        const r = [...S.value], m = r.indexOf(l), w = r.indexOf(l - 1);
        m !== -1 && (r[m] = l - 1), w !== -1 && (r[w] = l), S.value = r, d(O.value), C();
      }
    }, c = (l) => {
      if (l < u.value.length - 1) {
        [u.value[l], u.value[l + 1]] = [u.value[l + 1], u.value[l]];
        const r = [...S.value], m = r.indexOf(l), w = r.indexOf(l + 1);
        m !== -1 && (r[m] = l + 1), w !== -1 && (r[w] = l), S.value = r, d(O.value), C();
      }
    }, p = () => {
      d(V.value);
    }, d = (l) => {
      if (s.value = [], !!l.trim())
        try {
          const r = JSON.parse(l);
          if (!Array.isArray(r)) {
            s.value.push("Aggregation pipeline must be an array of stage objects");
            return;
          }
          const m = Se(l);
          m.isValid || (s.value = m.errors.map((w) => w.message)), m.warnings.length > 0 && m.warnings.forEach((w) => {
            s.value.push(`Warning: ${w.message}`);
          });
        } catch {
          s.value = ["Invalid JSON syntax"];
        }
    };
    return (l, r) => {
      const m = _("v-btn"), w = _("v-btn-toggle"), M = _("v-spacer"), Y = _("v-toolbar"), H = _("v-alert"), ie = _("v-expansion-panels"), K = _("v-col"), Q = _("v-row"), P = _("v-sheet");
      return j(), z(P, null, {
        default: y(() => [
          v(Q, null, {
            default: y(() => [
              v(K, {
                cols: "12",
                md: "8"
              }, {
                default: y(() => [
                  X(l.$slots, "toolbar", {
                    stages: u.value,
                    viewMode: f.value,
                    addStage: A,
                    expandAllStages: b,
                    collapseAllStages: x,
                    exportPipeline: k,
                    viewModeOptions: E
                  }, () => [
                    v(Y, null, {
                      default: y(() => [
                        X(l.$slots, "toolbar-prepend"),
                        v(m, {
                          onClick: A,
                          class: "mx-3"
                        }, {
                          default: y(() => [...r[3] || (r[3] = [
                            J(" Add Stage ", -1)
                          ])]),
                          _: 1
                        }),
                        v(w, {
                          modelValue: f.value,
                          "onUpdate:modelValue": r[0] || (r[0] = (F) => f.value = F),
                          label: "View Mode"
                        }, {
                          default: y(() => [
                            (j(), q(W, null, re(E, (F) => v(m, {
                              key: F.value,
                              value: F.value
                            }, {
                              default: y(() => [
                                J(D(F.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"])), 64))
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        v(M),
                        f.value === "stages" ? (j(), q(W, { key: 0 }, [
                          v(m, {
                            onClick: b,
                            icon: "mdi-chevron-down"
                          }),
                          v(m, {
                            onClick: x,
                            icon: "mdi-chevron-up"
                          })
                        ], 64)) : I("", !0),
                        X(l.$slots, "toolbar-append")
                      ]),
                      _: 3
                    })
                  ]),
                  X(l.$slots, "validation", {
                    errors: s.value,
                    hasErrors: h.value,
                    error: $.value
                  }, () => [
                    h.value ? (j(), q("div", Ke, [
                      (j(!0), q(W, null, re(s.value, (F) => (j(), z(H, {
                        key: F,
                        type: "error",
                        density: "compact",
                        class: "mb-1"
                      }, {
                        default: y(() => [
                          J(D(F), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ])) : I("", !0),
                    $.value ? (j(), z(H, {
                      key: 1,
                      type: "error",
                      class: "mt-4"
                    }, {
                      default: y(() => [
                        r[4] || (r[4] = T("strong", null, "Error:", -1)),
                        J(" " + D($.value), 1)
                      ]),
                      _: 1
                    })) : I("", !0)
                  ]),
                  f.value === "stages" ? (j(), z(ie, {
                    key: 0,
                    modelValue: S.value,
                    "onUpdate:modelValue": r[1] || (r[1] = (F) => S.value = F),
                    multiple: ""
                  }, {
                    default: y(() => [
                      (j(!0), q(W, null, re(u.value, (F, U) => (j(), z(Ze, {
                        key: U,
                        stage: F,
                        index: U,
                        "total-stages": u.value.length,
                        onUpdate: t,
                        onDelete: a,
                        onMoveUp: o,
                        onMoveDown: c
                      }, null, 8, ["stage", "index", "total-stages"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])) : (j(), q(W, { key: 1 }, [
                    T("div", Qe, [
                      v(M),
                      v(m, {
                        size: "small",
                        onClick: p,
                        color: "primary",
                        variant: "outlined"
                      }, {
                        default: y(() => [...r[5] || (r[5] = [
                          J(" Validate ", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    v(me, {
                      modelValue: V.value,
                      "onUpdate:modelValue": r[2] || (r[2] = (F) => V.value = F),
                      class: ge({ "text-error": h.value }),
                      label: "Aggregation Pipeline JSON",
                      placeholder: "Paste your aggregation pipeline JSON here...",
                      rows: 15
                    }, null, 8, ["modelValue", "class"])
                  ], 64))
                ]),
                _: 3
              }),
              v(K, {
                cols: "12",
                md: "4"
              }, {
                default: y(() => [
                  v(Ye, {
                    pipeline: u.value,
                    onExport: k
                  }, null, 8, ["pipeline"]),
                  X(l.$slots, "output", { pipeline: u.value })
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ]),
        _: 3
      });
    };
  }
});
export {
  tt as VMongoAggregationBuilder
};
