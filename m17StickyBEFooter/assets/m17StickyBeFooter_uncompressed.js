/* Stcky Footer for Contao
 * @author: Joe Ray Gregory aka may17
 * @copyright: Joe Ray Gregory 2012 joe@may17.de
 * @license LGPL
 */
(function() {
    var M17StickyFooter = {
        init: function() {
            var formBody = document.getElement('.tl_formbody_submit') || false,
                pos,
                formHeight,
                tt,
                formBodyPos,
                difference,
                setEvent,
                fieldsetEl,
                self = this;

            //invoke only when the element existists
            if(formBody) {
                formBodyPos = formBody.getPosition;
                formHeight = formBody.getHeight();
                tt = formBodyPos.y + 49;
                pos = formBody.getPosition().y + formBody.getHeight();

                //load the methoad with init
                this.setItem(formBody);
                
               	//Prepare event
               	setEvent = this.setItem.bind(this).pass(formBody);
               	
               	//Add resize and scroll events
                window.addEvents({
                    'scroll': setEvent,
                    'resize': setEvent,
                    'ajax_change': setEvent
                });
                
                //addEvent Delegation for legends
                fieldsetEl = $$('fieldset');
                fieldsetEl.addEvent('click:relay(legend)', function(e){
                    self.setItem(formBody);
                });
                
                //Improvment for checkbox actions
                fieldsetEl.addEvent('click:relay(input.tl_checkbox[onclick])', function(e){
                    self.setItem(formBody);
                });
            }
        },
        /* initStickyFooter
         * @desc initialize the stickyFooter for Backend
         */
        setItem: function(formBody) {
            var raffle = formBody.getPosition().y +49,
            	diff = raffle - window.getHeight(),
            	formBodyInner = formBody.getFirst(),
            	_width = formBodyInner.getStyle('width'),
				$this = window,
                $body = document.body,
                stickyClass = 'stickySave',
            	scrollSizeToInt = $this.getScroll().y.toInt();
            	
            if(scrollSizeToInt > diff) {
                $body.removeClass(stickyClass);
            } else {
                //check if class is set
                if(!$body.hasClass(stickyClass)) {
                    formBodyInner.setStyle('width', _width);
                    $body.addClass(stickyClass);
                }
            }
        }
    }
    window.addEvent('domready', function() {
        M17StickyFooter.init();
        this.scrollTo(0, 1);
    });
})();