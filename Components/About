
import React from 'react';
import { BookOpen, Database, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const specializations = [
    { name: 'Workflow Automation', icon: <Zap className="text-amber-400" />, desc: 'Enterprise n8n integration' },
    { name: 'Data Architecture', icon: <Database className="text-blue-400" />, desc: 'Intelligent handling & ETL' },
    { name: 'System Security', icon: <ShieldCheck className="text-green-400" />, desc: 'Validated & Secure AI' },
    { name: 'ML Strategy', icon: <BookOpen className="text-purple-400" />, desc: 'Predictive ROI modeling' },
  ];

  return (
    <section id="about" className="py-32 bg-[#080b14]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Professional Background</span>
            <h2 className="text-4xl md:text-5xl font-outfit font-bold mb-10 leading-tight">Bridging Human Expertise with <span className="text-blue-500">Machine Intelligence.</span></h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-light mb-8">
              <p>
                As an AI specialist based in the practical world of automation, my focus is on delivering <span className="text-white font-medium">tangible results</span> for organizations ready to lead in the digital era.
              </p>
              <p>
                Beginning my career with <span className="text-blue-400 font-medium">CNTXT</span> in Data Annotation, I mastered the nuances of data quality—the foundation of every successful AI system. Today, I leverage that insight to build <span className="text-white">autonomous agents</span> that handle complex business operations.
              </p>
              <p>
                I specialize in creating custom AI frameworks for <span className="text-amber-500/80 font-medium italic underline underline-offset-8">Healthcare, Finance, and Customer Support</span>, ensuring every solution is as reliable as it is innovative.
              </p>
            </div>
            <a 
              href="#projects" 
              className="inline-flex items-center space-x-2 text-amber-500 font-bold hover:text-amber-400 transition-colors group"
            >
              <span>Explore My Solutions</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {specializations.map((spec, index) => (
              <div key={index} className="glass-card p-8 rounded-[2rem] group hover:border-amber-500/30 transition-all hover:bg-slate-900/40">
                <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {spec.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-outfit tracking-tight">{spec.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{spec.desc}</p>
              </div>
            ))}
            
            <div className="sm:col-span-2 mt-6 p-1 bg-gradient-to-r from-blue-600/20 via-amber-500/20 to-blue-600/20 rounded-[2rem]">
               <div className="bg-[#050810] p-8 rounded-[1.9rem] flex items-center justify-between">
                  <div>
                    <p className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-1">Graduating</p>
                    <p className="text-2xl font-outfit font-bold">Fall 2026</p>
                  </div>
                  <div className="h-12 w-px bg-slate-800"></div>
                  <div>
                    <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-1">Experience</p>
                    <p className="text-2xl font-outfit font-bold">Data Expert</p>
                  </div>
                  <div className="h-12 w-px bg-slate-800 hidden sm:block"></div>
                  <div className="hidden sm:block">
                    <p className="text-green-500 font-bold text-xs uppercase tracking-widest mb-1">Status</p>
                    <p className="text-2xl font-outfit font-bold">Available</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
