import { Ionicons } from '@expo/vector-icons';
import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react';

export type DemoIcon = keyof typeof Ionicons.glyphMap;
export type Transaction = {
  id: string;
  title: string;
  amount: number;
  direction: 'credit' | 'debit';
  status: 'Approved' | 'Credited';
  date: string;
  icon: DemoIcon;
};

type DemoResult = { success: true } | { success: false; message: string };
type DemoWallet = {
  balance: number;
  transactions: Transaction[];
  sendMoney: (amount: number, recipient: string) => DemoResult;
  cashIn: (amount: number, method: string, bank: string, accountName: string, accountNumber: string) => DemoResult;
  bankTransfer: (amount: number, bank: string, accountName: string) => DemoResult;
  payBill: (amount: number, category: string, biller: string) => DemoResult;
  buyELoad: (amount: number, network: string, phone: string) => DemoResult;
  saveMoney: (amount: number, goal: string) => DemoResult;
  cryptoBuy: (amount: number, asset: string) => DemoResult;
  cryptoSell: (amount: number, asset: string) => DemoResult;
  remitMoney: (amount: number, recipient: string) => DemoResult;
  scanPay: (amount: number, merchant: string) => DemoResult;
};

const initialTransactions: Transaction[] = [
  { id: 'seed-1', title: 'Send Money', amount: 51600, direction: 'debit', status: 'Approved', date: '6/16/22', icon: 'paper-plane-outline' },
  { id: 'seed-2', title: 'Cash-In', amount: 14350, direction: 'credit', status: 'Credited', date: '6/15/22', icon: 'wallet-outline' },
  { id: 'seed-3', title: 'Pay Bills', amount: 200, direction: 'debit', status: 'Approved', date: '6/14/22', icon: 'receipt-outline' }
];

const DemoContext = createContext<DemoWallet | null>(null);

