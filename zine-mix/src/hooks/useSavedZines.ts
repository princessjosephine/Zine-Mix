import { useState, useEffect } from 'react';
import { storage } from '../utils/helpers';

export interface SavedZine {
  id: string;
  title: string;
  coverColor: string;
  dateCreated: string;
  dateModified: string;
  coverData: any;
  pageData: Record<number, any>;
}

export const useSavedZines = () => {
  const [savedZines, setSavedZines] = useState<SavedZine[]>([]);

  useEffect(() => {
    const saved = storage.get('savedZines', []);
    setSavedZines(saved);
  }, []);

const saveZine = (title: string, coverData: any, pageData: Record<number, any>, existingId?: string) => {
  const now = new Date().toISOString();
  
  if (existingId) {
    // Update existing zine
    const updated = savedZines.map(zine => 
      zine.id === existingId 
        ? { ...zine, title, coverData, pageData, dateModified: now }
        : zine
    );
    setSavedZines(updated);
    storage.set('savedZines', updated);
    return existingId;
  } else {
    // Create new zine
    const newZine: SavedZine = {
      id: Date.now().toString(),
      title: title || 'Untitled Zine',
      coverColor: coverData.selectedColor,
      dateCreated: now,
      dateModified: now,
      coverData,
      pageData
    };

    const updated = [...savedZines, newZine];
    setSavedZines(updated);
    storage.set('savedZines', updated);
    return newZine.id;
  }
};

const deleteZine = (id: string) => {
  const updated = savedZines.filter(zine => zine.id !== id);
  setSavedZines(updated);
  storage.set('savedZines', updated);
};

return { savedZines, saveZine, deleteZine };
};