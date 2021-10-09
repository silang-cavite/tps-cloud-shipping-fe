// NPM Packages
import { motion } from "framer-motion";

const Motion = (Component) => {
    // Higher Order Component / Wrapper
    return function HOC() {
        return (
            <motion.div
                initial={{ y: 500 }}
                animate={{
                    y: 0,
                    transition: {
                        duration: 3.5,
                        type: "spring",
                        ease: "easeInOut"
                    },
                }}
                exit={{
                    y: -500,
                    transition: {
                        duration: 1.5,
                        type: "spring",
                        ease: "easeInOut"
                    },
                }}
            >
                <Component />
            </motion.div>
        );
    };
};

export default Motion;
