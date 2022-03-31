import { useEffect } from "react";
import { useMap } from "react-leaflet";
import Locate from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";

const UserLocate = () => {
  // Access the map context with the useMap hook
  const map = useMap();

  // Add locate control once the map loads
  useEffect(() => {
    const locateOptions = {
      position: "topleft",
      flyTo: true,
      drawCircle: false,
      showPopup: false,
    };
    const locateControl = new Locate(locateOptions);
    locateControl.addTo(map);
  }, [map]);

  return null;
};

export default UserLocate;
