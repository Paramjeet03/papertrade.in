// At the top of Dashboard.js
import{ useState, useEffect } from "react";
import logo from "../../assets/logo/logo_black.png";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CandleChart from "../chart/chart"; 
import noimage from "../../assets/Cards/noimage.png" 


// Section component for headings
const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-3 text-white">{title}</h2>
    {children}
  </div>
);

function Dashboard() {

  
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); 

  // User profile & avatar
  const [userData, setUserData] = useState({ username: "John Doe", balance: 2500 });
  const [avatar_url, setAvatarUrl] = useState(
    "http://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg"
  );

  // Sidebar current section
  const [currentSection, setCurrentSection] = useState("Guide");

  // Stock selection
  const [stockSelect, setStockSelect] = useState(null);
  const [loading, setLoading] = useState(false);

  // Stock data
  const [apiRespDescription, setApiRespDescription] = useState(null);
  const [apiRespPriceChange, setApiRespPriceChange] = useState(null);
  const [apiRespOneWeek, setApiRespOneWeek] = useState(null);
  const [apiRespOneMonth, setApiRespOneMonth] = useState(null);
  const [apiRespOneYear, setApiRespOneYear] = useState(null);
  const [apiRespStockNews, setApiRespStockNews] = useState(null);

  // Chart timeframe
  const [chartTimeframe, setChartTimeframe] = useState("1Week");

  const stockOptions = [
  { value: "AAPL", label: "Apple (AAPL)" },
  { value: "ABBV", label: "AbbVie (ABBV)" },
  { value: "ABT", label: "Abbott Laboratories (ABT)" },
  { value: "ACN", label: "Accenture (ACN)" },
  { value: "ADBE", label: "Adobe (ADBE)" },
  { value: "AMD", label: "AMD (AMD)" },
  { value: "AMGN", label: "Amgen (AMGN)" },
  { value: "AMZN", label: "Amazon (AMZN)" },
  { value: "APA", label: "APA Corporation (APA)" },
  { value: "AVGO", label: "Broadcom (AVGO)" },
  { value: "AXP", label: "American Express (AXP)" },
  { value: "BA", label: "Boeing (BA)" },
  { value: "BAC", label: "Bank of America (BAC)" },
  { value: "BABA", label: "Alibaba (BABA)" },
  { value: "BHP", label: "BHP Group (BHP)" },
  { value: "BK", label: "Bank of New York Mellon (BK)" },
  { value: "BMY", label: "Bristol-Myers Squibb (BMY)" },
  { value: "BRK.B", label: "Berkshire Hathaway (BRK.B)" },
  { value: "C", label: "Citigroup (C)" },
  { value: "CAT", label: "Caterpillar (CAT)" },
  { value: "CL", label: "Colgate-Palmolive (CL)" },
  { value: "CMCSA", label: "Comcast (CMCSA)" },
  { value: "COP", label: "ConocoPhillips (COP)" },
  { value: "COST", label: "Costco (COST)" },
  { value: "CRM", label: "Salesforce (CRM)" },
  { value: "CSCO", label: "Cisco (CSCO)" },
  { value: 'HPQ', label: 'HP Inc.' },
  { value: 'HPE', label: 'Hewlett Packard Enterprise Co.' },
  { value: "CVX", label: "Chevron (CVX)" },
  { value: "D", label: "Dominion Energy (D)" },
  { value: "DE", label: "Deere & Company (DE)" },
  { value: "DELL", label: "Dell Technologies (DELL)" },
  { value: "DIS", label: "Walt Disney Company (DIS)" },
  { value: "DOW", label: "Dow Inc. (DOW)" },
  { value: "EOG", label: "EOG Resources (EOG)" },
  { value: "F", label: "Ford Motor Company (F)" },
  { value: "FDX", label: "FedEx (FDX)" },
  { value: "GE", label: "General Electric (GE)" },
  { value: "GM", label: "General Motors (GM)" },
  { value: "GOOG", label: "Alphabet Class C (GOOG)" },
  { value: "GOOGL", label: "Alphabet Class A (GOOGL)" },
  { value: "GS", label: "Goldman Sachs (GS)" },
  { value: "HD", label: "Home Depot (HD)" },
  { value: "HES", label: "Hess Corporation (HES)" },
  { value: "HON", label: "Honeywell (HON)" },
  { value: "IBM", label: "IBM (IBM)" },
  { value: "INTC", label: "Intel (INTC)" },
  { value: "JNJ", label: "Johnson & Johnson (JNJ)" },
  { value: "JPM", label: "JPMorgan Chase (JPM)" },
  { value: "K", label: "Kellogg (K)" },
  { value: "KO", label: "Coca-Cola (KO)" },
  { value: "KMI", label: "Kinder Morgan (KMI)" },
  { value: "LMT", label: "Lockheed Martin (LMT)" },
  { value: "LLY", label: "Eli Lilly (LLY)" },
  { value: "MCD", label: "McDonald's (MCD)" },
  { value: "MA", label: "Mastercard (MA)" },
  { value: "META", label: "Meta Platforms (META)" },
  { value: "MGM", label: "MGM Resorts (MGM)" },
  { value: "MMM", label: "3M (MMM)" },
  { value: "MRK", label: "Merck (MRK)" },
  { value: "MSFT", label: "Microsoft (MSFT)" },
  { value: "MSI", label: "Motorola Solutions (MSI)" },
  { value: "MU", label: "Micron Technology (MU)" },
  { value: "NKE", label: "Nike (NKE)" },
  { value: "NFLX", label: "Netflix (NFLX)" },
  { value: "NVDA", label: "NVIDIA (NVDA)" },
  { value: "ORCL", label: "Oracle (ORCL)" },
  { value: "OXY", label: "Occidental Petroleum (OXY)" },
  { value: "PEP", label: "PepsiCo (PEP)" },
  { value: "PFE", label: "Pfizer (PFE)" },
  { value: "PG", label: "Procter & Gamble (PG)" },
  { value: "PM", label: "Philip Morris International (PM)" },
  { value: "PNC", label: "PNC Financial Services (PNC)" },
  { value: "PSX", label: "Phillips 66 (PSX)" },
  { value: "PYPL", label: "PayPal (PYPL)" },
  { value: "QCOM", label: "Qualcomm (QCOM)" },
  { value: "RTX", label: "RTX Corporation (RTX)" },
  { value: "SBUX", label: "Starbucks (SBUX)" },
  { value: "SCHW", label: "Charles Schwab (SCHW)" },
  { value: "SIRI", label: "Sirius XM Holdings (SIRI)" },
  { value: "SNAP", label: "Snap Inc. (SNAP)" },
  { value: "SOFI", label: "SoFi Technologies (SOFI)" },
  { value: "STZ", label: "Constellation Brands (STZ)" },
  { value: "T", label: "AT&T (T)" },
  { value: "TGT", label: "Target (TGT)" },
  { value: "TMUS", label: "T-Mobile US (TMUS)" },
  { value: "TSLA", label: "Tesla (TSLA)" },
  { value: "UAL", label: "United Airlines (UAL)" },
  { value: "UBER", label: "Uber Technologies (UBER)" },
  { value: "UNH", label: "UnitedHealth Group (UNH)" },
  { value: "UNP", label: "Union Pacific (UNP)" },
  { value: "V", label: "Visa (V)" },
  { value: "VFC", label: "VF Corporation (VFC)" },
  { value: "VLO", label: "Valero Energy (VLO)" },
  { value: "VZ", label: "Verizon (VZ)" },
  { value: "WBA", label: "Walgreens Boots Alliance (WBA)" },
  { value: "WFC", label: "Wells Fargo (WFC)" },
  { value: "WMT", label: "Walmart (WMT)" },
  { value: "XOM", label: "Exxon Mobil (XOM)" },
  { value: "YUM", label: "Yum! Brands (YUM)" },
  { value: "ZIM", label: "ZIM Integrated Shipping (ZIM)" },
];

