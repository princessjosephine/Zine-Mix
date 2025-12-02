// components/screens/BackCoverChooser.tsx
import React, { useState } from 'react';
import { Eye, Save, BookOpen } from 'lucide-react';
import { Header } from '../layout/Header';
import { CoverData, PageData } from '../../types';
import { COVER_COLORS } from '../../utils/constants';
import { DECORATIVE_ELEMENTS, ELEMENT_CATEGORIES } from '../../utils/decorativeElements';
import { ZinePreviewLayout } from '../ui/ZinePreviewLayout';
import { ZineViewer } from '../screens/ZineViewer';

interface BackCoverChooserProps {
  onNext: () => void;
  onHome: () => void;
  onPrevious: () => void;
  coverData: CoverData;
  setCoverData: (data: CoverData) => void;
  allPageData?: Record<number, PageData>;
  onSave?: () => string;
  showBorder?: boolean;
}

export const BackCoverChooser: React.FC<BackCoverChooserProps> = ({ 
  onNext, onHome, onPrevious, coverData, setCoverData, allPageData, onSave, showBorder = false
}) => {
  const [selectedElementCategory, setSelectedElementCategory] = useState<string>('hearts');
  const [showPreview, setShowPreview] = useState(false);
  const [showZineViewer, setShowZineViewer] = useState(false);

  const handleColorSelect = (color: string) => {
    setCoverData({ ...coverData, backColor: color });
  };

  const addDecoration = (element: any) => {
    const newElement = {
      x: 120,
      y: 180,
      id: Math.random().toString(36).substr(2, 9),
      symbol: element.symbol,
      elementId: element.id
    };
    
    setCoverData({
      ...coverData,
      backDecorations: [...(coverData.backDecorations || []), newElement]
    });
  };

  const filteredElements = DECORATIVE_ELEMENTS.filter(
    element => element.category === selectedElementCategory
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onHome={onHome} />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Choose Back Cover!</h1>
        
        <div className="flex justify-center gap-12">
          {/* backcover*/}
          <div className="flex flex-col items-center">
            <div 
              className={showBorder ? "border-2 border-black relative overflow-hidden" : ""}
              style={{ 
                backgroundColor: (coverData.backColor || '#ffffff').startsWith('/') || (coverData.backColor || '#ffffff').startsWith('data:') ? 'transparent' : (coverData.backColor || '#ffffff'),
                backgroundImage: ((coverData.backColor || '#ffffff').startsWith('/') || (coverData.backColor || '#ffffff').startsWith('data:')) ? `url(${coverData.backColor})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '275px',
                height: '425px'
              }}
            >
              {/* NO TITLE INPUT: Just decorations */}
              {(coverData.backDecorations || []).map((element) => (
                <div
                  key={element.id}
                  className="absolute text-3xl cursor-move select-none"
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

          {/* Controls */}
          <div className="w-96 space-y-6">
            {/* Color Options */}
            <div className="grid grid-cols-4 gap-3 max-h-96 overflow-y-auto p-4 border border-gray-300 rounded-lg">
              {COVER_COLORS.map((color) => (
                <div
                  key={color}
                  className={`w-20 h-20 cursor-pointer border-2 ${
                    (coverData.backColor || '#ffffff') === color ? 'border-yellow-500 border-4' : 'border-black'
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
                    (coverData.backColor || '#ffffff') === `/cassettes/${num}.png` ? 'border-yellow-500 border-4' : 'border-black'
                  }`}
                  style={{ backgroundImage: `url(/cassettes/${num}.png)` }}
                  onClick={() => handleColorSelect(`/cassettes/${num}.png`)}
                />
              ))}
            </div>

            {/* Decorations*/}
            <div>
              <h3 className="font-semibold mb-2">Decorative Elements</h3>
              
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-1 mb-3">
                {ELEMENT_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedElementCategory(category.id)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                      selectedElementCategory === category.id
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Element Grid */}
              <div className="grid grid-cols-6 gap-2 mb-3 p-3 border border-gray-200 rounded-lg bg-gray-50 max-h-32 overflow-y-auto">
                {filteredElements.map((element) => (
                  <button
                    key={element.id}
                    onClick={() => addDecoration(element)}
                    className="w-10 h-10 text-2xl hover:bg-white hover:scale-110 transition-all rounded border border-transparent hover:border-gray-300 flex items-center justify-center"
                    style={{ color: element.color }}
                  >
                    {element.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Buttons */}
            <button
              onClick={() => setShowPreview(true)}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
            >
              <Eye size={16} />
              Print Preview
            </button>

            <button
              onClick={() => setShowZineViewer(true)}
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
            >
              <BookOpen size={16} />
              View Zine
            </button>

            {/* Navigation */}
            <div className="flex gap-4">
              <button
                onClick={() => onSave && onSave()}
                className="flex-1 bg-green-500 text-white py-3 px-4 rounded hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Save Zine
              </button>
              <button
                onClick={onPrevious}
                className="flex-1 bg-gray-500 text-white py-3 px-4 rounded hover:bg-gray-600 transition-colors"
              >
                Back to Page 6
              </button>
              <button
                onClick={onNext}
                className="flex-1 bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Finish Zine
              </button>
            </div>

            {/* Preview Modals */}
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
      </div>
    </div>
  );
};