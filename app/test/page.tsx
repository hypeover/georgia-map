"use client"
import React from 'react'
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur';
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import DeletedCard from './card'

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


const Test = () => {

    const data = useLiveQuery<Place[]>(() => db.getDeletedPlaces(), []);


    return (
        <div className='flex flex-col justify-center' >
            {data && data.length > 0 ? (data.map((place) => (
                <DeletedCard id={place.id} thumbnail={place.thumbnail} title={place.title} types={place.types} key={place.id}/>
            ))) : (<p className="font-semibold text-xl" >There are no deleted places</p>)}

            
        </div>
    );
}

export default Test

/* 

<div key={place.id} className='relative my-4 aspect-3/2 w-[300px] overflow-hidden rounded-lg'>
                    <img
                        src={place.thumbnail}
                        className='absolute inset-0 h-full w-full'
                    />
                    <ProgressiveBlur
                        className='pointer-events-none absolute bottom-0 left-0 h-[50%] w-full'
                        blurIntensity={6}
                    />
                    <div className='absolute bottom-0 left-0'>
                        <div className='flex flex-col items-start gap-0 px-5 py-4'>
                            <p className='text-base font-medium text-white'>Benjamin Spiers</p>
                            <span className='mb-2 text-base text-zinc-300'>Moonlight 2023</span>
                            <p className='text-base text-white'>Oil on linen. 40cm by 30cm</p>
                        </div>
                    </div>
                </div>

*/