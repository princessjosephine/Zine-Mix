// components/layout/Header.tsx
import React from 'react';
import { Home } from 'lucide-react';

interface HeaderProps {
  onHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHome }) => {
  return (
    <div className="bg-gray-300 border-b border-black p-4 flex justify-end">
      <button
        onClick={onHome}
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors flex items-center gap-2"
      >
        <Home size={16} />
        Home
      </button>
    </div>
  );
};