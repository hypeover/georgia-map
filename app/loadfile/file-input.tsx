"use client"
import React, { useState } from 'react'
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ChessKing } from 'lucide-react'


const FileInput = () => {

  const [data, setData] = useState()
  const [file, setFile] = useState() 
  
  const save = (newData) => {
    setData(newData);
    localStorage.setItem('myData', JSON.stringify(newData));

    console.log(data)

  }

  const loadFromFile = (file) => {
    if (file.type !== 'application/json') {
      console.log('zly plik')
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        save(json);
        console.log('zadladowane dane')
      } catch {console.log('zle zaladowane dane')}
    }

    reader.readAsText(file)

    console.log(data)

  }

  return (
    <Field>
      <FieldLabel className='text-xl'  htmlFor="picture">Select map data to upload.</FieldLabel>
      <Input accept=".json" id="picture" type="file" onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) loadFromFile(file);
      }} className='mt-2 mb-2' />
      <Button>Upload</Button>
      <FieldDescription className='text-lg'>Or click <Link href={'/homepage'} >here</Link> to use actual uploaded data.</FieldDescription>
    </Field>
  )
}

export default FileInput



/*


      <Input onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) setData(file);
      }} accept=".json" id="picture" type="file" className='mt-2 mb-2' />
       <Input accept=".json" id="picture" type="file" className='mt-2 mb-2' />
      <Button>Upload</Button>
      <FieldDescription className='text-lg'>Or click <Link href={'/homepage'} >here</Link> to use actual uploaded data.</FieldDescription>

*/