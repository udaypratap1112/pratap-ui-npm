

import { motion, Variants} from 'framer-motion'
import { twMerge, ClassNameValue } from 'tailwind-merge'
import {getViewContext} from '../utils/AnimateOnView'

interface ComponentProps {
        lines: string[],
        className?:string
        wrapperClassName?:ClassNameValue
    }

/**
 * A Function which accepts several props in order to animate below example given:
 * 
 * @param className Optional!! to give style to the text
 * @param lines Required** It is the array if lines You want to animate
 * @param container_class Optional!! To give style to the outer container of the text defaults-(flex,justify-center)
 * 
 * @example
 
 *<TextReveal className='text-green-500' container_class='bg-green-100 py-10' lines={["Nature is an inherent character or constitution, particularly of" , "the ecosphere or the universe as a whole.", "In this general sense nature refers to the laws, elements and", "phenomena of the physical world, including life. Although", "humans are part of nature, human activity or humans", "as a whole are often described as at times at odds, or","outright separate and even superior to nature."]} />
 

 */
const TextReveal = ({ lines, className, wrapperClassName, ...props }: ComponentProps) => {

    const isInView = getViewContext() ?? true
    const containerVariants:Variants = {
        hidden: {opacity: 0 },
        show: {opacity: 1, transition: { staggerChildren: 0.09 } }
    }
    const childVariants:Variants = {
        hidden: { translateY: '100%' },
        show: { translateY: '0', transition: { duration:1,ease:[0,0.55,0.45,1] } }
    }

return (
      <motion.div className={twMerge(' flex items-center justify-around ',wrapperClassName)} >
         <motion.div  variants={containerVariants} initial='hidden' animate={isInView?'show':'hidden'}>
          {lines?.map((line) => {
              return (
                  <div className='w-fit overflow-hidden h-fit '>
                      <motion.p variants={childVariants} className={twMerge('text-xl leading-[1.3] pb-[2px] ', className)} {...props}>{line}</motion.p>
                  </div>
              )
          })}
          </motion.div>
          
    </motion.div>
  )
}

export default TextReveal









