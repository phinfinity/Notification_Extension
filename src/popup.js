var MAX_NOTIFICATION_LENGTH=75;
function summarize_text(s){
	if (s.length > MAX_NOTIFICATION_LENGTH) {
		return s.substr(s,MAX_NOTIFICATION_LENGTH-3)+"...";
	} else {
		return s;
	}
}
vals = getNotif();
var retstr="<hr/>"
for (i=0;i<vals.length;i++) {
	var notification_string = summarize_text(vals[i].summary);
	var notification_title = vals[i].title;
	var notification_image = vals[i].img;
	var notification_link = vals[i].link
	// Set above variables depending on context and leave below unchanged
	if (!notification_title)
		notification_title = "";
	else
		notification_title += " - ";
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
