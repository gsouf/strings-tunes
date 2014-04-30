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
                        
                        var baseKeyIndex = o.Key.order.indexOf(baseKey);
                        var myKeyIndex = o.Key.order.indexOf(this.tuning);
                        

                        
                        var numberOfKeys = o.Key.order.length;
                        var numberToDraw = 16; // nombre de cases
                        
                        var drawn = 0;
                        
                        var $ul = $("<ul/>");
                        $ul.addClass("mg-string");
                        
                        while(drawn < numberToDraw){
                            var ivalIndex = myKeyIndex - baseKeyIndex + drawn;
                            
                            var ivalAjustedIndex = ivalIndex % numberOfKeys;
                            
                            if(ivalAjustedIndex < 0)
                                ivalAjustedIndex=numberOfKeys+ivalAjustedIndex;
                            
                            var $li = $("<li/>");
                            $li.data("mg-ival",o.Ival.order[ivalAjustedIndex]);
                            $li.data("mg-key",o.Key.order[ivalAjustedIndex]);
                            $li.html(o.Ival.order[ivalAjustedIndex].name);
                            
                            $ul.append($li);
                            
                            drawn++;
                            
                        }
                        
                        return $ul;
                    }
                };
                
                o.Ival = function(name){
                    this.name = name;
                };
                
                o.Ival.Tonic = new o.Ival("1");
                o.Ival.SecondMinor = new o.Ival("2-");
                o.Ival.Second = new o.Ival("2");
                o.Ival.TierceMinor = new o.Ival("3-");
                o.Ival.Tierce = new o.Ival("3");
                o.Ival.Quart = new o.Ival("4");
                o.Ival.QuintMinor = new o.Ival("5-");
                o.Ival.Quint = new o.Ival("5");
                o.Ival.SixthMinor = new o.Ival("6-");
                o.Ival.Sixth = new o.Ival("6");
                o.Ival.SeventhMinor = new o.Ival("7-");
                o.Ival.Seventh = new o.Ival("7");
                
                o.Ival.order = [
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
                
                
                o.Key = function(name){
                    this.name = name;
                }
                
                o.Key.C = new o.Key("C");
                o.Key.CA = new o.Key("C#");
                o.Key.D = new o.Key("D");
                o.Key.DA = new o.Key("D#");
                o.Key.E = new o.Key("E");
                o.Key.F = new o.Key("F");
                o.Key.FA = new o.Key("F#");
                o.Key.G = new o.Key("G");
                o.Key.GA = new o.Key("G#");
                o.Key.A = new o.Key("A");
                o.Key.AA = new o.Key("A#");
                o.Key.B = new o.Key("B");
                
                o.Key.order = [
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
                
                o.StringSet = function(){
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
                                baseKey : this.strings[0].tuning
                            });
                            $item.html($string);
                        
                            $base.append($item);
                            
                        }
                        
                        return $base;
                    }
                    
                }
                
                if(o.Key.order.length != o.Ival.order.length)
                    console.error("key and ival must have the same length");
                
                return o;
            })();
