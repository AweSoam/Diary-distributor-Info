import React, { useState, useMemo } from 'react';
import type { Bill, Product, Customer } from './types';
import NewOrder from './components/NewOrder';
import BillDetails from './components/BillDetails';
import OrderHistory from './components/OrderHistory';
import ManageProducts from './components/ManageProducts';
import ManageCustomers from './components/ManageCustomers';
import { CowIcon } from './components/icons/CowIcon';
import { SettingsIcon } from './components/icons/SettingsIcon';
import { INITIAL_PRODUCTS, INITIAL_CUSTOMERS, INITIAL_BILLS } from './constants';
import { UserIcon } from './components/icons/UserIcon';
import { HistoryIcon } from './components/icons/HistoryIcon';
import { PaneerIcon } from './components/icons/ProductIcons'; // Example icon for nav

type View = 'new_order' | 'order_history' | 'manage_products' | 'manage_customers';

const App: React.FC = () => {
    const [view, setView] = useState<View>('new_order');
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
    const [bills, setBills] = useState<Bill[]>(INITIAL_BILLS);
    const [activeBill, setActiveBill] = useState<Bill | null>(null);

    // Bill Management
    const handleBillGenerated = (newBill: Bill) => {
        setBills(prev => [newBill, ...prev]);
        setActiveBill(newBill);
    };
    const handleUpdateBill = (updatedBill: Bill) => {
        const newBills = bills.map(b => b.id === updatedBill.id ? updatedBill : b);
        setBills(newBills);
        if (activeBill?.id === updatedBill.id) {
            setActiveBill(updatedBill);
        }
        alert('Payment updated successfully!');
    };
    const handleViewBill = (bill: Bill) => {
        setActiveBill(bill);
        setView('new_order');
    };
    const handleNewOrder = () => {
        setActiveBill(null);
        setView('new_order');
    };

    // Product Management
    const handleAddProduct = (product: Omit<Product, 'id' | 'icon'>) => {
        const newProduct: Product = { ...product, id: `prod-${Date.now()}`, icon: <PaneerIcon /> }; // Default icon
        setProducts(prev => [...prev, newProduct]);
    };
    const handleUpdateProduct = (updatedProduct: Product) => {
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };
    const handleDeleteProduct = (productId: string) => {
        setProducts(products.filter(p => p.id !== productId));
    };

    // Customer Management
    const handleAddCustomer = (customer: Omit<Customer, 'id'>) => {
        const newCustomer: Customer = { ...customer, id: `cust-${Date.now()}` };
        setCustomers(prev => [...prev, newCustomer]);
    };
    const handleUpdateCustomer = (updatedCustomer: Customer) => {
        setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    };
    const handleDeleteCustomer = (customerId: string) => {
        setCustomers(customers.filter(c => c.id !== customerId));
    };


    const mainContent = useMemo(() => {
        switch (view) {
            case 'new_order':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        <NewOrder products={products} customers={customers} onBillGenerated={handleBillGenerated} />
                        <BillDetails bill={activeBill} onNewOrder={handleNewOrder} onUpdateBill={handleUpdateBill} />
                    </div>
                );
            case 'order_history':
                return <OrderHistory bills={bills} onViewBill={handleViewBill} />;
            case 'manage_products':
                return <ManageProducts
                    products={products}
                    onAddProduct={handleAddProduct}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                />;
            case 'manage_customers':
                return <ManageCustomers
                    customers={customers}
                    products={products}
                    onAddCustomer={handleAddCustomer}
                    onUpdateCustomer={handleUpdateCustomer}
                    onDeleteCustomer={handleDeleteCustomer}
                />;
            default:
                return null;
        }
    }, [view, products, customers, bills, activeBill]);

    const NavButton: React.FC<{
        onClick: () => void;
        isActive: boolean;
        children: React.ReactNode;
      }> = ({ onClick, isActive, children }) => (
        <button
          onClick={onClick}
          className={`font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            isActive
              ? 'bg-brand-blue text-white'
              : 'text-brand-gray-500 hover:bg-brand-gray-200'
          }`}
        >
          {children}
        </button>
      );

    return (
        <div className="bg-brand-gray-100 min-h-screen font-sans text-brand-gray-600">
            <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <header className="flex justify-between items-center mb-6 md:mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-xl shadow-sm">
                            <CowIcon />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-brand-gray-600">DairyFlow</h1>
                            <p className="text-sm text-brand-gray-400">Billing Management</p>
                        </div>
                    </div>
                </header>
                
                <nav className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-2 mb-6 md:mb-8 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                    <NavButton onClick={() => setView('new_order')} isActive={view === 'new_order'}>New Order</NavButton>
                    <NavButton onClick={() => setView('order_history')} isActive={view === 'order_history'}><HistoryIcon/> History</NavButton>
                    <NavButton onClick={() => setView('manage_products')} isActive={view === 'manage_products'}><PaneerIcon/> Products</NavButton>
                    <NavButton onClick={() => setView('manage_customers')} isActive={view === 'manage_customers'}><UserIcon/> Customers</NavButton>
                </nav>

                <main>
                    {mainContent}
                </main>
            </div>
        </div>
    );
};

export default App;