const today = () => new Date().toLocaleDateString('en-PH', { month: 'numeric', day: 'numeric', year: '2-digit' });
const nextId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export function formatPHP(value: number) {
  return `PHP ${value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function DemoProvider({ children }: PropsWithChildren) {
  const [balance, setBalance] = useState(4370);
  const [transactions, setTransactions] = useState(initialTransactions);

  const checkDebit = useCallback((amount: number): DemoResult => {
    if (!Number.isFinite(amount) || amount <= 0) return { success: false, message: 'Enter an amount greater than zero.' };
    if (amount > balance) return { success: false, message: `Insufficient wallet balance. You have ${formatPHP(balance)} available.` };
    return { success: true };
  }, [balance]);

  const addTransaction = useCallback((title: string, amount: number, direction: Transaction['direction'], icon: DemoIcon) => {
    const transaction: Transaction = { id: nextId(), title, amount, direction, status: direction === 'credit' ? 'Credited' : 'Approved', date: today(), icon };
    setTransactions((current) => [transaction, ...current].slice(0, 8));
  }, []);

  const sendMoney = useCallback((amount: number, recipient: string): DemoResult => {
    const check = checkDebit(amount);
    if (!check.success) return check;
    if (!recipient.trim()) return { success: false, message: 'Enter a recipient mobile number or name.' };
    setBalance((current) => current - amount);
    addTransaction('Send Money', amount, 'debit', 'paper-plane-outline');
    return { success: true };
  }, [addTransaction, checkDebit]);

  const cashIn = useCallback((amount: number, method: string, bank: string, accountName: string, accountNumber: string): DemoResult => {
    if (!Number.isFinite(amount) || amount <= 0) return { success: false, message: 'Enter a cash-in amount greater than zero.' };
    if (!method) return { success: false, message: 'Choose a cash-in method.' };
    if (!bank) return { success: false, message: 'Choose the bank receiving the deposit.' };
    if (!accountName.trim()) return { success: false, message: 'Enter the account name.' };
    const normalizedAccountNumber = accountNumber.replace(/\D/g, '');
    if (normalizedAccountNumber.length < 6) return { success: false, message: 'Enter a valid receiving account number.' };
    setBalance((current) => current + amount);
    addTransaction('Cash-In', amount, 'credit', 'wallet-outline');
    return { success: true };
  }, [addTransaction]);

  const bankTransfer = useCallback((amount: number, bank: string, accountName: string): DemoResult => {
    const check = checkDebit(amount);
    if (!check.success) return check;
    if (!bank || !accountName.trim()) return { success: false, message: 'Enter the receiving bank and account name.' };
    setBalance((current) => current - amount);
    addTransaction('Bank Transfer', amount, 'debit', 'swap-horizontal-outline');
    return { success: true };
  }, [addTransaction, checkDebit]);

  const payBill = useCallback((amount: number, category: string, biller: string): DemoResult => {
    const check = checkDebit(amount);
    if (!check.success) return check;
    if (!category || !biller.trim()) return { success: false, message: 'Choose a category and enter a biller or account.' };
    setBalance((current) => current - amount);
    addTransaction('Pay Bills', amount, 'debit', 'receipt-outline');
    return { success: true };
  }, [addTransaction, checkDebit]);

  const buyELoad = useCallback((amount: number, network: string, phone: string): DemoResult => {
    const check = checkDebit(amount);
    if (!check.success) return check;
    if (!network || !phone.trim()) return { success: false, message: 'Choose a network and enter a mobile number.' };
    setBalance((current) => current - amount);
    addTransaction('E-Load', amount, 'debit', 'phone-portrait-outline');
    return { success: true };
  }, [addTransaction, checkDebit]);

  const saveMoney = useCallback((amount: number, goal: string): DemoResult => {
    const check = checkDebit(amount);
    if (!check.success) return check;
    if (!goal.trim()) return { success: false, message: 'Choose a savings goal.' };
    setBalance((current) => current - amount);
    addTransaction('Save Money', amount, 'debit', 'save-outline');
    return { success: true };
  }, [addTransaction, checkDebit]);

  const cryptoBuy = useCallback((amount: number, asset: string): DemoResult => {
    const check = checkDebit(amount);
    if (!check.success) return check;
    if (!asset.trim()) return { success: false, message: 'Choose a crypto asset.' };
    setBalance((current) => current - amount);
    addTransaction(`Crypto Buy · ${asset}`, amount, 'debit', 'hardware-chip');
    return { success: true };
  }, [addTransaction, checkDebit]);

  const cryptoSell = useCallback((amount: number, asset: string): DemoResult => {
    if (!Number.isFinite(amount) || amount <= 0) return { success: false, message: 'Enter an amount greater than zero.' };
    if (!asset.trim()) return { success: false, message: 'Choose a crypto asset.' };
    setBalance((current) => current + amount);
    addTransaction(`Crypto Sell · ${asset}`, amount, 'credit', 'hardware-chip');
    return { success: true };
  }, [addTransaction]);

  const remitMoney = useCallback((amount: number, recipient: string): DemoResult => {
    const check = checkDebit(amount);
    if (!check.success) return check;
    if (!recipient.trim()) return { success: false, message: 'Enter the recipient name.' };
    setBalance((current) => current - amount);
    addTransaction('IREMITX Remittance', amount, 'debit', 'globe-outline');
    return { success: true };
  }, [addTransaction, checkDebit]);

  const scanPay = useCallback((amount: number, merchant: string): DemoResult => {
    const check = checkDebit(amount);
    if (!check.success) return check;
    if (!merchant.trim()) return { success: false, message: 'Enter a merchant code.' };
    setBalance((current) => current - amount);
    addTransaction('Scan to Pay', amount, 'debit', 'scan-outline');
    return { success: true };
  }, [addTransaction, checkDebit]);

  const value = useMemo(() => ({ balance, transactions, sendMoney, cashIn, bankTransfer, payBill, buyELoad, saveMoney, cryptoBuy, cryptoSell, remitMoney, scanPay }), [balance, transactions, sendMoney, cashIn, bankTransfer, payBill, buyELoad, saveMoney, cryptoBuy, cryptoSell, remitMoney, scanPay]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemoWallet() {
  const wallet = useContext(DemoContext);
  if (!wallet) throw new Error('useDemoWallet must be used inside DemoProvider');
  return wallet;
}
