import React, { useEffect} from 'react'
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { twMerge} from 'tailwind-merge';

interface propsInterface{
    className?: string,
    style?: React.CSSProperties
    children: Array<string>,
    duration?: number,
    cursorClass?: string,
    onClick?:React.MouseEventHandler<HTMLSpanElement>
    
}

/**
 * 
 * @param children Required** An Array of string  
 * @example
 * const data=['hi','there']
 * <TypeWriter>{data}</TypeWriter>
 */
const TypeWriter = ({children=['examle text'],className,duration=2,cursorClass, ...props}:propsInterface) => {
    
    const textIndex = useMotionValue(0)
    const baseText = useTransform(textIndex, latest => children[latest])
    
    const count = useMotionValue(0)
    const rounded = useTransform(count, lat => { return Math.round(lat) })
    const diplayText = useTransform(rounded, latest => { return  baseText.get().slice(0, latest) })
    const animationStarted = useMotionValue(false)
    const MaxLength = children.reduce((acc:number, str:string) => { if (str.length > acc) { return str.length } else{ return acc} }, 0)
    


    useEffect(() => {
        const controls = animate(count,MaxLength, {
            type: "tween",
            duration: duration,
            ease: "easeInOut",
            repeatType: 'reverse',
            repeat: Infinity,
            repeatDelay: 2,
            onUpdate(latest) {
                
                if (animationStarted.get() == false && latest > 0) {
                    animationStarted.set(true)
                }
                else if (animationStarted.get() == true && latest == 0) {
                    animationStarted.set(false)
                    if (textIndex.get() == children.length - 1) {
                        textIndex.set(0)
                    } else {
                        textIndex.set(textIndex.get()+1)
                    }

                }
            }
        });
       
        return controls.stop;
      }, []);

    return (
      <div className='h-fit relative inline-block '>
            <motion.span className={twMerge(`text-xl w-full  text-center `, className)} {...props}>{diplayText}</motion.span>
            <motion.div className={twMerge(' w-[2px] mt min-h-[15px] h-[95%] inline-block text-transparent -right-1 bg-black absolute',cursorClass)} animate={{ opacity: [0, 0, 1, 1], transition: { duration: 1, repeat: Infinity, repeatDelay: 0, ease: "linear", times: [0, 0.5, 0.5, 1] } }}></motion.div>
           
    </div>
  )
}

export {TypeWriter}



