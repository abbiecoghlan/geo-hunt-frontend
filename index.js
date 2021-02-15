function initMap() {
  const myLatlng = { lat: -25.363, lng: 131.044 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
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
    const lat = mapsMouseEvent.latLng.toJSON().lat
    const lang = mapsMouseEvent.latLng.toJSON().lng

    if (verify(-33.85291132953081, 151.20974884396315, lat, lang)){
      console.log("YOU WIN")
    } else {
      console.log("try again")
    }
    // debugger
  });
}

const verify = (latitude, longitude, guessLat, guessLong) => {
  const minLat = latitude - .01
  const minLongitude = longitude - .01

  const maxLat = latitude + .01
  const maxLong = longitude + .01
  // debugger
  if (guessLat >= minLat && guessLat <= maxLat && guessLong >= minLongitude && guessLong <= maxLong){
    return true
  }
}





// function initMap() {
//   const myLatlng = { lat: -25.363, lng: 131.044 };
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: myLatlng,
//   });
//   const marker = new google.maps.Marker({
//     position: myLatlng,
//     map,
//     title: "Click to zoom",
//   });
//   // map.addListener("center_changed", () => {
//   //   // 3 seconds after the center of the map has changed, pan back to the
//   //   // marker.
//   //   window.setTimeout(() => {
//   //     map.panTo(marker.getPosition());
//   //   }, 3000);
//   // });
//   marker.addListener("click", () => {
//     console.log('button pressed!')
//   });
// }