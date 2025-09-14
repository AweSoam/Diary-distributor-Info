import React, { useState } from 'react';
import type { Product } from '../types';
import { EditIcon, DeleteIcon, PlusIcon, SaveIcon, CancelIcon } from './icons/ActionIcons';
import { PaneerIcon } from './icons/ProductIcons';

interface ManageProductsProps {
    products: Product[];
    onAddProduct: (product: Omit<Product, 'id' | 'icon'>) => void;
    onUpdateProduct: (product: Product) => void;
    onDeleteProduct: (productId: string) => void;
}

// FIX: Extracted form to a separate component to resolve missing key warnings and improve structure.
const ProductForm: React.FC<{
    data: { name: string; variant: string; price: number };
    setData: (data: any) => void;
    onSave: () => void;
    onCancel: () => void;
}> = ({ data, setData, onSave, onCancel }) => (
     <div className="flex items-center justify-between bg-brand-gray-100 rounded-xl p-3">
        <div className="flex items-center gap-4 flex-grow">
             <div className="bg-white rounded-lg p-2 w-12 h-12 flex items-center justify-center">
                <PaneerIcon />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-grow">
                 <input type="text" placeholder="Product Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="form-input" />
                 <input type="text" placeholder="Variant (e.g., 500g)" value={data.variant} onChange={(e) => setData({ ...data, variant: e.target.value })} className="form-input" />
                 <input type="number" placeholder="Price" value={data.price || ''} onChange={(e) => setData({ ...data, price: parseFloat(e.target.value) || 0 })} className="form-input" />
             </div>
        </div>
         <div className="flex items-center gap-2 ml-4">
             <button onClick={onSave} className="text-green-500 hover:text-green-700"><SaveIcon /></button>
             <button onClick={onCancel} className="text-red-500 hover:text-red-700"><CancelIcon /></button>
         </div>
    </div>
);


const ManageProducts: React.FC<ManageProductsProps> = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [newProductData, setNewProductData] = useState({ name: '', variant: '', price: 0 });

    const handleAddClick = () => {
        setIsAdding(true);
        setEditingProduct(null);
        setNewProductData({ name: '', variant: '', price: 0 });
    };

    const handleEditClick = (product: Product) => {
        setEditingProduct({ ...product });
        setIsAdding(false);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingProduct(null);
    };

    const handleSaveAdd = () => {
        if (!newProductData.name || !newProductData.variant || newProductData.price <= 0) {
            alert('Please fill all fields correctly.');
            return;
        }
        onAddProduct(newProductData);
        handleCancel();
    };

    const handleSaveUpdate = () => {
        if (!editingProduct) return;
        if (!editingProduct.name || !editingProduct.variant || editingProduct.price <= 0) {
            alert('Please fill all fields correctly.');
            return;
        }
        onUpdateProduct(editingProduct);
        handleCancel();
    };
    
    return (
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 w-full">
            <style>{`.form-input { background-color: white; border: 1px solid #E8ECF3; border-radius: 0.5rem; padding: 0.5rem 0.75rem; width: 100%; }`}</style>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-brand-gray-600">Manage Products</h2>
                {!isAdding && !editingProduct && (
                    <button onClick={handleAddClick} className="flex items-center gap-2 bg-brand-blue text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors shadow-md shadow-brand-blue/30">
                        <PlusIcon />
                        <span>Add Product</span>
                    </button>
                )}
            </div>
            <div className="space-y-3">
                {isAdding && <ProductForm data={newProductData} setData={setNewProductData} onSave={handleSaveAdd} onCancel={handleCancel} />}

                {products.map(product => (
                    editingProduct?.id === product.id 
                    ? <ProductForm key={product.id} data={editingProduct} setData={setEditingProduct} onSave={handleSaveUpdate} onCancel={handleCancel} />
                    : (
                        <div key={product.id} className="flex items-center justify-between bg-brand-gray-100 rounded-xl p-3">
                            <div className="flex items-center gap-4">
                                <div className="bg-white rounded-lg p-2 w-12 h-12 flex items-center justify-center">
                                    {product.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-gray-600">{product.name}</p>
                                    <p className="text-sm text-brand-gray-400">{product.variant}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-semibold text-brand-gray-600">₹{product.price.toFixed(2)}</span>
                                <button onClick={() => handleEditClick(product)} className="text-brand-gray-400 hover:text-brand-blue transition-colors">
                                    <EditIcon />
                                </button>
                                <button onClick={() => onDeleteProduct(product.id)} className="text-brand-gray-400 hover:text-red-500 transition-colors">
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

export default ManageProducts;