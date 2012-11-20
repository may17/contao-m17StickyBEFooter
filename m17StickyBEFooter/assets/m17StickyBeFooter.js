/* Stcky Footer for Contao
 * @author: Joe Ray Gregory aka may17
 * @copyright: Joe Ray Gregory 2012 joe@may17.de
 * @license LGPL
 */
(function(){var a={init:function(){var c=document.getElement(".tl_formbody_submit")||false,h,e,f,j,b,d,g,i=this;if(c){j=c.getPosition;e=c.getHeight();f=j.y+49;h=c.getPosition().y+c.getHeight();this.setItem(c);d=this.setItem.bind(this).pass(c);window.addEvents({scroll:d,resize:d,ajax_change:d});g=$$("fieldset");g.addEvent("click:relay(legend)",function(k){i.setItem(c)});g.addEvent("click:relay(input.tl_checkbox[onclick])",function(k){i.setItem(c)})}},setItem:function(f){var c=f.getPosition().y+49,j=c-window.getHeight(),b=f.getFirst(),d=b.getStyle("width"),h=window,g=document.body,e="stickySave",i=h.getScroll().y.toInt();if(i>j){g.removeClass(e)}else{if(!g.hasClass(e)){b.setStyle("width",d);g.addClass(e)}}}};window.addEvent("domready",function(){a.init();this.scrollTo(0,1)})})();