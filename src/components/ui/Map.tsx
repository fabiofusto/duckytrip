"use client";

import { FC } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import styled from "styled-components";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}

const MapStyled = styled.div`
  .map-container {
    height: 35vh;
    border-radius: var(--borderRadiusLg);
  }
`;

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const Map: FC<MapProps> = ({ center }) => {
  return (
    <MapStyled>
      <MapContainer
        center={(center as L.LatLngExpression) || [51, -0.09]}
        zoom={center ? 4 : 2}
        scrollWheelZoom={false}
        className="map-container"
      >
        <TileLayer url={url} />
        {center && <Marker position={center as L.LatLngExpression} />}
      </MapContainer>
    </MapStyled>
  );
};

export default Map;
