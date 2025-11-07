import { defineComponent as se, ref as N, computed as B, watch as G, nextTick as be, createElementBlock as q, openBlock as V, createElementVNode as T, withDirectives as we, toDisplayString as z, normalizeClass as ge, vModelText as _e, resolveComponent as w, createBlock as D, withCtx as h, createVNode as v, createTextVNode as J, createCommentVNode as H, withModifiers as ce, Fragment as W, renderList as re, renderSlot as X } from "vue";
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
]), ke = /* @__PURE__ */ new Set([
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
function xe(i) {
  const r = {
    isValid: !0,
    errors: [],
    warnings: []
  };
  let e;
  try {
    e = JSON.parse(i);
  } catch (g) {
    return r.isValid = !1, r.errors.push({
      type: "json",
      message: `Invalid JSON: ${g instanceof Error ? g.message : "Unknown parsing error"}`,
      position: {
        line: Ne(i, g),
        column: De(i, g)
      }
    }), r;
  }
  return Array.isArray(e) ? (e.forEach((g, u) => {
    Ae(g, u, r);
  }), r.isValid = r.errors.length === 0, Le(e, r), r) : (r.isValid = !1, r.errors.push({
    type: "structure",
    message: "Aggregation pipeline must be an array of stage objects"
  }), r);
}
function Ae(i, r, e) {
  if (typeof i != "object" || i === null || Array.isArray(i)) {
    e.isValid = !1, e.errors.push({
      type: "structure",
      message: `Stage ${r + 1} must be an object`,
      position: { stageIndex: r }
    });
    return;
  }
  const g = Object.keys(i);
  g.length !== 1 && (e.isValid = !1, e.errors.push({
    type: "structure",
    message: `Stage ${r + 1} must have exactly one key (stage name)`,
    position: { stageIndex: r }
  }));
  const u = g[0];
  if (!u || !u.startsWith("$")) {
    e.isValid = !1, e.errors.push({
      type: "stage",
      message: `Stage ${r + 1}: Stage name "${u || "undefined"}" must start with $`,
      position: { stageIndex: r }
    });
    return;
  }
  ke.has(u) || e.warnings.push({
    type: "compatibility",
    message: `Stage ${r + 1}: Unrecognized stage "${u}" - may not be supported in all MongoDB versions`,
    position: { stageIndex: r }
  });
  const f = i[u];
  Fe(u, f, r, e);
}
function Fe(i, r, e, g) {
  switch (i) {
    case "$match":
      Ee(r, e, g);
      break;
    case "$group":
      Ce(r, e, g);
      break;
    case "$project":
    case "$addFields":
    case "$set":
      Oe(r, e, g);
      break;
    case "$sort":
      Pe(r, e, g);
      break;
    case "$limit":
    case "$skip":
      Ve(r, e, g);
      break;
    case "$unwind":
      je(r, e, g);
      break;
    case "$lookup":
      Te(r, e, g);
      break;
    // Add more stage-specific validations as needed
    default:
      Me(r, e, g);
  }
}
function Ee(i, r, e) {
  (typeof i != "object" || i === null) && e.errors.push({
    type: "structure",
    message: `Stage ${r + 1} ($match): Must be an object with query conditions`,
    position: { stageIndex: r }
  });
}
function Ce(i, r, e) {
  if (typeof i != "object" || i === null) {
    e.errors.push({
      type: "structure",
      message: `Stage ${r + 1} ($group): Must be an object with _id and accumulator fields`,
      position: { stageIndex: r }
    });
    return;
  }
  i.hasOwnProperty("_id") || e.errors.push({
    type: "structure",
    message: `Stage ${r + 1} ($group): Missing required _id field`,
    position: { stageIndex: r }
  }), Object.entries(i).forEach(([g, u]) => {
    if (g !== "_id" && typeof u == "object" && u !== null) {
      const f = Object.keys(u);
      if (f.length > 0) {
        const y = f[0];
        y && y.startsWith("$") && !Se.has(y) && e.warnings.push({
          type: "compatibility",
          message: `Stage ${r + 1} ($group): Unrecognized accumulator operator "${y}"`,
          position: { stageIndex: r }
        });
      }
    }
  });
}
function Oe(i, r, e) {
  (typeof i != "object" || i === null) && e.errors.push({
    type: "structure",
    message: `Stage ${r + 1}: Projection stage must be an object mapping field names to expressions`,
    position: { stageIndex: r }
  });
}
function Pe(i, r, e) {
  if (typeof i != "object" || i === null) {
    e.errors.push({
      type: "structure",
      message: `Stage ${r + 1} ($sort): Must be an object mapping field names to sort directions (1 or -1)`,
      position: { stageIndex: r }
    });
    return;
  }
  Object.entries(i).forEach(([g, u]) => {
    u !== 1 && u !== -1 && e.errors.push({
      type: "structure",
      message: `Stage ${r + 1} ($sort): Field "${g}" must have sort direction 1 (ascending) or -1 (descending), got ${u}`,
      position: { stageIndex: r }
    });
  });
}
function Ve(i, r, e) {
  (typeof i != "number" || i < 0 || !Number.isInteger(i)) && e.errors.push({
    type: "structure",
    message: `Stage ${r + 1}: Must be a non-negative integer`,
    position: { stageIndex: r }
  });
}
function je(i, r, e) {
  typeof i == "string" ? i.startsWith("$") || e.warnings.push({
    type: "best-practice",
    message: `Stage ${r + 1} ($unwind): Field path should start with $`,
    position: { stageIndex: r }
  }) : typeof i == "object" && i !== null ? i.path || e.errors.push({
    type: "structure",
    message: `Stage ${r + 1} ($unwind): Missing required "path" field`,
    position: { stageIndex: r }
  }) : e.errors.push({
    type: "structure",
    message: `Stage ${r + 1} ($unwind): Must be a string field path or object with path property`,
    position: { stageIndex: r }
  });
}
function Te(i, r, e) {
  if (typeof i != "object" || i === null) {
    e.errors.push({
      type: "structure",
      message: `Stage ${r + 1} ($lookup): Must be an object with lookup configuration`,
      position: { stageIndex: r }
    });
    return;
  }
  i.from || e.errors.push({
    type: "structure",
    message: `Stage ${r + 1} ($lookup): Missing required "from" field`,
    position: { stageIndex: r }
  }), i.as || e.errors.push({
    type: "structure",
    message: `Stage ${r + 1} ($lookup): Missing required "as" field`,
    position: { stageIndex: r }
  });
}
function Me(i, r, e) {
  i == null && e.errors.push({
    type: "structure",
    message: `Stage ${r + 1}: Stage value cannot be null or undefined`,
    position: { stageIndex: r }
  });
}
function Le(i, r) {
  const e = i.findIndex((f) => "$match" in f);
  e > 0 && r.warnings.push({
    type: "performance",
    message: "Consider moving $match stage earlier in pipeline for better performance",
    position: { stageIndex: e }
  }), i.filter((f) => "$sort" in f).length > 1 && r.warnings.push({
    type: "performance",
    message: "Multiple $sort stages detected - consider combining them",
    position: {}
  }), i.map((f, y) => ({ stage: f, index: y })).filter((f) => "$limit" in f.stage).forEach(({ stage: f, index: y }) => {
    let n = !1;
    for (let $ = 0; $ < y; $++)
      if ("$sort" in i[$]) {
        n = !0;
        break;
      }
    n || r.warnings.push({
      type: "best-practice",
      message: "$limit without preceding $sort may return unpredictable results",
      position: { stageIndex: y }
    });
  });
}
function Ne(i, r) {
  if (r instanceof SyntaxError && "message" in r) {
    const e = r.message.match(/at position (\d+)/);
    if (e && e[1]) {
      const g = parseInt(e[1]);
      return i.substring(0, g).split(`
`).length;
    }
  }
}
function De(i, r) {
  if (r instanceof SyntaxError && "message" in r) {
    const e = r.message.match(/at position (\d+)/);
    if (e && e[1]) {
      const g = parseInt(e[1]), u = i.substring(0, g).split(`
`), f = u[u.length - 1];
      return f ? f.length : void 0;
    }
  }
}
var ve = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Je(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var pe = { exports: {} }, me;
function ze() {
  return me || (me = 1, (function(i) {
    var r = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
    var e = (function(g) {
      var u = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, f = 0, y = {}, n = {
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
            return t instanceof $ ? new $(t.type, a(t.content), t.alias) : Array.isArray(t) ? t.map(a) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
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
            switch (n.util.type(t)) {
              case "Object":
                if (p = n.util.objId(t), o[p])
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
                return p = n.util.objId(t), o[p] ? o[p] : (c = [], o[p] = c, /** @type {Array} */
                /** @type {any} */
                t.forEach(function(l, s) {
                  c[s] = a(l, o);
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
          plain: y,
          plaintext: y,
          text: y,
          txt: y,
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
            var o = n.util.clone(n.languages[a]);
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
            n.languages;
            var p = c[a], d = {};
            for (var l in p)
              if (p.hasOwnProperty(l)) {
                if (l == t)
                  for (var s in o)
                    o.hasOwnProperty(s) && (d[s] = o[s]);
                o.hasOwnProperty(l) || (d[l] = p[l]);
              }
            var m = c[a];
            return c[a] = d, n.languages.DFS(n.languages, function(_, M) {
              M === m && _ != a && (this[_] = d);
            }), d;
          },
          // Traverse a language definition with Depth First Search
          DFS: function a(t, o, c, p) {
            p = p || {};
            var d = n.util.objId;
            for (var l in t)
              if (t.hasOwnProperty(l)) {
                o.call(t, l, t[l], c || l);
                var s = t[l], m = n.util.type(s);
                m === "Object" && !p[d(s)] ? (p[d(s)] = !0, a(s, o, null, p)) : m === "Array" && !p[d(s)] && (p[d(s)] = !0, a(s, o, l, p));
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
          n.highlightAllUnder(document, a, t);
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
          n.hooks.run("before-highlightall", c), c.elements = Array.prototype.slice.apply(c.container.querySelectorAll(c.selector)), n.hooks.run("before-all-elements-highlight", c);
          for (var p = 0, d; d = c.elements[p++]; )
            n.highlightElement(d, t === !0, c.callback);
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
          var c = n.util.getLanguage(a), p = n.languages[c];
          n.util.setLanguage(a, c);
          var d = a.parentElement;
          d && d.nodeName.toLowerCase() === "pre" && n.util.setLanguage(d, c);
          var l = a.textContent, s = {
            element: a,
            language: c,
            grammar: p,
            code: l
          };
          function m(M) {
            s.highlightedCode = M, n.hooks.run("before-insert", s), s.element.innerHTML = s.highlightedCode, n.hooks.run("after-highlight", s), n.hooks.run("complete", s), o && o.call(s.element);
          }
          if (n.hooks.run("before-sanity-check", s), d = s.element.parentElement, d && d.nodeName.toLowerCase() === "pre" && !d.hasAttribute("tabindex") && d.setAttribute("tabindex", "0"), !s.code) {
            n.hooks.run("complete", s), o && o.call(s.element);
            return;
          }
          if (n.hooks.run("before-highlight", s), !s.grammar) {
            m(n.util.encode(s.code));
            return;
          }
          if (t && g.Worker) {
            var _ = new Worker(n.filename);
            _.onmessage = function(M) {
              m(M.data);
            }, _.postMessage(JSON.stringify({
              language: s.language,
              code: s.code,
              immediateClose: !0
            }));
          } else
            m(n.highlight(s.code, s.grammar, s.language));
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
          if (n.hooks.run("before-tokenize", c), !c.grammar)
            throw new Error('The language "' + c.language + '" has no grammar.');
          return c.tokens = n.tokenize(c.code, c.grammar), n.hooks.run("after-tokenize", c), $.stringify(n.util.encode(c.tokens), c.language);
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
          return E(p, p.head, a), j(a, p, t, p.head, 0), C(p);
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
            var o = n.hooks.all;
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
            var o = n.hooks.all[a];
            if (!(!o || !o.length))
              for (var c = 0, p; p = o[c++]; )
                p(t);
          }
        },
        Token: $
      };
      g.Prism = n;
      function $(a, t, o, c) {
        this.type = a, this.content = t, this.alias = o, this.length = (c || "").length | 0;
      }
      $.stringify = function a(t, o) {
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
        d && (Array.isArray(d) ? Array.prototype.push.apply(p.classes, d) : p.classes.push(d)), n.hooks.run("wrap", p);
        var l = "";
        for (var s in p.attributes)
          l += " " + s + '="' + (p.attributes[s] || "").replace(/"/g, "&quot;") + '"';
        return "<" + p.tag + ' class="' + p.classes.join(" ") + '"' + l + ">" + p.content + "</" + p.tag + ">";
      };
      function x(a, t, o, c) {
        a.lastIndex = t;
        var p = a.exec(o);
        if (p && c && p[1]) {
          var d = p[1].length;
          p.index += d, p[0] = p[0].slice(d);
        }
        return p;
      }
      function j(a, t, o, c, p, d) {
        for (var l in o)
          if (!(!o.hasOwnProperty(l) || !o[l])) {
            var s = o[l];
            s = Array.isArray(s) ? s : [s];
            for (var m = 0; m < s.length; ++m) {
              if (d && d.cause == l + "," + m)
                return;
              var _ = s[m], M = _.inside, Y = !!_.lookbehind, I = !!_.greedy, ie = _.alias;
              if (I && !_.pattern.global) {
                var K = _.pattern.toString().match(/[imsuy]*$/)[0];
                _.pattern = RegExp(_.pattern.source, K + "g");
              }
              for (var Q = _.pattern || _, P = c.next, F = p; P !== t.tail && !(d && F >= d.reach); F += P.value.length, P = P.next) {
                var U = P.value;
                if (t.length > a.length)
                  return;
                if (!(U instanceof $)) {
                  var ee = 1, L;
                  if (I) {
                    if (L = x(Q, F, a, Y), !L || L.index >= a.length)
                      break;
                    var te = L.index, ye = L.index + L[0].length, R = F;
                    for (R += P.value.length; te >= R; )
                      P = P.next, R += P.value.length;
                    if (R -= P.value.length, F = R, P.value instanceof $)
                      continue;
                    for (var Z = P; Z !== t.tail && (R < ye || typeof Z.value == "string"); Z = Z.next)
                      ee++, R += Z.value.length;
                    ee--, U = a.slice(F, R), L.index -= F;
                  } else if (L = x(Q, 0, U, Y), !L)
                    continue;
                  var te = L.index, ae = L[0], oe = U.slice(0, te), fe = U.slice(te + ae.length), le = F + U.length;
                  d && le > d.reach && (d.reach = le);
                  var ne = P.prev;
                  oe && (ne = E(t, ne, oe), F += oe.length), S(t, ne, ee);
                  var $e = new $(l, M ? n.tokenize(ae, M) : ae, ie, ae);
                  if (P = E(t, ne, $e), fe && E(t, P, fe), ee > 1) {
                    var ue = {
                      cause: l + "," + m,
                      reach: le
                    };
                    j(a, t, o, P.prev, F, ue), d && ue.reach > d.reach && (d.reach = ue.reach);
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
      function S(a, t, o) {
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
        return g.addEventListener && (n.disableWorkerMessageHandler || g.addEventListener("message", function(a) {
          var t = JSON.parse(a.data), o = t.language, c = t.code, p = t.immediateClose;
          g.postMessage(n.highlight(c, n.languages[o], o)), p && g.close();
        }, !1)), n;
      var A = n.util.currentScript();
      A && (n.filename = A.src, A.hasAttribute("data-manual") && (n.manual = !0));
      function b() {
        n.manual || n.highlightAll();
      }
      if (!n.manual) {
        var k = document.readyState;
        k === "loading" || k === "interactive" && A && A.defer ? document.addEventListener("DOMContentLoaded", b) : window.requestAnimationFrame ? window.requestAnimationFrame(b) : window.setTimeout(b, 16);
      }
      return n;
    })(r);
    i.exports && (i.exports = e), typeof ve < "u" && (ve.Prism = e), e.languages.markup = {
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
        var y = {};
        y["language-" + f] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: e.languages[f]
        }, y.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var n = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: y
          }
        };
        n["language-" + f] = {
          pattern: /[\s\S]+/,
          inside: e.languages[f]
        };
        var $ = {};
        $[u] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return u;
          }), "i"),
          lookbehind: !0,
          greedy: !0,
          inside: n
        }, e.languages.insertBefore("markup", "cdata", $);
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
      }, f = "✖ Error: File does not exist or is empty", y = {
        js: "javascript",
        py: "python",
        rb: "ruby",
        ps1: "powershell",
        psm1: "powershell",
        sh: "bash",
        bat: "batch",
        h: "c",
        tex: "latex"
      }, n = "data-src-status", $ = "loading", x = "loaded", j = "failed", O = "pre[data-src]:not([" + n + '="' + x + '"]):not([' + n + '="' + $ + '"])';
      function E(A, b, k) {
        var a = new XMLHttpRequest();
        a.open("GET", A, !0), a.onreadystatechange = function() {
          a.readyState == 4 && (a.status < 400 && a.responseText ? b(a.responseText) : a.status >= 400 ? k(u(a.status, a.statusText)) : k(f));
        }, a.send(null);
      }
      function S(A) {
        var b = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(A || "");
        if (b) {
          var k = Number(b[1]), a = b[2], t = b[3];
          return a ? t ? [k, Number(t)] : [k, void 0] : [k, k];
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
          A.code = "", b.setAttribute(n, $);
          var k = b.appendChild(document.createElement("CODE"));
          k.textContent = g;
          var a = b.getAttribute("data-src"), t = A.language;
          if (t === "none") {
            var o = (/\.(\w+)$/.exec(a) || [, "none"])[1];
            t = y[o] || o;
          }
          e.util.setLanguage(k, t), e.util.setLanguage(b, t);
          var c = e.plugins.autoloader;
          c && c.loadLanguages(t), E(
            a,
            function(p) {
              b.setAttribute(n, x);
              var d = S(b.getAttribute("data-range"));
              if (d) {
                var l = p.split(/\r\n?|\n/g), s = d[0], m = d[1] == null ? l.length : d[1];
                s < 0 && (s += l.length), s = Math.max(0, Math.min(s - 1, l.length)), m < 0 && (m += l.length), m = Math.max(0, Math.min(m, l.length)), p = l.slice(s, m).join(`
`), b.hasAttribute("data-start") || b.setAttribute("data-start", String(s + 1));
              }
              k.textContent = p, e.highlightElement(k);
            },
            function(p) {
              b.setAttribute(n, j), k.textContent = p;
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
          for (var k = (b || document).querySelectorAll(O), a = 0, t; t = k[a++]; )
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
var Ue = ze();
const Re = /* @__PURE__ */ Je(Ue);
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
const qe = { class: "syntax-highlighted-textarea" }, Be = { class: "syntax-highlighted-code" }, We = { class: "language-json" }, Ge = ["placeholder", "rows", "disabled", "readonly"], He = /* @__PURE__ */ se({
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
  setup(i, { emit: r }) {
    const e = i, g = r, u = N(e.modelValue), f = B(() => {
      try {
        const n = JSON.parse(u.value || "{}");
        return JSON.stringify(n, null, 2);
      } catch {
        return u.value || "";
      }
    });
    G(() => e.modelValue, (n) => {
      u.value = n;
    }), G(u, (n) => {
      g("update:modelValue", n);
    });
    const y = (n) => {
      const $ = n.target, x = $.parentElement?.querySelector(".syntax-highlighted-code");
      x && (x.scrollTop = $.scrollTop, x.scrollLeft = $.scrollLeft);
    };
    return G(f, () => {
      be(() => {
        Re.highlightAll();
      });
    }, { immediate: !0 }), (n, $) => (V(), q("div", qe, [
      T("pre", Be, [
        T("code", We, z(f.value), 1)
      ]),
      we(T("textarea", {
        "onUpdate:modelValue": $[0] || ($[0] = (x) => u.value = x),
        class: ge([i.textareaClass, "syntax-textarea"]),
        placeholder: i.placeholder,
        rows: i.rows,
        disabled: i.disabled,
        readonly: i.readonly,
        onScroll: y,
        spellcheck: "false"
      }, null, 42, Ge), [
        [_e, u.value]
      ])
    ]));
  }
}), de = (i, r) => {
  const e = i.__vccOpts || i;
  for (const [g, u] of r)
    e[g] = u;
  return e;
}, he = /* @__PURE__ */ de(He, [["__scopeId", "data-v-f6255231"]]), Ie = { class: "stage-number" }, Ze = { class: "preview-box" }, Xe = { class: "preview-box-content" }, Ye = /* @__PURE__ */ se({
  __name: "VStageCard",
  props: {
    stage: {},
    index: {},
    totalStages: {}
  },
  emits: ["update", "delete", "move-up", "move-down"],
  setup(i, { emit: r }) {
    const e = i, g = r, u = N(""), f = N(""), y = N([]), n = [
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
    ], $ = B(() => y.value.length > 0), x = B(() => {
      try {
        return JSON.parse(f.value);
      } catch {
        return null;
      }
    }), j = (E) => {
      try {
        const S = JSON.parse(f.value), C = { [E]: S[Object.keys(S)[0]] || {} };
        f.value = JSON.stringify(C, null, 2), O();
      } catch {
        const S = { [E]: {} };
        f.value = JSON.stringify(S, null, 2), O();
      }
    }, O = () => {
      try {
        const E = JSON.parse(f.value);
        g("update", e.index, E);
      } catch {
        y.value = ["Invalid JSON syntax"];
      }
    };
    return G(() => e.stage, (E) => {
      u.value = Object.keys(E)[0] || "", f.value = JSON.stringify(E, null, 2), y.value = [];
    }, { immediate: !0 }), G(f, () => {
      y.value = [], O();
    }), (E, S) => {
      const C = w("v-col"), A = w("v-chip"), b = w("v-select"), k = w("v-btn"), a = w("v-btn-group"), t = w("v-row"), o = w("v-expansion-panel-title"), c = w("v-alert"), p = w("v-expansion-panel-text"), d = w("v-expansion-panel");
      return V(), D(d, null, {
        default: h(() => [
          v(o, null, {
            default: h(() => [
              v(t, { align: "center" }, {
                default: h(() => [
                  v(C, { cols: "auto" }, {
                    default: h(() => [
                      T("span", Ie, "Stage " + z(i.index + 1), 1)
                    ]),
                    _: 1
                  }),
                  v(C, { cols: "auto" }, {
                    default: h(() => [
                      v(A, {
                        size: "small",
                        color: "primary",
                        variant: "outlined"
                      }, {
                        default: h(() => [
                          J(z(u.value || "Select Type"), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  v(C, null, {
                    default: h(() => [
                      v(b, {
                        modelValue: u.value,
                        "onUpdate:modelValue": [
                          S[0] || (S[0] = (l) => u.value = l),
                          j
                        ],
                        items: n,
                        label: "Stage Type",
                        density: "compact",
                        "hide-details": ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  v(C, { cols: "auto" }, {
                    default: h(() => [
                      v(a, null, {
                        default: h(() => [
                          i.index > 0 ? (V(), D(k, {
                            key: 0,
                            icon: "mdi-arrow-up",
                            size: "small",
                            variant: "text",
                            onClick: S[1] || (S[1] = ce((l) => E.$emit("move-up", i.index), ["stop"]))
                          })) : H("", !0),
                          i.index < i.totalStages - 1 ? (V(), D(k, {
                            key: 1,
                            icon: "mdi-arrow-down",
                            size: "small",
                            variant: "text",
                            onClick: S[2] || (S[2] = ce((l) => E.$emit("move-down", i.index), ["stop"]))
                          })) : H("", !0),
                          v(k, {
                            icon: "mdi-delete-outline",
                            size: "small",
                            color: "error",
                            variant: "text",
                            onClick: S[3] || (S[3] = ce((l) => E.$emit("delete", i.index), ["stop"]))
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
            default: h(() => [
              $.value ? (V(!0), q(W, { key: 0 }, re(y.value, (l) => (V(), D(c, {
                key: l,
                type: "error",
                density: "compact",
                class: "mb-1"
              }, {
                default: h(() => [
                  J(z(l), 1)
                ]),
                _: 2
              }, 1024))), 128)) : H("", !0),
              v(t, null, {
                default: h(() => [
                  v(C, {
                    cols: "12",
                    md: "8"
                  }, {
                    default: h(() => [
                      v(he, {
                        modelValue: f.value,
                        "onUpdate:modelValue": S[4] || (S[4] = (l) => f.value = l),
                        class: ge({ "text-error": $.value }),
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
                    default: h(() => [
                      T("div", Ze, [
                        S[5] || (S[5] = T("div", { class: "preview-box-label" }, " Preview ", -1)),
                        T("div", Xe, [
                          T("pre", null, z(JSON.stringify(x.value, null, 2)), 1)
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
}), Ke = /* @__PURE__ */ de(Ye, [["__scopeId", "data-v-d84dc298"]]), Qe = /* @__PURE__ */ se({
  __name: "VOutputPanel",
  props: {
    pipeline: {}
  },
  emits: ["export"],
  setup(i, { emit: r }) {
    const e = i, g = N("json"), u = B(() => JSON.stringify(e.pipeline, null, 2)), f = B(() => `db.collection.aggregate(${JSON.stringify(e.pipeline, null, 2)})`);
    return (y, n) => {
      const $ = w("v-spacer"), x = w("v-btn"), j = w("v-card-title"), O = w("v-tab"), E = w("v-tabs"), S = w("v-window-item"), C = w("v-window"), A = w("v-card-text"), b = w("v-card"), k = w("v-col"), a = w("v-row");
      return V(), D(a, null, {
        default: h(() => [
          v(k, null, {
            default: h(() => [
              v(b, null, {
                default: h(() => [
                  v(j, { class: "d-flex align-center" }, {
                    default: h(() => [
                      n[4] || (n[4] = T("span", null, "Output", -1)),
                      v($),
                      v(x, {
                        onClick: n[0] || (n[0] = (t) => y.$emit("export")),
                        size: "small"
                      }, {
                        default: h(() => [...n[3] || (n[3] = [
                          J(" Export ", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  v(A, null, {
                    default: h(() => [
                      v(E, {
                        modelValue: g.value,
                        "onUpdate:modelValue": n[1] || (n[1] = (t) => g.value = t),
                        color: "primary"
                      }, {
                        default: h(() => [
                          v(O, { value: "json" }, {
                            default: h(() => [...n[5] || (n[5] = [
                              J("JSON", -1)
                            ])]),
                            _: 1
                          }),
                          v(O, { value: "query" }, {
                            default: h(() => [...n[6] || (n[6] = [
                              J("Query", -1)
                            ])]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"]),
                      v(C, {
                        modelValue: g.value,
                        "onUpdate:modelValue": n[2] || (n[2] = (t) => g.value = t),
                        class: "mt-4"
                      }, {
                        default: h(() => [
                          v(S, { value: "json" }, {
                            default: h(() => [
                              T("pre", null, z(u.value), 1)
                            ]),
                            _: 1
                          }),
                          v(S, { value: "query" }, {
                            default: h(() => [
                              T("pre", null, z(f.value), 1)
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
}), et = /* @__PURE__ */ de(Qe, [["__scopeId", "data-v-b28ddba9"]]), tt = {
  key: 0,
  class: "validation-errors mt-2"
}, at = { class: "d-flex align-center mb-2" }, rt = /* @__PURE__ */ se({
  __name: "VMongoAggregationBuilder",
  props: {
    initialPipeline: { default: () => [] }
  },
  emits: ["pipelineChange", "exportPipeline"],
  setup(i, { emit: r }) {
    const e = i, g = r, u = N(e.initialPipeline || []), f = N("stages"), y = N(""), n = N([]), $ = B(() => n.value.length > 0), x = N(e.initialPipeline ? e.initialPipeline.map((l, s) => s) : []), j = N(JSON.stringify(e.initialPipeline || [], null, 2)), O = B(() => JSON.stringify(u.value, null, 2));
    G(u, () => {
      f.value === "text" && (j.value = O.value);
    }, { deep: !0 });
    const E = [
      { title: "Stages View", value: "stages" },
      { title: "Text View", value: "text" }
    ], S = () => {
      g("exportPipeline", u.value);
    }, C = () => {
      g("pipelineChange", u.value);
    }, A = () => {
      u.value.length, u.value.push({ $match: { status: "active" } }), C();
    }, b = () => {
      x.value = u.value.map((l, s) => s);
    }, k = () => {
      x.value = [];
    }, a = (l) => {
      u.value.splice(l, 1), x.value = x.value.filter((s) => s !== l).map((s) => s > l ? s - 1 : s), d(O.value), C();
    }, t = (l, s) => {
      u.value[l] = s, d(O.value), C();
    }, o = (l) => {
      if (l > 0) {
        [u.value[l - 1], u.value[l]] = [u.value[l], u.value[l - 1]];
        const s = [...x.value], m = s.indexOf(l), _ = s.indexOf(l - 1);
        m !== -1 && (s[m] = l - 1), _ !== -1 && (s[_] = l), x.value = s, d(O.value), C();
      }
    }, c = (l) => {
      if (l < u.value.length - 1) {
        [u.value[l], u.value[l + 1]] = [u.value[l + 1], u.value[l]];
        const s = [...x.value], m = s.indexOf(l), _ = s.indexOf(l + 1);
        m !== -1 && (s[m] = l + 1), _ !== -1 && (s[_] = l), x.value = s, d(O.value), C();
      }
    }, p = () => {
      d(j.value);
    }, d = (l) => {
      if (n.value = [], !!l.trim())
        try {
          const s = JSON.parse(l);
          if (!Array.isArray(s)) {
            n.value.push("Aggregation pipeline must be an array of stage objects");
            return;
          }
          const m = xe(l);
          m.isValid || (n.value = m.errors.map((_) => _.message)), m.warnings.length > 0 && m.warnings.forEach((_) => {
            n.value.push(`Warning: ${_.message}`);
          });
        } catch {
          n.value = ["Invalid JSON syntax"];
        }
    };
    return (l, s) => {
      const m = w("v-btn"), _ = w("v-btn-toggle"), M = w("v-spacer"), Y = w("v-toolbar"), I = w("v-alert"), ie = w("v-expansion-panels"), K = w("v-col"), Q = w("v-row"), P = w("v-sheet");
      return V(), D(P, null, {
        default: h(() => [
          v(Q, null, {
            default: h(() => [
              v(K, {
                cols: "12",
                md: "8"
              }, {
                default: h(() => [
                  X(l.$slots, "toolbar", {
                    stages: u.value,
                    viewMode: f.value,
                    addStage: A,
                    expandAllStages: b,
                    collapseAllStages: k,
                    exportPipeline: S,
                    viewModeOptions: E
                  }, () => [
                    v(Y, null, {
                      default: h(() => [
                        X(l.$slots, "toolbar-prepend"),
                        v(m, {
                          onClick: A,
                          class: "mx-3"
                        }, {
                          default: h(() => [...s[3] || (s[3] = [
                            J(" Add Stage ", -1)
                          ])]),
                          _: 1
                        }),
                        v(_, {
                          modelValue: f.value,
                          "onUpdate:modelValue": s[0] || (s[0] = (F) => f.value = F),
                          label: "View Mode"
                        }, {
                          default: h(() => [
                            (V(), q(W, null, re(E, (F) => v(m, {
                              key: F.value,
                              value: F.value
                            }, {
                              default: h(() => [
                                J(z(F.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"])), 64))
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        v(M),
                        f.value === "stages" ? (V(), q(W, { key: 0 }, [
                          v(m, {
                            onClick: b,
                            icon: "mdi-chevron-down"
                          }),
                          v(m, {
                            onClick: k,
                            icon: "mdi-chevron-up"
                          })
                        ], 64)) : H("", !0),
                        X(l.$slots, "toolbar-append")
                      ]),
                      _: 3
                    })
                  ]),
                  X(l.$slots, "validation", {
                    errors: n.value,
                    hasErrors: $.value,
                    error: y.value
                  }, () => [
                    $.value ? (V(), q("div", tt, [
                      (V(!0), q(W, null, re(n.value, (F) => (V(), D(I, {
                        key: F,
                        type: "error",
                        density: "compact",
                        class: "mb-1"
                      }, {
                        default: h(() => [
                          J(z(F), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ])) : H("", !0),
                    y.value ? (V(), D(I, {
                      key: 1,
                      type: "error",
                      class: "mt-4"
                    }, {
                      default: h(() => [
                        s[4] || (s[4] = T("strong", null, "Error:", -1)),
                        J(" " + z(y.value), 1)
                      ]),
                      _: 1
                    })) : H("", !0)
                  ]),
                  f.value === "stages" ? (V(), D(ie, {
                    key: 0,
                    modelValue: x.value,
                    "onUpdate:modelValue": s[1] || (s[1] = (F) => x.value = F),
                    multiple: ""
                  }, {
                    default: h(() => [
                      (V(!0), q(W, null, re(u.value, (F, U) => (V(), D(Ke, {
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
                  }, 8, ["modelValue"])) : (V(), q(W, { key: 1 }, [
                    T("div", at, [
                      v(M),
                      v(m, {
                        size: "small",
                        onClick: p,
                        color: "primary",
                        variant: "outlined"
                      }, {
                        default: h(() => [...s[5] || (s[5] = [
                          J(" Validate ", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    v(he, {
                      modelValue: j.value,
                      "onUpdate:modelValue": s[2] || (s[2] = (F) => j.value = F),
                      class: ge({ "text-error": $.value }),
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
                default: h(() => [
                  v(et, {
                    pipeline: u.value,
                    onExport: S
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
  rt as VMongoAggregationBuilder
};
