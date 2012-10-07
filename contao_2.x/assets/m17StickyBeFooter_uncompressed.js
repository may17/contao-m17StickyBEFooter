/* Stcky Footer for Contao
 * @author: Joe Ray Gregory aka may17
 * @copyright: Joe Ray Gregory 2012 joe@may17.de
 * @license LGPL
 */
(function() {
    StickyFooter = {
        init: function() {
            var formBody = $$('.tl_formbody_submit')[0] || false,
                pos,
                difference,
                self = this;

            //invoke only when the element existists
            if(formBody) {
                var formHeight = formBody.getHeight();
                var tt = $$('.tl_formbody_submit')[0].getPosition().y +49;
                var pos = formBody.getPosition().y + formBody.getHeight();
                this.difference = tt - window.getHeight();
                this.formPos = formBody.getPosition().y;

                //load the methoad with init
                this.setItem(formBody);
                window.addEvents({
                    'scroll': function(){
                        this.setItem(formBody);
                    }.bind(this),
                    'resize': function(){
                        this.setItem(formBody);
                    }.bind(this)
                });
                
                
                //addEvent Delegation
                $$('fieldset').addEvent('click:relay(legend)', function(e){
                    self.setItem(formBody);
                });
            }
        },
        /* initStickyFooter
         * @desc initialize the stickyFooter for Backend
         */
        setItem: function(formBody) {
            var raffle = $$('.tl_formbody_submit')[0].getPosition().y +49;
            var diff = raffle - window.getHeight();

            var $this = window,
                $body = document.getElement('body'),
                stickyClass = 'stickySave';
            var scrollSizeToInt = $this.getScroll().y.toInt();
            if(scrollSizeToInt > diff) {
                $body.removeClass(stickyClass);
            } else {
                //check if class set
                if(!$body.hasClass(stickyClass)) {
                    $body.addClass(stickyClass);
                }
            }
        }
    }
    window.addEvent('domready', function() {
        StickyFooter.init();
        this.scrollTo(0, 1);
    });
})();