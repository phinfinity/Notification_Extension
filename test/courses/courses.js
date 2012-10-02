function get_notifications(site,callback) {
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
			//ob.time = parsedate(date);
			ret.push(ob);
		}
		callback(ret);
	});
}
