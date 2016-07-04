/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _auto = __webpack_require__(1);

	var _auto2 = _interopRequireDefault(_auto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _auto2.default)(window, document, function () {

		//Start
		UI.start();

		//index.php
		UI.use(/^http:\/\/59.73.145.22[:\d]+(\/index.php||\/)$/, function (url, res) {
			UI.log('2s跳转到登录页面...');
			UI.work({
				2000: function _() {
					UI.link('http://59.73.145.22:10080/admin/status.php?action=login&url=../view.php?id=1');
				}
			});
		});

		//admin/status.php
		UI.use(/^http:\/\/59.73.145.22[:\d]+\/admin\/status.php/, function (url, res) {
			UI.log('登录并跳转到题目详情...');
			UI.work({
				2000: function _() {
					UI.log('2s后输入帐号，如果登录成功则直接跳转到详情页...');
				},
				4000: function _() {
					UI('input')[0].value = 'root';
					UI('input')[1].value = 'sksks';
					UI.log('2s后提交登录...');
				},
				6000: function _() {
					UI('input')[2].do('click');
				}
			});
		});

		//view.php
		UI.use(/^http:\/\/59.73.145.22[:\d]+\/view.php\?id=1$/, function (url, res) {
			UI.log('2s后跳转到提交页...');
			UI.work({
				2000: function _() {
					UI('a')[4].do('click');
				}
			});
		});

		//submit.php
		UI.use(/^http:\/\/59.73.145.22[:\d]+\/submit.php\?id=1$/, function (url, res) {
			UI.log('2s后输入代码选择语言...');
			UI.work({
				2000: function _() {
					UI('select')[0].value = '2';
					UI('input')[1].do('click');
					UI('textarea')[0].value = '\n#include <iostream>\nusing namespace std;\nint main()\n{\n    int a,b;\n    cin >> a >> b;\n    cout << a+b << endl;\n    return 0;\n}\n';
					UI('input')[1].do('click');
					UI.log('2s后提交代码...');
				},
				4000: function _() {
					UI('input')[0].do('click');
				}
			});
		});

		//result.php
		UI.use(/^http:\/\/59.73.145.22[:\d]+\/result.php/, function (url, res) {
			UI.log('提交结果页，结果自动刷新...');
		});
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (window, document, main, undefined) {
		if (!window.UI) {
			var UI;
			var CAN;
			var old;

			(function () {
				var init = function init() {
					setTimeout(main, 0);
				};

				console.log('Test initial ...');
				Object.prototype.do = function (action) {
					if (this[action]) this[action]();
				};

				UI = function UI(selector) {
					return new function () {
						var target = document.querySelectorAll(selector);
						for (var i = 0; i < target.length; ++i) {
							this[i] = target[i];
						}this.do = function (action) {
							target.forEach(function (item) {
								if (item[action]) item[action]();
							});
						};
						this.length = target.length;
					}();
				};

				window.UI = UI;
				['log', 'table'].forEach(function (item) {
					UI[item] = function () {
						console[item].apply(console, arguments);
					};
				});
				CAN = false;

				UI.start = function () {
					CAN = true;
				};
				UI.link = function (url) {
					return location.href = url;
				};
				UI.use = function (reg, func) {
					if (CAN) {
						var arr = reg.exec(location.href);
						if (arr) func(location.href, arr);
					}
				};
				UI.work = function (arr) {
					for (var i in arr) {
						if (Number.isInteger(parseInt(i)) && !Number.isNaN(parseInt(i))) setTimeout(arr[i], i);
					}
				};

				if (typeof window.onload == 'function') {
					old = window.onload;

					window.onload = function () {
						old();
						init();
					};
				} else {
					window.onload = init;
				}
			})();
		}
	};

/***/ }
/******/ ]);