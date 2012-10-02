var TIME_TO_REFRESH=1000;
function loop()
{
       document.write(Math.round(new Date().getTime()/1000.0));
       //Runs Loop every TIME_TO_REFRESH Milliseconds   
       setTimeout(init,TIME_TO_REFRESH);
}
loop();
