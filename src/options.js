
function rem_account(siteid) {
	siteid=siteid.data
	siteid=siteid.toString();
	var sitelist=JSON.parse(localStorage.getItem("websites")),newlist=[];
	for ( var i = 0 ; i < sitelist.length ; i++ )
		if(sitelist[i].siteid!=siteid)
			newlist.push(sitelist[i]);
	localStorage.setItem("websites",JSON.stringify(newlist));
	getcur_accounts();
}
function getcur_accounts(){
	var sitelist=JSON.parse(localStorage.getItem("websites"));
	var retstr="";
	if(sitelist!=null)
		for ( var i = 0 ; i < sitelist.length ; i++ ) {
			retstr += "<table border=\"0\" class=\"cur_acc\"><tr> <td width=\"600\">  " + sitelist[i].site + "</td><td width=\"100\" class=\"DEL\" id=\""+sitelist[i].siteid + "\" >Delete</a></td></tr> </table><br/>"
		}
	document.getElementById("cur_accounts").innerHTML=retstr;
	if(sitelist!=null)
		for ( var i = 0 ; i < sitelist.length ; i++ ) 
			$("#"+sitelist[i].siteid).click(sitelist[i].siteid,rem_account)
	form=document.getElementById("formid");
	form.innerHTML="";
}



function add_account(site,script){
	var text = (Math.floor(Math.random() * 100000000)).toString();
	if(localStorage.getItem("websites")!=null){
		websites=JSON.parse(localStorage.getItem("websites"));
	}
	else
		websites=[]
	websites.push({
			"site" : site,
			"siteid" : text,
			"code" : script
			});
	localStorage.setItem("websites",JSON.stringify(websites));
	getcur_accounts();
}
function myonClick(e){
	add_account(this.form.site_name.value,this.form.site_script.value)
}

function populate_form(){
	form=document.getElementById("formid");
	form.innerHTML="";
	var instruc=document.createElement("p");
	var instruc2=document.createElement("p");
	instruc.textContent="Enter the Website name";
	form.appendChild(instruc);
	var inpsitename=document.createElement("input");
	inpsitename.setAttribute("type","text");
	inpsitename.setAttribute("name","site_name");
	inpsitename.setAttribute("value","Website Name!");
	var sitescr=document.createElement("textarea");
	sitescr.setAttribute("name","site_script");
	sitescr.setAttribute("rows","20");
	sitescr.setAttribute("cols","50");
	sitescr.textContent="Script Goes Here!"
	var sub=document.createElement("button");
	sub.setAttribute("type","button");
	sub.textContent="Add";
	sub.style.height=20;
	sub.style.width=75;
	sub.onclick=myonClick;
	form.appendChild(inpsitename);
	form.appendChild(document.createElement("br"));
	instruc2.textContent="Enter the JS Script";
	form.appendChild(instruc2);
	form.appendChild(sitescr);
	form.appendChild(document.createElement("br"));
	form.appendChild(sub);

}
$("#add_acct").click(populate_form);
getcur_accounts();
