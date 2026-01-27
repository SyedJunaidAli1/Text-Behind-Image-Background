"use client";
import { motion } from "motion/react";

const ImageGrid = () => {
  // Sample image data (replace with your own paths)
  const images = [
    { src: "/image (1).jpg" },
    { src: "/image (2).jpg" },
    { src: "/image (3).jpg" },
    { src: "/image (4).jpg" },
    { src: "/image (5).jpg" },
    { src: "/image (6).jpg" },
    { src: "/image (7).jpg" },
    { src: "/image (8).jpg" },
    { src: "/image (9).jpg" },
    { src: "/image (10).jpg" },
    { src: "/image (11).jpg" },
    { src: "/image (12).jpg" },
    { src: "/image (13).jpg" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <motion.div className="py-8 px-4">
      {/* First Row: Two images side by side with custom widths, stack on mobile */}
      <div className="flex flex-col sm:flex-row gap-6 max-w-6xl mx-auto mb-6">
        {/* First image (wider on sm and up) */}
        <motion.div
          key={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          whileHover={{ scale: 1.01 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-lg shadow-md w-full sm:w-[70%]"
        >
          <img
            src={images[0].src}
            alt="Sample 1"
            loading="lazy"
            className="w-full h-80 object-cover"
          />
        </motion.div>
        {/* Second image (narrower on sm and up) */}
        <motion.div
          key={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          whileHover={{ scale: 1.01 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-lg shadow-md w-full sm:w-[30%]"
        >
          <img
            src={images[1].src}
            alt="Sample 2"
            loading="lazy"
            className="w-full h-80 object-cover"
          />
        </motion.div>
      </div>

      {/* Second Row: Two images side by side with reversed custom widths, stack on mobile */}
      <div className="flex flex-col sm:flex-row gap-6 max-w-6xl mx-auto mb-6">
        {/* Third image (narrower on sm and up) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          whileHover={{ scale: 1.01 }}
          viewport={{ once: true }}
          key={2}
          className="relative overflow-hidden rounded-lg shadow-md w-full sm:w-[30%]"
        >
          <img
            src={images[2].src}
            alt="Sample 3"
            loading="lazy"
            className="w-full h-80 object-cover"
          />
        </motion.div>
        {/* Fourth image (wider on sm and up) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          whileHover={{ scale: 1.01 }}
          viewport={{ once: true }}
          key={3}
          className="relative overflow-hidden rounded-lg shadow-md w-full sm:w-[70%]"
        >
          <img
            src={images[3].src}
            alt="Sample 4"
            loading="lazy"
            className="w-full h-80 object-cover"
          />
        </motion.div>
      </div>

      {/* Remaining Images with new grid layout */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl items-start justify-start mx-auto gap-10 pt-4 px-10"
      >
        {images.slice(4).map((image, index) => (
          <motion.div
            key={index + 4} // Offset the key to avoid duplicates
            variants={fadeUp}
            className="relative overflow-hidden rounded-lg shadow-md"
          >
            <motion.img
              whileHover={{ scale: 1.12 }}
              transition={{ duration: 0.3 }}
              src={image.src}
              alt={`Sample ${index + 5}`}
              loading="lazy"
              className="w-full h-100 object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ImageGrid;
