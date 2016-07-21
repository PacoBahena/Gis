




function leafletExample(){

  // var latlon = [19.415120, -99.178637];

  var latlon = [46.0463697, 14.5009232];

  // initialize the Leaflet map, set the initial center and zoom level
  var map = L.map('mapid').setView(latlon, 12);

  // initialize map layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
  }).addTo(map);

  // set the iso4app engine
  var isoEngine = new iso4app.Engine();

  //invoke the engine requiring a 10min isochrone with
  // - approximation of 100 meters
  // - BICYCLE travel type
  // - FAST speed
  var isoline = isoEngine.getIsoline(latlon[0],latlon[1],iso4app.Time.SECONDS_600,10000,iso4app.Mobility.BICYCLE,iso4app.Speed.FAST);

  if (isoline.errcode=="0"){
    //service responds without error

    // draw isodistance polygon
    var polyCoords = Array(), coord, polygon, isocoords = isoline.isocoords.split(",");
    
    //DAVID, NO ESTOY SEGURO PERO CREO QUE LAS COORDENADAS SE GUARDAN EN ISOCOORDS
      


    for(j = 0; j < isocoords.length; j++){
      coord = (isocoords[j]+"").trim().split(" ");
      polyCoords[j] = L.latLng((coord[0]+" ").trim(),(coord[1]+" ").trim());
    }
    polygon = L.polygon(polyCoords,{color: "#0066cc",fillOpacity:.2,weight:2});
    map.addLayer(polygon);

    // draw a marker on start point returned by the service
    var startPoint = isoline.startpoint.split(" ");
    L.marker(startPoint).addTo(map)
      .bindPopup('10min Isochrone<br/>'+isoline.startpoint);

  } else {
    //print error message on console
    console.log(isoline.errcode+":"+isoline.errmsg);
  }

  //probaremos si se puede guardar la isocrona.

        


}
