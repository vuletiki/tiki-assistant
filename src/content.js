import { getParameterByName } from './utils'
import './content.scss'

const SHOPEE = "shopee";
const LAZ = "laz";
const GOOGLE = "google";
const E_COMERCE_LIST = ['adayroi.com', 'lazada.com', 'shopee.vn', 'tiki.vn', 'thegioididong.com', 'sendo.vn'];


const getOrigin = function() {
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

const App = {
	lastKeyword: "",
	timeoutSpa: false,
	isDetailPage() {
		// laz
		if (getOrigin() == LAZ) {
			return  document.getElementsByTagName("body")[0].getAttribute("data-spm") == 'pdp'
		}

		// shopee
		if (getOrigin() == SHOPEE) {
			return document.getElementsByClassName('page-product').length > 0
		}

		return false
	},
	getKeyword() {
		let pathname = decodeURIComponent(window.location.pathname);

		let isShopeeCategoryPage =
			pathname.split("-cat.").length > 1 ? pathname.split("-cat.")[0] : false;

		let body = document.getElementsByTagName("body")[0];

		let keyword = null;

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

			if (this.isDetailPage() && document.getElementsByClassName('pdp-product-title').length > 0) {
				keyword = document.getElementsByClassName('pdp-product-title')[0].innerText
			}
		}

		// shopee
		if (getOrigin() == SHOPEE) {
			if (getParameterByName("keyword", window.location.href) !== null) {
				keyword = getParameterByName("keyword", window.location.href);
			} else if (isShopeeCategoryPage) {
				keyword = isShopeeCategoryPage.replace(/(-|\/)+?/g, " ");
			} else if(this.isDetailPage()) {
				// get from url
				let path = decodeURIComponent(window.location.pathname);
				path = path.substr(1, path.length -1)
				let paths = path.split('-')
				paths = paths.splice(0, paths.length - 1).filter(item => item !== '')
				if(paths.length > 0) {
					keyword = paths.join(' ')
				}
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
	detectEcomerceKeyword() {
		let isEcomerceKeyword = false;
		let origin = getOrigin();
		if(origin === GOOGLE) {
			let documentText = document.getElementsByTagName('body')[0].innerText;
			E_COMERCE_LIST.forEach(function(siteName) {
				if(documentText.indexOf(siteName) != -1) {
					isEcomerceKeyword = true;
				}
			})
		} else {
			isEcomerceKeyword = true;
		}
		return isEcomerceKeyword;
	},

	clearIframe() {
		// close iframe
		let docClass = document.getElementsByTagName("html")[0].className;
		docClass = docClass.replace("tiki-ext", "");
		document.getElementsByTagName("html")[0].className = docClass;

		let extDoms = document.getElementsByClassName("tiki-ext-container");
		if (extDoms.length > 0) {
			for (let i = 0; i < extDoms.length; i++) {
				extDoms[i].outerHTML = "";
			}
		}
	},
	initIframe(keyword, detail = false) {
		// append root div
		let div = document.createElement("div");
		div.className = "tiki-ext-container";
		// console.log(document.getElementsByTagName('body')[0])
		document.getElementsByTagName("body")[0].append(div);

		let extensionOrigin = "chrome-extension://" + chrome.runtime.id;

		if (!location.ancestorOrigins.contains(extensionOrigin)) {
			let iframe = document.createElement("iframe");
			// Must be declared at web_accessible_resources in manifest.json
			iframe.src = chrome.runtime.getURL(`frame.html?detail=${detail}&keyword=${keyword}&site=${getOrigin()}`);
			iframe.width = "100%"
			iframe.height = "78px"
			iframe.id = 'tiki-ext-frame'

			// Some styles for a fancy sidebar
			iframe.style.cssText = "z-index:9999;border:0;";


			div.appendChild(iframe);
		}

		window.addEventListener("message", function(ev) {
			/*
			* For old version
			*/
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

			/*
			* For new version
			*/

			try{
				var jsonData = JSON.parse(ev.data)
				switch(jsonData.action) {
					case 'hasResult': {
						document.getElementsByTagName("html")[0].className = "tiki-ext";
					};break;
					case 'closeIframe': {
						let docClass = document.getElementsByTagName("html")[0].className;
						docClass = docClass.replace("tiki-ext", "");
						document.getElementsByTagName("html")[0].className = docClass;
					};break;
					case 'resize': {
						document.getElementById("tiki-ext-frame").height = jsonData.height;
					};break;
					default:
				}
			}catch(e) {

			}
		});
	},

	startTimeoutSpa() {
		clearTimeout(this.timeoutSpa);
		let _this = this;
		this.timeoutSpa = setTimeout(function() {
			if (_this.getKeyword() != _this.lastKeyword) {
				let isDetail = _this.isDetailPage();
				_this.init(_this.getKeyword(), isDetail);
			}
			_this.startTimeoutSpa();
		}, 1000);
	},

	init(keyword, detail) {
		this.lastKeyword = keyword;
		this.clearIframe();
		if(keyword) {
			this.initIframe(keyword, detail);
		}
	},

	start() {
		let keyword = this.getKeyword();
		let isDetail = this.isDetailPage();
		console.log({
			keyword,
			isDetail
		})
		let isEcomerceKeyword = this.detectEcomerceKeyword(); // prevent spam on google search page
		if (keyword && isEcomerceKeyword) {
			this.init(keyword, isDetail);
		}

		if (getOrigin() == SHOPEE) {
			// Support single page app
			this.startTimeoutSpa();
		}
	},
};

// timeout to make sure not effect to user page speed
setTimeout(function() {
	App.start();
}, 500)
