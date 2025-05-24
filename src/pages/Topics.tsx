import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, GraduationCap, ArrowLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import StreakBadge from '@/components/StreakBadge';
import UserProfile from '@/components/UserProfile';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { getUserStreak } from '@/utils/supabaseQuizStorage';

// Topic card data
const topics = [
  { 
    id: 'data-science', 
    name: 'Data Science & Analytics', 
    icon: 'BarChart2', 
    color: 'from-blue-500 to-cyan-400', 
    description: 'Master data analysis, visualization, and statistical modeling techniques.' 
  },
  { 
    id: 'ai-ml', 
    name: 'Artificial Intelligence & Machine Learning', 
    icon: 'Brain', 
    color: 'from-purple-500 to-violet-600', 
    description: 'Explore AI algorithms, neural networks, and machine learning frameworks.' 
  },
  { 
    id: 'cloud-computing', 
    name: 'Cloud Computing & DevOps', 
    icon: 'Cloud', 
    color: 'from-cyan-500 to-blue-600', 
    description: 'Learn cloud platforms, containerization, and deployment strategies.' 
  },
  { 
    id: 'cybersecurity', 
    name: 'Cybersecurity Fundamentals', 
    icon: 'Shield', 
    color: 'from-red-500 to-orange-600', 
    description: 'Understand security protocols, threat detection, and risk management.' 
  },
  { 
    id: 'digital-marketing', 
    name: 'Digital Marketing Strategies', 
    icon: 'LineChart', 
    color: 'from-green-500 to-emerald-600', 
    description: 'Discover modern marketing techniques, SEO, and social media strategies.' 
  },
  { 
    id: 'project-management', 
    name: 'Project Management & Agile', 
    icon: 'Trello', 
    color: 'from-amber-500 to-yellow-500', 
    description: 'Master project planning, agile methodologies, and team leadership.' 
  },
];

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

// Topic card component
const TopicCard = ({ topic }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    // Dynamically import the icon based on topic.icon
    import('lucide-react').then(mod => {
      setIconComponent(() => mod[topic.icon]);
    });
  }, [topic.icon]);

  return (
    <motion.div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className={`h-full backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-xl p-6 border border-white/20 dark:border-white/10 transition-all duration-300 overflow-hidden group-hover:border-white/40 dark:group-hover:border-white/20`}
        style={{
          boxShadow: isHovered ? '0 0 25px rgba(255, 255, 255, 0.2)' : '0 0 0 rgba(0, 0, 0, 0)'
        }}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${topic.color} shadow-lg`}>
          {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{topic.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{topic.description}</p>
        
        <Link to={`/quiz/${topic.id}`}>
          <Button 
            className={`w-full relative overflow-hidden group bg-gradient-to-r ${topic.color} text-white hover:opacity-90`}
          >
            Start Learning
            <ChevronRight size={18} />
            <div className="absolute inset-0 rounded-md bg-white opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
          </Button>
        </Link>
        
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
      </div>
    </motion.div>
  );
};

const Topics = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  
  // Track mouse position for glow effects
  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
  };
  
  // Load streak data
  useEffect(() => {
    const loadStreak = async () => {
      if (isAuthenticated) {
        const userStreak = await getUserStreak();
        setStreak(userStreak);
      }
    };
    
    loadStreak();
  }, [isAuthenticated]);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
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
                <NavigationMenuItem>
                  <Link to="/topics" className={`px-3 py-2 rounded-md text-sm font-medium ${
                    darkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-black/5'
                  }`}>
                    Topics
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Streak Display */}
            {streak > 0 && isAuthenticated && (
              <StreakBadge streak={streak} darkMode={darkMode} />
            )}
            
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

            {/* User Profile or Login Button */}
            {isAuthenticated ? (
              <UserProfile darkMode={darkMode} />
            ) : (
              <Button 
                onClick={() => setShowAuthModal(true)}
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
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Streak Display (mobile) */}
            {streak > 0 && isAuthenticated && (
              <StreakBadge streak={streak} darkMode={darkMode} />
            )}
          
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

            {/* User Profile or Login Button (mobile) */}
            {isAuthenticated ? (
              <UserProfile darkMode={darkMode} />
            ) : (
              <Button 
                onClick={() => setShowAuthModal(true)}
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
            )}
          </div>
        </div>
      </nav>

      {/* Back to Home Link */}
      <div className="pt-28 px-4 sm:px-6 max-w-7xl mx-auto">
        <Link to="/" className={`inline-flex items-center gap-1 mb-6 ${
          darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
        }`}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Content */}
      <section className="py-8 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1 
              className={`text-4xl sm:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Choose Your Learning Path
            </motion.h1>
            <motion.p 
              className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Select a topic that interests you and start your personalized learning journey with interactive quizzes and challenges.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {topics.map((topic, index) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`mt-20 py-12 px-4 sm:px-6 relative z-10 border-t ${
        darkMode ? 'bg-black/20 border-white/5' : 'bg-white/20 border-white/20'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            © 2025 EduQuest. Contact us at welcome@eduquest.com
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Topics;
