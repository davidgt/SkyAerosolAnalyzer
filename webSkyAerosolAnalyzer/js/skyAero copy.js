function initialize() {
    
    var markerChris;
    
    var datos;
    
//    var minZoomLevel = 6;
//    var maxZoomLevel = 7;
    
    var mapOptions = {
        center: {
            lat: 30,
            lng: 0
        },
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        panControl:false,
        zoomControl:false,
        mapTypeControl:false,
        scaleControl:false,
        streetViewControl:false,
        overviewMapControl:false,
        rotateControl:false
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
//    var imgIcon = 'img/prueba.png';
    
    $.ajax({
        type: 'GET',
        url: '/jslab/skyAnalPOC/data/datosLoc.json',
        dataType: 'json',
        success: function (data) {
//            console.log(data);
            datos = data;
            $.each(data.aot, function (key, data) {
                
//                markerChris = new google.maps.Marker({
//                    position: {
//                        lat: data.lat,
//                        lng: data.lng
//                    },
//                    icon: {
//                        path: google.maps.SymbolPath.CIRCLE,
//                        scale: data.tam,
//                        strokeColor: 'black',
//                        strokeOpacity: 1,
//                        strokeWeight: 1,
//                        fillColor: data.level == 1 ? '#00FFDC' :
//                        data.level == 1 ? '#BFFF00' : data.level == 2 ? '#FFFF00' :
//                        data.level == 3 ? '#FFFF00' : data.level == 4 ? '#FF9E00' : '#F50000',
//                        fillOpacity: 0.3
//                    },
//                    map: map
//                });
            });
        },
        error: function (result) {
            alert('Arrrrrrrg algo ha ido mal :S');
        }
    });
    
    // Bounds for North America
//   var strictBounds = new google.maps.LatLngBounds(
//     new google.maps.LatLng(41.333, -1.50), 
//     new google.maps.LatLng(39.85, -5.90)
//   );

   // Listen for the dragend event
//   google.maps.event.addListener(map, 'dragend', function() {
//     if (strictBounds.contains(map.getCenter())) return;
//
//     // We're out of bounds - Move the map back within the bounds
//
//     var c = map.getCenter(),
//         x = c.lng(),
//         y = c.lat(),
//         maxX = strictBounds.getNorthEast().lng(),
//         maxY = strictBounds.getNorthEast().lat(),
//         minX = strictBounds.getSouthWest().lng(),
//         minY = strictBounds.getSouthWest().lat();
//
//     if (x < minX) x = minX;
//     if (x > maxX) x = maxX;
//     if (y < minY) y = minY;
//     if (y > maxY) y = maxY;
//
//     map.setCenter(new google.maps.LatLng(y, x));
//   });

   // Limit the zoom level
   google.maps.event.addListener(map, 'zoom_changed', function() {
     
       
//       if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
//     if (map.getZoom() > maxZoomLevel) map.setZoom(maxZoomLevel);

       
              console.log('joer ' + map.getZoom());
//       if (map.getZoom() == 7) {
//           console.log('joer la ostiga' + datos);
//           $.each(datos.aot, function (key, data) {
//               
//               clearMarkers();
//                markerChris = new google.maps.Marker({
//                    position: {
//                        lat: data.lat,
//                        lng: data.lng
//                    },
//                    icon: {
//                        path: google.maps.SymbolPath.CIRCLE,
//                        scale: data.tam - 10,
//                        strokeColor: 'black',
//                        strokeOpacity: 1,
//                        strokeWeight: 1,
//                        fillColor: data.level == 1 ? '#00FFDC' :
//                        data.level == 1 ? '#BFFF00' : data.level == 2 ? '#FFFF00' :
//                        data.level == 3 ? '#FFFF00' : data.level == 4 ? '#FF9E00' : '#F50000',
//                        fillOpacity: 0.3
//                    },
//                    map: map
//                });
//            });
//       }
   });
    
    
}

google.maps.event.addDomListener(window, 'load', initialize);