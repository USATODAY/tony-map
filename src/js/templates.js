define(function(){

this["templates"] = this["templates"] || {};

this["templates"]["app.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- PROJECT HEAD -->\n<div class="iapp-head-wrap">\n    <h2 class="iapp-page-header">' +
((__t = ( head )) == null ? '' : __t) +
'</h2>\n    <p class="iapp-page-chatter">' +
((__t = ( chatter )) == null ? '' : __t) +
'</p>\n    <div class="iapp-share-wrap"></div>\n    <div class="iapp-key-wrap"></div>\n</div>\n\n\n<!-- MAIN CONTENT -->\n<div class=\'main-content-wrap\'>\n\n    <div id=\'map\'></div>\n\n</div>\n\n\n<!-- FOOTER -->\n<div class=\'iapp-footer-wrap cf\'>\n    <!-- CREDITS LIST  -->\n</div>\n\n<div class="iapp-panel iapp-detail-panel hide"></div>\n\n\n';

}
return __p
};

this["templates"]["details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="iapp-detail-wrap">\n    <div class="iapp-detail-close-button"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/close-icon-grey.svg" alt="close" /></div>\n    <div class="iapp-detail-image-wrap">\n        ';
 if (image !== "") { ;
__p += '\n        <img class="iapp-detail-image" src="http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/' +
((__t = ( image )) == null ? '' : __t) +
'" alt="">\n            ';
 } else {;
__p += '\n            <img class="iapp-detail-image" src="http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/na.jpg" alt="">\n            ';
 } ;
__p += '\n    </div>\n\n    <h3 class="iapp-detail-title">' +
((__t = ( name )) == null ? '' : __t) +
'</h3>\n    <p class="iapp-detail-description">' +
((__t = ( description )) == null ? '' : __t) +
'</p>\n    <p class="iapp-detail-info">' +
((__t = ( address_geocode )) == null ? '' : __t) +
' </p>\n    <p class="iapp-detail-info"><a href="' +
((__t = (website)) == null ? '' : __t) +
'" target="_blank"> website</a></p>\n</div>\n';

}
return __p
};

this["templates"]["key.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="iapp-key-entry">\n    <img class="iapp-key-img" src="http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/theatre_loop.gif" alt="Theater">\n    <span class="iapp-key-label">Theaters</span>\n</div>\n<div class="iapp-key-entry">\n    <img class="iapp-key-img" src="http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/bell_loop.gif" alt="Hotel">\n    <span class="iapp-key-label">Hotels</span>\n</div>\n<div class="iapp-key-entry">\n    <img class="iapp-key-img" src="http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/wine_loop.gif" alt="Restaurant">\n    <span class="iapp-key-label">Restaurants</span>\n</div>\n';

}
return __p
};

this["templates"]["share.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="social">\n    <a class="tshare social-popup" href="https://twitter.com/intent/tweet?url=' +
((__t = (twitterShare)) == null ? '' : __t) +
'&text=' +
((__t = (encodedShare)) == null ? '' : __t) +
'"><img class="social-icon" src="http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/twitter.svg" alt="Share"  border="0"></a>\n    <a class="eshare " href="' +
((__t = (email_link)) == null ? '' : __t) +
'" ><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/email.svg" alt="Share"  class="social-icon" border="0"></a>\n    <a class="fbshare social-popup" href="https://www.facebook.com/dialog/feed?display=popup&app_id=' +
((__t = (fb_id)) == null ? '' : __t) +
'&link=' +
((__t = (fbShare)) == null ? '' : __t) +
'&picture=' +
((__t = (stillimage)) == null ? '' : __t) +
'&name=&description=' +
((__t = (encodedShare)) == null ? '' : __t) +
'&redirect_uri=' +
((__t = (fb_redirect)) == null ? '' : __t) +
'"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/fb.svg" class="social-icon" alt="Share"  border="0"></a>\n</div>\n';

}
return __p
};

this["templates"]["template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>' +
((__t = (test)) == null ? '' : __t) +
'</h3>\n';

}
return __p
};

this["templates"]["theaterdetails.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="iapp-detail-wrap">\n    <div class="iapp-detail-close-button"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/close-icon-grey.svg" alt="close" /></div>\n    <div class="iapp-detail-image-wrap">\n        ';
 if (shows[0].image !== "") { ;
__p += '\n        <img class="iapp-detail-image" src="http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/' +
((__t = ( shows[0].image)) == null ? '' : __t) +
' " alt="">\n        ';
 } else {;
__p += '\n            <img class="iapp-detail-image" src="http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/na.jpg" alt="">\n        ';
 } ;
__p += '\n    </div>\n\n    <h3 class="iapp-detail-title">' +
((__t = ( name )) == null ? '' : __t) +
'</h3>\n    <h3 class="iapp-detail-title">' +
((__t = ( shows[0].name )) == null ? '' : __t) +
'</h3>\n    <p class="iapp-detail-description">' +
((__t = ( shows[0].description )) == null ? '' : __t) +
'</p>\n    <p class="iapp-detail-info">' +
((__t = ( address_geocode )) == null ? '' : __t) +
' </p>\n</div>\n';

}
return __p
};

  return this["templates"];

});