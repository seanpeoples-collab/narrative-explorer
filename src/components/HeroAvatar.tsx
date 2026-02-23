import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import { cn } from "../lib/utils";

interface HeroAvatarProps {
  type: 'single' | 'group' | 'spark' | 'spirit' | 'walker';
  className?: string;
}

export function HeroAvatar({ type, className }: HeroAvatarProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const eyeX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const eyeY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position relative to center
      const x = (e.clientX / window.innerWidth - 0.5) * 1.5;
      const y = (e.clientY / window.innerHeight - 0.5) * 1.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.g className={cn("origin-center", className)}>
      {type === 'single' && (
        <motion.g
          initial={{ scale: 0.8 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            rotate: [-5, 5, -5]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Simple Cloaked Figure */}
          <path d="M-4 6 L4 6 L2 -2 L0 -4 L-2 -2 Z" fill="currentColor" />
          <circle cx="0" cy="-6" r="2" fill="currentColor" />
          {/* Reactive Eyes */}
          <motion.circle cx={-0.8} cy={-6} r="0.4" fill="white" style={{ x: eyeX, y: eyeY }} />
          <motion.circle cx={0.8} cy={-6} r="0.4" fill="white" style={{ x: eyeX, y: eyeY }} />
        </motion.g>
      )}

      {type === 'walker' && (
        <motion.g
          animate={{ 
            y: [0, -2, 0],
            rotate: [-2, 2, -2]
          }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Walker with stick */}
          <path d="M-3 6 L3 6 L1 -4 L-1 -4 Z" fill="currentColor" />
          <circle cx="0" cy="-7" r="2.5" fill="currentColor" />
          <line x1="2" y1="6" x2="4" y2="-2" stroke="currentColor" strokeWidth="1" />
          {/* Reactive Eyes */}
          <motion.circle cx={-0.8} cy={-7} r="0.5" fill="white" style={{ x: eyeX, y: eyeY }} />
          <motion.circle cx={0.8} cy={-7} r="0.5" fill="white" style={{ x: eyeX, y: eyeY }} />
        </motion.g>
      )}

      {type === 'group' && (
        <motion.g>
          {[...Array(3)].map((_, i) => (
            <motion.g 
              key={i}
              animate={{ 
                x: [0, (i - 1) * 2, 0],
                y: [0, Math.sin(i) * 2, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            >
              <path d="M-2 4 L2 4 L1 -2 L-1 -2 Z" fill="currentColor" opacity={0.7 + i * 0.1} />
              <circle cx="0" cy="-4" r="1.5" fill="currentColor" />
            </motion.g>
          ))}
        </motion.g>
      )}

      {type === 'spark' && (
        <motion.g>
          <motion.circle 
            r="4" fill="currentColor"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {[...Array(4)].map((_, i) => (
            <motion.line
              key={i}
              x1="0" y1="0" x2="6" y2="0"
              stroke="currentColor" strokeWidth="1"
              style={{ rotate: i * 90 }}
              animate={{ x2: [4, 8, 4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </motion.g>
      )}

      {type === 'spirit' && (
        <motion.g
          animate={{ 
            y: [0, -4, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M-5 5 Q 0 -10, 5 5 T 0 10 Z" fill="currentColor" opacity="0.6" />
          <circle cx="-1.5" cy="0" r="0.8" fill="white" />
          <circle cx="1.5" cy="0" r="0.8" fill="white" />
        </motion.g>
      )}
    </motion.g>
  );
}
