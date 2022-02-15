/* eslint-disable no-undef */

import { useEffect } from "react";
import "./maps.css";

function LocationForm() {
  let autocomplete;
  let address1Field;
  let address2Field;
  let postalField;

  function initAutocomplete() {
    address1Field = document.querySelector("#ship-address");
    address2Field = document.querySelector("#address2");
    postalField = document.querySelector("#postcode");
    autocomplete = new google.maps.places.Autocomplete(address1Field, {
      componentRestrictions: { country: ["it", "de"] },
      fields: ["address_components", "geometry"],
      types: ["address"],
    });
    address1Field.focus();

    autocomplete.addListener("place_changed", fillInAddress);
  }

  function fillInAddress() {
    const place = autocomplete.getPlace();
    let address1 = "";
    let postcode = "";

    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number": {
          address1 = `${component.long_name} ${address1}`;
          break;
        }
        case "route": {
          address1 += component.short_name;
          break;
        }

        case "postal_code": {
          postcode = `${component.long_name}${postcode}`;
          break;
        }

        case "postal_code_suffix": {
          postcode = `${postcode}-${component.long_name}`;
          break;
        }
        case "locality":
          document.querySelector("#locality").value = component.long_name;
          break;
        case "administrative_area_level_1": {
          document.querySelector("#state").value = component.short_name;
          break;
        }
        case "country":
          document.querySelector("#country").value = component.long_name;
          break;
      }
    }

    address1Field.value = address1;
    postalField.value = postcode;

    address2Field.focus();
  }
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: { lat: 37.4221, lng: -122.0841 },
    mapTypeControl: false,
    fullscreenControl: true,
    zoomControl: true,
    streetViewControl: false,
  });
  const marker = new google.maps.Marker({ map: map, draggable: false });
  function renderAddress(place) {
    map.setCenter(place.geometry.location);
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  }
  useEffect(() => {
    initAutocomplete();
  }, []);

  return (
    <form id="address-form" action="" method="get" autocomplete="off">
      <p className="title">Sample address form for North America</p>
      <p className="note">
        <em>* = required field</em>
      </p>
      <label className="full-field">
        <span className="form-label">Deliver to*</span>
        <input
          id="ship-address"
          name="ship-address"
          required
          autocomplete="off"
        />
      </label>
      <label className="full-field">
        <span className="form-label">Apartment, unit, suite, or floor #</span>
        <input id="address2" name="address2" />
      </label>
      <label className="full-field">
        <span className="form-label">City*</span>
        <input id="locality" name="locality" required />
      </label>
      <label className="slim-field-left">
        <span className="form-label">State/Province*</span>
        <input id="state" name="state" required />
      </label>
      <label className="slim-field-right" for="postal_code">
        <span className="form-label">Postal code*</span>
        <input id="postcode" name="postcode" required />
      </label>
      <label className="full-field">
        <span className="form-label">Country/Region*</span>
        <input id="country" name="country" required />
      </label>
      <button type="button" className="my-button">
        Save address
      </button>
      <input type="reset" value="Clear form" />
      <div className="map" id="map"></div>
      <p>{address1Field}</p>
    </form>
  );
}

export default LocationForm;
