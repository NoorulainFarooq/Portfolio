
import React from 'react';
import { ExternalLink, Github, Zap, Shield, Cpu, Layers, ArrowRight } from 'lucide-react';
import { Project } from '../types';

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Tele-Health AI Monitor",
      description: "Enterprise-grade voice assistant for remote vital signs monitoring. Automates data entry and emergency alerts for healthcare providers via Vapi & n8n.",
      tags: ["Healthcare", "Automation", "Vapi"],
      link: "https://github.com/NoorulainFarooq/AI-Voice-Assistant-for-Vital-Signs-Monitoring-using-Vapi-n8n",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Scout.ai - Market Intel",
      description: "AI Intelligence tool for real-time market and job discovery. Uses LLM-based web scraping to extract actionable insights from live data sources.",
      tags: ["Data Mining", "LLM", "Indeed API"],
      link: "https://github.com/NoorulainFarooq/AI-Company-Scout-",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "High-Performance ML Study",
      description: "Benchmarking XGBoost and LightGBM for critical classification tasks. Focused on precision-recall optimization for high-stakes business environments.",
      tags: ["Machine Learning", "Optimization"],
      link: "https://github.com/NoorulainFarooq/Comparative-Analysis-between-AI-Models",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      title: "AI Knowledge Processor",
      description: "Voice-to-Knowledge system using Whisper API. Transforms unstructured lecture or meeting audio into formatted, searchable intelligence reports.",
      tags: ["NLP", "Transcription", "n8n"],
      link: "https://github.com/NoorulainFarooq/Notes-Taker-",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="projects" className="py-32 bg-[#050810]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Portfolio Gallery</span>
          <h2 className="text-4xl md:text-5xl font-outfit font-bold mb-6">Proven <span className="gradient-text">AI Implementations</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-light text-lg">
            Deploying intelligent solutions that solve complex operational challenges across diverse sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div key={project.id} className="glass-card rounded-[2.5rem] overflow-hidden group hover:bg-slate-900/30 transition-all duration-500 border-white/5 hover:border-amber-500/20">
              <div className="h-72 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-6 left-8 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[9px] uppercase tracking-[0.15em] font-black bg-blue-600/90 text-white px-4 py-1.5 rounded-full shadow-xl">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold mb-4 font-outfit tracking-tight group-hover:text-amber-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 mb-10 leading-relaxed font-light">
                  {project.description}
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-8">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    className="flex items-center space-x-2 text-slate-300 hover:text-white font-bold transition-colors group/link"
                  >
                    <Github size={20} className="text-amber-500" />
                    <span>Technical Repository</span>
                    <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a 
            href="#contact" 
            className="inline-flex items-center space-x-3 px-10 py-5 btn-gold text-white rounded-2xl font-bold transition-all hover:scale-105"
          >
            <span>Request a Custom Solution</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
