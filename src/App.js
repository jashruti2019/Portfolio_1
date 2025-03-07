import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import "./App.css"

const App = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

// Header Component with Navigation
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold"
        >
          <a href="#home" className={isScrolled ? 'text-gray-800' : 'text-white'}>
            Your Name
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <motion.ul 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="flex space-x-8"
          >
            {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
              <motion.li 
                key={item}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <a 
                  href={`#${item}`} 
                  className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-500 transition-colors capitalize`}
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${isScrolled ? 'text-gray-800' : 'text-white'} focus:outline-none`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white"
        >
          <ul className="px-4 py-2">
            {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
              <li key={item} className="py-2">
                <a 
                  href={`#${item}`} 
                  className="block text-gray-800 hover:text-blue-500 transition-colors capitalize"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
};

// Hero Section with Dynamic Text Effect
const HeroSection = () => {
  const [text, setText] = useState('');
  const fullText = "I build things for the web.";
  const index = useRef(0);

  useEffect(() => {
    if (index.current < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prevText => prevText + fullText[index.current]);
        index.current += 1;
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [text]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-light mb-2">Hello, I'm</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Name</h1>
          <div className="text-xl md:text-2xl font-light h-8">
            <span>{text}</span>
            <span className="animate-pulse">|</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-8"
          >
            <a 
              href="#projects" 
              className="inline-block px-6 py-3 rounded-full bg-white text-blue-600 font-medium hover:bg-gray-100 transition-colors shadow-md"
            >
              View My Work
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6 relative inline-block">
            About Me
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-50"></span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              whileInView={{ 
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.5 }
              }}
              viewport={{ once: true }}
              className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 flex-shrink-0"
            >
              <img 
                src="/api/placeholder/200/200" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="text-left">
              <p className="text-lg mb-4">
                Hi there! I'm a passionate web developer with a strong foundation in front-end and back-end technologies. I enjoy creating responsive, user-friendly websites and applications that solve real-world problems.
              </p>
              <p className="text-lg mb-4">
                With several years of experience in the industry, I've worked on various projects ranging from small business websites to complex web applications. I'm constantly learning and exploring new technologies to stay at the forefront of web development.
              </p>
              <div className="mt-6">
                <a 
                  href="#contact" 
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with secure payment processing and inventory management.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/api/placeholder/400/300",
      link: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A productivity app with drag-and-drop interface, notifications, and team collaboration features.",
      tech: ["Vue.js", "Firebase", "Tailwind CSS"],
      image: "/api/placeholder/400/300",
      link: "#"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing projects and skills with modern design elements.",
      tech: ["React", "GSAP", "Styled Components"],
      image: "/api/placeholder/400/300",
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 relative inline-block">
            My Projects
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-50"></span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Here are some of my recent projects. Each one presented unique challenges and opportunities for growth.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <a 
          href={project.link} 
          className="inline-block text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          View Project →
        </a>
      </div>
    </motion.div>
  );
};

// Skills Section
const SkillsSection = () => {
  const technicalSkills = [
    { name: "HTML5/CSS3", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Python", level: 70 },
    { name: "Database Management", level: 65 }
  ];
  
  const softSkills = [
    "Problem Solving",
    "Communication",
    "Team Collaboration",
    "Time Management",
    "Adaptability",
    "Attention to Detail"
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 relative inline-block">
            My Skills
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-50"></span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            I have experience with various technologies and am always looking to expand my skill set.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-6 text-center md:text-left">Technical Skills</h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-blue-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-6 text-center md:text-left">Soft Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-100 rounded-lg p-4 text-center flex items-center justify-center"
                >
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset submitted state after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 relative inline-block">
            Get In Touch
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-50"></span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-2/5"
          >
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-blue-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a href="mailto:your.email@example.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                    your.email@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-blue-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-gray-600">San Francisco, CA</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium mb-4">Connect with me</h4>
              <div className="flex space-x-4">
                {/* Social Icons */}
                {['github', 'linkedin', 'twitter'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ y: -5 }}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-3/5"
          >
            <h3 className="text-xl font-bold mb-6">Send me a message</h3>
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 text-green-700 p-4 rounded-lg text-center"
              >
                Thank you for your message! I'll get back to you soon.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-medium ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
                  } transition-colors w-full md:w-auto`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-gray-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <p>© {currentYear} Your Name. All rights reserved.</p>
        <p className="mt-2 text-gray-400 text-sm">
          Made with <span className="text-red-500">♥</span> using React
        </p>
      </div>
    </footer>
  );
};

export default App;