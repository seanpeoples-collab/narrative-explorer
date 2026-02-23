import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { narratives, NarrativeModel } from '../data/narratives';
import { ChevronRight, RefreshCcw, Check, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface WizardProps {
  onComplete: (modelId: string) => void;
}

const questions = [
  {
    id: 'protagonist',
    text: "Who is at the center of your story?",
    options: [
      { label: "A single hero facing the world", value: 'heros-journey' },
      { label: "A relatable person with a specific need", value: 'story-circle' },
      { label: "A group bound by fate or ritual", value: 'scandinavian' },
      { label: "The environment or community itself", value: 'west-african' },
      { label: "The place/land is the main character", value: 'autochthonous' },
    ]
  },
  {
    id: 'structure',
    text: "How does time and cause-and-effect flow?",
    options: [
      { label: "Linear: Beginning, Middle, End", value: 'heros-journey' },
      { label: "8-Step Cycle: You, Need, Go, Change...", value: 'story-circle' },
      { label: "Four-Act: Intro, Development, Twist, End", value: 'kishotenketsu' },
      { label: "7-Point: Precision plot points", value: 'seven-point' },
      { label: "15-Beat: Commercial blueprint", value: 'save-the-cat' },
    ]
  },
  {
    id: 'goal',
    text: "What is the ultimate goal?",
    options: [
      { label: "Transformation and Return with a boon", value: 'heros-journey' },
      { label: "Internal change and personal growth", value: 'story-circle' },
      { label: "Immediate engagement and action", value: 'in-media-res' },
      { label: "Maintaining social/cosmic balance", value: 'west-african' },
      { label: "Logical consistency and depth", value: 'snowflake' },
    ]
  }
];

export function NarrativeWizard({ onComplete }: WizardProps) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleOptionSelect = (value: string) => {
    const newScores = { ...scores, [value]: (scores[value] || 0) + 1 };
    setScores(newScores);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Find winner
      const winner = Object.entries(newScores).sort((a: [string, number], b: [string, number]) => b[1] - a[1])[0][0];
      
      // Playful delay before completing
      setTimeout(() => {
        onComplete(winner);
      }, 1500);
      
      setStep(questions.length); // Special "Calculating" state
    }
  };

  if (step === questions.length) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-12 text-center border border-slate-200">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-500 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-indigo-500" />
            </div>
          </div>
          <h2 className="text-2xl font-serif text-slate-800">Consulting the Storyteller's Muse...</h2>
          <p className="text-slate-500 italic font-serif">Weaving your preferences into a narrative form.</p>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[step];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-10 max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
          Step {step + 1} of {questions.length}
        </span>
        <h2 className="text-2xl md:text-3xl font-serif mt-3 text-slate-900">{currentQuestion.text}</h2>
      </div>

      <div className="grid gap-3">
        {currentQuestion.options.map((option, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.01, backgroundColor: '#FFF5F5' }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleOptionSelect(option.value)}
            className="p-4 md:p-5 rounded-lg border border-slate-200 text-left hover:border-indigo-300 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="text-base md:text-lg text-slate-700 font-serif">{option.label}</span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </div>
          </motion.button>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center gap-2">
        {questions.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === step ? "w-8 bg-indigo-500" : i < step ? "w-8 bg-indigo-200" : "w-2 bg-slate-100"
            )}
          />
        ))}
      </div>
    </div>
  );
}
