// components/LayoutWithNavbar.tsx
import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';

interface LayoutWithNavbarProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutWithNavbarProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="p-4">
                {children}
            </div>
        </>
    );
};

export default Layout;
