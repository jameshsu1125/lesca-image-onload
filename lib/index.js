//#region src/type.ts
var e = /* @__PURE__ */ function(e) {
	return e[e.unload = 0] = "unload", e[e.loading = 1] = "loading", e[e.loaded = 2] = "loaded", e;
}({}), t = {
	hideBeforeLoaded: !0,
	onUpdate: (e) => {},
	onStart: (e) => {}
}, n = class {
	index;
	result;
	constructor() {
		this.index = 0, this.result = [];
	}
	load(n, r = t) {
		if (!n) return new Promise((e) => {
			e({
				total: 0,
				loaded: 0
			});
		});
		let { onUpdate: i, onStart: a, hideBeforeLoaded: o } = {
			...t,
			...r
		}, s = this.getStyle(n, "display") === "flex" ? "flex" : "block";
		o && (n.style.display = "none"), [n, ...Array.from(n.querySelectorAll("*"))].forEach((t, n) => {
			let r = t.tagName, i = t.getAttribute("src"), a = this.getStyle(t, "background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), o = this.getStyle(t, "-webkit-mask-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), s = window.getComputedStyle(t, "::before").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), c = window.getComputedStyle(t, "::after").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), l = e.unload;
			r === "IMG" && i && this.result.push({
				url: i,
				index: n,
				status: l
			}), r === "DIV" && a !== "none" && (a.includes("gradient") || this.result.push({
				url: a,
				index: n,
				status: l
			})), r === "DIV" && o !== "none" && this.result.push({
				url: o,
				index: n,
				status: l
			}), r === "DIV" && s !== "none" && (s.includes("gradient") || this.result.push({
				url: s,
				index: n,
				status: l
			})), r === "DIV" && c !== "none" && (c.includes("gradient") || this.result.push({
				url: c,
				index: n,
				status: l
			}));
		}), a({
			total: this.result.length,
			loaded: 0,
			urls: this.result.map((e) => e.url)
		});
		let c = ({ resolve: t = (e) => console.log(e), reject: r = (e) => console.log(e) }) => {
			if (this.result.length === 0) {
				o && (n.style.display = s), t({
					total: 0,
					loaded: 0
				});
				return;
			}
			let a = this.result[this.index], l = this.result.length, { url: u, index: d } = a;
			a.status = e.loading;
			let f = new Image();
			f.onload = () => {
				a.status = e.loaded;
				let f = this.result.filter((t) => t.status === e.loaded).length;
				l === f ? (o && (n.style.display = s), requestAnimationFrame(() => t({
					url: u,
					total: l,
					loaded: f,
					index: d
				}))) : (i({
					url: u,
					total: l,
					loaded: f,
					index: d
				}), this.index++, c({
					resolve: t,
					reject: r
				}));
			}, f.src = u;
		};
		return new Promise((e, t) => {
			c({
				resolve: e,
				reject: t
			});
		});
	}
	getStyle(e, t) {
		let n, r = e.ownerDocument.defaultView;
		return r && r.getComputedStyle ? (t = t.replace(/([A-Z])/g, "-$1").toLowerCase(), r.getComputedStyle(e, null).getPropertyValue(t)) : e.currentStyle ? (t = t.replace(/\-(\w)/g, function(e, t) {
			return t.toUpperCase();
		}), n = e.currentStyle[t], n) : "";
	}
};
//#endregion
export { n as default };
