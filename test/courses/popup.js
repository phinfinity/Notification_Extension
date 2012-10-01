var MAX_NOTIFICATION_LENGTH=75;
function summarize_text(s){
	if (s.length > MAX_NOTIFICATION_LENGTH) {
		return s.substr(s,MAX_NOTIFICATION_LENGTH-3)+"...";
	} else {
		return s;
	}
}
xhr = new XMLHttpRequest();
xhr.open("GET", "http://courses.iiit.ac.in/EdgeNet/home.php", false);
xhr.send();
t = xhr.responseText;
doc = $(t);
vals = doc.find(".mainbox");
content = document.getElementById("content");
var retstr="<hr/>"
for (i=0;i<vals.length;i++) {
	var notification_string = summarize_text($($("font",vals[i])[0]).text());
	retstr += "<div class='notification_entry'>"+notification_string+"</div><hr/>";
}
retstr += "";
document.getElementById("content").innerHTML=retstr;
