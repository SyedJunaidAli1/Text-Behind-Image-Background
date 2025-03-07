import React from 'react'
import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <h1 className=' font-semibold text-3xl'>Welcome! Start by uploading an image to get started</h1>
      <p>Hide text inside images and reveal it later! Get started by uploading an image and adding your hidden message.</p>
      <Button variant="secondary">Get Started</Button>
    </div>
  )
}

export default Hero
