// utils/constants.ts
import { TextPosition } from '../types';

export const COVER_COLORS = [
  '#e81416', '#ffa500', '#faeb36', '#79c314', '#487de7', '#4b369d',
  '#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', 
  '#bdb2ff', '#ffc6ff', '#b0c4b1', '#755407', '#ff00ff', '#00ffff', 
  '#00ff00', '#000000'
];

export const CASSETTE_COVERS = [
  {
    id: 'cassette1',
    name: 'Classic White Cassette',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjc1IiBoZWlnaHQ9IjQyNSIgdmlld0JveD0iMCAwIDI3NSA0MjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNzUiIGhlaWdodD0iNDI1IiBmaWxsPSIjZjVmNWY1Ii8+CjwhLS0gQ2Fzc2V0dGUgbGFiZWwgLS0+CjxyZWN0IHg9IjIwIiB5PSI1MCIgd2lkdGg9IjIzNSIgaGVpZ2h0PSIzMjUiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIvPgo8IS0tIFRpdGxlIGxpbmVzIC0tPgo8bGluZSB4MT0iNDAiIHkxPSIxMDAiIHgyPSIyMzUiIHkyPSIxMDAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+CjxsaW5lIHgxPSI0MCIgeTE9IjEyMCIgeDI9IjIzNSIgeTI9IjEyMCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiLz4KPGxpbmUgeDE9IjQwIiB5MT0iMTQwIiB4Mj0iMjM1IiB5Mj0iMTQwIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIvPgo8IS0tIENhc3NldHRlIHJlZWxzIC0tPgo8Y2lyY2xlIGN4PSI4MCIgY3k9IjI1MCIgcj0iMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjE5NSIgY3k9IjI1MCIgcj0iMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=',
    lines: [
      { y: 100 },
      { y: 120 },
      { y: 140 }
    ]
  }
];

export const BACKGROUND_COLORS = [
  '#ffffff', '#f2f2f2', '#ffecb3', '#e6f2ff'
];

export const TEXT_POSITIONS: TextPosition[] = [
  'Top Left', 'Top Right', 'Center', 'Bottom Left', 'Bottom Right', 'No Song Box'
];

export const FONTS = [
  'Comic Sans MS', 'Papyrus', 'Brush Script MT', 'Lucida Handwriting',
  'Bradley Hand ITC', 'Kristen ITC', 'Curlz MT', 'Jokerman', 'Tempus Sans ITC'
];

export const MAX_PAGES = 7;

export const CHAR_LIMITS = {
  CENTER: 70,
  DEFAULT: 200,
  SECONDARY: 70,
  COVER_TITLE: 30
};

export const PREVIEW_DIMENSIONS = {
  WIDTH:275,
  HEIGHT: 400
};