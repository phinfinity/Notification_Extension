var MAX_NOTIFICATION_LENGTH=75;
function summarize_text(s){
	if (s.length > MAX_NOTIFICATION_LENGTH) {
		return s.substr(s,MAX_NOTIFICATION_LENGTH-3)+"...";
	} else {
		return s;
	}
}
xhr = new XMLHttpRequest();
xhr.open("GET", "https://mail.google.com/mail/feed/atom", false);
xhr.send();
t = xhr.responseText;
doc = $(t);
nummails = parseInt(doc.find("fullcount").html());
entries = doc.find("entry");
content = document.getElementById("content");
var retstr="<hr/>"
for(i=0;i<nummails;i++){
	var datetime=$(entries[i]).find("modified").html()
	date=datetime.match(/(..)-(..)-(..)T(..):(..):(..)Z/)
	var d = new Date("20"+date[1],date[2],date[3],date[4],date[5],date[6])
	var secs_from_epoch = d.getTime()
	var notification_string = "<b> "  + $(entries[i]).find("title").html() + "</b>" + " - " + $(entries[i]).find("summary").html() + "( " + secs_from_epoch +" ) ";
	retstr += "<div class='notification_entry'>"+notification_string+"</div><hr/>";
}
document.getElementById("content").innerHTML=retstr;
