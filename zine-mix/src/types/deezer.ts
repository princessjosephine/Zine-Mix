// types/deezer.ts
export interface DeezerTrack {
  id: string;
  title: string;
  artist: {
    id: string;
    name: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
  };
  album: {
    id: string;
    title: string;
    cover: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    cover_xl: string;
  };
  duration: number;
  preview: string;
  link: string;
  rank: number;
  explicit_lyrics: boolean;
  getDisplayName(): string;
  getDurationString(): string;
}

export interface DeezerSearchResponse {
  data: Array<{
    id: number;
    readable: boolean;
    title: string;
    title_short: string;
    title_version: string;
    link: string;
    duration: number;
    rank: number;
    explicit_lyrics: boolean;
    explicit_content_lyrics: number;
    explicit_content_cover: number;
    preview: string;
    md5_image: string;
    artist: {
      id: number;
      name: string;
      link: string;
      picture: string;
      picture_small: string;
      picture_medium: string;
      picture_big: string;
      picture_xl: string;
      tracklist: string;
      type: string;
    };
    album: {
      id: number;
      title: string;
      cover: string;
      cover_small: string;
      cover_medium: string;
      cover_big: string;
      cover_xl: string;
      md5_image: string;
      tracklist: string;
      type: string;
    };
    type: string;
  }>;
  total: number;
  next?: string;
}

export interface DeezerSearchProps {
  onTrackSelect: (track: DeezerTrack) => void;
  selectedTrack: DeezerTrack | null;
}