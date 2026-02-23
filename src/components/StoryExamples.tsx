import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface StoryExamplesProps {
  examples: { title: string; description: string }[];
}

export function StoryExamples({ examples }: StoryExamplesProps) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % examples.length);
  const prev = () => setIndex((prev) => (prev - 1 + examples.length) % examples.length);

  return (
    <div className="mt-8 p-6 bg-stone-50 rounded-2xl border border-stone-200 relative overflow-hidden">
      <div className="relative z-10">
        <h4 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Story Examples
        </h4>
        
        <div className="min-h-[100px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2"
            >
              <h5 className="font-serif text-xl text-[#1C1917] font-medium">
                {examples[index].title}
              </h5>
              <p className="text-stone-600 font-serif italic leading-relaxed">
                {examples[index].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-1">
            {examples.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === index ? "w-4 bg-indigo-500" : "w-1 bg-slate-300"
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={prev}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={next}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
