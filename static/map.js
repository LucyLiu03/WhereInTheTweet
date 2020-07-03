//use geoJSON to include new layers of tweet locations 
var geoJsonLayer = 0;
var lastData = [];
var url = '/data';


function popUp(feature, layer) {
if (feature.properties){
    var PopupText = [];
    //PopupText.push("<b>" + feature.properties.name + "</b>");
    PopupText.push("<br/><br/>Location: " + feature.geometry.coordinates);
    layer.circle.bindPopup("<p>" + PopupText.join("") + "</p>");
  }
}

function getJson(){
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