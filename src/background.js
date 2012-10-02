// This script will run on startup and will have  timer-loop running forever
// Add background functions on top keep global constants on the very top of file

var MAX_HISTORY = 30; // Max number of days to retain history
var MAX_UNREAD_LIMIT = 20; // Max numb
var MAX_READ_LIMIT = 20; // Max numb

function sortfunc(a, b) {
	if (a["time"] == b["time"])
		return 0;
	if (parseInt(a["time"]) > parseInt(b["time"]))
		return -1;
	return 1;

}
function addNotif(notifObj){
	/* Adds the notification Object to both the  
	   new_notifications list and the old_notifications 
	   list*/
	curnew_notifs=JSON.parse(localStorage.getItem("new_notifications"));		//get string from localStorage
	if(curnew_notifs==null){
		curnew_notifs=[];
	}
	curnew_notifs.push(notifObj);
	curnew_notifs.sort(sortfunc);
	localStorage.setItem("notification_count", curnew_notifs.length);
	localStorage.setItem("new_notifications", JSON.stringify(curnew_notifs));
}
/*
function addNotif_test(){
	localStorage.clear();
	var obj1=JSON.parse("{\"uid\":\"UID1\",\"title\":\"Title1\",\"summary\":\"Summary1\",\"time\":\"123123123123\"}");
	var obj2=JSON.parse("{\"uid\":\"UID2\",\"title\":\"Title1\",\"summary\":\"Summary1\",\"time\":\"1\"}");
	addNotif(obj2);
	addNotif(obj1);
	console.log(localStorage.new_notifications)
}
*/

function addHist(uid, site) {
	/* This function attempts to add uid,site after joining them
	   It returns True on successful add, but returns false if
	   Already exists and doesn't add */
	uidkey = uid + "#" + site;
	histdb = JSON.parse(localStorage.getItem("old_uids"));
	if (histdb == null) {
		histdb = new Object();
	}
	if (histdb.hasOwnProperty(uidkey)) {
		return false;
	} else {
		var d = new Date();
		var t = d.getTime();
		histdb[uidkey] = {
			"time" : t,
			"dismissed" : false
		};
		localStorage.setItem("old_uids", JSON.stringify(histdb));
		return true;
	}

}

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

function remHist() {
	/* Function is called once every 24hrs.
	 * It purges all dismissed notifications > MAX_HISTORY days
	 * It purges all dismissed notifications for a given site older than first MAX_UNREAD_LIMIT.
	 * It purges all nondismissed notiications for a given site older than first MAX_READ_LIMIT AND > MAX_HISTORY days
	 */
	histdb = JSON.parse(localStorage.getItem("old_uids"));
	if(histdb == null){histdb = new Object};
	siteobject = new Object() // Contains for each site , list of
}
