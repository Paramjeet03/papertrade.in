function Footer() {
  return (
    <footer className="bg-white w-full px-10 py-12  rounded-b-3xl shadow-md text-gray-700">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Terms & Conditions – Paper Trading (Dummy Project)
        </h2>

        {/* Disclaimer / Legal Text */}
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            This is a dummy project created for educational purposes only. All
            trading activities in this website are simulated and do not involve
            real money.
          </p>

          <p>
            <strong>High-Risk Warning:</strong> Even in simulation, trading
            leveraged products such as Contracts for Difference (CFDs) or spread
            betting carries risk. Users should understand the mechanics of
            trading before practicing.
          </p>

          <p>
            This website is intended solely for learning and academic use. It
            does not provide investment advice or real financial services. Users
            are responsible for their own decisions while using the platform.
          </p>

          <p>
            Restricted Jurisdictions: This website does not offer any services
            for real financial trading and is not intended for users under the
            age of 18.
          </p>

          <p>
            By using this platform, you acknowledge that it is a simulated
            environment and no real financial transactions occur. This project is
            meant for learning, experimentation, and demonstration purposes only.
          </p>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © 2025 PaperTrading.in – Dummy Project for Academic Use
          </p>

          {/* Developer Credit */}
          <div className="mt-4 md:mt-0 text-sm">
            <span className="font-medium">Developed by:</span>{" "}
            <span className="font-semibold text-gray-800">Paramjeet Singh</span>{" "}
            |
            <a
              href="https://www.linkedin.com/in/ai-ml-python-datascience/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
