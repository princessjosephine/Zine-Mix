// components/screens/CoverChooser.tsx
import React, { useState } from 'react'; // ADD useState import
import { Header } from '../layout/Header';
import { CoverData, PageData } from '../../types'; // ADD PageData import
import { COVER_COLORS, CHAR_LIMITS } from '../../utils/constants';
import { Eye, Save, BookOpen } from 'lucide-react';
import { ZinePreviewLayout } from '../ui/ZinePreviewLayout';
import { ZineViewer } from '../screens/ZineViewer';

interface CoverChooserProps {
  onNext: () => void;
  onHome: () => void;
  coverData: CoverData;
  setCoverData: (data: CoverData) => void;
  allPageData?: Record<number, PageData>;
  onSave?: () => string;
  showBorder?: boolean;
}

export const CoverChooser: React.FC<CoverChooserProps> = ({ 
  onNext, onHome, coverData, setCoverData, allPageData, onSave, showBorder = false// ADD missing props
}) => {

  const [showPreview, setShowPreview] = useState(false);
  const [showZineViewer, setShowZineViewer] = useState(false);
  
  const handleColorSelect = (color: string) => {
    setCoverData({ ...coverData, selectedColor: color });
  };

  const handleTitleChange = (title: string) => {
    if (title.length <= CHAR_LIMITS.COVER_TITLE) {
      setCoverData({ ...coverData, title });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onHome={onHome} />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Choose a Cover!</h1>
        
        <div className="flex justify-center gap-12">
          {/* Preview */}
          <div className="flex flex-col items-center">
            <div 
              className={showBorder ? "border-2 border-black relative overflow-hidden" : ""}
              style={{ 
                backgroundColor: coverData.selectedColor.startsWith('/') || coverData.selectedColor.startsWith('data:') ? 'transparent' : coverData.selectedColor,
                backgroundImage: (coverData.selectedColor.startsWith('/') || coverData.selectedColor.startsWith('data:')) ? `url(${coverData.selectedColor})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '275px',
                height: '425px'
              }}
            >
              {/* FIXED: Text input positioning */}
              <div 
                className="absolute flex items-center justify-center"
                style={{ 
                  left: '57px',
                  top: '70px',           // Changed from '50%'
                  bottom: '10px',        // NEW: This makes it span full height
                  width: '60px',         // Increased width for better text area
                  transform: 'rotate(-90deg)'  // Moved rotation to container
                }}
              >
                <input
                  type="text"
                  placeholder="Enter title here :)"
                  className="bg-transparent text-2xl font-bold text-center border-none outline-none"
                  style={{ 
                    width: '440px',      // Increased to match new height (460px - 20px padding)
                    height: '40px',      // Added explicit height
                    writingMode: 'horizontal-tb',  // Changed from vertical-rl
                    textOrientation: 'mixed'
                  }}
                  value={coverData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Color Options */}
          <div className="grid grid-cols-4 gap-3 max-h-96 overflow-y-auto p-4 border border-gray-300 rounded-lg">
            {/* Colors */}
            {COVER_COLORS.map((color) => (
              <div
                key={color}
                className={`w-20 h-20 cursor-pointer border-2 ${
                  coverData.selectedColor === color ? 'border-yellow-500 border-4' : 'border-black'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
            
            {/* Cassette Images */}
            {[1,2,3,4,5,6,7,8].map((num) => (
              <div
                key={`cassette-${num}`}
                className={`w-20 h-20 cursor-pointer border-2 bg-cover bg-center ${
                  coverData.selectedColor === `/cassettes/${num}.png` ? 'border-yellow-500 border-4' : 'border-black'
                }`}
                style={{ backgroundImage: `url(/cassettes/${num}.png)` }}
                onClick={() => handleColorSelect(`/cassettes/${num}.png`)}
              />
            ))}
          </div>
        </div>

        {/* Preview Buttons */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setShowPreview(true)}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors flex items-center gap-2"
              disabled={!allPageData} // Disable if no page data
            >
              <Eye size={16} />
              Print Preview
            </button>

            <button
              onClick={() => setShowZineViewer(true)}
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-colors flex items-center gap-2"
              disabled={!allPageData} // Disable if no page data
            >
              <BookOpen size={16} />
              View Zine
            </button>

            <button
              onClick={() => onSave && onSave()}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors flex items-center gap-2"
              disabled={!onSave} // Disable if no save function
            >
              <Save size={16} />
              Save Zine
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onNext}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors"
          >
            Go to Page 1
          </button>
        </div>

        {/* Preview Modals:  THESE WERE MISSING */}
        {showPreview && allPageData && (
          <ZinePreviewLayout
            coverData={coverData}
            pageCustomizations={allPageData}
            onClose={() => setShowPreview(false)}
          />
        )}

        {showZineViewer && allPageData && (
          <ZineViewer
            coverData={coverData}
            pageCustomizations={allPageData}
            onClose={() => setShowZineViewer(false)}
          />
        )}
      </div>
    </div>
  );
};