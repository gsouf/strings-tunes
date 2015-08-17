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

var GuitarMate = (function($){
    var o = {};
    
    o.String = function(tuning,octave){
        this.tuning = tuning;
        this.octave = octave;
    };
                
    o.String.prototype = {
        renderHtml : function(config){
            var baseKey = config.baseKey;
            var system  = config.system;
            var scale   = config.scale;

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

                if(scale && scale.ivals.indexOf(system.ivalOrder[ivalAjustedIndex]) >= 0){
                    $li.addClass("mg-scale-highlight");
                    $li.addClass("mg-scale-" + system.ivalOrder[ivalAjustedIndex].name.replace(" ", "-").toLowerCase());
                }
           
                $li.addClass("mg-ival-" + system.ivalOrder[ivalAjustedIndex].cssClassName );
                
                $ul.append($li);
                
                drawn++;
                
            }
            
            return $ul;
        }
    };
    

    o.StringSet = function(system){
        this.system = system;
        this.strings = [];
    };
    
    o.StringSet.prototype = {
        
        addString : function(string){
            this.strings.push(string);  
        },
        
        renderHtml : function (scale) {

            var $base = $("<ul/>");
            $base.addClass("mg-stringSet");
            for(var i in this.strings){
            
                var $item = $("<li/>");
                $item.data("mg-string",this.strings[i]); 
                
                $item.attr("mg-string-key",this.strings[i].tuning.name);
                var $string = this.strings[i].renderHtml({
                    system  : this.system,
                    baseKey : this.strings[0].tuning,
                    scale   : scale
                });
                $item.html($string);
            
                $base.append($item);
                
            }
            return $base;
        }
        
    } 

    o.Ival = function(name, cssClassName){
        this.name = name;
        this.scales = [];
        this.cssClassName = cssClassName;
    };

    o.Ival.prototype = {
        addScale: function(scale){
            this.scales.push(scale);
        }
    };
    
    
    
    
    o.Key = function(name){
        this.name = name;
    }
                
    
    
    o.System = function(orderedIval, orderedKeys){
        if(orderedIval.length != orderedKeys.length){
            var em = "Interval Set and Key Set should have the same length";
            console.error(em);
            throw em;   
        }
        
        this.ivalOrder = orderedIval;
        this.keyOrder  = orderedKeys;
        this.scales = {};
    }

    o.System.prototype = {
        "addScale" : function(scale){
            for(var i = 0 ; i<scale.ivals.length; i++){
                var indexOfIval = this.ivalOrder.indexOf(scale.ivals[i]);
                if(indexOfIval < 0){
                    throw "Cant add scale to a system, an interval of the scale does not exist in the system";
                }

                var ival = scale.ivals[i];
                ival.addScale(scale);
            }
            this.scales[scale.name] = scale;
        }
    };

    o.Scale = function(name, ivals, modeNames){
        if(ivals.length != modeNames.length){
            var em = "ivals and modeNames must have the same length";
            console.error(em);
            throw em;   
        }

        this.name = name;
        this.ivals = ivals;
        this.modeNames = modeNames;

    }


    o.system = {};

    return o;

})(jQuery);