// This script will run on startup and will have  timer-loop running forever
// Add background functions on top keep global constants on the very top of file

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
