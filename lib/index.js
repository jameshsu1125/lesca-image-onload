var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaultOptions = {
        hideBeforeLoaded: true,
        onUpdate: function (e) { },
    };
    var Status;
    (function (Status) {
        Status[Status["unload"] = 0] = "unload";
        Status[Status["loading"] = 1] = "loading";
        Status[Status["loaded"] = 2] = "loaded";
    })(Status || (Status = {}));
    var ImagePreloader = /** @class */ (function () {
        /**
         * add event by dom background
         * @param {HTMLElement} target
         * @param {object} options
         * @returns Promise
         */
        function ImagePreloader() {
            this.index = 0;
            this.result = [];
        }
        ImagePreloader.prototype.load = function (target, options) {
            var _this = this;
            if (options === void 0) { options = defaultOptions; }
            var opt = __assign(__assign({}, defaultOptions), options);
            var onUpdate = opt.onUpdate, hideBeforeLoaded = opt.hideBeforeLoaded;
            var display = this.getStyle(target, 'display') === 'flex' ? 'flex' : 'block';
            if (hideBeforeLoaded)
                target.style.display = 'none';
            var node = Array.from(target.querySelectorAll('*'));
            var elements = __spreadArray([target], node, true);
            elements.forEach(function (e, index) {
                var tag = e.tagName;
                var src = e.getAttribute('src');
                var backgroundImage = _this.getStyle(e, 'background-image')
                    .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
                    .split(',')[0];
                var maskImage = _this.getStyle(e, '-webkit-mask-image')
                    .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
                    .split(',')[0];
                var status = Status.unload;
                if (tag === 'IMG' && src) {
                    _this.result.push({ url: src, index: index, status: status });
                    return true;
                }
                else if (tag === 'DIV' &&
                    backgroundImage !== 'none' &&
                    backgroundImage.indexOf('http') >= 0) {
                    _this.result.push({ url: backgroundImage, index: index, status: status });
                    return true;
                }
                else if (tag === 'DIV' && maskImage !== 'none') {
                    _this.result.push({ url: maskImage, index: index, status: status });
                }
                return false;
            });
            var loadImage = function (_a) {
                var _b = _a.resolve, resolve = _b === void 0 ? function (res) { return console.log(res); } : _b, _c = _a.reject, reject = _c === void 0 ? function (res) { return console.log(res); } : _c;
                if (_this.result.length === 0) {
                    resolve({ total: 0, loaded: 0 });
                    return;
                }
                var data = _this.result[_this.index];
                var total = _this.result.length;
                console.log(total);
                var url = data.url, index = data.index;
                data.status = Status.loading;
                var image = new Image();
                image.onload = function () {
                    data.status = Status.loaded;
                    var loaded = _this.result.filter(function (e) { return e.status === Status.loaded; }).length;
                    if (total === loaded) {
                        if (hideBeforeLoaded)
                            target.style.display = display;
                        requestAnimationFrame(function () { return resolve({ url: url, total: total, loaded: loaded, index: index }); });
                    }
                    else {
                        onUpdate({ url: url, total: total, loaded: loaded, index: index });
                        _this.index++;
                        loadImage({ resolve: resolve, reject: reject });
                    }
                };
                image.src = url;
            };
            return new Promise(function (resolve, reject) {
                loadImage({ resolve: resolve, reject: reject });
            });
        };
        ImagePreloader.prototype.getStyle = function (el, styleProp) {
            var value;
            var defaultView = el.ownerDocument.defaultView;
            if (defaultView && defaultView.getComputedStyle) {
                styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
                return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
            }
            else if (el['currentStyle']) {
                styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
                    return letter.toUpperCase();
                });
                value = el['currentStyle'][styleProp];
                return value;
            }
            return '';
        };
        return ImagePreloader;
    }());
    exports.default = ImagePreloader;
});
