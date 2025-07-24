import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showFooter = true }) => {
  return (
    <div className="min-h-screen bg-background text-slate-100 light:text-gray-900">
      <Header />
      <main className="pt-20">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;