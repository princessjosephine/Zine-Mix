// hooks/useTitle.ts
import { useEffect } from 'react';

export const useTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

// Predefined titles for different screens
export const SCREEN_TITLES = {
  login: 'Login | Zine Mix',
  home: 'Home | Zine Mix',
  cover: 'Cover Design | Zine Mix',
  editor: (page: number) => `Page ${page} Editor | Zine Mix`,
} as const;