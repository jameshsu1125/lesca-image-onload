//#region src/type.ts
var e = /* @__PURE__ */ function(e) {
	return e[e.unload = 0] = "unload", e[e.loading = 1] = "loading", e[e.loaded = 2] = "loaded", e;
}({}), t = {
	onUpdate: (e) => {
		Date.now() < 100 && console.log(e);
	},
	onStart: (e) => {
		Date.now() < 100 && console.log(e);
	}
}, n = class {
	index;
	result;
	target = null;
	hideBeforeLoaded = !0;
	constructor(e, t) {
		this.target = e, t !== void 0 && (this.hideBeforeLoaded = t), this.index = 0, this.result = [];
	}
	load(n = t) {
		if (!this.target) return new Promise((e) => {
			e({
				total: 0,
				loaded: 0
			});
		});
		let { onUpdate: r, onStart: i, hideBeforeLoaded: a } = {
			...t,
			...n
		}, o = this.getStyle(this.target, "display") === "flex" ? "flex" : "block";
		a && (this.target.style.display = "none");
		let s = Array.from(this.target.querySelectorAll("*"));
		[this.target, ...s].forEach((t, n) => {
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
		}), i({
			total: this.result.length,
			loaded: 0,
			urls: this.result.map((e) => e.url)
		});
		let c = ({ resolve: t = (e) => console.log(e), reject: n = (e) => console.log(e) }) => {
			if (this.result.length === 0) {
				this.hideBeforeLoaded && this.target && (this.target.style.display = o), t({
					total: 0,
					loaded: 0
				});
				return;
			}
			let i = this.result[this.index], a = this.result.length, { url: s, index: l } = i;
			i.status = e.loading;
			let u = new Image();
			u.onload = () => {
				i.status = e.loaded;
				let u = this.result.filter((t) => t.status === e.loaded).length;
				a === u ? (this.hideBeforeLoaded && this.target && (this.target.style.display = o), requestAnimationFrame(() => t({
					url: s,
					total: a,
					loaded: u,
					index: l
				}))) : (r({
					url: s,
					total: a,
					loaded: u,
					index: l
				}), this.index++, c({
					resolve: t,
					reject: n
				}));
			}, u.src = s;
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
