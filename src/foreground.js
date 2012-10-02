// Foreground helper functions this script will be loaded after jquery before popup.js
function remNotif(uid, site) {
	var new_notifications = localStorage.getItem('new_notifications');
	if (new_notifications == null)
		return;
	new_notifications = JSON.parse(new_notifications);
	for ( i = 0; i < new_notifications.length; i++) {
		if (new_notifications[i]["uid"] == uid && new_notifications[i]["site"] == site) {
			new_notifications.splice(i, 1);
			break;
		}
	}
	localStorage.setItem('new_notifications', JSON.stringify(new_notifications));
}

function remAll(site) {
	var new_notifications = localStorage.getItem('new_notifications');
	if (new_notifications == null)
	new_notifications = JSON.parse(new_notifications);
	for ( i = 0; i < new_notifications.length; i++) {
		if (new_notifications[i]["site"] == site) {
			new_notifications.splice(i, 1);
			break;
		}
	}
	localStorage.setItem('new_notifications', JSON.stringify(new_notifications));
}

//remNotif("12341234","courses");
//remAll("facebook");
