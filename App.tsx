
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIChatAssistant from './components/AIChatAssistant';

const App: React.FC = () => {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <footer className="py-12 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-xl font-outfit font-bold tracking-tight">Noorulain<span className="text-blue-400">.</span></span>
            <p className="text-slate-500 text-sm mt-2">© 2024 Noorulain Farooq. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
             <a href="https://github.com/NoorulainFarooq" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
             <a href="https://www.linkedin.com/in/noorulain-farooq-a8a1b1223" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
             <a href="#about" className="text-slate-400 hover:text-white transition-colors">About</a>
          </div>
        </div>
      </footer>

      {/* AI Assistant to make the portfolio modern and interactive */}
      <AIChatAssistant />
    </div>
  );
};

export default App;
