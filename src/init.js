var TIME_TO_REFRESH = 5;
// in seconds
var TIME_TO_CALL_REMHIST = 86400// in Seconds
TIME_TO_CALL_REMHIST *= 1000;
//convert to miliseconds
TIME_TO_REFRESH *= 1000;
//convert to miliseconds


chrome.browserAction.setBadgeBackgroundColor({
	        color : [0, 200, 0, 100]
});


function init() {
	var last_init_time = localStorage.getItem("last_init_time");
	var curTime = (new Date().getTime());
	if (last_init_time == null) {
		remHist();
		localStorage.setItem("last_init_time", curTime.toString());
	} else if (curTime - parseInt(last_init_time) >= TIME_TO_CALL_REMHIST) {
		remHist();
		localStorage.setItem("last_init_time", curTime.toString());
	}
	setTimeout(init, TIME_TO_CALL_REMHIST);
};
init();
var iframe = document.getElementById('theFrame');

function loop() {
	//Runs Loop every TIME_TO_REFRESH Milliseconds
	// Main Fetching Loop goes here.
	website_list = JSON.parse(localStorage.getItem("websites"));
	for (var i in website_list) {
		iframe.contentWindow.postMessage({
			'command' : 'execute',
			'codestr' : website_list[i].code,
			'site' : website_list[i].site
		}, '*');
	}
	notification_count = localStorage.getItem("notification_count");
	if(!notification_count)
		notification_count = 0;
	notification_count = String(notification_count);
	chrome.browserAction.setBadgeText({
		text: notification_count
	});
	setTimeout(loop, TIME_TO_REFRESH);
}

window.addEventListener('message', function(event) {
	l = event.data;
	if (l.type == "notifications") {
		l = l.payload;
		for (var i in l) {
			ob = l[i];
			if (ob.uid == "" || ob.uid == undefined) {
				ob.uid = ob.summary;
			}
			if (addHist(ob.uid, ob.site)) {
				addNotif(ob);
			}
		}
	} else if (l.type == 'fetchGET') {
		url = l.payload;
		rid = l.rid;
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				val = xhr.responseText;
				event.source.postMessage({
					"command" : "response",
					"rid" : rid,
					"payload" : val
				}, '*');
			}
		}
		xhr.open("GET", url, true);
		xhr.send();
	}
});

setTimeout(loop, 1 * 1000);
// wait 2 seconds to settle down before running
