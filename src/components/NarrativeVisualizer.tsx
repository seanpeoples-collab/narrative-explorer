import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { NarrativeModel } from "../data/narratives";
import { HeroAvatar } from "./HeroAvatar";
import { cn } from "../lib/utils";

interface NarrativeVisualizerProps {
  model: NarrativeModel;
}

export function NarrativeVisualizer({ model }: NarrativeVisualizerProps) {
  const getAvatarType = (): 'single' | 'group' | 'spark' | 'spirit' | 'walker' => {
    switch (model.id) {
      case 'scandinavian': return 'group';
      case 'indian': return 'spark';
      case 'autochthonous': return 'spirit';
      case 'story-circle': return 'walker';
      default: return 'single';
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white relative overflow-hidden rounded-xl border border-slate-100 shadow-sm p-8">
      {/* Background Texture/Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#6366F1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {model.visualType === 'circle' && <HeroCircle modelId={model.id} avatarType={getAvatarType()} />}
      {model.visualType === 'braid' && <ScandinavianBraid modelId={model.id} avatarType={getAvatarType()} />}
      {model.visualType === 'mandala' && <IndianMandala modelId={model.id} avatarType={getAvatarType()} />}
      {model.visualType === 'network' && <AfricanNetwork modelId={model.id} avatarType={getAvatarType()} />}
      {model.visualType === 'map' && <AutochthonousMap modelId={model.id} avatarType={getAvatarType()} />}

      {/* Hero's Log Overlay */}
      <HeroLog modelId={model.id} />
    </div>
  );
}

function HeroLog({ modelId }: { modelId: string }) {
  const [logIndex, setLogIndex] = useState(0);

  const logs: Record<string, string[]> = {
    'heros-journey': [
      "The hero stands at the threshold of adventure...",
      "Crossing into the unknown world...",
      "Facing trials and finding allies...",
      "Approaching the innermost cave...",
      "Returning with the elixir of change."
    ],
    'story-circle': [
      "You are in a zone of comfort...",
      "But you want something...",
      "You enter an unfamiliar situation...",
      "You adapt to it...",
      "You get what you wanted...",
      "But you pay a heavy price...",
      "Then you return to your familiar situation...",
      "Having changed."
    ],
    'kishotenketsu': [
      "Introduction: Setting the scene...",
      "Development: Expanding the world...",
      "The Twist: An unexpected perspective shift!",
      "Conclusion: The new reality settles in."
    ],
    'scandinavian': [
      "The community gathers for the ritual...",
      "Individual threads begin to intertwine...",
      "Seeking the ritual truth together...",
      "The braid is complete, balance is restored."
    ],
    'indian': [
      "The emotional Rasa begins to swell...",
      "Branching into a fractal of perspectives...",
      "Finding the spiritual essence of the moment...",
      "The flavor of the story lingers."
    ],
    'west-african': [
      "The social context defines the path...",
      "Navigating a web of relationships...",
      "The trickster finds a way through...",
      "Balance is maintained within the community."
    ],
    'autochthonous': [
      "The land remembers every step...",
      "Wandering through ancient echoes...",
      "The place itself tells the story...",
      "Silence is the loudest narrator here."
    ],
    'fichtean-curve': [
      "Immediate crisis! No time to wait...",
      "The tension builds with every step...",
      "Another obstacle appears...",
      "Stakes are rising to a breaking point!",
      "The final climax approaches."
    ],
    'snowflake': [
      "Expanding from a single core idea...",
      "Adding layers of depth and history...",
      "The world grows in complex fractals...",
      "Structural integrity at every scale."
    ],
    'seven-point': [
      "The hook draws the audience in...",
      "Plot points shift the direction...",
      "The midpoint changes everything...",
      "Pinching the tension toward the end.",
      "A precise resolution is reached."
    ],
    'in-media-res': [
      "Starting in the heat of the action!",
      "Backtracking to find the cause...",
      "Fragmented pieces begin to fit...",
      "The full context is finally revealed."
    ],
    'save-the-cat': [
      "The catalyst sets things in motion...",
      "Debating the path forward...",
      "Breaking into the second act...",
      "The B-story adds emotional depth...",
      "All is lost... or is it?",
      "The finale brings transformation."
    ]
  };

  const currentLogs = logs[modelId] || ["The journey continues..."];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % currentLogs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentLogs]);

  return (
    <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${modelId}-${logIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white/90 backdrop-blur-sm border border-indigo-100 px-4 py-2 rounded-full shadow-sm inline-block mx-auto"
        >
          <p className="text-xs font-serif italic text-slate-600 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            {currentLogs[logIndex]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 50,
  damping: 20,
  mass: 1.5
};

// 1. Hero's Journey / Story Circle / Save the Cat
function HeroCircle({ modelId, avatarType }: { modelId: string, avatarType: any }) {
  const isHarmon = modelId === 'story-circle';
  const isSaveTheCat = modelId === 'save-the-cat';
  const points = isSaveTheCat ? 15 : isHarmon ? 8 : 3;
  const degs = Array.from({ length: points }, (_, i) => (i * 360) / points);

  return (
    <div className="relative w-full h-full">
      <motion.svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <motion.circle 
          cx="50" cy="50" r="40" 
          stroke="#1E1B4B" strokeWidth="1" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {degs.map((deg, i) => (
          <motion.g key={i} 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + i * (isSaveTheCat ? 0.1 : isHarmon ? 0.2 : 0.5) }}
          >
            <motion.circle 
              cx={50 + 40 * Math.cos((deg - 90) * Math.PI / 180)} 
              cy={50 + 40 * Math.sin((deg - 90) * Math.PI / 180)} 
              r={isSaveTheCat ? "1.5" : isHarmon ? "2" : "4"} 
              fill={isSaveTheCat ? "#A5B4FC" : isHarmon ? "#818CF8" : "#6366F1"} 
              animate={{ 
                r: isSaveTheCat ? [1.5, 2, 1.5] : isHarmon ? [2, 3, 2] : [4, 5, 4],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          </motion.g>
        ))}

        {/* The Hero Avatar */}
        <motion.g
          animate={{ 
            cx: [50, 90, 50, 10, 50],
            cy: [10, 50, 90, 50, 10]
          }}
          transition={{ 
            duration: isSaveTheCat ? 6 : isHarmon ? 8 : 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <motion.g
            animate={{
              x: [50, 90, 50, 10, 50],
              y: [10, 50, 90, 50, 10]
            }}
            transition={{ 
              duration: isSaveTheCat ? 6 : isHarmon ? 8 : 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <HeroAvatar type={avatarType} className="text-[#1E1B4B]" />
          </motion.g>
        </motion.g>
      </motion.svg>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-xs font-serif italic text-slate-400">
        {isSaveTheCat ? "Opening Image" : isHarmon ? "You" : "Departure"}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-xs font-serif italic text-slate-400">
        {isSaveTheCat ? "Final Image" : isHarmon ? "Change" : "Return"}
      </div>
    </div>
  );
}

// 2. Scandinavian / Kishotenketsu / Seven Point
function ScandinavianBraid({ modelId, avatarType }: { modelId: string, avatarType: any }) {
  const isKishotenketsu = modelId === 'kishotenketsu';
  const isSevenPoint = modelId === 'seven-point';
  const isScandinavian = modelId === 'scandinavian';

  if (isScandinavian) {
    // New Sketch-based Scandinavian Visual: Parallel lines with gathering knots
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
          {/* Three parallel timelines */}
          {[20, 50, 80].map((y, i) => (
            <motion.path
              key={i}
              d={`M 0 ${y} L 200 ${y}`}
              stroke="#CBD5E1" strokeWidth="1"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }}
            />
          ))}

          {/* Gathering Knots */}
          {[50, 100, 150].map((x, i) => (
            <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.5 }}>
               {/* Scribble knot effect */}
               <path 
                 d={`M ${x-5} 20 Q ${x} 50 ${x+5} 80 M ${x+5} 20 Q ${x} 50 ${x-5} 80`} 
                 stroke="#94A3B8" strokeWidth="1" fill="none" opacity="0.6"
               />
               <circle cx={x} cy="50" r="2" fill="#6366F1" />
            </motion.g>
          ))}

          {/* Avatars moving along lines and gathering */}
          {[0, 1, 2].map((i) => (
            <motion.g
              key={i}
              animate={{
                x: [0, 50, 100, 150, 200],
                y: [
                  20 + i * 30, // Start on separate lines
                  50,          // Gather 1
                  50,          // Gather 2
                  50,          // Gather 3
                  20 + i * 30  // Return to separate lines
                ]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <HeroAvatar type="single" className="text-[#1E1B4B] scale-75" />
            </motion.g>
          ))}
          
          <text x="100" y="95" textAnchor="middle" fontSize="6" fontFamily="serif" fill="#64748B">The Gathering</text>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
        {isKishotenketsu || isSevenPoint ? (
          <>
            {Array.from({ length: isSevenPoint ? 7 : 4 }).map((_, i) => (
              <motion.g key={i}>
                <motion.path
                  d={`M ${i * (200 / (isSevenPoint ? 7 : 4))} 50 L ${(i + 1) * (200 / (isSevenPoint ? 7 : 4))} 50`}
                  stroke={isSevenPoint && (i === 3 || i === 6) ? "#6366F1" : "#94A3B8"}
                  strokeWidth="2"
                  strokeDasharray={isSevenPoint ? "0" : (i === 2 ? "0" : "4 2")}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.3 }}
                />
                <motion.circle 
                  cx={i * (200 / (isSevenPoint ? 7 : 4))} cy="50" r="3" fill="#1E1B4B"
                  initial={{ scale: 0 }} 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              </motion.g>
            ))}
            
            <motion.g
              animate={{ x: [0, 200, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <g transform="translate(0, 50)">
                <HeroAvatar type={avatarType} className="text-[#1E1B4B]" />
              </g>
            </motion.g>

            {!isSevenPoint && (
              <>
                <text x="25" y="40" textAnchor="middle" fontSize="6" fontFamily="serif" fill="#94A3B8">Ki</text>
                <text x="75" y="40" textAnchor="middle" fontSize="6" fontFamily="serif" fill="#94A3B8">Shō</text>
                <text x="125" y="40" textAnchor="middle" fontSize="6" fontFamily="serif" fill="#6366F1">Ten (Twist)</text>
                <text x="175" y="40" textAnchor="middle" fontSize="6" fontFamily="serif" fill="#94A3B8">Ketsu</text>
              </>
            )}
            {isSevenPoint && (
              <text x="100" y="40" textAnchor="middle" fontSize="6" fontFamily="serif" fill="#6366F1">Midpoint</text>
            )}
          </>
        ) : (
          <>
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M 0 ${30 + i * 20} C 50 ${30 + i * 20}, 50 ${70 - i * 20}, 100 50 C 150 ${30 + i * 20}, 150 ${70 - i * 20}, 200 ${50}`}
                stroke={i === 0 ? "#6366F1" : i === 1 ? "#94A3B8" : "#CBD5E1"}
                strokeWidth="2" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.3 }}
              />
            ))}
            
            <motion.g
              animate={{ 
                x: [0, 100, 200, 100, 0],
                y: [40, 50, 50, 50, 40]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <HeroAvatar type={avatarType} className="text-[#1E1B4B]" />
            </motion.g>

            <motion.circle cx="100" cy="50" r="4" fill="#1E1B4B" 
               initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 }}
            />
            <text x="100" y="40" textAnchor="middle" fontSize="6" fontFamily="serif" fill="#64748B">Ritual Truth</text>
          </>
        )}
      </svg>
    </div>
  );
}

// 3. Indian / Snowflake
function IndianMandala({ modelId, avatarType }: { modelId: string, avatarType: any }) {
  const isSnowflake = modelId === 'snowflake';
  const isIndian = modelId === 'indian';

  if (isIndian) {
    // New Sketch-based Indian Visual: Dendritic Branching
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
          {/* Main Trunk */}
          <motion.path 
            d="M 20 50 C 60 50, 80 50, 100 50" 
            stroke="#1E1B4B" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
          />
          <circle cx="20" cy="50" r="3" fill="#6366F1" />
          <text x="20" y="65" textAnchor="middle" fontSize="6" fontFamily="serif" fill="#6366F1">Invocation</text>

          {/* Branches */}
          {[
            "M 100 50 C 120 50, 140 30, 180 20",
            "M 100 50 C 120 50, 140 70, 180 80",
            "M 100 50 C 130 50, 150 50, 180 50",
            "M 120 40 C 140 40, 150 20, 170 10",
            "M 120 60 C 140 60, 150 80, 170 90"
          ].map((d, i) => (
            <motion.path 
              key={i} d={d} stroke="#A5B4FC" strokeWidth="1" fill="none"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
            />
          ))}

          {/* Avatar flowing through branches */}
          <motion.g
            animate={{ 
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
             {/* Note: offset-path CSS is tricky in SVG, simulating with keyframes for simplicity */}
             <motion.g
                animate={{
                   x: [20, 100, 180],
                   y: [50, 50, 20]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             >
                <HeroAvatar type="spark" className="text-indigo-500" />
             </motion.g>
          </motion.g>
           <motion.g
                animate={{
                   x: [20, 100, 180],
                   y: [50, 50, 80]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
             >
                <HeroAvatar type="spark" className="text-indigo-500" />
             </motion.g>
        </svg>
      </div>
    );
  }

  // Existing Snowflake Logic
  return (
    <div className="relative w-full h-full">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: isSnowflake ? 0 : 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(isSnowflake ? 6 : 8)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute border rounded-full",
              isSnowflake ? "w-48 h-48 border-slate-200" : "w-32 h-32 border-indigo-200/30"
            )}
            style={{ rotate: `${i * (isSnowflake ? 60 : 45)}deg` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 1 }}
          >
            {isSnowflake && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 border border-indigo-300/40 rounded-full" />
            )}
          </motion.div>
        ))}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`inner-${i}`}
            className={cn(
              "absolute border rounded-full",
              isSnowflake ? "w-12 h-12 border-indigo-400" : "w-16 h-16 border-slate-800/40"
            )}
            style={{ rotate: `${i * 90}deg` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.1, duration: 1 }}
          />
        ))}
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="100" height="100" viewBox="-50 -50 100 100" className="overflow-visible">
          <motion.g
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <HeroAvatar type={avatarType} className="text-indigo-600" />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

// 4. West African / Fichtean / In Media Res
function AfricanNetwork({ modelId, avatarType }: { modelId: string, avatarType: any }) {
  const isFichtean = modelId === 'fichtean-curve';
  const isInMediaRes = modelId === 'in-media-res';
  const isWestAfrican = modelId === 'west-african';

  if (isWestAfrican) {
    // New Sketch-based West African Visual: Context Container + Orbit
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 200 150" className="w-full h-full overflow-visible">
          {/* The Environment (Context) */}
          <motion.rect 
            x="20" y="20" width="160" height="110" rx="4"
            stroke="#94A3B8" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }}
          />
          <text x="30" y="15" fontSize="8" fontFamily="serif" fill="#64748B">Environment (Context)</text>

          {/* Spiritual Centre */}
          <circle cx="100" cy="75" r="4" fill="#6366F1" />
          <text x="110" y="78" fontSize="6" fontFamily="serif" fill="#6366F1">Spiritual Centre</text>

          {/* Orbit Path */}
          <circle cx="100" cy="75" r="30" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 2" fill="none" />

          {/* Social Protagonist Orbiting */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ originX: "100px", originY: "75px" }}
          >
            <g transform="translate(100, 45)">
               <HeroAvatar type="single" className="text-[#1E1B4B]" />
            </g>
          </motion.g>
          
          <text x="135" y="45" fontSize="6" fontFamily="serif" fill="#1E1B4B">Social Protagonist</text>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        {isFichtean || isInMediaRes ? (
          <>
            <motion.path
              d={isInMediaRes ? "M 100 100 L 150 20 L 160 150 M 0 150 L 30 100 L 40 130 L 80 60" : "M 0 150 L 30 100 L 40 130 L 80 60 L 90 110 L 150 20 L 160 150"}
              stroke="#6366F1" strokeWidth="2" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3 }}
            />
            
            <motion.g
              animate={{ 
                x: isInMediaRes ? [100, 150, 160, 0, 30, 80] : [0, 30, 40, 80, 90, 150, 160],
                y: isInMediaRes ? [100, 20, 150, 150, 100, 60] : [150, 100, 130, 60, 110, 20, 150]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            >
              <HeroAvatar type={avatarType} className="text-[#1E1B4B]" />
            </motion.g>

            {(isInMediaRes ? [100, 150, 30, 80] : [30, 80, 150]).map((x, i) => (
              <motion.circle 
                key={i} cx={x} cy={isInMediaRes ? (i === 0 ? 100 : i === 1 ? 20 : i === 2 ? 100 : 60) : (i === 0 ? 100 : i === 1 ? 60 : 20)} r="3" fill="#1E1B4B"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.5 }}
              />
            ))}
            <text x={isInMediaRes ? "100" : "150"} y={isInMediaRes ? "115" : "10"} textAnchor="middle" fontSize="6" fontFamily="serif" fill="#6366F1">
              {isInMediaRes ? "Start Here" : "Climax"}
            </text>
          </>
        ) : (
          <>
            <circle cx="100" cy="100" r="15" fill="#6366F1" opacity="0.2" />
            <circle cx="100" cy="100" r="5" fill="#6366F1" />
            
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const x = 100 + 60 * Math.cos(deg * Math.PI / 180);
              const y = 100 + 60 * Math.sin(deg * Math.PI / 180);
              return (
                <g key={i}>
                  <motion.line 
                    x1="100" y1="100" x2={x} y2={y} 
                    stroke="#94A3B8" strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                  <motion.circle 
                    cx={x} cy={y} r="3" fill="#1E1B4B"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  />
                </g>
              );
            })}
            
            <motion.g
              animate={{ 
                x: [100, 160, 100, 40, 100],
                y: [100, 100, 160, 100, 40]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HeroAvatar type={avatarType} className="text-[#1E1B4B]" />
            </motion.g>

            <text x="100" y="130" textAnchor="middle" fontSize="8" fontFamily="serif" fill="#64748B">Context</text>
          </>
        )}
      </svg>
    </div>
  );
}

// 5. Autochthonous: The Map
function AutochthonousMap({ modelId, avatarType }: { modelId: string, avatarType: any }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <svg viewBox="0 0 200 150" className="w-full h-full">
        {/* Equilibrium States */}
        <text x="30" y="100" fontSize="8" fontFamily="serif" fill="#64748B">Equilibrium</text>
        <circle cx="30" cy="110" r="4" fill="#64748B" />

        <text x="170" y="40" fontSize="8" fontFamily="serif" fill="#64748B">(Re)Equilibrium</text>
        <circle cx="170" cy="50" r="4" fill="#64748B" />

        {/* Wandering Path with Symbols */}
        <motion.path 
          d="M 30 110 C 60 110, 60 80, 100 80 S 140 50, 170 50"
          fill="none" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: "linear" }}
        />
        
        {/* Symbols along the path */}
        <g transform="translate(80, 90)">
           <path d="M0 0 L5 10 L10 0" stroke="#94A3B8" fill="none" />
        </g>
        <g transform="translate(120, 60)">
           <circle r="3" stroke="#94A3B8" fill="none" />
        </g>

        <motion.g
          animate={{ 
            offsetDistance: ["0%", "100%"]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
           {/* Simulating path movement via coordinates since offset-path is complex in React SVG without CSS modules */}
           <motion.g
             animate={{
                x: [30, 80, 100, 140, 170],
                y: [110, 100, 80, 60, 50]
             }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           >
             <HeroAvatar type={avatarType} className="text-indigo-400" />
           </motion.g>
        </motion.g>
        
        <text x="100" y="140" fontSize="6" fontFamily="serif" fill="#94A3B8">Reading the Signs</text>
      </svg>
    </div>
  );
}
