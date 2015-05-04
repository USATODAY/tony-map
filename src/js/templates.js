define(function(){

this["templates"] = this["templates"] || {};

this["templates"]["app.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- PROJECT HEAD -->\n<div class="iapp-head-wrap">\n    <h2 class="iapp-page-header">Top 10 theathers, restaurants and hotels to experience broadway like a pro.</h2>\n    <p class="iapp-page-chatter">Use our interactive map to explore the best places of the theater district.</p>\n</div>\n\n\n<!-- MAIN CONTENT -->\n<div class=\'main-content-wrap\'>\n\n    <div id=\'map\'></div>\n\n</div>\n\n\n<!-- FOOTER -->\n<div class=\'iapp-footer-wrap cf\'>\n        <!-- CREDITS LIST  -->\n        <h6><strong>Credits:</strong> By Allen, Denny Gainer, Laura Petrecca and Mitchell Thorson, USA TODAY</h6>\n</div>\n\n\n';

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

  return this["templates"];

});