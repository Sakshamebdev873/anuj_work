import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

// --- Image data for the carousel ---
const heroImages = [
  {
    url: "https://plus.unsplash.com/premium_photo-1683141389818-77fd3485334b?w=1080&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNvZmF8ZW58MHx8MHx8fDA%3D",
    alt: "A clean and modern living room sofa",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1676810460522-bc963e5554d8?q=80&w=870&auto-format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "A professional technician cleaning a carpet with an extractor",
  },
  {
    url: "https://media.istockphoto.com/id/2210876315/photo/spraying-a-chemical-from-a-washing-vacuum-cleaner-when-cleaning-the-fabric-upholstery-of-a.webp?a=1&b=1&s=612x612&w=0&k=20&c=7PJYuhXH1BUcBCwL31BAL9ylpWaPlSyMOJKNBrydfCc=",
    alt: "Elegant and clean dining room chairs",
  },
  {
    url: "https://media.gettyimages.com/id/2151941242/photo/man-cleaning-car-leather-seat.jpg?s=612x612&w=0&k=20&c=EQN7LyMrApSYxVTsuO8Mn7DFcfd6J-xMYEyqztEEmDY=",
    alt: "The clean and pristine interior of a modern car",
  }, 
  {
    url: "https://media.istockphoto.com/id/1130257823/photo/cleaning-mattress-by-vacuum-cleaner-dust-mites-on-bed-texture-concept-allergy-in-bed-room.jpg?s=612x612&w=0&k=20&c=CaHG_MtjhLEch0dnqk6hDu1ZMUjWiH_J1bZ5bAVra_Y=",
    alt: "The clean and elegant cleaning of matress",
  }
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.alt}
            className={`
              absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out
              ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
          />
        ))}
      </div>

      {/* Dark Overlay - THIS IS THE FIX */}
      {/* We re-enable it. You can adjust bg-opacity-50, 60, or 70 to find the perfect balance. */}
      <div className="absolute inset-0 bg-black opacity-40 z-20"></div>

      {/* Content Container */}
      <div className="relative z-30 text-center p-10">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          // Text is now white and has a drop shadow for better readability
          className="text-5xl md:text-7xl text-white font-extrabold mb-4 [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]"
        >
          Your Furniture's Second Life Starts Here
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          // Text is also white with a shadow
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]"
        >
          We provide premium dry cleaning that removes dirt, stains, and
          allergens from your sofas, chairs, carpets and more.
        </motion.p>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 1 }}
        >
          <ScrollLink
            to="contact"
            smooth={true}
            offset={-80}
            duration={500}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 cursor-pointer shadow-lg"
          >
            Get a Free Quote
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
