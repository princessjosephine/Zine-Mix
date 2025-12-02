// src/App.tsx
import React, { useState } from 'react';
import { LoginScreen } from './components/screens/LoginScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { CoverChooser } from './components/screens/CoverChooser';
import { BackCoverChooser } from './components/screens/BackCoverChooser';
import { PageEditor } from './components/screens/PageEditor';
import { useZineData } from './hooks/useZineData';
import { ScreenType } from './types';
import { MAX_PAGES } from './utils/constants';
import { useSavedZines } from './hooks/useSavedZines';

const ZineMix: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [currentPage, setCurrentPage] = useState(1);
  const { savedZines, saveZine, deleteZine } = useSavedZines();
  const [currentZineId, setCurrentZineId] = useState<string | null>(null);
  
  const { 
    coverData, 
    setCoverData, 
    pageCustomizations, 
    updatePageData, 
    resetData 
  } = useZineData();

  const handleSaveZine = () => {
    const title = coverData.title || 'Untitled Zine';
    const savedId = saveZine(title, coverData, pageCustomizations, currentZineId?.toString());    setCurrentZineId(savedId);
    alert(`✅ Zine "${title}" saved successfully!`);
    return savedId;
  };


  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentPage === 1) {
        setCurrentScreen('cover');
      } else if (currentPage === 7) {
        setCurrentPage(6); // Go back to page 6 from back cover
      } else {
        setCurrentPage(currentPage - 1);
      }
    } else {
      if (currentPage === 6) {
        setCurrentScreen('backcover'); // Go to back cover after page 6
      } else if (currentPage === MAX_PAGES) {
        alert('Your zine has been saved successfully!');
        setCurrentScreen('home');
        setCurrentPage(1);
        resetData();
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const resetToHome = () => {
    setCurrentScreen('home');
    setCurrentPage(1);
  };

  const handleLoadZine = (zine: any) => {
    setCoverData(zine.coverData);
    // Load all page data
    Object.keys(zine.pageData).forEach(pageNum => {
      updatePageData(parseInt(pageNum), zine.pageData[pageNum]);
    });
    setCurrentZineId(zine.id);
    setCurrentScreen('cover');
  };

  const startNewZine = () => {
    resetData();
    setCurrentPage(1);
    setCurrentScreen('cover');
  };

  if (currentScreen === 'login') {
    return <LoginScreen onLogin={() => setCurrentScreen('home')} />;
  }

  if (currentScreen === 'home') {
    return <HomeScreen 
  onCreateZine={startNewZine} 
  savedZines={savedZines} 
  onDeleteZine={deleteZine}
  onLoadZine={handleLoadZine}
/>;
  }

  if (currentScreen === 'cover') {
    return (
      <CoverChooser
        onNext={() => setCurrentScreen('editor')}
        onHome={resetToHome}
        coverData={coverData}
        setCoverData={setCoverData}
        allPageData={pageCustomizations}  // ADD THIS
      onSave={handleSaveZine} 
      />
    );
  }

  if (currentScreen === 'backcover') {
    return (
      <BackCoverChooser
        onNext={() => {
          alert('Your zine has been saved successfully!');
          setCurrentScreen('home');
          setCurrentPage(1);
          resetData();
        }}
        onHome={resetToHome}
        onPrevious={() => {
          setCurrentPage(6);
          setCurrentScreen('editor');  // ADD THIS LINE
        }}
        coverData={coverData}
        setCoverData={setCoverData}
        allPageData={pageCustomizations}
        onSave={handleSaveZine}
      />
    );
  }

  if (currentScreen === 'editor') {
    return (
      <PageEditor
        currentPage={currentPage}
        maxPages={MAX_PAGES}
        pageData={pageCustomizations[currentPage]}
        updatePageData={(data) => updatePageData(currentPage, data)}
        onNavigate={handleNavigation}
        onHome={resetToHome}
        onSave={handleSaveZine}
        allPageData={pageCustomizations}
        coverData={coverData}
      />
    );
  }

  return null;
};

export default ZineMix;