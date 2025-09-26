import { motion } from "framer-motion";
import Select from "react-select";
import stock from "../../assets/Market/stock.webm";
import { useState } from "react";
import CandleChart from "../chart/chart";
import noimage from "../../assets/Cards/noimage.png" 

function MarketPage() {
  // Animation variants
  const quoteVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 0.4 },
    },
  };

  // States
  const [apiRespDescription, setApiRespDescription] = useState(null);
  const [apiRespPriceChange, setApiRespPriceChange] = useState(null);
  const [apiRespOneWeek, setApiRespOneWeek] = useState(null);
  const [apiRespOneMonth, setApiRespOneMonth] = useState(null);
  const [apiRespOneYear, setApiRespOneYear] = useState(null);
  const [apiRespStockNews, setApiRespStockNews] = useState(null);
  const [loading, setLoading] = useState(false);

  const [stockSelect, setStockSelect] = useState(null);

  // Stock options
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

  const handleChange = async (option) => {
    try {
      setStockSelect(option);
      setLoading(true);

      const body = JSON.stringify({ sym: option.value });

      const endpoints = [
        "stockInfo",
        "oneWeek",
        "oneMonth",
        "oneYear",
        "stockNews",
        "get_priceChange",
      ];

      const responses = await Promise.all(
        endpoints.map((ep) =>
          fetch(`http://127.0.0.1:8001/stockService/${ep}/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            body,
          })
        )
      );

      responses.forEach((resp, i) => {
        if (!resp.ok) {
          throw new Error(`API request ${endpoints[i]} failed: ${resp.status}`);
        }
      });

      const [stockInfo, oneWeek, oneMonth, oneYear, stockNews, priceChange] =
        await Promise.all(responses.map((r) => r.json()));

      setApiRespDescription(stockInfo);
      setApiRespOneWeek(oneWeek);
      setApiRespOneMonth(oneMonth);
      setApiRespOneYear(oneYear);
      setApiRespStockNews(stockNews);
      setApiRespPriceChange(priceChange);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
  {/* Top Section */}
  <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16 mt-20">
    {/* Left - Quote */}
    <motion.div
      className="md:w-1/2 text-left"
      variants={quoteVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-5xl md:text-[55px] mt-10 font-serif text-black dark:text-white leading-snug">
        “<span className="underline text-purple-600">In the short run,</span>{" "}
        the market is a{" "}
        <span className="underline text-purple-600">voting machine</span>, but
        in the long run, it is a{" "}
        <span className="underline text-purple-600">weighing machine</span>.”
      </h1>
      <a
        href="https://en.wikipedia.org/wiki/Benjamin_Graham"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="underline text-white text-[22px] md:text-[28px] mt-6 font-medium">
          Author: Benjamin Graham (1894 – 1976) 🕊️
        </p>
      </a>
    </motion.div>

    {/* Right - Image */}
   <motion.div
      className="md:w-1/2 flex justify-end mt-10 h-[390px]"
      variants={imageVariants}
      initial="hidden"
      animate="visible"
    >
      <video
        src={stock}        // Replace with your video file path or URL
        className="w-full max-w-md md:max-w-lg rounded-3xl shadow-lg object-cover"
        autoPlay
        loop
        muted
        playsInline         // Ensures autoplay works on mobile
      />
    </motion.div>

  </div>

  {/* Heading */}
  <div className="font-serif text-[28px] md:text-[38px] text-purple-600 text-center underline mt-20 mb-6">
    <h1>Enter a stock symbol to see the latest trends</h1>
  </div>

  {/* React-Select Dropdown */}
  <div className="max-w-md mx-auto mb-20">
    <div className="bg-purple-600 rounded-xl p-4 shadow-lg">
      <Select
        options={stockOptions}
        isSearchable
        placeholder="Search or select a stock..."
        className="text-black"
        classNamePrefix="custom-select"
        maxMenuHeight={200}
        noOptionsMessage={() => "No matching stock found!"}
        onChange={handleChange}
      />
    </div>
  </div>

  {/* Display selected stock */}
  {(loading || apiRespDescription) && (
    <div className="text-center mt-6 bg-gray-800 rounded-2xl w-[90%] mx-auto p-6 shadow-lg">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-purple-600 text-3xl mt-4 font-semibold">
            Loading...
          </p>
        </div>
      ) : (
        apiRespDescription && (
          <div className="flex flex-col gap-8">
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
                  {apiRespDescription.description ||
                    "No description available."}
                </p>

                {/* Price Change */}
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
                      :"■"}{" "}
                    {apiRespPriceChange.perc.toFixed(2)}% (Price Change)
                  </p>
                )}
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
              <h1 className="text-2xl font-bold text-purple-500 mb-4">
                Stock Price Trends
              </h1>
              <p className="text-gray-300 mb-6 text-sm md:text-base">
                Below are candlestick charts showing the stock's price movement over
                different time periods. Each candle shows the{" "}
                <span className="font-semibold">open, close, high,</span> and{" "}
                <span className="font-semibold">low</span> within the given timeframe. 
                Green candles = upward momentum, red candles = downward momentum.
              </p>

              {/* One Week */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-green-400 mb-2">
                  1-Week Candlestick Chart
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Shows short-term price fluctuations and intraday trading patterns. Useful
                  for active traders.
                </p>
                <CandleChart apiResp={apiRespOneWeek} />
              </div>

              {/* One Month */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-blue-400 mb-2">
                  1-Month Candlestick Chart
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Highlights medium-term trends, showing whether the stock has gained or
                  lost momentum in the past month.
                </p>
                <CandleChart apiResp={apiRespOneMonth} />
              </div>

              {/* One Year */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                  1-Year Candlestick Chart
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Provides a long-term perspective, showing how the stock has performed over
                  the last year. Useful for investors focusing on big-picture trends.
                </p>
                <CandleChart apiResp={apiRespOneYear} />
              </div>
            </div>
           <div className="mt-6">
            <h1 className="text-4xl font-bold ml-0 text-purple-700 underline">NEWS</h1>

            {apiRespStockNews && apiRespStockNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">
                {apiRespStockNews.slice(0, 9).map((news, index) => (
                  <a
                    key={index}
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col bg-gray-900 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Image with gradient overlay */}
                    
                      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl bg-black flex items-center justify-center">
                        <img
                          src={news.image ? news.image : noimage}
                          alt={news.headline}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    

                    {/* Content */}
                    <div className="p-4 flex-1 text-white flex flex-col justify-between">
                      <h2 className="font-bold text-lg text-purple-500 mb-2">{news.headline}</h2>
                      <p className="text-gray-300 text-sm line-clamp-3">{news.summary}</p>
                      <p className="text-gray-400 text-xs mt-2">Source: {news.source}</p>
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

  {/* Terms & Conditions */}
  <div className="w-full p-6 bg-white rounded-2xl shadow-lg border border-gray-200 mt-12">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      Terms & Conditions
    </h2>
    <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-base">
      <li>
        This is a <span className="font-semibold">dummy project</span> for
        demonstration purposes only.
      </li>
      <li>
        Works only with{" "}
        <span className="font-semibold">US and Canadian stocks</span>.
      </li>
      <li>
        Data provided may not reflect real-time conditions. Fetched using{" "}
        <span className="font-semibold">yFinance and Finnhub OHLC APIs</span>.
      </li>
      <li>
        Developers are not responsible for financial decisions made with this
        information.
      </li>
      <li>
        Verify stock info from official financial sources before investing.
      </li>
      <li>
        This project does not provide investment advice and is not affiliated
        with any financial institution.
      </li>
    </ul>
  </div>
</>
  );
}

export default MarketPage;