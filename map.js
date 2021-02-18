let currentLat
let currentLong

let targetLat
let targetLong

let radiusLimit

// resset map zoom upon victory or giving up

function initMap() {
    const myLatlng = { lat: 0, lng: 0 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 1,
      center: myLatlng,
    });


    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
  
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
    
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to select a location!",
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

    });
  }
  
  const verify = (latitude, longitude, guessLat, guessLong, radiusLimit) => {
    debugger
    const r = Math.sqrt((guessLat-latitude)**2+(guessLong-longitude)**2)
    
    if (r <= radiusLimit){
      console.log("YOU WIN")
      puzzleCompletion()
      // fetch attempt back to api with updated status (successful)
      } else {
        console.log("try again")
        const p = document.getElementById('incorrect')

        p.style.display = "block"

        setTimeout(() => {
          p.style.display = "none"
        }, 4000)
      }
  }

  // const minLat = latitude - length
  // const maxLat = latitude + length
  
  // const minLongitude = longitude - length
  // const maxLong = longitude + length



  // if (guessLat >= minLat && guessLat <= maxLat && guessLong >= minLongitude && guessLong <= maxLong){
  //   return true
  // }