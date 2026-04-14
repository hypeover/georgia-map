import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const TopBar = () => {
  return (
    <div className='bg-background p-5 w-full h-15 flex flex-row justify-between items-center' >
      <Link href="/deleted" ><Button className='cursor-pointer p-5 font-semibold text-sm' >Go to deleted places</Button></Link>
      <ModeToggle />
    </div>
  )
}

export default TopBar
