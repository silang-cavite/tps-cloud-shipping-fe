// NPM Packages
import { motion, AnimatePresence  } from "framer-motion";

const Motion = (Component, loaded) => {
    // Higher Order Component / Wrapper
    return function HOC() {
        return (
            // Loaded is a conditional render variable passed by the Parent Component in order for the
            // Animation to load only once after the web applicaiton has been opened.
            <AnimatePresence initial={loaded}>
                <motion.div
                    initial={{ 
                        x: 500
                    }}
                    animate={{
                        x: 0,
                        transition: {
                            duration: 1.5,
                            type: "spring",
                            ease: "easeInOut"
                        }
                    }}
                    exit={{
                        x: -500,
                        transition: {
                            duration: 1.5,
                            type: "spring",
                            ease: "easeInOut"
                        },
                    }}
                >
                    <Component />
                </motion.div>
            </AnimatePresence>
        );
    };
};

export default Motion;
