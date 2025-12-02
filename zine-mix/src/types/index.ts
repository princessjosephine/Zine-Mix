import { HeartElement, PageData,  } from './page';

// types/index.ts
export * from './deezer';
export * from './page';

// Application state types
export type ScreenType = 'login' | 'home' | 'cover' | 'editor' | 'backcover';
export interface CoverData {
  selectedColor: string;
  title: string;
  backColor?: string;
  backTitle?: string;
  frontDecorations?: HeartElement[];
  backDecorations?: HeartElement[];
}

export interface AppState {
  currentScreen: ScreenType;
  currentPage: number;
  maxPages: number;
  coverData: CoverData;
  pageCustomizations: Record<number, PageData>;
}
