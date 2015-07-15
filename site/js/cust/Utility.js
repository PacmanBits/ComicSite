var Utility = {
	MakeEl : function(tagName)
	{
		return $(document.createElement(tagName));
	},
	MakeDiv : function()
	{
		return Utility.MakeEl("div");
	},
	CanvasSupported : function()
	{
		var elem = document.createElement('canvas');
		return !!(elem.getContext && elem.getContext('2d'));
	},
	Vector : {
		// Right now this just makes basic object literals.  In the future we may want to return a more complex vector object
		New : function(x, y)
		{
			return {
				x : (typeof x == "number" ? x : 0),
				y : (typeof y == "number" ? y : 0)
			};
		},
		Add : function(v1, v2)
		{
			return { x : v1.x + v2.x, y : v1.y + v2.y };
		},
		Subtract : function(v1, v2)
		{
			return { x : v1.x - v2.x, y : v1.y - v2.y };
		},
		Multiply : function(v, s)
		{
			return { x : s * v.x, y : s * v.y };
		},
		Divide : function(v, s)
		{
			return Util.Vec.Mlt(v, 1 / s);
		},
		Magnitude : function(v)
		{
			return Math.sqrt(v.x * v.x + v.y + v.y);
		},
		Dot : function(v1, v2)
		{
			return v1.x * v2.x + v1.y * v2.y;
		},
		Unit : function(v)
		{
			return Util.Vec.Div(v, Util.Vec.Mag(v));
		}
	}
};

// Aliasing for commonly used functions
var Util     = Utility            ;
Util.Vec     = Util.Vector        ;
Util.Vec.Sub = Util.Vec.Subtract  ;
Util.Vec.Mlt = Util.Vec.Multiply  ;
Util.Vec.Div = Util.Vec.Divide    ;
Util.Vec.Mag = Util.Vec.Magnitude ;