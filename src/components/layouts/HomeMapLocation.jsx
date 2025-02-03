import { useEffect, useRef } from "react";
import L from "leaflet";

export default function HomeMapLocation() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(
        [-5.334200867829806, 120.36568709643454],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      const customIcon = L.icon({
        iconUrl: "/logo-regency.png",
        iconSize: [50, 55],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50],
      });

      const marker = L.marker([-5.334200867829806, 120.36568709643454], {
        icon: customIcon,
      })
        .addTo(mapRef.current)
        .bindPopup("Kantor Lurah Tanah Jaya")
        .openPopup();

      marker.on("click", () => {
        const lat = marker.getLatLng().lat;
        const lng = marker.getLatLng().lng;
        const googleMapsUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=13`;
        //
        // router.push(googleMapsUrl);
        window.open(googleMapsUrl, "_blank");
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" className="w-full h-96"></div>;
}
