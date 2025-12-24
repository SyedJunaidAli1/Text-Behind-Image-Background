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

  return (
    <div className="py-8 px-4">
      {/* First Row: Two images side by side with custom widths, stack on mobile */}
      <div className="flex flex-col sm:flex-row gap-6 max-w-6xl mx-auto mb-6">
        {/* First image (wider on sm and up) */}
        <div
          key={0}
          className="relative overflow-hidden rounded-lg shadow-md w-full sm:w-[70%]"
        >
          <img
            src={images[0].src}
            alt="Sample 1"
            className="w-full h-80 object-cover"
          />
        </div>
        {/* Second image (narrower on sm and up) */}
        <div
          key={1}
          className="relative overflow-hidden rounded-lg shadow-md w-full sm:w-[30%]"
        >
          <img
            src={images[1].src}
            alt="Sample 2"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Second Row: Two images side by side with reversed custom widths, stack on mobile */}
      <div className="flex flex-col sm:flex-row gap-6 max-w-6xl mx-auto mb-6">
        {/* Third image (narrower on sm and up) */}
        <div
          key={2}
          className="relative overflow-hidden rounded-lg shadow-md w-full sm:w-[30%]"
        >
          <img
            src={images[2].src}
            alt="Sample 3"
            className="w-full h-80 object-cover"
          />
        </div>
        {/* Fourth image (wider on sm and up) */}
        <div
          key={3}
          className="relative overflow-hidden rounded-lg shadow-md w-full sm:w-[70%]"
        >
          <img
            src={images[3].src}
            alt="Sample 4"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Remaining Images with new grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl items-start justify-start mx-auto gap-10 pt-4 px-10">
        {images.slice(4).map((image, index) => (
          <div
            key={index + 4} // Offset the key to avoid duplicates
            className="relative overflow-hidden rounded-lg shadow-md"
          >
            <img
              src={image.src}
              alt={`Sample ${index + 5}`}
              className="w-full h-100 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
