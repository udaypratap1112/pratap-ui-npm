import { useEffect, useState } from 'react'
import { motion, useMotionValue, animate} from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { getViewContext } from '../utils/AnimateOnView'


interface Prps {
    from?: number
    to:number
    duration?:number
    toFixedDecimal?:number
    prefix?: string
    suffix?: string
    className?: string
    onClick?: React.MouseEventHandler
}


const AnimatedCounter = ({ className, from = 0, to = 100,duration=2, toFixedDecimal = 0, prefix, suffix ,...props}: Prps) => {
    const [counter, setCounter] = useState(from)
    const isInView = getViewContext() ?? true 
    const AnimatedValue = useMotionValue(from)
    


    AnimatedValue.on('change', lat => {
     setCounter(lat)
    })
    useEffect(()=>{
        let control = animate(AnimatedValue, [from, to], {
             ease: 'easeOut',
             duration: duration,
             autoplay:false   
        })
        
        if (isInView) {
            control.play()
       }
        
        
        return control?.stop
    },[AnimatedValue,from,to,isInView])
  
    return (
      <motion.span {...props} className={twMerge(`text-xl`,className  )} {...props}>{prefix}{counter.toFixed(toFixedDecimal)}{ suffix}</motion.span>
  )
}

export  {AnimatedCounter}
