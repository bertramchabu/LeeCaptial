import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, BarChart3, Globe2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PerformanceChart from '../components/PerformanceChart';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy/5 via-white to-cerulean/5 pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-5xl md:text-7xl font-extrabold font-montserrat leading-tight">
              <span className="bg-gradient-to-r from-[#002B5B] to-[#3282B8] bg-clip-text text-transparent">Precision Trading.</span>
              <br />
              <span className="text-[#1e2f3f]">Strategic Growth.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Lee Capital delivers data-driven investment solutions, blending deep market expertise with modern fintech infrastructure.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/login" className="btn-primary flex items-center gap-2">
                Access Client Portal <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn-outline">Explore Strategies</Link>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center">
              <div><div className="text-3xl font-bold text-[#002B5B]">$2.4B</div><div className="text-sm text-gray-500">AUM</div></div>
              <div><div className="text-3xl font-bold text-[#002B5B]">15+</div><div className="text-sm text-gray-500">Years Track</div></div>
              <div><div className="text-3xl font-bold text-[#002B5B]">98%</div><div className="text-sm text-gray-500">Client Retention</div></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#3282B8] font-semibold tracking-wide">DATA-DRIVEN INSIGHTS</span>
            <h2 className="text-4xl font-bold text-[#002B5B] mt-2">Performance at a Glance</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Real-time analytics mirroring your logo's bar chart energy.</p>
          </div>
          <PerformanceChart />
        </div>
      </section>

      <section className="py-20 bg-light-blue/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#002B5B]">Core Capabilities</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#002B5B] to-[#3282B8] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              { icon: TrendingUp, title: 'Portfolio Management', desc: 'Active/passive strategies with dynamic risk allocation.' },
              { icon: BarChart3, title: 'Market Analysis', desc: 'AI-enhanced macro & quant research for edge.' },
              { icon: Shield, title: 'Capital Investment', desc: 'Private placements, venture & structured products.' },
            ].map((service, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="stat-card group hover:border-cerulean/40">
                <service.icon className="h-12 w-12 text-[#3282B8] mb-5 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-[#002B5B]">{service.title}</h3>
                <p className="text-gray-600 mt-3 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 text-center relative">
          <div className="glass-card p-12 max-w-4xl mx-auto">
            <Globe2 className="h-14 w-14 text-[#3282B8] mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-[#002B5B]">Ready to build lasting wealth?</h3>
            <p className="text-gray-700 mt-3 text-lg">Join a community of institutional and private investors who trust Lee Capital.</p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link to="/login" className="btn-primary">Secure Client Portal</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;