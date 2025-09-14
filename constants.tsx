import React from 'react';
import type { Product, Customer, Bill } from './types';
import { MilkIcon, YogurtIcon, PaneerIcon, GheeIcon } from './components/icons/ProductIcons';

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'milk-1', name: 'Milk', variant: '1L Pouch', price: 50, icon: <MilkIcon /> },
  { id: 'yogurt-1', name: 'Yogurt', variant: '500g Cup', price: 35, icon: <YogurtIcon /> },
  { id: 'paneer-1', name: 'Paneer', variant: '200g Block', price: 80, icon: <PaneerIcon /> },
  { id: 'ghee-1', name: 'Ghee', variant: '500ml Jar', price: 250, icon: <GheeIcon /> },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'cust-1', name: 'Regular Customer' },
  { id: 'cust-2', name: 'Wholesale Buyer', priceOverrides: { 'milk-1': 48, 'paneer-1': 75 } },
  { id: 'cust-3', name: 'Cafe Corner' },
];

export const INITIAL_BILLS: Bill[] = [
    {
        id: `bill-${Date.now() - 100000}`,
        customer: INITIAL_CUSTOMERS[1],
        items: [
            { product: INITIAL_PRODUCTS[0], quantity: 10, price: 48 },
            { product: INITIAL_PRODUCTS[2], quantity: 5, price: 75 },
        ],
        total: 855,
        date: new Date(Date.now() - 86400000), // Yesterday
        paidAmount: 855,
    },
    {
        id: `bill-${Date.now() - 200000}`,
        customer: INITIAL_CUSTOMERS[2],
        items: [
            { product: INITIAL_PRODUCTS[1], quantity: 20, price: 35 },
        ],
        total: 700,
        date: new Date(Date.now() - 172800000), // Two days ago
        paidAmount: 500,
    }
];