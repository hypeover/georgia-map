"use client"
import React from 'react'
import { db } from "@/lib/db"
import { useLiveQuery } from "dexie-react-hooks";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';
import { Trash, Heart } from 'lucide-react'

type Place = {
  _id: string
  title: string
  url: string
  thumbnail: string
  fav: boolean
  types: string[]
}

interface ListAreaProps {
  selectedPlace?: Place | null
  setSelectedPlace: (place: Place) => void
}

const ListArea: React.FC<ListAreaProps> = ({ setSelectedPlace, selectedPlace }) => {

  const favPlaces = useLiveQuery<Place[]>(() =>
    db.table('places').filter((p: Place) => p.fav === true).toArray()
  );

  console.log(favPlaces)

  return (
    <div className='h-full w-2/6' >
      <ScrollArea className="h-full w-full p-4">
        {favPlaces?.map((place: Place) => (
          <Card
            key={place._id}
            onClick={() => setSelectedPlace(place)}
            id={place._id}
            className='flex flex-row mb-3 p-3 border-2'
          >
            <a target="_blank" href={"https://georgia.to" + place.url}>
              <img
                src={place.thumbnail}
                alt="Event cover"
                className="relative h-full h-80 rounded-md hover:brightness-60 ease-in-out duration-300 "
              />
            </a>
            <div className='w-full  flex flex-col justify-between' >
              <CardTitle className='text-2xl' >{place.title}</CardTitle>
              <CardAction className="flex flex-row flex-wrap w-full ">
                {place.types.map((type: string, i: number) => (
                  <Badge
                    key={i}
                    className="gap-5 mr-1 mt-1 mb-1 bg-popover-foreground text-popover "
                  >
                    {type}
                  </Badge>
                ))}
              </CardAction>
            </div>
            <CardFooter>
              <div className="flex flex-col h-full w-full justify-between">
                <Heart
                  className="cursor-pointer"
                  fill='red'
                  size={30}
                />
                <Trash className="cursor-pointer" size={30} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
}

export default ListArea