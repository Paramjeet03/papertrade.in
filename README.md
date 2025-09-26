# PaperTrade – Full-Stack Stock Trading Simulation Platform

PaperTrade is a **full-stack trading simulator** designed to **allow users to practice stock trading in a risk-free environment**. The platform combines a **FastAPI backend**, **MySQL database**, and a **modern ReactJS + Vite + TailwindCSS frontend** to provide a seamless and responsive trading experience.  

The goal of PaperTrade is to **help users learn trading strategies, manage portfolios, and understand market dynamics** without investing real money.

---

## Features

- **Secure Authentication**
  - Implements **JWT tokens** for session management and API security.
  - Passwords are hashed with **Argon2** to ensure high-level security.
  - Email-based **OTP verification** prevents unauthorized access and adds an extra layer of security.
  - **Scope**: Ensures user accounts and sensitive data are safe.
  - **Policy**: No personal data is stored in plain text; OTPs expire after a short duration.
  
- **Portfolio Management**
  - Tracks user **holdings, balances, and transaction history** in real-time.
  - Supports **buying and selling simulated stocks**, updating portfolio dynamically.
  - **Scope**: Helps users practice trading and track performance over time.
  - **Policy**: Each transaction is logged with a timestamp and timezone-aware accuracy.

- **Responsive UI**
  - Frontend built with **ReactJS, Vite, and TailwindCSS** ensures fast loading and smooth interaction.
  - Components are **reusable and modular**, allowing easy expansion.
  - **Scope**: Accessible on desktop and mobile devices.
  - **Policy**: UI follows consistent design patterns and accessibility standards.

- **Trading Simulation**
  - Provides **realistic stock trading experience** without real money.
  - Users can experiment with strategies, test risk management, and track portfolio growth.
  - **Scope**: Learning and practice platform for beginners and intermediate traders.
  - **Policy**: Simulated trades reflect realistic market behavior, though prices may be simplified for learning.

- **Modular Architecture**
  - Backend services, API routes, and frontend components are **cleanly separated**.
  - Makes the platform **scalable** and **maintainable**.
  - **Scope**: Future enhancements like AI-based trading suggestions can be integrated easily.
  
- **Timezone-Aware Logging**
  - All transactions are **timestamped with timezone awareness**.
  - Ensures accurate portfolio tracking for users across different regions.
  - **Scope**: Supports global user base.
  
---

## Tech Stack

- **Backend**: Python, FastAPI, SQLAlchemy, MySQL, Pydantic
- **Frontend**: ReactJS, Vite, TailwindCSS
- **Authentication & Security**: JWT, Argon2, OTP email verification
- **Tools & Utilities**: VS Code, Postman, Git/GitHub, Docker (optional)

---

## Installation

### Backend

```bash
# Clone repository
git clone <repo-url>
cd PaperTrade/backend

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload


Frontend
cd PaperTrade/frontend

# Install dependencies
npm install

# Run development server
npm run dev
```
# Usage

- Open the frontend in your browser (http://localhost:5173 by default).

- Sign up using your email and password. Complete OTP verification.

- Access your dashboard to view balances, holdings, and transaction history.

- Simulate buying and selling stocks to practice trading strategies.

- Track portfolio performance in real-time and analyze historical trades.

# Scope & Purpose

## PaperTrade aims to be:

- A learning platform for beginners and enthusiasts to practice trading.

-  risk-free environment to understand stock market dynamics.

### A foundation for future enhancements like AI/ML-based trading recommendations and analytics.

### A portfolio management tool for users to test strategies before investing real money.

# Policies

- Data Privacy: No plain text storage of passwords or sensitive user data.

- Transaction Accuracy: All trade records are timestamped and stored reliably.

- Security: JWT and OTP mechanisms ensure only authorized access.

- Open-Source Contribution: Encourages collaboration and feature enhancement.

# Future Aims

- Integrate real-time stock market APIs for live trading simulations.

- Implement AI/ML-based trading suggestions based on historical trends.

- Enhance UI/UX with analytics dashboards and performance charts.

- Add social features like leaderboards and collaborative trading challenges.

# Contributing

## Contributions are welcome! Open issues, submit pull requests, or suggest enhancements. Follow clean code practices and maintain modular design.

# License

-- This project is licensed under the MIT License.
