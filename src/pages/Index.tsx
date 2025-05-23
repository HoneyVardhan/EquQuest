
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Book, GraduationCap, Zap, ChevronRight, Mail, MessageSquare, Github, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

// Topic card data
const topics = [
  { id: 'math', name: 'Math', icon: 'SquareEqual', color: 'from-blue-500 to-indigo-600', description: 'Algebra, Calculus, Geometry and more' },
  { id: 'science', name: 'Science', icon: 'FlaskConical', color: 'from-green-500 to-emerald-600', description: 'Physics, Chemistry, Biology and more' },
  { id: 'history', name: 'History', icon: 'Landmark', color: 'from-amber-500 to-yellow-600', description: 'Ancient civilizations, World Wars and more' },
  { id: 'technology', name: 'Technology', icon: 'Cpu', color: 'from-purple-500 to-violet-600', description: 'Coding, AI, Cybersecurity and more' },
  { id: 'language', name: 'Language', icon: 'Languages', color: 'from-red-500 to-pink-600', description: 'English, Spanish, French and more' },
  { id: 'arts', name: 'Arts', icon: 'Paintbrush', color: 'from-cyan-500 to-teal-600', description: 'Drawing, Music, Dance and more' },
];

// Topic card component
const TopicCard = ({ topic }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = React.lazy(() => import('lucide-react').then(mod => ({ default: mod[topic.icon] })));

  return (
    <Link 
      to={`/topics/${topic.id}`}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className={`h-full backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-xl p-6 border border-white/20 dark:border-white/10 flex flex-col items-center justify-center text-center transition-all duration-300 overflow-hidden group-hover:border-white/40 dark:group-hover:border-white/20`}
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        animate={isHovered ? { boxShadow: '0 0 25px rgba(255, 255, 255, 0.2)' } : { boxShadow: '0 0 0 rgba(0, 0, 0, 0)' }}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${topic.color} shadow-lg`}>
          <React.Suspense fallback={<div className="w-6 h-6 animate-pulse bg-white/20 rounded-full"></div>}>
            <IconComponent className="w-6 h-6 text-white" />
          </React.Suspense>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{topic.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{topic.description}</p>
        
        {/* Glowing hover effect */}
        <motion.div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{ 
            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)'}, transparent 40%)`,
            zIndex: -1
          }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );
};

// Particle effect component
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/20 dark:bg-white/10 rounded-full"
          style={{
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      ))}
    </div>
  );
};

