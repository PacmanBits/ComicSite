var Framed = {};

(function()
{
	var funcs    = {}   ;
	var lastTime = null ;
	var timer    = null ;
	
	var ID = 0;
	
	Framed.AddOnFrameHandler = function(func)
	{
		if(funcsEmpty())
			StartFrames();
		
		funcs[ID] = func;
		
		ID++;
		
		return ID;
	}
	
	Framed.RemoveOnFrameHandler = function(ID)
	{
		if(funcs[ID])
			funcs[ID] = undefined;
		
		var empty = true;
		
		if(funcsEmpty())
			StopFrames();
	}
	
	function funcsEmpty()
	{
		for(var f in funcs)
			return false;
		
		return true;
	}
	
	function StartFrames()
	{
		if(timer)
			StopFrames();
		
		lastTime = new Date();
		timer = setInterval(OnFrame, 0);
	}
	
	function StopFrames()
	{
		clearInterval(timer);
		timer = null;
	}
	
	function OnFrame()
	{
		var now = new Date();
		var diff = now - lastTime;
		
		lastTime = now;
		
		for(var f in funcs)
			funcs[f](diff);
	}
})();