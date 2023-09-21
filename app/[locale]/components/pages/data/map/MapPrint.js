"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet-easyprint";
import { useMap } from "react-leaflet";

const MapPrint = (props) => {
  const map = useMap();

  useEffect(() => {
    const control = L.easyPrint({
      ...props,
    });
    map.addControl(control);
    return () => {
      map.removeControl(control);
    };
  }, [map]);
  return null;
};

export default MapPrint;
