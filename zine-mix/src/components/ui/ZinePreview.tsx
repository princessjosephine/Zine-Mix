// components/ui/ZinePreview.tsx (FIXED VERSION)
import React, { useRef, useState } from 'react';
import { Music } from 'lucide-react';
import { PageData, HeartElement } from '../../types';
import { PREVIEW_DIMENSIONS, CHAR_LIMITS } from '../../utils/constants';

interface ZinePreviewProps {
  pageData: PageData;
  updatePageData: (data: Partial<PageData>) => void;
  showBorder?: boolean;
}

export const ZinePreview: React.FC<ZinePreviewProps> = ({ pageData, updatePageData, showBorder = false }) => {
  const [draggedHeart, setDraggedHeart] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [resizing, setResizing] = useState<string | null>(null);

  // FIXED: Better positioning logic based on Java implementation
  const getTextAreaStyle = (position: string, isSecondary = false): React.CSSProperties => {
    const songBoxHeight = 120;
    const padding = 10;
    const previewWidth = PREVIEW_DIMENSIONS.WIDTH;
    const previewHeight = PREVIEW_DIMENSIONS.HEIGHT;

    switch (position) {
      case 'Top Left':
      case 'Top Right':
        return {
          position: 'absolute',
          top: songBoxHeight + padding * 4, // FIXED: Position below song box
          left: padding,
          width: `${previewWidth - padding * 2}px`, // FIXED: Proper width
          height: `${previewHeight - songBoxHeight - padding * 8}px`,
          fontSize: '22px', // FIXED: Larger font size
          resize: 'none',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          fontFamily: pageData.font,
          overflow: 'hidden'
        };

      case 'Center':
        if (isSecondary) {
          return {
            position: 'absolute',
            top: (previewHeight + songBoxHeight) / 2 + padding,
            left: padding,
            width: `${previewWidth - padding * 2}px`,
            height: `${(previewHeight - songBoxHeight) / 2 - padding * 2}px`,
            fontSize: '22px',
            resize: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: pageData.font,
            overflow: 'hidden'
          };
        }
        return {
          position: 'absolute',
          top: padding * 3,
          left: padding,
          width: `${previewWidth - padding * 2}px`,
          height: `${(previewHeight - songBoxHeight) / 2 - padding}px`,
          fontSize: '22px',
          resize: 'none',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          fontFamily: pageData.font,
          overflow: 'hidden'
        };

      case 'Bottom Left':
      case 'Bottom Right':
        return {
          position: 'absolute',
          top: padding,
          left: padding,
          width: `${previewWidth - padding * 2}px`,
          height: `${previewHeight - songBoxHeight - padding * 8}px`, // FIXED: Leave space for song box
          fontSize: '20px',
          resize: 'none',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          fontFamily: pageData.font,
          overflow: 'hidden'
        };

      default:
        return {};
    }
  };

  

  // FIXED: Better song container positioning
const getSongPosition = (position: string): React.CSSProperties => {
      if (position === 'No Song Box') {
        return { display: 'none' }; // Hide the song box completely
      }
      
      const previewWidth = PREVIEW_DIMENSIONS.WIDTH;
      const previewHeight = PREVIEW_DIMENSIONS.HEIGHT;
      const boxSize = 120;

    switch (position) {

      case 'Top Left':
        return { position: 'absolute', top: 10, left: 10 };
      case 'Top Right':
        return { position: 'absolute', top: 10, right: 10 };
      case 'Center':
        return { 
          position: 'absolute', 
          top: `${(previewHeight - boxSize) / 2}px`, 
          left: `${(previewWidth - boxSize) / 2}px`
        };
      case 'Bottom Left':
        return { position: 'absolute', bottom: 10, left: 10 };
      case 'Bottom Right':
        return { position: 'absolute', bottom: 10, right: 10 };
      default:
        return { position: 'absolute', top: 10, left: 10 };
    }
  };

  const addHeart = () => {
    const newHeart: HeartElement = {
      x: 120,
      y: 180,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    updatePageData({
      hearts: [...pageData.hearts, newHeart]
    });
  };

  

  const removeHeart = (heartId: string) => {
    updatePageData({
      hearts: pageData.hearts.filter(h => h.id !== heartId)
    });
  };

  const updateHeartPosition = (heartId: string, x: number, y: number) => {
    updatePageData({
      hearts: pageData.hearts.map(h => 
        h.id === heartId ? { ...h, x, y } : h
      )
    });
  };

  const handleMouseDown = (e: React.MouseEvent, heartId: string) => {
    e.preventDefault();
    setDraggedHeart(heartId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
  if (resizing) {
    handleResize(e);
  } else if (draggedHeart && previewRef.current) {
    const rect = previewRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(245, e.clientX - rect.left - 15));
    const y = Math.max(0, Math.min(395, e.clientY - rect.top - 15));
    updateHeartPosition(draggedHeart, x, y);
  }
};

  const handleMouseUp = () => {
      setDraggedHeart(null);
      setResizing(null);  // Also update this existing function
    };

    // ADD NEW FUNCTIONS HERE:
    const handleResizeStart = (e: React.MouseEvent, elementId: string) => {
      e.preventDefault();
      e.stopPropagation();
      setResizing(elementId);
    };

    const handleResize = (e: React.MouseEvent) => {
      if (!resizing || !previewRef.current) return;
      
      const element = pageData.hearts.find(h => h.id === resizing);
      if (!element) return;
      
      const rect = previewRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const centerX = element.x + (element.size || 24) / 2;
      const centerY = element.y + (element.size || 24) / 2;
      const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
      const newSize = Math.max(8, Math.min(100, distance * 2)); // Changed from (12, 60, distance * 2)      
      updateHeartSize(resizing, newSize);
    };

    const updateHeartSize = (elementId: string, size: number) => {
      updatePageData({
        hearts: pageData.hearts.map(h => 
          h.id === elementId ? { ...h, size } : h
        )
      });
    };

    const getSongTitlePosition = (position: string): React.CSSProperties => {
  const songPosition = getSongPosition(position);
  const titleOffset = 125;
  
  return {
    position: 'absolute',
    left: songPosition.left || '10px',
    right: songPosition.right || 'auto',
    bottom: songPosition.bottom ? `${parseInt(songPosition.bottom as string) + titleOffset}px` : 'auto',
    top: songPosition.bottom ? 'auto' : `${parseInt(songPosition.top as string || '10') + titleOffset}px`,
    width: '120px',
    fontFamily: pageData.font,
    fontSize: '10px',
    lineHeight: '1.2',
    color: 'black',
    textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
    textAlign: 'center' as const
  };
};

  return (
    <div
      ref={previewRef}
      className={`relative overflow-hidden ${showBorder !== false ? 'border-2 border-black' : ''}`}
      style={{ 
        backgroundColor: pageData.background.startsWith('/') || pageData.background.startsWith('data:') ? 'transparent' : pageData.background,
        backgroundImage: (pageData.background.startsWith('/') || pageData.background.startsWith('data:')) ? `url(${pageData.background})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: PREVIEW_DIMENSIONS.WIDTH,
        height: PREVIEW_DIMENSIONS.HEIGHT
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* FIXED: Song Container with proper positioning */}
      {pageData.position !== 'No Song Box' && (
        <div
          className="absolute border border-blue-300 bg-gradient-to-b from-gray-50 to-gray-200 rounded flex flex-col items-center justify-center"
          style={{
            width: '120px',
            height: '120px',
            ...getSongPosition(pageData.position)
          }}
        >
        {pageData.selectedTrack && pageData.selectedTrack.album.cover_medium ? (
          <div className="text-center w-full h-full flex flex-col">
            <img
              src={pageData.selectedTrack.album.cover_medium}
              alt={`${pageData.selectedTrack.album.title} cover`}
              className="w-29 h-28 object-cover rounded flex-1"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (pageData.selectedTrack?.album.cover_small) {
                  target.src = pageData.selectedTrack.album.cover_small;
                }
              }}
            />
          </div>
        ) : (
          <div className="text-center w-full h-full flex flex-col items-center justify-center">
            <Music size={40} className="mx-auto mb-2 text-gray-600" />
            {/* FIXED: Song title outside the container, not inside */}
          </div>
        )}
      </div>
      )}

      {/* Song title - Only show if not "No Song Box" */}
      {pageData.position !== 'No Song Box' && (pageData.selectedTrack || pageData.songTitle !== '~~~~~~') && (
        <div style={getSongTitlePosition(pageData.position)}>
          {pageData.selectedTrack ? pageData.selectedTrack.title : pageData.songTitle}
        </div>
      )}

      {/* FIXED: Primary Text Area with proper positioning */}
      <textarea
        style={getTextAreaStyle(pageData.position)}
        value={pageData.texts[pageData.position] || ''}
        onChange={(e) => updatePageData({
          texts: { ...pageData.texts, [pageData.position]: e.target.value }
        })}
        placeholder="start typing here :)"
        maxLength={pageData.position === 'Center' ? CHAR_LIMITS.CENTER : CHAR_LIMITS.DEFAULT}
      />

      {/* FIXED: Secondary Text Area for Center position */}
      {pageData.position === 'Center' && (
        <textarea
          style={getTextAreaStyle(pageData.position, true)}
          value={pageData.secondaryTexts[pageData.position] || ''}
          onChange={(e) => updatePageData({
            secondaryTexts: { ...pageData.secondaryTexts, [pageData.position]: e.target.value }
          })}
          placeholder="text continues here :)"
          maxLength={CHAR_LIMITS.SECONDARY}
        />
      )}

      {/* Decorative Elements */}
      {pageData.hearts.map((element) => (
      <div
        key={element.id}
        className="absolute cursor-move select-none hover:opacity-70 transition-opacity group"
        style={{ 
          left: element.x, 
          top: element.y,
          fontSize: `${element.size || 24}px`
        }}
        onMouseDown={(e) => handleMouseDown(e, element.id)}
        onDoubleClick={() => removeHeart(element.id)}
        title="Drag to move, double-click to remove, drag corners to resize"
      >
        {element.symbol || '♥'}
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize pointer-events-auto"
            onMouseDown={(e) => handleResizeStart(e, element.id)}
          />
        </div>
      </div>
    ))}
    </div>
  );
};