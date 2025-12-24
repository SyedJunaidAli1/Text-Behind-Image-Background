import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='flex justify-center px-4 py-1 mt-3 text-center'>
      <div className=' flex flex-col justify-center items-center gap-2.5 w-[550px]' >
        <h1 className=' font-semibold text-3xl'>Welcome! Start by uploading an image to get started</h1>
        <p className=' opacity-60 max-w-[80%]'>Hide text inside images and reveal it later! Get started by uploading an image and adding your hidden message.</p>
        <Link href="/mainapp">
          <Button >Get Started</Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero

