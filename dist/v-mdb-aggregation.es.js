import { defineComponent as ie, ref as V, computed as W, watch as B, nextTick as we, onUnmounted as _e, createElementBlock as q, openBlock as j, createElementVNode as L, toDisplayString as J, normalizeClass as de, resolveComponent as k, createBlock as R, withCtx as w, createVNode as h, createTextVNode as D, createCommentVNode as I, withModifiers as ge, Fragment as G, renderList as se, renderSlot as X } from "vue";
const Se = /* @__PURE__ */ new Set([
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
]), xe = /* @__PURE__ */ new Set([
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
function ke(g) {
  const a = {
    isValid: !0,
    errors: [],
    warnings: []
  };
  let e;
  try {
    e = JSON.parse(g);
  } catch (p) {
    return a.isValid = !1, a.errors.push({
      type: "json",
      message: `Invalid JSON: ${p instanceof Error ? p.message : "Unknown parsing error"}`,
      position: {
        line: Le(g, p),
        column: Re(g, p)
      }
    }), a;
  }
  return Array.isArray(e) ? (e.forEach((p, u) => {
    Ae(p, u, a);
  }), a.isValid = a.errors.length === 0, Ne(e, a), a) : (a.isValid = !1, a.errors.push({
    type: "structure",
    message: "Aggregation pipeline must be an array of stage objects"
  }), a);
}
function Ae(g, a, e) {
  if (typeof g != "object" || g === null || Array.isArray(g)) {
    e.isValid = !1, e.errors.push({
      type: "structure",
      message: `Stage ${a + 1} must be an object`,
      position: { stageIndex: a }
    });
    return;
  }
  const p = Object.keys(g);
  p.length !== 1 && (e.isValid = !1, e.errors.push({
    type: "structure",
    message: `Stage ${a + 1} must have exactly one key (stage name)`,
    position: { stageIndex: a }
  }));
  const u = p[0];
  if (!u || !u.startsWith("$")) {
    e.isValid = !1, e.errors.push({
      type: "stage",
      message: `Stage ${a + 1}: Stage name "${u || "undefined"}" must start with $`,
      position: { stageIndex: a }
    });
    return;
  }
  xe.has(u) || e.warnings.push({
    type: "compatibility",
    message: `Stage ${a + 1}: Unrecognized stage "${u}" - may not be supported in all MongoDB versions`,
    position: { stageIndex: a }
  });
  const f = g[u];
  Fe(u, f, a, e);
}
function Fe(g, a, e, p) {
  switch (g) {
    case "$match":
      Ee(a, e, p);
      break;
    case "$group":
      Ce(a, e, p);
      break;
    case "$project":
    case "$addFields":
    case "$set":
      Oe(a, e, p);
      break;
    case "$sort":
      Te(a, e, p);
      break;
    case "$limit":
    case "$skip":
      je(a, e, p);
      break;
    case "$unwind":
      Pe(a, e, p);
      break;
    case "$lookup":
      Ve(a, e, p);
      break;
    // Add more stage-specific validations as needed
    default:
      Me(a, e, p);
  }
}
function Ee(g, a, e) {
  (typeof g != "object" || g === null) && e.errors.push({
    type: "structure",
    message: `Stage ${a + 1} ($match): Must be an object with query conditions`,
    position: { stageIndex: a }
  });
}
function Ce(g, a, e) {
  if (typeof g != "object" || g === null) {
    e.errors.push({
      type: "structure",
      message: `Stage ${a + 1} ($group): Must be an object with _id and accumulator fields`,
      position: { stageIndex: a }
    });
    return;
  }
  g.hasOwnProperty("_id") || e.errors.push({
    type: "structure",
    message: `Stage ${a + 1} ($group): Missing required _id field`,
    position: { stageIndex: a }
  }), Object.entries(g).forEach(([p, u]) => {
    if (p !== "_id" && typeof u == "object" && u !== null) {
      const f = Object.keys(u);
      if (f.length > 0) {
        const x = f[0];
        x && x.startsWith("$") && !Se.has(x) && e.warnings.push({
          type: "compatibility",
          message: `Stage ${a + 1} ($group): Unrecognized accumulator operator "${x}"`,
          position: { stageIndex: a }
        });
      }
    }
  });
}
function Oe(g, a, e) {
  (typeof g != "object" || g === null) && e.errors.push({
    type: "structure",
    message: `Stage ${a + 1}: Projection stage must be an object mapping field names to expressions`,
    position: { stageIndex: a }
  });
}
function Te(g, a, e) {
  if (typeof g != "object" || g === null) {
    e.errors.push({
      type: "structure",
      message: `Stage ${a + 1} ($sort): Must be an object mapping field names to sort directions (1 or -1)`,
      position: { stageIndex: a }
    });
    return;
  }
  Object.entries(g).forEach(([p, u]) => {
    u !== 1 && u !== -1 && e.errors.push({
      type: "structure",
      message: `Stage ${a + 1} ($sort): Field "${p}" must have sort direction 1 (ascending) or -1 (descending), got ${u}`,
      position: { stageIndex: a }
    });
  });
}
function je(g, a, e) {
  (typeof g != "number" || g < 0 || !Number.isInteger(g)) && e.errors.push({
    type: "structure",
    message: `Stage ${a + 1}: Must be a non-negative integer`,
    position: { stageIndex: a }
  });
}
function Pe(g, a, e) {
  typeof g == "string" ? g.startsWith("$") || e.warnings.push({
    type: "best-practice",
    message: `Stage ${a + 1} ($unwind): Field path should start with $`,
    position: { stageIndex: a }
  }) : typeof g == "object" && g !== null ? g.path || e.errors.push({
    type: "structure",
    message: `Stage ${a + 1} ($unwind): Missing required "path" field`,
    position: { stageIndex: a }
  }) : e.errors.push({
    type: "structure",
    message: `Stage ${a + 1} ($unwind): Must be a string field path or object with path property`,
    position: { stageIndex: a }
  });
}
function Ve(g, a, e) {
  if (typeof g != "object" || g === null) {
    e.errors.push({
      type: "structure",
      message: `Stage ${a + 1} ($lookup): Must be an object with lookup configuration`,
      position: { stageIndex: a }
    });
    return;
  }
  g.from || e.errors.push({
    type: "structure",
    message: `Stage ${a + 1} ($lookup): Missing required "from" field`,
    position: { stageIndex: a }
  }), g.as || e.errors.push({
    type: "structure",
    message: `Stage ${a + 1} ($lookup): Missing required "as" field`,
    position: { stageIndex: a }
  });
}
function Me(g, a, e) {
  g == null && e.errors.push({
    type: "structure",
    message: `Stage ${a + 1}: Stage value cannot be null or undefined`,
    position: { stageIndex: a }
  });
}
function Ne(g, a) {
  const e = g.findIndex((f) => "$match" in f);
  e > 0 && a.warnings.push({
    type: "performance",
    message: "Consider moving $match stage earlier in pipeline for better performance",
    position: { stageIndex: e }
  }), g.filter((f) => "$sort" in f).length > 1 && a.warnings.push({
    type: "performance",
    message: "Multiple $sort stages detected - consider combining them",
    position: {}
  }), g.map((f, x) => ({ stage: f, index: x })).filter((f) => "$limit" in f.stage).forEach(({ stage: f, index: x }) => {
    let s = !1;
    for (let A = 0; A < x; A++)
      if ("$sort" in g[A]) {
        s = !0;
        break;
      }
    s || a.warnings.push({
      type: "best-practice",
      message: "$limit without preceding $sort may return unpredictable results",
      position: { stageIndex: x }
    });
  });
}
function Le(g, a) {
  if (a instanceof SyntaxError && "message" in a) {
    const e = a.message.match(/at position (\d+)/);
    if (e && e[1]) {
      const p = parseInt(e[1]);
      return g.substring(0, p).split(`
`).length;
    }
  }
}
function Re(g, a) {
  if (a instanceof SyntaxError && "message" in a) {
    const e = a.message.match(/at position (\d+)/);
    if (e && e[1]) {
      const p = parseInt(e[1]), u = g.substring(0, p).split(`
`), f = u[u.length - 1];
      return f ? f.length : void 0;
    }
  }
}
var ve = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function De(g) {
  return g && g.__esModule && Object.prototype.hasOwnProperty.call(g, "default") ? g.default : g;
}
var pe = { exports: {} }, me;
function Je() {
  return me || (me = 1, (function(g) {
    var a = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
    var e = (function(p) {
      var u = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, f = 0, x = {}, s = {
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
        manual: p.Prism && p.Prism.manual,
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
        disableWorkerMessageHandler: p.Prism && p.Prism.disableWorkerMessageHandler,
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
          encode: function n(t) {
            return t instanceof A ? new A(t.type, n(t.content), t.alias) : Array.isArray(t) ? t.map(n) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
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
          type: function(n) {
            return Object.prototype.toString.call(n).slice(8, -1);
          },
          /**
           * Returns a unique number for the given object. Later calls will still return the same number.
           *
           * @param {Object} obj
           * @returns {number}
           */
          objId: function(n) {
            return n.__id || Object.defineProperty(n, "__id", { value: ++f }), n.__id;
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
          clone: function n(t, i) {
            i = i || {};
            var c, o;
            switch (s.util.type(t)) {
              case "Object":
                if (o = s.util.objId(t), i[o])
                  return i[o];
                c = /** @type {Record<string, any>} */
                {}, i[o] = c;
                for (var d in t)
                  t.hasOwnProperty(d) && (c[d] = n(t[d], i));
                return (
                  /** @type {any} */
                  c
                );
              case "Array":
                return o = s.util.objId(t), i[o] ? i[o] : (c = [], i[o] = c, /** @type {Array} */
                /** @type {any} */
                t.forEach(function(l, r) {
                  c[r] = n(l, i);
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
          getLanguage: function(n) {
            for (; n; ) {
              var t = u.exec(n.className);
              if (t)
                return t[1].toLowerCase();
              n = n.parentElement;
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
          setLanguage: function(n, t) {
            n.className = n.className.replace(RegExp(u, "gi"), ""), n.classList.add("language-" + t);
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
              var n = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(c.stack) || [])[1];
              if (n) {
                var t = document.getElementsByTagName("script");
                for (var i in t)
                  if (t[i].src == n)
                    return t[i];
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
          isActive: function(n, t, i) {
            for (var c = "no-" + t; n; ) {
              var o = n.classList;
              if (o.contains(t))
                return !0;
              if (o.contains(c))
                return !1;
              n = n.parentElement;
            }
            return !!i;
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
          plain: x,
          plaintext: x,
          text: x,
          txt: x,
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
          extend: function(n, t) {
            var i = s.util.clone(s.languages[n]);
            for (var c in t)
              i[c] = t[c];
            return i;
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
          insertBefore: function(n, t, i, c) {
            c = c || /** @type {any} */
            s.languages;
            var o = c[n], d = {};
            for (var l in o)
              if (o.hasOwnProperty(l)) {
                if (l == t)
                  for (var r in i)
                    i.hasOwnProperty(r) && (d[r] = i[r]);
                i.hasOwnProperty(l) || (d[l] = o[l]);
              }
            var b = c[n];
            return c[n] = d, s.languages.DFS(s.languages, function(E, M) {
              M === b && E != n && (this[E] = d);
            }), d;
          },
          // Traverse a language definition with Depth First Search
          DFS: function n(t, i, c, o) {
            o = o || {};
            var d = s.util.objId;
            for (var l in t)
              if (t.hasOwnProperty(l)) {
                i.call(t, l, t[l], c || l);
                var r = t[l], b = s.util.type(r);
                b === "Object" && !o[d(r)] ? (o[d(r)] = !0, n(r, i, null, o)) : b === "Array" && !o[d(r)] && (o[d(r)] = !0, n(r, i, l, o));
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
        highlightAll: function(n, t) {
          s.highlightAllUnder(document, n, t);
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
        highlightAllUnder: function(n, t, i) {
          var c = {
            callback: i,
            container: n,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          s.hooks.run("before-highlightall", c), c.elements = Array.prototype.slice.apply(c.container.querySelectorAll(c.selector)), s.hooks.run("before-all-elements-highlight", c);
          for (var o = 0, d; d = c.elements[o++]; )
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
        highlightElement: function(n, t, i) {
          var c = s.util.getLanguage(n), o = s.languages[c];
          s.util.setLanguage(n, c);
          var d = n.parentElement;
          d && d.nodeName.toLowerCase() === "pre" && s.util.setLanguage(d, c);
          var l = n.textContent, r = {
            element: n,
            language: c,
            grammar: o,
            code: l
          };
          function b(M) {
            r.highlightedCode = M, s.hooks.run("before-insert", r), r.element.innerHTML = r.highlightedCode, s.hooks.run("after-highlight", r), s.hooks.run("complete", r), i && i.call(r.element);
          }
          if (s.hooks.run("before-sanity-check", r), d = r.element.parentElement, d && d.nodeName.toLowerCase() === "pre" && !d.hasAttribute("tabindex") && d.setAttribute("tabindex", "0"), !r.code) {
            s.hooks.run("complete", r), i && i.call(r.element);
            return;
          }
          if (s.hooks.run("before-highlight", r), !r.grammar) {
            b(s.util.encode(r.code));
            return;
          }
          if (t && p.Worker) {
            var E = new Worker(s.filename);
            E.onmessage = function(M) {
              b(M.data);
            }, E.postMessage(JSON.stringify({
              language: r.language,
              code: r.code,
              immediateClose: !0
            }));
          } else
            b(s.highlight(r.code, r.grammar, r.language));
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
        highlight: function(n, t, i) {
          var c = {
            code: n,
            grammar: t,
            language: i
          };
          if (s.hooks.run("before-tokenize", c), !c.grammar)
            throw new Error('The language "' + c.language + '" has no grammar.');
          return c.tokens = s.tokenize(c.code, c.grammar), s.hooks.run("after-tokenize", c), A.stringify(s.util.encode(c.tokens), c.language);
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
        tokenize: function(n, t) {
          var i = t.rest;
          if (i) {
            for (var c in i)
              t[c] = i[c];
            delete t.rest;
          }
          var o = new m();
          return _(o, o.head, n), P(n, o, t, o.head, 0), S(o);
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
          add: function(n, t) {
            var i = s.hooks.all;
            i[n] = i[n] || [], i[n].push(t);
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
          run: function(n, t) {
            var i = s.hooks.all[n];
            if (!(!i || !i.length))
              for (var c = 0, o; o = i[c++]; )
                o(t);
          }
        },
        Token: A
      };
      p.Prism = s;
      function A(n, t, i, c) {
        this.type = n, this.content = t, this.alias = i, this.length = (c || "").length | 0;
      }
      A.stringify = function n(t, i) {
        if (typeof t == "string")
          return t;
        if (Array.isArray(t)) {
          var c = "";
          return t.forEach(function(b) {
            c += n(b, i);
          }), c;
        }
        var o = {
          type: t.type,
          content: n(t.content, i),
          tag: "span",
          classes: ["token", t.type],
          attributes: {},
          language: i
        }, d = t.alias;
        d && (Array.isArray(d) ? Array.prototype.push.apply(o.classes, d) : o.classes.push(d)), s.hooks.run("wrap", o);
        var l = "";
        for (var r in o.attributes)
          l += " " + r + '="' + (o.attributes[r] || "").replace(/"/g, "&quot;") + '"';
        return "<" + o.tag + ' class="' + o.classes.join(" ") + '"' + l + ">" + o.content + "</" + o.tag + ">";
      };
      function O(n, t, i, c) {
        n.lastIndex = t;
        var o = n.exec(i);
        if (o && c && o[1]) {
          var d = o[1].length;
          o.index += d, o[0] = o[0].slice(d);
        }
        return o;
      }
      function P(n, t, i, c, o, d) {
        for (var l in i)
          if (!(!i.hasOwnProperty(l) || !i[l])) {
            var r = i[l];
            r = Array.isArray(r) ? r : [r];
            for (var b = 0; b < r.length; ++b) {
              if (d && d.cause == l + "," + b)
                return;
              var E = r[b], M = E.inside, Y = !!E.lookbehind, Z = !!E.greedy, oe = E.alias;
              if (Z && !E.pattern.global) {
                var Q = E.pattern.toString().match(/[imsuy]*$/)[0];
                E.pattern = RegExp(E.pattern.source, Q + "g");
              }
              for (var ee = E.pattern || E, T = c.next, C = o; T !== t.tail && !(d && C >= d.reach); C += T.value.length, T = T.next) {
                var z = T.value;
                if (t.length > n.length)
                  return;
                if (!(z instanceof A)) {
                  var te = 1, N;
                  if (Z) {
                    if (N = O(ee, C, n, Y), !N || N.index >= n.length)
                      break;
                    var ne = N.index, be = N.index + N[0].length, U = C;
                    for (U += T.value.length; ne >= U; )
                      T = T.next, U += T.value.length;
                    if (U -= T.value.length, C = U, T.value instanceof A)
                      continue;
                    for (var K = T; K !== t.tail && (U < be || typeof K.value == "string"); K = K.next)
                      te++, U += K.value.length;
                    te--, z = n.slice(C, U), N.index -= C;
                  } else if (N = O(ee, 0, z, Y), !N)
                    continue;
                  var ne = N.index, ae = N[0], le = z.slice(0, ne), fe = z.slice(ne + ae.length), ue = C + z.length;
                  d && ue > d.reach && (d.reach = ue);
                  var re = T.prev;
                  le && (re = _(t, re, le), C += le.length), v(t, re, te);
                  var $e = new A(l, M ? s.tokenize(ae, M) : ae, oe, ae);
                  if (T = _(t, re, $e), fe && _(t, T, fe), te > 1) {
                    var ce = {
                      cause: l + "," + b,
                      reach: ue
                    };
                    P(n, t, i, T.prev, C, ce), d && ce.reach > d.reach && (d.reach = ce.reach);
                  }
                }
              }
            }
          }
      }
      function m() {
        var n = { value: null, prev: null, next: null }, t = { value: null, prev: n, next: null };
        n.next = t, this.head = n, this.tail = t, this.length = 0;
      }
      function _(n, t, i) {
        var c = t.next, o = { value: i, prev: t, next: c };
        return t.next = o, c.prev = o, n.length++, o;
      }
      function v(n, t, i) {
        for (var c = t.next, o = 0; o < i && c !== n.tail; o++)
          c = c.next;
        t.next = c, c.prev = t, n.length -= o;
      }
      function S(n) {
        for (var t = [], i = n.head.next; i !== n.tail; )
          t.push(i.value), i = i.next;
        return t;
      }
      if (!p.document)
        return p.addEventListener && (s.disableWorkerMessageHandler || p.addEventListener("message", function(n) {
          var t = JSON.parse(n.data), i = t.language, c = t.code, o = t.immediateClose;
          p.postMessage(s.highlight(c, s.languages[i], i)), o && p.close();
        }, !1)), s;
      var $ = s.util.currentScript();
      $ && (s.filename = $.src, $.hasAttribute("data-manual") && (s.manual = !0));
      function y() {
        s.manual || s.highlightAll();
      }
      if (!s.manual) {
        var F = document.readyState;
        F === "loading" || F === "interactive" && $ && $.defer ? document.addEventListener("DOMContentLoaded", y) : window.requestAnimationFrame ? window.requestAnimationFrame(y) : window.setTimeout(y, 16);
      }
      return s;
    })(a);
    g.exports && (g.exports = e), typeof ve < "u" && (ve.Prism = e), e.languages.markup = {
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
    }, e.languages.markup.tag.inside["attr-value"].inside.entity = e.languages.markup.entity, e.languages.markup.doctype.inside["internal-subset"].inside = e.languages.markup, e.hooks.add("wrap", function(p) {
      p.type === "entity" && (p.attributes.title = p.content.replace(/&amp;/, "&"));
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
        var x = {};
        x["language-" + f] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: e.languages[f]
        }, x.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var s = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: x
          }
        };
        s["language-" + f] = {
          pattern: /[\s\S]+/,
          inside: e.languages[f]
        };
        var A = {};
        A[u] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return u;
          }), "i"),
          lookbehind: !0,
          greedy: !0,
          inside: s
        }, e.languages.insertBefore("markup", "cdata", A);
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
      value: function(p, u) {
        e.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + p + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
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
    }), e.languages.html = e.languages.markup, e.languages.mathml = e.languages.markup, e.languages.svg = e.languages.markup, e.languages.xml = e.languages.extend("markup", {}), e.languages.ssml = e.languages.xml, e.languages.atom = e.languages.xml, e.languages.rss = e.languages.xml, (function(p) {
      var u = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      p.languages.css = {
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
      }, p.languages.css.atrule.inside.rest = p.languages.css;
      var f = p.languages.markup;
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
      var p = "Loading…", u = function($, y) {
        return "✖ Error " + $ + " while fetching file: " + y;
      }, f = "✖ Error: File does not exist or is empty", x = {
        js: "javascript",
        py: "python",
        rb: "ruby",
        ps1: "powershell",
        psm1: "powershell",
        sh: "bash",
        bat: "batch",
        h: "c",
        tex: "latex"
      }, s = "data-src-status", A = "loading", O = "loaded", P = "failed", m = "pre[data-src]:not([" + s + '="' + O + '"]):not([' + s + '="' + A + '"])';
      function _($, y, F) {
        var n = new XMLHttpRequest();
        n.open("GET", $, !0), n.onreadystatechange = function() {
          n.readyState == 4 && (n.status < 400 && n.responseText ? y(n.responseText) : n.status >= 400 ? F(u(n.status, n.statusText)) : F(f));
        }, n.send(null);
      }
      function v($) {
        var y = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec($ || "");
        if (y) {
          var F = Number(y[1]), n = y[2], t = y[3];
          return n ? t ? [F, Number(t)] : [F, void 0] : [F, F];
        }
      }
      e.hooks.add("before-highlightall", function($) {
        $.selector += ", " + m;
      }), e.hooks.add("before-sanity-check", function($) {
        var y = (
          /** @type {HTMLPreElement} */
          $.element
        );
        if (y.matches(m)) {
          $.code = "", y.setAttribute(s, A);
          var F = y.appendChild(document.createElement("CODE"));
          F.textContent = p;
          var n = y.getAttribute("data-src"), t = $.language;
          if (t === "none") {
            var i = (/\.(\w+)$/.exec(n) || [, "none"])[1];
            t = x[i] || i;
          }
          e.util.setLanguage(F, t), e.util.setLanguage(y, t);
          var c = e.plugins.autoloader;
          c && c.loadLanguages(t), _(
            n,
            function(o) {
              y.setAttribute(s, O);
              var d = v(y.getAttribute("data-range"));
              if (d) {
                var l = o.split(/\r\n?|\n/g), r = d[0], b = d[1] == null ? l.length : d[1];
                r < 0 && (r += l.length), r = Math.max(0, Math.min(r - 1, l.length)), b < 0 && (b += l.length), b = Math.max(0, Math.min(b, l.length)), o = l.slice(r, b).join(`
`), y.hasAttribute("data-start") || y.setAttribute("data-start", String(r + 1));
              }
              F.textContent = o, e.highlightElement(F);
            },
            function(o) {
              y.setAttribute(s, P), F.textContent = o;
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
        highlight: function(y) {
          for (var F = (y || document).querySelectorAll(m), n = 0, t; t = F[n++]; )
            e.highlightElement(t);
        }
      };
      var S = !1;
      e.fileHighlight = function() {
        S || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), S = !0), e.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  })(pe)), pe.exports;
}
var ze = Je();
const H = /* @__PURE__ */ De(ze);
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
const Ue = { class: "v-mab-syntax-highlighted-textarea" }, qe = ["textContent"], he = /* @__PURE__ */ ie({
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
  setup(g, { emit: a }) {
    const e = g, p = a, u = V(e.modelValue), f = V();
    W(() => {
      try {
        const m = JSON.parse(u.value || "{}");
        return JSON.stringify(m, null, 2);
      } catch {
        return u.value || "";
      }
    }), B(() => e.modelValue, (m) => {
      u.value = m;
    }), B(u, (m) => {
      p("update:modelValue", m);
    });
    const x = (m) => {
      const v = m.target.textContent || "";
      u.value = v, clearTimeout(f.value), f.value = setTimeout(() => {
        O();
      }, 100);
    }, s = (m) => {
      if (m.key === "Tab") {
        m.preventDefault();
        const _ = m.target, v = window.getSelection();
        if (v && v.rangeCount > 0) {
          const S = v.getRangeAt(0), $ = document.createTextNode("  ");
          S.insertNode($), S.setStartAfter($), S.setEndAfter($), v.removeAllRanges(), v.addRange(S), u.value = _.textContent || "";
        }
      }
    }, A = (m) => {
    }, O = () => {
      const m = document.querySelector(".v-mab-syntax-textarea");
      if (!m) return;
      const _ = m.textContent || "";
      if (!_.trim()) return;
      let v = 0;
      const S = window.getSelection();
      if (S && S.rangeCount > 0)
        try {
          const $ = S.getRangeAt(0), y = $.cloneRange();
          y.selectNodeContents(m), y.setEnd($.endContainer, $.endOffset), v = y.toString().length;
        } catch {
          v = _.length;
        }
      try {
        const $ = JSON.parse(_), y = JSON.stringify($, null, 2), F = H.languages.json ? H.highlight(y, H.languages.json, "json") : y;
        if (m.innerHTML = F, v > 0)
          try {
            const n = P(m);
            let t = 0, i = null, c = 0;
            for (const o of n) {
              if (t + o.textContent.length >= v) {
                i = o, c = v - t;
                break;
              }
              t += o.textContent.length;
            }
            if (i && S) {
              const o = document.createRange();
              o.setStart(i, Math.min(c, i.textContent.length)), o.setEnd(i, Math.min(c, i.textContent.length)), S.removeAllRanges(), S.addRange(o);
            }
          } catch (n) {
            console.warn("Failed to restore cursor position:", n);
          }
      } catch {
        const $ = H.languages.json ? H.highlight(_, H.languages.json, "json") : _;
        m.innerHTML = $;
      }
    }, P = (m) => {
      const _ = [], v = document.createTreeWalker(m, NodeFilter.SHOW_TEXT, null);
      let S;
      for (; S = v.nextNode(); )
        _.push(S);
      return _;
    };
    return B(u, () => {
      we(() => {
        f.value || O();
      });
    }, { immediate: !0 }), _e(() => {
      f.value && (clearTimeout(f.value), f.value = 0);
    }), (m, _) => (j(), q("div", Ue, [
      L("div", {
        contenteditable: "true",
        class: de(["v-mab-syntax-textarea", g.textareaClass]),
        onInput: x,
        onKeydown: s,
        onScroll: A,
        spellcheck: "false",
        textContent: J(u.value)
      }, null, 42, qe)
    ]));
  }
}), Be = { class: "stage-number" }, We = { class: "v-mab-preview-box" }, He = { class: "v-mab-preview-box-content" }, Ge = /* @__PURE__ */ ie({
  __name: "VStageCard",
  props: {
    stage: {},
    index: {},
    totalStages: {}
  },
  emits: ["update", "delete", "move-up", "move-down"],
  setup(g, { emit: a }) {
    const e = g, p = a, u = V(""), f = V(""), x = V([]), s = [
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
    ], A = W(() => x.value.length > 0), O = W(() => {
      try {
        return JSON.parse(f.value);
      } catch {
        return null;
      }
    }), P = (_) => {
      try {
        const v = JSON.parse(f.value), S = { [_]: v[Object.keys(v)[0]] || {} };
        f.value = JSON.stringify(S, null, 2), m();
      } catch {
        const v = { [_]: {} };
        f.value = JSON.stringify(v, null, 2), m();
      }
    }, m = () => {
      try {
        const _ = JSON.parse(f.value);
        p("update", e.index, _);
      } catch {
        x.value = ["Invalid JSON syntax"];
      }
    };
    return B(() => e.stage, (_) => {
      u.value = Object.keys(_)[0] || "", f.value = JSON.stringify(_, null, 2), x.value = [];
    }, { immediate: !0 }), B(f, () => {
      x.value = [], m();
    }), (_, v) => {
      const S = k("v-col"), $ = k("v-chip"), y = k("v-select"), F = k("v-btn"), n = k("v-btn-group"), t = k("v-row"), i = k("v-expansion-panel-title"), c = k("v-alert"), o = k("v-expansion-panel-text"), d = k("v-expansion-panel");
      return j(), R(d, null, {
        default: w(() => [
          h(i, null, {
            default: w(() => [
              h(t, { align: "center" }, {
                default: w(() => [
                  h(S, { cols: "auto" }, {
                    default: w(() => [
                      L("span", Be, "Stage " + J(g.index + 1), 1)
                    ]),
                    _: 1
                  }),
                  h(S, { cols: "auto" }, {
                    default: w(() => [
                      h($, {
                        size: "small",
                        color: "primary",
                        variant: "outlined"
                      }, {
                        default: w(() => [
                          D(J(u.value || "Select Type"), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  h(S, null, {
                    default: w(() => [
                      h(y, {
                        modelValue: u.value,
                        "onUpdate:modelValue": [
                          v[0] || (v[0] = (l) => u.value = l),
                          P
                        ],
                        items: s,
                        label: "Stage Type",
                        density: "compact",
                        "hide-details": ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  h(S, { cols: "auto" }, {
                    default: w(() => [
                      h(n, null, {
                        default: w(() => [
                          g.index > 0 ? (j(), R(F, {
                            key: 0,
                            icon: "mdi-arrow-up",
                            size: "small",
                            variant: "text",
                            onClick: v[1] || (v[1] = ge((l) => _.$emit("move-up", g.index), ["stop"]))
                          })) : I("", !0),
                          g.index < g.totalStages - 1 ? (j(), R(F, {
                            key: 1,
                            icon: "mdi-arrow-down",
                            size: "small",
                            variant: "text",
                            onClick: v[2] || (v[2] = ge((l) => _.$emit("move-down", g.index), ["stop"]))
                          })) : I("", !0),
                          h(F, {
                            icon: "mdi-delete-outline",
                            size: "small",
                            color: "error",
                            variant: "text",
                            onClick: v[3] || (v[3] = ge((l) => _.$emit("delete", g.index), ["stop"]))
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
          h(o, null, {
            default: w(() => [
              A.value ? (j(!0), q(G, { key: 0 }, se(x.value, (l) => (j(), R(c, {
                key: l,
                type: "error",
                density: "compact",
                class: "mb-1"
              }, {
                default: w(() => [
                  D(J(l), 1)
                ]),
                _: 2
              }, 1024))), 128)) : I("", !0),
              h(t, null, {
                default: w(() => [
                  h(S, {
                    cols: "12",
                    md: "8"
                  }, {
                    default: w(() => [
                      h(he, {
                        modelValue: f.value,
                        "onUpdate:modelValue": v[4] || (v[4] = (l) => f.value = l),
                        class: de({ "text-error": A.value }),
                        label: "Stage Configuration (JSON)",
                        placeholder: '{"$match": {"status": "active"}}',
                        rows: 8
                      }, null, 8, ["modelValue", "class"])
                    ]),
                    _: 1
                  }),
                  h(S, {
                    cols: "12",
                    md: "4"
                  }, {
                    default: w(() => [
                      L("div", We, [
                        v[5] || (v[5] = L("div", { class: "v-mab-preview-box-label" }, " Preview ", -1)),
                        L("div", He, [
                          L("pre", null, J(JSON.stringify(O.value, null, 2)), 1)
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
}), ye = (g, a) => {
  const e = g.__vccOpts || g;
  for (const [p, u] of a)
    e[p] = u;
  return e;
}, Ie = /* @__PURE__ */ ye(Ge, [["__scopeId", "data-v-d6bb770e"]]), Ze = /* @__PURE__ */ ie({
  __name: "VOutputPanel",
  props: {
    pipeline: {}
  },
  emits: ["export"],
  setup(g, { emit: a }) {
    const e = g, p = V("json"), u = W(() => JSON.stringify(e.pipeline, null, 2)), f = W(() => `db.collection.aggregate(${JSON.stringify(e.pipeline, null, 2)})`);
    return (x, s) => {
      const A = k("v-spacer"), O = k("v-btn"), P = k("v-card-title"), m = k("v-tab"), _ = k("v-tabs"), v = k("v-window-item"), S = k("v-window"), $ = k("v-card-text"), y = k("v-card"), F = k("v-col"), n = k("v-row");
      return j(), R(n, null, {
        default: w(() => [
          h(F, null, {
            default: w(() => [
              h(y, null, {
                default: w(() => [
                  h(P, { class: "d-flex align-center" }, {
                    default: w(() => [
                      s[4] || (s[4] = L("span", null, "Output", -1)),
                      h(A),
                      h(O, {
                        onClick: s[0] || (s[0] = (t) => x.$emit("export")),
                        size: "small"
                      }, {
                        default: w(() => [...s[3] || (s[3] = [
                          D(" Export ", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  h($, null, {
                    default: w(() => [
                      h(_, {
                        modelValue: p.value,
                        "onUpdate:modelValue": s[1] || (s[1] = (t) => p.value = t),
                        color: "primary"
                      }, {
                        default: w(() => [
                          h(m, { value: "json" }, {
                            default: w(() => [...s[5] || (s[5] = [
                              D("JSON", -1)
                            ])]),
                            _: 1
                          }),
                          h(m, { value: "query" }, {
                            default: w(() => [...s[6] || (s[6] = [
                              D("Query", -1)
                            ])]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"]),
                      h(S, {
                        modelValue: p.value,
                        "onUpdate:modelValue": s[2] || (s[2] = (t) => p.value = t),
                        class: "mt-4"
                      }, {
                        default: w(() => [
                          h(v, { value: "json" }, {
                            default: w(() => [
                              L("pre", null, J(u.value), 1)
                            ]),
                            _: 1
                          }),
                          h(v, { value: "query" }, {
                            default: w(() => [
                              L("pre", null, J(f.value), 1)
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
}), Ke = /* @__PURE__ */ ye(Ze, [["__scopeId", "data-v-b28ddba9"]]), Xe = {
  key: 0,
  class: "validation-errors mt-2"
}, Ye = { class: "d-flex align-center mb-2" }, et = /* @__PURE__ */ ie({
  __name: "VMongoAggregationBuilder",
  props: {
    initialPipeline: { default: () => [] }
  },
  emits: ["pipelineChange", "exportPipeline"],
  setup(g, { emit: a }) {
    const e = g, p = a, u = V(e.initialPipeline || []), f = V("stages"), x = V(""), s = V([]), A = W(() => s.value.length > 0), O = V(e.initialPipeline ? e.initialPipeline.map((l, r) => r) : []), P = V(JSON.stringify(e.initialPipeline || [], null, 2)), m = W(() => JSON.stringify(u.value, null, 2));
    B(u, () => {
      f.value === "text" && (P.value = m.value);
    }, { deep: !0 }), B(f, (l) => {
      l === "text" && (P.value = m.value);
    });
    const _ = [
      { title: "Stages View", value: "stages" },
      { title: "Text View", value: "text" }
    ], v = () => {
      p("exportPipeline", u.value);
    }, S = () => {
      p("pipelineChange", u.value);
    }, $ = () => {
      u.value.length, u.value.push({ $match: { status: "active" } }), S();
    }, y = () => {
      O.value = u.value.map((l, r) => r);
    }, F = () => {
      O.value = [];
    }, n = (l) => {
      u.value.splice(l, 1), O.value = O.value.filter((r) => r !== l).map((r) => r > l ? r - 1 : r), d(m.value), S();
    }, t = (l, r) => {
      u.value[l] = r, d(m.value), S();
    }, i = (l) => {
      if (l > 0) {
        [u.value[l - 1], u.value[l]] = [u.value[l], u.value[l - 1]];
        const r = [...O.value], b = r.indexOf(l), E = r.indexOf(l - 1);
        b !== -1 && (r[b] = l - 1), E !== -1 && (r[E] = l), O.value = r, d(m.value), S();
      }
    }, c = (l) => {
      if (l < u.value.length - 1) {
        [u.value[l], u.value[l + 1]] = [u.value[l + 1], u.value[l]];
        const r = [...O.value], b = r.indexOf(l), E = r.indexOf(l + 1);
        b !== -1 && (r[b] = l + 1), E !== -1 && (r[E] = l), O.value = r, d(m.value), S();
      }
    }, o = () => {
      d(P.value);
    }, d = (l) => {
      if (s.value = [], !!l.trim())
        try {
          const r = JSON.parse(l);
          if (!Array.isArray(r)) {
            s.value.push("Aggregation pipeline must be an array of stage objects");
            return;
          }
          const b = ke(l);
          b.isValid || (s.value = b.errors.map((E) => E.message)), b.warnings.length > 0 && b.warnings.forEach((E) => {
            s.value.push(`Warning: ${E.message}`);
          });
        } catch {
          s.value = ["Invalid JSON syntax"];
        }
    };
    return (l, r) => {
      const b = k("v-btn"), E = k("v-btn-toggle"), M = k("v-spacer"), Y = k("v-toolbar"), Z = k("v-alert"), oe = k("v-expansion-panels"), Q = k("v-col"), ee = k("v-row"), T = k("v-sheet");
      return j(), R(T, null, {
        default: w(() => [
          h(ee, null, {
            default: w(() => [
              h(Q, {
                cols: "12",
                md: "8"
              }, {
                default: w(() => [
                  X(l.$slots, "toolbar", {
                    stages: u.value,
                    viewMode: f.value,
                    addStage: $,
                    expandAllStages: y,
                    collapseAllStages: F,
                    exportPipeline: v,
                    viewModeOptions: _
                  }, () => [
                    h(Y, null, {
                      default: w(() => [
                        X(l.$slots, "toolbar-prepend"),
                        h(b, {
                          onClick: $,
                          class: "mx-3"
                        }, {
                          default: w(() => [...r[3] || (r[3] = [
                            D(" Add Stage ", -1)
                          ])]),
                          _: 1
                        }),
                        h(E, {
                          modelValue: f.value,
                          "onUpdate:modelValue": r[0] || (r[0] = (C) => f.value = C),
                          label: "View Mode"
                        }, {
                          default: w(() => [
                            (j(), q(G, null, se(_, (C) => h(b, {
                              key: C.value,
                              value: C.value
                            }, {
                              default: w(() => [
                                D(J(C.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"])), 64))
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        h(M),
                        f.value === "stages" ? (j(), q(G, { key: 0 }, [
                          h(b, {
                            onClick: y,
                            icon: "mdi-chevron-down"
                          }),
                          h(b, {
                            onClick: F,
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
                    hasErrors: A.value,
                    error: x.value
                  }, () => [
                    A.value ? (j(), q("div", Xe, [
                      (j(!0), q(G, null, se(s.value, (C) => (j(), R(Z, {
                        key: C,
                        type: "error",
                        density: "compact",
                        class: "mb-1"
                      }, {
                        default: w(() => [
                          D(J(C), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ])) : I("", !0),
                    x.value ? (j(), R(Z, {
                      key: 1,
                      type: "error",
                      class: "mt-4"
                    }, {
                      default: w(() => [
                        r[4] || (r[4] = L("strong", null, "Error:", -1)),
                        D(" " + J(x.value), 1)
                      ]),
                      _: 1
                    })) : I("", !0)
                  ]),
                  f.value === "stages" ? (j(), R(oe, {
                    key: 0,
                    modelValue: O.value,
                    "onUpdate:modelValue": r[1] || (r[1] = (C) => O.value = C),
                    multiple: ""
                  }, {
                    default: w(() => [
                      (j(!0), q(G, null, se(u.value, (C, z) => (j(), R(Ie, {
                        key: z,
                        stage: C,
                        index: z,
                        "total-stages": u.value.length,
                        onUpdate: t,
                        onDelete: n,
                        onMoveUp: i,
                        onMoveDown: c
                      }, null, 8, ["stage", "index", "total-stages"]))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])) : (j(), q(G, { key: 1 }, [
                    L("div", Ye, [
                      h(M),
                      h(b, {
                        size: "small",
                        onClick: o,
                        color: "primary",
                        variant: "outlined"
                      }, {
                        default: w(() => [...r[5] || (r[5] = [
                          D(" Validate ", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    h(he, {
                      modelValue: P.value,
                      "onUpdate:modelValue": r[2] || (r[2] = (C) => P.value = C),
                      class: de({ "text-error": A.value }),
                      label: "Aggregation Pipeline JSON",
                      placeholder: "Paste your aggregation pipeline JSON here...",
                      rows: 15
                    }, null, 8, ["modelValue", "class"])
                  ], 64))
                ]),
                _: 3
              }),
              h(Q, {
                cols: "12",
                md: "4"
              }, {
                default: w(() => [
                  h(Ke, {
                    pipeline: u.value,
                    onExport: v
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
  et as VMongoAggregationBuilder
};
