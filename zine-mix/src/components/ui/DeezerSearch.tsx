// components/ui/DeezerSearch.tsx (IMPROVED VERSION)
import React, { useState, useCallback, useMemo } from 'react';
import { Search, Play, Square, ExternalLink, Music, Clock, Zap } from 'lucide-react';
import { DeezerTrack, DeezerSearchProps } from '../../types';
import { deezerService } from '../../services/deezerService';
import { useAudio } from '../../hooks/useAudio';
import { debounce } from '../../utils/helpers';

export const DeezerSearch: React.FC<DeezerSearchProps> = ({ 
  onTrackSelect, selectedTrack 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DeezerTrack[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearchTime, setLastSearchTime] = useState<number>(0);
  const [searchCache, setSearchCache] = useState<Map<string, DeezerTrack[]>>(new Map());
  
  const { isPlaying, currentTrack, playPreview, stopPreview, openInDeezer } = useAudio();

  // Debounced search function for better performance
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      // Check cache first
      const cachedResults = searchCache.get(query.toLowerCase());
      if (cachedResults) {
        console.log('📱 Using cached results for:', query);
        setSearchResults(cachedResults);
        setIsLoading(false);
        return;
      }

      const startTime = Date.now();
      setIsLoading(true);
      
      try {
        console.log('🔍 Searching for:', query);
        const results = await deezerService.searchTracks(query, 15);
        const searchTime = Date.now() - startTime;
        
        setSearchResults(results);
        setLastSearchTime(searchTime);
        
        // Cache results
        setSearchCache(prev => new Map(prev).set(query.toLowerCase(), results));
        
        console.log(`✅ Search completed in ${searchTime}ms, found ${results.length} tracks`);
        
        if (results.length === 0) {
          console.log('💡 Try searching for: "Harry Styles", "Taylor Swift", or "The Weeknd"');
        }
      } catch (error) {
        console.error('❌ Search failed:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500), // 500ms delay
    [searchCache]
  );

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search query');
      return;
    }
    
    await debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleTrackSelect = useCallback((track: DeezerTrack) => {
    onTrackSelect(track);
    setSearchResults([]); // Hide results after selection
    console.log('🎵 Selected:', track.getDisplayName());
  }, [onTrackSelect]);

  const getPopularityStars = useCallback((rank: number) => {
    const stars = Math.min(5, Math.floor(rank / 200000));
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  }, []);

  // Performance indicator
  const performanceColor = useMemo(() => {
    if (lastSearchTime === 0) return 'text-gray-500';
    if (lastSearchTime < 1000) return 'text-green-600';
    if (lastSearchTime < 3000) return 'text-yellow-600';
    return 'text-red-600';
  }, [lastSearchTime]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        {/* Status Bar */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Music size={16} />
            <span>Powered by Deezer API</span>
            <span className="text-green-600 text-xs">✅ Previews Available</span>
          </div>
          {lastSearchTime > 0 && (
            <div className={`flex items-center gap-1 ${performanceColor}`}>
              <Clock size={12} />
              <span className="text-xs">{lastSearchTime}ms</span>
            </div>
          )}
        </div>
        
        {/* Search Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search for a song on Deezer..."
            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // Auto-search for queries longer than 2 characters
              if (e.target.value.length > 2) {
                debouncedSearch(e.target.value);
              } else if (e.target.value.length === 0) {
                setSearchResults([]);
              }
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading || !searchQuery.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Search size={16} />
            )}
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => selectedTrack && playPreview(selectedTrack)}
            disabled={!selectedTrack || !selectedTrack.preview || (isPlaying && currentTrack?.id === selectedTrack.id)}
            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:opacity-50 transition-colors flex items-center gap-1"
          >
            <Play size={14} />
            {isPlaying && currentTrack?.id === selectedTrack?.id ? 'Playing...' : 'Preview'}
          </button>
          <button
            onClick={stopPreview}
            disabled={!isPlaying}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center gap-1"
          >
            <Square size={14} />
            Stop
          </button>
          <button
            onClick={() => selectedTrack && openInDeezer(selectedTrack)}
            disabled={!selectedTrack}
            className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 disabled:opacity-50 transition-colors flex items-center gap-1"
          >
            <ExternalLink size={14} />
            Deezer
          </button>
        </div>

        {/* Selected Track Display */}
        {selectedTrack && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
            <div className="flex items-start gap-3">
              {selectedTrack.album.cover_small && (
                <img
                  src={selectedTrack.album.cover_small}
                  alt="Album cover"
                  className="w-12 h-12 rounded object-cover"
                />
              )}
              <div className="flex-1">
                <div className="font-semibold">{selectedTrack.title}</div>
                <div className="text-gray-600">by {selectedTrack.artist.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Album: {selectedTrack.album.title} • {selectedTrack.getDurationString()}
                  {selectedTrack.explicit_lyrics && <span className="text-red-500 ml-2">🅴</span>}
                  {selectedTrack.preview && <span className="text-green-600 ml-2">🎵 Preview</span>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="border border-gray-300 rounded max-h-64 overflow-y-auto bg-white shadow-sm">
          <div className="text-sm font-semibold p-3 bg-gray-100 border-b flex items-center justify-between">
            <span>Search Results ({searchResults.length} tracks)</span>
            {searchCache.size > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Zap size={12} />
                <span>{searchCache.size} cached</span>
              </div>
            )}
          </div>
          {searchResults.map((track) => (
            <div
              key={track.id}
              className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedTrack?.id === track.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => handleTrackSelect(track)}
            >
              <div className="flex items-center gap-3">
                {track.album.cover_small && (
                  <img
                    src={track.album.cover_small}
                    alt={`${track.album.title} cover`}
                    className="w-12 h-12 rounded object-cover"
                    loading="lazy"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {track.title}
                  </div>
                  <div className="text-gray-600 text-xs truncate">
                    {track.artist.name} • {track.album.title}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                    <span>{track.getDurationString()}</span>
                    <span>{getPopularityStars(track.rank)}</span>
                    {track.preview ? (
                      <span className="text-green-600">🎵 Preview</span>
                    ) : (
                      <span className="text-gray-400">🚫 No preview</span>
                    )}
                    {track.explicit_lyrics && (
                      <span className="text-red-500">🅴</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {isLoading && searchResults.length === 0 && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 mt-2">Searching Deezer...</p>
          <p className="text-xs text-gray-500 mt-1">This should take less than 2 seconds</p>
        </div>
      )}

      {/* No Results State */}
      {!isLoading && searchQuery.length > 0 && searchResults.length === 0 && searchQuery.length > 2 && (
        <div className="text-center py-6 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-gray-600 mb-2">No results found for "{searchQuery}"</p>
          <p className="text-xs text-gray-500">
            💡 Try searching for: "Blinding Lights", "Harry Styles", or "Taylor Swift"
          </p>
        </div>
      )}

      {/* Performance Tips */}
      {searchCache.size === 0 && searchResults.length === 0 && !isLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
          <h4 className="font-medium mb-1">🚀 Performance Features:</h4>
          <ul className="text-gray-600 text-xs space-y-1">
            <li>• Auto-search as you type (3+ characters)</li>
            <li>• Results are cached for instant re-access</li>
            <li>• Debounced search prevents excessive requests</li>
            <li>• Smart fallback to demo data if API fails</li>
          </ul>
        </div>
      )}
    </div>
  );
};