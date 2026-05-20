import React, { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import BanPickScreen from './src/screens/BanPickScreen';

type AppScreen = 'home' | 'banpick';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [mode, setMode] = useState('');

  if (screen === 'banpick') {
    return <BanPickScreen mode={mode} onBack={() => setScreen('home')} />;
  }
  return (
    <HomeScreen
      onSelectMode={(m) => {
        setMode(m);
        setScreen('banpick');
      }}
    />
  );
}
