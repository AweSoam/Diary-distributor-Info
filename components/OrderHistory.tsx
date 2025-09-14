
import React from 'react';
import type { Bill } from '../types';
import { HistoryIcon } from './icons/HistoryIcon';

interface OrderHistoryProps {
  bills: Bill[];
  onViewBill: (bill: Bill) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ bills, onViewBill }) => {
    if (bills.length === 0) {
        return (
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 w-full flex flex-col items-center justify-center text-center h-96 lg:h-full">
                <HistoryIcon />
                <h2 className="text-2xl font-bold text-brand-gray-600 mt-4">No Past Orders</h2>
                <p className="text-brand-gray-400 mt-2">Create a new order to see it here.</p>
            </div>
        );
    }
    
    return (
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 w-full">
            <h2 className="text-3xl font-bold text-brand-gray-600 mb-6">Order History</h2>
            <div className="space-y-4">
                {bills.map((bill, index) => (
                    <div key={index} className="bg-brand-gray-100 rounded-xl p-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-brand-gray-600">{bill.customer.name}</p>
                            <p className="text-sm text-brand-gray-400">
                                {bill.date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                        <div className="text-right">
                             <p className="font-bold text-lg text-brand-gray-600">₹{bill.total.toFixed(2)}</p>
                             <button onClick={() => onViewBill(bill)} className="text-sm font-semibold text-brand-blue hover:underline">
                                View Details
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