// Main component
const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Track mouse position for glow effects
  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* Background Effects */}
      <Particles />
      
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 dark:bg-blue-700 rounded-full filter blur-[100px] opacity-30 animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400 dark:bg-purple-700 rounded-full filter blur-[100px] opacity-30 animate-pulse delay-1000" />
      
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md px-4 sm:px-6 py-4 border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-black/20 border-white/10' 
          : 'bg-white/20 border-white/30'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div 
              className={`relative w-8 h-8 mr-2 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}
              whileHover={{ rotate: 20 }}
              transition={{ duration: 0.2 }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-full bg-blue-400 opacity-40 blur-sm" />
            </motion.div>
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              EduQuest
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${
                    darkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'
                  }`}>
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={darkMode ? 'bg-transparent text-white hover:bg-white/10' : 'bg-transparent text-gray-700 hover:bg-black/5'}>
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4">
                      <h4 className="text-lg font-medium mb-2">About EduQuest</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        EduQuest is a modern educational platform designed to make learning interactive, enjoyable, and accessible to everyone.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <Link to="/about" className="block p-3 rounded-lg hover:bg-accent">
                          <div className="font-medium mb-1">Our Mission</div>
                          <div className="text-sm text-muted-foreground">Learn about our goals and vision</div>
                        </Link>
                        <Link to="/about#team" className="block p-3 rounded-lg hover:bg-accent">
                          <div className="font-medium mb-1">Our Team</div>
                          <div className="text-sm text-muted-foreground">Meet the experts behind EduQuest</div>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact" className={`px-3 py-2 rounded-md text-sm font-medium ${
                    darkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'
                  }`}>
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                darkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-white/60 text-gray-700 hover:bg-white/80'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Login Button */}
            <Link to="/auth">
              <Button 
                className={`relative group ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                size="sm"
              >
                Login
                <div className="absolute inset-0 rounded-md bg-blue-400 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300" />
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                darkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-white/60 text-gray-700 hover:bg-white/80'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Login Button */}
            <Link to="/auth">
              <Button 
                variant="outline" 
                size="sm"
                className={`relative group ${
                  darkMode 
                    ? 'bg-blue-600/80 hover:bg-blue-700 border-white/20' 
                    : 'bg-blue-500/80 hover:bg-blue-600 border-white/40'
                } text-white`}
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduQuest
              </span>
            </h1>
            <p className={`text-xl sm:text-2xl mb-8 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Learn smarter, challenge yourself, earn certificates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quiz">
                <Button size="lg" className={`relative overflow-hidden group ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white px-6`}>
                  <span className="mr-2">Start Your Journey</span>
                  <ChevronRight size={18} />
                  <div className="absolute inset-0 rounded-md bg-blue-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
                </Button>
              </Link>
              
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  size="lg"
                  className={`relative group ${
                    darkMode 
                      ? 'bg-black/30 hover:bg-black/50 border-white/20 text-white' 
                      : 'bg-white/50 hover:bg-white/80 border-white/70 text-gray-700'
                  } backdrop-blur-sm px-6`}
                >
                  Login
                  <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-20 h-20 rounded-full bg-blue-500/20 dark:bg-blue-500/10 blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-500/20 dark:bg-purple-500/10 blur-xl animate-pulse delay-700" />
      </section>

      {/* Topics Section */}
      <section className="py-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Explore Topics
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Dive into our curated collection of subjects designed to expand your knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/topics">
              <Button 
                variant="outline" 
                className={`relative group ${
                  darkMode 
                    ? 'bg-black/30 hover:bg-black/50 border-white/20 text-white' 
                    : 'bg-white/50 hover:bg-white/80 border-white/70 text-gray-700'
                } backdrop-blur-sm`}
              >
                View All Topics
                <ChevronRight size={18} className="ml-1" />
                <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose EduQuest Section */}
      <section className="py-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Why Choose EduQuest
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover the benefits that set our learning platform apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className={`backdrop-blur-md rounded-xl p-6 border ${
                darkMode ? 'bg-black/20 border-white/10' : 'bg-white/30 border-white/40'
              }`}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-blue-500 to-indigo-600">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Interactive Learning
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Engage with dynamic quizzes and hands-on activities designed to reinforce learning concepts.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className={`backdrop-blur-md rounded-xl p-6 border ${
                darkMode ? 'bg-black/20 border-white/10' : 'bg-white/30 border-white/40'
              }`}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-green-500 to-emerald-600">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Expert Instructors
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Learn from industry professionals with years of experience and passion for teaching.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className={`backdrop-blur-md rounded-xl p-6 border ${
                darkMode ? 'bg-black/20 border-white/10' : 'bg-white/30 border-white/40'
              }`}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-purple-500 to-pink-600">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Earn Certificates
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Receive recognition for your achievements with shareable certificates upon completion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className={`backdrop-blur-lg rounded-xl p-8 sm:p-12 border relative overflow-hidden ${
              darkMode ? 'bg-black/30 border-white/10' : 'bg-white/40 border-white/40'
            }`}
            whileHover={{ boxShadow: darkMode ? '0 0 30px rgba(59, 130, 246, 0.3)' : '0 0 30px rgba(59, 130, 246, 0.2)' }}
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500 rounded-full filter blur-[80px] opacity-30" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500 rounded-full filter blur-[80px] opacity-30" />
            
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Ready to start learning?
            </h2>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of students who have already transformed their knowledge with EduQuest.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quiz">
                <Button size="lg" className={`relative overflow-hidden group ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white px-6`}>
                  <span className="mr-2">Start Your Journey</span>
                  <ChevronRight size={18} />
                  <div className="absolute inset-0 rounded-md bg-blue-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg"
                  className={`relative group ${
                    darkMode 
                      ? 'bg-black/30 hover:bg-black/50 border-white/20 text-white' 
                      : 'bg-white/50 hover:bg-white/80 border-white/70 text-gray-700'
                  } backdrop-blur-sm px-6`}
                >
                  Contact Us
                  <MessageSquare size={18} className="ml-2" />
                  <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 sm:px-6 relative z-10 border-t ${
        darkMode ? 'bg-black/20 border-white/5' : 'bg-white/20 border-white/20'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className={`relative w-8 h-8 mr-2 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-blue-600' : 'bg-blue-500'
                }`}>
                  <GraduationCap className="w-5 h-5 text-white" />
                  <div className="absolute inset-0 rounded-full bg-blue-400 opacity-40 blur-sm" />
                </div>
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  EduQuest
                </span>
              </div>
              <p className={`mb-4 max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                EduQuest is a modern educational platform designed to make learning interactive, enjoyable, and accessible to everyone.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Links</h3>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/about" className="hover:underline">About</Link></li>
                <li><Link to="/topics" className="hover:underline">Topics</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Connect</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className={`p-2 rounded-full ${
                  darkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white/60 hover:bg-white/80 text-gray-700'
                } transition-colors`}>
                  <Mail size={18} />
                </a>
                <a href="#" className={`p-2 rounded-full ${
                  darkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white/60 hover:bg-white/80 text-gray-700'
                } transition-colors`}>
                  <Github size={18} />
                </a>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Email: welcome@eduquest.com
              </p>
            </div>
          </div>

          <Separator className={`my-8 ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`} />

          <div className="text-center">
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              © 2025 EduQuest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
