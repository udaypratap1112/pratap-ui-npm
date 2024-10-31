import { motion} from 'framer-motion'
import { twMerge,ClassNameValue } from 'tailwind-merge'
import { getViewContext } from '../utils/AnimateOnView'




interface Para{
  variant?: "wave" | "scaleOut" | "fadeIn",
  className?: ClassNameValue
  wordsClass?:ClassNameValue
  wrapperClass?: ClassNameValue
  children:string
}

const AnimatedText = ({variant="scaleOut",className,wrapperClass,wordsClass,children="default text"}:Para) => {

  const newStr = children.split(' ')
  const isInView= getViewContext()??true

    const containerVariants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.02} }
    }
 
    const ChildVarints = {
        wave: {
          hidden: { translateY: "100%" },
          show: {
            translateY: ['100%',"-20%",'0'],
            transition: {duration: 0.8, ease: "easeOut",},
          },
        },
        fadeIn: {
          hidden: { opacity:0},
          show: {
            opacity:1,
            transition: { duration: 0.3, ease: "easeOut" },
          },
        },
        scaleOut: {
          hidden: { scale:1.5,opacity:0},
          show: {
            scale:1,opacity:1,
            transition: { duration: 0.3, ease: "easeOut" },
          },
      },
        
     
        
  };
  

    
  return (
    <motion.div  variants={containerVariants} initial='hidden' animate={isInView ? 'show' : 'hidden'}
    className={twMerge('flex flex-wrap',wrapperClass)} >
          {newStr?.map((block,index) => {
              return (
                  <p key={index} className={twMerge(`overflow-hidden flex h-fit`,wordsClass)} >{block.split('')?.map((char,ind) => {
                    return (<motion.span key={ind+char} variants={ChildVarints[variant]} className={twMerge(`inline-block`,className)}>{char}
                   </motion.span>)
                  }) }&nbsp;</p>
              )
          })}
    </motion.div>
  )
}

export {AnimatedText}