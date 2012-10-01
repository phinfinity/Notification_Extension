rows=document.getElementsByTagName('tbody')[3].childNodes
lst=[]
for(i=1;i<rows.length;i+=2){
    lst.push(rows[i])
}
