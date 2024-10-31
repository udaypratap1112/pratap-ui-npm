

import { useMotionValue, animate, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import {useBounds} from '../utils/UseBounds'
import { twMerge } from 'tailwind-merge';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 20,
  duration = 25,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [ref, {width=0,height=0}] = useBounds();
  const translation = useMotionValue(0);

useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

 
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    

    return controls?.stop;
  }, [ translation, duration, width, height, gap, direction, reverse ]);

 

  return (
    <div className={twMerge('overflow-hidden', className)}>
      <motion.div
        className='flex min-w-max w-1'
        style={{ ...(direction === 'horizontal' ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
       
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}