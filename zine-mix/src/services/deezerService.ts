// services/deezerService.ts (IMPROVED VERSION)
import { DeezerTrack, DeezerSearchResponse } from '../types';

export class DeezerService {
  private static instance: DeezerService;
  private readonly baseUrl = 'https://api.deezer.com';
  private readonly corsProxies = [
    'https://corsproxy.io/?',
  ];
  
  static getInstance(): DeezerService {
    if (!DeezerService.instance) {
      DeezerService.instance = new DeezerService();
    }
    return DeezerService.instance;
  }

  async searchTracks(query: string, limit = 20): Promise<DeezerTrack[]> {
    console.log(`🔍 DEBUG: Starting search for "${query}"`);
    console.log(`🔍 DEBUG: Using limit: ${limit}`);
    
    try {
      const results = await this.searchWithProxy(query, limit);
      console.log(`✅ Found ${results.length} real tracks from Deezer`);
      return results;
    } catch (error) {
    console.error('❌ Real search failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Search failed: ${errorMessage}`);
  }
  }

  private async searchWithProxy(query: string, limit: number): Promise<DeezerTrack[]> {
    const deezerUrl = `${this.baseUrl}/search?q=${encodeURIComponent(query)}&limit=${limit}`;
    console.log(`📡 DEBUG: Deezer URL: ${deezerUrl}`);
    
    // Try corsproxy.io first (most reliable)
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(deezerUrl)}`;
    console.log(`📡 DEBUG: Proxy URL: ${proxyUrl}`);
    
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    console.log(`📡 DEBUG: Response status: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data: DeezerSearchResponse = await response.json();
    console.log(`📡 DEBUG: Raw Deezer response:`, data);
    
    if (!data.data || data.data.length === 0) {
      console.log(`📡 DEBUG: No tracks found in response`);
      return [];
    }
    
    console.log(`📡 DEBUG: Processing ${data.data.length} tracks`);
    return data.data.map(track => this.mapToTrack(track));
  }



  private mapToTrack(deezerTrack: any): DeezerTrack {
    return {
      id: deezerTrack.id.toString(),
      title: deezerTrack.title,
      artist: {
        id: deezerTrack.artist.id.toString(),
        name: deezerTrack.artist.name,
        picture: deezerTrack.artist.picture || '',
        picture_small: deezerTrack.artist.picture_small || '',
        picture_medium: deezerTrack.artist.picture_medium || '',
        picture_big: deezerTrack.artist.picture_big || '',
        picture_xl: deezerTrack.artist.picture_xl || ''
      },
      album: {
        id: deezerTrack.album.id.toString(),
        title: deezerTrack.album.title,
        cover: deezerTrack.album.cover || '',
        cover_small: deezerTrack.album.cover_small || '',
        cover_medium: deezerTrack.album.cover_medium || '',
        cover_big: deezerTrack.album.cover_big || '',
        cover_xl: deezerTrack.album.cover_xl || ''
      },
      duration: deezerTrack.duration,
      preview: deezerTrack.preview,
      link: deezerTrack.link,
      rank: deezerTrack.rank,
      explicit_lyrics: deezerTrack.explicit_lyrics,
      getDisplayName() {
        return `${this.title} by ${this.artist.name}`;
      },
      getDurationString() {
        const minutes = Math.floor(this.duration / 60);
        const seconds = this.duration % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    };
  }




  private fuzzyMatch(text: string, pattern: string): boolean {
    // Simple fuzzy matching - allows for small typos
    if (pattern.length < 3) return false;
    
    const words = pattern.split(' ');
    return words.some(word => {
      if (word.length < 3) return text.includes(word);
      
      // Allow 1 character difference for words 3+ chars
      for (let i = 0; i <= text.length - word.length; i++) {
        const substring = text.substring(i, i + word.length);
        let differences = 0;
        for (let j = 0; j < word.length; j++) {
          if (word[j] !== substring[j]) differences++;
        }
        if (differences <= 1) return true;
      }
      return false;
    });
  }
}

export const deezerService = DeezerService.getInstance();