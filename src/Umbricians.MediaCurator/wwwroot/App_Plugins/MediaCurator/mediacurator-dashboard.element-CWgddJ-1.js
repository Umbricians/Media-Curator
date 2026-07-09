import { LitElement as _p, html as Vt, css as Sp, property as Qf, customElement as wp, nothing as Tl, repeat as X1, state as on } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as Ep } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT as $1 } from "@umbraco-cms/backoffice/notification";
import { umbConfirmModal as Z1 } from "@umbraco-cms/backoffice/modal";
import { c as ee } from "./client.gen-CkijBioZ.js";
function zp(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var ff = { exports: {} }, wt = {};
var Wm;
function G1() {
  if (Wm) return wt;
  Wm = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), u = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), g = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), b = /* @__PURE__ */ Symbol.for("react.lazy"), y = /* @__PURE__ */ Symbol.for("react.activity"), v = Symbol.iterator;
  function S(z) {
    return z === null || typeof z != "object" ? null : (z = v && z[v] || z["@@iterator"], typeof z == "function" ? z : null);
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
  function R() {
  }
  R.prototype = M.prototype;
  function _(z, H, P) {
    this.props = z, this.context = H, this.refs = N, this.updater = P || w;
  }
  var C = _.prototype = new R();
  C.constructor = _, A(C, M.prototype), C.isPureReactComponent = !0;
  var Y = Array.isArray;
  function q() {
  }
  var B = { H: null, A: null, T: null, S: null }, Q = Object.prototype.hasOwnProperty;
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
  function Z(z) {
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
        switch (typeof z.status == "string" ? z.then(q, q) : (z.status = "pending", z.then(
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
            case b:
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
      return rt = rt(z), ct = lt === "" ? "." + T(z, 0) : lt, Y(rt) ? (P = "", ct != null && (P = ct.replace(ot, "$&/") + "/"), E(rt, H, P, "", function(St) {
        return St;
      })) : rt != null && (Z(rt) && (rt = ut(
        rt,
        P + (rt.key == null || z && z.key === rt.key ? "" : ("" + rt.key).replace(
          ot,
          "$&/"
        ) + "/") + ct
      )), H.push(rt)), 1;
    ct = 0;
    var tt = lt === "" ? "." : lt + ":";
    if (Y(z))
      for (var st = 0; st < z.length; st++)
        lt = z[st], ft = tt + T(lt, st), ct += E(
          lt,
          H,
          P,
          ft,
          rt
        );
    else if (st = S(z), typeof st == "function")
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
  function L(z) {
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
  var X = typeof reportError == "function" ? reportError : function(z) {
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
      if (!Z(z))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return z;
    }
  };
  return wt.Activity = y, wt.Children = nt, wt.Component = M, wt.Fragment = o, wt.Profiler = s, wt.PureComponent = _, wt.StrictMode = u, wt.Suspense = p, wt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B, wt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(z) {
      return B.H.useMemoCache(z);
    }
  }, wt.cache = function(z) {
    return function() {
      return z.apply(null, arguments);
    };
  }, wt.cacheSignal = function() {
    return null;
  }, wt.cloneElement = function(z, H, P) {
    if (z == null)
      throw Error(
        "The argument must be a React element, but you passed " + z + "."
      );
    var lt = A({}, z.props), rt = z.key;
    if (H != null)
      for (ft in H.key !== void 0 && (rt = "" + H.key), H)
        !Q.call(H, ft) || ft === "key" || ft === "__self" || ft === "__source" || ft === "ref" && H.ref === void 0 || (lt[ft] = H[ft]);
    var ft = arguments.length - 2;
    if (ft === 1) lt.children = P;
    else if (1 < ft) {
      for (var ct = Array(ft), tt = 0; tt < ft; tt++)
        ct[tt] = arguments[tt + 2];
      lt.children = ct;
    }
    return J(z.type, rt, lt);
  }, wt.createContext = function(z) {
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
  }, wt.createElement = function(z, H, P) {
    var lt, rt = {}, ft = null;
    if (H != null)
      for (lt in H.key !== void 0 && (ft = "" + H.key), H)
        Q.call(H, lt) && lt !== "key" && lt !== "__self" && lt !== "__source" && (rt[lt] = H[lt]);
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
  }, wt.createRef = function() {
    return { current: null };
  }, wt.forwardRef = function(z) {
    return { $$typeof: g, render: z };
  }, wt.isValidElement = Z, wt.lazy = function(z) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: z },
      _init: L
    };
  }, wt.memo = function(z, H) {
    return {
      $$typeof: h,
      type: z,
      compare: H === void 0 ? null : H
    };
  }, wt.startTransition = function(z) {
    var H = B.T, P = {};
    B.T = P;
    try {
      var lt = z(), rt = B.S;
      rt !== null && rt(P, lt), typeof lt == "object" && lt !== null && typeof lt.then == "function" && lt.then(q, X);
    } catch (ft) {
      X(ft);
    } finally {
      H !== null && P.types !== null && (H.types = P.types), B.T = H;
    }
  }, wt.unstable_useCacheRefresh = function() {
    return B.H.useCacheRefresh();
  }, wt.use = function(z) {
    return B.H.use(z);
  }, wt.useActionState = function(z, H, P) {
    return B.H.useActionState(z, H, P);
  }, wt.useCallback = function(z, H) {
    return B.H.useCallback(z, H);
  }, wt.useContext = function(z) {
    return B.H.useContext(z);
  }, wt.useDebugValue = function() {
  }, wt.useDeferredValue = function(z, H) {
    return B.H.useDeferredValue(z, H);
  }, wt.useEffect = function(z, H) {
    return B.H.useEffect(z, H);
  }, wt.useEffectEvent = function(z) {
    return B.H.useEffectEvent(z);
  }, wt.useId = function() {
    return B.H.useId();
  }, wt.useImperativeHandle = function(z, H, P) {
    return B.H.useImperativeHandle(z, H, P);
  }, wt.useInsertionEffect = function(z, H) {
    return B.H.useInsertionEffect(z, H);
  }, wt.useLayoutEffect = function(z, H) {
    return B.H.useLayoutEffect(z, H);
  }, wt.useMemo = function(z, H) {
    return B.H.useMemo(z, H);
  }, wt.useOptimistic = function(z, H) {
    return B.H.useOptimistic(z, H);
  }, wt.useReducer = function(z, H, P) {
    return B.H.useReducer(z, H, P);
  }, wt.useRef = function(z) {
    return B.H.useRef(z);
  }, wt.useState = function(z) {
    return B.H.useState(z);
  }, wt.useSyncExternalStore = function(z, H, P) {
    return B.H.useSyncExternalStore(
      z,
      H,
      P
    );
  }, wt.useTransition = function() {
    return B.H.useTransition();
  }, wt.version = "19.2.7", wt;
}
var Im;
function To() {
  return Im || (Im = 1, ff.exports = G1()), ff.exports;
}
var W = To();
const Q1 = /* @__PURE__ */ zp(W);
var df = { exports: {} }, ro = {}, hf = { exports: {} }, gf = {};
var Pm;
function K1() {
  return Pm || (Pm = 1, (function(n) {
    function i(E, O) {
      var L = E.length;
      E.push(O);
      t: for (; 0 < L; ) {
        var X = L - 1 >>> 1, nt = E[X];
        if (0 < s(nt, O))
          E[X] = O, E[L] = nt, L = X;
        else break t;
      }
    }
    function o(E) {
      return E.length === 0 ? null : E[0];
    }
    function u(E) {
      if (E.length === 0) return null;
      var O = E[0], L = E.pop();
      if (L !== O) {
        E[0] = L;
        t: for (var X = 0, nt = E.length, z = nt >>> 1; X < z; ) {
          var H = 2 * (X + 1) - 1, P = E[H], lt = H + 1, rt = E[lt];
          if (0 > s(P, L))
            lt < nt && 0 > s(rt, P) ? (E[X] = rt, E[lt] = L, X = lt) : (E[X] = P, E[H] = L, X = H);
          else if (lt < nt && 0 > s(rt, L))
            E[X] = rt, E[lt] = L, X = lt;
          else break t;
        }
      }
      return O;
    }
    function s(E, O) {
      var L = E.sortIndex - O.sortIndex;
      return L !== 0 ? L : E.id - O.id;
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
    var p = [], h = [], b = 1, y = null, v = 3, S = !1, w = !1, A = !1, N = !1, M = typeof setTimeout == "function" ? setTimeout : null, R = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function C(E) {
      for (var O = o(h); O !== null; ) {
        if (O.callback === null) u(h);
        else if (O.startTime <= E)
          u(h), O.sortIndex = O.expirationTime, i(p, O);
        else break;
        O = o(h);
      }
    }
    function Y(E) {
      if (A = !1, C(E), !w)
        if (o(p) !== null)
          w = !0, q || (q = !0, I());
        else {
          var O = o(h);
          O !== null && V(Y, O.startTime - E);
        }
    }
    var q = !1, B = -1, Q = 5, J = -1;
    function ut() {
      return N ? !0 : !(n.unstable_now() - J < Q);
    }
    function Z() {
      if (N = !1, q) {
        var E = n.unstable_now();
        J = E;
        var O = !0;
        try {
          t: {
            w = !1, A && (A = !1, R(B), B = -1), S = !0;
            var L = v;
            try {
              e: {
                for (C(E), y = o(p); y !== null && !(y.expirationTime > E && ut()); ) {
                  var X = y.callback;
                  if (typeof X == "function") {
                    y.callback = null, v = y.priorityLevel;
                    var nt = X(
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
                    Y,
                    z.startTime - E
                  ), O = !1;
                }
              }
              break t;
            } finally {
              y = null, v = L, S = !1;
            }
            O = void 0;
          }
        } finally {
          O ? I() : q = !1;
        }
      }
    }
    var I;
    if (typeof _ == "function")
      I = function() {
        _(Z);
      };
    else if (typeof MessageChannel < "u") {
      var ot = new MessageChannel(), T = ot.port2;
      ot.port1.onmessage = Z, I = function() {
        T.postMessage(null);
      };
    } else
      I = function() {
        M(Z, 0);
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
      ) : Q = 0 < E ? Math.floor(1e3 / E) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, n.unstable_next = function(E) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = v;
      }
      var L = v;
      v = O;
      try {
        return E();
      } finally {
        v = L;
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
      var L = v;
      v = E;
      try {
        return O();
      } finally {
        v = L;
      }
    }, n.unstable_scheduleCallback = function(E, O, L) {
      var X = n.unstable_now();
      switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? X + L : X) : L = X, E) {
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
      return nt = L + nt, E = {
        id: b++,
        callback: O,
        priorityLevel: E,
        startTime: L,
        expirationTime: nt,
        sortIndex: -1
      }, L > X ? (E.sortIndex = L, i(h, E), o(p) === null && E === o(h) && (A ? (R(B), B = -1) : A = !0, V(Y, L - X))) : (E.sortIndex = nt, i(p, E), w || S || (w = !0, q || (q = !0, I()))), E;
    }, n.unstable_shouldYield = ut, n.unstable_wrapCallback = function(E) {
      var O = v;
      return function() {
        var L = v;
        v = O;
        try {
          return E.apply(this, arguments);
        } finally {
          v = L;
        }
      };
    };
  })(gf)), gf;
}
var t0;
function J1() {
  return t0 || (t0 = 1, hf.exports = K1()), hf.exports;
}
var mf = { exports: {} }, ve = {};
var e0;
function F1() {
  if (e0) return ve;
  e0 = 1;
  var n = To();
  function i(p) {
    var h = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        h += "&args[]=" + encodeURIComponent(arguments[b]);
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
  function f(p, h, b) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: y == null ? null : "" + y,
      children: p,
      containerInfo: h,
      implementation: b
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(p, h) {
    if (p === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return ve.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, ve.createPortal = function(p, h) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(i(299));
    return f(p, h, null, b);
  }, ve.flushSync = function(p) {
    var h = d.T, b = u.p;
    try {
      if (d.T = null, u.p = 2, p) return p();
    } finally {
      d.T = h, u.p = b, u.d.f();
    }
  }, ve.preconnect = function(p, h) {
    typeof p == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, u.d.C(p, h));
  }, ve.prefetchDNS = function(p) {
    typeof p == "string" && u.d.D(p);
  }, ve.preinit = function(p, h) {
    if (typeof p == "string" && h && typeof h.as == "string") {
      var b = h.as, y = g(b, h.crossOrigin), v = typeof h.integrity == "string" ? h.integrity : void 0, S = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      b === "style" ? u.d.S(
        p,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: y,
          integrity: v,
          fetchPriority: S
        }
      ) : b === "script" && u.d.X(p, {
        crossOrigin: y,
        integrity: v,
        fetchPriority: S,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, ve.preinitModule = function(p, h) {
    if (typeof p == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var b = g(
            h.as,
            h.crossOrigin
          );
          u.d.M(p, {
            crossOrigin: b,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && u.d.M(p);
  }, ve.preload = function(p, h) {
    if (typeof p == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var b = h.as, y = g(b, h.crossOrigin);
      u.d.L(p, b, {
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
  }, ve.preloadModule = function(p, h) {
    if (typeof p == "string")
      if (h) {
        var b = g(h.as, h.crossOrigin);
        u.d.m(p, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: b,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else u.d.m(p);
  }, ve.requestFormReset = function(p) {
    u.d.r(p);
  }, ve.unstable_batchedUpdates = function(p, h) {
    return p(h);
  }, ve.useFormState = function(p, h, b) {
    return d.H.useFormState(p, h, b);
  }, ve.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, ve.version = "19.2.7", ve;
}
var n0;
function Mp() {
  if (n0) return mf.exports;
  n0 = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), mf.exports = F1(), mf.exports;
}
var l0;
function W1() {
  if (l0) return ro;
  l0 = 1;
  var n = J1(), i = To(), o = Mp();
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
  function b(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = b(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var y = Object.assign, v = /* @__PURE__ */ Symbol.for("react.element"), S = /* @__PURE__ */ Symbol.for("react.transitional.element"), w = /* @__PURE__ */ Symbol.for("react.portal"), A = /* @__PURE__ */ Symbol.for("react.fragment"), N = /* @__PURE__ */ Symbol.for("react.strict_mode"), M = /* @__PURE__ */ Symbol.for("react.profiler"), R = /* @__PURE__ */ Symbol.for("react.consumer"), _ = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), Y = /* @__PURE__ */ Symbol.for("react.suspense"), q = /* @__PURE__ */ Symbol.for("react.suspense_list"), B = /* @__PURE__ */ Symbol.for("react.memo"), Q = /* @__PURE__ */ Symbol.for("react.lazy"), J = /* @__PURE__ */ Symbol.for("react.activity"), ut = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Z = Symbol.iterator;
  function I(t) {
    return t === null || typeof t != "object" ? null : (t = Z && t[Z] || t["@@iterator"], typeof t == "function" ? t : null);
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
      case Y:
        return "Suspense";
      case q:
        return "SuspenseList";
      case J:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case w:
          return "Portal";
        case _:
          return t.displayName || "Context";
        case R:
          return (t._context.displayName || "Context") + ".Consumer";
        case C:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case B:
          return e = t.displayName || null, e !== null ? e : T(t.type) || "Memo";
        case Q:
          e = t._payload, t = t._init;
          try {
            return T(t(e));
          } catch {
          }
      }
    return null;
  }
  var V = Array.isArray, E = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, X = [], nt = -1;
  function z(t) {
    return { current: t };
  }
  function H(t) {
    0 > nt || (t.current = X[nt], X[nt] = null, nt--);
  }
  function P(t, e) {
    nt++, X[nt] = t.current, t.current = e;
  }
  var lt = z(null), rt = z(null), ft = z(null), ct = z(null);
  function tt(t, e) {
    switch (P(ft, e), P(rt, t), P(lt, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? xm(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = xm(e), t = _m(e, t);
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
  function St(t) {
    t.memoizedState !== null && P(ct, t);
    var e = lt.current, l = _m(e, t.type);
    e !== l && (P(rt, t), P(lt, l));
  }
  function _t(t) {
    rt.current === t && (H(lt), H(rt)), ct.current === t && (H(ct), ao._currentValue = L);
  }
  var gt, yt;
  function Et(t) {
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
  var Rt = !1;
  function $t(t, e) {
    if (!t || Rt) return "";
    Rt = !0;
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
`), G = x.split(`
`);
        for (r = a = 0; a < D.length && !D[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; r < G.length && !G[r].includes(
          "DetermineComponentFrameRoot"
        ); )
          r++;
        if (a === D.length || r === G.length)
          for (a = D.length - 1, r = G.length - 1; 1 <= a && 0 <= r && D[a] !== G[r]; )
            r--;
        for (; 1 <= a && 0 <= r; a--, r--)
          if (D[a] !== G[r]) {
            if (a !== 1 || r !== 1)
              do
                if (a--, r--, 0 > r || D[a] !== G[r]) {
                  var et = `
` + D[a].replace(" at new ", " at ");
                  return t.displayName && et.includes("<anonymous>") && (et = et.replace("<anonymous>", t.displayName)), et;
                }
              while (1 <= a && 0 <= r);
            break;
          }
      }
    } finally {
      Rt = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? Et(l) : "";
  }
  function pe(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Et(t.type);
      case 16:
        return Et("Lazy");
      case 13:
        return t.child !== e && e !== null ? Et("Suspense Fallback") : Et("Suspense");
      case 19:
        return Et("SuspenseList");
      case 0:
      case 15:
        return $t(t.type, !1);
      case 11:
        return $t(t.type.render, !1);
      case 1:
        return $t(t.type, !0);
      case 31:
        return Et("Activity");
      default:
        return "";
    }
  }
  function Qe(t) {
    try {
      var e = "", l = null;
      do
        e += pe(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var we = Object.prototype.hasOwnProperty, Ee = n.unstable_scheduleCallback, He = n.unstable_cancelCallback, Dl = n.unstable_shouldYield, Mn = n.unstable_requestPaint, It = n.unstable_now, ke = n.unstable_getCurrentPriorityLevel, Ke = n.unstable_ImmediatePriority, Je = n.unstable_UserBlockingPriority, Fe = n.unstable_NormalPriority, Kr = n.unstable_LowPriority, ca = n.unstable_IdlePriority, Jr = n.log, Fr = n.unstable_setDisableYieldValue, Ol = null, xe = null;
  function yn(t) {
    if (typeof Jr == "function" && Fr(t), xe && typeof xe.setStrictMode == "function")
      try {
        xe.setStrictMode(Ol, t);
      } catch {
      }
  }
  var _e = Math.clz32 ? Math.clz32 : Pr, Wr = Math.log, Ir = Math.LN2;
  function Pr(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Wr(t) / Ir | 0) | 0;
  }
  var sa = 256, fa = 262144, da = 4194304;
  function Nn(t) {
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
  function ha(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var r = 0, c = t.suspendedLanes, m = t.pingedLanes;
    t = t.warmLanes;
    var x = a & 134217727;
    return x !== 0 ? (a = x & ~c, a !== 0 ? r = Nn(a) : (m &= x, m !== 0 ? r = Nn(m) : l || (l = x & ~t, l !== 0 && (r = Nn(l))))) : (x = a & ~c, x !== 0 ? r = Nn(x) : m !== 0 ? r = Nn(m) : l || (l = a & ~t, l !== 0 && (r = Nn(l)))), r === 0 ? 0 : e !== 0 && e !== r && (e & c) === 0 && (c = r & -r, l = e & -e, c >= l || c === 32 && (l & 4194048) !== 0) ? e : r;
  }
  function Rl(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function tc(t, e) {
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
  function qo() {
    var t = da;
    return da <<= 1, (da & 62914560) === 0 && (da = 4194304), t;
  }
  function fi(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Hl(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function ec(t, e, l, a, r, c) {
    var m = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var x = t.entanglements, D = t.expirationTimes, G = t.hiddenUpdates;
    for (l = m & ~l; 0 < l; ) {
      var et = 31 - _e(l), it = 1 << et;
      x[et] = 0, D[et] = -1;
      var K = G[et];
      if (K !== null)
        for (G[et] = null, et = 0; et < K.length; et++) {
          var F = K[et];
          F !== null && (F.lane &= -536870913);
        }
      l &= ~it;
    }
    a !== 0 && jo(t, a, 0), c !== 0 && r === 0 && t.tag !== 0 && (t.suspendedLanes |= c & ~(m & ~e));
  }
  function jo(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - _e(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
  }
  function Yo(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var a = 31 - _e(l), r = 1 << a;
      r & e | t[a] & e && (t[a] |= e), l &= ~r;
    }
  }
  function Lo(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : di(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function di(t) {
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
  function hi(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Vo() {
    var t = O.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : $m(t.type));
  }
  function Xo(t, e) {
    var l = O.p;
    try {
      return O.p = t, e();
    } finally {
      O.p = l;
    }
  }
  var vn = Math.random().toString(36).slice(2), ce = "__reactFiber$" + vn, ye = "__reactProps$" + vn, An = "__reactContainer$" + vn, ga = "__reactEvents$" + vn, $o = "__reactListeners$" + vn, nc = "__reactHandles$" + vn, Zo = "__reactResources$" + vn, kl = "__reactMarker$" + vn;
  function gi(t) {
    delete t[ce], delete t[ye], delete t[ga], delete t[$o], delete t[nc];
  }
  function In(t) {
    var e = t[ce];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[An] || l[ce]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = Am(t); t !== null; ) {
            if (l = t[ce]) return l;
            t = Am(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function Pn(t) {
    if (t = t[ce] || t[An]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function tl(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(u(33));
  }
  function el(t) {
    var e = t[Zo];
    return e || (e = t[Zo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function ne(t) {
    t[kl] = !0;
  }
  var Go = /* @__PURE__ */ new Set(), Qo = {};
  function Cn(t, e) {
    nl(t, e), nl(t + "Capture", e);
  }
  function nl(t, e) {
    for (Qo[t] = e, t = 0; t < e.length; t++)
      Go.add(e[t]);
  }
  var lc = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ko = {}, mi = {};
  function ac(t) {
    return we.call(mi, t) ? !0 : we.call(Ko, t) ? !1 : lc.test(t) ? mi[t] = !0 : (Ko[t] = !0, !1);
  }
  function ma(t, e, l) {
    if (ac(e))
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
  function pa(t, e, l) {
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
  function un(t, e, l, a) {
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
  function ze(t) {
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
  function Jo(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function ic(t, e, l) {
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
  function pi(t) {
    if (!t._valueTracker) {
      var e = Jo(t) ? "checked" : "value";
      t._valueTracker = ic(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function yi(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), a = "";
    return t && (a = Jo(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== l ? (e.setValue(t), !0) : !1;
  }
  function ya(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Fo = /[\n"\\]/g;
  function Me(t) {
    return t.replace(
      Fo,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function vi(t, e, l, a, r, c, m, x) {
    t.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.type = m : t.removeAttribute("type"), e != null ? m === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + ze(e)) : t.value !== "" + ze(e) && (t.value = "" + ze(e)) : m !== "submit" && m !== "reset" || t.removeAttribute("value"), e != null ? bi(t, m, ze(e)) : l != null ? bi(t, m, ze(l)) : a != null && t.removeAttribute("value"), r == null && c != null && (t.defaultChecked = !!c), r != null && (t.checked = r && typeof r != "function" && typeof r != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? t.name = "" + ze(x) : t.removeAttribute("name");
  }
  function va(t, e, l, a, r, c, m, x) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.type = c), e != null || l != null) {
      if (!(c !== "submit" && c !== "reset" || e != null)) {
        pi(t);
        return;
      }
      l = l != null ? "" + ze(l) : "", e = e != null ? "" + ze(e) : l, x || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? r, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = x ? t.checked : !!a, t.defaultChecked = !!a, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (t.name = m), pi(t);
  }
  function bi(t, e, l) {
    e === "number" && ya(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
  }
  function ll(t, e, l, a) {
    if (t = t.options, e) {
      e = {};
      for (var r = 0; r < l.length; r++)
        e["$" + l[r]] = !0;
      for (l = 0; l < t.length; l++)
        r = e.hasOwnProperty("$" + t[l].value), t[l].selected !== r && (t[l].selected = r), r && a && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + ze(l), e = null, r = 0; r < t.length; r++) {
        if (t[r].value === l) {
          t[r].selected = !0, a && (t[r].defaultSelected = !0);
          return;
        }
        e !== null || t[r].disabled || (e = t[r]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function xi(t, e, l) {
    if (e != null && (e = "" + ze(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + ze(l) : "";
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
    l = ze(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), pi(t);
  }
  function ba(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var qv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function yd(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || qv.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
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
  function oc(t) {
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
  var jv = /* @__PURE__ */ new Map([
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
  ]), Yv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Wo(t) {
    return Yv.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Tn() {
  }
  var uc = null;
  function rc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var xa = null, _a = null;
  function bd(t) {
    var e = Pn(t);
    if (e && (t = e.stateNode)) {
      var l = t[ye] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (vi(
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
              'input[name="' + Me(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var r = a[ye] || null;
                if (!r) throw Error(u(90));
                vi(
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
              a = l[e], a.form === t.form && yi(a);
          }
          break t;
        case "textarea":
          xi(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && ll(t, !!l.multiple, e, !1);
      }
    }
  }
  var cc = !1;
  function xd(t, e, l) {
    if (cc) return t(e, l);
    cc = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (cc = !1, (xa !== null || _a !== null) && (qu(), xa && (e = xa, t = _a, _a = xa = null, bd(e), t)))
        for (e = 0; e < t.length; e++) bd(t[e]);
    }
  }
  function _i(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[ye] || null;
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
  var Dn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), sc = !1;
  if (Dn)
    try {
      var Si = {};
      Object.defineProperty(Si, "passive", {
        get: function() {
          sc = !0;
        }
      }), window.addEventListener("test", Si, Si), window.removeEventListener("test", Si, Si);
    } catch {
      sc = !1;
    }
  var al = null, fc = null, Io = null;
  function _d() {
    if (Io) return Io;
    var t, e = fc, l = e.length, a, r = "value" in al ? al.value : al.textContent, c = r.length;
    for (t = 0; t < l && e[t] === r[t]; t++) ;
    var m = l - t;
    for (a = 1; a <= m && e[l - a] === r[c - a]; a++) ;
    return Io = r.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Po(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function tu() {
    return !0;
  }
  function Sd() {
    return !1;
  }
  function Ne(t) {
    function e(l, a, r, c, m) {
      this._reactName = l, this._targetInst = r, this.type = a, this.nativeEvent = c, this.target = m, this.currentTarget = null;
      for (var x in t)
        t.hasOwnProperty(x) && (l = t[x], this[x] = l ? l(c) : c[x]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? tu : Sd, this.isPropagationStopped = Sd, this;
    }
    return y(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = tu);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = tu);
      },
      persist: function() {
      },
      isPersistent: tu
    }), e;
  }
  var Bl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, eu = Ne(Bl), wi = y({}, Bl, { view: 0, detail: 0 }), Lv = Ne(wi), dc, hc, Ei, nu = y({}, wi, {
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
    getModifierState: mc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Ei && (Ei && t.type === "mousemove" ? (dc = t.screenX - Ei.screenX, hc = t.screenY - Ei.screenY) : hc = dc = 0, Ei = t), dc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : hc;
    }
  }), wd = Ne(nu), Vv = y({}, nu, { dataTransfer: 0 }), Xv = Ne(Vv), $v = y({}, wi, { relatedTarget: 0 }), gc = Ne($v), Zv = y({}, Bl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Gv = Ne(Zv), Qv = y({}, Bl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Kv = Ne(Qv), Jv = y({}, Bl, { data: 0 }), Ed = Ne(Jv), Fv = {
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
  }, Wv = {
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
  }, Iv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Pv(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Iv[t]) ? !!e[t] : !1;
  }
  function mc() {
    return Pv;
  }
  var tb = y({}, wi, {
    key: function(t) {
      if (t.key) {
        var e = Fv[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Po(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Wv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: mc,
    charCode: function(t) {
      return t.type === "keypress" ? Po(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Po(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), eb = Ne(tb), nb = y({}, nu, {
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
  }), zd = Ne(nb), lb = y({}, wi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: mc
  }), ab = Ne(lb), ib = y({}, Bl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ob = Ne(ib), ub = y({}, nu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), rb = Ne(ub), cb = y({}, Bl, {
    newState: 0,
    oldState: 0
  }), sb = Ne(cb), fb = [9, 13, 27, 32], pc = Dn && "CompositionEvent" in window, zi = null;
  Dn && "documentMode" in document && (zi = document.documentMode);
  var db = Dn && "TextEvent" in window && !zi, Md = Dn && (!pc || zi && 8 < zi && 11 >= zi), Nd = " ", Ad = !1;
  function Cd(t, e) {
    switch (t) {
      case "keyup":
        return fb.indexOf(e.keyCode) !== -1;
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
  var Sa = !1;
  function hb(t, e) {
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
  function gb(t, e) {
    if (Sa)
      return t === "compositionend" || !pc && Cd(t, e) ? (t = _d(), Io = fc = al = null, Sa = !1, t) : null;
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
  var mb = {
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
    return e === "input" ? !!mb[t.type] : e === "textarea";
  }
  function Od(t, e, l, a) {
    xa ? _a ? _a.push(a) : _a = [a] : xa = a, e = Zu(e, "onChange"), 0 < e.length && (l = new eu(
      "onChange",
      "change",
      null,
      l,
      a
    ), t.push({ event: l, listeners: e }));
  }
  var Mi = null, Ni = null;
  function pb(t) {
    gm(t, 0);
  }
  function lu(t) {
    var e = tl(t);
    if (yi(e)) return t;
  }
  function Rd(t, e) {
    if (t === "change") return e;
  }
  var Hd = !1;
  if (Dn) {
    var yc;
    if (Dn) {
      var vc = "oninput" in document;
      if (!vc) {
        var kd = document.createElement("div");
        kd.setAttribute("oninput", "return;"), vc = typeof kd.oninput == "function";
      }
      yc = vc;
    } else yc = !1;
    Hd = yc && (!document.documentMode || 9 < document.documentMode);
  }
  function Bd() {
    Mi && (Mi.detachEvent("onpropertychange", Ud), Ni = Mi = null);
  }
  function Ud(t) {
    if (t.propertyName === "value" && lu(Ni)) {
      var e = [];
      Od(
        e,
        Ni,
        t,
        rc(t)
      ), xd(pb, e);
    }
  }
  function yb(t, e, l) {
    t === "focusin" ? (Bd(), Mi = e, Ni = l, Mi.attachEvent("onpropertychange", Ud)) : t === "focusout" && Bd();
  }
  function vb(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return lu(Ni);
  }
  function bb(t, e) {
    if (t === "click") return lu(e);
  }
  function xb(t, e) {
    if (t === "input" || t === "change")
      return lu(e);
  }
  function _b(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Be = typeof Object.is == "function" ? Object.is : _b;
  function Ai(t, e) {
    if (Be(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var r = l[a];
      if (!we.call(e, r) || !Be(t[r], e[r]))
        return !1;
    }
    return !0;
  }
  function qd(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function jd(t, e) {
    var l = qd(t);
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
      l = qd(l);
    }
  }
  function Yd(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Yd(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Ld(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = ya(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = ya(t.document);
    }
    return e;
  }
  function bc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Sb = Dn && "documentMode" in document && 11 >= document.documentMode, wa = null, xc = null, Ci = null, _c = !1;
  function Vd(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    _c || wa == null || wa !== ya(a) || (a = wa, "selectionStart" in a && bc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Ci && Ai(Ci, a) || (Ci = a, a = Zu(xc, "onSelect"), 0 < a.length && (e = new eu(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }), e.target = wa)));
  }
  function Ul(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var Ea = {
    animationend: Ul("Animation", "AnimationEnd"),
    animationiteration: Ul("Animation", "AnimationIteration"),
    animationstart: Ul("Animation", "AnimationStart"),
    transitionrun: Ul("Transition", "TransitionRun"),
    transitionstart: Ul("Transition", "TransitionStart"),
    transitioncancel: Ul("Transition", "TransitionCancel"),
    transitionend: Ul("Transition", "TransitionEnd")
  }, Sc = {}, Xd = {};
  Dn && (Xd = document.createElement("div").style, "AnimationEvent" in window || (delete Ea.animationend.animation, delete Ea.animationiteration.animation, delete Ea.animationstart.animation), "TransitionEvent" in window || delete Ea.transitionend.transition);
  function ql(t) {
    if (Sc[t]) return Sc[t];
    if (!Ea[t]) return t;
    var e = Ea[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in Xd)
        return Sc[t] = e[l];
    return t;
  }
  var $d = ql("animationend"), Zd = ql("animationiteration"), Gd = ql("animationstart"), wb = ql("transitionrun"), Eb = ql("transitionstart"), zb = ql("transitioncancel"), Qd = ql("transitionend"), Kd = /* @__PURE__ */ new Map(), wc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  wc.push("scrollEnd");
  function rn(t, e) {
    Kd.set(t, e), Cn(e, [t]);
  }
  var au = typeof reportError == "function" ? reportError : function(t) {
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
  }, We = [], za = 0, Ec = 0;
  function iu() {
    for (var t = za, e = Ec = za = 0; e < t; ) {
      var l = We[e];
      We[e++] = null;
      var a = We[e];
      We[e++] = null;
      var r = We[e];
      We[e++] = null;
      var c = We[e];
      if (We[e++] = null, a !== null && r !== null) {
        var m = a.pending;
        m === null ? r.next = r : (r.next = m.next, m.next = r), a.pending = r;
      }
      c !== 0 && Jd(l, r, c);
    }
  }
  function ou(t, e, l, a) {
    We[za++] = t, We[za++] = e, We[za++] = l, We[za++] = a, Ec |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function zc(t, e, l, a) {
    return ou(t, e, l, a), uu(t);
  }
  function jl(t, e) {
    return ou(t, null, null, e), uu(t);
  }
  function Jd(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var r = !1, c = t.return; c !== null; )
      c.childLanes |= l, a = c.alternate, a !== null && (a.childLanes |= l), c.tag === 22 && (t = c.stateNode, t === null || t._visibility & 1 || (r = !0)), t = c, c = c.return;
    return t.tag === 3 ? (c = t.stateNode, r && e !== null && (r = 31 - _e(l), t = c.hiddenUpdates, a = t[r], a === null ? t[r] = [e] : a.push(e), e.lane = l | 536870912), c) : null;
  }
  function uu(t) {
    if (50 < Wi)
      throw Wi = 0, Hs = null, Error(u(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ma = {};
  function Mb(t, e, l, a) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ue(t, e, l, a) {
    return new Mb(t, e, l, a);
  }
  function Mc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function On(t, e) {
    var l = t.alternate;
    return l === null ? (l = Ue(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function Fd(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function ru(t, e, l, a, r, c) {
    var m = 0;
    if (a = t, typeof t == "function") Mc(t) && (m = 1);
    else if (typeof t == "string")
      m = D1(
        t,
        l,
        lt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case J:
          return t = Ue(31, l, e, r), t.elementType = J, t.lanes = c, t;
        case A:
          return Yl(l.children, r, c, e);
        case N:
          m = 8, r |= 24;
          break;
        case M:
          return t = Ue(12, l, e, r | 2), t.elementType = M, t.lanes = c, t;
        case Y:
          return t = Ue(13, l, e, r), t.elementType = Y, t.lanes = c, t;
        case q:
          return t = Ue(19, l, e, r), t.elementType = q, t.lanes = c, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case _:
                m = 10;
                break t;
              case R:
                m = 9;
                break t;
              case C:
                m = 11;
                break t;
              case B:
                m = 14;
                break t;
              case Q:
                m = 16, a = null;
                break t;
            }
          m = 29, l = Error(
            u(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = Ue(m, l, e, r), e.elementType = t, e.type = a, e.lanes = c, e;
  }
  function Yl(t, e, l, a) {
    return t = Ue(7, t, a, e), t.lanes = l, t;
  }
  function Nc(t, e, l) {
    return t = Ue(6, t, null, e), t.lanes = l, t;
  }
  function Wd(t) {
    var e = Ue(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Ac(t, e, l) {
    return e = Ue(
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
  function Ie(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Id.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Qe(e)
      }, Id.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Qe(e)
    };
  }
  var Na = [], Aa = 0, cu = null, Ti = 0, Pe = [], tn = 0, il = null, bn = 1, xn = "";
  function Rn(t, e) {
    Na[Aa++] = Ti, Na[Aa++] = cu, cu = t, Ti = e;
  }
  function Pd(t, e, l) {
    Pe[tn++] = bn, Pe[tn++] = xn, Pe[tn++] = il, il = t;
    var a = bn;
    t = xn;
    var r = 32 - _e(a) - 1;
    a &= ~(1 << r), l += 1;
    var c = 32 - _e(e) + r;
    if (30 < c) {
      var m = r - r % 5;
      c = (a & (1 << m) - 1).toString(32), a >>= m, r -= m, bn = 1 << 32 - _e(e) + r | l << r | a, xn = c + t;
    } else
      bn = 1 << c | l << r | a, xn = t;
  }
  function Cc(t) {
    t.return !== null && (Rn(t, 1), Pd(t, 1, 0));
  }
  function Tc(t) {
    for (; t === cu; )
      cu = Na[--Aa], Na[Aa] = null, Ti = Na[--Aa], Na[Aa] = null;
    for (; t === il; )
      il = Pe[--tn], Pe[tn] = null, xn = Pe[--tn], Pe[tn] = null, bn = Pe[--tn], Pe[tn] = null;
  }
  function th(t, e) {
    Pe[tn++] = bn, Pe[tn++] = xn, Pe[tn++] = il, bn = e.id, xn = e.overflow, il = t;
  }
  var de = null, Zt = null, Dt = !1, ol = null, en = !1, Dc = Error(u(519));
  function ul(t) {
    var e = Error(
      u(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Di(Ie(e, t)), Dc;
  }
  function eh(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[ce] = t, e[ye] = a, l) {
      case "dialog":
        At("cancel", e), At("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        At("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Pi.length; l++)
          At(Pi[l], e);
        break;
      case "source":
        At("error", e);
        break;
      case "img":
      case "image":
      case "link":
        At("error", e), At("load", e);
        break;
      case "details":
        At("toggle", e);
        break;
      case "input":
        At("invalid", e), va(
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
        At("invalid", e);
        break;
      case "textarea":
        At("invalid", e), pd(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || vm(e.textContent, l) ? (a.popover != null && (At("beforetoggle", e), At("toggle", e)), a.onScroll != null && At("scroll", e), a.onScrollEnd != null && At("scrollend", e), a.onClick != null && (e.onclick = Tn), e = !0) : e = !1, e || ul(t, !0);
  }
  function nh(t) {
    for (de = t.return; de; )
      switch (de.tag) {
        case 5:
        case 31:
        case 13:
          en = !1;
          return;
        case 27:
        case 3:
          en = !0;
          return;
        default:
          de = de.return;
      }
  }
  function Ca(t) {
    if (t !== de) return !1;
    if (!Dt) return nh(t), Dt = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Js(t.type, t.memoizedProps)), l = !l), l && Zt && ul(t), nh(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(u(317));
      Zt = Nm(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(u(317));
      Zt = Nm(t);
    } else
      e === 27 ? (e = Zt, _l(t.type) ? (t = tf, tf = null, Zt = t) : Zt = e) : Zt = de ? ln(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Ll() {
    Zt = de = null, Dt = !1;
  }
  function Oc() {
    var t = ol;
    return t !== null && (De === null ? De = t : De.push.apply(
      De,
      t
    ), ol = null), t;
  }
  function Di(t) {
    ol === null ? ol = [t] : ol.push(t);
  }
  var Rc = z(null), Vl = null, Hn = null;
  function rl(t, e, l) {
    P(Rc, e._currentValue), e._currentValue = l;
  }
  function kn(t) {
    t._currentValue = Rc.current, H(Rc);
  }
  function Hc(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function kc(t, e, l, a) {
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
              c.lanes |= l, x = c.alternate, x !== null && (x.lanes |= l), Hc(
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
        m.lanes |= l, c = m.alternate, c !== null && (c.lanes |= l), Hc(m, l, t), m = null;
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
  function Ta(t, e, l, a) {
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
          Be(r.pendingProps.value, m.value) || (t !== null ? t.push(x) : t = [x]);
        }
      } else if (r === ct.current) {
        if (m = r.alternate, m === null) throw Error(u(387));
        m.memoizedState.memoizedState !== r.memoizedState.memoizedState && (t !== null ? t.push(ao) : t = [ao]);
      }
      r = r.return;
    }
    t !== null && kc(
      e,
      t,
      l,
      a
    ), e.flags |= 262144;
  }
  function su(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Be(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Xl(t) {
    Vl = t, Hn = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function he(t) {
    return lh(Vl, t);
  }
  function fu(t, e) {
    return Vl === null && Xl(t), lh(t, e);
  }
  function lh(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, Hn === null) {
      if (t === null) throw Error(u(308));
      Hn = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Hn = Hn.next = e;
    return l;
  }
  var Nb = typeof AbortController < "u" ? AbortController : function() {
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
  }, Ab = n.unstable_scheduleCallback, Cb = n.unstable_NormalPriority, le = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Bc() {
    return {
      controller: new Nb(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Oi(t) {
    t.refCount--, t.refCount === 0 && Ab(Cb, function() {
      t.controller.abort();
    });
  }
  var Ri = null, Uc = 0, Da = 0, Oa = null;
  function Tb(t, e) {
    if (Ri === null) {
      var l = Ri = [];
      Uc = 0, Da = Ys(), Oa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return Uc++, e.then(ah, ah), e;
  }
  function ah() {
    if (--Uc === 0 && Ri !== null) {
      Oa !== null && (Oa.status = "fulfilled");
      var t = Ri;
      Ri = null, Da = 0, Oa = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Db(t, e) {
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
    Vg = It(), typeof e == "object" && e !== null && typeof e.then == "function" && Tb(t, e), ih !== null && ih(t, e);
  };
  var $l = z(null);
  function qc() {
    var t = $l.current;
    return t !== null ? t : Xt.pooledCache;
  }
  function du(t, e) {
    e === null ? P($l, $l.current) : P($l, e.pool);
  }
  function oh() {
    var t = qc();
    return t === null ? null : { parent: le._currentValue, pool: t };
  }
  var Ra = Error(u(460)), jc = Error(u(474)), hu = Error(u(542)), gu = { then: function() {
  } };
  function uh(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function rh(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(Tn, Tn), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, sh(t), t;
      default:
        if (typeof e.status == "string") e.then(Tn, Tn);
        else {
          if (t = Xt, t !== null && 100 < t.shellSuspendCounter)
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
        throw Gl = e, Ra;
    }
  }
  function Zl(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Gl = l, Ra) : l;
    }
  }
  var Gl = null;
  function ch() {
    if (Gl === null) throw Error(u(459));
    var t = Gl;
    return Gl = null, t;
  }
  function sh(t) {
    if (t === Ra || t === hu)
      throw Error(u(483));
  }
  var Ha = null, Hi = 0;
  function mu(t) {
    var e = Hi;
    return Hi += 1, Ha === null && (Ha = []), rh(Ha, t, e);
  }
  function ki(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function pu(t, e) {
    throw e.$$typeof === v ? Error(u(525)) : (t = Object.prototype.toString.call(e), Error(
      u(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function fh(t) {
    function e(j, k) {
      if (t) {
        var $ = j.deletions;
        $ === null ? (j.deletions = [k], j.flags |= 16) : $.push(k);
      }
    }
    function l(j, k) {
      if (!t) return null;
      for (; k !== null; )
        e(j, k), k = k.sibling;
      return null;
    }
    function a(j) {
      for (var k = /* @__PURE__ */ new Map(); j !== null; )
        j.key !== null ? k.set(j.key, j) : k.set(j.index, j), j = j.sibling;
      return k;
    }
    function r(j, k) {
      return j = On(j, k), j.index = 0, j.sibling = null, j;
    }
    function c(j, k, $) {
      return j.index = $, t ? ($ = j.alternate, $ !== null ? ($ = $.index, $ < k ? (j.flags |= 67108866, k) : $) : (j.flags |= 67108866, k)) : (j.flags |= 1048576, k);
    }
    function m(j) {
      return t && j.alternate === null && (j.flags |= 67108866), j;
    }
    function x(j, k, $, at) {
      return k === null || k.tag !== 6 ? (k = Nc($, j.mode, at), k.return = j, k) : (k = r(k, $), k.return = j, k);
    }
    function D(j, k, $, at) {
      var pt = $.type;
      return pt === A ? et(
        j,
        k,
        $.props.children,
        at,
        $.key
      ) : k !== null && (k.elementType === pt || typeof pt == "object" && pt !== null && pt.$$typeof === Q && Zl(pt) === k.type) ? (k = r(k, $.props), ki(k, $), k.return = j, k) : (k = ru(
        $.type,
        $.key,
        $.props,
        null,
        j.mode,
        at
      ), ki(k, $), k.return = j, k);
    }
    function G(j, k, $, at) {
      return k === null || k.tag !== 4 || k.stateNode.containerInfo !== $.containerInfo || k.stateNode.implementation !== $.implementation ? (k = Ac($, j.mode, at), k.return = j, k) : (k = r(k, $.children || []), k.return = j, k);
    }
    function et(j, k, $, at, pt) {
      return k === null || k.tag !== 7 ? (k = Yl(
        $,
        j.mode,
        at,
        pt
      ), k.return = j, k) : (k = r(k, $), k.return = j, k);
    }
    function it(j, k, $) {
      if (typeof k == "string" && k !== "" || typeof k == "number" || typeof k == "bigint")
        return k = Nc(
          "" + k,
          j.mode,
          $
        ), k.return = j, k;
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case S:
            return $ = ru(
              k.type,
              k.key,
              k.props,
              null,
              j.mode,
              $
            ), ki($, k), $.return = j, $;
          case w:
            return k = Ac(
              k,
              j.mode,
              $
            ), k.return = j, k;
          case Q:
            return k = Zl(k), it(j, k, $);
        }
        if (V(k) || I(k))
          return k = Yl(
            k,
            j.mode,
            $,
            null
          ), k.return = j, k;
        if (typeof k.then == "function")
          return it(j, mu(k), $);
        if (k.$$typeof === _)
          return it(
            j,
            fu(j, k),
            $
          );
        pu(j, k);
      }
      return null;
    }
    function K(j, k, $, at) {
      var pt = k !== null ? k.key : null;
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return pt !== null ? null : x(j, k, "" + $, at);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case S:
            return $.key === pt ? D(j, k, $, at) : null;
          case w:
            return $.key === pt ? G(j, k, $, at) : null;
          case Q:
            return $ = Zl($), K(j, k, $, at);
        }
        if (V($) || I($))
          return pt !== null ? null : et(j, k, $, at, null);
        if (typeof $.then == "function")
          return K(
            j,
            k,
            mu($),
            at
          );
        if ($.$$typeof === _)
          return K(
            j,
            k,
            fu(j, $),
            at
          );
        pu(j, $);
      }
      return null;
    }
    function F(j, k, $, at, pt) {
      if (typeof at == "string" && at !== "" || typeof at == "number" || typeof at == "bigint")
        return j = j.get($) || null, x(k, j, "" + at, pt);
      if (typeof at == "object" && at !== null) {
        switch (at.$$typeof) {
          case S:
            return j = j.get(
              at.key === null ? $ : at.key
            ) || null, D(k, j, at, pt);
          case w:
            return j = j.get(
              at.key === null ? $ : at.key
            ) || null, G(k, j, at, pt);
          case Q:
            return at = Zl(at), F(
              j,
              k,
              $,
              at,
              pt
            );
        }
        if (V(at) || I(at))
          return j = j.get($) || null, et(k, j, at, pt, null);
        if (typeof at.then == "function")
          return F(
            j,
            k,
            $,
            mu(at),
            pt
          );
        if (at.$$typeof === _)
          return F(
            j,
            k,
            $,
            fu(k, at),
            pt
          );
        pu(k, at);
      }
      return null;
    }
    function dt(j, k, $, at) {
      for (var pt = null, Ht = null, ht = k, Mt = k = 0, Tt = null; ht !== null && Mt < $.length; Mt++) {
        ht.index > Mt ? (Tt = ht, ht = null) : Tt = ht.sibling;
        var kt = K(
          j,
          ht,
          $[Mt],
          at
        );
        if (kt === null) {
          ht === null && (ht = Tt);
          break;
        }
        t && ht && kt.alternate === null && e(j, ht), k = c(kt, k, Mt), Ht === null ? pt = kt : Ht.sibling = kt, Ht = kt, ht = Tt;
      }
      if (Mt === $.length)
        return l(j, ht), Dt && Rn(j, Mt), pt;
      if (ht === null) {
        for (; Mt < $.length; Mt++)
          ht = it(j, $[Mt], at), ht !== null && (k = c(
            ht,
            k,
            Mt
          ), Ht === null ? pt = ht : Ht.sibling = ht, Ht = ht);
        return Dt && Rn(j, Mt), pt;
      }
      for (ht = a(ht); Mt < $.length; Mt++)
        Tt = F(
          ht,
          j,
          Mt,
          $[Mt],
          at
        ), Tt !== null && (t && Tt.alternate !== null && ht.delete(
          Tt.key === null ? Mt : Tt.key
        ), k = c(
          Tt,
          k,
          Mt
        ), Ht === null ? pt = Tt : Ht.sibling = Tt, Ht = Tt);
      return t && ht.forEach(function(Ml) {
        return e(j, Ml);
      }), Dt && Rn(j, Mt), pt;
    }
    function vt(j, k, $, at) {
      if ($ == null) throw Error(u(151));
      for (var pt = null, Ht = null, ht = k, Mt = k = 0, Tt = null, kt = $.next(); ht !== null && !kt.done; Mt++, kt = $.next()) {
        ht.index > Mt ? (Tt = ht, ht = null) : Tt = ht.sibling;
        var Ml = K(j, ht, kt.value, at);
        if (Ml === null) {
          ht === null && (ht = Tt);
          break;
        }
        t && ht && Ml.alternate === null && e(j, ht), k = c(Ml, k, Mt), Ht === null ? pt = Ml : Ht.sibling = Ml, Ht = Ml, ht = Tt;
      }
      if (kt.done)
        return l(j, ht), Dt && Rn(j, Mt), pt;
      if (ht === null) {
        for (; !kt.done; Mt++, kt = $.next())
          kt = it(j, kt.value, at), kt !== null && (k = c(kt, k, Mt), Ht === null ? pt = kt : Ht.sibling = kt, Ht = kt);
        return Dt && Rn(j, Mt), pt;
      }
      for (ht = a(ht); !kt.done; Mt++, kt = $.next())
        kt = F(ht, j, Mt, kt.value, at), kt !== null && (t && kt.alternate !== null && ht.delete(kt.key === null ? Mt : kt.key), k = c(kt, k, Mt), Ht === null ? pt = kt : Ht.sibling = kt, Ht = kt);
      return t && ht.forEach(function(V1) {
        return e(j, V1);
      }), Dt && Rn(j, Mt), pt;
    }
    function Lt(j, k, $, at) {
      if (typeof $ == "object" && $ !== null && $.type === A && $.key === null && ($ = $.props.children), typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case S:
            t: {
              for (var pt = $.key; k !== null; ) {
                if (k.key === pt) {
                  if (pt = $.type, pt === A) {
                    if (k.tag === 7) {
                      l(
                        j,
                        k.sibling
                      ), at = r(
                        k,
                        $.props.children
                      ), at.return = j, j = at;
                      break t;
                    }
                  } else if (k.elementType === pt || typeof pt == "object" && pt !== null && pt.$$typeof === Q && Zl(pt) === k.type) {
                    l(
                      j,
                      k.sibling
                    ), at = r(k, $.props), ki(at, $), at.return = j, j = at;
                    break t;
                  }
                  l(j, k);
                  break;
                } else e(j, k);
                k = k.sibling;
              }
              $.type === A ? (at = Yl(
                $.props.children,
                j.mode,
                at,
                $.key
              ), at.return = j, j = at) : (at = ru(
                $.type,
                $.key,
                $.props,
                null,
                j.mode,
                at
              ), ki(at, $), at.return = j, j = at);
            }
            return m(j);
          case w:
            t: {
              for (pt = $.key; k !== null; ) {
                if (k.key === pt)
                  if (k.tag === 4 && k.stateNode.containerInfo === $.containerInfo && k.stateNode.implementation === $.implementation) {
                    l(
                      j,
                      k.sibling
                    ), at = r(k, $.children || []), at.return = j, j = at;
                    break t;
                  } else {
                    l(j, k);
                    break;
                  }
                else e(j, k);
                k = k.sibling;
              }
              at = Ac($, j.mode, at), at.return = j, j = at;
            }
            return m(j);
          case Q:
            return $ = Zl($), Lt(
              j,
              k,
              $,
              at
            );
        }
        if (V($))
          return dt(
            j,
            k,
            $,
            at
          );
        if (I($)) {
          if (pt = I($), typeof pt != "function") throw Error(u(150));
          return $ = pt.call($), vt(
            j,
            k,
            $,
            at
          );
        }
        if (typeof $.then == "function")
          return Lt(
            j,
            k,
            mu($),
            at
          );
        if ($.$$typeof === _)
          return Lt(
            j,
            k,
            fu(j, $),
            at
          );
        pu(j, $);
      }
      return typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint" ? ($ = "" + $, k !== null && k.tag === 6 ? (l(j, k.sibling), at = r(k, $), at.return = j, j = at) : (l(j, k), at = Nc($, j.mode, at), at.return = j, j = at), m(j)) : l(j, k);
    }
    return function(j, k, $, at) {
      try {
        Hi = 0;
        var pt = Lt(
          j,
          k,
          $,
          at
        );
        return Ha = null, pt;
      } catch (ht) {
        if (ht === Ra || ht === hu) throw ht;
        var Ht = Ue(29, ht, null, j.mode);
        return Ht.lanes = at, Ht.return = j, Ht;
      }
    };
  }
  var Ql = fh(!0), dh = fh(!1), cl = !1;
  function Yc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Lc(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function sl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function fl(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (Bt & 2) !== 0) {
      var r = a.pending;
      return r === null ? e.next = e : (e.next = r.next, r.next = e), a.pending = e, e = uu(t), Jd(t, null, l), e;
    }
    return ou(t, a, e, l), uu(t);
  }
  function Bi(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, Yo(t, l);
    }
  }
  function Vc(t, e) {
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
  var Xc = !1;
  function Ui() {
    if (Xc) {
      var t = Oa;
      if (t !== null) throw t;
    }
  }
  function qi(t, e, l, a) {
    Xc = !1;
    var r = t.updateQueue;
    cl = !1;
    var c = r.firstBaseUpdate, m = r.lastBaseUpdate, x = r.shared.pending;
    if (x !== null) {
      r.shared.pending = null;
      var D = x, G = D.next;
      D.next = null, m === null ? c = G : m.next = G, m = D;
      var et = t.alternate;
      et !== null && (et = et.updateQueue, x = et.lastBaseUpdate, x !== m && (x === null ? et.firstBaseUpdate = G : x.next = G, et.lastBaseUpdate = D));
    }
    if (c !== null) {
      var it = r.baseState;
      m = 0, et = G = D = null, x = c;
      do {
        var K = x.lane & -536870913, F = K !== x.lane;
        if (F ? (Ct & K) === K : (a & K) === K) {
          K !== 0 && K === Da && (Xc = !0), et !== null && (et = et.next = {
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: null,
            next: null
          });
          t: {
            var dt = t, vt = x;
            K = e;
            var Lt = l;
            switch (vt.tag) {
              case 1:
                if (dt = vt.payload, typeof dt == "function") {
                  it = dt.call(Lt, it, K);
                  break t;
                }
                it = dt;
                break t;
              case 3:
                dt.flags = dt.flags & -65537 | 128;
              case 0:
                if (dt = vt.payload, K = typeof dt == "function" ? dt.call(Lt, it, K) : dt, K == null) break t;
                it = y({}, it, K);
                break t;
              case 2:
                cl = !0;
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
          }, et === null ? (G = et = F, D = it) : et = et.next = F, m |= K;
        if (x = x.next, x === null) {
          if (x = r.shared.pending, x === null)
            break;
          F = x, x = F.next, F.next = null, r.lastBaseUpdate = F, r.shared.pending = null;
        }
      } while (!0);
      et === null && (D = it), r.baseState = D, r.firstBaseUpdate = G, r.lastBaseUpdate = et, c === null && (r.shared.lanes = 0), pl |= m, t.lanes = m, t.memoizedState = it;
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
  var ka = z(null), yu = z(0);
  function mh(t, e) {
    t = $n, P(yu, t), P(ka, e), $n = t | e.baseLanes;
  }
  function $c() {
    P(yu, $n), P(ka, ka.current);
  }
  function Zc() {
    $n = yu.current, H(ka), H(yu);
  }
  var qe = z(null), nn = null;
  function dl(t) {
    var e = t.alternate;
    P(Pt, Pt.current & 1), P(qe, t), nn === null && (e === null || ka.current !== null || e.memoizedState !== null) && (nn = t);
  }
  function Gc(t) {
    P(Pt, Pt.current), P(qe, t), nn === null && (nn = t);
  }
  function ph(t) {
    t.tag === 22 ? (P(Pt, Pt.current), P(qe, t), nn === null && (nn = t)) : hl();
  }
  function hl() {
    P(Pt, Pt.current), P(qe, qe.current);
  }
  function je(t) {
    H(qe), nn === t && (nn = null), H(Pt);
  }
  var Pt = z(0);
  function vu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Is(l) || Ps(l)))
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
  var Bn = 0, zt = null, jt = null, ae = null, bu = !1, Ba = !1, Kl = !1, xu = 0, ji = 0, Ua = null, Ob = 0;
  function Ft() {
    throw Error(u(321));
  }
  function Qc(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Be(t[l], e[l])) return !1;
    return !0;
  }
  function Kc(t, e, l, a, r, c) {
    return Bn = c, zt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, E.H = t === null || t.memoizedState === null ? Ph : cs, Kl = !1, c = l(a, r), Kl = !1, Ba && (c = vh(
      e,
      l,
      a,
      r
    )), yh(t), c;
  }
  function yh(t) {
    E.H = Vi;
    var e = jt !== null && jt.next !== null;
    if (Bn = 0, ae = jt = zt = null, bu = !1, ji = 0, Ua = null, e) throw Error(u(300));
    t === null || ie || (t = t.dependencies, t !== null && su(t) && (ie = !0));
  }
  function vh(t, e, l, a) {
    zt = t;
    var r = 0;
    do {
      if (Ba && (Ua = null), ji = 0, Ba = !1, 25 <= r) throw Error(u(301));
      if (r += 1, ae = jt = null, t.updateQueue != null) {
        var c = t.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      E.H = tg, c = e(l, a);
    } while (Ba);
    return c;
  }
  function Rb() {
    var t = E.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Yi(e) : e, t = t.useState()[0], (jt !== null ? jt.memoizedState : null) !== t && (zt.flags |= 1024), e;
  }
  function Jc() {
    var t = xu !== 0;
    return xu = 0, t;
  }
  function Fc(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function Wc(t) {
    if (bu) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      bu = !1;
    }
    Bn = 0, ae = jt = zt = null, Ba = !1, ji = xu = 0, Ua = null;
  }
  function Se() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ae === null ? zt.memoizedState = ae = t : ae = ae.next = t, ae;
  }
  function te() {
    if (jt === null) {
      var t = zt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = jt.next;
    var e = ae === null ? zt.memoizedState : ae.next;
    if (e !== null)
      ae = e, jt = t;
    else {
      if (t === null)
        throw zt.alternate === null ? Error(u(467)) : Error(u(310));
      jt = t, t = {
        memoizedState: jt.memoizedState,
        baseState: jt.baseState,
        baseQueue: jt.baseQueue,
        queue: jt.queue,
        next: null
      }, ae === null ? zt.memoizedState = ae = t : ae = ae.next = t;
    }
    return ae;
  }
  function _u() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Yi(t) {
    var e = ji;
    return ji += 1, Ua === null && (Ua = []), t = rh(Ua, t, e), e = zt, (ae === null ? e.memoizedState : ae.next) === null && (e = e.alternate, E.H = e === null || e.memoizedState === null ? Ph : cs), t;
  }
  function Su(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Yi(t);
      if (t.$$typeof === _) return he(t);
    }
    throw Error(u(438, String(t)));
  }
  function Ic(t) {
    var e = null, l = zt.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var a = zt.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(r) {
          return r.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = _u(), zt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = ut;
    return e.index++, l;
  }
  function Un(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function wu(t) {
    var e = te();
    return Pc(e, jt, t);
  }
  function Pc(t, e, l) {
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
      var x = m = null, D = null, G = e, et = !1;
      do {
        var it = G.lane & -536870913;
        if (it !== G.lane ? (Ct & it) === it : (Bn & it) === it) {
          var K = G.revertLane;
          if (K === 0)
            D !== null && (D = D.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: G.action,
              hasEagerState: G.hasEagerState,
              eagerState: G.eagerState,
              next: null
            }), it === Da && (et = !0);
          else if ((Bn & K) === K) {
            G = G.next, K === Da && (et = !0);
            continue;
          } else
            it = {
              lane: 0,
              revertLane: G.revertLane,
              gesture: null,
              action: G.action,
              hasEagerState: G.hasEagerState,
              eagerState: G.eagerState,
              next: null
            }, D === null ? (x = D = it, m = c) : D = D.next = it, zt.lanes |= K, pl |= K;
          it = G.action, Kl && l(c, it), c = G.hasEagerState ? G.eagerState : l(c, it);
        } else
          K = {
            lane: it,
            revertLane: G.revertLane,
            gesture: G.gesture,
            action: G.action,
            hasEagerState: G.hasEagerState,
            eagerState: G.eagerState,
            next: null
          }, D === null ? (x = D = K, m = c) : D = D.next = K, zt.lanes |= it, pl |= it;
        G = G.next;
      } while (G !== null && G !== e);
      if (D === null ? m = c : D.next = x, !Be(c, t.memoizedState) && (ie = !0, et && (l = Oa, l !== null)))
        throw l;
      t.memoizedState = c, t.baseState = m, t.baseQueue = D, a.lastRenderedState = c;
    }
    return r === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function ts(t) {
    var e = te(), l = e.queue;
    if (l === null) throw Error(u(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch, r = l.pending, c = e.memoizedState;
    if (r !== null) {
      l.pending = null;
      var m = r = r.next;
      do
        c = t(c, m.action), m = m.next;
      while (m !== r);
      Be(c, e.memoizedState) || (ie = !0), e.memoizedState = c, e.baseQueue === null && (e.baseState = c), l.lastRenderedState = c;
    }
    return [c, a];
  }
  function bh(t, e, l) {
    var a = zt, r = te(), c = Dt;
    if (c) {
      if (l === void 0) throw Error(u(407));
      l = l();
    } else l = e();
    var m = !Be(
      (jt || r).memoizedState,
      l
    );
    if (m && (r.memoizedState = l, ie = !0), r = r.queue, ls(Sh.bind(null, a, r, t), [
      t
    ]), r.getSnapshot !== e || m || ae !== null && ae.memoizedState.tag & 1) {
      if (a.flags |= 2048, qa(
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
      ), Xt === null) throw Error(u(349));
      c || (Bn & 127) !== 0 || xh(a, e, l);
    }
    return l;
  }
  function xh(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = zt.updateQueue, e === null ? (e = _u(), zt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
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
      return !Be(t, l);
    } catch {
      return !0;
    }
  }
  function Eh(t) {
    var e = jl(t, 2);
    e !== null && Oe(e, t, 2);
  }
  function es(t) {
    var e = Se();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), Kl) {
        yn(!0);
        try {
          l();
        } finally {
          yn(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Un,
      lastRenderedState: t
    }, e;
  }
  function zh(t, e, l, a) {
    return t.baseState = l, Pc(
      t,
      jt,
      typeof a == "function" ? a : Un
    );
  }
  function Hb(t, e, l, a, r) {
    if (Mu(t)) throw Error(u(485));
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
      } catch (G) {
        ns(t, e, G);
      } finally {
        c !== null && m.types !== null && (c.types = m.types), E.T = c;
      }
    } else
      try {
        c = l(r, a), Nh(t, e, c);
      } catch (G) {
        ns(t, e, G);
      }
  }
  function Nh(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        Ah(t, e, a);
      },
      function(a) {
        return ns(t, e, a);
      }
    ) : Ah(t, e, l);
  }
  function Ah(t, e, l) {
    e.status = "fulfilled", e.value = l, Ch(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, Mh(t, l)));
  }
  function ns(t, e, l) {
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
    if (Dt) {
      var l = Xt.formState;
      if (l !== null) {
        t: {
          var a = zt;
          if (Dt) {
            if (Zt) {
              e: {
                for (var r = Zt, c = en; r.nodeType !== 8; ) {
                  if (!c) {
                    r = null;
                    break e;
                  }
                  if (r = ln(
                    r.nextSibling
                  ), r === null) {
                    r = null;
                    break e;
                  }
                }
                c = r.data, r = c === "F!" || c === "F" ? r : null;
              }
              if (r) {
                Zt = ln(
                  r.nextSibling
                ), a = r.data === "F!";
                break t;
              }
            }
            ul(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return l = Se(), l.memoizedState = l.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Th,
      lastRenderedState: e
    }, l.queue = a, l = Fh.bind(
      null,
      zt,
      a
    ), a.dispatch = l, a = es(!1), c = rs.bind(
      null,
      zt,
      !1,
      a.queue
    ), a = Se(), r = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = r, l = Hb.bind(
      null,
      zt,
      r,
      c,
      l
    ), r.dispatch = l, a.memoizedState = t, [e, l, !1];
  }
  function Oh(t) {
    var e = te();
    return Rh(e, jt, t);
  }
  function Rh(t, e, l) {
    if (e = Pc(
      t,
      e,
      Th
    )[0], t = wu(Un)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = Yi(e);
      } catch (m) {
        throw m === Ra ? hu : m;
      }
    else a = e;
    e = te();
    var r = e.queue, c = r.dispatch;
    return l !== e.memoizedState && (zt.flags |= 2048, qa(
      9,
      { destroy: void 0 },
      kb.bind(null, r, l),
      null
    )), [a, c, t];
  }
  function kb(t, e) {
    t.action = e;
  }
  function Hh(t) {
    var e = te(), l = jt;
    if (l !== null)
      return Rh(e, l, t);
    te(), e = e.memoizedState, l = te();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function qa(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = zt.updateQueue, e === null && (e = _u(), zt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function kh() {
    return te().memoizedState;
  }
  function Eu(t, e, l, a) {
    var r = Se();
    zt.flags |= t, r.memoizedState = qa(
      1 | e,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function zu(t, e, l, a) {
    var r = te();
    a = a === void 0 ? null : a;
    var c = r.memoizedState.inst;
    jt !== null && a !== null && Qc(a, jt.memoizedState.deps) ? r.memoizedState = qa(e, c, l, a) : (zt.flags |= t, r.memoizedState = qa(
      1 | e,
      c,
      l,
      a
    ));
  }
  function Bh(t, e) {
    Eu(8390656, 8, t, e);
  }
  function ls(t, e) {
    zu(2048, 8, t, e);
  }
  function Bb(t) {
    zt.flags |= 4;
    var e = zt.updateQueue;
    if (e === null)
      e = _u(), zt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function Uh(t) {
    var e = te().memoizedState;
    return Bb({ ref: e, nextImpl: t }), function() {
      if ((Bt & 2) !== 0) throw Error(u(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function qh(t, e) {
    return zu(4, 2, t, e);
  }
  function jh(t, e) {
    return zu(4, 4, t, e);
  }
  function Yh(t, e) {
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
  function Lh(t, e, l) {
    l = l != null ? l.concat([t]) : null, zu(4, 4, Yh.bind(null, e, t), l);
  }
  function as() {
  }
  function Vh(t, e) {
    var l = te();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && Qc(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
  }
  function Xh(t, e) {
    var l = te();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && Qc(e, a[1]))
      return a[0];
    if (a = t(), Kl) {
      yn(!0);
      try {
        t();
      } finally {
        yn(!1);
      }
    }
    return l.memoizedState = [a, e], a;
  }
  function is(t, e, l) {
    return l === void 0 || (Bn & 1073741824) !== 0 && (Ct & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = $g(), zt.lanes |= t, pl |= t, l);
  }
  function $h(t, e, l, a) {
    return Be(l, e) ? l : ka.current !== null ? (t = is(t, l, a), Be(t, e) || (ie = !0), t) : (Bn & 42) === 0 || (Bn & 1073741824) !== 0 && (Ct & 261930) === 0 ? (ie = !0, t.memoizedState = l) : (t = $g(), zt.lanes |= t, pl |= t, e);
  }
  function Zh(t, e, l, a, r) {
    var c = O.p;
    O.p = c !== 0 && 8 > c ? c : 8;
    var m = E.T, x = {};
    E.T = x, rs(t, !1, e, l);
    try {
      var D = r(), G = E.S;
      if (G !== null && G(x, D), D !== null && typeof D == "object" && typeof D.then == "function") {
        var et = Db(
          D,
          a
        );
        Li(
          t,
          e,
          et,
          Ve(t)
        );
      } else
        Li(
          t,
          e,
          a,
          Ve(t)
        );
    } catch (it) {
      Li(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: it },
        Ve()
      );
    } finally {
      O.p = c, m !== null && x.types !== null && (m.types = x.types), E.T = m;
    }
  }
  function Ub() {
  }
  function os(t, e, l, a) {
    if (t.tag !== 5) throw Error(u(476));
    var r = Gh(t).queue;
    Zh(
      t,
      r,
      e,
      L,
      l === null ? Ub : function() {
        return Qh(t), l(a);
      }
    );
  }
  function Gh(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: L,
      baseState: L,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Un,
        lastRenderedState: L
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
        lastRenderedReducer: Un,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Qh(t) {
    var e = Gh(t);
    e.next === null && (e = t.alternate.memoizedState), Li(
      t,
      e.next.queue,
      {},
      Ve()
    );
  }
  function us() {
    return he(ao);
  }
  function Kh() {
    return te().memoizedState;
  }
  function Jh() {
    return te().memoizedState;
  }
  function qb(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Ve();
          t = sl(l);
          var a = fl(e, t, l);
          a !== null && (Oe(a, e, l), Bi(a, e, l)), e = { cache: Bc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function jb(t, e, l) {
    var a = Ve();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Mu(t) ? Wh(e, l) : (l = zc(t, e, l, a), l !== null && (Oe(l, t, a), Ih(l, e, a)));
  }
  function Fh(t, e, l) {
    var a = Ve();
    Li(t, e, l, a);
  }
  function Li(t, e, l, a) {
    var r = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Mu(t)) Wh(e, r);
    else {
      var c = t.alternate;
      if (t.lanes === 0 && (c === null || c.lanes === 0) && (c = e.lastRenderedReducer, c !== null))
        try {
          var m = e.lastRenderedState, x = c(m, l);
          if (r.hasEagerState = !0, r.eagerState = x, Be(x, m))
            return ou(t, e, r, 0), Xt === null && iu(), !1;
        } catch {
        }
      if (l = zc(t, e, r, a), l !== null)
        return Oe(l, t, a), Ih(l, e, a), !0;
    }
    return !1;
  }
  function rs(t, e, l, a) {
    if (a = {
      lane: 2,
      revertLane: Ys(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Mu(t)) {
      if (e) throw Error(u(479));
    } else
      e = zc(
        t,
        l,
        a,
        2
      ), e !== null && Oe(e, t, 2);
  }
  function Mu(t) {
    var e = t.alternate;
    return t === zt || e !== null && e === zt;
  }
  function Wh(t, e) {
    Ba = bu = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function Ih(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, Yo(t, l);
    }
  }
  var Vi = {
    readContext: he,
    use: Su,
    useCallback: Ft,
    useContext: Ft,
    useEffect: Ft,
    useImperativeHandle: Ft,
    useLayoutEffect: Ft,
    useInsertionEffect: Ft,
    useMemo: Ft,
    useReducer: Ft,
    useRef: Ft,
    useState: Ft,
    useDebugValue: Ft,
    useDeferredValue: Ft,
    useTransition: Ft,
    useSyncExternalStore: Ft,
    useId: Ft,
    useHostTransitionStatus: Ft,
    useFormState: Ft,
    useActionState: Ft,
    useOptimistic: Ft,
    useMemoCache: Ft,
    useCacheRefresh: Ft
  };
  Vi.useEffectEvent = Ft;
  var Ph = {
    readContext: he,
    use: Su,
    useCallback: function(t, e) {
      return Se().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: he,
    useEffect: Bh,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, Eu(
        4194308,
        4,
        Yh.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return Eu(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Eu(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = Se();
      e = e === void 0 ? null : e;
      var a = t();
      if (Kl) {
        yn(!0);
        try {
          t();
        } finally {
          yn(!1);
        }
      }
      return l.memoizedState = [a, e], a;
    },
    useReducer: function(t, e, l) {
      var a = Se();
      if (l !== void 0) {
        var r = l(e);
        if (Kl) {
          yn(!0);
          try {
            l(e);
          } finally {
            yn(!1);
          }
        }
      } else r = e;
      return a.memoizedState = a.baseState = r, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: r
      }, a.queue = t, t = t.dispatch = jb.bind(
        null,
        zt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = Se();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = es(t);
      var e = t.queue, l = Fh.bind(null, zt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: as,
    useDeferredValue: function(t, e) {
      var l = Se();
      return is(l, t, e);
    },
    useTransition: function() {
      var t = es(!1);
      return t = Zh.bind(
        null,
        zt,
        t.queue,
        !0,
        !1
      ), Se().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var a = zt, r = Se();
      if (Dt) {
        if (l === void 0)
          throw Error(u(407));
        l = l();
      } else {
        if (l = e(), Xt === null)
          throw Error(u(349));
        (Ct & 127) !== 0 || xh(a, e, l);
      }
      r.memoizedState = l;
      var c = { value: l, getSnapshot: e };
      return r.queue = c, Bh(Sh.bind(null, a, c, t), [
        t
      ]), a.flags |= 2048, qa(
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
      var t = Se(), e = Xt.identifierPrefix;
      if (Dt) {
        var l = xn, a = bn;
        l = (a & ~(1 << 32 - _e(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = xu++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Ob++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: us,
    useFormState: Dh,
    useActionState: Dh,
    useOptimistic: function(t) {
      var e = Se();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = rs.bind(
        null,
        zt,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: Ic,
    useCacheRefresh: function() {
      return Se().memoizedState = qb.bind(
        null,
        zt
      );
    },
    useEffectEvent: function(t) {
      var e = Se(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((Bt & 2) !== 0)
          throw Error(u(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, cs = {
    readContext: he,
    use: Su,
    useCallback: Vh,
    useContext: he,
    useEffect: ls,
    useImperativeHandle: Lh,
    useInsertionEffect: qh,
    useLayoutEffect: jh,
    useMemo: Xh,
    useReducer: wu,
    useRef: kh,
    useState: function() {
      return wu(Un);
    },
    useDebugValue: as,
    useDeferredValue: function(t, e) {
      var l = te();
      return $h(
        l,
        jt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = wu(Un)[0], e = te().memoizedState;
      return [
        typeof t == "boolean" ? t : Yi(t),
        e
      ];
    },
    useSyncExternalStore: bh,
    useId: Kh,
    useHostTransitionStatus: us,
    useFormState: Oh,
    useActionState: Oh,
    useOptimistic: function(t, e) {
      var l = te();
      return zh(l, jt, t, e);
    },
    useMemoCache: Ic,
    useCacheRefresh: Jh
  };
  cs.useEffectEvent = Uh;
  var tg = {
    readContext: he,
    use: Su,
    useCallback: Vh,
    useContext: he,
    useEffect: ls,
    useImperativeHandle: Lh,
    useInsertionEffect: qh,
    useLayoutEffect: jh,
    useMemo: Xh,
    useReducer: ts,
    useRef: kh,
    useState: function() {
      return ts(Un);
    },
    useDebugValue: as,
    useDeferredValue: function(t, e) {
      var l = te();
      return jt === null ? is(l, t, e) : $h(
        l,
        jt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = ts(Un)[0], e = te().memoizedState;
      return [
        typeof t == "boolean" ? t : Yi(t),
        e
      ];
    },
    useSyncExternalStore: bh,
    useId: Kh,
    useHostTransitionStatus: us,
    useFormState: Hh,
    useActionState: Hh,
    useOptimistic: function(t, e) {
      var l = te();
      return jt !== null ? zh(l, jt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: Ic,
    useCacheRefresh: Jh
  };
  tg.useEffectEvent = Uh;
  function ss(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : y({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var fs = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var a = Ve(), r = sl(a);
      r.payload = e, l != null && (r.callback = l), e = fl(t, r, a), e !== null && (Oe(e, t, a), Bi(e, t, a));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var a = Ve(), r = sl(a);
      r.tag = 1, r.payload = e, l != null && (r.callback = l), e = fl(t, r, a), e !== null && (Oe(e, t, a), Bi(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = Ve(), a = sl(l);
      a.tag = 2, e != null && (a.callback = e), e = fl(t, a, l), e !== null && (Oe(e, t, l), Bi(e, t, l));
    }
  };
  function eg(t, e, l, a, r, c, m) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, c, m) : e.prototype && e.prototype.isPureReactComponent ? !Ai(l, a) || !Ai(r, c) : !0;
  }
  function ng(t, e, l, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && fs.enqueueReplaceState(e, e.state, null);
  }
  function Jl(t, e) {
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
  function lg(t) {
    au(t);
  }
  function ag(t) {
    console.error(t);
  }
  function ig(t) {
    au(t);
  }
  function Nu(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function og(t, e, l) {
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
  function ds(t, e, l) {
    return l = sl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Nu(t, e);
    }, l;
  }
  function ug(t) {
    return t = sl(t), t.tag = 3, t;
  }
  function rg(t, e, l, a) {
    var r = l.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var c = a.value;
      t.payload = function() {
        return r(c);
      }, t.callback = function() {
        og(e, l, a);
      };
    }
    var m = l.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (t.callback = function() {
      og(e, l, a), typeof r != "function" && (yl === null ? yl = /* @__PURE__ */ new Set([this]) : yl.add(this));
      var x = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: x !== null ? x : ""
      });
    });
  }
  function Yb(t, e, l, a, r) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = l.alternate, e !== null && Ta(
        e,
        l,
        r,
        !0
      ), l = qe.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return nn === null ? ju() : l.alternate === null && Wt === 0 && (Wt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = r, a === gu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), Us(t, a, r)), !1;
          case 22:
            return l.flags |= 65536, a === gu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), Us(t, a, r)), !1;
        }
        throw Error(u(435, l.tag));
      }
      return Us(t, a, r), ju(), !1;
    }
    if (Dt)
      return e = qe.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = r, a !== Dc && (t = Error(u(422), { cause: a }), Di(Ie(t, l)))) : (a !== Dc && (e = Error(u(423), {
        cause: a
      }), Di(
        Ie(e, l)
      )), t = t.current.alternate, t.flags |= 65536, r &= -r, t.lanes |= r, a = Ie(a, l), r = ds(
        t.stateNode,
        a,
        r
      ), Vc(t, r), Wt !== 4 && (Wt = 2)), !1;
    var c = Error(u(520), { cause: a });
    if (c = Ie(c, l), Fi === null ? Fi = [c] : Fi.push(c), Wt !== 4 && (Wt = 2), e === null) return !0;
    a = Ie(a, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = r & -r, l.lanes |= t, t = ds(l.stateNode, a, t), Vc(l, t), !1;
        case 1:
          if (e = l.type, c = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (yl === null || !yl.has(c))))
            return l.flags |= 65536, r &= -r, l.lanes |= r, r = ug(r), rg(
              r,
              t,
              l,
              a
            ), Vc(l, r), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var hs = Error(u(461)), ie = !1;
  function ge(t, e, l, a) {
    e.child = t === null ? dh(e, null, l, a) : Ql(
      e,
      t.child,
      l,
      a
    );
  }
  function cg(t, e, l, a, r) {
    l = l.render;
    var c = e.ref;
    if ("ref" in a) {
      var m = {};
      for (var x in a)
        x !== "ref" && (m[x] = a[x]);
    } else m = a;
    return Xl(e), a = Kc(
      t,
      e,
      l,
      m,
      c,
      r
    ), x = Jc(), t !== null && !ie ? (Fc(t, e, r), qn(t, e, r)) : (Dt && x && Cc(e), e.flags |= 1, ge(t, e, a, r), e.child);
  }
  function sg(t, e, l, a, r) {
    if (t === null) {
      var c = l.type;
      return typeof c == "function" && !Mc(c) && c.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = c, fg(
        t,
        e,
        c,
        a,
        r
      )) : (t = ru(
        l.type,
        null,
        a,
        e,
        e.mode,
        r
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (c = t.child, !_s(t, r)) {
      var m = c.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ai, l(m, a) && t.ref === e.ref)
        return qn(t, e, r);
    }
    return e.flags |= 1, t = On(c, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function fg(t, e, l, a, r) {
    if (t !== null) {
      var c = t.memoizedProps;
      if (Ai(c, a) && t.ref === e.ref)
        if (ie = !1, e.pendingProps = a = c, _s(t, r))
          (t.flags & 131072) !== 0 && (ie = !0);
        else
          return e.lanes = t.lanes, qn(t, e, r);
    }
    return gs(
      t,
      e,
      l,
      a,
      r
    );
  }
  function dg(t, e, l, a) {
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
        return hg(
          t,
          e,
          c,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && du(
          e,
          c !== null ? c.cachePool : null
        ), c !== null ? mh(e, c) : $c(), ph(e);
      else
        return a = e.lanes = 536870912, hg(
          t,
          e,
          c !== null ? c.baseLanes | l : l,
          l,
          a
        );
    } else
      c !== null ? (du(e, c.cachePool), mh(e, c), hl(), e.memoizedState = null) : (t !== null && du(e, null), $c(), hl());
    return ge(t, e, r, l), e.child;
  }
  function Xi(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function hg(t, e, l, a, r) {
    var c = qc();
    return c = c === null ? null : { parent: le._currentValue, pool: c }, e.memoizedState = {
      baseLanes: l,
      cachePool: c
    }, t !== null && du(e, null), $c(), ph(e), t !== null && Ta(t, e, a, !0), e.childLanes = r, null;
  }
  function Au(t, e) {
    return e = Tu(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function gg(t, e, l) {
    return Ql(e, t.child, null, l), t = Au(e, e.pendingProps), t.flags |= 2, je(e), e.memoizedState = null, t;
  }
  function Lb(t, e, l) {
    var a = e.pendingProps, r = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (Dt) {
        if (a.mode === "hidden")
          return t = Au(e, a), e.lanes = 536870912, Xi(null, t);
        if (Gc(e), (t = Zt) ? (t = Mm(
          t,
          en
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: il !== null ? { id: bn, overflow: xn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Wd(t), l.return = e, e.child = l, de = e, Zt = null)) : t = null, t === null) throw ul(e);
        return e.lanes = 536870912, null;
      }
      return Au(e, a);
    }
    var c = t.memoizedState;
    if (c !== null) {
      var m = c.dehydrated;
      if (Gc(e), r)
        if (e.flags & 256)
          e.flags &= -257, e = gg(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(u(558));
      else if (ie || Ta(t, e, l, !1), r = (l & t.childLanes) !== 0, ie || r) {
        if (a = Xt, a !== null && (m = Lo(a, l), m !== 0 && m !== c.retryLane))
          throw c.retryLane = m, jl(t, m), Oe(a, t, m), hs;
        ju(), e = gg(
          t,
          e,
          l
        );
      } else
        t = c.treeContext, Zt = ln(m.nextSibling), de = e, Dt = !0, ol = null, en = !1, t !== null && th(e, t), e = Au(e, a), e.flags |= 4096;
      return e;
    }
    return t = On(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Cu(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(u(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function gs(t, e, l, a, r) {
    return Xl(e), l = Kc(
      t,
      e,
      l,
      a,
      void 0,
      r
    ), a = Jc(), t !== null && !ie ? (Fc(t, e, r), qn(t, e, r)) : (Dt && a && Cc(e), e.flags |= 1, ge(t, e, l, r), e.child);
  }
  function mg(t, e, l, a, r, c) {
    return Xl(e), e.updateQueue = null, l = vh(
      e,
      a,
      l,
      r
    ), yh(t), a = Jc(), t !== null && !ie ? (Fc(t, e, c), qn(t, e, c)) : (Dt && a && Cc(e), e.flags |= 1, ge(t, e, l, c), e.child);
  }
  function pg(t, e, l, a, r) {
    if (Xl(e), e.stateNode === null) {
      var c = Ma, m = l.contextType;
      typeof m == "object" && m !== null && (c = he(m)), c = new l(a, c), e.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = fs, e.stateNode = c, c._reactInternals = e, c = e.stateNode, c.props = a, c.state = e.memoizedState, c.refs = {}, Yc(e), m = l.contextType, c.context = typeof m == "object" && m !== null ? he(m) : Ma, c.state = e.memoizedState, m = l.getDerivedStateFromProps, typeof m == "function" && (ss(
        e,
        l,
        m,
        a
      ), c.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (m = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), m !== c.state && fs.enqueueReplaceState(c, c.state, null), qi(e, a, c, r), Ui(), c.state = e.memoizedState), typeof c.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      c = e.stateNode;
      var x = e.memoizedProps, D = Jl(l, x);
      c.props = D;
      var G = c.context, et = l.contextType;
      m = Ma, typeof et == "object" && et !== null && (m = he(et));
      var it = l.getDerivedStateFromProps;
      et = typeof it == "function" || typeof c.getSnapshotBeforeUpdate == "function", x = e.pendingProps !== x, et || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (x || G !== m) && ng(
        e,
        c,
        a,
        m
      ), cl = !1;
      var K = e.memoizedState;
      c.state = K, qi(e, a, c, r), Ui(), G = e.memoizedState, x || K !== G || cl ? (typeof it == "function" && (ss(
        e,
        l,
        it,
        a
      ), G = e.memoizedState), (D = cl || eg(
        e,
        l,
        D,
        a,
        K,
        G,
        m
      )) ? (et || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = G), c.props = a, c.state = G, c.context = m, a = D) : (typeof c.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      c = e.stateNode, Lc(t, e), m = e.memoizedProps, et = Jl(l, m), c.props = et, it = e.pendingProps, K = c.context, G = l.contextType, D = Ma, typeof G == "object" && G !== null && (D = he(G)), x = l.getDerivedStateFromProps, (G = typeof x == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (m !== it || K !== D) && ng(
        e,
        c,
        a,
        D
      ), cl = !1, K = e.memoizedState, c.state = K, qi(e, a, c, r), Ui();
      var F = e.memoizedState;
      m !== it || K !== F || cl || t !== null && t.dependencies !== null && su(t.dependencies) ? (typeof x == "function" && (ss(
        e,
        l,
        x,
        a
      ), F = e.memoizedState), (et = cl || eg(
        e,
        l,
        et,
        a,
        K,
        F,
        D
      ) || t !== null && t.dependencies !== null && su(t.dependencies)) ? (G || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(a, F, D), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        a,
        F,
        D
      )), typeof c.componentDidUpdate == "function" && (e.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || m === t.memoizedProps && K === t.memoizedState || (e.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || m === t.memoizedProps && K === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = F), c.props = a, c.state = F, c.context = D, a = et) : (typeof c.componentDidUpdate != "function" || m === t.memoizedProps && K === t.memoizedState || (e.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || m === t.memoizedProps && K === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return c = a, Cu(t, e), a = (e.flags & 128) !== 0, c || a ? (c = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : c.render(), e.flags |= 1, t !== null && a ? (e.child = Ql(
      e,
      t.child,
      null,
      r
    ), e.child = Ql(
      e,
      null,
      l,
      r
    )) : ge(t, e, l, r), e.memoizedState = c.state, t = e.child) : t = qn(
      t,
      e,
      r
    ), t;
  }
  function yg(t, e, l, a) {
    return Ll(), e.flags |= 256, ge(t, e, l, a), e.child;
  }
  var ms = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ps(t) {
    return { baseLanes: t, cachePool: oh() };
  }
  function ys(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Le), t;
  }
  function vg(t, e, l) {
    var a = e.pendingProps, r = !1, c = (e.flags & 128) !== 0, m;
    if ((m = c) || (m = t !== null && t.memoizedState === null ? !1 : (Pt.current & 2) !== 0), m && (r = !0, e.flags &= -129), m = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (Dt) {
        if (r ? dl(e) : hl(), (t = Zt) ? (t = Mm(
          t,
          en
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: il !== null ? { id: bn, overflow: xn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Wd(t), l.return = e, e.child = l, de = e, Zt = null)) : t = null, t === null) throw ul(e);
        return Ps(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var x = a.children;
      return a = a.fallback, r ? (hl(), r = e.mode, x = Tu(
        { mode: "hidden", children: x },
        r
      ), a = Yl(
        a,
        r,
        l,
        null
      ), x.return = e, a.return = e, x.sibling = a, e.child = x, a = e.child, a.memoizedState = ps(l), a.childLanes = ys(
        t,
        m,
        l
      ), e.memoizedState = ms, Xi(null, a)) : (dl(e), vs(e, x));
    }
    var D = t.memoizedState;
    if (D !== null && (x = D.dehydrated, x !== null)) {
      if (c)
        e.flags & 256 ? (dl(e), e.flags &= -257, e = bs(
          t,
          e,
          l
        )) : e.memoizedState !== null ? (hl(), e.child = t.child, e.flags |= 128, e = null) : (hl(), x = a.fallback, r = e.mode, a = Tu(
          { mode: "visible", children: a.children },
          r
        ), x = Yl(
          x,
          r,
          l,
          null
        ), x.flags |= 2, a.return = e, x.return = e, a.sibling = x, e.child = a, Ql(
          e,
          t.child,
          null,
          l
        ), a = e.child, a.memoizedState = ps(l), a.childLanes = ys(
          t,
          m,
          l
        ), e.memoizedState = ms, e = Xi(null, a));
      else if (dl(e), Ps(x)) {
        if (m = x.nextSibling && x.nextSibling.dataset, m) var G = m.dgst;
        m = G, a = Error(u(419)), a.stack = "", a.digest = m, Di({ value: a, source: null, stack: null }), e = bs(
          t,
          e,
          l
        );
      } else if (ie || Ta(t, e, l, !1), m = (l & t.childLanes) !== 0, ie || m) {
        if (m = Xt, m !== null && (a = Lo(m, l), a !== 0 && a !== D.retryLane))
          throw D.retryLane = a, jl(t, a), Oe(m, t, a), hs;
        Is(x) || ju(), e = bs(
          t,
          e,
          l
        );
      } else
        Is(x) ? (e.flags |= 192, e.child = t.child, e = null) : (t = D.treeContext, Zt = ln(
          x.nextSibling
        ), de = e, Dt = !0, ol = null, en = !1, t !== null && th(e, t), e = vs(
          e,
          a.children
        ), e.flags |= 4096);
      return e;
    }
    return r ? (hl(), x = a.fallback, r = e.mode, D = t.child, G = D.sibling, a = On(D, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = D.subtreeFlags & 65011712, G !== null ? x = On(
      G,
      x
    ) : (x = Yl(
      x,
      r,
      l,
      null
    ), x.flags |= 2), x.return = e, a.return = e, a.sibling = x, e.child = a, Xi(null, a), a = e.child, x = t.child.memoizedState, x === null ? x = ps(l) : (r = x.cachePool, r !== null ? (D = le._currentValue, r = r.parent !== D ? { parent: D, pool: D } : r) : r = oh(), x = {
      baseLanes: x.baseLanes | l,
      cachePool: r
    }), a.memoizedState = x, a.childLanes = ys(
      t,
      m,
      l
    ), e.memoizedState = ms, Xi(t.child, a)) : (dl(e), l = t.child, t = l.sibling, l = On(l, {
      mode: "visible",
      children: a.children
    }), l.return = e, l.sibling = null, t !== null && (m = e.deletions, m === null ? (e.deletions = [t], e.flags |= 16) : m.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function vs(t, e) {
    return e = Tu(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Tu(t, e) {
    return t = Ue(22, t, null, e), t.lanes = 0, t;
  }
  function bs(t, e, l) {
    return Ql(e, t.child, null, l), t = vs(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function bg(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), Hc(t.return, e, l);
  }
  function xs(t, e, l, a, r, c) {
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
  function xg(t, e, l) {
    var a = e.pendingProps, r = a.revealOrder, c = a.tail;
    a = a.children;
    var m = Pt.current, x = (m & 2) !== 0;
    if (x ? (m = m & 1 | 2, e.flags |= 128) : m &= 1, P(Pt, m), ge(t, e, a, l), a = Dt ? Ti : 0, !x && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && bg(t, l, e);
        else if (t.tag === 19)
          bg(t, l, e);
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
          t = l.alternate, t !== null && vu(t) === null && (r = l), l = l.sibling;
        l = r, l === null ? (r = e.child, e.child = null) : (r = l.sibling, l.sibling = null), xs(
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
          if (t = r.alternate, t !== null && vu(t) === null) {
            e.child = r;
            break;
          }
          t = r.sibling, r.sibling = l, l = r, r = t;
        }
        xs(
          e,
          !0,
          l,
          null,
          c,
          a
        );
        break;
      case "together":
        xs(
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
  function qn(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), pl |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (Ta(
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
      for (t = e.child, l = On(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = On(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function _s(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && su(t)));
  }
  function Vb(t, e, l) {
    switch (e.tag) {
      case 3:
        tt(e, e.stateNode.containerInfo), rl(e, le, t.memoizedState.cache), Ll();
        break;
      case 27:
      case 5:
        St(e);
        break;
      case 4:
        tt(e, e.stateNode.containerInfo);
        break;
      case 10:
        rl(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Gc(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (dl(e), e.flags |= 128, null) : (l & e.child.childLanes) !== 0 ? vg(t, e, l) : (dl(e), t = qn(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        dl(e);
        break;
      case 19:
        var r = (t.flags & 128) !== 0;
        if (a = (l & e.childLanes) !== 0, a || (Ta(
          t,
          e,
          l,
          !1
        ), a = (l & e.childLanes) !== 0), r) {
          if (a)
            return xg(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (r = e.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), P(Pt, Pt.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, dg(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        rl(e, le, t.memoizedState.cache);
    }
    return qn(t, e, l);
  }
  function _g(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        ie = !0;
      else {
        if (!_s(t, l) && (e.flags & 128) === 0)
          return ie = !1, Vb(
            t,
            e,
            l
          );
        ie = (t.flags & 131072) !== 0;
      }
    else
      ie = !1, Dt && (e.flags & 1048576) !== 0 && Pd(e, Ti, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = Zl(e.elementType), e.type = t, typeof t == "function")
            Mc(t) ? (a = Jl(t, a), e.tag = 1, e = pg(
              null,
              e,
              t,
              a,
              l
            )) : (e.tag = 0, e = gs(
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
                e.tag = 11, e = cg(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (r === B) {
                e.tag = 14, e = sg(
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
        return gs(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return a = e.type, r = Jl(
          a,
          e.pendingProps
        ), pg(
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
          r = c.element, Lc(t, e), qi(e, a, null, l);
          var m = e.memoizedState;
          if (a = m.cache, rl(e, le, a), a !== c.cache && kc(
            e,
            [le],
            l,
            !0
          ), Ui(), a = m.element, c.isDehydrated)
            if (c = {
              element: a,
              isDehydrated: !1,
              cache: m.cache
            }, e.updateQueue.baseState = c, e.memoizedState = c, e.flags & 256) {
              e = yg(
                t,
                e,
                a,
                l
              );
              break t;
            } else if (a !== r) {
              r = Ie(
                Error(u(424)),
                e
              ), Di(r), e = yg(
                t,
                e,
                a,
                l
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Zt = ln(t.firstChild), de = e, Dt = !0, ol = null, en = !0, l = dh(
                e,
                null,
                a,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Ll(), a === r) {
              e = qn(
                t,
                e,
                l
              );
              break t;
            }
            ge(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return Cu(t, e), t === null ? (l = Om(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : Dt || (l = e.type, t = e.pendingProps, a = Gu(
          ft.current
        ).createElement(l), a[ce] = e, a[ye] = t, me(a, l, t), ne(a), e.stateNode = a) : e.memoizedState = Om(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return St(e), t === null && Dt && (a = e.stateNode = Cm(
          e.type,
          e.pendingProps,
          ft.current
        ), de = e, en = !0, r = Zt, _l(e.type) ? (tf = r, Zt = ln(a.firstChild)) : Zt = r), ge(
          t,
          e,
          e.pendingProps.children,
          l
        ), Cu(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && Dt && ((r = a = Zt) && (a = v1(
          a,
          e.type,
          e.pendingProps,
          en
        ), a !== null ? (e.stateNode = a, de = e, Zt = ln(a.firstChild), en = !1, r = !0) : r = !1), r || ul(e)), St(e), r = e.type, c = e.pendingProps, m = t !== null ? t.memoizedProps : null, a = c.children, Js(r, c) ? a = null : m !== null && Js(r, m) && (e.flags |= 32), e.memoizedState !== null && (r = Kc(
          t,
          e,
          Rb,
          null,
          null,
          l
        ), ao._currentValue = r), Cu(t, e), ge(t, e, a, l), e.child;
      case 6:
        return t === null && Dt && ((t = l = Zt) && (l = b1(
          l,
          e.pendingProps,
          en
        ), l !== null ? (e.stateNode = l, de = e, Zt = null, t = !0) : t = !1), t || ul(e)), null;
      case 13:
        return vg(t, e, l);
      case 4:
        return tt(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = Ql(
          e,
          null,
          a,
          l
        ) : ge(t, e, a, l), e.child;
      case 11:
        return cg(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return ge(
          t,
          e,
          e.pendingProps,
          l
        ), e.child;
      case 8:
        return ge(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return ge(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return a = e.pendingProps, rl(e, e.type, a.value), ge(t, e, a.children, l), e.child;
      case 9:
        return r = e.type._context, a = e.pendingProps.children, Xl(e), r = he(r), a = a(r), e.flags |= 1, ge(t, e, a, l), e.child;
      case 14:
        return sg(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return fg(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return xg(t, e, l);
      case 31:
        return Lb(t, e, l);
      case 22:
        return dg(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return Xl(e), a = he(le), t === null ? (r = qc(), r === null && (r = Xt, c = Bc(), r.pooledCache = c, c.refCount++, c !== null && (r.pooledCacheLanes |= l), r = c), e.memoizedState = { parent: a, cache: r }, Yc(e), rl(e, le, r)) : ((t.lanes & l) !== 0 && (Lc(t, e), qi(e, null, null, l), Ui()), r = t.memoizedState, c = e.memoizedState, r.parent !== a ? (r = { parent: a, cache: a }, e.memoizedState = r, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = r), rl(e, le, a)) : (a = c.cache, rl(e, le, a), a !== r.cache && kc(
          e,
          [le],
          l,
          !0
        ))), ge(
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
  function jn(t) {
    t.flags |= 4;
  }
  function Ss(t, e, l, a, r) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (r & 335544128) === r)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Kg()) t.flags |= 8192;
        else
          throw Gl = gu, jc;
    } else t.flags &= -16777217;
  }
  function Sg(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Um(e))
      if (Kg()) t.flags |= 8192;
      else
        throw Gl = gu, jc;
  }
  function Du(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? qo() : 536870912, t.lanes |= e, Va |= e);
  }
  function $i(t, e) {
    if (!Dt)
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
  function Gt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, l = 0, a = 0;
    if (e)
      for (var r = t.child; r !== null; )
        l |= r.lanes | r.childLanes, a |= r.subtreeFlags & 65011712, a |= r.flags & 65011712, r.return = t, r = r.sibling;
    else
      for (r = t.child; r !== null; )
        l |= r.lanes | r.childLanes, a |= r.subtreeFlags, a |= r.flags, r.return = t, r = r.sibling;
    return t.subtreeFlags |= a, t.childLanes = l, e;
  }
  function Xb(t, e, l) {
    var a = e.pendingProps;
    switch (Tc(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Gt(e), null;
      case 1:
        return Gt(e), null;
      case 3:
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), kn(le), st(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (Ca(e) ? jn(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Oc())), Gt(e), null;
      case 26:
        var r = e.type, c = e.memoizedState;
        return t === null ? (jn(e), c !== null ? (Gt(e), Sg(e, c)) : (Gt(e), Ss(
          e,
          r,
          null,
          a,
          l
        ))) : c ? c !== t.memoizedState ? (jn(e), Gt(e), Sg(e, c)) : (Gt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && jn(e), Gt(e), Ss(
          e,
          r,
          t,
          a,
          l
        )), null;
      case 27:
        if (_t(e), l = ft.current, r = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && jn(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(u(166));
            return Gt(e), null;
          }
          t = lt.current, Ca(e) ? eh(e) : (t = Cm(r, a, l), e.stateNode = t, jn(e));
        }
        return Gt(e), null;
      case 5:
        if (_t(e), r = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && jn(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(u(166));
            return Gt(e), null;
          }
          if (c = lt.current, Ca(e))
            eh(e);
          else {
            var m = Gu(
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
            c[ce] = e, c[ye] = a;
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
            t: switch (me(c, r, a), r) {
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
            a && jn(e);
          }
        }
        return Gt(e), Ss(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== a && jn(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(u(166));
          if (t = ft.current, Ca(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, r = de, r !== null)
              switch (r.tag) {
                case 27:
                case 5:
                  a = r.memoizedProps;
              }
            t[ce] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || vm(t.nodeValue, l)), t || ul(e, !0);
          } else
            t = Gu(t).createTextNode(
              a
            ), t[ce] = e, e.stateNode = t;
        }
        return Gt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = Ca(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(u(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(u(557));
              t[ce] = e;
            } else
              Ll(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Gt(e), t = !1;
          } else
            l = Oc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (je(e), e) : (je(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(u(558));
        }
        return Gt(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (r = Ca(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!r) throw Error(u(318));
              if (r = e.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(u(317));
              r[ce] = e;
            } else
              Ll(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Gt(e), r = !1;
          } else
            r = Oc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = r), r = !0;
          if (!r)
            return e.flags & 256 ? (je(e), e) : (je(e), null);
        }
        return je(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, r = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (r = a.alternate.memoizedState.cachePool.pool), c = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (c = a.memoizedState.cachePool.pool), c !== r && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Du(e, e.updateQueue), Gt(e), null);
      case 4:
        return st(), t === null && $s(e.stateNode.containerInfo), Gt(e), null;
      case 10:
        return kn(e.type), Gt(e), null;
      case 19:
        if (H(Pt), a = e.memoizedState, a === null) return Gt(e), null;
        if (r = (e.flags & 128) !== 0, c = a.rendering, c === null)
          if (r) $i(a, !1);
          else {
            if (Wt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (c = vu(t), c !== null) {
                  for (e.flags |= 128, $i(a, !1), t = c.updateQueue, e.updateQueue = t, Du(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    Fd(l, t), l = l.sibling;
                  return P(
                    Pt,
                    Pt.current & 1 | 2
                  ), Dt && Rn(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && It() > Bu && (e.flags |= 128, r = !0, $i(a, !1), e.lanes = 4194304);
          }
        else {
          if (!r)
            if (t = vu(c), t !== null) {
              if (e.flags |= 128, r = !0, t = t.updateQueue, e.updateQueue = t, Du(e, t), $i(a, !0), a.tail === null && a.tailMode === "hidden" && !c.alternate && !Dt)
                return Gt(e), null;
            } else
              2 * It() - a.renderingStartTime > Bu && l !== 536870912 && (e.flags |= 128, r = !0, $i(a, !1), e.lanes = 4194304);
          a.isBackwards ? (c.sibling = e.child, e.child = c) : (t = a.last, t !== null ? t.sibling = c : e.child = c, a.last = c);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = It(), t.sibling = null, l = Pt.current, P(
          Pt,
          r ? l & 1 | 2 : l & 1
        ), Dt && Rn(e, a.treeForkCount), t) : (Gt(e), null);
      case 22:
      case 23:
        return je(e), Zc(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (Gt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Gt(e), l = e.updateQueue, l !== null && Du(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && H($l), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), kn(le), Gt(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, e.tag));
  }
  function $b(t, e) {
    switch (Tc(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return kn(le), st(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return _t(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (je(e), e.alternate === null)
            throw Error(u(340));
          Ll();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (je(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(u(340));
          Ll();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return H(Pt), null;
      case 4:
        return st(), null;
      case 10:
        return kn(e.type), null;
      case 22:
      case 23:
        return je(e), Zc(), t !== null && H($l), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return kn(le), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function wg(t, e) {
    switch (Tc(e), e.tag) {
      case 3:
        kn(le), st();
        break;
      case 26:
      case 27:
      case 5:
        _t(e);
        break;
      case 4:
        st();
        break;
      case 31:
        e.memoizedState !== null && je(e);
        break;
      case 13:
        je(e);
        break;
      case 19:
        H(Pt);
        break;
      case 10:
        kn(e.type);
        break;
      case 22:
      case 23:
        je(e), Zc(), t !== null && H($l);
        break;
      case 24:
        kn(le);
    }
  }
  function Zi(t, e) {
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
      qt(e, e.return, x);
    }
  }
  function gl(t, e, l) {
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
              var D = l, G = x;
              try {
                G();
              } catch (et) {
                qt(
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
      qt(e, e.return, et);
    }
  }
  function Eg(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        gh(e, l);
      } catch (a) {
        qt(t, t.return, a);
      }
    }
  }
  function zg(t, e, l) {
    l.props = Jl(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      qt(t, e, a);
    }
  }
  function Gi(t, e) {
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
      qt(t, e, r);
    }
  }
  function _n(t, e) {
    var l = t.ref, a = t.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (r) {
          qt(t, e, r);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (r) {
          qt(t, e, r);
        }
      else l.current = null;
  }
  function Mg(t) {
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
      qt(t, t.return, r);
    }
  }
  function ws(t, e, l) {
    try {
      var a = t.stateNode;
      d1(a, t.type, l, e), a[ye] = e;
    } catch (r) {
      qt(t, t.return, r);
    }
  }
  function Ng(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && _l(t.type) || t.tag === 4;
  }
  function Es(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ng(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && _l(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function zs(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = Tn));
    else if (a !== 4 && (a === 27 && _l(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
      for (zs(t, e, l), t = t.sibling; t !== null; )
        zs(t, e, l), t = t.sibling;
  }
  function Ou(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
    else if (a !== 4 && (a === 27 && _l(t.type) && (l = t.stateNode), t = t.child, t !== null))
      for (Ou(t, e, l), t = t.sibling; t !== null; )
        Ou(t, e, l), t = t.sibling;
  }
  function Ag(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var a = t.type, r = e.attributes; r.length; )
        e.removeAttributeNode(r[0]);
      me(e, a, l), e[ce] = t, e[ye] = l;
    } catch (c) {
      qt(t, t.return, c);
    }
  }
  var Yn = !1, oe = !1, Ms = !1, Cg = typeof WeakSet == "function" ? WeakSet : Set, fe = null;
  function Zb(t, e) {
    if (t = t.containerInfo, Qs = Pu, t = Ld(t), bc(t)) {
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
            var m = 0, x = -1, D = -1, G = 0, et = 0, it = t, K = null;
            e: for (; ; ) {
              for (var F; it !== l || r !== 0 && it.nodeType !== 3 || (x = m + r), it !== c || a !== 0 && it.nodeType !== 3 || (D = m + a), it.nodeType === 3 && (m += it.nodeValue.length), (F = it.firstChild) !== null; )
                K = it, it = F;
              for (; ; ) {
                if (it === t) break e;
                if (K === l && ++G === r && (x = m), K === c && ++et === a && (D = m), (F = it.nextSibling) !== null) break;
                it = K, K = it.parentNode;
              }
              it = F;
            }
            l = x === -1 || D === -1 ? null : { start: x, end: D };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Ks = { focusedElem: t, selectionRange: l }, Pu = !1, fe = e; fe !== null; )
      if (e = fe, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, fe = t;
      else
        for (; fe !== null; ) {
          switch (e = fe, c = e.alternate, t = e.flags, e.tag) {
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
                  var dt = Jl(
                    l.type,
                    r
                  );
                  t = a.getSnapshotBeforeUpdate(
                    dt,
                    c
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (vt) {
                  qt(
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
                  Ws(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Ws(t);
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
            t.return = e.return, fe = t;
            break;
          }
          fe = e.return;
        }
  }
  function Tg(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Vn(t, l), a & 4 && Zi(5, l);
        break;
      case 1:
        if (Vn(t, l), a & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (m) {
              qt(l, l.return, m);
            }
          else {
            var r = Jl(
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
              qt(
                l,
                l.return,
                m
              );
            }
          }
        a & 64 && Eg(l), a & 512 && Gi(l, l.return);
        break;
      case 3:
        if (Vn(t, l), a & 64 && (t = l.updateQueue, t !== null)) {
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
            qt(l, l.return, m);
          }
        }
        break;
      case 27:
        e === null && a & 4 && Ag(l);
      case 26:
      case 5:
        Vn(t, l), e === null && a & 4 && Mg(l), a & 512 && Gi(l, l.return);
        break;
      case 12:
        Vn(t, l);
        break;
      case 31:
        Vn(t, l), a & 4 && Rg(t, l);
        break;
      case 13:
        Vn(t, l), a & 4 && Hg(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = t1.bind(
          null,
          l
        ), x1(t, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || Yn, !a) {
          e = e !== null && e.memoizedState !== null || oe, r = Yn;
          var c = oe;
          Yn = a, (oe = e) && !c ? Xn(
            t,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Vn(t, l), Yn = r, oe = c;
        }
        break;
      case 30:
        break;
      default:
        Vn(t, l);
    }
  }
  function Dg(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Dg(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && gi(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Qt = null, Ae = !1;
  function Ln(t, e, l) {
    for (l = l.child; l !== null; )
      Og(t, e, l), l = l.sibling;
  }
  function Og(t, e, l) {
    if (xe && typeof xe.onCommitFiberUnmount == "function")
      try {
        xe.onCommitFiberUnmount(Ol, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        oe || _n(l, e), Ln(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        oe || _n(l, e);
        var a = Qt, r = Ae;
        _l(l.type) && (Qt = l.stateNode, Ae = !1), Ln(
          t,
          e,
          l
        ), eo(l.stateNode), Qt = a, Ae = r;
        break;
      case 5:
        oe || _n(l, e);
      case 6:
        if (a = Qt, r = Ae, Qt = null, Ln(
          t,
          e,
          l
        ), Qt = a, Ae = r, Qt !== null)
          if (Ae)
            try {
              (Qt.nodeType === 9 ? Qt.body : Qt.nodeName === "HTML" ? Qt.ownerDocument.body : Qt).removeChild(l.stateNode);
            } catch (c) {
              qt(
                l,
                e,
                c
              );
            }
          else
            try {
              Qt.removeChild(l.stateNode);
            } catch (c) {
              qt(
                l,
                e,
                c
              );
            }
        break;
      case 18:
        Qt !== null && (Ae ? (t = Qt, Em(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), Fa(t)) : Em(Qt, l.stateNode));
        break;
      case 4:
        a = Qt, r = Ae, Qt = l.stateNode.containerInfo, Ae = !0, Ln(
          t,
          e,
          l
        ), Qt = a, Ae = r;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        gl(2, l, e), oe || gl(4, l, e), Ln(
          t,
          e,
          l
        );
        break;
      case 1:
        oe || (_n(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && zg(
          l,
          e,
          a
        )), Ln(
          t,
          e,
          l
        );
        break;
      case 21:
        Ln(
          t,
          e,
          l
        );
        break;
      case 22:
        oe = (a = oe) || l.memoizedState !== null, Ln(
          t,
          e,
          l
        ), oe = a;
        break;
      default:
        Ln(
          t,
          e,
          l
        );
    }
  }
  function Rg(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Fa(t);
      } catch (l) {
        qt(e, e.return, l);
      }
    }
  }
  function Hg(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Fa(t);
      } catch (l) {
        qt(e, e.return, l);
      }
  }
  function Gb(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Cg()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Cg()), e;
      default:
        throw Error(u(435, t.tag));
    }
  }
  function Ru(t, e) {
    var l = Gb(t);
    e.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var r = e1.bind(null, t, a);
        a.then(r, r);
      }
    });
  }
  function Ce(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var r = l[a], c = t, m = e, x = m;
        t: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (_l(x.type)) {
                Qt = x.stateNode, Ae = !1;
                break t;
              }
              break;
            case 5:
              Qt = x.stateNode, Ae = !1;
              break t;
            case 3:
            case 4:
              Qt = x.stateNode.containerInfo, Ae = !0;
              break t;
          }
          x = x.return;
        }
        if (Qt === null) throw Error(u(160));
        Og(c, m, r), Qt = null, Ae = !1, c = r.alternate, c !== null && (c.return = null), r.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        kg(e, t), e = e.sibling;
  }
  var cn = null;
  function kg(t, e) {
    var l = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ce(e, t), Te(t), a & 4 && (gl(3, t, t.return), Zi(3, t), gl(5, t, t.return));
        break;
      case 1:
        Ce(e, t), Te(t), a & 512 && (oe || l === null || _n(l, l.return)), a & 64 && Yn && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
        break;
      case 26:
        var r = cn;
        if (Ce(e, t), Te(t), a & 512 && (oe || l === null || _n(l, l.return)), a & 4) {
          var c = l !== null ? l.memoizedState : null;
          if (a = t.memoizedState, l === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, l = t.memoizedProps, r = r.ownerDocument || r;
                  e: switch (a) {
                    case "title":
                      c = r.getElementsByTagName("title")[0], (!c || c[kl] || c[ce] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = r.createElement(a), r.head.insertBefore(
                        c,
                        r.querySelector("head > title")
                      )), me(c, a, l), c[ce] = t, ne(c), a = c;
                      break t;
                    case "link":
                      var m = km(
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
                      c = r.createElement(a), me(c, a, l), r.head.appendChild(c);
                      break;
                    case "meta":
                      if (m = km(
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
                      c = r.createElement(a), me(c, a, l), r.head.appendChild(c);
                      break;
                    default:
                      throw Error(u(468, a));
                  }
                  c[ce] = t, ne(c), a = c;
                }
                t.stateNode = a;
              } else
                Bm(
                  r,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Hm(
                r,
                a,
                t.memoizedProps
              );
          else
            c !== a ? (c === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : c.count--, a === null ? Bm(
              r,
              t.type,
              t.stateNode
            ) : Hm(
              r,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && ws(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        Ce(e, t), Te(t), a & 512 && (oe || l === null || _n(l, l.return)), l !== null && a & 4 && ws(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (Ce(e, t), Te(t), a & 512 && (oe || l === null || _n(l, l.return)), t.flags & 32) {
          r = t.stateNode;
          try {
            ba(r, "");
          } catch (dt) {
            qt(t, t.return, dt);
          }
        }
        a & 4 && t.stateNode != null && (r = t.memoizedProps, ws(
          t,
          r,
          l !== null ? l.memoizedProps : r
        )), a & 1024 && (Ms = !0);
        break;
      case 6:
        if (Ce(e, t), Te(t), a & 4) {
          if (t.stateNode === null)
            throw Error(u(162));
          a = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = a;
          } catch (dt) {
            qt(t, t.return, dt);
          }
        }
        break;
      case 3:
        if (Ju = null, r = cn, cn = Qu(e.containerInfo), Ce(e, t), cn = r, Te(t), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Fa(e.containerInfo);
          } catch (dt) {
            qt(t, t.return, dt);
          }
        Ms && (Ms = !1, Bg(t));
        break;
      case 4:
        a = cn, cn = Qu(
          t.stateNode.containerInfo
        ), Ce(e, t), Te(t), cn = a;
        break;
      case 12:
        Ce(e, t), Te(t);
        break;
      case 31:
        Ce(e, t), Te(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Ru(t, a)));
        break;
      case 13:
        Ce(e, t), Te(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ku = It()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Ru(t, a)));
        break;
      case 22:
        r = t.memoizedState !== null;
        var D = l !== null && l.memoizedState !== null, G = Yn, et = oe;
        if (Yn = G || r, oe = et || D, Ce(e, t), oe = et, Yn = G, Te(t), a & 8192)
          t: for (e = t.stateNode, e._visibility = r ? e._visibility & -2 : e._visibility | 1, r && (l === null || D || Yn || oe || Fl(t)), l = null, e = t; ; ) {
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
                  qt(D, D.return, dt);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                D = e;
                try {
                  D.stateNode.nodeValue = r ? "" : D.memoizedProps;
                } catch (dt) {
                  qt(D, D.return, dt);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                D = e;
                try {
                  var F = D.stateNode;
                  r ? zm(F, !0) : zm(D.stateNode, !1);
                } catch (dt) {
                  qt(D, D.return, dt);
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
        a & 4 && (a = t.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, Ru(t, l))));
        break;
      case 19:
        Ce(e, t), Te(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Ru(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ce(e, t), Te(t);
    }
  }
  function Te(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (Ng(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(u(160));
        switch (l.tag) {
          case 27:
            var r = l.stateNode, c = Es(t);
            Ou(t, c, r);
            break;
          case 5:
            var m = l.stateNode;
            l.flags & 32 && (ba(m, ""), l.flags &= -33);
            var x = Es(t);
            Ou(t, x, m);
            break;
          case 3:
          case 4:
            var D = l.stateNode.containerInfo, G = Es(t);
            zs(
              t,
              G,
              D
            );
            break;
          default:
            throw Error(u(161));
        }
      } catch (et) {
        qt(t, t.return, et);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Bg(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Bg(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function Vn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Tg(t, e.alternate, e), e = e.sibling;
  }
  function Fl(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          gl(4, e, e.return), Fl(e);
          break;
        case 1:
          _n(e, e.return);
          var l = e.stateNode;
          typeof l.componentWillUnmount == "function" && zg(
            e,
            e.return,
            l
          ), Fl(e);
          break;
        case 27:
          eo(e.stateNode);
        case 26:
        case 5:
          _n(e, e.return), Fl(e);
          break;
        case 22:
          e.memoizedState === null && Fl(e);
          break;
        case 30:
          Fl(e);
          break;
        default:
          Fl(e);
      }
      t = t.sibling;
    }
  }
  function Xn(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var a = e.alternate, r = t, c = e, m = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Xn(
            r,
            c,
            l
          ), Zi(4, c);
          break;
        case 1:
          if (Xn(
            r,
            c,
            l
          ), a = c, r = a.stateNode, typeof r.componentDidMount == "function")
            try {
              r.componentDidMount();
            } catch (G) {
              qt(a, a.return, G);
            }
          if (a = c, r = a.updateQueue, r !== null) {
            var x = a.stateNode;
            try {
              var D = r.shared.hiddenCallbacks;
              if (D !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < D.length; r++)
                  hh(D[r], x);
            } catch (G) {
              qt(a, a.return, G);
            }
          }
          l && m & 64 && Eg(c), Gi(c, c.return);
          break;
        case 27:
          Ag(c);
        case 26:
        case 5:
          Xn(
            r,
            c,
            l
          ), l && a === null && m & 4 && Mg(c), Gi(c, c.return);
          break;
        case 12:
          Xn(
            r,
            c,
            l
          );
          break;
        case 31:
          Xn(
            r,
            c,
            l
          ), l && m & 4 && Rg(r, c);
          break;
        case 13:
          Xn(
            r,
            c,
            l
          ), l && m & 4 && Hg(r, c);
          break;
        case 22:
          c.memoizedState === null && Xn(
            r,
            c,
            l
          ), Gi(c, c.return);
          break;
        case 30:
          break;
        default:
          Xn(
            r,
            c,
            l
          );
      }
      e = e.sibling;
    }
  }
  function Ns(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && Oi(l));
  }
  function As(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Oi(t));
  }
  function sn(t, e, l, a) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Ug(
          t,
          e,
          l,
          a
        ), e = e.sibling;
  }
  function Ug(t, e, l, a) {
    var r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        sn(
          t,
          e,
          l,
          a
        ), r & 2048 && Zi(9, e);
        break;
      case 1:
        sn(
          t,
          e,
          l,
          a
        );
        break;
      case 3:
        sn(
          t,
          e,
          l,
          a
        ), r & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Oi(t)));
        break;
      case 12:
        if (r & 2048) {
          sn(
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
            qt(e, e.return, D);
          }
        } else
          sn(
            t,
            e,
            l,
            a
          );
        break;
      case 31:
        sn(
          t,
          e,
          l,
          a
        );
        break;
      case 13:
        sn(
          t,
          e,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        c = e.stateNode, m = e.alternate, e.memoizedState !== null ? c._visibility & 2 ? sn(
          t,
          e,
          l,
          a
        ) : Qi(t, e) : c._visibility & 2 ? sn(
          t,
          e,
          l,
          a
        ) : (c._visibility |= 2, ja(
          t,
          e,
          l,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), r & 2048 && Ns(m, e);
        break;
      case 24:
        sn(
          t,
          e,
          l,
          a
        ), r & 2048 && As(e.alternate, e);
        break;
      default:
        sn(
          t,
          e,
          l,
          a
        );
    }
  }
  function ja(t, e, l, a, r) {
    for (r = r && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var c = t, m = e, x = l, D = a, G = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          ja(
            c,
            m,
            x,
            D,
            r
          ), Zi(8, m);
          break;
        case 23:
          break;
        case 22:
          var et = m.stateNode;
          m.memoizedState !== null ? et._visibility & 2 ? ja(
            c,
            m,
            x,
            D,
            r
          ) : Qi(
            c,
            m
          ) : (et._visibility |= 2, ja(
            c,
            m,
            x,
            D,
            r
          )), r && G & 2048 && Ns(
            m.alternate,
            m
          );
          break;
        case 24:
          ja(
            c,
            m,
            x,
            D,
            r
          ), r && G & 2048 && As(m.alternate, m);
          break;
        default:
          ja(
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
  function Qi(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, a = e, r = a.flags;
        switch (a.tag) {
          case 22:
            Qi(l, a), r & 2048 && Ns(
              a.alternate,
              a
            );
            break;
          case 24:
            Qi(l, a), r & 2048 && As(a.alternate, a);
            break;
          default:
            Qi(l, a);
        }
        e = e.sibling;
      }
  }
  var Ki = 8192;
  function Ya(t, e, l) {
    if (t.subtreeFlags & Ki)
      for (t = t.child; t !== null; )
        qg(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function qg(t, e, l) {
    switch (t.tag) {
      case 26:
        Ya(
          t,
          e,
          l
        ), t.flags & Ki && t.memoizedState !== null && O1(
          l,
          cn,
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
        var a = cn;
        cn = Qu(t.stateNode.containerInfo), Ya(
          t,
          e,
          l
        ), cn = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Ki, Ki = 16777216, Ya(
          t,
          e,
          l
        ), Ki = a) : Ya(
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
  function jg(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function Ji(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          fe = a, Lg(
            a,
            t
          );
        }
      jg(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Yg(t), t = t.sibling;
  }
  function Yg(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ji(t), t.flags & 2048 && gl(9, t, t.return);
        break;
      case 3:
        Ji(t);
        break;
      case 12:
        Ji(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Hu(t)) : Ji(t);
        break;
      default:
        Ji(t);
    }
  }
  function Hu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          fe = a, Lg(
            a,
            t
          );
        }
      jg(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          gl(8, e, e.return), Hu(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, Hu(e));
          break;
        default:
          Hu(e);
      }
      t = t.sibling;
    }
  }
  function Lg(t, e) {
    for (; fe !== null; ) {
      var l = fe;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          gl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Oi(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, fe = a;
      else
        t: for (l = t; fe !== null; ) {
          a = fe;
          var r = a.sibling, c = a.return;
          if (Dg(a), a === l) {
            fe = null;
            break t;
          }
          if (r !== null) {
            r.return = c, fe = r;
            break t;
          }
          fe = c;
        }
    }
  }
  var Qb = {
    getCacheForType: function(t) {
      var e = he(le), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return he(le).controller.signal;
    }
  }, Kb = typeof WeakMap == "function" ? WeakMap : Map, Bt = 0, Xt = null, Nt = null, Ct = 0, Ut = 0, Ye = null, ml = !1, La = !1, Cs = !1, $n = 0, Wt = 0, pl = 0, Wl = 0, Ts = 0, Le = 0, Va = 0, Fi = null, De = null, Ds = !1, ku = 0, Vg = 0, Bu = 1 / 0, Uu = null, yl = null, se = 0, vl = null, Xa = null, Zn = 0, Os = 0, Rs = null, Xg = null, Wi = 0, Hs = null;
  function Ve() {
    return (Bt & 2) !== 0 && Ct !== 0 ? Ct & -Ct : E.T !== null ? Ys() : Vo();
  }
  function $g() {
    if (Le === 0)
      if ((Ct & 536870912) === 0 || Dt) {
        var t = fa;
        fa <<= 1, (fa & 3932160) === 0 && (fa = 262144), Le = t;
      } else Le = 536870912;
    return t = qe.current, t !== null && (t.flags |= 32), Le;
  }
  function Oe(t, e, l) {
    (t === Xt && (Ut === 2 || Ut === 9) || t.cancelPendingCommit !== null) && ($a(t, 0), bl(
      t,
      Ct,
      Le,
      !1
    )), Hl(t, l), ((Bt & 2) === 0 || t !== Xt) && (t === Xt && ((Bt & 2) === 0 && (Wl |= l), Wt === 4 && bl(
      t,
      Ct,
      Le,
      !1
    )), Sn(t));
  }
  function Zg(t, e, l) {
    if ((Bt & 6) !== 0) throw Error(u(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Rl(t, e), r = a ? Wb(t, e) : Bs(t, e, !0), c = a;
    do {
      if (r === 0) {
        La && !a && bl(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, c && !Jb(l)) {
          r = Bs(t, e, !1), c = !1;
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
              r = Fi;
              var D = x.current.memoizedState.isDehydrated;
              if (D && ($a(x, m).flags |= 256), m = Bs(
                x,
                m,
                !1
              ), m !== 2) {
                if (Cs && !D) {
                  x.errorRecoveryDisabledLanes |= c, Wl |= c, r = 4;
                  break t;
                }
                c = De, De = r, c !== null && (De === null ? De = c : De.push.apply(
                  De,
                  c
                ));
              }
              r = m;
            }
            if (c = !1, r !== 2) continue;
          }
        }
        if (r === 1) {
          $a(t, 0), bl(t, e, 0, !0);
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
              bl(
                a,
                e,
                Le,
                !ml
              );
              break t;
            case 2:
              De = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((e & 62914560) === e && (r = ku + 300 - It(), 10 < r)) {
            if (bl(
              a,
              e,
              Le,
              !ml
            ), ha(a, 0, !0) !== 0) break t;
            Zn = e, a.timeoutHandle = Sm(
              Gg.bind(
                null,
                a,
                l,
                De,
                Uu,
                Ds,
                e,
                Le,
                Wl,
                Va,
                ml,
                c,
                "Throttled",
                -0,
                0
              ),
              r
            );
            break t;
          }
          Gg(
            a,
            l,
            De,
            Uu,
            Ds,
            e,
            Le,
            Wl,
            Va,
            ml,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Sn(t);
  }
  function Gg(t, e, l, a, r, c, m, x, D, G, et, it, K, F) {
    if (t.timeoutHandle = -1, it = e.subtreeFlags, it & 8192 || (it & 16785408) === 16785408) {
      it = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Tn
      }, qg(
        e,
        c,
        it
      );
      var dt = (c & 62914560) === c ? ku - It() : (c & 4194048) === c ? Vg - It() : 0;
      if (dt = R1(
        it,
        dt
      ), dt !== null) {
        Zn = c, t.cancelPendingCommit = dt(
          tm.bind(
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
        ), bl(t, c, m, !G);
        return;
      }
    }
    tm(
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
  function Jb(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var r = l[a], c = r.getSnapshot;
          r = r.value;
          try {
            if (!Be(c(), r)) return !1;
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
  function bl(t, e, l, a) {
    e &= ~Ts, e &= ~Wl, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var r = e; 0 < r; ) {
      var c = 31 - _e(r), m = 1 << c;
      a[c] = -1, r &= ~m;
    }
    l !== 0 && jo(t, l, e);
  }
  function qu() {
    return (Bt & 6) === 0 ? (Ii(0), !1) : !0;
  }
  function ks() {
    if (Nt !== null) {
      if (Ut === 0)
        var t = Nt.return;
      else
        t = Nt, Hn = Vl = null, Wc(t), Ha = null, Hi = 0, t = Nt;
      for (; t !== null; )
        wg(t.alternate, t), t = t.return;
      Nt = null;
    }
  }
  function $a(t, e) {
    var l = t.timeoutHandle;
    l !== -1 && (t.timeoutHandle = -1, m1(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), Zn = 0, ks(), Xt = t, Nt = l = On(t.current, null), Ct = e, Ut = 0, Ye = null, ml = !1, La = Rl(t, e), Cs = !1, Va = Le = Ts = Wl = pl = Wt = 0, De = Fi = null, Ds = !1, (e & 8) !== 0 && (e |= e & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= e; 0 < a; ) {
        var r = 31 - _e(a), c = 1 << r;
        e |= t[r], a &= ~c;
      }
    return $n = e, iu(), l;
  }
  function Qg(t, e) {
    zt = null, E.H = Vi, e === Ra || e === hu ? (e = ch(), Ut = 3) : e === jc ? (e = ch(), Ut = 4) : Ut = e === hs ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Ye = e, Nt === null && (Wt = 1, Nu(
      t,
      Ie(e, t.current)
    ));
  }
  function Kg() {
    var t = qe.current;
    return t === null ? !0 : (Ct & 4194048) === Ct ? nn === null : (Ct & 62914560) === Ct || (Ct & 536870912) !== 0 ? t === nn : !1;
  }
  function Jg() {
    var t = E.H;
    return E.H = Vi, t === null ? Vi : t;
  }
  function Fg() {
    var t = E.A;
    return E.A = Qb, t;
  }
  function ju() {
    Wt = 4, ml || (Ct & 4194048) !== Ct && qe.current !== null || (La = !0), (pl & 134217727) === 0 && (Wl & 134217727) === 0 || Xt === null || bl(
      Xt,
      Ct,
      Le,
      !1
    );
  }
  function Bs(t, e, l) {
    var a = Bt;
    Bt |= 2;
    var r = Jg(), c = Fg();
    (Xt !== t || Ct !== e) && (Uu = null, $a(t, e)), e = !1;
    var m = Wt;
    t: do
      try {
        if (Ut !== 0 && Nt !== null) {
          var x = Nt, D = Ye;
          switch (Ut) {
            case 8:
              ks(), m = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              qe.current === null && (e = !0);
              var G = Ut;
              if (Ut = 0, Ye = null, Za(t, x, D, G), l && La) {
                m = 0;
                break t;
              }
              break;
            default:
              G = Ut, Ut = 0, Ye = null, Za(t, x, D, G);
          }
        }
        Fb(), m = Wt;
        break;
      } catch (et) {
        Qg(t, et);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Hn = Vl = null, Bt = a, E.H = r, E.A = c, Nt === null && (Xt = null, Ct = 0, iu()), m;
  }
  function Fb() {
    for (; Nt !== null; ) Wg(Nt);
  }
  function Wb(t, e) {
    var l = Bt;
    Bt |= 2;
    var a = Jg(), r = Fg();
    Xt !== t || Ct !== e ? (Uu = null, Bu = It() + 500, $a(t, e)) : La = Rl(
      t,
      e
    );
    t: do
      try {
        if (Ut !== 0 && Nt !== null) {
          e = Nt;
          var c = Ye;
          e: switch (Ut) {
            case 1:
              Ut = 0, Ye = null, Za(t, e, c, 1);
              break;
            case 2:
            case 9:
              if (uh(c)) {
                Ut = 0, Ye = null, Ig(e);
                break;
              }
              e = function() {
                Ut !== 2 && Ut !== 9 || Xt !== t || (Ut = 7), Sn(t);
              }, c.then(e, e);
              break t;
            case 3:
              Ut = 7;
              break t;
            case 4:
              Ut = 5;
              break t;
            case 7:
              uh(c) ? (Ut = 0, Ye = null, Ig(e)) : (Ut = 0, Ye = null, Za(t, e, c, 7));
              break;
            case 5:
              var m = null;
              switch (Nt.tag) {
                case 26:
                  m = Nt.memoizedState;
                case 5:
                case 27:
                  var x = Nt;
                  if (m ? Um(m) : x.stateNode.complete) {
                    Ut = 0, Ye = null;
                    var D = x.sibling;
                    if (D !== null) Nt = D;
                    else {
                      var G = x.return;
                      G !== null ? (Nt = G, Yu(G)) : Nt = null;
                    }
                    break e;
                  }
              }
              Ut = 0, Ye = null, Za(t, e, c, 5);
              break;
            case 6:
              Ut = 0, Ye = null, Za(t, e, c, 6);
              break;
            case 8:
              ks(), Wt = 6;
              break t;
            default:
              throw Error(u(462));
          }
        }
        Ib();
        break;
      } catch (et) {
        Qg(t, et);
      }
    while (!0);
    return Hn = Vl = null, E.H = a, E.A = r, Bt = l, Nt !== null ? 0 : (Xt = null, Ct = 0, iu(), Wt);
  }
  function Ib() {
    for (; Nt !== null && !Dl(); )
      Wg(Nt);
  }
  function Wg(t) {
    var e = _g(t.alternate, t, $n);
    t.memoizedProps = t.pendingProps, e === null ? Yu(t) : Nt = e;
  }
  function Ig(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = mg(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          Ct
        );
        break;
      case 11:
        e = mg(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          Ct
        );
        break;
      case 5:
        Wc(e);
      default:
        wg(l, e), e = Nt = Fd(e, $n), e = _g(l, e, $n);
    }
    t.memoizedProps = t.pendingProps, e === null ? Yu(t) : Nt = e;
  }
  function Za(t, e, l, a) {
    Hn = Vl = null, Wc(e), Ha = null, Hi = 0;
    var r = e.return;
    try {
      if (Yb(
        t,
        r,
        e,
        l,
        Ct
      )) {
        Wt = 1, Nu(
          t,
          Ie(l, t.current)
        ), Nt = null;
        return;
      }
    } catch (c) {
      if (r !== null) throw Nt = r, c;
      Wt = 1, Nu(
        t,
        Ie(l, t.current)
      ), Nt = null;
      return;
    }
    e.flags & 32768 ? (Dt || a === 1 ? t = !0 : La || (Ct & 536870912) !== 0 ? t = !1 : (ml = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = qe.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Pg(e, t)) : Yu(e);
  }
  function Yu(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Pg(
          e,
          ml
        );
        return;
      }
      t = e.return;
      var l = Xb(
        e.alternate,
        e,
        $n
      );
      if (l !== null) {
        Nt = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        Nt = e;
        return;
      }
      Nt = e = t;
    } while (e !== null);
    Wt === 0 && (Wt = 5);
  }
  function Pg(t, e) {
    do {
      var l = $b(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, Nt = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        Nt = t;
        return;
      }
      Nt = t = l;
    } while (t !== null);
    Wt = 6, Nt = null;
  }
  function tm(t, e, l, a, r, c, m, x, D) {
    t.cancelPendingCommit = null;
    do
      Lu();
    while (se !== 0);
    if ((Bt & 6) !== 0) throw Error(u(327));
    if (e !== null) {
      if (e === t.current) throw Error(u(177));
      if (c = e.lanes | e.childLanes, c |= Ec, ec(
        t,
        l,
        c,
        m,
        x,
        D
      ), t === Xt && (Nt = Xt = null, Ct = 0), Xa = e, vl = t, Zn = l, Os = c, Rs = r, Xg = a, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, n1(Fe, function() {
        return im(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
        a = E.T, E.T = null, r = O.p, O.p = 2, m = Bt, Bt |= 4;
        try {
          Zb(t, e, l);
        } finally {
          Bt = m, O.p = r, E.T = a;
        }
      }
      se = 1, em(), nm(), lm();
    }
  }
  function em() {
    if (se === 1) {
      se = 0;
      var t = vl, e = Xa, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = E.T, E.T = null;
        var a = O.p;
        O.p = 2;
        var r = Bt;
        Bt |= 4;
        try {
          kg(e, t);
          var c = Ks, m = Ld(t.containerInfo), x = c.focusedElem, D = c.selectionRange;
          if (m !== x && x && x.ownerDocument && Yd(
            x.ownerDocument.documentElement,
            x
          )) {
            if (D !== null && bc(x)) {
              var G = D.start, et = D.end;
              if (et === void 0 && (et = G), "selectionStart" in x)
                x.selectionStart = G, x.selectionEnd = Math.min(
                  et,
                  x.value.length
                );
              else {
                var it = x.ownerDocument || document, K = it && it.defaultView || window;
                if (K.getSelection) {
                  var F = K.getSelection(), dt = x.textContent.length, vt = Math.min(D.start, dt), Lt = D.end === void 0 ? vt : Math.min(D.end, dt);
                  !F.extend && vt > Lt && (m = Lt, Lt = vt, vt = m);
                  var j = jd(
                    x,
                    vt
                  ), k = jd(
                    x,
                    Lt
                  );
                  if (j && k && (F.rangeCount !== 1 || F.anchorNode !== j.node || F.anchorOffset !== j.offset || F.focusNode !== k.node || F.focusOffset !== k.offset)) {
                    var $ = it.createRange();
                    $.setStart(j.node, j.offset), F.removeAllRanges(), vt > Lt ? (F.addRange($), F.extend(k.node, k.offset)) : ($.setEnd(k.node, k.offset), F.addRange($));
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
          Pu = !!Qs, Ks = Qs = null;
        } finally {
          Bt = r, O.p = a, E.T = l;
        }
      }
      t.current = e, se = 2;
    }
  }
  function nm() {
    if (se === 2) {
      se = 0;
      var t = vl, e = Xa, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = E.T, E.T = null;
        var a = O.p;
        O.p = 2;
        var r = Bt;
        Bt |= 4;
        try {
          Tg(t, e.alternate, e);
        } finally {
          Bt = r, O.p = a, E.T = l;
        }
      }
      se = 3;
    }
  }
  function lm() {
    if (se === 4 || se === 3) {
      se = 0, Mn();
      var t = vl, e = Xa, l = Zn, a = Xg;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? se = 5 : (se = 0, Xa = vl = null, am(t, t.pendingLanes));
      var r = t.pendingLanes;
      if (r === 0 && (yl = null), hi(l), e = e.stateNode, xe && typeof xe.onCommitFiberRoot == "function")
        try {
          xe.onCommitFiberRoot(
            Ol,
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
      (Zn & 3) !== 0 && Lu(), Sn(t), r = t.pendingLanes, (l & 261930) !== 0 && (r & 42) !== 0 ? t === Hs ? Wi++ : (Wi = 0, Hs = t) : Wi = 0, Ii(0);
    }
  }
  function am(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Oi(e)));
  }
  function Lu() {
    return em(), nm(), lm(), im();
  }
  function im() {
    if (se !== 5) return !1;
    var t = vl, e = Os;
    Os = 0;
    var l = hi(Zn), a = E.T, r = O.p;
    try {
      O.p = 32 > l ? 32 : l, E.T = null, l = Rs, Rs = null;
      var c = vl, m = Zn;
      if (se = 0, Xa = vl = null, Zn = 0, (Bt & 6) !== 0) throw Error(u(331));
      var x = Bt;
      if (Bt |= 4, Yg(c.current), Ug(
        c,
        c.current,
        m,
        l
      ), Bt = x, Ii(0, !1), xe && typeof xe.onPostCommitFiberRoot == "function")
        try {
          xe.onPostCommitFiberRoot(Ol, c);
        } catch {
        }
      return !0;
    } finally {
      O.p = r, E.T = a, am(t, e);
    }
  }
  function om(t, e, l) {
    e = Ie(l, e), e = ds(t.stateNode, e, 2), t = fl(t, e, 2), t !== null && (Hl(t, 2), Sn(t));
  }
  function qt(t, e, l) {
    if (t.tag === 3)
      om(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          om(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (yl === null || !yl.has(a))) {
            t = Ie(l, t), l = ug(2), a = fl(e, l, 2), a !== null && (rg(
              l,
              a,
              e,
              t
            ), Hl(a, 2), Sn(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function Us(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Kb();
      var r = /* @__PURE__ */ new Set();
      a.set(e, r);
    } else
      r = a.get(e), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(e, r));
    r.has(l) || (Cs = !0, r.add(l), t = Pb.bind(null, t, e, l), e.then(t, t));
  }
  function Pb(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Xt === t && (Ct & l) === l && (Wt === 4 || Wt === 3 && (Ct & 62914560) === Ct && 300 > It() - ku ? (Bt & 2) === 0 && $a(t, 0) : Ts |= l, Va === Ct && (Va = 0)), Sn(t);
  }
  function um(t, e) {
    e === 0 && (e = qo()), t = jl(t, e), t !== null && (Hl(t, e), Sn(t));
  }
  function t1(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), um(t, l);
  }
  function e1(t, e) {
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
    a !== null && a.delete(e), um(t, l);
  }
  function n1(t, e) {
    return Ee(t, e);
  }
  var Vu = null, Ga = null, qs = !1, Xu = !1, js = !1, xl = 0;
  function Sn(t) {
    t !== Ga && t.next === null && (Ga === null ? Vu = Ga = t : Ga = Ga.next = t), Xu = !0, qs || (qs = !0, a1());
  }
  function Ii(t, e) {
    if (!js && Xu) {
      js = !0;
      do
        for (var l = !1, a = Vu; a !== null; ) {
          if (t !== 0) {
            var r = a.pendingLanes;
            if (r === 0) var c = 0;
            else {
              var m = a.suspendedLanes, x = a.pingedLanes;
              c = (1 << 31 - _e(42 | t) + 1) - 1, c &= r & ~(m & ~x), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (l = !0, fm(a, c));
          } else
            c = Ct, c = ha(
              a,
              a === Xt ? c : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (c & 3) === 0 || Rl(a, c) || (l = !0, fm(a, c));
          a = a.next;
        }
      while (l);
      js = !1;
    }
  }
  function l1() {
    rm();
  }
  function rm() {
    Xu = qs = !1;
    var t = 0;
    xl !== 0 && g1() && (t = xl);
    for (var e = It(), l = null, a = Vu; a !== null; ) {
      var r = a.next, c = cm(a, e);
      c === 0 ? (a.next = null, l === null ? Vu = r : l.next = r, r === null && (Ga = l)) : (l = a, (t !== 0 || (c & 3) !== 0) && (Xu = !0)), a = r;
    }
    se !== 0 && se !== 5 || Ii(t), xl !== 0 && (xl = 0);
  }
  function cm(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, r = t.expirationTimes, c = t.pendingLanes & -62914561; 0 < c; ) {
      var m = 31 - _e(c), x = 1 << m, D = r[m];
      D === -1 ? ((x & l) === 0 || (x & a) !== 0) && (r[m] = tc(x, e)) : D <= e && (t.expiredLanes |= x), c &= ~x;
    }
    if (e = Xt, l = Ct, l = ha(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (Ut === 2 || Ut === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && He(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Rl(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && He(a), hi(l)) {
        case 2:
        case 8:
          l = Je;
          break;
        case 32:
          l = Fe;
          break;
        case 268435456:
          l = ca;
          break;
        default:
          l = Fe;
      }
      return a = sm.bind(null, t), l = Ee(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && He(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function sm(t, e) {
    if (se !== 0 && se !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (Lu() && t.callbackNode !== l)
      return null;
    var a = Ct;
    return a = ha(
      t,
      t === Xt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (Zg(t, a, e), cm(t, It()), t.callbackNode != null && t.callbackNode === l ? sm.bind(null, t) : null);
  }
  function fm(t, e) {
    if (Lu()) return null;
    Zg(t, e, !0);
  }
  function a1() {
    p1(function() {
      (Bt & 6) !== 0 ? Ee(
        Ke,
        l1
      ) : rm();
    });
  }
  function Ys() {
    if (xl === 0) {
      var t = Da;
      t === 0 && (t = sa, sa <<= 1, (sa & 261888) === 0 && (sa = 256)), xl = t;
    }
    return xl;
  }
  function dm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Wo("" + t);
  }
  function hm(t, e) {
    var l = e.ownerDocument.createElement("input");
    return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
  }
  function i1(t, e, l, a, r) {
    if (e === "submit" && l && l.stateNode === r) {
      var c = dm(
        (r[ye] || null).action
      ), m = a.submitter;
      m && (e = (e = m[ye] || null) ? dm(e.formAction) : m.getAttribute("formAction"), e !== null && (c = e, m = null));
      var x = new eu(
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
                if (xl !== 0) {
                  var D = m ? hm(r, m) : new FormData(r);
                  os(
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
                typeof c == "function" && (x.preventDefault(), D = m ? hm(r, m) : new FormData(r), os(
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
  for (var Ls = 0; Ls < wc.length; Ls++) {
    var Vs = wc[Ls], o1 = Vs.toLowerCase(), u1 = Vs[0].toUpperCase() + Vs.slice(1);
    rn(
      o1,
      "on" + u1
    );
  }
  rn($d, "onAnimationEnd"), rn(Zd, "onAnimationIteration"), rn(Gd, "onAnimationStart"), rn("dblclick", "onDoubleClick"), rn("focusin", "onFocus"), rn("focusout", "onBlur"), rn(wb, "onTransitionRun"), rn(Eb, "onTransitionStart"), rn(zb, "onTransitionCancel"), rn(Qd, "onTransitionEnd"), nl("onMouseEnter", ["mouseout", "mouseover"]), nl("onMouseLeave", ["mouseout", "mouseover"]), nl("onPointerEnter", ["pointerout", "pointerover"]), nl("onPointerLeave", ["pointerout", "pointerover"]), Cn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Cn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Cn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Cn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Cn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Cn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Pi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), r1 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Pi)
  );
  function gm(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var a = t[l], r = a.event;
      a = a.listeners;
      t: {
        var c = void 0;
        if (e)
          for (var m = a.length - 1; 0 <= m; m--) {
            var x = a[m], D = x.instance, G = x.currentTarget;
            if (x = x.listener, D !== c && r.isPropagationStopped())
              break t;
            c = x, r.currentTarget = G;
            try {
              c(r);
            } catch (et) {
              au(et);
            }
            r.currentTarget = null, c = D;
          }
        else
          for (m = 0; m < a.length; m++) {
            if (x = a[m], D = x.instance, G = x.currentTarget, x = x.listener, D !== c && r.isPropagationStopped())
              break t;
            c = x, r.currentTarget = G;
            try {
              c(r);
            } catch (et) {
              au(et);
            }
            r.currentTarget = null, c = D;
          }
      }
    }
  }
  function At(t, e) {
    var l = e[ga];
    l === void 0 && (l = e[ga] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    l.has(a) || (mm(e, t, 2, !1), l.add(a));
  }
  function Xs(t, e, l) {
    var a = 0;
    e && (a |= 4), mm(
      l,
      t,
      a,
      e
    );
  }
  var $u = "_reactListening" + Math.random().toString(36).slice(2);
  function $s(t) {
    if (!t[$u]) {
      t[$u] = !0, Go.forEach(function(l) {
        l !== "selectionchange" && (r1.has(l) || Xs(l, !1, t), Xs(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[$u] || (e[$u] = !0, Xs("selectionchange", !1, e));
    }
  }
  function mm(t, e, l, a) {
    switch ($m(e)) {
      case 2:
        var r = B1;
        break;
      case 8:
        r = U1;
        break;
      default:
        r = of;
    }
    l = r.bind(
      null,
      e,
      l,
      t
    ), r = void 0, !sc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (r = !0), a ? r !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: r
    }) : t.addEventListener(e, l, !0) : r !== void 0 ? t.addEventListener(e, l, {
      passive: r
    }) : t.addEventListener(e, l, !1);
  }
  function Zs(t, e, l, a, r) {
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
            if (m = In(x), m === null) return;
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
      var G = c, et = rc(l), it = [];
      t: {
        var K = Kd.get(t);
        if (K !== void 0) {
          var F = eu, dt = t;
          switch (t) {
            case "keypress":
              if (Po(l) === 0) break t;
            case "keydown":
            case "keyup":
              F = eb;
              break;
            case "focusin":
              dt = "focus", F = gc;
              break;
            case "focusout":
              dt = "blur", F = gc;
              break;
            case "beforeblur":
            case "afterblur":
              F = gc;
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
              F = Xv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              F = ab;
              break;
            case $d:
            case Zd:
            case Gd:
              F = Gv;
              break;
            case Qd:
              F = ob;
              break;
            case "scroll":
            case "scrollend":
              F = Lv;
              break;
            case "wheel":
              F = rb;
              break;
            case "copy":
            case "cut":
            case "paste":
              F = Kv;
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
              F = sb;
          }
          var vt = (e & 4) !== 0, Lt = !vt && (t === "scroll" || t === "scrollend"), j = vt ? K !== null ? K + "Capture" : null : K;
          vt = [];
          for (var k = G, $; k !== null; ) {
            var at = k;
            if ($ = at.stateNode, at = at.tag, at !== 5 && at !== 26 && at !== 27 || $ === null || j === null || (at = _i(k, j), at != null && vt.push(
              to(k, at, $)
            )), Lt) break;
            k = k.return;
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
          if (K = t === "mouseover" || t === "pointerover", F = t === "mouseout" || t === "pointerout", K && l !== uc && (dt = l.relatedTarget || l.fromElement) && (In(dt) || dt[An]))
            break t;
          if ((F || K) && (K = et.window === et ? et : (K = et.ownerDocument) ? K.defaultView || K.parentWindow : window, F ? (dt = l.relatedTarget || l.toElement, F = G, dt = dt ? In(dt) : null, dt !== null && (Lt = f(dt), vt = dt.tag, dt !== Lt || vt !== 5 && vt !== 27 && vt !== 6) && (dt = null)) : (F = null, dt = G), F !== dt)) {
            if (vt = wd, at = "onMouseLeave", j = "onMouseEnter", k = "mouse", (t === "pointerout" || t === "pointerover") && (vt = zd, at = "onPointerLeave", j = "onPointerEnter", k = "pointer"), Lt = F == null ? K : tl(F), $ = dt == null ? K : tl(dt), K = new vt(
              at,
              k + "leave",
              F,
              l,
              et
            ), K.target = Lt, K.relatedTarget = $, at = null, In(et) === G && (vt = new vt(
              j,
              k + "enter",
              dt,
              l,
              et
            ), vt.target = $, vt.relatedTarget = Lt, at = vt), Lt = at, F && dt)
              e: {
                for (vt = c1, j = F, k = dt, $ = 0, at = j; at; at = vt(at))
                  $++;
                at = 0;
                for (var pt = k; pt; pt = vt(pt))
                  at++;
                for (; 0 < $ - at; )
                  j = vt(j), $--;
                for (; 0 < at - $; )
                  k = vt(k), at--;
                for (; $--; ) {
                  if (j === k || k !== null && j === k.alternate) {
                    vt = j;
                    break e;
                  }
                  j = vt(j), k = vt(k);
                }
                vt = null;
              }
            else vt = null;
            F !== null && pm(
              it,
              K,
              F,
              vt,
              !1
            ), dt !== null && Lt !== null && pm(
              it,
              Lt,
              dt,
              vt,
              !0
            );
          }
        }
        t: {
          if (K = G ? tl(G) : window, F = K.nodeName && K.nodeName.toLowerCase(), F === "select" || F === "input" && K.type === "file")
            var Ht = Rd;
          else if (Dd(K))
            if (Hd)
              Ht = xb;
            else {
              Ht = vb;
              var ht = yb;
            }
          else
            F = K.nodeName, !F || F.toLowerCase() !== "input" || K.type !== "checkbox" && K.type !== "radio" ? G && oc(G.elementType) && (Ht = Rd) : Ht = bb;
          if (Ht && (Ht = Ht(t, G))) {
            Od(
              it,
              Ht,
              l,
              et
            );
            break t;
          }
          ht && ht(t, K, G), t === "focusout" && G && K.type === "number" && G.memoizedProps.value != null && bi(K, "number", K.value);
        }
        switch (ht = G ? tl(G) : window, t) {
          case "focusin":
            (Dd(ht) || ht.contentEditable === "true") && (wa = ht, xc = G, Ci = null);
            break;
          case "focusout":
            Ci = xc = wa = null;
            break;
          case "mousedown":
            _c = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            _c = !1, Vd(it, l, et);
            break;
          case "selectionchange":
            if (Sb) break;
          case "keydown":
          case "keyup":
            Vd(it, l, et);
        }
        var Mt;
        if (pc)
          t: {
            switch (t) {
              case "compositionstart":
                var Tt = "onCompositionStart";
                break t;
              case "compositionend":
                Tt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Tt = "onCompositionUpdate";
                break t;
            }
            Tt = void 0;
          }
        else
          Sa ? Cd(t, l) && (Tt = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (Tt = "onCompositionStart");
        Tt && (Md && l.locale !== "ko" && (Sa || Tt !== "onCompositionStart" ? Tt === "onCompositionEnd" && Sa && (Mt = _d()) : (al = et, fc = "value" in al ? al.value : al.textContent, Sa = !0)), ht = Zu(G, Tt), 0 < ht.length && (Tt = new Ed(
          Tt,
          t,
          null,
          l,
          et
        ), it.push({ event: Tt, listeners: ht }), Mt ? Tt.data = Mt : (Mt = Td(l), Mt !== null && (Tt.data = Mt)))), (Mt = db ? hb(t, l) : gb(t, l)) && (Tt = Zu(G, "onBeforeInput"), 0 < Tt.length && (ht = new Ed(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          et
        ), it.push({
          event: ht,
          listeners: Tt
        }), ht.data = Mt)), i1(
          it,
          t,
          G,
          l,
          et
        );
      }
      gm(it, e);
    });
  }
  function to(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function Zu(t, e) {
    for (var l = e + "Capture", a = []; t !== null; ) {
      var r = t, c = r.stateNode;
      if (r = r.tag, r !== 5 && r !== 26 && r !== 27 || c === null || (r = _i(t, l), r != null && a.unshift(
        to(t, r, c)
      ), r = _i(t, e), r != null && a.push(
        to(t, r, c)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function c1(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function pm(t, e, l, a, r) {
    for (var c = e._reactName, m = []; l !== null && l !== a; ) {
      var x = l, D = x.alternate, G = x.stateNode;
      if (x = x.tag, D !== null && D === a) break;
      x !== 5 && x !== 26 && x !== 27 || G === null || (D = G, r ? (G = _i(l, c), G != null && m.unshift(
        to(l, G, D)
      )) : r || (G = _i(l, c), G != null && m.push(
        to(l, G, D)
      ))), l = l.return;
    }
    m.length !== 0 && t.push({ event: e, listeners: m });
  }
  var s1 = /\r\n?/g, f1 = /\u0000|\uFFFD/g;
  function ym(t) {
    return (typeof t == "string" ? t : "" + t).replace(s1, `
`).replace(f1, "");
  }
  function vm(t, e) {
    return e = ym(e), ym(t) === e;
  }
  function Yt(t, e, l, a, r, c) {
    switch (l) {
      case "children":
        typeof a == "string" ? e === "body" || e === "textarea" && a === "" || ba(t, a) : (typeof a == "number" || typeof a == "bigint") && e !== "body" && ba(t, "" + a);
        break;
      case "className":
        pa(t, "class", a);
        break;
      case "tabIndex":
        pa(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        pa(t, l, a);
        break;
      case "style":
        vd(t, a, c);
        break;
      case "data":
        if (e !== "object") {
          pa(t, "data", a);
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
        a = Wo("" + a), t.setAttribute(l, a);
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
        a = Wo("" + a), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = Tn);
        break;
      case "onScroll":
        a != null && At("scroll", t);
        break;
      case "onScrollEnd":
        a != null && At("scrollend", t);
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
        l = Wo("" + a), t.setAttributeNS(
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
        At("beforetoggle", t), At("toggle", t), ma(t, "popover", a);
        break;
      case "xlinkActuate":
        un(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        un(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        un(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        un(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        un(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        un(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        un(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        un(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        un(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        ma(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = jv.get(l) || l, ma(t, l, a));
    }
  }
  function Gs(t, e, l, a, r, c) {
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
        typeof a == "string" ? ba(t, a) : (typeof a == "number" || typeof a == "bigint") && ba(t, "" + a);
        break;
      case "onScroll":
        a != null && At("scroll", t);
        break;
      case "onScrollEnd":
        a != null && At("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = Tn);
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
        if (!Qo.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (r = l.endsWith("Capture"), e = l.slice(2, r ? l.length - 7 : void 0), c = t[ye] || null, c = c != null ? c[l] : null, typeof c == "function" && t.removeEventListener(e, c, r), typeof a == "function")) {
              typeof c != "function" && c !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, a, r);
              break t;
            }
            l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : ma(t, l, a);
          }
    }
  }
  function me(t, e, l) {
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
        At("error", t), At("load", t);
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
        At("invalid", t);
        var x = c = m = r = null, D = null, G = null;
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
                  G = et;
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
        va(
          t,
          c,
          x,
          D,
          G,
          m,
          r,
          !1
        );
        return;
      case "select":
        At("invalid", t), a = m = c = null;
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
        e = c, l = m, t.multiple = !!a, e != null ? ll(t, !!a, e, !1) : l != null && ll(t, !!a, l, !0);
        return;
      case "textarea":
        At("invalid", t), c = r = a = null;
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
        At("beforetoggle", t), At("toggle", t), At("cancel", t), At("close", t);
        break;
      case "iframe":
      case "object":
        At("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Pi.length; a++)
          At(Pi[a], t);
        break;
      case "image":
        At("error", t), At("load", t);
        break;
      case "details":
        At("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        At("error", t), At("load", t);
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
        for (G in l)
          if (l.hasOwnProperty(G) && (a = l[G], a != null))
            switch (G) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, e));
              default:
                Yt(t, e, G, a, l, null);
            }
        return;
      default:
        if (oc(e)) {
          for (et in l)
            l.hasOwnProperty(et) && (a = l[et], a !== void 0 && Gs(
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
  function d1(t, e, l, a) {
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
        var r = null, c = null, m = null, x = null, D = null, G = null, et = null;
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
                G = F;
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
        vi(
          t,
          m,
          x,
          D,
          G,
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
        e = x, l = m, a = F, K != null ? ll(t, !!l, K, !1) : !!a != !!l && (e != null ? ll(t, !!l, e, !0) : ll(t, !!l, l ? [] : "", !1));
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
        xi(t, K, F);
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
        for (G in a)
          if (K = a[G], F = l[G], a.hasOwnProperty(G) && K !== F && (K != null || F != null))
            switch (G) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (K != null)
                  throw Error(u(137, e));
                break;
              default:
                Yt(
                  t,
                  e,
                  G,
                  K,
                  a,
                  F
                );
            }
        return;
      default:
        if (oc(e)) {
          for (var Lt in l)
            K = l[Lt], l.hasOwnProperty(Lt) && K !== void 0 && !a.hasOwnProperty(Lt) && Gs(
              t,
              e,
              Lt,
              void 0,
              a,
              K
            );
          for (et in a)
            K = a[et], F = l[et], !a.hasOwnProperty(et) || K === F || K === void 0 && F === void 0 || Gs(
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
    for (var j in l)
      K = l[j], l.hasOwnProperty(j) && K != null && !a.hasOwnProperty(j) && Yt(t, e, j, null, a, K);
    for (it in a)
      K = a[it], F = l[it], !a.hasOwnProperty(it) || K === F || K == null && F == null || Yt(t, e, it, K, a, F);
  }
  function bm(t) {
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
  function h1() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var r = l[a], c = r.transferSize, m = r.initiatorType, x = r.duration;
        if (c && x && bm(m)) {
          for (m = 0, x = r.responseEnd, a += 1; a < l.length; a++) {
            var D = l[a], G = D.startTime;
            if (G > x) break;
            var et = D.transferSize, it = D.initiatorType;
            et && bm(it) && (D = D.responseEnd, m += et * (D < x ? 1 : (x - G) / (D - G)));
          }
          if (--a, e += 8 * (c + m) / (r.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Qs = null, Ks = null;
  function Gu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function xm(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function _m(t, e) {
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
  function Js(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Fs = null;
  function g1() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Fs ? !1 : (Fs = t, !0) : (Fs = null, !1);
  }
  var Sm = typeof setTimeout == "function" ? setTimeout : void 0, m1 = typeof clearTimeout == "function" ? clearTimeout : void 0, wm = typeof Promise == "function" ? Promise : void 0, p1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof wm < "u" ? function(t) {
    return wm.resolve(null).then(t).catch(y1);
  } : Sm;
  function y1(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function _l(t) {
    return t === "head";
  }
  function Em(t, e) {
    var l = e, a = 0;
    do {
      var r = l.nextSibling;
      if (t.removeChild(l), r && r.nodeType === 8)
        if (l = r.data, l === "/$" || l === "/&") {
          if (a === 0) {
            t.removeChild(r), Fa(e);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          eo(t.ownerDocument.documentElement);
        else if (l === "head") {
          l = t.ownerDocument.head, eo(l);
          for (var c = l.firstChild; c; ) {
            var m = c.nextSibling, x = c.nodeName;
            c[kl] || x === "SCRIPT" || x === "STYLE" || x === "LINK" && c.rel.toLowerCase() === "stylesheet" || l.removeChild(c), c = m;
          }
        } else
          l === "body" && eo(t.ownerDocument.body);
      l = r;
    } while (l);
    Fa(e);
  }
  function zm(t, e) {
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
  function Ws(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Ws(l), gi(l);
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
  function v1(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var r = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[kl])
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
      if (t = ln(t.nextSibling), t === null) break;
    }
    return null;
  }
  function b1(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = ln(t.nextSibling), t === null)) return null;
    return t;
  }
  function Mm(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = ln(t.nextSibling), t === null)) return null;
    return t;
  }
  function Is(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Ps(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function x1(t, e) {
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
  function ln(t) {
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
  var tf = null;
  function Nm(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return ln(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Am(t) {
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
  function Cm(t, e, l) {
    switch (e = Gu(l), t) {
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
  function eo(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    gi(t);
  }
  var an = /* @__PURE__ */ new Map(), Tm = /* @__PURE__ */ new Set();
  function Qu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Gn = O.d;
  O.d = {
    f: _1,
    r: S1,
    D: w1,
    C: E1,
    L: z1,
    m: M1,
    X: A1,
    S: N1,
    M: C1
  };
  function _1() {
    var t = Gn.f(), e = qu();
    return t || e;
  }
  function S1(t) {
    var e = Pn(t);
    e !== null && e.tag === 5 && e.type === "form" ? Qh(e) : Gn.r(t);
  }
  var Qa = typeof document > "u" ? null : document;
  function Dm(t, e, l) {
    var a = Qa;
    if (a && typeof e == "string" && e) {
      var r = Me(e);
      r = 'link[rel="' + t + '"][href="' + r + '"]', typeof l == "string" && (r += '[crossorigin="' + l + '"]'), Tm.has(r) || (Tm.add(r), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(r) === null && (e = a.createElement("link"), me(e, "link", t), ne(e), a.head.appendChild(e)));
    }
  }
  function w1(t) {
    Gn.D(t), Dm("dns-prefetch", t, null);
  }
  function E1(t, e) {
    Gn.C(t, e), Dm("preconnect", t, e);
  }
  function z1(t, e, l) {
    Gn.L(t, e, l);
    var a = Qa;
    if (a && t && e) {
      var r = 'link[rel="preload"][as="' + Me(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (r += '[imagesrcset="' + Me(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (r += '[imagesizes="' + Me(
        l.imageSizes
      ) + '"]')) : r += '[href="' + Me(t) + '"]';
      var c = r;
      switch (e) {
        case "style":
          c = Ka(t);
          break;
        case "script":
          c = Ja(t);
      }
      an.has(c) || (t = y(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), an.set(c, t), a.querySelector(r) !== null || e === "style" && a.querySelector(no(c)) || e === "script" && a.querySelector(lo(c)) || (e = a.createElement("link"), me(e, "link", t), ne(e), a.head.appendChild(e)));
    }
  }
  function M1(t, e) {
    Gn.m(t, e);
    var l = Qa;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", r = 'link[rel="modulepreload"][as="' + Me(a) + '"][href="' + Me(t) + '"]', c = r;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Ja(t);
      }
      if (!an.has(c) && (t = y({ rel: "modulepreload", href: t }, e), an.set(c, t), l.querySelector(r) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(lo(c)))
              return;
        }
        a = l.createElement("link"), me(a, "link", t), ne(a), l.head.appendChild(a);
      }
    }
  }
  function N1(t, e, l) {
    Gn.S(t, e, l);
    var a = Qa;
    if (a && t) {
      var r = el(a).hoistableStyles, c = Ka(t);
      e = e || "default";
      var m = r.get(c);
      if (!m) {
        var x = { loading: 0, preload: null };
        if (m = a.querySelector(
          no(c)
        ))
          x.loading = 5;
        else {
          t = y(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = an.get(c)) && ef(t, l);
          var D = m = a.createElement("link");
          ne(D), me(D, "link", t), D._p = new Promise(function(G, et) {
            D.onload = G, D.onerror = et;
          }), D.addEventListener("load", function() {
            x.loading |= 1;
          }), D.addEventListener("error", function() {
            x.loading |= 2;
          }), x.loading |= 4, Ku(m, e, a);
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
  function A1(t, e) {
    Gn.X(t, e);
    var l = Qa;
    if (l && t) {
      var a = el(l).hoistableScripts, r = Ja(t), c = a.get(r);
      c || (c = l.querySelector(lo(r)), c || (t = y({ src: t, async: !0 }, e), (e = an.get(r)) && nf(t, e), c = l.createElement("script"), ne(c), me(c, "link", t), l.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, a.set(r, c));
    }
  }
  function C1(t, e) {
    Gn.M(t, e);
    var l = Qa;
    if (l && t) {
      var a = el(l).hoistableScripts, r = Ja(t), c = a.get(r);
      c || (c = l.querySelector(lo(r)), c || (t = y({ src: t, async: !0, type: "module" }, e), (e = an.get(r)) && nf(t, e), c = l.createElement("script"), ne(c), me(c, "link", t), l.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, a.set(r, c));
    }
  }
  function Om(t, e, l, a) {
    var r = (r = ft.current) ? Qu(r) : null;
    if (!r) throw Error(u(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (e = Ka(l.href), l = el(
          r
        ).hoistableStyles, a = l.get(e), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = Ka(l.href);
          var c = el(
            r
          ).hoistableStyles, m = c.get(t);
          if (m || (r = r.ownerDocument || r, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(t, m), (c = r.querySelector(
            no(t)
          )) && !c._p && (m.instance = c, m.state.loading = 5), an.has(t) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, an.set(t, l), c || T1(
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
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = Ja(l), l = el(
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
  function Ka(t) {
    return 'href="' + Me(t) + '"';
  }
  function no(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Rm(t) {
    return y({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function T1(t, e, l, a) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? a.loading = 1 : (e = t.createElement("link"), a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    }), me(e, "link", l), ne(e), t.head.appendChild(e));
  }
  function Ja(t) {
    return '[src="' + Me(t) + '"]';
  }
  function lo(t) {
    return "script[async]" + t;
  }
  function Hm(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Me(l.href) + '"]'
          );
          if (a)
            return e.instance = a, ne(a), a;
          var r = y({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), ne(a), me(a, "style", r), Ku(a, l.precedence, t), e.instance = a;
        case "stylesheet":
          r = Ka(l.href);
          var c = t.querySelector(
            no(r)
          );
          if (c)
            return e.state.loading |= 4, e.instance = c, ne(c), c;
          a = Rm(l), (r = an.get(r)) && ef(a, r), c = (t.ownerDocument || t).createElement("link"), ne(c);
          var m = c;
          return m._p = new Promise(function(x, D) {
            m.onload = x, m.onerror = D;
          }), me(c, "link", a), e.state.loading |= 4, Ku(c, l.precedence, t), e.instance = c;
        case "script":
          return c = Ja(l.src), (r = t.querySelector(
            lo(c)
          )) ? (e.instance = r, ne(r), r) : (a = l, (r = an.get(c)) && (a = y({}, l), nf(a, r)), t = t.ownerDocument || t, r = t.createElement("script"), ne(r), me(r, "link", a), t.head.appendChild(r), e.instance = r);
        case "void":
          return null;
        default:
          throw Error(u(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, Ku(a, l.precedence, t));
    return e.instance;
  }
  function Ku(t, e, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), r = a.length ? a[a.length - 1] : null, c = r, m = 0; m < a.length; m++) {
      var x = a[m];
      if (x.dataset.precedence === e) c = x;
      else if (c !== r) break;
    }
    c ? c.parentNode.insertBefore(t, c.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function ef(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function nf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Ju = null;
  function km(t, e, l) {
    if (Ju === null) {
      var a = /* @__PURE__ */ new Map(), r = Ju = /* @__PURE__ */ new Map();
      r.set(l, a);
    } else
      r = Ju, a = r.get(l), a || (a = /* @__PURE__ */ new Map(), r.set(l, a));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), r = 0; r < l.length; r++) {
      var c = l[r];
      if (!(c[kl] || c[ce] || t === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = c.getAttribute(e) || "";
        m = t + m;
        var x = a.get(m);
        x ? x.push(c) : a.set(m, [c]);
      }
    }
    return a;
  }
  function Bm(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function D1(t, e, l) {
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
  function Um(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function O1(t, e, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var r = Ka(a.href), c = e.querySelector(
          no(r)
        );
        if (c) {
          e = c._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Fu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = c, ne(c);
          return;
        }
        c = e.ownerDocument || e, a = Rm(a), (r = an.get(r)) && ef(a, r), c = c.createElement("link"), ne(c);
        var m = c;
        m._p = new Promise(function(x, D) {
          m.onload = x, m.onerror = D;
        }), me(c, "link", a), l.instance = c;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = Fu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var lf = 0;
  function R1(t, e) {
    return t.stylesheets && t.count === 0 && Iu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (t.stylesheets && Iu(t, t.stylesheets), t.unsuspend) {
          var c = t.unsuspend;
          t.unsuspend = null, c();
        }
      }, 6e4 + e);
      0 < t.imgBytes && lf === 0 && (lf = 62500 * h1());
      var r = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Iu(t, t.stylesheets), t.unsuspend)) {
            var c = t.unsuspend;
            t.unsuspend = null, c();
          }
        },
        (t.imgBytes > lf ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(r);
      };
    } : null;
  }
  function Fu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Iu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Wu = null;
  function Iu(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Wu = /* @__PURE__ */ new Map(), e.forEach(H1, t), Wu = null, Fu.call(t));
  }
  function H1(t, e) {
    if (!(e.state.loading & 4)) {
      var l = Wu.get(t);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Wu.set(t, l);
        for (var r = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < r.length; c++) {
          var m = r[c];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (l.set(m.dataset.precedence, m), a = m);
        }
        a && l.set(null, a);
      }
      r = e.instance, m = r.getAttribute("data-precedence"), c = l.get(m) || a, c === a && l.set(null, r), l.set(m, r), this.count++, a = Fu.bind(this), r.addEventListener("load", a), r.addEventListener("error", a), c ? c.parentNode.insertBefore(r, c.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(r, t.firstChild)), e.state.loading |= 4;
    }
  }
  var ao = {
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: L,
    _currentValue2: L,
    _threadCount: 0
  };
  function k1(t, e, l, a, r, c, m, x, D) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = fi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = fi(0), this.hiddenUpdates = fi(null), this.identifierPrefix = a, this.onUncaughtError = r, this.onCaughtError = c, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = D, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function qm(t, e, l, a, r, c, m, x, D, G, et, it) {
    return t = new k1(
      t,
      e,
      l,
      m,
      D,
      G,
      et,
      it,
      x
    ), e = 1, c === !0 && (e |= 24), c = Ue(3, null, null, e), t.current = c, c.stateNode = t, e = Bc(), e.refCount++, t.pooledCache = e, e.refCount++, c.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, Yc(c), t;
  }
  function jm(t) {
    return t ? (t = Ma, t) : Ma;
  }
  function Ym(t, e, l, a, r, c) {
    r = jm(r), a.context === null ? a.context = r : a.pendingContext = r, a = sl(e), a.payload = { element: l }, c = c === void 0 ? null : c, c !== null && (a.callback = c), l = fl(t, a, e), l !== null && (Oe(l, t, e), Bi(l, t, e));
  }
  function Lm(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function af(t, e) {
    Lm(t, e), (t = t.alternate) && Lm(t, e);
  }
  function Vm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = jl(t, 67108864);
      e !== null && Oe(e, t, 67108864), af(t, 67108864);
    }
  }
  function Xm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ve();
      e = di(e);
      var l = jl(t, e);
      l !== null && Oe(l, t, e), af(t, e);
    }
  }
  var Pu = !0;
  function B1(t, e, l, a) {
    var r = E.T;
    E.T = null;
    var c = O.p;
    try {
      O.p = 2, of(t, e, l, a);
    } finally {
      O.p = c, E.T = r;
    }
  }
  function U1(t, e, l, a) {
    var r = E.T;
    E.T = null;
    var c = O.p;
    try {
      O.p = 8, of(t, e, l, a);
    } finally {
      O.p = c, E.T = r;
    }
  }
  function of(t, e, l, a) {
    if (Pu) {
      var r = uf(a);
      if (r === null)
        Zs(
          t,
          e,
          a,
          tr,
          l
        ), Zm(t, a);
      else if (j1(
        r,
        t,
        e,
        l,
        a
      ))
        a.stopPropagation();
      else if (Zm(t, a), e & 4 && -1 < q1.indexOf(t)) {
        for (; r !== null; ) {
          var c = Pn(r);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var m = Nn(c.pendingLanes);
                  if (m !== 0) {
                    var x = c;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; m; ) {
                      var D = 1 << 31 - _e(m);
                      x.entanglements[1] |= D, m &= ~D;
                    }
                    Sn(c), (Bt & 6) === 0 && (Bu = It() + 500, Ii(0));
                  }
                }
                break;
              case 31:
              case 13:
                x = jl(c, 2), x !== null && Oe(x, c, 2), qu(), af(c, 2);
            }
          if (c = uf(a), c === null && Zs(
            t,
            e,
            a,
            tr,
            l
          ), c === r) break;
          r = c;
        }
        r !== null && a.stopPropagation();
      } else
        Zs(
          t,
          e,
          a,
          null,
          l
        );
    }
  }
  function uf(t) {
    return t = rc(t), rf(t);
  }
  var tr = null;
  function rf(t) {
    if (tr = null, t = In(t), t !== null) {
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
    return tr = t, null;
  }
  function $m(t) {
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
        switch (ke()) {
          case Ke:
            return 2;
          case Je:
            return 8;
          case Fe:
          case Kr:
            return 32;
          case ca:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var cf = !1, Sl = null, wl = null, El = null, io = /* @__PURE__ */ new Map(), oo = /* @__PURE__ */ new Map(), zl = [], q1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Zm(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Sl = null;
        break;
      case "dragenter":
      case "dragleave":
        wl = null;
        break;
      case "mouseover":
      case "mouseout":
        El = null;
        break;
      case "pointerover":
      case "pointerout":
        io.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        oo.delete(e.pointerId);
    }
  }
  function uo(t, e, l, a, r, c) {
    return t === null || t.nativeEvent !== c ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: c,
      targetContainers: [r]
    }, e !== null && (e = Pn(e), e !== null && Vm(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, r !== null && e.indexOf(r) === -1 && e.push(r), t);
  }
  function j1(t, e, l, a, r) {
    switch (e) {
      case "focusin":
        return Sl = uo(
          Sl,
          t,
          e,
          l,
          a,
          r
        ), !0;
      case "dragenter":
        return wl = uo(
          wl,
          t,
          e,
          l,
          a,
          r
        ), !0;
      case "mouseover":
        return El = uo(
          El,
          t,
          e,
          l,
          a,
          r
        ), !0;
      case "pointerover":
        var c = r.pointerId;
        return io.set(
          c,
          uo(
            io.get(c) || null,
            t,
            e,
            l,
            a,
            r
          )
        ), !0;
      case "gotpointercapture":
        return c = r.pointerId, oo.set(
          c,
          uo(
            oo.get(c) || null,
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
  function Gm(t) {
    var e = In(t.target);
    if (e !== null) {
      var l = f(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = d(l), e !== null) {
            t.blockedOn = e, Xo(t.priority, function() {
              Xm(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = g(l), e !== null) {
            t.blockedOn = e, Xo(t.priority, function() {
              Xm(l);
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
  function er(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = uf(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        uc = a, l.target.dispatchEvent(a), uc = null;
      } else
        return e = Pn(l), e !== null && Vm(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function Qm(t, e, l) {
    er(t) && l.delete(e);
  }
  function Y1() {
    cf = !1, Sl !== null && er(Sl) && (Sl = null), wl !== null && er(wl) && (wl = null), El !== null && er(El) && (El = null), io.forEach(Qm), oo.forEach(Qm);
  }
  function nr(t, e) {
    t.blockedOn === e && (t.blockedOn = null, cf || (cf = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      Y1
    )));
  }
  var lr = null;
  function Km(t) {
    lr !== t && (lr = t, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        lr === t && (lr = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], a = t[e + 1], r = t[e + 2];
          if (typeof a != "function") {
            if (rf(a || l) === null)
              continue;
            break;
          }
          var c = Pn(l);
          c !== null && (t.splice(e, 3), e -= 3, os(
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
  function Fa(t) {
    function e(D) {
      return nr(D, t);
    }
    Sl !== null && nr(Sl, t), wl !== null && nr(wl, t), El !== null && nr(El, t), io.forEach(e), oo.forEach(e);
    for (var l = 0; l < zl.length; l++) {
      var a = zl[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < zl.length && (l = zl[0], l.blockedOn === null); )
      Gm(l), l.blockedOn === null && zl.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var r = l[a], c = l[a + 1], m = r[ye] || null;
        if (typeof c == "function")
          m || Km(l);
        else if (m) {
          var x = null;
          if (c && c.hasAttribute("formAction")) {
            if (r = c, m = c[ye] || null)
              x = m.formAction;
            else if (rf(r) !== null) continue;
          } else x = m.action;
          typeof x == "function" ? l[a + 1] = x : (l.splice(a, 3), a -= 3), Km(l);
        }
      }
  }
  function Jm() {
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
  function sf(t) {
    this._internalRoot = t;
  }
  ar.prototype.render = sf.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(u(409));
    var l = e.current, a = Ve();
    Ym(l, a, t, e, null, null);
  }, ar.prototype.unmount = sf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Ym(t.current, 2, null, t, null, null), qu(), e[An] = null;
    }
  };
  function ar(t) {
    this._internalRoot = t;
  }
  ar.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Vo();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < zl.length && e !== 0 && e < zl[l].priority; l++) ;
      zl.splice(l, 0, t), l === 0 && Gm(t);
    }
  };
  var Fm = i.version;
  if (Fm !== "19.2.7")
    throw Error(
      u(
        527,
        Fm,
        "19.2.7"
      )
    );
  O.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(u(188)) : (t = Object.keys(t).join(","), Error(u(268, t)));
    return t = h(e), t = t !== null ? b(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var L1 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: E,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ir = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ir.isDisabled && ir.supportsFiber)
      try {
        Ol = ir.inject(
          L1
        ), xe = ir;
      } catch {
      }
  }
  return ro.createRoot = function(t, e) {
    if (!s(t)) throw Error(u(299));
    var l = !1, a = "", r = lg, c = ag, m = ig;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (r = e.onUncaughtError), e.onCaughtError !== void 0 && (c = e.onCaughtError), e.onRecoverableError !== void 0 && (m = e.onRecoverableError)), e = qm(
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
      Jm
    ), t[An] = e.current, $s(t), new sf(e);
  }, ro.hydrateRoot = function(t, e, l) {
    if (!s(t)) throw Error(u(299));
    var a = !1, r = "", c = lg, m = ag, x = ig, D = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (r = l.identifierPrefix), l.onUncaughtError !== void 0 && (c = l.onUncaughtError), l.onCaughtError !== void 0 && (m = l.onCaughtError), l.onRecoverableError !== void 0 && (x = l.onRecoverableError), l.formState !== void 0 && (D = l.formState)), e = qm(
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
      Jm
    ), e.context = jm(null), l = e.current, a = Ve(), a = di(a), r = sl(a), r.callback = null, fl(l, r, a), l = a, e.current.lanes = l, Hl(e, l), Sn(e), t[An] = e.current, $s(t), new ar(e);
  }, ro.version = "19.2.7", ro;
}
var a0;
function I1() {
  if (a0) return df.exports;
  a0 = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), df.exports = W1(), df.exports;
}
var P1 = I1(), pf = { exports: {} }, co = {};
var i0;
function tx() {
  if (i0) return co;
  i0 = 1;
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
  return co.Fragment = i, co.jsx = o, co.jsxs = o, co;
}
var o0;
function ex() {
  return o0 || (o0 = 1, pf.exports = tx()), pf.exports;
}
var U = ex();
function re(n) {
  if (typeof n == "string" || typeof n == "number") return "" + n;
  let i = "";
  if (Array.isArray(n))
    for (let o = 0, u; o < n.length; o++)
      (u = re(n[o])) !== "" && (i += (i && " ") + u);
  else
    for (let o in n)
      n[o] && (i += (i && " ") + o);
  return i;
}
var nx = { value: () => {
} };
function Rr() {
  for (var n = 0, i = arguments.length, o = {}, u; n < i; ++n) {
    if (!(u = arguments[n] + "") || u in o || /[\s.]/.test(u)) throw new Error("illegal type: " + u);
    o[u] = [];
  }
  return new pr(o);
}
function pr(n) {
  this._ = n;
}
function lx(n, i) {
  return n.trim().split(/^|\s+/).map(function(o) {
    var u = "", s = o.indexOf(".");
    if (s >= 0 && (u = o.slice(s + 1), o = o.slice(0, s)), o && !i.hasOwnProperty(o)) throw new Error("unknown type: " + o);
    return { type: o, name: u };
  });
}
pr.prototype = Rr.prototype = {
  constructor: pr,
  on: function(n, i) {
    var o = this._, u = lx(n + "", o), s, f = -1, d = u.length;
    if (arguments.length < 2) {
      for (; ++f < d; ) if ((s = (n = u[f]).type) && (s = ax(o[s], n.name))) return s;
      return;
    }
    if (i != null && typeof i != "function") throw new Error("invalid callback: " + i);
    for (; ++f < d; )
      if (s = (n = u[f]).type) o[s] = u0(o[s], n.name, i);
      else if (i == null) for (s in o) o[s] = u0(o[s], n.name, null);
    return this;
  },
  copy: function() {
    var n = {}, i = this._;
    for (var o in i) n[o] = i[o].slice();
    return new pr(n);
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
function ax(n, i) {
  for (var o = 0, u = n.length, s; o < u; ++o)
    if ((s = n[o]).name === i)
      return s.value;
}
function u0(n, i, o) {
  for (var u = 0, s = n.length; u < s; ++u)
    if (n[u].name === i) {
      n[u] = nx, n = n.slice(0, u).concat(n.slice(u + 1));
      break;
    }
  return o != null && n.push({ name: i, value: o }), n;
}
var Df = "http://www.w3.org/1999/xhtml";
const r0 = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Df,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Hr(n) {
  var i = n += "", o = i.indexOf(":");
  return o >= 0 && (i = n.slice(0, o)) !== "xmlns" && (n = n.slice(o + 1)), r0.hasOwnProperty(i) ? { space: r0[i], local: n } : n;
}
function ix(n) {
  return function() {
    var i = this.ownerDocument, o = this.namespaceURI;
    return o === Df && i.documentElement.namespaceURI === Df ? i.createElement(n) : i.createElementNS(o, n);
  };
}
function ox(n) {
  return function() {
    return this.ownerDocument.createElementNS(n.space, n.local);
  };
}
function Np(n) {
  var i = Hr(n);
  return (i.local ? ox : ix)(i);
}
function ux() {
}
function Kf(n) {
  return n == null ? ux : function() {
    return this.querySelector(n);
  };
}
function rx(n) {
  typeof n != "function" && (n = Kf(n));
  for (var i = this._groups, o = i.length, u = new Array(o), s = 0; s < o; ++s)
    for (var f = i[s], d = f.length, g = u[s] = new Array(d), p, h, b = 0; b < d; ++b)
      (p = f[b]) && (h = n.call(p, p.__data__, b, f)) && ("__data__" in p && (h.__data__ = p.__data__), g[b] = h);
  return new Ze(u, this._parents);
}
function cx(n) {
  return n == null ? [] : Array.isArray(n) ? n : Array.from(n);
}
function sx() {
  return [];
}
function Ap(n) {
  return n == null ? sx : function() {
    return this.querySelectorAll(n);
  };
}
function fx(n) {
  return function() {
    return cx(n.apply(this, arguments));
  };
}
function dx(n) {
  typeof n == "function" ? n = fx(n) : n = Ap(n);
  for (var i = this._groups, o = i.length, u = [], s = [], f = 0; f < o; ++f)
    for (var d = i[f], g = d.length, p, h = 0; h < g; ++h)
      (p = d[h]) && (u.push(n.call(p, p.__data__, h, d)), s.push(p));
  return new Ze(u, s);
}
function Cp(n) {
  return function() {
    return this.matches(n);
  };
}
function Tp(n) {
  return function(i) {
    return i.matches(n);
  };
}
var hx = Array.prototype.find;
function gx(n) {
  return function() {
    return hx.call(this.children, n);
  };
}
function mx() {
  return this.firstElementChild;
}
function px(n) {
  return this.select(n == null ? mx : gx(typeof n == "function" ? n : Tp(n)));
}
var yx = Array.prototype.filter;
function vx() {
  return Array.from(this.children);
}
function bx(n) {
  return function() {
    return yx.call(this.children, n);
  };
}
function xx(n) {
  return this.selectAll(n == null ? vx : bx(typeof n == "function" ? n : Tp(n)));
}
function _x(n) {
  typeof n != "function" && (n = Cp(n));
  for (var i = this._groups, o = i.length, u = new Array(o), s = 0; s < o; ++s)
    for (var f = i[s], d = f.length, g = u[s] = [], p, h = 0; h < d; ++h)
      (p = f[h]) && n.call(p, p.__data__, h, f) && g.push(p);
  return new Ze(u, this._parents);
}
function Dp(n) {
  return new Array(n.length);
}
function Sx() {
  return new Ze(this._enter || this._groups.map(Dp), this._parents);
}
function _r(n, i) {
  this.ownerDocument = n.ownerDocument, this.namespaceURI = n.namespaceURI, this._next = null, this._parent = n, this.__data__ = i;
}
_r.prototype = {
  constructor: _r,
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
function wx(n) {
  return function() {
    return n;
  };
}
function Ex(n, i, o, u, s, f) {
  for (var d = 0, g, p = i.length, h = f.length; d < h; ++d)
    (g = i[d]) ? (g.__data__ = f[d], u[d] = g) : o[d] = new _r(n, f[d]);
  for (; d < p; ++d)
    (g = i[d]) && (s[d] = g);
}
function zx(n, i, o, u, s, f, d) {
  var g, p, h = /* @__PURE__ */ new Map(), b = i.length, y = f.length, v = new Array(b), S;
  for (g = 0; g < b; ++g)
    (p = i[g]) && (v[g] = S = d.call(p, p.__data__, g, i) + "", h.has(S) ? s[g] = p : h.set(S, p));
  for (g = 0; g < y; ++g)
    S = d.call(n, f[g], g, f) + "", (p = h.get(S)) ? (u[g] = p, p.__data__ = f[g], h.delete(S)) : o[g] = new _r(n, f[g]);
  for (g = 0; g < b; ++g)
    (p = i[g]) && h.get(v[g]) === p && (s[g] = p);
}
function Mx(n) {
  return n.__data__;
}
function Nx(n, i) {
  if (!arguments.length) return Array.from(this, Mx);
  var o = i ? zx : Ex, u = this._parents, s = this._groups;
  typeof n != "function" && (n = wx(n));
  for (var f = s.length, d = new Array(f), g = new Array(f), p = new Array(f), h = 0; h < f; ++h) {
    var b = u[h], y = s[h], v = y.length, S = Ax(n.call(b, b && b.__data__, h, u)), w = S.length, A = g[h] = new Array(w), N = d[h] = new Array(w), M = p[h] = new Array(v);
    o(b, y, A, N, M, S, i);
    for (var R = 0, _ = 0, C, Y; R < w; ++R)
      if (C = A[R]) {
        for (R >= _ && (_ = R + 1); !(Y = N[_]) && ++_ < w; ) ;
        C._next = Y || null;
      }
  }
  return d = new Ze(d, u), d._enter = g, d._exit = p, d;
}
function Ax(n) {
  return typeof n == "object" && "length" in n ? n : Array.from(n);
}
function Cx() {
  return new Ze(this._exit || this._groups.map(Dp), this._parents);
}
function Tx(n, i, o) {
  var u = this.enter(), s = this, f = this.exit();
  return typeof n == "function" ? (u = n(u), u && (u = u.selection())) : u = u.append(n + ""), i != null && (s = i(s), s && (s = s.selection())), o == null ? f.remove() : o(f), u && s ? u.merge(s).order() : s;
}
function Dx(n) {
  for (var i = n.selection ? n.selection() : n, o = this._groups, u = i._groups, s = o.length, f = u.length, d = Math.min(s, f), g = new Array(s), p = 0; p < d; ++p)
    for (var h = o[p], b = u[p], y = h.length, v = g[p] = new Array(y), S, w = 0; w < y; ++w)
      (S = h[w] || b[w]) && (v[w] = S);
  for (; p < s; ++p)
    g[p] = o[p];
  return new Ze(g, this._parents);
}
function Ox() {
  for (var n = this._groups, i = -1, o = n.length; ++i < o; )
    for (var u = n[i], s = u.length - 1, f = u[s], d; --s >= 0; )
      (d = u[s]) && (f && d.compareDocumentPosition(f) ^ 4 && f.parentNode.insertBefore(d, f), f = d);
  return this;
}
function Rx(n) {
  n || (n = Hx);
  function i(y, v) {
    return y && v ? n(y.__data__, v.__data__) : !y - !v;
  }
  for (var o = this._groups, u = o.length, s = new Array(u), f = 0; f < u; ++f) {
    for (var d = o[f], g = d.length, p = s[f] = new Array(g), h, b = 0; b < g; ++b)
      (h = d[b]) && (p[b] = h);
    p.sort(i);
  }
  return new Ze(s, this._parents).order();
}
function Hx(n, i) {
  return n < i ? -1 : n > i ? 1 : n >= i ? 0 : NaN;
}
function kx() {
  var n = arguments[0];
  return arguments[0] = this, n.apply(null, arguments), this;
}
function Bx() {
  return Array.from(this);
}
function Ux() {
  for (var n = this._groups, i = 0, o = n.length; i < o; ++i)
    for (var u = n[i], s = 0, f = u.length; s < f; ++s) {
      var d = u[s];
      if (d) return d;
    }
  return null;
}
function qx() {
  let n = 0;
  for (const i of this) ++n;
  return n;
}
function jx() {
  return !this.node();
}
function Yx(n) {
  for (var i = this._groups, o = 0, u = i.length; o < u; ++o)
    for (var s = i[o], f = 0, d = s.length, g; f < d; ++f)
      (g = s[f]) && n.call(g, g.__data__, f, s);
  return this;
}
function Lx(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function Vx(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function Xx(n, i) {
  return function() {
    this.setAttribute(n, i);
  };
}
function $x(n, i) {
  return function() {
    this.setAttributeNS(n.space, n.local, i);
  };
}
function Zx(n, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? this.removeAttribute(n) : this.setAttribute(n, o);
  };
}
function Gx(n, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, o);
  };
}
function Qx(n, i) {
  var o = Hr(n);
  if (arguments.length < 2) {
    var u = this.node();
    return o.local ? u.getAttributeNS(o.space, o.local) : u.getAttribute(o);
  }
  return this.each((i == null ? o.local ? Vx : Lx : typeof i == "function" ? o.local ? Gx : Zx : o.local ? $x : Xx)(o, i));
}
function Op(n) {
  return n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView;
}
function Kx(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function Jx(n, i, o) {
  return function() {
    this.style.setProperty(n, i, o);
  };
}
function Fx(n, i, o) {
  return function() {
    var u = i.apply(this, arguments);
    u == null ? this.style.removeProperty(n) : this.style.setProperty(n, u, o);
  };
}
function Wx(n, i, o) {
  return arguments.length > 1 ? this.each((i == null ? Kx : typeof i == "function" ? Fx : Jx)(n, i, o ?? "")) : li(this.node(), n);
}
function li(n, i) {
  return n.style.getPropertyValue(i) || Op(n).getComputedStyle(n, null).getPropertyValue(i);
}
function Ix(n) {
  return function() {
    delete this[n];
  };
}
function Px(n, i) {
  return function() {
    this[n] = i;
  };
}
function t_(n, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? delete this[n] : this[n] = o;
  };
}
function e_(n, i) {
  return arguments.length > 1 ? this.each((i == null ? Ix : typeof i == "function" ? t_ : Px)(n, i)) : this.node()[n];
}
function Rp(n) {
  return n.trim().split(/^|\s+/);
}
function Jf(n) {
  return n.classList || new Hp(n);
}
function Hp(n) {
  this._node = n, this._names = Rp(n.getAttribute("class") || "");
}
Hp.prototype = {
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
function kp(n, i) {
  for (var o = Jf(n), u = -1, s = i.length; ++u < s; ) o.add(i[u]);
}
function Bp(n, i) {
  for (var o = Jf(n), u = -1, s = i.length; ++u < s; ) o.remove(i[u]);
}
function n_(n) {
  return function() {
    kp(this, n);
  };
}
function l_(n) {
  return function() {
    Bp(this, n);
  };
}
function a_(n, i) {
  return function() {
    (i.apply(this, arguments) ? kp : Bp)(this, n);
  };
}
function i_(n, i) {
  var o = Rp(n + "");
  if (arguments.length < 2) {
    for (var u = Jf(this.node()), s = -1, f = o.length; ++s < f; ) if (!u.contains(o[s])) return !1;
    return !0;
  }
  return this.each((typeof i == "function" ? a_ : i ? n_ : l_)(o, i));
}
function o_() {
  this.textContent = "";
}
function u_(n) {
  return function() {
    this.textContent = n;
  };
}
function r_(n) {
  return function() {
    var i = n.apply(this, arguments);
    this.textContent = i ?? "";
  };
}
function c_(n) {
  return arguments.length ? this.each(n == null ? o_ : (typeof n == "function" ? r_ : u_)(n)) : this.node().textContent;
}
function s_() {
  this.innerHTML = "";
}
function f_(n) {
  return function() {
    this.innerHTML = n;
  };
}
function d_(n) {
  return function() {
    var i = n.apply(this, arguments);
    this.innerHTML = i ?? "";
  };
}
function h_(n) {
  return arguments.length ? this.each(n == null ? s_ : (typeof n == "function" ? d_ : f_)(n)) : this.node().innerHTML;
}
function g_() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function m_() {
  return this.each(g_);
}
function p_() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function y_() {
  return this.each(p_);
}
function v_(n) {
  var i = typeof n == "function" ? n : Np(n);
  return this.select(function() {
    return this.appendChild(i.apply(this, arguments));
  });
}
function b_() {
  return null;
}
function x_(n, i) {
  var o = typeof n == "function" ? n : Np(n), u = i == null ? b_ : typeof i == "function" ? i : Kf(i);
  return this.select(function() {
    return this.insertBefore(o.apply(this, arguments), u.apply(this, arguments) || null);
  });
}
function __() {
  var n = this.parentNode;
  n && n.removeChild(this);
}
function S_() {
  return this.each(__);
}
function w_() {
  var n = this.cloneNode(!1), i = this.parentNode;
  return i ? i.insertBefore(n, this.nextSibling) : n;
}
function E_() {
  var n = this.cloneNode(!0), i = this.parentNode;
  return i ? i.insertBefore(n, this.nextSibling) : n;
}
function z_(n) {
  return this.select(n ? E_ : w_);
}
function M_(n) {
  return arguments.length ? this.property("__data__", n) : this.node().__data__;
}
function N_(n) {
  return function(i) {
    n.call(this, i, this.__data__);
  };
}
function A_(n) {
  return n.trim().split(/^|\s+/).map(function(i) {
    var o = "", u = i.indexOf(".");
    return u >= 0 && (o = i.slice(u + 1), i = i.slice(0, u)), { type: i, name: o };
  });
}
function C_(n) {
  return function() {
    var i = this.__on;
    if (i) {
      for (var o = 0, u = -1, s = i.length, f; o < s; ++o)
        f = i[o], (!n.type || f.type === n.type) && f.name === n.name ? this.removeEventListener(f.type, f.listener, f.options) : i[++u] = f;
      ++u ? i.length = u : delete this.__on;
    }
  };
}
function T_(n, i, o) {
  return function() {
    var u = this.__on, s, f = N_(i);
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
function D_(n, i, o) {
  var u = A_(n + ""), s, f = u.length, d;
  if (arguments.length < 2) {
    var g = this.node().__on;
    if (g) {
      for (var p = 0, h = g.length, b; p < h; ++p)
        for (s = 0, b = g[p]; s < f; ++s)
          if ((d = u[s]).type === b.type && d.name === b.name)
            return b.value;
    }
    return;
  }
  for (g = i ? T_ : C_, s = 0; s < f; ++s) this.each(g(u[s], i, o));
  return this;
}
function Up(n, i, o) {
  var u = Op(n), s = u.CustomEvent;
  typeof s == "function" ? s = new s(i, o) : (s = u.document.createEvent("Event"), o ? (s.initEvent(i, o.bubbles, o.cancelable), s.detail = o.detail) : s.initEvent(i, !1, !1)), n.dispatchEvent(s);
}
function O_(n, i) {
  return function() {
    return Up(this, n, i);
  };
}
function R_(n, i) {
  return function() {
    return Up(this, n, i.apply(this, arguments));
  };
}
function H_(n, i) {
  return this.each((typeof i == "function" ? R_ : O_)(n, i));
}
function* k_() {
  for (var n = this._groups, i = 0, o = n.length; i < o; ++i)
    for (var u = n[i], s = 0, f = u.length, d; s < f; ++s)
      (d = u[s]) && (yield d);
}
var qp = [null];
function Ze(n, i) {
  this._groups = n, this._parents = i;
}
function Do() {
  return new Ze([[document.documentElement]], qp);
}
function B_() {
  return this;
}
Ze.prototype = Do.prototype = {
  constructor: Ze,
  select: rx,
  selectAll: dx,
  selectChild: px,
  selectChildren: xx,
  filter: _x,
  data: Nx,
  enter: Sx,
  exit: Cx,
  join: Tx,
  merge: Dx,
  selection: B_,
  order: Ox,
  sort: Rx,
  call: kx,
  nodes: Bx,
  node: Ux,
  size: qx,
  empty: jx,
  each: Yx,
  attr: Qx,
  style: Wx,
  property: e_,
  classed: i_,
  text: c_,
  html: h_,
  raise: m_,
  lower: y_,
  append: v_,
  insert: x_,
  remove: S_,
  clone: z_,
  datum: M_,
  on: D_,
  dispatch: H_,
  [Symbol.iterator]: k_
};
function Xe(n) {
  return typeof n == "string" ? new Ze([[document.querySelector(n)]], [document.documentElement]) : new Ze([[n]], qp);
}
function U_(n) {
  let i;
  for (; i = n.sourceEvent; ) n = i;
  return n;
}
function fn(n, i) {
  if (n = U_(n), i === void 0 && (i = n.currentTarget), i) {
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
const q_ = { passive: !1 }, xo = { capture: !0, passive: !1 };
function yf(n) {
  n.stopImmediatePropagation();
}
function ei(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function jp(n) {
  var i = n.document.documentElement, o = Xe(n).on("dragstart.drag", ei, xo);
  "onselectstart" in i ? o.on("selectstart.drag", ei, xo) : (i.__noselect = i.style.MozUserSelect, i.style.MozUserSelect = "none");
}
function Yp(n, i) {
  var o = n.document.documentElement, u = Xe(n).on("dragstart.drag", null);
  i && (u.on("click.drag", ei, xo), setTimeout(function() {
    u.on("click.drag", null);
  }, 0)), "onselectstart" in o ? u.on("selectstart.drag", null) : (o.style.MozUserSelect = o.__noselect, delete o.__noselect);
}
const or = (n) => () => n;
function Of(n, {
  sourceEvent: i,
  subject: o,
  target: u,
  identifier: s,
  active: f,
  x: d,
  y: g,
  dx: p,
  dy: h,
  dispatch: b
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
    _: { value: b }
  });
}
Of.prototype.on = function() {
  var n = this._.on.apply(this._, arguments);
  return n === this._ ? this : n;
};
function j_(n) {
  return !n.ctrlKey && !n.button;
}
function Y_() {
  return this.parentNode;
}
function L_(n, i) {
  return i ?? { x: n.x, y: n.y };
}
function V_() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Lp() {
  var n = j_, i = Y_, o = L_, u = V_, s = {}, f = Rr("start", "drag", "end"), d = 0, g, p, h, b, y = 0;
  function v(C) {
    C.on("mousedown.drag", S).filter(u).on("touchstart.drag", N).on("touchmove.drag", M, q_).on("touchend.drag touchcancel.drag", R).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function S(C, Y) {
    if (!(b || !n.call(this, C, Y))) {
      var q = _(this, i.call(this, C, Y), C, Y, "mouse");
      q && (Xe(C.view).on("mousemove.drag", w, xo).on("mouseup.drag", A, xo), jp(C.view), yf(C), h = !1, g = C.clientX, p = C.clientY, q("start", C));
    }
  }
  function w(C) {
    if (ei(C), !h) {
      var Y = C.clientX - g, q = C.clientY - p;
      h = Y * Y + q * q > y;
    }
    s.mouse("drag", C);
  }
  function A(C) {
    Xe(C.view).on("mousemove.drag mouseup.drag", null), Yp(C.view, h), ei(C), s.mouse("end", C);
  }
  function N(C, Y) {
    if (n.call(this, C, Y)) {
      var q = C.changedTouches, B = i.call(this, C, Y), Q = q.length, J, ut;
      for (J = 0; J < Q; ++J)
        (ut = _(this, B, C, Y, q[J].identifier, q[J])) && (yf(C), ut("start", C, q[J]));
    }
  }
  function M(C) {
    var Y = C.changedTouches, q = Y.length, B, Q;
    for (B = 0; B < q; ++B)
      (Q = s[Y[B].identifier]) && (ei(C), Q("drag", C, Y[B]));
  }
  function R(C) {
    var Y = C.changedTouches, q = Y.length, B, Q;
    for (b && clearTimeout(b), b = setTimeout(function() {
      b = null;
    }, 500), B = 0; B < q; ++B)
      (Q = s[Y[B].identifier]) && (yf(C), Q("end", C, Y[B]));
  }
  function _(C, Y, q, B, Q, J) {
    var ut = f.copy(), Z = fn(J || q, Y), I, ot, T;
    if ((T = o.call(C, new Of("beforestart", {
      sourceEvent: q,
      target: v,
      identifier: Q,
      active: d,
      x: Z[0],
      y: Z[1],
      dx: 0,
      dy: 0,
      dispatch: ut
    }), B)) != null)
      return I = T.x - Z[0] || 0, ot = T.y - Z[1] || 0, function V(E, O, L) {
        var X = Z, nt;
        switch (E) {
          case "start":
            s[Q] = V, nt = d++;
            break;
          case "end":
            delete s[Q], --d;
          // falls through
          case "drag":
            Z = fn(L || O, Y), nt = d;
            break;
        }
        ut.call(
          E,
          C,
          new Of(E, {
            sourceEvent: O,
            subject: T,
            target: v,
            identifier: Q,
            active: nt,
            x: Z[0] + I,
            y: Z[1] + ot,
            dx: Z[0] - X[0],
            dy: Z[1] - X[1],
            dispatch: ut
          }),
          B
        );
      };
  }
  return v.filter = function(C) {
    return arguments.length ? (n = typeof C == "function" ? C : or(!!C), v) : n;
  }, v.container = function(C) {
    return arguments.length ? (i = typeof C == "function" ? C : or(C), v) : i;
  }, v.subject = function(C) {
    return arguments.length ? (o = typeof C == "function" ? C : or(C), v) : o;
  }, v.touchable = function(C) {
    return arguments.length ? (u = typeof C == "function" ? C : or(!!C), v) : u;
  }, v.on = function() {
    var C = f.on.apply(f, arguments);
    return C === f ? v : C;
  }, v.clickDistance = function(C) {
    return arguments.length ? (y = (C = +C) * C, v) : Math.sqrt(y);
  }, v;
}
function Ff(n, i, o) {
  n.prototype = i.prototype = o, o.constructor = n;
}
function Vp(n, i) {
  var o = Object.create(n.prototype);
  for (var u in i) o[u] = i[u];
  return o;
}
function Oo() {
}
var _o = 0.7, Sr = 1 / _o, ni = "\\s*([+-]?\\d+)\\s*", So = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", En = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", X_ = /^#([0-9a-f]{3,8})$/, $_ = new RegExp(`^rgb\\(${ni},${ni},${ni}\\)$`), Z_ = new RegExp(`^rgb\\(${En},${En},${En}\\)$`), G_ = new RegExp(`^rgba\\(${ni},${ni},${ni},${So}\\)$`), Q_ = new RegExp(`^rgba\\(${En},${En},${En},${So}\\)$`), K_ = new RegExp(`^hsl\\(${So},${En},${En}\\)$`), J_ = new RegExp(`^hsla\\(${So},${En},${En},${So}\\)$`), c0 = {
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
Ff(Oo, la, {
  copy(n) {
    return Object.assign(new this.constructor(), this, n);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: s0,
  // Deprecated! Use color.formatHex.
  formatHex: s0,
  formatHex8: F_,
  formatHsl: W_,
  formatRgb: f0,
  toString: f0
});
function s0() {
  return this.rgb().formatHex();
}
function F_() {
  return this.rgb().formatHex8();
}
function W_() {
  return Xp(this).formatHsl();
}
function f0() {
  return this.rgb().formatRgb();
}
function la(n) {
  var i, o;
  return n = (n + "").trim().toLowerCase(), (i = X_.exec(n)) ? (o = i[1].length, i = parseInt(i[1], 16), o === 6 ? d0(i) : o === 3 ? new Re(i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, (i & 15) << 4 | i & 15, 1) : o === 8 ? ur(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, (i & 255) / 255) : o === 4 ? ur(i >> 12 & 15 | i >> 8 & 240, i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, ((i & 15) << 4 | i & 15) / 255) : null) : (i = $_.exec(n)) ? new Re(i[1], i[2], i[3], 1) : (i = Z_.exec(n)) ? new Re(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, 1) : (i = G_.exec(n)) ? ur(i[1], i[2], i[3], i[4]) : (i = Q_.exec(n)) ? ur(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, i[4]) : (i = K_.exec(n)) ? m0(i[1], i[2] / 100, i[3] / 100, 1) : (i = J_.exec(n)) ? m0(i[1], i[2] / 100, i[3] / 100, i[4]) : c0.hasOwnProperty(n) ? d0(c0[n]) : n === "transparent" ? new Re(NaN, NaN, NaN, 0) : null;
}
function d0(n) {
  return new Re(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function ur(n, i, o, u) {
  return u <= 0 && (n = i = o = NaN), new Re(n, i, o, u);
}
function I_(n) {
  return n instanceof Oo || (n = la(n)), n ? (n = n.rgb(), new Re(n.r, n.g, n.b, n.opacity)) : new Re();
}
function Rf(n, i, o, u) {
  return arguments.length === 1 ? I_(n) : new Re(n, i, o, u ?? 1);
}
function Re(n, i, o, u) {
  this.r = +n, this.g = +i, this.b = +o, this.opacity = +u;
}
Ff(Re, Rf, Vp(Oo, {
  brighter(n) {
    return n = n == null ? Sr : Math.pow(Sr, n), new Re(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? _o : Math.pow(_o, n), new Re(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Re(ea(this.r), ea(this.g), ea(this.b), wr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: h0,
  // Deprecated! Use color.formatHex.
  formatHex: h0,
  formatHex8: P_,
  formatRgb: g0,
  toString: g0
}));
function h0() {
  return `#${Pl(this.r)}${Pl(this.g)}${Pl(this.b)}`;
}
function P_() {
  return `#${Pl(this.r)}${Pl(this.g)}${Pl(this.b)}${Pl((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function g0() {
  const n = wr(this.opacity);
  return `${n === 1 ? "rgb(" : "rgba("}${ea(this.r)}, ${ea(this.g)}, ${ea(this.b)}${n === 1 ? ")" : `, ${n})`}`;
}
function wr(n) {
  return isNaN(n) ? 1 : Math.max(0, Math.min(1, n));
}
function ea(n) {
  return Math.max(0, Math.min(255, Math.round(n) || 0));
}
function Pl(n) {
  return n = ea(n), (n < 16 ? "0" : "") + n.toString(16);
}
function m0(n, i, o, u) {
  return u <= 0 ? n = i = o = NaN : o <= 0 || o >= 1 ? n = i = NaN : i <= 0 && (n = NaN), new dn(n, i, o, u);
}
function Xp(n) {
  if (n instanceof dn) return new dn(n.h, n.s, n.l, n.opacity);
  if (n instanceof Oo || (n = la(n)), !n) return new dn();
  if (n instanceof dn) return n;
  n = n.rgb();
  var i = n.r / 255, o = n.g / 255, u = n.b / 255, s = Math.min(i, o, u), f = Math.max(i, o, u), d = NaN, g = f - s, p = (f + s) / 2;
  return g ? (i === f ? d = (o - u) / g + (o < u) * 6 : o === f ? d = (u - i) / g + 2 : d = (i - o) / g + 4, g /= p < 0.5 ? f + s : 2 - f - s, d *= 60) : g = p > 0 && p < 1 ? 0 : d, new dn(d, g, p, n.opacity);
}
function tS(n, i, o, u) {
  return arguments.length === 1 ? Xp(n) : new dn(n, i, o, u ?? 1);
}
function dn(n, i, o, u) {
  this.h = +n, this.s = +i, this.l = +o, this.opacity = +u;
}
Ff(dn, tS, Vp(Oo, {
  brighter(n) {
    return n = n == null ? Sr : Math.pow(Sr, n), new dn(this.h, this.s, this.l * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? _o : Math.pow(_o, n), new dn(this.h, this.s, this.l * n, this.opacity);
  },
  rgb() {
    var n = this.h % 360 + (this.h < 0) * 360, i = isNaN(n) || isNaN(this.s) ? 0 : this.s, o = this.l, u = o + (o < 0.5 ? o : 1 - o) * i, s = 2 * o - u;
    return new Re(
      vf(n >= 240 ? n - 240 : n + 120, s, u),
      vf(n, s, u),
      vf(n < 120 ? n + 240 : n - 120, s, u),
      this.opacity
    );
  },
  clamp() {
    return new dn(p0(this.h), rr(this.s), rr(this.l), wr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const n = wr(this.opacity);
    return `${n === 1 ? "hsl(" : "hsla("}${p0(this.h)}, ${rr(this.s) * 100}%, ${rr(this.l) * 100}%${n === 1 ? ")" : `, ${n})`}`;
  }
}));
function p0(n) {
  return n = (n || 0) % 360, n < 0 ? n + 360 : n;
}
function rr(n) {
  return Math.max(0, Math.min(1, n || 0));
}
function vf(n, i, o) {
  return (n < 60 ? i + (o - i) * n / 60 : n < 180 ? o : n < 240 ? i + (o - i) * (240 - n) / 60 : i) * 255;
}
const Wf = (n) => () => n;
function eS(n, i) {
  return function(o) {
    return n + o * i;
  };
}
function nS(n, i, o) {
  return n = Math.pow(n, o), i = Math.pow(i, o) - n, o = 1 / o, function(u) {
    return Math.pow(n + u * i, o);
  };
}
function lS(n) {
  return (n = +n) == 1 ? $p : function(i, o) {
    return o - i ? nS(i, o, n) : Wf(isNaN(i) ? o : i);
  };
}
function $p(n, i) {
  var o = i - n;
  return o ? eS(n, o) : Wf(isNaN(n) ? i : n);
}
const Er = (function n(i) {
  var o = lS(i);
  function u(s, f) {
    var d = o((s = Rf(s)).r, (f = Rf(f)).r), g = o(s.g, f.g), p = o(s.b, f.b), h = $p(s.opacity, f.opacity);
    return function(b) {
      return s.r = d(b), s.g = g(b), s.b = p(b), s.opacity = h(b), s + "";
    };
  }
  return u.gamma = n, u;
})(1);
function aS(n, i) {
  i || (i = []);
  var o = n ? Math.min(i.length, n.length) : 0, u = i.slice(), s;
  return function(f) {
    for (s = 0; s < o; ++s) u[s] = n[s] * (1 - f) + i[s] * f;
    return u;
  };
}
function iS(n) {
  return ArrayBuffer.isView(n) && !(n instanceof DataView);
}
function oS(n, i) {
  var o = i ? i.length : 0, u = n ? Math.min(o, n.length) : 0, s = new Array(u), f = new Array(o), d;
  for (d = 0; d < u; ++d) s[d] = po(n[d], i[d]);
  for (; d < o; ++d) f[d] = i[d];
  return function(g) {
    for (d = 0; d < u; ++d) f[d] = s[d](g);
    return f;
  };
}
function uS(n, i) {
  var o = /* @__PURE__ */ new Date();
  return n = +n, i = +i, function(u) {
    return o.setTime(n * (1 - u) + i * u), o;
  };
}
function wn(n, i) {
  return n = +n, i = +i, function(o) {
    return n * (1 - o) + i * o;
  };
}
function rS(n, i) {
  var o = {}, u = {}, s;
  (n === null || typeof n != "object") && (n = {}), (i === null || typeof i != "object") && (i = {});
  for (s in i)
    s in n ? o[s] = po(n[s], i[s]) : u[s] = i[s];
  return function(f) {
    for (s in o) u[s] = o[s](f);
    return u;
  };
}
var Hf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, bf = new RegExp(Hf.source, "g");
function cS(n) {
  return function() {
    return n;
  };
}
function sS(n) {
  return function(i) {
    return n(i) + "";
  };
}
function Zp(n, i) {
  var o = Hf.lastIndex = bf.lastIndex = 0, u, s, f, d = -1, g = [], p = [];
  for (n = n + "", i = i + ""; (u = Hf.exec(n)) && (s = bf.exec(i)); )
    (f = s.index) > o && (f = i.slice(o, f), g[d] ? g[d] += f : g[++d] = f), (u = u[0]) === (s = s[0]) ? g[d] ? g[d] += s : g[++d] = s : (g[++d] = null, p.push({ i: d, x: wn(u, s) })), o = bf.lastIndex;
  return o < i.length && (f = i.slice(o), g[d] ? g[d] += f : g[++d] = f), g.length < 2 ? p[0] ? sS(p[0].x) : cS(i) : (i = p.length, function(h) {
    for (var b = 0, y; b < i; ++b) g[(y = p[b]).i] = y.x(h);
    return g.join("");
  });
}
function po(n, i) {
  var o = typeof i, u;
  return i == null || o === "boolean" ? Wf(i) : (o === "number" ? wn : o === "string" ? (u = la(i)) ? (i = u, Er) : Zp : i instanceof la ? Er : i instanceof Date ? uS : iS(i) ? aS : Array.isArray(i) ? oS : typeof i.valueOf != "function" && typeof i.toString != "function" || isNaN(i) ? rS : wn)(n, i);
}
var y0 = 180 / Math.PI, kf = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Gp(n, i, o, u, s, f) {
  var d, g, p;
  return (d = Math.sqrt(n * n + i * i)) && (n /= d, i /= d), (p = n * o + i * u) && (o -= n * p, u -= i * p), (g = Math.sqrt(o * o + u * u)) && (o /= g, u /= g, p /= g), n * u < i * o && (n = -n, i = -i, p = -p, d = -d), {
    translateX: s,
    translateY: f,
    rotate: Math.atan2(i, n) * y0,
    skewX: Math.atan(p) * y0,
    scaleX: d,
    scaleY: g
  };
}
var cr;
function fS(n) {
  const i = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(n + "");
  return i.isIdentity ? kf : Gp(i.a, i.b, i.c, i.d, i.e, i.f);
}
function dS(n) {
  return n == null || (cr || (cr = document.createElementNS("http://www.w3.org/2000/svg", "g")), cr.setAttribute("transform", n), !(n = cr.transform.baseVal.consolidate())) ? kf : (n = n.matrix, Gp(n.a, n.b, n.c, n.d, n.e, n.f));
}
function Qp(n, i, o, u) {
  function s(h) {
    return h.length ? h.pop() + " " : "";
  }
  function f(h, b, y, v, S, w) {
    if (h !== y || b !== v) {
      var A = S.push("translate(", null, i, null, o);
      w.push({ i: A - 4, x: wn(h, y) }, { i: A - 2, x: wn(b, v) });
    } else (y || v) && S.push("translate(" + y + i + v + o);
  }
  function d(h, b, y, v) {
    h !== b ? (h - b > 180 ? b += 360 : b - h > 180 && (h += 360), v.push({ i: y.push(s(y) + "rotate(", null, u) - 2, x: wn(h, b) })) : b && y.push(s(y) + "rotate(" + b + u);
  }
  function g(h, b, y, v) {
    h !== b ? v.push({ i: y.push(s(y) + "skewX(", null, u) - 2, x: wn(h, b) }) : b && y.push(s(y) + "skewX(" + b + u);
  }
  function p(h, b, y, v, S, w) {
    if (h !== y || b !== v) {
      var A = S.push(s(S) + "scale(", null, ",", null, ")");
      w.push({ i: A - 4, x: wn(h, y) }, { i: A - 2, x: wn(b, v) });
    } else (y !== 1 || v !== 1) && S.push(s(S) + "scale(" + y + "," + v + ")");
  }
  return function(h, b) {
    var y = [], v = [];
    return h = n(h), b = n(b), f(h.translateX, h.translateY, b.translateX, b.translateY, y, v), d(h.rotate, b.rotate, y, v), g(h.skewX, b.skewX, y, v), p(h.scaleX, h.scaleY, b.scaleX, b.scaleY, y, v), h = b = null, function(S) {
      for (var w = -1, A = v.length, N; ++w < A; ) y[(N = v[w]).i] = N.x(S);
      return y.join("");
    };
  };
}
var hS = Qp(fS, "px, ", "px)", "deg)"), gS = Qp(dS, ", ", ")", ")"), mS = 1e-12;
function v0(n) {
  return ((n = Math.exp(n)) + 1 / n) / 2;
}
function pS(n) {
  return ((n = Math.exp(n)) - 1 / n) / 2;
}
function yS(n) {
  return ((n = Math.exp(2 * n)) - 1) / (n + 1);
}
const yr = (function n(i, o, u) {
  function s(f, d) {
    var g = f[0], p = f[1], h = f[2], b = d[0], y = d[1], v = d[2], S = b - g, w = y - p, A = S * S + w * w, N, M;
    if (A < mS)
      M = Math.log(v / h) / i, N = function(B) {
        return [
          g + B * S,
          p + B * w,
          h * Math.exp(i * B * M)
        ];
      };
    else {
      var R = Math.sqrt(A), _ = (v * v - h * h + u * A) / (2 * h * o * R), C = (v * v - h * h - u * A) / (2 * v * o * R), Y = Math.log(Math.sqrt(_ * _ + 1) - _), q = Math.log(Math.sqrt(C * C + 1) - C);
      M = (q - Y) / i, N = function(B) {
        var Q = B * M, J = v0(Y), ut = h / (o * R) * (J * yS(i * Q + Y) - pS(Y));
        return [
          g + ut * S,
          p + ut * w,
          h * J / v0(i * Q + Y)
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
var ai = 0, go = 0, so = 0, Kp = 1e3, zr, mo, Mr = 0, aa = 0, kr = 0, wo = typeof performance == "object" && performance.now ? performance : Date, Jp = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(n) {
  setTimeout(n, 17);
};
function If() {
  return aa || (Jp(vS), aa = wo.now() + kr);
}
function vS() {
  aa = 0;
}
function Nr() {
  this._call = this._time = this._next = null;
}
Nr.prototype = Fp.prototype = {
  constructor: Nr,
  restart: function(n, i, o) {
    if (typeof n != "function") throw new TypeError("callback is not a function");
    o = (o == null ? If() : +o) + (i == null ? 0 : +i), !this._next && mo !== this && (mo ? mo._next = this : zr = this, mo = this), this._call = n, this._time = o, Bf();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Bf());
  }
};
function Fp(n, i, o) {
  var u = new Nr();
  return u.restart(n, i, o), u;
}
function bS() {
  If(), ++ai;
  for (var n = zr, i; n; )
    (i = aa - n._time) >= 0 && n._call.call(void 0, i), n = n._next;
  --ai;
}
function b0() {
  aa = (Mr = wo.now()) + kr, ai = go = 0;
  try {
    bS();
  } finally {
    ai = 0, _S(), aa = 0;
  }
}
function xS() {
  var n = wo.now(), i = n - Mr;
  i > Kp && (kr -= i, Mr = n);
}
function _S() {
  for (var n, i = zr, o, u = 1 / 0; i; )
    i._call ? (u > i._time && (u = i._time), n = i, i = i._next) : (o = i._next, i._next = null, i = n ? n._next = o : zr = o);
  mo = n, Bf(u);
}
function Bf(n) {
  if (!ai) {
    go && (go = clearTimeout(go));
    var i = n - aa;
    i > 24 ? (n < 1 / 0 && (go = setTimeout(b0, n - wo.now() - kr)), so && (so = clearInterval(so))) : (so || (Mr = wo.now(), so = setInterval(xS, Kp)), ai = 1, Jp(b0));
  }
}
function x0(n, i, o) {
  var u = new Nr();
  return i = i == null ? 0 : +i, u.restart((s) => {
    u.stop(), n(s + i);
  }, i, o), u;
}
var SS = Rr("start", "end", "cancel", "interrupt"), wS = [], Wp = 0, _0 = 1, Uf = 2, vr = 3, S0 = 4, qf = 5, br = 6;
function Br(n, i, o, u, s, f) {
  var d = n.__transition;
  if (!d) n.__transition = {};
  else if (o in d) return;
  ES(n, o, {
    name: i,
    index: u,
    // For context during callback.
    group: s,
    // For context during callback.
    on: SS,
    tween: wS,
    time: f.time,
    delay: f.delay,
    duration: f.duration,
    ease: f.ease,
    timer: null,
    state: Wp
  });
}
function Pf(n, i) {
  var o = pn(n, i);
  if (o.state > Wp) throw new Error("too late; already scheduled");
  return o;
}
function zn(n, i) {
  var o = pn(n, i);
  if (o.state > vr) throw new Error("too late; already running");
  return o;
}
function pn(n, i) {
  var o = n.__transition;
  if (!o || !(o = o[i])) throw new Error("transition not found");
  return o;
}
function ES(n, i, o) {
  var u = n.__transition, s;
  u[i] = o, o.timer = Fp(f, 0, o.time);
  function f(h) {
    o.state = _0, o.timer.restart(d, o.delay, o.time), o.delay <= h && d(h - o.delay);
  }
  function d(h) {
    var b, y, v, S;
    if (o.state !== _0) return p();
    for (b in u)
      if (S = u[b], S.name === o.name) {
        if (S.state === vr) return x0(d);
        S.state === S0 ? (S.state = br, S.timer.stop(), S.on.call("interrupt", n, n.__data__, S.index, S.group), delete u[b]) : +b < i && (S.state = br, S.timer.stop(), S.on.call("cancel", n, n.__data__, S.index, S.group), delete u[b]);
      }
    if (x0(function() {
      o.state === vr && (o.state = S0, o.timer.restart(g, o.delay, o.time), g(h));
    }), o.state = Uf, o.on.call("start", n, n.__data__, o.index, o.group), o.state === Uf) {
      for (o.state = vr, s = new Array(v = o.tween.length), b = 0, y = -1; b < v; ++b)
        (S = o.tween[b].value.call(n, n.__data__, o.index, o.group)) && (s[++y] = S);
      s.length = y + 1;
    }
  }
  function g(h) {
    for (var b = h < o.duration ? o.ease.call(null, h / o.duration) : (o.timer.restart(p), o.state = qf, 1), y = -1, v = s.length; ++y < v; )
      s[y].call(n, b);
    o.state === qf && (o.on.call("end", n, n.__data__, o.index, o.group), p());
  }
  function p() {
    o.state = br, o.timer.stop(), delete u[i];
    for (var h in u) return;
    delete n.__transition;
  }
}
function xr(n, i) {
  var o = n.__transition, u, s, f = !0, d;
  if (o) {
    i = i == null ? null : i + "";
    for (d in o) {
      if ((u = o[d]).name !== i) {
        f = !1;
        continue;
      }
      s = u.state > Uf && u.state < qf, u.state = br, u.timer.stop(), u.on.call(s ? "interrupt" : "cancel", n, n.__data__, u.index, u.group), delete o[d];
    }
    f && delete n.__transition;
  }
}
function zS(n) {
  return this.each(function() {
    xr(this, n);
  });
}
function MS(n, i) {
  var o, u;
  return function() {
    var s = zn(this, n), f = s.tween;
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
function NS(n, i, o) {
  var u, s;
  if (typeof o != "function") throw new Error();
  return function() {
    var f = zn(this, n), d = f.tween;
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
function AS(n, i) {
  var o = this._id;
  if (n += "", arguments.length < 2) {
    for (var u = pn(this.node(), o).tween, s = 0, f = u.length, d; s < f; ++s)
      if ((d = u[s]).name === n)
        return d.value;
    return null;
  }
  return this.each((i == null ? MS : NS)(o, n, i));
}
function td(n, i, o) {
  var u = n._id;
  return n.each(function() {
    var s = zn(this, u);
    (s.value || (s.value = {}))[i] = o.apply(this, arguments);
  }), function(s) {
    return pn(s, u).value[i];
  };
}
function Ip(n, i) {
  var o;
  return (typeof i == "number" ? wn : i instanceof la ? Er : (o = la(i)) ? (i = o, Er) : Zp)(n, i);
}
function CS(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function TS(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function DS(n, i, o) {
  var u, s = o + "", f;
  return function() {
    var d = this.getAttribute(n);
    return d === s ? null : d === u ? f : f = i(u = d, o);
  };
}
function OS(n, i, o) {
  var u, s = o + "", f;
  return function() {
    var d = this.getAttributeNS(n.space, n.local);
    return d === s ? null : d === u ? f : f = i(u = d, o);
  };
}
function RS(n, i, o) {
  var u, s, f;
  return function() {
    var d, g = o(this), p;
    return g == null ? void this.removeAttribute(n) : (d = this.getAttribute(n), p = g + "", d === p ? null : d === u && p === s ? f : (s = p, f = i(u = d, g)));
  };
}
function HS(n, i, o) {
  var u, s, f;
  return function() {
    var d, g = o(this), p;
    return g == null ? void this.removeAttributeNS(n.space, n.local) : (d = this.getAttributeNS(n.space, n.local), p = g + "", d === p ? null : d === u && p === s ? f : (s = p, f = i(u = d, g)));
  };
}
function kS(n, i) {
  var o = Hr(n), u = o === "transform" ? gS : Ip;
  return this.attrTween(n, typeof i == "function" ? (o.local ? HS : RS)(o, u, td(this, "attr." + n, i)) : i == null ? (o.local ? TS : CS)(o) : (o.local ? OS : DS)(o, u, i));
}
function BS(n, i) {
  return function(o) {
    this.setAttribute(n, i.call(this, o));
  };
}
function US(n, i) {
  return function(o) {
    this.setAttributeNS(n.space, n.local, i.call(this, o));
  };
}
function qS(n, i) {
  var o, u;
  function s() {
    var f = i.apply(this, arguments);
    return f !== u && (o = (u = f) && US(n, f)), o;
  }
  return s._value = i, s;
}
function jS(n, i) {
  var o, u;
  function s() {
    var f = i.apply(this, arguments);
    return f !== u && (o = (u = f) && BS(n, f)), o;
  }
  return s._value = i, s;
}
function YS(n, i) {
  var o = "attr." + n;
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (i == null) return this.tween(o, null);
  if (typeof i != "function") throw new Error();
  var u = Hr(n);
  return this.tween(o, (u.local ? qS : jS)(u, i));
}
function LS(n, i) {
  return function() {
    Pf(this, n).delay = +i.apply(this, arguments);
  };
}
function VS(n, i) {
  return i = +i, function() {
    Pf(this, n).delay = i;
  };
}
function XS(n) {
  var i = this._id;
  return arguments.length ? this.each((typeof n == "function" ? LS : VS)(i, n)) : pn(this.node(), i).delay;
}
function $S(n, i) {
  return function() {
    zn(this, n).duration = +i.apply(this, arguments);
  };
}
function ZS(n, i) {
  return i = +i, function() {
    zn(this, n).duration = i;
  };
}
function GS(n) {
  var i = this._id;
  return arguments.length ? this.each((typeof n == "function" ? $S : ZS)(i, n)) : pn(this.node(), i).duration;
}
function QS(n, i) {
  if (typeof i != "function") throw new Error();
  return function() {
    zn(this, n).ease = i;
  };
}
function KS(n) {
  var i = this._id;
  return arguments.length ? this.each(QS(i, n)) : pn(this.node(), i).ease;
}
function JS(n, i) {
  return function() {
    var o = i.apply(this, arguments);
    if (typeof o != "function") throw new Error();
    zn(this, n).ease = o;
  };
}
function FS(n) {
  if (typeof n != "function") throw new Error();
  return this.each(JS(this._id, n));
}
function WS(n) {
  typeof n != "function" && (n = Cp(n));
  for (var i = this._groups, o = i.length, u = new Array(o), s = 0; s < o; ++s)
    for (var f = i[s], d = f.length, g = u[s] = [], p, h = 0; h < d; ++h)
      (p = f[h]) && n.call(p, p.__data__, h, f) && g.push(p);
  return new Fn(u, this._parents, this._name, this._id);
}
function IS(n) {
  if (n._id !== this._id) throw new Error();
  for (var i = this._groups, o = n._groups, u = i.length, s = o.length, f = Math.min(u, s), d = new Array(u), g = 0; g < f; ++g)
    for (var p = i[g], h = o[g], b = p.length, y = d[g] = new Array(b), v, S = 0; S < b; ++S)
      (v = p[S] || h[S]) && (y[S] = v);
  for (; g < u; ++g)
    d[g] = i[g];
  return new Fn(d, this._parents, this._name, this._id);
}
function PS(n) {
  return (n + "").trim().split(/^|\s+/).every(function(i) {
    var o = i.indexOf(".");
    return o >= 0 && (i = i.slice(0, o)), !i || i === "start";
  });
}
function tw(n, i, o) {
  var u, s, f = PS(i) ? Pf : zn;
  return function() {
    var d = f(this, n), g = d.on;
    g !== u && (s = (u = g).copy()).on(i, o), d.on = s;
  };
}
function ew(n, i) {
  var o = this._id;
  return arguments.length < 2 ? pn(this.node(), o).on.on(n) : this.each(tw(o, n, i));
}
function nw(n) {
  return function() {
    var i = this.parentNode;
    for (var o in this.__transition) if (+o !== n) return;
    i && i.removeChild(this);
  };
}
function lw() {
  return this.on("end.remove", nw(this._id));
}
function aw(n) {
  var i = this._name, o = this._id;
  typeof n != "function" && (n = Kf(n));
  for (var u = this._groups, s = u.length, f = new Array(s), d = 0; d < s; ++d)
    for (var g = u[d], p = g.length, h = f[d] = new Array(p), b, y, v = 0; v < p; ++v)
      (b = g[v]) && (y = n.call(b, b.__data__, v, g)) && ("__data__" in b && (y.__data__ = b.__data__), h[v] = y, Br(h[v], i, o, v, h, pn(b, o)));
  return new Fn(f, this._parents, i, o);
}
function iw(n) {
  var i = this._name, o = this._id;
  typeof n != "function" && (n = Ap(n));
  for (var u = this._groups, s = u.length, f = [], d = [], g = 0; g < s; ++g)
    for (var p = u[g], h = p.length, b, y = 0; y < h; ++y)
      if (b = p[y]) {
        for (var v = n.call(b, b.__data__, y, p), S, w = pn(b, o), A = 0, N = v.length; A < N; ++A)
          (S = v[A]) && Br(S, i, o, A, v, w);
        f.push(v), d.push(b);
      }
  return new Fn(f, d, i, o);
}
var ow = Do.prototype.constructor;
function uw() {
  return new ow(this._groups, this._parents);
}
function rw(n, i) {
  var o, u, s;
  return function() {
    var f = li(this, n), d = (this.style.removeProperty(n), li(this, n));
    return f === d ? null : f === o && d === u ? s : s = i(o = f, u = d);
  };
}
function Pp(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function cw(n, i, o) {
  var u, s = o + "", f;
  return function() {
    var d = li(this, n);
    return d === s ? null : d === u ? f : f = i(u = d, o);
  };
}
function sw(n, i, o) {
  var u, s, f;
  return function() {
    var d = li(this, n), g = o(this), p = g + "";
    return g == null && (p = g = (this.style.removeProperty(n), li(this, n))), d === p ? null : d === u && p === s ? f : (s = p, f = i(u = d, g));
  };
}
function fw(n, i) {
  var o, u, s, f = "style." + i, d = "end." + f, g;
  return function() {
    var p = zn(this, n), h = p.on, b = p.value[f] == null ? g || (g = Pp(i)) : void 0;
    (h !== o || s !== b) && (u = (o = h).copy()).on(d, s = b), p.on = u;
  };
}
function dw(n, i, o) {
  var u = (n += "") == "transform" ? hS : Ip;
  return i == null ? this.styleTween(n, rw(n, u)).on("end.style." + n, Pp(n)) : typeof i == "function" ? this.styleTween(n, sw(n, u, td(this, "style." + n, i))).each(fw(this._id, n)) : this.styleTween(n, cw(n, u, i), o).on("end.style." + n, null);
}
function hw(n, i, o) {
  return function(u) {
    this.style.setProperty(n, i.call(this, u), o);
  };
}
function gw(n, i, o) {
  var u, s;
  function f() {
    var d = i.apply(this, arguments);
    return d !== s && (u = (s = d) && hw(n, d, o)), u;
  }
  return f._value = i, f;
}
function mw(n, i, o) {
  var u = "style." + (n += "");
  if (arguments.length < 2) return (u = this.tween(u)) && u._value;
  if (i == null) return this.tween(u, null);
  if (typeof i != "function") throw new Error();
  return this.tween(u, gw(n, i, o ?? ""));
}
function pw(n) {
  return function() {
    this.textContent = n;
  };
}
function yw(n) {
  return function() {
    var i = n(this);
    this.textContent = i ?? "";
  };
}
function vw(n) {
  return this.tween("text", typeof n == "function" ? yw(td(this, "text", n)) : pw(n == null ? "" : n + ""));
}
function bw(n) {
  return function(i) {
    this.textContent = n.call(this, i);
  };
}
function xw(n) {
  var i, o;
  function u() {
    var s = n.apply(this, arguments);
    return s !== o && (i = (o = s) && bw(s)), i;
  }
  return u._value = n, u;
}
function _w(n) {
  var i = "text";
  if (arguments.length < 1) return (i = this.tween(i)) && i._value;
  if (n == null) return this.tween(i, null);
  if (typeof n != "function") throw new Error();
  return this.tween(i, xw(n));
}
function Sw() {
  for (var n = this._name, i = this._id, o = ty(), u = this._groups, s = u.length, f = 0; f < s; ++f)
    for (var d = u[f], g = d.length, p, h = 0; h < g; ++h)
      if (p = d[h]) {
        var b = pn(p, i);
        Br(p, n, o, h, d, {
          time: b.time + b.delay + b.duration,
          delay: 0,
          duration: b.duration,
          ease: b.ease
        });
      }
  return new Fn(u, this._parents, n, o);
}
function ww() {
  var n, i, o = this, u = o._id, s = o.size();
  return new Promise(function(f, d) {
    var g = { value: d }, p = { value: function() {
      --s === 0 && f();
    } };
    o.each(function() {
      var h = zn(this, u), b = h.on;
      b !== n && (i = (n = b).copy(), i._.cancel.push(g), i._.interrupt.push(g), i._.end.push(p)), h.on = i;
    }), s === 0 && f();
  });
}
var Ew = 0;
function Fn(n, i, o, u) {
  this._groups = n, this._parents = i, this._name = o, this._id = u;
}
function ty() {
  return ++Ew;
}
var Qn = Do.prototype;
Fn.prototype = {
  constructor: Fn,
  select: aw,
  selectAll: iw,
  selectChild: Qn.selectChild,
  selectChildren: Qn.selectChildren,
  filter: WS,
  merge: IS,
  selection: uw,
  transition: Sw,
  call: Qn.call,
  nodes: Qn.nodes,
  node: Qn.node,
  size: Qn.size,
  empty: Qn.empty,
  each: Qn.each,
  on: ew,
  attr: kS,
  attrTween: YS,
  style: dw,
  styleTween: mw,
  text: vw,
  textTween: _w,
  remove: lw,
  tween: AS,
  delay: XS,
  duration: GS,
  ease: KS,
  easeVarying: FS,
  end: ww,
  [Symbol.iterator]: Qn[Symbol.iterator]
};
function zw(n) {
  return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
}
var Mw = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: zw
};
function Nw(n, i) {
  for (var o; !(o = n.__transition) || !(o = o[i]); )
    if (!(n = n.parentNode))
      throw new Error(`transition ${i} not found`);
  return o;
}
function Aw(n) {
  var i, o;
  n instanceof Fn ? (i = n._id, n = n._name) : (i = ty(), (o = Mw).time = If(), n = n == null ? null : n + "");
  for (var u = this._groups, s = u.length, f = 0; f < s; ++f)
    for (var d = u[f], g = d.length, p, h = 0; h < g; ++h)
      (p = d[h]) && Br(p, n, i, h, d, o || Nw(p, i));
  return new Fn(u, this._parents, n, i);
}
Do.prototype.interrupt = zS;
Do.prototype.transition = Aw;
const sr = (n) => () => n;
function Cw(n, {
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
function Kn(n, i, o) {
  this.k = n, this.x = i, this.y = o;
}
Kn.prototype = {
  constructor: Kn,
  scale: function(n) {
    return n === 1 ? this : new Kn(this.k * n, this.x, this.y);
  },
  translate: function(n, i) {
    return n === 0 & i === 0 ? this : new Kn(this.k, this.x + this.k * n, this.y + this.k * i);
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
var Ur = new Kn(1, 0, 0);
ey.prototype = Kn.prototype;
function ey(n) {
  for (; !n.__zoom; ) if (!(n = n.parentNode)) return Ur;
  return n.__zoom;
}
function xf(n) {
  n.stopImmediatePropagation();
}
function fo(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function Tw(n) {
  return (!n.ctrlKey || n.type === "wheel") && !n.button;
}
function Dw() {
  var n = this;
  return n instanceof SVGElement ? (n = n.ownerSVGElement || n, n.hasAttribute("viewBox") ? (n = n.viewBox.baseVal, [[n.x, n.y], [n.x + n.width, n.y + n.height]]) : [[0, 0], [n.width.baseVal.value, n.height.baseVal.value]]) : [[0, 0], [n.clientWidth, n.clientHeight]];
}
function w0() {
  return this.__zoom || Ur;
}
function Ow(n) {
  return -n.deltaY * (n.deltaMode === 1 ? 0.05 : n.deltaMode ? 1 : 2e-3) * (n.ctrlKey ? 10 : 1);
}
function Rw() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Hw(n, i, o) {
  var u = n.invertX(i[0][0]) - o[0][0], s = n.invertX(i[1][0]) - o[1][0], f = n.invertY(i[0][1]) - o[0][1], d = n.invertY(i[1][1]) - o[1][1];
  return n.translate(
    s > u ? (u + s) / 2 : Math.min(0, u) || Math.max(0, s),
    d > f ? (f + d) / 2 : Math.min(0, f) || Math.max(0, d)
  );
}
function ny() {
  var n = Tw, i = Dw, o = Hw, u = Ow, s = Rw, f = [0, 1 / 0], d = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], g = 250, p = yr, h = Rr("start", "zoom", "end"), b, y, v, S = 500, w = 150, A = 0, N = 10;
  function M(T) {
    T.property("__zoom", w0).on("wheel.zoom", Q, { passive: !1 }).on("mousedown.zoom", J).on("dblclick.zoom", ut).filter(s).on("touchstart.zoom", Z).on("touchmove.zoom", I).on("touchend.zoom touchcancel.zoom", ot).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  M.transform = function(T, V, E, O) {
    var L = T.selection ? T.selection() : T;
    L.property("__zoom", w0), T !== L ? Y(T, V, E, O) : L.interrupt().each(function() {
      q(this, arguments).event(O).start().zoom(null, typeof V == "function" ? V.apply(this, arguments) : V).end();
    });
  }, M.scaleBy = function(T, V, E, O) {
    M.scaleTo(T, function() {
      var L = this.__zoom.k, X = typeof V == "function" ? V.apply(this, arguments) : V;
      return L * X;
    }, E, O);
  }, M.scaleTo = function(T, V, E, O) {
    M.transform(T, function() {
      var L = i.apply(this, arguments), X = this.__zoom, nt = E == null ? C(L) : typeof E == "function" ? E.apply(this, arguments) : E, z = X.invert(nt), H = typeof V == "function" ? V.apply(this, arguments) : V;
      return o(_(R(X, H), nt, z), L, d);
    }, E, O);
  }, M.translateBy = function(T, V, E, O) {
    M.transform(T, function() {
      return o(this.__zoom.translate(
        typeof V == "function" ? V.apply(this, arguments) : V,
        typeof E == "function" ? E.apply(this, arguments) : E
      ), i.apply(this, arguments), d);
    }, null, O);
  }, M.translateTo = function(T, V, E, O, L) {
    M.transform(T, function() {
      var X = i.apply(this, arguments), nt = this.__zoom, z = O == null ? C(X) : typeof O == "function" ? O.apply(this, arguments) : O;
      return o(Ur.translate(z[0], z[1]).scale(nt.k).translate(
        typeof V == "function" ? -V.apply(this, arguments) : -V,
        typeof E == "function" ? -E.apply(this, arguments) : -E
      ), X, d);
    }, O, L);
  };
  function R(T, V) {
    return V = Math.max(f[0], Math.min(f[1], V)), V === T.k ? T : new Kn(V, T.x, T.y);
  }
  function _(T, V, E) {
    var O = V[0] - E[0] * T.k, L = V[1] - E[1] * T.k;
    return O === T.x && L === T.y ? T : new Kn(T.k, O, L);
  }
  function C(T) {
    return [(+T[0][0] + +T[1][0]) / 2, (+T[0][1] + +T[1][1]) / 2];
  }
  function Y(T, V, E, O) {
    T.on("start.zoom", function() {
      q(this, arguments).event(O).start();
    }).on("interrupt.zoom end.zoom", function() {
      q(this, arguments).event(O).end();
    }).tween("zoom", function() {
      var L = this, X = arguments, nt = q(L, X).event(O), z = i.apply(L, X), H = E == null ? C(z) : typeof E == "function" ? E.apply(L, X) : E, P = Math.max(z[1][0] - z[0][0], z[1][1] - z[0][1]), lt = L.__zoom, rt = typeof V == "function" ? V.apply(L, X) : V, ft = p(lt.invert(H).concat(P / lt.k), rt.invert(H).concat(P / rt.k));
      return function(ct) {
        if (ct === 1) ct = rt;
        else {
          var tt = ft(ct), st = P / tt[2];
          ct = new Kn(st, H[0] - tt[0] * st, H[1] - tt[1] * st);
        }
        nt.zoom(null, ct);
      };
    });
  }
  function q(T, V, E) {
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
      var V = Xe(this.that).datum();
      h.call(
        T,
        this.that,
        new Cw(T, {
          sourceEvent: this.sourceEvent,
          target: M,
          transform: this.that.__zoom,
          dispatch: h
        }),
        V
      );
    }
  };
  function Q(T, ...V) {
    if (!n.apply(this, arguments)) return;
    var E = q(this, V).event(T), O = this.__zoom, L = Math.max(f[0], Math.min(f[1], O.k * Math.pow(2, u.apply(this, arguments)))), X = fn(T);
    if (E.wheel)
      (E.mouse[0][0] !== X[0] || E.mouse[0][1] !== X[1]) && (E.mouse[1] = O.invert(E.mouse[0] = X)), clearTimeout(E.wheel);
    else {
      if (O.k === L) return;
      E.mouse = [X, O.invert(X)], xr(this), E.start();
    }
    fo(T), E.wheel = setTimeout(nt, w), E.zoom("mouse", o(_(R(O, L), E.mouse[0], E.mouse[1]), E.extent, d));
    function nt() {
      E.wheel = null, E.end();
    }
  }
  function J(T, ...V) {
    if (v || !n.apply(this, arguments)) return;
    var E = T.currentTarget, O = q(this, V, !0).event(T), L = Xe(T.view).on("mousemove.zoom", H, !0).on("mouseup.zoom", P, !0), X = fn(T, E), nt = T.clientX, z = T.clientY;
    jp(T.view), xf(T), O.mouse = [X, this.__zoom.invert(X)], xr(this), O.start();
    function H(lt) {
      if (fo(lt), !O.moved) {
        var rt = lt.clientX - nt, ft = lt.clientY - z;
        O.moved = rt * rt + ft * ft > A;
      }
      O.event(lt).zoom("mouse", o(_(O.that.__zoom, O.mouse[0] = fn(lt, E), O.mouse[1]), O.extent, d));
    }
    function P(lt) {
      L.on("mousemove.zoom mouseup.zoom", null), Yp(lt.view, O.moved), fo(lt), O.event(lt).end();
    }
  }
  function ut(T, ...V) {
    if (n.apply(this, arguments)) {
      var E = this.__zoom, O = fn(T.changedTouches ? T.changedTouches[0] : T, this), L = E.invert(O), X = E.k * (T.shiftKey ? 0.5 : 2), nt = o(_(R(E, X), O, L), i.apply(this, V), d);
      fo(T), g > 0 ? Xe(this).transition().duration(g).call(Y, nt, O, T) : Xe(this).call(M.transform, nt, O, T);
    }
  }
  function Z(T, ...V) {
    if (n.apply(this, arguments)) {
      var E = T.touches, O = E.length, L = q(this, V, T.changedTouches.length === O).event(T), X, nt, z, H;
      for (xf(T), nt = 0; nt < O; ++nt)
        z = E[nt], H = fn(z, this), H = [H, this.__zoom.invert(H), z.identifier], L.touch0 ? !L.touch1 && L.touch0[2] !== H[2] && (L.touch1 = H, L.taps = 0) : (L.touch0 = H, X = !0, L.taps = 1 + !!b);
      b && (b = clearTimeout(b)), X && (L.taps < 2 && (y = H[0], b = setTimeout(function() {
        b = null;
      }, S)), xr(this), L.start());
    }
  }
  function I(T, ...V) {
    if (this.__zooming) {
      var E = q(this, V).event(T), O = T.changedTouches, L = O.length, X, nt, z, H;
      for (fo(T), X = 0; X < L; ++X)
        nt = O[X], z = fn(nt, this), E.touch0 && E.touch0[2] === nt.identifier ? E.touch0[0] = z : E.touch1 && E.touch1[2] === nt.identifier && (E.touch1[0] = z);
      if (nt = E.that.__zoom, E.touch1) {
        var P = E.touch0[0], lt = E.touch0[1], rt = E.touch1[0], ft = E.touch1[1], ct = (ct = rt[0] - P[0]) * ct + (ct = rt[1] - P[1]) * ct, tt = (tt = ft[0] - lt[0]) * tt + (tt = ft[1] - lt[1]) * tt;
        nt = R(nt, Math.sqrt(ct / tt)), z = [(P[0] + rt[0]) / 2, (P[1] + rt[1]) / 2], H = [(lt[0] + ft[0]) / 2, (lt[1] + ft[1]) / 2];
      } else if (E.touch0) z = E.touch0[0], H = E.touch0[1];
      else return;
      E.zoom("touch", o(_(nt, z, H), E.extent, d));
    }
  }
  function ot(T, ...V) {
    if (this.__zooming) {
      var E = q(this, V).event(T), O = T.changedTouches, L = O.length, X, nt;
      for (xf(T), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, S), X = 0; X < L; ++X)
        nt = O[X], E.touch0 && E.touch0[2] === nt.identifier ? delete E.touch0 : E.touch1 && E.touch1[2] === nt.identifier && delete E.touch1;
      if (E.touch1 && !E.touch0 && (E.touch0 = E.touch1, delete E.touch1), E.touch0) E.touch0[1] = this.__zoom.invert(E.touch0[0]);
      else if (E.end(), E.taps === 2 && (nt = fn(nt, this), Math.hypot(y[0] - nt[0], y[1] - nt[1]) < N)) {
        var z = Xe(this).on("dblclick.zoom");
        z && z.apply(this, arguments);
      }
    }
  }
  return M.wheelDelta = function(T) {
    return arguments.length ? (u = typeof T == "function" ? T : sr(+T), M) : u;
  }, M.filter = function(T) {
    return arguments.length ? (n = typeof T == "function" ? T : sr(!!T), M) : n;
  }, M.touchable = function(T) {
    return arguments.length ? (s = typeof T == "function" ? T : sr(!!T), M) : s;
  }, M.extent = function(T) {
    return arguments.length ? (i = typeof T == "function" ? T : sr([[+T[0][0], +T[0][1]], [+T[1][0], +T[1][1]]]), M) : i;
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
const mn = {
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
}, Eo = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], ly = ["Enter", " ", "Escape"], ay = {
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
var ii;
(function(n) {
  n.Strict = "strict", n.Loose = "loose";
})(ii || (ii = {}));
var na;
(function(n) {
  n.Free = "free", n.Vertical = "vertical", n.Horizontal = "horizontal";
})(na || (na = {}));
var zo;
(function(n) {
  n.Partial = "partial", n.Full = "full";
})(zo || (zo = {}));
const iy = {
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
var Cl;
(function(n) {
  n.Bezier = "default", n.Straight = "straight", n.Step = "step", n.SmoothStep = "smoothstep", n.SimpleBezier = "simplebezier";
})(Cl || (Cl = {}));
var Ar;
(function(n) {
  n.Arrow = "arrow", n.ArrowClosed = "arrowclosed";
})(Ar || (Ar = {}));
var mt;
(function(n) {
  n.Left = "left", n.Top = "top", n.Right = "right", n.Bottom = "bottom";
})(mt || (mt = {}));
const E0 = {
  [mt.Left]: mt.Right,
  [mt.Right]: mt.Left,
  [mt.Top]: mt.Bottom,
  [mt.Bottom]: mt.Top
};
function oy(n) {
  return n === null ? null : n ? "valid" : "invalid";
}
const uy = (n) => "id" in n && "source" in n && "target" in n, kw = (n) => "id" in n && "position" in n && !("source" in n) && !("target" in n), ed = (n) => "id" in n && "internals" in n && !("source" in n) && !("target" in n), Ro = (n, i = [0, 0]) => {
  const { width: o, height: u } = Wn(n), s = n.origin ?? i, f = o * s[0], d = u * s[1];
  return {
    x: n.position.x - f,
    y: n.position.y - d
  };
}, Bw = (n, i = { nodeOrigin: [0, 0] }) => {
  if (n.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const o = n.reduce((u, s) => {
    const f = typeof s == "string";
    let d = !i.nodeLookup && !f ? s : void 0;
    i.nodeLookup && (d = f ? i.nodeLookup.get(s) : ed(s) ? s : i.nodeLookup.get(s.id));
    const g = d ? Cr(d, i.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return qr(u, g);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return jr(o);
}, Ho = (n, i = {}) => {
  let o = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, u = !1;
  return n.forEach((s) => {
    (i.filter === void 0 || i.filter(s)) && (o = qr(o, Cr(s)), u = !0);
  }), u ? jr(o) : { x: 0, y: 0, width: 0, height: 0 };
}, nd = (n, i, [o, u, s] = [0, 0, 1], f = !1, d = !1) => {
  const g = (i.x - o) / s, p = (i.y - u) / s, h = i.width / s, b = i.height / s, y = [];
  for (const v of n.values()) {
    const { measured: S, selectable: w = !0, hidden: A = !1 } = v;
    if (d && !w || A)
      continue;
    const N = S.width ?? v.width ?? v.initialWidth ?? 0, M = S.height ?? v.height ?? v.initialHeight ?? 0, { x: R, y: _ } = v.internals.positionAbsolute, C = fy(g, p, h, b, R, _, N, M), Y = N * M, q = f && C > 0;
    (!v.internals.handleBounds || q || C >= Y || v.dragging) && y.push(v);
  }
  return y;
}, Uw = (n, i) => {
  const o = /* @__PURE__ */ new Set();
  return n.forEach((u) => {
    o.add(u.id);
  }), i.filter((u) => o.has(u.source) || o.has(u.target));
};
function qw(n, i) {
  const o = /* @__PURE__ */ new Map(), u = i?.nodes ? new Set(i.nodes.map((s) => s.id)) : null;
  return n.forEach((s) => {
    s.measured.width && s.measured.height && (i?.includeHiddenNodes || !s.hidden) && (!u || u.has(s.id)) && o.set(s.id, s);
  }), o;
}
async function jw({ nodes: n, width: i, height: o, panZoom: u, minZoom: s, maxZoom: f }, d) {
  if (n.size === 0)
    return !0;
  const g = qw(n, d), p = Ho(g), h = ad(p, i, o, d?.minZoom ?? s, d?.maxZoom ?? f, d?.padding ?? 0.1);
  return await u.setViewport(h, {
    duration: d?.duration,
    ease: d?.ease,
    interpolate: d?.interpolate
  }), !0;
}
function ry({ nodeId: n, nextPosition: i, nodeLookup: o, nodeOrigin: u = [0, 0], nodeExtent: s, onError: f }) {
  const d = o.get(n), g = d.parentId ? o.get(d.parentId) : void 0, { x: p, y: h } = g ? g.internals.positionAbsolute : { x: 0, y: 0 }, b = d.origin ?? u;
  let y = d.extent || s;
  if (d.extent === "parent" && !d.expandParent)
    if (!g)
      f?.("005", mn.error005());
    else {
      const S = g.measured.width, w = g.measured.height;
      S && w && (y = [
        [p, h],
        [p + S, h + w]
      ]);
    }
  else g && oa(d.extent) && (y = [
    [d.extent[0][0] + p, d.extent[0][1] + h],
    [d.extent[1][0] + p, d.extent[1][1] + h]
  ]);
  const v = oa(y) ? ia(i, y, d.measured) : i;
  return (d.measured.width === void 0 || d.measured.height === void 0) && f?.("015", mn.error015()), {
    position: {
      x: v.x - p + (d.measured.width ?? 0) * b[0],
      y: v.y - h + (d.measured.height ?? 0) * b[1]
    },
    positionAbsolute: v
  };
}
async function Yw({ nodesToRemove: n = [], edgesToRemove: i = [], nodes: o, edges: u, onBeforeDelete: s }) {
  const f = new Set(n.map((v) => v.id)), d = [];
  for (const v of o) {
    if (v.deletable === !1)
      continue;
    const S = f.has(v.id), w = !S && v.parentId && d.find((A) => A.id === v.parentId);
    (S || w) && d.push(v);
  }
  const g = new Set(i.map((v) => v.id)), p = u.filter((v) => v.deletable !== !1), b = Uw(d, p);
  for (const v of p)
    g.has(v.id) && !b.find((w) => w.id === v.id) && b.push(v);
  if (!s)
    return {
      edges: b,
      nodes: d
    };
  const y = await s({
    nodes: d,
    edges: b
  });
  return typeof y == "boolean" ? y ? { edges: b, nodes: d } : { edges: [], nodes: [] } : y;
}
const oi = (n, i = 0, o = 1) => Math.min(Math.max(n, i), o), ia = (n = { x: 0, y: 0 }, i, o) => ({
  x: oi(n.x, i[0][0], i[1][0] - (o?.width ?? 0)),
  y: oi(n.y, i[0][1], i[1][1] - (o?.height ?? 0))
});
function cy(n, i, o) {
  const { width: u, height: s } = Wn(o), { x: f, y: d } = o.internals.positionAbsolute;
  return ia(n, [
    [f, d],
    [f + u, d + s]
  ], i);
}
const z0 = (n, i, o) => n < i ? oi(Math.abs(n - i), 1, i) / i : n > o ? -oi(Math.abs(n - o), 1, i) / i : 0, ld = (n, i, o = 15, u = 40) => {
  const s = z0(n.x, u, i.width - u) * o, f = z0(n.y, u, i.height - u) * o;
  return [s, f];
}, qr = (n, i) => ({
  x: Math.min(n.x, i.x),
  y: Math.min(n.y, i.y),
  x2: Math.max(n.x2, i.x2),
  y2: Math.max(n.y2, i.y2)
}), jf = ({ x: n, y: i, width: o, height: u }) => ({
  x: n,
  y: i,
  x2: n + o,
  y2: i + u
}), jr = ({ x: n, y: i, x2: o, y2: u }) => ({
  x: n,
  y: i,
  width: o - n,
  height: u - i
}), Mo = (n, i = [0, 0]) => {
  const { x: o, y: u } = ed(n) ? n.internals.positionAbsolute : Ro(n, i);
  return {
    x: o,
    y: u,
    width: n.measured?.width ?? n.width ?? n.initialWidth ?? 0,
    height: n.measured?.height ?? n.height ?? n.initialHeight ?? 0
  };
}, Cr = (n, i = [0, 0]) => {
  const { x: o, y: u } = ed(n) ? n.internals.positionAbsolute : Ro(n, i);
  return {
    x: o,
    y: u,
    x2: o + (n.measured?.width ?? n.width ?? n.initialWidth ?? 0),
    y2: u + (n.measured?.height ?? n.height ?? n.initialHeight ?? 0)
  };
}, sy = (n, i) => jr(qr(jf(n), jf(i))), fy = (n, i, o, u, s, f, d, g) => {
  const p = Math.max(0, Math.min(n + o, s + d) - Math.max(n, s)), h = Math.max(0, Math.min(i + u, f + g) - Math.max(i, f));
  return Math.ceil(p * h);
}, Tr = (n, i) => fy(n.x, n.y, n.width, n.height, i.x, i.y, i.width, i.height), M0 = (n) => hn(n.width) && hn(n.height) && hn(n.x) && hn(n.y), hn = (n) => !isNaN(n) && isFinite(n), dy = (n, i) => (o, u) => {
}, ko = (n, i = [1, 1]) => ({
  x: i[0] * Math.round(n.x / i[0]),
  y: i[1] * Math.round(n.y / i[1])
}), Bo = ({ x: n, y: i }, [o, u, s], f = !1, d = [1, 1]) => {
  const g = {
    x: (n - o) / s,
    y: (i - u) / s
  };
  return f ? ko(g, d) : g;
}, ui = ({ x: n, y: i }, [o, u, s]) => ({
  x: n * s + o,
  y: i * s + u
});
function Wa(n, i) {
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
function Lw(n, i, o) {
  if (typeof n == "string" || typeof n == "number") {
    const u = Wa(n, o), s = Wa(n, i);
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
    const u = Wa(n.top ?? n.y ?? 0, o), s = Wa(n.bottom ?? n.y ?? 0, o), f = Wa(n.left ?? n.x ?? 0, i), d = Wa(n.right ?? n.x ?? 0, i);
    return { top: u, right: d, bottom: s, left: f, x: f + d, y: u + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function Vw(n, i, o, u, s, f) {
  const { x: d, y: g } = ui(n, [i, o, u]), { x: p, y: h } = ui({ x: n.x + n.width, y: n.y + n.height }, [i, o, u]), b = s - p, y = f - h;
  return {
    left: Math.floor(d),
    top: Math.floor(g),
    right: Math.floor(b),
    bottom: Math.floor(y)
  };
}
const ad = (n, i, o, u, s, f) => {
  const d = Lw(f, i, o), g = (i - d.x) / n.width, p = (o - d.y) / n.height, h = Math.min(g, p), b = oi(h, u, s), y = n.x + n.width / 2, v = n.y + n.height / 2, S = i / 2 - y * b, w = o / 2 - v * b, A = Vw(n, S, w, b, i, o), N = {
    left: Math.min(A.left - d.left, 0),
    top: Math.min(A.top - d.top, 0),
    right: Math.min(A.right - d.right, 0),
    bottom: Math.min(A.bottom - d.bottom, 0)
  };
  return {
    x: S - N.left + N.right,
    y: w - N.top + N.bottom,
    zoom: b
  };
}, No = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function oa(n) {
  return n != null && n !== "parent";
}
function Wn(n) {
  return {
    width: n.measured?.width ?? n.width ?? n.initialWidth ?? 0,
    height: n.measured?.height ?? n.height ?? n.initialHeight ?? 0
  };
}
function hy(n) {
  return (n.measured?.width ?? n.width ?? n.initialWidth) !== void 0 && (n.measured?.height ?? n.height ?? n.initialHeight) !== void 0;
}
function gy(n, i = { width: 0, height: 0 }, o, u, s) {
  const f = { ...n }, d = u.get(o);
  if (d) {
    const g = d.origin || s;
    f.x += d.internals.positionAbsolute.x - (i.width ?? 0) * g[0], f.y += d.internals.positionAbsolute.y - (i.height ?? 0) * g[1];
  }
  return f;
}
function N0(n, i) {
  if (n.size !== i.size)
    return !1;
  for (const o of n)
    if (!i.has(o))
      return !1;
  return !0;
}
function Xw() {
  let n, i;
  return { promise: new Promise((u, s) => {
    n = u, i = s;
  }), resolve: n, reject: i };
}
function $w(n) {
  return { ...ay, ...n || {} };
}
function yo(n, { snapGrid: i = [0, 0], snapToGrid: o = !1, transform: u, containerBounds: s }) {
  const { x: f, y: d } = gn(n), g = Bo({ x: f - (s?.left ?? 0), y: d - (s?.top ?? 0) }, u), { x: p, y: h } = o ? ko(g, i) : g;
  return {
    xSnapped: p,
    ySnapped: h,
    ...g
  };
}
const id = (n) => ({
  width: n.offsetWidth,
  height: n.offsetHeight
}), my = (n) => n?.getRootNode?.() || window?.document, Zw = ["INPUT", "SELECT", "TEXTAREA"];
function py(n) {
  const i = n.composedPath?.()?.[0] || n.target;
  return i?.nodeType !== 1 ? !1 : Zw.includes(i.nodeName) || i.hasAttribute("contenteditable") || !!i.closest(".nokey");
}
const yy = (n) => "clientX" in n, gn = (n, i) => {
  const o = yy(n), u = o ? n.clientX : n.touches?.[0].clientX, s = o ? n.clientY : n.touches?.[0].clientY;
  return {
    x: u - (i?.left ?? 0),
    y: s - (i?.top ?? 0)
  };
}, A0 = (n, i, o, u, s) => {
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
      ...id(d)
    };
  });
};
function vy({ sourceX: n, sourceY: i, targetX: o, targetY: u, sourceControlX: s, sourceControlY: f, targetControlX: d, targetControlY: g }) {
  const p = n * 0.125 + s * 0.375 + d * 0.375 + o * 0.125, h = i * 0.125 + f * 0.375 + g * 0.375 + u * 0.125, b = Math.abs(p - n), y = Math.abs(h - i);
  return [p, h, b, y];
}
function fr(n, i) {
  return n >= 0 ? 0.5 * n : i * 25 * Math.sqrt(-n);
}
function C0({ pos: n, x1: i, y1: o, x2: u, y2: s, c: f }) {
  switch (n) {
    case mt.Left:
      return [i - fr(i - u, f), o];
    case mt.Right:
      return [i + fr(u - i, f), o];
    case mt.Top:
      return [i, o - fr(o - s, f)];
    case mt.Bottom:
      return [i, o + fr(s - o, f)];
  }
}
function od({ sourceX: n, sourceY: i, sourcePosition: o = mt.Bottom, targetX: u, targetY: s, targetPosition: f = mt.Top, curvature: d = 0.25 }) {
  const [g, p] = C0({
    pos: o,
    x1: n,
    y1: i,
    x2: u,
    y2: s,
    c: d
  }), [h, b] = C0({
    pos: f,
    x1: u,
    y1: s,
    x2: n,
    y2: i,
    c: d
  }), [y, v, S, w] = vy({
    sourceX: n,
    sourceY: i,
    targetX: u,
    targetY: s,
    sourceControlX: g,
    sourceControlY: p,
    targetControlX: h,
    targetControlY: b
  });
  return [
    `M${n},${i} C${g},${p} ${h},${b} ${u},${s}`,
    y,
    v,
    S,
    w
  ];
}
function by({ sourceX: n, sourceY: i, targetX: o, targetY: u }) {
  const s = Math.abs(o - n) / 2, f = o < n ? o + s : o - s, d = Math.abs(u - i) / 2, g = u < i ? u + d : u - d;
  return [f, g, s, d];
}
function Gw({ sourceNode: n, targetNode: i, selected: o = !1, zIndex: u = 0, elevateOnSelect: s = !1, zIndexMode: f = "basic" }) {
  if (f === "manual")
    return u;
  const d = s && o ? u + 1e3 : u, g = Math.max(n.parentId || s && n.selected ? n.internals.z : 0, i.parentId || s && i.selected ? i.internals.z : 0);
  return d + g;
}
function Qw({ sourceNode: n, targetNode: i, width: o, height: u, transform: s }) {
  const f = qr(Cr(n), Cr(i));
  f.x === f.x2 && (f.x2 += 1), f.y === f.y2 && (f.y2 += 1);
  const d = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: o / s[2],
    height: u / s[2]
  };
  return Tr(d, jr(f)) > 0;
}
const Kw = ({ source: n, sourceHandle: i, target: o, targetHandle: u }) => `xy-edge__${n}${i || ""}-${o}${u || ""}`, Jw = (n, i) => i.some((o) => o.source === n.source && o.target === n.target && (o.sourceHandle === n.sourceHandle || !o.sourceHandle && !n.sourceHandle) && (o.targetHandle === n.targetHandle || !o.targetHandle && !n.targetHandle)), Fw = (n, i, o = {}) => {
  if (!n.source || !n.target)
    return o.onError?.("006", mn.error006()), i;
  const u = o.getEdgeId || Kw;
  let s;
  return uy(n) ? s = { ...n } : s = {
    ...n,
    id: u(n)
  }, Jw(s, i) ? i : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, i.concat(s));
};
function xy({ sourceX: n, sourceY: i, targetX: o, targetY: u }) {
  const [s, f, d, g] = by({
    sourceX: n,
    sourceY: i,
    targetX: o,
    targetY: u
  });
  return [`M ${n},${i}L ${o},${u}`, s, f, d, g];
}
const T0 = {
  [mt.Left]: { x: -1, y: 0 },
  [mt.Right]: { x: 1, y: 0 },
  [mt.Top]: { x: 0, y: -1 },
  [mt.Bottom]: { x: 0, y: 1 }
}, Ww = ({ source: n, sourcePosition: i = mt.Bottom, target: o }) => i === mt.Left || i === mt.Right ? n.x < o.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : n.y < o.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, D0 = (n, i) => Math.sqrt(Math.pow(i.x - n.x, 2) + Math.pow(i.y - n.y, 2));
function Iw({ source: n, sourcePosition: i = mt.Bottom, target: o, targetPosition: u = mt.Top, center: s, offset: f, stepPosition: d }) {
  const g = T0[i], p = T0[u], h = { x: n.x + g.x * f, y: n.y + g.y * f }, b = { x: o.x + p.x * f, y: o.y + p.y * f }, y = Ww({
    source: h,
    sourcePosition: i,
    target: b
  }), v = y.x !== 0 ? "x" : "y", S = y[v];
  let w = [], A, N;
  const M = { x: 0, y: 0 }, R = { x: 0, y: 0 }, [, , _, C] = by({
    sourceX: n.x,
    sourceY: n.y,
    targetX: o.x,
    targetY: o.y
  });
  if (g[v] * p[v] === -1) {
    v === "x" ? (A = s.x ?? h.x + (b.x - h.x) * d, N = s.y ?? (h.y + b.y) / 2) : (A = s.x ?? (h.x + b.x) / 2, N = s.y ?? h.y + (b.y - h.y) * d);
    const Q = [
      { x: A, y: h.y },
      { x: A, y: b.y }
    ], J = [
      { x: h.x, y: N },
      { x: b.x, y: N }
    ];
    g[v] === S ? w = v === "x" ? Q : J : w = v === "x" ? J : Q;
  } else {
    const Q = [{ x: h.x, y: b.y }], J = [{ x: b.x, y: h.y }];
    if (v === "x" ? w = g.x === S ? J : Q : w = g.y === S ? Q : J, i === u) {
      const T = Math.abs(n[v] - o[v]);
      if (T <= f) {
        const V = Math.min(f - 1, f - T);
        g[v] === S ? M[v] = (h[v] > n[v] ? -1 : 1) * V : R[v] = (b[v] > o[v] ? -1 : 1) * V;
      }
    }
    if (i !== u) {
      const T = v === "x" ? "y" : "x", V = g[v] === p[T], E = h[T] > b[T], O = h[T] < b[T];
      (g[v] === 1 && (!V && E || V && O) || g[v] !== 1 && (!V && O || V && E)) && (w = v === "x" ? Q : J);
    }
    const ut = { x: h.x + M.x, y: h.y + M.y }, Z = { x: b.x + R.x, y: b.y + R.y }, I = Math.max(Math.abs(ut.x - w[0].x), Math.abs(Z.x - w[0].x)), ot = Math.max(Math.abs(ut.y - w[0].y), Math.abs(Z.y - w[0].y));
    I >= ot ? (A = (ut.x + Z.x) / 2, N = w[0].y) : (A = w[0].x, N = (ut.y + Z.y) / 2);
  }
  const Y = { x: h.x + M.x, y: h.y + M.y }, q = { x: b.x + R.x, y: b.y + R.y };
  return [[
    n,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...Y.x !== w[0].x || Y.y !== w[0].y ? [Y] : [],
    ...w,
    ...q.x !== w[w.length - 1].x || q.y !== w[w.length - 1].y ? [q] : [],
    o
  ], A, N, _, C];
}
function Pw(n, i, o, u) {
  const s = Math.min(D0(n, i) / 2, D0(i, o) / 2, u), { x: f, y: d } = i;
  if (n.x === f && f === o.x || n.y === d && d === o.y)
    return `L${f} ${d}`;
  if (n.y === d) {
    const h = n.x < o.x ? -1 : 1, b = n.y < o.y ? 1 : -1;
    return `L ${f + s * h},${d}Q ${f},${d} ${f},${d + s * b}`;
  }
  const g = n.x < o.x ? 1 : -1, p = n.y < o.y ? -1 : 1;
  return `L ${f},${d + s * p}Q ${f},${d} ${f + s * g},${d}`;
}
function Yf({ sourceX: n, sourceY: i, sourcePosition: o = mt.Bottom, targetX: u, targetY: s, targetPosition: f = mt.Top, borderRadius: d = 5, centerX: g, centerY: p, offset: h = 20, stepPosition: b = 0.5 }) {
  const [y, v, S, w, A] = Iw({
    source: { x: n, y: i },
    sourcePosition: o,
    target: { x: u, y: s },
    targetPosition: f,
    center: { x: g, y: p },
    offset: h,
    stepPosition: b
  });
  let N = `M${y[0].x} ${y[0].y}`;
  for (let M = 1; M < y.length - 1; M++)
    N += Pw(y[M - 1], y[M], y[M + 1], d);
  return N += `L${y[y.length - 1].x} ${y[y.length - 1].y}`, [N, v, S, w, A];
}
function O0(n) {
  return n && !!(n.internals.handleBounds || n.handles?.length) && !!(n.measured.width || n.width || n.initialWidth);
}
function t2(n) {
  const { sourceNode: i, targetNode: o } = n;
  if (!O0(i) || !O0(o))
    return null;
  const u = i.internals.handleBounds || R0(i.handles), s = o.internals.handleBounds || R0(o.handles), f = H0(u?.source ?? [], n.sourceHandle), d = H0(
    // when connection type is loose we can define all handles as sources and connect source -> source
    n.connectionMode === ii.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    n.targetHandle
  );
  if (!f || !d)
    return n.onError?.("008", mn.error008(f ? "target" : "source", {
      id: n.id,
      sourceHandle: n.sourceHandle,
      targetHandle: n.targetHandle
    })), null;
  const g = f?.position || mt.Bottom, p = d?.position || mt.Top, h = ua(i, f, g), b = ua(o, d, p);
  return {
    sourceX: h.x,
    sourceY: h.y,
    targetX: b.x,
    targetY: b.y,
    sourcePosition: g,
    targetPosition: p
  };
}
function R0(n) {
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
function ua(n, i, o = mt.Left, u = !1) {
  const s = (i?.x ?? 0) + n.internals.positionAbsolute.x, f = (i?.y ?? 0) + n.internals.positionAbsolute.y, { width: d, height: g } = i ?? Wn(n);
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
function H0(n, i) {
  return n && (i ? n.find((o) => o.id === i) : n[0]) || null;
}
function Lf(n, i) {
  return n ? typeof n == "string" ? n : `${i ? `${i}__` : ""}${Object.keys(n).sort().map((u) => `${u}=${n[u]}`).join("&")}` : "";
}
function e2(n, { id: i, defaultColor: o, defaultMarkerStart: u, defaultMarkerEnd: s }) {
  const f = /* @__PURE__ */ new Set();
  return n.reduce((d, g) => ([g.markerStart || u, g.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const h = Lf(p, i);
      f.has(h) || (d.push({ id: h, color: p.color || o, ...p }), f.add(h));
    }
  }), d), []).sort((d, g) => d.id.localeCompare(g.id));
}
const _y = 1e3, n2 = 10, ud = {
  nodeOrigin: [0, 0],
  nodeExtent: Eo,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, l2 = {
  ...ud,
  checkEquality: !0
};
function rd(n, i) {
  const o = { ...n };
  for (const u in i)
    i[u] !== void 0 && (o[u] = i[u]);
  return o;
}
function a2(n, i, o) {
  const u = rd(ud, o);
  for (const s of n.values())
    if (s.parentId)
      sd(s, n, i, u);
    else {
      const f = Ro(s, u.nodeOrigin), d = oa(s.extent) ? s.extent : u.nodeExtent, g = ia(f, d, Wn(s));
      s.internals.positionAbsolute = g;
    }
}
function i2(n, i) {
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
function cd(n) {
  return n === "manual";
}
function Vf(n, i, o, u = {}) {
  const s = rd(l2, u), f = { i: 0 }, d = new Map(i), g = s?.elevateNodesOnSelect && !cd(s.zIndexMode) ? _y : 0;
  let p = n.length > 0, h = !1;
  i.clear(), o.clear();
  for (const b of n) {
    let y = d.get(b.id);
    if (s.checkEquality && b === y?.internals.userNode)
      i.set(b.id, y);
    else {
      const v = Ro(b, s.nodeOrigin), S = oa(b.extent) ? b.extent : s.nodeExtent, w = ia(v, S, Wn(b));
      y = {
        ...s.defaults,
        ...b,
        measured: {
          width: b.measured?.width,
          height: b.measured?.height
        },
        internals: {
          positionAbsolute: w,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: i2(b, y),
          z: Sy(b, g, s.zIndexMode),
          userNode: b
        }
      }, i.set(b.id, y);
    }
    (y.measured === void 0 || y.measured.width === void 0 || y.measured.height === void 0) && !y.hidden && (p = !1), b.parentId && sd(y, i, o, u, f), h ||= b.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: h };
}
function o2(n, i) {
  if (!n.parentId)
    return;
  const o = i.get(n.parentId);
  o ? o.set(n.id, n) : i.set(n.parentId, /* @__PURE__ */ new Map([[n.id, n]]));
}
function sd(n, i, o, u, s) {
  const { elevateNodesOnSelect: f, nodeOrigin: d, nodeExtent: g, zIndexMode: p } = rd(ud, u), h = n.parentId, b = i.get(h);
  if (!b) {
    console.warn(`Parent node ${h} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  o2(n, o), s && !b.parentId && b.internals.rootParentIndex === void 0 && p === "auto" && (b.internals.rootParentIndex = ++s.i, b.internals.z = b.internals.z + s.i * n2), s && b.internals.rootParentIndex !== void 0 && (s.i = b.internals.rootParentIndex);
  const y = f && !cd(p) ? _y : 0, { x: v, y: S, z: w } = u2(n, b, d, g, y, p), { positionAbsolute: A } = n.internals, N = v !== A.x || S !== A.y;
  (N || w !== n.internals.z) && i.set(n.id, {
    ...n,
    internals: {
      ...n.internals,
      positionAbsolute: N ? { x: v, y: S } : A,
      z: w
    }
  });
}
function Sy(n, i, o) {
  const u = hn(n.zIndex) ? n.zIndex : 0;
  return cd(o) ? u : u + (n.selected ? i : 0);
}
function u2(n, i, o, u, s, f) {
  const { x: d, y: g } = i.internals.positionAbsolute, p = Wn(n), h = Ro(n, o), b = oa(n.extent) ? ia(h, n.extent, p) : h;
  let y = ia({ x: d + b.x, y: g + b.y }, u, p);
  n.extent === "parent" && (y = cy(y, p, i));
  const v = Sy(n, s, f), S = i.internals.z ?? 0;
  return {
    x: y.x,
    y: y.y,
    z: S >= v ? S + 1 : v
  };
}
function fd(n, i, o, u = [0, 0]) {
  const s = [], f = /* @__PURE__ */ new Map();
  for (const d of n) {
    const g = i.get(d.parentId);
    if (!g)
      continue;
    const p = f.get(d.parentId)?.expandedRect ?? Mo(g), h = sy(p, d.rect);
    f.set(d.parentId, { expandedRect: h, parent: g });
  }
  return f.size > 0 && f.forEach(({ expandedRect: d, parent: g }, p) => {
    const h = g.internals.positionAbsolute, b = Wn(g), y = g.origin ?? u, v = d.x < h.x ? Math.round(Math.abs(h.x - d.x)) : 0, S = d.y < h.y ? Math.round(Math.abs(h.y - d.y)) : 0, w = Math.max(b.width, Math.round(d.width)), A = Math.max(b.height, Math.round(d.height)), N = (w - b.width) * y[0], M = (A - b.height) * y[1];
    (v > 0 || S > 0 || N || M) && (s.push({
      id: p,
      type: "position",
      position: {
        x: g.position.x - v + N,
        y: g.position.y - S + M
      }
    }), o.get(p)?.forEach((R) => {
      n.some((_) => _.id === R.id) || s.push({
        id: R.id,
        type: "position",
        position: {
          x: R.position.x + v,
          y: R.position.y + S
        }
      });
    })), (b.width < d.width || b.height < d.height || v || S) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: w + (v ? y[0] * v - N : 0),
        height: A + (S ? y[1] * S - M : 0)
      }
    });
  }), s;
}
function r2(n, i, o, u, s, f, d) {
  const g = u?.querySelector(".xyflow__viewport");
  let p = !1;
  if (!g)
    return { changes: [], updatedInternals: p };
  const h = [], b = window.getComputedStyle(g), { m22: y } = new window.DOMMatrixReadOnly(b.transform), v = [];
  for (const S of n.values()) {
    const w = i.get(S.id);
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
    const A = id(S.nodeElement), N = w.measured.width !== A.width || w.measured.height !== A.height;
    if (!!(A.width && A.height && (N || !w.internals.handleBounds || S.force))) {
      const R = S.nodeElement.getBoundingClientRect(), _ = oa(w.extent) ? w.extent : f;
      let { positionAbsolute: C } = w.internals;
      w.parentId && w.extent === "parent" ? C = cy(C, A, i.get(w.parentId)) : _ && (C = ia(C, _, A));
      const Y = {
        ...w,
        measured: A,
        internals: {
          ...w.internals,
          positionAbsolute: C,
          handleBounds: {
            source: A0("source", S.nodeElement, R, y, w.id),
            target: A0("target", S.nodeElement, R, y, w.id)
          }
        }
      };
      i.set(w.id, Y), w.parentId && sd(Y, i, o, { nodeOrigin: s, zIndexMode: d }), p = !0, N && (h.push({
        id: w.id,
        type: "dimensions",
        dimensions: A
      }), w.expandParent && w.parentId && v.push({
        id: w.id,
        parentId: w.parentId,
        rect: Mo(Y, s)
      }));
    }
  }
  if (v.length > 0) {
    const S = fd(v, i, o, s);
    h.push(...S);
  }
  return { changes: h, updatedInternals: p };
}
async function c2({ delta: n, panZoom: i, transform: o, translateExtent: u, width: s, height: f }) {
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
function k0(n, i, o, u, s, f) {
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
function wy(n, i, o) {
  n.clear(), i.clear();
  for (const u of o) {
    const { source: s, target: f, sourceHandle: d = null, targetHandle: g = null } = u, p = { edgeId: u.id, source: s, target: f, sourceHandle: d, targetHandle: g }, h = `${s}-${d}--${f}-${g}`, b = `${f}-${g}--${s}-${d}`;
    k0("source", p, b, n, s, d), k0("target", p, h, n, f, g), i.set(u.id, u);
  }
}
function Ey(n, i) {
  if (!n.parentId)
    return !1;
  const o = i.get(n.parentId);
  return o ? o.selected ? !0 : Ey(o, i) : !1;
}
function B0(n, i, o) {
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
function s2(n, i, o, u) {
  const s = /* @__PURE__ */ new Map();
  for (const [f, d] of n)
    if ((d.selected || d.id === u) && (!d.parentId || !Ey(d, n)) && (d.draggable || i && typeof d.draggable > "u")) {
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
function _f({ nodeId: n, dragItems: i, nodeLookup: o, dragging: u = !0 }) {
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
function f2({ dragItems: n, snapGrid: i, x: o, y: u }) {
  const s = n.values().next().value;
  if (!s)
    return null;
  const f = {
    x: o - s.distance.x,
    y: u - s.distance.y
  }, d = ko(f, i);
  return {
    x: d.x - f.x,
    y: d.y - f.y
  };
}
function d2({ onNodeMouseDown: n, getStoreItems: i, onDragStart: o, onDrag: u, onDragStop: s }) {
  let f = { x: null, y: null }, d = 0, g = /* @__PURE__ */ new Map(), p = !1, h = { x: 0, y: 0 }, b = null, y = !1, v = null, S = !1, w = !1, A = null;
  function N({ noDragClassName: R, handleSelector: _, domNode: C, isSelectable: Y, nodeId: q, nodeClickDistance: B = 0 }) {
    v = Xe(C);
    function Q({ x: I, y: ot }) {
      const { nodeLookup: T, nodeExtent: V, snapGrid: E, snapToGrid: O, nodeOrigin: L, onNodeDrag: X, onSelectionDrag: nt, onError: z, updateNodePositions: H } = i();
      f = { x: I, y: ot };
      let P = !1;
      const lt = g.size > 1, rt = lt && V ? jf(Ho(g)) : null, ft = lt && O ? f2({
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
        } : ko(st, E));
        let St = null;
        if (lt && V && !tt.extent && rt) {
          const { positionAbsolute: yt } = tt.internals, Et = yt.x - rt.x + V[0][0], Rt = yt.x + tt.measured.width - rt.x2 + V[1][0], $t = yt.y - rt.y + V[0][1], pe = yt.y + tt.measured.height - rt.y2 + V[1][1];
          St = [
            [Et, $t],
            [Rt, pe]
          ];
        }
        const { position: _t, positionAbsolute: gt } = ry({
          nodeId: ct,
          nextPosition: st,
          nodeLookup: T,
          nodeExtent: St || V,
          nodeOrigin: L,
          onError: z
        });
        P = P || tt.position.x !== _t.x || tt.position.y !== _t.y, tt.position = _t, tt.internals.positionAbsolute = gt;
      }
      if (w = w || P, !!P && (H(g, !0), A && (u || X || !q && nt))) {
        const [ct, tt] = _f({
          nodeId: q,
          dragItems: g,
          nodeLookup: T
        });
        u?.(A, g, ct, tt), X?.(A, ct, tt), q || nt?.(A, tt);
      }
    }
    async function J() {
      if (!b)
        return;
      const { transform: I, panBy: ot, autoPanSpeed: T, autoPanOnNodeDrag: V } = i();
      if (!V) {
        p = !1, cancelAnimationFrame(d);
        return;
      }
      const [E, O] = ld(h, b, T);
      (E !== 0 || O !== 0) && (f.x = (f.x ?? 0) - E / I[2], f.y = (f.y ?? 0) - O / I[2], await ot({ x: E, y: O }) && Q(f)), d = requestAnimationFrame(J);
    }
    function ut(I) {
      const { nodeLookup: ot, multiSelectionActive: T, nodesDraggable: V, transform: E, snapGrid: O, snapToGrid: L, selectNodesOnDrag: X, onNodeDragStart: nt, onSelectionDragStart: z, unselectNodesAndEdges: H } = i();
      y = !0, (!X || !Y) && !T && q && (ot.get(q)?.selected || H()), Y && X && q && n?.(q);
      const P = yo(I.sourceEvent, { transform: E, snapGrid: O, snapToGrid: L, containerBounds: b });
      if (f = P, g = s2(ot, V, P, q), g.size > 0 && (o || nt || !q && z)) {
        const [lt, rt] = _f({
          nodeId: q,
          dragItems: g,
          nodeLookup: ot
        });
        o?.(I.sourceEvent, g, lt, rt), nt?.(I.sourceEvent, lt, rt), q || z?.(I.sourceEvent, rt);
      }
    }
    const Z = Lp().clickDistance(B).on("start", (I) => {
      const { domNode: ot, nodeDragThreshold: T, transform: V, snapGrid: E, snapToGrid: O } = i();
      b = ot?.getBoundingClientRect() || null, S = !1, w = !1, A = I.sourceEvent, T === 0 && ut(I), f = yo(I.sourceEvent, { transform: V, snapGrid: E, snapToGrid: O, containerBounds: b }), h = gn(I.sourceEvent, b);
    }).on("drag", (I) => {
      const { autoPanOnNodeDrag: ot, transform: T, snapGrid: V, snapToGrid: E, nodeDragThreshold: O, nodeLookup: L } = i(), X = yo(I.sourceEvent, { transform: T, snapGrid: V, snapToGrid: E, containerBounds: b });
      if (A = I.sourceEvent, (I.sourceEvent.type === "touchmove" && I.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      q && !L.has(q)) && (S = !0), !S) {
        if (!p && ot && y && (p = !0, J()), !y) {
          const nt = gn(I.sourceEvent, b), z = nt.x - h.x, H = nt.y - h.y;
          Math.sqrt(z * z + H * H) > O && ut(I);
        }
        (f.x !== X.xSnapped || f.y !== X.ySnapped) && g && y && (h = gn(I.sourceEvent, b), Q(X));
      }
    }).on("end", (I) => {
      if (!y || S) {
        S && g.size > 0 && i().updateNodePositions(g, !1);
        return;
      }
      if (p = !1, y = !1, cancelAnimationFrame(d), g.size > 0) {
        const { nodeLookup: ot, updateNodePositions: T, onNodeDragStop: V, onSelectionDragStop: E } = i();
        if (w && (T(g, !1), w = !1), s || V || !q && E) {
          const [O, L] = _f({
            nodeId: q,
            dragItems: g,
            nodeLookup: ot,
            dragging: !1
          });
          s?.(I.sourceEvent, g, O, L), V?.(I.sourceEvent, O, L), q || E?.(I.sourceEvent, L);
        }
      }
    }).filter((I) => {
      const ot = I.target;
      return !I.button && (!R || !B0(ot, `.${R}`, C)) && (!_ || B0(ot, _, C));
    });
    v.call(Z);
  }
  function M() {
    v?.on(".drag", null);
  }
  return {
    update: N,
    destroy: M
  };
}
function h2(n, i, o) {
  const u = [], s = {
    x: n.x - o,
    y: n.y - o,
    width: o * 2,
    height: o * 2
  };
  for (const f of i.values())
    Tr(s, Mo(f)) > 0 && u.push(f);
  return u;
}
const g2 = 250;
function m2(n, i, o, u) {
  let s = [], f = 1 / 0;
  const d = h2(n, o, i + g2);
  for (const g of d) {
    const p = [...g.internals.handleBounds?.source ?? [], ...g.internals.handleBounds?.target ?? []];
    for (const h of p) {
      if (u.nodeId === h.nodeId && u.type === h.type && u.id === h.id)
        continue;
      const { x: b, y } = ua(g, h, h.position, !0), v = Math.sqrt(Math.pow(b - n.x, 2) + Math.pow(y - n.y, 2));
      v > i || (v < f ? (s = [{ ...h, x: b, y }], f = v) : v === f && s.push({ ...h, x: b, y }));
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
function zy(n, i, o, u, s, f = !1) {
  const d = u.get(n);
  if (!d)
    return null;
  const g = s === "strict" ? d.internals.handleBounds?.[i] : [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []], p = (o ? g?.find((h) => h.id === o) : g?.[0]) ?? null;
  return p && f ? { ...p, ...ua(d, p, p.position, !0) } : p;
}
function My(n, i) {
  return n || (i?.classList.contains("target") ? "target" : i?.classList.contains("source") ? "source" : null);
}
function p2(n, i) {
  let o = null;
  return i ? o = !0 : n && !i && (o = !1), o;
}
const Ny = () => !0;
function y2(n, { connectionMode: i, connectionRadius: o, handleId: u, nodeId: s, edgeUpdaterType: f, isTarget: d, domNode: g, nodeLookup: p, lib: h, autoPanOnConnect: b, flowId: y, panBy: v, cancelConnection: S, onConnectStart: w, onConnect: A, onConnectEnd: N, isValidConnection: M = Ny, onReconnectEnd: R, updateConnection: _, getTransform: C, getFromHandle: Y, autoPanSpeed: q, dragThreshold: B = 1, handleDomNode: Q }) {
  const J = my(n.target);
  let ut = 0, Z;
  const { x: I, y: ot } = gn(n), T = My(f, Q), V = g?.getBoundingClientRect();
  let E = !1;
  if (!V || !T)
    return;
  const O = zy(s, T, u, p, i);
  if (!O)
    return;
  let L = gn(n, V), X = !1, nt = null, z = !1, H = null;
  function P() {
    if (!b || !V)
      return;
    const [_t, gt] = ld(L, V, q);
    v({ x: _t, y: gt }), ut = requestAnimationFrame(P);
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
    from: ua(rt, lt, mt.Left, !0),
    fromHandle: lt,
    fromPosition: lt.position,
    fromNode: rt,
    to: L,
    toHandle: null,
    toPosition: E0[lt.position],
    toNode: null,
    pointer: L
  };
  function tt() {
    E = !0, _(ct), w?.(n, { nodeId: s, handleId: u, handleType: T });
  }
  B === 0 && tt();
  function st(_t) {
    if (!E) {
      const { x: pe, y: Qe } = gn(_t), we = pe - I, Ee = Qe - ot;
      if (!(we * we + Ee * Ee > B * B))
        return;
      tt();
    }
    if (!Y() || !lt) {
      St(_t);
      return;
    }
    const gt = C();
    L = gn(_t, V), Z = m2(Bo(L, gt, !1, [1, 1]), o, p, lt), X || (P(), X = !0);
    const yt = Ay(_t, {
      handle: Z,
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
    H = yt.handleDomNode, nt = yt.connection, z = p2(!!Z, yt.isValid);
    const Et = p.get(s), Rt = Et ? ua(Et, lt, mt.Left, !0) : ct.from, $t = {
      ...ct,
      from: Rt,
      isValid: z,
      to: yt.toHandle && z ? ui({ x: yt.toHandle.x, y: yt.toHandle.y }, gt) : L,
      toHandle: yt.toHandle,
      toPosition: z && yt.toHandle ? yt.toHandle.position : E0[lt.position],
      toNode: yt.toHandle ? p.get(yt.toHandle.nodeId) : null,
      pointer: L
    };
    _($t), ct = $t;
  }
  function St(_t) {
    if (!("touches" in _t && _t.touches.length > 0)) {
      if (E) {
        (Z || H) && nt && z && A?.(nt);
        const { inProgress: gt, ...yt } = ct, Et = {
          ...yt,
          toPosition: ct.toHandle ? ct.toPosition : null
        };
        N?.(_t, Et), f && R?.(_t, Et);
      }
      S(), cancelAnimationFrame(ut), X = !1, z = !1, nt = null, H = null, J.removeEventListener("mousemove", st), J.removeEventListener("mouseup", St), J.removeEventListener("touchmove", st), J.removeEventListener("touchend", St);
    }
  }
  J.addEventListener("mousemove", st), J.addEventListener("mouseup", St), J.addEventListener("touchmove", st), J.addEventListener("touchend", St);
}
function Ay(n, { handle: i, connectionMode: o, fromNodeId: u, fromHandleId: s, fromType: f, doc: d, lib: g, flowId: p, isValidConnection: h = Ny, nodeLookup: b }) {
  const y = f === "target", v = i ? d.querySelector(`.${g}-flow__handle[data-id="${p}-${i?.nodeId}-${i?.id}-${i?.type}"]`) : null, { x: S, y: w } = gn(n), A = d.elementFromPoint(S, w), N = A?.classList.contains(`${g}-flow__handle`) ? A : v, M = {
    handleDomNode: N,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (N) {
    const R = My(void 0, N), _ = N.getAttribute("data-nodeid"), C = N.getAttribute("data-handleid"), Y = N.classList.contains("connectable"), q = N.classList.contains("connectableend");
    if (!_ || !R)
      return M;
    const B = {
      source: y ? _ : u,
      sourceHandle: y ? C : s,
      target: y ? u : _,
      targetHandle: y ? s : C
    };
    M.connection = B;
    const J = Y && q && (o === ii.Strict ? y && R === "source" || !y && R === "target" : _ !== u || C !== s);
    M.isValid = J && h(B), M.toHandle = zy(_, R, C, b, o, !0);
  }
  return M;
}
const Xf = {
  onPointerDown: y2,
  isValid: Ay
};
function v2({ domNode: n, panZoom: i, getTransform: o, getViewScale: u }) {
  const s = Xe(n);
  function f({ translateExtent: g, width: p, height: h, zoomStep: b = 1, pannable: y = !0, zoomable: v = !0, inversePan: S = !1 }) {
    const w = (_) => {
      if (_.sourceEvent.type !== "wheel" || !i)
        return;
      const C = o(), Y = _.sourceEvent.ctrlKey && No() ? 10 : 1, q = -_.sourceEvent.deltaY * (_.sourceEvent.deltaMode === 1 ? 0.05 : _.sourceEvent.deltaMode ? 1 : 2e-3) * b, B = C[2] * Math.pow(2, q * Y);
      i.scaleTo(B);
    };
    let A = [0, 0];
    const N = (_) => {
      (_.sourceEvent.type === "mousedown" || _.sourceEvent.type === "touchstart") && (A = [
        _.sourceEvent.clientX ?? _.sourceEvent.touches[0].clientX,
        _.sourceEvent.clientY ?? _.sourceEvent.touches[0].clientY
      ]);
    }, M = (_) => {
      const C = o();
      if (_.sourceEvent.type !== "mousemove" && _.sourceEvent.type !== "touchmove" || !i)
        return;
      const Y = [
        _.sourceEvent.clientX ?? _.sourceEvent.touches[0].clientX,
        _.sourceEvent.clientY ?? _.sourceEvent.touches[0].clientY
      ], q = [Y[0] - A[0], Y[1] - A[1]];
      A = Y;
      const B = u() * Math.max(C[2], Math.log(C[2])) * (S ? -1 : 1), Q = {
        x: C[0] - q[0] * B,
        y: C[1] - q[1] * B
      }, J = [
        [0, 0],
        [p, h]
      ];
      i.setViewportConstrained({
        x: Q.x,
        y: Q.y,
        zoom: C[2]
      }, J, g);
    }, R = ny().on("start", N).on("zoom", y ? M : null).on("zoom.wheel", v ? w : null);
    s.call(R, {});
  }
  function d() {
    s.on("zoom", null);
  }
  return {
    update: f,
    destroy: d,
    pointer: fn
  };
}
const Yr = (n) => ({
  x: n.x,
  y: n.y,
  zoom: n.k
}), Sf = ({ x: n, y: i, zoom: o }) => Ur.translate(n, i).scale(o), Pa = (n, i) => n.target.closest(`.${i}`), Cy = (n, i) => i === 2 && Array.isArray(n) && n.includes(2), b2 = (n) => ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2, wf = (n, i = 0, o = b2, u = () => {
}) => {
  const s = typeof i == "number" && i > 0;
  return s || u(), s ? n.transition().duration(i).ease(o).on("end", u) : n;
}, Ty = (n) => {
  const i = n.ctrlKey && No() ? 10 : 1;
  return -n.deltaY * (n.deltaMode === 1 ? 0.05 : n.deltaMode ? 1 : 2e-3) * i;
};
function x2({ zoomPanValues: n, noWheelClassName: i, d3Selection: o, d3Zoom: u, panOnScrollMode: s, panOnScrollSpeed: f, zoomOnPinch: d, onPanZoomStart: g, onPanZoom: p, onPanZoomEnd: h }) {
  return (b) => {
    if (Pa(b, i))
      return b.ctrlKey && b.preventDefault(), !1;
    b.preventDefault(), b.stopImmediatePropagation();
    const y = o.property("__zoom").k || 1;
    if (b.ctrlKey && d) {
      const N = fn(b), M = Ty(b), R = y * Math.pow(2, M);
      u.scaleTo(o, R, N, b);
      return;
    }
    const v = b.deltaMode === 1 ? 20 : 1;
    let S = s === na.Vertical ? 0 : b.deltaX * v, w = s === na.Horizontal ? 0 : b.deltaY * v;
    !No() && b.shiftKey && s !== na.Vertical && (S = b.deltaY * v, w = 0), u.translateBy(
      o,
      -(S / y) * f,
      -(w / y) * f,
      // @ts-ignore
      { internal: !0 }
    );
    const A = Yr(o.property("__zoom"));
    clearTimeout(n.panScrollTimeout), n.isPanScrolling ? (p?.(b, A), n.panScrollTimeout = setTimeout(() => {
      h?.(b, A), n.isPanScrolling = !1;
    }, 150)) : (n.isPanScrolling = !0, g?.(b, A));
  };
}
function _2({ noWheelClassName: n, preventScrolling: i, d3ZoomHandler: o }) {
  return function(u, s) {
    const f = u.type === "wheel", d = !i && f && !u.ctrlKey, g = Pa(u, n);
    if (u.ctrlKey && f && g && u.preventDefault(), d || g)
      return null;
    u.preventDefault(), o.call(this, u, s);
  };
}
function S2({ zoomPanValues: n, onDraggingChange: i, onPanZoomStart: o }) {
  return (u) => {
    if (u.sourceEvent?.internal)
      return;
    const s = Yr(u.transform);
    n.mouseButton = u.sourceEvent?.button || 0, n.isZoomingOrPanning = !0, n.prevViewport = s, u.sourceEvent?.type === "mousedown" && i(!0), o && o?.(u.sourceEvent, s);
  };
}
function w2({ zoomPanValues: n, panOnDrag: i, onPaneContextMenu: o, onTransformChange: u, onPanZoom: s }) {
  return (f) => {
    n.usedRightMouseButton = !!(o && Cy(i, n.mouseButton ?? 0)), f.sourceEvent?.sync || u([f.transform.x, f.transform.y, f.transform.k]), s && !f.sourceEvent?.internal && s?.(f.sourceEvent, Yr(f.transform));
  };
}
function E2({ zoomPanValues: n, panOnDrag: i, panOnScroll: o, onDraggingChange: u, onPanZoomEnd: s, onPaneContextMenu: f }) {
  return (d) => {
    if (!d.sourceEvent?.internal && (n.isZoomingOrPanning = !1, f && Cy(i, n.mouseButton ?? 0) && !n.usedRightMouseButton && d.sourceEvent && f(d.sourceEvent), n.usedRightMouseButton = !1, u(!1), s)) {
      const g = Yr(d.transform);
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
function z2({ zoomActivationKeyPressed: n, zoomOnScroll: i, zoomOnPinch: o, panOnDrag: u, panOnScroll: s, zoomOnDoubleClick: f, userSelectionActive: d, noWheelClassName: g, noPanClassName: p, lib: h, connectionInProgress: b }) {
  return (y) => {
    const v = n || i, S = o && y.ctrlKey, w = y.type === "wheel";
    if (y.button === 1 && y.type === "mousedown" && (Pa(y, `${h}-flow__node`) || Pa(y, `${h}-flow__edge`)))
      return !0;
    if (!u && !v && !s && !f && !o || d || b && !w || Pa(y, g) && w || Pa(y, p) && (!w || s && w && !n) || !o && y.ctrlKey && w)
      return !1;
    if (!o && y.type === "touchstart" && y.touches?.length > 1)
      return y.preventDefault(), !1;
    if (!v && !s && !S && w || !u && (y.type === "mousedown" || y.type === "touchstart") || Array.isArray(u) && !u.includes(y.button) && y.type === "mousedown")
      return !1;
    const A = Array.isArray(u) && u.includes(y.button) || !y.button || y.button <= 1;
    return (!y.ctrlKey || w) && A;
  };
}
function M2({ domNode: n, minZoom: i, maxZoom: o, translateExtent: u, viewport: s, onPanZoom: f, onPanZoomStart: d, onPanZoomEnd: g, onDraggingChange: p }) {
  const h = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, b = n.getBoundingClientRect(), y = ny().scaleExtent([i, o]).translateExtent(u), v = Xe(n).call(y);
  R({
    x: s.x,
    y: s.y,
    zoom: oi(s.zoom, i, o)
  }, [
    [0, 0],
    [b.width, b.height]
  ], u);
  const S = v.on("wheel.zoom"), w = v.on("dblclick.zoom");
  y.wheelDelta(Ty);
  async function A(Z, I) {
    return v ? new Promise((ot) => {
      y?.interpolate(I?.interpolate === "linear" ? po : yr).transform(wf(v, I?.duration, I?.ease, () => ot(!0)), Z);
    }) : !1;
  }
  function N({ noWheelClassName: Z, noPanClassName: I, onPaneContextMenu: ot, userSelectionActive: T, panOnScroll: V, panOnDrag: E, panOnScrollMode: O, panOnScrollSpeed: L, preventScrolling: X, zoomOnPinch: nt, zoomOnScroll: z, zoomOnDoubleClick: H, zoomActivationKeyPressed: P, lib: lt, onTransformChange: rt, connectionInProgress: ft, paneClickDistance: ct, selectionOnDrag: tt }) {
    T && !h.isZoomingOrPanning && M();
    const st = V && !P && !T;
    y.clickDistance(tt ? 1 / 0 : !hn(ct) || ct < 0 ? 0 : ct);
    const St = st ? x2({
      zoomPanValues: h,
      noWheelClassName: Z,
      d3Selection: v,
      d3Zoom: y,
      panOnScrollMode: O,
      panOnScrollSpeed: L,
      zoomOnPinch: nt,
      onPanZoomStart: d,
      onPanZoom: f,
      onPanZoomEnd: g
    }) : _2({
      noWheelClassName: Z,
      preventScrolling: X,
      d3ZoomHandler: S
    });
    v.on("wheel.zoom", St, { passive: !1 });
    const _t = S2({
      zoomPanValues: h,
      onDraggingChange: p,
      onPanZoomStart: d
    });
    y.on("start", _t);
    const gt = w2({
      zoomPanValues: h,
      panOnDrag: E,
      onPaneContextMenu: !!ot,
      onPanZoom: f,
      onTransformChange: rt
    });
    y.on("zoom", gt);
    const yt = E2({
      zoomPanValues: h,
      panOnDrag: E,
      panOnScroll: V,
      onPaneContextMenu: ot,
      onPanZoomEnd: g,
      onDraggingChange: p
    });
    y.on("end", yt);
    const Et = z2({
      zoomActivationKeyPressed: P,
      panOnDrag: E,
      zoomOnScroll: z,
      panOnScroll: V,
      zoomOnDoubleClick: H,
      zoomOnPinch: nt,
      userSelectionActive: T,
      noPanClassName: I,
      noWheelClassName: Z,
      lib: lt,
      connectionInProgress: ft
    });
    y.filter(Et), H ? v.on("dblclick.zoom", w) : v.on("dblclick.zoom", null);
  }
  function M() {
    y.on("zoom", null);
  }
  async function R(Z, I, ot) {
    const T = Sf(Z), V = y?.constrain()(T, I, ot);
    return V && await A(V), V;
  }
  async function _(Z, I) {
    const ot = Sf(Z);
    return await A(ot, I), ot;
  }
  function C(Z) {
    if (v) {
      const I = Sf(Z), ot = v.property("__zoom");
      (ot.k !== Z.zoom || ot.x !== Z.x || ot.y !== Z.y) && y?.transform(v, I, null, { sync: !0 });
    }
  }
  function Y() {
    const Z = v ? ey(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: Z.x, y: Z.y, zoom: Z.k };
  }
  async function q(Z, I) {
    return v ? new Promise((ot) => {
      y?.interpolate(I?.interpolate === "linear" ? po : yr).scaleTo(wf(v, I?.duration, I?.ease, () => ot(!0)), Z);
    }) : !1;
  }
  async function B(Z, I) {
    return v ? new Promise((ot) => {
      y?.interpolate(I?.interpolate === "linear" ? po : yr).scaleBy(wf(v, I?.duration, I?.ease, () => ot(!0)), Z);
    }) : !1;
  }
  function Q(Z) {
    y?.scaleExtent(Z);
  }
  function J(Z) {
    y?.translateExtent(Z);
  }
  function ut(Z) {
    const I = !hn(Z) || Z < 0 ? 0 : Z;
    y?.clickDistance(I);
  }
  return {
    update: N,
    destroy: M,
    setViewport: _,
    setViewportConstrained: R,
    getViewport: Y,
    scaleTo: q,
    scaleBy: B,
    setScaleExtent: Q,
    setTranslateExtent: J,
    syncViewport: C,
    setClickDistance: ut
  };
}
var ri;
(function(n) {
  n.Line = "line", n.Handle = "handle";
})(ri || (ri = {}));
function N2({ width: n, prevWidth: i, height: o, prevHeight: u, affectsX: s, affectsY: f }) {
  const d = n - i, g = o - u, p = [d > 0 ? 1 : d < 0 ? -1 : 0, g > 0 ? 1 : g < 0 ? -1 : 0];
  return d && s && (p[0] = p[0] * -1), g && f && (p[1] = p[1] * -1), p;
}
function U0(n) {
  const i = n.includes("right") || n.includes("left"), o = n.includes("bottom") || n.includes("top"), u = n.includes("left"), s = n.includes("top");
  return {
    isHorizontal: i,
    isVertical: o,
    affectsX: u,
    affectsY: s
  };
}
function Nl(n, i) {
  return Math.max(0, i - n);
}
function Al(n, i) {
  return Math.max(0, n - i);
}
function dr(n, i, o) {
  return Math.max(0, i - n, n - o);
}
function q0(n, i) {
  return n ? !i : i;
}
function A2(n, i, o, u, s, f, d, g) {
  let { affectsX: p, affectsY: h } = i;
  const { isHorizontal: b, isVertical: y } = i, v = b && y, { xSnapped: S, ySnapped: w } = o, { minWidth: A, maxWidth: N, minHeight: M, maxHeight: R } = u, { x: _, y: C, width: Y, height: q, aspectRatio: B } = n;
  let Q = Math.floor(b ? S - n.pointerX : 0), J = Math.floor(y ? w - n.pointerY : 0);
  const ut = Y + (p ? -Q : Q), Z = q + (h ? -J : J), I = -f[0] * Y, ot = -f[1] * q;
  let T = dr(ut, A, N), V = dr(Z, M, R);
  if (d) {
    let L = 0, X = 0;
    p && Q < 0 ? L = Nl(_ + Q + I, d[0][0]) : !p && Q > 0 && (L = Al(_ + ut + I, d[1][0])), h && J < 0 ? X = Nl(C + J + ot, d[0][1]) : !h && J > 0 && (X = Al(C + Z + ot, d[1][1])), T = Math.max(T, L), V = Math.max(V, X);
  }
  if (g) {
    let L = 0, X = 0;
    p && Q > 0 ? L = Al(_ + Q, g[0][0]) : !p && Q < 0 && (L = Nl(_ + ut, g[1][0])), h && J > 0 ? X = Al(C + J, g[0][1]) : !h && J < 0 && (X = Nl(C + Z, g[1][1])), T = Math.max(T, L), V = Math.max(V, X);
  }
  if (s) {
    if (b) {
      const L = dr(ut / B, M, R) * B;
      if (T = Math.max(T, L), d) {
        let X = 0;
        !p && !h || p && !h && v ? X = Al(C + ot + ut / B, d[1][1]) * B : X = Nl(C + ot + (p ? Q : -Q) / B, d[0][1]) * B, T = Math.max(T, X);
      }
      if (g) {
        let X = 0;
        !p && !h || p && !h && v ? X = Nl(C + ut / B, g[1][1]) * B : X = Al(C + (p ? Q : -Q) / B, g[0][1]) * B, T = Math.max(T, X);
      }
    }
    if (y) {
      const L = dr(Z * B, A, N) / B;
      if (V = Math.max(V, L), d) {
        let X = 0;
        !p && !h || h && !p && v ? X = Al(_ + Z * B + I, d[1][0]) / B : X = Nl(_ + (h ? J : -J) * B + I, d[0][0]) / B, V = Math.max(V, X);
      }
      if (g) {
        let X = 0;
        !p && !h || h && !p && v ? X = Nl(_ + Z * B, g[1][0]) / B : X = Al(_ + (h ? J : -J) * B, g[0][0]) / B, V = Math.max(V, X);
      }
    }
  }
  J = J + (J < 0 ? V : -V), Q = Q + (Q < 0 ? T : -T), s && (v ? ut > Z * B ? J = (q0(p, h) ? -Q : Q) / B : Q = (q0(p, h) ? -J : J) * B : b ? (J = Q / B, h = p) : (Q = J * B, p = h));
  const E = p ? _ + Q : _, O = h ? C + J : C;
  return {
    width: Y + (p ? -Q : Q),
    height: q + (h ? -J : J),
    x: f[0] * Q * (p ? -1 : 1) + E,
    y: f[1] * J * (h ? -1 : 1) + O
  };
}
const Dy = { width: 0, height: 0, x: 0, y: 0 }, C2 = {
  ...Dy,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function T2(n, i, o) {
  const u = i.position.x + n.position.x, s = i.position.y + n.position.y, f = n.measured.width ?? 0, d = n.measured.height ?? 0, g = o[0] * f, p = o[1] * d;
  return [
    [u - g, s - p],
    [u + f - g, s + d - p]
  ];
}
function D2({ domNode: n, nodeId: i, getStoreItems: o, onChange: u, onEnd: s }) {
  const f = Xe(n);
  let d = {
    controlDirection: U0("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function g({ controlPosition: h, boundaries: b, keepAspectRatio: y, resizeDirection: v, onResizeStart: S, onResize: w, onResizeEnd: A, shouldResize: N }) {
    let M = { ...Dy }, R = { ...C2 };
    d = {
      boundaries: b,
      resizeDirection: v,
      keepAspectRatio: y,
      controlDirection: U0(h)
    };
    let _, C = null, Y = [], q, B, Q, J = !1;
    const ut = Lp().on("start", (Z) => {
      const { nodeLookup: I, transform: ot, snapGrid: T, snapToGrid: V, nodeOrigin: E, paneDomNode: O } = o();
      if (_ = I.get(i), !_)
        return;
      C = O?.getBoundingClientRect() ?? null;
      const { xSnapped: L, ySnapped: X } = yo(Z.sourceEvent, {
        transform: ot,
        snapGrid: T,
        snapToGrid: V,
        containerBounds: C
      });
      M = {
        width: _.measured.width ?? 0,
        height: _.measured.height ?? 0,
        x: _.position.x ?? 0,
        y: _.position.y ?? 0
      }, R = {
        ...M,
        pointerX: L,
        pointerY: X,
        aspectRatio: M.width / M.height
      }, q = void 0, B = oa(_.extent) ? _.extent : void 0, _.parentId && (_.extent === "parent" || _.expandParent) && (q = I.get(_.parentId)), q && _.extent === "parent" && (B = [
        [0, 0],
        [q.measured.width, q.measured.height]
      ]), Y = [], Q = void 0;
      for (const [nt, z] of I)
        if (z.parentId === i && (Y.push({
          id: nt,
          position: { ...z.position },
          extent: z.extent
        }), z.extent === "parent" || z.expandParent)) {
          const H = T2(z, _, z.origin ?? E);
          Q ? Q = [
            [Math.min(H[0][0], Q[0][0]), Math.min(H[0][1], Q[0][1])],
            [Math.max(H[1][0], Q[1][0]), Math.max(H[1][1], Q[1][1])]
          ] : Q = H;
        }
      S?.(Z, { ...M });
    }).on("drag", (Z) => {
      const { transform: I, snapGrid: ot, snapToGrid: T, nodeOrigin: V } = o(), E = yo(Z.sourceEvent, {
        transform: I,
        snapGrid: ot,
        snapToGrid: T,
        containerBounds: C
      }), O = [];
      if (!_)
        return;
      const { x: L, y: X, width: nt, height: z } = M, H = {}, P = _.origin ?? V, { width: lt, height: rt, x: ft, y: ct } = A2(R, d.controlDirection, E, d.boundaries, d.keepAspectRatio, P, B, Q), tt = lt !== nt, st = rt !== z, St = ft !== L && tt, _t = ct !== X && st;
      if (!St && !_t && !tt && !st)
        return;
      if ((St || _t || P[0] === 1 || P[1] === 1) && (H.x = St ? ft : M.x, H.y = _t ? ct : M.y, M.x = H.x, M.y = H.y, Y.length > 0)) {
        const Rt = ft - L, $t = ct - X;
        for (const pe of Y)
          pe.position = {
            x: pe.position.x - Rt + P[0] * (lt - nt),
            y: pe.position.y - $t + P[1] * (rt - z)
          }, O.push(pe);
      }
      if ((tt || st) && (H.width = tt && (!d.resizeDirection || d.resizeDirection === "horizontal") ? lt : M.width, H.height = st && (!d.resizeDirection || d.resizeDirection === "vertical") ? rt : M.height, M.width = H.width, M.height = H.height), q && _.expandParent) {
        const Rt = P[0] * (H.width ?? 0);
        H.x && H.x < Rt && (M.x = Rt, R.x = R.x - (H.x - Rt));
        const $t = P[1] * (H.height ?? 0);
        H.y && H.y < $t && (M.y = $t, R.y = R.y - (H.y - $t));
      }
      const gt = N2({
        width: M.width,
        prevWidth: nt,
        height: M.height,
        prevHeight: z,
        affectsX: d.controlDirection.affectsX,
        affectsY: d.controlDirection.affectsY
      }), yt = { ...M, direction: gt };
      N?.(Z, yt) !== !1 && (J = !0, w?.(Z, yt), u(H, O));
    }).on("end", (Z) => {
      J && (A?.(Z, { ...M }), s?.({ ...M }), J = !1);
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
var Ef = { exports: {} }, zf = {}, Mf = { exports: {} }, Nf = {};
var j0;
function O2() {
  if (j0) return Nf;
  j0 = 1;
  var n = To();
  function i(y, v) {
    return y === v && (y !== 0 || 1 / y === 1 / v) || y !== y && v !== v;
  }
  var o = typeof Object.is == "function" ? Object.is : i, u = n.useState, s = n.useEffect, f = n.useLayoutEffect, d = n.useDebugValue;
  function g(y, v) {
    var S = v(), w = u({ inst: { value: S, getSnapshot: v } }), A = w[0].inst, N = w[1];
    return f(
      function() {
        A.value = S, A.getSnapshot = v, p(A) && N({ inst: A });
      },
      [y, S, v]
    ), s(
      function() {
        return p(A) && N({ inst: A }), y(function() {
          p(A) && N({ inst: A });
        });
      },
      [y]
    ), d(S), S;
  }
  function p(y) {
    var v = y.getSnapshot;
    y = y.value;
    try {
      var S = v();
      return !o(y, S);
    } catch {
      return !0;
    }
  }
  function h(y, v) {
    return v();
  }
  var b = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? h : g;
  return Nf.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : b, Nf;
}
var Y0;
function R2() {
  return Y0 || (Y0 = 1, Mf.exports = O2()), Mf.exports;
}
var L0;
function H2() {
  if (L0) return zf;
  L0 = 1;
  var n = To(), i = R2();
  function o(h, b) {
    return h === b && (h !== 0 || 1 / h === 1 / b) || h !== h && b !== b;
  }
  var u = typeof Object.is == "function" ? Object.is : o, s = i.useSyncExternalStore, f = n.useRef, d = n.useEffect, g = n.useMemo, p = n.useDebugValue;
  return zf.useSyncExternalStoreWithSelector = function(h, b, y, v, S) {
    var w = f(null);
    if (w.current === null) {
      var A = { hasValue: !1, value: null };
      w.current = A;
    } else A = w.current;
    w = g(
      function() {
        function M(q) {
          if (!R) {
            if (R = !0, _ = q, q = v(q), S !== void 0 && A.hasValue) {
              var B = A.value;
              if (S(B, q))
                return C = B;
            }
            return C = q;
          }
          if (B = C, u(_, q)) return B;
          var Q = v(q);
          return S !== void 0 && S(B, Q) ? (_ = q, B) : (_ = q, C = Q);
        }
        var R = !1, _, C, Y = y === void 0 ? null : y;
        return [
          function() {
            return M(b());
          },
          Y === null ? void 0 : function() {
            return M(Y());
          }
        ];
      },
      [b, y, v, S]
    );
    var N = s(h, w[0], w[1]);
    return d(
      function() {
        A.hasValue = !0, A.value = N;
      },
      [N]
    ), p(N), N;
  }, zf;
}
var V0;
function k2() {
  return V0 || (V0 = 1, Ef.exports = H2()), Ef.exports;
}
var B2 = k2();
const U2 = /* @__PURE__ */ zp(B2), q2 = {}, X0 = (n) => {
  let i;
  const o = /* @__PURE__ */ new Set(), u = (b, y) => {
    const v = typeof b == "function" ? b(i) : b;
    if (!Object.is(v, i)) {
      const S = i;
      i = y ?? (typeof v != "object" || v === null) ? v : Object.assign({}, i, v), o.forEach((w) => w(i, S));
    }
  }, s = () => i, p = { setState: u, getState: s, getInitialState: () => h, subscribe: (b) => (o.add(b), () => o.delete(b)), destroy: () => {
    (q2 ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), o.clear();
  } }, h = i = n(u, s, p);
  return p;
}, j2 = (n) => n ? X0(n) : X0, { useDebugValue: Y2 } = Q1, { useSyncExternalStoreWithSelector: L2 } = U2, V2 = (n) => n;
function Oy(n, i = V2, o) {
  const u = L2(
    n.subscribe,
    n.getState,
    n.getServerState || n.getInitialState,
    i,
    o
  );
  return Y2(u), u;
}
const $0 = (n, i) => {
  const o = j2(n), u = (s, f = i) => Oy(o, s, f);
  return Object.assign(u, o), u;
}, X2 = (n, i) => n ? $0(n, i) : $0;
function Kt(n, i) {
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
var $2 = Mp();
const Lr = W.createContext(null), Z2 = Lr.Provider, Ry = mn.error001("react");
function Ot(n, i) {
  const o = W.useContext(Lr);
  if (o === null)
    throw new Error(Ry);
  return Oy(o, n, i);
}
function Jt() {
  const n = W.useContext(Lr);
  if (n === null)
    throw new Error(Ry);
  return W.useMemo(() => ({
    getState: n.getState,
    setState: n.setState,
    subscribe: n.subscribe
  }), [n]);
}
const Z0 = { display: "none" }, G2 = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Hy = "react-flow__node-desc", ky = "react-flow__edge-desc", Q2 = "react-flow__aria-live", K2 = (n) => n.ariaLiveMessage, J2 = (n) => n.ariaLabelConfig;
function F2({ rfId: n }) {
  const i = Ot(K2);
  return U.jsx("div", { id: `${Q2}-${n}`, "aria-live": "assertive", "aria-atomic": "true", style: G2, children: i });
}
function W2({ rfId: n, disableKeyboardA11y: i }) {
  const o = Ot(J2);
  return U.jsxs(U.Fragment, { children: [U.jsx("div", { id: `${Hy}-${n}`, style: Z0, children: i ? o["node.a11yDescription.default"] : o["node.a11yDescription.keyboardDisabled"] }), U.jsx("div", { id: `${ky}-${n}`, style: Z0, children: o["edge.a11yDescription.default"] }), !i && U.jsx(F2, { rfId: n })] });
}
const Vr = W.forwardRef(({ position: n = "top-left", children: i, className: o, style: u, ...s }, f) => {
  const d = `${n}`.split("-");
  return U.jsx("div", { className: re(["react-flow__panel", o, ...d]), style: u, ref: f, ...s, children: i });
});
Vr.displayName = "Panel";
const G0 = "https://reactflow.dev?utm_source=attribution";
function I2({ proOptions: n, position: i = "bottom-right" }) {
  return n?.hideAttribution ? null : U.jsx(Vr, { position: i, className: "react-flow__attribution", "data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${G0}`, children: U.jsx("a", { href: G0, target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const P2 = (n) => {
  const i = [], o = [];
  for (const [, u] of n.nodeLookup)
    u.selected && i.push(u.internals.userNode);
  for (const [, u] of n.edgeLookup)
    u.selected && o.push(u);
  return { selectedNodes: i, selectedEdges: o };
}, hr = (n) => n.id;
function tE(n, i) {
  return Kt(n.selectedNodes.map(hr), i.selectedNodes.map(hr)) && Kt(n.selectedEdges.map(hr), i.selectedEdges.map(hr));
}
function eE({ onSelectionChange: n }) {
  const i = Jt(), { selectedNodes: o, selectedEdges: u } = Ot(P2, tE);
  return W.useEffect(() => {
    const s = { nodes: o, edges: u };
    n?.(s), i.getState().onSelectionChangeHandlers.forEach((f) => f(s));
  }, [o, u, n]), null;
}
const nE = (n) => !!n.onSelectionChangeHandlers;
function lE({ onSelectionChange: n }) {
  const i = Ot(nE);
  return n || i ? U.jsx(eE, { onSelectionChange: n }) : null;
}
const By = [0, 0], aE = { x: 0, y: 0, zoom: 1 }, iE = [
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
], Q0 = [...iE, "rfId"], oE = (n) => ({
  setNodes: n.setNodes,
  setEdges: n.setEdges,
  setMinZoom: n.setMinZoom,
  setMaxZoom: n.setMaxZoom,
  setTranslateExtent: n.setTranslateExtent,
  setNodeExtent: n.setNodeExtent,
  reset: n.reset,
  setDefaultNodesAndEdges: n.setDefaultNodesAndEdges
}), K0 = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Eo,
  nodeOrigin: By,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function uE(n) {
  const { setNodes: i, setEdges: o, setMinZoom: u, setMaxZoom: s, setTranslateExtent: f, setNodeExtent: d, reset: g, setDefaultNodesAndEdges: p } = Ot(oE, Kt), h = Jt();
  W.useEffect(() => (p(n.defaultNodes, n.defaultEdges), () => {
    b.current = K0, g();
  }), []);
  const b = W.useRef(K0);
  return W.useEffect(
    () => {
      for (const y of Q0) {
        const v = n[y], S = b.current[y];
        v !== S && (typeof n[y] > "u" || (y === "nodes" ? i(v) : y === "edges" ? o(v) : y === "minZoom" ? u(v) : y === "maxZoom" ? s(v) : y === "translateExtent" ? f(v) : y === "nodeExtent" ? d(v) : y === "ariaLabelConfig" ? h.setState({ ariaLabelConfig: $w(v) }) : y === "fitView" ? h.setState({ fitViewQueued: v }) : y === "fitViewOptions" ? h.setState({ fitViewOptions: v }) : h.setState({ [y]: v })));
      }
      b.current = n;
    },
    // Only re-run the effect if one of the fields we track changes
    Q0.map((y) => n[y])
  ), null;
}
function J0() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function rE(n) {
  const [i, o] = W.useState(n === "system" ? null : n);
  return W.useEffect(() => {
    if (n !== "system") {
      o(n);
      return;
    }
    const u = J0(), s = () => o(u?.matches ? "dark" : "light");
    return s(), u?.addEventListener("change", s), () => {
      u?.removeEventListener("change", s);
    };
  }, [n]), i !== null ? i : J0()?.matches ? "dark" : "light";
}
const F0 = typeof document < "u" ? document : null;
function Ao(n = null, i = { target: F0, actInsideInputWithModifier: !0 }) {
  const [o, u] = W.useState(!1), s = W.useRef(!1), f = W.useRef(/* @__PURE__ */ new Set([])), [d, g] = W.useMemo(() => {
    if (n !== null) {
      const h = (Array.isArray(n) ? n : [n]).filter((y) => typeof y == "string").map((y) => y.replace("+", `
`).replace(`

`, `
+`).split(`
`)), b = h.reduce((y, v) => y.concat(...v), []);
      return [h, b];
    }
    return [[], []];
  }, [n]);
  return W.useEffect(() => {
    const p = i?.target ?? F0, h = i?.actInsideInputWithModifier ?? !0;
    if (n !== null) {
      const b = (S) => {
        if (s.current = S.ctrlKey || S.metaKey || S.shiftKey || S.altKey, (!s.current || s.current && !h) && py(S))
          return !1;
        const A = I0(S.code, g);
        if (f.current.add(S[A]), W0(d, f.current, !1)) {
          const N = S.composedPath?.()?.[0] || S.target, M = N?.nodeName === "BUTTON" || N?.nodeName === "A";
          i.preventDefault !== !1 && (s.current || !M) && S.preventDefault(), u(!0);
        }
      }, y = (S) => {
        const w = I0(S.code, g);
        W0(d, f.current, !0) ? (u(!1), f.current.clear()) : f.current.delete(S[w]), S.key === "Meta" && f.current.clear(), s.current = !1;
      }, v = () => {
        f.current.clear(), u(!1);
      };
      return p?.addEventListener("keydown", b), p?.addEventListener("keyup", y), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        p?.removeEventListener("keydown", b), p?.removeEventListener("keyup", y), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [n, u]), o;
}
function W0(n, i, o) {
  return n.filter((u) => o || u.length === i.size).some((u) => u.every((s) => i.has(s)));
}
function I0(n, i) {
  return i.includes(n) ? "code" : "key";
}
const cE = () => {
  const n = Jt();
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
      const { width: u, height: s, minZoom: f, maxZoom: d, panZoom: g } = n.getState(), p = ad(i, u, s, f, d, o?.padding ?? 0.1);
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
      }, b = o.snapGrid ?? s, y = o.snapToGrid ?? f;
      return Bo(h, u, y, b);
    },
    flowToScreenPosition: (i) => {
      const { transform: o, domNode: u } = n.getState();
      if (!u)
        return i;
      const { x: s, y: f } = u.getBoundingClientRect(), d = ui(i, o);
      return {
        x: d.x + s,
        y: d.y + f
      };
    }
  }), []);
};
function Uy(n, i) {
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
      sE(p, g);
    o.push(g);
  }
  return s.length && s.forEach((f) => {
    f.index !== void 0 ? o.splice(f.index, 0, { ...f.item }) : o.push({ ...f.item });
  }), o;
}
function sE(n, i) {
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
function fE(n, i) {
  return Uy(n, i);
}
function dE(n, i) {
  return Uy(n, i);
}
function Il(n, i) {
  return {
    id: n,
    type: "select",
    selected: i
  };
}
function ti(n, i = /* @__PURE__ */ new Set(), o = !1) {
  const u = [];
  for (const [s, f] of n) {
    const d = i.has(s);
    !(f.selected === void 0 && !d) && f.selected !== d && (o && (f.selected = d), u.push(Il(f.id, d)));
  }
  return u;
}
function P0({ items: n = [], lookup: i }) {
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
const hE = dy();
function gE(n, i, o = {}) {
  return Fw(n, i, {
    ...o,
    onError: o.onError ?? hE
  });
}
const ep = (n) => kw(n), mE = (n) => uy(n);
function qy(n) {
  return W.forwardRef(n);
}
const pE = typeof window < "u" ? W.useLayoutEffect : W.useEffect;
function np(n) {
  const [i, o] = W.useState(BigInt(0)), [u] = W.useState(() => yE(() => o((s) => s + BigInt(1))));
  return pE(() => {
    const s = u.get();
    s.length && (n(s), u.reset());
  }, [i]), u;
}
function yE(n) {
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
const jy = W.createContext(null);
function vE({ children: n }) {
  const i = Jt(), o = W.useCallback((g) => {
    const { nodes: p = [], setNodes: h, hasDefaultNodes: b, onNodesChange: y, nodeLookup: v, fitViewQueued: S, onNodesChangeMiddlewareMap: w } = i.getState();
    let A = p;
    for (const M of g)
      A = typeof M == "function" ? M(A) : M;
    let N = P0({
      items: A,
      lookup: v
    });
    for (const M of w.values())
      N = M(N);
    b && h(A), N.length > 0 ? y?.(N) : S && window.requestAnimationFrame(() => {
      const { fitViewQueued: M, nodes: R, setNodes: _ } = i.getState();
      M && _(R);
    });
  }, []), u = np(o), s = W.useCallback((g) => {
    const { edges: p = [], setEdges: h, hasDefaultEdges: b, onEdgesChange: y, edgeLookup: v } = i.getState();
    let S = p;
    for (const w of g)
      S = typeof w == "function" ? w(S) : w;
    b ? h(S) : y && y(P0({
      items: S,
      lookup: v
    }));
  }, []), f = np(s), d = W.useMemo(() => ({ nodeQueue: u, edgeQueue: f }), []);
  return U.jsx(jy.Provider, { value: d, children: n });
}
function bE() {
  const n = W.useContext(jy);
  if (!n)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return n;
}
const xE = (n) => !!n.panZoom;
function Xr() {
  const n = cE(), i = Jt(), o = bE(), u = Ot(xE), s = W.useMemo(() => {
    const f = (y) => i.getState().nodeLookup.get(y), d = (y) => {
      o.nodeQueue.push(y);
    }, g = (y) => {
      o.edgeQueue.push(y);
    }, p = (y) => {
      const { nodeLookup: v, nodeOrigin: S } = i.getState(), w = ep(y) ? y : v.get(y.id), A = w.parentId ? gy(w.position, w.measured, w.parentId, v, S) : w.position, N = {
        ...w,
        position: A,
        width: w.measured?.width ?? w.width,
        height: w.measured?.height ?? w.height
      };
      return Mo(N);
    }, h = (y, v, S = { replace: !1 }) => {
      d((w) => w.map((A) => {
        if (A.id === y) {
          const N = typeof v == "function" ? v(A) : v;
          return S.replace && ep(N) ? N : { ...A, ...N };
        }
        return A;
      }));
    }, b = (y, v, S = { replace: !1 }) => {
      g((w) => w.map((A) => {
        if (A.id === y) {
          const N = typeof v == "function" ? v(A) : v;
          return S.replace && mE(N) ? N : { ...A, ...N };
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
        return y.map((v) => ({ ...v }));
      },
      getEdge: (y) => i.getState().edgeLookup.get(y),
      setNodes: d,
      setEdges: g,
      addNodes: (y) => {
        const v = Array.isArray(y) ? y : [y];
        o.nodeQueue.push((S) => [...S, ...v]);
      },
      addEdges: (y) => {
        const v = Array.isArray(y) ? y : [y];
        o.edgeQueue.push((S) => [...S, ...v]);
      },
      toObject: () => {
        const { nodes: y = [], edges: v = [], transform: S } = i.getState(), [w, A, N] = S;
        return {
          nodes: y.map((M) => ({ ...M })),
          edges: v.map((M) => ({ ...M })),
          viewport: {
            x: w,
            y: A,
            zoom: N
          }
        };
      },
      deleteElements: async ({ nodes: y = [], edges: v = [] }) => {
        const { nodes: S, edges: w, onNodesDelete: A, onEdgesDelete: N, triggerNodeChanges: M, triggerEdgeChanges: R, onDelete: _, onBeforeDelete: C } = i.getState(), { nodes: Y, edges: q } = await Yw({
          nodesToRemove: y,
          edgesToRemove: v,
          nodes: S,
          edges: w,
          onBeforeDelete: C
        }), B = q.length > 0, Q = Y.length > 0;
        if (B) {
          const J = q.map(tp);
          N?.(q), R(J);
        }
        if (Q) {
          const J = Y.map(tp);
          A?.(Y), M(J);
        }
        return (Q || B) && _?.({ nodes: Y, edges: q }), { deletedNodes: Y, deletedEdges: q };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (y, v = !0, S) => {
        const w = M0(y), A = w ? y : p(y), N = S !== void 0;
        return A ? (S || i.getState().nodes).filter((M) => {
          const R = i.getState().nodeLookup.get(M.id);
          if (R && !w && (M.id === y.id || !R.internals.positionAbsolute))
            return !1;
          const _ = Mo(N ? M : R), C = Tr(_, A);
          return v && C > 0 || C >= _.width * _.height || C >= A.width * A.height;
        }) : [];
      },
      isNodeIntersecting: (y, v, S = !0) => {
        const A = M0(y) ? y : p(y);
        if (!A)
          return !1;
        const N = Tr(A, v);
        return S && N > 0 || N >= v.width * v.height || N >= A.width * A.height;
      },
      updateNode: h,
      updateNodeData: (y, v, S = { replace: !1 }) => {
        h(y, (w) => {
          const A = typeof v == "function" ? v(w) : v;
          return S.replace ? { ...w, data: A } : { ...w, data: { ...w.data, ...A } };
        }, S);
      },
      updateEdge: b,
      updateEdgeData: (y, v, S = { replace: !1 }) => {
        b(y, (w) => {
          const A = typeof v == "function" ? v(w) : v;
          return S.replace ? { ...w, data: A } : { ...w, data: { ...w.data, ...A } };
        }, S);
      },
      getNodesBounds: (y) => {
        const { nodeLookup: v, nodeOrigin: S } = i.getState();
        return Bw(y, { nodeLookup: v, nodeOrigin: S });
      },
      getHandleConnections: ({ type: y, id: v, nodeId: S }) => Array.from(i.getState().connectionLookup.get(`${S}-${y}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: y, handleId: v, nodeId: S }) => Array.from(i.getState().connectionLookup.get(`${S}${y ? v ? `-${y}-${v}` : `-${y}` : ""}`)?.values() ?? []),
      fitView: async (y) => {
        const v = i.getState().fitViewResolver ?? Xw();
        return i.setState({ fitViewQueued: !0, fitViewOptions: y, fitViewResolver: v }), o.nodeQueue.push((S) => [...S]), v.promise;
      }
    };
  }, []);
  return W.useMemo(() => ({
    ...s,
    ...n,
    viewportInitialized: u
  }), [u]);
}
const lp = (n) => n.selected, _E = typeof window < "u" ? window : void 0;
function SE({ deleteKeyCode: n, multiSelectionKeyCode: i }) {
  const o = Jt(), { deleteElements: u } = Xr(), s = Ao(n, { actInsideInputWithModifier: !1 }), f = Ao(i, { target: _E });
  W.useEffect(() => {
    if (s) {
      const { edges: d, nodes: g } = o.getState();
      u({ nodes: g.filter(lp), edges: d.filter(lp) }), o.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), W.useEffect(() => {
    o.setState({ multiSelectionActive: f });
  }, [f]);
}
function wE(n) {
  const i = Jt();
  W.useEffect(() => {
    const o = () => {
      if (!n.current || !(n.current.checkVisibility?.() ?? !0))
        return !1;
      const u = id(n.current);
      (u.height === 0 || u.width === 0) && i.getState().onError?.("004", mn.error004()), i.setState({ width: u.width || 500, height: u.height || 500 });
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
const $r = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, EE = (n) => ({
  userSelectionActive: n.userSelectionActive,
  lib: n.lib,
  connectionInProgress: n.connection.inProgress
});
function zE({ onPaneContextMenu: n, zoomOnScroll: i = !0, zoomOnPinch: o = !0, panOnScroll: u = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: f = na.Free, zoomOnDoubleClick: d = !0, panOnDrag: g = !0, defaultViewport: p, translateExtent: h, minZoom: b, maxZoom: y, zoomActivationKeyCode: v, preventScrolling: S = !0, children: w, noWheelClassName: A, noPanClassName: N, onViewportChange: M, isControlledViewport: R, paneClickDistance: _, selectionOnDrag: C }) {
  const Y = Jt(), q = W.useRef(null), { userSelectionActive: B, lib: Q, connectionInProgress: J } = Ot(EE, Kt), ut = Ao(v), Z = W.useRef();
  wE(q);
  const I = W.useCallback((ot) => {
    M?.({ x: ot[0], y: ot[1], zoom: ot[2] }), R || Y.setState({ transform: ot });
  }, [M, R]);
  return W.useEffect(() => {
    if (q.current) {
      Z.current = M2({
        domNode: q.current,
        minZoom: b,
        maxZoom: y,
        translateExtent: h,
        viewport: p,
        onDraggingChange: (E) => Y.setState((O) => O.paneDragging === E ? O : { paneDragging: E }),
        onPanZoomStart: (E, O) => {
          const { onViewportChangeStart: L, onMoveStart: X } = Y.getState();
          X?.(E, O), L?.(O);
        },
        onPanZoom: (E, O) => {
          const { onViewportChange: L, onMove: X } = Y.getState();
          X?.(E, O), L?.(O);
        },
        onPanZoomEnd: (E, O) => {
          const { onViewportChangeEnd: L, onMoveEnd: X } = Y.getState();
          X?.(E, O), L?.(O);
        }
      });
      const { x: ot, y: T, zoom: V } = Z.current.getViewport();
      return Y.setState({
        panZoom: Z.current,
        transform: [ot, T, V],
        domNode: q.current.closest(".react-flow")
      }), () => {
        Z.current?.destroy();
      };
    }
  }, []), W.useEffect(() => {
    Z.current?.update({
      onPaneContextMenu: n,
      zoomOnScroll: i,
      zoomOnPinch: o,
      panOnScroll: u,
      panOnScrollSpeed: s,
      panOnScrollMode: f,
      zoomOnDoubleClick: d,
      panOnDrag: g,
      zoomActivationKeyPressed: ut,
      preventScrolling: S,
      noPanClassName: N,
      userSelectionActive: B,
      noWheelClassName: A,
      lib: Q,
      onTransformChange: I,
      connectionInProgress: J,
      selectionOnDrag: C,
      paneClickDistance: _
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
    S,
    N,
    B,
    A,
    Q,
    I,
    J,
    C,
    _
  ]), U.jsx("div", { className: "react-flow__renderer", ref: q, style: $r, children: w });
}
const ME = (n) => ({
  userSelectionActive: n.userSelectionActive,
  userSelectionRect: n.userSelectionRect
});
function NE() {
  const { userSelectionActive: n, userSelectionRect: i } = Ot(ME, Kt);
  return n && i ? U.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: i.width,
    height: i.height,
    transform: `translate(${i.x}px, ${i.y}px)`
  } }) : null;
}
const Af = (n, i) => (o) => {
  o.target === i.current && n?.(o);
}, AE = (n) => ({
  userSelectionActive: n.userSelectionActive,
  elementsSelectable: n.elementsSelectable,
  dragging: n.paneDragging,
  panBy: n.panBy,
  autoPanSpeed: n.autoPanSpeed
});
function CE({ isSelecting: n, selectionKeyPressed: i, selectionMode: o = zo.Full, panOnDrag: u, autoPanOnSelection: s, paneClickDistance: f, selectionOnDrag: d, onSelectionStart: g, onSelectionEnd: p, onPaneClick: h, onPaneContextMenu: b, onPaneScroll: y, onPaneMouseEnter: v, onPaneMouseMove: S, onPaneMouseLeave: w, children: A }) {
  const N = W.useRef(0), M = Jt(), { userSelectionActive: R, elementsSelectable: _, dragging: C, panBy: Y, autoPanSpeed: q } = Ot(AE, Kt), B = _ && (n || R), Q = W.useRef(null), J = W.useRef(), ut = W.useRef(/* @__PURE__ */ new Set()), Z = W.useRef(/* @__PURE__ */ new Set()), I = W.useRef(!1), ot = W.useRef(!1), T = W.useRef({ x: 0, y: 0 }), V = W.useRef(!1), E = (tt) => {
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
    b?.(tt);
  }, L = y ? (tt) => y(tt) : void 0, X = (tt) => {
    ot.current && (tt.stopPropagation(), ot.current = !1);
  }, nt = (tt) => {
    const { domNode: st, transform: St } = M.getState();
    if (J.current = st?.getBoundingClientRect(), !J.current)
      return;
    const _t = tt.target === Q.current;
    if (!_t && !!tt.target.closest(".nokey") || !n || !(d && _t || i) || tt.button !== 0 || !tt.isPrimary)
      return;
    tt.target?.setPointerCapture?.(tt.pointerId), ot.current = !1;
    const { x: Et, y: Rt } = gn(tt.nativeEvent, J.current), $t = Bo({ x: Et, y: Rt }, St);
    M.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: $t.x,
        startY: $t.y,
        x: Et,
        y: Rt
      }
    }), _t || (tt.stopPropagation(), tt.preventDefault());
  };
  function z(tt, st) {
    const { userSelectionRect: St } = M.getState();
    if (!St)
      return;
    const { transform: _t, nodeLookup: gt, edgeLookup: yt, connectionLookup: Et, triggerNodeChanges: Rt, triggerEdgeChanges: $t, defaultEdgeOptions: pe } = M.getState(), Qe = { x: St.startX, y: St.startY }, { x: we, y: Ee } = ui(Qe, _t), He = {
      startX: Qe.x,
      startY: Qe.y,
      x: tt < we ? tt : we,
      y: st < Ee ? st : Ee,
      width: Math.abs(tt - we),
      height: Math.abs(st - Ee)
    }, Dl = ut.current, Mn = Z.current;
    ut.current = new Set(nd(gt, He, _t, o === zo.Partial, !0).map((ke) => ke.id)), Z.current = /* @__PURE__ */ new Set();
    const It = pe?.selectable ?? !0;
    for (const ke of ut.current) {
      const Ke = Et.get(ke);
      if (Ke)
        for (const { edgeId: Je } of Ke.values()) {
          const Fe = yt.get(Je);
          Fe && (Fe.selectable ?? It) && Z.current.add(Je);
        }
    }
    if (!N0(Dl, ut.current)) {
      const ke = ti(gt, ut.current, !0);
      Rt(ke);
    }
    if (!N0(Mn, Z.current)) {
      const ke = ti(yt, Z.current);
      $t(ke);
    }
    M.setState({
      userSelectionRect: He,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function H() {
    if (!s || !J.current)
      return;
    const [tt, st] = ld(T.current, J.current, q);
    Y({ x: tt, y: st }).then((St) => {
      if (!ot.current || !St) {
        N.current = requestAnimationFrame(H);
        return;
      }
      const { x: _t, y: gt } = T.current;
      z(_t, gt), N.current = requestAnimationFrame(H);
    });
  }
  const P = () => {
    cancelAnimationFrame(N.current), N.current = 0, V.current = !1;
  };
  W.useEffect(() => () => P(), []);
  const lt = (tt) => {
    const { userSelectionRect: st, transform: St, resetSelectedElements: _t } = M.getState();
    if (!J.current || !st)
      return;
    const { x: gt, y: yt } = gn(tt.nativeEvent, J.current);
    T.current = { x: gt, y: yt };
    const Et = ui({ x: st.startX, y: st.startY }, St);
    if (!ot.current) {
      const Rt = i ? 0 : f;
      if (Math.hypot(gt - Et.x, yt - Et.y) <= Rt)
        return;
      _t(), g?.(tt);
    }
    ot.current = !0, V.current || (H(), V.current = !0), z(gt, yt);
  }, rt = (tt) => {
    if (!B) {
      tt.target === Q.current && M.getState().connection.inProgress && (I.current = !0);
      return;
    }
    tt.button === 0 && (tt.target?.releasePointerCapture?.(tt.pointerId), !R && tt.target === Q.current && M.getState().userSelectionRect && E?.(tt), M.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), ot.current && (p?.(tt), M.setState({
      nodesSelectionActive: ut.current.size > 0
    })), P());
  }, ft = (tt) => {
    tt.target?.releasePointerCapture?.(tt.pointerId), P();
  }, ct = u === !0 || Array.isArray(u) && u.includes(0);
  return U.jsxs("div", { className: re(["react-flow__pane", { draggable: ct, dragging: C, selection: n }]), onClick: B ? void 0 : Af(E, Q), onContextMenu: Af(O, Q), onWheel: Af(L, Q), onPointerEnter: B ? void 0 : v, onPointerMove: B ? lt : S, onPointerUp: rt, onPointerCancel: B ? ft : void 0, onPointerDownCapture: B ? nt : void 0, onClickCapture: B ? X : void 0, onPointerLeave: w, ref: Q, style: $r, children: [A, U.jsx(NE, {})] });
}
function $f({ id: n, store: i, unselect: o = !1, nodeRef: u }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: f, multiSelectionActive: d, nodeLookup: g, onError: p } = i.getState(), h = g.get(n);
  if (!h) {
    p?.("012", mn.error012(n));
    return;
  }
  i.setState({ nodesSelectionActive: !1 }), h.selected ? (o || h.selected && d) && (f({ nodes: [h], edges: [] }), requestAnimationFrame(() => u?.current?.blur())) : s([n]);
}
function Yy({ nodeRef: n, disabled: i = !1, noDragClassName: o, handleSelector: u, nodeId: s, isSelectable: f, nodeClickDistance: d }) {
  const g = Jt(), [p, h] = W.useState(!1), b = W.useRef();
  return W.useEffect(() => {
    b.current = d2({
      getStoreItems: () => g.getState(),
      onNodeMouseDown: (y) => {
        $f({
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
    if (!(i || !n.current || !b.current))
      return b.current.update({
        noDragClassName: o,
        handleSelector: u,
        domNode: n.current,
        isSelectable: f,
        nodeId: s,
        nodeClickDistance: d
      }), () => {
        b.current?.destroy();
      };
  }, [o, u, i, f, n, s, d]), p;
}
const TE = (n) => (i) => i.selected && (i.draggable || n && typeof i.draggable > "u");
function Ly() {
  const n = Jt();
  return W.useCallback((o) => {
    const { nodeExtent: u, snapToGrid: s, snapGrid: f, nodesDraggable: d, onError: g, updateNodePositions: p, nodeLookup: h, nodeOrigin: b } = n.getState(), y = /* @__PURE__ */ new Map(), v = TE(d), S = s ? f[0] : 5, w = s ? f[1] : 5, A = o.direction.x * S * o.factor, N = o.direction.y * w * o.factor;
    for (const [, M] of h) {
      if (!v(M))
        continue;
      let R = {
        x: M.internals.positionAbsolute.x + A,
        y: M.internals.positionAbsolute.y + N
      };
      s && (R = ko(R, f));
      const { position: _, positionAbsolute: C } = ry({
        nodeId: M.id,
        nextPosition: R,
        nodeLookup: h,
        nodeExtent: u,
        nodeOrigin: b,
        onError: g
      });
      M.position = _, M.internals.positionAbsolute = C, y.set(M.id, M);
    }
    p(y);
  }, []);
}
const dd = W.createContext(null), DE = dd.Provider;
dd.Consumer;
const Vy = () => W.useContext(dd), OE = (n) => ({
  connectOnClick: n.connectOnClick,
  noPanClassName: n.noPanClassName,
  rfId: n.rfId
}), Xy = W.createContext(null);
function RE({ children: n }) {
  const i = Ot(OE, Kt);
  return U.jsx(Xy.Provider, { value: i, children: n });
}
function HE() {
  const n = W.useContext(Xy);
  if (!n)
    throw new Error("useHandleConfig must be used within a HandleConfigProvider");
  return n;
}
const kE = {
  connectingFrom: !1,
  connectingTo: !1,
  clickConnecting: !1,
  isPossibleEndHandle: !0,
  connectionInProcess: !1,
  clickConnectionInProcess: !1,
  valid: !1
}, BE = (n, i, o) => (u) => {
  const { connectionClickStartHandle: s, connectionMode: f, connection: d } = u, { fromHandle: g, toHandle: p, isValid: h } = d;
  if (!g && !s)
    return kE;
  const b = p?.nodeId === n && p?.id === i && p?.type === o;
  return {
    connectingFrom: g?.nodeId === n && g?.id === i && g?.type === o,
    connectingTo: b,
    clickConnecting: s?.nodeId === n && s?.id === i && s?.type === o,
    isPossibleEndHandle: f === ii.Strict ? g?.type !== o : n !== g?.nodeId || i !== g?.id,
    connectionInProcess: !!g,
    clickConnectionInProcess: !!s,
    valid: b && h
  };
};
function UE({ type: n = "source", position: i = mt.Top, isValidConnection: o, isConnectable: u = !0, isConnectableStart: s = !0, isConnectableEnd: f = !0, id: d, onConnect: g, children: p, className: h, onMouseDown: b, onTouchStart: y, ...v }, S) {
  const w = d || null, A = n === "target", N = Jt(), M = Vy(), { connectOnClick: R, noPanClassName: _, rfId: C } = HE(), { connectingFrom: Y, connectingTo: q, clickConnecting: B, isPossibleEndHandle: Q, connectionInProcess: J, clickConnectionInProcess: ut, valid: Z } = Ot(BE(M, w, n), Kt);
  M || N.getState().onError?.("010", mn.error010());
  const I = (V) => {
    const { defaultEdgeOptions: E, onConnect: O, hasDefaultEdges: L } = N.getState(), X = {
      ...E,
      ...V
    };
    if (L) {
      const { edges: nt, setEdges: z, onError: H } = N.getState();
      z(gE(X, nt, { onError: H }));
    }
    O?.(X), g?.(X);
  }, ot = (V) => {
    if (!M)
      return;
    const E = yy(V.nativeEvent);
    if (s && (E && V.button === 0 || !E)) {
      const O = N.getState();
      Xf.onPointerDown(V.nativeEvent, {
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
        onConnectEnd: (...L) => N.getState().onConnectEnd?.(...L),
        updateConnection: O.updateConnection,
        onConnect: I,
        isValidConnection: o || ((...L) => N.getState().isValidConnection?.(...L) ?? !0),
        getTransform: () => N.getState().transform,
        getFromHandle: () => N.getState().connection.fromHandle,
        autoPanSpeed: O.autoPanSpeed,
        dragThreshold: O.connectionDragThreshold
      });
    }
    E ? b?.(V) : y?.(V);
  }, T = (V) => {
    const { onClickConnectStart: E, onClickConnectEnd: O, connectionClickStartHandle: L, connectionMode: X, isValidConnection: nt, lib: z, rfId: H, nodeLookup: P, connection: lt } = N.getState();
    if (!M || !L && !s)
      return;
    if (!L) {
      E?.(V.nativeEvent, { nodeId: M, handleId: w, handleType: n }), N.setState({ connectionClickStartHandle: { nodeId: M, type: n, id: w } });
      return;
    }
    const rt = my(V.target), ft = o || nt, { connection: ct, isValid: tt } = Xf.isValid(V.nativeEvent, {
      handle: {
        nodeId: M,
        id: w,
        type: n
      },
      connectionMode: X,
      fromNodeId: L.nodeId,
      fromHandleId: L.id || null,
      fromType: L.type,
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
  return U.jsx("div", { "data-handleid": w, "data-nodeid": M, "data-handlepos": i, "data-id": `${C}-${M}-${w}-${n}`, className: re([
    "react-flow__handle",
    `react-flow__handle-${i}`,
    "nodrag",
    _,
    h,
    {
      source: !A,
      target: A,
      connectable: u,
      connectablestart: s,
      connectableend: f,
      clickconnecting: B,
      connectingfrom: Y,
      connectingto: q,
      valid: Z,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: u && (!J || Q) && (J || ut ? f : s)
    }
  ]), onMouseDown: ot, onTouchStart: ot, onClick: R ? T : void 0, ref: S, ...v, children: p });
}
const ra = W.memo(qy(UE));
function qE({ data: n, isConnectable: i, sourcePosition: o = mt.Bottom }) {
  return U.jsxs(U.Fragment, { children: [n?.label, U.jsx(ra, { type: "source", position: o, isConnectable: i })] });
}
function jE({ data: n, isConnectable: i, targetPosition: o = mt.Top, sourcePosition: u = mt.Bottom }) {
  return U.jsxs(U.Fragment, { children: [U.jsx(ra, { type: "target", position: o, isConnectable: i }), n?.label, U.jsx(ra, { type: "source", position: u, isConnectable: i })] });
}
function YE() {
  return null;
}
function LE({ data: n, isConnectable: i, targetPosition: o = mt.Top }) {
  return U.jsxs(U.Fragment, { children: [U.jsx(ra, { type: "target", position: o, isConnectable: i }), n?.label] });
}
const Dr = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, ap = {
  input: qE,
  default: jE,
  output: LE,
  group: YE
};
function VE(n) {
  return n.internals.handleBounds === void 0 ? {
    width: n.width ?? n.initialWidth ?? n.style?.width,
    height: n.height ?? n.initialHeight ?? n.style?.height
  } : {
    width: n.width ?? n.style?.width,
    height: n.height ?? n.style?.height
  };
}
const XE = (n) => {
  const { width: i, height: o, x: u, y: s } = Ho(n.nodeLookup, {
    filter: (f) => !!f.selected
  });
  return {
    width: hn(i) ? i : null,
    height: hn(o) ? o : null,
    userSelectionActive: n.userSelectionActive,
    transformString: `translate(${n.transform[0]}px,${n.transform[1]}px) scale(${n.transform[2]}) translate(${u}px,${s}px)`
  };
};
function $E({ onSelectionContextMenu: n, noPanClassName: i, disableKeyboardA11y: o }) {
  const u = Jt(), { width: s, height: f, transformString: d, userSelectionActive: g } = Ot(XE, Kt), p = Ly(), h = W.useRef(null);
  W.useEffect(() => {
    o || h.current?.focus({
      preventScroll: !0
    });
  }, [o]);
  const b = !g && s !== null && f !== null;
  if (Yy({
    nodeRef: h,
    disabled: !b
  }), !b)
    return null;
  const y = n ? (S) => {
    const w = u.getState().nodes.filter((A) => A.selected);
    n(S, w);
  } : void 0, v = (S) => {
    Object.prototype.hasOwnProperty.call(Dr, S.key) && (S.preventDefault(), p({
      direction: Dr[S.key],
      factor: S.shiftKey ? 4 : 1
    }));
  };
  return U.jsx("div", { className: re(["react-flow__nodesselection", "react-flow__container", i]), style: {
    transform: d
  }, children: U.jsx("div", { ref: h, className: "react-flow__nodesselection-rect", onContextMenu: y, tabIndex: o ? void 0 : -1, onKeyDown: o ? void 0 : v, style: {
    width: s,
    height: f
  } }) });
}
const ip = typeof window < "u" ? window : void 0, ZE = (n) => ({ nodesSelectionActive: n.nodesSelectionActive, userSelectionActive: n.userSelectionActive });
function $y({ children: n, onPaneClick: i, onPaneMouseEnter: o, onPaneMouseMove: u, onPaneMouseLeave: s, onPaneContextMenu: f, onPaneScroll: d, paneClickDistance: g, deleteKeyCode: p, selectionKeyCode: h, selectionOnDrag: b, selectionMode: y, onSelectionStart: v, onSelectionEnd: S, multiSelectionKeyCode: w, panActivationKeyCode: A, zoomActivationKeyCode: N, elementsSelectable: M, zoomOnScroll: R, zoomOnPinch: _, panOnScroll: C, panOnScrollSpeed: Y, panOnScrollMode: q, zoomOnDoubleClick: B, panOnDrag: Q, autoPanOnSelection: J, defaultViewport: ut, translateExtent: Z, minZoom: I, maxZoom: ot, preventScrolling: T, onSelectionContextMenu: V, noWheelClassName: E, noPanClassName: O, disableKeyboardA11y: L, onViewportChange: X, isControlledViewport: nt }) {
  const { nodesSelectionActive: z, userSelectionActive: H } = Ot(ZE, Kt), P = Ao(h, { target: ip }), lt = Ao(A, { target: ip }), rt = lt || Q, ft = lt || C, ct = b && rt !== !0, tt = P || H || ct;
  return SE({ deleteKeyCode: p, multiSelectionKeyCode: w }), U.jsx(zE, { onPaneContextMenu: f, elementsSelectable: M, zoomOnScroll: R, zoomOnPinch: _, panOnScroll: ft, panOnScrollSpeed: Y, panOnScrollMode: q, zoomOnDoubleClick: B, panOnDrag: !P && rt, defaultViewport: ut, translateExtent: Z, minZoom: I, maxZoom: ot, zoomActivationKeyCode: N, preventScrolling: T, noWheelClassName: E, noPanClassName: O, onViewportChange: X, isControlledViewport: nt, paneClickDistance: g, selectionOnDrag: ct, children: U.jsxs(CE, { onSelectionStart: v, onSelectionEnd: S, onPaneClick: i, onPaneMouseEnter: o, onPaneMouseMove: u, onPaneMouseLeave: s, onPaneContextMenu: f, onPaneScroll: d, panOnDrag: rt, autoPanOnSelection: J, isSelecting: !!tt, selectionMode: y, selectionKeyPressed: P, paneClickDistance: g, selectionOnDrag: ct, children: [n, z && U.jsx($E, { onSelectionContextMenu: V, noPanClassName: O, disableKeyboardA11y: L })] }) });
}
$y.displayName = "FlowRenderer";
const GE = W.memo($y), QE = (n) => (i) => n ? nd(i.nodeLookup, { x: 0, y: 0, width: i.width, height: i.height }, i.transform, !0).map((o) => o.id) : Array.from(i.nodeLookup.keys());
function KE(n) {
  return Ot(W.useCallback(QE(n), [n]), Kt);
}
const JE = (n) => n.updateNodeInternals;
function FE() {
  const n = Ot(JE), [i] = W.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((o) => {
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
function WE({ node: n, nodeType: i, hasDimensions: o, resizeObserver: u }) {
  const s = Jt(), f = W.useRef(null), d = W.useRef(null), g = W.useRef(n.sourcePosition), p = W.useRef(n.targetPosition), h = W.useRef(i), b = o && !!n.internals.handleBounds;
  return W.useEffect(() => {
    f.current && !n.hidden && (!b || d.current !== f.current) && (d.current && u?.unobserve(d.current), u?.observe(f.current), d.current = f.current);
  }, [b, n.hidden]), W.useEffect(() => () => {
    d.current && (u?.unobserve(d.current), d.current = null);
  }, []), W.useEffect(() => {
    if (f.current) {
      const y = h.current !== i, v = g.current !== n.sourcePosition, S = p.current !== n.targetPosition;
      (y || v || S) && (h.current = i, g.current = n.sourcePosition, p.current = n.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[n.id, { id: n.id, nodeElement: f.current, force: !0 }]])));
    }
  }, [n.id, i, n.sourcePosition, n.targetPosition]), f;
}
function IE({ id: n, onClick: i, onMouseEnter: o, onMouseMove: u, onMouseLeave: s, onContextMenu: f, onDoubleClick: d, nodesDraggable: g, elementsSelectable: p, nodesConnectable: h, nodesFocusable: b, resizeObserver: y, noDragClassName: v, noPanClassName: S, disableKeyboardA11y: w, rfId: A, nodeTypes: N, nodeClickDistance: M, onError: R }) {
  const { node: _, internals: C, isParent: Y } = Ot((tt) => {
    const st = tt.nodeLookup.get(n), St = tt.parentLookup.has(n);
    return {
      node: st,
      internals: st.internals,
      isParent: St
    };
  }, Kt);
  let q = _.type || "default", B = N?.[q] || ap[q];
  B === void 0 && (R?.("003", mn.error003(q)), q = "default", B = N?.default || ap.default);
  const Q = !!(_.draggable || g && typeof _.draggable > "u"), J = !!(_.selectable || p && typeof _.selectable > "u"), ut = !!(_.connectable || h && typeof _.connectable > "u"), Z = !!(_.focusable || b && typeof _.focusable > "u"), I = Jt(), ot = hy(_), T = WE({ node: _, nodeType: q, hasDimensions: ot, resizeObserver: y }), V = Yy({
    nodeRef: T,
    disabled: _.hidden || !Q,
    noDragClassName: v,
    handleSelector: _.dragHandle,
    nodeId: n,
    isSelectable: J,
    nodeClickDistance: M
  }), E = Ly();
  if (_.hidden)
    return null;
  const O = Wn(_), L = VE(_), X = J || Q || i || o || u || s, nt = o ? (tt) => o(tt, { ...C.userNode }) : void 0, z = u ? (tt) => u(tt, { ...C.userNode }) : void 0, H = s ? (tt) => s(tt, { ...C.userNode }) : void 0, P = f ? (tt) => f(tt, { ...C.userNode }) : void 0, lt = d ? (tt) => d(tt, { ...C.userNode }) : void 0, rt = (tt) => {
    const { selectNodesOnDrag: st, nodeDragThreshold: St } = I.getState();
    J && (!st || !Q || St > 0) && $f({
      id: n,
      store: I,
      nodeRef: T
    }), i && i(tt, { ...C.userNode });
  }, ft = (tt) => {
    if (!(py(tt.nativeEvent) || w)) {
      if (ly.includes(tt.key) && J) {
        const st = tt.key === "Escape";
        $f({
          id: n,
          store: I,
          unselect: st,
          nodeRef: T
        });
      } else if (Q && _.selected && Object.prototype.hasOwnProperty.call(Dr, tt.key)) {
        tt.preventDefault();
        const { ariaLabelConfig: st } = I.getState();
        I.setState({
          ariaLiveMessage: st["node.a11yDescription.ariaLiveMessage"]({
            direction: tt.key.replace("Arrow", "").toLowerCase(),
            x: ~~C.positionAbsolute.x,
            y: ~~C.positionAbsolute.y
          })
        }), E({
          direction: Dr[tt.key],
          factor: tt.shiftKey ? 4 : 1
        });
      }
    }
  }, ct = () => {
    if (w || !T.current?.matches(":focus-visible"))
      return;
    const { transform: tt, width: st, height: St, autoPanOnNodeFocus: _t, setCenter: gt } = I.getState();
    if (!_t)
      return;
    nd(/* @__PURE__ */ new Map([[n, _]]), { x: 0, y: 0, width: st, height: St }, tt, !0).length > 0 || gt(_.position.x + O.width / 2, _.position.y + O.height / 2, {
      zoom: tt[2]
    });
  };
  return U.jsx("div", { className: re([
    "react-flow__node",
    `react-flow__node-${q}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [S]: Q
    },
    _.className,
    {
      selected: _.selected,
      selectable: J,
      parent: Y,
      draggable: Q,
      dragging: V
    }
  ]), ref: T, style: {
    zIndex: C.z,
    transform: `translate(${C.positionAbsolute.x}px,${C.positionAbsolute.y}px)`,
    pointerEvents: X ? "all" : "none",
    visibility: ot ? "visible" : "hidden",
    ..._.style,
    ...L
  }, "data-id": n, "data-testid": `rf__node-${n}`, onMouseEnter: nt, onMouseMove: z, onMouseLeave: H, onContextMenu: P, onClick: rt, onDoubleClick: lt, onKeyDown: Z ? ft : void 0, tabIndex: Z ? 0 : void 0, onFocus: Z ? ct : void 0, role: _.ariaRole ?? (Z ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": w ? void 0 : `${Hy}-${A}`, "aria-label": _.ariaLabel, ..._.domAttributes, children: U.jsx(DE, { value: n, children: U.jsx(B, { id: n, data: _.data, type: q, positionAbsoluteX: C.positionAbsolute.x, positionAbsoluteY: C.positionAbsolute.y, selected: _.selected ?? !1, selectable: J, draggable: Q, deletable: _.deletable ?? !0, isConnectable: ut, sourcePosition: _.sourcePosition, targetPosition: _.targetPosition, dragging: V, dragHandle: _.dragHandle, zIndex: C.z, parentId: _.parentId, ...O }) }) });
}
var PE = W.memo(IE);
const tz = (n) => ({
  nodesDraggable: n.nodesDraggable,
  nodesConnectable: n.nodesConnectable,
  nodesFocusable: n.nodesFocusable,
  elementsSelectable: n.elementsSelectable,
  onError: n.onError
});
function Zy(n) {
  const { nodesDraggable: i, nodesConnectable: o, nodesFocusable: u, elementsSelectable: s, onError: f } = Ot(tz, Kt), d = KE(n.onlyRenderVisibleElements), g = FE();
  return U.jsx("div", { className: "react-flow__nodes", style: $r, children: d.map((p) => (
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
    U.jsx(PE, { id: p, nodeTypes: n.nodeTypes, nodeExtent: n.nodeExtent, onClick: n.onNodeClick, onMouseEnter: n.onNodeMouseEnter, onMouseMove: n.onNodeMouseMove, onMouseLeave: n.onNodeMouseLeave, onContextMenu: n.onNodeContextMenu, onDoubleClick: n.onNodeDoubleClick, noDragClassName: n.noDragClassName, noPanClassName: n.noPanClassName, rfId: n.rfId, disableKeyboardA11y: n.disableKeyboardA11y, resizeObserver: g, nodesDraggable: i, nodesConnectable: o, nodesFocusable: u, elementsSelectable: s, nodeClickDistance: n.nodeClickDistance, onError: f }, p)
  )) });
}
Zy.displayName = "NodeRenderer";
const ez = W.memo(Zy);
function nz(n) {
  return Ot(W.useCallback((o) => {
    if (!n)
      return o.edges.map((s) => s.id);
    const u = [];
    if (o.width && o.height)
      for (const s of o.edges) {
        const f = o.nodeLookup.get(s.source), d = o.nodeLookup.get(s.target);
        f && d && Qw({
          sourceNode: f,
          targetNode: d,
          width: o.width,
          height: o.height,
          transform: o.transform
        }) && u.push(s.id);
      }
    return u;
  }, [n]), Kt);
}
const lz = ({ color: n = "none", strokeWidth: i = 1 }) => {
  const o = {
    strokeWidth: i,
    ...n && { stroke: n }
  };
  return U.jsx("polyline", { className: "arrow", style: o, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, az = ({ color: n = "none", strokeWidth: i = 1 }) => {
  const o = {
    strokeWidth: i,
    ...n && { stroke: n, fill: n }
  };
  return U.jsx("polyline", { className: "arrowclosed", style: o, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, op = {
  [Ar.Arrow]: lz,
  [Ar.ArrowClosed]: az
};
function iz(n) {
  const i = Jt();
  return W.useMemo(() => Object.prototype.hasOwnProperty.call(op, n) ? op[n] : (i.getState().onError?.("009", mn.error009(n)), null), [n]);
}
const oz = ({ id: n, type: i, color: o, width: u = 12.5, height: s = 12.5, markerUnits: f = "strokeWidth", strokeWidth: d, orient: g = "auto-start-reverse" }) => {
  const p = iz(i);
  return p ? U.jsx("marker", { className: "react-flow__arrowhead", id: n, markerWidth: `${u}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: f, orient: g, refX: "0", refY: "0", children: U.jsx(p, { color: o, strokeWidth: d }) }) : null;
}, Gy = ({ defaultColor: n, rfId: i }) => {
  const o = Ot((f) => f.edges), u = Ot((f) => f.defaultEdgeOptions), s = W.useMemo(() => e2(o, {
    id: i,
    defaultColor: n,
    defaultMarkerStart: u?.markerStart,
    defaultMarkerEnd: u?.markerEnd
  }), [o, u, i, n]);
  return s.length ? U.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: U.jsx("defs", { children: s.map((f) => U.jsx(oz, { id: f.id, type: f.type, color: f.color, width: f.width, height: f.height, markerUnits: f.markerUnits, strokeWidth: f.strokeWidth, orient: f.orient }, f.id)) }) }) : null;
};
Gy.displayName = "MarkerDefinitions";
var uz = W.memo(Gy);
function Qy({ x: n, y: i, label: o, labelStyle: u, labelShowBg: s = !0, labelBgStyle: f, labelBgPadding: d = [2, 4], labelBgBorderRadius: g = 2, children: p, className: h, ...b }) {
  const [y, v] = W.useState({ x: 1, y: 0, width: 0, height: 0 }), S = re(["react-flow__edge-textwrapper", h]), w = W.useRef(null);
  return W.useEffect(() => {
    if (w.current) {
      const A = w.current.getBBox();
      v({
        x: A.x,
        y: A.y,
        width: A.width,
        height: A.height
      });
    }
  }, [o]), o ? U.jsxs("g", { transform: `translate(${n - y.width / 2} ${i - y.height / 2})`, className: S, visibility: y.width ? "visible" : "hidden", ...b, children: [s && U.jsx("rect", { width: y.width + 2 * d[0], x: -d[0], y: -d[1], height: y.height + 2 * d[1], className: "react-flow__edge-textbg", style: f, rx: g, ry: g }), U.jsx("text", { className: "react-flow__edge-text", y: y.height / 2, dy: "0.3em", ref: w, style: u, children: o }), p] }) : null;
}
Qy.displayName = "EdgeText";
const rz = W.memo(Qy);
function Uo({ path: n, labelX: i, labelY: o, label: u, labelStyle: s, labelShowBg: f, labelBgStyle: d, labelBgPadding: g, labelBgBorderRadius: p, interactionWidth: h = 20, ...b }) {
  return U.jsxs(U.Fragment, { children: [U.jsx("path", { ...b, d: n, fill: "none", className: re(["react-flow__edge-path", b.className]) }), h ? U.jsx("path", { d: n, fill: "none", strokeOpacity: 0, strokeWidth: h, className: "react-flow__edge-interaction" }) : null, u && hn(i) && hn(o) ? U.jsx(rz, { x: i, y: o, label: u, labelStyle: s, labelShowBg: f, labelBgStyle: d, labelBgPadding: g, labelBgBorderRadius: p }) : null] });
}
function up({ pos: n, x1: i, y1: o, x2: u, y2: s }) {
  return n === mt.Left || n === mt.Right ? [0.5 * (i + u), o] : [i, 0.5 * (o + s)];
}
function Ky({ sourceX: n, sourceY: i, sourcePosition: o = mt.Bottom, targetX: u, targetY: s, targetPosition: f = mt.Top }) {
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
  }), [b, y, v, S] = vy({
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
    b,
    y,
    v,
    S
  ];
}
function Jy(n) {
  return W.memo(({ id: i, sourceX: o, sourceY: u, targetX: s, targetY: f, sourcePosition: d, targetPosition: g, label: p, labelStyle: h, labelShowBg: b, labelBgStyle: y, labelBgPadding: v, labelBgBorderRadius: S, style: w, markerEnd: A, markerStart: N, interactionWidth: M }) => {
    const [R, _, C] = Ky({
      sourceX: o,
      sourceY: u,
      sourcePosition: d,
      targetX: s,
      targetY: f,
      targetPosition: g
    }), Y = n.isInternal ? void 0 : i;
    return U.jsx(Uo, { id: Y, path: R, labelX: _, labelY: C, label: p, labelStyle: h, labelShowBg: b, labelBgStyle: y, labelBgPadding: v, labelBgBorderRadius: S, style: w, markerEnd: A, markerStart: N, interactionWidth: M });
  });
}
const cz = Jy({ isInternal: !1 }), Fy = Jy({ isInternal: !0 });
cz.displayName = "SimpleBezierEdge";
Fy.displayName = "SimpleBezierEdgeInternal";
function Wy(n) {
  return W.memo(({ id: i, sourceX: o, sourceY: u, targetX: s, targetY: f, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: h, labelBgPadding: b, labelBgBorderRadius: y, style: v, sourcePosition: S = mt.Bottom, targetPosition: w = mt.Top, markerEnd: A, markerStart: N, pathOptions: M, interactionWidth: R }) => {
    const [_, C, Y] = Yf({
      sourceX: o,
      sourceY: u,
      sourcePosition: S,
      targetX: s,
      targetY: f,
      targetPosition: w,
      borderRadius: M?.borderRadius,
      offset: M?.offset,
      stepPosition: M?.stepPosition
    }), q = n.isInternal ? void 0 : i;
    return U.jsx(Uo, { id: q, path: _, labelX: C, labelY: Y, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: h, labelBgPadding: b, labelBgBorderRadius: y, style: v, markerEnd: A, markerStart: N, interactionWidth: R });
  });
}
const Iy = Wy({ isInternal: !1 }), Py = Wy({ isInternal: !0 });
Iy.displayName = "SmoothStepEdge";
Py.displayName = "SmoothStepEdgeInternal";
function tv(n) {
  return W.memo(({ id: i, ...o }) => {
    const u = n.isInternal ? void 0 : i;
    return U.jsx(Iy, { ...o, id: u, pathOptions: W.useMemo(() => ({ borderRadius: 0, offset: o.pathOptions?.offset }), [o.pathOptions?.offset]) });
  });
}
const sz = tv({ isInternal: !1 }), ev = tv({ isInternal: !0 });
sz.displayName = "StepEdge";
ev.displayName = "StepEdgeInternal";
function nv(n) {
  return W.memo(({ id: i, sourceX: o, sourceY: u, targetX: s, targetY: f, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: h, labelBgPadding: b, labelBgBorderRadius: y, style: v, markerEnd: S, markerStart: w, interactionWidth: A }) => {
    const [N, M, R] = xy({ sourceX: o, sourceY: u, targetX: s, targetY: f }), _ = n.isInternal ? void 0 : i;
    return U.jsx(Uo, { id: _, path: N, labelX: M, labelY: R, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: h, labelBgPadding: b, labelBgBorderRadius: y, style: v, markerEnd: S, markerStart: w, interactionWidth: A });
  });
}
const fz = nv({ isInternal: !1 }), lv = nv({ isInternal: !0 });
fz.displayName = "StraightEdge";
lv.displayName = "StraightEdgeInternal";
function av(n) {
  return W.memo(({ id: i, sourceX: o, sourceY: u, targetX: s, targetY: f, sourcePosition: d = mt.Bottom, targetPosition: g = mt.Top, label: p, labelStyle: h, labelShowBg: b, labelBgStyle: y, labelBgPadding: v, labelBgBorderRadius: S, style: w, markerEnd: A, markerStart: N, pathOptions: M, interactionWidth: R }) => {
    const [_, C, Y] = od({
      sourceX: o,
      sourceY: u,
      sourcePosition: d,
      targetX: s,
      targetY: f,
      targetPosition: g,
      curvature: M?.curvature
    }), q = n.isInternal ? void 0 : i;
    return U.jsx(Uo, { id: q, path: _, labelX: C, labelY: Y, label: p, labelStyle: h, labelShowBg: b, labelBgStyle: y, labelBgPadding: v, labelBgBorderRadius: S, style: w, markerEnd: A, markerStart: N, interactionWidth: R });
  });
}
const dz = av({ isInternal: !1 }), iv = av({ isInternal: !0 });
dz.displayName = "BezierEdge";
iv.displayName = "BezierEdgeInternal";
const rp = {
  default: iv,
  straight: lv,
  step: ev,
  smoothstep: Py,
  simplebezier: Fy
}, cp = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null,
  zIndex: void 0
}, hz = (n, i, o) => o === mt.Left ? n - i : o === mt.Right ? n + i : n, gz = (n, i, o) => o === mt.Top ? n - i : o === mt.Bottom ? n + i : n, sp = "react-flow__edgeupdater";
function fp({ position: n, centerX: i, centerY: o, radius: u = 10, onMouseDown: s, onMouseEnter: f, onMouseOut: d, type: g }) {
  return U.jsx("circle", { onMouseDown: s, onMouseEnter: f, onMouseOut: d, className: re([sp, `${sp}-${g}`]), cx: hz(i, u, n), cy: gz(o, u, n), r: u, stroke: "transparent", fill: "transparent" });
}
function mz({ isReconnectable: n, reconnectRadius: i, edge: o, sourceX: u, sourceY: s, targetX: f, targetY: d, sourcePosition: g, targetPosition: p, onReconnect: h, onReconnectStart: b, onReconnectEnd: y, setReconnecting: v, setUpdateHover: S }) {
  const w = Jt(), A = (C, Y) => {
    if (C.button !== 0)
      return;
    const { autoPanOnConnect: q, domNode: B, connectionMode: Q, connectionRadius: J, lib: ut, onConnectStart: Z, cancelConnection: I, nodeLookup: ot, rfId: T, panBy: V, updateConnection: E } = w.getState(), O = Y.type === "target", L = (z, H) => {
      v(!1), y?.(z, o, Y.type, H);
    }, X = (z) => h?.(o, z), nt = (z, H) => {
      v(!0), b?.(C, o, Y.type), Z?.(z, H);
    };
    Xf.onPointerDown(C.nativeEvent, {
      autoPanOnConnect: q,
      connectionMode: Q,
      connectionRadius: J,
      domNode: B,
      handleId: Y.id,
      nodeId: Y.nodeId,
      nodeLookup: ot,
      isTarget: O,
      edgeUpdaterType: Y.type,
      lib: ut,
      flowId: T,
      cancelConnection: I,
      panBy: V,
      isValidConnection: (...z) => w.getState().isValidConnection?.(...z) ?? !0,
      onConnect: X,
      onConnectStart: nt,
      onConnectEnd: (...z) => w.getState().onConnectEnd?.(...z),
      onReconnectEnd: L,
      updateConnection: E,
      getTransform: () => w.getState().transform,
      getFromHandle: () => w.getState().connection.fromHandle,
      dragThreshold: w.getState().connectionDragThreshold,
      handleDomNode: C.currentTarget
    });
  }, N = (C) => A(C, { nodeId: o.target, id: o.targetHandle ?? null, type: "target" }), M = (C) => A(C, { nodeId: o.source, id: o.sourceHandle ?? null, type: "source" }), R = () => S(!0), _ = () => S(!1);
  return U.jsxs(U.Fragment, { children: [(n === !0 || n === "source") && U.jsx(fp, { position: g, centerX: u, centerY: s, radius: i, onMouseDown: N, onMouseEnter: R, onMouseOut: _, type: "source" }), (n === !0 || n === "target") && U.jsx(fp, { position: p, centerX: f, centerY: d, radius: i, onMouseDown: M, onMouseEnter: R, onMouseOut: _, type: "target" })] });
}
function pz({ id: n, edgesFocusable: i, edgesReconnectable: o, elementsSelectable: u, onClick: s, onDoubleClick: f, onContextMenu: d, onMouseEnter: g, onMouseMove: p, onMouseLeave: h, reconnectRadius: b, onReconnect: y, onReconnectStart: v, onReconnectEnd: S, rfId: w, edgeTypes: A, noPanClassName: N, onError: M, disableKeyboardA11y: R }) {
  let _ = Ot((gt) => gt.edgeLookup.get(n));
  const C = Ot((gt) => gt.defaultEdgeOptions);
  _ = C ? { ...C, ..._ } : _;
  let Y = _.type || "default", q = A?.[Y] || rp[Y];
  q === void 0 && (M?.("011", mn.error011(Y)), Y = "default", q = A?.default || rp.default);
  const B = !!(_.focusable || i && typeof _.focusable > "u"), Q = typeof y < "u" && (_.reconnectable || o && typeof _.reconnectable > "u"), J = !!(_.selectable || u && typeof _.selectable > "u"), ut = W.useRef(null), [Z, I] = W.useState(!1), [ot, T] = W.useState(!1), V = Jt(), { zIndex: E = _.zIndex, sourceX: O, sourceY: L, targetX: X, targetY: nt, sourcePosition: z, targetPosition: H } = Ot(W.useCallback((gt) => {
    const yt = gt.nodeLookup.get(_.source), Et = gt.nodeLookup.get(_.target);
    if (!yt || !Et)
      return cp;
    const Rt = t2({
      id: n,
      sourceNode: yt,
      targetNode: Et,
      sourceHandle: _.sourceHandle || null,
      targetHandle: _.targetHandle || null,
      connectionMode: gt.connectionMode,
      onError: M
    }), $t = Gw({
      selected: _.selected,
      zIndex: _.zIndex,
      sourceNode: yt,
      targetNode: Et,
      elevateOnSelect: gt.elevateEdgesOnSelect,
      zIndexMode: gt.zIndexMode
    });
    return {
      ...Rt || cp,
      zIndex: $t
    };
  }, [_.source, _.target, _.sourceHandle, _.targetHandle, _.selected, _.zIndex]), Kt), P = W.useMemo(() => _.markerStart ? `url('#${Lf(_.markerStart, w)}')` : void 0, [_.markerStart, w]), lt = W.useMemo(() => _.markerEnd ? `url('#${Lf(_.markerEnd, w)}')` : void 0, [_.markerEnd, w]);
  if (_.hidden || O === null || L === null || X === null || nt === null)
    return null;
  const rt = (gt) => {
    const { addSelectedEdges: yt, unselectNodesAndEdges: Et, multiSelectionActive: Rt } = V.getState();
    J && (V.setState({ nodesSelectionActive: !1 }), _.selected && Rt ? (Et({ nodes: [], edges: [_] }), ut.current?.blur()) : yt([n])), s && s(gt, _);
  }, ft = f ? (gt) => {
    f(gt, { ..._ });
  } : void 0, ct = d ? (gt) => {
    d(gt, { ..._ });
  } : void 0, tt = g ? (gt) => {
    g(gt, { ..._ });
  } : void 0, st = p ? (gt) => {
    p(gt, { ..._ });
  } : void 0, St = h ? (gt) => {
    h(gt, { ..._ });
  } : void 0, _t = (gt) => {
    if (!R && ly.includes(gt.key) && J) {
      const { unselectNodesAndEdges: yt, addSelectedEdges: Et } = V.getState();
      gt.key === "Escape" ? (ut.current?.blur(), yt({ edges: [_] })) : Et([n]);
    }
  };
  return U.jsx("svg", { style: { zIndex: E }, children: U.jsxs("g", { className: re([
    "react-flow__edge",
    `react-flow__edge-${Y}`,
    _.className,
    N,
    {
      selected: _.selected,
      animated: _.animated,
      inactive: !J && !s,
      updating: Z,
      selectable: J
    }
  ]), onClick: rt, onDoubleClick: ft, onContextMenu: ct, onMouseEnter: tt, onMouseMove: st, onMouseLeave: St, onKeyDown: B ? _t : void 0, tabIndex: B ? 0 : void 0, role: _.ariaRole ?? (B ? "group" : "img"), "aria-roledescription": "edge", "data-id": n, "data-testid": `rf__edge-${n}`, "aria-label": _.ariaLabel === null ? void 0 : _.ariaLabel || `Edge from ${_.source} to ${_.target}`, "aria-describedby": B ? `${ky}-${w}` : void 0, ref: ut, ..._.domAttributes, children: [!ot && U.jsx(q, { id: n, source: _.source, target: _.target, type: _.type, selected: _.selected, animated: _.animated, selectable: J, deletable: _.deletable ?? !0, label: _.label, labelStyle: _.labelStyle, labelShowBg: _.labelShowBg, labelBgStyle: _.labelBgStyle, labelBgPadding: _.labelBgPadding, labelBgBorderRadius: _.labelBgBorderRadius, sourceX: O, sourceY: L, targetX: X, targetY: nt, sourcePosition: z, targetPosition: H, data: _.data, style: _.style, sourceHandleId: _.sourceHandle, targetHandleId: _.targetHandle, markerStart: P, markerEnd: lt, pathOptions: "pathOptions" in _ ? _.pathOptions : void 0, interactionWidth: _.interactionWidth }), Q && U.jsx(mz, { edge: _, isReconnectable: Q, reconnectRadius: b, onReconnect: y, onReconnectStart: v, onReconnectEnd: S, sourceX: O, sourceY: L, targetX: X, targetY: nt, sourcePosition: z, targetPosition: H, setUpdateHover: I, setReconnecting: T })] }) });
}
var yz = W.memo(pz);
const vz = (n) => ({
  edgesFocusable: n.edgesFocusable,
  edgesReconnectable: n.edgesReconnectable,
  elementsSelectable: n.elementsSelectable,
  connectionMode: n.connectionMode,
  onError: n.onError
});
function ov({ defaultMarkerColor: n, onlyRenderVisibleElements: i, rfId: o, edgeTypes: u, noPanClassName: s, onReconnect: f, onEdgeContextMenu: d, onEdgeMouseEnter: g, onEdgeMouseMove: p, onEdgeMouseLeave: h, onEdgeClick: b, reconnectRadius: y, onEdgeDoubleClick: v, onReconnectStart: S, onReconnectEnd: w, disableKeyboardA11y: A }) {
  const { edgesFocusable: N, edgesReconnectable: M, elementsSelectable: R, onError: _ } = Ot(vz, Kt), C = nz(i);
  return U.jsxs("div", { className: "react-flow__edges", children: [U.jsx(uz, { defaultColor: n, rfId: o }), C.map((Y) => U.jsx(yz, { id: Y, edgesFocusable: N, edgesReconnectable: M, elementsSelectable: R, noPanClassName: s, onReconnect: f, onContextMenu: d, onMouseEnter: g, onMouseMove: p, onMouseLeave: h, onClick: b, reconnectRadius: y, onDoubleClick: v, onReconnectStart: S, onReconnectEnd: w, rfId: o, onError: _, edgeTypes: u, disableKeyboardA11y: A }, Y))] });
}
ov.displayName = "EdgeRenderer";
const bz = W.memo(ov), xz = (n) => `translate(${n.transform[0]}px,${n.transform[1]}px) scale(${n.transform[2]})`;
function _z({ children: n }) {
  const i = Ot(xz);
  return U.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: i }, children: n });
}
function Sz(n) {
  const i = Xr(), o = W.useRef(!1);
  W.useEffect(() => {
    !o.current && i.viewportInitialized && n && (setTimeout(() => n(i), 1), o.current = !0);
  }, [n, i.viewportInitialized]);
}
const wz = (n) => n.panZoom?.syncViewport;
function Ez(n) {
  const i = Ot(wz), o = Jt();
  return W.useEffect(() => {
    n && (i?.(n), o.setState({ transform: [n.x, n.y, n.zoom] }));
  }, [n, i]), null;
}
function zz(n) {
  return n.connection.inProgress ? { ...n.connection, to: Bo(n.connection.to, n.transform) } : { ...n.connection };
}
function Mz(n) {
  return zz;
}
function Nz(n) {
  const i = Mz();
  return Ot(i, Kt);
}
const Az = (n) => ({
  nodesConnectable: n.nodesConnectable,
  isValid: n.connection.isValid,
  inProgress: n.connection.inProgress,
  width: n.width,
  height: n.height
});
function Cz({ containerStyle: n, style: i, type: o, component: u }) {
  const { nodesConnectable: s, width: f, height: d, isValid: g, inProgress: p } = Ot(Az, Kt);
  return !(f && s && p) ? null : U.jsx("svg", { style: n, width: f, height: d, className: "react-flow__connectionline react-flow__container", children: U.jsx("g", { className: re(["react-flow__connection", oy(g)]), children: U.jsx(uv, { style: i, type: o, CustomComponent: u, isValid: g }) }) });
}
const uv = ({ style: n, type: i = Cl.Bezier, CustomComponent: o, isValid: u }) => {
  const { inProgress: s, from: f, fromNode: d, fromHandle: g, fromPosition: p, to: h, toNode: b, toHandle: y, toPosition: v, pointer: S } = Nz();
  if (!s)
    return;
  if (o)
    return U.jsx(o, { connectionLineType: i, connectionLineStyle: n, fromNode: d, fromHandle: g, fromX: f.x, fromY: f.y, toX: h.x, toY: h.y, fromPosition: p, toPosition: v, connectionStatus: oy(u), toNode: b, toHandle: y, pointer: S });
  let w = "";
  const A = {
    sourceX: f.x,
    sourceY: f.y,
    sourcePosition: p,
    targetX: h.x,
    targetY: h.y,
    targetPosition: v
  };
  switch (i) {
    case Cl.Bezier:
      [w] = od(A);
      break;
    case Cl.SimpleBezier:
      [w] = Ky(A);
      break;
    case Cl.Step:
      [w] = Yf({
        ...A,
        borderRadius: 0
      });
      break;
    case Cl.SmoothStep:
      [w] = Yf(A);
      break;
    default:
      [w] = xy(A);
  }
  return U.jsx("path", { d: w, fill: "none", className: "react-flow__connection-path", style: n });
};
uv.displayName = "ConnectionLine";
const Tz = {};
function dp(n = Tz) {
  W.useRef(n), Jt(), W.useEffect(() => {
  }, [n]);
}
function Dz() {
  Jt(), W.useRef(!1), W.useEffect(() => {
  }, []);
}
function rv({ nodeTypes: n, edgeTypes: i, onInit: o, onNodeClick: u, onEdgeClick: s, onNodeDoubleClick: f, onEdgeDoubleClick: d, onNodeMouseEnter: g, onNodeMouseMove: p, onNodeMouseLeave: h, onNodeContextMenu: b, onSelectionContextMenu: y, onSelectionStart: v, onSelectionEnd: S, connectionLineType: w, connectionLineStyle: A, connectionLineComponent: N, connectionLineContainerStyle: M, selectionKeyCode: R, selectionOnDrag: _, selectionMode: C, multiSelectionKeyCode: Y, panActivationKeyCode: q, zoomActivationKeyCode: B, deleteKeyCode: Q, onlyRenderVisibleElements: J, elementsSelectable: ut, defaultViewport: Z, translateExtent: I, minZoom: ot, maxZoom: T, preventScrolling: V, defaultMarkerColor: E, zoomOnScroll: O, zoomOnPinch: L, panOnScroll: X, panOnScrollSpeed: nt, panOnScrollMode: z, zoomOnDoubleClick: H, panOnDrag: P, autoPanOnSelection: lt, onPaneClick: rt, onPaneMouseEnter: ft, onPaneMouseMove: ct, onPaneMouseLeave: tt, onPaneScroll: st, onPaneContextMenu: St, paneClickDistance: _t, nodeClickDistance: gt, onEdgeContextMenu: yt, onEdgeMouseEnter: Et, onEdgeMouseMove: Rt, onEdgeMouseLeave: $t, reconnectRadius: pe, onReconnect: Qe, onReconnectStart: we, onReconnectEnd: Ee, noDragClassName: He, noWheelClassName: Dl, noPanClassName: Mn, disableKeyboardA11y: It, nodeExtent: ke, rfId: Ke, viewport: Je, onViewportChange: Fe }) {
  return dp(n), dp(i), Dz(), Sz(o), Ez(Je), U.jsx(GE, { onPaneClick: rt, onPaneMouseEnter: ft, onPaneMouseMove: ct, onPaneMouseLeave: tt, onPaneContextMenu: St, onPaneScroll: st, paneClickDistance: _t, deleteKeyCode: Q, selectionKeyCode: R, selectionOnDrag: _, selectionMode: C, onSelectionStart: v, onSelectionEnd: S, multiSelectionKeyCode: Y, panActivationKeyCode: q, zoomActivationKeyCode: B, elementsSelectable: ut, zoomOnScroll: O, zoomOnPinch: L, zoomOnDoubleClick: H, panOnScroll: X, panOnScrollSpeed: nt, panOnScrollMode: z, panOnDrag: P, autoPanOnSelection: lt, defaultViewport: Z, translateExtent: I, minZoom: ot, maxZoom: T, onSelectionContextMenu: y, preventScrolling: V, noDragClassName: He, noWheelClassName: Dl, noPanClassName: Mn, disableKeyboardA11y: It, onViewportChange: Fe, isControlledViewport: !!Je, children: U.jsxs(_z, { children: [U.jsx(bz, { edgeTypes: i, onEdgeClick: s, onEdgeDoubleClick: d, onReconnect: Qe, onReconnectStart: we, onReconnectEnd: Ee, onlyRenderVisibleElements: J, onEdgeContextMenu: yt, onEdgeMouseEnter: Et, onEdgeMouseMove: Rt, onEdgeMouseLeave: $t, reconnectRadius: pe, defaultMarkerColor: E, noPanClassName: Mn, disableKeyboardA11y: It, rfId: Ke }), U.jsx(Cz, { style: A, type: w, component: N, containerStyle: M }), U.jsx("div", { className: "react-flow__edgelabel-renderer" }), U.jsx(ez, { nodeTypes: n, onNodeClick: u, onNodeDoubleClick: f, onNodeMouseEnter: g, onNodeMouseMove: p, onNodeMouseLeave: h, onNodeContextMenu: b, nodeClickDistance: gt, onlyRenderVisibleElements: J, noPanClassName: Mn, noDragClassName: He, disableKeyboardA11y: It, nodeExtent: ke, rfId: Ke }), U.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
rv.displayName = "GraphView";
const Oz = W.memo(rv), Rz = dy(), hp = ({ nodes: n, edges: i, defaultNodes: o, defaultEdges: u, width: s, height: f, fitView: d, fitViewOptions: g, minZoom: p = 0.5, maxZoom: h = 2, nodeOrigin: b, nodeExtent: y, zIndexMode: v = "basic" } = {}) => {
  const S = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), M = u ?? i ?? [], R = o ?? n ?? [], _ = b ?? [0, 0], C = y ?? Eo;
  wy(A, N, M);
  const { nodesInitialized: Y } = Vf(R, S, w, {
    nodeOrigin: _,
    nodeExtent: C,
    zIndexMode: v
  });
  let q = [0, 0, 1];
  if (d && s && f) {
    const B = Ho(S, {
      filter: (Z) => !!((Z.width || Z.initialWidth) && (Z.height || Z.initialHeight))
    }), { x: Q, y: J, zoom: ut } = ad(B, s, f, p, h, g?.padding ?? 0.1);
    q = [Q, J, ut];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: f ?? 0,
    transform: q,
    nodes: R,
    nodesInitialized: Y,
    nodeLookup: S,
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
    translateExtent: Eo,
    nodeExtent: C,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: ii.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: _,
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
    connection: { ...iy },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: Rz,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: ay,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, Hz = ({ nodes: n, edges: i, defaultNodes: o, defaultEdges: u, width: s, height: f, fitView: d, fitViewOptions: g, minZoom: p, maxZoom: h, nodeOrigin: b, nodeExtent: y, zIndexMode: v }) => X2((S, w) => {
  async function A() {
    const { nodeLookup: N, panZoom: M, fitViewOptions: R, fitViewResolver: _, width: C, height: Y, minZoom: q, maxZoom: B } = w();
    M && (await jw({
      nodes: N,
      width: C,
      height: Y,
      panZoom: M,
      minZoom: q,
      maxZoom: B
    }, R), _?.resolve(!0), S({ fitViewResolver: null }));
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
      nodeOrigin: b,
      nodeExtent: y,
      defaultNodes: o,
      defaultEdges: u,
      zIndexMode: v
    }),
    setNodes: (N) => {
      const { nodeLookup: M, parentLookup: R, nodeOrigin: _, elevateNodesOnSelect: C, fitViewQueued: Y, zIndexMode: q, nodesSelectionActive: B } = w(), { nodesInitialized: Q, hasSelectedNodes: J } = Vf(N, M, R, {
        nodeOrigin: _,
        nodeExtent: y,
        elevateNodesOnSelect: C,
        checkEquality: !0,
        zIndexMode: q
      }), ut = B && J;
      Y && Q ? (A(), S({
        nodes: N,
        nodesInitialized: Q,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: ut
      })) : S({ nodes: N, nodesInitialized: Q, nodesSelectionActive: ut });
    },
    setEdges: (N) => {
      const { connectionLookup: M, edgeLookup: R } = w();
      wy(M, R, N), S({ edges: N });
    },
    setDefaultNodesAndEdges: (N, M) => {
      if (N) {
        const { setNodes: R } = w();
        R(N), S({ hasDefaultNodes: !0 });
      }
      if (M) {
        const { setEdges: R } = w();
        R(M), S({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (N) => {
      const { triggerNodeChanges: M, nodeLookup: R, parentLookup: _, domNode: C, nodeOrigin: Y, nodeExtent: q, debug: B, fitViewQueued: Q, zIndexMode: J } = w(), { changes: ut, updatedInternals: Z } = r2(N, R, _, C, Y, q, J);
      Z && (a2(R, _, { nodeOrigin: Y, nodeExtent: q, zIndexMode: J }), Q ? (A(), S({ fitViewQueued: !1, fitViewOptions: void 0 })) : S({}), ut?.length > 0 && (B && console.log("React Flow: trigger node changes", ut), M?.(ut)));
    },
    updateNodePositions: (N, M = !1) => {
      const R = [];
      let _ = [];
      const { nodeLookup: C, triggerNodeChanges: Y, connection: q, updateConnection: B, onNodesChangeMiddlewareMap: Q } = w();
      for (const [J, ut] of N) {
        const Z = C.get(J), I = !!(Z?.expandParent && Z?.parentId && ut?.position), ot = {
          id: J,
          type: "position",
          position: I ? {
            x: Math.max(0, ut.position.x),
            y: Math.max(0, ut.position.y)
          } : ut.position,
          dragging: M
        };
        if (Z && q.inProgress && q.fromNode.id === Z.id) {
          const T = ua(Z, q.fromHandle, mt.Left, !0);
          B({ ...q, from: T });
        }
        I && Z.parentId && R.push({
          id: J,
          parentId: Z.parentId,
          rect: {
            ...ut.internals.positionAbsolute,
            width: ut.measured.width ?? 0,
            height: ut.measured.height ?? 0
          }
        }), _.push(ot);
      }
      if (R.length > 0) {
        const { parentLookup: J, nodeOrigin: ut } = w(), Z = fd(R, C, J, ut);
        _.push(...Z);
      }
      for (const J of Q.values())
        _ = J(_);
      Y(_);
    },
    triggerNodeChanges: (N) => {
      const { onNodesChange: M, setNodes: R, nodes: _, hasDefaultNodes: C, debug: Y } = w();
      if (N?.length) {
        if (C) {
          const q = fE(N, _);
          R(q);
        }
        Y && console.log("React Flow: trigger node changes", N), M?.(N);
      }
    },
    triggerEdgeChanges: (N) => {
      const { onEdgesChange: M, setEdges: R, edges: _, hasDefaultEdges: C, debug: Y } = w();
      if (N?.length) {
        if (C) {
          const q = dE(N, _);
          R(q);
        }
        Y && console.log("React Flow: trigger edge changes", N), M?.(N);
      }
    },
    addSelectedNodes: (N) => {
      const { multiSelectionActive: M, edgeLookup: R, nodeLookup: _, triggerNodeChanges: C, triggerEdgeChanges: Y } = w();
      if (M) {
        const q = N.map((B) => Il(B, !0));
        C(q);
        return;
      }
      C(ti(_, /* @__PURE__ */ new Set([...N]), !0)), Y(ti(R));
    },
    addSelectedEdges: (N) => {
      const { multiSelectionActive: M, edgeLookup: R, nodeLookup: _, triggerNodeChanges: C, triggerEdgeChanges: Y } = w();
      if (M) {
        const q = N.map((B) => Il(B, !0));
        Y(q);
        return;
      }
      Y(ti(R, /* @__PURE__ */ new Set([...N]))), C(ti(_, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: N, edges: M } = {}) => {
      const { edges: R, nodes: _, nodeLookup: C, triggerNodeChanges: Y, triggerEdgeChanges: q } = w(), B = N || _, Q = M || R, J = [];
      for (const Z of B) {
        if (!Z.selected)
          continue;
        const I = C.get(Z.id);
        I && (I.selected = !1), J.push(Il(Z.id, !1));
      }
      const ut = [];
      for (const Z of Q)
        Z.selected && ut.push(Il(Z.id, !1));
      Y(J), q(ut);
    },
    setMinZoom: (N) => {
      const { panZoom: M, maxZoom: R } = w();
      M?.setScaleExtent([N, R]), S({ minZoom: N });
    },
    setMaxZoom: (N) => {
      const { panZoom: M, minZoom: R } = w();
      M?.setScaleExtent([R, N]), S({ maxZoom: N });
    },
    setTranslateExtent: (N) => {
      w().panZoom?.setTranslateExtent(N), S({ translateExtent: N });
    },
    resetSelectedElements: () => {
      const { edges: N, nodes: M, triggerNodeChanges: R, triggerEdgeChanges: _, elementsSelectable: C } = w();
      if (!C)
        return;
      const Y = M.reduce((B, Q) => Q.selected ? [...B, Il(Q.id, !1)] : B, []), q = N.reduce((B, Q) => Q.selected ? [...B, Il(Q.id, !1)] : B, []);
      R(Y), _(q);
    },
    setNodeExtent: (N) => {
      const { nodes: M, nodeLookup: R, parentLookup: _, nodeOrigin: C, elevateNodesOnSelect: Y, nodeExtent: q, zIndexMode: B } = w();
      N[0][0] === q[0][0] && N[0][1] === q[0][1] && N[1][0] === q[1][0] && N[1][1] === q[1][1] || (Vf(M, R, _, {
        nodeOrigin: C,
        nodeExtent: N,
        elevateNodesOnSelect: Y,
        checkEquality: !1,
        zIndexMode: B
      }), S({ nodeExtent: N }));
    },
    panBy: (N) => {
      const { transform: M, width: R, height: _, panZoom: C, translateExtent: Y } = w();
      return c2({ delta: N, panZoom: C, transform: M, translateExtent: Y, width: R, height: _ });
    },
    setCenter: async (N, M, R) => {
      const { width: _, height: C, maxZoom: Y, panZoom: q } = w();
      if (!q)
        return !1;
      const B = typeof R?.zoom < "u" ? R.zoom : Y;
      return await q.setViewport({
        x: _ / 2 - N * B,
        y: C / 2 - M * B,
        zoom: B
      }, { duration: R?.duration, ease: R?.ease, interpolate: R?.interpolate }), !0;
    },
    cancelConnection: () => {
      S({
        connection: { ...iy }
      });
    },
    updateConnection: (N) => {
      S({ connection: N });
    },
    reset: () => S({ ...hp() })
  };
}, Object.is);
function cv({ initialNodes: n, initialEdges: i, defaultNodes: o, defaultEdges: u, initialWidth: s, initialHeight: f, initialMinZoom: d, initialMaxZoom: g, initialFitViewOptions: p, fitView: h, nodeOrigin: b, nodeExtent: y, zIndexMode: v, children: S }) {
  const [w] = W.useState(() => Hz({
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
    nodeOrigin: b,
    nodeExtent: y,
    zIndexMode: v
  }));
  return U.jsx(Z2, { value: w, children: U.jsx(vE, { children: U.jsx(RE, { children: S }) }) });
}
function kz({ children: n, nodes: i, edges: o, defaultNodes: u, defaultEdges: s, width: f, height: d, fitView: g, fitViewOptions: p, minZoom: h, maxZoom: b, nodeOrigin: y, nodeExtent: v, zIndexMode: S }) {
  return W.useContext(Lr) ? U.jsx(U.Fragment, { children: n }) : U.jsx(cv, { initialNodes: i, initialEdges: o, defaultNodes: u, defaultEdges: s, initialWidth: f, initialHeight: d, fitView: g, initialFitViewOptions: p, initialMinZoom: h, initialMaxZoom: b, nodeOrigin: y, nodeExtent: v, zIndexMode: S, children: n });
}
const Bz = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function Uz({ nodes: n, edges: i, defaultNodes: o, defaultEdges: u, className: s, nodeTypes: f, edgeTypes: d, onNodeClick: g, onEdgeClick: p, onInit: h, onMove: b, onMoveStart: y, onMoveEnd: v, onConnect: S, onConnectStart: w, onConnectEnd: A, onClickConnectStart: N, onClickConnectEnd: M, onNodeMouseEnter: R, onNodeMouseMove: _, onNodeMouseLeave: C, onNodeContextMenu: Y, onNodeDoubleClick: q, onNodeDragStart: B, onNodeDrag: Q, onNodeDragStop: J, onNodesDelete: ut, onEdgesDelete: Z, onDelete: I, onSelectionChange: ot, onSelectionDragStart: T, onSelectionDrag: V, onSelectionDragStop: E, onSelectionContextMenu: O, onSelectionStart: L, onSelectionEnd: X, onBeforeDelete: nt, connectionMode: z, connectionLineType: H = Cl.Bezier, connectionLineStyle: P, connectionLineComponent: lt, connectionLineContainerStyle: rt, deleteKeyCode: ft = "Backspace", selectionKeyCode: ct = "Shift", selectionOnDrag: tt = !1, selectionMode: st = zo.Full, panActivationKeyCode: St = "Space", multiSelectionKeyCode: _t = No() ? "Meta" : "Control", zoomActivationKeyCode: gt = No() ? "Meta" : "Control", snapToGrid: yt, snapGrid: Et, onlyRenderVisibleElements: Rt = !1, selectNodesOnDrag: $t, nodesDraggable: pe, autoPanOnNodeFocus: Qe, nodesConnectable: we, nodesFocusable: Ee, nodeOrigin: He = By, edgesFocusable: Dl, edgesReconnectable: Mn, elementsSelectable: It = !0, defaultViewport: ke = aE, minZoom: Ke = 0.5, maxZoom: Je = 2, translateExtent: Fe = Eo, preventScrolling: Kr = !0, nodeExtent: ca, defaultMarkerColor: Jr = "#b1b1b7", zoomOnScroll: Fr = !0, zoomOnPinch: Ol = !0, panOnScroll: xe = !1, panOnScrollSpeed: yn = 0.5, panOnScrollMode: _e = na.Free, zoomOnDoubleClick: Wr = !0, panOnDrag: Ir = !0, onPaneClick: Pr, onPaneMouseEnter: sa, onPaneMouseMove: fa, onPaneMouseLeave: da, onPaneScroll: Nn, onPaneContextMenu: ha, paneClickDistance: Rl = 1, nodeClickDistance: tc = 0, children: qo, onReconnect: fi, onReconnectStart: Hl, onReconnectEnd: ec, onEdgeContextMenu: jo, onEdgeDoubleClick: Yo, onEdgeMouseEnter: Lo, onEdgeMouseMove: di, onEdgeMouseLeave: hi, reconnectRadius: Vo = 10, onNodesChange: Xo, onEdgesChange: vn, noDragClassName: ce = "nodrag", noWheelClassName: ye = "nowheel", noPanClassName: An = "nopan", fitView: ga, fitViewOptions: $o, connectOnClick: nc, attributionPosition: Zo, proOptions: kl, defaultEdgeOptions: gi, elevateNodesOnSelect: In = !0, elevateEdgesOnSelect: Pn = !1, disableKeyboardA11y: tl = !1, autoPanOnConnect: el, autoPanOnNodeDrag: ne, autoPanOnSelection: Go = !0, autoPanSpeed: Qo, connectionRadius: Cn, isValidConnection: nl, onError: lc, style: Ko, id: mi, nodeDragThreshold: ac, connectionDragThreshold: ma, viewport: pa, onViewportChange: un, width: ze, height: Jo, colorMode: ic = "light", debug: pi, onScroll: yi, ariaLabelConfig: ya, zIndexMode: Fo = "basic", ...Me }, vi) {
  const va = mi || "1", bi = rE(ic), ll = W.useCallback((xi) => {
    xi.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), yi?.(xi);
  }, [yi]);
  return U.jsx("div", { "data-testid": "rf__wrapper", ...Me, onScroll: ll, style: { ...Ko, ...Bz }, ref: vi, className: re(["react-flow", s, bi]), id: mi, role: "application", children: U.jsxs(kz, { nodes: n, edges: i, width: ze, height: Jo, fitView: ga, fitViewOptions: $o, minZoom: Ke, maxZoom: Je, nodeOrigin: He, nodeExtent: ca, zIndexMode: Fo, children: [U.jsx(uE, { nodes: n, edges: i, defaultNodes: o, defaultEdges: u, onConnect: S, onConnectStart: w, onConnectEnd: A, onClickConnectStart: N, onClickConnectEnd: M, nodesDraggable: pe, autoPanOnNodeFocus: Qe, nodesConnectable: we, nodesFocusable: Ee, edgesFocusable: Dl, edgesReconnectable: Mn, elementsSelectable: It, elevateNodesOnSelect: In, elevateEdgesOnSelect: Pn, minZoom: Ke, maxZoom: Je, nodeExtent: ca, onNodesChange: Xo, onEdgesChange: vn, snapToGrid: yt, snapGrid: Et, connectionMode: z, translateExtent: Fe, connectOnClick: nc, defaultEdgeOptions: gi, fitView: ga, fitViewOptions: $o, onNodesDelete: ut, onEdgesDelete: Z, onDelete: I, onNodeDragStart: B, onNodeDrag: Q, onNodeDragStop: J, onSelectionDrag: V, onSelectionDragStart: T, onSelectionDragStop: E, onMove: b, onMoveStart: y, onMoveEnd: v, noPanClassName: An, nodeOrigin: He, rfId: va, autoPanOnConnect: el, autoPanOnNodeDrag: ne, autoPanSpeed: Qo, onError: lc, connectionRadius: Cn, isValidConnection: nl, selectNodesOnDrag: $t, nodeDragThreshold: ac, connectionDragThreshold: ma, onBeforeDelete: nt, debug: pi, ariaLabelConfig: ya, zIndexMode: Fo }), U.jsx(Oz, { onInit: h, onNodeClick: g, onEdgeClick: p, onNodeMouseEnter: R, onNodeMouseMove: _, onNodeMouseLeave: C, onNodeContextMenu: Y, onNodeDoubleClick: q, nodeTypes: f, edgeTypes: d, connectionLineType: H, connectionLineStyle: P, connectionLineComponent: lt, connectionLineContainerStyle: rt, selectionKeyCode: ct, selectionOnDrag: tt, selectionMode: st, deleteKeyCode: ft, multiSelectionKeyCode: _t, panActivationKeyCode: St, zoomActivationKeyCode: gt, onlyRenderVisibleElements: Rt, defaultViewport: ke, translateExtent: Fe, minZoom: Ke, maxZoom: Je, preventScrolling: Kr, zoomOnScroll: Fr, zoomOnPinch: Ol, zoomOnDoubleClick: Wr, panOnScroll: xe, panOnScrollSpeed: yn, panOnScrollMode: _e, panOnDrag: Ir, autoPanOnSelection: Go, onPaneClick: Pr, onPaneMouseEnter: sa, onPaneMouseMove: fa, onPaneMouseLeave: da, onPaneScroll: Nn, onPaneContextMenu: ha, paneClickDistance: Rl, nodeClickDistance: tc, onSelectionContextMenu: O, onSelectionStart: L, onSelectionEnd: X, onReconnect: fi, onReconnectStart: Hl, onReconnectEnd: ec, onEdgeContextMenu: jo, onEdgeDoubleClick: Yo, onEdgeMouseEnter: Lo, onEdgeMouseMove: di, onEdgeMouseLeave: hi, reconnectRadius: Vo, defaultMarkerColor: Jr, noDragClassName: ce, noWheelClassName: ye, noPanClassName: An, rfId: va, disableKeyboardA11y: tl, nodeExtent: ca, viewport: pa, onViewportChange: un }), U.jsx(lE, { onSelectionChange: ot }), qo, U.jsx(I2, { proOptions: kl, position: Zo }), U.jsx(W2, { rfId: va, disableKeyboardA11y: tl })] }) });
}
var qz = qy(Uz);
const jz = (n) => n.domNode?.querySelector(".react-flow__edgelabel-renderer");
function Yz({ children: n }) {
  const i = Ot(jz);
  return i ? $2.createPortal(n, i) : null;
}
function Lz({ dimensions: n, lineWidth: i, variant: o, className: u }) {
  return U.jsx("path", { strokeWidth: i, d: `M${n[0] / 2} 0 V${n[1]} M0 ${n[1] / 2} H${n[0]}`, className: re(["react-flow__background-pattern", o, u]) });
}
function Vz({ radius: n, className: i }) {
  return U.jsx("circle", { cx: n, cy: n, r: n, className: re(["react-flow__background-pattern", "dots", i]) });
}
var Jn;
(function(n) {
  n.Lines = "lines", n.Dots = "dots", n.Cross = "cross";
})(Jn || (Jn = {}));
const Xz = {
  [Jn.Dots]: 1,
  [Jn.Lines]: 1,
  [Jn.Cross]: 6
}, $z = (n) => ({ transform: n.transform, patternId: `pattern-${n.rfId}` });
function sv({
  id: n,
  variant: i = Jn.Dots,
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
  patternClassName: b
}) {
  const y = W.useRef(null), { transform: v, patternId: S } = Ot($z, Kt), w = u || Xz[i], A = i === Jn.Dots, N = i === Jn.Cross, M = Array.isArray(o) ? o : [o, o], R = [M[0] * v[2] || 1, M[1] * v[2] || 1], _ = w * v[2], C = Array.isArray(f) ? f : [f, f], Y = N ? [_, _] : R, q = [
    C[0] * v[2] || 1 + Y[0] / 2,
    C[1] * v[2] || 1 + Y[1] / 2
  ], B = `${S}${n || ""}`;
  return U.jsxs("svg", { className: re(["react-flow__background", h]), style: {
    ...p,
    ...$r,
    "--xy-background-color-props": g,
    "--xy-background-pattern-color-props": d
  }, ref: y, "data-testid": "rf__background", children: [U.jsx("pattern", { id: B, x: v[0] % R[0], y: v[1] % R[1], width: R[0], height: R[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${q[0]},-${q[1]})`, children: A ? U.jsx(Vz, { radius: _ / 2, className: b }) : U.jsx(Lz, { dimensions: Y, lineWidth: s, variant: i, className: b }) }), U.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${B})` })] });
}
sv.displayName = "Background";
const Zz = W.memo(sv);
function Gz() {
  return U.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: U.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function Qz() {
  return U.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: U.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function Kz() {
  return U.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: U.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function Jz() {
  return U.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: U.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function Fz() {
  return U.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: U.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function gr({ children: n, className: i, ...o }) {
  return U.jsx("button", { type: "button", className: re(["react-flow__controls-button", i]), ...o, children: n });
}
const Wz = (n) => ({
  isInteractive: n.nodesDraggable || n.nodesConnectable || n.elementsSelectable,
  minZoomReached: n.transform[2] <= n.minZoom,
  maxZoomReached: n.transform[2] >= n.maxZoom,
  ariaLabelConfig: n.ariaLabelConfig
});
function fv({ style: n, showZoom: i = !0, showFitView: o = !0, showInteractive: u = !0, fitViewOptions: s, onZoomIn: f, onZoomOut: d, onFitView: g, onInteractiveChange: p, className: h, children: b, position: y = "bottom-left", orientation: v = "vertical", "aria-label": S }) {
  const w = Jt(), { isInteractive: A, minZoomReached: N, maxZoomReached: M, ariaLabelConfig: R } = Ot(Wz, Kt), { zoomIn: _, zoomOut: C, fitView: Y } = Xr(), q = () => {
    _(), f?.();
  }, B = () => {
    C(), d?.();
  }, Q = () => {
    Y(s), g?.();
  }, J = () => {
    w.setState({
      nodesDraggable: !A,
      nodesConnectable: !A,
      elementsSelectable: !A
    }), p?.(!A);
  }, ut = v === "horizontal" ? "horizontal" : "vertical";
  return U.jsxs(Vr, { className: re(["react-flow__controls", ut, h]), position: y, style: n, "data-testid": "rf__controls", "aria-label": S ?? R["controls.ariaLabel"], children: [i && U.jsxs(U.Fragment, { children: [U.jsx(gr, { onClick: q, className: "react-flow__controls-zoomin", title: R["controls.zoomIn.ariaLabel"], "aria-label": R["controls.zoomIn.ariaLabel"], disabled: M, children: U.jsx(Gz, {}) }), U.jsx(gr, { onClick: B, className: "react-flow__controls-zoomout", title: R["controls.zoomOut.ariaLabel"], "aria-label": R["controls.zoomOut.ariaLabel"], disabled: N, children: U.jsx(Qz, {}) })] }), o && U.jsx(gr, { className: "react-flow__controls-fitview", onClick: Q, title: R["controls.fitView.ariaLabel"], "aria-label": R["controls.fitView.ariaLabel"], children: U.jsx(Kz, {}) }), u && U.jsx(gr, { className: "react-flow__controls-interactive", onClick: J, title: R["controls.interactive.ariaLabel"], "aria-label": R["controls.interactive.ariaLabel"], children: A ? U.jsx(Fz, {}) : U.jsx(Jz, {}) }), b] });
}
fv.displayName = "Controls";
const Iz = W.memo(fv);
function Pz({ id: n, x: i, y: o, width: u, height: s, style: f, color: d, strokeColor: g, strokeWidth: p, className: h, borderRadius: b, shapeRendering: y, selected: v, onClick: S }) {
  const { background: w, backgroundColor: A } = f || {}, N = d || w || A;
  return U.jsx("rect", { className: re(["react-flow__minimap-node", { selected: v }, h]), x: i, y: o, rx: b, ry: b, width: u, height: s, style: {
    fill: N,
    stroke: g,
    strokeWidth: p
  }, shapeRendering: y, onClick: S ? (M) => S(M, n) : void 0 });
}
const t3 = W.memo(Pz), e3 = (n) => n.nodes.map((i) => i.id), Cf = (n) => n instanceof Function ? n : () => n;
function n3({
  nodeStrokeColor: n,
  nodeColor: i,
  nodeClassName: o = "",
  nodeBorderRadius: u = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: f = t3,
  onClick: d
}) {
  const g = Ot(e3, Kt), p = Cf(i), h = Cf(n), b = Cf(o), y = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return U.jsx(U.Fragment, { children: g.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    U.jsx(a3, { id: v, nodeColorFunc: p, nodeStrokeColorFunc: h, nodeClassNameFunc: b, nodeBorderRadius: u, nodeStrokeWidth: s, NodeComponent: f, onClick: d, shapeRendering: y }, v)
  )) });
}
function l3({ id: n, nodeColorFunc: i, nodeStrokeColorFunc: o, nodeClassNameFunc: u, nodeBorderRadius: s, nodeStrokeWidth: f, shapeRendering: d, NodeComponent: g, onClick: p }) {
  const { node: h, x: b, y, width: v, height: S } = Ot((w) => {
    const A = w.nodeLookup.get(n);
    if (!A)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const N = A.internals.userNode, { x: M, y: R } = A.internals.positionAbsolute, { width: _, height: C } = Wn(N);
    return {
      node: N,
      x: M,
      y: R,
      width: _,
      height: C
    };
  }, Kt);
  return !h || h.hidden || !hy(h) ? null : U.jsx(g, { x: b, y, width: v, height: S, style: h.style, selected: !!h.selected, className: u(h), color: i(h), borderRadius: s, strokeColor: o(h), strokeWidth: f, shapeRendering: d, onClick: p, id: h.id });
}
const a3 = W.memo(l3);
var i3 = W.memo(n3);
const o3 = 200, u3 = 150, r3 = (n) => !n.hidden, c3 = (n) => {
  const i = {
    x: -n.transform[0] / n.transform[2],
    y: -n.transform[1] / n.transform[2],
    width: n.width / n.transform[2],
    height: n.height / n.transform[2]
  };
  return {
    viewBB: i,
    boundingRect: n.nodeLookup.size > 0 ? sy(Ho(n.nodeLookup, { filter: r3 }), i) : i,
    rfId: n.rfId,
    panZoom: n.panZoom,
    translateExtent: n.translateExtent,
    flowWidth: n.width,
    flowHeight: n.height,
    ariaLabelConfig: n.ariaLabelConfig
  };
}, s3 = "react-flow__minimap-desc";
function dv({
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
  maskStrokeColor: b,
  maskStrokeWidth: y,
  position: v = "bottom-right",
  onClick: S,
  onNodeClick: w,
  pannable: A = !1,
  zoomable: N = !1,
  ariaLabel: M,
  inversePan: R,
  zoomStep: _ = 1,
  offsetScale: C = 5
}) {
  const Y = Jt(), q = W.useRef(null), { boundingRect: B, viewBB: Q, rfId: J, panZoom: ut, translateExtent: Z, flowWidth: I, flowHeight: ot, ariaLabelConfig: T } = Ot(c3, Kt), V = n?.width ?? o3, E = n?.height ?? u3, O = B.width / V, L = B.height / E, X = Math.max(O, L), nt = X * V, z = X * E, H = C * X, P = B.x - (nt - B.width) / 2 - H, lt = B.y - (z - B.height) / 2 - H, rt = nt + H * 2, ft = z + H * 2, ct = `${s3}-${J}`, tt = W.useRef(0), st = W.useRef();
  tt.current = X, W.useEffect(() => {
    if (q.current && ut)
      return st.current = v2({
        domNode: q.current,
        panZoom: ut,
        getTransform: () => Y.getState().transform,
        getViewScale: () => tt.current
      }), () => {
        st.current?.destroy();
      };
  }, [ut]), W.useEffect(() => {
    st.current?.update({
      translateExtent: Z,
      width: I,
      height: ot,
      inversePan: R,
      pannable: A,
      zoomStep: _,
      zoomable: N
    });
  }, [A, N, R, _, Z, I, ot]);
  const St = S ? (yt) => {
    const [Et, Rt] = st.current?.pointer(yt) || [0, 0];
    S(yt, { x: Et, y: Rt });
  } : void 0, _t = w ? W.useCallback((yt, Et) => {
    const Rt = Y.getState().nodeLookup.get(Et).internals.userNode;
    w(yt, Rt);
  }, []) : void 0, gt = M ?? T["minimap.ariaLabel"];
  return U.jsx(Vr, { position: v, style: {
    ...n,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof h == "string" ? h : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof b == "string" ? b : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof y == "number" ? y * X : void 0,
    "--xy-minimap-node-background-color-props": typeof u == "string" ? u : void 0,
    "--xy-minimap-node-stroke-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-width-props": typeof d == "number" ? d : void 0
  }, className: re(["react-flow__minimap", i]), "data-testid": "rf__minimap", children: U.jsxs("svg", { width: V, height: E, viewBox: `${P} ${lt} ${rt} ${ft}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": ct, ref: q, onClick: St, children: [gt && U.jsx("title", { id: ct, children: gt }), U.jsx(i3, { onClick: _t, nodeColor: u, nodeStrokeColor: o, nodeBorderRadius: f, nodeClassName: s, nodeStrokeWidth: d, nodeComponent: g }), U.jsx("path", { className: "react-flow__minimap-mask", d: `M${P - H},${lt - H}h${rt + H * 2}v${ft + H * 2}h${-rt - H * 2}z
        M${Q.x},${Q.y}h${Q.width}v${Q.height}h${-Q.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
dv.displayName = "MiniMap";
W.memo(dv);
const f3 = (n) => (i) => n ? `${Math.max(1 / i.transform[2], 1)}` : void 0, d3 = {
  [ri.Line]: "right",
  [ri.Handle]: "bottom-right"
};
function h3({ nodeId: n, position: i, variant: o = ri.Handle, className: u, style: s = void 0, children: f, color: d, minWidth: g = 10, minHeight: p = 10, maxWidth: h = Number.MAX_VALUE, maxHeight: b = Number.MAX_VALUE, keepAspectRatio: y = !1, resizeDirection: v, autoScale: S = !0, shouldResize: w, onResizeStart: A, onResize: N, onResizeEnd: M }) {
  const R = Vy(), _ = typeof n == "string" ? n : R, C = Jt(), Y = W.useRef(null), q = o === ri.Handle, B = Ot(W.useCallback(f3(q && S), [q, S]), Kt), Q = W.useRef(null), J = i ?? d3[o];
  W.useEffect(() => {
    if (!(!Y.current || !_))
      return Q.current || (Q.current = D2({
        domNode: Y.current,
        nodeId: _,
        getStoreItems: () => {
          const { nodeLookup: Z, transform: I, snapGrid: ot, snapToGrid: T, nodeOrigin: V, domNode: E } = C.getState();
          return {
            nodeLookup: Z,
            transform: I,
            snapGrid: ot,
            snapToGrid: T,
            nodeOrigin: V,
            paneDomNode: E
          };
        },
        onChange: (Z, I) => {
          const { triggerNodeChanges: ot, nodeLookup: T, parentLookup: V, nodeOrigin: E } = C.getState(), O = [], L = { x: Z.x, y: Z.y }, X = T.get(_);
          if (X && X.expandParent && X.parentId) {
            const nt = X.origin ?? E, z = Z.width ?? X.measured.width ?? 0, H = Z.height ?? X.measured.height ?? 0, P = {
              id: X.id,
              parentId: X.parentId,
              rect: {
                width: z,
                height: H,
                ...gy({
                  x: Z.x ?? X.position.x,
                  y: Z.y ?? X.position.y
                }, { width: z, height: H }, X.parentId, T, nt)
              }
            }, lt = fd([P], T, V, E);
            O.push(...lt), L.x = Z.x ? Math.max(nt[0] * z, Z.x) : void 0, L.y = Z.y ? Math.max(nt[1] * H, Z.y) : void 0;
          }
          if (L.x !== void 0 && L.y !== void 0) {
            const nt = {
              id: _,
              type: "position",
              position: { ...L }
            };
            O.push(nt);
          }
          if (Z.width !== void 0 && Z.height !== void 0) {
            const z = {
              id: _,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: Z.width,
                height: Z.height
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
        onEnd: ({ width: Z, height: I }) => {
          const ot = {
            id: _,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: Z,
              height: I
            }
          };
          C.getState().triggerNodeChanges([ot]);
        }
      })), Q.current.update({
        controlPosition: J,
        boundaries: {
          minWidth: g,
          minHeight: p,
          maxWidth: h,
          maxHeight: b
        },
        keepAspectRatio: y,
        resizeDirection: v,
        onResizeStart: A,
        onResize: N,
        onResizeEnd: M,
        shouldResize: w
      }), () => {
        Q.current?.destroy();
      };
  }, [
    J,
    g,
    p,
    h,
    b,
    y,
    A,
    N,
    M,
    w
  ]);
  const ut = J.split("-");
  return U.jsx("div", { className: re(["react-flow__resize-control", "nodrag", ...ut, o, u]), ref: Y, style: {
    ...s,
    scale: B,
    ...d && { [q ? "backgroundColor" : "borderColor"]: d }
  }, children: f });
}
W.memo(h3);
function g3({
  id: n,
  sourceX: i,
  sourceY: o,
  targetX: u,
  targetY: s,
  sourcePosition: f,
  targetPosition: d,
  label: g
}) {
  const [p, h, b] = od({
    sourceX: i,
    sourceY: o,
    sourcePosition: f,
    targetX: u,
    targetY: s,
    targetPosition: d
  }), y = g == null ? "" : String(g), v = y.length > 0 && y !== "always";
  return /* @__PURE__ */ U.jsxs(U.Fragment, { children: [
    /* @__PURE__ */ U.jsx(Uo, { id: n, path: p }),
    y ? /* @__PURE__ */ U.jsx(Yz, { children: /* @__PURE__ */ U.jsx(
      "div",
      {
        style: {
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${h}px,${b}px)`,
          pointerEvents: "all"
        },
        className: `mc-rule-flow-edge-label${v ? " mc-rule-flow-edge-label--condition" : ""}`,
        "data-mark": v ? "mc:edge-condition" : "mc:edge",
        children: v ? `when “${y}”` : y
      }
    ) }) : null
  ] });
}
const m3 = {
  conditional: g3
};
function Zr(n, i, o) {
  const u = (s, f) => s.flatMap((d, g) => {
    if (g !== i[f]) return [d];
    if (f === i.length - 1) {
      const p = o(d);
      return p === null ? [] : [p];
    }
    return [{ ...d, children: u(d.children ?? [], f + 1) }];
  });
  return u(n, 0);
}
function p3(n, i, o) {
  return Zr(n, i, (u) => ({ ...u, children: [...u.children ?? [], o] }));
}
function y3(n, i) {
  return Zr(n, i, () => null);
}
function gp(n, i, o) {
  const u = i.slice(0, -1), s = i[i.length - 1], f = (d) => {
    const g = s + o;
    if (g < 0 || g >= d.length) return d;
    const p = [...d];
    return [p[s], p[g]] = [p[g], p[s]], p;
  };
  return u.length === 0 ? f(n) : Zr(n, u, (d) => ({ ...d, children: f(d.children ?? []) }));
}
function hv(n) {
  const i = {};
  for (const o of n.settingsFields ?? [])
    o.defaultValue != null && (i[o.alias] = o.defaultValue);
  return i;
}
function gv(n, i) {
  const o = n.settings ?? {}, u = (s, f) => {
    const g = String(o[s] ?? "").split(`
`).find((p) => p.includes("="));
    return g && g.split("=")[1]?.trim() || f;
  };
  switch (n.providerAlias) {
    case "Umbricians.MediaCurator.Date": {
      const s = String(o.format ?? "yyyy/MM"), f = /* @__PURE__ */ new Date();
      return s.split("/").map(
        (d) => d.replace(/yyyy/g, String(f.getFullYear())).replace(/yy/g, String(f.getFullYear()).slice(-2)).replace(/MMMM/g, f.toLocaleString(void 0, { month: "long" })).replace(/MM/g, String(f.getMonth() + 1).padStart(2, "0")).replace(/dd/g, String(f.getDate()).padStart(2, "0"))
      ).join("/");
    }
    case "Umbricians.MediaCurator.Alphabetical":
      return "A";
    case "Umbricians.MediaCurator.Exif":
      return u("mappings", "Nikon");
    case "Umbricians.MediaCurator.AiTag":
      return u("mappings", "people");
    case "Umbricians.MediaCurator.Color":
      return String(o.palette ?? "Red=#FF0000").split(`
`)[0]?.split("=")[0]?.trim() || "Red";
    default:
      return i.find((s) => s.alias === n.providerAlias)?.name ?? "…";
  }
}
const Co = "scope", mp = 320, v3 = 48, pp = 32, yp = 52;
function b3(n) {
  return `rule:${n.join(".")}`;
}
function vp(n) {
  if (n === Co || !n.startsWith("rule:")) return null;
  const i = n.slice(5).split(".").map((o) => Number(o));
  return i.some((o) => Number.isNaN(o)) ? null : i;
}
function x3(n) {
  return n?.trim() ? n : "always";
}
function _3(n, i) {
  if (n === i || i === Co) return !1;
  const o = vp(i);
  if (!o) return !1;
  if (n === Co) return o.length === 1;
  const u = vp(n);
  return !u || o.length !== u.length + 1 ? !1 : u.every((s, f) => o[f] === s);
}
function S3(n, i, o, u) {
  const f = i.find((h) => h.alias === n.providerAlias)?.settingsFields ?? [], d = f.filter((h) => h.alias === "mappings" || h.alias === "palette").length, g = f.length - d;
  let p = 168;
  return p += g * 34, p += d * 72, o && (p += 34), u && (p += 28), p;
}
function w3(n, i, o) {
  const u = [], s = [];
  let f = 0;
  u.push({
    id: Co,
    type: "scope",
    position: { x: 0, y: f },
    data: { kind: "scope", scopeName: o, providers: i },
    width: mp,
    height: yp
  }), f += yp + pp;
  const d = (g, p, h, b, y) => {
    for (let v = 0; v < g.length; v++) {
      const S = g[v], w = [...b, v], A = b3(w), N = S.children ?? [], M = w.length > 1, R = N.length === 0, _ = S3(S, i, M, R);
      u.push({
        id: A,
        type: "rule",
        position: { x: p * v3, y: f },
        data: {
          kind: "rule",
          path: w,
          node: S,
          providers: i,
          scopeName: o,
          prefix: y,
          isChild: M,
          isLeaf: R
        },
        width: mp,
        height: _
      }), s.push({
        id: `e-${h}-${A}`,
        source: h,
        target: A,
        label: M ? x3(S.condition) : void 0,
        data: { condition: S.condition, mark: "mc:edge" }
      }), f += _ + pp, N.length > 0 && d(
        N,
        p + 1,
        A,
        w,
        [...y, gv(S, i)]
      );
    }
  };
  return d(n, 1, Co, [], []), { nodes: u, edges: s };
}
function bp(n, i) {
  return n.find((o) => o.alias === i);
}
function mv(n) {
  const i = n[0];
  if (i)
    return {
      providerAlias: i.alias,
      settings: hv(i),
      fallback: "skip",
      children: []
    };
}
function E3({
  field: n,
  value: i,
  onChange: o
}) {
  const u = i ?? n.defaultValue ?? "";
  let s;
  switch (n.type) {
    case "select":
      s = /* @__PURE__ */ U.jsx(
        "select",
        {
          "data-mark": `mc:setting-${n.alias}`,
          "aria-label": n.label,
          value: String(u),
          onChange: (f) => o(f.target.value),
          children: (n.options ?? []).map((f) => /* @__PURE__ */ U.jsx("option", { value: f.value, children: f.label }, f.value))
        }
      );
      break;
    case "toggle":
      s = /* @__PURE__ */ U.jsx(
        "input",
        {
          "data-mark": `mc:setting-${n.alias}`,
          type: "checkbox",
          "aria-label": n.label,
          checked: u === !0 || u === "true",
          onChange: (f) => o(f.target.checked)
        }
      );
      break;
    case "number":
      s = /* @__PURE__ */ U.jsx(
        "input",
        {
          "data-mark": `mc:setting-${n.alias}`,
          type: "number",
          "aria-label": n.label,
          value: String(u),
          onChange: (f) => o(f.target.value)
        }
      );
      break;
    default: {
      s = n.alias === "mappings" || n.alias === "palette" ? /* @__PURE__ */ U.jsx(
        "textarea",
        {
          "data-mark": `mc:setting-${n.alias}`,
          "aria-label": n.label,
          value: String(u),
          onChange: (d) => o(d.target.value)
        }
      ) : /* @__PURE__ */ U.jsx(
        "input",
        {
          "data-mark": `mc:setting-${n.alias}`,
          "aria-label": n.label,
          value: String(u),
          onChange: (d) => o(d.target.value)
        }
      );
      break;
    }
  }
  return /* @__PURE__ */ U.jsxs(U.Fragment, { children: [
    /* @__PURE__ */ U.jsx("label", { title: n.description ?? "", children: n.label }),
    s
  ] });
}
const z3 = W.memo(function({ data: i }) {
  return /* @__PURE__ */ U.jsxs("div", { className: "mc-rule-flow-scope", "data-mark": "mc:canvas-scope", children: [
    /* @__PURE__ */ U.jsx(ra, { type: "source", position: mt.Bottom }),
    /* @__PURE__ */ U.jsx("strong", { children: i.scopeName }),
    /* @__PURE__ */ U.jsx("small", { children: "scope" })
  ] });
}), M3 = W.memo(function({ data: i, id: o }) {
  const u = i, { rules: s, onRulesChange: f, providers: d, scopeName: g, path: p = [], prefix: h = [], isChild: b, isLeaf: y, node: v } = u;
  if (!v) return null;
  const S = bp(d, v.providerAlias), w = (S?.requirements ?? []).length > 0, A = (R) => f(R), N = (R) => {
    A(Zr(s, p, R));
  }, M = [g, ...h, gv(v, d)].join("/");
  return /* @__PURE__ */ U.jsxs("div", { className: "mc-rule-flow-node", "data-mark": "mc:node", "data-node-id": o, children: [
    /* @__PURE__ */ U.jsx(ra, { type: "target", position: mt.Top }),
    /* @__PURE__ */ U.jsxs("div", { className: "mc-rule-flow-node-header", children: [
      /* @__PURE__ */ U.jsx(
        "select",
        {
          "data-mark": "mc:node-provider",
          "aria-label": "Provider",
          value: v.providerAlias,
          onChange: (R) => {
            const _ = R.target.value, C = bp(d, _);
            N((Y) => ({
              ...Y,
              providerAlias: _,
              settings: C ? hv(C) : {}
            }));
          },
          children: d.map((R) => /* @__PURE__ */ U.jsx("option", { value: R.alias, children: R.name }, R.alias))
        }
      ),
      w ? /* @__PURE__ */ U.jsx("span", { className: "mc-rule-flow-tag", "data-mark": "mc:node-requirements", title: "This provider declares media type property requirements.", children: "needs properties" }) : null
    ] }),
    /* @__PURE__ */ U.jsxs("div", { className: "mc-rule-flow-node-actions", children: [
      /* @__PURE__ */ U.jsx("button", { type: "button", title: "Move up", onClick: () => A(gp(s, p, -1)), children: "↑" }),
      /* @__PURE__ */ U.jsx("button", { type: "button", title: "Move down", onClick: () => A(gp(s, p, 1)), children: "↓" }),
      /* @__PURE__ */ U.jsx("button", { type: "button", className: "danger", title: "Remove", onClick: () => A(y3(s, p)), children: "✕" })
    ] }),
    /* @__PURE__ */ U.jsxs("div", { className: "mc-rule-flow-node-body", children: [
      b ? /* @__PURE__ */ U.jsxs(U.Fragment, { children: [
        /* @__PURE__ */ U.jsx("label", { htmlFor: `${o}-condition`, children: "Condition (parent value)" }),
        /* @__PURE__ */ U.jsx(
          "input",
          {
            id: `${o}-condition`,
            "data-mark": "mc:node-condition",
            "aria-label": "Condition",
            placeholder: "leave empty for always",
            value: v.condition ?? "",
            onChange: (R) => N((_) => ({
              ..._,
              condition: R.target.value || void 0
            }))
          }
        )
      ] }) : null,
      (S?.settingsFields ?? []).map((R) => {
        const _ = v.settings ?? {};
        return /* @__PURE__ */ U.jsx(
          E3,
          {
            field: R,
            value: _[R.alias],
            onChange: (C) => N((Y) => ({
              ...Y,
              settings: {
                ...Y.settings ?? {},
                [R.alias]: C
              }
            }))
          },
          R.alias
        );
      }),
      /* @__PURE__ */ U.jsx("label", { htmlFor: `${o}-fallback`, children: "If unresolved" }),
      /* @__PURE__ */ U.jsxs(
        "select",
        {
          id: `${o}-fallback`,
          "data-mark": "mc:node-fallback",
          "aria-label": "If unresolved",
          value: v.fallback,
          onChange: (R) => N((_) => ({ ..._, fallback: R.target.value })),
          children: [
            /* @__PURE__ */ U.jsx("option", { value: "skip", children: "Skip this level" }),
            /* @__PURE__ */ U.jsx("option", { value: "unsorted", children: "Use 'Unsorted' folder" }),
            /* @__PURE__ */ U.jsx("option", { value: "stop", children: "Leave item in place" })
          ]
        }
      )
    ] }),
    y ? /* @__PURE__ */ U.jsx("div", { className: "mc-rule-flow-example", "data-mark": "mc:node-example", title: "Example resulting folder path", children: M }) : null,
    /* @__PURE__ */ U.jsx("div", { className: "mc-rule-flow-add-child", children: /* @__PURE__ */ U.jsx(
      "button",
      {
        type: "button",
        "data-mark": "mc:node-add-child",
        onClick: () => {
          const R = mv(d);
          R && A(p3(s, p, R));
        },
        children: "Add child rule"
      }
    ) }),
    /* @__PURE__ */ U.jsx(ra, { type: "source", position: mt.Bottom })
  ] });
}), N3 = {
  scope: z3,
  rule: M3
};
function A3({ rules: n }) {
  const { fitView: i } = Xr();
  return W.useEffect(() => {
    const o = requestAnimationFrame(() => {
      i({ padding: 0.12, duration: 150, minZoom: 0.75, maxZoom: 1 });
    });
    return () => cancelAnimationFrame(o);
  }, [n, i]), null;
}
function C3({ rules: n, providers: i, scopeName: o, onRulesChange: u }) {
  const { nodes: s, edges: f } = W.useMemo(
    () => w3(n, i, o),
    [n, i, o]
  ), d = W.useMemo(
    () => s.map(
      (h) => ({
        ...h,
        data: {
          ...h.data,
          rules: n,
          onRulesChange: u
        }
      })
    ),
    [s, n, u]
  ), g = W.useMemo(
    () => f.map((h) => ({
      ...h,
      type: h.label ? "conditional" : void 0
    })),
    [f]
  ), p = () => {
    const h = mv(i);
    h && u([...n, h]);
  };
  return /* @__PURE__ */ U.jsxs("div", { className: "mc-rule-flow-canvas", "data-mark": "mc:canvas", children: [
    /* @__PURE__ */ U.jsx("div", { className: "mc-rule-flow-viewport", children: /* @__PURE__ */ U.jsxs(
      qz,
      {
        nodes: d,
        edges: g,
        nodeTypes: N3,
        edgeTypes: m3,
        defaultViewport: { x: 24, y: 24, zoom: 1 },
        isValidConnection: (h) => _3(h.source ?? "", h.target ?? ""),
        nodesConnectable: !1,
        nodesDraggable: !1,
        elementsSelectable: !1,
        nodeOrigin: [0, 0],
        minZoom: 0.75,
        maxZoom: 1.25,
        proOptions: { hideAttribution: !0 },
        children: [
          /* @__PURE__ */ U.jsx(A3, { rules: n }),
          /* @__PURE__ */ U.jsx(Iz, { position: "bottom-right", showInteractive: !1 }),
          /* @__PURE__ */ U.jsx(Zz, { variant: Jn.Dots, gap: 16, size: 1 })
        ]
      }
    ) }),
    n.length === 0 ? /* @__PURE__ */ U.jsx("p", { className: "mc-rule-flow-empty", children: "No rules yet. Each rule node contributes folder levels beneath the scope." }) : null,
    /* @__PURE__ */ U.jsx("div", { className: "mc-rule-flow-toolbar", children: /* @__PURE__ */ U.jsx("button", { type: "button", "data-mark": "mc:canvas-add", onClick: p, children: "Add rule" }) })
  ] });
}
function T3(n) {
  return /* @__PURE__ */ U.jsx(cv, { children: /* @__PURE__ */ U.jsx(C3, { ...n }) });
}
const D3 = ".react-flow{direction:ltr;--xy-edge-stroke-default: #b1b1b7;--xy-edge-stroke-width-default: 1;--xy-edge-stroke-selected-default: #555;--xy-connectionline-stroke-default: #b1b1b7;--xy-connectionline-stroke-width-default: 1;--xy-attribution-background-color-default: rgba(255, 255, 255, .5);--xy-minimap-background-color-default: #fff;--xy-minimap-mask-background-color-default: rgba(240, 240, 240, .6);--xy-minimap-mask-stroke-color-default: transparent;--xy-minimap-mask-stroke-width-default: 1;--xy-minimap-node-background-color-default: #e2e2e2;--xy-minimap-node-stroke-color-default: transparent;--xy-minimap-node-stroke-width-default: 2;--xy-background-color-default: transparent;--xy-background-pattern-dots-color-default: #91919a;--xy-background-pattern-lines-color-default: #eee;--xy-background-pattern-cross-color-default: #e2e2e2;background-color:var(--xy-background-color, var(--xy-background-color-default));--xy-node-color-default: inherit;--xy-node-border-default: 1px solid #1a192b;--xy-node-background-color-default: #fff;--xy-node-group-background-color-default: rgba(240, 240, 240, .25);--xy-node-boxshadow-hover-default: 0 1px 4px 1px rgba(0, 0, 0, .08);--xy-node-boxshadow-selected-default: 0 0 0 .5px #1a192b;--xy-node-border-radius-default: 3px;--xy-handle-background-color-default: #1a192b;--xy-handle-border-color-default: #fff;--xy-selection-background-color-default: rgba(0, 89, 220, .08);--xy-selection-border-default: 1px dotted rgba(0, 89, 220, .8);--xy-controls-button-background-color-default: #fefefe;--xy-controls-button-background-color-hover-default: #f4f4f4;--xy-controls-button-color-default: inherit;--xy-controls-button-color-hover-default: inherit;--xy-controls-button-border-color-default: #eee;--xy-controls-box-shadow-default: 0 0 2px 1px rgba(0, 0, 0, .08);--xy-edge-label-background-color-default: #ffffff;--xy-edge-label-color-default: inherit;--xy-resize-background-color-default: #3367d9}.react-flow.dark{--xy-edge-stroke-default: #3e3e3e;--xy-edge-stroke-width-default: 1;--xy-edge-stroke-selected-default: #727272;--xy-connectionline-stroke-default: #b1b1b7;--xy-connectionline-stroke-width-default: 1;--xy-attribution-background-color-default: rgba(150, 150, 150, .25);--xy-minimap-background-color-default: #141414;--xy-minimap-mask-background-color-default: rgba(60, 60, 60, .6);--xy-minimap-mask-stroke-color-default: transparent;--xy-minimap-mask-stroke-width-default: 1;--xy-minimap-node-background-color-default: #2b2b2b;--xy-minimap-node-stroke-color-default: transparent;--xy-minimap-node-stroke-width-default: 2;--xy-background-color-default: #141414;--xy-background-pattern-dots-color-default: #777;--xy-background-pattern-lines-color-default: #777;--xy-background-pattern-cross-color-default: #777;--xy-node-color-default: #f8f8f8;--xy-node-border-default: 1px solid #3c3c3c;--xy-node-background-color-default: #1e1e1e;--xy-node-group-background-color-default: rgba(240, 240, 240, .25);--xy-node-boxshadow-hover-default: 0 1px 4px 1px rgba(255, 255, 255, .08);--xy-node-boxshadow-selected-default: 0 0 0 .5px #999;--xy-handle-background-color-default: #bebebe;--xy-handle-border-color-default: #1e1e1e;--xy-selection-background-color-default: rgba(200, 200, 220, .08);--xy-selection-border-default: 1px dotted rgba(200, 200, 220, .8);--xy-controls-button-background-color-default: #2b2b2b;--xy-controls-button-background-color-hover-default: #3e3e3e;--xy-controls-button-color-default: #f8f8f8;--xy-controls-button-color-hover-default: #fff;--xy-controls-button-border-color-default: #5b5b5b;--xy-controls-box-shadow-default: 0 0 2px 1px rgba(0, 0, 0, .08);--xy-edge-label-background-color-default: #141414;--xy-edge-label-color-default: #f8f8f8}.react-flow__background{background-color:var(--xy-background-color-props, var(--xy-background-color, var(--xy-background-color-default)));pointer-events:none;z-index:-1}.react-flow__container{position:absolute;width:100%;height:100%;top:0;left:0}.react-flow__pane{z-index:1;touch-action:none}.react-flow__pane.draggable{cursor:grab}.react-flow__pane.dragging{cursor:grabbing}.react-flow__pane.selection{cursor:pointer}.react-flow__viewport{transform-origin:0 0;z-index:2;pointer-events:none}.react-flow__renderer{z-index:4}.react-flow__selection{z-index:6}.react-flow__nodesselection-rect:focus,.react-flow__nodesselection-rect:focus-visible{outline:none}.react-flow__edge-path{stroke:var(--xy-edge-stroke, var(--xy-edge-stroke-default));stroke-width:var(--xy-edge-stroke-width, var(--xy-edge-stroke-width-default));fill:none}.react-flow__connection-path{stroke:var(--xy-connectionline-stroke, var(--xy-connectionline-stroke-default));stroke-width:var(--xy-connectionline-stroke-width, var(--xy-connectionline-stroke-width-default));fill:none}.react-flow .react-flow__edges{position:absolute}.react-flow .react-flow__edges svg{overflow:visible;position:absolute;pointer-events:none}.react-flow__edge{pointer-events:visibleStroke}.react-flow__edge.selectable{cursor:pointer}.react-flow__edge.animated path{stroke-dasharray:5;animation:dashdraw .5s linear infinite}.react-flow__edge.animated path.react-flow__edge-interaction{stroke-dasharray:none;animation:none}.react-flow__edge.inactive{pointer-events:none}.react-flow__edge.selected,.react-flow__edge:focus,.react-flow__edge:focus-visible{outline:none}.react-flow__edge.selected .react-flow__edge-path,.react-flow__edge.selectable:focus .react-flow__edge-path,.react-flow__edge.selectable:focus-visible .react-flow__edge-path{stroke:var(--xy-edge-stroke-selected, var(--xy-edge-stroke-selected-default))}.react-flow__edge-textwrapper{pointer-events:all}.react-flow__edge .react-flow__edge-text{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.react-flow__arrowhead polyline{stroke:var(--xy-edge-stroke, var(--xy-edge-stroke-default))}.react-flow__arrowhead polyline.arrowclosed{fill:var(--xy-edge-stroke, var(--xy-edge-stroke-default))}.react-flow__connection{pointer-events:none}.react-flow__connection .animated{stroke-dasharray:5;animation:dashdraw .5s linear infinite}svg.react-flow__connectionline{z-index:1001;overflow:visible;position:absolute}.react-flow__nodes{pointer-events:none;transform-origin:0 0}.react-flow__node{position:absolute;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:all;transform-origin:0 0;box-sizing:border-box;cursor:default}.react-flow__node.selectable{cursor:pointer}.react-flow__node.draggable{cursor:grab;pointer-events:all}.react-flow__node.draggable.dragging{cursor:grabbing}.react-flow__nodesselection{z-index:3;transform-origin:left top;pointer-events:none}.react-flow__nodesselection-rect{position:absolute;pointer-events:all;cursor:grab}.react-flow__handle{position:absolute;pointer-events:none;min-width:5px;min-height:5px;width:6px;height:6px;background-color:var(--xy-handle-background-color, var(--xy-handle-background-color-default));border:1px solid var(--xy-handle-border-color, var(--xy-handle-border-color-default));border-radius:100%}.react-flow__handle.connectingfrom{pointer-events:all}.react-flow__handle.connectionindicator{pointer-events:all;cursor:crosshair}.react-flow__handle-bottom{top:auto;left:50%;bottom:0;transform:translate(-50%,50%)}.react-flow__handle-top{top:0;left:50%;transform:translate(-50%,-50%)}.react-flow__handle-left{top:50%;left:0;transform:translate(-50%,-50%)}.react-flow__handle-right{top:50%;right:0;transform:translate(50%,-50%)}.react-flow__edgeupdater{cursor:move;pointer-events:all}.react-flow__pane.selection .react-flow__panel{pointer-events:none}.react-flow__panel{position:absolute;z-index:5;margin:15px}.react-flow__panel.top{top:0}.react-flow__panel.bottom{bottom:0}.react-flow__panel.top.center,.react-flow__panel.bottom.center{left:50%;transform:translate(-15px) translate(-50%)}.react-flow__panel.left{left:0}.react-flow__panel.right{right:0}.react-flow__panel.left.center,.react-flow__panel.right.center{top:50%;transform:translateY(-15px) translateY(-50%)}.react-flow__attribution{font-size:10px;background:var(--xy-attribution-background-color, var(--xy-attribution-background-color-default));padding:2px 3px;margin:0}.react-flow__attribution a{text-decoration:none;color:#999}@keyframes dashdraw{0%{stroke-dashoffset:10}}.react-flow__edgelabel-renderer{position:absolute;width:100%;height:100%;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;left:0;top:0}.react-flow__viewport-portal{position:absolute;width:100%;height:100%;left:0;top:0;-webkit-user-select:none;-moz-user-select:none;user-select:none}.react-flow__minimap{background:var( --xy-minimap-background-color-props, var(--xy-minimap-background-color, var(--xy-minimap-background-color-default)) )}.react-flow__minimap-svg{display:block}.react-flow__minimap-mask{fill:var( --xy-minimap-mask-background-color-props, var(--xy-minimap-mask-background-color, var(--xy-minimap-mask-background-color-default)) );stroke:var( --xy-minimap-mask-stroke-color-props, var(--xy-minimap-mask-stroke-color, var(--xy-minimap-mask-stroke-color-default)) );stroke-width:var( --xy-minimap-mask-stroke-width-props, var(--xy-minimap-mask-stroke-width, var(--xy-minimap-mask-stroke-width-default)) )}.react-flow__minimap-node{fill:var( --xy-minimap-node-background-color-props, var(--xy-minimap-node-background-color, var(--xy-minimap-node-background-color-default)) );stroke:var( --xy-minimap-node-stroke-color-props, var(--xy-minimap-node-stroke-color, var(--xy-minimap-node-stroke-color-default)) );stroke-width:var( --xy-minimap-node-stroke-width-props, var(--xy-minimap-node-stroke-width, var(--xy-minimap-node-stroke-width-default)) )}.react-flow__background-pattern.dots{fill:var( --xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-dots-color-default)) )}.react-flow__background-pattern.lines{stroke:var( --xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-lines-color-default)) )}.react-flow__background-pattern.cross{stroke:var( --xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-cross-color-default)) )}.react-flow__controls{display:flex;flex-direction:column;box-shadow:var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default))}.react-flow__controls.horizontal{flex-direction:row}.react-flow__controls-button{display:flex;justify-content:center;align-items:center;height:26px;width:26px;padding:4px;border:none;background:var(--xy-controls-button-background-color, var(--xy-controls-button-background-color-default));border-bottom:1px solid var( --xy-controls-button-border-color-props, var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default)) );color:var( --xy-controls-button-color-props, var(--xy-controls-button-color, var(--xy-controls-button-color-default)) );cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none}.react-flow__controls-button svg{width:100%;max-width:12px;max-height:12px;fill:currentColor}.react-flow__edge.updating .react-flow__edge-path{stroke:#777}.react-flow__edge-text{font-size:10px}.react-flow__node.selectable:focus,.react-flow__node.selectable:focus-visible{outline:none}.react-flow__node-input,.react-flow__node-default,.react-flow__node-output,.react-flow__node-group{padding:10px;border-radius:var(--xy-node-border-radius, var(--xy-node-border-radius-default));width:150px;font-size:12px;color:var(--xy-node-color, var(--xy-node-color-default));text-align:center;border:var(--xy-node-border, var(--xy-node-border-default));background-color:var(--xy-node-background-color, var(--xy-node-background-color-default))}.react-flow__node-input.selectable:hover,.react-flow__node-default.selectable:hover,.react-flow__node-output.selectable:hover,.react-flow__node-group.selectable:hover{box-shadow:var(--xy-node-boxshadow-hover, var(--xy-node-boxshadow-hover-default))}.react-flow__node-input.selectable.selected,.react-flow__node-input.selectable:focus,.react-flow__node-input.selectable:focus-visible,.react-flow__node-default.selectable.selected,.react-flow__node-default.selectable:focus,.react-flow__node-default.selectable:focus-visible,.react-flow__node-output.selectable.selected,.react-flow__node-output.selectable:focus,.react-flow__node-output.selectable:focus-visible,.react-flow__node-group.selectable.selected,.react-flow__node-group.selectable:focus,.react-flow__node-group.selectable:focus-visible{box-shadow:var(--xy-node-boxshadow-selected, var(--xy-node-boxshadow-selected-default))}.react-flow__node-group{background-color:var(--xy-node-group-background-color, var(--xy-node-group-background-color-default))}.react-flow__nodesselection-rect,.react-flow__selection{background:var(--xy-selection-background-color, var(--xy-selection-background-color-default));border:var(--xy-selection-border, var(--xy-selection-border-default))}.react-flow__nodesselection-rect:focus,.react-flow__nodesselection-rect:focus-visible,.react-flow__selection:focus,.react-flow__selection:focus-visible{outline:none}.react-flow__controls-button:hover{background:var( --xy-controls-button-background-color-hover-props, var(--xy-controls-button-background-color-hover, var(--xy-controls-button-background-color-hover-default)) );color:var( --xy-controls-button-color-hover-props, var(--xy-controls-button-color-hover, var(--xy-controls-button-color-hover-default)) )}.react-flow__controls-button:disabled{pointer-events:none}.react-flow__controls-button:disabled svg{fill-opacity:.4}.react-flow__controls-button:last-child{border-bottom:none}.react-flow__controls.horizontal .react-flow__controls-button{border-bottom:none;border-right:1px solid var( --xy-controls-button-border-color-props, var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default)) )}.react-flow__controls.horizontal .react-flow__controls-button:last-child{border-right:none}.react-flow__resize-control{position:absolute}.react-flow__resize-control.left,.react-flow__resize-control.right{cursor:ew-resize}.react-flow__resize-control.top,.react-flow__resize-control.bottom{cursor:ns-resize}.react-flow__resize-control.top.left,.react-flow__resize-control.bottom.right{cursor:nwse-resize}.react-flow__resize-control.bottom.left,.react-flow__resize-control.top.right{cursor:nesw-resize}.react-flow__resize-control.handle{width:5px;height:5px;border:1px solid #fff;border-radius:1px;background-color:var(--xy-resize-background-color, var(--xy-resize-background-color-default));translate:-50% -50%}.react-flow__resize-control.handle.left{left:0;top:50%}.react-flow__resize-control.handle.right{left:100%;top:50%}.react-flow__resize-control.handle.top{left:50%;top:0}.react-flow__resize-control.handle.bottom{left:50%;top:100%}.react-flow__resize-control.handle.top.left,.react-flow__resize-control.handle.bottom.left{left:0}.react-flow__resize-control.handle.top.right,.react-flow__resize-control.handle.bottom.right{left:100%}.react-flow__resize-control.line{border-color:var(--xy-resize-background-color, var(--xy-resize-background-color-default));border-width:0;border-style:solid}.react-flow__resize-control.line.left,.react-flow__resize-control.line.right{width:1px;transform:translate(-50%);top:0;height:100%}.react-flow__resize-control.line.left{left:0;border-left-width:1px}.react-flow__resize-control.line.right{left:100%;border-right-width:1px}.react-flow__resize-control.line.top,.react-flow__resize-control.line.bottom{height:1px;transform:translateY(-50%);left:0;width:100%}.react-flow__resize-control.line.top{top:0;border-top-width:1px}.react-flow__resize-control.line.bottom{border-bottom-width:1px;top:100%}.react-flow__edge-textbg{fill:var(--xy-edge-label-background-color, var(--xy-edge-label-background-color-default))}.react-flow__edge-text{fill:var(--xy-edge-label-color, var(--xy-edge-label-color-default))}", O3 = ".mc-rule-flow-canvas{--xy-node-border-radius: var(--uui-border-radius, 6px);--xy-edge-stroke: var(--uui-color-border, #d8d7d9);--xy-edge-stroke-selected: var(--uui-color-selected, #1b264f);--xy-edge-label-background-color: var(--uui-color-surface, #fff);--xy-background-color: var(--uui-color-surface, #fff)}.mc-rule-flow-viewport{width:100%;height:560px;border:1px solid var(--uui-color-border, #d8d7d9);border-radius:var(--uui-border-radius, 6px);overflow:hidden}.mc-rule-flow-viewport .react-flow{width:100%;height:100%}.mc-rule-flow-viewport .react-flow__node{width:320px!important}.mc-rule-flow-viewport .react-flow__node-scope,.mc-rule-flow-viewport .react-flow__node-rule{width:320px;background:transparent;border:none;box-shadow:none;padding:0}.mc-rule-flow-viewport .react-flow__handle{width:8px;height:8px;background:var(--uui-color-border-emphasis, #a1a1a1);border:2px solid var(--uui-color-surface, #fff)}.mc-rule-flow-canvas .react-flow__panel{margin:0}.mc-rule-flow-canvas .react-flow__edge-text{font-size:.8rem}.mc-rule-flow-canvas .react-flow__edge-textbg{fill:var(--uui-color-surface-alt, #f6f4f4)}.mc-rule-flow-scope,.mc-rule-flow-node{background:var(--uui-color-surface, #fff);border:1px solid var(--uui-color-border, #d8d7d9);border-radius:var(--uui-border-radius, 6px);box-shadow:0 1px 2px #0000000f;width:320px;box-sizing:border-box;font-family:var(--uui-font-family, inherit);color:var(--uui-color-text, #1b264f)}.mc-rule-flow-scope{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;background:var(--uui-color-surface-alt, #f6f4f4)}.mc-rule-flow-scope small{color:var(--uui-color-text-alt, #6e6e6e)}.mc-rule-flow-node-header{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;border-bottom:1px solid var(--uui-color-border, #d8d7d9)}.mc-rule-flow-node-header select{flex:1;min-width:0}.mc-rule-flow-node-actions{display:flex;gap:.25rem;padding:0 1rem .5rem}.mc-rule-flow-node-actions button{cursor:pointer;border:1px solid var(--uui-color-border, #d8d7d9);background:var(--uui-color-surface, #fff);border-radius:4px;padding:.15rem .45rem}.mc-rule-flow-node-actions button.danger{color:var(--uui-color-danger, #d42054)}.mc-rule-flow-node-body{display:grid;grid-template-columns:140px 1fr;gap:.35rem .75rem;align-items:center;padding:.75rem 1rem}.mc-rule-flow-node-body label{font-size:.85rem;color:var(--uui-color-text-alt, #6e6e6e)}.mc-rule-flow-node-body input,.mc-rule-flow-node-body select,.mc-rule-flow-node-body textarea{width:100%;box-sizing:border-box}.mc-rule-flow-node-body textarea{min-height:4rem;resize:vertical}.mc-rule-flow-tag{display:inline-block;font-size:.75rem;padding:.1rem .45rem;border-radius:1rem;background:var(--uui-color-warning, #f5c1bc)}.mc-rule-flow-example{margin:0 1rem .75rem;font-family:monospace;font-size:.85rem;color:var(--uui-color-positive, #2bc37c)}.mc-rule-flow-add-child{margin:0 1rem .75rem}.mc-rule-flow-toolbar{display:flex;gap:.5rem;margin-top:.75rem}.mc-rule-flow-toolbar button,.mc-rule-flow-add-child button{cursor:pointer;border:1px solid var(--uui-color-border, #d8d7d9);background:var(--uui-color-surface-alt, #f6f4f4);border-radius:4px;padding:.4rem .75rem}.mc-rule-flow-empty{margin:.75rem 0 0;color:var(--uui-color-text-alt, #6e6e6e)}.mc-rule-flow-edge-label{font-size:.8rem;background:var(--uui-color-surface-alt, #f6f4f4);border-radius:1em;padding:0 .5rem}.mc-rule-flow-edge-label--condition{background:var(--uui-color-warning, #f5c1bc)}";
let ho;
function R3(n) {
  ho || (ho = new CSSStyleSheet(), ho.replaceSync(`${D3}
${O3}`)), n.adoptedStyleSheets.includes(ho) || (n.adoptedStyleSheets = [...n.adoptedStyleSheets, ho]);
}
var H3 = Object.defineProperty, k3 = Object.getOwnPropertyDescriptor, pv = (n) => {
  throw TypeError(n);
}, Gr = (n, i, o, u) => {
  for (var s = u > 1 ? void 0 : u ? k3(i, o) : i, f = n.length - 1, d; f >= 0; f--)
    (d = n[f]) && (s = (u ? d(i, o, s) : d(s)) || s);
  return u && s && H3(i, o, s), s;
}, hd = (n, i, o) => i.has(n) || pv("Cannot " + o), vo = (n, i, o) => (hd(n, i, "read from private field"), i.get(n)), Tf = (n, i, o) => i.has(n) ? pv("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(n) : i.set(n, o), mr = (n, i, o, u) => (hd(n, i, "write to private field"), i.set(n, o), o), Zf = (n, i, o) => (hd(n, i, "access private method"), o), Ia, ta, bo, yv, Gf;
let ci = class extends Ep(_p) {
  constructor() {
    super(...arguments), Tf(this, bo), this.rules = [], this.providers = [], this.scopeName = "Scope", Tf(this, Ia), Tf(this, ta);
  }
  connectedCallback() {
    super.connectedCallback(), this.shadowRoot && R3(this.shadowRoot);
  }
  render() {
    return Vt`<div class="react-root"></div>`;
  }
  shouldUpdate(n) {
    return this.hasUpdated ? ((n.has("rules") || n.has("providers") || n.has("scopeName")) && Zf(this, bo, Gf).call(this), !1) : !0;
  }
  firstUpdated() {
    mr(this, Ia, this.renderRoot.querySelector(".react-root") ?? void 0), vo(this, Ia) && (mr(this, ta, P1.createRoot(vo(this, Ia))), Zf(this, bo, Gf).call(this));
  }
  disconnectedCallback() {
    vo(this, ta)?.unmount(), mr(this, ta, void 0), mr(this, Ia, void 0), super.disconnectedCallback();
  }
};
Ia = /* @__PURE__ */ new WeakMap();
ta = /* @__PURE__ */ new WeakMap();
bo = /* @__PURE__ */ new WeakSet();
yv = function(n) {
  this.rules = n, this.dispatchEvent(new CustomEvent("rules-change", { detail: { rules: n }, bubbles: !1 }));
};
Gf = function() {
  vo(this, ta) && vo(this, ta).render(
    W.createElement(T3, {
      rules: this.rules,
      providers: this.providers,
      scopeName: this.scopeName,
      onRulesChange: (n) => Zf(this, bo, yv).call(this, n)
    })
  );
};
ci.styles = [
  Sp`
      :host {
        display: block;
      }
      .react-root {
        width: 100%;
      }
    `
];
Gr([
  Qf({ attribute: !1 })
], ci.prototype, "rules", 2);
Gr([
  Qf({ attribute: !1 })
], ci.prototype, "providers", 2);
Gr([
  Qf({ attribute: !1 })
], ci.prototype, "scopeName", 2);
ci = Gr([
  wp("mc-rule-flow")
], ci);
class $e {
  static getExclusions(i) {
    return (i?.client ?? ee).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/exclusions",
      ...i
    });
  }
  static setExclusion(i) {
    return (i.client ?? ee).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/exclusions/{mediaKey}",
      ...i
    });
  }
  static executeCuration(i) {
    return (i?.client ?? ee).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/execute",
      ...i,
      headers: {
        "Content-Type": "application/json",
        ...i?.headers
      }
    });
  }
  static planCuration(i) {
    return (i?.client ?? ee).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/plan",
      ...i,
      headers: {
        "Content-Type": "application/json",
        ...i?.headers
      }
    });
  }
  static getQueueStatus(i) {
    return (i?.client ?? ee).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/queue",
      ...i
    });
  }
  static queueCuration(i) {
    return (i?.client ?? ee).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/queue",
      ...i,
      headers: {
        "Content-Type": "application/json",
        ...i?.headers
      }
    });
  }
  static getRuns(i) {
    return (i?.client ?? ee).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/runs",
      ...i
    });
  }
  static getRunItems(i) {
    return (i.client ?? ee).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/runs/{runKey}/items",
      ...i
    });
  }
  static undoRun(i) {
    return (i.client ?? ee).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/runs/{runKey}/undo",
      ...i
    });
  }
  static getProviders(i) {
    return (i?.client ?? ee).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/providers",
      ...i
    });
  }
  static applyRequirements(i) {
    return (i?.client ?? ee).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/requirements/apply",
      ...i,
      headers: {
        "Content-Type": "application/json",
        ...i?.headers
      }
    });
  }
  static checkRequirements(i) {
    return (i.client ?? ee).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/requirements/check/{rulesetKey}",
      ...i
    });
  }
  static getRulesets(i) {
    return (i?.client ?? ee).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets",
      ...i
    });
  }
  static saveRuleset(i) {
    return (i?.client ?? ee).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets",
      ...i,
      headers: {
        "Content-Type": "application/json",
        ...i?.headers
      }
    });
  }
  static deleteRuleset(i) {
    return (i.client ?? ee).delete({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets/{key}",
      ...i
    });
  }
  static getRulesetByScope(i) {
    return (i.client ?? ee).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets/by-scope/{scopeRootKey}",
      ...i
    });
  }
  static exportRulesets(i) {
    return (i?.client ?? ee).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets/export",
      ...i
    });
  }
  static importRulesets(i) {
    return (i?.client ?? ee).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets/import",
      ...i,
      headers: {
        "Content-Type": "application/json",
        ...i?.headers
      }
    });
  }
  static getSettings(i) {
    return (i?.client ?? ee).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/settings",
      ...i
    });
  }
  static saveSettings(i) {
    return (i?.client ?? ee).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/settings",
      ...i,
      headers: {
        "Content-Type": "application/json",
        ...i?.headers
      }
    });
  }
  static reanalyzeImages(i) {
    return (i?.client ?? ee).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/recognition/reanalyze",
      ...i,
      headers: {
        "Content-Type": "application/json",
        ...i?.headers
      }
    });
  }
}
var B3 = Object.defineProperty, U3 = Object.getOwnPropertyDescriptor, vv = (n) => {
  throw TypeError(n);
}, Ge = (n, i, o, u) => {
  for (var s = u > 1 ? void 0 : u ? U3(i, o) : i, f = n.length - 1, d; f >= 0; f--)
    (d = n[f]) && (s = (u ? d(i, o, s) : d(s)) || s);
  return u && s && B3(i, o, s), s;
}, gd = (n, i, o) => i.has(n) || vv("Cannot " + o), q3 = (n, i, o) => (gd(n, i, "read from private field"), i.get(n)), xp = (n, i, o) => i.has(n) ? vv("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(n) : i.set(n, o), j3 = (n, i, o, u) => (gd(n, i, "write to private field"), i.set(n, o), o), xt = (n, i, o) => (gd(n, i, "access private method"), o), Or, bt, si, bv, xv, ue, _v, Sv, wv, Ev, zv, md, Qr, Mv, Nv, Av, Cv, Tv, Dv, Ov, Rv, Hv, kv, Bv, Uv;
let be = class extends Ep(_p) {
  constructor() {
    super(), xp(this, bt), this._rulesets = [], this._providers = [], this._loading = !0, this._runs = [], this._savingSettings = !1, this._reanalyzeMediaKeys = [], this._reanalyzeResults = [], this._reanalyzing = !1, xp(this, Or), this.consumeContext($1, (n) => {
      j3(this, Or, n);
    });
  }
  connectedCallback() {
    super.connectedCallback(), xt(this, bt, si).call(this);
  }
  render() {
    return this._loading ? Vt`<uui-loader></uui-loader>` : this._plan ? xt(this, bt, Nv).call(this) : this._requirements ? xt(this, bt, Av).call(this) : this._editing ? xt(this, bt, Uv).call(this) : xt(this, bt, Hv).call(this);
  }
};
Or = /* @__PURE__ */ new WeakMap();
bt = /* @__PURE__ */ new WeakSet();
si = async function() {
  this._loading = !0;
  try {
    const [n, i, o, u] = await Promise.all([
      $e.getRulesets(),
      $e.getProviders(),
      $e.getRuns(),
      $e.getSettings()
    ]);
    this._rulesets = n.data ?? [], this._providers = i.data ?? [], this._runs = o.data ?? [], this._settings = u.data ?? { persistImageDescription: !0 };
  } catch {
    xt(this, bt, ue).call(this, "danger", "Could not load Media Curator data. Check the server log and reload.");
  } finally {
    this._loading = !1;
  }
};
bv = async function(n) {
  const i = await $e.planCuration({
    body: { scopeFolderKey: n.scopeRootKey, recursive: !0 }
  });
  if (i.error || !i.data) {
    xt(this, bt, ue).call(this, "danger", `Could not plan: ${JSON.stringify(i.error ?? "no data")}`);
    return;
  }
  this._plan = { ruleset: n, plan: i.data };
};
xv = async function() {
  const n = this._plan;
  if (!n) return;
  const i = await $e.executeCuration({
    body: { scopeFolderKey: n.ruleset.scopeRootKey, recursive: !0 }
  });
  if (i.error || !i.data) {
    xt(this, bt, ue).call(this, "danger", `Curation failed: ${JSON.stringify(i.error ?? "no data")}`);
    return;
  }
  const o = i.data;
  xt(this, bt, ue).call(this, "positive", `Curated: ${o.moved} moved, ${o.alreadyInPlace} already in place, ${o.failed} failed.`), this._plan = void 0, await xt(this, bt, si).call(this);
};
ue = function(n, i) {
  q3(this, Or)?.peek(n, { data: { message: i } });
};
_v = function() {
  this._editing = {
    key: "00000000-0000-0000-0000-000000000000",
    scopeRootKey: "",
    name: "",
    enabled: !0,
    rules: []
  };
};
Sv = function(n) {
  this._editing = structuredClone(n);
};
wv = async function(n) {
  try {
    await Z1(this, {
      headline: "Delete ruleset",
      content: `Delete the ruleset "${n.name}"? Media that has already been curated stays where it is.`,
      color: "danger",
      confirmLabel: "Delete"
    });
  } catch {
    return;
  }
  await $e.deleteRuleset({ path: { key: n.key } }), xt(this, bt, ue).call(this, "positive", `Deleted "${n.name}".`), await xt(this, bt, si).call(this);
};
Ev = async function() {
  const n = this._editing;
  if (!n) return;
  const i = await $e.saveRuleset({ body: n });
  if (i.error) {
    xt(this, bt, ue).call(this, "danger", `Could not save: ${JSON.stringify(i.error)}`);
    return;
  }
  xt(this, bt, ue).call(this, "positive", `Saved "${n.name}".`), this._editing = void 0, await xt(this, bt, si).call(this);
};
zv = function(n) {
  const i = n.target.selection;
  this._editing && i?.length && (this._editing = { ...this._editing, scopeRootKey: i[0] });
};
md = async function(n) {
  const i = await $e.checkRequirements({ path: { rulesetKey: n.key } });
  if (!i.data) {
    xt(this, bt, ue).call(this, "danger", "Could not check requirements.");
    return;
  }
  const o = /* @__PURE__ */ new Map();
  for (const u of i.data.items ?? [])
    u.status !== "satisfied" && o.set(xt(this, bt, Qr).call(this, u.requirementAlias, u.mediaTypeAlias), "create");
  this._requirements = { ruleset: n, report: i.data, choices: o };
};
Qr = function(n, i) {
  return `${n}::${i}`;
};
Mv = async function() {
  const n = this._requirements;
  if (!n) return;
  const i = [];
  for (const s of n.report.items ?? []) {
    if (s.status === "satisfied") continue;
    const f = n.choices.get(xt(this, bt, Qr).call(this, s.requirementAlias, s.mediaTypeAlias));
    !f || f === "decline" || i.push({
      requirementAlias: s.requirementAlias,
      mediaTypeAlias: s.mediaTypeAlias,
      action: f,
      mapToPropertyAlias: f === "map" ? s.candidatePropertyAlias : void 0
    });
  }
  const o = await $e.applyRequirements({ body: i });
  if (o.error) {
    xt(this, bt, ue).call(this, "danger", `Could not apply: ${JSON.stringify(o.error)}`);
    return;
  }
  const u = o.data;
  (u.errors ?? []).length > 0 ? xt(this, bt, ue).call(this, "danger", `Some changes failed: ${(u.errors ?? []).join("; ")}`) : xt(this, bt, ue).call(this, "positive", `Provisioned ${(u.createdProperties ?? []).length} propert(y/ies), mapped ${(u.mappedProperties ?? []).length}.`), await xt(this, bt, md).call(this, n.ruleset);
};
Nv = function() {
  const { ruleset: n, plan: i } = this._plan;
  return Vt`
      <uui-box headline="Dry run — ${n.name}" data-mark="mc:plan">
        <p data-mark="mc:plan-summary">
          ${i.moveCount === 0 ? "Nothing would move. Everything is already in place or no rules resolved." : `${i.moveCount} item(s) would move. Nothing has moved yet — review and confirm below.`}
        </p>
        ${(i.moves ?? []).length > 0 ? Vt`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Item</uui-table-head-cell>
                  <uui-table-head-cell>Target folder</uui-table-head-cell>
                  <uui-table-head-cell>Status</uui-table-head-cell>
                </uui-table-head>
                ${(i.moves ?? []).map(
    (o) => Vt`
                    <uui-table-row data-mark="mc:plan-move">
                      <uui-table-cell>${o.mediaName}</uui-table-cell>
                      <uui-table-cell>${o.targetPath}</uui-table-cell>
                      <uui-table-cell>${o.alreadyInPlace ? "already in place" : "will move"}</uui-table-cell>
                    </uui-table-row>
                  `
  )}
              </uui-table>
            ` : Tl}
        ${(i.skippedItems ?? []).length > 0 ? Vt`<details>
              <summary>${(i.skippedItems ?? []).length} item(s) skipped</summary>
              <ul>
                ${(i.skippedItems ?? []).map((o) => Vt`<li>${o}</li>`)}
              </ul>
            </details>` : Tl}
        <div class="actions">
          <uui-button label="Cancel" look="secondary" @click=${() => this._plan = void 0}></uui-button>
          ${i.moveCount > 0 ? Vt`<uui-button
                data-mark="mc:plan-execute"
                label="Move ${i.moveCount} item(s)"
                look="primary"
                color="positive"
                @click=${xt(this, bt, xv)}
              ></uui-button>` : Tl}
        </div>
      </uui-box>
    `;
};
Av = function() {
  const { ruleset: n, report: i, choices: o } = this._requirements;
  return Vt`
      <uui-box headline="Property requirements — ${n.name}" data-mark="mc:requirements">
        ${i.allSatisfied ? Vt`<p data-mark="mc:requirements-ok">
              All requirements are satisfied. Providers in this ruleset have everything they need.
            </p>` : Vt`<p>
              The providers in this ruleset need the following media type properties. Nothing is
              changed without your approval — choose what to do per property.
            </p>`}
        <uui-table>
          <uui-table-head>
            <uui-table-head-cell>Property</uui-table-head-cell>
            <uui-table-head-cell>Media type</uui-table-head-cell>
            <uui-table-head-cell>Status</uui-table-head-cell>
            <uui-table-head-cell>Action</uui-table-head-cell>
          </uui-table-head>
          ${(i.items ?? []).map((u) => {
    const s = xt(this, bt, Qr).call(this, u.requirementAlias, u.mediaTypeAlias);
    return Vt`
              <uui-table-row data-mark="mc:requirement-row">
                <uui-table-cell>
                  <strong>${u.requirementName}</strong><br />
                  <small>${u.requirementAlias}${u.mandatory ? " (required)" : " (optional)"}</small>
                </uui-table-cell>
                <uui-table-cell>${u.mediaTypeAlias}</uui-table-cell>
                <uui-table-cell>
                  <uui-tag
                    color=${u.status === "satisfied" ? "positive" : u.status === "partialMatch" ? "warning" : "danger"}
                    data-mark="mc:requirement-status"
                    >${u.status}</uui-tag
                  >
                </uui-table-cell>
                <uui-table-cell>
                  ${u.status === "satisfied" ? Vt`—` : Vt`
                        <uui-select
                          data-mark="mc:requirement-action"
                          label="Action"
                          .options=${[
      { name: `Create '${u.requirementAlias}'`, value: "create", selected: o.get(s) === "create" },
      ...u.candidatePropertyAlias ? [{ name: `Map onto '${u.candidatePropertyAlias}'`, value: "map", selected: o.get(s) === "map" }] : [],
      { name: "Decline (provider degraded)", value: "decline", selected: o.get(s) === "decline" }
    ]}
                          @change=${(f) => {
      o.set(s, f.target.value), this.requestUpdate();
    }}
                        ></uui-select>
                      `}
                </uui-table-cell>
              </uui-table-row>
            `;
  })}
        </uui-table>
        <div class="actions">
          <uui-button label="Close" look="secondary" @click=${() => this._requirements = void 0}></uui-button>
          ${i.allSatisfied ? Tl : Vt`<uui-button
                data-mark="mc:requirements-apply"
                label="Apply approved changes"
                look="primary"
                color="positive"
                @click=${xt(this, bt, Mv)}
              ></uui-button>`}
        </div>
      </uui-box>
    `;
};
Cv = async function() {
  if (this._settings) {
    this._savingSettings = !0;
    try {
      const n = await $e.saveSettings({ body: this._settings });
      if (n.error || !n.data) {
        xt(this, bt, ue).call(this, "danger", `Could not save settings: ${JSON.stringify(n.error ?? "no data")}`);
        return;
      }
      this._settings = n.data, xt(this, bt, ue).call(this, "positive", "Settings saved.");
    } finally {
      this._savingSettings = !1;
    }
  }
};
Tv = function(n) {
  const i = n.target.selection ?? [];
  this._reanalyzeMediaKeys = i, this._reanalyzeResults = [];
};
Dv = async function() {
  if (this._reanalyzeMediaKeys.length === 0) {
    xt(this, bt, ue).call(this, "danger", "Choose at least one image to re-analyze.");
    return;
  }
  this._reanalyzing = !0;
  try {
    const n = await $e.reanalyzeImages({
      body: { mediaKeys: this._reanalyzeMediaKeys }
    });
    if (n.error || !n.data) {
      xt(this, bt, ue).call(this, "danger", `Re-analyze failed: ${JSON.stringify(n.error ?? "no data")}`);
      return;
    }
    this._reanalyzeResults = n.data.results ?? [];
    const i = this._reanalyzeResults.filter((u) => u.analyzed).length, o = this._reanalyzeResults.length - i;
    o === 0 ? xt(this, bt, ue).call(this, "positive", `Re-analyzed ${i} image(s).`) : xt(this, bt, ue).call(this, "danger", `Re-analyzed ${i} image(s); ${o} could not be analyzed. See results below.`);
  } finally {
    this._reanalyzing = !1;
  }
};
Ov = function() {
  return Vt`
      <uui-box headline="Re-analyze image" data-mark="mc:reanalyze">
        <p>
          Force a fresh AI vision pass on selected images. Cached descriptions and tags are ignored
          and replaced with new results.
        </p>
        <div class="form">
          <uui-label>Images</uui-label>
          <umb-input-media
            data-mark="mc:reanalyze-media"
            .max=${20}
            .selection=${this._reanalyzeMediaKeys}
            @change=${xt(this, bt, Tv)}
          ></umb-input-media>
        </div>
        <div class="actions">
          <uui-button
            data-mark="mc:reanalyze-run"
            label="Re-analyze selected"
            look="primary"
            color="positive"
            .state=${this._reanalyzing ? "waiting" : void 0}
            ?disabled=${this._reanalyzeMediaKeys.length === 0}
            @click=${xt(this, bt, Dv)}
          ></uui-button>
        </div>
        ${this._reanalyzeResults.length > 0 ? Vt`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Image</uui-table-head-cell>
                  <uui-table-head-cell>Description</uui-table-head-cell>
                  <uui-table-head-cell>Tags</uui-table-head-cell>
                  <uui-table-head-cell>Code</uui-table-head-cell>
                </uui-table-head>
                ${this._reanalyzeResults.map(
    (n) => Vt`
                    <uui-table-row data-mark="mc:reanalyze-result">
                      <uui-table-cell>${n.mediaName ?? n.mediaKey}</uui-table-cell>
                      <uui-table-cell>
                        ${n.analyzed ? n.description ?? "—" : Vt`<em>${n.error ?? "Not analyzed"}</em>`}
                      </uui-table-cell>
                      <uui-table-cell>${(n.tags ?? []).join(", ") || "—"}</uui-table-cell>
                      <uui-table-cell>${n.classificationCode ?? "—"}</uui-table-cell>
                    </uui-table-row>
                  `
  )}
              </uui-table>
            ` : Tl}
      </uui-box>
    `;
};
Rv = function() {
  const n = this._settings;
  return n ? Vt`
      <uui-box headline="Setup" data-mark="mc:settings">
        <p>
          When AI recognition is enabled, Media Curator can store the image description on each media
          item so classification can run again without re-sending the image to the vision model.
        </p>
        <div class="form">
          <uui-label for="mc-persist-description">Save image description</uui-label>
          <uui-toggle
            id="mc-persist-description"
            data-mark="mc:persist-description"
            label="Save image description"
            .checked=${n.persistImageDescription}
            @change=${(i) => {
    this._settings = {
      ...n,
      persistImageDescription: i.target.checked
    };
  }}
          ></uui-toggle>
        </div>
        <div class="actions">
          <uui-button
            data-mark="mc:settings-save"
            label="Save settings"
            look="primary"
            color="positive"
            .state=${this._savingSettings ? "waiting" : void 0}
            @click=${xt(this, bt, Cv)}
          ></uui-button>
        </div>
      </uui-box>
    ` : Tl;
};
Hv = function() {
  return Vt`
      ${xt(this, bt, Rv).call(this)}
      ${xt(this, bt, Ov).call(this)}
      <uui-box headline="Curation rulesets">
        <uui-button
          slot="header-actions"
          look="primary"
          label="Create ruleset"
          @click=${xt(this, bt, _v)}
        ></uui-button>
        ${this._rulesets.length === 0 ? Vt`<p data-mark="mc:empty">
              No rulesets yet. Create one and attach it to a media folder to start curating.
            </p>` : Vt`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Name</uui-table-head-cell>
                  <uui-table-head-cell>Rules</uui-table-head-cell>
                  <uui-table-head-cell>Enabled</uui-table-head-cell>
                  <uui-table-head-cell></uui-table-head-cell>
                </uui-table-head>
                ${X1(
    this._rulesets,
    (n) => n.key,
    (n) => Vt`
                    <uui-table-row data-mark="mc:ruleset-row">
                      <uui-table-cell>${n.name}</uui-table-cell>
                      <uui-table-cell>${n.rules?.length ?? 0}</uui-table-cell>
                      <uui-table-cell>${n.enabled ? "Yes" : "No"}</uui-table-cell>
                      <uui-table-cell>
                        <uui-button
                          label="Edit ${n.name}"
                          look="secondary"
                          @click=${() => xt(this, bt, Sv).call(this, n)}
                        ></uui-button>
                        <uui-button
                          label="Requirements for ${n.name}"
                          look="secondary"
                          @click=${() => xt(this, bt, md).call(this, n)}
                        ></uui-button>
                        <uui-button
                          label="Curate now ${n.name}"
                          look="primary"
                          @click=${() => xt(this, bt, bv).call(this, n)}
                        ></uui-button>
                        <uui-button
                          label="Delete ${n.name}"
                          look="secondary"
                          color="danger"
                          @click=${() => xt(this, bt, wv).call(this, n)}
                        ></uui-button>
                      </uui-table-cell>
                    </uui-table-row>
                  `
  )}
              </uui-table>
            `}
      </uui-box>
      ${xt(this, bt, Bv).call(this)}
    `;
};
kv = async function(n) {
  const i = await $e.undoRun({ path: { runKey: n.key } });
  if (i.error || !i.data) {
    xt(this, bt, ue).call(this, "danger", `Undo failed: ${JSON.stringify(i.error ?? "no data")}`);
    return;
  }
  const o = i.data;
  xt(this, bt, ue).call(this, "positive", `Undo: ${o.moved} restored, ${o.alreadyInPlace} already in place, ${o.failed} failed.`), await xt(this, bt, si).call(this);
};
Bv = function() {
  return this._runs.length === 0 ? Tl : Vt`
      <uui-box headline="Activity log" data-mark="mc:activity-log">
        <uui-table>
          <uui-table-head>
            <uui-table-head-cell>Started</uui-table-head-cell>
            <uui-table-head-cell>Trigger</uui-table-head-cell>
            <uui-table-head-cell>Moved</uui-table-head-cell>
            <uui-table-head-cell>In place</uui-table-head-cell>
            <uui-table-head-cell>Failed</uui-table-head-cell>
            <uui-table-head-cell></uui-table-head-cell>
          </uui-table-head>
          ${this._runs.map(
    (n) => Vt`
              <uui-table-row data-mark="mc:run-row">
                <uui-table-cell>${new Date(n.started).toLocaleString()}</uui-table-cell>
                <uui-table-cell>${n.trigger}</uui-table-cell>
                <uui-table-cell data-mark="mc:run-moved">${n.moved}</uui-table-cell>
                <uui-table-cell>${n.alreadyInPlace}</uui-table-cell>
                <uui-table-cell>${n.failed}</uui-table-cell>
                <uui-table-cell>
                  ${n.moved > 0 && !n.trigger.startsWith("undo:") ? Vt`<uui-button
                        data-mark="mc:run-undo"
                        compact
                        look="secondary"
                        label="Undo run from ${new Date(n.started).toLocaleString()}"
                        @click=${() => xt(this, bt, kv).call(this, n)}
                        >Undo</uui-button
                      >` : Tl}
                </uui-table-cell>
              </uui-table-row>
            `
  )}
        </uui-table>
      </uui-box>
    `;
};
Uv = function() {
  const n = this._editing;
  return Vt`
      <uui-box headline=${n.name ? `Edit: ${n.name}` : "New ruleset"}>
        <div class="form">
          <uui-label for="mc-name">Name</uui-label>
          <uui-input
            id="mc-name"
            data-mark="mc:name"
            label="Ruleset name"
            .value=${n.name ?? ""}
            @input=${(i) => this._editing = { ...n, name: i.target.value }}
          ></uui-input>

          <uui-label>Scope folder</uui-label>
          <umb-input-media
            data-mark="mc:scope"
            .max=${1}
            .selection=${n.scopeRootKey ? [n.scopeRootKey] : []}
            @change=${xt(this, bt, zv)}
          ></umb-input-media>

          <uui-label>Enabled</uui-label>
          <uui-toggle
            data-mark="mc:enabled"
            label="Enabled"
            .checked=${n.enabled ?? !0}
            @change=${(i) => this._editing = { ...n, enabled: i.target.checked }}
          ></uui-toggle>
        </div>

        <h4>Rules</h4>
        <mc-rule-flow
          .rules=${n.rules ?? []}
          .providers=${this._providers}
          .scopeName=${n.name || "Scope"}
          @rules-change=${(i) => this._editing = { ...n, rules: i.detail.rules }}
        ></mc-rule-flow>

        <div class="actions">
          <uui-button label="Cancel" look="secondary" @click=${() => this._editing = void 0}></uui-button>
          <uui-button data-mark="mc:save" label="Save" look="primary" color="positive" @click=${xt(this, bt, Ev)}></uui-button>
        </div>
      </uui-box>
    `;
};
be.styles = [
  Sp`
      :host {
        display: block;
        padding: var(--uui-size-layout-1);
      }
      .form {
        display: grid;
        grid-template-columns: 180px 1fr;
        gap: var(--uui-size-space-3) var(--uui-size-space-5);
        align-items: center;
        margin-bottom: var(--uui-size-space-5);
      }
      .rule {
        margin-bottom: var(--uui-size-space-4);
      }
      .actions {
        display: flex;
        gap: var(--uui-size-space-3);
        justify-content: flex-end;
        margin-top: var(--uui-size-space-5);
      }
    `
];
Ge([
  on()
], be.prototype, "_rulesets", 2);
Ge([
  on()
], be.prototype, "_providers", 2);
Ge([
  on()
], be.prototype, "_editing", 2);
Ge([
  on()
], be.prototype, "_loading", 2);
Ge([
  on()
], be.prototype, "_requirements", 2);
Ge([
  on()
], be.prototype, "_plan", 2);
Ge([
  on()
], be.prototype, "_runs", 2);
Ge([
  on()
], be.prototype, "_settings", 2);
Ge([
  on()
], be.prototype, "_savingSettings", 2);
Ge([
  on()
], be.prototype, "_reanalyzeMediaKeys", 2);
Ge([
  on()
], be.prototype, "_reanalyzeResults", 2);
Ge([
  on()
], be.prototype, "_reanalyzing", 2);
be = Ge([
  wp("mediacurator-dashboard")
], be);
const Z3 = be;
export {
  be as MediaCuratorDashboardElement,
  Z3 as default
};
//# sourceMappingURL=mediacurator-dashboard.element-CWgddJ-1.js.map
