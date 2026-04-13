"use client";
import React, { useEffect, useState } from "react";
import {
  Map,
  MapClusterLayer,
  MapControls,
  MapMarker,
  MarkerContent,
  MapPopup,
} from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const MapComp = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<{
    coordinates: [number, number];
    properties: PlaceProperties;
  } | null>(null);

  useEffect(() => {
  const stored = localStorage.getItem("myData");
  if (stored) {
    setData(JSON.parse(stored));
  }
}, []);

  console.log(data);

  const geojson = {
    type: "FeatureCollection",
    features: data.map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.lon, item.lat], // ⚠️ kolejność: lon, lat
      },
      properties: {
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        types: item.types,
        url: item.url,
        fav: item.fav,
      },
    })),
  };

  interface PlaceProperties {
    id: string;
    title: string;
    thumbnail: string;
    types: string[];
    url: string;
    fav: boolean;
  }

  return (
    <Card className="h-full w-4/6 p-0 rounded-none overflow-hidden">
      <Map center={[41.697102, 44.773674]} zoom={8}>
        <MapClusterLayer<PlaceProperties>
          data={geojson}
          clusterRadius={50}
          clusterMaxZoom={14}
          clusterColors={["#1d8cf8", "#6d5dfc", "#e23670"]}
          pointColor="black"
          onPointClick={(feature, coordinates) => {
            setSelectedPoint({
              coordinates,
              properties: feature.properties,
            });
          }}
          
        />
        {selectedPoint && (
          <MapMarker longitude={selectedPoint.coordinates[0]}
            latitude={selectedPoint.coordinates[1]} >
              <MarkerContent>
                <div className="size-5 rounded-full bg-rose-500 border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
              </MarkerContent>
          </MapMarker>
        )}
        <MapControls showFullscreen />
      </Map>
    </Card>
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