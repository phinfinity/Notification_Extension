// Foreground helper functions this script will be loaded after jquery before popup.js
function setDismiss(uid, site) {
	uidkey = uid + "#" + site;
	histdb = JSON.parse(localStorage.getItem("old_uids"));
	if (histdb != null) {
		if (histdb.hasOwnProperty(uidkey)) {
			histdb[uidkey].dismissed = true;
			localStorage.setItem("old_uids", JSON.stringify(histdb));
		}
	}
}
function remNotif(uid, site) {
	var new_notifications = localStorage.getItem('new_notifications');
	if (new_notifications == null)
		new_notifications="[]";
	new_notifications = JSON.parse(new_notifications);
	for ( i = 0; i < new_notifications.length; i++) {
		if (new_notifications[i]["uid"] == uid && new_notifications[i]["site"] == site) {
			setDismiss(uid,site);
			new_notifications.splice(i, 1);
			break;
		}
	}
	localStorage.setItem('new_notifications', JSON.stringify(new_notifications));
}

function remAll(site) {
	var new_notifications = localStorage.getItem('new_notifications');
	if (new_notifications == null)
		new_notifications="[]";
	new_notifications = JSON.parse(new_notifications);
	for ( i = 0; i < new_notifications.length; i++) {
		if (new_notifications[i]["site"] == site || !site) {
			setDismiss(new_notifications[i].uid,new_notifications[i].site);;
			new_notifications.splice(i, 1);
			i--;
		}
	}
	localStorage.setItem('new_notifications', JSON.stringify(new_notifications));
}

//remNotif("12341234","courses");
//remAll("facebook");
function getNotif(site) {
	var new_notifications = JSON.parse(localStorage.getItem('new_notifications'));
	if(new_notifications==null)
		new_notifications=[]
	var notif_list=[]
	for ( i = 0; i < new_notifications.length ; i++ ) {
		if ( new_notifications[i]["site"] == site ) {
			notif_list.push(new_notifications[i]);
		}
	}
	return notif_list
}
function getNotif(){
	var new_notifications = JSON.parse(localStorage.getItem('new_notifications'));
	if(new_notifications==null)
		new_notifications=[]
	var notif_list=[]
	for ( i = 0; i < new_notifications.length ; i++ ) {
		notif_list.push(new_notifications[i]);
	}
	return notif_list
}


