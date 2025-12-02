// components/screens/PageEditor.tsx (UPDATED VERSION)
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Music, Star, Sparkles } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Save } from 'lucide-react';
import { Header } from '../layout/Header';
import { ZinePreview } from '../ui/ZinePreview';
import { DeezerSearch } from '../ui/deezerSearch';
import { PageEditorProps } from '../../types';
import { BACKGROUND_COLORS, TEXT_POSITIONS, FONTS } from '../../utils/constants';
import { DECORATIVE_ELEMENTS, ELEMENT_CATEGORIES, DecorativeElement } from '../../utils/decorativeElements';
import { PageData, CoverData } from '../../types';
import { ZinePreviewLayout } from '../ui/ZinePreviewLayout';
import { BookOpen } from 'lucide-react';
import { ZineViewer } from '../screens/ZineViewer';

export const PageEditor: React.FC<PageEditorProps & { 
  allPageData?: Record<number, PageData>; 
  coverData?: CoverData; 
}> = ({ 
  currentPage, maxPages, pageData, updatePageData, onNavigate, onHome, onSave, allPageData, coverData 
}) => {
  const [selectedElementCategory, setSelectedElementCategory] = useState<string>('hearts');
  const [showPreview, setShowPreview] = useState(false);
  const [showZineViewer, setShowZineViewer] = useState(false);
  const addDecorativeElement = (element: DecorativeElement) => {
    const newElement = {
      x: 120,
      y: 180,
      id: Math.random().toString(36).substr(2, 9),
      symbol: element.symbol,
      elementId: element.id
    };
    
    updatePageData({
      hearts: [...pageData.hearts, newElement] // Still using 'hearts' array but storing different elements
    });
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'hearts': return <Heart size={16} />;
      case 'music': return <Music size={16} />;
      case 'shapes': return <Star size={16} />;
      case 'nature': return <Sparkles size={16} />;
      case 'misc': return <Sparkles size={16} />;
      default: return <Heart size={16} />;
    }
  };

  const filteredElements = DECORATIVE_ELEMENTS.filter(
    element => element.category === selectedElementCategory
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onHome={onHome} />

      <div className="p-8">
        <div className="flex justify-center gap-8">
          {/* Preview */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Page {currentPage}</h2>
            <ZinePreview pageData={pageData} updatePageData={updatePageData} />
          </div>

          {/* Controls */}
          <div className="w-96 space-y-6 max-h-screen overflow-y-auto">
            {/* Background */}
            <div>
              <h3 className="font-semibold mb-2">Choose Background Color</h3>
              <div className="grid grid-cols-4 gap-2">
                {BACKGROUND_COLORS.map((color) => (
                <div
                  key={color}
                  className={`w-16 h-16 cursor-pointer border-2 transition-all ${
                    pageData.background === color ? 'border-yellow-500 ring-2 ring-yellow-200' : 'border-black hover:border-gray-500'
                  }`}
                  style={{ 
                    backgroundColor: color.startsWith('/') ? 'transparent' : color,
                    backgroundImage: color.startsWith('/') ? `url(${color})` : 'none',
                    backgroundSize: 'cover'
                  }}
                  onClick={() => updatePageData({ background: color })}
                  title={`Background: ${color}`}
                />
              ))}
              </div>
            </div>

            {/* Image Upload */}
              <div className="mt-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const result = event.target?.result as string;
                      updatePageData({ background: result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                  className="w-full text-xs"
                />
                <p className="text-xs text-gray-600 mt-1">Upload custom background image</p>
              </div>

            {/* Position */}
            <div>
              <h3 className="font-semibold mb-2">Choose Song Position</h3>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={pageData.position}
                onChange={(e) => updatePageData({ position: e.target.value as any })}
              >
                {TEXT_POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              <p className="text-xs text-gray-600 mt-1">
                Text positioning will adjust automatically based on song placement
              </p>
            </div>

            {/* Font */}
            <div>
              <h3 className="font-semibold mb-2">Choose Font</h3>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={pageData.font}
                onChange={(e) => updatePageData({ font: e.target.value })}
              >
                {FONTS.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-600 mt-1">
                Font applies to both song title and your text
              </p>
            </div>

            {/* Song Search */}
            <div>
              <h3 className="font-semibold mb-2">Choose Your Song</h3>
              <DeezerSearch
                onTrackSelect={(track) => updatePageData({ 
                  selectedTrack: track, 
                  songTitle: track.getDisplayName() 
                })}
                selectedTrack={pageData.selectedTrack}
              />
            </div>

            {/* Enhanced Decorations */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles size={16} />
                Decorative Elements
              </h3>
              
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-1 mb-3">
                {ELEMENT_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedElementCategory(category.id)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors flex items-center gap-1 ${
                      selectedElementCategory === category.id
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {getCategoryIcon(category.id)}
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Element Grid */}
              <div className="grid grid-cols-6 gap-2 mb-3 p-3 border border-gray-200 rounded-lg bg-gray-50 max-h-32 overflow-y-auto">
                {filteredElements.map((element) => (
                  <button
                    key={element.id}
                    onClick={() => addDecorativeElement(element)}
                    className="w-10 h-10 text-2xl hover:bg-white hover:scale-110 transition-all rounded border border-transparent hover:border-gray-300 flex items-center justify-center"
                    title={`Add ${element.name}`}
                    style={{ color: element.color }}
                  >
                    {element.symbol}
                  </button>
                ))}

                
              </div>

              <p className="text-xs text-gray-600">
                Click elements above to add • Drag to move • Double-click to remove
              </p>
              {pageData.hearts.length > 0 && (
                <p className="text-xs text-blue-600 mt-1">
                  {pageData.hearts.length} element{pageData.hearts.length !== 1 ? 's' : ''} added
                </p>
              )}
            </div>

            {/* Text Info */}
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <h4 className="font-medium text-sm mb-1">Text Guidelines:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Center position: 50 characters max per text area</li>
                <li>• Other positions: 100 characters max</li>
                <li>• Text wraps automatically within the preview</li>
                <li>• Font changes apply to all text on the page</li>
                <li>• Song title appears below the album cover</li>
              </ul>
            </div>

            {/* Performance Info */}
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <h4 className="font-medium text-sm mb-1">🎵 Music Search Tips:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Search works with artist name, song title, or album</li>
                <li>• Results include mock data for demo purposes</li>
                <li>• 30-second previews available for selected tracks</li>
                <li>• Album covers are automatically loaded</li>
              </ul>
            </div>

            {/* Preview Button */}
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
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
              onClick={() => onSave && onSave()}
              
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Save size={16} />
              Save Zine
            </button>
              <button
                onClick={() => onNavigate('prev')}
                className="flex-1 bg-gray-500 text-white py-3 px-4 rounded hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <ChevronLeft size={16} />
                {currentPage === 1 ? 'Back to Cover' : 'Previous Page'}
              </button>
              <button
                onClick={() => onNavigate('next')}
                className="flex-1 bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                {currentPage === maxPages ? 'Save Zine' : 'Next Page'}
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Preview Modal */}
            {showPreview && allPageData && coverData && (
              <ZinePreviewLayout
                coverData={coverData}
                pageCustomizations={allPageData}
                onClose={() => setShowPreview(false)}
              />
            )}

            {/* Zine Viewer Modal */}
            {showZineViewer && allPageData && coverData && (
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