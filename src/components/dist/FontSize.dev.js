"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var fontSize = function fontSize(size) {
  var fontSize;
  var newSize = localStorage.getItem('fontSize') ? localStorage.getItem('fontSize') : 1;

  if (newSize == 0) {
    fontSize = "".concat(size - 0.1, "em");
  } else if (newSize == 2) {
    console.log(size);
    fontSize = "".concat(size + 0.2, "em");
  } else {
    fontSize = "".concat(size, "em");
  }

  return fontSize;
};

var _default = fontSize;
exports["default"] = _default;