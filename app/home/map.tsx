"use client";
import React, { useEffect } from "react";
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
import { MapPinIcon, Heart, Trash } from "lucide-react";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useMap } from "react-leaflet";
import Image from "next/image";

type Place = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  fav?: boolean;
  types: string[];
  lat: number;
  lon: number;
};

type MapCompProps = {
  selectedPlace?: Place | null;
};

const FlyToPlace = ({ selectedPlace }: { selectedPlace?: Place | null }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (!selectedPlace) return;

    map.flyTo([selectedPlace.lat, selectedPlace.lon], 14, { duration: 1.5 });
  }, [selectedPlace, map]);

  return null;
};

const MapComp: React.FC<MapCompProps> = ({ selectedPlace }) => {
  const data = useLiveQuery<Place[]>(() => db.getAllPlaces(), []);

  return (
    <Map className="rounded-none border " center={[41.720927, 43.807854]} zoom={8}>
      <MapTileLayer />
      <MapZoomControl />
      <MapFullscreenControl />
      <FlyToPlace selectedPlace={selectedPlace} />
      <MapMarkerClusterGroup
        icon={(markerCount) => (
          <div className="bg-popover-foreground text-base text-popover flex size-10 items-center justify-center rounded-full border font-semibold">
            {markerCount}
          </div>
        )}
      >
        {data ? (
          data.map((place) => (
            <MapMarker
              key={place.id}
              position={[place.lat, place.lon]}
              icon={
                <MapPinIcon
                  color="var(--popover-foreground"
                  fill={place.fav ? "var(--popover-foreground" : "transparent"}
                  height={36}
                  width={36}
                />
              }
            >
              <MapPopup className="overflow-hidden w-80 rounded-xl border-0 p-0 duration-600 bg-popover-foreground/0  backdrop-blur-md">
                <Card className="relative rounded-none mx-auto w-full max-w-sm pt-0 bg-transparent">
                  <a target="_blank" href={"https://georgia.to" + place.url}>
                    <Image
                      src={place.thumbnail}
                      width={500}
                      height={350}
                      loading="eager"
                      alt="Event cover"
                      className="w-full h-48 rounded-md object-cover hover:brightness-60 ease-in-out duration-300"
                    />
                  </a>
                  <CardHeader className="flex flex-col">
                    <CardTitle className="text-left text-popover-foreground text-2xl">
                      {place.title}
                    </CardTitle>
                    <CardAction className="flex flex-row flex-wrap">
                      {place.types.map((type) => (
                        <Badge
                          key={type}
                          className="gap-5 mr-1 mt-1 mb-1 bg-popover-foreground text-popover "
                        >
                          {type}
                        </Badge>
                      ))}
                    </CardAction>
                    <CardFooter className="w-full p-0">
                      <div className="flex flex-row w-full justify-between">
                        <Heart
                          className="cursor-pointer fill-red"
                          fill={
                            place.fav
                              ? "var(--popover-foreground"
                              : "transparent"
                          }
                          size={30}
                          color="var(--popover-foreground"
                          onClick={async (e) => {
                            e.stopPropagation();
                            await db.toggleFavorite(place.id);
                          }}
                        />
                        <Trash onClick={async (e) => {
                            e.stopPropagation();
                            await db.deletePlace(place.id);
                          }} className="cursor-pointer" size={30} />
                      </div>
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
