$(function()
{
	var canvSize = 1000;
	
	function MakeLayer(r, n, color, additionalClasses)//, startingZ)
	{
		var outR   = r * canvSize / 2                   ;
		var polySide = 2 * outR * Math.sin(Math.PI / n) ;
		var inR    = outR - polySide / 2                ; // TODO: the outR:inR ratio isn't correct.  The spikes should have a 90 degree angle in all cases
		var period = 2 * Math.PI / n                    ;
		var point  = period / 2                         ;
		
		
		
		
		
		
		
		var blast  = $(document.createElement("canvas"))
			.addClass("blast " + additionalClasses)
			.css({
				position : "absolute"    ,
				width    : 2 * r + "em"  ,
				height   : 2 * r + "em"  ,
				top      : -1 * r + "em" ,
				left     : -1 * r + "em"
			})
			.attr("width", canvSize)
			.attr("height", canvSize)
		;
		var ctx    = blast[0].getContext("2d");
		
		var c = {
			x : canvSize / 2,
			y : canvSize / 2
		}
		
		ctx.fillStyle     = color         ;
		ctx.shadowColor   = '#000'        ;
		ctx.shadowBlur    = canvSize / 20 ;
		ctx.shadowOffsetX = 0             ;
		ctx.shadowOffsetY = 0             ;
		
		ctx.beginPath();
		ctx.moveTo(inR + c.x, 0 + c.y);
		
		for(var theta = 0; theta < 2 * Math.PI; theta += period)
		{
			ctx.lineTo( outR * Math.cos(theta + point) + c.x, outR * Math.sin(theta + point) + c.y);
			ctx.lineTo( inR * Math.cos(theta + period) + c.x, inR * Math.sin(theta + period) + c.y);
//			ctx.rect( outR * Math.cos(theta + point) + c.x - 2, outR * Math.sin(theta + point) + c.y - 2, 4, 4);
//			ctx.rect( inR * Math.cos(theta + period) + c.x - 2, inR * Math.sin(theta + period) + c.y- 2, 4, 4);
		}
		
		ctx.closePath();
		ctx.fill();
		
		/*
		var polySide = 2 * r * Math.sin(Math.PI / n);
		var s        = Math.sqrt(polySide * polySide / 2);
		
		var blast = $("<div>").addClass("blast " + additionalClasses).css({position : "absolute", zIndex : startingZ});
		
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
		*/
		
		return blast;
	}
	
	var bz              = $("#BlastZone") ;
	var layerComplexity = 25              ;
	
	MakeLayer( 0.90, layerComplexity, "black",  "blastRotation-1", 0                   ).appendTo(bz);
	MakeLayer( 0.85, layerComplexity, "yellow", "blastRotation-2", layerComplexity     ).appendTo(bz);
	MakeLayer( 0.80, layerComplexity, "red",    "blastRotation-3", layerComplexity * 2 ).appendTo(bz);
});