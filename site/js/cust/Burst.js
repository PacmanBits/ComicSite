$(function()
{
	var minSpeed   = 0.5 ;
	var maxSpeed   = 2   ;
	var thetaRange = 5   ;
	
	function MakeLayer(r, n, color, startingZ)
	{
		var inR = r * Math.cos(Math.PI / n);
		var polySide = 2 * r * Math.sin(Math.PI / n);
		var s = Math.sqrt(polySide * polySide / 2);
		
		var blast = $("<div>").addClass("blast").css({position : "absolute", zIndex : startingZ});
		
		for(var p = 0; p < n; p++)
		{
			var theta = p * 360 / n;
			
			$("<div>").appendTo(blast).css({
				position        : "absolute",
				zIndex          : p,
				width           : s + "em",
				height          : s + "em",
				backgroundColor : color,
				transform       : "translate(-50%,-50%) rotate(" + theta + "deg) translate(" + inR + "em, 0) rotate(45deg)"
			});
			
			
			$("<div>").appendTo(blast).css({
				position        : "absolute",
				zIndex          : -1 * p,
				width           : s + "em",
				height          : s + "em",
				transform       : "translate(-50%,-50%) rotate(" + theta + "deg) translate(" + inR + "em, 0) rotate(45deg)",
				boxShadow       : "0 0 0.2em 0.01em rgba(0,0,0,0.5)"
			});
		}
	
		var targetTheta = 2 * thetaRange * Math.random() - thetaRange              ;
		var theta       = 0                                                        ;
		var dir         = Math.sign(targetTheta)                                   ;
		var speed       = ((maxSpeed - minSpeed) * Math.random() + minSpeed) * dir ;
		
		Framed.AddOnFrameHandler(function(dt)
		{
			if(dir * theta > dir * targetTheta)
			{
				targetTheta  = 2 * thetaRange * Math.random() - thetaRange;
				
				dir = Math.sign(targetTheta - theta);
				
				speed = ((maxSpeed - minSpeed) * Math.random() + minSpeed) * dir;
			}
			
			theta += speed * dt / 1000;
			theta %= 360;
			
			blast.css("transform", "rotate(" + theta + "deg)");
		});
		
		var center = $("<div>")
			.css({
				width           : 2 * r + "em",
				height          : 2 * r + "em",
				backgroundColor : color,
				position        : "absolute",
				borderRadius    : "50%",
				transform       : "translate(-50%, -50%)"
			})
			.appendTo(blast)
		;
		
		return blast;
	}
	
	var bz              = $("#BlastZone") ;
	var layerComplexity = 7               ;
	
	var size = 1;
	var color = "red";
	
	MakeLayer( size,   layerComplexity, "black",  0                   ).appendTo(bz);
	MakeLayer( 0.9 * size, layerComplexity, "yellow", layerComplexity     ).appendTo(bz);
	MakeLayer( 0.8 * size, layerComplexity, "red",    layerComplexity * 2 ).appendTo(bz);
});