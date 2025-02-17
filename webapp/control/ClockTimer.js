sap.ui.define(['sap/ui/core/Control', 'sap/m/Text'], function (Control, Text) {
	'use strict';

	return Control.extend('zrap100ws7.ext.control.ClockTimer', {
		metadata: { 
            properties: { 
                "seconds": { type: "int", defaultValue: "10"}, 
                "textColor" : { type: "string", defaultValue: "white"}, 
                "backgroundColor" : { type: "string", defaultValue: "black"}, 
            }, 
            events: { 
                finished : {}
            }
        },
        init: function() { 
            this._timer = null;

        }, 
        start: function() { 
            if(this._timer) { 
                clearInterval(this._timer);
            } 

            this._timer = setInterval(() => { 
                this.setSeconds(this.getSeconds() - 1);

                if(this.getSeconds() <= 0) { 
                    clearInterval(this._timer); 
                    this.fireFinished();
                }
            }, 1000);
        },

        stop: function() { 
            if(this._timer) { 
                clearInterval(this._timer);
            }
        },

        renderer: function(oRM, oControl) { 
            oRM.openStart("div", oControl);
            oRM.openEnd();
            oRM.style("color", oControl.getTextColor())
            oRM.style("background-color", oControl.getBackgroundColor())
            oRM.style("font-size", "5rem")
            oRM.style("font-weight", "bold")
            oRM.style("text-align", "center")
            oRM.style("padding", "20px")
            oRM.style("border-radius", "10px")
            oRM.style("transform", "perspective(500px) rotateX(20deg) rotateY(20deg)")
            oRM.style("box-shadow", "0 0 20px rgb(0,0,0,0.5")
            oRM.openStart("span")
            oRM.openEnd()
            oRM.text(oControl.getSeconds())
            oRM.close("span")
            oRM.close("div")

        }
	});
});
