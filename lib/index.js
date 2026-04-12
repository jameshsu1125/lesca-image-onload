var f = /* @__PURE__ */ ((o) => (o[o.unload = 0] = "unload", o[o.loading = 1] = "loading", o[o.loaded = 2] = "loaded", o))(f || {});
const b = {
  hideBeforeLoaded: !0,
  onUpdate: (o) => {
  },
  onStart: (o) => {
  }
};
class C {
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
  load(l, n = b) {
    if (!l)
      return new Promise((e) => {
        e({ total: 0, loaded: 0 });
      });
    const h = { ...b, ...n }, { onUpdate: u, onStart: y, hideBeforeLoaded: d } = h, w = this.getStyle(l, "display") === "flex" ? "flex" : "block";
    d && (l.style.display = "none");
    var k = Array.from(l.querySelectorAll("*"));
    [l, ...k].forEach((e, r) => {
      const t = e.tagName, i = e.getAttribute("src"), s = this.getStyle(e, "background-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), c = this.getStyle(e, "-webkit-mask-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), a = window.getComputedStyle(e, "::before").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), p = window.getComputedStyle(e, "::after").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), g = f.unload;
      t === "IMG" && i && this.result.push({ url: i, index: r, status: g }), t === "DIV" && s !== "none" && (s.includes("gradient") || this.result.push({ url: s, index: r, status: g })), t === "DIV" && c !== "none" && this.result.push({ url: c, index: r, status: g }), t === "DIV" && a !== "none" && (a.includes("gradient") || this.result.push({ url: a, index: r, status: g })), t === "DIV" && p !== "none" && (p.includes("gradient") || this.result.push({ url: p, index: r, status: g }));
    }), y({ total: this.result.length, loaded: 0, urls: this.result.map((e) => e.url) });
    const I = ({
      resolve: e = (t) => console.log(t),
      reject: r = (t) => console.log(t)
    }) => {
      if (this.result.length === 0) {
        d && (l.style.display = w), e({ total: 0, loaded: 0 });
        return;
      }
      const t = this.result[this.index], i = this.result.length, { url: s, index: c } = t;
      t.status = f.loading;
      const m = new Image();
      m.onload = () => {
        t.status = f.loaded;
        const a = this.result.filter((S) => S.status === f.loaded).length;
        i === a ? (d && (l.style.display = w), requestAnimationFrame(() => e({ url: s, total: i, loaded: a, index: c }))) : (u({ url: s, total: i, loaded: a, index: c }), this.index++, I({ resolve: e, reject: r }));
      }, m.src = s;
    };
    return new Promise((e, r) => {
      I({ resolve: e, reject: r });
    });
  }
  getStyle(l, n) {
    let h;
    const u = l.ownerDocument.defaultView;
    return u && u.getComputedStyle ? (n = n.replace(/([A-Z])/g, "-$1").toLowerCase(), u.getComputedStyle(l, null).getPropertyValue(n)) : l.currentStyle ? (n = n.replace(/\-(\w)/g, function(y, d) {
      return d.toUpperCase();
    }), h = l.currentStyle[n], h) : "";
  }
}
export {
  C as default
};
