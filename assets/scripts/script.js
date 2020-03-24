var Info = {
	init: function() {
		this.vw = window.innerWidth;
		this.vh = window.innerHeight;
	},
}
document.addEventListener("DOMContentLoaded", function(event) {
	Info.init();
	initPreloader();
	setHeight(document.getElementsByClassName("dlist-elems"), "li");
	runTgSwtch(
		document.getElementsByClassName("tg-btn-faq"),
		document.getElementsByClassName("tg-el-faq")
	);
	runAccordion2(
		document.getElementsByClassName("accordion"),
		"accordion-btn", "accordion-hiding"
	);
	initPopup();
	initForm();
});

function initPreloader() {
	var imgs = document.getElementsByClassName("preload");
	imgs = Array.from(imgs);
	imgs.push(document.getElementsByTagName("video")[0]);
	var prepercentage = document.getElementById("preloader-percentage");
	var prebar = document.getElementById("preloader-progress");
	console.log(imgs)
	console.log(imgs[3].tagName)
	console.log(imgs[22].tagName)
	var percentage = 0;
	var length = imgs.length;
	var piece = 1 / length;
	var pieceper = new Array(length).fill(0);
	for (var j = 0; j < length; j++) {
		const i = j;
        var XHR = new XMLHttpRequest();
        XHR.open('GET', imgs[i].dataset.src, true);
        XHR.responseType = 'arraybuffer';
        XHR.onload = function(e) {
			var blob = new Blob([this.response]);
			if(imgs[i].tagName == "DIV") {
				imgs[i].style.backgroundImage = "url(" + window.URL.createObjectURL(blob) + ")";
			} else {
				imgs[i].src = window.URL.createObjectURL(blob);
				imgs[i].load();
				imgs[i].onloadeddata = function() {
					imgs[i].play();
				}
			}
			
        };
        XHR.onprogress = function(e) {
			// thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
			pieceper[i] = piece * parseInt(e.loaded / e.total);
			percentage = 0;
			for (var p = 0; p < pieceper.length; p++) {
				percentage += pieceper[p];
			}
			prepercentage.innerHTML = Math.ceil(percentage * 100) + "%"
			prebar.style.transform = "translateX(" + -(100 - percentage * 100) + "%)";
			console.log(percentage)
			if(percentage >= 0.999) {
				window.scrollTo({
					top: 0,
					behavior: "auto"
				})
				document.body.classList.remove("preloader")
			}
        };
        XHR.send();		
	}
}


function setHeight(parentClass, childsTag) {
	for (let j = 0; j < parentClass.length; j++) {
		var totalH = 0;
		var childs = parentClass[j].getElementsByTagName(childsTag);
		for (let i = 0; i < childs.length; i++) {
			totalH += childs[i].getBoundingClientRect().height;
		}
		parentClass[j].style.height = totalH + "px";
		
	}
}

function runTgSwtch(btns, childs) {
	var nowChild = 0;
	btns = Array.prototype.slice.call(btns);
	for (var i = 0; i < btns.length; i++) {
		btns[i].onclick = function() {
			var nowBtn = btns.indexOf(this);
			if (nowBtn != nowChild) {
				btns[nowChild].classList.remove("active");
				btns[nowBtn].classList.add("active");
				childs[nowChild].classList.remove("active");
				childs[nowBtn].classList.add("active");
				nowChild = nowBtn;
				closeAccordion2(document.getElementsByClassName("accordion"));
			}
		}
	}
}

function runAccordion2(parents, btnname, hiding) {
	for (var i = 0; i < parents.length; i++) {
		const parent = parents[i];
		var btn = parent.getElementsByClassName(btnname)[0];
		var hid = parent.getElementsByClassName(hiding)[0];
		var text = hid.getElementsByTagName("p")[0]
		hid.style.height = text.getBoundingClientRect().height + "px";
		btn.onclick = function() {
			this.parentNode.classList.toggle("hidden");
		}
	}
}

function closeAccordion2(parents) {
	for (var i = 0; i < parents.length; i++) {
		parents[i].classList.add("hidden")
	}
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
		center: coords[0],
		zoom: 17,
		disableDefaultUI: true,
		// scrollwheel: false,
	});
	var iconurl = false;
	if (Info.vw > 767) { iconurl = "./assets/img/pin.png" } else { iconurl = "./assets/img/pinMs.png" }
	var markers = []
	for (var i = 1; i < coords.length; i++) {
		markers.push (
			new google.maps.Marker({
				position: coords[i],
				map: map,
				icon: iconurl,
			}) 
		);
	}
}



