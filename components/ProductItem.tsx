import React from 'react';
import type { Product } from '../types';

interface ProductItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
  price: number;
}

const QuantityButton: React.FC<{ onClick: () => void, children: React.ReactNode, disabled?: boolean }> = ({ onClick, children, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="h-8 w-8 flex items-center justify-center bg-brand-gray-200 text-brand-gray-500 rounded-lg hover:bg-brand-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-hidden="true"
    >
        {children}
    </button>
);


const ProductItem: React.FC<ProductItemProps> = ({ product, quantity, onQuantityChange, price }) => {
  const handleIncrement = () => onQuantityChange(product.id, quantity + 1);
  const handleDecrement = () => onQuantityChange(product.id, quantity - 1);
  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
        onQuantityChange(product.id, newQuantity);
    } else if (e.target.value === '') {
        onQuantityChange(product.id, 0);
    }
  };


  return (
    <div className="flex items-center justify-between bg-brand-gray-100 rounded-xl p-3">
      <div className="flex items-center gap-4">
        <div className="bg-white rounded-lg p-2 w-12 h-12 flex items-center justify-center">
            {product.icon}
        </div>
        <div>
          <p className="font-semibold text-brand-gray-600">{product.name}</p>
          <p className="text-sm text-brand-gray-400">{product.variant} (₹{price.toFixed(2)})</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {quantity > 0 ? (
          <>
            <QuantityButton onClick={handleDecrement}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
            </QuantityButton>
            <label htmlFor={`quantity-${product.id}`} className="sr-only">Quantity for {product.name}</label>
            <input
                id={`quantity-${product.id}`}
                type="number"
                value={quantity}
                onChange={handleQuantityInput}
                className="font-bold text-lg text-brand-gray-600 w-12 text-center bg-transparent border-none focus:outline-none focus:ring-0"
                aria-label={`Quantity for ${product.name}`}
            />
            <QuantityButton onClick={handleIncrement}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </QuantityButton>
            <span className="font-semibold text-brand-gray-600 w-[70px] text-right">₹{(price * quantity).toFixed(2)}</span>
          </>
        ) : (
          <button onClick={handleIncrement} className="bg-brand-gray-200 text-brand-gray-500 font-bold py-2 px-4 rounded-lg hover:bg-brand-gray-300 transition-colors">
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
