import React, { useState, useMemo, useEffect } from 'react';
import type { Bill } from '../types';
import { CowIcon } from './icons/CowIcon';
import { CalendarIcon } from './icons/CalendarIcon';

interface BillDetailsProps {
  bill: Bill | null;
  onNewOrder: () => void;
  onUpdateBill: (updatedBill: Bill) => void;
}

const BillDetails: React.FC<BillDetailsProps> = ({ bill, onNewOrder, onUpdateBill }) => {
    const [paidAmount, setPaidAmount] = useState(0);

    useEffect(() => {
        if (bill) {
            setPaidAmount(bill.paidAmount);
        } else {
            setPaidAmount(0);
        }
    }, [bill]);

    const dueAmount = useMemo(() => {
        if (!bill) return 0;
        const due = bill.total - paidAmount;
        return due > 0 ? due : 0;
    }, [bill, paidAmount]);

    const hasChanges = bill ? paidAmount !== bill.paidAmount : false;

    const handleSaveChanges = () => {
        if (!bill) return;
        onUpdateBill({ ...bill, paidAmount });
    };

    const handlePrint = () => {
        window.print();
    };

    if (!bill) {
        return (
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 w-full flex flex-col items-center justify-center text-center h-96 lg:h-full">
                <CowIcon />
                <h2 className="text-2xl font-bold text-brand-gray-600 mt-4">DairyFlow</h2>
                <p className="text-brand-gray-400 mt-2">Generate a bill or select one from history to see details.</p>
            </div>
        );
    }

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 w-full print:shadow-none print:p-0 print:m-0">
      <header className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <CowIcon />
            <h1 className="text-2xl font-bold text-brand-gray-600">DairyFlow</h1>
          </div>
          <p className="text-brand-gray-400">DairyFlow Distributors</p>
        </div>
        <div className="text-center p-3 bg-brand-blue-light rounded-xl">
           <CalendarIcon />
        </div>
      </header>

      <div className="mb-6">
        <p className="text-lg font-semibold text-brand-gray-600">{bill.customer.name}</p>
        <p className="text-sm text-brand-gray-400">{bill.date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
      </div>

      <div className="bg-brand-gray-100 rounded-xl p-4">
        <h3 className="text-2xl font-bold text-brand-gray-600 mb-4">Bill Details</h3>
        
        <div className="w-full text-sm text-left text-brand-gray-500">
            <div className="grid grid-cols-10 gap-2 font-semibold uppercase text-xs pb-2 border-b border-brand-gray-200">
                <div className="col-span-4">Product</div>
                <div className="text-center">Qty</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-3 text-right">Total</div>
            </div>
            
            <div className="mt-2 space-y-2 max-h-[30vh] overflow-y-auto pr-2">
                {bill.items.map(item => (
                <div key={item.product.id} className="grid grid-cols-10 gap-2 items-center">
                    <div className="col-span-4 font-medium text-brand-gray-600">{item.product.name}</div>
                    <div className="text-center">{item.quantity}</div>
                    <div className="col-span-2 text-center">₹{item.price.toFixed(2)}</div>
                    <div className="col-span-3 text-right font-semibold text-brand-gray-600">₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
                ))}
            </div>
        </div>

        <div className="mt-6 border-t border-brand-gray-200 pt-4 space-y-2 text-right">
            <div className="flex justify-end items-center gap-4">
                 <label htmlFor="paidAmount" className="font-semibold text-brand-gray-500">Paid:</label>
                 <input
                    id="paidAmount"
                    type="number"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(parseFloat(e.target.value) || 0)}
                    className="w-28 bg-white border border-brand-gray-200 rounded-md py-1 px-2 text-right font-bold text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue"
                 />
            </div>
             <p className="font-bold text-xl text-brand-gray-600">Total: ₹{bill.total.toFixed(2)}</p>
             <p className="font-semibold text-red-500">Due: ₹{dueAmount.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden">
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
             {hasChanges && (
                <button
                    onClick={handleSaveChanges}
                    className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors shadow-md shadow-green-500/30 sm:col-span-2"
                >
                    Save Changes
                </button>
            )}
            <button 
                onClick={handlePrint}
                className="w-full bg-brand-gray-200 text-brand-gray-600 font-bold py-3 rounded-xl hover:bg-brand-gray-300 transition-colors"
            >
                Download Bill (PDF)
            </button>
            <button 
                onClick={onNewOrder}
                className="w-full bg-brand-blue text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors shadow-md shadow-brand-blue/30"
            >
                New Order
            </button>
        </div>
      </div>

    </div>
  );
};

export default BillDetails;