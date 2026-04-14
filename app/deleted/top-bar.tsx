import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme-toggle'


const TopBar = () => {
  return (
    <div className='border-b-1 bg-background p-5 w-full h-15 flex flex-row justify-between items-center' >
      <Link href="/home" ><Button className='cursor-pointer p-5 font-semibold text-sm' >Back to homepage with map</Button></Link>
      <ModeToggle />
    </div>
  )
}

export default TopBar
