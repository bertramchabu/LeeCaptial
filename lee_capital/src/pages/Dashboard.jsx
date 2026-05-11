import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DollarSign, TrendingUp, PieChart, Award } from 'lucide-react';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    // Demo portfolio data
    setPortfolioData({
      totalValue: 284500,
      ytdReturn: 12.4,
      riskScore: 'Moderate-Aggressive',
      holdings: [
        { asset: 'Equities', allocation: 0.55, value: 156475 },
        { asset: 'Fixed Income', allocation: 0.25, value: 71125 },
        { asset: 'Alternatives', allocation: 0.20, value: 56900 },
      ]
    });
  }, [currentUser]);

  if (!currentUser) return <div className="pt-32 text-center">Redirecting...</div>;
  if (!portfolioData) return <div className="pt-32 text-center">Loading portfolio...</div>;

  return (
    <div className="pt-24 pb-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#002B5B]">Client Dashboard</h1>
          <p className="text-gray-500">Welcome back, {currentUser.email?.split('@')[0] || 'Investor'}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-[#3282B8]">
            <DollarSign className="text-[#3282B8] mb-2" />
            <p className="text-sm text-gray-500">Total Portfolio Value</p>
            <p className="text-3xl font-bold">${portfolioData.totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-green-500">
            <TrendingUp className="text-green-500 mb-2" />
            <p className="text-sm text-gray-500">YTD Return</p>
            <p className="text-3xl font-bold text-green-600">+{portfolioData.ytdReturn}%</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-amber-500">
            <PieChart className="text-amber-500 mb-2" />
            <p className="text-sm text-gray-500">Risk Profile</p>
            <p className="text-2xl font-semibold">{portfolioData.riskScore}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-[#002B5B] mb-5 flex items-center gap-2"><Award size={20} /> Asset Allocation</h2>
          <div className="space-y-4">
            {portfolioData.holdings.map((h, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1"><span>{h.asset}</span><span>{(h.allocation * 100).toFixed(0)}%</span></div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-[#002B5B] to-[#3282B8] h-2.5 rounded-full" style={{ width: `${h.allocation * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;