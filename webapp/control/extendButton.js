sap.ui.define(['sap/m/Button',], function (Button ) {
	'use strict';

	return Button.extend('zrap100ws7.ext.control.extendButton', {
		metadata: { 
            properties: { 
                text : { type : "string", defaultValue: ""}, 
                color : { type : "string", defaultValue: "aqua"}, 
                textColor : { type : "string", defaultValue: "red"}, 
                size : { type : "string", defaultValue: "100px"}, 
            }, 
            events: { 
                press : {}
            }
        },

        renderer: function(oRM, oControl){
            oRM.write("<button"); 
            oRM.writeControlData(oControl)
            oRM.addStyle("width", oControl.getSize())
            oRM.addStyle("height", oControl.getSize())
            oRM.addStyle("min-width", oControl.getSize())
            oRM.addStyle("min-height", oControl.getSize())
            oRM.addStyle("border-radius", "50%")
            oRM.addStyle("background-color", oControl.getColor())
            oRM.addStyle("color", oControl.getTextColor())
            oRM.addStyle("font-size", "20px")
            oRM.addStyle("font-weight", "bold")
            oRM.addStyle("border", "none")
            oRM.addStyle("display", "flex")
            oRM.addStyle("aligin-items", "center")
            oRM.addStyle("justify-content", "center")
            oRM.addStyle("cursor", "pointer")
            oRM.addStyle("box-shadow", "2px 2px 2px 5px rgba(0,0,0,0.2)")
            oRM.addStyle("transtion", "all 0.3s ease")
            oRM.writeStyles()
            oRM.write(">")

            oRM.writeEscaped(oControl.getText())
            oRM.write("</button>")
        }, 
        start: function() { 
            this.interval = setInterval(this._randomPostion, 1000, this.getDomRef(), this);
        },
        end: function() { 
            clearInterval(this.interval);
        },
        onAfterRendering: function() { 
            let oButton = this.getDomRef(); 
            let that = this; 
            
            if(oButton) { 
                oButton.addEventListener("click", () => { 
                    //that.firePress();
                    that._randomPostion(oButton, that); 
                    clearInterval(this.interval);
                    this.interval = setInterval(that._randomPostion, 1000, oButton, that);
                   // that._explodeEffect(oButton);
                }); 

                oButton.addEventListener("mouseover", () => { 
                    oButton.style.backgroundColor = "white"; 
                    oButton.style.boxShadow = "3px 3px 7px rgba(0,0,0,0.3)"
                })

                oButton.addEventListener("mouseout",() => { 
                    oButton.style.backgroundColor = that.getColor()
                    oButton.style.boxShadow = "2px 2px 2px 5px rgba(0,0,0,0.2)"
                })
            }
        }, 
        _randomPostion: function(oButton,that) { 
            let screenWidth = window.innerWidth; 
            let screenHeight = window.innerHeight; 

            let randomX = Math.random() * (screenWidth - 120)
            let randomY = Math.random() * (screenHeight - 618)

            oButton.style.position = "absolute"
            oButton.style.left = `${randomX}px`
            oButton.style.top = `${randomY}px`

        }, 
        _explodeEffect: function(oButton) { 
            let parent = oButton.parentNode;
            let buttonRect = oButton.getBoundingClientRect(); 
            let numFragments = 8; 

            for( let i=0; i<numFragments; i++) { 
                let fragment = document.createElement("div"); 

                let angle = (Math.PI *2 * i)/ numFragments; 
                let x = Math.cos(angle) * 80; 
                let y = Math.sin(angle) * 80; 

                fragment.style.left = `${buttonRect.left + 50}px`
                fragment.style.top = `${buttonRect.top + 50}px`
                fragment.style.backgroundColor = this.getColor(); 
                fragment.style.transform = `translate(${x}px), ${y}px  scale(1)`
                parent.appendChild(fragment)

                setTimeout(() => { 
                    fragment.style.opacity = "0"
                    fragment.style.transform = `translate(${x}px), ${y}px  scale(0)`
                }, 200);

                setTimeout(() => { 
                    oButton.remove(); 
                    document.querySelectorAll(".button-fragment").forEach(frag => frag.remove());
                }, 200)
            }
        }

	});
});
