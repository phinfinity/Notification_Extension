var MAX_NOTIFICATION_LENGTH=75;
function summarize_text(s){
	if (s.length > MAX_NOTIFICATION_LENGTH) {
		return s.substr(s,MAX_NOTIFICATION_LENGTH-3)+"...";
	} else {
		return s;
	}
}
function parsedate(s){
	var x=s.split(/\s{1,}/);
	var yr=x[3].split(",")[1],dt=x[3].split(",")[0];
	var hrs=parseInt(x[0].split(":")[0]),mins=x[0].split(":")[1];
	if(x[1]=="pm"  && hrs <=12)
		hrs+=12
	var month=new Object()
	month["Jan"]=1;
	month["Feb"]=2;
	month["Mar"]=3;
	month["Apr"]=4;
	month["May"]=5;
	month["Jun"]=6;
	month["Jul"]=7;
	month["Aug"]=8;
	month["Sep"]=9;
	month["Oct"]=10;
	month["Nov"]=11;
	month["Dec"]=12;
	var monthnum=month[x[2]].toString();
	var retdate= new Date(yr,monthnum, dt,hrs.toString(),mins);
	return retdate.getTime();

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
	var ht=$($("font",vals[i])[0]).html()
	var ret=$($("font",vals[i])[0]).text()
	var date=ht.match(/<br>(.*)/)[1]
	var notification_string = summarize_text(ret);
	notification_string += "    " + parsedate(date)
	retstr += "<div class='notification_entry'>"+notification_string+"</div><hr/>";
}
retstr += "";
document.getElementById("content").innerHTML=retstr;
