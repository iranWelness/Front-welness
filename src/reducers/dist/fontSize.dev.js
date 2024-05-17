"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var fontSize = function fontSize() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_FONT_SIZE':
      return state = action.fontSize;

    default:
      return state;
  }
};

var _default = fontSize;
exports["default"] = _default;