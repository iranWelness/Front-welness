"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFontSize = exports.setResType = exports.showNav = exports.hideNav = exports.setQuiz = exports.setDimension = exports.remid = exports.setid = exports.logout = exports.login = void 0;

var login = function login(user) {
  return {
    type: 'LOGIN',
    user: user
  };
};

exports.login = login;

var logout = function logout(user) {
  return {
    type: 'LOGOUT',
    user: user
  };
};

exports.logout = logout;

var setid = function setid(user) {
  return {
    type: 'SETID',
    user: user
  };
};

exports.setid = setid;

var remid = function remid(user) {
  return {
    type: 'REMID',
    user: user
  };
};

exports.remid = remid;

var setDimension = function setDimension(dimension) {
  return {
    type: 'SET_DIMENSION',
    dimension: dimension
  };
};

exports.setDimension = setDimension;

var setQuiz = function setQuiz(quiz) {
  return {
    type: 'SET_QUIZ',
    quiz: quiz
  };
};

exports.setQuiz = setQuiz;

var hideNav = function hideNav(nav) {
  return {
    type: 'HIDE_NAV',
    nav: nav
  };
};

exports.hideNav = hideNav;

var showNav = function showNav(nav) {
  return {
    type: 'SHOW_NAV',
    nav: nav
  };
};

exports.showNav = showNav;

var setResType = function setResType(resType) {
  return {
    type: 'SET_RESTYPE',
    resType: resType
  };
};

exports.setResType = setResType;

var setFontSize = function setFontSize(fontSize) {
  return {
    type: 'SET_FONT_SIZE',
    fontSize: fontSize
  };
};

exports.setFontSize = setFontSize;