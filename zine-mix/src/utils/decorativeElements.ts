// utils/decorativeElements.ts
export interface DecorativeElement {
  id: string;
  symbol: string;
  name: string;
  color?: string;
  category: 'hearts' | 'music' | 'shapes' | 'nature' | 'misc';
}

export const DECORATIVE_ELEMENTS: DecorativeElement[] = [
  // Hearts
  { id: 'heart-red', symbol: '♥', name: 'Red Heart', color: '#e91e63', category: 'hearts' },
  { id: 'heart-pink', symbol: '💖', name: 'Pink Heart', category: 'hearts' },
  { id: 'heart-purple', symbol: '💜', name: 'Purple Heart', category: 'hearts' },
  { id: 'heart-blue', symbol: '💙', name: 'Blue Heart', category: 'hearts' },
  
  // Music
  { id: 'music-note', symbol: '♪', name: 'Music Note', color: '#2196f3', category: 'music' },
  { id: 'music-notes', symbol: '♫', name: 'Music Notes', category: 'music' },
  { id: 'treble-clef', symbol: '𝄞', name: 'Treble Clef', category: 'music' },
  { id: 'microphone', symbol: '🎤', name: 'Microphone', category: 'music' },
  { id: 'headphones', symbol: '🎧', name: 'Headphones', category: 'music' },
  
  // Shapes
  { id: 'star', symbol: '★', name: 'Star', color: '#ffd700', category: 'shapes' },
  { id: 'star-outline', symbol: '☆', name: 'Star Outline', category: 'shapes' },
  { id: 'circle', symbol: '●', name: 'Circle', category: 'shapes' },
  { id: 'diamond', symbol: '♦', name: 'Diamond', category: 'shapes' },
  { id: 'sparkle', symbol: '✨', name: 'Sparkle', category: 'shapes' },
  
  // Nature
  { id: 'flower', symbol: '🌸', name: 'Flower', category: 'nature' },
  { id: 'sun', symbol: '☀️', name: 'Sun', category: 'nature' },
  { id: 'moon', symbol: '🌙', name: 'Moon', category: 'nature' },
  { id: 'cloud', symbol: '☁️', name: 'Cloud', category: 'nature' },
  
  // Misc
  { id: 'peace', symbol: '☮', name: 'Peace Sign', category: 'misc' },
  { id: 'infinity', symbol: '∞', name: 'Infinity', category: 'misc' },
  { id: 'arrow', symbol: '→', name: 'Arrow', category: 'misc' },
  { id: 'crown', symbol: '👑', name: 'Crown', category: 'misc' },
];

export const ELEMENT_CATEGORIES = [
  { id: 'hearts', name: 'Hearts', emoji: '💕' },
  { id: 'music', name: 'Music', emoji: '🎵' },
  { id: 'shapes', name: 'Shapes', emoji: '⭐' },
  { id: 'nature', name: 'Nature', emoji: '🌿' },
  { id: 'misc', name: 'Misc', emoji: '✨' },
] as const;