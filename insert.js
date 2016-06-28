(function (window, document, main, undefined) {
	if (!window.UI)
	{
		console.log('Test initial ...');
		Object.prototype.do = function (action) {
			if (this[action])
				this[action]();
		};
		var UI = window.UI = function (selector) {
			return new (function () {
				var target = document.querySelectorAll(selector);
				for (var i=0;i<target.length;++i)
					this[i] = target[i];
				this.do = function (action) {
					target.forEach(function (item) {
						if(item[action])
							item[action]();
					});
				};
				this.length = target.length;
			})();
		};
		var CAN = false;
		UI.start = function () {
			CAN = true;
		};
		UI.use = function (reg, func) {
			if (CAN)
			{
				var arr = reg.exec(location.href);
				if (arr)
					func(location.href, arr);
			}
		};
		UI.work = function (arr) {
			for (var i in arr)
			{
				if (Number.isInteger(parseInt(i)) && !Number.isNaN(parseInt(i)))
					setTimeout(arr[i], i);
			}
		};
		function init()
		{
			setTimeout(main, 0);
		}
		if (typeof window.onload == 'function')
		{
			var old = window.onload;
			window.onload = function () {
				old();
				init();
			};
		} else {
			window.onload = init;
		}
	}
})(window, document, function () {

	//Start
	UI.start();

	//index.php
	UI.use(/^http:\/\/59.73.145.22[:\d]+(\/index.php||\/)$/, function (url, res) {
		UI.work({
			2000 : function () {
				UI('a')[6].do('click');
			}
		});
	});

	//view.php
	UI.use(/^http:\/\/59.73.145.22[:\d]+\/view.php\?id=1$/, function (url, res) {
		UI.work({
			2000 : function () {
				UI('a')[4].do('click');
			}
		});
	});

	//submit.php
	UI.use(/^http:\/\/59.73.145.22[:\d]+\/submit.php\?id=1$/, function (url, res) {
		UI.work({
			2000 : function () {
				UI('select')[0].value = '2';
				UI('input')[1].do('click');
				UI('textarea')[0].value = '\r\
					#include <iostream>\r\
					using namespace std;\r\
					int main()\r\
					{\r\
						int a,b;\r\
						cin >> a >> b;\r\
						cout << a+b << endl;\r\
						return 0;\r\
					}\r\
				';
			},
			4000 : function () {
				UI('input')[0].do('click');
			}
		});
	});

});
