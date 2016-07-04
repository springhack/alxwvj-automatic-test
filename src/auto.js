export default (window, document, main, undefined) => {
	if (!window.UI)
	{
		console.log('Test initial ...');
		Object.prototype.do = function (action) {
			if (this[action])
				this[action]();
		};
		var UI = (selector) => {
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
        window.UI = UI;
        ['log', 'table'].forEach((item) => {
            UI[item] = function () {
                console[item].apply(console, arguments);
            };
        });
		var CAN = false;
		UI.start = () => {
			CAN = true;
		};
        UI.link = url => location.href = url;
		UI.use = (reg, func) => {
			if (CAN)
			{
				var arr = reg.exec(location.href);
				if (arr)
					func(location.href, arr);
			}
		};
		UI.work = (arr) => {
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
			window.onload = () => {
				old();
				init();
			};
		} else {
			window.onload = init;
		}
	}
};
