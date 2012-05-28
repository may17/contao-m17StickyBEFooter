/* Stcky Footer for Contao
 * @author: Joe Ray Gregory aka may17
 * @copyright: Joe Ray Gregory 2012 joe@may17.de
 * @license LGPL
 */
(function(){Backend.stickyFooter={init:function(){var a=$$(".tl_formbody_submit")[0]||false,e,d;if(a){var c=a.getHeight();var b=document.id("footer").getPosition().y-2;var e=a.getPosition().y+a.getHeight();this.difference=b-window.getHeight();this.formPos=a.getPosition().y;this.setItem(a);window.addEvent("scroll",function(){this.setItem(a)}.bind(this))}},setItem:function(b){var c=document.id("footer").getPosition().y-2;var g=c-window.getHeight();var f=window,e=document.body,d="stickySave";var a=f.getScroll().y.toInt();if(a>g){e.removeClass(d)}else{if(!e.hasClass(d)){e.addClass(d)}}}};window.addEvent("domready",function(){Backend.stickyFooter.init()})})();