var g = /* @__PURE__ */ ((o) => (o[o.unload = 0] = "unload", o[o.loading = 1] = "loading", o[o.loaded = 2] = "loaded", o))(g || {});
const b = {
  hideBeforeLoaded: !0,
  onUpdate: (o) => {
  }
};
class V {
  index;
  result;
  /**
   * add event by dom background
   * @param {HTMLElement} target
   * @param {Options} options
   * @returns Promise
   */
  constructor() {
    this.index = 0, this.result = [];
  }
  load(l, r = b) {
    if (!l)
      return new Promise((e) => {
        e({ total: 0, loaded: 0 });
      });
    const f = { ...b, ...r }, { onUpdate: u, hideBeforeLoaded: h } = f, m = this.getStyle(l, "display") === "flex" ? "flex" : "block";
    h && (l.style.display = "none");
    var k = Array.from(l.querySelectorAll("*"));
    [l, ...k].forEach((e, n) => {
      const t = e.tagName, i = e.getAttribute("src"), s = this.getStyle(e, "background-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), d = this.getStyle(e, "-webkit-mask-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), a = window.getComputedStyle(e, "::before").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), y = window.getComputedStyle(e, "::after").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), c = g.unload;
      t === "IMG" && i && this.result.push({ url: i, index: n, status: c }), t === "DIV" && s !== "none" && (s.includes("gradient") || this.result.push({ url: s, index: n, status: c })), t === "DIV" && d !== "none" && this.result.push({ url: d, index: n, status: c }), t === "DIV" && a !== "none" && (a.includes("gradient") || this.result.push({ url: a, index: n, status: c })), t === "DIV" && y !== "none" && (y.includes("gradient") || this.result.push({ url: y, index: n, status: c }));
    });
    const w = ({
      resolve: e = (t) => console.log(t),
      reject: n = (t) => console.log(t)
    }) => {
      if (this.result.length === 0) {
        h && (l.style.display = m), e({ total: 0, loaded: 0 });
        return;
      }
      const t = this.result[this.index], i = this.result.length, { url: s, index: d } = t;
      t.status = g.loading;
      const p = new Image();
      p.onload = () => {
        t.status = g.loaded;
        const a = this.result.filter((I) => I.status === g.loaded).length;
        i === a ? (h && (l.style.display = m), requestAnimationFrame(() => e({ url: s, total: i, loaded: a, index: d }))) : (u({ url: s, total: i, loaded: a, index: d }), this.index++, w({ resolve: e, reject: n }));
      }, p.src = s;
    };
    return new Promise((e, n) => {
      w({ resolve: e, reject: n });
    });
  }
  getStyle(l, r) {
    let f;
    const u = l.ownerDocument.defaultView;
    return u && u.getComputedStyle ? (r = r.replace(/([A-Z])/g, "-$1").toLowerCase(), u.getComputedStyle(l, null).getPropertyValue(r)) : l.currentStyle ? (r = r.replace(/\-(\w)/g, function(h, m) {
      return m.toUpperCase();
    }), f = l.currentStyle[r], f) : "";
  }
}
export {
  V as default
};
