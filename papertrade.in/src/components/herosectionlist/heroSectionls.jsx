import { motion } from "framer-motion";
import bgstar from "../../assets/bg/bgBlackStar.webp";
import card1 from "../../assets/Cards/card1.webp";
import card2 from "../../assets/Cards/card2.webp";
import card3 from "../../assets/Cards/card3.webp";

function HeroSectionLS() {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
    }),
  };

  // Generate 50 random stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1, // 1px - 3px for dot stars
    delay: Math.random() * 2, // random twinkle delay
    char: Math.random() > 0.65 ? "✦" : "", // 15% chance of star symbol
  }));

  return (
    <div
      className="relative w-full h-[36rem] bg-cover bg-center mt-[11rem] rounded-b-4xl flex items-center justify-center mb-10 overflow-hidden"
    >
      {/* Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute text-purple-600 opacity-80 ${star.char ? "text-xl" : "rounded-full bg-white"}`}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.char ? undefined : `${star.size}px`,
            height: star.char ? undefined : `${star.size}px`,
            animation: `twinkle 2s infinite`,
            animationDelay: `${star.delay}s`,
          }}
        >
          {star.char}
        </div>
      ))}

      {/* Background text */}
      <div className="absolute top-[1.5%] w-full flex justify-between px-[10%] text-purple-500/40 text-[4rem] md:text-[6rem] font-extrabold z-20">
        <span>Invest</span>
        <span>Maximize</span>
        <span>Choose</span>
      </div>

      {/* Cards */}
      <div className="relative w-[80%] flex justify-between text-center text-white z-30 top-12">
        {[
          {
            img: card1,
            title: "Extensive Choice of Markets",
            desc: "Trade across 10+ asset classes, including Forex, Stocks, Indices, and more.",
          },
          {
            img: card2,
            title: "Lightning-fast Execution",
            desc: "Never miss an opportunity again with execution speeds of <10ms on all your trades.",
          },
          {
            img: card3,
            title: "Market-leading Pricing",
            desc: "Tight spreads, zero commissions & no hidden fees with customized pricing available upon request.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center max-w-[240px] mx-3"
          >
            <img
              src={card.img}
              alt={card.title}
              className="rounded-lg shadow-lg w-[220px]"
            />
            <h3 className="text-lg font-semibold mt-4">{card.title}</h3>
            <p className="text-xs mt-2 text-gray-300">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Twinkle keyframes in JSX style */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default HeroSectionLS;
