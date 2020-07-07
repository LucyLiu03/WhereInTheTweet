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

var twitterIcon = L.icon({
    iconUrl: 'C:\Users\lucyy\Desktop\WhereInTheTweet\static',
    iconSize: [50,40]
  }); 



var mcg = L.markerClusterGroup();

function getJson(){
  $.getJSON(url, function(data){
      if(data.length < 15){
        lastData.append(data);
        data = lastData;
      }
      //clears layers 
      //map.removeLayer(geoJsonLayer);
      //mcg.clearLayers()
      //creates new layers of markers 
      geoJsonLayer = L.geoJson(data, {onEachFeature: popUp});
      mcg.addLayer(geoJsonLayer)
      map.addLayer(mcg);
  });
}

//var clusters = L.markerClusterGroup();
(function(){
  $.getJSON(url, function(data){
    //geoJsonLayer = L.geoJson(data, {onEachFeature: popUp});
    geoJsonLayer = L.geoJson(data, {onEachFeature: popUp});
    lastData = data;
    //geoJsonLayer.addTo(map);
    //geoJsonLayer = L.geoJson(data, {onEachFeature: popUp});
    mcg.addLayer(geoJsonLayer)
    //newLayer.addLayer(geoJsonLayer)
    map.addLayer(mcg);
  });
var counter = setInterval(getJson, 5000);
})();
