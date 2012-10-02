var TIME_TO_REFRESH = 100; // in seconds
var TIME_TO_CALL_REMHIST = 86400// in Seconds
TIME_TO_CALL_REMHIST *= 1000; //convert to miliseconds
TIME_TO_REFRESH *= 1000; //convert to miliseconds


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



function loop() {
	//Runs Loop every TIME_TO_REFRESH Milliseconds
	// Main Fetching Loop goes here.
	setTimeout(loop, TIME_TO_REFRESH);
}


loop();
