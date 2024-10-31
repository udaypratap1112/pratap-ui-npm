import { useInView } from 'framer-motion'
import{ createContext, useContext, useRef} from 'react'
import { twMerge } from 'tailwind-merge'
const MyContext = createContext<any | null>(null)

interface contextProps{
    animateOnce?: boolean,
    amount?:number
    className?: string,
    children: React.ReactNode,
    style?: React.CSSProperties,
    
}

const AnimateOnView = ({ children,className,animateOnce=false,amount=0.2,...props }:contextProps) => {
  const viewRef = useRef<HTMLDivElement|null>(null)
  const isInView= useInView(viewRef,{amount:amount,once:animateOnce})
    
  return (
    <MyContext.Provider value={isInView}>
      <div className={twMerge('w-fit',className)}  ref={viewRef} {...props}>
        {children}
      </div>
    </MyContext.Provider>
  )
}

const getViewContext = () => {
    return useContext(MyContext)
}
export { getViewContext,AnimateOnView }