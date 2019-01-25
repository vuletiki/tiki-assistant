function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var SHOPEE = "shopee";
var LAZ = "laz";
var GOOGLE = "google";
var getOrigin = function() {
	if (window.origin == "https://shopee.vn") {
		return SHOPEE;
	}
	if (window.origin == "https://www.lazada.vn") {
		return LAZ;
	}
	if (window.origin == "https://www.google.com") {
		return GOOGLE;
	}
};

var App = {
	lastKeyword: "",
	timeoutSpa: false,
	getKeyword() {
		var pathname = decodeURIComponent(window.location.pathname);

		var isShopeeCategoryPage =
			pathname.split("-cat.").length > 1 ? pathname.split("-cat.")[0] : false;

		var body = document.getElementsByTagName("body")[0];

		var keyword = null;

		// lazada
		if (getOrigin() == LAZ) {
			if (
				body.getAttribute("data-spm") &&
				body.getAttribute("data-spm").indexOf("searchlist") !== -1
			) {
				// first get from q
				keyword = getParameterByName("q", window.location.href);
				// override if null with path
				keyword = !keyword ? pathname.replace(/(-|\/)+?/g, " ") : keyword;
			}
		}

		// shopee
		if (getOrigin() == SHOPEE) {
			if (getParameterByName("keyword", window.location.href) !== null) {
				keyword = getParameterByName("keyword", window.location.href);
			} else if (isShopeeCategoryPage) {
				keyword = isShopeeCategoryPage.replace(/(-|\/)+?/g, " ");
			}
		}

		// shopee
		if (getOrigin() == GOOGLE) {
			if(document.getElementById('fprsl')) {
				keyword = getParameterByName('q', document.getElementById('fprsl').href)
			} else if(getParameterByName("q", window.location.href) !== null) {
				keyword = getParameterByName("q", window.location.href);
			}
		}
		return keyword;
	},
	start() {
		var keyword = this.getKeyword();
		if (keyword) {
			this.init(keyword);
		}

		if (getOrigin() == SHOPEE) {
			// for spa
			this.startTimeoutSpa();
		}
	},
	startTimeoutSpa() {
		clearTimeout(this.timeoutSpa);
		var _this = this;
		this.timeoutSpa = setTimeout(function() {
			if (_this.getKeyword() != _this.lastKeyword) {
				_this.init(_this.getKeyword());
			}
			_this.startTimeoutSpa();
		}, 1000);
	},
	init(keyword) {
		this.lastKeyword = keyword;
		this.clearIframe();
		if(keyword) {
			this.initIframe(keyword);
		}
	},
	clearIframe() {
		// close iframe
		let docClass = document.getElementsByTagName("html")[0].className;
		docClass = docClass.replace("tiki-ext", "");
		document.getElementsByTagName("html")[0].className = docClass;

		var extDoms = document.getElementsByClassName("tiki-ext-container");
		if (extDoms.length > 0) {
			for (var i = 0; i < extDoms.length; i++) {
				extDoms[i].outerHTML = "";
			}
		}
	},
	initIframe(keyword) {
		// append root div
		var div = document.createElement("div");
		div.className = "tiki-ext-container";
		// console.log(document.getElementsByTagName('body')[0])
		document.getElementsByTagName("body")[0].append(div);

		var extensionOrigin = "chrome-extension://" + chrome.runtime.id;
		if (!location.ancestorOrigins.contains(extensionOrigin)) {
			var iframe = document.createElement("iframe");
			// Must be declared at web_accessible_resources in manifest.json
			iframe.src = chrome.runtime.getURL("frame.html?keyword=" + keyword + "&site=" + getOrigin());
			iframe.width = "100%";
			iframe.height = "78px";

			// Some styles for a fancy sidebar
			iframe.style.cssText =
				"position:fixed;top:0;left:0;display:block;" + "z-index:9999;border:0;";
			div.appendChild(iframe);
		}

		window.addEventListener("message", function(ev) {
			if (ev.data == "hasResult") {
				// add class to html
				document.getElementsByTagName("html")[0].className = "tiki-ext";
			}
			if (ev.data == "closeIframe") {
				// add class to html
				let docClass = document.getElementsByTagName("html")[0].className;
				docClass = docClass.replace("tiki-ext", "");
				document.getElementsByTagName("html")[0].className = docClass;
			}
		});
	}
};

// timeout to make sure not effect to user page speed
setTimeout(function() {
	App.start();
}, 500)