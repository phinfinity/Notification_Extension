function get_notifications(site,callback) {
	return [];
	getpage("http://courses.iiit.ac.in/EdgeNet/home.php", function(t) {
		doc = $(t);
		vals = doc.find(".mainbox");
		ret = [];
		for (i=0;i<vals.length;i++) {
			ob = new Object();
			ob.summary = $($("font",vals[i])[0]).text();
			ob.img = "http://courses.iiit.ac.in/EdgeNet/" + $("img",vals[i])[1].attributes.getNamedItem("src").textContent;
			ob.link = "http://courses.iiit.ac.in/EdgeNet/" + $("a",vals[i])[2].attributes.getNamedItem("href").textContent;
			ob.site = site;
			ob.uid = ob.summary;
			var ht=$($("font",vals[i])[0]).html();
			var date=ht.match(/<br>(.*)/)[1];
			ob.time = Date.parse(date);
			ret.push(ob);
		}
		callback(ret);
	});
}
