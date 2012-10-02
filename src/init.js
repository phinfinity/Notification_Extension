var TIME_TO_REFRESH=1000;
var TIME_TO_CALL_REMHIST=86400
function loop()
{
       document.write(Math.round(new Date().getTime()/1000.0));
       //Runs Loop every TIME_TO_REFRESH Milliseconds   
       setTimeout(loop,TIME_TO_REFRESH);
}
var last_init_time=localStorage.getItem("last_init_time");
var curTime=(new Date().getTime()/1000.0);
document.write(curTime);
if(last_init_time==null)
{
	remHist();
	localStorage.setItem("last_init_time",curTime.toString());
}
else if(curTime-parseInt(last_init_time)>=TIME_TO_CALL_REMHIST)
{
	remHist();
	localStorage.setItem("last_init_time",curTime.toString());
}
loop();
