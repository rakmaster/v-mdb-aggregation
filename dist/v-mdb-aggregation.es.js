import { defineComponent as q, ref as V, computed as J, watch as R, resolveComponent as c, createBlock as C, openBlock as g, withCtx as d, createVNode as l, createElementVNode as _, toDisplayString as O, createTextVNode as S, createCommentVNode as P, createElementBlock as h, normalizeClass as x, Fragment as T, renderList as W } from "vue";
const G = /* @__PURE__ */ new Set([
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
]), K = /* @__PURE__ */ new Set([
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
function Q(t) {
  const e = {
    isValid: !0,
    errors: [],
    warnings: []
  };
  let o;
  try {
    o = JSON.parse(t);
  } catch (a) {
    return e.isValid = !1, e.errors.push({
      type: "json",
      message: `Invalid JSON: ${a instanceof Error ? a.message : "Unknown parsing error"}`,
      position: {
        line: ie(t, a),
        column: re(t, a)
      }
    }), e;
  }
  return Array.isArray(o) ? (o.forEach((a, s) => {
    H(a, s, e);
  }), ne(o, e), e) : (e.isValid = !1, e.errors.push({
    type: "structure",
    message: "Aggregation pipeline must be an array of stage objects"
  }), e);
}
function H(t, e, o) {
  if (typeof t != "object" || t === null || Array.isArray(t)) {
    o.isValid = !1, o.errors.push({
      type: "structure",
      message: `Stage ${e + 1} must be an object`,
      position: { stageIndex: e }
    });
    return;
  }
  const a = Object.keys(t);
  a.length !== 1 && (o.isValid = !1, o.errors.push({
    type: "structure",
    message: `Stage ${e + 1} must have exactly one key (stage name)`,
    position: { stageIndex: e }
  }));
  const s = a[0];
  if (!s || !s.startsWith("$")) {
    o.isValid = !1, o.errors.push({
      type: "stage",
      message: `Stage ${e + 1}: Stage name "${s || "undefined"}" must start with $`,
      position: { stageIndex: e }
    });
    return;
  }
  K.has(s) || o.warnings.push({
    type: "compatibility",
    message: `Stage ${e + 1}: Unrecognized stage "${s}" - may not be supported in all MongoDB versions`,
    position: { stageIndex: e }
  });
  const n = t[s];
  X(s, n, e, o);
}
function X(t, e, o, a) {
  switch (t) {
    case "$match":
      Y(e, o, a);
      break;
    case "$group":
      Z(e, o, a);
      break;
    case "$project":
    case "$addFields":
    case "$set":
      I(e, o, a);
      break;
    case "$sort":
      ee(e, o, a);
      break;
    case "$limit":
    case "$skip":
      te(e, o, a);
      break;
    case "$unwind":
      oe(e, o, a);
      break;
    case "$lookup":
      se(e, o, a);
      break;
    // Add more stage-specific validations as needed
    default:
      ae(e, o, a);
  }
}
function Y(t, e, o) {
  (typeof t != "object" || t === null) && o.errors.push({
    type: "structure",
    message: `Stage ${e + 1} ($match): Must be an object with query conditions`,
    position: { stageIndex: e }
  });
}
function Z(t, e, o) {
  if (typeof t != "object" || t === null) {
    o.errors.push({
      type: "structure",
      message: `Stage ${e + 1} ($group): Must be an object with _id and accumulator fields`,
      position: { stageIndex: e }
    });
    return;
  }
  t.hasOwnProperty("_id") || o.errors.push({
    type: "structure",
    message: `Stage ${e + 1} ($group): Missing required _id field`,
    position: { stageIndex: e }
  }), Object.entries(t).forEach(([a, s]) => {
    if (a !== "_id" && typeof s == "object" && s !== null) {
      const n = Object.keys(s);
      if (n.length > 0) {
        const i = n[0];
        i && i.startsWith("$") && !G.has(i) && o.warnings.push({
          type: "compatibility",
          message: `Stage ${e + 1} ($group): Unrecognized accumulator operator "${i}"`,
          position: { stageIndex: e }
        });
      }
    }
  });
}
function I(t, e, o) {
  (typeof t != "object" || t === null) && o.errors.push({
    type: "structure",
    message: `Stage ${e + 1}: Projection stage must be an object mapping field names to expressions`,
    position: { stageIndex: e }
  });
}
function ee(t, e, o) {
  if (typeof t != "object" || t === null) {
    o.errors.push({
      type: "structure",
      message: `Stage ${e + 1} ($sort): Must be an object mapping field names to sort directions (1 or -1)`,
      position: { stageIndex: e }
    });
    return;
  }
  Object.entries(t).forEach(([a, s]) => {
    s !== 1 && s !== -1 && o.errors.push({
      type: "structure",
      message: `Stage ${e + 1} ($sort): Field "${a}" must have sort direction 1 (ascending) or -1 (descending), got ${s}`,
      position: { stageIndex: e }
    });
  });
}
function te(t, e, o) {
  (typeof t != "number" || t < 0 || !Number.isInteger(t)) && o.errors.push({
    type: "structure",
    message: `Stage ${e + 1}: Must be a non-negative integer`,
    position: { stageIndex: e }
  });
}
function oe(t, e, o) {
  typeof t == "string" ? t.startsWith("$") || o.warnings.push({
    type: "best-practice",
    message: `Stage ${e + 1} ($unwind): Field path should start with $`,
    position: { stageIndex: e }
  }) : typeof t == "object" && t !== null ? t.path || o.errors.push({
    type: "structure",
    message: `Stage ${e + 1} ($unwind): Missing required "path" field`,
    position: { stageIndex: e }
  }) : o.errors.push({
    type: "structure",
    message: `Stage ${e + 1} ($unwind): Must be a string field path or object with path property`,
    position: { stageIndex: e }
  });
}
function se(t, e, o) {
  if (typeof t != "object" || t === null) {
    o.errors.push({
      type: "structure",
      message: `Stage ${e + 1} ($lookup): Must be an object with lookup configuration`,
      position: { stageIndex: e }
    });
    return;
  }
  t.from || o.errors.push({
    type: "structure",
    message: `Stage ${e + 1} ($lookup): Missing required "from" field`,
    position: { stageIndex: e }
  }), t.as || o.errors.push({
    type: "structure",
    message: `Stage ${e + 1} ($lookup): Missing required "as" field`,
    position: { stageIndex: e }
  });
}
function ae(t, e, o) {
  t == null && o.errors.push({
    type: "structure",
    message: `Stage ${e + 1}: Stage value cannot be null or undefined`,
    position: { stageIndex: e }
  });
}
function ne(t, e) {
  const o = t.findIndex((n) => "$match" in n);
  o > 0 && e.warnings.push({
    type: "performance",
    message: "Consider moving $match stage earlier in pipeline for better performance",
    position: { stageIndex: o }
  }), t.filter((n) => "$sort" in n).length > 1 && e.warnings.push({
    type: "performance",
    message: "Multiple $sort stages detected - consider combining them",
    position: {}
  }), t.map((n, i) => ({ stage: n, index: i })).filter((n) => "$limit" in n.stage).forEach(({ stage: n, index: i }) => {
    let v = !1;
    for (let $ = 0; $ < i; $++)
      if ("$sort" in t[$]) {
        v = !0;
        break;
      }
    v || e.warnings.push({
      type: "best-practice",
      message: "$limit without preceding $sort may return unpredictable results",
      position: { stageIndex: i }
    });
  });
}
function ie(t, e) {
  if (e instanceof SyntaxError && "message" in e) {
    const o = e.message.match(/at position (\d+)/);
    if (o && o[1]) {
      const a = parseInt(o[1]);
      return t.substring(0, a).split(`
`).length;
    }
  }
}
function re(t, e) {
  if (e instanceof SyntaxError && "message" in e) {
    const o = e.message.match(/at position (\d+)/);
    if (o && o[1]) {
      const a = parseInt(o[1]), s = t.substring(0, a).split(`
`), n = s[s.length - 1];
      return n ? n.length : void 0;
    }
  }
}
const le = { class: "stage-info" }, ue = { class: "stage-number" }, ce = { class: "stage-actions" }, pe = {
  key: 0,
  class: "validation-errors mt-2"
}, de = {
  key: 1,
  class: "stage-preview mt-4"
}, me = /* @__PURE__ */ q({
  __name: "VStageCard",
  props: {
    stage: {},
    index: {},
    totalStages: {}
  },
  emits: ["update", "delete", "move-up", "move-down"],
  setup(t, { emit: e }) {
    const o = t, a = e, s = V(""), n = V(""), i = V([]), v = [
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
    ], $ = J(() => i.value.length > 0), j = J(() => {
      try {
        return JSON.parse(n.value);
      } catch {
        return null;
      }
    }), b = (m) => Object.keys(m)[0] || "Unknown", M = (m) => {
      try {
        const u = JSON.parse(n.value), A = { [m]: u[Object.keys(u)[0]] || {} };
        n.value = JSON.stringify(A, null, 2), N();
      } catch {
        const u = { [m]: {} };
        n.value = JSON.stringify(u, null, 2), N();
      }
    }, E = () => {
      i.value = [], N();
    }, N = () => {
      try {
        const m = JSON.parse(n.value);
        a("update", o.index, m);
      } catch {
        i.value = ["Invalid JSON syntax"];
      }
    };
    return R(() => o.stage, (m) => {
      s.value = Object.keys(m)[0] || "", n.value = JSON.stringify(m, null, 2), i.value = [];
    }, { immediate: !0 }), (m, u) => {
      const A = c("v-chip"), w = c("v-spacer"), U = c("v-btn"), k = c("v-card-title"), r = c("v-select"), p = c("v-textarea"), D = c("v-alert"), F = c("v-divider"), L = c("v-code"), B = c("v-card-text"), y = c("v-card");
      return g(), C(y, {
        class: "stage-card",
        elevation: "2"
      }, {
        default: d(() => [
          l(k, { class: "stage-header" }, {
            default: d(() => [
              _("div", le, [
                _("span", ue, "Stage " + O(t.index + 1), 1),
                l(A, {
                  size: "small",
                  color: "primary",
                  variant: "outlined"
                }, {
                  default: d(() => [
                    S(O(b(t.stage)), 1)
                  ]),
                  _: 1
                })
              ]),
              l(w),
              _("div", ce, [
                t.index > 0 ? (g(), C(U, {
                  key: 0,
                  icon: "mdi-arrow-up",
                  size: "small",
                  variant: "text",
                  onClick: u[0] || (u[0] = (f) => m.$emit("move-up", t.index))
                })) : P("", !0),
                t.index < t.totalStages - 1 ? (g(), C(U, {
                  key: 1,
                  icon: "mdi-arrow-down",
                  size: "small",
                  variant: "text",
                  onClick: u[1] || (u[1] = (f) => m.$emit("move-down", t.index))
                })) : P("", !0),
                l(U, {
                  icon: "mdi-delete",
                  size: "small",
                  color: "error",
                  variant: "text",
                  onClick: u[2] || (u[2] = (f) => m.$emit("delete", t.index))
                })
              ])
            ]),
            _: 1
          }),
          l(B, null, {
            default: d(() => [
              l(r, {
                modelValue: s.value,
                "onUpdate:modelValue": [
                  u[3] || (u[3] = (f) => s.value = f),
                  M
                ],
                items: v,
                label: "Stage Type",
                density: "compact"
              }, null, 8, ["modelValue"]),
              l(p, {
                modelValue: n.value,
                "onUpdate:modelValue": [
                  u[4] || (u[4] = (f) => n.value = f),
                  E
                ],
                class: x({ "v-text-field--error": $.value }),
                label: "Stage Configuration (JSON)",
                placeholder: '{"$match": {"status": "active"}}',
                rows: "8",
                "auto-grow": ""
              }, null, 8, ["modelValue", "class"]),
              $.value ? (g(), h("div", pe, [
                (g(!0), h(T, null, W(i.value, (f) => (g(), C(D, {
                  key: f,
                  type: "error",
                  density: "compact",
                  class: "mb-1"
                }, {
                  default: d(() => [
                    S(O(f), 1)
                  ]),
                  _: 2
                }, 1024))), 128))
              ])) : P("", !0),
              j.value && Object.keys(j.value).length > 0 ? (g(), h("div", de, [
                l(F, { class: "mb-3" }),
                u[5] || (u[5] = _("h4", { class: "text-h6 mb-2" }, "Preview", -1)),
                l(L, null, {
                  default: d(() => [
                    _("pre", null, O(JSON.stringify(j.value, null, 2)), 1)
                  ]),
                  _: 1
                })
              ])) : P("", !0)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
}), z = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [a, s] of e)
    o[a] = s;
  return o;
}, ge = /* @__PURE__ */ z(me, [["__scopeId", "data-v-9be1934d"]]), ve = { class: "v-output-panel" }, $e = /* @__PURE__ */ q({
  __name: "VOutputPanel",
  props: {
    pipeline: {}
  },
  setup(t) {
    const e = t, o = V("json"), a = J(() => JSON.stringify(e.pipeline, null, 2)), s = J(() => `db.collection.aggregate(${JSON.stringify(e.pipeline, null, 2)})`);
    return (n, i) => {
      const v = c("v-card-title"), $ = c("v-tab"), j = c("v-tabs"), b = c("v-code"), M = c("v-window-item"), E = c("v-window"), N = c("v-card-text"), m = c("v-card");
      return g(), h("div", ve, [
        l(m, {
          elevation: "1",
          class: "mt-6"
        }, {
          default: d(() => [
            l(v, null, {
              default: d(() => [...i[2] || (i[2] = [
                S("Output", -1)
              ])]),
              _: 1
            }),
            l(N, null, {
              default: d(() => [
                l(j, {
                  modelValue: o.value,
                  "onUpdate:modelValue": i[0] || (i[0] = (u) => o.value = u),
                  color: "primary"
                }, {
                  default: d(() => [
                    l($, { value: "json" }, {
                      default: d(() => [...i[3] || (i[3] = [
                        S("JSON Pipeline", -1)
                      ])]),
                      _: 1
                    }),
                    l($, { value: "query" }, {
                      default: d(() => [...i[4] || (i[4] = [
                        S("MongoDB Query", -1)
                      ])]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                l(E, {
                  modelValue: o.value,
                  "onUpdate:modelValue": i[1] || (i[1] = (u) => o.value = u),
                  class: "mt-4"
                }, {
                  default: d(() => [
                    l(M, { value: "json" }, {
                      default: d(() => [
                        l(b, null, {
                          default: d(() => [
                            _("pre", null, O(a.value), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    l(M, { value: "query" }, {
                      default: d(() => [
                        l(b, null, {
                          default: d(() => [
                            _("pre", null, O(s.value), 1)
                          ]),
                          _: 1
                        })
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
      ]);
    };
  }
}), fe = /* @__PURE__ */ z($e, [["__scopeId", "data-v-5d0e1608"]]), ye = { class: "v-mongo-aggregation-builder" }, he = { class: "toolbar mb-4" }, _e = {
  key: 0,
  class: "stages-view"
}, Se = { class: "stage-list" }, be = {
  key: 1,
  class: "text-view"
}, we = {
  key: 0,
  class: "validation-errors mt-2"
}, ke = /* @__PURE__ */ q({
  __name: "VMongoAggregationBuilder",
  props: {
    initialPipeline: { default: () => [] }
  },
  emits: ["pipelineChange", "exportPipeline"],
  setup(t, { emit: e }) {
    const o = t, a = e, s = V(o.initialPipeline || []), n = V("stages"), i = V(""), v = V([]), $ = J(() => v.value.length > 0), j = [
      { title: "Stages View", value: "stages" },
      { title: "Text View", value: "text" }
    ], b = J({
      get: () => JSON.stringify(s.value, null, 2),
      set: (r) => {
        try {
          const p = JSON.parse(r);
          Array.isArray(p) && (s.value = p, w());
        } catch {
          v.value = ["Invalid JSON syntax"];
        }
      }
    }), M = () => {
      s.value.push({ $match: { status: "active" } }), k();
    }, E = (r) => {
      s.value.splice(r, 1), w(), k();
    }, N = (r, p) => {
      s.value[r] = p, w(), k();
    }, m = (r) => {
      r > 0 && ([s.value[r - 1], s.value[r]] = [s.value[r], s.value[r - 1]], w(), k());
    }, u = (r) => {
      r < s.value.length - 1 && ([s.value[r], s.value[r + 1]] = [s.value[r + 1], s.value[r]], w(), k());
    }, A = () => {
      w(), k();
    }, w = () => {
      v.value = [];
      const r = Q(b.value);
      r.isValid || (v.value = r.errors.map((p) => p.message)), r.warnings.length > 0 && r.warnings.forEach((p) => {
        v.value.push(`Warning: ${p.message}`);
      });
    }, U = () => {
      a("exportPipeline", s.value);
    }, k = () => {
      a("pipelineChange", s.value);
    };
    return (r, p) => {
      const D = c("v-btn"), F = c("v-select"), L = c("v-textarea"), B = c("v-alert");
      return g(), h("div", ye, [
        _("div", he, [
          l(D, {
            onClick: M,
            color: "primary",
            "prepend-icon": "mdi-plus"
          }, {
            default: d(() => [...p[2] || (p[2] = [
              S(" Add Stage ", -1)
            ])]),
            _: 1
          }),
          l(D, {
            onClick: U,
            variant: "outlined",
            "prepend-icon": "mdi-download"
          }, {
            default: d(() => [...p[3] || (p[3] = [
              S(" Export Pipeline ", -1)
            ])]),
            _: 1
          }),
          l(F, {
            modelValue: n.value,
            "onUpdate:modelValue": p[0] || (p[0] = (y) => n.value = y),
            items: j,
            label: "View Mode",
            density: "compact",
            style: { "max-width": "200px" }
          }, null, 8, ["modelValue"])
        ]),
        n.value === "stages" ? (g(), h("div", _e, [
          _("div", Se, [
            (g(!0), h(T, null, W(s.value, (y, f) => (g(), C(ge, {
              key: f,
              stage: y,
              index: f,
              "total-stages": s.value.length,
              onUpdate: N,
              onDelete: E,
              onMoveUp: m,
              onMoveDown: u
            }, null, 8, ["stage", "index", "total-stages"]))), 128))
          ])
        ])) : (g(), h("div", be, [
          l(L, {
            modelValue: b.value,
            "onUpdate:modelValue": [
              p[1] || (p[1] = (y) => b.value = y),
              A
            ],
            class: x({ "text-error": $.value }),
            label: "Aggregation Pipeline JSON",
            placeholder: "Paste your aggregation pipeline JSON here...",
            rows: "15",
            "auto-grow": ""
          }, null, 8, ["modelValue", "class"]),
          $.value ? (g(), h("div", we, [
            (g(!0), h(T, null, W(v.value, (y) => (g(), C(B, {
              key: y,
              type: "error",
              density: "compact",
              class: "mb-1"
            }, {
              default: d(() => [
                S(O(y), 1)
              ]),
              _: 2
            }, 1024))), 128))
          ])) : P("", !0)
        ])),
        i.value ? (g(), C(B, {
          key: 2,
          type: "error",
          class: "mt-4"
        }, {
          default: d(() => [
            p[4] || (p[4] = _("strong", null, "Error:", -1)),
            S(" " + O(i.value), 1)
          ]),
          _: 1
        })) : P("", !0),
        l(fe, { pipeline: s.value }, null, 8, ["pipeline"])
      ]);
    };
  }
}), Oe = /* @__PURE__ */ z(ke, [["__scopeId", "data-v-681c9c9e"]]);
export {
  Oe as VMongoAggregationBuilder
};
