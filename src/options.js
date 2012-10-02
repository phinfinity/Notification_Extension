
function getcur_accounts(){
	var sitelist=JSON.parse(localStorage.websites);
	var retstr="<table>";
	for ( var i = 0 ; i < sitelist.length ; i++ ) 
		retstr += "<tr> <td>  " + sitelist[i].site + "</td></tr>  "	
			retstr += "</table>";
	document.getElementById("cur_accounts").innerHTML=retstr;
}

function rem_account(siteid) {
	var sitelist=JSON.parse(localStorage.websites),newlist=[];
	for ( var i = 0 ; i < sitelist.length ; i++ )
		if(sitelist[i].siteid!=siteid)
			newlist.push(sitelist[i])
				localStorage["websites"]=JSON.stringify(newlist);
	getcur_accounts();
}

function add_account(site,script){
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",text="" ;
	for( var i=0; i < 8; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	websites.push(JSON.stringify({
				"site" : site,
				"siteid" : text
				}));
	getcur_accounts();
}
