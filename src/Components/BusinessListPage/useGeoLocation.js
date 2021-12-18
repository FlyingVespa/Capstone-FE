import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGeoLocation = () => {

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
};
// export default useGeoLocation
// const showMyLocation = () => {
//     if (location.loaded && !location.error) {
//       mapRef.current.leafletElement.flyTo(
//         [location.coordinates.lat, location.coordinates.lng],
//         ZOOM_LEVEL,
//         { animate: true }
//       );
//     } else {
//       alert(location.error.message);
//     }
//   };



//   navigator.permissions.query({name:'geolocation'}).then(function(result) {
//     if (result.state === 'granted') {
//       showMap();
//     } else if (result.state === 'prompt') {
//       showButtonToEnableMap();
//     }
//     // Don't do anything if the permission was denied.
//   });


const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = (error) => {
        setLocation({
            loaded: true,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeoLocation;