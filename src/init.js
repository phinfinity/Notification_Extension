var TIME_TO_REFRESH = 5;
// in seconds
var TIME_TO_CALL_REMHIST = 86400// in Seconds
TIME_TO_CALL_REMHIST *= 1000;
//convert to miliseconds
TIME_TO_REFRESH *= 1000;
//convert to miliseconds

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
	website_list = ['function get_notifications(a,b){function c(a){var b=a.split(/\s{1,}/);var c=b[3].split(",")[1],d=b[3].split(",")[0];var e=parseInt(b[0].split(":")[0]),f=b[0].split(":")[1];if(b[1]=="pm"&&e<=12)e+=12;var g=new Object;g["Jan"]=1;g["Feb"]=2;g["Mar"]=3;g["Apr"]=4;g["May"]=5;g["Jun"]=6;g["Jul"]=7;g["Aug"]=8;g["Sep"]=9;g["Oct"]=10;g["Nov"]=11;g["Dec"]=12;var h=g[b[2]].toString();var i=new Date(c,h,d,e.toString(),f);return i.getTime()}getpage("http://courses.iiit.ac.in/EdgeNet/home.php",function(c){doc=$(c);vals=doc.find(".mainbox");ret=[];for(i=0;i<vals.length;i++){ob=new Object;ob.summary=$($("font",vals[i])[0]).text();ob.img="http://courses.iiit.ac.in/EdgeNet/"+$("img",vals[i])[1].attributes.getNamedItem("src").textContent;ob.link="http://courses.iiit.ac.in/EdgeNet/"+$("a",vals[i])[2].attributes.getNamedItem("href").textContent;ob.site=a;ob.uid=ob.summary;var d=$($("font",vals[i])[0]).html();var e=d.match(/<br>(.*)/)[1];ret.push(ob)}b(ret)})}'];
	for (var i in website_list) {
		iframe.contentWindow.postMessage({
			'command' : 'execute',
			'codestr' : website_list[i],
			'site' : 'courses'
		}, '*');
	}
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
			if(addHist(ob.uid, ob.site)) {
				addNotif(ob);
			}
		}
	} else if (l.type == 'fetchGET') {
		url = l.payload;
		rid = l.rid;
		xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
		xhr.send();
		val = xhr.responseText;
		event.source.postMessage({
			"command": "response",
			"rid" : rid,
			"payload" : val
		}, '*');
	}
});

setTimeout(loop, 1*1000); // wait 2 seconds to settle down before running
