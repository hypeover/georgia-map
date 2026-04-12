import React from 'react'
import ListArea from './list-area'
import MapComp from './map'
import TopBar from './top-bar'

const HomePage = () => {
  return (
    <div className='h-screen w-full flex flex-col' >
        <TopBar />
        <div className='h-full w-full flex flex-row'>
            <MapComp />
        <ListArea />
        </div>
    </div>
  )
}

export default HomePage
