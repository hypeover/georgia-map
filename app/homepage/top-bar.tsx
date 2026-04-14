import { ModeToggle } from '@/components/theme-toggle'
import React from 'react'

const TopBar = () => {
  return (
    <div className='bg-secondary  p-5 w-full h-15 flex flex-row justify-between items-center' >
      <h1 className='text-3xl font-bold ' >Georgia.to Map</h1>
      <ModeToggle />
    </div>
  )
}

export default TopBar
