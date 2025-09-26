import leftFoot from "../../assets/pngCoins/left_footer_image.webp";
import rightFoot from "../../assets/pngCoins/right_footer_image.webp";
import { useNavigate } from "react-router-dom";
function Subfoot() {
  const navigate=useNavigate();
  return (
    <div className="bg-white w-full h-[25rem] rounded-t-3xl mt-[-2rem] flex justify-between items-end relative ">
      {/* Left Image */}
      <img src={leftFoot} className="w-[27rem]" alt="Left footer" />

      {/* Center Content */}
      <div className="absolute inset-0  flex flex-col items-center justify-center text-center ">
        <h1 className="text-6xl font-extrabold text-purple-700 mb-4">
          Learn the market. 
        </h1>
        <h1 className="text-5xl font-bold text-black mb-4">
          Risk nothing. 
        </h1>
        <h1 className="text-5xl font-bold text-black mb-4">
          Gain everything.
        </h1>
        
        <button className="bg-purple-600 text-white px-6 py-3 mt-4 rounded-t-2xl rounded-b-2xl text-lg font-semibold hover:bg-purple-700 transition" onClick={()=>navigate("/Signup")}>
          Start Now
        </button>
      </div>

      {/* Right Image */}
      <img src={rightFoot} className="w-[27rem] h-[28rem]" alt="Right footer" />
    </div>
  );
}

export default Subfoot;