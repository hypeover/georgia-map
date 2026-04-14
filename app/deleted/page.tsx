"use client";
import React from "react";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import TopBar from "../deleted/top-bar";

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

const Deleted = () => {
  const data = useLiveQuery<Place[]>(() => db.getDeletedPlaces(), []);

  console.log(data);

  return (
    <div className="flex flex-col h-screen w-full">
      <TopBar />
      <div className="p-5 gap-10 flex flex-wrap justify-center content-center ">
        {data && data.length > 0 ? (
          data.map((place) => (
            <Card key={place.id} className="relative max-w-sm h-min pt-0 gap-3">
              <a target="_blank" href={"https://georgia.to" + place.url}>
                <Image
                  src={place.thumbnail}
                  width={500}
                  height={350}
                  loading="eager"
                  alt="Event cover"
                  className="w-full h-48 rounded-md object-cover cursor-pointer hover:brightness-60 ease-in-out duration-300"
                />
              </a>
              <CardHeader className="flex flex-col">
                <CardTitle className="text-2xl">{place.title}</CardTitle>
                {place.types.map((type) => (
                  <Badge
                    key={type}
                    className="gap-5 text-sm p-3 mr-1 mt-1 mb-1 bg-popover-foreground text-popover "
                  >
                    {type}
                  </Badge>
                ))}
              </CardHeader>
              <CardFooter className="m-0">
                <Button
                  onClick={async (e) => {
                    e.stopPropagation();
                    await db.restorePlace(place.id);
                  }}
                  className="w-full cursor-pointer font-semibold text-base mt-0"
                >
                  Retrieve the place
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="font-semibold text-xl" >There are no deleted places</p>
        )}
      </div>
    </div>
  );
};

export default Deleted;
