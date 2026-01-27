"use client";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "../../../components/motion-primitives/image-comparison";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ImageComparisonSpring = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      visible={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeIn" },
      }}
      whileInView="visible"
      viewport={{ once: true }}
      className="flex items-center justify-center w-full min-h-[300px] px-4"
    >
      <ImageComparison
        className="relative w-full max-w-4xl aspect-[16/10] h-auto min-h-[200px] my-2 rounded-lg border"
        enableHover
        springOptions={{
          bounce: 0.3,
        }}
      >
        <ImageComparisonImage
          src="/camparison.jpg"
          alt="Motion Primitives Dark"
          position="left"
          className="object-cover w-full h-full"
        />
        <ImageComparisonImage
          src="/camparison2.jpg"
          alt="Motion Primitives Light"
          position="right"
          className="object-cover w-full h-full"
        />
        <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-xs" />
      </ImageComparison>
    </motion.div>
  );
};

export default ImageComparisonSpring;
