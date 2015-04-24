/* Sticky Footer for Contao
 * @author: Joe Ray Gregory aka may17
 * @author: Stefan Melz (Debugbar bugfix)
 * @copyright: Joe Ray Gregory 2012 - 2013 joe@may17.de
 * @license LGPL
 */
(function() {
    var M17StickyFooter = {

        /**
         * constructor
         */
        init: function() {

            var formBody = document.getElement('.tl_formbody_submit') || false,
                setEvent,
                fieldsets,
                debugToggler,
                easyTheme = document.id('easy_themes') || false,
                self = this;

            //invoke only when the element existists
            if(formBody) {

            	this.footerData = this.generateSubmitObj(formBody);
				this.generateOffset();
                this.setStickyPosition(formBody);
                
               	//Prepare event
               	setEvent = this.setItem.bind(this);
               	
               	//Add resize and scroll events
                window.addEvents({
                    'scroll': setEvent,
                    'resize': setEvent,
                    'ajax_change': setEvent
                });

                // Reset the position on window resizing
               	window.addEvent('resize', this.setStickyPosition.bind(this).pass(formBody));
                
                fieldsets = $$('fieldset');
                
                //addEvent Delegation for legends
                fieldsets.addEvent('click:relay(legend)', function(e){
                    self.setItem();
                });
                
                //Improvment for checkbox actions
                fieldsets.addEvent('click:relay(input.tl_checkbox[onclick])', function(e){
                    self.setItem();
                });
                
                //Watch debug toggler
                debugToggler = document.id('tog') || false;
                if(debugToggler) {
                    debugToggler.addEvent('click',function(){
                    	self.setItem();
                	})
                }
                
                // set Position on Init
                setEvent();
            }

            // easy themes fix
            if(easyTheme) {
                if(easyTheme.getStyle('display') == 'none') {
                    easyTheme.setStyle('display', 'block');
                }
            }
        },
        
        /* generateSubmitObj
         * @desc generates the internal footer Object
         */
        generateSubmitObj: function(formbody) {
        	var submitContainer = formbody.getFirst(),
                // Fixes Mootools Bug see https://github.com/mootools/mootools-core/issues/2364
                submitContainerWidth =  (!Browser.opera) ? submitContainer.getStyle('width') : window.getComputedStyle(submitContainer,"").getPropertyValue("width");

        	return {
        		item: formbody,
        		submitContainer: submitContainer,
        		height: submitContainer.getHeight(),
        		width: submitContainerWidth,
        		offset: 0,
        		position: submitContainer.getCoordinates()
        	}
        },
        
        /* generateOffset
         * @desc calculates an offset if debug bar is active
         */
        generateOffset: function(){
			var debug = document.getElement('div#debug') || false;
			    debug = (debug==false) ? document.getElement('div#contao-debug') : debug;
			
			
            //set news offset for debugbar
            if(debug){
                var offset = debug.getElement('p').getSize().y + debug.getElement('div').getSize().y -1;
                    this.footerData.submitContainer.setStyle('bottom', offset);
                    this.footerData.offset = offset;
            }
        },

        /**
         * Set a position for the sticky footer
         * @param formbody
         */
        setStickyPosition: function(formbody) {
            this.footerData.submitContainer.setStyle('left', formbody.getPosition().x);
        },
        
        /* setItem
         *
         */
        setItem: function(e) {
            var offset = this.generateOffset(),
            	raffle = this.footerData.item.getPosition().y + this.footerData.height + this.footerData.offset,
            	win = window,
            	diff = raffle - win.getHeight(),
                docBody = document.body,
                stickyClass = 'stickySave',
            	scrollSizeToInt = win.getScroll().y.toInt();
            	
            if(scrollSizeToInt > diff) {
                docBody.removeClass(stickyClass);
            } else {
                //check if class set
                if(!docBody.hasClass(stickyClass)) {
                    this.footerData.submitContainer.setStyle('width', this.footerData.width);
                    docBody.addClass(stickyClass);
                    
                }
            }
        }
    }

    window.addEvent('domready', function() {
        M17StickyFooter.init();
    });

})();
