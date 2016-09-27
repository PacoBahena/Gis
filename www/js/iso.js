




function leafletExample(){



                  

  var latlon = [19.3908451 ,-99.191574];

 

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

  // aprox 1000, 20 min, 30 min, 45 min. para coche.   trafico pesado = 5kmph y verylow


  // var isoline = isoEngine.getIsoline(latlon[0],latlon[1],iso4app.Time.SECONDS_2700,1000,
  //  iso4app.Mobility.MOTOR_VEHICLE,iso4app.Speed.VERY_LOW,iso4app.speed=10);

  var isoline = isoEngine.getIsoline(latlon[0],latlon[1],iso4app.Time.SECONDS_1800,1000,
  iso4app.Mobility.PEDESTRIAN,iso4app.Speed.LOW);

  if (isoline.errcode=="0"){
    //service responds without error

    // draw isodistance polygon
    var polyCoords = Array(), coord, polygon, isocoords = isoline.isocoords.split(",");
    console.log(isocoords);

    window.open('cords').document.body.innerHTML = '<h1>Las coordenadas de la primera</h1><p>'+isocoords+'</p>';
    
     


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
