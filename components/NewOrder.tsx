import React, { useState, useMemo, useEffect } from 'react';
import type { Customer, OrderItem, Product, Bill } from '../types';
import ProductItem from './ProductItem';

interface NewOrderProps {
  products: Product[];
  customers: Customer[];
  onBillGenerated: (bill: Bill) => void;
}

const NewOrder: React.FC<NewOrderProps> = ({ products, customers, onBillGenerated }) => {
    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[0]?.id || '');

    // FIX: Add useEffect to handle cases where the selected customer might be deleted.
    useEffect(() => {
        if (customers.length > 0 && !customers.some(c => c.id === selectedCustomerId)) {
            setSelectedCustomerId(customers[0].id);
        } else if (customers.length === 0) {
            setSelectedCustomerId('');
        }
    }, [customers, selectedCustomerId]);

    const handleQuantityChange = (productId: string, quantity: number) => {
        setQuantities(prev => ({ ...prev, [productId]: Math.max(0, quantity) }));
    };

    const selectedCustomer = useMemo(() => {
        // FIX: Removed non-null assertion to prevent crash if customer is not found.
        return customers.find(c => c.id === selectedCustomerId);
    }, [selectedCustomerId, customers]);

    const getPriceForCustomer = (product: Product, customer: Customer): number => {
        return customer?.priceOverrides?.[product.id] ?? product.price;
    }

    const orderItems: OrderItem[] = useMemo(() => {
        if (!selectedCustomer) return [];
        return products
            .map(product => ({
                product,
                quantity: quantities[product.id] || 0,
                price: getPriceForCustomer(product, selectedCustomer)
            }))
            .filter(item => item.quantity > 0);
    }, [quantities, selectedCustomer, products]);

    const subtotal = useMemo(() => {
        return orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [orderItems]);

    const handleGenerateBill = () => {
        if (orderItems.length === 0 || !selectedCustomer) {
            alert('Please add items to the order and select a customer.');
            return;
        }

        const newBill: Bill = {
            id: `bill-${Date.now()}`,
            customer: selectedCustomer,
            items: orderItems,
            total: subtotal,
            date: new date(),
            paidAmount: subtotal, // Default paid amount to total
        };
        onBillGenerated(newBill);
        setQuantities({});
    };

    if (customers.length === 0 || products.length === 0) {
        return (
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 w-full text-center">
                <h2 className="text-2xl font-bold text-brand-gray-600 mb-4">Cannot Create Order</h2>
                <p className="text-brand-gray-500">
                    Please add at least one customer and one product before creating a new order.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 w-full">
            <h2 className="text-3xl font-bold text-brand-gray-600 mb-6">New Order</h2>

            <div className="mb-6">
                <label htmlFor="customer-select" className="block text-sm font-medium text-brand-gray-500 mb-2">Customer</label>
                <select
                    id="customer-select"
                    value={selectedCustomerId}
                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                    className="w-full bg-brand-gray-100 border-transparent rounded-lg p-3 font-semibold text-brand-gray-600 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                >
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {products.map(product => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        quantity={quantities[product.id] || 0}
                        onQuantityChange={handleQuantityChange}
                        price={getPriceForCustomer(product, selectedCustomer!)}
                    />
                ))}
            </div>
            
            <div className="border-t border-brand-gray-200 pt-4">
                <div className="flex justify-between items-center text-xl font-bold text-brand-gray-600 mb-4">
                    <span>Total</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <button
                    onClick={handleGenerateBill}
                    disabled={orderItems.length === 0}
                    className="w-full bg-brand-blue text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors disabled:bg-brand-gray-300 disabled:cursor-not-allowed shadow-md shadow-brand-blue/30"
                >
                    Generate Bill
                </button>
            </div>
        </div>
    );
};

export default NewOrder;