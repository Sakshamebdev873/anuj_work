import React, { useState, useEffect } from 'react';
import { motion, useAnimation, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link as ScrollLink } from 'react-scroll';
import { FaWhatsapp, FaStar, FaShieldAlt, FaLeaf, FaClock, FaPhoneAlt, FaInstagram } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import HeroSection from './HeroSection';

// SEO Configuration
const SEO = () => (
  <Helmet>
    <title>Expert Sofa Dry Cleaning Services | Prem Sofa Dry Cleaners</title>
    <meta
      name="description"
      content="Prem Sofa Dry Cleaners offers professional sofa dry cleaning, stain removal, and fabric protection. Revitalize your furniture today! Call or WhatsApp 9927754330 for a free, no-obligation quote."
    />
    <meta
      name="keywords"
      content="sofa dry cleaning, upholstery cleaning, furniture cleaning, stain removal, fabric protection, professional cleaning services"
    />
  </Helmet>
);

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants : Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

// Reusable Animated Section Component
const AnimatedSection = ({ children, id }: { children: React.ReactNode, id: string }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="py-20 px-4 md:px-8"
    >
      {children}
    </motion.section>
  );
};

// Navbar Component

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleNav = () => setNav(!nav);

    useEffect(() => {
        const handleScroll = () => {
            // Check if user has scrolled more than 10px
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        // Cleanup function to remove the event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ['Home', 'About', 'Services', 'Process', 'Contact'];

    return (
        <div className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto flex justify-between items-center h-20 px-4">
                {/* Logo with corrected text color logic */}
                <h1 className={`text-3xl font-bold transition-colors duration-300 ${scrolled ? 'text-blue-600' : 'text-white'}`}>
                    Prem Sofa Dry Cleaners
                </h1>
                
                {/* Desktop Navigation Links with corrected text color logic */}
                <ul className="hidden md:flex space-x-6">
                    {navLinks.map(link => (
                        <li key={link} className={`font-semibold cursor-pointer transition-colors duration-300 ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-gray-300'}`}>
                           <ScrollLink to={link.toLowerCase()} spy={true} smooth={true} offset={-80} duration={500}>
                               {link}
                           </ScrollLink>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Icon with corrected logic */}
                <div onClick={handleNav} className="block md:hidden z-10 cursor-pointer">
                    {nav ? (
                        <FiX size={25} className="text-gray-800" /> // Close icon is always dark on white menu
                    ) : (
                        <FiMenu size={25} className={`transition-colors duration-300 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
                    )}
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-white text-gray-800 flex flex-col justify-center items-center transition-transform duration-300 ease-in-out ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
                    <ul className="text-center">
                         {navLinks.map(link => (
                            <li key={link} className="py-6 text-4xl">
                               <ScrollLink onClick={handleNav} to={link.toLowerCase()} spy={true} smooth={true} offset={-80} duration={500}>
                                   {link}
                               </ScrollLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


// Floating WhatsApp Button
const FloatingWhatsApp = () => (
    <AnimatedSection id="contact">
    <div className="container mx-auto text-center bg-blue-600 text-white py-20 rounded-lg shadow-2xl">
        <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4">
            Ready for a Cleaner Sofa?
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg mb-8 max-w-2xl mx-auto">
            Contact us now for a free, no-obligation quote. It's fast and easy!
        </motion.p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
            {/* Corrected Call Button */}
            <motion.a
                href="tel:9927754330"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-transform"
            >
                <FaPhoneAlt />
                <span>Call Now</span>
            </motion.a>

            {/* WhatsApp Button */}
            <motion.a
                href="https://wa.me/919927754330"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-green-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-transform"
            >
                <FaWhatsapp />
                <span>Message on WhatsApp</span>
            </motion.a>
        </div>
    </div>
</AnimatedSection>
);

const App = () => {
  return (
    <HelmetProvider>
      <SEO />
      <div className="bg-gray-50 text-gray-800 font-sans">
        <Navbar />

        {/* Hero Section */}
       <HeroSection></HeroSection>

        {/* About Us Section */}
        <AnimatedSection id="about">
            <div className="container mx-auto text-center max-w-4xl">
                <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-6">
                    Who We Are
                </motion.h2>
                <motion.p variants={itemVariants} className="text-lg mb-4">
                    Prem Sofa Dry Cleaners is a team of dedicated professionals passionate about bringing new life to your furniture. We believe a clean home is a happy home, and a clean sofa is the centerpiece of that happiness.
                </motion.p>
                <motion.p variants={itemVariants} className="text-lg">
                    With years of experience, state-of-the-art equipment, and eco-friendly cleaning solutions, we guarantee a spotless and healthy living space for you and your family. Our commitment to quality and customer satisfaction is our top priority.
                </motion.p>
            </div>
        </AnimatedSection>
        
        {/* Why Choose Us Section */}
        <AnimatedSection id="why-choose-us">
            <div className="container mx-auto text-center">
                 <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-12">
                    Why Choose Us?
                </motion.h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <motion.div variants={itemVariants} className="text-center p-6">
                        <FaStar className="text-5xl text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Expert Quality</h3>
                        <p>Our highly trained technicians deliver a meticulous clean every time.</p>
                    </motion.div>
                     <motion.div variants={itemVariants} className="text-center p-6">
                        <FaLeaf className="text-5xl text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
                        <p>We use safe, non-toxic cleaning agents that are kind to your family and the planet.</p>
                    </motion.div>
                     <motion.div variants={itemVariants} className="text-center p-6">
                        <FaShieldAlt className="text-5xl text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Satisfaction Guaranteed</h3>
                        <p>We're not happy until you are. We stand by our work with a quality promise.</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="text-center p-6">
                        <FaClock className="text-5xl text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Quick & Reliable</h3>
                        <p>We respect your time, offering convenient scheduling and efficient service.</p>
                    </motion.div>
                </div>
            </div>
        </AnimatedSection>

        {/* Services Section */}
        <AnimatedSection id="services">
    <div className="container mx-auto max-w-6xl text-center">
        <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-12">
            Our Expert Cleaning Services
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Service Card: Sofa Dry-Cleaning */}
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                <img src="https://images.unsplash.com/photo-1672345158827-7f4aa9467b49?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sofa Dry-Cleaning" className="w-full max-h-[50vh] object-cover"/>
                <div className="p-6 text-left">
                    <h3 className="text-2xl font-bold mb-2">Sofa Dry-Cleaning</h3>
                    <p className="text-gray-600">Our signature service. We deep clean sofas to remove dirt, allergens, and tough stains, restoring freshness and revitalizing the fabric.</p>
                </div>
            </motion.div>

            {/* Service Card: Dining Chair Cleaning */}
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Dining Chair Cleaning" className="w-full object-cover max-h-[50vh] "/>
                <div className="p-6 text-left">
                    <h3 className="text-2xl font-bold mb-2">Dining Chair Cleaning</h3>
                    <p className="text-gray-600">Spills and food stains are no match for us. We bring your dining chairs back to their original elegance, making them spotless for guests.</p>
                </div>
            </motion.div>

            {/* Service Card: Office Chair Cleaning */}
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                <img src="https://imgs.search.brave.com/Q017kpmbUbIhxMRzYDbrPUmTnipPdBNlaRZFp3Z9ylc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dGhld2lyZWN1dHRl/ci5jb20vd3AtY29u/dGVudC9tZWRpYS8y/MDIwLzExL29mZmlj/ZWNoYWlycy0yMDQ4/cHgtNTk3Ni5qcGc" alt="Office Chair Cleaning" className="w-full min-h-[50vh] object-cover"/>
                <div className="p-6 text-left">
                    <h3 className="text-2xl font-bold mb-2">Office Chair Cleaning</h3>
                    <p className="text-gray-600">Enhance your workspace hygiene. We professionally clean and sanitize office chairs, creating a healthier and more productive work environment.</p>
                </div>
            </motion.div>

            {/* Service Card: Car Interior Cleaning */}
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                <img src="https://images.unsplash.com/photo-1630303433913-9c37dd9da8b0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Car Interior Cleaning" className="w-full max-h-[50vh] object-cover"/>
                <div className="p-6 text-left">
                    <h3 className="text-2xl font-bold mb-2">Car Interior Cleaning</h3>
                    <p className="text-gray-600">Revitalize your vehicle's interior. Our dry-cleaning service targets seats, carpets, and upholstery to eliminate stains, odors, and dust.</p>
                </div>
            </motion.div>

            {/* Service Card: Carpet Dry-Cleaning */}
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                <img src="https://plus.unsplash.com/premium_photo-1679775635467-630c72a1a7b6?q=80&w=726&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Carpet Dry-Cleaning" className="w-full min-h-[50vh] object-cover"/>
                <div className="p-6 text-left">
                    <h3 className="text-2xl font-bold mb-2">Carpet Dry-Cleaning</h3>
                    <p className="text-gray-600">We lift deep-seated dirt and stubborn stains from your carpets, restoring their color and texture while eliminating hidden allergens.</p>
                </div>
            </motion.div>

            {/* Service Card: Mattress Cleaning */}
            <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                <img src="https://imgs.search.brave.com/er1mjcGOxncam0rej8vgypl1ODL5vFvZKRJZ8sMOMXU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb250/ZW50Z3JpZC5ob21l/ZGVwb3Qtc3RhdGlj/LmNvbS9oZHVzL2Vu/X1VTL0RUQ0NPTU5F/Vy9BcnRpY2xlcy9o/b3ctdG8tY2xlYW4t/YS1tYXR0cmVzcy1z/dGVwLTEuanBn" alt="Mattress Cleaning" className="w-full min-h-[50vh] object-cover"/>
                <div className="p-6 text-left">
                    <h3 className="text-2xl font-bold mb-2">Mattress Cleaning</h3>
                    <p className="text-gray-600">Sleep in a healthier environment. Our mattress cleaning service effectively removes dust mites, bacteria, and stains for a hygienic rest.</p>
                </div>
            </motion.div>

        </div>
    </div>
</AnimatedSection>

        {/* How It Works Section */}
        <AnimatedSection id="process">
            <div className="container mx-auto max-w-4xl text-center">
                <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-12">
                    Our Simple 4-Step Process
                </motion.h2>
                <div className="grid md:grid-cols-4 gap-8">
                  {['Book', 'We Clean', 'We Dry', 'Enjoy'].map((step, index) => (
                    <motion.div variants={itemVariants} key={index} className="text-center">
                      <div className="relative mb-4">
                        <div className="bg-blue-600 text-white rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold mx-auto">
                          {index + 1}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold">{step}</h3>
                    </motion.div>
                  ))}
                </div>
            </div>
        </AnimatedSection>
        
 {/*-- Corrected Testimonials Section --*/}
<section id="testimonials" className="bg-blue-50"> {/* Added background color here */}
    <AnimatedSection id='testimonials'>
        <div className="container mx-auto max-w-6xl">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-12">
                What Our Clients Say
            </motion.h2>
            
            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Testimonial 1 */}
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between">
                    <div>
                        <p className="text-lg italic text-gray-600 mb-6">"Incredible service! They completely removed a stubborn coffee stain from my favorite armchair that I thought was permanent. The team was professional, punctual, and very skilled. Highly recommend Prem Sofa Dry Cleaners!"</p>
                    </div>
                    <p className="font-bold text-blue-600 text-right">- Anuj Kumar</p>
                </motion.div>

                {/* Testimonial 2 */}
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between">
                    <div>
                        <p className="text-lg italic text-gray-600 mb-6">"My 10-year-old sofa looks and smells brand new. I was amazed by the results. The attention to detail was fantastic, and the entire process was seamless from booking to completion. Absolutely worth it."</p>
                    </div>
                    <p className="font-bold text-blue-600 text-right">- Deepak Kandpal</p>
                </motion.div>

                {/* Testimonial 3 */}
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between">
                    <div>
                        <p className="text-lg italic text-gray-600 mb-6">"I used their service for my car's interior, and the transformation was stunning. Every seat and carpet was impeccably clean. A truly professional job that exceeded my expectations. I will definitely be a repeat customer."</p>
                    </div>
                    <p className="font-bold text-blue-600 text-right">- Sheeladitya Vinay Kumar</p>
                </motion.div>

            </div>
        </div>
    </AnimatedSection>
</section>


        {/* CTA Section */}
       
        
        <FloatingWhatsApp />

        {/* Footer */}
     <footer className="bg-gray-800 text-white">
    <div className="container mx-auto px-6 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Brand and Mission */}
            <div>
                <h3 className="text-xl font-bold mb-4">Prem Sofa Dry Cleaners</h3>
                <p className="text-gray-400">
                    Your trusted partner for a cleaner, healthier home environment. We specialize in revitalizing your furniture with professional care.
                </p>
            </div>

            {/* Column 2: Contact and Social */}
            <div>
                <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                <ul className="space-y-3">
                    <li className="flex items-center">
                        <FaPhoneAlt className="mr-3 text-blue-400" />
                        <a href="tel:9927754330" className="text-gray-300 hover:text-white transition-colors duration-300">
                            9927754330 , 
                        </a>
                        <a href="tel:7464840680" className="text-gray-300 hover:text-white transition-colors duration-300">
                            7464840680
                        </a>
                    </li>
                    <li className="flex items-center">
                        <FaInstagram className="mr-3 text-blue-400" />
                        <a 
                            href="https://www.instagram.com/prem_sofa_drycleaners?igsh=MXdnZWMzZmszaDJ3NA==" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-300 hover:text-white transition-colors duration-300"
                        >
                            prem_sofa_drycleaners
                        </a>
                    </li>
                </ul>
            </div>

            {/* Column 3: Service Areas */}
            <div>
                <h3 className="text-xl font-bold mb-4">Our Service Areas</h3>
                <p className="text-gray-400 leading-relaxed">
                    Bareilly, Haldwani, Rampur, Shahjahanpur, Budaun, Rudrapur, Kashipur, Ranibagh, Ranikhet, Lucknow, Kichha, and Gadarpur.
                </p>
            </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-500">
                &copy; {new Date().getFullYear()} Prem Sofa Dry Cleaners. All Rights Reserved.
            </p>
        </div>
    </div>
</footer>
      </div>
    </HelmetProvider>
  );
};

export default App;