import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, PieChart, Activity,
  Clock, BarChart3, PlusCircle, MinusCircle, RefreshCw,
  Bell, Search, ChevronRight, Shield, Eye, Download, Settings
} from 'lucide-react';

const generateMockPositions = () => [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 1250, avgPrice: 175.32, currentPrice: 189.84, sector: 'Tech', dayChange: 2.34 },
  { symbol: 'NVDA', name: 'NVIDIA Corp', shares: 420, avgPrice: 892.50, currentPrice: 945.20, sector: 'Semiconductor', dayChange: 5.91 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 600, avgPrice: 245.80, currentPrice: 238.45, sector: 'Auto', dayChange: -2.99 },
  { symbol: 'MSFT', name: 'Microsoft', shares: 890, avgPrice: 398.75, currentPrice: 421.30, sector: 'Tech', dayChange: 1.82 },
  { symbol: 'BTC', name: 'Bitcoin Futures', shares: 4.2, avgPrice: 61200, currentPrice: 64800, sector: 'Crypto', dayChange: 5.88 },
  { symbol: 'TLT', name: '20+ Yr Treasury', shares: 3200, avgPrice: 92.45, currentPrice: 91.20, sector: 'Fixed Income', dayChange: -0.95 },
];

const PortfolioMetrics = ({ positions }) => {
  const totalValue = positions.reduce((sum, p) => sum + (p.shares * p.currentPrice), 0);
  const totalCost = positions.reduce((sum, p) => sum + (p.shares * p.avgPrice), 0);
  const totalPnL = totalValue - totalCost;
  const dayPnL = positions.reduce((sum, p) => sum + (p.shares * p.currentPrice * (p.dayChange / 100)), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-br from-[#002B5B] to-[#0a3a62] rounded-2xl p-5 text-white shadow-xl">
        <p className="text-white/70 text-sm">Total Portfolio Value</p>
        <p className="text-3xl font-bold mt-1">${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <span className="text-green-400 flex items-center"><TrendingUp size={14} className="mr-1" /> +{((totalValue - totalCost)/totalCost * 100).toFixed(2)}%</span>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-md">
        <p className="text-gray-500 text-sm">Total P&L</p>
        <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString(undefined, {minimumFractionDigits: 2})}
        </p>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-md">
        <p className="text-gray-500 text-sm">Today's P&L</p>
        <p className={`text-2xl font-bold ${dayPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {dayPnL >= 0 ? '+' : ''}${dayPnL.toLocaleString(undefined, {minimumFractionDigits: 2})}
        </p>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-md">
        <p className="text-gray-500 text-sm">Buying Power</p>
        <p className="text-2xl font-bold text-[#3282B8]">$184,250.00</p>
      </div>
    </div>
  );
};

const PositionsTable = ({ positions, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('All');
  
  const sectors = ['All', ...new Set(positions.map(p => p.sector))];
  const filteredPositions = positions.filter(p => 
    (filterSector === 'All' || p.sector === filterSector) &&
    (p.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#002B5B] flex items-center gap-2"><PieChart size={20} /> Open Positions</h2>
          <p className="text-sm text-gray-500 mt-1">{positions.length} active holdings</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search symbol..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm w-48 focus:outline-none focus:ring-2 focus:ring-[#3282B8]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <select className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white" value={filterSector} onChange={(e) => setFilterSector(e.target.value)}>
            {sectors.map(s => <option key={s}>{s}</option>)}
          </select>
          <button onClick={onRefresh} className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition"><RefreshCw size={16} className="text-[#3282B8]" /></button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-left">Symbol</th>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-right">Shares</th>
              <th className="px-5 py-3 text-right">Avg Price</th>
              <th className="px-5 py-3 text-right">Current</th>
              <th className="px-5 py-3 text-right">Day Δ</th>
              <th className="px-5 py-3 text-right">Total P&L</th>
            </tr>
          </thead>
          <tbody>
            {filteredPositions.map((pos, idx) => {
              const totalPnL = (pos.currentPrice - pos.avgPrice) * pos.shares;
              const totalPnLPercent = ((pos.currentPrice - pos.avgPrice) / pos.avgPrice) * 100;
              return (
                <motion.tr key={pos.symbol} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-5 py-3 font-semibold text-[#002B5B]">{pos.symbol}</td>
                  <td className="px-5 py-3 text-gray-600">{pos.name}</td>
                  <td className="px-5 py-3 text-right font-mono">{pos.shares.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right font-mono">${pos.avgPrice.toFixed(2)}</td>
                  <td className="px-5 py-3 text-right font-mono font-semibold">${pos.currentPrice.toFixed(2)}</td>
                  <td className={`px-5 py-3 text-right font-mono ${pos.dayChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {pos.dayChange >= 0 ? '+' : ''}{pos.dayChange.toFixed(2)}%
                  </td>
                  <td className={`px-5 py-3 text-right font-mono font-semibold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    <span className="text-xs block">({totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%)</span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TradeHistory = () => {
  const history = [
    { id: 1, symbol: 'AAPL', side: 'BUY', shares: 200, price: 176.20, time: '09:32:12', date: '2025-04-30', pnl: null },
    { id: 2, symbol: 'NVDA', side: 'BUY', shares: 100, price: 890.10, time: '10:15:44', date: '2025-04-30', pnl: null },
    { id: 3, symbol: 'TSLA', side: 'SELL', shares: 150, price: 241.50, time: '11:03:22', date: '2025-04-30', pnl: 945.00 },
    { id: 4, symbol: 'MSFT', side: 'BUY', shares: 300, price: 400.25, time: '13:47:08', date: '2025-04-29', pnl: null },
    { id: 5, symbol: 'BTC', side: 'BUY', shares: 1.2, price: 61800, time: '14:22:33', date: '2025-04-29', pnl: null },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-[#002B5B] flex items-center gap-2"><Clock size={18} /> Recent Trade Execution</h2>
        <button className="text-[#3282B8] text-sm flex items-center gap-1">View All <ChevronRight size={14} /></button>
      </div>
      <div className="space-y-2">
        {history.map(trade => (
          <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${trade.side === 'BUY' ? 'bg-green-100' : 'bg-red-100'}`}>
                {trade.side === 'BUY' ? <TrendingUp size={14} className="text-green-600" /> : <TrendingDown size={14} className="text-red-600" />}
              </div>
              <div>
                <p className="font-semibold">{trade.symbol}</p>
                <p className="text-xs text-gray-400">{trade.date} {trade.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono">{trade.side} {trade.shares} @ ${trade.price.toFixed(2)}</p>
              {trade.pnl && <p className={`text-xs font-medium ${trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>P&L: {trade.pnl >= 0 ? '+' : ''}${trade.pnl}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PerformanceWidget = () => {
  return (
    <div className="bg-gradient-to-r from-[#002B5B]/5 via-white to-[#3282B8]/5 rounded-2xl p-5 border border-[#3282B8]/20">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-[#002B5B] flex items-center gap-2"><Activity size={18} /> Alpha Score</h3>
          <p className="text-2xl font-bold mt-2 text-[#3282B8]">+14.2%</p>
          <p className="text-sm text-gray-500">vs. S&P 500 benchmark</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Sharpe Ratio</p>
          <p className="text-xl font-bold text-[#002B5B]">2.41</p>
        </div>
      </div>
      <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full w-3/4 bg-gradient-to-r from-[#002B5B] to-[#3282B8] rounded-full"></div>
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>Risk-adjusted</span>
        <span>Top Quartile</span>
      </div>
    </div>
  );
};

const TraderPortfolio = () => {
  const { currentUser } = useAuth();
  const [positions, setPositions] = useState(generateMockPositions());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newPositions = positions.map(p => ({
        ...p,
        currentPrice: p.currentPrice * (1 + (Math.random() - 0.5) * 0.02),
        dayChange: (Math.random() - 0.5) * 6,
      }));
      setPositions(newPositions);
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center pt-20">Redirecting to authentication...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#002B5B] flex items-center gap-2">
              <BarChart3 className="text-[#3282B8]" /> Trading Portfolio
              <span className="text-sm font-normal bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-3">LIVE</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Lee Capital | Institutional Execution Platform</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right text-sm">
              <p className="text-gray-400">Last sync</p>
              <p className="font-mono text-gray-600">{lastUpdated.toLocaleTimeString()}</p>
            </div>
            <button onClick={handleRefresh} disabled={isRefreshing} className="btn-primary py-2 px-5 flex items-center gap-2">
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} /> {isRefreshing ? 'Updating...' : 'Sync Data'}
            </button>
            <button className="p-2 bg-white rounded-xl shadow-sm"><Bell size={18} className="text-gray-500" /></button>
          </div>
        </div>

        {/* KPI Metrics */}
        <PortfolioMetrics positions={positions} />

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PositionsTable positions={positions} onRefresh={handleRefresh} />
            <TradeHistory />
          </div>
          <div className="space-y-5">
            <PerformanceWidget />
            <div className="bg-white rounded-2xl shadow-xl p-5">
              <h3 className="font-bold text-[#002B5B] flex gap-2 items-center"><Settings size={18} /> Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button className="border border-[#3282B8] text-[#3282B8] py-2 rounded-xl hover:bg-[#3282B8]/5 transition flex items-center justify-center gap-2"><PlusCircle size={16} /> Deposit</button>
                <button className="bg-[#002B5B] text-white py-2 rounded-xl hover:bg-[#003366] transition flex items-center justify-center gap-2"><Download size={16} /> Withdraw</button>
                <button className="col-span-2 border border-gray-200 py-2 rounded-xl text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"><Eye size={16} /> Advanced Analytics</button>
              </div>
            </div>
            <div className="bg-[#002B5B] rounded-2xl p-5 text-white">
              <Shield className="text-[#3282B8] mb-2" size={28} />
              <p className="font-bold">Lee Capital Insights</p>
              <p className="text-sm text-white/70 mt-1">Fed signals rate hold. Tech sector continues momentum. Consider rebalancing equity exposure.</p>
              <button className="mt-4 text-sm text-[#3282B8] flex items-center gap-1">Read analysis <ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-200 pt-6">
          <p>Lee Capital Trading Dashboard — Real-time market data simulated for demo. Secure client portal with encrypted transmission.</p>
        </div>
      </div>
    </div>
  );
};

export default TraderPortfolio;