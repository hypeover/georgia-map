"use client";
import React from "react";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardAction, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash, Heart } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

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

interface ListAreaProps {
  selectedPlace?: Place | null;
  setSelectedPlace: (place: Place) => void;
}

const ListArea: React.FC<ListAreaProps> = ({
  setSelectedPlace,
  selectedPlace,
}) => {
  const favPlaces = useLiveQuery<Place[]>(() =>
    db
      .table("places")
      .filter((p: Place) => p.fav === true)
      .toArray(),
  );

  console.log(favPlaces);

  return (
    <div className="border-t h-auto w-2/11">
      <ScrollArea className=" h-full w-full p-4">
        <AnimatePresence>
          {favPlaces?.map((place: Place) => (
            <motion.div key={place.id} layout initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              exit={{ opacity: 0, y: -15 }} ><Card
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                id={place.id}
                className="flex flex-col items-center gap-3 mb-3 px-5 py-3 border-2 fade-in transition-100"
              >
                <a target="_blank" href={"https://georgia.to" + place.url}>
                  <Image
                    src={place.thumbnail}
                    alt="Event cover"
                    width={420}
                    height={240}
                    loading="eager"
                    className="flex-none w-full h-48 rounded-md object-cover hover:brightness-60 ease-in-out duration-300"
                  />
                </a>
                <div className="flex-1 flex flex-col w-full justify-start">
                  <CardTitle className="text-2xl font-semibold ">{place.title}</CardTitle>
                  <CardAction className="mt-2 flex flex-row flex-wrap w-full ">
                    {place.types.map((type: string, i: number) => (
                      <Badge
                        key={i}
                        className="gap-5 text-sm px-3 py-2 mr-1 mt-1 mb-1 bg-popover-foreground text-popover "
                      >
                        {type}
                      </Badge>
                    ))}
                  </CardAction>
                </div>
                <CardFooter className="w-full p-0">
                  <div className="flex flex-row h-full w-full justify-between">
                    <Heart
                      className="cursor-pointer"
                      fill="var(--popover-foreground)"
                      color="var(--popover-foreground)"
                      size={30}
                      onClick={async (e) => {
                        e.stopPropagation();
                        place.fav = !place.fav;
                        await db.toggleFavorite(place.id);
                      }}
                    />
                    <Trash
                      onClick={async (e) => {
                        e.stopPropagation();
                        await db.deletePlace(place.id);
                      }}
                      className="cursor-pointer"
                      size={30}
                    />
                  </div>
                </CardFooter>
              </Card></motion.div>

          ))}
        </AnimatePresence>

      </ScrollArea>
    </div>
  );
};

export default ListArea;
