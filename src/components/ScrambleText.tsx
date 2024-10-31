import { CSSProperties, useEffect, useState } from "react";
import { twMerge } from 'tailwind-merge'
interface elementProps{
  children: string,
  className?: string
  style?:CSSProperties
  as?: "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"| "span"
  rateOfChange?:number
  encyptType?: "alpabet" | "alphanumeric"
  
  }

const RANDOMLETTERS1 = "ABCDEFGHKLMNOPQRSTWXYZABABCDEFGHKLMNOPQRSTWXYZABABCDEFGHKLMNOPQRSTWXYZABABCDEFGHKLMNOPQRSTWXYZAB";
const RANDOMLETTERS2 = `ABCDEFG!@#$%^&*()_-+=[]{}|<>?/HIJKLMNOPQ!@#$%^&*()_-+=[]{}|<>?/RSTUVWstuvwxyz0123456789!@#$%^&*()_-+=[]{}|<>?/`;

const ScrambleText = ({ children = "example", className, as = 'p',encyptType="alpabet",rateOfChange=50, ...props }: elementProps) => {
    const [text, setText] = useState<string|null>();
    const Tag = as as keyof JSX.IntrinsicElements;
    const encryptText = encyptType=="alpabet" ?RANDOMLETTERS1:RANDOMLETTERS2

    
    useEffect(() => {
        let iterations = 0;
    
        const interval = setInterval(() => {
          const newWord:string = children.split("")
            .map((letter, index) => {
              if (index < iterations) { return children[index]; }
              if (letter == " ") return letter;
              return encryptText[Math.floor(Math.random() * 90)];
            })
            .join("");
          setText(newWord);
    
          if (iterations >= children.length) clearInterval(interval);
          iterations += 1 / 3;
        }, rateOfChange);
          
        return ()=>{clearInterval(interval)}
      }, []);

  return (
    <Tag className={twMerge("relative",className)} {...props}>
    {text}
  </Tag>
  )
}

export {ScrambleText}