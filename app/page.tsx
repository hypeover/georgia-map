"use client"
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { db } from '@/lib/db'
import { Spinner } from '@/components/ui/spinner';


const Home = () => {

  const router = useRouter();

  useEffect(() => {
    async function check() {
      const exists = await db.hasUserData();
      if (exists) {
        router.push("/home");
      } else {
        router.push("/loadfile");
      }
    }

    check();
  }, []);


  return (
    <Spinner />
  )
}

export default Home