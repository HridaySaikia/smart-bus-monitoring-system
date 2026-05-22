"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useRef, useMemo } from "react";
import L from "leaflet";

import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  Popup,
} from "react-leaflet";

function MapUpdater({
  position,
}: {
  position: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    map.whenReady(() => {
      map.panTo(position, {
        animate: true,
        duration: 0.8,
      });
    });
  }, [map, position]);

  return null;
}

export default function BusMap({
  bus,
}: any) {
  const markerRef = useRef<L.Marker | null>(
    null
  );

  const latitude = Number(
    bus?.location?.latitude
  );

  const longitude = Number(
    bus?.location?.longitude
  );

  const position: [number, number] =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude)
      ? [latitude, longitude]
      : [26.700299, 92.834709];

  const busIcon = useMemo(() => {
    return new L.Icon({
      iconUrl: "/bus-marker.png",
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });
  }, []);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(position);
    }
  }, [position]);

  return (
    <div className="h-[400px] overflow-hidden rounded-3xl border border-border">
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker
          ref={markerRef}
          position={position}
          icon={busIcon}
        >
          <Popup>
            <div>
              <strong>
                {bus?.busId || "BUS-01"}
              </strong>

              <br />

              Lat: {position[0]}

              <br />

              Lng: {position[1]}
            </div>
          </Popup>
        </Marker>

        <MapUpdater position={position} />
      </MapContainer>
    </div>
  );
}