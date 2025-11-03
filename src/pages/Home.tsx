
import { AnimatePresence, motion } from "framer-motion";



function Home() {
  return (
      <>
        <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
      >
        <section className="h-100">
            <h1>teste da animação</h1>
          </section>   
      </motion.div>
    </AnimatePresence>
           
      </>
  );
}

export default Home;