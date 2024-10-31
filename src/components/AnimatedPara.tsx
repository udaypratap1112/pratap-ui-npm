import { motion} from "framer-motion";
import { twMerge } from "tailwind-merge";
import { getViewContext } from "../utils/AnimateOnView";


interface paraProps{
  children: string,
  className?: string,
  duration?:number
}



export const AnimatedPara = ({ children='hiiiiii', className,duration=3,...props }:paraProps) => {
  const isInView = getViewContext() ?? true;
  const textAnimation = {
    hiden: { backgroundSize: "0% 100%" },
    show: {
      backgroundSize: "100% 100%",
      transition:{duration: duration, easings: "easeIn" }
    
    },
  };

  return (
    <p>
      <motion.span
      className={twMerge( `text-neutral-500/25 bg-no-repeat bg-[length:0_100%]  bg-clip-text bg-gradient-to-br from-black to-black `, className )}
        variants={textAnimation}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        transition={{ duration: duration, easings: "easeIn" }}
       {...props}
      >
        {children}
      </motion.span>
    </p>
  );
};