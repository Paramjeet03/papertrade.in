import "./navbar.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";   // ✅ Import Link
import whitelogo from "../../assets/logo/logo_white.png";
import blacklogo from "../../assets/logo/logo_black.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const menuItems = [
    { name: "Market", path: "/Market" },
    { name: "Blogs", path: "/" },
    { name: "Courses", path: "/" },
    { name: "About Us", path: "/about" },  // ✅ About Us route
  ];
  const navigate=useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 flex justify-between items-center px-6 py-4 shadow-md">
      {/* Left Logo */}
      <Link to={"/"}>
      <div>
        <img
          src={whitelogo}
          alt="White Logo"
          className="logo-light w-42 block dark:hidden"
        />
        <img
          src={blacklogo}
          alt="Black Logo"
          className="logo-dark w-42 hidden dark:block"
        />
      </div>
      </Link>
      

      {/* Center Menu - Pill Shape */}
      <div className="w-[45%] mx-auto bg-white/80 dark:bg-gray-800/80 shadow-md rounded-full px-2 py-2.5 flex justify-evenly backdrop-blur-sm">
        {menuItems.map((item) => {
          const underlineVariants = {
            initial: { width: 0 },
            hover: { width: "100%" },
          };

          return (
            <motion.div
              key={item.name}
              whileHover="hover"
              initial="initial"
              className="relative font-medium text-gray-800 dark:text-gray-200"
            >
              <Link to={item.path}>
                {item.name}
                <motion.div
                  className="absolute left-0 -bottom-1 h-[2px] bg-[#7c56dc]"
                  variants={underlineVariants}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Right Buttons */}
      <div className="flex space-x-4">
        <button className="px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={()=>navigate("/Login")}>
          Log in
        </button>
        <button className="px-4 py-2 bg-[#9e78ff] text-white rounded-lg hover:bg-[#7c56dc] " onClick={()=> navigate("/Signup")}>
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
