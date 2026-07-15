"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function InteractiveMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const activeBaseLayerRef = useRef<L.TileLayer | L.LayerGroup | null>(null);
  const lightLayerRef = useRef<L.TileLayer | null>(null);
  const darkLayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Define Layer Sources
    const lightLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 20,
    });
    lightLayerRef.current = lightLayer;

    const darkLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 20,
    });
    darkLayerRef.current = darkLayer;

    const satelliteLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 19,
    });

    const labelOverlay = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png", {
      maxZoom: 20,
    });

    const satelliteHybrid = L.layerGroup([satelliteLayer, labelOverlay]);

    // Choose base layer based on current theme
    const isDark = document.documentElement.classList.contains("dark");
    const initialBase = isDark ? darkLayer : lightLayer;
    activeBaseLayerRef.current = initialBase;

    // Create map centered on global view with disabled attribution branding
    const map = L.map(mapContainer.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 20,
      layers: [initialBase],
      attributionControl: false, // Hides Leaflet logo and map credits footer
    });
    mapRef.current = map;

    // Custom layer switcher UI configuration
    const baseMaps = {
      "Pastel Map": lightLayer,
      "Dark Map": darkLayer,
      "Satellite Buildings": satelliteHybrid,
    };
    L.control.layers(baseMaps, undefined, { position: "topright" }).addTo(map);

    // Default icon fix for Leaflet in bundlers
    const DefaultIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // Interactive Hubs
    const locations = [
      { name: "New York Hub", coords: [40.7128, -74.0060] as [number, number], info: "Active Lookups: 142 • Status: Stable" },
      { name: "London Hub", coords: [51.5074, -0.1278] as [number, number], info: "Active Lookups: 98 • Status: Active" },
      { name: "Bangalore Hub", coords: [12.9716, 77.5946] as [number, number], info: "Active Lookups: 215 • Status: High Traffic" },
    ];

    const markerMap: { [name: string]: L.Marker } = {};

    locations.forEach((loc) => {
      const marker = L.marker(loc.coords).addTo(map);
      markerMap[loc.name] = marker;
      
      // Bind highly responsive hover tooltip showing location name
      marker.bindTooltip(loc.name, {
        direction: "top",
        offset: [0, -10],
        opacity: 1,
        permanent: false,
      });

      // Bind detailed information on click
      marker.bindPopup(`
        <div class="p-1 font-sans text-slate-700">
          <h4 class="font-bold text-sm text-slate-800">${loc.name}</h4>
          <p class="text-xs text-slate-500 mt-1 font-medium">${loc.info}</p>
          <p class="text-[10px] text-slate-400 mt-1 italic">Click to zoom into local buildings</p>
        </div>
      `);

      // Fly to marker and zoom in deep to show buildings
      marker.on("click", () => {
        map.flyTo(loc.coords, 18, {
          animate: true,
          duration: 1.5,
        });
      });
    });

    // Highly responsive Proximity Hover logic:
    // Tracks mouse movements anywhere over the map container and triggers tooltips
    // when the cursor is near any of the hubs.
    let activeTooltipLocName: string | null = null;

    map.on("mousemove", (e: L.LeafletMouseEvent) => {
      let closestLoc: any = null;
      let minDistance = Infinity;

      locations.forEach((loc) => {
        const mousePoint = map.latLngToContainerPoint(e.latlng);
        const markerPoint = map.latLngToContainerPoint(loc.coords);
        const dx = mousePoint.x - markerPoint.x;
        const dy = mousePoint.y - markerPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDistance) {
          minDistance = dist;
          closestLoc = loc;
        }
      });

      // Trigger tooltip if mouse is within 50px of a marker
      if (closestLoc && minDistance < 50) {
        if (activeTooltipLocName !== closestLoc.name) {
          if (activeTooltipLocName && markerMap[activeTooltipLocName]) {
            markerMap[activeTooltipLocName].closeTooltip();
          }
          activeTooltipLocName = closestLoc.name;
          markerMap[closestLoc.name].openTooltip();
        }
      } else {
        if (activeTooltipLocName) {
          if (markerMap[activeTooltipLocName]) {
            markerMap[activeTooltipLocName].closeTooltip();
          }
          activeTooltipLocName = null;
        }
      }
    });

    // Close tooltip if mouse leaves map area
    map.on("mouseout", () => {
      if (activeTooltipLocName && markerMap[activeTooltipLocName]) {
        markerMap[activeTooltipLocName].closeTooltip();
      }
      activeTooltipLocName = null;
    });

    // Watch for theme changes on html element and swap layers if in default mode
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      
      // Only auto-swap standard map layers if satellite layer is NOT active
      if (map.hasLayer(lightLayer) || map.hasLayer(darkLayer)) {
        if (isDarkNow) {
          map.removeLayer(lightLayer);
          map.addLayer(darkLayer);
        } else {
          map.removeLayer(darkLayer);
          map.addLayer(lightLayer);
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Fix map layout on window resize
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div id="interactive-map-container" className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
      <div ref={mapContainer} className="w-full h-full" style={{ zIndex: 1 }} />
    </div>
  );
}
