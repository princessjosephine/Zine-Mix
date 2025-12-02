// components/screens/HomeScreen.tsx
import React, { useState } from 'react';

interface HomeScreenProps {
  onCreateZine: () => void;
  savedZines: any[];
  onDeleteZine: (id: string) => void;
  onLoadZine: (zine: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onCreateZine, savedZines, onDeleteZine, onLoadZine 
}) => {
  const [selectedZine, setSelectedZine] = useState<string>('');

  const handleOpenZine = () => {
    if (selectedZine) {
      console.log('Opening:', selectedZine);
      // Future: Implement zine loading functionality
    } else {
      console.log('No zine selected.');
    }
  };
  const handleDeleteZine = (zineId: string) => {
  if (confirm('Are you sure you want to delete this zine?')) {
    onDeleteZine(zineId);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome to Zine Mix 🎧
        </h1>
        
        <div className="border border-gray-300 rounded-lg p-4 mb-4 h-48 overflow-y-auto">
  {savedZines.length > 0 ? (
    savedZines.map((zine, index) => (
      <div
        key={zine.id}
        className={`p-3 cursor-pointer rounded mb-2 border-l-4 hover:bg-gray-100 flex justify-between items-center ${
          selectedZine === zine.id ? 'bg-blue-100 border-l-blue-500' : 'border-l-gray-300'
        }`}
        onClick={() => setSelectedZine(zine.id)}
      >
        <div>
          <div className="font-medium">{zine.title}</div>
          <div className="text-sm text-gray-600">
            Created: {new Date(zine.dateCreated).toLocaleDateString()}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteZine(zine.id);
          }}
          className="text-red-500 hover:text-red-700 px-2 py-1"
        >
          🗑️
        </button>
      </div>
    ))
  ) : (
    <div className="text-center text-gray-500 py-8">
      No saved zines yet. Create your first one!
    </div>
  )}
</div>
        
        <button
          className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors"
          onClick={() => {
            const zine = savedZines.find(z => z.id === selectedZine);
            if (zine) onLoadZine(zine);
          }}
        >
          Open Selected Zine
        </button>
      </div>


      <button
        onClick={onCreateZine}
        className="w-full bg-green-500 text-white p-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
      >
        + Create New Zine
      </button>
    </div>
  );
};
