import "./frontDialgoues.css";
import MoneyIcon from "../../assets/svgIcon/rupee.svg";
import BitcoinIcon from "../../assets/svgIcon/Bitcoin.svg";
import EthereumIcon from "../../assets/svgIcon/ethereum.svg";
import DollarIcon from "../../assets/svgIcon/dollor.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const sentence =
  "Experience real-time trading with virtual money. Practice, learn, and  master the markets — risk-free.";

const subSentence = [
  "Join thousands of learners who practice before going live in the market.",
  "Learn at your own pace with real-time simulations.",
  "Build confidence, master strategies, and trade risk-free.",
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.01 } },
};

const child = {
  hidden: { opacity: 0, x: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { ease: "easeOut", duration: 0.2 },
  },
};

const subContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const subChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: "easeOut" },
  },
};

// Floating coins (position more natural)
const coins = [
  { src: BitcoinIcon, size: 50, top: "20%", left: "15%", delay: 0 },
  { src: EthereumIcon, size: 45, top: "40%", left: "80%", delay: 0.3 },
  { src: DollarIcon, size: 40, top: "70%", left: "25%", delay: 0.6 },
  { src: MoneyIcon, size: 45, top: "60%", left: "65%", delay: 0.9 },
];

// Sparkle stars
const stars = Array.from({ length: 12 }, (_, i) => i);

function F_dialogue() {
 const navigate =useNavigate()
  return (
    <div className="relative w-full flex flex-col items-center mt-30 overflow-hidden">
      {/* Floating Coins */}
      {coins.map((coin, i) => (
        <motion.img
          key={i}
          src={coin.src}
          alt="coin"
          className="absolute"
          style={{
            width: coin.size,
            height: coin.size,
            top: coin.top,
            left: coin.left,
          }}
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -25, 25, 0],
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 5 + i,
            delay: coin.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Sparkle Stars */}
      {stars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-400"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            fontSize: `${Math.random() * 10 + 8}px`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 2 + Math.random() * 2,
            delay: Math.random(),
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* Small pill dialogue */}
      <div className="flex justify-center items-center w-full mt-[5%] z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 bg-purple-100 text-black rounded-full px-4 py-2 shadow-sm"
        >
          <div className="bg-purple-200 rounded-full p-2 flex items-center justify-center">
            <img src={MoneyIcon} alt="Money Icon" className="w-5 h-5" />
          </div>
          <h1 className="text-base md:text-lg font-semibold">
            Learn Trading Without Losing Money
          </h1>
        </motion.div>
      </div>

      {/* Big headline */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex justify-center mt-[3%] px-6 text-center z-10"
      >
        <h1 className="font-['Poppins'] text-[2rem] md:text-[3rem] font-bold leading-tight max-w-5xl flex flex-wrap justify-center">
          {sentence.split("").map((char, i) => (
            <motion.span key={i} variants={child}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* Sub sentences */}
      <motion.div
        variants={subContainer}
        initial="hidden"
        animate="visible"
        className="font-['Poppins'] text-xs md:text-sm font-normal leading-snug max-w-2xl mx-auto flex flex-col items-center space-y-1 text-purple-400 text-center z-10"
      >
        {subSentence.map((line, i) => (
          <motion.h5 key={i} variants={subChild} className="text-center">
            {line}
          </motion.h5>
        ))}
      </motion.div>

      {/* Start Now Button */}
      <div className="flex justify-center mt-6 z-10">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 0.9, 1] }}
          whileHover={{ scale: 1.1, backgroundColor: "#7C3AED" }} // darker purple
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center px-6 py-2 bg-purple-500 text-white rounded-lg shadow-md font-semibold" onClick={()=> navigate("/Signup")}
          >
          Start Now
        </motion.button>
      </div>
    </div>
  );
}

export default F_dialogue;
