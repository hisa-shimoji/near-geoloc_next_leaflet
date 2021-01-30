import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";

import "leaflet/dist/leaflet.css";

import Leaflet from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
} from "react-leaflet";

const pin_icon = new Leaflet.Icon({
  iconUrl: "/mappin.png",
  iconSize: new Leaflet.Point(40, 40),
  iconAnchor: [25, 50],
});

const f_icon = new Leaflet.Icon({
  iconUrl: "/station.png",
  iconSize: new Leaflet.Point(40, 40),
});

const GeoView = (props) => {
  const [position, setPosition] = useState({
    lat: 35.68083532000018,
    lng: 139.76939931301777,
  });
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    return (
      <>
        {facilities.map((f) => {
          return (
            <Marker
              key={f._id}
              icon={f_icon}
              position={[
                f.coordinates[1],
                f.coordinates[0],
              ]}
            >
              <Popup>{f.name}</Popup>
              <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                {f.name}
              </Tooltip>
            </Marker>
          );
        })}
      </>
    );
  }

  useEffect(async() => {
    setFacilities([]);

    await setisLoading(true)
    
    await axios
      .post("/api/nearloc", {
        lat: position.lat,
        lng: position.lng,
        points_num: 2,
      })
      .then((results) => {
        setFacilities(results.data);
      });

    setisLoading(false)
  }, [position]);

  return (
    <>
      {typeof window !== "undefined" ? (
        <LoadingOverlay
          active={isLoading}
          spinner
          text="Loading..."
        >
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "80vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={pin_icon} position={position}></Marker>
            <LocationMarker />
          </MapContainer>
        </LoadingOverlay>
      ) : null}
    </>
  );
};

export default GeoView;
