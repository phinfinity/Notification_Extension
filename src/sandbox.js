var last_event;
callback_container = new Object();
callback_container.nextid = 1;
function getpage(url, callback) {
	rid = callback_container.nextid;
	callback_container.nextid++;
	callback_container	[rid] = callback;
	last_event.source.postMessage({
		"type" : "fetchGET",
		"payload" : url,
		"rid" : rid
	}, last_event.origin);

}

function sendresults(notification_array) {
	last_event.source.postMessage({
		"type" : "notifications",
		"payload" : notification_array
	}, last_event.origin);

}

window.addEventListener('message', function(event) {
	window.last_event = event; // force global. is it required?
	var command = event.data.command;
	switch(command) {
		case 'execute':
			eval(event.data.codestr);
			get_notifications(event.data.site,sendresults);
			break;
		case 'response':
			callback_container[event.data.rid](event.data.payload);
	}
});
