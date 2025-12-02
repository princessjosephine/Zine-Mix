// components/ui/Navigation.tsx
import React from 'react';
import { ChevronLeft, ChevronRight, Save, Home } from 'lucide-react';

interface NavigationProps {
  currentPage: number;
  maxPages: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  onHome?: () => void;
  showHomeButton?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  maxPages, 
  onNavigate, 
  onHome,
  showHomeButton = false
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === maxPages;

  const handlePrevious = () => {
    onNavigate('prev');
  };

  const handleNext = () => {
    onNavigate('next');
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page indicator */}
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          {Array.from({ length: maxPages }, (_, i) => i + 1).map((page) => (
            <div
              key={page}
              className={`w-3 h-3 rounded-full border-2 transition-colors ${
                page === currentPage
                  ? 'bg-blue-500 border-blue-500'
                  : page < currentPage
                  ? 'bg-green-500 border-green-500'
                  : 'bg-gray-200 border-gray-300'
              }`}
              title={`Page ${page}${page === currentPage ? ' (current)' : page < currentPage ? ' (completed)' : ''}`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Page {currentPage} of {maxPages}
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        {showHomeButton && onHome && (
          <button
            onClick={onHome}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            <Home size={16} />
            Home
          </button>
        )}
        
        <button
          onClick={handlePrevious}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors font-medium"
        >
          <ChevronLeft size={16} />
          {isFirstPage ? 'Back to Cover' : 'Previous'}
        </button>
        
        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium"
        >
          {isLastPage ? (
            <>
              <Save size={16} />
              Save Zine
            </>
          ) : (
            <>
              Next
              <ChevronRight size={16} />
            </>
          )}
        </button>
      </div>

      {/* Progress text */}
      <div className="text-center text-xs text-gray-500">
        {isLastPage ? (
          <span className="text-green-600 font-medium">Ready to save your zine!</span>
        ) : (
          <span>
            {maxPages - currentPage} page{maxPages - currentPage !== 1 ? 's' : ''} remaining
          </span>
        )}
      </div>
    </div>
  );
};