"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var defaultOptions = {
  hideBeforeLoaded: true,
  onUpdate: function onUpdate(e) {}
};
var Status = /*#__PURE__*/function (Status) {
  Status[Status["unload"] = 0] = "unload";
  Status[Status["loading"] = 1] = "loading";
  Status[Status["loaded"] = 2] = "loaded";
  return Status;
}(Status || {});
var ImagePreloader = /*#__PURE__*/function () {
  /**
   * add event by dom background
   * @param {HTMLElement} target
   * @param {object} options
   * @returns Promise
   */
  function ImagePreloader() {
    (0, _classCallCheck2["default"])(this, ImagePreloader);
    (0, _defineProperty2["default"])(this, "index", void 0);
    (0, _defineProperty2["default"])(this, "result", void 0);
    this.index = 0;
    this.result = [];
  }
  (0, _createClass2["default"])(ImagePreloader, [{
    key: "load",
    value: function load(target) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
      var opt = _objectSpread(_objectSpread({}, defaultOptions), options);
      var onUpdate = opt.onUpdate,
        hideBeforeLoaded = opt.hideBeforeLoaded;
      var display = this.getStyle(target, 'display') === 'flex' ? 'flex' : 'block';
      if (hideBeforeLoaded) target.style.display = 'none';
      var node = Array.from(target.querySelectorAll('*'));
      var elements = [target].concat(node);
      elements.forEach(function (e, index) {
        var tag = e.tagName;
        var src = e.getAttribute('src');
        var backgroundImage = _this.getStyle(e, 'background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
        var maskImage = _this.getStyle(e, '-webkit-mask-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
        var status = Status.unload;
        if (tag === 'IMG' && src) {
          _this.result.push({
            url: src,
            index: index,
            status: status
          });
          return true;
        } else if (tag === 'DIV' && backgroundImage !== 'none' && backgroundImage.indexOf('http') >= 0) {
          _this.result.push({
            url: backgroundImage,
            index: index,
            status: status
          });
          return true;
        } else if (tag === 'DIV' && maskImage !== 'none') {
          _this.result.push({
            url: maskImage,
            index: index,
            status: status
          });
        }
        return false;
      });
      var loadImage = function loadImage(_ref) {
        var _ref$resolve = _ref.resolve,
          resolve = _ref$resolve === void 0 ? function (res) {
            return console.log(res);
          } : _ref$resolve,
          _ref$reject = _ref.reject,
          reject = _ref$reject === void 0 ? function (res) {
            return console.log(res);
          } : _ref$reject;
        if (_this.result.length === 0) {
          if (hideBeforeLoaded) target.style.display = display;
          resolve({
            total: 0,
            loaded: 0
          });
          return;
        }
        var data = _this.result[_this.index];
        var total = _this.result.length;
        var url = data.url,
          index = data.index;
        data.status = Status.loading;
        var image = new Image();
        image.onload = function () {
          data.status = Status.loaded;
          var loaded = _this.result.filter(function (e) {
            return e.status === Status.loaded;
          }).length;
          if (total === loaded) {
            if (hideBeforeLoaded) target.style.display = display;
            requestAnimationFrame(function () {
              return resolve({
                url: url,
                total: total,
                loaded: loaded,
                index: index
              });
            });
          } else {
            onUpdate({
              url: url,
              total: total,
              loaded: loaded,
              index: index
            });
            _this.index++;
            loadImage({
              resolve: resolve,
              reject: reject
            });
          }
        };
        image.src = url;
      };
      return new Promise(function (resolve, reject) {
        loadImage({
          resolve: resolve,
          reject: reject
        });
      });
    }
  }, {
    key: "getStyle",
    value: function getStyle(el, styleProp) {
      var value;
      var defaultView = el.ownerDocument.defaultView;
      if (defaultView && defaultView.getComputedStyle) {
        styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
        return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
      } else if (el['currentStyle']) {
        styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
          return letter.toUpperCase();
        });
        value = el['currentStyle'][styleProp];
        return value;
      }
      return '';
    }
  }]);
  return ImagePreloader;
}();
exports["default"] = ImagePreloader;