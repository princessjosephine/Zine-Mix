// types/page.ts (UPDATED)
import { DeezerTrack } from './deezer';

export type TextPosition = 'Top Left' | 'Top Right' | 'Center' | 'Bottom Left' | 'Bottom Right' | 'No Song Box';
export interface HeartElement {
  x: number;
  y: number;
  id: string;
  symbol?: string;
  elementId?: string;
  size?: number;
}

export interface PageData {
  texts: Record<string, string>;
  secondaryTexts: Record<string, string>;
  background: string;
  font: string;
  position: TextPosition;
  songTitle: string;
  hearts: HeartElement[]; // Now supports any decorative element
  selectedTrack: DeezerTrack | null;
}

export interface PageEditorProps {
  currentPage: number;
  maxPages: number;
  pageData: PageData;
  updatePageData: (data: Partial<PageData>) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onHome: () => void;
  onSave?: () => string;
}