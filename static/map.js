//use geoJSON to include new layers of tweet locations 
var geoJsonLayer = 0;
var lastData = [];
var url = '/data';

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
 subdomains: ['a','b','c']
}).addTo( map );

var myIcon = L.icon({
  iconUrl: myURL + 'images/pin24.png',
  iconRetinaUrl: myURL + 'images/pin48.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

function popUp(feature, layer) {
    if (feature.properties){
        var PopupText = [];
        PopupText.push("<b>" + feature.properties.name + "</b>");
        PopupText.push("<br/><br/>Location: " + feature.geometry.coordinates);
        layer.bindPopup("<p>" + PopupText.join("") + "</p>");
      }
    }


var markerClusters = L.markerClusterGroup();

for ( var i = 0; i < data.length; ++i )
{
  /*var popup = data[i].name +
              '<br/>' + markers[i].city +
              '<br/><b>IATA/FAA:</b> ' + markers[i].iata_faa +
              '<br/><b>ICAO:</b> ' + markers[i].icao +
              '<br/><b>Altitude:</b> ' + Math.round( markers[i].alt * 0.3048 ) + ' m' +
              '<br/><b>Timezone:</b> ' + markers[i].tz;
    */
    print([trial[i]])
    var m = L.marker( [trial[i][coordinates]]);

  markerClusters.addLayer( m );
}

map.addLayer( markerClusters );

/*function getJson(){
  $.getJSON(url, function(data){
      if(data.length < 50){
        lastData.append(data);
        data = lastData;
      }
      map.removeLayer(geoJsonLayer);
      //creates geoJsonLayer with popups
      geoJsonLayer = L.geoJson(data, {onEachFeature: popUp});
      geoJsonLayer.addTo(map);
  });
}

(function(){
  $.getJSON(url, function(data){
    geoJsonLayer = L.geoJson(data, {onEachFeature: popUp});
    lastData = data;
    geoJsonLayer.addTo(map);
  });
  var counter = setInterval(getJson, 5000);
})();
*/