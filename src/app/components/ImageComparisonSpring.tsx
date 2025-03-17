'use client'
import React from 'react';
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from '../../../components/motion-primitives/image-comparison';

const ImageComparisonSpring = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[300px] px-4">
      <ImageComparison
        className="relative w-full max-w-4xl aspect-[16/10] h-auto min-h-[200px] my-2 rounded-lg border border-zinc-200 dark:border-zinc-800"
        enableHover
        springOptions={{
          bounce: 0.3,
        }}
      >
        <ImageComparisonImage
          src="/Image (14).jpg"
          alt="Motion Primitives Dark"
          position="left"
          className="object-cover w-full h-full"
        />
        <ImageComparisonImage
          src="/Image (15).jpg"
          alt="Motion Primitives Light"
          position="right"
          className="object-cover w-full h-full"
        />
        <ImageComparisonSlider 
          className="w-0.5 bg-white/30 backdrop-blur-xs" 
        />
      </ImageComparison>
    </div>
  );
};

export default ImageComparisonSpring;