var Popup = {
	eclipse: false,
	eclipse2: false,
	cookie: {
		elem: false,
		accept: false,
		close: false,
	}
}
function initPopup () {
	Popup.eclipse = document.getElementById("eclipse");
	Popup.eclipse2 = document.getElementById("eclipse2");
	var popmsg = document.getElementsByClassName("popmsg");
	var poptext = document.getElementsByClassName("poptext");
	var popups = document.getElementsByClassName("popup");
	Popup.eclipse.onclick = function() {
		for (var i = 0; i < popups.length; i++) {
			popups[i].parentNode.classList.remove("active");
		}
		document.body.classList.remove("eclipse");
	}
	Popup.eclipse2.onclick = function() {
		for (var i = 0; i < poptext.length; i++) {
			poptext[i].parentNode.classList.remove("active");
		}
		document.body.classList.remove("eclipse2");
	}

	for (var i = 0; i < popmsg.length; i++) {
		popmsg[i].getElementsByClassName("gohome")[0].onclick = function() {
			this.parentNode.parentNode.classList.remove("active");
			document.body.classList.remove("eclipse");
		}
	}
	for (var i = 0; i < poptext.length; i++) {
		poptext[i].getElementsByClassName("close")[0].onclick = function() {
			this.parentNode.parentNode.classList.remove("active");
			document.body.classList.remove("eclipse2");
		}
	}


	var ppd = document.getElementsByClassName("ppd");
	for (var i = 0; i < ppd.length; i++) {
		ppd[i].onclick = function() {
			document.body.classList.add("eclipse2");
			document.getElementById("p-privacy-s").classList.add("active");
		}
	}
	var pcd = document.getElementsByClassName("pcd");
	for (var i = 0; i < pcd.length; i++) {
		pcd[i].onclick = function() {
			document.body.classList.add("eclipse2");
			document.getElementById("p-cookie-s").classList.add("active");
		}
	}
	

	Popup.cookie.elem = document.getElementById("p-use-cookie");
	Popup.cookie.accept = Popup.cookie.elem.getElementsByClassName("accept")[0];
	Popup.cookie.close = Popup.cookie.elem.getElementsByClassName("close")[0];
	if (getCookie("cookieAccept") != "1") {
		Popup.cookie.elem.classList.add("active");
		Popup.cookie.accept.onclick = function() {
			setCookie("cookieAccept", "1", 60);
			Popup.cookie.elem.classList.remove("active");
		}
		Popup.cookie.close.onclick = function() {
			Popup.cookie.elem.classList.remove("active");
		}
	}
}

function openPopComplete() {
	document.body.classList.add("eclipse");
	document.getElementById("p-complete-s").classList.add("active");
}
function openPopSended() {
	document.body.classList.add("eclipse");
	document.getElementById("p-sended-s").classList.add("active");
}
function openPopSendedLetter() {
	document.body.classList.add("eclipse");
	document.getElementById("p-sended-letter-s").classList.add("active");
}
function openPPriceList() {
	document.body.classList.add("eclipse");
	document.getElementById("p-price-list-s").classList.add("active");
}
function openPOrderFree() {
	document.body.classList.add("eclipse");
	document.getElementById("p-order-free-s").classList.add("active");
}




function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	// d.setTime(d.getTime() + (exdays*24*60*60*1000));
	d.setTime(d.getTime() + (exdays*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



function initForm() {
	var forms = document.getElementsByTagName("form");
	for (var i = 0; i < forms.length; i++) {
		forms[i].onsubmit = function(e) {
			var elem = this.querySelector("input[name='tel']")
			if(!validPhone( elem.value )) {
				e.preventDefault();
				elem.parentNode.classList.add("invalid");
			} else {
				elem.parentNode.classList.remove("invalid");
			}
		}
	}
	var valsup = document.getElementsByClassName("validate-support")
	for (var i = 0; i < valsup.length; i++) {
		valsup[i].onclick = function() {
			this.parentNode.classList.remove("invalid");
		}
	}
}
function validPhone(phone) {
	var re = /^\d[\d\(\)\ -]{8}\d$/;
	var re2 = /^((\+380)+([0-9]){9})$/;
    return re.test(phone) || re2.test(phone);
}  