import React from 'react'
import { useState } from 'react';
import { Eye, EyeOff, Plus, TrendingUp, TrendingDown, Calendar,Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import useBalance from './useBalance'; 
import { addTransaction , loadTransactions ,deleteTransaction } from './transactionSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
const transactions = useSelector((state) => state.transactions.visibleTransactions);
  console.log('Redux transactions = ', transactions);
  // Access the dispatch function from Redux
  const dispatch = useDispatch();
  const balance = useBalance();
  console.log('Redux transactions balance = ', balance);

 const [amount, setAmount] = useState('');
const [type, setType] = useState('expense');
const [category, setCategory] = useState('');
const [date, setDate] = useState('');
const [description, setDescription] = useState('');

  const handleAddTransaction = () => {
  if (!amount || !category || !date) {
    alert("Please fill in all required fields.");
    return;
  }

  const newTransaction = {
    id: Date.now(), 
    amount,
    type,
    category,
    date,
    description,
  };

  dispatch(addTransaction(newTransaction));

  // فضي الحقول بعد الإضافة
  setAmount('');
  setCategory('');
  setDate('');
  setDescription('');
  setType('expense');
};

useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      dispatch(loadTransactions(JSON.parse(stored)));
    }
  }, [dispatch]);

  const expenseCategories = [
  { label: "🍕 Food", value: "food" },
  { label: "🏠 Rent", value: "rent" },
  { label: "🚗 Transport", value: "transport" },
  { label: "📚 Education", value: "education" },
  { label: "🏥 Healthcare", value: "healthcare" },
  { label: "🎬 Entertainment", value: "entertainment" },
  { label: "🛍️ Shopping", value: "shopping" },
  { label: "💡 Bills", value: "bills" },
  { label: "➕ Other", value: "other" }
];

const incomeCategories = [
  { label: "💼 Freelance", value: "freelance" },
  { label: "📈 Investments", value: "investments" },
  { label: "🎁 Gifts", value: "gifts" },
  { label: "💸 Other Income", value: "other_income" }
];


  // State to toggle balance visibility
  const [showBalance, setShowBalance] = useState(true);
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            My Wallet
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage your finances with ease</p>
        </div>

        {/* Modern Card Design */}
        <div className="max-w-sm sm:max-w-md mx-auto mb-8">
          <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden aspect-[1.586/1]">
            {/* Subtle background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-300/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
            
            {/* Mastercard Logo */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
              <div className="flex items-center space-x-[-6px]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 rounded-full"></div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="text-[10px] sm:text-xs font-bold mt-1 text-center tracking-wide opacity-90">mastercard</div>
            </div>
            
            <div className="relative z-10 h-full flex flex-col">
              {/* Balance Section */}
              <div className="flex-0  relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white/80">Current Balance</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight flex items-center justify-between">
                  <span>
                   {showBalance ? `EGP ${balance.toLocaleString()}` : '••••••••'}
                  </span>

                  <button 
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white/70 hover:text-white transition-all duration-200 pt-8  pb-5 rounded-full hover:bg-white/10 ml-4"
                  >
                    {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {/* Card Details at bottom */}
              <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-4">
                <div className="text-sm sm:text-lg md:text-xl font-mono tracking-[0.08em] sm:tracking-[0.15em] text-white/95 font-medium break-all sm:break-normal">
                  5282 **** **** ****
                </div>
                <div className="flex justify-between items-center">
                   {/* Valid Thru */}
                  <div className="min-w-0 flex-shrink-0">
                    <div className="text-xs text-white/70 mb-1 uppercase tracking-wider">
                      Valid Thru
                    </div>
                    <div className="text-sm sm:text-base font-mono tracking-wider text-white/95 font-medium">
                      09/28
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
          </div>
        </div>

   

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Add Transaction Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 flex items-center">
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-purple-600" />
              Add New Transaction
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-base"
                />

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-base"
                >
                  <option value="expense">💸 Expense</option>
                  <option value="income">💰 Income</option>
                </select>
              </div>

              <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-base"
>
  <option value="">Select category</option>
  {(type === "income" ? incomeCategories : expenseCategories).map((cat) => (
    <option key={cat.value} value={cat.value}>
      {cat.label}
    </option>
  ))}
</select>


              <input
                type="date"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-base"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <textarea
                placeholder="Description (Optional)"
                 value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none text-base"
                rows="3"
              />

              <button onClick={handleAddTransaction} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white w-full py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-semibold flex items-center justify-center text-base">
                <Plus className="w-5 h-5 mr-2" />
                Add Transaction

              </button>
            </div>
          </div>

          {/* Recent Transactions */}
<div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
  <h2 className="text-xl sm:text-2xl font-semibold mb-6 flex items-center">
    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-indigo-600" />
    Recent Transactions
  </h2>

  <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
    {transactions.length === 0 ? (
      <p className="text-gray-500 text-sm">No transactions found.</p>
    ) : (
      transactions.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center p-3 sm:p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
            <div
              className={`p-2 sm:p-3 rounded-full ${
                item.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              } flex-shrink-0`}
            >
              {item.type === 'income' ? (
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="font-semibold text-gray-900 text-sm sm:text-base">
                {item.category}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 truncate">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </div>
              <div className="text-xs text-gray-400 flex items-center mt-1">
                <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{item.date}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`font-bold text-sm sm:text-lg ${
                item.type === 'income' ? 'text-green-600' : 'text-red-600'
              } flex-shrink-0`}
            >
              {item.type === 'income'
                ? `+EGP ${Number(item.amount).toLocaleString()}`
                : `-EGP ${Number(item.amount).toLocaleString()}`}
            </span>
            <button onClick={() => dispatch(deleteTransaction(item.id))}>
              <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</div>
        </div>
      </div>
    </div>
  );
} export default App;
