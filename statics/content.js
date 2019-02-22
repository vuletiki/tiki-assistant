/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content.js":
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.js\");\n/* harmony import */ var _content_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content.scss */ \"./src/content.scss\");\n/* harmony import */ var _content_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_content_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar SHOPEE = \"shopee\";\nvar LAZ = \"laz\";\nvar GOOGLE = \"google\";\nvar E_COMERCE_LIST = ['adayroi.com', 'lazada.com', 'shopee.vn', 'tiki.vn', 'thegioididong.com', 'sendo.vn'];\n\nvar getOrigin = function getOrigin() {\n  if (window.origin == \"https://shopee.vn\") {\n    return SHOPEE;\n  }\n\n  if (window.origin == \"https://www.lazada.vn\") {\n    return LAZ;\n  }\n\n  if (window.origin == \"https://www.google.com\") {\n    return GOOGLE;\n  }\n};\n\nvar App = {\n  lastKeyword: \"\",\n  timeoutSpa: false,\n  isDetailPage: function isDetailPage() {\n    // laz\n    if (getOrigin() == LAZ) {\n      return document.getElementsByTagName(\"body\")[0].getAttribute(\"data-spm\") == 'pdp';\n    } // shopee\n\n\n    if (getOrigin() == SHOPEE) {\n      return document.getElementsByClassName('page-product').length > 0;\n    }\n\n    return false;\n  },\n  getKeyword: function getKeyword() {\n    var pathname = decodeURIComponent(window.location.pathname);\n    var isShopeeCategoryPage = pathname.split(\"-cat.\").length > 1 ? pathname.split(\"-cat.\")[0] : false;\n    var body = document.getElementsByTagName(\"body\")[0];\n    var keyword = null; // lazada\n\n    if (getOrigin() == LAZ) {\n      if (body.getAttribute(\"data-spm\") && body.getAttribute(\"data-spm\").indexOf(\"searchlist\") !== -1) {\n        // first get from q\n        keyword = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getParameterByName\"])(\"q\", window.location.href); // override if null with path\n\n        keyword = !keyword ? pathname.replace(/(-|\\/)+?/g, \" \") : keyword;\n      }\n\n      if (this.isDetailPage() && document.getElementsByClassName('pdp-product-title').length > 0) {\n        keyword = document.getElementsByClassName('pdp-product-title')[0].innerText;\n      }\n    } // shopee\n\n\n    if (getOrigin() == SHOPEE) {\n      if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getParameterByName\"])(\"keyword\", window.location.href) !== null) {\n        keyword = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getParameterByName\"])(\"keyword\", window.location.href);\n      } else if (isShopeeCategoryPage) {\n        keyword = isShopeeCategoryPage.replace(/(-|\\/)+?/g, \" \");\n      } else if (this.isDetailPage()) {\n        // get from url\n        var path = decodeURIComponent(window.location.pathname);\n        path = path.substr(1, path.length - 1);\n        var paths = path.split('-');\n        paths = paths.splice(0, paths.length - 1).filter(function (item) {\n          return item !== '';\n        });\n\n        if (paths.length > 0) {\n          keyword = paths.join(' ');\n        }\n      }\n    } // shopee\n\n\n    if (getOrigin() == GOOGLE) {\n      if (document.getElementById('fprsl')) {\n        keyword = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getParameterByName\"])('q', document.getElementById('fprsl').href);\n      } else if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getParameterByName\"])(\"q\", window.location.href) !== null) {\n        keyword = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"getParameterByName\"])(\"q\", window.location.href);\n      }\n    }\n\n    return keyword;\n  },\n  detectEcomerceKeyword: function detectEcomerceKeyword() {\n    var isEcomerceKeyword = false;\n    var origin = getOrigin();\n\n    if (origin === GOOGLE) {\n      var documentText = document.getElementsByTagName('body')[0].innerText;\n      E_COMERCE_LIST.forEach(function (siteName) {\n        if (documentText.indexOf(siteName) != -1) {\n          isEcomerceKeyword = true;\n        }\n      });\n    } else {\n      isEcomerceKeyword = true;\n    }\n\n    return isEcomerceKeyword;\n  },\n  clearIframe: function clearIframe() {\n    // close iframe\n    var docClass = document.getElementsByTagName(\"html\")[0].className;\n    docClass = docClass.replace(\"tiki-ext\", \"\");\n    document.getElementsByTagName(\"html\")[0].className = docClass;\n    var extDoms = document.getElementsByClassName(\"tiki-ext-container\");\n\n    if (extDoms.length > 0) {\n      for (var i = 0; i < extDoms.length; i++) {\n        extDoms[i].outerHTML = \"\";\n      }\n    }\n  },\n  initIframe: function initIframe(keyword) {\n    var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n    // append root div\n    var div = document.createElement(\"div\");\n    div.className = \"tiki-ext-container\"; // console.log(document.getElementsByTagName('body')[0])\n\n    document.getElementsByTagName(\"body\")[0].append(div);\n    var extensionOrigin = \"chrome-extension://\" + chrome.runtime.id;\n\n    if (!location.ancestorOrigins.contains(extensionOrigin)) {\n      var iframe = document.createElement(\"iframe\"); // Must be declared at web_accessible_resources in manifest.json\n\n      iframe.src = chrome.runtime.getURL(\"frame.html?detail=\".concat(detail, \"&keyword=\").concat(keyword, \"&site=\").concat(getOrigin()));\n      iframe.width = \"100%\";\n      iframe.height = \"78px\";\n      iframe.id = 'tiki-ext-frame'; // Some styles for a fancy sidebar\n\n      iframe.style.cssText = \"z-index:9999;border:0;\";\n      div.appendChild(iframe);\n    }\n\n    window.addEventListener(\"message\", function (ev) {\n      /*\n      * For old version\n      */\n      if (ev.data == \"hasResult\") {\n        // add class to html\n        document.getElementsByTagName(\"html\")[0].className = \"tiki-ext\";\n      }\n\n      if (ev.data == \"closeIframe\") {\n        // add class to html\n        var docClass = document.getElementsByTagName(\"html\")[0].className;\n        docClass = docClass.replace(\"tiki-ext\", \"\");\n        document.getElementsByTagName(\"html\")[0].className = docClass;\n      }\n      /*\n      * For new version\n      */\n\n\n      try {\n        var jsonData = JSON.parse(ev.data);\n\n        switch (jsonData.action) {\n          case 'hasResult':\n            {\n              document.getElementsByTagName(\"html\")[0].className = \"tiki-ext\";\n            }\n            ;\n            break;\n\n          case 'closeIframe':\n            {\n              var _docClass = document.getElementsByTagName(\"html\")[0].className;\n              _docClass = _docClass.replace(\"tiki-ext\", \"\");\n              document.getElementsByTagName(\"html\")[0].className = _docClass;\n            }\n            ;\n            break;\n\n          case 'resize':\n            {\n              document.getElementById(\"tiki-ext-frame\").height = jsonData.height;\n            }\n            ;\n            break;\n\n          default:\n        }\n      } catch (e) {}\n    });\n  },\n  startTimeoutSpa: function startTimeoutSpa() {\n    clearTimeout(this.timeoutSpa);\n\n    var _this = this;\n\n    this.timeoutSpa = setTimeout(function () {\n      if (_this.getKeyword() != _this.lastKeyword) {\n        var isDetail = _this.isDetailPage();\n\n        _this.init(_this.getKeyword(), isDetail);\n      }\n\n      _this.startTimeoutSpa();\n    }, 1000);\n  },\n  init: function init(keyword, detail) {\n    this.lastKeyword = keyword;\n    this.clearIframe();\n\n    if (keyword) {\n      this.initIframe(keyword, detail);\n    }\n  },\n  start: function start() {\n    var keyword = this.getKeyword();\n    var isDetail = this.isDetailPage();\n    console.log({\n      keyword: keyword,\n      isDetail: isDetail\n    });\n    var isEcomerceKeyword = this.detectEcomerceKeyword(); // prevent spam on google search page\n\n    if (keyword && isEcomerceKeyword) {\n      this.init(keyword, isDetail);\n    }\n\n    if (getOrigin() == SHOPEE) {\n      // Support single page app\n      this.startTimeoutSpa();\n    }\n  }\n}; // timeout to make sure not effect to user page speed\n\nsetTimeout(function () {\n  App.start();\n}, 500);\n\n//# sourceURL=webpack:///./src/content.js?");

/***/ }),

/***/ "./src/content.scss":
/*!**************************!*\
  !*** ./src/content.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/content.scss?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: getParameterByName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getParameterByName\", function() { return getParameterByName; });\nvar getParameterByName = function getParameterByName(name, url) {\n  if (!url) url = window.location.href;\n  name = name.replace(/[\\[\\]]/g, \"\\\\$&\");\n  var regex = new RegExp(\"[?&]\" + name + \"(=([^&#]*)|&|#|$)\"),\n      results = regex.exec(url);\n  if (!results) return null;\n  if (!results[2]) return \"\";\n  return decodeURIComponent(results[2].replace(/\\+/g, \" \"));\n};\n\n//# sourceURL=webpack:///./src/utils/index.js?");

/***/ })

/******/ });