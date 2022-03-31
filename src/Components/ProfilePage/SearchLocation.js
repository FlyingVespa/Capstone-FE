import { Component, useEffect } from "react";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  ZoomControl,
  LayersControl,
  useMapEvents,
  useMapEvent,
  useMap,
} from "react-leaflet";
import L, { LeafletMouseEvent, Map } from "leaflet";
import Locate from "leaflet-locate";

// Search Address Location
export function SearchLocation() {
  const map = useMap();
  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
    });
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);
  return null;
}
// Locate User Current Browser Position
export const UserLocate = () => {
  const map = useMap();
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

// Locate & Navigate To Store
class LocateStore extends Component {
  helpDiv;

  createButtonControl() {
    const MapHelp = L.Control.extend({
      onAdd: (map) => {
        const helpDiv = L.DomUtil.create("button", "btn btn-secondary");
        this.helpDiv = helpDiv;
        helpDiv.innerHTML = this.props.title;

        helpDiv.addEventListener("click", () => {
          console.log(map.getCenter());
          const marker = L.marker()
            .setLatLng(this.props.markerPosition)
            .bindPopup(this.props.description)
            .addTo(map);
          marker.openPopup();
        });
        return helpDiv;
      },
    });
    return new MapHelp({ position: "bottomleft" });
  }

  componentDidMount() {
    const { map } = this.props;
    const control = this.createButtonControl();
    control.addTo(map);
  }

  componentWillUnmount() {
    this.helpDiv.remove();
  }

  render() {
    return null;
  }
}

function withMap(Component) {
  return function WrappedComponent(props) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(LocateStore);
