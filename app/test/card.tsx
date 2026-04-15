import React from 'react'
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Card, CardHeader } from '@/components/ui/card';
import Image from 'next/image'

const DeletedCard = ({ id, thumbnail, title, types, }) => {

    const data = useLiveQuery<Place[]>(() => db.getDeletedPlaces(), []);


    return (
        <Card className='relative min-w-75 min-h-75 py-0'>
            <div className='min-w-75 inset-x-0 bottom-0 h-[50%] absolute bg-linear-to-t from-white to-transparent backdrop-blur-lg' ></div>
            <Image className='aspect-3/2 !rounded-none ' src={thumbnail} width={300} height={250} loading="eager" alt="Image"/>
        </Card>
    )
}

export default DeletedCard

//https://dribbble.com/shots/25800072-Cabin-Booking-Card-UI
//https://motion-primitives.com/docs/progressive-blur#component-api
//https://stackoverflow.com/questions/79558445/how-to-create-a-blur-effect-with-soft-transition-mask
//https://www.ruixen.com/docs/components/profile-card