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
	var notification_title = "";
	var notification_image = 'http://courses.iiit.ac.in/EdgeNet/' + $("img",vals[i])[1].attributes.getNamedItem('src').textContent;
	var notification_link = 'http://courses.iiit.ac.in/EdgeNet/' + $('a',vals[i])[2].attributes.getNamedItem('href').textContent;
	// Set above variables depending on context and leave below unchanged
	if (notification_title != "")
		notification_title += "- ";
	//Sanitize strings
	notification_string = $("<div/>").text(notification_string).html();
	notification_title = $("<div/>").text(notification_title).html();
	notification_image = $("<div/>").text(notification_image).html();
	notification_link = $("<div/>").text(notification_link).html();
	retstr += "<div class='notification_entry'><table><tr><td><img class='notification_image' src='"+notification_image+"'/></td><td><b>"+notification_title+"</b>"+notification_string+"</td></tr></table><div class='notification_link'>"+notification_link+"</div></div><hr/>";
}
retstr += "";
document.getElementById("content").innerHTML=retstr;
$(".notification_entry").click(function(){
	chrome.tabs.create({
		url: $(this).find(".notification_link").text(),
		active: false
	});
});

$(".notification_entry").hover(
		function() {
			$(this).css("background-color","#E0E0E0");
		},
		function() {
			$(this).css("background-color","#FFFFFF");
		});

