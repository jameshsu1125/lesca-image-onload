"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var defaultOptions = {
  hideBeforeLoaded: true,
  onUpdate: function onUpdate(e) {}
};
var ImagePreloader = /*#__PURE__*/(0, _createClass2["default"])(
/**
 * add event by dom background
 * @param {DOM} target
 * @param {object} options
 * @returns Promise
 */
function ImagePreloader(target) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
  (0, _classCallCheck2["default"])(this, ImagePreloader);

  var opt = _objectSpread(_objectSpread({}, defaultOptions), options);

  this.target = target;
  this.index = 0;
  var onUpdate = opt.onUpdate,
      hideBeforeLoaded = opt.hideBeforeLoaded;
  if (hideBeforeLoaded) this.target.style.opacity = 0;
  var elements = [this.target].concat((0, _toConsumableArray2["default"])(this.target.querySelectorAll('*')));
  this.result = [];
  this.urls = elements.filter(function (e, index) {
    var tag = e.tagName;
    var src = e.getAttribute('src');
    var backgroundImage = (e.currentStyle || window.getComputedStyle(e, false))['background-image'].replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    var maskImage = (e.currentStyle || window.getComputedStyle(e, false))['-webkit-mask-image'].replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    var status = 'unload';

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
    var resolve = _ref.resolve,
        reject = _ref.reject;
    var data = _this.result[_this.index];
    var total = _this.result.length;
    var url = data.url,
        index = data.index;
    data.status = 'loading';
    var image = new Image();

    image.onload = function () {
      data.status = 'loaded';

      var loaded = _this.result.filter(function (e) {
        return e.status === 'loaded';
      }).length;

      if (total === loaded) {
        if (hideBeforeLoaded) _this.target.style.opacity = 1;
        resolve({
          url: url,
          total: total,
          loaded: loaded,
          index: index
        });
      } else {
        onUpdate({
          url: url,
          loaded: loaded,
          total: total,
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
});
exports["default"] = ImagePreloader;