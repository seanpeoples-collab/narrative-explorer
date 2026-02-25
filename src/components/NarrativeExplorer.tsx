import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { narratives, NarrativeModel } from '../data/narratives';
import { NarrativeVisualizer } from './NarrativeVisualizer';
import { NarrativeWizard } from './NarrativeWizard';
import { NarrativeComparison } from './NarrativeComparison';
import { StoryExamples } from './StoryExamples';
import { cn } from '../lib/utils';
import { ChevronRight, Info, BookOpen, Map, Users, Network, Activity, Sparkles, LayoutGrid, Table2, Code, X, MessageSquare, Globe } from 'lucide-react';

export default function NarrativeExplorer() {
  const [mode, setMode] = useState<'explore' | 'wizard' | 'compare'>('explore');
  const [selectedId, setSelectedId] = useState<string>(narratives[0].id);
  const [showEmbed, setShowEmbed] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const selectedModel = narratives.find(n => n.id === selectedId) || narratives[0];

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setEmbedUrl(window.location.origin);
    }
  }, []);

  const handleWizardComplete = (resultId: string) => {
    setSelectedId(resultId);
    setMode('explore');
  };

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-indigo-100">
      <div className="w-full max-w-full px-4 md:px-0 py-6 md:py-8">
        
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center relative">
          <button 
            onClick={() => setShowEmbed(true)}
            className="absolute right-0 top-0 text-slate-300 hover:text-indigo-500 transition-colors p-2"
            title="Get Embed Code"
          >
            <Code className="w-5 h-5" />
          </button>

          <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-4 text-slate-900">
            Beyond the Hero's Journey
          </h1>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-serif italic mb-8">
            Exploring innovative models for digital storytelling structure.
          </p>

          {/* Mode Toggle */}
          <div className="inline-flex bg-slate-50 p-1 rounded-full border border-slate-100 overflow-x-auto max-w-full">
            <button
              onClick={() => setMode('explore')}
              className={cn(
                "px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap",
                mode === 'explore' ? "bg-white text-indigo-900 shadow-sm border border-indigo-100" : "text-slate-500 hover:text-slate-800"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              Explore Models
            </button>
            <button
              onClick={() => setMode('wizard')}
              className={cn(
                "px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap",
                mode === 'wizard' ? "bg-white text-indigo-900 shadow-sm border border-indigo-100" : "text-slate-500 hover:text-slate-800"
              )}
            >
              <Sparkles className="w-4 h-4" />
              Find Your Structure
            </button>
            <button
              onClick={() => setMode('compare')}
              className={cn(
                "px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap",
                mode === 'compare' ? "bg-white text-indigo-900 shadow-sm border border-indigo-100" : "text-slate-500 hover:text-slate-800"
              )}
            >
              <Table2 className="w-4 h-4" />
              Compare All
            </button>
          </div>
        </header>

        {/* Main Interface */}
        <AnimatePresence mode="wait">
          {mode === 'wizard' ? (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <NarrativeWizard onComplete={handleWizardComplete} />
            </motion.div>
          ) : mode === 'compare' ? (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <NarrativeComparison />
            </motion.div>
          ) : (
            <motion.div
              key="explore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              
              {/* Sidebar / Navigation */}
              <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-3 lg:gap-2 pb-6 lg:pb-0 snap-x -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
                {narratives.map((narrative) => (
                  <button
                    key={narrative.id}
                    onClick={() => setSelectedId(narrative.id)}
                    className={cn(
                      "flex-none w-[85vw] sm:w-[280px] lg:w-full text-left px-5 py-4 rounded-xl lg:rounded-lg transition-all duration-300 flex items-center justify-between group snap-center border lg:border-transparent",
                      selectedId === narrative.id
                        ? "bg-indigo-50 border-indigo-100 font-medium text-indigo-900 shadow-sm lg:shadow-none"
                        : "bg-white border-slate-100 lg:bg-transparent hover:bg-slate-50 text-slate-500"
                    )}
                  >
                    <div>
                      <h3 className={cn(
                        "font-serif text-lg",
                        selectedId === narrative.id ? "text-indigo-900" : "text-slate-500 group-hover:text-slate-700"
                      )}>
                        {narrative.title}
                      </h3>
                      <p className={cn(
                        "text-xs uppercase tracking-wider mt-1",
                        selectedId === narrative.id ? "text-indigo-400" : "text-slate-400"
                      )}>
                        {narrative.origin}
                      </p>
                    </div>
                    {selectedId === narrative.id && (
                      <motion.div layoutId="active-indicator">
                        <ChevronRight className="w-5 h-5 text-indigo-500" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-transparent"
                  >
                    {/* Visualizer Section */}
                    <div className="h-80 md:h-96 w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 relative mb-8">
                      <NarrativeVisualizer model={selectedModel} />
                      <div className="absolute bottom-4 right-4">
                         <span className="text-[10px] uppercase tracking-widest text-indigo-400 bg-white/80 px-2 py-1 rounded-full border border-indigo-100">
                           Interactive Visualization
                         </span>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="px-0 md:px-2">
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6 gap-2">
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900">{selectedModel.title}</h2>
                        <span className="text-xs md:text-sm font-medium text-indigo-400 uppercase tracking-widest">{selectedModel.visualType}</span>
                      </div>
                      
                      <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 font-serif">
                        {selectedModel.fullDescription}
                      </p>

                      {/* Key Traits Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <TraitCard 
                          icon={<Users className="w-4 h-4" />}
                          label="Protagonist"
                          value={selectedModel.keyTraits.protagonist}
                        />
                        <TraitCard 
                          icon={<Network className="w-4 h-4" />}
                          label="Structure"
                          value={selectedModel.keyTraits.structure}
                        />
                        <TraitCard 
                          icon={<Activity className="w-4 h-4" />}
                          label="Goal"
                          value={selectedModel.keyTraits.goal}
                        />
                        <TraitCard 
                          icon={<BookOpen className="w-4 h-4" />}
                          label="Vibe"
                          value={selectedModel.keyTraits.vibe}
                        />
                      </div>

                      {/* Story Examples */}
                      <StoryExamples examples={selectedModel.examples} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Embed Modal */}
        <AnimatePresence>
          {showEmbed && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setShowEmbed(false)}
            >
              <motion.div 
                initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl border border-slate-100"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-serif font-medium text-slate-900">Embed this tool</h3>
                  <button onClick={() => setShowEmbed(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-slate-500 mb-4 text-sm">
                  Enter the URL where this tool is hosted, then copy the code below to embed it on your Squarespace site.
                </p>
                
                <div className="mb-4 relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={embedUrl}
                    onChange={(e) => setEmbedUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="https://your-deployed-app.com"
                  />
                </div>

                <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs text-slate-600 break-all border border-slate-200 selection:bg-indigo-100 relative group mb-4">
                  {`<iframe src="${embedUrl}" width="100%" height="1200" frameborder="0" style="border-radius: 12px; border: 1px solid #e2e8f0; display: block;"></iframe>`}
                </div>
                <p className="text-slate-400 text-xs italic">
                  Tip: Adjust the <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">height="1200"</code> value in the code above to fit your page perfectly.
                </p>
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setShowEmbed(false)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TraitCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-rose-50/50 border border-rose-100">
      <div className="mt-1 text-indigo-500">{icon}</div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-1">{label}</div>
        <div className="font-medium text-slate-700">{value}</div>
      </div>
    </div>
  );
}
