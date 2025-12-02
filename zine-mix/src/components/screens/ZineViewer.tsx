import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, VolumeX, Volume2, X } from 'lucide-react';
import { ZinePreview } from '../ui/ZinePreview';
import { PageData, CoverData } from '../../types';
import { useAudio } from '../../hooks/useAudio';

interface ZineViewerProps {
  coverData: CoverData;
  pageCustomizations: Record<number, PageData>;
  onClose: () => void;
}

export const ZineViewer: React.FC<ZineViewerProps> = ({
  coverData,
  pageCustomizations,
  onClose
}) => {
  const [currentPage, setCurrentPage] = useState(0); 
  const [isMuted, setIsMuted] = useState(false);
  const { playPreview, stopPreview } = useAudio();

  const maxPages = 6;

  // Auto-play preview when page changes
  useEffect(() => {
    if (!isMuted && currentPage > 0) {
      const pageData = pageCustomizations[currentPage];
      if (pageData?.selectedTrack?.preview) {
  setTimeout(() => {
    if (pageData.selectedTrack) {
      playPreview(pageData.selectedTrack);
    }
  }, 500);
}
    }
    
    return () => stopPreview();
  }, [currentPage, isMuted]);

  const goToPage = (page: number) => {
    stopPreview();
    setCurrentPage(Math.max(0, Math.min(maxPages +1, page)));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="flex items-center justify-center min-h-screen p-8">
          {/* Previous Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 rounded-full p-3 text-white mr-8"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Page Display */}
          <div className="text-center">
            <div className="mb-4 text-white text-lg font-medium">
              {currentPage === 0 ? 'Cover' : 
              currentPage === maxPages + 1 ? 'Back Cover' :
              `Page ${currentPage}`}
            </div>
            
            {currentPage === 0 ? (
            <div 
              className="border-2 border-white relative overflow-hidden shadow-2xl"
              style={{ 
                backgroundColor: coverData.selectedColor.startsWith('/') || coverData.selectedColor.startsWith('data:') ? 'transparent' : coverData.selectedColor,
                backgroundImage: (coverData.selectedColor.startsWith('/') || coverData.selectedColor.startsWith('data:')) ? `url(${coverData.selectedColor})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: 275,
                height: 400
              }}
            >
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: 'rotate(-90deg)' }}
                >
                <div 
                  className="absolute flex items-center justify-center"
                  style={{ 
                    left: '30px',        
                    top: '30%',
                    transform: 'translateY(-50%) ',
                    width: '200px'
                  }}
                >
                  <div className="text-2xl font-bold text-center">  {/* REMOVE transform and writingMode */}
                    {coverData.title || 'Untitled Zine'}
                  </div>
                  </div>
                </div>
              </div>
            ) : currentPage === maxPages + 1 ? (
            //  BACK COVER
            <div className="shadow-2xl">
              <div 
                className="border-2 border-white relative overflow-hidden"
                style={{ 
                  backgroundColor: (coverData.backColor || '#ffffff').startsWith('/') || (coverData.backColor || '#ffffff').startsWith('data:') ? 'transparent' : (coverData.backColor || '#ffffff'),
                  backgroundImage: ((coverData.backColor || '#ffffff').startsWith('/') || (coverData.backColor || '#ffffff').startsWith('data:')) ? `url(${coverData.backColor})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: 275,
                  height: 400
                }}
              >
                {/* Back cover decorations */}
                {(coverData.backDecorations || []).map((element) => (
                  <div
                    key={element.id}
                    className="absolute text-3xl select-none"
                    style={{ 
                      left: element.x, 
                      top: element.y, 
                      fontSize: `${element.size || 24}px` 
                    }}
                  >
                    {element.symbol || '♥'}
                  </div>
                ))}
              </div>
            </div>
          ): (
              // Page
              <div className="shadow-2xl">
                <ZinePreview 
                  pageData={pageCustomizations[currentPage]} 
                  updatePageData={() => {}} 
                />
              </div>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === maxPages+1}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 rounded-full p-3 text-white ml-8"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Audio Control */}
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (!isMuted) stopPreview();
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 text-white"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Page Indicator */}
        <div className="absolute bottom-8 right-8 text-white text-sm">
          {currentPage} / {maxPages + 2}
        </div>
      </div>
    </div>
  );
};