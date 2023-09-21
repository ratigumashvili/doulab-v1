"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { Icon } from "leaflet";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";

import MapPrint from "./MapPrint";

import {
  center,
  zoom,
  scroll,
  height,
  attribution,
  attributionDark,
  url,
  urlDark,
} from "@/lib/constants";

import "leaflet/dist/leaflet.css";
import "react-leaflet-fullscreen/styles.css";

const customIcon = new Icon({
  iconUrl: "/map-icon.png",
  iconSize: [38, 38],
});

const MapView = ({ data }) => {
  const { theme } = useTheme();

  const fields = useTranslations("Data");
  const general = useTranslations("General");
  return (
    <div className="w-full h-[500px] shadow-md">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={scroll}
        style={{ height }}
      >
        <MapPrint
          position="topleft"
          sizeModes={["A4Portrait", "A4Landscape"]}
          hideControlContainer={false}
          title="Print"
        />
        <MapPrint
          position="topleft"
          sizeModes={["A4Portrait", "A4Landscape"]}
          hideControlContainer={false}
          title="Export as PNG"
          exportOnly
        />
        <TileLayer
          attribution={theme === "light" ? attribution : attributionDark}
          url={theme === "light" ? url : urlDark}
          ext="png"
        />
        {data?.burrials?.map((item) => (
          <Marker
            key={item.id}
            position={[item.coordinates.latitude, item.coordinates.longitude]}
            icon={customIcon}
          >
            <Popup>
              <table>
                <tbody>
                  <tr>
                    <th className="border border-slate-300 bg-slate-100 p-2">
                      {fields("place")}
                    </th>
                    <td className="border border-slate-300 p-2">
                      {item?.place?.name}
                    </td>
                  </tr>
                  <tr>
                    <th className="border border-slate-300 bg-slate-100 p-2">
                      {fields("title")}
                    </th>
                    <td className="border border-slate-300 p-2">
                      {item?.title}
                    </td>
                  </tr>
                  <tr>
                    <th className="border border-slate-300 bg-slate-100 p-2">
                      {fields("type")}
                    </th>
                    <td className="border border-slate-300 p-2">
                      {fields(item?.burrialType)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Link
                href={`/data/cemeteries/${item?.slug}`}
                className="block mt-4 text-[0.85rem]"
              >
                {general("read_more")}
              </Link>
            </Popup>
          </Marker>
        ))}
        <FullscreenControl forceSeparateButton={true} position="topright" />
      </MapContainer>
    </div>
  );
};

export default MapView;
