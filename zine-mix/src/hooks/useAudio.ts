// hooks/useAudio.ts
import { useState, useRef } from 'react';
import { DeezerTrack } from '../types';

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<DeezerTrack | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playPreview = (track: DeezerTrack) => {
    if (!track.preview) {
      alert('No preview available for this track');
      return;
    }

    // Stop current audio if playing
    stopPreview();

    try {
      audioRef.current = new Audio(track.preview);
      audioRef.current.crossOrigin = 'anonymous'; // Handle CORS
      audioRef.current.volume = 0.7; // Set volume to 70%
      
      // Add event listeners
      audioRef.current.onloadstart = () => {
        console.log('🎵 Loading preview:', track.getDisplayName());
      };

      audioRef.current.oncanplay = () => {
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
          setCurrentTrack(track);
          console.log('▶️ Playing:', track.getDisplayName());
        }).catch(error => {
          console.error('Playback failed:', error);
          setIsPlaying(false);
          alert('Failed to play preview. This might be due to browser restrictions or the track being unavailable.');
        });
      };

      audioRef.current.onended = () => {
        console.log('✅ Preview finished');
        setIsPlaying(false);
        setCurrentTrack(null);
      };

      audioRef.current.onerror = (error) => {
        console.error('Audio error:', error);
        setIsPlaying(false);
        setCurrentTrack(null);
        alert('Error playing preview. The track might not be available.');
      };

      // Set a 30-second limit (Deezer previews are typically 30 seconds)
      setTimeout(() => {
        if (audioRef.current && !audioRef.current.ended) {
          stopPreview();
        }
      }, 30000);

    } catch (error) {
      console.error('Failed to create audio element:', error);
      alert('Failed to load preview');
    }
  };

  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const openInDeezer = (track: DeezerTrack) => {
    window.open(track.link, '_blank');
  };

  return {
    isPlaying,
    currentTrack,
    playPreview,
    stopPreview,
    openInDeezer
  };
};