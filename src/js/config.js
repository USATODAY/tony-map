define(
  [
    'jquery',
    'underscore'
  ],
  function(jQuery, _) {



    var isMobile, fb_app_id;

    var staticInfo = JSON.parse(jQuery(".staticinfo").html());

    if (staticInfo.platform == "desktop") {
        isMobile = false;
    } else {
        isMobile= true;
    }

    fb_app_id = staticInfo.facebook.app_id;

    return _.extend(staticInfo, {
        isMobile: isMobile,
    });
});
