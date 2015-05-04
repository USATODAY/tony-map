define(
    [
        'jquery',
        'underscore',
        'templates',
        'mapbox'
    ],
    function (jQuery, _, templates, L) {
        var app = app || {};

        app.objData = {};

        app.init = function () {
            app.loadData();
        };

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
                    app.setupMap();
                });
            } else {
                jQuery.getJSON('/data/data.json', function (data) {
                    app.objData = data;
                    app.setupMap();
                });
            }
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
                feature.properties["marker-color"] = "#008A2E";
                feature.properties["marker-size"] = "medium";
                feature.properties["marker-symbol"] = "cinema";
                if (app.objData[0].theaters[index].shows[0].image !== "") {
                    feature.properties.image = "<img src=\"" + strImageBase + app.objData[0].theaters[index].shows[0].image + "\" width=\"640\" height=\"390\" /> <h2>" + app.objData[0].theaters[index].shows[0].name + "</h2><p><span class=\"subhead\">Description:</span> " + app.objData[0].theaters[index].shows[0].description + "</p><p><span class=\"subhead\">Theater:</span> " + app.objData[0].theaters[index].name + "<br>" + app.objData[0].theaters[index].address_geocode;
                } else {
                    feature.properties.image = "<img src=\"" + strImageBase + "na.jpg\" width=\"640\" height=\"390\" /> <h2>" + app.objData[0].theaters[index].shows[0].name + "</h2><p><span class=\"subhead\">Description:</span> " + app.objData[0].theaters[index].shows[0].description + "</p><p><span class=\"subhead\">Theater:</span> " + app.objData[0].theaters[index].name + "<br>" + app.objData[0].theaters[index].address_geocode;
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
                feature.properties["marker-color"] = "#008A2E";
                feature.properties["marker-size"] = "medium";
                feature.properties["marker-symbol"] = "restaurant";
                if (app.objData[0].restaurants[index].image !== "") {
                    feature.properties.image = "<img src=\"" + strImageBase + app.objData[0].restaurants[index].image + "\" width=\"640\" height=\"390\" /> <h2>" + app.objData[0].restaurants[index].name + "</h2><p><span class=\"subhead\">Description:</span> " + app.objData[0].restaurants[index].description + "</p><p><span class=\"subhead\">Info:</span> " + app.objData[0].restaurants[index].website + "<br>" + app.objData[0].restaurants[index].address_geocode;
                } else {
                    feature.properties.image = "<img src=\"" + strImageBase + "na.jpg\" width=\"640\" height=\"390\" /> <h2>" + app.objData[0].restaurants[index].name + "</h2><p><span class=\"subhead\">Description:</span> " + app.objData[0].restaurants[index].description + "</p><p><span class=\"subhead\">Info:</span> " + app.objData[0].restaurants[index].website + "<br>" + app.objData[0].restaurants[index].address_geocode;
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
                feature.properties["marker-color"] = "#008A2E";
                feature.properties["marker-size"] = "medium";
                feature.properties["marker-symbol"] = "commercial";
                if (app.objData[0].hotels[index].image !== "") {
                    feature.properties.image = "<img src=\"" + strImageBase + app.objData[0].hotels[index].image + "\" width=\"640\" height=\"390\" /> <h2>" + app.objData[0].hotels[index].name + "</h2><p><span class=\"subhead\">Description:</span> " + app.objData[0].hotels[index].description + "</p><p><span class=\"subhead\">Info:</span> " + app.objData[0].hotels[index].website + "<br>" + app.objData[0].hotels[index].address_geocode;
                } else {
                    feature.properties.image = "<img src=\"" + strImageBase + "na.jpg\" width=\"640\" height=\"390\" /> <h2>" + app.objData[0].hotels[index].name + "</h2><p><span class=\"subhead\">Description:</span> " + app.objData[0].hotels[index].description + "</p><p><span class=\"subhead\">Info:</span> " + app.objData[0].hotels[index].website + "<br>" + app.objData[0].hotels[index].address_geocode;
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

                // bind the popup to the marker http://leafletjs.com/reference.html#popup
                marker.bindPopup(popupContent, {
                    closeButton: false,
                    minWidth: 320
                });
            });

// Add features to the map
            myLayer.setGeoJSON(geoJson);
        };


        return app;
    });