const handleQuantityChange = (e) => {
  const val = parseInt(e.target.value);
  if (!isNaN(val) && val > 0) setQuantity(val);
};


const onBuy = (qty) => {
  if (!stockSelect) {
    alert("Please select a stock first!");
    return;
  }
  console.log(`Buying ${qty} shares of ${stockSelect.value}`);
  // TODO: Call your backend API to perform buy operation
};

const onSell = (qty) => {
  if (!stockSelect) {
    alert("Please select a stock first!");
    return;
  }
  console.log(`Selling ${qty} shares of ${stockSelect.value}`);
  // TODO: Call your backend API to perform sell operation
};

  const menuItems = [
    { name: "Guide", path: "/" },
    { name: "Market", path: "/tradeMarket" },
    { name: "Add Course", path: "/addCourse" },
    { name: "Add Blog", path: "/addBlog" },
    { name: "ML Modal", path: "/mlModal" },
    { name: "Logout", path: "/Logout" },
  ];
  useEffect(() => {
      if (currentSection === "Logout") {
        localStorage.removeItem("access_token");
        navigate("/Login", { replace: true });
      }
    }, [currentSection]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/Login");
        return;
      }
      try {
        const resp = await fetch("http://127.0.0.1:8001/user_profile/", {
          method: "GET",
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
        if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
        const data = await resp.json();
        setUserData({
          username: data.username || "John Doe",
          balance: data.portfolio?.reduce((acc, p) => acc + (p.balance || 0), 0) || 0,
        });
        setAvatarUrl(data.avatar_url || avatar_url);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  },[]);

  const handleChange = async (option) => {
    try {
      setStockSelect(option);
      setLoading(true);

      const body = JSON.stringify({ sym: option.value });
      const endpoints = ["stockInfo", "oneWeek", "oneMonth", "oneYear", "stockNews", "get_priceChange"];

      const responses = await Promise.all(
        endpoints.map((ep) =>
          fetch(`http://127.0.0.1:8001/stockService/${ep}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json", accept: "application/json" },
            body,
          })
        )
      );

      responses.forEach((resp, i) => {
        if (!resp.ok) throw new Error(`API request ${endpoints[i]} failed: ${resp.status}`);
      });

      const [stockInfo, oneWeek, oneMonth, oneYear, stockNews, priceChange] = await Promise.all(
        responses.map((r) => r.json())
      );

      setApiRespDescription(stockInfo);
      setApiRespOneWeek(oneWeek);
      setApiRespOneMonth(oneMonth);
      setApiRespOneYear(oneYear);
      setApiRespStockNews(stockNews);
      setApiRespPriceChange(priceChange);
      setChartTimeframe("1Week");
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderChartData = () => {
    if (chartTimeframe === "1Week") return apiRespOneWeek;
    if (chartTimeframe === "1Month") return apiRespOneMonth;
    if (chartTimeframe === "1Year") return apiRespOneYear;
    return [];
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#161e2e] text-white flex flex-col p-6">
        <div className="mb-8 flex items-center justify-center">
          
            <img src={logo} alt="logo" className="h-12 w-auto object-contain" />
          </div>
        <nav className="flex flex-col space-y-4 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentSection(item.name)}
              className="px-4 py-2 rounded hover:bg-gray-700 transition text-left"
            >
              {item.name}
            </button>
          ))}
        </nav>
        <div className="mt-auto text-center text-sm text-gray-400 pt-4">
          © {new Date().getFullYear()} PaperTrade. All rights reserved.
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="w-full bg-[#161e2e] shadow-md px-6 h-20 flex justify-end items-center">
          <div className="flex items-center space-x-6">
            <div className="text-white font-semibold">
              Balance: <span className="text-yellow-400">${userData.balance}</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                src={avatar_url}
                alt="profile"
                className="w-9 h-9 rounded-full border-2 border-white"
              />
              <span className="text-white font-medium">{userData.username}</span>
            </div>
          </div>
        </nav>

        {currentSection==="Guide" && <div className="flex-1 p-8 bg-[#1f2937] text-white overflow-y-auto">
           <h1 className="text-4xl font-extrabold mb-6 drop-shadow-lg"> Welcome, {userData.username}! </h1> 
           <p className="mb-6 text-gray-300 leading-relaxed"> Welcome to <span className="text-white font-semibold">PaperTrade</span>
            – your all-in-one virtual trading and learning platform. Here, you can explore markets, simulate trades, practice ML models, and learn through courses without risking real money. </p>
             {/* User Guide */} 
             <Section title="User Guide"> <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
               <li> Each new user receives <span className="text-yellow-400 font-semibold">$1,000</span> virtual credit to begin trading. </li>
                <li>If your virtual balance runs out, you can purchase more credits to continue trading.</li>
                 <li> Use the sidebar to navigate between <span className="text-yellow-400"> Market</span>,
                  <span className="text-yellow-400"> Buy/Sell</span>, <span className="text-yellow-400"> Courses</span>, and 
                  <span className="text-yellow-400"> ML Models</span>. </li> <li>
                     <span className="font-semibold text-yellow-400">ML Models:</span>
                      Access only purchased versions. Future versions require purchase. </li> 
                      <li> <span className="font-semibold text-yellow-400">Courses:</span>
                       Free courses may contain ads; paid courses are ad-free. PaperTrade receives a <span className="font-semibold">10% commission</span>.
                        </li> </ul> </Section> {/* Terms & Conditions */} <Section title="Terms & Conditions">
                           <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed"> 
                            <li>This is a virtual trading platform; no real money is involved.</li> 
                            <li>Initial credits are for simulation only and hold no real-world value.</li> 
                            <li>Trading strategies are educational; PaperTrade is not responsible for real-life outcomes.</li>
                             <li>ML models and courses are digital products; access rules and commissions apply.</li> 
                             <li>Revenue from ads and paid courses belongs fully or partially to PaperTrade.</li>
                              </ul> </Section> {/* Update Policy */} <Section title="Update Policy"> 
                                <p className="text-gray-300 leading-relaxed mb-2"> PaperTrade is continuously improving with new features, ML model versions, and updated course materials. </p> 
                                <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed"> <li>Users notified about major updates via in-app alerts or email.
                                  </li> <li>New ML model versions require separate purchase.</li> <li>Purchased ML model versions remain valid for <span className="text-yellow-400 font-semibold">5 years</span>.</li> <li>Policy changes, commission rates, or ad rules announced in advance for transparency.</li> </ul> </Section> {/* Project Scope */} <Section title="Project Scope"> <p className="text-gray-300 leading-relaxed"> PaperTrade allows users to practice stock trading with virtual money, simulate market strategies, explore ML models, and access educational courses in a safe, risk-free environment. The platform empowers learners, traders, and developers with hands-on experience in trading and AI tools while ensuring fair access through clear version control, commissions, and update policies. Future goals include real-world market insights, community learning events, and advanced analytics. </p> </Section> {/* Developer Info */} <div className="mt-10 border-t border-gray-600 pt-6 text-center"> <p className="text-gray-400"> Developed with ❤️ by <span className="text-yellow-400 font-semibold">Paramjeet Singh</span> – aspiring AI/ML Engineer & Full-Stack Developer. </p> <p className="text-gray-500 text-sm mt-1"> © {new Date().getFullYear()} PaperTrade. All rights reserved. </p> </div> </div>}

        {currentSection === "Market" && (
          <div className="flex-1 p-8 bg-[#1f2937] text-white overflow-y-auto">
            <h1 className="text-5xl font-extrabold">Welcome back, Trader!</h1>
            <p className="mt-5 font-semibold text-3xl">Every trade is a new opportunity. Review market trends.</p>
            <p className="mt-5 text-3xl flex items-center justify-center">Enter a stock symbol:</p>

            <Select
              options={stockOptions}
              isSearchable
              isDisabled={loading}
              placeholder={ "Search or select a stock..."}
              className="text-black mt-4 hover:bg-blue-300 focus:bg-blue-400"
              onChange={handleChange}
            />

            {(loading || apiRespDescription) && (
              <div className="text-center mt-6 bg-gray-800 rounded-2xl w-[90%] mx-auto p-6 shadow-lg">
                {loading ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-purple-600 text-3xl mt-4 font-semibold">Loading...</p>
                  </div>
                ) : (
                  apiRespDescription && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col md:flex-row items-start gap-6">
                        {/* Logo */}
                        {apiRespDescription.logo_url && (
                          <div className="flex-shrink-0">
                            <img
                              src={apiRespDescription.logo_url || "/fallback-logo.png"}
                              alt="Stock logo"
                              className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-3xl shadow-xl border-2 border-purple-600"
                            />
                          </div>
                        )}

                        {/* Stock details */}
                        <div className="text-left text-white flex-1 space-y-2">
                          <h2 className="text-2xl md:text-3xl font-bold">
                            {apiRespDescription.company_name || "Unknown Company"}
                          </h2>
                          <p className="text-purple-400 font-medium">
                            {apiRespDescription.industry || "N/A"}
                          </p>
                          <p className="text-gray-300 text-sm md:text-base max-h-40 overflow-y-auto pr-2">
                            {apiRespDescription.description || "No description available."}
                          </p>
                          {apiRespPriceChange && (
                            <p
                              className={`text-lg font-bold ${
                                apiRespPriceChange.perc > 0
                                  ? "text-green-500"
                                  : apiRespPriceChange.perc < 0
                                  ? "text-red-500"
                                  : "text-yellow-400"
                              }`}
                            >
                              {apiRespPriceChange.perc > 0
                                ? "▲"
                                : apiRespPriceChange.perc < 0
                                ? "▼"
                                : "■"}{" "}
                              {apiRespPriceChange.perc.toFixed(2)}% (Price Change)
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Chart Section */}
                      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg mt-6">
                        <div className="flex justify-between mb-4">
                          <div className="flex space-x-2">
                            <button
                              className={`px-4 py-2 rounded ${
                                chartTimeframe === "1Week" ? "bg-purple-600" : "bg-gray-700"
                              }`}
                              onClick={() => setChartTimeframe("1Week")}
                            >
                              1 Week
                            </button>
                            <button
                              className={`px-4 py-2 rounded ${
                                chartTimeframe === "1Month" ? "bg-purple-600" : "bg-gray-700"
                              }`}
                              onClick={() => setChartTimeframe("1Month")}
                            >
                              1 Month
                            </button>
                            <button
                              className={`px-4 py-2 rounded ${
                                chartTimeframe === "1Year" ? "bg-purple-600" : "bg-gray-700"
                              }`}
                              onClick={() => setChartTimeframe("1Year")}
                            >
                              1 Year
                            </button>
                          </div>

                          <div className="flex space-x-2">
                           <input
                              type="number"
                              min="1"
                              value={quantity}
                              onChange={handleQuantityChange}
                              className="w-20 px-3 py-2 rounded border border-gray-400 text-white"
                              placeholder="Qty"
                            />

                            {/* Buy Button */}
                            <button
                              className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
                              onClick={() => onBuy(quantity)}
                            >
                              Buy {quantity}
                            </button>

                            {/* Sell Button */}
                            <button
                              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                              onClick={() => onSell(quantity)}
                            >
                              Sell {quantity}
                            </button>
                          </div>
                        </div>

                        {/* Use your CandleChart component */}
                        <CandleChart apiResp={renderChartData()} />
                      </div>

                      {/* News Section */}
                      <div className="mt-6">
                        <h1 className="text-4xl font-bold text-purple-700 underline mb-4">NEWS</h1>
                        {apiRespStockNews && apiRespStockNews.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                            {apiRespStockNews.slice(0, 9).map((news, index) => (
                              <a
                                key={index}
                                href={news.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col bg-gray-900 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
                              >
                                <div className="relative w-full h-48 overflow-hidden rounded-t-2xl bg-black flex items-center justify-center">
                                  <img
                                    src={news.image || noimage}
                                    alt={news.headline || "News"}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="p-4 flex-1 text-white flex flex-col justify-between">
                                  <h2 className="font-bold text-lg text-purple-500 mb-2">
                                    {news.headline || "No title"}
                                  </h2>
                                  <p className="text-gray-300 text-sm line-clamp-3">
                                    {news.summary || "No summary"}
                                  </p>
                                  <p className="text-gray-400 text-xs mt-2">
                                    Source: {news.source || "Unknown"}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400 mt-4 text-center">No news available.</p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* Empty sections */}
        {["Add Course", "Add Blog", "ML Modal"].includes(currentSection) && (
          <div className="flex-1 p-8 bg-[#1f2937] text-white overflow-y-auto"></div>
        )}

       
      </div>
    </div>
  );
}

export default Dashboard;
