import React, { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import BanPickScreen from './src/screens/BanPickScreen';
import TierListScreen from './src/screens/TierListScreen';

type AppScreen = 'home' | 'banpick' | 'tierlist';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [mode, setMode] = useState('');

  if (screen === 'banpick') {
    return <BanPickScreen mode={mode} onBack={() => setScreen('home')} />;
  }
  if (screen === 'tierlist') {
    return <TierListScreen onBack={() => setScreen('home')} />;
  }
  return (
    <HomeScreen
      onSelectMode={(m) => {
        setMode(m);
        setScreen('banpick');
      }}
      onTierList={() => setScreen('tierlist')}
    />
  );
}
