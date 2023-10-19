"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Status = void 0;
var Status = exports.Status = /*#__PURE__*/function (Status) {
  Status[Status["unload"] = 0] = "unload";
  Status[Status["loading"] = 1] = "loading";
  Status[Status["loaded"] = 2] = "loaded";
  return Status;
}({});