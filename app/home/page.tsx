"use client"
import React, { useState } from 'react'
import ListArea from './list-area'
import MapComp from './map'
import TopBar from './top-bar'

const HomePage = () => {

  const [selectedPlace, setSelectedPlace] = useState<any>(null);


  return (
    <div className='bg-background h-screen w-full flex flex-col' >
        <TopBar />
        <div className='h-full w-full flex flex-col md:flex-row'>
            <MapComp selectedPlace={selectedPlace} />
        <ListArea setSelectedPlace={setSelectedPlace}
          selectedPlace={selectedPlace} />
        </div>
    </div>
  )
}

export default HomePage
