"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _userId = _interopRequireDefault(require("./userId"));

var _dimension = _interopRequireDefault(require("./dimension"));

var _quiz = _interopRequireDefault(require("./quiz"));

var _nav = _interopRequireDefault(require("./nav"));

var _resType = _interopRequireDefault(require("./resType"));

var _redux = require("redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var allReducres = (0, _redux.combineReducers)({
  authentication: _auth["default"],
  userID: _userId["default"],
  dimension: _dimension["default"],
  quiz: _quiz["default"],
  nav: _nav["default"],
  resType: _resType["default"],
  fontSize: _resType["default"]
});
var _default = allReducres;
exports["default"] = _default;