import { LitElement as Ep, html as Ve, css as zp, property as If, customElement as Mp, nothing as Rl, repeat as J1, state as un } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as Np } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT as F1 } from "@umbraco-cms/backoffice/notification";
import { umbConfirmModal as W1 } from "@umbraco-cms/backoffice/modal";
import { c as tt } from "./client.gen-CkijBioZ.js";
function Cp(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var vf = { exports: {} }, we = {};
var n0;
function I1() {
  if (n0) return we;
  n0 = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), a = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), u = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), g = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), b = /* @__PURE__ */ Symbol.for("react.lazy"), y = /* @__PURE__ */ Symbol.for("react.activity"), v = Symbol.iterator;
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
  }, A = Object.assign, C = {};
  function M(z, H, P) {
    this.props = z, this.context = H, this.refs = C, this.updater = P || w;
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
  function q() {
  }
  q.prototype = M.prototype;
  function _(z, H, P) {
    this.props = z, this.context = H, this.refs = C, this.updater = P || w;
  }
  var N = _.prototype = new q();
  N.constructor = _, A(N, M.prototype), N.isPureReactComponent = !0;
  var j = Array.isArray;
  function R() {
  }
  var B = { H: null, A: null, T: null, S: null }, X = Object.prototype.hasOwnProperty;
  function J(z, H, P) {
    var le = P.ref;
    return {
      $$typeof: n,
      type: z,
      key: H,
      ref: le !== void 0 ? le : null,
      props: P
    };
  }
  function ue(z, H) {
    return J(z.type, H, z.props);
  }
  function $(z) {
    return typeof z == "object" && z !== null && z.$$typeof === n;
  }
  function I(z) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + z.replace(/[=:]/g, function(P) {
      return H[P];
    });
  }
  var oe = /\/+/g;
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
        switch (typeof z.status == "string" ? z.then(R, R) : (z.status = "pending", z.then(
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
  function E(z, H, P, le, re) {
    var fe = typeof z;
    (fe === "undefined" || fe === "boolean") && (z = null);
    var ce = !1;
    if (z === null) ce = !0;
    else
      switch (fe) {
        case "bigint":
        case "string":
        case "number":
          ce = !0;
          break;
        case "object":
          switch (z.$$typeof) {
            case n:
            case a:
              ce = !0;
              break;
            case b:
              return ce = z._init, E(
                ce(z._payload),
                H,
                P,
                le,
                re
              );
          }
      }
    if (ce)
      return re = re(z), ce = le === "" ? "." + T(z, 0) : le, j(re) ? (P = "", ce != null && (P = ce.replace(oe, "$&/") + "/"), E(re, H, P, "", function(Se) {
        return Se;
      })) : re != null && ($(re) && (re = ue(
        re,
        P + (re.key == null || z && z.key === re.key ? "" : ("" + re.key).replace(
          oe,
          "$&/"
        ) + "/") + ce
      )), H.push(re)), 1;
    ce = 0;
    var ee = le === "" ? "." : le + ":";
    if (j(z))
      for (var se = 0; se < z.length; se++)
        le = z[se], fe = ee + T(le, se), ce += E(
          le,
          H,
          P,
          fe,
          re
        );
    else if (se = S(z), typeof se == "function")
      for (z = se.call(z), se = 0; !(le = z.next()).done; )
        le = le.value, fe = ee + T(le, se++), ce += E(
          le,
          H,
          P,
          fe,
          re
        );
    else if (fe === "object") {
      if (typeof z.then == "function")
        return E(
          V(z),
          H,
          P,
          le,
          re
        );
      throw H = String(z), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(z).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ce;
  }
  function O(z, H, P) {
    if (z == null) return z;
    var le = [], re = 0;
    return E(z, le, "", "", function(fe) {
      return H.call(P, fe, re++);
    }), le;
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
  }, ne = {
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
      if (!$(z))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return z;
    }
  };
  return we.Activity = y, we.Children = ne, we.Component = M, we.Fragment = o, we.Profiler = s, we.PureComponent = _, we.StrictMode = u, we.Suspense = p, we.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B, we.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(z) {
      return B.H.useMemoCache(z);
    }
  }, we.cache = function(z) {
    return function() {
      return z.apply(null, arguments);
    };
  }, we.cacheSignal = function() {
    return null;
  }, we.cloneElement = function(z, H, P) {
    if (z == null)
      throw Error(
        "The argument must be a React element, but you passed " + z + "."
      );
    var le = A({}, z.props), re = z.key;
    if (H != null)
      for (fe in H.key !== void 0 && (re = "" + H.key), H)
        !X.call(H, fe) || fe === "key" || fe === "__self" || fe === "__source" || fe === "ref" && H.ref === void 0 || (le[fe] = H[fe]);
    var fe = arguments.length - 2;
    if (fe === 1) le.children = P;
    else if (1 < fe) {
      for (var ce = Array(fe), ee = 0; ee < fe; ee++)
        ce[ee] = arguments[ee + 2];
      le.children = ce;
    }
    return J(z.type, re, le);
  }, we.createContext = function(z) {
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
  }, we.createElement = function(z, H, P) {
    var le, re = {}, fe = null;
    if (H != null)
      for (le in H.key !== void 0 && (fe = "" + H.key), H)
        X.call(H, le) && le !== "key" && le !== "__self" && le !== "__source" && (re[le] = H[le]);
    var ce = arguments.length - 2;
    if (ce === 1) re.children = P;
    else if (1 < ce) {
      for (var ee = Array(ce), se = 0; se < ce; se++)
        ee[se] = arguments[se + 2];
      re.children = ee;
    }
    if (z && z.defaultProps)
      for (le in ce = z.defaultProps, ce)
        re[le] === void 0 && (re[le] = ce[le]);
    return J(z, fe, re);
  }, we.createRef = function() {
    return { current: null };
  }, we.forwardRef = function(z) {
    return { $$typeof: g, render: z };
  }, we.isValidElement = $, we.lazy = function(z) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: z },
      _init: L
    };
  }, we.memo = function(z, H) {
    return {
      $$typeof: h,
      type: z,
      compare: H === void 0 ? null : H
    };
  }, we.startTransition = function(z) {
    var H = B.T, P = {};
    B.T = P;
    try {
      var le = z(), re = B.S;
      re !== null && re(P, le), typeof le == "object" && le !== null && typeof le.then == "function" && le.then(R, Z);
    } catch (fe) {
      Z(fe);
    } finally {
      H !== null && P.types !== null && (H.types = P.types), B.T = H;
    }
  }, we.unstable_useCacheRefresh = function() {
    return B.H.useCacheRefresh();
  }, we.use = function(z) {
    return B.H.use(z);
  }, we.useActionState = function(z, H, P) {
    return B.H.useActionState(z, H, P);
  }, we.useCallback = function(z, H) {
    return B.H.useCallback(z, H);
  }, we.useContext = function(z) {
    return B.H.useContext(z);
  }, we.useDebugValue = function() {
  }, we.useDeferredValue = function(z, H) {
    return B.H.useDeferredValue(z, H);
  }, we.useEffect = function(z, H) {
    return B.H.useEffect(z, H);
  }, we.useEffectEvent = function(z) {
    return B.H.useEffectEvent(z);
  }, we.useId = function() {
    return B.H.useId();
  }, we.useImperativeHandle = function(z, H, P) {
    return B.H.useImperativeHandle(z, H, P);
  }, we.useInsertionEffect = function(z, H) {
    return B.H.useInsertionEffect(z, H);
  }, we.useLayoutEffect = function(z, H) {
    return B.H.useLayoutEffect(z, H);
  }, we.useMemo = function(z, H) {
    return B.H.useMemo(z, H);
  }, we.useOptimistic = function(z, H) {
    return B.H.useOptimistic(z, H);
  }, we.useReducer = function(z, H, P) {
    return B.H.useReducer(z, H, P);
  }, we.useRef = function(z) {
    return B.H.useRef(z);
  }, we.useState = function(z) {
    return B.H.useState(z);
  }, we.useSyncExternalStore = function(z, H, P) {
    return B.H.useSyncExternalStore(
      z,
      H,
      P
    );
  }, we.useTransition = function() {
    return B.H.useTransition();
  }, we.version = "19.2.7", we;
}
var l0;
function ko() {
  return l0 || (l0 = 1, vf.exports = I1()), vf.exports;
}
var F = ko();
const P1 = /* @__PURE__ */ Cp(F);
var bf = { exports: {} }, mo = {}, xf = { exports: {} }, _f = {};
var a0;
function ex() {
  return a0 || (a0 = 1, (function(n) {
    function a(E, O) {
      var L = E.length;
      E.push(O);
      e: for (; 0 < L; ) {
        var Z = L - 1 >>> 1, ne = E[Z];
        if (0 < s(ne, O))
          E[Z] = O, E[L] = ne, L = Z;
        else break e;
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
        e: for (var Z = 0, ne = E.length, z = ne >>> 1; Z < z; ) {
          var H = 2 * (Z + 1) - 1, P = E[H], le = H + 1, re = E[le];
          if (0 > s(P, L))
            le < ne && 0 > s(re, P) ? (E[Z] = re, E[le] = L, Z = le) : (E[Z] = P, E[H] = L, Z = H);
          else if (le < ne && 0 > s(re, L))
            E[Z] = re, E[le] = L, Z = le;
          else break e;
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
    var p = [], h = [], b = 1, y = null, v = 3, S = !1, w = !1, A = !1, C = !1, M = typeof setTimeout == "function" ? setTimeout : null, q = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function N(E) {
      for (var O = o(h); O !== null; ) {
        if (O.callback === null) u(h);
        else if (O.startTime <= E)
          u(h), O.sortIndex = O.expirationTime, a(p, O);
        else break;
        O = o(h);
      }
    }
    function j(E) {
      if (A = !1, N(E), !w)
        if (o(p) !== null)
          w = !0, R || (R = !0, I());
        else {
          var O = o(h);
          O !== null && V(j, O.startTime - E);
        }
    }
    var R = !1, B = -1, X = 5, J = -1;
    function ue() {
      return C ? !0 : !(n.unstable_now() - J < X);
    }
    function $() {
      if (C = !1, R) {
        var E = n.unstable_now();
        J = E;
        var O = !0;
        try {
          e: {
            w = !1, A && (A = !1, q(B), B = -1), S = !0;
            var L = v;
            try {
              t: {
                for (N(E), y = o(p); y !== null && !(y.expirationTime > E && ue()); ) {
                  var Z = y.callback;
                  if (typeof Z == "function") {
                    y.callback = null, v = y.priorityLevel;
                    var ne = Z(
                      y.expirationTime <= E
                    );
                    if (E = n.unstable_now(), typeof ne == "function") {
                      y.callback = ne, N(E), O = !0;
                      break t;
                    }
                    y === o(p) && u(p), N(E);
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
              break e;
            } finally {
              y = null, v = L, S = !1;
            }
            O = void 0;
          }
        } finally {
          O ? I() : R = !1;
        }
      }
    }
    var I;
    if (typeof _ == "function")
      I = function() {
        _($);
      };
    else if (typeof MessageChannel < "u") {
      var oe = new MessageChannel(), T = oe.port2;
      oe.port1.onmessage = $, I = function() {
        T.postMessage(null);
      };
    } else
      I = function() {
        M($, 0);
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
      ) : X = 0 < E ? Math.floor(1e3 / E) : 5;
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
      C = !0;
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
      var Z = n.unstable_now();
      switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? Z + L : Z) : L = Z, E) {
        case 1:
          var ne = -1;
          break;
        case 2:
          ne = 250;
          break;
        case 5:
          ne = 1073741823;
          break;
        case 4:
          ne = 1e4;
          break;
        default:
          ne = 5e3;
      }
      return ne = L + ne, E = {
        id: b++,
        callback: O,
        priorityLevel: E,
        startTime: L,
        expirationTime: ne,
        sortIndex: -1
      }, L > Z ? (E.sortIndex = L, a(h, E), o(p) === null && E === o(h) && (A ? (q(B), B = -1) : A = !0, V(j, L - Z))) : (E.sortIndex = ne, a(p, E), w || S || (w = !0, R || (R = !0, I()))), E;
    }, n.unstable_shouldYield = ue, n.unstable_wrapCallback = function(E) {
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
  })(_f)), _f;
}
var i0;
function tx() {
  return i0 || (i0 = 1, xf.exports = ex()), xf.exports;
}
var Sf = { exports: {} }, vt = {};
var o0;
function nx() {
  if (o0) return vt;
  o0 = 1;
  var n = ko();
  function a(p) {
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
        throw Error(a(522));
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
  return vt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, vt.createPortal = function(p, h) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(a(299));
    return f(p, h, null, b);
  }, vt.flushSync = function(p) {
    var h = d.T, b = u.p;
    try {
      if (d.T = null, u.p = 2, p) return p();
    } finally {
      d.T = h, u.p = b, u.d.f();
    }
  }, vt.preconnect = function(p, h) {
    typeof p == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, u.d.C(p, h));
  }, vt.prefetchDNS = function(p) {
    typeof p == "string" && u.d.D(p);
  }, vt.preinit = function(p, h) {
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
  }, vt.preinitModule = function(p, h) {
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
  }, vt.preload = function(p, h) {
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
  }, vt.preloadModule = function(p, h) {
    if (typeof p == "string")
      if (h) {
        var b = g(h.as, h.crossOrigin);
        u.d.m(p, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: b,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else u.d.m(p);
  }, vt.requestFormReset = function(p) {
    u.d.r(p);
  }, vt.unstable_batchedUpdates = function(p, h) {
    return p(h);
  }, vt.useFormState = function(p, h, b) {
    return d.H.useFormState(p, h, b);
  }, vt.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, vt.version = "19.2.7", vt;
}
var u0;
function Ap() {
  if (u0) return Sf.exports;
  u0 = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Sf.exports = nx(), Sf.exports;
}
var r0;
function lx() {
  if (r0) return mo;
  r0 = 1;
  var n = tx(), a = ko(), o = Ap();
  function u(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function f(e) {
    var t = e, l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (l = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function d(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (f(e) !== e)
      throw Error(u(188));
  }
  function h(e) {
    var t = e.alternate;
    if (!t) {
      if (t = f(e), t === null) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var l = e, i = t; ; ) {
      var r = l.return;
      if (r === null) break;
      var c = r.alternate;
      if (c === null) {
        if (i = r.return, i !== null) {
          l = i;
          continue;
        }
        break;
      }
      if (r.child === c.child) {
        for (c = r.child; c; ) {
          if (c === l) return p(r), e;
          if (c === i) return p(r), t;
          c = c.sibling;
        }
        throw Error(u(188));
      }
      if (l.return !== i.return) l = r, i = c;
      else {
        for (var m = !1, x = r.child; x; ) {
          if (x === l) {
            m = !0, l = r, i = c;
            break;
          }
          if (x === i) {
            m = !0, i = r, l = c;
            break;
          }
          x = x.sibling;
        }
        if (!m) {
          for (x = c.child; x; ) {
            if (x === l) {
              m = !0, l = c, i = r;
              break;
            }
            if (x === i) {
              m = !0, i = c, l = r;
              break;
            }
            x = x.sibling;
          }
          if (!m) throw Error(u(189));
        }
      }
      if (l.alternate !== i) throw Error(u(190));
    }
    if (l.tag !== 3) throw Error(u(188));
    return l.stateNode.current === l ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = b(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var y = Object.assign, v = /* @__PURE__ */ Symbol.for("react.element"), S = /* @__PURE__ */ Symbol.for("react.transitional.element"), w = /* @__PURE__ */ Symbol.for("react.portal"), A = /* @__PURE__ */ Symbol.for("react.fragment"), C = /* @__PURE__ */ Symbol.for("react.strict_mode"), M = /* @__PURE__ */ Symbol.for("react.profiler"), q = /* @__PURE__ */ Symbol.for("react.consumer"), _ = /* @__PURE__ */ Symbol.for("react.context"), N = /* @__PURE__ */ Symbol.for("react.forward_ref"), j = /* @__PURE__ */ Symbol.for("react.suspense"), R = /* @__PURE__ */ Symbol.for("react.suspense_list"), B = /* @__PURE__ */ Symbol.for("react.memo"), X = /* @__PURE__ */ Symbol.for("react.lazy"), J = /* @__PURE__ */ Symbol.for("react.activity"), ue = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), $ = Symbol.iterator;
  function I(e) {
    return e === null || typeof e != "object" ? null : (e = $ && e[$] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var oe = /* @__PURE__ */ Symbol.for("react.client.reference");
  function T(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === oe ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case A:
        return "Fragment";
      case M:
        return "Profiler";
      case C:
        return "StrictMode";
      case j:
        return "Suspense";
      case R:
        return "SuspenseList";
      case J:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case _:
          return e.displayName || "Context";
        case q:
          return (e._context.displayName || "Context") + ".Consumer";
        case N:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case B:
          return t = e.displayName || null, t !== null ? t : T(e.type) || "Memo";
        case X:
          t = e._payload, e = e._init;
          try {
            return T(e(t));
          } catch {
          }
      }
    return null;
  }
  var V = Array.isArray, E = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Z = [], ne = -1;
  function z(e) {
    return { current: e };
  }
  function H(e) {
    0 > ne || (e.current = Z[ne], Z[ne] = null, ne--);
  }
  function P(e, t) {
    ne++, Z[ne] = e.current, e.current = t;
  }
  var le = z(null), re = z(null), fe = z(null), ce = z(null);
  function ee(e, t) {
    switch (P(fe, t), P(re, e), P(le, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? zm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = zm(t), e = Mm(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    H(le), P(le, e);
  }
  function se() {
    H(le), H(re), H(fe);
  }
  function Se(e) {
    e.memoizedState !== null && P(ce, e);
    var t = le.current, l = Mm(t, e.type);
    t !== l && (P(re, e), P(le, l));
  }
  function _e(e) {
    re.current === e && (H(le), H(re)), ce.current === e && (H(ce), so._currentValue = L);
  }
  var ge, ye;
  function Ee(e) {
    if (ge === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ge = t && t[1] || "", ye = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ge + e + ye;
  }
  var Re = !1;
  function $e(e, t) {
    if (!e || Re) return "";
    Re = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var ie = function() {
                throw Error();
              };
              if (Object.defineProperty(ie.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(ie, []);
                } catch (W) {
                  var K = W;
                }
                Reflect.construct(e, [], ie);
              } else {
                try {
                  ie.call();
                } catch (W) {
                  K = W;
                }
                e.call(ie.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (W) {
                K = W;
              }
              (ie = e()) && typeof ie.catch == "function" && ie.catch(function() {
              });
            }
          } catch (W) {
            if (W && K && typeof W.stack == "string")
              return [W.stack, K.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var r = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      r && r.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = i.DetermineComponentFrameRoot(), m = c[0], x = c[1];
      if (m && x) {
        var D = m.split(`
`), Q = x.split(`
`);
        for (r = i = 0; i < D.length && !D[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; r < Q.length && !Q[r].includes(
          "DetermineComponentFrameRoot"
        ); )
          r++;
        if (i === D.length || r === Q.length)
          for (i = D.length - 1, r = Q.length - 1; 1 <= i && 0 <= r && D[i] !== Q[r]; )
            r--;
        for (; 1 <= i && 0 <= r; i--, r--)
          if (D[i] !== Q[r]) {
            if (i !== 1 || r !== 1)
              do
                if (i--, r--, 0 > r || D[i] !== Q[r]) {
                  var te = `
` + D[i].replace(" at new ", " at ");
                  return e.displayName && te.includes("<anonymous>") && (te = te.replace("<anonymous>", e.displayName)), te;
                }
              while (1 <= i && 0 <= r);
            break;
          }
      }
    } finally {
      Re = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Ee(l) : "";
  }
  function pt(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ee(e.type);
      case 16:
        return Ee("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ee("Suspense Fallback") : Ee("Suspense");
      case 19:
        return Ee("SuspenseList");
      case 0:
      case 15:
        return $e(e.type, !1);
      case 11:
        return $e(e.type.render, !1);
      case 1:
        return $e(e.type, !0);
      case 31:
        return Ee("Activity");
      default:
        return "";
    }
  }
  function Kt(e) {
    try {
      var t = "", l = null;
      do
        t += pt(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var wt = Object.prototype.hasOwnProperty, Et = n.unstable_scheduleCallback, kt = n.unstable_cancelCallback, Hl = n.unstable_shouldYield, Cn = n.unstable_requestPaint, Ie = n.unstable_now, Bt = n.unstable_getCurrentPriorityLevel, Jt = n.unstable_ImmediatePriority, Ft = n.unstable_UserBlockingPriority, Wt = n.unstable_NormalPriority, tc = n.unstable_LowPriority, ha = n.unstable_IdlePriority, nc = n.log, lc = n.unstable_setDisableYieldValue, kl = null, xt = null;
  function bn(e) {
    if (typeof nc == "function" && lc(e), xt && typeof xt.setStrictMode == "function")
      try {
        xt.setStrictMode(kl, e);
      } catch {
      }
  }
  var _t = Math.clz32 ? Math.clz32 : oc, ac = Math.log, ic = Math.LN2;
  function oc(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ac(e) / ic | 0) | 0;
  }
  var ga = 256, ma = 262144, pa = 4194304;
  function An(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
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
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
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
        return e;
    }
  }
  function ya(e, t, l) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var r = 0, c = e.suspendedLanes, m = e.pingedLanes;
    e = e.warmLanes;
    var x = i & 134217727;
    return x !== 0 ? (i = x & ~c, i !== 0 ? r = An(i) : (m &= x, m !== 0 ? r = An(m) : l || (l = x & ~e, l !== 0 && (r = An(l))))) : (x = i & ~c, x !== 0 ? r = An(x) : m !== 0 ? r = An(m) : l || (l = i & ~e, l !== 0 && (r = An(l)))), r === 0 ? 0 : t !== 0 && t !== r && (t & c) === 0 && (c = r & -r, l = t & -t, c >= l || c === 32 && (l & 4194048) !== 0) ? t : r;
  }
  function Bl(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function uc(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
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
        return t + 5e3;
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
  function $o() {
    var e = pa;
    return pa <<= 1, (pa & 62914560) === 0 && (pa = 4194304), e;
  }
  function yi(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Ul(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function rc(e, t, l, i, r, c) {
    var m = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var x = e.entanglements, D = e.expirationTimes, Q = e.hiddenUpdates;
    for (l = m & ~l; 0 < l; ) {
      var te = 31 - _t(l), ie = 1 << te;
      x[te] = 0, D[te] = -1;
      var K = Q[te];
      if (K !== null)
        for (Q[te] = null, te = 0; te < K.length; te++) {
          var W = K[te];
          W !== null && (W.lane &= -536870913);
        }
      l &= ~ie;
    }
    i !== 0 && Zo(e, i, 0), c !== 0 && r === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(m & ~t));
  }
  function Zo(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var i = 31 - _t(t);
    e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | l & 261930;
  }
  function Go(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var i = 31 - _t(l), r = 1 << i;
      r & t | e[i] & t && (e[i] |= t), l &= ~r;
    }
  }
  function Qo(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : vi(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function vi(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function bi(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ko() {
    var e = O.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Jm(e.type));
  }
  function Jo(e, t) {
    var l = O.p;
    try {
      return O.p = e, t();
    } finally {
      O.p = l;
    }
  }
  var xn = Math.random().toString(36).slice(2), ct = "__reactFiber$" + xn, yt = "__reactProps$" + xn, Tn = "__reactContainer$" + xn, va = "__reactEvents$" + xn, Fo = "__reactListeners$" + xn, cc = "__reactHandles$" + xn, Wo = "__reactResources$" + xn, ql = "__reactMarker$" + xn;
  function xi(e) {
    delete e[ct], delete e[yt], delete e[va], delete e[Fo], delete e[cc];
  }
  function tl(e) {
    var t = e[ct];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Tn] || l[ct]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = Rm(e); e !== null; ) {
            if (l = e[ct]) return l;
            e = Rm(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function nl(e) {
    if (e = e[ct] || e[Tn]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function ll(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function al(e) {
    var t = e[Wo];
    return t || (t = e[Wo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function nt(e) {
    e[ql] = !0;
  }
  var Io = /* @__PURE__ */ new Set(), Po = {};
  function Dn(e, t) {
    il(e, t), il(e + "Capture", t);
  }
  function il(e, t) {
    for (Po[e] = t, e = 0; e < t.length; e++)
      Io.add(t[e]);
  }
  var sc = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), eu = {}, _i = {};
  function fc(e) {
    return wt.call(_i, e) ? !0 : wt.call(eu, e) ? !1 : sc.test(e) ? _i[e] = !0 : (eu[e] = !0, !1);
  }
  function ba(e, t, l) {
    if (fc(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var i = t.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + l);
      }
  }
  function xa(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + l);
    }
  }
  function rn(e, t, l, i) {
    if (i === null) e.removeAttribute(l);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, "" + i);
    }
  }
  function zt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function tu(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function dc(e, t, l) {
    var i = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var r = i.get, c = i.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(m) {
          l = "" + m, c.call(this, m);
        }
      }), Object.defineProperty(e, t, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(m) {
          l = "" + m;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Si(e) {
    if (!e._valueTracker) {
      var t = tu(e) ? "checked" : "value";
      e._valueTracker = dc(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function wi(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), i = "";
    return e && (i = tu(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== l ? (t.setValue(e), !0) : !1;
  }
  function _a(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var nu = /[\n"\\]/g;
  function Mt(e) {
    return e.replace(
      nu,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ei(e, t, l, i, r, c, m, x) {
    e.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? e.type = m : e.removeAttribute("type"), t != null ? m === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + zt(t)) : e.value !== "" + zt(t) && (e.value = "" + zt(t)) : m !== "submit" && m !== "reset" || e.removeAttribute("value"), t != null ? zi(e, m, zt(t)) : l != null ? zi(e, m, zt(l)) : i != null && e.removeAttribute("value"), r == null && c != null && (e.defaultChecked = !!c), r != null && (e.checked = r && typeof r != "function" && typeof r != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.name = "" + zt(x) : e.removeAttribute("name");
  }
  function Sa(e, t, l, i, r, c, m, x) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || l != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        Si(e);
        return;
      }
      l = l != null ? "" + zt(l) : "", t = t != null ? "" + zt(t) : l, x || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? r, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = x ? e.checked : !!i, e.defaultChecked = !!i, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (e.name = m), Si(e);
  }
  function zi(e, t, l) {
    t === "number" && _a(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function ol(e, t, l, i) {
    if (e = e.options, t) {
      t = {};
      for (var r = 0; r < l.length; r++)
        t["$" + l[r]] = !0;
      for (l = 0; l < e.length; l++)
        r = t.hasOwnProperty("$" + e[l].value), e[l].selected !== r && (e[l].selected = r), r && i && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + zt(l), t = null, r = 0; r < e.length; r++) {
        if (e[r].value === l) {
          e[r].selected = !0, i && (e[r].defaultSelected = !0);
          return;
        }
        t !== null || e[r].disabled || (t = e[r]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Mi(e, t, l) {
    if (t != null && (t = "" + zt(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + zt(l) : "";
  }
  function _d(e, t, l, i) {
    if (t == null) {
      if (i != null) {
        if (l != null) throw Error(u(92));
        if (V(i)) {
          if (1 < i.length) throw Error(u(93));
          i = i[0];
        }
        l = i;
      }
      l == null && (l = ""), t = l;
    }
    l = zt(t), e.defaultValue = l, i = e.textContent, i === l && i !== "" && i !== null && (e.value = i), Si(e);
  }
  function wa(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var $v = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Sd(e, t, l) {
    var i = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, l) : typeof l != "number" || l === 0 || $v.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function wd(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(u(62));
    if (e = e.style, l != null) {
      for (var i in l)
        !l.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "");
      for (var r in t)
        i = t[r], t.hasOwnProperty(r) && l[r] !== i && Sd(e, r, i);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && Sd(e, c, t[c]);
  }
  function hc(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
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
  var Zv = /* @__PURE__ */ new Map([
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
  ]), Gv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function lu(e) {
    return Gv.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function On() {
  }
  var gc = null;
  function mc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Ea = null, za = null;
  function Ed(e) {
    var t = nl(e);
    if (t && (e = t.stateNode)) {
      var l = e[yt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ei(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), t = l.name, l.type === "radio" && t != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + Mt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var i = l[t];
              if (i !== e && i.form === e.form) {
                var r = i[yt] || null;
                if (!r) throw Error(u(90));
                Ei(
                  i,
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
            for (t = 0; t < l.length; t++)
              i = l[t], i.form === e.form && wi(i);
          }
          break e;
        case "textarea":
          Mi(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && ol(e, !!l.multiple, t, !1);
      }
    }
  }
  var pc = !1;
  function zd(e, t, l) {
    if (pc) return e(t, l);
    pc = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (pc = !1, (Ea !== null || za !== null) && ($u(), Ea && (t = Ea, e = za, za = Ea = null, Ed(t), e)))
        for (t = 0; t < e.length; t++) Ed(e[t]);
    }
  }
  function Ni(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var i = l[yt] || null;
    if (i === null) return null;
    l = i[t];
    e: switch (t) {
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
        (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function")
      throw Error(
        u(231, t, typeof l)
      );
    return l;
  }
  var Rn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), yc = !1;
  if (Rn)
    try {
      var Ci = {};
      Object.defineProperty(Ci, "passive", {
        get: function() {
          yc = !0;
        }
      }), window.addEventListener("test", Ci, Ci), window.removeEventListener("test", Ci, Ci);
    } catch {
      yc = !1;
    }
  var ul = null, vc = null, au = null;
  function Md() {
    if (au) return au;
    var e, t = vc, l = t.length, i, r = "value" in ul ? ul.value : ul.textContent, c = r.length;
    for (e = 0; e < l && t[e] === r[e]; e++) ;
    var m = l - e;
    for (i = 1; i <= m && t[l - i] === r[c - i]; i++) ;
    return au = r.slice(e, 1 < i ? 1 - i : void 0);
  }
  function iu(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function ou() {
    return !0;
  }
  function Nd() {
    return !1;
  }
  function Nt(e) {
    function t(l, i, r, c, m) {
      this._reactName = l, this._targetInst = r, this.type = i, this.nativeEvent = c, this.target = m, this.currentTarget = null;
      for (var x in e)
        e.hasOwnProperty(x) && (l = e[x], this[x] = l ? l(c) : c[x]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? ou : Nd, this.isPropagationStopped = Nd, this;
    }
    return y(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = ou);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = ou);
      },
      persist: function() {
      },
      isPersistent: ou
    }), t;
  }
  var jl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, uu = Nt(jl), Ai = y({}, jl, { view: 0, detail: 0 }), Qv = Nt(Ai), bc, xc, Ti, ru = y({}, Ai, {
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
    getModifierState: Sc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Ti && (Ti && e.type === "mousemove" ? (bc = e.screenX - Ti.screenX, xc = e.screenY - Ti.screenY) : xc = bc = 0, Ti = e), bc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : xc;
    }
  }), Cd = Nt(ru), Kv = y({}, ru, { dataTransfer: 0 }), Jv = Nt(Kv), Fv = y({}, Ai, { relatedTarget: 0 }), _c = Nt(Fv), Wv = y({}, jl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Iv = Nt(Wv), Pv = y({}, jl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), eb = Nt(Pv), tb = y({}, jl, { data: 0 }), Ad = Nt(tb), nb = {
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
  }, lb = {
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
  }, ab = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function ib(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = ab[e]) ? !!t[e] : !1;
  }
  function Sc() {
    return ib;
  }
  var ob = y({}, Ai, {
    key: function(e) {
      if (e.key) {
        var t = nb[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = iu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? lb[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Sc,
    charCode: function(e) {
      return e.type === "keypress" ? iu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? iu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), ub = Nt(ob), rb = y({}, ru, {
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
  }), Td = Nt(rb), cb = y({}, Ai, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Sc
  }), sb = Nt(cb), fb = y({}, jl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), db = Nt(fb), hb = y({}, ru, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), gb = Nt(hb), mb = y({}, jl, {
    newState: 0,
    oldState: 0
  }), pb = Nt(mb), yb = [9, 13, 27, 32], wc = Rn && "CompositionEvent" in window, Di = null;
  Rn && "documentMode" in document && (Di = document.documentMode);
  var vb = Rn && "TextEvent" in window && !Di, Dd = Rn && (!wc || Di && 8 < Di && 11 >= Di), Od = " ", Rd = !1;
  function Hd(e, t) {
    switch (e) {
      case "keyup":
        return yb.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function kd(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Ma = !1;
  function bb(e, t) {
    switch (e) {
      case "compositionend":
        return kd(t);
      case "keypress":
        return t.which !== 32 ? null : (Rd = !0, Od);
      case "textInput":
        return e = t.data, e === Od && Rd ? null : e;
      default:
        return null;
    }
  }
  function xb(e, t) {
    if (Ma)
      return e === "compositionend" || !wc && Hd(e, t) ? (e = Md(), au = vc = ul = null, Ma = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Dd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var _b = {
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
  function Bd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!_b[e.type] : t === "textarea";
  }
  function Ud(e, t, l, i) {
    Ea ? za ? za.push(i) : za = [i] : Ea = i, t = Wu(t, "onChange"), 0 < t.length && (l = new uu(
      "onChange",
      "change",
      null,
      l,
      i
    ), e.push({ event: l, listeners: t }));
  }
  var Oi = null, Ri = null;
  function Sb(e) {
    bm(e, 0);
  }
  function cu(e) {
    var t = ll(e);
    if (wi(t)) return e;
  }
  function qd(e, t) {
    if (e === "change") return t;
  }
  var jd = !1;
  if (Rn) {
    var Ec;
    if (Rn) {
      var zc = "oninput" in document;
      if (!zc) {
        var Yd = document.createElement("div");
        Yd.setAttribute("oninput", "return;"), zc = typeof Yd.oninput == "function";
      }
      Ec = zc;
    } else Ec = !1;
    jd = Ec && (!document.documentMode || 9 < document.documentMode);
  }
  function Ld() {
    Oi && (Oi.detachEvent("onpropertychange", Vd), Ri = Oi = null);
  }
  function Vd(e) {
    if (e.propertyName === "value" && cu(Ri)) {
      var t = [];
      Ud(
        t,
        Ri,
        e,
        mc(e)
      ), zd(Sb, t);
    }
  }
  function wb(e, t, l) {
    e === "focusin" ? (Ld(), Oi = t, Ri = l, Oi.attachEvent("onpropertychange", Vd)) : e === "focusout" && Ld();
  }
  function Eb(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return cu(Ri);
  }
  function zb(e, t) {
    if (e === "click") return cu(t);
  }
  function Mb(e, t) {
    if (e === "input" || e === "change")
      return cu(t);
  }
  function Nb(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Ut = typeof Object.is == "function" ? Object.is : Nb;
  function Hi(e, t) {
    if (Ut(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), i = Object.keys(t);
    if (l.length !== i.length) return !1;
    for (i = 0; i < l.length; i++) {
      var r = l[i];
      if (!wt.call(t, r) || !Ut(e[r], t[r]))
        return !1;
    }
    return !0;
  }
  function Xd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function $d(e, t) {
    var l = Xd(e);
    e = 0;
    for (var i; l; ) {
      if (l.nodeType === 3) {
        if (i = e + l.textContent.length, e <= t && i >= t)
          return { node: l, offset: t - e };
        e = i;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Xd(l);
    }
  }
  function Zd(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Zd(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Gd(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = _a(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = _a(e.document);
    }
    return t;
  }
  function Mc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Cb = Rn && "documentMode" in document && 11 >= document.documentMode, Na = null, Nc = null, ki = null, Cc = !1;
  function Qd(e, t, l) {
    var i = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Cc || Na == null || Na !== _a(i) || (i = Na, "selectionStart" in i && Mc(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), ki && Hi(ki, i) || (ki = i, i = Wu(Nc, "onSelect"), 0 < i.length && (t = new uu(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: i }), t.target = Na)));
  }
  function Yl(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var Ca = {
    animationend: Yl("Animation", "AnimationEnd"),
    animationiteration: Yl("Animation", "AnimationIteration"),
    animationstart: Yl("Animation", "AnimationStart"),
    transitionrun: Yl("Transition", "TransitionRun"),
    transitionstart: Yl("Transition", "TransitionStart"),
    transitioncancel: Yl("Transition", "TransitionCancel"),
    transitionend: Yl("Transition", "TransitionEnd")
  }, Ac = {}, Kd = {};
  Rn && (Kd = document.createElement("div").style, "AnimationEvent" in window || (delete Ca.animationend.animation, delete Ca.animationiteration.animation, delete Ca.animationstart.animation), "TransitionEvent" in window || delete Ca.transitionend.transition);
  function Ll(e) {
    if (Ac[e]) return Ac[e];
    if (!Ca[e]) return e;
    var t = Ca[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in Kd)
        return Ac[e] = t[l];
    return e;
  }
  var Jd = Ll("animationend"), Fd = Ll("animationiteration"), Wd = Ll("animationstart"), Ab = Ll("transitionrun"), Tb = Ll("transitionstart"), Db = Ll("transitioncancel"), Id = Ll("transitionend"), Pd = /* @__PURE__ */ new Map(), Tc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Tc.push("scrollEnd");
  function cn(e, t) {
    Pd.set(e, t), Dn(t, [e]);
  }
  var su = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, It = [], Aa = 0, Dc = 0;
  function fu() {
    for (var e = Aa, t = Dc = Aa = 0; t < e; ) {
      var l = It[t];
      It[t++] = null;
      var i = It[t];
      It[t++] = null;
      var r = It[t];
      It[t++] = null;
      var c = It[t];
      if (It[t++] = null, i !== null && r !== null) {
        var m = i.pending;
        m === null ? r.next = r : (r.next = m.next, m.next = r), i.pending = r;
      }
      c !== 0 && eh(l, r, c);
    }
  }
  function du(e, t, l, i) {
    It[Aa++] = e, It[Aa++] = t, It[Aa++] = l, It[Aa++] = i, Dc |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function Oc(e, t, l, i) {
    return du(e, t, l, i), hu(e);
  }
  function Vl(e, t) {
    return du(e, null, null, t), hu(e);
  }
  function eh(e, t, l) {
    e.lanes |= l;
    var i = e.alternate;
    i !== null && (i.lanes |= l);
    for (var r = !1, c = e.return; c !== null; )
      c.childLanes |= l, i = c.alternate, i !== null && (i.childLanes |= l), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (r = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, r && t !== null && (r = 31 - _t(l), e = c.hiddenUpdates, i = e[r], i === null ? e[r] = [t] : i.push(t), t.lane = l | 536870912), c) : null;
  }
  function hu(e) {
    if (50 < lo)
      throw lo = 0, Ls = null, Error(u(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ta = {};
  function Ob(e, t, l, i) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function qt(e, t, l, i) {
    return new Ob(e, t, l, i);
  }
  function Rc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Hn(e, t) {
    var l = e.alternate;
    return l === null ? (l = qt(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function th(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function gu(e, t, l, i, r, c) {
    var m = 0;
    if (i = e, typeof e == "function") Rc(e) && (m = 1);
    else if (typeof e == "string")
      m = U1(
        e,
        l,
        le.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case J:
          return e = qt(31, l, t, r), e.elementType = J, e.lanes = c, e;
        case A:
          return Xl(l.children, r, c, t);
        case C:
          m = 8, r |= 24;
          break;
        case M:
          return e = qt(12, l, t, r | 2), e.elementType = M, e.lanes = c, e;
        case j:
          return e = qt(13, l, t, r), e.elementType = j, e.lanes = c, e;
        case R:
          return e = qt(19, l, t, r), e.elementType = R, e.lanes = c, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case _:
                m = 10;
                break e;
              case q:
                m = 9;
                break e;
              case N:
                m = 11;
                break e;
              case B:
                m = 14;
                break e;
              case X:
                m = 16, i = null;
                break e;
            }
          m = 29, l = Error(
            u(130, e === null ? "null" : typeof e, "")
          ), i = null;
      }
    return t = qt(m, l, t, r), t.elementType = e, t.type = i, t.lanes = c, t;
  }
  function Xl(e, t, l, i) {
    return e = qt(7, e, i, t), e.lanes = l, e;
  }
  function Hc(e, t, l) {
    return e = qt(6, e, null, t), e.lanes = l, e;
  }
  function nh(e) {
    var t = qt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function kc(e, t, l) {
    return t = qt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = l, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var lh = /* @__PURE__ */ new WeakMap();
  function Pt(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = lh.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Kt(t)
      }, lh.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Kt(t)
    };
  }
  var Da = [], Oa = 0, mu = null, Bi = 0, en = [], tn = 0, rl = null, _n = 1, Sn = "";
  function kn(e, t) {
    Da[Oa++] = Bi, Da[Oa++] = mu, mu = e, Bi = t;
  }
  function ah(e, t, l) {
    en[tn++] = _n, en[tn++] = Sn, en[tn++] = rl, rl = e;
    var i = _n;
    e = Sn;
    var r = 32 - _t(i) - 1;
    i &= ~(1 << r), l += 1;
    var c = 32 - _t(t) + r;
    if (30 < c) {
      var m = r - r % 5;
      c = (i & (1 << m) - 1).toString(32), i >>= m, r -= m, _n = 1 << 32 - _t(t) + r | l << r | i, Sn = c + e;
    } else
      _n = 1 << c | l << r | i, Sn = e;
  }
  function Bc(e) {
    e.return !== null && (kn(e, 1), ah(e, 1, 0));
  }
  function Uc(e) {
    for (; e === mu; )
      mu = Da[--Oa], Da[Oa] = null, Bi = Da[--Oa], Da[Oa] = null;
    for (; e === rl; )
      rl = en[--tn], en[tn] = null, Sn = en[--tn], en[tn] = null, _n = en[--tn], en[tn] = null;
  }
  function ih(e, t) {
    en[tn++] = _n, en[tn++] = Sn, en[tn++] = rl, _n = t.id, Sn = t.overflow, rl = e;
  }
  var dt = null, Ze = null, De = !1, cl = null, nn = !1, qc = Error(u(519));
  function sl(e) {
    var t = Error(
      u(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ui(Pt(t, e)), qc;
  }
  function oh(e) {
    var t = e.stateNode, l = e.type, i = e.memoizedProps;
    switch (t[ct] = e, t[yt] = i, l) {
      case "dialog":
        Ce("cancel", t), Ce("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ce("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < io.length; l++)
          Ce(io[l], t);
        break;
      case "source":
        Ce("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Ce("error", t), Ce("load", t);
        break;
      case "details":
        Ce("toggle", t);
        break;
      case "input":
        Ce("invalid", t), Sa(
          t,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0
        );
        break;
      case "select":
        Ce("invalid", t);
        break;
      case "textarea":
        Ce("invalid", t), _d(t, i.value, i.defaultValue, i.children);
    }
    l = i.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || i.suppressHydrationWarning === !0 || wm(t.textContent, l) ? (i.popover != null && (Ce("beforetoggle", t), Ce("toggle", t)), i.onScroll != null && Ce("scroll", t), i.onScrollEnd != null && Ce("scrollend", t), i.onClick != null && (t.onclick = On), t = !0) : t = !1, t || sl(e, !0);
  }
  function uh(e) {
    for (dt = e.return; dt; )
      switch (dt.tag) {
        case 5:
        case 31:
        case 13:
          nn = !1;
          return;
        case 27:
        case 3:
          nn = !0;
          return;
        default:
          dt = dt.return;
      }
  }
  function Ra(e) {
    if (e !== dt) return !1;
    if (!De) return uh(e), De = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || nf(e.type, e.memoizedProps)), l = !l), l && Ze && sl(e), uh(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      Ze = Om(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      Ze = Om(e);
    } else
      t === 27 ? (t = Ze, El(e.type) ? (e = rf, rf = null, Ze = e) : Ze = t) : Ze = dt ? an(e.stateNode.nextSibling) : null;
    return !0;
  }
  function $l() {
    Ze = dt = null, De = !1;
  }
  function jc() {
    var e = cl;
    return e !== null && (Dt === null ? Dt = e : Dt.push.apply(
      Dt,
      e
    ), cl = null), e;
  }
  function Ui(e) {
    cl === null ? cl = [e] : cl.push(e);
  }
  var Yc = z(null), Zl = null, Bn = null;
  function fl(e, t, l) {
    P(Yc, t._currentValue), t._currentValue = l;
  }
  function Un(e) {
    e._currentValue = Yc.current, H(Yc);
  }
  function Lc(e, t, l) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function Vc(e, t, l, i) {
    var r = e.child;
    for (r !== null && (r.return = e); r !== null; ) {
      var c = r.dependencies;
      if (c !== null) {
        var m = r.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var x = c;
          c = r;
          for (var D = 0; D < t.length; D++)
            if (x.context === t[D]) {
              c.lanes |= l, x = c.alternate, x !== null && (x.lanes |= l), Lc(
                c.return,
                l,
                e
              ), i || (m = null);
              break e;
            }
          c = x.next;
        }
      } else if (r.tag === 18) {
        if (m = r.return, m === null) throw Error(u(341));
        m.lanes |= l, c = m.alternate, c !== null && (c.lanes |= l), Lc(m, l, e), m = null;
      } else m = r.child;
      if (m !== null) m.return = r;
      else
        for (m = r; m !== null; ) {
          if (m === e) {
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
  function Ha(e, t, l, i) {
    e = null;
    for (var r = t, c = !1; r !== null; ) {
      if (!c) {
        if ((r.flags & 524288) !== 0) c = !0;
        else if ((r.flags & 262144) !== 0) break;
      }
      if (r.tag === 10) {
        var m = r.alternate;
        if (m === null) throw Error(u(387));
        if (m = m.memoizedProps, m !== null) {
          var x = r.type;
          Ut(r.pendingProps.value, m.value) || (e !== null ? e.push(x) : e = [x]);
        }
      } else if (r === ce.current) {
        if (m = r.alternate, m === null) throw Error(u(387));
        m.memoizedState.memoizedState !== r.memoizedState.memoizedState && (e !== null ? e.push(so) : e = [so]);
      }
      r = r.return;
    }
    e !== null && Vc(
      t,
      e,
      l,
      i
    ), t.flags |= 262144;
  }
  function pu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Ut(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Gl(e) {
    Zl = e, Bn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function ht(e) {
    return rh(Zl, e);
  }
  function yu(e, t) {
    return Zl === null && Gl(e), rh(e, t);
  }
  function rh(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, Bn === null) {
      if (e === null) throw Error(u(308));
      Bn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Bn = Bn.next = t;
    return l;
  }
  var Rb = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(l, i) {
        e.push(i);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, Hb = n.unstable_scheduleCallback, kb = n.unstable_NormalPriority, lt = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Xc() {
    return {
      controller: new Rb(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function qi(e) {
    e.refCount--, e.refCount === 0 && Hb(kb, function() {
      e.controller.abort();
    });
  }
  var ji = null, $c = 0, ka = 0, Ba = null;
  function Bb(e, t) {
    if (ji === null) {
      var l = ji = [];
      $c = 0, ka = Qs(), Ba = {
        status: "pending",
        value: void 0,
        then: function(i) {
          l.push(i);
        }
      };
    }
    return $c++, t.then(ch, ch), t;
  }
  function ch() {
    if (--$c === 0 && ji !== null) {
      Ba !== null && (Ba.status = "fulfilled");
      var e = ji;
      ji = null, ka = 0, Ba = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Ub(e, t) {
    var l = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(r) {
        l.push(r);
      }
    };
    return e.then(
      function() {
        i.status = "fulfilled", i.value = t;
        for (var r = 0; r < l.length; r++) (0, l[r])(t);
      },
      function(r) {
        for (i.status = "rejected", i.reason = r, r = 0; r < l.length; r++)
          (0, l[r])(void 0);
      }
    ), i;
  }
  var sh = E.S;
  E.S = function(e, t) {
    Qg = Ie(), typeof t == "object" && t !== null && typeof t.then == "function" && Bb(e, t), sh !== null && sh(e, t);
  };
  var Ql = z(null);
  function Zc() {
    var e = Ql.current;
    return e !== null ? e : Xe.pooledCache;
  }
  function vu(e, t) {
    t === null ? P(Ql, Ql.current) : P(Ql, t.pool);
  }
  function fh() {
    var e = Zc();
    return e === null ? null : { parent: lt._currentValue, pool: e };
  }
  var Ua = Error(u(460)), Gc = Error(u(474)), bu = Error(u(542)), xu = { then: function() {
  } };
  function dh(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function hh(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(On, On), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, mh(e), e;
      default:
        if (typeof t.status == "string") t.then(On, On);
        else {
          if (e = Xe, e !== null && 100 < e.shellSuspendCounter)
            throw Error(u(482));
          e = t, e.status = "pending", e.then(
            function(i) {
              if (t.status === "pending") {
                var r = t;
                r.status = "fulfilled", r.value = i;
              }
            },
            function(i) {
              if (t.status === "pending") {
                var r = t;
                r.status = "rejected", r.reason = i;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, mh(e), e;
        }
        throw Jl = t, Ua;
    }
  }
  function Kl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Jl = l, Ua) : l;
    }
  }
  var Jl = null;
  function gh() {
    if (Jl === null) throw Error(u(459));
    var e = Jl;
    return Jl = null, e;
  }
  function mh(e) {
    if (e === Ua || e === bu)
      throw Error(u(483));
  }
  var qa = null, Yi = 0;
  function _u(e) {
    var t = Yi;
    return Yi += 1, qa === null && (qa = []), hh(qa, e, t);
  }
  function Li(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Su(e, t) {
    throw t.$$typeof === v ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(
      u(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function ph(e) {
    function t(Y, k) {
      if (e) {
        var G = Y.deletions;
        G === null ? (Y.deletions = [k], Y.flags |= 16) : G.push(k);
      }
    }
    function l(Y, k) {
      if (!e) return null;
      for (; k !== null; )
        t(Y, k), k = k.sibling;
      return null;
    }
    function i(Y) {
      for (var k = /* @__PURE__ */ new Map(); Y !== null; )
        Y.key !== null ? k.set(Y.key, Y) : k.set(Y.index, Y), Y = Y.sibling;
      return k;
    }
    function r(Y, k) {
      return Y = Hn(Y, k), Y.index = 0, Y.sibling = null, Y;
    }
    function c(Y, k, G) {
      return Y.index = G, e ? (G = Y.alternate, G !== null ? (G = G.index, G < k ? (Y.flags |= 67108866, k) : G) : (Y.flags |= 67108866, k)) : (Y.flags |= 1048576, k);
    }
    function m(Y) {
      return e && Y.alternate === null && (Y.flags |= 67108866), Y;
    }
    function x(Y, k, G, ae) {
      return k === null || k.tag !== 6 ? (k = Hc(G, Y.mode, ae), k.return = Y, k) : (k = r(k, G), k.return = Y, k);
    }
    function D(Y, k, G, ae) {
      var pe = G.type;
      return pe === A ? te(
        Y,
        k,
        G.props.children,
        ae,
        G.key
      ) : k !== null && (k.elementType === pe || typeof pe == "object" && pe !== null && pe.$$typeof === X && Kl(pe) === k.type) ? (k = r(k, G.props), Li(k, G), k.return = Y, k) : (k = gu(
        G.type,
        G.key,
        G.props,
        null,
        Y.mode,
        ae
      ), Li(k, G), k.return = Y, k);
    }
    function Q(Y, k, G, ae) {
      return k === null || k.tag !== 4 || k.stateNode.containerInfo !== G.containerInfo || k.stateNode.implementation !== G.implementation ? (k = kc(G, Y.mode, ae), k.return = Y, k) : (k = r(k, G.children || []), k.return = Y, k);
    }
    function te(Y, k, G, ae, pe) {
      return k === null || k.tag !== 7 ? (k = Xl(
        G,
        Y.mode,
        ae,
        pe
      ), k.return = Y, k) : (k = r(k, G), k.return = Y, k);
    }
    function ie(Y, k, G) {
      if (typeof k == "string" && k !== "" || typeof k == "number" || typeof k == "bigint")
        return k = Hc(
          "" + k,
          Y.mode,
          G
        ), k.return = Y, k;
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case S:
            return G = gu(
              k.type,
              k.key,
              k.props,
              null,
              Y.mode,
              G
            ), Li(G, k), G.return = Y, G;
          case w:
            return k = kc(
              k,
              Y.mode,
              G
            ), k.return = Y, k;
          case X:
            return k = Kl(k), ie(Y, k, G);
        }
        if (V(k) || I(k))
          return k = Xl(
            k,
            Y.mode,
            G,
            null
          ), k.return = Y, k;
        if (typeof k.then == "function")
          return ie(Y, _u(k), G);
        if (k.$$typeof === _)
          return ie(
            Y,
            yu(Y, k),
            G
          );
        Su(Y, k);
      }
      return null;
    }
    function K(Y, k, G, ae) {
      var pe = k !== null ? k.key : null;
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return pe !== null ? null : x(Y, k, "" + G, ae);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case S:
            return G.key === pe ? D(Y, k, G, ae) : null;
          case w:
            return G.key === pe ? Q(Y, k, G, ae) : null;
          case X:
            return G = Kl(G), K(Y, k, G, ae);
        }
        if (V(G) || I(G))
          return pe !== null ? null : te(Y, k, G, ae, null);
        if (typeof G.then == "function")
          return K(
            Y,
            k,
            _u(G),
            ae
          );
        if (G.$$typeof === _)
          return K(
            Y,
            k,
            yu(Y, G),
            ae
          );
        Su(Y, G);
      }
      return null;
    }
    function W(Y, k, G, ae, pe) {
      if (typeof ae == "string" && ae !== "" || typeof ae == "number" || typeof ae == "bigint")
        return Y = Y.get(G) || null, x(k, Y, "" + ae, pe);
      if (typeof ae == "object" && ae !== null) {
        switch (ae.$$typeof) {
          case S:
            return Y = Y.get(
              ae.key === null ? G : ae.key
            ) || null, D(k, Y, ae, pe);
          case w:
            return Y = Y.get(
              ae.key === null ? G : ae.key
            ) || null, Q(k, Y, ae, pe);
          case X:
            return ae = Kl(ae), W(
              Y,
              k,
              G,
              ae,
              pe
            );
        }
        if (V(ae) || I(ae))
          return Y = Y.get(G) || null, te(k, Y, ae, pe, null);
        if (typeof ae.then == "function")
          return W(
            Y,
            k,
            G,
            _u(ae),
            pe
          );
        if (ae.$$typeof === _)
          return W(
            Y,
            k,
            G,
            yu(k, ae),
            pe
          );
        Su(k, ae);
      }
      return null;
    }
    function de(Y, k, G, ae) {
      for (var pe = null, He = null, he = k, Me = k = 0, Te = null; he !== null && Me < G.length; Me++) {
        he.index > Me ? (Te = he, he = null) : Te = he.sibling;
        var ke = K(
          Y,
          he,
          G[Me],
          ae
        );
        if (ke === null) {
          he === null && (he = Te);
          break;
        }
        e && he && ke.alternate === null && t(Y, he), k = c(ke, k, Me), He === null ? pe = ke : He.sibling = ke, He = ke, he = Te;
      }
      if (Me === G.length)
        return l(Y, he), De && kn(Y, Me), pe;
      if (he === null) {
        for (; Me < G.length; Me++)
          he = ie(Y, G[Me], ae), he !== null && (k = c(
            he,
            k,
            Me
          ), He === null ? pe = he : He.sibling = he, He = he);
        return De && kn(Y, Me), pe;
      }
      for (he = i(he); Me < G.length; Me++)
        Te = W(
          he,
          Y,
          Me,
          G[Me],
          ae
        ), Te !== null && (e && Te.alternate !== null && he.delete(
          Te.key === null ? Me : Te.key
        ), k = c(
          Te,
          k,
          Me
        ), He === null ? pe = Te : He.sibling = Te, He = Te);
      return e && he.forEach(function(Al) {
        return t(Y, Al);
      }), De && kn(Y, Me), pe;
    }
    function ve(Y, k, G, ae) {
      if (G == null) throw Error(u(151));
      for (var pe = null, He = null, he = k, Me = k = 0, Te = null, ke = G.next(); he !== null && !ke.done; Me++, ke = G.next()) {
        he.index > Me ? (Te = he, he = null) : Te = he.sibling;
        var Al = K(Y, he, ke.value, ae);
        if (Al === null) {
          he === null && (he = Te);
          break;
        }
        e && he && Al.alternate === null && t(Y, he), k = c(Al, k, Me), He === null ? pe = Al : He.sibling = Al, He = Al, he = Te;
      }
      if (ke.done)
        return l(Y, he), De && kn(Y, Me), pe;
      if (he === null) {
        for (; !ke.done; Me++, ke = G.next())
          ke = ie(Y, ke.value, ae), ke !== null && (k = c(ke, k, Me), He === null ? pe = ke : He.sibling = ke, He = ke);
        return De && kn(Y, Me), pe;
      }
      for (he = i(he); !ke.done; Me++, ke = G.next())
        ke = W(he, Y, Me, ke.value, ae), ke !== null && (e && ke.alternate !== null && he.delete(ke.key === null ? Me : ke.key), k = c(ke, k, Me), He === null ? pe = ke : He.sibling = ke, He = ke);
      return e && he.forEach(function(K1) {
        return t(Y, K1);
      }), De && kn(Y, Me), pe;
    }
    function Le(Y, k, G, ae) {
      if (typeof G == "object" && G !== null && G.type === A && G.key === null && (G = G.props.children), typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case S:
            e: {
              for (var pe = G.key; k !== null; ) {
                if (k.key === pe) {
                  if (pe = G.type, pe === A) {
                    if (k.tag === 7) {
                      l(
                        Y,
                        k.sibling
                      ), ae = r(
                        k,
                        G.props.children
                      ), ae.return = Y, Y = ae;
                      break e;
                    }
                  } else if (k.elementType === pe || typeof pe == "object" && pe !== null && pe.$$typeof === X && Kl(pe) === k.type) {
                    l(
                      Y,
                      k.sibling
                    ), ae = r(k, G.props), Li(ae, G), ae.return = Y, Y = ae;
                    break e;
                  }
                  l(Y, k);
                  break;
                } else t(Y, k);
                k = k.sibling;
              }
              G.type === A ? (ae = Xl(
                G.props.children,
                Y.mode,
                ae,
                G.key
              ), ae.return = Y, Y = ae) : (ae = gu(
                G.type,
                G.key,
                G.props,
                null,
                Y.mode,
                ae
              ), Li(ae, G), ae.return = Y, Y = ae);
            }
            return m(Y);
          case w:
            e: {
              for (pe = G.key; k !== null; ) {
                if (k.key === pe)
                  if (k.tag === 4 && k.stateNode.containerInfo === G.containerInfo && k.stateNode.implementation === G.implementation) {
                    l(
                      Y,
                      k.sibling
                    ), ae = r(k, G.children || []), ae.return = Y, Y = ae;
                    break e;
                  } else {
                    l(Y, k);
                    break;
                  }
                else t(Y, k);
                k = k.sibling;
              }
              ae = kc(G, Y.mode, ae), ae.return = Y, Y = ae;
            }
            return m(Y);
          case X:
            return G = Kl(G), Le(
              Y,
              k,
              G,
              ae
            );
        }
        if (V(G))
          return de(
            Y,
            k,
            G,
            ae
          );
        if (I(G)) {
          if (pe = I(G), typeof pe != "function") throw Error(u(150));
          return G = pe.call(G), ve(
            Y,
            k,
            G,
            ae
          );
        }
        if (typeof G.then == "function")
          return Le(
            Y,
            k,
            _u(G),
            ae
          );
        if (G.$$typeof === _)
          return Le(
            Y,
            k,
            yu(Y, G),
            ae
          );
        Su(Y, G);
      }
      return typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint" ? (G = "" + G, k !== null && k.tag === 6 ? (l(Y, k.sibling), ae = r(k, G), ae.return = Y, Y = ae) : (l(Y, k), ae = Hc(G, Y.mode, ae), ae.return = Y, Y = ae), m(Y)) : l(Y, k);
    }
    return function(Y, k, G, ae) {
      try {
        Yi = 0;
        var pe = Le(
          Y,
          k,
          G,
          ae
        );
        return qa = null, pe;
      } catch (he) {
        if (he === Ua || he === bu) throw he;
        var He = qt(29, he, null, Y.mode);
        return He.lanes = ae, He.return = Y, He;
      }
    };
  }
  var Fl = ph(!0), yh = ph(!1), dl = !1;
  function Qc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Kc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function hl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function gl(e, t, l) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Be & 2) !== 0) {
      var r = i.pending;
      return r === null ? t.next = t : (t.next = r.next, r.next = t), i.pending = t, t = hu(e), eh(e, null, l), t;
    }
    return du(e, i, t, l), hu(e);
  }
  function Vi(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Go(e, l);
    }
  }
  function Jc(e, t) {
    var l = e.updateQueue, i = e.alternate;
    if (i !== null && (i = i.updateQueue, l === i)) {
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
        c === null ? r = c = t : c = c.next = t;
      } else r = c = t;
      l = {
        baseState: i.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: c,
        shared: i.shared,
        callbacks: i.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var Fc = !1;
  function Xi() {
    if (Fc) {
      var e = Ba;
      if (e !== null) throw e;
    }
  }
  function $i(e, t, l, i) {
    Fc = !1;
    var r = e.updateQueue;
    dl = !1;
    var c = r.firstBaseUpdate, m = r.lastBaseUpdate, x = r.shared.pending;
    if (x !== null) {
      r.shared.pending = null;
      var D = x, Q = D.next;
      D.next = null, m === null ? c = Q : m.next = Q, m = D;
      var te = e.alternate;
      te !== null && (te = te.updateQueue, x = te.lastBaseUpdate, x !== m && (x === null ? te.firstBaseUpdate = Q : x.next = Q, te.lastBaseUpdate = D));
    }
    if (c !== null) {
      var ie = r.baseState;
      m = 0, te = Q = D = null, x = c;
      do {
        var K = x.lane & -536870913, W = K !== x.lane;
        if (W ? (Ae & K) === K : (i & K) === K) {
          K !== 0 && K === ka && (Fc = !0), te !== null && (te = te.next = {
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: null,
            next: null
          });
          e: {
            var de = e, ve = x;
            K = t;
            var Le = l;
            switch (ve.tag) {
              case 1:
                if (de = ve.payload, typeof de == "function") {
                  ie = de.call(Le, ie, K);
                  break e;
                }
                ie = de;
                break e;
              case 3:
                de.flags = de.flags & -65537 | 128;
              case 0:
                if (de = ve.payload, K = typeof de == "function" ? de.call(Le, ie, K) : de, K == null) break e;
                ie = y({}, ie, K);
                break e;
              case 2:
                dl = !0;
            }
          }
          K = x.callback, K !== null && (e.flags |= 64, W && (e.flags |= 8192), W = r.callbacks, W === null ? r.callbacks = [K] : W.push(K));
        } else
          W = {
            lane: K,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          }, te === null ? (Q = te = W, D = ie) : te = te.next = W, m |= K;
        if (x = x.next, x === null) {
          if (x = r.shared.pending, x === null)
            break;
          W = x, x = W.next, W.next = null, r.lastBaseUpdate = W, r.shared.pending = null;
        }
      } while (!0);
      te === null && (D = ie), r.baseState = D, r.firstBaseUpdate = Q, r.lastBaseUpdate = te, c === null && (r.shared.lanes = 0), bl |= m, e.lanes = m, e.memoizedState = ie;
    }
  }
  function vh(e, t) {
    if (typeof e != "function")
      throw Error(u(191, e));
    e.call(t);
  }
  function bh(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        vh(l[e], t);
  }
  var ja = z(null), wu = z(0);
  function xh(e, t) {
    e = Gn, P(wu, e), P(ja, t), Gn = e | t.baseLanes;
  }
  function Wc() {
    P(wu, Gn), P(ja, ja.current);
  }
  function Ic() {
    Gn = wu.current, H(ja), H(wu);
  }
  var jt = z(null), ln = null;
  function ml(e) {
    var t = e.alternate;
    P(Pe, Pe.current & 1), P(jt, e), ln === null && (t === null || ja.current !== null || t.memoizedState !== null) && (ln = e);
  }
  function Pc(e) {
    P(Pe, Pe.current), P(jt, e), ln === null && (ln = e);
  }
  function _h(e) {
    e.tag === 22 ? (P(Pe, Pe.current), P(jt, e), ln === null && (ln = e)) : pl();
  }
  function pl() {
    P(Pe, Pe.current), P(jt, jt.current);
  }
  function Yt(e) {
    H(jt), ln === e && (ln = null), H(Pe);
  }
  var Pe = z(0);
  function Eu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || of(l) || uf(l)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var qn = 0, ze = null, je = null, at = null, zu = !1, Ya = !1, Wl = !1, Mu = 0, Zi = 0, La = null, qb = 0;
  function Fe() {
    throw Error(u(321));
  }
  function es(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!Ut(e[l], t[l])) return !1;
    return !0;
  }
  function ts(e, t, l, i, r, c) {
    return qn = c, ze = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = e === null || e.memoizedState === null ? ag : ps, Wl = !1, c = l(i, r), Wl = !1, Ya && (c = wh(
      t,
      l,
      i,
      r
    )), Sh(e), c;
  }
  function Sh(e) {
    E.H = Ki;
    var t = je !== null && je.next !== null;
    if (qn = 0, at = je = ze = null, zu = !1, Zi = 0, La = null, t) throw Error(u(300));
    e === null || it || (e = e.dependencies, e !== null && pu(e) && (it = !0));
  }
  function wh(e, t, l, i) {
    ze = e;
    var r = 0;
    do {
      if (Ya && (La = null), Zi = 0, Ya = !1, 25 <= r) throw Error(u(301));
      if (r += 1, at = je = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      E.H = ig, c = t(l, i);
    } while (Ya);
    return c;
  }
  function jb() {
    var e = E.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Gi(t) : t, e = e.useState()[0], (je !== null ? je.memoizedState : null) !== e && (ze.flags |= 1024), t;
  }
  function ns() {
    var e = Mu !== 0;
    return Mu = 0, e;
  }
  function ls(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function as(e) {
    if (zu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      zu = !1;
    }
    qn = 0, at = je = ze = null, Ya = !1, Zi = Mu = 0, La = null;
  }
  function St() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return at === null ? ze.memoizedState = at = e : at = at.next = e, at;
  }
  function et() {
    if (je === null) {
      var e = ze.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = je.next;
    var t = at === null ? ze.memoizedState : at.next;
    if (t !== null)
      at = t, je = e;
    else {
      if (e === null)
        throw ze.alternate === null ? Error(u(467)) : Error(u(310));
      je = e, e = {
        memoizedState: je.memoizedState,
        baseState: je.baseState,
        baseQueue: je.baseQueue,
        queue: je.queue,
        next: null
      }, at === null ? ze.memoizedState = at = e : at = at.next = e;
    }
    return at;
  }
  function Nu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Gi(e) {
    var t = Zi;
    return Zi += 1, La === null && (La = []), e = hh(La, e, t), t = ze, (at === null ? t.memoizedState : at.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? ag : ps), e;
  }
  function Cu(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Gi(e);
      if (e.$$typeof === _) return ht(e);
    }
    throw Error(u(438, String(e)));
  }
  function is(e) {
    var t = null, l = ze.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var i = ze.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
        data: i.data.map(function(r) {
          return r.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Nu(), ze.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), i = 0; i < e; i++)
        l[i] = ue;
    return t.index++, l;
  }
  function jn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Au(e) {
    var t = et();
    return os(t, je, e);
  }
  function os(e, t, l) {
    var i = e.queue;
    if (i === null) throw Error(u(311));
    i.lastRenderedReducer = l;
    var r = e.baseQueue, c = i.pending;
    if (c !== null) {
      if (r !== null) {
        var m = r.next;
        r.next = c.next, c.next = m;
      }
      t.baseQueue = r = c, i.pending = null;
    }
    if (c = e.baseState, r === null) e.memoizedState = c;
    else {
      t = r.next;
      var x = m = null, D = null, Q = t, te = !1;
      do {
        var ie = Q.lane & -536870913;
        if (ie !== Q.lane ? (Ae & ie) === ie : (qn & ie) === ie) {
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
            }), ie === ka && (te = !0);
          else if ((qn & K) === K) {
            Q = Q.next, K === ka && (te = !0);
            continue;
          } else
            ie = {
              lane: 0,
              revertLane: Q.revertLane,
              gesture: null,
              action: Q.action,
              hasEagerState: Q.hasEagerState,
              eagerState: Q.eagerState,
              next: null
            }, D === null ? (x = D = ie, m = c) : D = D.next = ie, ze.lanes |= K, bl |= K;
          ie = Q.action, Wl && l(c, ie), c = Q.hasEagerState ? Q.eagerState : l(c, ie);
        } else
          K = {
            lane: ie,
            revertLane: Q.revertLane,
            gesture: Q.gesture,
            action: Q.action,
            hasEagerState: Q.hasEagerState,
            eagerState: Q.eagerState,
            next: null
          }, D === null ? (x = D = K, m = c) : D = D.next = K, ze.lanes |= ie, bl |= ie;
        Q = Q.next;
      } while (Q !== null && Q !== t);
      if (D === null ? m = c : D.next = x, !Ut(c, e.memoizedState) && (it = !0, te && (l = Ba, l !== null)))
        throw l;
      e.memoizedState = c, e.baseState = m, e.baseQueue = D, i.lastRenderedState = c;
    }
    return r === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function us(e) {
    var t = et(), l = t.queue;
    if (l === null) throw Error(u(311));
    l.lastRenderedReducer = e;
    var i = l.dispatch, r = l.pending, c = t.memoizedState;
    if (r !== null) {
      l.pending = null;
      var m = r = r.next;
      do
        c = e(c, m.action), m = m.next;
      while (m !== r);
      Ut(c, t.memoizedState) || (it = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), l.lastRenderedState = c;
    }
    return [c, i];
  }
  function Eh(e, t, l) {
    var i = ze, r = et(), c = De;
    if (c) {
      if (l === void 0) throw Error(u(407));
      l = l();
    } else l = t();
    var m = !Ut(
      (je || r).memoizedState,
      l
    );
    if (m && (r.memoizedState = l, it = !0), r = r.queue, ss(Nh.bind(null, i, r, e), [
      e
    ]), r.getSnapshot !== t || m || at !== null && at.memoizedState.tag & 1) {
      if (i.flags |= 2048, Va(
        9,
        { destroy: void 0 },
        Mh.bind(
          null,
          i,
          r,
          l,
          t
        ),
        null
      ), Xe === null) throw Error(u(349));
      c || (qn & 127) !== 0 || zh(i, t, l);
    }
    return l;
  }
  function zh(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = ze.updateQueue, t === null ? (t = Nu(), ze.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function Mh(e, t, l, i) {
    t.value = l, t.getSnapshot = i, Ch(t) && Ah(e);
  }
  function Nh(e, t, l) {
    return l(function() {
      Ch(t) && Ah(e);
    });
  }
  function Ch(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Ut(e, l);
    } catch {
      return !0;
    }
  }
  function Ah(e) {
    var t = Vl(e, 2);
    t !== null && Ot(t, e, 2);
  }
  function rs(e) {
    var t = St();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Wl) {
        bn(!0);
        try {
          l();
        } finally {
          bn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: jn,
      lastRenderedState: e
    }, t;
  }
  function Th(e, t, l, i) {
    return e.baseState = l, os(
      e,
      je,
      typeof i == "function" ? i : jn
    );
  }
  function Yb(e, t, l, i, r) {
    if (Ou(e)) throw Error(u(485));
    if (e = t.action, e !== null) {
      var c = {
        payload: r,
        action: e,
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
      E.T !== null ? l(!0) : c.isTransition = !1, i(c), l = t.pending, l === null ? (c.next = t.pending = c, Dh(t, c)) : (c.next = l.next, t.pending = l.next = c);
    }
  }
  function Dh(e, t) {
    var l = t.action, i = t.payload, r = e.state;
    if (t.isTransition) {
      var c = E.T, m = {};
      E.T = m;
      try {
        var x = l(r, i), D = E.S;
        D !== null && D(m, x), Oh(e, t, x);
      } catch (Q) {
        cs(e, t, Q);
      } finally {
        c !== null && m.types !== null && (c.types = m.types), E.T = c;
      }
    } else
      try {
        c = l(r, i), Oh(e, t, c);
      } catch (Q) {
        cs(e, t, Q);
      }
  }
  function Oh(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(i) {
        Rh(e, t, i);
      },
      function(i) {
        return cs(e, t, i);
      }
    ) : Rh(e, t, l);
  }
  function Rh(e, t, l) {
    t.status = "fulfilled", t.value = l, Hh(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Dh(e, l)));
  }
  function cs(e, t, l) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = l, Hh(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function Hh(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function kh(e, t) {
    return t;
  }
  function Bh(e, t) {
    if (De) {
      var l = Xe.formState;
      if (l !== null) {
        e: {
          var i = ze;
          if (De) {
            if (Ze) {
              t: {
                for (var r = Ze, c = nn; r.nodeType !== 8; ) {
                  if (!c) {
                    r = null;
                    break t;
                  }
                  if (r = an(
                    r.nextSibling
                  ), r === null) {
                    r = null;
                    break t;
                  }
                }
                c = r.data, r = c === "F!" || c === "F" ? r : null;
              }
              if (r) {
                Ze = an(
                  r.nextSibling
                ), i = r.data === "F!";
                break e;
              }
            }
            sl(i);
          }
          i = !1;
        }
        i && (t = l[0]);
      }
    }
    return l = St(), l.memoizedState = l.baseState = t, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: kh,
      lastRenderedState: t
    }, l.queue = i, l = tg.bind(
      null,
      ze,
      i
    ), i.dispatch = l, i = rs(!1), c = ms.bind(
      null,
      ze,
      !1,
      i.queue
    ), i = St(), r = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = r, l = Yb.bind(
      null,
      ze,
      r,
      c,
      l
    ), r.dispatch = l, i.memoizedState = e, [t, l, !1];
  }
  function Uh(e) {
    var t = et();
    return qh(t, je, e);
  }
  function qh(e, t, l) {
    if (t = os(
      e,
      t,
      kh
    )[0], e = Au(jn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = Gi(t);
      } catch (m) {
        throw m === Ua ? bu : m;
      }
    else i = t;
    t = et();
    var r = t.queue, c = r.dispatch;
    return l !== t.memoizedState && (ze.flags |= 2048, Va(
      9,
      { destroy: void 0 },
      Lb.bind(null, r, l),
      null
    )), [i, c, e];
  }
  function Lb(e, t) {
    e.action = t;
  }
  function jh(e) {
    var t = et(), l = je;
    if (l !== null)
      return qh(t, l, e);
    et(), t = t.memoizedState, l = et();
    var i = l.queue.dispatch;
    return l.memoizedState = e, [t, i, !1];
  }
  function Va(e, t, l, i) {
    return e = { tag: e, create: l, deps: i, inst: t, next: null }, t = ze.updateQueue, t === null && (t = Nu(), ze.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (i = l.next, l.next = e, e.next = i, t.lastEffect = e), e;
  }
  function Yh() {
    return et().memoizedState;
  }
  function Tu(e, t, l, i) {
    var r = St();
    ze.flags |= e, r.memoizedState = Va(
      1 | t,
      { destroy: void 0 },
      l,
      i === void 0 ? null : i
    );
  }
  function Du(e, t, l, i) {
    var r = et();
    i = i === void 0 ? null : i;
    var c = r.memoizedState.inst;
    je !== null && i !== null && es(i, je.memoizedState.deps) ? r.memoizedState = Va(t, c, l, i) : (ze.flags |= e, r.memoizedState = Va(
      1 | t,
      c,
      l,
      i
    ));
  }
  function Lh(e, t) {
    Tu(8390656, 8, e, t);
  }
  function ss(e, t) {
    Du(2048, 8, e, t);
  }
  function Vb(e) {
    ze.flags |= 4;
    var t = ze.updateQueue;
    if (t === null)
      t = Nu(), ze.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function Vh(e) {
    var t = et().memoizedState;
    return Vb({ ref: t, nextImpl: e }), function() {
      if ((Be & 2) !== 0) throw Error(u(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Xh(e, t) {
    return Du(4, 2, e, t);
  }
  function $h(e, t) {
    return Du(4, 4, e, t);
  }
  function Zh(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function() {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Gh(e, t, l) {
    l = l != null ? l.concat([e]) : null, Du(4, 4, Zh.bind(null, t, e), l);
  }
  function fs() {
  }
  function Qh(e, t) {
    var l = et();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    return t !== null && es(t, i[1]) ? i[0] : (l.memoizedState = [e, t], e);
  }
  function Kh(e, t) {
    var l = et();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    if (t !== null && es(t, i[1]))
      return i[0];
    if (i = e(), Wl) {
      bn(!0);
      try {
        e();
      } finally {
        bn(!1);
      }
    }
    return l.memoizedState = [i, t], i;
  }
  function ds(e, t, l) {
    return l === void 0 || (qn & 1073741824) !== 0 && (Ae & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = Jg(), ze.lanes |= e, bl |= e, l);
  }
  function Jh(e, t, l, i) {
    return Ut(l, t) ? l : ja.current !== null ? (e = ds(e, l, i), Ut(e, t) || (it = !0), e) : (qn & 42) === 0 || (qn & 1073741824) !== 0 && (Ae & 261930) === 0 ? (it = !0, e.memoizedState = l) : (e = Jg(), ze.lanes |= e, bl |= e, t);
  }
  function Fh(e, t, l, i, r) {
    var c = O.p;
    O.p = c !== 0 && 8 > c ? c : 8;
    var m = E.T, x = {};
    E.T = x, ms(e, !1, t, l);
    try {
      var D = r(), Q = E.S;
      if (Q !== null && Q(x, D), D !== null && typeof D == "object" && typeof D.then == "function") {
        var te = Ub(
          D,
          i
        );
        Qi(
          e,
          t,
          te,
          Xt(e)
        );
      } else
        Qi(
          e,
          t,
          i,
          Xt(e)
        );
    } catch (ie) {
      Qi(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: ie },
        Xt()
      );
    } finally {
      O.p = c, m !== null && x.types !== null && (m.types = x.types), E.T = m;
    }
  }
  function Xb() {
  }
  function hs(e, t, l, i) {
    if (e.tag !== 5) throw Error(u(476));
    var r = Wh(e).queue;
    Fh(
      e,
      r,
      t,
      L,
      l === null ? Xb : function() {
        return Ih(e), l(i);
      }
    );
  }
  function Wh(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: L,
      baseState: L,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jn,
        lastRenderedState: L
      },
      next: null
    };
    var l = {};
    return t.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jn,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Ih(e) {
    var t = Wh(e);
    t.next === null && (t = e.alternate.memoizedState), Qi(
      e,
      t.next.queue,
      {},
      Xt()
    );
  }
  function gs() {
    return ht(so);
  }
  function Ph() {
    return et().memoizedState;
  }
  function eg() {
    return et().memoizedState;
  }
  function $b(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Xt();
          e = hl(l);
          var i = gl(t, e, l);
          i !== null && (Ot(i, t, l), Vi(i, t, l)), t = { cache: Xc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Zb(e, t, l) {
    var i = Xt();
    l = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ou(e) ? ng(t, l) : (l = Oc(e, t, l, i), l !== null && (Ot(l, e, i), lg(l, t, i)));
  }
  function tg(e, t, l) {
    var i = Xt();
    Qi(e, t, l, i);
  }
  function Qi(e, t, l, i) {
    var r = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ou(e)) ng(t, r);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var m = t.lastRenderedState, x = c(m, l);
          if (r.hasEagerState = !0, r.eagerState = x, Ut(x, m))
            return du(e, t, r, 0), Xe === null && fu(), !1;
        } catch {
        }
      if (l = Oc(e, t, r, i), l !== null)
        return Ot(l, e, i), lg(l, t, i), !0;
    }
    return !1;
  }
  function ms(e, t, l, i) {
    if (i = {
      lane: 2,
      revertLane: Qs(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ou(e)) {
      if (t) throw Error(u(479));
    } else
      t = Oc(
        e,
        l,
        i,
        2
      ), t !== null && Ot(t, e, 2);
  }
  function Ou(e) {
    var t = e.alternate;
    return e === ze || t !== null && t === ze;
  }
  function ng(e, t) {
    Ya = zu = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function lg(e, t, l) {
    if ((l & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Go(e, l);
    }
  }
  var Ki = {
    readContext: ht,
    use: Cu,
    useCallback: Fe,
    useContext: Fe,
    useEffect: Fe,
    useImperativeHandle: Fe,
    useLayoutEffect: Fe,
    useInsertionEffect: Fe,
    useMemo: Fe,
    useReducer: Fe,
    useRef: Fe,
    useState: Fe,
    useDebugValue: Fe,
    useDeferredValue: Fe,
    useTransition: Fe,
    useSyncExternalStore: Fe,
    useId: Fe,
    useHostTransitionStatus: Fe,
    useFormState: Fe,
    useActionState: Fe,
    useOptimistic: Fe,
    useMemoCache: Fe,
    useCacheRefresh: Fe
  };
  Ki.useEffectEvent = Fe;
  var ag = {
    readContext: ht,
    use: Cu,
    useCallback: function(e, t) {
      return St().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: ht,
    useEffect: Lh,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Tu(
        4194308,
        4,
        Zh.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return Tu(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Tu(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = St();
      t = t === void 0 ? null : t;
      var i = e();
      if (Wl) {
        bn(!0);
        try {
          e();
        } finally {
          bn(!1);
        }
      }
      return l.memoizedState = [i, t], i;
    },
    useReducer: function(e, t, l) {
      var i = St();
      if (l !== void 0) {
        var r = l(t);
        if (Wl) {
          bn(!0);
          try {
            l(t);
          } finally {
            bn(!1);
          }
        }
      } else r = t;
      return i.memoizedState = i.baseState = r, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: r
      }, i.queue = e, e = e.dispatch = Zb.bind(
        null,
        ze,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var t = St();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = rs(e);
      var t = e.queue, l = tg.bind(null, ze, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: fs,
    useDeferredValue: function(e, t) {
      var l = St();
      return ds(l, e, t);
    },
    useTransition: function() {
      var e = rs(!1);
      return e = Fh.bind(
        null,
        ze,
        e.queue,
        !0,
        !1
      ), St().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var i = ze, r = St();
      if (De) {
        if (l === void 0)
          throw Error(u(407));
        l = l();
      } else {
        if (l = t(), Xe === null)
          throw Error(u(349));
        (Ae & 127) !== 0 || zh(i, t, l);
      }
      r.memoizedState = l;
      var c = { value: l, getSnapshot: t };
      return r.queue = c, Lh(Nh.bind(null, i, c, e), [
        e
      ]), i.flags |= 2048, Va(
        9,
        { destroy: void 0 },
        Mh.bind(
          null,
          i,
          c,
          l,
          t
        ),
        null
      ), l;
    },
    useId: function() {
      var e = St(), t = Xe.identifierPrefix;
      if (De) {
        var l = Sn, i = _n;
        l = (i & ~(1 << 32 - _t(i) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Mu++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = qb++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: gs,
    useFormState: Bh,
    useActionState: Bh,
    useOptimistic: function(e) {
      var t = St();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = ms.bind(
        null,
        ze,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: is,
    useCacheRefresh: function() {
      return St().memoizedState = $b.bind(
        null,
        ze
      );
    },
    useEffectEvent: function(e) {
      var t = St(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((Be & 2) !== 0)
          throw Error(u(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, ps = {
    readContext: ht,
    use: Cu,
    useCallback: Qh,
    useContext: ht,
    useEffect: ss,
    useImperativeHandle: Gh,
    useInsertionEffect: Xh,
    useLayoutEffect: $h,
    useMemo: Kh,
    useReducer: Au,
    useRef: Yh,
    useState: function() {
      return Au(jn);
    },
    useDebugValue: fs,
    useDeferredValue: function(e, t) {
      var l = et();
      return Jh(
        l,
        je.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Au(jn)[0], t = et().memoizedState;
      return [
        typeof e == "boolean" ? e : Gi(e),
        t
      ];
    },
    useSyncExternalStore: Eh,
    useId: Ph,
    useHostTransitionStatus: gs,
    useFormState: Uh,
    useActionState: Uh,
    useOptimistic: function(e, t) {
      var l = et();
      return Th(l, je, e, t);
    },
    useMemoCache: is,
    useCacheRefresh: eg
  };
  ps.useEffectEvent = Vh;
  var ig = {
    readContext: ht,
    use: Cu,
    useCallback: Qh,
    useContext: ht,
    useEffect: ss,
    useImperativeHandle: Gh,
    useInsertionEffect: Xh,
    useLayoutEffect: $h,
    useMemo: Kh,
    useReducer: us,
    useRef: Yh,
    useState: function() {
      return us(jn);
    },
    useDebugValue: fs,
    useDeferredValue: function(e, t) {
      var l = et();
      return je === null ? ds(l, e, t) : Jh(
        l,
        je.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = us(jn)[0], t = et().memoizedState;
      return [
        typeof e == "boolean" ? e : Gi(e),
        t
      ];
    },
    useSyncExternalStore: Eh,
    useId: Ph,
    useHostTransitionStatus: gs,
    useFormState: jh,
    useActionState: jh,
    useOptimistic: function(e, t) {
      var l = et();
      return je !== null ? Th(l, je, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: is,
    useCacheRefresh: eg
  };
  ig.useEffectEvent = Vh;
  function ys(e, t, l, i) {
    t = e.memoizedState, l = l(i, t), l = l == null ? t : y({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var vs = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var i = Xt(), r = hl(i);
      r.payload = t, l != null && (r.callback = l), t = gl(e, r, i), t !== null && (Ot(t, e, i), Vi(t, e, i));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var i = Xt(), r = hl(i);
      r.tag = 1, r.payload = t, l != null && (r.callback = l), t = gl(e, r, i), t !== null && (Ot(t, e, i), Vi(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Xt(), i = hl(l);
      i.tag = 2, t != null && (i.callback = t), t = gl(e, i, l), t !== null && (Ot(t, e, l), Vi(t, e, l));
    }
  };
  function og(e, t, l, i, r, c, m) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, c, m) : t.prototype && t.prototype.isPureReactComponent ? !Hi(l, i) || !Hi(r, c) : !0;
  }
  function ug(e, t, l, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, i), t.state !== e && vs.enqueueReplaceState(t, t.state, null);
  }
  function Il(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var i in t)
        i !== "ref" && (l[i] = t[i]);
    }
    if (e = e.defaultProps) {
      l === t && (l = y({}, l));
      for (var r in e)
        l[r] === void 0 && (l[r] = e[r]);
    }
    return l;
  }
  function rg(e) {
    su(e);
  }
  function cg(e) {
    console.error(e);
  }
  function sg(e) {
    su(e);
  }
  function Ru(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function fg(e, t, l) {
    try {
      var i = e.onCaughtError;
      i(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function bs(e, t, l) {
    return l = hl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Ru(e, t);
    }, l;
  }
  function dg(e) {
    return e = hl(e), e.tag = 3, e;
  }
  function hg(e, t, l, i) {
    var r = l.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var c = i.value;
      e.payload = function() {
        return r(c);
      }, e.callback = function() {
        fg(t, l, i);
      };
    }
    var m = l.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (e.callback = function() {
      fg(t, l, i), typeof r != "function" && (xl === null ? xl = /* @__PURE__ */ new Set([this]) : xl.add(this));
      var x = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: x !== null ? x : ""
      });
    });
  }
  function Gb(e, t, l, i, r) {
    if (l.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (t = l.alternate, t !== null && Ha(
        t,
        l,
        r,
        !0
      ), l = jt.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return ln === null ? Zu() : l.alternate === null && We === 0 && (We = 3), l.flags &= -257, l.flags |= 65536, l.lanes = r, i === xu ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), $s(e, i, r)), !1;
          case 22:
            return l.flags |= 65536, i === xu ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : l.add(i)), $s(e, i, r)), !1;
        }
        throw Error(u(435, l.tag));
      }
      return $s(e, i, r), Zu(), !1;
    }
    if (De)
      return t = jt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = r, i !== qc && (e = Error(u(422), { cause: i }), Ui(Pt(e, l)))) : (i !== qc && (t = Error(u(423), {
        cause: i
      }), Ui(
        Pt(t, l)
      )), e = e.current.alternate, e.flags |= 65536, r &= -r, e.lanes |= r, i = Pt(i, l), r = bs(
        e.stateNode,
        i,
        r
      ), Jc(e, r), We !== 4 && (We = 2)), !1;
    var c = Error(u(520), { cause: i });
    if (c = Pt(c, l), no === null ? no = [c] : no.push(c), We !== 4 && (We = 2), t === null) return !0;
    i = Pt(i, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = r & -r, l.lanes |= e, e = bs(l.stateNode, i, e), Jc(l, e), !1;
        case 1:
          if (t = l.type, c = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (xl === null || !xl.has(c))))
            return l.flags |= 65536, r &= -r, l.lanes |= r, r = dg(r), hg(
              r,
              e,
              l,
              i
            ), Jc(l, r), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var xs = Error(u(461)), it = !1;
  function gt(e, t, l, i) {
    t.child = e === null ? yh(t, null, l, i) : Fl(
      t,
      e.child,
      l,
      i
    );
  }
  function gg(e, t, l, i, r) {
    l = l.render;
    var c = t.ref;
    if ("ref" in i) {
      var m = {};
      for (var x in i)
        x !== "ref" && (m[x] = i[x]);
    } else m = i;
    return Gl(t), i = ts(
      e,
      t,
      l,
      m,
      c,
      r
    ), x = ns(), e !== null && !it ? (ls(e, t, r), Yn(e, t, r)) : (De && x && Bc(t), t.flags |= 1, gt(e, t, i, r), t.child);
  }
  function mg(e, t, l, i, r) {
    if (e === null) {
      var c = l.type;
      return typeof c == "function" && !Rc(c) && c.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = c, pg(
        e,
        t,
        c,
        i,
        r
      )) : (e = gu(
        l.type,
        null,
        i,
        t,
        t.mode,
        r
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !Cs(e, r)) {
      var m = c.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Hi, l(m, i) && e.ref === t.ref)
        return Yn(e, t, r);
    }
    return t.flags |= 1, e = Hn(c, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function pg(e, t, l, i, r) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Hi(c, i) && e.ref === t.ref)
        if (it = !1, t.pendingProps = i = c, Cs(e, r))
          (e.flags & 131072) !== 0 && (it = !0);
        else
          return t.lanes = e.lanes, Yn(e, t, r);
    }
    return _s(
      e,
      t,
      l,
      i,
      r
    );
  }
  function yg(e, t, l, i) {
    var r = i.children, c = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | l : l, e !== null) {
          for (i = t.child = e.child, r = 0; i !== null; )
            r = r | i.lanes | i.childLanes, i = i.sibling;
          i = r & ~c;
        } else i = 0, t.child = null;
        return vg(
          e,
          t,
          c,
          l,
          i
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && vu(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? xh(t, c) : Wc(), _h(t);
      else
        return i = t.lanes = 536870912, vg(
          e,
          t,
          c !== null ? c.baseLanes | l : l,
          l,
          i
        );
    } else
      c !== null ? (vu(t, c.cachePool), xh(t, c), pl(), t.memoizedState = null) : (e !== null && vu(t, null), Wc(), pl());
    return gt(e, t, r, l), t.child;
  }
  function Ji(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function vg(e, t, l, i, r) {
    var c = Zc();
    return c = c === null ? null : { parent: lt._currentValue, pool: c }, t.memoizedState = {
      baseLanes: l,
      cachePool: c
    }, e !== null && vu(t, null), Wc(), _h(t), e !== null && Ha(e, t, i, !0), t.childLanes = r, null;
  }
  function Hu(e, t) {
    return t = Bu(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function bg(e, t, l) {
    return Fl(t, e.child, null, l), e = Hu(t, t.pendingProps), e.flags |= 2, Yt(t), t.memoizedState = null, e;
  }
  function Qb(e, t, l) {
    var i = t.pendingProps, r = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (De) {
        if (i.mode === "hidden")
          return e = Hu(t, i), t.lanes = 536870912, Ji(null, e);
        if (Pc(t), (e = Ze) ? (e = Dm(
          e,
          nn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: rl !== null ? { id: _n, overflow: Sn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = nh(e), l.return = t, t.child = l, dt = t, Ze = null)) : e = null, e === null) throw sl(t);
        return t.lanes = 536870912, null;
      }
      return Hu(t, i);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var m = c.dehydrated;
      if (Pc(t), r)
        if (t.flags & 256)
          t.flags &= -257, t = bg(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(u(558));
      else if (it || Ha(e, t, l, !1), r = (l & e.childLanes) !== 0, it || r) {
        if (i = Xe, i !== null && (m = Qo(i, l), m !== 0 && m !== c.retryLane))
          throw c.retryLane = m, Vl(e, m), Ot(i, e, m), xs;
        Zu(), t = bg(
          e,
          t,
          l
        );
      } else
        e = c.treeContext, Ze = an(m.nextSibling), dt = t, De = !0, cl = null, nn = !1, e !== null && ih(t, e), t = Hu(t, i), t.flags |= 4096;
      return t;
    }
    return e = Hn(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function ku(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(u(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function _s(e, t, l, i, r) {
    return Gl(t), l = ts(
      e,
      t,
      l,
      i,
      void 0,
      r
    ), i = ns(), e !== null && !it ? (ls(e, t, r), Yn(e, t, r)) : (De && i && Bc(t), t.flags |= 1, gt(e, t, l, r), t.child);
  }
  function xg(e, t, l, i, r, c) {
    return Gl(t), t.updateQueue = null, l = wh(
      t,
      i,
      l,
      r
    ), Sh(e), i = ns(), e !== null && !it ? (ls(e, t, c), Yn(e, t, c)) : (De && i && Bc(t), t.flags |= 1, gt(e, t, l, c), t.child);
  }
  function _g(e, t, l, i, r) {
    if (Gl(t), t.stateNode === null) {
      var c = Ta, m = l.contextType;
      typeof m == "object" && m !== null && (c = ht(m)), c = new l(i, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = vs, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = i, c.state = t.memoizedState, c.refs = {}, Qc(t), m = l.contextType, c.context = typeof m == "object" && m !== null ? ht(m) : Ta, c.state = t.memoizedState, m = l.getDerivedStateFromProps, typeof m == "function" && (ys(
        t,
        l,
        m,
        i
      ), c.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (m = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), m !== c.state && vs.enqueueReplaceState(c, c.state, null), $i(t, i, c, r), Xi(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      c = t.stateNode;
      var x = t.memoizedProps, D = Il(l, x);
      c.props = D;
      var Q = c.context, te = l.contextType;
      m = Ta, typeof te == "object" && te !== null && (m = ht(te));
      var ie = l.getDerivedStateFromProps;
      te = typeof ie == "function" || typeof c.getSnapshotBeforeUpdate == "function", x = t.pendingProps !== x, te || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (x || Q !== m) && ug(
        t,
        c,
        i,
        m
      ), dl = !1;
      var K = t.memoizedState;
      c.state = K, $i(t, i, c, r), Xi(), Q = t.memoizedState, x || K !== Q || dl ? (typeof ie == "function" && (ys(
        t,
        l,
        ie,
        i
      ), Q = t.memoizedState), (D = dl || og(
        t,
        l,
        D,
        i,
        K,
        Q,
        m
      )) ? (te || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = Q), c.props = i, c.state = Q, c.context = m, i = D) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      c = t.stateNode, Kc(e, t), m = t.memoizedProps, te = Il(l, m), c.props = te, ie = t.pendingProps, K = c.context, Q = l.contextType, D = Ta, typeof Q == "object" && Q !== null && (D = ht(Q)), x = l.getDerivedStateFromProps, (Q = typeof x == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (m !== ie || K !== D) && ug(
        t,
        c,
        i,
        D
      ), dl = !1, K = t.memoizedState, c.state = K, $i(t, i, c, r), Xi();
      var W = t.memoizedState;
      m !== ie || K !== W || dl || e !== null && e.dependencies !== null && pu(e.dependencies) ? (typeof x == "function" && (ys(
        t,
        l,
        x,
        i
      ), W = t.memoizedState), (te = dl || og(
        t,
        l,
        te,
        i,
        K,
        W,
        D
      ) || e !== null && e.dependencies !== null && pu(e.dependencies)) ? (Q || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(i, W, D), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        i,
        W,
        D
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || m === e.memoizedProps && K === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && K === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = W), c.props = i, c.state = W, c.context = D, i = te) : (typeof c.componentDidUpdate != "function" || m === e.memoizedProps && K === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && K === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return c = i, ku(e, t), i = (t.flags & 128) !== 0, c || i ? (c = t.stateNode, l = i && typeof l.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && i ? (t.child = Fl(
      t,
      e.child,
      null,
      r
    ), t.child = Fl(
      t,
      null,
      l,
      r
    )) : gt(e, t, l, r), t.memoizedState = c.state, e = t.child) : e = Yn(
      e,
      t,
      r
    ), e;
  }
  function Sg(e, t, l, i) {
    return $l(), t.flags |= 256, gt(e, t, l, i), t.child;
  }
  var Ss = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ws(e) {
    return { baseLanes: e, cachePool: fh() };
  }
  function Es(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Vt), e;
  }
  function wg(e, t, l) {
    var i = t.pendingProps, r = !1, c = (t.flags & 128) !== 0, m;
    if ((m = c) || (m = e !== null && e.memoizedState === null ? !1 : (Pe.current & 2) !== 0), m && (r = !0, t.flags &= -129), m = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (De) {
        if (r ? ml(t) : pl(), (e = Ze) ? (e = Dm(
          e,
          nn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: rl !== null ? { id: _n, overflow: Sn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = nh(e), l.return = t, t.child = l, dt = t, Ze = null)) : e = null, e === null) throw sl(t);
        return uf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var x = i.children;
      return i = i.fallback, r ? (pl(), r = t.mode, x = Bu(
        { mode: "hidden", children: x },
        r
      ), i = Xl(
        i,
        r,
        l,
        null
      ), x.return = t, i.return = t, x.sibling = i, t.child = x, i = t.child, i.memoizedState = ws(l), i.childLanes = Es(
        e,
        m,
        l
      ), t.memoizedState = Ss, Ji(null, i)) : (ml(t), zs(t, x));
    }
    var D = e.memoizedState;
    if (D !== null && (x = D.dehydrated, x !== null)) {
      if (c)
        t.flags & 256 ? (ml(t), t.flags &= -257, t = Ms(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (pl(), t.child = e.child, t.flags |= 128, t = null) : (pl(), x = i.fallback, r = t.mode, i = Bu(
          { mode: "visible", children: i.children },
          r
        ), x = Xl(
          x,
          r,
          l,
          null
        ), x.flags |= 2, i.return = t, x.return = t, i.sibling = x, t.child = i, Fl(
          t,
          e.child,
          null,
          l
        ), i = t.child, i.memoizedState = ws(l), i.childLanes = Es(
          e,
          m,
          l
        ), t.memoizedState = Ss, t = Ji(null, i));
      else if (ml(t), uf(x)) {
        if (m = x.nextSibling && x.nextSibling.dataset, m) var Q = m.dgst;
        m = Q, i = Error(u(419)), i.stack = "", i.digest = m, Ui({ value: i, source: null, stack: null }), t = Ms(
          e,
          t,
          l
        );
      } else if (it || Ha(e, t, l, !1), m = (l & e.childLanes) !== 0, it || m) {
        if (m = Xe, m !== null && (i = Qo(m, l), i !== 0 && i !== D.retryLane))
          throw D.retryLane = i, Vl(e, i), Ot(m, e, i), xs;
        of(x) || Zu(), t = Ms(
          e,
          t,
          l
        );
      } else
        of(x) ? (t.flags |= 192, t.child = e.child, t = null) : (e = D.treeContext, Ze = an(
          x.nextSibling
        ), dt = t, De = !0, cl = null, nn = !1, e !== null && ih(t, e), t = zs(
          t,
          i.children
        ), t.flags |= 4096);
      return t;
    }
    return r ? (pl(), x = i.fallback, r = t.mode, D = e.child, Q = D.sibling, i = Hn(D, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = D.subtreeFlags & 65011712, Q !== null ? x = Hn(
      Q,
      x
    ) : (x = Xl(
      x,
      r,
      l,
      null
    ), x.flags |= 2), x.return = t, i.return = t, i.sibling = x, t.child = i, Ji(null, i), i = t.child, x = e.child.memoizedState, x === null ? x = ws(l) : (r = x.cachePool, r !== null ? (D = lt._currentValue, r = r.parent !== D ? { parent: D, pool: D } : r) : r = fh(), x = {
      baseLanes: x.baseLanes | l,
      cachePool: r
    }), i.memoizedState = x, i.childLanes = Es(
      e,
      m,
      l
    ), t.memoizedState = Ss, Ji(e.child, i)) : (ml(t), l = e.child, e = l.sibling, l = Hn(l, {
      mode: "visible",
      children: i.children
    }), l.return = t, l.sibling = null, e !== null && (m = t.deletions, m === null ? (t.deletions = [e], t.flags |= 16) : m.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function zs(e, t) {
    return t = Bu(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Bu(e, t) {
    return e = qt(22, e, null, t), e.lanes = 0, e;
  }
  function Ms(e, t, l) {
    return Fl(t, e.child, null, l), e = zs(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Eg(e, t, l) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), Lc(e.return, t, l);
  }
  function Ns(e, t, l, i, r, c) {
    var m = e.memoizedState;
    m === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: l,
      tailMode: r,
      treeForkCount: c
    } : (m.isBackwards = t, m.rendering = null, m.renderingStartTime = 0, m.last = i, m.tail = l, m.tailMode = r, m.treeForkCount = c);
  }
  function zg(e, t, l) {
    var i = t.pendingProps, r = i.revealOrder, c = i.tail;
    i = i.children;
    var m = Pe.current, x = (m & 2) !== 0;
    if (x ? (m = m & 1 | 2, t.flags |= 128) : m &= 1, P(Pe, m), gt(e, t, i, l), i = De ? Bi : 0, !x && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Eg(e, l, t);
        else if (e.tag === 19)
          Eg(e, l, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (r) {
      case "forwards":
        for (l = t.child, r = null; l !== null; )
          e = l.alternate, e !== null && Eu(e) === null && (r = l), l = l.sibling;
        l = r, l === null ? (r = t.child, t.child = null) : (r = l.sibling, l.sibling = null), Ns(
          t,
          !1,
          r,
          l,
          c,
          i
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, r = t.child, t.child = null; r !== null; ) {
          if (e = r.alternate, e !== null && Eu(e) === null) {
            t.child = r;
            break;
          }
          e = r.sibling, r.sibling = l, l = r, r = e;
        }
        Ns(
          t,
          !0,
          l,
          null,
          c,
          i
        );
        break;
      case "together":
        Ns(
          t,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Yn(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), bl |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (Ha(
          e,
          t,
          l,
          !1
        ), (l & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(u(153));
    if (t.child !== null) {
      for (e = t.child, l = Hn(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = Hn(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function Cs(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && pu(e)));
  }
  function Kb(e, t, l) {
    switch (t.tag) {
      case 3:
        ee(t, t.stateNode.containerInfo), fl(t, lt, e.memoizedState.cache), $l();
        break;
      case 27:
      case 5:
        Se(t);
        break;
      case 4:
        ee(t, t.stateNode.containerInfo);
        break;
      case 10:
        fl(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Pc(t), null;
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? (ml(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? wg(e, t, l) : (ml(t), e = Yn(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        ml(t);
        break;
      case 19:
        var r = (e.flags & 128) !== 0;
        if (i = (l & t.childLanes) !== 0, i || (Ha(
          e,
          t,
          l,
          !1
        ), i = (l & t.childLanes) !== 0), r) {
          if (i)
            return zg(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (r = t.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), P(Pe, Pe.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, yg(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        fl(t, lt, e.memoizedState.cache);
    }
    return Yn(e, t, l);
  }
  function Mg(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        it = !0;
      else {
        if (!Cs(e, l) && (t.flags & 128) === 0)
          return it = !1, Kb(
            e,
            t,
            l
          );
        it = (e.flags & 131072) !== 0;
      }
    else
      it = !1, De && (t.flags & 1048576) !== 0 && ah(t, Bi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = Kl(t.elementType), t.type = e, typeof e == "function")
            Rc(e) ? (i = Il(e, i), t.tag = 1, t = _g(
              null,
              t,
              e,
              i,
              l
            )) : (t.tag = 0, t = _s(
              null,
              t,
              e,
              i,
              l
            ));
          else {
            if (e != null) {
              var r = e.$$typeof;
              if (r === N) {
                t.tag = 11, t = gg(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              } else if (r === B) {
                t.tag = 14, t = mg(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              }
            }
            throw t = T(e) || e, Error(u(306, t, ""));
          }
        }
        return t;
      case 0:
        return _s(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return i = t.type, r = Il(
          i,
          t.pendingProps
        ), _g(
          e,
          t,
          i,
          r,
          l
        );
      case 3:
        e: {
          if (ee(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(u(387));
          i = t.pendingProps;
          var c = t.memoizedState;
          r = c.element, Kc(e, t), $i(t, i, null, l);
          var m = t.memoizedState;
          if (i = m.cache, fl(t, lt, i), i !== c.cache && Vc(
            t,
            [lt],
            l,
            !0
          ), Xi(), i = m.element, c.isDehydrated)
            if (c = {
              element: i,
              isDehydrated: !1,
              cache: m.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = Sg(
                e,
                t,
                i,
                l
              );
              break e;
            } else if (i !== r) {
              r = Pt(
                Error(u(424)),
                t
              ), Ui(r), t = Sg(
                e,
                t,
                i,
                l
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Ze = an(e.firstChild), dt = t, De = !0, cl = null, nn = !0, l = yh(
                t,
                null,
                i,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if ($l(), i === r) {
              t = Yn(
                e,
                t,
                l
              );
              break e;
            }
            gt(e, t, i, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return ku(e, t), e === null ? (l = Um(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : De || (l = t.type, e = t.pendingProps, i = Iu(
          fe.current
        ).createElement(l), i[ct] = t, i[yt] = e, mt(i, l, e), nt(i), t.stateNode = i) : t.memoizedState = Um(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Se(t), e === null && De && (i = t.stateNode = Hm(
          t.type,
          t.pendingProps,
          fe.current
        ), dt = t, nn = !0, r = Ze, El(t.type) ? (rf = r, Ze = an(i.firstChild)) : Ze = r), gt(
          e,
          t,
          t.pendingProps.children,
          l
        ), ku(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && De && ((r = i = Ze) && (i = E1(
          i,
          t.type,
          t.pendingProps,
          nn
        ), i !== null ? (t.stateNode = i, dt = t, Ze = an(i.firstChild), nn = !1, r = !0) : r = !1), r || sl(t)), Se(t), r = t.type, c = t.pendingProps, m = e !== null ? e.memoizedProps : null, i = c.children, nf(r, c) ? i = null : m !== null && nf(r, m) && (t.flags |= 32), t.memoizedState !== null && (r = ts(
          e,
          t,
          jb,
          null,
          null,
          l
        ), so._currentValue = r), ku(e, t), gt(e, t, i, l), t.child;
      case 6:
        return e === null && De && ((e = l = Ze) && (l = z1(
          l,
          t.pendingProps,
          nn
        ), l !== null ? (t.stateNode = l, dt = t, Ze = null, e = !0) : e = !1), e || sl(t)), null;
      case 13:
        return wg(e, t, l);
      case 4:
        return ee(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = Fl(
          t,
          null,
          i,
          l
        ) : gt(e, t, i, l), t.child;
      case 11:
        return gg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return gt(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return gt(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return gt(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return i = t.pendingProps, fl(t, t.type, i.value), gt(e, t, i.children, l), t.child;
      case 9:
        return r = t.type._context, i = t.pendingProps.children, Gl(t), r = ht(r), i = i(r), t.flags |= 1, gt(e, t, i, l), t.child;
      case 14:
        return mg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return pg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return zg(e, t, l);
      case 31:
        return Qb(e, t, l);
      case 22:
        return yg(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return Gl(t), i = ht(lt), e === null ? (r = Zc(), r === null && (r = Xe, c = Xc(), r.pooledCache = c, c.refCount++, c !== null && (r.pooledCacheLanes |= l), r = c), t.memoizedState = { parent: i, cache: r }, Qc(t), fl(t, lt, r)) : ((e.lanes & l) !== 0 && (Kc(e, t), $i(t, null, null, l), Xi()), r = e.memoizedState, c = t.memoizedState, r.parent !== i ? (r = { parent: i, cache: i }, t.memoizedState = r, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = r), fl(t, lt, i)) : (i = c.cache, fl(t, lt, i), i !== r.cache && Vc(
          t,
          [lt],
          l,
          !0
        ))), gt(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function Ln(e) {
    e.flags |= 4;
  }
  function As(e, t, l, i, r) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (r & 335544128) === r)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Pg()) e.flags |= 8192;
        else
          throw Jl = xu, Gc;
    } else e.flags &= -16777217;
  }
  function Ng(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Vm(t))
      if (Pg()) e.flags |= 8192;
      else
        throw Jl = xu, Gc;
  }
  function Uu(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? $o() : 536870912, e.lanes |= t, Ga |= t);
  }
  function Fi(e, t) {
    if (!De)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var l = null; t !== null; )
            t.alternate !== null && (l = t), t = t.sibling;
          l === null ? e.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = e.tail;
          for (var i = null; l !== null; )
            l.alternate !== null && (i = l), l = l.sibling;
          i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
      }
  }
  function Ge(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, i = 0;
    if (t)
      for (var r = e.child; r !== null; )
        l |= r.lanes | r.childLanes, i |= r.subtreeFlags & 65011712, i |= r.flags & 65011712, r.return = e, r = r.sibling;
    else
      for (r = e.child; r !== null; )
        l |= r.lanes | r.childLanes, i |= r.subtreeFlags, i |= r.flags, r.return = e, r = r.sibling;
    return e.subtreeFlags |= i, e.childLanes = l, t;
  }
  function Jb(e, t, l) {
    var i = t.pendingProps;
    switch (Uc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ge(t), null;
      case 1:
        return Ge(t), null;
      case 3:
        return l = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), Un(lt), se(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Ra(t) ? Ln(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, jc())), Ge(t), null;
      case 26:
        var r = t.type, c = t.memoizedState;
        return e === null ? (Ln(t), c !== null ? (Ge(t), Ng(t, c)) : (Ge(t), As(
          t,
          r,
          null,
          i,
          l
        ))) : c ? c !== e.memoizedState ? (Ln(t), Ge(t), Ng(t, c)) : (Ge(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && Ln(t), Ge(t), As(
          t,
          r,
          e,
          i,
          l
        )), null;
      case 27:
        if (_e(t), l = fe.current, r = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Ln(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Ge(t), null;
          }
          e = le.current, Ra(t) ? oh(t) : (e = Hm(r, i, l), t.stateNode = e, Ln(t));
        }
        return Ge(t), null;
      case 5:
        if (_e(t), r = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Ln(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Ge(t), null;
          }
          if (c = le.current, Ra(t))
            oh(t);
          else {
            var m = Iu(
              fe.current
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
                    c = typeof i.is == "string" ? m.createElement("select", {
                      is: i.is
                    }) : m.createElement("select"), i.multiple ? c.multiple = !0 : i.size && (c.size = i.size);
                    break;
                  default:
                    c = typeof i.is == "string" ? m.createElement(r, { is: i.is }) : m.createElement(r);
                }
            }
            c[ct] = t, c[yt] = i;
            e: for (m = t.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6)
                c.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                m.child.return = m, m = m.child;
                continue;
              }
              if (m === t) break e;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === t)
                  break e;
                m = m.return;
              }
              m.sibling.return = m.return, m = m.sibling;
            }
            t.stateNode = c;
            e: switch (mt(c, r, i), r) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
            i && Ln(t);
          }
        }
        return Ge(t), As(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== i && Ln(t);
        else {
          if (typeof i != "string" && t.stateNode === null)
            throw Error(u(166));
          if (e = fe.current, Ra(t)) {
            if (e = t.stateNode, l = t.memoizedProps, i = null, r = dt, r !== null)
              switch (r.tag) {
                case 27:
                case 5:
                  i = r.memoizedProps;
              }
            e[ct] = t, e = !!(e.nodeValue === l || i !== null && i.suppressHydrationWarning === !0 || wm(e.nodeValue, l)), e || sl(t, !0);
          } else
            e = Iu(e).createTextNode(
              i
            ), e[ct] = t, t.stateNode = e;
        }
        return Ge(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = Ra(t), l !== null) {
            if (e === null) {
              if (!i) throw Error(u(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(557));
              e[ct] = t;
            } else
              $l(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ge(t), e = !1;
          } else
            l = jc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (Yt(t), t) : (Yt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(u(558));
        }
        return Ge(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (r = Ra(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!r) throw Error(u(318));
              if (r = t.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(u(317));
              r[ct] = t;
            } else
              $l(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ge(t), r = !1;
          } else
            r = jc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), r = !0;
          if (!r)
            return t.flags & 256 ? (Yt(t), t) : (Yt(t), null);
        }
        return Yt(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = i !== null, e = e !== null && e.memoizedState !== null, l && (i = t.child, r = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (r = i.alternate.memoizedState.cachePool.pool), c = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (c = i.memoizedState.cachePool.pool), c !== r && (i.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Uu(t, t.updateQueue), Ge(t), null);
      case 4:
        return se(), e === null && Ws(t.stateNode.containerInfo), Ge(t), null;
      case 10:
        return Un(t.type), Ge(t), null;
      case 19:
        if (H(Pe), i = t.memoizedState, i === null) return Ge(t), null;
        if (r = (t.flags & 128) !== 0, c = i.rendering, c === null)
          if (r) Fi(i, !1);
          else {
            if (We !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = Eu(e), c !== null) {
                  for (t.flags |= 128, Fi(i, !1), e = c.updateQueue, t.updateQueue = e, Uu(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    th(l, e), l = l.sibling;
                  return P(
                    Pe,
                    Pe.current & 1 | 2
                  ), De && kn(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && Ie() > Vu && (t.flags |= 128, r = !0, Fi(i, !1), t.lanes = 4194304);
          }
        else {
          if (!r)
            if (e = Eu(c), e !== null) {
              if (t.flags |= 128, r = !0, e = e.updateQueue, t.updateQueue = e, Uu(t, e), Fi(i, !0), i.tail === null && i.tailMode === "hidden" && !c.alternate && !De)
                return Ge(t), null;
            } else
              2 * Ie() - i.renderingStartTime > Vu && l !== 536870912 && (t.flags |= 128, r = !0, Fi(i, !1), t.lanes = 4194304);
          i.isBackwards ? (c.sibling = t.child, t.child = c) : (e = i.last, e !== null ? e.sibling = c : t.child = c, i.last = c);
        }
        return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = Ie(), e.sibling = null, l = Pe.current, P(
          Pe,
          r ? l & 1 | 2 : l & 1
        ), De && kn(t, i.treeForkCount), e) : (Ge(t), null);
      case 22:
      case 23:
        return Yt(t), Ic(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Ge(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ge(t), l = t.updateQueue, l !== null && Uu(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== l && (t.flags |= 2048), e !== null && H(Ql), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Un(lt), Ge(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function Fb(e, t) {
    switch (Uc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Un(lt), se(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return _e(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Yt(t), t.alternate === null)
            throw Error(u(340));
          $l();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Yt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(u(340));
          $l();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return H(Pe), null;
      case 4:
        return se(), null;
      case 10:
        return Un(t.type), null;
      case 22:
      case 23:
        return Yt(t), Ic(), e !== null && H(Ql), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Un(lt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Cg(e, t) {
    switch (Uc(t), t.tag) {
      case 3:
        Un(lt), se();
        break;
      case 26:
      case 27:
      case 5:
        _e(t);
        break;
      case 4:
        se();
        break;
      case 31:
        t.memoizedState !== null && Yt(t);
        break;
      case 13:
        Yt(t);
        break;
      case 19:
        H(Pe);
        break;
      case 10:
        Un(t.type);
        break;
      case 22:
      case 23:
        Yt(t), Ic(), e !== null && H(Ql);
        break;
      case 24:
        Un(lt);
    }
  }
  function Wi(e, t) {
    try {
      var l = t.updateQueue, i = l !== null ? l.lastEffect : null;
      if (i !== null) {
        var r = i.next;
        l = r;
        do {
          if ((l.tag & e) === e) {
            i = void 0;
            var c = l.create, m = l.inst;
            i = c(), m.destroy = i;
          }
          l = l.next;
        } while (l !== r);
      }
    } catch (x) {
      qe(t, t.return, x);
    }
  }
  function yl(e, t, l) {
    try {
      var i = t.updateQueue, r = i !== null ? i.lastEffect : null;
      if (r !== null) {
        var c = r.next;
        i = c;
        do {
          if ((i.tag & e) === e) {
            var m = i.inst, x = m.destroy;
            if (x !== void 0) {
              m.destroy = void 0, r = t;
              var D = l, Q = x;
              try {
                Q();
              } catch (te) {
                qe(
                  r,
                  D,
                  te
                );
              }
            }
          }
          i = i.next;
        } while (i !== c);
      }
    } catch (te) {
      qe(t, t.return, te);
    }
  }
  function Ag(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        bh(t, l);
      } catch (i) {
        qe(e, e.return, i);
      }
    }
  }
  function Tg(e, t, l) {
    l.props = Il(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (i) {
      qe(e, t, i);
    }
  }
  function Ii(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode;
            break;
          case 30:
            i = e.stateNode;
            break;
          default:
            i = e.stateNode;
        }
        typeof l == "function" ? e.refCleanup = l(i) : l.current = i;
      }
    } catch (r) {
      qe(e, t, r);
    }
  }
  function wn(e, t) {
    var l = e.ref, i = e.refCleanup;
    if (l !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (r) {
          qe(e, t, r);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (r) {
          qe(e, t, r);
        }
      else l.current = null;
  }
  function Dg(e) {
    var t = e.type, l = e.memoizedProps, i = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && i.focus();
          break e;
        case "img":
          l.src ? i.src = l.src : l.srcSet && (i.srcset = l.srcSet);
      }
    } catch (r) {
      qe(e, e.return, r);
    }
  }
  function Ts(e, t, l) {
    try {
      var i = e.stateNode;
      v1(i, e.type, l, t), i[yt] = t;
    } catch (r) {
      qe(e, e.return, r);
    }
  }
  function Og(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && El(e.type) || e.tag === 4;
  }
  function Ds(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Og(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && El(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Os(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = On));
    else if (i !== 4 && (i === 27 && El(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (Os(e, t, l), e = e.sibling; e !== null; )
        Os(e, t, l), e = e.sibling;
  }
  function qu(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (i !== 4 && (i === 27 && El(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (qu(e, t, l), e = e.sibling; e !== null; )
        qu(e, t, l), e = e.sibling;
  }
  function Rg(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var i = e.type, r = t.attributes; r.length; )
        t.removeAttributeNode(r[0]);
      mt(t, i, l), t[ct] = e, t[yt] = l;
    } catch (c) {
      qe(e, e.return, c);
    }
  }
  var Vn = !1, ot = !1, Rs = !1, Hg = typeof WeakSet == "function" ? WeakSet : Set, ft = null;
  function Wb(e, t) {
    if (e = e.containerInfo, ef = ir, e = Gd(e), Mc(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var i = l.getSelection && l.getSelection();
          if (i && i.rangeCount !== 0) {
            l = i.anchorNode;
            var r = i.anchorOffset, c = i.focusNode;
            i = i.focusOffset;
            try {
              l.nodeType, c.nodeType;
            } catch {
              l = null;
              break e;
            }
            var m = 0, x = -1, D = -1, Q = 0, te = 0, ie = e, K = null;
            t: for (; ; ) {
              for (var W; ie !== l || r !== 0 && ie.nodeType !== 3 || (x = m + r), ie !== c || i !== 0 && ie.nodeType !== 3 || (D = m + i), ie.nodeType === 3 && (m += ie.nodeValue.length), (W = ie.firstChild) !== null; )
                K = ie, ie = W;
              for (; ; ) {
                if (ie === e) break t;
                if (K === l && ++Q === r && (x = m), K === c && ++te === i && (D = m), (W = ie.nextSibling) !== null) break;
                ie = K, K = ie.parentNode;
              }
              ie = W;
            }
            l = x === -1 || D === -1 ? null : { start: x, end: D };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (tf = { focusedElem: e, selectionRange: l }, ir = !1, ft = t; ft !== null; )
      if (t = ft, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, ft = e;
      else
        for (; ft !== null; ) {
          switch (t = ft, c = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  r = e[l], r.ref.impl = r.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                e = void 0, l = t, r = c.memoizedProps, c = c.memoizedState, i = l.stateNode;
                try {
                  var de = Il(
                    l.type,
                    r
                  );
                  e = i.getSnapshotBeforeUpdate(
                    de,
                    c
                  ), i.__reactInternalSnapshotBeforeUpdate = e;
                } catch (ve) {
                  qe(
                    l,
                    l.return,
                    ve
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9)
                  af(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      af(e);
                      break;
                    default:
                      e.textContent = "";
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
              if ((e & 1024) !== 0) throw Error(u(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, ft = e;
            break;
          }
          ft = t.return;
        }
  }
  function kg(e, t, l) {
    var i = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        $n(e, l), i & 4 && Wi(5, l);
        break;
      case 1:
        if ($n(e, l), i & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (m) {
              qe(l, l.return, m);
            }
          else {
            var r = Il(
              l.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                r,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (m) {
              qe(
                l,
                l.return,
                m
              );
            }
          }
        i & 64 && Ag(l), i & 512 && Ii(l, l.return);
        break;
      case 3:
        if ($n(e, l), i & 64 && (e = l.updateQueue, e !== null)) {
          if (t = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            bh(e, t);
          } catch (m) {
            qe(l, l.return, m);
          }
        }
        break;
      case 27:
        t === null && i & 4 && Rg(l);
      case 26:
      case 5:
        $n(e, l), t === null && i & 4 && Dg(l), i & 512 && Ii(l, l.return);
        break;
      case 12:
        $n(e, l);
        break;
      case 31:
        $n(e, l), i & 4 && qg(e, l);
        break;
      case 13:
        $n(e, l), i & 4 && jg(e, l), i & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = o1.bind(
          null,
          l
        ), M1(e, l))));
        break;
      case 22:
        if (i = l.memoizedState !== null || Vn, !i) {
          t = t !== null && t.memoizedState !== null || ot, r = Vn;
          var c = ot;
          Vn = i, (ot = t) && !c ? Zn(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : $n(e, l), Vn = r, ot = c;
        }
        break;
      case 30:
        break;
      default:
        $n(e, l);
    }
  }
  function Bg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Bg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && xi(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Qe = null, Ct = !1;
  function Xn(e, t, l) {
    for (l = l.child; l !== null; )
      Ug(e, t, l), l = l.sibling;
  }
  function Ug(e, t, l) {
    if (xt && typeof xt.onCommitFiberUnmount == "function")
      try {
        xt.onCommitFiberUnmount(kl, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        ot || wn(l, t), Xn(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        ot || wn(l, t);
        var i = Qe, r = Ct;
        El(l.type) && (Qe = l.stateNode, Ct = !1), Xn(
          e,
          t,
          l
        ), uo(l.stateNode), Qe = i, Ct = r;
        break;
      case 5:
        ot || wn(l, t);
      case 6:
        if (i = Qe, r = Ct, Qe = null, Xn(
          e,
          t,
          l
        ), Qe = i, Ct = r, Qe !== null)
          if (Ct)
            try {
              (Qe.nodeType === 9 ? Qe.body : Qe.nodeName === "HTML" ? Qe.ownerDocument.body : Qe).removeChild(l.stateNode);
            } catch (c) {
              qe(
                l,
                t,
                c
              );
            }
          else
            try {
              Qe.removeChild(l.stateNode);
            } catch (c) {
              qe(
                l,
                t,
                c
              );
            }
        break;
      case 18:
        Qe !== null && (Ct ? (e = Qe, Am(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), ei(e)) : Am(Qe, l.stateNode));
        break;
      case 4:
        i = Qe, r = Ct, Qe = l.stateNode.containerInfo, Ct = !0, Xn(
          e,
          t,
          l
        ), Qe = i, Ct = r;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        yl(2, l, t), ot || yl(4, l, t), Xn(
          e,
          t,
          l
        );
        break;
      case 1:
        ot || (wn(l, t), i = l.stateNode, typeof i.componentWillUnmount == "function" && Tg(
          l,
          t,
          i
        )), Xn(
          e,
          t,
          l
        );
        break;
      case 21:
        Xn(
          e,
          t,
          l
        );
        break;
      case 22:
        ot = (i = ot) || l.memoizedState !== null, Xn(
          e,
          t,
          l
        ), ot = i;
        break;
      default:
        Xn(
          e,
          t,
          l
        );
    }
  }
  function qg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        ei(e);
      } catch (l) {
        qe(t, t.return, l);
      }
    }
  }
  function jg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        ei(e);
      } catch (l) {
        qe(t, t.return, l);
      }
  }
  function Ib(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Hg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Hg()), t;
      default:
        throw Error(u(435, e.tag));
    }
  }
  function ju(e, t) {
    var l = Ib(e);
    t.forEach(function(i) {
      if (!l.has(i)) {
        l.add(i);
        var r = u1.bind(null, e, i);
        i.then(r, r);
      }
    });
  }
  function At(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var i = 0; i < l.length; i++) {
        var r = l[i], c = e, m = t, x = m;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (El(x.type)) {
                Qe = x.stateNode, Ct = !1;
                break e;
              }
              break;
            case 5:
              Qe = x.stateNode, Ct = !1;
              break e;
            case 3:
            case 4:
              Qe = x.stateNode.containerInfo, Ct = !0;
              break e;
          }
          x = x.return;
        }
        if (Qe === null) throw Error(u(160));
        Ug(c, m, r), Qe = null, Ct = !1, c = r.alternate, c !== null && (c.return = null), r.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Yg(t, e), t = t.sibling;
  }
  var sn = null;
  function Yg(e, t) {
    var l = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        At(t, e), Tt(e), i & 4 && (yl(3, e, e.return), Wi(3, e), yl(5, e, e.return));
        break;
      case 1:
        At(t, e), Tt(e), i & 512 && (ot || l === null || wn(l, l.return)), i & 64 && Vn && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? i : l.concat(i))));
        break;
      case 26:
        var r = sn;
        if (At(t, e), Tt(e), i & 512 && (ot || l === null || wn(l, l.return)), i & 4) {
          var c = l !== null ? l.memoizedState : null;
          if (i = e.memoizedState, l === null)
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  i = e.type, l = e.memoizedProps, r = r.ownerDocument || r;
                  t: switch (i) {
                    case "title":
                      c = r.getElementsByTagName("title")[0], (!c || c[ql] || c[ct] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = r.createElement(i), r.head.insertBefore(
                        c,
                        r.querySelector("head > title")
                      )), mt(c, i, l), c[ct] = e, nt(c), i = c;
                      break e;
                    case "link":
                      var m = Ym(
                        "link",
                        "href",
                        r
                      ).get(i + (l.href || ""));
                      if (m) {
                        for (var x = 0; x < m.length; x++)
                          if (c = m[x], c.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && c.getAttribute("rel") === (l.rel == null ? null : l.rel) && c.getAttribute("title") === (l.title == null ? null : l.title) && c.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            m.splice(x, 1);
                            break t;
                          }
                      }
                      c = r.createElement(i), mt(c, i, l), r.head.appendChild(c);
                      break;
                    case "meta":
                      if (m = Ym(
                        "meta",
                        "content",
                        r
                      ).get(i + (l.content || ""))) {
                        for (x = 0; x < m.length; x++)
                          if (c = m[x], c.getAttribute("content") === (l.content == null ? null : "" + l.content) && c.getAttribute("name") === (l.name == null ? null : l.name) && c.getAttribute("property") === (l.property == null ? null : l.property) && c.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && c.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            m.splice(x, 1);
                            break t;
                          }
                      }
                      c = r.createElement(i), mt(c, i, l), r.head.appendChild(c);
                      break;
                    default:
                      throw Error(u(468, i));
                  }
                  c[ct] = e, nt(c), i = c;
                }
                e.stateNode = i;
              } else
                Lm(
                  r,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = jm(
                r,
                i,
                e.memoizedProps
              );
          else
            c !== i ? (c === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : c.count--, i === null ? Lm(
              r,
              e.type,
              e.stateNode
            ) : jm(
              r,
              i,
              e.memoizedProps
            )) : i === null && e.stateNode !== null && Ts(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        At(t, e), Tt(e), i & 512 && (ot || l === null || wn(l, l.return)), l !== null && i & 4 && Ts(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (At(t, e), Tt(e), i & 512 && (ot || l === null || wn(l, l.return)), e.flags & 32) {
          r = e.stateNode;
          try {
            wa(r, "");
          } catch (de) {
            qe(e, e.return, de);
          }
        }
        i & 4 && e.stateNode != null && (r = e.memoizedProps, Ts(
          e,
          r,
          l !== null ? l.memoizedProps : r
        )), i & 1024 && (Rs = !0);
        break;
      case 6:
        if (At(t, e), Tt(e), i & 4) {
          if (e.stateNode === null)
            throw Error(u(162));
          i = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = i;
          } catch (de) {
            qe(e, e.return, de);
          }
        }
        break;
      case 3:
        if (tr = null, r = sn, sn = Pu(t.containerInfo), At(t, e), sn = r, Tt(e), i & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            ei(t.containerInfo);
          } catch (de) {
            qe(e, e.return, de);
          }
        Rs && (Rs = !1, Lg(e));
        break;
      case 4:
        i = sn, sn = Pu(
          e.stateNode.containerInfo
        ), At(t, e), Tt(e), sn = i;
        break;
      case 12:
        At(t, e), Tt(e);
        break;
      case 31:
        At(t, e), Tt(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, ju(e, i)));
        break;
      case 13:
        At(t, e), Tt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Lu = Ie()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, ju(e, i)));
        break;
      case 22:
        r = e.memoizedState !== null;
        var D = l !== null && l.memoizedState !== null, Q = Vn, te = ot;
        if (Vn = Q || r, ot = te || D, At(t, e), ot = te, Vn = Q, Tt(e), i & 8192)
          e: for (t = e.stateNode, t._visibility = r ? t._visibility & -2 : t._visibility | 1, r && (l === null || D || Vn || ot || Pl(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                D = l = t;
                try {
                  if (c = D.stateNode, r)
                    m = c.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none";
                  else {
                    x = D.stateNode;
                    var ie = D.memoizedProps.style, K = ie != null && ie.hasOwnProperty("display") ? ie.display : null;
                    x.style.display = K == null || typeof K == "boolean" ? "" : ("" + K).trim();
                  }
                } catch (de) {
                  qe(D, D.return, de);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                D = t;
                try {
                  D.stateNode.nodeValue = r ? "" : D.memoizedProps;
                } catch (de) {
                  qe(D, D.return, de);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                D = t;
                try {
                  var W = D.stateNode;
                  r ? Tm(W, !0) : Tm(D.stateNode, !1);
                } catch (de) {
                  qe(D, D.return, de);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              l === t && (l = null), t = t.return;
            }
            l === t && (l = null), t.sibling.return = t.return, t = t.sibling;
          }
        i & 4 && (i = e.updateQueue, i !== null && (l = i.retryQueue, l !== null && (i.retryQueue = null, ju(e, l))));
        break;
      case 19:
        At(t, e), Tt(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, ju(e, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        At(t, e), Tt(e);
    }
  }
  function Tt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, i = e.return; i !== null; ) {
          if (Og(i)) {
            l = i;
            break;
          }
          i = i.return;
        }
        if (l == null) throw Error(u(160));
        switch (l.tag) {
          case 27:
            var r = l.stateNode, c = Ds(e);
            qu(e, c, r);
            break;
          case 5:
            var m = l.stateNode;
            l.flags & 32 && (wa(m, ""), l.flags &= -33);
            var x = Ds(e);
            qu(e, x, m);
            break;
          case 3:
          case 4:
            var D = l.stateNode.containerInfo, Q = Ds(e);
            Os(
              e,
              Q,
              D
            );
            break;
          default:
            throw Error(u(161));
        }
      } catch (te) {
        qe(e, e.return, te);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Lg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Lg(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function $n(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        kg(e, t.alternate, t), t = t.sibling;
  }
  function Pl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          yl(4, t, t.return), Pl(t);
          break;
        case 1:
          wn(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && Tg(
            t,
            t.return,
            l
          ), Pl(t);
          break;
        case 27:
          uo(t.stateNode);
        case 26:
        case 5:
          wn(t, t.return), Pl(t);
          break;
        case 22:
          t.memoizedState === null && Pl(t);
          break;
        case 30:
          Pl(t);
          break;
        default:
          Pl(t);
      }
      e = e.sibling;
    }
  }
  function Zn(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate, r = e, c = t, m = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Zn(
            r,
            c,
            l
          ), Wi(4, c);
          break;
        case 1:
          if (Zn(
            r,
            c,
            l
          ), i = c, r = i.stateNode, typeof r.componentDidMount == "function")
            try {
              r.componentDidMount();
            } catch (Q) {
              qe(i, i.return, Q);
            }
          if (i = c, r = i.updateQueue, r !== null) {
            var x = i.stateNode;
            try {
              var D = r.shared.hiddenCallbacks;
              if (D !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < D.length; r++)
                  vh(D[r], x);
            } catch (Q) {
              qe(i, i.return, Q);
            }
          }
          l && m & 64 && Ag(c), Ii(c, c.return);
          break;
        case 27:
          Rg(c);
        case 26:
        case 5:
          Zn(
            r,
            c,
            l
          ), l && i === null && m & 4 && Dg(c), Ii(c, c.return);
          break;
        case 12:
          Zn(
            r,
            c,
            l
          );
          break;
        case 31:
          Zn(
            r,
            c,
            l
          ), l && m & 4 && qg(r, c);
          break;
        case 13:
          Zn(
            r,
            c,
            l
          ), l && m & 4 && jg(r, c);
          break;
        case 22:
          c.memoizedState === null && Zn(
            r,
            c,
            l
          ), Ii(c, c.return);
          break;
        case 30:
          break;
        default:
          Zn(
            r,
            c,
            l
          );
      }
      t = t.sibling;
    }
  }
  function Hs(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && qi(l));
  }
  function ks(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && qi(e));
  }
  function fn(e, t, l, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Vg(
          e,
          t,
          l,
          i
        ), t = t.sibling;
  }
  function Vg(e, t, l, i) {
    var r = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        fn(
          e,
          t,
          l,
          i
        ), r & 2048 && Wi(9, t);
        break;
      case 1:
        fn(
          e,
          t,
          l,
          i
        );
        break;
      case 3:
        fn(
          e,
          t,
          l,
          i
        ), r & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && qi(e)));
        break;
      case 12:
        if (r & 2048) {
          fn(
            e,
            t,
            l,
            i
          ), e = t.stateNode;
          try {
            var c = t.memoizedProps, m = c.id, x = c.onPostCommit;
            typeof x == "function" && x(
              m,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (D) {
            qe(t, t.return, D);
          }
        } else
          fn(
            e,
            t,
            l,
            i
          );
        break;
      case 31:
        fn(
          e,
          t,
          l,
          i
        );
        break;
      case 13:
        fn(
          e,
          t,
          l,
          i
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, m = t.alternate, t.memoizedState !== null ? c._visibility & 2 ? fn(
          e,
          t,
          l,
          i
        ) : Pi(e, t) : c._visibility & 2 ? fn(
          e,
          t,
          l,
          i
        ) : (c._visibility |= 2, Xa(
          e,
          t,
          l,
          i,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), r & 2048 && Hs(m, t);
        break;
      case 24:
        fn(
          e,
          t,
          l,
          i
        ), r & 2048 && ks(t.alternate, t);
        break;
      default:
        fn(
          e,
          t,
          l,
          i
        );
    }
  }
  function Xa(e, t, l, i, r) {
    for (r = r && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, m = t, x = l, D = i, Q = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          Xa(
            c,
            m,
            x,
            D,
            r
          ), Wi(8, m);
          break;
        case 23:
          break;
        case 22:
          var te = m.stateNode;
          m.memoizedState !== null ? te._visibility & 2 ? Xa(
            c,
            m,
            x,
            D,
            r
          ) : Pi(
            c,
            m
          ) : (te._visibility |= 2, Xa(
            c,
            m,
            x,
            D,
            r
          )), r && Q & 2048 && Hs(
            m.alternate,
            m
          );
          break;
        case 24:
          Xa(
            c,
            m,
            x,
            D,
            r
          ), r && Q & 2048 && ks(m.alternate, m);
          break;
        default:
          Xa(
            c,
            m,
            x,
            D,
            r
          );
      }
      t = t.sibling;
    }
  }
  function Pi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, i = t, r = i.flags;
        switch (i.tag) {
          case 22:
            Pi(l, i), r & 2048 && Hs(
              i.alternate,
              i
            );
            break;
          case 24:
            Pi(l, i), r & 2048 && ks(i.alternate, i);
            break;
          default:
            Pi(l, i);
        }
        t = t.sibling;
      }
  }
  var eo = 8192;
  function $a(e, t, l) {
    if (e.subtreeFlags & eo)
      for (e = e.child; e !== null; )
        Xg(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function Xg(e, t, l) {
    switch (e.tag) {
      case 26:
        $a(
          e,
          t,
          l
        ), e.flags & eo && e.memoizedState !== null && q1(
          l,
          sn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        $a(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var i = sn;
        sn = Pu(e.stateNode.containerInfo), $a(
          e,
          t,
          l
        ), sn = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = eo, eo = 16777216, $a(
          e,
          t,
          l
        ), eo = i) : $a(
          e,
          t,
          l
        ));
        break;
      default:
        $a(
          e,
          t,
          l
        );
    }
  }
  function $g(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function to(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          ft = i, Gg(
            i,
            e
          );
        }
      $g(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Zg(e), e = e.sibling;
  }
  function Zg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        to(e), e.flags & 2048 && yl(9, e, e.return);
        break;
      case 3:
        to(e);
        break;
      case 12:
        to(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Yu(e)) : to(e);
        break;
      default:
        to(e);
    }
  }
  function Yu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          ft = i, Gg(
            i,
            e
          );
        }
      $g(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          yl(8, t, t.return), Yu(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, Yu(t));
          break;
        default:
          Yu(t);
      }
      e = e.sibling;
    }
  }
  function Gg(e, t) {
    for (; ft !== null; ) {
      var l = ft;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          yl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var i = l.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          qi(l.memoizedState.cache);
      }
      if (i = l.child, i !== null) i.return = l, ft = i;
      else
        e: for (l = e; ft !== null; ) {
          i = ft;
          var r = i.sibling, c = i.return;
          if (Bg(i), i === l) {
            ft = null;
            break e;
          }
          if (r !== null) {
            r.return = c, ft = r;
            break e;
          }
          ft = c;
        }
    }
  }
  var Pb = {
    getCacheForType: function(e) {
      var t = ht(lt), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return ht(lt).controller.signal;
    }
  }, e1 = typeof WeakMap == "function" ? WeakMap : Map, Be = 0, Xe = null, Ne = null, Ae = 0, Ue = 0, Lt = null, vl = !1, Za = !1, Bs = !1, Gn = 0, We = 0, bl = 0, ea = 0, Us = 0, Vt = 0, Ga = 0, no = null, Dt = null, qs = !1, Lu = 0, Qg = 0, Vu = 1 / 0, Xu = null, xl = null, st = 0, _l = null, Qa = null, Qn = 0, js = 0, Ys = null, Kg = null, lo = 0, Ls = null;
  function Xt() {
    return (Be & 2) !== 0 && Ae !== 0 ? Ae & -Ae : E.T !== null ? Qs() : Ko();
  }
  function Jg() {
    if (Vt === 0)
      if ((Ae & 536870912) === 0 || De) {
        var e = ma;
        ma <<= 1, (ma & 3932160) === 0 && (ma = 262144), Vt = e;
      } else Vt = 536870912;
    return e = jt.current, e !== null && (e.flags |= 32), Vt;
  }
  function Ot(e, t, l) {
    (e === Xe && (Ue === 2 || Ue === 9) || e.cancelPendingCommit !== null) && (Ka(e, 0), Sl(
      e,
      Ae,
      Vt,
      !1
    )), Ul(e, l), ((Be & 2) === 0 || e !== Xe) && (e === Xe && ((Be & 2) === 0 && (ea |= l), We === 4 && Sl(
      e,
      Ae,
      Vt,
      !1
    )), En(e));
  }
  function Fg(e, t, l) {
    if ((Be & 6) !== 0) throw Error(u(327));
    var i = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Bl(e, t), r = i ? l1(e, t) : Xs(e, t, !0), c = i;
    do {
      if (r === 0) {
        Za && !i && Sl(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, c && !t1(l)) {
          r = Xs(e, t, !1), c = !1;
          continue;
        }
        if (r === 2) {
          if (c = t, e.errorRecoveryDisabledLanes & c)
            var m = 0;
          else
            m = e.pendingLanes & -536870913, m = m !== 0 ? m : m & 536870912 ? 536870912 : 0;
          if (m !== 0) {
            t = m;
            e: {
              var x = e;
              r = no;
              var D = x.current.memoizedState.isDehydrated;
              if (D && (Ka(x, m).flags |= 256), m = Xs(
                x,
                m,
                !1
              ), m !== 2) {
                if (Bs && !D) {
                  x.errorRecoveryDisabledLanes |= c, ea |= c, r = 4;
                  break e;
                }
                c = Dt, Dt = r, c !== null && (Dt === null ? Dt = c : Dt.push.apply(
                  Dt,
                  c
                ));
              }
              r = m;
            }
            if (c = !1, r !== 2) continue;
          }
        }
        if (r === 1) {
          Ka(e, 0), Sl(e, t, 0, !0);
          break;
        }
        e: {
          switch (i = e, c = r, c) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Sl(
                i,
                t,
                Vt,
                !vl
              );
              break e;
            case 2:
              Dt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && (r = Lu + 300 - Ie(), 10 < r)) {
            if (Sl(
              i,
              t,
              Vt,
              !vl
            ), ya(i, 0, !0) !== 0) break e;
            Qn = t, i.timeoutHandle = Nm(
              Wg.bind(
                null,
                i,
                l,
                Dt,
                Xu,
                qs,
                t,
                Vt,
                ea,
                Ga,
                vl,
                c,
                "Throttled",
                -0,
                0
              ),
              r
            );
            break e;
          }
          Wg(
            i,
            l,
            Dt,
            Xu,
            qs,
            t,
            Vt,
            ea,
            Ga,
            vl,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    En(e);
  }
  function Wg(e, t, l, i, r, c, m, x, D, Q, te, ie, K, W) {
    if (e.timeoutHandle = -1, ie = t.subtreeFlags, ie & 8192 || (ie & 16785408) === 16785408) {
      ie = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: On
      }, Xg(
        t,
        c,
        ie
      );
      var de = (c & 62914560) === c ? Lu - Ie() : (c & 4194048) === c ? Qg - Ie() : 0;
      if (de = j1(
        ie,
        de
      ), de !== null) {
        Qn = c, e.cancelPendingCommit = de(
          im.bind(
            null,
            e,
            t,
            c,
            l,
            i,
            r,
            m,
            x,
            D,
            te,
            ie,
            null,
            K,
            W
          )
        ), Sl(e, c, m, !Q);
        return;
      }
    }
    im(
      e,
      t,
      c,
      l,
      i,
      r,
      m,
      x,
      D
    );
  }
  function t1(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var i = 0; i < l.length; i++) {
          var r = l[i], c = r.getSnapshot;
          r = r.value;
          try {
            if (!Ut(c(), r)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = t.child, t.subtreeFlags & 16384 && l !== null)
        l.return = t, t = l;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Sl(e, t, l, i) {
    t &= ~Us, t &= ~ea, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var r = t; 0 < r; ) {
      var c = 31 - _t(r), m = 1 << c;
      i[c] = -1, r &= ~m;
    }
    l !== 0 && Zo(e, l, t);
  }
  function $u() {
    return (Be & 6) === 0 ? (ao(0), !1) : !0;
  }
  function Vs() {
    if (Ne !== null) {
      if (Ue === 0)
        var e = Ne.return;
      else
        e = Ne, Bn = Zl = null, as(e), qa = null, Yi = 0, e = Ne;
      for (; e !== null; )
        Cg(e.alternate, e), e = e.return;
      Ne = null;
    }
  }
  function Ka(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, _1(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), Qn = 0, Vs(), Xe = e, Ne = l = Hn(e.current, null), Ae = t, Ue = 0, Lt = null, vl = !1, Za = Bl(e, t), Bs = !1, Ga = Vt = Us = ea = bl = We = 0, Dt = no = null, qs = !1, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var r = 31 - _t(i), c = 1 << r;
        t |= e[r], i &= ~c;
      }
    return Gn = t, fu(), l;
  }
  function Ig(e, t) {
    ze = null, E.H = Ki, t === Ua || t === bu ? (t = gh(), Ue = 3) : t === Gc ? (t = gh(), Ue = 4) : Ue = t === xs ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Lt = t, Ne === null && (We = 1, Ru(
      e,
      Pt(t, e.current)
    ));
  }
  function Pg() {
    var e = jt.current;
    return e === null ? !0 : (Ae & 4194048) === Ae ? ln === null : (Ae & 62914560) === Ae || (Ae & 536870912) !== 0 ? e === ln : !1;
  }
  function em() {
    var e = E.H;
    return E.H = Ki, e === null ? Ki : e;
  }
  function tm() {
    var e = E.A;
    return E.A = Pb, e;
  }
  function Zu() {
    We = 4, vl || (Ae & 4194048) !== Ae && jt.current !== null || (Za = !0), (bl & 134217727) === 0 && (ea & 134217727) === 0 || Xe === null || Sl(
      Xe,
      Ae,
      Vt,
      !1
    );
  }
  function Xs(e, t, l) {
    var i = Be;
    Be |= 2;
    var r = em(), c = tm();
    (Xe !== e || Ae !== t) && (Xu = null, Ka(e, t)), t = !1;
    var m = We;
    e: do
      try {
        if (Ue !== 0 && Ne !== null) {
          var x = Ne, D = Lt;
          switch (Ue) {
            case 8:
              Vs(), m = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              jt.current === null && (t = !0);
              var Q = Ue;
              if (Ue = 0, Lt = null, Ja(e, x, D, Q), l && Za) {
                m = 0;
                break e;
              }
              break;
            default:
              Q = Ue, Ue = 0, Lt = null, Ja(e, x, D, Q);
          }
        }
        n1(), m = We;
        break;
      } catch (te) {
        Ig(e, te);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Bn = Zl = null, Be = i, E.H = r, E.A = c, Ne === null && (Xe = null, Ae = 0, fu()), m;
  }
  function n1() {
    for (; Ne !== null; ) nm(Ne);
  }
  function l1(e, t) {
    var l = Be;
    Be |= 2;
    var i = em(), r = tm();
    Xe !== e || Ae !== t ? (Xu = null, Vu = Ie() + 500, Ka(e, t)) : Za = Bl(
      e,
      t
    );
    e: do
      try {
        if (Ue !== 0 && Ne !== null) {
          t = Ne;
          var c = Lt;
          t: switch (Ue) {
            case 1:
              Ue = 0, Lt = null, Ja(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (dh(c)) {
                Ue = 0, Lt = null, lm(t);
                break;
              }
              t = function() {
                Ue !== 2 && Ue !== 9 || Xe !== e || (Ue = 7), En(e);
              }, c.then(t, t);
              break e;
            case 3:
              Ue = 7;
              break e;
            case 4:
              Ue = 5;
              break e;
            case 7:
              dh(c) ? (Ue = 0, Lt = null, lm(t)) : (Ue = 0, Lt = null, Ja(e, t, c, 7));
              break;
            case 5:
              var m = null;
              switch (Ne.tag) {
                case 26:
                  m = Ne.memoizedState;
                case 5:
                case 27:
                  var x = Ne;
                  if (m ? Vm(m) : x.stateNode.complete) {
                    Ue = 0, Lt = null;
                    var D = x.sibling;
                    if (D !== null) Ne = D;
                    else {
                      var Q = x.return;
                      Q !== null ? (Ne = Q, Gu(Q)) : Ne = null;
                    }
                    break t;
                  }
              }
              Ue = 0, Lt = null, Ja(e, t, c, 5);
              break;
            case 6:
              Ue = 0, Lt = null, Ja(e, t, c, 6);
              break;
            case 8:
              Vs(), We = 6;
              break e;
            default:
              throw Error(u(462));
          }
        }
        a1();
        break;
      } catch (te) {
        Ig(e, te);
      }
    while (!0);
    return Bn = Zl = null, E.H = i, E.A = r, Be = l, Ne !== null ? 0 : (Xe = null, Ae = 0, fu(), We);
  }
  function a1() {
    for (; Ne !== null && !Hl(); )
      nm(Ne);
  }
  function nm(e) {
    var t = Mg(e.alternate, e, Gn);
    e.memoizedProps = e.pendingProps, t === null ? Gu(e) : Ne = t;
  }
  function lm(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = xg(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ae
        );
        break;
      case 11:
        t = xg(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ae
        );
        break;
      case 5:
        as(t);
      default:
        Cg(l, t), t = Ne = th(t, Gn), t = Mg(l, t, Gn);
    }
    e.memoizedProps = e.pendingProps, t === null ? Gu(e) : Ne = t;
  }
  function Ja(e, t, l, i) {
    Bn = Zl = null, as(t), qa = null, Yi = 0;
    var r = t.return;
    try {
      if (Gb(
        e,
        r,
        t,
        l,
        Ae
      )) {
        We = 1, Ru(
          e,
          Pt(l, e.current)
        ), Ne = null;
        return;
      }
    } catch (c) {
      if (r !== null) throw Ne = r, c;
      We = 1, Ru(
        e,
        Pt(l, e.current)
      ), Ne = null;
      return;
    }
    t.flags & 32768 ? (De || i === 1 ? e = !0 : Za || (Ae & 536870912) !== 0 ? e = !1 : (vl = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = jt.current, i !== null && i.tag === 13 && (i.flags |= 16384))), am(t, e)) : Gu(t);
  }
  function Gu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        am(
          t,
          vl
        );
        return;
      }
      e = t.return;
      var l = Jb(
        t.alternate,
        t,
        Gn
      );
      if (l !== null) {
        Ne = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        Ne = t;
        return;
      }
      Ne = t = e;
    } while (t !== null);
    We === 0 && (We = 5);
  }
  function am(e, t) {
    do {
      var l = Fb(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, Ne = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        Ne = e;
        return;
      }
      Ne = e = l;
    } while (e !== null);
    We = 6, Ne = null;
  }
  function im(e, t, l, i, r, c, m, x, D) {
    e.cancelPendingCommit = null;
    do
      Qu();
    while (st !== 0);
    if ((Be & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (c = t.lanes | t.childLanes, c |= Dc, rc(
        e,
        l,
        c,
        m,
        x,
        D
      ), e === Xe && (Ne = Xe = null, Ae = 0), Qa = t, _l = e, Qn = l, js = c, Ys = r, Kg = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, r1(Wt, function() {
        return sm(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = E.T, E.T = null, r = O.p, O.p = 2, m = Be, Be |= 4;
        try {
          Wb(e, t, l);
        } finally {
          Be = m, O.p = r, E.T = i;
        }
      }
      st = 1, om(), um(), rm();
    }
  }
  function om() {
    if (st === 1) {
      st = 0;
      var e = _l, t = Qa, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = E.T, E.T = null;
        var i = O.p;
        O.p = 2;
        var r = Be;
        Be |= 4;
        try {
          Yg(t, e);
          var c = tf, m = Gd(e.containerInfo), x = c.focusedElem, D = c.selectionRange;
          if (m !== x && x && x.ownerDocument && Zd(
            x.ownerDocument.documentElement,
            x
          )) {
            if (D !== null && Mc(x)) {
              var Q = D.start, te = D.end;
              if (te === void 0 && (te = Q), "selectionStart" in x)
                x.selectionStart = Q, x.selectionEnd = Math.min(
                  te,
                  x.value.length
                );
              else {
                var ie = x.ownerDocument || document, K = ie && ie.defaultView || window;
                if (K.getSelection) {
                  var W = K.getSelection(), de = x.textContent.length, ve = Math.min(D.start, de), Le = D.end === void 0 ? ve : Math.min(D.end, de);
                  !W.extend && ve > Le && (m = Le, Le = ve, ve = m);
                  var Y = $d(
                    x,
                    ve
                  ), k = $d(
                    x,
                    Le
                  );
                  if (Y && k && (W.rangeCount !== 1 || W.anchorNode !== Y.node || W.anchorOffset !== Y.offset || W.focusNode !== k.node || W.focusOffset !== k.offset)) {
                    var G = ie.createRange();
                    G.setStart(Y.node, Y.offset), W.removeAllRanges(), ve > Le ? (W.addRange(G), W.extend(k.node, k.offset)) : (G.setEnd(k.node, k.offset), W.addRange(G));
                  }
                }
              }
            }
            for (ie = [], W = x; W = W.parentNode; )
              W.nodeType === 1 && ie.push({
                element: W,
                left: W.scrollLeft,
                top: W.scrollTop
              });
            for (typeof x.focus == "function" && x.focus(), x = 0; x < ie.length; x++) {
              var ae = ie[x];
              ae.element.scrollLeft = ae.left, ae.element.scrollTop = ae.top;
            }
          }
          ir = !!ef, tf = ef = null;
        } finally {
          Be = r, O.p = i, E.T = l;
        }
      }
      e.current = t, st = 2;
    }
  }
  function um() {
    if (st === 2) {
      st = 0;
      var e = _l, t = Qa, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = E.T, E.T = null;
        var i = O.p;
        O.p = 2;
        var r = Be;
        Be |= 4;
        try {
          kg(e, t.alternate, t);
        } finally {
          Be = r, O.p = i, E.T = l;
        }
      }
      st = 3;
    }
  }
  function rm() {
    if (st === 4 || st === 3) {
      st = 0, Cn();
      var e = _l, t = Qa, l = Qn, i = Kg;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? st = 5 : (st = 0, Qa = _l = null, cm(e, e.pendingLanes));
      var r = e.pendingLanes;
      if (r === 0 && (xl = null), bi(l), t = t.stateNode, xt && typeof xt.onCommitFiberRoot == "function")
        try {
          xt.onCommitFiberRoot(
            kl,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        t = E.T, r = O.p, O.p = 2, E.T = null;
        try {
          for (var c = e.onRecoverableError, m = 0; m < i.length; m++) {
            var x = i[m];
            c(x.value, {
              componentStack: x.stack
            });
          }
        } finally {
          E.T = t, O.p = r;
        }
      }
      (Qn & 3) !== 0 && Qu(), En(e), r = e.pendingLanes, (l & 261930) !== 0 && (r & 42) !== 0 ? e === Ls ? lo++ : (lo = 0, Ls = e) : lo = 0, ao(0);
    }
  }
  function cm(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, qi(t)));
  }
  function Qu() {
    return om(), um(), rm(), sm();
  }
  function sm() {
    if (st !== 5) return !1;
    var e = _l, t = js;
    js = 0;
    var l = bi(Qn), i = E.T, r = O.p;
    try {
      O.p = 32 > l ? 32 : l, E.T = null, l = Ys, Ys = null;
      var c = _l, m = Qn;
      if (st = 0, Qa = _l = null, Qn = 0, (Be & 6) !== 0) throw Error(u(331));
      var x = Be;
      if (Be |= 4, Zg(c.current), Vg(
        c,
        c.current,
        m,
        l
      ), Be = x, ao(0, !1), xt && typeof xt.onPostCommitFiberRoot == "function")
        try {
          xt.onPostCommitFiberRoot(kl, c);
        } catch {
        }
      return !0;
    } finally {
      O.p = r, E.T = i, cm(e, t);
    }
  }
  function fm(e, t, l) {
    t = Pt(l, t), t = bs(e.stateNode, t, 2), e = gl(e, t, 2), e !== null && (Ul(e, 2), En(e));
  }
  function qe(e, t, l) {
    if (e.tag === 3)
      fm(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          fm(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (xl === null || !xl.has(i))) {
            e = Pt(l, e), l = dg(2), i = gl(t, l, 2), i !== null && (hg(
              l,
              i,
              t,
              e
            ), Ul(i, 2), En(i));
            break;
          }
        }
        t = t.return;
      }
  }
  function $s(e, t, l) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new e1();
      var r = /* @__PURE__ */ new Set();
      i.set(t, r);
    } else
      r = i.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), i.set(t, r));
    r.has(l) || (Bs = !0, r.add(l), e = i1.bind(null, e, t, l), t.then(e, e));
  }
  function i1(e, t, l) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Xe === e && (Ae & l) === l && (We === 4 || We === 3 && (Ae & 62914560) === Ae && 300 > Ie() - Lu ? (Be & 2) === 0 && Ka(e, 0) : Us |= l, Ga === Ae && (Ga = 0)), En(e);
  }
  function dm(e, t) {
    t === 0 && (t = $o()), e = Vl(e, t), e !== null && (Ul(e, t), En(e));
  }
  function o1(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), dm(e, l);
  }
  function u1(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode, r = e.memoizedState;
        r !== null && (l = r.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    i !== null && i.delete(t), dm(e, l);
  }
  function r1(e, t) {
    return Et(e, t);
  }
  var Ku = null, Fa = null, Zs = !1, Ju = !1, Gs = !1, wl = 0;
  function En(e) {
    e !== Fa && e.next === null && (Fa === null ? Ku = Fa = e : Fa = Fa.next = e), Ju = !0, Zs || (Zs = !0, s1());
  }
  function ao(e, t) {
    if (!Gs && Ju) {
      Gs = !0;
      do
        for (var l = !1, i = Ku; i !== null; ) {
          if (e !== 0) {
            var r = i.pendingLanes;
            if (r === 0) var c = 0;
            else {
              var m = i.suspendedLanes, x = i.pingedLanes;
              c = (1 << 31 - _t(42 | e) + 1) - 1, c &= r & ~(m & ~x), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (l = !0, pm(i, c));
          } else
            c = Ae, c = ya(
              i,
              i === Xe ? c : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (c & 3) === 0 || Bl(i, c) || (l = !0, pm(i, c));
          i = i.next;
        }
      while (l);
      Gs = !1;
    }
  }
  function c1() {
    hm();
  }
  function hm() {
    Ju = Zs = !1;
    var e = 0;
    wl !== 0 && x1() && (e = wl);
    for (var t = Ie(), l = null, i = Ku; i !== null; ) {
      var r = i.next, c = gm(i, t);
      c === 0 ? (i.next = null, l === null ? Ku = r : l.next = r, r === null && (Fa = l)) : (l = i, (e !== 0 || (c & 3) !== 0) && (Ju = !0)), i = r;
    }
    st !== 0 && st !== 5 || ao(e), wl !== 0 && (wl = 0);
  }
  function gm(e, t) {
    for (var l = e.suspendedLanes, i = e.pingedLanes, r = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var m = 31 - _t(c), x = 1 << m, D = r[m];
      D === -1 ? ((x & l) === 0 || (x & i) !== 0) && (r[m] = uc(x, t)) : D <= t && (e.expiredLanes |= x), c &= ~x;
    }
    if (t = Xe, l = Ae, l = ya(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, l === 0 || e === t && (Ue === 2 || Ue === 9) || e.cancelPendingCommit !== null)
      return i !== null && i !== null && kt(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Bl(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (i !== null && kt(i), bi(l)) {
        case 2:
        case 8:
          l = Ft;
          break;
        case 32:
          l = Wt;
          break;
        case 268435456:
          l = ha;
          break;
        default:
          l = Wt;
      }
      return i = mm.bind(null, e), l = Et(l, i), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return i !== null && i !== null && kt(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function mm(e, t) {
    if (st !== 0 && st !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (Qu() && e.callbackNode !== l)
      return null;
    var i = Ae;
    return i = ya(
      e,
      e === Xe ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (Fg(e, i, t), gm(e, Ie()), e.callbackNode != null && e.callbackNode === l ? mm.bind(null, e) : null);
  }
  function pm(e, t) {
    if (Qu()) return null;
    Fg(e, t, !0);
  }
  function s1() {
    S1(function() {
      (Be & 6) !== 0 ? Et(
        Jt,
        c1
      ) : hm();
    });
  }
  function Qs() {
    if (wl === 0) {
      var e = ka;
      e === 0 && (e = ga, ga <<= 1, (ga & 261888) === 0 && (ga = 256)), wl = e;
    }
    return wl;
  }
  function ym(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : lu("" + e);
  }
  function vm(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function f1(e, t, l, i, r) {
    if (t === "submit" && l && l.stateNode === r) {
      var c = ym(
        (r[yt] || null).action
      ), m = i.submitter;
      m && (t = (t = m[yt] || null) ? ym(t.formAction) : m.getAttribute("formAction"), t !== null && (c = t, m = null));
      var x = new uu(
        "action",
        "action",
        null,
        i,
        r
      );
      e.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (wl !== 0) {
                  var D = m ? vm(r, m) : new FormData(r);
                  hs(
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
                typeof c == "function" && (x.preventDefault(), D = m ? vm(r, m) : new FormData(r), hs(
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
  for (var Ks = 0; Ks < Tc.length; Ks++) {
    var Js = Tc[Ks], d1 = Js.toLowerCase(), h1 = Js[0].toUpperCase() + Js.slice(1);
    cn(
      d1,
      "on" + h1
    );
  }
  cn(Jd, "onAnimationEnd"), cn(Fd, "onAnimationIteration"), cn(Wd, "onAnimationStart"), cn("dblclick", "onDoubleClick"), cn("focusin", "onFocus"), cn("focusout", "onBlur"), cn(Ab, "onTransitionRun"), cn(Tb, "onTransitionStart"), cn(Db, "onTransitionCancel"), cn(Id, "onTransitionEnd"), il("onMouseEnter", ["mouseout", "mouseover"]), il("onMouseLeave", ["mouseout", "mouseover"]), il("onPointerEnter", ["pointerout", "pointerover"]), il("onPointerLeave", ["pointerout", "pointerover"]), Dn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Dn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Dn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Dn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Dn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Dn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var io = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), g1 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(io)
  );
  function bm(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var i = e[l], r = i.event;
      i = i.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var m = i.length - 1; 0 <= m; m--) {
            var x = i[m], D = x.instance, Q = x.currentTarget;
            if (x = x.listener, D !== c && r.isPropagationStopped())
              break e;
            c = x, r.currentTarget = Q;
            try {
              c(r);
            } catch (te) {
              su(te);
            }
            r.currentTarget = null, c = D;
          }
        else
          for (m = 0; m < i.length; m++) {
            if (x = i[m], D = x.instance, Q = x.currentTarget, x = x.listener, D !== c && r.isPropagationStopped())
              break e;
            c = x, r.currentTarget = Q;
            try {
              c(r);
            } catch (te) {
              su(te);
            }
            r.currentTarget = null, c = D;
          }
      }
    }
  }
  function Ce(e, t) {
    var l = t[va];
    l === void 0 && (l = t[va] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    l.has(i) || (xm(t, e, 2, !1), l.add(i));
  }
  function Fs(e, t, l) {
    var i = 0;
    t && (i |= 4), xm(
      l,
      e,
      i,
      t
    );
  }
  var Fu = "_reactListening" + Math.random().toString(36).slice(2);
  function Ws(e) {
    if (!e[Fu]) {
      e[Fu] = !0, Io.forEach(function(l) {
        l !== "selectionchange" && (g1.has(l) || Fs(l, !1, e), Fs(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Fu] || (t[Fu] = !0, Fs("selectionchange", !1, t));
    }
  }
  function xm(e, t, l, i) {
    switch (Jm(t)) {
      case 2:
        var r = V1;
        break;
      case 8:
        r = X1;
        break;
      default:
        r = hf;
    }
    l = r.bind(
      null,
      t,
      l,
      e
    ), r = void 0, !yc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (r = !0), i ? r !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: r
    }) : e.addEventListener(t, l, !0) : r !== void 0 ? e.addEventListener(t, l, {
      passive: r
    }) : e.addEventListener(t, l, !1);
  }
  function Is(e, t, l, i, r) {
    var c = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (; ; ) {
        if (i === null) return;
        var m = i.tag;
        if (m === 3 || m === 4) {
          var x = i.stateNode.containerInfo;
          if (x === r) break;
          if (m === 4)
            for (m = i.return; m !== null; ) {
              var D = m.tag;
              if ((D === 3 || D === 4) && m.stateNode.containerInfo === r)
                return;
              m = m.return;
            }
          for (; x !== null; ) {
            if (m = tl(x), m === null) return;
            if (D = m.tag, D === 5 || D === 6 || D === 26 || D === 27) {
              i = c = m;
              continue e;
            }
            x = x.parentNode;
          }
        }
        i = i.return;
      }
    zd(function() {
      var Q = c, te = mc(l), ie = [];
      e: {
        var K = Pd.get(e);
        if (K !== void 0) {
          var W = uu, de = e;
          switch (e) {
            case "keypress":
              if (iu(l) === 0) break e;
            case "keydown":
            case "keyup":
              W = ub;
              break;
            case "focusin":
              de = "focus", W = _c;
              break;
            case "focusout":
              de = "blur", W = _c;
              break;
            case "beforeblur":
            case "afterblur":
              W = _c;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              W = Cd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              W = Jv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              W = sb;
              break;
            case Jd:
            case Fd:
            case Wd:
              W = Iv;
              break;
            case Id:
              W = db;
              break;
            case "scroll":
            case "scrollend":
              W = Qv;
              break;
            case "wheel":
              W = gb;
              break;
            case "copy":
            case "cut":
            case "paste":
              W = eb;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              W = Td;
              break;
            case "toggle":
            case "beforetoggle":
              W = pb;
          }
          var ve = (t & 4) !== 0, Le = !ve && (e === "scroll" || e === "scrollend"), Y = ve ? K !== null ? K + "Capture" : null : K;
          ve = [];
          for (var k = Q, G; k !== null; ) {
            var ae = k;
            if (G = ae.stateNode, ae = ae.tag, ae !== 5 && ae !== 26 && ae !== 27 || G === null || Y === null || (ae = Ni(k, Y), ae != null && ve.push(
              oo(k, ae, G)
            )), Le) break;
            k = k.return;
          }
          0 < ve.length && (K = new W(
            K,
            de,
            null,
            l,
            te
          ), ie.push({ event: K, listeners: ve }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (K = e === "mouseover" || e === "pointerover", W = e === "mouseout" || e === "pointerout", K && l !== gc && (de = l.relatedTarget || l.fromElement) && (tl(de) || de[Tn]))
            break e;
          if ((W || K) && (K = te.window === te ? te : (K = te.ownerDocument) ? K.defaultView || K.parentWindow : window, W ? (de = l.relatedTarget || l.toElement, W = Q, de = de ? tl(de) : null, de !== null && (Le = f(de), ve = de.tag, de !== Le || ve !== 5 && ve !== 27 && ve !== 6) && (de = null)) : (W = null, de = Q), W !== de)) {
            if (ve = Cd, ae = "onMouseLeave", Y = "onMouseEnter", k = "mouse", (e === "pointerout" || e === "pointerover") && (ve = Td, ae = "onPointerLeave", Y = "onPointerEnter", k = "pointer"), Le = W == null ? K : ll(W), G = de == null ? K : ll(de), K = new ve(
              ae,
              k + "leave",
              W,
              l,
              te
            ), K.target = Le, K.relatedTarget = G, ae = null, tl(te) === Q && (ve = new ve(
              Y,
              k + "enter",
              de,
              l,
              te
            ), ve.target = G, ve.relatedTarget = Le, ae = ve), Le = ae, W && de)
              t: {
                for (ve = m1, Y = W, k = de, G = 0, ae = Y; ae; ae = ve(ae))
                  G++;
                ae = 0;
                for (var pe = k; pe; pe = ve(pe))
                  ae++;
                for (; 0 < G - ae; )
                  Y = ve(Y), G--;
                for (; 0 < ae - G; )
                  k = ve(k), ae--;
                for (; G--; ) {
                  if (Y === k || k !== null && Y === k.alternate) {
                    ve = Y;
                    break t;
                  }
                  Y = ve(Y), k = ve(k);
                }
                ve = null;
              }
            else ve = null;
            W !== null && _m(
              ie,
              K,
              W,
              ve,
              !1
            ), de !== null && Le !== null && _m(
              ie,
              Le,
              de,
              ve,
              !0
            );
          }
        }
        e: {
          if (K = Q ? ll(Q) : window, W = K.nodeName && K.nodeName.toLowerCase(), W === "select" || W === "input" && K.type === "file")
            var He = qd;
          else if (Bd(K))
            if (jd)
              He = Mb;
            else {
              He = Eb;
              var he = wb;
            }
          else
            W = K.nodeName, !W || W.toLowerCase() !== "input" || K.type !== "checkbox" && K.type !== "radio" ? Q && hc(Q.elementType) && (He = qd) : He = zb;
          if (He && (He = He(e, Q))) {
            Ud(
              ie,
              He,
              l,
              te
            );
            break e;
          }
          he && he(e, K, Q), e === "focusout" && Q && K.type === "number" && Q.memoizedProps.value != null && zi(K, "number", K.value);
        }
        switch (he = Q ? ll(Q) : window, e) {
          case "focusin":
            (Bd(he) || he.contentEditable === "true") && (Na = he, Nc = Q, ki = null);
            break;
          case "focusout":
            ki = Nc = Na = null;
            break;
          case "mousedown":
            Cc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Cc = !1, Qd(ie, l, te);
            break;
          case "selectionchange":
            if (Cb) break;
          case "keydown":
          case "keyup":
            Qd(ie, l, te);
        }
        var Me;
        if (wc)
          e: {
            switch (e) {
              case "compositionstart":
                var Te = "onCompositionStart";
                break e;
              case "compositionend":
                Te = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Te = "onCompositionUpdate";
                break e;
            }
            Te = void 0;
          }
        else
          Ma ? Hd(e, l) && (Te = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (Te = "onCompositionStart");
        Te && (Dd && l.locale !== "ko" && (Ma || Te !== "onCompositionStart" ? Te === "onCompositionEnd" && Ma && (Me = Md()) : (ul = te, vc = "value" in ul ? ul.value : ul.textContent, Ma = !0)), he = Wu(Q, Te), 0 < he.length && (Te = new Ad(
          Te,
          e,
          null,
          l,
          te
        ), ie.push({ event: Te, listeners: he }), Me ? Te.data = Me : (Me = kd(l), Me !== null && (Te.data = Me)))), (Me = vb ? bb(e, l) : xb(e, l)) && (Te = Wu(Q, "onBeforeInput"), 0 < Te.length && (he = new Ad(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          te
        ), ie.push({
          event: he,
          listeners: Te
        }), he.data = Me)), f1(
          ie,
          e,
          Q,
          l,
          te
        );
      }
      bm(ie, t);
    });
  }
  function oo(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function Wu(e, t) {
    for (var l = t + "Capture", i = []; e !== null; ) {
      var r = e, c = r.stateNode;
      if (r = r.tag, r !== 5 && r !== 26 && r !== 27 || c === null || (r = Ni(e, l), r != null && i.unshift(
        oo(e, r, c)
      ), r = Ni(e, t), r != null && i.push(
        oo(e, r, c)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function m1(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function _m(e, t, l, i, r) {
    for (var c = t._reactName, m = []; l !== null && l !== i; ) {
      var x = l, D = x.alternate, Q = x.stateNode;
      if (x = x.tag, D !== null && D === i) break;
      x !== 5 && x !== 26 && x !== 27 || Q === null || (D = Q, r ? (Q = Ni(l, c), Q != null && m.unshift(
        oo(l, Q, D)
      )) : r || (Q = Ni(l, c), Q != null && m.push(
        oo(l, Q, D)
      ))), l = l.return;
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var p1 = /\r\n?/g, y1 = /\u0000|\uFFFD/g;
  function Sm(e) {
    return (typeof e == "string" ? e : "" + e).replace(p1, `
`).replace(y1, "");
  }
  function wm(e, t) {
    return t = Sm(t), Sm(e) === t;
  }
  function Ye(e, t, l, i, r, c) {
    switch (l) {
      case "children":
        typeof i == "string" ? t === "body" || t === "textarea" && i === "" || wa(e, i) : (typeof i == "number" || typeof i == "bigint") && t !== "body" && wa(e, "" + i);
        break;
      case "className":
        xa(e, "class", i);
        break;
      case "tabIndex":
        xa(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        xa(e, l, i);
        break;
      case "style":
        wd(e, i, c);
        break;
      case "data":
        if (t !== "object") {
          xa(e, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(l);
          break;
        }
        i = lu("" + i), e.setAttribute(l, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" && (l === "formAction" ? (t !== "input" && Ye(e, t, "name", r.name, r, null), Ye(
            e,
            t,
            "formEncType",
            r.formEncType,
            r,
            null
          ), Ye(
            e,
            t,
            "formMethod",
            r.formMethod,
            r,
            null
          ), Ye(
            e,
            t,
            "formTarget",
            r.formTarget,
            r,
            null
          )) : (Ye(e, t, "encType", r.encType, r, null), Ye(e, t, "method", r.method, r, null), Ye(e, t, "target", r.target, r, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(l);
          break;
        }
        i = lu("" + i), e.setAttribute(l, i);
        break;
      case "onClick":
        i != null && (e.onclick = On);
        break;
      case "onScroll":
        i != null && Ce("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Ce("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(u(61));
          if (l = i.__html, l != null) {
            if (r.children != null) throw Error(u(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        e.muted = i && typeof i != "function" && typeof i != "symbol";
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
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        l = lu("" + i), e.setAttributeNS(
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
        i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(l, "" + i) : e.removeAttribute(l);
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
        i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        i === !0 ? e.setAttribute(l, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(l, i) : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? e.setAttribute(l, i) : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(l) : e.setAttribute(l, i);
        break;
      case "popover":
        Ce("beforetoggle", e), Ce("toggle", e), ba(e, "popover", i);
        break;
      case "xlinkActuate":
        rn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        rn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        rn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        rn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        rn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        rn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        rn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        rn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        rn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        ba(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = Zv.get(l) || l, ba(e, l, i));
    }
  }
  function Ps(e, t, l, i, r, c) {
    switch (l) {
      case "style":
        wd(e, i, c);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(u(61));
          if (l = i.__html, l != null) {
            if (r.children != null) throw Error(u(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof i == "string" ? wa(e, i) : (typeof i == "number" || typeof i == "bigint") && wa(e, "" + i);
        break;
      case "onScroll":
        i != null && Ce("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Ce("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = On);
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
        if (!Po.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (r = l.endsWith("Capture"), t = l.slice(2, r ? l.length - 7 : void 0), c = e[yt] || null, c = c != null ? c[l] : null, typeof c == "function" && e.removeEventListener(t, c, r), typeof i == "function")) {
              typeof c != "function" && c !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, i, r);
              break e;
            }
            l in e ? e[l] = i : i === !0 ? e.setAttribute(l, "") : ba(e, l, i);
          }
    }
  }
  function mt(e, t, l) {
    switch (t) {
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
        Ce("error", e), Ce("load", e);
        var i = !1, r = !1, c;
        for (c in l)
          if (l.hasOwnProperty(c)) {
            var m = l[c];
            if (m != null)
              switch (c) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  r = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(u(137, t));
                default:
                  Ye(e, t, c, m, l, null);
              }
          }
        r && Ye(e, t, "srcSet", l.srcSet, l, null), i && Ye(e, t, "src", l.src, l, null);
        return;
      case "input":
        Ce("invalid", e);
        var x = c = m = r = null, D = null, Q = null;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var te = l[i];
            if (te != null)
              switch (i) {
                case "name":
                  r = te;
                  break;
                case "type":
                  m = te;
                  break;
                case "checked":
                  D = te;
                  break;
                case "defaultChecked":
                  Q = te;
                  break;
                case "value":
                  c = te;
                  break;
                case "defaultValue":
                  x = te;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (te != null)
                    throw Error(u(137, t));
                  break;
                default:
                  Ye(e, t, i, te, l, null);
              }
          }
        Sa(
          e,
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
        Ce("invalid", e), i = m = c = null;
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
                i = x;
              default:
                Ye(e, t, r, x, l, null);
            }
        t = c, l = m, e.multiple = !!i, t != null ? ol(e, !!i, t, !1) : l != null && ol(e, !!i, l, !0);
        return;
      case "textarea":
        Ce("invalid", e), c = r = i = null;
        for (m in l)
          if (l.hasOwnProperty(m) && (x = l[m], x != null))
            switch (m) {
              case "value":
                i = x;
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
                Ye(e, t, m, x, l, null);
            }
        _d(e, i, r, c);
        return;
      case "option":
        for (D in l)
          l.hasOwnProperty(D) && (i = l[D], i != null) && (D === "selected" ? e.selected = i && typeof i != "function" && typeof i != "symbol" : Ye(e, t, D, i, l, null));
        return;
      case "dialog":
        Ce("beforetoggle", e), Ce("toggle", e), Ce("cancel", e), Ce("close", e);
        break;
      case "iframe":
      case "object":
        Ce("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < io.length; i++)
          Ce(io[i], e);
        break;
      case "image":
        Ce("error", e), Ce("load", e);
        break;
      case "details":
        Ce("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ce("error", e), Ce("load", e);
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
          if (l.hasOwnProperty(Q) && (i = l[Q], i != null))
            switch (Q) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                Ye(e, t, Q, i, l, null);
            }
        return;
      default:
        if (hc(t)) {
          for (te in l)
            l.hasOwnProperty(te) && (i = l[te], i !== void 0 && Ps(
              e,
              t,
              te,
              i,
              l,
              void 0
            ));
          return;
        }
    }
    for (x in l)
      l.hasOwnProperty(x) && (i = l[x], i != null && Ye(e, t, x, i, l, null));
  }
  function v1(e, t, l, i) {
    switch (t) {
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
        var r = null, c = null, m = null, x = null, D = null, Q = null, te = null;
        for (W in l) {
          var ie = l[W];
          if (l.hasOwnProperty(W) && ie != null)
            switch (W) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                D = ie;
              default:
                i.hasOwnProperty(W) || Ye(e, t, W, null, i, ie);
            }
        }
        for (var K in i) {
          var W = i[K];
          if (ie = l[K], i.hasOwnProperty(K) && (W != null || ie != null))
            switch (K) {
              case "type":
                c = W;
                break;
              case "name":
                r = W;
                break;
              case "checked":
                Q = W;
                break;
              case "defaultChecked":
                te = W;
                break;
              case "value":
                m = W;
                break;
              case "defaultValue":
                x = W;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (W != null)
                  throw Error(u(137, t));
                break;
              default:
                W !== ie && Ye(
                  e,
                  t,
                  K,
                  W,
                  i,
                  ie
                );
            }
        }
        Ei(
          e,
          m,
          x,
          D,
          Q,
          te,
          c,
          r
        );
        return;
      case "select":
        W = m = x = K = null;
        for (c in l)
          if (D = l[c], l.hasOwnProperty(c) && D != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                W = D;
              default:
                i.hasOwnProperty(c) || Ye(
                  e,
                  t,
                  c,
                  null,
                  i,
                  D
                );
            }
        for (r in i)
          if (c = i[r], D = l[r], i.hasOwnProperty(r) && (c != null || D != null))
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
                c !== D && Ye(
                  e,
                  t,
                  r,
                  c,
                  i,
                  D
                );
            }
        t = x, l = m, i = W, K != null ? ol(e, !!l, K, !1) : !!i != !!l && (t != null ? ol(e, !!l, t, !0) : ol(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        W = K = null;
        for (x in l)
          if (r = l[x], l.hasOwnProperty(x) && r != null && !i.hasOwnProperty(x))
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ye(e, t, x, null, i, r);
            }
        for (m in i)
          if (r = i[m], c = l[m], i.hasOwnProperty(m) && (r != null || c != null))
            switch (m) {
              case "value":
                K = r;
                break;
              case "defaultValue":
                W = r;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(u(91));
                break;
              default:
                r !== c && Ye(e, t, m, r, i, c);
            }
        Mi(e, K, W);
        return;
      case "option":
        for (var de in l)
          K = l[de], l.hasOwnProperty(de) && K != null && !i.hasOwnProperty(de) && (de === "selected" ? e.selected = !1 : Ye(
            e,
            t,
            de,
            null,
            i,
            K
          ));
        for (D in i)
          K = i[D], W = l[D], i.hasOwnProperty(D) && K !== W && (K != null || W != null) && (D === "selected" ? e.selected = K && typeof K != "function" && typeof K != "symbol" : Ye(
            e,
            t,
            D,
            K,
            i,
            W
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
        for (var ve in l)
          K = l[ve], l.hasOwnProperty(ve) && K != null && !i.hasOwnProperty(ve) && Ye(e, t, ve, null, i, K);
        for (Q in i)
          if (K = i[Q], W = l[Q], i.hasOwnProperty(Q) && K !== W && (K != null || W != null))
            switch (Q) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (K != null)
                  throw Error(u(137, t));
                break;
              default:
                Ye(
                  e,
                  t,
                  Q,
                  K,
                  i,
                  W
                );
            }
        return;
      default:
        if (hc(t)) {
          for (var Le in l)
            K = l[Le], l.hasOwnProperty(Le) && K !== void 0 && !i.hasOwnProperty(Le) && Ps(
              e,
              t,
              Le,
              void 0,
              i,
              K
            );
          for (te in i)
            K = i[te], W = l[te], !i.hasOwnProperty(te) || K === W || K === void 0 && W === void 0 || Ps(
              e,
              t,
              te,
              K,
              i,
              W
            );
          return;
        }
    }
    for (var Y in l)
      K = l[Y], l.hasOwnProperty(Y) && K != null && !i.hasOwnProperty(Y) && Ye(e, t, Y, null, i, K);
    for (ie in i)
      K = i[ie], W = l[ie], !i.hasOwnProperty(ie) || K === W || K == null && W == null || Ye(e, t, ie, K, i, W);
  }
  function Em(e) {
    switch (e) {
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
  function b1() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), i = 0; i < l.length; i++) {
        var r = l[i], c = r.transferSize, m = r.initiatorType, x = r.duration;
        if (c && x && Em(m)) {
          for (m = 0, x = r.responseEnd, i += 1; i < l.length; i++) {
            var D = l[i], Q = D.startTime;
            if (Q > x) break;
            var te = D.transferSize, ie = D.initiatorType;
            te && Em(ie) && (D = D.responseEnd, m += te * (D < x ? 1 : (x - Q) / (D - Q)));
          }
          if (--i, t += 8 * (c + m) / (r.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var ef = null, tf = null;
  function Iu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function zm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Mm(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function nf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var lf = null;
  function x1() {
    var e = window.event;
    return e && e.type === "popstate" ? e === lf ? !1 : (lf = e, !0) : (lf = null, !1);
  }
  var Nm = typeof setTimeout == "function" ? setTimeout : void 0, _1 = typeof clearTimeout == "function" ? clearTimeout : void 0, Cm = typeof Promise == "function" ? Promise : void 0, S1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cm < "u" ? function(e) {
    return Cm.resolve(null).then(e).catch(w1);
  } : Nm;
  function w1(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function El(e) {
    return e === "head";
  }
  function Am(e, t) {
    var l = t, i = 0;
    do {
      var r = l.nextSibling;
      if (e.removeChild(l), r && r.nodeType === 8)
        if (l = r.data, l === "/$" || l === "/&") {
          if (i === 0) {
            e.removeChild(r), ei(t);
            return;
          }
          i--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          i++;
        else if (l === "html")
          uo(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, uo(l);
          for (var c = l.firstChild; c; ) {
            var m = c.nextSibling, x = c.nodeName;
            c[ql] || x === "SCRIPT" || x === "STYLE" || x === "LINK" && c.rel.toLowerCase() === "stylesheet" || l.removeChild(c), c = m;
          }
        } else
          l === "body" && uo(e.ownerDocument.body);
      l = r;
    } while (l);
    ei(t);
  }
  function Tm(e, t) {
    var l = e;
    e = 0;
    do {
      var i = l.nextSibling;
      if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), i && i.nodeType === 8)
        if (l = i.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = i;
    } while (l);
  }
  function af(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          af(l), xi(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function E1(e, t, l, i) {
    for (; e.nodeType === 1; ) {
      var r = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (i) {
        if (!e[ql])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (c = e.getAttribute("rel"), c === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (c !== r.rel || e.getAttribute("href") !== (r.href == null || r.href === "" ? null : r.href) || e.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin) || e.getAttribute("title") !== (r.title == null ? null : r.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (c = e.getAttribute("src"), (c !== (r.src == null ? null : r.src) || e.getAttribute("type") !== (r.type == null ? null : r.type) || e.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin)) && c && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var c = r.name == null ? null : "" + r.name;
        if (r.type === "hidden" && e.getAttribute("name") === c)
          return e;
      } else return e;
      if (e = an(e.nextSibling), e === null) break;
    }
    return null;
  }
  function z1(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = an(e.nextSibling), e === null)) return null;
    return e;
  }
  function Dm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = an(e.nextSibling), e === null)) return null;
    return e;
  }
  function of(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function uf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function M1(e, t) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || l.readyState !== "loading")
      t();
    else {
      var i = function() {
        t(), l.removeEventListener("DOMContentLoaded", i);
      };
      l.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
    }
  }
  function an(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var rf = null;
  function Om(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return an(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Rm(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (t === 0) return e;
          t--;
        } else l !== "/$" && l !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Hm(e, t, l) {
    switch (t = Iu(l), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(u(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(u(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function uo(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    xi(e);
  }
  var on = /* @__PURE__ */ new Map(), km = /* @__PURE__ */ new Set();
  function Pu(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Kn = O.d;
  O.d = {
    f: N1,
    r: C1,
    D: A1,
    C: T1,
    L: D1,
    m: O1,
    X: H1,
    S: R1,
    M: k1
  };
  function N1() {
    var e = Kn.f(), t = $u();
    return e || t;
  }
  function C1(e) {
    var t = nl(e);
    t !== null && t.tag === 5 && t.type === "form" ? Ih(t) : Kn.r(e);
  }
  var Wa = typeof document > "u" ? null : document;
  function Bm(e, t, l) {
    var i = Wa;
    if (i && typeof t == "string" && t) {
      var r = Mt(t);
      r = 'link[rel="' + e + '"][href="' + r + '"]', typeof l == "string" && (r += '[crossorigin="' + l + '"]'), km.has(r) || (km.add(r), e = { rel: e, crossOrigin: l, href: t }, i.querySelector(r) === null && (t = i.createElement("link"), mt(t, "link", e), nt(t), i.head.appendChild(t)));
    }
  }
  function A1(e) {
    Kn.D(e), Bm("dns-prefetch", e, null);
  }
  function T1(e, t) {
    Kn.C(e, t), Bm("preconnect", e, t);
  }
  function D1(e, t, l) {
    Kn.L(e, t, l);
    var i = Wa;
    if (i && e && t) {
      var r = 'link[rel="preload"][as="' + Mt(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (r += '[imagesrcset="' + Mt(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (r += '[imagesizes="' + Mt(
        l.imageSizes
      ) + '"]')) : r += '[href="' + Mt(e) + '"]';
      var c = r;
      switch (t) {
        case "style":
          c = Ia(e);
          break;
        case "script":
          c = Pa(e);
      }
      on.has(c) || (e = y(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), on.set(c, e), i.querySelector(r) !== null || t === "style" && i.querySelector(ro(c)) || t === "script" && i.querySelector(co(c)) || (t = i.createElement("link"), mt(t, "link", e), nt(t), i.head.appendChild(t)));
    }
  }
  function O1(e, t) {
    Kn.m(e, t);
    var l = Wa;
    if (l && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", r = 'link[rel="modulepreload"][as="' + Mt(i) + '"][href="' + Mt(e) + '"]', c = r;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Pa(e);
      }
      if (!on.has(c) && (e = y({ rel: "modulepreload", href: e }, t), on.set(c, e), l.querySelector(r) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(co(c)))
              return;
        }
        i = l.createElement("link"), mt(i, "link", e), nt(i), l.head.appendChild(i);
      }
    }
  }
  function R1(e, t, l) {
    Kn.S(e, t, l);
    var i = Wa;
    if (i && e) {
      var r = al(i).hoistableStyles, c = Ia(e);
      t = t || "default";
      var m = r.get(c);
      if (!m) {
        var x = { loading: 0, preload: null };
        if (m = i.querySelector(
          ro(c)
        ))
          x.loading = 5;
        else {
          e = y(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = on.get(c)) && cf(e, l);
          var D = m = i.createElement("link");
          nt(D), mt(D, "link", e), D._p = new Promise(function(Q, te) {
            D.onload = Q, D.onerror = te;
          }), D.addEventListener("load", function() {
            x.loading |= 1;
          }), D.addEventListener("error", function() {
            x.loading |= 2;
          }), x.loading |= 4, er(m, t, i);
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
  function H1(e, t) {
    Kn.X(e, t);
    var l = Wa;
    if (l && e) {
      var i = al(l).hoistableScripts, r = Pa(e), c = i.get(r);
      c || (c = l.querySelector(co(r)), c || (e = y({ src: e, async: !0 }, t), (t = on.get(r)) && sf(e, t), c = l.createElement("script"), nt(c), mt(c, "link", e), l.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, i.set(r, c));
    }
  }
  function k1(e, t) {
    Kn.M(e, t);
    var l = Wa;
    if (l && e) {
      var i = al(l).hoistableScripts, r = Pa(e), c = i.get(r);
      c || (c = l.querySelector(co(r)), c || (e = y({ src: e, async: !0, type: "module" }, t), (t = on.get(r)) && sf(e, t), c = l.createElement("script"), nt(c), mt(c, "link", e), l.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, i.set(r, c));
    }
  }
  function Um(e, t, l, i) {
    var r = (r = fe.current) ? Pu(r) : null;
    if (!r) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Ia(l.href), l = al(
          r
        ).hoistableStyles, i = l.get(t), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Ia(l.href);
          var c = al(
            r
          ).hoistableStyles, m = c.get(e);
          if (m || (r = r.ownerDocument || r, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, m), (c = r.querySelector(
            ro(e)
          )) && !c._p && (m.instance = c, m.state.loading = 5), on.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, on.set(e, l), c || B1(
            r,
            e,
            l,
            m.state
          ))), t && i === null)
            throw Error(u(528, ""));
          return m;
        }
        if (t && i !== null)
          throw Error(u(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pa(l), l = al(
          r
        ).hoistableScripts, i = l.get(t), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(u(444, e));
    }
  }
  function Ia(e) {
    return 'href="' + Mt(e) + '"';
  }
  function ro(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function qm(e) {
    return y({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function B1(e, t, l, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? i.loading = 1 : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
      return i.loading |= 1;
    }), t.addEventListener("error", function() {
      return i.loading |= 2;
    }), mt(t, "link", l), nt(t), e.head.appendChild(t));
  }
  function Pa(e) {
    return '[src="' + Mt(e) + '"]';
  }
  function co(e) {
    return "script[async]" + e;
  }
  function jm(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + Mt(l.href) + '"]'
          );
          if (i)
            return t.instance = i, nt(i), i;
          var r = y({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return i = (e.ownerDocument || e).createElement(
            "style"
          ), nt(i), mt(i, "style", r), er(i, l.precedence, e), t.instance = i;
        case "stylesheet":
          r = Ia(l.href);
          var c = e.querySelector(
            ro(r)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, nt(c), c;
          i = qm(l), (r = on.get(r)) && cf(i, r), c = (e.ownerDocument || e).createElement("link"), nt(c);
          var m = c;
          return m._p = new Promise(function(x, D) {
            m.onload = x, m.onerror = D;
          }), mt(c, "link", i), t.state.loading |= 4, er(c, l.precedence, e), t.instance = c;
        case "script":
          return c = Pa(l.src), (r = e.querySelector(
            co(c)
          )) ? (t.instance = r, nt(r), r) : (i = l, (r = on.get(c)) && (i = y({}, l), sf(i, r)), e = e.ownerDocument || e, r = e.createElement("script"), nt(r), mt(r, "link", i), e.head.appendChild(r), t.instance = r);
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, er(i, l.precedence, e));
    return t.instance;
  }
  function er(e, t, l) {
    for (var i = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), r = i.length ? i[i.length - 1] : null, c = r, m = 0; m < i.length; m++) {
      var x = i[m];
      if (x.dataset.precedence === t) c = x;
      else if (c !== r) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function cf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function sf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var tr = null;
  function Ym(e, t, l) {
    if (tr === null) {
      var i = /* @__PURE__ */ new Map(), r = tr = /* @__PURE__ */ new Map();
      r.set(l, i);
    } else
      r = tr, i = r.get(l), i || (i = /* @__PURE__ */ new Map(), r.set(l, i));
    if (i.has(e)) return i;
    for (i.set(e, null), l = l.getElementsByTagName(e), r = 0; r < l.length; r++) {
      var c = l[r];
      if (!(c[ql] || c[ct] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = c.getAttribute(t) || "";
        m = e + m;
        var x = i.get(m);
        x ? x.push(c) : i.set(m, [c]);
      }
    }
    return i;
  }
  function Lm(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function U1(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Vm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function q1(e, t, l, i) {
    if (l.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var r = Ia(i.href), c = t.querySelector(
          ro(r)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = nr.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = c, nt(c);
          return;
        }
        c = t.ownerDocument || t, i = qm(i), (r = on.get(r)) && cf(i, r), c = c.createElement("link"), nt(c);
        var m = c;
        m._p = new Promise(function(x, D) {
          m.onload = x, m.onerror = D;
        }), mt(c, "link", i), l.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = nr.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var ff = 0;
  function j1(e, t) {
    return e.stylesheets && e.count === 0 && ar(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var i = setTimeout(function() {
        if (e.stylesheets && ar(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && ff === 0 && (ff = 62500 * b1());
      var r = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ar(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > ff ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(r);
      };
    } : null;
  }
  function nr() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ar(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var lr = null;
  function ar(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, lr = /* @__PURE__ */ new Map(), t.forEach(Y1, e), lr = null, nr.call(e));
  }
  function Y1(e, t) {
    if (!(t.state.loading & 4)) {
      var l = lr.get(e);
      if (l) var i = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), lr.set(e, l);
        for (var r = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < r.length; c++) {
          var m = r[c];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (l.set(m.dataset.precedence, m), i = m);
        }
        i && l.set(null, i);
      }
      r = t.instance, m = r.getAttribute("data-precedence"), c = l.get(m) || i, c === i && l.set(null, r), l.set(m, r), this.count++, i = nr.bind(this), r.addEventListener("load", i), r.addEventListener("error", i), c ? c.parentNode.insertBefore(r, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(r, e.firstChild)), t.state.loading |= 4;
    }
  }
  var so = {
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: L,
    _currentValue2: L,
    _threadCount: 0
  };
  function L1(e, t, l, i, r, c, m, x, D) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = yi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = yi(0), this.hiddenUpdates = yi(null), this.identifierPrefix = i, this.onUncaughtError = r, this.onCaughtError = c, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = D, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Xm(e, t, l, i, r, c, m, x, D, Q, te, ie) {
    return e = new L1(
      e,
      t,
      l,
      m,
      D,
      Q,
      te,
      ie,
      x
    ), t = 1, c === !0 && (t |= 24), c = qt(3, null, null, t), e.current = c, c.stateNode = e, t = Xc(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: i,
      isDehydrated: l,
      cache: t
    }, Qc(c), e;
  }
  function $m(e) {
    return e ? (e = Ta, e) : Ta;
  }
  function Zm(e, t, l, i, r, c) {
    r = $m(r), i.context === null ? i.context = r : i.pendingContext = r, i = hl(t), i.payload = { element: l }, c = c === void 0 ? null : c, c !== null && (i.callback = c), l = gl(e, i, t), l !== null && (Ot(l, e, t), Vi(l, e, t));
  }
  function Gm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function df(e, t) {
    Gm(e, t), (e = e.alternate) && Gm(e, t);
  }
  function Qm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Vl(e, 67108864);
      t !== null && Ot(t, e, 67108864), df(e, 67108864);
    }
  }
  function Km(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Xt();
      t = vi(t);
      var l = Vl(e, t);
      l !== null && Ot(l, e, t), df(e, t);
    }
  }
  var ir = !0;
  function V1(e, t, l, i) {
    var r = E.T;
    E.T = null;
    var c = O.p;
    try {
      O.p = 2, hf(e, t, l, i);
    } finally {
      O.p = c, E.T = r;
    }
  }
  function X1(e, t, l, i) {
    var r = E.T;
    E.T = null;
    var c = O.p;
    try {
      O.p = 8, hf(e, t, l, i);
    } finally {
      O.p = c, E.T = r;
    }
  }
  function hf(e, t, l, i) {
    if (ir) {
      var r = gf(i);
      if (r === null)
        Is(
          e,
          t,
          i,
          or,
          l
        ), Fm(e, i);
      else if (Z1(
        r,
        e,
        t,
        l,
        i
      ))
        i.stopPropagation();
      else if (Fm(e, i), t & 4 && -1 < $1.indexOf(e)) {
        for (; r !== null; ) {
          var c = nl(r);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var m = An(c.pendingLanes);
                  if (m !== 0) {
                    var x = c;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; m; ) {
                      var D = 1 << 31 - _t(m);
                      x.entanglements[1] |= D, m &= ~D;
                    }
                    En(c), (Be & 6) === 0 && (Vu = Ie() + 500, ao(0));
                  }
                }
                break;
              case 31:
              case 13:
                x = Vl(c, 2), x !== null && Ot(x, c, 2), $u(), df(c, 2);
            }
          if (c = gf(i), c === null && Is(
            e,
            t,
            i,
            or,
            l
          ), c === r) break;
          r = c;
        }
        r !== null && i.stopPropagation();
      } else
        Is(
          e,
          t,
          i,
          null,
          l
        );
    }
  }
  function gf(e) {
    return e = mc(e), mf(e);
  }
  var or = null;
  function mf(e) {
    if (or = null, e = tl(e), e !== null) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = d(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = g(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return or = e, null;
  }
  function Jm(e) {
    switch (e) {
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
        switch (Bt()) {
          case Jt:
            return 2;
          case Ft:
            return 8;
          case Wt:
          case tc:
            return 32;
          case ha:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var pf = !1, zl = null, Ml = null, Nl = null, fo = /* @__PURE__ */ new Map(), ho = /* @__PURE__ */ new Map(), Cl = [], $1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Fm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        zl = null;
        break;
      case "dragenter":
      case "dragleave":
        Ml = null;
        break;
      case "mouseover":
      case "mouseout":
        Nl = null;
        break;
      case "pointerover":
      case "pointerout":
        fo.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ho.delete(t.pointerId);
    }
  }
  function go(e, t, l, i, r, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: i,
      nativeEvent: c,
      targetContainers: [r]
    }, t !== null && (t = nl(t), t !== null && Qm(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, r !== null && t.indexOf(r) === -1 && t.push(r), e);
  }
  function Z1(e, t, l, i, r) {
    switch (t) {
      case "focusin":
        return zl = go(
          zl,
          e,
          t,
          l,
          i,
          r
        ), !0;
      case "dragenter":
        return Ml = go(
          Ml,
          e,
          t,
          l,
          i,
          r
        ), !0;
      case "mouseover":
        return Nl = go(
          Nl,
          e,
          t,
          l,
          i,
          r
        ), !0;
      case "pointerover":
        var c = r.pointerId;
        return fo.set(
          c,
          go(
            fo.get(c) || null,
            e,
            t,
            l,
            i,
            r
          )
        ), !0;
      case "gotpointercapture":
        return c = r.pointerId, ho.set(
          c,
          go(
            ho.get(c) || null,
            e,
            t,
            l,
            i,
            r
          )
        ), !0;
    }
    return !1;
  }
  function Wm(e) {
    var t = tl(e.target);
    if (t !== null) {
      var l = f(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = d(l), t !== null) {
            e.blockedOn = t, Jo(e.priority, function() {
              Km(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = g(l), t !== null) {
            e.blockedOn = t, Jo(e.priority, function() {
              Km(l);
            });
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function ur(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = gf(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var i = new l.constructor(
          l.type,
          l
        );
        gc = i, l.target.dispatchEvent(i), gc = null;
      } else
        return t = nl(l), t !== null && Qm(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function Im(e, t, l) {
    ur(e) && l.delete(t);
  }
  function G1() {
    pf = !1, zl !== null && ur(zl) && (zl = null), Ml !== null && ur(Ml) && (Ml = null), Nl !== null && ur(Nl) && (Nl = null), fo.forEach(Im), ho.forEach(Im);
  }
  function rr(e, t) {
    e.blockedOn === t && (e.blockedOn = null, pf || (pf = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      G1
    )));
  }
  var cr = null;
  function Pm(e) {
    cr !== e && (cr = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        cr === e && (cr = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], i = e[t + 1], r = e[t + 2];
          if (typeof i != "function") {
            if (mf(i || l) === null)
              continue;
            break;
          }
          var c = nl(l);
          c !== null && (e.splice(t, 3), t -= 3, hs(
            c,
            {
              pending: !0,
              data: r,
              method: l.method,
              action: i
            },
            i,
            r
          ));
        }
      }
    ));
  }
  function ei(e) {
    function t(D) {
      return rr(D, e);
    }
    zl !== null && rr(zl, e), Ml !== null && rr(Ml, e), Nl !== null && rr(Nl, e), fo.forEach(t), ho.forEach(t);
    for (var l = 0; l < Cl.length; l++) {
      var i = Cl[l];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < Cl.length && (l = Cl[0], l.blockedOn === null); )
      Wm(l), l.blockedOn === null && Cl.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (i = 0; i < l.length; i += 3) {
        var r = l[i], c = l[i + 1], m = r[yt] || null;
        if (typeof c == "function")
          m || Pm(l);
        else if (m) {
          var x = null;
          if (c && c.hasAttribute("formAction")) {
            if (r = c, m = c[yt] || null)
              x = m.formAction;
            else if (mf(r) !== null) continue;
          } else x = m.action;
          typeof x == "function" ? l[i + 1] = x : (l.splice(i, 3), i -= 3), Pm(l);
        }
      }
  }
  function e0() {
    function e(c) {
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
    function t() {
      r !== null && (r(), r = null), i || setTimeout(l, 20);
    }
    function l() {
      if (!i && !navigation.transition) {
        var c = navigation.currentEntry;
        c && c.url != null && navigation.navigate(c.url, {
          state: c.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, r = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100), function() {
        i = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), r !== null && (r(), r = null);
      };
    }
  }
  function yf(e) {
    this._internalRoot = e;
  }
  sr.prototype.render = yf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(u(409));
    var l = t.current, i = Xt();
    Zm(l, i, e, t, null, null);
  }, sr.prototype.unmount = yf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Zm(e.current, 2, null, e, null, null), $u(), t[Tn] = null;
    }
  };
  function sr(e) {
    this._internalRoot = e;
  }
  sr.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Ko();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Cl.length && t !== 0 && t < Cl[l].priority; l++) ;
      Cl.splice(l, 0, e), l === 0 && Wm(e);
    }
  };
  var t0 = a.version;
  if (t0 !== "19.2.7")
    throw Error(
      u(
        527,
        t0,
        "19.2.7"
      )
    );
  O.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
    return e = h(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Q1 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: E,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var fr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!fr.isDisabled && fr.supportsFiber)
      try {
        kl = fr.inject(
          Q1
        ), xt = fr;
      } catch {
      }
  }
  return mo.createRoot = function(e, t) {
    if (!s(e)) throw Error(u(299));
    var l = !1, i = "", r = rg, c = cg, m = sg;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (r = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (m = t.onRecoverableError)), t = Xm(
      e,
      1,
      !1,
      null,
      null,
      l,
      i,
      null,
      r,
      c,
      m,
      e0
    ), e[Tn] = t.current, Ws(e), new yf(t);
  }, mo.hydrateRoot = function(e, t, l) {
    if (!s(e)) throw Error(u(299));
    var i = !1, r = "", c = rg, m = cg, x = sg, D = null;
    return l != null && (l.unstable_strictMode === !0 && (i = !0), l.identifierPrefix !== void 0 && (r = l.identifierPrefix), l.onUncaughtError !== void 0 && (c = l.onUncaughtError), l.onCaughtError !== void 0 && (m = l.onCaughtError), l.onRecoverableError !== void 0 && (x = l.onRecoverableError), l.formState !== void 0 && (D = l.formState)), t = Xm(
      e,
      1,
      !0,
      t,
      l ?? null,
      i,
      r,
      D,
      c,
      m,
      x,
      e0
    ), t.context = $m(null), l = t.current, i = Xt(), i = vi(i), r = hl(i), r.callback = null, gl(l, r, i), l = i, t.current.lanes = l, Ul(t, l), En(t), e[Tn] = t.current, Ws(e), new sr(t);
  }, mo.version = "19.2.7", mo;
}
var c0;
function ax() {
  if (c0) return bf.exports;
  c0 = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), bf.exports = lx(), bf.exports;
}
var ix = ax(), wf = { exports: {} }, po = {};
var s0;
function ox() {
  if (s0) return po;
  s0 = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), a = /* @__PURE__ */ Symbol.for("react.fragment");
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
  return po.Fragment = a, po.jsx = o, po.jsxs = o, po;
}
var f0;
function ux() {
  return f0 || (f0 = 1, wf.exports = ox()), wf.exports;
}
var U = ux();
function rt(n) {
  if (typeof n == "string" || typeof n == "number") return "" + n;
  let a = "";
  if (Array.isArray(n))
    for (let o = 0, u; o < n.length; o++)
      (u = rt(n[o])) !== "" && (a += (a && " ") + u);
  else
    for (let o in n)
      n[o] && (a += (a && " ") + o);
  return a;
}
var rx = { value: () => {
} };
function Lr() {
  for (var n = 0, a = arguments.length, o = {}, u; n < a; ++n) {
    if (!(u = arguments[n] + "") || u in o || /[\s.]/.test(u)) throw new Error("illegal type: " + u);
    o[u] = [];
  }
  return new Sr(o);
}
function Sr(n) {
  this._ = n;
}
function cx(n, a) {
  return n.trim().split(/^|\s+/).map(function(o) {
    var u = "", s = o.indexOf(".");
    if (s >= 0 && (u = o.slice(s + 1), o = o.slice(0, s)), o && !a.hasOwnProperty(o)) throw new Error("unknown type: " + o);
    return { type: o, name: u };
  });
}
Sr.prototype = Lr.prototype = {
  constructor: Sr,
  on: function(n, a) {
    var o = this._, u = cx(n + "", o), s, f = -1, d = u.length;
    if (arguments.length < 2) {
      for (; ++f < d; ) if ((s = (n = u[f]).type) && (s = sx(o[s], n.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++f < d; )
      if (s = (n = u[f]).type) o[s] = d0(o[s], n.name, a);
      else if (a == null) for (s in o) o[s] = d0(o[s], n.name, null);
    return this;
  },
  copy: function() {
    var n = {}, a = this._;
    for (var o in a) n[o] = a[o].slice();
    return new Sr(n);
  },
  call: function(n, a) {
    if ((s = arguments.length - 2) > 0) for (var o = new Array(s), u = 0, s, f; u < s; ++u) o[u] = arguments[u + 2];
    if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    for (f = this._[n], u = 0, s = f.length; u < s; ++u) f[u].value.apply(a, o);
  },
  apply: function(n, a, o) {
    if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    for (var u = this._[n], s = 0, f = u.length; s < f; ++s) u[s].value.apply(a, o);
  }
};
function sx(n, a) {
  for (var o = 0, u = n.length, s; o < u; ++o)
    if ((s = n[o]).name === a)
      return s.value;
}
function d0(n, a, o) {
  for (var u = 0, s = n.length; u < s; ++u)
    if (n[u].name === a) {
      n[u] = rx, n = n.slice(0, u).concat(n.slice(u + 1));
      break;
    }
  return o != null && n.push({ name: a, value: o }), n;
}
var Uf = "http://www.w3.org/1999/xhtml";
const h0 = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Uf,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Vr(n) {
  var a = n += "", o = a.indexOf(":");
  return o >= 0 && (a = n.slice(0, o)) !== "xmlns" && (n = n.slice(o + 1)), h0.hasOwnProperty(a) ? { space: h0[a], local: n } : n;
}
function fx(n) {
  return function() {
    var a = this.ownerDocument, o = this.namespaceURI;
    return o === Uf && a.documentElement.namespaceURI === Uf ? a.createElement(n) : a.createElementNS(o, n);
  };
}
function dx(n) {
  return function() {
    return this.ownerDocument.createElementNS(n.space, n.local);
  };
}
function Tp(n) {
  var a = Vr(n);
  return (a.local ? dx : fx)(a);
}
function hx() {
}
function Pf(n) {
  return n == null ? hx : function() {
    return this.querySelector(n);
  };
}
function gx(n) {
  typeof n != "function" && (n = Pf(n));
  for (var a = this._groups, o = a.length, u = new Array(o), s = 0; s < o; ++s)
    for (var f = a[s], d = f.length, g = u[s] = new Array(d), p, h, b = 0; b < d; ++b)
      (p = f[b]) && (h = n.call(p, p.__data__, b, f)) && ("__data__" in p && (h.__data__ = p.__data__), g[b] = h);
  return new Gt(u, this._parents);
}
function mx(n) {
  return n == null ? [] : Array.isArray(n) ? n : Array.from(n);
}
function px() {
  return [];
}
function Dp(n) {
  return n == null ? px : function() {
    return this.querySelectorAll(n);
  };
}
function yx(n) {
  return function() {
    return mx(n.apply(this, arguments));
  };
}
function vx(n) {
  typeof n == "function" ? n = yx(n) : n = Dp(n);
  for (var a = this._groups, o = a.length, u = [], s = [], f = 0; f < o; ++f)
    for (var d = a[f], g = d.length, p, h = 0; h < g; ++h)
      (p = d[h]) && (u.push(n.call(p, p.__data__, h, d)), s.push(p));
  return new Gt(u, s);
}
function Op(n) {
  return function() {
    return this.matches(n);
  };
}
function Rp(n) {
  return function(a) {
    return a.matches(n);
  };
}
var bx = Array.prototype.find;
function xx(n) {
  return function() {
    return bx.call(this.children, n);
  };
}
function _x() {
  return this.firstElementChild;
}
function Sx(n) {
  return this.select(n == null ? _x : xx(typeof n == "function" ? n : Rp(n)));
}
var wx = Array.prototype.filter;
function Ex() {
  return Array.from(this.children);
}
function zx(n) {
  return function() {
    return wx.call(this.children, n);
  };
}
function Mx(n) {
  return this.selectAll(n == null ? Ex : zx(typeof n == "function" ? n : Rp(n)));
}
function Nx(n) {
  typeof n != "function" && (n = Op(n));
  for (var a = this._groups, o = a.length, u = new Array(o), s = 0; s < o; ++s)
    for (var f = a[s], d = f.length, g = u[s] = [], p, h = 0; h < d; ++h)
      (p = f[h]) && n.call(p, p.__data__, h, f) && g.push(p);
  return new Gt(u, this._parents);
}
function Hp(n) {
  return new Array(n.length);
}
function Cx() {
  return new Gt(this._enter || this._groups.map(Hp), this._parents);
}
function Nr(n, a) {
  this.ownerDocument = n.ownerDocument, this.namespaceURI = n.namespaceURI, this._next = null, this._parent = n, this.__data__ = a;
}
Nr.prototype = {
  constructor: Nr,
  appendChild: function(n) {
    return this._parent.insertBefore(n, this._next);
  },
  insertBefore: function(n, a) {
    return this._parent.insertBefore(n, a);
  },
  querySelector: function(n) {
    return this._parent.querySelector(n);
  },
  querySelectorAll: function(n) {
    return this._parent.querySelectorAll(n);
  }
};
function Ax(n) {
  return function() {
    return n;
  };
}
function Tx(n, a, o, u, s, f) {
  for (var d = 0, g, p = a.length, h = f.length; d < h; ++d)
    (g = a[d]) ? (g.__data__ = f[d], u[d] = g) : o[d] = new Nr(n, f[d]);
  for (; d < p; ++d)
    (g = a[d]) && (s[d] = g);
}
function Dx(n, a, o, u, s, f, d) {
  var g, p, h = /* @__PURE__ */ new Map(), b = a.length, y = f.length, v = new Array(b), S;
  for (g = 0; g < b; ++g)
    (p = a[g]) && (v[g] = S = d.call(p, p.__data__, g, a) + "", h.has(S) ? s[g] = p : h.set(S, p));
  for (g = 0; g < y; ++g)
    S = d.call(n, f[g], g, f) + "", (p = h.get(S)) ? (u[g] = p, p.__data__ = f[g], h.delete(S)) : o[g] = new Nr(n, f[g]);
  for (g = 0; g < b; ++g)
    (p = a[g]) && h.get(v[g]) === p && (s[g] = p);
}
function Ox(n) {
  return n.__data__;
}
function Rx(n, a) {
  if (!arguments.length) return Array.from(this, Ox);
  var o = a ? Dx : Tx, u = this._parents, s = this._groups;
  typeof n != "function" && (n = Ax(n));
  for (var f = s.length, d = new Array(f), g = new Array(f), p = new Array(f), h = 0; h < f; ++h) {
    var b = u[h], y = s[h], v = y.length, S = Hx(n.call(b, b && b.__data__, h, u)), w = S.length, A = g[h] = new Array(w), C = d[h] = new Array(w), M = p[h] = new Array(v);
    o(b, y, A, C, M, S, a);
    for (var q = 0, _ = 0, N, j; q < w; ++q)
      if (N = A[q]) {
        for (q >= _ && (_ = q + 1); !(j = C[_]) && ++_ < w; ) ;
        N._next = j || null;
      }
  }
  return d = new Gt(d, u), d._enter = g, d._exit = p, d;
}
function Hx(n) {
  return typeof n == "object" && "length" in n ? n : Array.from(n);
}
function kx() {
  return new Gt(this._exit || this._groups.map(Hp), this._parents);
}
function Bx(n, a, o) {
  var u = this.enter(), s = this, f = this.exit();
  return typeof n == "function" ? (u = n(u), u && (u = u.selection())) : u = u.append(n + ""), a != null && (s = a(s), s && (s = s.selection())), o == null ? f.remove() : o(f), u && s ? u.merge(s).order() : s;
}
function Ux(n) {
  for (var a = n.selection ? n.selection() : n, o = this._groups, u = a._groups, s = o.length, f = u.length, d = Math.min(s, f), g = new Array(s), p = 0; p < d; ++p)
    for (var h = o[p], b = u[p], y = h.length, v = g[p] = new Array(y), S, w = 0; w < y; ++w)
      (S = h[w] || b[w]) && (v[w] = S);
  for (; p < s; ++p)
    g[p] = o[p];
  return new Gt(g, this._parents);
}
function qx() {
  for (var n = this._groups, a = -1, o = n.length; ++a < o; )
    for (var u = n[a], s = u.length - 1, f = u[s], d; --s >= 0; )
      (d = u[s]) && (f && d.compareDocumentPosition(f) ^ 4 && f.parentNode.insertBefore(d, f), f = d);
  return this;
}
function jx(n) {
  n || (n = Yx);
  function a(y, v) {
    return y && v ? n(y.__data__, v.__data__) : !y - !v;
  }
  for (var o = this._groups, u = o.length, s = new Array(u), f = 0; f < u; ++f) {
    for (var d = o[f], g = d.length, p = s[f] = new Array(g), h, b = 0; b < g; ++b)
      (h = d[b]) && (p[b] = h);
    p.sort(a);
  }
  return new Gt(s, this._parents).order();
}
function Yx(n, a) {
  return n < a ? -1 : n > a ? 1 : n >= a ? 0 : NaN;
}
function Lx() {
  var n = arguments[0];
  return arguments[0] = this, n.apply(null, arguments), this;
}
function Vx() {
  return Array.from(this);
}
function Xx() {
  for (var n = this._groups, a = 0, o = n.length; a < o; ++a)
    for (var u = n[a], s = 0, f = u.length; s < f; ++s) {
      var d = u[s];
      if (d) return d;
    }
  return null;
}
function $x() {
  let n = 0;
  for (const a of this) ++n;
  return n;
}
function Zx() {
  return !this.node();
}
function Gx(n) {
  for (var a = this._groups, o = 0, u = a.length; o < u; ++o)
    for (var s = a[o], f = 0, d = s.length, g; f < d; ++f)
      (g = s[f]) && n.call(g, g.__data__, f, s);
  return this;
}
function Qx(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function Kx(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function Jx(n, a) {
  return function() {
    this.setAttribute(n, a);
  };
}
function Fx(n, a) {
  return function() {
    this.setAttributeNS(n.space, n.local, a);
  };
}
function Wx(n, a) {
  return function() {
    var o = a.apply(this, arguments);
    o == null ? this.removeAttribute(n) : this.setAttribute(n, o);
  };
}
function Ix(n, a) {
  return function() {
    var o = a.apply(this, arguments);
    o == null ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, o);
  };
}
function Px(n, a) {
  var o = Vr(n);
  if (arguments.length < 2) {
    var u = this.node();
    return o.local ? u.getAttributeNS(o.space, o.local) : u.getAttribute(o);
  }
  return this.each((a == null ? o.local ? Kx : Qx : typeof a == "function" ? o.local ? Ix : Wx : o.local ? Fx : Jx)(o, a));
}
function kp(n) {
  return n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView;
}
function e_(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function t_(n, a, o) {
  return function() {
    this.style.setProperty(n, a, o);
  };
}
function n_(n, a, o) {
  return function() {
    var u = a.apply(this, arguments);
    u == null ? this.style.removeProperty(n) : this.style.setProperty(n, u, o);
  };
}
function l_(n, a, o) {
  return arguments.length > 1 ? this.each((a == null ? e_ : typeof a == "function" ? n_ : t_)(n, a, o ?? "")) : ri(this.node(), n);
}
function ri(n, a) {
  return n.style.getPropertyValue(a) || kp(n).getComputedStyle(n, null).getPropertyValue(a);
}
function a_(n) {
  return function() {
    delete this[n];
  };
}
function i_(n, a) {
  return function() {
    this[n] = a;
  };
}
function o_(n, a) {
  return function() {
    var o = a.apply(this, arguments);
    o == null ? delete this[n] : this[n] = o;
  };
}
function u_(n, a) {
  return arguments.length > 1 ? this.each((a == null ? a_ : typeof a == "function" ? o_ : i_)(n, a)) : this.node()[n];
}
function Bp(n) {
  return n.trim().split(/^|\s+/);
}
function ed(n) {
  return n.classList || new Up(n);
}
function Up(n) {
  this._node = n, this._names = Bp(n.getAttribute("class") || "");
}
Up.prototype = {
  add: function(n) {
    var a = this._names.indexOf(n);
    a < 0 && (this._names.push(n), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(n) {
    var a = this._names.indexOf(n);
    a >= 0 && (this._names.splice(a, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(n) {
    return this._names.indexOf(n) >= 0;
  }
};
function qp(n, a) {
  for (var o = ed(n), u = -1, s = a.length; ++u < s; ) o.add(a[u]);
}
function jp(n, a) {
  for (var o = ed(n), u = -1, s = a.length; ++u < s; ) o.remove(a[u]);
}
function r_(n) {
  return function() {
    qp(this, n);
  };
}
function c_(n) {
  return function() {
    jp(this, n);
  };
}
function s_(n, a) {
  return function() {
    (a.apply(this, arguments) ? qp : jp)(this, n);
  };
}
function f_(n, a) {
  var o = Bp(n + "");
  if (arguments.length < 2) {
    for (var u = ed(this.node()), s = -1, f = o.length; ++s < f; ) if (!u.contains(o[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? s_ : a ? r_ : c_)(o, a));
}
function d_() {
  this.textContent = "";
}
function h_(n) {
  return function() {
    this.textContent = n;
  };
}
function g_(n) {
  return function() {
    var a = n.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function m_(n) {
  return arguments.length ? this.each(n == null ? d_ : (typeof n == "function" ? g_ : h_)(n)) : this.node().textContent;
}
function p_() {
  this.innerHTML = "";
}
function y_(n) {
  return function() {
    this.innerHTML = n;
  };
}
function v_(n) {
  return function() {
    var a = n.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function b_(n) {
  return arguments.length ? this.each(n == null ? p_ : (typeof n == "function" ? v_ : y_)(n)) : this.node().innerHTML;
}
function x_() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function __() {
  return this.each(x_);
}
function S_() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function w_() {
  return this.each(S_);
}
function E_(n) {
  var a = typeof n == "function" ? n : Tp(n);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function z_() {
  return null;
}
function M_(n, a) {
  var o = typeof n == "function" ? n : Tp(n), u = a == null ? z_ : typeof a == "function" ? a : Pf(a);
  return this.select(function() {
    return this.insertBefore(o.apply(this, arguments), u.apply(this, arguments) || null);
  });
}
function N_() {
  var n = this.parentNode;
  n && n.removeChild(this);
}
function C_() {
  return this.each(N_);
}
function A_() {
  var n = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(n, this.nextSibling) : n;
}
function T_() {
  var n = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(n, this.nextSibling) : n;
}
function D_(n) {
  return this.select(n ? T_ : A_);
}
function O_(n) {
  return arguments.length ? this.property("__data__", n) : this.node().__data__;
}
function R_(n) {
  return function(a) {
    n.call(this, a, this.__data__);
  };
}
function H_(n) {
  return n.trim().split(/^|\s+/).map(function(a) {
    var o = "", u = a.indexOf(".");
    return u >= 0 && (o = a.slice(u + 1), a = a.slice(0, u)), { type: a, name: o };
  });
}
function k_(n) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var o = 0, u = -1, s = a.length, f; o < s; ++o)
        f = a[o], (!n.type || f.type === n.type) && f.name === n.name ? this.removeEventListener(f.type, f.listener, f.options) : a[++u] = f;
      ++u ? a.length = u : delete this.__on;
    }
  };
}
function B_(n, a, o) {
  return function() {
    var u = this.__on, s, f = R_(a);
    if (u) {
      for (var d = 0, g = u.length; d < g; ++d)
        if ((s = u[d]).type === n.type && s.name === n.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = f, s.options = o), s.value = a;
          return;
        }
    }
    this.addEventListener(n.type, f, o), s = { type: n.type, name: n.name, value: a, listener: f, options: o }, u ? u.push(s) : this.__on = [s];
  };
}
function U_(n, a, o) {
  var u = H_(n + ""), s, f = u.length, d;
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
  for (g = a ? B_ : k_, s = 0; s < f; ++s) this.each(g(u[s], a, o));
  return this;
}
function Yp(n, a, o) {
  var u = kp(n), s = u.CustomEvent;
  typeof s == "function" ? s = new s(a, o) : (s = u.document.createEvent("Event"), o ? (s.initEvent(a, o.bubbles, o.cancelable), s.detail = o.detail) : s.initEvent(a, !1, !1)), n.dispatchEvent(s);
}
function q_(n, a) {
  return function() {
    return Yp(this, n, a);
  };
}
function j_(n, a) {
  return function() {
    return Yp(this, n, a.apply(this, arguments));
  };
}
function Y_(n, a) {
  return this.each((typeof a == "function" ? j_ : q_)(n, a));
}
function* L_() {
  for (var n = this._groups, a = 0, o = n.length; a < o; ++a)
    for (var u = n[a], s = 0, f = u.length, d; s < f; ++s)
      (d = u[s]) && (yield d);
}
var Lp = [null];
function Gt(n, a) {
  this._groups = n, this._parents = a;
}
function Bo() {
  return new Gt([[document.documentElement]], Lp);
}
function V_() {
  return this;
}
Gt.prototype = Bo.prototype = {
  constructor: Gt,
  select: gx,
  selectAll: vx,
  selectChild: Sx,
  selectChildren: Mx,
  filter: Nx,
  data: Rx,
  enter: Cx,
  exit: kx,
  join: Bx,
  merge: Ux,
  selection: V_,
  order: qx,
  sort: jx,
  call: Lx,
  nodes: Vx,
  node: Xx,
  size: $x,
  empty: Zx,
  each: Gx,
  attr: Px,
  style: l_,
  property: u_,
  classed: f_,
  text: m_,
  html: b_,
  raise: __,
  lower: w_,
  append: E_,
  insert: M_,
  remove: C_,
  clone: D_,
  datum: O_,
  on: U_,
  dispatch: Y_,
  [Symbol.iterator]: L_
};
function $t(n) {
  return typeof n == "string" ? new Gt([[document.querySelector(n)]], [document.documentElement]) : new Gt([[n]], Lp);
}
function X_(n) {
  let a;
  for (; a = n.sourceEvent; ) n = a;
  return n;
}
function dn(n, a) {
  if (n = X_(n), a === void 0 && (a = n.currentTarget), a) {
    var o = a.ownerSVGElement || a;
    if (o.createSVGPoint) {
      var u = o.createSVGPoint();
      return u.x = n.clientX, u.y = n.clientY, u = u.matrixTransform(a.getScreenCTM().inverse()), [u.x, u.y];
    }
    if (a.getBoundingClientRect) {
      var s = a.getBoundingClientRect();
      return [n.clientX - s.left - a.clientLeft, n.clientY - s.top - a.clientTop];
    }
  }
  return [n.pageX, n.pageY];
}
const $_ = { passive: !1 }, zo = { capture: !0, passive: !1 };
function Ef(n) {
  n.stopImmediatePropagation();
}
function ii(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function Vp(n) {
  var a = n.document.documentElement, o = $t(n).on("dragstart.drag", ii, zo);
  "onselectstart" in a ? o.on("selectstart.drag", ii, zo) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function Xp(n, a) {
  var o = n.document.documentElement, u = $t(n).on("dragstart.drag", null);
  a && (u.on("click.drag", ii, zo), setTimeout(function() {
    u.on("click.drag", null);
  }, 0)), "onselectstart" in o ? u.on("selectstart.drag", null) : (o.style.MozUserSelect = o.__noselect, delete o.__noselect);
}
const dr = (n) => () => n;
function qf(n, {
  sourceEvent: a,
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
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
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
qf.prototype.on = function() {
  var n = this._.on.apply(this._, arguments);
  return n === this._ ? this : n;
};
function Z_(n) {
  return !n.ctrlKey && !n.button;
}
function G_() {
  return this.parentNode;
}
function Q_(n, a) {
  return a ?? { x: n.x, y: n.y };
}
function K_() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function $p() {
  var n = Z_, a = G_, o = Q_, u = K_, s = {}, f = Lr("start", "drag", "end"), d = 0, g, p, h, b, y = 0;
  function v(N) {
    N.on("mousedown.drag", S).filter(u).on("touchstart.drag", C).on("touchmove.drag", M, $_).on("touchend.drag touchcancel.drag", q).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function S(N, j) {
    if (!(b || !n.call(this, N, j))) {
      var R = _(this, a.call(this, N, j), N, j, "mouse");
      R && ($t(N.view).on("mousemove.drag", w, zo).on("mouseup.drag", A, zo), Vp(N.view), Ef(N), h = !1, g = N.clientX, p = N.clientY, R("start", N));
    }
  }
  function w(N) {
    if (ii(N), !h) {
      var j = N.clientX - g, R = N.clientY - p;
      h = j * j + R * R > y;
    }
    s.mouse("drag", N);
  }
  function A(N) {
    $t(N.view).on("mousemove.drag mouseup.drag", null), Xp(N.view, h), ii(N), s.mouse("end", N);
  }
  function C(N, j) {
    if (n.call(this, N, j)) {
      var R = N.changedTouches, B = a.call(this, N, j), X = R.length, J, ue;
      for (J = 0; J < X; ++J)
        (ue = _(this, B, N, j, R[J].identifier, R[J])) && (Ef(N), ue("start", N, R[J]));
    }
  }
  function M(N) {
    var j = N.changedTouches, R = j.length, B, X;
    for (B = 0; B < R; ++B)
      (X = s[j[B].identifier]) && (ii(N), X("drag", N, j[B]));
  }
  function q(N) {
    var j = N.changedTouches, R = j.length, B, X;
    for (b && clearTimeout(b), b = setTimeout(function() {
      b = null;
    }, 500), B = 0; B < R; ++B)
      (X = s[j[B].identifier]) && (Ef(N), X("end", N, j[B]));
  }
  function _(N, j, R, B, X, J) {
    var ue = f.copy(), $ = dn(J || R, j), I, oe, T;
    if ((T = o.call(N, new qf("beforestart", {
      sourceEvent: R,
      target: v,
      identifier: X,
      active: d,
      x: $[0],
      y: $[1],
      dx: 0,
      dy: 0,
      dispatch: ue
    }), B)) != null)
      return I = T.x - $[0] || 0, oe = T.y - $[1] || 0, function V(E, O, L) {
        var Z = $, ne;
        switch (E) {
          case "start":
            s[X] = V, ne = d++;
            break;
          case "end":
            delete s[X], --d;
          // falls through
          case "drag":
            $ = dn(L || O, j), ne = d;
            break;
        }
        ue.call(
          E,
          N,
          new qf(E, {
            sourceEvent: O,
            subject: T,
            target: v,
            identifier: X,
            active: ne,
            x: $[0] + I,
            y: $[1] + oe,
            dx: $[0] - Z[0],
            dy: $[1] - Z[1],
            dispatch: ue
          }),
          B
        );
      };
  }
  return v.filter = function(N) {
    return arguments.length ? (n = typeof N == "function" ? N : dr(!!N), v) : n;
  }, v.container = function(N) {
    return arguments.length ? (a = typeof N == "function" ? N : dr(N), v) : a;
  }, v.subject = function(N) {
    return arguments.length ? (o = typeof N == "function" ? N : dr(N), v) : o;
  }, v.touchable = function(N) {
    return arguments.length ? (u = typeof N == "function" ? N : dr(!!N), v) : u;
  }, v.on = function() {
    var N = f.on.apply(f, arguments);
    return N === f ? v : N;
  }, v.clickDistance = function(N) {
    return arguments.length ? (y = (N = +N) * N, v) : Math.sqrt(y);
  }, v;
}
function td(n, a, o) {
  n.prototype = a.prototype = o, o.constructor = n;
}
function Zp(n, a) {
  var o = Object.create(n.prototype);
  for (var u in a) o[u] = a[u];
  return o;
}
function Uo() {
}
var Mo = 0.7, Cr = 1 / Mo, oi = "\\s*([+-]?\\d+)\\s*", No = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Mn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", J_ = /^#([0-9a-f]{3,8})$/, F_ = new RegExp(`^rgb\\(${oi},${oi},${oi}\\)$`), W_ = new RegExp(`^rgb\\(${Mn},${Mn},${Mn}\\)$`), I_ = new RegExp(`^rgba\\(${oi},${oi},${oi},${No}\\)$`), P_ = new RegExp(`^rgba\\(${Mn},${Mn},${Mn},${No}\\)$`), eS = new RegExp(`^hsl\\(${No},${Mn},${Mn}\\)$`), tS = new RegExp(`^hsla\\(${No},${Mn},${Mn},${No}\\)$`), g0 = {
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
td(Uo, ua, {
  copy(n) {
    return Object.assign(new this.constructor(), this, n);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: m0,
  // Deprecated! Use color.formatHex.
  formatHex: m0,
  formatHex8: nS,
  formatHsl: lS,
  formatRgb: p0,
  toString: p0
});
function m0() {
  return this.rgb().formatHex();
}
function nS() {
  return this.rgb().formatHex8();
}
function lS() {
  return Gp(this).formatHsl();
}
function p0() {
  return this.rgb().formatRgb();
}
function ua(n) {
  var a, o;
  return n = (n + "").trim().toLowerCase(), (a = J_.exec(n)) ? (o = a[1].length, a = parseInt(a[1], 16), o === 6 ? y0(a) : o === 3 ? new Ht(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : o === 8 ? hr(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : o === 4 ? hr(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = F_.exec(n)) ? new Ht(a[1], a[2], a[3], 1) : (a = W_.exec(n)) ? new Ht(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = I_.exec(n)) ? hr(a[1], a[2], a[3], a[4]) : (a = P_.exec(n)) ? hr(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = eS.exec(n)) ? x0(a[1], a[2] / 100, a[3] / 100, 1) : (a = tS.exec(n)) ? x0(a[1], a[2] / 100, a[3] / 100, a[4]) : g0.hasOwnProperty(n) ? y0(g0[n]) : n === "transparent" ? new Ht(NaN, NaN, NaN, 0) : null;
}
function y0(n) {
  return new Ht(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function hr(n, a, o, u) {
  return u <= 0 && (n = a = o = NaN), new Ht(n, a, o, u);
}
function aS(n) {
  return n instanceof Uo || (n = ua(n)), n ? (n = n.rgb(), new Ht(n.r, n.g, n.b, n.opacity)) : new Ht();
}
function jf(n, a, o, u) {
  return arguments.length === 1 ? aS(n) : new Ht(n, a, o, u ?? 1);
}
function Ht(n, a, o, u) {
  this.r = +n, this.g = +a, this.b = +o, this.opacity = +u;
}
td(Ht, jf, Zp(Uo, {
  brighter(n) {
    return n = n == null ? Cr : Math.pow(Cr, n), new Ht(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? Mo : Math.pow(Mo, n), new Ht(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ht(aa(this.r), aa(this.g), aa(this.b), Ar(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: v0,
  // Deprecated! Use color.formatHex.
  formatHex: v0,
  formatHex8: iS,
  formatRgb: b0,
  toString: b0
}));
function v0() {
  return `#${na(this.r)}${na(this.g)}${na(this.b)}`;
}
function iS() {
  return `#${na(this.r)}${na(this.g)}${na(this.b)}${na((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function b0() {
  const n = Ar(this.opacity);
  return `${n === 1 ? "rgb(" : "rgba("}${aa(this.r)}, ${aa(this.g)}, ${aa(this.b)}${n === 1 ? ")" : `, ${n})`}`;
}
function Ar(n) {
  return isNaN(n) ? 1 : Math.max(0, Math.min(1, n));
}
function aa(n) {
  return Math.max(0, Math.min(255, Math.round(n) || 0));
}
function na(n) {
  return n = aa(n), (n < 16 ? "0" : "") + n.toString(16);
}
function x0(n, a, o, u) {
  return u <= 0 ? n = a = o = NaN : o <= 0 || o >= 1 ? n = a = NaN : a <= 0 && (n = NaN), new hn(n, a, o, u);
}
function Gp(n) {
  if (n instanceof hn) return new hn(n.h, n.s, n.l, n.opacity);
  if (n instanceof Uo || (n = ua(n)), !n) return new hn();
  if (n instanceof hn) return n;
  n = n.rgb();
  var a = n.r / 255, o = n.g / 255, u = n.b / 255, s = Math.min(a, o, u), f = Math.max(a, o, u), d = NaN, g = f - s, p = (f + s) / 2;
  return g ? (a === f ? d = (o - u) / g + (o < u) * 6 : o === f ? d = (u - a) / g + 2 : d = (a - o) / g + 4, g /= p < 0.5 ? f + s : 2 - f - s, d *= 60) : g = p > 0 && p < 1 ? 0 : d, new hn(d, g, p, n.opacity);
}
function oS(n, a, o, u) {
  return arguments.length === 1 ? Gp(n) : new hn(n, a, o, u ?? 1);
}
function hn(n, a, o, u) {
  this.h = +n, this.s = +a, this.l = +o, this.opacity = +u;
}
td(hn, oS, Zp(Uo, {
  brighter(n) {
    return n = n == null ? Cr : Math.pow(Cr, n), new hn(this.h, this.s, this.l * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? Mo : Math.pow(Mo, n), new hn(this.h, this.s, this.l * n, this.opacity);
  },
  rgb() {
    var n = this.h % 360 + (this.h < 0) * 360, a = isNaN(n) || isNaN(this.s) ? 0 : this.s, o = this.l, u = o + (o < 0.5 ? o : 1 - o) * a, s = 2 * o - u;
    return new Ht(
      zf(n >= 240 ? n - 240 : n + 120, s, u),
      zf(n, s, u),
      zf(n < 120 ? n + 240 : n - 120, s, u),
      this.opacity
    );
  },
  clamp() {
    return new hn(_0(this.h), gr(this.s), gr(this.l), Ar(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const n = Ar(this.opacity);
    return `${n === 1 ? "hsl(" : "hsla("}${_0(this.h)}, ${gr(this.s) * 100}%, ${gr(this.l) * 100}%${n === 1 ? ")" : `, ${n})`}`;
  }
}));
function _0(n) {
  return n = (n || 0) % 360, n < 0 ? n + 360 : n;
}
function gr(n) {
  return Math.max(0, Math.min(1, n || 0));
}
function zf(n, a, o) {
  return (n < 60 ? a + (o - a) * n / 60 : n < 180 ? o : n < 240 ? a + (o - a) * (240 - n) / 60 : a) * 255;
}
const nd = (n) => () => n;
function uS(n, a) {
  return function(o) {
    return n + o * a;
  };
}
function rS(n, a, o) {
  return n = Math.pow(n, o), a = Math.pow(a, o) - n, o = 1 / o, function(u) {
    return Math.pow(n + u * a, o);
  };
}
function cS(n) {
  return (n = +n) == 1 ? Qp : function(a, o) {
    return o - a ? rS(a, o, n) : nd(isNaN(a) ? o : a);
  };
}
function Qp(n, a) {
  var o = a - n;
  return o ? uS(n, o) : nd(isNaN(n) ? a : n);
}
const Tr = (function n(a) {
  var o = cS(a);
  function u(s, f) {
    var d = o((s = jf(s)).r, (f = jf(f)).r), g = o(s.g, f.g), p = o(s.b, f.b), h = Qp(s.opacity, f.opacity);
    return function(b) {
      return s.r = d(b), s.g = g(b), s.b = p(b), s.opacity = h(b), s + "";
    };
  }
  return u.gamma = n, u;
})(1);
function sS(n, a) {
  a || (a = []);
  var o = n ? Math.min(a.length, n.length) : 0, u = a.slice(), s;
  return function(f) {
    for (s = 0; s < o; ++s) u[s] = n[s] * (1 - f) + a[s] * f;
    return u;
  };
}
function fS(n) {
  return ArrayBuffer.isView(n) && !(n instanceof DataView);
}
function dS(n, a) {
  var o = a ? a.length : 0, u = n ? Math.min(o, n.length) : 0, s = new Array(u), f = new Array(o), d;
  for (d = 0; d < u; ++d) s[d] = wo(n[d], a[d]);
  for (; d < o; ++d) f[d] = a[d];
  return function(g) {
    for (d = 0; d < u; ++d) f[d] = s[d](g);
    return f;
  };
}
function hS(n, a) {
  var o = /* @__PURE__ */ new Date();
  return n = +n, a = +a, function(u) {
    return o.setTime(n * (1 - u) + a * u), o;
  };
}
function zn(n, a) {
  return n = +n, a = +a, function(o) {
    return n * (1 - o) + a * o;
  };
}
function gS(n, a) {
  var o = {}, u = {}, s;
  (n === null || typeof n != "object") && (n = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in n ? o[s] = wo(n[s], a[s]) : u[s] = a[s];
  return function(f) {
    for (s in o) u[s] = o[s](f);
    return u;
  };
}
var Yf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Mf = new RegExp(Yf.source, "g");
function mS(n) {
  return function() {
    return n;
  };
}
function pS(n) {
  return function(a) {
    return n(a) + "";
  };
}
function Kp(n, a) {
  var o = Yf.lastIndex = Mf.lastIndex = 0, u, s, f, d = -1, g = [], p = [];
  for (n = n + "", a = a + ""; (u = Yf.exec(n)) && (s = Mf.exec(a)); )
    (f = s.index) > o && (f = a.slice(o, f), g[d] ? g[d] += f : g[++d] = f), (u = u[0]) === (s = s[0]) ? g[d] ? g[d] += s : g[++d] = s : (g[++d] = null, p.push({ i: d, x: zn(u, s) })), o = Mf.lastIndex;
  return o < a.length && (f = a.slice(o), g[d] ? g[d] += f : g[++d] = f), g.length < 2 ? p[0] ? pS(p[0].x) : mS(a) : (a = p.length, function(h) {
    for (var b = 0, y; b < a; ++b) g[(y = p[b]).i] = y.x(h);
    return g.join("");
  });
}
function wo(n, a) {
  var o = typeof a, u;
  return a == null || o === "boolean" ? nd(a) : (o === "number" ? zn : o === "string" ? (u = ua(a)) ? (a = u, Tr) : Kp : a instanceof ua ? Tr : a instanceof Date ? hS : fS(a) ? sS : Array.isArray(a) ? dS : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? gS : zn)(n, a);
}
var S0 = 180 / Math.PI, Lf = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Jp(n, a, o, u, s, f) {
  var d, g, p;
  return (d = Math.sqrt(n * n + a * a)) && (n /= d, a /= d), (p = n * o + a * u) && (o -= n * p, u -= a * p), (g = Math.sqrt(o * o + u * u)) && (o /= g, u /= g, p /= g), n * u < a * o && (n = -n, a = -a, p = -p, d = -d), {
    translateX: s,
    translateY: f,
    rotate: Math.atan2(a, n) * S0,
    skewX: Math.atan(p) * S0,
    scaleX: d,
    scaleY: g
  };
}
var mr;
function yS(n) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(n + "");
  return a.isIdentity ? Lf : Jp(a.a, a.b, a.c, a.d, a.e, a.f);
}
function vS(n) {
  return n == null || (mr || (mr = document.createElementNS("http://www.w3.org/2000/svg", "g")), mr.setAttribute("transform", n), !(n = mr.transform.baseVal.consolidate())) ? Lf : (n = n.matrix, Jp(n.a, n.b, n.c, n.d, n.e, n.f));
}
function Fp(n, a, o, u) {
  function s(h) {
    return h.length ? h.pop() + " " : "";
  }
  function f(h, b, y, v, S, w) {
    if (h !== y || b !== v) {
      var A = S.push("translate(", null, a, null, o);
      w.push({ i: A - 4, x: zn(h, y) }, { i: A - 2, x: zn(b, v) });
    } else (y || v) && S.push("translate(" + y + a + v + o);
  }
  function d(h, b, y, v) {
    h !== b ? (h - b > 180 ? b += 360 : b - h > 180 && (h += 360), v.push({ i: y.push(s(y) + "rotate(", null, u) - 2, x: zn(h, b) })) : b && y.push(s(y) + "rotate(" + b + u);
  }
  function g(h, b, y, v) {
    h !== b ? v.push({ i: y.push(s(y) + "skewX(", null, u) - 2, x: zn(h, b) }) : b && y.push(s(y) + "skewX(" + b + u);
  }
  function p(h, b, y, v, S, w) {
    if (h !== y || b !== v) {
      var A = S.push(s(S) + "scale(", null, ",", null, ")");
      w.push({ i: A - 4, x: zn(h, y) }, { i: A - 2, x: zn(b, v) });
    } else (y !== 1 || v !== 1) && S.push(s(S) + "scale(" + y + "," + v + ")");
  }
  return function(h, b) {
    var y = [], v = [];
    return h = n(h), b = n(b), f(h.translateX, h.translateY, b.translateX, b.translateY, y, v), d(h.rotate, b.rotate, y, v), g(h.skewX, b.skewX, y, v), p(h.scaleX, h.scaleY, b.scaleX, b.scaleY, y, v), h = b = null, function(S) {
      for (var w = -1, A = v.length, C; ++w < A; ) y[(C = v[w]).i] = C.x(S);
      return y.join("");
    };
  };
}
var bS = Fp(yS, "px, ", "px)", "deg)"), xS = Fp(vS, ", ", ")", ")"), _S = 1e-12;
function w0(n) {
  return ((n = Math.exp(n)) + 1 / n) / 2;
}
function SS(n) {
  return ((n = Math.exp(n)) - 1 / n) / 2;
}
function wS(n) {
  return ((n = Math.exp(2 * n)) - 1) / (n + 1);
}
const wr = (function n(a, o, u) {
  function s(f, d) {
    var g = f[0], p = f[1], h = f[2], b = d[0], y = d[1], v = d[2], S = b - g, w = y - p, A = S * S + w * w, C, M;
    if (A < _S)
      M = Math.log(v / h) / a, C = function(B) {
        return [
          g + B * S,
          p + B * w,
          h * Math.exp(a * B * M)
        ];
      };
    else {
      var q = Math.sqrt(A), _ = (v * v - h * h + u * A) / (2 * h * o * q), N = (v * v - h * h - u * A) / (2 * v * o * q), j = Math.log(Math.sqrt(_ * _ + 1) - _), R = Math.log(Math.sqrt(N * N + 1) - N);
      M = (R - j) / a, C = function(B) {
        var X = B * M, J = w0(j), ue = h / (o * q) * (J * wS(a * X + j) - SS(j));
        return [
          g + ue * S,
          p + ue * w,
          h * J / w0(a * X + j)
        ];
      };
    }
    return C.duration = M * 1e3 * a / Math.SQRT2, C;
  }
  return s.rho = function(f) {
    var d = Math.max(1e-3, +f), g = d * d, p = g * g;
    return n(d, g, p);
  }, s;
})(Math.SQRT2, 2, 4);
var ci = 0, xo = 0, yo = 0, Wp = 1e3, Dr, _o, Or = 0, ra = 0, Xr = 0, Co = typeof performance == "object" && performance.now ? performance : Date, Ip = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(n) {
  setTimeout(n, 17);
};
function ld() {
  return ra || (Ip(ES), ra = Co.now() + Xr);
}
function ES() {
  ra = 0;
}
function Rr() {
  this._call = this._time = this._next = null;
}
Rr.prototype = Pp.prototype = {
  constructor: Rr,
  restart: function(n, a, o) {
    if (typeof n != "function") throw new TypeError("callback is not a function");
    o = (o == null ? ld() : +o) + (a == null ? 0 : +a), !this._next && _o !== this && (_o ? _o._next = this : Dr = this, _o = this), this._call = n, this._time = o, Vf();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Vf());
  }
};
function Pp(n, a, o) {
  var u = new Rr();
  return u.restart(n, a, o), u;
}
function zS() {
  ld(), ++ci;
  for (var n = Dr, a; n; )
    (a = ra - n._time) >= 0 && n._call.call(void 0, a), n = n._next;
  --ci;
}
function E0() {
  ra = (Or = Co.now()) + Xr, ci = xo = 0;
  try {
    zS();
  } finally {
    ci = 0, NS(), ra = 0;
  }
}
function MS() {
  var n = Co.now(), a = n - Or;
  a > Wp && (Xr -= a, Or = n);
}
function NS() {
  for (var n, a = Dr, o, u = 1 / 0; a; )
    a._call ? (u > a._time && (u = a._time), n = a, a = a._next) : (o = a._next, a._next = null, a = n ? n._next = o : Dr = o);
  _o = n, Vf(u);
}
function Vf(n) {
  if (!ci) {
    xo && (xo = clearTimeout(xo));
    var a = n - ra;
    a > 24 ? (n < 1 / 0 && (xo = setTimeout(E0, n - Co.now() - Xr)), yo && (yo = clearInterval(yo))) : (yo || (Or = Co.now(), yo = setInterval(MS, Wp)), ci = 1, Ip(E0));
  }
}
function z0(n, a, o) {
  var u = new Rr();
  return a = a == null ? 0 : +a, u.restart((s) => {
    u.stop(), n(s + a);
  }, a, o), u;
}
var CS = Lr("start", "end", "cancel", "interrupt"), AS = [], ey = 0, M0 = 1, Xf = 2, Er = 3, N0 = 4, $f = 5, zr = 6;
function $r(n, a, o, u, s, f) {
  var d = n.__transition;
  if (!d) n.__transition = {};
  else if (o in d) return;
  TS(n, o, {
    name: a,
    index: u,
    // For context during callback.
    group: s,
    // For context during callback.
    on: CS,
    tween: AS,
    time: f.time,
    delay: f.delay,
    duration: f.duration,
    ease: f.ease,
    timer: null,
    state: ey
  });
}
function ad(n, a) {
  var o = vn(n, a);
  if (o.state > ey) throw new Error("too late; already scheduled");
  return o;
}
function Nn(n, a) {
  var o = vn(n, a);
  if (o.state > Er) throw new Error("too late; already running");
  return o;
}
function vn(n, a) {
  var o = n.__transition;
  if (!o || !(o = o[a])) throw new Error("transition not found");
  return o;
}
function TS(n, a, o) {
  var u = n.__transition, s;
  u[a] = o, o.timer = Pp(f, 0, o.time);
  function f(h) {
    o.state = M0, o.timer.restart(d, o.delay, o.time), o.delay <= h && d(h - o.delay);
  }
  function d(h) {
    var b, y, v, S;
    if (o.state !== M0) return p();
    for (b in u)
      if (S = u[b], S.name === o.name) {
        if (S.state === Er) return z0(d);
        S.state === N0 ? (S.state = zr, S.timer.stop(), S.on.call("interrupt", n, n.__data__, S.index, S.group), delete u[b]) : +b < a && (S.state = zr, S.timer.stop(), S.on.call("cancel", n, n.__data__, S.index, S.group), delete u[b]);
      }
    if (z0(function() {
      o.state === Er && (o.state = N0, o.timer.restart(g, o.delay, o.time), g(h));
    }), o.state = Xf, o.on.call("start", n, n.__data__, o.index, o.group), o.state === Xf) {
      for (o.state = Er, s = new Array(v = o.tween.length), b = 0, y = -1; b < v; ++b)
        (S = o.tween[b].value.call(n, n.__data__, o.index, o.group)) && (s[++y] = S);
      s.length = y + 1;
    }
  }
  function g(h) {
    for (var b = h < o.duration ? o.ease.call(null, h / o.duration) : (o.timer.restart(p), o.state = $f, 1), y = -1, v = s.length; ++y < v; )
      s[y].call(n, b);
    o.state === $f && (o.on.call("end", n, n.__data__, o.index, o.group), p());
  }
  function p() {
    o.state = zr, o.timer.stop(), delete u[a];
    for (var h in u) return;
    delete n.__transition;
  }
}
function Mr(n, a) {
  var o = n.__transition, u, s, f = !0, d;
  if (o) {
    a = a == null ? null : a + "";
    for (d in o) {
      if ((u = o[d]).name !== a) {
        f = !1;
        continue;
      }
      s = u.state > Xf && u.state < $f, u.state = zr, u.timer.stop(), u.on.call(s ? "interrupt" : "cancel", n, n.__data__, u.index, u.group), delete o[d];
    }
    f && delete n.__transition;
  }
}
function DS(n) {
  return this.each(function() {
    Mr(this, n);
  });
}
function OS(n, a) {
  var o, u;
  return function() {
    var s = Nn(this, n), f = s.tween;
    if (f !== o) {
      u = o = f;
      for (var d = 0, g = u.length; d < g; ++d)
        if (u[d].name === a) {
          u = u.slice(), u.splice(d, 1);
          break;
        }
    }
    s.tween = u;
  };
}
function RS(n, a, o) {
  var u, s;
  if (typeof o != "function") throw new Error();
  return function() {
    var f = Nn(this, n), d = f.tween;
    if (d !== u) {
      s = (u = d).slice();
      for (var g = { name: a, value: o }, p = 0, h = s.length; p < h; ++p)
        if (s[p].name === a) {
          s[p] = g;
          break;
        }
      p === h && s.push(g);
    }
    f.tween = s;
  };
}
function HS(n, a) {
  var o = this._id;
  if (n += "", arguments.length < 2) {
    for (var u = vn(this.node(), o).tween, s = 0, f = u.length, d; s < f; ++s)
      if ((d = u[s]).name === n)
        return d.value;
    return null;
  }
  return this.each((a == null ? OS : RS)(o, n, a));
}
function id(n, a, o) {
  var u = n._id;
  return n.each(function() {
    var s = Nn(this, u);
    (s.value || (s.value = {}))[a] = o.apply(this, arguments);
  }), function(s) {
    return vn(s, u).value[a];
  };
}
function ty(n, a) {
  var o;
  return (typeof a == "number" ? zn : a instanceof ua ? Tr : (o = ua(a)) ? (a = o, Tr) : Kp)(n, a);
}
function kS(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function BS(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function US(n, a, o) {
  var u, s = o + "", f;
  return function() {
    var d = this.getAttribute(n);
    return d === s ? null : d === u ? f : f = a(u = d, o);
  };
}
function qS(n, a, o) {
  var u, s = o + "", f;
  return function() {
    var d = this.getAttributeNS(n.space, n.local);
    return d === s ? null : d === u ? f : f = a(u = d, o);
  };
}
function jS(n, a, o) {
  var u, s, f;
  return function() {
    var d, g = o(this), p;
    return g == null ? void this.removeAttribute(n) : (d = this.getAttribute(n), p = g + "", d === p ? null : d === u && p === s ? f : (s = p, f = a(u = d, g)));
  };
}
function YS(n, a, o) {
  var u, s, f;
  return function() {
    var d, g = o(this), p;
    return g == null ? void this.removeAttributeNS(n.space, n.local) : (d = this.getAttributeNS(n.space, n.local), p = g + "", d === p ? null : d === u && p === s ? f : (s = p, f = a(u = d, g)));
  };
}
function LS(n, a) {
  var o = Vr(n), u = o === "transform" ? xS : ty;
  return this.attrTween(n, typeof a == "function" ? (o.local ? YS : jS)(o, u, id(this, "attr." + n, a)) : a == null ? (o.local ? BS : kS)(o) : (o.local ? qS : US)(o, u, a));
}
function VS(n, a) {
  return function(o) {
    this.setAttribute(n, a.call(this, o));
  };
}
function XS(n, a) {
  return function(o) {
    this.setAttributeNS(n.space, n.local, a.call(this, o));
  };
}
function $S(n, a) {
  var o, u;
  function s() {
    var f = a.apply(this, arguments);
    return f !== u && (o = (u = f) && XS(n, f)), o;
  }
  return s._value = a, s;
}
function ZS(n, a) {
  var o, u;
  function s() {
    var f = a.apply(this, arguments);
    return f !== u && (o = (u = f) && VS(n, f)), o;
  }
  return s._value = a, s;
}
function GS(n, a) {
  var o = "attr." + n;
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (a == null) return this.tween(o, null);
  if (typeof a != "function") throw new Error();
  var u = Vr(n);
  return this.tween(o, (u.local ? $S : ZS)(u, a));
}
function QS(n, a) {
  return function() {
    ad(this, n).delay = +a.apply(this, arguments);
  };
}
function KS(n, a) {
  return a = +a, function() {
    ad(this, n).delay = a;
  };
}
function JS(n) {
  var a = this._id;
  return arguments.length ? this.each((typeof n == "function" ? QS : KS)(a, n)) : vn(this.node(), a).delay;
}
function FS(n, a) {
  return function() {
    Nn(this, n).duration = +a.apply(this, arguments);
  };
}
function WS(n, a) {
  return a = +a, function() {
    Nn(this, n).duration = a;
  };
}
function IS(n) {
  var a = this._id;
  return arguments.length ? this.each((typeof n == "function" ? FS : WS)(a, n)) : vn(this.node(), a).duration;
}
function PS(n, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    Nn(this, n).ease = a;
  };
}
function ew(n) {
  var a = this._id;
  return arguments.length ? this.each(PS(a, n)) : vn(this.node(), a).ease;
}
function tw(n, a) {
  return function() {
    var o = a.apply(this, arguments);
    if (typeof o != "function") throw new Error();
    Nn(this, n).ease = o;
  };
}
function nw(n) {
  if (typeof n != "function") throw new Error();
  return this.each(tw(this._id, n));
}
function lw(n) {
  typeof n != "function" && (n = Op(n));
  for (var a = this._groups, o = a.length, u = new Array(o), s = 0; s < o; ++s)
    for (var f = a[s], d = f.length, g = u[s] = [], p, h = 0; h < d; ++h)
      (p = f[h]) && n.call(p, p.__data__, h, f) && g.push(p);
  return new Pn(u, this._parents, this._name, this._id);
}
function aw(n) {
  if (n._id !== this._id) throw new Error();
  for (var a = this._groups, o = n._groups, u = a.length, s = o.length, f = Math.min(u, s), d = new Array(u), g = 0; g < f; ++g)
    for (var p = a[g], h = o[g], b = p.length, y = d[g] = new Array(b), v, S = 0; S < b; ++S)
      (v = p[S] || h[S]) && (y[S] = v);
  for (; g < u; ++g)
    d[g] = a[g];
  return new Pn(d, this._parents, this._name, this._id);
}
function iw(n) {
  return (n + "").trim().split(/^|\s+/).every(function(a) {
    var o = a.indexOf(".");
    return o >= 0 && (a = a.slice(0, o)), !a || a === "start";
  });
}
function ow(n, a, o) {
  var u, s, f = iw(a) ? ad : Nn;
  return function() {
    var d = f(this, n), g = d.on;
    g !== u && (s = (u = g).copy()).on(a, o), d.on = s;
  };
}
function uw(n, a) {
  var o = this._id;
  return arguments.length < 2 ? vn(this.node(), o).on.on(n) : this.each(ow(o, n, a));
}
function rw(n) {
  return function() {
    var a = this.parentNode;
    for (var o in this.__transition) if (+o !== n) return;
    a && a.removeChild(this);
  };
}
function cw() {
  return this.on("end.remove", rw(this._id));
}
function sw(n) {
  var a = this._name, o = this._id;
  typeof n != "function" && (n = Pf(n));
  for (var u = this._groups, s = u.length, f = new Array(s), d = 0; d < s; ++d)
    for (var g = u[d], p = g.length, h = f[d] = new Array(p), b, y, v = 0; v < p; ++v)
      (b = g[v]) && (y = n.call(b, b.__data__, v, g)) && ("__data__" in b && (y.__data__ = b.__data__), h[v] = y, $r(h[v], a, o, v, h, vn(b, o)));
  return new Pn(f, this._parents, a, o);
}
function fw(n) {
  var a = this._name, o = this._id;
  typeof n != "function" && (n = Dp(n));
  for (var u = this._groups, s = u.length, f = [], d = [], g = 0; g < s; ++g)
    for (var p = u[g], h = p.length, b, y = 0; y < h; ++y)
      if (b = p[y]) {
        for (var v = n.call(b, b.__data__, y, p), S, w = vn(b, o), A = 0, C = v.length; A < C; ++A)
          (S = v[A]) && $r(S, a, o, A, v, w);
        f.push(v), d.push(b);
      }
  return new Pn(f, d, a, o);
}
var dw = Bo.prototype.constructor;
function hw() {
  return new dw(this._groups, this._parents);
}
function gw(n, a) {
  var o, u, s;
  return function() {
    var f = ri(this, n), d = (this.style.removeProperty(n), ri(this, n));
    return f === d ? null : f === o && d === u ? s : s = a(o = f, u = d);
  };
}
function ny(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function mw(n, a, o) {
  var u, s = o + "", f;
  return function() {
    var d = ri(this, n);
    return d === s ? null : d === u ? f : f = a(u = d, o);
  };
}
function pw(n, a, o) {
  var u, s, f;
  return function() {
    var d = ri(this, n), g = o(this), p = g + "";
    return g == null && (p = g = (this.style.removeProperty(n), ri(this, n))), d === p ? null : d === u && p === s ? f : (s = p, f = a(u = d, g));
  };
}
function yw(n, a) {
  var o, u, s, f = "style." + a, d = "end." + f, g;
  return function() {
    var p = Nn(this, n), h = p.on, b = p.value[f] == null ? g || (g = ny(a)) : void 0;
    (h !== o || s !== b) && (u = (o = h).copy()).on(d, s = b), p.on = u;
  };
}
function vw(n, a, o) {
  var u = (n += "") == "transform" ? bS : ty;
  return a == null ? this.styleTween(n, gw(n, u)).on("end.style." + n, ny(n)) : typeof a == "function" ? this.styleTween(n, pw(n, u, id(this, "style." + n, a))).each(yw(this._id, n)) : this.styleTween(n, mw(n, u, a), o).on("end.style." + n, null);
}
function bw(n, a, o) {
  return function(u) {
    this.style.setProperty(n, a.call(this, u), o);
  };
}
function xw(n, a, o) {
  var u, s;
  function f() {
    var d = a.apply(this, arguments);
    return d !== s && (u = (s = d) && bw(n, d, o)), u;
  }
  return f._value = a, f;
}
function _w(n, a, o) {
  var u = "style." + (n += "");
  if (arguments.length < 2) return (u = this.tween(u)) && u._value;
  if (a == null) return this.tween(u, null);
  if (typeof a != "function") throw new Error();
  return this.tween(u, xw(n, a, o ?? ""));
}
function Sw(n) {
  return function() {
    this.textContent = n;
  };
}
function ww(n) {
  return function() {
    var a = n(this);
    this.textContent = a ?? "";
  };
}
function Ew(n) {
  return this.tween("text", typeof n == "function" ? ww(id(this, "text", n)) : Sw(n == null ? "" : n + ""));
}
function zw(n) {
  return function(a) {
    this.textContent = n.call(this, a);
  };
}
function Mw(n) {
  var a, o;
  function u() {
    var s = n.apply(this, arguments);
    return s !== o && (a = (o = s) && zw(s)), a;
  }
  return u._value = n, u;
}
function Nw(n) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (n == null) return this.tween(a, null);
  if (typeof n != "function") throw new Error();
  return this.tween(a, Mw(n));
}
function Cw() {
  for (var n = this._name, a = this._id, o = ly(), u = this._groups, s = u.length, f = 0; f < s; ++f)
    for (var d = u[f], g = d.length, p, h = 0; h < g; ++h)
      if (p = d[h]) {
        var b = vn(p, a);
        $r(p, n, o, h, d, {
          time: b.time + b.delay + b.duration,
          delay: 0,
          duration: b.duration,
          ease: b.ease
        });
      }
  return new Pn(u, this._parents, n, o);
}
function Aw() {
  var n, a, o = this, u = o._id, s = o.size();
  return new Promise(function(f, d) {
    var g = { value: d }, p = { value: function() {
      --s === 0 && f();
    } };
    o.each(function() {
      var h = Nn(this, u), b = h.on;
      b !== n && (a = (n = b).copy(), a._.cancel.push(g), a._.interrupt.push(g), a._.end.push(p)), h.on = a;
    }), s === 0 && f();
  });
}
var Tw = 0;
function Pn(n, a, o, u) {
  this._groups = n, this._parents = a, this._name = o, this._id = u;
}
function ly() {
  return ++Tw;
}
var Jn = Bo.prototype;
Pn.prototype = {
  constructor: Pn,
  select: sw,
  selectAll: fw,
  selectChild: Jn.selectChild,
  selectChildren: Jn.selectChildren,
  filter: lw,
  merge: aw,
  selection: hw,
  transition: Cw,
  call: Jn.call,
  nodes: Jn.nodes,
  node: Jn.node,
  size: Jn.size,
  empty: Jn.empty,
  each: Jn.each,
  on: uw,
  attr: LS,
  attrTween: GS,
  style: vw,
  styleTween: _w,
  text: Ew,
  textTween: Nw,
  remove: cw,
  tween: HS,
  delay: JS,
  duration: IS,
  ease: ew,
  easeVarying: nw,
  end: Aw,
  [Symbol.iterator]: Jn[Symbol.iterator]
};
function Dw(n) {
  return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
}
var Ow = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Dw
};
function Rw(n, a) {
  for (var o; !(o = n.__transition) || !(o = o[a]); )
    if (!(n = n.parentNode))
      throw new Error(`transition ${a} not found`);
  return o;
}
function Hw(n) {
  var a, o;
  n instanceof Pn ? (a = n._id, n = n._name) : (a = ly(), (o = Ow).time = ld(), n = n == null ? null : n + "");
  for (var u = this._groups, s = u.length, f = 0; f < s; ++f)
    for (var d = u[f], g = d.length, p, h = 0; h < g; ++h)
      (p = d[h]) && $r(p, n, a, h, d, o || Rw(p, a));
  return new Pn(u, this._parents, n, a);
}
Bo.prototype.interrupt = DS;
Bo.prototype.transition = Hw;
const pr = (n) => () => n;
function kw(n, {
  sourceEvent: a,
  target: o,
  transform: u,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: n, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    transform: { value: u, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function Wn(n, a, o) {
  this.k = n, this.x = a, this.y = o;
}
Wn.prototype = {
  constructor: Wn,
  scale: function(n) {
    return n === 1 ? this : new Wn(this.k * n, this.x, this.y);
  },
  translate: function(n, a) {
    return n === 0 & a === 0 ? this : new Wn(this.k, this.x + this.k * n, this.y + this.k * a);
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
var Zr = new Wn(1, 0, 0);
ay.prototype = Wn.prototype;
function ay(n) {
  for (; !n.__zoom; ) if (!(n = n.parentNode)) return Zr;
  return n.__zoom;
}
function Nf(n) {
  n.stopImmediatePropagation();
}
function vo(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function Bw(n) {
  return (!n.ctrlKey || n.type === "wheel") && !n.button;
}
function Uw() {
  var n = this;
  return n instanceof SVGElement ? (n = n.ownerSVGElement || n, n.hasAttribute("viewBox") ? (n = n.viewBox.baseVal, [[n.x, n.y], [n.x + n.width, n.y + n.height]]) : [[0, 0], [n.width.baseVal.value, n.height.baseVal.value]]) : [[0, 0], [n.clientWidth, n.clientHeight]];
}
function C0() {
  return this.__zoom || Zr;
}
function qw(n) {
  return -n.deltaY * (n.deltaMode === 1 ? 0.05 : n.deltaMode ? 1 : 2e-3) * (n.ctrlKey ? 10 : 1);
}
function jw() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Yw(n, a, o) {
  var u = n.invertX(a[0][0]) - o[0][0], s = n.invertX(a[1][0]) - o[1][0], f = n.invertY(a[0][1]) - o[0][1], d = n.invertY(a[1][1]) - o[1][1];
  return n.translate(
    s > u ? (u + s) / 2 : Math.min(0, u) || Math.max(0, s),
    d > f ? (f + d) / 2 : Math.min(0, f) || Math.max(0, d)
  );
}
function iy() {
  var n = Bw, a = Uw, o = Yw, u = qw, s = jw, f = [0, 1 / 0], d = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], g = 250, p = wr, h = Lr("start", "zoom", "end"), b, y, v, S = 500, w = 150, A = 0, C = 10;
  function M(T) {
    T.property("__zoom", C0).on("wheel.zoom", X, { passive: !1 }).on("mousedown.zoom", J).on("dblclick.zoom", ue).filter(s).on("touchstart.zoom", $).on("touchmove.zoom", I).on("touchend.zoom touchcancel.zoom", oe).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  M.transform = function(T, V, E, O) {
    var L = T.selection ? T.selection() : T;
    L.property("__zoom", C0), T !== L ? j(T, V, E, O) : L.interrupt().each(function() {
      R(this, arguments).event(O).start().zoom(null, typeof V == "function" ? V.apply(this, arguments) : V).end();
    });
  }, M.scaleBy = function(T, V, E, O) {
    M.scaleTo(T, function() {
      var L = this.__zoom.k, Z = typeof V == "function" ? V.apply(this, arguments) : V;
      return L * Z;
    }, E, O);
  }, M.scaleTo = function(T, V, E, O) {
    M.transform(T, function() {
      var L = a.apply(this, arguments), Z = this.__zoom, ne = E == null ? N(L) : typeof E == "function" ? E.apply(this, arguments) : E, z = Z.invert(ne), H = typeof V == "function" ? V.apply(this, arguments) : V;
      return o(_(q(Z, H), ne, z), L, d);
    }, E, O);
  }, M.translateBy = function(T, V, E, O) {
    M.transform(T, function() {
      return o(this.__zoom.translate(
        typeof V == "function" ? V.apply(this, arguments) : V,
        typeof E == "function" ? E.apply(this, arguments) : E
      ), a.apply(this, arguments), d);
    }, null, O);
  }, M.translateTo = function(T, V, E, O, L) {
    M.transform(T, function() {
      var Z = a.apply(this, arguments), ne = this.__zoom, z = O == null ? N(Z) : typeof O == "function" ? O.apply(this, arguments) : O;
      return o(Zr.translate(z[0], z[1]).scale(ne.k).translate(
        typeof V == "function" ? -V.apply(this, arguments) : -V,
        typeof E == "function" ? -E.apply(this, arguments) : -E
      ), Z, d);
    }, O, L);
  };
  function q(T, V) {
    return V = Math.max(f[0], Math.min(f[1], V)), V === T.k ? T : new Wn(V, T.x, T.y);
  }
  function _(T, V, E) {
    var O = V[0] - E[0] * T.k, L = V[1] - E[1] * T.k;
    return O === T.x && L === T.y ? T : new Wn(T.k, O, L);
  }
  function N(T) {
    return [(+T[0][0] + +T[1][0]) / 2, (+T[0][1] + +T[1][1]) / 2];
  }
  function j(T, V, E, O) {
    T.on("start.zoom", function() {
      R(this, arguments).event(O).start();
    }).on("interrupt.zoom end.zoom", function() {
      R(this, arguments).event(O).end();
    }).tween("zoom", function() {
      var L = this, Z = arguments, ne = R(L, Z).event(O), z = a.apply(L, Z), H = E == null ? N(z) : typeof E == "function" ? E.apply(L, Z) : E, P = Math.max(z[1][0] - z[0][0], z[1][1] - z[0][1]), le = L.__zoom, re = typeof V == "function" ? V.apply(L, Z) : V, fe = p(le.invert(H).concat(P / le.k), re.invert(H).concat(P / re.k));
      return function(ce) {
        if (ce === 1) ce = re;
        else {
          var ee = fe(ce), se = P / ee[2];
          ce = new Wn(se, H[0] - ee[0] * se, H[1] - ee[1] * se);
        }
        ne.zoom(null, ce);
      };
    });
  }
  function R(T, V, E) {
    return !E && T.__zooming || new B(T, V);
  }
  function B(T, V) {
    this.that = T, this.args = V, this.active = 0, this.sourceEvent = null, this.extent = a.apply(T, V), this.taps = 0;
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
      var V = $t(this.that).datum();
      h.call(
        T,
        this.that,
        new kw(T, {
          sourceEvent: this.sourceEvent,
          target: M,
          transform: this.that.__zoom,
          dispatch: h
        }),
        V
      );
    }
  };
  function X(T, ...V) {
    if (!n.apply(this, arguments)) return;
    var E = R(this, V).event(T), O = this.__zoom, L = Math.max(f[0], Math.min(f[1], O.k * Math.pow(2, u.apply(this, arguments)))), Z = dn(T);
    if (E.wheel)
      (E.mouse[0][0] !== Z[0] || E.mouse[0][1] !== Z[1]) && (E.mouse[1] = O.invert(E.mouse[0] = Z)), clearTimeout(E.wheel);
    else {
      if (O.k === L) return;
      E.mouse = [Z, O.invert(Z)], Mr(this), E.start();
    }
    vo(T), E.wheel = setTimeout(ne, w), E.zoom("mouse", o(_(q(O, L), E.mouse[0], E.mouse[1]), E.extent, d));
    function ne() {
      E.wheel = null, E.end();
    }
  }
  function J(T, ...V) {
    if (v || !n.apply(this, arguments)) return;
    var E = T.currentTarget, O = R(this, V, !0).event(T), L = $t(T.view).on("mousemove.zoom", H, !0).on("mouseup.zoom", P, !0), Z = dn(T, E), ne = T.clientX, z = T.clientY;
    Vp(T.view), Nf(T), O.mouse = [Z, this.__zoom.invert(Z)], Mr(this), O.start();
    function H(le) {
      if (vo(le), !O.moved) {
        var re = le.clientX - ne, fe = le.clientY - z;
        O.moved = re * re + fe * fe > A;
      }
      O.event(le).zoom("mouse", o(_(O.that.__zoom, O.mouse[0] = dn(le, E), O.mouse[1]), O.extent, d));
    }
    function P(le) {
      L.on("mousemove.zoom mouseup.zoom", null), Xp(le.view, O.moved), vo(le), O.event(le).end();
    }
  }
  function ue(T, ...V) {
    if (n.apply(this, arguments)) {
      var E = this.__zoom, O = dn(T.changedTouches ? T.changedTouches[0] : T, this), L = E.invert(O), Z = E.k * (T.shiftKey ? 0.5 : 2), ne = o(_(q(E, Z), O, L), a.apply(this, V), d);
      vo(T), g > 0 ? $t(this).transition().duration(g).call(j, ne, O, T) : $t(this).call(M.transform, ne, O, T);
    }
  }
  function $(T, ...V) {
    if (n.apply(this, arguments)) {
      var E = T.touches, O = E.length, L = R(this, V, T.changedTouches.length === O).event(T), Z, ne, z, H;
      for (Nf(T), ne = 0; ne < O; ++ne)
        z = E[ne], H = dn(z, this), H = [H, this.__zoom.invert(H), z.identifier], L.touch0 ? !L.touch1 && L.touch0[2] !== H[2] && (L.touch1 = H, L.taps = 0) : (L.touch0 = H, Z = !0, L.taps = 1 + !!b);
      b && (b = clearTimeout(b)), Z && (L.taps < 2 && (y = H[0], b = setTimeout(function() {
        b = null;
      }, S)), Mr(this), L.start());
    }
  }
  function I(T, ...V) {
    if (this.__zooming) {
      var E = R(this, V).event(T), O = T.changedTouches, L = O.length, Z, ne, z, H;
      for (vo(T), Z = 0; Z < L; ++Z)
        ne = O[Z], z = dn(ne, this), E.touch0 && E.touch0[2] === ne.identifier ? E.touch0[0] = z : E.touch1 && E.touch1[2] === ne.identifier && (E.touch1[0] = z);
      if (ne = E.that.__zoom, E.touch1) {
        var P = E.touch0[0], le = E.touch0[1], re = E.touch1[0], fe = E.touch1[1], ce = (ce = re[0] - P[0]) * ce + (ce = re[1] - P[1]) * ce, ee = (ee = fe[0] - le[0]) * ee + (ee = fe[1] - le[1]) * ee;
        ne = q(ne, Math.sqrt(ce / ee)), z = [(P[0] + re[0]) / 2, (P[1] + re[1]) / 2], H = [(le[0] + fe[0]) / 2, (le[1] + fe[1]) / 2];
      } else if (E.touch0) z = E.touch0[0], H = E.touch0[1];
      else return;
      E.zoom("touch", o(_(ne, z, H), E.extent, d));
    }
  }
  function oe(T, ...V) {
    if (this.__zooming) {
      var E = R(this, V).event(T), O = T.changedTouches, L = O.length, Z, ne;
      for (Nf(T), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, S), Z = 0; Z < L; ++Z)
        ne = O[Z], E.touch0 && E.touch0[2] === ne.identifier ? delete E.touch0 : E.touch1 && E.touch1[2] === ne.identifier && delete E.touch1;
      if (E.touch1 && !E.touch0 && (E.touch0 = E.touch1, delete E.touch1), E.touch0) E.touch0[1] = this.__zoom.invert(E.touch0[0]);
      else if (E.end(), E.taps === 2 && (ne = dn(ne, this), Math.hypot(y[0] - ne[0], y[1] - ne[1]) < C)) {
        var z = $t(this).on("dblclick.zoom");
        z && z.apply(this, arguments);
      }
    }
  }
  return M.wheelDelta = function(T) {
    return arguments.length ? (u = typeof T == "function" ? T : pr(+T), M) : u;
  }, M.filter = function(T) {
    return arguments.length ? (n = typeof T == "function" ? T : pr(!!T), M) : n;
  }, M.touchable = function(T) {
    return arguments.length ? (s = typeof T == "function" ? T : pr(!!T), M) : s;
  }, M.extent = function(T) {
    return arguments.length ? (a = typeof T == "function" ? T : pr([[+T[0][0], +T[0][1]], [+T[1][0], +T[1][1]]]), M) : a;
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
    return arguments.length ? (C = +T, M) : C;
  }, M;
}
const yn = {
  error001: (n = "react") => `Seems like you have not used ${n === "svelte" ? "SvelteFlowProvider" : "ReactFlowProvider"} as an ancestor. Help: https://${n}flow.dev/error#001`,
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (n) => `Node type "${n}" not found. Using fallback type "default".`,
  error004: () => "The parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (n) => `The old edge with id=${n} does not exist.`,
  error009: (n) => `Marker type "${n}" doesn't exist.`,
  error008: (n, { id: a, sourceHandle: o, targetHandle: u }) => `Couldn't create edge for ${n} handle id: "${n === "source" ? o : u}", edge id: ${a}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (n) => `Edge type "${n}" not found. Using fallback type "default".`,
  error012: (n) => `Node with id "${n}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (n = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${n}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (n) => `Edge with id "${n}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, Ao = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], oy = ["Enter", " ", "Escape"], uy = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: n, x: a, y: o }) => `Moved selected node ${n}. New position, x: ${a}, y: ${o}`,
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
var si;
(function(n) {
  n.Strict = "strict", n.Loose = "loose";
})(si || (si = {}));
var ia;
(function(n) {
  n.Free = "free", n.Vertical = "vertical", n.Horizontal = "horizontal";
})(ia || (ia = {}));
var To;
(function(n) {
  n.Partial = "partial", n.Full = "full";
})(To || (To = {}));
const ry = {
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
var Ol;
(function(n) {
  n.Bezier = "default", n.Straight = "straight", n.Step = "step", n.SmoothStep = "smoothstep", n.SimpleBezier = "simplebezier";
})(Ol || (Ol = {}));
var Hr;
(function(n) {
  n.Arrow = "arrow", n.ArrowClosed = "arrowclosed";
})(Hr || (Hr = {}));
var me;
(function(n) {
  n.Left = "left", n.Top = "top", n.Right = "right", n.Bottom = "bottom";
})(me || (me = {}));
const A0 = {
  [me.Left]: me.Right,
  [me.Right]: me.Left,
  [me.Top]: me.Bottom,
  [me.Bottom]: me.Top
};
function cy(n) {
  return n === null ? null : n ? "valid" : "invalid";
}
const sy = (n) => "id" in n && "source" in n && "target" in n, Lw = (n) => "id" in n && "position" in n && !("source" in n) && !("target" in n), od = (n) => "id" in n && "internals" in n && !("source" in n) && !("target" in n), qo = (n, a = [0, 0]) => {
  const { width: o, height: u } = el(n), s = n.origin ?? a, f = o * s[0], d = u * s[1];
  return {
    x: n.position.x - f,
    y: n.position.y - d
  };
}, Vw = (n, a = { nodeOrigin: [0, 0] }) => {
  if (n.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const o = n.reduce((u, s) => {
    const f = typeof s == "string";
    let d = !a.nodeLookup && !f ? s : void 0;
    a.nodeLookup && (d = f ? a.nodeLookup.get(s) : od(s) ? s : a.nodeLookup.get(s.id));
    const g = d ? kr(d, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return Gr(u, g);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Qr(o);
}, jo = (n, a = {}) => {
  let o = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, u = !1;
  return n.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (o = Gr(o, kr(s)), u = !0);
  }), u ? Qr(o) : { x: 0, y: 0, width: 0, height: 0 };
}, ud = (n, a, [o, u, s] = [0, 0, 1], f = !1, d = !1) => {
  const g = (a.x - o) / s, p = (a.y - u) / s, h = a.width / s, b = a.height / s, y = [];
  for (const v of n.values()) {
    const { measured: S, selectable: w = !0, hidden: A = !1 } = v;
    if (d && !w || A)
      continue;
    const C = S.width ?? v.width ?? v.initialWidth ?? 0, M = S.height ?? v.height ?? v.initialHeight ?? 0, { x: q, y: _ } = v.internals.positionAbsolute, N = gy(g, p, h, b, q, _, C, M), j = C * M, R = f && N > 0;
    (!v.internals.handleBounds || R || N >= j || v.dragging) && y.push(v);
  }
  return y;
}, Xw = (n, a) => {
  const o = /* @__PURE__ */ new Set();
  return n.forEach((u) => {
    o.add(u.id);
  }), a.filter((u) => o.has(u.source) || o.has(u.target));
};
function $w(n, a) {
  const o = /* @__PURE__ */ new Map(), u = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return n.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!u || u.has(s.id)) && o.set(s.id, s);
  }), o;
}
async function Zw({ nodes: n, width: a, height: o, panZoom: u, minZoom: s, maxZoom: f }, d) {
  if (n.size === 0)
    return !0;
  const g = $w(n, d), p = jo(g), h = cd(p, a, o, d?.minZoom ?? s, d?.maxZoom ?? f, d?.padding ?? 0.1);
  return await u.setViewport(h, {
    duration: d?.duration,
    ease: d?.ease,
    interpolate: d?.interpolate
  }), !0;
}
function fy({ nodeId: n, nextPosition: a, nodeLookup: o, nodeOrigin: u = [0, 0], nodeExtent: s, onError: f }) {
  const d = o.get(n), g = d.parentId ? o.get(d.parentId) : void 0, { x: p, y: h } = g ? g.internals.positionAbsolute : { x: 0, y: 0 }, b = d.origin ?? u;
  let y = d.extent || s;
  if (d.extent === "parent" && !d.expandParent)
    if (!g)
      f?.("005", yn.error005());
    else {
      const S = g.measured.width, w = g.measured.height;
      S && w && (y = [
        [p, h],
        [p + S, h + w]
      ]);
    }
  else g && sa(d.extent) && (y = [
    [d.extent[0][0] + p, d.extent[0][1] + h],
    [d.extent[1][0] + p, d.extent[1][1] + h]
  ]);
  const v = sa(y) ? ca(a, y, d.measured) : a;
  return (d.measured.width === void 0 || d.measured.height === void 0) && f?.("015", yn.error015()), {
    position: {
      x: v.x - p + (d.measured.width ?? 0) * b[0],
      y: v.y - h + (d.measured.height ?? 0) * b[1]
    },
    positionAbsolute: v
  };
}
async function Gw({ nodesToRemove: n = [], edgesToRemove: a = [], nodes: o, edges: u, onBeforeDelete: s }) {
  const f = new Set(n.map((v) => v.id)), d = [];
  for (const v of o) {
    if (v.deletable === !1)
      continue;
    const S = f.has(v.id), w = !S && v.parentId && d.find((A) => A.id === v.parentId);
    (S || w) && d.push(v);
  }
  const g = new Set(a.map((v) => v.id)), p = u.filter((v) => v.deletable !== !1), b = Xw(d, p);
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
const fi = (n, a = 0, o = 1) => Math.min(Math.max(n, a), o), ca = (n = { x: 0, y: 0 }, a, o) => ({
  x: fi(n.x, a[0][0], a[1][0] - (o?.width ?? 0)),
  y: fi(n.y, a[0][1], a[1][1] - (o?.height ?? 0))
});
function dy(n, a, o) {
  const { width: u, height: s } = el(o), { x: f, y: d } = o.internals.positionAbsolute;
  return ca(n, [
    [f, d],
    [f + u, d + s]
  ], a);
}
const T0 = (n, a, o) => n < a ? fi(Math.abs(n - a), 1, a) / a : n > o ? -fi(Math.abs(n - o), 1, a) / a : 0, rd = (n, a, o = 15, u = 40) => {
  const s = T0(n.x, u, a.width - u) * o, f = T0(n.y, u, a.height - u) * o;
  return [s, f];
}, Gr = (n, a) => ({
  x: Math.min(n.x, a.x),
  y: Math.min(n.y, a.y),
  x2: Math.max(n.x2, a.x2),
  y2: Math.max(n.y2, a.y2)
}), Zf = ({ x: n, y: a, width: o, height: u }) => ({
  x: n,
  y: a,
  x2: n + o,
  y2: a + u
}), Qr = ({ x: n, y: a, x2: o, y2: u }) => ({
  x: n,
  y: a,
  width: o - n,
  height: u - a
}), Do = (n, a = [0, 0]) => {
  const { x: o, y: u } = od(n) ? n.internals.positionAbsolute : qo(n, a);
  return {
    x: o,
    y: u,
    width: n.measured?.width ?? n.width ?? n.initialWidth ?? 0,
    height: n.measured?.height ?? n.height ?? n.initialHeight ?? 0
  };
}, kr = (n, a = [0, 0]) => {
  const { x: o, y: u } = od(n) ? n.internals.positionAbsolute : qo(n, a);
  return {
    x: o,
    y: u,
    x2: o + (n.measured?.width ?? n.width ?? n.initialWidth ?? 0),
    y2: u + (n.measured?.height ?? n.height ?? n.initialHeight ?? 0)
  };
}, hy = (n, a) => Qr(Gr(Zf(n), Zf(a))), gy = (n, a, o, u, s, f, d, g) => {
  const p = Math.max(0, Math.min(n + o, s + d) - Math.max(n, s)), h = Math.max(0, Math.min(a + u, f + g) - Math.max(a, f));
  return Math.ceil(p * h);
}, Br = (n, a) => gy(n.x, n.y, n.width, n.height, a.x, a.y, a.width, a.height), D0 = (n) => mn(n.width) && mn(n.height) && mn(n.x) && mn(n.y), mn = (n) => !isNaN(n) && isFinite(n), my = (n, a) => (o, u) => {
}, Yo = (n, a = [1, 1]) => ({
  x: a[0] * Math.round(n.x / a[0]),
  y: a[1] * Math.round(n.y / a[1])
}), Lo = ({ x: n, y: a }, [o, u, s], f = !1, d = [1, 1]) => {
  const g = {
    x: (n - o) / s,
    y: (a - u) / s
  };
  return f ? Yo(g, d) : g;
}, di = ({ x: n, y: a }, [o, u, s]) => ({
  x: n * s + o,
  y: a * s + u
});
function ti(n, a) {
  if (typeof n == "number")
    return Math.floor((a - a / (1 + n)) * 0.5);
  if (typeof n == "string" && n.endsWith("px")) {
    const o = parseFloat(n);
    if (!Number.isNaN(o))
      return Math.floor(o);
  }
  if (typeof n == "string" && n.endsWith("%")) {
    const o = parseFloat(n);
    if (!Number.isNaN(o))
      return Math.floor(a * o * 0.01);
  }
  return console.error(`The padding value "${n}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function Qw(n, a, o) {
  if (typeof n == "string" || typeof n == "number") {
    const u = ti(n, o), s = ti(n, a);
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
    const u = ti(n.top ?? n.y ?? 0, o), s = ti(n.bottom ?? n.y ?? 0, o), f = ti(n.left ?? n.x ?? 0, a), d = ti(n.right ?? n.x ?? 0, a);
    return { top: u, right: d, bottom: s, left: f, x: f + d, y: u + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function Kw(n, a, o, u, s, f) {
  const { x: d, y: g } = di(n, [a, o, u]), { x: p, y: h } = di({ x: n.x + n.width, y: n.y + n.height }, [a, o, u]), b = s - p, y = f - h;
  return {
    left: Math.floor(d),
    top: Math.floor(g),
    right: Math.floor(b),
    bottom: Math.floor(y)
  };
}
const cd = (n, a, o, u, s, f) => {
  const d = Qw(f, a, o), g = (a - d.x) / n.width, p = (o - d.y) / n.height, h = Math.min(g, p), b = fi(h, u, s), y = n.x + n.width / 2, v = n.y + n.height / 2, S = a / 2 - y * b, w = o / 2 - v * b, A = Kw(n, S, w, b, a, o), C = {
    left: Math.min(A.left - d.left, 0),
    top: Math.min(A.top - d.top, 0),
    right: Math.min(A.right - d.right, 0),
    bottom: Math.min(A.bottom - d.bottom, 0)
  };
  return {
    x: S - C.left + C.right,
    y: w - C.top + C.bottom,
    zoom: b
  };
}, Oo = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function sa(n) {
  return n != null && n !== "parent";
}
function el(n) {
  return {
    width: n.measured?.width ?? n.width ?? n.initialWidth ?? 0,
    height: n.measured?.height ?? n.height ?? n.initialHeight ?? 0
  };
}
function py(n) {
  return (n.measured?.width ?? n.width ?? n.initialWidth) !== void 0 && (n.measured?.height ?? n.height ?? n.initialHeight) !== void 0;
}
function yy(n, a = { width: 0, height: 0 }, o, u, s) {
  const f = { ...n }, d = u.get(o);
  if (d) {
    const g = d.origin || s;
    f.x += d.internals.positionAbsolute.x - (a.width ?? 0) * g[0], f.y += d.internals.positionAbsolute.y - (a.height ?? 0) * g[1];
  }
  return f;
}
function O0(n, a) {
  if (n.size !== a.size)
    return !1;
  for (const o of n)
    if (!a.has(o))
      return !1;
  return !0;
}
function Jw() {
  let n, a;
  return { promise: new Promise((u, s) => {
    n = u, a = s;
  }), resolve: n, reject: a };
}
function Fw(n) {
  return { ...uy, ...n || {} };
}
function Eo(n, { snapGrid: a = [0, 0], snapToGrid: o = !1, transform: u, containerBounds: s }) {
  const { x: f, y: d } = pn(n), g = Lo({ x: f - (s?.left ?? 0), y: d - (s?.top ?? 0) }, u), { x: p, y: h } = o ? Yo(g, a) : g;
  return {
    xSnapped: p,
    ySnapped: h,
    ...g
  };
}
const sd = (n) => ({
  width: n.offsetWidth,
  height: n.offsetHeight
}), vy = (n) => n?.getRootNode?.() || window?.document, Ww = ["INPUT", "SELECT", "TEXTAREA"];
function by(n) {
  const a = n.composedPath?.()?.[0] || n.target;
  return a?.nodeType !== 1 ? !1 : Ww.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const xy = (n) => "clientX" in n, pn = (n, a) => {
  const o = xy(n), u = o ? n.clientX : n.touches?.[0].clientX, s = o ? n.clientY : n.touches?.[0].clientY;
  return {
    x: u - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, R0 = (n, a, o, u, s) => {
  const f = a.querySelectorAll(`.${n}`);
  return !f || !f.length ? null : Array.from(f).map((d) => {
    const g = d.getBoundingClientRect();
    return {
      id: d.getAttribute("data-handleid"),
      type: n,
      nodeId: s,
      position: d.getAttribute("data-handlepos"),
      x: (g.left - o.left) / u,
      y: (g.top - o.top) / u,
      ...sd(d)
    };
  });
};
function _y({ sourceX: n, sourceY: a, targetX: o, targetY: u, sourceControlX: s, sourceControlY: f, targetControlX: d, targetControlY: g }) {
  const p = n * 0.125 + s * 0.375 + d * 0.375 + o * 0.125, h = a * 0.125 + f * 0.375 + g * 0.375 + u * 0.125, b = Math.abs(p - n), y = Math.abs(h - a);
  return [p, h, b, y];
}
function yr(n, a) {
  return n >= 0 ? 0.5 * n : a * 25 * Math.sqrt(-n);
}
function H0({ pos: n, x1: a, y1: o, x2: u, y2: s, c: f }) {
  switch (n) {
    case me.Left:
      return [a - yr(a - u, f), o];
    case me.Right:
      return [a + yr(u - a, f), o];
    case me.Top:
      return [a, o - yr(o - s, f)];
    case me.Bottom:
      return [a, o + yr(s - o, f)];
  }
}
function fd({ sourceX: n, sourceY: a, sourcePosition: o = me.Bottom, targetX: u, targetY: s, targetPosition: f = me.Top, curvature: d = 0.25 }) {
  const [g, p] = H0({
    pos: o,
    x1: n,
    y1: a,
    x2: u,
    y2: s,
    c: d
  }), [h, b] = H0({
    pos: f,
    x1: u,
    y1: s,
    x2: n,
    y2: a,
    c: d
  }), [y, v, S, w] = _y({
    sourceX: n,
    sourceY: a,
    targetX: u,
    targetY: s,
    sourceControlX: g,
    sourceControlY: p,
    targetControlX: h,
    targetControlY: b
  });
  return [
    `M${n},${a} C${g},${p} ${h},${b} ${u},${s}`,
    y,
    v,
    S,
    w
  ];
}
function Sy({ sourceX: n, sourceY: a, targetX: o, targetY: u }) {
  const s = Math.abs(o - n) / 2, f = o < n ? o + s : o - s, d = Math.abs(u - a) / 2, g = u < a ? u + d : u - d;
  return [f, g, s, d];
}
function Iw({ sourceNode: n, targetNode: a, selected: o = !1, zIndex: u = 0, elevateOnSelect: s = !1, zIndexMode: f = "basic" }) {
  if (f === "manual")
    return u;
  const d = s && o ? u + 1e3 : u, g = Math.max(n.parentId || s && n.selected ? n.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return d + g;
}
function Pw({ sourceNode: n, targetNode: a, width: o, height: u, transform: s }) {
  const f = Gr(kr(n), kr(a));
  f.x === f.x2 && (f.x2 += 1), f.y === f.y2 && (f.y2 += 1);
  const d = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: o / s[2],
    height: u / s[2]
  };
  return Br(d, Qr(f)) > 0;
}
const e2 = ({ source: n, sourceHandle: a, target: o, targetHandle: u }) => `xy-edge__${n}${a || ""}-${o}${u || ""}`, t2 = (n, a) => a.some((o) => o.source === n.source && o.target === n.target && (o.sourceHandle === n.sourceHandle || !o.sourceHandle && !n.sourceHandle) && (o.targetHandle === n.targetHandle || !o.targetHandle && !n.targetHandle)), n2 = (n, a, o = {}) => {
  if (!n.source || !n.target)
    return o.onError?.("006", yn.error006()), a;
  const u = o.getEdgeId || e2;
  let s;
  return sy(n) ? s = { ...n } : s = {
    ...n,
    id: u(n)
  }, t2(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function wy({ sourceX: n, sourceY: a, targetX: o, targetY: u }) {
  const [s, f, d, g] = Sy({
    sourceX: n,
    sourceY: a,
    targetX: o,
    targetY: u
  });
  return [`M ${n},${a}L ${o},${u}`, s, f, d, g];
}
const k0 = {
  [me.Left]: { x: -1, y: 0 },
  [me.Right]: { x: 1, y: 0 },
  [me.Top]: { x: 0, y: -1 },
  [me.Bottom]: { x: 0, y: 1 }
}, l2 = ({ source: n, sourcePosition: a = me.Bottom, target: o }) => a === me.Left || a === me.Right ? n.x < o.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : n.y < o.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, B0 = (n, a) => Math.sqrt(Math.pow(a.x - n.x, 2) + Math.pow(a.y - n.y, 2));
function a2({ source: n, sourcePosition: a = me.Bottom, target: o, targetPosition: u = me.Top, center: s, offset: f, stepPosition: d }) {
  const g = k0[a], p = k0[u], h = { x: n.x + g.x * f, y: n.y + g.y * f }, b = { x: o.x + p.x * f, y: o.y + p.y * f }, y = l2({
    source: h,
    sourcePosition: a,
    target: b
  }), v = y.x !== 0 ? "x" : "y", S = y[v];
  let w = [], A, C;
  const M = { x: 0, y: 0 }, q = { x: 0, y: 0 }, [, , _, N] = Sy({
    sourceX: n.x,
    sourceY: n.y,
    targetX: o.x,
    targetY: o.y
  });
  if (g[v] * p[v] === -1) {
    v === "x" ? (A = s.x ?? h.x + (b.x - h.x) * d, C = s.y ?? (h.y + b.y) / 2) : (A = s.x ?? (h.x + b.x) / 2, C = s.y ?? h.y + (b.y - h.y) * d);
    const X = [
      { x: A, y: h.y },
      { x: A, y: b.y }
    ], J = [
      { x: h.x, y: C },
      { x: b.x, y: C }
    ];
    g[v] === S ? w = v === "x" ? X : J : w = v === "x" ? J : X;
  } else {
    const X = [{ x: h.x, y: b.y }], J = [{ x: b.x, y: h.y }];
    if (v === "x" ? w = g.x === S ? J : X : w = g.y === S ? X : J, a === u) {
      const T = Math.abs(n[v] - o[v]);
      if (T <= f) {
        const V = Math.min(f - 1, f - T);
        g[v] === S ? M[v] = (h[v] > n[v] ? -1 : 1) * V : q[v] = (b[v] > o[v] ? -1 : 1) * V;
      }
    }
    if (a !== u) {
      const T = v === "x" ? "y" : "x", V = g[v] === p[T], E = h[T] > b[T], O = h[T] < b[T];
      (g[v] === 1 && (!V && E || V && O) || g[v] !== 1 && (!V && O || V && E)) && (w = v === "x" ? X : J);
    }
    const ue = { x: h.x + M.x, y: h.y + M.y }, $ = { x: b.x + q.x, y: b.y + q.y }, I = Math.max(Math.abs(ue.x - w[0].x), Math.abs($.x - w[0].x)), oe = Math.max(Math.abs(ue.y - w[0].y), Math.abs($.y - w[0].y));
    I >= oe ? (A = (ue.x + $.x) / 2, C = w[0].y) : (A = w[0].x, C = (ue.y + $.y) / 2);
  }
  const j = { x: h.x + M.x, y: h.y + M.y }, R = { x: b.x + q.x, y: b.y + q.y };
  return [[
    n,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...j.x !== w[0].x || j.y !== w[0].y ? [j] : [],
    ...w,
    ...R.x !== w[w.length - 1].x || R.y !== w[w.length - 1].y ? [R] : [],
    o
  ], A, C, _, N];
}
function i2(n, a, o, u) {
  const s = Math.min(B0(n, a) / 2, B0(a, o) / 2, u), { x: f, y: d } = a;
  if (n.x === f && f === o.x || n.y === d && d === o.y)
    return `L${f} ${d}`;
  if (n.y === d) {
    const h = n.x < o.x ? -1 : 1, b = n.y < o.y ? 1 : -1;
    return `L ${f + s * h},${d}Q ${f},${d} ${f},${d + s * b}`;
  }
  const g = n.x < o.x ? 1 : -1, p = n.y < o.y ? -1 : 1;
  return `L ${f},${d + s * p}Q ${f},${d} ${f + s * g},${d}`;
}
function Gf({ sourceX: n, sourceY: a, sourcePosition: o = me.Bottom, targetX: u, targetY: s, targetPosition: f = me.Top, borderRadius: d = 5, centerX: g, centerY: p, offset: h = 20, stepPosition: b = 0.5 }) {
  const [y, v, S, w, A] = a2({
    source: { x: n, y: a },
    sourcePosition: o,
    target: { x: u, y: s },
    targetPosition: f,
    center: { x: g, y: p },
    offset: h,
    stepPosition: b
  });
  let C = `M${y[0].x} ${y[0].y}`;
  for (let M = 1; M < y.length - 1; M++)
    C += i2(y[M - 1], y[M], y[M + 1], d);
  return C += `L${y[y.length - 1].x} ${y[y.length - 1].y}`, [C, v, S, w, A];
}
function U0(n) {
  return n && !!(n.internals.handleBounds || n.handles?.length) && !!(n.measured.width || n.width || n.initialWidth);
}
function o2(n) {
  const { sourceNode: a, targetNode: o } = n;
  if (!U0(a) || !U0(o))
    return null;
  const u = a.internals.handleBounds || q0(a.handles), s = o.internals.handleBounds || q0(o.handles), f = j0(u?.source ?? [], n.sourceHandle), d = j0(
    // when connection type is loose we can define all handles as sources and connect source -> source
    n.connectionMode === si.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    n.targetHandle
  );
  if (!f || !d)
    return n.onError?.("008", yn.error008(f ? "target" : "source", {
      id: n.id,
      sourceHandle: n.sourceHandle,
      targetHandle: n.targetHandle
    })), null;
  const g = f?.position || me.Bottom, p = d?.position || me.Top, h = fa(a, f, g), b = fa(o, d, p);
  return {
    sourceX: h.x,
    sourceY: h.y,
    targetX: b.x,
    targetY: b.y,
    sourcePosition: g,
    targetPosition: p
  };
}
function q0(n) {
  if (!n)
    return null;
  const a = [], o = [];
  for (const u of n)
    u.width = u.width ?? 1, u.height = u.height ?? 1, u.type === "source" ? a.push(u) : u.type === "target" && o.push(u);
  return {
    source: a,
    target: o
  };
}
function fa(n, a, o = me.Left, u = !1) {
  const s = (a?.x ?? 0) + n.internals.positionAbsolute.x, f = (a?.y ?? 0) + n.internals.positionAbsolute.y, { width: d, height: g } = a ?? el(n);
  if (u)
    return { x: s + d / 2, y: f + g / 2 };
  switch (a?.position ?? o) {
    case me.Top:
      return { x: s + d / 2, y: f };
    case me.Right:
      return { x: s + d, y: f + g / 2 };
    case me.Bottom:
      return { x: s + d / 2, y: f + g };
    case me.Left:
      return { x: s, y: f + g / 2 };
  }
}
function j0(n, a) {
  return n && (a ? n.find((o) => o.id === a) : n[0]) || null;
}
function Qf(n, a) {
  return n ? typeof n == "string" ? n : `${a ? `${a}__` : ""}${Object.keys(n).sort().map((u) => `${u}=${n[u]}`).join("&")}` : "";
}
function u2(n, { id: a, defaultColor: o, defaultMarkerStart: u, defaultMarkerEnd: s }) {
  const f = /* @__PURE__ */ new Set();
  return n.reduce((d, g) => ([g.markerStart || u, g.markerEnd || s].forEach((p) => {
    if (p && typeof p == "object") {
      const h = Qf(p, a);
      f.has(h) || (d.push({ id: h, color: p.color || o, ...p }), f.add(h));
    }
  }), d), []).sort((d, g) => d.id.localeCompare(g.id));
}
const Ey = 1e3, r2 = 10, dd = {
  nodeOrigin: [0, 0],
  nodeExtent: Ao,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, c2 = {
  ...dd,
  checkEquality: !0
};
function hd(n, a) {
  const o = { ...n };
  for (const u in a)
    a[u] !== void 0 && (o[u] = a[u]);
  return o;
}
function s2(n, a, o) {
  const u = hd(dd, o);
  for (const s of n.values())
    if (s.parentId)
      md(s, n, a, u);
    else {
      const f = qo(s, u.nodeOrigin), d = sa(s.extent) ? s.extent : u.nodeExtent, g = ca(f, d, el(s));
      s.internals.positionAbsolute = g;
    }
}
function f2(n, a) {
  if (!n.handles)
    return n.measured ? a?.internals.handleBounds : void 0;
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
function gd(n) {
  return n === "manual";
}
function Kf(n, a, o, u = {}) {
  const s = hd(c2, u), f = { i: 0 }, d = new Map(a), g = s?.elevateNodesOnSelect && !gd(s.zIndexMode) ? Ey : 0;
  let p = n.length > 0, h = !1;
  a.clear(), o.clear();
  for (const b of n) {
    let y = d.get(b.id);
    if (s.checkEquality && b === y?.internals.userNode)
      a.set(b.id, y);
    else {
      const v = qo(b, s.nodeOrigin), S = sa(b.extent) ? b.extent : s.nodeExtent, w = ca(v, S, el(b));
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
          handleBounds: f2(b, y),
          z: zy(b, g, s.zIndexMode),
          userNode: b
        }
      }, a.set(b.id, y);
    }
    (y.measured === void 0 || y.measured.width === void 0 || y.measured.height === void 0) && !y.hidden && (p = !1), b.parentId && md(y, a, o, u, f), h ||= b.selected ?? !1;
  }
  return { nodesInitialized: p, hasSelectedNodes: h };
}
function d2(n, a) {
  if (!n.parentId)
    return;
  const o = a.get(n.parentId);
  o ? o.set(n.id, n) : a.set(n.parentId, /* @__PURE__ */ new Map([[n.id, n]]));
}
function md(n, a, o, u, s) {
  const { elevateNodesOnSelect: f, nodeOrigin: d, nodeExtent: g, zIndexMode: p } = hd(dd, u), h = n.parentId, b = a.get(h);
  if (!b) {
    console.warn(`Parent node ${h} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  d2(n, o), s && !b.parentId && b.internals.rootParentIndex === void 0 && p === "auto" && (b.internals.rootParentIndex = ++s.i, b.internals.z = b.internals.z + s.i * r2), s && b.internals.rootParentIndex !== void 0 && (s.i = b.internals.rootParentIndex);
  const y = f && !gd(p) ? Ey : 0, { x: v, y: S, z: w } = h2(n, b, d, g, y, p), { positionAbsolute: A } = n.internals, C = v !== A.x || S !== A.y;
  (C || w !== n.internals.z) && a.set(n.id, {
    ...n,
    internals: {
      ...n.internals,
      positionAbsolute: C ? { x: v, y: S } : A,
      z: w
    }
  });
}
function zy(n, a, o) {
  const u = mn(n.zIndex) ? n.zIndex : 0;
  return gd(o) ? u : u + (n.selected ? a : 0);
}
function h2(n, a, o, u, s, f) {
  const { x: d, y: g } = a.internals.positionAbsolute, p = el(n), h = qo(n, o), b = sa(n.extent) ? ca(h, n.extent, p) : h;
  let y = ca({ x: d + b.x, y: g + b.y }, u, p);
  n.extent === "parent" && (y = dy(y, p, a));
  const v = zy(n, s, f), S = a.internals.z ?? 0;
  return {
    x: y.x,
    y: y.y,
    z: S >= v ? S + 1 : v
  };
}
function pd(n, a, o, u = [0, 0]) {
  const s = [], f = /* @__PURE__ */ new Map();
  for (const d of n) {
    const g = a.get(d.parentId);
    if (!g)
      continue;
    const p = f.get(d.parentId)?.expandedRect ?? Do(g), h = hy(p, d.rect);
    f.set(d.parentId, { expandedRect: h, parent: g });
  }
  return f.size > 0 && f.forEach(({ expandedRect: d, parent: g }, p) => {
    const h = g.internals.positionAbsolute, b = el(g), y = g.origin ?? u, v = d.x < h.x ? Math.round(Math.abs(h.x - d.x)) : 0, S = d.y < h.y ? Math.round(Math.abs(h.y - d.y)) : 0, w = Math.max(b.width, Math.round(d.width)), A = Math.max(b.height, Math.round(d.height)), C = (w - b.width) * y[0], M = (A - b.height) * y[1];
    (v > 0 || S > 0 || C || M) && (s.push({
      id: p,
      type: "position",
      position: {
        x: g.position.x - v + C,
        y: g.position.y - S + M
      }
    }), o.get(p)?.forEach((q) => {
      n.some((_) => _.id === q.id) || s.push({
        id: q.id,
        type: "position",
        position: {
          x: q.position.x + v,
          y: q.position.y + S
        }
      });
    })), (b.width < d.width || b.height < d.height || v || S) && s.push({
      id: p,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: w + (v ? y[0] * v - C : 0),
        height: A + (S ? y[1] * S - M : 0)
      }
    });
  }), s;
}
function g2(n, a, o, u, s, f, d) {
  const g = u?.querySelector(".xyflow__viewport");
  let p = !1;
  if (!g)
    return { changes: [], updatedInternals: p };
  const h = [], b = window.getComputedStyle(g), { m22: y } = new window.DOMMatrixReadOnly(b.transform), v = [];
  for (const S of n.values()) {
    const w = a.get(S.id);
    if (!w)
      continue;
    if (w.hidden) {
      a.set(w.id, {
        ...w,
        internals: {
          ...w.internals,
          handleBounds: void 0
        }
      }), p = !0;
      continue;
    }
    const A = sd(S.nodeElement), C = w.measured.width !== A.width || w.measured.height !== A.height;
    if (!!(A.width && A.height && (C || !w.internals.handleBounds || S.force))) {
      const q = S.nodeElement.getBoundingClientRect(), _ = sa(w.extent) ? w.extent : f;
      let { positionAbsolute: N } = w.internals;
      w.parentId && w.extent === "parent" ? N = dy(N, A, a.get(w.parentId)) : _ && (N = ca(N, _, A));
      const j = {
        ...w,
        measured: A,
        internals: {
          ...w.internals,
          positionAbsolute: N,
          handleBounds: {
            source: R0("source", S.nodeElement, q, y, w.id),
            target: R0("target", S.nodeElement, q, y, w.id)
          }
        }
      };
      a.set(w.id, j), w.parentId && md(j, a, o, { nodeOrigin: s, zIndexMode: d }), p = !0, C && (h.push({
        id: w.id,
        type: "dimensions",
        dimensions: A
      }), w.expandParent && w.parentId && v.push({
        id: w.id,
        parentId: w.parentId,
        rect: Do(j, s)
      }));
    }
  }
  if (v.length > 0) {
    const S = pd(v, a, o, s);
    h.push(...S);
  }
  return { changes: h, updatedInternals: p };
}
async function m2({ delta: n, panZoom: a, transform: o, translateExtent: u, width: s, height: f }) {
  if (!a || !n.x && !n.y)
    return !1;
  const d = await a.setViewportConstrained({
    x: o[0] + n.x,
    y: o[1] + n.y,
    zoom: o[2]
  }, [
    [0, 0],
    [s, f]
  ], u);
  return !!d && (d.x !== o[0] || d.y !== o[1] || d.k !== o[2]);
}
function Y0(n, a, o, u, s, f) {
  let d = s;
  const g = u.get(d) || /* @__PURE__ */ new Map();
  u.set(d, g.set(o, a)), d = `${s}-${n}`;
  const p = u.get(d) || /* @__PURE__ */ new Map();
  if (u.set(d, p.set(o, a)), f) {
    d = `${s}-${n}-${f}`;
    const h = u.get(d) || /* @__PURE__ */ new Map();
    u.set(d, h.set(o, a));
  }
}
function My(n, a, o) {
  n.clear(), a.clear();
  for (const u of o) {
    const { source: s, target: f, sourceHandle: d = null, targetHandle: g = null } = u, p = { edgeId: u.id, source: s, target: f, sourceHandle: d, targetHandle: g }, h = `${s}-${d}--${f}-${g}`, b = `${f}-${g}--${s}-${d}`;
    Y0("source", p, b, n, s, d), Y0("target", p, h, n, f, g), a.set(u.id, u);
  }
}
function Ny(n, a) {
  if (!n.parentId)
    return !1;
  const o = a.get(n.parentId);
  return o ? o.selected ? !0 : Ny(o, a) : !1;
}
function L0(n, a, o) {
  let u = n;
  do {
    if (u?.matches?.(a))
      return !0;
    if (u === o)
      return !1;
    u = u?.parentElement;
  } while (u);
  return !1;
}
function p2(n, a, o, u) {
  const s = /* @__PURE__ */ new Map();
  for (const [f, d] of n)
    if ((d.selected || d.id === u) && (!d.parentId || !Ny(d, n)) && (d.draggable || a && typeof d.draggable > "u")) {
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
function Cf({ nodeId: n, dragItems: a, nodeLookup: o, dragging: u = !0 }) {
  const s = [];
  for (const [d, g] of a) {
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
      position: a.get(n)?.position || f.position,
      dragging: u
    } : s[0],
    s
  ];
}
function y2({ dragItems: n, snapGrid: a, x: o, y: u }) {
  const s = n.values().next().value;
  if (!s)
    return null;
  const f = {
    x: o - s.distance.x,
    y: u - s.distance.y
  }, d = Yo(f, a);
  return {
    x: d.x - f.x,
    y: d.y - f.y
  };
}
function v2({ onNodeMouseDown: n, getStoreItems: a, onDragStart: o, onDrag: u, onDragStop: s }) {
  let f = { x: null, y: null }, d = 0, g = /* @__PURE__ */ new Map(), p = !1, h = { x: 0, y: 0 }, b = null, y = !1, v = null, S = !1, w = !1, A = null;
  function C({ noDragClassName: q, handleSelector: _, domNode: N, isSelectable: j, nodeId: R, nodeClickDistance: B = 0 }) {
    v = $t(N);
    function X({ x: I, y: oe }) {
      const { nodeLookup: T, nodeExtent: V, snapGrid: E, snapToGrid: O, nodeOrigin: L, onNodeDrag: Z, onSelectionDrag: ne, onError: z, updateNodePositions: H } = a();
      f = { x: I, y: oe };
      let P = !1;
      const le = g.size > 1, re = le && V ? Zf(jo(g)) : null, fe = le && O ? y2({
        dragItems: g,
        snapGrid: E,
        x: I,
        y: oe
      }) : null;
      for (const [ce, ee] of g) {
        if (!T.has(ce))
          continue;
        let se = { x: I - ee.distance.x, y: oe - ee.distance.y };
        O && (se = fe ? {
          x: Math.round(se.x + fe.x),
          y: Math.round(se.y + fe.y)
        } : Yo(se, E));
        let Se = null;
        if (le && V && !ee.extent && re) {
          const { positionAbsolute: ye } = ee.internals, Ee = ye.x - re.x + V[0][0], Re = ye.x + ee.measured.width - re.x2 + V[1][0], $e = ye.y - re.y + V[0][1], pt = ye.y + ee.measured.height - re.y2 + V[1][1];
          Se = [
            [Ee, $e],
            [Re, pt]
          ];
        }
        const { position: _e, positionAbsolute: ge } = fy({
          nodeId: ce,
          nextPosition: se,
          nodeLookup: T,
          nodeExtent: Se || V,
          nodeOrigin: L,
          onError: z
        });
        P = P || ee.position.x !== _e.x || ee.position.y !== _e.y, ee.position = _e, ee.internals.positionAbsolute = ge;
      }
      if (w = w || P, !!P && (H(g, !0), A && (u || Z || !R && ne))) {
        const [ce, ee] = Cf({
          nodeId: R,
          dragItems: g,
          nodeLookup: T
        });
        u?.(A, g, ce, ee), Z?.(A, ce, ee), R || ne?.(A, ee);
      }
    }
    async function J() {
      if (!b)
        return;
      const { transform: I, panBy: oe, autoPanSpeed: T, autoPanOnNodeDrag: V } = a();
      if (!V) {
        p = !1, cancelAnimationFrame(d);
        return;
      }
      const [E, O] = rd(h, b, T);
      (E !== 0 || O !== 0) && (f.x = (f.x ?? 0) - E / I[2], f.y = (f.y ?? 0) - O / I[2], await oe({ x: E, y: O }) && X(f)), d = requestAnimationFrame(J);
    }
    function ue(I) {
      const { nodeLookup: oe, multiSelectionActive: T, nodesDraggable: V, transform: E, snapGrid: O, snapToGrid: L, selectNodesOnDrag: Z, onNodeDragStart: ne, onSelectionDragStart: z, unselectNodesAndEdges: H } = a();
      y = !0, (!Z || !j) && !T && R && (oe.get(R)?.selected || H()), j && Z && R && n?.(R);
      const P = Eo(I.sourceEvent, { transform: E, snapGrid: O, snapToGrid: L, containerBounds: b });
      if (f = P, g = p2(oe, V, P, R), g.size > 0 && (o || ne || !R && z)) {
        const [le, re] = Cf({
          nodeId: R,
          dragItems: g,
          nodeLookup: oe
        });
        o?.(I.sourceEvent, g, le, re), ne?.(I.sourceEvent, le, re), R || z?.(I.sourceEvent, re);
      }
    }
    const $ = $p().clickDistance(B).on("start", (I) => {
      const { domNode: oe, nodeDragThreshold: T, transform: V, snapGrid: E, snapToGrid: O } = a();
      b = oe?.getBoundingClientRect() || null, S = !1, w = !1, A = I.sourceEvent, T === 0 && ue(I), f = Eo(I.sourceEvent, { transform: V, snapGrid: E, snapToGrid: O, containerBounds: b }), h = pn(I.sourceEvent, b);
    }).on("drag", (I) => {
      const { autoPanOnNodeDrag: oe, transform: T, snapGrid: V, snapToGrid: E, nodeDragThreshold: O, nodeLookup: L } = a(), Z = Eo(I.sourceEvent, { transform: T, snapGrid: V, snapToGrid: E, containerBounds: b });
      if (A = I.sourceEvent, (I.sourceEvent.type === "touchmove" && I.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      R && !L.has(R)) && (S = !0), !S) {
        if (!p && oe && y && (p = !0, J()), !y) {
          const ne = pn(I.sourceEvent, b), z = ne.x - h.x, H = ne.y - h.y;
          Math.sqrt(z * z + H * H) > O && ue(I);
        }
        (f.x !== Z.xSnapped || f.y !== Z.ySnapped) && g && y && (h = pn(I.sourceEvent, b), X(Z));
      }
    }).on("end", (I) => {
      if (!y || S) {
        S && g.size > 0 && a().updateNodePositions(g, !1);
        return;
      }
      if (p = !1, y = !1, cancelAnimationFrame(d), g.size > 0) {
        const { nodeLookup: oe, updateNodePositions: T, onNodeDragStop: V, onSelectionDragStop: E } = a();
        if (w && (T(g, !1), w = !1), s || V || !R && E) {
          const [O, L] = Cf({
            nodeId: R,
            dragItems: g,
            nodeLookup: oe,
            dragging: !1
          });
          s?.(I.sourceEvent, g, O, L), V?.(I.sourceEvent, O, L), R || E?.(I.sourceEvent, L);
        }
      }
    }).filter((I) => {
      const oe = I.target;
      return !I.button && (!q || !L0(oe, `.${q}`, N)) && (!_ || L0(oe, _, N));
    });
    v.call($);
  }
  function M() {
    v?.on(".drag", null);
  }
  return {
    update: C,
    destroy: M
  };
}
function b2(n, a, o) {
  const u = [], s = {
    x: n.x - o,
    y: n.y - o,
    width: o * 2,
    height: o * 2
  };
  for (const f of a.values())
    Br(s, Do(f)) > 0 && u.push(f);
  return u;
}
const x2 = 250;
function _2(n, a, o, u) {
  let s = [], f = 1 / 0;
  const d = b2(n, o, a + x2);
  for (const g of d) {
    const p = [...g.internals.handleBounds?.source ?? [], ...g.internals.handleBounds?.target ?? []];
    for (const h of p) {
      if (u.nodeId === h.nodeId && u.type === h.type && u.id === h.id)
        continue;
      const { x: b, y } = fa(g, h, h.position, !0), v = Math.sqrt(Math.pow(b - n.x, 2) + Math.pow(y - n.y, 2));
      v > a || (v < f ? (s = [{ ...h, x: b, y }], f = v) : v === f && s.push({ ...h, x: b, y }));
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
function Cy(n, a, o, u, s, f = !1) {
  const d = u.get(n);
  if (!d)
    return null;
  const g = s === "strict" ? d.internals.handleBounds?.[a] : [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []], p = (o ? g?.find((h) => h.id === o) : g?.[0]) ?? null;
  return p && f ? { ...p, ...fa(d, p, p.position, !0) } : p;
}
function Ay(n, a) {
  return n || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function S2(n, a) {
  let o = null;
  return a ? o = !0 : n && !a && (o = !1), o;
}
const Ty = () => !0;
function w2(n, { connectionMode: a, connectionRadius: o, handleId: u, nodeId: s, edgeUpdaterType: f, isTarget: d, domNode: g, nodeLookup: p, lib: h, autoPanOnConnect: b, flowId: y, panBy: v, cancelConnection: S, onConnectStart: w, onConnect: A, onConnectEnd: C, isValidConnection: M = Ty, onReconnectEnd: q, updateConnection: _, getTransform: N, getFromHandle: j, autoPanSpeed: R, dragThreshold: B = 1, handleDomNode: X }) {
  const J = vy(n.target);
  let ue = 0, $;
  const { x: I, y: oe } = pn(n), T = Ay(f, X), V = g?.getBoundingClientRect();
  let E = !1;
  if (!V || !T)
    return;
  const O = Cy(s, T, u, p, a);
  if (!O)
    return;
  let L = pn(n, V), Z = !1, ne = null, z = !1, H = null;
  function P() {
    if (!b || !V)
      return;
    const [_e, ge] = rd(L, V, R);
    v({ x: _e, y: ge }), ue = requestAnimationFrame(P);
  }
  const le = {
    ...O,
    nodeId: s,
    type: T,
    position: O.position
  }, re = p.get(s);
  let ce = {
    inProgress: !0,
    isValid: null,
    from: fa(re, le, me.Left, !0),
    fromHandle: le,
    fromPosition: le.position,
    fromNode: re,
    to: L,
    toHandle: null,
    toPosition: A0[le.position],
    toNode: null,
    pointer: L
  };
  function ee() {
    E = !0, _(ce), w?.(n, { nodeId: s, handleId: u, handleType: T });
  }
  B === 0 && ee();
  function se(_e) {
    if (!E) {
      const { x: pt, y: Kt } = pn(_e), wt = pt - I, Et = Kt - oe;
      if (!(wt * wt + Et * Et > B * B))
        return;
      ee();
    }
    if (!j() || !le) {
      Se(_e);
      return;
    }
    const ge = N();
    L = pn(_e, V), $ = _2(Lo(L, ge, !1, [1, 1]), o, p, le), Z || (P(), Z = !0);
    const ye = Dy(_e, {
      handle: $,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: u,
      fromType: d ? "target" : "source",
      isValidConnection: M,
      doc: J,
      lib: h,
      flowId: y,
      nodeLookup: p
    });
    H = ye.handleDomNode, ne = ye.connection, z = S2(!!$, ye.isValid);
    const Ee = p.get(s), Re = Ee ? fa(Ee, le, me.Left, !0) : ce.from, $e = {
      ...ce,
      from: Re,
      isValid: z,
      to: ye.toHandle && z ? di({ x: ye.toHandle.x, y: ye.toHandle.y }, ge) : L,
      toHandle: ye.toHandle,
      toPosition: z && ye.toHandle ? ye.toHandle.position : A0[le.position],
      toNode: ye.toHandle ? p.get(ye.toHandle.nodeId) : null,
      pointer: L
    };
    _($e), ce = $e;
  }
  function Se(_e) {
    if (!("touches" in _e && _e.touches.length > 0)) {
      if (E) {
        ($ || H) && ne && z && A?.(ne);
        const { inProgress: ge, ...ye } = ce, Ee = {
          ...ye,
          toPosition: ce.toHandle ? ce.toPosition : null
        };
        C?.(_e, Ee), f && q?.(_e, Ee);
      }
      S(), cancelAnimationFrame(ue), Z = !1, z = !1, ne = null, H = null, J.removeEventListener("mousemove", se), J.removeEventListener("mouseup", Se), J.removeEventListener("touchmove", se), J.removeEventListener("touchend", Se);
    }
  }
  J.addEventListener("mousemove", se), J.addEventListener("mouseup", Se), J.addEventListener("touchmove", se), J.addEventListener("touchend", Se);
}
function Dy(n, { handle: a, connectionMode: o, fromNodeId: u, fromHandleId: s, fromType: f, doc: d, lib: g, flowId: p, isValidConnection: h = Ty, nodeLookup: b }) {
  const y = f === "target", v = a ? d.querySelector(`.${g}-flow__handle[data-id="${p}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x: S, y: w } = pn(n), A = d.elementFromPoint(S, w), C = A?.classList.contains(`${g}-flow__handle`) ? A : v, M = {
    handleDomNode: C,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (C) {
    const q = Ay(void 0, C), _ = C.getAttribute("data-nodeid"), N = C.getAttribute("data-handleid"), j = C.classList.contains("connectable"), R = C.classList.contains("connectableend");
    if (!_ || !q)
      return M;
    const B = {
      source: y ? _ : u,
      sourceHandle: y ? N : s,
      target: y ? u : _,
      targetHandle: y ? s : N
    };
    M.connection = B;
    const J = j && R && (o === si.Strict ? y && q === "source" || !y && q === "target" : _ !== u || N !== s);
    M.isValid = J && h(B), M.toHandle = Cy(_, q, N, b, o, !0);
  }
  return M;
}
const Jf = {
  onPointerDown: w2,
  isValid: Dy
};
function E2({ domNode: n, panZoom: a, getTransform: o, getViewScale: u }) {
  const s = $t(n);
  function f({ translateExtent: g, width: p, height: h, zoomStep: b = 1, pannable: y = !0, zoomable: v = !0, inversePan: S = !1 }) {
    const w = (_) => {
      if (_.sourceEvent.type !== "wheel" || !a)
        return;
      const N = o(), j = _.sourceEvent.ctrlKey && Oo() ? 10 : 1, R = -_.sourceEvent.deltaY * (_.sourceEvent.deltaMode === 1 ? 0.05 : _.sourceEvent.deltaMode ? 1 : 2e-3) * b, B = N[2] * Math.pow(2, R * j);
      a.scaleTo(B);
    };
    let A = [0, 0];
    const C = (_) => {
      (_.sourceEvent.type === "mousedown" || _.sourceEvent.type === "touchstart") && (A = [
        _.sourceEvent.clientX ?? _.sourceEvent.touches[0].clientX,
        _.sourceEvent.clientY ?? _.sourceEvent.touches[0].clientY
      ]);
    }, M = (_) => {
      const N = o();
      if (_.sourceEvent.type !== "mousemove" && _.sourceEvent.type !== "touchmove" || !a)
        return;
      const j = [
        _.sourceEvent.clientX ?? _.sourceEvent.touches[0].clientX,
        _.sourceEvent.clientY ?? _.sourceEvent.touches[0].clientY
      ], R = [j[0] - A[0], j[1] - A[1]];
      A = j;
      const B = u() * Math.max(N[2], Math.log(N[2])) * (S ? -1 : 1), X = {
        x: N[0] - R[0] * B,
        y: N[1] - R[1] * B
      }, J = [
        [0, 0],
        [p, h]
      ];
      a.setViewportConstrained({
        x: X.x,
        y: X.y,
        zoom: N[2]
      }, J, g);
    }, q = iy().on("start", C).on("zoom", y ? M : null).on("zoom.wheel", v ? w : null);
    s.call(q, {});
  }
  function d() {
    s.on("zoom", null);
  }
  return {
    update: f,
    destroy: d,
    pointer: dn
  };
}
const Kr = (n) => ({
  x: n.x,
  y: n.y,
  zoom: n.k
}), Af = ({ x: n, y: a, zoom: o }) => Zr.translate(n, a).scale(o), li = (n, a) => n.target.closest(`.${a}`), Oy = (n, a) => a === 2 && Array.isArray(n) && n.includes(2), z2 = (n) => ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2, Tf = (n, a = 0, o = z2, u = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || u(), s ? n.transition().duration(a).ease(o).on("end", u) : n;
}, Ry = (n) => {
  const a = n.ctrlKey && Oo() ? 10 : 1;
  return -n.deltaY * (n.deltaMode === 1 ? 0.05 : n.deltaMode ? 1 : 2e-3) * a;
};
function M2({ zoomPanValues: n, noWheelClassName: a, d3Selection: o, d3Zoom: u, panOnScrollMode: s, panOnScrollSpeed: f, zoomOnPinch: d, onPanZoomStart: g, onPanZoom: p, onPanZoomEnd: h }) {
  return (b) => {
    if (li(b, a))
      return b.ctrlKey && b.preventDefault(), !1;
    b.preventDefault(), b.stopImmediatePropagation();
    const y = o.property("__zoom").k || 1;
    if (b.ctrlKey && d) {
      const C = dn(b), M = Ry(b), q = y * Math.pow(2, M);
      u.scaleTo(o, q, C, b);
      return;
    }
    const v = b.deltaMode === 1 ? 20 : 1;
    let S = s === ia.Vertical ? 0 : b.deltaX * v, w = s === ia.Horizontal ? 0 : b.deltaY * v;
    !Oo() && b.shiftKey && s !== ia.Vertical && (S = b.deltaY * v, w = 0), u.translateBy(
      o,
      -(S / y) * f,
      -(w / y) * f,
      // @ts-ignore
      { internal: !0 }
    );
    const A = Kr(o.property("__zoom"));
    clearTimeout(n.panScrollTimeout), n.isPanScrolling ? (p?.(b, A), n.panScrollTimeout = setTimeout(() => {
      h?.(b, A), n.isPanScrolling = !1;
    }, 150)) : (n.isPanScrolling = !0, g?.(b, A));
  };
}
function N2({ noWheelClassName: n, preventScrolling: a, d3ZoomHandler: o }) {
  return function(u, s) {
    const f = u.type === "wheel", d = !a && f && !u.ctrlKey, g = li(u, n);
    if (u.ctrlKey && f && g && u.preventDefault(), d || g)
      return null;
    u.preventDefault(), o.call(this, u, s);
  };
}
function C2({ zoomPanValues: n, onDraggingChange: a, onPanZoomStart: o }) {
  return (u) => {
    if (u.sourceEvent?.internal)
      return;
    const s = Kr(u.transform);
    n.mouseButton = u.sourceEvent?.button || 0, n.isZoomingOrPanning = !0, n.prevViewport = s, u.sourceEvent?.type === "mousedown" && a(!0), o && o?.(u.sourceEvent, s);
  };
}
function A2({ zoomPanValues: n, panOnDrag: a, onPaneContextMenu: o, onTransformChange: u, onPanZoom: s }) {
  return (f) => {
    n.usedRightMouseButton = !!(o && Oy(a, n.mouseButton ?? 0)), f.sourceEvent?.sync || u([f.transform.x, f.transform.y, f.transform.k]), s && !f.sourceEvent?.internal && s?.(f.sourceEvent, Kr(f.transform));
  };
}
function T2({ zoomPanValues: n, panOnDrag: a, panOnScroll: o, onDraggingChange: u, onPanZoomEnd: s, onPaneContextMenu: f }) {
  return (d) => {
    if (!d.sourceEvent?.internal && (n.isZoomingOrPanning = !1, f && Oy(a, n.mouseButton ?? 0) && !n.usedRightMouseButton && d.sourceEvent && f(d.sourceEvent), n.usedRightMouseButton = !1, u(!1), s)) {
      const g = Kr(d.transform);
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
function D2({ zoomActivationKeyPressed: n, zoomOnScroll: a, zoomOnPinch: o, panOnDrag: u, panOnScroll: s, zoomOnDoubleClick: f, userSelectionActive: d, noWheelClassName: g, noPanClassName: p, lib: h, connectionInProgress: b }) {
  return (y) => {
    const v = n || a, S = o && y.ctrlKey, w = y.type === "wheel";
    if (y.button === 1 && y.type === "mousedown" && (li(y, `${h}-flow__node`) || li(y, `${h}-flow__edge`)))
      return !0;
    if (!u && !v && !s && !f && !o || d || b && !w || li(y, g) && w || li(y, p) && (!w || s && w && !n) || !o && y.ctrlKey && w)
      return !1;
    if (!o && y.type === "touchstart" && y.touches?.length > 1)
      return y.preventDefault(), !1;
    if (!v && !s && !S && w || !u && (y.type === "mousedown" || y.type === "touchstart") || Array.isArray(u) && !u.includes(y.button) && y.type === "mousedown")
      return !1;
    const A = Array.isArray(u) && u.includes(y.button) || !y.button || y.button <= 1;
    return (!y.ctrlKey || w) && A;
  };
}
function O2({ domNode: n, minZoom: a, maxZoom: o, translateExtent: u, viewport: s, onPanZoom: f, onPanZoomStart: d, onPanZoomEnd: g, onDraggingChange: p }) {
  const h = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, b = n.getBoundingClientRect(), y = iy().scaleExtent([a, o]).translateExtent(u), v = $t(n).call(y);
  q({
    x: s.x,
    y: s.y,
    zoom: fi(s.zoom, a, o)
  }, [
    [0, 0],
    [b.width, b.height]
  ], u);
  const S = v.on("wheel.zoom"), w = v.on("dblclick.zoom");
  y.wheelDelta(Ry);
  async function A($, I) {
    return v ? new Promise((oe) => {
      y?.interpolate(I?.interpolate === "linear" ? wo : wr).transform(Tf(v, I?.duration, I?.ease, () => oe(!0)), $);
    }) : !1;
  }
  function C({ noWheelClassName: $, noPanClassName: I, onPaneContextMenu: oe, userSelectionActive: T, panOnScroll: V, panOnDrag: E, panOnScrollMode: O, panOnScrollSpeed: L, preventScrolling: Z, zoomOnPinch: ne, zoomOnScroll: z, zoomOnDoubleClick: H, zoomActivationKeyPressed: P, lib: le, onTransformChange: re, connectionInProgress: fe, paneClickDistance: ce, selectionOnDrag: ee }) {
    T && !h.isZoomingOrPanning && M();
    const se = V && !P && !T;
    y.clickDistance(ee ? 1 / 0 : !mn(ce) || ce < 0 ? 0 : ce);
    const Se = se ? M2({
      zoomPanValues: h,
      noWheelClassName: $,
      d3Selection: v,
      d3Zoom: y,
      panOnScrollMode: O,
      panOnScrollSpeed: L,
      zoomOnPinch: ne,
      onPanZoomStart: d,
      onPanZoom: f,
      onPanZoomEnd: g
    }) : N2({
      noWheelClassName: $,
      preventScrolling: Z,
      d3ZoomHandler: S
    });
    v.on("wheel.zoom", Se, { passive: !1 });
    const _e = C2({
      zoomPanValues: h,
      onDraggingChange: p,
      onPanZoomStart: d
    });
    y.on("start", _e);
    const ge = A2({
      zoomPanValues: h,
      panOnDrag: E,
      onPaneContextMenu: !!oe,
      onPanZoom: f,
      onTransformChange: re
    });
    y.on("zoom", ge);
    const ye = T2({
      zoomPanValues: h,
      panOnDrag: E,
      panOnScroll: V,
      onPaneContextMenu: oe,
      onPanZoomEnd: g,
      onDraggingChange: p
    });
    y.on("end", ye);
    const Ee = D2({
      zoomActivationKeyPressed: P,
      panOnDrag: E,
      zoomOnScroll: z,
      panOnScroll: V,
      zoomOnDoubleClick: H,
      zoomOnPinch: ne,
      userSelectionActive: T,
      noPanClassName: I,
      noWheelClassName: $,
      lib: le,
      connectionInProgress: fe
    });
    y.filter(Ee), H ? v.on("dblclick.zoom", w) : v.on("dblclick.zoom", null);
  }
  function M() {
    y.on("zoom", null);
  }
  async function q($, I, oe) {
    const T = Af($), V = y?.constrain()(T, I, oe);
    return V && await A(V), V;
  }
  async function _($, I) {
    const oe = Af($);
    return await A(oe, I), oe;
  }
  function N($) {
    if (v) {
      const I = Af($), oe = v.property("__zoom");
      (oe.k !== $.zoom || oe.x !== $.x || oe.y !== $.y) && y?.transform(v, I, null, { sync: !0 });
    }
  }
  function j() {
    const $ = v ? ay(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: $.x, y: $.y, zoom: $.k };
  }
  async function R($, I) {
    return v ? new Promise((oe) => {
      y?.interpolate(I?.interpolate === "linear" ? wo : wr).scaleTo(Tf(v, I?.duration, I?.ease, () => oe(!0)), $);
    }) : !1;
  }
  async function B($, I) {
    return v ? new Promise((oe) => {
      y?.interpolate(I?.interpolate === "linear" ? wo : wr).scaleBy(Tf(v, I?.duration, I?.ease, () => oe(!0)), $);
    }) : !1;
  }
  function X($) {
    y?.scaleExtent($);
  }
  function J($) {
    y?.translateExtent($);
  }
  function ue($) {
    const I = !mn($) || $ < 0 ? 0 : $;
    y?.clickDistance(I);
  }
  return {
    update: C,
    destroy: M,
    setViewport: _,
    setViewportConstrained: q,
    getViewport: j,
    scaleTo: R,
    scaleBy: B,
    setScaleExtent: X,
    setTranslateExtent: J,
    syncViewport: N,
    setClickDistance: ue
  };
}
var hi;
(function(n) {
  n.Line = "line", n.Handle = "handle";
})(hi || (hi = {}));
function R2({ width: n, prevWidth: a, height: o, prevHeight: u, affectsX: s, affectsY: f }) {
  const d = n - a, g = o - u, p = [d > 0 ? 1 : d < 0 ? -1 : 0, g > 0 ? 1 : g < 0 ? -1 : 0];
  return d && s && (p[0] = p[0] * -1), g && f && (p[1] = p[1] * -1), p;
}
function V0(n) {
  const a = n.includes("right") || n.includes("left"), o = n.includes("bottom") || n.includes("top"), u = n.includes("left"), s = n.includes("top");
  return {
    isHorizontal: a,
    isVertical: o,
    affectsX: u,
    affectsY: s
  };
}
function Tl(n, a) {
  return Math.max(0, a - n);
}
function Dl(n, a) {
  return Math.max(0, n - a);
}
function vr(n, a, o) {
  return Math.max(0, a - n, n - o);
}
function X0(n, a) {
  return n ? !a : a;
}
function H2(n, a, o, u, s, f, d, g) {
  let { affectsX: p, affectsY: h } = a;
  const { isHorizontal: b, isVertical: y } = a, v = b && y, { xSnapped: S, ySnapped: w } = o, { minWidth: A, maxWidth: C, minHeight: M, maxHeight: q } = u, { x: _, y: N, width: j, height: R, aspectRatio: B } = n;
  let X = Math.floor(b ? S - n.pointerX : 0), J = Math.floor(y ? w - n.pointerY : 0);
  const ue = j + (p ? -X : X), $ = R + (h ? -J : J), I = -f[0] * j, oe = -f[1] * R;
  let T = vr(ue, A, C), V = vr($, M, q);
  if (d) {
    let L = 0, Z = 0;
    p && X < 0 ? L = Tl(_ + X + I, d[0][0]) : !p && X > 0 && (L = Dl(_ + ue + I, d[1][0])), h && J < 0 ? Z = Tl(N + J + oe, d[0][1]) : !h && J > 0 && (Z = Dl(N + $ + oe, d[1][1])), T = Math.max(T, L), V = Math.max(V, Z);
  }
  if (g) {
    let L = 0, Z = 0;
    p && X > 0 ? L = Dl(_ + X, g[0][0]) : !p && X < 0 && (L = Tl(_ + ue, g[1][0])), h && J > 0 ? Z = Dl(N + J, g[0][1]) : !h && J < 0 && (Z = Tl(N + $, g[1][1])), T = Math.max(T, L), V = Math.max(V, Z);
  }
  if (s) {
    if (b) {
      const L = vr(ue / B, M, q) * B;
      if (T = Math.max(T, L), d) {
        let Z = 0;
        !p && !h || p && !h && v ? Z = Dl(N + oe + ue / B, d[1][1]) * B : Z = Tl(N + oe + (p ? X : -X) / B, d[0][1]) * B, T = Math.max(T, Z);
      }
      if (g) {
        let Z = 0;
        !p && !h || p && !h && v ? Z = Tl(N + ue / B, g[1][1]) * B : Z = Dl(N + (p ? X : -X) / B, g[0][1]) * B, T = Math.max(T, Z);
      }
    }
    if (y) {
      const L = vr($ * B, A, C) / B;
      if (V = Math.max(V, L), d) {
        let Z = 0;
        !p && !h || h && !p && v ? Z = Dl(_ + $ * B + I, d[1][0]) / B : Z = Tl(_ + (h ? J : -J) * B + I, d[0][0]) / B, V = Math.max(V, Z);
      }
      if (g) {
        let Z = 0;
        !p && !h || h && !p && v ? Z = Tl(_ + $ * B, g[1][0]) / B : Z = Dl(_ + (h ? J : -J) * B, g[0][0]) / B, V = Math.max(V, Z);
      }
    }
  }
  J = J + (J < 0 ? V : -V), X = X + (X < 0 ? T : -T), s && (v ? ue > $ * B ? J = (X0(p, h) ? -X : X) / B : X = (X0(p, h) ? -J : J) * B : b ? (J = X / B, h = p) : (X = J * B, p = h));
  const E = p ? _ + X : _, O = h ? N + J : N;
  return {
    width: j + (p ? -X : X),
    height: R + (h ? -J : J),
    x: f[0] * X * (p ? -1 : 1) + E,
    y: f[1] * J * (h ? -1 : 1) + O
  };
}
const Hy = { width: 0, height: 0, x: 0, y: 0 }, k2 = {
  ...Hy,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function B2(n, a, o) {
  const u = a.position.x + n.position.x, s = a.position.y + n.position.y, f = n.measured.width ?? 0, d = n.measured.height ?? 0, g = o[0] * f, p = o[1] * d;
  return [
    [u - g, s - p],
    [u + f - g, s + d - p]
  ];
}
function U2({ domNode: n, nodeId: a, getStoreItems: o, onChange: u, onEnd: s }) {
  const f = $t(n);
  let d = {
    controlDirection: V0("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function g({ controlPosition: h, boundaries: b, keepAspectRatio: y, resizeDirection: v, onResizeStart: S, onResize: w, onResizeEnd: A, shouldResize: C }) {
    let M = { ...Hy }, q = { ...k2 };
    d = {
      boundaries: b,
      resizeDirection: v,
      keepAspectRatio: y,
      controlDirection: V0(h)
    };
    let _, N = null, j = [], R, B, X, J = !1;
    const ue = $p().on("start", ($) => {
      const { nodeLookup: I, transform: oe, snapGrid: T, snapToGrid: V, nodeOrigin: E, paneDomNode: O } = o();
      if (_ = I.get(a), !_)
        return;
      N = O?.getBoundingClientRect() ?? null;
      const { xSnapped: L, ySnapped: Z } = Eo($.sourceEvent, {
        transform: oe,
        snapGrid: T,
        snapToGrid: V,
        containerBounds: N
      });
      M = {
        width: _.measured.width ?? 0,
        height: _.measured.height ?? 0,
        x: _.position.x ?? 0,
        y: _.position.y ?? 0
      }, q = {
        ...M,
        pointerX: L,
        pointerY: Z,
        aspectRatio: M.width / M.height
      }, R = void 0, B = sa(_.extent) ? _.extent : void 0, _.parentId && (_.extent === "parent" || _.expandParent) && (R = I.get(_.parentId)), R && _.extent === "parent" && (B = [
        [0, 0],
        [R.measured.width, R.measured.height]
      ]), j = [], X = void 0;
      for (const [ne, z] of I)
        if (z.parentId === a && (j.push({
          id: ne,
          position: { ...z.position },
          extent: z.extent
        }), z.extent === "parent" || z.expandParent)) {
          const H = B2(z, _, z.origin ?? E);
          X ? X = [
            [Math.min(H[0][0], X[0][0]), Math.min(H[0][1], X[0][1])],
            [Math.max(H[1][0], X[1][0]), Math.max(H[1][1], X[1][1])]
          ] : X = H;
        }
      S?.($, { ...M });
    }).on("drag", ($) => {
      const { transform: I, snapGrid: oe, snapToGrid: T, nodeOrigin: V } = o(), E = Eo($.sourceEvent, {
        transform: I,
        snapGrid: oe,
        snapToGrid: T,
        containerBounds: N
      }), O = [];
      if (!_)
        return;
      const { x: L, y: Z, width: ne, height: z } = M, H = {}, P = _.origin ?? V, { width: le, height: re, x: fe, y: ce } = H2(q, d.controlDirection, E, d.boundaries, d.keepAspectRatio, P, B, X), ee = le !== ne, se = re !== z, Se = fe !== L && ee, _e = ce !== Z && se;
      if (!Se && !_e && !ee && !se)
        return;
      if ((Se || _e || P[0] === 1 || P[1] === 1) && (H.x = Se ? fe : M.x, H.y = _e ? ce : M.y, M.x = H.x, M.y = H.y, j.length > 0)) {
        const Re = fe - L, $e = ce - Z;
        for (const pt of j)
          pt.position = {
            x: pt.position.x - Re + P[0] * (le - ne),
            y: pt.position.y - $e + P[1] * (re - z)
          }, O.push(pt);
      }
      if ((ee || se) && (H.width = ee && (!d.resizeDirection || d.resizeDirection === "horizontal") ? le : M.width, H.height = se && (!d.resizeDirection || d.resizeDirection === "vertical") ? re : M.height, M.width = H.width, M.height = H.height), R && _.expandParent) {
        const Re = P[0] * (H.width ?? 0);
        H.x && H.x < Re && (M.x = Re, q.x = q.x - (H.x - Re));
        const $e = P[1] * (H.height ?? 0);
        H.y && H.y < $e && (M.y = $e, q.y = q.y - (H.y - $e));
      }
      const ge = R2({
        width: M.width,
        prevWidth: ne,
        height: M.height,
        prevHeight: z,
        affectsX: d.controlDirection.affectsX,
        affectsY: d.controlDirection.affectsY
      }), ye = { ...M, direction: ge };
      C?.($, ye) !== !1 && (J = !0, w?.($, ye), u(H, O));
    }).on("end", ($) => {
      J && (A?.($, { ...M }), s?.({ ...M }), J = !1);
    });
    f.call(ue);
  }
  function p() {
    f.on(".drag", null);
  }
  return {
    update: g,
    destroy: p
  };
}
var Df = { exports: {} }, Of = {}, Rf = { exports: {} }, Hf = {};
var $0;
function q2() {
  if ($0) return Hf;
  $0 = 1;
  var n = ko();
  function a(y, v) {
    return y === v && (y !== 0 || 1 / y === 1 / v) || y !== y && v !== v;
  }
  var o = typeof Object.is == "function" ? Object.is : a, u = n.useState, s = n.useEffect, f = n.useLayoutEffect, d = n.useDebugValue;
  function g(y, v) {
    var S = v(), w = u({ inst: { value: S, getSnapshot: v } }), A = w[0].inst, C = w[1];
    return f(
      function() {
        A.value = S, A.getSnapshot = v, p(A) && C({ inst: A });
      },
      [y, S, v]
    ), s(
      function() {
        return p(A) && C({ inst: A }), y(function() {
          p(A) && C({ inst: A });
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
  return Hf.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : b, Hf;
}
var Z0;
function j2() {
  return Z0 || (Z0 = 1, Rf.exports = q2()), Rf.exports;
}
var G0;
function Y2() {
  if (G0) return Of;
  G0 = 1;
  var n = ko(), a = j2();
  function o(h, b) {
    return h === b && (h !== 0 || 1 / h === 1 / b) || h !== h && b !== b;
  }
  var u = typeof Object.is == "function" ? Object.is : o, s = a.useSyncExternalStore, f = n.useRef, d = n.useEffect, g = n.useMemo, p = n.useDebugValue;
  return Of.useSyncExternalStoreWithSelector = function(h, b, y, v, S) {
    var w = f(null);
    if (w.current === null) {
      var A = { hasValue: !1, value: null };
      w.current = A;
    } else A = w.current;
    w = g(
      function() {
        function M(R) {
          if (!q) {
            if (q = !0, _ = R, R = v(R), S !== void 0 && A.hasValue) {
              var B = A.value;
              if (S(B, R))
                return N = B;
            }
            return N = R;
          }
          if (B = N, u(_, R)) return B;
          var X = v(R);
          return S !== void 0 && S(B, X) ? (_ = R, B) : (_ = R, N = X);
        }
        var q = !1, _, N, j = y === void 0 ? null : y;
        return [
          function() {
            return M(b());
          },
          j === null ? void 0 : function() {
            return M(j());
          }
        ];
      },
      [b, y, v, S]
    );
    var C = s(h, w[0], w[1]);
    return d(
      function() {
        A.hasValue = !0, A.value = C;
      },
      [C]
    ), p(C), C;
  }, Of;
}
var Q0;
function L2() {
  return Q0 || (Q0 = 1, Df.exports = Y2()), Df.exports;
}
var V2 = L2();
const X2 = /* @__PURE__ */ Cp(V2), $2 = {}, K0 = (n) => {
  let a;
  const o = /* @__PURE__ */ new Set(), u = (b, y) => {
    const v = typeof b == "function" ? b(a) : b;
    if (!Object.is(v, a)) {
      const S = a;
      a = y ?? (typeof v != "object" || v === null) ? v : Object.assign({}, a, v), o.forEach((w) => w(a, S));
    }
  }, s = () => a, p = { setState: u, getState: s, getInitialState: () => h, subscribe: (b) => (o.add(b), () => o.delete(b)), destroy: () => {
    ($2 ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), o.clear();
  } }, h = a = n(u, s, p);
  return p;
}, Z2 = (n) => n ? K0(n) : K0, { useDebugValue: G2 } = P1, { useSyncExternalStoreWithSelector: Q2 } = X2, K2 = (n) => n;
function ky(n, a = K2, o) {
  const u = Q2(
    n.subscribe,
    n.getState,
    n.getServerState || n.getInitialState,
    a,
    o
  );
  return G2(u), u;
}
const J0 = (n, a) => {
  const o = Z2(n), u = (s, f = a) => ky(o, s, f);
  return Object.assign(u, o), u;
}, J2 = (n, a) => n ? J0(n, a) : J0;
function Ke(n, a) {
  if (Object.is(n, a))
    return !0;
  if (typeof n != "object" || n === null || typeof a != "object" || a === null)
    return !1;
  if (n instanceof Map && a instanceof Map) {
    if (n.size !== a.size) return !1;
    for (const [u, s] of n)
      if (!Object.is(s, a.get(u)))
        return !1;
    return !0;
  }
  if (n instanceof Set && a instanceof Set) {
    if (n.size !== a.size) return !1;
    for (const u of n)
      if (!a.has(u))
        return !1;
    return !0;
  }
  const o = Object.keys(n);
  if (o.length !== Object.keys(a).length)
    return !1;
  for (const u of o)
    if (!Object.prototype.hasOwnProperty.call(a, u) || !Object.is(n[u], a[u]))
      return !1;
  return !0;
}
var F2 = Ap();
const Jr = F.createContext(null), W2 = Jr.Provider, By = yn.error001("react");
function Oe(n, a) {
  const o = F.useContext(Jr);
  if (o === null)
    throw new Error(By);
  return ky(o, n, a);
}
function Je() {
  const n = F.useContext(Jr);
  if (n === null)
    throw new Error(By);
  return F.useMemo(() => ({
    getState: n.getState,
    setState: n.setState,
    subscribe: n.subscribe
  }), [n]);
}
const F0 = { display: "none" }, I2 = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Uy = "react-flow__node-desc", qy = "react-flow__edge-desc", P2 = "react-flow__aria-live", eE = (n) => n.ariaLiveMessage, tE = (n) => n.ariaLabelConfig;
function nE({ rfId: n }) {
  const a = Oe(eE);
  return U.jsx("div", { id: `${P2}-${n}`, "aria-live": "assertive", "aria-atomic": "true", style: I2, children: a });
}
function lE({ rfId: n, disableKeyboardA11y: a }) {
  const o = Oe(tE);
  return U.jsxs(U.Fragment, { children: [U.jsx("div", { id: `${Uy}-${n}`, style: F0, children: a ? o["node.a11yDescription.default"] : o["node.a11yDescription.keyboardDisabled"] }), U.jsx("div", { id: `${qy}-${n}`, style: F0, children: o["edge.a11yDescription.default"] }), !a && U.jsx(nE, { rfId: n })] });
}
const Fr = F.forwardRef(({ position: n = "top-left", children: a, className: o, style: u, ...s }, f) => {
  const d = `${n}`.split("-");
  return U.jsx("div", { className: rt(["react-flow__panel", o, ...d]), style: u, ref: f, ...s, children: a });
});
Fr.displayName = "Panel";
const W0 = "https://reactflow.dev?utm_source=attribution";
function aE({ proOptions: n, position: a = "bottom-right" }) {
  return n?.hideAttribution ? null : U.jsx(Fr, { position: a, className: "react-flow__attribution", "data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${W0}`, children: U.jsx("a", { href: W0, target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const iE = (n) => {
  const a = [], o = [];
  for (const [, u] of n.nodeLookup)
    u.selected && a.push(u.internals.userNode);
  for (const [, u] of n.edgeLookup)
    u.selected && o.push(u);
  return { selectedNodes: a, selectedEdges: o };
}, br = (n) => n.id;
function oE(n, a) {
  return Ke(n.selectedNodes.map(br), a.selectedNodes.map(br)) && Ke(n.selectedEdges.map(br), a.selectedEdges.map(br));
}
function uE({ onSelectionChange: n }) {
  const a = Je(), { selectedNodes: o, selectedEdges: u } = Oe(iE, oE);
  return F.useEffect(() => {
    const s = { nodes: o, edges: u };
    n?.(s), a.getState().onSelectionChangeHandlers.forEach((f) => f(s));
  }, [o, u, n]), null;
}
const rE = (n) => !!n.onSelectionChangeHandlers;
function cE({ onSelectionChange: n }) {
  const a = Oe(rE);
  return n || a ? U.jsx(uE, { onSelectionChange: n }) : null;
}
const jy = [0, 0], sE = { x: 0, y: 0, zoom: 1 }, fE = [
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
], I0 = [...fE, "rfId"], dE = (n) => ({
  setNodes: n.setNodes,
  setEdges: n.setEdges,
  setMinZoom: n.setMinZoom,
  setMaxZoom: n.setMaxZoom,
  setTranslateExtent: n.setTranslateExtent,
  setNodeExtent: n.setNodeExtent,
  reset: n.reset,
  setDefaultNodesAndEdges: n.setDefaultNodesAndEdges
}), P0 = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Ao,
  nodeOrigin: jy,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function hE(n) {
  const { setNodes: a, setEdges: o, setMinZoom: u, setMaxZoom: s, setTranslateExtent: f, setNodeExtent: d, reset: g, setDefaultNodesAndEdges: p } = Oe(dE, Ke), h = Je();
  F.useEffect(() => (p(n.defaultNodes, n.defaultEdges), () => {
    b.current = P0, g();
  }), []);
  const b = F.useRef(P0);
  return F.useEffect(
    () => {
      for (const y of I0) {
        const v = n[y], S = b.current[y];
        v !== S && (typeof n[y] > "u" || (y === "nodes" ? a(v) : y === "edges" ? o(v) : y === "minZoom" ? u(v) : y === "maxZoom" ? s(v) : y === "translateExtent" ? f(v) : y === "nodeExtent" ? d(v) : y === "ariaLabelConfig" ? h.setState({ ariaLabelConfig: Fw(v) }) : y === "fitView" ? h.setState({ fitViewQueued: v }) : y === "fitViewOptions" ? h.setState({ fitViewOptions: v }) : h.setState({ [y]: v })));
      }
      b.current = n;
    },
    // Only re-run the effect if one of the fields we track changes
    I0.map((y) => n[y])
  ), null;
}
function ep() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function gE(n) {
  const [a, o] = F.useState(n === "system" ? null : n);
  return F.useEffect(() => {
    if (n !== "system") {
      o(n);
      return;
    }
    const u = ep(), s = () => o(u?.matches ? "dark" : "light");
    return s(), u?.addEventListener("change", s), () => {
      u?.removeEventListener("change", s);
    };
  }, [n]), a !== null ? a : ep()?.matches ? "dark" : "light";
}
const tp = typeof document < "u" ? document : null;
function Ro(n = null, a = { target: tp, actInsideInputWithModifier: !0 }) {
  const [o, u] = F.useState(!1), s = F.useRef(!1), f = F.useRef(/* @__PURE__ */ new Set([])), [d, g] = F.useMemo(() => {
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
  return F.useEffect(() => {
    const p = a?.target ?? tp, h = a?.actInsideInputWithModifier ?? !0;
    if (n !== null) {
      const b = (S) => {
        if (s.current = S.ctrlKey || S.metaKey || S.shiftKey || S.altKey, (!s.current || s.current && !h) && by(S))
          return !1;
        const A = lp(S.code, g);
        if (f.current.add(S[A]), np(d, f.current, !1)) {
          const C = S.composedPath?.()?.[0] || S.target, M = C?.nodeName === "BUTTON" || C?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !M) && S.preventDefault(), u(!0);
        }
      }, y = (S) => {
        const w = lp(S.code, g);
        np(d, f.current, !0) ? (u(!1), f.current.clear()) : f.current.delete(S[w]), S.key === "Meta" && f.current.clear(), s.current = !1;
      }, v = () => {
        f.current.clear(), u(!1);
      };
      return p?.addEventListener("keydown", b), p?.addEventListener("keyup", y), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        p?.removeEventListener("keydown", b), p?.removeEventListener("keyup", y), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [n, u]), o;
}
function np(n, a, o) {
  return n.filter((u) => o || u.length === a.size).some((u) => u.every((s) => a.has(s)));
}
function lp(n, a) {
  return a.includes(n) ? "code" : "key";
}
const mE = () => {
  const n = Je();
  return F.useMemo(() => ({
    zoomIn: async (a) => {
      const { panZoom: o } = n.getState();
      return o ? o.scaleBy(1.2, a) : !1;
    },
    zoomOut: async (a) => {
      const { panZoom: o } = n.getState();
      return o ? o.scaleBy(1 / 1.2, a) : !1;
    },
    zoomTo: async (a, o) => {
      const { panZoom: u } = n.getState();
      return u ? u.scaleTo(a, o) : !1;
    },
    getZoom: () => n.getState().transform[2],
    setViewport: async (a, o) => {
      const { transform: [u, s, f], panZoom: d } = n.getState();
      return d ? (await d.setViewport({
        x: a.x ?? u,
        y: a.y ?? s,
        zoom: a.zoom ?? f
      }, o), !0) : !1;
    },
    getViewport: () => {
      const [a, o, u] = n.getState().transform;
      return { x: a, y: o, zoom: u };
    },
    setCenter: async (a, o, u) => n.getState().setCenter(a, o, u),
    fitBounds: async (a, o) => {
      const { width: u, height: s, minZoom: f, maxZoom: d, panZoom: g } = n.getState(), p = cd(a, u, s, f, d, o?.padding ?? 0.1);
      return g ? (await g.setViewport(p, {
        duration: o?.duration,
        ease: o?.ease,
        interpolate: o?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (a, o = {}) => {
      const { transform: u, snapGrid: s, snapToGrid: f, domNode: d } = n.getState();
      if (!d)
        return a;
      const { x: g, y: p } = d.getBoundingClientRect(), h = {
        x: a.x - g,
        y: a.y - p
      }, b = o.snapGrid ?? s, y = o.snapToGrid ?? f;
      return Lo(h, u, y, b);
    },
    flowToScreenPosition: (a) => {
      const { transform: o, domNode: u } = n.getState();
      if (!u)
        return a;
      const { x: s, y: f } = u.getBoundingClientRect(), d = di(a, o);
      return {
        x: d.x + s,
        y: d.y + f
      };
    }
  }), []);
};
function Yy(n, a) {
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
  for (const f of a) {
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
      pE(p, g);
    o.push(g);
  }
  return s.length && s.forEach((f) => {
    f.index !== void 0 ? o.splice(f.index, 0, { ...f.item }) : o.push({ ...f.item });
  }), o;
}
function pE(n, a) {
  switch (n.type) {
    case "select": {
      a.selected = n.selected;
      break;
    }
    case "position": {
      typeof n.position < "u" && (a.position = n.position), typeof n.dragging < "u" && (a.dragging = n.dragging);
      break;
    }
    case "dimensions": {
      typeof n.dimensions < "u" && (a.measured = {
        ...n.dimensions
      }, n.setAttributes && ((n.setAttributes === !0 || n.setAttributes === "width") && (a.width = n.dimensions.width), (n.setAttributes === !0 || n.setAttributes === "height") && (a.height = n.dimensions.height))), typeof n.resizing == "boolean" && (a.resizing = n.resizing);
      break;
    }
  }
}
function Ly(n, a) {
  return Yy(n, a);
}
function Vy(n, a) {
  return Yy(n, a);
}
function ta(n, a) {
  return {
    id: n,
    type: "select",
    selected: a
  };
}
function ai(n, a = /* @__PURE__ */ new Set(), o = !1) {
  const u = [];
  for (const [s, f] of n) {
    const d = a.has(s);
    !(f.selected === void 0 && !d) && f.selected !== d && (o && (f.selected = d), u.push(ta(f.id, d)));
  }
  return u;
}
function ap({ items: n = [], lookup: a }) {
  const o = [], u = new Map(n.map((s) => [s.id, s]));
  for (const [s, f] of n.entries()) {
    const d = a.get(f.id), g = d?.internals?.userNode ?? d;
    g !== void 0 && g !== f && o.push({ id: f.id, item: f, type: "replace" }), g === void 0 && o.push({ item: f, type: "add", index: s });
  }
  for (const [s] of a)
    u.get(s) === void 0 && o.push({ id: s, type: "remove" });
  return o;
}
function ip(n) {
  return {
    id: n.id,
    type: "remove"
  };
}
const yE = my();
function vE(n, a, o = {}) {
  return n2(n, a, {
    ...o,
    onError: o.onError ?? yE
  });
}
const op = (n) => Lw(n), bE = (n) => sy(n);
function Xy(n) {
  return F.forwardRef(n);
}
const xE = typeof window < "u" ? F.useLayoutEffect : F.useEffect;
function up(n) {
  const [a, o] = F.useState(BigInt(0)), [u] = F.useState(() => _E(() => o((s) => s + BigInt(1))));
  return xE(() => {
    const s = u.get();
    s.length && (n(s), u.reset());
  }, [a]), u;
}
function _E(n) {
  let a = [];
  return {
    get: () => a,
    reset: () => {
      a = [];
    },
    push: (o) => {
      a.push(o), n();
    }
  };
}
const $y = F.createContext(null);
function SE({ children: n }) {
  const a = Je(), o = F.useCallback((g) => {
    const { nodes: p = [], setNodes: h, hasDefaultNodes: b, onNodesChange: y, nodeLookup: v, fitViewQueued: S, onNodesChangeMiddlewareMap: w } = a.getState();
    let A = p;
    for (const M of g)
      A = typeof M == "function" ? M(A) : M;
    let C = ap({
      items: A,
      lookup: v
    });
    for (const M of w.values())
      C = M(C);
    b && h(A), C.length > 0 ? y?.(C) : S && window.requestAnimationFrame(() => {
      const { fitViewQueued: M, nodes: q, setNodes: _ } = a.getState();
      M && _(q);
    });
  }, []), u = up(o), s = F.useCallback((g) => {
    const { edges: p = [], setEdges: h, hasDefaultEdges: b, onEdgesChange: y, edgeLookup: v } = a.getState();
    let S = p;
    for (const w of g)
      S = typeof w == "function" ? w(S) : w;
    b ? h(S) : y && y(ap({
      items: S,
      lookup: v
    }));
  }, []), f = up(s), d = F.useMemo(() => ({ nodeQueue: u, edgeQueue: f }), []);
  return U.jsx($y.Provider, { value: d, children: n });
}
function wE() {
  const n = F.useContext($y);
  if (!n)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return n;
}
const EE = (n) => !!n.panZoom;
function Wr() {
  const n = mE(), a = Je(), o = wE(), u = Oe(EE), s = F.useMemo(() => {
    const f = (y) => a.getState().nodeLookup.get(y), d = (y) => {
      o.nodeQueue.push(y);
    }, g = (y) => {
      o.edgeQueue.push(y);
    }, p = (y) => {
      const { nodeLookup: v, nodeOrigin: S } = a.getState(), w = op(y) ? y : v.get(y.id), A = w.parentId ? yy(w.position, w.measured, w.parentId, v, S) : w.position, C = {
        ...w,
        position: A,
        width: w.measured?.width ?? w.width,
        height: w.measured?.height ?? w.height
      };
      return Do(C);
    }, h = (y, v, S = { replace: !1 }) => {
      d((w) => w.map((A) => {
        if (A.id === y) {
          const C = typeof v == "function" ? v(A) : v;
          return S.replace && op(C) ? C : { ...A, ...C };
        }
        return A;
      }));
    }, b = (y, v, S = { replace: !1 }) => {
      g((w) => w.map((A) => {
        if (A.id === y) {
          const C = typeof v == "function" ? v(A) : v;
          return S.replace && bE(C) ? C : { ...A, ...C };
        }
        return A;
      }));
    };
    return {
      getNodes: () => a.getState().nodes.map((y) => ({ ...y })),
      getNode: (y) => f(y)?.internals.userNode,
      getInternalNode: f,
      getEdges: () => {
        const { edges: y = [] } = a.getState();
        return y.map((v) => ({ ...v }));
      },
      getEdge: (y) => a.getState().edgeLookup.get(y),
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
        const { nodes: y = [], edges: v = [], transform: S } = a.getState(), [w, A, C] = S;
        return {
          nodes: y.map((M) => ({ ...M })),
          edges: v.map((M) => ({ ...M })),
          viewport: {
            x: w,
            y: A,
            zoom: C
          }
        };
      },
      deleteElements: async ({ nodes: y = [], edges: v = [] }) => {
        const { nodes: S, edges: w, onNodesDelete: A, onEdgesDelete: C, triggerNodeChanges: M, triggerEdgeChanges: q, onDelete: _, onBeforeDelete: N } = a.getState(), { nodes: j, edges: R } = await Gw({
          nodesToRemove: y,
          edgesToRemove: v,
          nodes: S,
          edges: w,
          onBeforeDelete: N
        }), B = R.length > 0, X = j.length > 0;
        if (B) {
          const J = R.map(ip);
          C?.(R), q(J);
        }
        if (X) {
          const J = j.map(ip);
          A?.(j), M(J);
        }
        return (X || B) && _?.({ nodes: j, edges: R }), { deletedNodes: j, deletedEdges: R };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (y, v = !0, S) => {
        const w = D0(y), A = w ? y : p(y), C = S !== void 0;
        return A ? (S || a.getState().nodes).filter((M) => {
          const q = a.getState().nodeLookup.get(M.id);
          if (q && !w && (M.id === y.id || !q.internals.positionAbsolute))
            return !1;
          const _ = Do(C ? M : q), N = Br(_, A);
          return v && N > 0 || N >= _.width * _.height || N >= A.width * A.height;
        }) : [];
      },
      isNodeIntersecting: (y, v, S = !0) => {
        const A = D0(y) ? y : p(y);
        if (!A)
          return !1;
        const C = Br(A, v);
        return S && C > 0 || C >= v.width * v.height || C >= A.width * A.height;
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
        const { nodeLookup: v, nodeOrigin: S } = a.getState();
        return Vw(y, { nodeLookup: v, nodeOrigin: S });
      },
      getHandleConnections: ({ type: y, id: v, nodeId: S }) => Array.from(a.getState().connectionLookup.get(`${S}-${y}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: y, handleId: v, nodeId: S }) => Array.from(a.getState().connectionLookup.get(`${S}${y ? v ? `-${y}-${v}` : `-${y}` : ""}`)?.values() ?? []),
      fitView: async (y) => {
        const v = a.getState().fitViewResolver ?? Jw();
        return a.setState({ fitViewQueued: !0, fitViewOptions: y, fitViewResolver: v }), o.nodeQueue.push((S) => [...S]), v.promise;
      }
    };
  }, []);
  return F.useMemo(() => ({
    ...s,
    ...n,
    viewportInitialized: u
  }), [u]);
}
const rp = (n) => n.selected, zE = typeof window < "u" ? window : void 0;
function ME({ deleteKeyCode: n, multiSelectionKeyCode: a }) {
  const o = Je(), { deleteElements: u } = Wr(), s = Ro(n, { actInsideInputWithModifier: !1 }), f = Ro(a, { target: zE });
  F.useEffect(() => {
    if (s) {
      const { edges: d, nodes: g } = o.getState();
      u({ nodes: g.filter(rp), edges: d.filter(rp) }), o.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), F.useEffect(() => {
    o.setState({ multiSelectionActive: f });
  }, [f]);
}
function NE(n) {
  const a = Je();
  F.useEffect(() => {
    const o = () => {
      if (!n.current || !(n.current.checkVisibility?.() ?? !0))
        return !1;
      const u = sd(n.current);
      (u.height === 0 || u.width === 0) && a.getState().onError?.("004", yn.error004()), a.setState({ width: u.width || 500, height: u.height || 500 });
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
const Ir = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, CE = (n) => ({
  userSelectionActive: n.userSelectionActive,
  lib: n.lib,
  connectionInProgress: n.connection.inProgress
});
function AE({ onPaneContextMenu: n, zoomOnScroll: a = !0, zoomOnPinch: o = !0, panOnScroll: u = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: f = ia.Free, zoomOnDoubleClick: d = !0, panOnDrag: g = !0, defaultViewport: p, translateExtent: h, minZoom: b, maxZoom: y, zoomActivationKeyCode: v, preventScrolling: S = !0, children: w, noWheelClassName: A, noPanClassName: C, onViewportChange: M, isControlledViewport: q, paneClickDistance: _, selectionOnDrag: N }) {
  const j = Je(), R = F.useRef(null), { userSelectionActive: B, lib: X, connectionInProgress: J } = Oe(CE, Ke), ue = Ro(v), $ = F.useRef();
  NE(R);
  const I = F.useCallback((oe) => {
    M?.({ x: oe[0], y: oe[1], zoom: oe[2] }), q || j.setState({ transform: oe });
  }, [M, q]);
  return F.useEffect(() => {
    if (R.current) {
      $.current = O2({
        domNode: R.current,
        minZoom: b,
        maxZoom: y,
        translateExtent: h,
        viewport: p,
        onDraggingChange: (E) => j.setState((O) => O.paneDragging === E ? O : { paneDragging: E }),
        onPanZoomStart: (E, O) => {
          const { onViewportChangeStart: L, onMoveStart: Z } = j.getState();
          Z?.(E, O), L?.(O);
        },
        onPanZoom: (E, O) => {
          const { onViewportChange: L, onMove: Z } = j.getState();
          Z?.(E, O), L?.(O);
        },
        onPanZoomEnd: (E, O) => {
          const { onViewportChangeEnd: L, onMoveEnd: Z } = j.getState();
          Z?.(E, O), L?.(O);
        }
      });
      const { x: oe, y: T, zoom: V } = $.current.getViewport();
      return j.setState({
        panZoom: $.current,
        transform: [oe, T, V],
        domNode: R.current.closest(".react-flow")
      }), () => {
        $.current?.destroy();
      };
    }
  }, []), F.useEffect(() => {
    $.current?.update({
      onPaneContextMenu: n,
      zoomOnScroll: a,
      zoomOnPinch: o,
      panOnScroll: u,
      panOnScrollSpeed: s,
      panOnScrollMode: f,
      zoomOnDoubleClick: d,
      panOnDrag: g,
      zoomActivationKeyPressed: ue,
      preventScrolling: S,
      noPanClassName: C,
      userSelectionActive: B,
      noWheelClassName: A,
      lib: X,
      onTransformChange: I,
      connectionInProgress: J,
      selectionOnDrag: N,
      paneClickDistance: _
    });
  }, [
    n,
    a,
    o,
    u,
    s,
    f,
    d,
    g,
    ue,
    S,
    C,
    B,
    A,
    X,
    I,
    J,
    N,
    _
  ]), U.jsx("div", { className: "react-flow__renderer", ref: R, style: Ir, children: w });
}
const TE = (n) => ({
  userSelectionActive: n.userSelectionActive,
  userSelectionRect: n.userSelectionRect
});
function DE() {
  const { userSelectionActive: n, userSelectionRect: a } = Oe(TE, Ke);
  return n && a ? U.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const kf = (n, a) => (o) => {
  o.target === a.current && n?.(o);
}, OE = (n) => ({
  userSelectionActive: n.userSelectionActive,
  elementsSelectable: n.elementsSelectable,
  dragging: n.paneDragging,
  panBy: n.panBy,
  autoPanSpeed: n.autoPanSpeed
});
function RE({ isSelecting: n, selectionKeyPressed: a, selectionMode: o = To.Full, panOnDrag: u, autoPanOnSelection: s, paneClickDistance: f, selectionOnDrag: d, onSelectionStart: g, onSelectionEnd: p, onPaneClick: h, onPaneContextMenu: b, onPaneScroll: y, onPaneMouseEnter: v, onPaneMouseMove: S, onPaneMouseLeave: w, children: A }) {
  const C = F.useRef(0), M = Je(), { userSelectionActive: q, elementsSelectable: _, dragging: N, panBy: j, autoPanSpeed: R } = Oe(OE, Ke), B = _ && (n || q), X = F.useRef(null), J = F.useRef(), ue = F.useRef(/* @__PURE__ */ new Set()), $ = F.useRef(/* @__PURE__ */ new Set()), I = F.useRef(!1), oe = F.useRef(!1), T = F.useRef({ x: 0, y: 0 }), V = F.useRef(!1), E = (ee) => {
    if (oe.current || I.current || M.getState().connection.inProgress) {
      oe.current = !1, I.current = !1;
      return;
    }
    h?.(ee), M.getState().resetSelectedElements(), M.setState({ nodesSelectionActive: !1 });
  }, O = (ee) => {
    if (Array.isArray(u) && u?.includes(2)) {
      ee.preventDefault();
      return;
    }
    b?.(ee);
  }, L = y ? (ee) => y(ee) : void 0, Z = (ee) => {
    oe.current && (ee.stopPropagation(), oe.current = !1);
  }, ne = (ee) => {
    const { domNode: se, transform: Se } = M.getState();
    if (J.current = se?.getBoundingClientRect(), !J.current)
      return;
    const _e = ee.target === X.current;
    if (!_e && !!ee.target.closest(".nokey") || !n || !(d && _e || a) || ee.button !== 0 || !ee.isPrimary)
      return;
    ee.target?.setPointerCapture?.(ee.pointerId), oe.current = !1;
    const { x: Ee, y: Re } = pn(ee.nativeEvent, J.current), $e = Lo({ x: Ee, y: Re }, Se);
    M.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: $e.x,
        startY: $e.y,
        x: Ee,
        y: Re
      }
    }), _e || (ee.stopPropagation(), ee.preventDefault());
  };
  function z(ee, se) {
    const { userSelectionRect: Se } = M.getState();
    if (!Se)
      return;
    const { transform: _e, nodeLookup: ge, edgeLookup: ye, connectionLookup: Ee, triggerNodeChanges: Re, triggerEdgeChanges: $e, defaultEdgeOptions: pt } = M.getState(), Kt = { x: Se.startX, y: Se.startY }, { x: wt, y: Et } = di(Kt, _e), kt = {
      startX: Kt.x,
      startY: Kt.y,
      x: ee < wt ? ee : wt,
      y: se < Et ? se : Et,
      width: Math.abs(ee - wt),
      height: Math.abs(se - Et)
    }, Hl = ue.current, Cn = $.current;
    ue.current = new Set(ud(ge, kt, _e, o === To.Partial, !0).map((Bt) => Bt.id)), $.current = /* @__PURE__ */ new Set();
    const Ie = pt?.selectable ?? !0;
    for (const Bt of ue.current) {
      const Jt = Ee.get(Bt);
      if (Jt)
        for (const { edgeId: Ft } of Jt.values()) {
          const Wt = ye.get(Ft);
          Wt && (Wt.selectable ?? Ie) && $.current.add(Ft);
        }
    }
    if (!O0(Hl, ue.current)) {
      const Bt = ai(ge, ue.current, !0);
      Re(Bt);
    }
    if (!O0(Cn, $.current)) {
      const Bt = ai(ye, $.current);
      $e(Bt);
    }
    M.setState({
      userSelectionRect: kt,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function H() {
    if (!s || !J.current)
      return;
    const [ee, se] = rd(T.current, J.current, R);
    j({ x: ee, y: se }).then((Se) => {
      if (!oe.current || !Se) {
        C.current = requestAnimationFrame(H);
        return;
      }
      const { x: _e, y: ge } = T.current;
      z(_e, ge), C.current = requestAnimationFrame(H);
    });
  }
  const P = () => {
    cancelAnimationFrame(C.current), C.current = 0, V.current = !1;
  };
  F.useEffect(() => () => P(), []);
  const le = (ee) => {
    const { userSelectionRect: se, transform: Se, resetSelectedElements: _e } = M.getState();
    if (!J.current || !se)
      return;
    const { x: ge, y: ye } = pn(ee.nativeEvent, J.current);
    T.current = { x: ge, y: ye };
    const Ee = di({ x: se.startX, y: se.startY }, Se);
    if (!oe.current) {
      const Re = a ? 0 : f;
      if (Math.hypot(ge - Ee.x, ye - Ee.y) <= Re)
        return;
      _e(), g?.(ee);
    }
    oe.current = !0, V.current || (H(), V.current = !0), z(ge, ye);
  }, re = (ee) => {
    if (!B) {
      ee.target === X.current && M.getState().connection.inProgress && (I.current = !0);
      return;
    }
    ee.button === 0 && (ee.target?.releasePointerCapture?.(ee.pointerId), !q && ee.target === X.current && M.getState().userSelectionRect && E?.(ee), M.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), oe.current && (p?.(ee), M.setState({
      nodesSelectionActive: ue.current.size > 0
    })), P());
  }, fe = (ee) => {
    ee.target?.releasePointerCapture?.(ee.pointerId), P();
  }, ce = u === !0 || Array.isArray(u) && u.includes(0);
  return U.jsxs("div", { className: rt(["react-flow__pane", { draggable: ce, dragging: N, selection: n }]), onClick: B ? void 0 : kf(E, X), onContextMenu: kf(O, X), onWheel: kf(L, X), onPointerEnter: B ? void 0 : v, onPointerMove: B ? le : S, onPointerUp: re, onPointerCancel: B ? fe : void 0, onPointerDownCapture: B ? ne : void 0, onClickCapture: B ? Z : void 0, onPointerLeave: w, ref: X, style: Ir, children: [A, U.jsx(DE, {})] });
}
function Ff({ id: n, store: a, unselect: o = !1, nodeRef: u }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: f, multiSelectionActive: d, nodeLookup: g, onError: p } = a.getState(), h = g.get(n);
  if (!h) {
    p?.("012", yn.error012(n));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), h.selected ? (o || h.selected && d) && (f({ nodes: [h], edges: [] }), requestAnimationFrame(() => u?.current?.blur())) : s([n]);
}
function Zy({ nodeRef: n, disabled: a = !1, noDragClassName: o, handleSelector: u, nodeId: s, isSelectable: f, nodeClickDistance: d }) {
  const g = Je(), [p, h] = F.useState(!1), b = F.useRef();
  return F.useEffect(() => {
    b.current = v2({
      getStoreItems: () => g.getState(),
      onNodeMouseDown: (y) => {
        Ff({
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
  }, []), F.useEffect(() => {
    if (!(a || !n.current || !b.current))
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
  }, [o, u, a, f, n, s, d]), p;
}
const HE = (n) => (a) => a.selected && (a.draggable || n && typeof a.draggable > "u");
function Gy() {
  const n = Je();
  return F.useCallback((o) => {
    const { nodeExtent: u, snapToGrid: s, snapGrid: f, nodesDraggable: d, onError: g, updateNodePositions: p, nodeLookup: h, nodeOrigin: b } = n.getState(), y = /* @__PURE__ */ new Map(), v = HE(d), S = s ? f[0] : 5, w = s ? f[1] : 5, A = o.direction.x * S * o.factor, C = o.direction.y * w * o.factor;
    for (const [, M] of h) {
      if (!v(M))
        continue;
      let q = {
        x: M.internals.positionAbsolute.x + A,
        y: M.internals.positionAbsolute.y + C
      };
      s && (q = Yo(q, f));
      const { position: _, positionAbsolute: N } = fy({
        nodeId: M.id,
        nextPosition: q,
        nodeLookup: h,
        nodeExtent: u,
        nodeOrigin: b,
        onError: g
      });
      M.position = _, M.internals.positionAbsolute = N, y.set(M.id, M);
    }
    p(y);
  }, []);
}
const yd = F.createContext(null), kE = yd.Provider;
yd.Consumer;
const Qy = () => F.useContext(yd), BE = (n) => ({
  connectOnClick: n.connectOnClick,
  noPanClassName: n.noPanClassName,
  rfId: n.rfId
}), Ky = F.createContext(null);
function UE({ children: n }) {
  const a = Oe(BE, Ke);
  return U.jsx(Ky.Provider, { value: a, children: n });
}
function qE() {
  const n = F.useContext(Ky);
  if (!n)
    throw new Error("useHandleConfig must be used within a HandleConfigProvider");
  return n;
}
const jE = {
  connectingFrom: !1,
  connectingTo: !1,
  clickConnecting: !1,
  isPossibleEndHandle: !0,
  connectionInProcess: !1,
  clickConnectionInProcess: !1,
  valid: !1
}, YE = (n, a, o) => (u) => {
  const { connectionClickStartHandle: s, connectionMode: f, connection: d } = u, { fromHandle: g, toHandle: p, isValid: h } = d;
  if (!g && !s)
    return jE;
  const b = p?.nodeId === n && p?.id === a && p?.type === o;
  return {
    connectingFrom: g?.nodeId === n && g?.id === a && g?.type === o,
    connectingTo: b,
    clickConnecting: s?.nodeId === n && s?.id === a && s?.type === o,
    isPossibleEndHandle: f === si.Strict ? g?.type !== o : n !== g?.nodeId || a !== g?.id,
    connectionInProcess: !!g,
    clickConnectionInProcess: !!s,
    valid: b && h
  };
};
function LE({ type: n = "source", position: a = me.Top, isValidConnection: o, isConnectable: u = !0, isConnectableStart: s = !0, isConnectableEnd: f = !0, id: d, onConnect: g, children: p, className: h, onMouseDown: b, onTouchStart: y, ...v }, S) {
  const w = d || null, A = n === "target", C = Je(), M = Qy(), { connectOnClick: q, noPanClassName: _, rfId: N } = qE(), { connectingFrom: j, connectingTo: R, clickConnecting: B, isPossibleEndHandle: X, connectionInProcess: J, clickConnectionInProcess: ue, valid: $ } = Oe(YE(M, w, n), Ke);
  M || C.getState().onError?.("010", yn.error010());
  const I = (V) => {
    const { defaultEdgeOptions: E, onConnect: O, hasDefaultEdges: L } = C.getState(), Z = {
      ...E,
      ...V
    };
    if (L) {
      const { edges: ne, setEdges: z, onError: H } = C.getState();
      z(vE(Z, ne, { onError: H }));
    }
    O?.(Z), g?.(Z);
  }, oe = (V) => {
    if (!M)
      return;
    const E = xy(V.nativeEvent);
    if (s && (E && V.button === 0 || !E)) {
      const O = C.getState();
      Jf.onPointerDown(V.nativeEvent, {
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
        onConnectEnd: (...L) => C.getState().onConnectEnd?.(...L),
        updateConnection: O.updateConnection,
        onConnect: I,
        isValidConnection: o || ((...L) => C.getState().isValidConnection?.(...L) ?? !0),
        getTransform: () => C.getState().transform,
        getFromHandle: () => C.getState().connection.fromHandle,
        autoPanSpeed: O.autoPanSpeed,
        dragThreshold: O.connectionDragThreshold
      });
    }
    E ? b?.(V) : y?.(V);
  }, T = (V) => {
    const { onClickConnectStart: E, onClickConnectEnd: O, connectionClickStartHandle: L, connectionMode: Z, isValidConnection: ne, lib: z, rfId: H, nodeLookup: P, connection: le } = C.getState();
    if (!M || !L && !s)
      return;
    if (!L) {
      E?.(V.nativeEvent, { nodeId: M, handleId: w, handleType: n }), C.setState({ connectionClickStartHandle: { nodeId: M, type: n, id: w } });
      return;
    }
    const re = vy(V.target), fe = o || ne, { connection: ce, isValid: ee } = Jf.isValid(V.nativeEvent, {
      handle: {
        nodeId: M,
        id: w,
        type: n
      },
      connectionMode: Z,
      fromNodeId: L.nodeId,
      fromHandleId: L.id || null,
      fromType: L.type,
      isValidConnection: fe,
      flowId: H,
      doc: re,
      lib: z,
      nodeLookup: P
    });
    ee && ce && I(ce);
    const se = structuredClone(le);
    delete se.inProgress, se.toPosition = se.toHandle ? se.toHandle.position : null, O?.(V, se), C.setState({ connectionClickStartHandle: null });
  };
  return U.jsx("div", { "data-handleid": w, "data-nodeid": M, "data-handlepos": a, "data-id": `${N}-${M}-${w}-${n}`, className: rt([
    "react-flow__handle",
    `react-flow__handle-${a}`,
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
      connectingfrom: j,
      connectingto: R,
      valid: $,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: u && (!J || X) && (J || ue ? f : s)
    }
  ]), onMouseDown: oe, onTouchStart: oe, onClick: q ? T : void 0, ref: S, ...v, children: p });
}
const da = F.memo(Xy(LE));
function VE({ data: n, isConnectable: a, sourcePosition: o = me.Bottom }) {
  return U.jsxs(U.Fragment, { children: [n?.label, U.jsx(da, { type: "source", position: o, isConnectable: a })] });
}
function XE({ data: n, isConnectable: a, targetPosition: o = me.Top, sourcePosition: u = me.Bottom }) {
  return U.jsxs(U.Fragment, { children: [U.jsx(da, { type: "target", position: o, isConnectable: a }), n?.label, U.jsx(da, { type: "source", position: u, isConnectable: a })] });
}
function $E() {
  return null;
}
function ZE({ data: n, isConnectable: a, targetPosition: o = me.Top }) {
  return U.jsxs(U.Fragment, { children: [U.jsx(da, { type: "target", position: o, isConnectable: a }), n?.label] });
}
const Ur = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, cp = {
  input: VE,
  default: XE,
  output: ZE,
  group: $E
};
function GE(n) {
  return n.internals.handleBounds === void 0 ? {
    width: n.width ?? n.initialWidth ?? n.style?.width,
    height: n.height ?? n.initialHeight ?? n.style?.height
  } : {
    width: n.width ?? n.style?.width,
    height: n.height ?? n.style?.height
  };
}
const QE = (n) => {
  const { width: a, height: o, x: u, y: s } = jo(n.nodeLookup, {
    filter: (f) => !!f.selected
  });
  return {
    width: mn(a) ? a : null,
    height: mn(o) ? o : null,
    userSelectionActive: n.userSelectionActive,
    transformString: `translate(${n.transform[0]}px,${n.transform[1]}px) scale(${n.transform[2]}) translate(${u}px,${s}px)`
  };
};
function KE({ onSelectionContextMenu: n, noPanClassName: a, disableKeyboardA11y: o }) {
  const u = Je(), { width: s, height: f, transformString: d, userSelectionActive: g } = Oe(QE, Ke), p = Gy(), h = F.useRef(null);
  F.useEffect(() => {
    o || h.current?.focus({
      preventScroll: !0
    });
  }, [o]);
  const b = !g && s !== null && f !== null;
  if (Zy({
    nodeRef: h,
    disabled: !b
  }), !b)
    return null;
  const y = n ? (S) => {
    const w = u.getState().nodes.filter((A) => A.selected);
    n(S, w);
  } : void 0, v = (S) => {
    Object.prototype.hasOwnProperty.call(Ur, S.key) && (S.preventDefault(), p({
      direction: Ur[S.key],
      factor: S.shiftKey ? 4 : 1
    }));
  };
  return U.jsx("div", { className: rt(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: d
  }, children: U.jsx("div", { ref: h, className: "react-flow__nodesselection-rect", onContextMenu: y, tabIndex: o ? void 0 : -1, onKeyDown: o ? void 0 : v, style: {
    width: s,
    height: f
  } }) });
}
const sp = typeof window < "u" ? window : void 0, JE = (n) => ({ nodesSelectionActive: n.nodesSelectionActive, userSelectionActive: n.userSelectionActive });
function Jy({ children: n, onPaneClick: a, onPaneMouseEnter: o, onPaneMouseMove: u, onPaneMouseLeave: s, onPaneContextMenu: f, onPaneScroll: d, paneClickDistance: g, deleteKeyCode: p, selectionKeyCode: h, selectionOnDrag: b, selectionMode: y, onSelectionStart: v, onSelectionEnd: S, multiSelectionKeyCode: w, panActivationKeyCode: A, zoomActivationKeyCode: C, elementsSelectable: M, zoomOnScroll: q, zoomOnPinch: _, panOnScroll: N, panOnScrollSpeed: j, panOnScrollMode: R, zoomOnDoubleClick: B, panOnDrag: X, autoPanOnSelection: J, defaultViewport: ue, translateExtent: $, minZoom: I, maxZoom: oe, preventScrolling: T, onSelectionContextMenu: V, noWheelClassName: E, noPanClassName: O, disableKeyboardA11y: L, onViewportChange: Z, isControlledViewport: ne }) {
  const { nodesSelectionActive: z, userSelectionActive: H } = Oe(JE, Ke), P = Ro(h, { target: sp }), le = Ro(A, { target: sp }), re = le || X, fe = le || N, ce = b && re !== !0, ee = P || H || ce;
  return ME({ deleteKeyCode: p, multiSelectionKeyCode: w }), U.jsx(AE, { onPaneContextMenu: f, elementsSelectable: M, zoomOnScroll: q, zoomOnPinch: _, panOnScroll: fe, panOnScrollSpeed: j, panOnScrollMode: R, zoomOnDoubleClick: B, panOnDrag: !P && re, defaultViewport: ue, translateExtent: $, minZoom: I, maxZoom: oe, zoomActivationKeyCode: C, preventScrolling: T, noWheelClassName: E, noPanClassName: O, onViewportChange: Z, isControlledViewport: ne, paneClickDistance: g, selectionOnDrag: ce, children: U.jsxs(RE, { onSelectionStart: v, onSelectionEnd: S, onPaneClick: a, onPaneMouseEnter: o, onPaneMouseMove: u, onPaneMouseLeave: s, onPaneContextMenu: f, onPaneScroll: d, panOnDrag: re, autoPanOnSelection: J, isSelecting: !!ee, selectionMode: y, selectionKeyPressed: P, paneClickDistance: g, selectionOnDrag: ce, children: [n, z && U.jsx(KE, { onSelectionContextMenu: V, noPanClassName: O, disableKeyboardA11y: L })] }) });
}
Jy.displayName = "FlowRenderer";
const FE = F.memo(Jy), WE = (n) => (a) => n ? ud(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((o) => o.id) : Array.from(a.nodeLookup.keys());
function IE(n) {
  return Oe(F.useCallback(WE(n), [n]), Ke);
}
const PE = (n) => n.updateNodeInternals;
function ez() {
  const n = Oe(PE), [a] = F.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((o) => {
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
  return F.useEffect(() => () => {
    a?.disconnect();
  }, [a]), a;
}
function tz({ node: n, nodeType: a, hasDimensions: o, resizeObserver: u }) {
  const s = Je(), f = F.useRef(null), d = F.useRef(null), g = F.useRef(n.sourcePosition), p = F.useRef(n.targetPosition), h = F.useRef(a), b = o && !!n.internals.handleBounds;
  return F.useEffect(() => {
    f.current && !n.hidden && (!b || d.current !== f.current) && (d.current && u?.unobserve(d.current), u?.observe(f.current), d.current = f.current);
  }, [b, n.hidden]), F.useEffect(() => () => {
    d.current && (u?.unobserve(d.current), d.current = null);
  }, []), F.useEffect(() => {
    if (f.current) {
      const y = h.current !== a, v = g.current !== n.sourcePosition, S = p.current !== n.targetPosition;
      (y || v || S) && (h.current = a, g.current = n.sourcePosition, p.current = n.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[n.id, { id: n.id, nodeElement: f.current, force: !0 }]])));
    }
  }, [n.id, a, n.sourcePosition, n.targetPosition]), f;
}
function nz({ id: n, onClick: a, onMouseEnter: o, onMouseMove: u, onMouseLeave: s, onContextMenu: f, onDoubleClick: d, nodesDraggable: g, elementsSelectable: p, nodesConnectable: h, nodesFocusable: b, resizeObserver: y, noDragClassName: v, noPanClassName: S, disableKeyboardA11y: w, rfId: A, nodeTypes: C, nodeClickDistance: M, onError: q }) {
  const { node: _, internals: N, isParent: j } = Oe((ee) => {
    const se = ee.nodeLookup.get(n), Se = ee.parentLookup.has(n);
    return {
      node: se,
      internals: se.internals,
      isParent: Se
    };
  }, Ke);
  let R = _.type || "default", B = C?.[R] || cp[R];
  B === void 0 && (q?.("003", yn.error003(R)), R = "default", B = C?.default || cp.default);
  const X = !!(_.draggable || g && typeof _.draggable > "u"), J = !!(_.selectable || p && typeof _.selectable > "u"), ue = !!(_.connectable || h && typeof _.connectable > "u"), $ = !!(_.focusable || b && typeof _.focusable > "u"), I = Je(), oe = py(_), T = tz({ node: _, nodeType: R, hasDimensions: oe, resizeObserver: y }), V = Zy({
    nodeRef: T,
    disabled: _.hidden || !X,
    noDragClassName: v,
    handleSelector: _.dragHandle,
    nodeId: n,
    isSelectable: J,
    nodeClickDistance: M
  }), E = Gy();
  if (_.hidden)
    return null;
  const O = el(_), L = GE(_), Z = J || X || a || o || u || s, ne = o ? (ee) => o(ee, { ...N.userNode }) : void 0, z = u ? (ee) => u(ee, { ...N.userNode }) : void 0, H = s ? (ee) => s(ee, { ...N.userNode }) : void 0, P = f ? (ee) => f(ee, { ...N.userNode }) : void 0, le = d ? (ee) => d(ee, { ...N.userNode }) : void 0, re = (ee) => {
    const { selectNodesOnDrag: se, nodeDragThreshold: Se } = I.getState();
    J && (!se || !X || Se > 0) && Ff({
      id: n,
      store: I,
      nodeRef: T
    }), a && a(ee, { ...N.userNode });
  }, fe = (ee) => {
    if (!(by(ee.nativeEvent) || w)) {
      if (oy.includes(ee.key) && J) {
        const se = ee.key === "Escape";
        Ff({
          id: n,
          store: I,
          unselect: se,
          nodeRef: T
        });
      } else if (X && _.selected && Object.prototype.hasOwnProperty.call(Ur, ee.key)) {
        ee.preventDefault();
        const { ariaLabelConfig: se } = I.getState();
        I.setState({
          ariaLiveMessage: se["node.a11yDescription.ariaLiveMessage"]({
            direction: ee.key.replace("Arrow", "").toLowerCase(),
            x: ~~N.positionAbsolute.x,
            y: ~~N.positionAbsolute.y
          })
        }), E({
          direction: Ur[ee.key],
          factor: ee.shiftKey ? 4 : 1
        });
      }
    }
  }, ce = () => {
    if (w || !T.current?.matches(":focus-visible"))
      return;
    const { transform: ee, width: se, height: Se, autoPanOnNodeFocus: _e, setCenter: ge } = I.getState();
    if (!_e)
      return;
    ud(/* @__PURE__ */ new Map([[n, _]]), { x: 0, y: 0, width: se, height: Se }, ee, !0).length > 0 || ge(_.position.x + O.width / 2, _.position.y + O.height / 2, {
      zoom: ee[2]
    });
  };
  return U.jsx("div", { className: rt([
    "react-flow__node",
    `react-flow__node-${R}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [S]: X
    },
    _.className,
    {
      selected: _.selected,
      selectable: J,
      parent: j,
      draggable: X,
      dragging: V
    }
  ]), ref: T, style: {
    zIndex: N.z,
    transform: `translate(${N.positionAbsolute.x}px,${N.positionAbsolute.y}px)`,
    pointerEvents: Z ? "all" : "none",
    visibility: oe ? "visible" : "hidden",
    ..._.style,
    ...L
  }, "data-id": n, "data-testid": `rf__node-${n}`, onMouseEnter: ne, onMouseMove: z, onMouseLeave: H, onContextMenu: P, onClick: re, onDoubleClick: le, onKeyDown: $ ? fe : void 0, tabIndex: $ ? 0 : void 0, onFocus: $ ? ce : void 0, role: _.ariaRole ?? ($ ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": w ? void 0 : `${Uy}-${A}`, "aria-label": _.ariaLabel, ..._.domAttributes, children: U.jsx(kE, { value: n, children: U.jsx(B, { id: n, data: _.data, type: R, positionAbsoluteX: N.positionAbsolute.x, positionAbsoluteY: N.positionAbsolute.y, selected: _.selected ?? !1, selectable: J, draggable: X, deletable: _.deletable ?? !0, isConnectable: ue, sourcePosition: _.sourcePosition, targetPosition: _.targetPosition, dragging: V, dragHandle: _.dragHandle, zIndex: N.z, parentId: _.parentId, ...O }) }) });
}
var lz = F.memo(nz);
const az = (n) => ({
  nodesDraggable: n.nodesDraggable,
  nodesConnectable: n.nodesConnectable,
  nodesFocusable: n.nodesFocusable,
  elementsSelectable: n.elementsSelectable,
  onError: n.onError
});
function Fy(n) {
  const { nodesDraggable: a, nodesConnectable: o, nodesFocusable: u, elementsSelectable: s, onError: f } = Oe(az, Ke), d = IE(n.onlyRenderVisibleElements), g = ez();
  return U.jsx("div", { className: "react-flow__nodes", style: Ir, children: d.map((p) => (
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
    U.jsx(lz, { id: p, nodeTypes: n.nodeTypes, nodeExtent: n.nodeExtent, onClick: n.onNodeClick, onMouseEnter: n.onNodeMouseEnter, onMouseMove: n.onNodeMouseMove, onMouseLeave: n.onNodeMouseLeave, onContextMenu: n.onNodeContextMenu, onDoubleClick: n.onNodeDoubleClick, noDragClassName: n.noDragClassName, noPanClassName: n.noPanClassName, rfId: n.rfId, disableKeyboardA11y: n.disableKeyboardA11y, resizeObserver: g, nodesDraggable: a, nodesConnectable: o, nodesFocusable: u, elementsSelectable: s, nodeClickDistance: n.nodeClickDistance, onError: f }, p)
  )) });
}
Fy.displayName = "NodeRenderer";
const iz = F.memo(Fy);
function oz(n) {
  return Oe(F.useCallback((o) => {
    if (!n)
      return o.edges.map((s) => s.id);
    const u = [];
    if (o.width && o.height)
      for (const s of o.edges) {
        const f = o.nodeLookup.get(s.source), d = o.nodeLookup.get(s.target);
        f && d && Pw({
          sourceNode: f,
          targetNode: d,
          width: o.width,
          height: o.height,
          transform: o.transform
        }) && u.push(s.id);
      }
    return u;
  }, [n]), Ke);
}
const uz = ({ color: n = "none", strokeWidth: a = 1 }) => {
  const o = {
    strokeWidth: a,
    ...n && { stroke: n }
  };
  return U.jsx("polyline", { className: "arrow", style: o, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, rz = ({ color: n = "none", strokeWidth: a = 1 }) => {
  const o = {
    strokeWidth: a,
    ...n && { stroke: n, fill: n }
  };
  return U.jsx("polyline", { className: "arrowclosed", style: o, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, fp = {
  [Hr.Arrow]: uz,
  [Hr.ArrowClosed]: rz
};
function cz(n) {
  const a = Je();
  return F.useMemo(() => Object.prototype.hasOwnProperty.call(fp, n) ? fp[n] : (a.getState().onError?.("009", yn.error009(n)), null), [n]);
}
const sz = ({ id: n, type: a, color: o, width: u = 12.5, height: s = 12.5, markerUnits: f = "strokeWidth", strokeWidth: d, orient: g = "auto-start-reverse" }) => {
  const p = cz(a);
  return p ? U.jsx("marker", { className: "react-flow__arrowhead", id: n, markerWidth: `${u}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: f, orient: g, refX: "0", refY: "0", children: U.jsx(p, { color: o, strokeWidth: d }) }) : null;
}, Wy = ({ defaultColor: n, rfId: a }) => {
  const o = Oe((f) => f.edges), u = Oe((f) => f.defaultEdgeOptions), s = F.useMemo(() => u2(o, {
    id: a,
    defaultColor: n,
    defaultMarkerStart: u?.markerStart,
    defaultMarkerEnd: u?.markerEnd
  }), [o, u, a, n]);
  return s.length ? U.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: U.jsx("defs", { children: s.map((f) => U.jsx(sz, { id: f.id, type: f.type, color: f.color, width: f.width, height: f.height, markerUnits: f.markerUnits, strokeWidth: f.strokeWidth, orient: f.orient }, f.id)) }) }) : null;
};
Wy.displayName = "MarkerDefinitions";
var fz = F.memo(Wy);
function Iy({ x: n, y: a, label: o, labelStyle: u, labelShowBg: s = !0, labelBgStyle: f, labelBgPadding: d = [2, 4], labelBgBorderRadius: g = 2, children: p, className: h, ...b }) {
  const [y, v] = F.useState({ x: 1, y: 0, width: 0, height: 0 }), S = rt(["react-flow__edge-textwrapper", h]), w = F.useRef(null);
  return F.useEffect(() => {
    if (w.current) {
      const A = w.current.getBBox();
      v({
        x: A.x,
        y: A.y,
        width: A.width,
        height: A.height
      });
    }
  }, [o]), o ? U.jsxs("g", { transform: `translate(${n - y.width / 2} ${a - y.height / 2})`, className: S, visibility: y.width ? "visible" : "hidden", ...b, children: [s && U.jsx("rect", { width: y.width + 2 * d[0], x: -d[0], y: -d[1], height: y.height + 2 * d[1], className: "react-flow__edge-textbg", style: f, rx: g, ry: g }), U.jsx("text", { className: "react-flow__edge-text", y: y.height / 2, dy: "0.3em", ref: w, style: u, children: o }), p] }) : null;
}
Iy.displayName = "EdgeText";
const dz = F.memo(Iy);
function Vo({ path: n, labelX: a, labelY: o, label: u, labelStyle: s, labelShowBg: f, labelBgStyle: d, labelBgPadding: g, labelBgBorderRadius: p, interactionWidth: h = 20, ...b }) {
  return U.jsxs(U.Fragment, { children: [U.jsx("path", { ...b, d: n, fill: "none", className: rt(["react-flow__edge-path", b.className]) }), h ? U.jsx("path", { d: n, fill: "none", strokeOpacity: 0, strokeWidth: h, className: "react-flow__edge-interaction" }) : null, u && mn(a) && mn(o) ? U.jsx(dz, { x: a, y: o, label: u, labelStyle: s, labelShowBg: f, labelBgStyle: d, labelBgPadding: g, labelBgBorderRadius: p }) : null] });
}
function dp({ pos: n, x1: a, y1: o, x2: u, y2: s }) {
  return n === me.Left || n === me.Right ? [0.5 * (a + u), o] : [a, 0.5 * (o + s)];
}
function Py({ sourceX: n, sourceY: a, sourcePosition: o = me.Bottom, targetX: u, targetY: s, targetPosition: f = me.Top }) {
  const [d, g] = dp({
    pos: o,
    x1: n,
    y1: a,
    x2: u,
    y2: s
  }), [p, h] = dp({
    pos: f,
    x1: u,
    y1: s,
    x2: n,
    y2: a
  }), [b, y, v, S] = _y({
    sourceX: n,
    sourceY: a,
    targetX: u,
    targetY: s,
    sourceControlX: d,
    sourceControlY: g,
    targetControlX: p,
    targetControlY: h
  });
  return [
    `M${n},${a} C${d},${g} ${p},${h} ${u},${s}`,
    b,
    y,
    v,
    S
  ];
}
function ev(n) {
  return F.memo(({ id: a, sourceX: o, sourceY: u, targetX: s, targetY: f, sourcePosition: d, targetPosition: g, label: p, labelStyle: h, labelShowBg: b, labelBgStyle: y, labelBgPadding: v, labelBgBorderRadius: S, style: w, markerEnd: A, markerStart: C, interactionWidth: M }) => {
    const [q, _, N] = Py({
      sourceX: o,
      sourceY: u,
      sourcePosition: d,
      targetX: s,
      targetY: f,
      targetPosition: g
    }), j = n.isInternal ? void 0 : a;
    return U.jsx(Vo, { id: j, path: q, labelX: _, labelY: N, label: p, labelStyle: h, labelShowBg: b, labelBgStyle: y, labelBgPadding: v, labelBgBorderRadius: S, style: w, markerEnd: A, markerStart: C, interactionWidth: M });
  });
}
const hz = ev({ isInternal: !1 }), tv = ev({ isInternal: !0 });
hz.displayName = "SimpleBezierEdge";
tv.displayName = "SimpleBezierEdgeInternal";
function nv(n) {
  return F.memo(({ id: a, sourceX: o, sourceY: u, targetX: s, targetY: f, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: h, labelBgPadding: b, labelBgBorderRadius: y, style: v, sourcePosition: S = me.Bottom, targetPosition: w = me.Top, markerEnd: A, markerStart: C, pathOptions: M, interactionWidth: q }) => {
    const [_, N, j] = Gf({
      sourceX: o,
      sourceY: u,
      sourcePosition: S,
      targetX: s,
      targetY: f,
      targetPosition: w,
      borderRadius: M?.borderRadius,
      offset: M?.offset,
      stepPosition: M?.stepPosition
    }), R = n.isInternal ? void 0 : a;
    return U.jsx(Vo, { id: R, path: _, labelX: N, labelY: j, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: h, labelBgPadding: b, labelBgBorderRadius: y, style: v, markerEnd: A, markerStart: C, interactionWidth: q });
  });
}
const lv = nv({ isInternal: !1 }), av = nv({ isInternal: !0 });
lv.displayName = "SmoothStepEdge";
av.displayName = "SmoothStepEdgeInternal";
function iv(n) {
  return F.memo(({ id: a, ...o }) => {
    const u = n.isInternal ? void 0 : a;
    return U.jsx(lv, { ...o, id: u, pathOptions: F.useMemo(() => ({ borderRadius: 0, offset: o.pathOptions?.offset }), [o.pathOptions?.offset]) });
  });
}
const gz = iv({ isInternal: !1 }), ov = iv({ isInternal: !0 });
gz.displayName = "StepEdge";
ov.displayName = "StepEdgeInternal";
function uv(n) {
  return F.memo(({ id: a, sourceX: o, sourceY: u, targetX: s, targetY: f, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: h, labelBgPadding: b, labelBgBorderRadius: y, style: v, markerEnd: S, markerStart: w, interactionWidth: A }) => {
    const [C, M, q] = wy({ sourceX: o, sourceY: u, targetX: s, targetY: f }), _ = n.isInternal ? void 0 : a;
    return U.jsx(Vo, { id: _, path: C, labelX: M, labelY: q, label: d, labelStyle: g, labelShowBg: p, labelBgStyle: h, labelBgPadding: b, labelBgBorderRadius: y, style: v, markerEnd: S, markerStart: w, interactionWidth: A });
  });
}
const mz = uv({ isInternal: !1 }), rv = uv({ isInternal: !0 });
mz.displayName = "StraightEdge";
rv.displayName = "StraightEdgeInternal";
function cv(n) {
  return F.memo(({ id: a, sourceX: o, sourceY: u, targetX: s, targetY: f, sourcePosition: d = me.Bottom, targetPosition: g = me.Top, label: p, labelStyle: h, labelShowBg: b, labelBgStyle: y, labelBgPadding: v, labelBgBorderRadius: S, style: w, markerEnd: A, markerStart: C, pathOptions: M, interactionWidth: q }) => {
    const [_, N, j] = fd({
      sourceX: o,
      sourceY: u,
      sourcePosition: d,
      targetX: s,
      targetY: f,
      targetPosition: g,
      curvature: M?.curvature
    }), R = n.isInternal ? void 0 : a;
    return U.jsx(Vo, { id: R, path: _, labelX: N, labelY: j, label: p, labelStyle: h, labelShowBg: b, labelBgStyle: y, labelBgPadding: v, labelBgBorderRadius: S, style: w, markerEnd: A, markerStart: C, interactionWidth: q });
  });
}
const pz = cv({ isInternal: !1 }), sv = cv({ isInternal: !0 });
pz.displayName = "BezierEdge";
sv.displayName = "BezierEdgeInternal";
const hp = {
  default: sv,
  straight: rv,
  step: ov,
  smoothstep: av,
  simplebezier: tv
}, gp = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null,
  zIndex: void 0
}, yz = (n, a, o) => o === me.Left ? n - a : o === me.Right ? n + a : n, vz = (n, a, o) => o === me.Top ? n - a : o === me.Bottom ? n + a : n, mp = "react-flow__edgeupdater";
function pp({ position: n, centerX: a, centerY: o, radius: u = 10, onMouseDown: s, onMouseEnter: f, onMouseOut: d, type: g }) {
  return U.jsx("circle", { onMouseDown: s, onMouseEnter: f, onMouseOut: d, className: rt([mp, `${mp}-${g}`]), cx: yz(a, u, n), cy: vz(o, u, n), r: u, stroke: "transparent", fill: "transparent" });
}
function bz({ isReconnectable: n, reconnectRadius: a, edge: o, sourceX: u, sourceY: s, targetX: f, targetY: d, sourcePosition: g, targetPosition: p, onReconnect: h, onReconnectStart: b, onReconnectEnd: y, setReconnecting: v, setUpdateHover: S }) {
  const w = Je(), A = (N, j) => {
    if (N.button !== 0)
      return;
    const { autoPanOnConnect: R, domNode: B, connectionMode: X, connectionRadius: J, lib: ue, onConnectStart: $, cancelConnection: I, nodeLookup: oe, rfId: T, panBy: V, updateConnection: E } = w.getState(), O = j.type === "target", L = (z, H) => {
      v(!1), y?.(z, o, j.type, H);
    }, Z = (z) => h?.(o, z), ne = (z, H) => {
      v(!0), b?.(N, o, j.type), $?.(z, H);
    };
    Jf.onPointerDown(N.nativeEvent, {
      autoPanOnConnect: R,
      connectionMode: X,
      connectionRadius: J,
      domNode: B,
      handleId: j.id,
      nodeId: j.nodeId,
      nodeLookup: oe,
      isTarget: O,
      edgeUpdaterType: j.type,
      lib: ue,
      flowId: T,
      cancelConnection: I,
      panBy: V,
      isValidConnection: (...z) => w.getState().isValidConnection?.(...z) ?? !0,
      onConnect: Z,
      onConnectStart: ne,
      onConnectEnd: (...z) => w.getState().onConnectEnd?.(...z),
      onReconnectEnd: L,
      updateConnection: E,
      getTransform: () => w.getState().transform,
      getFromHandle: () => w.getState().connection.fromHandle,
      dragThreshold: w.getState().connectionDragThreshold,
      handleDomNode: N.currentTarget
    });
  }, C = (N) => A(N, { nodeId: o.target, id: o.targetHandle ?? null, type: "target" }), M = (N) => A(N, { nodeId: o.source, id: o.sourceHandle ?? null, type: "source" }), q = () => S(!0), _ = () => S(!1);
  return U.jsxs(U.Fragment, { children: [(n === !0 || n === "source") && U.jsx(pp, { position: g, centerX: u, centerY: s, radius: a, onMouseDown: C, onMouseEnter: q, onMouseOut: _, type: "source" }), (n === !0 || n === "target") && U.jsx(pp, { position: p, centerX: f, centerY: d, radius: a, onMouseDown: M, onMouseEnter: q, onMouseOut: _, type: "target" })] });
}
function xz({ id: n, edgesFocusable: a, edgesReconnectable: o, elementsSelectable: u, onClick: s, onDoubleClick: f, onContextMenu: d, onMouseEnter: g, onMouseMove: p, onMouseLeave: h, reconnectRadius: b, onReconnect: y, onReconnectStart: v, onReconnectEnd: S, rfId: w, edgeTypes: A, noPanClassName: C, onError: M, disableKeyboardA11y: q }) {
  let _ = Oe((ge) => ge.edgeLookup.get(n));
  const N = Oe((ge) => ge.defaultEdgeOptions);
  _ = N ? { ...N, ..._ } : _;
  let j = _.type || "default", R = A?.[j] || hp[j];
  R === void 0 && (M?.("011", yn.error011(j)), j = "default", R = A?.default || hp.default);
  const B = !!(_.focusable || a && typeof _.focusable > "u"), X = typeof y < "u" && (_.reconnectable || o && typeof _.reconnectable > "u"), J = !!(_.selectable || u && typeof _.selectable > "u"), ue = F.useRef(null), [$, I] = F.useState(!1), [oe, T] = F.useState(!1), V = Je(), { zIndex: E = _.zIndex, sourceX: O, sourceY: L, targetX: Z, targetY: ne, sourcePosition: z, targetPosition: H } = Oe(F.useCallback((ge) => {
    const ye = ge.nodeLookup.get(_.source), Ee = ge.nodeLookup.get(_.target);
    if (!ye || !Ee)
      return gp;
    const Re = o2({
      id: n,
      sourceNode: ye,
      targetNode: Ee,
      sourceHandle: _.sourceHandle || null,
      targetHandle: _.targetHandle || null,
      connectionMode: ge.connectionMode,
      onError: M
    }), $e = Iw({
      selected: _.selected,
      zIndex: _.zIndex,
      sourceNode: ye,
      targetNode: Ee,
      elevateOnSelect: ge.elevateEdgesOnSelect,
      zIndexMode: ge.zIndexMode
    });
    return {
      ...Re || gp,
      zIndex: $e
    };
  }, [_.source, _.target, _.sourceHandle, _.targetHandle, _.selected, _.zIndex]), Ke), P = F.useMemo(() => _.markerStart ? `url('#${Qf(_.markerStart, w)}')` : void 0, [_.markerStart, w]), le = F.useMemo(() => _.markerEnd ? `url('#${Qf(_.markerEnd, w)}')` : void 0, [_.markerEnd, w]);
  if (_.hidden || O === null || L === null || Z === null || ne === null)
    return null;
  const re = (ge) => {
    const { addSelectedEdges: ye, unselectNodesAndEdges: Ee, multiSelectionActive: Re } = V.getState();
    J && (V.setState({ nodesSelectionActive: !1 }), _.selected && Re ? (Ee({ nodes: [], edges: [_] }), ue.current?.blur()) : ye([n])), s && s(ge, _);
  }, fe = f ? (ge) => {
    f(ge, { ..._ });
  } : void 0, ce = d ? (ge) => {
    d(ge, { ..._ });
  } : void 0, ee = g ? (ge) => {
    g(ge, { ..._ });
  } : void 0, se = p ? (ge) => {
    p(ge, { ..._ });
  } : void 0, Se = h ? (ge) => {
    h(ge, { ..._ });
  } : void 0, _e = (ge) => {
    if (!q && oy.includes(ge.key) && J) {
      const { unselectNodesAndEdges: ye, addSelectedEdges: Ee } = V.getState();
      ge.key === "Escape" ? (ue.current?.blur(), ye({ edges: [_] })) : Ee([n]);
    }
  };
  return U.jsx("svg", { style: { zIndex: E }, children: U.jsxs("g", { className: rt([
    "react-flow__edge",
    `react-flow__edge-${j}`,
    _.className,
    C,
    {
      selected: _.selected,
      animated: _.animated,
      inactive: !J && !s,
      updating: $,
      selectable: J
    }
  ]), onClick: re, onDoubleClick: fe, onContextMenu: ce, onMouseEnter: ee, onMouseMove: se, onMouseLeave: Se, onKeyDown: B ? _e : void 0, tabIndex: B ? 0 : void 0, role: _.ariaRole ?? (B ? "group" : "img"), "aria-roledescription": "edge", "data-id": n, "data-testid": `rf__edge-${n}`, "aria-label": _.ariaLabel === null ? void 0 : _.ariaLabel || `Edge from ${_.source} to ${_.target}`, "aria-describedby": B ? `${qy}-${w}` : void 0, ref: ue, ..._.domAttributes, children: [!oe && U.jsx(R, { id: n, source: _.source, target: _.target, type: _.type, selected: _.selected, animated: _.animated, selectable: J, deletable: _.deletable ?? !0, label: _.label, labelStyle: _.labelStyle, labelShowBg: _.labelShowBg, labelBgStyle: _.labelBgStyle, labelBgPadding: _.labelBgPadding, labelBgBorderRadius: _.labelBgBorderRadius, sourceX: O, sourceY: L, targetX: Z, targetY: ne, sourcePosition: z, targetPosition: H, data: _.data, style: _.style, sourceHandleId: _.sourceHandle, targetHandleId: _.targetHandle, markerStart: P, markerEnd: le, pathOptions: "pathOptions" in _ ? _.pathOptions : void 0, interactionWidth: _.interactionWidth }), X && U.jsx(bz, { edge: _, isReconnectable: X, reconnectRadius: b, onReconnect: y, onReconnectStart: v, onReconnectEnd: S, sourceX: O, sourceY: L, targetX: Z, targetY: ne, sourcePosition: z, targetPosition: H, setUpdateHover: I, setReconnecting: T })] }) });
}
var _z = F.memo(xz);
const Sz = (n) => ({
  edgesFocusable: n.edgesFocusable,
  edgesReconnectable: n.edgesReconnectable,
  elementsSelectable: n.elementsSelectable,
  connectionMode: n.connectionMode,
  onError: n.onError
});
function fv({ defaultMarkerColor: n, onlyRenderVisibleElements: a, rfId: o, edgeTypes: u, noPanClassName: s, onReconnect: f, onEdgeContextMenu: d, onEdgeMouseEnter: g, onEdgeMouseMove: p, onEdgeMouseLeave: h, onEdgeClick: b, reconnectRadius: y, onEdgeDoubleClick: v, onReconnectStart: S, onReconnectEnd: w, disableKeyboardA11y: A }) {
  const { edgesFocusable: C, edgesReconnectable: M, elementsSelectable: q, onError: _ } = Oe(Sz, Ke), N = oz(a);
  return U.jsxs("div", { className: "react-flow__edges", children: [U.jsx(fz, { defaultColor: n, rfId: o }), N.map((j) => U.jsx(_z, { id: j, edgesFocusable: C, edgesReconnectable: M, elementsSelectable: q, noPanClassName: s, onReconnect: f, onContextMenu: d, onMouseEnter: g, onMouseMove: p, onMouseLeave: h, onClick: b, reconnectRadius: y, onDoubleClick: v, onReconnectStart: S, onReconnectEnd: w, rfId: o, onError: _, edgeTypes: u, disableKeyboardA11y: A }, j))] });
}
fv.displayName = "EdgeRenderer";
const wz = F.memo(fv), Ez = (n) => `translate(${n.transform[0]}px,${n.transform[1]}px) scale(${n.transform[2]})`;
function zz({ children: n }) {
  const a = Oe(Ez);
  return U.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: n });
}
function Mz(n) {
  const a = Wr(), o = F.useRef(!1);
  F.useEffect(() => {
    !o.current && a.viewportInitialized && n && (setTimeout(() => n(a), 1), o.current = !0);
  }, [n, a.viewportInitialized]);
}
const Nz = (n) => n.panZoom?.syncViewport;
function Cz(n) {
  const a = Oe(Nz), o = Je();
  return F.useEffect(() => {
    n && (a?.(n), o.setState({ transform: [n.x, n.y, n.zoom] }));
  }, [n, a]), null;
}
function Az(n) {
  return n.connection.inProgress ? { ...n.connection, to: Lo(n.connection.to, n.transform) } : { ...n.connection };
}
function Tz(n) {
  return Az;
}
function Dz(n) {
  const a = Tz();
  return Oe(a, Ke);
}
const Oz = (n) => ({
  nodesConnectable: n.nodesConnectable,
  isValid: n.connection.isValid,
  inProgress: n.connection.inProgress,
  width: n.width,
  height: n.height
});
function Rz({ containerStyle: n, style: a, type: o, component: u }) {
  const { nodesConnectable: s, width: f, height: d, isValid: g, inProgress: p } = Oe(Oz, Ke);
  return !(f && s && p) ? null : U.jsx("svg", { style: n, width: f, height: d, className: "react-flow__connectionline react-flow__container", children: U.jsx("g", { className: rt(["react-flow__connection", cy(g)]), children: U.jsx(dv, { style: a, type: o, CustomComponent: u, isValid: g }) }) });
}
const dv = ({ style: n, type: a = Ol.Bezier, CustomComponent: o, isValid: u }) => {
  const { inProgress: s, from: f, fromNode: d, fromHandle: g, fromPosition: p, to: h, toNode: b, toHandle: y, toPosition: v, pointer: S } = Dz();
  if (!s)
    return;
  if (o)
    return U.jsx(o, { connectionLineType: a, connectionLineStyle: n, fromNode: d, fromHandle: g, fromX: f.x, fromY: f.y, toX: h.x, toY: h.y, fromPosition: p, toPosition: v, connectionStatus: cy(u), toNode: b, toHandle: y, pointer: S });
  let w = "";
  const A = {
    sourceX: f.x,
    sourceY: f.y,
    sourcePosition: p,
    targetX: h.x,
    targetY: h.y,
    targetPosition: v
  };
  switch (a) {
    case Ol.Bezier:
      [w] = fd(A);
      break;
    case Ol.SimpleBezier:
      [w] = Py(A);
      break;
    case Ol.Step:
      [w] = Gf({
        ...A,
        borderRadius: 0
      });
      break;
    case Ol.SmoothStep:
      [w] = Gf(A);
      break;
    default:
      [w] = wy(A);
  }
  return U.jsx("path", { d: w, fill: "none", className: "react-flow__connection-path", style: n });
};
dv.displayName = "ConnectionLine";
const Hz = {};
function yp(n = Hz) {
  F.useRef(n), Je(), F.useEffect(() => {
  }, [n]);
}
function kz() {
  Je(), F.useRef(!1), F.useEffect(() => {
  }, []);
}
function hv({ nodeTypes: n, edgeTypes: a, onInit: o, onNodeClick: u, onEdgeClick: s, onNodeDoubleClick: f, onEdgeDoubleClick: d, onNodeMouseEnter: g, onNodeMouseMove: p, onNodeMouseLeave: h, onNodeContextMenu: b, onSelectionContextMenu: y, onSelectionStart: v, onSelectionEnd: S, connectionLineType: w, connectionLineStyle: A, connectionLineComponent: C, connectionLineContainerStyle: M, selectionKeyCode: q, selectionOnDrag: _, selectionMode: N, multiSelectionKeyCode: j, panActivationKeyCode: R, zoomActivationKeyCode: B, deleteKeyCode: X, onlyRenderVisibleElements: J, elementsSelectable: ue, defaultViewport: $, translateExtent: I, minZoom: oe, maxZoom: T, preventScrolling: V, defaultMarkerColor: E, zoomOnScroll: O, zoomOnPinch: L, panOnScroll: Z, panOnScrollSpeed: ne, panOnScrollMode: z, zoomOnDoubleClick: H, panOnDrag: P, autoPanOnSelection: le, onPaneClick: re, onPaneMouseEnter: fe, onPaneMouseMove: ce, onPaneMouseLeave: ee, onPaneScroll: se, onPaneContextMenu: Se, paneClickDistance: _e, nodeClickDistance: ge, onEdgeContextMenu: ye, onEdgeMouseEnter: Ee, onEdgeMouseMove: Re, onEdgeMouseLeave: $e, reconnectRadius: pt, onReconnect: Kt, onReconnectStart: wt, onReconnectEnd: Et, noDragClassName: kt, noWheelClassName: Hl, noPanClassName: Cn, disableKeyboardA11y: Ie, nodeExtent: Bt, rfId: Jt, viewport: Ft, onViewportChange: Wt }) {
  return yp(n), yp(a), kz(), Mz(o), Cz(Ft), U.jsx(FE, { onPaneClick: re, onPaneMouseEnter: fe, onPaneMouseMove: ce, onPaneMouseLeave: ee, onPaneContextMenu: Se, onPaneScroll: se, paneClickDistance: _e, deleteKeyCode: X, selectionKeyCode: q, selectionOnDrag: _, selectionMode: N, onSelectionStart: v, onSelectionEnd: S, multiSelectionKeyCode: j, panActivationKeyCode: R, zoomActivationKeyCode: B, elementsSelectable: ue, zoomOnScroll: O, zoomOnPinch: L, zoomOnDoubleClick: H, panOnScroll: Z, panOnScrollSpeed: ne, panOnScrollMode: z, panOnDrag: P, autoPanOnSelection: le, defaultViewport: $, translateExtent: I, minZoom: oe, maxZoom: T, onSelectionContextMenu: y, preventScrolling: V, noDragClassName: kt, noWheelClassName: Hl, noPanClassName: Cn, disableKeyboardA11y: Ie, onViewportChange: Wt, isControlledViewport: !!Ft, children: U.jsxs(zz, { children: [U.jsx(wz, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: d, onReconnect: Kt, onReconnectStart: wt, onReconnectEnd: Et, onlyRenderVisibleElements: J, onEdgeContextMenu: ye, onEdgeMouseEnter: Ee, onEdgeMouseMove: Re, onEdgeMouseLeave: $e, reconnectRadius: pt, defaultMarkerColor: E, noPanClassName: Cn, disableKeyboardA11y: Ie, rfId: Jt }), U.jsx(Rz, { style: A, type: w, component: C, containerStyle: M }), U.jsx("div", { className: "react-flow__edgelabel-renderer" }), U.jsx(iz, { nodeTypes: n, onNodeClick: u, onNodeDoubleClick: f, onNodeMouseEnter: g, onNodeMouseMove: p, onNodeMouseLeave: h, onNodeContextMenu: b, nodeClickDistance: ge, onlyRenderVisibleElements: J, noPanClassName: Cn, noDragClassName: kt, disableKeyboardA11y: Ie, nodeExtent: Bt, rfId: Jt }), U.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
hv.displayName = "GraphView";
const Bz = F.memo(hv), Uz = my(), vp = ({ nodes: n, edges: a, defaultNodes: o, defaultEdges: u, width: s, height: f, fitView: d, fitViewOptions: g, minZoom: p = 0.5, maxZoom: h = 2, nodeOrigin: b, nodeExtent: y, zIndexMode: v = "basic" } = {}) => {
  const S = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Map(), M = u ?? a ?? [], q = o ?? n ?? [], _ = b ?? [0, 0], N = y ?? Ao;
  My(A, C, M);
  const { nodesInitialized: j } = Kf(q, S, w, {
    nodeOrigin: _,
    nodeExtent: N,
    zIndexMode: v
  });
  let R = [0, 0, 1];
  if (d && s && f) {
    const B = jo(S, {
      filter: ($) => !!(($.width || $.initialWidth) && ($.height || $.initialHeight))
    }), { x: X, y: J, zoom: ue } = cd(B, s, f, p, h, g?.padding ?? 0.1);
    R = [X, J, ue];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: f ?? 0,
    transform: R,
    nodes: q,
    nodesInitialized: j,
    nodeLookup: S,
    parentLookup: w,
    edges: M,
    edgeLookup: C,
    connectionLookup: A,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: o !== void 0,
    hasDefaultEdges: u !== void 0,
    panZoom: null,
    minZoom: p,
    maxZoom: h,
    translateExtent: Ao,
    nodeExtent: N,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: si.Strict,
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
    connection: { ...ry },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: Uz,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: uy,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, qz = ({ nodes: n, edges: a, defaultNodes: o, defaultEdges: u, width: s, height: f, fitView: d, fitViewOptions: g, minZoom: p, maxZoom: h, nodeOrigin: b, nodeExtent: y, zIndexMode: v }) => J2((S, w) => {
  async function A() {
    const { nodeLookup: C, panZoom: M, fitViewOptions: q, fitViewResolver: _, width: N, height: j, minZoom: R, maxZoom: B } = w();
    M && (await Zw({
      nodes: C,
      width: N,
      height: j,
      panZoom: M,
      minZoom: R,
      maxZoom: B
    }, q), _?.resolve(!0), S({ fitViewResolver: null }));
  }
  return {
    ...vp({
      nodes: n,
      edges: a,
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
    setNodes: (C) => {
      const { nodeLookup: M, parentLookup: q, nodeOrigin: _, elevateNodesOnSelect: N, fitViewQueued: j, zIndexMode: R, nodesSelectionActive: B } = w(), { nodesInitialized: X, hasSelectedNodes: J } = Kf(C, M, q, {
        nodeOrigin: _,
        nodeExtent: y,
        elevateNodesOnSelect: N,
        checkEquality: !0,
        zIndexMode: R
      }), ue = B && J;
      j && X ? (A(), S({
        nodes: C,
        nodesInitialized: X,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: ue
      })) : S({ nodes: C, nodesInitialized: X, nodesSelectionActive: ue });
    },
    setEdges: (C) => {
      const { connectionLookup: M, edgeLookup: q } = w();
      My(M, q, C), S({ edges: C });
    },
    setDefaultNodesAndEdges: (C, M) => {
      if (C) {
        const { setNodes: q } = w();
        q(C), S({ hasDefaultNodes: !0 });
      }
      if (M) {
        const { setEdges: q } = w();
        q(M), S({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (C) => {
      const { triggerNodeChanges: M, nodeLookup: q, parentLookup: _, domNode: N, nodeOrigin: j, nodeExtent: R, debug: B, fitViewQueued: X, zIndexMode: J } = w(), { changes: ue, updatedInternals: $ } = g2(C, q, _, N, j, R, J);
      $ && (s2(q, _, { nodeOrigin: j, nodeExtent: R, zIndexMode: J }), X ? (A(), S({ fitViewQueued: !1, fitViewOptions: void 0 })) : S({}), ue?.length > 0 && (B && console.log("React Flow: trigger node changes", ue), M?.(ue)));
    },
    updateNodePositions: (C, M = !1) => {
      const q = [];
      let _ = [];
      const { nodeLookup: N, triggerNodeChanges: j, connection: R, updateConnection: B, onNodesChangeMiddlewareMap: X } = w();
      for (const [J, ue] of C) {
        const $ = N.get(J), I = !!($?.expandParent && $?.parentId && ue?.position), oe = {
          id: J,
          type: "position",
          position: I ? {
            x: Math.max(0, ue.position.x),
            y: Math.max(0, ue.position.y)
          } : ue.position,
          dragging: M
        };
        if ($ && R.inProgress && R.fromNode.id === $.id) {
          const T = fa($, R.fromHandle, me.Left, !0);
          B({ ...R, from: T });
        }
        I && $.parentId && q.push({
          id: J,
          parentId: $.parentId,
          rect: {
            ...ue.internals.positionAbsolute,
            width: ue.measured.width ?? 0,
            height: ue.measured.height ?? 0
          }
        }), _.push(oe);
      }
      if (q.length > 0) {
        const { parentLookup: J, nodeOrigin: ue } = w(), $ = pd(q, N, J, ue);
        _.push(...$);
      }
      for (const J of X.values())
        _ = J(_);
      j(_);
    },
    triggerNodeChanges: (C) => {
      const { onNodesChange: M, setNodes: q, nodes: _, hasDefaultNodes: N, debug: j } = w();
      if (C?.length) {
        if (N) {
          const R = Ly(C, _);
          q(R);
        }
        j && console.log("React Flow: trigger node changes", C), M?.(C);
      }
    },
    triggerEdgeChanges: (C) => {
      const { onEdgesChange: M, setEdges: q, edges: _, hasDefaultEdges: N, debug: j } = w();
      if (C?.length) {
        if (N) {
          const R = Vy(C, _);
          q(R);
        }
        j && console.log("React Flow: trigger edge changes", C), M?.(C);
      }
    },
    addSelectedNodes: (C) => {
      const { multiSelectionActive: M, edgeLookup: q, nodeLookup: _, triggerNodeChanges: N, triggerEdgeChanges: j } = w();
      if (M) {
        const R = C.map((B) => ta(B, !0));
        N(R);
        return;
      }
      N(ai(_, /* @__PURE__ */ new Set([...C]), !0)), j(ai(q));
    },
    addSelectedEdges: (C) => {
      const { multiSelectionActive: M, edgeLookup: q, nodeLookup: _, triggerNodeChanges: N, triggerEdgeChanges: j } = w();
      if (M) {
        const R = C.map((B) => ta(B, !0));
        j(R);
        return;
      }
      j(ai(q, /* @__PURE__ */ new Set([...C]))), N(ai(_, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: C, edges: M } = {}) => {
      const { edges: q, nodes: _, nodeLookup: N, triggerNodeChanges: j, triggerEdgeChanges: R } = w(), B = C || _, X = M || q, J = [];
      for (const $ of B) {
        if (!$.selected)
          continue;
        const I = N.get($.id);
        I && (I.selected = !1), J.push(ta($.id, !1));
      }
      const ue = [];
      for (const $ of X)
        $.selected && ue.push(ta($.id, !1));
      j(J), R(ue);
    },
    setMinZoom: (C) => {
      const { panZoom: M, maxZoom: q } = w();
      M?.setScaleExtent([C, q]), S({ minZoom: C });
    },
    setMaxZoom: (C) => {
      const { panZoom: M, minZoom: q } = w();
      M?.setScaleExtent([q, C]), S({ maxZoom: C });
    },
    setTranslateExtent: (C) => {
      w().panZoom?.setTranslateExtent(C), S({ translateExtent: C });
    },
    resetSelectedElements: () => {
      const { edges: C, nodes: M, triggerNodeChanges: q, triggerEdgeChanges: _, elementsSelectable: N } = w();
      if (!N)
        return;
      const j = M.reduce((B, X) => X.selected ? [...B, ta(X.id, !1)] : B, []), R = C.reduce((B, X) => X.selected ? [...B, ta(X.id, !1)] : B, []);
      q(j), _(R);
    },
    setNodeExtent: (C) => {
      const { nodes: M, nodeLookup: q, parentLookup: _, nodeOrigin: N, elevateNodesOnSelect: j, nodeExtent: R, zIndexMode: B } = w();
      C[0][0] === R[0][0] && C[0][1] === R[0][1] && C[1][0] === R[1][0] && C[1][1] === R[1][1] || (Kf(M, q, _, {
        nodeOrigin: N,
        nodeExtent: C,
        elevateNodesOnSelect: j,
        checkEquality: !1,
        zIndexMode: B
      }), S({ nodeExtent: C }));
    },
    panBy: (C) => {
      const { transform: M, width: q, height: _, panZoom: N, translateExtent: j } = w();
      return m2({ delta: C, panZoom: N, transform: M, translateExtent: j, width: q, height: _ });
    },
    setCenter: async (C, M, q) => {
      const { width: _, height: N, maxZoom: j, panZoom: R } = w();
      if (!R)
        return !1;
      const B = typeof q?.zoom < "u" ? q.zoom : j;
      return await R.setViewport({
        x: _ / 2 - C * B,
        y: N / 2 - M * B,
        zoom: B
      }, { duration: q?.duration, ease: q?.ease, interpolate: q?.interpolate }), !0;
    },
    cancelConnection: () => {
      S({
        connection: { ...ry }
      });
    },
    updateConnection: (C) => {
      S({ connection: C });
    },
    reset: () => S({ ...vp() })
  };
}, Object.is);
function gv({ initialNodes: n, initialEdges: a, defaultNodes: o, defaultEdges: u, initialWidth: s, initialHeight: f, initialMinZoom: d, initialMaxZoom: g, initialFitViewOptions: p, fitView: h, nodeOrigin: b, nodeExtent: y, zIndexMode: v, children: S }) {
  const [w] = F.useState(() => qz({
    nodes: n,
    edges: a,
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
  return U.jsx(W2, { value: w, children: U.jsx(SE, { children: U.jsx(UE, { children: S }) }) });
}
function jz({ children: n, nodes: a, edges: o, defaultNodes: u, defaultEdges: s, width: f, height: d, fitView: g, fitViewOptions: p, minZoom: h, maxZoom: b, nodeOrigin: y, nodeExtent: v, zIndexMode: S }) {
  return F.useContext(Jr) ? U.jsx(U.Fragment, { children: n }) : U.jsx(gv, { initialNodes: a, initialEdges: o, defaultNodes: u, defaultEdges: s, initialWidth: f, initialHeight: d, fitView: g, initialFitViewOptions: p, initialMinZoom: h, initialMaxZoom: b, nodeOrigin: y, nodeExtent: v, zIndexMode: S, children: n });
}
const Yz = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function Lz({ nodes: n, edges: a, defaultNodes: o, defaultEdges: u, className: s, nodeTypes: f, edgeTypes: d, onNodeClick: g, onEdgeClick: p, onInit: h, onMove: b, onMoveStart: y, onMoveEnd: v, onConnect: S, onConnectStart: w, onConnectEnd: A, onClickConnectStart: C, onClickConnectEnd: M, onNodeMouseEnter: q, onNodeMouseMove: _, onNodeMouseLeave: N, onNodeContextMenu: j, onNodeDoubleClick: R, onNodeDragStart: B, onNodeDrag: X, onNodeDragStop: J, onNodesDelete: ue, onEdgesDelete: $, onDelete: I, onSelectionChange: oe, onSelectionDragStart: T, onSelectionDrag: V, onSelectionDragStop: E, onSelectionContextMenu: O, onSelectionStart: L, onSelectionEnd: Z, onBeforeDelete: ne, connectionMode: z, connectionLineType: H = Ol.Bezier, connectionLineStyle: P, connectionLineComponent: le, connectionLineContainerStyle: re, deleteKeyCode: fe = "Backspace", selectionKeyCode: ce = "Shift", selectionOnDrag: ee = !1, selectionMode: se = To.Full, panActivationKeyCode: Se = "Space", multiSelectionKeyCode: _e = Oo() ? "Meta" : "Control", zoomActivationKeyCode: ge = Oo() ? "Meta" : "Control", snapToGrid: ye, snapGrid: Ee, onlyRenderVisibleElements: Re = !1, selectNodesOnDrag: $e, nodesDraggable: pt, autoPanOnNodeFocus: Kt, nodesConnectable: wt, nodesFocusable: Et, nodeOrigin: kt = jy, edgesFocusable: Hl, edgesReconnectable: Cn, elementsSelectable: Ie = !0, defaultViewport: Bt = sE, minZoom: Jt = 0.5, maxZoom: Ft = 2, translateExtent: Wt = Ao, preventScrolling: tc = !0, nodeExtent: ha, defaultMarkerColor: nc = "#b1b1b7", zoomOnScroll: lc = !0, zoomOnPinch: kl = !0, panOnScroll: xt = !1, panOnScrollSpeed: bn = 0.5, panOnScrollMode: _t = ia.Free, zoomOnDoubleClick: ac = !0, panOnDrag: ic = !0, onPaneClick: oc, onPaneMouseEnter: ga, onPaneMouseMove: ma, onPaneMouseLeave: pa, onPaneScroll: An, onPaneContextMenu: ya, paneClickDistance: Bl = 1, nodeClickDistance: uc = 0, children: $o, onReconnect: yi, onReconnectStart: Ul, onReconnectEnd: rc, onEdgeContextMenu: Zo, onEdgeDoubleClick: Go, onEdgeMouseEnter: Qo, onEdgeMouseMove: vi, onEdgeMouseLeave: bi, reconnectRadius: Ko = 10, onNodesChange: Jo, onEdgesChange: xn, noDragClassName: ct = "nodrag", noWheelClassName: yt = "nowheel", noPanClassName: Tn = "nopan", fitView: va, fitViewOptions: Fo, connectOnClick: cc, attributionPosition: Wo, proOptions: ql, defaultEdgeOptions: xi, elevateNodesOnSelect: tl = !0, elevateEdgesOnSelect: nl = !1, disableKeyboardA11y: ll = !1, autoPanOnConnect: al, autoPanOnNodeDrag: nt, autoPanOnSelection: Io = !0, autoPanSpeed: Po, connectionRadius: Dn, isValidConnection: il, onError: sc, style: eu, id: _i, nodeDragThreshold: fc, connectionDragThreshold: ba, viewport: xa, onViewportChange: rn, width: zt, height: tu, colorMode: dc = "light", debug: Si, onScroll: wi, ariaLabelConfig: _a, zIndexMode: nu = "basic", ...Mt }, Ei) {
  const Sa = _i || "1", zi = gE(dc), ol = F.useCallback((Mi) => {
    Mi.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), wi?.(Mi);
  }, [wi]);
  return U.jsx("div", { "data-testid": "rf__wrapper", ...Mt, onScroll: ol, style: { ...eu, ...Yz }, ref: Ei, className: rt(["react-flow", s, zi]), id: _i, role: "application", children: U.jsxs(jz, { nodes: n, edges: a, width: zt, height: tu, fitView: va, fitViewOptions: Fo, minZoom: Jt, maxZoom: Ft, nodeOrigin: kt, nodeExtent: ha, zIndexMode: nu, children: [U.jsx(hE, { nodes: n, edges: a, defaultNodes: o, defaultEdges: u, onConnect: S, onConnectStart: w, onConnectEnd: A, onClickConnectStart: C, onClickConnectEnd: M, nodesDraggable: pt, autoPanOnNodeFocus: Kt, nodesConnectable: wt, nodesFocusable: Et, edgesFocusable: Hl, edgesReconnectable: Cn, elementsSelectable: Ie, elevateNodesOnSelect: tl, elevateEdgesOnSelect: nl, minZoom: Jt, maxZoom: Ft, nodeExtent: ha, onNodesChange: Jo, onEdgesChange: xn, snapToGrid: ye, snapGrid: Ee, connectionMode: z, translateExtent: Wt, connectOnClick: cc, defaultEdgeOptions: xi, fitView: va, fitViewOptions: Fo, onNodesDelete: ue, onEdgesDelete: $, onDelete: I, onNodeDragStart: B, onNodeDrag: X, onNodeDragStop: J, onSelectionDrag: V, onSelectionDragStart: T, onSelectionDragStop: E, onMove: b, onMoveStart: y, onMoveEnd: v, noPanClassName: Tn, nodeOrigin: kt, rfId: Sa, autoPanOnConnect: al, autoPanOnNodeDrag: nt, autoPanSpeed: Po, onError: sc, connectionRadius: Dn, isValidConnection: il, selectNodesOnDrag: $e, nodeDragThreshold: fc, connectionDragThreshold: ba, onBeforeDelete: ne, debug: Si, ariaLabelConfig: _a, zIndexMode: nu }), U.jsx(Bz, { onInit: h, onNodeClick: g, onEdgeClick: p, onNodeMouseEnter: q, onNodeMouseMove: _, onNodeMouseLeave: N, onNodeContextMenu: j, onNodeDoubleClick: R, nodeTypes: f, edgeTypes: d, connectionLineType: H, connectionLineStyle: P, connectionLineComponent: le, connectionLineContainerStyle: re, selectionKeyCode: ce, selectionOnDrag: ee, selectionMode: se, deleteKeyCode: fe, multiSelectionKeyCode: _e, panActivationKeyCode: Se, zoomActivationKeyCode: ge, onlyRenderVisibleElements: Re, defaultViewport: Bt, translateExtent: Wt, minZoom: Jt, maxZoom: Ft, preventScrolling: tc, zoomOnScroll: lc, zoomOnPinch: kl, zoomOnDoubleClick: ac, panOnScroll: xt, panOnScrollSpeed: bn, panOnScrollMode: _t, panOnDrag: ic, autoPanOnSelection: Io, onPaneClick: oc, onPaneMouseEnter: ga, onPaneMouseMove: ma, onPaneMouseLeave: pa, onPaneScroll: An, onPaneContextMenu: ya, paneClickDistance: Bl, nodeClickDistance: uc, onSelectionContextMenu: O, onSelectionStart: L, onSelectionEnd: Z, onReconnect: yi, onReconnectStart: Ul, onReconnectEnd: rc, onEdgeContextMenu: Zo, onEdgeDoubleClick: Go, onEdgeMouseEnter: Qo, onEdgeMouseMove: vi, onEdgeMouseLeave: bi, reconnectRadius: Ko, defaultMarkerColor: nc, noDragClassName: ct, noWheelClassName: yt, noPanClassName: Tn, rfId: Sa, disableKeyboardA11y: ll, nodeExtent: ha, viewport: xa, onViewportChange: rn }), U.jsx(cE, { onSelectionChange: oe }), $o, U.jsx(aE, { proOptions: ql, position: Wo }), U.jsx(lE, { rfId: Sa, disableKeyboardA11y: ll })] }) });
}
var Vz = Xy(Lz);
const Xz = (n) => n.domNode?.querySelector(".react-flow__edgelabel-renderer");
function $z({ children: n }) {
  const a = Oe(Xz);
  return a ? F2.createPortal(n, a) : null;
}
function Zz(n) {
  const [a, o] = F.useState(n), u = F.useCallback((s) => o((f) => Ly(s, f)), []);
  return [a, o, u];
}
function Gz(n) {
  const [a, o] = F.useState(n), u = F.useCallback((s) => o((f) => Vy(s, f)), []);
  return [a, o, u];
}
function Qz({ dimensions: n, lineWidth: a, variant: o, className: u }) {
  return U.jsx("path", { strokeWidth: a, d: `M${n[0] / 2} 0 V${n[1]} M0 ${n[1] / 2} H${n[0]}`, className: rt(["react-flow__background-pattern", o, u]) });
}
function Kz({ radius: n, className: a }) {
  return U.jsx("circle", { cx: n, cy: n, r: n, className: rt(["react-flow__background-pattern", "dots", a]) });
}
var In;
(function(n) {
  n.Lines = "lines", n.Dots = "dots", n.Cross = "cross";
})(In || (In = {}));
const Jz = {
  [In.Dots]: 1,
  [In.Lines]: 1,
  [In.Cross]: 6
}, Fz = (n) => ({ transform: n.transform, patternId: `pattern-${n.rfId}` });
function mv({
  id: n,
  variant: a = In.Dots,
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
  const y = F.useRef(null), { transform: v, patternId: S } = Oe(Fz, Ke), w = u || Jz[a], A = a === In.Dots, C = a === In.Cross, M = Array.isArray(o) ? o : [o, o], q = [M[0] * v[2] || 1, M[1] * v[2] || 1], _ = w * v[2], N = Array.isArray(f) ? f : [f, f], j = C ? [_, _] : q, R = [
    N[0] * v[2] || 1 + j[0] / 2,
    N[1] * v[2] || 1 + j[1] / 2
  ], B = `${S}${n || ""}`;
  return U.jsxs("svg", { className: rt(["react-flow__background", h]), style: {
    ...p,
    ...Ir,
    "--xy-background-color-props": g,
    "--xy-background-pattern-color-props": d
  }, ref: y, "data-testid": "rf__background", children: [U.jsx("pattern", { id: B, x: v[0] % q[0], y: v[1] % q[1], width: q[0], height: q[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${R[0]},-${R[1]})`, children: A ? U.jsx(Kz, { radius: _ / 2, className: b }) : U.jsx(Qz, { dimensions: j, lineWidth: s, variant: a, className: b }) }), U.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${B})` })] });
}
mv.displayName = "Background";
const Wz = F.memo(mv);
function Iz() {
  return U.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: U.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function Pz() {
  return U.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: U.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function e3() {
  return U.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: U.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function t3() {
  return U.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: U.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function n3() {
  return U.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: U.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function xr({ children: n, className: a, ...o }) {
  return U.jsx("button", { type: "button", className: rt(["react-flow__controls-button", a]), ...o, children: n });
}
const l3 = (n) => ({
  isInteractive: n.nodesDraggable || n.nodesConnectable || n.elementsSelectable,
  minZoomReached: n.transform[2] <= n.minZoom,
  maxZoomReached: n.transform[2] >= n.maxZoom,
  ariaLabelConfig: n.ariaLabelConfig
});
function pv({ style: n, showZoom: a = !0, showFitView: o = !0, showInteractive: u = !0, fitViewOptions: s, onZoomIn: f, onZoomOut: d, onFitView: g, onInteractiveChange: p, className: h, children: b, position: y = "bottom-left", orientation: v = "vertical", "aria-label": S }) {
  const w = Je(), { isInteractive: A, minZoomReached: C, maxZoomReached: M, ariaLabelConfig: q } = Oe(l3, Ke), { zoomIn: _, zoomOut: N, fitView: j } = Wr(), R = () => {
    _(), f?.();
  }, B = () => {
    N(), d?.();
  }, X = () => {
    j(s), g?.();
  }, J = () => {
    w.setState({
      nodesDraggable: !A,
      nodesConnectable: !A,
      elementsSelectable: !A
    }), p?.(!A);
  }, ue = v === "horizontal" ? "horizontal" : "vertical";
  return U.jsxs(Fr, { className: rt(["react-flow__controls", ue, h]), position: y, style: n, "data-testid": "rf__controls", "aria-label": S ?? q["controls.ariaLabel"], children: [a && U.jsxs(U.Fragment, { children: [U.jsx(xr, { onClick: R, className: "react-flow__controls-zoomin", title: q["controls.zoomIn.ariaLabel"], "aria-label": q["controls.zoomIn.ariaLabel"], disabled: M, children: U.jsx(Iz, {}) }), U.jsx(xr, { onClick: B, className: "react-flow__controls-zoomout", title: q["controls.zoomOut.ariaLabel"], "aria-label": q["controls.zoomOut.ariaLabel"], disabled: C, children: U.jsx(Pz, {}) })] }), o && U.jsx(xr, { className: "react-flow__controls-fitview", onClick: X, title: q["controls.fitView.ariaLabel"], "aria-label": q["controls.fitView.ariaLabel"], children: U.jsx(e3, {}) }), u && U.jsx(xr, { className: "react-flow__controls-interactive", onClick: J, title: q["controls.interactive.ariaLabel"], "aria-label": q["controls.interactive.ariaLabel"], children: A ? U.jsx(n3, {}) : U.jsx(t3, {}) }), b] });
}
pv.displayName = "Controls";
const a3 = F.memo(pv);
function i3({ id: n, x: a, y: o, width: u, height: s, style: f, color: d, strokeColor: g, strokeWidth: p, className: h, borderRadius: b, shapeRendering: y, selected: v, onClick: S }) {
  const { background: w, backgroundColor: A } = f || {}, C = d || w || A;
  return U.jsx("rect", { className: rt(["react-flow__minimap-node", { selected: v }, h]), x: a, y: o, rx: b, ry: b, width: u, height: s, style: {
    fill: C,
    stroke: g,
    strokeWidth: p
  }, shapeRendering: y, onClick: S ? (M) => S(M, n) : void 0 });
}
const o3 = F.memo(i3), u3 = (n) => n.nodes.map((a) => a.id), Bf = (n) => n instanceof Function ? n : () => n;
function r3({
  nodeStrokeColor: n,
  nodeColor: a,
  nodeClassName: o = "",
  nodeBorderRadius: u = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: f = o3,
  onClick: d
}) {
  const g = Oe(u3, Ke), p = Bf(a), h = Bf(n), b = Bf(o), y = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return U.jsx(U.Fragment, { children: g.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    U.jsx(s3, { id: v, nodeColorFunc: p, nodeStrokeColorFunc: h, nodeClassNameFunc: b, nodeBorderRadius: u, nodeStrokeWidth: s, NodeComponent: f, onClick: d, shapeRendering: y }, v)
  )) });
}
function c3({ id: n, nodeColorFunc: a, nodeStrokeColorFunc: o, nodeClassNameFunc: u, nodeBorderRadius: s, nodeStrokeWidth: f, shapeRendering: d, NodeComponent: g, onClick: p }) {
  const { node: h, x: b, y, width: v, height: S } = Oe((w) => {
    const A = w.nodeLookup.get(n);
    if (!A)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const C = A.internals.userNode, { x: M, y: q } = A.internals.positionAbsolute, { width: _, height: N } = el(C);
    return {
      node: C,
      x: M,
      y: q,
      width: _,
      height: N
    };
  }, Ke);
  return !h || h.hidden || !py(h) ? null : U.jsx(g, { x: b, y, width: v, height: S, style: h.style, selected: !!h.selected, className: u(h), color: a(h), borderRadius: s, strokeColor: o(h), strokeWidth: f, shapeRendering: d, onClick: p, id: h.id });
}
const s3 = F.memo(c3);
var f3 = F.memo(r3);
const d3 = 200, h3 = 150, g3 = (n) => !n.hidden, m3 = (n) => {
  const a = {
    x: -n.transform[0] / n.transform[2],
    y: -n.transform[1] / n.transform[2],
    width: n.width / n.transform[2],
    height: n.height / n.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: n.nodeLookup.size > 0 ? hy(jo(n.nodeLookup, { filter: g3 }), a) : a,
    rfId: n.rfId,
    panZoom: n.panZoom,
    translateExtent: n.translateExtent,
    flowWidth: n.width,
    flowHeight: n.height,
    ariaLabelConfig: n.ariaLabelConfig
  };
}, p3 = "react-flow__minimap-desc";
function yv({
  style: n,
  className: a,
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
  zoomable: C = !1,
  ariaLabel: M,
  inversePan: q,
  zoomStep: _ = 1,
  offsetScale: N = 5
}) {
  const j = Je(), R = F.useRef(null), { boundingRect: B, viewBB: X, rfId: J, panZoom: ue, translateExtent: $, flowWidth: I, flowHeight: oe, ariaLabelConfig: T } = Oe(m3, Ke), V = n?.width ?? d3, E = n?.height ?? h3, O = B.width / V, L = B.height / E, Z = Math.max(O, L), ne = Z * V, z = Z * E, H = N * Z, P = B.x - (ne - B.width) / 2 - H, le = B.y - (z - B.height) / 2 - H, re = ne + H * 2, fe = z + H * 2, ce = `${p3}-${J}`, ee = F.useRef(0), se = F.useRef();
  ee.current = Z, F.useEffect(() => {
    if (R.current && ue)
      return se.current = E2({
        domNode: R.current,
        panZoom: ue,
        getTransform: () => j.getState().transform,
        getViewScale: () => ee.current
      }), () => {
        se.current?.destroy();
      };
  }, [ue]), F.useEffect(() => {
    se.current?.update({
      translateExtent: $,
      width: I,
      height: oe,
      inversePan: q,
      pannable: A,
      zoomStep: _,
      zoomable: C
    });
  }, [A, C, q, _, $, I, oe]);
  const Se = S ? (ye) => {
    const [Ee, Re] = se.current?.pointer(ye) || [0, 0];
    S(ye, { x: Ee, y: Re });
  } : void 0, _e = w ? F.useCallback((ye, Ee) => {
    const Re = j.getState().nodeLookup.get(Ee).internals.userNode;
    w(ye, Re);
  }, []) : void 0, ge = M ?? T["minimap.ariaLabel"];
  return U.jsx(Fr, { position: v, style: {
    ...n,
    "--xy-minimap-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-background-color-props": typeof h == "string" ? h : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof b == "string" ? b : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof y == "number" ? y * Z : void 0,
    "--xy-minimap-node-background-color-props": typeof u == "string" ? u : void 0,
    "--xy-minimap-node-stroke-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-width-props": typeof d == "number" ? d : void 0
  }, className: rt(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: U.jsxs("svg", { width: V, height: E, viewBox: `${P} ${le} ${re} ${fe}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": ce, ref: R, onClick: Se, children: [ge && U.jsx("title", { id: ce, children: ge }), U.jsx(f3, { onClick: _e, nodeColor: u, nodeStrokeColor: o, nodeBorderRadius: f, nodeClassName: s, nodeStrokeWidth: d, nodeComponent: g }), U.jsx("path", { className: "react-flow__minimap-mask", d: `M${P - H},${le - H}h${re + H * 2}v${fe + H * 2}h${-re - H * 2}z
        M${X.x},${X.y}h${X.width}v${X.height}h${-X.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
yv.displayName = "MiniMap";
F.memo(yv);
const y3 = (n) => (a) => n ? `${Math.max(1 / a.transform[2], 1)}` : void 0, v3 = {
  [hi.Line]: "right",
  [hi.Handle]: "bottom-right"
};
function b3({ nodeId: n, position: a, variant: o = hi.Handle, className: u, style: s = void 0, children: f, color: d, minWidth: g = 10, minHeight: p = 10, maxWidth: h = Number.MAX_VALUE, maxHeight: b = Number.MAX_VALUE, keepAspectRatio: y = !1, resizeDirection: v, autoScale: S = !0, shouldResize: w, onResizeStart: A, onResize: C, onResizeEnd: M }) {
  const q = Qy(), _ = typeof n == "string" ? n : q, N = Je(), j = F.useRef(null), R = o === hi.Handle, B = Oe(F.useCallback(y3(R && S), [R, S]), Ke), X = F.useRef(null), J = a ?? v3[o];
  F.useEffect(() => {
    if (!(!j.current || !_))
      return X.current || (X.current = U2({
        domNode: j.current,
        nodeId: _,
        getStoreItems: () => {
          const { nodeLookup: $, transform: I, snapGrid: oe, snapToGrid: T, nodeOrigin: V, domNode: E } = N.getState();
          return {
            nodeLookup: $,
            transform: I,
            snapGrid: oe,
            snapToGrid: T,
            nodeOrigin: V,
            paneDomNode: E
          };
        },
        onChange: ($, I) => {
          const { triggerNodeChanges: oe, nodeLookup: T, parentLookup: V, nodeOrigin: E } = N.getState(), O = [], L = { x: $.x, y: $.y }, Z = T.get(_);
          if (Z && Z.expandParent && Z.parentId) {
            const ne = Z.origin ?? E, z = $.width ?? Z.measured.width ?? 0, H = $.height ?? Z.measured.height ?? 0, P = {
              id: Z.id,
              parentId: Z.parentId,
              rect: {
                width: z,
                height: H,
                ...yy({
                  x: $.x ?? Z.position.x,
                  y: $.y ?? Z.position.y
                }, { width: z, height: H }, Z.parentId, T, ne)
              }
            }, le = pd([P], T, V, E);
            O.push(...le), L.x = $.x ? Math.max(ne[0] * z, $.x) : void 0, L.y = $.y ? Math.max(ne[1] * H, $.y) : void 0;
          }
          if (L.x !== void 0 && L.y !== void 0) {
            const ne = {
              id: _,
              type: "position",
              position: { ...L }
            };
            O.push(ne);
          }
          if ($.width !== void 0 && $.height !== void 0) {
            const z = {
              id: _,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: $.width,
                height: $.height
              }
            };
            O.push(z);
          }
          for (const ne of I) {
            const z = {
              ...ne,
              type: "position"
            };
            O.push(z);
          }
          oe(O);
        },
        onEnd: ({ width: $, height: I }) => {
          const oe = {
            id: _,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: $,
              height: I
            }
          };
          N.getState().triggerNodeChanges([oe]);
        }
      })), X.current.update({
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
        onResize: C,
        onResizeEnd: M,
        shouldResize: w
      }), () => {
        X.current?.destroy();
      };
  }, [
    J,
    g,
    p,
    h,
    b,
    y,
    A,
    C,
    M,
    w
  ]);
  const ue = J.split("-");
  return U.jsx("div", { className: rt(["react-flow__resize-control", "nodrag", ...ue, o, u]), ref: j, style: {
    ...s,
    scale: B,
    ...d && { [R ? "backgroundColor" : "borderColor"]: d }
  }, children: f });
}
F.memo(b3);
function x3({
  id: n,
  sourceX: a,
  sourceY: o,
  targetX: u,
  targetY: s,
  sourcePosition: f,
  targetPosition: d,
  label: g
}) {
  const [p, h, b] = fd({
    sourceX: a,
    sourceY: o,
    sourcePosition: f,
    targetX: u,
    targetY: s,
    targetPosition: d
  }), y = g == null ? "" : String(g), v = y.length > 0 && y !== "always";
  return /* @__PURE__ */ U.jsxs(U.Fragment, { children: [
    /* @__PURE__ */ U.jsx(Vo, { id: n, path: p }),
    y ? /* @__PURE__ */ U.jsx($z, { children: /* @__PURE__ */ U.jsx(
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
const _3 = {
  conditional: x3
};
function Xo(n, a, o) {
  const u = (s, f) => s.flatMap((d, g) => {
    if (g !== a[f]) return [d];
    if (f === a.length - 1) {
      const p = o(d);
      return p === null ? [] : [p];
    }
    return [{ ...d, children: u(d.children ?? [], f + 1) }];
  });
  return u(n, 0);
}
function S3(n, a, o) {
  return Xo(n, a, (u) => ({ ...u, children: [...u.children ?? [], o] }));
}
function w3(n, a) {
  return Xo(n, a, () => null);
}
function E3(n, a, o) {
  const u = a.slice(0, -1), s = a[a.length - 1], f = (d) => {
    const g = s + o;
    if (g < 0 || g >= d.length) return d;
    const p = [...d], h = p[s], b = p[g];
    return !h || !b ? d : (p[s] = b, p[g] = h, p);
  };
  return u.length === 0 ? f(n) : Xo(n, u, (d) => ({ ...d, children: f(d.children ?? []) }));
}
function z3(n, a, o) {
  const u = a.slice(0, -1), s = a[a.length - 1], f = (d) => {
    if (o < 0 || o >= d.length || o === s) return d;
    const g = [...d], [p] = g.splice(s, 1);
    return p ? (g.splice(o, 0, p), g) : d;
  };
  return u.length === 0 ? f(n) : Xo(n, u, (d) => ({ ...d, children: f(d.children ?? []) }));
}
function vv(n) {
  const a = {};
  for (const o of n.settingsFields ?? [])
    o.defaultValue != null && (a[o.alias] = o.defaultValue);
  return a;
}
function bv(n, a) {
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
      return a.find((s) => s.alias === n.providerAlias)?.name ?? "…";
  }
}
const gi = "scope", bp = 320, M3 = 48, xp = 48, _p = 48;
function N3(n) {
  return `rule:${n.join(".")}`;
}
function gn(n) {
  if (n === gi || !n.startsWith("rule:")) return null;
  const a = n.slice(5).split(".").map((o) => Number(o));
  return a.some((o) => Number.isNaN(o)) ? null : a;
}
function C3(n) {
  return n?.trim() ? n : "always";
}
function A3(n, a) {
  if (n === a || a === gi) return !1;
  const o = gn(a);
  if (!o) return !1;
  if (n === gi) return o.length === 1;
  const u = gn(n);
  return !u || o.length !== u.length + 1 ? !1 : u.every((s, f) => o[f] === s);
}
function T3(n, a, o, u) {
  const f = a.find((h) => h.alias === n.providerAlias)?.settingsFields ?? [], d = f.filter((h) => h.alias === "mappings" || h.alias === "palette").length, g = f.length - d;
  let p = 118;
  return p += g * 28, p += d * 64, o && (p += 30), u && (p += 24), p;
}
function D3(n, a, o) {
  const u = [], s = [];
  let f = 0;
  u.push({
    id: gi,
    type: "scope",
    position: { x: 0, y: f },
    data: { kind: "scope", scopeName: o, providers: a },
    width: bp,
    height: _p,
    draggable: !1
  }), f += _p + xp;
  const d = (g, p, h, b, y) => {
    for (let v = 0; v < g.length; v++) {
      const S = g[v], w = [...b, v], A = N3(w), C = S.children ?? [], M = w.length > 1, q = C.length === 0, _ = T3(S, a, M, q);
      u.push({
        id: A,
        type: "rule",
        position: { x: p * M3, y: f },
        data: {
          kind: "rule",
          path: w,
          node: S,
          providers: a,
          scopeName: o,
          prefix: y,
          isChild: M,
          isLeaf: q
        },
        width: bp,
        height: _,
        draggable: !0,
        dragHandle: ".mc-rule-flow-drag-handle"
      }), s.push({
        id: `e-${h}-${A}`,
        source: h,
        target: A,
        label: M ? C3(S.condition) : void 0,
        data: { condition: S.condition, mark: "mc:edge" }
      }), f += _ + xp, C.length > 0 && d(
        C,
        p + 1,
        A,
        w,
        [...y, bv(S, a)]
      );
    }
  };
  return d(n, 1, gi, [], []), { nodes: u, edges: s };
}
function xv(n) {
  return n.height ?? n.measured?.height ?? 150;
}
function O3(n) {
  return n.position.y + xv(n) / 2;
}
function R3(n, a) {
  return a.filter((o) => {
    const u = gn(o.id);
    return !u || u.length !== n.length ? !1 : u.slice(0, -1).every((s, f) => s === n[f]);
  });
}
function Wf(n, a) {
  const o = a.find((f) => f.id === n);
  if (!o) return 0;
  let u = o.position.y + xv(o);
  const s = gn(n);
  if (!s) return u;
  for (const f of a) {
    const d = gn(f.id);
    d && d.length === s.length + 1 && d.slice(0, -1).every((g, p) => g === s[p]) && (u = Math.max(u, Wf(f.id, a)));
  }
  return u;
}
function H3(n, a) {
  const o = gn(n.id);
  if (!o) return 0;
  let u = o[o.length - 1];
  const s = R3(o, a).sort(
    (p, h) => gn(p.id)[gn(p.id).length - 1] - gn(h.id)[gn(h.id).length - 1]
  ), f = new Map(a.map((p) => [p.id, p])), d = O3(n), g = f.get(n.id)?.position.y ?? n.position.y;
  for (; u > 0; ) {
    const p = s[u - 1], h = (Wf(p.id, a) + g) / 2;
    if (d >= h) break;
    u -= 1;
  }
  for (; u < s.length - 1; ) {
    const p = s[u + 1], h = (Wf(n.id, a) + f.get(p.id).position.y) / 2;
    if (d <= h) break;
    u += 1;
  }
  return u;
}
function Sp(n, a) {
  return n.find((o) => o.alias === a);
}
function _v(n) {
  const a = n[0];
  if (a)
    return {
      providerAlias: a.alias,
      settings: vv(a),
      fallback: "skip",
      children: []
    };
}
const Rt = "nodrag nopan nowheel";
function k3({
  field: n,
  value: a,
  onChange: o
}) {
  const u = a ?? n.defaultValue ?? "";
  let s;
  switch (n.type) {
    case "select":
      s = /* @__PURE__ */ U.jsx(
        "select",
        {
          className: Rt,
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
          className: Rt,
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
          className: Rt,
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
          className: Rt,
          "data-mark": `mc:setting-${n.alias}`,
          "aria-label": n.label,
          value: String(u),
          onChange: (d) => o(d.target.value)
        }
      ) : /* @__PURE__ */ U.jsx(
        "input",
        {
          className: Rt,
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
const B3 = F.memo(function({ data: a }) {
  return /* @__PURE__ */ U.jsxs("div", { className: "mc-rule-flow-scope", "data-mark": "mc:canvas-scope", children: [
    /* @__PURE__ */ U.jsx(da, { type: "source", position: me.Bottom }),
    /* @__PURE__ */ U.jsx("strong", { children: a.scopeName }),
    /* @__PURE__ */ U.jsx("small", { children: "scope" })
  ] });
});
function Fn(n) {
  n.preventDefault(), n.stopPropagation();
}
const U3 = function({ data: a, id: o }) {
  const u = a, { rules: s, onRulesChange: f, providers: d, scopeName: g, path: p = [], prefix: h = [], isChild: b, isLeaf: y, node: v } = u;
  if (!v) return null;
  const S = Sp(d, v.providerAlias), w = (S?.requirements ?? []).length > 0, A = (_, N = !1) => f(_, N ? { relayout: !0 } : void 0), C = (_) => {
    A(Xo(s, p, _));
  }, M = (_) => {
    const N = E3(s, p, _);
    N !== s && A(N, !0);
  }, q = [g, ...h, bv(v, d)].join("/");
  return /* @__PURE__ */ U.jsxs("div", { className: "mc-rule-flow-node", "data-mark": "mc:node", "data-node-id": o, children: [
    /* @__PURE__ */ U.jsx(da, { type: "target", position: me.Top }),
    /* @__PURE__ */ U.jsxs("div", { className: "mc-rule-flow-node-header", children: [
      /* @__PURE__ */ U.jsx("div", { className: "mc-rule-flow-drag-handle", title: "Drag to reorder", "aria-label": "Drag to reorder", children: "⋮⋮" }),
      /* @__PURE__ */ U.jsx(
        "select",
        {
          className: Rt,
          "data-mark": "mc:node-provider",
          "aria-label": "Provider",
          value: v.providerAlias,
          onChange: (_) => {
            const N = _.target.value, j = Sp(d, N);
            C((R) => ({
              ...R,
              providerAlias: N,
              settings: j ? vv(j) : {}
            }));
          },
          children: d.map((_) => /* @__PURE__ */ U.jsx("option", { value: _.alias, children: _.name }, _.alias))
        }
      ),
      w ? /* @__PURE__ */ U.jsx("span", { className: "mc-rule-flow-tag", "data-mark": "mc:node-requirements", title: "This provider declares media type property requirements.", children: "needs properties" }) : null
    ] }),
    /* @__PURE__ */ U.jsxs("div", { className: `mc-rule-flow-node-actions ${Rt}`, children: [
      /* @__PURE__ */ U.jsx(
        "button",
        {
          type: "button",
          className: Rt,
          "data-mark": "mc:node-move-up",
          title: "Move up",
          "aria-label": "Move up",
          onPointerDown: Fn,
          onMouseDown: Fn,
          onClick: (_) => {
            Fn(_), M(-1);
          },
          children: "↑"
        }
      ),
      /* @__PURE__ */ U.jsx(
        "button",
        {
          type: "button",
          className: Rt,
          "data-mark": "mc:node-move-down",
          title: "Move down",
          "aria-label": "Move down",
          onPointerDown: Fn,
          onMouseDown: Fn,
          onClick: (_) => {
            Fn(_), M(1);
          },
          children: "↓"
        }
      ),
      /* @__PURE__ */ U.jsx(
        "button",
        {
          type: "button",
          className: `danger ${Rt}`,
          "data-mark": "mc:node-remove",
          title: "Remove",
          "aria-label": "Remove",
          onPointerDown: Fn,
          onMouseDown: Fn,
          onClick: (_) => {
            Fn(_), A(w3(s, p), !0);
          },
          children: "✕"
        }
      )
    ] }),
    /* @__PURE__ */ U.jsxs("div", { className: `mc-rule-flow-node-body ${Rt}`, children: [
      b ? /* @__PURE__ */ U.jsxs(U.Fragment, { children: [
        /* @__PURE__ */ U.jsx("label", { htmlFor: `${o}-condition`, children: "Condition (parent value)" }),
        /* @__PURE__ */ U.jsx(
          "input",
          {
            className: Rt,
            id: `${o}-condition`,
            "data-mark": "mc:node-condition",
            "aria-label": "Condition",
            placeholder: "leave empty for always",
            value: v.condition ?? "",
            onChange: (_) => C((N) => ({
              ...N,
              condition: _.target.value || void 0
            }))
          }
        )
      ] }) : null,
      (S?.settingsFields ?? []).map((_) => {
        const N = v.settings ?? {};
        return /* @__PURE__ */ U.jsx(
          k3,
          {
            field: _,
            value: N[_.alias],
            onChange: (j) => C((R) => ({
              ...R,
              settings: {
                ...R.settings ?? {},
                [_.alias]: j
              }
            }))
          },
          _.alias
        );
      }),
      /* @__PURE__ */ U.jsx("label", { htmlFor: `${o}-fallback`, children: "If unresolved" }),
      /* @__PURE__ */ U.jsxs(
        "select",
        {
          className: Rt,
          id: `${o}-fallback`,
          "data-mark": "mc:node-fallback",
          "aria-label": "If unresolved",
          value: v.fallback,
          onChange: (_) => C((N) => ({ ...N, fallback: _.target.value })),
          children: [
            /* @__PURE__ */ U.jsx("option", { value: "skip", children: "Skip this level" }),
            /* @__PURE__ */ U.jsx("option", { value: "unsorted", children: "Use 'Unsorted' folder" }),
            /* @__PURE__ */ U.jsx("option", { value: "stop", children: "Leave item in place" })
          ]
        }
      )
    ] }),
    y ? /* @__PURE__ */ U.jsx("div", { className: "mc-rule-flow-example", "data-mark": "mc:node-example", title: "Example resulting folder path", children: q }) : null,
    /* @__PURE__ */ U.jsx("div", { className: "mc-rule-flow-add-child", children: /* @__PURE__ */ U.jsx(
      "button",
      {
        type: "button",
        className: Rt,
        "data-mark": "mc:node-add-child",
        onClick: () => {
          const _ = _v(d);
          _ && A(S3(s, p, _), !0);
        },
        children: "Add child rule"
      }
    ) }),
    /* @__PURE__ */ U.jsx(da, { type: "source", position: me.Bottom })
  ] });
}, q3 = {
  scope: B3,
  rule: U3
};
function j3() {
  const { fitView: n } = Wr(), a = F.useRef(!1);
  return F.useEffect(() => {
    if (a.current) return;
    a.current = !0;
    const o = requestAnimationFrame(() => {
      n({ padding: 0.2, duration: 150, minZoom: 0.85, maxZoom: 1 });
    });
    return () => cancelAnimationFrame(o);
  }, [n]), null;
}
function Y3(n, a, o) {
  if (o) {
    a.clear();
    for (const u of n)
      a.set(u.id, u.position);
    return n;
  }
  return n.map((u) => {
    const s = a.get(u.id);
    return s ? { ...u, position: s } : u;
  });
}
function L3({
  rules: n,
  providers: a,
  scopeName: o,
  layoutGeneration: u = 0,
  onRulesChange: s
}) {
  const f = F.useRef(!1), d = F.useRef(/* @__PURE__ */ new Map()), g = F.useRef(u), p = F.useCallback(
    (R, B) => {
      B?.relayout && (f.current = !1), s(R, B);
    },
    [s]
  ), { nodes: h, edges: b } = F.useMemo(
    () => D3(n, a, o),
    [n, a, o]
  ), y = F.useMemo(
    () => h.map(
      (R) => ({
        ...R,
        data: {
          ...R.data,
          rules: n,
          onRulesChange: p
        }
      })
    ),
    [h, n, p]
  ), v = F.useMemo(
    () => b.map((R) => ({
      ...R,
      type: R.label ? "conditional" : void 0
    })),
    [b]
  ), [S, w, A] = Zz(y), [C, M, q] = Gz(v);
  F.useEffect(() => {
    const R = g.current !== u;
    g.current = u, !(f.current && !R) && (f.current = !1, w(Y3(y, d.current, R)));
  }, [y, u, w]), F.useEffect(() => {
    M(v);
  }, [v, M]);
  const _ = F.useCallback(() => {
    f.current = !0;
  }, []), N = F.useCallback(
    (R, B) => {
      if (d.current.set(B.id, { ...B.position }), B.id === gi) {
        f.current = !1;
        return;
      }
      const X = gn(B.id);
      if (!X) {
        f.current = !1;
        return;
      }
      const J = y.map((I) => {
        const oe = d.current.get(I.id);
        return oe ? { ...I, position: oe } : I;
      }), ue = H3(B, J), $ = X[X.length - 1];
      if (ue !== $) {
        p(z3(n, X, ue), { relayout: !0 });
        return;
      }
      f.current = !1;
    },
    [n, p, y]
  ), j = () => {
    const R = _v(a);
    R && p([...n, R], { relayout: !0 });
  };
  return /* @__PURE__ */ U.jsxs("div", { className: "mc-rule-flow-canvas", "data-mark": "mc:canvas", children: [
    /* @__PURE__ */ U.jsx("div", { className: "mc-rule-flow-viewport", children: /* @__PURE__ */ U.jsxs(
      Vz,
      {
        nodes: S,
        edges: C,
        onNodesChange: A,
        onEdgesChange: q,
        onNodeDragStart: _,
        onNodeDragStop: N,
        nodeTypes: q3,
        edgeTypes: _3,
        defaultViewport: { x: 24, y: 24, zoom: 1 },
        isValidConnection: (R) => A3(R.source ?? "", R.target ?? ""),
        nodesConnectable: !1,
        nodesDraggable: !0,
        elementsSelectable: !1,
        selectNodesOnDrag: !1,
        nodeOrigin: [0, 0],
        minZoom: 0.5,
        maxZoom: 1.5,
        proOptions: { hideAttribution: !0 },
        children: [
          /* @__PURE__ */ U.jsx(j3, {}),
          /* @__PURE__ */ U.jsx(a3, { position: "bottom-right", showInteractive: !1 }),
          /* @__PURE__ */ U.jsx(Wz, { variant: In.Dots, gap: 16, size: 1 })
        ]
      }
    ) }),
    n.length === 0 ? /* @__PURE__ */ U.jsx("p", { className: "mc-rule-flow-empty", children: "No rules yet. Each rule node contributes folder levels beneath the scope." }) : null,
    /* @__PURE__ */ U.jsx("div", { className: "mc-rule-flow-toolbar", children: /* @__PURE__ */ U.jsx("button", { type: "button", className: "nodrag nopan", "data-mark": "mc:canvas-add", onClick: j, children: "Add rule" }) })
  ] });
}
function V3(n) {
  return /* @__PURE__ */ U.jsx(gv, { children: /* @__PURE__ */ U.jsx(L3, { ...n }) });
}
const X3 = ".react-flow{direction:ltr;--xy-edge-stroke-default: #b1b1b7;--xy-edge-stroke-width-default: 1;--xy-edge-stroke-selected-default: #555;--xy-connectionline-stroke-default: #b1b1b7;--xy-connectionline-stroke-width-default: 1;--xy-attribution-background-color-default: rgba(255, 255, 255, .5);--xy-minimap-background-color-default: #fff;--xy-minimap-mask-background-color-default: rgba(240, 240, 240, .6);--xy-minimap-mask-stroke-color-default: transparent;--xy-minimap-mask-stroke-width-default: 1;--xy-minimap-node-background-color-default: #e2e2e2;--xy-minimap-node-stroke-color-default: transparent;--xy-minimap-node-stroke-width-default: 2;--xy-background-color-default: transparent;--xy-background-pattern-dots-color-default: #91919a;--xy-background-pattern-lines-color-default: #eee;--xy-background-pattern-cross-color-default: #e2e2e2;background-color:var(--xy-background-color, var(--xy-background-color-default));--xy-node-color-default: inherit;--xy-node-border-default: 1px solid #1a192b;--xy-node-background-color-default: #fff;--xy-node-group-background-color-default: rgba(240, 240, 240, .25);--xy-node-boxshadow-hover-default: 0 1px 4px 1px rgba(0, 0, 0, .08);--xy-node-boxshadow-selected-default: 0 0 0 .5px #1a192b;--xy-node-border-radius-default: 3px;--xy-handle-background-color-default: #1a192b;--xy-handle-border-color-default: #fff;--xy-selection-background-color-default: rgba(0, 89, 220, .08);--xy-selection-border-default: 1px dotted rgba(0, 89, 220, .8);--xy-controls-button-background-color-default: #fefefe;--xy-controls-button-background-color-hover-default: #f4f4f4;--xy-controls-button-color-default: inherit;--xy-controls-button-color-hover-default: inherit;--xy-controls-button-border-color-default: #eee;--xy-controls-box-shadow-default: 0 0 2px 1px rgba(0, 0, 0, .08);--xy-edge-label-background-color-default: #ffffff;--xy-edge-label-color-default: inherit;--xy-resize-background-color-default: #3367d9}.react-flow.dark{--xy-edge-stroke-default: #3e3e3e;--xy-edge-stroke-width-default: 1;--xy-edge-stroke-selected-default: #727272;--xy-connectionline-stroke-default: #b1b1b7;--xy-connectionline-stroke-width-default: 1;--xy-attribution-background-color-default: rgba(150, 150, 150, .25);--xy-minimap-background-color-default: #141414;--xy-minimap-mask-background-color-default: rgba(60, 60, 60, .6);--xy-minimap-mask-stroke-color-default: transparent;--xy-minimap-mask-stroke-width-default: 1;--xy-minimap-node-background-color-default: #2b2b2b;--xy-minimap-node-stroke-color-default: transparent;--xy-minimap-node-stroke-width-default: 2;--xy-background-color-default: #141414;--xy-background-pattern-dots-color-default: #777;--xy-background-pattern-lines-color-default: #777;--xy-background-pattern-cross-color-default: #777;--xy-node-color-default: #f8f8f8;--xy-node-border-default: 1px solid #3c3c3c;--xy-node-background-color-default: #1e1e1e;--xy-node-group-background-color-default: rgba(240, 240, 240, .25);--xy-node-boxshadow-hover-default: 0 1px 4px 1px rgba(255, 255, 255, .08);--xy-node-boxshadow-selected-default: 0 0 0 .5px #999;--xy-handle-background-color-default: #bebebe;--xy-handle-border-color-default: #1e1e1e;--xy-selection-background-color-default: rgba(200, 200, 220, .08);--xy-selection-border-default: 1px dotted rgba(200, 200, 220, .8);--xy-controls-button-background-color-default: #2b2b2b;--xy-controls-button-background-color-hover-default: #3e3e3e;--xy-controls-button-color-default: #f8f8f8;--xy-controls-button-color-hover-default: #fff;--xy-controls-button-border-color-default: #5b5b5b;--xy-controls-box-shadow-default: 0 0 2px 1px rgba(0, 0, 0, .08);--xy-edge-label-background-color-default: #141414;--xy-edge-label-color-default: #f8f8f8}.react-flow__background{background-color:var(--xy-background-color-props, var(--xy-background-color, var(--xy-background-color-default)));pointer-events:none;z-index:-1}.react-flow__container{position:absolute;width:100%;height:100%;top:0;left:0}.react-flow__pane{z-index:1;touch-action:none}.react-flow__pane.draggable{cursor:grab}.react-flow__pane.dragging{cursor:grabbing}.react-flow__pane.selection{cursor:pointer}.react-flow__viewport{transform-origin:0 0;z-index:2;pointer-events:none}.react-flow__renderer{z-index:4}.react-flow__selection{z-index:6}.react-flow__nodesselection-rect:focus,.react-flow__nodesselection-rect:focus-visible{outline:none}.react-flow__edge-path{stroke:var(--xy-edge-stroke, var(--xy-edge-stroke-default));stroke-width:var(--xy-edge-stroke-width, var(--xy-edge-stroke-width-default));fill:none}.react-flow__connection-path{stroke:var(--xy-connectionline-stroke, var(--xy-connectionline-stroke-default));stroke-width:var(--xy-connectionline-stroke-width, var(--xy-connectionline-stroke-width-default));fill:none}.react-flow .react-flow__edges{position:absolute}.react-flow .react-flow__edges svg{overflow:visible;position:absolute;pointer-events:none}.react-flow__edge{pointer-events:visibleStroke}.react-flow__edge.selectable{cursor:pointer}.react-flow__edge.animated path{stroke-dasharray:5;animation:dashdraw .5s linear infinite}.react-flow__edge.animated path.react-flow__edge-interaction{stroke-dasharray:none;animation:none}.react-flow__edge.inactive{pointer-events:none}.react-flow__edge.selected,.react-flow__edge:focus,.react-flow__edge:focus-visible{outline:none}.react-flow__edge.selected .react-flow__edge-path,.react-flow__edge.selectable:focus .react-flow__edge-path,.react-flow__edge.selectable:focus-visible .react-flow__edge-path{stroke:var(--xy-edge-stroke-selected, var(--xy-edge-stroke-selected-default))}.react-flow__edge-textwrapper{pointer-events:all}.react-flow__edge .react-flow__edge-text{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.react-flow__arrowhead polyline{stroke:var(--xy-edge-stroke, var(--xy-edge-stroke-default))}.react-flow__arrowhead polyline.arrowclosed{fill:var(--xy-edge-stroke, var(--xy-edge-stroke-default))}.react-flow__connection{pointer-events:none}.react-flow__connection .animated{stroke-dasharray:5;animation:dashdraw .5s linear infinite}svg.react-flow__connectionline{z-index:1001;overflow:visible;position:absolute}.react-flow__nodes{pointer-events:none;transform-origin:0 0}.react-flow__node{position:absolute;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:all;transform-origin:0 0;box-sizing:border-box;cursor:default}.react-flow__node.selectable{cursor:pointer}.react-flow__node.draggable{cursor:grab;pointer-events:all}.react-flow__node.draggable.dragging{cursor:grabbing}.react-flow__nodesselection{z-index:3;transform-origin:left top;pointer-events:none}.react-flow__nodesselection-rect{position:absolute;pointer-events:all;cursor:grab}.react-flow__handle{position:absolute;pointer-events:none;min-width:5px;min-height:5px;width:6px;height:6px;background-color:var(--xy-handle-background-color, var(--xy-handle-background-color-default));border:1px solid var(--xy-handle-border-color, var(--xy-handle-border-color-default));border-radius:100%}.react-flow__handle.connectingfrom{pointer-events:all}.react-flow__handle.connectionindicator{pointer-events:all;cursor:crosshair}.react-flow__handle-bottom{top:auto;left:50%;bottom:0;transform:translate(-50%,50%)}.react-flow__handle-top{top:0;left:50%;transform:translate(-50%,-50%)}.react-flow__handle-left{top:50%;left:0;transform:translate(-50%,-50%)}.react-flow__handle-right{top:50%;right:0;transform:translate(50%,-50%)}.react-flow__edgeupdater{cursor:move;pointer-events:all}.react-flow__pane.selection .react-flow__panel{pointer-events:none}.react-flow__panel{position:absolute;z-index:5;margin:15px}.react-flow__panel.top{top:0}.react-flow__panel.bottom{bottom:0}.react-flow__panel.top.center,.react-flow__panel.bottom.center{left:50%;transform:translate(-15px) translate(-50%)}.react-flow__panel.left{left:0}.react-flow__panel.right{right:0}.react-flow__panel.left.center,.react-flow__panel.right.center{top:50%;transform:translateY(-15px) translateY(-50%)}.react-flow__attribution{font-size:10px;background:var(--xy-attribution-background-color, var(--xy-attribution-background-color-default));padding:2px 3px;margin:0}.react-flow__attribution a{text-decoration:none;color:#999}@keyframes dashdraw{0%{stroke-dashoffset:10}}.react-flow__edgelabel-renderer{position:absolute;width:100%;height:100%;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;left:0;top:0}.react-flow__viewport-portal{position:absolute;width:100%;height:100%;left:0;top:0;-webkit-user-select:none;-moz-user-select:none;user-select:none}.react-flow__minimap{background:var( --xy-minimap-background-color-props, var(--xy-minimap-background-color, var(--xy-minimap-background-color-default)) )}.react-flow__minimap-svg{display:block}.react-flow__minimap-mask{fill:var( --xy-minimap-mask-background-color-props, var(--xy-minimap-mask-background-color, var(--xy-minimap-mask-background-color-default)) );stroke:var( --xy-minimap-mask-stroke-color-props, var(--xy-minimap-mask-stroke-color, var(--xy-minimap-mask-stroke-color-default)) );stroke-width:var( --xy-minimap-mask-stroke-width-props, var(--xy-minimap-mask-stroke-width, var(--xy-minimap-mask-stroke-width-default)) )}.react-flow__minimap-node{fill:var( --xy-minimap-node-background-color-props, var(--xy-minimap-node-background-color, var(--xy-minimap-node-background-color-default)) );stroke:var( --xy-minimap-node-stroke-color-props, var(--xy-minimap-node-stroke-color, var(--xy-minimap-node-stroke-color-default)) );stroke-width:var( --xy-minimap-node-stroke-width-props, var(--xy-minimap-node-stroke-width, var(--xy-minimap-node-stroke-width-default)) )}.react-flow__background-pattern.dots{fill:var( --xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-dots-color-default)) )}.react-flow__background-pattern.lines{stroke:var( --xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-lines-color-default)) )}.react-flow__background-pattern.cross{stroke:var( --xy-background-pattern-color-props, var(--xy-background-pattern-color, var(--xy-background-pattern-cross-color-default)) )}.react-flow__controls{display:flex;flex-direction:column;box-shadow:var(--xy-controls-box-shadow, var(--xy-controls-box-shadow-default))}.react-flow__controls.horizontal{flex-direction:row}.react-flow__controls-button{display:flex;justify-content:center;align-items:center;height:26px;width:26px;padding:4px;border:none;background:var(--xy-controls-button-background-color, var(--xy-controls-button-background-color-default));border-bottom:1px solid var( --xy-controls-button-border-color-props, var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default)) );color:var( --xy-controls-button-color-props, var(--xy-controls-button-color, var(--xy-controls-button-color-default)) );cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none}.react-flow__controls-button svg{width:100%;max-width:12px;max-height:12px;fill:currentColor}.react-flow__edge.updating .react-flow__edge-path{stroke:#777}.react-flow__edge-text{font-size:10px}.react-flow__node.selectable:focus,.react-flow__node.selectable:focus-visible{outline:none}.react-flow__node-input,.react-flow__node-default,.react-flow__node-output,.react-flow__node-group{padding:10px;border-radius:var(--xy-node-border-radius, var(--xy-node-border-radius-default));width:150px;font-size:12px;color:var(--xy-node-color, var(--xy-node-color-default));text-align:center;border:var(--xy-node-border, var(--xy-node-border-default));background-color:var(--xy-node-background-color, var(--xy-node-background-color-default))}.react-flow__node-input.selectable:hover,.react-flow__node-default.selectable:hover,.react-flow__node-output.selectable:hover,.react-flow__node-group.selectable:hover{box-shadow:var(--xy-node-boxshadow-hover, var(--xy-node-boxshadow-hover-default))}.react-flow__node-input.selectable.selected,.react-flow__node-input.selectable:focus,.react-flow__node-input.selectable:focus-visible,.react-flow__node-default.selectable.selected,.react-flow__node-default.selectable:focus,.react-flow__node-default.selectable:focus-visible,.react-flow__node-output.selectable.selected,.react-flow__node-output.selectable:focus,.react-flow__node-output.selectable:focus-visible,.react-flow__node-group.selectable.selected,.react-flow__node-group.selectable:focus,.react-flow__node-group.selectable:focus-visible{box-shadow:var(--xy-node-boxshadow-selected, var(--xy-node-boxshadow-selected-default))}.react-flow__node-group{background-color:var(--xy-node-group-background-color, var(--xy-node-group-background-color-default))}.react-flow__nodesselection-rect,.react-flow__selection{background:var(--xy-selection-background-color, var(--xy-selection-background-color-default));border:var(--xy-selection-border, var(--xy-selection-border-default))}.react-flow__nodesselection-rect:focus,.react-flow__nodesselection-rect:focus-visible,.react-flow__selection:focus,.react-flow__selection:focus-visible{outline:none}.react-flow__controls-button:hover{background:var( --xy-controls-button-background-color-hover-props, var(--xy-controls-button-background-color-hover, var(--xy-controls-button-background-color-hover-default)) );color:var( --xy-controls-button-color-hover-props, var(--xy-controls-button-color-hover, var(--xy-controls-button-color-hover-default)) )}.react-flow__controls-button:disabled{pointer-events:none}.react-flow__controls-button:disabled svg{fill-opacity:.4}.react-flow__controls-button:last-child{border-bottom:none}.react-flow__controls.horizontal .react-flow__controls-button{border-bottom:none;border-right:1px solid var( --xy-controls-button-border-color-props, var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default)) )}.react-flow__controls.horizontal .react-flow__controls-button:last-child{border-right:none}.react-flow__resize-control{position:absolute}.react-flow__resize-control.left,.react-flow__resize-control.right{cursor:ew-resize}.react-flow__resize-control.top,.react-flow__resize-control.bottom{cursor:ns-resize}.react-flow__resize-control.top.left,.react-flow__resize-control.bottom.right{cursor:nwse-resize}.react-flow__resize-control.bottom.left,.react-flow__resize-control.top.right{cursor:nesw-resize}.react-flow__resize-control.handle{width:5px;height:5px;border:1px solid #fff;border-radius:1px;background-color:var(--xy-resize-background-color, var(--xy-resize-background-color-default));translate:-50% -50%}.react-flow__resize-control.handle.left{left:0;top:50%}.react-flow__resize-control.handle.right{left:100%;top:50%}.react-flow__resize-control.handle.top{left:50%;top:0}.react-flow__resize-control.handle.bottom{left:50%;top:100%}.react-flow__resize-control.handle.top.left,.react-flow__resize-control.handle.bottom.left{left:0}.react-flow__resize-control.handle.top.right,.react-flow__resize-control.handle.bottom.right{left:100%}.react-flow__resize-control.line{border-color:var(--xy-resize-background-color, var(--xy-resize-background-color-default));border-width:0;border-style:solid}.react-flow__resize-control.line.left,.react-flow__resize-control.line.right{width:1px;transform:translate(-50%);top:0;height:100%}.react-flow__resize-control.line.left{left:0;border-left-width:1px}.react-flow__resize-control.line.right{left:100%;border-right-width:1px}.react-flow__resize-control.line.top,.react-flow__resize-control.line.bottom{height:1px;transform:translateY(-50%);left:0;width:100%}.react-flow__resize-control.line.top{top:0;border-top-width:1px}.react-flow__resize-control.line.bottom{border-bottom-width:1px;top:100%}.react-flow__edge-textbg{fill:var(--xy-edge-label-background-color, var(--xy-edge-label-background-color-default))}.react-flow__edge-text{fill:var(--xy-edge-label-color, var(--xy-edge-label-color-default))}", $3 = ".mc-rule-flow-canvas{--xy-node-border-radius: var(--uui-border-radius, 6px);--xy-edge-stroke: var(--uui-color-border, #d8d7d9);--xy-edge-stroke-selected: var(--uui-color-selected, #1b264f);--xy-edge-label-background-color: var(--uui-color-surface, #fff);--xy-background-color: var(--uui-color-surface, #fff);position:relative;isolation:isolate;z-index:1}.mc-rule-flow-viewport{position:relative;z-index:1;width:100%;height:560px;border:1px solid var(--uui-color-border, #d8d7d9);border-radius:var(--uui-border-radius, 6px);overflow:hidden;pointer-events:auto}.mc-rule-flow-viewport .react-flow{width:100%;height:100%}.mc-rule-flow-viewport .react-flow__node{width:320px!important}.mc-rule-flow-viewport .react-flow__node-scope,.mc-rule-flow-viewport .react-flow__node-rule{width:320px;background:transparent;border:none;box-shadow:none;padding:0}.mc-rule-flow-viewport .react-flow__handle{width:8px;height:8px;background:var(--uui-color-border-emphasis, #a1a1a1);border:2px solid var(--uui-color-surface, #fff)}.mc-rule-flow-canvas .react-flow__panel{margin:0}.mc-rule-flow-canvas .react-flow__edge-text{font-size:.8rem}.mc-rule-flow-canvas .react-flow__edge-textbg{fill:var(--uui-color-surface-alt, #f6f4f4)}.mc-rule-flow-scope,.mc-rule-flow-node{background:var(--uui-color-surface, #fff);border:1px solid var(--uui-color-border, #d8d7d9);border-radius:var(--uui-border-radius, 6px);box-shadow:0 1px 2px #0000000f;width:320px;box-sizing:border-box;font-family:var(--uui-font-family, inherit);color:var(--uui-color-text, #1b264f)}.mc-rule-flow-scope{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;background:var(--uui-color-surface-alt, #f6f4f4)}.mc-rule-flow-scope small{color:var(--uui-color-text-alt, #6e6e6e)}.mc-rule-flow-node-header{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;border-bottom:1px solid var(--uui-color-border, #d8d7d9)}.mc-rule-flow-drag-handle{cursor:grab;padding:.15rem .35rem;color:var(--uui-color-text-alt, #6e6e6e);-webkit-user-select:none;user-select:none;line-height:1;border-radius:4px}.mc-rule-flow-drag-handle:active{cursor:grabbing}.mc-rule-flow-node-header select{flex:1;min-width:0}.mc-rule-flow-node-actions{display:flex;gap:.25rem;padding:0 1rem .5rem;position:relative;z-index:2;pointer-events:auto}.mc-rule-flow-node-actions button{cursor:pointer;border:1px solid var(--uui-color-border, #d8d7d9);background:var(--uui-color-surface, #fff);border-radius:4px;padding:.15rem .45rem;pointer-events:auto;position:relative;z-index:2}.mc-rule-flow-node-actions button.danger{color:var(--uui-color-danger, #d42054)}.mc-rule-flow-node-body{display:grid;grid-template-columns:140px 1fr;gap:.35rem .75rem;align-items:center;padding:.75rem 1rem}.mc-rule-flow-node-body label{font-size:.85rem;color:var(--uui-color-text-alt, #6e6e6e)}.mc-rule-flow-node-body input,.mc-rule-flow-node-body select,.mc-rule-flow-node-body textarea{width:100%;box-sizing:border-box}.mc-rule-flow-node-body textarea{min-height:4rem;resize:vertical}.mc-rule-flow-tag{display:inline-block;font-size:.75rem;padding:.1rem .45rem;border-radius:1rem;background:var(--uui-color-warning, #f5c1bc)}.mc-rule-flow-example{margin:0 1rem .75rem;font-family:monospace;font-size:.85rem;color:var(--uui-color-positive, #2bc37c)}.mc-rule-flow-add-child{margin:0 1rem .75rem}.mc-rule-flow-toolbar{display:flex;gap:.5rem;margin-top:.75rem}.mc-rule-flow-toolbar button,.mc-rule-flow-add-child button{cursor:pointer;border:1px solid var(--uui-color-border, #d8d7d9);background:var(--uui-color-surface-alt, #f6f4f4);border-radius:4px;padding:.4rem .75rem}.mc-rule-flow-empty{margin:.75rem 0 0;color:var(--uui-color-text-alt, #6e6e6e)}.mc-rule-flow-edge-label{font-size:.8rem;background:var(--uui-color-surface-alt, #f6f4f4);border-radius:1em;padding:0 .5rem}.mc-rule-flow-edge-label--condition{background:var(--uui-color-warning, #f5c1bc)}";
let bo;
function Z3(n) {
  bo || (bo = new CSSStyleSheet(), bo.replaceSync(`${X3}
${$3}`)), n.adoptedStyleSheets.includes(bo) || (n.adoptedStyleSheets = [...n.adoptedStyleSheets, bo]);
}
var G3 = Object.defineProperty, Q3 = Object.getOwnPropertyDescriptor, Sv = (n) => {
  throw TypeError(n);
}, Pr = (n, a, o, u) => {
  for (var s = u > 1 ? void 0 : u ? Q3(a, o) : a, f = n.length - 1, d; f >= 0; f--)
    (d = n[f]) && (s = (u ? d(a, o, s) : d(s)) || s);
  return u && s && G3(a, o, s), s;
}, vd = (n, a, o) => a.has(n) || Sv("Cannot " + o), oa = (n, a, o) => (vd(n, a, "read from private field"), a.get(n)), _r = (n, a, o) => a.has(n) ? Sv("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, o), So = (n, a, o, u) => (vd(n, a, "write to private field"), a.set(n, o), o), qr = (n, a, o) => (vd(n, a, "access private method"), o), ni, la, Ho, ui, wv, jr;
let mi = class extends Np(Ep) {
  constructor() {
    super(...arguments), _r(this, ui), this.rules = [], this.providers = [], this.scopeName = "Scope", _r(this, ni), _r(this, la), _r(this, Ho, 0);
  }
  connectedCallback() {
    super.connectedCallback(), this.shadowRoot && Z3(this.shadowRoot);
  }
  render() {
    return Ve`<div class="react-root"></div>`;
  }
  shouldUpdate(n) {
    return this.hasUpdated ? ((n.has("rules") || n.has("providers") || n.has("scopeName")) && qr(this, ui, jr).call(this), !1) : !0;
  }
  firstUpdated() {
    So(this, ni, this.renderRoot.querySelector(".react-root") ?? void 0), oa(this, ni) && (So(this, la, ix.createRoot(oa(this, ni))), qr(this, ui, jr).call(this));
  }
  disconnectedCallback() {
    oa(this, la)?.unmount(), So(this, la, void 0), So(this, ni, void 0), super.disconnectedCallback();
  }
};
ni = /* @__PURE__ */ new WeakMap();
la = /* @__PURE__ */ new WeakMap();
Ho = /* @__PURE__ */ new WeakMap();
ui = /* @__PURE__ */ new WeakSet();
wv = function(n, a = !1) {
  a && So(this, Ho, oa(this, Ho) + 1), this.rules = n, qr(this, ui, jr).call(this), this.dispatchEvent(new CustomEvent("rules-change", { detail: { rules: n }, bubbles: !1 }));
};
jr = function() {
  oa(this, la) && oa(this, la).render(
    F.createElement(V3, {
      rules: this.rules,
      providers: this.providers,
      scopeName: this.scopeName,
      layoutGeneration: oa(this, Ho),
      onRulesChange: (n, a) => qr(this, ui, wv).call(this, n, a?.relayout === !0)
    })
  );
};
mi.styles = [
  zp`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
        z-index: 1;
      }
      .react-root {
        width: 100%;
        position: relative;
        z-index: 1;
      }
    `
];
Pr([
  If({ attribute: !1 })
], mi.prototype, "rules", 2);
Pr([
  If({ attribute: !1 })
], mi.prototype, "providers", 2);
Pr([
  If({ attribute: !1 })
], mi.prototype, "scopeName", 2);
mi = Pr([
  Mp("mc-rule-flow")
], mi);
class Zt {
  static getExclusions(a) {
    return (a?.client ?? tt).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/exclusions",
      ...a
    });
  }
  static setExclusion(a) {
    return (a.client ?? tt).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/exclusions/{mediaKey}",
      ...a
    });
  }
  static executeCuration(a) {
    return (a?.client ?? tt).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/execute",
      ...a,
      headers: {
        "Content-Type": "application/json",
        ...a?.headers
      }
    });
  }
  static planCuration(a) {
    return (a?.client ?? tt).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/plan",
      ...a,
      headers: {
        "Content-Type": "application/json",
        ...a?.headers
      }
    });
  }
  static getQueueStatus(a) {
    return (a?.client ?? tt).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/queue",
      ...a
    });
  }
  static queueCuration(a) {
    return (a?.client ?? tt).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/queue",
      ...a,
      headers: {
        "Content-Type": "application/json",
        ...a?.headers
      }
    });
  }
  static getRuns(a) {
    return (a?.client ?? tt).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/runs",
      ...a
    });
  }
  static getRunItems(a) {
    return (a.client ?? tt).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/runs/{runKey}/items",
      ...a
    });
  }
  static undoRun(a) {
    return (a.client ?? tt).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/curation/runs/{runKey}/undo",
      ...a
    });
  }
  static getProviders(a) {
    return (a?.client ?? tt).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/providers",
      ...a
    });
  }
  static applyRequirements(a) {
    return (a?.client ?? tt).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/requirements/apply",
      ...a,
      headers: {
        "Content-Type": "application/json",
        ...a?.headers
      }
    });
  }
  static checkRequirements(a) {
    return (a.client ?? tt).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/requirements/check/{rulesetKey}",
      ...a
    });
  }
  static getRulesets(a) {
    return (a?.client ?? tt).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets",
      ...a
    });
  }
  static saveRuleset(a) {
    return (a?.client ?? tt).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets",
      ...a,
      headers: {
        "Content-Type": "application/json",
        ...a?.headers
      }
    });
  }
  static deleteRuleset(a) {
    return (a.client ?? tt).delete({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets/{key}",
      ...a
    });
  }
  static getRulesetByScope(a) {
    return (a.client ?? tt).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets/by-scope/{scopeRootKey}",
      ...a
    });
  }
  static exportRulesets(a) {
    return (a?.client ?? tt).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets/export",
      ...a
    });
  }
  static importRulesets(a) {
    return (a?.client ?? tt).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/rulesets/import",
      ...a,
      headers: {
        "Content-Type": "application/json",
        ...a?.headers
      }
    });
  }
  static getSettings(a) {
    return (a?.client ?? tt).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/settings",
      ...a
    });
  }
  static saveSettings(a) {
    return (a?.client ?? tt).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/settings",
      ...a,
      headers: {
        "Content-Type": "application/json",
        ...a?.headers
      }
    });
  }
  static reanalyzeImages(a) {
    return (a?.client ?? tt).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/mediacurator/api/v1/recognition/reanalyze",
      ...a,
      headers: {
        "Content-Type": "application/json",
        ...a?.headers
      }
    });
  }
}
var K3 = Object.defineProperty, J3 = Object.getOwnPropertyDescriptor, Ev = (n) => {
  throw TypeError(n);
}, Qt = (n, a, o, u) => {
  for (var s = u > 1 ? void 0 : u ? J3(a, o) : a, f = n.length - 1, d; f >= 0; f--)
    (d = n[f]) && (s = (u ? d(a, o, s) : d(s)) || s);
  return u && s && K3(a, o, s), s;
}, bd = (n, a, o) => a.has(n) || Ev("Cannot " + o), F3 = (n, a, o) => (bd(n, a, "read from private field"), a.get(n)), wp = (n, a, o) => a.has(n) ? Ev("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, o), W3 = (n, a, o, u) => (bd(n, a, "write to private field"), a.set(n, o), o), xe = (n, a, o) => (bd(n, a, "access private method"), o), Yr, be, pi, zv, Mv, ut, Nv, Cv, Av, Tv, Dv, xd, ec, Ov, Rv, Hv, kv, Bv, Uv, qv, jv, Yv, Lv, Vv, Xv;
let bt = class extends Np(Ep) {
  constructor() {
    super(), wp(this, be), this._rulesets = [], this._providers = [], this._loading = !0, this._runs = [], this._savingSettings = !1, this._reanalyzeMediaKeys = [], this._reanalyzeResults = [], this._reanalyzing = !1, wp(this, Yr), this.consumeContext(F1, (n) => {
      W3(this, Yr, n);
    });
  }
  connectedCallback() {
    super.connectedCallback(), xe(this, be, pi).call(this);
  }
  render() {
    return this._loading ? Ve`<uui-loader></uui-loader>` : this._plan ? xe(this, be, Rv).call(this) : this._requirements ? xe(this, be, Hv).call(this) : this._editing ? xe(this, be, Xv).call(this) : xe(this, be, Yv).call(this);
  }
};
Yr = /* @__PURE__ */ new WeakMap();
be = /* @__PURE__ */ new WeakSet();
pi = async function() {
  this._loading = !0;
  try {
    const [n, a, o, u] = await Promise.all([
      Zt.getRulesets(),
      Zt.getProviders(),
      Zt.getRuns(),
      Zt.getSettings()
    ]);
    this._rulesets = n.data ?? [], this._providers = a.data ?? [], this._runs = o.data ?? [], this._settings = u.data ?? { persistImageDescription: !0 };
  } catch {
    xe(this, be, ut).call(this, "danger", "Could not load Media Curator data. Check the server log and reload.");
  } finally {
    this._loading = !1;
  }
};
zv = async function(n) {
  const a = await Zt.planCuration({
    body: { scopeFolderKey: n.scopeRootKey, recursive: !0 }
  });
  if (a.error || !a.data) {
    xe(this, be, ut).call(this, "danger", `Could not plan: ${JSON.stringify(a.error ?? "no data")}`);
    return;
  }
  this._plan = { ruleset: n, plan: a.data };
};
Mv = async function() {
  const n = this._plan;
  if (!n) return;
  const a = await Zt.executeCuration({
    body: { scopeFolderKey: n.ruleset.scopeRootKey, recursive: !0 }
  });
  if (a.error || !a.data) {
    xe(this, be, ut).call(this, "danger", `Curation failed: ${JSON.stringify(a.error ?? "no data")}`);
    return;
  }
  const o = a.data;
  xe(this, be, ut).call(this, "positive", `Curated: ${o.moved} moved, ${o.alreadyInPlace} already in place, ${o.failed} failed.`), this._plan = void 0, await xe(this, be, pi).call(this);
};
ut = function(n, a) {
  F3(this, Yr)?.peek(n, { data: { message: a } });
};
Nv = function() {
  this._editing = {
    key: "00000000-0000-0000-0000-000000000000",
    scopeRootKey: "",
    name: "",
    enabled: !0,
    rules: []
  };
};
Cv = function(n) {
  this._editing = structuredClone(n);
};
Av = async function(n) {
  try {
    await W1(this, {
      headline: "Delete ruleset",
      content: `Delete the ruleset "${n.name}"? Media that has already been curated stays where it is.`,
      color: "danger",
      confirmLabel: "Delete"
    });
  } catch {
    return;
  }
  await Zt.deleteRuleset({ path: { key: n.key } }), xe(this, be, ut).call(this, "positive", `Deleted "${n.name}".`), await xe(this, be, pi).call(this);
};
Tv = async function() {
  const n = this._editing;
  if (!n) return;
  const a = await Zt.saveRuleset({ body: n });
  if (a.error) {
    xe(this, be, ut).call(this, "danger", `Could not save: ${JSON.stringify(a.error)}`);
    return;
  }
  xe(this, be, ut).call(this, "positive", `Saved "${n.name}".`), this._editing = void 0, await xe(this, be, pi).call(this);
};
Dv = function(n) {
  const a = n.target.selection;
  this._editing && a?.length && (this._editing = { ...this._editing, scopeRootKey: a[0] });
};
xd = async function(n) {
  const a = await Zt.checkRequirements({ path: { rulesetKey: n.key } });
  if (!a.data) {
    xe(this, be, ut).call(this, "danger", "Could not check requirements.");
    return;
  }
  const o = /* @__PURE__ */ new Map();
  for (const u of a.data.items ?? [])
    u.status !== "satisfied" && o.set(xe(this, be, ec).call(this, u.requirementAlias, u.mediaTypeAlias), "create");
  this._requirements = { ruleset: n, report: a.data, choices: o };
};
ec = function(n, a) {
  return `${n}::${a}`;
};
Ov = async function() {
  const n = this._requirements;
  if (!n) return;
  const a = [];
  for (const s of n.report.items ?? []) {
    if (s.status === "satisfied") continue;
    const f = n.choices.get(xe(this, be, ec).call(this, s.requirementAlias, s.mediaTypeAlias));
    !f || f === "decline" || a.push({
      requirementAlias: s.requirementAlias,
      mediaTypeAlias: s.mediaTypeAlias,
      action: f,
      mapToPropertyAlias: f === "map" ? s.candidatePropertyAlias : void 0
    });
  }
  const o = await Zt.applyRequirements({ body: a });
  if (o.error) {
    xe(this, be, ut).call(this, "danger", `Could not apply: ${JSON.stringify(o.error)}`);
    return;
  }
  const u = o.data;
  (u.errors ?? []).length > 0 ? xe(this, be, ut).call(this, "danger", `Some changes failed: ${(u.errors ?? []).join("; ")}`) : xe(this, be, ut).call(this, "positive", `Provisioned ${(u.createdProperties ?? []).length} propert(y/ies), mapped ${(u.mappedProperties ?? []).length}.`), await xe(this, be, xd).call(this, n.ruleset);
};
Rv = function() {
  const { ruleset: n, plan: a } = this._plan;
  return Ve`
      <uui-box headline="Dry run — ${n.name}" data-mark="mc:plan">
        <p data-mark="mc:plan-summary">
          ${a.moveCount === 0 ? "Nothing would move. Everything is already in place or no rules resolved." : `${a.moveCount} item(s) would move. Nothing has moved yet — review and confirm below.`}
        </p>
        ${(a.moves ?? []).length > 0 ? Ve`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Item</uui-table-head-cell>
                  <uui-table-head-cell>Target folder</uui-table-head-cell>
                  <uui-table-head-cell>Status</uui-table-head-cell>
                </uui-table-head>
                ${(a.moves ?? []).map(
    (o) => Ve`
                    <uui-table-row data-mark="mc:plan-move">
                      <uui-table-cell>${o.mediaName}</uui-table-cell>
                      <uui-table-cell>${o.targetPath}</uui-table-cell>
                      <uui-table-cell>${o.alreadyInPlace ? "already in place" : "will move"}</uui-table-cell>
                    </uui-table-row>
                  `
  )}
              </uui-table>
            ` : Rl}
        ${(a.skippedItems ?? []).length > 0 ? Ve`<details>
              <summary>${(a.skippedItems ?? []).length} item(s) skipped</summary>
              <ul>
                ${(a.skippedItems ?? []).map((o) => Ve`<li>${o}</li>`)}
              </ul>
            </details>` : Rl}
        <div class="actions">
          <uui-button label="Cancel" look="secondary" @click=${() => this._plan = void 0}></uui-button>
          ${a.moveCount > 0 ? Ve`<uui-button
                data-mark="mc:plan-execute"
                label="Move ${a.moveCount} item(s)"
                look="primary"
                color="positive"
                @click=${xe(this, be, Mv)}
              ></uui-button>` : Rl}
        </div>
      </uui-box>
    `;
};
Hv = function() {
  const { ruleset: n, report: a, choices: o } = this._requirements;
  return Ve`
      <uui-box headline="Property requirements — ${n.name}" data-mark="mc:requirements">
        ${a.allSatisfied ? Ve`<p data-mark="mc:requirements-ok">
              All requirements are satisfied. Providers in this ruleset have everything they need.
            </p>` : Ve`<p>
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
          ${(a.items ?? []).map((u) => {
    const s = xe(this, be, ec).call(this, u.requirementAlias, u.mediaTypeAlias);
    return Ve`
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
                  ${u.status === "satisfied" ? Ve`—` : Ve`
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
          ${a.allSatisfied ? Rl : Ve`<uui-button
                data-mark="mc:requirements-apply"
                label="Apply approved changes"
                look="primary"
                color="positive"
                @click=${xe(this, be, Ov)}
              ></uui-button>`}
        </div>
      </uui-box>
    `;
};
kv = async function() {
  if (this._settings) {
    this._savingSettings = !0;
    try {
      const n = await Zt.saveSettings({ body: this._settings });
      if (n.error || !n.data) {
        xe(this, be, ut).call(this, "danger", `Could not save settings: ${JSON.stringify(n.error ?? "no data")}`);
        return;
      }
      this._settings = n.data, xe(this, be, ut).call(this, "positive", "Settings saved.");
    } finally {
      this._savingSettings = !1;
    }
  }
};
Bv = function(n) {
  const a = n.target.selection ?? [];
  this._reanalyzeMediaKeys = a, this._reanalyzeResults = [];
};
Uv = async function() {
  if (this._reanalyzeMediaKeys.length === 0) {
    xe(this, be, ut).call(this, "danger", "Choose at least one image to re-analyze.");
    return;
  }
  this._reanalyzing = !0;
  try {
    const n = await Zt.reanalyzeImages({
      body: { mediaKeys: this._reanalyzeMediaKeys }
    });
    if (n.error || !n.data) {
      xe(this, be, ut).call(this, "danger", `Re-analyze failed: ${JSON.stringify(n.error ?? "no data")}`);
      return;
    }
    this._reanalyzeResults = n.data.results ?? [];
    const a = this._reanalyzeResults.filter((u) => u.analyzed).length, o = this._reanalyzeResults.length - a;
    o === 0 ? xe(this, be, ut).call(this, "positive", `Re-analyzed ${a} image(s).`) : xe(this, be, ut).call(this, "danger", `Re-analyzed ${a} image(s); ${o} could not be analyzed. See results below.`);
  } finally {
    this._reanalyzing = !1;
  }
};
qv = function() {
  return Ve`
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
            @change=${xe(this, be, Bv)}
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
            @click=${xe(this, be, Uv)}
          ></uui-button>
        </div>
        ${this._reanalyzeResults.length > 0 ? Ve`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Image</uui-table-head-cell>
                  <uui-table-head-cell>Description</uui-table-head-cell>
                  <uui-table-head-cell>Tags</uui-table-head-cell>
                  <uui-table-head-cell>Code</uui-table-head-cell>
                </uui-table-head>
                ${this._reanalyzeResults.map(
    (n) => Ve`
                    <uui-table-row data-mark="mc:reanalyze-result">
                      <uui-table-cell>${n.mediaName ?? n.mediaKey}</uui-table-cell>
                      <uui-table-cell>
                        ${n.analyzed ? n.description ?? "—" : Ve`<em>${n.error ?? "Not analyzed"}</em>`}
                      </uui-table-cell>
                      <uui-table-cell>${(n.tags ?? []).join(", ") || "—"}</uui-table-cell>
                      <uui-table-cell>${n.classificationCode ?? "—"}</uui-table-cell>
                    </uui-table-row>
                  `
  )}
              </uui-table>
            ` : Rl}
      </uui-box>
    `;
};
jv = function() {
  const n = this._settings;
  return n ? Ve`
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
            @change=${(a) => {
    this._settings = {
      ...n,
      persistImageDescription: a.target.checked
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
            @click=${xe(this, be, kv)}
          ></uui-button>
        </div>
      </uui-box>
    ` : Rl;
};
Yv = function() {
  return Ve`
      ${xe(this, be, jv).call(this)}
      ${xe(this, be, qv).call(this)}
      <uui-box headline="Curation rulesets">
        <uui-button
          slot="header-actions"
          look="primary"
          label="Create ruleset"
          @click=${xe(this, be, Nv)}
        ></uui-button>
        ${this._rulesets.length === 0 ? Ve`<p data-mark="mc:empty">
              No rulesets yet. Create one and attach it to a media folder to start curating.
            </p>` : Ve`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Name</uui-table-head-cell>
                  <uui-table-head-cell>Rules</uui-table-head-cell>
                  <uui-table-head-cell>Enabled</uui-table-head-cell>
                  <uui-table-head-cell></uui-table-head-cell>
                </uui-table-head>
                ${J1(
    this._rulesets,
    (n) => n.key,
    (n) => Ve`
                    <uui-table-row data-mark="mc:ruleset-row">
                      <uui-table-cell>${n.name}</uui-table-cell>
                      <uui-table-cell>${n.rules?.length ?? 0}</uui-table-cell>
                      <uui-table-cell>${n.enabled ? "Yes" : "No"}</uui-table-cell>
                      <uui-table-cell>
                        <uui-button
                          label="Edit ${n.name}"
                          look="secondary"
                          @click=${() => xe(this, be, Cv).call(this, n)}
                        ></uui-button>
                        <uui-button
                          label="Requirements for ${n.name}"
                          look="secondary"
                          @click=${() => xe(this, be, xd).call(this, n)}
                        ></uui-button>
                        <uui-button
                          label="Curate now ${n.name}"
                          look="primary"
                          @click=${() => xe(this, be, zv).call(this, n)}
                        ></uui-button>
                        <uui-button
                          label="Delete ${n.name}"
                          look="secondary"
                          color="danger"
                          @click=${() => xe(this, be, Av).call(this, n)}
                        ></uui-button>
                      </uui-table-cell>
                    </uui-table-row>
                  `
  )}
              </uui-table>
            `}
      </uui-box>
      ${xe(this, be, Vv).call(this)}
    `;
};
Lv = async function(n) {
  const a = await Zt.undoRun({ path: { runKey: n.key } });
  if (a.error || !a.data) {
    xe(this, be, ut).call(this, "danger", `Undo failed: ${JSON.stringify(a.error ?? "no data")}`);
    return;
  }
  const o = a.data;
  xe(this, be, ut).call(this, "positive", `Undo: ${o.moved} restored, ${o.alreadyInPlace} already in place, ${o.failed} failed.`), await xe(this, be, pi).call(this);
};
Vv = function() {
  return this._runs.length === 0 ? Rl : Ve`
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
    (n) => Ve`
              <uui-table-row data-mark="mc:run-row">
                <uui-table-cell>${new Date(n.started).toLocaleString()}</uui-table-cell>
                <uui-table-cell>${n.trigger}</uui-table-cell>
                <uui-table-cell data-mark="mc:run-moved">${n.moved}</uui-table-cell>
                <uui-table-cell>${n.alreadyInPlace}</uui-table-cell>
                <uui-table-cell>${n.failed}</uui-table-cell>
                <uui-table-cell>
                  ${n.moved > 0 && !n.trigger.startsWith("undo:") ? Ve`<uui-button
                        data-mark="mc:run-undo"
                        compact
                        look="secondary"
                        label="Undo run from ${new Date(n.started).toLocaleString()}"
                        @click=${() => xe(this, be, Lv).call(this, n)}
                        >Undo</uui-button
                      >` : Rl}
                </uui-table-cell>
              </uui-table-row>
            `
  )}
        </uui-table>
      </uui-box>
    `;
};
Xv = function() {
  const n = this._editing;
  return Ve`
      <uui-box headline=${n.name ? `Edit: ${n.name}` : "New ruleset"}>
        <div class="form">
          <uui-label for="mc-name">Name</uui-label>
          <uui-input
            id="mc-name"
            data-mark="mc:name"
            label="Ruleset name"
            .value=${n.name ?? ""}
            @input=${(a) => this._editing = { ...n, name: a.target.value }}
          ></uui-input>

          <uui-label>Scope folder</uui-label>
          <umb-input-media
            data-mark="mc:scope"
            .max=${1}
            .selection=${n.scopeRootKey ? [n.scopeRootKey] : []}
            @change=${xe(this, be, Dv)}
          ></umb-input-media>

          <uui-label>Enabled</uui-label>
          <uui-toggle
            data-mark="mc:enabled"
            label="Enabled"
            .checked=${n.enabled ?? !0}
            @change=${(a) => this._editing = { ...n, enabled: a.target.checked }}
          ></uui-toggle>
        </div>

        <h4 class="rules-heading">Rules</h4>
        <div class="rules-editor">
          <mc-rule-flow
            .rules=${n.rules ?? []}
            .providers=${this._providers}
            .scopeName=${n.name || "Scope"}
            @rules-change=${(a) => {
    const o = this._editing;
    o && (this._editing = { ...o, rules: a.detail.rules });
  }}
          ></mc-rule-flow>
        </div>

        <div class="actions">
          <uui-button label="Cancel" look="secondary" @click=${() => this._editing = void 0}></uui-button>
          <uui-button data-mark="mc:save" label="Save" look="primary" color="positive" @click=${xe(this, be, Tv)}></uui-button>
        </div>
      </uui-box>
    `;
};
bt.styles = [
  zp`
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
      .rules-heading {
        position: relative;
        z-index: 0;
        pointer-events: none;
      }
      .rules-editor {
        position: relative;
        z-index: 1;
        isolation: isolate;
      }
    `
];
Qt([
  un()
], bt.prototype, "_rulesets", 2);
Qt([
  un()
], bt.prototype, "_providers", 2);
Qt([
  un()
], bt.prototype, "_editing", 2);
Qt([
  un()
], bt.prototype, "_loading", 2);
Qt([
  un()
], bt.prototype, "_requirements", 2);
Qt([
  un()
], bt.prototype, "_plan", 2);
Qt([
  un()
], bt.prototype, "_runs", 2);
Qt([
  un()
], bt.prototype, "_settings", 2);
Qt([
  un()
], bt.prototype, "_savingSettings", 2);
Qt([
  un()
], bt.prototype, "_reanalyzeMediaKeys", 2);
Qt([
  un()
], bt.prototype, "_reanalyzeResults", 2);
Qt([
  un()
], bt.prototype, "_reanalyzing", 2);
bt = Qt([
  Mp("mediacurator-dashboard")
], bt);
const lM = bt;
export {
  bt as MediaCuratorDashboardElement,
  lM as default
};
//# sourceMappingURL=mediacurator-dashboard.element-DTalp_Nf.js.map
