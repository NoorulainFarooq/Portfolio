
import React from 'react';
import { Mail, Linkedin, MapPin, Send, MessageCircle, ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-[#050810] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full -mr-64 -mt-64"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-outfit font-bold mb-8 leading-tight">Start Your <span className="gradient-text">AI Journey</span></h2>
            <p className="text-slate-400 text-lg mb-12 font-light">
              Ready to automate your operations or build a custom AI agent? Reach out for a consultation.
            </p>

            <div className="space-y-4">
              <a href="https://wa.me/923303560523" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 glass-card rounded-2xl hover:border-green-500/30 transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Instant Chat</p>
                    <p className="font-bold">03303560523</p>
                  </div>
                </div>
                <ArrowUpRight className="text-slate-600 group-hover:text-green-500 transition-colors" />
              </a>

              <a href="mailto:noorulainfarooq06@gmail.com" className="flex items-center justify-between p-6 glass-card rounded-2xl hover:border-blue-500/30 transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Email</p>
                    <p className="font-bold">noorulainfarooq06@gmail.com</p>
                  </div>
                </div>
                <ArrowUpRight className="text-slate-600 group-hover:text-blue-500 transition-colors" />
              </a>

              <a href="https://www.linkedin.com/in/noorulain-farooq-a8a1b1223" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 glass-card rounded-2xl hover:border-blue-400/30 transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-400/10 rounded-xl flex items-center justify-center text-blue-400">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">LinkedIn</p>
                    <p className="font-bold">Network</p>
                  </div>
                </div>
                <ArrowUpRight className="text-slate-600 group-hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-slate-900/40 border border-white/5 p-10 md:p-14 rounded-[3rem] backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-8 font-outfit">Project Consultation</h3>
              <form className="grid md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                  <input type="text" placeholder="e.g. Abdullah Ahmed" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-500/50 transition-colors" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Company / Organization</label>
                  <input type="text" placeholder="Company Name" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-500/50 transition-colors" />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Inquiry Details</label>
                  <textarea rows={4} placeholder="Describe your automation needs..." className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="w-full py-5 btn-gold text-white rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all">
                    <Send size={18} />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
