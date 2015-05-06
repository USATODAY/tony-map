define(
    [
        'jquery',
        'underscore',
        'templates',
        'config',
        'mapbox',
        'api/analytics'
    ],
    function (jQuery, _, templates, config, L, Analytics) {
        var app = app || {};

        app.objData = {};

        app.init = function () {
            app.loadData();
        };

        var iconSize = 40;
        var iconAnchor = [iconSize / 2, iconSize / 2];
        var popupAnchor = [0, - (iconSize / 2)];

        var $detailPanel;

        app.loadData = function () {
            var hostname = window.location.hostname;
            var strURL;

            if (hostname != "www.gannett-cdn.com") {
                strURL = "http://" + hostname + "/services/webproxy/?url=" + "http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/data/data.json";
            } else {
                strURL = "http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/data/data.json";
            }

            if (hostname != "localhost") {
                jQuery.getJSON(strURL, function (data) { //"http://" + hostname + "/services/webproxy/?url=" + strURL, function (data)
                    app.objData = data;
                    app.render();
                    app.setupMap();
                });
            } else {
                jQuery.getJSON('/data/data.json', function (data) {
                    app.objData = data;
                    app.render();
                    app.setupMap();
               });
            }
        };

        app.render = function() {
            $('.iapp-page-wrap').html(templates['app.html']({head: app.objData[0].project_head, chatter: app.objData[0].chatter}));
            $('.iapp-share-wrap').html(templates['share.html'](app.createShare(app.objData[0].project_share)));
            $('.iapp-key-wrap').html(templates['key.html']());
            $detailPanel = $(".iapp-detail-panel");

            $(".social-popup").click(app.socialClick);
        };

        app.setupMap = function () {
            var strImageBase = "http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/";
            jQuery(".js-head").html(app.objData[0].project_head);
            jQuery(".js-chatter").html(app.objData[0].chatter);
            L.mapbox.accessToken = 'pk.eyJ1IjoiZGdhaW5lciIsImEiOiJyWkE2bndZIn0.dMIRp-JYsg6ZJRKsMu9-nA';
            var map = L.mapbox.map('map', 'usatodaygraphics.basemap')
                .setView([40.7583, -73.9789], 14);

            L.control.scale().addTo(map);

            var geoJson = {};
            geoJson.features = [];
            jQuery.each(app.objData[0].theaters, function(index){
                var feature = {};
                feature.type = "Feature";
                feature.properties = {};
                feature.properties.title = app.objData[0].theaters[index].name;
                // feature.properties["marker-color"] = "#008A2E";
                feature.properties.icon = {
                    "iconUrl": "http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/theatre_loop.gif",
                    "iconSize": [iconSize, iconSize],
                    "iconAnchor": iconAnchor, // point of the icon which will correspond to marker's location
                    "popupAnchor": popupAnchor, // point from which the popup should open relative to the iconAnchor
                    "className": "dot"
                };
                // feature.properties["marker-size"] = "medium";
                // feature.properties["marker-symbol"] = "cinema";
                feature.properties.location_type = "theater";
                if (app.objData[0].theaters[index].shows[0].image !== "") {
                    feature.properties.image = "<img src=\"" + strImageBase + app.objData[0].theaters[index].shows[0].image + "\" class='map-img'/> <h2>" + app.objData[0].theaters[index].shows[0].name + "</h2><p><span class=\"subhead\">Description:</span> " + app.objData[0].theaters[index].shows[0].description + "</p><p><span class=\"subhead\">Theater:</span> " + app.objData[0].theaters[index].name + "<br>" + app.objData[0].theaters[index].address_geocode;
                } else {
                    feature.properties.image = "<img src=\"" + strImageBase + "na.jpg\"  class='map-img'/> <h2>" + app.objData[0].theaters[index].shows[0].name + "</h2><p><span class=\"subhead\">Description:</span> " + app.objData[0].theaters[index].shows[0].description + "</p><p><span class=\"subhead\">Theater:</span> " + app.objData[0].theaters[index].name + "<br>" + app.objData[0].theaters[index].address_geocode;
                }
                feature.geometry = {};
                feature.geometry.type = "Point";
                feature.geometry.coordinates = [];
                feature.geometry.coordinates[0] = app.objData[0].theaters[index].longitude;
                feature.geometry.coordinates[1] = app.objData[0].theaters[index].latitude;
                geoJson.features.push(feature);
            });

            jQuery.each(app.objData[0].restaurants, function(index){
                var feature = {};
                feature.type = "Feature";
                feature.properties = {};
                feature.properties.title = app.objData[0].restaurants[index].name;
                feature.properties.icon = {
                    "iconUrl": "http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/wine_loop.gif",
                    "iconSize": [iconSize, iconSize],
                    "iconAnchor": iconAnchor, // point of the icon which will correspond to marker's location
                    "popupAnchor": popupAnchor, // point from which the popup should open relative to the iconAnchor
                    "className": "dot"
                };
                feature.properties.location_type = "restaurant";
                feature.properties["marker-color"] = "#008A2E";
                feature.properties["marker-size"] = "medium";
                feature.properties["marker-symbol"] = "restaurant";
                if (app.objData[0].restaurants[index].image !== "") {
                    feature.properties.image = "<img src=\"" + strImageBase + app.objData[0].restaurants[index].image + "\" class='map-img'/> <h2>" + app.objData[0].restaurants[index].name + "</h2><p><span class=\"subhead\">Description:</span> " + app.objData[0].restaurants[index].description + "</p><p><span class=\"subhead\">Info:</span> " + app.objData[0].restaurants[index].website + "<br>" + app.objData[0].restaurants[index].address_geocode;
                } else {
                    feature.properties.image = "<img src=\"" + strImageBase + "na.jpg\" class='map-img' /> <h2>" + app.objData[0].restaurants[index].name + "</h2><p><span class=\"subhead\">Description:</span> " + app.objData[0].restaurants[index].description + "</p><p><span class=\"subhead\">Info:</span> " + app.objData[0].restaurants[index].website + "<br>" + app.objData[0].restaurants[index].address_geocode;
                }
                feature.geometry = {};
                feature.geometry.type = "Point";
                feature.geometry.coordinates = [];
                feature.geometry.coordinates[0] = app.objData[0].restaurants[index].longitude;
                feature.geometry.coordinates[1] = app.objData[0].restaurants[index].latitude;
                geoJson.features.push(feature);
            });

            jQuery.each(app.objData[0].hotels, function(index){
                var feature = {};
                feature.type = "Feature";
                feature.properties = {};
                feature.properties.title = app.objData[0].hotels[index].name;
                feature.properties.icon = {
                    "iconUrl": "http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/bell_loop.gif",
                    "iconSize": [iconSize, iconSize],
                    "iconAnchor": iconAnchor, // point of the icon which will correspond to marker's location
                    "popupAnchor": popupAnchor, // point from which the popup should open relative to the iconAnchor
                    "className": "dot"
                };
                feature.properties.location_type = "hotel";
                feature.properties["marker-color"] = "#008A2E";
                feature.properties["marker-size"] = "medium";
                feature.properties["marker-symbol"] = "commercial";
                if (app.objData[0].hotels[index].image !== "") {
                    feature.properties.image = "<img src=\"" + strImageBase + app.objData[0].hotels[index].image + "\" class='map-img'/> <h2>" + app.objData[0].hotels[index].name + "</h2><p><span class=\"subhead\">Description:</span> " + app.objData[0].hotels[index].description + "</p><p><span class=\"subhead\">Info:</span> " + app.objData[0].hotels[index].website + "<br>" + app.objData[0].hotels[index].address_geocode;
                } else {
                    feature.properties.image = "<img src=\"" + strImageBase + "na.jpg\" class='map-img' /> <h2>" + app.objData[0].hotels[index].name + "</h2><p><span class=\"subhead\">Description:</span> " + app.objData[0].hotels[index].description + "</p><p><span class=\"subhead\">Info:</span> " + app.objData[0].hotels[index].website + "<br>" + app.objData[0].hotels[index].address_geocode;
                }
                feature.geometry = {};
                feature.geometry.type = "Point";
                feature.geometry.coordinates = [];
                feature.geometry.coordinates[0] = app.objData[0].hotels[index].longitude;
                feature.geometry.coordinates[1] = app.objData[0].hotels[index].latitude;
                geoJson.features.push(feature);
            });

            var myLayer = L.mapbox.featureLayer().addTo(map);

// Add the iframe in a marker tooltip using the custom feature properties
            myLayer.on('layeradd', function (e) {
                var marker = e.layer,
                    feature = marker.feature;

                // Create custom popup content from the GeoJSON property 'video'
                var popupContent = feature.properties.image;

                //set icon
                if (feature.properties.icon !== undefined) {
                    marker.setIcon(L.icon(feature.properties.icon));
                }

                var popupWidth = 400;

                if (config.isMobile) {
                    popupWidth = 290;
                }

                // bind the popup to the marker http://leafletjs.com/reference.html#popup
                
                marker.addEventListener("click", app.handleClick);
                marker.bindPopup(feature.properties.title);
                
            });

// Add features to the map
            myLayer.setGeoJSON(geoJson);
        };

        app.handleClick = function(e) {
            var props = e.target.feature.properties;
            var entry;
            switch (props.location_type) {
                case "restaurant":
                    entry = _.findWhere(app.objData[0].restaurants, {"name": props.title});
                    $detailPanel.html(templates["details.html"](entry));
                    break;
                case "hotel":
                    entry = _.findWhere(app.objData[0].hotels, {"name": props.title});
                    $detailPanel.html(templates["details.html"](entry));
                    break;
                case "theater":
                    entry = _.findWhere(app.objData[0].theaters, {"name": props.title});
                    $detailPanel.html(templates["theaterdetails.html"](entry));
                    break;
            }

            $detailPanel.addClass("iapp-show");
            $('.iapp-main-panel').addClass('iapp-slide');
            $('.iapp-detail-close-button').click(function() {
                app.closeDetails();
            });

        };

        app.closeDetails = function() {
            $detailPanel.removeClass("iapp-show");
            $('.iapp-main-panel').removeClass('iapp-slide');
        };

        app.createShare = function(shareString) {
            var shareURL = window.location.href;
            var fbShareURL = encodeURI(shareURL.replace('#', '%23'));
            var twitterShareURL = encodeURIComponent(shareURL);
            var emailLink = "mailto:?body=" + encodeURIComponent(shareString) +  "%0d%0d" + twitterShareURL + "&subject=";
            
            return {
                'fb_id': config.facebook.app_id,
                fbShare:  encodeURI(shareURL.replace('#', '%23')),
                stillimage: "http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/fb-post.jpg",
                encodedShare: encodeURIComponent(shareString),
                fb_redirect: 'http://' + window.location.hostname + '/pages/interactives/fb-share/',
                email_link: "mailto:?body=" + encodeURIComponent(shareString) +  "%0d%0d" + encodeURIComponent(shareURL) + "&subject=",
                twitterShare: encodeURIComponent(shareURL)
            };

        };

        app.socialClick = function(e) {
            e.preventDefault();
            Analytics.trackEvent('Share button clicked: ' + jQuery(e.currentTarget).attr('id'));

            app.windowPopup(e.currentTarget.href, 500, 300);
        };

        app.windowPopup = function(url, width, height) {
            // Calculate the position of the popup so
            // it’s centered on the screen.
            var left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

            window.open(
                url,
                "",
                "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
            );
        };

        return app;
    });
