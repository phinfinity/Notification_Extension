
function getcur_accounts(){
	var sitelist=JSON.parse(localStorage.websites);
	var retstr="";
	if(sitelist!=null)
		for ( var i = 0 ; i < sitelist.length ; i++ ) 
			retstr += "<table border=\"0\" class=\"cur_acc\"><tr> <td width=\"600\">  " + sitelist[i].site + "</td><td width=\"100\" class=\"DEL\"><a href=\"\" onclick=\"rem_account("+sitelist[i].siteid + ") >X</a></td></tr> </table><br/>"	
	document.getElementById("cur_accounts").innerHTML=retstr;
}

function rem_account(siteid) {
	siteid=siteid.toString();
	var sitelist=JSON.parse(localStorage.websites),newlist=[];
	for ( var i = 0 ; i < sitelist.length ; i++ )
		if(sitelist[i].siteid!=siteid)
			newlist.push(sitelist[i])
				localStorage["websites"]=JSON.stringify(newlist);
	getcur_accounts();
}

function add_account(site,script){
	var text = (Math.floor(Math.random() * 100000000)).toString();
	websites.push(JSON.stringify({
				"site" : site,
				"siteid" : text
				}));
	getcur_accounts();
}
function populate_form(){
	form=document.getElementById("formid");
	var inpsitename=document.createElement("sitename");
	inpsitename.setAttribute("type","text");
	inpsitename.setAttribute("name","site_name");
	var sitescr=document.createElement("script");
	sitescr.setAttribute("type","text");
	sitescr.setAttribute("name","site_script");
	form.innerHTML="";
	form.appendChild(inpsitename);
	form.appendChild(sitescr);
}
getcur_accounts();
