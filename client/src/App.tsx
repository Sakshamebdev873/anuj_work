import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link as ScrollLink } from 'react-scroll';
import { FaWhatsapp, FaStar, FaShieldAlt, FaLeaf, FaClock } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';

// SEO Configuration
const SEO = () => (
  <Helmet>
    <title>Expert Sofa Dry Cleaning Services | SofaClean Pro</title>
    <meta
      name="description"
      content="SofaClean Pro offers professional sofa dry cleaning, stain removal, and fabric protection. Revitalize your furniture today! Call or WhatsApp 9927754330 for a free, no-obligation quote."
    />
    <meta
      name="keywords"
      content="sofa dry cleaning, upholstery cleaning, furniture cleaning, stain removal, fabric protection, professional cleaning services"
    />
  </Helmet>
);

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
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
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ['Home', 'About', 'Services', 'Process', 'Contact'];

    return (
        <div className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto flex justify-between items-center h-20 px-4">
                <h1 className={`text-3xl font-bold ${scrolled ? 'text-blue-600' : 'text-white'}`}>SofaClean Pro</h1>
                <ul className={`hidden md:flex space-x-6 ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                    {navLinks.map(link => (
                        <li key={link} className="font-semibold cursor-pointer hover:text-blue-600 transition-colors duration-300">
                           <ScrollLink to={link.toLowerCase()} spy={true} smooth={true} offset={-80} duration={500}>{link}</ScrollLink>
                        </li>
                    ))}
                </ul>
                <div onClick={handleNav} className="block md:hidden z-10 cursor-pointer">
                    {nav ? <FiX size={25} className={scrolled ? 'text-gray-800' : 'text-white'} /> : <FiMenu size={25} className={scrolled ? 'text-gray-800' : 'text-white'} />}
                </div>
                <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-white text-gray-800 flex flex-col justify-center items-center transition-transform duration-300 ease-in-out ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
                    <ul className="text-center">
                         {navLinks.map(link => (
                            <li key={link} className="py-6 text-4xl">
                               <ScrollLink onClick={handleNav} to={link.toLowerCase()} spy={true} smooth={true} offset={-80} duration={500}>{link}</ScrollLink>
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
    <motion.a
        href="https://wa.me/919927754330"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-50"
        whileHover={{ scale: 1.1, rotate: 10 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <FaWhatsapp size={30} />
    </motion.a>
);

const App = () => {
  return (
    <HelmetProvider>
      <SEO />
      <div className="bg-gray-50 text-gray-800 font-sans">
        <Navbar />

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558211583-d26f610c1eb1?q=80&w=2070&auto=format&fit=crop)' }}>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative text-center text-white p-10">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-7xl font-extrabold mb-4"
            >
              Your Sofa's Second Life Starts Here
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            >
              We provide premium sofa dry cleaning that removes dirt, stains, and allergens, leaving your furniture impeccably clean and fresh.
            </motion.p>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
                <ScrollLink to="contact" smooth={true} offset={-80} duration={500} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 cursor-pointer">
                    Get a Free Quote
                </ScrollLink>
            </motion.div>
          </div>
        </section>

        {/* About Us Section */}
        <AnimatedSection id="about">
            <div className="container mx-auto text-center max-w-4xl">
                <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-6">
                    Who We Are
                </motion.h2>
                <motion.p variants={itemVariants} className="text-lg mb-4">
                    SofaClean Pro is a team of dedicated professionals passionate about bringing new life to your furniture. We believe a clean home is a happy home, and a clean sofa is the centerpiece of that happiness.
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
                    Our Cleaning Services
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-4">Deep Cleaning</h3>
                        <p>Our signature service. An intensive cleaning process that removes all dirt, dust, and allergens from deep within your sofa's fabric, revitalizing its look and feel.</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-4">Advanced Stain Removal</h3>
                        <p>From wine and coffee to ink and pet stains, our specialized techniques effectively and safely remove even the toughest spots, restoring your sofa's original beauty.</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-4">Fabric & Odor Protection</h3>
                        <p>We apply an invisible protective shield that repels future stains and spills, while our deodorizing treatment neutralizes odors, keeping your sofa fresh.</p>
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
        
        {/* Testimonials Section */}
        <AnimatedSection id="testimonials">
            <div className="container mx-auto max-w-4xl">
                <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-12">
                    What Our Clients Say
                </motion.h2>
                <motion.div variants={itemVariants} className="bg-blue-50 p-8 rounded-lg shadow-lg text-center max-w-2xl mx-auto">
                    <p className="text-lg italic mb-4">"Absolutely amazed by the results! My 10-year-old sofa looks brand new. The team was professional, punctual, and the service was seamless. Highly recommend SofaClean Pro!"</p>
                    <p className="font-bold">- Sarah L.</p>
                </motion.div>
            </div>
        </AnimatedSection>


        {/* CTA Section */}
        <AnimatedSection id="contact">
            <div className="container mx-auto text-center bg-blue-600 text-white py-20 rounded-lg">
                <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4">
                    Ready for a Cleaner Sofa?
                </motion.h2>
                <motion.p variants={itemVariants} className="text-lg mb-8">
                    Contact us now for a free, no-obligation quote. It's fast and easy!
                </motion.p>
                <motion.div variants={itemVariants} className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full inline-block text-2xl">
                   Call or WhatsApp: 9927754330
                </motion.div>
            </div>
        </AnimatedSection>
        
        <FloatingWhatsApp />

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} SofaClean Pro. All Rights Reserved.</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <a href="#" className="hover:text-blue-400">Facebook</a>
                    <a href="#" className="hover:text-blue-400">Instagram</a>
                </div>
            </div>
        </footer>
      </div>
    </HelmetProvider>
  );
};

export default App;