// components/layout/Layout.tsx
import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  onHome?: () => void;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showHeader = true, 
  onHome,
  title = "Zine Mix"
}) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="min-h-screen bg-gray-100">
      {showHeader && onHome && <Header onHome={onHome} />}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};