import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import signupIllustration from "../../assets/video/signup.webm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [userName, setUserName] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const [loading, setLoading] = useState(false);
  const [otpStage, setOtpStage] = useState(false);
  const [otp, setOtp] = useState("");

  const avatars = [
    "https://i.ibb.co/fz0CTWQr/man.png",
    "https://i.ibb.co/d48WXPQC/woman.png",
    "https://i.ibb.co/zhNgnDKR/man-1.png",
    "https://i.ibb.co/j9mWCkKK/office-man.png",
    "https://i.ibb.co/9xSBG3F/woman-1.png",
  ];

  const defaultAvatar = avatars[0];

  // Send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email || !passwordSignup || !phone) {
      alert("Please fill all required fields!");
      return;
    }

    if (!acceptedTerms) {
      alert("You must accept the Terms & Conditions before signing up.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8001/user_service/signup/otp/send-otp?mail=${encodeURIComponent(
          email
        )}`,
        { method: "POST" }
      );

      const result = await res.json().catch(() => null);
      if (res.ok && result?.status === "success") {
        setOtpStage(true);
        alert(result.message || "OTP sent successfully!");
      } else {
        alert(result?.message || "❌ Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and create account
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // OTP verification
      const res = await fetch(
        `http://127.0.0.1:8001/user_service/signup/otp/?email=${encodeURIComponent(
          email
        )}&otp=${encodeURIComponent(otp)}`,
        { method: "POST", headers: { accept: "application/json" } }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        alert(
          errData?.detail?.message || errData?.detail || errData?.message || "❌ Invalid OTP"
        );
        return;
      }

      const result = await res.json().catch(() => null);
      if (result?.result !== true) {
        alert(result?.message || "❌ Invalid OTP");
        return;
      }

      // Signup
      const signupRes = await fetch("http://127.0.0.1:8001/user_service/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          email: email,
          pass_hash: passwordSignup,
          phone: phone,
          avatar_url: selectedAvatar || defaultAvatar,
        }),
      });

      if (!signupRes.ok) {
        const errData = await signupRes.json().catch(() => null);
        alert(
          errData?.detail?.message || errData?.detail || errData?.message || "⚠️ Signup failed"
        );
        return;
      }

      alert("🎉 Account created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error while verifying OTP / signing up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-purple-600 px-4"
    >
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden h-[45rem] mt-20">
        <div className="w-full md:w-[400px] p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#1F1F1F] mb-2">
            Ready to start your success story?
          </h2>
          <p className="text-[#6B7280] mb-6">
            Signup to PaperTrade and start your journey today!
          </p>

          {!otpStage ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[#1F1F1F]">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full border-b border-gray-300 focus:border-[#4F7FFF] focus:outline-none py-2 placeholder-[#6B7280] text-[#1F1F1F] caret-[#4F7FFF]"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[#1F1F1F]">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="janedoe@mail.com"
                  className="w-full border-b border-gray-300 focus:border-[#4F7FFF] focus:outline-none py-2 placeholder-[#6B7280] text-[#1F1F1F] caret-[#4F7FFF]"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[#1F1F1F]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordSignup}
                    onChange={(e) => setPasswordSignup(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full border-b border-gray-300 focus:border-[#4F7FFF] focus:outline-none py-2 pr-10 placeholder-[#6B7280] text-[#1F1F1F] caret-[#4F7FFF]"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1 text-[#1F1F1F]">
                  Phone Number
                </label>
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  placeholder="Enter your phone number"
                  inputClass="w-full border-b border-gray-300 focus:border-[#4F7FFF] focus:outline-none py-2 placeholder-[#6B7280] text-[#1F1F1F] caret-[#4F7FFF]"
                  containerClass="w-full"
                  required
                />
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#1F1F1F]">
                  Select Avatar
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {avatars.map((avatar, index) => (
                    <label key={index} className="cursor-pointer">
                      <input
                        type="radio"
                        name="avatar"
                        value={avatar}
                        checked={selectedAvatar === avatar}
                        onChange={(e) => setSelectedAvatar(e.target.value)}
                        className="hidden"
                      />
                      <img
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className={`w-12 h-12 rounded-full border-4 transition-transform duration-200 hover:scale-105 ${
                          selectedAvatar === avatar
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-[#6B7280]">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-[#A084FF] underline"
                    onClick={() => setShowTerms(true)}
                  >
                    Terms & Conditions
                  </button>
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!acceptedTerms || loading}
                className={`w-full py-3 rounded-lg font-medium transition ${
                  acceptedTerms
                    ? "bg-[#4F7FFF] text-white hover:bg-[#A084FF]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? "Sending OTP..." : "Sign Up"}
              </button>
            </form>
          ) : (
            // OTP Form
            <form
              onSubmit={handleOtpVerify}
              className="bg-white p-6 rounded-xl shadow-lg w-80"
            >
              <h2 className="text-lg font-bold mb-4 text-black">Enter OTP</h2>
              <input
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 w-full mb-2 rounded placeholder-gray-800 border-black caret-black text-black"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}
        </div>

        {/* Right Side - Video */}
        <div className="flex-1 hidden md:flex items-center justify-center bg-[#F7F8FC]">
          <video
            src={signupIllustration}
            autoPlay
            loop
            muted
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full relative">
            <h3 className="text-xl font-semibold mb-4 text-black">
              Terms & Conditions – PaperTrade
            </h3>
            <div className="max-h-80 overflow-y-auto text-sm text-gray-700 space-y-3">
              <p>1. PaperTrade is a simulated trading platform and does not involve real money.</p>
              <p>2. Users are responsible for maintaining the confidentiality of their account credentials.</p>
              <p>3. Any misuse, fraud, or violation of rules may result in account suspension.</p>
              <p>4. The app is provided "as is" without any guarantees of profit or accuracy.</p>
              <p>5. Data may be collected for analytics and service improvement purposes.</p>
              <p>6. By signing up, you consent to receiving occasional updates and notifications.</p>
            </div>
            <button
              onClick={() => setShowTerms(false)}
              className="mt-4 px-4 py-2 bg-[#4F7FFF] text-white rounded-lg hover:bg-[#A084FF] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
