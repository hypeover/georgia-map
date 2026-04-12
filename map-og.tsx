"use client"
import React, { useEffect, useState } from 'react'
import { Map, MapClusterLayer, MapControls, MapMarker, MarkerContent } from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner"

const MapComp = () => {

  const [data, setData ] = useState()

  useEffect(() => {
    const collectData = async () => {
      const stored = localStorage.getItem('myData');
      setData(JSON.parse(stored))
    }
    collectData()
  }, [])

    console.log(data)

  


  return (
    <Card className="h-full w-4/6 p-0 rounded-none overflow-hidden">
      <Map center={[41.697102, 44.773674]} zoom={8}>
        
        
        <MapControls showFullscreen />
      </Map>
    </Card>
  )
}

export default MapComp

/* 

{data ? data.map((place) => (
          <MapMarker key={place} longitude={place.lon} latitude={place.lat} >
            <MarkerContent>
              <div className="size-5 rounded-full bg-rose-500 border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
            </MarkerContent>
          </MapMarker>
        )) : <Spinner /> }

*/