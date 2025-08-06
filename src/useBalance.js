import { useSelector } from 'react-redux';

const useBalance = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

const balance = transactions.reduce((acc, item) => {
  return item.type === 'income'
    ? acc + Number(item.amount)
    : acc - Number(item.amount);
}, 0);

return balance;
};

export default useBalance;
