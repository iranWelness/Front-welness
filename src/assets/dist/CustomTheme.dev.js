"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styles = require("@material-ui/core/styles");

var _KalamehWebFaNumRegular = _interopRequireDefault(require("./fonts/WebFonts/_Woff2/KalamehWeb(FaNum)-Regular.woff2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var kalameFont = {
  fontFamily: "Kalame",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: "\n    local('Kalame'),\n    url(".concat(_KalamehWebFaNumRegular["default"], ")\n  "),
  unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF UTF-8"
};
var CustomTheme = (0, _styles.createMuiTheme)({
  typegraphy: {
    fontFamily: ["Kalame", "'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"].join(","),
    fontSize: "16px",
    fontWeightLight: "300",
    fontWeightRegular: "400",
    fontWeightMedium: "700"
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-family": [kalameFont]
      }
    }
  },
  direction: "rtl"
});
var _default = CustomTheme;
exports["default"] = _default;