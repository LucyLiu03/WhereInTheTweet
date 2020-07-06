var geoJsonLayer = 0;
var lastData = [];
var url = '/data';


function popUp(feature, layer) {
if (feature.properties){
    var PopupText = [];
    PopupText.push("<b>" + feature.properties.name + "</b>");
    PopupText.push("<br/><br/>Location: " + feature.geometry.coordinates);
    layer.bindPopup("<p>" + PopupText.join("") + "</p>");
  }
}

var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

function pointToLayer(feature,latlng){
  var marker = L.circleMarker(latlng,geojsonMarkerOptions);
  //marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT);
  return marker;
}
var mcg = L.markerClusterGroup();

function getJson(){
  $.getJSON(url, function(data){
      if(data.length < 15){
        lastData.append(data);
        data = lastData;
      }
      //creates new layers of markers to keep refreshing 
      //map.removeLayer(geoJsonLayer);
      //mcg.clearLayers()
      geoJsonLayer = L.geoJson(data, {onEachFeature: popUp});
      mcg.addLayer(geoJsonLayer)
      map.addLayer(mcg);
  });
}

//var clusters = L.markerClusterGroup();
(function(){
  $.getJSON(url, function(data){
    geoJsonLayer = L.geoJson(data, {onEachFeature: popUp});
    lastData = data;
    //geoJsonLayer.addTo(map);
    //var newLayer = L.featureGroup.subGroup(mcg);

    geoJsonLayer = L.geoJson(data, {onEachFeature: popUp});
    mcg.addLayer(geoJsonLayer)
    //newLayer.addLayer(geoJsonLayer)
    map.addLayer(mcg);
  });
var counter = setInterval(getJson, 5000);
})();
