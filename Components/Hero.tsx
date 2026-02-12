
import React from 'react';
import { ArrowRight, Github, Linkedin, MessageCircle, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-600/10 blur-[140px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-semibold mb-8">
            <Sparkles size={14} />
            <span className="tracking-wide uppercase text-[10px]">Pioneering AI Solutions</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-outfit font-extrabold mb-6 leading-tight">
            Transforming <span className="gradient-text">Enterprise</span> Through AI Intelligence
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed font-light">
            I am Noorulain Farooq. I design and deploy autonomous AI systems that streamline complex workflows and drive data-centric decision making for modern businesses.
          </p>
          
          <div className="flex flex-wrap gap-5">
            <a 
              href="#projects" 
              className="px-8 py-4 btn-premium text-white rounded-xl font-bold flex items-center group transition-all"
            >
              Examine My Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="https://wa.me/923303560523" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center space-x-3 transition-all"
            >
              <MessageCircle size={20} className="text-green-400" />
              <span>Instant Chat</span>
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative group">
            <div className="w-72 h-72 md:w-[450px] md:h-[450px] relative">
              {/* Decorative Geometric Frames */}
              <div className="absolute inset-0 border-2 border-amber-500/20 rounded-[4rem] rotate-6 scale-105"></div>
              <div className="absolute inset-0 border border-blue-500/20 rounded-[4rem] -rotate-3"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000" 
                alt="AI Conceptual Interface" 
                className="absolute inset-0 w-full h-full object-cover rounded-[4rem] shadow-2xl z-10 border border-slate-800"
              />
              
              <div className="absolute -bottom-8 -right-8 glass-card border-amber-500/30 p-6 rounded-3xl z-20 flex items-center space-x-4 shadow-2xl">
                 <div className="w-12 h-12 bg-amber-500/20 flex items-center justify-center rounded-2xl text-amber-500">
                   <Sparkles size={24} />
                 </div>
                 <div>
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Global Standards</p>
                   <p className="text-lg font-outfit font-bold">Scalable AI Systems</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
