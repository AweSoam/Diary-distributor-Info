import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-gray-500">
        {children}
    </svg>
);

export const MilkIcon: React.FC = () => (
    <IconWrapper>
        <path d="M8 8v8a4 4 0 108 0V8H8zm0-4h8v2H8V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12h2.5a1.5 1.5 0 010 3H12v-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </IconWrapper>
);

export const YogurtIcon: React.FC = () => (
    <IconWrapper>
        <path d="M7 10h10v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8zM7 10V8a2 2 0 012-2h6a2 2 0 012 2v2M7 10l1.5-6h7L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </IconWrapper>
);

export const PaneerIcon: React.FC = () => (
    <IconWrapper size={20}>
        <path d="M5 8l6-3 6 3v8l-6 3-6-3V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 8l6 3v8M11 5v11M17 8l-6 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </IconWrapper>
);

export const GheeIcon: React.FC = () => (
    <IconWrapper>
        <path d="M12 10v10M8 20V10a4 4 0 118 0v10M8 20h8M8 8V6a4 4 0 118 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </IconWrapper>
);