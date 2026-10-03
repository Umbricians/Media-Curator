import { LitElement as wb, html as yp, css as vp, property as Dr, customElement as bp, state as Gf } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as Eb } from "@umbraco-cms/backoffice/lit-element";
import { UmbElementMixin as zb } from "@umbraco-cms/backoffice/element-api";
import { UmbModalToken as Mb, umbConfirmModal as Nb, umbOpenModal as Ab } from "@umbraco-cms/backoffice/modal";
import { s as Cb, d as Tb, r as Db, a as Ob, b as xp, c as Hb, u as Rb } from "./rule-tree.logic-40nRL1No.js";
import { M as Bb } from "./ruleset-workspace.context-token-BRvnfdg2.js";
function _p(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var cf = { exports: {} }, _t = {};
var Fg;
function Ub() {
  if (Fg) return _t;
  Fg = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), u = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), g = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), v = /* @__PURE__ */ Symbol.for("react.lazy"), y = /* @__PURE__ */ Symbol.for("react.activity"), b = Symbol.iterator;
  function _(z) {
    return z === null || typeof z != "object" ? null : (z = b && z[b] || z["@@iterator"], typeof z == "function" ? z : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, A = Object.assign, N = {};
  function M(z, H, P) {
    this.props = z, this.context = H, this.refs = N, this.updater = P || w;
  }
  M.prototype.isReactComponent = {}, M.prototype.setState = function(z, H) {
    if (typeof z != "object" && typeof z != "function" && z != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, z, H, "setState");
  }, M.prototype.forceUpdate = function(z) {
    this.updater.enqueueForceUpdate(this, z, "forceUpdate");
  };
  function U() {
  }
  U.prototype = M.prototype;
  function S(z, H, P) {
    this.props = z, this.context = H, this.refs = N, this.updater = P || w;
  }
  var C = S.prototype = new U();
  C.constructor = S, A(C, M.prototype), C.isPureReactComponent = !0;
  var j = Array.isArray;
  function k() {
  }
  var B = { H: null, A: null, T: null, S: null }, $ = Object.prototype.hasOwnProperty;
  function J(z, H, P) {
    var lt = P.ref;
    return {
      $$typeof: n,
      type: z,
      key: H,
      ref: lt !== void 0 ? lt : null,
      props: P
    };
  }
  function ut(z, H) {
    return J(z.type, H, z.props);
  }
  function X(z) {
    return typeof z == "object" && z !== null && z.$$typeof === n;
  }
  function I(z) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + z.replace(/[=:]/g, function(P) {
      return H[P];
    });
  }
  var ot = /\/+/g;
  function T(z, H) {
    return typeof z == "object" && z !== null && z.key != null ? I("" + z.key) : H.toString(36);
  }
  function V(z) {
    switch (z.status) {
      case "fulfilled":
        return z.value;
      case "rejected":
        throw z.reason;
      default:
        switch (typeof z.status == "string" ? z.then(k, k) : (z.status = "pending", z.then(
          function(H) {
            z.status === "pending" && (z.status = "fulfilled", z.value = H);
          },
          function(H) {
            z.status === "pending" && (z.status = "rejected", z.reason = H);
          }
        )), z.status) {
          case "fulfilled":
            return z.value;
          case "rejected":
            throw z.reason;
        }
    }
    throw z;
  }
  function E(z, H, P, lt, rt) {
    var ft = typeof z;
    (ft === "undefined" || ft === "boolean") && (z = null);
    var ct = !1;
    if (z === null) ct = !0;
    else
      switch (ft) {
        case "bigint":
        case "string":
        case "number":
          ct = !0;
          break;
        case "object":
          switch (z.$$typeof) {
            case n:
            case i:
              ct = !0;
              break;
            case v:
              return ct = z._init, E(
                ct(z._payload),
                H,
                P,
                lt,
                rt
              );
          }
      }
    if (ct)
      return rt = rt(z), ct = lt === "" ? "." + T(z, 0) : lt, j(rt) ? (P = "", ct != null && (P = ct.replace(ot, "$&/") + "/"), E(rt, H, P, "", function(xt) {
        return xt;
      })) : rt != null && (X(rt) && (rt = ut(
        rt,
        P + (rt.key == null || z && z.key === rt.key ? "" : ("" + rt.key).replace(
          ot,
          "$&/"
        ) + "/") + ct
      )), H.push(rt)), 1;
    ct = 0;
    var tt = lt === "" ? "." : lt + ":";
    if (j(z))
      for (var st = 0; st < z.length; st++)
        lt = z[st], ft = tt + T(lt, st), ct += E(
          lt,
          H,
          P,
          ft,
          rt
        );
    else if (st = _(z), typeof st == "function")
      for (z = st.call(z), st = 0; !(lt = z.next()).done; )
        lt = lt.value, ft = tt + T(lt, st++), ct += E(
          lt,
          H,
          P,
          ft,
          rt
        );
    else if (ft === "object") {
      if (typeof z.then == "function")
        return E(
          V(z),
          H,
          P,
          lt,
          rt
        );
      throw H = String(z), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(z).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ct;
  }
  function O(z, H, P) {
    if (z == null) return z;
    var lt = [], rt = 0;
    return E(z, lt, "", "", function(ft) {
      return H.call(P, ft, rt++);
    }), lt;
  }
  function q(z) {
    if (z._status === -1) {
      var H = z._result;
      H = H(), H.then(
        function(P) {
          (z._status === 0 || z._status === -1) && (z._status = 1, z._result = P);
        },
        function(P) {
          (z._status === 0 || z._status === -1) && (z._status = 2, z._result = P);
        }
      ), z._status === -1 && (z._status = 0, z._result = H);
    }
    if (z._status === 1) return z._result.default;
    throw z._result;
  }
  var Z = typeof reportError == "function" ? reportError : function(z) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof z == "object" && z !== null && typeof z.message == "string" ? String(z.message) : String(z),
        error: z
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", z);
      return;
    }
    console.error(z);
  }, nt = {
    map: O,
    forEach: function(z, H, P) {
      O(
        z,
        function() {
          H.apply(this, arguments);
        },
        P
      );
    },
    count: function(z) {
      var H = 0;
      return O(z, function() {
        H++;
      }), H;
    },
    toArray: function(z) {
      return O(z, function(H) {
        return H;
      }) || [];
    },
    only: function(z) {
      if (!X(z))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return z;
    }
  };
  return _t.Activity = y, _t.Children = nt, _t.Component = M, _t.Fragment = o, _t.Profiler = s, _t.PureComponent = S, _t.StrictMode = u, _t.Suspense = p, _t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B, _t.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(z) {
      return B.H.useMemoCache(z);
    }
  }, _t.cache = function(z) {
    return function() {
      return z.apply(null, arguments);
    };
  }, _t.cacheSignal = function() {
    return null;
  }, _t.cloneElement = function(z, H, P) {
    if (z == null)
      throw Error(
        "The argument must be a React element, but you passed " + z + "."
      );
    var lt = A({}, z.props), rt = z.key;
    if (H != null)
      for (ft in H.key !== void 0 && (rt = "" + H.key), H)
        !$.call(H, ft) || ft === "key" || ft === "__self" || ft === "__source" || ft === "ref" && H.ref === void 0 || (lt[ft] = H[ft]);
    var ft = arguments.length - 2;
    if (ft === 1) lt.children = P;
    else if (1 < ft) {
      for (var ct = Array(ft), tt = 0; tt < ft; tt++)
        ct[tt] = arguments[tt + 2];
      lt.children = ct;
    }
    return J(z.type, rt, lt);
  }, _t.createContext = function(z) {
    return z = {
      $$typeof: d,
      _currentValue: z,
      _currentValue2: z,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, z.Provider = z, z.Consumer = {
      $$typeof: f,
      _context: z
    }, z;
  }, _t.createElement = function(z, H, P) {
    var lt, rt = {}, ft = null;
    if (H != null)
      for (lt in H.key !== void 0 && (ft = "" + H.key), H)
        $.call(H, lt) && lt !== "key" && lt !== "__self" && lt !== "__source" && (rt[lt] = H[lt]);
    var ct = arguments.length - 2;
    if (ct === 1) rt.children = P;
    else if (1 < ct) {
      for (var tt = Array(ct), st = 0; st < ct; st++)
        tt[st] = arguments[st + 2];
      rt.children = tt;
    }
    if (z && z.defaultProps)
      for (lt in ct = z.defaultProps, ct)
        rt[lt] === void 0 && (rt[lt] = ct[lt]);
    return J(z, ft, rt);
  }, _t.createRef = function() {
    return { current: null };
  }, _t.forwardRef = function(z) {
    return { $$typeof: g, render: z };
  }, _t.isValidElement = X, _t.lazy = function(z) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: z },
      _init: q
    };
  }, _t.memo = function(z, H) {
    return {
      $$typeof: h,
      type: z,
      compare: H === void 0 ? null : H
    };
  }, _t.startTransition = function(z) {
    var H = B.T, P = {};
    B.T = P;
    try {
      var lt = z(), rt = B.S;
      rt !== null && rt(P, lt), typeof lt == "object" && lt !== null && typeof lt.then == "function" && lt.then(k, Z);
    } catch (ft) {
      Z(ft);
    } finally {
      H !== null && P.types !== null && (H.types = P.types), B.T = H;
    }
  }, _t.unstable_useCacheRefresh = function() {
    return B.H.useCacheRefresh();
  }, _t.use = function(z) {
    return B.H.use(z);
  }, _t.useActionState = function(z, H, P) {
    return B.H.useActionState(z, H, P);
  }, _t.useCallback = function(z, H) {
    return B.H.useCallback(z, H);
  }, _t.useContext = function(z) {
    return B.H.useContext(z);
  }, _t.useDebugValue = function() {
  }, _t.useDeferredValue = function(z, H) {
    return B.H.useDeferredValue(z, H);
  }, _t.useEffect = function(z, H) {
    return B.H.useEffect(z, H);
  }, _t.useEffectEvent = function(z) {
    return B.H.useEffectEvent(z);
  }, _t.useId = function() {
    return B.H.useId();
  }, _t.useImperativeHandle = function(z, H, P) {
    return B.H.useImperativeHandle(z, H, P);
  }, _t.useInsertionEffect = function(z, H) {
    return B.H.useInsertionEffect(z, H);
  }, _t.useLayoutEffect = function(z, H) {
    return B.H.useLayoutEffect(z, H);
  }, _t.useMemo = function(z, H) {
    return B.H.useMemo(z, H);
  }, _t.useOptimistic = function(z, H) {
    return B.H.useOptimistic(z, H);
  }, _t.useReducer = function(z, H, P) {
    return B.H.useReducer(z, H, P);
  }, _t.useRef = function(z) {
    return B.H.useRef(z);
  }, _t.useState = function(z) {
    return B.H.useState(z);
  }, _t.useSyncExternalStore = function(z, H, P) {
    return B.H.useSyncExternalStore(
      z,
      H,
      P
    );
  }, _t.useTransition = function() {
    return B.H.useTransition();
  }, _t.version = "19.2.7", _t;
}
var Ig;
function Mo() {
  return Ig || (Ig = 1, cf.exports = Ub()), cf.exports;
}
var W = Mo();
const kb = /* @__PURE__ */ _p(W);
var sf = { exports: {} }, io = {}, ff = { exports: {} }, df = {};
var Pg;
function Yb() {
  return Pg || (Pg = 1, (function(n) {
    function i(E, O) {
      var q = E.length;
      E.push(O);
      t: for (; 0 < q; ) {
        var Z = q - 1 >>> 1, nt = E[Z];
        if (0 < s(nt, O))
          E[Z] = O, E[q] = nt, q = Z;
        else break t;
      }
    }
    function o(E) {
      return E.length === 0 ? null : E[0];
    }
    function u(E) {
      if (E.length === 0) return null;
      var O = E[0], q = E.pop();
      if (q !== O) {
        E[0] = q;
        t: for (var Z = 0, nt = E.length, z = nt >>> 1; Z < z; ) {
          var H = 2 * (Z + 1) - 1, P = E[H], lt = H + 1, rt = E[lt];
          if (0 > s(P, q))
            lt < nt && 0 > s(rt, P) ? (E[Z] = rt, E[lt] = q, Z = lt) : (E[Z] = P, E[H] = q, Z = H);
          else if (lt < nt && 0 > s(rt, q))
            E[Z] = rt, E[lt] = q, Z = lt;
          else break t;
        }
      }
      return O;
    }
    function s(E, O) {
      var q = E.sortIndex - O.sortIndex;
      return q !== 0 ? q : E.id - O.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      n.unstable_now = function() {
        return f.now();
      };
    } else {
      var d = Date, g = d.now();
      n.unstable_now = function() {
        return d.now() - g;
      };
    }
    var p = [], h = [], v = 1, y = null, b = 3, _ = !1, w = !1, A = !1, N = !1, M = typeof setTimeout == "function" ? setTimeout : null, U = typeof clearTimeout == "function" ? clearTimeout : null, S = typeof setImmediate < "u" ? setImmediate : null;
    function C(E) {
      for (var O = o(h); O !== null; ) {
        if (O.callback === null) u(h);
        else if (O.startTime <= E)
          u(h), O.sortIndex = O.expirationTime, i(p, O);
        else break;
        O = o(h);
      }
    }
    function j(E) {
      if (A = !1, C(E), !w)
        if (o(p) !== null)
          w = !0, k || (k = !0, I());
        else {
          var O = o(h);
          O !== null && V(j, O.startTime - E);
        }
    }
    var k = !1, B = -1, $ = 5, J = -1;
    function ut() {
      return N ? !0 : !(n.unstable_now() - J < $);
    }
    function X() {
      if (N = !1, k) {
        var E = n.unstable_now();
        J = E;
        var O = !0;
        try {
          t: {
            w = !1, A && (A = !1, U(B), B = -1), _ = !0;
            var q = b;
            try {
              e: {
                for (C(E), y = o(p); y !== null && !(y.expirationTime > E && ut()); ) {
                  var Z = y.callback;
                  if (typeof Z == "function") {
                    y.callback = null, b = y.priorityLevel;
                    var nt = Z(
                      y.expirationTime <= E
                    );
                    if (E = n.unstable_now(), typeof nt == "function") {
                      y.callback = nt, C(E), O = !0;
                      break e;
                    }
                    y === o(p) && u(p), C(E);
                  } else u(p);
                  y = o(p);
                }
                if (y !== null) O = !0;
                else {
                  var z = o(h);
                  z !== null && V(
                    j,
                    z.startTime - E
                  ), O = !1;
                }
              }
              break t;
            } finally {
              y = null, b = q, _ = !1;
            }
            O = void 0;
          }
        } finally {
          O ? I() : k = !1;
        }
      }
    }
    var I;
    if (typeof S == "function")
      I = function() {
        S(X);
      };
    else if (typeof MessageChannel < "u") {
      var ot = new MessageChannel(), T = ot.port2;
      ot.port1.onmessage = X, I = function() {
        T.postMessage(null);
      };
    } else
      I = function() {
        M(X, 0);
      };
    function V(E, O) {
      B = M(function() {
        E(n.unstable_now());
      }, O);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(E) {
      E.callback = null;
    }, n.unstable_forceFrameRate = function(E) {
      0 > E || 125 < E ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : $ = 0 < E ? Math.floor(1e3 / E) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, n.unstable_next = function(E) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = b;
      }
      var q = b;
      b = O;
      try {
        return E();
      } finally {
        b = q;
      }
    }, n.unstable_requestPaint = function() {
      N = !0;
    }, n.unstable_runWithPriority = function(E, O) {
      switch (E) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          E = 3;
      }
      var q = b;
      b = E;
      try {
        return O();
      } finally {
        b = q;
      }
    }, n.unstable_scheduleCallback = function(E, O, q) {
      var Z = n.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? Z + q : Z) : q = Z, E) {
        case 1:
          var nt = -1;
          break;
        case 2:
          nt = 250;
          break;
        case 5:
          nt = 1073741823;
          break;
        case 4:
          nt = 1e4;
          break;
        default:
          nt = 5e3;
      }
      return nt = q + nt, E = {
        id: v++,
        callback: O,
        priorityLevel: E,
        startTime: q,
        expirationTime: nt,
        sortIndex: -1
      }, q > Z ? (E.sortIndex = q, i(h, E), o(p) === null && E === o(h) && (A ? (U(B), B = -1) : A = !0, V(j, q - Z))) : (E.sortIndex = nt, i(p, E), w || _ || (w = !0, k || (k = !0, I()))), E;
    }, n.unstable_shouldYield = ut, n.unstable_wrapCallback = function(E) {
      var O = b;
      return function() {
        var q = b;
        b = O;
        try {
          return E.apply(this, arguments);
        } finally {
          b = q;
        }
      };
    };
  })(df)), df;
}
var tm;
function jb() {
  return tm || (tm = 1, ff.exports = Yb()), ff.exports;
}
var hf = { exports: {} }, he = {};
var em;
function Lb() {
  if (em) return he;
  em = 1;
  var n = Mo();
  function i(p) {
    var h = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        h += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return "Minified React error #" + p + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var u = {
    d: {
      f: o,
      r: function() {
        throw Error(i(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, s = /* @__PURE__ */ Symbol.for("react.portal");
  function f(p, h, v) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: y == null ? null : "" + y,
      children: p,
      containerInfo: h,
      implementation: v
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(p, h) {
    if (p === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return he.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, he.createPortal = function(p, h) {
    var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(i(299));
    return f(p, h, null, v);
  }, he.flushSync = function(p) {
    var h = d.T, v = u.p;
    try {
      if (d.T = null, u.p = 2, p) return p();
    } finally {
      d.T = h, u.p = v, u.d.f();
    }
  }, he.preconnect = function(p, h) {
    typeof p == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, u.d.C(p, h));
  }, he.prefetchDNS = function(p) {
    typeof p == "string" && u.d.D(p);
  }, he.preinit = function(p, h) {
    if (typeof p == "string" && h && typeof h.as == "string") {
      var v = h.as, y = g(v, h.crossOrigin), b = typeof h.integrity == "string" ? h.integrity : void 0, _ = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      v === "style" ? u.d.S(
        p,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: y,
          integrity: b,
          fetchPriority: _
        }
      ) : v === "script" && u.d.X(p, {
        crossOrigin: y,
        integrity: b,
        fetchPriority: _,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, he.preinitModule = function(p, h) {
    if (typeof p == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var v = g(
            h.as,
            h.crossOrigin
          );
          u.d.M(p, {
            crossOrigin: v,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && u.d.M(p);
  }, he.preload = function(p, h) {
    if (typeof p == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var v = h.as, y = g(v, h.crossOrigin);
      u.d.L(p, v, {
        crossOrigin: y,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, he.preloadModule = function(p, h) {
    if (typeof p == "string")
      if (h) {
        var v = g(h.as, h.crossOrigin);
        u.d.m(p, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: v,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else u.d.m(p);
  }, he.requestFormReset = function(p) {
    u.d.r(p);
  }, he.unstable_batchedUpdates = function(p, h) {
    return p(h);
  }, he.useFormState = function(p, h, v) {
    return d.H.useFormState(p, h, v);
  }, he.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, he.version = "19.2.7", he;
}
var nm;
function Sp() {
  if (nm) return hf.exports;
  nm = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), hf.exports = Lb(), hf.exports;
}
var lm;
function Vb() {
  if (lm) return io;
  lm = 1;
  var n = jb(), i = Mo(), o = Sp();
  function u(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function f(t) {
    var e = t, l = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do
        e = t, (e.flags & 4098) !== 0 && (l = e.return), t = e.return;
      while (t);
    }
    return e.tag === 3 ? l : null;
  }
  function d(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (f(t) !== t)
      throw Error(u(188));
  }
  function h(t) {
    var e = t.alternate;
    if (!e) {
      if (e = f(t), e === null) throw Error(u(188));
      return e !== t ? null : t;
    }
    for (var l = t, a = e; ; ) {
      var r = l.return;
      if (r === null) break;
      var c = r.alternate;
      if (c === null) {
        if (a = r.return, a !== null) {
          l = a;
          continue;
        }
        break;
      }
      if (r.child === c.child) {
        for (c = r.child; c; ) {
          if (c === l) return p(r), t;
          if (c === a) return p(r), e;
          c = c.sibling;
        }
        throw Error(u(188));
      }
      if (l.return !== a.return) l = r, a = c;
      else {
        for (var m = !1, x = r.child; x; ) {
          if (x === l) {
            m = !0, l = r, a = c;
            break;
          }
          if (x === a) {
            m = !0, a = r, l = c;
            break;
          }
          x = x.sibling;
        }
        if (!m) {
          for (x = c.child; x; ) {
            if (x === l) {
              m = !0, l = c, a = r;
              break;
            }
            if (x === a) {
              m = !0, a = c, l = r;
              break;
            }
            x = x.sibling;
          }
          if (!m) throw Error(u(189));
        }
      }
      if (l.alternate !== a) throw Error(u(190));
    }
    if (l.tag !== 3) throw Error(u(188));
    return l.stateNode.current === l ? t : e;
  }
  function v(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = v(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var y = Object.assign, b = /* @__PURE__ */ Symbol.for("react.element"), _ = /* @__PURE__ */ Symbol.for("react.transitional.element"), w = /* @__PURE__ */ Symbol.for("react.portal"), A = /* @__PURE__ */ Symbol.for("react.fragment"), N = /* @__PURE__ */ Symbol.for("react.strict_mode"), M = /* @__PURE__ */ Symbol.for("react.profiler"), U = /* @__PURE__ */ Symbol.for("react.consumer"), S = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), j = /* @__PURE__ */ Symbol.for("react.suspense"), k = /* @__PURE__ */ Symbol.for("react.suspense_list"), B = /* @__PURE__ */ Symbol.for("react.memo"), $ = /* @__PURE__ */ Symbol.for("react.lazy"), J = /* @__PURE__ */ Symbol.for("react.activity"), ut = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), X = Symbol.iterator;
  function I(t) {
    return t === null || typeof t != "object" ? null : (t = X && t[X] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ot = /* @__PURE__ */ Symbol.for("react.client.reference");
  function T(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ot ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case A:
        return "Fragment";
      case M:
        return "Profiler";
      case N:
        return "StrictMode";
      case j:
        return "Suspense";
      case k:
        return "SuspenseList";
      case J:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case w:
          return "Portal";
        case S:
          return t.displayName || "Context";
        case U:
          return (t._context.displayName || "Context") + ".Consumer";
        case C:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case B:
          return e = t.displayName || null, e !== null ? e : T(t.type) || "Memo";
        case $:
          e = t._payload, t = t._init;
          try {
            return T(t(e));
          } catch {
          }
      }
    return null;
  }
  var V = Array.isArray, E = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Z = [], nt = -1;
  function z(t) {
    return { current: t };
  }
  function H(t) {
    0 > nt || (t.current = Z[nt], Z[nt] = null, nt--);
  }
  function P(t, e) {
    nt++, Z[nt] = t.current, t.current = e;
  }
  var lt = z(null), rt = z(null), ft = z(null), ct = z(null);
  function tt(t, e) {
    switch (P(ft, e), P(rt, t), P(lt, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? xg(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = xg(e), t = _g(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    H(lt), P(lt, t);
  }
  function st() {
    H(lt), H(rt), H(ft);
  }
  function xt(t) {
    t.memoizedState !== null && P(ct, t);
    var e = lt.current, l = _g(e, t.type);
    e !== l && (P(rt, t), P(lt, l));
  }
  function bt(t) {
    rt.current === t && (H(lt), H(rt)), ct.current === t && (H(ct), eo._currentValue = q);
  }
  var gt, yt;
  function St(t) {
    if (gt === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        gt = e && e[1] || "", yt = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + gt + t + yt;
  }
  var Dt = !1;
  function Vt(t, e) {
    if (!t || Dt) return "";
    Dt = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var it = function() {
                throw Error();
              };
              if (Object.defineProperty(it.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(it, []);
                } catch (F) {
                  var K = F;
                }
                Reflect.construct(t, [], it);
              } else {
                try {
                  it.call();
                } catch (F) {
                  K = F;
                }
                t.call(it.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (F) {
                K = F;
              }
              (it = t()) && typeof it.catch == "function" && it.catch(function() {
              });
            }
          } catch (F) {
            if (F && K && typeof F.stack == "string")
              return [F.stack, K.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var r = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      r && r.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = a.DetermineComponentFrameRoot(), m = c[0], x = c[1];
      if (m && x) {
        var D = m.split(`
`), Q = x.split(`
`);
        for (r = a = 0; a < D.length && !D[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; r < Q.length && !Q[r].includes(
          "DetermineComponentFrameRoot"
        ); )
          r++;
        if (a === D.length || r === Q.length)
          for (a = D.length - 1, r = Q.length - 1; 1 <= a && 0 <= r && D[a] !== Q[r]; )
            r--;
        for (; 1 <= a && 0 <= r; a--, r--)
          if (D[a] !== Q[r]) {
            if (a !== 1 || r !== 1)
              do
                if (a--, r--, 0 > r || D[a] !== Q[r]) {
                  var et = `
` + D[a].replace(" at new ", " at ");
                  return t.displayName && et.includes("<anonymous>") && (et = et.replace("<anonymous>", t.displayName)), et;
                }
              while (1 <= a && 0 <= r);
            break;
          }
      }
    } finally {
      Dt = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? St(l) : "";
  }
  function fe(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return St(t.type);
      case 16:
        return St("Lazy");
      case 13:
        return t.child !== e && e !== null ? St("Suspense Fallback") : St("Suspense");
      case 19:
        return St("SuspenseList");
      case 0:
      case 15:
        return Vt(t.type, !1);
      case 11:
        return Vt(t.type.render, !1);
      case 1:
        return Vt(t.type, !0);
      case 31:
        return St("Activity");
      default:
        return "";
    }
  }
  function Le(t) {
    try {
      var e = "", l = null;
      do
        e += fe(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var ye = Object.prototype.hasOwnProperty, ve = n.unstable_scheduleCallback, Ae = n.unstable_cancelCallback, zl = n.unstable_shouldYield, _n = n.unstable_requestPaint, Jt = n.unstable_now, Ce = n.unstable_getCurrentPriorityLevel, Ve = n.unstable_ImmediatePriority, qe = n.unstable_UserBlockingPriority, Xe = n.unstable_NormalPriority, Qr = n.unstable_LowPriority, ua = n.unstable_IdlePriority, $r = n.log, Kr = n.unstable_setDisableYieldValue, Ml = null, ge = null;
  function fn(t) {
    if (typeof $r == "function" && Kr(t), ge && typeof ge.setStrictMode == "function")
      try {
        ge.setStrictMode(Ml, t);
      } catch {
      }
  }
  var me = Math.clz32 ? Math.clz32 : Fr, Jr = Math.log, Wr = Math.LN2;
  function Fr(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Jr(t) / Wr | 0) | 0;
  }
  var ra = 256, ca = 262144, sa = 4194304;
  function Sn(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function fa(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var r = 0, c = t.suspendedLanes, m = t.pingedLanes;
    t = t.warmLanes;
    var x = a & 134217727;
    return x !== 0 ? (a = x & ~c, a !== 0 ? r = Sn(a) : (m &= x, m !== 0 ? r = Sn(m) : l || (l = x & ~t, l !== 0 && (r = Sn(l))))) : (x = a & ~c, x !== 0 ? r = Sn(x) : m !== 0 ? r = Sn(m) : l || (l = a & ~t, l !== 0 && (r = Sn(l)))), r === 0 ? 0 : e !== 0 && e !== r && (e & c) === 0 && (c = r & -r, l = e & -e, c >= l || c === 32 && (l & 4194048) !== 0) ? e : r;
  }
  function Nl(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Ir(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ro() {
    var t = sa;
    return sa <<= 1, (sa & 62914560) === 0 && (sa = 4194304), t;
  }
  function ri(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Al(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Pr(t, e, l, a, r, c) {
    var m = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var x = t.entanglements, D = t.expirationTimes, Q = t.hiddenUpdates;
    for (l = m & ~l; 0 < l; ) {
      var et = 31 - me(l), it = 1 << et;
      x[et] = 0, D[et] = -1;
      var K = Q[et];
      if (K !== null)
        for (Q[et] = null, et = 0; et < K.length; et++) {
          var F = K[et];
          F !== null && (F.lane &= -536870913);
        }
      l &= ~it;
    }
    a !== 0 && Bo(t, a, 0), c !== 0 && r === 0 && t.tag !== 0 && (t.suspendedLanes |= c & ~(m & ~e));
  }
  function Bo(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - me(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
  }
  function Uo(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var a = 31 - me(l), r = 1 << a;
      r & e | t[a] & e && (t[a] |= e), l &= ~r;
    }
  }
  function ko(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : ci(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function ci(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function si(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Yo() {
    var t = O.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Zg(t.type));
  }
  function jo(t, e) {
    var l = O.p;
    try {
      return O.p = t, e();
    } finally {
      O.p = l;
    }
  }
  var dn = Math.random().toString(36).slice(2), ae = "__reactFiber$" + dn, de = "__reactProps$" + dn, wn = "__reactContainer$" + dn, da = "__reactEvents$" + dn, Lo = "__reactListeners$" + dn, tc = "__reactHandles$" + dn, Vo = "__reactResources$" + dn, Cl = "__reactMarker$" + dn;
  function fi(t) {
    delete t[ae], delete t[de], delete t[da], delete t[Lo], delete t[tc];
  }
  function $n(t) {
    var e = t[ae];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[wn] || l[ae]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = Ag(t); t !== null; ) {
            if (l = t[ae]) return l;
            t = Ag(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function Kn(t) {
    if (t = t[ae] || t[wn]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Jn(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(u(33));
  }
  function Wn(t) {
    var e = t[Vo];
    return e || (e = t[Vo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function It(t) {
    t[Cl] = !0;
  }
  var qo = /* @__PURE__ */ new Set(), Xo = {};
  function En(t, e) {
    Fn(t, e), Fn(t + "Capture", e);
  }
  function Fn(t, e) {
    for (Xo[t] = e, t = 0; t < e.length; t++)
      qo.add(e[t]);
  }
  var ec = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Zo = {}, di = {};
  function nc(t) {
    return ye.call(di, t) ? !0 : ye.call(Zo, t) ? !1 : ec.test(t) ? di[t] = !0 : (Zo[t] = !0, !1);
  }
  function ha(t, e, l) {
    if (nc(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var a = e.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + l);
      }
  }
  function ga(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + l);
    }
  }
  function Ie(t, e, l, a) {
    if (a === null) t.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, "" + a);
    }
  }
  function be(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Go(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function lc(t, e, l) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var r = a.get, c = a.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(m) {
          l = "" + m, c.call(this, m);
        }
      }), Object.defineProperty(t, e, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(m) {
          l = "" + m;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function hi(t) {
    if (!t._valueTracker) {
      var e = Go(t) ? "checked" : "value";
      t._valueTracker = lc(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function gi(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), a = "";
    return t && (a = Go(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== l ? (e.setValue(t), !0) : !1;
  }
  function ma(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Qo = /[\n"\\]/g;
  function xe(t) {
    return t.replace(
      Qo,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function mi(t, e, l, a, r, c, m, x) {
    t.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.type = m : t.removeAttribute("type"), e != null ? m === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + be(e)) : t.value !== "" + be(e) && (t.value = "" + be(e)) : m !== "submit" && m !== "reset" || t.removeAttribute("value"), e != null ? pi(t, m, be(e)) : l != null ? pi(t, m, be(l)) : a != null && t.removeAttribute("value"), r == null && c != null && (t.defaultChecked = !!c), r != null && (t.checked = r && typeof r != "function" && typeof r != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? t.name = "" + be(x) : t.removeAttribute("name");
  }
  function pa(t, e, l, a, r, c, m, x) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.type = c), e != null || l != null) {
      if (!(c !== "submit" && c !== "reset" || e != null)) {
        hi(t);
        return;
      }
      l = l != null ? "" + be(l) : "", e = e != null ? "" + be(e) : l, x || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? r, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = x ? t.checked : !!a, t.defaultChecked = !!a, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (t.name = m), hi(t);
  }
  function pi(t, e, l) {
    e === "number" && ma(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
  }
  function In(t, e, l, a) {
    if (t = t.options, e) {
      e = {};
      for (var r = 0; r < l.length; r++)
        e["$" + l[r]] = !0;
      for (l = 0; l < t.length; l++)
        r = e.hasOwnProperty("$" + t[l].value), t[l].selected !== r && (t[l].selected = r), r && a && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + be(l), e = null, r = 0; r < t.length; r++) {
        if (t[r].value === l) {
          t[r].selected = !0, a && (t[r].defaultSelected = !0);
          return;
        }
        e !== null || t[r].disabled || (e = t[r]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function yi(t, e, l) {
    if (e != null && (e = "" + be(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + be(l) : "";
  }
  function pd(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(u(92));
        if (V(a)) {
          if (1 < a.length) throw Error(u(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), e = l;
    }
    l = be(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), hi(t);
  }
  function ya(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var vv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function yd(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || vv.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function vd(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(u(62));
    if (t = t.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var r in e)
        a = e[r], e.hasOwnProperty(r) && l[r] !== a && yd(t, r, a);
    } else
      for (var c in e)
        e.hasOwnProperty(c) && yd(t, c, e[c]);
  }
  function ac(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var bv = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), xv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function $o(t) {
    return xv.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function zn() {
  }
  var ic = null;
  function oc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var va = null, ba = null;
  function bd(t) {
    var e = Kn(t);
    if (e && (t = e.stateNode)) {
      var l = t[de] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (mi(
            t,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), e = l.name, l.type === "radio" && e != null) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + xe(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var r = a[de] || null;
                if (!r) throw Error(u(90));
                mi(
                  a,
                  r.value,
                  r.defaultValue,
                  r.defaultValue,
                  r.checked,
                  r.defaultChecked,
                  r.type,
                  r.name
                );
              }
            }
            for (e = 0; e < l.length; e++)
              a = l[e], a.form === t.form && gi(a);
          }
          break t;
        case "textarea":
          yi(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && In(t, !!l.multiple, e, !1);
      }
    }
  }
  var uc = !1;
  function xd(t, e, l) {
    if (uc) return t(e, l);
    uc = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (uc = !1, (va !== null || ba !== null) && (Ru(), va && (e = va, t = ba, ba = va = null, bd(e), t)))
        for (e = 0; e < t.length; e++) bd(t[e]);
    }
  }
  function vi(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[de] || null;
    if (a === null) return null;
    l = a[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function")
      throw Error(
        u(231, e, typeof l)
      );
    return l;
  }
  var Mn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), rc = !1;
  if (Mn)
    try {
      var bi = {};
      Object.defineProperty(bi, "passive", {
        get: function() {
          rc = !0;
        }
      }), window.addEventListener("test", bi, bi), window.removeEventListener("test", bi, bi);
    } catch {
      rc = !1;
    }
  var Pn = null, cc = null, Ko = null;
  function _d() {
    if (Ko) return Ko;
    var t, e = cc, l = e.length, a, r = "value" in Pn ? Pn.value : Pn.textContent, c = r.length;
    for (t = 0; t < l && e[t] === r[t]; t++) ;
    var m = l - t;
    for (a = 1; a <= m && e[l - a] === r[c - a]; a++) ;
    return Ko = r.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Jo(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Wo() {
    return !0;
  }
  function Sd() {
    return !1;
  }
  function _e(t) {
    function e(l, a, r, c, m) {
      this._reactName = l, this._targetInst = r, this.type = a, this.nativeEvent = c, this.target = m, this.currentTarget = null;
      for (var x in t)
        t.hasOwnProperty(x) && (l = t[x], this[x] = l ? l(c) : c[x]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Wo : Sd, this.isPropagationStopped = Sd, this;
    }
    return y(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Wo);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Wo);
      },
      persist: function() {
      },
      isPersistent: Wo
    }), e;
  }
  var Tl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Fo = _e(Tl), xi = y({}, Tl, { view: 0, detail: 0 }), _v = _e(xi), sc, fc, _i, Io = y({}, xi, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: hc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== _i && (_i && t.type === "mousemove" ? (sc = t.screenX - _i.screenX, fc = t.screenY - _i.screenY) : fc = sc = 0, _i = t), sc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : fc;
    }
  }), wd = _e(Io), Sv = y({}, Io, { dataTransfer: 0 }), wv = _e(Sv), Ev = y({}, xi, { relatedTarget: 0 }), dc = _e(Ev), zv = y({}, Tl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Mv = _e(zv), Nv = y({}, Tl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Av = _e(Nv), Cv = y({}, Tl, { data: 0 }), Ed = _e(Cv), Tv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Dv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Ov = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Hv(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Ov[t]) ? !!e[t] : !1;
  }
  function hc() {
    return Hv;
  }
  var Rv = y({}, xi, {
    key: function(t) {
      if (t.key) {
        var e = Tv[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Jo(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Dv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: hc,
    charCode: function(t) {
      return t.type === "keypress" ? Jo(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Jo(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Bv = _e(Rv), Uv = y({}, Io, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), zd = _e(Uv), kv = y({}, xi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: hc
  }), Yv = _e(kv), jv = y({}, Tl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Lv = _e(jv), Vv = y({}, Io, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), qv = _e(Vv), Xv = y({}, Tl, {
    newState: 0,
    oldState: 0
  }), Zv = _e(Xv), Gv = [9, 13, 27, 32], gc = Mn && "CompositionEvent" in window, Si = null;
  Mn && "documentMode" in document && (Si = document.documentMode);
  var Qv = Mn && "TextEvent" in window && !Si, Md = Mn && (!gc || Si && 8 < Si && 11 >= Si), Nd = " ", Ad = !1;
  function Cd(t, e) {
    switch (t) {
      case "keyup":
        return Gv.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Td(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var xa = !1;
  function $v(t, e) {
    switch (t) {
      case "compositionend":
        return Td(e);
      case "keypress":
        return e.which !== 32 ? null : (Ad = !0, Nd);
      case "textInput":
        return t = e.data, t === Nd && Ad ? null : t;
      default:
        return null;
    }
  }
  function Kv(t, e) {
    if (xa)
      return t === "compositionend" || !gc && Cd(t, e) ? (t = _d(), Ko = cc = Pn = null, xa = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Md && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var Jv = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Dd(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!Jv[t.type] : e === "textarea";
  }
  function Od(t, e, l, a) {
    va ? ba ? ba.push(a) : ba = [a] : va = a, e = Vu(e, "onChange"), 0 < e.length && (l = new Fo(
      "onChange",
      "change",
      null,
      l,
      a
    ), t.push({ event: l, listeners: e }));
  }
  var wi = null, Ei = null;
  function Wv(t) {
    gg(t, 0);
  }
  function Po(t) {
    var e = Jn(t);
    if (gi(e)) return t;
  }
  function Hd(t, e) {
    if (t === "change") return e;
  }
  var Rd = !1;
  if (Mn) {
    var mc;
    if (Mn) {
      var pc = "oninput" in document;
      if (!pc) {
        var Bd = document.createElement("div");
        Bd.setAttribute("oninput", "return;"), pc = typeof Bd.oninput == "function";
      }
      mc = pc;
    } else mc = !1;
    Rd = mc && (!document.documentMode || 9 < document.documentMode);
  }
  function Ud() {
    wi && (wi.detachEvent("onpropertychange", kd), Ei = wi = null);
  }
  function kd(t) {
    if (t.propertyName === "value" && Po(Ei)) {
      var e = [];
      Od(
        e,
        Ei,
        t,
        oc(t)
      ), xd(Wv, e);
    }
  }
  function Fv(t, e, l) {
    t === "focusin" ? (Ud(), wi = e, Ei = l, wi.attachEvent("onpropertychange", kd)) : t === "focusout" && Ud();
  }
  function Iv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Po(Ei);
  }
  function Pv(t, e) {
    if (t === "click") return Po(e);
  }
  function t1(t, e) {
    if (t === "input" || t === "change")
      return Po(e);
  }
  function e1(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Te = typeof Object.is == "function" ? Object.is : e1;
  function zi(t, e) {
    if (Te(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var r = l[a];
      if (!ye.call(e, r) || !Te(t[r], e[r]))
        return !1;
    }
    return !0;
  }
  function Yd(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function jd(t, e) {
    var l = Yd(t);
    t = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (a = t + l.textContent.length, t <= e && a >= e)
          return { node: l, offset: e - t };
        t = a;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Yd(l);
    }
  }
  function Ld(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Ld(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Vd(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = ma(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = ma(t.document);
    }
    return e;
  }
  function yc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var n1 = Mn && "documentMode" in document && 11 >= document.documentMode, _a = null, vc = null, Mi = null, bc = !1;
  function qd(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    bc || _a == null || _a !== ma(a) || (a = _a, "selectionStart" in a && yc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Mi && zi(Mi, a) || (Mi = a, a = Vu(vc, "onSelect"), 0 < a.length && (e = new Fo(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }), e.target = _a)));
  }
  function Dl(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var Sa = {
    animationend: Dl("Animation", "AnimationEnd"),
    animationiteration: Dl("Animation", "AnimationIteration"),
    animationstart: Dl("Animation", "AnimationStart"),
    transitionrun: Dl("Transition", "TransitionRun"),
    transitionstart: Dl("Transition", "TransitionStart"),
    transitioncancel: Dl("Transition", "TransitionCancel"),
    transitionend: Dl("Transition", "TransitionEnd")
  }, xc = {}, Xd = {};
  Mn && (Xd = document.createElement("div").style, "AnimationEvent" in window || (delete Sa.animationend.animation, delete Sa.animationiteration.animation, delete Sa.animationstart.animation), "TransitionEvent" in window || delete Sa.transitionend.transition);
  function Ol(t) {
    if (xc[t]) return xc[t];
    if (!Sa[t]) return t;
    var e = Sa[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in Xd)
        return xc[t] = e[l];
    return t;
  }
  var Zd = Ol("animationend"), Gd = Ol("animationiteration"), Qd = Ol("animationstart"), l1 = Ol("transitionrun"), a1 = Ol("transitionstart"), i1 = Ol("transitioncancel"), $d = Ol("transitionend"), Kd = /* @__PURE__ */ new Map(), _c = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  _c.push("scrollEnd");
  function Pe(t, e) {
    Kd.set(t, e), En(e, [t]);
  }
  var tu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Ze = [], wa = 0, Sc = 0;
  function eu() {
    for (var t = wa, e = Sc = wa = 0; e < t; ) {
      var l = Ze[e];
      Ze[e++] = null;
      var a = Ze[e];
      Ze[e++] = null;
      var r = Ze[e];
      Ze[e++] = null;
      var c = Ze[e];
      if (Ze[e++] = null, a !== null && r !== null) {
        var m = a.pending;
        m === null ? r.next = r : (r.next = m.next, m.next = r), a.pending = r;
      }
      c !== 0 && Jd(l, r, c);
    }
  }
  function nu(t, e, l, a) {
    Ze[wa++] = t, Ze[wa++] = e, Ze[wa++] = l, Ze[wa++] = a, Sc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function wc(t, e, l, a) {
    return nu(t, e, l, a), lu(t);
  }
  function Hl(t, e) {
    return nu(t, null, null, e), lu(t);
  }
  function Jd(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var r = !1, c = t.return; c !== null; )
      c.childLanes |= l, a = c.alternate, a !== null && (a.childLanes |= l), c.tag === 22 && (t = c.stateNode, t === null || t._visibility & 1 || (r = !0)), t = c, c = c.return;
    return t.tag === 3 ? (c = t.stateNode, r && e !== null && (r = 31 - me(l), t = c.hiddenUpdates, a = t[r], a === null ? t[r] = [e] : a.push(e), e.lane = l | 536870912), c) : null;
  }
  function lu(t) {
    if (50 < Ki)
      throw Ki = 0, Os = null, Error(u(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ea = {};
  function o1(t, e, l, a) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function De(t, e, l, a) {
    return new o1(t, e, l, a);
  }
  function Ec(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Nn(t, e) {
    var l = t.alternate;
    return l === null ? (l = De(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function Wd(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function au(t, e, l, a, r, c) {
    var m = 0;
    if (a = t, typeof t == "function") Ec(t) && (m = 1);
    else if (typeof t == "string")
      m = fb(
        t,
        l,
        lt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case J:
          return t = De(31, l, e, r), t.elementType = J, t.lanes = c, t;
        case A:
          return Rl(l.children, r, c, e);
        case N:
          m = 8, r |= 24;
          break;
        case M:
          return t = De(12, l, e, r | 2), t.elementType = M, t.lanes = c, t;
        case j:
          return t = De(13, l, e, r), t.elementType = j, t.lanes = c, t;
        case k:
          return t = De(19, l, e, r), t.elementType = k, t.lanes = c, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case S:
                m = 10;
                break t;
              case U:
                m = 9;
                break t;
              case C:
                m = 11;
                break t;
              case B:
                m = 14;
                break t;
              case $:
                m = 16, a = null;
                break t;
            }
          m = 29, l = Error(
            u(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = De(m, l, e, r), e.elementType = t, e.type = a, e.lanes = c, e;
  }
  function Rl(t, e, l, a) {
    return t = De(7, t, a, e), t.lanes = l, t;
  }
  function zc(t, e, l) {
    return t = De(6, t, null, e), t.lanes = l, t;
  }
  function Fd(t) {
    var e = De(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Mc(t, e, l) {
    return e = De(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = l, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var Id = /* @__PURE__ */ new WeakMap();
  function Ge(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Id.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Le(e)
      }, Id.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Le(e)
    };
  }
  var za = [], Ma = 0, iu = null, Ni = 0, Qe = [], $e = 0, tl = null, hn = 1, gn = "";
  function An(t, e) {
    za[Ma++] = Ni, za[Ma++] = iu, iu = t, Ni = e;
  }
  function Pd(t, e, l) {
    Qe[$e++] = hn, Qe[$e++] = gn, Qe[$e++] = tl, tl = t;
    var a = hn;
    t = gn;
    var r = 32 - me(a) - 1;
    a &= ~(1 << r), l += 1;
    var c = 32 - me(e) + r;
    if (30 < c) {
      var m = r - r % 5;
      c = (a & (1 << m) - 1).toString(32), a >>= m, r -= m, hn = 1 << 32 - me(e) + r | l << r | a, gn = c + t;
    } else
      hn = 1 << c | l << r | a, gn = t;
  }
  function Nc(t) {
    t.return !== null && (An(t, 1), Pd(t, 1, 0));
  }
  function Ac(t) {
    for (; t === iu; )
      iu = za[--Ma], za[Ma] = null, Ni = za[--Ma], za[Ma] = null;
    for (; t === tl; )
      tl = Qe[--$e], Qe[$e] = null, gn = Qe[--$e], Qe[$e] = null, hn = Qe[--$e], Qe[$e] = null;
  }
  function th(t, e) {
    Qe[$e++] = hn, Qe[$e++] = gn, Qe[$e++] = tl, hn = e.id, gn = e.overflow, tl = t;
  }
  var ue = null, qt = null, Tt = !1, el = null, Ke = !1, Cc = Error(u(519));
  function nl(t) {
    var e = Error(
      u(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ai(Ge(e, t)), Cc;
  }
  function eh(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[ae] = t, e[de] = a, l) {
      case "dialog":
        Mt("cancel", e), Mt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        Mt("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Wi.length; l++)
          Mt(Wi[l], e);
        break;
      case "source":
        Mt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        Mt("error", e), Mt("load", e);
        break;
      case "details":
        Mt("toggle", e);
        break;
      case "input":
        Mt("invalid", e), pa(
          e,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        Mt("invalid", e);
        break;
      case "textarea":
        Mt("invalid", e), pd(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || vg(e.textContent, l) ? (a.popover != null && (Mt("beforetoggle", e), Mt("toggle", e)), a.onScroll != null && Mt("scroll", e), a.onScrollEnd != null && Mt("scrollend", e), a.onClick != null && (e.onclick = zn), e = !0) : e = !1, e || nl(t, !0);
  }
  function nh(t) {
    for (ue = t.return; ue; )
      switch (ue.tag) {
        case 5:
        case 31:
        case 13:
          Ke = !1;
          return;
        case 27:
        case 3:
          Ke = !0;
          return;
        default:
          ue = ue.return;
      }
  }
  function Na(t) {
    if (t !== ue) return !1;
    if (!Tt) return nh(t), Tt = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || $s(t.type, t.memoizedProps)), l = !l), l && qt && nl(t), nh(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(u(317));
      qt = Ng(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(u(317));
      qt = Ng(t);
    } else
      e === 27 ? (e = qt, pl(t.type) ? (t = Is, Is = null, qt = t) : qt = e) : qt = ue ? We(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Bl() {
    qt = ue = null, Tt = !1;
  }
  function Tc() {
    var t = el;
    return t !== null && (ze === null ? ze = t : ze.push.apply(
      ze,
      t
    ), el = null), t;
  }
  function Ai(t) {
    el === null ? el = [t] : el.push(t);
  }
  var Dc = z(null), Ul = null, Cn = null;
  function ll(t, e, l) {
    P(Dc, e._currentValue), e._currentValue = l;
  }
  function Tn(t) {
    t._currentValue = Dc.current, H(Dc);
  }
  function Oc(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function Hc(t, e, l, a) {
    var r = t.child;
    for (r !== null && (r.return = t); r !== null; ) {
      var c = r.dependencies;
      if (c !== null) {
        var m = r.child;
        c = c.firstContext;
        t: for (; c !== null; ) {
          var x = c;
          c = r;
          for (var D = 0; D < e.length; D++)
            if (x.context === e[D]) {
              c.lanes |= l, x = c.alternate, x !== null && (x.lanes |= l), Oc(
                c.return,
                l,
                t
              ), a || (m = null);
              break t;
            }
          c = x.next;
        }
      } else if (r.tag === 18) {
        if (m = r.return, m === null) throw Error(u(341));
        m.lanes |= l, c = m.alternate, c !== null && (c.lanes |= l), Oc(m, l, t), m = null;
      } else m = r.child;
      if (m !== null) m.return = r;
      else
        for (m = r; m !== null; ) {
          if (m === t) {
            m = null;
            break;
          }
          if (r = m.sibling, r !== null) {
            r.return = m.return, m = r;
            break;
          }
          m = m.return;
        }
      r = m;
    }
  }
  function Aa(t, e, l, a) {
    t = null;
    for (var r = e, c = !1; r !== null; ) {
      if (!c) {
        if ((r.flags & 524288) !== 0) c = !0;
        else if ((r.flags & 262144) !== 0) break;
      }
      if (r.tag === 10) {
        var m = r.alternate;
        if (m === null) throw Error(u(387));
        if (m = m.memoizedProps, m !== null) {
          var x = r.type;
          Te(r.pendingProps.value, m.value) || (t !== null ? t.push(x) : t = [x]);
        }
      } else if (r === ct.current) {
        if (m = r.alternate, m === null) throw Error(u(387));
        m.memoizedState.memoizedState !== r.memoizedState.memoizedState && (t !== null ? t.push(eo) : t = [eo]);
      }
      r = r.return;
    }
    t !== null && Hc(
      e,
      t,
      l,
      a
    ), e.flags |= 262144;
  }
  function ou(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Te(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function kl(t) {
    Ul = t, Cn = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function re(t) {
    return lh(Ul, t);
  }
  function uu(t, e) {
    return Ul === null && kl(t), lh(t, e);
  }
  function lh(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, Cn === null) {
      if (t === null) throw Error(u(308));
      Cn = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Cn = Cn.next = e;
    return l;
  }
  var u1 = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(l, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(l) {
        return l();
      });
    };
  }, r1 = n.unstable_scheduleCallback, c1 = n.unstable_NormalPriority, Pt = {
    $$typeof: S,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Rc() {
    return {
      controller: new u1(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ci(t) {
    t.refCount--, t.refCount === 0 && r1(c1, function() {
      t.controller.abort();
    });
  }
  var Ti = null, Bc = 0, Ca = 0, Ta = null;
  function s1(t, e) {
    if (Ti === null) {
      var l = Ti = [];
      Bc = 0, Ca = Ys(), Ta = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return Bc++, e.then(ah, ah), e;
  }
  function ah() {
    if (--Bc === 0 && Ti !== null) {
      Ta !== null && (Ta.status = "fulfilled");
      var t = Ti;
      Ti = null, Ca = 0, Ta = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function f1(t, e) {
    var l = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(r) {
        l.push(r);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = e;
        for (var r = 0; r < l.length; r++) (0, l[r])(e);
      },
      function(r) {
        for (a.status = "rejected", a.reason = r, r = 0; r < l.length; r++)
          (0, l[r])(void 0);
      }
    ), a;
  }
  var ih = E.S;
  E.S = function(t, e) {
    q0 = Jt(), typeof e == "object" && e !== null && typeof e.then == "function" && s1(t, e), ih !== null && ih(t, e);
  };
  var Yl = z(null);
  function Uc() {
    var t = Yl.current;
    return t !== null ? t : Lt.pooledCache;
  }
  function ru(t, e) {
    e === null ? P(Yl, Yl.current) : P(Yl, e.pool);
  }
  function oh() {
    var t = Uc();
    return t === null ? null : { parent: Pt._currentValue, pool: t };
  }
  var Da = Error(u(460)), kc = Error(u(474)), cu = Error(u(542)), su = { then: function() {
  } };
  function uh(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function rh(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(zn, zn), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, sh(t), t;
      default:
        if (typeof e.status == "string") e.then(zn, zn);
        else {
          if (t = Lt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(u(482));
          t = e, t.status = "pending", t.then(
            function(a) {
              if (e.status === "pending") {
                var r = e;
                r.status = "fulfilled", r.value = a;
              }
            },
            function(a) {
              if (e.status === "pending") {
                var r = e;
                r.status = "rejected", r.reason = a;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, sh(t), t;
        }
        throw Ll = e, Da;
    }
  }
  function jl(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Ll = l, Da) : l;
    }
  }
  var Ll = null;
  function ch() {
    if (Ll === null) throw Error(u(459));
    var t = Ll;
    return Ll = null, t;
  }
  function sh(t) {
    if (t === Da || t === cu)
      throw Error(u(483));
  }
  var Oa = null, Di = 0;
  function fu(t) {
    var e = Di;
    return Di += 1, Oa === null && (Oa = []), rh(Oa, t, e);
  }
  function Oi(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function du(t, e) {
    throw e.$$typeof === b ? Error(u(525)) : (t = Object.prototype.toString.call(e), Error(
      u(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function fh(t) {
    function e(Y, R) {
      if (t) {
        var G = Y.deletions;
        G === null ? (Y.deletions = [R], Y.flags |= 16) : G.push(R);
      }
    }
    function l(Y, R) {
      if (!t) return null;
      for (; R !== null; )
        e(Y, R), R = R.sibling;
      return null;
    }
    function a(Y) {
      for (var R = /* @__PURE__ */ new Map(); Y !== null; )
        Y.key !== null ? R.set(Y.key, Y) : R.set(Y.index, Y), Y = Y.sibling;
      return R;
    }
    function r(Y, R) {
      return Y = Nn(Y, R), Y.index = 0, Y.sibling = null, Y;
    }
    function c(Y, R, G) {
      return Y.index = G, t ? (G = Y.alternate, G !== null ? (G = G.index, G < R ? (Y.flags |= 67108866, R) : G) : (Y.flags |= 67108866, R)) : (Y.flags |= 1048576, R);
    }
    function m(Y) {
      return t && Y.alternate === null && (Y.flags |= 67108866), Y;
    }
    function x(Y, R, G, at) {
      return R === null || R.tag !== 6 ? (R = zc(G, Y.mode, at), R.return = Y, R) : (R = r(R, G), R.return = Y, R);
    }
    function D(Y, R, G, at) {
      var pt = G.type;
      return pt === A ? et(
        Y,
        R,
        G.props.children,
        at,
        G.key
      ) : R !== null && (R.elementType === pt || typeof pt == "object" && pt !== null && pt.$$typeof === $ && jl(pt) === R.type) ? (R = r(R, G.props), Oi(R, G), R.return = Y, R) : (R = au(
        G.type,
        G.key,
        G.props,
        null,
        Y.mode,
        at
      ), Oi(R, G), R.return = Y, R);
    }
    function Q(Y, R, G, at) {
      return R === null || R.tag !== 4 || R.stateNode.containerInfo !== G.containerInfo || R.stateNode.implementation !== G.implementation ? (R = Mc(G, Y.mode, at), R.return = Y, R) : (R = r(R, G.children || []), R.return = Y, R);
    }
    function et(Y, R, G, at, pt) {
      return R === null || R.tag !== 7 ? (R = Rl(
        G,
        Y.mode,
        at,
        pt
      ), R.return = Y, R) : (R = r(R, G), R.return = Y, R);
    }
    function it(Y, R, G) {
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return R = zc(
          "" + R,
          Y.mode,
          G
        ), R.return = Y, R;
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case _:
            return G = au(
              R.type,
              R.key,
              R.props,
              null,
              Y.mode,
              G
            ), Oi(G, R), G.return = Y, G;
          case w:
            return R = Mc(
              R,
              Y.mode,
              G
            ), R.return = Y, R;
          case $:
            return R = jl(R), it(Y, R, G);
        }
        if (V(R) || I(R))
          return R = Rl(
            R,
            Y.mode,
            G,
            null
          ), R.return = Y, R;
        if (typeof R.then == "function")
          return it(Y, fu(R), G);
        if (R.$$typeof === S)
          return it(
            Y,
            uu(Y, R),
            G
          );
        du(Y, R);
      }
      return null;
    }
    function K(Y, R, G, at) {
      var pt = R !== null ? R.key : null;
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return pt !== null ? null : x(Y, R, "" + G, at);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case _:
            return G.key === pt ? D(Y, R, G, at) : null;
          case w:
            return G.key === pt ? Q(Y, R, G, at) : null;
          case $:
            return G = jl(G), K(Y, R, G, at);
        }
        if (V(G) || I(G))
          return pt !== null ? null : et(Y, R, G, at, null);
        if (typeof G.then == "function")
          return K(
            Y,
            R,
            fu(G),
            at
          );
        if (G.$$typeof === S)
          return K(
            Y,
            R,
            uu(Y, G),
            at
          );
        du(Y, G);
      }
      return null;
    }
    function F(Y, R, G, at, pt) {
      if (typeof at == "string" && at !== "" || typeof at == "number" || typeof at == "bigint")
        return Y = Y.get(G) || null, x(R, Y, "" + at, pt);
      if (typeof at == "object" && at !== null) {
        switch (at.$$typeof) {
          case _:
            return Y = Y.get(
              at.key === null ? G : at.key
            ) || null, D(R, Y, at, pt);
          case w:
            return Y = Y.get(
              at.key === null ? G : at.key
            ) || null, Q(R, Y, at, pt);
          case $:
            return at = jl(at), F(
              Y,
              R,
              G,
              at,
              pt
            );
        }
        if (V(at) || I(at))
          return Y = Y.get(G) || null, et(R, Y, at, pt, null);
        if (typeof at.then == "function")
          return F(
            Y,
            R,
            G,
            fu(at),
            pt
          );
        if (at.$$typeof === S)
          return F(
            Y,
            R,
            G,
            uu(R, at),
            pt
          );
        du(R, at);
      }
      return null;
    }
    function dt(Y, R, G, at) {
      for (var pt = null, Ot = null, ht = R, Et = R = 0, Ct = null; ht !== null && Et < G.length; Et++) {
        ht.index > Et ? (Ct = ht, ht = null) : Ct = ht.sibling;
        var Ht = K(
          Y,
          ht,
          G[Et],
          at
        );
        if (Ht === null) {
          ht === null && (ht = Ct);
          break;
        }
        t && ht && Ht.alternate === null && e(Y, ht), R = c(Ht, R, Et), Ot === null ? pt = Ht : Ot.sibling = Ht, Ot = Ht, ht = Ct;
      }
      if (Et === G.length)
        return l(Y, ht), Tt && An(Y, Et), pt;
      if (ht === null) {
        for (; Et < G.length; Et++)
          ht = it(Y, G[Et], at), ht !== null && (R = c(
            ht,
            R,
            Et
          ), Ot === null ? pt = ht : Ot.sibling = ht, Ot = ht);
        return Tt && An(Y, Et), pt;
      }
      for (ht = a(ht); Et < G.length; Et++)
        Ct = F(
          ht,
          Y,
          Et,
          G[Et],
          at
        ), Ct !== null && (t && Ct.alternate !== null && ht.delete(
          Ct.key === null ? Et : Ct.key
        ), R = c(
          Ct,
          R,
          Et
        ), Ot === null ? pt = Ct : Ot.sibling = Ct, Ot = Ct);
      return t && ht.forEach(function(_l) {
        return e(Y, _l);
      }), Tt && An(Y, Et), pt;
    }
    function vt(Y, R, G, at) {
      if (G == null) throw Error(u(151));
      for (var pt = null, Ot = null, ht = R, Et = R = 0, Ct = null, Ht = G.next(); ht !== null && !Ht.done; Et++, Ht = G.next()) {
        ht.index > Et ? (Ct = ht, ht = null) : Ct = ht.sibling;
        var _l = K(Y, ht, Ht.value, at);
        if (_l === null) {
          ht === null && (ht = Ct);
          break;
        }
        t && ht && _l.alternate === null && e(Y, ht), R = c(_l, R, Et), Ot === null ? pt = _l : Ot.sibling = _l, Ot = _l, ht = Ct;
      }
      if (Ht.done)
        return l(Y, ht), Tt && An(Y, Et), pt;
      if (ht === null) {
        for (; !Ht.done; Et++, Ht = G.next())
          Ht = it(Y, Ht.value, at), Ht !== null && (R = c(Ht, R, Et), Ot === null ? pt = Ht : Ot.sibling = Ht, Ot = Ht);
        return Tt && An(Y, Et), pt;
      }
      for (ht = a(ht); !Ht.done; Et++, Ht = G.next())
        Ht = F(ht, Y, Et, Ht.value, at), Ht !== null && (t && Ht.alternate !== null && ht.delete(Ht.key === null ? Et : Ht.key), R = c(Ht, R, Et), Ot === null ? pt = Ht : Ot.sibling = Ht, Ot = Ht);
      return t && ht.forEach(function(Sb) {
        return e(Y, Sb);
      }), Tt && An(Y, Et), pt;
    }
    function jt(Y, R, G, at) {
      if (typeof G == "object" && G !== null && G.type === A && G.key === null && (G = G.props.children), typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case _:
            t: {
              for (var pt = G.key; R !== null; ) {
                if (R.key === pt) {
                  if (pt = G.type, pt === A) {
                    if (R.tag === 7) {
                      l(
                        Y,
                        R.sibling
                      ), at = r(
                        R,
                        G.props.children
                      ), at.return = Y, Y = at;
                      break t;
                    }
                  } else if (R.elementType === pt || typeof pt == "object" && pt !== null && pt.$$typeof === $ && jl(pt) === R.type) {
                    l(
                      Y,
                      R.sibling
                    ), at = r(R, G.props), Oi(at, G), at.return = Y, Y = at;
                    break t;
                  }
                  l(Y, R);
                  break;
                } else e(Y, R);
                R = R.sibling;
              }
              G.type === A ? (at = Rl(
                G.props.children,
                Y.mode,
                at,
                G.key
              ), at.return = Y, Y = at) : (at = au(
                G.type,
                G.key,
                G.props,
                null,
                Y.mode,
                at
              ), Oi(at, G), at.return = Y, Y = at);
            }
            return m(Y);
          case w:
            t: {
              for (pt = G.key; R !== null; ) {
                if (R.key === pt)
                  if (R.tag === 4 && R.stateNode.containerInfo === G.containerInfo && R.stateNode.implementation === G.implementation) {
                    l(
                      Y,
                      R.sibling
                    ), at = r(R, G.children || []), at.return = Y, Y = at;
                    break t;
                  } else {
                    l(Y, R);
                    break;
                  }
                else e(Y, R);
                R = R.sibling;
              }
              at = Mc(G, Y.mode, at), at.return = Y, Y = at;
            }
            return m(Y);
          case $:
            return G = jl(G), jt(
              Y,
              R,
              G,
              at
            );
        }
        if (V(G))
          return dt(
            Y,
            R,
            G,
            at
          );
        if (I(G)) {
          if (pt = I(G), typeof pt != "function") throw Error(u(150));
          return G = pt.call(G), vt(
            Y,
            R,
            G,
            at
          );
        }
        if (typeof G.then == "function")
          return jt(
            Y,
            R,
            fu(G),
            at
          );
        if (G.$$typeof === S)
          return jt(
            Y,
            R,
            uu(Y, G),
            at
          );
        du(Y, G);
      }
      return typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint" ? (G = "" + G, R !== null && R.tag === 6 ? (l(Y, R.sibling), at = r(R, G), at.return = Y, Y = at) : (l(Y, R), at = zc(G, Y.mode, at), at.return = Y, Y = at), m(Y)) : l(Y, R);
    }
    return function(Y, R, G, at) {
      try {
        Di = 0;
        var pt = jt(
          Y,
          R,
          G,
          at
        );
        return Oa = null, pt;
      } catch (ht) {
        if (ht === Da || ht === cu) throw ht;
        var Ot = De(29, ht, null, Y.mode);
        return Ot.lanes = at, Ot.return = Y, Ot;
      }
    };
  }
  var Vl = fh(!0), dh = fh(!1), al = !1;
  function Yc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function jc(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function il(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ol(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (Rt & 2) !== 0) {
      var r = a.pending;
      return r === null ? e.next = e : (e.next = r.next, r.next = e), a.pending = e, e = lu(t), Jd(t, null, l), e;
    }
    return nu(t, a, e, l), lu(t);
  }
  function Hi(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, Uo(t, l);
    }
  }
  function Lc(t, e) {
    var l = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, l === a)) {
      var r = null, c = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var m = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          c === null ? r = c = m : c = c.next = m, l = l.next;
        } while (l !== null);
        c === null ? r = c = e : c = c.next = e;
      } else r = c = e;
      l = {
        baseState: a.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: c,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = l;
      return;
    }
    t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
  }
  var Vc = !1;
  function Ri() {
    if (Vc) {
      var t = Ta;
      if (t !== null) throw t;
    }
  }
  function Bi(t, e, l, a) {
    Vc = !1;
    var r = t.updateQueue;
    al = !1;
    var c = r.firstBaseUpdate, m = r.lastBaseUpdate, x = r.shared.pending;
    if (x !== null) {
      r.shared.pending = null;
      var D = x, Q = D.next;
      D.next = null, m === null ? c = Q : m.next = Q, m = D;
      var et = t.alternate;
      et !== null && (et = et.updateQueue, x = et.lastBaseUpdate, x !== m && (x === null ? et.firstBaseUpdate = Q : x.next = Q, et.lastBaseUpdate = D));
    }
    if (c !== null) {
      var it = r.baseState;
      m = 0, et = Q = D = null, x = c;
      do {
        var K = x.lane & -536870913, F = K !== x.lane;
        if (F ? (At & K) === K : (a & K) === K) {
          K !== 0 && K === Ca && (Vc = !0), et !== null && (et = et.next = {
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: null,
            next: null
          });
          t: {
            var dt = t, vt = x;
            K = e;
            var jt = l;
            switch (vt.tag) {
              case 1:
                if (dt = vt.payload, typeof dt == "function") {
                  it = dt.call(jt, it, K);
                  break t;
                }
                it = dt;
                break t;
              case 3:
                dt.flags = dt.flags & -65537 | 128;
              case 0:
                if (dt = vt.payload, K = typeof dt == "function" ? dt.call(jt, it, K) : dt, K == null) break t;
                it = y({}, it, K);
                break t;
              case 2:
                al = !0;
            }
          }
          K = x.callback, K !== null && (t.flags |= 64, F && (t.flags |= 8192), F = r.callbacks, F === null ? r.callbacks = [K] : F.push(K));
        } else
          F = {
            lane: K,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          }, et === null ? (Q = et = F, D = it) : et = et.next = F, m |= K;
        if (x = x.next, x === null) {
          if (x = r.shared.pending, x === null)
            break;
          F = x, x = F.next, F.next = null, r.lastBaseUpdate = F, r.shared.pending = null;
        }
      } while (!0);
      et === null && (D = it), r.baseState = D, r.firstBaseUpdate = Q, r.lastBaseUpdate = et, c === null && (r.shared.lanes = 0), fl |= m, t.lanes = m, t.memoizedState = it;
    }
  }
  function hh(t, e) {
    if (typeof t != "function")
      throw Error(u(191, t));
    t.call(e);
  }
  function gh(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        hh(l[t], e);
  }
  var Ha = z(null), hu = z(0);
  function mh(t, e) {
    t = jn, P(hu, t), P(Ha, e), jn = t | e.baseLanes;
  }
  function qc() {
    P(hu, jn), P(Ha, Ha.current);
  }
  function Xc() {
    jn = hu.current, H(Ha), H(hu);
  }
  var Oe = z(null), Je = null;
  function ul(t) {
    var e = t.alternate;
    P(Wt, Wt.current & 1), P(Oe, t), Je === null && (e === null || Ha.current !== null || e.memoizedState !== null) && (Je = t);
  }
  function Zc(t) {
    P(Wt, Wt.current), P(Oe, t), Je === null && (Je = t);
  }
  function ph(t) {
    t.tag === 22 ? (P(Wt, Wt.current), P(Oe, t), Je === null && (Je = t)) : rl();
  }
  function rl() {
    P(Wt, Wt.current), P(Oe, Oe.current);
  }
  function He(t) {
    H(Oe), Je === t && (Je = null), H(Wt);
  }
  var Wt = z(0);
  function gu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Ws(l) || Fs(l)))
          return e;
      } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Dn = 0, wt = null, kt = null, te = null, mu = !1, Ra = !1, ql = !1, pu = 0, Ui = 0, Ba = null, d1 = 0;
  function $t() {
    throw Error(u(321));
  }
  function Gc(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Te(t[l], e[l])) return !1;
    return !0;
  }
  function Qc(t, e, l, a, r, c) {
    return Dn = c, wt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, E.H = t === null || t.memoizedState === null ? Ph : us, ql = !1, c = l(a, r), ql = !1, Ra && (c = vh(
      e,
      l,
      a,
      r
    )), yh(t), c;
  }
  function yh(t) {
    E.H = ji;
    var e = kt !== null && kt.next !== null;
    if (Dn = 0, te = kt = wt = null, mu = !1, Ui = 0, Ba = null, e) throw Error(u(300));
    t === null || ee || (t = t.dependencies, t !== null && ou(t) && (ee = !0));
  }
  function vh(t, e, l, a) {
    wt = t;
    var r = 0;
    do {
      if (Ra && (Ba = null), Ui = 0, Ra = !1, 25 <= r) throw Error(u(301));
      if (r += 1, te = kt = null, t.updateQueue != null) {
        var c = t.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      E.H = t0, c = e(l, a);
    } while (Ra);
    return c;
  }
  function h1() {
    var t = E.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? ki(e) : e, t = t.useState()[0], (kt !== null ? kt.memoizedState : null) !== t && (wt.flags |= 1024), e;
  }
  function $c() {
    var t = pu !== 0;
    return pu = 0, t;
  }
  function Kc(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function Jc(t) {
    if (mu) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      mu = !1;
    }
    Dn = 0, te = kt = wt = null, Ra = !1, Ui = pu = 0, Ba = null;
  }
  function pe() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return te === null ? wt.memoizedState = te = t : te = te.next = t, te;
  }
  function Ft() {
    if (kt === null) {
      var t = wt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = kt.next;
    var e = te === null ? wt.memoizedState : te.next;
    if (e !== null)
      te = e, kt = t;
    else {
      if (t === null)
        throw wt.alternate === null ? Error(u(467)) : Error(u(310));
      kt = t, t = {
        memoizedState: kt.memoizedState,
        baseState: kt.baseState,
        baseQueue: kt.baseQueue,
        queue: kt.queue,
        next: null
      }, te === null ? wt.memoizedState = te = t : te = te.next = t;
    }
    return te;
  }
  function yu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ki(t) {
    var e = Ui;
    return Ui += 1, Ba === null && (Ba = []), t = rh(Ba, t, e), e = wt, (te === null ? e.memoizedState : te.next) === null && (e = e.alternate, E.H = e === null || e.memoizedState === null ? Ph : us), t;
  }
  function vu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return ki(t);
      if (t.$$typeof === S) return re(t);
    }
    throw Error(u(438, String(t)));
  }
  function Wc(t) {
    var e = null, l = wt.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var a = wt.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(r) {
          return r.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = yu(), wt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = ut;
    return e.index++, l;
  }
  function On(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function bu(t) {
    var e = Ft();
    return Fc(e, kt, t);
  }
  function Fc(t, e, l) {
    var a = t.queue;
    if (a === null) throw Error(u(311));
    a.lastRenderedReducer = l;
    var r = t.baseQueue, c = a.pending;
    if (c !== null) {
      if (r !== null) {
        var m = r.next;
        r.next = c.next, c.next = m;
      }
      e.baseQueue = r = c, a.pending = null;
    }
    if (c = t.baseState, r === null) t.memoizedState = c;
    else {
      e = r.next;
      var x = m = null, D = null, Q = e, et = !1;
      do {
        var it = Q.lane & -536870913;
        if (it !== Q.lane ? (At & it) === it : (Dn & it) === it) {
          var K = Q.revertLane;
          if (K === 0)
            D !== null && (D = D.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: Q.action,
              hasEagerState: Q.hasEagerState,
              eagerState: Q.eagerState,
              next: null
            }), it === Ca && (et = !0);
          else if ((Dn & K) === K) {
            Q = Q.next, K === Ca && (et = !0);
            continue;
          } else
            it = {
              lane: 0,
              revertLane: Q.revertLane,
              gesture: null,
              action: Q.action,
              hasEagerState: Q.hasEagerState,
              eagerState: Q.eagerState,
              next: null
            }, D === null ? (x = D = it, m = c) : D = D.next = it, wt.lanes |= K, fl |= K;
          it = Q.action, ql && l(c, it), c = Q.hasEagerState ? Q.eagerState : l(c, it);
        } else
          K = {
            lane: it,
            revertLane: Q.revertLane,
            gesture: Q.gesture,
            action: Q.action,
            hasEagerState: Q.hasEagerState,
            eagerState: Q.eagerState,
            next: null
          }, D === null ? (x = D = K, m = c) : D = D.next = K, wt.lanes |= it, fl |= it;
        Q = Q.next;
      } while (Q !== null && Q !== e);
      if (D === null ? m = c : D.next = x, !Te(c, t.memoizedState) && (ee = !0, et && (l = Ta, l !== null)))
        throw l;
      t.memoizedState = c, t.baseState = m, t.baseQueue = D, a.lastRenderedState = c;
    }
    return r === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Ic(t) {
    var e = Ft(), l = e.queue;
    if (l === null) throw Error(u(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch, r = l.pending, c = e.memoizedState;
    if (r !== null) {
      l.pending = null;
      var m = r = r.next;
      do
        c = t(c, m.action), m = m.next;
      while (m !== r);
      Te(c, e.memoizedState) || (ee = !0), e.memoizedState = c, e.baseQueue === null && (e.baseState = c), l.lastRenderedState = c;
    }
    return [c, a];
  }
  function bh(t, e, l) {
    var a = wt, r = Ft(), c = Tt;
    if (c) {
      if (l === void 0) throw Error(u(407));
      l = l();
    } else l = e();
    var m = !Te(
      (kt || r).memoizedState,
      l
    );
    if (m && (r.memoizedState = l, ee = !0), r = r.queue, es(Sh.bind(null, a, r, t), [
      t
    ]), r.getSnapshot !== e || m || te !== null && te.memoizedState.tag & 1) {
      if (a.flags |= 2048, Ua(
        9,
        { destroy: void 0 },
        _h.bind(
          null,
          a,
          r,
          l,
          e
        ),
        null
      ), Lt === null) throw Error(u(349));
      c || (Dn & 127) !== 0 || xh(a, e, l);
    }
    return l;
  }
  function xh(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = wt.updateQueue, e === null ? (e = yu(), wt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function _h(t, e, l, a) {
    e.value = l, e.getSnapshot = a, wh(e) && Eh(t);
  }
  function Sh(t, e, l) {
    return l(function() {
      wh(e) && Eh(t);
    });
  }
  function wh(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Te(t, l);
    } catch {
      return !0;
    }
  }
  function Eh(t) {
    var e = Hl(t, 2);
    e !== null && Me(e, t, 2);
  }
  function Pc(t) {
    var e = pe();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), ql) {
        fn(!0);
        try {
          l();
        } finally {
          fn(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: On,
      lastRenderedState: t
    }, e;
  }
  function zh(t, e, l, a) {
    return t.baseState = l, Fc(
      t,
      kt,
      typeof a == "function" ? a : On
    );
  }
  function g1(t, e, l, a, r) {
    if (Su(t)) throw Error(u(485));
    if (t = e.action, t !== null) {
      var c = {
        payload: r,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(m) {
          c.listeners.push(m);
        }
      };
      E.T !== null ? l(!0) : c.isTransition = !1, a(c), l = e.pending, l === null ? (c.next = e.pending = c, Mh(e, c)) : (c.next = l.next, e.pending = l.next = c);
    }
  }
  function Mh(t, e) {
    var l = e.action, a = e.payload, r = t.state;
    if (e.isTransition) {
      var c = E.T, m = {};
      E.T = m;
      try {
        var x = l(r, a), D = E.S;
        D !== null && D(m, x), Nh(t, e, x);
      } catch (Q) {
        ts(t, e, Q);
      } finally {
        c !== null && m.types !== null && (c.types = m.types), E.T = c;
      }
    } else
      try {
        c = l(r, a), Nh(t, e, c);
      } catch (Q) {
        ts(t, e, Q);
      }
  }
  function Nh(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        Ah(t, e, a);
      },
      function(a) {
        return ts(t, e, a);
      }
    ) : Ah(t, e, l);
  }
  function Ah(t, e, l) {
    e.status = "fulfilled", e.value = l, Ch(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, Mh(t, l)));
  }
  function ts(t, e, l) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        e.status = "rejected", e.reason = l, Ch(e), e = e.next;
      while (e !== a);
    }
    t.action = null;
  }
  function Ch(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Th(t, e) {
    return e;
  }
  function Dh(t, e) {
    if (Tt) {
      var l = Lt.formState;
      if (l !== null) {
        t: {
          var a = wt;
          if (Tt) {
            if (qt) {
              e: {
                for (var r = qt, c = Ke; r.nodeType !== 8; ) {
                  if (!c) {
                    r = null;
                    break e;
                  }
                  if (r = We(
                    r.nextSibling
                  ), r === null) {
                    r = null;
                    break e;
                  }
                }
                c = r.data, r = c === "F!" || c === "F" ? r : null;
              }
              if (r) {
                qt = We(
                  r.nextSibling
                ), a = r.data === "F!";
                break t;
              }
            }
            nl(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return l = pe(), l.memoizedState = l.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Th,
      lastRenderedState: e
    }, l.queue = a, l = Wh.bind(
      null,
      wt,
      a
    ), a.dispatch = l, a = Pc(!1), c = os.bind(
      null,
      wt,
      !1,
      a.queue
    ), a = pe(), r = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = r, l = g1.bind(
      null,
      wt,
      r,
      c,
      l
    ), r.dispatch = l, a.memoizedState = t, [e, l, !1];
  }
  function Oh(t) {
    var e = Ft();
    return Hh(e, kt, t);
  }
  function Hh(t, e, l) {
    if (e = Fc(
      t,
      e,
      Th
    )[0], t = bu(On)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = ki(e);
      } catch (m) {
        throw m === Da ? cu : m;
      }
    else a = e;
    e = Ft();
    var r = e.queue, c = r.dispatch;
    return l !== e.memoizedState && (wt.flags |= 2048, Ua(
      9,
      { destroy: void 0 },
      m1.bind(null, r, l),
      null
    )), [a, c, t];
  }
  function m1(t, e) {
    t.action = e;
  }
  function Rh(t) {
    var e = Ft(), l = kt;
    if (l !== null)
      return Hh(e, l, t);
    Ft(), e = e.memoizedState, l = Ft();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function Ua(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = wt.updateQueue, e === null && (e = yu(), wt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function Bh() {
    return Ft().memoizedState;
  }
  function xu(t, e, l, a) {
    var r = pe();
    wt.flags |= t, r.memoizedState = Ua(
      1 | e,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function _u(t, e, l, a) {
    var r = Ft();
    a = a === void 0 ? null : a;
    var c = r.memoizedState.inst;
    kt !== null && a !== null && Gc(a, kt.memoizedState.deps) ? r.memoizedState = Ua(e, c, l, a) : (wt.flags |= t, r.memoizedState = Ua(
      1 | e,
      c,
      l,
      a
    ));
  }
  function Uh(t, e) {
    xu(8390656, 8, t, e);
  }
  function es(t, e) {
    _u(2048, 8, t, e);
  }
  function p1(t) {
    wt.flags |= 4;
    var e = wt.updateQueue;
    if (e === null)
      e = yu(), wt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function kh(t) {
    var e = Ft().memoizedState;
    return p1({ ref: e, nextImpl: t }), function() {
      if ((Rt & 2) !== 0) throw Error(u(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Yh(t, e) {
    return _u(4, 2, t, e);
  }
  function jh(t, e) {
    return _u(4, 4, t, e);
  }
  function Lh(t, e) {
    if (typeof e == "function") {
      t = t();
      var l = e(t);
      return function() {
        typeof l == "function" ? l() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function Vh(t, e, l) {
    l = l != null ? l.concat([t]) : null, _u(4, 4, Lh.bind(null, e, t), l);
  }
  function ns() {
  }
  function qh(t, e) {
    var l = Ft();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && Gc(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
  }
  function Xh(t, e) {
    var l = Ft();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && Gc(e, a[1]))
      return a[0];
    if (a = t(), ql) {
      fn(!0);
      try {
        t();
      } finally {
        fn(!1);
      }
    }
    return l.memoizedState = [a, e], a;
  }
  function ls(t, e, l) {
    return l === void 0 || (Dn & 1073741824) !== 0 && (At & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Z0(), wt.lanes |= t, fl |= t, l);
  }
  function Zh(t, e, l, a) {
    return Te(l, e) ? l : Ha.current !== null ? (t = ls(t, l, a), Te(t, e) || (ee = !0), t) : (Dn & 42) === 0 || (Dn & 1073741824) !== 0 && (At & 261930) === 0 ? (ee = !0, t.memoizedState = l) : (t = Z0(), wt.lanes |= t, fl |= t, e);
  }
  function Gh(t, e, l, a, r) {
    var c = O.p;
    O.p = c !== 0 && 8 > c ? c : 8;
    var m = E.T, x = {};
    E.T = x, os(t, !1, e, l);
    try {
      var D = r(), Q = E.S;
      if (Q !== null && Q(x, D), D !== null && typeof D == "object" && typeof D.then == "function") {
        var et = f1(
          D,
          a
        );
        Yi(
          t,
          e,
          et,
          Ue(t)
        );
      } else
        Yi(
          t,
          e,
          a,
          Ue(t)
        );
    } catch (it) {
      Yi(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: it },
        Ue()
      );
    } finally {
      O.p = c, m !== null && x.types !== null && (m.types = x.types), E.T = m;
    }
  }
  function y1() {
  }
  function as(t, e, l, a) {
    if (t.tag !== 5) throw Error(u(476));
    var r = Qh(t).queue;
    Gh(
      t,
      r,
      e,
      q,
      l === null ? y1 : function() {
        return $h(t), l(a);
      }
    );
  }
  function Qh(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: q,
      baseState: q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: On,
        lastRenderedState: q
      },
      next: null
    };
    var l = {};
    return e.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: On,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function $h(t) {
    var e = Qh(t);
    e.next === null && (e = t.alternate.memoizedState), Yi(
      t,
      e.next.queue,
      {},
      Ue()
    );
  }
  function is() {
    return re(eo);
  }
  function Kh() {
    return Ft().memoizedState;
  }
  function Jh() {
    return Ft().memoizedState;
  }
  function v1(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Ue();
          t = il(l);
          var a = ol(e, t, l);
          a !== null && (Me(a, e, l), Hi(a, e, l)), e = { cache: Rc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function b1(t, e, l) {
    var a = Ue();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Su(t) ? Fh(e, l) : (l = wc(t, e, l, a), l !== null && (Me(l, t, a), Ih(l, e, a)));
  }
  function Wh(t, e, l) {
    var a = Ue();
    Yi(t, e, l, a);
  }
  function Yi(t, e, l, a) {
    var r = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Su(t)) Fh(e, r);
    else {
      var c = t.alternate;
      if (t.lanes === 0 && (c === null || c.lanes === 0) && (c = e.lastRenderedReducer, c !== null))
        try {
          var m = e.lastRenderedState, x = c(m, l);
          if (r.hasEagerState = !0, r.eagerState = x, Te(x, m))
            return nu(t, e, r, 0), Lt === null && eu(), !1;
        } catch {
        }
      if (l = wc(t, e, r, a), l !== null)
        return Me(l, t, a), Ih(l, e, a), !0;
    }
    return !1;
  }
  function os(t, e, l, a) {
    if (a = {
      lane: 2,
      revertLane: Ys(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Su(t)) {
      if (e) throw Error(u(479));
    } else
      e = wc(
        t,
        l,
        a,
        2
      ), e !== null && Me(e, t, 2);
  }
  function Su(t) {
    var e = t.alternate;
    return t === wt || e !== null && e === wt;
  }
  function Fh(t, e) {
    Ra = mu = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function Ih(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, Uo(t, l);
    }
  }
  var ji = {
    readContext: re,
    use: vu,
    useCallback: $t,
    useContext: $t,
    useEffect: $t,
    useImperativeHandle: $t,
    useLayoutEffect: $t,
    useInsertionEffect: $t,
    useMemo: $t,
    useReducer: $t,
    useRef: $t,
    useState: $t,
    useDebugValue: $t,
    useDeferredValue: $t,
    useTransition: $t,
    useSyncExternalStore: $t,
    useId: $t,
    useHostTransitionStatus: $t,
    useFormState: $t,
    useActionState: $t,
    useOptimistic: $t,
    useMemoCache: $t,
    useCacheRefresh: $t
  };
  ji.useEffectEvent = $t;
  var Ph = {
    readContext: re,
    use: vu,
    useCallback: function(t, e) {
      return pe().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: re,
    useEffect: Uh,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, xu(
        4194308,
        4,
        Lh.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return xu(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      xu(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = pe();
      e = e === void 0 ? null : e;
      var a = t();
      if (ql) {
        fn(!0);
        try {
          t();
        } finally {
          fn(!1);
        }
      }
      return l.memoizedState = [a, e], a;
    },
    useReducer: function(t, e, l) {
      var a = pe();
      if (l !== void 0) {
        var r = l(e);
        if (ql) {
          fn(!0);
          try {
            l(e);
          } finally {
            fn(!1);
          }
        }
      } else r = e;
      return a.memoizedState = a.baseState = r, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: r
      }, a.queue = t, t = t.dispatch = b1.bind(
        null,
        wt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = pe();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Pc(t);
      var e = t.queue, l = Wh.bind(null, wt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: ns,
    useDeferredValue: function(t, e) {
      var l = pe();
      return ls(l, t, e);
    },
    useTransition: function() {
      var t = Pc(!1);
      return t = Gh.bind(
        null,
        wt,
        t.queue,
        !0,
        !1
      ), pe().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var a = wt, r = pe();
      if (Tt) {
        if (l === void 0)
          throw Error(u(407));
        l = l();
      } else {
        if (l = e(), Lt === null)
          throw Error(u(349));
        (At & 127) !== 0 || xh(a, e, l);
      }
      r.memoizedState = l;
      var c = { value: l, getSnapshot: e };
      return r.queue = c, Uh(Sh.bind(null, a, c, t), [
        t
      ]), a.flags |= 2048, Ua(
        9,
        { destroy: void 0 },
        _h.bind(
          null,
          a,
          c,
          l,
          e
        ),
        null
      ), l;
    },
    useId: function() {
      var t = pe(), e = Lt.identifierPrefix;
      if (Tt) {
        var l = gn, a = hn;
        l = (a & ~(1 << 32 - me(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = pu++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = d1++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: is,
    useFormState: Dh,
    useActionState: Dh,
    useOptimistic: function(t) {
      var e = pe();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = os.bind(
        null,
        wt,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: Wc,
    useCacheRefresh: function() {
      return pe().memoizedState = v1.bind(
        null,
        wt
      );
    },
    useEffectEvent: function(t) {
      var e = pe(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((Rt & 2) !== 0)
          throw Error(u(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, us = {
    readContext: re,
    use: vu,
    useCallback: qh,
    useContext: re,
    useEffect: es,
    useImperativeHandle: Vh,
    useInsertionEffect: Yh,
    useLayoutEffect: jh,
    useMemo: Xh,
    useReducer: bu,
    useRef: Bh,
    useState: function() {
      return bu(On);
    },
    useDebugValue: ns,
    useDeferredValue: function(t, e) {
      var l = Ft();
      return Zh(
        l,
        kt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = bu(On)[0], e = Ft().memoizedState;
      return [
        typeof t == "boolean" ? t : ki(t),
        e
      ];
    },
    useSyncExternalStore: bh,
    useId: Kh,
    useHostTransitionStatus: is,
    useFormState: Oh,
    useActionState: Oh,
    useOptimistic: function(t, e) {
      var l = Ft();
      return zh(l, kt, t, e);
    },
    useMemoCache: Wc,
    useCacheRefresh: Jh
  };
  us.useEffectEvent = kh;
  var t0 = {
    readContext: re,
    use: vu,
    useCallback: qh,
    useContext: re,
    useEffect: es,
    useImperativeHandle: Vh,
    useInsertionEffect: Yh,
    useLayoutEffect: jh,
    useMemo: Xh,
    useReducer: Ic,
    useRef: Bh,
    useState: function() {
      return Ic(On);
    },
    useDebugValue: ns,
    useDeferredValue: function(t, e) {
      var l = Ft();
      return kt === null ? ls(l, t, e) : Zh(
        l,
        kt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Ic(On)[0], e = Ft().memoizedState;
      return [
        typeof t == "boolean" ? t : ki(t),
        e
      ];
    },
    useSyncExternalStore: bh,
    useId: Kh,
    useHostTransitionStatus: is,
    useFormState: Rh,
    useActionState: Rh,
    useOptimistic: function(t, e) {
      var l = Ft();
      return kt !== null ? zh(l, kt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: Wc,
    useCacheRefresh: Jh
  };
  t0.useEffectEvent = kh;
  function rs(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : y({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var cs = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var a = Ue(), r = il(a);
      r.payload = e, l != null && (r.callback = l), e = ol(t, r, a), e !== null && (Me(e, t, a), Hi(e, t, a));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var a = Ue(), r = il(a);
      r.tag = 1, r.payload = e, l != null && (r.callback = l), e = ol(t, r, a), e !== null && (Me(e, t, a), Hi(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = Ue(), a = il(l);
      a.tag = 2, e != null && (a.callback = e), e = ol(t, a, l), e !== null && (Me(e, t, l), Hi(e, t, l));
    }
  };
  function e0(t, e, l, a, r, c, m) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, c, m) : e.prototype && e.prototype.isPureReactComponent ? !zi(l, a) || !zi(r, c) : !0;
  }
  function n0(t, e, l, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && cs.enqueueReplaceState(e, e.state, null);
  }
  function Xl(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var a in e)
        a !== "ref" && (l[a] = e[a]);
    }
    if (t = t.defaultProps) {
      l === e && (l = y({}, l));
      for (var r in t)
        l[r] === void 0 && (l[r] = t[r]);
    }
    return l;
  }
  function l0(t) {
    tu(t);
  }
  function a0(t) {
    console.error(t);
  }
  function i0(t) {
    tu(t);
  }
  function wu(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function o0(t, e, l) {
    try {
      var a = t.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function ss(t, e, l) {
    return l = il(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      wu(t, e);
    }, l;
  }
  function u0(t) {
    return t = il(t), t.tag = 3, t;
  }
  function r0(t, e, l, a) {
    var r = l.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var c = a.value;
      t.payload = function() {
        return r(c);
      }, t.callback = function() {
        o0(e, l, a);
      };
    }
    var m = l.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (t.callback = function() {
      o0(e, l, a), typeof r != "function" && (dl === null ? dl = /* @__PURE__ */ new Set([this]) : dl.add(this));
      var x = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: x !== null ? x : ""
      });
    });
  }
  function x1(t, e, l, a, r) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = l.alternate, e !== null && Aa(
        e,
        l,
        r,
        !0
      ), l = Oe.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Je === null ? Bu() : l.alternate === null && Kt === 0 && (Kt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = r, a === su ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), Bs(t, a, r)), !1;
          case 22:
            return l.flags |= 65536, a === su ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), Bs(t, a, r)), !1;
        }
        throw Error(u(435, l.tag));
      }
      return Bs(t, a, r), Bu(), !1;
    }
    if (Tt)
      return e = Oe.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = r, a !== Cc && (t = Error(u(422), { cause: a }), Ai(Ge(t, l)))) : (a !== Cc && (e = Error(u(423), {
        cause: a
      }), Ai(
        Ge(e, l)
      )), t = t.current.alternate, t.flags |= 65536, r &= -r, t.lanes |= r, a = Ge(a, l), r = ss(
        t.stateNode,
        a,
        r
      ), Lc(t, r), Kt !== 4 && (Kt = 2)), !1;
    var c = Error(u(520), { cause: a });
    if (c = Ge(c, l), $i === null ? $i = [c] : $i.push(c), Kt !== 4 && (Kt = 2), e === null) return !0;
    a = Ge(a, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = r & -r, l.lanes |= t, t = ss(l.stateNode, a, t), Lc(l, t), !1;
        case 1:
          if (e = l.type, c = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (dl === null || !dl.has(c))))
            return l.flags |= 65536, r &= -r, l.lanes |= r, r = u0(r), r0(
              r,
              t,
              l,
              a
            ), Lc(l, r), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var fs = Error(u(461)), ee = !1;
  function ce(t, e, l, a) {
    e.child = t === null ? dh(e, null, l, a) : Vl(
      e,
      t.child,
      l,
      a
    );
  }
  function c0(t, e, l, a, r) {
    l = l.render;
    var c = e.ref;
    if ("ref" in a) {
      var m = {};
      for (var x in a)
        x !== "ref" && (m[x] = a[x]);
    } else m = a;
    return kl(e), a = Qc(
      t,
      e,
      l,
      m,
      c,
      r
    ), x = $c(), t !== null && !ee ? (Kc(t, e, r), Hn(t, e, r)) : (Tt && x && Nc(e), e.flags |= 1, ce(t, e, a, r), e.child);
  }
  function s0(t, e, l, a, r) {
    if (t === null) {
      var c = l.type;
      return typeof c == "function" && !Ec(c) && c.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = c, f0(
        t,
        e,
        c,
        a,
        r
      )) : (t = au(
        l.type,
        null,
        a,
        e,
        e.mode,
        r
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (c = t.child, !bs(t, r)) {
      var m = c.memoizedProps;
      if (l = l.compare, l = l !== null ? l : zi, l(m, a) && t.ref === e.ref)
        return Hn(t, e, r);
    }
    return e.flags |= 1, t = Nn(c, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function f0(t, e, l, a, r) {
    if (t !== null) {
      var c = t.memoizedProps;
      if (zi(c, a) && t.ref === e.ref)
        if (ee = !1, e.pendingProps = a = c, bs(t, r))
          (t.flags & 131072) !== 0 && (ee = !0);
        else
          return e.lanes = t.lanes, Hn(t, e, r);
    }
    return ds(
      t,
      e,
      l,
      a,
      r
    );
  }
  function d0(t, e, l, a) {
    var r = a.children, c = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | l : l, t !== null) {
          for (a = e.child = t.child, r = 0; a !== null; )
            r = r | a.lanes | a.childLanes, a = a.sibling;
          a = r & ~c;
        } else a = 0, e.child = null;
        return h0(
          t,
          e,
          c,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && ru(
          e,
          c !== null ? c.cachePool : null
        ), c !== null ? mh(e, c) : qc(), ph(e);
      else
        return a = e.lanes = 536870912, h0(
          t,
          e,
          c !== null ? c.baseLanes | l : l,
          l,
          a
        );
    } else
      c !== null ? (ru(e, c.cachePool), mh(e, c), rl(), e.memoizedState = null) : (t !== null && ru(e, null), qc(), rl());
    return ce(t, e, r, l), e.child;
  }
  function Li(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function h0(t, e, l, a, r) {
    var c = Uc();
    return c = c === null ? null : { parent: Pt._currentValue, pool: c }, e.memoizedState = {
      baseLanes: l,
      cachePool: c
    }, t !== null && ru(e, null), qc(), ph(e), t !== null && Aa(t, e, a, !0), e.childLanes = r, null;
  }
  function Eu(t, e) {
    return e = Mu(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function g0(t, e, l) {
    return Vl(e, t.child, null, l), t = Eu(e, e.pendingProps), t.flags |= 2, He(e), e.memoizedState = null, t;
  }
  function _1(t, e, l) {
    var a = e.pendingProps, r = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (Tt) {
        if (a.mode === "hidden")
          return t = Eu(e, a), e.lanes = 536870912, Li(null, t);
        if (Zc(e), (t = qt) ? (t = Mg(
          t,
          Ke
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: tl !== null ? { id: hn, overflow: gn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Fd(t), l.return = e, e.child = l, ue = e, qt = null)) : t = null, t === null) throw nl(e);
        return e.lanes = 536870912, null;
      }
      return Eu(e, a);
    }
    var c = t.memoizedState;
    if (c !== null) {
      var m = c.dehydrated;
      if (Zc(e), r)
        if (e.flags & 256)
          e.flags &= -257, e = g0(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(u(558));
      else if (ee || Aa(t, e, l, !1), r = (l & t.childLanes) !== 0, ee || r) {
        if (a = Lt, a !== null && (m = ko(a, l), m !== 0 && m !== c.retryLane))
          throw c.retryLane = m, Hl(t, m), Me(a, t, m), fs;
        Bu(), e = g0(
          t,
          e,
          l
        );
      } else
        t = c.treeContext, qt = We(m.nextSibling), ue = e, Tt = !0, el = null, Ke = !1, t !== null && th(e, t), e = Eu(e, a), e.flags |= 4096;
      return e;
    }
    return t = Nn(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function zu(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(u(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function ds(t, e, l, a, r) {
    return kl(e), l = Qc(
      t,
      e,
      l,
      a,
      void 0,
      r
    ), a = $c(), t !== null && !ee ? (Kc(t, e, r), Hn(t, e, r)) : (Tt && a && Nc(e), e.flags |= 1, ce(t, e, l, r), e.child);
  }
  function m0(t, e, l, a, r, c) {
    return kl(e), e.updateQueue = null, l = vh(
      e,
      a,
      l,
      r
    ), yh(t), a = $c(), t !== null && !ee ? (Kc(t, e, c), Hn(t, e, c)) : (Tt && a && Nc(e), e.flags |= 1, ce(t, e, l, c), e.child);
  }
  function p0(t, e, l, a, r) {
    if (kl(e), e.stateNode === null) {
      var c = Ea, m = l.contextType;
      typeof m == "object" && m !== null && (c = re(m)), c = new l(a, c), e.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = cs, e.stateNode = c, c._reactInternals = e, c = e.stateNode, c.props = a, c.state = e.memoizedState, c.refs = {}, Yc(e), m = l.contextType, c.context = typeof m == "object" && m !== null ? re(m) : Ea, c.state = e.memoizedState, m = l.getDerivedStateFromProps, typeof m == "function" && (rs(
        e,
        l,
        m,
        a
      ), c.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (m = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), m !== c.state && cs.enqueueReplaceState(c, c.state, null), Bi(e, a, c, r), Ri(), c.state = e.memoizedState), typeof c.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      c = e.stateNode;
      var x = e.memoizedProps, D = Xl(l, x);
      c.props = D;
      var Q = c.context, et = l.contextType;
      m = Ea, typeof et == "object" && et !== null && (m = re(et));
      var it = l.getDerivedStateFromProps;
      et = typeof it == "function" || typeof c.getSnapshotBeforeUpdate == "function", x = e.pendingProps !== x, et || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (x || Q !== m) && n0(
        e,
        c,
        a,
        m
      ), al = !1;
      var K = e.memoizedState;
      c.state = K, Bi(e, a, c, r), Ri(), Q = e.memoizedState, x || K !== Q || al ? (typeof it == "function" && (rs(
        e,
        l,
        it,
        a
      ), Q = e.memoizedState), (D = al || e0(
        e,
        l,
        D,
        a,
        K,
        Q,
        m
      )) ? (et || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = Q), c.props = a, c.state = Q, c.context = m, a = D) : (typeof c.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      c = e.stateNode, jc(t, e), m = e.memoizedProps, et = Xl(l, m), c.props = et, it = e.pendingProps, K = c.context, Q = l.contextType, D = Ea, typeof Q == "object" && Q !== null && (D = re(Q)), x = l.getDerivedStateFromProps, (Q = typeof x == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (m !== it || K !== D) && n0(
        e,
        c,
        a,
        D
      ), al = !1, K = e.memoizedState, c.state = K, Bi(e, a, c, r), Ri();
      var F = e.memoizedState;
      m !== it || K !== F || al || t !== null && t.dependencies !== null && ou(t.dependencies) ? (typeof x == "function" && (rs(
        e,
        l,
        x,
        a
      ), F = e.memoizedState), (et = al || e0(
        e,
        l,
        et,
        a,
        K,
        F,
        D
      ) || t !== null && t.dependencies !== null && ou(t.dependencies)) ? (Q || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(a, F, D), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        a,
        F,
        D
      )), typeof c.componentDidUpdate == "function" && (e.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || m === t.memoizedProps && K === t.memoizedState || (e.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || m === t.memoizedProps && K === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = F), c.props = a, c.state = F, c.context = D, a = et) : (typeof c.componentDidUpdate != "function" || m === t.memoizedProps && K === t.memoizedState || (e.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || m === t.memoizedProps && K === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return c = a, zu(t, e), a = (e.flags & 128) !== 0, c || a ? (c = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : c.render(), e.flags |= 1, t !== null && a ? (e.child = Vl(
      e,
      t.child,
      null,
      r
    ), e.child = Vl(
      e,
      null,
      l,
      r
    )) : ce(t, e, l, r), e.memoizedState = c.state, t = e.child) : t = Hn(
      t,
      e,
      r
    ), t;
  }
  function y0(t, e, l, a) {
    return Bl(), e.flags |= 256, ce(t, e, l, a), e.child;
  }
  var hs = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function gs(t) {
    return { baseLanes: t, cachePool: oh() };
  }
  function ms(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Be), t;
  }
  function v0(t, e, l) {
    var a = e.pendingProps, r = !1, c = (e.flags & 128) !== 0, m;
    if ((m = c) || (m = t !== null && t.memoizedState === null ? !1 : (Wt.current & 2) !== 0), m && (r = !0, e.flags &= -129), m = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (Tt) {
        if (r ? ul(e) : rl(), (t = qt) ? (t = Mg(
          t,
          Ke
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: tl !== null ? { id: hn, overflow: gn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Fd(t), l.return = e, e.child = l, ue = e, qt = null)) : t = null, t === null) throw nl(e);
        return Fs(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var x = a.children;
      return a = a.fallback, r ? (rl(), r = e.mode, x = Mu(
        { mode: "hidden", children: x },
        r
      ), a = Rl(
        a,
        r,
        l,
        null
      ), x.return = e, a.return = e, x.sibling = a, e.child = x, a = e.child, a.memoizedState = gs(l), a.childLanes = ms(
        t,
        m,
        l
      ), e.memoizedState = hs, Li(null, a)) : (ul(e), ps(e, x));
    }
    var D = t.memoizedState;
    if (D !== null && (x = D.dehydrated, x !== null)) {
      if (c)
        e.flags & 256 ? (ul(e), e.flags &= -257, e = ys(
          t,
          e,
          l
        )) : e.memoizedState !== null ? (rl(), e.child = t.child, e.flags |= 128, e = null) : (rl(), x = a.fallback, r = e.mode, a = Mu(
          { mode: "visible", children: a.children },
          r
        ), x = Rl(
          x,
          r,
          l,
          null
        ), x.flags |= 2, a.return = e, x.return = e, a.sibling = x, e.child = a, Vl(
          e,
          t.child,
          null,
          l
        ), a = e.child, a.memoizedState = gs(l), a.childLanes = ms(
          t,
          m,
          l
        ), e.memoizedState = hs, e = Li(null, a));
      else if (ul(e), Fs(x)) {
        if (m = x.nextSibling && x.nextSibling.dataset, m) var Q = m.dgst;
        m = Q, a = Error(u(419)), a.stack = "", a.digest = m, Ai({ value: a, source: null, stack: null }), e = ys(
          t,
          e,
          l
        );
      } else if (ee || Aa(t, e, l, !1), m = (l & t.childLanes) !== 0, ee || m) {
        if (m = Lt, m !== null && (a = ko(m, l), a !== 0 && a !== D.retryLane))
          throw D.retryLane = a, Hl(t, a), Me(m, t, a), fs;
        Ws(x) || Bu(), e = ys(
          t,
          e,
          l
        );
      } else
        Ws(x) ? (e.flags |= 192, e.child = t.child, e = null) : (t = D.treeContext, qt = We(
          x.nextSibling
        ), ue = e, Tt = !0, el = null, Ke = !1, t !== null && th(e, t), e = ps(
          e,
          a.children
        ), e.flags |= 4096);
      return e;
    }
    return r ? (rl(), x = a.fallback, r = e.mode, D = t.child, Q = D.sibling, a = Nn(D, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = D.subtreeFlags & 65011712, Q !== null ? x = Nn(
      Q,
      x
    ) : (x = Rl(
      x,
      r,
      l,
      null
    ), x.flags |= 2), x.return = e, a.return = e, a.sibling = x, e.child = a, Li(null, a), a = e.child, x = t.child.memoizedState, x === null ? x = gs(l) : (r = x.cachePool, r !== null ? (D = Pt._currentValue, r = r.parent !== D ? { parent: D, pool: D } : r) : r = oh(), x = {
      baseLanes: x.baseLanes | l,
      cachePool: r
    }), a.memoizedState = x, a.childLanes = ms(
      t,
      m,
      l
    ), e.memoizedState = hs, Li(t.child, a)) : (ul(e), l = t.child, t = l.sibling, l = Nn(l, {
      mode: "visible",
      children: a.children
    }), l.return = e, l.sibling = null, t !== null && (m = e.deletions, m === null ? (e.deletions = [t], e.flags |= 16) : m.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function ps(t, e) {
    return e = Mu(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Mu(t, e) {
    return t = De(22, t, null, e), t.lanes = 0, t;
  }
  function ys(t, e, l) {
    return Vl(e, t.child, null, l), t = ps(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function b0(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), Oc(t.return, e, l);
  }
  function vs(t, e, l, a, r, c) {
    var m = t.memoizedState;
    m === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: l,
      tailMode: r,
      treeForkCount: c
    } : (m.isBackwards = e, m.rendering = null, m.renderingStartTime = 0, m.last = a, m.tail = l, m.tailMode = r, m.treeForkCount = c);
  }
  function x0(t, e, l) {
    var a = e.pendingProps, r = a.revealOrder, c = a.tail;
    a = a.children;
    var m = Wt.current, x = (m & 2) !== 0;
    if (x ? (m = m & 1 | 2, e.flags |= 128) : m &= 1, P(Wt, m), ce(t, e, a, l), a = Tt ? Ni : 0, !x && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && b0(t, l, e);
        else if (t.tag === 19)
          b0(t, l, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (r) {
      case "forwards":
        for (l = e.child, r = null; l !== null; )
          t = l.alternate, t !== null && gu(t) === null && (r = l), l = l.sibling;
        l = r, l === null ? (r = e.child, e.child = null) : (r = l.sibling, l.sibling = null), vs(
          e,
          !1,
          r,
          l,
          c,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, r = e.child, e.child = null; r !== null; ) {
          if (t = r.alternate, t !== null && gu(t) === null) {
            e.child = r;
            break;
          }
          t = r.sibling, r.sibling = l, l = r, r = t;
        }
        vs(
          e,
          !0,
          l,
          null,
          c,
          a
        );
        break;
      case "together":
        vs(
          e,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Hn(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), fl |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (Aa(
          t,
          e,
          l,
          !1
        ), (l & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(u(153));
    if (e.child !== null) {
      for (t = e.child, l = Nn(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = Nn(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function bs(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && ou(t)));
  }
  function S1(t, e, l) {
    switch (e.tag) {
      case 3:
        tt(e, e.stateNode.containerInfo), ll(e, Pt, t.memoizedState.cache), Bl();
        break;
      case 27:
      case 5:
        xt(e);
        break;
      case 4:
        tt(e, e.stateNode.containerInfo);
        break;
      case 10:
        ll(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Zc(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (ul(e), e.flags |= 128, null) : (l & e.child.childLanes) !== 0 ? v0(t, e, l) : (ul(e), t = Hn(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        ul(e);
        break;
      case 19:
        var r = (t.flags & 128) !== 0;
        if (a = (l & e.childLanes) !== 0, a || (Aa(
          t,
          e,
          l,
          !1
        ), a = (l & e.childLanes) !== 0), r) {
          if (a)
            return x0(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (r = e.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), P(Wt, Wt.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, d0(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        ll(e, Pt, t.memoizedState.cache);
    }
    return Hn(t, e, l);
  }
  function _0(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        ee = !0;
      else {
        if (!bs(t, l) && (e.flags & 128) === 0)
          return ee = !1, S1(
            t,
            e,
            l
          );
        ee = (t.flags & 131072) !== 0;
      }
    else
      ee = !1, Tt && (e.flags & 1048576) !== 0 && Pd(e, Ni, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = jl(e.elementType), e.type = t, typeof t == "function")
            Ec(t) ? (a = Xl(t, a), e.tag = 1, e = p0(
              null,
              e,
              t,
              a,
              l
            )) : (e.tag = 0, e = ds(
              null,
              e,
              t,
              a,
              l
            ));
          else {
            if (t != null) {
              var r = t.$$typeof;
              if (r === C) {
                e.tag = 11, e = c0(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (r === B) {
                e.tag = 14, e = s0(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              }
            }
            throw e = T(t) || t, Error(u(306, e, ""));
          }
        }
        return e;
      case 0:
        return ds(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return a = e.type, r = Xl(
          a,
          e.pendingProps
        ), p0(
          t,
          e,
          a,
          r,
          l
        );
      case 3:
        t: {
          if (tt(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(u(387));
          a = e.pendingProps;
          var c = e.memoizedState;
          r = c.element, jc(t, e), Bi(e, a, null, l);
          var m = e.memoizedState;
          if (a = m.cache, ll(e, Pt, a), a !== c.cache && Hc(
            e,
            [Pt],
            l,
            !0
          ), Ri(), a = m.element, c.isDehydrated)
            if (c = {
              element: a,
              isDehydrated: !1,
              cache: m.cache
            }, e.updateQueue.baseState = c, e.memoizedState = c, e.flags & 256) {
              e = y0(
                t,
                e,
                a,
                l
              );
              break t;
            } else if (a !== r) {
              r = Ge(
                Error(u(424)),
                e
              ), Ai(r), e = y0(
                t,
                e,
                a,
                l
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, qt = We(t.firstChild), ue = e, Tt = !0, el = null, Ke = !0, l = dh(
                e,
                null,
                a,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Bl(), a === r) {
              e = Hn(
                t,
                e,
                l
              );
              break t;
            }
            ce(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return zu(t, e), t === null ? (l = Og(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : Tt || (l = e.type, t = e.pendingProps, a = qu(
          ft.current
        ).createElement(l), a[ae] = e, a[de] = t, se(a, l, t), It(a), e.stateNode = a) : e.memoizedState = Og(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return xt(e), t === null && Tt && (a = e.stateNode = Cg(
          e.type,
          e.pendingProps,
          ft.current
        ), ue = e, Ke = !0, r = qt, pl(e.type) ? (Is = r, qt = We(a.firstChild)) : qt = r), ce(
          t,
          e,
          e.pendingProps.children,
          l
        ), zu(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && Tt && ((r = a = qt) && (a = I1(
          a,
          e.type,
          e.pendingProps,
          Ke
        ), a !== null ? (e.stateNode = a, ue = e, qt = We(a.firstChild), Ke = !1, r = !0) : r = !1), r || nl(e)), xt(e), r = e.type, c = e.pendingProps, m = t !== null ? t.memoizedProps : null, a = c.children, $s(r, c) ? a = null : m !== null && $s(r, m) && (e.flags |= 32), e.memoizedState !== null && (r = Qc(
          t,
          e,
          h1,
          null,
          null,
          l
        ), eo._currentValue = r), zu(t, e), ce(t, e, a, l), e.child;
      case 6:
        return t === null && Tt && ((t = l = qt) && (l = P1(
          l,
          e.pendingProps,
          Ke
        ), l !== null ? (e.stateNode = l, ue = e, qt = null, t = !0) : t = !1), t || nl(e)), null;
      case 13:
        return v0(t, e, l);
      case 4:
        return tt(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = Vl(
          e,
          null,
          a,
          l
        ) : ce(t, e, a, l), e.child;
      case 11:
        return c0(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return ce(
          t,
          e,
          e.pendingProps,
          l
        ), e.child;
      case 8:
        return ce(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return ce(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return a = e.pendingProps, ll(e, e.type, a.value), ce(t, e, a.children, l), e.child;
      case 9:
        return r = e.type._context, a = e.pendingProps.children, kl(e), r = re(r), a = a(r), e.flags |= 1, ce(t, e, a, l), e.child;
      case 14:
        return s0(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return f0(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return x0(t, e, l);
      case 31:
        return _1(t, e, l);
      case 22:
        return d0(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return kl(e), a = re(Pt), t === null ? (r = Uc(), r === null && (r = Lt, c = Rc(), r.pooledCache = c, c.refCount++, c !== null && (r.pooledCacheLanes |= l), r = c), e.memoizedState = { parent: a, cache: r }, Yc(e), ll(e, Pt, r)) : ((t.lanes & l) !== 0 && (jc(t, e), Bi(e, null, null, l), Ri()), r = t.memoizedState, c = e.memoizedState, r.parent !== a ? (r = { parent: a, cache: a }, e.memoizedState = r, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = r), ll(e, Pt, a)) : (a = c.cache, ll(e, Pt, a), a !== r.cache && Hc(
          e,
          [Pt],
          l,
          !0
        ))), ce(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(u(156, e.tag));
  }
  function Rn(t) {
    t.flags |= 4;
  }
  function xs(t, e, l, a, r) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (r & 335544128) === r)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (K0()) t.flags |= 8192;
        else
          throw Ll = su, kc;
    } else t.flags &= -16777217;
  }
  function S0(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !kg(e))
      if (K0()) t.flags |= 8192;
      else
        throw Ll = su, kc;
  }
  function Nu(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Ro() : 536870912, t.lanes |= e, La |= e);
  }
  function Vi(t, e) {
    if (!Tt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var l = null; e !== null; )
            e.alternate !== null && (l = e), e = e.sibling;
          l === null ? t.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = t.tail;
          for (var a = null; l !== null; )
            l.alternate !== null && (a = l), l = l.sibling;
          a === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
      }
  }
  function Xt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, l = 0, a = 0;
    if (e)
      for (var r = t.child; r !== null; )
        l |= r.lanes | r.childLanes, a |= r.subtreeFlags & 65011712, a |= r.flags & 65011712, r.return = t, r = r.sibling;
    else
      for (r = t.child; r !== null; )
        l |= r.lanes | r.childLanes, a |= r.subtreeFlags, a |= r.flags, r.return = t, r = r.sibling;
    return t.subtreeFlags |= a, t.childLanes = l, e;
  }
  function w1(t, e, l) {
    var a = e.pendingProps;
    switch (Ac(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Xt(e), null;
      case 1:
        return Xt(e), null;
      case 3:
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Tn(Pt), st(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (Na(e) ? Rn(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Tc())), Xt(e), null;
      case 26:
        var r = e.type, c = e.memoizedState;
        return t === null ? (Rn(e), c !== null ? (Xt(e), S0(e, c)) : (Xt(e), xs(
          e,
          r,
          null,
          a,
          l
        ))) : c ? c !== t.memoizedState ? (Rn(e), Xt(e), S0(e, c)) : (Xt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && Rn(e), Xt(e), xs(
          e,
          r,
          t,
          a,
          l
        )), null;
      case 27:
        if (bt(e), l = ft.current, r = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Rn(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(u(166));
            return Xt(e), null;
          }
          t = lt.current, Na(e) ? eh(e) : (t = Cg(r, a, l), e.stateNode = t, Rn(e));
        }
        return Xt(e), null;
      case 5:
        if (bt(e), r = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Rn(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(u(166));
            return Xt(e), null;
          }
          if (c = lt.current, Na(e))
            eh(e);
          else {
            var m = qu(
              ft.current
            );
            switch (c) {
              case 1:
                c = m.createElementNS(
                  "http://www.w3.org/2000/svg",
                  r
                );
                break;
              case 2:
                c = m.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  r
                );
                break;
              default:
                switch (r) {
                  case "svg":
                    c = m.createElementNS(
                      "http://www.w3.org/2000/svg",
                      r
                    );
                    break;
                  case "math":
                    c = m.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      r
                    );
                    break;
                  case "script":
                    c = m.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof a.is == "string" ? m.createElement("select", {
                      is: a.is
                    }) : m.createElement("select"), a.multiple ? c.multiple = !0 : a.size && (c.size = a.size);
                    break;
                  default:
                    c = typeof a.is == "string" ? m.createElement(r, { is: a.is }) : m.createElement(r);
                }
            }
            c[ae] = e, c[de] = a;
            t: for (m = e.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6)
                c.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                m.child.return = m, m = m.child;
                continue;
              }
              if (m === e) break t;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === e)
                  break t;
                m = m.return;
              }
              m.sibling.return = m.return, m = m.sibling;
            }
            e.stateNode = c;
            t: switch (se(c, r, a), r) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && Rn(e);
          }
        }
        return Xt(e), xs(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== a && Rn(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(u(166));
          if (t = ft.current, Na(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, r = ue, r !== null)
              switch (r.tag) {
                case 27:
                case 5:
                  a = r.memoizedProps;
              }
            t[ae] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || vg(t.nodeValue, l)), t || nl(e, !0);
          } else
            t = qu(t).createTextNode(
              a
            ), t[ae] = e, e.stateNode = t;
        }
        return Xt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = Na(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(u(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(u(557));
              t[ae] = e;
            } else
              Bl(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Xt(e), t = !1;
          } else
            l = Tc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (He(e), e) : (He(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(u(558));
        }
        return Xt(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (r = Na(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!r) throw Error(u(318));
              if (r = e.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(u(317));
              r[ae] = e;
            } else
              Bl(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Xt(e), r = !1;
          } else
            r = Tc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = r), r = !0;
          if (!r)
            return e.flags & 256 ? (He(e), e) : (He(e), null);
        }
        return He(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, r = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (r = a.alternate.memoizedState.cachePool.pool), c = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (c = a.memoizedState.cachePool.pool), c !== r && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Nu(e, e.updateQueue), Xt(e), null);
      case 4:
        return st(), t === null && qs(e.stateNode.containerInfo), Xt(e), null;
      case 10:
        return Tn(e.type), Xt(e), null;
      case 19:
        if (H(Wt), a = e.memoizedState, a === null) return Xt(e), null;
        if (r = (e.flags & 128) !== 0, c = a.rendering, c === null)
          if (r) Vi(a, !1);
          else {
            if (Kt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (c = gu(t), c !== null) {
                  for (e.flags |= 128, Vi(a, !1), t = c.updateQueue, e.updateQueue = t, Nu(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    Wd(l, t), l = l.sibling;
                  return P(
                    Wt,
                    Wt.current & 1 | 2
                  ), Tt && An(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && Jt() > Ou && (e.flags |= 128, r = !0, Vi(a, !1), e.lanes = 4194304);
          }
        else {
          if (!r)
            if (t = gu(c), t !== null) {
              if (e.flags |= 128, r = !0, t = t.updateQueue, e.updateQueue = t, Nu(e, t), Vi(a, !0), a.tail === null && a.tailMode === "hidden" && !c.alternate && !Tt)
                return Xt(e), null;
            } else
              2 * Jt() - a.renderingStartTime > Ou && l !== 536870912 && (e.flags |= 128, r = !0, Vi(a, !1), e.lanes = 4194304);
          a.isBackwards ? (c.sibling = e.child, e.child = c) : (t = a.last, t !== null ? t.sibling = c : e.child = c, a.last = c);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Jt(), t.sibling = null, l = Wt.current, P(
          Wt,
          r ? l & 1 | 2 : l & 1
        ), Tt && An(e, a.treeForkCount), t) : (Xt(e), null);
      case 22:
      case 23:
        return He(e), Xc(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (Xt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Xt(e), l = e.updateQueue, l !== null && Nu(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && H(Yl), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Tn(Pt), Xt(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, e.tag));
  }
  function E1(t, e) {
    switch (Ac(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Tn(Pt), st(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return bt(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (He(e), e.alternate === null)
            throw Error(u(340));
          Bl();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (He(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(u(340));
          Bl();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return H(Wt), null;
      case 4:
        return st(), null;
      case 10:
        return Tn(e.type), null;
      case 22:
      case 23:
        return He(e), Xc(), t !== null && H(Yl), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Tn(Pt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function w0(t, e) {
    switch (Ac(e), e.tag) {
      case 3:
        Tn(Pt), st();
        break;
      case 26:
      case 27:
      case 5:
        bt(e);
        break;
      case 4:
        st();
        break;
      case 31:
        e.memoizedState !== null && He(e);
        break;
      case 13:
        He(e);
        break;
      case 19:
        H(Wt);
        break;
      case 10:
        Tn(e.type);
        break;
      case 22:
      case 23:
        He(e), Xc(), t !== null && H(Yl);
        break;
      case 24:
        Tn(Pt);
    }
  }
  function qi(t, e) {
    try {
      var l = e.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var r = a.next;
        l = r;
        do {
          if ((l.tag & t) === t) {
            a = void 0;
            var c = l.create, m = l.inst;
            a = c(), m.destroy = a;
          }
          l = l.next;
        } while (l !== r);
      }
    } catch (x) {
      Ut(e, e.return, x);
    }
  }
  function cl(t, e, l) {
    try {
      var a = e.updateQueue, r = a !== null ? a.lastEffect : null;
      if (r !== null) {
        var c = r.next;
        a = c;
        do {
          if ((a.tag & t) === t) {
            var m = a.inst, x = m.destroy;
            if (x !== void 0) {
              m.destroy = void 0, r = e;
              var D = l, Q = x;
              try {
                Q();
              } catch (et) {
                Ut(
                  r,
                  D,
                  et
                );
              }
            }
          }
          a = a.next;
        } while (a !== c);
      }
    } catch (et) {
      Ut(e, e.return, et);
    }
  }
  function E0(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        gh(e, l);
      } catch (a) {
        Ut(t, t.return, a);
      }
    }
  }
  function z0(t, e, l) {
    l.props = Xl(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      Ut(t, e, a);
    }
  }
  function Xi(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof l == "function" ? t.refCleanup = l(a) : l.current = a;
      }
    } catch (r) {
      Ut(t, e, r);
    }
  }
  function mn(t, e) {
    var l = t.ref, a = t.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (r) {
          Ut(t, e, r);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (r) {
          Ut(t, e, r);
        }
      else l.current = null;
  }
  function M0(t) {
    var e = t.type, l = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break t;
        case "img":
          l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (r) {
      Ut(t, t.return, r);
    }
  }
  function _s(t, e, l) {
    try {
      var a = t.stateNode;
      Q1(a, t.type, l, e), a[de] = e;
    } catch (r) {
      Ut(t, t.return, r);
    }
  }
  function N0(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && pl(t.type) || t.tag === 4;
  }
  function Ss(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || N0(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && pl(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function ws(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = zn));
    else if (a !== 4 && (a === 27 && pl(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
      for (ws(t, e, l), t = t.sibling; t !== null; )
        ws(t, e, l), t = t.sibling;
  }
  function Au(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
    else if (a !== 4 && (a === 27 && pl(t.type) && (l = t.stateNode), t = t.child, t !== null))
      for (Au(t, e, l), t = t.sibling; t !== null; )
        Au(t, e, l), t = t.sibling;
  }
  function A0(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var a = t.type, r = e.attributes; r.length; )
        e.removeAttributeNode(r[0]);
      se(e, a, l), e[ae] = t, e[de] = l;
    } catch (c) {
      Ut(t, t.return, c);
    }
  }
  var Bn = !1, ne = !1, Es = !1, C0 = typeof WeakSet == "function" ? WeakSet : Set, oe = null;
  function z1(t, e) {
    if (t = t.containerInfo, Gs = Ju, t = Vd(t), yc(t)) {
      if ("selectionStart" in t)
        var l = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          l = (l = t.ownerDocument) && l.defaultView || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var r = a.anchorOffset, c = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, c.nodeType;
            } catch {
              l = null;
              break t;
            }
            var m = 0, x = -1, D = -1, Q = 0, et = 0, it = t, K = null;
            e: for (; ; ) {
              for (var F; it !== l || r !== 0 && it.nodeType !== 3 || (x = m + r), it !== c || a !== 0 && it.nodeType !== 3 || (D = m + a), it.nodeType === 3 && (m += it.nodeValue.length), (F = it.firstChild) !== null; )
                K = it, it = F;
              for (; ; ) {
                if (it === t) break e;
                if (K === l && ++Q === r && (x = m), K === c && ++et === a && (D = m), (F = it.nextSibling) !== null) break;
                it = K, K = it.parentNode;
              }
              it = F;
            }
            l = x === -1 || D === -1 ? null : { start: x, end: D };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Qs = { focusedElem: t, selectionRange: l }, Ju = !1, oe = e; oe !== null; )
      if (e = oe, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, oe = t;
      else
        for (; oe !== null; ) {
          switch (e = oe, c = e.alternate, t = e.flags, e.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (l = 0; l < t.length; l++)
                  r = t[l], r.ref.impl = r.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && c !== null) {
                t = void 0, l = e, r = c.memoizedProps, c = c.memoizedState, a = l.stateNode;
                try {
                  var dt = Xl(
                    l.type,
                    r
                  );
                  t = a.getSnapshotBeforeUpdate(
                    dt,
                    c
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (vt) {
                  Ut(
                    l,
                    l.return,
                    vt
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = e.stateNode.containerInfo, l = t.nodeType, l === 9)
                  Js(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Js(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(u(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, oe = t;
            break;
          }
          oe = e.return;
        }
  }
  function T0(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        kn(t, l), a & 4 && qi(5, l);
        break;
      case 1:
        if (kn(t, l), a & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (m) {
              Ut(l, l.return, m);
            }
          else {
            var r = Xl(
              l.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                r,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (m) {
              Ut(
                l,
                l.return,
                m
              );
            }
          }
        a & 64 && E0(l), a & 512 && Xi(l, l.return);
        break;
      case 3:
        if (kn(t, l), a & 64 && (t = l.updateQueue, t !== null)) {
          if (e = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            gh(t, e);
          } catch (m) {
            Ut(l, l.return, m);
          }
        }
        break;
      case 27:
        e === null && a & 4 && A0(l);
      case 26:
      case 5:
        kn(t, l), e === null && a & 4 && M0(l), a & 512 && Xi(l, l.return);
        break;
      case 12:
        kn(t, l);
        break;
      case 31:
        kn(t, l), a & 4 && H0(t, l);
        break;
      case 13:
        kn(t, l), a & 4 && R0(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = R1.bind(
          null,
          l
        ), tb(t, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || Bn, !a) {
          e = e !== null && e.memoizedState !== null || ne, r = Bn;
          var c = ne;
          Bn = a, (ne = e) && !c ? Yn(
            t,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : kn(t, l), Bn = r, ne = c;
        }
        break;
      case 30:
        break;
      default:
        kn(t, l);
    }
  }
  function D0(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, D0(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && fi(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Zt = null, Se = !1;
  function Un(t, e, l) {
    for (l = l.child; l !== null; )
      O0(t, e, l), l = l.sibling;
  }
  function O0(t, e, l) {
    if (ge && typeof ge.onCommitFiberUnmount == "function")
      try {
        ge.onCommitFiberUnmount(Ml, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        ne || mn(l, e), Un(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        ne || mn(l, e);
        var a = Zt, r = Se;
        pl(l.type) && (Zt = l.stateNode, Se = !1), Un(
          t,
          e,
          l
        ), Ii(l.stateNode), Zt = a, Se = r;
        break;
      case 5:
        ne || mn(l, e);
      case 6:
        if (a = Zt, r = Se, Zt = null, Un(
          t,
          e,
          l
        ), Zt = a, Se = r, Zt !== null)
          if (Se)
            try {
              (Zt.nodeType === 9 ? Zt.body : Zt.nodeName === "HTML" ? Zt.ownerDocument.body : Zt).removeChild(l.stateNode);
            } catch (c) {
              Ut(
                l,
                e,
                c
              );
            }
          else
            try {
              Zt.removeChild(l.stateNode);
            } catch (c) {
              Ut(
                l,
                e,
                c
              );
            }
        break;
      case 18:
        Zt !== null && (Se ? (t = Zt, Eg(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), Ka(t)) : Eg(Zt, l.stateNode));
        break;
      case 4:
        a = Zt, r = Se, Zt = l.stateNode.containerInfo, Se = !0, Un(
          t,
          e,
          l
        ), Zt = a, Se = r;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        cl(2, l, e), ne || cl(4, l, e), Un(
          t,
          e,
          l
        );
        break;
      case 1:
        ne || (mn(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && z0(
          l,
          e,
          a
        )), Un(
          t,
          e,
          l
        );
        break;
      case 21:
        Un(
          t,
          e,
          l
        );
        break;
      case 22:
        ne = (a = ne) || l.memoizedState !== null, Un(
          t,
          e,
          l
        ), ne = a;
        break;
      default:
        Un(
          t,
          e,
          l
        );
    }
  }
  function H0(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Ka(t);
      } catch (l) {
        Ut(e, e.return, l);
      }
    }
  }
  function R0(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Ka(t);
      } catch (l) {
        Ut(e, e.return, l);
      }
  }
  function M1(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new C0()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new C0()), e;
      default:
        throw Error(u(435, t.tag));
    }
  }
  function Cu(t, e) {
    var l = M1(t);
    e.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var r = B1.bind(null, t, a);
        a.then(r, r);
      }
    });
  }
  function we(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var r = l[a], c = t, m = e, x = m;
        t: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (pl(x.type)) {
                Zt = x.stateNode, Se = !1;
                break t;
              }
              break;
            case 5:
              Zt = x.stateNode, Se = !1;
              break t;
            case 3:
            case 4:
              Zt = x.stateNode.containerInfo, Se = !0;
              break t;
          }
          x = x.return;
        }
        if (Zt === null) throw Error(u(160));
        O0(c, m, r), Zt = null, Se = !1, c = r.alternate, c !== null && (c.return = null), r.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        B0(e, t), e = e.sibling;
  }
  var tn = null;
  function B0(t, e) {
    var l = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        we(e, t), Ee(t), a & 4 && (cl(3, t, t.return), qi(3, t), cl(5, t, t.return));
        break;
      case 1:
        we(e, t), Ee(t), a & 512 && (ne || l === null || mn(l, l.return)), a & 64 && Bn && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
        break;
      case 26:
        var r = tn;
        if (we(e, t), Ee(t), a & 512 && (ne || l === null || mn(l, l.return)), a & 4) {
          var c = l !== null ? l.memoizedState : null;
          if (a = t.memoizedState, l === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, l = t.memoizedProps, r = r.ownerDocument || r;
                  e: switch (a) {
                    case "title":
                      c = r.getElementsByTagName("title")[0], (!c || c[Cl] || c[ae] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = r.createElement(a), r.head.insertBefore(
                        c,
                        r.querySelector("head > title")
                      )), se(c, a, l), c[ae] = t, It(c), a = c;
                      break t;
                    case "link":
                      var m = Bg(
                        "link",
                        "href",
                        r
                      ).get(a + (l.href || ""));
                      if (m) {
                        for (var x = 0; x < m.length; x++)
                          if (c = m[x], c.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && c.getAttribute("rel") === (l.rel == null ? null : l.rel) && c.getAttribute("title") === (l.title == null ? null : l.title) && c.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            m.splice(x, 1);
                            break e;
                          }
                      }
                      c = r.createElement(a), se(c, a, l), r.head.appendChild(c);
                      break;
                    case "meta":
                      if (m = Bg(
                        "meta",
                        "content",
                        r
                      ).get(a + (l.content || ""))) {
                        for (x = 0; x < m.length; x++)
                          if (c = m[x], c.getAttribute("content") === (l.content == null ? null : "" + l.content) && c.getAttribute("name") === (l.name == null ? null : l.name) && c.getAttribute("property") === (l.property == null ? null : l.property) && c.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && c.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            m.splice(x, 1);
                            break e;
                          }
                      }
                      c = r.createElement(a), se(c, a, l), r.head.appendChild(c);
                      break;
                    default:
                      throw Error(u(468, a));
                  }
                  c[ae] = t, It(c), a = c;
                }
                t.stateNode = a;
              } else
                Ug(
                  r,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Rg(
                r,
                a,
                t.memoizedProps
              );
          else
            c !== a ? (c === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : c.count--, a === null ? Ug(
              r,
              t.type,
              t.stateNode
            ) : Rg(
              r,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && _s(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        we(e, t), Ee(t), a & 512 && (ne || l === null || mn(l, l.return)), l !== null && a & 4 && _s(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (we(e, t), Ee(t), a & 512 && (ne || l === null || mn(l, l.return)), t.flags & 32) {
          r = t.stateNode;
          try {
            ya(r, "");
          } catch (dt) {
            Ut(t, t.return, dt);
          }
        }
        a & 4 && t.stateNode != null && (r = t.memoizedProps, _s(
          t,
          r,
          l !== null ? l.memoizedProps : r
        )), a & 1024 && (Es = !0);
        break;
      case 6:
        if (we(e, t), Ee(t), a & 4) {
          if (t.stateNode === null)
            throw Error(u(162));
          a = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = a;
          } catch (dt) {
            Ut(t, t.return, dt);
          }
        }
        break;
      case 3:
        if (Gu = null, r = tn, tn = Xu(e.containerInfo), we(e, t), tn = r, Ee(t), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Ka(e.containerInfo);
          } catch (dt) {
            Ut(t, t.return, dt);
          }
        Es && (Es = !1, U0(t));
        break;
      case 4:
        a = tn, tn = Xu(
          t.stateNode.containerInfo
        ), we(e, t), Ee(t), tn = a;
        break;
      case 12:
        we(e, t), Ee(t);
        break;
      case 31:
        we(e, t), Ee(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Cu(t, a)));
        break;
      case 13:
        we(e, t), Ee(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Du = Jt()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Cu(t, a)));
        break;
      case 22:
        r = t.memoizedState !== null;
        var D = l !== null && l.memoizedState !== null, Q = Bn, et = ne;
        if (Bn = Q || r, ne = et || D, we(e, t), ne = et, Bn = Q, Ee(t), a & 8192)
          t: for (e = t.stateNode, e._visibility = r ? e._visibility & -2 : e._visibility | 1, r && (l === null || D || Bn || ne || Zl(t)), l = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                D = l = e;
                try {
                  if (c = D.stateNode, r)
                    m = c.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none";
                  else {
                    x = D.stateNode;
                    var it = D.memoizedProps.style, K = it != null && it.hasOwnProperty("display") ? it.display : null;
                    x.style.display = K == null || typeof K == "boolean" ? "" : ("" + K).trim();
                  }
                } catch (dt) {
                  Ut(D, D.return, dt);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                D = e;
                try {
                  D.stateNode.nodeValue = r ? "" : D.memoizedProps;
                } catch (dt) {
                  Ut(D, D.return, dt);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                D = e;
                try {
                  var F = D.stateNode;
                  r ? zg(F, !0) : zg(D.stateNode, !1);
                } catch (dt) {
                  Ut(D, D.return, dt);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              l === e && (l = null), e = e.return;
            }
            l === e && (l = null), e.sibling.return = e.return, e = e.sibling;
          }
        a & 4 && (a = t.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, Cu(t, l))));
        break;
      case 19:
        we(e, t), Ee(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Cu(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        we(e, t), Ee(t);
    }
  }
  function Ee(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (N0(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(u(160));
        switch (l.tag) {
          case 27:
            var r = l.stateNode, c = Ss(t);
            Au(t, c, r);
            break;
          case 5:
            var m = l.stateNode;
            l.flags & 32 && (ya(m, ""), l.flags &= -33);
            var x = Ss(t);
            Au(t, x, m);
            break;
          case 3:
          case 4:
            var D = l.stateNode.containerInfo, Q = Ss(t);
            ws(
              t,
              Q,
              D
            );
            break;
          default:
            throw Error(u(161));
        }
      } catch (et) {
        Ut(t, t.return, et);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function U0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        U0(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function kn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        T0(t, e.alternate, e), e = e.sibling;
  }
  function Zl(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          cl(4, e, e.return), Zl(e);
          break;
        case 1:
          mn(e, e.return);
          var l = e.stateNode;
          typeof l.componentWillUnmount == "function" && z0(
            e,
            e.return,
            l
          ), Zl(e);
          break;
        case 27:
          Ii(e.stateNode);
        case 26:
        case 5:
          mn(e, e.return), Zl(e);
          break;
        case 22:
          e.memoizedState === null && Zl(e);
          break;
        case 30:
          Zl(e);
          break;
        default:
          Zl(e);
      }
      t = t.sibling;
    }
  }
  function Yn(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var a = e.alternate, r = t, c = e, m = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Yn(
            r,
            c,
            l
          ), qi(4, c);
          break;
        case 1:
          if (Yn(
            r,
            c,
            l
          ), a = c, r = a.stateNode, typeof r.componentDidMount == "function")
            try {
              r.componentDidMount();
            } catch (Q) {
              Ut(a, a.return, Q);
            }
          if (a = c, r = a.updateQueue, r !== null) {
            var x = a.stateNode;
            try {
              var D = r.shared.hiddenCallbacks;
              if (D !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < D.length; r++)
                  hh(D[r], x);
            } catch (Q) {
              Ut(a, a.return, Q);
            }
          }
          l && m & 64 && E0(c), Xi(c, c.return);
          break;
        case 27:
          A0(c);
        case 26:
        case 5:
          Yn(
            r,
            c,
            l
          ), l && a === null && m & 4 && M0(c), Xi(c, c.return);
          break;
        case 12:
          Yn(
            r,
            c,
            l
          );
          break;
        case 31:
          Yn(
            r,
            c,
            l
          ), l && m & 4 && H0(r, c);
          break;
        case 13:
          Yn(
            r,
            c,
            l
          ), l && m & 4 && R0(r, c);
          break;
        case 22:
          c.memoizedState === null && Yn(
            r,
            c,
            l
          ), Xi(c, c.return);
          break;
        case 30:
          break;
        default:
          Yn(
            r,
            c,
            l
          );
      }
      e = e.sibling;
    }
  }
  function zs(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && Ci(l));
  }
  function Ms(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ci(t));
  }
  function en(t, e, l, a) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        k0(
          t,
          e,
          l,
          a
        ), e = e.sibling;
  }
  function k0(t, e, l, a) {
    var r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        en(
          t,
          e,
          l,
          a
        ), r & 2048 && qi(9, e);
        break;
      case 1:
        en(
          t,
          e,
          l,
          a
        );
        break;
      case 3:
        en(
          t,
          e,
          l,
          a
        ), r & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ci(t)));
        break;
      case 12:
        if (r & 2048) {
          en(
            t,
            e,
            l,
            a
          ), t = e.stateNode;
          try {
            var c = e.memoizedProps, m = c.id, x = c.onPostCommit;
            typeof x == "function" && x(
              m,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (D) {
            Ut(e, e.return, D);
          }
        } else
          en(
            t,
            e,
            l,
            a
          );
        break;
      case 31:
        en(
          t,
          e,
          l,
          a
        );
        break;
      case 13:
        en(
          t,
          e,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        c = e.stateNode, m = e.alternate, e.memoizedState !== null ? c._visibility & 2 ? en(
          t,
          e,
          l,
          a
        ) : Zi(t, e) : c._visibility & 2 ? en(
          t,
          e,
          l,
          a
        ) : (c._visibility |= 2, ka(
          t,
          e,
          l,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), r & 2048 && zs(m, e);
        break;
      case 24:
        en(
          t,
          e,
          l,
          a
        ), r & 2048 && Ms(e.alternate, e);
        break;
      default:
        en(
          t,
          e,
          l,
          a
        );
    }
  }
  function ka(t, e, l, a, r) {
    for (r = r && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var c = t, m = e, x = l, D = a, Q = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          ka(
            c,
            m,
            x,
            D,
            r
          ), qi(8, m);
          break;
        case 23:
          break;
        case 22:
          var et = m.stateNode;
          m.memoizedState !== null ? et._visibility & 2 ? ka(
            c,
            m,
            x,
            D,
            r
          ) : Zi(
            c,
            m
          ) : (et._visibility |= 2, ka(
            c,
            m,
            x,
            D,
            r
          )), r && Q & 2048 && zs(
            m.alternate,
            m
          );
          break;
        case 24:
          ka(
            c,
            m,
            x,
            D,
            r
          ), r && Q & 2048 && Ms(m.alternate, m);
          break;
        default:
          ka(
            c,
            m,
            x,
            D,
            r
          );
      }
      e = e.sibling;
    }
  }
  function Zi(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, a = e, r = a.flags;
        switch (a.tag) {
          case 22:
            Zi(l, a), r & 2048 && zs(
              a.alternate,
              a
            );
            break;
          case 24:
            Zi(l, a), r & 2048 && Ms(a.alternate, a);
            break;
          default:
            Zi(l, a);
        }
        e = e.sibling;
      }
  }
  var Gi = 8192;
  function Ya(t, e, l) {
    if (t.subtreeFlags & Gi)
      for (t = t.child; t !== null; )
        Y0(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function Y0(t, e, l) {
    switch (t.tag) {
      case 26:
        Ya(
          t,
          e,
          l
        ), t.flags & Gi && t.memoizedState !== null && db(
          l,
          tn,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ya(
          t,
          e,
          l
        );
        break;
      case 3:
      case 4:
        var a = tn;
        tn = Xu(t.stateNode.containerInfo), Ya(
          t,
          e,
          l
        ), tn = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Gi, Gi = 16777216, Ya(
          t,
          e,
          l
        ), Gi = a) : Ya(
          t,
          e,
          l
        ));
        break;
      default:
        Ya(
          t,
          e,
          l
        );
    }
  }
  function j0(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function Qi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          oe = a, V0(
            a,
            t
          );
        }
      j0(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        L0(t), t = t.sibling;
  }
  function L0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Qi(t), t.flags & 2048 && cl(9, t, t.return);
        break;
      case 3:
        Qi(t);
        break;
      case 12:
        Qi(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Tu(t)) : Qi(t);
        break;
      default:
        Qi(t);
    }
  }
  function Tu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          oe = a, V0(
            a,
            t
          );
        }
      j0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          cl(8, e, e.return), Tu(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, Tu(e));
          break;
        default:
          Tu(e);
      }
      t = t.sibling;
    }
  }
  function V0(t, e) {
    for (; oe !== null; ) {
      var l = oe;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          cl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ci(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, oe = a;
      else
        t: for (l = t; oe !== null; ) {
          a = oe;
          var r = a.sibling, c = a.return;
          if (D0(a), a === l) {
            oe = null;
            break t;
          }
          if (r !== null) {
            r.return = c, oe = r;
            break t;
          }
          oe = c;
        }
    }
  }
  var N1 = {
    getCacheForType: function(t) {
      var e = re(Pt), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return re(Pt).controller.signal;
    }
  }, A1 = typeof WeakMap == "function" ? WeakMap : Map, Rt = 0, Lt = null, zt = null, At = 0, Bt = 0, Re = null, sl = !1, ja = !1, Ns = !1, jn = 0, Kt = 0, fl = 0, Gl = 0, As = 0, Be = 0, La = 0, $i = null, ze = null, Cs = !1, Du = 0, q0 = 0, Ou = 1 / 0, Hu = null, dl = null, ie = 0, hl = null, Va = null, Ln = 0, Ts = 0, Ds = null, X0 = null, Ki = 0, Os = null;
  function Ue() {
    return (Rt & 2) !== 0 && At !== 0 ? At & -At : E.T !== null ? Ys() : Yo();
  }
  function Z0() {
    if (Be === 0)
      if ((At & 536870912) === 0 || Tt) {
        var t = ca;
        ca <<= 1, (ca & 3932160) === 0 && (ca = 262144), Be = t;
      } else Be = 536870912;
    return t = Oe.current, t !== null && (t.flags |= 32), Be;
  }
  function Me(t, e, l) {
    (t === Lt && (Bt === 2 || Bt === 9) || t.cancelPendingCommit !== null) && (qa(t, 0), gl(
      t,
      At,
      Be,
      !1
    )), Al(t, l), ((Rt & 2) === 0 || t !== Lt) && (t === Lt && ((Rt & 2) === 0 && (Gl |= l), Kt === 4 && gl(
      t,
      At,
      Be,
      !1
    )), pn(t));
  }
  function G0(t, e, l) {
    if ((Rt & 6) !== 0) throw Error(u(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Nl(t, e), r = a ? D1(t, e) : Rs(t, e, !0), c = a;
    do {
      if (r === 0) {
        ja && !a && gl(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, c && !C1(l)) {
          r = Rs(t, e, !1), c = !1;
          continue;
        }
        if (r === 2) {
          if (c = e, t.errorRecoveryDisabledLanes & c)
            var m = 0;
          else
            m = t.pendingLanes & -536870913, m = m !== 0 ? m : m & 536870912 ? 536870912 : 0;
          if (m !== 0) {
            e = m;
            t: {
              var x = t;
              r = $i;
              var D = x.current.memoizedState.isDehydrated;
              if (D && (qa(x, m).flags |= 256), m = Rs(
                x,
                m,
                !1
              ), m !== 2) {
                if (Ns && !D) {
                  x.errorRecoveryDisabledLanes |= c, Gl |= c, r = 4;
                  break t;
                }
                c = ze, ze = r, c !== null && (ze === null ? ze = c : ze.push.apply(
                  ze,
                  c
                ));
              }
              r = m;
            }
            if (c = !1, r !== 2) continue;
          }
        }
        if (r === 1) {
          qa(t, 0), gl(t, e, 0, !0);
          break;
        }
        t: {
          switch (a = t, c = r, c) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              gl(
                a,
                e,
                Be,
                !sl
              );
              break t;
            case 2:
              ze = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((e & 62914560) === e && (r = Du + 300 - Jt(), 10 < r)) {
            if (gl(
              a,
              e,
              Be,
              !sl
            ), fa(a, 0, !0) !== 0) break t;
            Ln = e, a.timeoutHandle = Sg(
              Q0.bind(
                null,
                a,
                l,
                ze,
                Hu,
                Cs,
                e,
                Be,
                Gl,
                La,
                sl,
                c,
                "Throttled",
                -0,
                0
              ),
              r
            );
            break t;
          }
          Q0(
            a,
            l,
            ze,
            Hu,
            Cs,
            e,
            Be,
            Gl,
            La,
            sl,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    pn(t);
  }
  function Q0(t, e, l, a, r, c, m, x, D, Q, et, it, K, F) {
    if (t.timeoutHandle = -1, it = e.subtreeFlags, it & 8192 || (it & 16785408) === 16785408) {
      it = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: zn
      }, Y0(
        e,
        c,
        it
      );
      var dt = (c & 62914560) === c ? Du - Jt() : (c & 4194048) === c ? q0 - Jt() : 0;
      if (dt = hb(
        it,
        dt
      ), dt !== null) {
        Ln = c, t.cancelPendingCommit = dt(
          tg.bind(
            null,
            t,
            e,
            c,
            l,
            a,
            r,
            m,
            x,
            D,
            et,
            it,
            null,
            K,
            F
          )
        ), gl(t, c, m, !Q);
        return;
      }
    }
    tg(
      t,
      e,
      c,
      l,
      a,
      r,
      m,
      x,
      D
    );
  }
  function C1(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var r = l[a], c = r.getSnapshot;
          r = r.value;
          try {
            if (!Te(c(), r)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = e.child, e.subtreeFlags & 16384 && l !== null)
        l.return = e, e = l;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function gl(t, e, l, a) {
    e &= ~As, e &= ~Gl, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var r = e; 0 < r; ) {
      var c = 31 - me(r), m = 1 << c;
      a[c] = -1, r &= ~m;
    }
    l !== 0 && Bo(t, l, e);
  }
  function Ru() {
    return (Rt & 6) === 0 ? (Ji(0), !1) : !0;
  }
  function Hs() {
    if (zt !== null) {
      if (Bt === 0)
        var t = zt.return;
      else
        t = zt, Cn = Ul = null, Jc(t), Oa = null, Di = 0, t = zt;
      for (; t !== null; )
        w0(t.alternate, t), t = t.return;
      zt = null;
    }
  }
  function qa(t, e) {
    var l = t.timeoutHandle;
    l !== -1 && (t.timeoutHandle = -1, J1(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), Ln = 0, Hs(), Lt = t, zt = l = Nn(t.current, null), At = e, Bt = 0, Re = null, sl = !1, ja = Nl(t, e), Ns = !1, La = Be = As = Gl = fl = Kt = 0, ze = $i = null, Cs = !1, (e & 8) !== 0 && (e |= e & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= e; 0 < a; ) {
        var r = 31 - me(a), c = 1 << r;
        e |= t[r], a &= ~c;
      }
    return jn = e, eu(), l;
  }
  function $0(t, e) {
    wt = null, E.H = ji, e === Da || e === cu ? (e = ch(), Bt = 3) : e === kc ? (e = ch(), Bt = 4) : Bt = e === fs ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Re = e, zt === null && (Kt = 1, wu(
      t,
      Ge(e, t.current)
    ));
  }
  function K0() {
    var t = Oe.current;
    return t === null ? !0 : (At & 4194048) === At ? Je === null : (At & 62914560) === At || (At & 536870912) !== 0 ? t === Je : !1;
  }
  function J0() {
    var t = E.H;
    return E.H = ji, t === null ? ji : t;
  }
  function W0() {
    var t = E.A;
    return E.A = N1, t;
  }
  function Bu() {
    Kt = 4, sl || (At & 4194048) !== At && Oe.current !== null || (ja = !0), (fl & 134217727) === 0 && (Gl & 134217727) === 0 || Lt === null || gl(
      Lt,
      At,
      Be,
      !1
    );
  }
  function Rs(t, e, l) {
    var a = Rt;
    Rt |= 2;
    var r = J0(), c = W0();
    (Lt !== t || At !== e) && (Hu = null, qa(t, e)), e = !1;
    var m = Kt;
    t: do
      try {
        if (Bt !== 0 && zt !== null) {
          var x = zt, D = Re;
          switch (Bt) {
            case 8:
              Hs(), m = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Oe.current === null && (e = !0);
              var Q = Bt;
              if (Bt = 0, Re = null, Xa(t, x, D, Q), l && ja) {
                m = 0;
                break t;
              }
              break;
            default:
              Q = Bt, Bt = 0, Re = null, Xa(t, x, D, Q);
          }
        }
        T1(), m = Kt;
        break;
      } catch (et) {
        $0(t, et);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Cn = Ul = null, Rt = a, E.H = r, E.A = c, zt === null && (Lt = null, At = 0, eu()), m;
  }
  function T1() {
    for (; zt !== null; ) F0(zt);
  }
  function D1(t, e) {
    var l = Rt;
    Rt |= 2;
    var a = J0(), r = W0();
    Lt !== t || At !== e ? (Hu = null, Ou = Jt() + 500, qa(t, e)) : ja = Nl(
      t,
      e
    );
    t: do
      try {
        if (Bt !== 0 && zt !== null) {
          e = zt;
          var c = Re;
          e: switch (Bt) {
            case 1:
              Bt = 0, Re = null, Xa(t, e, c, 1);
              break;
            case 2:
            case 9:
              if (uh(c)) {
                Bt = 0, Re = null, I0(e);
                break;
              }
              e = function() {
                Bt !== 2 && Bt !== 9 || Lt !== t || (Bt = 7), pn(t);
              }, c.then(e, e);
              break t;
            case 3:
              Bt = 7;
              break t;
            case 4:
              Bt = 5;
              break t;
            case 7:
              uh(c) ? (Bt = 0, Re = null, I0(e)) : (Bt = 0, Re = null, Xa(t, e, c, 7));
              break;
            case 5:
              var m = null;
              switch (zt.tag) {
                case 26:
                  m = zt.memoizedState;
                case 5:
                case 27:
                  var x = zt;
                  if (m ? kg(m) : x.stateNode.complete) {
                    Bt = 0, Re = null;
                    var D = x.sibling;
                    if (D !== null) zt = D;
                    else {
                      var Q = x.return;
                      Q !== null ? (zt = Q, Uu(Q)) : zt = null;
                    }
                    break e;
                  }
              }
              Bt = 0, Re = null, Xa(t, e, c, 5);
              break;
            case 6:
              Bt = 0, Re = null, Xa(t, e, c, 6);
              break;
            case 8:
              Hs(), Kt = 6;
              break t;
            default:
              throw Error(u(462));
          }
        }
        O1();
        break;
      } catch (et) {
        $0(t, et);
      }
    while (!0);
    return Cn = Ul = null, E.H = a, E.A = r, Rt = l, zt !== null ? 0 : (Lt = null, At = 0, eu(), Kt);
  }
  function O1() {
    for (; zt !== null && !zl(); )
      F0(zt);
  }
  function F0(t) {
    var e = _0(t.alternate, t, jn);
    t.memoizedProps = t.pendingProps, e === null ? Uu(t) : zt = e;
  }
  function I0(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = m0(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          At
        );
        break;
      case 11:
        e = m0(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          At
        );
        break;
      case 5:
        Jc(e);
      default:
        w0(l, e), e = zt = Wd(e, jn), e = _0(l, e, jn);
    }
    t.memoizedProps = t.pendingProps, e === null ? Uu(t) : zt = e;
  }
  function Xa(t, e, l, a) {
    Cn = Ul = null, Jc(e), Oa = null, Di = 0;
    var r = e.return;
    try {
      if (x1(
        t,
        r,
        e,
        l,
        At
      )) {
        Kt = 1, wu(
          t,
          Ge(l, t.current)
        ), zt = null;
        return;
      }
    } catch (c) {
      if (r !== null) throw zt = r, c;
      Kt = 1, wu(
        t,
        Ge(l, t.current)
      ), zt = null;
      return;
    }
    e.flags & 32768 ? (Tt || a === 1 ? t = !0 : ja || (At & 536870912) !== 0 ? t = !1 : (sl = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Oe.current, a !== null && a.tag === 13 && (a.flags |= 16384))), P0(e, t)) : Uu(e);
  }
  function Uu(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        P0(
          e,
          sl
        );
        return;
      }
      t = e.return;
      var l = w1(
        e.alternate,
        e,
        jn
      );
      if (l !== null) {
        zt = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        zt = e;
        return;
      }
      zt = e = t;
    } while (e !== null);
    Kt === 0 && (Kt = 5);
  }
  function P0(t, e) {
    do {
      var l = E1(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, zt = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        zt = t;
        return;
      }
      zt = t = l;
    } while (t !== null);
    Kt = 6, zt = null;
  }
  function tg(t, e, l, a, r, c, m, x, D) {
    t.cancelPendingCommit = null;
    do
      ku();
    while (ie !== 0);
    if ((Rt & 6) !== 0) throw Error(u(327));
    if (e !== null) {
      if (e === t.current) throw Error(u(177));
      if (c = e.lanes | e.childLanes, c |= Sc, Pr(
        t,
        l,
        c,
        m,
        x,
        D
      ), t === Lt && (zt = Lt = null, At = 0), Va = e, hl = t, Ln = l, Ts = c, Ds = r, X0 = a, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, U1(Xe, function() {
        return ig(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
        a = E.T, E.T = null, r = O.p, O.p = 2, m = Rt, Rt |= 4;
        try {
          z1(t, e, l);
        } finally {
          Rt = m, O.p = r, E.T = a;
        }
      }
      ie = 1, eg(), ng(), lg();
    }
  }
  function eg() {
    if (ie === 1) {
      ie = 0;
      var t = hl, e = Va, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = E.T, E.T = null;
        var a = O.p;
        O.p = 2;
        var r = Rt;
        Rt |= 4;
        try {
          B0(e, t);
          var c = Qs, m = Vd(t.containerInfo), x = c.focusedElem, D = c.selectionRange;
          if (m !== x && x && x.ownerDocument && Ld(
            x.ownerDocument.documentElement,
            x
          )) {
            if (D !== null && yc(x)) {
              var Q = D.start, et = D.end;
              if (et === void 0 && (et = Q), "selectionStart" in x)
                x.selectionStart = Q, x.selectionEnd = Math.min(
                  et,
                  x.value.length
                );
              else {
                var it = x.ownerDocument || document, K = it && it.defaultView || window;
                if (K.getSelection) {
                  var F = K.getSelection(), dt = x.textContent.length, vt = Math.min(D.start, dt), jt = D.end === void 0 ? vt : Math.min(D.end, dt);
                  !F.extend && vt > jt && (m = jt, jt = vt, vt = m);
                  var Y = jd(
                    x,
                    vt
                  ), R = jd(
                    x,
                    jt
                  );
                  if (Y && R && (F.rangeCount !== 1 || F.anchorNode !== Y.node || F.anchorOffset !== Y.offset || F.focusNode !== R.node || F.focusOffset !== R.offset)) {
                    var G = it.createRange();
                    G.setStart(Y.node, Y.offset), F.removeAllRanges(), vt > jt ? (F.addRange(G), F.extend(R.node, R.offset)) : (G.setEnd(R.node, R.offset), F.addRange(G));
                  }
                }
              }
            }
            for (it = [], F = x; F = F.parentNode; )
              F.nodeType === 1 && it.push({
                element: F,
                left: F.scrollLeft,
                top: F.scrollTop
              });
            for (typeof x.focus == "function" && x.focus(), x = 0; x < it.length; x++) {
              var at = it[x];
              at.element.scrollLeft = at.left, at.element.scrollTop = at.top;
            }
          }
          Ju = !!Gs, Qs = Gs = null;
        } finally {
          Rt = r, O.p = a, E.T = l;
        }
      }
      t.current = e, ie = 2;
    }
  }
  function ng() {
    if (ie === 2) {
      ie = 0;
      var t = hl, e = Va, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = E.T, E.T = null;
        var a = O.p;
        O.p = 2;
        var r = Rt;
        Rt |= 4;
        try {
          T0(t, e.alternate, e);
        } finally {
          Rt = r, O.p = a, E.T = l;
        }
      }
      ie = 3;
    }
  }
  function lg() {
    if (ie === 4 || ie === 3) {
      ie = 0, _n();
      var t = hl, e = Va, l = Ln, a = X0;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? ie = 5 : (ie = 0, Va = hl = null, ag(t, t.pendingLanes));
      var r = t.pendingLanes;
      if (r === 0 && (dl = null), si(l), e = e.stateNode, ge && typeof ge.onCommitFiberRoot == "function")
        try {
          ge.onCommitFiberRoot(
            Ml,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        e = E.T, r = O.p, O.p = 2, E.T = null;
        try {
          for (var c = t.onRecoverableError, m = 0; m < a.length; m++) {
            var x = a[m];
            c(x.value, {
              componentStack: x.stack
            });
          }
        } finally {
          E.T = e, O.p = r;
        }
      }
      (Ln & 3) !== 0 && ku(), pn(t), r = t.pendingLanes, (l & 261930) !== 0 && (r & 42) !== 0 ? t === Os ? Ki++ : (Ki = 0, Os = t) : Ki = 0, Ji(0);
    }
  }
  function ag(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Ci(e)));
  }
  function ku() {
    return eg(), ng(), lg(), ig();
  }
  function ig() {
    if (ie !== 5) return !1;
    var t = hl, e = Ts;
    Ts = 0;
    var l = si(Ln), a = E.T, r = O.p;
    try {
      O.p = 32 > l ? 32 : l, E.T = null, l = Ds, Ds = null;
      var c = hl, m = Ln;
      if (ie = 0, Va = hl = null, Ln = 0, (Rt & 6) !== 0) throw Error(u(331));
      var x = Rt;
      if (Rt |= 4, L0(c.current), k0(
        c,
        c.current,
        m,
        l
      ), Rt = x, Ji(0, !1), ge && typeof ge.onPostCommitFiberRoot == "function")
        try {
          ge.onPostCommitFiberRoot(Ml, c);
        } catch {
        }
      return !0;
    } finally {
      O.p = r, E.T = a, ag(t, e);
    }
  }
  function og(t, e, l) {
    e = Ge(l, e), e = ss(t.stateNode, e, 2), t = ol(t, e, 2), t !== null && (Al(t, 2), pn(t));
  }
  function Ut(t, e, l) {
    if (t.tag === 3)
      og(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          og(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (dl === null || !dl.has(a))) {
            t = Ge(l, t), l = u0(2), a = ol(e, l, 2), a !== null && (r0(
              l,
              a,
              e,
              t
            ), Al(a, 2), pn(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function Bs(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new A1();
      var r = /* @__PURE__ */ new Set();
      a.set(e, r);
    } else
      r = a.get(e), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(e, r));
    r.has(l) || (Ns = !0, r.add(l), t = H1.bind(null, t, e, l), e.then(t, t));
  }
  function H1(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Lt === t && (At & l) === l && (Kt === 4 || Kt === 3 && (At & 62914560) === At && 300 > Jt() - Du ? (Rt & 2) === 0 && qa(t, 0) : As |= l, La === At && (La = 0)), pn(t);
  }
  function ug(t, e) {
    e === 0 && (e = Ro()), t = Hl(t, e), t !== null && (Al(t, e), pn(t));
  }
  function R1(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), ug(t, l);
  }
  function B1(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, r = t.memoizedState;
        r !== null && (l = r.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    a !== null && a.delete(e), ug(t, l);
  }
  function U1(t, e) {
    return ve(t, e);
  }
  var Yu = null, Za = null, Us = !1, ju = !1, ks = !1, ml = 0;
  function pn(t) {
    t !== Za && t.next === null && (Za === null ? Yu = Za = t : Za = Za.next = t), ju = !0, Us || (Us = !0, Y1());
  }
  function Ji(t, e) {
    if (!ks && ju) {
      ks = !0;
      do
        for (var l = !1, a = Yu; a !== null; ) {
          if (t !== 0) {
            var r = a.pendingLanes;
            if (r === 0) var c = 0;
            else {
              var m = a.suspendedLanes, x = a.pingedLanes;
              c = (1 << 31 - me(42 | t) + 1) - 1, c &= r & ~(m & ~x), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (l = !0, fg(a, c));
          } else
            c = At, c = fa(
              a,
              a === Lt ? c : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (c & 3) === 0 || Nl(a, c) || (l = !0, fg(a, c));
          a = a.next;
        }
      while (l);
      ks = !1;
    }
  }
  function k1() {
    rg();
  }
  function rg() {
    ju = Us = !1;
    var t = 0;
    ml !== 0 && K1() && (t = ml);
    for (var e = Jt(), l = null, a = Yu; a !== null; ) {
      var r = a.next, c = cg(a, e);
      c === 0 ? (a.next = null, l === null ? Yu = r : l.next = r, r === null && (Za = l)) : (l = a, (t !== 0 || (c & 3) !== 0) && (ju = !0)), a = r;
    }
    ie !== 0 && ie !== 5 || Ji(t), ml !== 0 && (ml = 0);
  }
  function cg(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, r = t.expirationTimes, c = t.pendingLanes & -62914561; 0 < c; ) {
      var m = 31 - me(c), x = 1 << m, D = r[m];
      D === -1 ? ((x & l) === 0 || (x & a) !== 0) && (r[m] = Ir(x, e)) : D <= e && (t.expiredLanes |= x), c &= ~x;
    }
    if (e = Lt, l = At, l = fa(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (Bt === 2 || Bt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Ae(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Nl(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && Ae(a), si(l)) {
        case 2:
        case 8:
          l = qe;
          break;
        case 32:
          l = Xe;
          break;
        case 268435456:
          l = ua;
          break;
        default:
          l = Xe;
      }
      return a = sg.bind(null, t), l = ve(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && Ae(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function sg(t, e) {
    if (ie !== 0 && ie !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (ku() && t.callbackNode !== l)
      return null;
    var a = At;
    return a = fa(
      t,
      t === Lt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (G0(t, a, e), cg(t, Jt()), t.callbackNode != null && t.callbackNode === l ? sg.bind(null, t) : null);
  }
  function fg(t, e) {
    if (ku()) return null;
    G0(t, e, !0);
  }
  function Y1() {
    W1(function() {
      (Rt & 6) !== 0 ? ve(
        Ve,
        k1
      ) : rg();
    });
  }
  function Ys() {
    if (ml === 0) {
      var t = Ca;
      t === 0 && (t = ra, ra <<= 1, (ra & 261888) === 0 && (ra = 256)), ml = t;
    }
    return ml;
  }
  function dg(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : $o("" + t);
  }
  function hg(t, e) {
    var l = e.ownerDocument.createElement("input");
    return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
  }
  function j1(t, e, l, a, r) {
    if (e === "submit" && l && l.stateNode === r) {
      var c = dg(
        (r[de] || null).action
      ), m = a.submitter;
      m && (e = (e = m[de] || null) ? dg(e.formAction) : m.getAttribute("formAction"), e !== null && (c = e, m = null));
      var x = new Fo(
        "action",
        "action",
        null,
        a,
        r
      );
      t.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (ml !== 0) {
                  var D = m ? hg(r, m) : new FormData(r);
                  as(
                    l,
                    {
                      pending: !0,
                      data: D,
                      method: r.method,
                      action: c
                    },
                    null,
                    D
                  );
                }
              } else
                typeof c == "function" && (x.preventDefault(), D = m ? hg(r, m) : new FormData(r), as(
                  l,
                  {
                    pending: !0,
                    data: D,
                    method: r.method,
                    action: c
                  },
                  c,
                  D
                ));
            },
            currentTarget: r
          }
        ]
      });
    }
  }
  for (var js = 0; js < _c.length; js++) {
    var Ls = _c[js], L1 = Ls.toLowerCase(), V1 = Ls[0].toUpperCase() + Ls.slice(1);
    Pe(
      L1,
      "on" + V1
    );
  }
  Pe(Zd, "onAnimationEnd"), Pe(Gd, "onAnimationIteration"), Pe(Qd, "onAnimationStart"), Pe("dblclick", "onDoubleClick"), Pe("focusin", "onFocus"), Pe("focusout", "onBlur"), Pe(l1, "onTransitionRun"), Pe(a1, "onTransitionStart"), Pe(i1, "onTransitionCancel"), Pe($d, "onTransitionEnd"), Fn("onMouseEnter", ["mouseout", "mouseover"]), Fn("onMouseLeave", ["mouseout", "mouseover"]), Fn("onPointerEnter", ["pointerout", "pointerover"]), Fn("onPointerLeave", ["pointerout", "pointerover"]), En(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), En(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), En("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), En(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), En(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), En(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Wi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), q1 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wi)
  );
  function gg(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var a = t[l], r = a.event;
      a = a.listeners;
      t: {
        var c = void 0;
        if (e)
          for (var m = a.length - 1; 0 <= m; m--) {
            var x = a[m], D = x.instance, Q = x.currentTarget;
            if (x = x.listener, D !== c && r.isPropagationStopped())
              break t;
            c = x, r.currentTarget = Q;
            try {
              c(r);
            } catch (et) {
              tu(et);
            }
            r.currentTarget = null, c = D;
          }
        else
          for (m = 0; m < a.length; m++) {
            if (x = a[m], D = x.instance, Q = x.currentTarget, x = x.listener, D !== c && r.isPropagationStopped())
              break t;
            c = x, r.currentTarget = Q;
            try {
              c(r);
            } catch (et) {
              tu(et);
            }
            r.currentTarget = null, c = D;
          }
      }
    }
  }
  function Mt(t, e) {
    var l = e[da];
    l === void 0 && (l = e[da] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    l.has(a) || (mg(e, t, 2, !1), l.add(a));
  }
  function Vs(t, e, l) {
    var a = 0;
    e && (a |= 4), mg(
      l,
      t,
      a,
      e
    );
  }
  var Lu = "_reactListening" + Math.random().toString(36).slice(2);
  function qs(t) {
    if (!t[Lu]) {
      t[Lu] = !0, qo.forEach(function(l) {
        l !== "selectionchange" && (q1.has(l) || Vs(l, !1, t), Vs(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Lu] || (e[Lu] = !0, Vs("selectionchange", !1, e));
    }
  }
  function mg(t, e, l, a) {
    switch (Zg(e)) {
      case 2:
        var r = pb;
        break;
      case 8:
        r = yb;
        break;
      default:
        r = lf;
    }
    l = r.bind(
      null,
      e,
      l,
      t
    ), r = void 0, !rc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (r = !0), a ? r !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: r
    }) : t.addEventListener(e, l, !0) : r !== void 0 ? t.addEventListener(e, l, {
      passive: r
    }) : t.addEventListener(e, l, !1);
  }
  function Xs(t, e, l, a, r) {
    var c = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var m = a.tag;
        if (m === 3 || m === 4) {
          var x = a.stateNode.containerInfo;
          if (x === r) break;
          if (m === 4)
            for (m = a.return; m !== null; ) {
              var D = m.tag;
              if ((D === 3 || D === 4) && m.stateNode.containerInfo === r)
                return;
              m = m.return;
            }
          for (; x !== null; ) {
            if (m = $n(x), m === null) return;
            if (D = m.tag, D === 5 || D === 6 || D === 26 || D === 27) {
              a = c = m;
              continue t;
            }
            x = x.parentNode;
          }
        }
        a = a.return;
      }
    xd(function() {
      var Q = c, et = oc(l), it = [];
      t: {
        var K = Kd.get(t);
        if (K !== void 0) {
          var F = Fo, dt = t;
          switch (t) {
            case "keypress":
              if (Jo(l) === 0) break t;
            case "keydown":
            case "keyup":
              F = Bv;
              break;
            case "focusin":
              dt = "focus", F = dc;
              break;
            case "focusout":
              dt = "blur", F = dc;
              break;
            case "beforeblur":
            case "afterblur":
              F = dc;
              break;
            case "click":
              if (l.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              F = wd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              F = wv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              F = Yv;
              break;
            case Zd:
            case Gd:
            case Qd:
              F = Mv;
              break;
            case $d:
              F = Lv;
              break;
            case "scroll":
            case "scrollend":
              F = _v;
              break;
            case "wheel":
              F = qv;
              break;
            case "copy":
            case "cut":
            case "paste":
              F = Av;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              F = zd;
              break;
            case "toggle":
            case "beforetoggle":
              F = Zv;
          }
          var vt = (e & 4) !== 0, jt = !vt && (t === "scroll" || t === "scrollend"), Y = vt ? K !== null ? K + "Capture" : null : K;
          vt = [];
          for (var R = Q, G; R !== null; ) {
            var at = R;
            if (G = at.stateNode, at = at.tag, at !== 5 && at !== 26 && at !== 27 || G === null || Y === null || (at = vi(R, Y), at != null && vt.push(
              Fi(R, at, G)
            )), jt) break;
            R = R.return;
          }
          0 < vt.length && (K = new F(
            K,
            dt,
            null,
            l,
            et
          ), it.push({ event: K, listeners: vt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (K = t === "mouseover" || t === "pointerover", F = t === "mouseout" || t === "pointerout", K && l !== ic && (dt = l.relatedTarget || l.fromElement) && ($n(dt) || dt[wn]))
            break t;
          if ((F || K) && (K = et.window === et ? et : (K = et.ownerDocument) ? K.defaultView || K.parentWindow : window, F ? (dt = l.relatedTarget || l.toElement, F = Q, dt = dt ? $n(dt) : null, dt !== null && (jt = f(dt), vt = dt.tag, dt !== jt || vt !== 5 && vt !== 27 && vt !== 6) && (dt = null)) : (F = null, dt = Q), F !== dt)) {
            if (vt = wd, at = "onMouseLeave", Y = "onMouseEnter", R = "mouse", (t === "pointerout" || t === "pointerover") && (vt = zd, at = "onPointerLeave", Y = "onPointerEnter", R = "pointer"), jt = F == null ? K : Jn(F), G = dt == null ? K : Jn(dt), K = new vt(
              at,
              R + "leave",
              F,
              l,
              et
            ), K.target = jt, K.relatedTarget = G, at = null, $n(et) === Q && (vt = new vt(
              Y,
              R + "enter",
              dt,
              l,
              et
            ), vt.target = G, vt.relatedTarget = jt, at = vt), jt = at, F && dt)
              e: {
                for (vt = X1, Y = F, R = dt, G = 0, at = Y; at; at = vt(at))
                  G++;
                at = 0;
                for (var pt = R; pt; pt = vt(pt))
                  at++;
                for (; 0 < G - at; )
                  Y = vt(Y), G--;
                for (; 0 < at - G; )
                  R = vt(R), at--;
                for (; G--; ) {
                  if (Y === R || R !== null && Y === R.alternate) {
                    vt = Y;
                    break e;
                  }
                  Y = vt(Y), R = vt(R);
                }
                vt = null;
              }
            else vt = null;
            F !== null && pg(
              it,
              K,
              F,
              vt,
              !1
            ), dt !== null && jt !== null && pg(
              it,
              jt,
              dt,
              vt,
              !0
            );
          }
        }
        t: {
          if (K = Q ? Jn(Q) : window, F = K.nodeName && K.nodeName.toLowerCase(), F === "select" || F === "input" && K.type === "file")
            var Ot = Hd;
          else if (Dd(K))
            if (Rd)
              Ot = t1;
            else {
              Ot = Iv;
              var ht = Fv;
            }
          else
            F = K.nodeName, !F || F.toLowerCase() !== "input" || K.type !== "checkbox" && K.type !== "radio" ? Q && ac(Q.elementType) && (Ot = Hd) : Ot = Pv;
          if (Ot && (Ot = Ot(t, Q))) {
            Od(
              it,
              Ot,
              l,
              et
            );
            break t;
          }
          ht && ht(t, K, Q), t === "focusout" && Q && K.type === "number" && Q.memoizedProps.value != null && pi(K, "number", K.value);
        }
        switch (ht = Q ? Jn(Q) : window, t) {
          case "focusin":
            (Dd(ht) || ht.contentEditable === "true") && (_a = ht, vc = Q, Mi = null);
            break;
          case "focusout":
            Mi = vc = _a = null;
            break;
          case "mousedown":
            bc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            bc = !1, qd(it, l, et);
            break;
          case "selectionchange":
            if (n1) break;
          case "keydown":
          case "keyup":
            qd(it, l, et);
        }
        var Et;
        if (gc)
          t: {
            switch (t) {
              case "compositionstart":
                var Ct = "onCompositionStart";
                break t;
              case "compositionend":
                Ct = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Ct = "onCompositionUpdate";
                break t;
            }
            Ct = void 0;
          }
        else
          xa ? Cd(t, l) && (Ct = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (Ct = "onCompositionStart");
        Ct && (Md && l.locale !== "ko" && (xa || Ct !== "onCompositionStart" ? Ct === "onCompositionEnd" && xa && (Et = _d()) : (Pn = et, cc = "value" in Pn ? Pn.value : Pn.textContent, xa = !0)), ht = Vu(Q, Ct), 0 < ht.length && (Ct = new Ed(
          Ct,
          t,
          null,
          l,
          et
        ), it.push({ event: Ct, listeners: ht }), Et ? Ct.data = Et : (Et = Td(l), Et !== null && (Ct.data = Et)))), (Et = Qv ? $v(t, l) : Kv(t, l)) && (Ct = Vu(Q, "onBeforeInput"), 0 < Ct.length && (ht = new Ed(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          et
        ), it.push({
          event: ht,
          listeners: Ct
        }), ht.data = Et)), j1(
          it,
          t,
          Q,
          l,
          et
        );
      }
      gg(it, e);
    });
  }
  function Fi(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function Vu(t, e) {
    for (var l = e + "Capture", a = []; t !== null; ) {
      var r = t, c = r.stateNode;
      if (r = r.tag, r !== 5 && r !== 26 && r !== 27 || c === null || (r = vi(t, l), r != null && a.unshift(
        Fi(t, r, c)
      ), r = vi(t, e), r != null && a.push(
        Fi(t, r, c)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function X1(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function pg(t, e, l, a, r) {
    for (var c = e._reactName, m = []; l !== null && l !== a; ) {
      var x = l, D = x.alternate, Q = x.stateNode;
      if (x = x.tag, D !== null && D === a) break;
      x !== 5 && x !== 26 && x !== 27 || Q === null || (D = Q, r ? (Q = vi(l, c), Q != null && m.unshift(
        Fi(l, Q, D)
      )) : r || (Q = vi(l, c), Q != null && m.push(
        Fi(l, Q, D)
      ))), l = l.return;
    }
    m.length !== 0 && t.push({ event: e, listeners: m });
  }
  var Z1 = /\r\n?/g, G1 = /\u0000|\uFFFD/g;
  function yg(t) {
    return (typeof t == "string" ? t : "" + t).replace(Z1, `
`).replace(G1, "");
  }
  function vg(t, e) {
    return e = yg(e), yg(t) === e;
  }
  function Yt(t, e, l, a, r, c) {
    switch (l) {
      case "children":
        typeof a == "string" ? e === "body" || e === "textarea" && a === "" || ya(t, a) : (typeof a == "number" || typeof a == "bigint") && e !== "body" && ya(t, "" + a);
        break;
      case "className":
        ga(t, "class", a);
        break;
      case "tabIndex":
        ga(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ga(t, l, a);
        break;
      case "style":
        vd(t, a, c);
        break;
      case "data":
        if (e !== "object") {
          ga(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (e !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        a = $o("" + a), t.setAttribute(l, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" && (l === "formAction" ? (e !== "input" && Yt(t, e, "name", r.name, r, null), Yt(
            t,
            e,
            "formEncType",
            r.formEncType,
            r,
            null
          ), Yt(
            t,
            e,
            "formMethod",
            r.formMethod,
            r,
            null
          ), Yt(
            t,
            e,
            "formTarget",
            r.formTarget,
            r,
            null
          )) : (Yt(t, e, "encType", r.encType, r, null), Yt(t, e, "method", r.method, r, null), Yt(t, e, "target", r.target, r, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        a = $o("" + a), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = zn);
        break;
      case "onScroll":
        a != null && Mt("scroll", t);
        break;
      case "onScrollEnd":
        a != null && Mt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(u(61));
          if (l = a.__html, l != null) {
            if (r.children != null) throw Error(u(60));
            t.innerHTML = l;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        l = $o("" + a), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, "" + a) : t.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, a) : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(l, a) : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(l) : t.setAttribute(l, a);
        break;
      case "popover":
        Mt("beforetoggle", t), Mt("toggle", t), ha(t, "popover", a);
        break;
      case "xlinkActuate":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Ie(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Ie(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Ie(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        ha(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = bv.get(l) || l, ha(t, l, a));
    }
  }
  function Zs(t, e, l, a, r, c) {
    switch (l) {
      case "style":
        vd(t, a, c);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(u(61));
          if (l = a.__html, l != null) {
            if (r.children != null) throw Error(u(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof a == "string" ? ya(t, a) : (typeof a == "number" || typeof a == "bigint") && ya(t, "" + a);
        break;
      case "onScroll":
        a != null && Mt("scroll", t);
        break;
      case "onScrollEnd":
        a != null && Mt("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = zn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Xo.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (r = l.endsWith("Capture"), e = l.slice(2, r ? l.length - 7 : void 0), c = t[de] || null, c = c != null ? c[l] : null, typeof c == "function" && t.removeEventListener(e, c, r), typeof a == "function")) {
              typeof c != "function" && c !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, a, r);
              break t;
            }
            l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : ha(t, l, a);
          }
    }
  }
  function se(t, e, l) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Mt("error", t), Mt("load", t);
        var a = !1, r = !1, c;
        for (c in l)
          if (l.hasOwnProperty(c)) {
            var m = l[c];
            if (m != null)
              switch (c) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  r = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(u(137, e));
                default:
                  Yt(t, e, c, m, l, null);
              }
          }
        r && Yt(t, e, "srcSet", l.srcSet, l, null), a && Yt(t, e, "src", l.src, l, null);
        return;
      case "input":
        Mt("invalid", t);
        var x = c = m = r = null, D = null, Q = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var et = l[a];
            if (et != null)
              switch (a) {
                case "name":
                  r = et;
                  break;
                case "type":
                  m = et;
                  break;
                case "checked":
                  D = et;
                  break;
                case "defaultChecked":
                  Q = et;
                  break;
                case "value":
                  c = et;
                  break;
                case "defaultValue":
                  x = et;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (et != null)
                    throw Error(u(137, e));
                  break;
                default:
                  Yt(t, e, a, et, l, null);
              }
          }
        pa(
          t,
          c,
          x,
          D,
          Q,
          m,
          r,
          !1
        );
        return;
      case "select":
        Mt("invalid", t), a = m = c = null;
        for (r in l)
          if (l.hasOwnProperty(r) && (x = l[r], x != null))
            switch (r) {
              case "value":
                c = x;
                break;
              case "defaultValue":
                m = x;
                break;
              case "multiple":
                a = x;
              default:
                Yt(t, e, r, x, l, null);
            }
        e = c, l = m, t.multiple = !!a, e != null ? In(t, !!a, e, !1) : l != null && In(t, !!a, l, !0);
        return;
      case "textarea":
        Mt("invalid", t), c = r = a = null;
        for (m in l)
          if (l.hasOwnProperty(m) && (x = l[m], x != null))
            switch (m) {
              case "value":
                a = x;
                break;
              case "defaultValue":
                r = x;
                break;
              case "children":
                c = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(u(91));
                break;
              default:
                Yt(t, e, m, x, l, null);
            }
        pd(t, a, r, c);
        return;
      case "option":
        for (D in l)
          l.hasOwnProperty(D) && (a = l[D], a != null) && (D === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : Yt(t, e, D, a, l, null));
        return;
      case "dialog":
        Mt("beforetoggle", t), Mt("toggle", t), Mt("cancel", t), Mt("close", t);
        break;
      case "iframe":
      case "object":
        Mt("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Wi.length; a++)
          Mt(Wi[a], t);
        break;
      case "image":
        Mt("error", t), Mt("load", t);
        break;
      case "details":
        Mt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Mt("error", t), Mt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (Q in l)
          if (l.hasOwnProperty(Q) && (a = l[Q], a != null))
            switch (Q) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, e));
              default:
                Yt(t, e, Q, a, l, null);
            }
        return;
      default:
        if (ac(e)) {
          for (et in l)
            l.hasOwnProperty(et) && (a = l[et], a !== void 0 && Zs(
              t,
              e,
              et,
              a,
              l,
              void 0
            ));
          return;
        }
    }
    for (x in l)
      l.hasOwnProperty(x) && (a = l[x], a != null && Yt(t, e, x, a, l, null));
  }
  function Q1(t, e, l, a) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var r = null, c = null, m = null, x = null, D = null, Q = null, et = null;
        for (F in l) {
          var it = l[F];
          if (l.hasOwnProperty(F) && it != null)
            switch (F) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                D = it;
              default:
                a.hasOwnProperty(F) || Yt(t, e, F, null, a, it);
            }
        }
        for (var K in a) {
          var F = a[K];
          if (it = l[K], a.hasOwnProperty(K) && (F != null || it != null))
            switch (K) {
              case "type":
                c = F;
                break;
              case "name":
                r = F;
                break;
              case "checked":
                Q = F;
                break;
              case "defaultChecked":
                et = F;
                break;
              case "value":
                m = F;
                break;
              case "defaultValue":
                x = F;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (F != null)
                  throw Error(u(137, e));
                break;
              default:
                F !== it && Yt(
                  t,
                  e,
                  K,
                  F,
                  a,
                  it
                );
            }
        }
        mi(
          t,
          m,
          x,
          D,
          Q,
          et,
          c,
          r
        );
        return;
      case "select":
        F = m = x = K = null;
        for (c in l)
          if (D = l[c], l.hasOwnProperty(c) && D != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                F = D;
              default:
                a.hasOwnProperty(c) || Yt(
                  t,
                  e,
                  c,
                  null,
                  a,
                  D
                );
            }
        for (r in a)
          if (c = a[r], D = l[r], a.hasOwnProperty(r) && (c != null || D != null))
            switch (r) {
              case "value":
                K = c;
                break;
              case "defaultValue":
                x = c;
                break;
              case "multiple":
                m = c;
              default:
                c !== D && Yt(
                  t,
                  e,
                  r,
                  c,
                  a,
                  D
                );
            }
        e = x, l = m, a = F, K != null ? In(t, !!l, K, !1) : !!a != !!l && (e != null ? In(t, !!l, e, !0) : In(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        F = K = null;
        for (x in l)
          if (r = l[x], l.hasOwnProperty(x) && r != null && !a.hasOwnProperty(x))
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Yt(t, e, x, null, a, r);
            }
        for (m in a)
          if (r = a[m], c = l[m], a.hasOwnProperty(m) && (r != null || c != null))
            switch (m) {
              case "value":
                K = r;
                break;
              case "defaultValue":
                F = r;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(u(91));
                break;
              default:
                r !== c && Yt(t, e, m, r, a, c);
            }
        yi(t, K, F);
        return;
      case "option":
        for (var dt in l)
          K = l[dt], l.hasOwnProperty(dt) && K != null && !a.hasOwnProperty(dt) && (dt === "selected" ? t.selected = !1 : Yt(
            t,
            e,
            dt,
            null,
            a,
            K
          ));
        for (D in a)
          K = a[D], F = l[D], a.hasOwnProperty(D) && K !== F && (K != null || F != null) && (D === "selected" ? t.selected = K && typeof K != "function" && typeof K != "symbol" : Yt(
            t,
            e,
            D,
            K,
            a,
            F
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var vt in l)
          K = l[vt], l.hasOwnProperty(vt) && K != null && !a.hasOwnProperty(vt) && Yt(t, e, vt, null, a, K);
        for (Q in a)
          if (K = a[Q], F = l[Q], a.hasOwnProperty(Q) && K !== F && (K != null || F != null))
            switch (Q) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (K != null)
                  throw Error(u(137, e));
                break;
              default:
                Yt(
                  t,
                  e,
                  Q,
                  K,
                  a,
                  F
                );
            }
        return;
      default:
        if (ac(e)) {
          for (var jt in l)
            K = l[jt], l.hasOwnProperty(jt) && K !== void 0 && !a.hasOwnProperty(jt) && Zs(
              t,
              e,
              jt,
              void 0,
              a,
              K
            );
          for (et in a)
            K = a[et], F = l[et], !a.hasOwnProperty(et) || K === F || K === void 0 && F === void 0 || Zs(
              t,
              e,
              et,
              K,
              a,
              F
            );
          return;
        }
    }
    for (var Y in l)
      K = l[Y], l.hasOwnProperty(Y) && K != null && !a.hasOwnProperty(Y) && Yt(t, e, Y, null, a, K);
    for (it in a)
      K = a[it], F = l[it], !a.hasOwnProperty(it) || K === F || K == null && F == null || Yt(t, e, it, K, a, F);
  }
  function bg(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function $1() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var r = l[a], c = r.transferSize, m = r.initiatorType, x = r.duration;
        if (c && x && bg(m)) {
          for (m = 0, x = r.responseEnd, a += 1; a < l.length; a++) {
            var D = l[a], Q = D.startTime;
            if (Q > x) break;
            var et = D.transferSize, it = D.initiatorType;
            et && bg(it) && (D = D.responseEnd, m += et * (D < x ? 1 : (x - Q) / (D - Q)));
          }
          if (--a, e += 8 * (c + m) / (r.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Gs = null, Qs = null;
  function qu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function xg(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function _g(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function $s(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Ks = null;
  function K1() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Ks ? !1 : (Ks = t, !0) : (Ks = null, !1);
  }
  var Sg = typeof setTimeout == "function" ? setTimeout : void 0, J1 = typeof clearTimeout == "function" ? clearTimeout : void 0, wg = typeof Promise == "function" ? Promise : void 0, W1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof wg < "u" ? function(t) {
    return wg.resolve(null).then(t).catch(F1);
  } : Sg;
  function F1(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function pl(t) {
    return t === "head";
  }
  function Eg(t, e) {
    var l = e, a = 0;
    do {
      var r = l.nextSibling;
      if (t.removeChild(l), r && r.nodeType === 8)
        if (l = r.data, l === "/$" || l === "/&") {
          if (a === 0) {
            t.removeChild(r), Ka(e);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Ii(t.ownerDocument.documentElement);
        else if (l === "head") {
          l = t.ownerDocument.head, Ii(l);
          for (var c = l.firstChild; c; ) {
            var m = c.nextSibling, x = c.nodeName;
            c[Cl] || x === "SCRIPT" || x === "STYLE" || x === "LINK" && c.rel.toLowerCase() === "stylesheet" || l.removeChild(c), c = m;
          }
        } else
          l === "body" && Ii(t.ownerDocument.body);
      l = r;
    } while (l);
    Ka(e);
  }
  function zg(t, e) {
    var l = t;
    t = 0;
    do {
      var a = l.nextSibling;
      if (l.nodeType === 1 ? e ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (e ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8)
        if (l = a.data, l === "/$") {
          if (t === 0) break;
          t--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || t++;
      l = a;
    } while (l);
  }
  function Js(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Js(l), fi(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function I1(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var r = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[Cl])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (c = t.getAttribute("rel"), c === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (c !== r.rel || t.getAttribute("href") !== (r.href == null || r.href === "" ? null : r.href) || t.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin) || t.getAttribute("title") !== (r.title == null ? null : r.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (c = t.getAttribute("src"), (c !== (r.src == null ? null : r.src) || t.getAttribute("type") !== (r.type == null ? null : r.type) || t.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin)) && c && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var c = r.name == null ? null : "" + r.name;
        if (r.type === "hidden" && t.getAttribute("name") === c)
          return t;
      } else return t;
      if (t = We(t.nextSibling), t === null) break;
    }
    return null;
  }
  function P1(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = We(t.nextSibling), t === null)) return null;
    return t;
  }
  function Mg(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = We(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ws(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Fs(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function tb(t, e) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || l.readyState !== "loading")
      e();
    else {
      var a = function() {
        e(), l.removeEventListener("DOMContentLoaded", a);
      };
      l.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function We(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Is = null;
  function Ng(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return We(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Ag(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (e === 0) return t;
          e--;
        } else l !== "/$" && l !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Cg(t, e, l) {
    switch (e = qu(l), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(u(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(u(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(u(454));
        return t;
      default:
        throw Error(u(451));
    }
  }
  function Ii(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    fi(t);
  }
  var Fe = /* @__PURE__ */ new Map(), Tg = /* @__PURE__ */ new Set();
  function Xu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Vn = O.d;
  O.d = {
    f: eb,
    r: nb,
    D: lb,
    C: ab,
    L: ib,
    m: ob,
    X: rb,
    S: ub,
    M: cb
  };
  function eb() {
    var t = Vn.f(), e = Ru();
    return t || e;
  }
  function nb(t) {
    var e = Kn(t);
    e !== null && e.tag === 5 && e.type === "form" ? $h(e) : Vn.r(t);
  }
  var Ga = typeof document > "u" ? null : document;
  function Dg(t, e, l) {
    var a = Ga;
    if (a && typeof e == "string" && e) {
      var r = xe(e);
      r = 'link[rel="' + t + '"][href="' + r + '"]', typeof l == "string" && (r += '[crossorigin="' + l + '"]'), Tg.has(r) || (Tg.add(r), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(r) === null && (e = a.createElement("link"), se(e, "link", t), It(e), a.head.appendChild(e)));
    }
  }
  function lb(t) {
    Vn.D(t), Dg("dns-prefetch", t, null);
  }
  function ab(t, e) {
    Vn.C(t, e), Dg("preconnect", t, e);
  }
  function ib(t, e, l) {
    Vn.L(t, e, l);
    var a = Ga;
    if (a && t && e) {
      var r = 'link[rel="preload"][as="' + xe(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (r += '[imagesrcset="' + xe(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (r += '[imagesizes="' + xe(
        l.imageSizes
      ) + '"]')) : r += '[href="' + xe(t) + '"]';
      var c = r;
      switch (e) {
        case "style":
          c = Qa(t);
          break;
        case "script":
          c = $a(t);
      }
      Fe.has(c) || (t = y(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), Fe.set(c, t), a.querySelector(r) !== null || e === "style" && a.querySelector(Pi(c)) || e === "script" && a.querySelector(to(c)) || (e = a.createElement("link"), se(e, "link", t), It(e), a.head.appendChild(e)));
    }
  }
  function ob(t, e) {
    Vn.m(t, e);
    var l = Ga;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", r = 'link[rel="modulepreload"][as="' + xe(a) + '"][href="' + xe(t) + '"]', c = r;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = $a(t);
      }
      if (!Fe.has(c) && (t = y({ rel: "modulepreload", href: t }, e), Fe.set(c, t), l.querySelector(r) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(to(c)))
              return;
        }
        a = l.createElement("link"), se(a, "link", t), It(a), l.head.appendChild(a);
      }
    }
  }
  function ub(t, e, l) {
    Vn.S(t, e, l);
    var a = Ga;
    if (a && t) {
      var r = Wn(a).hoistableStyles, c = Qa(t);
      e = e || "default";
      var m = r.get(c);
      if (!m) {
        var x = { loading: 0, preload: null };
        if (m = a.querySelector(
          Pi(c)
        ))
          x.loading = 5;
        else {
          t = y(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = Fe.get(c)) && Ps(t, l);
          var D = m = a.createElement("link");
          It(D), se(D, "link", t), D._p = new Promise(function(Q, et) {
            D.onload = Q, D.onerror = et;
          }), D.addEventListener("load", function() {
            x.loading |= 1;
          }), D.addEventListener("error", function() {
            x.loading |= 2;
          }), x.loading |= 4, Zu(m, e, a);
        }
        m = {
          type: "stylesheet",
          instance: m,
          count: 1,
          state: x
        }, r.set(c, m);
      }
    }
  }
  function rb(t, e) {
    Vn.X(t, e);
    var l = Ga;
    if (l && t) {
      var a = Wn(l).hoistableScripts, r = $a(t), c = a.get(r);
      c || (c = l.querySelector(to(r)), c || (t = y({ src: t, async: !0 }, e), (e = Fe.get(r)) && tf(t, e), c = l.createElement("script"), It(c), se(c, "link", t), l.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, a.set(r, c));
    }
  }
  function cb(t, e) {
    Vn.M(t, e);
    var l = Ga;
    if (l && t) {
      var a = Wn(l).hoistableScripts, r = $a(t), c = a.get(r);
      c || (c = l.querySelector(to(r)), c || (t = y({ src: t, async: !0, type: "module" }, e), (e = Fe.get(r)) && tf(t, e), c = l.createElement("script"), It(c), se(c, "link", t), l.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, a.set(r, c));
    }
  }
  function Og(t, e, l, a) {
    var r = (r = ft.current) ? Xu(r) : null;
    if (!r) throw Error(u(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (e = Qa(l.href), l = Wn(
          r
        ).hoistableStyles, a = l.get(e), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = Qa(l.href);
          var c = Wn(
            r
          ).hoistableStyles, m = c.get(t);
          if (m || (r = r.ownerDocument || r, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(t, m), (c = r.querySelector(
            Pi(t)
          )) && !c._p && (m.instance = c, m.state.loading = 5), Fe.has(t) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Fe.set(t, l), c || sb(
            r,
            t,
            l,
            m.state
          ))), e && a === null)
            throw Error(u(528, ""));
          return m;
        }
        if (e && a !== null)
          throw Error(u(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = $a(l), l = Wn(
          r
        ).hoistableScripts, a = l.get(e), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(u(444, t));
    }
  }
  function Qa(t) {
    return 'href="' + xe(t) + '"';
  }
  function Pi(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Hg(t) {
    return y({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function sb(t, e, l, a) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? a.loading = 1 : (e = t.createElement("link"), a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    }), se(e, "link", l), It(e), t.head.appendChild(e));
  }
  function $a(t) {
    return '[src="' + xe(t) + '"]';
  }
  function to(t) {
    return "script[async]" + t;
  }
  function Rg(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + xe(l.href) + '"]'
          );
          if (a)
            return e.instance = a, It(a), a;
          var r = y({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), It(a), se(a, "style", r), Zu(a, l.precedence, t), e.instance = a;
        case "stylesheet":
          r = Qa(l.href);
          var c = t.querySelector(
            Pi(r)
          );
          if (c)
            return e.state.loading |= 4, e.instance = c, It(c), c;
          a = Hg(l), (r = Fe.get(r)) && Ps(a, r), c = (t.ownerDocument || t).createElement("link"), It(c);
          var m = c;
          return m._p = new Promise(function(x, D) {
            m.onload = x, m.onerror = D;
          }), se(c, "link", a), e.state.loading |= 4, Zu(c, l.precedence, t), e.instance = c;
        case "script":
          return c = $a(l.src), (r = t.querySelector(
            to(c)
          )) ? (e.instance = r, It(r), r) : (a = l, (r = Fe.get(c)) && (a = y({}, l), tf(a, r)), t = t.ownerDocument || t, r = t.createElement("script"), It(r), se(r, "link", a), t.head.appendChild(r), e.instance = r);
        case "void":
          return null;
        default:
          throw Error(u(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, Zu(a, l.precedence, t));
    return e.instance;
  }
  function Zu(t, e, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), r = a.length ? a[a.length - 1] : null, c = r, m = 0; m < a.length; m++) {
      var x = a[m];
      if (x.dataset.precedence === e) c = x;
      else if (c !== r) break;
    }
    c ? c.parentNode.insertBefore(t, c.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function Ps(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function tf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Gu = null;
  function Bg(t, e, l) {
    if (Gu === null) {
      var a = /* @__PURE__ */ new Map(), r = Gu = /* @__PURE__ */ new Map();
      r.set(l, a);
    } else
      r = Gu, a = r.get(l), a || (a = /* @__PURE__ */ new Map(), r.set(l, a));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), r = 0; r < l.length; r++) {
      var c = l[r];
      if (!(c[Cl] || c[ae] || t === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = c.getAttribute(e) || "";
        m = t + m;
        var x = a.get(m);
        x ? x.push(c) : a.set(m, [c]);
      }
    }
    return a;
  }
  function Ug(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function fb(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        return e.rel === "stylesheet" ? (t = e.disabled, typeof e.precedence == "string" && t == null) : !0;
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function kg(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function db(t, e, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var r = Qa(a.href), c = e.querySelector(
          Pi(r)
        );
        if (c) {
          e = c._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Qu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = c, It(c);
          return;
        }
        c = e.ownerDocument || e, a = Hg(a), (r = Fe.get(r)) && Ps(a, r), c = c.createElement("link"), It(c);
        var m = c;
        m._p = new Promise(function(x, D) {
          m.onload = x, m.onerror = D;
        }), se(c, "link", a), l.instance = c;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = Qu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var ef = 0;
  function hb(t, e) {
    return t.stylesheets && t.count === 0 && Ku(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (t.stylesheets && Ku(t, t.stylesheets), t.unsuspend) {
          var c = t.unsuspend;
          t.unsuspend = null, c();
        }
      }, 6e4 + e);
      0 < t.imgBytes && ef === 0 && (ef = 62500 * $1());
      var r = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Ku(t, t.stylesheets), t.unsuspend)) {
            var c = t.unsuspend;
            t.unsuspend = null, c();
          }
        },
        (t.imgBytes > ef ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(r);
      };
    } : null;
  }
  function Qu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ku(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var $u = null;
  function Ku(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, $u = /* @__PURE__ */ new Map(), e.forEach(gb, t), $u = null, Qu.call(t));
  }
  function gb(t, e) {
    if (!(e.state.loading & 4)) {
      var l = $u.get(t);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), $u.set(t, l);
        for (var r = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < r.length; c++) {
          var m = r[c];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (l.set(m.dataset.precedence, m), a = m);
        }
        a && l.set(null, a);
      }
      r = e.instance, m = r.getAttribute("data-precedence"), c = l.get(m) || a, c === a && l.set(null, r), l.set(m, r), this.count++, a = Qu.bind(this), r.addEventListener("load", a), r.addEventListener("error", a), c ? c.parentNode.insertBefore(r, c.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(r, t.firstChild)), e.state.loading |= 4;
    }
  }
  var eo = {
    $$typeof: S,
    Provider: null,
    Consumer: null,
    _currentValue: q,
    _currentValue2: q,
    _threadCount: 0
  };
  function mb(t, e, l, a, r, c, m, x, D) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ri(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ri(0), this.hiddenUpdates = ri(null), this.identifierPrefix = a, this.onUncaughtError = r, this.onCaughtError = c, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = D, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Yg(t, e, l, a, r, c, m, x, D, Q, et, it) {
    return t = new mb(
      t,
      e,
      l,
      m,
      D,
      Q,
      et,
      it,
      x
    ), e = 1, c === !0 && (e |= 24), c = De(3, null, null, e), t.current = c, c.stateNode = t, e = Rc(), e.refCount++, t.pooledCache = e, e.refCount++, c.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, Yc(c), t;
  }
  function jg(t) {
    return t ? (t = Ea, t) : Ea;
  }
  function Lg(t, e, l, a, r, c) {
    r = jg(r), a.context === null ? a.context = r : a.pendingContext = r, a = il(e), a.payload = { element: l }, c = c === void 0 ? null : c, c !== null && (a.callback = c), l = ol(t, a, e), l !== null && (Me(l, t, e), Hi(l, t, e));
  }
  function Vg(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function nf(t, e) {
    Vg(t, e), (t = t.alternate) && Vg(t, e);
  }
  function qg(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Hl(t, 67108864);
      e !== null && Me(e, t, 67108864), nf(t, 67108864);
    }
  }
  function Xg(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ue();
      e = ci(e);
      var l = Hl(t, e);
      l !== null && Me(l, t, e), nf(t, e);
    }
  }
  var Ju = !0;
  function pb(t, e, l, a) {
    var r = E.T;
    E.T = null;
    var c = O.p;
    try {
      O.p = 2, lf(t, e, l, a);
    } finally {
      O.p = c, E.T = r;
    }
  }
  function yb(t, e, l, a) {
    var r = E.T;
    E.T = null;
    var c = O.p;
    try {
      O.p = 8, lf(t, e, l, a);
    } finally {
      O.p = c, E.T = r;
    }
  }
  function lf(t, e, l, a) {
    if (Ju) {
      var r = af(a);
      if (r === null)
        Xs(
          t,
          e,
          a,
          Wu,
          l
        ), Gg(t, a);
      else if (bb(
        r,
        t,
        e,
        l,
        a
      ))
        a.stopPropagation();
      else if (Gg(t, a), e & 4 && -1 < vb.indexOf(t)) {
        for (; r !== null; ) {
          var c = Kn(r);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var m = Sn(c.pendingLanes);
                  if (m !== 0) {
                    var x = c;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; m; ) {
                      var D = 1 << 31 - me(m);
                      x.entanglements[1] |= D, m &= ~D;
                    }
                    pn(c), (Rt & 6) === 0 && (Ou = Jt() + 500, Ji(0));
                  }
                }
                break;
              case 31:
              case 13:
                x = Hl(c, 2), x !== null && Me(x, c, 2), Ru(), nf(c, 2);
            }
          if (c = af(a), c === null && Xs(
            t,
            e,
            a,
            Wu,
            l
          ), c === r) break;
          r = c;
        }
        r !== null && a.stopPropagation();
      } else
        Xs(
          t,
          e,
          a,
          null,
          l
        );
    }
  }
  function af(t) {
    return t = oc(t), of(t);
  }
  var Wu = null;
  function of(t) {
    if (Wu = null, t = $n(t), t !== null) {
      var e = f(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = d(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = g(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return Wu = t, null;
  }
  function Zg(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Ce()) {
          case Ve:
            return 2;
          case qe:
            return 8;
          case Xe:
          case Qr:
            return 32;
          case ua:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var uf = !1, yl = null, vl = null, bl = null, no = /* @__PURE__ */ new Map(), lo = /* @__PURE__ */ new Map(), xl = [], vb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Gg(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        yl = null;
        break;
      case "dragenter":
      case "dragleave":
        vl = null;
        break;
      case "mouseover":
      case "mouseout":
        bl = null;
        break;
      case "pointerover":
      case "pointerout":
        no.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        lo.delete(e.pointerId);
    }
  }
  function ao(t, e, l, a, r, c) {
    return t === null || t.nativeEvent !== c ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: c,
      targetContainers: [r]
    }, e !== null && (e = Kn(e), e !== null && qg(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, r !== null && e.indexOf(r) === -1 && e.push(r), t);
  }
  function bb(t, e, l, a, r) {
    switch (e) {
      case "focusin":
        return yl = ao(
          yl,
          t,
          e,
          l,
          a,
          r
        ), !0;
      case "dragenter":
        return vl = ao(
          vl,
          t,
          e,
          l,
          a,
          r
        ), !0;
      case "mouseover":
        return bl = ao(
          bl,
          t,
          e,
          l,
          a,
          r
        ), !0;
      case "pointerover":
        var c = r.pointerId;
        return no.set(
          c,
          ao(
            no.get(c) || null,
            t,
            e,
            l,
            a,
            r
          )
        ), !0;
      case "gotpointercapture":
        return c = r.pointerId, lo.set(
          c,
          ao(
            lo.get(c) || null,
            t,
            e,
            l,
            a,
            r
          )
        ), !0;
    }
    return !1;
  }
  function Qg(t) {
    var e = $n(t.target);
    if (e !== null) {
      var l = f(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = d(l), e !== null) {
            t.blockedOn = e, jo(t.priority, function() {
              Xg(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = g(l), e !== null) {
            t.blockedOn = e, jo(t.priority, function() {
              Xg(l);
            });
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Fu(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = af(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        ic = a, l.target.dispatchEvent(a), ic = null;
      } else
        return e = Kn(l), e !== null && qg(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function $g(t, e, l) {
    Fu(t) && l.delete(e);
  }
  function xb() {
    uf = !1, yl !== null && Fu(yl) && (yl = null), vl !== null && Fu(vl) && (vl = null), bl !== null && Fu(bl) && (bl = null), no.forEach($g), lo.forEach($g);
  }
  function Iu(t, e) {
    t.blockedOn === e && (t.blockedOn = null, uf || (uf = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      xb
    )));
  }
  var Pu = null;
  function Kg(t) {
    Pu !== t && (Pu = t, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Pu === t && (Pu = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], a = t[e + 1], r = t[e + 2];
          if (typeof a != "function") {
            if (of(a || l) === null)
              continue;
            break;
          }
          var c = Kn(l);
          c !== null && (t.splice(e, 3), e -= 3, as(
            c,
            {
              pending: !0,
              data: r,
              method: l.method,
              action: a
            },
            a,
            r
          ));
        }
      }
    ));
  }
  function Ka(t) {
    function e(D) {
      return Iu(D, t);
    }
    yl !== null && Iu(yl, t), vl !== null && Iu(vl, t), bl !== null && Iu(bl, t), no.forEach(e), lo.forEach(e);
    for (var l = 0; l < xl.length; l++) {
      var a = xl[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < xl.length && (l = xl[0], l.blockedOn === null); )
      Qg(l), l.blockedOn === null && xl.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var r = l[a], c = l[a + 1], m = r[de] || null;
        if (typeof c == "function")
          m || Kg(l);
        else if (m) {
          var x = null;
          if (c && c.hasAttribute("formAction")) {
            if (r = c, m = c[de] || null)
              x = m.formAction;
            else if (of(r) !== null) continue;
          } else x = m.action;
          typeof x == "function" ? l[a + 1] = x : (l.splice(a, 3), a -= 3), Kg(l);
        }
      }
  }
  function Jg() {
    function t(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(m) {
            return r = m;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      r !== null && (r(), r = null), a || setTimeout(l, 20);
    }
    function l() {
      if (!a && !navigation.transition) {
        var c = navigation.currentEntry;
        c && c.url != null && navigation.navigate(c.url, {
          state: c.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, r = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(l, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), r !== null && (r(), r = null);
      };
    }
  }
  function rf(t) {
    this._internalRoot = t;
  }
  tr.prototype.render = rf.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(u(409));
    var l = e.current, a = Ue();
    Lg(l, a, t, e, null, null);
  }, tr.prototype.unmount = rf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Lg(t.current, 2, null, t, null, null), Ru(), e[wn] = null;
    }
  };
  function tr(t) {
    this._internalRoot = t;
  }
  tr.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Yo();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < xl.length && e !== 0 && e < xl[l].priority; l++) ;
      xl.splice(l, 0, t), l === 0 && Qg(t);
    }
  };
  var Wg = i.version;
  if (Wg !== "19.2.7")
    throw Error(
      u(
        527,
        Wg,
        "19.2.7"
      )
    );
  O.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(u(188)) : (t = Object.keys(t).join(","), Error(u(268, t)));
    return t = h(e), t = t !== null ? v(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var _b = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: E,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var er = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!er.isDisabled && er.supportsFiber)
      try {
        Ml = er.inject(
          _b
        ), ge = er;
      } catch {
      }
  }
  return io.createRoot = function(t, e) {
    if (!s(t)) throw Error(u(299));
    var l = !1, a = "", r = l0, c = a0, m = i0;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (r = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (m = e.onRecoverableError)), e = Yg(
      t,
      1,
      !1,
      null,
      null,
      l,
      a,
      null,
      r,
      c,
      m,
      Jg
    ), t[wn] = e.current, qs(t), new rf(e);
  }, io.hydrateRoot = function(t, e, l) {
    if (!s(t)) throw Error(u(299));
    var a = !1, r = "", c = l0, m = a0, x = i0, D = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (r = l.identifierPrefix), l.onUncaughtError !== void 0 && (c = l.onUncaughtError), l.onCaughtError !== void 0 && (m = l.onCaughtError), l.onRecoverableError !== void 0 && (x = l.onRecoverableError), l.formState !== void 0 && (D = l.formState)), e = Yg(
      t,
      1,
      !0,
      e,
      l ?? null,
      a,
      r,
      D,
      c,
      m,
      x,
      Jg
    ), e.context = jg(null), l = e.current, a = Ue(), a = ci(a), r = il(a), r.callback = null, ol(l, r, a), l = a, e.current.lanes = l, Al(e, l), pn(e), t[wn] = e.current, qs(t), new tr(e);
  }, io.version = "19.2.7", io;
}
var am;
function qb() {
  if (am) return sf.exports;
  am = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), sf.exports = Vb(), sf.exports;
}
var Xb = qb(), gf = { exports: {} }, oo = {};
var im;
function Zb() {
  if (im) return oo;
  im = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(u, s, f) {
    var d = null;
    if (f !== void 0 && (d = "" + f), s.key !== void 0 && (d = "" + s.key), "key" in s) {
      f = {};
      for (var g in s)
        g !== "key" && (f[g] = s[g]);
    } else f = s;
    return s = f.ref, {
      $$typeof: n,
      type: u,
      key: d,
      ref: s !== void 0 ? s : null,
      props: f
    };
  }
  return oo.Fragment = i, oo.jsx = o, oo.jsxs = o, oo;
}
var om;
function Gb() {
  return om || (om = 1, gf.exports = Zb()), gf.exports;
}
var L = Gb();
function le(n) {
  if (typeof n == "string" || typeof n == "number") return "" + n;
  let i = "";
  if (Array.isArray(n))
    for (let o = 0, u; o < n.length; o++)
      (u = le(n[o])) !== "" && (i += (i && " ") + u);
  else
    for (let o in n)
      n[o] && (i += (i && " ") + o);
  return i;
}
var Qb = { value: () => {
} };
function Or() {
  for (var n = 0, i = arguments.length, o = {}, u; n < i; ++n) {
    if (!(u = arguments[n] + "") || u in o || /[\s.]/.test(u)) throw new Error("illegal type: " + u);
    o[u] = [];
  }
  return new dr(o);
}
function dr(n) {
  this._ = n;
}
function $b(n, i) {
  return n.trim().split(/^|\s+/).map(function(o) {
    var u = "", s = o.indexOf(".");
    if (s >= 0 && (u = o.slice(s + 1), o = o.slice(0, s)), o && !i.hasOwnProperty(o)) throw new Error("unknown type: " + o);
    return { type: o, name: u };
  });
}
dr.prototype = Or.prototype = {
  constructor: dr,
  on: function(n, i) {
    var o = this._, u = $b(n + "", o), s, f = -1, d = u.length;
    if (arguments.length < 2) {
      for (; ++f < d; ) if ((s = (n = u[f]).type) && (s = Kb(o[s], n.name))) return s;
      return;
    }
    if (i != null && typeof i != "function") throw new Error("invalid callback: " + i);
    for (; ++f < d; )
      if (s = (n = u[f]).type) o[s] = um(o[s], n.name, i);
      else if (i == null) for (s in o) o[s] = um(o[s], n.name, null);
    return this;
  },
  copy: function() {
    var n = {}, i = this._;
    for (var o in i) n[o] = i[o].slice();
    return new dr(n);
  },
  call: function(n, i) {
    if ((s = arguments.length - 2) > 0) for (var o = new Array(s), u = 0, s, f; u < s; ++u) o[u] = arguments[u + 2];
    if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    for (f = this._[n], u = 0, s = f.length; u < s; ++u) f[u].value.apply(i, o);
  },
  apply: function(n, i, o) {
    if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    for (var u = this._[n], s = 0, f = u.length; s < f; ++s) u[s].value.apply(i, o);
  }
};
function Kb(n, i) {
  for (var o = 0, u = n.length, s; o < u; ++o)
    if ((s = n[o]).name === i)
      return s.value;
}
function um(n, i, o) {
  for (var u = 0, s = n.length; u < s; ++u)
    if (n[u].name === i) {
      n[u] = Qb, n = n.slice(0, u).concat(n.slice(u + 1));
      break;
    }
  return o != null && n.push({ name: i, value: o }), n;
}
var Af = "http://www.w3.org/1999/xhtml";
const rm = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Af,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Hr(n) {
  var i = n += "", o = i.indexOf(":");
  return o >= 0 && (i = n.slice(0, o)) !== "xmlns" && (n = n.slice(o + 1)), rm.hasOwnProperty(i) ? { space: rm[i], local: n } : n;
}
function Jb(n) {
  return function() {
    var i = this.ownerDocument, o = this.namespaceURI;
    return o === Af && i.documentElement.namespaceURI === Af ? i.createElement(n) : i.createElementNS(o, n);
  };
}
function Wb(n) {
  return function() {
    return this.ownerDocument.createElementNS(n.space, n.local);
  };
}
function wp(n) {
  var i = Hr(n);
  return (i.local ? Wb : Jb)(i);
}
function Fb() {
}
function Qf(n) {
  return n == null ? Fb : function() {
    return this.querySelector(n);
  };
}
function Ib(n) {
  typeof n != "function" && (n = Qf(n));
  for (var i = this._groups, o = i.length, u = new Array(o), s = 0; s < o; ++s)
    for (var f = i[s], d = f.length, g = u[s] = new Array(d), p, h, v = 0; v < d; ++v)
      (p = f[v]) && (h = n.call(p, p.__data__, v, f)) && ("__data__" in p && (h.__data__ = p.__data__), g[v] = h);
  return new je(u, this._parents);
}
function Pb(n) {
  return n == null ? [] : Array.isArray(n) ? n : Array.from(n);
}
function tx() {
  return [];
}
function Ep(n) {
  return n == null ? tx : function() {
    return this.querySelectorAll(n);
  };
}
function ex(n) {
  return function() {
    return Pb(n.apply(this, arguments));
  };
}
function nx(n) {
  typeof n == "function" ? n = ex(n) : n = Ep(n);
  for (var i = this._groups, o = i.length, u = [], s = [], f = 0; f < o; ++f)
    for (var d = i[f], g = d.length, p, h = 0; h < g; ++h)
      (p = d[h]) && (u.push(n.call(p, p.__data__, h, d)), s.push(p));
  return new je(u, s);
}
function zp(n) {
  return function() {
    return this.matches(n);
  };
}
function Mp(n) {
  return function(i) {
    return i.matches(n);
  };
}
var lx = Array.prototype.find;
function ax(n) {
  return function() {
    return lx.call(this.children, n);
  };
}
function ix() {
  return this.firstElementChild;
}
function ox(n) {
  return this.select(n == null ? ix : ax(typeof n == "function" ? n : Mp(n)));
}
var ux = Array.prototype.filter;
function rx() {
  return Array.from(this.children);
}
function cx(n) {
  return function() {
    return ux.call(this.children, n);
  };
}
function sx(n) {
  return this.selectAll(n == null ? rx : cx(typeof n == "function" ? n : Mp(n)));
}
function fx(n) {
  typeof n != "function" && (n = zp(n));
  for (var i = this._groups, o = i.length, u = new Array(o), s = 0; s < o; ++s)
    for (var f = i[s], d = f.length, g = u[s] = [], p, h = 0; h < d; ++h)
      (p = f[h]) && n.call(p, p.__data__, h, f) && g.push(p);
  return new je(u, this._parents);
}
function Np(n) {
  return new Array(n.length);
}
function dx() {
  return new je(this._enter || this._groups.map(Np), this._parents);
}
function vr(n, i) {
  this.ownerDocument = n.ownerDocument, this.namespaceURI = n.namespaceURI, this._next = null, this._parent = n, this.__data__ = i;
}
vr.prototype = {
  constructor: vr,
  appendChild: function(n) {
    return this._parent.insertBefore(n, this._next);
  },
  insertBefore: function(n, i) {
    return this._parent.insertBefore(n, i);
  },
  querySelector: function(n) {
    return this._parent.querySelector(n);
  },
  querySelectorAll: function(n) {
    return this._parent.querySelectorAll(n);
  }
};
function hx(n) {
  return function() {
    return n;
  };
}
function gx(n, i, o, u, s, f) {
  for (var d = 0, g, p = i.length, h = f.length; d < h; ++d)
    (g = i[d]) ? (g.__data__ = f[d], u[d] = g) : o[d] = new vr(n, f[d]);
  for (; d < p; ++d)
    (g = i[d]) && (s[d] = g);
}
function mx(n, i, o, u, s, f, d) {
  var g, p, h = /* @__PURE__ */ new Map(), v = i.length, y = f.length, b = new Array(v), _;
  for (g = 0; g < v; ++g)
    (p = i[g]) && (b[g] = _ = d.call(p, p.__data__, g, i) + "", h.has(_) ? s[g] = p : h.set(_, p));
  for (g = 0; g < y; ++g)
    _ = d.call(n, f[g], g, f) + "", (p = h.get(_)) ? (u[g] = p, p.__data__ = f[g], h.delete(_)) : o[g] = new vr(n, f[g]);
  for (g = 0; g < v; ++g)
    (p = i[g]) && h.get(b[g]) === p && (s[g] = p);
}
function px(n) {
  return n.__data__;
}
function yx(n, i) {
  if (!arguments.length) return Array.from(this, px);
  var o = i ? mx : gx, u = this._parents, s = this._groups;
  typeof n != "function" && (n = hx(n));
  for (var f = s.length, d = new Array(f), g = new Array(f), p = new Array(f), h = 0; h < f; ++h) {
    var v = u[h], y = s[h], b = y.length, _ = vx(n.call(v, v && v.__data__, h, u)), w = _.length, A = g[h] = new Array(w), N = d[h] = new Array(w), M = p[h] = new Array(b);
    o(v, y, A, N, M, _, i);
    for (var U = 0, S = 0, C, j; U < w; ++U)
      if (C = A[U]) {
        for (U >= S && (S = U + 1); !(j = N[S]) && ++S < w; ) ;
        C._next = j || null;
      }
  }
  return d = new je(d, u), d._enter = g, d._exit = p, d;
}
function vx(n) {
  return typeof n == "object" && "length" in n ? n : Array.from(n);
}
function bx() {
  return new je(this._exit || this._groups.map(Np), this._parents);
}
function xx(n, i, o) {
  var u = this.enter(), s = this, f = this.exit();
  return typeof n == "function" ? (u = n(u), u && (u = u.selection())) : u = u.append(n + ""), i != null && (s = i(s), s && (s = s.selection())), o == null ? f.remove() : o(f), u && s ? u.merge(s).order() : s;
}
function _x(n) {
  for (var i = n.selection ? n.selection() : n, o = this._groups, u = i._groups, s = o.length, f = u.length, d = Math.min(s, f), g = new Array(s), p = 0; p < d; ++p)
    for (var h = o[p], v = u[p], y = h.length, b = g[p] = new Array(y), _, w = 0; w < y; ++w)
      (_ = h[w] || v[w]) && (b[w] = _);
  for (; p < s; ++p)
    g[p] = o[p];
  return new je(g, this._parents);
}
function Sx() {
  for (var n = this._groups, i = -1, o = n.length; ++i < o; )
    for (var u = n[i], s = u.length - 1, f = u[s], d; --s >= 0; )
      (d = u[s]) && (f && d.compareDocumentPosition(f) ^ 4 && f.parentNode.insertBefore(d, f), f = d);
  return this;
}
function wx(n) {
  n || (n = Ex);
  function i(y, b) {
    return y && b ? n(y.__data__, b.__data__) : !y - !b;
  }
  for (var o = this._groups, u = o.length, s = new Array(u), f = 0; f < u; ++f) {
    for (var d = o[f], g = d.length, p = s[f] = new Array(g), h, v = 0; v < g; ++v)
      (h = d[v]) && (p[v] = h);
    p.sort(i);
  }
  return new je(s, this._parents).order();
}
function Ex(n, i) {
  return n < i ? -1 : n > i ? 1 : n >= i ? 0 : NaN;
}
function zx() {
  var n = arguments[0];
  return arguments[0] = this, n.apply(null, arguments), this;
}
function Mx() {
  return Array.from(this);
}
function Nx() {
  for (var n = this._groups, i = 0, o = n.length; i < o; ++i)
    for (var u = n[i], s = 0, f = u.length; s < f; ++s) {
      var d = u[s];
      if (d) return d;
    }
  return null;
}
function Ax() {
  let n = 0;
  for (const i of this) ++n;
  return n;
}
function Cx() {
  return !this.node();
}
function Tx(n) {
  for (var i = this._groups, o = 0, u = i.length; o < u; ++o)
    for (var s = i[o], f = 0, d = s.length, g; f < d; ++f)
      (g = s[f]) && n.call(g, g.__data__, f, s);
  return this;
}
function Dx(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function Ox(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function Hx(n, i) {
  return function() {
    this.setAttribute(n, i);
  };
}
function Rx(n, i) {
  return function() {
    this.setAttributeNS(n.space, n.local, i);
  };
}
function Bx(n, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? this.removeAttribute(n) : this.setAttribute(n, o);
  };
}
function Ux(n, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, o);
  };
}
function kx(n, i) {
  var o = Hr(n);
  if (arguments.length < 2) {
    var u = this.node();
    return o.local ? u.getAttributeNS(o.space, o.local) : u.getAttribute(o);
  }
  return this.each((i == null ? o.local ? Ox : Dx : typeof i == "function" ? o.local ? Ux : Bx : o.local ? Rx : Hx)(o, i));
}
function Ap(n) {
  return n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView;
}
function Yx(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function jx(n, i, o) {
  return function() {
    this.style.setProperty(n, i, o);
  };
}
function Lx(n, i, o) {
  return function() {
    var u = i.apply(this, arguments);
    u == null ? this.style.removeProperty(n) : this.style.setProperty(n, u, o);
  };
}
function Vx(n, i, o) {
  return arguments.length > 1 ? this.each((i == null ? Yx : typeof i == "function" ? Lx : jx)(n, i, o ?? "")) : ei(this.node(), n);
}
function ei(n, i) {
  return n.style.getPropertyValue(i) || Ap(n).getComputedStyle(n, null).getPropertyValue(i);
}
function qx(n) {
  return function() {
    delete this[n];
  };
}
function Xx(n, i) {
  return function() {
    this[n] = i;
  };
}
function Zx(n, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? delete this[n] : this[n] = o;
  };
}
function Gx(n, i) {
  return arguments.length > 1 ? this.each((i == null ? qx : typeof i == "function" ? Zx : Xx)(n, i)) : this.node()[n];
}
function Cp(n) {
  return n.trim().split(/^|\s+/);
}
function $f(n) {
  return n.classList || new Tp(n);
}
function Tp(n) {
  this._node = n, this._names = Cp(n.getAttribute("class") || "");
}
Tp.prototype = {
  add: function(n) {
    var i = this._names.indexOf(n);
    i < 0 && (this._names.push(n), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(n) {
    var i = this._names.indexOf(n);
    i >= 0 && (this._names.splice(i, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(n) {
    return this._names.indexOf(n) >= 0;
  }
};
function Dp(n, i) {
  for (var o = $f(n), u = -1, s = i.length; ++u < s; ) o.add(i[u]);
}
function Op(n, i) {
  for (var o = $f(n), u = -1, s = i.length; ++u < s; ) o.remove(i[u]);
}
function Qx(n) {
  return function() {
    Dp(this, n);
  };
}
function $x(n) {
  return function() {
    Op(this, n);
  };
}
function Kx(n, i) {
  return function() {
    (i.apply(this, arguments) ? Dp : Op)(this, n);
  };
}
function Jx(n, i) {
  var o = Cp(n + "");
  if (arguments.length < 2) {
    for (var u = $f(this.node()), s = -1, f = o.length; ++s < f; ) if (!u.contains(o[s])) return !1;
    return !0;
  }
  return this.each((typeof i == "function" ? Kx : i ? Qx : $x)(o, i));
}
function Wx() {
  this.textContent = "";
}
function Fx(n) {
  return function() {
    this.textContent = n;
  };
}
function Ix(n) {
  return function() {
    var i = n.apply(this, arguments);
    this.textContent = i ?? "";
  };
}
function Px(n) {
  return arguments.length ? this.each(n == null ? Wx : (typeof n == "function" ? Ix : Fx)(n)) : this.node().textContent;
}
function t_() {
  this.innerHTML = "";
}
function e_(n) {
  return function() {
    this.innerHTML = n;
  };
}
function n_(n) {
  return function() {
    var i = n.apply(this, arguments);
    this.innerHTML = i ?? "";
  };
}
function l_(n) {
  return arguments.length ? this.each(n == null ? t_ : (typeof n == "function" ? n_ : e_)(n)) : this.node().innerHTML;
}
function a_() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function i_() {
  return this.each(a_);
}
function o_() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function u_() {
  return this.each(o_);
}
function r_(n) {
  var i = typeof n == "function" ? n : wp(n);
  return this.select(function() {
    return this.appendChild(i.apply(this, arguments));
  });
}
function c_() {
  return null;
}
function s_(n, i) {
  var o = typeof n == "function" ? n : wp(n), u = i == null ? c_ : typeof i == "function" ? i : Qf(i);
  return this.select(function() {
    return this.insertBefore(o.apply(this, arguments), u.apply(this, arguments) || null);
  });
}
function f_() {
  var n = this.parentNode;
  n && n.removeChild(this);
}
function d_() {
  return this.each(f_);
}
function h_() {
  var n = this.cloneNode(!1), i = this.parentNode;
  return i ? i.insertBefore(n, this.nextSibling) : n;
}
function g_() {
  var n = this.cloneNode(!0), i = this.parentNode;
  return i ? i.insertBefore(n, this.nextSibling) : n;
}
function m_(n) {
  return this.select(n ? g_ : h_);
}
function p_(n) {
  return arguments.length ? this.property("__data__", n) : this.node().__data__;
}
function y_(n) {
  return function(i) {
    n.call(this, i, this.__data__);
  };
}
function v_(n) {
  return n.trim().split(/^|\s+/).map(function(i) {
    var o = "", u = i.indexOf(".");
    return u >= 0 && (o = i.slice(u + 1), i = i.slice(0, u)), { type: i, name: o };
  });
}
function b_(n) {
  return function() {
    var i = this.__on;
    if (i) {
      for (var o = 0, u = -1, s = i.length, f; o < s; ++o)
        f = i[o], (!n.type || f.type === n.type) && f.name === n.name ? this.removeEventListener(f.type, f.listener, f.options) : i[++u] = f;
      ++u ? i.length = u : delete this.__on;
    }
  };
}
function x_(n, i, o) {
  return function() {
    var u = this.__on, s, f = y_(i);
    if (u) {
      for (var d = 0, g = u.length; d < g; ++d)
        if ((s = u[d]).type === n.type && s.name === n.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = f, s.options = o), s.value = i;
          return;
        }
    }
    this.addEventListener(n.type, f, o), s = { type: n.type, name: n.name, value: i, listener: f, options: o }, u ? u.push(s) : this.__on = [s];
  };
}
function __(n, i, o) {
  var u = v_(n + ""), s, f = u.length, d;
  if (arguments.length < 2) {
    var g = this.node().__on;
    if (g) {
      for (var p = 0, h = g.length, v; p < h; ++p)
        for (s = 0, v = g[p]; s < f; ++s)
          if ((d = u[s]).type === v.type && d.name === v.name)
            return v.value;
    }
    return;
  }
  for (g = i ? x_ : b_, s = 0; s < f; ++s) this.each(g(u[s], i, o));
  return this;
}
function Hp(n, i, o) {
  var u = Ap(n), s = u.CustomEvent;
  typeof s == "function" ? s = new s(i, o) : (s = u.document.createEvent("Event"), o ? (s.initEvent(i, o.bubbles, o.cancelable), s.detail = o.detail) : s.initEvent(i, !1, !1)), n.dispatchEvent(s);
}
function S_(n, i) {
  return function() {
    return Hp(this, n, i);
  };
}
function w_(n, i) {
  return function() {
    return Hp(this, n, i.apply(this, arguments));
  };
}
function E_(n, i) {
  return this.each((typeof i == "function" ? w_ : S_)(n, i));
}
function* z_() {
  for (var n = this._groups, i = 0, o = n.length; i < o; ++i)
    for (var u = n[i], s = 0, f = u.length, d; s < f; ++s)
      (d = u[s]) && (yield d);
}
var Rp = [null];
function je(n, i) {
  this._groups = n, this._parents = i;
}
function No() {
  return new je([[document.documentElement]], Rp);
}
function M_() {
  return this;
}
je.prototype = No.prototype = {
  constructor: je,
  select: Ib,
  selectAll: nx,
  selectChild: ox,
  selectChildren: sx,
  filter: fx,
  data: yx,
  enter: dx,
  exit: bx,
  join: xx,
  merge: _x,
  selection: M_,
  order: Sx,
  sort: wx,
  call: zx,
  nodes: Mx,
  node: Nx,
  size: Ax,
  empty: Cx,
  each: Tx,
  attr: kx,
  style: Vx,
  property: Gx,
  classed: Jx,
  text: Px,
  html: l_,
  raise: i_,
  lower: u_,
  append: r_,
  insert: s_,
  remove: d_,
  clone: m_,
  datum: p_,
  on: __,
  dispatch: E_,
  [Symbol.iterator]: z_
};
function Ye(n) {
  return typeof n == "string" ? new je([[document.querySelector(n)]], [document.documentElement]) : new je([[n]], Rp);
}
function N_(n) {
  let i;
  for (; i = n.sourceEvent; ) n = i;
  return n;
}
function nn(n, i) {
  if (n = N_(n), i === void 0 && (i = n.currentTarget), i) {
    var o = i.ownerSVGElement || i;
    if (o.createSVGPoint) {
      var u = o.createSVGPoint();
      return u.x = n.clientX, u.y = n.clientY, u = u.matrixTransform(i.getScreenCTM().inverse()), [u.x, u.y];
    }
    if (i.getBoundingClientRect) {
      var s = i.getBoundingClientRect();
      return [n.clientX - s.left - i.clientLeft, n.clientY - s.top - i.clientTop];
    }
  }
  return [n.pageX, n.pageY];
}
const A_ = { passive: !1 }, po = { capture: !0, passive: !1 };
function mf(n) {
  n.stopImmediatePropagation();
}
function Pa(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function Bp(n) {
  var i = n.document.documentElement, o = Ye(n).on("dragstart.drag", Pa, po);
  "onselectstart" in i ? o.on("selectstart.drag", Pa, po) : (i.__noselect = i.style.MozUserSelect, i.style.MozUserSelect = "none");
}
function Up(n, i) {
  var o = n.document.documentElement, u = Ye(n).on("dragstart.drag", null);
  i && (u.on("click.drag", Pa, po), setTimeout(function() {
    u.on("click.drag", null);
  }, 0)), "onselectstart" in o ? u.on("selectstart.drag", null) : (o.style.MozUserSelect = o.__noselect, delete o.__noselect);
}
const nr = (n) => () => n;
function Cf(n, {
  sourceEvent: i,
  subject: o,
  target: u,
  identifier: s,
  active: f,
  x: d,
  y: g,
  dx: p,
  dy: h,
  dispatch: v
}) {
  Object.defineProperties(this, {
    type: { value: n, enumerable: !0, configurable: !0 },
    sourceEvent: { value: i, enumerable: !0, configurable: !0 },
    subject: { value: o, enumerable: !0, configurable: !0 },
    target: { value: u, enumerable: !0, configurable: !0 },
    identifier: { value: s, enumerable: !0, configurable: !0 },
    active: { value: f, enumerable: !0, configurable: !0 },
    x: { value: d, enumerable: !0, configurable: !0 },
    y: { value: g, enumerable: !0, configurable: !0 },
    dx: { value: p, enumerable: !0, configurable: !0 },
    dy: { value: h, enumerable: !0, configurable: !0 },
    _: { value: v }
  });
}
Cf.prototype.on = function() {
  var n = this._.on.apply(this._, arguments);
  return n === this._ ? this : n;
};
function C_(n) {
  return !n.ctrlKey && !n.button;
}
function T_() {
  return this.parentNode;
}
function D_(n, i) {
  return i ?? { x: n.x, y: n.y };
}
function O_() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function kp() {
  var n = C_, i = T_, o = D_, u = O_, s = {}, f = Or("start", "drag", "end"), d = 0, g, p, h, v, y = 0;
  function b(C) {
    C.on("mousedown.drag", _).filter(u).on("touchstart.drag", N).on("touchmove.drag", M, A_).on("touchend.drag touchcancel.drag", U).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function _(C, j) {
    if (!(v || !n.call(this, C, j))) {
      var k = S(this, i.call(this, C, j), C, j, "mouse");
      k && (Ye(C.view).on("mousemove.drag", w, po).on("mouseup.drag", A, po), Bp(C.view), mf(C), h = !1, g = C.clientX, p = C.clientY, k("start", C));
    }
  }
  function w(C) {
    if (Pa(C), !h) {
      var j = C.clientX - g, k = C.clientY - p;
      h = j * j + k * k > y;
    }
    s.mouse("drag", C);
  }
  function A(C) {
    Ye(C.view).on("mousemove.drag mouseup.drag", null), Up(C.view, h), Pa(C), s.mouse("end", C);
  }
  function N(C, j) {
    if (n.call(this, C, j)) {
      var k = C.changedTouches, B = i.call(this, C, j), $ = k.length, J, ut;
      for (J = 0; J < $; ++J)
        (ut = S(this, B, C, j, k[J].identifier, k[J])) && (mf(C), ut("start", C, k[J]));
    }
  }
  function M(C) {
    var j = C.changedTouches, k = j.length, B, $;
    for (B = 0; B < k; ++B)
      ($ = s[j[B].identifier]) && (Pa(C), $("drag", C, j[B]));
  }
  function U(C) {
    var j = C.changedTouches, k = j.length, B, $;
    for (v && clearTimeout(v), v = setTimeout(function() {
      v = null;
    }, 500), B = 0; B < k; ++B)
      ($ = s[j[B].identifier]) && (mf(C), $("end", C, j[B]));
  }
  function S(C, j, k, B, $, J) {
    var ut = f.copy(), X = nn(J || k, j), I, ot, T;
    if ((T = o.call(C, new Cf("beforestart", {
      sourceEvent: k,
      target: b,
      identifier: $,
      active: d,
      x: X[0],
      y: X[1],
      dx: 0,
      dy: 0,
      dispatch: ut
    }), B)) != null)
      return I = T.x - X[0] || 0, ot = T.y - X[1] || 0, function V(E, O, q) {
        var Z = X, nt;
        switch (E) {
          case "start":
            s[$] = V, nt = d++;
            break;
          case "end":
            delete s[$], --d;
          // falls through
          case "drag":
            X = nn(q || O, j), nt = d;
            break;
        }
        ut.call(
          E,
          C,
          new Cf(E, {
            sourceEvent: O,
            subject: T,
            target: b,
            identifier: $,
            active: nt,
            x: X[0] + I,
            y: X[1] + ot,
            dx: X[0] - Z[0],
            dy: X[1] - Z[1],
            dispatch: ut
          }),
          B
        );
      };
  }
  return b.filter = function(C) {
    return arguments.length ? (n = typeof C == "function" ? C : nr(!!C), b) : n;
  }, b.container = function(C) {
    return arguments.length ? (i = typeof C == "function" ? C : nr(C), b) : i;
  }, b.subject = function(C) {
    return arguments.length ? (o = typeof C == "function" ? C : nr(C), b) : o;
  }, b.touchable = function(C) {
    return arguments.length ? (u = typeof C == "function" ? C : nr(!!C), b) : u;
  }, b.on = function() {
    var C = f.on.apply(f, arguments);
    return C === f ? b : C;
  }, b.clickDistance = function(C) {
    return arguments.length ? (y = (C = +C) * C, b) : Math.sqrt(y);
  }, b;
}
function Kf(n, i, o) {
  n.prototype = i.prototype = o, o.constructor = n;
}
function Yp(n, i) {
  var o = Object.create(n.prototype);
  for (var u in i) o[u] = i[u];
  return o;
}
function Ao() {
}
var yo = 0.7, br = 1 / yo, ti = "\\s*([+-]?\\d+)\\s*", vo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", bn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", H_ = /^#([0-9a-f]{3,8})$/, R_ = new RegExp(`^rgb\\(${ti},${ti},${ti}\\)$`), B_ = new RegExp(`^rgb\\(${bn},${bn},${bn}\\)$`), U_ = new RegExp(`^rgba\\(${ti},${ti},${ti},${vo}\\)$`), k_ = new RegExp(`^rgba\\(${bn},${bn},${bn},${vo}\\)$`), Y_ = new RegExp(`^hsl\\(${vo},${bn},${bn}\\)$`), j_ = new RegExp(`^hsla\\(${vo},${bn},${bn},${vo}\\)$`), cm = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Kf(Ao, Pl, {
  copy(n) {
    return Object.assign(new this.constructor(), this, n);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: sm,
  // Deprecated! Use color.formatHex.
  formatHex: sm,
  formatHex8: L_,
  formatHsl: V_,
  formatRgb: fm,
  toString: fm
});
function sm() {
  return this.rgb().formatHex();
}
function L_() {
  return this.rgb().formatHex8();
}
function V_() {
  return jp(this).formatHsl();
}
function fm() {
  return this.rgb().formatRgb();
}
function Pl(n) {
  var i, o;
  return n = (n + "").trim().toLowerCase(), (i = H_.exec(n)) ? (o = i[1].length, i = parseInt(i[1], 16), o === 6 ? dm(i) : o === 3 ? new Ne(i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, (i & 15) << 4 | i & 15, 1) : o === 8 ? lr(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, (i & 255) / 255) : o === 4 ? lr(i >> 12 & 15 | i >> 8 & 240, i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, ((i & 15) << 4 | i & 15) / 255) : null) : (i = R_.exec(n)) ? new Ne(i[1], i[2], i[3], 1) : (i = B_.exec(n)) ? new Ne(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, 1) : (i = U_.exec(n)) ? lr(i[1], i[2], i[3], i[4]) : (i = k_.exec(n)) ? lr(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, i[4]) : (i = Y_.exec(n)) ? mm(i[1], i[2] / 100, i[3] / 100, 1) : (i = j_.exec(n)) ? mm(i[1], i[2] / 100, i[3] / 100, i[4]) : cm.hasOwnProperty(n) ? dm(cm[n]) : n === "transparent" ? new Ne(NaN, NaN, NaN, 0) : null;
}
function dm(n) {
  return new Ne(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function lr(n, i, o, u) {
  return u <= 0 && (n = i = o = NaN), new Ne(n, i, o, u);
}
function q_(n) {
  return n instanceof Ao || (n = Pl(n)), n ? (n = n.rgb(), new Ne(n.r, n.g, n.b, n.opacity)) : new Ne();
}
function Tf(n, i, o, u) {
  return arguments.length === 1 ? q_(n) : new Ne(n, i, o, u ?? 1);
}
function Ne(n, i, o, u) {
  this.r = +n, this.g = +i, this.b = +o, this.opacity = +u;
}
Kf(Ne, Tf, Yp(Ao, {
  brighter(n) {
    return n = n == null ? br : Math.pow(br, n), new Ne(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? yo : Math.pow(yo, n), new Ne(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ne(Wl(this.r), Wl(this.g), Wl(this.b), xr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: hm,
  // Deprecated! Use color.formatHex.
  formatHex: hm,
  formatHex8: X_,
  formatRgb: gm,
  toString: gm
}));
function hm() {
  return `#${Kl(this.r)}${Kl(this.g)}${Kl(this.b)}`;
}
function X_() {
  return `#${Kl(this.r)}${Kl(this.g)}${Kl(this.b)}${Kl((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function gm() {
  const n = xr(this.opacity);
  return `${n === 1 ? "rgb(" : "rgba("}${Wl(this.r)}, ${Wl(this.g)}, ${Wl(this.b)}${n === 1 ? ")" : `, ${n})`}`;
}
function xr(n) {
  return isNaN(n) ? 1 : Math.max(0, Math.min(1, n));
}
function Wl(n) {
  return Math.max(0, Math.min(255, Math.round(n) || 0));
}
function Kl(n) {
  return n = Wl(n), (n < 16 ? "0" : "") + n.toString(16);
}
function mm(n, i, o, u) {
  return u <= 0 ? n = i = o = NaN : o <= 0 || o >= 1 ? n = i = NaN : i <= 0 && (n = NaN), new an(n, i, o, u);
}
function jp(n) {
  if (n instanceof an) return new an(n.h, n.s, n.l, n.opacity);
  if (n instanceof Ao || (n = Pl(n)), !n) return new an();
  if (n instanceof an) return n;
  n = n.rgb();
  var i = n.r / 255, o = n.g / 255, u = n.b / 255, s = Math.min(i, o, u), f = Math.max(i, o, u), d = NaN, g = f - s, p = (f + s) / 2;
  return g ? (i === f ? d = (o - u) / g + (o < u) * 6 : o === f ? d = (u - i) / g + 2 : d = (i - o) / g + 4, g /= p < 0.5 ? f + s : 2 - f - s, d *= 60) : g = p > 0 && p < 1 ? 0 : d, new an(d, g, p, n.opacity);
}
function Z_(n, i, o, u) {
  return arguments.length === 1 ? jp(n) : new an(n, i, o, u ?? 1);
}
function an(n, i, o, u) {
  this.h = +n, this.s = +i, this.l = +o, this.opacity = +u;
}
Kf(an, Z_, Yp(Ao, {
  brighter(n) {
    return n = n == null ? br : Math.pow(br, n), new an(this.h, this.s, this.l * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? yo : Math.pow(yo, n), new an(this.h, this.s, this.l * n, this.opacity);
  },
  rgb() {
    var n = this.h % 360 + (this.h < 0) * 360, i = isNaN(n) || isNaN(this.s) ? 0 : this.s, o = this.l, u = o + (o < 0.5 ? o : 1 - o) * i, s = 2 * o - u;
    return new Ne(
      pf(n >= 240 ? n - 240 : n + 120, s, u),
      pf(n, s, u),
      pf(n < 120 ? n + 240 : n - 120, s, u),
      this.opacity
    );
  },
  clamp() {
    return new an(pm(this.h), ar(this.s), ar(this.l), xr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const n = xr(this.opacity);
    return `${n === 1 ? "hsl(" : "hsla("}${pm(this.h)}, ${ar(this.s) * 100}%, ${ar(this.l) * 100}%${n === 1 ? ")" : `, ${n})`}`;
  }
}));
function pm(n) {
  return n = (n || 0) % 360, n < 0 ? n + 360 : n;
}
function ar(n) {
  return Math.max(0, Math.min(1, n || 0));
}
function pf(n, i, o) {
  return (n < 60 ? i + (o - i) * n / 60 : n < 180 ? o : n < 240 ? i + (o - i) * (240 - n) / 60 : i) * 255;
}
const Jf = (n) => () => n;
function G_(n, i) {
  return function(o) {
    return n + o * i;
  };
}
function Q_(n, i, o) {
  return n = Math.pow(n, o), i = Math.pow(i, o) - n, o = 1 / o, function(u) {
    return Math.pow(n + u * i, o);
  };
}
function $_(n) {
  return (n = +n) == 1 ? Lp : function(i, o) {
    return o - i ? Q_(i, o, n) : Jf(isNaN(i) ? o : i);
  };
}
function Lp(n, i) {
  var o = i - n;
  return o ? G_(n, o) : Jf(isNaN(n) ? i : n);
}
const _r = (function n(i) {
  var o = $_(i);
  function u(s, f) {
    var d = o((s = Tf(s)).r, (f = Tf(f)).r), g = o(s.g, f.g), p = o(s.b, f.b), h = Lp(s.opacity, f.opacity);
    return function(v) {
      return s.r = d(v), s.g = g(v), s.b = p(v), s.opacity = h(v), s + "";
    };
  }
  return u.gamma = n, u;
})(1);
function K_(n, i) {
  i || (i = []);
  var o = n ? Math.min(i.length, n.length) : 0, u = i.slice(), s;
  return function(f) {
    for (s = 0; s < o; ++s) u[s] = n[s] * (1 - f) + i[s] * f;
    return u;
  };
}
function J_(n) {
  return ArrayBuffer.isView(n) && !(n instanceof DataView);
}
function W_(n, i) {
  var o = i ? i.length : 0, u = n ? Math.min(o, n.length) : 0, s = new Array(u), f = new Array(o), d;
  for (d = 0; d < u; ++d) s[d] = go(n[d], i[d]);
  for (; d < o; ++d) f[d] = i[d];
  return function(g) {
    for (d = 0; d < u; ++d) f[d] = s[d](g);
    return f;
  };
}
function F_(n, i) {
  var o = /* @__PURE__ */ new Date();
  return n = +n, i = +i, function(u) {
    return o.setTime(n * (1 - u) + i * u), o;
  };
}
function yn(n, i) {
  return n = +n, i = +i, function(o) {
    return n * (1 - o) + i * o;
  };
}
function I_(n, i) {
  var o = {}, u = {}, s;
  (n === null || typeof n != "object") && (n = {}), (i === null || typeof i != "object") && (i = {});
  for (s in i)
    s in n ? o[s] = go(n[s], i[s]) : u[s] = i[s];
  return function(f) {
    for (s in o) u[s] = o[s](f);
    return u;
  };
}
var Df = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, yf = new RegExp(Df.source, "g");
function P_(n) {
  return function() {
    return n;
  };
}
function tS(n) {
  return function(i) {
    return n(i) + "";
  };
}
function Vp(n, i) {
  var o = Df.lastIndex = yf.lastIndex = 0, u, s, f, d = -1, g = [], p = [];
  for (n = n + "", i = i + ""; (u = Df.exec(n)) && (s = yf.exec(i)); )
    (f = s.index) > o && (f = i.slice(o, f), g[d] ? g[d] += f : g[++d] = f), (u = u[0]) === (s = s[0]) ? g[d] ? g[d] += s : g[++d] = s : (g[++d] = null, p.push({ i: d, x: yn(u, s) })), o = yf.lastIndex;
  return o < i.length && (f = i.slice(o), g[d] ? g[d] += f : g[++d] = f), g.length < 2 ? p[0] ? tS(p[0].x) : P_(i) : (i = p.length, function(h) {
    for (var v = 0, y; v < i; ++v) g[(y = p[v]).i] = y.x(h);
    return g.join("");
  });
}
function go(n, i) {
  var o = typeof i, u;
  return i == null || o === "boolean" ? Jf(i) : (o === "number" ? yn : o === "string" ? (u = Pl(i)) ? (i = u, _r) : Vp : i instanceof Pl ? _r : i instanceof Date ? F_ : J_(i) ? K_ : Array.isArray(i) ? W_ : typeof i.valueOf != "function" && typeof i.toString != "function" || isNaN(i) ? I_ : yn)(n, i);
}
var ym = 180 / Math.PI, Of = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function qp(n, i, o, u, s, f) {
  var d, g, p;
  return (d = Math.sqrt(n * n + i * i)) && (n /= d, i /= d), (p = n * o + i * u) && (o -= n * p, u -= i * p), (g = Math.sqrt(o * o + u * u)) && (o /= g, u /= g, p /= g), n * u < i * o && (n = -n, i = -i, p = -p, d = -d), {
    translateX: s,
    translateY: f,
    rotate: Math.atan2(i, n) * ym,
    skewX: Math.atan(p) * ym,
    scaleX: d,
    scaleY: g
  };
}
var ir;
function eS(n) {
  const i = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(n + "");
  return i.isIdentity ? Of : qp(i.a, i.b, i.c, i.d, i.e, i.f);
}
function nS(n) {
  return n == null || (ir || (ir = document.createElementNS("http://www.w3.org/2000/svg", "g")), ir.setAttribute("transform", n), !(n = ir.transform.baseVal.consolidate())) ? Of : (n = n.matrix, qp(n.a, n.b, n.c, n.d, n.e, n.f));
}
function Xp(n, i, o, u) {
  function s(h) {
    return h.length ? h.pop() + " " : "";
  }
  function f(h, v, y, b, _, w) {
    if (h !== y || v !== b) {
      var A = _.push("translate(", null, i, null, o);
      w.push({ i: A - 4, x: yn(h, y) }, { i: A - 2, x: yn(v, b) });
    } else (y || b) && _.push("translate(" + y + i + b + o);
  }
  function d(h, v, y, b) {
    h !== v ? (h - v > 180 ? v += 360 : v - h > 180 && (h += 360), b.push({ i: y.push(s(y) + "rotate(", null, u) - 2, x: yn(h, v) })) : v && y.push(s(y) + "rotate(" + v + u);
  }
  function g(h, v, y, b) {
    h !== v ? b.push({ i: y.push(s(y) + "skewX(", null, u) - 2, x: yn(h, v) }) : v && y.push(s(y) + "skewX(" + v + u);
  }
  function p(h, v, y, b, _, w) {
    if (h !== y || v !== b) {
      var A = _.push(s(_) + "scale(", null, ",", null, ")");
      w.push({ i: A - 4, x: yn(h, y) }, { i: A - 2, x: yn(v, b) });
    } else (y !== 1 || b !== 1) && _.push(s(_) + "scale(" + y + "," + b + ")");
  }
  return function(h, v) {
    var y = [], b = [];
    return h = n(h), v = n(v), f(h.translateX, h.translateY, v.translateX, v.translateY, y, b), d(h.rotate, v.rotate, y, b), g(h.skewX, v.skewX, y, b), p(h.scaleX, h.scaleY, v.scaleX, v.scaleY, y, b), h = v = null, function(_) {
      for (var w = -1, A = b.length, N; ++w < A; ) y[(N = b[w]).i] = N.x(_);
      return y.join("");
    };
  };
}
var lS = Xp(eS, "px, ", "px)", "deg)"), aS = Xp(nS, ", ", ")", ")"), iS = 1e-12;
function vm(n) {
  return ((n = Math.exp(n)) + 1 / n) / 2;
}
function oS(n) {
  return ((n = Math.exp(n)) - 1 / n) / 2;
}
function uS(n) {
  return ((n = Math.exp(2 * n)) - 1) / (n + 1);
}
const hr = (function n(i, o, u) {
  function s(f, d) {
    var g = f[0], p = f[1], h = f[2], v = d[0], y = d[1], b = d[2], _ = v - g, w = y - p, A = _ * _ + w * w, N, M;
    if (A < iS)
      M = Math.log(b / h) / i, N = function(B) {
        return [
          g + B * _,
          p + B * w,
          h * Math.exp(i * B * M)
        ];
      };
    else {
      var U = Math.sqrt(A), S = (b * b - h * h + u * A) / (2 * h * o * U), C = (b * b - h * h - u * A) / (2 * b * o * U), j = Math.log(Math.sqrt(S * S + 1) - S), k = Math.log(Math.sqrt(C * C + 1) - C);
      M = (k - j) / i, N = function(B) {
        var $ = B * M, J = vm(j), ut = h / (o * U) * (J * uS(i * $ + j) - oS(j));
        return [
          g + ut * _,
          p + ut * w,
          h * J / vm(i * $ + j)
        ];
      };
    }
    return N.duration = M * 1e3 * i / Math.SQRT2, N;
  }
  return s.rho = function(f) {
    var d = Math.max(1e-3, +f), g = d * d, p = g * g;
    return n(d, g, p);
  }, s;
})(Math.SQRT2, 2, 4);
var ni = 0, so = 0, uo = 0, Zp = 1e3, Sr, fo, wr = 0, ta = 0, Rr = 0, bo = typeof performance == "object" && performance.now ? performance : Date, Gp = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(n) {
  setTimeout(n, 17);
};
function Wf() {
  return ta || (Gp(rS), ta = bo.now() + Rr);
}
function rS() {
  ta = 0;
}
function Er() {
  this._call = this._time = this._next = null;
}
Er.prototype = Qp.prototype = {
  constructor: Er,
  restart: function(n, i, o) {
    if (typeof n != "function") throw new TypeError("callback is not a function");
    o = (o == null ? Wf() : +o) + (i == null ? 0 : +i), !this._next && fo !== this && (fo ? fo._next = this : Sr = this, fo = this), this._call = n, this._time = o, Hf();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Hf());
  }
};
function Qp(n, i, o) {
  var u = new Er();
  return u.restart(n, i, o), u;
}
function cS() {
  Wf(), ++ni;
  for (var n = Sr, i; n; )
    (i = ta - n._time) >= 0 && n._call.call(void 0, i), n = n._next;
  --ni;
}
function bm() {
  ta = (wr = bo.now()) + Rr, ni = so = 0;
  try {
    cS();
  } finally {
    ni = 0, fS(), ta = 0;
  }
}
function sS() {
  var n = bo.now(), i = n - wr;
  i > Zp && (Rr -= i, wr = n);
}
function fS() {
  for (var n, i = Sr, o, u = 1 / 0; i; )
    i._call ? (u > i._time && (u = i._time), n = i, i = i._next) : (o = i._next, i._next = null, i = n ? n._next = o : Sr = o);
  fo = n, Hf(u);
}
function Hf(n) {
  if (!ni) {
    so && (so = clearTimeout(so));
    var i = n - ta;
    i > 24 ? (n < 1 / 0 && (so = setTimeout(bm, n - bo.now() - Rr)), uo && (uo = clearInterval(uo))) : (uo || (wr = bo.now(), uo = setInterval(sS, Zp)), ni = 1, Gp(bm));
  }
}
function xm(n, i, o) {
  var u = new Er();
  return i = i == null ? 0 : +i, u.restart((s) => {
    u.stop(), n(s + i);
  }, i, o), u;
}
var dS = Or("start", "end", "cancel", "interrupt"), hS = [], $p = 0, _m = 1, Rf = 2, gr = 3, Sm = 4, Bf = 5, mr = 6;
function Br(n, i, o, u, s, f) {
  var d = n.__transition;
  if (!d) n.__transition = {};
  else if (o in d) return;
  gS(n, o, {
    name: i,
    index: u,
    // For context during callback.
    group: s,
    // For context during callback.
    on: dS,
    tween: hS,
    time: f.time,
    delay: f.delay,
    duration: f.duration,
    ease: f.ease,
    timer: null,
    state: $p
  });
}
function Ff(n, i) {
  var o = sn(n, i);
  if (o.state > $p) throw new Error("too late; already scheduled");
  return o;
}
function xn(n, i) {
  var o = sn(n, i);
  if (o.state > gr) throw new Error("too late; already running");
  return o;
}
function sn(n, i) {
  var o = n.__transition;
  if (!o || !(o = o[i])) throw new Error("transition not found");
  return o;
}
function gS(n, i, o) {
  var u = n.__transition, s;
  u[i] = o, o.timer = Qp(f, 0, o.time);
  function f(h) {
    o.state = _m, o.timer.restart(d, o.delay, o.time), o.delay <= h && d(h - o.delay);
  }
  function d(h) {
    var v, y, b, _;
    if (o.state !== _m) return p();
    for (v in u)
      if (_ = u[v], _.name === o.name) {
        if (_.state === gr) return xm(d);
        _.state === Sm ? (_.state = mr, _.timer.stop(), _.on.call("interrupt", n, n.__data__, _.index, _.group), delete u[v]) : +v < i && (_.state = mr, _.timer.stop(), _.on.call("cancel", n, n.__data__, _.index, _.group), delete u[v]);
      }
    if (xm(function() {
      o.state === gr && (o.state = Sm, o.timer.restart(g, o.delay, o.time), g(h));
    }), o.state = Rf, o.on.call("start", n, n.__data__, o.index, o.group), o.state === Rf) {
      for (o.state = gr, s = new Array(b = o.tween.length), v = 0, y = -1; v < b; ++v)
        (_ = o.tween[v].value.call(n, n.__data__, o.index, o.group)) && (s[++y] = _);
      s.length = y + 1;
    }
  }
  function g(h) {
    for (var v = h < o.duration ? o.ease.call(null, h / o.duration) : (o.timer.restart(p), o.state = Bf, 1), y = -1, b = s.length; ++y < b; )
      s[y].call(n, v);
    o.state === Bf && (o.on.call("end", n, n.__data__, o.index, o.group), p());
  }
  function p() {
    o.state = mr, o.timer.stop(), delete u[i];
    for (var h in u) return;
    delete n.__transition;
  }
}
function pr(n, i) {
  var o = n.__transition, u, s, f = !0, d;
  if (o) {
    i = i == null ? null : i + "";
    for (d in o) {
      if ((u = o[d]).name !== i) {
        f = !1;
        continue;
      }
      s = u.state > Rf && u.state < Bf, u.state = mr, u.timer.stop(), u.on.call(s ? "interrupt" : "cancel", n, n.__data__, u.index, u.group), delete o[d];
    }
    f && delete n.__transition;
  }
}
function mS(n) {
  return this.each(function() {
    pr(this, n);
  });
}
function pS(n, i) {
  var o, u;
  return function() {
    var s = xn(this, n), f = s.tween;
    if (f !== o) {
      u = o = f;
      for (var d = 0, g = u.length; d < g; ++d)
        if (u[d].name === i) {
          u = u.slice(), u.splice(d, 1);
          break;
        }
    }
    s.tween = u;
  };
}
function yS(n, i, o) {
  var u, s;
  if (typeof o != "function") throw new Error();
  return function() {
    var f = xn(this, n), d = f.tween;
    if (d !== u) {
      s = (u = d).slice();
      for (var g = { name: i, value: o }, p = 0, h = s.length; p < h; ++p)
        if (s[p].name === i) {
          s[p] = g;
          break;
        }
      p === h && s.push(g);
    }
    f.tween = s;
  };
}
function vS(n, i) {
  var o = this._id;
  if (n += "", arguments.length < 2) {
    for (var u = sn(this.node(), o).tween, s = 0, f = u.length, d; s < f; ++s)
      if ((d = u[s]).name === n)
        return d.value;
    return null;
  }
  return this.each((i == null ? pS : yS)(o, n, i));
}
function If(n, i, o) {
  var u = n._id;
  return n.each(function() {
    var s = xn(this, u);
    (s.value || (s.value = {}))[i] = o.apply(this, arguments);
  }), function(s) {
    return sn(s, u).value[i];
  };
}
function Kp(n, i) {
  var o;
  return (typeof i == "number" ? yn : i instanceof Pl ? _r : (o = Pl(i)) ? (i = o, _r) : Vp)(n, i);
}
function bS(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function xS(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function _S(n, i, o) {
  var u, s = o + "", f;
  return function() {
    var d = this.getAttribute(n);
    return d === s ? null : d === u ? f : f = i(u = d, o);
  };
}
function SS(n, i, o) {
  var u, s = o + "", f;
  return function() {
    var d = this.getAttributeNS(n.space, n.local);
    return d === s ? null : d === u ? f : f = i(u = d, o);
  };
}
function wS(n, i, o) {
  var u, s, f;
  return function() {
    var d, g = o(this), p;
    return g == null ? void this.removeAttribute(n) : (d = this.getAttribute(n), p = g + "", d === p ? null : d === u && p === s ? f : (s = p, f = i(u = d, g)));
  };
}
function ES(n, i, o) {
  var u, s, f;
  return function() {
    var d, g = o(this), p;
    return g == null ? void this.removeAttributeNS(n.space, n.local) : (d = this.getAttributeNS(n.space, n.local), p = g + "", d === p ? null : d === u && p === s ? f : (s = p, f = i(u = d, g)));
  };
}
function zS(n, i) {
  var o = Hr(n), u = o === "transform" ? aS : Kp;
  return this.attrTween(n, typeof i == "function" ? (o.local ? ES : wS)(o, u, If(this, "attr." + n, i)) : i == null ? (o.local ? xS : bS)(o) : (o.local ? SS : _S)(o, u, i));
}
function MS(n, i) {
  return function(o) {
    this.setAttribute(n, i.call(this, o));
  };
}
function NS(n, i) {
  return function(o) {
    this.setAttributeNS(n.space, n.local, i.call(this, o));
  };
}
function AS(n, i) {
  var o, u;
  function s() {
    var f = i.apply(this, arguments);
    return f !== u && (o = (u = f) && NS(n, f)), o;
  }
  return s._value = i, s;
}
function CS(n, i) {
  var o, u;
  function s() {
    var f = i.apply(this, arguments);
    return f !== u && (o = (u = f) && MS(n, f)), o;
  }
  return s._value = i, s;
}
function TS(n, i) {
  var o = "attr." + n;
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (i == null) return this.tween(o, null);
  if (typeof i != "function") throw new Error();
  var u = Hr(n);
  return this.tween(o, (u.local ? AS : CS)(u, i));
}
function DS(n, i) {
  return function() {
    Ff(this, n).delay = +i.apply(this, arguments);
  };
}
function OS(n, i) {
  return i = +i, function() {
    Ff(this, n).delay = i;
  };
}
function HS(n) {
  var i = this._id;
  return arguments.length ? this.each((typeof n == "function" ? DS : OS)(i, n)) : sn(this.node(), i).delay;
}
function RS(n, i) {
  return function() {
    xn(this, n).duration = +i.apply(this, arguments);
  };
}
function BS(n, i) {
  return i = +i, function() {
    xn(this, n).duration = i;
  };
}
function US(n) {
  var i = this._id;
  return arguments.length ? this.each((typeof n == "function" ? RS : BS)(i, n)) : sn(this.node(), i).duration;
}
function kS(n, i) {
  if (typeof i != "function") throw new Error();
  return function() {
    xn(this, n).ease = i;
  };
}
function YS(n) {
  var i = this._id;
  return arguments.length ? this.each(kS(i, n)) : sn(this.node(), i).ease;
}
function jS(n, i) {
  return function() {
    var o = i.apply(this, arguments);
    if (typeof o != "function") throw new Error();
    xn(this, n).ease = o;
  };
}
function LS(n) {
  if (typeof n != "function") throw new Error();
  return this.each(jS(this._id, n));
}
function VS(n) {
  typeof n != "function" && (n = zp(n));
  for (var i = this._groups, o = i.length, u = new Array(o), s = 0; s < o; ++s)
    for (var f = i[s], d = f.length, g = u[s] = [], p, h = 0; h < d; ++h)
      (p = f[h]) && n.call(p, p.__data__, h, f) && g.push(p);
  return new Gn(u, this._parents, this._name, this._id);
}
function qS(n) {
  if (n._id !== this._id) throw new Error();
  for (var i = this._groups, o = n._groups, u = i.length, s = o.length, f = Math.min(u, s), d = new Array(u), g = 0; g < f; ++g)
    for (var p = i[g], h = o[g], v = p.length, y = d[g] = new Array(v), b, _ = 0; _ < v; ++_)
      (b = p[_] || h[_]) && (y[_] = b);
  for (; g < u; ++g)
    d[g] = i[g];
  return new Gn(d, this._parents, this._name, this._id);
}
function XS(n) {
  return (n + "").trim().split(/^|\s+/).every(function(i) {
    var o = i.indexOf(".");
    return o >= 0 && (i = i.slice(0, o)), !i || i === "start";
  });
}
function ZS(n, i, o) {
  var u, s, f = XS(i) ? Ff : xn;
  return function() {
    var d = f(this, n), g = d.on;
    g !== u && (s = (u = g).copy()).on(i, o), d.on = s;
  };
}
function GS(n, i) {
  var o = this._id;
  return arguments.length < 2 ? sn(this.node(), o).on.on(n) : this.each(ZS(o, n, i));
}
function QS(n) {
  return function() {
    var i = this.parentNode;
    for (var o in this.__transition) if (+o !== n) return;
    i && i.removeChild(this);
  };
}
function $S() {
  return this.on("end.remove", QS(this._id));
}
function KS(n) {
  var i = this._name, o = this._id;
  typeof n != "function" && (n = Qf(n));
  for (var u = this._groups, s = u.length, f = new Array(s), d = 0; d < s; ++d)
    for (var g = u[d], p = g.length, h = f[d] = new Array(p), v, y, b = 0; b < p; ++b)
      (v = g[b]) && (y = n.call(v, v.__data__, b, g)) && ("__data__" in v && (y.__data__ = v.__data__), h[b] = y, Br(h[b], i, o, b, h, sn(v, o)));
  return new Gn(f, this._parents, i, o);
}
function JS(n) {
  var i = this._name, o = this._id;
  typeof n != "function" && (n = Ep(n));
  for (var u = this._groups, s = u.length, f = [], d = [], g = 0; g < s; ++g)
    for (var p = u[g], h = p.length, v, y = 0; y < h; ++y)
      if (v = p[y]) {
        for (var b = n.call(v, v.__data__, y, p), _, w = sn(v, o), A = 0, N = b.length; A < N; ++A)
          (_ = b[A]) && Br(_, i, o, A, b, w);
        f.push(b), d.push(v);
      }
  return new Gn(f, d, i, o);
}
var WS = No.prototype.constructor;
function FS() {
  return new WS(this._groups, this._parents);
}
function IS(n, i) {
  var o, u, s;
  return function() {
    var f = ei(this, n), d = (this.style.removeProperty(n), ei(this, n));
    return f === d ? null : f === o && d === u ? s : s = i(o = f, u = d);
  };
}
function Jp(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function PS(n, i, o) {
  var u, s = o + "", f;
  return function() {
    var d = ei(this, n);
    return d === s ? null : d === u ? f : f = i(u = d, o);
  };
}
function tw(n, i, o) {
  var u, s, f;
  return function() {
    var d = ei(this, n), g = o(this), p = g + "";
    return g == null && (p = g = (this.style.removeProperty(n), ei(this, n))), d === p ? null : d === u && p === s ? f : (s = p, f = i(u = d, g));
  };
}
function ew(n, i) {
  var o, u, s, f = "style." + i, d = "end." + f, g;
  return function() {
    var p = xn(this, n), h = p.on, v = p.value[f] == null ? g || (g = Jp(i)) : void 0;
    (h !== o || s !== v) && (u = (o = h).copy()).on(d, s = v), p.on = u;
  };
}
function nw(n, i, o) {
  var u = (n += "") == "transform" ? lS : Kp;
  return i == null ? this.styleTween(n, IS(n, u)).on("end.style." + n, Jp(n)) : typeof i == "function" ? this.styleTween(n, tw(n, u, If(this, "style." + n, i))).each(ew(this._id, n)) : this.styleTween(n, PS(n, u, i), o).on("end.style." + n, null);
}
function lw(n, i, o) {
  return function(u) {
    this.style.setProperty(n, i.call(this, u), o);
  };
}
function aw(n, i, o) {
  var u, s;
  function f() {
    var d = i.apply(this, arguments);
    return d !== s && (u = (s = d) && lw(n, d, o)), u;
  }
  return f._value = i, f;
}
function iw(n, i, o) {
  var u = "style." + (n += "");
  if (arguments.length < 2) return (u = this.tween(u)) && u._value;
  if (i == null) return this.tween(u, null);
  if (typeof i != "function") throw new Error();
  return this.tween(u, aw(n, i, o ?? ""));
}
function ow(n) {
  return function() {
    this.textContent = n;
  };
}
function uw(n) {
  return function() {
    var i = n(this);
    this.textContent = i ?? "";
  };
}
function rw(n) {
  return this.tween("text", typeof n == "function" ? uw(If(this, "text", n)) : ow(n == null ? "" : n + ""));
}
function cw(n) {
  return function(i) {
    this.textContent = n.call(this, i);
  };
}
function sw(n) {
  var i, o;
  function u() {
    var s = n.apply(this, arguments);
    return s !== o && (i = (o = s) && cw(s)), i;
  }
  return u._value = n, u;
}
function fw(n) {
  var i = "text";
  if (arguments.length < 1) return (i = this.tween(i)) && i._value;
  if (n == null) return this.tween(i, null);
  if (typeof n != "function") throw new Error();
  return this.tween(i, sw(n));
}
function dw() {
  for (var n = this._name, i = this._id, o = Wp(), u = this._groups, s = u.length, f = 0; f < s; ++f)
    for (var d = u[f], g = d.length, p, h = 0; h < g; ++h)
      if (p = d[h]) {
        var v = sn(p, i);
        Br(p, n, o, h, d, {
          time: v.time + v.delay + v.duration,
          delay: 0,
          duration: v.duration,
          ease: v.ease
        });
      }
  return new Gn(u, this._parents, n, o);
}
function hw() {
  var n, i, o = this, u = o._id, s = o.size();
  return new Promise(function(f, d) {
    var g = { value: d }, p = { value: function() {
      --s === 0 && f();
    } };
    o.each(function() {
      var h = xn(this, u), v = h.on;
      v !== n && (i = (n = v).copy(), i._.cancel.push(g), i._.interrupt.push(g), i._.end.push(p)), h.on = i;
    }), s === 0 && f();
  });
}
var gw = 0;
function Gn(n, i, o, u) {
  this._groups = n, this._parents = i, this._name = o, this._id = u;
}
function Wp() {
  return ++gw;
}
var qn = No.prototype;
Gn.prototype = {
  constructor: Gn,
  select: KS,
  selectAll: JS,
  selectChild: qn.selectChild,
  selectChildren: qn.selectChildren,
  filter: VS,
  merge: qS,
  selection: FS,
  transition: dw,
  call: qn.call,
  nodes: qn.nodes,
  node: qn.node,
  size: qn.size,
  empty: qn.empty,
  each: qn.each,
  on: GS,
  attr: zS,
  attrTween: TS,
  style: nw,
  styleTween: iw,
  text: rw,
  textTween: fw,
  remove: $S,
  tween: vS,
  delay: HS,
  duration: US,
  ease: YS,
  easeVarying: LS,
  end: hw,
  [Symbol.iterator]: qn[Symbol.iterator]
};
function mw(n) {
  return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
}
var pw = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: mw
};
function yw(n, i) {
  for (var o; !(o = n.__transition) || !(o = o[i]); )
    if (!(n = n.parentNode))
      throw new Error(`transition ${i} not found`);
  return o;
}
function vw(n) {
  var i, o;
  n instanceof Gn ? (i = n._id, n = n._name) : (i = Wp(), (o = pw).time = Wf(), n = n == null ? null : n + "");
  for (var u = this._groups, s = u.length, f = 0; f < s; ++f)
    for (var d = u[f], g = d.length, p, h = 0; h < g; ++h)
      (p = d[h]) && Br(p, n, i, h, d, o || yw(p, i));
  return new Gn(u, this._parents, n, i);
}
No.prototype.interrupt = mS;
No.prototype.transition = vw;
const or = (n) => () => n;
function bw(n, {
  sourceEvent: i,
  target: o,
  transform: u,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: n, enumerable: !0, configurable: !0 },
    sourceEvent: { value: i, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    transform: { value: u, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function Xn(n, i, o) {
  this.k = n, this.x = i, this.y = o;
}
Xn.prototype = {
  constructor: Xn,
  scale: function(n) {
    return n === 1 ? this : new Xn(this.k * n, this.x, this.y);
  },
  translate: function(n, i) {
    return n === 0 & i === 0 ? this : new Xn(this.k, this.x + this.k * n, this.y + this.k * i);
  },
  apply: function(n) {
    return [n[0] * this.k + this.x, n[1] * this.k + this.y];
  },
  applyX: function(n) {
    return n * this.k + this.x;
  },
  applyY: function(n) {
    return n * this.k + this.y;
  },
  invert: function(n) {
    return [(n[0] - this.x) / this.k, (n[1] - this.y) / this.k];
  },
  invertX: function(n) {
    return (n - this.x) / this.k;
  },
  invertY: function(n) {
    return (n - this.y) / this.k;
  },
  rescaleX: function(n) {
    return n.copy().domain(n.range().map(this.invertX, this).map(n.invert, n));
  },
  rescaleY: function(n) {
    return n.copy().domain(n.range().map(this.invertY, this).map(n.invert, n));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Ur = new Xn(1, 0, 0);
Fp.prototype = Xn.prototype;
function Fp(n) {
  for (; !n.__zoom; ) if (!(n = n.parentNode)) return Ur;
  return n.__zoom;
}
function vf(n) {
  n.stopImmediatePropagation();
}
function ro(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function xw(n) {
  return (!n.ctrlKey || n.type === "wheel") && !n.button;
}
function _w() {
  var n = this;
  return n instanceof SVGElement ? (n = n.ownerSVGElement || n, n.hasAttribute("viewBox") ? (n = n.viewBox.baseVal, [[n.x, n.y], [n.x + n.width, n.y + n.height]]) : [[0, 0], [n.width.baseVal.value, n.height.baseVal.value]]) : [[0, 0], [n.clientWidth, n.clientHeight]];
}
function wm() {
  return this.__zoom || Ur;
}
function Sw(n) {
  return -n.deltaY * (n.deltaMode === 1 ? 0.05 : n.deltaMode ? 1 : 2e-3) * (n.ctrlKey ? 10 : 1);
}
function ww() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ew(n, i, o) {
  var u = n.invertX(i[0][0]) - o[0][0], s = n.invertX(i[1][0]) - o[1][0], f = n.invertY(i[0][1]) - o[0][1], d = n.invertY(i[1][1]) - o[1][1];
  return n.translate(
    s > u ? (u + s) / 2 : Math.min(0, u) || Math.max(0, s),
    d > f ? (f + d) / 2 : Math.min(0, f) || Math.max(0, d)
  );
}
function Ip() {
  var n = xw, i = _w, o = Ew, u = Sw, s = ww, f = [0, 1 / 0], d = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], g = 250, p = hr, h = Or("start", "zoom", "end"), v, y, b, _ = 500, w = 150, A = 0, N = 10;
  function M(T) {
    T.property("__zoom", wm).on("wheel.zoom", $, { passive: !1 }).on("mousedown.zoom", J).on("dblclick.zoom", ut).filter(s).on("touchstart.zoom", X).on("touchmove.zoom", I).on("touchend.zoom touchcancel.zoom", ot).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  M.transform = function(T, V, E, O) {
    var q = T.selection ? T.selection() : T;
    q.property("__zoom", wm), T !== q ? j(T, V, E, O) : q.interrupt().each(function() {
      k(this, arguments).event(O).start().zoom(null, typeof V == "function" ? V.apply(this, arguments) : V).end();
    });
  }, M.scaleBy = function(T, V, E, O) {
    M.scaleTo(T, function() {
      var q = this.__zoom.k, Z = typeof V == "function" ? V.apply(this, arguments) : V;
      return q * Z;
    }, E, O);
  }, M.scaleTo = function(T, V, E, O) {
    M.transform(T, function() {
      var q = i.apply(this, arguments), Z = this.__zoom, nt = E == null ? C(q) : typeof E == "function" ? E.apply(this, arguments) : E, z = Z.invert(nt), H = typeof V == "function" ? V.apply(this, arguments) : V;
      return o(S(U(Z, H), nt, z), q, d);
    }, E, O);
  }, M.translateBy = function(T, V, E, O) {
    M.transform(T, function() {
      return o(this.__zoom.translate(
        typeof V == "function" ? V.apply(this, arguments) : V,
        typeof E == "function" ? E.apply(this, arguments) : E
      ), i.apply(this, arguments), d);
    }, null, O);
  }, M.translateTo = function(T, V, E, O, q) {
    M.transform(T, function() {
      var Z = i.apply(this, arguments), nt = this.__zoom, z = O == null ? C(Z) : typeof O == "function" ? O.apply(this, arguments) : O;
      return o(Ur.translate(z[0], z[1]).scale(nt.k).translate(
        typeof V == "function" ? -V.apply(this, arguments) : -V,
        typeof E == "function" ? -E.apply(this, arguments) : -E
      ), Z, d);
    }, O, q);
  };
  function U(T, V) {
    return V = Math.max(f[0], Math.min(f[1], V)), V === T.k ? T : new Xn(V, T.x, T.y);
  }
  function S(T, V, E) {
    var O = V[0] - E[0] * T.k, q = V[1] - E[1] * T.k;
    return O === T.x && q === T.y ? T : new Xn(T.k, O, q);
  }
  function C(T) {
    return [(+T[0][0] + +T[1][0]) / 2, (+T[0][1] + +T[1][1]) / 2];
  }
  function j(T, V, E, O) {
    T.on("start.zoom", function() {
      k(this, arguments).event(O).start();
    }).on("interrupt.zoom end.zoom", function() {
      k(this, arguments).event(O).end();
    }).tween("zoom", function() {
      var q = this, Z = arguments, nt = k(q, Z).event(O), z = i.apply(q, Z), H = E == null ? C(z) : typeof E == "function" ? E.apply(q, Z) : E, P = Math.max(z[1][0] - z[0][0], z[1][1] - z[0][1]), lt = q.__zoom, rt = typeof V == "function" ? V.apply(q, Z) : V, ft = p(lt.invert(H).concat(P / lt.k), rt.invert(H).concat(P / rt.k));
      return function(ct) {
        if (ct === 1) ct = rt;
        else {
          var tt = ft(ct), st = P / tt[2];
          ct = new Xn(st, H[0] - tt[0] * st, H[1] - tt[1] * st);
        }
        nt.zoom(null, ct);
      };
    });
  }
  function k(T, V, E) {
    return !E && T.__zooming || new B(T, V);
  }
  function B(T, V) {
    this.that = T, this.args = V, this.active = 0, this.sourceEvent = null, this.extent = i.apply(T, V), this.taps = 0;
  }
  B.prototype = {
    event: function(T) {
      return T && (this.sourceEvent = T), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(T, V) {
      return this.mouse && T !== "mouse" && (this.mouse[1] = V.invert(this.mouse[0])), this.touch0 && T !== "touch" && (this.touch0[1] = V.invert(this.touch0[0])), this.touch1 && T !== "touch" && (this.touch1[1] = V.invert(this.touch1[0])), this.that.__zoom = V, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(T) {
      var V = Ye(this.that).datum();
      h.call(
        T,
        this.that,
        new bw(T, {
          sourceEvent: this.sourceEvent,
          target: M,
          transform: this.that.__zoom,
          dispatch: h
        }),
        V
      );
    }
  };
  function $(T, ...V) {
    if (!n.apply(this, arguments)) return;
    var E = k(this, V).event(T), O = this.__zoom, q = Math.max(f[0], Math.min(f[1], O.k * Math.pow(2, u.apply(this, arguments)))), Z = nn(T);
    if (E.wheel)
      (E.mouse[0][0] !== Z[0] || E.mouse[0][1] !== Z[1]) && (E.mouse[1] = O.invert(E.mouse[0] = Z)), clearTimeout(E.wheel);
    else {
      if (O.k === q) return;
      E.mouse = [Z, O.invert(Z)], pr(this), E.start();
    }
    ro(T), E.wheel = setTimeout(nt, w), E.zoom("mouse", o(S(U(O, q), E.mouse[0], E.mouse[1]), E.extent, d));
    function nt() {
      E.wheel = null, E.end();
    }
  }
  function J(T, ...V) {
    if (b || !n.apply(this, arguments)) return;
    var E = T.currentTarget, O = k(this, V, !0).event(T), q = Ye(T.view).on("mousemove.zoom", H, !0).on("mouseup.zoom", P, !0), Z = nn(T, E), nt = T.clientX, z = T.clientY;
    Bp(T.view), vf(T), O.mouse = [Z, this.__zoom.invert(Z)], pr(this), O.start();
    function H(lt) {
      if (ro(lt), !O.moved) {
        var rt = lt.clientX - nt, ft = lt.clientY - z;
        O.moved = rt * rt + ft * ft > A;
      }
      O.event(lt).zoom("mouse", o(S(O.that.__zoom, O.mouse[0] = nn(lt, E), O.mouse[1]), O.extent, d));
    }
    function P(lt) {
      q.on("mousemove.zoom mouseup.zoom", null), Up(lt.view, O.moved), ro(lt), O.event(lt).end();
    }
  }
  function ut(T, ...V) {
    if (n.apply(this, arguments)) {
      var E = this.__zoom, O = nn(T.changedTouches ? T.changedTouches[0] : T, this), q = E.invert(O), Z = E.k * (T.shiftKey ? 0.5 : 2), nt = o(S(U(E, Z), O, q), i.apply(this, V), d);
      ro(T), g > 0 ? Ye(this).transition().duration(g).call(j, nt, O, T) : Ye(this).call(M.transform, nt, O, T);
    }
  }
  function X(T, ...V) {
    if (n.apply(this, arguments)) {
      var E = T.touches, O = E.length, q = k(this, V, T.changedTouches.length === O).event(T), Z, nt, z, H;
      for (vf(T), nt = 0; nt < O; ++nt)
        z = E[nt], H = nn(z, this), H = [H, this.__zoom.invert(H), z.identifier], q.touch0 ? !q.touch1 && q.touch0[2] !== H[2] && (q.touch1 = H, q.taps = 0) : (q.touch0 = H, Z = !0, q.taps = 1 + !!v);
      v && (v = clearTimeout(v)), Z && (q.taps < 2 && (y = H[0], v = setTimeout(function() {
        v = null;
      }, _)), pr(this), q.start());
    }
  }
  function I(T, ...V) {
    if (this.__zooming) {
      var E = k(this, V).event(T), O = T.changedTouches, q = O.length, Z, nt, z, H;
      for (ro(T), Z = 0; Z < q; ++Z)
        nt = O[Z], z = nn(nt, this), E.touch0 && E.touch0[2] === nt.identifier ? E.touch0[0] = z : E.touch1 && E.touch1[2] === nt.identifier && (E.touch1[0] = z);
      if (nt = E.that.__zoom, E.touch1) {
        var P = E.touch0[0], lt = E.touch0[1], rt = E.touch1[0], ft = E.touch1[1], ct = (ct = rt[0] - P[0]) * ct + (ct = rt[1] - P[1]) * ct, tt = (tt = ft[0] - lt[0]) * tt + (tt = ft[1] - lt[1]) * tt;
        nt = U(nt, Math.sqrt(ct / tt)), z = [(P[0] + rt[0]) / 2, (P[1] + rt[1]) / 2], H = [(lt[0] + ft[0]) / 2, (lt[1] + ft[1]) / 2];
      } else if (E.touch0) z = E.touch0[0], H = E.touch0[1];
      else return;
      E.zoom("touch", o(S(nt, z, H), E.extent, d));
    }
  }
  function ot(T, ...V) {
    if (this.__zooming) {
      var E = k(this, V).event(T), O = T.changedTouches, q = O.length, Z, nt;
      for (vf(T), b && clearTimeout(b), b = setTimeout(function() {
        b = null;
      }, _), Z = 0; Z < q; ++Z)
        nt = O[Z], E.touch0 && E.touch0[2] === nt.identifier ? delete E.touch0 : E.touch1 && E.touch1[2] === nt.identifier && delete E.touch1;
      if (E.touch1 && !E.touch0 && (E.touch0 = E.touch1, delete E.touch1), E.touch0) E.touch0[1] = this.__zoom.invert(E.touch0[0]);
      else if (E.end(), E.taps === 2 && (nt = nn(nt, this), Math.hypot(y[0] - nt[0], y[1] - nt[1]) < N)) {
        var z = Ye(this).on("dblclick.zoom");
        z && z.apply(this, arguments);
      }
    }
  }
  return M.wheelDelta = function(T) {
    return arguments.length ? (u = typeof T == "function" ? T : or(+T), M) : u;
  }, M.filter = function(T) {
    return arguments.length ? (n = typeof T == "function" ? T : or(!!T), M) : n;
  }, M.touchable = function(T) {
    return arguments.length ? (s = typeof T == "function" ? T : or(!!T), M) : s;
  }, M.extent = function(T) {
    return arguments.length ? (i = typeof T == "function" ? T : or([[+T[0][0], +T[0][1]], [+T[1][0], +T[1][1]]]), M) : i;
  }, M.scaleExtent = function(T) {
    return arguments.length ? (f[0] = +T[0], f[1] = +T[1], M) : [f[0], f[1]];
  }, M.translateExtent = function(T) {
    return arguments.length ? (d[0][0] = +T[0][0], d[1][0] = +T[1][0], d[0][1] = +T[0][1], d[1][1] = +T[1][1], M) : [[d[0][0], d[0][1]], [d[1][0], d[1][1]]];
  }, M.constrain = function(T) {
    return arguments.length ? (o = T, M) : o;
  }, M.duration = function(T) {
    return arguments.length ? (g = +T, M) : g;
  }, M.interpolate = function(T) {
    return arguments.length ? (p = T, M) : p;
  }, M.on = function() {
    var T = h.on.apply(h, arguments);
    return T === h ? M : T;
  }, M.clickDistance = function(T) {
    return arguments.length ? (A = (T = +T) * T, M) : Math.sqrt(A);
  }, M.tapDistance = function(T) {
    return arguments.length ? (N = +T, M) : N;
  }, M;
}
const cn = {
  error001: (n = "react") => `Seems like you have not used ${n === "svelte" ? "SvelteFlowProvider" : "ReactFlowProvider"} as an ancestor. Help: https://${n}flow.dev/error#001`,
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (n) => `Node type "${n}" not found. Using fallback type "default".`,
  error004: () => "The parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (n) => `The old edge with id=${n} does not exist.`,
  error009: (n) => `Marker type "${n}" doesn't exist.`,
  error008: (n, { id: i, sourceHandle: o, targetHandle: u }) => `Couldn't create edge for ${n} handle id: "${n === "source" ? o : u}", edge id: ${i}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (n) => `Edge type "${n}" not found. Using fallback type "default".`,
  error012: (n) => `Node with id "${n}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (n = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${n}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (n) => `Edge with id "${n}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, xo = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], Pp = ["Enter", " ", "Escape"], ty = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: n, x: i, y: o }) => `Moved selected node ${n}. New position, x: ${i}, y: ${o}`,
  "edge.a11yDescription.default": "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
  // Control elements
  "controls.ariaLabel": "Control Panel",
  "controls.zoomIn.ariaLabel": "Zoom In",
  "controls.zoomOut.ariaLabel": "Zoom Out",
  "controls.fitView.ariaLabel": "Fit View",
  "controls.interactive.ariaLabel": "Toggle Interactivity",
  // Mini map
  "minimap.ariaLabel": "Mini Map",
  // Handle
  "handle.ariaLabel": "Handle"
};
var li;
(function(n) {
  n.Strict = "strict", n.Loose = "loose";
})(li || (li = {}));
var Fl;
(function(n) {
  n.Free = "free", n.Vertical = "vertical", n.Horizontal = "horizontal";
})(Fl || (Fl = {}));
var _o;
(function(n) {
  n.Partial = "partial", n.Full = "full";
})(_o || (_o = {}));
const ey = {
  inProgress: !1,
  isValid: null,
  from: null,
  fromHandle: null,
  fromPosition: null,
  fromNode: null,
  to: null,
  toHandle: null,
  toPosition: null,
  toNode: null,
  pointer: null
};
var El;
(function(n) {
  n.Bezier = "default", n.Straight = "straight", n.Step = "step", n.SmoothStep = "smoothstep", n.SimpleBezier = "simplebezier";
})(El || (El = {}));
var zr;
(function(n) {
  n.Arrow = "arrow", n.ArrowClosed = "arrowclosed";
})(zr || (zr = {}));
var mt;
(function(n) {
  n.Left = "left", n.Top = "top", n.Right = "right", n.Bottom = "bottom";
})(mt || (mt = {}));
const Em = {
  [mt.Left]: mt.Right,
  [mt.Right]: mt.Left,
  [mt.Top]: mt.Bottom,
  [mt.Bottom]: mt.Top
};
function ny(n) {
  return n === null ? null : n ? "valid" : "invalid";
}
const ly = (n) => "id" in n && "source" in n && "target" in n, zw = (n) => "id" in n && "position" in n && !("source" in n) && !("target" in n), Pf = (n) => "id" in n && "internals" in n && !("source" in n) && !("target" in n), Co = (n, i = [0, 0]) => {
  const { width: o, height: u } = Qn(n), s = n.origin ?? i, f = o * s[0], d = u * s[1];
  return {
    x: n.position.x - f,
    y: n.position.y - d
  };
}, Mw = (n, i = { nodeOrigin: [0, 0] }) => {
  if (n.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const o = n.reduce((u, s) => {
    const f = typeof s == "string";
    let d = !i.nodeLookup && !f ? s : void 0;
    i.nodeLookup && (d = f ? i.nodeLookup.get(s) : Pf(s) ? s : i.nodeLookup.get(s.id));
    const g = d ? Mr(d, i.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return kr(u, g);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Yr(o);
}, To = (n, i = {}) => {
  let o = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, u = !1;
  return n.forEach((s) => {
    (i.filter === void 0 || i.filter(s)) && (o = kr(o, Mr(s)), u = !0);
  }), u ? Yr(o) : { x: 0, y: 0, width: 0, height: 0 };
}, td = (n, i, [o, u, s] = [0, 0, 1], f = !1, d = !1) => {
  const g = (i.x - o) / s, p = (i.y - u) / s, h = i.width / s, v = i.height / s, y = [];
  for (const b of n.values()) {
    const { measured: _, selectable: w = !0, hidden: A = !1 } = b;
    if (d && !w || A)
      continue;
    const N = _.width ?? b.width ?? b.initialWidth ?? 0, M = _.height ?? b.height ?? b.initialHeight ?? 0, { x: U, y: S } = b.internals.positionAbsolute, C = uy(g, p, h, v, U, S, N, M), j = N * M, k = f && C > 0;
    (!b.internals.handleBounds || k || C >= j || b.dragging) && y.push(b);
  }
  return y;
}, Nw = (n, i) => {
  const o = /* @__PURE__ */ new Set();
  return n.forEach((u) => {
    o.add(u.id);
  }), i.filter((u) => o.has(u.source) || o.has(u.target));
};
function Aw(n, i) {
  const o = /* @__PURE__ */ new Map(), u = i?.nodes ? new Set(i.nodes.map((s) => s.id)) : null;
  return n.forEach((s) => {
    s.measured.width && s.measured.height && (i?.includeHiddenNodes || !s.hidden) && (!u || u.has(s.id)) && o.set(s.id, s);
  }), o;
}
async function Cw({ nodes: n, width: i, height: o, panZoom: u, minZoom: s, maxZoom: f }, d) {
  if (n.size === 0)
    return !0;
  const g = Aw(n, d), p = To(g), h = nd(p, i, o, d?.minZoom ?? s, d?.maxZoom ?? f, d?.padding ?? 0.1);
  return await u.setViewport(h, {
    duration: d?.duration,
    ease: d?.ease,
    interpolate: d?.interpolate
  }), !0;
}
function ay({ nodeId: n, nextPosition: i, nodeLookup: o, nodeOrigin: u = [0, 0], nodeExtent: s, onError: f }) {
  const d = o.get(n), g = d.parentId ? o.get(d.parentId) : void 0, { x: p, y: h } = g ? g.internals.positionAbsolute : { x: 0, y: 0 }, v = d.origin ?? u;
  let y = d.extent || s;
  if (d.extent === "parent" && !d.expandParent)
    if (!g)
      f?.("005", cn.error005());
    else {
      const _ = g.measured.width, w = g.measured.height;
      _ && w && (y = [
        [p, h],
        [p + _, h + w]
      ]);
    }
  else g && na(d.extent) && (y = [
    [d.extent[0][0] + p, d.extent[0][1] + h],
    [d.extent[1][0] + p, d.extent[1][1] + h]
  ]);
  const b = na(y) ? ea(i, y, d.measured) : i;
  return (d.measured.width === void 0 || d.measured.height === void 0) && f?.("015", cn.error015()), {
    position: {
      x: b.x - p + (d.measured.width ?? 0) * v[0],
      y: b.y - h + (d.measured.height ?? 0) * v[1]
    },
    positionAbsolute: b
  };
}
async function Tw({ nodesToRemove: n = [], edgesToRemove: i = [], nodes: o, edges: u, onBeforeDelete: s }) {
  const f = new Set(n.map((b) => b.id)), d = [];
  for (const b of o) {
    if (b.deletable === !1)
      continue;
    const _ = f.has(b.id), w = !_ && b.parentId && d.find((A) => A.id === b.parentId);
    (_ || w) && d.push(b);
  }
  const g = new Set(i.map((b) => b.id)), p = u.filter((b) => b.deletable !== !1), v = Nw(d, p);
  for (const b of p)
    g.has(b.id) && !v.find((w) => w.id === b.id) && v.push(b);
  if (!s)
    return {
      edges: v,
      nodes: d
    };
  const y = await s({
    nodes: d,
    edges: v
  });
  return typeof y == "boolean" ? y ? { edges: v, nodes: d } : { edges: [], nodes: [] } : y;
}
const ai = (n, i = 0, o = 1) => Math.min(Math.max(n, i), o), ea = (n = { x: 0, y: 0 }, i, o) => ({
  x: ai(n.x, i[0][0], i[1][0] - (o?.width ?? 0)),
  y: ai(n.y, i[0][1], i[1][1] - (o?.height ?? 0))
});
function iy(n, i, o) {
  const { width: u, height: s } = Qn(o), { x: f, y: d } = o.internals.positionAbsolute;
  return ea(n, [
    [f, d],
    [f + u, d + s]
  ], i);
}
const zm = (n, i, o) => n < i ? ai(Math.abs(n - i), 1, i) / i : n > o ? -ai(Math.abs(n - o), 1, i) / i : 0, ed = (n, i, o = 15, u = 40) => {
  const s = zm(n.x, u, i.width - u) * o, f = zm(n.y, u, i.height - u) * o;
  return [s, f];
}, kr = (n, i) => ({
  x: Math.min(n.x, i.x),
  y: Math.min(n.y, i.y),
  x2: Math.max(n.x2, i.x2),
  y2: Math.max(n.y2, i.y2)
}), Uf = ({ x: n, y: i, width: o, height: u }) => ({
  x: n,
  y: i,
  x2: n + o,
  y2: i + u
}), Yr = ({ x: n, y: i, x2: o, y2: u }) => ({
  x: n,
  y: i,
  width: o - n,
  height: u - i
}), So = (n, i = [0, 0]) => {
  const { x: o, y: u } = Pf(n) ? n.internals.positionAbsolute : Co(n, i);
  return {
    x: o,
    y: u,
    width: n.measured?.width ?? n.width ?? n.initialWidth ?? 0,
    height: n.measured?.height ?? n.height ?? n.initialHeight ?? 0
  };
}, Mr = (n, i = [0, 0]) => {
  const { x: o, y: u } = Pf(n) ? n.internals.positionAbsolute : Co(n, i);
  return {
    x: o,
    y: u,
    x2: o + (n.measured?.width ?? n.width ?? n.initialWidth ?? 0),
    y2: u + (n.measured?.height ?? n.height ?? n.initialHeight ?? 0)
  };
}, oy = (n, i) => Yr(kr(Uf(n), Uf(i))), uy = (n, i, o, u, s, f, d, g) => {
  const p = Math.max(0, Math.min(n + o, s + d) - Math.max(n, s)), h = Math.max(0, Math.min(i + u, f + g) - Math.max(i, f));
  return Math.ceil(p * h);
}, Nr = (n, i) => uy(n.x, n.y, n.width, n.height, i.x, i.y, i.width, i.height), Mm = (n) => un(n.width) && un(n.height) && un(n.x) && un(n.y), un = (n) => !isNaN(n) && isFinite(n), ry = (n, i) => (o, u) => {
}, Do = (n, i = [1, 1]) => ({
  x: i[0] * Math.round(n.x / i[0]),
  y: i[1] * Math.round(n.y / i[1])
}), Oo = ({ x: n, y: i }, [o, u, s], f = !1, d = [1, 1]) => {
  const g = {
    x: (n - o) / s,
    y: (i - u) / s
  };
  return f ? Do(g, d) : g;
}, ii = ({ x: n, y: i }, [o, u, s]) => ({
  x: n * s + o,
  y: i * s + u
});
function Ja(n, i) {
  if (typeof n == "number")
    return Math.floor((i - i / (1 + n)) * 0.5);
  if (typeof n == "string" && n.endsWith("px")) {
    const o = parseFloat(n);
    if (!Number.isNaN(o))
      return Math.floor(o);
  }
  if (typeof n == "string" && n.endsWith("%")) {
    const o = parseFloat(n);
    if (!Number.isNaN(o))
      return Math.floor(i * o * 0.01);
  }
  return console.error(`The padding value "${n}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function Dw(n, i, o) {
  if (typeof n == "string" || typeof n == "number") {
    const u = Ja(n, o), s = Ja(n, i);
    return {
      top: u,
      right: s,
      bottom: u,
      left: s,
      x: s * 2,
      y: u * 2
    };
  }
  if (typeof n == "object") {
    const u = Ja(n.top ?? n.y ?? 0, o), s = Ja(n.bottom ?? n.y ?? 0, o), f = Ja(n.left ?? n.x ?? 0, i), d = Ja(n.right ?? n.x ?? 0, i);
    return { top: u, right: d, bottom: s, left: f, x: f + d, y: u + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function Ow(n, i, o, u, s, f) {
  const { x: d, y: g } = ii(n, [i, o, u]), { x: p, y: h } = ii({ x: n.x + n.width, y: n.y + n.height }, [i, o, u]), v = s - p, y = f - h;
  return {
    left: Math.floor(d),
    top: Math.floor(g),
    right: Math.floor(v),
    bottom: Math.floor(y)
  };
}
const nd = (n, i, o, u, s, f) => {
  const d = Dw(f, i, o), g = (i - d.x) / n.width, p = (o - d.y) / n.height, h = Math.min(g, p), v = ai(h, u, s), y = n.x + n.width / 2, b = n.y + n.height / 2, _ = i / 2 - y * v, w = o / 2 - b * v, A = Ow(n, _, w, v, i, o), N = {
    left: Math.min(A.left - d.left, 0),
    top: Math.min(A.top - d.top, 0),
    right: Math.min(A.right - d.right, 0),
    bottom: Math.min(A.bottom - d.bottom, 0)
  };
  return {
    x: _ - N.left + N.right,
    y: w - N.top + N.bottom,
    zoom: v
  };
}, wo = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function na(n) {
  return n != null && n !== "parent";
}
function Qn(n) {
  return {
    width: n.measured?.width ?? n.width ?? n.initialWidth ?? 0,
    height: n.measured?.height ?? n.height ?? n.initialHeight ?? 0
  };
}
function ld(n) {
  return (n.measured?.width ?? n.width ?? n.initialWidth) !== void 0 && (n.measured?.height ?? n.height ?? n.initialHeight) !== void 0;
}
function cy(n, i = { width: 0, height: 0 }, o, u, s) {
  const f = { ...n }, d = u.get(o);
  if (d) {
    const g = d.origin || s;
    f.x += d.internals.positionAbsolute.x - (i.width ?? 0) * g[0], f.y += d.internals.positionAbsolute.y - (i.height ?? 0) * g[1];
  }
  return f;
}
function Nm(n, i) {
  if (n.size !== i.size)
    return !1;
  for (const o of n)
    if (!i.has(o))
      return !1;
  return !0;
}
function Hw() {
  let n, i;
  return { promise: new Promise((u, s) => {
    n = u, i = s;
  }), resolve: n, reject: i };
}
function Rw(n) {
  return { ...ty, ...n || {} };
}
function mo(n, { snapGrid: i = [0, 0], snapToGrid: o = !1, transform: u, containerBounds: s }) {
  const { x: f, y: d } = rn(n), g = Oo({ x: f - (s?.left ?? 0), y: d - (s?.top ?? 0) }, u), { x: p, y: h } = o ? Do(g, i) : g;
  return {
    xSnapped: p,
    ySnapped: h,
    ...g
  };
}
const ad = (n) => ({
  width: n.offsetWidth,
  height: n.offsetHeight
}), sy = (n) => n?.getRootNode?.() || window?.document, Bw = ["INPUT", "SELECT", "TEXTAREA"];
function fy(n) {
  const i = n.composedPath?.()?.[0] || n.target;
  return i?.nodeType !== 1 ? !1 : Bw.includes(i.nodeName) || i.hasAttribute("contenteditable") || !!i.closest(".nokey");
}
const dy = (n) => "clientX" in n, rn = (n, i) => {
  const o = dy(n), u = o ? n.clientX : n.touches?.[0].clientX, s = o ? n.clientY : n.touches?.[0].clientY;
  return {
    x: u - (i?.left ?? 0),
    y: s - (i?.top ?? 0)
  };
}, Am = (n, i, o, u, s) => {
  const f = i.querySelectorAll(`.${n}`);
  return !f || !f.length ? null : Array.from(f).map((d) => {
    const g = d.getBoundingClientRect();
    return {
      id: d.getAttribute("data-handleid"),
      type: n,
      nodeId: s,
      position: d.getAttribute("data-handlepos"),
      x: (g.left - o.left) / u,
      y: (g.top - o.top) / u,
      ...ad(d)
    };
  });
};
function hy({ sourceX: n, sourceY: i, targetX: o, targetY: u, sourceControlX: s, sourceControlY: f, targetControlX: d, targetControlY: g }) {
  const p = n * 0.125 + s * 0.375 + d * 0.375 + o * 0.125, h = i * 0.125 + f * 0.375 + g * 0.375 + u * 0.125, v = Math.abs(p - n), y = Math.abs(h - i);
  return [p, h, v, y];
}
function ur(n, i) {
  return n >= 0 ? 0.5 * n : i * 25 * Math.sqrt(-n);
}
function Cm({ pos: n, x1: i, y1: o, x2: u, y2: s, c: f }) {
  switch (n) {
    case mt.Left:
      return [i - ur(i - u, f), o];
    case mt.Right:
      return [i + ur(u - i, f), o];
    case mt.Top:
      return [i, o - ur(o - s, f)];
    case mt.Bottom:
      return [i, o + ur(s - o, f)];
  }
}
function gy({ sourceX: n, sourceY: i, sourcePosition: o = mt.Bottom, targetX: u, targetY: s, targetPosition: f = mt.Top, curvature: d = 0.25 }) {
  const [g, p] = Cm({
    pos: o,
    x1: n,
    y1: i,
    x2: u,
    y2: s,
    c: d
  }), [h, v] = Cm({
    pos: f,
    x1: u,
    y1: s,
    x2: n,
    y2: i,
    c: d
  }), [y, b, _, w] = hy({
    sourceX: n,
    sourceY: i,
    targetX: u,
    targetY: s,
    sourceControlX: g,
    sourceControlY: p,
    targetControlX: h,
    targetControlY: v
  });
  return [
    `M${n},${i} C${g},${p} ${h},${v} ${u},${s}`,
    y,
    b,
    _,
    w
  ];
}
function my({ sourceX: n, sourceY: i, targetX: o, targetY: u }) {
  const s = Math.abs(o - n) / 2, f = o < n ? o + s : o - s, d = Math.abs(u - i) / 2, g = u < i ? u + d : u - d;
  return [f, g, s, d];
}
function Uw({ sourceNode: n, targetNode: i, selected: o = !1, zIndex: u = 0, elevateOnSelect: s = !1, zIndexMode: f = "basic" }) {
  if (f === "manual")
    return u;
  const d = s && o ? u + 1e3 : u, g = Math.max(n.parentId || s && n.selected ? n.internals.z : 0, i.parentId || s && i.selected ? i.internals.z : 0);
  return d + g;
}
function kw({ sourceNode: n, targetNode: i, width: o, height: u, transform: s }) {
  const f = kr(Mr(n), Mr(i));
  f.x === f.x2 && (f.x2 += 1), f.y === f.y2 && (f.y2 += 1);
  const d = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: o / s[2],
    height: u / s[2]
  };
  return Nr(d, Yr(f)) > 0;
}
const Yw = ({ source: n, sourceHandle: i, target: o, targetHandle: u }) => `xy-edge__${n}${i || ""}-${o}${u || ""}`, jw = (n, i) => i.some((o) => o.source === n.source && o.target === n.target && (o.sourceHandle === n.sourceHandle || !o.sourceHandle && !n.sourceHandle) && (o.targetHandle === n.targetHandle || !o.targetHandle && !n.targetHandle)), Lw = (n, i, o = {}) => {
  if (!n.source || !n.target)
    return o.onError?.("006", cn.error006()), i;
  const u = o.getEdgeId || Yw;
  let s;
  return ly(n) ? s = { ...n } : s = {
    ...n,
    id: u(n)
  }, jw(s, i) ? i : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, i.concat(s));
};
function py({ sourceX: n, sourceY: i, targetX: o, targetY: u }) {
  const [s, f, d, g] = my({
    sourceX: n,
    sourceY: i,
    targetX: o,
    targetY: u
  });
  return [`M ${n},${i}L ${o},${u}`, s, f, d, g];
}
const Tm = {
  [mt.Left]: { x: -1, y: 0 },
  [mt.Right]: { x: 1, y: 0 },
  [mt.Top]: { x: 0, y: -1 },
  [mt.Bottom]: { x: 0, y: 1 }
}, Vw = ({ source: n, sourcePosition: i = mt.Bottom, target: o }) => i === mt.Left || i === mt.Right ? n.x < o.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : n.y < o.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, Dm = (n, i) => Math.sqrt(Math.pow(i.x - n.x, 2) + Math.pow(i.y - n.y, 2));
function qw({ source: n, sourcePosition: i = mt.Bottom, target: o, targetPosition: u = mt.Top, center: s, offset: f, stepPosition: d }) {
  const g = Tm[i], p = Tm[u], h = { x: n.x + g.x * f, y: n.y + g.y * f }, v = { x: o.x + p.x * f, y: o.y + p.y * f }, y = Vw({
    source: h,
    sourcePosition: i,
    target: v
  }), b = y.x !== 0 ? "x" : "y", _ = y[b];
  let w = [], A, N;
  const M = { x: 0, y: 0 }, U = { x: 0, y: 0 }, [, , S, C] = my({
    sourceX: n.x,
    sourceY: n.y,
    targetX: o.x,
    targetY: o.y
  });
  if (g[b] * p[b] === -1) {
    b === "x" ? (A = s.x ?? h.x + (v.x - h.x) * d, N = s.y ?? (h.y + v.y) / 2) : (A = s.x ?? (h.x + v.x) / 2, N = s.y ?? h.y + (v.y - h.y) * d);
    const $ = [
      { x: A, y: h.y },
      { x: A, y: v.y }
    ], J = [
      { x: h.x, y: N },
      { x: v.x, y: N }
    ];
    g[b] === _ ? w = b === "x" ? $ : J : w = b === "x" ? J : $;
  } else {
    const $ = [{ x: h.x, y: v.y }], J = [{ x: v.x, y: h.y }];
    if (b === "x" ? w = g.x === _ ? J : $ : w = g.y === _ ? $ : J, i === u) {
      const T = Math.abs(n[b] - o[b]);
      if (T <= f) {
        const V = Math.min(f - 1, f - T);
        g[b] === _ ? M[b] = (h[b] > n[b] ? -1 : 1) * V : U[b] = (v[b] > o[b] ? -1 : 1) * V;
      }
    }
    if (i !== u) {
      const T = b === "x" ? "y" : "x", V = g[b] === p[T], E = h[T] > v[T], O = h[T] < v[T];
      (g[b] === 1 && (!V && E || V && O) || g[b] !== 1 && (!V && O || V && E)) && (w = b === "x" ? $ : J);
    }
    const ut = { x: h.x + M.x, y: h.y + M.y }, X = { x: v.x + U.x, y: v.y + U.y }, I = Math.max(Math.abs(ut.x - w[0].x), Math.abs(X.x - w[0].x)), ot = Math.max(Math.abs(ut.y - w[0].y), Math.abs(X.y - w[0].y));
    I >= ot ? (A = (ut.x + X.x) / 2, N = w[0].y) : (A = w[0].x, N = (ut.y + X.y) / 2);
  }
  const j = { x: h.x + M.x, y: h.y + M.y }, k = { x: v.x + U.x, y: v.y + U.y };
  return [[
    n,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...j.x !== w[0].x || j.y !== w[0].y ? [j] : [],
    ...w,
    ...k.x !== w[w.length - 1].x || k.y !== w[w.length - 1].y ? [k] : [],
    o
  ], A, N, S, C];
}
function Xw(n, i, o, u) {
  const s = Math.min(Dm(n, i) / 2, Dm(i, o) / 2, u), { x: f, y: d } = i;
  if (n.x === f && f === o.x || n.y === d && d === o.y)
    return `L${f} ${d}`;
  if (n.y === d) {
    const h = n.x < o.x ? -1 : 1, v = n.y < o.y ? 1 : -1;
    return `L ${f + s * h},${d}Q ${f},${d} ${f},${d + s * v}`;
  }
  const g = n.x < o.x ? 1 : -1, p = n.y < o.y ? -1 : 1;
  return `L ${f},${d + s * p}Q ${f},${d} ${f + s * g},${d}`;
}
function kf({ sourceX: n, sourceY: i, sourcePosition: o = mt.Bottom, targetX: u, targetY: s, targetPosition: f = mt.Top, borderRadius: d = 5, centerX: g, centerY: p, offset: h = 20, stepPosition: v = 0.5 }) {
  const [y, b, _, w, A] = qw({
    source: { x: n, y: i },
    sourcePosition: o,
    target: { x: u, y: s },
    targetPosition: f,
    center: { x: g, y: p },
    offset: h,
    stepPosition: v
  });
  let N = `M${y[0].x} ${y[0].y}`;
  for (let M = 1; M < y.length - 1; M++)
    N += Xw(y[M - 1], y[M], y[M + 1], d);
  return N += `L${y[y.length - 1].x} ${y[y.length - 1].y}`, [N, b, _, w, A];
}
function Om(n) {
  return n && !!(n.internals.handleBounds || n.handles?.length) && !!(n.measured.width || n.width || n.initialWidth);
}
function Zw(n) {
  const { sourceNode: i, targetNode: o } = n;
  if (!Om(i) || !Om(o))
    return null;
  const u = i.internals.handleBounds || Hm(i.handles), s = o.internals.handleBounds || Hm(o.handles), f = Rm(u?.source ?? [], n.sourceHandle), d = Rm(
    // when connection type is loose we can define all handles as sources and connect source -> source
    n.connectionMode === li.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    n.targetHandle
  );
  if (!f || !d)
    return n.onError?.("008", cn.error008(f ? "target" : "source", {
      id: n.id,
      sourceHandle: n.sourceHandle,
      targetHandle: n.targetHandle
    })), null;
  const g = f?.position || mt.Bottom, p = d?.position || mt.Top, h = la(i, f, g), v = la(o, d, p);
  return {
    sourceX: h.x,
    sourceY: h.y,
    targetX: v.x,
    targetY: v.y,
    sourcePosition: g,
    targetPosition: p
  };
}
function Hm(n) {
  if (!n)
    return null;
  const i = [], o = [];
  for (const u of n)
    u.width = u.width ?? 1, u.height = u.height ?? 1, u.type === "source" ? i.push(u) : u.type === "target" && o.push(u);
  return {
    source: i,
    target: o
  };
}
function la(n, i, o = mt.Left, u = !1) {
  const s = (i?.x ?? 0) + n.internals.positionAbsolute.x, f = (i?.y ?? 0) + n.internals.positionAbsolute.y, { width: d, height: g } = i ?? Qn(n);
  if (u)
    return { x: s + d / 2, y: f + g / 2 };
  switch (i?.position ?? o) {
    case mt.Top:
      return { x: s + d / 2, y: f };
    case mt.Right:
      return { x: s + d, y: f + g / 2 };
    case mt.Bottom:
      return { x: s + d / 2, y: f + g };
    case mt.Left:
      return { x: s, y: f + g / 2 };
  }
}
function Rm(n, i) {
  return n && (i ? n.find((o) => o.id === i) : n[0]) || null;
}
function Yf(n, i) {
  return n ? typeof n == "string" ? n : `${i ? `${i}__` : ""}${Object.keys(n).sort().map((u) => `${u}=${n[u]}`).join("&")}` : "";
}
function Gw(n, { id: i, defaultColor: o, defaultMarkerStart: u, defaultMarkerEnd: s }) {
  const f = /* @__PURE__ */ new Set();
  return n.reduce((d, g) => ([g.markerStart || u, g.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const h = Yf(p, i);
      f.has(h) || (d.push({ id: h, color: p.color || o, ...p }), f.add(h));
    }
  }), d), []).sort((d, g) => d.id.localeCompare(g.id));
}
const yy = 1e3, Qw = 10, id = {
  nodeOrigin: [0, 0],
  nodeExtent: xo,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, $w = {
  ...id,
  checkEquality: !0
};
function od(n, i) {
  const o = { ...n };
  for (const u in i)
    i[u] !== void 0 && (o[u] = i[u]);
  return o;
}
function Kw(n, i, o) {
  const u = od(id, o);
  for (const s of n.values())
    if (s.parentId)
      rd(s, n, i, u);
    else {
      const f = Co(s, u.nodeOrigin), d = na(s.extent) ? s.extent : u.nodeExtent, g = ea(f, d, Qn(s));
      s.internals.positionAbsolute = g;
    }
}
function Jw(n, i) {
  if (!n.handles)
    return n.measured ? i?.internals.handleBounds : void 0;
  const o = [], u = [];
  for (const s of n.handles) {
    const f = {
      id: s.id,
      width: s.width ?? 1,
      height: s.height ?? 1,
      nodeId: n.id,
      x: s.x,
      y: s.y,
      position: s.position,
      type: s.type
    };
    s.type === "source" ? o.push(f) : s.type === "target" && u.push(f);
  }
  return {
    source: o,
    target: u
  };
}
function ud(n) {
  return n === "manual";
}
function jf(n, i, o, u = {}) {
  const s = od($w, u), f = { i: 0 }, d = new Map(i), g = s?.elevateNodesOnSelect && !ud(s.zIndexMode) ? yy : 0;
  let p = n.length > 0, h = !1;
  i.clear(), o.clear();
  for (const v of n) {
    let y = d.get(v.id);
    if (s.checkEquality && v === y?.internals.userNode)
      i.set(v.id, y);
    else {
      const b = Co(v, s.nodeOrigin), _ = na(v.extent) ? v.extent : s.nodeExtent, w = ea(b, _, Qn(v));
      y = {
        ...s.defaults,
        ...v,
        measured: {
          width: v.measured?.width,
          height: v.measured?.height
        },
        internals: {
          positionAbsolute: w,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: Jw(v, y),
          z: vy(v, g, s.zIndexMode),
          userNode: v
        }
      }, i.set(v.id, y);
    }
    (y.measured === void 0 || y.measured.width === void 0 || y.measured.height === void 0) && !y.hidden && (p = !1), v.parentId && rd(y, i, o, u, f), h ||= v.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: h };
}
function Ww(n, i) {
  if (!n.parentId)
    return;
  const o = i.get(n.parentId);
  o ? o.set(n.id, n) : i.set(n.parentId, /* @__PURE__ */ new Map([[n.id, n]]));
}
function rd(n, i, o, u, s) {
  const { elevateNodesOnSelect: f, nodeOrigin: d, nodeExtent: g, zIndexMode: p } = od(id, u), h = n.parentId, v = i.get(h);
  if (!v) {
    console.warn(`Parent node ${h} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  Ww(n, o), s && !v.parentId && v.internals.rootParentIndex === void 0 && p === "auto" && (v.internals.rootParentIndex = ++s.i, v.internals.z = v.internals.z + s.i * Qw), s && v.internals.rootParentIndex !== void 0 && (s.i = v.internals.rootParentIndex);
  const y = f && !ud(p) ? yy : 0, { x: b, y: _, z: w } = Fw(n, v, d, g, y, p), { positionAbsolute: A } = n.internals, N = b !== A.x || _ !== A.y;
  (N || w !== n.internals.z) && i.set(n.id, {
    ...n,
    internals: {
      ...n.internals,
      positionAbsolute: N ? { x: b, y: _ } : A,
      z: w
    }
  });
}
function vy(n, i, o) {
  const u = un(n.zIndex) ? n.zIndex : 0;
  return ud(o) ? u : u + (n.selected ? i : 0);
}
function Fw(n, i, o, u, s, f) {
  const { x: d, y: g } = i.internals.positionAbsolute, p = Qn(n), h = Co(n, o), v = na(n.extent) ? ea(h, n.extent, p) : h;
  let y = ea({ x: d + v.x, y: g + v.y }, u, p);
  n.extent === "parent" && (y = iy(y, p, i));
  const b = vy(n, s, f), _ = i.internals.z ?? 0;
  return {
    x: y.x,
    y: y.y,
    z: _ >= b ? _ + 1 : b
  };
}
function cd(n, i, o, u = [0, 0]) {
  const s = [], f = /* @__PURE__ */ new Map();
  for (const d of n) {
    const g = i.get(d.parentId);
    if (!g)
      continue;
    const p = f.get(d.parentId)?.expandedRect ?? So(g), h = oy(p, d.rect);
    f.set(d.parentId, { expandedRect: h, parent: g });
  }
  return f.size > 0 && f.forEach(({ expandedRect: d, parent: g }, p) => {
    const h = g.internals.positionAbsolute, v = Qn(g), y = g.origin ?? u, b = d.x < h.x ? Math.round(Math.abs(h.x - d.x)) : 0, _ = d.y < h.y ? Math.round(Math.abs(h.y - d.y)) : 0, w = Math.max(v.width, Math.round(d.width)), A = Math.max(v.height, Math.round(d.height)), N = (w - v.width) * y[0], M = (A - v.height) * y[1];
    (b > 0 || _ > 0 || N || M) && (s.push({
      id: p,
      type: "position",
      position: {
        x: g.position.x - b + N,
        y: g.position.y - _ + M
      }
    }), o.get(p)?.forEach((U) => {
      n.some((S) => S.id === U.id) || s.push({
        id: U.id,
        type: "position",
        position: {
          x: U.position.x + b,
          y: U.position.y + _
        }
      });
    })), (v.width < d.width || v.height < d.height || b || _) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: w + (b ? y[0] * b - N : 0),
        height: A + (_ ? y[1] * _ - M : 0)
      }
    });
  }), s;
}
function Iw(n, i, o, u, s, f, d) {
  const g = u?.querySelector(".xyflow__viewport");
  let p = !1;
  if (!g)
    return { changes: [], updatedInternals: p };
  const h = [], v = window.getComputedStyle(g), { m22: y } = new window.DOMMatrixReadOnly(v.transform), b = [];
  for (const _ of n.values()) {
    const w = i.get(_.id);
    if (!w)
      continue;
    if (w.hidden) {
      i.set(w.id, {
        ...w,
        internals: {
          ...w.internals,
          handleBounds: void 0
        }
      }), p = !0;
      continue;
    }
    const A = ad(_.nodeElement), N = w.measured.width !== A.width || w.measured.height !== A.height;
    if (!!(A.width && A.height && (N || !w.internals.handleBounds || _.force))) {
      const U = _.nodeElement.getBoundingClientRect(), S = na(w.extent) ? w.extent : f;
      let { positionAbsolute: C } = w.internals;
      w.parentId && w.extent === "parent" ? C = iy(C, A, i.get(w.parentId)) : S && (C = ea(C, S, A));
      const j = {
        ...w,
        measured: A,
        internals: {
          ...w.internals,
          positionAbsolute: C,
          handleBounds: {
            source: Am("source", _.nodeElement, U, y, w.id),
            target: Am("target", _.nodeElement, U, y, w.id)
          }
        }
      };
      i.set(w.id, j), w.parentId && rd(j, i, o, { nodeOrigin: s, zIndexMode: d }), p = !0, N && (h.push({
        id: w.id,
        type: "dimensions",
        dimensions: A
      }), w.expandParent && w.parentId && b.push({
        id: w.id,
        parentId: w.parentId,
        rect: So(j, s)
      }));
    }
  }
  if (b.length > 0) {
    const _ = cd(b, i, o, s);
    h.push(..._);
  }
  return { changes: h, updatedInternals: p };
}
async function Pw({ delta: n, panZoom: i, transform: o, translateExtent: u, width: s, height: f }) {
  if (!i || !n.x && !n.y)
    return !1;
  const d = await i.setViewportConstrained({
    x: o[0] + n.x,
    y: o[1] + n.y,
    zoom: o[2]
  }, [
    [0, 0],
    [s, f]
  ], u);
  return !!d && (d.x !== o[0] || d.y !== o[1] || d.k !== o[2]);
}
function Bm(n, i, o, u, s, f) {
  let d = s;
  const g = u.get(d) || /* @__PURE__ */ new Map();
  u.set(d, g.set(o, i)), d = `${s}-${n}`;
  const p = u.get(d) || /* @__PURE__ */ new Map();
  if (u.set(d, p.set(o, i)), f) {
    d = `${s}-${n}-${f}`;
    const h = u.get(d) || /* @__PURE__ */ new Map();
    u.set(d, h.set(o, i));
  }
}
function by(n, i, o) {
  n.clear(), i.clear();
  for (const u of o) {
    const { source: s, target: f, sourceHandle: d = null, targetHandle: g = null } = u, p = { edgeId: u.id, source: s, target: f, sourceHandle: d, targetHandle: g }, h = `${s}-${d}--${f}-${g}`, v = `${f}-${g}--${s}-${d}`;
    Bm("source", p, v, n, s, d), Bm("target", p, h, n, f, g), i.set(u.id, u);
  }
}
function xy(n, i) {
  if (!n.parentId)
    return !1;
  const o = i.get(n.parentId);
  return o ? o.selected ? !0 : xy(o, i) : !1;
}
function Um(n, i, o) {
  let u = n;
  do {
    if (u?.matches?.(i))
      return !0;
    if (u === o)
      return !1;
    u = u?.parentElement;
  } while (u);
  return !1;
}
function t2(n, i, o, u) {
  const s = /* @__PURE__ */ new Map();
  for (const [f, d] of n)
    if ((d.selected || d.id === u) && (!d.parentId || !xy(d, n)) && (d.draggable || i && typeof d.draggable > "u")) {
      const g = n.get(f);
      g && s.set(f, {
        id: f,
        position: g.position || { x: 0, y: 0 },
        distance: {
          x: o.x - g.internals.positionAbsolute.x,
          y: o.y - g.internals.positionAbsolute.y
        },
        extent: g.extent,
        parentId: g.parentId,
        origin: g.origin,
        expandParent: g.expandParent,
        internals: {
          positionAbsolute: g.internals.positionAbsolute || { x: 0, y: 0 }
        },
        measured: {
          width: g.measured.width ?? 0,
          height: g.measured.height ?? 0
        }
      });
    }
  return s;
}
function bf({ nodeId: n, dragItems: i, nodeLookup: o, dragging: u = !0 }) {
  const s = [];
  for (const [d, g] of i) {
    const p = o.get(d)?.internals.userNode;
    p && s.push({
      ...p,
      position: g.position,
      dragging: u
    });
  }
  if (!n)
    return [s[0], s];
  const f = o.get(n)?.internals.userNode;
  return [
    f ? {
      ...f,
      position: i.get(n)?.position || f.position,
      dragging: u
    } : s[0],
    s
  ];
}
function e2({ dragItems: n, snapGrid: i, x: o, y: u }) {
  const s = n.values().next().value;
  if (!s)
    return null;
  const f = {
    x: o - s.distance.x,
    y: u - s.distance.y
  }, d = Do(f, i);
  return {
    x: d.x - f.x,
    y: d.y - f.y
  };
}
function n2({ onNodeMouseDown: n, getStoreItems: i, onDragStart: o, onDrag: u, onDragStop: s }) {
  let f = { x: null, y: null }, d = 0, g = /* @__PURE__ */ new Map(), p = !1, h = { x: 0, y: 0 }, v = null, y = !1, b = null, _ = !1, w = !1, A = null;
  function N({ noDragClassName: U, handleSelector: S, domNode: C, isSelectable: j, nodeId: k, nodeClickDistance: B = 0 }) {
    b = Ye(C);
    function $({ x: I, y: ot }) {
      const { nodeLookup: T, nodeExtent: V, snapGrid: E, snapToGrid: O, nodeOrigin: q, onNodeDrag: Z, onSelectionDrag: nt, onError: z, updateNodePositions: H } = i();
      f = { x: I, y: ot };
      let P = !1;
      const lt = g.size > 1, rt = lt && V ? Uf(To(g)) : null, ft = lt && O ? e2({
        dragItems: g,
        snapGrid: E,
        x: I,
        y: ot
      }) : null;
      for (const [ct, tt] of g) {
        if (!T.has(ct))
          continue;
        let st = { x: I - tt.distance.x, y: ot - tt.distance.y };
        O && (st = ft ? {
          x: Math.round(st.x + ft.x),
          y: Math.round(st.y + ft.y)
        } : Do(st, E));
        let xt = null;
        if (lt && V && !tt.extent && rt) {
          const { positionAbsolute: yt } = tt.internals, St = yt.x - rt.x + V[0][0], Dt = yt.x + tt.measured.width - rt.x2 + V[1][0], Vt = yt.y - rt.y + V[0][1], fe = yt.y + tt.measured.height - rt.y2 + V[1][1];
          xt = [
            [St, Vt],
            [Dt, fe]
          ];
        }
        const { position: bt, positionAbsolute: gt } = ay({
          nodeId: ct,
          nextPosition: st,
          nodeLookup: T,
          nodeExtent: xt || V,
          nodeOrigin: q,
          onError: z
        });
        P = P || tt.position.x !== bt.x || tt.position.y !== bt.y, tt.position = bt, tt.internals.positionAbsolute = gt;
      }
      if (w = w || P, !!P && (H(g, !0), A && (u || Z || !k && nt))) {
        const [ct, tt] = bf({
          nodeId: k,
          dragItems: g,
          nodeLookup: T
        });
        u?.(A, g, ct, tt), Z?.(A, ct, tt), k || nt?.(A, tt);
      }
    }
    async function J() {
      if (!v)
        return;
      const { transform: I, panBy: ot, autoPanSpeed: T, autoPanOnNodeDrag: V } = i();
      if (!V) {
        p = !1, cancelAnimationFrame(d);
        return;
      }
      const [E, O] = ed(h, v, T);
      (E !== 0 || O !== 0) && (f.x = (f.x ?? 0) - E / I[2], f.y = (f.y ?? 0) - O / I[2], await ot({ x: E, y: O }) && $(f)), d = requestAnimationFrame(J);
    }
    function ut(I) {
      const { nodeLookup: ot, multiSelectionActive: T, nodesDraggable: V, transform: E, snapGrid: O, snapToGrid: q, selectNodesOnDrag: Z, onNodeDragStart: nt, onSelectionDragStart: z, unselectNodesAndEdges: H } = i();
      y = !0, (!Z || !j) && !T && k && (ot.get(k)?.selected || H()), j && Z && k && n?.(k);
      const P = mo(I.sourceEvent, { transform: E, snapGrid: O, snapToGrid: q, containerBounds: v });
      if (f = P, g = t2(ot, V, P, k), g.size > 0 && (o || nt || !k && z)) {
        const [lt, rt] = bf({
          nodeId: k,
          dragItems: g,
          nodeLookup: ot
        });
        o?.(I.sourceEvent, g, lt, rt), nt?.(I.sourceEvent, lt, rt), k || z?.(I.sourceEvent, rt);
      }
    }
    const X = kp().clickDistance(B).on("start", (I) => {
      const { domNode: ot, nodeDragThreshold: T, transform: V, snapGrid: E, snapToGrid: O } = i();
      v = ot?.getBoundingClientRect() || null, _ = !1, w = !1, A = I.sourceEvent, T === 0 && ut(I), f = mo(I.sourceEvent, { transform: V, snapGrid: E, snapToGrid: O, containerBounds: v }), h = rn(I.sourceEvent, v);
    }).on("drag", (I) => {
      const { autoPanOnNodeDrag: ot, transform: T, snapGrid: V, snapToGrid: E, nodeDragThreshold: O, nodeLookup: q } = i(), Z = mo(I.sourceEvent, { transform: T, snapGrid: V, snapToGrid: E, containerBounds: v });
      if (A = I.sourceEvent, (I.sourceEvent.type === "touchmove" && I.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      k && !q.has(k)) && (_ = !0), !_) {
        if (!p && ot && y && (p = !0, J()), !y) {
          const nt = rn(I.sourceEvent, v), z = nt.x - h.x, H = nt.y - h.y;
          Math.sqrt(z * z + H * H) > O && ut(I);
        }
        (f.x !== Z.xSnapped || f.y !== Z.ySnapped) && g && y && (h = rn(I.sourceEvent, v), $(Z));
      }
    }).on("end", (I) => {
      if (!y || _) {
        _ && g.size > 0 && i().updateNodePositions(g, !1);
        return;
      }
      if (p = !1, y = !1, cancelAnimationFrame(d), g.size > 0) {
        const { nodeLookup: ot, updateNodePositions: T, onNodeDragStop: V, onSelectionDragStop: E } = i();
        if (w && (T(g, !1), w = !1), s || V || !k && E) {
          const [O, q] = bf({
            nodeId: k,
            dragItems: g,
            nodeLookup: ot,
            dragging: !1
          });
          s?.(I.sourceEvent, g, O, q), V?.(I.sourceEvent, O, q), k || E?.(I.sourceEvent, q);
        }
      }
    }).filter((I) => {
      const ot = I.target;
      return !I.button && (!U || !Um(ot, `.${U}`, C)) && (!S || Um(ot, S, C));
    });
    b.call(X);
  }
  function M() {
    b?.on(".drag", null);
  }
  return {
    update: N,
    destroy: M
  };
}
function l2(n, i, o) {
  const u = [], s = {
    x: n.x - o,
    y: n.y - o,
    width: o * 2,
    height: o * 2
  };
  for (const f of i.values())
    Nr(s, So(f)) > 0 && u.push(f);
  return u;
}
const a2 = 250;
function i2(n, i, o, u) {
  let s = [], f = 1 / 0;
  const d = l2(n, o, i + a2);
  for (const g of d) {
    const p = [...g.internals.handleBounds?.source ?? [], ...g.internals.handleBounds?.target ?? []];
    for (const h of p) {
      if (u.nodeId === h.nodeId && u.type === h.type && u.id === h.id)
        continue;
      const { x: v, y } = la(g, h, h.position, !0), b = Math.sqrt(Math.pow(v - n.x, 2) + Math.pow(y - n.y, 2));
      b > i || (b < f ? (s = [{ ...h, x: v, y }], f = b) : b === f && s.push({ ...h, x: v, y }));
    }
  }
  if (!s.length)
    return null;
  if (s.length > 1) {
    const g = u.type === "source" ? "target" : "source";
    return s.find((p) => p.type === g) ?? s[0];
  }
  return s[0];
}
function _y(n, i, o, u, s, f = !1) {
  const d = u.get(n);
  if (!d)
    return null;
  const g = s === "strict" ? d.internals.handleBounds?.[i] : [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []], p = (o ? g?.find((h) => h.id === o) : g?.[0]) ?? null;
  return p && f ? { ...p, ...la(d, p, p.position, !0) } : p;
}
function Sy(n, i) {
  return n || (i?.classList.contains("target") ? "target" : i?.classList.contains("source") ? "source" : null);
}
function o2(n, i) {
  let o = null;
  return i ? o = !0 : n && !i && (o = !1), o;
}
const wy = () => !0;
function u2(n, { connectionMode: i, connectionRadius: o, handleId: u, nodeId: s, edgeUpdaterType: f, isTarget: d, domNode: g, nodeLookup: p, lib: h, autoPanOnConnect: v, flowId: y, panBy: b, cancelConnection: _, onConnectStart: w, onConnect: A, onConnectEnd: N, isValidConnection: M = wy, onReconnectEnd: U, updateConnection: S, getTransform: C, getFromHandle: j, autoPanSpeed: k, dragThreshold: B = 1, handleDomNode: $ }) {
  const J = sy(n.target);
  let ut = 0, X;
  const { x: I, y: ot } = rn(n), T = Sy(f, $), V = g?.getBoundingClientRect();
  let E = !1;
  if (!V || !T)
    return;
  const O = _y(s, T, u, p, i);
  if (!O)
    return;
  let q = rn(n, V), Z = !1, nt = null, z = !1, H = null;
  function P() {
    if (!v || !V)
      return;
    const [bt, gt] = ed(q, V, k);
    b({ x: bt, y: gt }), ut = requestAnimationFrame(P);
  }
  const lt = {
    ...O,
    nodeId: s,
    type: T,
    position: O.position
  }, rt = p.get(s);
  let ct = {
    inProgress: !0,
    isValid: null,
    from: la(rt, lt, mt.Left, !0),
    fromHandle: lt,
    fromPosition: lt.position,
    fromNode: rt,
    to: q,
    toHandle: null,
    toPosition: Em[lt.position],
    toNode: null,
    pointer: q
  };
  function tt() {
    E = !0, S(ct), w?.(n, { nodeId: s, handleId: u, handleType: T });
  }
  B === 0 && tt();
  function st(bt) {
    if (!E) {
      const { x: fe, y: Le } = rn(bt), ye = fe - I, ve = Le - ot;
      if (!(ye * ye + ve * ve > B * B))
        return;
      tt();
    }
    if (!j() || !lt) {
      xt(bt);
      return;
    }
    const gt = C();
    q = rn(bt, V), X = i2(Oo(q, gt, !1, [1, 1]), o, p, lt), Z || (P(), Z = !0);
    const yt = Ey(bt, {
      handle: X,
      connectionMode: i,
      fromNodeId: s,
      fromHandleId: u,
      fromType: d ? "target" : "source",
      isValidConnection: M,
      doc: J,
      lib: h,
      flowId: y,
      nodeLookup: p
    });
    H = yt.handleDomNode, nt = yt.connection, z = o2(!!X, yt.isValid);
    const St = p.get(s), Dt = St ? la(St, lt, mt.Left, !0) : ct.from, Vt = {
      ...ct,
      from: Dt,
      isValid: z,
      to: yt.toHandle && z ? ii({ x: yt.toHandle.x, y: yt.toHandle.y }, gt) : q,
      toHandle: yt.toHandle,
      toPosition: z && yt.toHandle ? yt.toHandle.position : Em[lt.position],
      toNode: yt.toHandle ? p.get(yt.toHandle.nodeId) : null,
      pointer: q
    };
    S(Vt), ct = Vt;
  }
  function xt(bt) {
    if (!("touches" in bt && bt.touches.length > 0)) {
      if (E) {
        (X || H) && nt && z && A?.(nt);
        const { inProgress: gt, ...yt } = ct, St = {
          ...yt,
          toPosition: ct.toHandle ? ct.toPosition : null
        };
        N?.(bt, St), f && U?.(bt, St);
      }
      _(), cancelAnimationFrame(ut), Z = !1, z = !1, nt = null, H = null, J.removeEventListener("mousemove", st), J.removeEventListener("mouseup", xt), J.removeEventListener("touchmove", st), J.removeEventListener("touchend", xt);
    }
  }
  J.addEventListener("mousemove", st), J.addEventListener("mouseup", xt), J.addEventListener("touchmove", st), J.addEventListener("touchend", xt);
}
function Ey(n, { handle: i, connectionMode: o, fromNodeId: u, fromHandleId: s, fromType: f, doc: d, lib: g, flowId: p, isValidConnection: h = wy, nodeLookup: v }) {
  const y = f === "target", b = i ? d.querySelector(`.${g}-flow__handle[data-id="${p}-${i?.nodeId}-${i?.id}-${i?.type}"]`) : null, { x: _, y: w } = rn(n), A = d.elementFromPoint(_, w), N = A?.classList.contains(`${g}-flow__handle`) ? A : b, M = {
    handleDomNode: N,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (N) {
    const U = Sy(void 0, N), S = N.getAttribute("data-nodeid"), C = N.getAttribute("data-handleid"), j = N.classList.contains("connectable"), k = N.classList.contains("connectableend");
    if (!S || !U)
      return M;
    const B = {
      source: y ? S : u,
      sourceHandle: y ? C : s,
      target: y ? u : S,
      targetHandle: y ? s : C
    };
    M.connection = B;
    const J = j && k && (o === li.Strict ? y && U === "source" || !y && U === "target" : S !== u || C !== s);
    M.isValid = J && h(B), M.toHandle = _y(S, U, C, v, o, !0);
  }
  return M;
}
const Lf = {
  onPointerDown: u2,
  isValid: Ey
};
function r2({ domNode: n, panZoom: i, getTransform: o, getViewScale: u }) {
  const s = Ye(n);
  function f({ translateExtent: g, width: p, height: h, zoomStep: v = 1, pannable: y = !0, zoomable: b = !0, inversePan: _ = !1 }) {
    const w = (S) => {
      if (S.sourceEvent.type !== "wheel" || !i)
        return;
      const C = o(), j = S.sourceEvent.ctrlKey && wo() ? 10 : 1, k = -S.sourceEvent.deltaY * (S.sourceEvent.deltaMode === 1 ? 0.05 : S.sourceEvent.deltaMode ? 1 : 2e-3) * v, B = C[2] * Math.pow(2, k * j);
      i.scaleTo(B);
    };
    let A = [0, 0];
    const N = (S) => {
      (S.sourceEvent.type === "mousedown" || S.sourceEvent.type === "touchstart") && (A = [
        S.sourceEvent.clientX ?? S.sourceEvent.touches[0].clientX,
        S.sourceEvent.clientY ?? S.sourceEvent.touches[0].clientY
      ]);
    }, M = (S) => {
      const C = o();
      if (S.sourceEvent.type !== "mousemove" && S.sourceEvent.type !== "touchmove" || !i)
        return;
      const j = [
        S.sourceEvent.clientX ?? S.sourceEvent.touches[0].clientX,
        S.sourceEvent.clientY ?? S.sourceEvent.touches[0].clientY
      ], k = [j[0] - A[0], j[1] - A[1]];
      A = j;
      const B = u() * Math.max(C[2], Math.log(C[2])) * (_ ? -1 : 1), $ = {
        x: C[0] - k[0] * B,
        y: C[1] - k[1] * B
      }, J = [
        [0, 0],
        [p, h]
      ];
      i.setViewportConstrained({
        x: $.x,
        y: $.y,
        zoom: C[2]
      }, J, g);
    }, U = Ip().on("start", N).on("zoom", y ? M : null).on("zoom.wheel", b ? w : null);
    s.call(U, {});
  }
  function d() {
    s.on("zoom", null);
  }
  return {
    update: f,
    destroy: d,
    pointer: nn
  };
}
const jr = (n) => ({
  x: n.x,
  y: n.y,
  zoom: n.k
}), xf = ({ x: n, y: i, zoom: o }) => Ur.translate(n, i).scale(o), Fa = (n, i) => n.target.closest(`.${i}`), zy = (n, i) => i === 2 && Array.isArray(n) && n.includes(2), c2 = (n) => ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2, _f = (n, i = 0, o = c2, u = () => {
}) => {
  const s = typeof i == "number" && i > 0;
  return s || u(), s ? n.transition().duration(i).ease(o).on("end", u) : n;
}, My = (n) => {
  const i = n.ctrlKey && wo() ? 10 : 1;
  return -n.deltaY * (n.deltaMode === 1 ? 0.05 : n.deltaMode ? 1 : 2e-3) * i;
};
function s2({ zoomPanValues: n, noWheelClassName: i, d3Selection: o, d3Zoom: u, panOnScrollMode: s, panOnScrollSpeed: f, zoomOnPinch: d, onPanZoomStart: g, onPanZoom: p, onPanZoomEnd: h }) {
  return (v) => {
    if (Fa(v, i))
      return v.ctrlKey && v.preventDefault(), !1;
    v.preventDefault(), v.stopImmediatePropagation();
    const y = o.property("__zoom").k || 1;
    if (v.ctrlKey && d) {
      const N = nn(v), M = My(v), U = y * Math.pow(2, M);
      u.scaleTo(o, U, N, v);
      return;
    }
    const b = v.deltaMode === 1 ? 20 : 1;
    let _ = s === Fl.Vertical ? 0 : v.deltaX * b, w = s === Fl.Horizontal ? 0 : v.deltaY * b;
    !wo() && v.shiftKey && s !== Fl.Vertical && (_ = v.deltaY * b, w = 0), u.translateBy(
      o,
      -(_ / y) * f,
      -(w / y) * f,
      // @ts-ignore
      { internal: !0 }
    );
    const A = jr(o.property("__zoom"));
    clearTimeout(n.panScrollTimeout), n.isPanScrolling ? (p?.(v, A), n.panScrollTimeout = setTimeout(() => {
      h?.(v, A), n.isPanScrolling = !1;
    }, 150)) : (n.isPanScrolling = !0, g?.(v, A));
  };
}
function f2({ noWheelClassName: n, preventScrolling: i, d3ZoomHandler: o }) {
  return function(u, s) {
    const f = u.type === "wheel", d = !i && f && !u.ctrlKey, g = Fa(u, n);
    if (u.ctrlKey && f && g && u.preventDefault(), d || g)
      return null;
    u.preventDefault(), o.call(this, u, s);
  };
}
function d2({ zoomPanValues: n, onDraggingChange: i, onPanZoomStart: o }) {
  return (u) => {
    if (u.sourceEvent?.internal)
      return;
    const s = jr(u.transform);
    n.mouseButton = u.sourceEvent?.button || 0, n.isZoomingOrPanning = !0, n.prevViewport = s, u.sourceEvent?.type === "mousedown" && i(!0), o && o?.(u.sourceEvent, s);
  };
}
function h2({ zoomPanValues: n, panOnDrag: i, onPaneContextMenu: o, onTransformChange: u, onPanZoom: s }) {
  return (f) => {
    n.usedRightMouseButton = !!(o && zy(i, n.mouseButton ?? 0)), f.sourceEvent?.sync || u([f.transform.x, f.transform.y, f.transform.k]), s && !f.sourceEvent?.internal && s?.(f.sourceEvent, jr(f.transform));
  };
}
function g2({ zoomPanValues: n, panOnDrag: i, panOnScroll: o, onDraggingChange: u, onPanZoomEnd: s, onPaneContextMenu: f }) {
  return (d) => {
    if (!d.sourceEvent?.internal && (n.isZoomingOrPanning = !1, f && zy(i, n.mouseButton ?? 0) && !n.usedRightMouseButton && d.sourceEvent && f(d.sourceEvent), n.usedRightMouseButton = !1, u(!1), s)) {
      const g = jr(d.transform);
      n.prevViewport = g, clearTimeout(n.timerId), n.timerId = setTimeout(
        () => {
          s?.(d.sourceEvent, g);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        o ? 150 : 0
      );
    }
  };
}
function m2({ zoomActivationKeyPressed: n, zoomOnScroll: i, zoomOnPinch: o, panOnDrag: u, panOnScroll: s, zoomOnDoubleClick: f, userSelectionActive: d, noWheelClassName: g, noPanClassName: p, lib: h, connectionInProgress: v }) {
  return (y) => {
    const b = n || i, _ = o && y.ctrlKey, w = y.type === "wheel";
    if (y.button === 1 && y.type === "mousedown" && (Fa(y, `${h}-flow__node`) || Fa(y, `${h}-flow__edge`)))
      return !0;
    if (!u && !b && !s && !f && !o || d || v && !w || Fa(y, g) && w || Fa(y, p) && (!w || s && w && !n) || !o && y.ctrlKey && w)
      return !1;
    if (!o && y.type === "touchstart" && y.touches?.length > 1)
      return y.preventDefault(), !1;
    if (!b && !s && !_ && w || !u && (y.type === "mousedown" || y.type === "touchstart") || Array.isArray(u) && !u.includes(y.button) && y.type === "mousedown")
      return !1;
    const A = Array.isArray(u) && u.includes(y.button) || !y.button || y.button <= 1;
    return (!y.ctrlKey || w) && A;
  };
}
function p2({ domNode: n, minZoom: i, maxZoom: o, translateExtent: u, viewport: s, onPanZoom: f, onPanZoomStart: d, onPanZoomEnd: g, onDraggingChange: p }) {
  const h = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, v = n.getBoundingClientRect(), y = Ip().scaleExtent([i, o]).translateExtent(u), b = Ye(n).call(y);
  U({
    x: s.x,
    y: s.y,
    zoom: ai(s.zoom, i, o)
  }, [
    [0, 0],
    [v.width, v.height]
  ], u);
  const _ = b.on("wheel.zoom"), w = b.on("dblclick.zoom");
  y.wheelDelta(My);
  async function A(X, I) {
    return b ? new Promise((ot) => {
      y?.interpolate(I?.interpolate === "linear" ? go : hr).transform(_f(b, I?.duration, I?.ease, () => ot(!0)), X);
    }) : !1;
  }
  function N({ noWheelClassName: X, noPanClassName: I, onPaneContextMenu: ot, userSelectionActive: T, panOnScroll: V, panOnDrag: E, panOnScrollMode: O, panOnScrollSpeed: q, preventScrolling: Z, zoomOnPinch: nt, zoomOnScroll: z, zoomOnDoubleClick: H, zoomActivationKeyPressed: P, lib: lt, onTransformChange: rt, connectionInProgress: ft, paneClickDistance: ct, selectionOnDrag: tt }) {
    T && !h.isZoomingOrPanning && M();
    const st = V && !P && !T;
    y.clickDistance(tt ? 1 / 0 : !un(ct) || ct < 0 ? 0 : ct);
    const xt = st ? s2({
      zoomPanValues: h,
      noWheelClassName: X,
      d3Selection: b,
      d3Zoom: y,
      panOnScrollMode: O,
      panOnScrollSpeed: q,
      zoomOnPinch: nt,
      onPanZoomStart: d,
      onPanZoom: f,
      onPanZoomEnd: g
    }) : f2({
      noWheelClassName: X,
      preventScrolling: Z,
      d3ZoomHandler: _
    });
    b.on("wheel.zoom", xt, { passive: !1 });
    const bt = d2({
      zoomPanValues: h,
      onDraggingChange: p,
      onPanZoomStart: d
    });
    y.on("start", bt);
    const gt = h2({
      zoomPanValues: h,
      panOnDrag: E,
      onPaneContextMenu: !!ot,
      onPanZoom: f,
      onTransformChange: rt
    });
    y.on("zoom", gt);
    const yt = g2({
      zoomPanValues: h,
      panOnDrag: E,
      panOnScroll: V,
      onPaneContextMenu: ot,
      onPanZoomEnd: g,
      onDraggingChange: p
    });
    y.on("end", yt);
    const St = m2({
      zoomActivationKeyPressed: P,
      panOnDrag: E,
      zoomOnScroll: z,
      panOnScroll: V,
      zoomOnDoubleClick: H,
      zoomOnPinch: nt,
      userSelectionActive: T,
      noPanClassName: I,
      noWheelClassName: X,
      lib: lt,
      connectionInProgress: ft
    });
    y.filter(St), H ? b.on("dblclick.zoom", w) : b.on("dblclick.zoom", null);
  }
  function M() {
    y.on("zoom", null);
  }
  async function U(X, I, ot) {
    const T = xf(X), V = y?.constrain()(T, I, ot);
    return V && await A(V), V;
  }
  async function S(X, I) {
    const ot = xf(X);
    return await A(ot, I), ot;
  }
  function C(X) {
    if (b) {
      const I = xf(X), ot = b.property("__zoom");
      (ot.k !== X.zoom || ot.x !== X.x || ot.y !== X.y) && y?.transform(b, I, null, { sync: !0 });
    }
  }
  function j() {
    const X = b ? Fp(b.node()) : { x: 0, y: 0, k: 1 };
    return { x: X.x, y: X.y, zoom: X.k };
  }
  async function k(X, I) {
    return b ? new Promise((ot) => {
      y?.interpolate(I?.interpolate === "linear" ? go : hr).scaleTo(_f(b, I?.duration, I?.ease, () => ot(!0)), X);
    }) : !1;
  }
  async function B(X, I) {
    return b ? new Promise((ot) => {
      y?.interpolate(I?.interpolate === "linear" ? go : hr).scaleBy(_f(b, I?.duration, I?.ease, () => ot(!0)), X);
    }) : !1;
  }
  function $(X) {
    y?.scaleExtent(X);
  }
  function J(X) {
    y?.translateExtent(X);
  }
  function ut(X) {
    const I = !un(X) || X < 0 ? 0 : X;
    y?.clickDistance(I);
  }
  return {
    update: N,
    destroy: M,
    setViewport: S,
    setViewportConstrained: U,
    getViewport: j,
    scaleTo: k,
    scaleBy: B,
    setScaleExtent: $,
    setTranslateExtent: J,
    syncViewport: C,
    setClickDistance: ut
  };
}
var oi;
(function(n) {
  n.Line = "line", n.Handle = "handle";
})(oi || (oi = {}));
function y2({ width: n, prevWidth: i, height: o, prevHeight: u, affectsX: s, affectsY: f }) {
  const d = n - i, g = o - u, p = [d > 0 ? 1 : d < 0 ? -1 : 0, g > 0 ? 1 : g < 0 ? -1 : 0];
  return d && s && (p[0] = p[0] * -1), g && f && (p[1] = p[1] * -1), p;
}
function km(n) {
  const i = n.includes("right") || n.includes("left"), o = n.includes("bottom") || n.includes("top"), u = n.includes("left"), s = n.includes("top");
  return {
    isHorizontal: i,
    isVertical: o,
    affectsX: u,
    affectsY: s
  };
}
function Sl(n, i) {
  return Math.max(0, i - n);
}
function wl(n, i) {
  return Math.max(0, n - i);
}
function rr(n, i, o) {
  return Math.max(0, i - n, n - o);
}
function Ym(n, i) {
  return n ? !i : i;
}
function v2(n, i, o, u, s, f, d, g) {
  let { affectsX: p, affectsY: h } = i;
  const { isHorizontal: v, isVertical: y } = i, b = v && y, { xSnapped: _, ySnapped: w } = o, { minWidth: A, maxWidth: N, minHeight: M, maxHeight: U } = u, { x: S, y: C, width: j, height: k, aspectRatio: B } = n;
  let $ = Math.floor(v ? _ - n.pointerX : 0), J = Math.floor(y ? w - n.pointerY : 0);
  const ut = j + (p ? -$ : $), X = k + (h ? -J : J), I = -f[0] * j, ot = -f[1] * k;
  let T = rr(ut, A, N), V = rr(X, M, U);
  if (d) {
    let q = 0, Z = 0;
    p && $ < 0 ? q = Sl(S + $ + I, d[0][0]) : !p && $ > 0 && (q = wl(S + ut + I, d[1][0])), h && J < 0 ? Z = Sl(C + J + ot, d[0][1]) : !h && J > 0 && (Z = wl(C + X + ot, d[1][1])), T = Math.max(T, q), V = Math.max(V, Z);
  }
  if (g) {
    let q = 0, Z = 0;
    p && $ > 0 ? q = wl(S + $, g[0][0]) : !p && $ < 0 && (q = Sl(S + ut, g[1][0])), h && J > 0 ? Z = wl(C + J, g[0][1]) : !h && J < 0 && (Z = Sl(C + X, g[1][1])), T = Math.max(T, q), V = Math.max(V, Z);
  }
  if (s) {
    if (v) {
      const q = rr(ut / B, M, U) * B;
      if (T = Math.max(T, q), d) {
        let Z = 0;
        !p && !h || p && !h && b ? Z = wl(C + ot + ut / B, d[1][1]) * B : Z = Sl(C + ot + (p ? $ : -$) / B, d[0][1]) * B, T = Math.max(T, Z);
      }
      if (g) {
        let Z = 0;
        !p && !h || p && !h && b ? Z = Sl(C + ut / B, g[1][1]) * B : Z = wl(C + (p ? $ : -$) / B, g[0][1]) * B, T = Math.max(T, Z);
      }
    }
    if (y) {
      const q = rr(X * B, A, N) / B;
      if (V = Math.max(V, q), d) {
        let Z = 0;
        !p && !h || h && !p && b ? Z = wl(S + X * B + I, d[1][0]) / B : Z = Sl(S + (h ? J : -J) * B + I, d[0][0]) / B, V = Math.max(V, Z);
      }
      if (g) {
        let Z = 0;
        !p && !h || h && !p && b ? Z = Sl(S + X * B, g[1][0]) / B : Z = wl(S + (h ? J : -J) * B, g[0][0]) / B, V = Math.max(V, Z);
      }
    }
  }
  J = J + (J < 0 ? V : -V), $ = $ + ($ < 0 ? T : -T), s && (b ? ut > X * B ? J = (Ym(p, h) ? -$ : $) / B : $ = (Ym(p, h) ? -J : J) * B : v ? (J = $ / B, h = p) : ($ = J * B, p = h));
  const E = p ? S + $ : S, O = h ? C + J : C;
  return {
    width: j + (p ? -$ : $),
    height: k + (h ? -J : J),
    x: f[0] * $ * (p ? -1 : 1) + E,
    y: f[1] * J * (h ? -1 : 1) + O
  };
}
const Ny = { width: 0, height: 0, x: 0, y: 0 }, b2 = {
  ...Ny,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function x2(n, i, o) {
  const u = i.position.x + n.position.x, s = i.position.y + n.position.y, f = n.measured.width ?? 0, d = n.measured.height ?? 0, g = o[0] * f, p = o[1] * d;
  return [
    [u - g, s - p],
    [u + f - g, s + d - p]
  ];
}
function _2({ domNode: n, nodeId: i, getStoreItems: o, onChange: u, onEnd: s }) {
  const f = Ye(n);
  let d = {
    controlDirection: km("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function g({ controlPosition: h, boundaries: v, keepAspectRatio: y, resizeDirection: b, onResizeStart: _, onResize: w, onResizeEnd: A, shouldResize: N }) {
    let M = { ...Ny }, U = { ...b2 };
    d = {
      boundaries: v,
      resizeDirection: b,
      keepAspectRatio: y,
      controlDirection: km(h)
    };
    let S, C = null, j = [], k, B, $, J = !1;
    const ut = kp().on("start", (X) => {
      const { nodeLookup: I, transform: ot, snapGrid: T, snapToGrid: V, nodeOrigin: E, paneDomNode: O } = o();
      if (S = I.get(i), !S)
        return;
      C = O?.getBoundingClientRect() ?? null;
      const { xSnapped: q, ySnapped: Z } = mo(X.sourceEvent, {
        transform: ot,
        snapGrid: T,
        snapToGrid: V,
        containerBounds: C
      });
      M = {
        width: S.measured.width ?? 0,
        height: S.measured.height ?? 0,
        x: S.position.x ?? 0,
        y: S.position.y ?? 0
      }, U = {
        ...M,
        pointerX: q,
        pointerY: Z,
        aspectRatio: M.width / M.height
      }, k = void 0, B = na(S.extent) ? S.extent : void 0, S.parentId && (S.extent === "parent" || S.expandParent) && (k = I.get(S.parentId)), k && S.extent === "parent" && (B = [
        [0, 0],
        [k.measured.width, k.measured.height]
      ]), j = [], $ = void 0;
      for (const [nt, z] of I)
        if (z.parentId === i && (j.push({
          id: nt,
          position: { ...z.position },
          extent: z.extent
        }), z.extent === "parent" || z.expandParent)) {
          const H = x2(z, S, z.origin ?? E);
          $ ? $ = [
            [Math.min(H[0][0], $[0][0]), Math.min(H[0][1], $[0][1])],
            [Math.max(H[1][0], $[1][0]), Math.max(H[1][1], $[1][1])]
          ] : $ = H;
        }
      _?.(X, { ...M });
    }).on("drag", (X) => {
      const { transform: I, snapGrid: ot, snapToGrid: T, nodeOrigin: V } = o(), E = mo(X.sourceEvent, {
        transform: I,
        snapGrid: ot,
        snapToGrid: T,
        containerBounds: C
      }), O = [];
      if (!S)
        return;
      const { x: q, y: Z, width: nt, height: z } = M, H = {}, P = S.origin ?? V, { width: lt, height: rt, x: ft, y: ct } = v2(U, d.controlDirection, E, d.boundaries, d.keepAspectRatio, P, B, $), tt = lt !== nt, st = rt !== z, xt = ft !== q && tt, bt = ct !== Z && st;
      if (!xt && !bt && !tt && !st)
        return;
      if ((xt || bt || P[0] === 1 || P[1] === 1) && (H.x = xt ? ft : M.x, H.y = bt ? ct : M.y, M.x = H.x, M.y = H.y, j.length > 0)) {
        const Dt = ft - q, Vt = ct - Z;
        for (const fe of j)
          fe.position = {
            x: fe.position.x - Dt + P[0] * (lt - nt),
            y: fe.position.y - Vt + P[1] * (rt - z)
          }, O.push(fe);
      }
      if ((tt || st) && (H.width = tt && (!d.resizeDirection || d.resizeDirection === "horizontal") ? lt : M.width, H.height = st && (!d.resizeDirection || d.resizeDirection === "vertical") ? rt : M.height, M.width = H.width, M.height = H.height), k && S.expandParent) {
        const Dt = P[0] * (H.width ?? 0);
        H.x && H.x < Dt && (M.x = Dt, U.x = U.x - (H.x - Dt));
        const Vt = P[1] * (H.height ?? 0);
        H.y && H.y < Vt && (M.y = Vt, U.y = U.y - (H.y - Vt));
      }
      const gt = y2({
        width: M.width,
        prevWidth: nt,
        height: M.height,
        prevHeight: z,
        affectsX: d.controlDirection.affectsX,
        affectsY: d.controlDirection.affectsY
      }), yt = { ...M, direction: gt };
      N?.(X, yt) !== !1 && (J = !0, w?.(X, yt), u(H, O));
    }).on("end", (X) => {
      J && (A?.(X, { ...M }), s?.({ ...M }), J = !1);
    });
    f.call(ut);
  }
  function p() {
    f.on(".drag", null);
  }
  return {
    update: g,
    destroy: p
  };
}
var Sf = { exports: {} }, wf = {}, Ef = { exports: {} }, zf = {};
var jm;
function S2() {
  if (jm) return zf;
  jm = 1;
  var n = Mo();
  function i(y, b) {
    return y === b && (y !== 0 || 1 / y === 1 / b) || y !== y && b !== b;
  }
  var o = typeof Object.is == "function" ? Object.is : i, u = n.useState, s = n.useEffect, f = n.useLayoutEffect, d = n.useDebugValue;
  function g(y, b) {
    var _ = b(), w = u({ inst: { value: _, getSnapshot: b } }), A = w[0].inst, N = w[1];
    return f(
      function() {
        A.value = _, A.getSnapshot = b, p(A) && N({ inst: A });
      },
      [y, _, b]
    ), s(
      function() {
        return p(A) && N({ inst: A }), y(function() {
          p(A) && N({ inst: A });
        });
      },
      [y]
    ), d(_), _;
  }
  function p(y) {
    var b = y.getSnapshot;
    y = y.value;
    try {
      var _ = b();
      return !o(y, _);
    } catch {
      return !0;
    }
  }
  function h(y, b) {
    return b();
  }
  var v = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? h : g;
  return zf.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : v, zf;
}
var Lm;
function w2() {
  return Lm || (Lm = 1, Ef.exports = S2()), Ef.exports;
}
var Vm;
function E2() {
  if (Vm) return wf;
  Vm = 1;
  var n = Mo(), i = w2();
  function o(h, v) {
    return h === v && (h !== 0 || 1 / h === 1 / v) || h !== h && v !== v;
  }
  var u = typeof Object.is == "function" ? Object.is : o, s = i.useSyncExternalStore, f = n.useRef, d = n.useEffect, g = n.useMemo, p = n.useDebugValue;
  return wf.useSyncExternalStoreWithSelector = function(h, v, y, b, _) {
    var w = f(null);
    if (w.current === null) {
      var A = { hasValue: !1, value: null };
      w.current = A;
    } else A = w.current;
    w = g(
      function() {
        function M(k) {
          if (!U) {
            if (U = !0, S = k, k = b(k), _ !== void 0 && A.hasValue) {
              var B = A.value;
              if (_(B, k))
                return C = B;
            }
            return C = k;
          }
          if (B = C, u(S, k)) return B;
          var $ = b(k);
          return _ !== void 0 && _(B, $) ? (S = k, B) : (S = k, C = $);
        }
        var U = !1, S, C, j = y === void 0 ? null : y;
        return [
          function() {
            return M(v());
          },
          j === null ? void 0 : function() {
            return M(j());
          }
        ];
      },
      [v, y, b, _]
    );
    var N = s(h, w[0], w[1]);
    return d(
      function() {
        A.hasValue = !0, A.value = N;
      },
      [N]
    ), p(N), N;
  }, wf;
}
var qm;
function z2() {
  return qm || (qm = 1, Sf.exports = E2()), Sf.exports;
}
var M2 = z2();
const N2 = /* @__PURE__ */ _p(M2), A2 = {}, Xm = (n) => {
  let i;
  const o = /* @__PURE__ */ new Set(), u = (v, y) => {
    const b = typeof v == "function" ? v(i) : v;
    if (!Object.is(b, i)) {
      const _ = i;
      i = y ?? (typeof b != "object" || b === null) ? b : Object.assign({}, i, b), o.forEach((w) => w(i, _));
    }
  }, s = () => i, p = { setState: u, getState: s, getInitialState: () => h, subscribe: (v) => (o.add(v), () => o.delete(v)), destroy: () => {
    (A2 ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), o.clear();
  } }, h = i = n(u, s, p);
  return p;
}, C2 = (n) => n ? Xm(n) : Xm, { useDebugValue: T2 } = kb, { useSyncExternalStoreWithSelector: D2 } = N2, O2 = (n) => n;
function Ay(n, i = O2, o) {
  const u = D2(
    n.subscribe,
    n.getState,
    n.getServerState || n.getInitialState,
    i,
    o
  );
  return T2(u), u;
}
const Zm = (n, i) => {
  const o = C2(n), u = (s, f = i) => Ay(o, s, f);
  return Object.assign(u, o), u;
}, H2 = (n, i) => n ? Zm(n, i) : Zm;
function Gt(n, i) {
  if (Object.is(n, i))
    return !0;
  if (typeof n != "object" || n === null || typeof i != "object" || i === null)
    return !1;
  if (n instanceof Map && i instanceof Map) {
    if (n.size !== i.size) return !1;
    for (const [u, s] of n)
      if (!Object.is(s, i.get(u)))
        return !1;
    return !0;
  }
  if (n instanceof Set && i instanceof Set) {
    if (n.size !== i.size) return !1;
    for (const u of n)
      if (!i.has(u))
        return !1;
    return !0;
  }
  const o = Object.keys(n);
  if (o.length !== Object.keys(i).length)
    return !1;
  for (const u of o)
    if (!Object.prototype.hasOwnProperty.call(i, u) || !Object.is(n[u], i[u]))
      return !1;
  return !0;
}
Sp();
const Lr = W.createContext(null), R2 = Lr.Provider, Cy = cn.error001("react");
function Nt(n, i) {
  const o = W.useContext(Lr);
  if (o === null)
    throw new Error(Cy);
  return Ay(o, n, i);
}
function Qt() {
  const n = W.useContext(Lr);
  if (n === null)
    throw new Error(Cy);
  return W.useMemo(() => ({
    getState: n.getState,
    setState: n.setState,
    subscribe: n.subscribe
  }), [n]);
}
const Gm = { display: "none" }, B2 = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Ty = "react-flow__node-desc", Dy = "react-flow__edge-desc", U2 = "react-flow__aria-live", k2 = (n) => n.ariaLiveMessage, Y2 = (n) => n.ariaLabelConfig;
function j2({ rfId: n }) {
  const i = Nt(k2);
  return L.jsx("div", { id: `${U2}-${n}`, "aria-live": "assertive", "aria-atomic": "true", style: B2, children: i });
}
function L2({ rfId: n, disableKeyboardA11y: i }) {
  const o = Nt(Y2);
  return L.jsxs(L.Fragment, { children: [L.jsx("div", { id: `${Ty}-${n}`, style: Gm, children: i ? o["node.a11yDescription.default"] : o["node.a11yDescription.keyboardDisabled"] }), L.jsx("div", { id: `${Dy}-${n}`, style: Gm, children: o["edge.a11yDescription.default"] }), !i && L.jsx(j2, { rfId: n })] });
}
const Vr = W.forwardRef(({ position: n = "top-left", children: i, className: o, style: u, ...s }, f) => {
  const d = `${n}`.split("-");
  return L.jsx("div", { className: le(["react-flow__panel", o, ...d]), style: u, ref: f, ...s, children: i });
});
Vr.displayName = "Panel";
const Qm = "https://reactflow.dev?utm_source=attribution";
function V2({ proOptions: n, position: i = "bottom-right" }) {
  return n?.hideAttribution ? null : L.jsx(Vr, { position: i, className: "react-flow__attribution", "data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${Qm}`, children: L.jsx("a", { href: Qm, target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const q2 = (n) => {
  const i = [], o = [];
  for (const [, u] of n.nodeLookup)
    u.selected && i.push(u.internals.userNode);
  for (const [, u] of n.edgeLookup)
    u.selected && o.push(u);
  return { selectedNodes: i, selectedEdges: o };
}, cr = (n) => n.id;
function X2(n, i) {
  return Gt(n.selectedNodes.map(cr), i.selectedNodes.map(cr)) && Gt(n.selectedEdges.map(cr), i.selectedEdges.map(cr));
}
function Z2({ onSelectionChange: n }) {
  const i = Qt(), { selectedNodes: o, selectedEdges: u } = Nt(q2, X2);
  return W.useEffect(() => {
    const s = { nodes: o, edges: u };
    n?.(s), i.getState().onSelectionChangeHandlers.forEach((f) => f(s));
  }, [o, u, n]), null;
}
const G2 = (n) => !!n.onSelectionChangeHandlers;
function Q2({ onSelectionChange: n }) {
  const i = Nt(G2);
  return n || i ? L.jsx(Z2, { onSelectionChange: n }) : null;
}
const Oy = [0, 0], $2 = { x: 0, y: 0, zoom: 1 }, K2 = [
  "nodes",
  "edges",
  "defaultNodes",
  "defaultEdges",
  "onConnect",
  "onConnectStart",
  "onConnectEnd",
  "onClickConnectStart",
  "onClickConnectEnd",
  "nodesDraggable",
  "autoPanOnNodeFocus",
  "nodesConnectable",
  "nodesFocusable",
  "edgesFocusable",
  "edgesReconnectable",
  "elevateNodesOnSelect",
  "elevateEdgesOnSelect",
  "minZoom",
  "maxZoom",
  "nodeExtent",
  "onNodesChange",
  "onEdgesChange",
  "elementsSelectable",
  "connectionMode",
  "snapGrid",
  "snapToGrid",
  "translateExtent",
  "connectOnClick",
  "defaultEdgeOptions",
  "fitView",
  "fitViewOptions",
  "onNodesDelete",
  "onEdgesDelete",
  "onDelete",
  "onNodeDrag",
  "onNodeDragStart",
  "onNodeDragStop",
  "onSelectionDrag",
  "onSelectionDragStart",
  "onSelectionDragStop",
  "onMoveStart",
  "onMove",
  "onMoveEnd",
  "noPanClassName",
  "nodeOrigin",
  "autoPanOnConnect",
  "autoPanOnNodeDrag",
  "onError",
  "connectionRadius",
  "isValidConnection",
  "selectNodesOnDrag",
  "nodeDragThreshold",
  "connectionDragThreshold",
  "onBeforeDelete",
  "debug",
  "autoPanSpeed",
  "ariaLabelConfig",
  "zIndexMode"
], $m = [...K2, "rfId"], J2 = (n) => ({
  setNodes: n.setNodes,
  setEdges: n.setEdges,
  setMinZoom: n.setMinZoom,
  setMaxZoom: n.setMaxZoom,
  setTranslateExtent: n.setTranslateExtent,
  setNodeExtent: n.setNodeExtent,
  reset: n.reset,
  setDefaultNodesAndEdges: n.setDefaultNodesAndEdges
}), Km = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: xo,
  nodeOrigin: Oy,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function W2(n) {
  const { setNodes: i, setEdges: o, setMinZoom: u, setMaxZoom: s, setTranslateExtent: f, setNodeExtent: d, reset: g, setDefaultNodesAndEdges: p } = Nt(J2, Gt), h = Qt();
  W.useEffect(() => (p(n.defaultNodes, n.defaultEdges), () => {
    v.current = Km, g();
  }), []);
  const v = W.useRef(Km);
  return W.useEffect(
    () => {
      for (const y of $m) {
        const b = n[y], _ = v.current[y];
        b !== _ && (typeof n[y] > "u" || (y === "nodes" ? i(b) : y === "edges" ? o(b) : y === "minZoom" ? u(b) : y === "maxZoom" ? s(b) : y === "translateExtent" ? f(b) : y === "nodeExtent" ? d(b) : y === "ariaLabelConfig" ? h.setState({ ariaLabelConfig: Rw(b) }) : y === "fitView" ? h.setState({ fitViewQueued: b }) : y === "fitViewOptions" ? h.setState({ fitViewOptions: b }) : h.setState({ [y]: b })));
      }
      v.current = n;
    },
    // Only re-run the effect if one of the fields we track changes
    $m.map((y) => n[y])
  ), null;
}
function Jm() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function F2(n) {
  const [i, o] = W.useState(n === "system" ? null : n);
  return W.useEffect(() => {
    if (n !== "system") {
      o(n);
      return;
    }
    const u = Jm(), s = () => o(u?.matches ? "dark" : "light");
    return s(), u?.addEventListener("change", s), () => {
      u?.removeEventListener("change", s);
    };
  }, [n]), i !== null ? i : Jm()?.matches ? "dark" : "light";
}
const Wm = typeof document < "u" ? document : null;
function Eo(n = null, i = { target: Wm, actInsideInputWithModifier: !0 }) {
  const [o, u] = W.useState(!1), s = W.useRef(!1), f = W.useRef(/* @__PURE__ */ new Set([])), [d, g] = W.useMemo(() => {
    if (n !== null) {
      const h = (Array.isArray(n) ? n : [n]).filter((y) => typeof y == "string").map((y) => y.replace("+", `
`).replace(`

`, `
+`).split(`
`)), v = h.reduce((y, b) => y.concat(...b), []);
      return [h, v];
    }
    return [[], []];
  }, [n]);
  return W.useEffect(() => {
    const p = i?.target ?? Wm, h = i?.actInsideInputWithModifier ?? !0;
    if (n !== null) {
      const v = (_) => {
        if (s.current = _.ctrlKey || _.metaKey || _.shiftKey || _.altKey, (!s.current || s.current && !h) && fy(_))
          return !1;
        const A = Im(_.code, g);
        if (f.current.add(_[A]), Fm(d, f.current, !1)) {
          const N = _.composedPath?.()?.[0] || _.target, M = N?.nodeName === "BUTTON" || N?.nodeName === "A";
          i.preventDefault !== !1 && (s.current || !M) && _.preventDefault(), u(!0);
        }
      }, y = (_) => {
        const w = Im(_.code, g);
        Fm(d, f.current, !0) ? (u(!1), f.current.clear()) : f.current.delete(_[w]), _.key === "Meta" && f.current.clear(), s.current = !1;
      }, b = () => {
        f.current.clear(), u(!1);
      };
      return p?.addEventListener("keydown", v), p?.addEventListener("keyup", y), window.addEventListener("blur", b), window.addEventListener("contextmenu", b), () => {
        p?.removeEventListener("keydown", v), p?.removeEventListener("keyup", y), window.removeEventListener("blur", b), window.removeEventListener("contextmenu", b);
      };
    }
  }, [n, u]), o;
}
function Fm(n, i, o) {
  return n.filter((u) => o || u.length === i.size).some((u) => u.every((s) => i.has(s)));
}
function Im(n, i) {
  return i.includes(n) ? "code" : "key";
}
const I2 = () => {
  const n = Qt();
  return W.useMemo(() => ({
    zoomIn: async (i) => {
      const { panZoom: o } = n.getState();
      return o ? o.scaleBy(1.2, i) : !1;
    },
    zoomOut: async (i) => {
      const { panZoom: o } = n.getState();
      return o ? o.scaleBy(1 / 1.2, i) : !1;
    },
    zoomTo: async (i, o) => {
      const { panZoom: u } = n.getState();
      return u ? u.scaleTo(i, o) : !1;
    },
    getZoom: () => n.getState().transform[2],
    setViewport: async (i, o) => {
      const { transform: [u, s, f], panZoom: d } = n.getState();
      return d ? (await d.setViewport({
        x: i.x ?? u,
        y: i.y ?? s,
        zoom: i.zoom ?? f
      }, o), !0) : !1;
    },
    getViewport: () => {
      const [i, o, u] = n.getState().transform;
      return { x: i, y: o, zoom: u };
    },
    setCenter: async (i, o, u) => n.getState().setCenter(i, o, u),
    fitBounds: async (i, o) => {
      const { width: u, height: s, minZoom: f, maxZoom: d, panZoom: g } = n.getState(), p = nd(i, u, s, f, d, o?.padding ?? 0.1);
      return g ? (await g.setViewport(p, {
        duration: o?.duration,
        ease: o?.ease,
        interpolate: o?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (i, o = {}) => {
      const { transform: u, snapGrid: s, snapToGrid: f, domNode: d } = n.getState();
      if (!d)
        return i;
      const { x: g, y: p } = d.getBoundingClientRect(), h = {
        x: i.x - g,
        y: i.y - p
      }, v = o.snapGrid ?? s, y = o.snapToGrid ?? f;
      return Oo(h, u, y, v);
    },
    flowToScreenPosition: (i) => {
      const { transform: o, domNode: u } = n.getState();
      if (!u)
        return i;
      const { x: s, y: f } = u.getBoundingClientRect(), d = ii(i, o);
      return {
        x: d.x + s,
        y: d.y + f
      };
    }
  }), []);
};
function Hy(n, i) {
  const o = [], u = /* @__PURE__ */ new Map(), s = [];
  for (const f of n)
    if (f.type === "add") {
      s.push(f);
      continue;
    } else if (f.type === "remove" || f.type === "replace")
      u.set(f.id, [f]);
    else {
      const d = u.get(f.id);
      d ? d.push(f) : u.set(f.id, [f]);
    }
  for (const f of i) {
    const d = u.get(f.id);
    if (!d) {
      o.push(f);
      continue;
    }
    if (d[0].type === "remove")
      continue;
    if (d[0].type === "replace") {
      o.push({ ...d[0].item });
      continue;
    }
    const g = { ...f };
    for (const p of d)
      P2(p, g);
    o.push(g);
  }
  return s.length && s.forEach((f) => {
    f.index !== void 0 ? o.splice(f.index, 0, { ...f.item }) : o.push({ ...f.item });
  }), o;
}
function P2(n, i) {
  switch (n.type) {
    case "select": {
      i.selected = n.selected;
      break;
    }
    case "position": {
      typeof n.position < "u" && (i.position = n.position), typeof n.dragging < "u" && (i.dragging = n.dragging);
      break;
    }
    case "dimensions": {
      typeof n.dimensions < "u" && (i.measured = {
        ...n.dimensions
      }, n.setAttributes && ((n.setAttributes === !0 || n.setAttributes === "width") && (i.width = n.dimensions.width), (n.setAttributes === !0 || n.setAttributes === "height") && (i.height = n.dimensions.height))), typeof n.resizing == "boolean" && (i.resizing = n.resizing);
      break;
    }
  }
}
function Ry(n, i) {
  return Hy(n, i);
}
function By(n, i) {
  return Hy(n, i);
}
function $l(n, i) {
  return {
    id: n,
    type: "select",
    selected: i
  };
}
function Ia(n, i = /* @__PURE__ */ new Set(), o = !1) {
  const u = [];
  for (const [s, f] of n) {
    const d = i.has(s);
    !(f.selected === void 0 && !d) && f.selected !== d && (o && (f.selected = d), u.push($l(f.id, d)));
  }
  return u;
}
function Pm({ items: n = [], lookup: i }) {
  const o = [], u = new Map(n.map((s) => [s.id, s]));
  for (const [s, f] of n.entries()) {
    const d = i.get(f.id), g = d?.internals?.userNode ?? d;
    g !== void 0 && g !== f && o.push({ id: f.id, item: f, type: "replace" }), g === void 0 && o.push({ item: f, type: "add", index: s });
  }
  for (const [s] of i)
    u.get(s) === void 0 && o.push({ id: s, type: "remove" });
  return o;
}
function tp(n) {
  return {
    id: n.id,
    type: "remove"
  };
}
const tE = ry();
function eE(n, i, o = {}) {
  return Lw(n, i, {
    ...o,
    onError: o.onError ?? tE
  });
}
const ep = (n) => zw(n), nE = (n) => ly(n);
function Uy(n) {
  return W.forwardRef(n);
}
const lE = typeof window < "u" ? W.useLayoutEffect : W.useEffect;
function np(n) {
  const [i, o] = W.useState(BigInt(0)), [u] = W.useState(() => aE(() => o((s) => s + BigInt(1))));
  return lE(() => {
    const s = u.get();
    s.length && (n(s), u.reset());
  }, [i]), u;
}
function aE(n) {
  let i = [];
  return {
    get: () => i,
    reset: () => {
      i = [];
    },
    push: (o) => {
      i.push(o), n();
    }
  };
}
const ky = W.createContext(null);
function iE({ children: n }) {
  const i = Qt(), o = W.useCallback((g) => {
    const { nodes: p = [], setNodes: h, hasDefaultNodes: v, onNodesChange: y, nodeLookup: b, fitViewQueued: _, onNodesChangeMiddlewareMap: w } = i.getState();
    let A = p;
    for (const M of g)
      A = typeof M == "function" ? M(A) : M;
    let N = Pm({
      items: A,
      lookup: b
    });
    for (const M of w.values())
      N = M(N);
    v && h(A), N.length > 0 ? y?.(N) : _ && window.requestAnimationFrame(() => {
      const { fitViewQueued: M, nodes: U, setNodes: S } = i.getState();
      M && S(U);
    });
  }, []), u = np(o), s = W.useCallback((g) => {
    const { edges: p = [], setEdges: h, hasDefaultEdges: v, onEdgesChange: y, edgeLookup: b } = i.getState();
    let _ = p;
    for (const w of g)
      _ = typeof w == "function" ? w(_) : w;
    v ? h(_) : y && y(Pm({
      items: _,
      lookup: b
    }));
  }, []), f = np(s), d = W.useMemo(() => ({ nodeQueue: u, edgeQueue: f }), []);
  return L.jsx(ky.Provider, { value: d, children: n });
}
function oE() {
  const n = W.useContext(ky);
  if (!n)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return n;
}
const uE = (n) => !!n.panZoom;
function qr() {
  const n = I2(), i = Qt(), o = oE(), u = Nt(uE), s = W.useMemo(() => {
    const f = (y) => i.getState().nodeLookup.get(y), d = (y) => {
      o.nodeQueue.push(y);
    }, g = (y) => {
      o.edgeQueue.push(y);
    }, p = (y) => {
      const { nodeLookup: b, nodeOrigin: _ } = i.getState(), w = ep(y) ? y : b.get(y.id), A = w.parentId ? cy(w.position, w.measured, w.parentId, b, _) : w.position, N = {
        ...w,
        position: A,
        width: w.measured?.width ?? w.width,
        height: w.measured?.height ?? w.height
      };
      return So(N);
    }, h = (y, b, _ = { replace: !1 }) => {
      d((w) => w.map((A) => {
        if (A.id === y) {
          const N = typeof b == "function" ? b(A) : b;
          return _.replace && ep(N) ? N : { ...A, ...N };
        }
        return A;
      }));
    }, v = (y, b, _ = { replace: !1 }) => {
      g((w) => w.map((A) => {
        if (A.id === y) {
          const N = typeof b == "function" ? b(A) : b;
          return _.replace && nE(N) ? N : { ...A, ...N };
        }
        return A;
      }));
    };
    return {
      getNodes: () => i.getState().nodes.map((y) => ({ ...y })),
      getNode: (y) => f(y)?.internals.userNode,
      getInternalNode: f,
      getEdges: () => {
        const { edges: y = [] } = i.getState();
        return y.map((b) => ({ ...b }));
      },
      getEdge: (y) => i.getState().edgeLookup.get(y),
      setNodes: d,
      setEdges: g,
      addNodes: (y) => {
        const b = Array.isArray(y) ? y : [y];
        o.nodeQueue.push((_) => [..._, ...b]);
      },
      addEdges: (y) => {
        const b = Array.isArray(y) ? y : [y];
        o.edgeQueue.push((_) => [..._, ...b]);
      },
      toObject: () => {
        const { nodes: y = [], edges: b = [], transform: _ } = i.getState(), [w, A, N] = _;
        return {
          nodes: y.map((M) => ({ ...M })),
          edges: b.map((M) => ({ ...M })),
          viewport: {
            x: w,
            y: A,
            zoom: N
          }
        };
      },
      deleteElements: async ({ nodes: y = [], edges: b = [] }) => {
        const { nodes: _, edges: w, onNodesDelete: A, onEdgesDelete: N, triggerNodeChanges: M, triggerEdgeChanges: U, onDelete: S, onBeforeDelete: C } = i.getState(), { nodes: j, edges: k } = await Tw({
          nodesToRemove: y,
          edgesToRemove: b,
          nodes: _,
          edges: w,
          onBeforeDelete: C
        }), B = k.length > 0, $ = j.length > 0;
        if (B) {
          const J = k.map(tp);
          N?.(k), U(J);
        }
        if ($) {
          const J = j.map(tp);
          A?.(j), M(J);
        }
        return ($ || B) && S?.({ nodes: j, edges: k }), { deletedNodes: j, deletedEdges: k };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (y, b = !0, _) => {
        const w = Mm(y), A = w ? y : p(y), N = _ !== void 0;
        return A ? (_ || i.getState().nodes).filter((M) => {
          const U = i.getState().nodeLookup.get(M.id);
          if (U && !w && (M.id === y.id || !U.internals.positionAbsolute))
            return !1;
          const S = So(N ? M : U), C = Nr(S, A);
          return b && C > 0 || C >= S.width * S.height || C >= A.width * A.height;
        }) : [];
      },
      isNodeIntersecting: (y, b, _ = !0) => {
        const A = Mm(y) ? y : p(y);
        if (!A)
          return !1;
        const N = Nr(A, b);
        return _ && N > 0 || N >= b.width * b.height || N >= A.width * A.height;
      },
      updateNode: h,
      updateNodeData: (y, b, _ = { replace: !1 }) => {
        h(y, (w) => {
          const A = typeof b == "function" ? b(w) : b;
          return _.replace ? { ...w, data: A } : { ...w, data: { ...w.data, ...A } };
        }, _);
      },
      updateEdge: v,
      updateEdgeData: (y, b, _ = { replace: !1 }) => {
        v(y, (w) => {
          const A = typeof b == "function" ? b(w) : b;
          return _.replace ? { ...w, data: A } : { ...w, data: { ...w.data, ...A } };
        }, _);
      },
      getNodesBounds: (y) => {
        const { nodeLookup: b, nodeOrigin: _ } = i.getState();
        return Mw(y, { nodeLookup: b, nodeOrigin: _ });
      },
      getHandleConnections: ({ type: y, id: b, nodeId: _ }) => Array.from(i.getState().connectionLookup.get(`${_}-${y}${b ? `-${b}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: y, handleId: b, nodeId: _ }) => Array.from(i.getState().connectionLookup.get(`${_}${y ? b ? `-${y}-${b}` : `-${y}` : ""}`)?.values() ?? []),
      fitView: async (y) => {
        const b = i.getState().fitViewResolver ?? Hw();
        return i.setState({ fitViewQueued: !0, fitViewOptions: y, fitViewResolver: b }), o.nodeQueue.push((_) => [..._]), b.promise;
      }
    };
  }, []);
  return W.useMemo(() => ({
    ...s,
    ...n,
    viewportInitialized: u
  }), [u]);
}
const lp = (n) => n.selected, rE = typeof window < "u" ? window : void 0;
function cE({ deleteKeyCode: n, multiSelectionKeyCode: i }) {
  const o = Qt(), { deleteElements: u } = qr(), s = Eo(n, { actInsideInputWithModifier: !1 }), f = Eo(i, { target: rE });
  W.useEffect(() => {
    if (s) {
      const { edges: d, nodes: g } = o.getState();
      u({ nodes: g.filter(lp), edges: d.filter(lp) }), o.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), W.useEffect(() => {
    o.setState({ multiSelectionActive: f });
  }, [f]);
}
function sE(n) {
  const i = Qt();
  W.useEffect(() => {
    const o = () => {
      if (!n.current || !(n.current.checkVisibility?.() ?? !0))
        return !1;
      const u = ad(n.current);
      (u.height === 0 || u.width === 0) && i.getState().onError?.("004", cn.error004()), i.setState({ width: u.width || 500, height: u.height || 500 });
    };
    if (n.current) {
      o(), window.addEventListener("resize", o);
      const u = new ResizeObserver(() => o());
      return u.observe(n.current), () => {
        window.removeEventListener("resize", o), u && n.current && u.unobserve(n.current);
      };
    }
  }, []);
}
const Xr = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, fE = (n) => ({
  userSelectionActive: n.userSelectionActive,
  lib: n.lib,
  connectionInProgress: n.connection.inProgress
});
function dE({ onPaneContextMenu: n, zoomOnScroll: i = !0, zoomOnPinch: o = !0, panOnScroll: u = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: f = Fl.Free, zoomOnDoubleClick: d = !0, panOnDrag: g = !0, defaultViewport: p, translateExtent: h, minZoom: v, maxZoom: y, zoomActivationKeyCode: b, preventScrolling: _ = !0, children: w, noWheelClassName: A, noPanClassName: N, onViewportChange: M, isControlledViewport: U, paneClickDistance: S, selectionOnDrag: C }) {
  const j = Qt(), k = W.useRef(null), { userSelectionActive: B, lib: $, connectionInProgress: J } = Nt(fE, Gt), ut = Eo(b), X = W.useRef();
  sE(k);
  const I = W.useCallback((ot) => {
    M?.({ x: ot[0], y: ot[1], zoom: ot[2] }), U || j.setState({ transform: ot });
  }, [M, U]);
  return W.useEffect(() => {
    if (k.current) {
      X.current = p2({
        domNode: k.current,
        minZoom: v,
        maxZoom: y,
        translateExtent: h,
        viewport: p,
        onDraggingChange: (E) => j.setState((O) => O.paneDragging === E ? O : { paneDragging: E }),
        onPanZoomStart: (E, O) => {
          const { onViewportChangeStart: q, onMoveStart: Z } = j.getState();
          Z?.(E, O), q?.(O);
        },
        onPanZoom: (E, O) => {
          const { onViewportChange: q, onMove: Z } = j.getState();
          Z?.(E, O), q?.(O);
        },
        onPanZoomEnd: (E, O) => {
          const { onViewportChangeEnd: q, onMoveEnd: Z } = j.getState();
          Z?.(E, O), q?.(O);
        }
      });
      const { x: ot, y: T, zoom: V } = X.current.getViewport();
      return j.setState({
        panZoom: X.current,
        transform: [ot, T, V],
        domNode: k.current.closest(".react-flow")
      }), () => {
        X.current?.destroy();
      };
    }
  }, []), W.useEffect(() => {
    X.current?.update({
      onPaneContextMenu: n,
      zoomOnScroll: i,
      zoomOnPinch: o,
      panOnScroll: u,
      panOnScrollSpeed: s,
      panOnScrollMode: f,
      zoomOnDoubleClick: d,
      panOnDrag: g,
      zoomActivationKeyPressed: ut,
      preventScrolling: _,
      noPanClassName: N,
      userSelectionActive: B,
      noWheelClassName: A,
      lib: $,
      onTransformChange: I,
      connectionInProgress: J,
      selectionOnDrag: C,
      paneClickDistance: S
    });
  }, [
    n,
    i,
    o,
    u,
    s,
    f,
    d,
    g,
    ut,
    _,
    N,
    B,
    A,
    $,
    I,
    J,
    C,
    S
  ]), L.jsx("div", { className: "react-flow__renderer", ref: k, style: Xr, children: w });
}
const hE = (n) => ({
  userSelectionActive: n.userSelectionActive,
  userSelectionRect: n.userSelectionRect
});
function gE() {
  const { userSelectionActive: n, userSelectionRect: i } = Nt(hE, Gt);
  return n && i ? L.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: i.width,
    height: i.height,
    transform: `translate(${i.x}px, ${i.y}px)`
  } }) : null;
}
const Mf = (n, i) => (o) => {
  o.target === i.current && n?.(o);
}, mE = (n) => ({
  userSelectionActive: n.userSelectionActive,
  elementsSelectable: n.elementsSelectable,
  dragging: n.paneDragging,
  panBy: n.panBy,
  autoPanSpeed: n.autoPanSpeed
});
function pE({ isSelecting: n, selectionKeyPressed: i, selectionMode: o = _o.Full, panOnDrag: u, autoPanOnSelection: s, paneClickDistance: f, selectionOnDrag: d, onSelectionStart: g, onSelectionEnd: p, onPaneClick: h, onPaneContextMenu: v, onPaneScroll: y, onPaneMouseEnter: b, onPaneMouseMove: _, onPaneMouseLeave: w, children: A }) {
  const N = W.useRef(0), M = Qt(), { userSelectionActive: U, elementsSelectable: S, dragging: C, panBy: j, autoPanSpeed: k } = Nt(mE, Gt), B = S && (n || U), $ = W.useRef(null), J = W.useRef(), ut = W.useRef(/* @__PURE__ */ new Set()), X = W.useRef(/* @__PURE__ */ new Set()), I = W.useRef(!1), ot = W.useRef(!1), T = W.useRef({ x: 0, y: 0 }), V = W.useRef(!1), E = (tt) => {
    if (ot.current || I.current || M.getState().connection.inProgress) {
      ot.current = !1, I.current = !1;
      return;
    }
    h?.(tt), M.getState().resetSelectedElements(), M.setState({ nodesSelectionActive: !1 });
  }, O = (tt) => {
    if (Array.isArray(u) && u?.includes(2)) {
      tt.preventDefault();
      return;
    }
    v?.(tt);
  }, q = y ? (tt) => y(tt) : void 0, Z = (tt) => {
    ot.current && (tt.stopPropagation(), ot.current = !1);
  }, nt = (tt) => {
    const { domNode: st, transform: xt } = M.getState();
    if (J.current = st?.getBoundingClientRect(), !J.current)
      return;
    const bt = tt.target === $.current;
    if (!bt && !!tt.target.closest(".nokey") || !n || !(d && bt || i) || tt.button !== 0 || !tt.isPrimary)
      return;
    tt.target?.setPointerCapture?.(tt.pointerId), ot.current = !1;
    const { x: St, y: Dt } = rn(tt.nativeEvent, J.current), Vt = Oo({ x: St, y: Dt }, xt);
    M.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: Vt.x,
        startY: Vt.y,
        x: St,
        y: Dt
      }
    }), bt || (tt.stopPropagation(), tt.preventDefault());
  };
  function z(tt, st) {
    const { userSelectionRect: xt } = M.getState();
    if (!xt)
      return;
    const { transform: bt, nodeLookup: gt, edgeLookup: yt, connectionLookup: St, triggerNodeChanges: Dt, triggerEdgeChanges: Vt, defaultEdgeOptions: fe } = M.getState(), Le = { x: xt.startX, y: xt.startY }, { x: ye, y: ve } = ii(Le, bt), Ae = {
      startX: Le.x,
      startY: Le.y,
      x: tt < ye ? tt : ye,
      y: st < ve ? st : ve,
      width: Math.abs(tt - ye),
      height: Math.abs(st - ve)
    }, zl = ut.current, _n = X.current;
    ut.current = new Set(td(gt, Ae, bt, o === _o.Partial, !0).map((Ce) => Ce.id)), X.current = /* @__PURE__ */ new Set();
    const Jt = fe?.selectable ?? !0;
    for (const Ce of ut.current) {
      const Ve = St.get(Ce);
      if (Ve)
        for (const { edgeId: qe } of Ve.values()) {
          const Xe = yt.get(qe);
          Xe && (Xe.selectable ?? Jt) && X.current.add(qe);
        }
    }
    if (!Nm(zl, ut.current)) {
      const Ce = Ia(gt, ut.current, !0);
      Dt(Ce);
    }
    if (!Nm(_n, X.current)) {
      const Ce = Ia(yt, X.current);
      Vt(Ce);
    }
    M.setState({
      userSelectionRect: Ae,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function H() {
    if (!s || !J.current)
      return;
    const [tt, st] = ed(T.current, J.current, k);
    j({ x: tt, y: st }).then((xt) => {
      if (!ot.current || !xt) {
        N.current = requestAnimationFrame(H);
        return;
      }
      const { x: bt, y: gt } = T.current;
      z(bt, gt), N.current = requestAnimationFrame(H);
    });
  }
  const P = () => {
    cancelAnimationFrame(N.current), N.current = 0, V.current = !1;
  };
  W.useEffect(() => () => P(), []);
  const lt = (tt) => {
    const { userSelectionRect: st, transform: xt, resetSelectedElements: bt } = M.getState();
    if (!J.current || !st)
      return;
    const { x: gt, y: yt } = rn(tt.nativeEvent, J.current);
    T.current = { x: gt, y: yt };
    const St = ii({ x: st.startX, y: st.startY }, xt);
    if (!ot.current) {
      const Dt = i ? 0 : f;
      if (Math.hypot(gt - St.x, yt - St.y) <= Dt)
        return;
      bt(), g?.(tt);
    }
    ot.current = !0, V.current || (H(), V.current = !0), z(gt, yt);
  }, rt = (tt) => {
    if (!B) {
      tt.target === $.current && M.getState().connection.inProgress && (I.current = !0);
      return;
    }
    tt.button === 0 && (tt.target?.releasePointerCapture?.(tt.pointerId), !U && tt.target === $.current && M.getState().userSelectionRect && E?.(tt), M.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), ot.current && (p?.(tt), M.setState({
      nodesSelectionActive: ut.current.size > 0
    })), P());
  }, ft = (tt) => {
    tt.target?.releasePointerCapture?.(tt.pointerId), P();
  }, ct = u === !0 || Array.isArray(u) && u.includes(0);
  return L.jsxs("div", { className: le(["react-flow__pane", { draggable: ct, dragging: C, selection: n }]), onClick: B ? void 0 : Mf(E, $), onContextMenu: Mf(O, $), onWheel: Mf(q, $), onPointerEnter: B ? void 0 : b, onPointerMove: B ? lt : _, onPointerUp: rt, onPointerCancel: B ? ft : void 0, onPointerDownCapture: B ? nt : void 0, onClickCapture: B ? Z : void 0, onPointerLeave: w, ref: $, style: Xr, children: [A, L.jsx(gE, {})] });
}
function Vf({ id: n, store: i, unselect: o = !1, nodeRef: u }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: f, multiSelectionActive: d, nodeLookup: g, onError: p } = i.getState(), h = g.get(n);
  if (!h) {
    p?.("012", cn.error012(n));
    return;
  }
  i.setState({ nodesSelectionActive: !1 }), h.selected ? (o || h.selected && d) && (f({ nodes: [h], edges: [] }), requestAnimationFrame(() => u?.current?.blur())) : s([n]);
}
function Yy({ nodeRef: n, disabled: i = !1, noDragClassName: o, handleSelector: u, nodeId: s, isSelectable: f, nodeClickDistance: d }) {
  const g = Qt(), [p, h] = W.useState(!1), v = W.useRef();
  return W.useEffect(() => {
    v.current = n2({
      getStoreItems: () => g.getState(),
      onNodeMouseDown: (y) => {
        Vf({
          id: y,
          store: g,
          nodeRef: n
        });
      },
      onDragStart: () => {
        h(!0);
      },
      onDragStop: () => {
        h(!1);
      }
    });
  }, []), W.useEffect(() => {
    if (!(i || !n.current || !v.current))
      return v.current.update({
        noDragClassName: o,
        handleSelector: u,
        domNode: n.current,
        isSelectable: f,
        nodeId: s,
        nodeClickDistance: d
      }), () => {
        v.current?.destroy();
      };
  }, [o, u, i, f, n, s, d]), p;
}
const yE = (n) => (i) => i.selected && (i.draggable || n && typeof i.draggable > "u");
function jy() {
  const n = Qt();
  return W.useCallback((o) => {
    const { nodeExtent: u, snapToGrid: s, snapGrid: f, nodesDraggable: d, onError: g, updateNodePositions: p, nodeLookup: h, nodeOrigin: v } = n.getState(), y = /* @__PURE__ */ new Map(), b = yE(d), _ = s ? f[0] : 5, w = s ? f[1] : 5, A = o.direction.x * _ * o.factor, N = o.direction.y * w * o.factor;
    for (const [, M] of h) {
      if (!b(M))
        continue;
      let U = {
        x: M.internals.positionAbsolute.x + A,
        y: M.internals.positionAbsolute.y + N
      };
      s && (U = Do(U, f));
      const { position: S, positionAbsolute: C } = ay({
        nodeId: M.id,
        nextPosition: U,
        nodeLookup: h,
        nodeExtent: u,
        nodeOrigin: v,
        onError: g
      });
      M.position = S, M.internals.positionAbsolute = C, y.set(M.id, M);
    }
    p(y);
  }, []);
}
const sd = W.createContext(null), vE = sd.Provider;
sd.Consumer;
const Ly = () => W.useContext(sd), bE = (n) => ({
  connectOnClick: n.connectOnClick,
  noPanClassName: n.noPanClassName,
  rfId: n.rfId
}), Vy = W.createContext(null);
function xE({ children: n }) {
  const i = Nt(bE, Gt);
  return L.jsx(Vy.Provider, { value: i, children: n });
}
function _E() {
  const n = W.useContext(Vy);
  if (!n)
    throw new Error("useHandleConfig must be used within a HandleConfigProvider");
  return n;
}
const SE = {
  connectingFrom: !1,
  connectingTo: !1,
  clickConnecting: !1,
  isPossibleEndHandle: !0,
  connectionInProcess: !1,
  clickConnectionInProcess: !1,
  valid: !1
}, wE = (n, i, o) => (u) => {
  const { connectionClickStartHandle: s, connectionMode: f, connection: d } = u, { fromHandle: g, toHandle: p, isValid: h } = d;
  if (!g && !s)
    return SE;
  const v = p?.nodeId === n && p?.id === i && p?.type === o;
  return {
    connectingFrom: g?.nodeId === n && g?.id === i && g?.type === o,
    connectingTo: v,
    clickConnecting: s?.nodeId === n && s?.id === i && s?.type === o,
    isPossibleEndHandle: f === li.Strict ? g?.type !== o : n !== g?.nodeId || i !== g?.id,
    connectionInProcess: !!g,
    clickConnectionInProcess: !!s,
    valid: v && h
  };
};
function EE({ type: n = "source", position: i = mt.Top, isValidConnection: o, isConnectable: u = !0, isConnectableStart: s = !0, isConnectableEnd: f = !0, id: d, onConnect: g, children: p, className: h, onMouseDown: v, onTouchStart: y, ...b }, _) {
  const w = d || null, A = n === "target", N = Qt(), M = Ly(), { connectOnClick: U, noPanClassName: S, rfId: C } = _E(), { connectingFrom: j, connectingTo: k, clickConnecting: B, isPossibleEndHandle: $, connectionInProcess: J, clickConnectionInProcess: ut, valid: X } = Nt(wE(M, w, n), Gt);
  M || N.getState().onError?.("010", cn.error010());
  const I = (V) => {
    const { defaultEdgeOptions: E, onConnect: O, hasDefaultEdges: q } = N.getState(), Z = {
      ...E,
      ...V
    };
    if (q) {
      const { edges: nt, setEdges: z, onError: H } = N.getState();
      z(eE(Z, nt, { onError: H }));
    }
    O?.(Z), g?.(Z);
  }, ot = (V) => {
    if (!M)
      return;
    const E = dy(V.nativeEvent);
    if (s && (E && V.button === 0 || !E)) {
      const O = N.getState();
      Lf.onPointerDown(V.nativeEvent, {
        handleDomNode: V.currentTarget,
        autoPanOnConnect: O.autoPanOnConnect,
        connectionMode: O.connectionMode,
        connectionRadius: O.connectionRadius,
        domNode: O.domNode,
        nodeLookup: O.nodeLookup,
        lib: O.lib,
        isTarget: A,
        handleId: w,
        nodeId: M,
        flowId: O.rfId,
        panBy: O.panBy,
        cancelConnection: O.cancelConnection,
        onConnectStart: O.onConnectStart,
        onConnectEnd: (...q) => N.getState().onConnectEnd?.(...q),
        updateConnection: O.updateConnection,
        onConnect: I,
        isValidConnection: o || ((...q) => N.getState().isValidConnection?.(...q) ?? !0),
        getTransform: () => N.getState().transform,
        getFromHandle: () => N.getState().connection.fromHandle,
        autoPanSpeed: O.autoPanSpeed,
        dragThreshold: O.connectionDragThreshold
      });
    }
    E ? v?.(V) : y?.(V);
  }, T = (V) => {
    const { onClickConnectStart: E, onClickConnectEnd: O, connectionClickStartHandle: q, connectionMode: Z, isValidConnection: nt, lib: z, rfId: H, nodeLookup: P, connection: lt } = N.getState();
    if (!M || !q && !s)
      return;
    if (!q) {
      E?.(V.nativeEvent, { nodeId: M, handleId: w, handleType: n }), N.setState({ connectionClickStartHandle: { nodeId: M, type: n, id: w } });
      return;
    }
    const rt = sy(V.target), ft = o || nt, { connection: ct, isValid: tt } = Lf.isValid(V.nativeEvent, {
      handle: {
        nodeId: M,
        id: w,
        type: n
      },
      connectionMode: Z,
      fromNodeId: q.nodeId,
      fromHandleId: q.id || null,
      fromType: q.type,
      isValidConnection: ft,
      flowId: H,
      doc: rt,
      lib: z,
      nodeLookup: P
    });
    tt && ct && I(ct);
    const st = structuredClone(lt);
    delete st.inProgress, st.toPosition = st.toHandle ? st.toHandle.position : null, O?.(V, st), N.setState({ connectionClickStartHandle: null });
  };
  return L.jsx("div", { "data-handleid": w, "data-nodeid": M, "data-handlepos": i, "data-id": `${C}-${M}-${w}-${n}`, className: le([
    "react-flow__handle",
    `react-flow__handle-${i}`,
    "nodrag",
    S,
    h,
    {
      source: !A,
      target: A,
      connectable: u,
      connectablestart: s,
      connectableend: f,
      clickconnecting: B,
      connectingfrom: j,
      connectingto: k,
      valid: X,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: u && (!J || $) && (J || ut ? f : s)
    }
  ]), onMouseDown: ot, onTouchStart: ot, onClick: U ? T : void 0, ref: _, ...b, children: p });
}
const aa = W.memo(Uy(EE));
function zE({ data: n, isConnectable: i, sourcePosition: o = mt.Bottom }) {
  return L.jsxs(L.Fragment, { children: [n?.label, L.jsx(aa, { type: "source", position: o, isConnectable: i })] });
}
function ME({ data: n, isConnectable: i, targetPosition: o = mt.Top, sourcePosition: u = mt.Bottom }) {
  return L.jsxs(L.Fragment, { children: [L.jsx(aa, { type: "target", position: o, isConnectable: i }), n?.label, L.jsx(aa, { type: "source", position: u, isConnectable: i })] });
}
function NE() {
  return null;
}
function AE({ data: n, isConnectable: i, targetPosition: o = mt.Top }) {
  return L.jsxs(L.Fragment, { children: [L.jsx(aa, { type: "target", position: o, isConnectable: i }), n?.label] });
}
const Ar = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, ap = {
  input: zE,
  default: ME,
  output: AE,
  group: NE
};
function CE(n) {
  return n.internals.handleBounds === void 0 ? {
    width: n.width ?? n.initialWidth ?? n.style?.width,
    height: n.height ?? n.initialHeight ?? n.style?.height
  } : {
    width: n.width ?? n.style?.width,
    height: n.height ?? n.style?.height
  };
}
const TE = (n) => {
  const { width: i, height: o, x: u, y: s } = To(n.nodeLookup, {
    filter: (f) => !!f.selected
  });
  return {
    width: un(i) ? i : null,
    height: un(o) ? o : null,
    userSelectionActive: n.userSelectionActive,
    transformString: `translate(${n.transform[0]}px,${n.transform[1]}px) scale(${n.transform[2]}) translate(${u}px,${s}px)`
  };
};
function DE({ onSelectionContextMenu: n, noPanClassName: i, disableKeyboardA11y: o }) {
  const u = Qt(), { width: s, height: f, transformString: d, userSelectionActive: g } = Nt(TE, Gt), p = jy(), h = W.useRef(null);
  W.useEffect(() => {
    o || h.current?.focus({
      preventScroll: !0
    });
  }, [o]);
  const v = !g && s !== null && f !== null;
  if (Yy({
    nodeRef: h,
    disabled: !v
  }), !v)
    return null;
  const y = n ? (_) => {
    const w = u.getState().nodes.filter((A) => A.selected);
    n(_, w);
  } : void 0, b = (_) => {
    Object.prototype.hasOwnProperty.call(Ar, _.key) && (_.preventDefault(), p({
      direction: Ar[_.key],
      factor: _.shiftKey ? 4 : 1
    }));
  };
  return L.jsx("div", { className: le(["react-flow__nodesselection", "react-flow__container", i]), style: {
    transform: d
  }, children: L.jsx("div", { ref: h, className: "react-flow__nodesselection-rect", onContextMenu: y, tabIndex: o ? void 0 : -1, onKeyDown: o ? void 0 : b, style: {
    width: s,
    height: f
  } }) });
}
const ip = typeof window < "u" ? window : void 0, OE = (n) => ({ nodesSelectionActive: n.nodesSelectionActive, userSelectionActive: n.userSelectionActive });
function qy({ children: n, onPaneClick: i, onPaneMouseEnter: o, onPaneMouseMove: u, onPaneMouseLeave: s, onPaneContextMenu: f, onPaneScroll: d, paneClickDistance: g, deleteKeyCode: p, selectionKeyCode: h, selectionOnDrag: v, selectionMode: y, onSelectionStart: b, onSelectionEnd: _, multiSelectionKeyCode: w, panActivationKeyCode: A, zoomActivationKeyCode: N, elementsSelectable: M, zoomOnScroll: U, zoomOnPinch: S, panOnScroll: C, panOnScrollSpeed: j, panOnScrollMode: k, zoomOnDoubleClick: B, panOnDrag: $, autoPanOnSelection: J, defaultViewport: ut, translateExtent: X, minZoom: I, maxZoom: ot, preventScrolling: T, onSelectionContextMenu: V, noWheelClassName: E, noPanClassName: O, disableKeyboardA11y: q, onViewportChange: Z, isControlledViewport: nt }) {
  const { nodesSelectionActive: z, userSelectionActive: H } = Nt(OE, Gt), P = Eo(h, { target: ip }), lt = Eo(A, { target: ip }), rt = lt || $, ft = lt || C, ct = v && rt !== !0, tt = P || H || ct;
  return cE({ deleteKeyCode: p, multiSelectionKeyCode: w }), L.jsx(dE, { onPaneContextMenu: f, elementsSelectable: M, zoomOnScroll: U, zoomOnPinch: S, panOnScroll: ft, panOnScrollSpeed: j, panOnScrollMode: k, zoomOnDoubleClick: B, panOnDrag: !P && rt, defaultViewport: ut, translateExtent: X, minZoom: I, maxZoom: ot, zoomActivationKeyCode: N, preventScrolling: T, noWheelClassName: E, noPanClassName: O, onViewportChange: Z, isControlledViewport: nt, paneClickDistance: g, selectionOnDrag: ct, children: L.jsxs(pE, { onSelectionStart: b, onSelectionEnd: _, onPaneClick: i, onPaneMouseEnter: o, onPaneMouseMove: u, onPaneMouseLeave: s, onPaneContextMenu: f, onPaneScroll: d, panOnDrag: rt, autoPanOnSelection: J, isSelecting: !!tt, selectionMode: y, selectionKeyPressed: P, paneClickDistance: g, selectionOnDrag: ct, children: [n, z && L.jsx(DE, { onSelectionContextMenu: V, noPanClassName: O, disableKeyboardA11y: q })] }) });
}
qy.displayName = "FlowRenderer";
const HE = W.memo(qy), RE = (n) => (i) => n ? td(i.nodeLookup, { x: 0, y: 0, width: i.width, height: i.height }, i.transform, !0).map((o) => o.id) : Array.from(i.nodeLookup.keys());
function BE(n) {
  return Nt(W.useCallback(RE(n), [n]), Gt);
}
const UE = (n) => n.updateNodeInternals;
function kE() {
  const n = Nt(UE), [i] = W.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((o) => {
    const u = /* @__PURE__ */ new Map();
    o.forEach((s) => {
      const f = s.target.getAttribute("data-id");
      u.set(f, {
        id: f,
        nodeElement: s.target,
        force: !0
      });
    }), n(u);
  }));
  return W.useEffect(() => () => {
    i?.disconnect();
  }, [i]), i;
}
function YE({ node: n, nodeType: i, hasDimensions: o, resizeObserver: u }) {
  const s = Qt(), f = W.useRef(null), d = W.useRef(null), g = W.useRef(n.sourcePosition), p = W.useRef(n.targetPosition), h = W.useRef(i), v = o && !!n.internals.handleBounds;
  return W.useEffect(() => {
    f.current && !n.hidden && (!v || d.current !== f.current) && (d.current && u?.unobserve(d.current), u?.observe(f.current), d.current = f.current);
  }, [v, n.hidden]), W.useEffect(() => () => {
    d.current && (u?.unobserve(d.current), d.current = null);
  }, []), W.useEffect(() => {
    if (f.current) {
      const y = h.current !== i, b = g.current !== n.sourcePosition, _ = p.current !== n.targetPosition;
      (y || b || _) && (h.current = i, g.current = n.sourcePosition, p.current = n.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[n.id, { id: n.id, nodeElement: f.current, force: !0 }]])));
    }
  }, [n.id, i, n.sourcePosition, n.targetPosition]), f;
}
function jE({ id: n, onClick: i, onMouseEnter: o, onMouseMove: u, onMouseLeave: s, onContextMenu: f, onDoubleClick: d, nodesDraggable: g, elementsSelectable: p, nodesConnectable: h, nodesFocusable: v, resizeObserver: y, noDragClassName: b, noPanClassName: _, disableKeyboardA11y: w, rfId: A, nodeTypes: N, nodeClickDistance: M, onError: U }) {
  const { node: S, internals: C, isParent: j } = Nt((tt) => {
    const st = tt.nodeLookup.get(n), xt = tt.parentLookup.has(n);
    return {
      node: st,
      internals: st.internals,
      isParent: xt
    };
  }, Gt);
  let k = S.type || "default", B = N?.[k] || ap[k];
  B === void 0 && (U?.("003", cn.error003(k)), k = "default", B = N?.default || ap.default);
  const $ = !!(S.draggable || g && typeof S.draggable > "u"), J = !!(S.selectable || p && typeof S.selectable > "u"), ut = !!(S.connectable || h && typeof S.connectable > "u"), X = !!(S.focusable || v && typeof S.focusable > "u"), I = Qt(), ot = ld(S), T = YE({ node: S, nodeType: k, hasDimensions: ot, resizeObserver: y }), V = Yy({
    nodeRef: T,
    disabled: S.hidden || !$,
    noDragClassName: b,
    handleSelector: S.dragHandle,
    nodeId: n,
    isSelectable: J,
    nodeClickDistance: M
  }), E = jy();
  if (S.hidden)
    return null;
  const O = Qn(S), q = CE(S), Z = J || $ || i || o || u || s, nt = o ? (tt) => o(tt, { ...C.userNode }) : void 0, z = u ? (tt) => u(tt, { ...C.userNode }) : void 0, H = s ? (tt) => s(tt, { ...C.userNode }) : void 0, P = f ? (tt) => f(tt, { ...C.userNode }) : void 0, lt = d ? (tt) => d(tt, { ...C.userNode }) : void 0, rt = (tt) => {
    const { selectNodesOnDrag: st, nodeDragThreshold: xt } = I.getState();
    J && (!st || !$ || xt > 0) && Vf({
      id: n,
      store: I,
      nodeRef: T
    }), i && i(tt, { ...C.userNode });
  }, ft = (tt) => {
    if (!(fy(tt.nativeEvent) || w)) {
      if (Pp.includes(tt.key) && J) {
        const st = tt.key === "Escape";
        Vf({
          id: n,
          store: I,
          unselect: st,
          nodeRef: T
        });
      } else if ($ && S.selected && Object.prototype.hasOwnProperty.call(Ar, tt.key)) {
        tt.preventDefault();
        const { ariaLabelConfig: st } = I.getState();
        I.setState({
          ariaLiveMessage: st["node.a11yDescription.ariaLiveMessage"]({
            direction: tt.key.replace("Arrow", "").toLowerCase(),
            x: ~~C.positionAbsolute.x,
            y: ~~C.positionAbsolute.y
          })
        }), E({
          direction: Ar[tt.key],
          factor: tt.shiftKey ? 4 : 1
        });
      }
    }
  }, ct = () => {
    if (w || !T.current?.matches(":focus-visible"))
      return;
    const { transform: tt, width: st, height: xt, autoPanOnNodeFocus: bt, setCenter: gt } = I.getState();
    if (!bt)
      return;
    td(/* @__PURE__ */ new Map([[n, S]]), { x: 0, y: 0, width: st, height: xt }, tt, !0).length > 0 || gt(S.position.x + O.width / 2, S.position.y + O.height / 2, {
      zoom: tt[2]
    });
  };
  return L.jsx("div", { className: le([
    "react-flow__node",
    `react-flow__node-${k}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [_]: $
    },
    S.className,
    {
      selected: S.selected,
      selectable: J,
      parent: j,
      draggable: $,
      dragging: V
    }
  ]), ref: T, style: {
    zIndex: C.z,
    transform: `translate(${C.positionAbsolute.x}px,${C.positionAbsolute.y}px)`,
    pointerEvents: Z ? "all" : "none",
    visibility: ot ? "visible" : "hidden",
    ...S.style,
    ...q
  }, "data-id": n, "data-testid": `rf__node-${n}`, onMouseEnter: nt, onMouseMove: z, onMouseLeave: H, onContextMenu: P, onClick: rt, onDoubleClick: lt, onKeyDown: X ? ft : void 0, tabIndex: X ? 0 : void 0, onFocus: X ? ct : void 0, role: S.ariaRole ?? (X ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": w ? void 0 : `${Ty}-${A}`, "aria-label": S.ariaLabel, ...S.domAttributes, children: L.jsx(vE, { value: n, children: L.jsx(B, { id: n, data: S.data, type: k, positionAbsoluteX: C.positionAbsolute.x, positionAbsoluteY: C.positionAbsolute.y, selected: S.selected ?? !1, selectable: J, draggable: $, deletable: S.deletable ?? !0, isConnectable: ut, sourcePosition: S.sourcePosition, targetPosition: S.targetPosition, dragging: V, dragHandle: S.dragHandle, zIndex: C.z, parentId: S.parentId, ...O }) }) });
}
var LE = W.memo(jE);
const VE = (n) => ({
  nodesDraggable: n.nodesDraggable,
  nodesConnectable: n.nodesConnectable,
  nodesFocusable: n.nodesFocusable,
  elementsSelectable: n.elementsSelectable,
  onError: n.onError
});
function Xy(n) {
  const { nodesDraggable: i, nodesConnectable: o, nodesFocusable: u, elementsSelectable: s, onError: f } = Nt(VE, Gt), d = BE(n.onlyRenderVisibleElements), g = kE();
  return L.jsx("div", { className: "react-flow__nodes", style: Xr, children: d.map((p) => (
    /*
     * The split of responsibilities between NodeRenderer and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For example, when you’re dragging a single node, that node gets
     * updated multiple times per second. If `NodeRenderer` were to update
     * every time, it would have to re-run the `nodes.map()` loop every
     * time. This gets pricey with hundreds of nodes, especially if every
     * loop cycle does more than just rendering a JSX element!
     *
     * As a result of this choice, we took the following implementation
     * decisions:
     * - NodeRenderer subscribes *only* to node IDs – and therefore
     *   rerender *only* when visible nodes are added or removed.
     * - NodeRenderer performs all operations the result of which can be
     *   shared between nodes (such as creating the `ResizeObserver`
     *   instance, or subscribing to `selector`). This means extra prop
     *   drilling into `NodeComponentWrapper`, but it means we need to run
     *   these operations only once – instead of once per node.
     * - Any operations that you’d normally write inside `nodes.map` are
     *   moved into `NodeComponentWrapper`. This ensures they are
     *   memorized – so if `NodeRenderer` *has* to rerender, it only
     *   needs to regenerate the list of nodes, nothing else.
     */
    L.jsx(LE, { id: p, nodeTypes: n.nodeTypes, nodeExtent: n.nodeExtent, onClick: n.onNodeClick, onMouseEnter: n.onNodeMouseEnter, onMouseMove: n.onNodeMouseMove, onMouseLeave: n.onNodeMouseLeave, onContextMenu: n.onNodeContextMenu, onDoubleClick: n.onNodeDoubleClick, noDragClassName: n.noDragClassName, noPanClassName: n.noPanClassName, rfId: n.rfId, disableKeyboardA11y: n.disableKeyboardA11y, resizeObserver: g, nodesDraggable: i, nodesConnectable: o, nodesFocusable: u, elementsSelectable: s, nodeClickDistance: n.nodeClickDistance, onError: f }, p)
  )) });
}
Xy.displayName = "NodeRenderer";
const qE = W.memo(Xy);
function XE(n) {
  return Nt(W.useCallback((o) => {
    if (!n)
      return o.edges.map((s) => s.id);
    const u = [];
    if (o.width && o.height)
      for (const s of o.edges) {
        const f = o.nodeLookup.get(s.source), d = o.nodeLookup.get(s.target);
        f && d && kw({
          sourceNode: f,
          targetNode: d,
          width: o.width,
          height: o.height,
          transform: o.transform
        }) && u.push(s.id);
      }
    return u;
  }, [n]), Gt);
}
const ZE = ({ color: n = "none", strokeWidth: i = 1 }) => {
  const o = {
    strokeWidth: i,
    ...n && { stroke: n }
  };
  return L.jsx("polyline", { className: "arrow", style: o, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, GE = ({ color: n = "none", strokeWidth: i = 1 }) => {
  const o = {
    strokeWidth: i,
    ...n && { stroke: n, fill: n }
  };
  return L.jsx("polyline", { className: "arrowclosed", style: o, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, op = {
  [zr.Arrow]: ZE,
  [zr.ArrowClosed]: GE
};
function QE(n) {
  const i = Qt();
  return W.useMemo(() => Object.prototype.hasOwnProperty.call(op, n) ? op[n] : (i.getState().onError?.("009", cn.error009(n)), null), [n]);
}
const $E = ({ id: n, type: i, color: o, width: u = 12.5, height: s = 12.5, markerUnits: f = "strokeWidth", strokeWidth: d, orient: g = "auto-start-reverse" }) => {
  const p = QE(i);
  return p ? L.jsx("marker", { className: "react-flow__arrowhead", id: n, markerWidth: `${u}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: f, orient: g, refX: "0", refY: "0", children: L.jsx(p, { color: o, strokeWidth: d }) }) : null;
}, Zy = ({ defaultColor: n, rfId: i }) => {
  const o = Nt((f) => f.edges), u = Nt((f) => f.defaultEdgeOptions), s = W.useMemo(() => Gw(o, {
    id: i,
    defaultColor: n,
    defaultMarkerStart: u?.markerStart,
    defaultMarkerEnd: u?.markerEnd
  }), [o, u, i, n]);
  return s.length ? L.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: L.jsx("defs", { children: s.map((f) => L.jsx($E, { id: f.id, type: f.type, color: f.color, width: f.width, height: f.height, markerUnits: f.markerUnits, strokeWidth: f.strokeWidth, orient: f.orient }, f.id)) }) }) : null;
};
Zy.displayName = "MarkerDefinitions";
var KE = W.memo(Zy);
function Gy({ x: n, y: i, label: o, labelStyle: u, labelShowBg: s = !0, labelBgStyle: f, labelBgPadding: d = [2, 4], labelBgBorderRadius: g = 2, children: p, className: h, ...v }) {
  const [y, b] = W.useState({ x: 1, y: 0, width: 0, height: 0 }), _ = le(["react-flow__edge-textwrapper", h]), w = W.useRef(null);
  return W.useEffect(() => {
    if (w.current) {
      const A = w.current.getBBox();
      b({
        x: A.x,
        y: A.y,
        width: A.width,
        height: A.height
      });
    }
  }, [o]), o ? L.jsxs("g", { transform: `translate(${n - y.width / 2} ${i - y.height / 2})`, className: _, visibility: y.width ? "visible" : "hidden", ...v, children: [s && L.jsx("rect", { width: y.width + 2 * d[0], x: -d[0], y: -d[1], height: y.height + 2 * d[1], className: "react-flow__edge-textbg", style: f, rx: g, ry: g }), L.jsx("text", { className: "react-flow__edge-text", y: y.height / 2, dy: "0.3em", ref: w, style: u, children: o }), p] }) : null;
}
Gy.displayName = "EdgeText";
const JE = W.memo(Gy);
function Zr({ path: n, labelX: i, labelY: o, label: u, labelStyle: s, labelShowBg: f, labelBgStyle: d, labelBgPadding: g, labelBgBorderRadius: p, interactionWidth: h = 20, ...v }) {
  return L.jsxs(L.Fragment, { children: [L.jsx("path", { ...v, d: n, fill: "none", className: le(["react-flow__edge-path", v.className]) }), h ? L.jsx("path", { d: n, fill: "none", strokeOpacity: 0, strokeWidth: h, className: "react-flow__edge-interaction" }) : null, u && un(i) && un(o) ? L.jsx(JE, { x: i, y: o, label: u, labelStyle: s, labelShowBg: f, labelBgStyle: d, labelBgPadding: g, labelBgBorderRadius: p }) : null] });
}
function up({ pos: n, x1: i, y1: o, x2: u, y2: s }) {
  return n === mt.Left || n === mt.Right ? [0.5 * (i + u), o] : [i, 0.5 * (o + s)];
}
function Qy({ sourceX: n, sourceY: i, sourcePosition: o = mt.Bottom, targetX: u, targetY: s, targetPosition: f = mt.Top }) {
  const [d, g] = up({
    pos: o,
    x1: n,
    y1: i,
    x2: u,
    y2: s
  }), [p, h] = up({
    pos: f,
    x1: u,
    y1: s,
    x2: n,
    y2: i
  }), [v, y, b, _] = hy({
    sourceX: n,
    sourceY: i,
    targetX: u,
    targetY: s,
    sourceControlX: d,
    sourceControlY: g,
    targetControlX: p,
    targetControlY: h
  });
  return [
    `M${n},${i} C${d},${g} ${p},${h} ${u},${s}`,
    v,
    y,
    b,
    _
  ];
}
function $y(n) {
  return W.memo(({ id: i, sourceX: o, sourceY: u, targetX: s, targetY: f, sourcePosition: d, targetPosition: g, label: p, labelStyle: h, labelShowBg: v, labelBgStyle: y, labelBgPadding: b, labelBgBorderRadius: _, style: w, markerEnd: A, markerStart: N, interactionWidth: M }) => {
    const [U, S, C] = Qy({
      sourceX: o,
      sourceY: u,
      sourcePosition: d,
      targetX: s,
      targetY: f,
      targetPosition: g
    }), j = n.isInternal ? void 0 : i;
    return L.jsx(Zr, { id: j, path: U, labelX: S, labelY: C, label: p, labelStyle: h, labelShowBg: v, labelBgStyle: y, labelBgPadding: b, labelBgBorderRadius: _, style: w, markerEnd: A, markerStart: N, interactionWidth: M });
  });
}
const WE = $y({ isInternal: !1 }), Ky = $y({ isInternal: !0 });
WE.displayName = "SimpleBezierEdge";
Ky.displayName = "SimpleBezierEdgeInternal";
function Jy(n) {
  return W.memo(({ id: i, sourceX: o, sourceY: u, targetX: s, targetY: f, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: h, labelBgPadding: v, labelBgBorderRadius: y, style: b, sourcePosition: _ = mt.Bottom, targetPosition: w = mt.Top, markerEnd: A, markerStart: N, pathOptions: M, interactionWidth: U }) => {
    const [S, C, j] = kf({
      sourceX: o,
      sourceY: u,
      sourcePosition: _,
      targetX: s,
      targetY: f,
      targetPosition: w,
      borderRadius: M?.borderRadius,
      offset: M?.offset,
      stepPosition: M?.stepPosition
    }), k = n.isInternal ? void 0 : i;
    return L.jsx(Zr, { id: k, path: S, labelX: C, labelY: j, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: h, labelBgPadding: v, labelBgBorderRadius: y, style: b, markerEnd: A, markerStart: N, interactionWidth: U });
  });
}
const Wy = Jy({ isInternal: !1 }), Fy = Jy({ isInternal: !0 });
Wy.displayName = "SmoothStepEdge";
Fy.displayName = "SmoothStepEdgeInternal";
function Iy(n) {
  return W.memo(({ id: i, ...o }) => {
    const u = n.isInternal ? void 0 : i;
    return L.jsx(Wy, { ...o, id: u, pathOptions: W.useMemo(() => ({ borderRadius: 0, offset: o.pathOptions?.offset }), [o.pathOptions?.offset]) });
  });
}
const FE = Iy({ isInternal: !1 }), Py = Iy({ isInternal: !0 });
FE.displayName = "StepEdge";
Py.displayName = "StepEdgeInternal";
function tv(n) {
  return W.memo(({ id: i, sourceX: o, sourceY: u, targetX: s, targetY: f, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: h, labelBgPadding: v, labelBgBorderRadius: y, style: b, markerEnd: _, markerStart: w, interactionWidth: A }) => {
    const [N, M, U] = py({ sourceX: o, sourceY: u, targetX: s, targetY: f }), S = n.isInternal ? void 0 : i;
    return L.jsx(Zr, { id: S, path: N, labelX: M, labelY: U, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: h, labelBgPadding: v, labelBgBorderRadius: y, style: b, markerEnd: _, markerStart: w, interactionWidth: A });
  });
}
const IE = tv({ isInternal: !1 }), ev = tv({ isInternal: !0 });
IE.displayName = "StraightEdge";
ev.displayName = "StraightEdgeInternal";
function nv(n) {
  return W.memo(({ id: i, sourceX: o, sourceY: u, targetX: s, targetY: f, sourcePosition: d = mt.Bottom, targetPosition: g = mt.Top, label: p, labelStyle: h, labelShowBg: v, labelBgStyle: y, labelBgPadding: b, labelBgBorderRadius: _, style: w, markerEnd: A, markerStart: N, pathOptions: M, interactionWidth: U }) => {
    const [S, C, j] = gy({
      sourceX: o,
      sourceY: u,
      sourcePosition: d,
      targetX: s,
      targetY: f,
      targetPosition: g,
      curvature: M?.curvature
    }), k = n.isInternal ? void 0 : i;
    return L.jsx(Zr, { id: k, path: S, labelX: C, labelY: j, label: p, labelStyle: h, labelShowBg: v, labelBgStyle: y, labelBgPadding: b, labelBgBorderRadius: _, style: w, markerEnd: A, markerStart: N, interactionWidth: U });
  });
}
const PE = nv({ isInternal: !1 }), lv = nv({ isInternal: !0 });
PE.displayName = "BezierEdge";
lv.displayName = "BezierEdgeInternal";
const rp = {
  default: lv,
  straight: ev,
  step: Py,
  smoothstep: Fy,
  simplebezier: Ky
}, cp = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null,
  zIndex: void 0
}, t3 = (n, i, o) => o === mt.Left ? n - i : o === mt.Right ? n + i : n, e3 = (n, i, o) => o === mt.Top ? n - i : o === mt.Bottom ? n + i : n, sp = "react-flow__edgeupdater";
function fp({ position: n, centerX: i, centerY: o, radius: u = 10, onMouseDown: s, onMouseEnter: f, onMouseOut: d, type: g }) {
  return L.jsx("circle", { onMouseDown: s, onMouseEnter: f, onMouseOut: d, className: le([sp, `${sp}-${g}`]), cx: t3(i, u, n), cy: e3(o, u, n), r: u, stroke: "transparent", fill: "transparent" });
}
function n3({ isReconnectable: n, reconnectRadius: i, edge: o, sourceX: u, sourceY: s, targetX: f, targetY: d, sourcePosition: g, targetPosition: p, onReconnect: h, onReconnectStart: v, onReconnectEnd: y, setReconnecting: b, setUpdateHover: _ }) {
  const w = Qt(), A = (C, j) => {
    if (C.button !== 0)
      return;
    const { autoPanOnConnect: k, domNode: B, connectionMode: $, connectionRadius: J, lib: ut, onConnectStart: X, cancelConnection: I, nodeLookup: ot, rfId: T, panBy: V, updateConnection: E } = w.getState(), O = j.type === "target", q = (z, H) => {
      b(!1), y?.(z, o, j.type, H);
    }, Z = (z) => h?.(o, z), nt = (z, H) => {
      b(!0), v?.(C, o, j.type), X?.(z, H);
    };
    Lf.onPointerDown(C.nativeEvent, {
      autoPanOnConnect: k,
      connectionMode: $,
      connectionRadius: J,
      domNode: B,
      handleId: j.id,
      nodeId: j.nodeId,
      nodeLookup: ot,
      isTarget: O,
      edgeUpdaterType: j.type,
      lib: ut,
      flowId: T,
      cancelConnection: I,
      panBy: V,
      isValidConnection: (...z) => w.getState().isValidConnection?.(...z) ?? !0,
      onConnect: Z,
      onConnectStart: nt,
      onConnectEnd: (...z) => w.getState().onConnectEnd?.(...z),
      onReconnectEnd: q,
      updateConnection: E,
      getTransform: () => w.getState().transform,
      getFromHandle: () => w.getState().connection.fromHandle,
      dragThreshold: w.getState().connectionDragThreshold,
      handleDomNode: C.currentTarget
    });
  }, N = (C) => A(C, { nodeId: o.target, id: o.targetHandle ?? null, type: "target" }), M = (C) => A(C, { nodeId: o.source, id: o.sourceHandle ?? null, type: "source" }), U = () => _(!0), S = () => _(!1);
  return L.jsxs(L.Fragment, { children: [(n === !0 || n === "source") && L.jsx(fp, { position: g, centerX: u, centerY: s, radius: i, onMouseDown: N, onMouseEnter: U, onMouseOut: S, type: "source" }), (n === !0 || n === "target") && L.jsx(fp, { position: p, centerX: f, centerY: d, radius: i, onMouseDown: M, onMouseEnter: U, onMouseOut: S, type: "target" })] });
}
function l3({ id: n, edgesFocusable: i, edgesReconnectable: o, elementsSelectable: u, onClick: s, onDoubleClick: f, onContextMenu: d, onMouseEnter: g, onMouseMove: p, onMouseLeave: h, reconnectRadius: v, onReconnect: y, onReconnectStart: b, onReconnectEnd: _, rfId: w, edgeTypes: A, noPanClassName: N, onError: M, disableKeyboardA11y: U }) {
  let S = Nt((gt) => gt.edgeLookup.get(n));
  const C = Nt((gt) => gt.defaultEdgeOptions);
  S = C ? { ...C, ...S } : S;
  let j = S.type || "default", k = A?.[j] || rp[j];
  k === void 0 && (M?.("011", cn.error011(j)), j = "default", k = A?.default || rp.default);
  const B = !!(S.focusable || i && typeof S.focusable > "u"), $ = typeof y < "u" && (S.reconnectable || o && typeof S.reconnectable > "u"), J = !!(S.selectable || u && typeof S.selectable > "u"), ut = W.useRef(null), [X, I] = W.useState(!1), [ot, T] = W.useState(!1), V = Qt(), { zIndex: E = S.zIndex, sourceX: O, sourceY: q, targetX: Z, targetY: nt, sourcePosition: z, targetPosition: H } = Nt(W.useCallback((gt) => {
    const yt = gt.nodeLookup.get(S.source), St = gt.nodeLookup.get(S.target);
    if (!yt || !St)
      return cp;
    const Dt = Zw({
      id: n,
      sourceNode: yt,
      targetNode: St,
      sourceHandle: S.sourceHandle || null,
      targetHandle: S.targetHandle || null,
      connectionMode: gt.connectionMode,
      onError: M
    }), Vt = Uw({
      selected: S.selected,
      zIndex: S.zIndex,
      sourceNode: yt,
      targetNode: St,
      elevateOnSelect: gt.elevateEdgesOnSelect,
      zIndexMode: gt.zIndexMode
    });
    return {
      ...Dt || cp,
      zIndex: Vt
    };
  }, [S.source, S.target, S.sourceHandle, S.targetHandle, S.selected, S.zIndex]), Gt), P = W.useMemo(() => S.markerStart ? `url('#${Yf(S.markerStart, w)}')` : void 0, [S.markerStart, w]), lt = W.useMemo(() => S.markerEnd ? `url('#${Yf(S.markerEnd, w)}')` : void 0, [S.markerEnd, w]);
  if (S.hidden || O === null || q === null || Z === null || nt === null)
    return null;
  const rt = (gt) => {
    const { addSelectedEdges: yt, unselectNodesAndEdges: St, multiSelectionActive: Dt } = V.getState();
    J && (V.setState({ nodesSelectionActive: !1 }), S.selected && Dt ? (St({ nodes: [], edges: [S] }), ut.current?.blur()) : yt([n])), s && s(gt, S);
  }, ft = f ? (gt) => {
    f(gt, { ...S });
  } : void 0, ct = d ? (gt) => {
    d(gt, { ...S });
  } : void 0, tt = g ? (gt) => {
    g(gt, { ...S });
  } : void 0, st = p ? (gt) => {
    p(gt, { ...S });
  } : void 0, xt = h ? (gt) => {
    h(gt, { ...S });
  } : void 0, bt = (gt) => {
    if (!U && Pp.includes(gt.key) && J) {
      const { unselectNodesAndEdges: yt, addSelectedEdges: St } = V.getState();
      gt.key === "Escape" ? (ut.current?.blur(), yt({ edges: [S] })) : St([n]);
    }
  };
  return L.jsx("svg", { style: { zIndex: E }, children: L.jsxs("g", { className: le([
    "react-flow__edge",
    `react-flow__edge-${j}`,
    S.className,
    N,
    {
      selected: S.selected,
      animated: S.animated,
      inactive: !J && !s,
      updating: X,
      selectable: J
    }
  ]), onClick: rt, onDoubleClick: ft, onContextMenu: ct, onMouseEnter: tt, onMouseMove: st, onMouseLeave: xt, onKeyDown: B ? bt : void 0, tabIndex: B ? 0 : void 0, role: S.ariaRole ?? (B ? "group" : "img"), "aria-roledescription": "edge", "data-id": n, "data-testid": `rf__edge-${n}`, "aria-label": S.ariaLabel === null ? void 0 : S.ariaLabel || `Edge from ${S.source} to ${S.target}`, "aria-describedby": B ? `${Dy}-${w}` : void 0, ref: ut, ...S.domAttributes, children: [!ot && L.jsx(k, { id: n, source: S.source, target: S.target, type: S.type, selected: S.selected, animated: S.animated, selectable: J, deletable: S.deletable ?? !0, label: S.label, labelStyle: S.labelStyle, labelShowBg: S.labelShowBg, labelBgStyle: S.labelBgStyle, labelBgPadding: S.labelBgPadding, labelBgBorderRadius: S.labelBgBorderRadius, sourceX: O, sourceY: q, targetX: Z, targetY: nt, sourcePosition: z, targetPosition: H, data: S.data, style: S.style, sourceHandleId: S.sourceHandle, targetHandleId: S.targetHandle, markerStart: P, markerEnd: lt, pathOptions: "pathOptions" in S ? S.pathOptions : void 0, interactionWidth: S.interactionWidth }), $ && L.jsx(n3, { edge: S, isReconnectable: $, reconnectRadius: v, onReconnect: y, onReconnectStart: b, onReconnectEnd: _, sourceX: O, sourceY: q, targetX: Z, targetY: nt, sourcePosition: z, targetPosition: H, setUpdateHover: I, setReconnecting: T })] }) });
}
var a3 = W.memo(l3);
const i3 = (n) => ({
  edgesFocusable: n.edgesFocusable,
  edgesReconnectable: n.edgesReconnectable,
  elementsSelectable: n.elementsSelectable,
  connectionMode: n.connectionMode,
  onError: n.onError
});
function av({ defaultMarkerColor: n, onlyRenderVisibleElements: i, rfId: o, edgeTypes: u, noPanClassName: s, onReconnect: f, onEdgeContextMenu: d, onEdgeMouseEnter: g, onEdgeMouseMove: p, onEdgeMouseLeave: h, onEdgeClick: v, reconnectRadius: y, onEdgeDoubleClick: b, onReconnectStart: _, onReconnectEnd: w, disableKeyboardA11y: A }) {
  const { edgesFocusable: N, edgesReconnectable: M, elementsSelectable: U, onError: S } = Nt(i3, Gt), C = XE(i);
  return L.jsxs("div", { className: "react-flow__edges", children: [L.jsx(KE, { defaultColor: n, rfId: o }), C.map((j) => L.jsx(a3, { id: j, edgesFocusable: N, edgesReconnectable: M, elementsSelectable: U, noPanClassName: s, onReconnect: f, onContextMenu: d, onMouseEnter: g, onMouseMove: p, onMouseLeave: h, onClick: v, reconnectRadius: y, onDoubleClick: b, onReconnectStart: _, onReconnectEnd: w, rfId: o, onError: S, edgeTypes: u, disableKeyboardA11y: A }, j))] });
}
av.displayName = "EdgeRenderer";
const o3 = W.memo(av), u3 = (n) => `translate(${n.transform[0]}px,${n.transform[1]}px) scale(${n.transform[2]})`;
function r3({ children: n }) {
  const i = Nt(u3);
  return L.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: i }, children: n });
}
function c3(n) {
  const i = qr(), o = W.useRef(!1);
  W.useEffect(() => {
    !o.current && i.viewportInitialized && n && (setTimeout(() => n(i), 1), o.current = !0);
  }, [n, i.viewportInitialized]);
}
const s3 = (n) => n.panZoom?.syncViewport;
function f3(n) {
  const i = Nt(s3), o = Qt();
  return W.useEffect(() => {
    n && (i?.(n), o.setState({ transform: [n.x, n.y, n.zoom] }));
  }, [n, i]), null;
}
function d3(n) {
  return n.connection.inProgress ? { ...n.connection, to: Oo(n.connection.to, n.transform) } : { ...n.connection };
}
function h3(n) {
  return d3;
}
function g3(n) {
  const i = h3();
  return Nt(i, Gt);
}
const m3 = (n) => ({
  nodesConnectable: n.nodesConnectable,
  isValid: n.connection.isValid,
  inProgress: n.connection.inProgress,
  width: n.width,
  height: n.height
});
function p3({ containerStyle: n, style: i, type: o, component: u }) {
  const { nodesConnectable: s, width: f, height: d, isValid: g, inProgress: p } = Nt(m3, Gt);
  return !(f && s && p) ? null : L.jsx("svg", { style: n, width: f, height: d, className: "react-flow__connectionline react-flow__container", children: L.jsx("g", { className: le(["react-flow__connection", ny(g)]), children: L.jsx(iv, { style: i, type: o, CustomComponent: u, isValid: g }) }) });
}
const iv = ({ style: n, type: i = El.Bezier, CustomComponent: o, isValid: u }) => {
  const { inProgress: s, from: f, fromNode: d, fromHandle: g, fromPosition: p, to: h, toNode: v, toHandle: y, toPosition: b, pointer: _ } = g3();
  if (!s)
    return;
  if (o)
    return L.jsx(o, { connectionLineType: i, connectionLineStyle: n, fromNode: d, fromHandle: g, fromX: f.x, fromY: f.y, toX: h.x, toY: h.y, fromPosition: p, toPosition: b, connectionStatus: ny(u), toNode: v, toHandle: y, pointer: _ });
  let w = "";
  const A = {
    sourceX: f.x,
    sourceY: f.y,
    sourcePosition: p,
    targetX: h.x,
    targetY: h.y,
    targetPosition: b
  };
  switch (i) {
    case El.Bezier:
      [w] = gy(A);
      break;
    case El.SimpleBezier:
      [w] = Qy(A);
      break;
    case El.Step:
      [w] = kf({
        ...A,
        borderRadius: 0
      });
      break;
    case El.SmoothStep:
      [w] = kf(A);
      break;
    default:
      [w] = py(A);
  }
  return L.jsx("path", { d: w, fill: "none", className: "react-flow__connection-path", style: n });
};
iv.displayName = "ConnectionLine";
const y3 = {};
function dp(n = y3) {
  W.useRef(n), Qt(), W.useEffect(() => {
  }, [n]);
}
function v3() {
  Qt(), W.useRef(!1), W.useEffect(() => {
  }, []);
}
function ov({ nodeTypes: n, edgeTypes: i, onInit: o, onNodeClick: u, onEdgeClick: s, onNodeDoubleClick: f, onEdgeDoubleClick: d, onNodeMouseEnter: g, onNodeMouseMove: p, onNodeMouseLeave: h, onNodeContextMenu: v, onSelectionContextMenu: y, onSelectionStart: b, onSelectionEnd: _, connectionLineType: w, connectionLineStyle: A, connectionLineComponent: N, connectionLineContainerStyle: M, selectionKeyCode: U, selectionOnDrag: S, selectionMode: C, multiSelectionKeyCode: j, panActivationKeyCode: k, zoomActivationKeyCode: B, deleteKeyCode: $, onlyRenderVisibleElements: J, elementsSelectable: ut, defaultViewport: X, translateExtent: I, minZoom: ot, maxZoom: T, preventScrolling: V, defaultMarkerColor: E, zoomOnScroll: O, zoomOnPinch: q, panOnScroll: Z, panOnScrollSpeed: nt, panOnScrollMode: z, zoomOnDoubleClick: H, panOnDrag: P, autoPanOnSelection: lt, onPaneClick: rt, onPaneMouseEnter: ft, onPaneMouseMove: ct, onPaneMouseLeave: tt, onPaneScroll: st, onPaneContextMenu: xt, paneClickDistance: bt, nodeClickDistance: gt, onEdgeContextMenu: yt, onEdgeMouseEnter: St, onEdgeMouseMove: Dt, onEdgeMouseLeave: Vt, reconnectRadius: fe, onReconnect: Le, onReconnectStart: ye, onReconnectEnd: ve, noDragClassName: Ae, noWheelClassName: zl, noPanClassName: _n, disableKeyboardA11y: Jt, nodeExtent: Ce, rfId: Ve, viewport: qe, onViewportChange: Xe }) {
  return dp(n), dp(i), v3(), c3(o), f3(qe), L.jsx(HE, { onPaneClick: rt, onPaneMouseEnter: ft, onPaneMouseMove: ct, onPaneMouseLeave: tt, onPaneContextMenu: xt, onPaneScroll: st, paneClickDistance: bt, deleteKeyCode: $, selectionKeyCode: U, selectionOnDrag: S, selectionMode: C, onSelectionStart: b, onSelectionEnd: _, multiSelectionKeyCode: j, panActivationKeyCode: k, zoomActivationKeyCode: B, elementsSelectable: ut, zoomOnScroll: O, zoomOnPinch: q, zoomOnDoubleClick: H, panOnScroll: Z, panOnScrollSpeed: nt, panOnScrollMode: z, panOnDrag: P, autoPanOnSelection: lt, defaultViewport: X, translateExtent: I, minZoom: ot, maxZoom: T, onSelectionContextMenu: y, preventScrolling: V, noDragClassName: Ae, noWheelClassName: zl, noPanClassName: _n, disableKeyboardA11y: Jt, onViewportChange: Xe, isControlledViewport: !!qe, children: L.jsxs(r3, { children: [L.jsx(o3, { edgeTypes: i, onEdgeClick: s, onEdgeDoubleClick: d, onReconnect: Le, onReconnectStart: ye, onReconnectEnd: ve, onlyRenderVisibleElements: J, onEdgeContextMenu: yt, onEdgeMouseEnter: St, onEdgeMouseMove: Dt, onEdgeMouseLeave: Vt, reconnectRadius: fe, defaultMarkerColor: E, noPanClassName: _n, disableKeyboardA11y: Jt, rfId: Ve }), L.jsx(p3, { style: A, type: w, component: N, containerStyle: M }), L.jsx("div", { className: "react-flow__edgelabel-renderer" }), L.jsx(qE, { nodeTypes: n, onNodeClick: u, onNodeDoubleClick: f, onNodeMouseEnter: g, onNodeMouseMove: p, onNodeMouseLeave: h, onNodeContextMenu: v, nodeClickDistance: gt, onlyRenderVisibleElements: J, noPanClassName: _n, noDragClassName: Ae, disableKeyboardA11y: Jt, nodeExtent: Ce, rfId: Ve }), L.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
ov.displayName = "GraphView";
const b3 = W.memo(ov), x3 = ry(), hp = ({ nodes: n, edges: i, defaultNodes: o, defaultEdges: u, width: s, height: f, fitView: d, fitViewOptions: g, minZoom: p = 0.5, maxZoom: h = 2, nodeOrigin: v, nodeExtent: y, zIndexMode: b = "basic" } = {}) => {
  const _ = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), M = u ?? i ?? [], U = o ?? n ?? [], S = v ?? [0, 0], C = y ?? xo;
  by(A, N, M);
  const { nodesInitialized: j } = jf(U, _, w, {
    nodeOrigin: S,
    nodeExtent: C,
    zIndexMode: b
  });
  let k = [0, 0, 1];
  if (d && s && f) {
    const B = To(_, {
      filter: (X) => !!((X.width || X.initialWidth) && (X.height || X.initialHeight))
    }), { x: $, y: J, zoom: ut } = nd(B, s, f, p, h, g?.padding ?? 0.1);
    k = [$, J, ut];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: f ?? 0,
    transform: k,
    nodes: U,
    nodesInitialized: j,
    nodeLookup: _,
    parentLookup: w,
    edges: M,
    edgeLookup: N,
    connectionLookup: A,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: o !== void 0,
    hasDefaultEdges: u !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: h,
    translateExtent: xo,
    nodeExtent: C,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: li.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: S,
    nodeDragThreshold: 1,
    connectionDragThreshold: 1,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodesDraggable: !0,
    nodesConnectable: !0,
    nodesFocusable: !0,
    edgesFocusable: !0,
    edgesReconnectable: !0,
    elementsSelectable: !0,
    elevateNodesOnSelect: !0,
    elevateEdgesOnSelect: !0,
    selectNodesOnDrag: !0,
    multiSelectionActive: !1,
    fitViewQueued: d ?? !1,
    fitViewOptions: g,
    fitViewResolver: null,
    connection: { ...ey },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: x3,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: ty,
    zIndexMode: b,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, _3 = ({ nodes: n, edges: i, defaultNodes: o, defaultEdges: u, width: s, height: f, fitView: d, fitViewOptions: g, minZoom: p, maxZoom: h, nodeOrigin: v, nodeExtent: y, zIndexMode: b }) => H2((_, w) => {
  async function A() {
    const { nodeLookup: N, panZoom: M, fitViewOptions: U, fitViewResolver: S, width: C, height: j, minZoom: k, maxZoom: B } = w();
    M && (await Cw({
      nodes: N,
      width: C,
      height: j,
      panZoom: M,
      minZoom: k,
      maxZoom: B
    }, U), S?.resolve(!0), _({ fitViewResolver: null }));
  }
  return {
    ...hp({
      nodes: n,
      edges: i,
      width: s,
      height: f,
      fitView: d,
      fitViewOptions: g,
      minZoom: p,
      maxZoom: h,
      nodeOrigin: v,
      nodeExtent: y,
      defaultNodes: o,
      defaultEdges: u,
      zIndexMode: b
    }),
    setNodes: (N) => {
      const { nodeLookup: M, parentLookup: U, nodeOrigin: S, elevateNodesOnSelect: C, fitViewQueued: j, zIndexMode: k, nodesSelectionActive: B } = w(), { nodesInitialized: $, hasSelectedNodes: J } = jf(N, M, U, {
        nodeOrigin: S,
        nodeExtent: y,
        elevateNodesOnSelect: C,
        checkEquality: !0,
        zIndexMode: k
      }), ut = B && J;
      j && $ ? (A(), _({
        nodes: N,
        nodesInitialized: $,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: ut
      })) : _({ nodes: N, nodesInitialized: $, nodesSelectionActive: ut });
    },
    setEdges: (N) => {
      const { connectionLookup: M, edgeLookup: U } = w();
      by(M, U, N), _({ edges: N });
    },
    setDefaultNodesAndEdges: (N, M) => {
      if (N) {
        const { setNodes: U } = w();
        U(N), _({ hasDefaultNodes: !0 });
      }
      if (M) {
        const { setEdges: U } = w();
        U(M), _({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (N) => {
      const { triggerNodeChanges: M, nodeLookup: U, parentLookup: S, domNode: C, nodeOrigin: j, nodeExtent: k, debug: B, fitViewQueued: $, zIndexMode: J } = w(), { changes: ut, updatedInternals: X } = Iw(N, U, S, C, j, k, J);
      X && (Kw(U, S, { nodeOrigin: j, nodeExtent: k, zIndexMode: J }), $ ? (A(), _({ fitViewQueued: !1, fitViewOptions: void 0 })) : _({}), ut?.length > 0 && (B && console.log("React Flow: trigger node changes", ut), M?.(ut)));
    },
    updateNodePositions: (N, M = !1) => {
      const U = [];
      let S = [];
      const { nodeLookup: C, triggerNodeChanges: j, connection: k, updateConnection: B, onNodesChangeMiddlewareMap: $ } = w();
      for (const [J, ut] of N) {
        const X = C.get(J), I = !!(X?.expandParent && X?.parentId && ut?.position), ot = {
          id: J,
          type: "position",
          position: I ? {
            x: Math.max(0, ut.position.x),
            y: Math.max(0, ut.position.y)
          } : ut.position,
          dragging: M
        };
        if (X && k.inProgress && k.fromNode.id === X.id) {
          const T = la(X, k.fromHandle, mt.Left, !0);
          B({ ...k, from: T });
        }
        I && X.parentId && U.push({
          id: J,
          parentId: X.parentId,
          rect: {
            ...ut.internals.positionAbsolute,
            width: ut.measured.width ?? 0,
            height: ut.measured.height ?? 0
          }
        }), S.push(ot);
      }
      if (U.length > 0) {
        const { parentLookup: J, nodeOrigin: ut } = w(), X = cd(U, C, J, ut);
        S.push(...X);
      }
      for (const J of $.values())
        S = J(S);
      j(S);
    },
    triggerNodeChanges: (N) => {
      const { onNodesChange: M, setNodes: U, nodes: S, hasDefaultNodes: C, debug: j } = w();
      if (N?.length) {
        if (C) {
          const k = Ry(N, S);
          U(k);
        }
        j && console.log("React Flow: trigger node changes", N), M?.(N);
      }
    },
    triggerEdgeChanges: (N) => {
      const { onEdgesChange: M, setEdges: U, edges: S, hasDefaultEdges: C, debug: j } = w();
      if (N?.length) {
        if (C) {
          const k = By(N, S);
          U(k);
        }
        j && console.log("React Flow: trigger edge changes", N), M?.(N);
      }
    },
    addSelectedNodes: (N) => {
      const { multiSelectionActive: M, edgeLookup: U, nodeLookup: S, triggerNodeChanges: C, triggerEdgeChanges: j } = w();
      if (M) {
        const k = N.map((B) => $l(B, !0));
        C(k);
        return;
      }
      C(Ia(S, /* @__PURE__ */ new Set([...N]), !0)), j(Ia(U));
    },
    addSelectedEdges: (N) => {
      const { multiSelectionActive: M, edgeLookup: U, nodeLookup: S, triggerNodeChanges: C, triggerEdgeChanges: j } = w();
      if (M) {
        const k = N.map((B) => $l(B, !0));
        j(k);
        return;
      }
      j(Ia(U, /* @__PURE__ */ new Set([...N]))), C(Ia(S, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: N, edges: M } = {}) => {
      const { edges: U, nodes: S, nodeLookup: C, triggerNodeChanges: j, triggerEdgeChanges: k } = w(), B = N || S, $ = M || U, J = [];
      for (const X of B) {
        if (!X.selected)
          continue;
        const I = C.get(X.id);
        I && (I.selected = !1), J.push($l(X.id, !1));
      }
      const ut = [];
      for (const X of $)
        X.selected && ut.push($l(X.id, !1));
      j(J), k(ut);
    },
    setMinZoom: (N) => {
      const { panZoom: M, maxZoom: U } = w();
      M?.setScaleExtent([N, U]), _({ minZoom: N });
    },
    setMaxZoom: (N) => {
      const { panZoom: M, minZoom: U } = w();
      M?.setScaleExtent([U, N]), _({ maxZoom: N });
    },
    setTranslateExtent: (N) => {
      w().panZoom?.setTranslateExtent(N), _({ translateExtent: N });
    },
    resetSelectedElements: () => {
      const { edges: N, nodes: M, triggerNodeChanges: U, triggerEdgeChanges: S, elementsSelectable: C } = w();
      if (!C)
        return;
      const j = M.reduce((B, $) => $.selected ? [...B, $l($.id, !1)] : B, []), k = N.reduce((B, $) => $.selected ? [...B, $l($.id, !1)] : B, []);
      U(j), S(k);
    },
    setNodeExtent: (N) => {
      const { nodes: M, nodeLookup: U, parentLookup: S, nodeOrigin: C, elevateNodesOnSelect: j, nodeExtent: k, zIndexMode: B } = w();
      N[0][0] === k[0][0] && N[0][1] === k[0][1] && N[1][0] === k[1][0] && N[1][1] === k[1][1] || (jf(M, U, S, {
        nodeOrigin: C,
        nodeExtent: N,
        elevateNodesOnSelect: j,
        checkEquality: !1,
        zIndexMode: B
      }), _({ nodeExtent: N }));
    },
    panBy: (N) => {
      const { transform: M, width: U, height: S, panZoom: C, translateExtent: j } = w();
      return Pw({ delta: N, panZoom: C, transform: M, translateExtent: j, width: U, height: S });
    },
    setCenter: async (N, M, U) => {
      const { width: S, height: C, maxZoom: j, panZoom: k } = w();
      if (!k)
        return !1;
      const B = typeof U?.zoom < "u" ? U.zoom : j;
      return await k.setViewport({
        x: S / 2 - N * B,
        y: C / 2 - M * B,
        zoom: B
      }, { duration: U?.duration, ease: U?.ease, interpolate: U?.interpolate }), !0;
    },
    cancelConnection: () => {
      _({
        connection: { ...ey }
      });
    },
    updateConnection: (N) => {
      _({ connection: N });
    },
    reset: () => _({ ...hp() })
  };
}, Object.is);
function uv({ initialNodes: n, initialEdges: i, defaultNodes: o, defaultEdges: u, initialWidth: s, initialHeight: f, initialMinZoom: d, initialMaxZoom: g, initialFitViewOptions: p, fitView: h, nodeOrigin: v, nodeExtent: y, zIndexMode: b, children: _ }) {
  const [w] = W.useState(() => _3({
    nodes: n,
    edges: i,
    defaultNodes: o,
    defaultEdges: u,
    width: s,
    height: f,
    fitView: h,
    minZoom: d,
    maxZoom: g,
    fitViewOptions: p,
    nodeOrigin: v,
    nodeExtent: y,
    zIndexMode: b
  }));
  return L.jsx(R2, { value: w, children: L.jsx(iE, { children: L.jsx(xE, { children: _ }) }) });
}
function S3({ children: n, nodes: i, edges: o, defaultNodes: u, defaultEdges: s, width: f, height: d, fitView: g, fitViewOptions: p, minZoom: h, maxZoom: v, nodeOrigin: y, nodeExtent: b, zIndexMode: _ }) {
  return W.useContext(Lr) ? L.jsx(L.Fragment, { children: n }) : L.jsx(uv, { initialNodes: i, initialEdges: o, defaultNodes: u, defaultEdges: s, initialWidth: f, initialHeight: d, fitView: g, initialFitViewOptions: p, initialMinZoom: h, initialMaxZoom: v, nodeOrigin: y, nodeExtent: b, zIndexMode: _, children: n });
}
const w3 = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function E3({ nodes: n, edges: i, defaultNodes: o, defaultEdges: u, className: s, nodeTypes: f, edgeTypes: d, onNodeClick: g, onEdgeClick: p, onInit: h, onMove: v, onMoveStart: y, onMoveEnd: b, onConnect: _, onConnectStart: w, onConnectEnd: A, onClickConnectStart: N, onClickConnectEnd: M, onNodeMouseEnter: U, onNodeMouseMove: S, onNodeMouseLeave: C, onNodeContextMenu: j, onNodeDoubleClick: k, onNodeDragStart: B, onNodeDrag: $, onNodeDragStop: J, onNodesDelete: ut, onEdgesDelete: X, onDelete: I, onSelectionChange: ot, onSelectionDragStart: T, onSelectionDrag: V, onSelectionDragStop: E, onSelectionContextMenu: O, onSelectionStart: q, onSelectionEnd: Z, onBeforeDelete: nt, connectionMode: z, connectionLineType: H = El.Bezier, connectionLineStyle: P, connectionLineComponent: lt, connectionLineContainerStyle: rt, deleteKeyCode: ft = "Backspace", selectionKeyCode: ct = "Shift", selectionOnDrag: tt = !1, selectionMode: st = _o.Full, panActivationKeyCode: xt = "Space", multiSelectionKeyCode: bt = wo() ? "Meta" : "Control", zoomActivationKeyCode: gt = wo() ? "Meta" : "Control", snapToGrid: yt, snapGrid: St, onlyRenderVisibleElements: Dt = !1, selectNodesOnDrag: Vt, nodesDraggable: fe, autoPanOnNodeFocus: Le, nodesConnectable: ye, nodesFocusable: ve, nodeOrigin: Ae = Oy, edgesFocusable: zl, edgesReconnectable: _n, elementsSelectable: Jt = !0, defaultViewport: Ce = $2, minZoom: Ve = 0.5, maxZoom: qe = 2, translateExtent: Xe = xo, preventScrolling: Qr = !0, nodeExtent: ua, defaultMarkerColor: $r = "#b1b1b7", zoomOnScroll: Kr = !0, zoomOnPinch: Ml = !0, panOnScroll: ge = !1, panOnScrollSpeed: fn = 0.5, panOnScrollMode: me = Fl.Free, zoomOnDoubleClick: Jr = !0, panOnDrag: Wr = !0, onPaneClick: Fr, onPaneMouseEnter: ra, onPaneMouseMove: ca, onPaneMouseLeave: sa, onPaneScroll: Sn, onPaneContextMenu: fa, paneClickDistance: Nl = 1, nodeClickDistance: Ir = 0, children: Ro, onReconnect: ri, onReconnectStart: Al, onReconnectEnd: Pr, onEdgeContextMenu: Bo, onEdgeDoubleClick: Uo, onEdgeMouseEnter: ko, onEdgeMouseMove: ci, onEdgeMouseLeave: si, reconnectRadius: Yo = 10, onNodesChange: jo, onEdgesChange: dn, noDragClassName: ae = "nodrag", noWheelClassName: de = "nowheel", noPanClassName: wn = "nopan", fitView: da, fitViewOptions: Lo, connectOnClick: tc, attributionPosition: Vo, proOptions: Cl, defaultEdgeOptions: fi, elevateNodesOnSelect: $n = !0, elevateEdgesOnSelect: Kn = !1, disableKeyboardA11y: Jn = !1, autoPanOnConnect: Wn, autoPanOnNodeDrag: It, autoPanOnSelection: qo = !0, autoPanSpeed: Xo, connectionRadius: En, isValidConnection: Fn, onError: ec, style: Zo, id: di, nodeDragThreshold: nc, connectionDragThreshold: ha, viewport: ga, onViewportChange: Ie, width: be, height: Go, colorMode: lc = "light", debug: hi, onScroll: gi, ariaLabelConfig: ma, zIndexMode: Qo = "basic", ...xe }, mi) {
  const pa = di || "1", pi = F2(lc), In = W.useCallback((yi) => {
    yi.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), gi?.(yi);
  }, [gi]);
  return L.jsx("div", { "data-testid": "rf__wrapper", ...xe, onScroll: In, style: { ...Zo, ...w3 }, ref: mi, className: le(["react-flow", s, pi]), id: di, role: "application", children: L.jsxs(S3, { nodes: n, edges: i, width: be, height: Go, fitView: da, fitViewOptions: Lo, minZoom: Ve, maxZoom: qe, nodeOrigin: Ae, nodeExtent: ua, zIndexMode: Qo, children: [L.jsx(W2, { nodes: n, edges: i, defaultNodes: o, defaultEdges: u, onConnect: _, onConnectStart: w, onConnectEnd: A, onClickConnectStart: N, onClickConnectEnd: M, nodesDraggable: fe, autoPanOnNodeFocus: Le, nodesConnectable: ye, nodesFocusable: ve, edgesFocusable: zl, edgesReconnectable: _n, elementsSelectable: Jt, elevateNodesOnSelect: $n, elevateEdgesOnSelect: Kn, minZoom: Ve, maxZoom: qe, nodeExtent: ua, onNodesChange: jo, onEdgesChange: dn, snapToGrid: yt, snapGrid: St, connectionMode: z, translateExtent: Xe, connectOnClick: tc, defaultEdgeOptions: fi, fitView: da, fitViewOptions: Lo, onNodesDelete: ut, onEdgesDelete: X, onDelete: I, onNodeDragStart: B, onNodeDrag: $, onNodeDragStop: J, onSelectionDrag: V, onSelectionDragStart: T, onSelectionDragStop: E, onMove: v, onMoveStart: y, onMoveEnd: b, noPanClassName: wn, nodeOrigin: Ae, rfId: pa, autoPanOnConnect: Wn, autoPanOnNodeDrag: It, autoPanSpeed: Xo, onError: ec, connectionRadius: En, isValidConnection: Fn, selectNodesOnDrag: Vt, nodeDragThreshold: nc, connectionDragThreshold: ha, onBeforeDelete: nt, debug: hi, ariaLabelConfig: ma, zIndexMode: Qo }), L.jsx(b3, { onInit: h, onNodeClick: g, onEdgeClick: p, onNodeMouseEnter: U, onNodeMouseMove: S, onNodeMouseLeave: C, onNodeContextMenu: j, onNodeDoubleClick: k, nodeTypes: f, edgeTypes: d, connectionLineType: H, connectionLineStyle: P, connectionLineComponent: lt, connectionLineContainerStyle: rt, selectionKeyCode: ct, selectionOnDrag: tt, selectionMode: st, deleteKeyCode: ft, multiSelectionKeyCode: bt, panActivationKeyCode: xt, zoomActivationKeyCode: gt, onlyRenderVisibleElements: Dt, defaultViewport: Ce, translateExtent: Xe, minZoom: Ve, maxZoom: qe, preventScrolling: Qr, zoomOnScroll: Kr, zoomOnPinch: Ml, zoomOnDoubleClick: Jr, panOnScroll: ge, panOnScrollSpeed: fn, panOnScrollMode: me, panOnDrag: Wr, autoPanOnSelection: qo, onPaneClick: Fr, onPaneMouseEnter: ra, onPaneMouseMove: ca, onPaneMouseLeave: sa, onPaneScroll: Sn, onPaneContextMenu: fa, paneClickDistance: Nl, nodeClickDistance: Ir, onSelectionContextMenu: O, onSelectionStart: q, onSelectionEnd: Z, onReconnect: ri, onReconnectStart: Al, onReconnectEnd: Pr, onEdgeContextMenu: Bo, onEdgeDoubleClick: Uo, onEdgeMouseEnter: ko, onEdgeMouseMove: ci, onEdgeMouseLeave: si, reconnectRadius: Yo, defaultMarkerColor: $r, noDragClassName: ae, noWheelClassName: de, noPanClassName: wn, rfId: pa, disableKeyboardA11y: Jn, nodeExtent: ua, viewport: ga, onViewportChange: Ie }), L.jsx(Q2, { onSelectionChange: ot }), Ro, L.jsx(V2, { proOptions: Cl, position: Vo }), L.jsx(L2, { rfId: pa, disableKeyboardA11y: Jn })] }) });
}
var z3 = Uy(E3);
function M3(n) {
  const [i, o] = W.useState(n), u = W.useCallback((s) => o((f) => Ry(s, f)), []);
  return [i, o, u];
}
function N3(n) {
  const [i, o] = W.useState(n), u = W.useCallback((s) => o((f) => By(s, f)), []);
  return [i, o, u];
}
const A3 = (n) => (i) => {
  if (!n.includeHiddenNodes)
    return i.nodesInitialized;
  if (i.nodeLookup.size === 0)
    return !1;
  for (const [, { internals: o }] of i.nodeLookup)
    if (o.handleBounds === void 0 || !ld(o.userNode))
      return !1;
  return !0;
};
function C3(n = {
  includeHiddenNodes: !1
}) {
  return Nt(A3(n));
}
function T3({ dimensions: n, lineWidth: i, variant: o, className: u }) {
  return L.jsx("path", { strokeWidth: i, d: `M${n[0] / 2} 0 V${n[1]} M0 ${n[1] / 2} H${n[0]}`, className: le(["react-flow__background-pattern", o, u]) });
}
function D3({ radius: n, className: i }) {
  return L.jsx("circle", { cx: n, cy: n, r: n, className: le(["react-flow__background-pattern", "dots", i]) });
}
var Zn;
(function(n) {
  n.Lines = "lines", n.Dots = "dots", n.Cross = "cross";
})(Zn || (Zn = {}));
const O3 = {
  [Zn.Dots]: 1,
  [Zn.Lines]: 1,
  [Zn.Cross]: 6
}, H3 = (n) => ({ transform: n.transform, patternId: `pattern-${n.rfId}` });
function rv({
  id: n,
  variant: i = Zn.Dots,
  // only used for dots and cross
  gap: o = 20,
  // only used for lines and cross
  size: u,
  lineWidth: s = 1,
  offset: f = 0,
  color: d,
  bgColor: g,
  style: p,
  className: h,
  patternClassName: v
}) {
  const y = W.useRef(null), { transform: b, patternId: _ } = Nt(H3, Gt), w = u || O3[i], A = i === Zn.Dots, N = i === Zn.Cross, M = Array.isArray(o) ? o : [o, o], U = [M[0] * b[2] || 1, M[1] * b[2] || 1], S = w * b[2], C = Array.isArray(f) ? f : [f, f], j = N ? [S, S] : U, k = [
    C[0] * b[2] || 1 + j[0] / 2,
    C[1] * b[2] || 1 + j[1] / 2
  ], B = `${_}${n || ""}`;
  return L.jsxs("svg", { className: le(["react-flow__background", h]), style: {
    ...p,
    ...Xr,
    "--xy-background-color-props": g,
    "--xy-background-pattern-color-props": d
  }, ref: y, "data-testid": "rf__background", children: [L.jsx("pattern", { id: B, x: b[0] % U[0], y: b[1] % U[1], width: U[0], height: U[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${k[0]},-${k[1]})`, children: A ? L.jsx(D3, { radius: S / 2, className: v }) : L.jsx(T3, { dimensions: j, lineWidth: s, variant: i, className: v }) }), L.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${B})` })] });
}
rv.displayName = "Background";
const R3 = W.memo(rv);
function B3() {
  return L.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: L.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function U3() {
  return L.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: L.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function k3() {
  return L.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: L.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function Y3() {
  return L.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: L.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function j3() {
  return L.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: L.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function sr({ children: n, className: i, ...o }) {
  return L.jsx("button", { type: "button", className: le(["react-flow__controls-button", i]), ...o, children: n });
}
const L3 = (n) => ({
  isInteractive: n.nodesDraggable || n.nodesConnectable || n.elementsSelectable,
  minZoomReached: n.transform[2] <= n.minZoom,
  maxZoomReached: n.transform[2] >= n.maxZoom,
  ariaLabelConfig: n.ariaLabelConfig
});
function cv({ style: n, showZoom: i = !0, showFitView: o = !0, showInteractive: u = !0, fitViewOptions: s, onZoomIn: f, onZoomOut: d, onFitView: g, onInteractiveChange: p, className: h, children: v, position: y = "bottom-left", orientation: b = "vertical", "aria-label": _ }) {
  const w = Qt(), { isInteractive: A, minZoomReached: N, maxZoomReached: M, ariaLabelConfig: U } = Nt(L3, Gt), { zoomIn: S, zoomOut: C, fitView: j } = qr(), k = () => {
    S(), f?.();
  }, B = () => {
    C(), d?.();
  }, $ = () => {
    j(s), g?.();
  }, J = () => {
    w.setState({
      nodesDraggable: !A,
      nodesConnectable: !A,
      elementsSelectable: !A
    }), p?.(!A);
  }, ut = b === "horizontal" ? "horizontal" : "vertical";
  return L.jsxs(Vr, { className: le(["react-flow__controls", ut, h]), position: y, style: n, "data-testid": "rf__controls", "aria-label": _ ?? U["controls.ariaLabel"], children: [i && L.jsxs(L.Fragment, { children: [L.jsx(sr, { onClick: k, className: "react-flow__controls-zoomin", title: U["controls.zoomIn.ariaLabel"], "aria-label": U["controls.zoomIn.ariaLabel"], disabled: M, children: L.jsx(B3, {}) }), L.jsx(sr, { onClick: B, className: "react-flow__controls-zoomout", title: U["controls.zoomOut.ariaLabel"], "aria-label": U["controls.zoomOut.ariaLabel"], disabled: N, children: L.jsx(U3, {}) })] }), o && L.jsx(sr, { className: "react-flow__controls-fitview", onClick: $, title: U["controls.fitView.ariaLabel"], "aria-label": U["controls.fitView.ariaLabel"], children: L.jsx(k3, {}) }), u && L.jsx(sr, { className: "react-flow__controls-interactive", onClick: J, title: U["controls.interactive.ariaLabel"], "aria-label": U["controls.interactive.ariaLabel"], children: A ? L.jsx(j3, {}) : L.jsx(Y3, {}) }), v] });
}
cv.displayName = "Controls";
const V3 = W.memo(cv);
function q3({ id: n, x: i, y: o, width: u, height: s, style: f, color: d, strokeColor: g, strokeWidth: p, className: h, borderRadius: v, shapeRendering: y, selected: b, onClick: _ }) {
  const { background: w, backgroundColor: A } = f || {}, N = d || w || A;
  return L.jsx("rect", { className: le(["react-flow__minimap-node", { selected: b }, h]), x: i, y: o, rx: v, ry: v, width: u, height: s, style: {
    fill: N,
    stroke: g,
    strokeWidth: p
  }, shapeRendering: y, onClick: _ ? (M) => _(M, n) : void 0 });
}
const X3 = W.memo(q3), Z3 = (n) => n.nodes.map((i) => i.id), Nf = (n) => n instanceof Function ? n : () => n;
function G3({
  nodeStrokeColor: n,
  nodeColor: i,
  nodeClassName: o = "",
  nodeBorderRadius: u = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: f = X3,
  onClick: d
}) {
  const g = Nt(Z3, Gt), p = Nf(i), h = Nf(n), v = Nf(o), y = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return L.jsx(L.Fragment, { children: g.map((b) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    L.jsx($3, { id: b, nodeColorFunc: p, nodeStrokeColorFunc: h, nodeClassNameFunc: v, nodeBorderRadius: u, nodeStrokeWidth: s, NodeComponent: f, onClick: d, shapeRendering: y }, b)
  )) });
}
function Q3({ id: n, nodeColorFunc: i, nodeStrokeColorFunc: o, nodeClassNameFunc: u, nodeBorderRadius: s, nodeStrokeWidth: f, shapeRendering: d, NodeComponent: g, onClick: p }) {
  const { node: h, x: v, y, width: b, height: _ } = Nt((w) => {
    const A = w.nodeLookup.get(n);
    if (!A)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const N = A.internals.userNode, { x: M, y: U } = A.internals.positionAbsolute, { width: S, height: C } = Qn(N);
    return {
      node: N,
      x: M,
      y: U,
      width: S,
      height: C
    };
  }, Gt);
  return !h || h.hidden || !ld(h) ? null : L.jsx(g, { x: v, y, width: b, height: _, style: h.style, selected: !!h.selected, className: u(h), color: i(h), borderRadius: s, strokeColor: o(h), strokeWidth: f, shapeRendering: d, onClick: p, id: h.id });
}
const $3 = W.memo(Q3);
var K3 = W.memo(G3);
const J3 = 200, W3 = 150, F3 = (n) => !n.hidden, I3 = (n) => {
  const i = {
    x: -n.transform[0] / n.transform[2],
    y: -n.transform[1] / n.transform[2],
    width: n.width / n.transform[2],
    height: n.height / n.transform[2]
  };
  return {
    viewBB: i,
    boundingRect: n.nodeLookup.size > 0 ? oy(To(n.nodeLookup, { filter: F3 }), i) : i,
    rfId: n.rfId,
    panZoom: n.panZoom,
    translateExtent: n.translateExtent,
    flowWidth: n.width,
    flowHeight: n.height,
    ariaLabelConfig: n.ariaLabelConfig
  };
}, P3 = "react-flow__minimap-desc";
function sv({
  style: n,
  className: i,
  nodeStrokeColor: o,
  nodeColor: u,
  nodeClassName: s = "",
  nodeBorderRadius: f = 5,
  nodeStrokeWidth: d,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: g,
  bgColor: p,
  maskColor: h,
  maskStrokeColor: v,
  maskStrokeWidth: y,
  position: b = "bottom-right",
  onClick: _,
  onNodeClick: w,
  pannable: A = !1,
  zoomable: N = !1,
  ariaLabel: M,
  inversePan: U,
  zoomStep: S = 1,
  offsetScale: C = 5
}) {
  const j = Qt(), k = W.useRef(null), { boundingRect: B, viewBB: $, rfId: J, panZoom: ut, translateExtent: X, flowWidth: I, flowHeight: ot, ariaLabelConfig: T } = Nt(I3, Gt), V = n?.width ?? J3, E = n?.height ?? W3, O = B.width / V, q = B.height / E, Z = Math.max(O, q), nt = Z * V, z = Z * E, H = C * Z, P = B.x - (nt - B.width) / 2 - H, lt = B.y - (z - B.height) / 2 - H, rt = nt + H * 2, ft = z + H * 2, ct = `${P3}-${J}`, tt = W.useRef(0), st = W.useRef();
  tt.current = Z, W.useEffect(() => {
    if (k.current && ut)
      return st.current = r2({
        domNode: k.current,
        panZoom: ut,
        getTransform: () => j.getState().transform,
        getViewScale: () => tt.current
      }), () => {
        st.current?.destroy();
      };
  }, [ut]), W.useEffect(() => {
    st.current?.update({
      translateExtent: X,
      width: I,
      height: ot,
      inversePan: U,
      pannable: A,
      zoomStep: S,
      zoomable: N
    });
  }, [A, N, U, S, X, I, ot]);
  const xt = _ ? (yt) => {
    const [St, Dt] = st.current?.pointer(yt) || [0, 0];
    _(yt, { x: St, y: Dt });
  } : void 0, bt = w ? W.useCallback((yt, St) => {
    const Dt = j.getState().nodeLookup.get(St).internals.userNode;
    w(yt, Dt);
  }, []) : void 0, gt = M ?? T["minimap.ariaLabel"];
  return L.jsx(Vr, { position: b, style: {
    ...n,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof h == "string" ? h : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof v == "string" ? v : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof y == "number" ? y * Z : void 0,
    "--xy-minimap-node-background-color-props": typeof u == "string" ? u : void 0,
    "--xy-minimap-node-stroke-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-width-props": typeof d == "number" ? d : void 0
  }, className: le(["react-flow__minimap", i]), "data-testid": "rf__minimap", children: L.jsxs("svg", { width: V, height: E, viewBox: `${P} ${lt} ${rt} ${ft}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": ct, ref: k, onClick: xt, children: [gt && L.jsx("title", { id: ct, children: gt }), L.jsx(K3, { onClick: bt, nodeColor: u, nodeStrokeColor: o, nodeBorderRadius: f, nodeClassName: s, nodeStrokeWidth: d, nodeComponent: g }), L.jsx("path", { className: "react-flow__minimap-mask", d: `M${P - H},${lt - H}h${rt + H * 2}v${ft + H * 2}h${-rt - H * 2}z
        M${$.x},${$.y}h${$.width}v${$.height}h${-$.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
sv.displayName = "MiniMap";
W.memo(sv);
const tz = (n) => (i) => n ? `${Math.max(1 / i.transform[2], 1)}` : void 0, ez = {
  [oi.Line]: "right",
  [oi.Handle]: "bottom-right"
};
function nz({ nodeId: n, position: i, variant: o = oi.Handle, className: u, style: s = void 0, children: f, color: d, minWidth: g = 10, minHeight: p = 10, maxWidth: h = Number.MAX_VALUE, maxHeight: v = Number.MAX_VALUE, keepAspectRatio: y = !1, resizeDirection: b, autoScale: _ = !0, shouldResize: w, onResizeStart: A, onResize: N, onResizeEnd: M }) {
  const U = Ly(), S = typeof n == "string" ? n : U, C = Qt(), j = W.useRef(null), k = o === oi.Handle, B = Nt(W.useCallback(tz(k && _), [k, _]), Gt), $ = W.useRef(null), J = i ?? ez[o];
  W.useEffect(() => {
    if (!(!j.current || !S))
      return $.current || ($.current = _2({
        domNode: j.current,
        nodeId: S,
        getStoreItems: () => {
          const { nodeLookup: X, transform: I, snapGrid: ot, snapToGrid: T, nodeOrigin: V, domNode: E } = C.getState();
          return {
            nodeLookup: X,
            transform: I,
            snapGrid: ot,
            snapToGrid: T,
            nodeOrigin: V,
            paneDomNode: E
          };
        },
        onChange: (X, I) => {
          const { triggerNodeChanges: ot, nodeLookup: T, parentLookup: V, nodeOrigin: E } = C.getState(), O = [], q = { x: X.x, y: X.y }, Z = T.get(S);
          if (Z && Z.expandParent && Z.parentId) {
            const nt = Z.origin ?? E, z = X.width ?? Z.measured.width ?? 0, H = X.height ?? Z.measured.height ?? 0, P = {
              id: Z.id,
              parentId: Z.parentId,
              rect: {
                width: z,
                height: H,
                ...cy({
                  x: X.x ?? Z.position.x,
                  y: X.y ?? Z.position.y
                }, { width: z, height: H }, Z.parentId, T, nt)
              }
            }, lt = cd([P], T, V, E);
            O.push(...lt), q.x = X.x ? Math.max(nt[0] * z, X.x) : void 0, q.y = X.y ? Math.max(nt[1] * H, X.y) : void 0;
          }
          if (q.x !== void 0 && q.y !== void 0) {
            const nt = {
              id: S,
              type: "position",
              position: { ...q }
            };
            O.push(nt);
          }
          if (X.width !== void 0 && X.height !== void 0) {
            const z = {
              id: S,
              type: "dimensions",
              resizing: !0,
              setAttributes: b ? b === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: X.width,
                height: X.height
              }
            };
            O.push(z);
          }
          for (const nt of I) {
            const z = {
              ...nt,
              type: "position"
            };
            O.push(z);
          }
          ot(O);
        },
        onEnd: ({ width: X, height: I }) => {
          const ot = {
            id: S,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: X,
              height: I
            }
          };
          C.getState().triggerNodeChanges([ot]);
        }
      })), $.current.update({
        controlPosition: J,
        boundaries: {
          minWidth: g,
          minHeight: p,
          maxWidth: h,
          maxHeight: v
        },
        keepAspectRatio: y,
        resizeDirection: b,
        onResizeStart: A,
        onResize: N,
        onResizeEnd: M,
        shouldResize: w
      }), () => {
        $.current?.destroy();
      };
  }, [
    J,
    g,
    p,
    h,
    v,
    y,
    A,
    N,
    M,
    w
  ]);
  const ut = J.split("-");
  return L.jsx("div", { className: le(["react-flow__resize-control", "nodrag", ...ut, o, u]), ref: j, style: {
    ...s,
    scale: B,
    ...d && { [k ? "backgroundColor" : "borderColor"]: d }
  }, children: f });
}
W.memo(nz);
const lz = {
  "Umbricians.MediaCurator.Date": ["format", "source"],
  "Umbricians.MediaCurator.Classification": ["scheme"],
  "Umbricians.MediaCurator.Color": ["mode"],
  "Umbricians.MediaCurator.Exif": ["tag"],
  "Umbricians.MediaCurator.AiTag": ["threshold"],
  "Umbricians.MediaCurator.Filename": ["pattern"],
  "Umbricians.MediaCurator.Alphabetical": [],
  "Umbricians.MediaCurator.Dimensions": [],
  "Umbricians.MediaCurator.Format": []
};
function az(n) {
  const i = n.settingsFields ?? [], o = lz[n.alias];
  if (!o) {
    const u = i.find((s) => s.type === "select");
    return u ? [u] : [];
  }
  return o.map((u) => i.find((s) => s.alias === u)).filter((u) => u !== void 0);
}
function iz(n, i) {
  const o = String(i ?? n.defaultValue ?? "").trim();
  return n.type === "select" ? n.options?.find((u) => u.value === o)?.label ?? o : o;
}
function fv(n, i) {
  const o = [], u = n.condition?.trim();
  if (u && o.push({ text: `when ${u}`, title: `Only when the parent folder is "${u}"`, kind: "condition" }), !i) return o;
  const s = n.settings ?? {};
  for (const f of az(i)) {
    const d = iz(f, s[f.alias]);
    d && o.push({ text: d, title: `${f.label}: ${d}` });
  }
  return o;
}
const Il = "scope", gp = 280, oz = 48, mp = 64, uz = 48;
function rz(n) {
  return `rule:${n.join(".")}`;
}
function on(n) {
  if (n === Il || !n.startsWith("rule:")) return null;
  const i = n.slice(5).split(".").map((o) => Number(o));
  return i.some((o) => Number.isNaN(o)) ? null : i;
}
function cz(n, i) {
  if (n === i || i === Il) return !1;
  const o = on(i);
  if (!o) return !1;
  if (n === Il) return o.length === 1;
  const u = on(n);
  return !u || o.length !== u.length + 1 ? !1 : u.every((s, f) => o[f] === s);
}
function sz(n, i) {
  const o = i.find((s) => s.alias === n.providerAlias);
  return !o || (o.requirements ?? []).length > 0 || fv(n, o).length > 0 ? 76 : 42;
}
function fz(n, i, o, u) {
  const s = [], f = [];
  let d = 0;
  const g = u?.get(Il) ?? uz;
  s.push({
    id: Il,
    type: "scope",
    position: { x: 0, y: d },
    data: { kind: "scope", scopeName: o, providers: i },
    width: gp,
    initialHeight: g,
    draggable: !1
  }), d += g + mp;
  const p = (h, v, y, b, _) => {
    for (let w = 0; w < h.length; w++) {
      const A = h[w], N = [...b, w], M = rz(N), U = A.children ?? [], S = N.length > 1, C = U.length === 0, j = u?.get(M) ?? sz(A, i);
      s.push({
        id: M,
        type: "rule",
        position: { x: v * oz, y: d },
        data: {
          kind: "rule",
          path: N,
          node: A,
          providers: i,
          scopeName: o,
          prefix: _,
          isChild: S,
          isLeaf: C
        },
        width: gp,
        initialHeight: j,
        draggable: !0
      }), f.push({
        id: `e-${y}-${M}`,
        source: y,
        target: M,
        type: "smoothstep",
        animated: !0,
        data: { condition: A.condition, mark: "mc:edge" }
      }), d += j + mp, U.length > 0 && p(
        U,
        v + 1,
        M,
        N,
        [..._, Cb(A, i)]
      );
    }
  };
  return p(n, 1, Il, [], []), { nodes: s, edges: f };
}
function dz(n) {
  const i = [], o = (u, s) => {
    u.forEach((f, d) => {
      const g = [...s, d];
      i.push(`${g.join(".")}:${f.providerAlias}`), o(f.children ?? [], g);
    });
  };
  return o(n, []), i.join(",");
}
function dv(n) {
  return n.measured?.height ?? n.height ?? n.initialHeight ?? 150;
}
function hz(n) {
  return n.position.y + dv(n) / 2;
}
function gz(n, i) {
  return i.filter((o) => {
    const u = on(o.id);
    return !u || u.length !== n.length ? !1 : u.slice(0, -1).every((s, f) => s === n[f]);
  });
}
function qf(n, i) {
  const o = i.find((f) => f.id === n);
  if (!o) return 0;
  let u = o.position.y + dv(o);
  const s = on(n);
  if (!s) return u;
  for (const f of i) {
    const d = on(f.id);
    d && d.length === s.length + 1 && d.slice(0, -1).every((g, p) => g === s[p]) && (u = Math.max(u, qf(f.id, i)));
  }
  return u;
}
function mz(n, i) {
  const o = on(n.id);
  if (!o) return 0;
  let u = o[o.length - 1];
  const s = gz(o, i).sort(
    (p, h) => on(p.id)[on(p.id).length - 1] - on(h.id)[on(h.id).length - 1]
  ), f = new Map(i.map((p) => [p.id, p])), d = hz(n), g = f.get(n.id)?.position.y ?? n.position.y;
  for (; u > 0; ) {
    const p = s[u - 1], h = (qf(p.id, i) + g) / 2;
    if (d >= h) break;
    u -= 1;
  }
  for (; u < s.length - 1; ) {
    const p = s[u + 1], h = (qf(n.id, i) + f.get(p.id).position.y) / 2;
    if (d <= h) break;
    u += 1;
  }
  return u;
}
function pz(n, i) {
  return n.find((o) => o.alias === i);
}
function yz(n) {
  const i = n[0];
  if (i)
    return {
      providerAlias: i.alias,
      settings: Tb(i),
      fallback: "skip",
      children: []
    };
}
function yr(n) {
  return (i) => {
    i.stopPropagation(), n();
  };
}
function hv({ title: n, onClick: i }) {
  return /* @__PURE__ */ L.jsx(
    "button",
    {
      type: "button",
      className: "mc-rule-flow-add nodrag nopan",
      "data-mark": "mc:node-add-child",
      title: n,
      "aria-label": n,
      onClick: yr(i),
      children: /* @__PURE__ */ L.jsx("uui-icon", { name: "icon-add" })
    }
  );
}
const vz = W.memo(function({ data: i }) {
  return /* @__PURE__ */ L.jsxs("div", { className: "mc-rule-flow-block mc-rule-flow-block--scope", "data-mark": "mc:canvas-scope", children: [
    /* @__PURE__ */ L.jsxs("div", { className: "mc-rule-flow-block__header", children: [
      /* @__PURE__ */ L.jsx("span", { className: "mc-rule-flow-block__icon", children: /* @__PURE__ */ L.jsx("uui-icon", { name: "icon-folder" }) }),
      /* @__PURE__ */ L.jsxs("div", { className: "mc-rule-flow-block__title", children: [
        /* @__PURE__ */ L.jsx("uui-tag", { className: "mc-rule-flow-block__kind", look: "secondary", children: "Scope" }),
        /* @__PURE__ */ L.jsx("span", { className: "mc-rule-flow-block__name", children: i.scopeName })
      ] })
    ] }),
    /* @__PURE__ */ L.jsx(aa, { type: "source", position: mt.Bottom }),
    i.onAddRule ? /* @__PURE__ */ L.jsx(hv, { title: "Add rule", onClick: () => i.onAddRule?.(null) }) : null
  ] });
}), bz = W.memo(function({ data: i, id: o }) {
  const { providers: u, path: s = [], node: f, onEditRule: d, onDeleteRule: g, onAddRule: p } = i;
  if (!f) return null;
  const h = pz(u, f.providerAlias), v = fv(f, h), y = (h?.requirements ?? []).length > 0, b = () => d?.(s);
  return /* @__PURE__ */ L.jsxs(
    "div",
    {
      className: `mc-rule-flow-block mc-rule-flow-block--rule${h ? "" : " mc-rule-flow-block--unknown"}`,
      "data-mark": "mc:node",
      "data-node-id": o,
      onDoubleClick: yr(b),
      children: [
        /* @__PURE__ */ L.jsx(aa, { type: "target", position: mt.Top }),
        /* @__PURE__ */ L.jsxs("div", { className: "mc-rule-flow-block__header", children: [
          /* @__PURE__ */ L.jsx("span", { className: "mc-rule-flow-block__icon", children: /* @__PURE__ */ L.jsx("uui-icon", { name: h?.icon ?? "icon-alert" }) }),
          /* @__PURE__ */ L.jsx("span", { className: "mc-rule-flow-block__name", "data-mark": "mc:node-provider", title: h?.name ?? f.providerAlias, children: h?.name ?? "Unknown provider" }),
          /* @__PURE__ */ L.jsxs("div", { className: "mc-rule-flow-block__actions mc-rule-flow-action-bar nodrag nopan", children: [
            /* @__PURE__ */ L.jsx("button", { type: "button", className: "mc-rule-flow-action-bar__btn", "data-mark": "mc:node-edit", title: "Settings", "aria-label": "Settings", onClick: yr(b), children: /* @__PURE__ */ L.jsx("uui-icon", { name: "icon-edit" }) }),
            /* @__PURE__ */ L.jsx(
              "button",
              {
                type: "button",
                className: "mc-rule-flow-action-bar__btn mc-rule-flow-action-bar__btn--danger",
                "data-mark": "mc:node-remove",
                title: "Delete",
                "aria-label": "Delete",
                onClick: yr(() => g?.(s)),
                children: /* @__PURE__ */ L.jsx("uui-icon", { name: "icon-trash" })
              }
            )
          ] })
        ] }),
        v.length > 0 || y || !h ? /* @__PURE__ */ L.jsxs("div", { className: "mc-rule-flow-block__body", children: [
          v.map((_) => /* @__PURE__ */ L.jsx(
            "code",
            {
              className: `mc-rule-flow-block__chip${_.kind ? ` mc-rule-flow-block__chip--${_.kind}` : ""}`,
              "data-mark": _.kind === "condition" ? "mc:node-condition" : "mc:node-summary",
              title: _.title,
              children: _.text
            },
            `${_.kind ?? "setting"}:${_.title}`
          )),
          h ? null : /* @__PURE__ */ L.jsx("span", { className: "mc-rule-flow-block__tag", "data-mark": "mc:node-unknown-provider", title: `No provider is registered with the alias "${f.providerAlias}".`, children: "unknown provider" }),
          y ? /* @__PURE__ */ L.jsx("span", { className: "mc-rule-flow-block__tag", "data-mark": "mc:node-requirements", title: "This provider declares media type property requirements.", children: "needs properties" }) : null
        ] }) : null,
        /* @__PURE__ */ L.jsx(aa, { type: "source", position: mt.Bottom }),
        p ? /* @__PURE__ */ L.jsx(hv, { title: "Add child rule", onClick: () => p(s) }) : null
      ]
    }
  );
}), xz = {
  scope: vz,
  rule: bz
}, _z = 0.85, Sz = 1, fr = 24;
function wz() {
  const { getNodes: n, getNodesBounds: i, setViewport: o } = qr(), u = C3(), s = Nt((g) => g.width), f = Nt((g) => g.height), d = W.useRef(!1);
  return W.useEffect(() => {
    if (!u || !s || !f || d.current) return;
    d.current = !0;
    const g = requestAnimationFrame(() => {
      const p = i(n()), h = Math.min(
        (s - fr * 2) / p.width,
        (f - fr * 2) / p.height
      ), v = Math.min(Sz, Math.max(_z, h)), y = (s - p.width * v) / 2 - p.x * v, b = p.height * v, _ = b <= f - fr * 2 ? (f - b) / 2 : fr;
      o({ x: y, y: _ - p.y * v, zoom: v }, { duration: 150 });
    });
    return () => cancelAnimationFrame(g);
  }, [n, i, o, u, s, f]), null;
}
function Ez(n) {
  const i = n.map((o) => `${o.id}:${o.measured?.height ?? ""}`).join("|");
  return W.useMemo(() => {
    const o = /* @__PURE__ */ new Map();
    for (const u of n)
      u.measured?.height && o.set(u.id, u.measured.height);
    return o;
  }, [i]);
}
function zz({
  rules: n,
  providers: i,
  scopeName: o,
  layoutGeneration: u = 0,
  onRulesChange: s,
  onEditRule: f,
  onDeleteRule: d,
  onAddRule: g
}) {
  const p = W.useRef(!1), h = W.useRef(/* @__PURE__ */ new Map()), v = W.useRef(u), y = dz(n), b = W.useRef(y), [_, w, A] = M3([]), N = Ez(_), M = W.useCallback(
    (ut, X) => {
      X?.relayout && (p.current = !1), s(ut, X);
    },
    [s]
  ), { nodes: U, edges: S } = W.useMemo(
    () => fz(n, i, o, N),
    [n, i, o, N]
  ), C = W.useMemo(
    () => U.map(
      (ut) => ({
        ...ut,
        data: { ...ut.data, onEditRule: f, onDeleteRule: d, onAddRule: g }
      })
    ),
    [U, f, d, g]
  ), [j, k, B] = N3(S);
  W.useEffect(() => {
    const ut = v.current !== u || b.current !== y;
    if (v.current = u, b.current = y, ut && h.current.clear(), p.current && !ut)
      return;
    p.current = !1;
    const X = h.current;
    w((I) => {
      const ot = new Map(I.map((T) => [T.id, T.measured]));
      return C.map((T) => ({
        ...T,
        position: X.get(T.id) ?? T.position,
        measured: ot.get(T.id)
      }));
    });
  }, [C, u, y, w]), W.useEffect(() => {
    k(S);
  }, [S, k]);
  const $ = W.useCallback(() => {
    p.current = !0;
  }, []), J = W.useCallback(
    (ut, X) => {
      if (h.current.set(X.id, { ...X.position }), X.id === Il) {
        p.current = !1;
        return;
      }
      const I = on(X.id);
      if (!I) {
        p.current = !1;
        return;
      }
      const ot = C.map((E) => {
        const O = h.current.get(E.id);
        return O ? { ...E, position: O } : E;
      }), T = mz(X, ot), V = I[I.length - 1];
      if (T !== V) {
        M(Db(n, I, T), { relayout: !0 });
        return;
      }
      p.current = !1;
    },
    [n, M, C]
  );
  return /* @__PURE__ */ L.jsxs("div", { className: "mc-rule-flow-canvas", "data-mark": "mc:canvas", children: [
    /* @__PURE__ */ L.jsx("div", { className: "mc-rule-flow-viewport", children: /* @__PURE__ */ L.jsxs(
      z3,
      {
        nodes: _,
        edges: j,
        onNodesChange: A,
        onEdgesChange: B,
        onNodeDragStart: $,
        onNodeDragStop: J,
        nodeTypes: xz,
        defaultViewport: { x: 24, y: 24, zoom: 1 },
        isValidConnection: (ut) => cz(ut.source ?? "", ut.target ?? ""),
        nodesConnectable: !1,
        nodesDraggable: !0,
        elementsSelectable: !1,
        selectNodesOnDrag: !1,
        nodeOrigin: [0, 0],
        minZoom: 0.5,
        maxZoom: 1.5,
        proOptions: { hideAttribution: !0 },
        children: [
          /* @__PURE__ */ L.jsx(wz, {}),
          /* @__PURE__ */ L.jsx(V3, { position: "bottom-right", showInteractive: !1 }),
          /* @__PURE__ */ L.jsx(R3, { variant: Zn.Dots, gap: 16, size: 1 })
        ]
      }
    ) }),
    n.length === 0 ? /* @__PURE__ */ L.jsx("p", { className: "mc-rule-flow-empty", children: "No rules yet. Each rule node contributes folder levels beneath the scope." }) : null,
    /* @__PURE__ */ L.jsx("div", { className: "mc-rule-flow-toolbar", children: /* @__PURE__ */ L.jsx("button", { type: "button", className: "nodrag nopan", "data-mark": "mc:canvas-add", onClick: () => g(null), children: "Add rule" }) })
  ] });
}
function Mz(n) {
  return /* @__PURE__ */ L.jsx(uv, { children: /* @__PURE__ */ L.jsx(zz, { ...n }) });
}
const Nz = ".react-flow{direction:ltr;--xy-edge-stroke-default: #b1b1b7;--xy-edge-stroke-width-default: 1;--xy-edge-stroke-selected-default: #555;--xy-connectionline-stroke-default: #b1b1b7;--xy-connectionline-stroke-width-default: 1;--xy-attribution-background-color-default: rgba(255, 255, 255, .5);--xy-minimap-background-color-default: #fff;--xy-minimap-mask-background-color-default: rgba(240, 240, 240, .6);--xy-minimap-mask-stroke-color-default: transparent;--xy-minimap-mask-stroke-width-default: 1;--xy-minimap-node-background-color-default: #e2e2e2;--xy-minimap-node-stroke-color-default: transparent;--xy-minimap-node-stroke-width-default: 2;--xy-background-color-default: transparent;--xy-background-pattern-dots-color-default: #91919a;--xy-background-pattern-lines-color-default: #eee;--xy-background-pattern-cross-color-default: #e2e2e2;background-color:var(--xy-background-color, var(--xy-background-color-default));--xy-node-color-default: inherit;--xy-node-border-default: 1px solid #1a192b;--xy-node-background-color-default: #fff;--xy-node-group-background-color-default: rgba(240, 240, 240, .25);--xy-node-boxshadow-hover-default: 0 1px 4px 1px rgba(0, 0, 0, .08);--xy-node-boxshadow-selected-default: 0 0 0 .5px #1a192b;--xy-node-border-radius-default: 3px;--xy-handle-background-color-default: #1a192b;--xy-handle-border-color-default: #fff;--xy-selection-background-color-default: rgba(0, 89, 220, .08);--xy-selection-border-default: 1px dotted rgba(0, 89, 220, .8);--xy-controls-button-background-color-default: #fefefe;--xy-controls-button-background-color-hover-default: #f4f4f4;--xy-controls-button-color-default: inherit;--xy-controls-button-color-hover-default: inherit;--xy-controls-button-border-color-default: #eee;--xy-controls-box-shadow-default: 0 0 2px 1px rgba(0, 0, 0, .08);--xy-edge-label-background-color-default: #ffffff;--xy-edge-label-color-default: inherit;--xy-resize-background-color-default: #3367d9}.react-flow.dark{--xy-edge-stroke-default: #3e3e3e;--xy-edge-stroke-width-default: 1;--xy-edge-stroke-selected-default: #727272;--xy-connectionline-stroke-default: #b1b1b7;--xy-connectionline-stroke-width-default: 1;--xy-attribution-background-color-default: rgba(150, 150, 150, .25);--xy-minimap-background-color-default: #141414;--xy-minimap-mask-background-color-default: rgba(60, 60, 60, .6);--xy-minimap-mask-stroke-color-default: transparent;--xy-minimap-mask-stroke-width-default: 1;--xy-minimap-node-background-color-default: #2b2b2b;--xy-minimap-node-stroke-color-default: transparent;--xy-minimap-node-stroke-width-default: 2;--xy-background-color-default: #141414;--xy-background-pattern-dots-color-default: #777;--xy-background-pattern-lines-color-default: #777;--xy-background-pattern-cross-color-default: #777;--xy-node-color-default: #f8f8f8;--xy-node-border-default: 1px solid #3c3c3c;--xy-node-background-color-default: #1e1e1e;--xy-node-group-background-color-default: rgba(240, 240, 240, .25);--xy-node-boxshadow-hover-default: 0 1px 4px 1px rgba(255, 255, 255, .08);--xy-node-boxshadow-selected-default: 0 0 0 .5px #999;--xy-handle-background-color-default: #bebebe;--xy-handle-border-color-default: #1e1e1e;--xy-selection-background-color-default: rgba(200, 200, 220, .08);--xy-selection-border-default: 1px dotted rgba(200, 200, 220, .8);--xy-controls-button-background-color-default: #2b2b2b;--xy-controls-button-background-color-hover-default: #3e3e3e;--xy-controls-button-color-default: #f8f8f8;--xy-controls-button-color-hover-default: #fff;--xy-controls-button-border-color-default: #5b5b5b;--xy-controls-box-shadow-default: 0 0 2px 1px rgba(0, 0, 0, .08);--xy-edge-label-background-color-default: #141414;--xy-edge-label-color-default: #f8f8f8}.react-flow__background{background-color:var(--xy-background-color-props, var(--xy-background-color, var(--xy-background-color-default)));pointer-events:none;z-index:-1}.react-flow__container{position:absolute;width:100%;height:100%;top:0;left:0}.react-flow__pane{z-index:1;touch-action:none}.react-flow__pane.draggable{cursor:grab}.react-flow__pane.dragging{cursor:grabbing}.react-flow__pane.selection{cursor:pointer}.react-flow__viewport{transform-origin:0 0;z-index:2;pointer-events:none}.react-flow__renderer{z-index:4}.react-flow__selection{z-index:6}.react-flow__nodesselection-rect:focus,.react-flow__nodesselection-rect:focus-visible{outline:none}.react-flow__edge-path{stroke:var(--xy-edge-stroke, var(--xy-edge-stroke-default));stroke-width:var(--xy-edge-stroke-width, var(--xy-edge-stroke-width-default));fill:none}.react-flow__connection-path{stroke:var(--xy-connectionline-stroke, var(--xy-connectionline-stroke-default));stroke-width:var(--xy-connectionline-stroke-width, var(--xy-connectionline-stroke-width-default));fill:none}.react-flow .react-flow__edges{position:absolute}.react-flow .react-flow__edges svg{overflow:visible;position:absolute;pointer-events:none}.react-flow__edge{pointer-events:visibleStroke}.react-flow__edge.selectable{cursor:pointer}.react-flow__edge.animated path{stroke-dasharray:5;animation:dashdraw .5s linear infinite}.react-flow__edge.animated path.react-flow__edge-interaction{stroke-dasharray:none;animation:none}.react-flow__edge.inactive{pointer-events:none}.react-flow__edge.selected,.react-flow__edge:focus,.react-flow__edge:focus-visible{outline:none}.react-flow__edge.selected .react-flow__edge-path,.react-flow__edge.selectable:focus .react-flow__edge-path,.react-flow__edge.selectable:focus-visible .react-flow__edge-path{stroke:var(--xy-edge-stroke-selected, var(--xy-edge-stroke-selected-default))}.react-flow__edge-textwrapper{pointer-events:all}.react-flow__edge .react-flow__edge-text{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.react-flow__arrowhead polyline{stroke:var(--xy-edge-stroke, var(--xy-edge-stroke-default))}.react-flow__arrowhead polyline.arrowclosed{fill:var(--xy-edge-stroke, var(--xy-edge-stroke-default))}.react-flow__connection{pointer-events:none}.react-flow__connection .animated{stroke-dasharray:5;animation:dashdraw .5s linear infinite}svg.react-flow__connectionline{z-index:1001;overflow:visible;position:absolute}.react-flow__nodes{pointer-events:none;transform-origin:0 0}.react-flow__node{position:absolute;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:all;transform-origin:0 0;box-sizing:border-box;cursor:default}.react-flow__node.selectable{cursor:pointer}.react-flow__node.draggable{cursor:grab;pointer-events:all}.react-flow__node.draggable.dragging{cursor:grabbing}.react-flow__nodesselection{z-index:3;transform-origin:left top;pointer-events:none}.react-flow__nodesselection-rect{position:absolute;pointer-events:all;cursor:grab}.react-flow__handle{position:absolute;pointer-events:none;min-width:5px;min-height:5px;width:6px;height:6px;background-color:var(--xy-handle-background-color, var(--xy-handle-background-color-default));border:1px solid var(--xy-handle-border-color, var(--xy-handle-border-color-default));border-radius:100%}.react-flow__handle.connectingfrom{pointer-events:all}.react-flow__handle.connectionindicator{pointer-events:all;cursor:crosshair}.react-flow__handle-bottom{top:auto;left:50%;bottom:0;transform:translate(-50%,50%)}.react-flow__handle-top{top:0;left:50%;transform:translate(-50%,-50%)}.react-flow__handle-left{top:50%;left:0;transform:translate(-50%,-50%)}.react-flow__handle-right{top:50%;right:0;transform:translate(50%,-50%)}.react-flow__edgeupdater{cursor:move;pointer-events:all}.react-flow__pane.selection .react-flow__panel{pointer-events:none}.react-flow__panel{position:absolute;z-index:5;margin:15px}.react-flow__panel.top{top:0}.react-flow__panel.bottom{bottom:0}.react-flow__panel.top.center,.react-flow__panel.bottom.center{left:50%;transform:translate(-15px) translate(-50%)}.react-flow__panel.left{left:0}.react-flow__panel.right{right:0}.react-flow__panel.left.center,.react-flow__panel.right.center{top:50%;transform:translateY(-15px) translateY(-50%)}.react-flow__attribution{font-size:10px;background:var(--xy-attribution-background-color, var(--xy-attribution-background-color-default));padding:2px 3px;margin:0}.react-flow__attribution a{text-decoration:none;color:#999}@keyframes dashdraw{0%{stroke-dashoffset:10}}.react-flow__edgelabel-renderer{position:absolute;width:100%;height:100%;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;left:0;top:0}.react-flow__viewport-portal{position:absolute;width:100%;height:100%;left:0;top:0;-webkit-user-select:none;-moz-user-select:none;user-select:none}.react-flow__minimap{background:var( --xy-minimap-background-color-props, var(--xy-minimap-background-color, var(--xy-minimap-background-color-default)) )}.react-flow__minimap-svg{display:block}.react-flow__minimap-mask{fill:var( --xy-minimap-mask-background-color-props, var(--xy-minimap-mask-background-color, var(--xy-minimap-mask-background-color-default)) );stroke:var( --xy-minimap-mask-stroke-color-props, var(--xy-minimap-mask-stroke-color, var(--xy-minimap-mask-stroke-color-default)) );stroke-width:var( --xy-minimap-mask-stroke-width-props, var(--xy-minimap-mask-stroke-width, var(--xy-minimap-mask-stroke-width-default)) )}.react-flow__minimap-node{fill:var( --xy-minimap-node-background-color-props, var(--xy-minimap-node-background-color, var(--xy-minimap-node-background-color-default)) );stroke:var( --xy-minimap-node-stroke-color-props, var(--xy-minimap-node-stroke-color, var(--xy-minimap-node-stroke-color-default)) );stroke-width:var( --xy-minimap-node-stroke-width-props, var(--xy-minimap-node-stroke-width, var(--xy-minimap-node-stroke-width-default)) )}.react-flow__background-pattern.dots{fill:var( --xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-dots-color-default)) )}.react-flow__background-pattern.lines{stroke:var( --xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-lines-color-default)) )}.react-flow__background-pattern.cross{stroke:var( --xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-cross-color-default)) )}.react-flow__controls{display:flex;flex-direction:column;box-shadow:var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default))}.react-flow__controls.horizontal{flex-direction:row}.react-flow__controls-button{display:flex;justify-content:center;align-items:center;height:26px;width:26px;padding:4px;border:none;background:var(--xy-controls-button-background-color, var(--xy-controls-button-background-color-default));border-bottom:1px solid var( --xy-controls-button-border-color-props, var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default)) );color:var( --xy-controls-button-color-props, var(--xy-controls-button-color, var(--xy-controls-button-color-default)) );cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none}.react-flow__controls-button svg{width:100%;max-width:12px;max-height:12px;fill:currentColor}.react-flow__edge.updating .react-flow__edge-path{stroke:#777}.react-flow__edge-text{font-size:10px}.react-flow__node.selectable:focus,.react-flow__node.selectable:focus-visible{outline:none}.react-flow__node-input,.react-flow__node-default,.react-flow__node-output,.react-flow__node-group{padding:10px;border-radius:var(--xy-node-border-radius, var(--xy-node-border-radius-default));width:150px;font-size:12px;color:var(--xy-node-color, var(--xy-node-color-default));text-align:center;border:var(--xy-node-border, var(--xy-node-border-default));background-color:var(--xy-node-background-color, var(--xy-node-background-color-default))}.react-flow__node-input.selectable:hover,.react-flow__node-default.selectable:hover,.react-flow__node-output.selectable:hover,.react-flow__node-group.selectable:hover{box-shadow:var(--xy-node-boxshadow-hover, var(--xy-node-boxshadow-hover-default))}.react-flow__node-input.selectable.selected,.react-flow__node-input.selectable:focus,.react-flow__node-input.selectable:focus-visible,.react-flow__node-default.selectable.selected,.react-flow__node-default.selectable:focus,.react-flow__node-default.selectable:focus-visible,.react-flow__node-output.selectable.selected,.react-flow__node-output.selectable:focus,.react-flow__node-output.selectable:focus-visible,.react-flow__node-group.selectable.selected,.react-flow__node-group.selectable:focus,.react-flow__node-group.selectable:focus-visible{box-shadow:var(--xy-node-boxshadow-selected, var(--xy-node-boxshadow-selected-default))}.react-flow__node-group{background-color:var(--xy-node-group-background-color, var(--xy-node-group-background-color-default))}.react-flow__nodesselection-rect,.react-flow__selection{background:var(--xy-selection-background-color, var(--xy-selection-background-color-default));border:var(--xy-selection-border, var(--xy-selection-border-default))}.react-flow__nodesselection-rect:focus,.react-flow__nodesselection-rect:focus-visible,.react-flow__selection:focus,.react-flow__selection:focus-visible{outline:none}.react-flow__controls-button:hover{background:var( --xy-controls-button-background-color-hover-props, var(--xy-controls-button-background-color-hover, var(--xy-controls-button-background-color-hover-default)) );color:var( --xy-controls-button-color-hover-props, var(--xy-controls-button-color-hover, var(--xy-controls-button-color-hover-default)) )}.react-flow__controls-button:disabled{pointer-events:none}.react-flow__controls-button:disabled svg{fill-opacity:.4}.react-flow__controls-button:last-child{border-bottom:none}.react-flow__controls.horizontal .react-flow__controls-button{border-bottom:none;border-right:1px solid var( --xy-controls-button-border-color-props, var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default)) )}.react-flow__controls.horizontal .react-flow__controls-button:last-child{border-right:none}.react-flow__resize-control{position:absolute}.react-flow__resize-control.left,.react-flow__resize-control.right{cursor:ew-resize}.react-flow__resize-control.top,.react-flow__resize-control.bottom{cursor:ns-resize}.react-flow__resize-control.top.left,.react-flow__resize-control.bottom.right{cursor:nwse-resize}.react-flow__resize-control.bottom.left,.react-flow__resize-control.top.right{cursor:nesw-resize}.react-flow__resize-control.handle{width:5px;height:5px;border:1px solid #fff;border-radius:1px;background-color:var(--xy-resize-background-color, var(--xy-resize-background-color-default));translate:-50% -50%}.react-flow__resize-control.handle.left{left:0;top:50%}.react-flow__resize-control.handle.right{left:100%;top:50%}.react-flow__resize-control.handle.top{left:50%;top:0}.react-flow__resize-control.handle.bottom{left:50%;top:100%}.react-flow__resize-control.handle.top.left,.react-flow__resize-control.handle.bottom.left{left:0}.react-flow__resize-control.handle.top.right,.react-flow__resize-control.handle.bottom.right{left:100%}.react-flow__resize-control.line{border-color:var(--xy-resize-background-color, var(--xy-resize-background-color-default));border-width:0;border-style:solid}.react-flow__resize-control.line.left,.react-flow__resize-control.line.right{width:1px;transform:translate(-50%);top:0;height:100%}.react-flow__resize-control.line.left{left:0;border-left-width:1px}.react-flow__resize-control.line.right{left:100%;border-right-width:1px}.react-flow__resize-control.line.top,.react-flow__resize-control.line.bottom{height:1px;transform:translateY(-50%);left:0;width:100%}.react-flow__resize-control.line.top{top:0;border-top-width:1px}.react-flow__resize-control.line.bottom{border-bottom-width:1px;top:100%}.react-flow__edge-textbg{fill:var(--xy-edge-label-background-color, var(--xy-edge-label-background-color-default))}.react-flow__edge-text{fill:var(--xy-edge-label-color, var(--xy-edge-label-color-default))}", Az = '.mc-rule-flow-canvas{--xy-node-border-radius: var(--uui-border-radius, 6px);--xy-edge-stroke: var(--uui-color-border, #d8d7d9);--xy-edge-stroke-selected: var(--uui-color-selected, #1b264f);--xy-edge-label-background-color: var(--uui-color-surface, #fff);--xy-background-color: var(--uui-color-surface, #fff);position:relative;isolation:isolate;z-index:1}.mc-rule-flow-viewport{position:relative;z-index:1;width:100%;height:560px;border:1px solid var(--uui-color-border, #d8d7d9);border-radius:var(--uui-border-radius, 6px);overflow:hidden;pointer-events:auto}.mc-rule-flow-viewport .react-flow{width:100%;height:100%}.mc-rule-flow-viewport .react-flow__node{width:280px!important}.mc-rule-flow-viewport .react-flow__node-scope,.mc-rule-flow-viewport .react-flow__node-rule{width:280px;background:transparent;border:none;box-shadow:none;padding:0}.mc-rule-flow-viewport .react-flow__handle{width:8px;height:8px;background:var(--uui-color-border-emphasis, #a1a1a1);border:2px solid var(--uui-color-surface, #fff)}.mc-rule-flow-canvas .react-flow__panel{margin:0}.mc-rule-flow-canvas .react-flow__edge-text{font-size:.8rem}.mc-rule-flow-canvas .react-flow__edge-textbg{fill:var(--uui-color-surface-alt, #f6f4f4)}.mc-rule-flow-block{position:relative;width:280px;box-sizing:border-box;background:var(--uui-color-surface, #fff);border:1px solid var(--uui-color-divider-standalone, #e9e9eb);border-radius:6px;box-shadow:var(--uui-shadow-depth-1, 0 1px 6px rgba(0, 0, 0, .1), 0 0 1px rgba(0, 0, 0, .1));font-family:var(--uui-font-family, inherit);font-size:var(--uui-type-small-size, 12px);color:var(--uui-color-text, #060606);cursor:grab;transition:box-shadow .12s ease}.mc-rule-flow-block:hover{box-shadow:var(--uui-shadow-depth-2, 0 3px 12px rgba(0, 0, 0, .12), 0 0 1px rgba(0, 0, 0, .1))}.react-flow__node.dragging .mc-rule-flow-block{cursor:grabbing}.mc-rule-flow-block:before{content:"";position:absolute;top:-1px;left:-1px;bottom:-1px;width:4px;background:var(--mc-block-stripe, var(--uui-color-text-alt, #6b7280));border-radius:6px 0 0 6px}.mc-rule-flow-block--scope{--mc-block-stripe: #6366f1;cursor:default}.mc-rule-flow-block--rule{--mc-block-stripe: #3b82f6}.mc-rule-flow-block--unknown{--mc-block-stripe: var(--uui-color-danger, #d42054)}.mc-rule-flow-block__header{display:flex;align-items:center;gap:var(--uui-size-space-4, 12px);padding:var(--uui-size-space-3, 9px) var(--uui-size-space-4, 12px);padding-left:calc(var(--uui-size-space-4, 12px) + 4px);min-height:24px}.mc-rule-flow-block__body:not(:empty){border-top:1px solid var(--uui-color-divider-standalone, #e9e9eb)}.mc-rule-flow-block__icon{display:inline-flex;width:18px;height:18px;flex:none;color:var(--mc-block-stripe)}.mc-rule-flow-block__icon uui-icon{font-size:18px}.mc-rule-flow-block__title{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}.mc-rule-flow-block__kind{align-self:flex-start;text-transform:uppercase;letter-spacing:.06em;font-size:10px;font-weight:700}.mc-rule-flow-block__name{flex:1;min-width:0;font-size:var(--uui-type-default-size, 14px);font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-rule-flow-block__body{display:flex;flex-wrap:wrap;align-items:center;gap:4px;padding:var(--uui-size-space-3, 9px) var(--uui-size-space-4, 12px);padding-left:calc(var(--uui-size-space-4, 12px) + 4px)}.mc-rule-flow-block__body:empty{display:none}.mc-rule-flow-block__chip{max-width:100%;font-family:var(--uui-font-monospace, monospace);font-size:11px;color:var(--uui-color-text-alt, #2e2b29);background:var(--uui-color-surface-alt, #f7f7f8);padding:1px 6px;border-radius:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mc-rule-flow-block__chip--condition{background:var(--uui-color-warning-standalone, #fbd142);color:var(--uui-color-warning-contrast, #000)}.mc-rule-flow-block__tag{font-size:11px;padding:1px 6px;border-radius:1rem;background:var(--uui-color-warning, #f5c1bc)}.mc-rule-flow-action-bar{display:inline-flex;align-items:stretch;flex:none;background:var(--uui-color-surface, #fff);border:1px solid var(--uui-color-divider-standalone, #e9e9eb);border-radius:50px;box-shadow:var(--uui-shadow-depth-1, 0 1px 6px rgba(0, 0, 0, .1), 0 0 1px rgba(0, 0, 0, .1));overflow:hidden}.mc-rule-flow-action-bar__btn{width:28px;height:24px;border:none;background:transparent;color:var(--uui-color-text-alt, #2e2b29);cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;transition:background .12s ease,color .12s ease}.mc-rule-flow-action-bar__btn+.mc-rule-flow-action-bar__btn{border-left:1px solid var(--uui-color-divider-standalone, #e9e9eb)}.mc-rule-flow-action-bar__btn:hover{background:var(--uui-color-surface-alt, #f7f7f8);color:var(--uui-color-text, #060606)}.mc-rule-flow-action-bar__btn:focus-visible{outline:2px solid var(--uui-color-focus, #2152a3);outline-offset:-2px}.mc-rule-flow-action-bar__btn--danger:hover{background:var(--uui-color-danger, #d42054);color:#fff}.mc-rule-flow-action-bar__btn uui-icon{font-size:14px}.mc-rule-flow-block__actions{opacity:0;margin-left:auto;transition:opacity .12s ease}.mc-rule-flow-block:hover .mc-rule-flow-block__actions,.mc-rule-flow-block__actions:focus-within{opacity:1}.mc-rule-flow-add{position:absolute;bottom:-28px;left:50%;transform:translate(-50%);z-index:3;width:22px;height:22px;padding:0;display:flex;align-items:center;justify-content:center;border-radius:50%;border:1px solid var(--uui-color-border, #d8d7d9);background:var(--uui-color-surface, #fff);color:var(--uui-color-text-alt, #2e2b29);cursor:pointer;opacity:0;transition:opacity .12s ease,background .12s ease,color .12s ease}.mc-rule-flow-block:hover .mc-rule-flow-add,.mc-rule-flow-add:focus-visible{opacity:1}.mc-rule-flow-add:hover{background:var(--uui-color-positive, #2bc37c);border-color:var(--uui-color-positive, #2bc37c);color:#fff}.mc-rule-flow-add uui-icon{font-size:12px}.mc-rule-flow-toolbar{display:flex;gap:.5rem;margin-top:.75rem}.mc-rule-flow-toolbar button{cursor:pointer;border:1px solid var(--uui-color-border, #d8d7d9);background:var(--uui-color-surface-alt, #f6f4f4);border-radius:4px;padding:.4rem .75rem}.mc-rule-flow-empty{margin:.75rem 0 0;color:var(--uui-color-text-alt, #6e6e6e)}:host([fill]){height:100%}:host([fill]) .react-root,:host([fill]) .mc-rule-flow-canvas,:host([fill]) .mc-rule-flow-viewport{height:100%}:host([fill]) .mc-rule-flow-viewport{border:none;border-radius:0}:host([fill]) .mc-rule-flow-toolbar{position:absolute;top:var(--uui-size-space-5, 18px);left:var(--uui-size-space-5, 18px);z-index:5;margin:0}:host([fill]) .mc-rule-flow-empty{position:absolute;top:var(--uui-size-space-5, 18px);left:50%;transform:translate(-50%);z-index:5;margin:0;pointer-events:none}';
let co;
function Cz(n) {
  co || (co = new CSSStyleSheet(), co.replaceSync(`${Nz}
${Az}`)), n.adoptedStyleSheets.includes(co) || (n.adoptedStyleSheets = [...n.adoptedStyleSheets, co]);
}
const Tz = new Mb(
  "Umbricians.MediaCurator.Modal.RuleSettings",
  { modal: { type: "sidebar", size: "medium" } }
);
var Dz = Object.defineProperty, Oz = Object.getOwnPropertyDescriptor, gv = (n) => {
  throw TypeError(n);
}, Ho = (n, i, o, u) => {
  for (var s = u > 1 ? void 0 : u ? Oz(i, o) : i, f = n.length - 1, d; f >= 0; f--)
    (d = n[f]) && (s = (u ? d(i, o, s) : d(s)) || s);
  return u && s && Dz(i, o, s), s;
}, fd = (n, i, o) => i.has(n) || gv("Cannot " + o), vn = (n, i, o) => (fd(n, i, "read from private field"), i.get(n)), Ql = (n, i, o) => i.has(n) ? gv("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(n) : i.set(n, o), ho = (n, i, o, u) => (fd(n, i, "write to private field"), i.set(n, o), o), ln = (n, i, o) => (fd(n, i, "access private method"), o), Wa, Jl, zo, ke, ui, mv, Xf, dd, hd, gd, Cr;
let ia = class extends zb(wb) {
  constructor() {
    super(...arguments), Ql(this, ke), this.rules = [], this.providers = [], this.scopeName = "Scope", this.fill = !1, Ql(this, Wa), Ql(this, Jl), Ql(this, zo, 0), Ql(this, dd, (n) => {
      ln(this, ke, Xf).call(this, n, !1);
    }), Ql(this, hd, (n) => {
      const i = yz(this.providers);
      if (!i) return;
      const o = this.rules, { rules: u, path: s } = Ob(o, n, i);
      ln(this, ke, ui).call(this, u, !0), ln(this, ke, Xf).call(this, s, !0, o);
    }), Ql(this, gd, async (n) => {
      const i = xp(this.rules, n);
      if (!i) return;
      const o = i.children?.length ?? 0, u = o === 0 ? "" : ` and its ${o === 1 ? "child rule" : `${o} child rules`}`;
      try {
        await Nb(this, {
          headline: "Delete",
          content: `Are you sure you want to delete "${ln(this, ke, mv).call(this, i)}"${u}?`,
          color: "danger",
          confirmLabel: "Delete"
        });
      } catch {
        return;
      }
      ln(this, ke, ui).call(this, Hb(this.rules, n), !0);
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.shadowRoot && Cz(this.shadowRoot);
  }
  render() {
    return yp`<div class="react-root"></div>`;
  }
  shouldUpdate(n) {
    return this.hasUpdated ? ((n.has("rules") || n.has("providers") || n.has("scopeName")) && ln(this, ke, Cr).call(this), !1) : !0;
  }
  firstUpdated() {
    ho(this, Wa, this.renderRoot.querySelector(".react-root") ?? void 0), vn(this, Wa) && (ho(this, Jl, Xb.createRoot(vn(this, Wa))), ln(this, ke, Cr).call(this));
  }
  disconnectedCallback() {
    vn(this, Jl)?.unmount(), ho(this, Jl, void 0), ho(this, Wa, void 0), super.disconnectedCallback();
  }
};
Wa = /* @__PURE__ */ new WeakMap();
Jl = /* @__PURE__ */ new WeakMap();
zo = /* @__PURE__ */ new WeakMap();
ke = /* @__PURE__ */ new WeakSet();
ui = function(n, i = !1) {
  i && ho(this, zo, vn(this, zo) + 1), this.rules = n, ln(this, ke, Cr).call(this), this.dispatchEvent(new CustomEvent("rules-change", { detail: { rules: n }, bubbles: !1 }));
};
mv = function(n) {
  return this.providers.find((i) => i.alias === n.providerAlias)?.name ?? n.providerAlias;
};
Xf = async function(n, i, o) {
  const u = xp(this.rules, n);
  if (u)
    try {
      const { rule: s } = await Ab(this, Tz, {
        data: { rule: u, providers: this.providers, isChild: n.length > 1, isNew: i }
      });
      ln(this, ke, ui).call(this, Rb(this.rules, n, (f) => ({ ...s, children: f.children })));
    } catch {
      o && ln(this, ke, ui).call(this, o, !0);
    }
};
dd = /* @__PURE__ */ new WeakMap();
hd = /* @__PURE__ */ new WeakMap();
gd = /* @__PURE__ */ new WeakMap();
Cr = function() {
  vn(this, Jl) && vn(this, Jl).render(
    W.createElement(Mz, {
      rules: this.rules,
      providers: this.providers,
      scopeName: this.scopeName,
      layoutGeneration: vn(this, zo),
      onRulesChange: (n, i) => ln(this, ke, ui).call(this, n, i?.relayout === !0),
      onEditRule: vn(this, dd),
      onDeleteRule: vn(this, gd),
      onAddRule: vn(this, hd)
    })
  );
};
ia.styles = [
  vp`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
        z-index: 1;
      }
      :host([fill]) {
        height: 100%;
      }
      .react-root {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
      }
    `
];
Ho([
  Dr({ attribute: !1 })
], ia.prototype, "rules", 2);
Ho([
  Dr({ attribute: !1 })
], ia.prototype, "providers", 2);
Ho([
  Dr({ attribute: !1 })
], ia.prototype, "scopeName", 2);
Ho([
  Dr({ type: Boolean, reflect: !0 })
], ia.prototype, "fill", 2);
ia = Ho([
  bp("mc-rule-flow")
], ia);
var Hz = Object.defineProperty, Rz = Object.getOwnPropertyDescriptor, pv = (n) => {
  throw TypeError(n);
}, Gr = (n, i, o, u) => {
  for (var s = u > 1 ? void 0 : u ? Rz(i, o) : i, f = n.length - 1, d; f >= 0; f--)
    (d = n[f]) && (s = (u ? d(i, o, s) : d(s)) || s);
  return u && s && Hz(i, o, s), s;
}, md = (n, i, o) => i.has(n) || pv("Cannot " + o), Bz = (n, i, o) => (md(n, i, "read from private field"), i.get(n)), pp = (n, i, o) => i.has(n) ? pv("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(n) : i.set(n, o), Uz = (n, i, o, u) => (md(n, i, "write to private field"), i.set(n, o), o), kz = (n, i, o) => (md(n, i, "access private method"), o), Tr, Zf, yv;
let oa = class extends Eb {
  constructor() {
    super(), pp(this, Zf), this._rules = [], this._providers = [], this._name = "", pp(this, Tr), this.consumeContext(Bb, (n) => {
      Uz(this, Tr, n), n && (this.observe(n.rules, (i) => this._rules = i, "_rules"), this.observe(n.providers, (i) => this._providers = i, "_providers"), this.observe(n.name, (i) => this._name = i ?? "", "_name"));
    });
  }
  render() {
    return yp`
      <mc-rule-flow
        fill
        .rules=${this._rules}
        .providers=${this._providers}
        .scopeName=${this._name || "Scope"}
        @rules-change=${kz(this, Zf, yv)}
      ></mc-rule-flow>
    `;
  }
};
Tr = /* @__PURE__ */ new WeakMap();
Zf = /* @__PURE__ */ new WeakSet();
yv = function(n) {
  Bz(this, Tr)?.updateProperty("rules", n.detail.rules);
};
oa.styles = [
  vp`
      :host {
        display: block;
        height: 100%;
      }
    `
];
Gr([
  Gf()
], oa.prototype, "_rules", 2);
Gr([
  Gf()
], oa.prototype, "_providers", 2);
Gr([
  Gf()
], oa.prototype, "_name", 2);
oa = Gr([
  bp("mc-ruleset-design-view")
], oa);
const Zz = oa;
export {
  oa as McRulesetDesignViewElement,
  Zz as default
};
//# sourceMappingURL=ruleset-design-view.element-D0h0Q-lT.js.map
