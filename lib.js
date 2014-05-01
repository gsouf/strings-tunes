/**

The MIT License (MIT)

Copyright (c) 2014 Soufiane Ghzal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

var GuitarMate = (function(){
                
                var $ = jQuery;
                
                var o = {};
                
                o.String = function(tuning,octave){
                    this.tuning = tuning;
                    this.octave = octave;
                };
                
                o.String.prototype = {
                    renderHtml : function(config){
                        var baseKey = config.baseKey;
                        var system  = config.system;

                        var baseKeyIndex = system.keyOrder.indexOf(baseKey);
                        var myKeyIndex   = system.keyOrder.indexOf(this.tuning);
                        
                        var numberOfKeys = system.keyOrder.length;
                        var numberToDraw = 18; // nombre de cases
                        
                        var drawn = 0;
                        
                        var $ul = $("<ul/>");
                        $ul.addClass("mg-string");
                        $ul.data("mg-string",this);
                        
                        while(drawn < numberToDraw){
                            var ivalIndex = myKeyIndex - baseKeyIndex + drawn;
                            
                            var ivalAjustedIndex = ivalIndex % numberOfKeys;
                            
                            if(ivalAjustedIndex < 0)
                                ivalAjustedIndex=numberOfKeys+ivalAjustedIndex;
                            
                            var $li = $("<li/>");
                            $li.data("mg-ival" , system.ivalOrder[ivalAjustedIndex]);
                            $li.data("mg-key"  , system.keyOrder[ivalAjustedIndex]);
                            
                            var $span = $("<span/>");
                            $span.addClass("mg-music-note");
                            $span.html(system.ivalOrder[ivalAjustedIndex].name);
                            
                            $li.html($span);
                            
                            for(var i in system.ivalOrder[ivalAjustedIndex].gammes){
                            	$li.addClass("mg-gamme-" + system.ivalOrder[ivalAjustedIndex].gammes[i]);
                            }
                            $li.addClass("mg-ival-" + system.ivalOrder[ivalAjustedIndex].className );
                            
                            $ul.append($li);
                            
                            drawn++;
                            
                        }
                        
                        return $ul;
                    }
                };
                
                o.Ival = function(name,className,gammes){
                    this.name = name;
                    this.gammes = gammes;
                    this.className = className;
                };
                
                
                
                
                o.Key = function(name){
                    this.name = name;
                }
                
                o.Key.C  = new o.Key("C");
    o.Key.CA = new o.Key("C#");
    o.Key.D  = new o.Key("D");
    o.Key.DA = new o.Key("D#");
    o.Key.E  = new o.Key("E");
    o.Key.F  = new o.Key("F");
    o.Key.FA = new o.Key("F#");
    o.Key.G  = new o.Key("G");
    o.Key.GA = new o.Key("G#");
    o.Key.A  = new o.Key("A");
    o.Key.AA = new o.Key("A#");
    o.Key.B  = new o.Key("B");
                
                o.StringSet = function(system){
                	this.system = system;
                    this.strings = [];
                };
                
                o.StringSet.prototype = {
                    
                    addString : function(string){
                        this.strings.push(string);  
                    },
                    
                    renderHtml : function () {
                        var $base = $("<ul/>");
                        $base.addClass("mg-stringSet");
                        for(var i in this.strings){
                        
                            var $item = $("<li/>");
                            $item.data("mg-string",this.strings[i]); 
                            
                            $item.attr("mg-string-key",this.strings[i].tuning.name);
                            var $string = this.strings[i].renderHtml({
                            	system  : this.system,
                                baseKey : this.strings[0].tuning
                            });
                            $item.html($string);
                        
                            $base.append($item);
                            
                        }
                        
                        return $base;
                    }
                    
                } 
                
                o.System = function(orderedIval,orderedKeys){
               		if(orderedIval.length != orderedKeys.length){
               			console.error("Interval Set and Key Set should have the same length");
               			throw "Interval Set and Key Set should have the same length";	
               		}
               		
               		this.ivalOrder = orderedIval;
               		this.keyOrder  = orderedKeys;
               	}

				return o;

            })();
            
            
GuitarMate.MajorSystem = (function(GuitarMate){
	var o = {};
	
	o.Ival = {};
	
	o.Ival.Tonic = new GuitarMate.Ival(
		"F","tonic",["major","pentatonic-minor","pentatonic-major","arpeggio-minor"]);
		
	o.Ival.SecondMinor = new GuitarMate.Ival(
		"2-","",[]);
		
	o.Ival.Second = new GuitarMate.Ival(
		"2","",["major","pentatonic-major"]);
		
	o.Ival.TierceMinor = new GuitarMate.Ival(
		"3-","",["pentatonic-minor","pentatonic-major-blue-note","arpeggio-minor"]);
		
	o.Ival.Tierce = new GuitarMate.Ival(
		"3","",["major","pentatonic-major"]);
		
	o.Ival.Quart = new GuitarMate.Ival(
		"4","",["major","pentatonic-minor"]);
		
	o.Ival.QuintMinor = new GuitarMate.Ival(
		"5-","",["pentatonic-minor-blue-note"]);
		
	o.Ival.Quint = new GuitarMate.Ival(
		"5","",["major","pentatonic-minor","pentatonic-major","arpeggio-minor"]);
		
	o.Ival.SixthMinor = new GuitarMate.Ival(
		"6-","",[]);
		
	o.Ival.Sixth = new GuitarMate.Ival(
		"6","",["major","pentatonic-major"]);
		
	o.Ival.SeventhMinor = new GuitarMate.Ival(
		"7-","",["pentatonic-minor"]);
		
	o.Ival.Seventh = new GuitarMate.Ival(
		"7","",["major","pentatonic-major"]);
	
	var ivalOrder = [
	   o.Ival.Tonic,
	   o.Ival.SecondMinor,
	   o.Ival.Second,
	   o.Ival.TierceMinor,
	   o.Ival.Tierce,
	   o.Ival.Quart,
	   o.Ival.QuintMinor,
	   o.Ival.Quint,
	   o.Ival.SixthMinor,
	   o.Ival.Sixth,
	   o.Ival.SeventhMinor,
	   o.Ival.Seventh
	];
	
	o.Key = GuitarMate.Key;
	
	
    
    var keyOrder = [
        o.Key.C,
        o.Key.CA,
        o.Key.D,
        o.Key.DA,
        o.Key.E,
        o.Key.F,
        o.Key.FA,
        o.Key.G,
        o.Key.GA,
        o.Key.A,
        o.Key.AA,
        o.Key.B
    ];
	
	var rObject  = new GuitarMate.System(ivalOrder,keyOrder);
	rObject.key  = o.Key;
	rObject.ival = o.Ival;
	
	return rObject;
})(GuitarMate);
