import { defineComponent as he, ref as w, computed as J, onUpdated as be, watch as ve, createElementBlock as st, openBlock as ct, unref as xt, createElementVNode as ut, normalizeStyle as At, Fragment as me, renderList as ye, renderSlot as Te, nextTick as H } from "vue";
var Jt = typeof global == "object" && global && global.Object === Object && global, _e = typeof self == "object" && self && self.Object === Object && self, x = Jt || _e || Function("return this")(), k = x.Symbol, Zt = Object.prototype, je = Zt.hasOwnProperty, $e = Zt.toString, Z = k ? k.toStringTag : void 0;
function we(t) {
  var e = je.call(t, Z), r = t[Z];
  try {
    t[Z] = void 0;
    var n = !0;
  } catch {
  }
  var p = $e.call(t);
  return n && (e ? t[Z] = r : delete t[Z]), p;
}
var xe = Object.prototype, Ae = xe.toString;
function Ie(t) {
  return Ae.call(t);
}
var Se = "[object Null]", Oe = "[object Undefined]", It = k ? k.toStringTag : void 0;
function G(t) {
  return t == null ? t === void 0 ? Oe : Se : It && It in Object(t) ? we(t) : Ie(t);
}
function W(t) {
  return t != null && typeof t == "object";
}
var Pe = "[object Symbol]";
function Ce(t) {
  return typeof t == "symbol" || W(t) && G(t) == Pe;
}
var vt = Array.isArray, Ee = /\s/;
function De(t) {
  for (var e = t.length; e-- && Ee.test(t.charAt(e)); )
    ;
  return e;
}
var Fe = /^\s+/;
function Me(t) {
  return t && t.slice(0, De(t) + 1).replace(Fe, "");
}
function F(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var St = NaN, He = /^[-+]0x[0-9a-f]+$/i, Be = /^0b[01]+$/i, Re = /^0o[0-7]+$/i, Ue = parseInt;
function Ot(t) {
  if (typeof t == "number")
    return t;
  if (Ce(t))
    return St;
  if (F(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = F(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = Me(t);
  var r = Be.test(t);
  return r || Re.test(t) ? Ue(t.slice(2), r ? 2 : 8) : He.test(t) ? St : +t;
}
var Le = "[object AsyncFunction]", ze = "[object Function]", Ne = "[object GeneratorFunction]", ke = "[object Proxy]";
function Qt(t) {
  if (!F(t))
    return !1;
  var e = G(t);
  return e == ze || e == Ne || e == Le || e == ke;
}
var lt = x["__core-js_shared__"], Pt = function() {
  var t = /[^.]+$/.exec(lt && lt.keys && lt.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Ve(t) {
  return !!Pt && Pt in t;
}
var Ge = Function.prototype, We = Ge.toString;
function R(t) {
  if (t != null) {
    try {
      return We.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var qe = /[\\^$.*+?()[\]{}|]/g, Ke = /^\[object .+?Constructor\]$/, Xe = Function.prototype, Ye = Object.prototype, Je = Xe.toString, Ze = Ye.hasOwnProperty, Qe = RegExp(
  "^" + Je.call(Ze).replace(qe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function tr(t) {
  if (!F(t) || Ve(t))
    return !1;
  var e = Qt(t) ? Qe : Ke;
  return e.test(R(t));
}
function er(t, e) {
  return t == null ? void 0 : t[e];
}
function U(t, e) {
  var r = er(t, e);
  return tr(r) ? r : void 0;
}
var pt = U(x, "WeakMap"), Ct = Object.create, rr = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!F(e))
      return {};
    if (Ct)
      return Ct(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}(), Et = function() {
  try {
    var t = U(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
function nr(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n && e(t[r], r, t) !== !1; )
    ;
  return t;
}
var ar = 9007199254740991, or = /^(?:0|[1-9]\d*)$/;
function ir(t, e) {
  var r = typeof t;
  return e = e ?? ar, !!e && (r == "number" || r != "symbol" && or.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function sr(t, e, r) {
  e == "__proto__" && Et ? Et(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function te(t, e) {
  return t === e || t !== t && e !== e;
}
var cr = Object.prototype, ur = cr.hasOwnProperty;
function lr(t, e, r) {
  var n = t[e];
  (!(ur.call(t, e) && te(n, r)) || r === void 0 && !(e in t)) && sr(t, e, r);
}
var fr = 9007199254740991;
function ee(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= fr;
}
function dr(t) {
  return t != null && ee(t.length) && !Qt(t);
}
var pr = Object.prototype;
function re(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || pr;
  return t === r;
}
function gr(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var hr = "[object Arguments]";
function Dt(t) {
  return W(t) && G(t) == hr;
}
var ne = Object.prototype, br = ne.hasOwnProperty, vr = ne.propertyIsEnumerable, mr = Dt(/* @__PURE__ */ function() {
  return arguments;
}()) ? Dt : function(t) {
  return W(t) && br.call(t, "callee") && !vr.call(t, "callee");
};
function yr() {
  return !1;
}
var ae = typeof exports == "object" && exports && !exports.nodeType && exports, Ft = ae && typeof module == "object" && module && !module.nodeType && module, Tr = Ft && Ft.exports === ae, Mt = Tr ? x.Buffer : void 0, _r = Mt ? Mt.isBuffer : void 0, oe = _r || yr, jr = "[object Arguments]", $r = "[object Array]", wr = "[object Boolean]", xr = "[object Date]", Ar = "[object Error]", Ir = "[object Function]", Sr = "[object Map]", Or = "[object Number]", Pr = "[object Object]", Cr = "[object RegExp]", Er = "[object Set]", Dr = "[object String]", Fr = "[object WeakMap]", Mr = "[object ArrayBuffer]", Hr = "[object DataView]", Br = "[object Float32Array]", Rr = "[object Float64Array]", Ur = "[object Int8Array]", Lr = "[object Int16Array]", zr = "[object Int32Array]", Nr = "[object Uint8Array]", kr = "[object Uint8ClampedArray]", Vr = "[object Uint16Array]", Gr = "[object Uint32Array]", g = {};
g[Br] = g[Rr] = g[Ur] = g[Lr] = g[zr] = g[Nr] = g[kr] = g[Vr] = g[Gr] = !0;
g[jr] = g[$r] = g[Mr] = g[wr] = g[Hr] = g[xr] = g[Ar] = g[Ir] = g[Sr] = g[Or] = g[Pr] = g[Cr] = g[Er] = g[Dr] = g[Fr] = !1;
function Wr(t) {
  return W(t) && ee(t.length) && !!g[G(t)];
}
function mt(t) {
  return function(e) {
    return t(e);
  };
}
var ie = typeof exports == "object" && exports && !exports.nodeType && exports, Q = ie && typeof module == "object" && module && !module.nodeType && module, qr = Q && Q.exports === ie, ft = qr && Jt.process, V = function() {
  try {
    var t = Q && Q.require && Q.require("util").types;
    return t || ft && ft.binding && ft.binding("util");
  } catch {
  }
}(), Ht = V && V.isTypedArray, Kr = Ht ? mt(Ht) : Wr, Xr = Object.prototype, Yr = Xr.hasOwnProperty;
function Jr(t, e) {
  var r = vt(t), n = !r && mr(t), p = !r && !n && oe(t), o = !r && !n && !p && Kr(t), l = r || n || p || o, c = l ? gr(t.length, String) : [], h = c.length;
  for (var m in t)
    Yr.call(t, m) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
    (m == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    p && (m == "offset" || m == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (m == "buffer" || m == "byteLength" || m == "byteOffset") || // Skip index properties.
    ir(m, h))) && c.push(m);
  return c;
}
function se(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var Zr = se(Object.keys, Object), Qr = Object.prototype, tn = Qr.hasOwnProperty;
function en(t) {
  if (!re(t))
    return Zr(t);
  var e = [];
  for (var r in Object(t))
    tn.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
function rn(t) {
  return dr(t) ? Jr(t) : en(t);
}
var tt = U(Object, "create");
function nn() {
  this.__data__ = tt ? tt(null) : {}, this.size = 0;
}
function an(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var on = "__lodash_hash_undefined__", sn = Object.prototype, cn = sn.hasOwnProperty;
function un(t) {
  var e = this.__data__;
  if (tt) {
    var r = e[t];
    return r === on ? void 0 : r;
  }
  return cn.call(e, t) ? e[t] : void 0;
}
var ln = Object.prototype, fn = ln.hasOwnProperty;
function dn(t) {
  var e = this.__data__;
  return tt ? e[t] !== void 0 : fn.call(e, t);
}
var pn = "__lodash_hash_undefined__";
function gn(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = tt && e === void 0 ? pn : e, this;
}
function B(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
B.prototype.clear = nn;
B.prototype.delete = an;
B.prototype.get = un;
B.prototype.has = dn;
B.prototype.set = gn;
function hn() {
  this.__data__ = [], this.size = 0;
}
function at(t, e) {
  for (var r = t.length; r--; )
    if (te(t[r][0], e))
      return r;
  return -1;
}
var bn = Array.prototype, vn = bn.splice;
function mn(t) {
  var e = this.__data__, r = at(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : vn.call(e, r, 1), --this.size, !0;
}
function yn(t) {
  var e = this.__data__, r = at(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function Tn(t) {
  return at(this.__data__, t) > -1;
}
function _n(t, e) {
  var r = this.__data__, n = at(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
function C(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
C.prototype.clear = hn;
C.prototype.delete = mn;
C.prototype.get = yn;
C.prototype.has = Tn;
C.prototype.set = _n;
var et = U(x, "Map");
function jn() {
  this.size = 0, this.__data__ = {
    hash: new B(),
    map: new (et || C)(),
    string: new B()
  };
}
function $n(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function ot(t, e) {
  var r = t.__data__;
  return $n(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function wn(t) {
  var e = ot(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function xn(t) {
  return ot(this, t).get(t);
}
function An(t) {
  return ot(this, t).has(t);
}
function In(t, e) {
  var r = ot(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function q(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
q.prototype.clear = jn;
q.prototype.delete = wn;
q.prototype.get = xn;
q.prototype.has = An;
q.prototype.set = In;
function Sn(t, e) {
  for (var r = -1, n = e.length, p = t.length; ++r < n; )
    t[p + r] = e[r];
  return t;
}
var On = se(Object.getPrototypeOf, Object);
function Pn() {
  this.__data__ = new C(), this.size = 0;
}
function Cn(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function En(t) {
  return this.__data__.get(t);
}
function Dn(t) {
  return this.__data__.has(t);
}
var Fn = 200;
function Mn(t, e) {
  var r = this.__data__;
  if (r instanceof C) {
    var n = r.__data__;
    if (!et || n.length < Fn - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new q(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function K(t) {
  var e = this.__data__ = new C(t);
  this.size = e.size;
}
K.prototype.clear = Pn;
K.prototype.delete = Cn;
K.prototype.get = En;
K.prototype.has = Dn;
K.prototype.set = Mn;
var ce = typeof exports == "object" && exports && !exports.nodeType && exports, Bt = ce && typeof module == "object" && module && !module.nodeType && module, Hn = Bt && Bt.exports === ce, Rt = Hn ? x.Buffer : void 0;
Rt && Rt.allocUnsafe;
function Bn(t, e) {
  return t.slice();
}
function Rn(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, p = 0, o = []; ++r < n; ) {
    var l = t[r];
    e(l, r, t) && (o[p++] = l);
  }
  return o;
}
function Un() {
  return [];
}
var Ln = Object.prototype, zn = Ln.propertyIsEnumerable, Ut = Object.getOwnPropertySymbols, Nn = Ut ? function(t) {
  return t == null ? [] : (t = Object(t), Rn(Ut(t), function(e) {
    return zn.call(t, e);
  }));
} : Un;
function kn(t, e, r) {
  var n = e(t);
  return vt(t) ? n : Sn(n, r(t));
}
function Vn(t) {
  return kn(t, rn, Nn);
}
var gt = U(x, "DataView"), ht = U(x, "Promise"), bt = U(x, "Set"), Lt = "[object Map]", Gn = "[object Object]", zt = "[object Promise]", Nt = "[object Set]", kt = "[object WeakMap]", Vt = "[object DataView]", Wn = R(gt), qn = R(et), Kn = R(ht), Xn = R(bt), Yn = R(pt), P = G;
(gt && P(new gt(new ArrayBuffer(1))) != Vt || et && P(new et()) != Lt || ht && P(ht.resolve()) != zt || bt && P(new bt()) != Nt || pt && P(new pt()) != kt) && (P = function(t) {
  var e = G(t), r = e == Gn ? t.constructor : void 0, n = r ? R(r) : "";
  if (n)
    switch (n) {
      case Wn:
        return Vt;
      case qn:
        return Lt;
      case Kn:
        return zt;
      case Xn:
        return Nt;
      case Yn:
        return kt;
    }
  return e;
});
var Jn = Object.prototype, Zn = Jn.hasOwnProperty;
function Qn(t) {
  var e = t.length, r = new t.constructor(e);
  return e && typeof t[0] == "string" && Zn.call(t, "index") && (r.index = t.index, r.input = t.input), r;
}
var Gt = x.Uint8Array;
function yt(t) {
  var e = new t.constructor(t.byteLength);
  return new Gt(e).set(new Gt(t)), e;
}
function ta(t, e) {
  var r = yt(t.buffer);
  return new t.constructor(r, t.byteOffset, t.byteLength);
}
var ea = /\w*$/;
function ra(t) {
  var e = new t.constructor(t.source, ea.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var Wt = k ? k.prototype : void 0, qt = Wt ? Wt.valueOf : void 0;
function na(t) {
  return qt ? Object(qt.call(t)) : {};
}
function aa(t, e) {
  var r = yt(t.buffer);
  return new t.constructor(r, t.byteOffset, t.length);
}
var oa = "[object Boolean]", ia = "[object Date]", sa = "[object Map]", ca = "[object Number]", ua = "[object RegExp]", la = "[object Set]", fa = "[object String]", da = "[object Symbol]", pa = "[object ArrayBuffer]", ga = "[object DataView]", ha = "[object Float32Array]", ba = "[object Float64Array]", va = "[object Int8Array]", ma = "[object Int16Array]", ya = "[object Int32Array]", Ta = "[object Uint8Array]", _a = "[object Uint8ClampedArray]", ja = "[object Uint16Array]", $a = "[object Uint32Array]";
function wa(t, e, r) {
  var n = t.constructor;
  switch (e) {
    case pa:
      return yt(t);
    case oa:
    case ia:
      return new n(+t);
    case ga:
      return ta(t);
    case ha:
    case ba:
    case va:
    case ma:
    case ya:
    case Ta:
    case _a:
    case ja:
    case $a:
      return aa(t);
    case sa:
      return new n();
    case ca:
    case fa:
      return new n(t);
    case ua:
      return ra(t);
    case la:
      return new n();
    case da:
      return na(t);
  }
}
function xa(t) {
  return typeof t.constructor == "function" && !re(t) ? rr(On(t)) : {};
}
var Aa = "[object Map]";
function Ia(t) {
  return W(t) && P(t) == Aa;
}
var Kt = V && V.isMap, Sa = Kt ? mt(Kt) : Ia, Oa = "[object Set]";
function Pa(t) {
  return W(t) && P(t) == Oa;
}
var Xt = V && V.isSet, Ca = Xt ? mt(Xt) : Pa, ue = "[object Arguments]", Ea = "[object Array]", Da = "[object Boolean]", Fa = "[object Date]", Ma = "[object Error]", le = "[object Function]", Ha = "[object GeneratorFunction]", Ba = "[object Map]", Ra = "[object Number]", fe = "[object Object]", Ua = "[object RegExp]", La = "[object Set]", za = "[object String]", Na = "[object Symbol]", ka = "[object WeakMap]", Va = "[object ArrayBuffer]", Ga = "[object DataView]", Wa = "[object Float32Array]", qa = "[object Float64Array]", Ka = "[object Int8Array]", Xa = "[object Int16Array]", Ya = "[object Int32Array]", Ja = "[object Uint8Array]", Za = "[object Uint8ClampedArray]", Qa = "[object Uint16Array]", to = "[object Uint32Array]", d = {};
d[ue] = d[Ea] = d[Va] = d[Ga] = d[Da] = d[Fa] = d[Wa] = d[qa] = d[Ka] = d[Xa] = d[Ya] = d[Ba] = d[Ra] = d[fe] = d[Ua] = d[La] = d[za] = d[Na] = d[Ja] = d[Za] = d[Qa] = d[to] = !0;
d[Ma] = d[le] = d[ka] = !1;
function nt(t, e, r, n, p, o) {
  var l;
  if (l !== void 0)
    return l;
  if (!F(t))
    return t;
  var c = vt(t);
  if (c)
    l = Qn(t);
  else {
    var h = P(t), m = h == le || h == Ha;
    if (oe(t))
      return Bn(t);
    if (h == fe || h == ue || m && !p)
      l = m ? {} : xa(t);
    else {
      if (!d[h])
        return p ? t : {};
      l = wa(t, h);
    }
  }
  o || (o = new K());
  var A = o.get(t);
  if (A)
    return A;
  o.set(t, l), Ca(t) ? t.forEach(function(T) {
    l.add(nt(T, e, r, T, t, o));
  }) : Sa(t) && t.forEach(function(T, $) {
    l.set($, nt(T, e, r, $, t, o));
  });
  var f = Vn, I = c ? void 0 : f(t);
  return nr(I || t, function(T, $) {
    I && ($ = T, T = t[$]), lr(l, $, nt(T, e, r, $, t, o));
  }), l;
}
var eo = 1, ro = 4;
function no(t) {
  return nt(t, eo | ro);
}
var dt = function() {
  return x.Date.now();
}, ao = "Expected a function", oo = Math.max, io = Math.min;
function so(t, e, r) {
  var n, p, o, l, c, h, m = 0, A = !1, f = !1, I = !0;
  if (typeof t != "function")
    throw new TypeError(ao);
  e = Ot(e) || 0, F(r) && (A = !!r.leading, f = "maxWait" in r, o = f ? oo(Ot(r.maxWait) || 0, e) : o, I = "trailing" in r ? !!r.trailing : I);
  function T(b) {
    var j = n, E = p;
    return n = p = void 0, m = b, l = t.apply(E, j), l;
  }
  function $(b) {
    return m = b, c = setTimeout(L, e), A ? T(b) : l;
  }
  function it(b) {
    var j = b - h, E = b - m, M = e - j;
    return f ? io(M, o - E) : M;
  }
  function X(b) {
    var j = b - h, E = b - m;
    return h === void 0 || j >= e || j < 0 || f && E >= o;
  }
  function L() {
    var b = dt();
    if (X(b))
      return z(b);
    c = setTimeout(L, it(b));
  }
  function z(b) {
    return c = void 0, I && n ? T(b) : (n = p = void 0, l);
  }
  function rt() {
    c !== void 0 && clearTimeout(c), m = 0, n = h = p = c = void 0;
  }
  function N() {
    return c === void 0 ? l : z(dt());
  }
  function O() {
    var b = dt(), j = X(b);
    if (n = arguments, p = this, h = b, j) {
      if (c === void 0)
        return $(h);
      if (f)
        return clearTimeout(c), c = setTimeout(L, e), T(h);
    }
    return c === void 0 && (c = setTimeout(L, e)), l;
  }
  return O.cancel = rt, O.flush = N, O;
}
var co = "Expected a function";
function Yt(t, e, r) {
  var n = !0, p = !0;
  if (typeof t != "function")
    throw new TypeError(co);
  return F(r) && (n = "leading" in r ? !!r.leading : n, p = "trailing" in r ? !!r.trailing : p), so(t, e, {
    leading: n,
    maxWait: e,
    trailing: p
  });
}
const uo = ["id"], lo = { style: { display: "flex", "flex-direction": "column", width: "100%" } }, po = /* @__PURE__ */ he({
  __name: "list",
  props: {
    listData: { default: () => [] },
    keyField: { default: "id" },
    estimateItemHeight: { default: 48 },
    bufferRatio: { default: 1 },
    initialPosition: { default: "bottom" },
    itemAlign: { default: "bottom" },
    topThreshold: { default: 50 },
    bottomThreshold: { default: 50 }
  },
  emits: ["topArrived", "bottomArrived"],
  setup(t, { expose: e, emit: r }) {
    const n = t, p = r, o = w(), l = w(0), c = w(0), h = w(0), m = w([]), A = w(!1), f = w([]), I = w(0), T = J(() => Math.ceil(l.value / n.estimateItemHeight)), $ = J(() => Math.min(c.value, T.value * n.bufferRatio)), it = J(() => Math.min(n.listData.length - h.value, T.value * n.bufferRatio)), X = J(() => {
      const a = c.value - $.value, i = h.value + it.value;
      return n.listData.slice(a, i).map((u, s) => ({
        ...u,
        index: a + s
      }));
    }), L = J(() => {
      var a;
      return ((a = f.value[f.value.length - 1]) == null ? void 0 : a.bottom) || 0;
    });
    function z(a) {
      let i = 0, u = n.listData.length - 1, s = null;
      for (; i <= u; ) {
        const v = Number.parseInt(String((u + i) / 2)), y = f.value[v].bottom;
        if (y === a)
          return s = v + 1, s;
        y < a ? i = v + 1 : y > a && ((s === null || s > v) && (s = v), u = u - 1);
      }
      return s;
    }
    function rt() {
      const a = c.value - $.value;
      a ? I.value = f.value[a].top : I.value = 0;
    }
    function N() {
      var a;
      (a = m.value) == null || a.forEach((i) => {
        const u = i.id, s = f.value.findIndex((v) => {
          const y = n.keyField;
          return +v.data[y] == +u;
        });
        if (s !== -1) {
          const v = i.clientHeight, y = f.value[s].height, _ = v - y;
          if (_) {
            Object.assign(f.value[s], {
              height: v,
              bottom: f.value[s].bottom + _
            });
            for (let S = s + 1; S < f.value.length; S++)
              f.value[S].top += _, f.value[S].bottom += _;
          }
        }
      });
    }
    function O() {
      return new Promise((a) => {
        const i = () => {
          X.value.every((s) => {
            var y;
            const v = (y = o.value) == null ? void 0 : y.querySelector(`[id="${s[n.keyField]}"]`);
            return v && v.offsetHeight > 0;
          }) ? a() : requestAnimationFrame(i);
        };
        requestAnimationFrame(i);
      });
    }
    const b = w(!1), j = w(!1);
    function E(a = !0) {
      if (!o.value)
        return;
      const { scrollTop: i, clientHeight: u, scrollHeight: s } = o.value, v = n.topThreshold ?? 0, y = n.bottomThreshold ?? 0;
      i <= v ? b.value || (b.value = !0, A.value && a && p("topArrived")) : b.value = !1, s - (i + u) <= y ? j.value || (j.value = !0, A.value && a && p("bottomArrived")) : j.value = !1;
    }
    const M = w({
      scrollTop: 0,
      firstVisibleItemIndex: 0,
      offset: 0
    }), Tt = Yt((a) => {
      const i = a.target.scrollTop;
      if (f.value.length) {
        const u = z(i) ?? 0;
        M.value = {
          scrollTop: i,
          firstVisibleItemIndex: u,
          offset: i - f.value[u].top
        };
      }
      c.value = z(i) ?? 0, h.value = Math.min(c.value + T.value, n.listData.length), rt(), E();
    }, 100);
    be(Yt(() => {
      !m.value || m.value.length === 0 || (N(), rt());
    }, 100));
    async function _t(a = !0) {
      if (o.value) {
        h.value = n.listData.length - 1, N(), await H(), await O();
        const i = o.value.scrollHeight - o.value.clientHeight;
        return new Promise((u) => {
          requestAnimationFrame(() => {
            Y({ top: i, smooth: a }), u();
          });
        });
      }
    }
    async function jt(a = !0) {
      if (o.value)
        return await H(), await O(), new Promise((i) => {
          requestAnimationFrame(() => {
            Y({ top: 0, smooth: a }), i();
          });
        });
    }
    async function $t(a) {
      const { key: i, align: u, smooth: s = !1 } = a, v = n.keyField, y = f.value.findIndex((ge) => ge.data[v] === i);
      if (y === -1 || !o.value)
        return;
      c.value = Math.max(0, y - Math.floor(T.value / 2)), h.value = Math.min(c.value + T.value, n.listData.length), await H(), await O();
      const _ = f.value[y], S = o.value.scrollHeight - o.value.clientHeight;
      let D = 0;
      switch (u) {
        case "top":
          D = _.top;
          break;
        case "center":
          D = _.top - (o.value.clientHeight - _.height) / 2;
          break;
        default:
          D = _.top - (o.value.clientHeight - _.height);
          break;
      }
      D = Math.max(0, Math.min(D, S)), Y({ top: D, smooth: s });
    }
    function Y(a) {
      const { top: i, smooth: u = !1 } = a;
      o.value && o.value.scrollTo({ top: i, behavior: u ? "smooth" : "auto" });
    }
    async function de() {
      var a, i;
      switch (l.value = ((a = o.value) == null ? void 0 : a.clientHeight) ?? 0, c.value = 0, h.value = n.listData.length - 1, f.value = n.listData.map((u, s) => ({
        index: s,
        data: n.listData[s],
        top: s * n.estimateItemHeight,
        bottom: (s + 1) * n.estimateItemHeight,
        height: n.estimateItemHeight
      })), await H(), await O(), N(), n.initialPosition) {
        case "bottom":
          await _t(!1);
          break;
        case "top":
          await jt(!1);
          break;
        default:
          await $t({ key: n.initialPosition, align: n.itemAlign, smooth: !1 });
          break;
      }
      await H(), c.value = z(((i = o.value) == null ? void 0 : i.scrollTop) ?? 0) ?? 0, h.value = Math.min(c.value + T.value, n.listData.length);
    }
    let wt = [];
    async function pe() {
      const a = n.keyField, i = wt[M.value.firstVisibleItemIndex], u = new Map(
        f.value.map((s) => [
          s.data[a],
          { height: s.height }
        ])
      );
      if (wt = no(n.listData), await H(), !A.value)
        de();
      else {
        let s = 0;
        if (f.value = n.listData.map((v, y) => {
          const _ = u.get(v[a]), S = (_ == null ? void 0 : _.height) ?? n.estimateItemHeight, D = {
            index: y,
            data: v,
            top: s,
            height: S,
            bottom: s + S
          };
          return s += S, D;
        }), await H(), await O(), N(), i) {
          const v = n.listData.findIndex(
            (y) => y[a] === i[a]
          );
          if (v !== -1) {
            const y = f.value[v].top + M.value.offset;
            if (M.value.firstVisibleItemIndex < v) {
              const _ = l.value * 0.15;
              Y({ top: y - _, smooth: !1 });
            } else
              Y({ top: y, smooth: !1 });
          }
        }
      }
      A.value = !0, E(!1);
    }
    return ve(() => n.listData.length, pe, { immediate: !0 }), e({
      scrollToTop: jt,
      scrollToItem: $t,
      scrollToBottom: _t,
      isTopArrived: b,
      isBottomArrived: j
    }), (a, i) => (ct(), st("div", {
      ref_key: "containerRef",
      ref: o,
      style: { position: "relative", height: "100%", overflow: "auto" },
      onScroll: i[0] || (i[0] = //@ts-ignore
      (...u) => xt(Tt) && xt(Tt)(...u))
    }, [
      ut("div", {
        style: At({ height: `${L.value}px` })
      }, null, 4),
      ut("div", {
        style: At({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: `translateY(${I.value}px)`
        })
      }, [
        (ct(!0), st(me, null, ye(X.value, (u) => (ct(), st("div", {
          id: u[a.keyField],
          key: u[a.keyField],
          ref_for: !0,
          ref_key: "itemRefs",
          ref: m,
          style: { width: "100%" }
        }, [
          ut("div", lo, [
            Te(a.$slots, "default", {
              item: u,
              index: u.index
            })
          ])
        ], 8, uo))), 128))
      ], 4)
    ], 544));
  }
});
export {
  po as default
};
