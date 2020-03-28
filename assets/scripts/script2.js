// onLoaded.push(function() { CODE }); 
onLoaded.push(function() {
	var checkOneSto = document.getElementById("o-check-100"),
		hideOneSto = document.getElementById("o-hide-check-100"),
		checkOneVisim = document.getElementById("o-check-80"),
		hideOneVisim = document.getElementById("o-hide-check-80"),
		checkOneShist = document.getElementById("o-check-65"),
		hideOneShist = document.getElementById("o-hide-check-65"),
		checkOnePyat = document.getElementById("o-check-50"),
		hideOnePyat = document.getElementById("o-hide-check-50");

	checkOneSto.addEventListener('click', ()=> {
		var checkOneStoStauts = checkOneSto.checked;
		if (checkOneStoStauts == true) {
			hideOneSto.value = 100 + ' г/м2';
			hideOneSto.innerHTML = 100 + ' г/м2';
		} else {
			hideOneSto.value = '';
		}
	});
	checkOneVisim.addEventListener('click', ()=> {
		var checkOneVisimStauts = checkOneVisim.checked;
		if (checkOneVisimStauts == true) {
			hideOneVisim.value = 80 + ' г/м2';
			hideOneVisim.innerHTML = 80 + ' г/м2';
		} else {
			hideOneVisim.value = '';
		}
	});
	checkOneShist.addEventListener('click', ()=> {
		var checkOneShistStauts = checkOneShist.checked;
		if (checkOneShistStauts == true) {
			hideOneShist.value = 65 + ' г/м2';
			hideOneShist.innerHTML = 65 + ' г/м2';
		} else {
			hideOneShist.value = '';
		}
	});
	checkOnePyat.addEventListener('click', ()=> {
		var checkOnePyatStauts = checkOnePyat.checked;
		if (checkOnePyatStauts == true) {
			hideOnePyat.value = 50 + ' г/м2';
			hideOnePyat.innerHTML = 50 + ' г/м2';
		} else {
			hideOnePyat.value = '';
		}
	});
});
onLoaded.push(function() {
    hideOneSto.value = 100 + ' г/м2';
    hideOneSto.innerHTML = 100 + ' г/м2';
});



// Cooki done
/* onLoaded.push(function() {
	var cookiClose = document.querySelector('#p-use-cookie .accept');
	cookiClose.addEventListener('click', ()=> {
		localStorage.setItem('exit', 1);
	});
	var cookiStatus = localStorage.getItem('exit');
	
	if (cookiStatus == 1) {
	    document.getElementById("p-use-cookie").remove();
	};
}); */



// Done Popup
/* onLoaded.push(function() {
	var clickOrder = document.getElementById("get-oder-free"),
		clickMessage = document.getElementById("get-consulting"),
		popupOrderDone = document.getElementById("p-sendedletter-s"),
		popupMessageDone = document.getElementById("p-sended-s");

	clickOrder.addEventListener('wpcf7mailsent', function(event) {
		popupOrderDone.classList.add("active");
	}, false);

	clickMessage.addEventListener('wpcf7mailsent', function(event) {
		popupMessageDone.classList.add("active");
	}, false);
}); */
	


// Mask
function setCursorPosition(pos, elem) {
	elem.focus();
	if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
	else if (elem.createTextRange) {
		var range = elem.createTextRange();
		range.collapse(true);
		range.moveEnd("character", pos);
		range.moveStart("character", pos);
		range.select()
	}
}
function mask(event) {
	var matrix = "+38 (___) ___ __ __",
		i = 0,
		def = matrix.replace(/\D/g, ""),
		val = this.value.replace(/\D/g, "");
	if (def.length >= val.length) val = def;
	this.value = matrix.replace(/./g, function(a) {
		return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" 	: a
	});
	if (event.type == "blur") {
		if (this.value.length == 2) this.value = ""
	} else setCursorPosition(this.value.length, this)
};
onLoaded.push(function() {
	var input = document.querySelectorAll("input[type=tel]");
	for(var i = 0; i < input.length; i++) {
		input[i].addEventListener("input", mask, false);
		input[i].addEventListener("focus", mask, false);
		input[i].addEventListener("blur", mask, false);
	}
});
