"use client";
import React, { useEffect, useState } from "react";
import {
  Map,
  MapMarker,
  MapPopup,
  MapMarkerClusterGroup,
  MapFullscreenControl,
  MapTileLayer,
  MapZoomControl,

} from "@/components/ui/map"
import { Spinner } from '@/components/ui/spinner'
import { MapPinIcon } from 'lucide-react'
import { Card } from "@/components/ui/card";

const MapComp = () => {
  const [data, setData] = useState<any[]>([]);


  useEffect(() => {
    const stored = localStorage.getItem("myData");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  console.log(data);

  return (
    <Map center={[41.720927, 43.807854]} zoom={8} >
      <MapTileLayer />
      <MapZoomControl  />
      <MapFullscreenControl />
      <MapMarkerClusterGroup>
          {data ? data.map((place, i) => (
              <MapMarker key={i} position={[place.lat, place.lon]} icon={<MapPinIcon height={36} width={36} />} >

              </MapMarker>
          )) : <Spinner />}
        
      </MapMarkerClusterGroup>
    </Map>
  );
};

export default MapComp;

/* 

{data ? data.map((place) => (
          <MapMarker key={place} longitude={place.lon} latitude={place.lat} >
            <MarkerContent>
              <div className="size-5 rounded-full bg-rose-500 border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
            </MarkerContent>
          </MapMarker>
        )) : <Spinner /> }

*/

/* 
  <MapPopup
            longitude={selectedPoint.coordinates[0]}
            latitude={selectedPoint.coordinates[1]}
            onClose={() => setSelectedPoint(null)}
          >
            <div className="space-y-2 p-1">
              <p className="font-semibold">{selectedPoint.properties.title}</p>

              <img
                src={selectedPoint.properties.thumbnail}
                className="w-32 h-20 object-cover rounded"
              />

              <p className="text-xs">
                {selectedPoint.properties.types.join(", ")}
              </p>
            </div>
          </MapPopup>

*/