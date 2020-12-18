// ==UserScript==
// @name         GNIB
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Poonam
// @match        https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {
window.audioElement = document.createElement('audio');
window.audioElement.setAttribute('src', 'http://www.soundjay.com/misc/sounds/bell-ringing-01.mp3');
function checkNotificationPromise() {
	try {
		Notification.requestPermission().then();
	} catch (e) {
		return false;
	}

	return true;
}

function askNotificationPermission() {
	// function to actually ask the permissions
	function handlePermission(permission) {
		// Whatever the user answers, we make sure Chrome stores the information
		if (!('permission' in Notification)) {
			Notification.permission = permission;
		}

		if (Notification.permission === 'denied' || Notification.permission === 'default') {} else {
			dataEntry();
			var CustomSetInterval = setInterval(() => {
				if ($("#dvAppOptions").find('button').length < 1) {
					if ($('#valErrDateSearch').is(':visible')) {
						new Notification('Error Occured ', {
							body: ' Error occured Reload your  webPage'
						});
						clearInterval(CustomSetInterval);
						location.reload();

					} else {
						getEarliestApps();
					}

				} else {
					console.log("Appointment Slot Found");
					const myNoti = new Notification('Appointment for GNIB', {
						body: ' Available Appointment for GNIB Found'
					});
                    window.audioElement.play();
					clearInterval(CustomSetInterval);
				}
			}, 5000);
		}
	}

	// Let's check if the browser supports notifications
	if (!('Notification' in window)) {
		console.log("This browser does not support notifications.");
	} else {
		if (checkNotificationPromise()) {
			Notification.requestPermission()
				.then((permission) => {
					handlePermission(permission);
				})
		} else {
			Notification.requestPermission(function (permission) {
				handlePermission(permission);
			});
		}
	}
}
function dataEntry(){
setTimeout(()=>{$('#Category').val("All").change()}, 10);
setTimeout(()=>{$('#SubCategory').val("All").change()}, 10);
setTimeout(()=>{$('#ConfirmGNIB').val("New").change()}, 10);
setTimeout(()=>{$('#UsrDeclaration').prop('checked', true).change()}, 10);
setTimeout(()=>{$('#GivenName').val("First")}, 10);
setTimeout(()=>{$('#SurName').val("Last")}, 10);
setTimeout(()=>{$('#DOB').val("01/01/1999").change() }, 10);
setTimeout(()=>{$('#Nationality').val("India, Republic of").change() }, 10);
setTimeout(()=>{$('#EmailConfirm').val("sample@gmail.com") }, 10);
setTimeout(()=>{$('#Email').val("sample@gmail.com")}, 10);
setTimeout(()=>{$('#FamAppYN').val("No").change() }, 10);
setTimeout(()=>{$('#PPNoYN').val("Yes").change() }, 10);
setTimeout(()=>{$('#PPNo').val("T0111111").change() }, 10);
setTimeout(()=>{allowLook4App() }, 1000);
setTimeout(()=>{$('#AppSelectChoice').val("S").change()}, 1000);
}
askNotificationPermission();
}, false);