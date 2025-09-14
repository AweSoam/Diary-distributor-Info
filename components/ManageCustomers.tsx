import React, { useState } from 'react';
import type { Customer, Product } from '../types';
import { EditIcon, DeleteIcon, PlusIcon, SaveIcon, CancelIcon } from './icons/ActionIcons';
import { UserIcon } from './icons/UserIcon';

interface ManageCustomersProps {
    customers: Customer[];
    products: Product[];
    onAddCustomer: (customer: Omit<Customer, 'id'>) => void;
    onUpdateCustomer: (customer: Customer) => void;
    onDeleteCustomer: (customerId: string) => void;
}

const ManageCustomers: React.FC<ManageCustomersProps> = ({ customers, products, onAddCustomer, onUpdateCustomer, onDeleteCustomer }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [newCustomerData, setNewCustomerData] = useState({ name: '', priceOverrides: {} });

    const handleAddClick = () => {
        setIsAdding(true);
        setEditingCustomer(null);
        setNewCustomerData({ name: '', priceOverrides: {} });
    };

    const handleEditClick = (customer: Customer) => {
        setEditingCustomer({ ...customer, priceOverrides: customer.priceOverrides ? { ...customer.priceOverrides } : {} });
        setIsAdding(false);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingCustomer(null);
    };

    const handleSaveAdd = () => {
        if (!newCustomerData.name) {
            alert('Please enter a customer name.');
            return;
        }
        onAddCustomer(newCustomerData);
        handleCancel();
    };

    const handleSaveUpdate = () => {
        if (!editingCustomer || !editingCustomer.name) {
            alert('Customer name cannot be empty.');
            return;
        }
        // Clean up empty override values
        const cleanedOverrides: { [key: string]: number } = {};
        for (const pid in editingCustomer.priceOverrides) {
            if (editingCustomer.priceOverrides[pid]) {
                cleanedOverrides[pid] = editingCustomer.priceOverrides[pid];
            }
        }
        onUpdateCustomer({ ...editingCustomer, priceOverrides: cleanedOverrides });
        handleCancel();
    };

    const handleOverrideChange = (productId: string, value: string) => {
        if (!editingCustomer) return;
        const price = parseFloat(value);
        const newOverrides = { ...editingCustomer.priceOverrides };
        if (!isNaN(price) && price > 0) {
            newOverrides[productId] = price;
        } else {
            delete newOverrides[productId];
        }
        setEditingCustomer({ ...editingCustomer, priceOverrides: newOverrides });
    };

    const renderEditForm = (customer: Customer) => (
        <div className="bg-brand-gray-100 rounded-xl p-4 space-y-4">
             <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4 flex-grow">
                    <div className="bg-white rounded-lg p-2 w-12 h-12 flex items-center justify-center"><UserIcon /></div>
                    <input type="text" value={customer.name} onChange={(e) => setEditingCustomer({ ...customer, name: e.target.value })} className="form-input font-semibold text-lg" />
                 </div>
                 <div className="flex items-center gap-2 ml-4">
                     <button onClick={handleSaveUpdate} className="text-green-500 hover:text-green-700"><SaveIcon /></button>
                     <button onClick={handleCancel} className="text-red-500 hover:text-red-700"><CancelIcon /></button>
                 </div>
            </div>
            <div>
                <h4 className="font-semibold text-brand-gray-600 mb-2">Price Overrides (optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {products.map(p => (
                        <div key={p.id} className="flex items-center gap-2">
                             <label htmlFor={`override-${p.id}`} className="text-sm flex-grow">{p.name} ({p.variant})</label>
                             <input 
                                id={`override-${p.id}`}
                                type="number" 
                                placeholder={`Std: ${p.price}`}
                                value={customer.priceOverrides?.[p.id] || ''}
                                onChange={e => handleOverrideChange(p.id, e.target.value)}
                                className="form-input w-28" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 w-full">
            <style>{`.form-input { background-color: white; border: 1px solid #E8ECF3; border-radius: 0.5rem; padding: 0.5rem 0.75rem; }`}</style>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-brand-gray-600">Manage Customers</h2>
                {!isAdding && !editingCustomer && (
                    <button onClick={handleAddClick} className="flex items-center gap-2 bg-brand-blue text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors shadow-md shadow-brand-blue/30">
                        <PlusIcon />
                        <span>Add Customer</span>
                    </button>
                )}
            </div>
            <div className="space-y-3">
                {isAdding && (
                     <div className="flex items-center justify-between bg-brand-gray-100 rounded-xl p-3">
                        <input type="text" placeholder="New Customer Name" value={newCustomerData.name} onChange={(e) => setNewCustomerData({ ...newCustomerData, name: e.target.value })} className="form-input flex-grow" />
                        <div className="flex items-center gap-2 ml-4">
                            <button onClick={handleSaveAdd} className="text-green-500 hover:text-green-700"><SaveIcon /></button>
                            <button onClick={handleCancel} className="text-red-500 hover:text-red-700"><CancelIcon /></button>
                        </div>
                    </div>
                )}
                {customers.map(customer => (
                    editingCustomer?.id === customer.id
                    ? renderEditForm(editingCustomer)
                    : (
                        <div key={customer.id} className="flex items-center justify-between bg-brand-gray-100 rounded-xl p-3">
                            <div className="flex items-center gap-4">
                                <div className="bg-white rounded-lg p-2 w-12 h-12 flex items-center justify-center">
                                    <UserIcon />
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-gray-600">{customer.name}</p>
                                    <p className="text-sm text-brand-gray-400">
                                        {customer.priceOverrides && Object.keys(customer.priceOverrides).length > 0
                                            ? `${Object.keys(customer.priceOverrides).length} special price(s)`
                                            : 'Standard prices'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleEditClick(customer)} className="text-brand-gray-400 hover:text-brand-blue transition-colors">
                                    <EditIcon />
                                </button>
                                <button onClick={() => onDeleteCustomer(customer.id)} className="text-brand-gray-400 hover:text-red-500 transition-colors">
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default ManageCustomers;
