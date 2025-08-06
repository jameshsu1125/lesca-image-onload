var c = /* @__PURE__ */ ((n) => (n[n.unload = 0] = "unload", n[n.loading = 1] = "loading", n[n.loaded = 2] = "loaded", n))(c || {});
const y = {
  hideBeforeLoaded: !0,
  onUpdate: (n) => {
  }
};
class x {
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
  load(e, s = y) {
    if (!e)
      return new Promise((t) => {
        t({ total: 0, loaded: 0 });
      });
    const g = { ...y, ...s }, { onUpdate: u, hideBeforeLoaded: f } = g, h = this.getStyle(e, "display") === "flex" ? "flex" : "block";
    f && (e.style.display = "none");
    var w = Array.from(e.querySelectorAll("*"));
    [e, ...w].forEach((t, o) => {
      const l = t.tagName, a = t.getAttribute("src"), r = this.getStyle(t, "background-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), d = this.getStyle(t, "-webkit-mask-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), i = c.unload;
      return l === "IMG" && a ? (this.result.push({ url: a, index: o, status: i }), !0) : l === "DIV" && r !== "none" ? (r.includes("gradient") || this.result.push({ url: r, index: o, status: i }), !0) : (l === "DIV" && d !== "none" && this.result.push({ url: d, index: o, status: i }), !1);
    });
    const p = ({
      resolve: t = (l) => console.log(l),
      reject: o = (l) => console.log(l)
    }) => {
      if (this.result.length === 0) {
        f && (e.style.display = h), t({ total: 0, loaded: 0 });
        return;
      }
      const l = this.result[this.index], a = this.result.length, { url: r, index: d } = l;
      l.status = c.loading;
      const i = new Image();
      i.onload = () => {
        l.status = c.loaded;
        const m = this.result.filter((I) => I.status === c.loaded).length;
        a === m ? (f && (e.style.display = h), requestAnimationFrame(() => t({ url: r, total: a, loaded: m, index: d }))) : (u({ url: r, total: a, loaded: m, index: d }), this.index++, p({ resolve: t, reject: o }));
      }, i.src = r;
    };
    return new Promise((t, o) => {
      p({ resolve: t, reject: o });
    });
  }
  getStyle(e, s) {
    let g;
    const u = e.ownerDocument.defaultView;
    return u && u.getComputedStyle ? (s = s.replace(/([A-Z])/g, "-$1").toLowerCase(), u.getComputedStyle(e, null).getPropertyValue(s)) : e.currentStyle ? (s = s.replace(/\-(\w)/g, function(f, h) {
      return h.toUpperCase();
    }), g = e.currentStyle[s], g) : "";
  }
}
export {
  x as default
};
