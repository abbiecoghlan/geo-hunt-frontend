let currentLat
let currentLong

function initMap() {
    const myLatlng = { lat: 0, lng: 0 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 1,
      center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: myLatlng,
    });
    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
      // Close the current InfoWindow.
      infoWindow.close();
      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      );
      infoWindow.open(map);

      currentLat = mapsMouseEvent.latLng.toJSON().lat
      currentLong = mapsMouseEvent.latLng.toJSON().lng
      
      const lat = mapsMouseEvent.latLng.toJSON().lat
      const long = mapsMouseEvent.latLng.toJSON().lng
  
      if (verify(-33.85291132953081, 151.20974884396315, lat, long, .005)){
        console.log("YOU WIN")
      } else {
        console.log("try again")
      }

    });
  }
  
  const verify = (latitude, longitude, guessLat, guessLong, length=.01) => {
    const minLat = latitude - length
    const maxLat = latitude + length
    
    const minLongitude = longitude - length
    const maxLong = longitude + length
  
    if (guessLat >= minLat && guessLat <= maxLat && guessLong >= minLongitude && guessLong <= maxLong){
      return true
    }
  }