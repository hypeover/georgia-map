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
} from "@/components/ui/map";
import { Spinner } from "@/components/ui/spinner";
import { MapPinIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" 
import { Button } from "@/components/ui/button"

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
    <Map className="rounded-none" center={[41.720927, 43.807854]} zoom={8}>
      <MapTileLayer />
      <MapZoomControl />
      <MapFullscreenControl />
      <MapMarkerClusterGroup
        icon={(markerCount) => (
          <div className="bg-popover-foreground text-base text-popover flex size-10 items-center justify-center rounded-full border font-semibold">
            {markerCount}
          </div>
        )}
      >
        {data ? (
          data.map((place, i) => (
            <MapMarker
              key={i}
              position={[place.lat, place.lon]}
              icon={<MapPinIcon height={36} width={36} />}
            >
              <MapPopup className="overflow-hidden w-80 rounded-xl border-0 p-0 duration-600 bg-popover-foreground/0  backdrop-blur-md">
                <Card className="relative rounded-none mx-auto w-full max-w-sm pt-0 bg-transparent">
                  <a target="_blank" href={"https://georgia.to" + place.url} ><img
                    src={place.thumbnail}
                    alt="Event cover"
                    className="relative w-full min-h-45 hover:brightness-60 ease-in-out duration-300 "
                  /></a>
                  <CardHeader className="flex flex-col" >    
                    <CardTitle className="text-popover-foreground text-2xl" >{place.title}</CardTitle>
                    <CardAction className="flex flex-row flex-wrap" >
                      {place.types.map((type: string, i: number) => (<Badge key={i} className="mt-1 mb-1 bg-popover-foreground text-popover " >{type}</Badge>))}
                    </CardAction>
                    <CardFooter>

                    </CardFooter>
                  </CardHeader>
                </Card>
              </MapPopup>
            </MapMarker>
          ))
        ) : (
          <Spinner />
        )}
      </MapMarkerClusterGroup>
    </Map>
  );
};

export default MapComp;
