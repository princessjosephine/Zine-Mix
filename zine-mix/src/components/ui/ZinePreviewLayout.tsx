import React from 'react';
import { X } from 'lucide-react';
import { PageData, CoverData } from '../../types';
import { ZinePreview } from './ZinePreview';

interface ZinePreviewLayoutProps {
  coverData: CoverData;
  pageCustomizations: Record<number, PageData>;
  onClose: () => void;
}

export const ZinePreviewLayout: React.FC<ZinePreviewLayoutProps> = ({
  coverData,
  pageCustomizations,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-4 no-print">
        <h2 className="text-xl font-bold">Print Preview - A4 Format</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
          <X size={20} />
        </button>
      </div>

      {/* A4 Landscape Page Container */}
      <div className="flex justify-center items-start pt-8 pb-8">
        <div className="print-container mx-auto bg-white shadow-lg flex flex-col"
          style={{
            width: '297mm',
            height: '210mm',
            padding: '0mm',
            transform: 'scale(0.75) translate(-55px, 110px)',  // My current scale
            transformOrigin: 'top center',
            margin: 'auto',

          }}>

          {/* Top Row */}
          <div className="flex flex-1">
            <div className="transform rotate-180 flex-1 flex items-center justify-center">
              <div className="transform scale-[1] origin-center">
                <ZinePreview pageData={pageCustomizations[4]} updatePageData={() => { }} />
              </div>
            </div>
            <div className="transform rotate-180 flex-1 flex items-center justify-center">
              <div className="transform scale-[1] origin-center">
                <ZinePreview pageData={pageCustomizations[3]} updatePageData={() => { }} />
              </div>
            </div>
            <div className="transform rotate-180 flex-1 flex items-center justify-center">
              <div className="transform scale-[1] origin-center">
                <ZinePreview pageData={pageCustomizations[2]} updatePageData={() => { }} />
              </div>
            </div>
            <div className="transform rotate-180 flex-1 flex items-center justify-center">
              <div className="transform scale-[1] origin-center">
                <ZinePreview pageData={pageCustomizations[1]} updatePageData={() => { }} />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-1">
            {/* Bottom Row */}
            <div className="flex flex-1">
              <div className="flex-1 flex items-center justify-center">
                <div className="transform scale-[1] origin-center">
                  <ZinePreview pageData={pageCustomizations[5]} updatePageData={() => { }} />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="transform scale-[1] origin-center">
                  <ZinePreview pageData={pageCustomizations[6]} updatePageData={() => { }} />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="transform scale-[1] origin-center">
                  {/* Back Cover */}
                  <div
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
                    <div
                      className="absolute flex items-center justify-center"
                      style={{
                        left: '20px',
                        top: '50%',
                        transform: 'translateY(-50%) rotate(-90deg)',
                        width: '200px'
                      }}
                    >
                      <div className="text-xl font-bold text-center">
                        {coverData.backTitle || ''}
                      </div>
                    </div>
                    {/* Back Cover Decorations */}
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
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="transform scale-[1] origin-center">
                  {/* Front Cover */}
                  <div
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
                      className="absolute flex items-center justify-center"
                      style={{
                        left: '-50px',
                        top: '50%',
                        transform: 'translateY(-50%) rotate(-90deg)',
                        width: '200px'
                      }}
                    >
                      <div className="text-xl font-bold text-center">
                        {coverData.title || 'Untitled Zine'}
                      </div>
                    </div>
                    {/* Front Cover Decorations */}
                    {(coverData.frontDecorations || []).map((element) => (
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Instructions */}
      <div className="text-center mt-4 text-sm text-gray-600 no-print">
        <p>Print this page on A4 paper, then fold along the dashed line to create your zine</p>
        <button
          onClick={() => window.print()}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Print Zine
        </button>
      </div>
    </div>
  );
};