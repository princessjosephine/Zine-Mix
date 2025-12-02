// hooks/useZineData.ts
import { useState } from 'react';
import { PageData, CoverData } from '../types';
import { MAX_PAGES } from '../utils/constants';

export const useZineData = () => {
  const [coverData, setCoverData] = useState<CoverData>({
    selectedColor: '#ffffff',
    title: ''
  });

  const [pageCustomizations, setPageCustomizations] = useState<Record<number, PageData>>(() => {
    const initialData: Record<number, PageData> = {};
    for (let i = 1; i <= MAX_PAGES; i++) {
      initialData[i] = {
        texts: {
          'Top Left': '', 'Top Right': '', 'Center': '', 'Bottom Left': '', 'Bottom Right': ''
        },
        secondaryTexts: {
          'Top Left': '', 'Top Right': '', 'Center': '', 'Bottom Left': '', 'Bottom Right': ''
        },
        background: '#ffffff',
        font: 'Comic Sans MS',
        position: 'Top Left',
        songTitle: '~~~~~~',
        hearts: [],
        selectedTrack: null // Now DeezerTrack | null
      };
    }
    return initialData;
  });

  const updatePageData = (pageNumber: number, data: Partial<PageData>) => {
    setPageCustomizations(prev => ({
      ...prev,
      [pageNumber]: { ...prev[pageNumber], ...data }
    }));
  };

  const resetData = () => {
    setCoverData({ selectedColor: '#ffffff', title: '' });
    setPageCustomizations(() => {
      const initialData: Record<number, PageData> = {};
      for (let i = 1; i <= MAX_PAGES; i++) {
        initialData[i] = {
          texts: {
            'Top Left': '', 'Top Right': '', 'Center': '', 'Bottom Left': '', 'Bottom Right': ''
          },
          secondaryTexts: {
            'Top Left': '', 'Top Right': '', 'Center': '', 'Bottom Left': '', 'Bottom Right': ''
          },
          background: '#ffffff',
          font: 'Comic Sans MS',
          position: 'Top Left',
          songTitle: '~~~~~~',
          hearts: [],
          selectedTrack: null
        };
      }
      return initialData;
    });
  };

  return {
    coverData,
    setCoverData,
    pageCustomizations,
    updatePageData,
    resetData
  };
};