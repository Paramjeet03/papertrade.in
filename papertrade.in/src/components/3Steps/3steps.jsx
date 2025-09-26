import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Registration from "../../assets/video/Create account_1.mp4";
import Verification from "../../assets/video/Verification_1.mp4";
import Start from "../../assets/video/Choose market_1.mp4";

function ThreeSteps() {
  const videos = [Registration, Verification, Start];
  const labels = ["Registration", "Verification", "Start Trading"];

  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [currentVideo]);

  const handleEnded = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
    setProgress(0);
  };

  const listVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, type: "spring", stiffness: 100 }
    }),
  };

  // Generate random stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1, // 1px - 3px
    delay: Math.random() * 2, // twinkle delay
  }));

  return (
    <div className="relative bg-purple-800 w-full h-[43rem] mt-[-2rem] flex justify-between items-center px-10 rounded-t-4xl overflow-hidden">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full opacity-80 animate-pulse"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Left Text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-7xl font-extrabold z-10"
      >
        <h1 className="text-black">Three steps</h1>
        <h1 className="text-white">to start</h1>
        <h1 className="text-white">Trading</h1>
      </motion.div>

      {/* Mid Video inside white card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
        className="bg-white rounded-2xl shadow-xl p-4 flex items-center justify-center mr-[7rem] mt-[4rem] z-10"
      >
        <video
          ref={videoRef}
          className="w-[550px] h-[450px] object-cover rounded-xl"
          key={currentVideo}
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
        >
          <source src={videos[currentVideo]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Right Buttons */}
      <div className="flex flex-col space-y-6 z-10">
        {labels.map((label, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <button
              onMouseEnter={() => {
                setCurrentVideo(index);
                setProgress(0);
              }}
              className={`text-[2rem] font-extrabold px-4 py-2 transition-colors duration-300 mr-[1rem] ${
                currentVideo === index
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {label}
            </button>

            {/* Underline animation */}
            {currentVideo === index && (
              <motion.div
                className="absolute left-0 bottom-0 h-[3px] bg-white rounded"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ThreeSteps;
