import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react"
import {motion, useScroll, useTransform} from 'framer-motion'
import { twMerge } from "tailwind-merge"
import {fullMaskBottom,fullMaskRight} from '../utils/mask'


interface layerProps{
    children: ReactNode,
    className?: string,
    style?:CSSProperties
}
interface scrollShowProps{
    children: ReactNode,
    className?: string,
    style?:CSSProperties
}


 const ScrollShow = ({children}:scrollShowProps) => {
   
    const [viewWidth,setViewWidth]= useState<number>(1000)
    const divRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
      target: divRef,
      offset: ["start end", "end end"],
    });
    console.log("renredering");


    useEffect(()=>{
        if (divRef.current) {
          setViewWidth(divRef.current.getBoundingClientRect().width);
      }
    },[])

    const rotX=useTransform(scrollYProgress,[0,0.3],[95,0])
    const rotY=useTransform(scrollYProgress,[0,0.3],[90,0])
    const sca= useTransform(scrollYProgress,[0,0.3],[0.1,1])
  
    const progress1 = useTransform(scrollYProgress, [0.33, 0.66], [0, 45])
    const scale2 = useTransform(scrollYProgress, [0.33, 0.6], [1.7, 1]);
    scale2.on("change", (lat:any) => {
        if (divRef.current) { divRef.current.style.setProperty("--scale2", lat); }
    });

    
    
    progress1.on("change", (lat) => {
        if (divRef.current) {
            divRef.current.style.setProperty("--mask1", viewWidth > 500 ?fullMaskRight[Math.round(lat)] : fullMaskBottom[Math.round(lat)] )
        }
    });
    
    const progress2 = useTransform(scrollYProgress, [0.69, 1], [0, 45]);
    const scale3 = useTransform(scrollYProgress, [0.69, 0.95], [1.7, 1]);
    scale3.on("change", (lat:any) => {
        if (divRef.current) {
            divRef.current.style.setProperty("--scale3", lat);
        }
    });
    
    progress2.on("change", (lat) => {
        if (divRef.current) { 
            divRef.current.style.setProperty("--mask2", viewWidth > 500 ? fullMaskRight[Math.round(lat)] : fullMaskBottom[Math.round(lat)])
        }
    });

    

  return (
      <div ref={divRef} className='scrollShow relative w-full h-[500vh]'>
          <motion.div className='sticky top-0 left-0 w-full h-[100vh] overflow-hidden' style={{rotateX:rotX,rotateY:rotY,scale:sca}}>
            {children}
        </motion.div>
    </div>
  )
}













 function TopLayer({ children, className, style,...props}:layerProps) {
    return (
        <div className={twMerge(`topLayer top-0 left-0 z-20 w-full h-[100vh] absolute`,className)} {...props} style={{maskImage:'var(--mask1)',scale:'var(--scale1)',...style}} >
            {children}
        </div>
    )
}

 function MiddleLayer({ children, className,style,...props }:layerProps) {
    
    return (
        <div className={twMerge(`middleLayer top-0 z-10 left-0 w-full h-[100vh] absolute `,className)} {...props} style={{maskImage:'var(--mask2)',scale:'var(--scale2)',...style}}>
            {children}
        </div>
    )
}

function BottomLayer({ children, className,style,...props }:layerProps) {
    
    return (
        <div className={twMerge(`top-0 left-0 w-full h-[100vh] absolute`,className)} {...props} style={{scale:'var(--scale3)',...style}} >
            {children}
        </div>
    )
}

export {ScrollShow,TopLayer,MiddleLayer,BottomLayer}