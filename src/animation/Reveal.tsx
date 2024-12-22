import { ReactNode, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type RevealProps = {
  children: ReactNode;
};

const Reveal = ({ children }: RevealProps) => {
    const ref = useRef(null);

    const isInView = useInView(ref,{once:true})
    const mainControls = useAnimation();
    useEffect(()=>{
        if(isInView){
            mainControls.start("visible")
        }
    },[isInView, mainControls])
  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
      variants={{
        hidden: {opacity:0, y: 75},
        visible: {opacity: 1, y: 0}
      }}
      initial="hidden"
      animate={mainControls}
      transition={{duration: 0.5, delay:0.25}}
      >
        {children}
    </motion.div>
    </div>
  );
};

export default Reveal;
