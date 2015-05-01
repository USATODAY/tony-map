define(
  [
    'jquery',
    'underscore',
    'templates',
    'mapbox'
  ],
  function(jQuery, _, templates, L){
    var app = app || {};

    app.init = function() {
      console.log(L.mapbox);
    };

    return app;

});
