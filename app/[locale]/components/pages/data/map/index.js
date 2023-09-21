import dynamic from "next/dynamic";

const Map = dynamic(() => import("./MapView"), {
  ssr: false,
});

export default Map;
